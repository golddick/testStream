import mongoose, { Schema, model, Document, models } from "mongoose";
import { IFollow } from "./follow.models";

export interface IUser extends Document {
    _id: string;
    clerkId: string;
    email: string;
    username: string;
    bio: string;
    firstName?: string;
    imageUrl: string;
    followers:mongoose.Types.ObjectId[];
    following: mongoose.Types.ObjectId[];
    blocked:string[];
    blockedBy:string[];
    streamData: string[];
}

const UserSchema = new Schema<IUser>({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    imageUrl: { type: String, required: true },
    bio: { type: String, default: "" }, // assuming bio can be empty
    followers: [{ type: mongoose.Types.ObjectId, ref: 'Follow',  default:false}], 
    following: [{ type: mongoose.Types.ObjectId, ref: 'Follow', default:false }], 
    blocked: [{ type: String, ref: 'Blocked', default: false }] ,
    blockedBy: [{ type:String, ref: 'Blocked', default: false }], 
    streamData: [{ type:Schema.Types.String, ref: 'StreamData'  }]
    
});

const User = models.User || model('User', UserSchema)


export default User;
