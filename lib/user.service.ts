import { connectToDatabase } from "./database";
import User from "./database/models/user.models";


// interface getUserPageProps {
//     params:{username:string}
//   }


export const getUserByUsername = async (username:string) => {

    // const { username } = params;


    console.log('mm',username)
    await connectToDatabase();

    try {
        console.log("Searching for user with username:", username);
        // Find the user by username and populate the streamData field
        const user = await User.findOne({ username:username }).populate('streamData');
        
        if (!user) {
            throw new Error("User not found for username: " + username);
        }

        return user;
    } catch (error) {
        console.log(error);
        throw error; 
    }
}



export const getUserDataById = async (_id: String) => {
    await connectToDatabase();

    try {
        // Find the user by ID and populate the streamData field
        const user = await User.findById(_id).populate('streamData');
        
        return user;
    } catch (error) {
        console.log(error);
        throw error; 
    }
}

