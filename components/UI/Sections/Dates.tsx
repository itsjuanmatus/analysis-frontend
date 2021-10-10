import React from 'react'
import Dater from '../Uploading/Dater'

export default function Dates (props: any) {
  return (
    <div className='grid gap-y-10 md:grid-cols-2 md:gap-x-10'>
      <div className='max-w-xs'>
        <h3 className='font-semibold text-lg'>{props.title}</h3>
        <p className='text-gray-500'>
          {props.subtitle}
          <a
            href={props.link}
            className='text-indigo-500 hover:underline hover:cursor-pointer'
          >
            {props.linkArea}
          </a>
        </p>
      </div>
      <Dater
        saveValue={props.saveValue}
        handleInputChange={props.handleInputChange}
        fechaInicial={props.fechaInicial}
        fechaFinal={props.fechaFinal}
        message={props.message}
        loadingIndicator={props.loadingIndicator}
      />
    </div>
  )
}
