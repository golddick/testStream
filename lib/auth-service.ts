
import { currentUser } from "@clerk/nextjs/server";
import { connectToDatabase } from "./database";
import User from "./database/models/user.models";
import { handleError } from "./utils";



export const getLoginUser = async () => {
// Establish database connection when the application starts
    await connectToDatabase();

    try {
        const loggedUser = await currentUser();

        // console.log('logged user', loggedUser);

        const username = loggedUser?.username;
        const userId = loggedUser;

        console.log('username:33', username);
        console.log('userid 900', userId);

        if (!loggedUser || !loggedUser.username) {
            // throw new Error("Unauthorized");
            return null;
        }

        const userloggedin = await User.findOne({ clerkId: loggedUser.id });

        if (!userloggedin) {
            throw new Error("User not found in the database clerkid ");
        }

        return JSON.parse(JSON.stringify(userloggedin));
    } catch (error) {
        // Handle the error or re-throw it for global error handling
        handleError(error);
        throw error;
    }
};


export const getLoginUserByUsername = async (username: string) => {
    try {
        // Retrieve the currently logged-in user
        const loggedUser = await currentUser();

        if (!loggedUser || !loggedUser.username) {
            throw new Error("Unauthorized");
        }

        // Find the user by username
        const userloggedin = await User.findOne({ username });

        if (!userloggedin) {
            throw new Error("User not found in the database");
        }

        // Return the found user
        return userloggedin;
    } catch (error) {
        // Handle the error or re-throw it for global error handling
        handleError(error);
        throw error;
    }
};




