#!/bin/bash

LOG_DATE=$(date +%Y%m%d_%H%M)

sudo apt install && sudo apt upgrade

echo "Aggiornamento effettuato  con successo in $LOG_DATE" >> ~/Desktop/crons/logs/cronupdater.log
