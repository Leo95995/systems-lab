#!/bin/bash

# Garantisce che esca dalla procedura in caso di errore
set -e

# Path dei siti available
NGINX_CONF_PATH="/etc/nginx/sites-available"
# Path dei siti attivi
NGINX_ENABLE_PATH="/etc/nginx/sites-enabled"

echo "Fornire l'indirizzo pubblico di riferimento"
# Param 1
read DOMAIN_NAME 

echo "Inserire la porta dell'applicazione docker"
# Param 2
read APP_PORT

# Prepara il file per gli available
CONF_FILE="$NGINX_CONF_PATH/$DOMAIN_NAME.conf" # Questo viene dalla Fase 1
# Prepara il file per gli enabled
CONF_FILE_ENABLED="$NGINX_ENABLE_PATH/$DOMAIN_NAME.conf"

# -L verifica se l'elemento specificato è un link simbolico.. se lo è va a rimuoverlo
if [ -L "$CONF_FILE_ENABLED" ]; then
    sudo rm "$CONF_FILE_ENABLED"
    echo "Pulizia: Vecchio link simbolico rimosso."
fi

#  -z -> True se stringa vuota
# -n -> True se stringa popolata
if [[ -z $DOMAIN_NAME || -z $APP_PORT ]]; then 

    echo "Missing non optional parameters"
    exit 1
fi


echo -e "\n Docker Port inserita: $APP_PORT"
echo -e "\n Ip Pubblico inserito: $DOMAIN_NAME"

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


echo "File di config $DOMAIN_NAME.conf creato con successo"

# Attiva la Configurazione (Symlink).
# Verifica la Configurazione (Test).
# Rendi Effettiva la Modifica (Reload).

# Questo crea il link simbolico per collegare il file in sites/available
# File Originale e file di destinazione
sudo ln -s "$CONF_FILE" "$CONF_FILE_ENABLED"

# Testo la sintassi di quanto inserito
sudo nginx -t

# ricarico il servizio nginx
sudo systemctl reload nginx
# Messaggio di conferma
echo "Configurazione completata per $DOMAIN_NAME. Il Reverse Proxy è attivo."