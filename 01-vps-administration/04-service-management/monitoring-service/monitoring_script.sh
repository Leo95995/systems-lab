#!/bin/bash

# simple monitor to create as systemd service

# If i want to use it as systemd service script i can insert it in /usr/local/bin 
# and call it from the service in /etc/systemd/system

# i can read the logs in :
# journalctl -r -u name-service.service 

while true; do
    DATE=$(date '+%Y-%m-%d %H:%M:%S')
    echo "===== $DATE ====="

    echo -e "\n [DISK] \n" 
    df -h /

    echo -e "\n [INODES] \n"
    df -i /

    echo -e "\n [MEMORY] \n" 
    free -h

    echo -e "\n [LOAD] \n"
    uptime

    echo -e "\n [SERVICES] \n" 
    systemctl is-active docker nginx ssh

    sleep 300 
done
