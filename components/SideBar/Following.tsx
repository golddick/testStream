'use client'

import Follow from "@/lib/database/models/follow.models"
import User, { IUser } from "@/lib/database/models/user.models"
import { useSidebar } from "@/store/use-sidebar"
import UserItem, { UserItemSkelton } from "./UserItem"

interface FollowingProps {
    data?:IUser[]
    isLive:boolean
}

const Following = ({data, isLive}: FollowingProps) => {

    const {collapsed} = useSidebar((state) => state)

    if (!data?.length) {
        return null
    }
    console.log('data ta ', data)

  return (
    <div>
        {
            !collapsed && (
                <div className="pl-6 mb-4">
                    <p className="text-sm text-muted-foreground">Xonneted User</p>
                </div>
            )
        }

        <ul className="space-y-2 px-2"> 
            {
                data.map((follow) => (
                    <UserItem
                    key={follow._id}
                    userName={follow.username}
                    imageUrl={follow.imageUrl}
                    isLive={false}
                    />
                ))
            }
        </ul>

    </div>
  )
}

export default Following


export const FollowingSkelton = () => {
    return (
        <ul className='px-2'>
                {[...Array(4)].map((_,i) => (
                    <UserItemSkelton key={i}/>
                ))}
        </ul>
    )
}