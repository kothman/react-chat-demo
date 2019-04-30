import * as path from 'path';
import { App, Request, Response } from '../types/express';
import authorized from './middleware/authorized';
import admin from './middleware/admin';
import authController from './controllers/authController';
import userController from './controllers/userController';
import messageController from './controllers/messageController';
import channelController from './controllers/channelController';

export default function(app: App) {

    /* Static Routes */
    app.get('/', function (req: Request, res: Response) {
        return res.render(
            path.resolve(__dirname, '../../dist/public/index.html'),
            { csrfToken: req.csrfToken() }
        );
    });
    /* Widget rendered inside iframe via widget-embed script */
    app.get('/widget', function (req: any, res: any) {
        return res.render(
            path.resolve(__dirname, '../../../dist/public/widget/index.html')
        );
    });
    /* Page demoing embedded widget */
    app.get('/widget/demo', function (req: any, res: any) {
        return res.render(
            path.resolve(__dirname, '../../../dist/public/widget/demo.html')
        );
    });
    
    /* API Routes */
    
    app.post('/api/v1/login', authController.login);
    app.post('/api/v1/register', authController.register);
    app.get('/api/v1/logout', authController.logout);
    app.get('/api/v1/verifyEmail/:id', authController.verifyEmail);

    app.use('/api/v1/user*', authorized);
    app.get('/api/v1/user', userController.user);
    app.get('/api/v1/users', userController.users)
    app.get('/api/v1/user/:user', userController.userByEmail);
    app.post('/api/v1/user/update/email', userController.updateEmail);
    app.post('/api/v1/user/update/name', userController.updateName);
    app.post('/api/v1/user/update/password', userController.updatePassword);
    app.post('/api/v1/user/reset_password', userController.resetPassword);
    app.post('/api/v1/user/create', admin, userController.createUser);
    app.put('/api/v1/user/update', admin, userController.editUser);
    app.delete('/api/v1/user/delete', admin, userController.deleteUser);
    app.put('/api/v1/user/restore', admin, userController.restoreUser);

    app.use('/api/v1/message*', authorized);
    app.get('/api/v1/messages/:channel/:offset', messageController.messages);

    app.use('/api/v1/channel', authorized);
    app.get('/api/v1/channels', channelController.channels);
    app.post('/api/v1/channels/delete', admin, channelController.delete);
    app.post('/api/v1/channels/create', admin, channelController.create);

    /* Display index.html if unknown path, and let React-Router handle the 404 */
    app.get('*', function (req: Request, res: Response) {
        return res.render(
            path.resolve(__dirname, '../../dist/public/index.html'),
            { csrfToken: req.csrfToken() }
        );
    });
}