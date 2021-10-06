import Sidebar from '../../../components/Layout/Sidebar'

import { withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from '../../../components/auth/Loading'

import dropdownData from '../../../components/data/dropdowns/riesgos_crediticios/matriz_de_transicion_crediticia'
import FloatingBackground from '../../../components/UI/FloatingBackground'

function MatrizDeTransicionCrediticia () {
  return (
    <FloatingBackground
      sidebar={<Sidebar />}
      dropdownData={dropdownData}
      title='Matriz de transición crediticia'
      subtitle='Grafica de matriz de transicion crediticia'
    >
      
      <div className='grid w-full gap-y-10'>
        <iframe
          src='https://onedrive.live.com/embed?cid=C81B3CCED330E0F9&resid=C81B3CCED330E0F9%212575&authkey=AG0VH-J3HEl3P3E&em=2'
          width='900'
          height='500'
          frameBorder='0'
          scrolling='no'
        ></iframe>
      </div>
    </FloatingBackground>
  )
}

export default withAuthenticationRequired(MatrizDeTransicionCrediticia, {
  onRedirecting: () => <Loading />
})
