import type { Task } from "../types/types";

export interface IPageLayout {
  children?: React.ReactNode;
}

/**
 * Interfacce per la sezione Home con i task aggregati
 */
export interface ITaskList {
  tasks: Task[];
  isLoading: boolean;
  title: string;
  onDelete: (id: number) => void;
  onCreate?: (body: Task) => void;
  openEditModal: (task: Task) => void;
  editTask?: (id: number, body: Task) => void;
  onArchive: (id: number , value: boolean)=> void
}

export interface ITaskCard {
  task: Task;
  openEditModal: (task: Task) => void;
  onDelete: (id: number) => void;
  editTask?: (id: number, body: Task) => void;
  onArchive: (id: number, value: boolean) => void;
}
/**
 * Interfacce per la sezione Archivio
 */

export interface IArchiveList {
  tasks: Task[];
  isLoading: boolean;
  total: number;
  onDelete: (id: number) => void;
  onRestore: (id: number , value: boolean)=> void
  setTotal: (value: number) => void
}

export interface IArchiveTaskCard {
  task: Task;
  onDelete: (id: number) => void;
  onRestore: (id: number, value: boolean) => void;
}

/**
 * Interfaccia del task form
 */

export interface ITaskForm {
  onSubmit: (values?: Partial<Task> | any) => void;
  taskToEdit?: Task | undefined;
  errors: string[];
}

// Error interfaces

export interface ITaskFormErrors {
  titolo: string
  descrizione: string
  stato: string
  data: string
}

/**
 * JSON EXPORT INTERFACES
 */

export enum ExportType {
  ALL = "all",
  ARCHIVED = "archived",
  ACTIVES = "actives"
}


export interface IExportMenu {
  key: string
  label: string
  action: string
  [key:string] : string
}


export interface ImportBody {
  
}


