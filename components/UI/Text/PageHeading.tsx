import React from 'react'

interface Props {
  title: String
  subtitle?: String
}

export default function PageHeading ({ title, subtitle }: Props) {
  return (
    <>
      <h2 className='main-title'>Scoring de originación crediticia</h2>
      <p className='subtitle'>Subir archivos para generar analisis</p>
    </>
  )
}
