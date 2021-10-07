import React, { useState, useEffect } from 'react'
import { usePromiseTracker } from 'react-promise-tracker'
import { trackPromise } from 'react-promise-tracker'
import { useRouter } from 'next/router'

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

export default function Dater ({
  saveValue,
  handleInputChange,
  fechaInicial,
  fechaFinal,
  message,
  loadingIndicator
}: any) {
  return (
    <div className='p-10 border border-t border-gray-200 rounded-md min-w-max max-w-max'>
      <div className='grid lg:grid-cols-2 lg:gap-x-4 '>
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
            value={fechaInicial}
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
            value={fechaFinal}
            onChange={handleInputChange}
            name='fechaFinal'
          />
        </div>
      </div>
      <button
        onClick={saveValue}
        className='p-2 bg-indigo-600 rounded text-white px-4 max-w-max mt-4 inline-flex items-center'
      >
        {loadingIndicator}
        Enviar
      </button>
      <p>{message}</p>
    </div>
  )
}
