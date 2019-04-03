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
    app.get('/api/v1/channel/delete/:channel', function (req, res) {
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
    app.post('/api/v1/channel/create', function (req, res) {
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
var crypto = __webpack_require__(/*! crypto */ "crypto");
var env = __webpack_require__(/*! ../../../../env.js */ "./env.js");
var mailgun = __webpack_require__(/*! mailgun-js */ "mailgun-js")({ apiKey: env.mailgunApiKey, domain: env.mailgunDomain });
;
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
            console.log(user);
            if (!user)
                return res.status(401).json({ error: 'Invalid email or password' });
            if (!user.emailVerified) {
                return res.status(400).json({ error: 'Email not verified' });
            }
            return res.json({ success: true, email: req.session.user.email });
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
            var verifyKey = crypto.randomBytes(48).toString('hex');
            users.insertOne({
                email: req.body.email,
                password: passwordHash,
                emailVerified: false,
                verifyKey: verifyKey
            }, function (err) {
                var emailHtml = '<a href="';
                emailHtml += process.env.BASE_URL ? process.env.BASE_URL : 'http://localhost:3000';
                emailHtml += '/verifyEmail/' + verifyKey + '">Click here</a> to verify your email address.';
                mailgun.messages().send({
                    to: req.body.email,
                    from: process.env.FROM_EMAIL ? process.env.FROM_EMAIL : 'adrian@sandbox3786eaf2000b4a839664faae2fb3faf5.mailgun.org',
                    subject: 'Verify your email address',
                    html: emailHtml
                }, function (err) {
                    if (err)
                        console.log(err);
                });
                return res.json({ success: true });
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
        req.db.collection('messages').find({ channel: req.params.channel }, { skip: parseInt(req.params.offset), sort: [['_id', -1]], limit: 20 }, function (err, messages) {
            if (!messages)
                return res.state(400).json({ json: err });
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
var authorized_1 = __webpack_require__(/*! ../../middleware/authorized */ "./src/server/middleware/authorized.ts");
function default_1(app) {
    app.get('/api/v1/user*', authorized_1["default"]);
    app.get('/api/v1/user', function (req, res) {
        res.send(req.session.user);
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
    });
    app.post('/api/v1/user/update/name', function (req, res) {
    });
    app.post('/api/v1/user/update/email', function (req, res) {
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
var mongodb_1 = __webpack_require__(/*! mongodb */ "mongodb");
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
mongodb_1.MongoClient.connect(env.mongodbConnectionUri, { useNewUrlParser: true }, function (err, client) {
    if (err)
        return console.error(err);
    var db = client.db();
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
                var sessionUser = {
                    email: user.email,
                    emailVerified: user.emailVerified,
                    name: user.name
                };
                req.session.user = sessionUser;
                return done(sessionUser);
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

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("crypto");

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

/***/ "mailgun-js":
/*!*****************************!*\
  !*** external "mailgun-js" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mailgun-js");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongodb");

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