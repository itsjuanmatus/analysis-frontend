import React, { useState, useEffect } from 'react'
import Sidebar from '../../../components/Layout/Sidebar'
import AnalisisContinuoService from '../../api/analisis_de_cosechas/analisis_continuo'
import { Line } from 'react-chartjs-2'
import { useRouter } from 'next/router'
import { withAuthenticationRequired } from '@auth0/auth0-react'

import { trackPromise, usePromiseTracker } from 'react-promise-tracker'
import Loading from '../../../components/auth/Loading'
import dropdownData from '../../../components/data/dropdowns/riesgos_crediticios/analisis_de_cosechas_de_credito'
import FloatingBackground from '../../../components/UI/FloatingBackground'
import Dates from '../../../components/UI/Sections/Dates'
import LoadingIndicator from '../../../components/UI/Uploading/LoadingIndicator'



function AnalisisContinuo ({ tableData }: any) {
  const router = useRouter()

  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath)
  }

  let [...rawData] = tableData

  // This converts this [[{"key": "value"}, {"key": "value"} ]] to [[value], [value]] -
  const arrayInsideArray = rawData[0].map((objectMapped: any, index: any) =>
    Object.values(objectMapped)
  )

  let datasetsLabels = arrayInsideArray.map((e: any) => e[0])
  datasetsLabels = datasetsLabels.map((e: any) => e.toString())

  // these are the labels or better known as xAxis
  let labels = rawData[0].map((objectMapped: any, index: any) =>
    Object.keys(objectMapped)
  )
  labels = labels[0]

  // deletes first element of the array, which is the year
  arrayInsideArray.map((e: any) => e.shift())

  const allValuesArray: any = []

  /** this will push all the values to 
 and will convert them to integers **/
  const pushValues = (e: any) => {
    allValuesArray.push(Number(e))
  }

  arrayInsideArray.map((subarray: any) => subarray.map(pushValues))

  // this function takes allValuesArray and create new arrays
  function createGroups (arr: any, numGroups: any) {
    const perGroup = Math.ceil(arr.length / numGroups)
    return new Array(numGroups)
      .fill('')
      .map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup))
  }

  const yAxisArray = createGroups(allValuesArray, arrayInsideArray.length)

  const borderColor = [
    'rgb(75, 192, 192)',
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)'
  ]
  const backgroundColor = [
    'rgb(75, 192, 192, 0.2)',
    'rgb(255, 99, 132, 0.2)',
    'rgb(255, 159, 64, 0.2)',
    'rgb(255, 205, 86, 0.2)',
    'rgb(75, 192, 192, 0.2)',
    'rgb(54, 162, 235, 0.2)',
    'rgb(153, 102, 255, 0.2)',
    'rgb(201, 203, 207, 0.2)'
  ]

  var datasets = []

  for (let i = 0; i < yAxisArray.length - 1; i++) {
    datasets[i] = {
      label: datasetsLabels[i + 1],
      data: yAxisArray[i + 1],
      fill: false,
      backgroundColor: backgroundColor[i + 1],
      borderColor: borderColor[i + 1]
    }
  }

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
      AnalisisContinuoService.create(data)
        .then(res => {
          setValue({
            fechaInicial: res.data.fechaInicial,
            fechaFinal: res.data.fechaFinal
          })
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

  const data = {
    labels: labels,
    datasets: datasets
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any, index: any, values: any) {
            return value + '%'
          }
        }
      }
    }
  }

  return (
    <FloatingBackground
      sidebar={<Sidebar />}
      dropdownData={dropdownData}
      title='Análisis Continuo'
      subtitle='Define una fecha inicial y final para generar analisis'
    >
      <Dates
        title='Generar grafico'
        subtitle='Asegurate de haber subido los archivos de cartera y desembolso
              correctamente'
        saveValue={saveValue}
        fechaInicial={value.fechaInicial}
        fechaFinal={value.fechaFinal}
        message={message}
        loadingIndicator={<LoadingIndicator />}
        handleInputChange={handleInputChange}
      />

      <div className='max-w-5xl mt-10'>
        <Line data={data} options={options} />
      </div>
      <iframe
        className='mt-32'
        width='100%'
        height='707'
        frameBorder='0'
        scrolling='no'
        src='https://onedrive.live.com/embed?resid=C81B3CCED330E0F9%212573&authkey=%21AOdQzogpStacgZw&em=2&wdAllowInteractivity=False&Item=reporte%201%20analisis%20continuo&wdDownloadButton=True&wdInConfigurator=True'
      ></iframe>
    </FloatingBackground>
  )
}

export default withAuthenticationRequired(AnalisisContinuo, {
  onRedirecting: () => <Loading />
})

const endpoint = `https://dataanalysisapp.uc.r.appspot.com/table/cosecha_analisis_continuo`

export async function getServerSideProps () {
  const res = await fetch(endpoint)
  const tableData = await res.json()
  return {
    props: {
      tableData
    }
  }
}
