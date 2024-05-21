'use server'

import { getLoginUser } from "@/lib/auth-service";
import { connectToDatabase } from "@/lib/database";
import User, { IUser } from "@/lib/database/models/user.models"
import { revalidatePath } from "next/cache";

export const updateBioUser= async (values: Partial<IUser>) => {
    await connectToDatabase()
    try {
        const loggedInUser = await getLoginUser()

        const validData = {
            bio: values.bio,
        }

        const user = await User.findByIdAndUpdate(loggedInUser._id, validData,{new:true})

        revalidatePath(`/${loggedInUser.username}`)
        revalidatePath(`/u/${loggedInUser.username}`)

        return user
    } catch (error) {
        throw new Error("internal error");
        
    }
}