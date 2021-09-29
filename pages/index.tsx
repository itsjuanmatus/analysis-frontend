import type { NextPage } from "next";
import Sidebar from "../components/Layout/Sidebar";
import { useAuth0 } from "@auth0/auth0-react";
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

  if (isAuthenticated) {
    return (
      <div className="flex min-h-screen">
        {<Sidebar />}
        <main className="m-10">
          <nav></nav>
          <div className="flex flex-col justify-center">
            <div>
              Hello {user.name}{" "}
              <button
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                Log out
              </button>
            </div>
            <h2 className="font-bold text-2xl mb-10">Aquí van los datos</h2>
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
