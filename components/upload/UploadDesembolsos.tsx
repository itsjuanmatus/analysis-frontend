import React, { useState, useEffect } from "react";
import UploadDesembolsosService from "../../pages/api/UploadDesembolsosService";

const UploadFiles = () => {
  const [selectedFiles, setSelectedFiles] = useState<any>(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const [fileInfos, setFileInfos] = useState([]);

  const selectFile = (event: any) => {
    setSelectedFiles(event.target.files);
  };

  const upload = () => {
    let currentFile = selectedFiles[0];
    setProgress(0);
    setCurrentFile(currentFile);

    UploadDesembolsosService.upload(currentFile, (event: any) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response: any) => {
        return setMessage(response.data.message);
      })
      .catch(() => {
        setProgress(0);
        setMessage(
          "No se pudo subir el archivo! Chequea las razones por las cuales este fallando acá"
        );
        setCurrentFile(undefined);
      });

    setSelectedFiles(undefined);
  };

  return (
    <body>
      <div>
        {currentFile && (
          <div className="progress">
            <div
              className="flex bg-black text-white font-semibold p-2 rounded-md mb-4"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}

        <label className="bg-blue-darkest flex flex-col p-4 mb-5 justify-between text-white font-bold text-lg rounded md cursor-pointer w-max">
          Escoge un archivo
          <input type="file" onChange={selectFile} className="px-1 mt-5" />
        </label>

        <button
          className="p-2 bg-blue-600 rounded text-white px-4 font-semibold"
          disabled={!selectedFiles}
          onClick={upload}
        >
          {`Subir `}
        </button>

        <div className="text-lg font-bold" role="alert">
          {message}
        </div>
      </div>
    </body>
  );
};

export default UploadFiles;
