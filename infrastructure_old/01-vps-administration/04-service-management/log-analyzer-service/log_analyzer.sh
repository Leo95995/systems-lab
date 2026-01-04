#!/bin/bash

# colori per ui
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' 

#mi preparo un file per avere un report dell'analisi effettuata
REPORT_NAME="./report_analisi_log_$(date +%Y%m%d_%H%M).txt"

LOG_FILE=$1
# secondo parametro opzionale per le linee da mostrare. se più di 5 
LINES_TO_SHOW=${2:-5}

# Verifico che sia inserito il path e che sia valido

if [[ -z $LOG_FILE || ! -f $LOG_FILE ]];then
    echo -e "${RED}inserisci un path valido contenente un file${NC}" 
    exit 1
fi
echo -e "${YELLOW}analisi in corso... attendi${NC}"

# Verifico le righe totali
echo -e "linee totali nel file $LOG_FILE: "
wc -l $LOG_FILE 

echo "Report del $(date +%Y_%m_%d_%H:%M)"  >> $REPORT_NAME
echo -e "\n Elenco di ip trovati nel file" >>  $REPORT_NAME

#  Estraggo ogni ip dal file
#
#  -E dice a grep di usare le extended regex
#  -o only matching
#  sort -> Mette gli ip in ordine
#  uniq -c -> cancella i duplicati e aggiunge il conteggio
#  sort -nr -> riordino numericamente e al rovescio
#  head -n 5 prendo i primi 5 ip 

grep -E -o "([0-9]{1,3}\.){3}[0-9]{1,3}" "$LOG_FILE" | sort | uniq -c | sort -nr | head -n $LINES_TO_SHOW >> $REPORT_NAME

# cerco i codici degli errori all'interno del file che sto controllando

echo -e "\n Pagine con errori (404/500):" >> $REPORT_NAME
# con awk mi prendo solo colonna 9 e 7
grep -E " (404|500) " "$LOG_FILE" | awk '{print $9, $7}' | sort | uniq -c | sort -nr | head -n $LINES_TO_SHOW >> $REPORT_NAME

echo -e "${GREEN}Analisi completata con successo , risultato salvato nel file $REPORT_NAME${NC}"