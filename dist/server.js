/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/server.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./env.js":
/*!****************!*\
  !*** ./env.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
    // https://docs.mongodb.com/manual/reference/connection-string/
    mongodbConnectionUri: process.env.MONGODB_URI,
    mailgunApiKey: process.env.MAILGUN_API_KEY,
    mailgunDomain: process.env.MAILGUN_DOMAIN,
    baseUrl: process.env.BASE_URL ? process.env.BASE_URL : 'http://localhost:5000'
}


/***/ }),

/***/ "./src/server/middleware/admin.ts":
/*!****************************************!*\
  !*** ./src/server/middleware/admin.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function default_1(req, res, next) {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    return res.status(401).json({ error: 'Not authorized as admin' });
}
exports["default"] = default_1;


/***/ }),

/***/ "./src/server/middleware/authorized.ts":
/*!*********************************************!*\
  !*** ./src/server/middleware/authorized.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function default_1(req, res, next) {
    if (req.session.user) {
        return next();
    }
    return res.status(401).json({ error: 'Not authorized' });
}
exports["default"] = default_1;


/***/ }),

/***/ "./src/server/routes/api/channels.ts":
/*!*******************************************!*\
  !*** ./src/server/routes/api/channels.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var authorized_1 = __webpack_require__(/*! ../../middleware/authorized */ "./src/server/middleware/authorized.ts");
var admin_1 = __webpack_require__(/*! ../../middleware/admin */ "./src/server/middleware/admin.ts");
var validator = __webpack_require__(/*! validator */ "validator");
function default_1(app) {
    app.get('/api/v1/channel*', authorized_1["default"]);
    app.get('/api/v1/channels', function (req, res) {
        req.db.collection('channels', function (e, coll) {
            var p = new Promise(function (resolve) {
                coll.find({}).count(function (e, count) {
                    if (count === 0) {
                        coll.insertMany([{ name: 'general' }, { name: 'random' }], function () { return resolve(); });
                    }
                    else {
                        resolve();
                    }
                });
            });
            p.then(function () {
                coll.find({}).toArray(function (err, arr) {
                    res.json({ channels: arr });
                });
            });
        });
    });
    app.get('/api/v1/channel/delete/:channel', admin_1["default"], function (req, res) {
        if (validator.isEmpty(req.params.channel)) {
            return res.status(400).json({ error: 'Invalid channel name' });
        }
        return req.db.collection('channels', function (e, coll) {
            var p = new Promise(function (resolve, reject) {
                coll.find({ name: req.params.channel }).count(function (e, count) {
                    if (count === 1) {
                        return resolve();
                    }
                    return reject();
                });
            });
            p.then(function () {
                coll.deleteOne({ name: req.params.channel }).then(function () {
                    return res.json({ success: true });
                });
            })["catch"](function () {
                return res.status(400).json({ error: 'Returned channels count not equal to 1' });
            });
            return p;
        });
    });
    app.post('/api/v1/channel/create', admin_1["default"], function (req, res) {
        if (validator.isEmpty(req.body.channelName)) {
            return res.status(400).json({ error: 'Invalid channel name' });
        }
        return req.db.collection('channels', function (e, coll) {
            var p = new Promise(function (resolve, reject) {
                coll.countDocuments({ name: req.body.channelName }, function (err, count) {
                    if (count !== 0) {
                        return reject();
                    }
                    return resolve();
                });
            });
            return p.then(function () {
                return coll.insertOne({ name: req.body.channelName }).then(function () {
                    return res.json({ success: true });
                });
            })["catch"](function () {
                return res.status(400).json({ error: 'Channel already exists' });
            });
        });
    });
}
exports["default"] = default_1;


/***/ }),

/***/ "./src/server/routes/api/index.ts":
/*!****************************************!*\
  !*** ./src/server/routes/api/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var bcrypt = __webpack_require__(/*! bcryptjs */ "bcryptjs");
var validator = __webpack_require__(/*! validator */ "validator");
var users_1 = __webpack_require__(/*! ./users */ "./src/server/routes/api/users.ts");
var messages_1 = __webpack_require__(/*! ./messages */ "./src/server/routes/api/messages.ts");
var channels_1 = __webpack_require__(/*! ./channels */ "./src/server/routes/api/channels.ts");
var shortid_1 = __webpack_require__(/*! shortid */ "shortid");
function default_1(app) {
    app.use(function (req, res, next) {
        res.set('new-csrf-token', req.csrfToken());
        return next();
    });
    users_1["default"](app);
    messages_1["default"](app);
    channels_1["default"](app);
    app.post('/api/v1/login', function (req, res) {
        if (validator.isEmpty(req.body.email) || validator.isEmpty(req.body.password)) {
            return res.status(400).json({ error: 'Please supply an email and password' });
        }
        if (!validator.isEmail(req.body.email)) {
            return res.status(400).json({ error: 'Not a valid email address' });
        }
        req.authenticate(req.body.email, req.body.password, function (user) {
            if (!user)
                return res.status(401).json({ error: 'Invalid email or password' });
            return res.json({
                success: true,
                email: req.session.user.email,
                role: req.session.user.role,
                name: req.session.user.name
            });
        });
    });
    app.post('/api/v1/register', function (req, res) {
        if (validator.isEmpty(req.body.email) || validator.isEmpty(req.body.password)) {
            return res.status(400).json({ error: 'Please supply an email and password' });
        }
        if (!validator.isEmail(req.body.email)) {
            return res.status(400).json({ error: 'Not a valid email address' });
        }
        var passwordHash = bcrypt.hashSync(req.body.password);
        var users = req.db.collection('users');
        users.findOne({ email: req.body.email }).then(function (user) {
            if (user !== null) {
                return res.status(401).json({ error: 'Email address already in use' });
            }
            users.countDocuments().then(function (count) {
                var role = 'user';
                if (count === 0) {
                    role = 'admin';
                    var widgets = req.db.collection('widgets');
                    widgets.insertOne({
                        shortId: shortid_1.generate(),
                        domain: 'http://localhost:4000',
                    });
                }
                users.insertOne({
                    email: req.body.email,
                    password: passwordHash,
                    emailVerified: false,
                    role: role
                }, function (err) {
                    return res.json({ success: true });
                });
            });
        });
    });
    app.post('/api/v1/verifyEmail', function (req, res) {
        if (validator.isEmpty(req.body.key)) {
            return res.status(400).json({ error: 'Invalid request, no key supplied' });
        }
        var users = req.db.collection('users');
        users.findOneAndUpdate({ verifyKey: req.body.key }, { $set: { emailVerified: true, verifyKey: null } }, function (err, result) {
            if (err || !result) {
                console.log(err, result);
                return res.status(400).json({ error: 'Invalid key' });
            }
            return res.status(200).json({ success: true });
        });
    });
    app.get('/api/v1/logout', function (req, res) {
        req.logout();
        return res.json({ success: true, message: 'logged out' });
    });
}
exports["default"] = default_1;


/***/ }),

/***/ "./src/server/routes/api/messages.ts":
/*!*******************************************!*\
  !*** ./src/server/routes/api/messages.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var authorized_1 = __webpack_require__(/*! ../../middleware/authorized */ "./src/server/middleware/authorized.ts");
var mongodb_1 = __webpack_require__(/*! mongodb */ "mongodb");
function default_1(app) {
    app.get('/api/v1/messages?', authorized_1["default"]);
    app.get('/api/v1/messages/:channel/:offset', function (req, res) {
        var messages = req.db.collection('messages');
        messages.find({ channel: req.params.channel }, { skip: parseInt(req.params.offset), sort: [['_id', -1]], limit: 20 })
            .toArray(function (err, messages) {
            if (!messages)
                return res.status(400).json({ json: err });
            messages.toArray(function (err, msgArray) {
                return res.json({ messages: msgArray.map(function (m) {
                        var objID = new mongodb_1.ObjectID(m['_id']);
                        m.created = objID.getTimestamp();
                        return m;
                    }).reverse()
                });
            });
        });
    });
}
exports["default"] = default_1;


/***/ }),

/***/ "./src/server/routes/api/users.ts":
/*!****************************************!*\
  !*** ./src/server/routes/api/users.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var bcrypt = __webpack_require__(/*! bcryptjs */ "bcryptjs");
var validator = __webpack_require__(/*! validator */ "validator");
var authorized_1 = __webpack_require__(/*! ../../middleware/authorized */ "./src/server/middleware/authorized.ts");
function default_1(app) {
    app.get('/api/v1/user*', authorized_1["default"]);
    app.get('/api/v1/user', function (req, res) {
        res.send(req.session.user);
    });
    app.get('/api/v1/users', function (req, res) {
        var usersColl = req.db.collection('users');
        var users = [];
        usersColl.find({}).forEach(function (userDoc) {
            users.push({
                name: userDoc.name || '',
                email: userDoc.email,
                role: userDoc.role
            });
        }, function (err) {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Something went wrong retrieving users' });
            }
            return res.status(200).json({ success: true, users: users });
        });
    });
    app.get('/api/v1/user/:user', function (req, res) {
        req.db.collection('users').findOne({ email: req.params.user }, function (err, user) {
            if (err)
                return res.status(400).json({ error: err });
            return res.json({ user: {
                    email: user.email,
                    _id: user['_id'],
                    name: '',
                } });
        });
    });
    app.post('/api/v1/user/update/email', function (req, res) {
        if (!validator.isEmail(req.body.email))
            return res.status(400).json({ error: 'Not a valid email' });
        var users = req.db.collection('users');
        return users.countDocuments({ email: req.body.email }, function (err, count) {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Something went wrong counting users with email ' + req.body.email });
            }
            if (count !== 0)
                return res.status(400).json({ error: 'Email address already in use' });
            users.updateOne({ email: req.session.user.email }, { $set: { email: req.body.email } }, function (err, user) {
                if (err || !user) {
                    console.log(err, user);
                    return res.status(500).json({ error: 'Something went wrong trying to update user\'s email' });
                }
                req.session.user.email = req.body.email;
                return res.status(200).json({ success: true });
            });
        });
    });
    app.post('/api/v1/user/update/name', function (req, res) {
        var users = req.db.collection('users');
        users.updateOne({ email: req.session.user.email }, { $set: { name: req.body.name } }, function (err, user) {
            if (err || !user) {
                console.log(err, user);
                return res.status(500).json({ error: 'Something went wrong trying to update user\'s name' });
            }
            req.session.user.name = req.body.name;
            return res.status(200).json({ success: true });
        });
    });
    app.post('/api/v1/user/update/password', function (req, res) {
        var users = req.db.collection('users');
        if (validator.isEmpty(req.body.newPass) || validator.isEmpty(req.body.oldPass))
            return res.status(400).json({ error: 'Must supply the current and new password' });
        return users.findOne({ email: req.session.user.email }, function (err, user) {
            if (err || !user) {
                console.log(err);
                return res.status(500).json({ error: 'Something went wrong trying to retrieve the logged in user' });
            }
            if (!bcrypt.compareSync(req.body.oldPass, user.password))
                return res.status(400).json({ error: 'Invalid password' });
            users.updateOne({ email: req.session.user.email }, { $set: { password: bcrypt.hashSync(req.body.newPass) } }, function (err, user) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: 'Something went wrong trying to update the logged in user\'s password' });
                }
                return res.status(200).json({ success: true });
            });
        });
    });
    app.post('/api/v1/user/reset_password', function (req, res) {
    });
    app.post('/api/v1/user/resend_email_verification');
}
exports["default"] = default_1;


/***/ }),

/***/ "./src/server/routes/index.ts":
/*!************************************!*\
  !*** ./src/server/routes/index.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var index_1 = __webpack_require__(/*! ./api/index */ "./src/server/routes/api/index.ts");
var widget_1 = __webpack_require__(/*! ./widget */ "./src/server/routes/widget.ts");
function default_1(app) {
    widget_1["default"](app);
    index_1["default"](app);
}
exports["default"] = default_1;


/***/ }),

/***/ "./src/server/routes/widget.ts":
/*!*************************************!*\
  !*** ./src/server/routes/widget.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
exports.__esModule = true;
var path = __webpack_require__(/*! path */ "path");
function default_1(app) {
    app.get('/widget', function (req, res) {
        res.render(path.resolve(__dirname, '../../../dist/public/widget/index.html'));
    });
    app.get('/widget/demo', function (req, res) {
        res.render(path.resolve(__dirname, '../../../dist/public/widget/demo.html'));
    });
}
exports["default"] = default_1;

/* WEBPACK VAR INJECTION */}.call(this, "src/server/routes"))

/***/ }),

/***/ "./src/server/server.ts":
/*!******************************!*\
  !*** ./src/server/server.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
exports.__esModule = true;
var http = __webpack_require__(/*! http */ "http");
var express = __webpack_require__(/*! express */ "express");
var session = __webpack_require__(/*! express-session */ "express-session");
var path = __webpack_require__(/*! path */ "path");
var mongoose = __webpack_require__(/*! mongoose */ "mongoose");
var bodyParser = __webpack_require__(/*! body-parser */ "body-parser");
var bcrypt = __webpack_require__(/*! bcryptjs */ "bcryptjs");
var csurf = __webpack_require__(/*! csurf */ "csurf");
var helmet = __webpack_require__(/*! helmet */ "helmet");
var MongoStore = __webpack_require__(/*! connect-mongo */ "connect-mongo")(session);
var mustacheExpress = __webpack_require__(/*! mustache-express */ "mustache-express");
var index_1 = __webpack_require__(/*! ./routes/index */ "./src/server/routes/index.ts");
var index_2 = __webpack_require__(/*! ./socket.io/index */ "./src/server/socket.io/index.ts");
var env = __webpack_require__(/*! ../../env */ "./env.js");
var app = express();
var port = process.env.PORT || 3000;
var csurfMiddleware = csurf();
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
mongoose.connect(env.mongodbConnectionUri, { useNewUrlParser: true });
mongoose.connection.on('error', function (err) {
    console.error('Mongoose connection error', err);
});
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
mongoose.connection.on('connected', function () {
    var db = mongoose.connection;
    app.use(function (req, res, next) {
        req.db = db;
        return next();
    });
    var sessionMiddleware = session({
        secret: 'some secret',
        saveUninitialized: true,
        resave: false,
        cookie: {
            secure: false
        },
        store: new MongoStore({ db: db, collection: 'session' })
    });
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(sessionMiddleware);
    app.use(csurfMiddleware);
    app.use(helmet());
    app.use(function (req, res, next) {
        req.authenticate = function (username, password, done) {
            var users = db.collection('users');
            users.findOne({ email: username }).then(function (user) {
                if (user === null || !bcrypt.compareSync(password, user.password)) {
                    return done(false);
                }
                var userDetails = {
                    email: user.email,
                    name: user.name,
                    role: user.role
                };
                req.session.user = userDetails;
                return done(userDetails);
            });
        };
        req.logout = function () {
            req.session.user = null;
        };
        next();
    });
    index_1["default"](app);
    app.get('/', function (req, res) {
        res.render(path.resolve(__dirname, '../../dist/public/index.html'), { csrfToken: req.csrfToken() });
    });
    app.use(express.static(path.resolve(__dirname, '../../dist/public/')));
    app.get('*', function (req, res) {
        res.render(path.resolve(__dirname, '../../dist/public/index.html'), { csrfToken: req.csrfToken() });
    });
    var server = http.createServer(app);
    index_2["default"](server, db, sessionMiddleware);
    server.listen(port, function () {
        console.log("Listening on port " + port + "!");
    });
});
exports["default"] = app;

/* WEBPACK VAR INJECTION */}.call(this, "src/server"))

/***/ }),

/***/ "./src/server/socket.io/index.ts":
/*!***************************************!*\
  !*** ./src/server/socket.io/index.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var socketio = __webpack_require__(/*! socket.io */ "socket.io");
var mongodb_1 = __webpack_require__(/*! mongodb */ "mongodb");
var init = function (server, db, sessionMiddleware) {
    var io = socketio(server);
    var connectedUserEmails = [];
    io.use(function (socket, next) {
        sessionMiddleware(socket.request, socket.request.res, next);
    });
    io.use(function (socket, next) {
        if (socket.request.session.user.email)
            return next();
        next(new Error('Authentication error'));
    });
    io.on('connection', function (socket) {
        connectedUserEmails.push(socket.request.session.user.email);
        console.log('Connected users', connectedUserEmails);
        io.emit('connected users', connectedUserEmails.filter(function (value, index, self) {
            return self.indexOf(value) === index;
        }));
        socket.on('disconnect', function () {
            connectedUserEmails.splice(connectedUserEmails.indexOf(socket.request.session.user.email), 1);
            io.emit('connected users', connectedUserEmails.filter(function (value, index, self) {
                return self.indexOf(value) === index;
            }));
        });
        socket.on('message', function (message) {
            console.log(message);
            db.collection('messages').insertOne({ channel: message.channel, text: message.text, userEmail: socket.request.session.user.email }, function (err, r) {
                if (!err) {
                    io.emit('message', {
                        _id: r.insertedId,
                        userEmail: socket.request.session.user.email,
                        text: message.text,
                        channel: message.channel,
                        created: (new mongodb_1.ObjectID(r.insertedId)).getTimestamp()
                    });
                    return socket.emit('message received');
                }
                return console.error(err);
            });
        });
    });
};
exports["default"] = init;


/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bcryptjs");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "connect-mongo":
/*!********************************!*\
  !*** external "connect-mongo" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("connect-mongo");

/***/ }),

/***/ "csurf":
/*!************************!*\
  !*** external "csurf" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("csurf");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongodb");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ "mustache-express":
/*!***********************************!*\
  !*** external "mustache-express" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mustache-express");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "shortid":
/*!**************************!*\
  !*** external "shortid" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("shortid");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),

/***/ "validator":
/*!****************************!*\
  !*** external "validator" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ })

/******/ });
//# sourceMappingURL=server.js.map