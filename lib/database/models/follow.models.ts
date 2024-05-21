import { Schema, model, Document, models } from "mongoose";

export interface IFollow extends Document {
    followerId: String;
    followingId: String;
    createdAt: Date;
    updatedAt: Date;
}

const FollowUserSchema = new Schema<IFollow>({
    followerId: { type: String , ref: 'User', required: true },
    followingId: { type: String, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Follow = models.Follow || model('Follow', FollowUserSchema);

export default Follow;
