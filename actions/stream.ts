'use server'

import { getLoginUser } from "@/lib/auth-service";
import { connectToDatabase } from "@/lib/database";
// import Stream, {IStream} from "@/lib/database/models/stream.models";
import StreamData, { IStreamProps } from "@/lib/database/models/streamData.models";
import { createStream } from "@/lib/stream-servic";
import { revalidatePath } from "next/cache";


export const onCreateStream = async () => {
    await connectToDatabase(); // Ensure database connection

    try {
        const streamData = await createStream();
        console.log('streamData all', streamData)
        revalidatePath('/'); 

        if (!streamData) {
            throw new Error("cant create stream at all");
            
        }

        return streamData; // Return the followed user
    } catch (error) {
        console.error("Error occurred during follow:", error); 
        throw new Error("Internal error");
    }
};

export const updateStream = async (values: Partial<IStreamProps>) => {
    await connectToDatabase()
    try {
        const loggedInUser = await getLoginUser();
        const userId = loggedInUser._id
        const myStream = await StreamData.findById(userId);

        console.log(myStream)

        if (!myStream) {
            throw new Error("Stream not found");
        }

        const validData ={
            thumbnailUrl:'',
            name:values.name,
            isChatEnabled:values.isChatEnabled,
            isChatFollowersOnly: values.isChatFollowersOnly,
            isChatDelayed: values.isChatDelayed
        }

        const updatedStream = await StreamData.findByIdAndUpdate(myStream._id, validData, { new: true });

        revalidatePath(`/u/${loggedInUser.username}/Chat`)
        revalidatePath(`/u/${loggedInUser.username}`)
        revalidatePath(`/${loggedInUser.username}`)
        return updatedStream;
    } catch (error) {
        throw new Error("internal error");

        
    }
}