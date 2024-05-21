import { getUserByUsername } from "@/lib/user.service"
import { currentUser } from "@clerk/nextjs/server"
import StreamPlayer from "./_component/StreamPlayer"


interface CreatorPage {
  params:{username:string}
}

const page = async ({params}: CreatorPage) => {

  // const { username } = params.router.query;


  const externalUser = await currentUser()
  // console.log(externalUser)
  const user = await getUserByUsername(params.username )
  const ObjectStreamInfo = user.toObject();
  console.log('fish',ObjectStreamInfo.streamData)

console.log('ObjectStreamInfo',ObjectStreamInfo.streamData);
  // console.log(user.clerkId)

  if (!ObjectStreamInfo || ObjectStreamInfo.clerkId !== externalUser?.id || !ObjectStreamInfo.streamData) {
    throw new Error("Unauthorized");
    
  }

  return (
    <div className="h-full">
    <StreamPlayer user={ObjectStreamInfo} stream={ObjectStreamInfo.streamData} isFollowing/>
    </div>
  )
}

export default page