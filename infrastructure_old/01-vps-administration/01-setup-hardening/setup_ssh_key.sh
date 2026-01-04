#!/bin/bash

set -e

KEY_NAME=$1
HOST_IP=${2:-"insert_real_ip"}
HOST_ALIAS=${3:-"Specify_host_alias"}


echo "KEY_NAME : $KEY_NAME"
echo "HOST_IP : $HOST_IP"
echo "HOST_ALIAS : $HOST_ALIAS"


if [[ -z "$KEY_NAME" || -z "$HOST_IP" || -z "$HOST_ALIAS" ]]; then
    echo "ERRORE: Devi fornire i parametri: Chiave, IP e Alias."
    echo "Esempio: ./setup_script.sh my_vps_key 121.111.33.22 alias"
    exit 1
fi

echo "Creazione Key in corso..."

ssh-keygen -t ed25519 -f ~/.ssh/$KEY_NAME -C "$HOST_ALIAS-key" 

echo "Key Creata con successo $KEY_NAME "

cat <<EOF >> ~/.ssh/config

Host $HOST_ALIAS
    Hostname $HOST_IP
    User root
    IdentityFile ~/.ssh/$KEY_NAME
    IdentitiesOnly yes
EOF

echo "Aggiunto preset al file config"