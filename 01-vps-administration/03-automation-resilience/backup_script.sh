# Script che serve per effettuare il backup

# docker cp è il comando
# test-db è il target
# /data è il path a cui puntiamo dentro il nostro container per backup
# ./backup e dove la roba viene messa poi sulla nostra macchina


# docker cp test-db:/data ./backup

#  I Dati utili per i container 
# Stanno nella sezione Mounts del container quando lo inspecti