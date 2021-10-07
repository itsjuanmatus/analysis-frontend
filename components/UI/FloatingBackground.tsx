import React from 'react'
import PageHeading from './Text/PageHeading'
import Dropdown from './Dropdown'

interface Props {
  sidebar: any
  title: String
  subtitle: String
  children: any
  dropdownData?: any
}

export default function FloatingBackground (props: Props) {
  return (
    <div className='flex min-h-screen m-auto w-full'>
      {props.sidebar}
      <main className='m-5 md:m-10 w-full flex items-start justify-center mt-24'>
        <div className='floating-background'>
          <PageHeading title={props.title} subtitle={props.subtitle} />

          {props.dropdownData && (
            <div className='max-w-sm mb-10'>
              <Dropdown dropdownData={props.dropdownData} />
            </div>
          )}
          {props.children}
        </div>
      </main>
    </div>
  )
}
