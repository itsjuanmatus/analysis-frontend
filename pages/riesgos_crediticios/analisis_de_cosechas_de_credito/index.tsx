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
      title='Análisis de cosechas de credito'
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
        <div className='flex space-x-10'>
          <div className='max-w-xs'>
            <h3 className='font-semibold text-lg'>Generar datos de Analisis</h3>
            <p className='text-gray-500'>
              Asegurate de haber subido los archivos de cartera y desembolso
              correctamente
            </p>
          </div>
          <div className='p-10 border border-t border-gray-200 rounded-md min-w-max max-w-max'>
            <div className='flex flex-inline space-x-4 '>
              <div className='flex flex-col'>
                <label
                  htmlFor='fechaInicial'
                  className='text-md font-semibold text-gray-700 mb-2'
                >
                  Fecha Inicial
                </label>
                <input
                  type='date'
                  className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'
                  id='fechaInicial'
                  required
                  value={value.fechaInicial}
                  onChange={handleInputChange}
                  name='fechaInicial'
                />
              </div>{' '}
              <div className='flex flex-col'>
                <label
                  htmlFor='fechaFinal'
                  className='text-md font-semibold text-gray-700 mb-2'
                >
                  Fecha Final
                </label>
                <input
                  type='date'
                  className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'
                  id='fechaFinal'
                  required
                  value={value.fechaFinal}
                  onChange={handleInputChange}
                  name='fechaFinal'
                />
              </div>
            </div>
            <button
              onClick={saveValue}
              className='p-2 bg-indigo-600 rounded text-white px-4 max-w-max mt-4 inline-flex items-center'
            >
              <LoadingIndicator />
              Enviar
            </button>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </FloatingBackground>
  )
}

export default withAuthenticationRequired(AnalisisDeCosechasDeCredito, {
  onRedirecting: () => <Loading />
})
