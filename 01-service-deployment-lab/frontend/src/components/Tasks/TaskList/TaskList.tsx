import type { ITaskList } from "../../../interfaces/interfaces";
import type { Task } from "../../../types/types";
import Loader from "../../Loader";
import TaskCard from "../TaskCard/TaskCard";


const TaskList: React.FC<ITaskList> = ({
  tasks,
  isLoading,
  title,
  openEditModal,
  onDelete,
  editTask,
  onArchive
}) => {
  const renderTasks = () => {
    if (!tasks?.length && !isLoading) {
      return (
        <div className="h-full flex items-center text-xl font-semibold">
          Nessun task presente
        </div>
      );
    }
    if (isLoading) {
      return (
        <>
          <div className="h-full flex items-center text-xl font-semibold">
            <div className="flex flex-col items-center">
              {" "}
              <Loader /> <span>Caricamento Task </span>
            </div>
          </div>
        </>
      );
    }
    if (tasks.length) {
      return tasks?.map((task: Task) => {
        return (
          <TaskCard
            key={task?.id}
            task={task}
            onDelete={onDelete}
            openEditModal={openEditModal}
            editTask={editTask}
            onArchive={onArchive}
          />
        );
      });
    }
  };

   

  return (
    <div className="flex h-190 flex-col pb-4 gap-2 flex-1 border bg-white shadow-md border-gray-300 px-4 items-center rounded-md overflow-y-scroll">
      <h2 className="p-2 text-2xl my-2 font-bold">{title}</h2>
      {renderTasks()}
    </div>
  );
};

export default TaskList;
