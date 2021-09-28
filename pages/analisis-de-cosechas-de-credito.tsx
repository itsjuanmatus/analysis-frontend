import React, { useState, useEffect } from "react";
import Sidebar from "../components/Layout/Sidebar";
import UploadFiles from "../components/UploadFiles";
import UploadDesembolsos from "../components/UploadDesembolsos";
import storedProcedure from "./api/storedProcedure";

export default function analisisDeCosechasDeCredito() {
  const initialValues = {
    fechaInicial: "2015-06-01",
    fechaFinal: "2018-11-30",
  };

  const [value, setValue] = useState(initialValues);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setValue({ ...value, [name]: value });
  };

  const saveValue = () => {
    var data = {
      fechaInicial: value.fechaInicial,
      fechaFinal: value.fechaFinal,
    };

    storedProcedure.create(data)
      .then((res) => {
        console.log(res.data);
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
          <div className="max-w-xl">
            {" "}
            <h2 className="font-bold text-2xl mb-10">
              Análisis de cosechas de credito
            </h2>
            <div className="">
              <h3 className="font-semibold text-xl">
                Subir archivos de cartera
              </h3>
              <p className="mb-4">Columnas requeridas en esta tabla: id, ...</p>
              <UploadFiles />
            </div>
          </div>
          <div className="mt-14">
            <h3 className="font-semibold text-xl">
              Subir archivos de desembolso
            </h3>
            <p className="mb-4">Columnas requeridas en esta tabla: id, ...</p>
            <UploadDesembolsos />

            <div className="submit-form">
              <div>
                <div className="form-group">
                  <label htmlFor="fechaInicial">Fecha Inicial</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fechaInicial"
                    required
                    value={value.fechaInicial}
                    onChange={handleInputChange}
                    name="fechaInicial"
                  />
                </div>{" "}
                <div className="form-group">
                  <label htmlFor="fechaFinal">Fecha Final</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fechaFinal"
                    required
                    value={value.fechaFinal}
                    onChange={handleInputChange}
                    name="fechaFinal"
                  />
                </div>
                <button onClick={saveValue} className="btn btn-success">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        <div></div>
      </main>
    </div>
  );
}
