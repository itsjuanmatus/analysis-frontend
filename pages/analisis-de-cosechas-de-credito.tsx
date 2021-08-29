import React from "react";
import Sidebar from "../components/Layout/Sidebar";

export default function analisisDeCosechasDeCredito() {
  return (
    <div className="flex min-h-screen">
      {<Sidebar />}
      <main className="m-10">
        <nav></nav>
        <div className="flex flex-col justify-center">
          <h2 className="font-bold text-2xl mb-10">Análisis de cosechas de credito</h2>
        </div>
      </main>
    </div>
  );
}
