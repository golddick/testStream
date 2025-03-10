'use client'

import { onFollow, onUnFollow } from "@/actions/follow"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useAuth } from "@clerk/nextjs"
import { Heart } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { toast } from "sonner"

interface ActionProps {
    isFollowing:boolean
    hostIdentity:string
    isHost:boolean
}

const Action = ({isFollowing,isHost,hostIdentity}:ActionProps) => {
  
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const {userId} = useAuth()

    const handleFollow = () => {
        startTransition(() => {
            onFollow(hostIdentity)
            .then((data) => toast.success(`you are now following ${data.following.username}`))
            .catch(() => toast.error('something went wrong with following user'))
        })
    }

    const handleUnFollow = () => {
        startTransition(() => {
            onUnFollow(hostIdentity)
            .then((data) => toast.success(`u unFollowed ${data.updatedLoggedInUser}`))
        })
    }

   const toggleFollow = () => {
    if (!userId) {
        return router.push("/sign-in")
    }

    if (isHost) return;
        

    if (isFollowing) {
        handleUnFollow()
    }else{
        handleFollow()
    }

   }
  
    return (
    <Button 
    disabled={isPending || isHost}
    onClick={toggleFollow}
    variant='primary'
    size='sm'
    className="w-full lg:w-auto"
    >
        <Heart className={cn('h-4 w-4 mr-2', isFollowing ? 'fill-white' : 'fill-none')}/>
        {isFollowing ? 'UnFollow' : 'Follow'}
    </Button>
  )
}

export default Action 


export const ActionSkeleton = () => {
    return(
        <Skeleton className="h-10 w-full lg:w-24"/>
    )
}