import mongoose, { Schema, model, Document, models } from "mongoose";


export interface IBlock extends Document {
    blockerId:string;
    blockedId: string;
}

const BlockedSchema = new Schema<IBlock>({
    blockerId: { type: String, ref: 'User',  },
    blockedId: { type:  String, ref: 'User',},
});

const Blocked = models.Blocked || model('Blocked', BlockedSchema);

export default Blocked;
