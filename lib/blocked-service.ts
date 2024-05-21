import { connectToDatabase } from "./database";
import { getLoginUser } from "./auth-service";
import User from "./database/models/user.models";
import Blocked, { IBlock } from "./database/models/block.models";

export const isBlockedByUser = async (_id: string) => {
    await connectToDatabase();
    try {
        const loggedInUser = await getLoginUser();

        if (!loggedInUser) {
            // throw new Error("User not found");
            console.log('no users')
        }

        const otherUser = await User.findById(_id);

        if (!otherUser) {
            throw new Error("User not found");
        }

        // if (otherUser._id.toString() === loggedInUser?._id) {
        //     throw new Error("You cannot block yourself");
        // }

        // Check if the user is already blocked
        const existingBlock = await Blocked.findOne({
            blockerId: otherUser._id.toString(),
            blockedId: loggedInUser?._id
        });

        return !!existingBlock


    } catch (error) {
        console.error("Error occurred while blocking user:", error);
        throw error;
    }
};



// export const blockUser = async (_id: string) => {
//     await connectToDatabase();
//     try {
//         const loggedInUser = await getLoginUser();

//         if (!loggedInUser) {
//             throw new Error("User not found");
//         }

//         const otherUser = await User.findById(_id);

//         if (!otherUser) {
//             throw new Error("User not found");
//         }

//         if (otherUser._id.toString() === loggedInUser._id) {
//             throw new Error("You cannot block yourself");
//         }

//         // Check if the user is already blocked
//         const existingBlock = await Blocked.findOne({
//             blockerId: otherUser._id.toString(),
//             blockedId: loggedInUser._id
//         });

//         if (existingBlock) {
//             throw new Error("User is already blocked");
//         }

//      // Update the Blocking array for the logged-in user
//      const updatedLoggedInUser = await User.findByIdAndUpdate(loggedInUser._id, { $addToSet: { Blocking: otherUser._id.toString() } }, { new: true });

//      // Update the followers array for the other user
//      const updatedOtherUser = await User.findByIdAndUpdate(otherUser._id.toString(), { $addToSet: { BlockedBy: loggedInUser._id } }, { new: true });
 


//         // Create a new block
//         const block = await Blocked.create({ 
//             blockerId: otherUser._id,
//              blockedId: loggedInUser._id });
//         return block;
//     } catch (error) {
//         console.error("Error occurred while blocking user:", error);
//         throw error;
//     }
// };


export const blockUser = async (_id: string) => {
    await connectToDatabase();
    try {
        const loggedInUser = await getLoginUser();

        if (!loggedInUser) {
            throw new Error("User not found");
        }

        const otherUser = await User.findById(_id);

        if (!otherUser) {
            throw new Error("User not found");
        }

        if (otherUser._id === loggedInUser._id) {
            throw new Error("You cannot block yourself");
        }

        // Check if the user is already blocked
        const existingBlock = await Blocked.findOne({
            blockerId: otherUser._id,
            blockedId: loggedInUser._id
        });

        if (existingBlock) {
            throw new Error("User is already blocked");
        }

        // Create a new block
        const block = await Blocked.create({ blockerId: otherUser._id.toString(), blockedId: loggedInUser._id });


        const updatedBlockedLoggedInUser = await User.findByIdAndUpdate(loggedInUser._id, { $addToSet: { blockedBy: otherUser._id.toString() } }, { new: true });

        // Update the blocked array for the other user
        const updatedBlockedOtherUser = await User.findByIdAndUpdate(otherUser._id.toString(), { $addToSet: { blocked: loggedInUser._id } }, { new: true });
    

        console.log('up he moiunt', updatedBlockedLoggedInUser)
        // // Push the newly created block into the other user's blocked array and save
        // otherUser.blocked.push(block._id);
        // await otherUser.save();

        // // Push the newly created block into the logged-in user's blockedBy array and save
        // loggedInUser.blockedBy.push(block._id);
        // await loggedInUser.save();

        return block;
    } catch (error) {
        console.error("Error occurred while blocking user:", error);
        throw error;
    }
};




export const unblockUser = async (_id: string) => {
    await connectToDatabase();
    try {
        const loggedInUser = await getLoginUser();

        if (!loggedInUser) { 
            throw new Error("User not found");
        }

        const otherUser = await User.findById(_id);

        if (!otherUser) {
            throw new Error("User not found");
        }

        if (otherUser._id === loggedInUser._id) {
            throw new Error("You cannot unblock yourself");
        }

        // Check if the user is already blocked
        const existingBlock = await Blocked.findOneAndDelete({
            blockerId: otherUser._id,
            blockedId: loggedInUser._id
        });

        if (!existingBlock) {
            throw new Error("User is not blocked");
        }

        return existingBlock;
    } catch (error) {
        console.error("Error occurred while unblocking user:", error);
        throw error;
    }
};
