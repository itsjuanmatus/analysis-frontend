import Sidebar from '../../../components/Layout/Sidebar'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from '../../../components/auth/Loading'
import FloatingBackground from '../../../components/UI/FloatingBackground'
import dropdownData from '../../../components/data/dropdowns/riesgos_crediticios/scoring'

import Upload from '../../../components/UI/Sections/Upload'
import uploadCatEstadoOperacion from '../../api/riesgos_crediticios/scoring_de_originacion_crediticia/upload/uploadCatEstadoOperacion'
import uploadCatFormaRecuperacion from '../../api/riesgos_crediticios/scoring_de_originacion_crediticia/upload/uploadCatFormaRecuperacion'
import uploadCatHistorialMora from '../../api/riesgos_crediticios/scoring_de_originacion_crediticia/upload/uploadCatHistorialMora'
import uploadListaCreditos from '../../api/riesgos_crediticios/scoring_de_originacion_crediticia/upload/uploadListaCreditos'
import uploadResultadoEvaluacion from '../../api/riesgos_crediticios/scoring_de_originacion_crediticia/upload/uploadResultadoEvaluacion'

function ScoringDeOriginacionCrediticia () {
  return (
    <FloatingBackground
      sidebar={<Sidebar />}
      dropdownData={dropdownData}
      title='Scoring de originación crediticia'
      subtitle='Subir archivos para generar analisis'
    >
      <div className='grid w-full gap-y-10'>
        <Upload
          title='Subir catalogo estado operacion'
          subtitle='Asegurate de haber leido correctamente 
          las instrucciones sobre los archivos csv de la tabla:'
          linkArea='Catalogo Estado Operacion'
          link='#'
          uploadService={uploadCatEstadoOperacion}
        />
        <Upload
          title='Subir Catalogo Forma Recuperacion'
          subtitle='Asegurate de haber leido 
          correctamente las instrucciones sobre los
          archivos csv de la tabla:'
          linkArea='desembolsos'
          link='#'
          uploadService={uploadCatFormaRecuperacion}
        />
        <Upload
          title='Subir Catalogo Historial Mora'
          subtitle='Asegurate de haber 
          leido correctamente las 
          instrucciones sobre los
          archivos csv de la tabla:'
          linkArea='historial mora'
          link='#'
          uploadService={uploadCatHistorialMora}
        />
        <Upload
          title='Subir Lista Creditos'
          subtitle='Asegurate de haber 
          leido correctamente las 
          instrucciones sobre los
          archivos csv de la tabla:'
          linkArea='lista creditos'
          link='#'
          uploadService={uploadListaCreditos}
        />
        <Upload
          title='Subir Resultado Evaluacion'
          subtitle='Asegurate de haber 
          leido correctamente las 
          instrucciones sobre los
          archivos csv de la tabla:'
          linkArea='resultado evaluacion'
          link='#'
          uploadService={uploadResultadoEvaluacion}
        />
      </div>
    </FloatingBackground>
  )
}

export default withAuthenticationRequired(ScoringDeOriginacionCrediticia, {
  onRedirecting: () => <Loading />
})
