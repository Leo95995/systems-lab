-- creo la tabella task per inizializzare il db
CREATE TABLE IF NOT EXISTS task (
    id SERIAL PRIMARY KEY,
    titolo VARCHAR(255) NOT NULL UNIQUE,
    descrizione TEXT,
    data BIGINT,
    stato VARCHAR(50) NOT NULL,
    archiviato BOOLEAN NOT NULL DEFAULT FALSE
);
