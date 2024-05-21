
import { getStreams } from '@/lib/feed-service'
import React from 'react'
import StreamRCards, { StreamRCardsSkeleton } from './StreamRCards'
import { getUserDataById } from '@/lib/user.service'
import { getLoginUser } from '@/lib/auth-service'
import { Skeleton } from '@/components/ui/skeleton'


const StreamResult = async  () => {
    const loggedInUser = await getLoginUser()
const data = await getStreams(loggedInUser._id)

  return (
    <div>
        
        <h2 className='text-lg font-semibold mb-4'>Stream U May Like</h2>
        {data.length === 0 && (
            <div className='text-muted-foreground text-sm'>
                No Stream Found
            </div>
        )}

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
                {
                    data.map((stream) => (
                        <StreamRCards
                        key={stream._id}
                        data={stream}
                        />
                    ))
                }
        </div>

    </div>
  )
} 
export default StreamResult




export const StreamResultSkeleton = () => {
    return (
        <div>
                <Skeleton className='h-8 w-[290px]'/>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
                    {[...Array(5)].map((_,i) => (
                        <StreamRCardsSkeleton key={i}/>
                    ))}
                </div>
        </div>
    )
}