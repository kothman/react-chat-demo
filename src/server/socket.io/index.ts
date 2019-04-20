import * as socketio from 'socket.io';
import { Server } from 'http';
import { Connection } from 'mongoose';
import {authorize as authorizeJwt} from 'socketio-jwt';
import Message, { IMessage } from '../models/Message';
import { Token } from '../../types/jwt';
const env = require('../../../env');

interface Socket extends socketio.Socket {
    jwt: Token
} 

const init = (server: Server, db: Connection): socketio.Server => {
    const io: socketio.Server = socketio(server);
    let connectedUserEmails: string[] = [];

    // set authorization for socket.io
    io.on('connection', authorizeJwt({
            secret: env.secret,
            timeout: 15000, // 15 seconds to send the authentication message
            decodedPropertyName: 'jwt'
        })).on('authenticated', (socket: Socket) => {

            connectedUserEmails.push(socket.jwt.email);
            console.log('Connected users', connectedUserEmails);
            io.emit('connected users', connectedUserEmails.filter((value, index, self) => {
                return self.indexOf(value) === index;
            }));

            socket.on('disconnect', () => {
                connectedUserEmails.splice(connectedUserEmails.indexOf(socket.jwt.email), 1);
                io.emit('connected users', connectedUserEmails.filter((value, index, self) => {
                    return self.indexOf(value) === index;
                }));
            });

            socket.on('message', (message: { text: string, channel: string }) => {
                console.log(message);
                let m: IMessage = new Message({
                    channel: message.channel,
                    text: message.text,
                    userEmail: socket.jwt.email
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