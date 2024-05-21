import { IStreamProps } from '@/lib/database/models/streamData.models'
import { getUserDataById } from '@/lib/user.service'
import Link from 'next/link'
import React from 'react'
import ThumbnailCard, { ThumbnailCardSkeleton } from './ThumbnailCard'
import LiveBadge from '@/components/LiveBadge'
import UserAvatar, { UserAvatarSkeleton } from '@/components/UserAvatar'
import { Skeleton } from '@/components/ui/skeleton'


interface StreamRCardsProps {
    data:IStreamProps
}

const StreamRCards = async ( {data} :StreamRCardsProps) => {
    console.log(data.toObject())

    const streamUserData = await getUserDataById(data._id)

    const streamInfo =streamUserData.toObject()

    const streamInfoUsername = streamInfo.username

    console.log(streamInfo.imageUrl)

 

  
  return (
    <Link href={`/${streamInfoUsername}`}>
        <div className='h-full w-full space-y-4'>
            <ThumbnailCard
            src={data.thumbnailUrl}
            fallback={streamInfo.imageUrl}
            isLive={data.isLive}
            username={streamInfoUsername}
            />

            {/* {data.isLive && (
                <div >
                    <LiveBadge/>
                </div>
                // <div className='absolute top-2 left-2 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform'>
                //     <LiveBadge/>
                // </div>
            )} */}
            <div className='flex gap-x-3'>
                <UserAvatar
                userName={streamInfoUsername}
                imageUrl={streamInfo.imageUrl}
                isLive={data.isLive}
                />

                <div className='flex flex-col text-sm overflow-hidden'>
                    <p className='truncate font-semibold hover:text-purple-500'>
                            {data.name}
                    </p>
                    <p className='flex text-muted-foreground'>{streamInfoUsername}</p>
                </div>

            </div>
        </div>
    </Link>
  )
}

export default StreamRCards


export const StreamRCardsSkeleton = () => {
    return (
        <div className='h-full w-full space-y-4'>
            <ThumbnailCardSkeleton/>
            <div className='flex gap-x-3'>
                <UserAvatarSkeleton/>

                <div className='flex flex-col gap-y-1'>
                    <Skeleton className='h-4 w-32'/>
                    <Skeleton className='h-3 w-24'/>

                </div>
            </div>
        </div>
    )
}