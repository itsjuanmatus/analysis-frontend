import React from 'react'
import { useRouter } from 'next/router'
import Sidebar from '../../../components/Layout/Sidebar'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from '../../../components/auth/Loading'
import Dropdown from '../../../components/UI/Dropdown'
import SacCalculoScore from '../../api/riesgos_crediticios/scoring_de_originacion_crediticia/stored_procedures/sac_calculo_score'
import Table, { StatusPill } from '../../../components/UI/Table'
import GaugeChart from 'react-gauge-chart'

function AnalisisCamel () {
  const dropdownData = [
    {
      name: 'Subir Catálogos',
      link: '/riesgos_crediticios/scoring_de_originacion_crediticia/'
    },
    {
      name: 'Analisis Camel',
      link:
        '/riesgos_crediticios/scoring_de_originacion_crediticia/analisis_camel'
    }
  ]

  return (
    <div className='flex min-h-screen m-auto w-full'>
      {<Sidebar />}
      <main className='m-10 w-full flex justify-center '>
        <div className='flex-col justify-start p-10 border border-t border-gray-200 rounded-md w-full max-w-5xl'>
          <h2 className='font-bold text-2xl mb-5'>Analisis Camel</h2>
          <div className='max-w-sm mb-10'>
            <Dropdown dropdownData={dropdownData} />
          </div>

          <iframe
            src='https://onedrive.live.com/embed?cid=C81B3CCED330E0F9&resid=C81B3CCED330E0F9%212571&authkey=APvMG_yKTTcSxSU&em=2'
            width='100%'
            height='700'
            frameBorder='0'
            scrolling='no'
          ></iframe>
        </div>
      </main>
    </div>
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

export default withAuthenticationRequired(AnalisisCamel, {
  onRedirecting: () => <Loading />
})

const endpoint = `https://dataanalysisapp.uc.r.appspot.com/table/sac_resultado_score`

export async function getServerSideProps () {
  const res = await fetch(endpoint)
  const tableData = await res.json()
  return {
    props: {
      tableData
    }
  }
}
