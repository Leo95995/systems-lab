import type React from "react";
import { TaskService } from "../../api/tasks-api";
import { useEffect, useState, type ReactNode } from "react";
import { Stato, type Task } from "../../types/types";
import TaskList from "../../components/Tasks/TaskList/TaskList";
import { GenericModal } from "../../components/Modals/genericModal";
import CreateTaskForm from "../../components/Form/CreateTaskForm";
import EditTaskForm from "../../components/Form/EditTaskForm";
import { notification } from "antd";
import GenericDropdown from "../../components/DropDown/GenericDropdown";
import type { ExportType } from "../../interfaces/interfaces";
import { exportMenu } from "../../data/data";
import FileUploader from "../../components/FileUploader/FileUploader";

const HomePage: React.FC = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {
    getAllTasks,
    updateTask,
    archiveTask,
    deleteTask,
    create_task,
    dump_db,
    import_json,
  } = TaskService;
  const [editTask, setEditTask] = useState<boolean>(false);
  const [createTask, setCreateTask] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [reload, setReload] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [editFormErrors, setEditFormErrors] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState<Stato>(Stato.DA_FARE);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  useEffect(() => {
    window.innerWidth < 1000 ? setIsMobile(true) : setIsMobile(false);

    window.addEventListener("resize", () => {
      window.innerWidth < 1000 ? setIsMobile(true) : setIsMobile(false);
    });

    window.removeEventListener("resize", () => {
      window.innerWidth < 1000 ? setIsMobile(true) : setIsMobile(false);
    });
  }, []);

  useEffect(() => {
    getTaskList();
    renderTaskList();
  }, [reload]);

  const onSubmitCreateForm = (data: Partial<Task>) => {
    post_task(data);
  };

  const onSubmitEditForm = (data: Task) => {
    edit_task(data.id, data);
  };

  const getTaskList = async () => {
    setIsLoading(true);
    const value = await getAllTasks();
    setTaskList(value.tasks);
    setIsLoading(false);
  };

  const fileDownload = (nomeFile: string, dati: any) => {
    const blob = new Blob([dati], { type: "application/octet-stream" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = nomeFile;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

  const triggerExport = async (exportType: ExportType) => {
    setIsExporting(true);
    const res = await dump_db(exportType);
    fileDownload(`task-${exportType}.json`, JSON.stringify(res.data));
    setIsExporting(false);
  };

  const sendfile = async (taskList: Task[]) => {
    setIsExporting(true);
    const res = await import_json(taskList);
    if(res.result){
      const { importati , errori } = res.result; 
      if(res?.errori?.length > 0){
        notification.warning({message:<b>Sono stati imporati {importati} task ed è fallito l'import di {errori.length} task</b>});
      }else{
        notification.success({message: <b>Sono stati importati {importati} task</b>});
      }
    }
    setIsExporting(false);
    getTaskList()
  };

  const getUpdatedDatas = () => {
    setReload(!reload);
  };

  const getFilteredTask = (taskStatus: Stato) => {
    switch (taskStatus) {
      case Stato.DA_FARE:
        return taskList?.filter((task) => task.stato === Stato.DA_FARE);
      case Stato.IN_CORSO:
        return taskList?.filter((task) => task.stato === Stato.IN_CORSO);
      case Stato.COMPLETATO:
        return taskList?.filter((task) => task.stato === Stato.COMPLETATO);
    }
  };

  const post_task = async (body: Partial<Task>) => {
    const res = await create_task(body);
    if (res.error) {
      setFormErrors(res.errors);
    } else {
      notification.success({
        message: <b>Successo</b>,
        description: "Task creato con successo",
      });
      setCreateTask(false);
      setFormErrors([]);
    }
    getUpdatedDatas();
  };

  const delete_task = async (id: number) => {
    const res = await deleteTask(id);
    if (res.error) {
      notification.error({
        message: <b>Errore</b>,
        description: "Errore nella cancellazione del task",
      });
    } else {
      notification.success({
        message: <b>Successo</b>,
        description: "Task eliminato con successo",
      });
    }
    getUpdatedDatas();
  };

  /**
   * Funzione che permette di triggerare l'archiviazione di un Task.
   */

  const archive_task = async (id: number, value: boolean) => {
    const task = {
      archiviato: value,
    };
    const res = await archiveTask(id, task);

    if (res.errors) {
      notification.error({
        description: `Errore nell'archiviazione del task`,
        message: `Errore`,
      });
    } else {
      notification.success({
        message: <b>Successo</b>,
        description: "Task archiviato con successo",
      });
    }
    getUpdatedDatas();
  };

  const edit_task = async (id: number, body: Task) => {
    const taskBody: Partial<Task> = {
      titolo: body?.titolo,
      descrizione: body?.descrizione,
      stato: body?.stato,
      data: body?.data,
    };
    const res = await updateTask(id, taskBody);

    if (res.errors) {
      setEditFormErrors(res.errors);
    } else {
      notification.success({
        message: <b>Successo</b>,
        description: "Task aggiornato con successo",
      });
      setEditTask(false);
      setEditFormErrors([]);
    }
    getUpdatedDatas();
  };

  const trigger_edit_modal = (task: Task) => {
    setEditTask(true);
    setSelectedTask(task);
  };

  const renderTitle = (title: string) => {
    switch (title) {
      case "COMPLETATO":
        return "COMPLETATI";
      default:
        return title;
    }
  };

  const renderTaskList = () => {
    const list: ReactNode[] = [];
    for (const key in Stato) {
      const status = Stato[key as keyof typeof Stato];
      const title = key.replace("_", " ");

      if (isMobile) {
        if (status === selectedTab) {
          list.push(
            <TaskList
              key={status}
              title={renderTitle(title)}
              isLoading={isLoading}
              tasks={getFilteredTask(status)}
              onDelete={delete_task}
              openEditModal={trigger_edit_modal}
              editTask={edit_task}
              onArchive={archive_task}
            />
          );
        }
      } else {
        list.push(
          <TaskList
            key={status}
            title={renderTitle(title)}
            isLoading={isLoading}
            tasks={getFilteredTask(status)}
            onDelete={delete_task}
            openEditModal={trigger_edit_modal}
            editTask={edit_task}
            onArchive={archive_task}
          />
        );
      }
    }

    return list;
  };

  const renderMobileTabs = () => {
    return (
      <div className="flex gap-2">
        <button
          onClick={() => setSelectedTab(Stato.DA_FARE)}
          className={`p-2 ${
            selectedTab === Stato.DA_FARE ? "bg-green-300" : "bg-gray-200"
          } cursor-pointer rounded-md`}
        >
          Da fare
        </button>
        <button
          onClick={() => setSelectedTab(Stato.IN_CORSO)}
          className={`p-2 ${
            selectedTab === Stato.IN_CORSO ? "bg-green-300" : "bg-gray-200"
          } cursor-pointer rounded-md`}
        >
          In Corso
        </button>
        <button
          onClick={() => setSelectedTab(Stato.COMPLETATO)}
          className={`p-2 ${
            selectedTab === Stato.COMPLETATO ? "bg-green-300" : "bg-gray-200"
          } cursor-pointer rounded-md`}
        >
          Completato
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="my-2 flex gap-2 items-center">
        <button
          onClick={() => setCreateTask(true)}
          className="p-2 mt-4 rounded-md bg-blue-800 text-white cursor-pointer hover:bg-blue-900 hover:text-white"
        >
          Crea nuovo task
        </button>
        <GenericDropdown
          items={exportMenu}
          content={"Esporta come JSON"}
          itemAction={triggerExport}
          isExporting={isExporting}
        />
        <FileUploader sendFile={sendfile} />
      </div>
      {isMobile && renderMobileTabs()}
      <div className="my-2 h-full flex gap-4 py-4">{renderTaskList()}</div>
      <GenericModal
        isFullscreen={false}
        isOpen={editTask}
        onClose={() => {
          setEditFormErrors([]);
          setEditTask(false);
        }}
        children={
          <EditTaskForm
            taskToEdit={selectedTask}
            onSubmit={onSubmitEditForm}
            errors={editFormErrors}
          />
        }
      />
      <GenericModal
        isFullscreen={false}
        isOpen={createTask}
        onClose={() => {
          setFormErrors([]);
          setCreateTask(false);
        }}
        children={
          <CreateTaskForm errors={formErrors} onSubmit={onSubmitCreateForm} />
        }
      />
    </>
  );
};

export default HomePage;
