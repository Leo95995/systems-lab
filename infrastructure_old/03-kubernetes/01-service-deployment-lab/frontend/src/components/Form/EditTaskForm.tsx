import type React from "react";
import TaskInput from "../Input/input";
import { useEffect, useState } from "react";
import type { Task } from "../../types/types";
import { stateOptions } from "../../data/data";
import CustomSelect from "../Select/Select";
import { utils } from "../../utils/utils";
import type { ITaskFormErrors, ITaskForm } from "../../interfaces/interfaces";
import { taskErrorsInitialState } from "../../data/data";

const EditTaskForm: React.FC<ITaskForm> = ({
  onSubmit,
  taskToEdit,
  errors,
}) => {
  if (!taskToEdit) {
    return;
  }

  const [currentTask, setCurrentTask] = useState<Task>(taskToEdit);
  const [taskFormErrors, setTaskFormErrors] = useState<ITaskFormErrors>(
    taskErrorsInitialState
  );

  useEffect(() => {
    prepareErrors();
  }, [errors]);

  const prepareErrors = () => {
    if (!errors) {
      setTaskFormErrors(taskErrorsInitialState);
      return;
    }
    for (const error of errors) {
      const [key, value] = error.split(":");
      setTaskFormErrors({ ...taskFormErrors, [key]: value });
    }
  };

  const handleChangeTaskValue = (e?: any, type?: string) => {
    if (e?.$d && e.$d !== null) {
      const date = new Date(e.$d).getTime();
      const timestampInSeconds = Math.floor(date / 1000);
      setCurrentTask({ ...currentTask, data: timestampInSeconds });
    } else if (type === "select") {
      setCurrentTask({ ...currentTask, stato: e });
    } else if (e?.currentTarget?.name) {
      setCurrentTask({
        ...currentTask,
        [e.currentTarget.name]: e?.currentTarget?.value,
      });
    }
  };

  return (
    <>
      <div className="h-full p-8">
        <h1 className="text-2xl"> Modifica Task</h1>
        <div className="p-4 w-full h-full flex flex-col items-center justify-center">
          <TaskInput
            name={"titolo"}
            onChange={handleChangeTaskValue}
            label={"Titolo"}
            type={"text"}
            defaultValue={taskToEdit?.titolo}
            placeholder="Inserisci titolo"
          ></TaskInput>
          <p className="text-red-500 text-sm  w-62">
            {taskFormErrors.titolo && taskFormErrors.titolo}
          </p>
          <TaskInput
            onChange={handleChangeTaskValue}
            name={"descrizione"}
            label={"Descrizione"}
            defaultValue={taskToEdit?.descrizione}
            type={"textarea"}
            placeholder="Inserisci descrizione"
          ></TaskInput>
          <p className="text-red-500 text-sm  w-62">
            {taskFormErrors.descrizione && taskFormErrors.descrizione}
          </p>
          <TaskInput
            name={"data"}
            label={"Data"}
            onChange={handleChangeTaskValue}
            type={"date"}
            defaultValue={utils?.formatDate(taskToEdit?.data)}
            placeholder="Seleziona data"
          />
          <p className="text-red-500 text-sm  w-62">
            {taskFormErrors.data && taskFormErrors.data}
          </p>
          <div className="flex gap-2 m-4">
            <CustomSelect
              options={stateOptions}
              defaultVal={taskToEdit?.stato}
              onChange={handleChangeTaskValue}
              label={"Stato"}
            />
          </div>
          <p className="text-red-500 text-sm  w-62">
            {taskFormErrors.stato && taskFormErrors.stato}
          </p>
          <div className="p-4 flex gap-5 justify-end">
            <button
              className="p-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
              onClick={() => onSubmit(currentTask)}
            >
              {" "}
              Modifica
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTaskForm;
