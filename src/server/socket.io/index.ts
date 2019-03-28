import * as socketio from 'socket.io';
import { Db, ObjectID } from 'mongodb';
import { Server } from 'http';

interface Socket extends socketio.Socket {
    request: {
        session: {
            user: {
                email: string
            }
        }
    }
} 

const init = (server: Server, db: Db, sessionMiddleware: any) => {
    const io = socketio(server);
    let connectedUserEmails: string[] = [];

    // https://stackoverflow.com/questions/25532692/how-to-share-sessions-with-socket-io-1-x-and-express-4-x/25618636#25618636
    io.use((socket, next) => {
        sessionMiddleware(socket.request, socket.request.res, next);
    });
    // Make sure email is set on the session
    io.use((socket, next) => {
        if (socket.request.session.user.email) return next();
        next(new Error('Authentication error'));
    });
    io.on('connection', (socket: Socket) => {
        connectedUserEmails.push(socket.request.session.user.email);
        console.log('Connected users', connectedUserEmails);
        io.emit('connected users', connectedUserEmails.filter((value, index, self) => {
            return self.indexOf(value) === index;
        }));

        socket.on('disconnect', () => {
            connectedUserEmails.splice(connectedUserEmails.indexOf(socket.request.session.user.email), 1);
            io.emit('connected users', connectedUserEmails.filter((value, index, self) => {
                return self.indexOf(value) === index;
            }));
        });

        socket.on('message', (message: { text: string, channel: string }) => {
            console.log(message);
            db.collection('messages').insertOne(
                {channel: message.channel, text: message.text, userEmail: socket.request.session.user.email },
                (err, r) =>{
                    if (!err) {
                        io.emit('message', {
                            _id: r.insertedId,
                            userEmail: socket.request.session.user.email,
                            text: message.text,
                            channel: message.channel,
                            created: (new ObjectID(r.insertedId)).getTimestamp() });
                        return socket.emit('message received');
                    }
                        
                    return console.error(err);
                });
        });
    });
}

export default init;