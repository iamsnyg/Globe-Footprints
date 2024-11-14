import React from 'react'

function EmptyCard({imgSrc, message}) {
  return (
    <div className='flex items-center justify-center flex-col mt-20'>
        <img src={imgSrc} alt="No Notes" className='w-52'/>

        <p
        className='w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5'
        >{message}</p>
    </div>
  )
}

export default EmptyCard