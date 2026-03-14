import React from 'react'

const Loader = () => {
  return (
    <div className='flex flex-col justify-center items-center h-[80vh] gap-4'>
        <div className='relative'>
          <div className='animate-spin rounded-full h-16 w-16
          border-4 border-primary/20 border-t-primary'></div>
          <div className='absolute inset-0 animate-ping rounded-full h-16 w-16
          border-4 border-primary/5'></div>
        </div>
        <p className='text-gray-400 text-sm font-medium animate-pulse'>Loading...</p>
    </div>
  )
}

export default Loader
