import {Schema, model, Document, Model} from 'mongoose';

export interface IMessage extends Document {
    channel: string,
    text: string,
    userEmail: string,
    createdAt: Date,
    updatedAt: Date,
}

const messageSchema: Schema = new Schema({
    channel: {
        type: String,
        required: true,
        // should validate to make sure channel already exists
    },
    text: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
        lowercase: true,
        // should validate to confirm that user exists
    }
});

const Message: Model<IMessage> = model('Message', messageSchema);
export default Message;