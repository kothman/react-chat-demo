import { isEmail, isEmpty } from 'validator';
import { hashSync } from 'bcryptjs';
import {Request, Response} from '../../types/express';
import User, { IUser } from '../models/User';
const env = require('../../../env');

export default {
    login: (req: Request, res: Response) => {
        if (isEmpty(req.body.email || '') || isEmpty(req.body.password || '')) {
            return res.status(400).json({ error: 'Please supply an email and password' }).end();
        }
        if (!isEmail(req.body.email)) {
            return res.status(400).json({ error: 'Not a valid email address' }).end();
        }
        req.authenticate(req.body.email, req.body.password, (user: any | boolean) => {
            if (!user)
                return res.status(401).json({ error: 'Invalid email or password' }).end();
            req.issueNewToken(user);
            return res.status(200)
                .json({
                    success: true,
                    email: user.email,
                    role: user.role,
                    name: user.name}).end();
        });
    },
    register: (req: Request, res: Response) => {
        if (isEmpty(req.body.email || '') || isEmpty(req.body.password || '')) {
            return res.status(400).json({ error: 'Please supply an email and password' });
        }
        if (!isEmail(req.body.email)) {
            return res.status(400).json({ error: 'Not a valid email address' });
        }
        return User.findByEmail(req.body.email).countDocuments().exec().then((count: number) => {
            if (count !== 0)
                return res.status(400).json({error: 'Email address in use'});
            let passwordHash = hashSync(req.body.password);
            // If this is the first user being created, asign role of admin
            User.countDocuments().exec().then((count: number) => {
                let role = 'user';
                if (count === 0)
                    role = 'admin';
                let user = new User({
                    name: '',
                    email: req.body.email,
                    password: passwordHash,
                    role: role,
                    emailVerified: false,
                });
                user.save().then((u: IUser) => {
                    return res.status(200).json({success: true});
                }).catch((err: Error) => {
                    console.error(err);
                    return res.status(500).json({error: 'Something went wrong trying to create a new user'});
                });
            })
        });

    },
    logout: (req: Request, res: Response) => {
        req.logout();
        return res.json({success: true, message: 'logged out'});
    },
    verifyEmail: (req: Request, res: Response) => {
    }
}