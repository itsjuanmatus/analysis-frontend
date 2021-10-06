import React from 'react'
import { useRouter } from 'next/router'
import Sidebar from '../../../components/Layout/Sidebar'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from '../../../components/auth/Loading'
import Dropdown from '../../../components/UI/Dropdown'
import FloatingBackground from '../../../components/UI/FloatingBackground'

function AnalisisCamel () {
  const dropdownData = [
    {
      name: 'Monitoreo de Indicadores',
      link: '/consolidados/monitoreo_de_indicadores/'
    }
  ]

  return (
    <FloatingBackground
      sidebar={<Sidebar />}
      dropdownData={dropdownData}
      title='Análisis Camel'
      subtitle='Analisis Camel'
    >
      <iframe
        src='https://onedrive.live.com/embed?cid=C81B3CCED330E0F9&resid=C81B3CCED330E0F9%212571&authkey=APvMG_yKTTcSxSU&em=2'
        width='900'
        height='700'
        frameBorder='0'
        scrolling='no'
      ></iframe>
    </FloatingBackground>
  )
}

export default withAuthenticationRequired(AnalisisCamel, {
  onRedirecting: () => <Loading />
})
