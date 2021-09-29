import type { NextPage } from "next";
import Sidebar from "../components/Layout/Sidebar";
import { useAuth0 } from "@auth0/auth0-react";
import { Line } from "react-chartjs-2";

function Home() {
  const { isLoading, isAuthenticated, error, loginWithRedirect, logout } =
    useAuth0();

  const { user } = useAuth0<{ name: string }>();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }
  const data = {
    labels: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
      "32",
      "33",
      "34",
      "35",
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
    ],
    datasets: [
      {
        label: "2015 jun",
        data: [
          80, 62, 56, 45, 41, 57, 28, 26, 86, 76, 16, 37, 84, 96, 90, 87, 92,
          76, 51, 83, 25, 89, 29, 76, 59, 97, 37, 42, 89, 33, 23, 74, 2, 35, 90,
          80, 95, 96, 39, 44, 27, 56,
        ],
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "2016 jun",
        data: [
          21, 24, 17, 13, 66, 71, 97, 83, 42, 87, 33, 42, 69, 84, 92, 2, 47, 24,
          53, 42, 95, 89, 6, 57, 42, 86, 2, 20, 85, 63, 5, 80, 76, 12, 87, 60,
          3, 16, 69, 19, 99, 16,
        ],
        fill: false,
        backgroundColor: "rgb(54, 162, 235)",
        borderColor: "rgba(54, 162, 235, 0.2)",
      },
      {
        label: "2017 jun",
        data: [
          50, 11, 9, 70, 30, 31, 45, 50, 80, 32, 41, 89, 77, 11, 83, 15, 98, 35,
          50, 12, 55, 40, 75, 80, 51, 3, 66, 39, 70, 71, 69, 14, 80, 62, 86, 40,
          96, 0, 17, 38, 42, 11,
        ],
        fill: false,
        backgroundColor: "rgb(34, 207, 207)",
        borderColor: "rgb(34, 207, 207, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  if (isAuthenticated) {
    return (
      <div className="flex min-h-screen">
        {<Sidebar />}
        <main className="m-10 w-full">
          <nav></nav>
          <div className="flex flex-col justify-center">
            <h2 className="font-bold text-2xl mb-10">Análisis continuo</h2>
            <div>
              <div className="header">
                <div className="links"></div>
              </div>
              <Line data={data} options={options} />
            </div>
          </div>
        </main>
      </div>
    );
  } else {
    return (
      <>
        {<Sidebar />}
        <button onClick={loginWithRedirect} className="">
          Log in
        </button>
      </>
    );
  }
}

export default Home;
