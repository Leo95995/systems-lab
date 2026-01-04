#!/bin/bash

set -e

#  sostituisco password auth rimuovendo la possibilità di accesso
sudo sed -i 's/^#\?PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config

# sostituisco la possibilità di login come root
sudo sed -i 's/^#\?PermitRootLogin .*$/PermitRootLogin no/' /etc/ssh/sshd_config

# substitute challenge response auth
sudo sed -i 's/^#\?ChallengeResponseAuthentication yes/ChallengeResponseAuthentication no/' /etc/ssh/sshd_config

# sostituisco protocolllo
sudo sed -i 's/^#\?Protocol .*$/Protocol 2/' /etc/ssh/sshd_config

# infine riavvio sssh service
sudo systemctl restart ssh.service