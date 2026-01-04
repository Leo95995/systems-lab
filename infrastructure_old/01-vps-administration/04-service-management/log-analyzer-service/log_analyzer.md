# Log Analyzer

Script Bash per l'analisi rapida di file log (Nginx/Apache). Estrae statistiche su IP e pagine di errore.

## Funzionalità
- Calcolo righe totali del file.
- Classifica degli IP più frequenti tramite Regex.
- Identificazione delle pagine con errori 404 e 500.
- Generazione automatica di un report testuale datato.

## Utilizzo
Assicurati di avere i permessi di esecuzione:
`chmod +x nome_script.sh`

Lancio base:
`./nome_script.sh /percorso/file.log`

Lancio con numero di risultati personalizzato (es. top 10):
`./nome_script.sh /percorso/file.log 10`

