import React, { useState, useEffect } from 'react'
import FileUploadService from '../../pages/api/FileUploadService'

const UploadFiles = () => {
  const [selectedFiles, setSelectedFiles] = useState<any>(undefined)
  const [currentFile, setCurrentFile] = useState(undefined)
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('')

  const [fileInfos, setFileInfos] = useState([])

  const selectFile = (event: any) => {
    setSelectedFiles(event.target.files)
  }

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
    const files: any = Array.from(e.target.files)
    const x = files[0]
    setFileName(x.name)
  }
  return (
    <>
      <body>
        <div>
          {currentFile && (
            <div className='progress'>
              <div
                className='flex bg-black text-white font-semibold p-2 rounded-md mb-4'
                style={{ width: progress + '%' }}
              >
                {progress}%
              </div>
            </div>
          )}
        <div className='flex flex-col space-y-3'>
          <label className='inline-flex justify-center max-w-max rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:ring-indigo-500'>
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

          <div className='text-lg font-bold' role='alert'>
            {message}
          </div>
        </div>
      </body>
    </>
  )
}

export default UploadFiles
