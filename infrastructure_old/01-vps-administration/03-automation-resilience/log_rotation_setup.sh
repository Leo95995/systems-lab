#!/bin/bash

LOG_FILE=$1

# base config

if [[ -z $LOG_FILE ]]; then
    echo "Missing the chosen file path";
    exit 1;
fi

if [ ! -f "$LOG_FILE" ]; then
    echo "The chosen path is invalid."
    exit 1
fi


MAX_SIZE_KB=1024         # max 1mb size
BACKUP_COUNT=5           # SELECT HOW MANY BACKUP FILE I WANT TO PRESERVE
DATE_FORMAT=$(date +"%Y%m%d_%H%M%S")


# with du i get the filesize of the file ( as block size)
FILE_SIZE=$(du -k "$LOG_FILE" | cut -f1)

# verify if the file size is superated
if [ "$FILE_SIZE" -ge "$MAX_SIZE_KB" ]; then
    echo "Rotazione log in corso per $LOG_FILE ($FILE_SIZE KB)..."

    # change the filename adding the date format
    mv "$LOG_FILE" "$LOG_FILE.$DATE_FORMAT"

    # create a new log file empty and give them permissions
    touch "$LOG_FILE"
    chmod 644 "$LOG_FILE"

    # Mke a list of the rotated file then ordinate them by times and delete the oldest
    ls -1tr $LOG_FILE.* 2>/dev/null | head -n -"$BACKUP_COUNT" | xargs -d '\n' rm -f
    # confirmation
    echo "Rotazione completata."
else
    echo "Dimensione log sotto la soglia ($FILE_SIZE KB). Nessuna azione."
fi