import Sidebar from '../../../components/Layout/Sidebar'
import { withAuthenticationRequired } from '@auth0/auth0-react'

import Loading from '../../../components/auth/Loading'
import dropdownData from '../../../components/data/dropdowns/riesgos_crediticios/analisis_de_cosechas_de_credito'
import FloatingBackground from '../../../components/UI/FloatingBackground'

function AnalisisPuntual () {
  return (
    <FloatingBackground
      sidebar={<Sidebar />}
      dropdownData={dropdownData}
      title='Analis Puntual'
      subtitle='Grafico de analisis puntual'
    >
      <div className='flex space-x-10 mb-10'>
        <iframe
          width='460'
          height='360'
          frameBorder='0'
          scrolling='no'
          src='https://onedrive.live.com/embed?resid=C81B3CCED330E0F9%212573&authkey=%21AOdQzogpStacgZw&em=2&Item=reporte%202%20analisis%20puntual&wdDownloadButton=True&wdInConfigurator=True'
        ></iframe>
      </div>
    </FloatingBackground>
  )
}

export default withAuthenticationRequired(AnalisisPuntual, {
  onRedirecting: () => <Loading />
})
