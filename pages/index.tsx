import type { NextPage } from "next";
import Sidebar from "../components/Layout/Sidebar";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen">
      {<Sidebar />}
      <main className="m-10">
        <nav></nav>
        <div className="flex flex-col justify-center">
          <h2 className="font-bold text-2xl mb-10">Aquí van los datos</h2>
        </div>
      </main>
    </div>
  );
};

export default Home;
