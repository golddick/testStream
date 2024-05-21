'use client'

import { useCreatorSidebar } from "@/store/use-sidebar-creator"
import { useSidebar } from "@/store/use-sidebar"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"


interface WrapperProps{children:React.ReactNode}

export const CreatorWrapper = ({children}:WrapperProps) => {

const {collapsed} = useCreatorSidebar((state) => state)

const [isClient, setIsClient] = useState(false)

useEffect(() => {
    setIsClient(true)
},[])

if(!isClient) return (
    <aside
    className={cn('fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-purple-500 z-50 ' )
  
}
    >

    </aside>
)

    return(
        <aside
        className={cn('fixed left-0 flex flex-col w-60 h-full bg-background border-r border-purple-500 z-50 ' ,   collapsed && 'w-[70px]')
      
    }
        >
            {children}
        </aside>
    )
}