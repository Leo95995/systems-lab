#!/bin/bash

SERVICE=$1

if [[ -z $SERVICE ]]; then
    echo "Passa il nome di un servizio come parametro"
    exit 1
fi

echo "Stoppo il servizio $SERVICE"
sudo systemctl stop $SERVICE || echo "Servizio non attivo o già fermo"

echo "Disabilito l’avvio automatico"
sudo systemctl disable $SERVICE || echo "Servizio non abilitato"

echo "Ricarico systemd"
sudo systemctl daemon-reload

FILE="/etc/systemd/system/$SERVICE.service"
if [[ -f $FILE ]]; then
    echo "Rimuovo il file del servizio"
    sudo rm $FILE
else
    echo "File del servizio non trovato"
fi

echo "Verifico che il servizio non sia più presente"
systemctl status $SERVICE || echo "Servizio non trovato ✔"
