import { useEffect, useState } from "react";
import type { IArchiveList } from "../../../interfaces/interfaces";
import { Stato, type Task } from "../../../types/types";
import Loader from "../../Loader";
import ArchiveCard from "../ArchiveCard/ArchivedTaskCard";
import { filterStateOptions } from "../../../data/data";

import CustomSelect from "../../Select/Select";
const ArchiveList: React.FC<IArchiveList> = ({
  tasks,
  total,
  isLoading,
  onDelete,
  onRestore,
  setTotal,
}) => {
  const [filterList, setFilterList] = useState<Task[]>([]);
  const [currentSelected, setCurrentSelected] = useState<string>("tutti");

  useEffect(() => {
    handleFilterSelection(currentSelected);
  }, [currentSelected, tasks]);

  const handleFilterSelection = (filter: string) => {
    const clonedTasks = [...tasks];
    switch (filter) {
      case "tutti":
        setFilterList(clonedTasks);
        setTotal(clonedTasks.length);
        break;
      case Stato.DA_FARE:
        const da_fare = clonedTasks.filter(
          (task) => task.stato === Stato.DA_FARE
        );
        setTotal(da_fare?.length);
        setFilterList(da_fare);
        break;
      case Stato.IN_CORSO:
        const in_corso = clonedTasks.filter(
          (task) => task.stato === Stato.IN_CORSO
        );
        setTotal(in_corso?.length);
        setFilterList(in_corso);
        break;

      case Stato.COMPLETATO:
        const completato = clonedTasks.filter(
          (task) => task.stato === Stato.COMPLETATO
        );
        setTotal(completato?.length);
        setFilterList(completato );
        break;

      default:
        setFilterList(clonedTasks);
    }
  };

  const renderTasks = () => {
    if (!filterList.length && !isLoading) {
      return (
        <div className="h-full w-full flex  justify-center items-center text-xl font-semibold">
          Nessun task presente
        </div>
      );
    }
    if (isLoading) {
      return (
        <>
          <div className="h-full flex items-center text-xl font-semibold">
            <div className="flex flex-col h-full w-full justify-center items-center">
              <Loader /> <span>Caricamento Task </span>
            </div>
          </div>
        </>
      );
    }
    if (filterList?.length) {
      return (
        <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid gap-2">
          {filterList?.map((task: Task) => {
            return (
              <ArchiveCard
                key={task?.id}
                task={task}
                onDelete={onDelete}
                onRestore={onRestore}
              />
            );
          })}
        </div>
      );
    }
  };

  return (
    <>
      <div className="my-2 flex gap-2">
        
      </div>
      <div className="flex h-190 flex-col pb-4  flex-1 border bg-white shadow-md border-gray-300 px-4 rounded-md overflow-y-scroll">
        <span className="py-4">
          <b>Risultati totali per {currentSelected.replaceAll('_', ' ')}:</b> {total}
        </span>
        <div className="flex justify-center">
          <h2 className="p-2 text-3xl mb-4 font-bold text-blue-900">
            Task Archiviati
          </h2>
        </div>
        <div className="py-4 flex-col flex">
          <label className="text-xs font-bold ">Filtra per:</label>
          <CustomSelect
            options={filterStateOptions}
            label={""}
            onChange={(e) => setCurrentSelected(e)}
          />
        </div>
        {renderTasks()}
      </div>
    </>
  );
};

export default ArchiveList;
