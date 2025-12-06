import type React from "react";
import { useEffect, useState } from "react";
import TaskInput from "../Input/input";
import { Stato, type Task } from "../../types/types";
import CustomSelect from "../Select/Select";
import { stateOptions } from "../../data/data";
import dayjs from "dayjs";
import type { ITaskFormErrors, ITaskForm } from "../../interfaces/interfaces";
import { taskErrorsInitialState } from "../../data/data";
const CreateTaskForm: React.FC<ITaskForm> = ({ onSubmit, errors }) => {
  const [taskToCreate, setTaskToCreate] = useState<Partial<Task>>({
    titolo: "",
    descrizione: "",
    stato: Stato.DA_FARE,
    data: Math.floor(Date.now() / 1000),
  });

  const initialState = {
    titolo: "",
    descrizione: "",
    stato: "",
    data: "",
  };

  const [taskFormErrors, setTaskFormErrors] =
    useState<ITaskFormErrors>(taskErrorsInitialState);

  useEffect(() => {
    prepareErrors();
  }, [errors]);

  const prepareErrors = () => {
    if (!errors) {
      setTaskFormErrors(initialState);
      return;
    }
    for (const error of errors) {
      const [key, value] = error.split(":");
      setTaskFormErrors({ ...taskFormErrors, [key]: value });
    }
  };

  const handleChangeTaskValue = (e?: any, type?: string) => {
    // Controllo se sta venendo selezionata una data e la converto in timestamp
    if (e?.$d && e.$d !== null) {
      const date = new Date(e.$d).getTime();
      const timestampInSeconds = Math.floor(date / 1000);
      setTaskToCreate({ ...taskToCreate, data: timestampInSeconds });
    } else if (type === "select") {
      setTaskToCreate({ ...taskToCreate, stato: e });
    } else if (e?.currentTarget?.name) {
      setTaskToCreate({
        ...taskToCreate,
        [e.currentTarget.name]: e?.currentTarget?.value,
      });
    }
  };

  return (
    <>
      <div className="h-full p-8">
        <h1 className="text-2xl"> Crea Task</h1>
        <div className="p-4 w-full h-full flex flex-col items-center justify-center">
          <TaskInput
            name={"titolo"}
            onChange={handleChangeTaskValue}
            label={"Titolo"}
            type={"text"}
            placeholder="Inserisci titolo"
          ></TaskInput>
          <p className="text-red-500 text-sm  w-62">
            {taskFormErrors.titolo && taskFormErrors.titolo}
          </p>
          <TaskInput
            onChange={handleChangeTaskValue}
            name={"descrizione"}
            label={"Descrizione"}
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
            defaultValue={dayjs(new Date())}
            placeholder="Seleziona data"
          />
          <p className="text-red-500 text-sm  w-62">
            {taskFormErrors.data && taskFormErrors.data}
          </p>
          <div className="flex gap-2 m-4">
            <CustomSelect
              options={stateOptions}
              onChange={handleChangeTaskValue}
              label={"Stato"}
            />
          </div>
          <p className="text-red-500 text-sm  w-62">
            {taskFormErrors.stato && taskFormErrors.stato}
          </p>
        </div>
        <div className="flex gap-5 justify-center">
          <button
            className="bg-gray-200 p-2 rounded-md w-20 cursor-pointer hover:bg-gray-300"
            onClick={() => onSubmit(taskToCreate)}
          >
            {" "}
            Crea
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateTaskForm;
