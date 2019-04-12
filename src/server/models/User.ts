import {Schema, Document, model, Model, Error} from 'mongoose';
import {toLower} from 'lodash';

export interface IUser extends Document {
    name?: string,
    email: string,
    createdAt: Date,
    updatedAt: Date,
    password: string,
    role: 'admin' | 'user',

    findByEmail: (email: string, cb: (err: Error, user: IUser) => void)
};

const userSchema: Schema = new Schema({
    name: String,
    email: {
        required: true,
        type: String,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        lowercase: true,
        enum: ['admin', 'user']
    },
});

userSchema.statics.findByEmail = function(email: string, cb: (err: Error, user: IUser) => void) {
    return this.findOne({email: email}, cb);
}

const User: Model<IUser> = model<IUser>('User', userSchema);
export default User;