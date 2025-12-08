#!/bin/bash

set -e
# Aggiorno il sistema
echo "Updating the system if needed"

sudo apt update

#  imposto UFW per deny incoming rifiuto tutto in entrata
#  permetto tutto in uscita (outgoing)

echo "Deny Incoming"
sudo ufw default deny incoming
echo "allow outgoing"
sudo ufw default allow outgoing
# Limite ssh . permettere sulla 22 con rate limit sulla 22
# Proteggo da brute force. metto accesso solo da tailscale network mesh
sudo ufw allow in from 100.64.0.0/10 to any port 22 proto tcp
# Permetto le porte http:80 e https: 443
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp  

# abilito ufw 
echo "Abilito ufw..."
echo "y" | sudo ufw enable
# Ricarico ufw
echo "Ricarico ufw..."
sudo ufw reload

# Installare fail2ban

echo "installo fail2ban"
sudo apt install fail2ban -y

echo "Creo la config per fail2ban"
# Avvia una sub-shell con privilegi root per eseguire l'intera operazione
sudo bash -c 'cat <<EOF > /etc/fail2ban/jail.d/sshd.conf
[sshd]
enabled = true
port = 22
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 1h
findtime = 10m
EOF'
echo "Riavvio fail2ban"

# Restarto fail2ban dopo aver modificato le impostazioni
sudo systemctl restart fail2ban
# Verifico lo stato dopo aver resettato
echo "Verifico fail2ban"
sudo fail2ban-client status sshd