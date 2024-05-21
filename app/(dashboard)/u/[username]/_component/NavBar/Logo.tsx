import React from 'react'

import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const font = Poppins({
    subsets:['latin'],
    weight:['200','300','400', '500','600','700','800']
})

const NavLogo = () => {
  return (
  <Link href='/'>
    <div className='flex items-center gap-x-4 hover:opacity-75 transition'>
      <div className='rounded-sm p-1 bg-white mr-12 shrink-0 lg:mr-0 lg:shrink'> 
      <Image
            src='logo-noBackgroud.svg'
            alt='logo'
            width='50'
            height='50'
            />
      </div>
      <div className={cn("hidden lg:block",font.className)}>
        <p className='text-lg font-semibold'> XONNET</p>
        <p className='text-xs text-muted-foreground'> XONNET Creator Dashboards</p>
      </div>
    </div>
  </Link>
  )
}

export default NavLogo