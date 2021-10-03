import React, { useState, useEffect } from 'react'
import Sidebar from '../../../components/Layout/Sidebar'
import UploadDesembolsos from '../../../components/upload/riesgos_crediticios/analisis_de_cosechas/UploadDesembolsos'
import AnalisisDeCosechas from '../../api/analisis_de_cosechas/analisis_de_cosechas'
import { usePromiseTracker } from 'react-promise-tracker'
import Dropdown from '../../../components/UI/Dropdown'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { trackPromise } from 'react-promise-tracker'
import Loading from '../../../components/auth/Loading'
import UploadCatEstadoOperacion from '../../../components/upload/riesgos_crediticios/scoring_de_originacion_crediticia/UploadCatEstadoOperacion'
import UploadCatFormaRecuperacion from '../../../components/upload/riesgos_crediticios/scoring_de_originacion_crediticia/UploadCatFormaRecuperacion'
import UploadCatHistorialMora from '../../../components/upload/riesgos_crediticios/scoring_de_originacion_crediticia/UploadCatHistorialMora'
import UploadListaCreditos from '../../../components/upload/riesgos_crediticios/scoring_de_originacion_crediticia/UploadListaCreditos'
import UploadResultadoEvaluacion from '../../../components/upload/riesgos_crediticios/scoring_de_originacion_crediticia/UploadResultadoEvaluacion'

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

function ScoringDeOriginacionCrediticia ({ tableData }: any) {
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

  const dropdownData = [
    {
      name: 'Tabla Scoring',
      link:
        '/riesgos_crediticios/scoring_de_originacion_crediticia/tabla_scoring'
    }
  ]

  return (
    <div className='flex min-h-screen m-auto w-full'>
      {<Sidebar />}
      <main className='m-10 w-full flex justify-center '>
        <div className='grid items-start justify-start p-10 border border-t border-gray-200 rounded-md w-full max-w-5xl'>
          {' '}
          <h2 className='font-bold text-2xl mb-5'>
            Subir archivos - Scoring de originación crediticia
          </h2>
          <div className='max-w-sm mb-10'>
            <Dropdown dropdownData={dropdownData} />
          </div>
          <div className='grid w-full gap-y-10'>
            {/** Subir Archivos de Cartera Element */}
            <div className='flex space-x-10'>
              <div className='max-w-xs'>
                <h3 className='font-semibold text-lg'>
                  Subir catalogo estado operacion
                </h3>
                <p className='text-gray-500 '>
                  Asegurate de haber leido correctamente las instrucciones sobre
                  los archivos csv de la tabla:{' '}
                  <a
                    href='#'
                    className='text-indigo-500 hover:underline hover:cursor-pointer'
                  >
                    Catalogo Estado Operacion
                  </a>
                </p>
              </div>
              <UploadCatEstadoOperacion />
            </div>
            {/** Subir Archivos de Desembolsos Element */}
            <div className='flex space-x-10'>
              <div className='max-w-xs'>
                <h3 className='font-semibold text-lg'>
                  Subir Catalogo Forma Recuperacion
                </h3>
                <p className='text-gray-500 '>
                  Asegurate de haber leido correctamente las instrucciones sobre
                  los archivos csv de la tabla:{' '}
                  <a
                    href='#'
                    className='text-indigo-500 hover:underline hover:cursor-pointer'
                  >
                    desembolsos
                  </a>
                </p>
              </div>
              <UploadCatFormaRecuperacion />
            </div>
            {/** Subir Archivos de Desembolsos Element */}
            <div className='flex space-x-10'>
              <div className='max-w-xs'>
                <h3 className='font-semibold text-lg'>
                  Subir Catalogo Historial Mora
                </h3>
                <p className='text-gray-500 '>
                  Asegurate de haber leido correctamente las instrucciones sobre
                  los archivos csv de la tabla:{' '}
                  <a
                    href='#'
                    className='text-indigo-500 hover:underline hover:cursor-pointer'
                  >
                    desembolsos
                  </a>
                </p>
              </div>
              <UploadCatHistorialMora />
            </div>
            {/** Subir Archivos de Desembolsos Element */}
            <div className='flex space-x-10'>
              <div className='max-w-xs'>
                <h3 className='font-semibold text-lg'>Subir Lista Creditos</h3>
                <p className='text-gray-500 '>
                  Asegurate de haber leido correctamente las instrucciones sobre
                  los archivos csv de la tabla:{' '}
                  <a
                    href='#'
                    className='text-indigo-500 hover:underline hover:cursor-pointer'
                  >
                    desembolsos
                  </a>
                </p>
              </div>
              <UploadListaCreditos />
            </div>
            {/** Subir Archivos de Desembolsos Element */}
            <div className='flex space-x-10'>
              <div className='max-w-xs'>
                <h3 className='font-semibold text-lg'>
                  Subir Resultado Evaluacion
                </h3>
                <p className='text-gray-500 '>
                  Asegurate de haber leido correctamente las instrucciones sobre
                  los archivos csv de la tabla:{' '}
                  <a
                    href='#'
                    className='text-indigo-500 hover:underline hover:cursor-pointer'
                  >
                    desembolsos
                  </a>
                </p>
              </div>
              <div>
                <UploadResultadoEvaluacion />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default withAuthenticationRequired(ScoringDeOriginacionCrediticia, {
  onRedirecting: () => <Loading />
})
