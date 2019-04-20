import {Schema, Document, Model, model} from 'mongoose';

export interface IChannel extends Document {
    name: string,
    createdAt: Date,
    updatedAt: Date,
}

const channelSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
    },
}, {
    timestamps: true
});

const Channel: Model<IChannel> = model('Channel', channelSchema);
export default Channel;