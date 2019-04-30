<<<<<<< HEAD
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
        return User_1["default"].find({}).select('name email role').then(function (users) {
            return res.status(200).json({ success: true, users: users });
        })["catch"](function (err) {
            console.error(err);
            return res.status(500).json({ error: 'Something went wrong while retrieving users' });
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
                        role: user.role,
                        created: user.createdAt
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
    createUser: function (req, res) {
        if (validator_1.isEmpty(req.body.email) || !validator_1.isEmail(req.body.email) ||
            validator_1.isEmpty(req.body.role) || (req.body.role !== 'user' && req.body.role !== 'admin'))
            return res.status(400).json({ error: 'Must supply valid email and role' });
        return User_1["default"].findByEmail(req.body.email).countDocuments(function (err, c) {
            if (err) {
                console.error('Something went wrong trying to count users with email ' + req.body.email, err);
                return res.status(500).json({ error: 'Something went wrong' });
            }
            if (c !== 0)
                return res.status(400).json({ error: 'Email address in use' });
            var u = new User_1["default"]({
                email: req.body.email,
                name: req.body.name || '',
                role: req.body.role,
                password: 'temp',
            });
            return u.save(function (err, u) {
                if (err) {
                    console.error('Something went wrong trying to save user', err);
                    return res.status(500).json({ error: 'Something went wrong' });
                }
                return res.status(200).json({ success: true });
            });
        });
    },
    editUser: function (req, res) {
        if (!req.body.email || !validator_1.isEmail(req.body.email))
            return res.status(400).json({ error: 'Please supply a valid email' });
        if (req.body.user.email && !validator_1.isEmail(req.body.user.email))
            return res.status(400).json({ error: 'Please supply a valid email' });
        if (req.body.user.role && !validator_1.isEmpty(req.body.user.role) && (req.body.user.role !== 'user' && req.body.user.role !== 'admin'))
            return res.status(400).json({ error: 'Invalid role' });
        return User_1["default"].findByEmail(req.body.email).exec(function (err, user) {
            if (err) {
                console.log('Something went wrong', err);
                return res.status(500).json({ error: 'Something went wrong' });
            }
            if (!user) {
                return res.status(404).json({ error: 'User does not exist' });
            }
            if (req.body.user.email)
                user.email = req.body.user.email;
            if (req.body.user.name)
                user.name = req.body.user.name;
            if (req.body.user.role)
                user.role = req.body.user.role;
            return user.save(function (err, user) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: 'Something went wrong' });
                }
                return res.status(200).json({ success: true });
            });
        });
    },
    deleteUser: function (req, res) {
    }
};


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
    if (req.user && req.user.role === 'admin') {
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
var jsonwebtoken_1 = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
var env = __webpack_require__(/*! ../../../env */ "./env.js");
function default_1(req, res, next) {
    var token = req.session.token || req.headers['x-access-token'];
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
var admin_1 = __webpack_require__(/*! ./middleware/admin */ "./src/server/middleware/admin.ts");
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
    app.use('/api/v1/user*', authorized_1["default"]);
    app.get('/api/v1/user', userController_1["default"].user);
    app.get('/api/v1/users', userController_1["default"].users);
    app.get('/api/v1/user/:user', userController_1["default"].userByEmail);
    app.post('/api/v1/user/update/email', userController_1["default"].updateEmail);
    app.post('/api/v1/user/update/name', userController_1["default"].updateName);
    app.post('/api/v1/user/update/password', userController_1["default"].updatePassword);
    app.post('/api/v1/user/reset_password', userController_1["default"].resetPassword);
    app.post('/api/v1/user/create', admin_1["default"], userController_1["default"].createUser);
    app.put('/api/v1/user/update', admin_1["default"], userController_1["default"].editUser);
    app.post('/api/v1/user/delete', admin_1["default"], userController_1["default"].deleteUser);
    app.use('/api/v1/message*', authorized_1["default"]);
    app.get('/api/v1/messages/:channel/:offset', messageController_1["default"].messages);
    app.use('/api/v1/channel', authorized_1["default"]);
    app.get('/api/v1/channels', channelController_1["default"].channels);
    app.post('/api/v1/channels/delete', admin_1["default"], channelController_1["default"]["delete"]);
    app.post('/api/v1/channels/create', admin_1["default"], channelController_1["default"].create);
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
        res.setHeader('x-access-token', token);
        req.session.token = token;
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
    return function (dispatch) {
        return axios_1["default"].get('/api/v1/');
    };
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
    describe('POST /api/v1/login', function () {
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
    describe('POST /api/v1/register', function () {
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
    describe('POST /api/v1/logout', function () {
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
    describe('POST /api/v1/verifyEmail', function () {
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var request = __webpack_require__(/*! supertest */ "supertest");
var bcryptjs_1 = __webpack_require__(/*! bcryptjs */ "bcryptjs");
var chai_1 = __webpack_require__(/*! chai */ "chai");
var __1 = __webpack_require__(/*! ../ */ "./tests/index.ts");
var User_1 = __webpack_require__(/*! ../../src/server/models/User */ "./src/server/models/User.ts");
describe('User Controller', function () {
    var token;
    var userInfo = {
        name: 'Adrian',
        email: 'test@test.com',
        password: 'test',
        role: 'admin'
    };
    beforeEach(function (done) {
        __1.dropAllCollections().then(function () {
            var user = new User_1["default"]({
                name: userInfo.name,
                email: userInfo.email,
                password: bcryptjs_1.hashSync(userInfo.password),
                role: userInfo.role,
            });
            user.save().then(function (user) {
                request(__1.app)
                    .post('/api/v1/login')
                    .send({ email: userInfo.email, password: userInfo.password })
                    .expect(200)
                    .end(function (err, res) {
                    token = res.get('x-access-token');
                    chai_1.assert.isNotNull(token);
                    chai_1.assert.isString(token);
                    chai_1.assert.isNotEmpty(token);
                    done();
                });
            })["catch"](function (err) {
                throw err;
            });
        });
    });
    describe('GET /api/v1/user', function () {
        it('should fetch the logged in user', function (done) {
            request(__1.app)
                .get('/api/v1/user')
                .set('x-access-token', token)
                .expect(200, function (err, res) {
                if (err)
                    return done(err);
                chai_1.assert.strictEqual(res.body.name, userInfo.name);
                chai_1.assert.strictEqual(res.body.email, userInfo.email);
                chai_1.assert.strictEqual(res.body.role, userInfo.role);
                chai_1.assert.notProperty(res.body, 'password');
                done();
            });
        });
        it('should fail if not logged in', function (done) {
            request(__1.app)
                .get('/api/v1/user')
                .expect(401, done);
        });
    });
    describe('GET /api/v1/users', function () {
        it('should receive a list of users', function (done) {
            request(__1.app)
                .get('/api/v1/users')
                .set('x-access-token', token)
                .expect(200, function (err, res) {
                chai_1.assert.strictEqual(res.body.users.length, 1);
                chai_1.assert.include(res.body.users[0], {
                    name: userInfo.name,
                    role: userInfo.role,
                    email: userInfo.email
                });
                chai_1.assert.notProperty(res.body.users[0], 'password');
                done();
            });
        });
        it('should fail if not logged in', function (done) {
            request(__1.app)
                .get('/api/v1/users')
                .expect(401, done);
        });
    });
    describe('GET /api/v1/user/:email', function () {
        it('should retrieve a user by email', function (done) {
            request(__1.app)
                .get('/api/v1/user/' + userInfo.email)
                .set('x-access-token', token)
                .expect(200, function (err, res) {
                chai_1.assert.hasAllKeys(res.body.user, ['email', 'name', 'role', '_id', 'created']);
                chai_1.assert.include(res.body.user, {
                    email: userInfo.email,
                    name: userInfo.name,
                    role: userInfo.role,
                });
                done();
            });
        });
        it('should fail if email does not exist', function (done) {
            request(__1.app)
                .get('/api/v1/user/not.in.use@test.com')
                .set('x-access-token', token)
                .expect(400, function (err, res) {
                chai_1.assert.isString(res.body.error);
                chai_1.assert.strictEqual(res.body.error, 'No user found with that email');
                done(err);
            });
        });
        it('should fail if not a valid email', function (done) {
            request(__1.app)
                .get('/api/v1/user/not-an-email')
                .set('x-access-token', token)
                .expect(400, function (err, res) {
                chai_1.assert.isString(res.body.error);
                chai_1.assert.strictEqual(res.body.error, 'Please supply a valid email');
                done(err);
            });
        });
    });
    describe('POST /api/v1/user/update/email', function () {
        it("should update the logged in user's email", function (done) {
            var newEmail = 'new.email@test.com';
            request(__1.app)
                .post('/api/v1/user/update/email')
                .set('x-access-token', token)
                .send({ email: newEmail })
                .expect(200, function (err, res) {
                if (err)
                    return done(err);
                request(__1.app)
                    .get('/api/v1/user')
                    .set('x-access-token', res.get('x-access-token'))
                    .expect(200, function (err, res) {
                    chai_1.assert.strictEqual(res.body.name, userInfo.name);
                    chai_1.assert.strictEqual(res.body.email, newEmail);
                    chai_1.assert.strictEqual(res.body.role, userInfo.role);
                    done(err);
                });
            });
        });
        it('should fail if new email is not valid', function (done) {
            request(__1.app)
                .post('/api/v1/user/update/email')
                .set('x-access-token', token)
                .send({ email: 'not an email' })
                .expect(400, done);
        });
        it('should fail if email already in use', function (done) {
            request(__1.app)
                .post('/api/v1/user/update/email')
                .set('x-access-token', token)
                .send({ email: 'test@test.com' })
                .expect(400, done);
        });
        it('should fail if not authorized', function (done) {
            request(__1.app)
                .post('/api/v1/user/update/email')
                .send({ email: 'test@test.com' })
                .expect(401, done);
        });
    });
    describe('POST /api/v1/user/update/name', function () {
        it('should update name', function (done) {
            var newName = 'new name';
            request(__1.app)
                .post('/api/v1/user/update/name')
                .set('x-access-token', token)
                .send({ name: newName })
                .expect(200, function (err, res) {
                request(__1.app)
                    .get('/api/v1/user')
                    .set('x-access-token', res.get('x-access-token'))
                    .expect(200, function (err, res) {
                    chai_1.assert.strictEqual(res.body.name, newName);
                    chai_1.assert.strictEqual(res.body.email, userInfo.email);
                    chai_1.assert.strictEqual(res.body.role, userInfo.role);
                    done(err);
                });
            });
        });
        it('should fail if not authorized', function (done) {
            var newName = 'new name';
            request(__1.app)
                .post('/api/v1/user/update/name')
                .send({ name: newName })
                .expect(401, done);
        });
    });
    describe('POST /api/v1/user/update/password', function () {
        it('should update password', function (done) {
            var newPass = 'newpass';
            request(__1.app)
                .post('/api/v1/user/update/password')
                .set('x-access-token', token)
                .send({ oldPass: userInfo.password, newPass: newPass })
                .expect(200, function (err, res) {
                if (err)
                    return done(err);
                request(__1.app)
                    .post('/api/v1/login')
                    .send({ email: userInfo.email, password: newPass })
                    .expect(200, done);
            });
        });
        it('should fail updating password if current password invalid', function (done) {
            request(__1.app)
                .post('/api/v1/user/update/password')
                .set('x-access-token', token)
                .send({ oldPass: 'wrong password', newPass: '12341234' })
                .expect(400, done);
        });
        it('should fail updating password if not authorized', function (done) {
            request(__1.app)
                .post('/api/v1/user/update/password')
                .expect(401, done);
        });
    });
    describe('POST /api/v1/user/create', function () {
        var newUser = {
            email: 'test123@test.com',
            name: 'New User',
            role: 'user',
        };
        it('should create a new user', function (done) {
            User_1["default"].findByEmail(newUser.email).countDocuments(function (err, count) {
                if (err)
                    return done(err);
                chai_1.assert.strictEqual(count, 0, 'User should not exist with email test123Wtest.com');
                request(__1.app)
                    .post('/api/v1/user/create')
                    .set('x-access-token', token)
                    .send(newUser)
                    .expect(200, function (err, res) {
                    if (err)
                        return done(err);
                    User_1["default"].findByEmail(newUser.email).exec(function (err, user) {
                        if (err)
                            return done(err);
                        chai_1.assert.deepInclude(user, newUser);
                        done();
                    });
                });
            });
        });
        it('should fail if user making request is not an admin', function (done) {
            var user = new User_1["default"]({
                name: newUser.name,
                email: newUser.email,
                password: bcryptjs_1.hashSync('password'),
                role: newUser.role,
            });
            user.save().then(function (user) {
                request(__1.app)
                    .post('/api/v1/login')
                    .send({ email: newUser.email, password: 'password' })
                    .expect(200)
                    .end(function (err, res) {
                    token = res.get('x-access-token');
                    request(__1.app)
                        .post('/api/v1/user/create')
                        .set('x-access-token', token)
                        .expect(401, done);
                });
            })["catch"](function (err) {
                throw err;
            });
        });
        it('should fail if user is not logged in', function (done) {
            request(__1.app)
                .post('/api/v1/user/create')
                .expect(401, done);
        });
        it('should fail if email is not valid', function (done) {
            request(__1.app)
                .post('/api/v1/user/create')
                .set('x-access-token', token)
                .send({
                email: 'not valid',
                name: newUser.name,
                role: newUser.role
            })
                .expect(400, done);
        });
        it('should fail if role not valid', function (done) {
            request(__1.app)
                .post('/api/v1/user/create')
                .set('x-access-token', token)
                .send({
                email: newUser.email,
                name: newUser.name,
                role: 'not valid'
            })
                .expect(400, done);
        });
        it('should fail if email address already in use', function (done) {
            request(__1.app)
                .post('/api/v1/user/create')
                .set('x-access-token', token)
                .send({
                email: userInfo.email,
                name: newUser.name,
                role: newUser.role
            })
                .expect(400, done);
        });
    });
    describe('PUT /api/v1/user/update', function () {
        var newUserInfo = {
            name: 'New Name',
            email: 'newemail@test.com',
            role: 'user'
        };
        it('should update the user', function (done) {
            request(__1.app)
                .put('/api/v1/user/update')
                .set('x-access-token', token)
                .send({ email: userInfo.email, user: newUserInfo })
                .expect(200, function (err, res) {
                if (err)
                    return done(err);
                User_1["default"].findByEmail(newUserInfo.email).exec(function (err, user) {
                    if (err)
                        return done(err);
                    chai_1.assert.isNotNull(user);
                    chai_1.assert.deepInclude(user, newUserInfo);
                    done();
                });
            });
        });
        it('should fail if user with email does not exist', function (done) {
            request(__1.app)
                .put('/api/v1/user/update')
                .set('x-access-token', token)
                .send({ email: 'doesnotexist@test.com', user: newUserInfo })
                .expect(404, done);
        });
        it('should fail if new email not valid', function (done) {
            request(__1.app)
                .put('/api/v1/user/update')
                .set('x-access-token', token)
                .send({
                email: userInfo.email,
                user: Object.assign({}, newUserInfo, { email: 'not valid' })
            }).expect(400, done);
        });
        it('should fail if role not valid', function (done) {
            request(__1.app)
                .put('/api/v1/user/update')
                .set('x-access-token', token)
                .send({
                email: userInfo.email,
                user: Object.assign({}, newUserInfo, { role: 'not valid' })
            }).expect(400, done);
        });
    });
});


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZW52LmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvY29udHJvbGxlcnMvYXV0aENvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9jb250cm9sbGVycy9jaGFubmVsQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2NvbnRyb2xsZXJzL21lc3NhZ2VDb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvY29udHJvbGxlcnMvdXNlckNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9taWRkbGV3YXJlL2FkbWluLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbWlkZGxld2FyZS9hdXRob3JpemVkLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbW9kZWxzL0NoYW5uZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9tb2RlbHMvTWVzc2FnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21vZGVscy9Vc2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvcm91dGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvc2VydmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvc29ja2V0LmlvL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy93ZWIvYWN0aW9ucy9jaGFubmVsc0FjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9hY3Rpb25zL2NoYXRVc2Vyc0FjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9hY3Rpb25zL25vdGlmaWNhdGlvbnNBY3Rpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy93ZWIvYWN0aW9ucy9zaWRlYmFyQWN0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL2FjdGlvbnMvc29ja2V0QWN0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL2FjdGlvbnMvdXNlckFjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9yZWR1Y2Vycy9jaGFubmVscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL3JlZHVjZXJzL2NoYXRVc2Vycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL3JlZHVjZXJzL25vdGlmaWNhdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9yZWR1Y2Vycy9zaWRlYmFyLnRzIiwid2VicGFjazovLy8uL3NyYy93ZWIvcmVkdWNlcnMvc29ja2V0LnRzIiwid2VicGFjazovLy8uL3NyYy93ZWIvcmVkdWNlcnMvdXNlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL3N0b3JlLnRzIiwid2VicGFjazovLy8uL3Rlc3RzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3Rlc3RzL3NlcnZlci90ZXN0QXV0aENvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vdGVzdHMvc2VydmVyL3Rlc3RVc2VyQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi90ZXN0cy93ZWIvdGVzdEFzeW5jQWN0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi90ZXN0cy93ZWIvdGVzdFN0b3JlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3MtbW9jay1hZGFwdGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmNyeXB0anNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNoYWlcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb21wcmVzc2lvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvbm5lY3QtbW9uZ29cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb29raWUtcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY3N1cmZcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzcy1zZXNzaW9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaGVsbWV0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImpzb253ZWJ0b2tlblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vY2hhXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9uZ29vc2VcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtdXN0YWNoZS1leHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtbG9nZ2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtbW9jay1zdG9yZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LXRodW5rXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic29ja2V0LmlvXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic29ja2V0LmlvLWNsaWVudFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvY2tldGlvLWp3dFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInN1cGVydGVzdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInN1cGVydGVzdC1zZXNzaW9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidmFsaWRhdG9yXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztB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Q0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7QUMzV0gsa0M7Ozs7Ozs7Ozs7O0FDQUEsK0M7Ozs7Ozs7Ozs7O0FDQUEscUM7Ozs7Ozs7Ozs7O0FDQUEsd0M7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsd0M7Ozs7Ozs7Ozs7O0FDQUEsMEM7Ozs7Ozs7Ozs7O0FDQUEsMEM7Ozs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsNEM7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEseUM7Ozs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7O0FDQUEscUM7Ozs7Ozs7Ozs7O0FDQUEsNkM7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7O0FDQUEseUM7Ozs7Ozs7Ozs7O0FDQUEsNkM7Ozs7Ozs7Ozs7O0FDQUEsd0M7Ozs7Ozs7Ozs7O0FDQUEsc0M7Ozs7Ozs7Ozs7O0FDQUEsNkM7Ozs7Ozs7Ozs7O0FDQUEseUM7Ozs7Ozs7Ozs7O0FDQUEsc0M7Ozs7Ozs7Ozs7O0FDQUEsOEM7Ozs7Ozs7Ozs7O0FDQUEsc0MiLCJmaWxlIjoiYWxsLXRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi90ZXN0cy9pbmRleC50c1wiKTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIC8vIGh0dHBzOi8vZG9jcy5tb25nb2RiLmNvbS9tYW51YWwvcmVmZXJlbmNlL2Nvbm5lY3Rpb24tc3RyaW5nL1xuICAgIG1vbmdvZGJDb25uZWN0aW9uVXJpOiBwcm9jZXNzLmVudi5NT05HT0RCX1VSSSxcbiAgICBtb25nb2RiVGVzdENvbm5lY3Rpb25Vcmk6ICdtb25nb2RiOi8vbG9jYWxob3N0OjI3MDE3L29wZW5DaGF0VGVzdCcsXG4gICAgcG9ydDogcHJvY2Vzcy5lbnYuUE9SVCB8fCA1MDAwLFxuICAgIHByb2R1Y3Rpb246IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicgfHwgZmFsc2UsXG4gICAgdXNlVGVzdERiOiBwcm9jZXNzLmVudi5VU0VfVEVTVF9EQiB8fCBmYWxzZSxcbiAgICBzZWNyZXQ6IHByb2Nlc3MuZW52LlNFQ1JFVCB8fCAnc2VjcmV0JyxcbiAgICBkaXNhYmxlQ3NyZjogcHJvY2Vzcy5lbnYuRElTQUJMRV9DU1JGIHx8IGZhbHNlLFxuICAgIGRpc2FibGVSZWR1eExvZ2dpbmc6IHByb2Nlc3MuZW52LkRJU0FCTEVfUkVEVVhfTE9HR0lORyB8fCBmYWxzZSxcbiAgICBkaXNhYmxlQXV0b1N0YXJ0OiBwcm9jZXNzLmVudi5ESVNBQkxFX0FVVE9fU1RBUlQgfHwgZmFsc2UsXG4gICAgbWFpbGd1bkFwaUtleTogcHJvY2Vzcy5lbnYuTUFJTEdVTl9BUElfS0VZLFxuICAgIG1haWxndW5Eb21haW46IHByb2Nlc3MuZW52Lk1BSUxHVU5fRE9NQUlOLFxuICAgIGJhc2VVcmw6IHByb2Nlc3MuZW52LkJBU0VfVVJMID8gcHJvY2Vzcy5lbnYuQkFTRV9VUkwgOiAnaHR0cDovL2xvY2FsaG9zdDo1MDAwJ1xufVxuIiwiaW1wb3J0IHsgaXNFbWFpbCwgaXNFbXB0eSB9IGZyb20gJ3ZhbGlkYXRvcic7XG5pbXBvcnQgeyBoYXNoU3luYyB9IGZyb20gJ2JjcnlwdGpzJztcbmltcG9ydCB7UmVxdWVzdCwgUmVzcG9uc2V9IGZyb20gJy4uLy4uL3R5cGVzL2V4cHJlc3MnO1xuaW1wb3J0IFVzZXIsIHsgSVVzZXIgfSBmcm9tICcuLi9tb2RlbHMvVXNlcic7XG5jb25zdCBlbnYgPSByZXF1aXJlKCcuLi8uLi8uLi9lbnYnKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGxvZ2luOiAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChpc0VtcHR5KHJlcS5ib2R5LmVtYWlsIHx8ICcnKSB8fCBpc0VtcHR5KHJlcS5ib2R5LnBhc3N3b3JkIHx8ICcnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdQbGVhc2Ugc3VwcGx5IGFuIGVtYWlsIGFuZCBwYXNzd29yZCcgfSkuZW5kKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc0VtYWlsKHJlcS5ib2R5LmVtYWlsKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdOb3QgYSB2YWxpZCBlbWFpbCBhZGRyZXNzJyB9KS5lbmQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXEuYXV0aGVudGljYXRlKHJlcS5ib2R5LmVtYWlsLCByZXEuYm9keS5wYXNzd29yZCwgKHVzZXI6IGFueSB8IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgIGlmICghdXNlcilcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oeyBlcnJvcjogJ0ludmFsaWQgZW1haWwgb3IgcGFzc3dvcmQnIH0pLmVuZCgpO1xuICAgICAgICAgICAgcmVxLmlzc3VlTmV3VG9rZW4odXNlcik7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApXG4gICAgICAgICAgICAgICAgLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogdXNlci5yb2xlLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB1c2VyLm5hbWV9KS5lbmQoKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICByZWdpc3RlcjogKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAoaXNFbXB0eShyZXEuYm9keS5lbWFpbCB8fCAnJykgfHwgaXNFbXB0eShyZXEuYm9keS5wYXNzd29yZCB8fCAnJykpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnUGxlYXNlIHN1cHBseSBhbiBlbWFpbCBhbmQgcGFzc3dvcmQnIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNFbWFpbChyZXEuYm9keS5lbWFpbCkpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnTm90IGEgdmFsaWQgZW1haWwgYWRkcmVzcycgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFVzZXIuZmluZEJ5RW1haWwocmVxLmJvZHkuZW1haWwpLmNvdW50RG9jdW1lbnRzKCkuZXhlYygpLnRoZW4oKGNvdW50OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChjb3VudCAhPT0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe2Vycm9yOiAnRW1haWwgYWRkcmVzcyBpbiB1c2UnfSk7XG4gICAgICAgICAgICBsZXQgcGFzc3dvcmRIYXNoID0gaGFzaFN5bmMocmVxLmJvZHkucGFzc3dvcmQpO1xuICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyB0aGUgZmlyc3QgdXNlciBiZWluZyBjcmVhdGVkLCBhc2lnbiByb2xlIG9mIGFkbWluXG4gICAgICAgICAgICBVc2VyLmNvdW50RG9jdW1lbnRzKCkuZXhlYygpLnRoZW4oKGNvdW50OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcm9sZSA9ICd1c2VyJztcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPT09IDApXG4gICAgICAgICAgICAgICAgICAgIHJvbGUgPSAnYWRtaW4nO1xuICAgICAgICAgICAgICAgIGxldCB1c2VyID0gbmV3IFVzZXIoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IHJlcS5ib2R5LmVtYWlsLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRIYXNoLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiByb2xlLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbFZlcmlmaWVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB1c2VyLnNhdmUoKS50aGVuKCh1OiBJVXNlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWV9KTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7ZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZyB0cnlpbmcgdG8gY3JlYXRlIGEgbmV3IHVzZXInfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcblxuICAgIH0sXG4gICAgbG9nb3V0OiAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHJlcS5sb2dvdXQoKTtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKHtzdWNjZXNzOiB0cnVlLCBtZXNzYWdlOiAnbG9nZ2VkIG91dCd9KTtcbiAgICB9LFxuICAgIHZlcmlmeUVtYWlsOiAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgfVxufSIsImltcG9ydCB7UmVxdWVzdCwgUmVzcG9uc2V9IGZyb20gJy4uLy4uL3R5cGVzL2V4cHJlc3MnO1xuaW1wb3J0IENoYW5uZWwsIHtJQ2hhbm5lbH0gZnJvbSAnLi4vbW9kZWxzL0NoYW5uZWwnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgY2hhbm5lbHM6IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgLy8gSWYgbm8gY2hhbm5lbHMgZXhpc3QsIGNyZWF0ZSBhICdnZW5lcmFsJyBhbmQgJ3JhbmRvbScgY2hhbm5lbFxuICAgICAgICByZXR1cm4gQ2hhbm5lbC5jb3VudERvY3VtZW50cygpLmV4ZWMoKS50aGVuKChjb3VudDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBsZXQgcCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgQ2hhbm5lbC5jcmVhdGUoW3tuYW1lOiAnZ2VuZXJhbCd9LCB7bmFtZTogJ3JhbmRvbSd9XSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBDaGFubmVsLmZpbmQoKS5leGVjKCkudGhlbigoY2hhbm5lbHM6IElDaGFubmVsW10pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtjaGFubmVsczogY2hhbm5lbHN9KTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBmZXRjaCBjaGFubmVscycgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oe2Vycm9yOiAnU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIGNyZWF0ZSBkZWZhdWx0IGNoYW5uZWxzJ30pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLmNhdGNoKChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oe2Vycm9yOiAnU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgY291bnRpbmcgY2hhbm5lbHMnfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZGVsZXRlOiAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgIFxuICAgIH0sXG4gICAgY3JlYXRlOiAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG5cbiAgICB9XG59IiwiaW1wb3J0IHtSZXF1ZXN0LCBSZXNwb25zZX0gZnJvbSAnLi4vLi4vdHlwZXMvZXhwcmVzcyc7XG5pbXBvcnQgTWVzc2FnZSwge0lNZXNzYWdlfSBmcm9tICcuLi9tb2RlbHMvTWVzc2FnZSc7XG5leHBvcnQgZGVmYXVsdCB7XG4gICAgbWVzc2FnZXM6IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgcmV0dXJuIE1lc3NhZ2UuZmluZCh7Y2hhbm5lbDogcmVxLnBhcmFtcy5jaGFubmVsfSlcbiAgICAgICAgICAgIC5za2lwKHBhcnNlSW50KHJlcS5wYXJhbXMub2ZmZXN0KSlcbiAgICAgICAgICAgIC5zb3J0KHtfaWQ6IC0xfSlcbiAgICAgICAgICAgIC5saW1pdCgyMClcbiAgICAgICAgICAgIC5leGVjKCkudGhlbigobWVzc2FnZXM6IElNZXNzYWdlW10pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXM6IG1lc3NhZ2VzLm1hcCgobTogSU1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogbS50ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWQ6IG0uY3JlYXRlZEF0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJFbWFpbDogbS51c2VyRW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbDogbS5jaGFubmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pZDogbS5faWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICB9KS5yZXZlcnNlKClcbiAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSkuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnc29tZXRoaW5nIHdlbnQgd3JvbmcgdHJ5aW5nIHRvIGZldGNoIG1lc3NhZ2VzJyB9KTtcbiAgICAgICAgfSlcbiAgICB9XG59IiwiaW1wb3J0IHtpc0VtYWlsLCBpc0VtcHR5fSBmcm9tICd2YWxpZGF0b3InO1xuaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tICcuLi8uLi90eXBlcy9leHByZXNzJztcbmltcG9ydCBVc2VyLCB7IElVc2VyLCBJVXNlck1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL1VzZXInO1xuaW1wb3J0IHtjb21wYXJlU3luYywgaGFzaFN5bmN9IGZyb20gJ2JjcnlwdGpzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIHVzZXI6IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgcmVzLnNlbmQocmVxLnVzZXIpO1xuICAgIH0sXG4gICAgdXNlcnM6IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgcmV0dXJuIFVzZXIuZmluZCh7fSkuc2VsZWN0KCduYW1lIGVtYWlsIHJvbGUnKS50aGVuKCh1c2VyczogSVVzZXJbXSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCB1c2VyczogdXNlcnN9KTtcbiAgICAgICAgfSkuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7ZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSByZXRyaWV2aW5nIHVzZXJzJ30pO1xuICAgICAgICB9KVxuICAgIH0sXG4gICAgdXNlckJ5RW1haWw6IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYoIWlzRW1haWwocmVxLnBhcmFtcy51c2VyKSlcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7ZXJyb3I6ICdQbGVhc2Ugc3VwcGx5IGEgdmFsaWQgZW1haWwnfSk7XG5cbiAgICAgICAgcmV0dXJuIFVzZXIuZmluZEJ5RW1haWwocmVxLnBhcmFtcy51c2VyKS5leGVjKCkudGhlbigodXNlcjogSVVzZXIpID0+IHtcbiAgICAgICAgICAgIGlmICh1c2VyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBfaWQ6IHVzZXIuX2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdXNlci5uYW1lIHx8ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogdXNlci5yb2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZDogdXNlci5jcmVhdGVkQXRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtlcnJvcjogJ05vIHVzZXIgZm91bmQgd2l0aCB0aGF0IGVtYWlsJ30pO1xuICAgICAgICAgICAgXG4gICAgICAgIH0pLmNhdGNoKChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oe2Vycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcgdHJ5aW5nIHRvIGZpbmQgdGhlIHVzZXInfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgdXBkYXRlRW1haWw6IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYoIWlzRW1haWwocmVxLmJvZHkuZW1haWwpKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdOb3QgYSB2YWxpZCBlbWFpbCcgfSk7XG4gICAgICAgIHJldHVybiBVc2VyLmNvdW50RG9jdW1lbnRzKHtlbWFpbDogcmVxLmJvZHkuZW1haWx9KS5leGVjKCkudGhlbigoY291bnQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGNvdW50ICE9PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnRW1haWwgYWRkcmVzcyBhbHJlYWR5IGluIHVzZScgfSk7XG4gICAgICAgICAgICByZXR1cm4gVXNlci5maW5kQnlFbWFpbChyZXEudXNlci5lbWFpbCkuZXhlYygpLnRoZW4oKHVzZXI6IElVc2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgdXNlci5lbWFpbCA9IHJlcS5ib2R5LmVtYWlsO1xuICAgICAgICAgICAgICAgIHVzZXIuc2F2ZSgpO1xuICAgICAgICAgICAgICAgIHJlcS5pc3N1ZU5ld1Rva2VuKE9iamVjdC5hc3NpZ24oe30sIHJlcS51c2VyLCB7ZW1haWw6IHJlcS5ib2R5LmVtYWlsfSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nIHRyeWluZyB0byBmZXRjaCB0aGUgdXNlcicgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICB1cGRhdGVOYW1lOiAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHJldHVybiBVc2VyLmZpbmRCeUVtYWlsKHJlcS51c2VyLmVtYWlsKVxuICAgICAgICAgICAgLmV4ZWMoKS50aGVuKCh1c2VyOiBJVXNlcikgPT4ge1xuICAgICAgICAgICAgICAgIHVzZXIubmFtZSA9IHJlcS5ib2R5Lm5hbWU7XG4gICAgICAgICAgICAgICAgdXNlci5zYXZlKCk7XG4gICAgICAgICAgICAgICAgcmVxLmlzc3VlTmV3VG9rZW4oT2JqZWN0LmFzc2lnbih7fSwgcmVxLnVzZXIsIHsgbmFtZTogcmVxLmJvZHkubmFtZSB9KSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlfSk7XG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oe2Vycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcgdHJ5aW5nIHRvIHVwZGF0ZSB0aGUgdXNlcid9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICB1cGRhdGVQYXNzd29yZDogKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAoaXNFbXB0eShyZXEuYm9keS5uZXdQYXNzKSB8fCBpc0VtcHR5KHJlcS5ib2R5Lm9sZFBhc3MpKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdNdXN0IHN1cHBseSB0aGUgY3VycmVudCBhbmQgbmV3IHBhc3N3b3JkJyB9KTtcbiAgICAgICAgcmV0dXJuIFVzZXIuZmluZEJ5RW1haWwocmVxLnVzZXIuZW1haWwpLmV4ZWMoKS50aGVuKCh1c2VyOiBJVXNlcikgPT4ge1xuICAgICAgICAgICAgaWYgKCFjb21wYXJlU3luYyhyZXEuYm9keS5vbGRQYXNzLCB1c2VyLnBhc3N3b3JkKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe2Vycm9yOiAnQ3VycmVudCBwYXNzd29yZCBpcyBpbmNvcnJlY3QnfSk7XG4gICAgICAgICAgICB1c2VyLnBhc3N3b3JkID0gaGFzaFN5bmMocmVxLmJvZHkubmV3UGFzcyk7XG4gICAgICAgICAgICB1c2VyLnNhdmUoKTtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZX0pO1xuICAgICAgICB9KVxuICAgIH0sXG4gICAgcmVzZXRQYXNzd29yZDogKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oe2Vycm9yOiAnTm90IGltcGxlbWVudGVkJ30pO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogUE9TVCAvYXBpL3YxL3VzZXIvY3JlYXRlXG4gICAgICogcmVxLmJvZHkuZW1haWw6IHN0cmluZ1xuICAgICAqIHJlcS5ib2R5Lm5hbWU/OiBzdHJpbmcsXG4gICAgICogcmVxLmJvZHkucm9sZTogc3RyaW5nXG4gICAgICovXG4gICAgY3JlYXRlVXNlcjogKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICBpZihpc0VtcHR5KHJlcS5ib2R5LmVtYWlsKSB8fCAhaXNFbWFpbChyZXEuYm9keS5lbWFpbCkgfHxcbiAgICAgICAgICAgaXNFbXB0eShyZXEuYm9keS5yb2xlKSB8fCAocmVxLmJvZHkucm9sZSAhPT0gJ3VzZXInICYmIHJlcS5ib2R5LnJvbGUgIT09ICdhZG1pbicpKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdNdXN0IHN1cHBseSB2YWxpZCBlbWFpbCBhbmQgcm9sZSd9KTtcbiAgICAgICAgcmV0dXJuIFVzZXIuZmluZEJ5RW1haWwocmVxLmJvZHkuZW1haWwpLmNvdW50RG9jdW1lbnRzKChlcnI6IGFueSwgYzogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignU29tZXRoaW5nIHdlbnQgd3JvbmcgdHJ5aW5nIHRvIGNvdW50IHVzZXJzIHdpdGggZW1haWwgJyArIHJlcS5ib2R5LmVtYWlsLCBlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7ZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZyd9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjICE9PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7ZXJyb3I6ICdFbWFpbCBhZGRyZXNzIGluIHVzZSd9KTtcbiAgICAgICAgICAgIGxldCB1ID0gbmV3IFVzZXIoe1xuICAgICAgICAgICAgICAgIGVtYWlsOiByZXEuYm9keS5lbWFpbCxcbiAgICAgICAgICAgICAgICBuYW1lOiByZXEuYm9keS5uYW1lIHx8ICcnLFxuICAgICAgICAgICAgICAgIHJvbGU6IHJlcS5ib2R5LnJvbGUsXG4gICAgICAgICAgICAgICAgLy8gQHRvZG8gc2VuZCBwYXNzd29yZCByZXNldCBsaW5rIHRvIG5ldyB1c2VyXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICd0ZW1wJyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gdS5zYXZlKChlcnI6IGFueSwgdTogSVVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHRyeWluZyB0byBzYXZlIHVzZXInLCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KVxuICAgIH0sXG4gICAgLyoqXG4gICAgICogUFVUIC9hcGkvdjEvdXNlci91cGRhdGVcbiAgICAgKiBAcGFyYW0gcmVxLmJvZHkuZW1haWw6IHN0cmluZ1xuICAgICAqIEBwYXJhbSByZXEuYm9keS51c2VyOiB7XG4gICAgICogIGVtYWlsPzogc3RyaW5nLFxuICAgICAqICBuYW1lPzogc3RyaW5nLFxuICAgICAqICByb2xlPzogc3RyaW5nLFxuICAgICAqIH1cbiAgICAgKi9cbiAgICBlZGl0VXNlcjogKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAoIXJlcS5ib2R5LmVtYWlsIHx8ICFpc0VtYWlsKHJlcS5ib2R5LmVtYWlsKSlcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7ZXJyb3I6ICdQbGVhc2Ugc3VwcGx5IGEgdmFsaWQgZW1haWwnfSk7XG4gICAgICAgIGlmIChyZXEuYm9keS51c2VyLmVtYWlsICYmICFpc0VtYWlsKHJlcS5ib2R5LnVzZXIuZW1haWwpKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdQbGVhc2Ugc3VwcGx5IGEgdmFsaWQgZW1haWwnIH0pO1xuICAgICAgICBpZiAocmVxLmJvZHkudXNlci5yb2xlICYmICFpc0VtcHR5KHJlcS5ib2R5LnVzZXIucm9sZSkgJiYgKHJlcS5ib2R5LnVzZXIucm9sZSAhPT0gJ3VzZXInICYmIHJlcS5ib2R5LnVzZXIucm9sZSAhPT0gJ2FkbWluJykpXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe2Vycm9yOiAnSW52YWxpZCByb2xlJ30pO1xuICAgICAgICByZXR1cm4gVXNlci5maW5kQnlFbWFpbChyZXEuYm9keS5lbWFpbCkuZXhlYygoZXJyOiBhbnksIHVzZXI6IElVc2VyKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1NvbWV0aGluZyB3ZW50IHdyb25nJywgZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oe2Vycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe2Vycm9yOiAnVXNlciBkb2VzIG5vdCBleGlzdCd9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXEuYm9keS51c2VyLmVtYWlsKVxuICAgICAgICAgICAgICAgIHVzZXIuZW1haWwgPSByZXEuYm9keS51c2VyLmVtYWlsO1xuICAgICAgICAgICAgaWYgKHJlcS5ib2R5LnVzZXIubmFtZSlcbiAgICAgICAgICAgICAgICB1c2VyLm5hbWUgPSByZXEuYm9keS51c2VyLm5hbWU7XG4gICAgICAgICAgICBpZiAocmVxLmJvZHkudXNlci5yb2xlKVxuICAgICAgICAgICAgICAgIHVzZXIucm9sZSA9IHJlcS5ib2R5LnVzZXIucm9sZTtcbiAgICAgICAgICAgIHJldHVybiB1c2VyLnNhdmUoKGVycjogYW55LCB1c2VyOiBJVXNlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nJ30pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWV9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGRlbGV0ZVVzZXI6IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcblxuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihyZXE6IGFueSwgcmVzOiBhbnksIG5leHQ6IEZ1bmN0aW9uKSB7XG4gICAgaWYgKHJlcS51c2VyICYmIHJlcS51c2VyLnJvbGUgPT09ICdhZG1pbicpIHtcbiAgICAgICAgcmV0dXJuIG5leHQoKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5qc29uKHsgZXJyb3I6ICdOb3QgYXV0aG9yaXplZCBhcyBhZG1pbicgfSk7XG59IiwiaW1wb3J0IHsgdmVyaWZ5IH0gZnJvbSAnanNvbndlYnRva2VuJztcbmltcG9ydCB7IFRva2VuIH0gZnJvbSAnLi4vLi4vdHlwZXMvand0JztcbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnLi4vLi4vdHlwZXMvZXhwcmVzcyc7XG5jb25zdCBlbnYgPSByZXF1aXJlKCcuLi8uLi8uLi9lbnYnKTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogRnVuY3Rpb24pIHtcbiAgICB2YXIgdG9rZW4gPSByZXEuc2Vzc2lvbi50b2tlbiB8fCByZXEuaGVhZGVyc1sneC1hY2Nlc3MtdG9rZW4nXTtcbiAgICBpZiAoIXRva2VuKVxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oeyBlcnJvcjogJ05vdCBhdXRob3JpemVkJyB9KTtcblxuICAgIHZlcmlmeSh0b2tlbiwgZW52LnNlY3JldCwgKGVycjogRXJyb3IsIGRlY29kZWQ6IFRva2VuKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHJldHVybiByZXMuc3RhdHVzKDQwMSkuc2VuZCh7IGVycm9yOiAnTm90IGF1dGhvcml6ZWQnIH0pO1xuICAgICAgICByZXEudXNlciA9IGRlY29kZWQ7XG4gICAgICAgIHJldHVybiBuZXh0KCk7XG4gICAgfSk7ICAgIFxufSIsImltcG9ydCB7U2NoZW1hLCBEb2N1bWVudCwgTW9kZWwsIG1vZGVsfSBmcm9tICdtb25nb29zZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNoYW5uZWwgZXh0ZW5kcyBEb2N1bWVudCB7XG4gICAgbmFtZTogc3RyaW5nLFxuICAgIGNyZWF0ZWRBdDogRGF0ZSxcbiAgICB1cGRhdGVkQXQ6IERhdGUsXG59XG5cbmNvbnN0IGNoYW5uZWxTY2hlbWE6IFNjaGVtYSA9IG5ldyBTY2hlbWEoe1xuICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgbG93ZXJjYXNlOiB0cnVlLFxuICAgIH0sXG59LCB7XG4gICAgdGltZXN0YW1wczogdHJ1ZVxufSk7XG5cbmNvbnN0IENoYW5uZWw6IE1vZGVsPElDaGFubmVsPiA9IG1vZGVsKCdDaGFubmVsJywgY2hhbm5lbFNjaGVtYSk7XG5leHBvcnQgZGVmYXVsdCBDaGFubmVsOyIsImltcG9ydCB7U2NoZW1hLCBtb2RlbCwgRG9jdW1lbnQsIE1vZGVsfSBmcm9tICdtb25nb29zZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1lc3NhZ2UgZXh0ZW5kcyBEb2N1bWVudCB7XG4gICAgY2hhbm5lbDogc3RyaW5nLFxuICAgIHRleHQ6IHN0cmluZyxcbiAgICB1c2VyRW1haWw6IHN0cmluZyxcbiAgICBjcmVhdGVkQXQ6IERhdGUsXG4gICAgdXBkYXRlZEF0OiBEYXRlLFxufVxuXG5jb25zdCBtZXNzYWdlU2NoZW1hOiBTY2hlbWEgPSBuZXcgU2NoZW1hKHtcbiAgICBjaGFubmVsOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIC8vIHNob3VsZCB2YWxpZGF0ZSB0byBtYWtlIHN1cmUgY2hhbm5lbCBhbHJlYWR5IGV4aXN0c1xuICAgIH0sXG4gICAgdGV4dDoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIH0sXG4gICAgdXNlckVtYWlsOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIGxvd2VyY2FzZTogdHJ1ZSxcbiAgICAgICAgLy8gc2hvdWxkIHZhbGlkYXRlIHRvIGNvbmZpcm0gdGhhdCB1c2VyIGV4aXN0c1xuICAgIH1cbn0sIHtcbiAgICB0aW1lc3RhbXBzOiB0cnVlXG59KTtcblxuY29uc3QgTWVzc2FnZTogTW9kZWw8SU1lc3NhZ2U+ID0gbW9kZWwoJ01lc3NhZ2UnLCBtZXNzYWdlU2NoZW1hKTtcbmV4cG9ydCBkZWZhdWx0IE1lc3NhZ2U7IiwiaW1wb3J0IHtTY2hlbWEsIERvY3VtZW50LCBtb2RlbCwgTW9kZWwsIEVycm9yLCBEb2N1bWVudFF1ZXJ5fSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQge3RvTG93ZXJ9IGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVVzZXIgZXh0ZW5kcyBEb2N1bWVudCB7XG4gICAgbmFtZT86IHN0cmluZyxcbiAgICBlbWFpbDogc3RyaW5nLFxuICAgIGNyZWF0ZWRBdDogRGF0ZSxcbiAgICB1cGRhdGVkQXQ6IERhdGUsXG4gICAgcGFzc3dvcmQ6IHN0cmluZyxcbiAgICByb2xlOiAnYWRtaW4nIHwgJ3VzZXInLFxuXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElVc2VyTW9kZWwgZXh0ZW5kcyBNb2RlbDxJVXNlcj4ge1xuICAgIGZpbmRCeUVtYWlsOiAoZW1haWw6IHN0cmluZykgPT4gRG9jdW1lbnRRdWVyeTxJVXNlciwgSVVzZXI+XG59XG5cbmNvbnN0IHVzZXJTY2hlbWE6IFNjaGVtYSA9IG5ldyBTY2hlbWEoe1xuICAgIG5hbWU6IFN0cmluZyxcbiAgICBlbWFpbDoge1xuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICBsb3dlcmNhc2U6IHRydWVcbiAgICB9LFxuICAgIHBhc3N3b3JkOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIHJvbGU6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgbG93ZXJjYXNlOiB0cnVlLFxuICAgICAgICBlbnVtOiBbJ2FkbWluJywgJ3VzZXInXVxuICAgIH0sXG59LCB7XG4gICAgdGltZXN0YW1wczogdHJ1ZVxufSk7XG5cbnVzZXJTY2hlbWEuc3RhdGljcy5maW5kQnlFbWFpbCA9IGZ1bmN0aW9uIChlbWFpbDogc3RyaW5nKTogRG9jdW1lbnRRdWVyeTxJVXNlciwgSVVzZXI+IHtcbiAgICByZXR1cm4gdGhpcy5maW5kT25lKHtlbWFpbDogZW1haWx9KTtcbn1cblxuY29uc3QgVXNlcjogSVVzZXJNb2RlbCA9IG1vZGVsPElVc2VyLCBJVXNlck1vZGVsPignVXNlcicsIHVzZXJTY2hlbWEpO1xuZXhwb3J0IGRlZmF1bHQgVXNlcjsiLCJpbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQXBwLCBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJy4uL3R5cGVzL2V4cHJlc3MnO1xuaW1wb3J0IGF1dGhvcml6ZWQgZnJvbSAnLi9taWRkbGV3YXJlL2F1dGhvcml6ZWQnO1xuaW1wb3J0IGFkbWluIGZyb20gJy4vbWlkZGxld2FyZS9hZG1pbic7XG5pbXBvcnQgYXV0aENvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9hdXRoQ29udHJvbGxlcic7XG5pbXBvcnQgdXNlckNvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy91c2VyQ29udHJvbGxlcic7XG5pbXBvcnQgbWVzc2FnZUNvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9tZXNzYWdlQ29udHJvbGxlcic7XG5pbXBvcnQgY2hhbm5lbENvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9jaGFubmVsQ29udHJvbGxlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGFwcDogQXBwKSB7XG5cbiAgICAvKiBTdGF0aWMgUm91dGVzICovXG4gICAgYXBwLmdldCgnLycsIGZ1bmN0aW9uIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5yZW5kZXIoXG4gICAgICAgICAgICBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vZGlzdC9wdWJsaWMvaW5kZXguaHRtbCcpLFxuICAgICAgICAgICAgeyBjc3JmVG9rZW46IHJlcS5jc3JmVG9rZW4oKSB9XG4gICAgICAgICk7XG4gICAgfSk7XG4gICAgLyogV2lkZ2V0IHJlbmRlcmVkIGluc2lkZSBpZnJhbWUgdmlhIHdpZGdldC1lbWJlZCBzY3JpcHQgKi9cbiAgICBhcHAuZ2V0KCcvd2lkZ2V0JywgZnVuY3Rpb24gKHJlcTogYW55LCByZXM6IGFueSkge1xuICAgICAgICByZXR1cm4gcmVzLnJlbmRlcihcbiAgICAgICAgICAgIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi8uLi9kaXN0L3B1YmxpYy93aWRnZXQvaW5kZXguaHRtbCcpXG4gICAgICAgICk7XG4gICAgfSk7XG4gICAgLyogUGFnZSBkZW1vaW5nIGVtYmVkZGVkIHdpZGdldCAqL1xuICAgIGFwcC5nZXQoJy93aWRnZXQvZGVtbycsIGZ1bmN0aW9uIChyZXE6IGFueSwgcmVzOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5yZW5kZXIoXG4gICAgICAgICAgICBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vLi4vZGlzdC9wdWJsaWMvd2lkZ2V0L2RlbW8uaHRtbCcpXG4gICAgICAgICk7XG4gICAgfSk7XG4gICAgXG4gICAgLyogQVBJIFJvdXRlcyAqL1xuICAgIFxuICAgIGFwcC5wb3N0KCcvYXBpL3YxL2xvZ2luJywgYXV0aENvbnRyb2xsZXIubG9naW4pO1xuICAgIGFwcC5wb3N0KCcvYXBpL3YxL3JlZ2lzdGVyJywgYXV0aENvbnRyb2xsZXIucmVnaXN0ZXIpO1xuICAgIGFwcC5nZXQoJy9hcGkvdjEvbG9nb3V0JywgYXV0aENvbnRyb2xsZXIubG9nb3V0KTtcbiAgICBhcHAuZ2V0KCcvYXBpL3YxL3ZlcmlmeUVtYWlsLzppZCcsIGF1dGhDb250cm9sbGVyLnZlcmlmeUVtYWlsKTtcblxuICAgIGFwcC51c2UoJy9hcGkvdjEvdXNlcionLCBhdXRob3JpemVkKTtcbiAgICBhcHAuZ2V0KCcvYXBpL3YxL3VzZXInLCB1c2VyQ29udHJvbGxlci51c2VyKTtcbiAgICBhcHAuZ2V0KCcvYXBpL3YxL3VzZXJzJywgdXNlckNvbnRyb2xsZXIudXNlcnMpXG4gICAgYXBwLmdldCgnL2FwaS92MS91c2VyLzp1c2VyJywgdXNlckNvbnRyb2xsZXIudXNlckJ5RW1haWwpO1xuICAgIGFwcC5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL2VtYWlsJywgdXNlckNvbnRyb2xsZXIudXBkYXRlRW1haWwpO1xuICAgIGFwcC5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL25hbWUnLCB1c2VyQ29udHJvbGxlci51cGRhdGVOYW1lKTtcbiAgICBhcHAucG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9wYXNzd29yZCcsIHVzZXJDb250cm9sbGVyLnVwZGF0ZVBhc3N3b3JkKTtcbiAgICBhcHAucG9zdCgnL2FwaS92MS91c2VyL3Jlc2V0X3Bhc3N3b3JkJywgdXNlckNvbnRyb2xsZXIucmVzZXRQYXNzd29yZCk7XG4gICAgYXBwLnBvc3QoJy9hcGkvdjEvdXNlci9jcmVhdGUnLCBhZG1pbiwgdXNlckNvbnRyb2xsZXIuY3JlYXRlVXNlcik7XG4gICAgYXBwLnB1dCgnL2FwaS92MS91c2VyL3VwZGF0ZScsIGFkbWluLCB1c2VyQ29udHJvbGxlci5lZGl0VXNlcik7XG4gICAgYXBwLnBvc3QoJy9hcGkvdjEvdXNlci9kZWxldGUnLCBhZG1pbiwgdXNlckNvbnRyb2xsZXIuZGVsZXRlVXNlcik7XG5cbiAgICBhcHAudXNlKCcvYXBpL3YxL21lc3NhZ2UqJywgYXV0aG9yaXplZCk7XG4gICAgYXBwLmdldCgnL2FwaS92MS9tZXNzYWdlcy86Y2hhbm5lbC86b2Zmc2V0JywgbWVzc2FnZUNvbnRyb2xsZXIubWVzc2FnZXMpO1xuXG4gICAgYXBwLnVzZSgnL2FwaS92MS9jaGFubmVsJywgYXV0aG9yaXplZCk7XG4gICAgYXBwLmdldCgnL2FwaS92MS9jaGFubmVscycsIGNoYW5uZWxDb250cm9sbGVyLmNoYW5uZWxzKTtcbiAgICBhcHAucG9zdCgnL2FwaS92MS9jaGFubmVscy9kZWxldGUnLCBhZG1pbiwgY2hhbm5lbENvbnRyb2xsZXIuZGVsZXRlKTtcbiAgICBhcHAucG9zdCgnL2FwaS92MS9jaGFubmVscy9jcmVhdGUnLCBhZG1pbiwgY2hhbm5lbENvbnRyb2xsZXIuY3JlYXRlKTtcblxuICAgIC8qIERpc3BsYXkgaW5kZXguaHRtbCBpZiB1bmtub3duIHBhdGgsIGFuZCBsZXQgUmVhY3QtUm91dGVyIGhhbmRsZSB0aGUgNDA0ICovXG4gICAgYXBwLmdldCgnKicsIGZ1bmN0aW9uIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5yZW5kZXIoXG4gICAgICAgICAgICBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vZGlzdC9wdWJsaWMvaW5kZXguaHRtbCcpLFxuICAgICAgICAgICAgeyBjc3JmVG9rZW46IHJlcS5jc3JmVG9rZW4oKSB9XG4gICAgICAgICk7XG4gICAgfSk7XG59IiwiLy9pbXBvcnQgTW9kZWxzIGZyb20gJy4vbW9kZWxzL2luZGV4LnRzJztcblxuaW1wb3J0ICogYXMgaHR0cCBmcm9tICdodHRwJztcbmltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgc29ja2V0aW8gZnJvbSAnc29ja2V0LmlvJztcbmltcG9ydCAqIGFzIG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCAqIGFzIGNzcmYgZnJvbSAnY3N1cmYnO1xuaW1wb3J0ICogYXMgY29va2llUGFyc2VyIGZyb20gJ2Nvb2tpZS1wYXJzZXInO1xuaW1wb3J0ICogYXMgc2Vzc2lvbiBmcm9tICdleHByZXNzLXNlc3Npb24nO1xuaW1wb3J0ICogYXMgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5pbXBvcnQgKiBhcyBiY3J5cHQgZnJvbSAnYmNyeXB0anMnO1xuaW1wb3J0ICogYXMgaGVsbWV0IGZyb20gJ2hlbG1ldCc7XG5pbXBvcnQgKiBhcyBtb3JnYW4gZnJvbSAnbW9yZ2FuJztcbmltcG9ydCAqIGFzIGNvbXByZXNzaW9uIGZyb20gJ2NvbXByZXNzaW9uJztcbmltcG9ydCB7IHNpZ24gfSBmcm9tICdqc29ud2VidG9rZW4nO1xuY29uc3QgbXVzdGFjaGVFeHByZXNzID0gcmVxdWlyZSgnbXVzdGFjaGUtZXhwcmVzcycpO1xuY29uc3QgTW9uZ29TdG9yZSA9IHJlcXVpcmUoJ2Nvbm5lY3QtbW9uZ28nKShzZXNzaW9uKTtcblxuaW1wb3J0IFJvdXRlcyBmcm9tICcuL3JvdXRlcyc7XG5pbXBvcnQgd2Vic29ja2V0IGZyb20gJy4vc29ja2V0LmlvL2luZGV4JztcbmltcG9ydCB7IEFwcCwgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tICcuLi90eXBlcy9leHByZXNzJztcbmltcG9ydCBVc2VyLCB7IElVc2VyIH0gZnJvbSAnLi9tb2RlbHMvVXNlcic7XG5jb25zdCBlbnYgPSByZXF1aXJlKCcuLi8uLi9lbnYnKTtcblxuY29uc3QgYXBwOiBBcHAgPSBleHByZXNzKCk7XG5jb25zdCBwb3J0OiBzdHJpbmcgfCBudW1iZXIgPSBlbnYucG9ydDtcbmxldCBzZXJ2ZXI6IGh0dHAuU2VydmVyO1xubGV0IHNvY2tldFNlcnZlcjogc29ja2V0aW8uU2VydmVyO1xuXG5hcHAuZW5naW5lKCdodG1sJywgbXVzdGFjaGVFeHByZXNzKCkpO1xuYXBwLnNldCgndmlldyBlbmdpbmUnLCAnaHRtbCcpO1xuLy9hcHAudXNlKG1vcmdhbignY29tYmluZWQnKSk7XG5hcHAudXNlKGNvbXByZXNzaW9uKCkpO1xuXG5jb25zdCBzZXNzaW9uTWlkZGxld2FyZSA9IHNlc3Npb24oe1xuICAgIHNlY3JldDogZW52LnNlY3JldCxcbiAgICBjb29raWU6IHtcbiAgICAgICAgbWF4QWdlOiAyNCAqIDYwICogNjAgKiAxMDAwLCAvLyAyNCBob3Vyc1xuICAgICAgICBzYW1lU2l0ZTogdHJ1ZSxcbiAgICAgICAgc2VjdXJlOiBlbnYucHJvZHVjdGlvbixcbiAgICAgICAgaHR0cE9ubHk6IHRydWVcbiAgICB9LFxuICAgIHNhdmVVbmluaXRpYWxpemVkOiB0cnVlLFxuICAgIHJlc2F2ZTogZmFsc2UsXG4gICAgc3RvcmU6IG5ldyBNb25nb1N0b3JlKHtcbiAgICAgICAgbW9uZ29vc2VDb25uZWN0aW9uOiBtb25nb29zZS5jb25uZWN0aW9uXG4gICAgfSlcbn0pO1xuXG5jb25zdCBjc3JmTWlkZGxld2FyZSA9IGNzcmYoe1xuICAgIGNvb2tpZToge1xuICAgICAgICBtYXhBZ2U6IDI0ICogNjAgKiA2MCAqIDEwMDAsIC8vIDI0IGhvdXJzXG4gICAgICAgIHNhbWVTaXRlOiB0cnVlLFxuICAgICAgICBzZWN1cmU6IGVudi5wcm9kdWN0aW9uLFxuICAgICAgICBodHRwT25seTogdHJ1ZSxcbiAgICAgICAga2V5OiAnX2NzcmYnXG4gICAgfVxufSlcblxubW9uZ29vc2UuY29ubmVjdChlbnYudXNlVGVzdERiID8gZW52Lm1vbmdvZGJUZXN0Q29ubmVjdGlvblVyaSA6IGVudi5tb25nb2RiQ29ubmVjdGlvblVyaSwgeyB1c2VOZXdVcmxQYXJzZXI6IHRydWUgfSk7XG5tb25nb29zZS5jb25uZWN0aW9uLm9uKCdlcnJvcicsIGZ1bmN0aW9uKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ01vbmdvb3NlIGNvbm5lY3Rpb24gZXJyb3InLCBlcnIpO1xufSk7XG5wcm9jZXNzLm9uKCdTSUdJTlQnLCBmdW5jdGlvbiAoKSB7XG4gICAgbW9uZ29vc2UuY29ubmVjdGlvbi5jbG9zZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdNb25nb29zZSBkZWZhdWx0IGNvbm5lY3Rpb24gZGlzY29ubmVjdGVkIHRocm91Z2ggYXBwIHRlcm1pbmF0aW9uJyk7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICB9KTtcbn0pOyBcblxuYXBwLnVzZShzZXNzaW9uTWlkZGxld2FyZSk7XG5hcHAudXNlKGNvb2tpZVBhcnNlcihlbnYuc2VjcmV0KSk7XG5cbmlmKGVudi5kaXNhYmxlQ3NyZikge1xuICAgIGNvbnNvbGUubG9nKCdDU1JGIGRpc2FibGVkJyk7XG4gICAgYXBwLnVzZSgocmVxLCByZXMsIG5leHQpID0+IHsgXG4gICAgICAgIHJlcS5jc3JmVG9rZW4gPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnJyB9XG4gICAgICAgIHJldHVybiBuZXh0KCk7XG4gICAgfSk7XG59IGVsc2Uge1xuICAgIGFwcC51c2UoY3NyZk1pZGRsZXdhcmUpO1xufVxuLy8gYWRkIERCIHRvIGV2ZXJ5IGV4cHJlc3MgcmVxdWVzdFxubGV0IGRiOiBtb25nb29zZS5Db25uZWN0aW9uID0gbW9uZ29vc2UuY29ubmVjdGlvbjtcbmFwcC51c2UoKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogRnVuY3Rpb24pID0+IHtcbiAgICByZXEuZGIgPSBkYjtcbiAgICByZXR1cm4gbmV4dCgpO1xufSlcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpOyAvLyBzdXBwb3J0IGpzb24gZW5jb2RlZCBib2RpZXNcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IHRydWUgfSkpO1xuLy9hcHAudXNlKGNvcnMoKSk7XG5cblxuYXBwLnVzZShoZWxtZXQoKSk7XG4vKiBTZXJ2ZSBzdGF0aWMgZmlsZXMgZnJvbSBkaXN0L3B1YmxpYyAqL1xuYXBwLnVzZShleHByZXNzLnN0YXRpYyhwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vZGlzdC9wdWJsaWMvJykpKTtcblxuYXBwLnVzZSgnL2FwaScsIGZ1bmN0aW9uIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IEZ1bmN0aW9uKSB7XG4gICAgLy9yZXMuc2V0SGVhZGVyKCduZXctY3NyZi10b2tlbicsIHJlcS5jc3JmVG9rZW4oKSlcbiAgICByZXR1cm4gbmV4dCgpO1xufSk7XG5hcHAudXNlKChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IEZ1bmN0aW9uKSA9PiB7XG4gICAgcmVxLmF1dGhlbnRpY2F0ZSA9IChlbWFpbDogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmU6ICh1c2VyOiBib29sZWFuIHwgSVVzZXIsIGVycjogKG51bGwgfCBFcnJvcikpID0+IHZvaWQpID0+IHtcbiAgICAgICAgVXNlci5maW5kQnlFbWFpbChlbWFpbCkudGhlbigodXNlcjogSVVzZXIpID0+IHtcbiAgICAgICAgICAgIGlmICh1c2VyID09PSBudWxsKSByZXR1cm4gZG9uZShmYWxzZSwgbnVsbCk7XG4gICAgICAgICAgICBpZiAoIWJjcnlwdC5jb21wYXJlU3luYyhwYXNzd29yZCwgdXNlci5wYXNzd29yZCkpIHJldHVybiBkb25lKGZhbHNlLCBuZXcgRXJyb3IoJ0ludmFsaWQgcGFzc3dvcmQnKSk7XG4gICAgICAgICAgICBsZXQgdXNlckRldGFpbHM6IGFueSA9IHtcbiAgICAgICAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXG4gICAgICAgICAgICAgICAgcm9sZTogdXNlci5yb2xlLFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRvbmUodXNlckRldGFpbHMsIG51bGwpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgZG9uZShmYWxzZSwgZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlcS5sb2dvdXQgPSAoKSA9PiB7XG4gICAgICAgIHJlcS5zZXNzaW9uLnRva2VuID0gbnVsbDtcbiAgICB9XG4gICAgcmVxLmlzc3VlTmV3VG9rZW4gPSAodXNlcjogSVVzZXIpID0+IHtcbiAgICAgICAgbGV0IHRva2VuOiBzdHJpbmcgPSBzaWduKHtcbiAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICAgIHJvbGU6IHVzZXIucm9sZSxcbiAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsXG4gICAgICAgIH0sIGVudi5zZWNyZXQsIHtcbiAgICAgICAgICAgIGV4cGlyZXNJbjogODY0MDAgLy8gZXhwaXJlcyBpbiAyNCBob3Vyc1xuICAgICAgICB9KTtcbiAgICAgICAgcmVzLnNldEhlYWRlcigneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbik7XG4gICAgICAgIHJlcS5zZXNzaW9uLnRva2VuID0gdG9rZW47XG4gICAgfVxuICAgIG5leHQoKTtcbn0pO1xuXG5Sb3V0ZXMoYXBwKTtcbnNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKGFwcCk7XG5zZXJ2ZXIub24oJ2Vycm9yJywgKGVycjogRXJyb3IpID0+IHtcbiAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgc2VydmVyLmNsb3NlKCk7XG59KVxuXG5pZiAoIWVudi5kaXNhYmxlQXV0b1N0YXJ0KSB7XG4gICAgc29ja2V0U2VydmVyID0gd2Vic29ja2V0KHNlcnZlciwgZGIpO1xuICAgIG1vbmdvb3NlLmNvbm5lY3Rpb24ub24oJ2Nvbm5lY3RlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0Nvbm5lY3RlZCB0byBNb25nb0RCIHZpYSBNb25nb29zZScpO1xuICAgICAgICBzZXJ2ZXIubGlzdGVuKHBvcnQsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBMaXN0ZW5pbmcgb24gcG9ydCAke3BvcnR9IWApO1xuICAgICAgICAgICAgYXBwLmVtaXQoJ3NlcnZlciBzdGFydGVkJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzZXJ2ZXI7XG5leHBvcnQgY29uc3QgY29ubiA9IG1vbmdvb3NlLmNvbm5lY3Rpb247XG5leHBvcnQgeyBhcHAsIHNvY2tldFNlcnZlciB9OyIsImltcG9ydCAqIGFzIHNvY2tldGlvIGZyb20gJ3NvY2tldC5pbyc7XG5pbXBvcnQgeyBTZXJ2ZXIgfSBmcm9tICdodHRwJztcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQge2F1dGhvcml6ZSBhcyBhdXRob3JpemVKd3R9IGZyb20gJ3NvY2tldGlvLWp3dCc7XG5pbXBvcnQgTWVzc2FnZSwgeyBJTWVzc2FnZSB9IGZyb20gJy4uL21vZGVscy9NZXNzYWdlJztcbmltcG9ydCB7IFRva2VuIH0gZnJvbSAnLi4vLi4vdHlwZXMvand0JztcbmNvbnN0IGVudiA9IHJlcXVpcmUoJy4uLy4uLy4uL2VudicpO1xuXG5pbnRlcmZhY2UgU29ja2V0IGV4dGVuZHMgc29ja2V0aW8uU29ja2V0IHtcbiAgICBqd3Q6IFRva2VuXG59IFxuXG5jb25zdCBpbml0ID0gKHNlcnZlcjogU2VydmVyLCBkYjogQ29ubmVjdGlvbik6IHNvY2tldGlvLlNlcnZlciA9PiB7XG4gICAgY29uc3QgaW86IHNvY2tldGlvLlNlcnZlciA9IHNvY2tldGlvKHNlcnZlcik7XG4gICAgbGV0IGNvbm5lY3RlZFVzZXJFbWFpbHM6IHN0cmluZ1tdID0gW107XG5cbiAgICAvLyBzZXQgYXV0aG9yaXphdGlvbiBmb3Igc29ja2V0LmlvXG4gICAgaW8ub24oJ2Nvbm5lY3Rpb24nLCBhdXRob3JpemVKd3Qoe1xuICAgICAgICAgICAgc2VjcmV0OiBlbnYuc2VjcmV0LFxuICAgICAgICAgICAgdGltZW91dDogMTUwMDAsIC8vIDE1IHNlY29uZHMgdG8gc2VuZCB0aGUgYXV0aGVudGljYXRpb24gbWVzc2FnZVxuICAgICAgICAgICAgZGVjb2RlZFByb3BlcnR5TmFtZTogJ2p3dCdcbiAgICAgICAgfSkpLm9uKCdhdXRoZW50aWNhdGVkJywgKHNvY2tldDogU29ja2V0KSA9PiB7XG5cbiAgICAgICAgICAgIGNvbm5lY3RlZFVzZXJFbWFpbHMucHVzaChzb2NrZXQuand0LmVtYWlsKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb25uZWN0ZWQgdXNlcnMnLCBjb25uZWN0ZWRVc2VyRW1haWxzKTtcbiAgICAgICAgICAgIGlvLmVtaXQoJ2Nvbm5lY3RlZCB1c2VycycsIGNvbm5lY3RlZFVzZXJFbWFpbHMuZmlsdGVyKCh2YWx1ZSwgaW5kZXgsIHNlbGYpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXg7XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIHNvY2tldC5vbignZGlzY29ubmVjdCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25uZWN0ZWRVc2VyRW1haWxzLnNwbGljZShjb25uZWN0ZWRVc2VyRW1haWxzLmluZGV4T2Yoc29ja2V0Lmp3dC5lbWFpbCksIDEpO1xuICAgICAgICAgICAgICAgIGlvLmVtaXQoJ2Nvbm5lY3RlZCB1c2VycycsIGNvbm5lY3RlZFVzZXJFbWFpbHMuZmlsdGVyKCh2YWx1ZSwgaW5kZXgsIHNlbGYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4O1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzb2NrZXQub24oJ21lc3NhZ2UnLCAobWVzc2FnZTogeyB0ZXh0OiBzdHJpbmcsIGNoYW5uZWw6IHN0cmluZyB9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgbGV0IG06IElNZXNzYWdlID0gbmV3IE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBjaGFubmVsOiBtZXNzYWdlLmNoYW5uZWwsXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IG1lc3NhZ2UudGV4dCxcbiAgICAgICAgICAgICAgICAgICAgdXNlckVtYWlsOiBzb2NrZXQuand0LmVtYWlsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbS5zYXZlKCkudGhlbigobTogSU1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaW8uZW1pdCgnbWVzc2FnZScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9pZDogbS5faWQsXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyRW1haWw6IG0udXNlckVtYWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogbS50ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbDogbS5jaGFubmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZDogbS5jcmVhdGVkQXRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KCdtZXNzYWdlIHJlY2VpdmVkJyk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICBzb2NrZXQuZW1pdCgnbWVzc2FnZSByZWNlaXZlIGVycm9yJywgZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICByZXR1cm4gaW87XG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQ7IiwiaW1wb3J0IHtTdGF0ZSwgQ2hhbm5lbCwgTWVzc2FnZX0gZnJvbSAnLi4vcmVkdWNlcnMvY2hhbm5lbHMnO1xuaW1wb3J0IGF4aW9zLCB7IEF4aW9zUmVzcG9uc2UsIEF4aW9zRXJyb3IgfSBmcm9tICdheGlvcyc7XG5cbmltcG9ydCB7YWRkRXJyb3IsIGFkZEluZm99IGZyb20gJy4vbm90aWZpY2F0aW9uc0FjdGlvbnMnO1xuXG5leHBvcnQgY29uc3QgQUREX0NIQU5ORUxTID0gJ0FERF9DSEFOTkVMUyc7XG5leHBvcnQgY29uc3QgU0VUX0NIQU5ORUxfRkVUQ0hJTkdfTkVXX01FU1NBR0VTID0gJ1NFVF9DSEFOTkVMX0ZFVENISU5HX05FV19NRVNTQUdFUyc7XG5leHBvcnQgY29uc3QgU0VUX0NIQU5ORUxfSEFTX01PUkVfTUVTU0FHRVMgPSAnU0VUX0NIQU5ORUxfSEFTX01PUkVfTUVTU0FHRSc7XG5leHBvcnQgY29uc3QgQUREX1JFQ0VJVkVEX0NIQU5ORUxfTUVTU0FHRSA9ICdBRERfUkVDRUlWRURfQ0hBTk5FTF9NRVNTQUdFJztcbmV4cG9ydCBjb25zdCBBRERfUkVUUklFVkVEX0NIQU5ORUxfTUVTU0FHRVMgPSAnQUREX1JFVFJJRVZFRF9DSEFOTkVMX01FU1NBR0VTJztcbmV4cG9ydCBjb25zdCBJTkNSRU1FTlRfQ0hBTk5FTF9SRVRSSUVWRV9NRVNTQUdFU19PRkZTRVQgPSAnSU5DUkVNRU5UX0NIQU5ORUxfUkVUUklFVkVfTUVTU0FHRVNfT0ZGU0VUJztcbmV4cG9ydCBjb25zdCBSRVRSSUVWRV9DSEFOTkVMX01FU1NBR0VTID0gJ1JFVFJJRVZFX0NIQU5ORUxfTUVTU0FHRVMnO1xuZXhwb3J0IGNvbnN0IENMRUFSX0NIQU5ORUxTX0RBVEEgPSAnQ0xFQVJfQ0hBTk5FTFNfREFUQSc7XG5cbmV4cG9ydCBjb25zdCBhZGRDaGFubmVscyA9IChjaGFubmVsTmFtZXM6IHN0cmluZ1tdKSA9PiB7XG4gICAgbGV0IGNoYW5uZWxzOiBTdGF0ZSA9IFtdO1xuICAgIGNoYW5uZWxOYW1lcy5mb3JFYWNoKChuYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgY2hhbm5lbHMucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgbWVzc2FnZXM6IFtdLFxuICAgICAgICAgICAgcmV0cmlldmVNZXNzYWdlc09mZnNldDogMCxcbiAgICAgICAgICAgIGhhc01vcmVNZXNzYWdlczogdHJ1ZSxcbiAgICAgICAgICAgIGZldGNoaW5nTmV3TWVzc2FnZXM6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IEFERF9DSEFOTkVMUyxcbiAgICAgICAgZGF0YTogeyBjaGFubmVsczogY2hhbm5lbHMgfVxuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCBpbmNyZW1lbnRDaGFubmVsUmV0cmlldmVNZXNzYWdlc09mZnNldCA9IChjaGFubmVsOiBzdHJpbmcsIG46IG51bWJlcikgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IElOQ1JFTUVOVF9DSEFOTkVMX1JFVFJJRVZFX01FU1NBR0VTX09GRlNFVCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgY2hhbm5lbDogY2hhbm5lbCxcbiAgICAgICAgICAgIGluY3JlbWVudDogblxuICAgICAgICB9XG4gICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IHNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzID0gKGNoYW5uZWw6IHN0cmluZywgaXNGZXRjaGluZzogYm9vbGVhbikgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFNFVF9DSEFOTkVMX0ZFVENISU5HX05FV19NRVNTQUdFUyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgY2hhbm5lbE5hbWU6IGNoYW5uZWwsXG4gICAgICAgICAgICBpc0ZldGNoaW5nOiBpc0ZldGNoaW5nXG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5leHBvcnQgY29uc3Qgc2V0Q2hhbm5lbEhhc01vcmVNZXNzYWdlcyA9IChjaGFubmVsTmFtZTogc3RyaW5nLCBoYXNNb3JlOiBib29sZWFuKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogU0VUX0NIQU5ORUxfSEFTX01PUkVfTUVTU0FHRVMsXG4gICAgICAgIGRhdGE6IHsgY2hhbm5lbE5hbWU6IGNoYW5uZWxOYW1lLCBoYXNNb3JlOiBoYXNNb3JlIH1cbiAgICB9O1xufVxuXG5leHBvcnQgY29uc3QgYWRkUmVjZWl2ZWRDaGFubmVsTWVzc2FnZSA9IChjaGFubmVsTmFtZTogc3RyaW5nLCBtZXNzYWdlOiBNZXNzYWdlKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogQUREX1JFQ0VJVkVEX0NIQU5ORUxfTUVTU0FHRSxcbiAgICAgICAgZGF0YTogeyBtZXNzYWdlOiBtZXNzYWdlLCBjaGFubmVsTmFtZTogY2hhbm5lbE5hbWUgfVxuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCBhZGRSZXRyaWV2ZWRDaGFubmVsTWVzc2FnZXMgPSAoY2hhbm5lbE5hbWU6IHN0cmluZywgbWVzc2FnZXM6IE1lc3NhZ2VbXSkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IEFERF9SRVRSSUVWRURfQ0hBTk5FTF9NRVNTQUdFUyxcbiAgICAgICAgZGF0YToge2NoYW5uZWxOYW1lOiBjaGFubmVsTmFtZSwgbWVzc2FnZXM6IG1lc3NhZ2VzfVxuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCBjbGVhckNoYW5uZWxzRGF0YSA9ICgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBDTEVBUl9DSEFOTkVMU19EQVRBXG4gICAgfVxufVxuXG4vKiBBc3luYyBBY3Rpb25zICovXG5cbmV4cG9ydCBjb25zdCBmZXRjaENoYW5uZWxzID0gKCkgPT4ge1xuICAgIHJldHVybiAoZGlzcGF0Y2g6IGFueSkgID0+IHtcbiAgICAgICAgcmV0dXJuIGF4aW9zLmdldCgnL2FwaS92MS9jaGFubmVscycpLnRoZW4oKHJlczogQXhpb3NSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGNoYW5uZWxzID0gcmVzLmRhdGEuY2hhbm5lbHMubWFwKCAoYzoge25hbWU6IHN0cmluZywgX2lkOiBzdHJpbmd9KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGMubmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGRpc3BhdGNoKGFkZENoYW5uZWxzKGNoYW5uZWxzKSk7XG4gICAgICAgIH0pLmNhdGNoKChlcnI6IEF4aW9zRXJyb3IpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBkaXNwYXRjaChhZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIGZldGNoIHRoZSBjaGFubmVscycpKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgcmV0cmlldmVDaGFubmVsTWVzc2FnZXMgPSAoY2hhbm5lbE5hbWU6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiBhc3luYyAoZGlzcGF0Y2g6IGFueSwgZ2V0U3RhdGU6IGFueSkgPT4ge1xuICAgICAgICBsZXQgY2hhbm5lbDogQ2hhbm5lbCA9IGdldFN0YXRlKCkuY2hhbm5lbHMuZmluZCggKGM6IENoYW5uZWwpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjLm5hbWUgPT09IGNoYW5uZWxOYW1lO1xuICAgICAgICB9KVxuICAgICAgICBpZiAoIWNoYW5uZWwgfHwgY2hhbm5lbC5mZXRjaGluZ05ld01lc3NhZ2VzIHx8ICFjaGFubmVsLmhhc01vcmVNZXNzYWdlcykge1xuICAgICAgICAgICAgZGlzcGF0Y2goYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBmZXRjaCBtZXNzYWdlcycpKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoJ1JldHJpZXZlIENoYW5uZWwgTWVzc2FnZXMgZGlzcGF0Y2hlZCB3aXRoIGluY29ycmVjdCBjaGFubmVsIG5hbWUgb3Igd2hpbGUgYWxyZWFkeSBmZXRjaGluZyBtZXNzYWdlcycpO1xuICAgICAgICB9XG4gICAgICAgIGRpc3BhdGNoKHNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzKGNoYW5uZWwubmFtZSwgdHJ1ZSkpO1xuICAgICAgICByZXR1cm4gYXhpb3MuZ2V0KCcvYXBpL3YxL21lc3NhZ2VzLycgKyBjaGFubmVsLm5hbWUgKyAnLycgKyBjaGFubmVsLnJldHJpZXZlTWVzc2FnZXNPZmZzZXQpLnRoZW4oKHJlczogQXhpb3NSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLm1lc3NhZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGRpc3BhdGNoKHNldENoYW5uZWxIYXNNb3JlTWVzc2FnZXMoY2hhbm5lbC5uYW1lLCBmYWxzZSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkaXNwYXRjaChpbmNyZW1lbnRDaGFubmVsUmV0cmlldmVNZXNzYWdlc09mZnNldChjaGFubmVsTmFtZSwgcmVzLmRhdGEubWVzc2FnZXMubGVuZ3RoKSk7XG4gICAgICAgICAgICBkaXNwYXRjaChhZGRSZXRyaWV2ZWRDaGFubmVsTWVzc2FnZXMoY2hhbm5lbC5uYW1lLCByZXMuZGF0YS5tZXNzYWdlcykpXG4gICAgICAgIH0pLmNhdGNoKChlcnI6IEF4aW9zRXJyb3IpID0+IHtcbiAgICAgICAgICAgIGRpc3BhdGNoKGFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gZmV0Y2ggbWVzc2FnZXMnKSk7XG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGRpc3BhdGNoKHNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzKGNoYW5uZWwubmFtZSwgZmFsc2UpKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgZGVsZXRlQ2hhbm5lbCA9IChjaGFubmVsTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIChkaXNwYXRjaDogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiBheGlvcy5nZXQoJy9hcGkvdjEvY2hhbm5lbC9kZWxldGUvJyArIGNoYW5uZWxOYW1lKS5cbiAgICAgICAgICAgIHRoZW4oKHJlczogQXhpb3NSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGRpc3BhdGNoKGFkZEluZm8oJ0NoYW5uZWwgZGVsZXRlZCcpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2goZmV0Y2hDaGFubmVscygpKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnI6IEF4aW9zRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2goYWRkRXJyb3IoZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCBhZGRDaGFubmVsID0gKGNoYW5uZWxOYW1lOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gKGRpc3BhdGNoOiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIGF4aW9zLnBvc3QoJy9hcGkvdjEvY2hhbm5lbC9jcmVhdGUnLCB7XG4gICAgICAgICAgICBjaGFubmVsTmFtZTogY2hhbm5lbE5hbWVcbiAgICAgICAgfSkudGhlbigocmVzOiBBeGlvc1Jlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBkaXNwYXRjaChhZGRJbmZvKCdDaGFubmVsIGNyZWF0ZWQnKSk7XG4gICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2goZmV0Y2hDaGFubmVscygpKTtcbiAgICAgICAgfSkuY2F0Y2goKGVycjogQXhpb3NFcnJvcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGRpc3BhdGNoKGFkZEVycm9yKGVyci5yZXNwb25zZS5kYXRhLmVycm9yKSk7XG4gICAgICAgIH0pXG4gICAgfTtcbn1cbiIsImltcG9ydCBheGlvcywgeyBBeGlvc0Vycm9yLCBBeGlvc1Jlc3BvbnNlIH0gZnJvbSAnYXhpb3MnO1xuXG5pbXBvcnQge1N0YXRlLCBDaGF0VXNlcn0gZnJvbSAnLi4vcmVkdWNlcnMvY2hhdFVzZXJzJztcbmltcG9ydCB7IERpc3BhdGNoIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgYWRkRXJyb3IgfSBmcm9tICcuL25vdGlmaWNhdGlvbnNBY3Rpb25zJztcblxuZXhwb3J0IGNvbnN0IFVQREFURV9DSEFUX1VTRVJTID0gJ1VQREFURV9DSEFUX1VTRVJTJztcbmV4cG9ydCBjb25zdCBBRERfQ0hBVF9VU0VSID0gJ0FERF9VU0VSJztcbmV4cG9ydCBjb25zdCBSRU1PVkVfQ0hBVF9VU0VSID0gJ1JFTU9WRV9VU0VSJztcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZVVzZXJzID0gZnVuY3Rpb24odXNlcnM6IFN0YXRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogVVBEQVRFX0NIQVRfVVNFUlMsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHVzZXJzOiB1c2Vyc1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgYWRkVXNlciA9IGZ1bmN0aW9uKHVzZXI6IENoYXRVc2VyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogQUREX0NIQVRfVVNFUixcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgdXNlcjogdXNlclxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgcmVtb3ZlVXNlciA9IGZ1bmN0aW9uKGVtYWlsOiBzdHJpbmcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBSRU1PVkVfQ0hBVF9VU0VSLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBlbWFpbDogZW1haWxcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyogQXN5bmMgRnVuY3Rpb25zICovXG5leHBvcnQgY29uc3QgZmV0Y2hBbGxVc2VycyA9ICgpID0+IHtcbiAgICByZXR1cm4gKGRpc3BhdGNoOiBEaXNwYXRjaCkgPT4ge1xuICAgICAgICByZXR1cm4gYXhpb3MuZ2V0KCcvYXBpL3YxL3VzZXJzJykudGhlbigocmVzOiBBeGlvc1Jlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBsZXQgdXNlcnM6IFN0YXRlID0ge307XG4gICAgICAgICAgICByZXMuZGF0YS51c2Vycy5mb3JFYWNoKCh1OiBDaGF0VXNlcikgPT4ge1xuICAgICAgICAgICAgICAgIHVzZXJzW3UuZW1haWxdID0ge1xuICAgICAgICAgICAgICAgICAgICByb2xlOiB1LnJvbGUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHUubmFtZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRpc3BhdGNoKHVwZGF0ZVVzZXJzKHVzZXJzKSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9KS5jYXRjaCgoZXJyOiBBeGlvc0Vycm9yKSA9PiB7XG4gICAgICAgICAgICBkaXNwYXRjaChhZGRFcnJvcignRmV0Y2hpbmcgYWxsIHVzZXJzIGZhaWxlZCcpKTtcbiAgICAgICAgICAgIHJldHVybiBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU5ld1VzZXIgPSAodXNlcjogQ2hhdFVzZXIpID0+IHtcbiAgICByZXR1cm4gKGRpc3BhdGNoOiBEaXNwYXRjaCkgPT4ge1xuICAgICAgICByZXR1cm4gYXhpb3MuZ2V0KCcvYXBpL3YxLycpXG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgZWRpdFVzZXIgPSAoZW1haWw6IHN0cmluZywgdXNlcjogQ2hhdFVzZXIpID0+IHtcblxufVxuXG5leHBvcnQgY29uc3QgZGVsZXRlVXNlciA9IChlbWFpbDogc3RyaW5nKSA9PiB7XG5cbn0iLCJleHBvcnQgY29uc3QgQUREX0VSUk9SID0gJ0FERF9FUlJPUic7XG5leHBvcnQgY29uc3QgUkVNT1ZFX0VSUk9SID0gJ1JFTU9WRV9FUlJPUic7XG5leHBvcnQgY29uc3QgQ0xFQVJfRVJST1JTID0gJ0NMRUFSX0VSUk9SUyc7XG5leHBvcnQgY29uc3QgQUREX0lORk8gPSAnQUREX0lORk8nO1xuZXhwb3J0IGNvbnN0IFJFTU9WRV9JTkZPID0gJ1JFTU9WRV9JTkZPJztcbmV4cG9ydCBjb25zdCBDTEVBUl9JTkZPUyA9ICdDTEVBUl9JTkZPUyc7XG5cbmV4cG9ydCBjb25zdCBhZGRFcnJvciA9IChlcnJvcjogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogQUREX0VSUk9SLFxuICAgICAgICBkYXRhOiBlcnJvclxuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCByZW1vdmVFcnJvciA9IChpOiBudW1iZXIpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBSRU1PVkVfRVJST1IsXG4gICAgICAgIGRhdGE6IGlcbiAgICB9O1xufVxuXG5leHBvcnQgY29uc3QgY2xlYXJFcnJvcnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHsgdHlwZTogQ0xFQVJfRVJST1JTIH07XG59XG5cbmV4cG9ydCBjb25zdCBhZGRJbmZvID0gKGluZm86IHN0cmluZykgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IEFERF9JTkZPLFxuICAgICAgICBkYXRhOiBpbmZvXG4gICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IHJlbW92ZUluZm8gPSAoaTogbnVtYmVyKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogUkVNT1ZFX0lORk8sXG4gICAgICAgIGRhdGE6IGlcbiAgICB9O1xufVxuXG5leHBvcnQgY29uc3QgY2xlYXJJbmZvcyA9ICgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBDTEVBUl9JTkZPU1xuICAgIH07XG59XG4iLCJleHBvcnQgY29uc3QgVE9HR0xFX1NJREVCQVJfT1BFTiA9ICdUT0dHTEVfU0lERUJBUl9PUEVOJztcblxuZXhwb3J0IGNvbnN0IHRvZ2dsZVNpZGViYXJPcGVuID0gKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFRPR0dMRV9TSURFQkFSX09QRU5cbiAgICB9XG59IiwiaW1wb3J0ICogYXMgaW8gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5pbXBvcnQgeyBEaXNwYXRjaCB9IGZyb20gJ3JlZHV4JztcblxuaW1wb3J0IHtTdGF0ZX0gZnJvbSAnLi4vc3RvcmUnO1xuXG5leHBvcnQgY29uc3QgSU5JVF9XRUJTT0NLRVQgPSAnSU5JVF9XRUJTT0NLRVQnO1xuZXhwb3J0IGNvbnN0IFNFVF9TT0NLRVRfQ09OTkVDVEVEID0gJ1NFVF9TT0NLRVRfQ09OTkVDVEVEJztcbmV4cG9ydCBjb25zdCBTRVRfU09DS0VUX0NPTk5FQ1RFRF9VU0VSUyA9ICdTRVRfU09DS0VUX0NPTk5FQ1RFRF9VU0VSUyc7XG5cbmV4cG9ydCBjb25zdCBpbml0V2Vic29ja2V0ID0gKGlvOiBTb2NrZXRJT0NsaWVudC5Tb2NrZXQpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBJTklUX1dFQlNPQ0tFVCxcbiAgICAgICAgZGF0YTogeyBpbzogaW8gfVxuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCBzZXRTb2NrZXRDb25uZWN0ZWQgPSAoY29ubmVjdGVkOiBib29sZWFuKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogU0VUX1NPQ0tFVF9DT05ORUNURUQsXG4gICAgICAgIGRhdGE6IHsgY29ubmVjdGVkOiBjb25uZWN0ZWQgfVxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IHNldFNvY2tldENvbm5lY3RlZFVzZXJzID0gKHVzZXJFbWFpbHM6IHN0cmluZ1tdKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogU0VUX1NPQ0tFVF9DT05ORUNURURfVVNFUlMsXG4gICAgICAgIGRhdGE6IHsgdXNlckVtYWlsczogdXNlckVtYWlscyB9XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICByZXR1cm4gKGRpc3BhdGNoOiBEaXNwYXRjaCwgZ2V0U3RhdGU6IEZ1bmN0aW9uKSA9PiB7XG4gICAgICAgIGxldCBzb2NrZXQ6IFNvY2tldElPQ2xpZW50LlNvY2tldCA9IGlvKCk7XG4gICAgICAgIHNvY2tldC5vbignY29ubmVjdCcsICgpID0+IHtcbiAgICAgICAgICAgIHNvY2tldFxuICAgICAgICAgICAgICAgIC5lbWl0KCdhdXRoZW50aWNhdGUnLCB7IHRva2VuOiBnZXRTdGF0ZSgpLnVzZXIudG9rZW4gfSkgLy9zZW5kIHRoZSBqd3RcbiAgICAgICAgICAgICAgICAub24oJ2F1dGhlbnRpY2F0ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKHNldFNvY2tldENvbm5lY3RlZCh0cnVlKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhdXRob3JpemVkIFsnICsgc29ja2V0LmlkICsgJ10nKTtcbiAgICAgICAgICAgICAgICAgICAgc29ja2V0Lm9uKCdjb25uZWN0ZWQgdXNlcnMnLCAodXNlckVtYWlsczogc3RyaW5nW10pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKHNldFNvY2tldENvbm5lY3RlZFVzZXJzKHVzZXJFbWFpbHMpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oJ3VuYXV0aG9yaXplZCcsIGZ1bmN0aW9uIChtc2c6IGFueSkge1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChzZXRTb2NrZXRDb25uZWN0ZWQoZmFsc2UpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1bmF1dGhvcml6ZWQ6IFwiICsgSlNPTi5zdHJpbmdpZnkobXNnLmRhdGEpKTtcbiAgICAgICAgICAgICAgICAgICAgc29ja2V0Lm9mZignY29ubmVjdGVkIHVzZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZy5kYXRhLnR5cGUpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgICAgICBzb2NrZXQub24oJ2Rpc2Nvbm5lY3QnLCAoKSA9PiB7XG4gICAgICAgICAgICBkaXNwYXRjaChzZXRTb2NrZXRDb25uZWN0ZWQoZmFsc2UpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEaXNjb25uZWN0ZWQgZnJvbSB3ZWJzb2NrZXQgc2VydmVyLCBhdHRlbXB0aW5nIHJlY29ubmVjdCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGlzcGF0Y2goaW5pdFdlYnNvY2tldChzb2NrZXQpKTtcbiAgICB9XG59IiwiaW1wb3J0IGF4aW9zLCB7IEF4aW9zUmVzcG9uc2UsIEF4aW9zRXJyb3IgfSBmcm9tICdheGlvcyc7XG5pbXBvcnQge1N0YXRlIGFzIFVzZXJTdGF0ZX0gZnJvbSAnLi4vcmVkdWNlcnMvdXNlcic7XG5pbXBvcnQge2NsZWFyQ2hhbm5lbHNEYXRhfSBmcm9tICcuL2NoYW5uZWxzQWN0aW9ucyc7XG5pbXBvcnQge2FkZEVycm9yLCBhZGRJbmZvfSBmcm9tICcuL25vdGlmaWNhdGlvbnNBY3Rpb25zJztcblxuZXhwb3J0IGNvbnN0IFNFVF9BVVRIT1JJWkVEID0gJ1NFVF9BVVRIT1JJWkVEJztcbmV4cG9ydCBjb25zdCBTRVRfVVNFUiA9ICdTRVRfVVNFUic7XG5leHBvcnQgY29uc3QgTE9HT1VUX1VTRVIgPSAnTE9HT1VUX1VTRVInO1xuZXhwb3J0IGNvbnN0IFNFVF9KV1QgPSAnU0VUX0pXVCc7XG5cbmV4cG9ydCBjb25zdCBzZXRBdXRob3JpemVkID0gKGF1dGhvcml6ZWQ6IGJvb2xlYW4pID0+IHtcbiAgICByZXR1cm4gIHtcbiAgICAgICAgdHlwZTogU0VUX0FVVEhPUklaRUQsXG4gICAgICAgIGRhdGE6IGF1dGhvcml6ZWRcbiAgICB9O1xufVxuXG5leHBvcnQgY29uc3Qgc2V0VXNlciA9ICh1c2VyOiBVc2VyU3RhdGUpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBTRVRfVVNFUixcbiAgICAgICAgZGF0YTogdXNlclxuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCBsb2dvdXRVc2VyID0gKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IExPR09VVF9VU0VSXG4gICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IHNldEp3dCA9ICh0b2tlbjogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogU0VUX0pXVCxcbiAgICAgICAgZGF0YTogdG9rZW5cbiAgICB9O1xufVxuXG5leHBvcnQgY29uc3QgbG9nb3V0ID0gKCkgPT4ge1xuICAgIHJldHVybiAoZGlzcGF0Y2g6IGFueSkgPT4ge1xuICAgICAgICBkaXNwYXRjaChsb2dvdXRVc2VyKCkpO1xuICAgICAgICByZXR1cm4gZGlzcGF0Y2goY2xlYXJDaGFubmVsc0RhdGEoKSk7XG4gICAgfVxuICAgIFxufVxuXG4vKiBBc3luYyBBY3Rpb25zICovXG5leHBvcnQgY29uc3QgdXBkYXRlTmFtZSA9IChuYW1lOiBzdHJpbmcsIG9uU3VjY2Vzcz86IEZ1bmN0aW9uKSA9PiB7XG4gICAgcmV0dXJuIChkaXNwYXRjaDogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiBheGlvcy5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL25hbWUnLCB7XG4gICAgICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgIH0pLnRoZW4oKHJlczogQXhpb3NSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgZGlzcGF0Y2goYWRkSW5mbygnTmFtZSB1cGRhdGVkJykpO1xuICAgICAgICAgICAgaWYgKG9uU3VjY2Vzcykgb25TdWNjZXNzKCk7XG4gICAgICAgIH0pLmNhdGNoKChlcnI6IEF4aW9zRXJyb3IpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIucmVzcG9uc2UgJiYgZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpc3BhdGNoKGFkZEVycm9yKGVyci5yZXNwb25zZS5kYXRhLmVycm9yKSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU29tZXRoaW5nIHdlbnQgd3JvbmcgdXBkYXRpbmcgdXNlciBuYW1lJywgZXJyKTtcbiAgICAgICAgICAgIGRpc3BhdGNoKGFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gdXBkYXRlIHlvdXIgbmFtZS4nKSk7XG4gICAgICAgIH0pO1xuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVFbWFpbCA9IChlbWFpbDogc3RyaW5nLCBvblN1Y2Nlc3M/OiBGdW5jdGlvbikgPT4ge1xuICAgIHJldHVybiAoZGlzcGF0Y2g6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gYXhpb3MucG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9lbWFpbCcsIHtcbiAgICAgICAgICAgIGVtYWlsOiBlbWFpbFxuICAgICAgICB9KS50aGVuKChyZXM6IEF4aW9zUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGRpc3BhdGNoKGFkZEluZm8oJ0VtYWlsIHVwZGF0ZWQnKSk7XG4gICAgICAgICAgICBpZiAob25TdWNjZXNzKSBvblN1Y2Nlc3MoKTtcbiAgICAgICAgfSkuY2F0Y2goKGVycjogQXhpb3NFcnJvcikgPT4ge1xuICAgICAgICAgICAgaWYgKGVyci5yZXNwb25zZSAmJiBlcnIucmVzcG9uc2UuZGF0YS5lcnJvcilcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2goYWRkRXJyb3IoZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTb21ldGhpbmcgd2VudCB3cm9uZyB1cGRhdGluZyB1c2VyIGVtYWlsJywgZXJyKTtcbiAgICAgICAgICAgIGRpc3BhdGNoKGFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gdXBkYXRlIHlvdXIgZW1haWwuJykpO1xuICAgICAgICB9KTtcbiAgICB9O1xufVxuXG5leHBvcnQgY29uc3QgdXBkYXRlUGFzc3dvcmQgPSAob2xkUGFzczogc3RyaW5nLCBuZXdQYXNzOiBzdHJpbmcsIG9uU3VjY2Vzcz86IEZ1bmN0aW9uKSA9PiB7XG4gICAgcmV0dXJuIChkaXNwYXRjaDogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiBheGlvcy5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL3Bhc3N3b3JkJywge1xuICAgICAgICAgICAgb2xkUGFzczogb2xkUGFzcyxcbiAgICAgICAgICAgIG5ld1Bhc3M6IG5ld1Bhc3NcbiAgICAgICAgfSkudGhlbigocmVzOiBBeGlvc1Jlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBkaXNwYXRjaChhZGRJbmZvKCdQYXNzd29yZCB1cGRhdGVkJykpO1xuICAgICAgICAgICAgaWYgKG9uU3VjY2Vzcykgb25TdWNjZXNzKCk7XG4gICAgICAgIH0pLmNhdGNoKChlcnI6IEF4aW9zRXJyb3IpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIucmVzcG9uc2UgJiYgZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpc3BhdGNoKGFkZEVycm9yKGVyci5yZXNwb25zZS5kYXRhLmVycm9yKSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU29tZXRoaW5nIHdlbnQgd3JvbmcgdXBkYXRpbmcgdXNlciBwYXNzd29yZCcsIGVycik7XG4gICAgICAgICAgICBkaXNwYXRjaChhZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIHVwZGF0ZSB5b3VyIHBhc3N3b3JkLicpKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn0iLCJpbXBvcnQge0FERF9DSEFOTkVMUyxcbiAgICAgICAgU0VUX0NIQU5ORUxfRkVUQ0hJTkdfTkVXX01FU1NBR0VTLFxuICAgICAgICBTRVRfQ0hBTk5FTF9IQVNfTU9SRV9NRVNTQUdFUyxcbiAgICAgICAgQUREX1JFQ0VJVkVEX0NIQU5ORUxfTUVTU0FHRSxcbiAgICAgICAgQUREX1JFVFJJRVZFRF9DSEFOTkVMX01FU1NBR0VTLFxuICAgICAgICBJTkNSRU1FTlRfQ0hBTk5FTF9SRVRSSUVWRV9NRVNTQUdFU19PRkZTRVQsXG4gICAgICAgIENMRUFSX0NIQU5ORUxTX0RBVEF9XG4gICAgZnJvbSAnLi4vYWN0aW9ucy9jaGFubmVsc0FjdGlvbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1lc3NhZ2Uge1xuICAgIHVzZXJFbWFpbDogc3RyaW5nLFxuICAgIGNyZWF0ZWQ6IHN0cmluZyxcbiAgICBfaWQ6IHN0cmluZyxcbiAgICB0ZXh0OiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDaGFubmVsIHtcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgbWVzc2FnZXM6IE1lc3NhZ2VbXSxcbiAgICByZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0OiBudW1iZXIsXG4gICAgaGFzTW9yZU1lc3NhZ2VzOiBib29sZWFuXG4gICAgZmV0Y2hpbmdOZXdNZXNzYWdlczogYm9vbGVhblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0YXRlIGV4dGVuZHMgQXJyYXk8Q2hhbm5lbD4ge1xuXG59XG5cbmludGVyZmFjZSBBY3Rpb24ge1xuICAgIHR5cGU6IHN0cmluZyxcbiAgICBkYXRhOiBhbnlcbn1cblxubGV0IGluaXRpYWxTdGF0ZTogU3RhdGUgPSBbXTtcblxuZXhwb3J0IGNvbnN0IGNoYW5uZWxFeGlzdHMgPSAoY2hhbm5lbHM6IENoYW5uZWxbXSB8IFN0YXRlLCBjaGFubmVsTmFtZTogc3RyaW5nKTogYW55ID0+ICB7XG4gICAgbGV0IGNoYW5uZWwgPSBjaGFubmVscy5maW5kKCAoYzogQ2hhbm5lbCkgPT4ge1xuICAgICAgICByZXR1cm4gYy5uYW1lID09PSBjaGFubmVsTmFtZTtcbiAgICB9KTtcbiAgICBpZiAoIWNoYW5uZWwpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gY2hhbm5lbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlOiBTdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uOiBBY3Rpb24pIHtcbiAgICBzd2l0Y2goYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBBRERfQ0hBTk5FTFM6XG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uLmRhdGEuY2hhbm5lbHM7XG4gICAgICAgIGNhc2UgSU5DUkVNRU5UX0NIQU5ORUxfUkVUUklFVkVfTUVTU0FHRVNfT0ZGU0VUOiB7XG4gICAgICAgICAgICBsZXQgY2hhbm5lbDogQ2hhbm5lbCA9IGNoYW5uZWxFeGlzdHMoc3RhdGUsIGFjdGlvbi5kYXRhLmNoYW5uZWwpO1xuICAgICAgICAgICAgbGV0IGluY3JlbWVudDogbnVtYmVyID0gYWN0aW9uLmRhdGEuaW5jcmVtZW50O1xuICAgICAgICAgICAgaWYgKCFjaGFubmVsKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Vua25vd24gY2hhbm5lbCB3aGlsZSBpbmNyZW1lbnRpbmcgbWVzc2FnZXMgb2Zmc2V0JywgYWN0aW9uKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbmV3Q2hhbm5lbHM6IENoYW5uZWxbXSA9IHN0YXRlLm1hcCggKGM6IENoYW5uZWwpID0+IHtcbiAgICAgICAgICAgICAgICBpZihjLm5hbWUgPT09IGNoYW5uZWwubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjLnJldHJpZXZlTWVzc2FnZXNPZmZzZXQgKz0gaW5jcmVtZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG5ld0NoYW5uZWxzO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgU0VUX0NIQU5ORUxfRkVUQ0hJTkdfTkVXX01FU1NBR0VTOlxuICAgICAgICAgICAgbGV0IGNoYW5uZWw6IENoYW5uZWwgPSBjaGFubmVsRXhpc3RzKHN0YXRlLCBhY3Rpb24uZGF0YS5jaGFubmVsTmFtZSk7XG4gICAgICAgICAgICBpZiAoIWNoYW5uZWwpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVW5rbm93biBjaGFubmVsIHdoaWxlIGZldGNoaW5nIG5ldyBtZXNzYWdlcycsIGFjdGlvbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG5ld0NoYW5uZWxzOiBDaGFubmVsW10gPSBzdGF0ZS5tYXAoIChjOiBDaGFubmVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGMubmFtZSA9PT0gYWN0aW9uLmRhdGEuY2hhbm5lbE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgYy5mZXRjaGluZ05ld01lc3NhZ2VzID0gYWN0aW9uLmRhdGEuaXNGZXRjaGluZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBuZXdDaGFubmVscztcbiAgICAgICAgY2FzZSBTRVRfQ0hBTk5FTF9IQVNfTU9SRV9NRVNTQUdFUzoge1xuICAgICAgICAgICAgbGV0IGNoYW5uZWw6IENoYW5uZWwgPSBjaGFubmVsRXhpc3RzKHN0YXRlLCBhY3Rpb24uZGF0YS5jaGFubmVsTmFtZSk7XG4gICAgICAgICAgICBsZXQgaGFzTW9yZTogYm9vbGVhbiA9IGFjdGlvbi5kYXRhLmhhc01vcmU7XG4gICAgICAgICAgICBpZiAoIWNoYW5uZWwpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVW5rbm93biBjaGFubmVsIHdoaWxlIHNldHRpbmcgaGFzTW9yZSBtZXNzYWdlcycsIGFjdGlvbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG5ld0NoYW5uZWxzOiBDaGFubmVsW10gPSBzdGF0ZS5tYXAoIChjOiBDaGFubmVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGMubmFtZSA9PT0gYWN0aW9uLmRhdGEuY2hhbm5lbE5hbWUpXG4gICAgICAgICAgICAgICAgICAgIGMuaGFzTW9yZU1lc3NhZ2VzID0gaGFzTW9yZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG5ld0NoYW5uZWxzO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQUREX1JFVFJJRVZFRF9DSEFOTkVMX01FU1NBR0VTOiB7XG4gICAgICAgICAgICBsZXQgcmV0cmlldmVkTWVzc2FnZXM6IE1lc3NhZ2VbXSA9IGFjdGlvbi5kYXRhLm1lc3NhZ2VzO1xuICAgICAgICAgICAgbGV0IGNoYW5uZWxOYW1lOiBzdHJpbmcgPSBhY3Rpb24uZGF0YS5jaGFubmVsTmFtZTtcbiAgICAgICAgICAgIGxldCBjaGFubmVsOiBDaGFubmVsID0gY2hhbm5lbEV4aXN0cyhzdGF0ZSwgY2hhbm5lbE5hbWUpO1xuICAgICAgICAgICAgaWYoIWNoYW5uZWwpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVW5rbm93biBjaGFubmVsIHdoaWxlIGFkZGluZyByZXRyaWV2ZWQgY2hhbm5lbCBtZXNzYWdlcycsIGFjdGlvbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG5ld0NoYW5uZWxzOiBDaGFubmVsW10gPSBzdGF0ZS5tYXAoIChjOiBDaGFubmVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGMubmFtZSA9PT0gY2hhbm5lbE5hbWUpXG4gICAgICAgICAgICAgICAgICAgIGMubWVzc2FnZXMgPSByZXRyaWV2ZWRNZXNzYWdlcy5jb25jYXQoYy5tZXNzYWdlcyk7Ly9jLm1lc3NhZ2VzLmNvbmNhdChtZXNzYWdlcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBuZXdDaGFubmVscztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEFERF9SRUNFSVZFRF9DSEFOTkVMX01FU1NBR0U6IHtcbiAgICAgICAgICAgIGxldCByZWNlaXZlZE1lc3NhZ2UgPSBhY3Rpb24uZGF0YS5tZXNzYWdlO1xuICAgICAgICAgICAgbGV0IGNoYW5uZWxOYW1lID0gYWN0aW9uLmRhdGEuY2hhbm5lbE5hbWU7XG4gICAgICAgICAgICBsZXQgY2hhbm5lbDogQ2hhbm5lbCA9IGNoYW5uZWxFeGlzdHMoc3RhdGUsIGNoYW5uZWxOYW1lKTtcbiAgICAgICAgICAgIGlmICghY2hhbm5lbCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVbmtub3duIGNoYW5uZWwgd2hpbGUgYWRkaW5nIHJlY2VpdmVkIG1lc3NhZ2UnLCBzdGF0ZSwgYWN0aW9uKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbmV3Q2hhbm5lbHM6IENoYW5uZWxbXSA9IHN0YXRlLm1hcCgoYzogQ2hhbm5lbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGMubmFtZSA9PT0gY2hhbm5lbE5hbWUpIFxuICAgICAgICAgICAgICAgICAgICBjLm1lc3NhZ2VzID0gYy5tZXNzYWdlcy5jb25jYXQoW3JlY2VpdmVkTWVzc2FnZV0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiBuZXdDaGFubmVscztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENMRUFSX0NIQU5ORUxTX0RBVEE6XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufSIsImltcG9ydCB7QW55QWN0aW9ufSBmcm9tICdyZWR1eCc7XG5pbXBvcnQge1VQREFURV9DSEFUX1VTRVJTLCBBRERfQ0hBVF9VU0VSLCBSRU1PVkVfQ0hBVF9VU0VSfVxuICAgIGZyb20gJy4uL2FjdGlvbnMvY2hhdFVzZXJzQWN0aW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGUge1xuICAgIFtlbWFpbDogc3RyaW5nXToge1xuICAgICAgICByb2xlOiBzdHJpbmcsXG4gICAgICAgIG5hbWU6IHN0cmluZyxcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2hhdFVzZXIge1xuICAgIGVtYWlsOiBzdHJpbmcsXG4gICAgcm9sZTogc3RyaW5nLFxuICAgIG5hbWU6IHN0cmluZyxcbn1cblxubGV0IGluaXRpYWxTdGF0ZTogU3RhdGUgPSB7XG4gICAgXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHN0YXRlOiBTdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uOiBBbnlBY3Rpb24pIHtcbiAgICBzd2l0Y2goYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBVUERBVEVfQ0hBVF9VU0VSUzpcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb24uZGF0YS51c2VycztcbiAgICAgICAgY2FzZSBBRERfQ0hBVF9VU0VSOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgW2FjdGlvbi5kYXRhLnVzZXIuZW1haWxdOiB7XG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IGFjdGlvbi5kYXRhLnVzZXIucm9sZSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogYWN0aW9uLmRhdGEudXNlci5uYW1lLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIFJFTU9WRV9DSEFUX1VTRVI6XG4gICAgICAgICAgICBsZXQgY2xvbmU6IFN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpO1xuICAgICAgICAgICAgZGVsZXRlIGNsb25lW2FjdGlvbi5kYXRhLmVtYWlsXVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn0iLCJpbXBvcnQge0FERF9FUlJPUiwgUkVNT1ZFX0VSUk9SLCBDTEVBUl9FUlJPUlMsIEFERF9JTkZPLCBSRU1PVkVfSU5GTywgQ0xFQVJfSU5GT1N9XG4gICAgZnJvbSAnLi4vYWN0aW9ucy9ub3RpZmljYXRpb25zQWN0aW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGUge1xuICAgIGVycm9yczogc3RyaW5nW10sXG4gICAgaW5mb3M6IHN0cmluZ1tdLFxufVxuaW50ZXJmYWNlIEFjdGlvbiB7XG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGRhdGE6IGFueVxufVxuXG5sZXQgaW5pdGlhbFN0YXRlOiBTdGF0ZSA9IHtcbiAgICBlcnJvcnM6IFtdLFxuICAgIGluZm9zOiBbXVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzdGF0ZTogU3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbjogQWN0aW9uKSB7XG4gICAgc3dpdGNoKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgQUREX0VSUk9SOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7ZXJyb3JzOiBzdGF0ZS5lcnJvcnMuY29uY2F0KFthY3Rpb24uZGF0YV0pfSk7XG4gICAgICAgIGNhc2UgUkVNT1ZFX0VSUk9SOlxuICAgICAgICAgICAgbGV0IG5ld0Vycm9yc0FycmF5ID0gc3RhdGUuZXJyb3JzLnNsaWNlKCk7XG4gICAgICAgICAgICBuZXdFcnJvcnNBcnJheS5zcGxpY2UoYWN0aW9uLmRhdGEsIDEpO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7ZXJyb3JzOiBuZXdFcnJvcnNBcnJheX0pO1xuICAgICAgICBjYXNlIENMRUFSX0VSUk9SUzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgIHtlcnJvcnM6IFtdfSk7XG4gICAgICAgIGNhc2UgQUREX0lORk86XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtpbmZvczogc3RhdGUuaW5mb3MuY29uY2F0KFthY3Rpb24uZGF0YV0pfSk7XG4gICAgICAgIGNhc2UgUkVNT1ZFX0lORk86XG4gICAgICAgICAgICBsZXQgbmV3SW5mb3NBcnJheSA9IHN0YXRlLmluZm9zLnNsaWNlKCk7XG4gICAgICAgICAgICBuZXdJbmZvc0FycmF5LnNwbGljZShhY3Rpb24uZGF0YSwgMSk7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgaW5mb3M6IG5ld0luZm9zQXJyYXkgfSk7XG4gICAgICAgIGNhc2UgQ0xFQVJfSU5GT1M6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtpbmZvczogW119KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59IiwiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSBcInJlZHV4XCI7XG5pbXBvcnQgeyBUT0dHTEVfU0lERUJBUl9PUEVOIH0gZnJvbSAnLi4vYWN0aW9ucy9zaWRlYmFyQWN0aW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGUge1xuICAgIG9wZW46IGJvb2xlYW5cbn1cblxubGV0IGluaXRpYWxTdGF0ZTogU3RhdGUgPSB7XG4gICAgb3BlbjogdHJ1ZVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzdGF0ZTogU3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbjogQWN0aW9uKSB7XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIFRPR0dMRV9TSURFQkFSX09QRU46XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtvcGVuOiAhc3RhdGUub3Blbn0pO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBBbnlBY3Rpb24gfSBmcm9tIFwicmVkdXhcIjtcbmltcG9ydCAqIGFzIGlvIGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuXG5pbXBvcnQgeyBJTklUX1dFQlNPQ0tFVCxcbiAgICAgICAgIFNFVF9TT0NLRVRfQ09OTkVDVEVELFxuICAgICAgICAgU0VUX1NPQ0tFVF9DT05ORUNURURfVVNFUlMgfVxuICAgIGZyb20gJy4uL2FjdGlvbnMvc29ja2V0QWN0aW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGUge1xuICAgIGlvOiBTb2NrZXRJT0NsaWVudC5Tb2NrZXQgfCBudWxsLFxuICAgIGNvbm5lY3RlZDogYm9vbGVhbixcbiAgICBjb25uZWN0ZWRVc2VyRW1haWxzOiBzdHJpbmdbXVxufVxuXG5sZXQgaW5pdGlhbFN0YXRlOiBTdGF0ZSA9IHtcbiAgICBpbzogbnVsbCxcbiAgICBjb25uZWN0ZWQ6IGZhbHNlLFxuICAgIGNvbm5lY3RlZFVzZXJFbWFpbHM6IFtdXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHN0YXRlOiBTdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uOiBBbnlBY3Rpb24pIHtcbiAgICBzd2l0Y2goYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBJTklUX1dFQlNPQ0tFVDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge2lvOiBhY3Rpb24uZGF0YS5pb30pO1xuICAgICAgICBjYXNlIFNFVF9TT0NLRVRfQ09OTkVDVEVEOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7Y29ubmVjdGVkOiBhY3Rpb24uZGF0YS5jb25uZWN0ZWR9KTtcbiAgICAgICAgY2FzZSBTRVRfU09DS0VUX0NPTk5FQ1RFRF9VU0VSUzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge2Nvbm5lY3RlZFVzZXJFbWFpbHM6IGFjdGlvbi5kYXRhLnVzZXJFbWFpbHMgfSlcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59IiwiaW1wb3J0IHtTRVRfQVVUSE9SSVpFRCwgU0VUX1VTRVIsIExPR09VVF9VU0VSLCBTRVRfSldUfSBmcm9tICcuLi9hY3Rpb25zL3VzZXJBY3Rpb25zJztcblxuZXhwb3J0IGludGVyZmFjZSBTdGF0ZSB7XG4gICAgYXV0aG9yaXplZD86IGJvb2xlYW4sXG4gICAgZW1haWw/OiBzdHJpbmcgfCBib29sZWFuLFxuICAgIG5hbWU/OiBzdHJpbmcgfCBib29sZWFuLFxuICAgIHJvbGU/OiBzdHJpbmcgfCBib29sZWFuLFxuICAgIGp3dD86IHN0cmluZyB8IGJvb2xlYW4sXG59XG5cbmludGVyZmFjZSBBY3Rpb24ge1xuICAgIHR5cGU6IHN0cmluZyxcbiAgICBkYXRhOiBhbnlcbn1cblxubGV0IGluaXRpYWxTdGF0ZSA6IFN0YXRlID0ge1xuICAgIGF1dGhvcml6ZWQ6IGZhbHNlLFxuICAgIGVtYWlsOiBmYWxzZSxcbiAgICBuYW1lOiBmYWxzZSxcbiAgICByb2xlOiBmYWxzZSxcbiAgICBqd3Q6IGZhbHNlLFxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHN0YXRlOiBTdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uOiBBY3Rpb24pIHtcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgU0VUX0FVVEhPUklaRUQ6XG4gICAgICAgICAgICBpZiAodHlwZW9mIGFjdGlvbi5kYXRhICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhIG11c3QgYmUgYm9vbGVhbiBmb3IgU0VUX0FVVEhPUklaRUQgYWN0aW9uJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFjdGlvbi5kYXRhID09PSBmYWxzZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHthdXRob3JpemVkOiBmYWxzZSwgZW1haWw6IGZhbHNlfSk7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHthdXRob3JpemVkOiBhY3Rpb24uZGF0YX0pO1xuICAgICAgICBjYXNlIFNFVF9VU0VSOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBhY3Rpb24uZGF0YSk7XG4gICAgICAgIGNhc2UgTE9HT1VUX1VTRVI6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGF1dGhvcml6ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG5hbWU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVtYWlsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICByb2xlOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICBjYXNlIFNFVF9KV1Q6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHt0b2tlbjogYWN0aW9uLmRhdGF9KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59IiwiaW1wb3J0IHtjcmVhdGVTdG9yZSwgY29tYmluZVJlZHVjZXJzLCBhcHBseU1pZGRsZXdhcmUsIFJlZHVjZXIsIFN0b3JlRW5oYW5jZXJ9IGZyb20gJ3JlZHV4JztcbmltcG9ydCByZWR1eFRodW5rIGZyb20gJ3JlZHV4LXRodW5rJztcbmltcG9ydCB7Y3JlYXRlTG9nZ2VyfSBmcm9tICdyZWR1eC1sb2dnZXInO1xuXG5pbXBvcnQgdXNlclJlZHVjZXIsIHtTdGF0ZSBhcyBVc2VyU3RhdGV9IGZyb20gJy4vcmVkdWNlcnMvdXNlcic7XG5pbXBvcnQgY2hhbm5lbHNSZWR1Y2VyLCB7U3RhdGUgYXMgQ2hhbm5lbHNTdGF0ZX0gZnJvbSAnLi9yZWR1Y2Vycy9jaGFubmVscyc7XG5pbXBvcnQgbm90aWZpY2F0aW9uc1JlZHVjZXIsIHtTdGF0ZSBhcyBOb3RpZmljYXRpb25zU3RhdGV9IGZyb20gJy4vcmVkdWNlcnMvbm90aWZpY2F0aW9ucyc7XG5pbXBvcnQgc2lkZWJhclJlZHVjZXIsIHtTdGF0ZSBhcyBTaWRlYmFyU3RhdGV9IGZyb20gJy4vcmVkdWNlcnMvc2lkZWJhcic7XG5pbXBvcnQgc29ja2V0UmVkdWNlciwge1N0YXRlIGFzIFNvY2tldFN0YXRlfSBmcm9tICcuL3JlZHVjZXJzL3NvY2tldCc7XG5pbXBvcnQgY2hhdFVzZXJzUmVkdWNlciwge1N0YXRlIGFzIENoYXRVc2Vyc1N0YXRlfSBmcm9tICcuL3JlZHVjZXJzL2NoYXRVc2Vycyc7XG5cbmNvbnN0IGVudiA9IHJlcXVpcmUoJy4uLy4uL2VudicpO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0YXRlIHtcbiAgICB1c2VyOiBVc2VyU3RhdGUsXG4gICAgY2hhbm5lbHM6IENoYW5uZWxzU3RhdGUsXG4gICAgbm90aWZpY2F0aW9uczogTm90aWZpY2F0aW9uc1N0YXRlLFxuICAgIHNpZGViYXI6IFNpZGViYXJTdGF0ZSxcbiAgICBzb2NrZXQ6IFNvY2tldFN0YXRlLFxuICAgIGNoYXRVc2VyczogQ2hhdFVzZXJzU3RhdGUsXG59XG5cbmV4cG9ydCBjb25zdCByb290UmVkdWNlcjogUmVkdWNlciA9IGNvbWJpbmVSZWR1Y2Vycyh7XG4gICAgdXNlcjogdXNlclJlZHVjZXIsXG4gICAgY2hhbm5lbHM6IGNoYW5uZWxzUmVkdWNlcixcbiAgICBub3RpZmljYXRpb25zOiBub3RpZmljYXRpb25zUmVkdWNlcixcbiAgICBzaWRlYmFyOiBzaWRlYmFyUmVkdWNlcixcbiAgICBzb2NrZXQ6IHNvY2tldFJlZHVjZXIsXG4gICAgY2hhdFVzZXJzOiBjaGF0VXNlcnNSZWR1Y2VyLFxufSk7XG5cbmV4cG9ydCBjb25zdCBtaWRkbGV3YXJlOiBTdG9yZUVuaGFuY2VyID1cbiAgICBlbnYucHJvZHVjdGlvbiB8fCBlbnYuZGlzYWJsZVJlZHV4TG9nZ2luZyA/XG4gICAgYXBwbHlNaWRkbGV3YXJlKHJlZHV4VGh1bmspIDogYXBwbHlNaWRkbGV3YXJlKHJlZHV4VGh1bmssIGNyZWF0ZUxvZ2dlcigpKTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU3RvcmUocm9vdFJlZHVjZXIsIG1pZGRsZXdhcmUpOyIsImltcG9ydCB7IGNvbm4sIGFwcCB9IGZyb20gJy4uL3NyYy9zZXJ2ZXIvc2VydmVyJztcbmltcG9ydCBVc2VyIGZyb20gJy4uL3NyYy9zZXJ2ZXIvbW9kZWxzL1VzZXInO1xuXG5jb25zdCBkcm9wQWxsQ29sbGVjdGlvbnMgPSAoKSA9PiB7XG4gICAgbGV0IHAgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIFVzZXIuZGVsZXRlTWFueSh7fSwgKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICB9KVxuICAgIH0pXG4gICAgcmV0dXJuIHAudGhlbigpLmNhdGNoKChlcnI6IGFueSkgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfSk7XG59XG5cbmNvbnN0IE5vdEltcGxlbWVudGVkRXJyb3IgPSBuZXcgRXJyb3IoJ1Rlc3Qgbm90IGltcGxlbWVudGVkJyk7XG5cbmJlZm9yZSgnYWxsIHRlc3RzJywgZnVuY3Rpb24oZG9uZSkge1xuICAgIC8vIHdhaXQgZm9yIGNvbm5lY3Rpb24gdG8gYmVnaW4gdGVzdHNcbiAgICBjb25zb2xlLmxvZyhwcm9jZXNzLnZlcnNpb24pO1xuICAgIGNvbm4ub24oJ2Nvbm5lY3RlZCcsICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NlcnZlciBzdGFydGVkJyk7XG4gICAgICAgIGRvbmUoKTtcbiAgICB9KTtcbn0pO1xuYmVmb3JlRWFjaCgncmVzZXQgREInLCBmdW5jdGlvbihkb25lKSB7XG4gICAgLy8gc3RhcnQgd2l0aCBhIGZyZXNoIGRhdGFiYXNlXG4gICAgZHJvcEFsbENvbGxlY3Rpb25zKCkudGhlbigoKSA9PiBkb25lKCkpO1xufSk7XG5hZnRlcignYWxsIHRlc3RzJywgZnVuY3Rpb24oZG9uZSkge1xuICAgIC8vIHRlYXJkb3duIERCXG4gICAgZHJvcEFsbENvbGxlY3Rpb25zKCkudGhlbigoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDbG9zaW5nIGNvbm5lY3Rpb25zJyk7XG4gICAgICAgIGNvbm4uY2xvc2UoKTtcbiAgICAgICAgZG9uZSgpO1xuICAgIH0pO1xufSlcblxuXG5cbi8qIFdlYiAqL1xucmVxdWlyZSgnLi93ZWIvdGVzdFN0b3JlJyk7XG5yZXF1aXJlKCcuL3dlYi90ZXN0QXN5bmNBY3Rpb25zJyk7XG5cbi8qIFNlcnZlciAqL1xucmVxdWlyZSgnLi9zZXJ2ZXIvdGVzdEF1dGhDb250cm9sbGVyJyk7XG5yZXF1aXJlKCcuL3NlcnZlci90ZXN0VXNlckNvbnRyb2xsZXInKTtcbnJlcXVpcmUoJy4vc2VydmVyL3Rlc3RNZXNzYWdlQ29udHJvbGxlcicpO1xucmVxdWlyZSgnLi9zZXJ2ZXIvdGVzdENoYW5uZWxDb250cm9sbGVyJyk7XG5cbmV4cG9ydCB7IGFwcCwgZHJvcEFsbENvbGxlY3Rpb25zLCBOb3RJbXBsZW1lbnRlZEVycm9yIH07XG4iLCJpbXBvcnQgKiBhcyByZXF1ZXN0IGZyb20gJ3N1cGVydGVzdCc7XG5pbXBvcnQgeyBoYXNoU3luYyB9IGZyb20gJ2JjcnlwdGpzJztcbmltcG9ydCB7IGFwcCwgZHJvcEFsbENvbGxlY3Rpb25zIH0gZnJvbSAnLi4vJztcbmltcG9ydCBVc2VyLCB7IElVc2VyIH0gZnJvbSAnLi4vLi4vc3JjL3NlcnZlci9tb2RlbHMvVXNlcic7XG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuY29uc3Qgc2Vzc2lvbiA9IHJlcXVpcmUoJ3N1cGVydGVzdC1zZXNzaW9uJyk7XG5cbmRlc2NyaWJlKCdBdXRoIENvbnRyb2xsZXInLCBmdW5jdGlvbigpIHtcbiAgICBkZXNjcmliZSgnUE9TVCAvYXBpL3YxL2xvZ2luJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIGRyb3BBbGxDb2xsZWN0aW9ucygpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB1c2VyOiBJVXNlciA9IG5ldyBVc2VyKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0FkcmlhbicsXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBoYXNoU3luYygndGVzdCcpLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiAndXNlcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdXNlci5zYXZlKCkudGhlbigodXNlcjogSVVzZXIpID0+IGRvbmUoKSkuY2F0Y2goKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBsb2dpbiB0aGUgdXNlcicsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL2xvZ2luJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAndGVzdCdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgbG9nZ2VkLWluIHVzZXIgZGV0YWlscycsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL2xvZ2luJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAndGVzdCdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycjogYW55LCByZXM6IHJlcXVlc3QuUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBqc29uOiBhbnkgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGpzb24uZW1haWwsICd0ZXN0QHRlc3QuY29tJyk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChqc29uLnJvbGUsICd1c2VyJyk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChqc29uLm5hbWUsICdBZHJpYW4nKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYW4gZXJyb3IgaWYgdGhlIGVtYWlsIGRvZXMgbm90IGV4aXN0JywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChhcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6ICd0ZXN0LmRvZXMubm90LmV4aXRAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogJ3Rlc3QnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMSlcbiAgICAgICAgICAgICAgICAuZW5kKChlcnI6IGFueSwgcmVzOiByZXF1ZXN0LlJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICBsZXQganNvbjogYW55ID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChqc29uLmVycm9yLCAnSW52YWxpZCBlbWFpbCBvciBwYXNzd29yZCcpO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBhbiBlcnJvciBpZiB0aGUgcGFzc3dvcmQgZG9lcyBub3QgbWF0Y2ggdGhlIGhhc2gnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS9sb2dpbicpXG4gICAgICAgICAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgICAgICAgICBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogJ3Rlc3QtaW52YWxpZC1wYXNzd29yZCdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAxKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycjogYW55LCByZXM6IHJlcXVlc3QuUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBqc29uOiBhbnkgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGpzb24uZXJyb3IsICdJbnZhbGlkIGVtYWlsIG9yIHBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGFuIGVycm9yIGlmIHRoZSBlbWFpbCBvciBwYXNzd29yZCBpcyBtaXNzaW5nJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChhcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICd0ZXN0J1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDApXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyOiBhbnksIHJlczogcmVxdWVzdC5SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGpzb246IGFueSA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoanNvbi5lcnJvciwgJ1BsZWFzZSBzdXBwbHkgYW4gZW1haWwgYW5kIHBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QoYXBwKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNlbmQoe2VtYWlsOiAndGVzdEB0ZXN0LmNvbSd9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmV4cGVjdCg0MDApXG4gICAgICAgICAgICAgICAgICAgICAgICAuZW5kKChlcnI6IGFueSwgcmVzOiByZXF1ZXN0LlJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQganNvbjogYW55ID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGpzb24uZXJyb3IsICdQbGVhc2Ugc3VwcGx5IGFuIGVtYWlsIGFuZCBwYXNzd29yZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBhbiBlcnJvciBpZiB0aGUgZW1haWwgaXMgbm90IHZhbGlkJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChhcHApLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgIC5zZW5kKHtlbWFpbDogJ25vdCBhbiBlbWFpbEBhc2RmJywgcGFzc3dvcmQ6ICcxMjM0J30pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDApXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyOiBhbnksIHJlczogcmVxdWVzdC5SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGpzb246IGFueSA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoanNvbi5lcnJvciwgJ05vdCBhIHZhbGlkIGVtYWlsIGFkZHJlc3MnKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdQT1NUIC9hcGkvdjEvcmVnaXN0ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgZHJvcEFsbENvbGxlY3Rpb25zKCkudGhlbigoKSA9PiBkb25lKCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZWdpc3RlciBhIHVzZXInLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcCkucG9zdCgnL2FwaS92MS9yZWdpc3RlcicpXG4gICAgICAgICAgICAgICAgLnNlbmQoe2VtYWlsOiAndGVzdEB0ZXN0LmNvbScsIHBhc3N3b3JkOiAndGVzdCd9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycjogYW55LCByZXM6IHJlcXVlc3QuUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYoZXJyKSByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICBVc2VyLmZpbmRCeUVtYWlsKCd0ZXN0QHRlc3QuY29tJykuZXhlYygpLnRoZW4oKHVzZXI6IElVc2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZmFpbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnI6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgY3JlYXRlIGFuIGFkbWluIHVzZXIgaWYgbm8gdXNlcnMgZXhpc3QnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChhcHApLnBvc3QoJy9hcGkvdjEvcmVnaXN0ZXInKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICd0ZXN0QHRlc3QuY29tJywgcGFzc3dvcmQ6ICd0ZXN0JyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycjogYW55LCByZXM6IHJlcXVlc3QuUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgVXNlci5maW5kQnlFbWFpbCgndGVzdEB0ZXN0LmNvbScpLmV4ZWMoKS50aGVuKCh1c2VyOiBJVXNlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmZhaWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCh1c2VyLnJvbGUsICdhZG1pbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGNyZWF0ZSBhIHJlZ3VsYXIgdXNlciBpZiB1c2VycyBleGlzdCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIGxldCB1ID0gbmV3IFVzZXIoe1xuICAgICAgICAgICAgICAgIG5hbWU6ICd0ZXN0JyxcbiAgICAgICAgICAgICAgICBlbWFpbDogJ2FkbWluQHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJ3Bhc3N3b3JkJyxcbiAgICAgICAgICAgICAgICByb2xlOiAnYWRtaW4nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdS5zYXZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdChhcHApLnBvc3QoJy9hcGkvdjEvcmVnaXN0ZXInKVxuICAgICAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsIHBhc3N3b3JkOiAndGVzdCcgfSlcbiAgICAgICAgICAgICAgICAgICAgLmV4cGVjdCgyMDApXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoKGVycjogYW55LCByZXM6IHJlcXVlc3QuUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICBVc2VyLmZpbmRCeUVtYWlsKCd0ZXN0QHRlc3QuY29tJykuZXhlYygpLnRoZW4oKHVzZXI6IElVc2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5mYWlsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCh1c2VyLnJvbGUsICd1c2VyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGFuIGVycm9yIGlmIGVtYWlsIG9yIHBhc3N3b3JkIG5vdCBwcm92aWRlZCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoYXBwKS5wb3N0KCcvYXBpL3YxL3JlZ2lzdGVyJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAndGVzdEB0ZXN0LmNvbScgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMClcbiAgICAgICAgICAgICAgICAuZW5kKChlcnI6IGFueSwgcmVzOiByZXF1ZXN0LlJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBqc29uOiBhbnkgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGpzb24uZXJyb3IsICdQbGVhc2Ugc3VwcGx5IGFuIGVtYWlsIGFuZCBwYXNzd29yZCcpO1xuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0KGFwcCkucG9zdCgnL2FwaS92MS9yZWdpc3RlcicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2VuZCh7cGFzc3dvcmQ6ICcxMjMnfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmVuZCgoZXJyOiBhbnksIHJlczogcmVxdWVzdC5SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVycikgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQganNvbjogYW55ID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGpzb24uZXJyb3IsICdQbGVhc2Ugc3VwcGx5IGFuIGVtYWlsIGFuZCBwYXNzd29yZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYW4gZXJyb3IgaWYgbm90IGEgdmFsaWQgZW1haWwnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcCkucG9zdCgnL2FwaS92MS9yZWdpc3RlcicpXG4gICAgICAgICAgICAgICAgLnNlbmQoe2VtYWlsOiAnbm90IGFuIGVtYWlsIEAgYXNkbGZrajtsJywgcGFzc3dvcmQ6ICcxMjM0J30pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDApXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyOiBhbnksIHJlczogcmVxdWVzdC5SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICBsZXQganNvbjogYW55ID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChqc29uLmVycm9yLCAnTm90IGEgdmFsaWQgZW1haWwgYWRkcmVzcycpO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdQT1NUIC9hcGkvdjEvbG9nb3V0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCB0ZXN0U2Vzc2lvbjogYW55O1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICB0ZXN0U2Vzc2lvbiA9IHNlc3Npb24oYXBwKTtcbiAgICAgICAgICAgIGRyb3BBbGxDb2xsZWN0aW9ucygpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB1c2VyOiBJVXNlciA9IG5ldyBVc2VyKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0FkcmlhbicsXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBoYXNoU3luYygndGVzdCcpLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiAndXNlcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdXNlci5zYXZlKCkudGhlbigodXNlcjogSVVzZXIpID0+IGRvbmUoKSkuY2F0Y2goKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBsb2cgb3V0IHRoZSB1c2VyJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgdGVzdFNlc3Npb24ucG9zdCgnL2FwaS92MS9sb2dpbicpXG4gICAgICAgICAgICAgICAgLnNlbmQoe2VtYWlsOiAndGVzdEB0ZXN0LmNvbScsIHBhc3N3b3JkOiAndGVzdCd9KS5lbmQoKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHRlc3RTZXNzaW9uLmdldCgnL2FwaS92MS91c2VyJykuc2VuZCgpLmV4cGVjdCgyMDApLmVuZCgoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXN0U2Vzc2lvbi5nZXQoJy9hcGkvdjEvbG9nb3V0Jykuc2VuZCgpLmV4cGVjdCgyMDApLmVuZCgoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlc3RTZXNzaW9uLmdldCgnL2FwaS92MS91c2VyJykuc2VuZCgpLmV4cGVjdCg0MDEpLmVuZChkb25lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdQT1NUIC9hcGkvdjEvdmVyaWZ5RW1haWwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgZHJvcEFsbENvbGxlY3Rpb25zKCkudGhlbigoKSA9PiBkb25lKCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCB2ZXJpZnkgYW4gZW1haWwgZ2l2ZW4gdGhlIGNvcnJlY3QgdmVyaWZpY2F0aW9uIGxpbmsnKTtcbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgdmVyaWZ5IGFuIGVtYWlsIHdpdGggYW4gaW5jb3JyZWN0IHZlcmlmaWNhdGlvbiBsaW5rJyk7XG4gICAgfSk7XG59KTsiLCJpbXBvcnQgKiBhcyByZXF1ZXN0IGZyb20gJ3N1cGVydGVzdCc7XG5pbXBvcnQgeyBoYXNoU3luYyB9IGZyb20gJ2JjcnlwdGpzJztcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuXG5pbXBvcnQgeyBhcHAsIGRyb3BBbGxDb2xsZWN0aW9ucyB9IGZyb20gJy4uLyc7XG5pbXBvcnQgVXNlciwgeyBJVXNlciB9IGZyb20gJy4uLy4uL3NyYy9zZXJ2ZXIvbW9kZWxzL1VzZXInO1xuXG5kZXNjcmliZSgnVXNlciBDb250cm9sbGVyJywgZnVuY3Rpb24oKSB7XG4gICAgbGV0IHRva2VuOiBzdHJpbmc7XG4gICAgbGV0IHVzZXJJbmZvID0ge1xuICAgICAgICBuYW1lOiAnQWRyaWFuJyxcbiAgICAgICAgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgcGFzc3dvcmQ6ICd0ZXN0JyxcbiAgICAgICAgcm9sZTogJ2FkbWluJ1xuICAgIH07XG5cbiAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgZHJvcEFsbENvbGxlY3Rpb25zKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdXNlcjogSVVzZXIgPSBuZXcgVXNlcih7XG4gICAgICAgICAgICAgICAgbmFtZTogdXNlckluZm8ubmFtZSxcbiAgICAgICAgICAgICAgICBlbWFpbDogdXNlckluZm8uZW1haWwsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IGhhc2hTeW5jKHVzZXJJbmZvLnBhc3N3b3JkKSxcbiAgICAgICAgICAgICAgICByb2xlOiB1c2VySW5mby5yb2xlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB1c2VyLnNhdmUoKS50aGVuKCh1c2VyOiBJVXNlcikgPT4ge1xuICAgICAgICAgICAgICAgIC8vIG9uY2UgdXNlciBpcyBjcmVhdGVkLCBsb2dpbiBhbmQgc3RvcmUgand0XG4gICAgICAgICAgICAgICAgcmVxdWVzdChhcHApXG4gICAgICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL2xvZ2luJylcbiAgICAgICAgICAgICAgICAgICAgLnNlbmQoe2VtYWlsOiB1c2VySW5mby5lbWFpbCwgcGFzc3dvcmQ6IHVzZXJJbmZvLnBhc3N3b3JkfSlcbiAgICAgICAgICAgICAgICAgICAgLmV4cGVjdCgyMDApXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoKGVycjogYW55LCByZXM6IHJlcXVlc3QuUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuID0gcmVzLmdldCgneC1hY2Nlc3MtdG9rZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5pc05vdE51bGwodG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmlzU3RyaW5nKHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5pc05vdEVtcHR5KHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnR0VUIC9hcGkvdjEvdXNlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIGZldGNoIHRoZSBsb2dnZWQgaW4gdXNlcicsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAuZ2V0KCcvYXBpL3YxL3VzZXInKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgyMDAsIChlcnI6IGFueSwgcmVzOiByZXF1ZXN0LlJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXMuYm9keS5uYW1lLCB1c2VySW5mby5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlcy5ib2R5LmVtYWlsLCB1c2VySW5mby5lbWFpbCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXMuYm9keS5yb2xlLCB1c2VySW5mby5yb2xlKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm5vdFByb3BlcnR5KHJlcy5ib2R5LCAncGFzc3dvcmQnKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIG5vdCBsb2dnZWQgaW4nLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChhcHApXG4gICAgICAgICAgICAgICAgLmdldCgnL2FwaS92MS91c2VyJylcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMSwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdHRVQgL2FwaS92MS91c2VycycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIHJlY2VpdmUgYSBsaXN0IG9mIHVzZXJzJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoYXBwKVxuICAgICAgICAgICAgICAgIC5nZXQoJy9hcGkvdjEvdXNlcnMnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgyMDAsIChlcnI6IGFueSwgcmVzOiByZXF1ZXN0LlJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXMuYm9keS51c2Vycy5sZW5ndGgsIDEpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuaW5jbHVkZShyZXMuYm9keS51c2Vyc1swXSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdXNlckluZm8ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU6IHVzZXJJbmZvLnJvbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogdXNlckluZm8uZW1haWxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm5vdFByb3BlcnR5KHJlcy5ib2R5LnVzZXJzWzBdLCAncGFzc3dvcmQnKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIG5vdCBsb2dnZWQgaW4nLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChhcHApXG4gICAgICAgICAgICAgICAgLmdldCgnL2FwaS92MS91c2VycycpXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDEsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnR0VUIC9hcGkvdjEvdXNlci86ZW1haWwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXRyaWV2ZSBhIHVzZXIgYnkgZW1haWwnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChhcHApXG4gICAgICAgICAgICAgICAgLmdldCgnL2FwaS92MS91c2VyLycgKyB1c2VySW5mby5lbWFpbClcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwLCAoZXJyOiBhbnksIHJlczogcmVxdWVzdC5SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuaGFzQWxsS2V5cyhyZXMuYm9keS51c2VyLCBbJ2VtYWlsJywgJ25hbWUnLCAncm9sZScsICdfaWQnLCAnY3JlYXRlZCddKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmluY2x1ZGUocmVzLmJvZHkudXNlciwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6IHVzZXJJbmZvLmVtYWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdXNlckluZm8ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU6IHVzZXJJbmZvLnJvbGUsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgZW1haWwgZG9lcyBub3QgZXhpc3QnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChhcHApXG4gICAgICAgICAgICAgICAgLmdldCgnL2FwaS92MS91c2VyL25vdC5pbi51c2VAdGVzdC5jb20nKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDAsIChlcnI6IGFueSwgcmVzOiByZXF1ZXN0LlJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5pc1N0cmluZyhyZXMuYm9keS5lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXMuYm9keS5lcnJvciwgJ05vIHVzZXIgZm91bmQgd2l0aCB0aGF0IGVtYWlsJyk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiBub3QgYSB2YWxpZCBlbWFpbCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAuZ2V0KCcvYXBpL3YxL3VzZXIvbm90LWFuLWVtYWlsJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwLCAoZXJyOiBhbnksIHJlczogcmVxdWVzdC5SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuaXNTdHJpbmcocmVzLmJvZHkuZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocmVzLmJvZHkuZXJyb3IsICdQbGVhc2Ugc3VwcGx5IGEgdmFsaWQgZW1haWwnKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnUE9TVCAvYXBpL3YxL3VzZXIvdXBkYXRlL2VtYWlsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KFwic2hvdWxkIHVwZGF0ZSB0aGUgbG9nZ2VkIGluIHVzZXIncyBlbWFpbFwiLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgbGV0IG5ld0VtYWlsID0gJ25ldy5lbWFpbEB0ZXN0LmNvbSc7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9lbWFpbCcpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiBuZXdFbWFpbCB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwLCAoZXJyOiBhbnksIHJlczogcmVxdWVzdC5SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoJy9hcGkvdjEvdXNlcicpXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuZWVkIHRvIHVzZSBuZXcgYWNjZXNzIHRva2VuXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHJlcy5nZXQoJ3gtYWNjZXNzLXRva2VuJykpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMCwgKGVycjogYW55LCByZXM6IHJlcXVlc3QuUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocmVzLmJvZHkubmFtZSwgdXNlckluZm8ubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlcy5ib2R5LmVtYWlsLCBuZXdFbWFpbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlcy5ib2R5LnJvbGUsIHVzZXJJbmZvLnJvbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIG5ldyBlbWFpbCBpcyBub3QgdmFsaWQnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChhcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvZW1haWwnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ25vdCBhbiBlbWFpbCcgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMCwgZG9uZSk7XG4gICAgICAgIH0pXG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiBlbWFpbCBhbHJlYWR5IGluIHVzZScsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9lbWFpbCcpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAndGVzdEB0ZXN0LmNvbScgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMCwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgbm90IGF1dGhvcml6ZWQnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChhcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvZW1haWwnKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAxLCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ1BPU1QgL2FwaS92MS91c2VyL3VwZGF0ZS9uYW1lJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgdXBkYXRlIG5hbWUnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgbGV0IG5ld05hbWUgPSAnbmV3IG5hbWUnO1xuICAgICAgICAgICAgcmVxdWVzdChhcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvbmFtZScpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IG5hbWU6IG5ld05hbWUgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMCwgKGVycjogYW55LCByZXM6IHJlcXVlc3QuUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdChhcHApXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KCcvYXBpL3YxL3VzZXInKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCByZXMuZ2V0KCd4LWFjY2Vzcy10b2tlbicpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmV4cGVjdCgyMDAsIChlcnI6IGFueSwgcmVzOiByZXF1ZXN0LlJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlcy5ib2R5Lm5hbWUsIG5ld05hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXMuYm9keS5lbWFpbCwgdXNlckluZm8uZW1haWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXMuYm9keS5yb2xlLCB1c2VySW5mby5yb2xlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiBub3QgYXV0aG9yaXplZCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICBsZXQgbmV3TmFtZSA9ICduZXcgbmFtZSc7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9uYW1lJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7IG5hbWU6IG5ld05hbWUgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMSwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdQT1NUIC9hcGkvdjEvdXNlci91cGRhdGUvcGFzc3dvcmQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCB1cGRhdGUgcGFzc3dvcmQnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgbGV0IG5ld1Bhc3MgPSAnbmV3cGFzcyc7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9wYXNzd29yZCcpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IG9sZFBhc3M6IHVzZXJJbmZvLnBhc3N3b3JkLCBuZXdQYXNzOiBuZXdQYXNzIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgyMDAsIChlcnI6IGFueSwgcmVzOiByZXF1ZXN0LlJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QoYXBwKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogdXNlckluZm8uZW1haWwsIHBhc3N3b3JkOiBuZXdQYXNzIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMCwgZG9uZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgdXBkYXRpbmcgcGFzc3dvcmQgaWYgY3VycmVudCBwYXNzd29yZCBpbnZhbGlkJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvcGFzc3dvcmQnKVxuICAgICAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgICAgICAuc2VuZCh7IG9sZFBhc3M6ICd3cm9uZyBwYXNzd29yZCcsIG5ld1Bhc3M6ICcxMjM0MTIzNCcgfSlcbiAgICAgICAgICAgICAgICAgICAgLmV4cGVjdCg0MDAsIGRvbmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCB1cGRhdGluZyBwYXNzd29yZCBpZiBub3QgYXV0aG9yaXplZCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9wYXNzd29yZCcpXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDEsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnUE9TVCAvYXBpL3YxL3VzZXIvY3JlYXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBuZXdVc2VyID0ge1xuICAgICAgICAgICAgZW1haWw6ICd0ZXN0MTIzQHRlc3QuY29tJyxcbiAgICAgICAgICAgIG5hbWU6ICdOZXcgVXNlcicsXG4gICAgICAgICAgICByb2xlOiAndXNlcicsXG4gICAgICAgIH1cbiAgICAgICAgaXQoJ3Nob3VsZCBjcmVhdGUgYSBuZXcgdXNlcicsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIC8vIGFzc2VydCB0aGF0IHVzZXIgZG9lc24ndCBhbHJlYWR5IGV4aXN0LCBmb3Igc2FuaXR5XG4gICAgICAgICAgICBVc2VyLmZpbmRCeUVtYWlsKG5ld1VzZXIuZW1haWwpLmNvdW50RG9jdW1lbnRzKChlcnIsIGNvdW50OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChjb3VudCwgMCwgJ1VzZXIgc2hvdWxkIG5vdCBleGlzdCB3aXRoIGVtYWlsIHRlc3QxMjNXdGVzdC5jb20nKTtcbiAgICAgICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvdXNlci9jcmVhdGUnKVxuICAgICAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgICAgICAuc2VuZChuZXdVc2VyKVxuICAgICAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMCwgKGVycjogYW55LCByZXM6IHJlcXVlc3QuUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICBVc2VyLmZpbmRCeUVtYWlsKG5ld1VzZXIuZW1haWwpLmV4ZWMoKGVyciwgdXNlcjogSVVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwSW5jbHVkZSh1c2VyLCBuZXdVc2VyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiB1c2VyIG1ha2luZyByZXF1ZXN0IGlzIG5vdCBhbiBhZG1pbicsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIGxldCB1c2VyOiBJVXNlciA9IG5ldyBVc2VyKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBuZXdVc2VyLm5hbWUsXG4gICAgICAgICAgICAgICAgZW1haWw6IG5ld1VzZXIuZW1haWwsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IGhhc2hTeW5jKCdwYXNzd29yZCcpLFxuICAgICAgICAgICAgICAgIHJvbGU6IG5ld1VzZXIucm9sZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdXNlci5zYXZlKCkudGhlbigodXNlcjogSVVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBvbmNlIHVzZXIgaXMgY3JlYXRlZCwgbG9naW4gYW5kIHN0b3JlIGp3dFxuICAgICAgICAgICAgICAgIHJlcXVlc3QoYXBwKVxuICAgICAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS9sb2dpbicpXG4gICAgICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6IG5ld1VzZXIuZW1haWwsIHBhc3N3b3JkOiAncGFzc3dvcmQnIH0pXG4gICAgICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwKVxuICAgICAgICAgICAgICAgICAgICAuZW5kKChlcnI6IGFueSwgcmVzOiByZXF1ZXN0LlJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IHJlcy5nZXQoJ3gtYWNjZXNzLXRva2VuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL2NyZWF0ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMSwgZG9uZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgdXNlciBpcyBub3QgbG9nZ2VkIGluJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChhcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvdXNlci9jcmVhdGUnKVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAxLCBkb25lKTtcbiAgICAgICAgfSlcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIGVtYWlsIGlzIG5vdCB2YWxpZCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL3VzZXIvY3JlYXRlJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6ICdub3QgdmFsaWQnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBuZXdVc2VyLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IG5ld1VzZXIucm9sZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDAsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIHJvbGUgbm90IHZhbGlkJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChhcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvdXNlci9jcmVhdGUnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgICAgICAgICBlbWFpbDogbmV3VXNlci5lbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogbmV3VXNlci5uYW1lLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiAnbm90IHZhbGlkJ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDAsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIGVtYWlsIGFkZHJlc3MgYWxyZWFkeSBpbiB1c2UnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL2NyZWF0ZScpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VySW5mby5lbWFpbCwgLy9hbHJlYWR5IGluIHVzZVxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBuZXdVc2VyLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IG5ld1VzZXIucm9sZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDAsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnUFVUIC9hcGkvdjEvdXNlci91cGRhdGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IG5ld1VzZXJJbmZvID0ge1xuICAgICAgICAgICAgbmFtZTogJ05ldyBOYW1lJyxcbiAgICAgICAgICAgIGVtYWlsOiAnbmV3ZW1haWxAdGVzdC5jb20nLFxuICAgICAgICAgICAgcm9sZTogJ3VzZXInXG4gICAgICAgIH07XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB1cGRhdGUgdGhlIHVzZXInLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAucHV0KCcvYXBpL3YxL3VzZXIvdXBkYXRlJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHtlbWFpbDogdXNlckluZm8uZW1haWwsIHVzZXI6IG5ld1VzZXJJbmZvfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMCwgKGVycjogYW55LCByZXM6IHJlcXVlc3QuUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgVXNlci5maW5kQnlFbWFpbChuZXdVc2VySW5mby5lbWFpbCkuZXhlYygoZXJyOiBhbnksIHVzZXI6IElVc2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmlzTm90TnVsbCh1c2VyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwSW5jbHVkZSh1c2VyLCBuZXdVc2VySW5mbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIHVzZXIgd2l0aCBlbWFpbCBkb2VzIG5vdCBleGlzdCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoYXBwKVxuICAgICAgICAgICAgICAgIC5wdXQoJy9hcGkvdjEvdXNlci91cGRhdGUnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoe2VtYWlsOiAnZG9lc25vdGV4aXN0QHRlc3QuY29tJywgdXNlcjogbmV3VXNlckluZm99KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDA0LCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiBuZXcgZW1haWwgbm90IHZhbGlkJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChhcHApXG4gICAgICAgICAgICAgICAgLnB1dCgnL2FwaS92MS91c2VyL3VwZGF0ZScpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VySW5mby5lbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogT2JqZWN0LmFzc2lnbih7fSwgbmV3VXNlckluZm8sIHtlbWFpbDogJ25vdCB2YWxpZCd9KVxuICAgICAgICAgICAgICAgIH0pLmV4cGVjdCg0MDAsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIHJvbGUgbm90IHZhbGlkJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChhcHApXG4gICAgICAgICAgICAgICAgLnB1dCgnL2FwaS92MS91c2VyL3VwZGF0ZScpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VySW5mby5lbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogT2JqZWN0LmFzc2lnbih7fSwgbmV3VXNlckluZm8sIHsgcm9sZTogJ25vdCB2YWxpZCcgfSlcbiAgICAgICAgICAgICAgICB9KS5leHBlY3QoNDAwLCBkb25lKTtcbiAgICAgICAgfSlcbiAgICB9KTtcbn0pOyIsImltcG9ydCAnbW9jaGEnO1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IE1vY2tBZGFwdGVyIGZyb20gJ2F4aW9zLW1vY2stYWRhcHRlcic7XG5pbXBvcnQgY29uZmlndXJlU3RvcmUsIHsgTW9ja1N0b3JlQ3JlYXRvciwgTW9ja1N0b3JlRW5oYW5jZWQgfSBmcm9tICdyZWR1eC1tb2NrLXN0b3JlJ1xuaW1wb3J0IHRodW5rIGZyb20gJ3JlZHV4LXRodW5rJ1xuaW1wb3J0IHsgdXBkYXRlTmFtZSwgdXBkYXRlRW1haWwsIHVwZGF0ZVBhc3N3b3JkIH0gZnJvbSAnLi4vLi4vc3JjL3dlYi9hY3Rpb25zL3VzZXJBY3Rpb25zJztcbmltcG9ydCB7IEFueUFjdGlvbiB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IEFERF9JTkZPLCBBRERfRVJST1IsIGFkZEVycm9yLCBhZGRJbmZvIH0gZnJvbSAnLi4vLi4vc3JjL3dlYi9hY3Rpb25zL25vdGlmaWNhdGlvbnNBY3Rpb25zJztcbmltcG9ydCB7IENoYW5uZWwsIE1lc3NhZ2UgfSBmcm9tICcuLi8uLi9zcmMvd2ViL3JlZHVjZXJzL2NoYW5uZWxzJztcbmltcG9ydCB7IGluaXQgYXMgaW5pdFdlYnNvY2tldENvbm5lY3Rpb24sIElOSVRfV0VCU09DS0VUIH0gZnJvbSAnLi4vLi4vc3JjL3dlYi9hY3Rpb25zL3NvY2tldEFjdGlvbnMnO1xuaW1wb3J0IHsgZmV0Y2hDaGFubmVscywgQUREX0NIQU5ORUxTLCBhZGRDaGFubmVscywgcmV0cmlldmVDaGFubmVsTWVzc2FnZXMsIHNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzLCBzZXRDaGFubmVsSGFzTW9yZU1lc3NhZ2VzLCBpbmNyZW1lbnRDaGFubmVsUmV0cmlldmVNZXNzYWdlc09mZnNldCwgYWRkUmV0cmlldmVkQ2hhbm5lbE1lc3NhZ2VzLCBkZWxldGVDaGFubmVsLCBhZGRDaGFubmVsIH0gZnJvbSAnLi4vLi4vc3JjL3dlYi9hY3Rpb25zL2NoYW5uZWxzQWN0aW9ucyc7XG5pbXBvcnQgeyBmZXRjaEFsbFVzZXJzLCB1cGRhdGVVc2VycyB9IGZyb20gJy4uLy4uL3NyYy93ZWIvYWN0aW9ucy9jaGF0VXNlcnNBY3Rpb25zJztcbmltcG9ydCB7IFN0YXRlIGFzIENoYXRVc2Vyc1N0YXRlIH0gZnJvbSAnLi4vLi4vc3JjL3dlYi9yZWR1Y2Vycy9jaGF0VXNlcnMnO1xuaW1wb3J0IHsgU3RhdGUgfSBmcm9tICcuLi8uLi9zcmMvd2ViL3N0b3JlJztcblxuY29uc3QgbW9ja1N0b3JlQ3JlYXRvcjogTW9ja1N0b3JlQ3JlYXRvciA9IGNvbmZpZ3VyZVN0b3JlKFt0aHVua10pO1xuXG5mdW5jdGlvbiBnZXRTdG9yZShzdG9yZSA9IHt9KTogTW9ja1N0b3JlRW5oYW5jZWQ8e30gfCBTdGF0ZT4ge1xuICAgIHJldHVybiBtb2NrU3RvcmVDcmVhdG9yKHN0b3JlKTtcbn1cblxuZGVzY3JpYmUoJ0FzeW5jIEFjdGlvbnMnLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgbW9ja1N0b3JlOiBNb2NrU3RvcmVFbmhhbmNlZDx7fSwgYW55PjtcbiAgICBsZXQgbW9ja0F4aW9zOiBNb2NrQWRhcHRlcjtcblxuICAgIGJlZm9yZShmdW5jdGlvbigpIHtcbiAgICAgICAgbW9ja0F4aW9zID0gbmV3IE1vY2tBZGFwdGVyKGF4aW9zKTtcbiAgICB9KTtcblxuICAgIGFmdGVyKGZ1bmN0aW9uKCkge1xuICAgICAgICBtb2NrQXhpb3MucmVzdG9yZSgpO1xuICAgIH0pO1xuICAgIFxuICAgIGRlc2NyaWJlKCdVc2VyIGFzeW5jIGFjdGlvbnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBtb2NrU3RvcmUgPSBnZXRTdG9yZSgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3Mub25BbnkoKS5yZXBseSgyMDAsIHt9KVxuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBoYW5kbGUgY2FsbGJhY2sgYW5kIHNldCBpbmZvICcgK1xuICAgICAgICAgICAnb24gc3VjY2Vzc2Z1bCBwb3N0IHJlcXVlc3QgdG8gL2FwaS92MS91c2VyL3VwZGF0ZS9uYW1lJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgICAgIGxldCBuYW1lIDogZmFsc2UgfCBzdHJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAgICAgLmRpc3BhdGNoKHVwZGF0ZU5hbWUoJ0FkcmlhbicsICgpID0+IG5hbWUgPSAnQWRyaWFuJykpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChuYW1lLCAnQWRyaWFuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25zOiBBbnlBY3Rpb25bXSA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogQUREX0lORk8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJ05hbWUgdXBkYXRlZCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHNldCBhbiBlcnJvciBvbiBmYWlsZWQgcG9zdCByZXF1ZXN0IHRvIC9hcGkvdjEvdXNlci91cGRhdGUvbmFtZScsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIGxldCBuYW1lIDogZmFsc2UgfCBzdHJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zLm9uUG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9uYW1lJykucmVwbHkoNTAwLCB7ZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZyd9KTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaCh1cGRhdGVOYW1lKCdBZHJpYW4nLCAoKSA9PiBuYW1lID0gJ0FkcmlhbicpKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG5hbWUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uczogQW55QWN0aW9uW10gPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBBRERfRVJST1IsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnXG4gICAgICAgICAgICAgICAgICAgIH1dKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBoYW5kbGUgY2FsbGJhY2sgYW5kIHNldCBpbmZvICcgK1xuICAgICAgICAgICAnb24gc3VjY2Vzc2Z1bCBwb3N0IHJlcXVlc3QgdG8gL2FwaS92MS91c2VyL3VwZGF0ZS9lbWFpbCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIGxldCBlbWFpbDogZmFsc2UgfCBzdHJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaCh1cGRhdGVFbWFpbCgndGVzdEB0ZXN0LmNvbScsICgpID0+IGVtYWlsID0gJ3Rlc3RAdGVzdC5jb20nKSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChlbWFpbCwgJ3Rlc3RAdGVzdC5jb20nKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uczogQW55QWN0aW9uW10gPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBBRERfSU5GTyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICdFbWFpbCB1cGRhdGVkJ1xuICAgICAgICAgICAgICAgICAgICB9XSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgc2V0IGFuIGVycm9yIG9uIGZhaWxlZCBwb3N0IHJlcXVlc3QgdG8gL2FwaS92MS91c2VyL3VwZGF0ZS9lbWFpbCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIGxldCBlbWFpbDogZmFsc2UgfCBzdHJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zLm9uUG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9lbWFpbCcpLnJlcGx5KDUwMCwgeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyB9KTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaCh1cGRhdGVFbWFpbCgndGVzdEB0ZXN0LmNvbScsICgpID0+IGVtYWlsID0gJ3Rlc3RAdGVzdC5jb20nKSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKGVtYWlsKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uczogQW55QWN0aW9uW10gPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBBRERfRVJST1IsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnXG4gICAgICAgICAgICAgICAgICAgIH1dKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGRvbmUpO1xuICAgICAgICB9KVxuICAgICAgICBpdCgnc2hvdWxkIHNldCBpbmZvIG9uIHN1Y2Nlc3NmdWwgcG9zdCByZXF1ZXN0IHRvIC9hcGkvdjEvdXNlci91cGRhdGUvcGFzc3dvcmQnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICBsZXQgdXBkYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgbW9ja1N0b3JlLmRpc3BhdGNoKHVwZGF0ZVBhc3N3b3JkKCdhJywgJ2InLCAoKSA9PiB1cGRhdGVkID0gdHJ1ZSkpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuaXNUcnVlKHVwZGF0ZWQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25zOiBBbnlBY3Rpb25bXSA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEFERF9JTkZPLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJ1Bhc3N3b3JkIHVwZGF0ZWQnXG4gICAgICAgICAgICAgICAgICAgIH1dKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBzZXQgYW4gZXJyb3Igb24gZmFpbGVkIHBvc3QgcmVxdWVzdCB0byAvYXBpL3YxL3VzZXIvdXBkYXRlL3Bhc3N3b3JkJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgbGV0IHVwZGF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zLm9uUG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9wYXNzd29yZCcpLnJlcGx5KDUwMCwgeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyB9KTtcbiAgICAgICAgICAgIG1vY2tTdG9yZS5kaXNwYXRjaCh1cGRhdGVQYXNzd29yZCgnYScsICdiJywgKCkgPT4gdXBkYXRlZCA9IHRydWUpKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UodXBkYXRlZCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnM6IEFueUFjdGlvbltdID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogQUREX0VSUk9SLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJ1NvbWV0aGluZyB3ZW50IHdyb25nJ1xuICAgICAgICAgICAgICAgICAgICB9XSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChkb25lKTtcbiAgICAgICAgfSlcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnQ2hhbm5lbHMgYXN5bmMgYWN0aW9ucycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBSZXRyaWV2ZSBjaGFubmVsIG1lc3NhZ2VzIGFjdGlvbiBjaGVja3Mgc3RvcmUgdG8gdmVyaWZ5IHRoYXQgY2hhbm5lbFxuICAgICAgICAgICAgLy8gd2l0aCBnaXZlbiBuYW1lIGFscmVhZHkgZXhpc3RzXG4gICAgICAgICAgICBtb2NrU3RvcmUgPSBtb2NrU3RvcmVDcmVhdG9yKHtcbiAgICAgICAgICAgICAgICBjaGFubmVsczogW1xuICAgICAgICAgICAgICAgICAgICB7IG5hbWU6ICdnZW5lcmFsJywgZmV0Y2hpbmdOZXdNZXNzYWdlczogZmFsc2UsIGhhc01vcmVNZXNzYWdlczogdHJ1ZSwgcmV0cmlldmVNZXNzYWdlc09mZnNldDogMCB9LFxuICAgICAgICAgICAgICAgICAgICB7IG5hbWU6ICdmZXRjaGluZyBuZXcgbWVzc2FnZXMnLCBmZXRjaGluZ05ld01lc3NhZ2VzOiB0cnVlLCBoYXNNb3JlTWVzc2FnZXM6IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBuYW1lOiAnbm8gbW9yZSBtZXNzYWdlcycsIGZldGNoaW5nTmV3TWVzc2FnZXM6IGZhbHNlLCBoYXNNb3JlTWVzc2FnZXM6IGZhbHNlIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zLm9uQW55KCkucmVwbHkoMjAwLCB7fSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZldGNoIGNoYW5uZWxzIGFuZCBkaXNwYXRjaCBhZGRDaGFubmVscyB3aXRoIGFuIGFycmF5IG9mIGNoYW5uZWwgbmFtZXMnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICBsZXQgY2hhbm5lbHM6IHtfaWQ6IHN0cmluZywgbmFtZTogc3RyaW5nfVtdID0gW1xuICAgICAgICAgICAgICAgIHtfaWQ6ICcxJywgbmFtZTogJ2dlbmVyYWwnfSxcbiAgICAgICAgICAgICAgICB7X2lkOiAnMicsIG5hbWU6ICdyYW5kb20nfSxcbiAgICAgICAgICAgICAgICB7X2lkOiAnMycsIG5hbWU6ICdzb21ldGhpbmcgZWxzZSd9XTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zXG4gICAgICAgICAgICAgICAgLm9uR2V0KCcvYXBpL3YxL2NoYW5uZWxzJylcbiAgICAgICAgICAgICAgICAucmVwbHkoMjAwLCB7Y2hhbm5lbHM6IGNoYW5uZWxzfSk7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2goZmV0Y2hDaGFubmVscygpKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uczogQW55QWN0aW9uW10gPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhZGRDaGFubmVsc0FjdGlvbiA9IGFkZENoYW5uZWxzKFsnZ2VuZXJhbCcsICdyYW5kb20nLCAnc29tZXRoaW5nIGVsc2UnXSk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW2FkZENoYW5uZWxzQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChkb25lKVxuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCBhZGRFcnJvciBvbiBmYWlsZWQgcmVxdWVzdCB0byAvYXBpL3YxL2NoYW5uZWxzJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3NcbiAgICAgICAgICAgICAgICAub25HZXQoJy9hcGkvdjEvY2hhbm5lbHMnKVxuICAgICAgICAgICAgICAgIC5yZXBseSg1MDApO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKGZldGNoQ2hhbm5lbHMoKSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnM6IEFueUFjdGlvbltdID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXJyb3JBY3Rpb24gPSBhZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIGZldGNoIHRoZSBjaGFubmVscycpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFtlcnJvckFjdGlvbl0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZG9uZSlcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZGlzcGF0Y2ggYW4gZXJyb3IgaWYgcmV0cmlldmluZyBtZXNzYWdlcyB3aXRoIGludmFsaWQgY2hhbm5lbCBuYW1lJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKHJldHJpZXZlQ2hhbm5lbE1lc3NhZ2VzKCdpbnZhbGlkIG5hbWUnKSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKG1zZzogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwobXNnLCAnUmV0cmlldmUgQ2hhbm5lbCBNZXNzYWdlcyBkaXNwYXRjaGVkIHdpdGggaW5jb3JyZWN0IGNoYW5uZWwgbmFtZSBvciB3aGlsZSBhbHJlYWR5IGZldGNoaW5nIG1lc3NhZ2VzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25zOiBBbnlBY3Rpb25bXSA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnJvckFjdGlvbiA9IGFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gZmV0Y2ggbWVzc2FnZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW2Vycm9yQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCBhbiBlcnJvciBpZiBhbHJlYWR5IHJldHJpZXZpbmcgY2hhbm5lbCBtZXNzYWdlcycsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChyZXRyaWV2ZUNoYW5uZWxNZXNzYWdlcygnZmV0Y2hpbmcgbmV3IG1lc3NhZ2VzJykpXG4gICAgICAgICAgICAgICAgLnRoZW4oKG1zZzogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChtc2csICdSZXRyaWV2ZSBDaGFubmVsIE1lc3NhZ2VzIGRpc3BhdGNoZWQgd2l0aCBpbmNvcnJlY3QgY2hhbm5lbCBuYW1lIG9yIHdoaWxlIGFscmVhZHkgZmV0Y2hpbmcgbWVzc2FnZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uczogQW55QWN0aW9uW10gPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnJvckFjdGlvbiA9IGFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gZmV0Y2ggbWVzc2FnZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbZXJyb3JBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCBhbiBlcnJvciBpZiBjaGFubmVsIGRvZXMgbm90IGhhdmUgb2xkZXIgbWVzc2FnZXMnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2gocmV0cmlldmVDaGFubmVsTWVzc2FnZXMoJ25vIG1vcmUgbWVzc2FnZXMnKSlcbiAgICAgICAgICAgICAgICAudGhlbigobXNnOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG1zZywgJ1JldHJpZXZlIENoYW5uZWwgTWVzc2FnZXMgZGlzcGF0Y2hlZCB3aXRoIGluY29ycmVjdCBjaGFubmVsIG5hbWUgb3Igd2hpbGUgYWxyZWFkeSBmZXRjaGluZyBtZXNzYWdlcycpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25zOiBBbnlBY3Rpb25bXSA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yQWN0aW9uID0gYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBmZXRjaCBtZXNzYWdlcycpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFtlcnJvckFjdGlvbl0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGRpc3BhdGNoIGFuIGVycm9yIG9uIGZhaWxlZCBnZXQgcmVxdWVzdCB0byAvYXBpL3YxL21lc3NhZ2VzLycsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zXG4gICAgICAgICAgICAgICAgLm9uR2V0KClcbiAgICAgICAgICAgICAgICAucmVwbHkoNTAwKTtcbiAgICAgICAgICAgIGxldCBjaGFubmVsOiBzdHJpbmcgPSAnZ2VuZXJhbCc7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2gocmV0cmlldmVDaGFubmVsTWVzc2FnZXMoY2hhbm5lbCkpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25zOiBBbnlBY3Rpb25bXSA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNldEZldGNoaW5nVHJ1ZUFjdGlvbiA9IHNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzKGNoYW5uZWwsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnJvckFjdGlvbiA9IGFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gZmV0Y2ggbWVzc2FnZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2V0RmV0Y2hpbmdGYWxzZUFjdGlvbiA9IHNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzKGNoYW5uZWwsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbc2V0RmV0Y2hpbmdUcnVlQWN0aW9uLCBlcnJvckFjdGlvbiwgc2V0RmV0Y2hpbmdGYWxzZUFjdGlvbl0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHNldCBjaGFubmVsSGFzTW9yZU1lc3NhZ2VzIG9uIHJlc3BvbnNlIHdpdGggZW1wdHkgYXJyYXknLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvc1xuICAgICAgICAgICAgICAgIC5vbkdldCgpXG4gICAgICAgICAgICAgICAgLnJlcGx5KDIwMCwgeyBtZXNzYWdlczogW119KTtcbiAgICAgICAgICAgIGxldCBjaGFubmVsOiBzdHJpbmcgPSAnZ2VuZXJhbCc7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2gocmV0cmlldmVDaGFubmVsTWVzc2FnZXMoY2hhbm5lbCkpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25zOiBBbnlBY3Rpb25bXSA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNldEZldGNoaW5nVHJ1ZUFjdGlvbiA9IHNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzKGNoYW5uZWwsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZXRIYXNNb3JlQWN0aW9uID0gc2V0Q2hhbm5lbEhhc01vcmVNZXNzYWdlcyhjaGFubmVsLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNldEZldGNoaW5nRmFsc2VBY3Rpb24gPSBzZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcyhjaGFubmVsLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW3NldEZldGNoaW5nVHJ1ZUFjdGlvbiwgc2V0SGFzTW9yZUFjdGlvbiwgc2V0RmV0Y2hpbmdGYWxzZUFjdGlvbl0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGluY3JlbWVudCBvZmZzZXQgKGJhc2VkIG9uIG51bWJlciBvZiByZWNlaXZlZCBtZXNzYWdlcykgYW5kIGFkZCByZXRyaWV2ZWQgY2hhbm5lbCBtZXNzYWdlcyBvbiBzdWNjZXNzZnVsIHJldHJlaXZlQ2hhbm5lbE1lc3NhZ2VzIGFjdGlvbicsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIGxldCBjaGFubmVsOiBzdHJpbmcgPSAnZ2VuZXJhbCc7XG4gICAgICAgICAgICBsZXQgbWVzc2FnZXM6IE1lc3NhZ2VbXSA9IFt7XG4gICAgICAgICAgICAgICAgdGV4dDogJzEyMycsXG4gICAgICAgICAgICAgICAgY3JlYXRlZDogRGF0ZS5ub3coKS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgIHVzZXJFbWFpbDogJ3Rlc3RAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgIF9pZDogJzEnXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdGV4dDogJzQ1NicsXG4gICAgICAgICAgICAgICAgY3JlYXRlZDogRGF0ZS5ub3coKS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgIHVzZXJFbWFpbDogJ3Rlc3RAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgIF9pZDogJzInXG4gICAgICAgICAgICB9XTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zXG4gICAgICAgICAgICAgICAgLm9uR2V0KClcbiAgICAgICAgICAgICAgICAucmVwbHkoMjAwLCB7IG1lc3NhZ2VzOiBtZXNzYWdlc30pO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKHJldHJpZXZlQ2hhbm5lbE1lc3NhZ2VzKGNoYW5uZWwpKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uczogQW55QWN0aW9uW10gPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZXRGZXRjaGluZ1RydWVBY3Rpb24gPSBzZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcyhjaGFubmVsLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5jcmVtZW50T2Zmc2V0QWN0aW9uID0gaW5jcmVtZW50Q2hhbm5lbFJldHJpZXZlTWVzc2FnZXNPZmZzZXQoY2hhbm5lbCwgbWVzc2FnZXMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWRkTWVzc2FnZXNBY3Rpb24gPSBhZGRSZXRyaWV2ZWRDaGFubmVsTWVzc2FnZXMoY2hhbm5lbCwgbWVzc2FnZXMpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZXRGZXRjaGluZ0ZhbHNlQWN0aW9uID0gc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMoY2hhbm5lbCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEZldGNoaW5nVHJ1ZUFjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIGluY3JlbWVudE9mZnNldEFjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZE1lc3NhZ2VzQWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0RmV0Y2hpbmdGYWxzZUFjdGlvbl0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGRpc3BhdGNoIGluZm8gb24gc3VjY2Vzc2Z1bGx5IGRlbGV0aW5nIGNoYW5uZWwnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICBsZXQgY2hhbm5lbHM6IHsgX2lkOiBzdHJpbmcsIG5hbWU6IHN0cmluZyB9W10gPSBbXG4gICAgICAgICAgICAgICAgeyBfaWQ6ICcxJywgbmFtZTogJ2dlbmVyYWwnIH0sXG4gICAgICAgICAgICAgICAgeyBfaWQ6ICcyJywgbmFtZTogJ3JhbmRvbScgfSxcbiAgICAgICAgICAgICAgICB7IF9pZDogJzMnLCBuYW1lOiAnc29tZXRoaW5nIGVsc2UnIH1dO1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3NcbiAgICAgICAgICAgICAgICAub25HZXQoJy9hcGkvdjEvY2hhbm5lbHMnKVxuICAgICAgICAgICAgICAgIC5yZXBseSgyMDAsIHsgY2hhbm5lbHM6IGNoYW5uZWxzIH0pO1xuICAgICAgICAgICAgbW9ja0F4aW9zXG4gICAgICAgICAgICAgICAgLm9uR2V0KClcbiAgICAgICAgICAgICAgICAucmVwbHkoMjAwKTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChkZWxldGVDaGFubmVsKCdnZW5lcmFsJykpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25zOiBBbnlBY3Rpb25bXSA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFkZEluZm9BY3Rpb24gPSBhZGRJbmZvKCdDaGFubmVsIGRlbGV0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWRkQ2hhbm5lbHNBY3Rpb24gPSBhZGRDaGFubmVscyhbJ2dlbmVyYWwnLCAncmFuZG9tJywgJ3NvbWV0aGluZyBlbHNlJ10pO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFthZGRJbmZvQWN0aW9uLCBhZGRDaGFubmVsc0FjdGlvbl0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGRpc3BhdGNoIGFuIGVycm9yIG9uIGZhaWxlZCBhdHRlbXB0IHRvIGRlbGV0ZSBjaGFubmVsJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3NcbiAgICAgICAgICAgICAgICAub25HZXQoKVxuICAgICAgICAgICAgICAgIC5yZXBseSg1MDAsIHtlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nJ30pO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKGRlbGV0ZUNoYW5uZWwoJ2dlbmVyYWwnKSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnM6IEFueUFjdGlvbltdID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWRkRXJyb3JBY3Rpb24gPSBhZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3JvbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbYWRkRXJyb3JBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGRvbmUpO1xuICAgICAgICB9KVxuICAgICAgICBpdCgnc2hvdWxkIGRpc3BhdGNoIGluZm8gb24gY3JlYXRpbmcgbmV3IGNoYW5uZWwnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICBsZXQgY2hhbm5lbHM6IHsgX2lkOiBzdHJpbmcsIG5hbWU6IHN0cmluZyB9W10gPSBbXG4gICAgICAgICAgICAgICAgeyBfaWQ6ICcxJywgbmFtZTogJ2dlbmVyYWwnIH0sXG4gICAgICAgICAgICAgICAgeyBfaWQ6ICcyJywgbmFtZTogJ3JhbmRvbScgfSxcbiAgICAgICAgICAgICAgICB7IF9pZDogJzMnLCBuYW1lOiAnc29tZXRoaW5nIGVsc2UnIH1dO1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3NcbiAgICAgICAgICAgICAgICAub25HZXQoJy9hcGkvdjEvY2hhbm5lbHMnKVxuICAgICAgICAgICAgICAgIC5yZXBseSgyMDAsIHsgY2hhbm5lbHM6IGNoYW5uZWxzIH0pO1xuICAgICAgICAgICAgbW9ja0F4aW9zXG4gICAgICAgICAgICAgICAgLm9uUG9zdCgpXG4gICAgICAgICAgICAgICAgLnJlcGx5KDIwMCk7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2goYWRkQ2hhbm5lbCgnbmV3IGNoYW5uZWwnKSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnM6IEFueUFjdGlvbltdID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWRkSW5mb0FjdGlvbiA9IGFkZEluZm8oJ0NoYW5uZWwgY3JlYXRlZCcpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhZGRDaGFubmVsc0FjdGlvbiA9IGFkZENoYW5uZWxzKFsnZ2VuZXJhbCcsICdyYW5kb20nLCAnc29tZXRoaW5nIGVsc2UnXSk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW2FkZEluZm9BY3Rpb24sIGFkZENoYW5uZWxzQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZGlzcGF0Y2ggYW4gZXJyb3Igb24gZmFpbGVkIGF0dGVtcHQgdG8gY3JlYXRlIGEgbmV3IGNoYW5uZWwnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvc1xuICAgICAgICAgICAgICAgIC5vbkFueSgpXG4gICAgICAgICAgICAgICAgLnJlcGx5KDUwMCwge2Vycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnfSk7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2goYWRkQ2hhbm5lbCgnbmV3IGNoYW5uZWwnKSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnM6IEFueUFjdGlvbltdID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWRkRXJyb3JBY3Rpb24gPSBhZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3JvbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbYWRkRXJyb3JBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGRvbmUpO1xuICAgICAgICB9KVxuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdTb2NrZXQgYXN5bmMgYWN0aW9ucycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBtb2NrU3RvcmUgPSBnZXRTdG9yZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBpbml0aWFsaXplIHdlYnNvY2tldCBjb25uZWN0aW9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBtb2NrU3RvcmUuZGlzcGF0Y2goaW5pdFdlYnNvY2tldENvbm5lY3Rpb24oKSk7XG4gICAgICAgICAgICBjb25zdCBhY3Rpb25zOiBBbnlBY3Rpb25bXSA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0aW9uc1swXS50eXBlLCBJTklUX1dFQlNPQ0tFVCk7XG4gICAgICAgICAgICAvLyBuZWVkIHRvIGNsb3NlIGNvbm5lY3Rpb24gc28gcHJvZ3JhbSB3aWxsIGV4aXQgYWZ0ZXIgdGVzdHMgcnVuXG4gICAgICAgICAgICBhY3Rpb25zWzBdLmRhdGEuaW8uY2xvc2UoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ0NoYXQgVXNlcnMgYXN5bmMgYWN0aW9ucycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBtb2NrU3RvcmUgPSBnZXRTdG9yZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXBhdGNoIHVwZGF0ZVVzZXJzIG9uIGZldGNoIGFsbCB1c2VycycsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIGxldCB1c2Vyc1Jlc3BvbnNlID0gW3tcbiAgICAgICAgICAgICAgICBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgIHJvbGU6ICdhZG1pbicsXG4gICAgICAgICAgICAgICAgbmFtZTogJ3Rlc3QnXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZW1haWw6ICd0ZXN0MkB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgcm9sZTogJ2dlbmVyYWwnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICd0ZXN0J1xuICAgICAgICAgICAgfV07XG4gICAgICAgICAgICBsZXQgdXNlcnM6IENoYXRVc2Vyc1N0YXRlID0ge307XG4gICAgICAgICAgICB1c2Vyc1Jlc3BvbnNlLmZvckVhY2goKHUpID0+IHtcbiAgICAgICAgICAgICAgICB1c2Vyc1t1LmVtYWlsXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiB1LnJvbGVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zLm9uQW55KCkucmVwbHkoMjAwLCB7IHVzZXJzOiB1c2Vyc1Jlc3BvbnNlfSk7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2goZmV0Y2hBbGxVc2VycygpKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uczogQW55QWN0aW9uW10gPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB1cGRhdGVVc2Vyc0FjdGlvbiA9IHVwZGF0ZVVzZXJzKHVzZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbdXBkYXRlVXNlcnNBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCBhZGRFcnJvciBvbiBmYWlsZWQgYXR0ZW1wdCB0byBmZXRjaCB1c2VycycsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zLm9uQW55KCkucmVwbHkoNTAwKTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChmZXRjaEFsbFVzZXJzKCkpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25zOiBBbnlBY3Rpb25bXSA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFkZEVycm9yQWN0aW9uID0gYWRkRXJyb3IoJ0ZldGNoaW5nIGFsbCB1c2VycyBmYWlsZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbYWRkRXJyb3JBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGRvbmUpO1xuICAgICAgICB9KVxuICAgICAgICBpdCgnc2hvdWxkIGNyZWF0ZSBhIG5ldyB1c2VyJyk7XG4gICAgICAgIGl0KCdzaG91bGQgZWRpdCB0aGUgdXNlcicpO1xuICAgICAgICBpdCgnc2hvdWxkIGRlbGV0ZSB0aGUgdXNlcicpO1xuICAgIH0pO1xufSkiLCJpbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCAnbW9jaGEnO1xuaW1wb3J0ICogYXMgc29ja2V0aW9jbGllbnQgZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5pbXBvcnQgeyBOb3RJbXBsZW1lbnRlZEVycm9yIH0gZnJvbSAnLi4vJztcbmltcG9ydCB7U3RhdGUsIHJvb3RSZWR1Y2VyLCBtaWRkbGV3YXJlfSBmcm9tICcuLi8uLi9zcmMvd2ViL3N0b3JlJztcblxuaW1wb3J0IHsgU3RvcmUsIGNyZWF0ZVN0b3JlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgc2V0QXV0aG9yaXplZCwgc2V0VXNlciwgbG9nb3V0VXNlciB9IGZyb20gJy4uLy4uL3NyYy93ZWIvYWN0aW9ucy91c2VyQWN0aW9ucyc7XG5pbXBvcnQgeyBhZGRDaGFubmVscywgc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMsIGluY3JlbWVudENoYW5uZWxSZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0LCBzZXRDaGFubmVsSGFzTW9yZU1lc3NhZ2VzLCBhZGRSZWNlaXZlZENoYW5uZWxNZXNzYWdlLCBhZGRSZXRyaWV2ZWRDaGFubmVsTWVzc2FnZXMsIGNsZWFyQ2hhbm5lbHNEYXRhIH0gZnJvbSAnLi4vLi4vc3JjL3dlYi9hY3Rpb25zL2NoYW5uZWxzQWN0aW9ucyc7XG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnLi4vLi4vc3JjL3dlYi9yZWR1Y2Vycy9jaGFubmVscyc7XG5pbXBvcnQgeyBhZGRFcnJvciwgcmVtb3ZlRXJyb3IsIGNsZWFyRXJyb3JzLCBhZGRJbmZvLCByZW1vdmVJbmZvLCBjbGVhckluZm9zIH0gZnJvbSAnLi4vLi4vc3JjL3dlYi9hY3Rpb25zL25vdGlmaWNhdGlvbnNBY3Rpb25zJztcbmltcG9ydCB7IHRvZ2dsZVNpZGViYXJPcGVuIH0gZnJvbSAnLi4vLi4vc3JjL3dlYi9hY3Rpb25zL3NpZGViYXJBY3Rpb25zJztcbmltcG9ydCB7IGluaXRXZWJzb2NrZXQsIHNldFNvY2tldENvbm5lY3RlZCwgc2V0U29ja2V0Q29ubmVjdGVkVXNlcnMgfSBmcm9tICcuLi8uLi9zcmMvd2ViL2FjdGlvbnMvc29ja2V0QWN0aW9ucyc7XG5pbXBvcnQgeyB1cGRhdGVVc2VycywgYWRkVXNlciwgcmVtb3ZlVXNlciB9IGZyb20gJy4uLy4uL3NyYy93ZWIvYWN0aW9ucy9jaGF0VXNlcnNBY3Rpb25zJztcbmltcG9ydCB7IFN0YXRlIGFzIENoYXRVc2Vyc1N0YXRlIH0gZnJvbSAnLi4vLi4vc3JjL3dlYi9yZWR1Y2Vycy9jaGF0VXNlcnMnO1xuXG5mdW5jdGlvbiBnZXRTdG9yZSgpOiBTdG9yZTxTdGF0ZT4ge1xuICAgIHJldHVybiBjcmVhdGVTdG9yZShyb290UmVkdWNlciwgbWlkZGxld2FyZSk7XG59XG5cbmRlc2NyaWJlKCdTdG9yZSBhbmQgU3luY2hyb25vdXMgQWN0aW9ucycsIGZ1bmN0aW9uKCkge1xuICAgIGRlc2NyaWJlKCdVc2VyIFN0YXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgc3RvcmU6IFN0b3JlPFN0YXRlPjtcbiAgICAgICAgbGV0IHVzZXI6ICgoKSA9PiBTdGF0ZVsndXNlciddKTtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdG9yZSA9IGdldFN0b3JlKCk7XG4gICAgICAgICAgICB1c2VyID0gKCkgPT4gc3RvcmUuZ2V0U3RhdGUoKS51c2VyO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgYmUgYXV0aG9yaXplZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKHVzZXIoKS5hdXRob3JpemVkKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKHVzZXIoKS5lbWFpbCk7XG4gICAgICAgICAgICBhc3NlcnQuaXNGYWxzZSh1c2VyKCkubmFtZSk7XG4gICAgICAgICAgICBhc3NlcnQuaXNGYWxzZSh1c2VyKCkucm9sZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGJlIGF1dGhvcml6ZWQgYWZ0ZXIgc2V0QXV0aG9yaXplZCBhY3Rpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKHVzZXIoKS5hdXRob3JpemVkKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldEF1dGhvcml6ZWQodHJ1ZSkpO1xuICAgICAgICAgICAgYXNzZXJ0LmlzVHJ1ZSh1c2VyKCkuYXV0aG9yaXplZCk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzZXRBdXRob3JpemVkKGZhbHNlKSk7XG4gICAgICAgICAgICBhc3NlcnQuaXNGYWxzZSh1c2VyKCkuYXV0aG9yaXplZCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGhhdmUgdXNlciBkYXRhIGFmdGVyIHNldHRpbmcgdGhlIHVzZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKHVzZXIoKS5hdXRob3JpemVkKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKHVzZXIoKS5lbWFpbCk7XG4gICAgICAgICAgICBhc3NlcnQuaXNGYWxzZSh1c2VyKCkubmFtZSk7XG4gICAgICAgICAgICBhc3NlcnQuaXNGYWxzZSh1c2VyKCkucm9sZSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzZXRVc2VyKHtcbiAgICAgICAgICAgICAgICBhdXRob3JpemVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgbmFtZTogJ0phbmUgRG9lJyxcbiAgICAgICAgICAgICAgICByb2xlOiAnYWRtaW4nXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICBhc3NlcnQuaXNUcnVlKHVzZXIoKS5hdXRob3JpemVkKTtcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCh1c2VyKCkuZW1haWwsICd0ZXN0QHRlc3QuY29tJyk7XG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwodXNlcigpLm5hbWUsICdKYW5lIERvZScpO1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHVzZXIoKS5yb2xlLCAnYWRtaW4nKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldFVzZXIoe1xuICAgICAgICAgICAgICAgIGF1dGhvcml6ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVtYWlsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBuYW1lOiBmYWxzZSxcbiAgICAgICAgICAgICAgICByb2xlOiBmYWxzZVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UodXNlcigpLmF1dGhvcml6ZWQpO1xuICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UodXNlcigpLmVtYWlsKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKHVzZXIoKS5uYW1lKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKHVzZXIoKS5yb2xlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgbm90IGhhdmUgdXNlciBkYXRhIGFmdGVyIGxvZ2dpbmcgb3V0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzZXRVc2VyKHtcbiAgICAgICAgICAgICAgICBhdXRob3JpemVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgbmFtZTogJ0phbmUgRG9lJyxcbiAgICAgICAgICAgICAgICByb2xlOiAnYWRtaW4nXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChsb2dvdXRVc2VyKCkpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc2V0VXNlcih7XG4gICAgICAgICAgICAgICAgYXV0aG9yaXplZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgZW1haWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG5hbWU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJvbGU6IGZhbHNlXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pXG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ0NoYW5uZWxzIFN0YXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgc3RvcmU6IFN0b3JlPFN0YXRlPjtcbiAgICAgICAgbGV0IGNoYW5uZWxzOiAoKCkgPT4gU3RhdGVbJ2NoYW5uZWxzJ10pO1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlID0gZ2V0U3RvcmUoKTtcbiAgICAgICAgICAgIGNoYW5uZWxzID0gKCkgPT4gc3RvcmUuZ2V0U3RhdGUoKS5jaGFubmVscztcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgYWRkIGNoYW5uZWxzIGZyb20gYW4gYXJyYXkgb2YgY2hhbm5lbCBuYW1lcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWRkQ2hhbm5lbHMoWydnZW5lcmFsJywgJ3JhbmRvbScsICdzb21ldGhpbmcgZWxzZSddKSk7XG4gICAgICAgICAgICBsZXQgYzA6IFN0YXRlWydjaGFubmVscyddWzBdID0gY2hhbm5lbHMoKVswXTtcbiAgICAgICAgICAgIGxldCBjMTogU3RhdGVbJ2NoYW5uZWxzJ11bMF0gPSBjaGFubmVscygpWzFdO1xuICAgICAgICAgICAgbGV0IGMyOiBTdGF0ZVsnY2hhbm5lbHMnXVswXSA9IGNoYW5uZWxzKClbMl07XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGMwLCB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2dlbmVyYWwnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBbXSxcbiAgICAgICAgICAgICAgICByZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0OiAwLFxuICAgICAgICAgICAgICAgIGhhc01vcmVNZXNzYWdlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBmZXRjaGluZ05ld01lc3NhZ2VzOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChjMSwge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdyYW5kb20nLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBbXSxcbiAgICAgICAgICAgICAgICByZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0OiAwLFxuICAgICAgICAgICAgICAgIGhhc01vcmVNZXNzYWdlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBmZXRjaGluZ05ld01lc3NhZ2VzOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChjMiwge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdzb21ldGhpbmcgZWxzZScsXG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6IFtdLFxuICAgICAgICAgICAgICAgIHJldHJpZXZlTWVzc2FnZXNPZmZzZXQ6IDAsXG4gICAgICAgICAgICAgICAgaGFzTW9yZU1lc3NhZ2VzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGZldGNoaW5nTmV3TWVzc2FnZXM6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHVwZGF0ZSBmZXRjaGluZ05ld01lc3NhZ2VzIGFmdGVyIGNhbGxpbmcgc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMgYWN0aW9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRDaGFubmVscyhbJ2dlbmVyYWwnLCAncmFuZG9tJywgJ3NvbWV0aGluZyBlbHNlJ10pKTtcbiAgICAgICAgICAgIGNoYW5uZWxzKCkuZm9yRWFjaCgoYzogU3RhdGVbJ2NoYW5uZWxzJ11bMF0pID0+IHtcbiAgICAgICAgICAgICAgICBhc3NlcnQuaXNGYWxzZShjLmZldGNoaW5nTmV3TWVzc2FnZXMpO1xuICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzKGMubmFtZSwgdHJ1ZSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjaGFubmVscygpLmZvckVhY2goKGM6IFN0YXRlWydjaGFubmVscyddWzBdKSA9PiB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0LmlzVHJ1ZShjLmZldGNoaW5nTmV3TWVzc2FnZXMpO1xuICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzKGMubmFtZSwgZmFsc2UpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY2hhbm5lbHMoKS5mb3JFYWNoKChjOiBTdGF0ZVsnY2hhbm5lbHMnXVswXSkgPT4ge1xuICAgICAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKGMuZmV0Y2hpbmdOZXdNZXNzYWdlcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgaW5jcmVtZW50IHRoZSBjaGFubmVsIG9mZnNldCBmb3IgcmV0cmlldmluZyBuZXcgbWVzc2FnZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZENoYW5uZWxzKFsnZ2VuZXJhbCcsICdyYW5kb20nLCAnc29tZXRoaW5nIGVsc2UnXSkpO1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNoYW5uZWxzKCkuZmluZChlID0+IGUubmFtZSA9PT0gJ2dlbmVyYWwnKS5yZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0LCAwKTtcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChjaGFubmVscygpLmZpbmQoZSA9PiBlLm5hbWUgPT09ICdyYW5kb20nKS5yZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0LCAwKTtcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChjaGFubmVscygpLmZpbmQoZSA9PiBlLm5hbWUgPT09ICdzb21ldGhpbmcgZWxzZScpLnJldHJpZXZlTWVzc2FnZXNPZmZzZXQsIDApO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goaW5jcmVtZW50Q2hhbm5lbFJldHJpZXZlTWVzc2FnZXNPZmZzZXQoJ2dlbmVyYWwnLCAyMCkpXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoY2hhbm5lbHMoKS5maW5kKGUgPT4gZS5uYW1lID09PSAnZ2VuZXJhbCcpLnJldHJpZXZlTWVzc2FnZXNPZmZzZXQsIDIwKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGluY3JlbWVudENoYW5uZWxSZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0KCdnZW5lcmFsJywgMSkpXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoY2hhbm5lbHMoKS5maW5kKGUgPT4gZS5uYW1lID09PSAnZ2VuZXJhbCcpLnJldHJpZXZlTWVzc2FnZXNPZmZzZXQsIDIxKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGluY3JlbWVudENoYW5uZWxSZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0KCdyYW5kb20nLCAxKSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChjaGFubmVscygpLmZpbmQoZSA9PiBlLm5hbWUgPT09ICdyYW5kb20nKS5yZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0LCAxKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGluY3JlbWVudENoYW5uZWxSZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0KCdzb21ldGhpbmcgZWxzZScsIDEpKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNoYW5uZWxzKCkuZmluZChlID0+IGUubmFtZSA9PT0gJ3NvbWV0aGluZyBlbHNlJykucmV0cmlldmVNZXNzYWdlc09mZnNldCwgMSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHVwZGF0ZSB0aGUgaGFzTW9yZU1lc3NhZ2VzIHByb3BlcnR5IG9uIGEgY2hhbm5lbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWRkQ2hhbm5lbHMoWydnZW5lcmFsJywgJ3JhbmRvbScsICdzb21ldGhpbmcgZWxzZSddKSk7XG4gICAgICAgICAgICBhc3NlcnQuaXNUcnVlKGNoYW5uZWxzKCkuZmluZChlID0+IGUubmFtZSA9PT0gJ2dlbmVyYWwnKS5oYXNNb3JlTWVzc2FnZXMpO1xuICAgICAgICAgICAgYXNzZXJ0LmlzVHJ1ZShjaGFubmVscygpLmZpbmQoZSA9PiBlLm5hbWUgPT09ICdyYW5kb20nKS5oYXNNb3JlTWVzc2FnZXMpO1xuICAgICAgICAgICAgYXNzZXJ0LmlzVHJ1ZShjaGFubmVscygpLmZpbmQoZSA9PiBlLm5hbWUgPT09ICdzb21ldGhpbmcgZWxzZScpLmhhc01vcmVNZXNzYWdlcyk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzZXRDaGFubmVsSGFzTW9yZU1lc3NhZ2VzKCdnZW5lcmFsJywgZmFsc2UpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldENoYW5uZWxIYXNNb3JlTWVzc2FnZXMoJ3JhbmRvbScsIGZhbHNlKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzZXRDaGFubmVsSGFzTW9yZU1lc3NhZ2VzKCdzb21ldGhpbmcgZWxzZScsIGZhbHNlKSk7XG4gICAgICAgICAgICBhc3NlcnQuaXNGYWxzZShjaGFubmVscygpLmZpbmQoZSA9PiBlLm5hbWUgPT09ICdnZW5lcmFsJykuaGFzTW9yZU1lc3NhZ2VzKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKGNoYW5uZWxzKCkuZmluZChlID0+IGUubmFtZSA9PT0gJ3JhbmRvbScpLmhhc01vcmVNZXNzYWdlcyk7XG4gICAgICAgICAgICBhc3NlcnQuaXNGYWxzZShjaGFubmVscygpLmZpbmQoZSA9PiBlLm5hbWUgPT09ICdzb21ldGhpbmcgZWxzZScpLmhhc01vcmVNZXNzYWdlcyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGFkZCBhIHJlY2VpdmVkIG1lc3NhZ2UgdG8gdGhlIGFwcHJvcHJpYXRlIGNoYW5uZWwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZENoYW5uZWxzKFsnZ2VuZXJhbCcsICdyYW5kb20nLCAnc29tZXRoaW5nIGVsc2UnXSkpO1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2U6IE1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAgdXNlckVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgY3JlYXRlZDogRGF0ZS5ub3coKS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgIF9pZDogJzEnLFxuICAgICAgICAgICAgICAgIHRleHQ6ICd0aGlzIGlzIHRoZSBtZXNzYWdlJyxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZFJlY2VpdmVkQ2hhbm5lbE1lc3NhZ2UoJ2dlbmVyYWwnLCBtZXNzYWdlKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRSZWNlaXZlZENoYW5uZWxNZXNzYWdlKCdyYW5kb20nLCBtZXNzYWdlKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRSZWNlaXZlZENoYW5uZWxNZXNzYWdlKCdyYW5kb20nLCBtZXNzYWdlKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRSZWNlaXZlZENoYW5uZWxNZXNzYWdlKCdzb21ldGhpbmcgZWxzZScsIG1lc3NhZ2UpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZFJlY2VpdmVkQ2hhbm5lbE1lc3NhZ2UoJ3NvbWV0aGluZyBlbHNlJywgbWVzc2FnZSkpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWRkUmVjZWl2ZWRDaGFubmVsTWVzc2FnZSgnc29tZXRoaW5nIGVsc2UnLCBtZXNzYWdlKSk7XG5cbiAgICAgICAgICAgIGxldCBnZW5lcmFsTWVzc2FnZXM6IE1lc3NhZ2VbXSA9IGNoYW5uZWxzKCkuZmluZChlID0+IGUubmFtZSA9PT0gJ2dlbmVyYWwnKS5tZXNzYWdlcztcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoZ2VuZXJhbE1lc3NhZ2VzLmxlbmd0aCwgMSk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGdlbmVyYWxNZXNzYWdlcywgW21lc3NhZ2VdKTtcbiAgICAgICAgICAgIGxldCByYW5kb21NZXNzYWdlczogTWVzc2FnZVtdID0gY2hhbm5lbHMoKS5maW5kKGUgPT4gZS5uYW1lID09PSAncmFuZG9tJykubWVzc2FnZXM7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKHJhbmRvbU1lc3NhZ2VzLmxlbmd0aCwgMik7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKHJhbmRvbU1lc3NhZ2VzLCBbbWVzc2FnZSwgbWVzc2FnZV0pO1xuICAgICAgICAgICAgbGV0IG90aGVyTWVzc2FnZXM6IE1lc3NhZ2VbXSA9IGNoYW5uZWxzKCkuZmluZChlID0+IGUubmFtZSA9PT0gJ3NvbWV0aGluZyBlbHNlJykubWVzc2FnZXM7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKG90aGVyTWVzc2FnZXMubGVuZ3RoLCAzKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwob3RoZXJNZXNzYWdlcywgW21lc3NhZ2UsIG1lc3NhZ2UsIG1lc3NhZ2VdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgYWRkIHJldHJlaXZlZCBtZXNzYWdlcyB0byB0aGUgYXBwcm9wcmlhdGUgY2hhbm5lbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWRkQ2hhbm5lbHMoWydnZW5lcmFsJywgJ3JhbmRvbScsICdzb21ldGhpbmcgZWxzZSddKSk7XG4gICAgICAgICAgICBsZXQgbWVzc2FnZXM6IE1lc3NhZ2VbXSA9IFtcbiAgICAgICAgICAgICAgICB7IFwidGV4dFwiOiBcIlNvbWV0aGluZyBoZXJlXCIsIFwiY3JlYXRlZFwiOiBcIjIwMTktMDQtMTNUMTY6NDU6MjguOTQ2WlwiLCBcInVzZXJFbWFpbFwiOiBcImFia290aG1hbkBnbWFpbC5jb21cIiwgXCJfaWRcIjogXCI1Y2IyMTIyODFkNjQ1YTIyYWJlYThkYmVcIiB9LFxuICAgICAgICAgICAgICAgIHsgXCJ0ZXh0XCI6IFwiMTIzNDEyMzRcIiwgXCJjcmVhdGVkXCI6IFwiMjAxOS0wNC0xNFQyMjozNDowNi42ODZaXCIsIFwidXNlckVtYWlsXCI6IFwiYWJrb3RobWFuQGdtYWlsLmNvbVwiLCAgXCJfaWRcIjogXCI1Y2IzYjU1ZWNiZjY4YzZhOTU0ZWFmYjNcIiB9LFxuICAgICAgICAgICAgICAgIHsgXCJ0ZXh0XCI6IFwidGVzdCBvbmUgdHdvIHRocmVlXCIsIFwiY3JlYXRlZFwiOiBcIjIwMTktMDQtMTRUMjI6MzQ6MTAuOTAzWlwiLCBcInVzZXJFbWFpbFwiOiBcImFia290aG1hbkBnbWFpbC5jb21cIiwgXCJfaWRcIjogXCI1Y2IzYjU2MmNiZjY4YzZhOTU0ZWFmYjRcIiB9XTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcygnZ2VuZXJhbCcsIG1lc3NhZ2VzKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRSZXRyaWV2ZWRDaGFubmVsTWVzc2FnZXMoJ3JhbmRvbScsIG1lc3NhZ2VzKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRSZXRyaWV2ZWRDaGFubmVsTWVzc2FnZXMoJ3JhbmRvbScsIG1lc3NhZ2VzKSk7XG4gICAgICAgICAgICBsZXQgY2hhbm5lbFN0YXRlID0gY2hhbm5lbHMoKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgY2hhbm5lbFN0YXRlXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKChjKSA9PiBjLm5hbWUgPT09ICdnZW5lcmFsJylcbiAgICAgICAgICAgICAgICAgICAgLm1lc3NhZ2VzLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgY2hhbm5lbFN0YXRlXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKChjKSA9PiBjLm5hbWUgPT09ICdyYW5kb20nKVxuICAgICAgICAgICAgICAgICAgICAubWVzc2FnZXMsXG4gICAgICAgICAgICAgICAgbWVzc2FnZXMuY29uY2F0KG1lc3NhZ2VzKSk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKFxuICAgICAgICAgICAgICAgIGNoYW5uZWxTdGF0ZVxuICAgICAgICAgICAgICAgICAgICAuZmluZCgoYykgPT4gYy5uYW1lID09PSAnc29tZXRoaW5nIGVsc2UnKVxuICAgICAgICAgICAgICAgICAgICAubWVzc2FnZXMsXG4gICAgICAgICAgICAgICAgW10pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBjbGVhciBhbGwgY2hhbm5lbCBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRDaGFubmVscyhbJ2dlbmVyYWwnLCAncmFuZG9tJywgJ3NvbWV0aGluZyBlbHNlJ10pKTtcbiAgICAgICAgICAgIGxldCBtZXNzYWdlczogTWVzc2FnZVtdID0gW1xuICAgICAgICAgICAgICAgIHsgXCJ0ZXh0XCI6IFwiU29tZXRoaW5nIGhlcmVcIiwgXCJjcmVhdGVkXCI6IFwiMjAxOS0wNC0xM1QxNjo0NToyOC45NDZaXCIsIFwidXNlckVtYWlsXCI6IFwiYWJrb3RobWFuQGdtYWlsLmNvbVwiLCBcIl9pZFwiOiBcIjVjYjIxMjI4MWQ2NDVhMjJhYmVhOGRiZVwiIH0sXG4gICAgICAgICAgICAgICAgeyBcInRleHRcIjogXCIxMjM0MTIzNFwiLCBcImNyZWF0ZWRcIjogXCIyMDE5LTA0LTE0VDIyOjM0OjA2LjY4NlpcIiwgXCJ1c2VyRW1haWxcIjogXCJhYmtvdGhtYW5AZ21haWwuY29tXCIsIFwiX2lkXCI6IFwiNWNiM2I1NWVjYmY2OGM2YTk1NGVhZmIzXCIgfSxcbiAgICAgICAgICAgICAgICB7IFwidGV4dFwiOiBcInRlc3Qgb25lIHR3byB0aHJlZVwiLCBcImNyZWF0ZWRcIjogXCIyMDE5LTA0LTE0VDIyOjM0OjEwLjkwM1pcIiwgXCJ1c2VyRW1haWxcIjogXCJhYmtvdGhtYW5AZ21haWwuY29tXCIsIFwiX2lkXCI6IFwiNWNiM2I1NjJjYmY2OGM2YTk1NGVhZmI0XCIgfV07XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRSZXRyaWV2ZWRDaGFubmVsTWVzc2FnZXMoJ2dlbmVyYWwnLCBtZXNzYWdlcykpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWRkUmV0cmlldmVkQ2hhbm5lbE1lc3NhZ2VzKCdyYW5kb20nLCBtZXNzYWdlcykpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWRkUmV0cmlldmVkQ2hhbm5lbE1lc3NhZ2VzKCdyYW5kb20nLCBtZXNzYWdlcykpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2xlYXJDaGFubmVsc0RhdGEoKSk7XG4gICAgICAgICAgICBsZXQgY2hhbm5lbFN0YXRlID0gY2hhbm5lbHMoKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoY2hhbm5lbFN0YXRlLCBbXSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdOb3RpZmljYXRpb25zIFN0YXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgc3RvcmU6IFN0b3JlPFN0YXRlPjtcbiAgICAgICAgbGV0IG5vdGlmaWNhdGlvbnM6ICgoKSA9PiBTdGF0ZVsnbm90aWZpY2F0aW9ucyddKTtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN0b3JlID0gZ2V0U3RvcmUoKTtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvbnMgPSAoKSA9PiBzdG9yZS5nZXRTdGF0ZSgpLm5vdGlmaWNhdGlvbnM7XG4gICAgICAgIH0pXG4gICAgICAgIGl0KCdzaG91bGQgYWRkIGVycm9ycycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuZXJyb3JzLCBbXSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRFcnJvcignVGVzdCBlcnJvcicpKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmVycm9ycywgWydUZXN0IGVycm9yJ10pO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWRkRXJyb3IoJ0Fub3RoZXIgZXJyb3InKSk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5vdGlmaWNhdGlvbnMoKS5lcnJvcnMsIFsnVGVzdCBlcnJvcicsICdBbm90aGVyIGVycm9yJ10pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZW1vdmUgZXJyb3JzIGdpdmVuIGFuIGluZGV4JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRFcnJvcignVGVzdCBlcnJvcicpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZEVycm9yKCdBbm90aGVyIGVycm9yJykpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuZXJyb3JzLCBbJ1Rlc3QgZXJyb3InLCAnQW5vdGhlciBlcnJvciddKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHJlbW92ZUVycm9yKDEpKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmVycm9ycywgWydUZXN0IGVycm9yJ10pO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2gocmVtb3ZlRXJyb3IoMCkpXG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5vdGlmaWNhdGlvbnMoKS5lcnJvcnMsIFtdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgY2xlYXIgZXJyb3JzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRFcnJvcignVGVzdCBlcnJvcicpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZEVycm9yKCdBbm90aGVyIGVycm9yJykpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2xlYXJFcnJvcnMoKSk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5vdGlmaWNhdGlvbnMoKS5lcnJvcnMsIFtdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgYWRkIGluZm8nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmluZm9zLCBbXSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRJbmZvKCdUZXN0IGluZm8nKSk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5vdGlmaWNhdGlvbnMoKS5pbmZvcywgWydUZXN0IGluZm8nXSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRJbmZvKCdBbm90aGVyIGluZm8nKSk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5vdGlmaWNhdGlvbnMoKS5pbmZvcywgWydUZXN0IGluZm8nLCAnQW5vdGhlciBpbmZvJ10pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZW1vdmUgaW5mbyBnaXZlbiBhbiBpbmRleCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWRkSW5mbygnVGVzdCBpbmZvJykpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWRkSW5mbygnQW5vdGhlciBpbmZvJykpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2gocmVtb3ZlSW5mbygxKSk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5vdGlmaWNhdGlvbnMoKS5pbmZvcywgWydUZXN0IGluZm8nXSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChyZW1vdmVJbmZvKDApKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmluZm9zLCBbXSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGNsZWFyIGluZm9zJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRJbmZvKCdUZXN0IGluZm8nKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRJbmZvKCdBbm90aGVyIGluZm8nKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjbGVhckluZm9zKCkpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuaW5mb3MsIFtdKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ1NpZGViYXIgU3RhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBzdG9yZTogU3RvcmU8U3RhdGU+O1xuICAgICAgICBsZXQgc2lkZWJhcjogKCgpID0+IFN0YXRlWydzaWRlYmFyJ10pO1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlID0gZ2V0U3RvcmUoKTtcbiAgICAgICAgICAgIHNpZGViYXIgPSAoKSA9PiBzdG9yZS5nZXRTdGF0ZSgpLnNpZGViYXI7XG4gICAgICAgIH0pXG4gICAgICAgIGl0KCdzaG91bGQgdG9nZ2xlIG9wZW4gc3RhdGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFzc2VydC5pc1RydWUoc2lkZWJhcigpLm9wZW4pO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2godG9nZ2xlU2lkZWJhck9wZW4oKSk7XG4gICAgICAgICAgICBhc3NlcnQuaXNGYWxzZShzaWRlYmFyKCkub3Blbik7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh0b2dnbGVTaWRlYmFyT3BlbigpKTtcbiAgICAgICAgICAgIGFzc2VydC5pc1RydWUoc2lkZWJhcigpLm9wZW4pO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2godG9nZ2xlU2lkZWJhck9wZW4oKSk7XG4gICAgICAgICAgICBhc3NlcnQuaXNGYWxzZShzaWRlYmFyKCkub3Blbik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdTb2NrZXQgU3RhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBzdG9yZTogU3RvcmU8U3RhdGU+O1xuICAgICAgICBsZXQgc29ja2V0OiAoKCkgPT4gU3RhdGVbJ3NvY2tldCddKTtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdG9yZSA9IGdldFN0b3JlKCk7XG4gICAgICAgICAgICBzb2NrZXQgPSAoKSA9PiBzdG9yZS5nZXRTdGF0ZSgpLnNvY2tldDtcbiAgICAgICAgfSlcbiAgICAgICAgaXQoJ3Nob3VsZCBzZXQgdGhlIHNvY2tldCBnaXZlbiBhIFNvY2tldElPQ2xpZW50IFNvY2tldCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChzb2NrZXQoKSwge1xuICAgICAgICAgICAgICAgIGlvOiBudWxsLFxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29ubmVjdGVkVXNlckVtYWlsczogW11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGV0IHNvY2tldGlvOiBTb2NrZXRJT0NsaWVudC5Tb2NrZXQgPSBzb2NrZXRpb2NsaWVudCgpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goaW5pdFdlYnNvY2tldChzb2NrZXRpbykpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChzb2NrZXQoKSwge1xuICAgICAgICAgICAgICAgIGlvOiBzb2NrZXRpbyxcbiAgICAgICAgICAgICAgICBjb25uZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZFVzZXJFbWFpbHM6IFtdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNvY2tldGlvLmNsb3NlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHVwZGF0ZSB0aGUgY29ubmVjdGVkIHN0YXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzZXRTb2NrZXRDb25uZWN0ZWQodHJ1ZSkpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChzb2NrZXQoKSwge1xuICAgICAgICAgICAgICAgIGlvOiBudWxsLFxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjb25uZWN0ZWRVc2VyRW1haWxzOiBbXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzZXRTb2NrZXRDb25uZWN0ZWQoZmFsc2UpKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoc29ja2V0KCksIHtcbiAgICAgICAgICAgICAgICBpbzogbnVsbCxcbiAgICAgICAgICAgICAgICBjb25uZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZFVzZXJFbWFpbHM6IFtdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgdXBkYXRlIHRoZSBjb25uZWN0ZWQgdXNlcnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBlbWFpbHM6IHN0cmluZ1tdID0gWyd0ZXN0QHRlc3QuY29tJywgJ3Rlc3QyQHRlc3QuY29tJ107XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzZXRTb2NrZXRDb25uZWN0ZWRVc2VycyhlbWFpbHMpKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoc29ja2V0KCksIHtcbiAgICAgICAgICAgICAgICBpbzogbnVsbCxcbiAgICAgICAgICAgICAgICBjb25uZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZFVzZXJFbWFpbHM6IGVtYWlsc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdDaGF0IFVzZXJzIFN0YXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgc3RvcmU6IFN0b3JlPFN0YXRlPjtcbiAgICAgICAgbGV0IGNoYXRVc2VyczogKCgpID0+IFN0YXRlWydjaGF0VXNlcnMnXSk7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUgPSBnZXRTdG9yZSgpO1xuICAgICAgICAgICAgY2hhdFVzZXJzID0gKCkgPT4gc3RvcmUuZ2V0U3RhdGUoKS5jaGF0VXNlcnM7XG4gICAgICAgIH0pXG4gICAgICAgIGl0KCdzaG91bGQgdXBkYXRlIHVzZXJzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgdXNlcnM6IENoYXRVc2Vyc1N0YXRlID0ge1xuICAgICAgICAgICAgICAgICd0ZXN0QHRlc3QuY29tJzoge1xuICAgICAgICAgICAgICAgICAgICByb2xlOiAndXNlcicsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdUZXN0IE5hbWUnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAndGVzdDJAdGVzdC5jb20nOiB7XG4gICAgICAgICAgICAgICAgICAgIHJvbGU6ICdhZG1pbicsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdBbm90aGVyIHRlc3QnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAndGVzdDNAdGVzdC5jb20nOiB7XG4gICAgICAgICAgICAgICAgICAgIHJvbGU6ICdhZG1pbicsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdMYXN0IHRlc3QnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2godXBkYXRlVXNlcnModXNlcnMpKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoY2hhdFVzZXJzKCksIHVzZXJzKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zLW1vY2stYWRhcHRlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiY3J5cHRqc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjaGFpXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvbXByZXNzaW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvbm5lY3QtbW9uZ29cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29va2llLXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjc3VyZlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3Mtc2Vzc2lvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJoZWxtZXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqc29ud2VidG9rZW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9jaGFcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9uZ29vc2VcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibXVzdGFjaGUtZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LWxvZ2dlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1tb2NrLXN0b3JlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LXRodW5rXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNvY2tldC5pb1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzb2NrZXQuaW8tY2xpZW50XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNvY2tldGlvLWp3dFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdXBlcnRlc3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3VwZXJ0ZXN0LXNlc3Npb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidmFsaWRhdG9yXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=
=======
!function(e){var t={};function n(s){if(t[s])return t[s].exports;var r=t[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(s,r,function(t){return e[t]}.bind(null,r));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=11)}([function(e,t,n){"use strict";t.__esModule=!0,t.ADD_ERROR="ADD_ERROR",t.REMOVE_ERROR="REMOVE_ERROR",t.CLEAR_ERRORS="CLEAR_ERRORS",t.ADD_INFO="ADD_INFO",t.REMOVE_INFO="REMOVE_INFO",t.CLEAR_INFOS="CLEAR_INFOS",t.addError=function(e){return{type:t.ADD_ERROR,data:e}},t.removeError=function(e){return{type:t.REMOVE_ERROR,data:e}},t.clearErrors=function(){return{type:t.CLEAR_ERRORS}},t.addInfo=function(e){return{type:t.ADD_INFO,data:e}},t.removeInfo=function(e){return{type:t.REMOVE_INFO,data:e}},t.clearInfos=function(){return{type:t.CLEAR_INFOS}}},function(e,t,n){e.exports={mongodbConnectionUri:process.env.MONGODB_URI,mongodbTestConnectionUri:"mongodb://localhost:27017/openChatTest",port:process.env.PORT||5e3,production:!0,useTestDb:process.env.USE_TEST_DB||!1,secret:process.env.SECRET||"secret",disableCsrf:process.env.DISABLE_CSRF||!1,disableReduxLogging:process.env.DISABLE_REDUX_LOGGING||!1,disableAutoStart:process.env.DISABLE_AUTO_START||!1,mailgunApiKey:process.env.MAILGUN_API_KEY,mailgunDomain:process.env.MAILGUN_DOMAIN,baseUrl:process.env.BASE_URL?process.env.BASE_URL:"http://localhost:5000"}},function(e,t,n){"use strict";t.__esModule=!0;var s=n(3),r=new s.Schema({name:String,email:{required:!0,type:String,lowercase:!0},password:{type:String,required:!0},role:{type:String,required:!0,lowercase:!0,enum:["admin","user"]}},{timestamps:!0});r.statics.findByEmail=function(e){return this.findOne({email:e})};var a=s.model("User",r);t.default=a},function(e,t){e.exports=require("mongoose")},function(e,t){e.exports=require("bcryptjs")},function(e,t){e.exports=require("axios")},function(e,t,n){"use strict";var s=this&&this.__awaiter||function(e,t,n,s){return new(n||(n=Promise))(function(r,a){function o(e){try{c(s.next(e))}catch(e){a(e)}}function i(e){try{c(s.throw(e))}catch(e){a(e)}}function c(e){e.done?r(e.value):new n(function(t){t(e.value)}).then(o,i)}c((s=s.apply(e,t||[])).next())})},r=this&&this.__generator||function(e,t){var n,s,r,a,o={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return a={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function i(a){return function(i){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,s&&(r=2&a[0]?s.return:a[0]?s.throw||((r=s.return)&&r.call(s),0):s.next)&&!(r=r.call(s,a[1])).done)return r;switch(s=0,r&&(a=[2&a[0],r.value]),a[0]){case 0:case 1:r=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,s=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(!(r=(r=o.trys).length>0&&r[r.length-1])&&(6===a[0]||2===a[0])){o=0;continue}if(3===a[0]&&(!r||a[1]>r[0]&&a[1]<r[3])){o.label=a[1];break}if(6===a[0]&&o.label<r[1]){o.label=r[1],r=a;break}if(r&&o.label<r[2]){o.label=r[2],o.ops.push(a);break}r[2]&&o.ops.pop(),o.trys.pop();continue}a=t.call(e,o)}catch(e){a=[6,e],s=0}finally{n=r=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,i])}}},a=this;t.__esModule=!0;var o=n(5),i=n(0);t.ADD_CHANNELS="ADD_CHANNELS",t.SET_CHANNEL_FETCHING_NEW_MESSAGES="SET_CHANNEL_FETCHING_NEW_MESSAGES",t.SET_CHANNEL_HAS_MORE_MESSAGES="SET_CHANNEL_HAS_MORE_MESSAGE",t.ADD_RECEIVED_CHANNEL_MESSAGE="ADD_RECEIVED_CHANNEL_MESSAGE",t.ADD_RETRIEVED_CHANNEL_MESSAGES="ADD_RETRIEVED_CHANNEL_MESSAGES",t.INCREMENT_CHANNEL_RETRIEVE_MESSAGES_OFFSET="INCREMENT_CHANNEL_RETRIEVE_MESSAGES_OFFSET",t.RETRIEVE_CHANNEL_MESSAGES="RETRIEVE_CHANNEL_MESSAGES",t.CLEAR_CHANNELS_DATA="CLEAR_CHANNELS_DATA",t.addChannels=function(e){var n=[];return e.forEach(function(e){n.push({name:e,messages:[],retrieveMessagesOffset:0,hasMoreMessages:!0,fetchingNewMessages:!1})}),{type:t.ADD_CHANNELS,data:{channels:n}}},t.incrementChannelRetrieveMessagesOffset=function(e,n){return{type:t.INCREMENT_CHANNEL_RETRIEVE_MESSAGES_OFFSET,data:{channel:e,increment:n}}},t.setChannelFetchingNewMessages=function(e,n){return{type:t.SET_CHANNEL_FETCHING_NEW_MESSAGES,data:{channelName:e,isFetching:n}}},t.setChannelHasMoreMessages=function(e,n){return{type:t.SET_CHANNEL_HAS_MORE_MESSAGES,data:{channelName:e,hasMore:n}}},t.addReceivedChannelMessage=function(e,n){return{type:t.ADD_RECEIVED_CHANNEL_MESSAGE,data:{message:n,channelName:e}}},t.addRetrievedChannelMessages=function(e,n){return{type:t.ADD_RETRIEVED_CHANNEL_MESSAGES,data:{channelName:e,messages:n}}},t.clearChannelsData=function(){return{type:t.CLEAR_CHANNELS_DATA}},t.fetchChannels=function(){return function(e){return o.default.get("/api/v1/channels").then(function(n){var s=n.data.channels.map(function(e){return e.name});return e(t.addChannels(s))}).catch(function(t){return e(i.addError("Something went wrong while trying to fetch the channels"))})}},t.retrieveChannelMessages=function(e){return function(n,c){return s(a,void 0,void 0,function(){var s;return r(this,function(r){return(s=c().channels.find(function(t){return t.name===e}))&&!s.fetchingNewMessages&&s.hasMoreMessages?(n(t.setChannelFetchingNewMessages(s.name,!0)),[2,o.default.get("/api/v1/messages/"+s.name+"/"+s.retrieveMessagesOffset).then(function(r){if(0===r.data.messages.length)return n(t.setChannelHasMoreMessages(s.name,!1)),r;n(t.incrementChannelRetrieveMessagesOffset(e,r.data.messages.length)),n(t.addRetrievedChannelMessages(s.name,r.data.messages))}).catch(function(e){n(i.addError("Something went wrong while trying to fetch messages"))}).then(function(){return n(t.setChannelFetchingNewMessages(s.name,!1))})]):(n(i.addError("Something went wrong while trying to fetch messages")),[2,Promise.resolve("Retrieve Channel Messages dispatched with incorrect channel name or while already fetching messages")])})})}},t.deleteChannel=function(e){return function(n){return o.default.get("/api/v1/channel/delete/"+e).then(function(e){return n(i.addInfo("Channel deleted")),n(t.fetchChannels())}).catch(function(e){return n(i.addError(e.response.data.error))})}},t.addChannel=function(e){return function(n){return o.default.post("/api/v1/channel/create",{channelName:e}).then(function(e){return n(i.addInfo("Channel created")),n(t.fetchChannels())}).catch(function(e){return n(i.addError(e.response.data.error))})}}},function(e,t){e.exports=require("chai")},function(e,t,n){"use strict";t.__esModule=!0;var s=n(5),r=n(6),a=n(0);t.SET_AUTHORIZED="SET_AUTHORIZED",t.SET_USER="SET_USER",t.LOGOUT_USER="LOGOUT_USER",t.SET_JWT="SET_JWT",t.setAuthorized=function(e){return{type:t.SET_AUTHORIZED,data:e}},t.setUser=function(e){return{type:t.SET_USER,data:e}},t.logoutUser=function(){return{type:t.LOGOUT_USER}},t.setJwt=function(e){return{type:t.SET_JWT,data:e}},t.logout=function(){return function(e){return e(t.logoutUser()),e(r.clearChannelsData())}},t.updateName=function(e,t){return function(n){return s.default.post("/api/v1/user/update/name",{name:e}).then(function(e){n(a.addInfo("Name updated")),t&&t()}).catch(function(e){if(e.response&&e.response.data.error)return n(a.addError(e.response.data.error));console.log("Something went wrong updating user name",e),n(a.addError("Something went wrong while trying to update your name."))})}},t.updateEmail=function(e,t){return function(n){return s.default.post("/api/v1/user/update/email",{email:e}).then(function(e){n(a.addInfo("Email updated")),t&&t()}).catch(function(e){if(e.response&&e.response.data.error)return n(a.addError(e.response.data.error));console.log("Something went wrong updating user email",e),n(a.addError("Something went wrong while trying to update your email."))})}},t.updatePassword=function(e,t,n){return function(r){return s.default.post("/api/v1/user/update/password",{oldPass:e,newPass:t}).then(function(e){r(a.addInfo("Password updated")),n&&n()}).catch(function(e){if(e.response&&e.response.data.error)return r(a.addError(e.response.data.error));console.log("Something went wrong updating user password",e),r(a.addError("Something went wrong while trying to update your password."))})}}},function(e,t,n){"use strict";t.__esModule=!0;var s=n(17);t.INIT_WEBSOCKET="INIT_WEBSOCKET",t.SET_SOCKET_CONNECTED="SET_SOCKET_CONNECTED",t.SET_SOCKET_CONNECTED_USERS="SET_SOCKET_CONNECTED_USERS",t.initWebsocket=function(e){return{type:t.INIT_WEBSOCKET,data:{io:e}}},t.setSocketConnected=function(e){return{type:t.SET_SOCKET_CONNECTED,data:{connected:e}}},t.setSocketConnectedUsers=function(e){return{type:t.SET_SOCKET_CONNECTED_USERS,data:{userEmails:e}}},t.init=function(){return function(e,n){var r=s();return r.on("connect",function(){r.emit("authenticate",{token:n().user.token}).on("authenticated",function(){e(t.setSocketConnected(!0)),console.log("authorized ["+r.id+"]"),r.on("connected users",function(n){e(t.setSocketConnectedUsers(n))})}).on("unauthorized",function(n){throw e(t.setSocketConnected(!1)),console.log("unauthorized: "+JSON.stringify(n.data)),r.off("connected uses"),new Error(n.data.type)})}),r.on("disconnect",function(){e(t.setSocketConnected(!1)),console.log("Disconnected from websocket server, attempting reconnect")}),e(t.initWebsocket(r))}}},function(e,t,n){"use strict";t.__esModule=!0;var s=n(5),r=n(0);t.UPDATE_CHAT_USERS="UPDATE_CHAT_USERS",t.ADD_CHAT_USER="ADD_USER",t.REMOVE_CHAT_USER="REMOVE_USER",t.updateUsers=function(e){return{type:t.UPDATE_CHAT_USERS,data:{users:e}}},t.addUser=function(e){return{type:t.ADD_CHAT_USER,data:{user:e}}},t.removeUser=function(e){return{type:t.REMOVE_CHAT_USER,data:{email:e}}},t.fetchAllUsers=function(){return function(e){return s.default.get("/api/v1/users").then(function(n){var s={};return n.data.users.forEach(function(e){s[e.email]={role:e.role,name:e.name}}),e(t.updateUsers(s)),n}).catch(function(t){return e(r.addError("Fetching all users failed")),t})}},t.createNewUser=function(e){},t.editUser=function(e,t){},t.deleteUser=function(e){}},function(e,t,n){"use strict";t.__esModule=!0;var s=n(21);t.app=s.app;var r=n(2),a=function(){return new Promise(function(e,t){r.default.deleteMany({},function(n){return n?t(n):e()})}).then().catch(function(e){console.error(e)})};t.dropAllCollections=a;var o=new Error("Test not implemented");t.NotImplementedError=o,before("all tests",function(e){console.log(process.version),s.conn.on("connected",function(){console.log("server started"),e()})}),beforeEach("reset DB",function(e){a().then(function(){return e()})}),after("all tests",function(e){a().then(function(){console.log("Closing connections"),s.conn.close(),e()})}),n(42),n(51),n(54),n(57),n(58),n(59)},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("jsonwebtoken")},function(e,t){e.exports=require("validator")},function(e,t,n){"use strict";t.__esModule=!0;var s=n(3),r=new s.Schema({channel:{type:String,required:!0},text:{type:String,required:!0},userEmail:{type:String,required:!0,lowercase:!0}},{timestamps:!0}),a=s.model("Message",r);t.default=a},function(e,t){e.exports=require("mocha")},function(e,t){e.exports=require("socket.io-client")},function(e,t){e.exports=require("redux")},function(e,t){e.exports=require("redux-thunk")},function(e,t,n){"use strict";t.__esModule=!0,t.TOGGLE_SIDEBAR_OPEN="TOGGLE_SIDEBAR_OPEN",t.toggleSidebarOpen=function(){return{type:t.TOGGLE_SIDEBAR_OPEN}}},function(e,t,n){"use strict";(function(e){t.__esModule=!0;var s=n(22),r=n(23),a=n(12),o=n(3),i=n(24),c=n(25),u=n(26),d=n(27),l=n(4),f=n(28),h=n(29),p=n(13),m=n(30),g=n(31)(u),E=n(32),S=n(39),v=n(2),_=n(1),w=r();t.app=w;var C,M,A=_.port;t.socketServer=M,w.engine("html",m()),w.set("view engine","html"),w.use(h());var y=u({secret:_.secret,cookie:{maxAge:864e5,sameSite:!0,secure:_.production,httpOnly:!0},saveUninitialized:!0,resave:!1,store:new g({mongooseConnection:o.connection})}),N=i({cookie:{maxAge:864e5,sameSite:!0,secure:_.production,httpOnly:!0,key:"_csrf"}});o.connect(_.useTestDb?_.mongodbTestConnectionUri:_.mongodbConnectionUri,{useNewUrlParser:!0}),o.connection.on("error",function(e){console.error("Mongoose connection error",e)}),process.on("SIGINT",function(){o.connection.close(function(){console.log("Mongoose default connection disconnected through app termination"),process.exit(0)})}),w.use(y),w.use(c(_.secret)),_.disableCsrf?(console.log("CSRF disabled"),w.use(function(e,t,n){return e.csrfToken=function(){return""},n()})):w.use(N);var b=o.connection;w.use(function(e,t,n){return e.db=b,n()}),w.use(d.json()),w.use(d.urlencoded({extended:!0})),w.use(f()),w.use(r.static(a.resolve(e,"../../dist/public/"))),w.use("/api",function(e,t,n){return n()}),w.use(function(e,t,n){e.authenticate=function(e,t,n){v.default.findByEmail(e).then(function(e){if(null===e)return n(!1,null);if(!l.compareSync(t,e.password))return n(!1,new Error("Invalid password"));var s={email:e.email,name:e.name,role:e.role};return n(s,null)}).catch(function(e){n(!1,e)})},e.logout=function(){e.session.token=null},e.issueNewToken=function(n){var s=p.sign({name:n.name,role:n.role,email:n.email},_.secret,{expiresIn:86400});e.session.token=s,t.setHeader("x-access-token",s)},n()}),E.default(w),(C=s.createServer(w)).on("error",function(e){console.error(e),C.close()}),_.disableAutoStart||(t.socketServer=M=S.default(C,b),o.connection.on("connected",function(){console.log("Connected to MongoDB via Mongoose"),C.listen(A,function(){console.log("Listening on port "+A+"!"),w.emit("server started")})})),t.default=C,t.conn=o.connection}).call(this,"src/server")},function(e,t){e.exports=require("http")},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("csurf")},function(e,t){e.exports=require("cookie-parser")},function(e,t){e.exports=require("express-session")},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("helmet")},function(e,t){e.exports=require("compression")},function(e,t){e.exports=require("mustache-express")},function(e,t){e.exports=require("connect-mongo")},function(e,t,n){"use strict";(function(e){t.__esModule=!0;var s=n(12),r=n(33),a=n(34),o=n(35),i=n(36),c=n(37);t.default=function(t){t.get("/",function(t,n){return n.render(s.resolve(e,"../../dist/public/index.html"),{csrfToken:t.csrfToken()})}),t.get("/widget",function(t,n){return n.render(s.resolve(e,"../../../dist/public/widget/index.html"))}),t.get("/widget/demo",function(t,n){return n.render(s.resolve(e,"../../../dist/public/widget/demo.html"))}),t.post("/api/v1/login",a.default.login),t.post("/api/v1/register",a.default.register),t.get("/api/v1/logout",a.default.logout),t.get("/api/v1/verifyEmail/:id",a.default.verifyEmail),t.use("/api/v1/user",r.default),t.get("/api/v1/user",o.default.user),t.get("/api/v1/users",o.default.users),t.get("/api/v1/user/:user",o.default.userByEmail),t.post("/api/v1/user/update/email",o.default.updateEmail),t.post("/api/v1/user/update/name",o.default.updateName),t.post("/api/v1/user/update/password",o.default.updatePassword),t.post("/api/v1/user/reset_password",o.default.resetPassword),t.get("/api/v1/message*",r.default),t.get("/api/v1/messages/:channel/:offset",i.default.messages),t.use("/api/v1/channel",r.default),t.get("/api/v1/channels",c.default.channels),t.post("/api/v1/channels/delete",c.default.delete),t.post("/api/v1/channels/create",c.default.create),t.get("*",function(t,n){return n.render(s.resolve(e,"../../dist/public/index.html"),{csrfToken:t.csrfToken()})})}}).call(this,"src/server")},function(e,t,n){"use strict";t.__esModule=!0;var s=n(13),r=n(1);t.default=function(e,t,n){e.session.token&&!e.headers["x-access-token"]&&t.setHeader("x-access-token",e.session.token);var a=e.headers["x-access-token"]||e.session.token;if(!a)return t.status(401).json({error:"Not authorized"});s.verify(a,r.secret,function(s,r){return s?t.status(401).send({error:"Not authorized"}):(e.user=r,n())})}},function(e,t,n){"use strict";t.__esModule=!0;var s=n(14),r=n(4),a=n(2);n(1);t.default={login:function(e,t){return s.isEmpty(e.body.email||"")||s.isEmpty(e.body.password||"")?t.status(400).json({error:"Please supply an email and password"}).end():s.isEmail(e.body.email)?void e.authenticate(e.body.email,e.body.password,function(n){return n?(e.issueNewToken(n),t.status(200).json({success:!0,email:n.email,role:n.role,name:n.name}).end()):t.status(401).json({error:"Invalid email or password"}).end()}):t.status(400).json({error:"Not a valid email address"}).end()},register:function(e,t){return s.isEmpty(e.body.email||"")||s.isEmpty(e.body.password||"")?t.status(400).json({error:"Please supply an email and password"}):s.isEmail(e.body.email)?a.default.findByEmail(e.body.email).countDocuments().exec().then(function(n){if(0!==n)return t.status(400).json({error:"Email address in use"});var s=r.hashSync(e.body.password);a.default.countDocuments().exec().then(function(n){var r="user";0===n&&(r="admin"),new a.default({name:"",email:e.body.email,password:s,role:r,emailVerified:!1}).save().then(function(e){return t.status(200).json({success:!0})}).catch(function(e){return console.error(e),t.status(500).json({error:"Something went wrong trying to create a new user"})})})}):t.status(400).json({error:"Not a valid email address"})},logout:function(e,t){return e.logout(),t.json({success:!0,message:"logged out"})},verifyEmail:function(e,t){}}},function(e,t,n){"use strict";t.__esModule=!0;var s=n(14),r=n(2),a=n(4);t.default={user:function(e,t){t.send(e.user)},users:function(e,t){return r.default.find({}).then(function(e){return t.status(200).json({success:!0,users:e})}).catch(function(e){return console.error(e),t.status(200).json({error:"Something went wrong while retrieving users"})})},userByEmail:function(e,t){return s.isEmail(e.params.user)?r.default.findByEmail(e.params.user).exec().then(function(e){return null!==e?t.status(200).json({user:{email:e.email,_id:e._id,name:e.name||""}}):t.status(400).json({error:"No user found with that email"})}).catch(function(e){return console.error(e),t.status(500).json({error:"Something went wrong trying to find the user"})}):t.status(400).json({error:"Please supply a valid email"})},updateEmail:function(e,t){return s.isEmail(e.body.email)?r.default.countDocuments({email:e.body.email}).exec().then(function(n){return 0!==n?t.status(400).json({error:"Email address already in use"}):r.default.findByEmail(e.user.email).exec().then(function(n){return n.email=e.body.email,n.save(),e.issueNewToken(Object.assign({},e.user,{email:e.body.email})),t.status(200).json({success:!0})}).catch(function(e){return console.error(e),t.status(500).json({error:"Something went wrong trying to fetch the user"})})}):t.status(400).json({error:"Not a valid email"})},updateName:function(e,t){return r.default.findByEmail(e.user.email).exec().then(function(n){return n.name=e.body.name,n.save(),e.issueNewToken(Object.assign({},e.user,{name:e.body.name})),t.status(200).json({success:!0})}).catch(function(e){return console.error(e),t.status(500).json({error:"Something went wrong trying to update the user"})})},updatePassword:function(e,t){return s.isEmpty(e.body.newPass)||s.isEmpty(e.body.oldPass)?t.status(400).json({error:"Must supply the current and new password"}):r.default.findByEmail(e.user.email).exec().then(function(n){return a.compareSync(e.body.oldPass,n.password)?(n.password=a.hashSync(e.body.newPass),n.save(),t.status(200).json({success:!0})):t.status(400).json({error:"Current password is incorrect"})})},resetPassword:function(e,t){return t.status(500).json({error:"Not implemented"})}}},function(e,t,n){"use strict";t.__esModule=!0;var s=n(15);t.default={messages:function(e,t){return s.default.find({channel:e.params.channel}).skip(parseInt(e.params.offest)).sort({_id:-1}).limit(20).exec().then(function(e){return t.status(200).json({messages:e.map(function(e){return{text:e.text,created:e.createdAt,userEmail:e.userEmail,channel:e.channel,_id:e._id}}).reverse()})}).catch(function(e){return t.status(400).json({error:"something went wrong trying to fetch messages"})})}}},function(e,t,n){"use strict";t.__esModule=!0;var s=n(38);t.default={channels:function(e,t){return s.default.countDocuments().exec().then(function(e){return new Promise(function(t,n){if(0!==e)return t();s.default.create([{name:"general"},{name:"random"}]).then(function(){return t()}).catch(function(e){return n(e)})}).then(function(){s.default.find().exec().then(function(e){return t.status(200).json({channels:e})}).catch(function(e){return console.log(e),t.status(500).json({error:"Something went wrong while trying to fetch channels"})})}).catch(function(e){return console.error(e),t.status(500).json({error:"Something went wrong while trying to create default channels"})})}).catch(function(e){return console.error(e),t.status(500).json({error:"Something went wrong while counting channels"})})},delete:function(e,t){},create:function(e,t){}}},function(e,t,n){"use strict";t.__esModule=!0;var s=n(3),r=new s.Schema({name:{type:String,required:!0,lowercase:!0}},{timestamps:!0}),a=s.model("Channel",r);t.default=a},function(e,t,n){"use strict";t.__esModule=!0;var s=n(40),r=n(41),a=n(15),o=n(1);t.default=function(e,t){var n=s(e),i=[];return n.on("connection",r.authorize({secret:o.secret,timeout:15e3,decodedPropertyName:"jwt"})).on("authenticated",function(e){i.push(e.jwt.email),console.log("Connected users",i),n.emit("connected users",i.filter(function(e,t,n){return n.indexOf(e)===t})),e.on("disconnect",function(){i.splice(i.indexOf(e.jwt.email),1),n.emit("connected users",i.filter(function(e,t,n){return n.indexOf(e)===t}))}),e.on("message",function(t){console.log(t),new a.default({channel:t.channel,text:t.text,userEmail:e.jwt.email}).save().then(function(t){n.emit("message",{_id:t._id,userEmail:t.userEmail,text:t.text,channel:t.channel,created:t.createdAt}),e.emit("message received")}).catch(function(t){console.error(t),e.emit("message receive error",t)})})}),n}},function(e,t){e.exports=require("socket.io")},function(e,t){e.exports=require("socketio-jwt")},function(e,t,n){"use strict";t.__esModule=!0;var s=n(7);n(16);var r=n(17),a=n(43),o=n(18),i=n(8),c=n(6),u=n(0),d=n(20),l=n(9),f=n(10);function h(){return o.createStore(a.rootReducer,a.middleware)}describe("Store and Synchronous Actions",function(){describe("User State",function(){var e,t;beforeEach(function(){e=h(),t=function(){return e.getState().user}}),it("should not be authorized",function(){s.assert.isFalse(t().authorized),s.assert.isFalse(t().email),s.assert.isFalse(t().name),s.assert.isFalse(t().role)}),it("should be authorized after setAuthorized action",function(){s.assert.isFalse(t().authorized),e.dispatch(i.setAuthorized(!0)),s.assert.isTrue(t().authorized),e.dispatch(i.setAuthorized(!1)),s.assert.isFalse(t().authorized)}),it("should have user data after setting the user",function(){s.assert.isFalse(t().authorized),s.assert.isFalse(t().email),s.assert.isFalse(t().name),s.assert.isFalse(t().role),e.dispatch(i.setUser({authorized:!0,email:"test@test.com",name:"Jane Doe",role:"admin"})),s.assert.isTrue(t().authorized),s.assert.strictEqual(t().email,"test@test.com"),s.assert.strictEqual(t().name,"Jane Doe"),s.assert.strictEqual(t().role,"admin"),e.dispatch(i.setUser({authorized:!1,email:!1,name:!1,role:!1})),s.assert.isFalse(t().authorized),s.assert.isFalse(t().email),s.assert.isFalse(t().name),s.assert.isFalse(t().role)}),it("should not have user data after logging out",function(){e.dispatch(i.setUser({authorized:!0,email:"test@test.com",name:"Jane Doe",role:"admin"})),e.dispatch(i.logoutUser()),e.dispatch(i.setUser({authorized:!1,email:!1,name:!1,role:!1}))})}),describe("Channels State",function(){var e,t;beforeEach(function(){e=h(),t=function(){return e.getState().channels}}),it("should add channels from an array of channel names",function(){e.dispatch(c.addChannels(["general","random","something else"]));var n=t()[0],r=t()[1],a=t()[2];s.assert.deepStrictEqual(n,{name:"general",messages:[],retrieveMessagesOffset:0,hasMoreMessages:!0,fetchingNewMessages:!1}),s.assert.deepStrictEqual(r,{name:"random",messages:[],retrieveMessagesOffset:0,hasMoreMessages:!0,fetchingNewMessages:!1}),s.assert.deepStrictEqual(a,{name:"something else",messages:[],retrieveMessagesOffset:0,hasMoreMessages:!0,fetchingNewMessages:!1})}),it("should update fetchingNewMessages after calling setChannelFetchingNewMessages action",function(){e.dispatch(c.addChannels(["general","random","something else"])),t().forEach(function(t){s.assert.isFalse(t.fetchingNewMessages),e.dispatch(c.setChannelFetchingNewMessages(t.name,!0))}),t().forEach(function(t){s.assert.isTrue(t.fetchingNewMessages),e.dispatch(c.setChannelFetchingNewMessages(t.name,!1))}),t().forEach(function(e){s.assert.isFalse(e.fetchingNewMessages)})}),it("should increment the channel offset for retrieving new messages",function(){e.dispatch(c.addChannels(["general","random","something else"])),s.assert.strictEqual(t().find(function(e){return"general"===e.name}).retrieveMessagesOffset,0),s.assert.strictEqual(t().find(function(e){return"random"===e.name}).retrieveMessagesOffset,0),s.assert.strictEqual(t().find(function(e){return"something else"===e.name}).retrieveMessagesOffset,0),e.dispatch(c.incrementChannelRetrieveMessagesOffset("general",20)),s.assert.strictEqual(t().find(function(e){return"general"===e.name}).retrieveMessagesOffset,20),e.dispatch(c.incrementChannelRetrieveMessagesOffset("general",1)),s.assert.strictEqual(t().find(function(e){return"general"===e.name}).retrieveMessagesOffset,21),e.dispatch(c.incrementChannelRetrieveMessagesOffset("random",1)),s.assert.strictEqual(t().find(function(e){return"random"===e.name}).retrieveMessagesOffset,1),e.dispatch(c.incrementChannelRetrieveMessagesOffset("something else",1)),s.assert.strictEqual(t().find(function(e){return"something else"===e.name}).retrieveMessagesOffset,1)}),it("should update the hasMoreMessages property on a channel",function(){e.dispatch(c.addChannels(["general","random","something else"])),s.assert.isTrue(t().find(function(e){return"general"===e.name}).hasMoreMessages),s.assert.isTrue(t().find(function(e){return"random"===e.name}).hasMoreMessages),s.assert.isTrue(t().find(function(e){return"something else"===e.name}).hasMoreMessages),e.dispatch(c.setChannelHasMoreMessages("general",!1)),e.dispatch(c.setChannelHasMoreMessages("random",!1)),e.dispatch(c.setChannelHasMoreMessages("something else",!1)),s.assert.isFalse(t().find(function(e){return"general"===e.name}).hasMoreMessages),s.assert.isFalse(t().find(function(e){return"random"===e.name}).hasMoreMessages),s.assert.isFalse(t().find(function(e){return"something else"===e.name}).hasMoreMessages)}),it("should add a received message to the appropriate channel",function(){e.dispatch(c.addChannels(["general","random","something else"]));var n={userEmail:"test@test.com",created:Date.now().toString(),_id:"1",text:"this is the message"};e.dispatch(c.addReceivedChannelMessage("general",n)),e.dispatch(c.addReceivedChannelMessage("random",n)),e.dispatch(c.addReceivedChannelMessage("random",n)),e.dispatch(c.addReceivedChannelMessage("something else",n)),e.dispatch(c.addReceivedChannelMessage("something else",n)),e.dispatch(c.addReceivedChannelMessage("something else",n));var r=t().find(function(e){return"general"===e.name}).messages;s.assert.deepStrictEqual(r.length,1),s.assert.deepStrictEqual(r,[n]);var a=t().find(function(e){return"random"===e.name}).messages;s.assert.deepStrictEqual(a.length,2),s.assert.deepStrictEqual(a,[n,n]);var o=t().find(function(e){return"something else"===e.name}).messages;s.assert.deepStrictEqual(o.length,3),s.assert.deepStrictEqual(o,[n,n,n])}),it("should add retreived messages to the appropriate channel",function(){e.dispatch(c.addChannels(["general","random","something else"]));var n=[{text:"Something here",created:"2019-04-13T16:45:28.946Z",userEmail:"abkothman@gmail.com",_id:"5cb212281d645a22abea8dbe"},{text:"12341234",created:"2019-04-14T22:34:06.686Z",userEmail:"abkothman@gmail.com",_id:"5cb3b55ecbf68c6a954eafb3"},{text:"test one two three",created:"2019-04-14T22:34:10.903Z",userEmail:"abkothman@gmail.com",_id:"5cb3b562cbf68c6a954eafb4"}];e.dispatch(c.addRetrievedChannelMessages("general",n)),e.dispatch(c.addRetrievedChannelMessages("random",n)),e.dispatch(c.addRetrievedChannelMessages("random",n));var r=t();s.assert.deepStrictEqual(r.find(function(e){return"general"===e.name}).messages,n),s.assert.deepStrictEqual(r.find(function(e){return"random"===e.name}).messages,n.concat(n)),s.assert.deepStrictEqual(r.find(function(e){return"something else"===e.name}).messages,[])}),it("should clear all channel data",function(){e.dispatch(c.addChannels(["general","random","something else"]));var n=[{text:"Something here",created:"2019-04-13T16:45:28.946Z",userEmail:"abkothman@gmail.com",_id:"5cb212281d645a22abea8dbe"},{text:"12341234",created:"2019-04-14T22:34:06.686Z",userEmail:"abkothman@gmail.com",_id:"5cb3b55ecbf68c6a954eafb3"},{text:"test one two three",created:"2019-04-14T22:34:10.903Z",userEmail:"abkothman@gmail.com",_id:"5cb3b562cbf68c6a954eafb4"}];e.dispatch(c.addRetrievedChannelMessages("general",n)),e.dispatch(c.addRetrievedChannelMessages("random",n)),e.dispatch(c.addRetrievedChannelMessages("random",n)),e.dispatch(c.clearChannelsData());var r=t();s.assert.deepStrictEqual(r,[])})}),describe("Notifications State",function(){var e,t;beforeEach(function(){e=h(),t=function(){return e.getState().notifications}}),it("should add errors",function(){s.assert.deepStrictEqual(t().errors,[]),e.dispatch(u.addError("Test error")),s.assert.deepStrictEqual(t().errors,["Test error"]),e.dispatch(u.addError("Another error")),s.assert.deepStrictEqual(t().errors,["Test error","Another error"])}),it("should remove errors given an index",function(){e.dispatch(u.addError("Test error")),e.dispatch(u.addError("Another error")),s.assert.deepStrictEqual(t().errors,["Test error","Another error"]),e.dispatch(u.removeError(1)),s.assert.deepStrictEqual(t().errors,["Test error"]),e.dispatch(u.removeError(0)),s.assert.deepStrictEqual(t().errors,[])}),it("should clear errors",function(){e.dispatch(u.addError("Test error")),e.dispatch(u.addError("Another error")),e.dispatch(u.clearErrors()),s.assert.deepStrictEqual(t().errors,[])}),it("should add info",function(){s.assert.deepStrictEqual(t().infos,[]),e.dispatch(u.addInfo("Test info")),s.assert.deepStrictEqual(t().infos,["Test info"]),e.dispatch(u.addInfo("Another info")),s.assert.deepStrictEqual(t().infos,["Test info","Another info"])}),it("should remove info given an index",function(){e.dispatch(u.addInfo("Test info")),e.dispatch(u.addInfo("Another info")),e.dispatch(u.removeInfo(1)),s.assert.deepStrictEqual(t().infos,["Test info"]),e.dispatch(u.removeInfo(0)),s.assert.deepStrictEqual(t().infos,[])}),it("should clear infos",function(){e.dispatch(u.addInfo("Test info")),e.dispatch(u.addInfo("Another info")),e.dispatch(u.clearInfos()),s.assert.deepStrictEqual(t().infos,[])})}),describe("Sidebar State",function(){var e,t;beforeEach(function(){e=h(),t=function(){return e.getState().sidebar}}),it("should toggle open state",function(){s.assert.isTrue(t().open),e.dispatch(d.toggleSidebarOpen()),s.assert.isFalse(t().open),e.dispatch(d.toggleSidebarOpen()),s.assert.isTrue(t().open),e.dispatch(d.toggleSidebarOpen()),s.assert.isFalse(t().open)})}),describe("Socket State",function(){var e,t;beforeEach(function(){e=h(),t=function(){return e.getState().socket}}),it("should set the socket given a SocketIOClient Socket",function(){s.assert.deepStrictEqual(t(),{io:null,connected:!1,connectedUserEmails:[]});var n=r();e.dispatch(l.initWebsocket(n)),s.assert.deepStrictEqual(t(),{io:n,connected:!1,connectedUserEmails:[]}),n.close()}),it("should update the connected state",function(){e.dispatch(l.setSocketConnected(!0)),s.assert.deepStrictEqual(t(),{io:null,connected:!0,connectedUserEmails:[]}),e.dispatch(l.setSocketConnected(!1)),s.assert.deepStrictEqual(t(),{io:null,connected:!1,connectedUserEmails:[]})}),it("should update the connected users",function(){var n=["test@test.com","test2@test.com"];e.dispatch(l.setSocketConnectedUsers(n)),s.assert.deepStrictEqual(t(),{io:null,connected:!1,connectedUserEmails:n})})}),describe("Chat Users State",function(){var e,t;beforeEach(function(){e=h(),t=function(){return e.getState().chatUsers}}),it("should update users",function(){var n={"test@test.com":{role:"user",name:"Test Name"},"test2@test.com":{role:"admin",name:"Another test"},"test3@test.com":{role:"admin",name:"Last test"}};e.dispatch(f.updateUsers(n)),s.assert.deepStrictEqual(t(),n)}),it("should add a user"),it("should remove a user")})})},function(e,t,n){"use strict";t.__esModule=!0;var s=n(18),r=n(19),a=n(44),o=n(45),i=n(46),c=n(47),u=n(48),d=n(49),l=n(50),f=n(1);t.rootReducer=s.combineReducers({user:o.default,channels:i.default,notifications:c.default,sidebar:u.default,socket:d.default,chatUsers:l.default}),t.middleware=f.production||f.disableReduxLogging?s.applyMiddleware(r.default):s.applyMiddleware(r.default,a.createLogger()),t.default=s.createStore(t.rootReducer,t.middleware)},function(e,t){e.exports=require("redux-logger")},function(e,t,n){"use strict";t.__esModule=!0;var s=n(8),r={authorized:!1,email:!1,name:!1,role:!1,jwt:!1};t.default=function(e,t){switch(void 0===e&&(e=r),t.type){case s.SET_AUTHORIZED:return"boolean"!=typeof t.data?(console.error("Data must be boolean for SET_AUTHORIZED action"),e):!1===t.data?Object.assign({},e,{authorized:!1,email:!1}):Object.assign({},e,{authorized:t.data});case s.SET_USER:return Object.assign({},e,t.data);case s.LOGOUT_USER:return{authorized:!1,name:!1,email:!1,role:!1};case s.SET_JWT:return Object.assign({},e,{token:t.data});default:return e}}},function(e,t,n){"use strict";t.__esModule=!0;var s=n(6),r=[];t.channelExists=function(e,t){var n=e.find(function(e){return e.name===t});return n||!1},t.default=function(e,n){switch(void 0===e&&(e=r),n.type){case s.ADD_CHANNELS:return n.data.channels;case s.INCREMENT_CHANNEL_RETRIEVE_MESSAGES_OFFSET:var a=t.channelExists(e,n.data.channel),o=n.data.increment;return a?e.map(function(e){return e.name===a.name&&(e.retrieveMessagesOffset+=o),e}):(console.log("Unknown channel while incrementing messages offset",n),e);case s.SET_CHANNEL_FETCHING_NEW_MESSAGES:return t.channelExists(e,n.data.channelName)?e.map(function(e){return e.name===n.data.channelName&&(e.fetchingNewMessages=n.data.isFetching),e}):(console.log("Unknown channel while fetching new messages",n),e);case s.SET_CHANNEL_HAS_MORE_MESSAGES:var i=t.channelExists(e,n.data.channelName),c=n.data.hasMore;return i?e.map(function(e){return e.name===n.data.channelName&&(e.hasMoreMessages=c),e}):(console.log("Unknown channel while setting hasMore messages",n),e);case s.ADD_RETRIEVED_CHANNEL_MESSAGES:var u=n.data.messages,d=n.data.channelName;return t.channelExists(e,d)?e.map(function(e){return e.name===d&&(e.messages=u.concat(e.messages)),e}):(console.log("Unknown channel while adding retrieved channel messages",n),e);case s.ADD_RECEIVED_CHANNEL_MESSAGE:var l=n.data.message,f=n.data.channelName;return t.channelExists(e,f)?e.map(function(e){return e.name===f&&(e.messages=e.messages.concat([l])),e}):(console.log("Unknown channel while adding received message",e,n),e);case s.CLEAR_CHANNELS_DATA:return[];default:return e}}},function(e,t,n){"use strict";t.__esModule=!0;var s=n(0),r={errors:[],infos:[]};t.default=function(e,t){switch(void 0===e&&(e=r),t.type){case s.ADD_ERROR:return Object.assign({},e,{errors:e.errors.concat([t.data])});case s.REMOVE_ERROR:var n=e.errors.slice();return n.splice(t.data,1),Object.assign({},e,{errors:n});case s.CLEAR_ERRORS:return Object.assign({},e,{errors:[]});case s.ADD_INFO:return Object.assign({},e,{infos:e.infos.concat([t.data])});case s.REMOVE_INFO:var a=e.infos.slice();return a.splice(t.data,1),Object.assign({},e,{infos:a});case s.CLEAR_INFOS:return Object.assign({},e,{infos:[]});default:return e}}},function(e,t,n){"use strict";t.__esModule=!0;var s=n(20),r={open:!0};t.default=function(e,t){switch(void 0===e&&(e=r),t.type){case s.TOGGLE_SIDEBAR_OPEN:return Object.assign({},e,{open:!e.open});default:return e}}},function(e,t,n){"use strict";t.__esModule=!0;var s=n(9),r={io:null,connected:!1,connectedUserEmails:[]};t.default=function(e,t){switch(void 0===e&&(e=r),t.type){case s.INIT_WEBSOCKET:return Object.assign({},e,{io:t.data.io});case s.SET_SOCKET_CONNECTED:return Object.assign({},e,{connected:t.data.connected});case s.SET_SOCKET_CONNECTED_USERS:return Object.assign({},e,{connectedUserEmails:t.data.userEmails});default:return e}}},function(e,t,n){"use strict";t.__esModule=!0;var s=n(10),r={};t.default=function(e,t){var n;switch(void 0===e&&(e=r),t.type){case s.UPDATE_CHAT_USERS:return t.data.users;case s.ADD_CHAT_USER:return Object.assign({},e,((n={})[t.data.user.email]={role:t.data.user.role,name:t.data.user.name},n));case s.REMOVE_CHAT_USER:delete Object.assign({},e)[t.data.email];default:return e}}},function(e,t,n){"use strict";t.__esModule=!0,n(16);var s=n(5),r=n(7),a=n(52),o=n(53),i=n(19),c=n(8),u=n(0),d=n(9),l=n(6),f=n(10),h=o.default([i.default]);function p(e){return void 0===e&&(e={}),h(e)}describe("Async Actions",function(){var e,t;before(function(){t=new a.default(s.default)}),after(function(){t.restore()}),describe("User async actions",function(){beforeEach(function(){e=p(),t.reset(),t.onAny().reply(200,{})}),it("should handle callback and set info on successful post request to /api/v1/user/update/name",function(t){var n=!1;e.dispatch(c.updateName("Adrian",function(){return n="Adrian"})).then(function(){r.assert.strictEqual(n,"Adrian");var s=e.getActions();r.assert.deepStrictEqual(s,[{type:u.ADD_INFO,data:"Name updated"}]),t()}).catch(t)}),it("should set an error on failed post request to /api/v1/user/update/name",function(n){var s=!1;t.reset(),t.onPost("/api/v1/user/update/name").reply(500,{error:"Something went wrong"}),e.dispatch(c.updateName("Adrian",function(){return s="Adrian"})).then(function(){r.assert.strictEqual(s,!1);var t=e.getActions();r.assert.deepStrictEqual(t,[{type:u.ADD_ERROR,data:"Something went wrong"}]),n()}).catch(n)}),it("should handle callback and set info on successful post request to /api/v1/user/update/email",function(t){var n=!1;e.dispatch(c.updateEmail("test@test.com",function(){return n="test@test.com"})).then(function(){r.assert.strictEqual(n,"test@test.com");var s=e.getActions();r.assert.deepStrictEqual(s,[{type:u.ADD_INFO,data:"Email updated"}]),t()}).catch(t)}),it("should set an error on failed post request to /api/v1/user/update/email",function(n){var s=!1;t.reset(),t.onPost("/api/v1/user/update/email").reply(500,{error:"Something went wrong"}),e.dispatch(c.updateEmail("test@test.com",function(){return s="test@test.com"})).then(function(){r.assert.isFalse(s);var t=e.getActions();r.assert.deepStrictEqual(t,[{type:u.ADD_ERROR,data:"Something went wrong"}]),n()}).catch(n)}),it("should set info on successful post request to /api/v1/user/update/password",function(t){var n=!1;e.dispatch(c.updatePassword("a","b",function(){return n=!0})).then(function(){r.assert.isTrue(n);var s=e.getActions();r.assert.deepStrictEqual(s,[{type:u.ADD_INFO,data:"Password updated"}]),t()}).catch(t)}),it("should set an error on failed post request to /api/v1/user/update/password",function(n){var s=!1;t.reset(),t.onPost("/api/v1/user/update/password").reply(500,{error:"Something went wrong"}),e.dispatch(c.updatePassword("a","b",function(){return s=!0})).then(function(){r.assert.isFalse(s);var t=e.getActions();r.assert.deepStrictEqual(t,[{type:u.ADD_ERROR,data:"Something went wrong"}]),n()}).catch(n)})}),describe("Channels async actions",function(){beforeEach(function(){e=h({channels:[{name:"general",fetchingNewMessages:!1,hasMoreMessages:!0,retrieveMessagesOffset:0},{name:"fetching new messages",fetchingNewMessages:!0,hasMoreMessages:!0},{name:"no more messages",fetchingNewMessages:!1,hasMoreMessages:!1}]}),t.reset(),t.onAny().reply(200,{})}),it("should fetch channels and dispatch addChannels with an array of channel names",function(n){t.reset(),t.onGet("/api/v1/channels").reply(200,{channels:[{_id:"1",name:"general"},{_id:"2",name:"random"},{_id:"3",name:"something else"}]}),e.dispatch(l.fetchChannels()).then(function(){var t=e.getActions(),s=l.addChannels(["general","random","something else"]);r.assert.deepStrictEqual(t,[s]),n()}).catch(n)}),it("should dispatch addError on failed request to /api/v1/channels",function(n){t.reset(),t.onGet("/api/v1/channels").reply(500),e.dispatch(l.fetchChannels()).then(function(){var t=e.getActions(),s=u.addError("Something went wrong while trying to fetch the channels");r.assert.deepStrictEqual(t,[s]),n()}).catch(n)}),it("should dispatch an error if retrieving messages with invalid channel name",function(t){e.dispatch(l.retrieveChannelMessages("invalid name")).then(function(n){r.assert.strictEqual(n,"Retrieve Channel Messages dispatched with incorrect channel name or while already fetching messages");var s=e.getActions(),a=u.addError("Something went wrong while trying to fetch messages");r.assert.deepStrictEqual(s,[a]),t()}).catch(t)}),it("should dispatch an error if already retrieving channel messages",function(t){e.dispatch(l.retrieveChannelMessages("fetching new messages")).then(function(n){r.assert.strictEqual(n,"Retrieve Channel Messages dispatched with incorrect channel name or while already fetching messages");var s=e.getActions(),a=u.addError("Something went wrong while trying to fetch messages");r.assert.deepStrictEqual(s,[a]),t()}).catch(t)}),it("should dispatch an error if channel does not have older messages",function(t){e.dispatch(l.retrieveChannelMessages("no more messages")).then(function(n){r.assert.strictEqual(n,"Retrieve Channel Messages dispatched with incorrect channel name or while already fetching messages");var s=e.getActions(),a=u.addError("Something went wrong while trying to fetch messages");r.assert.deepStrictEqual(s,[a]),t()}).catch(t)}),it("should dispatch an error on failed get request to /api/v1/messages/",function(n){t.reset(),t.onGet().reply(500);e.dispatch(l.retrieveChannelMessages("general")).then(function(){var t=e.getActions(),s=l.setChannelFetchingNewMessages("general",!0),a=u.addError("Something went wrong while trying to fetch messages"),o=l.setChannelFetchingNewMessages("general",!1);r.assert.deepStrictEqual(t,[s,a,o]),n()}).catch(n)}),it("should set channelHasMoreMessages on response with empty array",function(n){t.reset(),t.onGet().reply(200,{messages:[]});e.dispatch(l.retrieveChannelMessages("general")).then(function(){var t=e.getActions(),s=l.setChannelFetchingNewMessages("general",!0),a=l.setChannelHasMoreMessages("general",!1),o=l.setChannelFetchingNewMessages("general",!1);r.assert.deepStrictEqual(t,[s,a,o]),n()}).catch(n)}),it("should increment offset (based on number of received messages) and add retrieved channel messages on successful retreiveChannelMessages action",function(n){var s=[{text:"123",created:Date.now().toString(),userEmail:"test@test.com",_id:"1"},{text:"456",created:Date.now().toString(),userEmail:"test@test.com",_id:"2"}];t.reset(),t.onGet().reply(200,{messages:s}),e.dispatch(l.retrieveChannelMessages("general")).then(function(){var t=e.getActions(),a=l.setChannelFetchingNewMessages("general",!0),o=l.incrementChannelRetrieveMessagesOffset("general",s.length),i=l.addRetrievedChannelMessages("general",s),c=l.setChannelFetchingNewMessages("general",!1);r.assert.deepStrictEqual(t,[a,o,i,c]),n()}).catch(n)}),it("should dispatch info on successfully deleting channel",function(n){t.reset(),t.onGet("/api/v1/channels").reply(200,{channels:[{_id:"1",name:"general"},{_id:"2",name:"random"},{_id:"3",name:"something else"}]}),t.onGet().reply(200),e.dispatch(l.deleteChannel("general")).then(function(){var t=e.getActions(),s=u.addInfo("Channel deleted"),a=l.addChannels(["general","random","something else"]);r.assert.deepStrictEqual(t,[s,a]),n()}).catch(n)}),it("should dispatch an error on failed attempt to delete channel",function(n){t.reset(),t.onGet().reply(500,{error:"Something went wrong"}),e.dispatch(l.deleteChannel("general")).then(function(){var t=e.getActions(),s=u.addError("Something went wrong");r.assert.deepStrictEqual(t,[s]),n()}).catch(n)}),it("should dispatch info on creating new channel",function(n){t.reset(),t.onGet("/api/v1/channels").reply(200,{channels:[{_id:"1",name:"general"},{_id:"2",name:"random"},{_id:"3",name:"something else"}]}),t.onPost().reply(200),e.dispatch(l.addChannel("new channel")).then(function(){var t=e.getActions(),s=u.addInfo("Channel created"),a=l.addChannels(["general","random","something else"]);r.assert.deepStrictEqual(t,[s,a]),n()}).catch(n)}),it("should dispatch an error on failed attempt to create a new channel",function(n){t.reset(),t.onAny().reply(500,{error:"Something went wrong"}),e.dispatch(l.addChannel("new channel")).then(function(){var t=e.getActions(),s=u.addError("Something went wrong");r.assert.deepStrictEqual(t,[s]),n()}).catch(n)})}),describe("Socket async actions",function(){beforeEach(function(){e=p()}),it("should initialize websocket connection",function(){e.dispatch(d.init());var t=e.getActions();r.assert.strictEqual(t[0].type,d.INIT_WEBSOCKET),t[0].data.io.close()})}),describe("Chat Users async actions",function(){beforeEach(function(){e=p()}),it("should dipatch updateUsers on fetch all users",function(n){var s=[{email:"test@test.com",role:"admin",name:"test"},{email:"test2@test.com",role:"general",name:"test"}],a={};s.forEach(function(e){a[e.email]={name:e.name,role:e.role}}),t.reset(),t.onAny().reply(200,{users:s}),e.dispatch(f.fetchAllUsers()).then(function(){var t=e.getActions(),s=f.updateUsers(a);r.assert.deepStrictEqual(t,[s]),n()}).catch(n)}),it("should dispatch addError on failed attempt to fetch users",function(n){t.reset(),t.onAny().reply(500),e.dispatch(f.fetchAllUsers()).then(function(){var t=e.getActions(),s=u.addError("Fetching all users failed");r.assert.deepStrictEqual(t,[s]),n()}).catch(n)}),it("should create a new user"),it("should edit the user"),it("should delete the user")})})},function(e,t){e.exports=require("axios-mock-adapter")},function(e,t){e.exports=require("redux-mock-store")},function(e,t,n){"use strict";t.__esModule=!0;var s=n(55),r=n(4),a=n(11),o=n(2),i=n(7),c=n(56);describe("Auth Controller",function(){describe("login",function(){beforeEach(function(e){a.dropAllCollections().then(function(){new o.default({name:"Adrian",email:"test@test.com",password:r.hashSync("test"),role:"user"}).save().then(function(t){return e()}).catch(function(e){throw e})})}),it("should login the user",function(e){s(a.app).post("/api/v1/login").send({email:"test@test.com",password:"test"}).expect(200).end(function(t){if(t)return e(t);e()})}),it("should return the logged-in user details",function(e){s(a.app).post("/api/v1/login").send({email:"test@test.com",password:"test"}).expect(200).end(function(t,n){if(t)return e(t);var s=JSON.parse(n.text);i.assert.strictEqual(s.email,"test@test.com"),i.assert.strictEqual(s.role,"user"),i.assert.strictEqual(s.name,"Adrian"),e()})}),it("should return an error if the email does not exist",function(e){s(a.app).post("/api/v1/login").send({email:"test.does.not.exit@test.com",password:"test"}).expect(401).end(function(t,n){if(t)return e(t);var s=JSON.parse(n.text);i.assert.strictEqual(s.error,"Invalid email or password"),e()})}),it("should return an error if the password does not match the hash",function(e){s(a.app).post("/api/v1/login").send({email:"test@test.com",password:"test-invalid-password"}).expect(401).end(function(t,n){if(t)return e(t);var s=JSON.parse(n.text);i.assert.strictEqual(s.error,"Invalid email or password"),e()})}),it("should return an error if the email or password is missing",function(e){s(a.app).post("/api/v1/login").send({password:"test"}).expect(400).end(function(t,n){if(t)return e(t);var r=JSON.parse(n.text);i.assert.strictEqual(r.error,"Please supply an email and password"),s(a.app).post("/api/v1/login").send({email:"test@test.com"}).expect(400).end(function(t,n){if(t)return e(t);var s=JSON.parse(n.text);i.assert.strictEqual(s.error,"Please supply an email and password"),e()})})}),it("should return an error if the email is not valid",function(e){s(a.app).post("/api/v1/login").send({email:"not an email@asdf",password:"1234"}).expect(400).end(function(t,n){if(t)return e(t);var s=JSON.parse(n.text);i.assert.strictEqual(s.error,"Not a valid email address"),e()})})}),describe("register",function(){beforeEach(function(e){a.dropAllCollections().then(function(){return e()})}),it("should register a user",function(e){s(a.app).post("/api/v1/register").send({email:"test@test.com",password:"test"}).expect(200).end(function(t,n){if(t)return e(t);o.default.findByEmail("test@test.com").exec().then(function(t){if(!t)return i.assert.fail(),e();e()}).catch(function(t){return e(t)})})}),it("should create an admin user if no users exist",function(e){s(a.app).post("/api/v1/register").send({email:"test@test.com",password:"test"}).expect(200).end(function(t,n){if(t)return e(t);o.default.findByEmail("test@test.com").exec().then(function(t){t||i.assert.fail(),i.assert.strictEqual(t.role,"admin"),e()}).catch(function(t){return e(t)})})}),it("should create a regular user if users exist",function(e){new o.default({name:"test",email:"admin@test.com",password:"password",role:"admin"}).save().then(function(){s(a.app).post("/api/v1/register").send({email:"test@test.com",password:"test"}).expect(200).end(function(t,n){if(t)return e(t);o.default.findByEmail("test@test.com").exec().then(function(t){t||i.assert.fail(),i.assert.strictEqual(t.role,"user"),e()}).catch(function(t){return e(t)})})})}),it("should return an error if email or password not provided",function(e){s(a.app).post("/api/v1/register").send({email:"test@test.com"}).expect(400).end(function(t,n){if(t)return e(t);var r=JSON.parse(n.text);i.assert.strictEqual(r.error,"Please supply an email and password"),s(a.app).post("/api/v1/register").send({password:"123"}).expect(400).end(function(t,n){if(t)return e(t);var s=JSON.parse(n.text);i.assert.strictEqual(s.error,"Please supply an email and password"),e()})})}),it("should return an error if not a valid email",function(e){s(a.app).post("/api/v1/register").send({email:"not an email @ asdlfkj;l",password:"1234"}).expect(400).end(function(t,n){if(t)return e(t);var s=JSON.parse(n.text);i.assert.strictEqual(s.error,"Not a valid email address"),e()})})}),describe("logout",function(){var e;beforeEach(function(t){e=c(a.app),a.dropAllCollections().then(function(){new o.default({name:"Adrian",email:"test@test.com",password:r.hashSync("test"),role:"user"}).save().then(function(e){return t()}).catch(function(e){throw e})})}),it("should log out the user",function(t){e.post("/api/v1/login").send({email:"test@test.com",password:"test"}).end(function(n){if(n)return t(n);e.get("/api/v1/user").send().expect(200).end(function(n){if(n)return t(n);e.get("/api/v1/logout").send().expect(200).end(function(n){if(n)return t(n);e.get("/api/v1/user").send().expect(401).end(t)})})})})}),describe("verify email",function(){beforeEach(function(e){a.dropAllCollections().then(function(){return e()})}),it("should verify an email given the correct verification link"),it("should not verify an email with an incorrect verification link")})})},function(e,t){e.exports=require("supertest")},function(e,t){e.exports=require("supertest-session")},function(e,t){},function(e,t){},function(e,t){}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9hY3Rpb25zL25vdGlmaWNhdGlvbnNBY3Rpb25zLnRzIiwid2VicGFjazovLy8uL2Vudi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21vZGVscy9Vc2VyLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbmdvb3NlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmNyeXB0anNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiIiwid2VicGFjazovLy8uL3NyYy93ZWIvYWN0aW9ucy9jaGFubmVsc0FjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2hhaVwiIiwid2VicGFjazovLy8uL3NyYy93ZWIvYWN0aW9ucy91c2VyQWN0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL2FjdGlvbnMvc29ja2V0QWN0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL2FjdGlvbnMvY2hhdFVzZXJzQWN0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi90ZXN0cy9pbmRleC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwianNvbndlYnRva2VuXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidmFsaWRhdG9yXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9tb2RlbHMvTWVzc2FnZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb2NoYVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvY2tldC5pby1jbGllbnRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LXRodW5rXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9hY3Rpb25zL3NpZGViYXJBY3Rpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvc2VydmVyLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY3N1cmZcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb29raWUtcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzcy1zZXNzaW9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJoZWxtZXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb21wcmVzc2lvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm11c3RhY2hlLWV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb25uZWN0LW1vbmdvXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9yb3V0ZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9taWRkbGV3YXJlL2F1dGhvcml6ZWQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9jb250cm9sbGVycy9hdXRoQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2NvbnRyb2xsZXJzL3VzZXJDb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvY29udHJvbGxlcnMvbWVzc2FnZUNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9jb250cm9sbGVycy9jaGFubmVsQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21vZGVscy9DaGFubmVsLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvc29ja2V0LmlvL2luZGV4LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvY2tldC5pb1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvY2tldGlvLWp3dFwiIiwid2VicGFjazovLy8uL3Rlc3RzL3dlYi90ZXN0U3RvcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9zdG9yZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eC1sb2dnZXJcIiIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL3JlZHVjZXJzL3VzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9yZWR1Y2Vycy9jaGFubmVscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL3JlZHVjZXJzL25vdGlmaWNhdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9yZWR1Y2Vycy9zaWRlYmFyLnRzIiwid2VicGFjazovLy8uL3NyYy93ZWIvcmVkdWNlcnMvc29ja2V0LnRzIiwid2VicGFjazovLy8uL3NyYy93ZWIvcmVkdWNlcnMvY2hhdFVzZXJzLnRzIiwid2VicGFjazovLy8uL3Rlc3RzL3dlYi90ZXN0QXN5bmNBY3Rpb25zLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF4aW9zLW1vY2stYWRhcHRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LW1vY2stc3RvcmVcIiIsIndlYnBhY2s6Ly8vLi90ZXN0cy9zZXJ2ZXIvdGVzdEF1dGhDb250cm9sbGVyLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcInN1cGVydGVzdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInN1cGVydGVzdC1zZXNzaW9uXCIiXSwibmFtZXMiOlsiaW5zdGFsbGVkTW9kdWxlcyIsIl9fd2VicGFja19yZXF1aXJlX18iLCJtb2R1bGVJZCIsImV4cG9ydHMiLCJtb2R1bGUiLCJpIiwibCIsIm1vZHVsZXMiLCJjYWxsIiwibSIsImMiLCJkIiwibmFtZSIsImdldHRlciIsIm8iLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJnZXQiLCJyIiwiU3ltYm9sIiwidG9TdHJpbmdUYWciLCJ2YWx1ZSIsInQiLCJtb2RlIiwiX19lc01vZHVsZSIsIm5zIiwiY3JlYXRlIiwia2V5IiwiYmluZCIsIm4iLCJvYmplY3QiLCJwcm9wZXJ0eSIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwicCIsInMiLCJBRERfRVJST1IiLCJSRU1PVkVfRVJST1IiLCJDTEVBUl9FUlJPUlMiLCJBRERfSU5GTyIsIlJFTU9WRV9JTkZPIiwiQ0xFQVJfSU5GT1MiLCJhZGRFcnJvciIsImVycm9yIiwidHlwZSIsImRhdGEiLCJyZW1vdmVFcnJvciIsImNsZWFyRXJyb3JzIiwiYWRkSW5mbyIsImluZm8iLCJyZW1vdmVJbmZvIiwiY2xlYXJJbmZvcyIsIm1vbmdvZGJDb25uZWN0aW9uVXJpIiwicHJvY2VzcyIsImVudiIsIk1PTkdPREJfVVJJIiwibW9uZ29kYlRlc3RDb25uZWN0aW9uVXJpIiwicG9ydCIsIlBPUlQiLCJwcm9kdWN0aW9uIiwidXNlVGVzdERiIiwiVVNFX1RFU1RfREIiLCJzZWNyZXQiLCJTRUNSRVQiLCJkaXNhYmxlQ3NyZiIsIkRJU0FCTEVfQ1NSRiIsImRpc2FibGVSZWR1eExvZ2dpbmciLCJESVNBQkxFX1JFRFVYX0xPR0dJTkciLCJkaXNhYmxlQXV0b1N0YXJ0IiwiRElTQUJMRV9BVVRPX1NUQVJUIiwibWFpbGd1bkFwaUtleSIsIk1BSUxHVU5fQVBJX0tFWSIsIm1haWxndW5Eb21haW4iLCJNQUlMR1VOX0RPTUFJTiIsImJhc2VVcmwiLCJCQVNFX1VSTCIsIm1vbmdvb3NlXzEiLCJ1c2VyU2NoZW1hIiwiU2NoZW1hIiwiU3RyaW5nIiwiZW1haWwiLCJyZXF1aXJlZCIsImxvd2VyY2FzZSIsInBhc3N3b3JkIiwicm9sZSIsImVudW0iLCJ0aW1lc3RhbXBzIiwic3RhdGljcyIsImZpbmRCeUVtYWlsIiwidGhpcyIsImZpbmRPbmUiLCJVc2VyIiwibW9kZWwiLCJyZXF1aXJlIiwiX3RoaXMiLCJheGlvc18xIiwibm90aWZpY2F0aW9uc0FjdGlvbnNfMSIsIkFERF9DSEFOTkVMUyIsIlNFVF9DSEFOTkVMX0ZFVENISU5HX05FV19NRVNTQUdFUyIsIlNFVF9DSEFOTkVMX0hBU19NT1JFX01FU1NBR0VTIiwiQUREX1JFQ0VJVkVEX0NIQU5ORUxfTUVTU0FHRSIsIkFERF9SRVRSSUVWRURfQ0hBTk5FTF9NRVNTQUdFUyIsIklOQ1JFTUVOVF9DSEFOTkVMX1JFVFJJRVZFX01FU1NBR0VTX09GRlNFVCIsIlJFVFJJRVZFX0NIQU5ORUxfTUVTU0FHRVMiLCJDTEVBUl9DSEFOTkVMU19EQVRBIiwiYWRkQ2hhbm5lbHMiLCJjaGFubmVsTmFtZXMiLCJjaGFubmVscyIsImZvckVhY2giLCJwdXNoIiwibWVzc2FnZXMiLCJyZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0IiwiaGFzTW9yZU1lc3NhZ2VzIiwiZmV0Y2hpbmdOZXdNZXNzYWdlcyIsImluY3JlbWVudENoYW5uZWxSZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0IiwiY2hhbm5lbCIsImluY3JlbWVudCIsInNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzIiwiaXNGZXRjaGluZyIsImNoYW5uZWxOYW1lIiwic2V0Q2hhbm5lbEhhc01vcmVNZXNzYWdlcyIsImhhc01vcmUiLCJhZGRSZWNlaXZlZENoYW5uZWxNZXNzYWdlIiwibWVzc2FnZSIsImFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcyIsImNsZWFyQ2hhbm5lbHNEYXRhIiwiZmV0Y2hDaGFubmVscyIsImRpc3BhdGNoIiwidGhlbiIsInJlcyIsIm1hcCIsImVyciIsInJldHJpZXZlQ2hhbm5lbE1lc3NhZ2VzIiwiZ2V0U3RhdGUiLCJfX2F3YWl0ZXIiLCJmaW5kIiwibGVuZ3RoIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZWxldGVDaGFubmVsIiwicmVzcG9uc2UiLCJhZGRDaGFubmVsIiwicG9zdCIsImNoYW5uZWxzQWN0aW9uc18xIiwiU0VUX0FVVEhPUklaRUQiLCJTRVRfVVNFUiIsIkxPR09VVF9VU0VSIiwiU0VUX0pXVCIsInNldEF1dGhvcml6ZWQiLCJhdXRob3JpemVkIiwic2V0VXNlciIsInVzZXIiLCJsb2dvdXRVc2VyIiwic2V0Snd0IiwidG9rZW4iLCJsb2dvdXQiLCJ1cGRhdGVOYW1lIiwib25TdWNjZXNzIiwiY29uc29sZSIsImxvZyIsInVwZGF0ZUVtYWlsIiwidXBkYXRlUGFzc3dvcmQiLCJvbGRQYXNzIiwibmV3UGFzcyIsImlvIiwiSU5JVF9XRUJTT0NLRVQiLCJTRVRfU09DS0VUX0NPTk5FQ1RFRCIsIlNFVF9TT0NLRVRfQ09OTkVDVEVEX1VTRVJTIiwiaW5pdFdlYnNvY2tldCIsInNldFNvY2tldENvbm5lY3RlZCIsImNvbm5lY3RlZCIsInNldFNvY2tldENvbm5lY3RlZFVzZXJzIiwidXNlckVtYWlscyIsImluaXQiLCJzb2NrZXQiLCJvbiIsImVtaXQiLCJpZCIsIm1zZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJvZmYiLCJFcnJvciIsIlVQREFURV9DSEFUX1VTRVJTIiwiQUREX0NIQVRfVVNFUiIsIlJFTU9WRV9DSEFUX1VTRVIiLCJ1cGRhdGVVc2VycyIsInVzZXJzIiwiYWRkVXNlciIsInJlbW92ZVVzZXIiLCJmZXRjaEFsbFVzZXJzIiwidSIsImNyZWF0ZU5ld1VzZXIiLCJlZGl0VXNlciIsImRlbGV0ZVVzZXIiLCJzZXJ2ZXJfMSIsImFwcCIsIlVzZXJfMSIsImRyb3BBbGxDb2xsZWN0aW9ucyIsInJlamVjdCIsImRlbGV0ZU1hbnkiLCJOb3RJbXBsZW1lbnRlZEVycm9yIiwiYmVmb3JlIiwiZG9uZSIsInZlcnNpb24iLCJjb25uIiwiYmVmb3JlRWFjaCIsImFmdGVyIiwiY2xvc2UiLCJtZXNzYWdlU2NoZW1hIiwidGV4dCIsInVzZXJFbWFpbCIsIk1lc3NhZ2UiLCJUT0dHTEVfU0lERUJBUl9PUEVOIiwidG9nZ2xlU2lkZWJhck9wZW4iLCJodHRwIiwiZXhwcmVzcyIsInBhdGgiLCJtb25nb29zZSIsImNzcmYiLCJjb29raWVQYXJzZXIiLCJzZXNzaW9uIiwiYm9keVBhcnNlciIsImJjcnlwdCIsImhlbG1ldCIsImNvbXByZXNzaW9uIiwianNvbndlYnRva2VuXzEiLCJtdXN0YWNoZUV4cHJlc3MiLCJNb25nb1N0b3JlIiwicm91dGVzXzEiLCJpbmRleF8xIiwic2VydmVyIiwic29ja2V0U2VydmVyIiwiZW5naW5lIiwic2V0IiwidXNlIiwic2Vzc2lvbk1pZGRsZXdhcmUiLCJjb29raWUiLCJtYXhBZ2UiLCJzYW1lU2l0ZSIsInNlY3VyZSIsImh0dHBPbmx5Iiwic2F2ZVVuaW5pdGlhbGl6ZWQiLCJyZXNhdmUiLCJzdG9yZSIsIm1vbmdvb3NlQ29ubmVjdGlvbiIsImNvbm5lY3Rpb24iLCJjc3JmTWlkZGxld2FyZSIsImNvbm5lY3QiLCJ1c2VOZXdVcmxQYXJzZXIiLCJleGl0IiwicmVxIiwibmV4dCIsImNzcmZUb2tlbiIsImRiIiwianNvbiIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsInN0YXRpYyIsIl9fZGlybmFtZSIsImF1dGhlbnRpY2F0ZSIsImNvbXBhcmVTeW5jIiwidXNlckRldGFpbHMiLCJpc3N1ZU5ld1Rva2VuIiwic2lnbiIsImV4cGlyZXNJbiIsInNldEhlYWRlciIsImNyZWF0ZVNlcnZlciIsImxpc3RlbiIsImF1dGhvcml6ZWRfMSIsImF1dGhDb250cm9sbGVyXzEiLCJ1c2VyQ29udHJvbGxlcl8xIiwibWVzc2FnZUNvbnRyb2xsZXJfMSIsImNoYW5uZWxDb250cm9sbGVyXzEiLCJyZW5kZXIiLCJsb2dpbiIsInJlZ2lzdGVyIiwidmVyaWZ5RW1haWwiLCJ1c2VyQnlFbWFpbCIsInJlc2V0UGFzc3dvcmQiLCJoZWFkZXJzIiwic3RhdHVzIiwidmVyaWZ5IiwiZGVjb2RlZCIsInNlbmQiLCJ2YWxpZGF0b3JfMSIsImJjcnlwdGpzXzEiLCJpc0VtcHR5IiwiYm9keSIsImVuZCIsImlzRW1haWwiLCJzdWNjZXNzIiwiY291bnREb2N1bWVudHMiLCJleGVjIiwiY291bnQiLCJwYXNzd29yZEhhc2giLCJoYXNoU3luYyIsImVtYWlsVmVyaWZpZWQiLCJzYXZlIiwicGFyYW1zIiwiX2lkIiwiYXNzaWduIiwiTWVzc2FnZV8xIiwic2tpcCIsInBhcnNlSW50Iiwib2ZmZXN0Iiwic29ydCIsImxpbWl0IiwiY3JlYXRlZCIsImNyZWF0ZWRBdCIsInJldmVyc2UiLCJDaGFubmVsXzEiLCJkZWxldGUiLCJjaGFubmVsU2NoZW1hIiwiQ2hhbm5lbCIsInNvY2tldGlvIiwic29ja2V0aW9fand0XzEiLCJjb25uZWN0ZWRVc2VyRW1haWxzIiwiYXV0aG9yaXplIiwidGltZW91dCIsImRlY29kZWRQcm9wZXJ0eU5hbWUiLCJqd3QiLCJmaWx0ZXIiLCJpbmRleCIsInNlbGYiLCJpbmRleE9mIiwic3BsaWNlIiwiY2hhaV8xIiwic29ja2V0aW9jbGllbnQiLCJzdG9yZV8xIiwicmVkdXhfMSIsInVzZXJBY3Rpb25zXzEiLCJzaWRlYmFyQWN0aW9uc18xIiwic29ja2V0QWN0aW9uc18xIiwiY2hhdFVzZXJzQWN0aW9uc18xIiwiZ2V0U3RvcmUiLCJjcmVhdGVTdG9yZSIsInJvb3RSZWR1Y2VyIiwibWlkZGxld2FyZSIsImRlc2NyaWJlIiwiaXQiLCJhc3NlcnQiLCJpc0ZhbHNlIiwiaXNUcnVlIiwic3RyaWN0RXF1YWwiLCJjMCIsImMxIiwiYzIiLCJkZWVwU3RyaWN0RXF1YWwiLCJlIiwiRGF0ZSIsIm5vdyIsInRvU3RyaW5nIiwiZ2VuZXJhbE1lc3NhZ2VzIiwicmFuZG9tTWVzc2FnZXMiLCJvdGhlck1lc3NhZ2VzIiwiY2hhbm5lbFN0YXRlIiwiY29uY2F0Iiwibm90aWZpY2F0aW9ucyIsImVycm9ycyIsImluZm9zIiwic2lkZWJhciIsIm9wZW4iLCJlbWFpbHMiLCJjaGF0VXNlcnMiLCJ0ZXN0QHRlc3QuY29tIiwidGVzdDJAdGVzdC5jb20iLCJ0ZXN0M0B0ZXN0LmNvbSIsInJlZHV4X3RodW5rXzEiLCJyZWR1eF9sb2dnZXJfMSIsInVzZXJfMSIsImNoYW5uZWxzXzEiLCJub3RpZmljYXRpb25zXzEiLCJzaWRlYmFyXzEiLCJzb2NrZXRfMSIsImNoYXRVc2Vyc18xIiwiY29tYmluZVJlZHVjZXJzIiwiYXBwbHlNaWRkbGV3YXJlIiwiY3JlYXRlTG9nZ2VyIiwiaW5pdGlhbFN0YXRlIiwic3RhdGUiLCJhY3Rpb24iLCJjaGFubmVsRXhpc3RzIiwiY2hhbm5lbF8xIiwiaW5jcmVtZW50XzEiLCJjaGFubmVsXzIiLCJoYXNNb3JlXzEiLCJyZXRyaWV2ZWRNZXNzYWdlc18xIiwiY2hhbm5lbE5hbWVfMSIsInJlY2VpdmVkTWVzc2FnZV8xIiwiY2hhbm5lbE5hbWVfMiIsIm5ld0Vycm9yc0FycmF5Iiwic2xpY2UiLCJuZXdJbmZvc0FycmF5IiwiX2EiLCJheGlvc19tb2NrX2FkYXB0ZXJfMSIsInJlZHV4X21vY2tfc3RvcmVfMSIsIm1vY2tTdG9yZUNyZWF0b3IiLCJtb2NrU3RvcmUiLCJtb2NrQXhpb3MiLCJyZXN0b3JlIiwicmVzZXQiLCJvbkFueSIsInJlcGx5IiwiYWN0aW9ucyIsImdldEFjdGlvbnMiLCJvblBvc3QiLCJ1cGRhdGVkIiwib25HZXQiLCJhZGRDaGFubmVsc0FjdGlvbiIsImVycm9yQWN0aW9uIiwic2V0RmV0Y2hpbmdUcnVlQWN0aW9uIiwic2V0RmV0Y2hpbmdGYWxzZUFjdGlvbiIsInNldEhhc01vcmVBY3Rpb24iLCJpbmNyZW1lbnRPZmZzZXRBY3Rpb24iLCJhZGRNZXNzYWdlc0FjdGlvbiIsImFkZEluZm9BY3Rpb24iLCJhZGRFcnJvckFjdGlvbiIsInVzZXJzUmVzcG9uc2UiLCJ1cGRhdGVVc2Vyc0FjdGlvbiIsInJlcXVlc3QiLCJfXzEiLCJleHBlY3QiLCJwYXJzZSIsImZhaWwiLCJ0ZXN0U2Vzc2lvbiJdLCJtYXBwaW5ncyI6ImFBQ0EsSUFBQUEsRUFBQSxHQUdBLFNBQUFDLEVBQUFDLEdBR0EsR0FBQUYsRUFBQUUsR0FDQSxPQUFBRixFQUFBRSxHQUFBQyxRQUdBLElBQUFDLEVBQUFKLEVBQUFFLEdBQUEsQ0FDQUcsRUFBQUgsRUFDQUksR0FBQSxFQUNBSCxRQUFBLElBVUEsT0FOQUksRUFBQUwsR0FBQU0sS0FBQUosRUFBQUQsUUFBQUMsSUFBQUQsUUFBQUYsR0FHQUcsRUFBQUUsR0FBQSxFQUdBRixFQUFBRCxRQUtBRixFQUFBUSxFQUFBRixFQUdBTixFQUFBUyxFQUFBVixFQUdBQyxFQUFBVSxFQUFBLFNBQUFSLEVBQUFTLEVBQUFDLEdBQ0FaLEVBQUFhLEVBQUFYLEVBQUFTLElBQ0FHLE9BQUFD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LFNBQUM5SixHQUNwRCxHQUFJQSxFQUFLLE9BQU93RSxFQUFLeEUsR0FDckJzUyxFQUFZeFosSUFBSSxrQkFBa0IyUSxPQUFPMEksT0FBTyxLQUFLckksSUFBSSxTQUFDOUosR0FDdEQsR0FBSUEsRUFBSyxPQUFPd0UsRUFBS3hFLEdBQ3JCc1MsRUFBWXhaLElBQUksZ0JBQWdCMlEsT0FBTzBJLE9BQU8sS0FBS3JJLElBQUl0RixhQU0vRXdJLFNBQVMsZUFBZ0IsV0FDckJySSxXQUFXLFNBQVVILEdBQ2pCME4sRUFBQS9OLHFCQUFxQnRFLEtBQUssV0FBTSxPQUFBMkUsUUFHcEN5SSxHQUFHLDhEQUNIQSxHQUFHLHFGQy9QWGpWLEVBQUFELFFBQUEyRixRQUFBLDRCQ0FBMUYsRUFBQUQsUUFBQTJGLFFBQUEiLCJmaWxlIjoiYWxsLXRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDExKTtcbiIsImV4cG9ydCBjb25zdCBBRERfRVJST1IgPSAnQUREX0VSUk9SJztcbmV4cG9ydCBjb25zdCBSRU1PVkVfRVJST1IgPSAnUkVNT1ZFX0VSUk9SJztcbmV4cG9ydCBjb25zdCBDTEVBUl9FUlJPUlMgPSAnQ0xFQVJfRVJST1JTJztcbmV4cG9ydCBjb25zdCBBRERfSU5GTyA9ICdBRERfSU5GTyc7XG5leHBvcnQgY29uc3QgUkVNT1ZFX0lORk8gPSAnUkVNT1ZFX0lORk8nO1xuZXhwb3J0IGNvbnN0IENMRUFSX0lORk9TID0gJ0NMRUFSX0lORk9TJztcblxuZXhwb3J0IGNvbnN0IGFkZEVycm9yID0gKGVycm9yOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBBRERfRVJST1IsXG4gICAgICAgIGRhdGE6IGVycm9yXG4gICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IHJlbW92ZUVycm9yID0gKGk6IG51bWJlcikgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFJFTU9WRV9FUlJPUixcbiAgICAgICAgZGF0YTogaVxuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCBjbGVhckVycm9ycyA9ICgpID0+IHtcbiAgICByZXR1cm4geyB0eXBlOiBDTEVBUl9FUlJPUlMgfTtcbn1cblxuZXhwb3J0IGNvbnN0IGFkZEluZm8gPSAoaW5mbzogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogQUREX0lORk8sXG4gICAgICAgIGRhdGE6IGluZm9cbiAgICB9O1xufVxuXG5leHBvcnQgY29uc3QgcmVtb3ZlSW5mbyA9IChpOiBudW1iZXIpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBSRU1PVkVfSU5GTyxcbiAgICAgICAgZGF0YTogaVxuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCBjbGVhckluZm9zID0gKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IENMRUFSX0lORk9TXG4gICAgfTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIC8vIGh0dHBzOi8vZG9jcy5tb25nb2RiLmNvbS9tYW51YWwvcmVmZXJlbmNlL2Nvbm5lY3Rpb24tc3RyaW5nL1xuICAgIG1vbmdvZGJDb25uZWN0aW9uVXJpOiBwcm9jZXNzLmVudi5NT05HT0RCX1VSSSxcbiAgICBtb25nb2RiVGVzdENvbm5lY3Rpb25Vcmk6ICdtb25nb2RiOi8vbG9jYWxob3N0OjI3MDE3L29wZW5DaGF0VGVzdCcsXG4gICAgcG9ydDogcHJvY2Vzcy5lbnYuUE9SVCB8fCA1MDAwLFxuICAgIHByb2R1Y3Rpb246IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicgfHwgZmFsc2UsXG4gICAgdXNlVGVzdERiOiBwcm9jZXNzLmVudi5VU0VfVEVTVF9EQiB8fCBmYWxzZSxcbiAgICBzZWNyZXQ6IHByb2Nlc3MuZW52LlNFQ1JFVCB8fCAnc2VjcmV0JyxcbiAgICBkaXNhYmxlQ3NyZjogcHJvY2Vzcy5lbnYuRElTQUJMRV9DU1JGIHx8IGZhbHNlLFxuICAgIGRpc2FibGVSZWR1eExvZ2dpbmc6IHByb2Nlc3MuZW52LkRJU0FCTEVfUkVEVVhfTE9HR0lORyB8fCBmYWxzZSxcbiAgICBkaXNhYmxlQXV0b1N0YXJ0OiBwcm9jZXNzLmVudi5ESVNBQkxFX0FVVE9fU1RBUlQgfHwgZmFsc2UsXG4gICAgbWFpbGd1bkFwaUtleTogcHJvY2Vzcy5lbnYuTUFJTEdVTl9BUElfS0VZLFxuICAgIG1haWxndW5Eb21haW46IHByb2Nlc3MuZW52Lk1BSUxHVU5fRE9NQUlOLFxuICAgIGJhc2VVcmw6IHByb2Nlc3MuZW52LkJBU0VfVVJMID8gcHJvY2Vzcy5lbnYuQkFTRV9VUkwgOiAnaHR0cDovL2xvY2FsaG9zdDo1MDAwJ1xufVxuIiwiaW1wb3J0IHtTY2hlbWEsIERvY3VtZW50LCBtb2RlbCwgTW9kZWwsIEVycm9yLCBEb2N1bWVudFF1ZXJ5fSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQge3RvTG93ZXJ9IGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVVzZXIgZXh0ZW5kcyBEb2N1bWVudCB7XG4gICAgbmFtZT86IHN0cmluZyxcbiAgICBlbWFpbDogc3RyaW5nLFxuICAgIGNyZWF0ZWRBdDogRGF0ZSxcbiAgICB1cGRhdGVkQXQ6IERhdGUsXG4gICAgcGFzc3dvcmQ6IHN0cmluZyxcbiAgICByb2xlOiAnYWRtaW4nIHwgJ3VzZXInLFxuXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElVc2VyTW9kZWwgZXh0ZW5kcyBNb2RlbDxJVXNlcj4ge1xuICAgIGZpbmRCeUVtYWlsOiAoZW1haWw6IHN0cmluZykgPT4gRG9jdW1lbnRRdWVyeTxJVXNlciwgSVVzZXI+XG59XG5cbmNvbnN0IHVzZXJTY2hlbWE6IFNjaGVtYSA9IG5ldyBTY2hlbWEoe1xuICAgIG5hbWU6IFN0cmluZyxcbiAgICBlbWFpbDoge1xuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICBsb3dlcmNhc2U6IHRydWVcbiAgICB9LFxuICAgIHBhc3N3b3JkOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIHJvbGU6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgbG93ZXJjYXNlOiB0cnVlLFxuICAgICAgICBlbnVtOiBbJ2FkbWluJywgJ3VzZXInXVxuICAgIH0sXG59LCB7XG4gICAgdGltZXN0YW1wczogdHJ1ZVxufSk7XG5cbnVzZXJTY2hlbWEuc3RhdGljcy5maW5kQnlFbWFpbCA9IGZ1bmN0aW9uIChlbWFpbDogc3RyaW5nKTogRG9jdW1lbnRRdWVyeTxJVXNlciwgSVVzZXI+IHtcbiAgICByZXR1cm4gdGhpcy5maW5kT25lKHtlbWFpbDogZW1haWx9KTtcbn1cblxuY29uc3QgVXNlcjogSVVzZXJNb2RlbCA9IG1vZGVsPElVc2VyLCBJVXNlck1vZGVsPignVXNlcicsIHVzZXJTY2hlbWEpO1xuZXhwb3J0IGRlZmF1bHQgVXNlcjsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiY3J5cHRqc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiLCJpbXBvcnQge1N0YXRlLCBDaGFubmVsLCBNZXNzYWdlfSBmcm9tICcuLi9yZWR1Y2Vycy9jaGFubmVscyc7XG5pbXBvcnQgYXhpb3MsIHsgQXhpb3NSZXNwb25zZSwgQXhpb3NFcnJvciB9IGZyb20gJ2F4aW9zJztcblxuaW1wb3J0IHthZGRFcnJvciwgYWRkSW5mb30gZnJvbSAnLi9ub3RpZmljYXRpb25zQWN0aW9ucyc7XG5cbmV4cG9ydCBjb25zdCBBRERfQ0hBTk5FTFMgPSAnQUREX0NIQU5ORUxTJztcbmV4cG9ydCBjb25zdCBTRVRfQ0hBTk5FTF9GRVRDSElOR19ORVdfTUVTU0FHRVMgPSAnU0VUX0NIQU5ORUxfRkVUQ0hJTkdfTkVXX01FU1NBR0VTJztcbmV4cG9ydCBjb25zdCBTRVRfQ0hBTk5FTF9IQVNfTU9SRV9NRVNTQUdFUyA9ICdTRVRfQ0hBTk5FTF9IQVNfTU9SRV9NRVNTQUdFJztcbmV4cG9ydCBjb25zdCBBRERfUkVDRUlWRURfQ0hBTk5FTF9NRVNTQUdFID0gJ0FERF9SRUNFSVZFRF9DSEFOTkVMX01FU1NBR0UnO1xuZXhwb3J0IGNvbnN0IEFERF9SRVRSSUVWRURfQ0hBTk5FTF9NRVNTQUdFUyA9ICdBRERfUkVUUklFVkVEX0NIQU5ORUxfTUVTU0FHRVMnO1xuZXhwb3J0IGNvbnN0IElOQ1JFTUVOVF9DSEFOTkVMX1JFVFJJRVZFX01FU1NBR0VTX09GRlNFVCA9ICdJTkNSRU1FTlRfQ0hBTk5FTF9SRVRSSUVWRV9NRVNTQUdFU19PRkZTRVQnO1xuZXhwb3J0IGNvbnN0IFJFVFJJRVZFX0NIQU5ORUxfTUVTU0FHRVMgPSAnUkVUUklFVkVfQ0hBTk5FTF9NRVNTQUdFUyc7XG5leHBvcnQgY29uc3QgQ0xFQVJfQ0hBTk5FTFNfREFUQSA9ICdDTEVBUl9DSEFOTkVMU19EQVRBJztcblxuZXhwb3J0IGNvbnN0IGFkZENoYW5uZWxzID0gKGNoYW5uZWxOYW1lczogc3RyaW5nW10pID0+IHtcbiAgICBsZXQgY2hhbm5lbHM6IFN0YXRlID0gW107XG4gICAgY2hhbm5lbE5hbWVzLmZvckVhY2goKG5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICBjaGFubmVscy5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICBtZXNzYWdlczogW10sXG4gICAgICAgICAgICByZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0OiAwLFxuICAgICAgICAgICAgaGFzTW9yZU1lc3NhZ2VzOiB0cnVlLFxuICAgICAgICAgICAgZmV0Y2hpbmdOZXdNZXNzYWdlczogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogQUREX0NIQU5ORUxTLFxuICAgICAgICBkYXRhOiB7IGNoYW5uZWxzOiBjaGFubmVscyB9XG4gICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IGluY3JlbWVudENoYW5uZWxSZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0ID0gKGNoYW5uZWw6IHN0cmluZywgbjogbnVtYmVyKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogSU5DUkVNRU5UX0NIQU5ORUxfUkVUUklFVkVfTUVTU0FHRVNfT0ZGU0VULFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBjaGFubmVsOiBjaGFubmVsLFxuICAgICAgICAgICAgaW5jcmVtZW50OiBuXG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5leHBvcnQgY29uc3Qgc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMgPSAoY2hhbm5lbDogc3RyaW5nLCBpc0ZldGNoaW5nOiBib29sZWFuKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogU0VUX0NIQU5ORUxfRkVUQ0hJTkdfTkVXX01FU1NBR0VTLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBjaGFubmVsTmFtZTogY2hhbm5lbCxcbiAgICAgICAgICAgIGlzRmV0Y2hpbmc6IGlzRmV0Y2hpbmdcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCBzZXRDaGFubmVsSGFzTW9yZU1lc3NhZ2VzID0gKGNoYW5uZWxOYW1lOiBzdHJpbmcsIGhhc01vcmU6IGJvb2xlYW4pID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBTRVRfQ0hBTk5FTF9IQVNfTU9SRV9NRVNTQUdFUyxcbiAgICAgICAgZGF0YTogeyBjaGFubmVsTmFtZTogY2hhbm5lbE5hbWUsIGhhc01vcmU6IGhhc01vcmUgfVxuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCBhZGRSZWNlaXZlZENoYW5uZWxNZXNzYWdlID0gKGNoYW5uZWxOYW1lOiBzdHJpbmcsIG1lc3NhZ2U6IE1lc3NhZ2UpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBBRERfUkVDRUlWRURfQ0hBTk5FTF9NRVNTQUdFLFxuICAgICAgICBkYXRhOiB7IG1lc3NhZ2U6IG1lc3NhZ2UsIGNoYW5uZWxOYW1lOiBjaGFubmVsTmFtZSB9XG4gICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IGFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcyA9IChjaGFubmVsTmFtZTogc3RyaW5nLCBtZXNzYWdlczogTWVzc2FnZVtdKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogQUREX1JFVFJJRVZFRF9DSEFOTkVMX01FU1NBR0VTLFxuICAgICAgICBkYXRhOiB7Y2hhbm5lbE5hbWU6IGNoYW5uZWxOYW1lLCBtZXNzYWdlczogbWVzc2FnZXN9XG4gICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IGNsZWFyQ2hhbm5lbHNEYXRhID0gKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IENMRUFSX0NIQU5ORUxTX0RBVEFcbiAgICB9XG59XG5cbi8qIEFzeW5jIEFjdGlvbnMgKi9cblxuZXhwb3J0IGNvbnN0IGZldGNoQ2hhbm5lbHMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIChkaXNwYXRjaDogYW55KSAgPT4ge1xuICAgICAgICByZXR1cm4gYXhpb3MuZ2V0KCcvYXBpL3YxL2NoYW5uZWxzJykudGhlbigocmVzOiBBeGlvc1Jlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBsZXQgY2hhbm5lbHMgPSByZXMuZGF0YS5jaGFubmVscy5tYXAoIChjOiB7bmFtZTogc3RyaW5nLCBfaWQ6IHN0cmluZ30pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYy5uYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2goYWRkQ2hhbm5lbHMoY2hhbm5lbHMpKTtcbiAgICAgICAgfSkuY2F0Y2goKGVycjogQXhpb3NFcnJvcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGRpc3BhdGNoKGFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gZmV0Y2ggdGhlIGNoYW5uZWxzJykpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCByZXRyaWV2ZUNoYW5uZWxNZXNzYWdlcyA9IChjaGFubmVsTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIGFzeW5jIChkaXNwYXRjaDogYW55LCBnZXRTdGF0ZTogYW55KSA9PiB7XG4gICAgICAgIGxldCBjaGFubmVsOiBDaGFubmVsID0gZ2V0U3RhdGUoKS5jaGFubmVscy5maW5kKCAoYzogQ2hhbm5lbCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGMubmFtZSA9PT0gY2hhbm5lbE5hbWU7XG4gICAgICAgIH0pXG4gICAgICAgIGlmICghY2hhbm5lbCB8fCBjaGFubmVsLmZldGNoaW5nTmV3TWVzc2FnZXMgfHwgIWNoYW5uZWwuaGFzTW9yZU1lc3NhZ2VzKSB7XG4gICAgICAgICAgICBkaXNwYXRjaChhZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIGZldGNoIG1lc3NhZ2VzJykpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgnUmV0cmlldmUgQ2hhbm5lbCBNZXNzYWdlcyBkaXNwYXRjaGVkIHdpdGggaW5jb3JyZWN0IGNoYW5uZWwgbmFtZSBvciB3aGlsZSBhbHJlYWR5IGZldGNoaW5nIG1lc3NhZ2VzJyk7XG4gICAgICAgIH1cbiAgICAgICAgZGlzcGF0Y2goc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMoY2hhbm5lbC5uYW1lLCB0cnVlKSk7XG4gICAgICAgIHJldHVybiBheGlvcy5nZXQoJy9hcGkvdjEvbWVzc2FnZXMvJyArIGNoYW5uZWwubmFtZSArICcvJyArIGNoYW5uZWwucmV0cmlldmVNZXNzYWdlc09mZnNldCkudGhlbigocmVzOiBBeGlvc1Jlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLmRhdGEubWVzc2FnZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZGlzcGF0Y2goc2V0Q2hhbm5lbEhhc01vcmVNZXNzYWdlcyhjaGFubmVsLm5hbWUsIGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRpc3BhdGNoKGluY3JlbWVudENoYW5uZWxSZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0KGNoYW5uZWxOYW1lLCByZXMuZGF0YS5tZXNzYWdlcy5sZW5ndGgpKTtcbiAgICAgICAgICAgIGRpc3BhdGNoKGFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcyhjaGFubmVsLm5hbWUsIHJlcy5kYXRhLm1lc3NhZ2VzKSlcbiAgICAgICAgfSkuY2F0Y2goKGVycjogQXhpb3NFcnJvcikgPT4ge1xuICAgICAgICAgICAgZGlzcGF0Y2goYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBmZXRjaCBtZXNzYWdlcycpKTtcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2goc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMoY2hhbm5lbC5uYW1lLCBmYWxzZSkpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBkZWxldGVDaGFubmVsID0gKGNoYW5uZWxOYW1lOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gKGRpc3BhdGNoOiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIGF4aW9zLmdldCgnL2FwaS92MS9jaGFubmVsL2RlbGV0ZS8nICsgY2hhbm5lbE5hbWUpLlxuICAgICAgICAgICAgdGhlbigocmVzOiBBeGlvc1Jlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgZGlzcGF0Y2goYWRkSW5mbygnQ2hhbm5lbCBkZWxldGVkJykpO1xuICAgICAgICAgICAgICAgIHJldHVybiBkaXNwYXRjaChmZXRjaENoYW5uZWxzKCkpO1xuICAgICAgICAgICAgfSkuY2F0Y2goKGVycjogQXhpb3NFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkaXNwYXRjaChhZGRFcnJvcihlcnIucmVzcG9uc2UuZGF0YS5lcnJvcikpO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IGFkZENoYW5uZWwgPSAoY2hhbm5lbE5hbWU6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiAoZGlzcGF0Y2g6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gYXhpb3MucG9zdCgnL2FwaS92MS9jaGFubmVsL2NyZWF0ZScsIHtcbiAgICAgICAgICAgIGNoYW5uZWxOYW1lOiBjaGFubmVsTmFtZVxuICAgICAgICB9KS50aGVuKChyZXM6IEF4aW9zUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGRpc3BhdGNoKGFkZEluZm8oJ0NoYW5uZWwgY3JlYXRlZCcpKTtcbiAgICAgICAgICAgIHJldHVybiBkaXNwYXRjaChmZXRjaENoYW5uZWxzKCkpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyOiBBeGlvc0Vycm9yKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2goYWRkRXJyb3IoZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpKTtcbiAgICAgICAgfSlcbiAgICB9O1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hhaVwiKTsiLCJpbXBvcnQgYXhpb3MsIHsgQXhpb3NSZXNwb25zZSwgQXhpb3NFcnJvciB9IGZyb20gJ2F4aW9zJztcbmltcG9ydCB7U3RhdGUgYXMgVXNlclN0YXRlfSBmcm9tICcuLi9yZWR1Y2Vycy91c2VyJztcbmltcG9ydCB7Y2xlYXJDaGFubmVsc0RhdGF9IGZyb20gJy4vY2hhbm5lbHNBY3Rpb25zJztcbmltcG9ydCB7YWRkRXJyb3IsIGFkZEluZm99IGZyb20gJy4vbm90aWZpY2F0aW9uc0FjdGlvbnMnO1xuXG5leHBvcnQgY29uc3QgU0VUX0FVVEhPUklaRUQgPSAnU0VUX0FVVEhPUklaRUQnO1xuZXhwb3J0IGNvbnN0IFNFVF9VU0VSID0gJ1NFVF9VU0VSJztcbmV4cG9ydCBjb25zdCBMT0dPVVRfVVNFUiA9ICdMT0dPVVRfVVNFUic7XG5leHBvcnQgY29uc3QgU0VUX0pXVCA9ICdTRVRfSldUJztcblxuZXhwb3J0IGNvbnN0IHNldEF1dGhvcml6ZWQgPSAoYXV0aG9yaXplZDogYm9vbGVhbikgPT4ge1xuICAgIHJldHVybiAge1xuICAgICAgICB0eXBlOiBTRVRfQVVUSE9SSVpFRCxcbiAgICAgICAgZGF0YTogYXV0aG9yaXplZFxuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCBzZXRVc2VyID0gKHVzZXI6IFVzZXJTdGF0ZSkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFNFVF9VU0VSLFxuICAgICAgICBkYXRhOiB1c2VyXG4gICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IGxvZ291dFVzZXIgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogTE9HT1VUX1VTRVJcbiAgICB9O1xufVxuXG5leHBvcnQgY29uc3Qgc2V0Snd0ID0gKHRva2VuOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBTRVRfSldULFxuICAgICAgICBkYXRhOiB0b2tlblxuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCBsb2dvdXQgPSAoKSA9PiB7XG4gICAgcmV0dXJuIChkaXNwYXRjaDogYW55KSA9PiB7XG4gICAgICAgIGRpc3BhdGNoKGxvZ291dFVzZXIoKSk7XG4gICAgICAgIHJldHVybiBkaXNwYXRjaChjbGVhckNoYW5uZWxzRGF0YSgpKTtcbiAgICB9XG4gICAgXG59XG5cbi8qIEFzeW5jIEFjdGlvbnMgKi9cbmV4cG9ydCBjb25zdCB1cGRhdGVOYW1lID0gKG5hbWU6IHN0cmluZywgb25TdWNjZXNzPzogRnVuY3Rpb24pID0+IHtcbiAgICByZXR1cm4gKGRpc3BhdGNoOiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIGF4aW9zLnBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvbmFtZScsIHtcbiAgICAgICAgICAgIG5hbWU6IG5hbWVcbiAgICAgICAgfSkudGhlbigocmVzOiBBeGlvc1Jlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBkaXNwYXRjaChhZGRJbmZvKCdOYW1lIHVwZGF0ZWQnKSk7XG4gICAgICAgICAgICBpZiAob25TdWNjZXNzKSBvblN1Y2Nlc3MoKTtcbiAgICAgICAgfSkuY2F0Y2goKGVycjogQXhpb3NFcnJvcikgPT4ge1xuICAgICAgICAgICAgaWYgKGVyci5yZXNwb25zZSAmJiBlcnIucmVzcG9uc2UuZGF0YS5lcnJvcilcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2goYWRkRXJyb3IoZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTb21ldGhpbmcgd2VudCB3cm9uZyB1cGRhdGluZyB1c2VyIG5hbWUnLCBlcnIpO1xuICAgICAgICAgICAgZGlzcGF0Y2goYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byB1cGRhdGUgeW91ciBuYW1lLicpKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUVtYWlsID0gKGVtYWlsOiBzdHJpbmcsIG9uU3VjY2Vzcz86IEZ1bmN0aW9uKSA9PiB7XG4gICAgcmV0dXJuIChkaXNwYXRjaDogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiBheGlvcy5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL2VtYWlsJywge1xuICAgICAgICAgICAgZW1haWw6IGVtYWlsXG4gICAgICAgIH0pLnRoZW4oKHJlczogQXhpb3NSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgZGlzcGF0Y2goYWRkSW5mbygnRW1haWwgdXBkYXRlZCcpKTtcbiAgICAgICAgICAgIGlmIChvblN1Y2Nlc3MpIG9uU3VjY2VzcygpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyOiBBeGlvc0Vycm9yKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyLnJlc3BvbnNlICYmIGVyci5yZXNwb25zZS5kYXRhLmVycm9yKVxuICAgICAgICAgICAgICAgIHJldHVybiBkaXNwYXRjaChhZGRFcnJvcihlcnIucmVzcG9uc2UuZGF0YS5lcnJvcikpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1NvbWV0aGluZyB3ZW50IHdyb25nIHVwZGF0aW5nIHVzZXIgZW1haWwnLCBlcnIpO1xuICAgICAgICAgICAgZGlzcGF0Y2goYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byB1cGRhdGUgeW91ciBlbWFpbC4nKSk7XG4gICAgICAgIH0pO1xuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVQYXNzd29yZCA9IChvbGRQYXNzOiBzdHJpbmcsIG5ld1Bhc3M6IHN0cmluZywgb25TdWNjZXNzPzogRnVuY3Rpb24pID0+IHtcbiAgICByZXR1cm4gKGRpc3BhdGNoOiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIGF4aW9zLnBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvcGFzc3dvcmQnLCB7XG4gICAgICAgICAgICBvbGRQYXNzOiBvbGRQYXNzLFxuICAgICAgICAgICAgbmV3UGFzczogbmV3UGFzc1xuICAgICAgICB9KS50aGVuKChyZXM6IEF4aW9zUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGRpc3BhdGNoKGFkZEluZm8oJ1Bhc3N3b3JkIHVwZGF0ZWQnKSk7XG4gICAgICAgICAgICBpZiAob25TdWNjZXNzKSBvblN1Y2Nlc3MoKTtcbiAgICAgICAgfSkuY2F0Y2goKGVycjogQXhpb3NFcnJvcikgPT4ge1xuICAgICAgICAgICAgaWYgKGVyci5yZXNwb25zZSAmJiBlcnIucmVzcG9uc2UuZGF0YS5lcnJvcilcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2goYWRkRXJyb3IoZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTb21ldGhpbmcgd2VudCB3cm9uZyB1cGRhdGluZyB1c2VyIHBhc3N3b3JkJywgZXJyKTtcbiAgICAgICAgICAgIGRpc3BhdGNoKGFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gdXBkYXRlIHlvdXIgcGFzc3dvcmQuJykpO1xuICAgICAgICB9KTtcbiAgICB9O1xufSIsImltcG9ydCAqIGFzIGlvIGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHsgRGlzcGF0Y2ggfSBmcm9tICdyZWR1eCc7XG5cbmltcG9ydCB7U3RhdGV9IGZyb20gJy4uL3N0b3JlJztcblxuZXhwb3J0IGNvbnN0IElOSVRfV0VCU09DS0VUID0gJ0lOSVRfV0VCU09DS0VUJztcbmV4cG9ydCBjb25zdCBTRVRfU09DS0VUX0NPTk5FQ1RFRCA9ICdTRVRfU09DS0VUX0NPTk5FQ1RFRCc7XG5leHBvcnQgY29uc3QgU0VUX1NPQ0tFVF9DT05ORUNURURfVVNFUlMgPSAnU0VUX1NPQ0tFVF9DT05ORUNURURfVVNFUlMnO1xuXG5leHBvcnQgY29uc3QgaW5pdFdlYnNvY2tldCA9IChpbzogU29ja2V0SU9DbGllbnQuU29ja2V0KSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogSU5JVF9XRUJTT0NLRVQsXG4gICAgICAgIGRhdGE6IHsgaW86IGlvIH1cbiAgICB9O1xufVxuXG5leHBvcnQgY29uc3Qgc2V0U29ja2V0Q29ubmVjdGVkID0gKGNvbm5lY3RlZDogYm9vbGVhbikgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFNFVF9TT0NLRVRfQ09OTkVDVEVELFxuICAgICAgICBkYXRhOiB7IGNvbm5lY3RlZDogY29ubmVjdGVkIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBzZXRTb2NrZXRDb25uZWN0ZWRVc2VycyA9ICh1c2VyRW1haWxzOiBzdHJpbmdbXSkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFNFVF9TT0NLRVRfQ09OTkVDVEVEX1VTRVJTLFxuICAgICAgICBkYXRhOiB7IHVzZXJFbWFpbHM6IHVzZXJFbWFpbHMgfVxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgcmV0dXJuIChkaXNwYXRjaDogRGlzcGF0Y2gsIGdldFN0YXRlOiBGdW5jdGlvbikgPT4ge1xuICAgICAgICBsZXQgc29ja2V0OiBTb2NrZXRJT0NsaWVudC5Tb2NrZXQgPSBpbygpO1xuICAgICAgICBzb2NrZXQub24oJ2Nvbm5lY3QnLCAoKSA9PiB7XG4gICAgICAgICAgICBzb2NrZXRcbiAgICAgICAgICAgICAgICAuZW1pdCgnYXV0aGVudGljYXRlJywgeyB0b2tlbjogZ2V0U3RhdGUoKS51c2VyLnRva2VuIH0pIC8vc2VuZCB0aGUgand0XG4gICAgICAgICAgICAgICAgLm9uKCdhdXRoZW50aWNhdGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChzZXRTb2NrZXRDb25uZWN0ZWQodHJ1ZSkpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnYXV0aG9yaXplZCBbJyArIHNvY2tldC5pZCArICddJyk7XG4gICAgICAgICAgICAgICAgICAgIHNvY2tldC5vbignY29ubmVjdGVkIHVzZXJzJywgKHVzZXJFbWFpbHM6IHN0cmluZ1tdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChzZXRTb2NrZXRDb25uZWN0ZWRVc2Vycyh1c2VyRW1haWxzKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uKCd1bmF1dGhvcml6ZWQnLCBmdW5jdGlvbiAobXNnOiBhbnkpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goc2V0U29ja2V0Q29ubmVjdGVkKGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidW5hdXRob3JpemVkOiBcIiArIEpTT04uc3RyaW5naWZ5KG1zZy5kYXRhKSk7XG4gICAgICAgICAgICAgICAgICAgIHNvY2tldC5vZmYoJ2Nvbm5lY3RlZCB1c2VzJyk7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cuZGF0YS50eXBlKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICAgICAgc29ja2V0Lm9uKCdkaXNjb25uZWN0JywgKCkgPT4ge1xuICAgICAgICAgICAgZGlzcGF0Y2goc2V0U29ja2V0Q29ubmVjdGVkKGZhbHNlKSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRGlzY29ubmVjdGVkIGZyb20gd2Vic29ja2V0IHNlcnZlciwgYXR0ZW1wdGluZyByZWNvbm5lY3QnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRpc3BhdGNoKGluaXRXZWJzb2NrZXQoc29ja2V0KSk7XG4gICAgfVxufSIsImltcG9ydCBheGlvcywgeyBBeGlvc0Vycm9yLCBBeGlvc1Jlc3BvbnNlIH0gZnJvbSAnYXhpb3MnO1xuXG5pbXBvcnQge1N0YXRlLCBDaGF0VXNlcn0gZnJvbSAnLi4vcmVkdWNlcnMvY2hhdFVzZXJzJztcbmltcG9ydCB7IERpc3BhdGNoIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgYWRkRXJyb3IgfSBmcm9tICcuL25vdGlmaWNhdGlvbnNBY3Rpb25zJztcblxuZXhwb3J0IGNvbnN0IFVQREFURV9DSEFUX1VTRVJTID0gJ1VQREFURV9DSEFUX1VTRVJTJztcbmV4cG9ydCBjb25zdCBBRERfQ0hBVF9VU0VSID0gJ0FERF9VU0VSJztcbmV4cG9ydCBjb25zdCBSRU1PVkVfQ0hBVF9VU0VSID0gJ1JFTU9WRV9VU0VSJztcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZVVzZXJzID0gZnVuY3Rpb24odXNlcnM6IFN0YXRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogVVBEQVRFX0NIQVRfVVNFUlMsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHVzZXJzOiB1c2Vyc1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgYWRkVXNlciA9IGZ1bmN0aW9uKHVzZXI6IENoYXRVc2VyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogQUREX0NIQVRfVVNFUixcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgdXNlcjogdXNlclxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgcmVtb3ZlVXNlciA9IGZ1bmN0aW9uKGVtYWlsOiBzdHJpbmcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBSRU1PVkVfQ0hBVF9VU0VSLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBlbWFpbDogZW1haWxcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyogQXN5bmMgRnVuY3Rpb25zICovXG5leHBvcnQgY29uc3QgZmV0Y2hBbGxVc2VycyA9ICgpID0+IHtcbiAgICByZXR1cm4gKGRpc3BhdGNoOiBEaXNwYXRjaCkgPT4ge1xuICAgICAgICByZXR1cm4gYXhpb3MuZ2V0KCcvYXBpL3YxL3VzZXJzJykudGhlbigocmVzOiBBeGlvc1Jlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBsZXQgdXNlcnM6IFN0YXRlID0ge307XG4gICAgICAgICAgICByZXMuZGF0YS51c2Vycy5mb3JFYWNoKCh1OiBDaGF0VXNlcikgPT4ge1xuICAgICAgICAgICAgICAgIHVzZXJzW3UuZW1haWxdID0ge1xuICAgICAgICAgICAgICAgICAgICByb2xlOiB1LnJvbGUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHUubmFtZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRpc3BhdGNoKHVwZGF0ZVVzZXJzKHVzZXJzKSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9KS5jYXRjaCgoZXJyOiBBeGlvc0Vycm9yKSA9PiB7XG4gICAgICAgICAgICBkaXNwYXRjaChhZGRFcnJvcignRmV0Y2hpbmcgYWxsIHVzZXJzIGZhaWxlZCcpKTtcbiAgICAgICAgICAgIHJldHVybiBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU5ld1VzZXIgPSAodXNlcjogQ2hhdFVzZXIpID0+IHtcblxufVxuXG5leHBvcnQgY29uc3QgZWRpdFVzZXIgPSAoZW1haWw6IHN0cmluZywgdXNlcjogQ2hhdFVzZXIpID0+IHtcblxufVxuXG5leHBvcnQgY29uc3QgZGVsZXRlVXNlciA9IChlbWFpbDogc3RyaW5nKSA9PiB7XG5cbn0iLCJpbXBvcnQgeyBjb25uLCBhcHAgfSBmcm9tICcuLi9zcmMvc2VydmVyL3NlcnZlcic7XG5pbXBvcnQgVXNlciBmcm9tICcuLi9zcmMvc2VydmVyL21vZGVscy9Vc2VyJztcblxuY29uc3QgZHJvcEFsbENvbGxlY3Rpb25zID0gKCkgPT4ge1xuICAgIGxldCBwID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBVc2VyLmRlbGV0ZU1hbnkoe30sIChlcnI6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgfSlcbiAgICB9KVxuICAgIHJldHVybiBwLnRoZW4oKS5jYXRjaCgoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH0pO1xufVxuXG5jb25zdCBOb3RJbXBsZW1lbnRlZEVycm9yID0gbmV3IEVycm9yKCdUZXN0IG5vdCBpbXBsZW1lbnRlZCcpO1xuXG5iZWZvcmUoJ2FsbCB0ZXN0cycsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAvLyB3YWl0IGZvciBjb25uZWN0aW9uIHRvIGJlZ2luIHRlc3RzXG4gICAgY29uc29sZS5sb2cocHJvY2Vzcy52ZXJzaW9uKTtcbiAgICBjb25uLm9uKCdjb25uZWN0ZWQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzZXJ2ZXIgc3RhcnRlZCcpO1xuICAgICAgICBkb25lKCk7XG4gICAgfSk7XG59KTtcbmJlZm9yZUVhY2goJ3Jlc2V0IERCJywgZnVuY3Rpb24oZG9uZSkge1xuICAgIC8vIHN0YXJ0IHdpdGggYSBmcmVzaCBkYXRhYmFzZVxuICAgIGRyb3BBbGxDb2xsZWN0aW9ucygpLnRoZW4oKCkgPT4gZG9uZSgpKTtcbn0pO1xuYWZ0ZXIoJ2FsbCB0ZXN0cycsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAvLyB0ZWFyZG93biBEQlxuICAgIGRyb3BBbGxDb2xsZWN0aW9ucygpLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2xvc2luZyBjb25uZWN0aW9ucycpO1xuICAgICAgICBjb25uLmNsb3NlKCk7XG4gICAgICAgIGRvbmUoKVxuICAgIH0pO1xufSlcblxuXG5cbi8qIFdlYiAqL1xucmVxdWlyZSgnLi93ZWIvdGVzdFN0b3JlJyk7XG5yZXF1aXJlKCcuL3dlYi90ZXN0QXN5bmNBY3Rpb25zJyk7XG5cbi8qIFNlcnZlciAqL1xucmVxdWlyZSgnLi9zZXJ2ZXIvdGVzdEF1dGhDb250cm9sbGVyJyk7XG5yZXF1aXJlKCcuL3NlcnZlci90ZXN0VXNlckNvbnRyb2xsZXInKTtcbnJlcXVpcmUoJy4vc2VydmVyL3Rlc3RNZXNzYWdlQ29udHJvbGxlcicpO1xucmVxdWlyZSgnLi9zZXJ2ZXIvdGVzdENoYW5uZWxDb250cm9sbGVyJyk7XG5cbmV4cG9ydCB7IGFwcCwgZHJvcEFsbENvbGxlY3Rpb25zLCBOb3RJbXBsZW1lbnRlZEVycm9yIH07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ2YWxpZGF0b3JcIik7IiwiaW1wb3J0IHtTY2hlbWEsIG1vZGVsLCBEb2N1bWVudCwgTW9kZWx9IGZyb20gJ21vbmdvb3NlJztcblxuZXhwb3J0IGludGVyZmFjZSBJTWVzc2FnZSBleHRlbmRzIERvY3VtZW50IHtcbiAgICBjaGFubmVsOiBzdHJpbmcsXG4gICAgdGV4dDogc3RyaW5nLFxuICAgIHVzZXJFbWFpbDogc3RyaW5nLFxuICAgIGNyZWF0ZWRBdDogRGF0ZSxcbiAgICB1cGRhdGVkQXQ6IERhdGUsXG59XG5cbmNvbnN0IG1lc3NhZ2VTY2hlbWE6IFNjaGVtYSA9IG5ldyBTY2hlbWEoe1xuICAgIGNoYW5uZWw6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgLy8gc2hvdWxkIHZhbGlkYXRlIHRvIG1ha2Ugc3VyZSBjaGFubmVsIGFscmVhZHkgZXhpc3RzXG4gICAgfSxcbiAgICB0ZXh0OiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgfSxcbiAgICB1c2VyRW1haWw6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgbG93ZXJjYXNlOiB0cnVlLFxuICAgICAgICAvLyBzaG91bGQgdmFsaWRhdGUgdG8gY29uZmlybSB0aGF0IHVzZXIgZXhpc3RzXG4gICAgfVxufSwge1xuICAgIHRpbWVzdGFtcHM6IHRydWVcbn0pO1xuXG5jb25zdCBNZXNzYWdlOiBNb2RlbDxJTWVzc2FnZT4gPSBtb2RlbCgnTWVzc2FnZScsIG1lc3NhZ2VTY2hlbWEpO1xuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb2NoYVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzb2NrZXQuaW8tY2xpZW50XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LXRodW5rXCIpOyIsImV4cG9ydCBjb25zdCBUT0dHTEVfU0lERUJBUl9PUEVOID0gJ1RPR0dMRV9TSURFQkFSX09QRU4nO1xuXG5leHBvcnQgY29uc3QgdG9nZ2xlU2lkZWJhck9wZW4gPSAoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogVE9HR0xFX1NJREVCQVJfT1BFTlxuICAgIH1cbn0iLCIvL2ltcG9ydCBNb2RlbHMgZnJvbSAnLi9tb2RlbHMvaW5kZXgudHMnO1xuXG5pbXBvcnQgKiBhcyBodHRwIGZyb20gJ2h0dHAnO1xuaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyBzb2NrZXRpbyBmcm9tICdzb2NrZXQuaW8nO1xuaW1wb3J0ICogYXMgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0ICogYXMgY3NyZiBmcm9tICdjc3VyZic7XG5pbXBvcnQgKiBhcyBjb29raWVQYXJzZXIgZnJvbSAnY29va2llLXBhcnNlcic7XG5pbXBvcnQgKiBhcyBzZXNzaW9uIGZyb20gJ2V4cHJlc3Mtc2Vzc2lvbic7XG5pbXBvcnQgKiBhcyBib2R5UGFyc2VyIGZyb20gJ2JvZHktcGFyc2VyJztcbmltcG9ydCAqIGFzIGJjcnlwdCBmcm9tICdiY3J5cHRqcyc7XG5pbXBvcnQgKiBhcyBoZWxtZXQgZnJvbSAnaGVsbWV0JztcbmltcG9ydCAqIGFzIG1vcmdhbiBmcm9tICdtb3JnYW4nO1xuaW1wb3J0ICogYXMgY29tcHJlc3Npb24gZnJvbSAnY29tcHJlc3Npb24nO1xuaW1wb3J0IHsgc2lnbiB9IGZyb20gJ2pzb253ZWJ0b2tlbic7XG5jb25zdCBtdXN0YWNoZUV4cHJlc3MgPSByZXF1aXJlKCdtdXN0YWNoZS1leHByZXNzJyk7XG5jb25zdCBNb25nb1N0b3JlID0gcmVxdWlyZSgnY29ubmVjdC1tb25nbycpKHNlc3Npb24pO1xuXG5pbXBvcnQgUm91dGVzIGZyb20gJy4vcm91dGVzJztcbmltcG9ydCB3ZWJzb2NrZXQgZnJvbSAnLi9zb2NrZXQuaW8vaW5kZXgnO1xuaW1wb3J0IHsgQXBwLCBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJy4uL3R5cGVzL2V4cHJlc3MnO1xuaW1wb3J0IFVzZXIsIHsgSVVzZXIgfSBmcm9tICcuL21vZGVscy9Vc2VyJztcbmNvbnN0IGVudiA9IHJlcXVpcmUoJy4uLy4uL2VudicpO1xuXG5jb25zdCBhcHA6IEFwcCA9IGV4cHJlc3MoKTtcbmNvbnN0IHBvcnQ6IHN0cmluZyB8IG51bWJlciA9IGVudi5wb3J0O1xubGV0IHNlcnZlcjogaHR0cC5TZXJ2ZXI7XG5sZXQgc29ja2V0U2VydmVyOiBzb2NrZXRpby5TZXJ2ZXI7XG5cbmFwcC5lbmdpbmUoJ2h0bWwnLCBtdXN0YWNoZUV4cHJlc3MoKSk7XG5hcHAuc2V0KCd2aWV3IGVuZ2luZScsICdodG1sJyk7XG4vL2FwcC51c2UobW9yZ2FuKCdjb21iaW5lZCcpKTtcbmFwcC51c2UoY29tcHJlc3Npb24oKSk7XG5cbmNvbnN0IHNlc3Npb25NaWRkbGV3YXJlID0gc2Vzc2lvbih7XG4gICAgc2VjcmV0OiBlbnYuc2VjcmV0LFxuICAgIGNvb2tpZToge1xuICAgICAgICBtYXhBZ2U6IDI0ICogNjAgKiA2MCAqIDEwMDAsIC8vIDI0IGhvdXJzXG4gICAgICAgIHNhbWVTaXRlOiB0cnVlLFxuICAgICAgICBzZWN1cmU6IGVudi5wcm9kdWN0aW9uLFxuICAgICAgICBodHRwT25seTogdHJ1ZVxuICAgIH0sXG4gICAgc2F2ZVVuaW5pdGlhbGl6ZWQ6IHRydWUsXG4gICAgcmVzYXZlOiBmYWxzZSxcbiAgICBzdG9yZTogbmV3IE1vbmdvU3RvcmUoe1xuICAgICAgICBtb25nb29zZUNvbm5lY3Rpb246IG1vbmdvb3NlLmNvbm5lY3Rpb25cbiAgICB9KVxufSk7XG5cbmNvbnN0IGNzcmZNaWRkbGV3YXJlID0gY3NyZih7XG4gICAgY29va2llOiB7XG4gICAgICAgIG1heEFnZTogMjQgKiA2MCAqIDYwICogMTAwMCwgLy8gMjQgaG91cnNcbiAgICAgICAgc2FtZVNpdGU6IHRydWUsXG4gICAgICAgIHNlY3VyZTogZW52LnByb2R1Y3Rpb24sXG4gICAgICAgIGh0dHBPbmx5OiB0cnVlLFxuICAgICAgICBrZXk6ICdfY3NyZidcbiAgICB9XG59KVxuXG5tb25nb29zZS5jb25uZWN0KGVudi51c2VUZXN0RGIgPyBlbnYubW9uZ29kYlRlc3RDb25uZWN0aW9uVXJpIDogZW52Lm1vbmdvZGJDb25uZWN0aW9uVXJpLCB7IHVzZU5ld1VybFBhcnNlcjogdHJ1ZSB9KTtcbm1vbmdvb3NlLmNvbm5lY3Rpb24ub24oJ2Vycm9yJywgZnVuY3Rpb24oZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcignTW9uZ29vc2UgY29ubmVjdGlvbiBlcnJvcicsIGVycik7XG59KTtcbnByb2Nlc3Mub24oJ1NJR0lOVCcsIGZ1bmN0aW9uICgpIHtcbiAgICBtb25nb29zZS5jb25uZWN0aW9uLmNsb3NlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ01vbmdvb3NlIGRlZmF1bHQgY29ubmVjdGlvbiBkaXNjb25uZWN0ZWQgdGhyb3VnaCBhcHAgdGVybWluYXRpb24nKTtcbiAgICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgIH0pO1xufSk7IFxuXG5hcHAudXNlKHNlc3Npb25NaWRkbGV3YXJlKTtcbmFwcC51c2UoY29va2llUGFyc2VyKGVudi5zZWNyZXQpKTtcblxuaWYoZW52LmRpc2FibGVDc3JmKSB7XG4gICAgY29uc29sZS5sb2coJ0NTUkYgZGlzYWJsZWQnKTtcbiAgICBhcHAudXNlKChyZXEsIHJlcywgbmV4dCkgPT4geyBcbiAgICAgICAgcmVxLmNzcmZUb2tlbiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcnIH1cbiAgICAgICAgcmV0dXJuIG5leHQoKTtcbiAgICB9KTtcbn0gZWxzZSB7XG4gICAgYXBwLnVzZShjc3JmTWlkZGxld2FyZSk7XG59XG4vLyBhZGQgREIgdG8gZXZlcnkgZXhwcmVzcyByZXF1ZXN0XG5sZXQgZGI6IG1vbmdvb3NlLkNvbm5lY3Rpb24gPSBtb25nb29zZS5jb25uZWN0aW9uO1xuYXBwLnVzZSgocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBGdW5jdGlvbikgPT4ge1xuICAgIHJlcS5kYiA9IGRiO1xuICAgIHJldHVybiBuZXh0KCk7XG59KVxuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7IC8vIHN1cHBvcnQganNvbiBlbmNvZGVkIGJvZGllc1xuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7XG4vL2FwcC51c2UoY29ycygpKTtcblxuXG5hcHAudXNlKGhlbG1ldCgpKTtcbi8qIFNlcnZlIHN0YXRpYyBmaWxlcyBmcm9tIGRpc3QvcHVibGljICovXG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi9kaXN0L3B1YmxpYy8nKSkpO1xuXG5hcHAudXNlKCcvYXBpJywgZnVuY3Rpb24gKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogRnVuY3Rpb24pIHtcbiAgICAvL3Jlcy5zZXRIZWFkZXIoJ25ldy1jc3JmLXRva2VuJywgcmVxLmNzcmZUb2tlbigpKVxuICAgIHJldHVybiBuZXh0KCk7XG59KTtcbmFwcC51c2UoKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogRnVuY3Rpb24pID0+IHtcbiAgICByZXEuYXV0aGVudGljYXRlID0gKGVtYWlsOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZTogKHVzZXI6IGJvb2xlYW4gfCBJVXNlciwgZXJyOiAobnVsbCB8IEVycm9yKSkgPT4gdm9pZCkgPT4ge1xuICAgICAgICBVc2VyLmZpbmRCeUVtYWlsKGVtYWlsKS50aGVuKCh1c2VyOiBJVXNlcikgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIgPT09IG51bGwpIHJldHVybiBkb25lKGZhbHNlLCBudWxsKTtcbiAgICAgICAgICAgIGlmICghYmNyeXB0LmNvbXBhcmVTeW5jKHBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkKSkgcmV0dXJuIGRvbmUoZmFsc2UsIG5ldyBFcnJvcignSW52YWxpZCBwYXNzd29yZCcpKTtcbiAgICAgICAgICAgIGxldCB1c2VyRGV0YWlsczogYW55ID0ge1xuICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICAgICAgICByb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZG9uZSh1c2VyRGV0YWlscywgbnVsbCk7XG4gICAgICAgIH0pLmNhdGNoKChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICBkb25lKGZhbHNlLCBlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVxLmxvZ291dCA9ICgpID0+IHtcbiAgICAgICAgcmVxLnNlc3Npb24udG9rZW4gPSBudWxsO1xuICAgIH1cbiAgICByZXEuaXNzdWVOZXdUb2tlbiA9ICh1c2VyOiBJVXNlcikgPT4ge1xuICAgICAgICBsZXQgdG9rZW46IHN0cmluZyA9IHNpZ24oe1xuICAgICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICAgICAgcm9sZTogdXNlci5yb2xlLFxuICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWxcbiAgICAgICAgfSwgZW52LnNlY3JldCwge1xuICAgICAgICAgICAgZXhwaXJlc0luOiA4NjQwMCAvLyBleHBpcmVzIGluIDI0IGhvdXJzXG4gICAgICAgIH0pO1xuICAgICAgICByZXEuc2Vzc2lvbi50b2tlbiA9IHRva2VuO1xuICAgICAgICByZXMuc2V0SGVhZGVyKCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgIH1cbiAgICBuZXh0KCk7XG59KTtcblxuUm91dGVzKGFwcCk7XG5zZXJ2ZXIgPSBodHRwLmNyZWF0ZVNlcnZlcihhcHApO1xuc2VydmVyLm9uKCdlcnJvcicsIChlcnI6IEVycm9yKSA9PiB7XG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIHNlcnZlci5jbG9zZSgpO1xufSlcblxuaWYgKCFlbnYuZGlzYWJsZUF1dG9TdGFydCkge1xuICAgIHNvY2tldFNlcnZlciA9IHdlYnNvY2tldChzZXJ2ZXIsIGRiKTtcbiAgICBtb25nb29zZS5jb25uZWN0aW9uLm9uKCdjb25uZWN0ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDb25uZWN0ZWQgdG8gTW9uZ29EQiB2aWEgTW9uZ29vc2UnKTtcbiAgICAgICAgc2VydmVyLmxpc3Rlbihwb3J0LCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgTGlzdGVuaW5nIG9uIHBvcnQgJHtwb3J0fSFgKTtcbiAgICAgICAgICAgIGFwcC5lbWl0KCdzZXJ2ZXIgc3RhcnRlZCcpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2VydmVyO1xuZXhwb3J0IGNvbnN0IGNvbm4gPSBtb25nb29zZS5jb25uZWN0aW9uO1xuZXhwb3J0IHsgYXBwLCBzb2NrZXRTZXJ2ZXIgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3N1cmZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29va2llLXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzLXNlc3Npb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaGVsbWV0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvbXByZXNzaW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm11c3RhY2hlLWV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29ubmVjdC1tb25nb1wiKTsiLCJpbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQXBwLCBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJy4uL3R5cGVzL2V4cHJlc3MnO1xuaW1wb3J0IGF1dGhvcml6ZWQgZnJvbSAnLi9taWRkbGV3YXJlL2F1dGhvcml6ZWQnO1xuaW1wb3J0IGF1dGhDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvYXV0aENvbnRyb2xsZXInO1xuaW1wb3J0IHVzZXJDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvdXNlckNvbnRyb2xsZXInO1xuaW1wb3J0IG1lc3NhZ2VDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvbWVzc2FnZUNvbnRyb2xsZXInO1xuaW1wb3J0IGNoYW5uZWxDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvY2hhbm5lbENvbnRyb2xsZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhcHA6IEFwcCkge1xuXG4gICAgLyogU3RhdGljIFJvdXRlcyAqL1xuICAgIGFwcC5nZXQoJy8nLCBmdW5jdGlvbiAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiByZXMucmVuZGVyKFxuICAgICAgICAgICAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL2Rpc3QvcHVibGljL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgICAgIHsgY3NyZlRva2VuOiByZXEuY3NyZlRva2VuKCkgfVxuICAgICAgICApO1xuICAgIH0pO1xuICAgIC8qIFdpZGdldCByZW5kZXJlZCBpbnNpZGUgaWZyYW1lIHZpYSB3aWRnZXQtZW1iZWQgc2NyaXB0ICovXG4gICAgYXBwLmdldCgnL3dpZGdldCcsIGZ1bmN0aW9uIChyZXE6IGFueSwgcmVzOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5yZW5kZXIoXG4gICAgICAgICAgICBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vLi4vZGlzdC9wdWJsaWMvd2lkZ2V0L2luZGV4Lmh0bWwnKVxuICAgICAgICApO1xuICAgIH0pO1xuICAgIC8qIFBhZ2UgZGVtb2luZyBlbWJlZGRlZCB3aWRnZXQgKi9cbiAgICBhcHAuZ2V0KCcvd2lkZ2V0L2RlbW8nLCBmdW5jdGlvbiAocmVxOiBhbnksIHJlczogYW55KSB7XG4gICAgICAgIHJldHVybiByZXMucmVuZGVyKFxuICAgICAgICAgICAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uLy4uL2Rpc3QvcHVibGljL3dpZGdldC9kZW1vLmh0bWwnKVxuICAgICAgICApO1xuICAgIH0pO1xuICAgIFxuICAgIC8qIEFQSSBSb3V0ZXMgKi9cbiAgICBcbiAgICBhcHAucG9zdCgnL2FwaS92MS9sb2dpbicsIGF1dGhDb250cm9sbGVyLmxvZ2luKTtcbiAgICBhcHAucG9zdCgnL2FwaS92MS9yZWdpc3RlcicsIGF1dGhDb250cm9sbGVyLnJlZ2lzdGVyKTtcbiAgICBhcHAuZ2V0KCcvYXBpL3YxL2xvZ291dCcsIGF1dGhDb250cm9sbGVyLmxvZ291dCk7XG4gICAgYXBwLmdldCgnL2FwaS92MS92ZXJpZnlFbWFpbC86aWQnLCBhdXRoQ29udHJvbGxlci52ZXJpZnlFbWFpbCk7XG5cbiAgICBhcHAudXNlKCcvYXBpL3YxL3VzZXInLCBhdXRob3JpemVkKTtcbiAgICBhcHAuZ2V0KCcvYXBpL3YxL3VzZXInLCB1c2VyQ29udHJvbGxlci51c2VyKTtcbiAgICBhcHAuZ2V0KCcvYXBpL3YxL3VzZXJzJywgdXNlckNvbnRyb2xsZXIudXNlcnMpXG4gICAgYXBwLmdldCgnL2FwaS92MS91c2VyLzp1c2VyJywgdXNlckNvbnRyb2xsZXIudXNlckJ5RW1haWwpO1xuICAgIGFwcC5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL2VtYWlsJywgdXNlckNvbnRyb2xsZXIudXBkYXRlRW1haWwpO1xuICAgIGFwcC5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL25hbWUnLCB1c2VyQ29udHJvbGxlci51cGRhdGVOYW1lKTtcbiAgICBhcHAucG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9wYXNzd29yZCcsIHVzZXJDb250cm9sbGVyLnVwZGF0ZVBhc3N3b3JkKTtcbiAgICBhcHAucG9zdCgnL2FwaS92MS91c2VyL3Jlc2V0X3Bhc3N3b3JkJywgdXNlckNvbnRyb2xsZXIucmVzZXRQYXNzd29yZCk7XG5cbiAgICBhcHAuZ2V0KCcvYXBpL3YxL21lc3NhZ2UqJywgYXV0aG9yaXplZCk7XG4gICAgYXBwLmdldCgnL2FwaS92MS9tZXNzYWdlcy86Y2hhbm5lbC86b2Zmc2V0JywgbWVzc2FnZUNvbnRyb2xsZXIubWVzc2FnZXMpO1xuXG4gICAgYXBwLnVzZSgnL2FwaS92MS9jaGFubmVsJywgYXV0aG9yaXplZCk7XG4gICAgYXBwLmdldCgnL2FwaS92MS9jaGFubmVscycsIGNoYW5uZWxDb250cm9sbGVyLmNoYW5uZWxzKTtcbiAgICBhcHAucG9zdCgnL2FwaS92MS9jaGFubmVscy9kZWxldGUnLCBjaGFubmVsQ29udHJvbGxlci5kZWxldGUpO1xuICAgIGFwcC5wb3N0KCcvYXBpL3YxL2NoYW5uZWxzL2NyZWF0ZScsIGNoYW5uZWxDb250cm9sbGVyLmNyZWF0ZSk7XG5cbiAgICAvKiBEaXNwbGF5IGluZGV4Lmh0bWwgaWYgdW5rbm93biBwYXRoLCBhbmQgbGV0IFJlYWN0LVJvdXRlciBoYW5kbGUgdGhlIDQwNCAqL1xuICAgIGFwcC5nZXQoJyonLCBmdW5jdGlvbiAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiByZXMucmVuZGVyKFxuICAgICAgICAgICAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL2Rpc3QvcHVibGljL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgICAgIHsgY3NyZlRva2VuOiByZXEuY3NyZlRva2VuKCkgfVxuICAgICAgICApO1xuICAgIH0pO1xufSIsImltcG9ydCB7IHZlcmlmeSB9IGZyb20gJ2pzb253ZWJ0b2tlbic7XG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJy4uLy4uL3R5cGVzL2p3dCc7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJy4uLy4uL3R5cGVzL2V4cHJlc3MnO1xuY29uc3QgZW52ID0gcmVxdWlyZSgnLi4vLi4vLi4vZW52Jyk7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IEZ1bmN0aW9uKSB7XG4gICAgLy8gc2VlIGlmIHdlIG5lZWQgdG8gbG9hZCB0b2tlbiBmcm9tIHNlc3Npb25cbiAgICBpZiAocmVxLnNlc3Npb24udG9rZW4gJiYgIXJlcS5oZWFkZXJzWyd4LWFjY2Vzcy10b2tlbiddKSB7XG4gICAgICAgIHJlcy5zZXRIZWFkZXIoJ3gtYWNjZXNzLXRva2VuJywgcmVxLnNlc3Npb24udG9rZW4pO1xuICAgIH1cbiAgICB2YXIgdG9rZW4gPSByZXEuaGVhZGVyc1sneC1hY2Nlc3MtdG9rZW4nXSB8fCByZXEuc2Vzc2lvbi50b2tlbjtcbiAgICBpZiAoIXRva2VuKVxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oeyBlcnJvcjogJ05vdCBhdXRob3JpemVkJyB9KTtcblxuICAgIHZlcmlmeSh0b2tlbiwgZW52LnNlY3JldCwgKGVycjogRXJyb3IsIGRlY29kZWQ6IFRva2VuKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHJldHVybiByZXMuc3RhdHVzKDQwMSkuc2VuZCh7IGVycm9yOiAnTm90IGF1dGhvcml6ZWQnIH0pO1xuICAgICAgICByZXEudXNlciA9IGRlY29kZWQ7XG4gICAgICAgIHJldHVybiBuZXh0KCk7XG4gICAgfSk7ICAgIFxufSIsImltcG9ydCB7IGlzRW1haWwsIGlzRW1wdHkgfSBmcm9tICd2YWxpZGF0b3InO1xuaW1wb3J0IHsgaGFzaFN5bmMgfSBmcm9tICdiY3J5cHRqcyc7XG5pbXBvcnQge1JlcXVlc3QsIFJlc3BvbnNlfSBmcm9tICcuLi8uLi90eXBlcy9leHByZXNzJztcbmltcG9ydCBVc2VyLCB7IElVc2VyIH0gZnJvbSAnLi4vbW9kZWxzL1VzZXInO1xuY29uc3QgZW52ID0gcmVxdWlyZSgnLi4vLi4vLi4vZW52Jyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBsb2dpbjogKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAoaXNFbXB0eShyZXEuYm9keS5lbWFpbCB8fCAnJykgfHwgaXNFbXB0eShyZXEuYm9keS5wYXNzd29yZCB8fCAnJykpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnUGxlYXNlIHN1cHBseSBhbiBlbWFpbCBhbmQgcGFzc3dvcmQnIH0pLmVuZCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNFbWFpbChyZXEuYm9keS5lbWFpbCkpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnTm90IGEgdmFsaWQgZW1haWwgYWRkcmVzcycgfSkuZW5kKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVxLmF1dGhlbnRpY2F0ZShyZXEuYm9keS5lbWFpbCwgcmVxLmJvZHkucGFzc3dvcmQsICh1c2VyOiBhbnkgfCBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXVzZXIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5qc29uKHsgZXJyb3I6ICdJbnZhbGlkIGVtYWlsIG9yIHBhc3N3b3JkJyB9KS5lbmQoKTtcbiAgICAgICAgICAgIHJlcS5pc3N1ZU5ld1Rva2VuKHVzZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKVxuICAgICAgICAgICAgICAgIC5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IHVzZXIucm9sZSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdXNlci5uYW1lfSkuZW5kKCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVnaXN0ZXI6IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKGlzRW1wdHkocmVxLmJvZHkuZW1haWwgfHwgJycpIHx8IGlzRW1wdHkocmVxLmJvZHkucGFzc3dvcmQgfHwgJycpKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ1BsZWFzZSBzdXBwbHkgYW4gZW1haWwgYW5kIHBhc3N3b3JkJyB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzRW1haWwocmVxLmJvZHkuZW1haWwpKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ05vdCBhIHZhbGlkIGVtYWlsIGFkZHJlc3MnIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBVc2VyLmZpbmRCeUVtYWlsKHJlcS5ib2R5LmVtYWlsKS5jb3VudERvY3VtZW50cygpLmV4ZWMoKS50aGVuKChjb3VudDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoY291bnQgIT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtlcnJvcjogJ0VtYWlsIGFkZHJlc3MgaW4gdXNlJ30pO1xuICAgICAgICAgICAgbGV0IHBhc3N3b3JkSGFzaCA9IGhhc2hTeW5jKHJlcS5ib2R5LnBhc3N3b3JkKTtcbiAgICAgICAgICAgIC8vIElmIHRoaXMgaXMgdGhlIGZpcnN0IHVzZXIgYmVpbmcgY3JlYXRlZCwgYXNpZ24gcm9sZSBvZiBhZG1pblxuICAgICAgICAgICAgVXNlci5jb3VudERvY3VtZW50cygpLmV4ZWMoKS50aGVuKChjb3VudDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHJvbGUgPSAndXNlcic7XG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ID09PSAwKVxuICAgICAgICAgICAgICAgICAgICByb2xlID0gJ2FkbWluJztcbiAgICAgICAgICAgICAgICBsZXQgdXNlciA9IG5ldyBVc2VyKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiByZXEuYm9keS5lbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkSGFzaCxcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogcm9sZSxcbiAgICAgICAgICAgICAgICAgICAgZW1haWxWZXJpZmllZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdXNlci5zYXZlKCkudGhlbigodTogSVVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oe2Vycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcgdHJ5aW5nIHRvIGNyZWF0ZSBhIG5ldyB1c2VyJ30pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG5cbiAgICB9LFxuICAgIGxvZ291dDogKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICByZXEubG9nb3V0KCk7XG4gICAgICAgIHJldHVybiByZXMuanNvbih7c3VjY2VzczogdHJ1ZSwgbWVzc2FnZTogJ2xvZ2dlZCBvdXQnfSk7XG4gICAgfSxcbiAgICB2ZXJpZnlFbWFpbDogKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgIH1cbn0iLCJpbXBvcnQge2lzRW1haWwsIGlzRW1wdHl9IGZyb20gJ3ZhbGlkYXRvcic7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJy4uLy4uL3R5cGVzL2V4cHJlc3MnO1xuaW1wb3J0IFVzZXIsIHsgSVVzZXIsIElVc2VyTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvVXNlcic7XG5pbXBvcnQge2NvbXBhcmVTeW5jLCBoYXNoU3luY30gZnJvbSAnYmNyeXB0anMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgdXNlcjogKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICByZXMuc2VuZChyZXEudXNlcik7XG4gICAgfSxcbiAgICB1c2VyczogKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICByZXR1cm4gVXNlci5maW5kKHt9KS50aGVuKCh1c2VyczogSVVzZXJbXSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCB1c2VyczogdXNlcnN9KTtcbiAgICAgICAgfSkuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7ZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSByZXRyaWV2aW5nIHVzZXJzJ30pO1xuICAgICAgICB9KVxuICAgIH0sXG4gICAgdXNlckJ5RW1haWw6IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYoIWlzRW1haWwocmVxLnBhcmFtcy51c2VyKSlcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7ZXJyb3I6ICdQbGVhc2Ugc3VwcGx5IGEgdmFsaWQgZW1haWwnfSk7XG5cbiAgICAgICAgcmV0dXJuIFVzZXIuZmluZEJ5RW1haWwocmVxLnBhcmFtcy51c2VyKS5leGVjKCkudGhlbigodXNlcjogSVVzZXIpID0+IHtcbiAgICAgICAgICAgIGlmICh1c2VyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBfaWQ6IHVzZXIuX2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdXNlci5uYW1lIHx8ICcnLFxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7ZXJyb3I6ICdObyB1c2VyIGZvdW5kIHdpdGggdGhhdCBlbWFpbCd9KTtcbiAgICAgICAgICAgIFxuICAgICAgICB9KS5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nIHRyeWluZyB0byBmaW5kIHRoZSB1c2VyJ30pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHVwZGF0ZUVtYWlsOiAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmKCFpc0VtYWlsKHJlcS5ib2R5LmVtYWlsKSlcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnTm90IGEgdmFsaWQgZW1haWwnIH0pO1xuICAgICAgICByZXR1cm4gVXNlci5jb3VudERvY3VtZW50cyh7ZW1haWw6IHJlcS5ib2R5LmVtYWlsfSkuZXhlYygpLnRoZW4oKGNvdW50OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChjb3VudCAhPT0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ0VtYWlsIGFkZHJlc3MgYWxyZWFkeSBpbiB1c2UnIH0pO1xuICAgICAgICAgICAgcmV0dXJuIFVzZXIuZmluZEJ5RW1haWwocmVxLnVzZXIuZW1haWwpLmV4ZWMoKS50aGVuKCh1c2VyOiBJVXNlcikgPT4ge1xuICAgICAgICAgICAgICAgIHVzZXIuZW1haWwgPSByZXEuYm9keS5lbWFpbDtcbiAgICAgICAgICAgICAgICB1c2VyLnNhdmUoKTtcbiAgICAgICAgICAgICAgICByZXEuaXNzdWVOZXdUb2tlbihPYmplY3QuYXNzaWduKHt9LCByZXEudXNlciwge2VtYWlsOiByZXEuYm9keS5lbWFpbH0pKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZyB0cnlpbmcgdG8gZmV0Y2ggdGhlIHVzZXInIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgdXBkYXRlTmFtZTogKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICByZXR1cm4gVXNlci5maW5kQnlFbWFpbChyZXEudXNlci5lbWFpbClcbiAgICAgICAgICAgIC5leGVjKCkudGhlbigodXNlcjogSVVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICB1c2VyLm5hbWUgPSByZXEuYm9keS5uYW1lO1xuICAgICAgICAgICAgICAgIHVzZXIuc2F2ZSgpO1xuICAgICAgICAgICAgICAgIHJlcS5pc3N1ZU5ld1Rva2VuKE9iamVjdC5hc3NpZ24oe30sIHJlcS51c2VyLCB7IG5hbWU6IHJlcS5ib2R5Lm5hbWUgfSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZX0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nIHRyeWluZyB0byB1cGRhdGUgdGhlIHVzZXInfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgdXBkYXRlUGFzc3dvcmQ6IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKGlzRW1wdHkocmVxLmJvZHkubmV3UGFzcykgfHwgaXNFbXB0eShyZXEuYm9keS5vbGRQYXNzKSlcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnTXVzdCBzdXBwbHkgdGhlIGN1cnJlbnQgYW5kIG5ldyBwYXNzd29yZCcgfSk7XG4gICAgICAgIHJldHVybiBVc2VyLmZpbmRCeUVtYWlsKHJlcS51c2VyLmVtYWlsKS5leGVjKCkudGhlbigodXNlcjogSVVzZXIpID0+IHtcbiAgICAgICAgICAgIGlmICghY29tcGFyZVN5bmMocmVxLmJvZHkub2xkUGFzcywgdXNlci5wYXNzd29yZCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtlcnJvcjogJ0N1cnJlbnQgcGFzc3dvcmQgaXMgaW5jb3JyZWN0J30pO1xuICAgICAgICAgICAgdXNlci5wYXNzd29yZCA9IGhhc2hTeW5jKHJlcS5ib2R5Lm5ld1Bhc3MpO1xuICAgICAgICAgICAgdXNlci5zYXZlKCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWV9KTtcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIHJlc2V0UGFzc3dvcmQ6IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtlcnJvcjogJ05vdCBpbXBsZW1lbnRlZCd9KTtcbiAgICB9LFxufSIsImltcG9ydCB7UmVxdWVzdCwgUmVzcG9uc2V9IGZyb20gJy4uLy4uL3R5cGVzL2V4cHJlc3MnO1xuaW1wb3J0IE1lc3NhZ2UsIHtJTWVzc2FnZX0gZnJvbSAnLi4vbW9kZWxzL01lc3NhZ2UnO1xuZXhwb3J0IGRlZmF1bHQge1xuICAgIG1lc3NhZ2VzOiAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHJldHVybiBNZXNzYWdlLmZpbmQoe2NoYW5uZWw6IHJlcS5wYXJhbXMuY2hhbm5lbH0pXG4gICAgICAgICAgICAuc2tpcChwYXJzZUludChyZXEucGFyYW1zLm9mZmVzdCkpXG4gICAgICAgICAgICAuc29ydCh7X2lkOiAtMX0pXG4gICAgICAgICAgICAubGltaXQoMjApXG4gICAgICAgICAgICAuZXhlYygpLnRoZW4oKG1lc3NhZ2VzOiBJTWVzc2FnZVtdKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBtZXNzYWdlcy5tYXAoKG06IElNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IG0udGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkOiBtLmNyZWF0ZWRBdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyRW1haWw6IG0udXNlckVtYWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWw6IG0uY2hhbm5lbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaWQ6IG0uX2lkXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgfSkucmV2ZXJzZSgpXG4gICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0pLmNhdGNoKChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ3NvbWV0aGluZyB3ZW50IHdyb25nIHRyeWluZyB0byBmZXRjaCBtZXNzYWdlcycgfSk7XG4gICAgICAgIH0pXG4gICAgfVxufSIsImltcG9ydCB7UmVxdWVzdCwgUmVzcG9uc2V9IGZyb20gJy4uLy4uL3R5cGVzL2V4cHJlc3MnO1xuaW1wb3J0IENoYW5uZWwsIHtJQ2hhbm5lbH0gZnJvbSAnLi4vbW9kZWxzL0NoYW5uZWwnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgY2hhbm5lbHM6IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgLy8gSWYgbm8gY2hhbm5lbHMgZXhpc3QsIGNyZWF0ZSBhICdnZW5lcmFsJyBhbmQgJ3JhbmRvbScgY2hhbm5lbFxuICAgICAgICByZXR1cm4gQ2hhbm5lbC5jb3VudERvY3VtZW50cygpLmV4ZWMoKS50aGVuKChjb3VudDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBsZXQgcCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgQ2hhbm5lbC5jcmVhdGUoW3tuYW1lOiAnZ2VuZXJhbCd9LCB7bmFtZTogJ3JhbmRvbSd9XSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBDaGFubmVsLmZpbmQoKS5leGVjKCkudGhlbigoY2hhbm5lbHM6IElDaGFubmVsW10pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtjaGFubmVsczogY2hhbm5lbHN9KTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBmZXRjaCBjaGFubmVscycgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oe2Vycm9yOiAnU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIGNyZWF0ZSBkZWZhdWx0IGNoYW5uZWxzJ30pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLmNhdGNoKChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oe2Vycm9yOiAnU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgY291bnRpbmcgY2hhbm5lbHMnfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZGVsZXRlOiAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgIFxuICAgIH0sXG4gICAgY3JlYXRlOiAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG5cbiAgICB9XG59IiwiaW1wb3J0IHtTY2hlbWEsIERvY3VtZW50LCBNb2RlbCwgbW9kZWx9IGZyb20gJ21vbmdvb3NlJztcblxuZXhwb3J0IGludGVyZmFjZSBJQ2hhbm5lbCBleHRlbmRzIERvY3VtZW50IHtcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgY3JlYXRlZEF0OiBEYXRlLFxuICAgIHVwZGF0ZWRBdDogRGF0ZSxcbn1cblxuY29uc3QgY2hhbm5lbFNjaGVtYTogU2NoZW1hID0gbmV3IFNjaGVtYSh7XG4gICAgbmFtZToge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBsb3dlcmNhc2U6IHRydWUsXG4gICAgfSxcbn0sIHtcbiAgICB0aW1lc3RhbXBzOiB0cnVlXG59KTtcblxuY29uc3QgQ2hhbm5lbDogTW9kZWw8SUNoYW5uZWw+ID0gbW9kZWwoJ0NoYW5uZWwnLCBjaGFubmVsU2NoZW1hKTtcbmV4cG9ydCBkZWZhdWx0IENoYW5uZWw7IiwiaW1wb3J0ICogYXMgc29ja2V0aW8gZnJvbSAnc29ja2V0LmlvJztcbmltcG9ydCB7IFNlcnZlciB9IGZyb20gJ2h0dHAnO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCB7YXV0aG9yaXplIGFzIGF1dGhvcml6ZUp3dH0gZnJvbSAnc29ja2V0aW8tand0JztcbmltcG9ydCBNZXNzYWdlLCB7IElNZXNzYWdlIH0gZnJvbSAnLi4vbW9kZWxzL01lc3NhZ2UnO1xuaW1wb3J0IHsgVG9rZW4gfSBmcm9tICcuLi8uLi90eXBlcy9qd3QnO1xuY29uc3QgZW52ID0gcmVxdWlyZSgnLi4vLi4vLi4vZW52Jyk7XG5cbmludGVyZmFjZSBTb2NrZXQgZXh0ZW5kcyBzb2NrZXRpby5Tb2NrZXQge1xuICAgIGp3dDogVG9rZW5cbn0gXG5cbmNvbnN0IGluaXQgPSAoc2VydmVyOiBTZXJ2ZXIsIGRiOiBDb25uZWN0aW9uKTogc29ja2V0aW8uU2VydmVyID0+IHtcbiAgICBjb25zdCBpbzogc29ja2V0aW8uU2VydmVyID0gc29ja2V0aW8oc2VydmVyKTtcbiAgICBsZXQgY29ubmVjdGVkVXNlckVtYWlsczogc3RyaW5nW10gPSBbXTtcblxuICAgIC8vIHNldCBhdXRob3JpemF0aW9uIGZvciBzb2NrZXQuaW9cbiAgICBpby5vbignY29ubmVjdGlvbicsIGF1dGhvcml6ZUp3dCh7XG4gICAgICAgICAgICBzZWNyZXQ6IGVudi5zZWNyZXQsXG4gICAgICAgICAgICB0aW1lb3V0OiAxNTAwMCwgLy8gMTUgc2Vjb25kcyB0byBzZW5kIHRoZSBhdXRoZW50aWNhdGlvbiBtZXNzYWdlXG4gICAgICAgICAgICBkZWNvZGVkUHJvcGVydHlOYW1lOiAnand0J1xuICAgICAgICB9KSkub24oJ2F1dGhlbnRpY2F0ZWQnLCAoc29ja2V0OiBTb2NrZXQpID0+IHtcblxuICAgICAgICAgICAgY29ubmVjdGVkVXNlckVtYWlscy5wdXNoKHNvY2tldC5qd3QuZW1haWwpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0Nvbm5lY3RlZCB1c2VycycsIGNvbm5lY3RlZFVzZXJFbWFpbHMpO1xuICAgICAgICAgICAgaW8uZW1pdCgnY29ubmVjdGVkIHVzZXJzJywgY29ubmVjdGVkVXNlckVtYWlscy5maWx0ZXIoKHZhbHVlLCBpbmRleCwgc2VsZikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmluZGV4T2YodmFsdWUpID09PSBpbmRleDtcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgc29ja2V0Lm9uKCdkaXNjb25uZWN0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbm5lY3RlZFVzZXJFbWFpbHMuc3BsaWNlKGNvbm5lY3RlZFVzZXJFbWFpbHMuaW5kZXhPZihzb2NrZXQuand0LmVtYWlsKSwgMSk7XG4gICAgICAgICAgICAgICAgaW8uZW1pdCgnY29ubmVjdGVkIHVzZXJzJywgY29ubmVjdGVkVXNlckVtYWlscy5maWx0ZXIoKHZhbHVlLCBpbmRleCwgc2VsZikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXg7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNvY2tldC5vbignbWVzc2FnZScsIChtZXNzYWdlOiB7IHRleHQ6IHN0cmluZywgY2hhbm5lbDogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICBsZXQgbTogSU1lc3NhZ2UgPSBuZXcgTWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5uZWw6IG1lc3NhZ2UuY2hhbm5lbCxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogbWVzc2FnZS50ZXh0LFxuICAgICAgICAgICAgICAgICAgICB1c2VyRW1haWw6IHNvY2tldC5qd3QuZW1haWxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBtLnNhdmUoKS50aGVuKChtOiBJTWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpby5lbWl0KCdtZXNzYWdlJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgX2lkOiBtLl9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJFbWFpbDogbS51c2VyRW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBtLnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsOiBtLmNoYW5uZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkOiBtLmNyZWF0ZWRBdFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoJ21lc3NhZ2UgcmVjZWl2ZWQnKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KCdtZXNzYWdlIHJlY2VpdmUgZXJyb3InLCBlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIHJldHVybiBpbztcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdDsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzb2NrZXQuaW9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic29ja2V0aW8tand0XCIpOyIsImltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0ICdtb2NoYSc7XG5pbXBvcnQgKiBhcyBzb2NrZXRpb2NsaWVudCBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7IE5vdEltcGxlbWVudGVkRXJyb3IgfSBmcm9tICcuLi8nO1xuaW1wb3J0IHtTdGF0ZSwgcm9vdFJlZHVjZXIsIG1pZGRsZXdhcmV9IGZyb20gJy4uLy4uL3NyYy93ZWIvc3RvcmUnO1xuXG5pbXBvcnQgeyBTdG9yZSwgY3JlYXRlU3RvcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBzZXRBdXRob3JpemVkLCBzZXRVc2VyLCBsb2dvdXRVc2VyIH0gZnJvbSAnLi4vLi4vc3JjL3dlYi9hY3Rpb25zL3VzZXJBY3Rpb25zJztcbmltcG9ydCB7IGFkZENoYW5uZWxzLCBzZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcywgaW5jcmVtZW50Q2hhbm5lbFJldHJpZXZlTWVzc2FnZXNPZmZzZXQsIHNldENoYW5uZWxIYXNNb3JlTWVzc2FnZXMsIGFkZFJlY2VpdmVkQ2hhbm5lbE1lc3NhZ2UsIGFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcywgY2xlYXJDaGFubmVsc0RhdGEgfSBmcm9tICcuLi8uLi9zcmMvd2ViL2FjdGlvbnMvY2hhbm5lbHNBY3Rpb25zJztcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICcuLi8uLi9zcmMvd2ViL3JlZHVjZXJzL2NoYW5uZWxzJztcbmltcG9ydCB7IGFkZEVycm9yLCByZW1vdmVFcnJvciwgY2xlYXJFcnJvcnMsIGFkZEluZm8sIHJlbW92ZUluZm8sIGNsZWFySW5mb3MgfSBmcm9tICcuLi8uLi9zcmMvd2ViL2FjdGlvbnMvbm90aWZpY2F0aW9uc0FjdGlvbnMnO1xuaW1wb3J0IHsgdG9nZ2xlU2lkZWJhck9wZW4gfSBmcm9tICcuLi8uLi9zcmMvd2ViL2FjdGlvbnMvc2lkZWJhckFjdGlvbnMnO1xuaW1wb3J0IHsgaW5pdFdlYnNvY2tldCwgc2V0U29ja2V0Q29ubmVjdGVkLCBzZXRTb2NrZXRDb25uZWN0ZWRVc2VycyB9IGZyb20gJy4uLy4uL3NyYy93ZWIvYWN0aW9ucy9zb2NrZXRBY3Rpb25zJztcbmltcG9ydCB7IHVwZGF0ZVVzZXJzLCBhZGRVc2VyLCByZW1vdmVVc2VyIH0gZnJvbSAnLi4vLi4vc3JjL3dlYi9hY3Rpb25zL2NoYXRVc2Vyc0FjdGlvbnMnO1xuaW1wb3J0IHsgU3RhdGUgYXMgQ2hhdFVzZXJzU3RhdGUgfSBmcm9tICcuLi8uLi9zcmMvd2ViL3JlZHVjZXJzL2NoYXRVc2Vycyc7XG5cbmZ1bmN0aW9uIGdldFN0b3JlKCk6IFN0b3JlPFN0YXRlPiB7XG4gICAgcmV0dXJuIGNyZWF0ZVN0b3JlKHJvb3RSZWR1Y2VyLCBtaWRkbGV3YXJlKTtcbn1cblxuZGVzY3JpYmUoJ1N0b3JlIGFuZCBTeW5jaHJvbm91cyBBY3Rpb25zJywgZnVuY3Rpb24oKSB7XG4gICAgZGVzY3JpYmUoJ1VzZXIgU3RhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBzdG9yZTogU3RvcmU8U3RhdGU+O1xuICAgICAgICBsZXQgdXNlcjogKCgpID0+IFN0YXRlWyd1c2VyJ10pO1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlID0gZ2V0U3RvcmUoKTtcbiAgICAgICAgICAgIHVzZXIgPSAoKSA9PiBzdG9yZS5nZXRTdGF0ZSgpLnVzZXI7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIG5vdCBiZSBhdXRob3JpemVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UodXNlcigpLmF1dGhvcml6ZWQpO1xuICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UodXNlcigpLmVtYWlsKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKHVzZXIoKS5uYW1lKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKHVzZXIoKS5yb2xlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgYmUgYXV0aG9yaXplZCBhZnRlciBzZXRBdXRob3JpemVkIGFjdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UodXNlcigpLmF1dGhvcml6ZWQpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc2V0QXV0aG9yaXplZCh0cnVlKSk7XG4gICAgICAgICAgICBhc3NlcnQuaXNUcnVlKHVzZXIoKS5hdXRob3JpemVkKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldEF1dGhvcml6ZWQoZmFsc2UpKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKHVzZXIoKS5hdXRob3JpemVkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgaGF2ZSB1c2VyIGRhdGEgYWZ0ZXIgc2V0dGluZyB0aGUgdXNlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UodXNlcigpLmF1dGhvcml6ZWQpO1xuICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UodXNlcigpLmVtYWlsKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKHVzZXIoKS5uYW1lKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKHVzZXIoKS5yb2xlKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldFVzZXIoe1xuICAgICAgICAgICAgICAgIGF1dGhvcml6ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnSmFuZSBEb2UnLFxuICAgICAgICAgICAgICAgIHJvbGU6ICdhZG1pbidcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIGFzc2VydC5pc1RydWUodXNlcigpLmF1dGhvcml6ZWQpO1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHVzZXIoKS5lbWFpbCwgJ3Rlc3RAdGVzdC5jb20nKTtcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCh1c2VyKCkubmFtZSwgJ0phbmUgRG9lJyk7XG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwodXNlcigpLnJvbGUsICdhZG1pbicpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc2V0VXNlcih7XG4gICAgICAgICAgICAgICAgYXV0aG9yaXplZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgZW1haWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG5hbWU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJvbGU6IGZhbHNlXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICBhc3NlcnQuaXNGYWxzZSh1c2VyKCkuYXV0aG9yaXplZCk7XG4gICAgICAgICAgICBhc3NlcnQuaXNGYWxzZSh1c2VyKCkuZW1haWwpO1xuICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UodXNlcigpLm5hbWUpO1xuICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UodXNlcigpLnJvbGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgaGF2ZSB1c2VyIGRhdGEgYWZ0ZXIgbG9nZ2luZyBvdXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldFVzZXIoe1xuICAgICAgICAgICAgICAgIGF1dGhvcml6ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnSmFuZSBEb2UnLFxuICAgICAgICAgICAgICAgIHJvbGU6ICdhZG1pbidcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGxvZ291dFVzZXIoKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzZXRVc2VyKHtcbiAgICAgICAgICAgICAgICBhdXRob3JpemVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlbWFpbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbmFtZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgcm9sZTogZmFsc2VcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSlcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnQ2hhbm5lbHMgU3RhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBzdG9yZTogU3RvcmU8U3RhdGU+O1xuICAgICAgICBsZXQgY2hhbm5lbHM6ICgoKSA9PiBTdGF0ZVsnY2hhbm5lbHMnXSk7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUgPSBnZXRTdG9yZSgpO1xuICAgICAgICAgICAgY2hhbm5lbHMgPSAoKSA9PiBzdG9yZS5nZXRTdGF0ZSgpLmNoYW5uZWxzO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBhZGQgY2hhbm5lbHMgZnJvbSBhbiBhcnJheSBvZiBjaGFubmVsIG5hbWVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRDaGFubmVscyhbJ2dlbmVyYWwnLCAncmFuZG9tJywgJ3NvbWV0aGluZyBlbHNlJ10pKTtcbiAgICAgICAgICAgIGxldCBjMDogU3RhdGVbJ2NoYW5uZWxzJ11bMF0gPSBjaGFubmVscygpWzBdO1xuICAgICAgICAgICAgbGV0IGMxOiBTdGF0ZVsnY2hhbm5lbHMnXVswXSA9IGNoYW5uZWxzKClbMV07XG4gICAgICAgICAgICBsZXQgYzI6IFN0YXRlWydjaGFubmVscyddWzBdID0gY2hhbm5lbHMoKVsyXTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYzAsIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnZ2VuZXJhbCcsXG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6IFtdLFxuICAgICAgICAgICAgICAgIHJldHJpZXZlTWVzc2FnZXNPZmZzZXQ6IDAsXG4gICAgICAgICAgICAgICAgaGFzTW9yZU1lc3NhZ2VzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGZldGNoaW5nTmV3TWVzc2FnZXM6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGMxLCB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ3JhbmRvbScsXG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6IFtdLFxuICAgICAgICAgICAgICAgIHJldHJpZXZlTWVzc2FnZXNPZmZzZXQ6IDAsXG4gICAgICAgICAgICAgICAgaGFzTW9yZU1lc3NhZ2VzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGZldGNoaW5nTmV3TWVzc2FnZXM6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGMyLCB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ3NvbWV0aGluZyBlbHNlJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlczogW10sXG4gICAgICAgICAgICAgICAgcmV0cmlldmVNZXNzYWdlc09mZnNldDogMCxcbiAgICAgICAgICAgICAgICBoYXNNb3JlTWVzc2FnZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgZmV0Y2hpbmdOZXdNZXNzYWdlczogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgdXBkYXRlIGZldGNoaW5nTmV3TWVzc2FnZXMgYWZ0ZXIgY2FsbGluZyBzZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcyBhY3Rpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZENoYW5uZWxzKFsnZ2VuZXJhbCcsICdyYW5kb20nLCAnc29tZXRoaW5nIGVsc2UnXSkpO1xuICAgICAgICAgICAgY2hhbm5lbHMoKS5mb3JFYWNoKChjOiBTdGF0ZVsnY2hhbm5lbHMnXVswXSkgPT4ge1xuICAgICAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKGMuZmV0Y2hpbmdOZXdNZXNzYWdlcyk7XG4gICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMoYy5uYW1lLCB0cnVlKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNoYW5uZWxzKCkuZm9yRWFjaCgoYzogU3RhdGVbJ2NoYW5uZWxzJ11bMF0pID0+IHtcbiAgICAgICAgICAgICAgICBhc3NlcnQuaXNUcnVlKGMuZmV0Y2hpbmdOZXdNZXNzYWdlcyk7XG4gICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMoYy5uYW1lLCBmYWxzZSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjaGFubmVscygpLmZvckVhY2goKGM6IFN0YXRlWydjaGFubmVscyddWzBdKSA9PiB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UoYy5mZXRjaGluZ05ld01lc3NhZ2VzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBpbmNyZW1lbnQgdGhlIGNoYW5uZWwgb2Zmc2V0IGZvciByZXRyaWV2aW5nIG5ldyBtZXNzYWdlcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWRkQ2hhbm5lbHMoWydnZW5lcmFsJywgJ3JhbmRvbScsICdzb21ldGhpbmcgZWxzZSddKSk7XG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoY2hhbm5lbHMoKS5maW5kKGUgPT4gZS5uYW1lID09PSAnZ2VuZXJhbCcpLnJldHJpZXZlTWVzc2FnZXNPZmZzZXQsIDApO1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNoYW5uZWxzKCkuZmluZChlID0+IGUubmFtZSA9PT0gJ3JhbmRvbScpLnJldHJpZXZlTWVzc2FnZXNPZmZzZXQsIDApO1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNoYW5uZWxzKCkuZmluZChlID0+IGUubmFtZSA9PT0gJ3NvbWV0aGluZyBlbHNlJykucmV0cmlldmVNZXNzYWdlc09mZnNldCwgMCk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChpbmNyZW1lbnRDaGFubmVsUmV0cmlldmVNZXNzYWdlc09mZnNldCgnZ2VuZXJhbCcsIDIwKSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChjaGFubmVscygpLmZpbmQoZSA9PiBlLm5hbWUgPT09ICdnZW5lcmFsJykucmV0cmlldmVNZXNzYWdlc09mZnNldCwgMjApO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goaW5jcmVtZW50Q2hhbm5lbFJldHJpZXZlTWVzc2FnZXNPZmZzZXQoJ2dlbmVyYWwnLCAxKSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChjaGFubmVscygpLmZpbmQoZSA9PiBlLm5hbWUgPT09ICdnZW5lcmFsJykucmV0cmlldmVNZXNzYWdlc09mZnNldCwgMjEpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goaW5jcmVtZW50Q2hhbm5lbFJldHJpZXZlTWVzc2FnZXNPZmZzZXQoJ3JhbmRvbScsIDEpKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNoYW5uZWxzKCkuZmluZChlID0+IGUubmFtZSA9PT0gJ3JhbmRvbScpLnJldHJpZXZlTWVzc2FnZXNPZmZzZXQsIDEpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goaW5jcmVtZW50Q2hhbm5lbFJldHJpZXZlTWVzc2FnZXNPZmZzZXQoJ3NvbWV0aGluZyBlbHNlJywgMSkpXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoY2hhbm5lbHMoKS5maW5kKGUgPT4gZS5uYW1lID09PSAnc29tZXRoaW5nIGVsc2UnKS5yZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0LCAxKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgdXBkYXRlIHRoZSBoYXNNb3JlTWVzc2FnZXMgcHJvcGVydHkgb24gYSBjaGFubmVsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRDaGFubmVscyhbJ2dlbmVyYWwnLCAncmFuZG9tJywgJ3NvbWV0aGluZyBlbHNlJ10pKTtcbiAgICAgICAgICAgIGFzc2VydC5pc1RydWUoY2hhbm5lbHMoKS5maW5kKGUgPT4gZS5uYW1lID09PSAnZ2VuZXJhbCcpLmhhc01vcmVNZXNzYWdlcyk7XG4gICAgICAgICAgICBhc3NlcnQuaXNUcnVlKGNoYW5uZWxzKCkuZmluZChlID0+IGUubmFtZSA9PT0gJ3JhbmRvbScpLmhhc01vcmVNZXNzYWdlcyk7XG4gICAgICAgICAgICBhc3NlcnQuaXNUcnVlKGNoYW5uZWxzKCkuZmluZChlID0+IGUubmFtZSA9PT0gJ3NvbWV0aGluZyBlbHNlJykuaGFzTW9yZU1lc3NhZ2VzKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldENoYW5uZWxIYXNNb3JlTWVzc2FnZXMoJ2dlbmVyYWwnLCBmYWxzZSkpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc2V0Q2hhbm5lbEhhc01vcmVNZXNzYWdlcygncmFuZG9tJywgZmFsc2UpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldENoYW5uZWxIYXNNb3JlTWVzc2FnZXMoJ3NvbWV0aGluZyBlbHNlJywgZmFsc2UpKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKGNoYW5uZWxzKCkuZmluZChlID0+IGUubmFtZSA9PT0gJ2dlbmVyYWwnKS5oYXNNb3JlTWVzc2FnZXMpO1xuICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UoY2hhbm5lbHMoKS5maW5kKGUgPT4gZS5uYW1lID09PSAncmFuZG9tJykuaGFzTW9yZU1lc3NhZ2VzKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKGNoYW5uZWxzKCkuZmluZChlID0+IGUubmFtZSA9PT0gJ3NvbWV0aGluZyBlbHNlJykuaGFzTW9yZU1lc3NhZ2VzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgYWRkIGEgcmVjZWl2ZWQgbWVzc2FnZSB0byB0aGUgYXBwcm9wcmlhdGUgY2hhbm5lbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWRkQ2hhbm5lbHMoWydnZW5lcmFsJywgJ3JhbmRvbScsICdzb21ldGhpbmcgZWxzZSddKSk7XG4gICAgICAgICAgICBsZXQgbWVzc2FnZTogTWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICB1c2VyRW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICBjcmVhdGVkOiBEYXRlLm5vdygpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgX2lkOiAnMScsXG4gICAgICAgICAgICAgICAgdGV4dDogJ3RoaXMgaXMgdGhlIG1lc3NhZ2UnLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWRkUmVjZWl2ZWRDaGFubmVsTWVzc2FnZSgnZ2VuZXJhbCcsIG1lc3NhZ2UpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZFJlY2VpdmVkQ2hhbm5lbE1lc3NhZ2UoJ3JhbmRvbScsIG1lc3NhZ2UpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZFJlY2VpdmVkQ2hhbm5lbE1lc3NhZ2UoJ3JhbmRvbScsIG1lc3NhZ2UpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZFJlY2VpdmVkQ2hhbm5lbE1lc3NhZ2UoJ3NvbWV0aGluZyBlbHNlJywgbWVzc2FnZSkpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWRkUmVjZWl2ZWRDaGFubmVsTWVzc2FnZSgnc29tZXRoaW5nIGVsc2UnLCBtZXNzYWdlKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRSZWNlaXZlZENoYW5uZWxNZXNzYWdlKCdzb21ldGhpbmcgZWxzZScsIG1lc3NhZ2UpKTtcblxuICAgICAgICAgICAgbGV0IGdlbmVyYWxNZXNzYWdlczogTWVzc2FnZVtdID0gY2hhbm5lbHMoKS5maW5kKGUgPT4gZS5uYW1lID09PSAnZ2VuZXJhbCcpLm1lc3NhZ2VzO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChnZW5lcmFsTWVzc2FnZXMubGVuZ3RoLCAxKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoZ2VuZXJhbE1lc3NhZ2VzLCBbbWVzc2FnZV0pO1xuICAgICAgICAgICAgbGV0IHJhbmRvbU1lc3NhZ2VzOiBNZXNzYWdlW10gPSBjaGFubmVscygpLmZpbmQoZSA9PiBlLm5hbWUgPT09ICdyYW5kb20nKS5tZXNzYWdlcztcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwocmFuZG9tTWVzc2FnZXMubGVuZ3RoLCAyKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwocmFuZG9tTWVzc2FnZXMsIFttZXNzYWdlLCBtZXNzYWdlXSk7XG4gICAgICAgICAgICBsZXQgb3RoZXJNZXNzYWdlczogTWVzc2FnZVtdID0gY2hhbm5lbHMoKS5maW5kKGUgPT4gZS5uYW1lID09PSAnc29tZXRoaW5nIGVsc2UnKS5tZXNzYWdlcztcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwob3RoZXJNZXNzYWdlcy5sZW5ndGgsIDMpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChvdGhlck1lc3NhZ2VzLCBbbWVzc2FnZSwgbWVzc2FnZSwgbWVzc2FnZV0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBhZGQgcmV0cmVpdmVkIG1lc3NhZ2VzIHRvIHRoZSBhcHByb3ByaWF0ZSBjaGFubmVsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRDaGFubmVscyhbJ2dlbmVyYWwnLCAncmFuZG9tJywgJ3NvbWV0aGluZyBlbHNlJ10pKTtcbiAgICAgICAgICAgIGxldCBtZXNzYWdlczogTWVzc2FnZVtdID0gW1xuICAgICAgICAgICAgICAgIHsgXCJ0ZXh0XCI6IFwiU29tZXRoaW5nIGhlcmVcIiwgXCJjcmVhdGVkXCI6IFwiMjAxOS0wNC0xM1QxNjo0NToyOC45NDZaXCIsIFwidXNlckVtYWlsXCI6IFwiYWJrb3RobWFuQGdtYWlsLmNvbVwiLCBcIl9pZFwiOiBcIjVjYjIxMjI4MWQ2NDVhMjJhYmVhOGRiZVwiIH0sXG4gICAgICAgICAgICAgICAgeyBcInRleHRcIjogXCIxMjM0MTIzNFwiLCBcImNyZWF0ZWRcIjogXCIyMDE5LTA0LTE0VDIyOjM0OjA2LjY4NlpcIiwgXCJ1c2VyRW1haWxcIjogXCJhYmtvdGhtYW5AZ21haWwuY29tXCIsICBcIl9pZFwiOiBcIjVjYjNiNTVlY2JmNjhjNmE5NTRlYWZiM1wiIH0sXG4gICAgICAgICAgICAgICAgeyBcInRleHRcIjogXCJ0ZXN0IG9uZSB0d28gdGhyZWVcIiwgXCJjcmVhdGVkXCI6IFwiMjAxOS0wNC0xNFQyMjozNDoxMC45MDNaXCIsIFwidXNlckVtYWlsXCI6IFwiYWJrb3RobWFuQGdtYWlsLmNvbVwiLCBcIl9pZFwiOiBcIjVjYjNiNTYyY2JmNjhjNmE5NTRlYWZiNFwiIH1dO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWRkUmV0cmlldmVkQ2hhbm5lbE1lc3NhZ2VzKCdnZW5lcmFsJywgbWVzc2FnZXMpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcygncmFuZG9tJywgbWVzc2FnZXMpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcygncmFuZG9tJywgbWVzc2FnZXMpKTtcbiAgICAgICAgICAgIGxldCBjaGFubmVsU3RhdGUgPSBjaGFubmVscygpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgICBjaGFubmVsU3RhdGVcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoKGMpID0+IGMubmFtZSA9PT0gJ2dlbmVyYWwnKVxuICAgICAgICAgICAgICAgICAgICAubWVzc2FnZXMsXG4gICAgICAgICAgICAgICAgbWVzc2FnZXMpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgICBjaGFubmVsU3RhdGVcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoKGMpID0+IGMubmFtZSA9PT0gJ3JhbmRvbScpXG4gICAgICAgICAgICAgICAgICAgIC5tZXNzYWdlcyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5jb25jYXQobWVzc2FnZXMpKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgY2hhbm5lbFN0YXRlXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKChjKSA9PiBjLm5hbWUgPT09ICdzb21ldGhpbmcgZWxzZScpXG4gICAgICAgICAgICAgICAgICAgIC5tZXNzYWdlcyxcbiAgICAgICAgICAgICAgICBbXSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGNsZWFyIGFsbCBjaGFubmVsIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZENoYW5uZWxzKFsnZ2VuZXJhbCcsICdyYW5kb20nLCAnc29tZXRoaW5nIGVsc2UnXSkpO1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2VzOiBNZXNzYWdlW10gPSBbXG4gICAgICAgICAgICAgICAgeyBcInRleHRcIjogXCJTb21ldGhpbmcgaGVyZVwiLCBcImNyZWF0ZWRcIjogXCIyMDE5LTA0LTEzVDE2OjQ1OjI4Ljk0NlpcIiwgXCJ1c2VyRW1haWxcIjogXCJhYmtvdGhtYW5AZ21haWwuY29tXCIsIFwiX2lkXCI6IFwiNWNiMjEyMjgxZDY0NWEyMmFiZWE4ZGJlXCIgfSxcbiAgICAgICAgICAgICAgICB7IFwidGV4dFwiOiBcIjEyMzQxMjM0XCIsIFwiY3JlYXRlZFwiOiBcIjIwMTktMDQtMTRUMjI6MzQ6MDYuNjg2WlwiLCBcInVzZXJFbWFpbFwiOiBcImFia290aG1hbkBnbWFpbC5jb21cIiwgXCJfaWRcIjogXCI1Y2IzYjU1ZWNiZjY4YzZhOTU0ZWFmYjNcIiB9LFxuICAgICAgICAgICAgICAgIHsgXCJ0ZXh0XCI6IFwidGVzdCBvbmUgdHdvIHRocmVlXCIsIFwiY3JlYXRlZFwiOiBcIjIwMTktMDQtMTRUMjI6MzQ6MTAuOTAzWlwiLCBcInVzZXJFbWFpbFwiOiBcImFia290aG1hbkBnbWFpbC5jb21cIiwgXCJfaWRcIjogXCI1Y2IzYjU2MmNiZjY4YzZhOTU0ZWFmYjRcIiB9XTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcygnZ2VuZXJhbCcsIG1lc3NhZ2VzKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRSZXRyaWV2ZWRDaGFubmVsTWVzc2FnZXMoJ3JhbmRvbScsIG1lc3NhZ2VzKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRSZXRyaWV2ZWRDaGFubmVsTWVzc2FnZXMoJ3JhbmRvbScsIG1lc3NhZ2VzKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjbGVhckNoYW5uZWxzRGF0YSgpKTtcbiAgICAgICAgICAgIGxldCBjaGFubmVsU3RhdGUgPSBjaGFubmVscygpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChjaGFubmVsU3RhdGUsIFtdKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ05vdGlmaWNhdGlvbnMgU3RhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBzdG9yZTogU3RvcmU8U3RhdGU+O1xuICAgICAgICBsZXQgbm90aWZpY2F0aW9uczogKCgpID0+IFN0YXRlWydub3RpZmljYXRpb25zJ10pO1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3RvcmUgPSBnZXRTdG9yZSgpO1xuICAgICAgICAgICAgbm90aWZpY2F0aW9ucyA9ICgpID0+IHN0b3JlLmdldFN0YXRlKCkubm90aWZpY2F0aW9ucztcbiAgICAgICAgfSlcbiAgICAgICAgaXQoJ3Nob3VsZCBhZGQgZXJyb3JzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5vdGlmaWNhdGlvbnMoKS5lcnJvcnMsIFtdKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZEVycm9yKCdUZXN0IGVycm9yJykpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuZXJyb3JzLCBbJ1Rlc3QgZXJyb3InXSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRFcnJvcignQW5vdGhlciBlcnJvcicpKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmVycm9ycywgWydUZXN0IGVycm9yJywgJ0Fub3RoZXIgZXJyb3InXSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJlbW92ZSBlcnJvcnMgZ2l2ZW4gYW4gaW5kZXgnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZEVycm9yKCdUZXN0IGVycm9yJykpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWRkRXJyb3IoJ0Fub3RoZXIgZXJyb3InKSk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5vdGlmaWNhdGlvbnMoKS5lcnJvcnMsIFsnVGVzdCBlcnJvcicsICdBbm90aGVyIGVycm9yJ10pO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2gocmVtb3ZlRXJyb3IoMSkpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuZXJyb3JzLCBbJ1Rlc3QgZXJyb3InXSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChyZW1vdmVFcnJvcigwKSlcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmVycm9ycywgW10pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBjbGVhciBlcnJvcnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZEVycm9yKCdUZXN0IGVycm9yJykpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWRkRXJyb3IoJ0Fub3RoZXIgZXJyb3InKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjbGVhckVycm9ycygpKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmVycm9ycywgW10pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBhZGQgaW5mbycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuaW5mb3MsIFtdKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZEluZm8oJ1Rlc3QgaW5mbycpKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmluZm9zLCBbJ1Rlc3QgaW5mbyddKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZEluZm8oJ0Fub3RoZXIgaW5mbycpKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmluZm9zLCBbJ1Rlc3QgaW5mbycsICdBbm90aGVyIGluZm8nXSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJlbW92ZSBpbmZvIGdpdmVuIGFuIGluZGV4JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRJbmZvKCdUZXN0IGluZm8nKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRJbmZvKCdBbm90aGVyIGluZm8nKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChyZW1vdmVJbmZvKDEpKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmluZm9zLCBbJ1Rlc3QgaW5mbyddKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHJlbW92ZUluZm8oMCkpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuaW5mb3MsIFtdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgY2xlYXIgaW5mb3MnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZEluZm8oJ1Rlc3QgaW5mbycpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZEluZm8oJ0Fub3RoZXIgaW5mbycpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNsZWFySW5mb3MoKSk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5vdGlmaWNhdGlvbnMoKS5pbmZvcywgW10pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnU2lkZWJhciBTdGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IHN0b3JlOiBTdG9yZTxTdGF0ZT47XG4gICAgICAgIGxldCBzaWRlYmFyOiAoKCkgPT4gU3RhdGVbJ3NpZGViYXInXSk7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUgPSBnZXRTdG9yZSgpO1xuICAgICAgICAgICAgc2lkZWJhciA9ICgpID0+IHN0b3JlLmdldFN0YXRlKCkuc2lkZWJhcjtcbiAgICAgICAgfSlcbiAgICAgICAgaXQoJ3Nob3VsZCB0b2dnbGUgb3BlbiBzdGF0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYXNzZXJ0LmlzVHJ1ZShzaWRlYmFyKCkub3Blbik7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh0b2dnbGVTaWRlYmFyT3BlbigpKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKHNpZGViYXIoKS5vcGVuKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHRvZ2dsZVNpZGViYXJPcGVuKCkpO1xuICAgICAgICAgICAgYXNzZXJ0LmlzVHJ1ZShzaWRlYmFyKCkub3Blbik7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh0b2dnbGVTaWRlYmFyT3BlbigpKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKHNpZGViYXIoKS5vcGVuKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ1NvY2tldCBTdGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IHN0b3JlOiBTdG9yZTxTdGF0ZT47XG4gICAgICAgIGxldCBzb2NrZXQ6ICgoKSA9PiBTdGF0ZVsnc29ja2V0J10pO1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlID0gZ2V0U3RvcmUoKTtcbiAgICAgICAgICAgIHNvY2tldCA9ICgpID0+IHN0b3JlLmdldFN0YXRlKCkuc29ja2V0O1xuICAgICAgICB9KVxuICAgICAgICBpdCgnc2hvdWxkIHNldCB0aGUgc29ja2V0IGdpdmVuIGEgU29ja2V0SU9DbGllbnQgU29ja2V0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKHNvY2tldCgpLCB7XG4gICAgICAgICAgICAgICAgaW86IG51bGwsXG4gICAgICAgICAgICAgICAgY29ubmVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb25uZWN0ZWRVc2VyRW1haWxzOiBbXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsZXQgc29ja2V0aW86IFNvY2tldElPQ2xpZW50LlNvY2tldCA9IHNvY2tldGlvY2xpZW50KCk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChpbml0V2Vic29ja2V0KHNvY2tldGlvKSk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKHNvY2tldCgpLCB7XG4gICAgICAgICAgICAgICAgaW86IHNvY2tldGlvLFxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29ubmVjdGVkVXNlckVtYWlsczogW11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc29ja2V0aW8uY2xvc2UoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgdXBkYXRlIHRoZSBjb25uZWN0ZWQgc3RhdGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldFNvY2tldENvbm5lY3RlZCh0cnVlKSk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKHNvY2tldCgpLCB7XG4gICAgICAgICAgICAgICAgaW86IG51bGwsXG4gICAgICAgICAgICAgICAgY29ubmVjdGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZFVzZXJFbWFpbHM6IFtdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldFNvY2tldENvbm5lY3RlZChmYWxzZSkpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChzb2NrZXQoKSwge1xuICAgICAgICAgICAgICAgIGlvOiBudWxsLFxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29ubmVjdGVkVXNlckVtYWlsczogW11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCB1cGRhdGUgdGhlIGNvbm5lY3RlZCB1c2VycycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGVtYWlsczogc3RyaW5nW10gPSBbJ3Rlc3RAdGVzdC5jb20nLCAndGVzdDJAdGVzdC5jb20nXTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldFNvY2tldENvbm5lY3RlZFVzZXJzKGVtYWlscykpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChzb2NrZXQoKSwge1xuICAgICAgICAgICAgICAgIGlvOiBudWxsLFxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29ubmVjdGVkVXNlckVtYWlsczogZW1haWxzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ0NoYXQgVXNlcnMgU3RhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBzdG9yZTogU3RvcmU8U3RhdGU+O1xuICAgICAgICBsZXQgY2hhdFVzZXJzOiAoKCkgPT4gU3RhdGVbJ2NoYXRVc2VycyddKTtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdG9yZSA9IGdldFN0b3JlKCk7XG4gICAgICAgICAgICBjaGF0VXNlcnMgPSAoKSA9PiBzdG9yZS5nZXRTdGF0ZSgpLmNoYXRVc2VycztcbiAgICAgICAgfSlcbiAgICAgICAgaXQoJ3Nob3VsZCB1cGRhdGUgdXNlcnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCB1c2VyczogQ2hhdFVzZXJzU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgJ3Rlc3RAdGVzdC5jb20nOiB7XG4gICAgICAgICAgICAgICAgICAgIHJvbGU6ICd1c2VyJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ1Rlc3QgTmFtZSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICd0ZXN0MkB0ZXN0LmNvbSc6IHtcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogJ2FkbWluJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0Fub3RoZXIgdGVzdCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICd0ZXN0M0B0ZXN0LmNvbSc6IHtcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogJ2FkbWluJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0xhc3QgdGVzdCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVVc2Vycyh1c2VycykpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChjaGF0VXNlcnMoKSwgdXNlcnMpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBhZGQgYSB1c2VyJyk7XG4gICAgICAgIGl0KCdzaG91bGQgcmVtb3ZlIGEgdXNlcicpO1xuICAgIH0pO1xufSk7XG4iLCJpbXBvcnQge2NyZWF0ZVN0b3JlLCBjb21iaW5lUmVkdWNlcnMsIGFwcGx5TWlkZGxld2FyZSwgUmVkdWNlciwgU3RvcmVFbmhhbmNlcn0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHJlZHV4VGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnO1xuaW1wb3J0IHtjcmVhdGVMb2dnZXJ9IGZyb20gJ3JlZHV4LWxvZ2dlcic7XG5cbmltcG9ydCB1c2VyUmVkdWNlciwge1N0YXRlIGFzIFVzZXJTdGF0ZX0gZnJvbSAnLi9yZWR1Y2Vycy91c2VyJztcbmltcG9ydCBjaGFubmVsc1JlZHVjZXIsIHtTdGF0ZSBhcyBDaGFubmVsc1N0YXRlfSBmcm9tICcuL3JlZHVjZXJzL2NoYW5uZWxzJztcbmltcG9ydCBub3RpZmljYXRpb25zUmVkdWNlciwge1N0YXRlIGFzIE5vdGlmaWNhdGlvbnNTdGF0ZX0gZnJvbSAnLi9yZWR1Y2Vycy9ub3RpZmljYXRpb25zJztcbmltcG9ydCBzaWRlYmFyUmVkdWNlciwge1N0YXRlIGFzIFNpZGViYXJTdGF0ZX0gZnJvbSAnLi9yZWR1Y2Vycy9zaWRlYmFyJztcbmltcG9ydCBzb2NrZXRSZWR1Y2VyLCB7U3RhdGUgYXMgU29ja2V0U3RhdGV9IGZyb20gJy4vcmVkdWNlcnMvc29ja2V0JztcbmltcG9ydCBjaGF0VXNlcnNSZWR1Y2VyLCB7U3RhdGUgYXMgQ2hhdFVzZXJzU3RhdGV9IGZyb20gJy4vcmVkdWNlcnMvY2hhdFVzZXJzJztcblxuY29uc3QgZW52ID0gcmVxdWlyZSgnLi4vLi4vZW52Jyk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGUge1xuICAgIHVzZXI6IFVzZXJTdGF0ZSxcbiAgICBjaGFubmVsczogQ2hhbm5lbHNTdGF0ZSxcbiAgICBub3RpZmljYXRpb25zOiBOb3RpZmljYXRpb25zU3RhdGUsXG4gICAgc2lkZWJhcjogU2lkZWJhclN0YXRlLFxuICAgIHNvY2tldDogU29ja2V0U3RhdGUsXG4gICAgY2hhdFVzZXJzOiBDaGF0VXNlcnNTdGF0ZSxcbn1cblxuZXhwb3J0IGNvbnN0IHJvb3RSZWR1Y2VyOiBSZWR1Y2VyID0gY29tYmluZVJlZHVjZXJzKHtcbiAgICB1c2VyOiB1c2VyUmVkdWNlcixcbiAgICBjaGFubmVsczogY2hhbm5lbHNSZWR1Y2VyLFxuICAgIG5vdGlmaWNhdGlvbnM6IG5vdGlmaWNhdGlvbnNSZWR1Y2VyLFxuICAgIHNpZGViYXI6IHNpZGViYXJSZWR1Y2VyLFxuICAgIHNvY2tldDogc29ja2V0UmVkdWNlcixcbiAgICBjaGF0VXNlcnM6IGNoYXRVc2Vyc1JlZHVjZXIsXG59KTtcblxuZXhwb3J0IGNvbnN0IG1pZGRsZXdhcmU6IFN0b3JlRW5oYW5jZXIgPVxuICAgIGVudi5wcm9kdWN0aW9uIHx8IGVudi5kaXNhYmxlUmVkdXhMb2dnaW5nID9cbiAgICBhcHBseU1pZGRsZXdhcmUocmVkdXhUaHVuaykgOiBhcHBseU1pZGRsZXdhcmUocmVkdXhUaHVuaywgY3JlYXRlTG9nZ2VyKCkpO1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTdG9yZShyb290UmVkdWNlciwgbWlkZGxld2FyZSk7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtbG9nZ2VyXCIpOyIsImltcG9ydCB7U0VUX0FVVEhPUklaRUQsIFNFVF9VU0VSLCBMT0dPVVRfVVNFUiwgU0VUX0pXVH0gZnJvbSAnLi4vYWN0aW9ucy91c2VyQWN0aW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGUge1xuICAgIGF1dGhvcml6ZWQ/OiBib29sZWFuLFxuICAgIGVtYWlsPzogc3RyaW5nIHwgYm9vbGVhbixcbiAgICBuYW1lPzogc3RyaW5nIHwgYm9vbGVhbixcbiAgICByb2xlPzogc3RyaW5nIHwgYm9vbGVhbixcbiAgICBqd3Q/OiBzdHJpbmcgfCBib29sZWFuLFxufVxuXG5pbnRlcmZhY2UgQWN0aW9uIHtcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgZGF0YTogYW55XG59XG5cbmxldCBpbml0aWFsU3RhdGUgOiBTdGF0ZSA9IHtcbiAgICBhdXRob3JpemVkOiBmYWxzZSxcbiAgICBlbWFpbDogZmFsc2UsXG4gICAgbmFtZTogZmFsc2UsXG4gICAgcm9sZTogZmFsc2UsXG4gICAgand0OiBmYWxzZSxcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzdGF0ZTogU3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbjogQWN0aW9uKSB7XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIFNFVF9BVVRIT1JJWkVEOlxuICAgICAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb24uZGF0YSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YSBtdXN0IGJlIGJvb2xlYW4gZm9yIFNFVF9BVVRIT1JJWkVEIGFjdGlvbicpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhY3Rpb24uZGF0YSA9PT0gZmFsc2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7YXV0aG9yaXplZDogZmFsc2UsIGVtYWlsOiBmYWxzZX0pO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7YXV0aG9yaXplZDogYWN0aW9uLmRhdGF9KTtcbiAgICAgICAgY2FzZSBTRVRfVVNFUjpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgYWN0aW9uLmRhdGEpO1xuICAgICAgICBjYXNlIExPR09VVF9VU0VSOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBhdXRob3JpemVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBuYW1lOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlbWFpbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgcm9sZTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgY2FzZSBTRVRfSldUOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7dG9rZW46IGFjdGlvbi5kYXRhfSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufSIsImltcG9ydCB7QUREX0NIQU5ORUxTLFxuICAgICAgICBTRVRfQ0hBTk5FTF9GRVRDSElOR19ORVdfTUVTU0FHRVMsXG4gICAgICAgIFNFVF9DSEFOTkVMX0hBU19NT1JFX01FU1NBR0VTLFxuICAgICAgICBBRERfUkVDRUlWRURfQ0hBTk5FTF9NRVNTQUdFLFxuICAgICAgICBBRERfUkVUUklFVkVEX0NIQU5ORUxfTUVTU0FHRVMsXG4gICAgICAgIElOQ1JFTUVOVF9DSEFOTkVMX1JFVFJJRVZFX01FU1NBR0VTX09GRlNFVCxcbiAgICAgICAgQ0xFQVJfQ0hBTk5FTFNfREFUQX1cbiAgICBmcm9tICcuLi9hY3Rpb25zL2NoYW5uZWxzQWN0aW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVzc2FnZSB7XG4gICAgdXNlckVtYWlsOiBzdHJpbmcsXG4gICAgY3JlYXRlZDogc3RyaW5nLFxuICAgIF9pZDogc3RyaW5nLFxuICAgIHRleHQ6IHN0cmluZ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENoYW5uZWwge1xuICAgIG5hbWU6IHN0cmluZyxcbiAgICBtZXNzYWdlczogTWVzc2FnZVtdLFxuICAgIHJldHJpZXZlTWVzc2FnZXNPZmZzZXQ6IG51bWJlcixcbiAgICBoYXNNb3JlTWVzc2FnZXM6IGJvb2xlYW5cbiAgICBmZXRjaGluZ05ld01lc3NhZ2VzOiBib29sZWFuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGUgZXh0ZW5kcyBBcnJheTxDaGFubmVsPiB7XG5cbn1cblxuaW50ZXJmYWNlIEFjdGlvbiB7XG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGRhdGE6IGFueVxufVxuXG5sZXQgaW5pdGlhbFN0YXRlOiBTdGF0ZSA9IFtdO1xuXG5leHBvcnQgY29uc3QgY2hhbm5lbEV4aXN0cyA9IChjaGFubmVsczogQ2hhbm5lbFtdIHwgU3RhdGUsIGNoYW5uZWxOYW1lOiBzdHJpbmcpOiBhbnkgPT4gIHtcbiAgICBsZXQgY2hhbm5lbCA9IGNoYW5uZWxzLmZpbmQoIChjOiBDaGFubmVsKSA9PiB7XG4gICAgICAgIHJldHVybiBjLm5hbWUgPT09IGNoYW5uZWxOYW1lO1xuICAgIH0pO1xuICAgIGlmICghY2hhbm5lbCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBjaGFubmVsO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGU6IFN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb246IEFjdGlvbikge1xuICAgIHN3aXRjaChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIEFERF9DSEFOTkVMUzpcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb24uZGF0YS5jaGFubmVscztcbiAgICAgICAgY2FzZSBJTkNSRU1FTlRfQ0hBTk5FTF9SRVRSSUVWRV9NRVNTQUdFU19PRkZTRVQ6IHtcbiAgICAgICAgICAgIGxldCBjaGFubmVsOiBDaGFubmVsID0gY2hhbm5lbEV4aXN0cyhzdGF0ZSwgYWN0aW9uLmRhdGEuY2hhbm5lbCk7XG4gICAgICAgICAgICBsZXQgaW5jcmVtZW50OiBudW1iZXIgPSBhY3Rpb24uZGF0YS5pbmNyZW1lbnQ7XG4gICAgICAgICAgICBpZiAoIWNoYW5uZWwpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVW5rbm93biBjaGFubmVsIHdoaWxlIGluY3JlbWVudGluZyBtZXNzYWdlcyBvZmZzZXQnLCBhY3Rpb24pO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBuZXdDaGFubmVsczogQ2hhbm5lbFtdID0gc3RhdGUubWFwKCAoYzogQ2hhbm5lbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGMubmFtZSA9PT0gY2hhbm5lbC5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGMucmV0cmlldmVNZXNzYWdlc09mZnNldCArPSBpbmNyZW1lbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3Q2hhbm5lbHM7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBTRVRfQ0hBTk5FTF9GRVRDSElOR19ORVdfTUVTU0FHRVM6XG4gICAgICAgICAgICBsZXQgY2hhbm5lbDogQ2hhbm5lbCA9IGNoYW5uZWxFeGlzdHMoc3RhdGUsIGFjdGlvbi5kYXRhLmNoYW5uZWxOYW1lKTtcbiAgICAgICAgICAgIGlmICghY2hhbm5lbCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVbmtub3duIGNoYW5uZWwgd2hpbGUgZmV0Y2hpbmcgbmV3IG1lc3NhZ2VzJywgYWN0aW9uKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbmV3Q2hhbm5lbHM6IENoYW5uZWxbXSA9IHN0YXRlLm1hcCggKGM6IENoYW5uZWwpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYy5uYW1lID09PSBhY3Rpb24uZGF0YS5jaGFubmVsTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjLmZldGNoaW5nTmV3TWVzc2FnZXMgPSBhY3Rpb24uZGF0YS5pc0ZldGNoaW5nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG5ld0NoYW5uZWxzO1xuICAgICAgICBjYXNlIFNFVF9DSEFOTkVMX0hBU19NT1JFX01FU1NBR0VTOiB7XG4gICAgICAgICAgICBsZXQgY2hhbm5lbDogQ2hhbm5lbCA9IGNoYW5uZWxFeGlzdHMoc3RhdGUsIGFjdGlvbi5kYXRhLmNoYW5uZWxOYW1lKTtcbiAgICAgICAgICAgIGxldCBoYXNNb3JlOiBib29sZWFuID0gYWN0aW9uLmRhdGEuaGFzTW9yZTtcbiAgICAgICAgICAgIGlmICghY2hhbm5lbCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVbmtub3duIGNoYW5uZWwgd2hpbGUgc2V0dGluZyBoYXNNb3JlIG1lc3NhZ2VzJywgYWN0aW9uKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbmV3Q2hhbm5lbHM6IENoYW5uZWxbXSA9IHN0YXRlLm1hcCggKGM6IENoYW5uZWwpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYy5uYW1lID09PSBhY3Rpb24uZGF0YS5jaGFubmVsTmFtZSlcbiAgICAgICAgICAgICAgICAgICAgYy5oYXNNb3JlTWVzc2FnZXMgPSBoYXNNb3JlO1xuICAgICAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3Q2hhbm5lbHM7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBBRERfUkVUUklFVkVEX0NIQU5ORUxfTUVTU0FHRVM6IHtcbiAgICAgICAgICAgIGxldCByZXRyaWV2ZWRNZXNzYWdlczogTWVzc2FnZVtdID0gYWN0aW9uLmRhdGEubWVzc2FnZXM7XG4gICAgICAgICAgICBsZXQgY2hhbm5lbE5hbWU6IHN0cmluZyA9IGFjdGlvbi5kYXRhLmNoYW5uZWxOYW1lO1xuICAgICAgICAgICAgbGV0IGNoYW5uZWw6IENoYW5uZWwgPSBjaGFubmVsRXhpc3RzKHN0YXRlLCBjaGFubmVsTmFtZSk7XG4gICAgICAgICAgICBpZighY2hhbm5lbCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVbmtub3duIGNoYW5uZWwgd2hpbGUgYWRkaW5nIHJldHJpZXZlZCBjaGFubmVsIG1lc3NhZ2VzJywgYWN0aW9uKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbmV3Q2hhbm5lbHM6IENoYW5uZWxbXSA9IHN0YXRlLm1hcCggKGM6IENoYW5uZWwpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYy5uYW1lID09PSBjaGFubmVsTmFtZSlcbiAgICAgICAgICAgICAgICAgICAgYy5tZXNzYWdlcyA9IHJldHJpZXZlZE1lc3NhZ2VzLmNvbmNhdChjLm1lc3NhZ2VzKTsvL2MubWVzc2FnZXMuY29uY2F0KG1lc3NhZ2VzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG5ld0NoYW5uZWxzO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQUREX1JFQ0VJVkVEX0NIQU5ORUxfTUVTU0FHRToge1xuICAgICAgICAgICAgbGV0IHJlY2VpdmVkTWVzc2FnZSA9IGFjdGlvbi5kYXRhLm1lc3NhZ2U7XG4gICAgICAgICAgICBsZXQgY2hhbm5lbE5hbWUgPSBhY3Rpb24uZGF0YS5jaGFubmVsTmFtZTtcbiAgICAgICAgICAgIGxldCBjaGFubmVsOiBDaGFubmVsID0gY2hhbm5lbEV4aXN0cyhzdGF0ZSwgY2hhbm5lbE5hbWUpO1xuICAgICAgICAgICAgaWYgKCFjaGFubmVsKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Vua25vd24gY2hhbm5lbCB3aGlsZSBhZGRpbmcgcmVjZWl2ZWQgbWVzc2FnZScsIHN0YXRlLCBhY3Rpb24pO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBuZXdDaGFubmVsczogQ2hhbm5lbFtdID0gc3RhdGUubWFwKChjOiBDaGFubmVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoYy5uYW1lID09PSBjaGFubmVsTmFtZSkgXG4gICAgICAgICAgICAgICAgICAgIGMubWVzc2FnZXMgPSBjLm1lc3NhZ2VzLmNvbmNhdChbcmVjZWl2ZWRNZXNzYWdlXSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIG5ld0NoYW5uZWxzO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ0xFQVJfQ0hBTk5FTFNfREFUQTpcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59IiwiaW1wb3J0IHtBRERfRVJST1IsIFJFTU9WRV9FUlJPUiwgQ0xFQVJfRVJST1JTLCBBRERfSU5GTywgUkVNT1ZFX0lORk8sIENMRUFSX0lORk9TfVxuICAgIGZyb20gJy4uL2FjdGlvbnMvbm90aWZpY2F0aW9uc0FjdGlvbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0YXRlIHtcbiAgICBlcnJvcnM6IHN0cmluZ1tdLFxuICAgIGluZm9zOiBzdHJpbmdbXSxcbn1cbmludGVyZmFjZSBBY3Rpb24ge1xuICAgIHR5cGU6IHN0cmluZyxcbiAgICBkYXRhOiBhbnlcbn1cblxubGV0IGluaXRpYWxTdGF0ZTogU3RhdGUgPSB7XG4gICAgZXJyb3JzOiBbXSxcbiAgICBpbmZvczogW11cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc3RhdGU6IFN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb246IEFjdGlvbikge1xuICAgIHN3aXRjaChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIEFERF9FUlJPUjpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge2Vycm9yczogc3RhdGUuZXJyb3JzLmNvbmNhdChbYWN0aW9uLmRhdGFdKX0pO1xuICAgICAgICBjYXNlIFJFTU9WRV9FUlJPUjpcbiAgICAgICAgICAgIGxldCBuZXdFcnJvcnNBcnJheSA9IHN0YXRlLmVycm9ycy5zbGljZSgpO1xuICAgICAgICAgICAgbmV3RXJyb3JzQXJyYXkuc3BsaWNlKGFjdGlvbi5kYXRhLCAxKTtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge2Vycm9yczogbmV3RXJyb3JzQXJyYXl9KTtcbiAgICAgICAgY2FzZSBDTEVBUl9FUlJPUlM6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsICB7ZXJyb3JzOiBbXX0pO1xuICAgICAgICBjYXNlIEFERF9JTkZPOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7aW5mb3M6IHN0YXRlLmluZm9zLmNvbmNhdChbYWN0aW9uLmRhdGFdKX0pO1xuICAgICAgICBjYXNlIFJFTU9WRV9JTkZPOlxuICAgICAgICAgICAgbGV0IG5ld0luZm9zQXJyYXkgPSBzdGF0ZS5pbmZvcy5zbGljZSgpO1xuICAgICAgICAgICAgbmV3SW5mb3NBcnJheS5zcGxpY2UoYWN0aW9uLmRhdGEsIDEpO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGluZm9zOiBuZXdJbmZvc0FycmF5IH0pO1xuICAgICAgICBjYXNlIENMRUFSX0lORk9TOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7aW5mb3M6IFtdfSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufSIsImltcG9ydCB7IEFjdGlvbiB9IGZyb20gXCJyZWR1eFwiO1xuaW1wb3J0IHsgVE9HR0xFX1NJREVCQVJfT1BFTiB9IGZyb20gJy4uL2FjdGlvbnMvc2lkZWJhckFjdGlvbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0YXRlIHtcbiAgICBvcGVuOiBib29sZWFuXG59XG5cbmxldCBpbml0aWFsU3RhdGU6IFN0YXRlID0ge1xuICAgIG9wZW46IHRydWVcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc3RhdGU6IFN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb246IEFjdGlvbikge1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBUT0dHTEVfU0lERUJBUl9PUEVOOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7b3BlbjogIXN0YXRlLm9wZW59KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59IiwiaW1wb3J0IHsgQW55QWN0aW9uIH0gZnJvbSBcInJlZHV4XCI7XG5pbXBvcnQgKiBhcyBpbyBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcblxuaW1wb3J0IHsgSU5JVF9XRUJTT0NLRVQsXG4gICAgICAgICBTRVRfU09DS0VUX0NPTk5FQ1RFRCxcbiAgICAgICAgIFNFVF9TT0NLRVRfQ09OTkVDVEVEX1VTRVJTIH1cbiAgICBmcm9tICcuLi9hY3Rpb25zL3NvY2tldEFjdGlvbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0YXRlIHtcbiAgICBpbzogU29ja2V0SU9DbGllbnQuU29ja2V0IHwgbnVsbCxcbiAgICBjb25uZWN0ZWQ6IGJvb2xlYW4sXG4gICAgY29ubmVjdGVkVXNlckVtYWlsczogc3RyaW5nW11cbn1cblxubGV0IGluaXRpYWxTdGF0ZTogU3RhdGUgPSB7XG4gICAgaW86IG51bGwsXG4gICAgY29ubmVjdGVkOiBmYWxzZSxcbiAgICBjb25uZWN0ZWRVc2VyRW1haWxzOiBbXVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzdGF0ZTogU3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbjogQW55QWN0aW9uKSB7XG4gICAgc3dpdGNoKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgSU5JVF9XRUJTT0NLRVQ6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtpbzogYWN0aW9uLmRhdGEuaW99KTtcbiAgICAgICAgY2FzZSBTRVRfU09DS0VUX0NPTk5FQ1RFRDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge2Nvbm5lY3RlZDogYWN0aW9uLmRhdGEuY29ubmVjdGVkfSk7XG4gICAgICAgIGNhc2UgU0VUX1NPQ0tFVF9DT05ORUNURURfVVNFUlM6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtjb25uZWN0ZWRVc2VyRW1haWxzOiBhY3Rpb24uZGF0YS51c2VyRW1haWxzIH0pXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufSIsImltcG9ydCB7QW55QWN0aW9ufSBmcm9tICdyZWR1eCc7XG5pbXBvcnQge1VQREFURV9DSEFUX1VTRVJTLCBBRERfQ0hBVF9VU0VSLCBSRU1PVkVfQ0hBVF9VU0VSfVxuICAgIGZyb20gJy4uL2FjdGlvbnMvY2hhdFVzZXJzQWN0aW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGUge1xuICAgIFtlbWFpbDogc3RyaW5nXToge1xuICAgICAgICByb2xlOiBzdHJpbmcsXG4gICAgICAgIG5hbWU6IHN0cmluZyxcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2hhdFVzZXIge1xuICAgIGVtYWlsOiBzdHJpbmcsXG4gICAgcm9sZTogc3RyaW5nLFxuICAgIG5hbWU6IHN0cmluZyxcbn1cblxubGV0IGluaXRpYWxTdGF0ZTogU3RhdGUgPSB7XG4gICAgXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHN0YXRlOiBTdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uOiBBbnlBY3Rpb24pIHtcbiAgICBzd2l0Y2goYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBVUERBVEVfQ0hBVF9VU0VSUzpcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb24uZGF0YS51c2VycztcbiAgICAgICAgY2FzZSBBRERfQ0hBVF9VU0VSOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgW2FjdGlvbi5kYXRhLnVzZXIuZW1haWxdOiB7XG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IGFjdGlvbi5kYXRhLnVzZXIucm9sZSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogYWN0aW9uLmRhdGEudXNlci5uYW1lLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIFJFTU9WRV9DSEFUX1VTRVI6XG4gICAgICAgICAgICBsZXQgY2xvbmU6IFN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpO1xuICAgICAgICAgICAgZGVsZXRlIGNsb25lW2FjdGlvbi5kYXRhLmVtYWlsXVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn0iLCJpbXBvcnQgJ21vY2hhJztcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCBNb2NrQWRhcHRlciBmcm9tICdheGlvcy1tb2NrLWFkYXB0ZXInO1xuaW1wb3J0IGNvbmZpZ3VyZVN0b3JlLCB7IE1vY2tTdG9yZUNyZWF0b3IsIE1vY2tTdG9yZUVuaGFuY2VkIH0gZnJvbSAncmVkdXgtbW9jay1zdG9yZSdcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuaydcbmltcG9ydCB7IHVwZGF0ZU5hbWUsIHVwZGF0ZUVtYWlsLCB1cGRhdGVQYXNzd29yZCB9IGZyb20gJy4uLy4uL3NyYy93ZWIvYWN0aW9ucy91c2VyQWN0aW9ucyc7XG5pbXBvcnQgeyBBbnlBY3Rpb24gfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBBRERfSU5GTywgQUREX0VSUk9SLCBhZGRFcnJvciwgYWRkSW5mbyB9IGZyb20gJy4uLy4uL3NyYy93ZWIvYWN0aW9ucy9ub3RpZmljYXRpb25zQWN0aW9ucyc7XG5pbXBvcnQgeyBDaGFubmVsLCBNZXNzYWdlIH0gZnJvbSAnLi4vLi4vc3JjL3dlYi9yZWR1Y2Vycy9jaGFubmVscyc7XG5pbXBvcnQgeyBpbml0IGFzIGluaXRXZWJzb2NrZXRDb25uZWN0aW9uLCBJTklUX1dFQlNPQ0tFVCB9IGZyb20gJy4uLy4uL3NyYy93ZWIvYWN0aW9ucy9zb2NrZXRBY3Rpb25zJztcbmltcG9ydCB7IGZldGNoQ2hhbm5lbHMsIEFERF9DSEFOTkVMUywgYWRkQ2hhbm5lbHMsIHJldHJpZXZlQ2hhbm5lbE1lc3NhZ2VzLCBzZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcywgc2V0Q2hhbm5lbEhhc01vcmVNZXNzYWdlcywgaW5jcmVtZW50Q2hhbm5lbFJldHJpZXZlTWVzc2FnZXNPZmZzZXQsIGFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcywgZGVsZXRlQ2hhbm5lbCwgYWRkQ2hhbm5lbCB9IGZyb20gJy4uLy4uL3NyYy93ZWIvYWN0aW9ucy9jaGFubmVsc0FjdGlvbnMnO1xuaW1wb3J0IHsgZmV0Y2hBbGxVc2VycywgdXBkYXRlVXNlcnMgfSBmcm9tICcuLi8uLi9zcmMvd2ViL2FjdGlvbnMvY2hhdFVzZXJzQWN0aW9ucyc7XG5pbXBvcnQgeyBTdGF0ZSBhcyBDaGF0VXNlcnNTdGF0ZSB9IGZyb20gJy4uLy4uL3NyYy93ZWIvcmVkdWNlcnMvY2hhdFVzZXJzJztcbmltcG9ydCB7IFN0YXRlIH0gZnJvbSAnLi4vLi4vc3JjL3dlYi9zdG9yZSc7XG5cbmNvbnN0IG1vY2tTdG9yZUNyZWF0b3I6IE1vY2tTdG9yZUNyZWF0b3IgPSBjb25maWd1cmVTdG9yZShbdGh1bmtdKTtcblxuZnVuY3Rpb24gZ2V0U3RvcmUoc3RvcmUgPSB7fSk6IE1vY2tTdG9yZUVuaGFuY2VkPHt9IHwgU3RhdGU+IHtcbiAgICByZXR1cm4gbW9ja1N0b3JlQ3JlYXRvcihzdG9yZSk7XG59XG5cbmRlc2NyaWJlKCdBc3luYyBBY3Rpb25zJywgZnVuY3Rpb24oKSB7XG4gICAgbGV0IG1vY2tTdG9yZTogTW9ja1N0b3JlRW5oYW5jZWQ8e30sIGFueT47XG4gICAgbGV0IG1vY2tBeGlvczogTW9ja0FkYXB0ZXI7XG5cbiAgICBiZWZvcmUoZnVuY3Rpb24oKSB7XG4gICAgICAgIG1vY2tBeGlvcyA9IG5ldyBNb2NrQWRhcHRlcihheGlvcyk7XG4gICAgfSk7XG5cbiAgICBhZnRlcihmdW5jdGlvbigpIHtcbiAgICAgICAgbW9ja0F4aW9zLnJlc3RvcmUoKTtcbiAgICB9KTtcbiAgICBcbiAgICBkZXNjcmliZSgnVXNlciBhc3luYyBhY3Rpb25zJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbW9ja1N0b3JlID0gZ2V0U3RvcmUoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zLm9uQW55KCkucmVwbHkoMjAwLCB7fSlcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgaGFuZGxlIGNhbGxiYWNrIGFuZCBzZXQgaW5mbyAnICtcbiAgICAgICAgICAgJ29uIHN1Y2Nlc3NmdWwgcG9zdCByZXF1ZXN0IHRvIC9hcGkvdjEvdXNlci91cGRhdGUvbmFtZScsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgICAgICBsZXQgbmFtZSA6IGZhbHNlIHwgc3RyaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgICAgIC5kaXNwYXRjaCh1cGRhdGVOYW1lKCdBZHJpYW4nLCAoKSA9PiBuYW1lID0gJ0FkcmlhbicpKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwobmFtZSwgJ0FkcmlhbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uczogQW55QWN0aW9uW10gPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEFERF9JTkZPLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICdOYW1lIHVwZGF0ZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBzZXQgYW4gZXJyb3Igb24gZmFpbGVkIHBvc3QgcmVxdWVzdCB0byAvYXBpL3YxL3VzZXIvdXBkYXRlL25hbWUnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICBsZXQgbmFtZSA6IGZhbHNlIHwgc3RyaW5nID0gZmFsc2U7XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5vblBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvbmFtZScpLnJlcGx5KDUwMCwge2Vycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnfSk7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2godXBkYXRlTmFtZSgnQWRyaWFuJywgKCkgPT4gbmFtZSA9ICdBZHJpYW4nKSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChuYW1lLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnM6IEFueUFjdGlvbltdID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogQUREX0VSUk9SLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJ1NvbWV0aGluZyB3ZW50IHdyb25nJ1xuICAgICAgICAgICAgICAgICAgICB9XSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgaGFuZGxlIGNhbGxiYWNrIGFuZCBzZXQgaW5mbyAnICtcbiAgICAgICAgICAgJ29uIHN1Y2Nlc3NmdWwgcG9zdCByZXF1ZXN0IHRvIC9hcGkvdjEvdXNlci91cGRhdGUvZW1haWwnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICBsZXQgZW1haWw6IGZhbHNlIHwgc3RyaW5nID0gZmFsc2U7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2godXBkYXRlRW1haWwoJ3Rlc3RAdGVzdC5jb20nLCAoKSA9PiBlbWFpbCA9ICd0ZXN0QHRlc3QuY29tJykpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZW1haWwsICd0ZXN0QHRlc3QuY29tJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnM6IEFueUFjdGlvbltdID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogQUREX0lORk8sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAnRW1haWwgdXBkYXRlZCdcbiAgICAgICAgICAgICAgICAgICAgfV0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHNldCBhbiBlcnJvciBvbiBmYWlsZWQgcG9zdCByZXF1ZXN0IHRvIC9hcGkvdjEvdXNlci91cGRhdGUvZW1haWwnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICBsZXQgZW1haWw6IGZhbHNlIHwgc3RyaW5nID0gZmFsc2U7XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5vblBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvZW1haWwnKS5yZXBseSg1MDAsIHsgZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZycgfSk7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2godXBkYXRlRW1haWwoJ3Rlc3RAdGVzdC5jb20nLCAoKSA9PiBlbWFpbCA9ICd0ZXN0QHRlc3QuY29tJykpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuaXNGYWxzZShlbWFpbCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnM6IEFueUFjdGlvbltdID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogQUREX0VSUk9SLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJ1NvbWV0aGluZyB3ZW50IHdyb25nJ1xuICAgICAgICAgICAgICAgICAgICB9XSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChkb25lKTtcbiAgICAgICAgfSlcbiAgICAgICAgaXQoJ3Nob3VsZCBzZXQgaW5mbyBvbiBzdWNjZXNzZnVsIHBvc3QgcmVxdWVzdCB0byAvYXBpL3YxL3VzZXIvdXBkYXRlL3Bhc3N3b3JkJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgbGV0IHVwZGF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgIG1vY2tTdG9yZS5kaXNwYXRjaCh1cGRhdGVQYXNzd29yZCgnYScsICdiJywgKCkgPT4gdXBkYXRlZCA9IHRydWUpKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmlzVHJ1ZSh1cGRhdGVkKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uczogQW55QWN0aW9uW10gPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBBRERfSU5GTyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICdQYXNzd29yZCB1cGRhdGVkJ1xuICAgICAgICAgICAgICAgICAgICB9XSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgc2V0IGFuIGVycm9yIG9uIGZhaWxlZCBwb3N0IHJlcXVlc3QgdG8gL2FwaS92MS91c2VyL3VwZGF0ZS9wYXNzd29yZCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIGxldCB1cGRhdGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5vblBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvcGFzc3dvcmQnKS5yZXBseSg1MDAsIHsgZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZycgfSk7XG4gICAgICAgICAgICBtb2NrU3RvcmUuZGlzcGF0Y2godXBkYXRlUGFzc3dvcmQoJ2EnLCAnYicsICgpID0+IHVwZGF0ZWQgPSB0cnVlKSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKHVwZGF0ZWQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25zOiBBbnlBY3Rpb25bXSA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEFERF9FUlJPUixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICdTb21ldGhpbmcgd2VudCB3cm9uZydcbiAgICAgICAgICAgICAgICAgICAgfV0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZG9uZSk7XG4gICAgICAgIH0pXG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ0NoYW5uZWxzIGFzeW5jIGFjdGlvbnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gUmV0cmlldmUgY2hhbm5lbCBtZXNzYWdlcyBhY3Rpb24gY2hlY2tzIHN0b3JlIHRvIHZlcmlmeSB0aGF0IGNoYW5uZWxcbiAgICAgICAgICAgIC8vIHdpdGggZ2l2ZW4gbmFtZSBhbHJlYWR5IGV4aXN0c1xuICAgICAgICAgICAgbW9ja1N0b3JlID0gbW9ja1N0b3JlQ3JlYXRvcih7XG4gICAgICAgICAgICAgICAgY2hhbm5lbHM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBuYW1lOiAnZ2VuZXJhbCcsIGZldGNoaW5nTmV3TWVzc2FnZXM6IGZhbHNlLCBoYXNNb3JlTWVzc2FnZXM6IHRydWUsIHJldHJpZXZlTWVzc2FnZXNPZmZzZXQ6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBuYW1lOiAnZmV0Y2hpbmcgbmV3IG1lc3NhZ2VzJywgZmV0Y2hpbmdOZXdNZXNzYWdlczogdHJ1ZSwgaGFzTW9yZU1lc3NhZ2VzOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbmFtZTogJ25vIG1vcmUgbWVzc2FnZXMnLCBmZXRjaGluZ05ld01lc3NhZ2VzOiBmYWxzZSwgaGFzTW9yZU1lc3NhZ2VzOiBmYWxzZSB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5vbkFueSgpLnJlcGx5KDIwMCwge30pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmZXRjaCBjaGFubmVscyBhbmQgZGlzcGF0Y2ggYWRkQ2hhbm5lbHMgd2l0aCBhbiBhcnJheSBvZiBjaGFubmVsIG5hbWVzJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgbGV0IGNoYW5uZWxzOiB7X2lkOiBzdHJpbmcsIG5hbWU6IHN0cmluZ31bXSA9IFtcbiAgICAgICAgICAgICAgICB7X2lkOiAnMScsIG5hbWU6ICdnZW5lcmFsJ30sXG4gICAgICAgICAgICAgICAge19pZDogJzInLCBuYW1lOiAncmFuZG9tJ30sXG4gICAgICAgICAgICAgICAge19pZDogJzMnLCBuYW1lOiAnc29tZXRoaW5nIGVsc2UnfV07XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvc1xuICAgICAgICAgICAgICAgIC5vbkdldCgnL2FwaS92MS9jaGFubmVscycpXG4gICAgICAgICAgICAgICAgLnJlcGx5KDIwMCwge2NoYW5uZWxzOiBjaGFubmVsc30pO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKGZldGNoQ2hhbm5lbHMoKSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnM6IEFueUFjdGlvbltdID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWRkQ2hhbm5lbHNBY3Rpb24gPSBhZGRDaGFubmVscyhbJ2dlbmVyYWwnLCAncmFuZG9tJywgJ3NvbWV0aGluZyBlbHNlJ10pO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFthZGRDaGFubmVsc0FjdGlvbl0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZG9uZSlcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZGlzcGF0Y2ggYWRkRXJyb3Igb24gZmFpbGVkIHJlcXVlc3QgdG8gL2FwaS92MS9jaGFubmVscycsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zXG4gICAgICAgICAgICAgICAgLm9uR2V0KCcvYXBpL3YxL2NoYW5uZWxzJylcbiAgICAgICAgICAgICAgICAucmVwbHkoNTAwKTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChmZXRjaENoYW5uZWxzKCkpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25zOiBBbnlBY3Rpb25bXSA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yQWN0aW9uID0gYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBmZXRjaCB0aGUgY2hhbm5lbHMnKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbZXJyb3JBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGRvbmUpXG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGRpc3BhdGNoIGFuIGVycm9yIGlmIHJldHJpZXZpbmcgbWVzc2FnZXMgd2l0aCBpbnZhbGlkIGNoYW5uZWwgbmFtZScsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChyZXRyaWV2ZUNoYW5uZWxNZXNzYWdlcygnaW52YWxpZCBuYW1lJykpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChtc2c6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG1zZywgJ1JldHJpZXZlIENoYW5uZWwgTWVzc2FnZXMgZGlzcGF0Y2hlZCB3aXRoIGluY29ycmVjdCBjaGFubmVsIG5hbWUgb3Igd2hpbGUgYWxyZWFkeSBmZXRjaGluZyBtZXNzYWdlcycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uczogQW55QWN0aW9uW10gPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXJyb3JBY3Rpb24gPSBhZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIGZldGNoIG1lc3NhZ2VzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFtlcnJvckFjdGlvbl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZGlzcGF0Y2ggYW4gZXJyb3IgaWYgYWxyZWFkeSByZXRyaWV2aW5nIGNoYW5uZWwgbWVzc2FnZXMnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2gocmV0cmlldmVDaGFubmVsTWVzc2FnZXMoJ2ZldGNoaW5nIG5ldyBtZXNzYWdlcycpKVxuICAgICAgICAgICAgICAgIC50aGVuKChtc2c6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwobXNnLCAnUmV0cmlldmUgQ2hhbm5lbCBNZXNzYWdlcyBkaXNwYXRjaGVkIHdpdGggaW5jb3JyZWN0IGNoYW5uZWwgbmFtZSBvciB3aGlsZSBhbHJlYWR5IGZldGNoaW5nIG1lc3NhZ2VzJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnM6IEFueUFjdGlvbltdID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXJyb3JBY3Rpb24gPSBhZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIGZldGNoIG1lc3NhZ2VzJyk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW2Vycm9yQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZGlzcGF0Y2ggYW4gZXJyb3IgaWYgY2hhbm5lbCBkb2VzIG5vdCBoYXZlIG9sZGVyIG1lc3NhZ2VzJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKHJldHJpZXZlQ2hhbm5lbE1lc3NhZ2VzKCdubyBtb3JlIG1lc3NhZ2VzJykpXG4gICAgICAgICAgICAgICAgLnRoZW4oKG1zZzogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChtc2csICdSZXRyaWV2ZSBDaGFubmVsIE1lc3NhZ2VzIGRpc3BhdGNoZWQgd2l0aCBpbmNvcnJlY3QgY2hhbm5lbCBuYW1lIG9yIHdoaWxlIGFscmVhZHkgZmV0Y2hpbmcgbWVzc2FnZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uczogQW55QWN0aW9uW10gPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnJvckFjdGlvbiA9IGFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gZmV0Y2ggbWVzc2FnZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbZXJyb3JBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCBhbiBlcnJvciBvbiBmYWlsZWQgZ2V0IHJlcXVlc3QgdG8gL2FwaS92MS9tZXNzYWdlcy8nLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvc1xuICAgICAgICAgICAgICAgIC5vbkdldCgpXG4gICAgICAgICAgICAgICAgLnJlcGx5KDUwMCk7XG4gICAgICAgICAgICBsZXQgY2hhbm5lbDogc3RyaW5nID0gJ2dlbmVyYWwnO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKHJldHJpZXZlQ2hhbm5lbE1lc3NhZ2VzKGNoYW5uZWwpKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uczogQW55QWN0aW9uW10gPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZXRGZXRjaGluZ1RydWVBY3Rpb24gPSBzZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcyhjaGFubmVsLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXJyb3JBY3Rpb24gPSBhZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIGZldGNoIG1lc3NhZ2VzJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNldEZldGNoaW5nRmFsc2VBY3Rpb24gPSBzZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcyhjaGFubmVsLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW3NldEZldGNoaW5nVHJ1ZUFjdGlvbiwgZXJyb3JBY3Rpb24sIHNldEZldGNoaW5nRmFsc2VBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBzZXQgY2hhbm5lbEhhc01vcmVNZXNzYWdlcyBvbiByZXNwb25zZSB3aXRoIGVtcHR5IGFycmF5JywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3NcbiAgICAgICAgICAgICAgICAub25HZXQoKVxuICAgICAgICAgICAgICAgIC5yZXBseSgyMDAsIHsgbWVzc2FnZXM6IFtdfSk7XG4gICAgICAgICAgICBsZXQgY2hhbm5lbDogc3RyaW5nID0gJ2dlbmVyYWwnO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKHJldHJpZXZlQ2hhbm5lbE1lc3NhZ2VzKGNoYW5uZWwpKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uczogQW55QWN0aW9uW10gPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZXRGZXRjaGluZ1RydWVBY3Rpb24gPSBzZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcyhjaGFubmVsLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2V0SGFzTW9yZUFjdGlvbiA9IHNldENoYW5uZWxIYXNNb3JlTWVzc2FnZXMoY2hhbm5lbCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZXRGZXRjaGluZ0ZhbHNlQWN0aW9uID0gc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMoY2hhbm5lbCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFtzZXRGZXRjaGluZ1RydWVBY3Rpb24sIHNldEhhc01vcmVBY3Rpb24sIHNldEZldGNoaW5nRmFsc2VBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBpbmNyZW1lbnQgb2Zmc2V0IChiYXNlZCBvbiBudW1iZXIgb2YgcmVjZWl2ZWQgbWVzc2FnZXMpIGFuZCBhZGQgcmV0cmlldmVkIGNoYW5uZWwgbWVzc2FnZXMgb24gc3VjY2Vzc2Z1bCByZXRyZWl2ZUNoYW5uZWxNZXNzYWdlcyBhY3Rpb24nLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICBsZXQgY2hhbm5lbDogc3RyaW5nID0gJ2dlbmVyYWwnO1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2VzOiBNZXNzYWdlW10gPSBbe1xuICAgICAgICAgICAgICAgIHRleHQ6ICcxMjMnLFxuICAgICAgICAgICAgICAgIGNyZWF0ZWQ6IERhdGUubm93KCkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICB1c2VyRW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICBfaWQ6ICcxJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRleHQ6ICc0NTYnLFxuICAgICAgICAgICAgICAgIGNyZWF0ZWQ6IERhdGUubm93KCkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICB1c2VyRW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICBfaWQ6ICcyJ1xuICAgICAgICAgICAgfV07XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvc1xuICAgICAgICAgICAgICAgIC5vbkdldCgpXG4gICAgICAgICAgICAgICAgLnJlcGx5KDIwMCwgeyBtZXNzYWdlczogbWVzc2FnZXN9KTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChyZXRyaWV2ZUNoYW5uZWxNZXNzYWdlcyhjaGFubmVsKSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnM6IEFueUFjdGlvbltdID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2V0RmV0Y2hpbmdUcnVlQWN0aW9uID0gc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMoY2hhbm5lbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluY3JlbWVudE9mZnNldEFjdGlvbiA9IGluY3JlbWVudENoYW5uZWxSZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0KGNoYW5uZWwsIG1lc3NhZ2VzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFkZE1lc3NhZ2VzQWN0aW9uID0gYWRkUmV0cmlldmVkQ2hhbm5lbE1lc3NhZ2VzKGNoYW5uZWwsIG1lc3NhZ2VzKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2V0RmV0Y2hpbmdGYWxzZUFjdGlvbiA9IHNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzKGNoYW5uZWwsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRGZXRjaGluZ1RydWVBY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNyZW1lbnRPZmZzZXRBY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRNZXNzYWdlc0FjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEZldGNoaW5nRmFsc2VBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCBpbmZvIG9uIHN1Y2Nlc3NmdWxseSBkZWxldGluZyBjaGFubmVsJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgbGV0IGNoYW5uZWxzOiB7IF9pZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcgfVtdID0gW1xuICAgICAgICAgICAgICAgIHsgX2lkOiAnMScsIG5hbWU6ICdnZW5lcmFsJyB9LFxuICAgICAgICAgICAgICAgIHsgX2lkOiAnMicsIG5hbWU6ICdyYW5kb20nIH0sXG4gICAgICAgICAgICAgICAgeyBfaWQ6ICczJywgbmFtZTogJ3NvbWV0aGluZyBlbHNlJyB9XTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zXG4gICAgICAgICAgICAgICAgLm9uR2V0KCcvYXBpL3YxL2NoYW5uZWxzJylcbiAgICAgICAgICAgICAgICAucmVwbHkoMjAwLCB7IGNoYW5uZWxzOiBjaGFubmVscyB9KTtcbiAgICAgICAgICAgIG1vY2tBeGlvc1xuICAgICAgICAgICAgICAgIC5vbkdldCgpXG4gICAgICAgICAgICAgICAgLnJlcGx5KDIwMCk7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2goZGVsZXRlQ2hhbm5lbCgnZ2VuZXJhbCcpKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uczogQW55QWN0aW9uW10gPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhZGRJbmZvQWN0aW9uID0gYWRkSW5mbygnQ2hhbm5lbCBkZWxldGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFkZENoYW5uZWxzQWN0aW9uID0gYWRkQ2hhbm5lbHMoWydnZW5lcmFsJywgJ3JhbmRvbScsICdzb21ldGhpbmcgZWxzZSddKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbYWRkSW5mb0FjdGlvbiwgYWRkQ2hhbm5lbHNBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCBhbiBlcnJvciBvbiBmYWlsZWQgYXR0ZW1wdCB0byBkZWxldGUgY2hhbm5lbCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zXG4gICAgICAgICAgICAgICAgLm9uR2V0KClcbiAgICAgICAgICAgICAgICAucmVwbHkoNTAwLCB7ZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZyd9KTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChkZWxldGVDaGFubmVsKCdnZW5lcmFsJykpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25zOiBBbnlBY3Rpb25bXSA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFkZEVycm9yQWN0aW9uID0gYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nJyk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW2FkZEVycm9yQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChkb25lKTtcbiAgICAgICAgfSlcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCBpbmZvIG9uIGNyZWF0aW5nIG5ldyBjaGFubmVsJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgbGV0IGNoYW5uZWxzOiB7IF9pZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcgfVtdID0gW1xuICAgICAgICAgICAgICAgIHsgX2lkOiAnMScsIG5hbWU6ICdnZW5lcmFsJyB9LFxuICAgICAgICAgICAgICAgIHsgX2lkOiAnMicsIG5hbWU6ICdyYW5kb20nIH0sXG4gICAgICAgICAgICAgICAgeyBfaWQ6ICczJywgbmFtZTogJ3NvbWV0aGluZyBlbHNlJyB9XTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zXG4gICAgICAgICAgICAgICAgLm9uR2V0KCcvYXBpL3YxL2NoYW5uZWxzJylcbiAgICAgICAgICAgICAgICAucmVwbHkoMjAwLCB7IGNoYW5uZWxzOiBjaGFubmVscyB9KTtcbiAgICAgICAgICAgIG1vY2tBeGlvc1xuICAgICAgICAgICAgICAgIC5vblBvc3QoKVxuICAgICAgICAgICAgICAgIC5yZXBseSgyMDApO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKGFkZENoYW5uZWwoJ25ldyBjaGFubmVsJykpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25zOiBBbnlBY3Rpb25bXSA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFkZEluZm9BY3Rpb24gPSBhZGRJbmZvKCdDaGFubmVsIGNyZWF0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWRkQ2hhbm5lbHNBY3Rpb24gPSBhZGRDaGFubmVscyhbJ2dlbmVyYWwnLCAncmFuZG9tJywgJ3NvbWV0aGluZyBlbHNlJ10pO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFthZGRJbmZvQWN0aW9uLCBhZGRDaGFubmVsc0FjdGlvbl0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGRpc3BhdGNoIGFuIGVycm9yIG9uIGZhaWxlZCBhdHRlbXB0IHRvIGNyZWF0ZSBhIG5ldyBjaGFubmVsJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3NcbiAgICAgICAgICAgICAgICAub25BbnkoKVxuICAgICAgICAgICAgICAgIC5yZXBseSg1MDAsIHtlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nJ30pO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKGFkZENoYW5uZWwoJ25ldyBjaGFubmVsJykpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25zOiBBbnlBY3Rpb25bXSA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFkZEVycm9yQWN0aW9uID0gYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nJyk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW2FkZEVycm9yQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChkb25lKTtcbiAgICAgICAgfSlcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnU29ja2V0IGFzeW5jIGFjdGlvbnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbW9ja1N0b3JlID0gZ2V0U3RvcmUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgaW5pdGlhbGl6ZSB3ZWJzb2NrZXQgY29ubmVjdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbW9ja1N0b3JlLmRpc3BhdGNoKGluaXRXZWJzb2NrZXRDb25uZWN0aW9uKCkpO1xuICAgICAgICAgICAgY29uc3QgYWN0aW9uczogQW55QWN0aW9uW10gPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGFjdGlvbnNbMF0udHlwZSwgSU5JVF9XRUJTT0NLRVQpO1xuICAgICAgICAgICAgLy8gbmVlZCB0byBjbG9zZSBjb25uZWN0aW9uIHNvIHByb2dyYW0gd2lsbCBleGl0IGFmdGVyIHRlc3RzIHJ1blxuICAgICAgICAgICAgYWN0aW9uc1swXS5kYXRhLmlvLmNsb3NlKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdDaGF0IFVzZXJzIGFzeW5jIGFjdGlvbnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbW9ja1N0b3JlID0gZ2V0U3RvcmUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZGlwYXRjaCB1cGRhdGVVc2VycyBvbiBmZXRjaCBhbGwgdXNlcnMnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICBsZXQgdXNlcnNSZXNwb25zZSA9IFt7XG4gICAgICAgICAgICAgICAgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICByb2xlOiAnYWRtaW4nLFxuICAgICAgICAgICAgICAgIG5hbWU6ICd0ZXN0J1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGVtYWlsOiAndGVzdDJAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgIHJvbGU6ICdnZW5lcmFsJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAndGVzdCdcbiAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgbGV0IHVzZXJzOiBDaGF0VXNlcnNTdGF0ZSA9IHt9O1xuICAgICAgICAgICAgdXNlcnNSZXNwb25zZS5mb3JFYWNoKCh1KSA9PiB7XG4gICAgICAgICAgICAgICAgdXNlcnNbdS5lbWFpbF0gPSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHUubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogdS5yb2xlXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5vbkFueSgpLnJlcGx5KDIwMCwgeyB1c2VyczogdXNlcnNSZXNwb25zZX0pO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKGZldGNoQWxsVXNlcnMoKSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnM6IEFueUFjdGlvbltdID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBkYXRlVXNlcnNBY3Rpb24gPSB1cGRhdGVVc2Vycyh1c2Vycyk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW3VwZGF0ZVVzZXJzQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZGlzcGF0Y2ggYWRkRXJyb3Igb24gZmFpbGVkIGF0dGVtcHQgdG8gZmV0Y2ggdXNlcnMnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5vbkFueSgpLnJlcGx5KDUwMCk7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2goZmV0Y2hBbGxVc2VycygpKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uczogQW55QWN0aW9uW10gPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhZGRFcnJvckFjdGlvbiA9IGFkZEVycm9yKCdGZXRjaGluZyBhbGwgdXNlcnMgZmFpbGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW2FkZEVycm9yQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChkb25lKTtcbiAgICAgICAgfSlcbiAgICAgICAgaXQoJ3Nob3VsZCBjcmVhdGUgYSBuZXcgdXNlcicpO1xuICAgICAgICBpdCgnc2hvdWxkIGVkaXQgdGhlIHVzZXInKTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkZWxldGUgdGhlIHVzZXInKTtcbiAgICB9KTtcbn0pIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3MtbW9jay1hZGFwdGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LW1vY2stc3RvcmVcIik7IiwiaW1wb3J0ICogYXMgcmVxdWVzdCBmcm9tICdzdXBlcnRlc3QnO1xuaW1wb3J0IHsgaGFzaFN5bmMgfSBmcm9tICdiY3J5cHRqcyc7XG5pbXBvcnQgeyBhcHAsIGRyb3BBbGxDb2xsZWN0aW9ucyB9IGZyb20gJy4uLyc7XG5pbXBvcnQgVXNlciwgeyBJVXNlciB9IGZyb20gJy4uLy4uL3NyYy9zZXJ2ZXIvbW9kZWxzL1VzZXInO1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmNvbnN0IHNlc3Npb24gPSByZXF1aXJlKCdzdXBlcnRlc3Qtc2Vzc2lvbicpO1xuXG5kZXNjcmliZSgnQXV0aCBDb250cm9sbGVyJywgZnVuY3Rpb24oKSB7XG4gICAgZGVzY3JpYmUoJ2xvZ2luJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIGRyb3BBbGxDb2xsZWN0aW9ucygpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB1c2VyOiBJVXNlciA9IG5ldyBVc2VyKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0FkcmlhbicsXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBoYXNoU3luYygndGVzdCcpLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiAndXNlcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdXNlci5zYXZlKCkudGhlbigodXNlcjogSVVzZXIpID0+IGRvbmUoKSkuY2F0Y2goKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBsb2dpbiB0aGUgdXNlcicsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL2xvZ2luJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAndGVzdCdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgbG9nZ2VkLWluIHVzZXIgZGV0YWlscycsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL2xvZ2luJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAndGVzdCdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycjogYW55LCByZXM6IHJlcXVlc3QuUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBqc29uOiBhbnkgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGpzb24uZW1haWwsICd0ZXN0QHRlc3QuY29tJyk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChqc29uLnJvbGUsICd1c2VyJyk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChqc29uLm5hbWUsICdBZHJpYW4nKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYW4gZXJyb3IgaWYgdGhlIGVtYWlsIGRvZXMgbm90IGV4aXN0JywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChhcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6ICd0ZXN0LmRvZXMubm90LmV4aXRAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogJ3Rlc3QnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMSlcbiAgICAgICAgICAgICAgICAuZW5kKChlcnI6IGFueSwgcmVzOiByZXF1ZXN0LlJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICBsZXQganNvbjogYW55ID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChqc29uLmVycm9yLCAnSW52YWxpZCBlbWFpbCBvciBwYXNzd29yZCcpO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBhbiBlcnJvciBpZiB0aGUgcGFzc3dvcmQgZG9lcyBub3QgbWF0Y2ggdGhlIGhhc2gnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS9sb2dpbicpXG4gICAgICAgICAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgICAgICAgICBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogJ3Rlc3QtaW52YWxpZC1wYXNzd29yZCdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAxKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycjogYW55LCByZXM6IHJlcXVlc3QuUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBqc29uOiBhbnkgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGpzb24uZXJyb3IsICdJbnZhbGlkIGVtYWlsIG9yIHBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGFuIGVycm9yIGlmIHRoZSBlbWFpbCBvciBwYXNzd29yZCBpcyBtaXNzaW5nJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChhcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICd0ZXN0J1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDApXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyOiBhbnksIHJlczogcmVxdWVzdC5SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGpzb246IGFueSA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoanNvbi5lcnJvciwgJ1BsZWFzZSBzdXBwbHkgYW4gZW1haWwgYW5kIHBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QoYXBwKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNlbmQoe2VtYWlsOiAndGVzdEB0ZXN0LmNvbSd9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmV4cGVjdCg0MDApXG4gICAgICAgICAgICAgICAgICAgICAgICAuZW5kKChlcnI6IGFueSwgcmVzOiByZXF1ZXN0LlJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQganNvbjogYW55ID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGpzb24uZXJyb3IsICdQbGVhc2Ugc3VwcGx5IGFuIGVtYWlsIGFuZCBwYXNzd29yZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBhbiBlcnJvciBpZiB0aGUgZW1haWwgaXMgbm90IHZhbGlkJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChhcHApLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgIC5zZW5kKHtlbWFpbDogJ25vdCBhbiBlbWFpbEBhc2RmJywgcGFzc3dvcmQ6ICcxMjM0J30pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDApXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyOiBhbnksIHJlczogcmVxdWVzdC5SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGpzb246IGFueSA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoanNvbi5lcnJvciwgJ05vdCBhIHZhbGlkIGVtYWlsIGFkZHJlc3MnKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdyZWdpc3RlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICBkcm9wQWxsQ29sbGVjdGlvbnMoKS50aGVuKCgpID0+IGRvbmUoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJlZ2lzdGVyIGEgdXNlcicsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoYXBwKS5wb3N0KCcvYXBpL3YxL3JlZ2lzdGVyJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7ZW1haWw6ICd0ZXN0QHRlc3QuY29tJywgcGFzc3dvcmQ6ICd0ZXN0J30pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgyMDApXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyOiBhbnksIHJlczogcmVxdWVzdC5SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZihlcnIpIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIFVzZXIuZmluZEJ5RW1haWwoJ3Rlc3RAdGVzdC5jb20nKS5leGVjKCkudGhlbigodXNlcjogSVVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5mYWlsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBjcmVhdGUgYW4gYWRtaW4gdXNlciBpZiBubyB1c2VycyBleGlzdCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcCkucG9zdCgnL2FwaS92MS9yZWdpc3RlcicpXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nLCBwYXNzd29yZDogJ3Rlc3QnIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgyMDApXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyOiBhbnksIHJlczogcmVxdWVzdC5SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICBVc2VyLmZpbmRCeUVtYWlsKCd0ZXN0QHRlc3QuY29tJykuZXhlYygpLnRoZW4oKHVzZXI6IElVc2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZmFpbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHVzZXIucm9sZSwgJ2FkbWluJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnI6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgY3JlYXRlIGEgcmVndWxhciB1c2VyIGlmIHVzZXJzIGV4aXN0JywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgbGV0IHUgPSBuZXcgVXNlcih7XG4gICAgICAgICAgICAgICAgbmFtZTogJ3Rlc3QnLFxuICAgICAgICAgICAgICAgIGVtYWlsOiAnYWRtaW5AdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAncGFzc3dvcmQnLFxuICAgICAgICAgICAgICAgIHJvbGU6ICdhZG1pbidcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB1LnNhdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0KGFwcCkucG9zdCgnL2FwaS92MS9yZWdpc3RlcicpXG4gICAgICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICd0ZXN0QHRlc3QuY29tJywgcGFzc3dvcmQ6ICd0ZXN0JyB9KVxuICAgICAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMClcbiAgICAgICAgICAgICAgICAgICAgLmVuZCgoZXJyOiBhbnksIHJlczogcmVxdWVzdC5SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFVzZXIuZmluZEJ5RW1haWwoJ3Rlc3RAdGVzdC5jb20nKS5leGVjKCkudGhlbigodXNlcjogSVVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmZhaWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHVzZXIucm9sZSwgJ3VzZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYW4gZXJyb3IgaWYgZW1haWwgb3IgcGFzc3dvcmQgbm90IHByb3ZpZGVkJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChhcHApLnBvc3QoJy9hcGkvdjEvcmVnaXN0ZXInKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycjogYW55LCByZXM6IHJlcXVlc3QuUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGpzb246IGFueSA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoanNvbi5lcnJvciwgJ1BsZWFzZSBzdXBwbHkgYW4gZW1haWwgYW5kIHBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QoYXBwKS5wb3N0KCcvYXBpL3YxL3JlZ2lzdGVyJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZW5kKHtwYXNzd29yZDogJzEyMyd9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmV4cGVjdCg0MDApXG4gICAgICAgICAgICAgICAgICAgICAgICAuZW5kKChlcnI6IGFueSwgcmVzOiByZXF1ZXN0LlJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZXJyKSByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBqc29uOiBhbnkgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoanNvbi5lcnJvciwgJ1BsZWFzZSBzdXBwbHkgYW4gZW1haWwgYW5kIHBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBhbiBlcnJvciBpZiBub3QgYSB2YWxpZCBlbWFpbCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoYXBwKS5wb3N0KCcvYXBpL3YxL3JlZ2lzdGVyJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7ZW1haWw6ICdub3QgYW4gZW1haWwgQCBhc2RsZmtqO2wnLCBwYXNzd29yZDogJzEyMzQnfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMClcbiAgICAgICAgICAgICAgICAuZW5kKChlcnI6IGFueSwgcmVzOiByZXF1ZXN0LlJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBqc29uOiBhbnkgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGpzb24uZXJyb3IsICdOb3QgYSB2YWxpZCBlbWFpbCBhZGRyZXNzJyk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ2xvZ291dCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgdGVzdFNlc3Npb246IGFueTtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdGVzdFNlc3Npb24gPSBzZXNzaW9uKGFwcCk7XG4gICAgICAgICAgICBkcm9wQWxsQ29sbGVjdGlvbnMoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgdXNlcjogSVVzZXIgPSBuZXcgVXNlcih7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdBZHJpYW4nLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogaGFzaFN5bmMoJ3Rlc3QnKSxcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogJ3VzZXInLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHVzZXIuc2F2ZSgpLnRoZW4oKHVzZXI6IElVc2VyKSA9PiBkb25lKCkpLmNhdGNoKChlcnI6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgbG9nIG91dCB0aGUgdXNlcicsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIHRlc3RTZXNzaW9uLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgIC5zZW5kKHtlbWFpbDogJ3Rlc3RAdGVzdC5jb20nLCBwYXNzd29yZDogJ3Rlc3QnfSkuZW5kKChlcnI6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICB0ZXN0U2Vzc2lvbi5nZXQoJy9hcGkvdjEvdXNlcicpLnNlbmQoKS5leHBlY3QoMjAwKS5lbmQoKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVzdFNlc3Npb24uZ2V0KCcvYXBpL3YxL2xvZ291dCcpLnNlbmQoKS5leHBlY3QoMjAwKS5lbmQoKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXN0U2Vzc2lvbi5nZXQoJy9hcGkvdjEvdXNlcicpLnNlbmQoKS5leHBlY3QoNDAxKS5lbmQoZG9uZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgndmVyaWZ5IGVtYWlsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIGRyb3BBbGxDb2xsZWN0aW9ucygpLnRoZW4oKCkgPT4gZG9uZSgpKTtcblxuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCB2ZXJpZnkgYW4gZW1haWwgZ2l2ZW4gdGhlIGNvcnJlY3QgdmVyaWZpY2F0aW9uIGxpbmsnKTtcbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgdmVyaWZ5IGFuIGVtYWlsIHdpdGggYW4gaW5jb3JyZWN0IHZlcmlmaWNhdGlvbiBsaW5rJyk7XG4gICAgfSk7XG59KTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdXBlcnRlc3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3VwZXJ0ZXN0LXNlc3Npb25cIik7Il0sInNvdXJjZVJvb3QiOiIifQ==
>>>>>>> develop
