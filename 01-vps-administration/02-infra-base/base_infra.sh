#!/bin/bash

set -e

echo "Aggiorno e upgrado il sistema"
sudo apt update -y && sudo apt upgrade -y

echo "Installazione utilities (git, curl, vim)..."

sudo apt install git curl vim -y
# Verifica docker
if command -v docker.io &> /dev/null; then
    echo -e "\n Docker.io è già installato. Salto l'installazione.  "
else
    echo -e "\n Procedo ad installare docker"
    sudo apt install docker.io -y

    sudo systemctl enable docker
    echo -e "\n Docker installato. Avviato e abilitato all'avvio."
fi


sudo systemctl start docker
echo -e " \n Docker avviato."


# Verifica nginx
if command -v nginx &> /dev/null; then
    echo -e "\n Nginx è già installato. Salto l'installazione."
else
    echo -e "\n installo nginx"
    sudo apt install nginx -y

    sudo systemctl enable nginx
    
fi

echo  -e "\n Nginx installato . Avvio in corso.."
sudo systemctl start nginx
echo -e "\n Nginx avviato. "

# Apro le porte nginx se non sono gia state aperte
echo -e "\n Apertura porte 80 e 443 su UFW Nginx Full"
sudo ufw allow 'Nginx Full'

WHOAMI=$(whoami)


# Idempotenza: Controllo se l'utente è già nel gruppo
if groups $WHOAMI | grep -q docker; then
    echo -e "\n Utente $WHOAMI è già nel gruppo docker."
else
    echo -e "\n Assegno l'utente $WHOAMI al gruppo docker..."
    sudo usermod -aG docker $WHOAMI
fi

echo -e "\n*** INSTALLAZIONE BASE COMPLETATA ***"
echo -e "\n ATTENZIONE: Uscire e riloggare per usare docker senza sudo."