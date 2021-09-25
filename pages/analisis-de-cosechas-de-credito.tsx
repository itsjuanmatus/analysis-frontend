import React, { useState, useEffect } from "react";
import Sidebar from "../components/Layout/Sidebar";
import UploadFiles from "../components/UploadFiles";
import UploadDesembolsos from "../components/UploadDesembolsos";

export default function analisisDeCosechasDeCredito() {
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
          </div>
        </div>
      </main>
    </div>
  );
}
