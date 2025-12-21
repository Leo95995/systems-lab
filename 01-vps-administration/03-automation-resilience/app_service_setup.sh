##
# Cosa fa? 
# Crea dei servizi systemd per i container docker gia presenti e permette
# che vengano riavviati se ex c'è un reboot della macchina
#
# PREREQUISITI
# - Docker deve già essere installato sul target prescelto
# - I container devono essere gia esistenti
##

#!/bin/bash

set -e 


# DOCKER CHECK
if command -v docker &> /dev/null; then
    echo -e "\n Docker è già installato. Salto l'installazione.  "
else
    echo "Docker e servizi non presenti"
    exit 1
fi


# For each service passed is created a systemd file

if [ "$#" -lt 1 ]; then
  echo " passa almeno un parametro: Usage: $0 <container1> [container2 ...]"
  exit 1
fi

CONTAINERS=("$@")

echo "Container da gestire:"
for c in "${CONTAINERS[@]}"; do
  echo " - $c"
done


# Cicla su ogni container passato e gli crea appunto un servizio
for c in "${CONTAINERS[@]}"; do
  SERVICE_FILE="/etc/systemd/system/${c}.service"

  if [ -f "$SERVICE_FILE" ]; then
    echo "Service $c già esistente, skip"
    continue
  fi

  sudo tee "$SERVICE_FILE" > /dev/null <<EOF
[Unit]
Description=Docker Container $c
After=docker.service
Requires=docker.service

[Service]
Restart=unless-stopped
ExecStart=/usr/bin/docker start -a $c
ExecStop=/usr/bin/docker stop $c
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

  echo "Creato servizio systemd per $c"
done




systemctl daemon-reload
for c in "${CONTAINERS[@]}"; do
  echo "Abilito e avvio servizio $c"
  sudo systemctl enable "$c"
  sudo systemctl start "$c"
done
