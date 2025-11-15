import { useEffect, useState } from "react";
import { TaskService } from "../../api/tasks-api";
import ArchiveList from "../../components/Archive/ArchiveList/ArchiveList";
import type { Task } from "../../types/types";
import { notification } from "antd";

const Archive: React.FC = () => {
  const [archivedTaskList, setArchivedTaskList] = useState<Task[]>([]);
  const [total, setTotal] = useState<number>(0);
  const taskService = TaskService;
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    get_archived_list();
  }, []);

  const get_archived_list = async () => {
    setIsLoading(true)
    const archivedTask = await taskService.getArchivedTasks();

    const res = await archivedTask;
    
    if (archivedTask.tasks) {
      setArchivedTaskList(archivedTask.tasks);
      setTotal(res.total);
    } else {
      setArchivedTaskList([]);
      setTotal(0);
    }
    setIsLoading(false)
  };

  const delete_task = async (id: number) => {
    const res = await taskService.deleteTask(id);
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
    get_archived_list();
  };

  const restore_task = async (id: number, value: boolean) => {
    const task = {
      archiviato: value,
    };
    const res = await taskService.archiveTask(id, task);

    if (res.errors) {
      notification.error({
        description: `Errore nell'archiviazione del task`,
        message: `Errore`,
      });
      return;
    } else {
      notification.success({
        message: <b>Successo</b>,
        description: "Task ripristinato con successo",
      });
    }
    get_archived_list();
  };

  return (
    <>
      <ArchiveList
        total={total}
        tasks={archivedTaskList}
        isLoading={isLoading}
        onDelete={delete_task}
        onRestore={restore_task}
        setTotal={setTotal}
      />
    </>
  );
};

export default Archive;
