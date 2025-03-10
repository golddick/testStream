'use client'

import { ReceivedChatMessage } from "@livekit/components-react"
import ChatMessage from "./ChatMessage"
import { Skeleton } from "@/components/ui/skeleton"

interface MessageListProps {
    messages:ReceivedChatMessage[],
    isHidden:boolean
}

const MessageList = ({messages,isHidden}:MessageListProps) => {
    if (isHidden || !messages || messages.length === 0) {
       return(
        <div className="flex flex-1 items-center justify-center">
             <p className="text-sm text-muted-foreground">{isHidden ? "Chat is disabled" : " Welcome to the chat"}</p>
        </div>
       )
    }
  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
        {messages.map((messages) =>(
            <ChatMessage
            key={messages.timestamp}
            data={messages}
            />
        ))}
    </div>
  )
}

export default MessageList


export const MessageListSkeleton = () => {
    return (
        <div className="flex h-full items-center justify-center">
            <Skeleton className="w-1/2 h-6"/>
        </div>
    )
};