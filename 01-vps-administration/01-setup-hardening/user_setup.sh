# Scopo :
# Realizzare no script per accesso sicuro tramite ssh
#

$USER_NAME=${1:-"leox"}
$PUBLIC_KEY=${2:-"INSERT_PUBLIC_KEY"}

## Creazione utente 

useradd -m -s /bin/bash $USER_NAME

usermod -aG sudo $USER_NAME


# Create directory ssh and insert public key

mkdir /home/$USER_NAME/.ssh

chown -R $USER_NAME:$USER_NAME /home/$USER_NAME/.ssh

echo "$" >> /home/$USER_NAME/.ssh/authorized_keys

chmod 600 /home/leo/.ssh/authorized_keys