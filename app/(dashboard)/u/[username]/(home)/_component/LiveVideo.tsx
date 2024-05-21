'use client'

import { Participant , Track} from "livekit-client"
import { useTracks } from "@livekit/components-react";
import { useEventListener } from "usehooks-ts";
import { useEffect, useRef, useState } from "react";
import FullScreenControl from "./Contorls/FullScreenControl";
import VolumeControl from "./Contorls/VolumeControl";


interface LiveVideoProps {
    participant: Participant;
}

const LiveVideo = ({participant}: LiveVideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const [isFullScreen, setIsFullscreen] = useState(false)
    const [volume, setVolume] = useState(0)


    useTracks([Track.Source.Camera, Track.Source.Microphone]).filter
    ((track) => track.participant.identity === participant.identity).forEach
    ((track) => {
        if (videoRef.current) {
            track.publication.track?.attach(videoRef.current)
        }
    })

    const toggleFullscreen = () => {
        if (isFullScreen) {
            document.exitFullscreen()
            // setIsFullscreen(false);
        }else if(wrapperRef?.current){
            wrapperRef.current.requestFullscreen()
            // setIsFullscreen(true)
        }
    }

    //to listing to the changing of screen size 

    const haandleFullscreenChange = () => {
        const isCurrentylFullscreen = document.fullscreenElement !== null;
        setIsFullscreen(isCurrentylFullscreen)
    }
    useEventListener('fullscreenchange', haandleFullscreenChange, wrapperRef); 


    const onVolumeChange = (value: number) => {
        setVolume(+value);

        if (videoRef?.current) {
            videoRef.current.muted = value === 0;
            videoRef.current.volume = +value * 0.01;
        }
    }

    const toggleMute = () => {
        const isMuted = volume === 0
        setVolume(isMuted ? 50 : 0)

        if (videoRef?.current) {
            videoRef.current.muted = !isMuted;
            videoRef.current.volume = isMuted ? 0.5 : 0
        }
    }

    useEffect(() => {
        onVolumeChange(0)
    }, [])

  return (
    <div className="relative h-full flex" ref={wrapperRef}>
        <video ref={videoRef} width='100%'/>
        <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
            <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
                <VolumeControl  onChange={onVolumeChange} value={volume} onToggle={toggleMute}/>
                <FullScreenControl
                isFullScreen={isFullScreen}
                onToggle={toggleFullscreen}
                />
            </div>
        </div>
    </div>
  )
}

export default LiveVideo