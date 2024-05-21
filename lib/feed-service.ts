import { connectToDatabase } from "./database";
import { getLoginUser } from "./auth-service";
import StreamData from "./database/models/streamData.models";
import { isBlockedByUser } from "./blocked-service"; // Import the function to check if a user is blocked



export const getStreams = async (_id:string) => {
    await connectToDatabase();
    try {
        let streams;
        // Fetch all streams from MongoDB
        if (_id) {
            // Fetch all streams except those belonging to the logged-in user
            streams = await StreamData.find({ "user._id": { $ne: _id } }).sort({ isLive: -1, updatedAt: -1 });
        } else {
            // Fetch all streams for non-logged-in users
            streams = await StreamData.find().sort({ isLive: -1, updatedAt: -1 });
        }
        return streams;
    } catch (error) {
        // Handle errors
        console.error("Error fetching streams:", error);
        return [];
    }
}
