import React from 'react'

const Title = ({title, subTitle, align}) => {
  return (
    <div className={`flex flex-col justify-center items-center
    text-center ${align === "left" && "md:items-start md:text-left"}`}>
        <h1 className='font-bold text-4xl md:text-[42px] text-dark leading-tight'>{title}</h1>
        <div className='w-16 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full mt-4 mb-3'></div>
        <p className='text-sm md:text-base text-gray-500/90 mt-1
        max-w-156 leading-relaxed'>{subTitle}</p>
    </div>
  )
}

export default Title
