'use client'

import BioModal from "@/components/BioModal"
import VerifiedMark from "../VerifiedMark"

interface AboutCardProps {
    hostName:string
    hostId:string
    viewerIdentity:string
    bio:string | null
    followedByCount:number
    followingCount:number
}

const AboutCard = ({hostId,hostName,viewerIdentity,bio,followedByCount,
followingCount}:AboutCardProps) => {

    const hostAsViewer = `host-${hostId}`;
    const isHost = viewerIdentity === hostAsViewer;

    const followedByLabel = followedByCount === 0 ? 'follower' : 'followers'
    const followingLabel = followingCount === 0 ? 'following' : "followings" 


  return (
    <div className="px-4">
        <div className="group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2 font-semibold text-lg  lg:text-2xl">
                    About {hostName}
                    <VerifiedMark/>
                </div>
                {isHost && (
                    <BioModal initialValue={bio}/>
                )}
            </div>
                <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                        <span className="font-semibold text-primary">{followedByCount} </span>{followedByLabel}
                    </div>
                    <div className=" text-sm text-muted-foreground">
                        <span className="font-semibold text-primary">{followingCount} </span>{followingLabel}
                    </div>
                </div>
                <p className="text-sm ">
                    {bio || 'lets keep the mystery'}
                </p>
        </div>


    </div>
  )
}

export default AboutCard 