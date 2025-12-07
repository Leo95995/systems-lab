# Scopo :
# Realizzare no script per accesso sicuro tramite ssh
#

USER_NAME=${1:-"leox"}
PUBLIC_KEY=${2:-"INSERT_PUBLIC_KEY"}

## Creazione utente 

#  CREA UTENTE , -m -> crea direcyory, -s specific la shell come bin bash
useradd -m -s /bin/bash $USER_NAME
# User Mod si usa per modificare o aggiornare gli attributi di un utente 
# -a -> Appende , -G  aggiunge l'utente al gruppo sudos
usermod -aG sudo $USER_NAME


# Create directory ssh and insert public key

mkdir /home/$USER_NAME/.ssh

# Chown -R assegna la proprieta della directory al nuovo utente
chown -R $USER_NAME:$USER_NAME /home/$USER_NAME/.ssh
chown -R $USER_NAME:$USER_NAME /home/$USER_NAME/.ssh/authorized_keys

# Aggiungo anche la password per lo user
passwd $USER_NAME

# assegno 700 a ssh
chmod 700 /home/$USER_NAME/.ssh
# 600 alle keys
touch /home/$USER_NAME/.ssh/authorized_keys

cat <<EOF >> /home/$USER_NAME/.ssh/authorized_keys
$PUBLIC_KEY
EOF

chmod 600 /home/$USER_NAME/.ssh/authorized_keys
