const bcrypt = require('bcryptjs');

import { Collection } from 'mongodb';
import * as validator from 'validator';
import UserRoutes from './users';
import MessageRoutes from './messages';
import ChannelRoutes from './channels';
import * as crypto from 'crypto';
const env = require('../../../../env.js')
const mailgun = require('mailgun-js')({ apiKey: env.mailgunApiKey, domain: env.mailgunDomain });;

export default function(app: any) {
    app.use(function(req: any, res: any, next: Function) {
        res.set('new-csrf-token', req.csrfToken());
        return next();
    });
    UserRoutes(app);
    MessageRoutes(app);
    ChannelRoutes(app);
    app.post('/api/v1/login', (req: any, res: any) => {
        if (validator.isEmpty(req.body.email) || validator.isEmpty(req.body.password)) {
            return res.status(400).json({ error: 'Please supply an email and password' });
        }
        if (!validator.isEmail(req.body.email)) {
            return res.status(400).json({error: 'Not a valid email address'});
        }
        req.authenticate(req.body.email, req.body.password, (user: any | boolean) => {
            console.log(user);
            if (!user)
                return res.status(401).json({error: 'Invalid email or password'});
            if (!user.emailVerified) {
                return res.status(400).json({ error: 'Email not verified' });
            }
            return res.json({ success: true, email: req.session.user.email });
        })
    });
    app.post('/api/v1/register', function(req: any, res: any) {
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
            let verifyKey: string = crypto.randomBytes(48).toString('hex');
            users.insertOne(
                {
                    email: req.body.email,
                    password: passwordHash,
                    emailVerified: false,
                    verifyKey: verifyKey
                }, (err) => {
                    let emailHtml: string = '<a href="';
                    // BASE_URL should not have trailing slash
                    emailHtml += process.env.BASE_URL ? process.env.BASE_URL : 'http://localhost:3000';
                    emailHtml += '/verifyEmail/' + verifyKey + '">Click here</a> to verify your email address.';
                    mailgun.messages().send({
                        to: req.body.email,
                        from: process.env.FROM_EMAIL ? process.env.FROM_EMAIL : 'adrian@sandbox3786eaf2000b4a839664faae2fb3faf5.mailgun.org',
                        subject: 'Verify your email address',
                        html: emailHtml
                    }, (err: any) => {
                        if (err) console.log(err);
                    });
                    return res.json({ success: true });
            });
        });
    });
    app.post('/api/v1/verifyEmail', function(req: any, res: any) {
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
    app.get('/api/v1/logout', function(req: any, res: any) {
        req.logout();
        return res.json({success: true, message: 'logged out'});
    });
}