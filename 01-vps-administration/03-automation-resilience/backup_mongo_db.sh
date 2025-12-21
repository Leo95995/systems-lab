#!/bin/bash
set -e

# veririfco se siste mongo dump sennò installo mongo db tools
check_tools() {
    command -v mongodump &> /dev/null || (echo "Installazione tools..." && sudo apt update && sudo apt install -y mongodb-database-tools)
}

# passo i parametri url nome
MONGO_URI=$1   # es: mongodb://localhost:27017 o la stringa di Atlas
DB_NAME=$2     # nome del database
DEST_DIR=$3    # cartella dove salvare

if [[ -z "$MONGO_URI" || -z "$DB_NAME" || -z "$DEST_DIR" ]]; then
    echo "Parametri da passare $0 <URI> <DB_NAME> <DEST_DIR>"
    echo "Esempio: $0 mongodb://localhost:27017 mio_db ./backups"
    exit 1
fi

# check + preparazione del filename per salvataggio
check_tools
FILE_NAME="${DB_NAME}_$(date +%F_%H%M)"

echo "Backup in corso..."
# faccio archive gzip
mongodump --uri="$MONGO_URI" --db="$DB_NAME" --archive="$DEST_DIR/$FILE_NAME.gz" --gzip

echo "Backup eseguito! Salvato in: $DEST_DIR/$FILE_NAME.gz"