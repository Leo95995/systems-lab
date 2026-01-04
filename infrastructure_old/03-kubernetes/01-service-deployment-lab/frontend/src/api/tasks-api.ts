import type { Task } from "../types/types";
import { ExportType } from "../interfaces/interfaces";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

/**
 * Ottiene la lista completa dei task Attivi sulla board
 */
const getAllTasks = async () => {
  const res = await fetch(`${baseUrl}/task`, {
    headers: { "Content-Type": "Application/json" },
  });
  const data = await res.json();
  const status = res.status;
  if (data && status == 200) {
    return data;
  } else {
    return "error";
  }
};

/**
 *  Ottiene la lista completa dei task archiviati
 */
const getArchivedTasks = async () => {
  const res = await fetch(`${baseUrl}/task/archive`, {
    headers: { "Content-Type": "Application/json" },
  });
  const data = await res.json();
  const status = res.status;
  if (data && status == 200) {
    return data;
  } else {
    return "error";
  }
};

const getTaskDetail = async (id: number) => {
  const res = await fetch(`${baseUrl}/task/${id}`, {
    headers: { "Content-Type": "Application/json" },
  });
  const data = await res.json();
  const status = res.status;
  if (data && status == 200) {
    return data;
  } else {
    return "error";
  }
};

const updateTask = async (id: number, body: Partial<Task>) => {
  const res = await fetch(`${baseUrl}/task/${id}`, {
    headers: { "Content-Type": "Application/json" },
    body: JSON.stringify(body),
    method: "PATCH",
  });
  const data = await res.json();
  const status = res.status;
  if (data && status == 200) {
    return data;
  } else {
    return { error: "Errore nell aggiornamento del task", errors: data.errors };
  }
};

/**
 * Funzione che consente di archiviare uno specifico task.
 */

const archiveTask = async (id: number, body: { archiviato: boolean }) => {
  const res = await fetch(`${baseUrl}/task/archive/${id}`, {
    headers: { "Content-Type": "Application/json" },
    body: JSON.stringify(body),
    method: "PATCH",
  });
  const data = await res.json();
  const status = res.status;
  if (data && status == 200) {
    return data;
  } else {
    return { error: "Errore nell aggiornamento del task", errors: data.errors };
  }
};

const create_task = async (body: Partial<Task>) => {
  const res = await fetch(`${baseUrl}/task`, {
    headers: { "Content-Type": "Application/json" },
    body: JSON.stringify(body),
    method: "POST",
  });
  const data = await res.json();
  const status = res.status;
  if (data && status == 201) {
    return data;
  } else {
    return { error: "Errore nell aggiornamento del task", errors: data.errors };
  }
};

const deleteTask = async (id: number) => {
  const res = await fetch(`${baseUrl}/task/${id}`, {
    headers: { "Content-Type": "Application/json" },
    method: "DELETE",
  });
  const data = await res.json();
  const status = res.status;
  if (data && status == 200) {
    return data;
  } else {
    return { error: "Errore nella cancellazione del task" };
  }
};

/**
 * /task/export/json
 */ 
const dump_db = async (exportType: ExportType) => {
  const res = await fetch(`${baseUrl}/task/export/json?status=${exportType}`, {
    headers: { "Content-Type": "Application/json" },
    method: "GET",
  });
  const data = await res.json();
  const status = res.status;
  if (data && status == 200) {
    return data;
  } else {
    return { error: "Errore nell'export del db" };
  }
};

const import_json = async (tasks_to_insert: Task[]) => {
  const res = await fetch(`${baseUrl}/task/import-json`, {
    headers: { "Content-Type": "Application/json" },
    method: "POST",
    body: JSON.stringify(tasks_to_insert)
  });
  const data = await res.json();
  const status = res.status;
  if (data && status == 200) {
    return data;
  } else {
    return { error: "Errore nell'import dei file" };
  }
};

export const TaskService = {
  getAllTasks,
  getArchivedTasks,
  getTaskDetail,
  dump_db,
  import_json,
  create_task,
  updateTask,
  archiveTask,
  deleteTask,
};
