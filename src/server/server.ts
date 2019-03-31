//import Models from './models/index.ts';

import * as http from 'http';
import * as express from 'express';
import * as session from 'express-session';
import * as path from 'path';
import { MongoClient, Db, Collection } from 'mongodb';
import * as bodyParser from 'body-parser';
import * as bcrypt from 'bcryptjs';
import * as csurf from 'csurf';
import * as helmet from 'helmet';
const MongoStore = require('connect-mongo')(session);
const mustacheExpress = require('mustache-express');

import Routes from './routes/index';
import websocket from './socket.io/index';
const env = require('../../env');

const app = express();
const port = process.env.PORT || 3000;
const csurfMiddleware = csurf();

app.engine('html', mustacheExpress());
app.set('view engine', 'html');

MongoClient.connect(env.mongodbConnectionUri, {useNewUrlParser: true}, function(err: Error, client: MongoClient) {
    if (err) return console.error(err);
    let db: Db = client.db();
    // add DB to each req via middleware
    app.use((req: any, res: any, next: Function) => {
        req.db = db;
        return next();
    });
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
    // Setup local strategy for passport authentication
    app.use((req: any, res: any, next: Function) => {
        req.authenticate = (username: string, password: string, done: Function) => {
            let users: Collection = db.collection('users');
            users.findOne({ email: username }).then((user) => {
                if (user === null || !bcrypt.compareSync(password, user.password)) {
                    return done(false);
                }
                let sessionUser: any = {
                    email: user.email,
                    emailVerified: user.emailVerified
                };
                req.session.user = sessionUser;
                return done(sessionUser);
            });
        }
        req.logout = () => {
            req.session.user = null;
        }
        next();
    });

    Routes(app);

    app.get('/', function (req: any, res: any) {
        res.render(
            path.resolve(__dirname, '../../dist/public/index.html'),
            { csrfToken: req.csrfToken() }
        );
    });
    // Serve static files from dist/public
    app.use(express.static(path.resolve(__dirname, '../../dist/public/')));
    // Display index.html if unknown path, and let React-Router handle the 404
    app.get('*', function (req: any, res: any) {
        res.render(
            path.resolve(__dirname, '../../dist/public/index.html'),
            {csrfToken: req.csrfToken()}    
        );
    });

    const server = http.createServer(app);
    websocket(server, db, sessionMiddleware);
    server.listen(port, () => {
        console.log(`Listening on port ${port}!`);
    });
});
