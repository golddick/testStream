'use client'

import { ConnectionState, Track } from "livekit-client";

import { useConnectionState, useRemoteParticipant, useTracks } from "@livekit/components-react";
import OfflineVideo from "./OfflineVideo";
import LoadingVideo from "./LoadingVideo";
import LiveVideo from "./LiveVideo";
import { Skeleton } from "@/components/ui/skeleton";

interface  videoProps {
    hostName: string;
    hostId: string;
}

const Video = ({hostName, hostId}: videoProps) => {
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostId)
    const tracks = useTracks ([
        Track.Source.Camera,
        Track.Source.Microphone
    ]).filter((track) => track.participant.identity === hostId)

    console.log("connectionState",connectionState)
    console.log("participant",participant)

    let content;

    if (!participant && connectionState === ConnectionState.Connected) {
        content = <OfflineVideo username={hostName}/>
    }else if( !participant || tracks.length === 0){
        content = <LoadingVideo label={connectionState}/>
    }else {
        content = <LiveVideo participant={participant}/>
    }

  return (
    <div className="aspect-video border-b group relative">{content}</div>
  )
}

export default Video

export const VideoSkeleton = () => {
    return(
        <div className="aspect-video border-x border-background">
            <Skeleton className="h-full w-full rounded-none"/>
        </div>
    )
}