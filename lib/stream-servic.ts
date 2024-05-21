import { getLoginUser } from "./auth-service";
import { connectToDatabase } from "./database";
import StreamData from "./database/models/streamData.models";
import User from "./database/models/user.models";



export const createStream = async () => {
    await connectToDatabase();

    try {
        const loggedInUser = await getLoginUser();
        if (!loggedInUser) {
            throw new Error("User not found");
        }
        console.log('Logged-in user:', loggedInUser);

        // Update user model to include the new stream reference
        const updatedUser = await User.findByIdAndUpdate(
            loggedInUser._id,
            { $addToSet: { streamData: { _id: loggedInUser._id, name: `${loggedInUser.username}'s stream` } } },
            { new: true }
        );

        // Create the stream
        const stream = await StreamData.create({
            _id: `${loggedInUser._id}`,
            name: `${loggedInUser.username}'s stream`
        });

        return stream;
    } catch (error) {
        console.error("Error creating stream:", error);
        throw error;
    }
};



export const getStreamByUserId = async (_id: string) => {
    await connectToDatabase();

    try {
        // Find all streams associated with the user ID
        const streams = await StreamData.findById({ _id: _id }); // Assuming userId is the field representing user ID in StreamData

        if (!streams || streams.length === 0) {
            console.log("No streams found for user:", _id);
            // return null; // Return null or another appropriate value if no streams are found
        }

        return streams;
    } catch (error) {
        console.error("Error getting streams by user ID:", error);
        throw error;
    }
};



export const getAllStreamData = async () => {
    await connectToDatabase();
    try {
        // Find all stream data
        const allStreamData = await StreamData.find({});

        return allStreamData;
    } catch (error) {
        console.error("Error getting all stream data:", error);
        throw error;
    }
};