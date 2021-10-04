import React, { useState, useEffect } from 'react'
import Sidebar from '../../../components/Layout/Sidebar'
import AnalisisDeCosechas from '../../api/analisis_de_cosechas/analisis_de_cosechas'
import { usePromiseTracker } from 'react-promise-tracker'
import Dropdown from '../../../components/UI/Dropdown'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { trackPromise } from 'react-promise-tracker'
import Loading from '../../../components/auth/Loading'

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

function MonitoreoDeIndicadores ({ tableData }: any) {
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
      name: 'Analisis Camel',
      link: '/consolidados/monitoreo_de_indicadores/analisis_camel'
    }
  ]

  return (
    <div className='flex min-h-screen m-auto w-full'>
      {<Sidebar />}
      <main className='m-10 w-full flex-col'>
        <div className='grid items-start justify-start p-10 border border-t border-gray-200 rounded-md w-full max-w-5xl'>
          {' '}
          <h2 className='font-bold text-2xl mb-5'>Monitoreo de indicadores</h2>
          <div className='max-w-sm mb-10'>
            <Dropdown dropdownData={dropdownData} />
          </div>
          <div className='grid w-full gap-y-10'></div>
        </div>
      </main>
    </div>
  )
}

export default withAuthenticationRequired(MonitoreoDeIndicadores, {
  onRedirecting: () => <Loading />
})
