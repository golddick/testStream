'use server'

import { v4 } from "uuid"
import { AccessToken } from "livekit-server-sdk"
import { getLoginUser } from "@/lib/auth-service"

import { getUserDataById } from "@/lib/user.service"
import { isBlockedByUser } from "@/lib/blocked-service"

export const createViewerToken = async (hostIdentity:string) => {

    let loggedInUser;

    try {
        loggedInUser = await getLoginUser()
    } catch {
        const _id= v4()
        const GuestUsername = `guest${Math.floor(Math.random() * 1000)}`
        loggedInUser = {_id, GuestUsername}
    }

    const host = await getUserDataById(hostIdentity);

    console.log('host id', host)

    if (!host) {
        throw new Error("host not found");
        
    }

    // const isBlocked = await isBlockedByUser(host.id)

    // if (isBlocked) {
    //     throw new Error("User id blocked");
        
    // }

    const isHost = loggedInUser?._id === host.id;

    // Determine the identity based on whether the user is logged in
    const identity = loggedInUser ? `host-${loggedInUser?._id}` : `guest-${v4()}`;


    const token = new AccessToken(
        process.env.LIVEKIT_API_KEY,
        process.env.LIVEKIT_SECRET_KEY,

        // {
        //     identity: isHost ? `host-${loggedInUser?._id}` : loggedInUser,
        //     name: loggedInUser?.username,
        // }
        {
            identity,
            name: loggedInUser ? loggedInUser.username : `guest${Math.floor(Math.random() * 1000)}`,
        }

    )
    
    token.addGrant({
        room:host?.id,
        roomJoin:true,
        canPublish:false,
        canPublishData:true
    })

return await Promise.resolve(token.toJwt())
}