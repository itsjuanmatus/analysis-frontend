import React from 'react'
import PageHeading from './Text/PageHeading'
import Dropdown from './Dropdown'

export default function FloatingBackground (props: any) {
  return (
    <div className='flex min-h-screen m-auto w-full'>
      {props.sidebar}
      <main className='m-10 w-full flex items-start justify-center '>
        <div className='floating-background'>
          <PageHeading title={props.title} subtitle={props.subtitle} />
          <div className='max-w-sm mb-10'>
            <Dropdown dropdownData={props.dropdownData} />
          </div>
          {props.children}
        </div>
      </main>
    </div>
  )
}
