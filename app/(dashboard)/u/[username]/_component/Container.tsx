'use client'

import { cn } from "@/lib/utils"

import { useCreatorSidebar } from "@/store/use-sidebar-creator"
import { useEffect } from "react"
import { useMediaQuery } from "usehooks-ts"

interface ContainerProps {children: React.ReactNode};

export const DashBoardContainer = ({children,}: ContainerProps) => {
    const deviceMatches = useMediaQuery('(max-width: 1024px)')
    const {collapsed,onCollapse,onExpand} = useCreatorSidebar((state) => state)

    useEffect (() => {
        if (deviceMatches) {
            onCollapse();
        } else {
            onExpand
        }
    },[onCollapse,onExpand,deviceMatches])

    return (
        <div className={cn('flex-1', collapsed ? 'ml-[70px]' :'ml-[70px] lg:ml-60  md:ml-60')}>
            {children}
        </div>
    )
}