import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user.service";
import { notFound } from "next/navigation";
import Action from "./_components/Action";
import { isBlockedByUser } from "@/lib/blocked-service";
import StreamPlayer from "@/app/(dashboard)/u/[username]/(home)/_component/StreamPlayer";

interface UserPageProps{
    params:{
        username:string;
    }
}

const UserPage = async ({params}:UserPageProps) => {

    const user = await getUserByUsername(params.username)
    if (!user) {
        notFound
    }
    const ObjectStreamInfo = user.toObject();
    console.log('follow page user',ObjectStreamInfo)

    const isFollowing = await isFollowingUser(user._id)  
    const isBlocked = await isBlockedByUser(user._id)

    if (isBlocked) {
        notFound()
    }
  return (
    
   <StreamPlayer
   user={ObjectStreamInfo}
   stream={ObjectStreamInfo.streamData}
   isFollowing={isFollowing}
   />
  )
}

export default UserPage