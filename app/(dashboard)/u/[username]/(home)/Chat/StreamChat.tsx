'use client'

import { ChatVariant, useChatSiderbar } from "@/store/use-chat-sidebar"
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react"
import { ConnectionState } from "livekit-client"
import { useEffect, useMemo, useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import ChatHeader, { ChatHeaderSkeleton } from "./_component/ChatHeader"
import ChatForm, { ChatFormSkeleton } from "./_component/ChatForm"
import MessageList, { MessageListSkeleton } from "./_component/MessageList"
import ChatCommunity from "./_component/ChatCommunity"

interface StreamChatProps{
    viewerName:string,
    hostId:string,
    hostName:string
    isFollowing:boolean
    isChatEnabled:boolean
    isChatDelayed:boolean
    isChatFollowersOnly:boolean
}

const StreamChat = ({viewerName,hostId,hostName,
     isChatDelayed,isChatEnabled, 
       isChatFollowersOnly, isFollowing}:StreamChatProps) => {

        const matches = useMediaQuery('(max-width:1024px)')
        const {variant, onExpand} = useChatSiderbar((state) => state)
        const connectionState = useConnectionState()
        const participant = useRemoteParticipant(hostId)

        const isOnline = participant && connectionState === ConnectionState.Connected 

        console.log('is on line', !!isOnline)

        const isHidden = !isChatEnabled || !isOnline

        console.log(isHidden)

        const [value, setValue] = useState('')
        const {chatMessages: messages, send} = useChat()

        useEffect(() => {
            if (matches) {
                onExpand()
            }
        },[matches, onExpand])

        const reversedMessages = useMemo(() => {
            return messages.sort((a,b) => b.timestamp - a.timestamp)
        },messages)

        const onSubmit = () => {
            if (!send) return

            send(value)
            setValue('',)
        }

        const onChange = (value: string) => {
            setValue(value)
        }

  return (
    <div className="flex flex-col bg-background border-1 border-b ppt-0 h-[calc(100vh-80px)]">
        <ChatHeader/>
        {
            variant === ChatVariant.CHAT && (
                <>
                <MessageList
                messages={reversedMessages}
                isHidden={isHidden}
                />
                <ChatForm
                onSubmit={onSubmit}
                value={value}
                onChange={onChange}
                isHidden={isHidden}
                isFollowersOnly={isChatFollowersOnly}
                isDelayed={isChatDelayed}
                isFollowing={isFollowing}
                />
                </>
            )
        }

        {
            variant === ChatVariant.COMMUNITY && (
                <>
               <ChatCommunity
               viwerName={viewerName}
               hostName={hostName}
               isHidden={isHidden}
               />
                </>
            )
        }
    </div>
  )
}

export default StreamChat

export const StreamChatSkeleton = () => {
    return (
        <div className="flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2">
                <ChatHeaderSkeleton/>
                <MessageListSkeleton/>
                <ChatFormSkeleton/>
        </div>
    )
}