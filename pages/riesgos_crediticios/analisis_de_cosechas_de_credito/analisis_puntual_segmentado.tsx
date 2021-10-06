import Sidebar from '../../../components/Layout/Sidebar'
import { withAuthenticationRequired } from '@auth0/auth0-react'

import Loading from '../../../components/auth/Loading'
import dropdownData from '../../../components/data/dropdowns/riesgos_crediticios/analisis_de_cosechas_de_credito'
import FloatingBackground from '../../../components/UI/FloatingBackground'

function AnalisisPuntualSegmentado () {
  return (
    <FloatingBackground
      sidebar={<Sidebar />}
      dropdownData={dropdownData}
      title='Análisis Puntual Segmentado'
      subtitle='Grafico analisis puntual segmentado'
    >
      <div className='flex space-x-10 mb-10 w-full'>
        <iframe
          width='900'
          height='707'
          frameBorder='0'
          scrolling='no'
          src='https://onedrive.live.com/embed?resid=C81B3CCED330E0F9%212573&authkey=%21AOdQzogpStacgZw&em=2&Item=Reporte%204%20analisis%20puntual%20segm&wdDownloadButton=True&wdInConfigurator=True'
        ></iframe>
      </div>
    </FloatingBackground>
  )
}

export default withAuthenticationRequired(AnalisisPuntualSegmentado, {
  onRedirecting: () => <Loading />
})
