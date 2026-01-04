#!/bin/bash

# --- Config iniziale ---
BACKUP_ROOT="./backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)


# Verifico la presenza dei parametri
CONTAINER_NAME=$1
INTERNAL_PATH=$2

if [[ -z "$CONTAINER_NAME" || -z "$INTERNAL_PATH" ]]; then
    echo "Uso: $0 <nome_container> <path_interno_dati>"
    echo "Esempio: $0 test-db /data"
    exit 1
fi

# Creazione cartella di destinazione specifica
DEST_DIR="$BACKUP_ROOT/${CONTAINER_NAME}_$TIMESTAMP"
mkdir -p "$DEST_DIR"

echo "--- Avvio Backup del container: $CONTAINER_NAME ---"

# controllo se il container esiste e è attivo
if ! docker ps --format '{{.Names}}' | grep -q "^$CONTAINER_NAME$"; then
    echo "Errore: Il container '$CONTAINER_NAME' non è in esecuzione o non esiste."
    exit 1
fi

# faaccio la copia con docker cp del path interno.
# uso tar per comprimere 
echo "Copia dati da $INTERNAL_PATH..."
# 
if docker cp "$CONTAINER_NAME":"$INTERNAL_PATH" "$DEST_DIR"; then
    echo "backup completato in: $DEST_DIR"
    
# uso tar per comprimere 
    tar -czf "${DEST_DIR}.tar.gz" -C "$BACKUP_ROOT" "${CONTAINER_NAME}_$TIMESTAMP"
    rm -rf "$DEST_DIR" # rimuovo la folder non compressa
    echo "archivio creato: ${DEST_DIR}.tar.gz"
else
    echo "Errore durante la copia dei dati."
    exit 1
fi

echo "--- Backup effettuato ---"