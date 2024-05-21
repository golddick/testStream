

import { connectToDatabase } from "./database";
import { getLoginUser } from "./auth-service";
import User from "./database/models/user.models";
import Follow from "./database/models/follow.models";


export const isFollowingUser = async (_id: string) => {
    await connectToDatabase();
    try {
        const loggedInUser = await getLoginUser();

        const otherUser = await User.findById(_id);

        console.log('other following users a', otherUser);

        if (!otherUser) {
            throw new Error("User not found");
        }

        if (otherUser._id.toString() === loggedInUser._id.toString()) {
            return false;
        }

        const existingFollow = await Follow.findOne({
            followerId: loggedInUser._id,
            followingId: otherUser._id
        });

        return !!existingFollow;
    } catch (error) {
        console.error("Error in isFollowingUser:", error); // Log the error
        return false;
    }
};



export const followUser = async (_id: string) => {
    await connectToDatabase();
    const loggedInUser = await getLoginUser();

    console.log('logged in user:', loggedInUser);

    const otherUser = await User.findById(_id)


    if (!otherUser) {
        throw new Error("User not found");
    }

    if (otherUser._id.toString() === loggedInUser._id.toString()) {
        throw new Error("You cannot follow yourself");
    }

    const existingFollow = await Follow.findOne({
        followerId: loggedInUser._id,
        followingId: otherUser._id.toString()
    });

    if (existingFollow) {
        throw new Error("You are already following this user");
    }

     // Update the following array for the logged-in user
     const updatedLoggedInUser = await User.findByIdAndUpdate(loggedInUser._id, { $addToSet: { following: otherUser._id.toString() } }, { new: true });

     // Update the followers array for the other user
     const updatedOtherUser = await User.findByIdAndUpdate(otherUser._id.toString(), { $addToSet: { followers: loggedInUser._id } }, { new: true });
 

 

    const follow = await Follow.create({
        followerId: `${loggedInUser._id}`,
        followingId:  otherUser._id.toString()
    });

    return follow;
}



export const unFollowUser = async (_id: string) => {
    await connectToDatabase();
    const loggedInUser = await getLoginUser();

    console.log('logged in user:', loggedInUser);

    const otherUser = await User.findById(_id);

    if (!otherUser) {
        throw new Error("User not found");
    }

    if (otherUser._id.toString() === loggedInUser._id.toString()) {
        throw new Error("You cannot unfollow yourself");
    }

    const existingFollow = await Follow.findOne({
        followerId: loggedInUser._id.toString(),
        followingId: otherUser._id.toString()
    });

    if (!existingFollow) {
        throw new Error("You are not following this user");
    }

    // Remove the other user from the following array of the logged-in user
    const updatedLoggedInUser = await User.findByIdAndUpdate(loggedInUser._id, { $pull: { following: otherUser._id } }, { new: true });

    // Remove the logged-in user from the followers array of the other user
    const updatedOtherUser = await User.findByIdAndUpdate(otherUser._id, { $pull: { followers: loggedInUser._id } }, { new: true });

    // Remove the follow document
    await Follow.findByIdAndDelete(existingFollow._id.toString());

    return { updatedLoggedInUser, updatedOtherUser };
}


export const getFollowedUsers = async (_id: string)  => {
    await connectToDatabase();
    try {
        const loggedInUser = await getLoginUser();

        if (!loggedInUser) {
            throw new Error("User not found");
        }

            // Get the list of users the logged-in user is following
    const followedUsers = await User.find({ _id: { $in: loggedInUser.following } });
        
    return followedUsers;
    } catch (error) {
        console.error("Error occurred while getting followed users:", error);

        return[]
    }
}


