'use client'

import { IUser } from '@/lib/database/models/user.models';
import { useSidebar } from '@/store/use-sidebar';
import React from 'react';
import UserItem, { UserItemSkelton } from './UserItem';
import { getStreamByUserId } from '@/lib/stream-servic';


type RecommendedProps = {
    data?:  IUser[]
    isLive: boolean
};

const Recommended = ({ data, isLive }: RecommendedProps) => {
    console.log('recom data',isLive)


    

    const {collapsed} = useSidebar((state) => state)

    const showLabel = !collapsed && data && data?.length > 0;
    return (
        <div>
            {showLabel && (
                <div className='pl-6 mb-4'>
                    <p className='text-sm text-muted-foreground'>Recommended</p>
                </div>
            )}
            <ul className='space-y-2 px-2'>
                {data?.map((user) => (
                    <UserItem key={user?._id} userName={user.username} imageUrl={user.imageUrl} isLive={isLive}/>
                ))}
            </ul>
        </div>
    );
};

export default Recommended;

export const RecommendedSkeleton = () => {
    return (
        <ul className='px-2'>
                {[...Array(3)].map((_,i) => (
                    <UserItemSkelton key={i}/>
                ))}
        </ul>
    )
}
