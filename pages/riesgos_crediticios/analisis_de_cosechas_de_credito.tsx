import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import UploadFiles from "../../components/UploadFiles";
import UploadDesembolsos from "../../components/UploadDesembolsos";
import AnalisisDeCosechas from "../api/analisis_de_cosechas";

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
      });
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
              className="p-2 bg-blue-600 rounded text-white px-4 font-semibold mt-2"
            >
              Enviar
            </button>
            <p>{message}</p>
          </div>
        </div>

        <div></div>
      </main>
    </div>
  );
}
