

# Sostituzione della Password Authentication (Critico)
sed -i 's/^#\?PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config

# Sostituzione di PermitRootLogin (Critico)
sed -i 's/^#\?PermitRootLogin .*$/PermitRootLogin no/' /etc/ssh/sshd_config

# Sostituzione di ChallengeResponseAuthentication (Sicurezza Aggiuntiva)
sed -i 's/^#\?ChallengeResponseAuthentication yes/ChallengeResponseAuthentication no/' /etc/ssh/sshd_config

# Sostituzione di Protocollo (Verifica)
sed -i 's/^#\?Protocol .*$/Protocol 2/' /etc/ssh/sshd_config

# Riavvia il servizio per applicare le modifiche
systemctl restart sshd