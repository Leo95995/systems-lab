# uso alpine per la dimensione piccola dell'immagine
FROM node:20-alpine AS build-stage


WORKDIR /app

COPY package*.json ./
# installo le dipendenza
RUN npm ci

COPY . .
# genero la folder dist buildando
RUN npm run build

# in questo secondo stage dopo aver buildato con node lo tolgo e uso nginx
FROM nginx:stable-alpine AS production-stage

# adesso la mia configurazione customizzata di nginx che andrò poi a copiare sul container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# mi copio i file statici buildati dentro dist nel primo stage 
# e faccio in modo di farli servire da nginx nella sua cartella standard
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

# !IMPORTANTE
# avvio Nginx con "daemon off;"perchè cosi posso farlo girare in primo piano
# infatti su docker, il container vive solo finché il processo principale (che è pid 1) è attivo
# quindi se nginxpartisse come demonee equindi in background, il processo principale terminerebbe subito dopo l'avvio, 
# facendo questo docker spegnerebbe il container pensando che abbia finito il suo lavoro e quindi non potrebbe funzionare
CMD ["nginx", "-g", "daemon off;"]