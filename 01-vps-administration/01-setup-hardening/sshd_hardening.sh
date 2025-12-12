#!/bin/bash

set -e

# Sostituzione della Password Authentication (Critico)
sudo sed -i 's/^#\?PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config

# Sostituzione di PermitRootLogin va messo a no o prohibit-password
sudo sed -i 's/^#\?PermitRootLogin .*$/PermitRootLogin no/' /etc/ssh/sshd_config

# Sostituzione di ChallengeResponseAuthentication (Sicurezza Aggiuntiva)
sudo sed -i 's/^#\?ChallengeResponseAuthentication yes/ChallengeResponseAuthentication no/' /etc/ssh/sshd_config

# Sostituzione di Protocollo (Verifica)
sudo sed -i 's/^#\?Protocol .*$/Protocol 2/' /etc/ssh/sshd_config

# Riavvia il servizio per applicare le modifiche
sudo systemctl restart ssh.service