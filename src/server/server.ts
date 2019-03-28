//import Models from './models/index.ts';

import * as http from 'http';
import * as express from 'express';
import * as session from 'express-session';
import * as path from 'path';
import { MongoClient, Db, Collection } from 'mongodb';
import * as bodyParser from 'body-parser';
import * as bcrypt from 'bcryptjs';
const MongoStore = require('connect-mongo')(session);

import Routes from './routes/index';
import websocket from './socket.io/index';
const env = require('../../env');

const app = express();
const port = process.env.production ? 80 : 3000;
console.log('port', port);

MongoClient.connect(env.mongodbConnectionUri, {useNewUrlParser: true}, function(err: Error, client: MongoClient) {
    if (err) return console.error(err);
    let db: Db = client.db();
    // add DB to each req via middleware
    app.use((req: any, res: any, next: Function) => {
        req.db = db;
        return next();
    });
    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: true }));
    //app.use(cors());
    const sessionMiddleware = session({
        secret: 'some secret',
        saveUninitialized: true,
        resave: false,
        cookie: {
            secure: false
        },
        store: new MongoStore({ db: db, collection: 'session' })
    });
    app.use(sessionMiddleware);
    // Setup local strategy for passport authentication
    app.use((req: any, res: any, next: Function) => {
        req.authenticate = (username: string, password: string, done: Function) => {
            let users: Collection = db.collection('users');
            users.findOne({ email: username }).then((user) => {
                if (user === null || !bcrypt.compareSync(password, user.password)) {
                    return done(false);
                }
                let sessionUser: any = {email: user.email};
                req.session.user = sessionUser;
                return done(sessionUser);
            });
        }
        req.logout = () => {
            req.session.user = null;
            req.session.destroy();
        }
        next();
    });

    Routes(app);
    // Serve static files from dist/public
    app.use(express.static(path.resolve(__dirname, '../../dist/public/')));
    // Display index.html if unknown path, and let React-Router handle the 404
    app.get('*', function (req: any, res: any) {
        res.sendFile(path.resolve(__dirname, '../../dist/public/index.html'));
    });

    const server = http.createServer(app);
    websocket(server, db, sessionMiddleware);
    server.listen(port, () => {
        console.log(`Listening on port ${port}!`);
    });
});
