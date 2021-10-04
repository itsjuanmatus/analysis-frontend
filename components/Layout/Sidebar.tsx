import Link from 'next/link'
import * as Icons from 'react-bootstrap-icons'
/* import { useUser } from "@auth0/nextjs-auth0";

 */ import sidebar from '../data/sidebar'

import { useAuth0 } from '@auth0/auth0-react'

interface Props {
  showSidebar: boolean
  toggleSidebar: () => void
}

const Sidebar = () => {
  /*   const { user } = useUser();
   */

  const {
    isLoading,
    isAuthenticated,
    error,
    loginWithRedirect,
    logout
  } = useAuth0()

  const { user } = useAuth0<{ name: string }>()

  if (isLoading) {
    return <div>Cargando...</div>
  }
  if (error) {
    return <div>Oops... {error.message}</div>
  }
  return (
    <>
      <aside
        className={`sidebar resize-x sticky z-30 left-0 transition-left shadow-xl sm:shadow-none sm:transition duration-500 sm:left-0 transition flex flex-col top-0 w-64 bg-white border-r`}
      >
        <div className='top-0 flex items-center justify-center h-14 border-b'>
          <Link href='/' passHref>
            <div className='h-14 flex items-center text-xl font-bold cursor-pointer'>
              SAER
            </div>
          </Link>
        </div>
        <div className='h-full overflow-y-auto overflow-x-hidden'>
          <div className='flex flex-col py-4 space-y-1'>
            {sidebar.map(section => (
              <ul key={section.path} className='list-none'>
                <li className='px-5'>
                  <div className='flex flex-row items-center h-8'>
                    <div className='text-sm font-light tracking-wide text-gray-500'>
                      {section.name}
                    </div>
                  </div>
                </li>
                {section.items.map(item => (
                  <li key={item.subpath}>
                    <Link href={`/${section.path}/${item.subpath}`}>
                      <a className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 hover:text-primary text-sm text-gray-600  transition-colors duration-100 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6'>
                        <span className='inline-flex ml-4 justify-center items-center'>
                          {item.icon}
                        </span>
                        <span className='ml-2 text-sm tracking-wide truncate'>
                          {item.anchor}
                        </span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
            <ul key='settings' className='justify-self-end list-none'>
              <li className='px-5'>
                <div className='flex flex-row items-center h-8'>
                  <div className='text-sm font-light tracking-wide text-gray-500'>
                    Configuración
                  </div>
                </div>
              </li>
              {user && (
                <li className='relative flex flex-row items-center h-11 focus:outline-none pr-6 text-sm text-gray-600 border-l-4 border-transparent'>
                  <span className='inline-flex justify-center items-center ml-4'>
                    <Icons.PersonCircle />
                  </span>
                  <span className='ml-2 text-sm tracking-wide truncate'>
                    {user.name}
                  </span>
                </li>
              )}
              {isAuthenticated && (
                <li>
                  <button
                    onClick={() => logout({ returnTo: window.location.origin })}
                    className='relative flex flex-row items-center h-11 focus:outline-none nav-link pr-6'
                  >
                    <span className='inline-flex justify-center items-center ml-4'>
                      {user ? (
                        <Icons.BoxArrowRight />
                      ) : (
                        <Icons.BoxArrowInRight />
                      )}
                    </span>
                    <span className='ml-2 text-sm tracking-wide truncate'>
                      {user ? 'Cerrar Sesión' : 'Iniciar Sesión'}
                    </span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
