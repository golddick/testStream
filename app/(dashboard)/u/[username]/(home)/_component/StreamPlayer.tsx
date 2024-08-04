'use client'
import {LiveKitRoom} from '@livekit/components-react'
import useViewerToken from "@/hooks/use-viewer-token"
import { IUser } from "@/lib/database/models/user.models"
import Video, { VideoSkeleton } from './Video'
import { useChatSiderbar } from '@/store/use-chat-sidebar'
import { cn } from '@/lib/utils'
import StreamChat, { StreamChatSkeleton } from '../Chat/StreamChat'
import ChatToggle from '../Chat/_component/ChatToggle'
import { ChatFormSkeleton } from '../Chat/_component/ChatForm'
import StreamHeader from '../StreamHeader/StreamHeader'
import { IStreamProps } from '@/lib/database/models/streamData.models'
import { ChatHeaderSkeleton } from '../Chat/_component/ChatHeader'
import StreamInfoCard from '../StreamInfoCard/StreamInfoCard'
import AboutCard from './AboutCard/AboutCard'

 
interface StreamPlayerProps {
    // user:{
    //   _id: string
    //   username: string
    //   imageUrl:string
    // },
    user:IUser
    stream: IStreamProps[]
    isFollowing: boolean
}

const StreamPlayer = ({user, stream, isFollowing}: StreamPlayerProps) => {
    const {token, name , identity} = useViewerToken(user._id)
   const {collapsed} = useChatSiderbar((state) => state)

   const StreamInfo = stream[0]

   const AllFollowers = user.followers.length
   const AllFollowing = user.following.length
    

    console.log('streamplayer user',user.following.length)
    // console.log('identity',identity)
    // console.log('name',name)
    // console.log('token',token)
    console.log('user',stream[0] )


 
    if (!token || !name || !identity ) {
      return <StreamPlayerSkeleton/>
    }
    
    console.log(token)
  return (
    <>
    {
      collapsed && ( 
        <div className='hidden lg:block fixed top-[100px] right-2 z-50'>
          <ChatToggle/>
        </div>
      )
    }
      <LiveKitRoom token={token} serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      className={cn('grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full', collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2")}>
          
          <div className=' space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10 '>
              <Video  hostName={user.username}  hostId={user._id}/>
              <div className='space-y-4 items-center'>
            <StreamHeader
            hostName={user.username}
            hostId={user._id}
            viewerId={identity}
            imageUrl = {user.imageUrl}
            isFollowing={isFollowing}
            name={StreamInfo?.name}
            isLive={StreamInfo?.isLive}
            />
            <StreamInfoCard
            hostId={user._id}
            viewerId={identity}
            name={StreamInfo?.name}
            thumbnailUrl={StreamInfo?.thumbnailUrl}
            />
            <AboutCard
            hostName={user.username}
            hostId={user._id}
            viewerIdentity={identity}
            bio={user.bio}
            followedByCount={AllFollowers}
            followingCount={AllFollowing}
            />
          </div>
          </div>
       
          <div className={cn('col-span-1', collapsed && 'hidden')}>
            <StreamChat
            viewerName={name}
            hostName={user.username }
            hostId={user._id}
            isFollowing={isFollowing}
            isChatEnabled={StreamInfo?.isChatEnabled}
            isChatDelayed={StreamInfo?.isChatDelayed}
            isChatFollowersOnly={StreamInfo?.isChatFollowersOnly}
            />
          </div>
      </LiveKitRoom>
    </>
  )
}

export default StreamPlayer

export const StreamPlayerSkeleton = () => {
  return(
    <div  className='grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full'>
      <div className='space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl::col-span-5 lg: overflow-y-auto hidden-scrollbar pb-10'>
      <VideoSkeleton/>
      <ChatHeaderSkeleton/>
      </div>
      <div className='col-span-1 bg-background'>
      <StreamChatSkeleton/>
      </div>
    </div>
  )
}