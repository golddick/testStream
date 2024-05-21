'use client'

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { useSidebar } from "@/store/use-sidebar";
import Link from "next/link";
import UserAvatar from "../UserAvatar";
import LiveBadge from "../LiveBadge";

interface UserItemProps {
    userName: string;
    imageUrl: string;
    isLive?: boolean;
}

const UserItem = ({userName, imageUrl, isLive}:UserItemProps) => {

    const pathname = usePathname();
    const {collapsed} = useSidebar((state) => state)
    const href =  `/${userName}`
    const isActive = pathname === href

  return (
    <Button
    asChild
    variant='ghost'
    className={cn('w-full h-12', collapsed ? "justify-center" : 'justify-start', isActive && 'bg-accent')}
    >
        <Link href={href}>
            <div className={cn('flex items-center w-full gap-x-4', collapsed && 'justify-center')}>
            <UserAvatar imageUrl={imageUrl} userName={userName} isLive={isLive}/>
          {
            !collapsed && (
                <p className="truncate">{userName}</p>
            )
          }

          {
            !collapsed && isLive && (<LiveBadge className="ml-auto "/>)
          }
            </div>
        </Link>
    </Button>
  )
}

export default UserItem

export const UserItemSkelton = () => {
    return(
        <li className="flex items-center gap-x-4 px-3 py-2 ">
            <Skeleton className="min-h-[32px] min-w-[32px] rounded-full"/>
            <div className="flex-1">
                <Skeleton className="h-6"/>
            </div>
        </li>
    )
}