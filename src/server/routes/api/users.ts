import authorizedMiddleware from '../../middleware/authorized';
import api from '.';
import { Db } from 'mongodb';

export default function(app: any) {
    app.get('/api/v1/user*', authorizedMiddleware);
    app.get('/api/v1/user', function(req: any, res: any) {
        res.send(req.session.user);
    });
    app.get('/api/v1/user/:user', function(req: any, res: any) {
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
    app.post('/api/v1/user/update/email', function(req: any, res: any) {

    });
    app.post('/api/v1/user/update/name', function (req: any, res: any) {

    });
    app.post('/api/v1/user/update/email', function (req: any, res: any) {

    });
    app.post('/api/v1/user/reset_password', function(req: any, res: any) {

    });
    app.post('/api/v1/user/resend_email_verification')
}