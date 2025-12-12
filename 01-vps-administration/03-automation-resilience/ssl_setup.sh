# Chiedo il nome del dominio per avere il certificato dove fare il rinnovo
read  -p "Inserisci il nome del dominio " DOMAIN_NAME
read -p "Inserisci l'EMAIL di amministrazione: " ADMIN_EMAIL
if [[ -z $DOMAIN_NAME || -z $ADMIN_EMAIL ]]; then
    echo "Missing Domain name or Admin Email, esco"
    exit 1
fi

echo "$DOMAIN_NAME, $ADMIN_EMAIL "

CONF_FILE="/etc/nginx/sites-available/$DOMAIN_NAME.conf"

# Verifica Nginx restituisce true se il percorso è una directory . in questo caso es è false esce perchè ! fa da negazione davanti
if [ ! -f "$CONF_FILE" ]; then
    echo "File di configurazione Nginx non trovato in $CONF_FILE."
    echo "Assicurati di aver eseguito 'nginx_proxy_setup.sh' e che il nome del dominio sia corretto."
    exit 1
fi

# Verifico stato corrente di nignx
echo -e "\n Verifico status nginx"
sudo systemctl status nginx --no-pager
# Verifico la configurazione di nginx
echo -e "\n Verifico la configurazione di nginx"

nginx -t

# Installo certbot
echo -e "\n installo certbot"
sudo apt install -y certbot python3-certbot-nginx 

# Ottengo il certificato  e specifico per quale sarà il domaind name
echo -e "\n richiedo il certificato per il domain name"

# utilizzo cerbot
# --nginx           -> Utilizza il plugin Nginx per analizzare e modificare la configurazione.
# -d $DOMAIN_NAME   -> Specifica il dominio.
# -m $ADMIN_EMAIL   -> Email per le notifiche di scadenza.
# --agree-tos       -> Accetta i termini di servizio Let's Encrypt.
# --non-interactive -> Non richiede input all'utente.
# --redirect        -> AUTOMATICAMENTE configura Nginx per reindirizzare da HTTP (80) a HTTPS (443).

sudo certbot --nginx -d "$DOMAIN_NAME" -m "$ADMIN_EMAIL" --agree-tos --non-interactive --redirect
echo -e "\n Certificato ottenuto e Nginx configurato per l'HTTPS con reindirizzamento da HTTP."

#  Automazione del Rinnovo (Systemd Timer)
echo -e "\n Verifica e Attivazione Rinnovo Automatico ---"

# Abilita e avvia il timer di Systemd
sudo systemctl enable --now certbot.timer

# Verifica che il rinnovo avvenga senza intoppi riavviando Nginx dopo il successo
sudo systemctl status certbot.timer --no-pager

echo "Rinnovo automatico configurato e attivo."
echo "Il certificato verrà rinnovato automaticamente prima della scadenza."

echo -e "\n Processo SSL Completato. il sito è pronto per essere servito in https"