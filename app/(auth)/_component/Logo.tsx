import React from 'react'

import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const font = Poppins({
    subsets:['latin'],
    weight:['200','300','400', '500','600','700','800']
})

const Logo = () => {
  return (
    <div className='flex flex-col items-center gap-y-4'>
        <div className='bg-white rounded-sm p-1'>
            <Image
            src='logo-noBackground.svg'
            alt='logo'
            width='80'
            height='80'
            />
        </div>
        <div className='flex flex-col items-center'>
            <p className={cn('text-xl font-semibold font.className')}>XONNET</p>
            <p className={cn('text-sm text-muted-foreground font.className')}> Let's Xonnet</p>
        </div>
    </div>
  )
}

export default Logo