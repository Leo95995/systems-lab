#!/bin/bash

LOG_DATE=$(date +%Y%m%d_%H%M)

sudo apt install -y && sudo apt upgrade -y
 
echo "Aggiornamento effettuato  con successo in $LOG_DATE" >> ~/Desktop/crons/logs/cronupdater.log
