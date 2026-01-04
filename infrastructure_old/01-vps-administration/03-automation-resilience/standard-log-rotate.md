### File: `LOGROTATE_GUIDE.md`

# Guida Completa alla Configurazione di Logrotate

Esempio per l'utilizzo di logrotate

## Configurazione Standard

Dentro la folder /etc/logrotate.d vengono tenute le config
ad esempi ho un file
creo un file in `/etc/logrotate.d/myapp` e incolla la seguente roba:

```bash
/home/leo/myapp/*.log {
    # 1. Frequenza e Ritenzione
    daily # viene eseguito giornalente
    rotate 5 # quanti ne tiene
    size 1M # soglia dimensione
    compress
    delaycompress
    missingok
    notifempty
    copytruncate
    
    # 5. Permessi
    create 0644 leo leo
    postrotate
        echo "Log ruotato con successo il $(date)" >> /home/leox/scraper/rotation_history.log
    endscript
}
```


Spiegazione


* **`daily`**: Tenta di eseguire la rotazione ogni giorno. Altre opzioni: `weekly`, `monthly`.
* **`rotate 5`**: Il sistema mantiene 5 file vecchi, quando arriva il sesto il piu vecchio si elimina

* **`size 1M`**: La rotazione avviene sole se il file ha superato 1 Megabyte altrimenti non ruota mai.
* **`compress`**: comprimo i log vecchi usando gzip riducendod fino al 90% lo spazio preso.
* **`delaycompress`**: Dice a logrotate di non comprimere il file immediatamente dopo la rotazione, e di aspettare il successivo ciclo.

* **`missingok`**: se il file di log è assente non tira erroiri
* **`notifempty`**: non ruota il file di log se è vuoto
* **`copytruncate`**: Invece di rinominare il file logrotate in questo modo copia il contenuto in un backup e poi svuota l'originale. Il file rimane lì  con stesso nome e lo stesso "ID" per l' OS

* **`postrotate/endscript`**: posso inserire comandi che vengono tirati dopo la rotazione



## come agisce logrotate 

- il sistema systemd o cron scatta ad un orario fisso. ho la configurazione in /etc/crontab

- sistema lancia comando /usr/sbin/logrotate /etc/logrotate.conf.

- Lettura: Logrotate legge /etc/logrotate.conf che, tramite include, carica la config che ho ad esempio /etc/logrotate.d/myapp. (counque il path di reference è "/etc/logrotate.d")

- Logrotate va sul file /home/leo/myapp/esempio.log e misura peso e data.

- checka le condizioni-> Se il file è > 1MB (size 1M) OPPURE è passato un giorno (daily): PROCEDE.
    sennò si ferma 

- poi fa copytruncate 

    Copia il contenuto di esempio.log in esempio.log.1.

    svuota esempio log e tiene il vecchio file come esempio.log.1 e potenzialmente (cosa migliore) se gliel'ho messa come opzione va comprimere i file vecchui in .gz risparmiando space (es. .2, .3) in .gz.

- Cancella i file più vecchi del limite impostato (ex rotate 5).

- aggiorna il file status con la data odierna e aspetta il ciclo successivo.





### comandi utili

```bash
# Debug Mode: Simula la rotazione senza toccare i file. 
logrotate -d /etc/logrotate.d/myapp 
# Force Forza la rotazione immediata
logrotate -f /etc/logrotate.d/myapp
# Controlla quando è stata fatta l'ultima rotazione per ogni file. 
cat /var/lib/logrotate/status
```




nella folder 


```bash
# Se faccio cat di etc crontab trovo questo

cat /etc/crontab
# questo sotto è quando vengono tirati i cron

# Example of job definition:
# .---------------- minute (0 - 59)
# |  .------------- hour (0 - 23)
# |  |  .---------- day of month (1 - 31)
# |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...
# |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
# |  |  |  |  |
# *  *  *  *  * user-name command to be executed
17 *	* * *	root	cd / && run-parts --report /etc/cron.hourly
25 6	* * *	root	test -x /usr/sbin/anacron || { cd / && run-parts --report /etc/cron.daily; }
47 6	* * 7	root	test -x /usr/sbin/anacron || { cd / && run-parts --report /etc/cron.weekly; }
52 6	1 * *	root	test -x /usr/sbin/anacron || { cd / && run-parts --report /etc/cron.monthly; }
#
```


abbiamo anche systemctl list-timers che include tutti i timer se volessimo verificarli.