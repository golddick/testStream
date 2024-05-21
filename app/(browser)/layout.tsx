
import { Container } from '@/components/Container'
import NavBar from '@/components/NavBar/NavBar'
import SideBar, { SidebarSkeleton } from '@/components/SideBar/SideBar'
import React, { Suspense } from 'react'

const BrowserLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
    <NavBar/>
     <div className='flex h-full pt-20  w-full  '>
      <Suspense fallback={<SidebarSkeleton/>}>
    <SideBar/>
      </Suspense>
    <Container>
     {children}
    </Container>
     </div>
    </>
  )
}

export default BrowserLayout