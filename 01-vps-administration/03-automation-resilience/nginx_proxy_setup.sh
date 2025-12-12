#!/bin/bash

echo "Fornire l'indirizzo pubblico di riferimento"
set -e
# Param 1
read PUBLIC_IP 

echo "Inserire la porta dell'applicazione docker"
# Param 2
read DOCKER_PORT

#  -z -> True se stringa vuota
# -n -> True se stringa popolata
if [[ -z $PUBLIC_IP || -z $DOCKER_PORT ]]; then 

    echo "Missing non optional parameters"
    exit 1
fi


echo -e "\n Docker Port inserita: $DOCKER_PORT"
echo -e "\n Ip Pubblico inserito: $PUBLIC_IP"

echo -e "\n Procedo a inserire creare la configurazione Nginx"

CONF_FILE="/etc/nginx/sites-available/$DOMAIN_NAME.conf"

# Bash detail
sudo bash -c "cat <<EOF > $CONF_FILE
server {
    listen 80;
    server_name $DOMAIN_NAME; 
    location / {
        # Reindirizzamento al loopback (127.0.0.1) sulla porta del container
        proxy_pass http://127.0.0.1:$APP_PORT; 
        
        # Righe essenziali per headers HTTP corretti
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
}
EOF"


