import React, { useEffect, useRef, useState } from "react";
import { CheckOutlined } from "@ant-design/icons";
import { notification } from "antd";

const FileUploader: React.FC<{ sendFile: (file: any[]) => void }> = ({
  sendFile,
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [jsonContent, setJsonContent] = useState<any[]>([]);

  useEffect(() => {
    if (uploadedFile !== null) {
      parser(uploadedFile);
    }
  }, [uploadedFile]);

  const fileRef = useRef<any>(null);

  const handleFileUpload = (e: any) => {
    const file: File = e?.target?.files[0];
    if (file.type !== "application/json") {
      notification.error({
        message: <b>File caricato invalido</b>,
        description: `Hai caricato un file di formato ${file.type} , perfavore carica un file json`,
      });
      return;
    } else {
      setUploadedFile(file);
    }
  };

  const parser = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        setJsonContent(json);
      } catch {
        notification.error({ message: "JSON non valido" });
        setUploadedFile(null);
        setJsonContent([]);
      }
    };
    if (uploadedFile !== null) {
      reader.readAsText(file);
    }
  };

  const fakeClick = () => {
    if (fileRef) {
      fileRef?.current?.click();
    }
  };

  return (
    <>
      <div>
        <input
          className="hidden"
          ref={fileRef}
          type="file"
          onChange={(e) => handleFileUpload(e)}
          accept="json"
        />
        {!uploadedFile && (
          <button
            onClick={fakeClick}
            className="p-2 mt-4 rounded-md bg-blue-800 text-white cursor-pointer hover:bg-blue-900 hover:text-white"
          >
            Importa JSON
          </button>
        )}
      </div>
      {uploadedFile && (
        <>
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="flex flex-col gap-2 bg-white border rounded-md border-gray-200 p-4">
              <div className="w-80 md:w-120 flex justify-center flex-col ">
                <h2 className="font-bold text-2xl self-center p-2">
                  File caricato con successo!
                </h2>
                <p>Premendo Conferma,</p>
                <p>
                  il file verrà salvato nel database e unito ai dati già
                  presenti.
                </p>
                <p className="py-2">
                  <b>
                    <CheckOutlined style={{ color: "green" }} />{" "}
                    {uploadedFile.name}
                  </b>
                </p>
              </div>
              <b>Contenuto del file:</b>
              <div className="flex  overflow-y-scroll max-h-130 flex-wrap bg-slate-800 w-80 md:w-120">
                {jsonContent.map((object, index) => {
                  return (
                    <code className="flex flex-col overflow-y-scroll">
                      <div className="p-5 flex-col flex overflow-y-scroll w-80 md:w-120">
                        <b className="text-blue-300 py-2"> Task {index + 1}:</b>
                        {Object.entries(object).map(([key, value]) => (
                          <div key={key} className="flex">
                            <span className="font-semibold mr-2 text-green-400">
                              {key}:
                            </span>
                            <span className="text-white line-clamp-3">
                              {String(value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </code>
                  );
                })}
              </div>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => {
                    sendFile(jsonContent);
                    setUploadedFile(null);
                  }}
                  className="p-1 mt-4 rounded-md bg-gray-400 text-white cursor-pointer hover:bg-gray-500 hover:text-white"
                >
                  Conferma
                </button>
                <button
                  onClick={() => setUploadedFile(null)}
                  className="p-2 mt-4 rounded-md bg-red-800 text-white cursor-pointer hover:bg-red-900 hover:text-white"
                >
                  Annulla
                </button>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 bg-black opacity-40 z-49"></div>
        </>
      )}
    </>
  );
};

export default FileUploader;
