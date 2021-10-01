import { NextPage } from 'next'
import Sidebar from '../components/Layout/Sidebar'
import { useAuth0 } from '@auth0/auth0-react'
import { Line } from 'react-chartjs-2'

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

function Home ({ tableData }: any) {
  const [...rawData] = tableData

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

  function getRandomRgb (d: Number) {
    var num = Math.round(0xffffff * Math.random())
    var r = num >> 16
    var g = (num >> 8) & 255
    var b = num & 255
    return 'rgb(' + r + ', ' + g + ', ' + b + ', ' + d + ')'
  }

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

  for (let i = 0; i < yAxisArray.length; i++) {
    /* const Color = getRandomRgb(0.2)
    const strongColor = `${Color.slice(0, -6)})` */

    datasets[i] = {
      label: datasetsLabels[i + 1],
      data: yAxisArray[i + 1],
      fill: false,
      backgroundColor: backgroundColor[i + 1],
      borderColor: borderColor[i + 1]
    }
  }

  const {
    isLoading,
    isAuthenticated,
    error,
    loginWithRedirect,
    logout
  } = useAuth0()

  const { user } = useAuth0<{ name: string }>()

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Oops... {error.message}</div>
  }
  const data = {
    labels: labels,
    datasets: datasets
  }

  const options: any = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }

  if (isAuthenticated) {
    return (
      <div className='flex min-h-screen'>
        {<Sidebar />}
        <main className='m-10 w-full'>
          <nav></nav>
          <div className='flex flex-col justify-center'>
            <h2 className='font-bold text-2xl mb-10'>Análisis continuo</h2>
            <div>
              <div className='header'>
                <div className='links'></div>
              </div>
              <Line data={data} options={options} />
            </div>
          </div>
        </main>
      </div>
    )
  } else {
    return (
      <>
        {<Sidebar />}
        <button onClick={loginWithRedirect} className=''>
          Log in
        </button>
      </>
    )
  }
}

export default Home
