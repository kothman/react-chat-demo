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
/******/ 	return __webpack_require__(__webpack_require__.s = "./tests/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./env.js":
/*!****************!*\
  !*** ./env.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    // https://docs.mongodb.com/manual/reference/connection-string/
    mongodbConnectionUri: process.env.MONGODB_URI,
    mongodbTestConnectionUri: 'mongodb://localhost:27017/openChatTest',
    port: process.env.PORT || 5000,
    production:  false || false,
    useTestDb: process.env.USE_TEST_DB || false,
    secret: process.env.SECRET || 'secret',
    disableCsrf: process.env.DISABLE_CSRF || false,
    disableReduxLogging: process.env.DISABLE_REDUX_LOGGING || false,
    disableAutoStart: process.env.DISABLE_AUTO_START || false,
    mailgunApiKey: process.env.MAILGUN_API_KEY,
    mailgunDomain: process.env.MAILGUN_DOMAIN,
    baseUrl: process.env.BASE_URL ? process.env.BASE_URL : 'http://localhost:5000'
}


/***/ }),

/***/ "./src/server/controllers/authController.ts":
/*!**************************************************!*\
  !*** ./src/server/controllers/authController.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var validator_1 = __webpack_require__(/*! validator */ "validator");
var bcryptjs_1 = __webpack_require__(/*! bcryptjs */ "bcryptjs");
var User_1 = __webpack_require__(/*! ../models/User */ "./src/server/models/User.ts");
var env = __webpack_require__(/*! ../../../env */ "./env.js");
exports["default"] = {
    login: function (req, res) {
        if (validator_1.isEmpty(req.body.email || '') || validator_1.isEmpty(req.body.password || '')) {
            return res.status(400).json({ error: 'Please supply an email and password' }).end();
        }
        if (!validator_1.isEmail(req.body.email)) {
            return res.status(400).json({ error: 'Not a valid email address' }).end();
        }
        req.authenticate(req.body.email, req.body.password, function (user) {
            if (!user)
                return res.status(401).json({ error: 'Invalid email or password' }).end();
            req.issueNewToken(user);
            return res.status(200)
                .json({
                success: true,
                email: user.email,
                role: user.role,
                name: user.name
            }).end();
        });
    },
    register: function (req, res) {
        if (validator_1.isEmpty(req.body.email || '') || validator_1.isEmpty(req.body.password || '')) {
            return res.status(400).json({ error: 'Please supply an email and password' });
        }
        if (!validator_1.isEmail(req.body.email)) {
            return res.status(400).json({ error: 'Not a valid email address' });
        }
        return User_1["default"].findByEmail(req.body.email).countDocuments().exec().then(function (count) {
            if (count !== 0)
                return res.status(400).json({ error: 'Email address in use' });
            var passwordHash = bcryptjs_1.hashSync(req.body.password);
            User_1["default"].countDocuments().exec().then(function (count) {
                var role = 'user';
                if (count === 0)
                    role = 'admin';
                var user = new User_1["default"]({
                    name: '',
                    email: req.body.email,
                    password: passwordHash,
                    role: role,
                    emailVerified: false,
                });
                user.save().then(function (u) {
                    return res.status(200).json({ success: true });
                })["catch"](function (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Something went wrong trying to create a new user' });
                });
            });
        });
    },
    logout: function (req, res) {
        req.logout();
        return res.json({ success: true, message: 'logged out' });
    },
    verifyEmail: function (req, res) {
    }
};


/***/ }),

/***/ "./src/server/controllers/channelController.ts":
/*!*****************************************************!*\
  !*** ./src/server/controllers/channelController.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Channel_1 = __webpack_require__(/*! ../models/Channel */ "./src/server/models/Channel.ts");
exports["default"] = {
    channels: function (req, res) {
        return Channel_1["default"].countDocuments().exec().then(function (count) {
            var p = new Promise(function (resolve, reject) {
                if (count !== 0) {
                    return resolve();
                }
                Channel_1["default"].create([{ name: 'general' }, { name: 'random' }]).then(function () {
                    return resolve();
                })["catch"](function (err) {
                    return reject(err);
                });
            });
            return p.then(function () {
                Channel_1["default"].find().exec().then(function (channels) {
                    return res.status(200).json({ channels: channels });
                })["catch"](function (err) {
                    console.log(err);
                    return res.status(500).json({ error: 'Something went wrong while trying to fetch channels' });
                });
            })["catch"](function (err) {
                console.error(err);
                return res.status(500).json({ error: 'Something went wrong while trying to create default channels' });
            });
        })["catch"](function (err) {
            console.error(err);
            return res.status(500).json({ error: 'Something went wrong while counting channels' });
        });
    },
    "delete": function (req, res) {
    },
    create: function (req, res) {
    }
};


/***/ }),

/***/ "./src/server/controllers/messageController.ts":
/*!*****************************************************!*\
  !*** ./src/server/controllers/messageController.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Message_1 = __webpack_require__(/*! ../models/Message */ "./src/server/models/Message.ts");
exports["default"] = {
    messages: function (req, res) {
        return Message_1["default"].find({ channel: req.params.channel })
            .skip(parseInt(req.params.offest))
            .sort({ _id: -1 })
            .limit(20)
            .exec().then(function (messages) {
            return res.status(200).json({
                messages: messages.map(function (m) {
                    return {
                        text: m.text,
                        created: m.createdAt,
                        userEmail: m.userEmail,
                        channel: m.channel,
                        _id: m._id
                    };
                }).reverse()
            });
        })["catch"](function (err) {
            return res.status(400).json({ error: 'something went wrong trying to fetch messages' });
        });
    }
};


/***/ }),

/***/ "./src/server/controllers/userController.ts":
/*!**************************************************!*\
  !*** ./src/server/controllers/userController.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var validator_1 = __webpack_require__(/*! validator */ "validator");
var User_1 = __webpack_require__(/*! ../models/User */ "./src/server/models/User.ts");
var bcryptjs_1 = __webpack_require__(/*! bcryptjs */ "bcryptjs");
exports["default"] = {
    user: function (req, res) {
        res.send(req.user);
    },
    users: function (req, res) {
        return User_1["default"].find({}).then(function (users) {
            return res.status(200).json({ success: true, users: users });
        })["catch"](function (err) {
            console.error(err);
            return res.status(200).json({ error: 'Something went wrong while retrieving users' });
        });
    },
    userByEmail: function (req, res) {
        if (!validator_1.isEmail(req.params.user))
            return res.status(400).json({ error: 'Please supply a valid email' });
        return User_1["default"].findByEmail(req.params.user).exec().then(function (user) {
            if (user !== null) {
                return res.status(200).json({
                    user: {
                        email: user.email,
                        _id: user._id,
                        name: user.name || '',
                    }
                });
            }
            return res.status(400).json({ error: 'No user found with that email' });
        })["catch"](function (err) {
            console.error(err);
            return res.status(500).json({ error: 'Something went wrong trying to find the user' });
        });
    },
    updateEmail: function (req, res) {
        if (!validator_1.isEmail(req.body.email))
            return res.status(400).json({ error: 'Not a valid email' });
        return User_1["default"].countDocuments({ email: req.body.email }).exec().then(function (count) {
            if (count !== 0)
                return res.status(400).json({ error: 'Email address already in use' });
            return User_1["default"].findByEmail(req.user.email).exec().then(function (user) {
                user.email = req.body.email;
                user.save();
                req.issueNewToken(Object.assign({}, req.user, { email: req.body.email }));
                return res.status(200).json({ success: true });
            })["catch"](function (err) {
                console.error(err);
                return res.status(500).json({ error: 'Something went wrong trying to fetch the user' });
            });
        });
    },
    updateName: function (req, res) {
        return User_1["default"].findByEmail(req.user.email)
            .exec().then(function (user) {
            user.name = req.body.name;
            user.save();
            req.issueNewToken(Object.assign({}, req.user, { name: req.body.name }));
            return res.status(200).json({ success: true });
        })["catch"](function (err) {
            console.error(err);
            return res.status(500).json({ error: 'Something went wrong trying to update the user' });
        });
    },
    updatePassword: function (req, res) {
        if (validator_1.isEmpty(req.body.newPass) || validator_1.isEmpty(req.body.oldPass))
            return res.status(400).json({ error: 'Must supply the current and new password' });
        return User_1["default"].findByEmail(req.user.email).exec().then(function (user) {
            if (!bcryptjs_1.compareSync(req.body.oldPass, user.password))
                return res.status(400).json({ error: 'Current password is incorrect' });
            user.password = bcryptjs_1.hashSync(req.body.newPass);
            user.save();
            return res.status(200).json({ success: true });
        });
    },
    resetPassword: function (req, res) {
        return res.status(500).json({ error: 'Not implemented' });
    },
};


/***/ }),

/***/ "./src/server/middleware/authorized.ts":
/*!*********************************************!*\
  !*** ./src/server/middleware/authorized.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var jsonwebtoken_1 = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
var env = __webpack_require__(/*! ../../../env */ "./env.js");
function default_1(req, res, next) {
    if (req.session.token && !req.headers['x-access-token']) {
        res.setHeader('x-access-token', req.session.token);
    }
    var token = req.headers['x-access-token'] || req.session.token;
    if (!token)
        return res.status(401).json({ error: 'Not authorized' });
    jsonwebtoken_1.verify(token, env.secret, function (err, decoded) {
        if (err)
            return res.status(401).send({ error: 'Not authorized' });
        req.user = decoded;
        return next();
    });
}
exports["default"] = default_1;


/***/ }),

/***/ "./src/server/models/Channel.ts":
/*!**************************************!*\
  !*** ./src/server/models/Channel.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var mongoose_1 = __webpack_require__(/*! mongoose */ "mongoose");
var channelSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
    },
}, {
    timestamps: true
});
var Channel = mongoose_1.model('Channel', channelSchema);
exports["default"] = Channel;


/***/ }),

/***/ "./src/server/models/Message.ts":
/*!**************************************!*\
  !*** ./src/server/models/Message.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var mongoose_1 = __webpack_require__(/*! mongoose */ "mongoose");
var messageSchema = new mongoose_1.Schema({
    channel: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
        lowercase: true,
    }
}, {
    timestamps: true
});
var Message = mongoose_1.model('Message', messageSchema);
exports["default"] = Message;


/***/ }),

/***/ "./src/server/models/User.ts":
/*!***********************************!*\
  !*** ./src/server/models/User.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var mongoose_1 = __webpack_require__(/*! mongoose */ "mongoose");
;
var userSchema = new mongoose_1.Schema({
    name: String,
    email: {
        required: true,
        type: String,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        lowercase: true,
        "enum": ['admin', 'user']
    },
}, {
    timestamps: true
});
userSchema.statics.findByEmail = function (email) {
    return this.findOne({ email: email });
};
var User = mongoose_1.model('User', userSchema);
exports["default"] = User;


/***/ }),

/***/ "./src/server/routes.ts":
/*!******************************!*\
  !*** ./src/server/routes.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
exports.__esModule = true;
var path = __webpack_require__(/*! path */ "path");
var authorized_1 = __webpack_require__(/*! ./middleware/authorized */ "./src/server/middleware/authorized.ts");
var authController_1 = __webpack_require__(/*! ./controllers/authController */ "./src/server/controllers/authController.ts");
var userController_1 = __webpack_require__(/*! ./controllers/userController */ "./src/server/controllers/userController.ts");
var messageController_1 = __webpack_require__(/*! ./controllers/messageController */ "./src/server/controllers/messageController.ts");
var channelController_1 = __webpack_require__(/*! ./controllers/channelController */ "./src/server/controllers/channelController.ts");
function default_1(app) {
    app.get('/', function (req, res) {
        return res.render(path.resolve(__dirname, '../../dist/public/index.html'), { csrfToken: req.csrfToken() });
    });
    app.get('/widget', function (req, res) {
        return res.render(path.resolve(__dirname, '../../../dist/public/widget/index.html'));
    });
    app.get('/widget/demo', function (req, res) {
        return res.render(path.resolve(__dirname, '../../../dist/public/widget/demo.html'));
    });
    app.post('/api/v1/login', authController_1["default"].login);
    app.post('/api/v1/register', authController_1["default"].register);
    app.get('/api/v1/logout', authController_1["default"].logout);
    app.get('/api/v1/verifyEmail/:id', authController_1["default"].verifyEmail);
    app.use('/api/v1/user', authorized_1["default"]);
    app.get('/api/v1/user', userController_1["default"].user);
    app.get('/api/v1/users', userController_1["default"].users);
    app.get('/api/v1/user/:user', userController_1["default"].userByEmail);
    app.post('/api/v1/user/update/email', userController_1["default"].updateEmail);
    app.post('/api/v1/user/update/name', userController_1["default"].updateName);
    app.post('/api/v1/user/update/password', userController_1["default"].updatePassword);
    app.post('/api/v1/user/reset_password', userController_1["default"].resetPassword);
    app.get('/api/v1/message*', authorized_1["default"]);
    app.get('/api/v1/messages/:channel/:offset', messageController_1["default"].messages);
    app.use('/api/v1/channel', authorized_1["default"]);
    app.get('/api/v1/channels', channelController_1["default"].channels);
    app.post('/api/v1/channels/delete', channelController_1["default"]["delete"]);
    app.post('/api/v1/channels/create', channelController_1["default"].create);
    app.get('*', function (req, res) {
        return res.render(path.resolve(__dirname, '../../dist/public/index.html'), { csrfToken: req.csrfToken() });
    });
}
exports["default"] = default_1;

/* WEBPACK VAR INJECTION */}.call(this, "src/server"))

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
var path = __webpack_require__(/*! path */ "path");
var mongoose = __webpack_require__(/*! mongoose */ "mongoose");
var csrf = __webpack_require__(/*! csurf */ "csurf");
var cookieParser = __webpack_require__(/*! cookie-parser */ "cookie-parser");
var session = __webpack_require__(/*! express-session */ "express-session");
var bodyParser = __webpack_require__(/*! body-parser */ "body-parser");
var bcrypt = __webpack_require__(/*! bcryptjs */ "bcryptjs");
var helmet = __webpack_require__(/*! helmet */ "helmet");
var compression = __webpack_require__(/*! compression */ "compression");
var jsonwebtoken_1 = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
var mustacheExpress = __webpack_require__(/*! mustache-express */ "mustache-express");
var MongoStore = __webpack_require__(/*! connect-mongo */ "connect-mongo")(session);
var routes_1 = __webpack_require__(/*! ./routes */ "./src/server/routes.ts");
var index_1 = __webpack_require__(/*! ./socket.io/index */ "./src/server/socket.io/index.ts");
var User_1 = __webpack_require__(/*! ./models/User */ "./src/server/models/User.ts");
var env = __webpack_require__(/*! ../../env */ "./env.js");
var app = express();
exports.app = app;
var port = env.port;
var server;
var socketServer;
exports.socketServer = socketServer;
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.use(compression());
var sessionMiddleware = session({
    secret: env.secret,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: true,
        secure: env.production,
        httpOnly: true
    },
    saveUninitialized: true,
    resave: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
});
var csrfMiddleware = csrf({
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: true,
        secure: env.production,
        httpOnly: true,
        key: '_csrf'
    }
});
mongoose.connect(env.useTestDb ? env.mongodbTestConnectionUri : env.mongodbConnectionUri, { useNewUrlParser: true });
mongoose.connection.on('error', function (err) {
    console.error('Mongoose connection error', err);
});
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
app.use(sessionMiddleware);
app.use(cookieParser(env.secret));
if (env.disableCsrf) {
    console.log('CSRF disabled');
    app.use(function (req, res, next) {
        req.csrfToken = function () { return ''; };
        return next();
    });
}
else {
    app.use(csrfMiddleware);
}
var db = mongoose.connection;
app.use(function (req, res, next) {
    req.db = db;
    return next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(express.static(path.resolve(__dirname, '../../dist/public/')));
app.use('/api', function (req, res, next) {
    return next();
});
app.use(function (req, res, next) {
    req.authenticate = function (email, password, done) {
        User_1["default"].findByEmail(email).then(function (user) {
            if (user === null)
                return done(false, null);
            if (!bcrypt.compareSync(password, user.password))
                return done(false, new Error('Invalid password'));
            var userDetails = {
                email: user.email,
                name: user.name,
                role: user.role,
            };
            return done(userDetails, null);
        })["catch"](function (err) {
            done(false, err);
        });
    };
    req.logout = function () {
        req.session.token = null;
    };
    req.issueNewToken = function (user) {
        var token = jsonwebtoken_1.sign({
            name: user.name,
            role: user.role,
            email: user.email
        }, env.secret, {
            expiresIn: 86400
        });
        req.session.token = token;
        res.setHeader('x-access-token', token);
    };
    next();
});
routes_1["default"](app);
server = http.createServer(app);
server.on('error', function (err) {
    console.error(err);
    server.close();
});
if (!env.disableAutoStart) {
    exports.socketServer = socketServer = index_1["default"](server, db);
    mongoose.connection.on('connected', function () {
        console.log('Connected to MongoDB via Mongoose');
        server.listen(port, function () {
            console.log("Listening on port " + port + "!");
            app.emit('server started');
        });
    });
}
exports["default"] = server;
exports.conn = mongoose.connection;

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
var socketio_jwt_1 = __webpack_require__(/*! socketio-jwt */ "socketio-jwt");
var Message_1 = __webpack_require__(/*! ../models/Message */ "./src/server/models/Message.ts");
var env = __webpack_require__(/*! ../../../env */ "./env.js");
var init = function (server, db) {
    var io = socketio(server);
    var connectedUserEmails = [];
    io.on('connection', socketio_jwt_1.authorize({
        secret: env.secret,
        timeout: 15000,
        decodedPropertyName: 'jwt'
    })).on('authenticated', function (socket) {
        connectedUserEmails.push(socket.jwt.email);
        console.log('Connected users', connectedUserEmails);
        io.emit('connected users', connectedUserEmails.filter(function (value, index, self) {
            return self.indexOf(value) === index;
        }));
        socket.on('disconnect', function () {
            connectedUserEmails.splice(connectedUserEmails.indexOf(socket.jwt.email), 1);
            io.emit('connected users', connectedUserEmails.filter(function (value, index, self) {
                return self.indexOf(value) === index;
            }));
        });
        socket.on('message', function (message) {
            console.log(message);
            var m = new Message_1["default"]({
                channel: message.channel,
                text: message.text,
                userEmail: socket.jwt.email
            });
            m.save().then(function (m) {
                io.emit('message', {
                    _id: m._id,
                    userEmail: m.userEmail,
                    text: m.text,
                    channel: m.channel,
                    created: m.createdAt
                });
                socket.emit('message received');
            })["catch"](function (err) {
                console.error(err);
                socket.emit('message receive error', err);
            });
        });
    });
    return io;
};
exports["default"] = init;


/***/ }),

/***/ "./src/web/actions/channelsActions.ts":
/*!********************************************!*\
  !*** ./src/web/actions/channelsActions.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var axios_1 = __webpack_require__(/*! axios */ "axios");
var notificationsActions_1 = __webpack_require__(/*! ./notificationsActions */ "./src/web/actions/notificationsActions.ts");
exports.ADD_CHANNELS = 'ADD_CHANNELS';
exports.SET_CHANNEL_FETCHING_NEW_MESSAGES = 'SET_CHANNEL_FETCHING_NEW_MESSAGES';
exports.SET_CHANNEL_HAS_MORE_MESSAGES = 'SET_CHANNEL_HAS_MORE_MESSAGE';
exports.ADD_RECEIVED_CHANNEL_MESSAGE = 'ADD_RECEIVED_CHANNEL_MESSAGE';
exports.ADD_RETRIEVED_CHANNEL_MESSAGES = 'ADD_RETRIEVED_CHANNEL_MESSAGES';
exports.INCREMENT_CHANNEL_RETRIEVE_MESSAGES_OFFSET = 'INCREMENT_CHANNEL_RETRIEVE_MESSAGES_OFFSET';
exports.RETRIEVE_CHANNEL_MESSAGES = 'RETRIEVE_CHANNEL_MESSAGES';
exports.CLEAR_CHANNELS_DATA = 'CLEAR_CHANNELS_DATA';
exports.addChannels = function (channelNames) {
    var channels = [];
    channelNames.forEach(function (name) {
        channels.push({
            name: name,
            messages: [],
            retrieveMessagesOffset: 0,
            hasMoreMessages: true,
            fetchingNewMessages: false
        });
    });
    return {
        type: exports.ADD_CHANNELS,
        data: { channels: channels }
    };
};
exports.incrementChannelRetrieveMessagesOffset = function (channel, n) {
    return {
        type: exports.INCREMENT_CHANNEL_RETRIEVE_MESSAGES_OFFSET,
        data: {
            channel: channel,
            increment: n
        }
    };
};
exports.setChannelFetchingNewMessages = function (channel, isFetching) {
    return {
        type: exports.SET_CHANNEL_FETCHING_NEW_MESSAGES,
        data: {
            channelName: channel,
            isFetching: isFetching
        }
    };
};
exports.setChannelHasMoreMessages = function (channelName, hasMore) {
    return {
        type: exports.SET_CHANNEL_HAS_MORE_MESSAGES,
        data: { channelName: channelName, hasMore: hasMore }
    };
};
exports.addReceivedChannelMessage = function (channelName, message) {
    return {
        type: exports.ADD_RECEIVED_CHANNEL_MESSAGE,
        data: { message: message, channelName: channelName }
    };
};
exports.addRetrievedChannelMessages = function (channelName, messages) {
    return {
        type: exports.ADD_RETRIEVED_CHANNEL_MESSAGES,
        data: { channelName: channelName, messages: messages }
    };
};
exports.clearChannelsData = function () {
    return {
        type: exports.CLEAR_CHANNELS_DATA
    };
};
exports.fetchChannels = function () {
    return function (dispatch) {
        return axios_1["default"].get('/api/v1/channels').then(function (res) {
            var channels = res.data.channels.map(function (c) {
                return c.name;
            });
            return dispatch(exports.addChannels(channels));
        })["catch"](function (err) {
            return dispatch(notificationsActions_1.addError('Something went wrong while trying to fetch the channels'));
        });
    };
};
exports.retrieveChannelMessages = function (channelName) {
    return function (dispatch, getState) { return __awaiter(_this, void 0, void 0, function () {
        var channel;
        return __generator(this, function (_a) {
            channel = getState().channels.find(function (c) {
                return c.name === channelName;
            });
            if (!channel || channel.fetchingNewMessages || !channel.hasMoreMessages) {
                dispatch(notificationsActions_1.addError('Something went wrong while trying to fetch messages'));
                return [2, Promise.resolve('Retrieve Channel Messages dispatched with incorrect channel name or while already fetching messages')];
            }
            dispatch(exports.setChannelFetchingNewMessages(channel.name, true));
            return [2, axios_1["default"].get('/api/v1/messages/' + channel.name + '/' + channel.retrieveMessagesOffset).then(function (res) {
                    if (res.data.messages.length === 0) {
                        dispatch(exports.setChannelHasMoreMessages(channel.name, false));
                        return res;
                    }
                    dispatch(exports.incrementChannelRetrieveMessagesOffset(channelName, res.data.messages.length));
                    dispatch(exports.addRetrievedChannelMessages(channel.name, res.data.messages));
                })["catch"](function (err) {
                    dispatch(notificationsActions_1.addError('Something went wrong while trying to fetch messages'));
                }).then(function () {
                    return dispatch(exports.setChannelFetchingNewMessages(channel.name, false));
                })];
        });
    }); };
};
exports.deleteChannel = function (channelName) {
    return function (dispatch) {
        return axios_1["default"].get('/api/v1/channel/delete/' + channelName).
            then(function (res) {
            dispatch(notificationsActions_1.addInfo('Channel deleted'));
            return dispatch(exports.fetchChannels());
        })["catch"](function (err) {
            return dispatch(notificationsActions_1.addError(err.response.data.error));
        });
    };
};
exports.addChannel = function (channelName) {
    return function (dispatch) {
        return axios_1["default"].post('/api/v1/channel/create', {
            channelName: channelName
        }).then(function (res) {
            dispatch(notificationsActions_1.addInfo('Channel created'));
            return dispatch(exports.fetchChannels());
        })["catch"](function (err) {
            return dispatch(notificationsActions_1.addError(err.response.data.error));
        });
    };
};


/***/ }),

/***/ "./src/web/actions/chatUsersActions.ts":
/*!*********************************************!*\
  !*** ./src/web/actions/chatUsersActions.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var axios_1 = __webpack_require__(/*! axios */ "axios");
var notificationsActions_1 = __webpack_require__(/*! ./notificationsActions */ "./src/web/actions/notificationsActions.ts");
exports.UPDATE_CHAT_USERS = 'UPDATE_CHAT_USERS';
exports.ADD_CHAT_USER = 'ADD_USER';
exports.REMOVE_CHAT_USER = 'REMOVE_USER';
exports.updateUsers = function (users) {
    return {
        type: exports.UPDATE_CHAT_USERS,
        data: {
            users: users
        }
    };
};
exports.addUser = function (user) {
    return {
        type: exports.ADD_CHAT_USER,
        data: {
            user: user
        }
    };
};
exports.removeUser = function (email) {
    return {
        type: exports.REMOVE_CHAT_USER,
        data: {
            email: email
        }
    };
};
exports.fetchAllUsers = function () {
    return function (dispatch) {
        return axios_1["default"].get('/api/v1/users').then(function (res) {
            var users = {};
            res.data.users.forEach(function (u) {
                users[u.email] = {
                    role: u.role,
                    name: u.name
                };
            });
            dispatch(exports.updateUsers(users));
            return res;
        })["catch"](function (err) {
            dispatch(notificationsActions_1.addError('Fetching all users failed'));
            return err;
        });
    };
};
exports.createNewUser = function (user) {
};
exports.editUser = function (email, user) {
};
exports.deleteUser = function (email) {
};


/***/ }),

/***/ "./src/web/actions/notificationsActions.ts":
/*!*************************************************!*\
  !*** ./src/web/actions/notificationsActions.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.ADD_ERROR = 'ADD_ERROR';
exports.REMOVE_ERROR = 'REMOVE_ERROR';
exports.CLEAR_ERRORS = 'CLEAR_ERRORS';
exports.ADD_INFO = 'ADD_INFO';
exports.REMOVE_INFO = 'REMOVE_INFO';
exports.CLEAR_INFOS = 'CLEAR_INFOS';
exports.addError = function (error) {
    return {
        type: exports.ADD_ERROR,
        data: error
    };
};
exports.removeError = function (i) {
    return {
        type: exports.REMOVE_ERROR,
        data: i
    };
};
exports.clearErrors = function () {
    return { type: exports.CLEAR_ERRORS };
};
exports.addInfo = function (info) {
    return {
        type: exports.ADD_INFO,
        data: info
    };
};
exports.removeInfo = function (i) {
    return {
        type: exports.REMOVE_INFO,
        data: i
    };
};
exports.clearInfos = function () {
    return {
        type: exports.CLEAR_INFOS
    };
};


/***/ }),

/***/ "./src/web/actions/sidebarActions.ts":
/*!*******************************************!*\
  !*** ./src/web/actions/sidebarActions.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.TOGGLE_SIDEBAR_OPEN = 'TOGGLE_SIDEBAR_OPEN';
exports.toggleSidebarOpen = function () {
    return {
        type: exports.TOGGLE_SIDEBAR_OPEN
    };
};


/***/ }),

/***/ "./src/web/actions/socketActions.ts":
/*!******************************************!*\
  !*** ./src/web/actions/socketActions.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var io = __webpack_require__(/*! socket.io-client */ "socket.io-client");
exports.INIT_WEBSOCKET = 'INIT_WEBSOCKET';
exports.SET_SOCKET_CONNECTED = 'SET_SOCKET_CONNECTED';
exports.SET_SOCKET_CONNECTED_USERS = 'SET_SOCKET_CONNECTED_USERS';
exports.initWebsocket = function (io) {
    return {
        type: exports.INIT_WEBSOCKET,
        data: { io: io }
    };
};
exports.setSocketConnected = function (connected) {
    return {
        type: exports.SET_SOCKET_CONNECTED,
        data: { connected: connected }
    };
};
exports.setSocketConnectedUsers = function (userEmails) {
    return {
        type: exports.SET_SOCKET_CONNECTED_USERS,
        data: { userEmails: userEmails }
    };
};
exports.init = function () {
    return function (dispatch, getState) {
        var socket = io();
        socket.on('connect', function () {
            socket
                .emit('authenticate', { token: getState().user.token })
                .on('authenticated', function () {
                dispatch(exports.setSocketConnected(true));
                console.log('authorized [' + socket.id + ']');
                socket.on('connected users', function (userEmails) {
                    dispatch(exports.setSocketConnectedUsers(userEmails));
                });
            })
                .on('unauthorized', function (msg) {
                dispatch(exports.setSocketConnected(false));
                console.log("unauthorized: " + JSON.stringify(msg.data));
                socket.off('connected uses');
                throw new Error(msg.data.type);
            });
        });
        socket.on('disconnect', function () {
            dispatch(exports.setSocketConnected(false));
            console.log('Disconnected from websocket server, attempting reconnect');
        });
        return dispatch(exports.initWebsocket(socket));
    };
};


/***/ }),

/***/ "./src/web/actions/userActions.ts":
/*!****************************************!*\
  !*** ./src/web/actions/userActions.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var axios_1 = __webpack_require__(/*! axios */ "axios");
var channelsActions_1 = __webpack_require__(/*! ./channelsActions */ "./src/web/actions/channelsActions.ts");
var notificationsActions_1 = __webpack_require__(/*! ./notificationsActions */ "./src/web/actions/notificationsActions.ts");
exports.SET_AUTHORIZED = 'SET_AUTHORIZED';
exports.SET_USER = 'SET_USER';
exports.LOGOUT_USER = 'LOGOUT_USER';
exports.SET_JWT = 'SET_JWT';
exports.setAuthorized = function (authorized) {
    return {
        type: exports.SET_AUTHORIZED,
        data: authorized
    };
};
exports.setUser = function (user) {
    return {
        type: exports.SET_USER,
        data: user
    };
};
exports.logoutUser = function () {
    return {
        type: exports.LOGOUT_USER
    };
};
exports.setJwt = function (token) {
    return {
        type: exports.SET_JWT,
        data: token
    };
};
exports.logout = function () {
    return function (dispatch) {
        dispatch(exports.logoutUser());
        return dispatch(channelsActions_1.clearChannelsData());
    };
};
exports.updateName = function (name, onSuccess) {
    return function (dispatch) {
        return axios_1["default"].post('/api/v1/user/update/name', {
            name: name
        }).then(function (res) {
            dispatch(notificationsActions_1.addInfo('Name updated'));
            if (onSuccess)
                onSuccess();
        })["catch"](function (err) {
            if (err.response && err.response.data.error)
                return dispatch(notificationsActions_1.addError(err.response.data.error));
            console.log('Something went wrong updating user name', err);
            dispatch(notificationsActions_1.addError('Something went wrong while trying to update your name.'));
        });
    };
};
exports.updateEmail = function (email, onSuccess) {
    return function (dispatch) {
        return axios_1["default"].post('/api/v1/user/update/email', {
            email: email
        }).then(function (res) {
            dispatch(notificationsActions_1.addInfo('Email updated'));
            if (onSuccess)
                onSuccess();
        })["catch"](function (err) {
            if (err.response && err.response.data.error)
                return dispatch(notificationsActions_1.addError(err.response.data.error));
            console.log('Something went wrong updating user email', err);
            dispatch(notificationsActions_1.addError('Something went wrong while trying to update your email.'));
        });
    };
};
exports.updatePassword = function (oldPass, newPass, onSuccess) {
    return function (dispatch) {
        return axios_1["default"].post('/api/v1/user/update/password', {
            oldPass: oldPass,
            newPass: newPass
        }).then(function (res) {
            dispatch(notificationsActions_1.addInfo('Password updated'));
            if (onSuccess)
                onSuccess();
        })["catch"](function (err) {
            if (err.response && err.response.data.error)
                return dispatch(notificationsActions_1.addError(err.response.data.error));
            console.log('Something went wrong updating user password', err);
            dispatch(notificationsActions_1.addError('Something went wrong while trying to update your password.'));
        });
    };
};


/***/ }),

/***/ "./src/web/reducers/channels.ts":
/*!**************************************!*\
  !*** ./src/web/reducers/channels.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var channelsActions_1 = __webpack_require__(/*! ../actions/channelsActions */ "./src/web/actions/channelsActions.ts");
var initialState = [];
exports.channelExists = function (channels, channelName) {
    var channel = channels.find(function (c) {
        return c.name === channelName;
    });
    if (!channel)
        return false;
    return channel;
};
function default_1(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case channelsActions_1.ADD_CHANNELS:
            return action.data.channels;
        case channelsActions_1.INCREMENT_CHANNEL_RETRIEVE_MESSAGES_OFFSET: {
            var channel_1 = exports.channelExists(state, action.data.channel);
            var increment_1 = action.data.increment;
            if (!channel_1) {
                console.log('Unknown channel while incrementing messages offset', action);
                return state;
            }
            var newChannels_1 = state.map(function (c) {
                if (c.name === channel_1.name) {
                    c.retrieveMessagesOffset += increment_1;
                }
                return c;
            });
            return newChannels_1;
        }
        case channelsActions_1.SET_CHANNEL_FETCHING_NEW_MESSAGES:
            var channel = exports.channelExists(state, action.data.channelName);
            if (!channel) {
                console.log('Unknown channel while fetching new messages', action);
                return state;
            }
            var newChannels = state.map(function (c) {
                if (c.name === action.data.channelName) {
                    c.fetchingNewMessages = action.data.isFetching;
                }
                return c;
            });
            return newChannels;
        case channelsActions_1.SET_CHANNEL_HAS_MORE_MESSAGES: {
            var channel_2 = exports.channelExists(state, action.data.channelName);
            var hasMore_1 = action.data.hasMore;
            if (!channel_2) {
                console.log('Unknown channel while setting hasMore messages', action);
                return state;
            }
            var newChannels_2 = state.map(function (c) {
                if (c.name === action.data.channelName)
                    c.hasMoreMessages = hasMore_1;
                return c;
            });
            return newChannels_2;
        }
        case channelsActions_1.ADD_RETRIEVED_CHANNEL_MESSAGES: {
            var retrievedMessages_1 = action.data.messages;
            var channelName_1 = action.data.channelName;
            var channel_3 = exports.channelExists(state, channelName_1);
            if (!channel_3) {
                console.log('Unknown channel while adding retrieved channel messages', action);
                return state;
            }
            var newChannels_3 = state.map(function (c) {
                if (c.name === channelName_1)
                    c.messages = retrievedMessages_1.concat(c.messages);
                return c;
            });
            return newChannels_3;
        }
        case channelsActions_1.ADD_RECEIVED_CHANNEL_MESSAGE: {
            var receivedMessage_1 = action.data.message;
            var channelName_2 = action.data.channelName;
            var channel_4 = exports.channelExists(state, channelName_2);
            if (!channel_4) {
                console.log('Unknown channel while adding received message', state, action);
                return state;
            }
            var newChannels_4 = state.map(function (c) {
                if (c.name === channelName_2)
                    c.messages = c.messages.concat([receivedMessage_1]);
                return c;
            });
            return newChannels_4;
        }
        case channelsActions_1.CLEAR_CHANNELS_DATA:
            return [];
        default:
            return state;
    }
}
exports["default"] = default_1;


/***/ }),

/***/ "./src/web/reducers/chatUsers.ts":
/*!***************************************!*\
  !*** ./src/web/reducers/chatUsers.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var chatUsersActions_1 = __webpack_require__(/*! ../actions/chatUsersActions */ "./src/web/actions/chatUsersActions.ts");
var initialState = {};
function default_1(state, action) {
    if (state === void 0) { state = initialState; }
    var _a;
    switch (action.type) {
        case chatUsersActions_1.UPDATE_CHAT_USERS:
            return action.data.users;
        case chatUsersActions_1.ADD_CHAT_USER:
            return Object.assign({}, state, (_a = {},
                _a[action.data.user.email] = {
                    role: action.data.user.role,
                    name: action.data.user.name,
                },
                _a));
        case chatUsersActions_1.REMOVE_CHAT_USER:
            var clone = Object.assign({}, state);
            delete clone[action.data.email];
        default:
            return state;
    }
}
exports["default"] = default_1;


/***/ }),

/***/ "./src/web/reducers/notifications.ts":
/*!*******************************************!*\
  !*** ./src/web/reducers/notifications.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var notificationsActions_1 = __webpack_require__(/*! ../actions/notificationsActions */ "./src/web/actions/notificationsActions.ts");
var initialState = {
    errors: [],
    infos: []
};
function default_1(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case notificationsActions_1.ADD_ERROR:
            return Object.assign({}, state, { errors: state.errors.concat([action.data]) });
        case notificationsActions_1.REMOVE_ERROR:
            var newErrorsArray = state.errors.slice();
            newErrorsArray.splice(action.data, 1);
            return Object.assign({}, state, { errors: newErrorsArray });
        case notificationsActions_1.CLEAR_ERRORS:
            return Object.assign({}, state, { errors: [] });
        case notificationsActions_1.ADD_INFO:
            return Object.assign({}, state, { infos: state.infos.concat([action.data]) });
        case notificationsActions_1.REMOVE_INFO:
            var newInfosArray = state.infos.slice();
            newInfosArray.splice(action.data, 1);
            return Object.assign({}, state, { infos: newInfosArray });
        case notificationsActions_1.CLEAR_INFOS:
            return Object.assign({}, state, { infos: [] });
        default:
            return state;
    }
}
exports["default"] = default_1;


/***/ }),

/***/ "./src/web/reducers/sidebar.ts":
/*!*************************************!*\
  !*** ./src/web/reducers/sidebar.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var sidebarActions_1 = __webpack_require__(/*! ../actions/sidebarActions */ "./src/web/actions/sidebarActions.ts");
var initialState = {
    open: true
};
function default_1(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case sidebarActions_1.TOGGLE_SIDEBAR_OPEN:
            return Object.assign({}, state, { open: !state.open });
        default:
            return state;
    }
}
exports["default"] = default_1;


/***/ }),

/***/ "./src/web/reducers/socket.ts":
/*!************************************!*\
  !*** ./src/web/reducers/socket.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var socketActions_1 = __webpack_require__(/*! ../actions/socketActions */ "./src/web/actions/socketActions.ts");
var initialState = {
    io: null,
    connected: false,
    connectedUserEmails: []
};
function default_1(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case socketActions_1.INIT_WEBSOCKET:
            return Object.assign({}, state, { io: action.data.io });
        case socketActions_1.SET_SOCKET_CONNECTED:
            return Object.assign({}, state, { connected: action.data.connected });
        case socketActions_1.SET_SOCKET_CONNECTED_USERS:
            return Object.assign({}, state, { connectedUserEmails: action.data.userEmails });
        default:
            return state;
    }
}
exports["default"] = default_1;


/***/ }),

/***/ "./src/web/reducers/user.ts":
/*!**********************************!*\
  !*** ./src/web/reducers/user.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var userActions_1 = __webpack_require__(/*! ../actions/userActions */ "./src/web/actions/userActions.ts");
var initialState = {
    authorized: false,
    email: false,
    name: false,
    role: false,
    jwt: false,
};
function default_1(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case userActions_1.SET_AUTHORIZED:
            if (typeof action.data !== 'boolean') {
                console.error('Data must be boolean for SET_AUTHORIZED action');
                return state;
            }
            if (action.data === false)
                return Object.assign({}, state, { authorized: false, email: false });
            return Object.assign({}, state, { authorized: action.data });
        case userActions_1.SET_USER:
            return Object.assign({}, state, action.data);
        case userActions_1.LOGOUT_USER:
            return {
                authorized: false,
                name: false,
                email: false,
                role: false
            };
        case userActions_1.SET_JWT:
            return Object.assign({}, state, { token: action.data });
        default:
            return state;
    }
}
exports["default"] = default_1;


/***/ }),

/***/ "./src/web/store.ts":
/*!**************************!*\
  !*** ./src/web/store.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var redux_1 = __webpack_require__(/*! redux */ "redux");
var redux_thunk_1 = __webpack_require__(/*! redux-thunk */ "redux-thunk");
var redux_logger_1 = __webpack_require__(/*! redux-logger */ "redux-logger");
var user_1 = __webpack_require__(/*! ./reducers/user */ "./src/web/reducers/user.ts");
var channels_1 = __webpack_require__(/*! ./reducers/channels */ "./src/web/reducers/channels.ts");
var notifications_1 = __webpack_require__(/*! ./reducers/notifications */ "./src/web/reducers/notifications.ts");
var sidebar_1 = __webpack_require__(/*! ./reducers/sidebar */ "./src/web/reducers/sidebar.ts");
var socket_1 = __webpack_require__(/*! ./reducers/socket */ "./src/web/reducers/socket.ts");
var chatUsers_1 = __webpack_require__(/*! ./reducers/chatUsers */ "./src/web/reducers/chatUsers.ts");
var env = __webpack_require__(/*! ../../env */ "./env.js");
exports.rootReducer = redux_1.combineReducers({
    user: user_1["default"],
    channels: channels_1["default"],
    notifications: notifications_1["default"],
    sidebar: sidebar_1["default"],
    socket: socket_1["default"],
    chatUsers: chatUsers_1["default"],
});
exports.middleware = env.production || env.disableReduxLogging ?
    redux_1.applyMiddleware(redux_thunk_1["default"]) : redux_1.applyMiddleware(redux_thunk_1["default"], redux_logger_1.createLogger());
exports["default"] = redux_1.createStore(exports.rootReducer, exports.middleware);


/***/ }),

/***/ "./tests/index.ts":
/*!************************!*\
  !*** ./tests/index.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var server_1 = __webpack_require__(/*! ../src/server/server */ "./src/server/server.ts");
exports.app = server_1.app;
var User_1 = __webpack_require__(/*! ../src/server/models/User */ "./src/server/models/User.ts");
var dropAllCollections = function () {
    var p = new Promise(function (resolve, reject) {
        User_1["default"].deleteMany({}, function (err) {
            if (err)
                return reject(err);
            return resolve();
        });
    });
    return p.then()["catch"](function (err) {
        console.error(err);
    });
};
exports.dropAllCollections = dropAllCollections;
var NotImplementedError = new Error('Test not implemented');
exports.NotImplementedError = NotImplementedError;
before('all tests', function (done) {
    console.log(process.version);
    server_1.conn.on('connected', function () {
        console.log('server started');
        done();
    });
});
beforeEach('reset DB', function (done) {
    dropAllCollections().then(function () { return done(); });
});
after('all tests', function (done) {
    dropAllCollections().then(function () {
        console.log('Closing connections');
        server_1.conn.close();
        done();
    });
});
__webpack_require__(/*! ./web/testStore */ "./tests/web/testStore.ts");
__webpack_require__(/*! ./web/testAsyncActions */ "./tests/web/testAsyncActions.ts");
__webpack_require__(/*! ./server/testAuthController */ "./tests/server/testAuthController.ts");
__webpack_require__(/*! ./server/testUserController */ "./tests/server/testUserController.ts");
__webpack_require__(/*! ./server/testMessageController */ "./tests/server/testMessageController.ts");
__webpack_require__(/*! ./server/testChannelController */ "./tests/server/testChannelController.ts");


/***/ }),

/***/ "./tests/server/testAuthController.ts":
/*!********************************************!*\
  !*** ./tests/server/testAuthController.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var request = __webpack_require__(/*! supertest */ "supertest");
var bcryptjs_1 = __webpack_require__(/*! bcryptjs */ "bcryptjs");
var __1 = __webpack_require__(/*! ../ */ "./tests/index.ts");
var User_1 = __webpack_require__(/*! ../../src/server/models/User */ "./src/server/models/User.ts");
var chai_1 = __webpack_require__(/*! chai */ "chai");
var session = __webpack_require__(/*! supertest-session */ "supertest-session");
describe('Auth Controller', function () {
    describe('login', function () {
        beforeEach(function (done) {
            __1.dropAllCollections().then(function () {
                var user = new User_1["default"]({
                    name: 'Adrian',
                    email: 'test@test.com',
                    password: bcryptjs_1.hashSync('test'),
                    role: 'user',
                });
                user.save().then(function (user) { return done(); })["catch"](function (err) {
                    throw err;
                });
            });
        });
        it('should login the user', function (done) {
            request(__1.app)
                .post('/api/v1/login')
                .send({
                email: 'test@test.com',
                password: 'test'
            })
                .expect(200)
                .end(function (err) {
                if (err)
                    return done(err);
                done();
            });
        });
        it('should return the logged-in user details', function (done) {
            request(__1.app)
                .post('/api/v1/login')
                .send({
                email: 'test@test.com',
                password: 'test'
            })
                .expect(200)
                .end(function (err, res) {
                if (err)
                    return done(err);
                var json = JSON.parse(res.text);
                chai_1.assert.strictEqual(json.email, 'test@test.com');
                chai_1.assert.strictEqual(json.role, 'user');
                chai_1.assert.strictEqual(json.name, 'Adrian');
                done();
            });
        });
        it('should return an error if the email does not exist', function (done) {
            request(__1.app)
                .post('/api/v1/login')
                .send({
                email: 'test.does.not.exit@test.com',
                password: 'test'
            })
                .expect(401)
                .end(function (err, res) {
                if (err)
                    return done(err);
                var json = JSON.parse(res.text);
                chai_1.assert.strictEqual(json.error, 'Invalid email or password');
                done();
            });
        });
        it('should return an error if the password does not match the hash', function (done) {
            request(__1.app)
                .post('/api/v1/login')
                .send({
                email: 'test@test.com',
                password: 'test-invalid-password'
            })
                .expect(401)
                .end(function (err, res) {
                if (err)
                    return done(err);
                var json = JSON.parse(res.text);
                chai_1.assert.strictEqual(json.error, 'Invalid email or password');
                done();
            });
        });
        it('should return an error if the email or password is missing', function (done) {
            request(__1.app)
                .post('/api/v1/login')
                .send({
                password: 'test'
            })
                .expect(400)
                .end(function (err, res) {
                if (err)
                    return done(err);
                var json = JSON.parse(res.text);
                chai_1.assert.strictEqual(json.error, 'Please supply an email and password');
                request(__1.app)
                    .post('/api/v1/login')
                    .send({ email: 'test@test.com' })
                    .expect(400)
                    .end(function (err, res) {
                    if (err)
                        return done(err);
                    var json = JSON.parse(res.text);
                    chai_1.assert.strictEqual(json.error, 'Please supply an email and password');
                    done();
                });
            });
        });
        it('should return an error if the email is not valid', function (done) {
            request(__1.app).post('/api/v1/login')
                .send({ email: 'not an email@asdf', password: '1234' })
                .expect(400)
                .end(function (err, res) {
                if (err)
                    return done(err);
                var json = JSON.parse(res.text);
                chai_1.assert.strictEqual(json.error, 'Not a valid email address');
                done();
            });
        });
    });
    describe('register', function () {
        beforeEach(function (done) {
            __1.dropAllCollections().then(function () { return done(); });
        });
        it('should register a user', function (done) {
            request(__1.app).post('/api/v1/register')
                .send({ email: 'test@test.com', password: 'test' })
                .expect(200)
                .end(function (err, res) {
                if (err)
                    return done(err);
                User_1["default"].findByEmail('test@test.com').exec().then(function (user) {
                    if (!user) {
                        chai_1.assert.fail();
                        return done();
                    }
                    done();
                })["catch"](function (err) {
                    return done(err);
                });
            });
        });
        it('should create an admin user if no users exist', function (done) {
            request(__1.app).post('/api/v1/register')
                .send({ email: 'test@test.com', password: 'test' })
                .expect(200)
                .end(function (err, res) {
                if (err)
                    return done(err);
                User_1["default"].findByEmail('test@test.com').exec().then(function (user) {
                    if (!user) {
                        chai_1.assert.fail();
                    }
                    chai_1.assert.strictEqual(user.role, 'admin');
                    done();
                })["catch"](function (err) {
                    return done(err);
                });
            });
        });
        it('should create a regular user if users exist', function (done) {
            var u = new User_1["default"]({
                name: 'test',
                email: 'admin@test.com',
                password: 'password',
                role: 'admin'
            });
            u.save().then(function () {
                request(__1.app).post('/api/v1/register')
                    .send({ email: 'test@test.com', password: 'test' })
                    .expect(200)
                    .end(function (err, res) {
                    if (err)
                        return done(err);
                    User_1["default"].findByEmail('test@test.com').exec().then(function (user) {
                        if (!user) {
                            chai_1.assert.fail();
                        }
                        chai_1.assert.strictEqual(user.role, 'user');
                        done();
                    })["catch"](function (err) {
                        return done(err);
                    });
                });
            });
        });
        it('should return an error if email or password not provided', function (done) {
            request(__1.app).post('/api/v1/register')
                .send({ email: 'test@test.com' })
                .expect(400)
                .end(function (err, res) {
                if (err)
                    return done(err);
                var json = JSON.parse(res.text);
                chai_1.assert.strictEqual(json.error, 'Please supply an email and password');
                request(__1.app).post('/api/v1/register')
                    .send({ password: '123' })
                    .expect(400)
                    .end(function (err, res) {
                    if (err)
                        return done(err);
                    var json = JSON.parse(res.text);
                    chai_1.assert.strictEqual(json.error, 'Please supply an email and password');
                    done();
                });
            });
        });
        it('should return an error if not a valid email', function (done) {
            request(__1.app).post('/api/v1/register')
                .send({ email: 'not an email @ asdlfkj;l', password: '1234' })
                .expect(400)
                .end(function (err, res) {
                if (err)
                    return done(err);
                var json = JSON.parse(res.text);
                chai_1.assert.strictEqual(json.error, 'Not a valid email address');
                done();
            });
        });
    });
    describe('logout', function () {
        var testSession;
        beforeEach(function (done) {
            testSession = session(__1.app);
            __1.dropAllCollections().then(function () {
                var user = new User_1["default"]({
                    name: 'Adrian',
                    email: 'test@test.com',
                    password: bcryptjs_1.hashSync('test'),
                    role: 'user',
                });
                user.save().then(function (user) { return done(); })["catch"](function (err) {
                    throw err;
                });
            });
        });
        it('should log out the user', function (done) {
            testSession.post('/api/v1/login')
                .send({ email: 'test@test.com', password: 'test' }).end(function (err) {
                if (err)
                    return done(err);
                testSession.get('/api/v1/user').send().expect(200).end(function (err) {
                    if (err)
                        return done(err);
                    testSession.get('/api/v1/logout').send().expect(200).end(function (err) {
                        if (err)
                            return done(err);
                        testSession.get('/api/v1/user').send().expect(401).end(done);
                    });
                });
            });
        });
    });
    describe('verify email', function () {
        beforeEach(function (done) {
            __1.dropAllCollections().then(function () { return done(); });
        });
        it('should verify an email given the correct verification link');
        it('should not verify an email with an incorrect verification link');
    });
});


/***/ }),

/***/ "./tests/server/testChannelController.ts":
/*!***********************************************!*\
  !*** ./tests/server/testChannelController.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./tests/server/testMessageController.ts":
/*!***********************************************!*\
  !*** ./tests/server/testMessageController.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./tests/server/testUserController.ts":
/*!********************************************!*\
  !*** ./tests/server/testUserController.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./tests/web/testAsyncActions.ts":
/*!***************************************!*\
  !*** ./tests/web/testAsyncActions.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(/*! mocha */ "mocha");
var axios_1 = __webpack_require__(/*! axios */ "axios");
var chai_1 = __webpack_require__(/*! chai */ "chai");
var axios_mock_adapter_1 = __webpack_require__(/*! axios-mock-adapter */ "axios-mock-adapter");
var redux_mock_store_1 = __webpack_require__(/*! redux-mock-store */ "redux-mock-store");
var redux_thunk_1 = __webpack_require__(/*! redux-thunk */ "redux-thunk");
var userActions_1 = __webpack_require__(/*! ../../src/web/actions/userActions */ "./src/web/actions/userActions.ts");
var notificationsActions_1 = __webpack_require__(/*! ../../src/web/actions/notificationsActions */ "./src/web/actions/notificationsActions.ts");
var socketActions_1 = __webpack_require__(/*! ../../src/web/actions/socketActions */ "./src/web/actions/socketActions.ts");
var channelsActions_1 = __webpack_require__(/*! ../../src/web/actions/channelsActions */ "./src/web/actions/channelsActions.ts");
var chatUsersActions_1 = __webpack_require__(/*! ../../src/web/actions/chatUsersActions */ "./src/web/actions/chatUsersActions.ts");
var mockStoreCreator = redux_mock_store_1["default"]([redux_thunk_1["default"]]);
function getStore(store) {
    if (store === void 0) { store = {}; }
    return mockStoreCreator(store);
}
describe('Async Actions', function () {
    var mockStore;
    var mockAxios;
    before(function () {
        mockAxios = new axios_mock_adapter_1["default"](axios_1["default"]);
    });
    after(function () {
        mockAxios.restore();
    });
    describe('User async actions', function () {
        beforeEach(function () {
            mockStore = getStore();
            mockAxios.reset();
            mockAxios.onAny().reply(200, {});
        });
        it('should handle callback and set info ' +
            'on successful post request to /api/v1/user/update/name', function (done) {
            var name = false;
            mockStore
                .dispatch(userActions_1.updateName('Adrian', function () { return name = 'Adrian'; }))
                .then(function () {
                chai_1.assert.strictEqual(name, 'Adrian');
                var actions = mockStore.getActions();
                chai_1.assert.deepStrictEqual(actions, [{
                        type: notificationsActions_1.ADD_INFO,
                        data: 'Name updated'
                    }]);
                done();
            })["catch"](done);
        });
        it('should set an error on failed post request to /api/v1/user/update/name', function (done) {
            var name = false;
            mockAxios.reset();
            mockAxios.onPost('/api/v1/user/update/name').reply(500, { error: 'Something went wrong' });
            mockStore
                .dispatch(userActions_1.updateName('Adrian', function () { return name = 'Adrian'; }))
                .then(function () {
                chai_1.assert.strictEqual(name, false);
                var actions = mockStore.getActions();
                chai_1.assert.deepStrictEqual(actions, [{
                        type: notificationsActions_1.ADD_ERROR,
                        data: 'Something went wrong'
                    }]);
                done();
            })["catch"](done);
        });
        it('should handle callback and set info ' +
            'on successful post request to /api/v1/user/update/email', function (done) {
            var email = false;
            mockStore
                .dispatch(userActions_1.updateEmail('test@test.com', function () { return email = 'test@test.com'; }))
                .then(function () {
                chai_1.assert.strictEqual(email, 'test@test.com');
                var actions = mockStore.getActions();
                chai_1.assert.deepStrictEqual(actions, [{
                        type: notificationsActions_1.ADD_INFO,
                        data: 'Email updated'
                    }]);
                done();
            })["catch"](done);
        });
        it('should set an error on failed post request to /api/v1/user/update/email', function (done) {
            var email = false;
            mockAxios.reset();
            mockAxios.onPost('/api/v1/user/update/email').reply(500, { error: 'Something went wrong' });
            mockStore
                .dispatch(userActions_1.updateEmail('test@test.com', function () { return email = 'test@test.com'; }))
                .then(function () {
                chai_1.assert.isFalse(email);
                var actions = mockStore.getActions();
                chai_1.assert.deepStrictEqual(actions, [{
                        type: notificationsActions_1.ADD_ERROR,
                        data: 'Something went wrong'
                    }]);
                done();
            })["catch"](done);
        });
        it('should set info on successful post request to /api/v1/user/update/password', function (done) {
            var updated = false;
            mockStore.dispatch(userActions_1.updatePassword('a', 'b', function () { return updated = true; }))
                .then(function () {
                chai_1.assert.isTrue(updated);
                var actions = mockStore.getActions();
                chai_1.assert.deepStrictEqual(actions, [{
                        type: notificationsActions_1.ADD_INFO,
                        data: 'Password updated'
                    }]);
                done();
            })["catch"](done);
        });
        it('should set an error on failed post request to /api/v1/user/update/password', function (done) {
            var updated = false;
            mockAxios.reset();
            mockAxios.onPost('/api/v1/user/update/password').reply(500, { error: 'Something went wrong' });
            mockStore.dispatch(userActions_1.updatePassword('a', 'b', function () { return updated = true; }))
                .then(function () {
                chai_1.assert.isFalse(updated);
                var actions = mockStore.getActions();
                chai_1.assert.deepStrictEqual(actions, [{
                        type: notificationsActions_1.ADD_ERROR,
                        data: 'Something went wrong'
                    }]);
                done();
            })["catch"](done);
        });
    });
    describe('Channels async actions', function () {
        beforeEach(function () {
            mockStore = mockStoreCreator({
                channels: [
                    { name: 'general', fetchingNewMessages: false, hasMoreMessages: true, retrieveMessagesOffset: 0 },
                    { name: 'fetching new messages', fetchingNewMessages: true, hasMoreMessages: true },
                    { name: 'no more messages', fetchingNewMessages: false, hasMoreMessages: false }
                ]
            });
            mockAxios.reset();
            mockAxios.onAny().reply(200, {});
        });
        it('should fetch channels and dispatch addChannels with an array of channel names', function (done) {
            var channels = [
                { _id: '1', name: 'general' },
                { _id: '2', name: 'random' },
                { _id: '3', name: 'something else' }
            ];
            mockAxios.reset();
            mockAxios
                .onGet('/api/v1/channels')
                .reply(200, { channels: channels });
            mockStore
                .dispatch(channelsActions_1.fetchChannels())
                .then(function () {
                var actions = mockStore.getActions();
                var addChannelsAction = channelsActions_1.addChannels(['general', 'random', 'something else']);
                chai_1.assert.deepStrictEqual(actions, [addChannelsAction]);
                done();
            })["catch"](done);
        });
        it('should dispatch addError on failed request to /api/v1/channels', function (done) {
            mockAxios.reset();
            mockAxios
                .onGet('/api/v1/channels')
                .reply(500);
            mockStore
                .dispatch(channelsActions_1.fetchChannels())
                .then(function () {
                var actions = mockStore.getActions();
                var errorAction = notificationsActions_1.addError('Something went wrong while trying to fetch the channels');
                chai_1.assert.deepStrictEqual(actions, [errorAction]);
                done();
            })["catch"](done);
        });
        it('should dispatch an error if retrieving messages with invalid channel name', function (done) {
            mockStore
                .dispatch(channelsActions_1.retrieveChannelMessages('invalid name'))
                .then(function (msg) {
                chai_1.assert.strictEqual(msg, 'Retrieve Channel Messages dispatched with incorrect channel name or while already fetching messages');
                var actions = mockStore.getActions();
                var errorAction = notificationsActions_1.addError('Something went wrong while trying to fetch messages');
                chai_1.assert.deepStrictEqual(actions, [errorAction]);
                done();
            })["catch"](done);
        });
        it('should dispatch an error if already retrieving channel messages', function (done) {
            mockStore
                .dispatch(channelsActions_1.retrieveChannelMessages('fetching new messages'))
                .then(function (msg) {
                chai_1.assert.strictEqual(msg, 'Retrieve Channel Messages dispatched with incorrect channel name or while already fetching messages');
                var actions = mockStore.getActions();
                var errorAction = notificationsActions_1.addError('Something went wrong while trying to fetch messages');
                chai_1.assert.deepStrictEqual(actions, [errorAction]);
                done();
            })["catch"](done);
        });
        it('should dispatch an error if channel does not have older messages', function (done) {
            mockStore
                .dispatch(channelsActions_1.retrieveChannelMessages('no more messages'))
                .then(function (msg) {
                chai_1.assert.strictEqual(msg, 'Retrieve Channel Messages dispatched with incorrect channel name or while already fetching messages');
                var actions = mockStore.getActions();
                var errorAction = notificationsActions_1.addError('Something went wrong while trying to fetch messages');
                chai_1.assert.deepStrictEqual(actions, [errorAction]);
                done();
            })["catch"](done);
        });
        it('should dispatch an error on failed get request to /api/v1/messages/', function (done) {
            mockAxios.reset();
            mockAxios
                .onGet()
                .reply(500);
            var channel = 'general';
            mockStore
                .dispatch(channelsActions_1.retrieveChannelMessages(channel))
                .then(function () {
                var actions = mockStore.getActions();
                var setFetchingTrueAction = channelsActions_1.setChannelFetchingNewMessages(channel, true);
                var errorAction = notificationsActions_1.addError('Something went wrong while trying to fetch messages');
                var setFetchingFalseAction = channelsActions_1.setChannelFetchingNewMessages(channel, false);
                chai_1.assert.deepStrictEqual(actions, [setFetchingTrueAction, errorAction, setFetchingFalseAction]);
                done();
            })["catch"](done);
        });
        it('should set channelHasMoreMessages on response with empty array', function (done) {
            mockAxios.reset();
            mockAxios
                .onGet()
                .reply(200, { messages: [] });
            var channel = 'general';
            mockStore
                .dispatch(channelsActions_1.retrieveChannelMessages(channel))
                .then(function () {
                var actions = mockStore.getActions();
                var setFetchingTrueAction = channelsActions_1.setChannelFetchingNewMessages(channel, true);
                var setHasMoreAction = channelsActions_1.setChannelHasMoreMessages(channel, false);
                var setFetchingFalseAction = channelsActions_1.setChannelFetchingNewMessages(channel, false);
                chai_1.assert.deepStrictEqual(actions, [setFetchingTrueAction, setHasMoreAction, setFetchingFalseAction]);
                done();
            })["catch"](done);
        });
        it('should increment offset (based on number of received messages) and add retrieved channel messages on successful retreiveChannelMessages action', function (done) {
            var channel = 'general';
            var messages = [{
                    text: '123',
                    created: Date.now().toString(),
                    userEmail: 'test@test.com',
                    _id: '1'
                }, {
                    text: '456',
                    created: Date.now().toString(),
                    userEmail: 'test@test.com',
                    _id: '2'
                }];
            mockAxios.reset();
            mockAxios
                .onGet()
                .reply(200, { messages: messages });
            mockStore
                .dispatch(channelsActions_1.retrieveChannelMessages(channel))
                .then(function () {
                var actions = mockStore.getActions();
                var setFetchingTrueAction = channelsActions_1.setChannelFetchingNewMessages(channel, true);
                var incrementOffsetAction = channelsActions_1.incrementChannelRetrieveMessagesOffset(channel, messages.length);
                var addMessagesAction = channelsActions_1.addRetrievedChannelMessages(channel, messages);
                var setFetchingFalseAction = channelsActions_1.setChannelFetchingNewMessages(channel, false);
                chai_1.assert.deepStrictEqual(actions, [
                    setFetchingTrueAction,
                    incrementOffsetAction,
                    addMessagesAction,
                    setFetchingFalseAction
                ]);
                done();
            })["catch"](done);
        });
        it('should dispatch info on successfully deleting channel', function (done) {
            var channels = [
                { _id: '1', name: 'general' },
                { _id: '2', name: 'random' },
                { _id: '3', name: 'something else' }
            ];
            mockAxios.reset();
            mockAxios
                .onGet('/api/v1/channels')
                .reply(200, { channels: channels });
            mockAxios
                .onGet()
                .reply(200);
            mockStore
                .dispatch(channelsActions_1.deleteChannel('general'))
                .then(function () {
                var actions = mockStore.getActions();
                var addInfoAction = notificationsActions_1.addInfo('Channel deleted');
                var addChannelsAction = channelsActions_1.addChannels(['general', 'random', 'something else']);
                chai_1.assert.deepStrictEqual(actions, [addInfoAction, addChannelsAction]);
                done();
            })["catch"](done);
        });
        it('should dispatch an error on failed attempt to delete channel', function (done) {
            mockAxios.reset();
            mockAxios
                .onGet()
                .reply(500, { error: 'Something went wrong' });
            mockStore
                .dispatch(channelsActions_1.deleteChannel('general'))
                .then(function () {
                var actions = mockStore.getActions();
                var addErrorAction = notificationsActions_1.addError('Something went wrong');
                chai_1.assert.deepStrictEqual(actions, [addErrorAction]);
                done();
            })["catch"](done);
        });
        it('should dispatch info on creating new channel', function (done) {
            var channels = [
                { _id: '1', name: 'general' },
                { _id: '2', name: 'random' },
                { _id: '3', name: 'something else' }
            ];
            mockAxios.reset();
            mockAxios
                .onGet('/api/v1/channels')
                .reply(200, { channels: channels });
            mockAxios
                .onPost()
                .reply(200);
            mockStore
                .dispatch(channelsActions_1.addChannel('new channel'))
                .then(function () {
                var actions = mockStore.getActions();
                var addInfoAction = notificationsActions_1.addInfo('Channel created');
                var addChannelsAction = channelsActions_1.addChannels(['general', 'random', 'something else']);
                chai_1.assert.deepStrictEqual(actions, [addInfoAction, addChannelsAction]);
                done();
            })["catch"](done);
        });
        it('should dispatch an error on failed attempt to create a new channel', function (done) {
            mockAxios.reset();
            mockAxios
                .onAny()
                .reply(500, { error: 'Something went wrong' });
            mockStore
                .dispatch(channelsActions_1.addChannel('new channel'))
                .then(function () {
                var actions = mockStore.getActions();
                var addErrorAction = notificationsActions_1.addError('Something went wrong');
                chai_1.assert.deepStrictEqual(actions, [addErrorAction]);
                done();
            })["catch"](done);
        });
    });
    describe('Socket async actions', function () {
        beforeEach(function () {
            mockStore = getStore();
        });
        it('should initialize websocket connection', function () {
            mockStore.dispatch(socketActions_1.init());
            var actions = mockStore.getActions();
            chai_1.assert.strictEqual(actions[0].type, socketActions_1.INIT_WEBSOCKET);
            actions[0].data.io.close();
        });
    });
    describe('Chat Users async actions', function () {
        beforeEach(function () {
            mockStore = getStore();
        });
        it('should dipatch updateUsers on fetch all users', function (done) {
            var usersResponse = [{
                    email: 'test@test.com',
                    role: 'admin',
                    name: 'test'
                }, {
                    email: 'test2@test.com',
                    role: 'general',
                    name: 'test'
                }];
            var users = {};
            usersResponse.forEach(function (u) {
                users[u.email] = {
                    name: u.name,
                    role: u.role
                };
            });
            mockAxios.reset();
            mockAxios.onAny().reply(200, { users: usersResponse });
            mockStore
                .dispatch(chatUsersActions_1.fetchAllUsers())
                .then(function () {
                var actions = mockStore.getActions();
                var updateUsersAction = chatUsersActions_1.updateUsers(users);
                chai_1.assert.deepStrictEqual(actions, [updateUsersAction]);
                done();
            })["catch"](done);
        });
        it('should dispatch addError on failed attempt to fetch users', function (done) {
            mockAxios.reset();
            mockAxios.onAny().reply(500);
            mockStore
                .dispatch(chatUsersActions_1.fetchAllUsers())
                .then(function () {
                var actions = mockStore.getActions();
                var addErrorAction = notificationsActions_1.addError('Fetching all users failed');
                chai_1.assert.deepStrictEqual(actions, [addErrorAction]);
                done();
            })["catch"](done);
        });
        it('should create a new user');
        it('should edit the user');
        it('should delete the user');
    });
});


/***/ }),

/***/ "./tests/web/testStore.ts":
/*!********************************!*\
  !*** ./tests/web/testStore.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var chai_1 = __webpack_require__(/*! chai */ "chai");
__webpack_require__(/*! mocha */ "mocha");
var socketioclient = __webpack_require__(/*! socket.io-client */ "socket.io-client");
var store_1 = __webpack_require__(/*! ../../src/web/store */ "./src/web/store.ts");
var redux_1 = __webpack_require__(/*! redux */ "redux");
var userActions_1 = __webpack_require__(/*! ../../src/web/actions/userActions */ "./src/web/actions/userActions.ts");
var channelsActions_1 = __webpack_require__(/*! ../../src/web/actions/channelsActions */ "./src/web/actions/channelsActions.ts");
var notificationsActions_1 = __webpack_require__(/*! ../../src/web/actions/notificationsActions */ "./src/web/actions/notificationsActions.ts");
var sidebarActions_1 = __webpack_require__(/*! ../../src/web/actions/sidebarActions */ "./src/web/actions/sidebarActions.ts");
var socketActions_1 = __webpack_require__(/*! ../../src/web/actions/socketActions */ "./src/web/actions/socketActions.ts");
var chatUsersActions_1 = __webpack_require__(/*! ../../src/web/actions/chatUsersActions */ "./src/web/actions/chatUsersActions.ts");
function getStore() {
    return redux_1.createStore(store_1.rootReducer, store_1.middleware);
}
describe('Store and Synchronous Actions', function () {
    describe('User State', function () {
        var store;
        var user;
        beforeEach(function () {
            store = getStore();
            user = function () { return store.getState().user; };
        });
        it('should not be authorized', function () {
            chai_1.assert.isFalse(user().authorized);
            chai_1.assert.isFalse(user().email);
            chai_1.assert.isFalse(user().name);
            chai_1.assert.isFalse(user().role);
        });
        it('should be authorized after setAuthorized action', function () {
            chai_1.assert.isFalse(user().authorized);
            store.dispatch(userActions_1.setAuthorized(true));
            chai_1.assert.isTrue(user().authorized);
            store.dispatch(userActions_1.setAuthorized(false));
            chai_1.assert.isFalse(user().authorized);
        });
        it('should have user data after setting the user', function () {
            chai_1.assert.isFalse(user().authorized);
            chai_1.assert.isFalse(user().email);
            chai_1.assert.isFalse(user().name);
            chai_1.assert.isFalse(user().role);
            store.dispatch(userActions_1.setUser({
                authorized: true,
                email: 'test@test.com',
                name: 'Jane Doe',
                role: 'admin'
            }));
            chai_1.assert.isTrue(user().authorized);
            chai_1.assert.strictEqual(user().email, 'test@test.com');
            chai_1.assert.strictEqual(user().name, 'Jane Doe');
            chai_1.assert.strictEqual(user().role, 'admin');
            store.dispatch(userActions_1.setUser({
                authorized: false,
                email: false,
                name: false,
                role: false
            }));
            chai_1.assert.isFalse(user().authorized);
            chai_1.assert.isFalse(user().email);
            chai_1.assert.isFalse(user().name);
            chai_1.assert.isFalse(user().role);
        });
        it('should not have user data after logging out', function () {
            store.dispatch(userActions_1.setUser({
                authorized: true,
                email: 'test@test.com',
                name: 'Jane Doe',
                role: 'admin'
            }));
            store.dispatch(userActions_1.logoutUser());
            store.dispatch(userActions_1.setUser({
                authorized: false,
                email: false,
                name: false,
                role: false
            }));
        });
    });
    describe('Channels State', function () {
        var store;
        var channels;
        beforeEach(function () {
            store = getStore();
            channels = function () { return store.getState().channels; };
        });
        it('should add channels from an array of channel names', function () {
            store.dispatch(channelsActions_1.addChannels(['general', 'random', 'something else']));
            var c0 = channels()[0];
            var c1 = channels()[1];
            var c2 = channels()[2];
            chai_1.assert.deepStrictEqual(c0, {
                name: 'general',
                messages: [],
                retrieveMessagesOffset: 0,
                hasMoreMessages: true,
                fetchingNewMessages: false,
            });
            chai_1.assert.deepStrictEqual(c1, {
                name: 'random',
                messages: [],
                retrieveMessagesOffset: 0,
                hasMoreMessages: true,
                fetchingNewMessages: false,
            });
            chai_1.assert.deepStrictEqual(c2, {
                name: 'something else',
                messages: [],
                retrieveMessagesOffset: 0,
                hasMoreMessages: true,
                fetchingNewMessages: false,
            });
        });
        it('should update fetchingNewMessages after calling setChannelFetchingNewMessages action', function () {
            store.dispatch(channelsActions_1.addChannels(['general', 'random', 'something else']));
            channels().forEach(function (c) {
                chai_1.assert.isFalse(c.fetchingNewMessages);
                store.dispatch(channelsActions_1.setChannelFetchingNewMessages(c.name, true));
            });
            channels().forEach(function (c) {
                chai_1.assert.isTrue(c.fetchingNewMessages);
                store.dispatch(channelsActions_1.setChannelFetchingNewMessages(c.name, false));
            });
            channels().forEach(function (c) {
                chai_1.assert.isFalse(c.fetchingNewMessages);
            });
        });
        it('should increment the channel offset for retrieving new messages', function () {
            store.dispatch(channelsActions_1.addChannels(['general', 'random', 'something else']));
            chai_1.assert.strictEqual(channels().find(function (e) { return e.name === 'general'; }).retrieveMessagesOffset, 0);
            chai_1.assert.strictEqual(channels().find(function (e) { return e.name === 'random'; }).retrieveMessagesOffset, 0);
            chai_1.assert.strictEqual(channels().find(function (e) { return e.name === 'something else'; }).retrieveMessagesOffset, 0);
            store.dispatch(channelsActions_1.incrementChannelRetrieveMessagesOffset('general', 20));
            chai_1.assert.strictEqual(channels().find(function (e) { return e.name === 'general'; }).retrieveMessagesOffset, 20);
            store.dispatch(channelsActions_1.incrementChannelRetrieveMessagesOffset('general', 1));
            chai_1.assert.strictEqual(channels().find(function (e) { return e.name === 'general'; }).retrieveMessagesOffset, 21);
            store.dispatch(channelsActions_1.incrementChannelRetrieveMessagesOffset('random', 1));
            chai_1.assert.strictEqual(channels().find(function (e) { return e.name === 'random'; }).retrieveMessagesOffset, 1);
            store.dispatch(channelsActions_1.incrementChannelRetrieveMessagesOffset('something else', 1));
            chai_1.assert.strictEqual(channels().find(function (e) { return e.name === 'something else'; }).retrieveMessagesOffset, 1);
        });
        it('should update the hasMoreMessages property on a channel', function () {
            store.dispatch(channelsActions_1.addChannels(['general', 'random', 'something else']));
            chai_1.assert.isTrue(channels().find(function (e) { return e.name === 'general'; }).hasMoreMessages);
            chai_1.assert.isTrue(channels().find(function (e) { return e.name === 'random'; }).hasMoreMessages);
            chai_1.assert.isTrue(channels().find(function (e) { return e.name === 'something else'; }).hasMoreMessages);
            store.dispatch(channelsActions_1.setChannelHasMoreMessages('general', false));
            store.dispatch(channelsActions_1.setChannelHasMoreMessages('random', false));
            store.dispatch(channelsActions_1.setChannelHasMoreMessages('something else', false));
            chai_1.assert.isFalse(channels().find(function (e) { return e.name === 'general'; }).hasMoreMessages);
            chai_1.assert.isFalse(channels().find(function (e) { return e.name === 'random'; }).hasMoreMessages);
            chai_1.assert.isFalse(channels().find(function (e) { return e.name === 'something else'; }).hasMoreMessages);
        });
        it('should add a received message to the appropriate channel', function () {
            store.dispatch(channelsActions_1.addChannels(['general', 'random', 'something else']));
            var message = {
                userEmail: 'test@test.com',
                created: Date.now().toString(),
                _id: '1',
                text: 'this is the message',
            };
            store.dispatch(channelsActions_1.addReceivedChannelMessage('general', message));
            store.dispatch(channelsActions_1.addReceivedChannelMessage('random', message));
            store.dispatch(channelsActions_1.addReceivedChannelMessage('random', message));
            store.dispatch(channelsActions_1.addReceivedChannelMessage('something else', message));
            store.dispatch(channelsActions_1.addReceivedChannelMessage('something else', message));
            store.dispatch(channelsActions_1.addReceivedChannelMessage('something else', message));
            var generalMessages = channels().find(function (e) { return e.name === 'general'; }).messages;
            chai_1.assert.deepStrictEqual(generalMessages.length, 1);
            chai_1.assert.deepStrictEqual(generalMessages, [message]);
            var randomMessages = channels().find(function (e) { return e.name === 'random'; }).messages;
            chai_1.assert.deepStrictEqual(randomMessages.length, 2);
            chai_1.assert.deepStrictEqual(randomMessages, [message, message]);
            var otherMessages = channels().find(function (e) { return e.name === 'something else'; }).messages;
            chai_1.assert.deepStrictEqual(otherMessages.length, 3);
            chai_1.assert.deepStrictEqual(otherMessages, [message, message, message]);
        });
        it('should add retreived messages to the appropriate channel', function () {
            store.dispatch(channelsActions_1.addChannels(['general', 'random', 'something else']));
            var messages = [
                { "text": "Something here", "created": "2019-04-13T16:45:28.946Z", "userEmail": "abkothman@gmail.com", "_id": "5cb212281d645a22abea8dbe" },
                { "text": "12341234", "created": "2019-04-14T22:34:06.686Z", "userEmail": "abkothman@gmail.com", "_id": "5cb3b55ecbf68c6a954eafb3" },
                { "text": "test one two three", "created": "2019-04-14T22:34:10.903Z", "userEmail": "abkothman@gmail.com", "_id": "5cb3b562cbf68c6a954eafb4" }
            ];
            store.dispatch(channelsActions_1.addRetrievedChannelMessages('general', messages));
            store.dispatch(channelsActions_1.addRetrievedChannelMessages('random', messages));
            store.dispatch(channelsActions_1.addRetrievedChannelMessages('random', messages));
            var channelState = channels();
            chai_1.assert.deepStrictEqual(channelState
                .find(function (c) { return c.name === 'general'; })
                .messages, messages);
            chai_1.assert.deepStrictEqual(channelState
                .find(function (c) { return c.name === 'random'; })
                .messages, messages.concat(messages));
            chai_1.assert.deepStrictEqual(channelState
                .find(function (c) { return c.name === 'something else'; })
                .messages, []);
        });
        it('should clear all channel data', function () {
            store.dispatch(channelsActions_1.addChannels(['general', 'random', 'something else']));
            var messages = [
                { "text": "Something here", "created": "2019-04-13T16:45:28.946Z", "userEmail": "abkothman@gmail.com", "_id": "5cb212281d645a22abea8dbe" },
                { "text": "12341234", "created": "2019-04-14T22:34:06.686Z", "userEmail": "abkothman@gmail.com", "_id": "5cb3b55ecbf68c6a954eafb3" },
                { "text": "test one two three", "created": "2019-04-14T22:34:10.903Z", "userEmail": "abkothman@gmail.com", "_id": "5cb3b562cbf68c6a954eafb4" }
            ];
            store.dispatch(channelsActions_1.addRetrievedChannelMessages('general', messages));
            store.dispatch(channelsActions_1.addRetrievedChannelMessages('random', messages));
            store.dispatch(channelsActions_1.addRetrievedChannelMessages('random', messages));
            store.dispatch(channelsActions_1.clearChannelsData());
            var channelState = channels();
            chai_1.assert.deepStrictEqual(channelState, []);
        });
    });
    describe('Notifications State', function () {
        var store;
        var notifications;
        beforeEach(function () {
            store = getStore();
            notifications = function () { return store.getState().notifications; };
        });
        it('should add errors', function () {
            chai_1.assert.deepStrictEqual(notifications().errors, []);
            store.dispatch(notificationsActions_1.addError('Test error'));
            chai_1.assert.deepStrictEqual(notifications().errors, ['Test error']);
            store.dispatch(notificationsActions_1.addError('Another error'));
            chai_1.assert.deepStrictEqual(notifications().errors, ['Test error', 'Another error']);
        });
        it('should remove errors given an index', function () {
            store.dispatch(notificationsActions_1.addError('Test error'));
            store.dispatch(notificationsActions_1.addError('Another error'));
            chai_1.assert.deepStrictEqual(notifications().errors, ['Test error', 'Another error']);
            store.dispatch(notificationsActions_1.removeError(1));
            chai_1.assert.deepStrictEqual(notifications().errors, ['Test error']);
            store.dispatch(notificationsActions_1.removeError(0));
            chai_1.assert.deepStrictEqual(notifications().errors, []);
        });
        it('should clear errors', function () {
            store.dispatch(notificationsActions_1.addError('Test error'));
            store.dispatch(notificationsActions_1.addError('Another error'));
            store.dispatch(notificationsActions_1.clearErrors());
            chai_1.assert.deepStrictEqual(notifications().errors, []);
        });
        it('should add info', function () {
            chai_1.assert.deepStrictEqual(notifications().infos, []);
            store.dispatch(notificationsActions_1.addInfo('Test info'));
            chai_1.assert.deepStrictEqual(notifications().infos, ['Test info']);
            store.dispatch(notificationsActions_1.addInfo('Another info'));
            chai_1.assert.deepStrictEqual(notifications().infos, ['Test info', 'Another info']);
        });
        it('should remove info given an index', function () {
            store.dispatch(notificationsActions_1.addInfo('Test info'));
            store.dispatch(notificationsActions_1.addInfo('Another info'));
            store.dispatch(notificationsActions_1.removeInfo(1));
            chai_1.assert.deepStrictEqual(notifications().infos, ['Test info']);
            store.dispatch(notificationsActions_1.removeInfo(0));
            chai_1.assert.deepStrictEqual(notifications().infos, []);
        });
        it('should clear infos', function () {
            store.dispatch(notificationsActions_1.addInfo('Test info'));
            store.dispatch(notificationsActions_1.addInfo('Another info'));
            store.dispatch(notificationsActions_1.clearInfos());
            chai_1.assert.deepStrictEqual(notifications().infos, []);
        });
    });
    describe('Sidebar State', function () {
        var store;
        var sidebar;
        beforeEach(function () {
            store = getStore();
            sidebar = function () { return store.getState().sidebar; };
        });
        it('should toggle open state', function () {
            chai_1.assert.isTrue(sidebar().open);
            store.dispatch(sidebarActions_1.toggleSidebarOpen());
            chai_1.assert.isFalse(sidebar().open);
            store.dispatch(sidebarActions_1.toggleSidebarOpen());
            chai_1.assert.isTrue(sidebar().open);
            store.dispatch(sidebarActions_1.toggleSidebarOpen());
            chai_1.assert.isFalse(sidebar().open);
        });
    });
    describe('Socket State', function () {
        var store;
        var socket;
        beforeEach(function () {
            store = getStore();
            socket = function () { return store.getState().socket; };
        });
        it('should set the socket given a SocketIOClient Socket', function () {
            chai_1.assert.deepStrictEqual(socket(), {
                io: null,
                connected: false,
                connectedUserEmails: []
            });
            var socketio = socketioclient();
            store.dispatch(socketActions_1.initWebsocket(socketio));
            chai_1.assert.deepStrictEqual(socket(), {
                io: socketio,
                connected: false,
                connectedUserEmails: []
            });
            socketio.close();
        });
        it('should update the connected state', function () {
            store.dispatch(socketActions_1.setSocketConnected(true));
            chai_1.assert.deepStrictEqual(socket(), {
                io: null,
                connected: true,
                connectedUserEmails: []
            });
            store.dispatch(socketActions_1.setSocketConnected(false));
            chai_1.assert.deepStrictEqual(socket(), {
                io: null,
                connected: false,
                connectedUserEmails: []
            });
        });
        it('should update the connected users', function () {
            var emails = ['test@test.com', 'test2@test.com'];
            store.dispatch(socketActions_1.setSocketConnectedUsers(emails));
            chai_1.assert.deepStrictEqual(socket(), {
                io: null,
                connected: false,
                connectedUserEmails: emails
            });
        });
    });
    describe('Chat Users State', function () {
        var store;
        var chatUsers;
        beforeEach(function () {
            store = getStore();
            chatUsers = function () { return store.getState().chatUsers; };
        });
        it('should update users', function () {
            var users = {
                'test@test.com': {
                    role: 'user',
                    name: 'Test Name'
                },
                'test2@test.com': {
                    role: 'admin',
                    name: 'Another test'
                },
                'test3@test.com': {
                    role: 'admin',
                    name: 'Last test'
                }
            };
            store.dispatch(chatUsersActions_1.updateUsers(users));
            chai_1.assert.deepStrictEqual(chatUsers(), users);
        });
        it('should add a user');
        it('should remove a user');
    });
});


/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "axios-mock-adapter":
/*!*************************************!*\
  !*** external "axios-mock-adapter" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios-mock-adapter");

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

/***/ "chai":
/*!***********************!*\
  !*** external "chai" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("chai");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),

/***/ "connect-mongo":
/*!********************************!*\
  !*** external "connect-mongo" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("connect-mongo");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

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

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mocha":
/*!************************!*\
  !*** external "mocha" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mocha");

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

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "redux-logger":
/*!*******************************!*\
  !*** external "redux-logger" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-logger");

/***/ }),

/***/ "redux-mock-store":
/*!***********************************!*\
  !*** external "redux-mock-store" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-mock-store");

/***/ }),

/***/ "redux-thunk":
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),

/***/ "socket.io-client":
/*!***********************************!*\
  !*** external "socket.io-client" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socket.io-client");

/***/ }),

/***/ "socketio-jwt":
/*!*******************************!*\
  !*** external "socketio-jwt" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socketio-jwt");

/***/ }),

/***/ "supertest":
/*!****************************!*\
  !*** external "supertest" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("supertest");

/***/ }),

/***/ "supertest-session":
/*!************************************!*\
  !*** external "supertest-session" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("supertest-session");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZW52LmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvY29udHJvbGxlcnMvYXV0aENvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9jb250cm9sbGVycy9jaGFubmVsQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2NvbnRyb2xsZXJzL21lc3NhZ2VDb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvY29udHJvbGxlcnMvdXNlckNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9taWRkbGV3YXJlL2F1dGhvcml6ZWQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9tb2RlbHMvQ2hhbm5lbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21vZGVscy9NZXNzYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbW9kZWxzL1VzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9yb3V0ZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9zZXJ2ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9zb2NrZXQuaW8vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9hY3Rpb25zL2NoYW5uZWxzQWN0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL2FjdGlvbnMvY2hhdFVzZXJzQWN0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL2FjdGlvbnMvbm90aWZpY2F0aW9uc0FjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9hY3Rpb25zL3NpZGViYXJBY3Rpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy93ZWIvYWN0aW9ucy9zb2NrZXRBY3Rpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy93ZWIvYWN0aW9ucy91c2VyQWN0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL3JlZHVjZXJzL2NoYW5uZWxzLnRzIiwid2VicGFjazovLy8uL3NyYy93ZWIvcmVkdWNlcnMvY2hhdFVzZXJzLnRzIiwid2VicGFjazovLy8uL3NyYy93ZWIvcmVkdWNlcnMvbm90aWZpY2F0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL3JlZHVjZXJzL3NpZGViYXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9yZWR1Y2Vycy9zb2NrZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9yZWR1Y2Vycy91c2VyLnRzIiwid2VicGFjazovLy8uL3NyYy93ZWIvc3RvcmUudHMiLCJ3ZWJwYWNrOi8vLy4vdGVzdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vdGVzdHMvc2VydmVyL3Rlc3RBdXRoQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi90ZXN0cy93ZWIvdGVzdEFzeW5jQWN0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi90ZXN0cy93ZWIvdGVzdFN0b3JlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3MtbW9jay1hZGFwdGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmNyeXB0anNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNoYWlcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb21wcmVzc2lvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvbm5lY3QtbW9uZ29cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb29raWUtcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY3N1cmZcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzcy1zZXNzaW9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaGVsbWV0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImpzb253ZWJ0b2tlblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vY2hhXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9uZ29vc2VcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtdXN0YWNoZS1leHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtbG9nZ2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtbW9jay1zdG9yZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LXRodW5rXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic29ja2V0LmlvXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic29ja2V0LmlvLWNsaWVudFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvY2tldGlvLWp3dFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInN1cGVydGVzdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInN1cGVydGVzdC1zZXNzaW9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidmFsaWRhdG9yXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QSxzQzs7Ozs7Ozs7Ozs7QUNBQSw4Qzs7Ozs7Ozs7Ozs7QUNBQSxzQyIsImZpbGUiOiJhbGwtdGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3Rlc3RzL2luZGV4LnRzXCIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgLy8gaHR0cHM6Ly9kb2NzLm1vbmdvZGIuY29tL21hbnVhbC9yZWZlcmVuY2UvY29ubmVjdGlvbi1zdHJpbmcvXG4gICAgbW9uZ29kYkNvbm5lY3Rpb25Vcmk6IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJLFxuICAgIG1vbmdvZGJUZXN0Q29ubmVjdGlvblVyaTogJ21vbmdvZGI6Ly9sb2NhbGhvc3Q6MjcwMTcvb3BlbkNoYXRUZXN0JyxcbiAgICBwb3J0OiBwcm9jZXNzLmVudi5QT1JUIHx8IDUwMDAsXG4gICAgcHJvZHVjdGlvbjogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyB8fCBmYWxzZSxcbiAgICB1c2VUZXN0RGI6IHByb2Nlc3MuZW52LlVTRV9URVNUX0RCIHx8IGZhbHNlLFxuICAgIHNlY3JldDogcHJvY2Vzcy5lbnYuU0VDUkVUIHx8ICdzZWNyZXQnLFxuICAgIGRpc2FibGVDc3JmOiBwcm9jZXNzLmVudi5ESVNBQkxFX0NTUkYgfHwgZmFsc2UsXG4gICAgZGlzYWJsZVJlZHV4TG9nZ2luZzogcHJvY2Vzcy5lbnYuRElTQUJMRV9SRURVWF9MT0dHSU5HIHx8IGZhbHNlLFxuICAgIGRpc2FibGVBdXRvU3RhcnQ6IHByb2Nlc3MuZW52LkRJU0FCTEVfQVVUT19TVEFSVCB8fCBmYWxzZSxcbiAgICBtYWlsZ3VuQXBpS2V5OiBwcm9jZXNzLmVudi5NQUlMR1VOX0FQSV9LRVksXG4gICAgbWFpbGd1bkRvbWFpbjogcHJvY2Vzcy5lbnYuTUFJTEdVTl9ET01BSU4sXG4gICAgYmFzZVVybDogcHJvY2Vzcy5lbnYuQkFTRV9VUkwgPyBwcm9jZXNzLmVudi5CQVNFX1VSTCA6ICdodHRwOi8vbG9jYWxob3N0OjUwMDAnXG59XG4iLCJpbXBvcnQgeyBpc0VtYWlsLCBpc0VtcHR5IH0gZnJvbSAndmFsaWRhdG9yJztcbmltcG9ydCB7IGhhc2hTeW5jIH0gZnJvbSAnYmNyeXB0anMnO1xuaW1wb3J0IHtSZXF1ZXN0LCBSZXNwb25zZX0gZnJvbSAnLi4vLi4vdHlwZXMvZXhwcmVzcyc7XG5pbXBvcnQgVXNlciwgeyBJVXNlciB9IGZyb20gJy4uL21vZGVscy9Vc2VyJztcbmNvbnN0IGVudiA9IHJlcXVpcmUoJy4uLy4uLy4uL2VudicpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgbG9naW46IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKGlzRW1wdHkocmVxLmJvZHkuZW1haWwgfHwgJycpIHx8IGlzRW1wdHkocmVxLmJvZHkucGFzc3dvcmQgfHwgJycpKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ1BsZWFzZSBzdXBwbHkgYW4gZW1haWwgYW5kIHBhc3N3b3JkJyB9KS5lbmQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzRW1haWwocmVxLmJvZHkuZW1haWwpKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ05vdCBhIHZhbGlkIGVtYWlsIGFkZHJlc3MnIH0pLmVuZCgpO1xuICAgICAgICB9XG4gICAgICAgIHJlcS5hdXRoZW50aWNhdGUocmVxLmJvZHkuZW1haWwsIHJlcS5ib2R5LnBhc3N3b3JkLCAodXNlcjogYW55IHwgYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgaWYgKCF1c2VyKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7IGVycm9yOiAnSW52YWxpZCBlbWFpbCBvciBwYXNzd29yZCcgfSkuZW5kKCk7XG4gICAgICAgICAgICByZXEuaXNzdWVOZXdUb2tlbih1c2VyKTtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMClcbiAgICAgICAgICAgICAgICAuanNvbih7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZX0pLmVuZCgpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHJlZ2lzdGVyOiAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChpc0VtcHR5KHJlcS5ib2R5LmVtYWlsIHx8ICcnKSB8fCBpc0VtcHR5KHJlcS5ib2R5LnBhc3N3b3JkIHx8ICcnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdQbGVhc2Ugc3VwcGx5IGFuIGVtYWlsIGFuZCBwYXNzd29yZCcgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc0VtYWlsKHJlcS5ib2R5LmVtYWlsKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdOb3QgYSB2YWxpZCBlbWFpbCBhZGRyZXNzJyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gVXNlci5maW5kQnlFbWFpbChyZXEuYm9keS5lbWFpbCkuY291bnREb2N1bWVudHMoKS5leGVjKCkudGhlbigoY291bnQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGNvdW50ICE9PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7ZXJyb3I6ICdFbWFpbCBhZGRyZXNzIGluIHVzZSd9KTtcbiAgICAgICAgICAgIGxldCBwYXNzd29yZEhhc2ggPSBoYXNoU3luYyhyZXEuYm9keS5wYXNzd29yZCk7XG4gICAgICAgICAgICAvLyBJZiB0aGlzIGlzIHRoZSBmaXJzdCB1c2VyIGJlaW5nIGNyZWF0ZWQsIGFzaWduIHJvbGUgb2YgYWRtaW5cbiAgICAgICAgICAgIFVzZXIuY291bnREb2N1bWVudHMoKS5leGVjKCkudGhlbigoY291bnQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCByb2xlID0gJ3VzZXInO1xuICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgcm9sZSA9ICdhZG1pbic7XG4gICAgICAgICAgICAgICAgbGV0IHVzZXIgPSBuZXcgVXNlcih7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogcmVxLmJvZHkuZW1haWwsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZEhhc2gsXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IHJvbGUsXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsVmVyaWZpZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHVzZXIuc2F2ZSgpLnRoZW4oKHU6IElVc2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nIHRyeWluZyB0byBjcmVhdGUgYSBuZXcgdXNlcid9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuXG4gICAgfSxcbiAgICBsb2dvdXQ6IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgcmVxLmxvZ291dCgpO1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oe3N1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6ICdsb2dnZWQgb3V0J30pO1xuICAgIH0sXG4gICAgdmVyaWZ5RW1haWw6IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICB9XG59IiwiaW1wb3J0IHtSZXF1ZXN0LCBSZXNwb25zZX0gZnJvbSAnLi4vLi4vdHlwZXMvZXhwcmVzcyc7XG5pbXBvcnQgQ2hhbm5lbCwge0lDaGFubmVsfSBmcm9tICcuLi9tb2RlbHMvQ2hhbm5lbCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBjaGFubmVsczogKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAvLyBJZiBubyBjaGFubmVscyBleGlzdCwgY3JlYXRlIGEgJ2dlbmVyYWwnIGFuZCAncmFuZG9tJyBjaGFubmVsXG4gICAgICAgIHJldHVybiBDaGFubmVsLmNvdW50RG9jdW1lbnRzKCkuZXhlYygpLnRoZW4oKGNvdW50OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGxldCBwID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjb3VudCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBDaGFubmVsLmNyZWF0ZShbe25hbWU6ICdnZW5lcmFsJ30sIHtuYW1lOiAncmFuZG9tJ31dKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBwLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIENoYW5uZWwuZmluZCgpLmV4ZWMoKS50aGVuKChjaGFubmVsczogSUNoYW5uZWxbXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe2NoYW5uZWxzOiBjaGFubmVsc30pO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIGZldGNoIGNoYW5uZWxzJyB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7ZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gY3JlYXRlIGRlZmF1bHQgY2hhbm5lbHMnfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7ZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSBjb3VudGluZyBjaGFubmVscyd9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBkZWxldGU6IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgXG4gICAgfSxcbiAgICBjcmVhdGU6IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcblxuICAgIH1cbn0iLCJpbXBvcnQge1JlcXVlc3QsIFJlc3BvbnNlfSBmcm9tICcuLi8uLi90eXBlcy9leHByZXNzJztcbmltcG9ydCBNZXNzYWdlLCB7SU1lc3NhZ2V9IGZyb20gJy4uL21vZGVscy9NZXNzYWdlJztcbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBtZXNzYWdlczogKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICByZXR1cm4gTWVzc2FnZS5maW5kKHtjaGFubmVsOiByZXEucGFyYW1zLmNoYW5uZWx9KVxuICAgICAgICAgICAgLnNraXAocGFyc2VJbnQocmVxLnBhcmFtcy5vZmZlc3QpKVxuICAgICAgICAgICAgLnNvcnQoe19pZDogLTF9KVxuICAgICAgICAgICAgLmxpbWl0KDIwKVxuICAgICAgICAgICAgLmV4ZWMoKS50aGVuKChtZXNzYWdlczogSU1lc3NhZ2VbXSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgICAgICAgICAgICAgICBtZXNzYWdlczogbWVzc2FnZXMubWFwKChtOiBJTWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBtLnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZDogbS5jcmVhdGVkQXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlckVtYWlsOiBtLnVzZXJFbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsOiBtLmNoYW5uZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2lkOiBtLl9pZFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgIH0pLnJldmVyc2UoKVxuICAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9KS5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdzb21ldGhpbmcgd2VudCB3cm9uZyB0cnlpbmcgdG8gZmV0Y2ggbWVzc2FnZXMnIH0pO1xuICAgICAgICB9KVxuICAgIH1cbn0iLCJpbXBvcnQge2lzRW1haWwsIGlzRW1wdHl9IGZyb20gJ3ZhbGlkYXRvcic7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJy4uLy4uL3R5cGVzL2V4cHJlc3MnO1xuaW1wb3J0IFVzZXIsIHsgSVVzZXIsIElVc2VyTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvVXNlcic7XG5pbXBvcnQge2NvbXBhcmVTeW5jLCBoYXNoU3luY30gZnJvbSAnYmNyeXB0anMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgdXNlcjogKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICByZXMuc2VuZChyZXEudXNlcik7XG4gICAgfSxcbiAgICB1c2VyczogKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICByZXR1cm4gVXNlci5maW5kKHt9KS50aGVuKCh1c2VyczogSVVzZXJbXSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCB1c2VyczogdXNlcnN9KTtcbiAgICAgICAgfSkuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7ZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSByZXRyaWV2aW5nIHVzZXJzJ30pO1xuICAgICAgICB9KVxuICAgIH0sXG4gICAgdXNlckJ5RW1haWw6IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYoIWlzRW1haWwocmVxLnBhcmFtcy51c2VyKSlcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7ZXJyb3I6ICdQbGVhc2Ugc3VwcGx5IGEgdmFsaWQgZW1haWwnfSk7XG5cbiAgICAgICAgcmV0dXJuIFVzZXIuZmluZEJ5RW1haWwocmVxLnBhcmFtcy51c2VyKS5leGVjKCkudGhlbigodXNlcjogSVVzZXIpID0+IHtcbiAgICAgICAgICAgIGlmICh1c2VyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBfaWQ6IHVzZXIuX2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdXNlci5uYW1lIHx8ICcnLFxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7ZXJyb3I6ICdObyB1c2VyIGZvdW5kIHdpdGggdGhhdCBlbWFpbCd9KTtcbiAgICAgICAgICAgIFxuICAgICAgICB9KS5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nIHRyeWluZyB0byBmaW5kIHRoZSB1c2VyJ30pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHVwZGF0ZUVtYWlsOiAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmKCFpc0VtYWlsKHJlcS5ib2R5LmVtYWlsKSlcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnTm90IGEgdmFsaWQgZW1haWwnIH0pO1xuICAgICAgICByZXR1cm4gVXNlci5jb3VudERvY3VtZW50cyh7ZW1haWw6IHJlcS5ib2R5LmVtYWlsfSkuZXhlYygpLnRoZW4oKGNvdW50OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChjb3VudCAhPT0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ0VtYWlsIGFkZHJlc3MgYWxyZWFkeSBpbiB1c2UnIH0pO1xuICAgICAgICAgICAgcmV0dXJuIFVzZXIuZmluZEJ5RW1haWwocmVxLnVzZXIuZW1haWwpLmV4ZWMoKS50aGVuKCh1c2VyOiBJVXNlcikgPT4ge1xuICAgICAgICAgICAgICAgIHVzZXIuZW1haWwgPSByZXEuYm9keS5lbWFpbDtcbiAgICAgICAgICAgICAgICB1c2VyLnNhdmUoKTtcbiAgICAgICAgICAgICAgICByZXEuaXNzdWVOZXdUb2tlbihPYmplY3QuYXNzaWduKHt9LCByZXEudXNlciwge2VtYWlsOiByZXEuYm9keS5lbWFpbH0pKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZyB0cnlpbmcgdG8gZmV0Y2ggdGhlIHVzZXInIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgdXBkYXRlTmFtZTogKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICByZXR1cm4gVXNlci5maW5kQnlFbWFpbChyZXEudXNlci5lbWFpbClcbiAgICAgICAgICAgIC5leGVjKCkudGhlbigodXNlcjogSVVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICB1c2VyLm5hbWUgPSByZXEuYm9keS5uYW1lO1xuICAgICAgICAgICAgICAgIHVzZXIuc2F2ZSgpO1xuICAgICAgICAgICAgICAgIHJlcS5pc3N1ZU5ld1Rva2VuKE9iamVjdC5hc3NpZ24oe30sIHJlcS51c2VyLCB7IG5hbWU6IHJlcS5ib2R5Lm5hbWUgfSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZX0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nIHRyeWluZyB0byB1cGRhdGUgdGhlIHVzZXInfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgdXBkYXRlUGFzc3dvcmQ6IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKGlzRW1wdHkocmVxLmJvZHkubmV3UGFzcykgfHwgaXNFbXB0eShyZXEuYm9keS5vbGRQYXNzKSlcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnTXVzdCBzdXBwbHkgdGhlIGN1cnJlbnQgYW5kIG5ldyBwYXNzd29yZCcgfSk7XG4gICAgICAgIHJldHVybiBVc2VyLmZpbmRCeUVtYWlsKHJlcS51c2VyLmVtYWlsKS5leGVjKCkudGhlbigodXNlcjogSVVzZXIpID0+IHtcbiAgICAgICAgICAgIGlmICghY29tcGFyZVN5bmMocmVxLmJvZHkub2xkUGFzcywgdXNlci5wYXNzd29yZCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtlcnJvcjogJ0N1cnJlbnQgcGFzc3dvcmQgaXMgaW5jb3JyZWN0J30pO1xuICAgICAgICAgICAgdXNlci5wYXNzd29yZCA9IGhhc2hTeW5jKHJlcS5ib2R5Lm5ld1Bhc3MpO1xuICAgICAgICAgICAgdXNlci5zYXZlKCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWV9KTtcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIHJlc2V0UGFzc3dvcmQ6IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtlcnJvcjogJ05vdCBpbXBsZW1lbnRlZCd9KTtcbiAgICB9LFxufSIsImltcG9ydCB7IHZlcmlmeSB9IGZyb20gJ2pzb253ZWJ0b2tlbic7XG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJy4uLy4uL3R5cGVzL2p3dCc7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJy4uLy4uL3R5cGVzL2V4cHJlc3MnO1xuY29uc3QgZW52ID0gcmVxdWlyZSgnLi4vLi4vLi4vZW52Jyk7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IEZ1bmN0aW9uKSB7XG4gICAgLy8gc2VlIGlmIHdlIG5lZWQgdG8gbG9hZCB0b2tlbiBmcm9tIHNlc3Npb25cbiAgICBpZiAocmVxLnNlc3Npb24udG9rZW4gJiYgIXJlcS5oZWFkZXJzWyd4LWFjY2Vzcy10b2tlbiddKSB7XG4gICAgICAgIHJlcy5zZXRIZWFkZXIoJ3gtYWNjZXNzLXRva2VuJywgcmVxLnNlc3Npb24udG9rZW4pO1xuICAgIH1cbiAgICB2YXIgdG9rZW4gPSByZXEuaGVhZGVyc1sneC1hY2Nlc3MtdG9rZW4nXSB8fCByZXEuc2Vzc2lvbi50b2tlbjtcbiAgICBpZiAoIXRva2VuKVxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oeyBlcnJvcjogJ05vdCBhdXRob3JpemVkJyB9KTtcblxuICAgIHZlcmlmeSh0b2tlbiwgZW52LnNlY3JldCwgKGVycjogRXJyb3IsIGRlY29kZWQ6IFRva2VuKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHJldHVybiByZXMuc3RhdHVzKDQwMSkuc2VuZCh7IGVycm9yOiAnTm90IGF1dGhvcml6ZWQnIH0pO1xuICAgICAgICByZXEudXNlciA9IGRlY29kZWQ7XG4gICAgICAgIHJldHVybiBuZXh0KCk7XG4gICAgfSk7ICAgIFxufSIsImltcG9ydCB7U2NoZW1hLCBEb2N1bWVudCwgTW9kZWwsIG1vZGVsfSBmcm9tICdtb25nb29zZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNoYW5uZWwgZXh0ZW5kcyBEb2N1bWVudCB7XG4gICAgbmFtZTogc3RyaW5nLFxuICAgIGNyZWF0ZWRBdDogRGF0ZSxcbiAgICB1cGRhdGVkQXQ6IERhdGUsXG59XG5cbmNvbnN0IGNoYW5uZWxTY2hlbWE6IFNjaGVtYSA9IG5ldyBTY2hlbWEoe1xuICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgbG93ZXJjYXNlOiB0cnVlLFxuICAgIH0sXG59LCB7XG4gICAgdGltZXN0YW1wczogdHJ1ZVxufSk7XG5cbmNvbnN0IENoYW5uZWw6IE1vZGVsPElDaGFubmVsPiA9IG1vZGVsKCdDaGFubmVsJywgY2hhbm5lbFNjaGVtYSk7XG5leHBvcnQgZGVmYXVsdCBDaGFubmVsOyIsImltcG9ydCB7U2NoZW1hLCBtb2RlbCwgRG9jdW1lbnQsIE1vZGVsfSBmcm9tICdtb25nb29zZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1lc3NhZ2UgZXh0ZW5kcyBEb2N1bWVudCB7XG4gICAgY2hhbm5lbDogc3RyaW5nLFxuICAgIHRleHQ6IHN0cmluZyxcbiAgICB1c2VyRW1haWw6IHN0cmluZyxcbiAgICBjcmVhdGVkQXQ6IERhdGUsXG4gICAgdXBkYXRlZEF0OiBEYXRlLFxufVxuXG5jb25zdCBtZXNzYWdlU2NoZW1hOiBTY2hlbWEgPSBuZXcgU2NoZW1hKHtcbiAgICBjaGFubmVsOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIC8vIHNob3VsZCB2YWxpZGF0ZSB0byBtYWtlIHN1cmUgY2hhbm5lbCBhbHJlYWR5IGV4aXN0c1xuICAgIH0sXG4gICAgdGV4dDoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIH0sXG4gICAgdXNlckVtYWlsOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIGxvd2VyY2FzZTogdHJ1ZSxcbiAgICAgICAgLy8gc2hvdWxkIHZhbGlkYXRlIHRvIGNvbmZpcm0gdGhhdCB1c2VyIGV4aXN0c1xuICAgIH1cbn0sIHtcbiAgICB0aW1lc3RhbXBzOiB0cnVlXG59KTtcblxuY29uc3QgTWVzc2FnZTogTW9kZWw8SU1lc3NhZ2U+ID0gbW9kZWwoJ01lc3NhZ2UnLCBtZXNzYWdlU2NoZW1hKTtcbmV4cG9ydCBkZWZhdWx0IE1lc3NhZ2U7IiwiaW1wb3J0IHtTY2hlbWEsIERvY3VtZW50LCBtb2RlbCwgTW9kZWwsIEVycm9yLCBEb2N1bWVudFF1ZXJ5fSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQge3RvTG93ZXJ9IGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVVzZXIgZXh0ZW5kcyBEb2N1bWVudCB7XG4gICAgbmFtZT86IHN0cmluZyxcbiAgICBlbWFpbDogc3RyaW5nLFxuICAgIGNyZWF0ZWRBdDogRGF0ZSxcbiAgICB1cGRhdGVkQXQ6IERhdGUsXG4gICAgcGFzc3dvcmQ6IHN0cmluZyxcbiAgICByb2xlOiAnYWRtaW4nIHwgJ3VzZXInLFxuXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElVc2VyTW9kZWwgZXh0ZW5kcyBNb2RlbDxJVXNlcj4ge1xuICAgIGZpbmRCeUVtYWlsOiAoZW1haWw6IHN0cmluZykgPT4gRG9jdW1lbnRRdWVyeTxJVXNlciwgSVVzZXI+XG59XG5cbmNvbnN0IHVzZXJTY2hlbWE6IFNjaGVtYSA9IG5ldyBTY2hlbWEoe1xuICAgIG5hbWU6IFN0cmluZyxcbiAgICBlbWFpbDoge1xuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICBsb3dlcmNhc2U6IHRydWVcbiAgICB9LFxuICAgIHBhc3N3b3JkOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIHJvbGU6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgbG93ZXJjYXNlOiB0cnVlLFxuICAgICAgICBlbnVtOiBbJ2FkbWluJywgJ3VzZXInXVxuICAgIH0sXG59LCB7XG4gICAgdGltZXN0YW1wczogdHJ1ZVxufSk7XG5cbnVzZXJTY2hlbWEuc3RhdGljcy5maW5kQnlFbWFpbCA9IGZ1bmN0aW9uIChlbWFpbDogc3RyaW5nKTogRG9jdW1lbnRRdWVyeTxJVXNlciwgSVVzZXI+IHtcbiAgICByZXR1cm4gdGhpcy5maW5kT25lKHtlbWFpbDogZW1haWx9KTtcbn1cblxuY29uc3QgVXNlcjogSVVzZXJNb2RlbCA9IG1vZGVsPElVc2VyLCBJVXNlck1vZGVsPignVXNlcicsIHVzZXJTY2hlbWEpO1xuZXhwb3J0IGRlZmF1bHQgVXNlcjsiLCJpbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQXBwLCBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJy4uL3R5cGVzL2V4cHJlc3MnO1xuaW1wb3J0IGF1dGhvcml6ZWQgZnJvbSAnLi9taWRkbGV3YXJlL2F1dGhvcml6ZWQnO1xuaW1wb3J0IGF1dGhDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvYXV0aENvbnRyb2xsZXInO1xuaW1wb3J0IHVzZXJDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvdXNlckNvbnRyb2xsZXInO1xuaW1wb3J0IG1lc3NhZ2VDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvbWVzc2FnZUNvbnRyb2xsZXInO1xuaW1wb3J0IGNoYW5uZWxDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvY2hhbm5lbENvbnRyb2xsZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhcHA6IEFwcCkge1xuXG4gICAgLyogU3RhdGljIFJvdXRlcyAqL1xuICAgIGFwcC5nZXQoJy8nLCBmdW5jdGlvbiAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiByZXMucmVuZGVyKFxuICAgICAgICAgICAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL2Rpc3QvcHVibGljL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgICAgIHsgY3NyZlRva2VuOiByZXEuY3NyZlRva2VuKCkgfVxuICAgICAgICApO1xuICAgIH0pO1xuICAgIC8qIFdpZGdldCByZW5kZXJlZCBpbnNpZGUgaWZyYW1lIHZpYSB3aWRnZXQtZW1iZWQgc2NyaXB0ICovXG4gICAgYXBwLmdldCgnL3dpZGdldCcsIGZ1bmN0aW9uIChyZXE6IGFueSwgcmVzOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5yZW5kZXIoXG4gICAgICAgICAgICBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vLi4vZGlzdC9wdWJsaWMvd2lkZ2V0L2luZGV4Lmh0bWwnKVxuICAgICAgICApO1xuICAgIH0pO1xuICAgIC8qIFBhZ2UgZGVtb2luZyBlbWJlZGRlZCB3aWRnZXQgKi9cbiAgICBhcHAuZ2V0KCcvd2lkZ2V0L2RlbW8nLCBmdW5jdGlvbiAocmVxOiBhbnksIHJlczogYW55KSB7XG4gICAgICAgIHJldHVybiByZXMucmVuZGVyKFxuICAgICAgICAgICAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uLy4uL2Rpc3QvcHVibGljL3dpZGdldC9kZW1vLmh0bWwnKVxuICAgICAgICApO1xuICAgIH0pO1xuICAgIFxuICAgIC8qIEFQSSBSb3V0ZXMgKi9cbiAgICBcbiAgICBhcHAucG9zdCgnL2FwaS92MS9sb2dpbicsIGF1dGhDb250cm9sbGVyLmxvZ2luKTtcbiAgICBhcHAucG9zdCgnL2FwaS92MS9yZWdpc3RlcicsIGF1dGhDb250cm9sbGVyLnJlZ2lzdGVyKTtcbiAgICBhcHAuZ2V0KCcvYXBpL3YxL2xvZ291dCcsIGF1dGhDb250cm9sbGVyLmxvZ291dCk7XG4gICAgYXBwLmdldCgnL2FwaS92MS92ZXJpZnlFbWFpbC86aWQnLCBhdXRoQ29udHJvbGxlci52ZXJpZnlFbWFpbCk7XG5cbiAgICBhcHAudXNlKCcvYXBpL3YxL3VzZXInLCBhdXRob3JpemVkKTtcbiAgICBhcHAuZ2V0KCcvYXBpL3YxL3VzZXInLCB1c2VyQ29udHJvbGxlci51c2VyKTtcbiAgICBhcHAuZ2V0KCcvYXBpL3YxL3VzZXJzJywgdXNlckNvbnRyb2xsZXIudXNlcnMpXG4gICAgYXBwLmdldCgnL2FwaS92MS91c2VyLzp1c2VyJywgdXNlckNvbnRyb2xsZXIudXNlckJ5RW1haWwpO1xuICAgIGFwcC5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL2VtYWlsJywgdXNlckNvbnRyb2xsZXIudXBkYXRlRW1haWwpO1xuICAgIGFwcC5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL25hbWUnLCB1c2VyQ29udHJvbGxlci51cGRhdGVOYW1lKTtcbiAgICBhcHAucG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9wYXNzd29yZCcsIHVzZXJDb250cm9sbGVyLnVwZGF0ZVBhc3N3b3JkKTtcbiAgICBhcHAucG9zdCgnL2FwaS92MS91c2VyL3Jlc2V0X3Bhc3N3b3JkJywgdXNlckNvbnRyb2xsZXIucmVzZXRQYXNzd29yZCk7XG5cbiAgICBhcHAuZ2V0KCcvYXBpL3YxL21lc3NhZ2UqJywgYXV0aG9yaXplZCk7XG4gICAgYXBwLmdldCgnL2FwaS92MS9tZXNzYWdlcy86Y2hhbm5lbC86b2Zmc2V0JywgbWVzc2FnZUNvbnRyb2xsZXIubWVzc2FnZXMpO1xuXG4gICAgYXBwLnVzZSgnL2FwaS92MS9jaGFubmVsJywgYXV0aG9yaXplZCk7XG4gICAgYXBwLmdldCgnL2FwaS92MS9jaGFubmVscycsIGNoYW5uZWxDb250cm9sbGVyLmNoYW5uZWxzKTtcbiAgICBhcHAucG9zdCgnL2FwaS92MS9jaGFubmVscy9kZWxldGUnLCBjaGFubmVsQ29udHJvbGxlci5kZWxldGUpO1xuICAgIGFwcC5wb3N0KCcvYXBpL3YxL2NoYW5uZWxzL2NyZWF0ZScsIGNoYW5uZWxDb250cm9sbGVyLmNyZWF0ZSk7XG5cbiAgICAvKiBEaXNwbGF5IGluZGV4Lmh0bWwgaWYgdW5rbm93biBwYXRoLCBhbmQgbGV0IFJlYWN0LVJvdXRlciBoYW5kbGUgdGhlIDQwNCAqL1xuICAgIGFwcC5nZXQoJyonLCBmdW5jdGlvbiAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiByZXMucmVuZGVyKFxuICAgICAgICAgICAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL2Rpc3QvcHVibGljL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgICAgIHsgY3NyZlRva2VuOiByZXEuY3NyZlRva2VuKCkgfVxuICAgICAgICApO1xuICAgIH0pO1xufSIsIi8vaW1wb3J0IE1vZGVscyBmcm9tICcuL21vZGVscy9pbmRleC50cyc7XG5cbmltcG9ydCAqIGFzIGh0dHAgZnJvbSAnaHR0cCc7XG5pbXBvcnQgKiBhcyBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIHNvY2tldGlvIGZyb20gJ3NvY2tldC5pbyc7XG5pbXBvcnQgKiBhcyBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgKiBhcyBjc3JmIGZyb20gJ2NzdXJmJztcbmltcG9ydCAqIGFzIGNvb2tpZVBhcnNlciBmcm9tICdjb29raWUtcGFyc2VyJztcbmltcG9ydCAqIGFzIHNlc3Npb24gZnJvbSAnZXhwcmVzcy1zZXNzaW9uJztcbmltcG9ydCAqIGFzIGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xuaW1wb3J0ICogYXMgYmNyeXB0IGZyb20gJ2JjcnlwdGpzJztcbmltcG9ydCAqIGFzIGhlbG1ldCBmcm9tICdoZWxtZXQnO1xuaW1wb3J0ICogYXMgbW9yZ2FuIGZyb20gJ21vcmdhbic7XG5pbXBvcnQgKiBhcyBjb21wcmVzc2lvbiBmcm9tICdjb21wcmVzc2lvbic7XG5pbXBvcnQgeyBzaWduIH0gZnJvbSAnanNvbndlYnRva2VuJztcbmNvbnN0IG11c3RhY2hlRXhwcmVzcyA9IHJlcXVpcmUoJ211c3RhY2hlLWV4cHJlc3MnKTtcbmNvbnN0IE1vbmdvU3RvcmUgPSByZXF1aXJlKCdjb25uZWN0LW1vbmdvJykoc2Vzc2lvbik7XG5cbmltcG9ydCBSb3V0ZXMgZnJvbSAnLi9yb3V0ZXMnO1xuaW1wb3J0IHdlYnNvY2tldCBmcm9tICcuL3NvY2tldC5pby9pbmRleCc7XG5pbXBvcnQgeyBBcHAsIFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnLi4vdHlwZXMvZXhwcmVzcyc7XG5pbXBvcnQgVXNlciwgeyBJVXNlciB9IGZyb20gJy4vbW9kZWxzL1VzZXInO1xuY29uc3QgZW52ID0gcmVxdWlyZSgnLi4vLi4vZW52Jyk7XG5cbmNvbnN0IGFwcDogQXBwID0gZXhwcmVzcygpO1xuY29uc3QgcG9ydDogc3RyaW5nIHwgbnVtYmVyID0gZW52LnBvcnQ7XG5sZXQgc2VydmVyOiBodHRwLlNlcnZlcjtcbmxldCBzb2NrZXRTZXJ2ZXI6IHNvY2tldGlvLlNlcnZlcjtcblxuYXBwLmVuZ2luZSgnaHRtbCcsIG11c3RhY2hlRXhwcmVzcygpKTtcbmFwcC5zZXQoJ3ZpZXcgZW5naW5lJywgJ2h0bWwnKTtcbi8vYXBwLnVzZShtb3JnYW4oJ2NvbWJpbmVkJykpO1xuYXBwLnVzZShjb21wcmVzc2lvbigpKTtcblxuY29uc3Qgc2Vzc2lvbk1pZGRsZXdhcmUgPSBzZXNzaW9uKHtcbiAgICBzZWNyZXQ6IGVudi5zZWNyZXQsXG4gICAgY29va2llOiB7XG4gICAgICAgIG1heEFnZTogMjQgKiA2MCAqIDYwICogMTAwMCwgLy8gMjQgaG91cnNcbiAgICAgICAgc2FtZVNpdGU6IHRydWUsXG4gICAgICAgIHNlY3VyZTogZW52LnByb2R1Y3Rpb24sXG4gICAgICAgIGh0dHBPbmx5OiB0cnVlXG4gICAgfSxcbiAgICBzYXZlVW5pbml0aWFsaXplZDogdHJ1ZSxcbiAgICByZXNhdmU6IGZhbHNlLFxuICAgIHN0b3JlOiBuZXcgTW9uZ29TdG9yZSh7XG4gICAgICAgIG1vbmdvb3NlQ29ubmVjdGlvbjogbW9uZ29vc2UuY29ubmVjdGlvblxuICAgIH0pXG59KTtcblxuY29uc3QgY3NyZk1pZGRsZXdhcmUgPSBjc3JmKHtcbiAgICBjb29raWU6IHtcbiAgICAgICAgbWF4QWdlOiAyNCAqIDYwICogNjAgKiAxMDAwLCAvLyAyNCBob3Vyc1xuICAgICAgICBzYW1lU2l0ZTogdHJ1ZSxcbiAgICAgICAgc2VjdXJlOiBlbnYucHJvZHVjdGlvbixcbiAgICAgICAgaHR0cE9ubHk6IHRydWUsXG4gICAgICAgIGtleTogJ19jc3JmJ1xuICAgIH1cbn0pXG5cbm1vbmdvb3NlLmNvbm5lY3QoZW52LnVzZVRlc3REYiA/IGVudi5tb25nb2RiVGVzdENvbm5lY3Rpb25VcmkgOiBlbnYubW9uZ29kYkNvbm5lY3Rpb25VcmksIHsgdXNlTmV3VXJsUGFyc2VyOiB0cnVlIH0pO1xubW9uZ29vc2UuY29ubmVjdGlvbi5vbignZXJyb3InLCBmdW5jdGlvbihlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKCdNb25nb29zZSBjb25uZWN0aW9uIGVycm9yJywgZXJyKTtcbn0pO1xucHJvY2Vzcy5vbignU0lHSU5UJywgZnVuY3Rpb24gKCkge1xuICAgIG1vbmdvb3NlLmNvbm5lY3Rpb24uY2xvc2UoZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnTW9uZ29vc2UgZGVmYXVsdCBjb25uZWN0aW9uIGRpc2Nvbm5lY3RlZCB0aHJvdWdoIGFwcCB0ZXJtaW5hdGlvbicpO1xuICAgICAgICBwcm9jZXNzLmV4aXQoMCk7XG4gICAgfSk7XG59KTsgXG5cbmFwcC51c2Uoc2Vzc2lvbk1pZGRsZXdhcmUpO1xuYXBwLnVzZShjb29raWVQYXJzZXIoZW52LnNlY3JldCkpO1xuXG5pZihlbnYuZGlzYWJsZUNzcmYpIHtcbiAgICBjb25zb2xlLmxvZygnQ1NSRiBkaXNhYmxlZCcpO1xuICAgIGFwcC51c2UoKHJlcSwgcmVzLCBuZXh0KSA9PiB7IFxuICAgICAgICByZXEuY3NyZlRva2VuID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJycgfVxuICAgICAgICByZXR1cm4gbmV4dCgpO1xuICAgIH0pO1xufSBlbHNlIHtcbiAgICBhcHAudXNlKGNzcmZNaWRkbGV3YXJlKTtcbn1cbi8vIGFkZCBEQiB0byBldmVyeSBleHByZXNzIHJlcXVlc3RcbmxldCBkYjogbW9uZ29vc2UuQ29ubmVjdGlvbiA9IG1vbmdvb3NlLmNvbm5lY3Rpb247XG5hcHAudXNlKChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IEZ1bmN0aW9uKSA9PiB7XG4gICAgcmVxLmRiID0gZGI7XG4gICAgcmV0dXJuIG5leHQoKTtcbn0pXG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTsgLy8gc3VwcG9ydCBqc29uIGVuY29kZWQgYm9kaWVzXG5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiB0cnVlIH0pKTtcbi8vYXBwLnVzZShjb3JzKCkpO1xuXG5cbmFwcC51c2UoaGVsbWV0KCkpO1xuLyogU2VydmUgc3RhdGljIGZpbGVzIGZyb20gZGlzdC9wdWJsaWMgKi9cbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL2Rpc3QvcHVibGljLycpKSk7XG5cbmFwcC51c2UoJy9hcGknLCBmdW5jdGlvbiAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBGdW5jdGlvbikge1xuICAgIC8vcmVzLnNldEhlYWRlcignbmV3LWNzcmYtdG9rZW4nLCByZXEuY3NyZlRva2VuKCkpXG4gICAgcmV0dXJuIG5leHQoKTtcbn0pO1xuYXBwLnVzZSgocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBGdW5jdGlvbikgPT4ge1xuICAgIHJlcS5hdXRoZW50aWNhdGUgPSAoZW1haWw6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lOiAodXNlcjogYm9vbGVhbiB8IElVc2VyLCBlcnI6IChudWxsIHwgRXJyb3IpKSA9PiB2b2lkKSA9PiB7XG4gICAgICAgIFVzZXIuZmluZEJ5RW1haWwoZW1haWwpLnRoZW4oKHVzZXI6IElVc2VyKSA9PiB7XG4gICAgICAgICAgICBpZiAodXNlciA9PT0gbnVsbCkgcmV0dXJuIGRvbmUoZmFsc2UsIG51bGwpO1xuICAgICAgICAgICAgaWYgKCFiY3J5cHQuY29tcGFyZVN5bmMocGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpKSByZXR1cm4gZG9uZShmYWxzZSwgbmV3IEVycm9yKCdJbnZhbGlkIHBhc3N3b3JkJykpO1xuICAgICAgICAgICAgbGV0IHVzZXJEZXRhaWxzOiBhbnkgPSB7XG4gICAgICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICAgICAgICAgIHJvbGU6IHVzZXIucm9sZSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkb25lKHVzZXJEZXRhaWxzLCBudWxsKTtcbiAgICAgICAgfSkuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgIGRvbmUoZmFsc2UsIGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXEubG9nb3V0ID0gKCkgPT4ge1xuICAgICAgICByZXEuc2Vzc2lvbi50b2tlbiA9IG51bGw7XG4gICAgfVxuICAgIHJlcS5pc3N1ZU5ld1Rva2VuID0gKHVzZXI6IElVc2VyKSA9PiB7XG4gICAgICAgIGxldCB0b2tlbjogc3RyaW5nID0gc2lnbih7XG4gICAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXG4gICAgICAgICAgICByb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbFxuICAgICAgICB9LCBlbnYuc2VjcmV0LCB7XG4gICAgICAgICAgICBleHBpcmVzSW46IDg2NDAwIC8vIGV4cGlyZXMgaW4gMjQgaG91cnNcbiAgICAgICAgfSk7XG4gICAgICAgIHJlcS5zZXNzaW9uLnRva2VuID0gdG9rZW47XG4gICAgICAgIHJlcy5zZXRIZWFkZXIoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgfVxuICAgIG5leHQoKTtcbn0pO1xuXG5Sb3V0ZXMoYXBwKTtcbnNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKGFwcCk7XG5zZXJ2ZXIub24oJ2Vycm9yJywgKGVycjogRXJyb3IpID0+IHtcbiAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgc2VydmVyLmNsb3NlKCk7XG59KVxuXG5pZiAoIWVudi5kaXNhYmxlQXV0b1N0YXJ0KSB7XG4gICAgc29ja2V0U2VydmVyID0gd2Vic29ja2V0KHNlcnZlciwgZGIpO1xuICAgIG1vbmdvb3NlLmNvbm5lY3Rpb24ub24oJ2Nvbm5lY3RlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0Nvbm5lY3RlZCB0byBNb25nb0RCIHZpYSBNb25nb29zZScpO1xuICAgICAgICBzZXJ2ZXIubGlzdGVuKHBvcnQsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBMaXN0ZW5pbmcgb24gcG9ydCAke3BvcnR9IWApO1xuICAgICAgICAgICAgYXBwLmVtaXQoJ3NlcnZlciBzdGFydGVkJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzZXJ2ZXI7XG5leHBvcnQgY29uc3QgY29ubiA9IG1vbmdvb3NlLmNvbm5lY3Rpb247XG5leHBvcnQgeyBhcHAsIHNvY2tldFNlcnZlciB9OyIsImltcG9ydCAqIGFzIHNvY2tldGlvIGZyb20gJ3NvY2tldC5pbyc7XG5pbXBvcnQgeyBTZXJ2ZXIgfSBmcm9tICdodHRwJztcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQge2F1dGhvcml6ZSBhcyBhdXRob3JpemVKd3R9IGZyb20gJ3NvY2tldGlvLWp3dCc7XG5pbXBvcnQgTWVzc2FnZSwgeyBJTWVzc2FnZSB9IGZyb20gJy4uL21vZGVscy9NZXNzYWdlJztcbmltcG9ydCB7IFRva2VuIH0gZnJvbSAnLi4vLi4vdHlwZXMvand0JztcbmNvbnN0IGVudiA9IHJlcXVpcmUoJy4uLy4uLy4uL2VudicpO1xuXG5pbnRlcmZhY2UgU29ja2V0IGV4dGVuZHMgc29ja2V0aW8uU29ja2V0IHtcbiAgICBqd3Q6IFRva2VuXG59IFxuXG5jb25zdCBpbml0ID0gKHNlcnZlcjogU2VydmVyLCBkYjogQ29ubmVjdGlvbik6IHNvY2tldGlvLlNlcnZlciA9PiB7XG4gICAgY29uc3QgaW86IHNvY2tldGlvLlNlcnZlciA9IHNvY2tldGlvKHNlcnZlcik7XG4gICAgbGV0IGNvbm5lY3RlZFVzZXJFbWFpbHM6IHN0cmluZ1tdID0gW107XG5cbiAgICAvLyBzZXQgYXV0aG9yaXphdGlvbiBmb3Igc29ja2V0LmlvXG4gICAgaW8ub24oJ2Nvbm5lY3Rpb24nLCBhdXRob3JpemVKd3Qoe1xuICAgICAgICAgICAgc2VjcmV0OiBlbnYuc2VjcmV0LFxuICAgICAgICAgICAgdGltZW91dDogMTUwMDAsIC8vIDE1IHNlY29uZHMgdG8gc2VuZCB0aGUgYXV0aGVudGljYXRpb24gbWVzc2FnZVxuICAgICAgICAgICAgZGVjb2RlZFByb3BlcnR5TmFtZTogJ2p3dCdcbiAgICAgICAgfSkpLm9uKCdhdXRoZW50aWNhdGVkJywgKHNvY2tldDogU29ja2V0KSA9PiB7XG5cbiAgICAgICAgICAgIGNvbm5lY3RlZFVzZXJFbWFpbHMucHVzaChzb2NrZXQuand0LmVtYWlsKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb25uZWN0ZWQgdXNlcnMnLCBjb25uZWN0ZWRVc2VyRW1haWxzKTtcbiAgICAgICAgICAgIGlvLmVtaXQoJ2Nvbm5lY3RlZCB1c2VycycsIGNvbm5lY3RlZFVzZXJFbWFpbHMuZmlsdGVyKCh2YWx1ZSwgaW5kZXgsIHNlbGYpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXg7XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIHNvY2tldC5vbignZGlzY29ubmVjdCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25uZWN0ZWRVc2VyRW1haWxzLnNwbGljZShjb25uZWN0ZWRVc2VyRW1haWxzLmluZGV4T2Yoc29ja2V0Lmp3dC5lbWFpbCksIDEpO1xuICAgICAgICAgICAgICAgIGlvLmVtaXQoJ2Nvbm5lY3RlZCB1c2VycycsIGNvbm5lY3RlZFVzZXJFbWFpbHMuZmlsdGVyKCh2YWx1ZSwgaW5kZXgsIHNlbGYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4O1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzb2NrZXQub24oJ21lc3NhZ2UnLCAobWVzc2FnZTogeyB0ZXh0OiBzdHJpbmcsIGNoYW5uZWw6IHN0cmluZyB9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgbGV0IG06IElNZXNzYWdlID0gbmV3IE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBjaGFubmVsOiBtZXNzYWdlLmNoYW5uZWwsXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IG1lc3NhZ2UudGV4dCxcbiAgICAgICAgICAgICAgICAgICAgdXNlckVtYWlsOiBzb2NrZXQuand0LmVtYWlsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbS5zYXZlKCkudGhlbigobTogSU1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaW8uZW1pdCgnbWVzc2FnZScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9pZDogbS5faWQsXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyRW1haWw6IG0udXNlckVtYWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogbS50ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbDogbS5jaGFubmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZDogbS5jcmVhdGVkQXRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KCdtZXNzYWdlIHJlY2VpdmVkJyk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICBzb2NrZXQuZW1pdCgnbWVzc2FnZSByZWNlaXZlIGVycm9yJywgZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICByZXR1cm4gaW87XG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQ7IiwiaW1wb3J0IHtTdGF0ZSwgQ2hhbm5lbCwgTWVzc2FnZX0gZnJvbSAnLi4vcmVkdWNlcnMvY2hhbm5lbHMnO1xuaW1wb3J0IGF4aW9zLCB7IEF4aW9zUmVzcG9uc2UsIEF4aW9zRXJyb3IgfSBmcm9tICdheGlvcyc7XG5cbmltcG9ydCB7YWRkRXJyb3IsIGFkZEluZm99IGZyb20gJy4vbm90aWZpY2F0aW9uc0FjdGlvbnMnO1xuXG5leHBvcnQgY29uc3QgQUREX0NIQU5ORUxTID0gJ0FERF9DSEFOTkVMUyc7XG5leHBvcnQgY29uc3QgU0VUX0NIQU5ORUxfRkVUQ0hJTkdfTkVXX01FU1NBR0VTID0gJ1NFVF9DSEFOTkVMX0ZFVENISU5HX05FV19NRVNTQUdFUyc7XG5leHBvcnQgY29uc3QgU0VUX0NIQU5ORUxfSEFTX01PUkVfTUVTU0FHRVMgPSAnU0VUX0NIQU5ORUxfSEFTX01PUkVfTUVTU0FHRSc7XG5leHBvcnQgY29uc3QgQUREX1JFQ0VJVkVEX0NIQU5ORUxfTUVTU0FHRSA9ICdBRERfUkVDRUlWRURfQ0hBTk5FTF9NRVNTQUdFJztcbmV4cG9ydCBjb25zdCBBRERfUkVUUklFVkVEX0NIQU5ORUxfTUVTU0FHRVMgPSAnQUREX1JFVFJJRVZFRF9DSEFOTkVMX01FU1NBR0VTJztcbmV4cG9ydCBjb25zdCBJTkNSRU1FTlRfQ0hBTk5FTF9SRVRSSUVWRV9NRVNTQUdFU19PRkZTRVQgPSAnSU5DUkVNRU5UX0NIQU5ORUxfUkVUUklFVkVfTUVTU0FHRVNfT0ZGU0VUJztcbmV4cG9ydCBjb25zdCBSRVRSSUVWRV9DSEFOTkVMX01FU1NBR0VTID0gJ1JFVFJJRVZFX0NIQU5ORUxfTUVTU0FHRVMnO1xuZXhwb3J0IGNvbnN0IENMRUFSX0NIQU5ORUxTX0RBVEEgPSAnQ0xFQVJfQ0hBTk5FTFNfREFUQSc7XG5cbmV4cG9ydCBjb25zdCBhZGRDaGFubmVscyA9IChjaGFubmVsTmFtZXM6IHN0cmluZ1tdKSA9PiB7XG4gICAgbGV0IGNoYW5uZWxzOiBTdGF0ZSA9IFtdO1xuICAgIGNoYW5uZWxOYW1lcy5mb3JFYWNoKChuYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgY2hhbm5lbHMucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgbWVzc2FnZXM6IFtdLFxuICAgICAgICAgICAgcmV0cmlldmVNZXNzYWdlc09mZnNldDogMCxcbiAgICAgICAgICAgIGhhc01vcmVNZXNzYWdlczogdHJ1ZSxcbiAgICAgICAgICAgIGZldGNoaW5nTmV3TWVzc2FnZXM6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IEFERF9DSEFOTkVMUyxcbiAgICAgICAgZGF0YTogeyBjaGFubmVsczogY2hhbm5lbHMgfVxuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCBpbmNyZW1lbnRDaGFubmVsUmV0cmlldmVNZXNzYWdlc09mZnNldCA9IChjaGFubmVsOiBzdHJpbmcsIG46IG51bWJlcikgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IElOQ1JFTUVOVF9DSEFOTkVMX1JFVFJJRVZFX01FU1NBR0VTX09GRlNFVCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgY2hhbm5lbDogY2hhbm5lbCxcbiAgICAgICAgICAgIGluY3JlbWVudDogblxuICAgICAgICB9XG4gICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IHNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzID0gKGNoYW5uZWw6IHN0cmluZywgaXNGZXRjaGluZzogYm9vbGVhbikgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFNFVF9DSEFOTkVMX0ZFVENISU5HX05FV19NRVNTQUdFUyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgY2hhbm5lbE5hbWU6IGNoYW5uZWwsXG4gICAgICAgICAgICBpc0ZldGNoaW5nOiBpc0ZldGNoaW5nXG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5leHBvcnQgY29uc3Qgc2V0Q2hhbm5lbEhhc01vcmVNZXNzYWdlcyA9IChjaGFubmVsTmFtZTogc3RyaW5nLCBoYXNNb3JlOiBib29sZWFuKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogU0VUX0NIQU5ORUxfSEFTX01PUkVfTUVTU0FHRVMsXG4gICAgICAgIGRhdGE6IHsgY2hhbm5lbE5hbWU6IGNoYW5uZWxOYW1lLCBoYXNNb3JlOiBoYXNNb3JlIH1cbiAgICB9O1xufVxuXG5leHBvcnQgY29uc3QgYWRkUmVjZWl2ZWRDaGFubmVsTWVzc2FnZSA9IChjaGFubmVsTmFtZTogc3RyaW5nLCBtZXNzYWdlOiBNZXNzYWdlKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogQUREX1JFQ0VJVkVEX0NIQU5ORUxfTUVTU0FHRSxcbiAgICAgICAgZGF0YTogeyBtZXNzYWdlOiBtZXNzYWdlLCBjaGFubmVsTmFtZTogY2hhbm5lbE5hbWUgfVxuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCBhZGRSZXRyaWV2ZWRDaGFubmVsTWVzc2FnZXMgPSAoY2hhbm5lbE5hbWU6IHN0cmluZywgbWVzc2FnZXM6IE1lc3NhZ2VbXSkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IEFERF9SRVRSSUVWRURfQ0hBTk5FTF9NRVNTQUdFUyxcbiAgICAgICAgZGF0YToge2NoYW5uZWxOYW1lOiBjaGFubmVsTmFtZSwgbWVzc2FnZXM6IG1lc3NhZ2VzfVxuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCBjbGVhckNoYW5uZWxzRGF0YSA9ICgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBDTEVBUl9DSEFOTkVMU19EQVRBXG4gICAgfVxufVxuXG4vKiBBc3luYyBBY3Rpb25zICovXG5cbmV4cG9ydCBjb25zdCBmZXRjaENoYW5uZWxzID0gKCkgPT4ge1xuICAgIHJldHVybiAoZGlzcGF0Y2g6IGFueSkgID0+IHtcbiAgICAgICAgcmV0dXJuIGF4aW9zLmdldCgnL2FwaS92MS9jaGFubmVscycpLnRoZW4oKHJlczogQXhpb3NSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGNoYW5uZWxzID0gcmVzLmRhdGEuY2hhbm5lbHMubWFwKCAoYzoge25hbWU6IHN0cmluZywgX2lkOiBzdHJpbmd9KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGMubmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGRpc3BhdGNoKGFkZENoYW5uZWxzKGNoYW5uZWxzKSk7XG4gICAgICAgIH0pLmNhdGNoKChlcnI6IEF4aW9zRXJyb3IpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBkaXNwYXRjaChhZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIGZldGNoIHRoZSBjaGFubmVscycpKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgcmV0cmlldmVDaGFubmVsTWVzc2FnZXMgPSAoY2hhbm5lbE5hbWU6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiBhc3luYyAoZGlzcGF0Y2g6IGFueSwgZ2V0U3RhdGU6IGFueSkgPT4ge1xuICAgICAgICBsZXQgY2hhbm5lbDogQ2hhbm5lbCA9IGdldFN0YXRlKCkuY2hhbm5lbHMuZmluZCggKGM6IENoYW5uZWwpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjLm5hbWUgPT09IGNoYW5uZWxOYW1lO1xuICAgICAgICB9KVxuICAgICAgICBpZiAoIWNoYW5uZWwgfHwgY2hhbm5lbC5mZXRjaGluZ05ld01lc3NhZ2VzIHx8ICFjaGFubmVsLmhhc01vcmVNZXNzYWdlcykge1xuICAgICAgICAgICAgZGlzcGF0Y2goYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBmZXRjaCBtZXNzYWdlcycpKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoJ1JldHJpZXZlIENoYW5uZWwgTWVzc2FnZXMgZGlzcGF0Y2hlZCB3aXRoIGluY29ycmVjdCBjaGFubmVsIG5hbWUgb3Igd2hpbGUgYWxyZWFkeSBmZXRjaGluZyBtZXNzYWdlcycpO1xuICAgICAgICB9XG4gICAgICAgIGRpc3BhdGNoKHNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzKGNoYW5uZWwubmFtZSwgdHJ1ZSkpO1xuICAgICAgICByZXR1cm4gYXhpb3MuZ2V0KCcvYXBpL3YxL21lc3NhZ2VzLycgKyBjaGFubmVsLm5hbWUgKyAnLycgKyBjaGFubmVsLnJldHJpZXZlTWVzc2FnZXNPZmZzZXQpLnRoZW4oKHJlczogQXhpb3NSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLm1lc3NhZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGRpc3BhdGNoKHNldENoYW5uZWxIYXNNb3JlTWVzc2FnZXMoY2hhbm5lbC5uYW1lLCBmYWxzZSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkaXNwYXRjaChpbmNyZW1lbnRDaGFubmVsUmV0cmlldmVNZXNzYWdlc09mZnNldChjaGFubmVsTmFtZSwgcmVzLmRhdGEubWVzc2FnZXMubGVuZ3RoKSk7XG4gICAgICAgICAgICBkaXNwYXRjaChhZGRSZXRyaWV2ZWRDaGFubmVsTWVzc2FnZXMoY2hhbm5lbC5uYW1lLCByZXMuZGF0YS5tZXNzYWdlcykpXG4gICAgICAgIH0pLmNhdGNoKChlcnI6IEF4aW9zRXJyb3IpID0+IHtcbiAgICAgICAgICAgIGRpc3BhdGNoKGFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gZmV0Y2ggbWVzc2FnZXMnKSk7XG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGRpc3BhdGNoKHNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzKGNoYW5uZWwubmFtZSwgZmFsc2UpKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgZGVsZXRlQ2hhbm5lbCA9IChjaGFubmVsTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIChkaXNwYXRjaDogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiBheGlvcy5nZXQoJy9hcGkvdjEvY2hhbm5lbC9kZWxldGUvJyArIGNoYW5uZWxOYW1lKS5cbiAgICAgICAgICAgIHRoZW4oKHJlczogQXhpb3NSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGRpc3BhdGNoKGFkZEluZm8oJ0NoYW5uZWwgZGVsZXRlZCcpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2goZmV0Y2hDaGFubmVscygpKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnI6IEF4aW9zRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2goYWRkRXJyb3IoZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCBhZGRDaGFubmVsID0gKGNoYW5uZWxOYW1lOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gKGRpc3BhdGNoOiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIGF4aW9zLnBvc3QoJy9hcGkvdjEvY2hhbm5lbC9jcmVhdGUnLCB7XG4gICAgICAgICAgICBjaGFubmVsTmFtZTogY2hhbm5lbE5hbWVcbiAgICAgICAgfSkudGhlbigocmVzOiBBeGlvc1Jlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBkaXNwYXRjaChhZGRJbmZvKCdDaGFubmVsIGNyZWF0ZWQnKSk7XG4gICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2goZmV0Y2hDaGFubmVscygpKTtcbiAgICAgICAgfSkuY2F0Y2goKGVycjogQXhpb3NFcnJvcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGRpc3BhdGNoKGFkZEVycm9yKGVyci5yZXNwb25zZS5kYXRhLmVycm9yKSk7XG4gICAgICAgIH0pXG4gICAgfTtcbn1cbiIsImltcG9ydCBheGlvcywgeyBBeGlvc0Vycm9yLCBBeGlvc1Jlc3BvbnNlIH0gZnJvbSAnYXhpb3MnO1xuXG5pbXBvcnQge1N0YXRlLCBDaGF0VXNlcn0gZnJvbSAnLi4vcmVkdWNlcnMvY2hhdFVzZXJzJztcbmltcG9ydCB7IERpc3BhdGNoIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgYWRkRXJyb3IgfSBmcm9tICcuL25vdGlmaWNhdGlvbnNBY3Rpb25zJztcblxuZXhwb3J0IGNvbnN0IFVQREFURV9DSEFUX1VTRVJTID0gJ1VQREFURV9DSEFUX1VTRVJTJztcbmV4cG9ydCBjb25zdCBBRERfQ0hBVF9VU0VSID0gJ0FERF9VU0VSJztcbmV4cG9ydCBjb25zdCBSRU1PVkVfQ0hBVF9VU0VSID0gJ1JFTU9WRV9VU0VSJztcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZVVzZXJzID0gZnVuY3Rpb24odXNlcnM6IFN0YXRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogVVBEQVRFX0NIQVRfVVNFUlMsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHVzZXJzOiB1c2Vyc1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgYWRkVXNlciA9IGZ1bmN0aW9uKHVzZXI6IENoYXRVc2VyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogQUREX0NIQVRfVVNFUixcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgdXNlcjogdXNlclxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgcmVtb3ZlVXNlciA9IGZ1bmN0aW9uKGVtYWlsOiBzdHJpbmcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBSRU1PVkVfQ0hBVF9VU0VSLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBlbWFpbDogZW1haWxcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyogQXN5bmMgRnVuY3Rpb25zICovXG5leHBvcnQgY29uc3QgZmV0Y2hBbGxVc2VycyA9ICgpID0+IHtcbiAgICByZXR1cm4gKGRpc3BhdGNoOiBEaXNwYXRjaCkgPT4ge1xuICAgICAgICByZXR1cm4gYXhpb3MuZ2V0KCcvYXBpL3YxL3VzZXJzJykudGhlbigocmVzOiBBeGlvc1Jlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBsZXQgdXNlcnM6IFN0YXRlID0ge307XG4gICAgICAgICAgICByZXMuZGF0YS51c2Vycy5mb3JFYWNoKCh1OiBDaGF0VXNlcikgPT4ge1xuICAgICAgICAgICAgICAgIHVzZXJzW3UuZW1haWxdID0ge1xuICAgICAgICAgICAgICAgICAgICByb2xlOiB1LnJvbGUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHUubmFtZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRpc3BhdGNoKHVwZGF0ZVVzZXJzKHVzZXJzKSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9KS5jYXRjaCgoZXJyOiBBeGlvc0Vycm9yKSA9PiB7XG4gICAgICAgICAgICBkaXNwYXRjaChhZGRFcnJvcignRmV0Y2hpbmcgYWxsIHVzZXJzIGZhaWxlZCcpKTtcbiAgICAgICAgICAgIHJldHVybiBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU5ld1VzZXIgPSAodXNlcjogQ2hhdFVzZXIpID0+IHtcblxufVxuXG5leHBvcnQgY29uc3QgZWRpdFVzZXIgPSAoZW1haWw6IHN0cmluZywgdXNlcjogQ2hhdFVzZXIpID0+IHtcblxufVxuXG5leHBvcnQgY29uc3QgZGVsZXRlVXNlciA9IChlbWFpbDogc3RyaW5nKSA9PiB7XG5cbn0iLCJleHBvcnQgY29uc3QgQUREX0VSUk9SID0gJ0FERF9FUlJPUic7XG5leHBvcnQgY29uc3QgUkVNT1ZFX0VSUk9SID0gJ1JFTU9WRV9FUlJPUic7XG5leHBvcnQgY29uc3QgQ0xFQVJfRVJST1JTID0gJ0NMRUFSX0VSUk9SUyc7XG5leHBvcnQgY29uc3QgQUREX0lORk8gPSAnQUREX0lORk8nO1xuZXhwb3J0IGNvbnN0IFJFTU9WRV9JTkZPID0gJ1JFTU9WRV9JTkZPJztcbmV4cG9ydCBjb25zdCBDTEVBUl9JTkZPUyA9ICdDTEVBUl9JTkZPUyc7XG5cbmV4cG9ydCBjb25zdCBhZGRFcnJvciA9IChlcnJvcjogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogQUREX0VSUk9SLFxuICAgICAgICBkYXRhOiBlcnJvclxuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCByZW1vdmVFcnJvciA9IChpOiBudW1iZXIpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBSRU1PVkVfRVJST1IsXG4gICAgICAgIGRhdGE6IGlcbiAgICB9O1xufVxuXG5leHBvcnQgY29uc3QgY2xlYXJFcnJvcnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHsgdHlwZTogQ0xFQVJfRVJST1JTIH07XG59XG5cbmV4cG9ydCBjb25zdCBhZGRJbmZvID0gKGluZm86IHN0cmluZykgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IEFERF9JTkZPLFxuICAgICAgICBkYXRhOiBpbmZvXG4gICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IHJlbW92ZUluZm8gPSAoaTogbnVtYmVyKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogUkVNT1ZFX0lORk8sXG4gICAgICAgIGRhdGE6IGlcbiAgICB9O1xufVxuXG5leHBvcnQgY29uc3QgY2xlYXJJbmZvcyA9ICgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBDTEVBUl9JTkZPU1xuICAgIH07XG59XG4iLCJleHBvcnQgY29uc3QgVE9HR0xFX1NJREVCQVJfT1BFTiA9ICdUT0dHTEVfU0lERUJBUl9PUEVOJztcblxuZXhwb3J0IGNvbnN0IHRvZ2dsZVNpZGViYXJPcGVuID0gKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFRPR0dMRV9TSURFQkFSX09QRU5cbiAgICB9XG59IiwiaW1wb3J0ICogYXMgaW8gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5pbXBvcnQgeyBEaXNwYXRjaCB9IGZyb20gJ3JlZHV4JztcblxuaW1wb3J0IHtTdGF0ZX0gZnJvbSAnLi4vc3RvcmUnO1xuXG5leHBvcnQgY29uc3QgSU5JVF9XRUJTT0NLRVQgPSAnSU5JVF9XRUJTT0NLRVQnO1xuZXhwb3J0IGNvbnN0IFNFVF9TT0NLRVRfQ09OTkVDVEVEID0gJ1NFVF9TT0NLRVRfQ09OTkVDVEVEJztcbmV4cG9ydCBjb25zdCBTRVRfU09DS0VUX0NPTk5FQ1RFRF9VU0VSUyA9ICdTRVRfU09DS0VUX0NPTk5FQ1RFRF9VU0VSUyc7XG5cbmV4cG9ydCBjb25zdCBpbml0V2Vic29ja2V0ID0gKGlvOiBTb2NrZXRJT0NsaWVudC5Tb2NrZXQpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBJTklUX1dFQlNPQ0tFVCxcbiAgICAgICAgZGF0YTogeyBpbzogaW8gfVxuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCBzZXRTb2NrZXRDb25uZWN0ZWQgPSAoY29ubmVjdGVkOiBib29sZWFuKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogU0VUX1NPQ0tFVF9DT05ORUNURUQsXG4gICAgICAgIGRhdGE6IHsgY29ubmVjdGVkOiBjb25uZWN0ZWQgfVxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IHNldFNvY2tldENvbm5lY3RlZFVzZXJzID0gKHVzZXJFbWFpbHM6IHN0cmluZ1tdKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogU0VUX1NPQ0tFVF9DT05ORUNURURfVVNFUlMsXG4gICAgICAgIGRhdGE6IHsgdXNlckVtYWlsczogdXNlckVtYWlscyB9XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICByZXR1cm4gKGRpc3BhdGNoOiBEaXNwYXRjaCwgZ2V0U3RhdGU6IEZ1bmN0aW9uKSA9PiB7XG4gICAgICAgIGxldCBzb2NrZXQ6IFNvY2tldElPQ2xpZW50LlNvY2tldCA9IGlvKCk7XG4gICAgICAgIHNvY2tldC5vbignY29ubmVjdCcsICgpID0+IHtcbiAgICAgICAgICAgIHNvY2tldFxuICAgICAgICAgICAgICAgIC5lbWl0KCdhdXRoZW50aWNhdGUnLCB7IHRva2VuOiBnZXRTdGF0ZSgpLnVzZXIudG9rZW4gfSkgLy9zZW5kIHRoZSBqd3RcbiAgICAgICAgICAgICAgICAub24oJ2F1dGhlbnRpY2F0ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKHNldFNvY2tldENvbm5lY3RlZCh0cnVlKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhdXRob3JpemVkIFsnICsgc29ja2V0LmlkICsgJ10nKTtcbiAgICAgICAgICAgICAgICAgICAgc29ja2V0Lm9uKCdjb25uZWN0ZWQgdXNlcnMnLCAodXNlckVtYWlsczogc3RyaW5nW10pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKHNldFNvY2tldENvbm5lY3RlZFVzZXJzKHVzZXJFbWFpbHMpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oJ3VuYXV0aG9yaXplZCcsIGZ1bmN0aW9uIChtc2c6IGFueSkge1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChzZXRTb2NrZXRDb25uZWN0ZWQoZmFsc2UpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1bmF1dGhvcml6ZWQ6IFwiICsgSlNPTi5zdHJpbmdpZnkobXNnLmRhdGEpKTtcbiAgICAgICAgICAgICAgICAgICAgc29ja2V0Lm9mZignY29ubmVjdGVkIHVzZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZy5kYXRhLnR5cGUpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgICAgICBzb2NrZXQub24oJ2Rpc2Nvbm5lY3QnLCAoKSA9PiB7XG4gICAgICAgICAgICBkaXNwYXRjaChzZXRTb2NrZXRDb25uZWN0ZWQoZmFsc2UpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEaXNjb25uZWN0ZWQgZnJvbSB3ZWJzb2NrZXQgc2VydmVyLCBhdHRlbXB0aW5nIHJlY29ubmVjdCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGlzcGF0Y2goaW5pdFdlYnNvY2tldChzb2NrZXQpKTtcbiAgICB9XG59IiwiaW1wb3J0IGF4aW9zLCB7IEF4aW9zUmVzcG9uc2UsIEF4aW9zRXJyb3IgfSBmcm9tICdheGlvcyc7XG5pbXBvcnQge1N0YXRlIGFzIFVzZXJTdGF0ZX0gZnJvbSAnLi4vcmVkdWNlcnMvdXNlcic7XG5pbXBvcnQge2NsZWFyQ2hhbm5lbHNEYXRhfSBmcm9tICcuL2NoYW5uZWxzQWN0aW9ucyc7XG5pbXBvcnQge2FkZEVycm9yLCBhZGRJbmZvfSBmcm9tICcuL25vdGlmaWNhdGlvbnNBY3Rpb25zJztcblxuZXhwb3J0IGNvbnN0IFNFVF9BVVRIT1JJWkVEID0gJ1NFVF9BVVRIT1JJWkVEJztcbmV4cG9ydCBjb25zdCBTRVRfVVNFUiA9ICdTRVRfVVNFUic7XG5leHBvcnQgY29uc3QgTE9HT1VUX1VTRVIgPSAnTE9HT1VUX1VTRVInO1xuZXhwb3J0IGNvbnN0IFNFVF9KV1QgPSAnU0VUX0pXVCc7XG5cbmV4cG9ydCBjb25zdCBzZXRBdXRob3JpemVkID0gKGF1dGhvcml6ZWQ6IGJvb2xlYW4pID0+IHtcbiAgICByZXR1cm4gIHtcbiAgICAgICAgdHlwZTogU0VUX0FVVEhPUklaRUQsXG4gICAgICAgIGRhdGE6IGF1dGhvcml6ZWRcbiAgICB9O1xufVxuXG5leHBvcnQgY29uc3Qgc2V0VXNlciA9ICh1c2VyOiBVc2VyU3RhdGUpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBTRVRfVVNFUixcbiAgICAgICAgZGF0YTogdXNlclxuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCBsb2dvdXRVc2VyID0gKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IExPR09VVF9VU0VSXG4gICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IHNldEp3dCA9ICh0b2tlbjogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogU0VUX0pXVCxcbiAgICAgICAgZGF0YTogdG9rZW5cbiAgICB9O1xufVxuXG5leHBvcnQgY29uc3QgbG9nb3V0ID0gKCkgPT4ge1xuICAgIHJldHVybiAoZGlzcGF0Y2g6IGFueSkgPT4ge1xuICAgICAgICBkaXNwYXRjaChsb2dvdXRVc2VyKCkpO1xuICAgICAgICByZXR1cm4gZGlzcGF0Y2goY2xlYXJDaGFubmVsc0RhdGEoKSk7XG4gICAgfVxuICAgIFxufVxuXG4vKiBBc3luYyBBY3Rpb25zICovXG5leHBvcnQgY29uc3QgdXBkYXRlTmFtZSA9IChuYW1lOiBzdHJpbmcsIG9uU3VjY2Vzcz86IEZ1bmN0aW9uKSA9PiB7XG4gICAgcmV0dXJuIChkaXNwYXRjaDogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiBheGlvcy5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL25hbWUnLCB7XG4gICAgICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgIH0pLnRoZW4oKHJlczogQXhpb3NSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgZGlzcGF0Y2goYWRkSW5mbygnTmFtZSB1cGRhdGVkJykpO1xuICAgICAgICAgICAgaWYgKG9uU3VjY2Vzcykgb25TdWNjZXNzKCk7XG4gICAgICAgIH0pLmNhdGNoKChlcnI6IEF4aW9zRXJyb3IpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIucmVzcG9uc2UgJiYgZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpc3BhdGNoKGFkZEVycm9yKGVyci5yZXNwb25zZS5kYXRhLmVycm9yKSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU29tZXRoaW5nIHdlbnQgd3JvbmcgdXBkYXRpbmcgdXNlciBuYW1lJywgZXJyKTtcbiAgICAgICAgICAgIGRpc3BhdGNoKGFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gdXBkYXRlIHlvdXIgbmFtZS4nKSk7XG4gICAgICAgIH0pO1xuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVFbWFpbCA9IChlbWFpbDogc3RyaW5nLCBvblN1Y2Nlc3M/OiBGdW5jdGlvbikgPT4ge1xuICAgIHJldHVybiAoZGlzcGF0Y2g6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gYXhpb3MucG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9lbWFpbCcsIHtcbiAgICAgICAgICAgIGVtYWlsOiBlbWFpbFxuICAgICAgICB9KS50aGVuKChyZXM6IEF4aW9zUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGRpc3BhdGNoKGFkZEluZm8oJ0VtYWlsIHVwZGF0ZWQnKSk7XG4gICAgICAgICAgICBpZiAob25TdWNjZXNzKSBvblN1Y2Nlc3MoKTtcbiAgICAgICAgfSkuY2F0Y2goKGVycjogQXhpb3NFcnJvcikgPT4ge1xuICAgICAgICAgICAgaWYgKGVyci5yZXNwb25zZSAmJiBlcnIucmVzcG9uc2UuZGF0YS5lcnJvcilcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2goYWRkRXJyb3IoZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTb21ldGhpbmcgd2VudCB3cm9uZyB1cGRhdGluZyB1c2VyIGVtYWlsJywgZXJyKTtcbiAgICAgICAgICAgIGRpc3BhdGNoKGFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gdXBkYXRlIHlvdXIgZW1haWwuJykpO1xuICAgICAgICB9KTtcbiAgICB9O1xufVxuXG5leHBvcnQgY29uc3QgdXBkYXRlUGFzc3dvcmQgPSAob2xkUGFzczogc3RyaW5nLCBuZXdQYXNzOiBzdHJpbmcsIG9uU3VjY2Vzcz86IEZ1bmN0aW9uKSA9PiB7XG4gICAgcmV0dXJuIChkaXNwYXRjaDogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiBheGlvcy5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL3Bhc3N3b3JkJywge1xuICAgICAgICAgICAgb2xkUGFzczogb2xkUGFzcyxcbiAgICAgICAgICAgIG5ld1Bhc3M6IG5ld1Bhc3NcbiAgICAgICAgfSkudGhlbigocmVzOiBBeGlvc1Jlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBkaXNwYXRjaChhZGRJbmZvKCdQYXNzd29yZCB1cGRhdGVkJykpO1xuICAgICAgICAgICAgaWYgKG9uU3VjY2Vzcykgb25TdWNjZXNzKCk7XG4gICAgICAgIH0pLmNhdGNoKChlcnI6IEF4aW9zRXJyb3IpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIucmVzcG9uc2UgJiYgZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpc3BhdGNoKGFkZEVycm9yKGVyci5yZXNwb25zZS5kYXRhLmVycm9yKSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU29tZXRoaW5nIHdlbnQgd3JvbmcgdXBkYXRpbmcgdXNlciBwYXNzd29yZCcsIGVycik7XG4gICAgICAgICAgICBkaXNwYXRjaChhZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIHVwZGF0ZSB5b3VyIHBhc3N3b3JkLicpKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn0iLCJpbXBvcnQge0FERF9DSEFOTkVMUyxcbiAgICAgICAgU0VUX0NIQU5ORUxfRkVUQ0hJTkdfTkVXX01FU1NBR0VTLFxuICAgICAgICBTRVRfQ0hBTk5FTF9IQVNfTU9SRV9NRVNTQUdFUyxcbiAgICAgICAgQUREX1JFQ0VJVkVEX0NIQU5ORUxfTUVTU0FHRSxcbiAgICAgICAgQUREX1JFVFJJRVZFRF9DSEFOTkVMX01FU1NBR0VTLFxuICAgICAgICBJTkNSRU1FTlRfQ0hBTk5FTF9SRVRSSUVWRV9NRVNTQUdFU19PRkZTRVQsXG4gICAgICAgIENMRUFSX0NIQU5ORUxTX0RBVEF9XG4gICAgZnJvbSAnLi4vYWN0aW9ucy9jaGFubmVsc0FjdGlvbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1lc3NhZ2Uge1xuICAgIHVzZXJFbWFpbDogc3RyaW5nLFxuICAgIGNyZWF0ZWQ6IHN0cmluZyxcbiAgICBfaWQ6IHN0cmluZyxcbiAgICB0ZXh0OiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDaGFubmVsIHtcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgbWVzc2FnZXM6IE1lc3NhZ2VbXSxcbiAgICByZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0OiBudW1iZXIsXG4gICAgaGFzTW9yZU1lc3NhZ2VzOiBib29sZWFuXG4gICAgZmV0Y2hpbmdOZXdNZXNzYWdlczogYm9vbGVhblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0YXRlIGV4dGVuZHMgQXJyYXk8Q2hhbm5lbD4ge1xuXG59XG5cbmludGVyZmFjZSBBY3Rpb24ge1xuICAgIHR5cGU6IHN0cmluZyxcbiAgICBkYXRhOiBhbnlcbn1cblxubGV0IGluaXRpYWxTdGF0ZTogU3RhdGUgPSBbXTtcblxuZXhwb3J0IGNvbnN0IGNoYW5uZWxFeGlzdHMgPSAoY2hhbm5lbHM6IENoYW5uZWxbXSB8IFN0YXRlLCBjaGFubmVsTmFtZTogc3RyaW5nKTogYW55ID0+ICB7XG4gICAgbGV0IGNoYW5uZWwgPSBjaGFubmVscy5maW5kKCAoYzogQ2hhbm5lbCkgPT4ge1xuICAgICAgICByZXR1cm4gYy5uYW1lID09PSBjaGFubmVsTmFtZTtcbiAgICB9KTtcbiAgICBpZiAoIWNoYW5uZWwpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gY2hhbm5lbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlOiBTdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uOiBBY3Rpb24pIHtcbiAgICBzd2l0Y2goYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBBRERfQ0hBTk5FTFM6XG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uLmRhdGEuY2hhbm5lbHM7XG4gICAgICAgIGNhc2UgSU5DUkVNRU5UX0NIQU5ORUxfUkVUUklFVkVfTUVTU0FHRVNfT0ZGU0VUOiB7XG4gICAgICAgICAgICBsZXQgY2hhbm5lbDogQ2hhbm5lbCA9IGNoYW5uZWxFeGlzdHMoc3RhdGUsIGFjdGlvbi5kYXRhLmNoYW5uZWwpO1xuICAgICAgICAgICAgbGV0IGluY3JlbWVudDogbnVtYmVyID0gYWN0aW9uLmRhdGEuaW5jcmVtZW50O1xuICAgICAgICAgICAgaWYgKCFjaGFubmVsKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Vua25vd24gY2hhbm5lbCB3aGlsZSBpbmNyZW1lbnRpbmcgbWVzc2FnZXMgb2Zmc2V0JywgYWN0aW9uKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbmV3Q2hhbm5lbHM6IENoYW5uZWxbXSA9IHN0YXRlLm1hcCggKGM6IENoYW5uZWwpID0+IHtcbiAgICAgICAgICAgICAgICBpZihjLm5hbWUgPT09IGNoYW5uZWwubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjLnJldHJpZXZlTWVzc2FnZXNPZmZzZXQgKz0gaW5jcmVtZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG5ld0NoYW5uZWxzO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgU0VUX0NIQU5ORUxfRkVUQ0hJTkdfTkVXX01FU1NBR0VTOlxuICAgICAgICAgICAgbGV0IGNoYW5uZWw6IENoYW5uZWwgPSBjaGFubmVsRXhpc3RzKHN0YXRlLCBhY3Rpb24uZGF0YS5jaGFubmVsTmFtZSk7XG4gICAgICAgICAgICBpZiAoIWNoYW5uZWwpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVW5rbm93biBjaGFubmVsIHdoaWxlIGZldGNoaW5nIG5ldyBtZXNzYWdlcycsIGFjdGlvbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG5ld0NoYW5uZWxzOiBDaGFubmVsW10gPSBzdGF0ZS5tYXAoIChjOiBDaGFubmVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGMubmFtZSA9PT0gYWN0aW9uLmRhdGEuY2hhbm5lbE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgYy5mZXRjaGluZ05ld01lc3NhZ2VzID0gYWN0aW9uLmRhdGEuaXNGZXRjaGluZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBuZXdDaGFubmVscztcbiAgICAgICAgY2FzZSBTRVRfQ0hBTk5FTF9IQVNfTU9SRV9NRVNTQUdFUzoge1xuICAgICAgICAgICAgbGV0IGNoYW5uZWw6IENoYW5uZWwgPSBjaGFubmVsRXhpc3RzKHN0YXRlLCBhY3Rpb24uZGF0YS5jaGFubmVsTmFtZSk7XG4gICAgICAgICAgICBsZXQgaGFzTW9yZTogYm9vbGVhbiA9IGFjdGlvbi5kYXRhLmhhc01vcmU7XG4gICAgICAgICAgICBpZiAoIWNoYW5uZWwpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVW5rbm93biBjaGFubmVsIHdoaWxlIHNldHRpbmcgaGFzTW9yZSBtZXNzYWdlcycsIGFjdGlvbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG5ld0NoYW5uZWxzOiBDaGFubmVsW10gPSBzdGF0ZS5tYXAoIChjOiBDaGFubmVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGMubmFtZSA9PT0gYWN0aW9uLmRhdGEuY2hhbm5lbE5hbWUpXG4gICAgICAgICAgICAgICAgICAgIGMuaGFzTW9yZU1lc3NhZ2VzID0gaGFzTW9yZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG5ld0NoYW5uZWxzO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQUREX1JFVFJJRVZFRF9DSEFOTkVMX01FU1NBR0VTOiB7XG4gICAgICAgICAgICBsZXQgcmV0cmlldmVkTWVzc2FnZXM6IE1lc3NhZ2VbXSA9IGFjdGlvbi5kYXRhLm1lc3NhZ2VzO1xuICAgICAgICAgICAgbGV0IGNoYW5uZWxOYW1lOiBzdHJpbmcgPSBhY3Rpb24uZGF0YS5jaGFubmVsTmFtZTtcbiAgICAgICAgICAgIGxldCBjaGFubmVsOiBDaGFubmVsID0gY2hhbm5lbEV4aXN0cyhzdGF0ZSwgY2hhbm5lbE5hbWUpO1xuICAgICAgICAgICAgaWYoIWNoYW5uZWwpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVW5rbm93biBjaGFubmVsIHdoaWxlIGFkZGluZyByZXRyaWV2ZWQgY2hhbm5lbCBtZXNzYWdlcycsIGFjdGlvbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG5ld0NoYW5uZWxzOiBDaGFubmVsW10gPSBzdGF0ZS5tYXAoIChjOiBDaGFubmVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGMubmFtZSA9PT0gY2hhbm5lbE5hbWUpXG4gICAgICAgICAgICAgICAgICAgIGMubWVzc2FnZXMgPSByZXRyaWV2ZWRNZXNzYWdlcy5jb25jYXQoYy5tZXNzYWdlcyk7Ly9jLm1lc3NhZ2VzLmNvbmNhdChtZXNzYWdlcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBuZXdDaGFubmVscztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEFERF9SRUNFSVZFRF9DSEFOTkVMX01FU1NBR0U6IHtcbiAgICAgICAgICAgIGxldCByZWNlaXZlZE1lc3NhZ2UgPSBhY3Rpb24uZGF0YS5tZXNzYWdlO1xuICAgICAgICAgICAgbGV0IGNoYW5uZWxOYW1lID0gYWN0aW9uLmRhdGEuY2hhbm5lbE5hbWU7XG4gICAgICAgICAgICBsZXQgY2hhbm5lbDogQ2hhbm5lbCA9IGNoYW5uZWxFeGlzdHMoc3RhdGUsIGNoYW5uZWxOYW1lKTtcbiAgICAgICAgICAgIGlmICghY2hhbm5lbCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVbmtub3duIGNoYW5uZWwgd2hpbGUgYWRkaW5nIHJlY2VpdmVkIG1lc3NhZ2UnLCBzdGF0ZSwgYWN0aW9uKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbmV3Q2hhbm5lbHM6IENoYW5uZWxbXSA9IHN0YXRlLm1hcCgoYzogQ2hhbm5lbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGMubmFtZSA9PT0gY2hhbm5lbE5hbWUpIFxuICAgICAgICAgICAgICAgICAgICBjLm1lc3NhZ2VzID0gYy5tZXNzYWdlcy5jb25jYXQoW3JlY2VpdmVkTWVzc2FnZV0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiBuZXdDaGFubmVscztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENMRUFSX0NIQU5ORUxTX0RBVEE6XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufSIsImltcG9ydCB7QW55QWN0aW9ufSBmcm9tICdyZWR1eCc7XG5pbXBvcnQge1VQREFURV9DSEFUX1VTRVJTLCBBRERfQ0hBVF9VU0VSLCBSRU1PVkVfQ0hBVF9VU0VSfVxuICAgIGZyb20gJy4uL2FjdGlvbnMvY2hhdFVzZXJzQWN0aW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGUge1xuICAgIFtlbWFpbDogc3RyaW5nXToge1xuICAgICAgICByb2xlOiBzdHJpbmcsXG4gICAgICAgIG5hbWU6IHN0cmluZyxcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2hhdFVzZXIge1xuICAgIGVtYWlsOiBzdHJpbmcsXG4gICAgcm9sZTogc3RyaW5nLFxuICAgIG5hbWU6IHN0cmluZyxcbn1cblxubGV0IGluaXRpYWxTdGF0ZTogU3RhdGUgPSB7XG4gICAgXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHN0YXRlOiBTdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uOiBBbnlBY3Rpb24pIHtcbiAgICBzd2l0Y2goYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBVUERBVEVfQ0hBVF9VU0VSUzpcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb24uZGF0YS51c2VycztcbiAgICAgICAgY2FzZSBBRERfQ0hBVF9VU0VSOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgW2FjdGlvbi5kYXRhLnVzZXIuZW1haWxdOiB7XG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IGFjdGlvbi5kYXRhLnVzZXIucm9sZSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogYWN0aW9uLmRhdGEudXNlci5uYW1lLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIFJFTU9WRV9DSEFUX1VTRVI6XG4gICAgICAgICAgICBsZXQgY2xvbmU6IFN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpO1xuICAgICAgICAgICAgZGVsZXRlIGNsb25lW2FjdGlvbi5kYXRhLmVtYWlsXVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn0iLCJpbXBvcnQge0FERF9FUlJPUiwgUkVNT1ZFX0VSUk9SLCBDTEVBUl9FUlJPUlMsIEFERF9JTkZPLCBSRU1PVkVfSU5GTywgQ0xFQVJfSU5GT1N9XG4gICAgZnJvbSAnLi4vYWN0aW9ucy9ub3RpZmljYXRpb25zQWN0aW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGUge1xuICAgIGVycm9yczogc3RyaW5nW10sXG4gICAgaW5mb3M6IHN0cmluZ1tdLFxufVxuaW50ZXJmYWNlIEFjdGlvbiB7XG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGRhdGE6IGFueVxufVxuXG5sZXQgaW5pdGlhbFN0YXRlOiBTdGF0ZSA9IHtcbiAgICBlcnJvcnM6IFtdLFxuICAgIGluZm9zOiBbXVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzdGF0ZTogU3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbjogQWN0aW9uKSB7XG4gICAgc3dpdGNoKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgQUREX0VSUk9SOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7ZXJyb3JzOiBzdGF0ZS5lcnJvcnMuY29uY2F0KFthY3Rpb24uZGF0YV0pfSk7XG4gICAgICAgIGNhc2UgUkVNT1ZFX0VSUk9SOlxuICAgICAgICAgICAgbGV0IG5ld0Vycm9yc0FycmF5ID0gc3RhdGUuZXJyb3JzLnNsaWNlKCk7XG4gICAgICAgICAgICBuZXdFcnJvcnNBcnJheS5zcGxpY2UoYWN0aW9uLmRhdGEsIDEpO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7ZXJyb3JzOiBuZXdFcnJvcnNBcnJheX0pO1xuICAgICAgICBjYXNlIENMRUFSX0VSUk9SUzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgIHtlcnJvcnM6IFtdfSk7XG4gICAgICAgIGNhc2UgQUREX0lORk86XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtpbmZvczogc3RhdGUuaW5mb3MuY29uY2F0KFthY3Rpb24uZGF0YV0pfSk7XG4gICAgICAgIGNhc2UgUkVNT1ZFX0lORk86XG4gICAgICAgICAgICBsZXQgbmV3SW5mb3NBcnJheSA9IHN0YXRlLmluZm9zLnNsaWNlKCk7XG4gICAgICAgICAgICBuZXdJbmZvc0FycmF5LnNwbGljZShhY3Rpb24uZGF0YSwgMSk7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgaW5mb3M6IG5ld0luZm9zQXJyYXkgfSk7XG4gICAgICAgIGNhc2UgQ0xFQVJfSU5GT1M6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtpbmZvczogW119KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59IiwiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSBcInJlZHV4XCI7XG5pbXBvcnQgeyBUT0dHTEVfU0lERUJBUl9PUEVOIH0gZnJvbSAnLi4vYWN0aW9ucy9zaWRlYmFyQWN0aW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGUge1xuICAgIG9wZW46IGJvb2xlYW5cbn1cblxubGV0IGluaXRpYWxTdGF0ZTogU3RhdGUgPSB7XG4gICAgb3BlbjogdHJ1ZVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzdGF0ZTogU3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbjogQWN0aW9uKSB7XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIFRPR0dMRV9TSURFQkFSX09QRU46XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtvcGVuOiAhc3RhdGUub3Blbn0pO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBBbnlBY3Rpb24gfSBmcm9tIFwicmVkdXhcIjtcbmltcG9ydCAqIGFzIGlvIGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuXG5pbXBvcnQgeyBJTklUX1dFQlNPQ0tFVCxcbiAgICAgICAgIFNFVF9TT0NLRVRfQ09OTkVDVEVELFxuICAgICAgICAgU0VUX1NPQ0tFVF9DT05ORUNURURfVVNFUlMgfVxuICAgIGZyb20gJy4uL2FjdGlvbnMvc29ja2V0QWN0aW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGUge1xuICAgIGlvOiBTb2NrZXRJT0NsaWVudC5Tb2NrZXQgfCBudWxsLFxuICAgIGNvbm5lY3RlZDogYm9vbGVhbixcbiAgICBjb25uZWN0ZWRVc2VyRW1haWxzOiBzdHJpbmdbXVxufVxuXG5sZXQgaW5pdGlhbFN0YXRlOiBTdGF0ZSA9IHtcbiAgICBpbzogbnVsbCxcbiAgICBjb25uZWN0ZWQ6IGZhbHNlLFxuICAgIGNvbm5lY3RlZFVzZXJFbWFpbHM6IFtdXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHN0YXRlOiBTdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uOiBBbnlBY3Rpb24pIHtcbiAgICBzd2l0Y2goYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBJTklUX1dFQlNPQ0tFVDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge2lvOiBhY3Rpb24uZGF0YS5pb30pO1xuICAgICAgICBjYXNlIFNFVF9TT0NLRVRfQ09OTkVDVEVEOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7Y29ubmVjdGVkOiBhY3Rpb24uZGF0YS5jb25uZWN0ZWR9KTtcbiAgICAgICAgY2FzZSBTRVRfU09DS0VUX0NPTk5FQ1RFRF9VU0VSUzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge2Nvbm5lY3RlZFVzZXJFbWFpbHM6IGFjdGlvbi5kYXRhLnVzZXJFbWFpbHMgfSlcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59IiwiaW1wb3J0IHtTRVRfQVVUSE9SSVpFRCwgU0VUX1VTRVIsIExPR09VVF9VU0VSLCBTRVRfSldUfSBmcm9tICcuLi9hY3Rpb25zL3VzZXJBY3Rpb25zJztcblxuZXhwb3J0IGludGVyZmFjZSBTdGF0ZSB7XG4gICAgYXV0aG9yaXplZD86IGJvb2xlYW4sXG4gICAgZW1haWw/OiBzdHJpbmcgfCBib29sZWFuLFxuICAgIG5hbWU/OiBzdHJpbmcgfCBib29sZWFuLFxuICAgIHJvbGU/OiBzdHJpbmcgfCBib29sZWFuLFxuICAgIGp3dD86IHN0cmluZyB8IGJvb2xlYW4sXG59XG5cbmludGVyZmFjZSBBY3Rpb24ge1xuICAgIHR5cGU6IHN0cmluZyxcbiAgICBkYXRhOiBhbnlcbn1cblxubGV0IGluaXRpYWxTdGF0ZSA6IFN0YXRlID0ge1xuICAgIGF1dGhvcml6ZWQ6IGZhbHNlLFxuICAgIGVtYWlsOiBmYWxzZSxcbiAgICBuYW1lOiBmYWxzZSxcbiAgICByb2xlOiBmYWxzZSxcbiAgICBqd3Q6IGZhbHNlLFxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHN0YXRlOiBTdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uOiBBY3Rpb24pIHtcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgU0VUX0FVVEhPUklaRUQ6XG4gICAgICAgICAgICBpZiAodHlwZW9mIGFjdGlvbi5kYXRhICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhIG11c3QgYmUgYm9vbGVhbiBmb3IgU0VUX0FVVEhPUklaRUQgYWN0aW9uJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFjdGlvbi5kYXRhID09PSBmYWxzZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHthdXRob3JpemVkOiBmYWxzZSwgZW1haWw6IGZhbHNlfSk7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHthdXRob3JpemVkOiBhY3Rpb24uZGF0YX0pO1xuICAgICAgICBjYXNlIFNFVF9VU0VSOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBhY3Rpb24uZGF0YSk7XG4gICAgICAgIGNhc2UgTE9HT1VUX1VTRVI6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGF1dGhvcml6ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG5hbWU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVtYWlsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICByb2xlOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICBjYXNlIFNFVF9KV1Q6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHt0b2tlbjogYWN0aW9uLmRhdGF9KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59IiwiaW1wb3J0IHtjcmVhdGVTdG9yZSwgY29tYmluZVJlZHVjZXJzLCBhcHBseU1pZGRsZXdhcmUsIFJlZHVjZXIsIFN0b3JlRW5oYW5jZXJ9IGZyb20gJ3JlZHV4JztcbmltcG9ydCByZWR1eFRodW5rIGZyb20gJ3JlZHV4LXRodW5rJztcbmltcG9ydCB7Y3JlYXRlTG9nZ2VyfSBmcm9tICdyZWR1eC1sb2dnZXInO1xuXG5pbXBvcnQgdXNlclJlZHVjZXIsIHtTdGF0ZSBhcyBVc2VyU3RhdGV9IGZyb20gJy4vcmVkdWNlcnMvdXNlcic7XG5pbXBvcnQgY2hhbm5lbHNSZWR1Y2VyLCB7U3RhdGUgYXMgQ2hhbm5lbHNTdGF0ZX0gZnJvbSAnLi9yZWR1Y2Vycy9jaGFubmVscyc7XG5pbXBvcnQgbm90aWZpY2F0aW9uc1JlZHVjZXIsIHtTdGF0ZSBhcyBOb3RpZmljYXRpb25zU3RhdGV9IGZyb20gJy4vcmVkdWNlcnMvbm90aWZpY2F0aW9ucyc7XG5pbXBvcnQgc2lkZWJhclJlZHVjZXIsIHtTdGF0ZSBhcyBTaWRlYmFyU3RhdGV9IGZyb20gJy4vcmVkdWNlcnMvc2lkZWJhcic7XG5pbXBvcnQgc29ja2V0UmVkdWNlciwge1N0YXRlIGFzIFNvY2tldFN0YXRlfSBmcm9tICcuL3JlZHVjZXJzL3NvY2tldCc7XG5pbXBvcnQgY2hhdFVzZXJzUmVkdWNlciwge1N0YXRlIGFzIENoYXRVc2Vyc1N0YXRlfSBmcm9tICcuL3JlZHVjZXJzL2NoYXRVc2Vycyc7XG5cbmNvbnN0IGVudiA9IHJlcXVpcmUoJy4uLy4uL2VudicpO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0YXRlIHtcbiAgICB1c2VyOiBVc2VyU3RhdGUsXG4gICAgY2hhbm5lbHM6IENoYW5uZWxzU3RhdGUsXG4gICAgbm90aWZpY2F0aW9uczogTm90aWZpY2F0aW9uc1N0YXRlLFxuICAgIHNpZGViYXI6IFNpZGViYXJTdGF0ZSxcbiAgICBzb2NrZXQ6IFNvY2tldFN0YXRlLFxuICAgIGNoYXRVc2VyczogQ2hhdFVzZXJzU3RhdGUsXG59XG5cbmV4cG9ydCBjb25zdCByb290UmVkdWNlcjogUmVkdWNlciA9IGNvbWJpbmVSZWR1Y2Vycyh7XG4gICAgdXNlcjogdXNlclJlZHVjZXIsXG4gICAgY2hhbm5lbHM6IGNoYW5uZWxzUmVkdWNlcixcbiAgICBub3RpZmljYXRpb25zOiBub3RpZmljYXRpb25zUmVkdWNlcixcbiAgICBzaWRlYmFyOiBzaWRlYmFyUmVkdWNlcixcbiAgICBzb2NrZXQ6IHNvY2tldFJlZHVjZXIsXG4gICAgY2hhdFVzZXJzOiBjaGF0VXNlcnNSZWR1Y2VyLFxufSk7XG5cbmV4cG9ydCBjb25zdCBtaWRkbGV3YXJlOiBTdG9yZUVuaGFuY2VyID1cbiAgICBlbnYucHJvZHVjdGlvbiB8fCBlbnYuZGlzYWJsZVJlZHV4TG9nZ2luZyA/XG4gICAgYXBwbHlNaWRkbGV3YXJlKHJlZHV4VGh1bmspIDogYXBwbHlNaWRkbGV3YXJlKHJlZHV4VGh1bmssIGNyZWF0ZUxvZ2dlcigpKTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU3RvcmUocm9vdFJlZHVjZXIsIG1pZGRsZXdhcmUpOyIsImltcG9ydCB7IGNvbm4sIGFwcCB9IGZyb20gJy4uL3NyYy9zZXJ2ZXIvc2VydmVyJztcbmltcG9ydCBVc2VyIGZyb20gJy4uL3NyYy9zZXJ2ZXIvbW9kZWxzL1VzZXInO1xuXG5jb25zdCBkcm9wQWxsQ29sbGVjdGlvbnMgPSAoKSA9PiB7XG4gICAgbGV0IHAgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIFVzZXIuZGVsZXRlTWFueSh7fSwgKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICB9KVxuICAgIH0pXG4gICAgcmV0dXJuIHAudGhlbigpLmNhdGNoKChlcnI6IGFueSkgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfSk7XG59XG5cbmNvbnN0IE5vdEltcGxlbWVudGVkRXJyb3IgPSBuZXcgRXJyb3IoJ1Rlc3Qgbm90IGltcGxlbWVudGVkJyk7XG5cbmJlZm9yZSgnYWxsIHRlc3RzJywgZnVuY3Rpb24oZG9uZSkge1xuICAgIC8vIHdhaXQgZm9yIGNvbm5lY3Rpb24gdG8gYmVnaW4gdGVzdHNcbiAgICBjb25zb2xlLmxvZyhwcm9jZXNzLnZlcnNpb24pO1xuICAgIGNvbm4ub24oJ2Nvbm5lY3RlZCcsICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NlcnZlciBzdGFydGVkJyk7XG4gICAgICAgIGRvbmUoKTtcbiAgICB9KTtcbn0pO1xuYmVmb3JlRWFjaCgncmVzZXQgREInLCBmdW5jdGlvbihkb25lKSB7XG4gICAgLy8gc3RhcnQgd2l0aCBhIGZyZXNoIGRhdGFiYXNlXG4gICAgZHJvcEFsbENvbGxlY3Rpb25zKCkudGhlbigoKSA9PiBkb25lKCkpO1xufSk7XG5hZnRlcignYWxsIHRlc3RzJywgZnVuY3Rpb24oZG9uZSkge1xuICAgIC8vIHRlYXJkb3duIERCXG4gICAgZHJvcEFsbENvbGxlY3Rpb25zKCkudGhlbigoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDbG9zaW5nIGNvbm5lY3Rpb25zJyk7XG4gICAgICAgIGNvbm4uY2xvc2UoKTtcbiAgICAgICAgZG9uZSgpXG4gICAgfSk7XG59KVxuXG5cblxuLyogV2ViICovXG5yZXF1aXJlKCcuL3dlYi90ZXN0U3RvcmUnKTtcbnJlcXVpcmUoJy4vd2ViL3Rlc3RBc3luY0FjdGlvbnMnKTtcblxuLyogU2VydmVyICovXG5yZXF1aXJlKCcuL3NlcnZlci90ZXN0QXV0aENvbnRyb2xsZXInKTtcbnJlcXVpcmUoJy4vc2VydmVyL3Rlc3RVc2VyQ29udHJvbGxlcicpO1xucmVxdWlyZSgnLi9zZXJ2ZXIvdGVzdE1lc3NhZ2VDb250cm9sbGVyJyk7XG5yZXF1aXJlKCcuL3NlcnZlci90ZXN0Q2hhbm5lbENvbnRyb2xsZXInKTtcblxuZXhwb3J0IHsgYXBwLCBkcm9wQWxsQ29sbGVjdGlvbnMsIE5vdEltcGxlbWVudGVkRXJyb3IgfTtcbiIsImltcG9ydCAqIGFzIHJlcXVlc3QgZnJvbSAnc3VwZXJ0ZXN0JztcbmltcG9ydCB7IGhhc2hTeW5jIH0gZnJvbSAnYmNyeXB0anMnO1xuaW1wb3J0IHsgYXBwLCBkcm9wQWxsQ29sbGVjdGlvbnMgfSBmcm9tICcuLi8nO1xuaW1wb3J0IFVzZXIsIHsgSVVzZXIgfSBmcm9tICcuLi8uLi9zcmMvc2VydmVyL21vZGVscy9Vc2VyJztcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuXG5jb25zdCBzZXNzaW9uID0gcmVxdWlyZSgnc3VwZXJ0ZXN0LXNlc3Npb24nKTtcblxuZGVzY3JpYmUoJ0F1dGggQ29udHJvbGxlcicsIGZ1bmN0aW9uKCkge1xuICAgIGRlc2NyaWJlKCdsb2dpbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICBkcm9wQWxsQ29sbGVjdGlvbnMoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgdXNlcjogSVVzZXIgPSBuZXcgVXNlcih7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdBZHJpYW4nLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogaGFzaFN5bmMoJ3Rlc3QnKSxcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogJ3VzZXInLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHVzZXIuc2F2ZSgpLnRoZW4oKHVzZXI6IElVc2VyKSA9PiBkb25lKCkpLmNhdGNoKChlcnI6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgbG9naW4gdGhlIHVzZXInLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS9sb2dpbicpXG4gICAgICAgICAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgICAgICAgICBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogJ3Rlc3QnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMClcbiAgICAgICAgICAgICAgICAuZW5kKChlcnI6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdGhlIGxvZ2dlZC1pbiB1c2VyIGRldGFpbHMnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS9sb2dpbicpXG4gICAgICAgICAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgICAgICAgICBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogJ3Rlc3QnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMClcbiAgICAgICAgICAgICAgICAuZW5kKChlcnI6IGFueSwgcmVzOiByZXF1ZXN0LlJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICBsZXQganNvbjogYW55ID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChqc29uLmVtYWlsLCAndGVzdEB0ZXN0LmNvbScpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoanNvbi5yb2xlLCAndXNlcicpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoanNvbi5uYW1lLCAnQWRyaWFuJyk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGFuIGVycm9yIGlmIHRoZSBlbWFpbCBkb2VzIG5vdCBleGlzdCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL2xvZ2luJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiAndGVzdC5kb2VzLm5vdC5leGl0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICd0ZXN0J1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDEpXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyOiBhbnksIHJlczogcmVxdWVzdC5SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGpzb246IGFueSA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoanNvbi5lcnJvciwgJ0ludmFsaWQgZW1haWwgb3IgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYW4gZXJyb3IgaWYgdGhlIHBhc3N3b3JkIGRvZXMgbm90IG1hdGNoIHRoZSBoYXNoJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChhcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICd0ZXN0LWludmFsaWQtcGFzc3dvcmQnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMSlcbiAgICAgICAgICAgICAgICAuZW5kKChlcnI6IGFueSwgcmVzOiByZXF1ZXN0LlJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICBsZXQganNvbjogYW55ID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChqc29uLmVycm9yLCAnSW52YWxpZCBlbWFpbCBvciBwYXNzd29yZCcpO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBhbiBlcnJvciBpZiB0aGUgZW1haWwgb3IgcGFzc3dvcmQgaXMgbWlzc2luZycsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL2xvZ2luJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAndGVzdCdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycjogYW55LCByZXM6IHJlcXVlc3QuUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBqc29uOiBhbnkgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGpzb24uZXJyb3IsICdQbGVhc2Ugc3VwcGx5IGFuIGVtYWlsIGFuZCBwYXNzd29yZCcpO1xuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL2xvZ2luJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZW5kKHtlbWFpbDogJ3Rlc3RAdGVzdC5jb20nfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmVuZCgoZXJyOiBhbnksIHJlczogcmVxdWVzdC5SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGpzb246IGFueSA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChqc29uLmVycm9yLCAnUGxlYXNlIHN1cHBseSBhbiBlbWFpbCBhbmQgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYW4gZXJyb3IgaWYgdGhlIGVtYWlsIGlzIG5vdCB2YWxpZCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoYXBwKS5wb3N0KCcvYXBpL3YxL2xvZ2luJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7ZW1haWw6ICdub3QgYW4gZW1haWxAYXNkZicsIHBhc3N3b3JkOiAnMTIzNCd9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycjogYW55LCByZXM6IHJlcXVlc3QuUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBqc29uOiBhbnkgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGpzb24uZXJyb3IsICdOb3QgYSB2YWxpZCBlbWFpbCBhZGRyZXNzJyk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgncmVnaXN0ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgZHJvcEFsbENvbGxlY3Rpb25zKCkudGhlbigoKSA9PiBkb25lKCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZWdpc3RlciBhIHVzZXInLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcCkucG9zdCgnL2FwaS92MS9yZWdpc3RlcicpXG4gICAgICAgICAgICAgICAgLnNlbmQoe2VtYWlsOiAndGVzdEB0ZXN0LmNvbScsIHBhc3N3b3JkOiAndGVzdCd9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycjogYW55LCByZXM6IHJlcXVlc3QuUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYoZXJyKSByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICBVc2VyLmZpbmRCeUVtYWlsKCd0ZXN0QHRlc3QuY29tJykuZXhlYygpLnRoZW4oKHVzZXI6IElVc2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZmFpbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnI6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgY3JlYXRlIGFuIGFkbWluIHVzZXIgaWYgbm8gdXNlcnMgZXhpc3QnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChhcHApLnBvc3QoJy9hcGkvdjEvcmVnaXN0ZXInKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICd0ZXN0QHRlc3QuY29tJywgcGFzc3dvcmQ6ICd0ZXN0JyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycjogYW55LCByZXM6IHJlcXVlc3QuUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgVXNlci5maW5kQnlFbWFpbCgndGVzdEB0ZXN0LmNvbScpLmV4ZWMoKS50aGVuKCh1c2VyOiBJVXNlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmZhaWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCh1c2VyLnJvbGUsICdhZG1pbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGNyZWF0ZSBhIHJlZ3VsYXIgdXNlciBpZiB1c2VycyBleGlzdCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIGxldCB1ID0gbmV3IFVzZXIoe1xuICAgICAgICAgICAgICAgIG5hbWU6ICd0ZXN0JyxcbiAgICAgICAgICAgICAgICBlbWFpbDogJ2FkbWluQHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJ3Bhc3N3b3JkJyxcbiAgICAgICAgICAgICAgICByb2xlOiAnYWRtaW4nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdS5zYXZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdChhcHApLnBvc3QoJy9hcGkvdjEvcmVnaXN0ZXInKVxuICAgICAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsIHBhc3N3b3JkOiAndGVzdCcgfSlcbiAgICAgICAgICAgICAgICAgICAgLmV4cGVjdCgyMDApXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoKGVycjogYW55LCByZXM6IHJlcXVlc3QuUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICBVc2VyLmZpbmRCeUVtYWlsKCd0ZXN0QHRlc3QuY29tJykuZXhlYygpLnRoZW4oKHVzZXI6IElVc2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5mYWlsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCh1c2VyLnJvbGUsICd1c2VyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGFuIGVycm9yIGlmIGVtYWlsIG9yIHBhc3N3b3JkIG5vdCBwcm92aWRlZCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoYXBwKS5wb3N0KCcvYXBpL3YxL3JlZ2lzdGVyJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAndGVzdEB0ZXN0LmNvbScgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMClcbiAgICAgICAgICAgICAgICAuZW5kKChlcnI6IGFueSwgcmVzOiByZXF1ZXN0LlJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBqc29uOiBhbnkgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGpzb24uZXJyb3IsICdQbGVhc2Ugc3VwcGx5IGFuIGVtYWlsIGFuZCBwYXNzd29yZCcpO1xuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0KGFwcCkucG9zdCgnL2FwaS92MS9yZWdpc3RlcicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2VuZCh7cGFzc3dvcmQ6ICcxMjMnfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmVuZCgoZXJyOiBhbnksIHJlczogcmVxdWVzdC5SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVycikgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQganNvbjogYW55ID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGpzb24uZXJyb3IsICdQbGVhc2Ugc3VwcGx5IGFuIGVtYWlsIGFuZCBwYXNzd29yZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYW4gZXJyb3IgaWYgbm90IGEgdmFsaWQgZW1haWwnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcCkucG9zdCgnL2FwaS92MS9yZWdpc3RlcicpXG4gICAgICAgICAgICAgICAgLnNlbmQoe2VtYWlsOiAnbm90IGFuIGVtYWlsIEAgYXNkbGZrajtsJywgcGFzc3dvcmQ6ICcxMjM0J30pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDApXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyOiBhbnksIHJlczogcmVxdWVzdC5SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICBsZXQganNvbjogYW55ID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChqc29uLmVycm9yLCAnTm90IGEgdmFsaWQgZW1haWwgYWRkcmVzcycpO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdsb2dvdXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHRlc3RTZXNzaW9uOiBhbnk7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHRlc3RTZXNzaW9uID0gc2Vzc2lvbihhcHApO1xuICAgICAgICAgICAgZHJvcEFsbENvbGxlY3Rpb25zKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHVzZXI6IElVc2VyID0gbmV3IFVzZXIoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnQWRyaWFuJyxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IGhhc2hTeW5jKCd0ZXN0JyksXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6ICd1c2VyJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB1c2VyLnNhdmUoKS50aGVuKCh1c2VyOiBJVXNlcikgPT4gZG9uZSgpKS5jYXRjaCgoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGxvZyBvdXQgdGhlIHVzZXInLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICB0ZXN0U2Vzc2lvbi5wb3N0KCcvYXBpL3YxL2xvZ2luJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7ZW1haWw6ICd0ZXN0QHRlc3QuY29tJywgcGFzc3dvcmQ6ICd0ZXN0J30pLmVuZCgoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgdGVzdFNlc3Npb24uZ2V0KCcvYXBpL3YxL3VzZXInKS5zZW5kKCkuZXhwZWN0KDIwMCkuZW5kKChlcnI6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlc3RTZXNzaW9uLmdldCgnL2FwaS92MS9sb2dvdXQnKS5zZW5kKCkuZXhwZWN0KDIwMCkuZW5kKChlcnI6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVzdFNlc3Npb24uZ2V0KCcvYXBpL3YxL3VzZXInKS5zZW5kKCkuZXhwZWN0KDQwMSkuZW5kKGRvbmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ3ZlcmlmeSBlbWFpbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICBkcm9wQWxsQ29sbGVjdGlvbnMoKS50aGVuKCgpID0+IGRvbmUoKSk7XG5cbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgdmVyaWZ5IGFuIGVtYWlsIGdpdmVuIHRoZSBjb3JyZWN0IHZlcmlmaWNhdGlvbiBsaW5rJyk7XG4gICAgICAgIGl0KCdzaG91bGQgbm90IHZlcmlmeSBhbiBlbWFpbCB3aXRoIGFuIGluY29ycmVjdCB2ZXJpZmljYXRpb24gbGluaycpO1xuICAgIH0pO1xufSk7IiwiaW1wb3J0ICdtb2NoYSc7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgTW9ja0FkYXB0ZXIgZnJvbSAnYXhpb3MtbW9jay1hZGFwdGVyJztcbmltcG9ydCBjb25maWd1cmVTdG9yZSwgeyBNb2NrU3RvcmVDcmVhdG9yLCBNb2NrU3RvcmVFbmhhbmNlZCB9IGZyb20gJ3JlZHV4LW1vY2stc3RvcmUnXG5pbXBvcnQgdGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnXG5pbXBvcnQgeyB1cGRhdGVOYW1lLCB1cGRhdGVFbWFpbCwgdXBkYXRlUGFzc3dvcmQgfSBmcm9tICcuLi8uLi9zcmMvd2ViL2FjdGlvbnMvdXNlckFjdGlvbnMnO1xuaW1wb3J0IHsgQW55QWN0aW9uIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgQUREX0lORk8sIEFERF9FUlJPUiwgYWRkRXJyb3IsIGFkZEluZm8gfSBmcm9tICcuLi8uLi9zcmMvd2ViL2FjdGlvbnMvbm90aWZpY2F0aW9uc0FjdGlvbnMnO1xuaW1wb3J0IHsgQ2hhbm5lbCwgTWVzc2FnZSB9IGZyb20gJy4uLy4uL3NyYy93ZWIvcmVkdWNlcnMvY2hhbm5lbHMnO1xuaW1wb3J0IHsgaW5pdCBhcyBpbml0V2Vic29ja2V0Q29ubmVjdGlvbiwgSU5JVF9XRUJTT0NLRVQgfSBmcm9tICcuLi8uLi9zcmMvd2ViL2FjdGlvbnMvc29ja2V0QWN0aW9ucyc7XG5pbXBvcnQgeyBmZXRjaENoYW5uZWxzLCBBRERfQ0hBTk5FTFMsIGFkZENoYW5uZWxzLCByZXRyaWV2ZUNoYW5uZWxNZXNzYWdlcywgc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMsIHNldENoYW5uZWxIYXNNb3JlTWVzc2FnZXMsIGluY3JlbWVudENoYW5uZWxSZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0LCBhZGRSZXRyaWV2ZWRDaGFubmVsTWVzc2FnZXMsIGRlbGV0ZUNoYW5uZWwsIGFkZENoYW5uZWwgfSBmcm9tICcuLi8uLi9zcmMvd2ViL2FjdGlvbnMvY2hhbm5lbHNBY3Rpb25zJztcbmltcG9ydCB7IGZldGNoQWxsVXNlcnMsIHVwZGF0ZVVzZXJzIH0gZnJvbSAnLi4vLi4vc3JjL3dlYi9hY3Rpb25zL2NoYXRVc2Vyc0FjdGlvbnMnO1xuaW1wb3J0IHsgU3RhdGUgYXMgQ2hhdFVzZXJzU3RhdGUgfSBmcm9tICcuLi8uLi9zcmMvd2ViL3JlZHVjZXJzL2NoYXRVc2Vycyc7XG5pbXBvcnQgeyBTdGF0ZSB9IGZyb20gJy4uLy4uL3NyYy93ZWIvc3RvcmUnO1xuXG5jb25zdCBtb2NrU3RvcmVDcmVhdG9yOiBNb2NrU3RvcmVDcmVhdG9yID0gY29uZmlndXJlU3RvcmUoW3RodW5rXSk7XG5cbmZ1bmN0aW9uIGdldFN0b3JlKHN0b3JlID0ge30pOiBNb2NrU3RvcmVFbmhhbmNlZDx7fSB8IFN0YXRlPiB7XG4gICAgcmV0dXJuIG1vY2tTdG9yZUNyZWF0b3Ioc3RvcmUpO1xufVxuXG5kZXNjcmliZSgnQXN5bmMgQWN0aW9ucycsIGZ1bmN0aW9uKCkge1xuICAgIGxldCBtb2NrU3RvcmU6IE1vY2tTdG9yZUVuaGFuY2VkPHt9LCBhbnk+O1xuICAgIGxldCBtb2NrQXhpb3M6IE1vY2tBZGFwdGVyO1xuXG4gICAgYmVmb3JlKGZ1bmN0aW9uKCkge1xuICAgICAgICBtb2NrQXhpb3MgPSBuZXcgTW9ja0FkYXB0ZXIoYXhpb3MpO1xuICAgIH0pO1xuXG4gICAgYWZ0ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgIG1vY2tBeGlvcy5yZXN0b3JlKCk7XG4gICAgfSk7XG4gICAgXG4gICAgZGVzY3JpYmUoJ1VzZXIgYXN5bmMgYWN0aW9ucycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG1vY2tTdG9yZSA9IGdldFN0b3JlKCk7XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5vbkFueSgpLnJlcGx5KDIwMCwge30pXG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGhhbmRsZSBjYWxsYmFjayBhbmQgc2V0IGluZm8gJyArXG4gICAgICAgICAgICdvbiBzdWNjZXNzZnVsIHBvc3QgcmVxdWVzdCB0byAvYXBpL3YxL3VzZXIvdXBkYXRlL25hbWUnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWUgOiBmYWxzZSB8IHN0cmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgICAgICAuZGlzcGF0Y2godXBkYXRlTmFtZSgnQWRyaWFuJywgKCkgPT4gbmFtZSA9ICdBZHJpYW4nKSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG5hbWUsICdBZHJpYW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnM6IEFueUFjdGlvbltdID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBBRERfSU5GTyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAnTmFtZSB1cGRhdGVkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgc2V0IGFuIGVycm9yIG9uIGZhaWxlZCBwb3N0IHJlcXVlc3QgdG8gL2FwaS92MS91c2VyL3VwZGF0ZS9uYW1lJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgbGV0IG5hbWUgOiBmYWxzZSB8IHN0cmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3Mub25Qb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL25hbWUnKS5yZXBseSg1MDAsIHtlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nJ30pO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKHVwZGF0ZU5hbWUoJ0FkcmlhbicsICgpID0+IG5hbWUgPSAnQWRyaWFuJykpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwobmFtZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25zOiBBbnlBY3Rpb25bXSA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEFERF9FUlJPUixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICdTb21ldGhpbmcgd2VudCB3cm9uZydcbiAgICAgICAgICAgICAgICAgICAgfV0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGhhbmRsZSBjYWxsYmFjayBhbmQgc2V0IGluZm8gJyArXG4gICAgICAgICAgICdvbiBzdWNjZXNzZnVsIHBvc3QgcmVxdWVzdCB0byAvYXBpL3YxL3VzZXIvdXBkYXRlL2VtYWlsJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgbGV0IGVtYWlsOiBmYWxzZSB8IHN0cmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKHVwZGF0ZUVtYWlsKCd0ZXN0QHRlc3QuY29tJywgKCkgPT4gZW1haWwgPSAndGVzdEB0ZXN0LmNvbScpKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGVtYWlsLCAndGVzdEB0ZXN0LmNvbScpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25zOiBBbnlBY3Rpb25bXSA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEFERF9JTkZPLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJ0VtYWlsIHVwZGF0ZWQnXG4gICAgICAgICAgICAgICAgICAgIH1dKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBzZXQgYW4gZXJyb3Igb24gZmFpbGVkIHBvc3QgcmVxdWVzdCB0byAvYXBpL3YxL3VzZXIvdXBkYXRlL2VtYWlsJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgbGV0IGVtYWlsOiBmYWxzZSB8IHN0cmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3Mub25Qb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL2VtYWlsJykucmVwbHkoNTAwLCB7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnIH0pO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKHVwZGF0ZUVtYWlsKCd0ZXN0QHRlc3QuY29tJywgKCkgPT4gZW1haWwgPSAndGVzdEB0ZXN0LmNvbScpKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UoZW1haWwpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25zOiBBbnlBY3Rpb25bXSA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEFERF9FUlJPUixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICdTb21ldGhpbmcgd2VudCB3cm9uZydcbiAgICAgICAgICAgICAgICAgICAgfV0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZG9uZSk7XG4gICAgICAgIH0pXG4gICAgICAgIGl0KCdzaG91bGQgc2V0IGluZm8gb24gc3VjY2Vzc2Z1bCBwb3N0IHJlcXVlc3QgdG8gL2FwaS92MS91c2VyL3VwZGF0ZS9wYXNzd29yZCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIGxldCB1cGRhdGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgICAgICBtb2NrU3RvcmUuZGlzcGF0Y2godXBkYXRlUGFzc3dvcmQoJ2EnLCAnYicsICgpID0+IHVwZGF0ZWQgPSB0cnVlKSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5pc1RydWUodXBkYXRlZCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnM6IEFueUFjdGlvbltdID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogQUREX0lORk8sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAnUGFzc3dvcmQgdXBkYXRlZCdcbiAgICAgICAgICAgICAgICAgICAgfV0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHNldCBhbiBlcnJvciBvbiBmYWlsZWQgcG9zdCByZXF1ZXN0IHRvIC9hcGkvdjEvdXNlci91cGRhdGUvcGFzc3dvcmQnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICBsZXQgdXBkYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3Mub25Qb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL3Bhc3N3b3JkJykucmVwbHkoNTAwLCB7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnIH0pO1xuICAgICAgICAgICAgbW9ja1N0b3JlLmRpc3BhdGNoKHVwZGF0ZVBhc3N3b3JkKCdhJywgJ2InLCAoKSA9PiB1cGRhdGVkID0gdHJ1ZSkpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuaXNGYWxzZSh1cGRhdGVkKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uczogQW55QWN0aW9uW10gPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBBRERfRVJST1IsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnXG4gICAgICAgICAgICAgICAgICAgIH1dKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGRvbmUpO1xuICAgICAgICB9KVxuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdDaGFubmVscyBhc3luYyBhY3Rpb25zJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIFJldHJpZXZlIGNoYW5uZWwgbWVzc2FnZXMgYWN0aW9uIGNoZWNrcyBzdG9yZSB0byB2ZXJpZnkgdGhhdCBjaGFubmVsXG4gICAgICAgICAgICAvLyB3aXRoIGdpdmVuIG5hbWUgYWxyZWFkeSBleGlzdHNcbiAgICAgICAgICAgIG1vY2tTdG9yZSA9IG1vY2tTdG9yZUNyZWF0b3Ioe1xuICAgICAgICAgICAgICAgIGNoYW5uZWxzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbmFtZTogJ2dlbmVyYWwnLCBmZXRjaGluZ05ld01lc3NhZ2VzOiBmYWxzZSwgaGFzTW9yZU1lc3NhZ2VzOiB0cnVlLCByZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0OiAwIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbmFtZTogJ2ZldGNoaW5nIG5ldyBtZXNzYWdlcycsIGZldGNoaW5nTmV3TWVzc2FnZXM6IHRydWUsIGhhc01vcmVNZXNzYWdlczogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgICAgICB7IG5hbWU6ICdubyBtb3JlIG1lc3NhZ2VzJywgZmV0Y2hpbmdOZXdNZXNzYWdlczogZmFsc2UsIGhhc01vcmVNZXNzYWdlczogZmFsc2UgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3Mub25BbnkoKS5yZXBseSgyMDAsIHt9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmV0Y2ggY2hhbm5lbHMgYW5kIGRpc3BhdGNoIGFkZENoYW5uZWxzIHdpdGggYW4gYXJyYXkgb2YgY2hhbm5lbCBuYW1lcycsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIGxldCBjaGFubmVsczoge19pZDogc3RyaW5nLCBuYW1lOiBzdHJpbmd9W10gPSBbXG4gICAgICAgICAgICAgICAge19pZDogJzEnLCBuYW1lOiAnZ2VuZXJhbCd9LFxuICAgICAgICAgICAgICAgIHtfaWQ6ICcyJywgbmFtZTogJ3JhbmRvbSd9LFxuICAgICAgICAgICAgICAgIHtfaWQ6ICczJywgbmFtZTogJ3NvbWV0aGluZyBlbHNlJ31dO1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3NcbiAgICAgICAgICAgICAgICAub25HZXQoJy9hcGkvdjEvY2hhbm5lbHMnKVxuICAgICAgICAgICAgICAgIC5yZXBseSgyMDAsIHtjaGFubmVsczogY2hhbm5lbHN9KTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChmZXRjaENoYW5uZWxzKCkpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25zOiBBbnlBY3Rpb25bXSA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFkZENoYW5uZWxzQWN0aW9uID0gYWRkQ2hhbm5lbHMoWydnZW5lcmFsJywgJ3JhbmRvbScsICdzb21ldGhpbmcgZWxzZSddKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbYWRkQ2hhbm5lbHNBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGRvbmUpXG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGRpc3BhdGNoIGFkZEVycm9yIG9uIGZhaWxlZCByZXF1ZXN0IHRvIC9hcGkvdjEvY2hhbm5lbHMnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvc1xuICAgICAgICAgICAgICAgIC5vbkdldCgnL2FwaS92MS9jaGFubmVscycpXG4gICAgICAgICAgICAgICAgLnJlcGx5KDUwMCk7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2goZmV0Y2hDaGFubmVscygpKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uczogQW55QWN0aW9uW10gPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnJvckFjdGlvbiA9IGFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gZmV0Y2ggdGhlIGNoYW5uZWxzJyk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW2Vycm9yQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChkb25lKVxuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCBhbiBlcnJvciBpZiByZXRyaWV2aW5nIG1lc3NhZ2VzIHdpdGggaW52YWxpZCBjaGFubmVsIG5hbWUnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2gocmV0cmlldmVDaGFubmVsTWVzc2FnZXMoJ2ludmFsaWQgbmFtZScpKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigobXNnOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChtc2csICdSZXRyaWV2ZSBDaGFubmVsIE1lc3NhZ2VzIGRpc3BhdGNoZWQgd2l0aCBpbmNvcnJlY3QgY2hhbm5lbCBuYW1lIG9yIHdoaWxlIGFscmVhZHkgZmV0Y2hpbmcgbWVzc2FnZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnM6IEFueUFjdGlvbltdID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yQWN0aW9uID0gYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBmZXRjaCBtZXNzYWdlcycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbZXJyb3JBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGRpc3BhdGNoIGFuIGVycm9yIGlmIGFscmVhZHkgcmV0cmlldmluZyBjaGFubmVsIG1lc3NhZ2VzJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKHJldHJpZXZlQ2hhbm5lbE1lc3NhZ2VzKCdmZXRjaGluZyBuZXcgbWVzc2FnZXMnKSlcbiAgICAgICAgICAgICAgICAudGhlbigobXNnOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG1zZywgJ1JldHJpZXZlIENoYW5uZWwgTWVzc2FnZXMgZGlzcGF0Y2hlZCB3aXRoIGluY29ycmVjdCBjaGFubmVsIG5hbWUgb3Igd2hpbGUgYWxyZWFkeSBmZXRjaGluZyBtZXNzYWdlcycpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25zOiBBbnlBY3Rpb25bXSA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yQWN0aW9uID0gYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBmZXRjaCBtZXNzYWdlcycpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFtlcnJvckFjdGlvbl0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGRpc3BhdGNoIGFuIGVycm9yIGlmIGNoYW5uZWwgZG9lcyBub3QgaGF2ZSBvbGRlciBtZXNzYWdlcycsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChyZXRyaWV2ZUNoYW5uZWxNZXNzYWdlcygnbm8gbW9yZSBtZXNzYWdlcycpKVxuICAgICAgICAgICAgICAgIC50aGVuKChtc2c6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwobXNnLCAnUmV0cmlldmUgQ2hhbm5lbCBNZXNzYWdlcyBkaXNwYXRjaGVkIHdpdGggaW5jb3JyZWN0IGNoYW5uZWwgbmFtZSBvciB3aGlsZSBhbHJlYWR5IGZldGNoaW5nIG1lc3NhZ2VzJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnM6IEFueUFjdGlvbltdID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXJyb3JBY3Rpb24gPSBhZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIGZldGNoIG1lc3NhZ2VzJyk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW2Vycm9yQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZGlzcGF0Y2ggYW4gZXJyb3Igb24gZmFpbGVkIGdldCByZXF1ZXN0IHRvIC9hcGkvdjEvbWVzc2FnZXMvJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3NcbiAgICAgICAgICAgICAgICAub25HZXQoKVxuICAgICAgICAgICAgICAgIC5yZXBseSg1MDApO1xuICAgICAgICAgICAgbGV0IGNoYW5uZWw6IHN0cmluZyA9ICdnZW5lcmFsJztcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChyZXRyaWV2ZUNoYW5uZWxNZXNzYWdlcyhjaGFubmVsKSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnM6IEFueUFjdGlvbltdID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2V0RmV0Y2hpbmdUcnVlQWN0aW9uID0gc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMoY2hhbm5lbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yQWN0aW9uID0gYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBmZXRjaCBtZXNzYWdlcycpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZXRGZXRjaGluZ0ZhbHNlQWN0aW9uID0gc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMoY2hhbm5lbCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFtzZXRGZXRjaGluZ1RydWVBY3Rpb24sIGVycm9yQWN0aW9uLCBzZXRGZXRjaGluZ0ZhbHNlQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgc2V0IGNoYW5uZWxIYXNNb3JlTWVzc2FnZXMgb24gcmVzcG9uc2Ugd2l0aCBlbXB0eSBhcnJheScsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zXG4gICAgICAgICAgICAgICAgLm9uR2V0KClcbiAgICAgICAgICAgICAgICAucmVwbHkoMjAwLCB7IG1lc3NhZ2VzOiBbXX0pO1xuICAgICAgICAgICAgbGV0IGNoYW5uZWw6IHN0cmluZyA9ICdnZW5lcmFsJztcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChyZXRyaWV2ZUNoYW5uZWxNZXNzYWdlcyhjaGFubmVsKSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnM6IEFueUFjdGlvbltdID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2V0RmV0Y2hpbmdUcnVlQWN0aW9uID0gc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMoY2hhbm5lbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNldEhhc01vcmVBY3Rpb24gPSBzZXRDaGFubmVsSGFzTW9yZU1lc3NhZ2VzKGNoYW5uZWwsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2V0RmV0Y2hpbmdGYWxzZUFjdGlvbiA9IHNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzKGNoYW5uZWwsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbc2V0RmV0Y2hpbmdUcnVlQWN0aW9uLCBzZXRIYXNNb3JlQWN0aW9uLCBzZXRGZXRjaGluZ0ZhbHNlQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgaW5jcmVtZW50IG9mZnNldCAoYmFzZWQgb24gbnVtYmVyIG9mIHJlY2VpdmVkIG1lc3NhZ2VzKSBhbmQgYWRkIHJldHJpZXZlZCBjaGFubmVsIG1lc3NhZ2VzIG9uIHN1Y2Nlc3NmdWwgcmV0cmVpdmVDaGFubmVsTWVzc2FnZXMgYWN0aW9uJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgbGV0IGNoYW5uZWw6IHN0cmluZyA9ICdnZW5lcmFsJztcbiAgICAgICAgICAgIGxldCBtZXNzYWdlczogTWVzc2FnZVtdID0gW3tcbiAgICAgICAgICAgICAgICB0ZXh0OiAnMTIzJyxcbiAgICAgICAgICAgICAgICBjcmVhdGVkOiBEYXRlLm5vdygpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgdXNlckVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgX2lkOiAnMSdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnNDU2JyxcbiAgICAgICAgICAgICAgICBjcmVhdGVkOiBEYXRlLm5vdygpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgdXNlckVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgX2lkOiAnMidcbiAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3NcbiAgICAgICAgICAgICAgICAub25HZXQoKVxuICAgICAgICAgICAgICAgIC5yZXBseSgyMDAsIHsgbWVzc2FnZXM6IG1lc3NhZ2VzfSk7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2gocmV0cmlldmVDaGFubmVsTWVzc2FnZXMoY2hhbm5lbCkpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25zOiBBbnlBY3Rpb25bXSA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNldEZldGNoaW5nVHJ1ZUFjdGlvbiA9IHNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzKGNoYW5uZWwsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmNyZW1lbnRPZmZzZXRBY3Rpb24gPSBpbmNyZW1lbnRDaGFubmVsUmV0cmlldmVNZXNzYWdlc09mZnNldChjaGFubmVsLCBtZXNzYWdlcy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhZGRNZXNzYWdlc0FjdGlvbiA9IGFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcyhjaGFubmVsLCBtZXNzYWdlcyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNldEZldGNoaW5nRmFsc2VBY3Rpb24gPSBzZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcyhjaGFubmVsLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0RmV0Y2hpbmdUcnVlQWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5jcmVtZW50T2Zmc2V0QWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkTWVzc2FnZXNBY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRGZXRjaGluZ0ZhbHNlQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZGlzcGF0Y2ggaW5mbyBvbiBzdWNjZXNzZnVsbHkgZGVsZXRpbmcgY2hhbm5lbCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIGxldCBjaGFubmVsczogeyBfaWQ6IHN0cmluZywgbmFtZTogc3RyaW5nIH1bXSA9IFtcbiAgICAgICAgICAgICAgICB7IF9pZDogJzEnLCBuYW1lOiAnZ2VuZXJhbCcgfSxcbiAgICAgICAgICAgICAgICB7IF9pZDogJzInLCBuYW1lOiAncmFuZG9tJyB9LFxuICAgICAgICAgICAgICAgIHsgX2lkOiAnMycsIG5hbWU6ICdzb21ldGhpbmcgZWxzZScgfV07XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvc1xuICAgICAgICAgICAgICAgIC5vbkdldCgnL2FwaS92MS9jaGFubmVscycpXG4gICAgICAgICAgICAgICAgLnJlcGx5KDIwMCwgeyBjaGFubmVsczogY2hhbm5lbHMgfSk7XG4gICAgICAgICAgICBtb2NrQXhpb3NcbiAgICAgICAgICAgICAgICAub25HZXQoKVxuICAgICAgICAgICAgICAgIC5yZXBseSgyMDApO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKGRlbGV0ZUNoYW5uZWwoJ2dlbmVyYWwnKSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnM6IEFueUFjdGlvbltdID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWRkSW5mb0FjdGlvbiA9IGFkZEluZm8oJ0NoYW5uZWwgZGVsZXRlZCcpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhZGRDaGFubmVsc0FjdGlvbiA9IGFkZENoYW5uZWxzKFsnZ2VuZXJhbCcsICdyYW5kb20nLCAnc29tZXRoaW5nIGVsc2UnXSk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW2FkZEluZm9BY3Rpb24sIGFkZENoYW5uZWxzQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZGlzcGF0Y2ggYW4gZXJyb3Igb24gZmFpbGVkIGF0dGVtcHQgdG8gZGVsZXRlIGNoYW5uZWwnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvc1xuICAgICAgICAgICAgICAgIC5vbkdldCgpXG4gICAgICAgICAgICAgICAgLnJlcGx5KDUwMCwge2Vycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnfSk7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2goZGVsZXRlQ2hhbm5lbCgnZ2VuZXJhbCcpKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uczogQW55QWN0aW9uW10gPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhZGRFcnJvckFjdGlvbiA9IGFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZycpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFthZGRFcnJvckFjdGlvbl0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZG9uZSk7XG4gICAgICAgIH0pXG4gICAgICAgIGl0KCdzaG91bGQgZGlzcGF0Y2ggaW5mbyBvbiBjcmVhdGluZyBuZXcgY2hhbm5lbCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIGxldCBjaGFubmVsczogeyBfaWQ6IHN0cmluZywgbmFtZTogc3RyaW5nIH1bXSA9IFtcbiAgICAgICAgICAgICAgICB7IF9pZDogJzEnLCBuYW1lOiAnZ2VuZXJhbCcgfSxcbiAgICAgICAgICAgICAgICB7IF9pZDogJzInLCBuYW1lOiAncmFuZG9tJyB9LFxuICAgICAgICAgICAgICAgIHsgX2lkOiAnMycsIG5hbWU6ICdzb21ldGhpbmcgZWxzZScgfV07XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvc1xuICAgICAgICAgICAgICAgIC5vbkdldCgnL2FwaS92MS9jaGFubmVscycpXG4gICAgICAgICAgICAgICAgLnJlcGx5KDIwMCwgeyBjaGFubmVsczogY2hhbm5lbHMgfSk7XG4gICAgICAgICAgICBtb2NrQXhpb3NcbiAgICAgICAgICAgICAgICAub25Qb3N0KClcbiAgICAgICAgICAgICAgICAucmVwbHkoMjAwKTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChhZGRDaGFubmVsKCduZXcgY2hhbm5lbCcpKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uczogQW55QWN0aW9uW10gPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhZGRJbmZvQWN0aW9uID0gYWRkSW5mbygnQ2hhbm5lbCBjcmVhdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFkZENoYW5uZWxzQWN0aW9uID0gYWRkQ2hhbm5lbHMoWydnZW5lcmFsJywgJ3JhbmRvbScsICdzb21ldGhpbmcgZWxzZSddKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbYWRkSW5mb0FjdGlvbiwgYWRkQ2hhbm5lbHNBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCBhbiBlcnJvciBvbiBmYWlsZWQgYXR0ZW1wdCB0byBjcmVhdGUgYSBuZXcgY2hhbm5lbCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zXG4gICAgICAgICAgICAgICAgLm9uQW55KClcbiAgICAgICAgICAgICAgICAucmVwbHkoNTAwLCB7ZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZyd9KTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChhZGRDaGFubmVsKCduZXcgY2hhbm5lbCcpKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uczogQW55QWN0aW9uW10gPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhZGRFcnJvckFjdGlvbiA9IGFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZycpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFthZGRFcnJvckFjdGlvbl0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZG9uZSk7XG4gICAgICAgIH0pXG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ1NvY2tldCBhc3luYyBhY3Rpb25zJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG1vY2tTdG9yZSA9IGdldFN0b3JlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGluaXRpYWxpemUgd2Vic29ja2V0IGNvbm5lY3Rpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG1vY2tTdG9yZS5kaXNwYXRjaChpbml0V2Vic29ja2V0Q29ubmVjdGlvbigpKTtcbiAgICAgICAgICAgIGNvbnN0IGFjdGlvbnM6IEFueUFjdGlvbltdID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChhY3Rpb25zWzBdLnR5cGUsIElOSVRfV0VCU09DS0VUKTtcbiAgICAgICAgICAgIC8vIG5lZWQgdG8gY2xvc2UgY29ubmVjdGlvbiBzbyBwcm9ncmFtIHdpbGwgZXhpdCBhZnRlciB0ZXN0cyBydW5cbiAgICAgICAgICAgIGFjdGlvbnNbMF0uZGF0YS5pby5jbG9zZSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnQ2hhdCBVc2VycyBhc3luYyBhY3Rpb25zJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG1vY2tTdG9yZSA9IGdldFN0b3JlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGRpcGF0Y2ggdXBkYXRlVXNlcnMgb24gZmV0Y2ggYWxsIHVzZXJzJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgbGV0IHVzZXJzUmVzcG9uc2UgPSBbe1xuICAgICAgICAgICAgICAgIGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgcm9sZTogJ2FkbWluJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAndGVzdCdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBlbWFpbDogJ3Rlc3QyQHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICByb2xlOiAnZ2VuZXJhbCcsXG4gICAgICAgICAgICAgICAgbmFtZTogJ3Rlc3QnXG4gICAgICAgICAgICB9XTtcbiAgICAgICAgICAgIGxldCB1c2VyczogQ2hhdFVzZXJzU3RhdGUgPSB7fTtcbiAgICAgICAgICAgIHVzZXJzUmVzcG9uc2UuZm9yRWFjaCgodSkgPT4ge1xuICAgICAgICAgICAgICAgIHVzZXJzW3UuZW1haWxdID0ge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiB1Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IHUucm9sZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3Mub25BbnkoKS5yZXBseSgyMDAsIHsgdXNlcnM6IHVzZXJzUmVzcG9uc2V9KTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChmZXRjaEFsbFVzZXJzKCkpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25zOiBBbnlBY3Rpb25bXSA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZVVzZXJzQWN0aW9uID0gdXBkYXRlVXNlcnModXNlcnMpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFt1cGRhdGVVc2Vyc0FjdGlvbl0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGRpc3BhdGNoIGFkZEVycm9yIG9uIGZhaWxlZCBhdHRlbXB0IHRvIGZldGNoIHVzZXJzJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3Mub25BbnkoKS5yZXBseSg1MDApO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKGZldGNoQWxsVXNlcnMoKSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnM6IEFueUFjdGlvbltdID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWRkRXJyb3JBY3Rpb24gPSBhZGRFcnJvcignRmV0Y2hpbmcgYWxsIHVzZXJzIGZhaWxlZCcpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFthZGRFcnJvckFjdGlvbl0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZG9uZSk7XG4gICAgICAgIH0pXG4gICAgICAgIGl0KCdzaG91bGQgY3JlYXRlIGEgbmV3IHVzZXInKTtcbiAgICAgICAgaXQoJ3Nob3VsZCBlZGl0IHRoZSB1c2VyJyk7XG4gICAgICAgIGl0KCdzaG91bGQgZGVsZXRlIHRoZSB1c2VyJyk7XG4gICAgfSk7XG59KSIsImltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0ICdtb2NoYSc7XG5pbXBvcnQgKiBhcyBzb2NrZXRpb2NsaWVudCBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7IE5vdEltcGxlbWVudGVkRXJyb3IgfSBmcm9tICcuLi8nO1xuaW1wb3J0IHtTdGF0ZSwgcm9vdFJlZHVjZXIsIG1pZGRsZXdhcmV9IGZyb20gJy4uLy4uL3NyYy93ZWIvc3RvcmUnO1xuXG5pbXBvcnQgeyBTdG9yZSwgY3JlYXRlU3RvcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBzZXRBdXRob3JpemVkLCBzZXRVc2VyLCBsb2dvdXRVc2VyIH0gZnJvbSAnLi4vLi4vc3JjL3dlYi9hY3Rpb25zL3VzZXJBY3Rpb25zJztcbmltcG9ydCB7IGFkZENoYW5uZWxzLCBzZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcywgaW5jcmVtZW50Q2hhbm5lbFJldHJpZXZlTWVzc2FnZXNPZmZzZXQsIHNldENoYW5uZWxIYXNNb3JlTWVzc2FnZXMsIGFkZFJlY2VpdmVkQ2hhbm5lbE1lc3NhZ2UsIGFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcywgY2xlYXJDaGFubmVsc0RhdGEgfSBmcm9tICcuLi8uLi9zcmMvd2ViL2FjdGlvbnMvY2hhbm5lbHNBY3Rpb25zJztcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICcuLi8uLi9zcmMvd2ViL3JlZHVjZXJzL2NoYW5uZWxzJztcbmltcG9ydCB7IGFkZEVycm9yLCByZW1vdmVFcnJvciwgY2xlYXJFcnJvcnMsIGFkZEluZm8sIHJlbW92ZUluZm8sIGNsZWFySW5mb3MgfSBmcm9tICcuLi8uLi9zcmMvd2ViL2FjdGlvbnMvbm90aWZpY2F0aW9uc0FjdGlvbnMnO1xuaW1wb3J0IHsgdG9nZ2xlU2lkZWJhck9wZW4gfSBmcm9tICcuLi8uLi9zcmMvd2ViL2FjdGlvbnMvc2lkZWJhckFjdGlvbnMnO1xuaW1wb3J0IHsgaW5pdFdlYnNvY2tldCwgc2V0U29ja2V0Q29ubmVjdGVkLCBzZXRTb2NrZXRDb25uZWN0ZWRVc2VycyB9IGZyb20gJy4uLy4uL3NyYy93ZWIvYWN0aW9ucy9zb2NrZXRBY3Rpb25zJztcbmltcG9ydCB7IHVwZGF0ZVVzZXJzLCBhZGRVc2VyLCByZW1vdmVVc2VyIH0gZnJvbSAnLi4vLi4vc3JjL3dlYi9hY3Rpb25zL2NoYXRVc2Vyc0FjdGlvbnMnO1xuaW1wb3J0IHsgU3RhdGUgYXMgQ2hhdFVzZXJzU3RhdGUgfSBmcm9tICcuLi8uLi9zcmMvd2ViL3JlZHVjZXJzL2NoYXRVc2Vycyc7XG5cbmZ1bmN0aW9uIGdldFN0b3JlKCk6IFN0b3JlPFN0YXRlPiB7XG4gICAgcmV0dXJuIGNyZWF0ZVN0b3JlKHJvb3RSZWR1Y2VyLCBtaWRkbGV3YXJlKTtcbn1cblxuZGVzY3JpYmUoJ1N0b3JlIGFuZCBTeW5jaHJvbm91cyBBY3Rpb25zJywgZnVuY3Rpb24oKSB7XG4gICAgZGVzY3JpYmUoJ1VzZXIgU3RhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBzdG9yZTogU3RvcmU8U3RhdGU+O1xuICAgICAgICBsZXQgdXNlcjogKCgpID0+IFN0YXRlWyd1c2VyJ10pO1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlID0gZ2V0U3RvcmUoKTtcbiAgICAgICAgICAgIHVzZXIgPSAoKSA9PiBzdG9yZS5nZXRTdGF0ZSgpLnVzZXI7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIG5vdCBiZSBhdXRob3JpemVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UodXNlcigpLmF1dGhvcml6ZWQpO1xuICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UodXNlcigpLmVtYWlsKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKHVzZXIoKS5uYW1lKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKHVzZXIoKS5yb2xlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgYmUgYXV0aG9yaXplZCBhZnRlciBzZXRBdXRob3JpemVkIGFjdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UodXNlcigpLmF1dGhvcml6ZWQpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc2V0QXV0aG9yaXplZCh0cnVlKSk7XG4gICAgICAgICAgICBhc3NlcnQuaXNUcnVlKHVzZXIoKS5hdXRob3JpemVkKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldEF1dGhvcml6ZWQoZmFsc2UpKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKHVzZXIoKS5hdXRob3JpemVkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgaGF2ZSB1c2VyIGRhdGEgYWZ0ZXIgc2V0dGluZyB0aGUgdXNlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UodXNlcigpLmF1dGhvcml6ZWQpO1xuICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UodXNlcigpLmVtYWlsKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKHVzZXIoKS5uYW1lKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKHVzZXIoKS5yb2xlKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldFVzZXIoe1xuICAgICAgICAgICAgICAgIGF1dGhvcml6ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnSmFuZSBEb2UnLFxuICAgICAgICAgICAgICAgIHJvbGU6ICdhZG1pbidcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIGFzc2VydC5pc1RydWUodXNlcigpLmF1dGhvcml6ZWQpO1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHVzZXIoKS5lbWFpbCwgJ3Rlc3RAdGVzdC5jb20nKTtcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCh1c2VyKCkubmFtZSwgJ0phbmUgRG9lJyk7XG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwodXNlcigpLnJvbGUsICdhZG1pbicpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc2V0VXNlcih7XG4gICAgICAgICAgICAgICAgYXV0aG9yaXplZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgZW1haWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG5hbWU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJvbGU6IGZhbHNlXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICBhc3NlcnQuaXNGYWxzZSh1c2VyKCkuYXV0aG9yaXplZCk7XG4gICAgICAgICAgICBhc3NlcnQuaXNGYWxzZSh1c2VyKCkuZW1haWwpO1xuICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UodXNlcigpLm5hbWUpO1xuICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UodXNlcigpLnJvbGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgaGF2ZSB1c2VyIGRhdGEgYWZ0ZXIgbG9nZ2luZyBvdXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldFVzZXIoe1xuICAgICAgICAgICAgICAgIGF1dGhvcml6ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnSmFuZSBEb2UnLFxuICAgICAgICAgICAgICAgIHJvbGU6ICdhZG1pbidcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGxvZ291dFVzZXIoKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzZXRVc2VyKHtcbiAgICAgICAgICAgICAgICBhdXRob3JpemVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlbWFpbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbmFtZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgcm9sZTogZmFsc2VcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSlcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnQ2hhbm5lbHMgU3RhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBzdG9yZTogU3RvcmU8U3RhdGU+O1xuICAgICAgICBsZXQgY2hhbm5lbHM6ICgoKSA9PiBTdGF0ZVsnY2hhbm5lbHMnXSk7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUgPSBnZXRTdG9yZSgpO1xuICAgICAgICAgICAgY2hhbm5lbHMgPSAoKSA9PiBzdG9yZS5nZXRTdGF0ZSgpLmNoYW5uZWxzO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBhZGQgY2hhbm5lbHMgZnJvbSBhbiBhcnJheSBvZiBjaGFubmVsIG5hbWVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRDaGFubmVscyhbJ2dlbmVyYWwnLCAncmFuZG9tJywgJ3NvbWV0aGluZyBlbHNlJ10pKTtcbiAgICAgICAgICAgIGxldCBjMDogU3RhdGVbJ2NoYW5uZWxzJ11bMF0gPSBjaGFubmVscygpWzBdO1xuICAgICAgICAgICAgbGV0IGMxOiBTdGF0ZVsnY2hhbm5lbHMnXVswXSA9IGNoYW5uZWxzKClbMV07XG4gICAgICAgICAgICBsZXQgYzI6IFN0YXRlWydjaGFubmVscyddWzBdID0gY2hhbm5lbHMoKVsyXTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYzAsIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnZ2VuZXJhbCcsXG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6IFtdLFxuICAgICAgICAgICAgICAgIHJldHJpZXZlTWVzc2FnZXNPZmZzZXQ6IDAsXG4gICAgICAgICAgICAgICAgaGFzTW9yZU1lc3NhZ2VzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGZldGNoaW5nTmV3TWVzc2FnZXM6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGMxLCB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ3JhbmRvbScsXG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6IFtdLFxuICAgICAgICAgICAgICAgIHJldHJpZXZlTWVzc2FnZXNPZmZzZXQ6IDAsXG4gICAgICAgICAgICAgICAgaGFzTW9yZU1lc3NhZ2VzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGZldGNoaW5nTmV3TWVzc2FnZXM6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGMyLCB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ3NvbWV0aGluZyBlbHNlJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlczogW10sXG4gICAgICAgICAgICAgICAgcmV0cmlldmVNZXNzYWdlc09mZnNldDogMCxcbiAgICAgICAgICAgICAgICBoYXNNb3JlTWVzc2FnZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgZmV0Y2hpbmdOZXdNZXNzYWdlczogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgdXBkYXRlIGZldGNoaW5nTmV3TWVzc2FnZXMgYWZ0ZXIgY2FsbGluZyBzZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcyBhY3Rpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZENoYW5uZWxzKFsnZ2VuZXJhbCcsICdyYW5kb20nLCAnc29tZXRoaW5nIGVsc2UnXSkpO1xuICAgICAgICAgICAgY2hhbm5lbHMoKS5mb3JFYWNoKChjOiBTdGF0ZVsnY2hhbm5lbHMnXVswXSkgPT4ge1xuICAgICAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKGMuZmV0Y2hpbmdOZXdNZXNzYWdlcyk7XG4gICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMoYy5uYW1lLCB0cnVlKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNoYW5uZWxzKCkuZm9yRWFjaCgoYzogU3RhdGVbJ2NoYW5uZWxzJ11bMF0pID0+IHtcbiAgICAgICAgICAgICAgICBhc3NlcnQuaXNUcnVlKGMuZmV0Y2hpbmdOZXdNZXNzYWdlcyk7XG4gICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMoYy5uYW1lLCBmYWxzZSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjaGFubmVscygpLmZvckVhY2goKGM6IFN0YXRlWydjaGFubmVscyddWzBdKSA9PiB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UoYy5mZXRjaGluZ05ld01lc3NhZ2VzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBpbmNyZW1lbnQgdGhlIGNoYW5uZWwgb2Zmc2V0IGZvciByZXRyaWV2aW5nIG5ldyBtZXNzYWdlcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWRkQ2hhbm5lbHMoWydnZW5lcmFsJywgJ3JhbmRvbScsICdzb21ldGhpbmcgZWxzZSddKSk7XG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoY2hhbm5lbHMoKS5maW5kKGUgPT4gZS5uYW1lID09PSAnZ2VuZXJhbCcpLnJldHJpZXZlTWVzc2FnZXNPZmZzZXQsIDApO1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNoYW5uZWxzKCkuZmluZChlID0+IGUubmFtZSA9PT0gJ3JhbmRvbScpLnJldHJpZXZlTWVzc2FnZXNPZmZzZXQsIDApO1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNoYW5uZWxzKCkuZmluZChlID0+IGUubmFtZSA9PT0gJ3NvbWV0aGluZyBlbHNlJykucmV0cmlldmVNZXNzYWdlc09mZnNldCwgMCk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChpbmNyZW1lbnRDaGFubmVsUmV0cmlldmVNZXNzYWdlc09mZnNldCgnZ2VuZXJhbCcsIDIwKSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChjaGFubmVscygpLmZpbmQoZSA9PiBlLm5hbWUgPT09ICdnZW5lcmFsJykucmV0cmlldmVNZXNzYWdlc09mZnNldCwgMjApO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goaW5jcmVtZW50Q2hhbm5lbFJldHJpZXZlTWVzc2FnZXNPZmZzZXQoJ2dlbmVyYWwnLCAxKSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChjaGFubmVscygpLmZpbmQoZSA9PiBlLm5hbWUgPT09ICdnZW5lcmFsJykucmV0cmlldmVNZXNzYWdlc09mZnNldCwgMjEpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goaW5jcmVtZW50Q2hhbm5lbFJldHJpZXZlTWVzc2FnZXNPZmZzZXQoJ3JhbmRvbScsIDEpKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNoYW5uZWxzKCkuZmluZChlID0+IGUubmFtZSA9PT0gJ3JhbmRvbScpLnJldHJpZXZlTWVzc2FnZXNPZmZzZXQsIDEpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goaW5jcmVtZW50Q2hhbm5lbFJldHJpZXZlTWVzc2FnZXNPZmZzZXQoJ3NvbWV0aGluZyBlbHNlJywgMSkpXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoY2hhbm5lbHMoKS5maW5kKGUgPT4gZS5uYW1lID09PSAnc29tZXRoaW5nIGVsc2UnKS5yZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0LCAxKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgdXBkYXRlIHRoZSBoYXNNb3JlTWVzc2FnZXMgcHJvcGVydHkgb24gYSBjaGFubmVsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRDaGFubmVscyhbJ2dlbmVyYWwnLCAncmFuZG9tJywgJ3NvbWV0aGluZyBlbHNlJ10pKTtcbiAgICAgICAgICAgIGFzc2VydC5pc1RydWUoY2hhbm5lbHMoKS5maW5kKGUgPT4gZS5uYW1lID09PSAnZ2VuZXJhbCcpLmhhc01vcmVNZXNzYWdlcyk7XG4gICAgICAgICAgICBhc3NlcnQuaXNUcnVlKGNoYW5uZWxzKCkuZmluZChlID0+IGUubmFtZSA9PT0gJ3JhbmRvbScpLmhhc01vcmVNZXNzYWdlcyk7XG4gICAgICAgICAgICBhc3NlcnQuaXNUcnVlKGNoYW5uZWxzKCkuZmluZChlID0+IGUubmFtZSA9PT0gJ3NvbWV0aGluZyBlbHNlJykuaGFzTW9yZU1lc3NhZ2VzKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldENoYW5uZWxIYXNNb3JlTWVzc2FnZXMoJ2dlbmVyYWwnLCBmYWxzZSkpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc2V0Q2hhbm5lbEhhc01vcmVNZXNzYWdlcygncmFuZG9tJywgZmFsc2UpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldENoYW5uZWxIYXNNb3JlTWVzc2FnZXMoJ3NvbWV0aGluZyBlbHNlJywgZmFsc2UpKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKGNoYW5uZWxzKCkuZmluZChlID0+IGUubmFtZSA9PT0gJ2dlbmVyYWwnKS5oYXNNb3JlTWVzc2FnZXMpO1xuICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UoY2hhbm5lbHMoKS5maW5kKGUgPT4gZS5uYW1lID09PSAncmFuZG9tJykuaGFzTW9yZU1lc3NhZ2VzKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKGNoYW5uZWxzKCkuZmluZChlID0+IGUubmFtZSA9PT0gJ3NvbWV0aGluZyBlbHNlJykuaGFzTW9yZU1lc3NhZ2VzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgYWRkIGEgcmVjZWl2ZWQgbWVzc2FnZSB0byB0aGUgYXBwcm9wcmlhdGUgY2hhbm5lbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWRkQ2hhbm5lbHMoWydnZW5lcmFsJywgJ3JhbmRvbScsICdzb21ldGhpbmcgZWxzZSddKSk7XG4gICAgICAgICAgICBsZXQgbWVzc2FnZTogTWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICB1c2VyRW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICBjcmVhdGVkOiBEYXRlLm5vdygpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgX2lkOiAnMScsXG4gICAgICAgICAgICAgICAgdGV4dDogJ3RoaXMgaXMgdGhlIG1lc3NhZ2UnLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWRkUmVjZWl2ZWRDaGFubmVsTWVzc2FnZSgnZ2VuZXJhbCcsIG1lc3NhZ2UpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZFJlY2VpdmVkQ2hhbm5lbE1lc3NhZ2UoJ3JhbmRvbScsIG1lc3NhZ2UpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZFJlY2VpdmVkQ2hhbm5lbE1lc3NhZ2UoJ3JhbmRvbScsIG1lc3NhZ2UpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZFJlY2VpdmVkQ2hhbm5lbE1lc3NhZ2UoJ3NvbWV0aGluZyBlbHNlJywgbWVzc2FnZSkpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWRkUmVjZWl2ZWRDaGFubmVsTWVzc2FnZSgnc29tZXRoaW5nIGVsc2UnLCBtZXNzYWdlKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRSZWNlaXZlZENoYW5uZWxNZXNzYWdlKCdzb21ldGhpbmcgZWxzZScsIG1lc3NhZ2UpKTtcblxuICAgICAgICAgICAgbGV0IGdlbmVyYWxNZXNzYWdlczogTWVzc2FnZVtdID0gY2hhbm5lbHMoKS5maW5kKGUgPT4gZS5uYW1lID09PSAnZ2VuZXJhbCcpLm1lc3NhZ2VzO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChnZW5lcmFsTWVzc2FnZXMubGVuZ3RoLCAxKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoZ2VuZXJhbE1lc3NhZ2VzLCBbbWVzc2FnZV0pO1xuICAgICAgICAgICAgbGV0IHJhbmRvbU1lc3NhZ2VzOiBNZXNzYWdlW10gPSBjaGFubmVscygpLmZpbmQoZSA9PiBlLm5hbWUgPT09ICdyYW5kb20nKS5tZXNzYWdlcztcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwocmFuZG9tTWVzc2FnZXMubGVuZ3RoLCAyKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwocmFuZG9tTWVzc2FnZXMsIFttZXNzYWdlLCBtZXNzYWdlXSk7XG4gICAgICAgICAgICBsZXQgb3RoZXJNZXNzYWdlczogTWVzc2FnZVtdID0gY2hhbm5lbHMoKS5maW5kKGUgPT4gZS5uYW1lID09PSAnc29tZXRoaW5nIGVsc2UnKS5tZXNzYWdlcztcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwob3RoZXJNZXNzYWdlcy5sZW5ndGgsIDMpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChvdGhlck1lc3NhZ2VzLCBbbWVzc2FnZSwgbWVzc2FnZSwgbWVzc2FnZV0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBhZGQgcmV0cmVpdmVkIG1lc3NhZ2VzIHRvIHRoZSBhcHByb3ByaWF0ZSBjaGFubmVsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRDaGFubmVscyhbJ2dlbmVyYWwnLCAncmFuZG9tJywgJ3NvbWV0aGluZyBlbHNlJ10pKTtcbiAgICAgICAgICAgIGxldCBtZXNzYWdlczogTWVzc2FnZVtdID0gW1xuICAgICAgICAgICAgICAgIHsgXCJ0ZXh0XCI6IFwiU29tZXRoaW5nIGhlcmVcIiwgXCJjcmVhdGVkXCI6IFwiMjAxOS0wNC0xM1QxNjo0NToyOC45NDZaXCIsIFwidXNlckVtYWlsXCI6IFwiYWJrb3RobWFuQGdtYWlsLmNvbVwiLCBcIl9pZFwiOiBcIjVjYjIxMjI4MWQ2NDVhMjJhYmVhOGRiZVwiIH0sXG4gICAgICAgICAgICAgICAgeyBcInRleHRcIjogXCIxMjM0MTIzNFwiLCBcImNyZWF0ZWRcIjogXCIyMDE5LTA0LTE0VDIyOjM0OjA2LjY4NlpcIiwgXCJ1c2VyRW1haWxcIjogXCJhYmtvdGhtYW5AZ21haWwuY29tXCIsICBcIl9pZFwiOiBcIjVjYjNiNTVlY2JmNjhjNmE5NTRlYWZiM1wiIH0sXG4gICAgICAgICAgICAgICAgeyBcInRleHRcIjogXCJ0ZXN0IG9uZSB0d28gdGhyZWVcIiwgXCJjcmVhdGVkXCI6IFwiMjAxOS0wNC0xNFQyMjozNDoxMC45MDNaXCIsIFwidXNlckVtYWlsXCI6IFwiYWJrb3RobWFuQGdtYWlsLmNvbVwiLCBcIl9pZFwiOiBcIjVjYjNiNTYyY2JmNjhjNmE5NTRlYWZiNFwiIH1dO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWRkUmV0cmlldmVkQ2hhbm5lbE1lc3NhZ2VzKCdnZW5lcmFsJywgbWVzc2FnZXMpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcygncmFuZG9tJywgbWVzc2FnZXMpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcygncmFuZG9tJywgbWVzc2FnZXMpKTtcbiAgICAgICAgICAgIGxldCBjaGFubmVsU3RhdGUgPSBjaGFubmVscygpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgICBjaGFubmVsU3RhdGVcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoKGMpID0+IGMubmFtZSA9PT0gJ2dlbmVyYWwnKVxuICAgICAgICAgICAgICAgICAgICAubWVzc2FnZXMsXG4gICAgICAgICAgICAgICAgbWVzc2FnZXMpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgICBjaGFubmVsU3RhdGVcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoKGMpID0+IGMubmFtZSA9PT0gJ3JhbmRvbScpXG4gICAgICAgICAgICAgICAgICAgIC5tZXNzYWdlcyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5jb25jYXQobWVzc2FnZXMpKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgY2hhbm5lbFN0YXRlXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKChjKSA9PiBjLm5hbWUgPT09ICdzb21ldGhpbmcgZWxzZScpXG4gICAgICAgICAgICAgICAgICAgIC5tZXNzYWdlcyxcbiAgICAgICAgICAgICAgICBbXSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGNsZWFyIGFsbCBjaGFubmVsIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZENoYW5uZWxzKFsnZ2VuZXJhbCcsICdyYW5kb20nLCAnc29tZXRoaW5nIGVsc2UnXSkpO1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2VzOiBNZXNzYWdlW10gPSBbXG4gICAgICAgICAgICAgICAgeyBcInRleHRcIjogXCJTb21ldGhpbmcgaGVyZVwiLCBcImNyZWF0ZWRcIjogXCIyMDE5LTA0LTEzVDE2OjQ1OjI4Ljk0NlpcIiwgXCJ1c2VyRW1haWxcIjogXCJhYmtvdGhtYW5AZ21haWwuY29tXCIsIFwiX2lkXCI6IFwiNWNiMjEyMjgxZDY0NWEyMmFiZWE4ZGJlXCIgfSxcbiAgICAgICAgICAgICAgICB7IFwidGV4dFwiOiBcIjEyMzQxMjM0XCIsIFwiY3JlYXRlZFwiOiBcIjIwMTktMDQtMTRUMjI6MzQ6MDYuNjg2WlwiLCBcInVzZXJFbWFpbFwiOiBcImFia290aG1hbkBnbWFpbC5jb21cIiwgXCJfaWRcIjogXCI1Y2IzYjU1ZWNiZjY4YzZhOTU0ZWFmYjNcIiB9LFxuICAgICAgICAgICAgICAgIHsgXCJ0ZXh0XCI6IFwidGVzdCBvbmUgdHdvIHRocmVlXCIsIFwiY3JlYXRlZFwiOiBcIjIwMTktMDQtMTRUMjI6MzQ6MTAuOTAzWlwiLCBcInVzZXJFbWFpbFwiOiBcImFia290aG1hbkBnbWFpbC5jb21cIiwgXCJfaWRcIjogXCI1Y2IzYjU2MmNiZjY4YzZhOTU0ZWFmYjRcIiB9XTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcygnZ2VuZXJhbCcsIG1lc3NhZ2VzKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRSZXRyaWV2ZWRDaGFubmVsTWVzc2FnZXMoJ3JhbmRvbScsIG1lc3NhZ2VzKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRSZXRyaWV2ZWRDaGFubmVsTWVzc2FnZXMoJ3JhbmRvbScsIG1lc3NhZ2VzKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjbGVhckNoYW5uZWxzRGF0YSgpKTtcbiAgICAgICAgICAgIGxldCBjaGFubmVsU3RhdGUgPSBjaGFubmVscygpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChjaGFubmVsU3RhdGUsIFtdKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ05vdGlmaWNhdGlvbnMgU3RhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBzdG9yZTogU3RvcmU8U3RhdGU+O1xuICAgICAgICBsZXQgbm90aWZpY2F0aW9uczogKCgpID0+IFN0YXRlWydub3RpZmljYXRpb25zJ10pO1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3RvcmUgPSBnZXRTdG9yZSgpO1xuICAgICAgICAgICAgbm90aWZpY2F0aW9ucyA9ICgpID0+IHN0b3JlLmdldFN0YXRlKCkubm90aWZpY2F0aW9ucztcbiAgICAgICAgfSlcbiAgICAgICAgaXQoJ3Nob3VsZCBhZGQgZXJyb3JzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5vdGlmaWNhdGlvbnMoKS5lcnJvcnMsIFtdKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZEVycm9yKCdUZXN0IGVycm9yJykpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuZXJyb3JzLCBbJ1Rlc3QgZXJyb3InXSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRFcnJvcignQW5vdGhlciBlcnJvcicpKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmVycm9ycywgWydUZXN0IGVycm9yJywgJ0Fub3RoZXIgZXJyb3InXSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJlbW92ZSBlcnJvcnMgZ2l2ZW4gYW4gaW5kZXgnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZEVycm9yKCdUZXN0IGVycm9yJykpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWRkRXJyb3IoJ0Fub3RoZXIgZXJyb3InKSk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5vdGlmaWNhdGlvbnMoKS5lcnJvcnMsIFsnVGVzdCBlcnJvcicsICdBbm90aGVyIGVycm9yJ10pO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2gocmVtb3ZlRXJyb3IoMSkpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuZXJyb3JzLCBbJ1Rlc3QgZXJyb3InXSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChyZW1vdmVFcnJvcigwKSlcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmVycm9ycywgW10pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBjbGVhciBlcnJvcnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZEVycm9yKCdUZXN0IGVycm9yJykpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWRkRXJyb3IoJ0Fub3RoZXIgZXJyb3InKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjbGVhckVycm9ycygpKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmVycm9ycywgW10pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBhZGQgaW5mbycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuaW5mb3MsIFtdKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZEluZm8oJ1Rlc3QgaW5mbycpKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmluZm9zLCBbJ1Rlc3QgaW5mbyddKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZEluZm8oJ0Fub3RoZXIgaW5mbycpKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmluZm9zLCBbJ1Rlc3QgaW5mbycsICdBbm90aGVyIGluZm8nXSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJlbW92ZSBpbmZvIGdpdmVuIGFuIGluZGV4JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRJbmZvKCdUZXN0IGluZm8nKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRJbmZvKCdBbm90aGVyIGluZm8nKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChyZW1vdmVJbmZvKDEpKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmluZm9zLCBbJ1Rlc3QgaW5mbyddKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHJlbW92ZUluZm8oMCkpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuaW5mb3MsIFtdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgY2xlYXIgaW5mb3MnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZEluZm8oJ1Rlc3QgaW5mbycpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZEluZm8oJ0Fub3RoZXIgaW5mbycpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNsZWFySW5mb3MoKSk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5vdGlmaWNhdGlvbnMoKS5pbmZvcywgW10pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnU2lkZWJhciBTdGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IHN0b3JlOiBTdG9yZTxTdGF0ZT47XG4gICAgICAgIGxldCBzaWRlYmFyOiAoKCkgPT4gU3RhdGVbJ3NpZGViYXInXSk7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUgPSBnZXRTdG9yZSgpO1xuICAgICAgICAgICAgc2lkZWJhciA9ICgpID0+IHN0b3JlLmdldFN0YXRlKCkuc2lkZWJhcjtcbiAgICAgICAgfSlcbiAgICAgICAgaXQoJ3Nob3VsZCB0b2dnbGUgb3BlbiBzdGF0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYXNzZXJ0LmlzVHJ1ZShzaWRlYmFyKCkub3Blbik7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh0b2dnbGVTaWRlYmFyT3BlbigpKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKHNpZGViYXIoKS5vcGVuKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHRvZ2dsZVNpZGViYXJPcGVuKCkpO1xuICAgICAgICAgICAgYXNzZXJ0LmlzVHJ1ZShzaWRlYmFyKCkub3Blbik7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh0b2dnbGVTaWRlYmFyT3BlbigpKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKHNpZGViYXIoKS5vcGVuKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ1NvY2tldCBTdGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IHN0b3JlOiBTdG9yZTxTdGF0ZT47XG4gICAgICAgIGxldCBzb2NrZXQ6ICgoKSA9PiBTdGF0ZVsnc29ja2V0J10pO1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlID0gZ2V0U3RvcmUoKTtcbiAgICAgICAgICAgIHNvY2tldCA9ICgpID0+IHN0b3JlLmdldFN0YXRlKCkuc29ja2V0O1xuICAgICAgICB9KVxuICAgICAgICBpdCgnc2hvdWxkIHNldCB0aGUgc29ja2V0IGdpdmVuIGEgU29ja2V0SU9DbGllbnQgU29ja2V0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKHNvY2tldCgpLCB7XG4gICAgICAgICAgICAgICAgaW86IG51bGwsXG4gICAgICAgICAgICAgICAgY29ubmVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb25uZWN0ZWRVc2VyRW1haWxzOiBbXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsZXQgc29ja2V0aW86IFNvY2tldElPQ2xpZW50LlNvY2tldCA9IHNvY2tldGlvY2xpZW50KCk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChpbml0V2Vic29ja2V0KHNvY2tldGlvKSk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKHNvY2tldCgpLCB7XG4gICAgICAgICAgICAgICAgaW86IHNvY2tldGlvLFxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29ubmVjdGVkVXNlckVtYWlsczogW11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc29ja2V0aW8uY2xvc2UoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgdXBkYXRlIHRoZSBjb25uZWN0ZWQgc3RhdGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldFNvY2tldENvbm5lY3RlZCh0cnVlKSk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKHNvY2tldCgpLCB7XG4gICAgICAgICAgICAgICAgaW86IG51bGwsXG4gICAgICAgICAgICAgICAgY29ubmVjdGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZFVzZXJFbWFpbHM6IFtdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldFNvY2tldENvbm5lY3RlZChmYWxzZSkpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChzb2NrZXQoKSwge1xuICAgICAgICAgICAgICAgIGlvOiBudWxsLFxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29ubmVjdGVkVXNlckVtYWlsczogW11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCB1cGRhdGUgdGhlIGNvbm5lY3RlZCB1c2VycycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGVtYWlsczogc3RyaW5nW10gPSBbJ3Rlc3RAdGVzdC5jb20nLCAndGVzdDJAdGVzdC5jb20nXTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldFNvY2tldENvbm5lY3RlZFVzZXJzKGVtYWlscykpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChzb2NrZXQoKSwge1xuICAgICAgICAgICAgICAgIGlvOiBudWxsLFxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29ubmVjdGVkVXNlckVtYWlsczogZW1haWxzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ0NoYXQgVXNlcnMgU3RhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBzdG9yZTogU3RvcmU8U3RhdGU+O1xuICAgICAgICBsZXQgY2hhdFVzZXJzOiAoKCkgPT4gU3RhdGVbJ2NoYXRVc2VycyddKTtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdG9yZSA9IGdldFN0b3JlKCk7XG4gICAgICAgICAgICBjaGF0VXNlcnMgPSAoKSA9PiBzdG9yZS5nZXRTdGF0ZSgpLmNoYXRVc2VycztcbiAgICAgICAgfSlcbiAgICAgICAgaXQoJ3Nob3VsZCB1cGRhdGUgdXNlcnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCB1c2VyczogQ2hhdFVzZXJzU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgJ3Rlc3RAdGVzdC5jb20nOiB7XG4gICAgICAgICAgICAgICAgICAgIHJvbGU6ICd1c2VyJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ1Rlc3QgTmFtZSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICd0ZXN0MkB0ZXN0LmNvbSc6IHtcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogJ2FkbWluJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0Fub3RoZXIgdGVzdCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICd0ZXN0M0B0ZXN0LmNvbSc6IHtcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogJ2FkbWluJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0xhc3QgdGVzdCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVVc2Vycyh1c2VycykpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChjaGF0VXNlcnMoKSwgdXNlcnMpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBhZGQgYSB1c2VyJyk7XG4gICAgICAgIGl0KCdzaG91bGQgcmVtb3ZlIGEgdXNlcicpO1xuICAgIH0pO1xufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvcy1tb2NrLWFkYXB0ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmNyeXB0anNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hhaVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb21wcmVzc2lvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb25uZWN0LW1vbmdvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvb2tpZS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3N1cmZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzLXNlc3Npb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaGVsbWV0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwianNvbndlYnRva2VuXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vY2hhXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm11c3RhY2hlLWV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1sb2dnZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtbW9jay1zdG9yZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC10aHVua1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzb2NrZXQuaW9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic29ja2V0LmlvLWNsaWVudFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzb2NrZXRpby1qd3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3VwZXJ0ZXN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInN1cGVydGVzdC1zZXNzaW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInZhbGlkYXRvclwiKTsiXSwic291cmNlUm9vdCI6IiJ9