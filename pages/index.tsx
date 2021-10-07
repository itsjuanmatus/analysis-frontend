import Sidebar from '../components/Layout/Sidebar'
import { useAuth0 } from '@auth0/auth0-react'
import Dropdown from '../components/UI/Dropdown'
import FloatingBackground from '../components/UI/FloatingBackground'

function Home ({ tableData }: any) {
  const {
    isLoading,
    isAuthenticated,
    error,
    loginWithRedirect,
    logout
  } = useAuth0()

  const { user } = useAuth0<{ name: string }>()

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Oops... {error.message}</div>
  }

  if (isAuthenticated) {
    return (
      <FloatingBackground
        sidebar={<Sidebar />}
        title='Bienvenido a SAER'
        subtitle=''
      >
        <div></div>
      </FloatingBackground>
    )
  } else {
    return (
      <div className='flex min-h-screen'>
        {<Sidebar />}

        <main className='m-10 w-full'>
          <nav></nav>
          <div className='flex flex-col justify-center'>
            <h2 className='font-bold text-2xl mb-5'>Inicia Sesión Acá</h2>
            <button
              onClick={loginWithRedirect}
              className='mt-2 max-w-max inline-flex 
              items-center px-4 py-2 border border-transparent 
              text-base font-semibold leading-6 rounded-md text-white bg-indigo-600'
            >
              Log in
            </button>
            <div>
              <div className='header'>
                <div className='links'></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default Home
