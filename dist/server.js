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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/server.ts");
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

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),

/***/ "socketio-jwt":
/*!*******************************!*\
  !*** external "socketio-jwt" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socketio-jwt");

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
=======
!function(e){var n={};function t(r){if(n[r])return n[r].exports;var s=n[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,t),s.l=!0,s.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var s in e)t.d(r,s,function(n){return e[n]}.bind(null,s));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=8)}([function(e,n){e.exports=require("mongoose")},function(e,n,t){e.exports={mongodbConnectionUri:process.env.MONGODB_URI,mongodbTestConnectionUri:"mongodb://localhost:27017/openChatTest",port:process.env.PORT||5e3,production:!0,useTestDb:process.env.USE_TEST_DB||!1,secret:process.env.SECRET||"secret",disableCsrf:process.env.DISABLE_CSRF||!1,disableReduxLogging:process.env.DISABLE_REDUX_LOGGING||!1,disableAutoStart:process.env.DISABLE_AUTO_START||!1,mailgunApiKey:process.env.MAILGUN_API_KEY,mailgunDomain:process.env.MAILGUN_DOMAIN,baseUrl:process.env.BASE_URL?process.env.BASE_URL:"http://localhost:5000"}},function(e,n){e.exports=require("bcryptjs")},function(e,n,t){"use strict";n.__esModule=!0;var r=t(0),s=new r.Schema({name:String,email:{required:!0,type:String,lowercase:!0},password:{type:String,required:!0},role:{type:String,required:!0,lowercase:!0,enum:["admin","user"]}},{timestamps:!0});s.statics.findByEmail=function(e){return this.findOne({email:e})};var o=r.model("User",s);n.default=o},function(e,n){e.exports=require("path")},function(e,n){e.exports=require("jsonwebtoken")},function(e,n){e.exports=require("validator")},function(e,n,t){"use strict";n.__esModule=!0;var r=t(0),s=new r.Schema({channel:{type:String,required:!0},text:{type:String,required:!0},userEmail:{type:String,required:!0,lowercase:!0}},{timestamps:!0}),o=r.model("Message",s);n.default=o},function(e,n,t){"use strict";(function(e){n.__esModule=!0;var r=t(9),s=t(10),o=t(4),i=t(0),u=t(11),a=t(12),c=t(13),l=t(14),d=t(2),f=t(15),m=t(16),p=t(5),g=t(17),h=t(18)(c),v=t(19),y=t(26),w=t(3),b=t(1),x=s();n.app=x;var j,_,S=b.port;n.socketServer=_,x.engine("html",g()),x.set("view engine","html"),x.use(m());var E=c({secret:b.secret,cookie:{maxAge:864e5,sameSite:!0,secure:b.production,httpOnly:!0},saveUninitialized:!0,resave:!1,store:new h({mongooseConnection:i.connection})}),k=u({cookie:{maxAge:864e5,sameSite:!0,secure:b.production,httpOnly:!0,key:"_csrf"}});i.connect(b.useTestDb?b.mongodbTestConnectionUri:b.mongodbConnectionUri,{useNewUrlParser:!0}),i.connection.on("error",function(e){console.error("Mongoose connection error",e)}),process.on("SIGINT",function(){i.connection.close(function(){console.log("Mongoose default connection disconnected through app termination"),process.exit(0)})}),x.use(E),x.use(a(b.secret)),b.disableCsrf?(console.log("CSRF disabled"),x.use(function(e,n,t){return e.csrfToken=function(){return""},t()})):x.use(k);var M=i.connection;x.use(function(e,n,t){return e.db=M,t()}),x.use(l.json()),x.use(l.urlencoded({extended:!0})),x.use(f()),x.use(s.static(o.resolve(e,"../../dist/public/"))),x.use("/api",function(e,n,t){return t()}),x.use(function(e,n,t){e.authenticate=function(e,n,t){w.default.findByEmail(e).then(function(e){if(null===e)return t(!1,null);if(!d.compareSync(n,e.password))return t(!1,new Error("Invalid password"));var r={email:e.email,name:e.name,role:e.role};return t(r,null)}).catch(function(e){t(!1,e)})},e.logout=function(){e.session.token=null},e.issueNewToken=function(t){var r=p.sign({name:t.name,role:t.role,email:t.email},b.secret,{expiresIn:86400});e.session.token=r,n.setHeader("x-access-token",r)},t()}),v.default(x),(j=r.createServer(x)).on("error",function(e){console.error(e),j.close()}),b.disableAutoStart||(n.socketServer=_=y.default(j,M),i.connection.on("connected",function(){console.log("Connected to MongoDB via Mongoose"),j.listen(S,function(){console.log("Listening on port "+S+"!"),x.emit("server started")})})),n.default=j,n.conn=i.connection}).call(this,"src/server")},function(e,n){e.exports=require("http")},function(e,n){e.exports=require("express")},function(e,n){e.exports=require("csurf")},function(e,n){e.exports=require("cookie-parser")},function(e,n){e.exports=require("express-session")},function(e,n){e.exports=require("body-parser")},function(e,n){e.exports=require("helmet")},function(e,n){e.exports=require("compression")},function(e,n){e.exports=require("mustache-express")},function(e,n){e.exports=require("connect-mongo")},function(e,n,t){"use strict";(function(e){n.__esModule=!0;var r=t(4),s=t(20),o=t(21),i=t(22),u=t(23),a=t(24);n.default=function(n){n.get("/",function(n,t){return t.render(r.resolve(e,"../../dist/public/index.html"),{csrfToken:n.csrfToken()})}),n.get("/widget",function(n,t){return t.render(r.resolve(e,"../../../dist/public/widget/index.html"))}),n.get("/widget/demo",function(n,t){return t.render(r.resolve(e,"../../../dist/public/widget/demo.html"))}),n.post("/api/v1/login",o.default.login),n.post("/api/v1/register",o.default.register),n.get("/api/v1/logout",o.default.logout),n.get("/api/v1/verifyEmail/:id",o.default.verifyEmail),n.use("/api/v1/user",s.default),n.get("/api/v1/user",i.default.user),n.get("/api/v1/users",i.default.users),n.get("/api/v1/user/:user",i.default.userByEmail),n.post("/api/v1/user/update/email",i.default.updateEmail),n.post("/api/v1/user/update/name",i.default.updateName),n.post("/api/v1/user/update/password",i.default.updatePassword),n.post("/api/v1/user/reset_password",i.default.resetPassword),n.get("/api/v1/message*",s.default),n.get("/api/v1/messages/:channel/:offset",u.default.messages),n.use("/api/v1/channel",s.default),n.get("/api/v1/channels",a.default.channels),n.post("/api/v1/channels/delete",a.default.delete),n.post("/api/v1/channels/create",a.default.create),n.get("*",function(n,t){return t.render(r.resolve(e,"../../dist/public/index.html"),{csrfToken:n.csrfToken()})})}}).call(this,"src/server")},function(e,n,t){"use strict";n.__esModule=!0;var r=t(5),s=t(1);n.default=function(e,n,t){e.session.token&&!e.headers["x-access-token"]&&n.setHeader("x-access-token",e.session.token);var o=e.headers["x-access-token"]||e.session.token;if(!o)return n.status(401).json({error:"Not authorized"});r.verify(o,s.secret,function(r,s){return r?n.status(401).send({error:"Not authorized"}):(e.user=s,t())})}},function(e,n,t){"use strict";n.__esModule=!0;var r=t(6),s=t(2),o=t(3);t(1);n.default={login:function(e,n){return r.isEmpty(e.body.email||"")||r.isEmpty(e.body.password||"")?n.status(400).json({error:"Please supply an email and password"}).end():r.isEmail(e.body.email)?void e.authenticate(e.body.email,e.body.password,function(t){return t?(e.issueNewToken(t),n.status(200).json({success:!0,email:t.email,role:t.role,name:t.name}).end()):n.status(401).json({error:"Invalid email or password"}).end()}):n.status(400).json({error:"Not a valid email address"}).end()},register:function(e,n){return r.isEmpty(e.body.email||"")||r.isEmpty(e.body.password||"")?n.status(400).json({error:"Please supply an email and password"}):r.isEmail(e.body.email)?o.default.findByEmail(e.body.email).countDocuments().exec().then(function(t){if(0!==t)return n.status(400).json({error:"Email address in use"});var r=s.hashSync(e.body.password);o.default.countDocuments().exec().then(function(t){var s="user";0===t&&(s="admin"),new o.default({name:"",email:e.body.email,password:r,role:s,emailVerified:!1}).save().then(function(e){return n.status(200).json({success:!0})}).catch(function(e){return console.error(e),n.status(500).json({error:"Something went wrong trying to create a new user"})})})}):n.status(400).json({error:"Not a valid email address"})},logout:function(e,n){return e.logout(),n.json({success:!0,message:"logged out"})},verifyEmail:function(e,n){}}},function(e,n,t){"use strict";n.__esModule=!0;var r=t(6),s=t(3),o=t(2);n.default={user:function(e,n){n.send(e.user)},users:function(e,n){return s.default.find({}).then(function(e){return n.status(200).json({success:!0,users:e})}).catch(function(e){return console.error(e),n.status(200).json({error:"Something went wrong while retrieving users"})})},userByEmail:function(e,n){return r.isEmail(e.params.user)?s.default.findByEmail(e.params.user).exec().then(function(e){return null!==e?n.status(200).json({user:{email:e.email,_id:e._id,name:e.name||""}}):n.status(400).json({error:"No user found with that email"})}).catch(function(e){return console.error(e),n.status(500).json({error:"Something went wrong trying to find the user"})}):n.status(400).json({error:"Please supply a valid email"})},updateEmail:function(e,n){return r.isEmail(e.body.email)?s.default.countDocuments({email:e.body.email}).exec().then(function(t){return 0!==t?n.status(400).json({error:"Email address already in use"}):s.default.findByEmail(e.user.email).exec().then(function(t){return t.email=e.body.email,t.save(),e.issueNewToken(Object.assign({},e.user,{email:e.body.email})),n.status(200).json({success:!0})}).catch(function(e){return console.error(e),n.status(500).json({error:"Something went wrong trying to fetch the user"})})}):n.status(400).json({error:"Not a valid email"})},updateName:function(e,n){return s.default.findByEmail(e.user.email).exec().then(function(t){return t.name=e.body.name,t.save(),e.issueNewToken(Object.assign({},e.user,{name:e.body.name})),n.status(200).json({success:!0})}).catch(function(e){return console.error(e),n.status(500).json({error:"Something went wrong trying to update the user"})})},updatePassword:function(e,n){return r.isEmpty(e.body.newPass)||r.isEmpty(e.body.oldPass)?n.status(400).json({error:"Must supply the current and new password"}):s.default.findByEmail(e.user.email).exec().then(function(t){return o.compareSync(e.body.oldPass,t.password)?(t.password=o.hashSync(e.body.newPass),t.save(),n.status(200).json({success:!0})):n.status(400).json({error:"Current password is incorrect"})})},resetPassword:function(e,n){return n.status(500).json({error:"Not implemented"})}}},function(e,n,t){"use strict";n.__esModule=!0;var r=t(7);n.default={messages:function(e,n){return r.default.find({channel:e.params.channel}).skip(parseInt(e.params.offest)).sort({_id:-1}).limit(20).exec().then(function(e){return n.status(200).json({messages:e.map(function(e){return{text:e.text,created:e.createdAt,userEmail:e.userEmail,channel:e.channel,_id:e._id}}).reverse()})}).catch(function(e){return n.status(400).json({error:"something went wrong trying to fetch messages"})})}}},function(e,n,t){"use strict";n.__esModule=!0;var r=t(25);n.default={channels:function(e,n){return r.default.countDocuments().exec().then(function(e){return new Promise(function(n,t){if(0!==e)return n();r.default.create([{name:"general"},{name:"random"}]).then(function(){return n()}).catch(function(e){return t(e)})}).then(function(){r.default.find().exec().then(function(e){return n.status(200).json({channels:e})}).catch(function(e){return console.log(e),n.status(500).json({error:"Something went wrong while trying to fetch channels"})})}).catch(function(e){return console.error(e),n.status(500).json({error:"Something went wrong while trying to create default channels"})})}).catch(function(e){return console.error(e),n.status(500).json({error:"Something went wrong while counting channels"})})},delete:function(e,n){},create:function(e,n){}}},function(e,n,t){"use strict";n.__esModule=!0;var r=t(0),s=new r.Schema({name:{type:String,required:!0,lowercase:!0}},{timestamps:!0}),o=r.model("Channel",s);n.default=o},function(e,n,t){"use strict";n.__esModule=!0;var r=t(27),s=t(28),o=t(7),i=t(1);n.default=function(e,n){var t=r(e),u=[];return t.on("connection",s.authorize({secret:i.secret,timeout:15e3,decodedPropertyName:"jwt"})).on("authenticated",function(e){u.push(e.jwt.email),console.log("Connected users",u),t.emit("connected users",u.filter(function(e,n,t){return t.indexOf(e)===n})),e.on("disconnect",function(){u.splice(u.indexOf(e.jwt.email),1),t.emit("connected users",u.filter(function(e,n,t){return t.indexOf(e)===n}))}),e.on("message",function(n){console.log(n),new o.default({channel:n.channel,text:n.text,userEmail:e.jwt.email}).save().then(function(n){t.emit("message",{_id:n._id,userEmail:n.userEmail,text:n.text,channel:n.channel,created:n.createdAt}),e.emit("message received")}).catch(function(n){console.error(n),e.emit("message receive error",n)})})}),t}},function(e,n){e.exports=require("socket.io")},function(e,n){e.exports=require("socketio-jwt")}]);
>>>>>>> develop
//# sourceMappingURL=server.js.map