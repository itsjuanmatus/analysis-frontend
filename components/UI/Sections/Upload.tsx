import React from 'react'
import Uploader from '../Uploading/Uploader'

export default function Upload (props: any) {
  return (
    <div className='flex space-x-10'>
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
      <Uploader uploadService={props.uploadService} />
    </div>
  )
}
