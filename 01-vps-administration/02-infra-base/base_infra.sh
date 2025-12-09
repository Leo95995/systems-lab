#!/bin/bash

#  Requisito: 
#  
# Realizzare uno Script che contiene:   
#
#  Aggiornamenti & Utilities
#  Installazione Nginx & Avvio
#  Installazione Docker & Avvio
#  Permessi Docker (Aggiunta utente al gruppo docker)

set -e

echo "Aggiorno e upgrado il sistema"
sudo apt update && sudo apt upgrade

# Verifica docker
if command -v docker.io &> /dev/null; then
    echo "Docker.io è già installato. Salto l'installazione."
else
    echo "Procedo ad installare docker"
    sudo apt install docker.ui
fi
# Verifica nginx
if command -v nginx &> /dev/null; then
    echo "Nginx è già installato. Salto l'installazione."
else
    echo "installo nginx"
    sudo apt install nginx
fi
