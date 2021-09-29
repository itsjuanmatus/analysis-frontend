import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import UploadFiles from "../../components/UploadFiles";
import UploadDesembolsos from "../../components/UploadDesembolsos";
import AnalisisDeCosechas from "../api/analisis_de_cosechas";
import { usePromiseTracker } from "react-promise-tracker";

import { trackPromise } from "react-promise-tracker";


const LoadingIndicator = (props: any) => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && (
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    )
  );
};


export default function analisisDeCosechasDeCredito() {
  
  const initialValues = {
    fechaInicial: "2015-06-01",
    fechaFinal: "2018-11-30",
  };

  const [value, setValue] = useState(initialValues);
  const [message, setMessage] = useState("");

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setValue({ ...value, [name]: value });
  };

  const saveValue = () => {
    var data = {
      fechaInicial: value.fechaInicial,
      fechaFinal: value.fechaFinal,
    };

    trackPromise(
      AnalisisDeCosechas.create(data)
        .then((res) => {
          setValue({
            fechaInicial: res.data.fechaInicial,
            fechaFinal: res.data.fechaFinal,
          });
          console.log(res.data[0]["Proceso terminado con exito"]);
          setMessage(res.data[0]["Proceso terminado con exito"]);
        })
        .catch((e) => {
          console.log(e);
        })
    );
  };

  return (
    <div className="flex min-h-screen m-auto w-full">
      {<Sidebar />}
      <main className="m-10 w-full">
        <div className="flex flex-col justify-center  p-10 border border-gray-400 rounded-md w-full">
          {" "}
          <h2 className="font-bold text-2xl mb-10">
            Análisis de cosechas de credito
          </h2>
          <div className="grid grid-cols-2">
            <div className="">
              <h3 className="font-semibold text-xl">
                Subir archivos de cartera
              </h3>
              <p className="mb-4">Columnas requeridas en esta tabla: id, ...</p>
              <UploadFiles />
            </div>
            <div className="">
              <h3 className="font-semibold text-xl">
                Subir archivos de desembolso
              </h3>
              <p className="mb-4">Columnas requeridas en esta tabla: id, ...</p>
              <UploadDesembolsos />
            </div>
          </div>
          <div className="mt-20 ">
            <div className="flex flex-col">
              <label htmlFor="fechaInicial" className="text-xl font-bold">
                Fecha Inicial
              </label>
              <input
                type="date"
                className="border border-gray-500 rounded-md max-w-max p-2"
                id="fechaInicial"
                required
                value={value.fechaInicial}
                onChange={handleInputChange}
                name="fechaInicial"
              />
            </div>{" "}
            <div className="flex flex-col mt-2">
              <label htmlFor="fechaFinal" className="text-xl font-bold ">
                Fecha Final
              </label>
              <input
                type="date"
                className="border border-gray-500 rounded-md max-w-max p-2"
                id="fechaFinal"
                required
                value={value.fechaFinal}
                onChange={handleInputChange}
                name="fechaFinal"
              />
            </div>
            <button
              onClick={saveValue}
              className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-rose-500 focus:border-rose-700 active:bg-rose-700 transition ease-in-out duration-150"
            >
              <LoadingIndicator />
              Enviar
            </button>
            <p>{message}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
