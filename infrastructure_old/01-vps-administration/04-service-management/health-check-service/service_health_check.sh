#!/bin/bash

LOGFILE="/var/log/health-check.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

echo "===== $DATE =====" >> "$LOGFILE"

# check the reachability of the host
# here i cna insert any target i want
for host in google.com github.com 8.8.8.8; do
    if ping -c 1 -W 2 $host &> /dev/null; then
        echo "$host is reachable" >> "$LOGFILE"
    else
        echo "$host is NOT reachable" >> "$LOGFILE"
    fi
done

echo "" >> "$LOGFILE"
