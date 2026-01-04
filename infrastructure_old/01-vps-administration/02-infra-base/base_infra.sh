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
    echo -e "\n Procedo ad installare Docker Engine"
    
    # Prerequisiti
    sudo apt install ca-certificates curl -y
    sudo install -m 0755 -d /etc/apt/keyrings
    
    # Aggiungi chiave GPG e repository
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc
    
    sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Signed-By: /etc/apt/keyrings/docker.asc
EOF

    sudo apt update -y
    # Installo solo il demone, client e buildx (il necessario per il base setup)
    sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin 
    
    sudo systemctl enable docker
    echo -e "\n Docker Engine installato e abilitato all'avvio."
fi


sudo systemctl start docker
echo -e " \n Docker avviato."


# checko nginx
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

# apro le porte nginx se non sono gia state aperte
echo -e "\n Apertura porte 80 e 443 su UFW Nginx Full"
sudo ufw allow 'Nginx Full'

WHOAMI=$(whoami)

# controllo se l'utente è gia nel gruppo docker
if groups $WHOAMI | grep -q docker; then
    echo -e "\n Utente $WHOAMI è già nel gruppo docker."
else
    echo -e "\n Assegno l'utente $WHOAMI al gruppo docker..."
    sudo usermod -aG docker $WHOAMI
fi

echo -e "\n*** INSTALLAZIONE BASE COMPLETATA ***"
echo -e "\n ATTENZIONE: Uscire e riloggare per usare docker senza sudo."