import * as socketio from 'socket.io';
import { Server } from 'http';
import { Connection } from 'mongoose';
import Message, { IMessage } from '../models/Message';
import { Token } from '../../types/jwt';
import authorizedMiddleware from '../middleware/authorized';
import { authorize } from 'socketio-jwt';
const env = require('../../../env');

interface Socket extends socketio.Socket {
    jwt: Token
} 

const init = (server: Server, db: Connection, sessionMiddleware: any): socketio.Server => {
    const io: socketio.Server = socketio(server);
    let connectedUserEmails: string[] = [];

    io.use((socket, next) => {
        sessionMiddleware(socket.request, {}, next);
    });
    io.use((socket, next) => {
        // decode session token
        authorizedMiddleware(socket.request, {}, next);
    })
    io.use((socket, next) => {
        if (!socket.request.user)
            return socket.disconnect();
        next();
    })

    // set authorization for socket.io
    io.on('connection', (socket: Socket) => {
        connectedUserEmails.push(socket.request.user.email);
        console.log('Connected users', connectedUserEmails);
        io.emit('connected users', connectedUserEmails);

        socket.on('disconnect', () => {
            connectedUserEmails.splice(connectedUserEmails.indexOf(socket.request.user.email), 1);
            io.emit('connected users', connectedUserEmails);
        });

        socket.on('message', (message: { text: string, channel: string }) => {
            console.log(message);
            let m: IMessage = new Message({
                channel: message.channel,
                text: message.text,
                userEmail: socket.request.user.email
            });
            m.save().then((m: IMessage) => {
                io.emit('message', {
                    _id: m._id,
                    userEmail: m.userEmail,
                    text: m.text,
                    channel: m.channel,
                    created: m.createdAt
                });
                socket.emit('message received');
            }).catch((err: Error) => {
                console.error(err);
                socket.emit('message receive error', err);
            });
        });
    });
    return io;
}

export default init;