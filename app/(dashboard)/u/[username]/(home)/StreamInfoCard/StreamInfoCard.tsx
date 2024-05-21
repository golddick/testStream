'use client '

import { Pencil } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import InfoModel from "./InfoModel"


interface StreamInfoCard{

    hostId:string
    viewerId:string
    name:string
    thumbnailUrl:string | null

}



const StreamInfoCard = ({hostId,viewerId,name,thumbnailUrl}: StreamInfoCard) => {
  
    const hostAsViewer =   `host-${hostId}`;
    const isHost = viewerId === hostAsViewer

    if (!isHost) return null
  
    return (
    <div className="px-4">
        <div className="rounded-xl bg-background">
            <div className="flex items-center gap-x-2.5 p-4">
                <div className="rounded-md bg-purple-600 p-1 h-auto w-auto">
                    <Pencil className="h-4 w-4"/>
                </div>
                <div>
                    <h2 className="text-sm lg:text-lg font-semibold capitalize">
                        Edit ur stream info 
                    </h2>
                    <p className="text-muted-foreground text-xs lg:text-sm ">
                        Maximize ur visibility 
                    </p>
                </div>
                <InfoModel
                initialName={name}
                initialThumbnailUrl={thumbnailUrl}
                />
            </div>
            <Separator/>

        <div className="p-4 lg:p-8 space-y-4">
            <div>
                <h3 className="text-sm text-muted-foreground mb-2">Name</h3>
                <p className="text-sm font-semibold">{name}</p>
            </div>

            <div>
                <h3 className="text-sm text-muted-foreground mb-2">Thumbnail</h3>
                    {
                        thumbnailUrl && (
                            <div className="relative aspect-video rounded-md overflow-hidden w-[200px] border-purple-600">
                                <Image
                                fill
                                src={thumbnailUrl}
                                alt={name}
                                className="object-cover"
                                />
                            </div>
                        )
                    }
            </div>

        </div>

        </div>
        
    </div>
  )
}

export default StreamInfoCard