import Sidebar from '../../../components/Layout/Sidebar'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from '../../../components/auth/Loading'
import UploadCatEstadoOperacion from '../../../components/upload/riesgos_crediticios/scoring_de_originacion_crediticia/UploadCatEstadoOperacion'
import UploadCatFormaRecuperacion from '../../../components/upload/riesgos_crediticios/scoring_de_originacion_crediticia/UploadCatFormaRecuperacion'
import UploadCatHistorialMora from '../../../components/upload/riesgos_crediticios/scoring_de_originacion_crediticia/UploadCatHistorialMora'
import UploadListaCreditos from '../../../components/upload/riesgos_crediticios/scoring_de_originacion_crediticia/UploadListaCreditos'
import UploadResultadoEvaluacion from '../../../components/upload/riesgos_crediticios/scoring_de_originacion_crediticia/UploadResultadoEvaluacion'
import FloatingBackground from '../../../components/UI/FloatingBackground'
import dropdownData from '../../../components/data/dropdowns/riesgos_crediticios/scoring'


import Upload from '../../../components/UI/Sections/Upload'

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
          uploadComponent={<UploadCatEstadoOperacion />}
        />
        <Upload
          title='Subir Catalogo Forma Recuperacion'
          subtitle='Asegurate de haber leido 
          correctamente las instrucciones sobre los
          archivos csv de la tabla:'
          linkArea='desembolsos'
          link='#'
          uploadComponent={<UploadCatFormaRecuperacion />}
        />
        <Upload
          title='Subir Catalogo Historial Mora'
          subtitle='Asegurate de haber 
          leido correctamente las 
          instrucciones sobre los
          archivos csv de la tabla:'
          linkArea='historial mora'
          link='#'
          uploadComponent={<UploadCatHistorialMora />}
        />
        <Upload
          title='Subir Lista Creditos'
          subtitle='Asegurate de haber 
          leido correctamente las 
          instrucciones sobre los
          archivos csv de la tabla:'
          linkArea='lista creditos'
          link='#'
          uploadComponent={<UploadListaCreditos />}
        />
        <Upload
          title='Subir Resultado Evaluacion'
          subtitle='Asegurate de haber 
          leido correctamente las 
          instrucciones sobre los
          archivos csv de la tabla:'
          linkArea='resultado evaluacion'
          link='#'
          uploadComponent={<UploadResultadoEvaluacion />}
        />
      </div>
    </FloatingBackground>
  )
}

export default withAuthenticationRequired(ScoringDeOriginacionCrediticia, {
  onRedirecting: () => <Loading />
})
