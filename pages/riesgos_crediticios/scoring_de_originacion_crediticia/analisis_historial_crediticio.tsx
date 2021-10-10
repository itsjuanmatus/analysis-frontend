import React from 'react'
import { useRouter } from 'next/router'
import Sidebar from '../../../components/Layout/Sidebar'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from '../../../components/auth/Loading'
import Dropdown from '../../../components/UI/Dropdown'
import SacCalculoScore from '../../api/riesgos_crediticios/scoring_de_originacion_crediticia/stored_procedures/sac_calculo_score'
import dropdownData from '../../../components/data/dropdowns/riesgos_crediticios/scoring'
import FloatingBackground from '../../../components/UI/FloatingBackground'
import BasicTable, {
  StatusPill
} from '../../../components/UI/Tables/BasicTable'

function AnalisisHistorialCrediticio ({ tableData }: any) {
  const router = useRouter()

  let [...rawData] = tableData
  const fields = rawData[0]

  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath)
  }

  const [message, setMessage] = React.useState('')

  const saveValue = () => {
    let data
    trackPromise(
      SacCalculoScore.create(data)
        .then(res => {
          console.log(res.data)
          setMessage(`${res.data}`)

          if (res.status < 300) {
            refreshData()
          }
        })
        .catch(e => {
          console.log(e)
        })
    )
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'SCORE',
        accessor: 'Score',
        Cell: StatusPill
      },
      {
        Header: 'SALDOS',
        accessor: 'Saldos'
      },
      {
        Header: '%',
        accessor: '%'
      },
      {
        Header: 'LGD (Perd esperada)',
        accessor: 'LGD (Perd esperada)'
      },
      {
        Header: 'VAR (Valor en Riesgo)',
        accessor: 'VAR (Valor en Riesgo)'
      },
      {
        Header: 'VAR - LGD ( Perd no esperada)',
        accessor: 'VAR - LGD ( Perd no esperada)'
      },

      {
        Header: '% LGD',
        accessor: '% LGD'
      },
      {
        Header: '% VAR',
        accessor: '% VAR'
      }
    ],
    []
  )

  return (
    <FloatingBackground
      sidebar={<Sidebar />}
      dropdownData={dropdownData}
      title='Analisis Historial Crediticio'
      subtitle='Tabla historial crediticio'
    >
      <div className='w-full mt-10 mb-20'>
        <BasicTable columns={columns} data={fields} />
      </div>
    </FloatingBackground>
  )
}

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

export default withAuthenticationRequired(AnalisisHistorialCrediticio, {
  onRedirecting: () => <Loading />
})

const endpoint = `https://dataanalysisapp.uc.r.appspot.com/table/analisis_historial_crediticio`

export async function getServerSideProps () {
  const res = await fetch(endpoint)
  const tableData = await res.json()
  return {
    props: {
      tableData
    }
  }
}
