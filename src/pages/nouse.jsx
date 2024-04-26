import React from 'react'
import Link from 'next/link'

const nouse = () => {
  return (
    <div>

   
    <div className='flex w-screen h-screen justify-center items-center'>
      <img src="/p001.png" width="65%"/>

      
    </div>
    <Link className='absolute   bottom-4 w-screen h-[300px]' href="/pageOne"></Link>
    </div>
  )
}

export default nouse