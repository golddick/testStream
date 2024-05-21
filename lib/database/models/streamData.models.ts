import { Schema, model, Document, models } from "mongoose";

export interface IStreamProps extends Document {
    _id:String,
    name: string;
    thumbnailUrl: string ;

    ingressId: String;
    serverUrl: String ;
    streamKey: String ;
    

    isLive: boolean;
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;

    createdAt: Date;
    updatedAt: Date;
}

const StreamUserSchema = new Schema<IStreamProps>({
    _id: { type: String, ref: 'User', required: true },
    name: { type: String, unique: true },
    thumbnailUrl: { type: String,  unique: true  , default:''},

    ingressId: { type: String, unique: true ,default:'' },
    serverUrl: { type: String,default:'' },
    streamKey: { type: String, default:''},

    isLive: { type: Boolean, default: false },
    isChatEnabled: { type: Boolean, default:true }, 
    isChatDelayed: { type: Boolean,  default: false }, 
    isChatFollowersOnly: { type: Boolean,  default: false } ,


    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }

});

const StreamData = models.StreamData || model('StreamData', StreamUserSchema);

export default StreamData;
