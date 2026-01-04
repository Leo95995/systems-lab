#stage 1: builder -> uso la versione slim di node perchè ho con essa i tool di compilazione . altrimenti usare alpine
FROM node:20-slim AS builder
WORKDIR /app

# copio solo i file dei pacchetti per sfruttare cache
COPY package*.json ./
# uso ci invecE che npm install in prod (ci dovrebbe ignorare le modifiche al lockfile)
RUN npm ci

# copio il resto del codice e buildo  ex per Typescript
COPY . .
# RUN npm run build 

# stage2: creo il runner
FROM node:20-alpine AS runner
WORKDIR /app

# a questo punto creo un utente non-root e gli assegno la cartella per limitare i permessi di root
# girando come root sarebbe un rischio di sicurezza
RUN addgroup -S nodegroup && adduser -S nodeuser -G nodegroup
USER nodeuser

# copio dal builder solo ciò che mi serve, metto l'ownership all'utente perchè di default sennò mi prende il copy da root
# o dall'utente usato
COPY --from=builder --chown=nodeuser:nodegroup /app/node_modules ./node_modules
COPY --from=builder --chown=nodeuser:nodegroup /app/package*.json ./
COPY --from=builder --chown=nodeuser:nodegroup /app .

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "src/index.js"]