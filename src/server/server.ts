//import Models from './models/index.ts';

import * as http from 'http';
import * as express from 'express';
import * as session from 'express-session';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as bcrypt from 'bcryptjs';
import * as csurf from 'csurf';
import * as helmet from 'helmet';
const MongoStore = require('connect-mongo')(session);
const mustacheExpress = require('mustache-express');

import Routes from './routes/index';
import websocket from './socket.io/index';
import { App, Request, Response } from '../types/express';
const env = require('../../env');

const app: App = express();
const port: string | number = process.env.PORT || 3000;
const csurfMiddleware: express.RequestHandler = csurf();

app.engine('html', mustacheExpress());
app.set('view engine', 'html');

mongoose.connect(env.mongodbConnectionUri, { useNewUrlParser: true });
mongoose.connection.on('error', function(err) {
    console.error('Mongoose connection error', err);
});
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
}); 
mongoose.connection.on('connected', function () {
    // add DB to every express request
    let db: mongoose.Connection = mongoose.connection;
    app.use((req: Request, res: Response, next: Function) => {
        req.db = db;
        return next();
    })
    const sessionMiddleware = session({
        secret: 'some secret',
        saveUninitialized: true,
        resave: false,
        cookie: {
            secure: false
        },
        store: new MongoStore({ db: db, collection: 'session' })
    });
    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: true }));
    //app.use(cors());
    app.use(sessionMiddleware);
    app.use(csurfMiddleware);
    app.use(helmet());

    app.use((req: Request, res: Response, next: Function) => {
        req.authenticate = (username: string, password: string, done: Function) => {
            let users: Collection = db.collection('users');
            users.findOne({ email: username }).then((user) => {
                if (user === null || !bcrypt.compareSync(password, user.password)) {
                    return done(false);
                }
                let userDetails: any = {
                    email: user.email,
                    name: user.name,
                    role: user.role
                };
                req.session.user = userDetails;
                return done(userDetails);
            });
        }
        req.logout = () => {
            req.session.user = null;
        }
        next();
    });

    Routes(app);

    app.get('/', function (req: Request, res: Response) {
        res.render(
            path.resolve(__dirname, '../../dist/public/index.html'),
            { csrfToken: req.csrfToken() }
        );
    });
    // Serve static files from dist/public
    app.use(express.static(path.resolve(__dirname, '../../dist/public/')));
    // Display index.html if unknown path, and let React-Router handle the 404
    app.get('*', function (req: Request, res: Response) {
        res.render(
            path.resolve(__dirname, '../../dist/public/index.html'),
            { csrfToken: req.csrfToken() }
        );
    });

    const server: http.Server = http.createServer(app);
    websocket(server, db, sessionMiddleware);
    server.listen(port, () => {
        console.log(`Listening on port ${port}!`);
    });
});

export default app;