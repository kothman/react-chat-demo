//import Models from './models/index.ts';

import * as http from 'http';
import * as express from 'express';
import * as path from 'path';
import * as socketio from 'socket.io';
import * as mongoose from 'mongoose';
import * as csrf from 'csurf';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as bcrypt from 'bcryptjs';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as compression from 'compression';
import { sign } from 'jsonwebtoken';
const mustacheExpress = require('mustache-express');
const MongoStore = require('connect-mongo')(session);

import Routes from './routes';
import websocket from './socket.io/index';
import { App, Request, Response } from '../types/express';
import User, { IUser } from './models/User';
const env = require('../../env');

const app: App = express();
const port: string | number = env.port;
let server: http.Server;
let socketServer: socketio.Server;

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
//app.use(morgan('combined'));
app.use(compression());

const sessionMiddleware = session({
    secret: env.secret,
    // need this for heroku
    proxy: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        sameSite: true,
        secure: env.production,
        httpOnly: true,
    },
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
});

const csrfMiddleware = csrf({
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        sameSite: true,
        secure: env.production,
        httpOnly: true,
        key: '_csrf'
    }
})

mongoose.connect(env.useTestDb ? env.mongodbTestConnectionUri : env.mongodbConnectionUri, { useNewUrlParser: true });
mongoose.connection.on('error', function(err) {
    console.error('Mongoose connection error', err);
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        server.close(() => {
            process.exit(0);
        });
    });
}); 

app.use(sessionMiddleware);
app.use(cookieParser(env.secret));

if(env.disableCsrf) {
    console.log('CSRF disabled');
    app.use((req, res, next) => { 
        req.csrfToken = function () { return '' }
        return next();
    });
} else {
    app.use(csrfMiddleware);
}
// add DB to every express request
let db: mongoose.Connection = mongoose.connection;
app.use((req: Request, res: Response, next: Function) => {
    req.db = db;
    return next();
})
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cors());


app.use(helmet());
/* Serve static files from dist/public */
app.use(express.static(path.resolve(__dirname, '../../dist/public/')));

app.use('/api', function (req: Request, res: Response, next: Function) {
    //res.setHeader('new-csrf-token', req.csrfToken())
    return next();
});
app.use((req: Request, res: Response, next: Function) => {
    req.authenticate = (email: string,
                        password: string,
                        done: (user: boolean | IUser, err: (null | Error)) => void) => {
        User.findByEmail(email).then((user: IUser) => {
            if (user === null) return done(false, null);
            if (!bcrypt.compareSync(password, user.password)) return done(false, new Error('Invalid password'));
            let userDetails: any = {
                email: user.email,
                name: user.name,
                role: user.role,
            }
            return done(userDetails, null);
        }).catch((err: Error) => {
            done(false, err);
        });
    }
    req.logout = () => {
        req.session.token = null;
    }
    req.issueNewToken = (user: IUser) => {
        let token: string = sign({
            name: user.name,
            role: user.role,
            email: user.email
        }, env.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.setHeader('x-access-token', token);
        req.session.token = token;
    }
    next();
});

Routes(app);
server = http.createServer(app);
server.on('error', (err: Error) => {
    console.error(err);
    server.close();
})

if (!env.disableAutoStart) {
    socketServer = websocket(server, db, sessionMiddleware);
    mongoose.connection.on('connected', function () {
        console.log('Connected to MongoDB via Mongoose');
        server.listen(port, () => {
            console.log(`Listening on port ${port}!`);
            app.emit('server started');
        });
    });
}

export default server;
export const conn = mongoose.connection;
export { app, socketServer };