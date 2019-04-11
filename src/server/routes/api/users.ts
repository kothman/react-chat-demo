import { Collection, MongoError } from 'mongodb';
import * as bcrypt from 'bcryptjs';
import * as validator from 'validator';

import authorizedMiddleware from '../../middleware/authorized';
import adminMiddleware from '../../middleware/admin';
import { App, Request, Response } from '../../../types/express';

export default function(app: App) {
    app.get('/api/v1/user*', authorizedMiddleware);
    app.get('/api/v1/user', function(req: Request, res: Response) {
        res.send(req.session.user);
    });
    app.get('/api/v1/users', (req: Request, res: Response) => {
        let usersColl: Collection = req.db.collection('users');
        let users: any[] = [];
        usersColl.find({}).forEach((userDoc) => {
            users.push({
                name: userDoc.name || '',
                email: userDoc.email,
                role: userDoc.role
            })
        }, (err: MongoError) => {
            if (err) {
                console.log(err)
                return res.status(500).json({error: 'Something went wrong retrieving users'});
            }
            return res.status(200).json({success: true, users: users});
        });
    });
    app.get('/api/v1/user/:user', function (req: Request, res: Response) {
        req.db.collection('users').findOne({email: req.params.user},
            (err: any, user: any) => {
                if (err)
                    return res.status(400).json({error: err});
                return res.json({user: {
                    email: user.email,
                    _id: user['_id'],
                    name: '',

                }})
            });
    });
    app.post('/api/v1/user/update/email', function (req: Request, res: Response) {
        if (!validator.isEmail(req.body.email))
            return res.status(400).json({error: 'Not a valid email'});
        let users: Collection = req.db.collection('users');
        return users.countDocuments({email: req.body.email}, (err: MongoError, count: number) => {
            if(err) {
                console.log(err);
                return res.status(500).json({error: 'Something went wrong counting users with email ' + req.body.email});
            }
            if (count !== 0)
                return res.status(400).json({error: 'Email address already in use'});
            users.updateOne({ email: req.session.user.email }, { $set: { email: req.body.email } }, (err, user) => {
                if (err || !user) {
                    console.log(err, user);
                    return res.status(500).json({ error: 'Something went wrong trying to update user\'s email' });
                }
                // session info generally only gets populated on login, so we need to modify it here (and for other user updates)
                req.session.user.email = req.body.email;
                return res.status(200).json({ success: true });
            });
        })
    });
    app.post('/api/v1/user/update/name', function (req: Request, res: Response) {
        let users: Collection = req.db.collection('users');
        users.updateOne({email: req.session.user.email}, {$set: {name: req.body.name}}, (err, user) => {
            if(err || !user) {
                console.log(err, user);
                return res.status(500).json({error: 'Something went wrong trying to update user\'s name'});
            }
            req.session.user.name = req.body.name;
            return res.status(200).json({success: true});
        });
    });
    app.post('/api/v1/user/update/password', function (req: Request, res: Response) {
        let users: Collection = req.db.collection('users');
        if (validator.isEmpty(req.body.newPass) || validator.isEmpty(req.body.oldPass))
            return res.status(400).json({error: 'Must supply the current and new password'});
        return users.findOne({email: req.session.user.email}, (err: MongoError, user) => {
            if (err || !user) {
                console.log(err);
                return res.status(500).json({error: 'Something went wrong trying to retrieve the logged in user'});
            }
            if (!bcrypt.compareSync(req.body.oldPass, user.password))
                return res.status(400).json({error: 'Invalid password'});
            users.updateOne({email: req.session.user.email}, {$set: {password: bcrypt.hashSync(req.body.newPass) }}, (err, user) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: 'Something went wrong trying to update the logged in user\'s password' });
                }
                return res.status(200).json({success: true});
            })
        });
    });
    app.post('/api/v1/user/reset_password', function (req: Request, res: Response) {

    });
    app.post('/api/v1/user/resend_email_verification')
}