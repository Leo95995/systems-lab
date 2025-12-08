
# Aggiorno il sistema
sudo apt update -y

#  imposto UFW per deny incoming rifiuto tutto in entrata
#  permetto tutto in uscita (outgoing)
sudo ufw default deny incoming

sudo ufw default allow outgoing
# Limite ssh . permettere sulla 22 con rate limit sulla 22
# Proteggo da brute force
sudo ufw allow limit 22/tcp
# Permetto le porte http:80 e https: 443
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp  

# abilito ufw 
echo "y" | sudo ufw enable
# Ricarico ufw
sudo ufw reload

# Installare fail2ban
sudo apt install fail2ban -y

# Per config file jail.conf

sudo ls -l /etc/fail2ban/directory

# Fail 2 ban file configuration
sudo cat <<EOF > /etc/fail2ban/jail.d/sshd.conf
[sshd]
enabled = true
port = 22
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 1h
findtime = 10m
EOF

# Restarto fail2ban dopo aver modificato le impostazioni
sudo systemctl restart fail2ban
# Verifico lo stato dopo aver resettato


sudo fail2ban-client status sshd