import React, { useState, useEffect } from 'react'
import Sidebar from '../../../components/Layout/Sidebar'
import AnalisisDeCosechas from '../../api/analisis_de_cosechas/analisis_de_cosechas'
import { usePromiseTracker } from 'react-promise-tracker'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { trackPromise } from 'react-promise-tracker'
import Loading from '../../../components/auth/Loading'

import dropdownData from '../../../components/data/dropdowns/riesgos_crediticios/analisis_de_cosechas_de_credito'
import FloatingBackground from '../../../components/UI/FloatingBackground'
import Upload from '../../../components/UI/Sections/Upload'
import UploadCarteraService from '../../api/analisis_de_cosechas/upload/UploadCarteraService'
import UploadDesembolsosService from '../../api/analisis_de_cosechas/upload/UploadDesembolsosService'

import Dates from '../../../components/UI/Sections/Dates'

const LoadingIndicator: any = (props: any) => {
  const { promiseInProgress } = usePromiseTracker()
  return (
    promiseInProgress && (
      <svg
        className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
      >
        <circle
          className='opacity-25'
          cx='12'
          cy='12'
          r='10'
          stroke='currentColor'
          strokeWidth='4'
        ></circle>
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        ></path>
      </svg>
    )
  )
}

function AnalisisDeCosechasDeCredito () {
  const initialValues = {
    fechaInicial: '2015-06-01',
    fechaFinal: '2018-11-30'
  }

  const [value, setValue] = useState(initialValues)
  const [message, setMessage] = useState('')

  const handleInputChange = (event: any) => {
    const { name, value } = event.target
    setValue({ ...value, [name]: value })
  }

  const saveValue = () => {
    var data = {
      fechaInicial: value.fechaInicial,
      fechaFinal: value.fechaFinal
    }

    trackPromise(
      AnalisisDeCosechas.create(data)
        .then(res => {
          setValue({
            fechaInicial: res.data.fechaInicial,
            fechaFinal: res.data.fechaFinal
          })
          console.log(res.data[0]['Proceso terminado con exito'])
          setMessage(res.data[0]['Proceso terminado con exito'])
        })
        .catch(e => {
          console.log(e)
        })
    )
  }

  return (
    <FloatingBackground
      sidebar={<Sidebar />}
      dropdownData={dropdownData}
      title='An??lisis de cosechas de credito'
      subtitle='Subir archivos para generar analisis'
    >
      <div className='grid w-full gap-y-10'>
        <Upload
          title='Subir archivos de cartera'
          subtitle='Asegurate de haber leido correctamente 
          las instrucciones sobre los archivos csv de la tabla:'
          linkArea='cartera'
          link='#'
          uploadService={UploadCarteraService}
        />
        <Upload
          title='Subir archivos de desembolso'
          subtitle='Asegurate de haber leido correctamente 
          las instrucciones sobre los archivos csv de la tabla:'
          linkArea='desembolsos'
          link='#'
          uploadService={UploadDesembolsosService}
        />

        <Dates
          title='Generar datos de Analisis'
          subtitle='Asegurate de haber subido los archivos de cartera y desembolso
              correctamente'
          saveValue={saveValue}
          fechaInicial={value.fechaInicial}
          fechaFinal={value.fechaFinal}
          message={message}
          loadingIndicator={<LoadingIndicator />}
          handleInputChange={handleInputChange}
        />
      </div>
    </FloatingBackground>
  )
}

export default withAuthenticationRequired(AnalisisDeCosechasDeCredito, {
  onRedirecting: () => <Loading />
})
