import { Tooltip } from "antd";
import { stateOptions } from "../../../data/data";
import type { ITaskCard } from "../../../interfaces/interfaces";
import type { Stato, Task } from "../../../types/types";
import { utils } from "../../../utils/utils";
import CustomSelect from "../../Select/Select";
import { DeleteFilled, EditFilled, FolderFilled } from "@ant-design/icons";

const TaskCard: React.FC<ITaskCard> = ({
  task,
  openEditModal,
  onDelete,
  editTask,
  onArchive,
}) => {
  const { id, titolo, data, descrizione, stato } = task;
  const { formatDate } = utils;

  const changeTaskStatus = (newStatus: Stato) => {
    const newTask: Task = {
      id,
      titolo,
      descrizione,
      stato: newStatus,
      data,
    };

    editTask && editTask(id, newTask);
  };

  return (
    <div
      className={`w-full h-40 p-4 rounded-2xl bg-white border border-gray-300 shadow-sm relative hover:shadow-md transition-shadow duration-200`}
    >
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold text-gray-800 overflow-ellipsis line-clamp-1 h-8 mr-8">
          {titolo}
        </h2>
        <div className="flex">
          <span
            className={`text-sm font-medium rounded-full flex flex-col items-center`}
          >
            Stato
            <CustomSelect
              options={stateOptions}
              defaultVal={stato}
              width={100}
              onChange={(e) => changeTaskStatus(e)}
              label={""}
            />
          </span>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <p className="text-gray-600 text-sm m-0 overflow-hidden max-w-20 md:max-w-40 xl:max-w-70 text-ellipsis line-clamp-2">
            {descrizione}
          </p>
          <p className="text-sm text-gray-400">{formatDate(data)}</p>
        </div>

        <div className="flex items-center gap-2 mt-5">
          <Tooltip title="Modifica">
            <button
              onClick={() => {
                openEditModal(task);
              }}
              className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 rounded-md border border-blue-200 cursor-pointer h-fit"
            >
              <EditFilled/>
            </button>
          </Tooltip>
          <Tooltip title="Elimina">
            <button
              onClick={() => onDelete(id as number)}
              className="text-red-600 hover:text-red-800 text-sm px-2 py-1 rounded-md border border-red-200 cursor-pointer h-fit"
            >
              <DeleteFilled/>
            </button>
          </Tooltip>
             <Tooltip title="Archivia">
            <button
              onClick={() => onArchive(id as number, true)}
              className="text-yellow-400 hover:text-yellow-600 text-sm px-2 py-1 rounded-md border border-yellow-200 cursor-pointer h-fit"
            >
              <FolderFilled />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
