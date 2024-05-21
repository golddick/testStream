
import React from 'react'
import Logo from './_component/Logo'


const layout = ({children}: {children:React.ReactNode}) => {
  return (
    <div className='h-full flex items-center justify-center flex-col gap-4'>
        <Logo/>
        {children}
    </div>
  )
}

export default layout 