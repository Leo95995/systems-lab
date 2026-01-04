// Types and Enums
export enum Stato {
    DA_FARE = 'da_fare',
    IN_CORSO = 'in_corso',
    COMPLETATO = 'completato'
}

export type Task = {
    id:number;
    titolo: string;
    descrizione: string;
    archiviato?: boolean;
    stato: Stato;
    data: number;
}