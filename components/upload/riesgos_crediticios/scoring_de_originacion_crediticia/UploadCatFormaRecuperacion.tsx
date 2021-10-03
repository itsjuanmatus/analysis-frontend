import React, { useState, useEffect } from 'react'
import FileUploadService from '../../../../pages/api/riesgos_crediticios/scoring_de_originacion_crediticia/upload/uploadCatFormaRecuperacion'

const UploadFiles = () => {
  const [selectedFiles, setSelectedFiles] = useState<any>(undefined)
  const [currentFile, setCurrentFile] = useState(undefined)
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('')

  const upload = () => {
    let currentFile = selectedFiles[0]
    setProgress(0)
    setCurrentFile(currentFile)

    FileUploadService.upload(currentFile, (event: any) => {
      setProgress(Math.round((100 * event.loaded) / event.total))
    })
      .then((response: any) => {
        return setMessage(response.data.message)
      })
      .catch(() => {
        setProgress(0)
        setMessage('Could not upload the file!')
        setCurrentFile(undefined)
      })
    setSelectedFiles(undefined)
  }

  const [fileName, setFileName] = useState()
  const handleFileSelected = (e: any): any => {
    setSelectedFiles(e.target.files)
    const files: any = Array.from(e.target.files)
    const x = files[0]
    setFileName(x.name)
  }
  return (
    <>
      <body>
        <div className='p-10 border border-t border-gray-200 rounded-md min-w-max max-w-max'>
          <div className='flex flex-col space-y-3'>
            {currentFile && (
              <div className='inline-flex max-w-xs'>
                <div
                  className='flex bg-indigo-300 text-white font-semibold p-1 pl-6 rounded-full  w-full border-gray '
                  style={{ width: progress + '%' }}
                ></div>
              </div>
            )}
            <label className='inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:ring-indigo-500'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 mr-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12'
                />
              </svg>
              {fileName ? fileName : <>Buscar Archivo</>}

              <input
                onChange={handleFileSelected}
                type='file'
                className='px-1 mt-5'
              />
            </label>

            <button
              className='p-2 bg-indigo-600 rounded text-white px-4 max-w-max'
              disabled={!selectedFiles}
              onClick={upload}
            >
              {`Subir `}
            </button>
          </div>
        </div>
        <div
          className='text-md text-gray-400 max-w-max'
          role='alert'
        >
          {message}
        </div>
      </body>
    </>
  )
}

export default UploadFiles
