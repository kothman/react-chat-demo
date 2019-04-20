import {Schema, Document, model, Model, Error, DocumentQuery} from 'mongoose';
import {toLower} from 'lodash';

export interface IUser extends Document {
    name?: string,
    email: string,
    createdAt: Date,
    updatedAt: Date,
    password: string,
    role: 'admin' | 'user',

};

export interface IUserModel extends Model<IUser> {
    findByEmail: (email: string) => DocumentQuery<IUser, IUser>
}

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
}, {
    timestamps: true
});

userSchema.statics.findByEmail = function (email: string): DocumentQuery<IUser, IUser> {
    return this.findOne({email: email});
}

const User: IUserModel = model<IUser, IUserModel>('User', userSchema);
export default User;