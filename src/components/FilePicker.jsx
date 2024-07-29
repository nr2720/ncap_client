import React from 'react'

import CustomButton from './CustomButton'

import state from '../store'

const FilePicker = ({ file, setFile, readFile, isOpen }) => {
  return (
    isOpen && (
    <div className='filepicker-container'>
      <div className='flex-1 flex flex-col'>
        <input
          id='file-upload'
          type='file'
          accept='image/*'
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor='file-upload' className='filepicker-label'>
          Upload File
        </label>
        <p className='mt-2 text-gray-500 text-xs truncate'>
          {file === '' ? 'No file selected.' : file.name}
        </p>
        <p className='mt-2 text-gray-500 text-xs'>
          {file === '' ? 'Use your own image on your 🧢' : ''}
        </p>

      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <CustomButton 
          type='outline'
          title='Logo'
          handleClick={() => readFile('logo')}
          customStyles='text-xs'
        />
      </div>
    </div>
    )
  )
}

export default FilePicker