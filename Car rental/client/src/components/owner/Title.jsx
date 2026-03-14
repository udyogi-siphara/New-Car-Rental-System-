import React from 'react'

const Title = ({title, subTitle}) => {
  return (
    <>
      <h1 className='font-bold text-2xl md:text-3xl text-dark'>{title}</h1>
      <p className='text-sm text-gray-400 mt-2
      max-w-156 leading-relaxed'>{subTitle}</p>
    </>
  )
}

export default Title
