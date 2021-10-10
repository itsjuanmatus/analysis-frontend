import Sidebar from '../../../components/Layout/Sidebar'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from '../../../components/auth/Loading'
import FloatingBackground from '../../../components/UI/FloatingBackground'
import dropdownData from '../../../components/data/dropdowns/riesgos_crediticios/scoring'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker'
import RiesgoCrediticio from '../../api/riesgos_crediticios/scoring_de_originacion_crediticia/stored_procedures/reporte_riesgo_crediticio'

import LoadingIndicator from '../../../components/UI/Uploading/LoadingIndicator'
import GaugeChart from 'react-gauge-chart'
import BasicTable, {
  StatusPill
} from '../../../components/UI/Tables/BasicTable'

function ReporteRiesgoCrediticio () {
  const router = useRouter()

  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath)
  }
  const initialValues = {
    cedula: '2411501920007N'
  }
  const [value, setValue] = useState(initialValues)
  const [message, setMessage] = useState({})

  const handleInputChange = (event: any) => {
    const { name, value } = event.target
    setValue({ ...value, [name]: value })
  }

  const keyResVal =
    'JSON_OBJECT(\n\t"Nombre",    @nombre_persona,\n\t"Monto maximo de credito historico",\t@Monto_maximo,\n\t"Creditos activos deudor",   @Creditos_Activos_Deudor ,\n\t"Creditos historicos deudor", @Creditos_Historicos_Deudor,\n\t"Creditos activos fiador",\t@Creditos_Act'

  const saveValue = () => {
    var data = {
      cedula: value.cedula
    }
    trackPromise(
      RiesgoCrediticio.create(data)
        .then(res => {
          setValue({
            cedula: res.data.cedula
          })
          setMessage(res.data[0][keyResVal])

          if (res.status < 300) {
            refreshData()
          }
        })
        .catch(e => {
          console.log(e)
        })
    )
  }

  let keys = Object.keys(message)
  let values: any = Object.values(message)

  let tableObject = {}
  let emptyArray = []

  for (let i = 0; i < keys.length; i++) {
    let objG = { Descripción: keys[i] }
    emptyArray.push(objG)
  }

  for (let i = 0; i < keys.length; i++) {
    emptyArray[i] = { ...emptyArray[i], Valor: values[i] }
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Descripción',
        accessor: 'Descripción'
      },
      {
        Header: 'Valor',
        accessor: 'Valor'
      }
    ],
    []
  )

  return (
    <FloatingBackground
      sidebar={<Sidebar />}
      dropdownData={dropdownData}
      title='Scoring de originación crediticia'
      subtitle='Subir archivos para generar analisis'
    >
      <div className='grid w-full gap-y-10'>
        <div className='p-10 border border-t border-gray-200 rounded-md min-w-max max-w-max'>
          <div className='grid lg:grid-cols-2 lg:gap-x-4 '>
            <div className='flex flex-col'>
              <label
                htmlFor='fechaInicial'
                className='text-md font-semibold text-gray-700 mb-2'
              >
                Cedula
              </label>
              <input
                type='text'
                className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'
                id='cedula'
                required
                value={value.cedula}
                onChange={handleInputChange}
                name='cedula'
              />
            </div>{' '}
          </div>
          <button
            onClick={saveValue}
            className='p-2 bg-indigo-600 rounded text-white px-4 max-w-max mt-4 inline-flex items-center'
          >
            {<LoadingIndicator />}
            Enviar
          </button>
        </div>
        {/* {message && (
          <div className='grid grid-cols-2 gap-x-20'>
            <div>
              {keys.map(e => (
                <p key={e}>{e}</p>
              ))}
            </div>
            <div>
              {values.map(x => (
                <p>{x}</p>
              ))}
            </div>

            <div className='w-44'>
              <GaugeChart
                id='gauge-chart3'
                nrOfLevels={10}
                colors={['#DC2626', '#F97316', '#A3E635']}
                arcWidth={0.3}
                percent={parseInt(message['Creditos historicos deudor'])}
                textColor='#00000'
                hideText={true}
                animateDuration={2000}
              />
            </div>
          </div>
        )} */}
        <div className='max-w-4xl mt-10 mb-20'>
          <div className='w-36'>
            <GaugeChart
              id='gauge-chart3'
              nrOfLevels={10}
              colors={['#DC2626', '#F97316', '#A3E635']}
              arcWidth={0.3}
              percent={values[10]}
              textColor='#00000'
              hideText={true}
              animateDuration={2000}
            />
          </div>
          <BasicTable columns={columns} data={emptyArray} />
        </div>
      </div>
    </FloatingBackground>
  )
}

export default withAuthenticationRequired(ReporteRiesgoCrediticio, {
  onRedirecting: () => <Loading />
})
