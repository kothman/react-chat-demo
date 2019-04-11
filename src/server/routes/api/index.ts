const bcrypt = require('bcryptjs');

import { Collection } from 'mongodb';
import * as validator from 'validator';
import UserRoutes from './users';
import MessageRoutes from './messages';
import ChannelRoutes from './channels';
import {generate as shortid} from 'shortid';

import { App, Request, Response } from '../../../types/express';

export default function(app: App) {
    app.use(function(req: Request, res: Response, next: Function) {
        res.set('new-csrf-token', req.csrfToken());
        return next();
    });
    UserRoutes(app);
    MessageRoutes(app);
    ChannelRoutes(app);
    app.post('/api/v1/login', (req: Request, res: Response) => {
        if (validator.isEmpty(req.body.email) || validator.isEmpty(req.body.password)) {
            return res.status(400).json({ error: 'Please supply an email and password' });
        }
        if (!validator.isEmail(req.body.email)) {
            return res.status(400).json({error: 'Not a valid email address'});
        }
        req.authenticate(req.body.email, req.body.password, (user: any | boolean) => {
            if (!user)
                return res.status(401).json({error: 'Invalid email or password'});
            return res.json({
                success: true,
                email: req.session.user.email,
                role: req.session.user.role,
                name: req.session.user.name
            });
        })
    });
    app.post('/api/v1/register', function(req: Request, res: Response) {
        if (validator.isEmpty(req.body.email) || validator.isEmpty(req.body.password)) {
            return res.status(400).json({ error: 'Please supply an email and password' });
        }
        if (!validator.isEmail(req.body.email)) {
            return res.status(400).json({ error: 'Not a valid email address' });
        }
        let passwordHash = bcrypt.hashSync(req.body.password);
        let users: Collection = req.db.collection('users');

        users.findOne({email: req.body.email}).then((user: any) => {
            if (user !== null) {
                return res.status(401).json({error: 'Email address already in use'});
            }
            // If no users exist, the created user should be an admin (role: 'admin'), and
            // a widget document created.
            users.countDocuments().then((count) => {
                let role: string = 'user';
                if (count === 0) {
                    role = 'admin';
                    let widgets: Collection = req.db.collection('widgets');
                    // don't need to check short id since this should be the first widget created
                    widgets.insertOne({
                        shortId: shortid(),
                        domain: 'http://localhost:4000',
                    });
                }
                users.insertOne({
                    email: req.body.email,
                    password: passwordHash,
                    emailVerified: false,
                    role: role
                }, (err) => {
                    return res.json({ success: true });
                });
            })

            
        });
    });
    app.post('/api/v1/verifyEmail', function(req: Request, res: Response) {
        if (validator.isEmpty(req.body.key)) {
            return res.status(400).json({ error: 'Invalid request, no key supplied' });
        }
        let users: Collection = req.db.collection('users');
        //console.log(req.body.key, typeof req.body.key);
        users.findOneAndUpdate({ verifyKey: req.body.key }, { $set: {emailVerified: true, verifyKey: null}}, (err, result) => {
            if (err || !result) {
                console.log(err, result);
                return res.status(400).json({error: 'Invalid key'});
            }
            return res.status(200).json({success: true});
        });
    });
    app.get('/api/v1/logout', function(req: Request, res: Response) {
        req.logout();
        return res.json({success: true, message: 'logged out'});
    });
}