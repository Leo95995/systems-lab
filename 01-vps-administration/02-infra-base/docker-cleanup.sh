#!/bin/bash
set -e

echo -e "Procedo alla pulizia di Docker."

# rimuove i pacchetti di entrambe le fonti
echo "1/3: Rimozione pacchetti Docker e dipendenze..."
# 'purge' rimuove anche i file di configurazione
sudo apt purge -y docker.io docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin 

# pulisce tutto 
echo "2/3: Rimozione directory di configurazione e dati..."

sudo rm -rf /var/lib/docker
sudo rm -rf /etc/docker
sudo rm -rf /var/run/docker.sock

# Ricarico systemd
echo "3/3: Ricaricamento Systemd Daemon..."
sudo systemctl daemon-reload

echo "Pulizia Docker completata.."