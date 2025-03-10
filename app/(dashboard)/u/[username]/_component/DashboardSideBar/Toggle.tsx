'use client'

import { useSidebar } from '@/store/use-sidebar'
import { useCreatorSidebar } from '@/store/use-sidebar-creator'
import React from 'react'
import { Button } from '@/components/ui/button'
import {ArrowLeftFromLine, ArrowRightFromLine} from 'lucide-react'
import { Hint } from '@/components/hint'
import { Skeleton } from '@/components/ui/skeleton'


 
const CreatorToggle = () => {
    const {
        collapsed,
        onExpand,
        onCollapse
    } = useCreatorSidebar((state) => state)

    const label = collapsed ? "Expand" : "Collapse"
  return (
    <>
        {collapsed && (
            <div className='hidden md:flex lg:flex w-full items-center justify-center pt-4 mb-4'>
                <Hint label={label} side='right' asChild>
                <Button variant='ghost' className='h-auto pt-2'  onClick={onExpand}>
                    <ArrowRightFromLine className='h-4 w-4'/>
                </Button>
                </Hint>
            </div>
        ) }

        {
            !collapsed && (
                <div className='p-3 pl-6 mb-2 flex items-center w-full'>
                    <p className='font-semibold text-primary'> XONNET DASHBOARD</p>
                    <Hint label={label} side='right' asChild>
                    <Button className='h-auto p-2 ml-auto ' variant='ghost' onClick={onCollapse}>
                        <ArrowLeftFromLine className='h-4 w-4'/>
                    </Button>
                    </Hint>
                </div>
            )
        }   
    </>
  )
}

export default CreatorToggle


export const ToggleSkeleton = () => {
    return (
        <div className='p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full'>
        <Skeleton className='h-6 w-[1100px]'/>
        <Skeleton className='h-6 w-[1100px]'/>
        </div>
    )
}