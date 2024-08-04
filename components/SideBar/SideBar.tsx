import React from 'react'
import { Wrapper } from './Wrapper'
import Toggle from './Toggle'
import Recommended, { RecommendedSkeleton } from './Recommended'
import { getRecommended } from '@/lib/recommended-services'
import { getFollowedUsers } from '@/lib/follow-service'
import { getLoginUser } from '@/lib/auth-service'
import Following, { FollowingSkelton } from './Following'
import {  getAllStreamData, getStreamByUserId } from '@/lib/stream-servic'

const SideBar =  async () => {

  const loggedInUser = await getLoginUser();

  const recommended = await getRecommended()

  const following  = await getFollowedUsers(loggedInUser)

  // const StreamInfo = await getStreamByUserId(loggedInUser?._id)

  // const ObjectStreamInfo = StreamInfo.map(stream => stream.toObject());

// console.log('ObjectStreamInfo', ObjectStreamInfo)
// const isLive = ObjectStreamInfo ? ObjectStreamInfo[0].isLive : false;

//   console.log(isLive)

  console.log('many follow',recommended)
  return (
    <Wrapper>
        <Toggle/>
        <div className='space-y-4 pt-4 lg:pt-0'>
          <Following data={following} isLive={false}/>
          <Recommended data={recommended} isLive={true}/>
        </div>
    </Wrapper>
  )
}

export default SideBar

export const SidebarSkeleton = () => {
  return(
    <aside className='fixed left-0 flex-col w-[70px] lg:w-60 h-full bg-background border-r border-purple-600 z-50'>
        <FollowingSkelton/>
        <RecommendedSkeleton/>
    </aside>
  )
}