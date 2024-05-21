'use client'

import { useUser } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { Fullscreen, KeyRound, MessagesSquare, User } from "lucide-react"
import DashNavItem, { DashNavItemSkeleton } from "./DashNavItem"


const DashboardNavigation = () => {

    const pathname = usePathname()
    const user = useUser()

    const username = user?.isLoaded && user?.user?.username;
 console.log('dash user', username)

    const routes = [
        {
            id:1,
            label:'Stream',
            // href:`/u/${user?.username}`,
            href: username ? `/u/${username}` : '/',
            icon: Fullscreen
        },
        {
            id:2,
            label:'Key',
            href: username ? `/u/${username}/keys` : '/',
            icon: KeyRound
        },
        {
            id:3,
            label:'Chat',
            href: username ? `/u/${username}/Chat` : '/',
            icon: MessagesSquare
        },
        {
            id:4,
            label:'Community',
            href: username ? `/u/${username}/Community` : '/',
            icon: User
        },
    ]

    if (!user?.isLoaded) {
        return(
            <ul className="space-y-2">
                {[...Array(4).map((_, i) => (
                    <DashNavItemSkeleton key={i}/>
                ))]}
            </ul>
        )
    }

  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0"> 
        {
            routes.map((route) =>(
              <DashNavItem
              key={route.id}
              label={route.label}
              icon={route.icon}
              href={route.href}
              isActive={pathname === route.href}
              />
            ))
        }
    </ul>
  )
}

export default DashboardNavigation