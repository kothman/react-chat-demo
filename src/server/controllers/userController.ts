import {isEmail, isEmpty} from 'validator';
import { Request, Response } from '../../types/express';
import User, { IUser, IUserModel } from '../models/User';
import {compareSync, hashSync} from 'bcryptjs';

export default {
    user: (req: Request, res: Response) => {
        res.send(req.user);
    },
    users: (req: Request, res: Response) => {
        return User.find({}).select('name email role deleted').then((users: IUser[]) => {
            return res.status(200).json({success: true, users: users});
        }).catch((err: Error) => {
            console.error(err);
            return res.status(500).json({error: 'Something went wrong while retrieving users'});
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
                        role: user.role,
                        created: user.createdAt
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
    /**
     * POST /api/v1/user/create
     * req.body.email: string
     * req.body.name?: string,
     * req.body.role: string
     */
    createUser: (req: Request, res: Response) => {
        if(isEmpty(req.body.email) || !isEmail(req.body.email) ||
           isEmpty(req.body.role) || (req.body.role !== 'user' && req.body.role !== 'admin'))
            return res.status(400).json({ error: 'Must supply valid email and role'});
        return User.findByEmail(req.body.email).countDocuments((err: any, c: number) => {
            if (err) {
                console.error('Something went wrong trying to count users with email ' + req.body.email, err);
                return res.status(500).json({error: 'Something went wrong'});
            }
            if (c !== 0)
                return res.status(400).json({error: 'Email address in use'});
            let u = new User({
                email: req.body.email,
                name: req.body.name || '',
                role: req.body.role,
                // @todo send password reset link to new user
                password: 'temp',
            })
            return u.save((err: any, u: IUser) => {
                if (err) {
                    console.error('Something went wrong trying to save user', err);
                    return res.status(500).json({ error: 'Something went wrong' });
                }
                return res.status(200).json({success: true});
            });

        })
    },
    /**
     * PUT /api/v1/user/update
     * @param req.body.email: string
     * @param req.body.user: {
     *  email?: string,
     *  name?: string,
     *  role?: string,
     * }
     */
    editUser: (req: Request, res: Response) => {
        if (!req.body.email || !isEmail(req.body.email))
            return res.status(400).json({error: 'Please supply a valid email'});
        if (req.body.user.email && !isEmail(req.body.user.email))
            return res.status(400).json({ error: 'Please supply a valid email' });
        if (req.body.user.role && !isEmpty(req.body.user.role) && (req.body.user.role !== 'user' && req.body.user.role !== 'admin'))
            return res.status(400).json({error: 'Invalid role'});
        return User.findByEmail(req.body.email).exec((err: any, user: IUser) => {
            if (err) {
                console.log('Something went wrong', err);
                return res.status(500).json({error: 'Something went wrong'});
            }
            if (!user) {
                return res.status(404).json({error: 'User does not exist'});
            }
            if (req.body.user.email)
                user.email = req.body.user.email;
            if (req.body.user.name)
                user.name = req.body.user.name;
            if (req.body.user.role)
                user.role = req.body.user.role;
            return user.save((err: any, user: IUser) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({error: 'Something went wrong'});
                }
                return res.status(200).json({success: true});
            });
        });
    },
    deleteUser: (req: Request, res: Response) => {
        if (!req.body.email || !isEmail(req.body.email))
            return res.status(400).json({error: 'Invalid data for parameter "email"'});
        return User.findByEmail(req.body.email).exec((err: any, user: IUser) => {
            if (err) {
                console.log('Something went wrong', err);
                return res.status(500).json({error: 'Something went wrong'});
            }
            if (!user)
                return res.status(404).json({error: 'User does not exist'});
            if (user.deleted)
                return res.status(400).json({error: 'User already deleted'});
            if (req.user.email === req.body.email)
                return res.status(400).json({error: 'Cannot delete current user'});
            user.deleted = true;
            return user.save((err: any) => {
                return res.status(200).json({success: true});
            });
        });
    },
    restoreUser: (req: Request, res: Response) => {
        if (!req.body.email || !isEmail(req.body.email))
            return res.status(400).json({ error: 'Invalid data for parameter "email"' });
        return User.findByEmail(req.body.email).exec((err: any, user: IUser) => {
            if (err) {
                console.log('Something went wrong', err);
                return res.status(500).json({ error: 'Something went wrong' });
            }
            if (!user)
                return res.status(404).json({ error: 'User does not exist' });
            if (!user.deleted)
                return res.status(400).json({ error: 'User already active' });
                user.deleted = false;
            return user.save((err: any) => {
                return res.status(200).json({ success: true });
            });
        });
    }
}