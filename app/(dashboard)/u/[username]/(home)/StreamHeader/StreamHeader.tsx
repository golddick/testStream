'use client '

import UserAvatar, { UserAvatarSkeleton } from "@/components/UserAvatar"
import VerifiedMark from "../_component/VerifiedMark"
import { useParticipants, useRemoteParticipant } from "@livekit/components-react"
import { UserIcon } from "lucide-react"
import Action, { ActionSkeleton } from "./Action"
import { Skeleton } from "@/components/ui/skeleton"


interface StreamHeaderProps {
    hostName: string
    hostId:string
    viewerId:string
    imageUrl:string
    isFollowing:boolean
    name:String
    isLive:boolean

}

const StreamHeader = ({hostId,hostName,viewerId,name,imageUrl,isFollowing,isLive}:StreamHeaderProps) => {
 
 
    const AllParticipants = useParticipants()
    const participant = useRemoteParticipant(hostId)

    const hostAsViewer = `host-${hostId}`
    const isHost = viewerId === hostAsViewer;

    const participantCount = AllParticipants.length; 
 
    return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
        <div className="flex items-center gap-x-3">
            <UserAvatar 
            imageUrl={imageUrl}
            userName={hostName}
            size='lg'
            isLive={isLive}
            showBadge
            />
            <div className="space-y-1">
                <div className="flex items-center gap-x-2">
                    <h2 className="text-lg font-semibold">
                        {hostName}
                    </h2>
                    <VerifiedMark/> 
                </div>
                <p className="text-sm font-semibold">{name}</p>
                {isLive ? (
                    <div className=" font-semibold flex gap-x-1 items-center text-xs text-rose-500">
                        <UserIcon className="h-4 w-4"/>
                        <p>
                            {participantCount} {participantCount === 1? 'viewer' : 'viewers'}
                        </p>
                    </div>
                ) : (
                    <p className="font-semibold text-xs text-muted-foreground">  Offline </p>
                )}
            </div>
        </div>
        <Action
        isFollowing={isFollowing}
        hostIdentity={hostId}
        isHost={isHost}
        />
    </div>
  )
}

export default StreamHeader

export const StreamHeaderSkeleton = () => {
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
        <div className="flex items-center gap-x-2">
            <UserAvatarSkeleton size='lg'/>
        </div>
        <div className="space-y-2">
            <Skeleton className="h-6 w-32"/>
            <Skeleton className="h-4 w-24"/>
        </div>
        <ActionSkeleton/>
    </div>
}