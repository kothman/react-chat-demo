const bcrypt = require('bcryptjs');

import { Collection } from 'mongodb';
import passport = require('passport');
import UserRoutes from './users';
import MessageRoutes from './messages';
import ChannelRoutes from './channels';

export default function(app: any) {
    UserRoutes(app);
    MessageRoutes(app);
    ChannelRoutes(app);
    app.post('/api/v1/login', (req: any, res: any) => {
        return req.authenticate(req.body.email, req.body.password, (user: Object | boolean) => {
            console.log(user);
            if (!user)
                return res.status(401).json({error: 'Invalid email or password'});
            return res.json({ success: true, email: req.session.user.email });
        })
    });
    app.post('/api/v1/register', function(req: any, res: any) {
        let passwordHash = bcrypt.hashSync(req.body.password);
        let users: Collection = req.db.collection('users');
        users.findOne({email: req.body.email}).then((user: any) => {
            if (user !== null) {
                return res.status(401).json({error: 'Email address already in use'});
            }
            users.insertOne({email: req.body.email, password: passwordHash}, (err) => {
                if (err) return res.status(500).json({ error: 'Something went wrong trying to log in after creating a user'});
                return req.authenticate(req.body.email, req.body.password, (user: Object | boolean) => {
                    console.log(user);
                    if (!user)
                        return res.status(401).json({ error: 'Invalid email or password' });
                    return res.json({ success: true, email: req.session.user.email });
                })
            });
        });
    });
    app.get('/api/v1/logout', function(req: any, res: any) {
        req.logout();
        return res.json({success: true, message: 'logged out'});
    });
}