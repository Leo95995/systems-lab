
import { Stato } from "../types/types";
import type { IExportMenu } from "../interfaces/interfaces";
export const stateOptions = [
  { label: "Da fare", value: Stato.DA_FARE },
  { label: "In Corso", value: Stato.IN_CORSO },
  { label: "Completato", value: Stato.COMPLETATO },
];

export const filterStateOptions = [
  { label: "Tutti", value: "tutti" },
  { label: "Da fare", value: Stato.DA_FARE },
  { label: "In Corso", value: Stato.IN_CORSO },
  { label: "Completato", value: Stato.COMPLETATO },
];

export const taskErrorsInitialState = {
  titolo: "",
  descrizione: "",
  stato: "",
  data: "",
};

export const exportMenu : IExportMenu[]  = [{
    key: "1",
    label: "Esporta tutti i task",
    action:  "all"
  },
  {
    key: "2",
    label: "Esporta task attivi",
    action: "actives"
    
  },
  {
    key: "3",
    label: "Esporta task archiviati",
    action: "archived"
  },
]
