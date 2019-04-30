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