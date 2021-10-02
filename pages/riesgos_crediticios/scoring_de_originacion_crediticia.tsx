import React from "react";
import Sidebar from "../../components/Layout/Sidebar";

export default function ScoringDeOriginacionCrediticia() {
  return (
    <div className="flex min-h-screen m-auto w-full">
      {<Sidebar />}
      <main className="m-10 w-full">
        <div className="flex flex-col justify-center  p-10 border  w-full">
          <h2 className="font-bold text-2xl mb-10">
            Scoring de originación crediticia
          </h2>
        </div>
      </main>
    </div>
  );
}
