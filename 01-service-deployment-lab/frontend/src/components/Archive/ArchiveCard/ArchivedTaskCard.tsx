import { DeleteFilled, ReloadOutlined } from "@ant-design/icons";
import { utils } from "../../../utils/utils";
import { Tooltip } from "antd";
import type { IArchiveTaskCard } from "../../../interfaces/interfaces";
import { Stato } from "../../../types/types";

const ArchiveCard: React.FC<IArchiveTaskCard> = ({
  task,
  onDelete,
  onRestore,
}) => {
  const { id, titolo, data, descrizione, stato } = task;
  const { formatDate } = utils;

  const getTagColorByStatus = (stato: string) => {
    switch (stato) {
      case Stato.DA_FARE:
        return "bg-gray-200";
      case Stato.IN_CORSO:
        return "bg-blue-300";
      case Stato.COMPLETATO:
        return "bg-green-300";
    }
  };

  const renderTitle = (titolo: string) => {
    return titolo.replaceAll("_", " ");
  };

  return (
    <div
      className={`w-full h-32 p-4 rounded-2xl bg-white border border-gray-300 shadow-sm relative hover:shadow-md transition-shadow duration-200`}
    >
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold text-gray-800 overflow-ellipsis max-w-40 md:max-w-70 line-clamp-1 h-8 mr-8">
          {titolo}
        </h2>
        <div className="flex">
          <span
            className={`text-xs p-2 font-medium rounded-full flex flex-col items-center ${getTagColorByStatus(
              stato
            )}`}
          >
            {renderTitle(stato)}
          </span>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <p className="text-gray-600 text-sm m-0 overflow-hidden max-w-20 md:max-w-40 xl:max-w-70 text-ellipsis h-10 line-clamp-2">
            {descrizione !== "" ? descrizione : `Nessuna descrizione presente`}
          </p>
          <p className="text-sm text-gray-400">{formatDate(data)}</p>
        </div>

        <div className="flex items-center gap-2 mt-5">
          <Tooltip title="Ripristina">
            <button
              onClick={() => onRestore(id, false)}
              className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 rounded-md border border-blue-200 cursor-pointer h-fit"
            >
              <ReloadOutlined />
            </button>
          </Tooltip>
          <Tooltip title="Cancella">
            <button
              onClick={() => onDelete(id as number)}
              className="text-red-600 hover:text-red-800 text-sm px-2 py-1 rounded-md border border-red-200 cursor-pointer h-fit"
            >
              <DeleteFilled />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default ArchiveCard;
