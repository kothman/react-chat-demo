import {isEmail, isEmpty} from 'validator';
import { Request, Response } from '../../types/express';
import User, { IUser, IUserModel } from '../models/User';
import {compareSync, hashSync} from 'bcryptjs';

export default {
    user: (req: Request, res: Response) => {
        res.send(req.user);
    },
    users: (req: Request, res: Response) => {
        return User.find({}).then((users: IUser[]) => {
            return res.status(200).json({success: true, users: users});
        }).catch((err: Error) => {
            console.error(err);
            return res.status(200).json({error: 'Something went wrong while retrieving users'});
        })
    },
    userByEmail: (req: Request, res: Response) => {
        if(!isEmail(req.params.user))
            return res.status(400).json({error: 'Please supply a valid email'});

        return User.findByEmail(req.params.user).exec().then((user: IUser) => {
            if (user !== null) {
                return res.status(200).json({
                    user: {
                        email: user.email,
                        _id: user._id,
                        name: user.name || '',

                    }
                });
            }
            return res.status(400).json({error: 'No user found with that email'});
            
        }).catch((err: Error) => {
            console.error(err);
            return res.status(500).json({error: 'Something went wrong trying to find the user'});
        });
    },
    updateEmail: (req: Request, res: Response) => {
        if(!isEmail(req.body.email))
            return res.status(400).json({ error: 'Not a valid email' });
        return User.countDocuments({email: req.body.email}).exec().then((count: number) => {
            if (count !== 0)
                return res.status(400).json({ error: 'Email address already in use' });
            return User.findByEmail(req.user.email).exec().then((user: IUser) => {
                user.email = req.body.email;
                user.save();
                req.issueNewToken(Object.assign({}, req.user, {email: req.body.email}));
                return res.status(200).json({ success: true });
            }).catch((err: Error) => {
                console.error(err);
                return res.status(500).json({ error: 'Something went wrong trying to fetch the user' });
            });
        });
    },
    updateName: (req: Request, res: Response) => {
        return User.findByEmail(req.user.email)
            .exec().then((user: IUser) => {
                user.name = req.body.name;
                user.save();
                req.issueNewToken(Object.assign({}, req.user, { name: req.body.name }));
                return res.status(200).json({success: true});
            }).catch((err: Error) => {
                console.error(err);
                return res.status(500).json({error: 'Something went wrong trying to update the user'});
        });
    },
    updatePassword: (req: Request, res: Response) => {
        if (isEmpty(req.body.newPass) || isEmpty(req.body.oldPass))
            return res.status(400).json({ error: 'Must supply the current and new password' });
        return User.findByEmail(req.user.email).exec().then((user: IUser) => {
            if (!compareSync(req.body.oldPass, user.password))
                return res.status(400).json({error: 'Current password is incorrect'});
            user.password = hashSync(req.body.newPass);
            user.save();
            return res.status(200).json({success: true});
        })
    },
    resetPassword: (req: Request, res: Response) => {
        return res.status(500).json({error: 'Not implemented'});
    },
}