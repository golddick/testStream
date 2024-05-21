


import { connectToDatabase } from "./database";
import { getLoginUser } from "./auth-service";
import User from "./database/models/user.models";
import Blocked from "./database/models/block.models";
import StreamData from "./database/models/streamData.models";

// export const getRecommended = async () => {
//     // Ensure database connection
//     await connectToDatabase();

//     try {
//         // Get the currently logged-in user
//         const loggedInUser = await getLoginUser();

//         if (!loggedInUser) {
//             // If no logged-in user, fetch all users and return
//             const users = await User.find().sort({ createdAt: -1 });
//             return users;
//         }

//         console.log('logged in userdata', loggedInUser);


//         // Populate the streamData field in the loggedInUser document
//         try {
//             await connectToDatabase();
            
//             // Check if loggedInUser exists and has a valid _id
//             if (loggedInUser && loggedInUser._id) {
//                 // Populate the streamData field
//                 const userWithStreamData = await User.findById(loggedInUser._id).populate('streamData');
                
//                 if (userWithStreamData) {
//                     // Check if streamData exists within userWithStreamData
//                     if (userWithStreamData.streamData) {
//                         // Ensure isLive is treated as a boolean
//                         const isLive = !!userWithStreamData.streamData.isLive;
                        
//                         console.log(isLive);
//                     } else {
//                         console.log("streamData is undefined");
//                     }
//                 } else {
//                     console.log('User not found');
//                 }
//             } else {
//                 console.log('Invalid loggedInUser');
//             }
//         } catch (error) {
//             console.log('Error fetching user stream data:', error);
//         }
        
        
        

//         // Get the IDs of all users followed by the logged-in user
//         const followedUserIds = loggedInUser.following;
//         console.log('followed user id', followedUserIds);

//         // Get the IDs of all blocked users by the logged-in user
//         const blockedUserIds = loggedInUser.blockedBy;
//         console.log('blockedUserIds user id', blockedUserIds);

//         // Combine followedUserIds and blockedUserIds into one array to exclude them from recommended users
//         const excludedUserIds = [...followedUserIds,  ];

//         // Fetch the list of recommended users excluding the logged-in user, followed users, and blocked users
//         const recommendedUsers = await User.find({
//             _id: { $ne: loggedInUser._id, $nin: excludedUserIds }
//         }).sort({ createdAt: -1 });

//         return recommendedUsers;
//     } catch (error) {
//         // Handle error
//         console.error("Error fetching recommended users:", error);
//         throw error; // Re-throw error for global error handling
//     }
// };


export const getRecommended = async () => {
    // Ensure database connection
    await connectToDatabase();

    try {
        // Get the currently logged-in user
        const loggedInUser = await getLoginUser();

        if (!loggedInUser) {
            // If no logged-in user, fetch all users and return
            const users = await User.find().sort({ createdAt: -1 });
            return users;
        }

        console.log('logged in userdata', loggedInUser);

        // Populate the streamData field in the loggedInUser document
        // try {
        //     // Check if loggedInUser exists and has a valid _id
        //     if (loggedInUser && loggedInUser._id) {
        //         // Populate the streamData field
        //         const userWithStreamData = await User.findById(loggedInUser._id).populate('streamData');
                
        //         if (userWithStreamData) {
        //             // Check if streamData exists within userWithStreamData
        //             if (userWithStreamData.streamData) {
        //                 // Ensure isLive is treated as a boolean
        //                 const isLive = !!userWithStreamData.streamData.isLive;
                        
        //                 loggedInUser.streamData = { isLive }; // Attach isLive to streamData of loggedInUser
                    
        //                 console.log(isLive)
        //             } else {
        //                 console.log("streamData is undefined");
        //             }
        //         } else {
        //             console.log('User not found');
        //         }
        //     } else {
        //         console.log('Invalid loggedInUser');
        //     }
        // } catch (error) {
        //     console.log('Error fetching user stream data:', error);
        // }
        
        // Get the IDs of all users followed by the logged-in user
        const followedUserIds = loggedInUser.following;
        console.log('followed user id', followedUserIds);

        // Get the IDs of all blocked users by the logged-in user
        const blockedUserIds = loggedInUser.blockedBy;
        console.log('blockedUserIds user id', blockedUserIds);

        // Combine followedUserIds and blockedUserIds into one array to exclude them from recommended users
        const excludedUserIds = [...followedUserIds,  ];

        // Fetch the list of recommended users excluding the logged-in user, followed users, and blocked users
        const recommendedUsers = await User.find({
            _id: { $ne: loggedInUser._id, $nin: excludedUserIds }
        }).sort({ createdAt: -1 });


        return recommendedUsers;
    } catch (error) {
        // Handle error
        console.error("Error fetching recommended users:", error);
        throw error; // Re-throw error for global error handling
    }
};


