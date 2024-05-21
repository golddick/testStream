'use server'


import { getLoginUser } from "@/lib/auth-service"
import { blockUser, unblockUser } from "@/lib/blocked-service"
import { connectToDatabase } from "@/lib/database"
import { RoomServiceClient } from "livekit-server-sdk"
import { revalidatePath } from "next/cache"

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
     process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_SECRET_KEY!,
    
    );

export const onBlock = async (_id: string) => {
    await connectToDatabase ()
    try {
        const loggedInUser = await getLoginUser()

        let blockedUser

        try {
            blockedUser = await blockUser(_id)

            console.log(blockedUser.username)
        } catch (error) {
            // this means user is a guest 
        }

       try {
        await roomService.removeParticipant(loggedInUser?._id , _id )
       } catch (error) {
        // this means users isn't in the stream room
       }

      

        revalidatePath(`/u/${loggedInUser.username}/community`);

        // if (blockedUser) {
        //     revalidatePath(`/${blockedUser}`)
        //     // revalidatePath(`/${blockedUser.blocked.username}`)
        // }

        return blockedUser
    } catch (error) {
        console.log(error)
    }
}


export const onUnBlock = async (_id: string) => {
    await connectToDatabase ()
    try {
        const unBlockUser = await unblockUser(_id)

        revalidatePath("/");

        if (unBlockUser) {
            revalidatePath(`/${unBlockUser}`)
            // revalidatePath(`/${blockedUser.blocked.username}`)
        }

        return unBlockUser
    } catch (error) {
        
    }
}