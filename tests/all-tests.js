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
    mongodbTestConnectionUri: process.env.MONGODB_TEST_URI ||
			      'mongodb://localhost:27017/openChatTest',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZW52LmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvY29udHJvbGxlcnMvYXV0aENvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9jb250cm9sbGVycy9jaGFubmVsQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2NvbnRyb2xsZXJzL21lc3NhZ2VDb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvY29udHJvbGxlcnMvdXNlckNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9taWRkbGV3YXJlL2FkbWluLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbWlkZGxld2FyZS9hdXRob3JpemVkLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbW9kZWxzL0NoYW5uZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9tb2RlbHMvTWVzc2FnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21vZGVscy9Vc2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvcm91dGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvc2VydmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvc29ja2V0LmlvL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy93ZWIvYWN0aW9ucy9jaGFubmVsc0FjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9hY3Rpb25zL2NoYXRVc2Vyc0FjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9hY3Rpb25zL25vdGlmaWNhdGlvbnNBY3Rpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy93ZWIvYWN0aW9ucy9zaWRlYmFyQWN0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL2FjdGlvbnMvc29ja2V0QWN0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL2FjdGlvbnMvdXNlckFjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9yZWR1Y2Vycy9jaGFubmVscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL3JlZHVjZXJzL2NoYXRVc2Vycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL3JlZHVjZXJzL25vdGlmaWNhdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9yZWR1Y2Vycy9zaWRlYmFyLnRzIiwid2VicGFjazovLy8uL3NyYy93ZWIvcmVkdWNlcnMvc29ja2V0LnRzIiwid2VicGFjazovLy8uL3NyYy93ZWIvcmVkdWNlcnMvdXNlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL3N0b3JlLnRzIiwid2VicGFjazovLy8uL3Rlc3RzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3Rlc3RzL3NlcnZlci90ZXN0QXV0aENvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vdGVzdHMvc2VydmVyL3Rlc3RVc2VyQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi90ZXN0cy93ZWIvdGVzdEFzeW5jQWN0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi90ZXN0cy93ZWIvdGVzdFN0b3JlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3MtbW9jay1hZGFwdGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmNyeXB0anNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNoYWlcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb21wcmVzc2lvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvbm5lY3QtbW9uZ29cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb29raWUtcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY3N1cmZcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzcy1zZXNzaW9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaGVsbWV0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImpzb253ZWJ0b2tlblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vY2hhXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9uZ29vc2VcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtdXN0YWNoZS1leHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtbG9nZ2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtbW9jay1zdG9yZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LXRodW5rXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic29ja2V0LmlvXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic29ja2V0LmlvLWNsaWVudFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvY2tldGlvLWp3dFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInN1cGVydGVzdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInN1cGVydGVzdC1zZXNzaW9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidmFsaWRhdG9yXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztB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YUFBTSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7OztBQzNXSCxrQzs7Ozs7Ozs7Ozs7QUNBQSwrQzs7Ozs7Ozs7Ozs7QUNBQSxxQzs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSwwQzs7Ozs7Ozs7Ozs7QUNBQSwwQzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSw0Qzs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSxxQzs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSxzQzs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSxzQzs7Ozs7Ozs7Ozs7QUNBQSw4Qzs7Ozs7Ozs7Ozs7QUNBQSxzQyIsImZpbGUiOiJhbGwtdGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3Rlc3RzL2luZGV4LnRzXCIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgLy8gaHR0cHM6Ly9kb2NzLm1vbmdvZGIuY29tL21hbnVhbC9yZWZlcmVuY2UvY29ubmVjdGlvbi1zdHJpbmcvXG4gICAgbW9uZ29kYkNvbm5lY3Rpb25Vcmk6IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJLFxuICAgIG1vbmdvZGJUZXN0Q29ubmVjdGlvblVyaTogcHJvY2Vzcy5lbnYuTU9OR09EQl9URVNUX1VSSSB8fFxuXHRcdFx0ICAgICAgJ21vbmdvZGI6Ly9sb2NhbGhvc3Q6MjcwMTcvb3BlbkNoYXRUZXN0JyxcbiAgICBwb3J0OiBwcm9jZXNzLmVudi5QT1JUIHx8IDUwMDAsXG4gICAgcHJvZHVjdGlvbjogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyB8fCBmYWxzZSxcbiAgICB1c2VUZXN0RGI6IHByb2Nlc3MuZW52LlVTRV9URVNUX0RCIHx8IGZhbHNlLFxuICAgIHNlY3JldDogcHJvY2Vzcy5lbnYuU0VDUkVUIHx8ICdzZWNyZXQnLFxuICAgIGRpc2FibGVDc3JmOiBwcm9jZXNzLmVudi5ESVNBQkxFX0NTUkYgfHwgZmFsc2UsXG4gICAgZGlzYWJsZVJlZHV4TG9nZ2luZzogcHJvY2Vzcy5lbnYuRElTQUJMRV9SRURVWF9MT0dHSU5HIHx8IGZhbHNlLFxuICAgIGRpc2FibGVBdXRvU3RhcnQ6IHByb2Nlc3MuZW52LkRJU0FCTEVfQVVUT19TVEFSVCB8fCBmYWxzZSxcbiAgICBtYWlsZ3VuQXBpS2V5OiBwcm9jZXNzLmVudi5NQUlMR1VOX0FQSV9LRVksXG4gICAgbWFpbGd1bkRvbWFpbjogcHJvY2Vzcy5lbnYuTUFJTEdVTl9ET01BSU4sXG4gICAgYmFzZVVybDogcHJvY2Vzcy5lbnYuQkFTRV9VUkwgPyBwcm9jZXNzLmVudi5CQVNFX1VSTCA6ICdodHRwOi8vbG9jYWxob3N0OjUwMDAnXG59XG4iLCJpbXBvcnQgeyBpc0VtYWlsLCBpc0VtcHR5IH0gZnJvbSAndmFsaWRhdG9yJztcbmltcG9ydCB7IGhhc2hTeW5jIH0gZnJvbSAnYmNyeXB0anMnO1xuaW1wb3J0IHtSZXF1ZXN0LCBSZXNwb25zZX0gZnJvbSAnLi4vLi4vdHlwZXMvZXhwcmVzcyc7XG5pbXBvcnQgVXNlciwgeyBJVXNlciB9IGZyb20gJy4uL21vZGVscy9Vc2VyJztcbmNvbnN0IGVudiA9IHJlcXVpcmUoJy4uLy4uLy4uL2VudicpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgbG9naW46IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKGlzRW1wdHkocmVxLmJvZHkuZW1haWwgfHwgJycpIHx8IGlzRW1wdHkocmVxLmJvZHkucGFzc3dvcmQgfHwgJycpKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ1BsZWFzZSBzdXBwbHkgYW4gZW1haWwgYW5kIHBhc3N3b3JkJyB9KS5lbmQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzRW1haWwocmVxLmJvZHkuZW1haWwpKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ05vdCBhIHZhbGlkIGVtYWlsIGFkZHJlc3MnIH0pLmVuZCgpO1xuICAgICAgICB9XG4gICAgICAgIHJlcS5hdXRoZW50aWNhdGUocmVxLmJvZHkuZW1haWwsIHJlcS5ib2R5LnBhc3N3b3JkLCAodXNlcjogYW55IHwgYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgaWYgKCF1c2VyKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7IGVycm9yOiAnSW52YWxpZCBlbWFpbCBvciBwYXNzd29yZCcgfSkuZW5kKCk7XG4gICAgICAgICAgICByZXEuaXNzdWVOZXdUb2tlbih1c2VyKTtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMClcbiAgICAgICAgICAgICAgICAuanNvbih7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZX0pLmVuZCgpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHJlZ2lzdGVyOiAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChpc0VtcHR5KHJlcS5ib2R5LmVtYWlsIHx8ICcnKSB8fCBpc0VtcHR5KHJlcS5ib2R5LnBhc3N3b3JkIHx8ICcnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdQbGVhc2Ugc3VwcGx5IGFuIGVtYWlsIGFuZCBwYXNzd29yZCcgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc0VtYWlsKHJlcS5ib2R5LmVtYWlsKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdOb3QgYSB2YWxpZCBlbWFpbCBhZGRyZXNzJyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gVXNlci5maW5kQnlFbWFpbChyZXEuYm9keS5lbWFpbCkuY291bnREb2N1bWVudHMoKS5leGVjKCkudGhlbigoY291bnQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGNvdW50ICE9PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7ZXJyb3I6ICdFbWFpbCBhZGRyZXNzIGluIHVzZSd9KTtcbiAgICAgICAgICAgIGxldCBwYXNzd29yZEhhc2ggPSBoYXNoU3luYyhyZXEuYm9keS5wYXNzd29yZCk7XG4gICAgICAgICAgICAvLyBJZiB0aGlzIGlzIHRoZSBmaXJzdCB1c2VyIGJlaW5nIGNyZWF0ZWQsIGFzaWduIHJvbGUgb2YgYWRtaW5cbiAgICAgICAgICAgIFVzZXIuY291bnREb2N1bWVudHMoKS5leGVjKCkudGhlbigoY291bnQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCByb2xlID0gJ3VzZXInO1xuICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgcm9sZSA9ICdhZG1pbic7XG4gICAgICAgICAgICAgICAgbGV0IHVzZXIgPSBuZXcgVXNlcih7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogcmVxLmJvZHkuZW1haWwsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZEhhc2gsXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IHJvbGUsXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsVmVyaWZpZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHVzZXIuc2F2ZSgpLnRoZW4oKHU6IElVc2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nIHRyeWluZyB0byBjcmVhdGUgYSBuZXcgdXNlcid9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuXG4gICAgfSxcbiAgICBsb2dvdXQ6IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgcmVxLmxvZ291dCgpO1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oe3N1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6ICdsb2dnZWQgb3V0J30pO1xuICAgIH0sXG4gICAgdmVyaWZ5RW1haWw6IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICB9XG59IiwiaW1wb3J0IHtSZXF1ZXN0LCBSZXNwb25zZX0gZnJvbSAnLi4vLi4vdHlwZXMvZXhwcmVzcyc7XG5pbXBvcnQgQ2hhbm5lbCwge0lDaGFubmVsfSBmcm9tICcuLi9tb2RlbHMvQ2hhbm5lbCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBjaGFubmVsczogKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAvLyBJZiBubyBjaGFubmVscyBleGlzdCwgY3JlYXRlIGEgJ2dlbmVyYWwnIGFuZCAncmFuZG9tJyBjaGFubmVsXG4gICAgICAgIHJldHVybiBDaGFubmVsLmNvdW50RG9jdW1lbnRzKCkuZXhlYygpLnRoZW4oKGNvdW50OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGxldCBwID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjb3VudCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBDaGFubmVsLmNyZWF0ZShbe25hbWU6ICdnZW5lcmFsJ30sIHtuYW1lOiAncmFuZG9tJ31dKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBwLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIENoYW5uZWwuZmluZCgpLmV4ZWMoKS50aGVuKChjaGFubmVsczogSUNoYW5uZWxbXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe2NoYW5uZWxzOiBjaGFubmVsc30pO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIGZldGNoIGNoYW5uZWxzJyB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7ZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gY3JlYXRlIGRlZmF1bHQgY2hhbm5lbHMnfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7ZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSBjb3VudGluZyBjaGFubmVscyd9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBkZWxldGU6IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgXG4gICAgfSxcbiAgICBjcmVhdGU6IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcblxuICAgIH1cbn0iLCJpbXBvcnQge1JlcXVlc3QsIFJlc3BvbnNlfSBmcm9tICcuLi8uLi90eXBlcy9leHByZXNzJztcbmltcG9ydCBNZXNzYWdlLCB7SU1lc3NhZ2V9IGZyb20gJy4uL21vZGVscy9NZXNzYWdlJztcbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBtZXNzYWdlczogKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICByZXR1cm4gTWVzc2FnZS5maW5kKHtjaGFubmVsOiByZXEucGFyYW1zLmNoYW5uZWx9KVxuICAgICAgICAgICAgLnNraXAocGFyc2VJbnQocmVxLnBhcmFtcy5vZmZlc3QpKVxuICAgICAgICAgICAgLnNvcnQoe19pZDogLTF9KVxuICAgICAgICAgICAgLmxpbWl0KDIwKVxuICAgICAgICAgICAgLmV4ZWMoKS50aGVuKChtZXNzYWdlczogSU1lc3NhZ2VbXSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgICAgICAgICAgICAgICBtZXNzYWdlczogbWVzc2FnZXMubWFwKChtOiBJTWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBtLnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZDogbS5jcmVhdGVkQXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlckVtYWlsOiBtLnVzZXJFbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsOiBtLmNoYW5uZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2lkOiBtLl9pZFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgIH0pLnJldmVyc2UoKVxuICAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9KS5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdzb21ldGhpbmcgd2VudCB3cm9uZyB0cnlpbmcgdG8gZmV0Y2ggbWVzc2FnZXMnIH0pO1xuICAgICAgICB9KVxuICAgIH1cbn0iLCJpbXBvcnQge2lzRW1haWwsIGlzRW1wdHl9IGZyb20gJ3ZhbGlkYXRvcic7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJy4uLy4uL3R5cGVzL2V4cHJlc3MnO1xuaW1wb3J0IFVzZXIsIHsgSVVzZXIsIElVc2VyTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvVXNlcic7XG5pbXBvcnQge2NvbXBhcmVTeW5jLCBoYXNoU3luY30gZnJvbSAnYmNyeXB0anMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgdXNlcjogKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICByZXMuc2VuZChyZXEudXNlcik7XG4gICAgfSxcbiAgICB1c2VyczogKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICByZXR1cm4gVXNlci5maW5kKHt9KS5zZWxlY3QoJ25hbWUgZW1haWwgcm9sZScpLnRoZW4oKHVzZXJzOiBJVXNlcltdKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIHVzZXJzOiB1c2Vyc30pO1xuICAgICAgICB9KS5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHJldHJpZXZpbmcgdXNlcnMnfSk7XG4gICAgICAgIH0pXG4gICAgfSxcbiAgICB1c2VyQnlFbWFpbDogKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICBpZighaXNFbWFpbChyZXEucGFyYW1zLnVzZXIpKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtlcnJvcjogJ1BsZWFzZSBzdXBwbHkgYSB2YWxpZCBlbWFpbCd9KTtcblxuICAgICAgICByZXR1cm4gVXNlci5maW5kQnlFbWFpbChyZXEucGFyYW1zLnVzZXIpLmV4ZWMoKS50aGVuKCh1c2VyOiBJVXNlcikgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9pZDogdXNlci5faWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUgfHwgJycsXG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkOiB1c2VyLmNyZWF0ZWRBdFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe2Vycm9yOiAnTm8gdXNlciBmb3VuZCB3aXRoIHRoYXQgZW1haWwnfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfSkuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7ZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZyB0cnlpbmcgdG8gZmluZCB0aGUgdXNlcid9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICB1cGRhdGVFbWFpbDogKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICBpZighaXNFbWFpbChyZXEuYm9keS5lbWFpbCkpXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ05vdCBhIHZhbGlkIGVtYWlsJyB9KTtcbiAgICAgICAgcmV0dXJuIFVzZXIuY291bnREb2N1bWVudHMoe2VtYWlsOiByZXEuYm9keS5lbWFpbH0pLmV4ZWMoKS50aGVuKChjb3VudDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoY291bnQgIT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdFbWFpbCBhZGRyZXNzIGFscmVhZHkgaW4gdXNlJyB9KTtcbiAgICAgICAgICAgIHJldHVybiBVc2VyLmZpbmRCeUVtYWlsKHJlcS51c2VyLmVtYWlsKS5leGVjKCkudGhlbigodXNlcjogSVVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICB1c2VyLmVtYWlsID0gcmVxLmJvZHkuZW1haWw7XG4gICAgICAgICAgICAgICAgdXNlci5zYXZlKCk7XG4gICAgICAgICAgICAgICAgcmVxLmlzc3VlTmV3VG9rZW4oT2JqZWN0LmFzc2lnbih7fSwgcmVxLnVzZXIsIHtlbWFpbDogcmVxLmJvZHkuZW1haWx9KSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcgdHJ5aW5nIHRvIGZldGNoIHRoZSB1c2VyJyB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHVwZGF0ZU5hbWU6IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgcmV0dXJuIFVzZXIuZmluZEJ5RW1haWwocmVxLnVzZXIuZW1haWwpXG4gICAgICAgICAgICAuZXhlYygpLnRoZW4oKHVzZXI6IElVc2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgdXNlci5uYW1lID0gcmVxLmJvZHkubmFtZTtcbiAgICAgICAgICAgICAgICB1c2VyLnNhdmUoKTtcbiAgICAgICAgICAgICAgICByZXEuaXNzdWVOZXdUb2tlbihPYmplY3QuYXNzaWduKHt9LCByZXEudXNlciwgeyBuYW1lOiByZXEuYm9keS5uYW1lIH0pKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWV9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7ZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZyB0cnlpbmcgdG8gdXBkYXRlIHRoZSB1c2VyJ30pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHVwZGF0ZVBhc3N3b3JkOiAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChpc0VtcHR5KHJlcS5ib2R5Lm5ld1Bhc3MpIHx8IGlzRW1wdHkocmVxLmJvZHkub2xkUGFzcykpXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ011c3Qgc3VwcGx5IHRoZSBjdXJyZW50IGFuZCBuZXcgcGFzc3dvcmQnIH0pO1xuICAgICAgICByZXR1cm4gVXNlci5maW5kQnlFbWFpbChyZXEudXNlci5lbWFpbCkuZXhlYygpLnRoZW4oKHVzZXI6IElVc2VyKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWNvbXBhcmVTeW5jKHJlcS5ib2R5Lm9sZFBhc3MsIHVzZXIucGFzc3dvcmQpKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7ZXJyb3I6ICdDdXJyZW50IHBhc3N3b3JkIGlzIGluY29ycmVjdCd9KTtcbiAgICAgICAgICAgIHVzZXIucGFzc3dvcmQgPSBoYXNoU3luYyhyZXEuYm9keS5uZXdQYXNzKTtcbiAgICAgICAgICAgIHVzZXIuc2F2ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlfSk7XG4gICAgICAgIH0pXG4gICAgfSxcbiAgICByZXNldFBhc3N3b3JkOiAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7ZXJyb3I6ICdOb3QgaW1wbGVtZW50ZWQnfSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBQT1NUIC9hcGkvdjEvdXNlci9jcmVhdGVcbiAgICAgKiByZXEuYm9keS5lbWFpbDogc3RyaW5nXG4gICAgICogcmVxLmJvZHkubmFtZT86IHN0cmluZyxcbiAgICAgKiByZXEuYm9keS5yb2xlOiBzdHJpbmdcbiAgICAgKi9cbiAgICBjcmVhdGVVc2VyOiAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmKGlzRW1wdHkocmVxLmJvZHkuZW1haWwpIHx8ICFpc0VtYWlsKHJlcS5ib2R5LmVtYWlsKSB8fFxuICAgICAgICAgICBpc0VtcHR5KHJlcS5ib2R5LnJvbGUpIHx8IChyZXEuYm9keS5yb2xlICE9PSAndXNlcicgJiYgcmVxLmJvZHkucm9sZSAhPT0gJ2FkbWluJykpXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ011c3Qgc3VwcGx5IHZhbGlkIGVtYWlsIGFuZCByb2xlJ30pO1xuICAgICAgICByZXR1cm4gVXNlci5maW5kQnlFbWFpbChyZXEuYm9keS5lbWFpbCkuY291bnREb2N1bWVudHMoKGVycjogYW55LCBjOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB0cnlpbmcgdG8gY291bnQgdXNlcnMgd2l0aCBlbWFpbCAnICsgcmVxLmJvZHkuZW1haWwsIGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nJ30pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGMgIT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtlcnJvcjogJ0VtYWlsIGFkZHJlc3MgaW4gdXNlJ30pO1xuICAgICAgICAgICAgbGV0IHUgPSBuZXcgVXNlcih7XG4gICAgICAgICAgICAgICAgZW1haWw6IHJlcS5ib2R5LmVtYWlsLFxuICAgICAgICAgICAgICAgIG5hbWU6IHJlcS5ib2R5Lm5hbWUgfHwgJycsXG4gICAgICAgICAgICAgICAgcm9sZTogcmVxLmJvZHkucm9sZSxcbiAgICAgICAgICAgICAgICAvLyBAdG9kbyBzZW5kIHBhc3N3b3JkIHJlc2V0IGxpbmsgdG8gbmV3IHVzZXJcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJ3RlbXAnLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiB1LnNhdmUoKGVycjogYW55LCB1OiBJVXNlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignU29tZXRoaW5nIHdlbnQgd3JvbmcgdHJ5aW5nIHRvIHNhdmUgdXNlcicsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWV9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pXG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBQVVQgL2FwaS92MS91c2VyL3VwZGF0ZVxuICAgICAqIEBwYXJhbSByZXEuYm9keS5lbWFpbDogc3RyaW5nXG4gICAgICogQHBhcmFtIHJlcS5ib2R5LnVzZXI6IHtcbiAgICAgKiAgZW1haWw/OiBzdHJpbmcsXG4gICAgICogIG5hbWU/OiBzdHJpbmcsXG4gICAgICogIHJvbGU/OiBzdHJpbmcsXG4gICAgICogfVxuICAgICAqL1xuICAgIGVkaXRVc2VyOiAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmICghcmVxLmJvZHkuZW1haWwgfHwgIWlzRW1haWwocmVxLmJvZHkuZW1haWwpKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtlcnJvcjogJ1BsZWFzZSBzdXBwbHkgYSB2YWxpZCBlbWFpbCd9KTtcbiAgICAgICAgaWYgKHJlcS5ib2R5LnVzZXIuZW1haWwgJiYgIWlzRW1haWwocmVxLmJvZHkudXNlci5lbWFpbCkpXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ1BsZWFzZSBzdXBwbHkgYSB2YWxpZCBlbWFpbCcgfSk7XG4gICAgICAgIGlmIChyZXEuYm9keS51c2VyLnJvbGUgJiYgIWlzRW1wdHkocmVxLmJvZHkudXNlci5yb2xlKSAmJiAocmVxLmJvZHkudXNlci5yb2xlICE9PSAndXNlcicgJiYgcmVxLmJvZHkudXNlci5yb2xlICE9PSAnYWRtaW4nKSlcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7ZXJyb3I6ICdJbnZhbGlkIHJvbGUnfSk7XG4gICAgICAgIHJldHVybiBVc2VyLmZpbmRCeUVtYWlsKHJlcS5ib2R5LmVtYWlsKS5leGVjKChlcnI6IGFueSwgdXNlcjogSVVzZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU29tZXRoaW5nIHdlbnQgd3JvbmcnLCBlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7ZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZyd9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7ZXJyb3I6ICdVc2VyIGRvZXMgbm90IGV4aXN0J30pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlcS5ib2R5LnVzZXIuZW1haWwpXG4gICAgICAgICAgICAgICAgdXNlci5lbWFpbCA9IHJlcS5ib2R5LnVzZXIuZW1haWw7XG4gICAgICAgICAgICBpZiAocmVxLmJvZHkudXNlci5uYW1lKVxuICAgICAgICAgICAgICAgIHVzZXIubmFtZSA9IHJlcS5ib2R5LnVzZXIubmFtZTtcbiAgICAgICAgICAgIGlmIChyZXEuYm9keS51c2VyLnJvbGUpXG4gICAgICAgICAgICAgICAgdXNlci5yb2xlID0gcmVxLmJvZHkudXNlci5yb2xlO1xuICAgICAgICAgICAgcmV0dXJuIHVzZXIuc2F2ZSgoZXJyOiBhbnksIHVzZXI6IElVc2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oe2Vycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZX0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZGVsZXRlVXNlcjogKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuXG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHJlcTogYW55LCByZXM6IGFueSwgbmV4dDogRnVuY3Rpb24pIHtcbiAgICBpZiAocmVxLnVzZXIgJiYgcmVxLnVzZXIucm9sZSA9PT0gJ2FkbWluJykge1xuICAgICAgICByZXR1cm4gbmV4dCgpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oeyBlcnJvcjogJ05vdCBhdXRob3JpemVkIGFzIGFkbWluJyB9KTtcbn0iLCJpbXBvcnQgeyB2ZXJpZnkgfSBmcm9tICdqc29ud2VidG9rZW4nO1xuaW1wb3J0IHsgVG9rZW4gfSBmcm9tICcuLi8uLi90eXBlcy9qd3QnO1xuaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tICcuLi8uLi90eXBlcy9leHByZXNzJztcbmNvbnN0IGVudiA9IHJlcXVpcmUoJy4uLy4uLy4uL2VudicpO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBGdW5jdGlvbikge1xuICAgIHZhciB0b2tlbiA9IHJlcS5zZXNzaW9uLnRva2VuIHx8IHJlcS5oZWFkZXJzWyd4LWFjY2Vzcy10b2tlbiddO1xuICAgIGlmICghdG9rZW4pXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7IGVycm9yOiAnTm90IGF1dGhvcml6ZWQnIH0pO1xuXG4gICAgdmVyaWZ5KHRva2VuLCBlbnYuc2VjcmV0LCAoZXJyOiBFcnJvciwgZGVjb2RlZDogVG9rZW4pID0+IHtcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5zZW5kKHsgZXJyb3I6ICdOb3QgYXV0aG9yaXplZCcgfSk7XG4gICAgICAgIHJlcS51c2VyID0gZGVjb2RlZDtcbiAgICAgICAgcmV0dXJuIG5leHQoKTtcbiAgICB9KTsgICAgXG59IiwiaW1wb3J0IHtTY2hlbWEsIERvY3VtZW50LCBNb2RlbCwgbW9kZWx9IGZyb20gJ21vbmdvb3NlJztcblxuZXhwb3J0IGludGVyZmFjZSBJQ2hhbm5lbCBleHRlbmRzIERvY3VtZW50IHtcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgY3JlYXRlZEF0OiBEYXRlLFxuICAgIHVwZGF0ZWRBdDogRGF0ZSxcbn1cblxuY29uc3QgY2hhbm5lbFNjaGVtYTogU2NoZW1hID0gbmV3IFNjaGVtYSh7XG4gICAgbmFtZToge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBsb3dlcmNhc2U6IHRydWUsXG4gICAgfSxcbn0sIHtcbiAgICB0aW1lc3RhbXBzOiB0cnVlXG59KTtcblxuY29uc3QgQ2hhbm5lbDogTW9kZWw8SUNoYW5uZWw+ID0gbW9kZWwoJ0NoYW5uZWwnLCBjaGFubmVsU2NoZW1hKTtcbmV4cG9ydCBkZWZhdWx0IENoYW5uZWw7IiwiaW1wb3J0IHtTY2hlbWEsIG1vZGVsLCBEb2N1bWVudCwgTW9kZWx9IGZyb20gJ21vbmdvb3NlJztcblxuZXhwb3J0IGludGVyZmFjZSBJTWVzc2FnZSBleHRlbmRzIERvY3VtZW50IHtcbiAgICBjaGFubmVsOiBzdHJpbmcsXG4gICAgdGV4dDogc3RyaW5nLFxuICAgIHVzZXJFbWFpbDogc3RyaW5nLFxuICAgIGNyZWF0ZWRBdDogRGF0ZSxcbiAgICB1cGRhdGVkQXQ6IERhdGUsXG59XG5cbmNvbnN0IG1lc3NhZ2VTY2hlbWE6IFNjaGVtYSA9IG5ldyBTY2hlbWEoe1xuICAgIGNoYW5uZWw6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgLy8gc2hvdWxkIHZhbGlkYXRlIHRvIG1ha2Ugc3VyZSBjaGFubmVsIGFscmVhZHkgZXhpc3RzXG4gICAgfSxcbiAgICB0ZXh0OiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgfSxcbiAgICB1c2VyRW1haWw6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgbG93ZXJjYXNlOiB0cnVlLFxuICAgICAgICAvLyBzaG91bGQgdmFsaWRhdGUgdG8gY29uZmlybSB0aGF0IHVzZXIgZXhpc3RzXG4gICAgfVxufSwge1xuICAgIHRpbWVzdGFtcHM6IHRydWVcbn0pO1xuXG5jb25zdCBNZXNzYWdlOiBNb2RlbDxJTWVzc2FnZT4gPSBtb2RlbCgnTWVzc2FnZScsIG1lc3NhZ2VTY2hlbWEpO1xuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZTsiLCJpbXBvcnQge1NjaGVtYSwgRG9jdW1lbnQsIG1vZGVsLCBNb2RlbCwgRXJyb3IsIERvY3VtZW50UXVlcnl9IGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCB7dG9Mb3dlcn0gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGludGVyZmFjZSBJVXNlciBleHRlbmRzIERvY3VtZW50IHtcbiAgICBuYW1lPzogc3RyaW5nLFxuICAgIGVtYWlsOiBzdHJpbmcsXG4gICAgY3JlYXRlZEF0OiBEYXRlLFxuICAgIHVwZGF0ZWRBdDogRGF0ZSxcbiAgICBwYXNzd29yZDogc3RyaW5nLFxuICAgIHJvbGU6ICdhZG1pbicgfCAndXNlcicsXG5cbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVVzZXJNb2RlbCBleHRlbmRzIE1vZGVsPElVc2VyPiB7XG4gICAgZmluZEJ5RW1haWw6IChlbWFpbDogc3RyaW5nKSA9PiBEb2N1bWVudFF1ZXJ5PElVc2VyLCBJVXNlcj5cbn1cblxuY29uc3QgdXNlclNjaGVtYTogU2NoZW1hID0gbmV3IFNjaGVtYSh7XG4gICAgbmFtZTogU3RyaW5nLFxuICAgIGVtYWlsOiB7XG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIGxvd2VyY2FzZTogdHJ1ZVxuICAgIH0sXG4gICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgcm9sZToge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBsb3dlcmNhc2U6IHRydWUsXG4gICAgICAgIGVudW06IFsnYWRtaW4nLCAndXNlciddXG4gICAgfSxcbn0sIHtcbiAgICB0aW1lc3RhbXBzOiB0cnVlXG59KTtcblxudXNlclNjaGVtYS5zdGF0aWNzLmZpbmRCeUVtYWlsID0gZnVuY3Rpb24gKGVtYWlsOiBzdHJpbmcpOiBEb2N1bWVudFF1ZXJ5PElVc2VyLCBJVXNlcj4ge1xuICAgIHJldHVybiB0aGlzLmZpbmRPbmUoe2VtYWlsOiBlbWFpbH0pO1xufVxuXG5jb25zdCBVc2VyOiBJVXNlck1vZGVsID0gbW9kZWw8SVVzZXIsIElVc2VyTW9kZWw+KCdVc2VyJywgdXNlclNjaGVtYSk7XG5leHBvcnQgZGVmYXVsdCBVc2VyOyIsImltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBBcHAsIFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnLi4vdHlwZXMvZXhwcmVzcyc7XG5pbXBvcnQgYXV0aG9yaXplZCBmcm9tICcuL21pZGRsZXdhcmUvYXV0aG9yaXplZCc7XG5pbXBvcnQgYWRtaW4gZnJvbSAnLi9taWRkbGV3YXJlL2FkbWluJztcbmltcG9ydCBhdXRoQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL2F1dGhDb250cm9sbGVyJztcbmltcG9ydCB1c2VyQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL3VzZXJDb250cm9sbGVyJztcbmltcG9ydCBtZXNzYWdlQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL21lc3NhZ2VDb250cm9sbGVyJztcbmltcG9ydCBjaGFubmVsQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL2NoYW5uZWxDb250cm9sbGVyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYXBwOiBBcHApIHtcblxuICAgIC8qIFN0YXRpYyBSb3V0ZXMgKi9cbiAgICBhcHAuZ2V0KCcvJywgZnVuY3Rpb24gKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzLnJlbmRlcihcbiAgICAgICAgICAgIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi9kaXN0L3B1YmxpYy9pbmRleC5odG1sJyksXG4gICAgICAgICAgICB7IGNzcmZUb2tlbjogcmVxLmNzcmZUb2tlbigpIH1cbiAgICAgICAgKTtcbiAgICB9KTtcbiAgICAvKiBXaWRnZXQgcmVuZGVyZWQgaW5zaWRlIGlmcmFtZSB2aWEgd2lkZ2V0LWVtYmVkIHNjcmlwdCAqL1xuICAgIGFwcC5nZXQoJy93aWRnZXQnLCBmdW5jdGlvbiAocmVxOiBhbnksIHJlczogYW55KSB7XG4gICAgICAgIHJldHVybiByZXMucmVuZGVyKFxuICAgICAgICAgICAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uLy4uL2Rpc3QvcHVibGljL3dpZGdldC9pbmRleC5odG1sJylcbiAgICAgICAgKTtcbiAgICB9KTtcbiAgICAvKiBQYWdlIGRlbW9pbmcgZW1iZWRkZWQgd2lkZ2V0ICovXG4gICAgYXBwLmdldCgnL3dpZGdldC9kZW1vJywgZnVuY3Rpb24gKHJlcTogYW55LCByZXM6IGFueSkge1xuICAgICAgICByZXR1cm4gcmVzLnJlbmRlcihcbiAgICAgICAgICAgIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi8uLi9kaXN0L3B1YmxpYy93aWRnZXQvZGVtby5odG1sJylcbiAgICAgICAgKTtcbiAgICB9KTtcbiAgICBcbiAgICAvKiBBUEkgUm91dGVzICovXG4gICAgXG4gICAgYXBwLnBvc3QoJy9hcGkvdjEvbG9naW4nLCBhdXRoQ29udHJvbGxlci5sb2dpbik7XG4gICAgYXBwLnBvc3QoJy9hcGkvdjEvcmVnaXN0ZXInLCBhdXRoQ29udHJvbGxlci5yZWdpc3Rlcik7XG4gICAgYXBwLmdldCgnL2FwaS92MS9sb2dvdXQnLCBhdXRoQ29udHJvbGxlci5sb2dvdXQpO1xuICAgIGFwcC5nZXQoJy9hcGkvdjEvdmVyaWZ5RW1haWwvOmlkJywgYXV0aENvbnRyb2xsZXIudmVyaWZ5RW1haWwpO1xuXG4gICAgYXBwLnVzZSgnL2FwaS92MS91c2VyKicsIGF1dGhvcml6ZWQpO1xuICAgIGFwcC5nZXQoJy9hcGkvdjEvdXNlcicsIHVzZXJDb250cm9sbGVyLnVzZXIpO1xuICAgIGFwcC5nZXQoJy9hcGkvdjEvdXNlcnMnLCB1c2VyQ29udHJvbGxlci51c2VycylcbiAgICBhcHAuZ2V0KCcvYXBpL3YxL3VzZXIvOnVzZXInLCB1c2VyQ29udHJvbGxlci51c2VyQnlFbWFpbCk7XG4gICAgYXBwLnBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvZW1haWwnLCB1c2VyQ29udHJvbGxlci51cGRhdGVFbWFpbCk7XG4gICAgYXBwLnBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvbmFtZScsIHVzZXJDb250cm9sbGVyLnVwZGF0ZU5hbWUpO1xuICAgIGFwcC5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL3Bhc3N3b3JkJywgdXNlckNvbnRyb2xsZXIudXBkYXRlUGFzc3dvcmQpO1xuICAgIGFwcC5wb3N0KCcvYXBpL3YxL3VzZXIvcmVzZXRfcGFzc3dvcmQnLCB1c2VyQ29udHJvbGxlci5yZXNldFBhc3N3b3JkKTtcbiAgICBhcHAucG9zdCgnL2FwaS92MS91c2VyL2NyZWF0ZScsIGFkbWluLCB1c2VyQ29udHJvbGxlci5jcmVhdGVVc2VyKTtcbiAgICBhcHAucHV0KCcvYXBpL3YxL3VzZXIvdXBkYXRlJywgYWRtaW4sIHVzZXJDb250cm9sbGVyLmVkaXRVc2VyKTtcbiAgICBhcHAucG9zdCgnL2FwaS92MS91c2VyL2RlbGV0ZScsIGFkbWluLCB1c2VyQ29udHJvbGxlci5kZWxldGVVc2VyKTtcblxuICAgIGFwcC51c2UoJy9hcGkvdjEvbWVzc2FnZSonLCBhdXRob3JpemVkKTtcbiAgICBhcHAuZ2V0KCcvYXBpL3YxL21lc3NhZ2VzLzpjaGFubmVsLzpvZmZzZXQnLCBtZXNzYWdlQ29udHJvbGxlci5tZXNzYWdlcyk7XG5cbiAgICBhcHAudXNlKCcvYXBpL3YxL2NoYW5uZWwnLCBhdXRob3JpemVkKTtcbiAgICBhcHAuZ2V0KCcvYXBpL3YxL2NoYW5uZWxzJywgY2hhbm5lbENvbnRyb2xsZXIuY2hhbm5lbHMpO1xuICAgIGFwcC5wb3N0KCcvYXBpL3YxL2NoYW5uZWxzL2RlbGV0ZScsIGFkbWluLCBjaGFubmVsQ29udHJvbGxlci5kZWxldGUpO1xuICAgIGFwcC5wb3N0KCcvYXBpL3YxL2NoYW5uZWxzL2NyZWF0ZScsIGFkbWluLCBjaGFubmVsQ29udHJvbGxlci5jcmVhdGUpO1xuXG4gICAgLyogRGlzcGxheSBpbmRleC5odG1sIGlmIHVua25vd24gcGF0aCwgYW5kIGxldCBSZWFjdC1Sb3V0ZXIgaGFuZGxlIHRoZSA0MDQgKi9cbiAgICBhcHAuZ2V0KCcqJywgZnVuY3Rpb24gKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzLnJlbmRlcihcbiAgICAgICAgICAgIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi9kaXN0L3B1YmxpYy9pbmRleC5odG1sJyksXG4gICAgICAgICAgICB7IGNzcmZUb2tlbjogcmVxLmNzcmZUb2tlbigpIH1cbiAgICAgICAgKTtcbiAgICB9KTtcbn0iLCIvL2ltcG9ydCBNb2RlbHMgZnJvbSAnLi9tb2RlbHMvaW5kZXgudHMnO1xuXG5pbXBvcnQgKiBhcyBodHRwIGZyb20gJ2h0dHAnO1xuaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyBzb2NrZXRpbyBmcm9tICdzb2NrZXQuaW8nO1xuaW1wb3J0ICogYXMgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0ICogYXMgY3NyZiBmcm9tICdjc3VyZic7XG5pbXBvcnQgKiBhcyBjb29raWVQYXJzZXIgZnJvbSAnY29va2llLXBhcnNlcic7XG5pbXBvcnQgKiBhcyBzZXNzaW9uIGZyb20gJ2V4cHJlc3Mtc2Vzc2lvbic7XG5pbXBvcnQgKiBhcyBib2R5UGFyc2VyIGZyb20gJ2JvZHktcGFyc2VyJztcbmltcG9ydCAqIGFzIGJjcnlwdCBmcm9tICdiY3J5cHRqcyc7XG5pbXBvcnQgKiBhcyBoZWxtZXQgZnJvbSAnaGVsbWV0JztcbmltcG9ydCAqIGFzIG1vcmdhbiBmcm9tICdtb3JnYW4nO1xuaW1wb3J0ICogYXMgY29tcHJlc3Npb24gZnJvbSAnY29tcHJlc3Npb24nO1xuaW1wb3J0IHsgc2lnbiB9IGZyb20gJ2pzb253ZWJ0b2tlbic7XG5jb25zdCBtdXN0YWNoZUV4cHJlc3MgPSByZXF1aXJlKCdtdXN0YWNoZS1leHByZXNzJyk7XG5jb25zdCBNb25nb1N0b3JlID0gcmVxdWlyZSgnY29ubmVjdC1tb25nbycpKHNlc3Npb24pO1xuXG5pbXBvcnQgUm91dGVzIGZyb20gJy4vcm91dGVzJztcbmltcG9ydCB3ZWJzb2NrZXQgZnJvbSAnLi9zb2NrZXQuaW8vaW5kZXgnO1xuaW1wb3J0IHsgQXBwLCBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJy4uL3R5cGVzL2V4cHJlc3MnO1xuaW1wb3J0IFVzZXIsIHsgSVVzZXIgfSBmcm9tICcuL21vZGVscy9Vc2VyJztcbmNvbnN0IGVudiA9IHJlcXVpcmUoJy4uLy4uL2VudicpO1xuXG5jb25zdCBhcHA6IEFwcCA9IGV4cHJlc3MoKTtcbmNvbnN0IHBvcnQ6IHN0cmluZyB8IG51bWJlciA9IGVudi5wb3J0O1xubGV0IHNlcnZlcjogaHR0cC5TZXJ2ZXI7XG5sZXQgc29ja2V0U2VydmVyOiBzb2NrZXRpby5TZXJ2ZXI7XG5cbmFwcC5lbmdpbmUoJ2h0bWwnLCBtdXN0YWNoZUV4cHJlc3MoKSk7XG5hcHAuc2V0KCd2aWV3IGVuZ2luZScsICdodG1sJyk7XG4vL2FwcC51c2UobW9yZ2FuKCdjb21iaW5lZCcpKTtcbmFwcC51c2UoY29tcHJlc3Npb24oKSk7XG5cbmNvbnN0IHNlc3Npb25NaWRkbGV3YXJlID0gc2Vzc2lvbih7XG4gICAgc2VjcmV0OiBlbnYuc2VjcmV0LFxuICAgIGNvb2tpZToge1xuICAgICAgICBtYXhBZ2U6IDI0ICogNjAgKiA2MCAqIDEwMDAsIC8vIDI0IGhvdXJzXG4gICAgICAgIHNhbWVTaXRlOiB0cnVlLFxuICAgICAgICBzZWN1cmU6IGVudi5wcm9kdWN0aW9uLFxuICAgICAgICBodHRwT25seTogdHJ1ZVxuICAgIH0sXG4gICAgc2F2ZVVuaW5pdGlhbGl6ZWQ6IHRydWUsXG4gICAgcmVzYXZlOiBmYWxzZSxcbiAgICBzdG9yZTogbmV3IE1vbmdvU3RvcmUoe1xuICAgICAgICBtb25nb29zZUNvbm5lY3Rpb246IG1vbmdvb3NlLmNvbm5lY3Rpb25cbiAgICB9KVxufSk7XG5cbmNvbnN0IGNzcmZNaWRkbGV3YXJlID0gY3NyZih7XG4gICAgY29va2llOiB7XG4gICAgICAgIG1heEFnZTogMjQgKiA2MCAqIDYwICogMTAwMCwgLy8gMjQgaG91cnNcbiAgICAgICAgc2FtZVNpdGU6IHRydWUsXG4gICAgICAgIHNlY3VyZTogZW52LnByb2R1Y3Rpb24sXG4gICAgICAgIGh0dHBPbmx5OiB0cnVlLFxuICAgICAgICBrZXk6ICdfY3NyZidcbiAgICB9XG59KVxuXG5tb25nb29zZS5jb25uZWN0KGVudi51c2VUZXN0RGIgPyBlbnYubW9uZ29kYlRlc3RDb25uZWN0aW9uVXJpIDogZW52Lm1vbmdvZGJDb25uZWN0aW9uVXJpLCB7IHVzZU5ld1VybFBhcnNlcjogdHJ1ZSB9KTtcbm1vbmdvb3NlLmNvbm5lY3Rpb24ub24oJ2Vycm9yJywgZnVuY3Rpb24oZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcignTW9uZ29vc2UgY29ubmVjdGlvbiBlcnJvcicsIGVycik7XG59KTtcbnByb2Nlc3Mub24oJ1NJR0lOVCcsIGZ1bmN0aW9uICgpIHtcbiAgICBtb25nb29zZS5jb25uZWN0aW9uLmNsb3NlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ01vbmdvb3NlIGRlZmF1bHQgY29ubmVjdGlvbiBkaXNjb25uZWN0ZWQgdGhyb3VnaCBhcHAgdGVybWluYXRpb24nKTtcbiAgICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgIH0pO1xufSk7IFxuXG5hcHAudXNlKHNlc3Npb25NaWRkbGV3YXJlKTtcbmFwcC51c2UoY29va2llUGFyc2VyKGVudi5zZWNyZXQpKTtcblxuaWYoZW52LmRpc2FibGVDc3JmKSB7XG4gICAgY29uc29sZS5sb2coJ0NTUkYgZGlzYWJsZWQnKTtcbiAgICBhcHAudXNlKChyZXEsIHJlcywgbmV4dCkgPT4geyBcbiAgICAgICAgcmVxLmNzcmZUb2tlbiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcnIH1cbiAgICAgICAgcmV0dXJuIG5leHQoKTtcbiAgICB9KTtcbn0gZWxzZSB7XG4gICAgYXBwLnVzZShjc3JmTWlkZGxld2FyZSk7XG59XG4vLyBhZGQgREIgdG8gZXZlcnkgZXhwcmVzcyByZXF1ZXN0XG5sZXQgZGI6IG1vbmdvb3NlLkNvbm5lY3Rpb24gPSBtb25nb29zZS5jb25uZWN0aW9uO1xuYXBwLnVzZSgocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBGdW5jdGlvbikgPT4ge1xuICAgIHJlcS5kYiA9IGRiO1xuICAgIHJldHVybiBuZXh0KCk7XG59KVxuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7IC8vIHN1cHBvcnQganNvbiBlbmNvZGVkIGJvZGllc1xuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7XG4vL2FwcC51c2UoY29ycygpKTtcblxuXG5hcHAudXNlKGhlbG1ldCgpKTtcbi8qIFNlcnZlIHN0YXRpYyBmaWxlcyBmcm9tIGRpc3QvcHVibGljICovXG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi9kaXN0L3B1YmxpYy8nKSkpO1xuXG5hcHAudXNlKCcvYXBpJywgZnVuY3Rpb24gKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogRnVuY3Rpb24pIHtcbiAgICAvL3Jlcy5zZXRIZWFkZXIoJ25ldy1jc3JmLXRva2VuJywgcmVxLmNzcmZUb2tlbigpKVxuICAgIHJldHVybiBuZXh0KCk7XG59KTtcbmFwcC51c2UoKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogRnVuY3Rpb24pID0+IHtcbiAgICByZXEuYXV0aGVudGljYXRlID0gKGVtYWlsOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZTogKHVzZXI6IGJvb2xlYW4gfCBJVXNlciwgZXJyOiAobnVsbCB8IEVycm9yKSkgPT4gdm9pZCkgPT4ge1xuICAgICAgICBVc2VyLmZpbmRCeUVtYWlsKGVtYWlsKS50aGVuKCh1c2VyOiBJVXNlcikgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIgPT09IG51bGwpIHJldHVybiBkb25lKGZhbHNlLCBudWxsKTtcbiAgICAgICAgICAgIGlmICghYmNyeXB0LmNvbXBhcmVTeW5jKHBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkKSkgcmV0dXJuIGRvbmUoZmFsc2UsIG5ldyBFcnJvcignSW52YWxpZCBwYXNzd29yZCcpKTtcbiAgICAgICAgICAgIGxldCB1c2VyRGV0YWlsczogYW55ID0ge1xuICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICAgICAgICByb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZG9uZSh1c2VyRGV0YWlscywgbnVsbCk7XG4gICAgICAgIH0pLmNhdGNoKChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICBkb25lKGZhbHNlLCBlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVxLmxvZ291dCA9ICgpID0+IHtcbiAgICAgICAgcmVxLnNlc3Npb24udG9rZW4gPSBudWxsO1xuICAgIH1cbiAgICByZXEuaXNzdWVOZXdUb2tlbiA9ICh1c2VyOiBJVXNlcikgPT4ge1xuICAgICAgICBsZXQgdG9rZW46IHN0cmluZyA9IHNpZ24oe1xuICAgICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICAgICAgcm9sZTogdXNlci5yb2xlLFxuICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWxcbiAgICAgICAgfSwgZW52LnNlY3JldCwge1xuICAgICAgICAgICAgZXhwaXJlc0luOiA4NjQwMCAvLyBleHBpcmVzIGluIDI0IGhvdXJzXG4gICAgICAgIH0pO1xuICAgICAgICByZXMuc2V0SGVhZGVyKCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKTtcbiAgICAgICAgcmVxLnNlc3Npb24udG9rZW4gPSB0b2tlbjtcbiAgICB9XG4gICAgbmV4dCgpO1xufSk7XG5cblJvdXRlcyhhcHApO1xuc2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIoYXBwKTtcbnNlcnZlci5vbignZXJyb3InLCAoZXJyOiBFcnJvcikgPT4ge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICBzZXJ2ZXIuY2xvc2UoKTtcbn0pXG5cbmlmICghZW52LmRpc2FibGVBdXRvU3RhcnQpIHtcbiAgICBzb2NrZXRTZXJ2ZXIgPSB3ZWJzb2NrZXQoc2VydmVyLCBkYik7XG4gICAgbW9uZ29vc2UuY29ubmVjdGlvbi5vbignY29ubmVjdGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ29ubmVjdGVkIHRvIE1vbmdvREIgdmlhIE1vbmdvb3NlJyk7XG4gICAgICAgIHNlcnZlci5saXN0ZW4ocG9ydCwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYExpc3RlbmluZyBvbiBwb3J0ICR7cG9ydH0hYCk7XG4gICAgICAgICAgICBhcHAuZW1pdCgnc2VydmVyIHN0YXJ0ZWQnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNlcnZlcjtcbmV4cG9ydCBjb25zdCBjb25uID0gbW9uZ29vc2UuY29ubmVjdGlvbjtcbmV4cG9ydCB7IGFwcCwgc29ja2V0U2VydmVyIH07IiwiaW1wb3J0ICogYXMgc29ja2V0aW8gZnJvbSAnc29ja2V0LmlvJztcbmltcG9ydCB7IFNlcnZlciB9IGZyb20gJ2h0dHAnO1xuaW1wb3J0IHsgQ29ubmVjdGlvbiB9IGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCB7YXV0aG9yaXplIGFzIGF1dGhvcml6ZUp3dH0gZnJvbSAnc29ja2V0aW8tand0JztcbmltcG9ydCBNZXNzYWdlLCB7IElNZXNzYWdlIH0gZnJvbSAnLi4vbW9kZWxzL01lc3NhZ2UnO1xuaW1wb3J0IHsgVG9rZW4gfSBmcm9tICcuLi8uLi90eXBlcy9qd3QnO1xuY29uc3QgZW52ID0gcmVxdWlyZSgnLi4vLi4vLi4vZW52Jyk7XG5cbmludGVyZmFjZSBTb2NrZXQgZXh0ZW5kcyBzb2NrZXRpby5Tb2NrZXQge1xuICAgIGp3dDogVG9rZW5cbn0gXG5cbmNvbnN0IGluaXQgPSAoc2VydmVyOiBTZXJ2ZXIsIGRiOiBDb25uZWN0aW9uKTogc29ja2V0aW8uU2VydmVyID0+IHtcbiAgICBjb25zdCBpbzogc29ja2V0aW8uU2VydmVyID0gc29ja2V0aW8oc2VydmVyKTtcbiAgICBsZXQgY29ubmVjdGVkVXNlckVtYWlsczogc3RyaW5nW10gPSBbXTtcblxuICAgIC8vIHNldCBhdXRob3JpemF0aW9uIGZvciBzb2NrZXQuaW9cbiAgICBpby5vbignY29ubmVjdGlvbicsIGF1dGhvcml6ZUp3dCh7XG4gICAgICAgICAgICBzZWNyZXQ6IGVudi5zZWNyZXQsXG4gICAgICAgICAgICB0aW1lb3V0OiAxNTAwMCwgLy8gMTUgc2Vjb25kcyB0byBzZW5kIHRoZSBhdXRoZW50aWNhdGlvbiBtZXNzYWdlXG4gICAgICAgICAgICBkZWNvZGVkUHJvcGVydHlOYW1lOiAnand0J1xuICAgICAgICB9KSkub24oJ2F1dGhlbnRpY2F0ZWQnLCAoc29ja2V0OiBTb2NrZXQpID0+IHtcblxuICAgICAgICAgICAgY29ubmVjdGVkVXNlckVtYWlscy5wdXNoKHNvY2tldC5qd3QuZW1haWwpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0Nvbm5lY3RlZCB1c2VycycsIGNvbm5lY3RlZFVzZXJFbWFpbHMpO1xuICAgICAgICAgICAgaW8uZW1pdCgnY29ubmVjdGVkIHVzZXJzJywgY29ubmVjdGVkVXNlckVtYWlscy5maWx0ZXIoKHZhbHVlLCBpbmRleCwgc2VsZikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmluZGV4T2YodmFsdWUpID09PSBpbmRleDtcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgc29ja2V0Lm9uKCdkaXNjb25uZWN0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbm5lY3RlZFVzZXJFbWFpbHMuc3BsaWNlKGNvbm5lY3RlZFVzZXJFbWFpbHMuaW5kZXhPZihzb2NrZXQuand0LmVtYWlsKSwgMSk7XG4gICAgICAgICAgICAgICAgaW8uZW1pdCgnY29ubmVjdGVkIHVzZXJzJywgY29ubmVjdGVkVXNlckVtYWlscy5maWx0ZXIoKHZhbHVlLCBpbmRleCwgc2VsZikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXg7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNvY2tldC5vbignbWVzc2FnZScsIChtZXNzYWdlOiB7IHRleHQ6IHN0cmluZywgY2hhbm5lbDogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICBsZXQgbTogSU1lc3NhZ2UgPSBuZXcgTWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5uZWw6IG1lc3NhZ2UuY2hhbm5lbCxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogbWVzc2FnZS50ZXh0LFxuICAgICAgICAgICAgICAgICAgICB1c2VyRW1haWw6IHNvY2tldC5qd3QuZW1haWxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBtLnNhdmUoKS50aGVuKChtOiBJTWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpby5lbWl0KCdtZXNzYWdlJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgX2lkOiBtLl9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJFbWFpbDogbS51c2VyRW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBtLnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsOiBtLmNoYW5uZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkOiBtLmNyZWF0ZWRBdFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoJ21lc3NhZ2UgcmVjZWl2ZWQnKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KCdtZXNzYWdlIHJlY2VpdmUgZXJyb3InLCBlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIHJldHVybiBpbztcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdDsiLCJpbXBvcnQge1N0YXRlLCBDaGFubmVsLCBNZXNzYWdlfSBmcm9tICcuLi9yZWR1Y2Vycy9jaGFubmVscyc7XG5pbXBvcnQgYXhpb3MsIHsgQXhpb3NSZXNwb25zZSwgQXhpb3NFcnJvciB9IGZyb20gJ2F4aW9zJztcblxuaW1wb3J0IHthZGRFcnJvciwgYWRkSW5mb30gZnJvbSAnLi9ub3RpZmljYXRpb25zQWN0aW9ucyc7XG5cbmV4cG9ydCBjb25zdCBBRERfQ0hBTk5FTFMgPSAnQUREX0NIQU5ORUxTJztcbmV4cG9ydCBjb25zdCBTRVRfQ0hBTk5FTF9GRVRDSElOR19ORVdfTUVTU0FHRVMgPSAnU0VUX0NIQU5ORUxfRkVUQ0hJTkdfTkVXX01FU1NBR0VTJztcbmV4cG9ydCBjb25zdCBTRVRfQ0hBTk5FTF9IQVNfTU9SRV9NRVNTQUdFUyA9ICdTRVRfQ0hBTk5FTF9IQVNfTU9SRV9NRVNTQUdFJztcbmV4cG9ydCBjb25zdCBBRERfUkVDRUlWRURfQ0hBTk5FTF9NRVNTQUdFID0gJ0FERF9SRUNFSVZFRF9DSEFOTkVMX01FU1NBR0UnO1xuZXhwb3J0IGNvbnN0IEFERF9SRVRSSUVWRURfQ0hBTk5FTF9NRVNTQUdFUyA9ICdBRERfUkVUUklFVkVEX0NIQU5ORUxfTUVTU0FHRVMnO1xuZXhwb3J0IGNvbnN0IElOQ1JFTUVOVF9DSEFOTkVMX1JFVFJJRVZFX01FU1NBR0VTX09GRlNFVCA9ICdJTkNSRU1FTlRfQ0hBTk5FTF9SRVRSSUVWRV9NRVNTQUdFU19PRkZTRVQnO1xuZXhwb3J0IGNvbnN0IFJFVFJJRVZFX0NIQU5ORUxfTUVTU0FHRVMgPSAnUkVUUklFVkVfQ0hBTk5FTF9NRVNTQUdFUyc7XG5leHBvcnQgY29uc3QgQ0xFQVJfQ0hBTk5FTFNfREFUQSA9ICdDTEVBUl9DSEFOTkVMU19EQVRBJztcblxuZXhwb3J0IGNvbnN0IGFkZENoYW5uZWxzID0gKGNoYW5uZWxOYW1lczogc3RyaW5nW10pID0+IHtcbiAgICBsZXQgY2hhbm5lbHM6IFN0YXRlID0gW107XG4gICAgY2hhbm5lbE5hbWVzLmZvckVhY2goKG5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICBjaGFubmVscy5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICBtZXNzYWdlczogW10sXG4gICAgICAgICAgICByZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0OiAwLFxuICAgICAgICAgICAgaGFzTW9yZU1lc3NhZ2VzOiB0cnVlLFxuICAgICAgICAgICAgZmV0Y2hpbmdOZXdNZXNzYWdlczogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogQUREX0NIQU5ORUxTLFxuICAgICAgICBkYXRhOiB7IGNoYW5uZWxzOiBjaGFubmVscyB9XG4gICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IGluY3JlbWVudENoYW5uZWxSZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0ID0gKGNoYW5uZWw6IHN0cmluZywgbjogbnVtYmVyKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogSU5DUkVNRU5UX0NIQU5ORUxfUkVUUklFVkVfTUVTU0FHRVNfT0ZGU0VULFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBjaGFubmVsOiBjaGFubmVsLFxuICAgICAgICAgICAgaW5jcmVtZW50OiBuXG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5leHBvcnQgY29uc3Qgc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMgPSAoY2hhbm5lbDogc3RyaW5nLCBpc0ZldGNoaW5nOiBib29sZWFuKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogU0VUX0NIQU5ORUxfRkVUQ0hJTkdfTkVXX01FU1NBR0VTLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBjaGFubmVsTmFtZTogY2hhbm5lbCxcbiAgICAgICAgICAgIGlzRmV0Y2hpbmc6IGlzRmV0Y2hpbmdcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCBzZXRDaGFubmVsSGFzTW9yZU1lc3NhZ2VzID0gKGNoYW5uZWxOYW1lOiBzdHJpbmcsIGhhc01vcmU6IGJvb2xlYW4pID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBTRVRfQ0hBTk5FTF9IQVNfTU9SRV9NRVNTQUdFUyxcbiAgICAgICAgZGF0YTogeyBjaGFubmVsTmFtZTogY2hhbm5lbE5hbWUsIGhhc01vcmU6IGhhc01vcmUgfVxuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCBhZGRSZWNlaXZlZENoYW5uZWxNZXNzYWdlID0gKGNoYW5uZWxOYW1lOiBzdHJpbmcsIG1lc3NhZ2U6IE1lc3NhZ2UpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBBRERfUkVDRUlWRURfQ0hBTk5FTF9NRVNTQUdFLFxuICAgICAgICBkYXRhOiB7IG1lc3NhZ2U6IG1lc3NhZ2UsIGNoYW5uZWxOYW1lOiBjaGFubmVsTmFtZSB9XG4gICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IGFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcyA9IChjaGFubmVsTmFtZTogc3RyaW5nLCBtZXNzYWdlczogTWVzc2FnZVtdKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogQUREX1JFVFJJRVZFRF9DSEFOTkVMX01FU1NBR0VTLFxuICAgICAgICBkYXRhOiB7Y2hhbm5lbE5hbWU6IGNoYW5uZWxOYW1lLCBtZXNzYWdlczogbWVzc2FnZXN9XG4gICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IGNsZWFyQ2hhbm5lbHNEYXRhID0gKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IENMRUFSX0NIQU5ORUxTX0RBVEFcbiAgICB9XG59XG5cbi8qIEFzeW5jIEFjdGlvbnMgKi9cblxuZXhwb3J0IGNvbnN0IGZldGNoQ2hhbm5lbHMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIChkaXNwYXRjaDogYW55KSAgPT4ge1xuICAgICAgICByZXR1cm4gYXhpb3MuZ2V0KCcvYXBpL3YxL2NoYW5uZWxzJykudGhlbigocmVzOiBBeGlvc1Jlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBsZXQgY2hhbm5lbHMgPSByZXMuZGF0YS5jaGFubmVscy5tYXAoIChjOiB7bmFtZTogc3RyaW5nLCBfaWQ6IHN0cmluZ30pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYy5uYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2goYWRkQ2hhbm5lbHMoY2hhbm5lbHMpKTtcbiAgICAgICAgfSkuY2F0Y2goKGVycjogQXhpb3NFcnJvcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGRpc3BhdGNoKGFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gZmV0Y2ggdGhlIGNoYW5uZWxzJykpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCByZXRyaWV2ZUNoYW5uZWxNZXNzYWdlcyA9IChjaGFubmVsTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIGFzeW5jIChkaXNwYXRjaDogYW55LCBnZXRTdGF0ZTogYW55KSA9PiB7XG4gICAgICAgIGxldCBjaGFubmVsOiBDaGFubmVsID0gZ2V0U3RhdGUoKS5jaGFubmVscy5maW5kKCAoYzogQ2hhbm5lbCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGMubmFtZSA9PT0gY2hhbm5lbE5hbWU7XG4gICAgICAgIH0pXG4gICAgICAgIGlmICghY2hhbm5lbCB8fCBjaGFubmVsLmZldGNoaW5nTmV3TWVzc2FnZXMgfHwgIWNoYW5uZWwuaGFzTW9yZU1lc3NhZ2VzKSB7XG4gICAgICAgICAgICBkaXNwYXRjaChhZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIGZldGNoIG1lc3NhZ2VzJykpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgnUmV0cmlldmUgQ2hhbm5lbCBNZXNzYWdlcyBkaXNwYXRjaGVkIHdpdGggaW5jb3JyZWN0IGNoYW5uZWwgbmFtZSBvciB3aGlsZSBhbHJlYWR5IGZldGNoaW5nIG1lc3NhZ2VzJyk7XG4gICAgICAgIH1cbiAgICAgICAgZGlzcGF0Y2goc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMoY2hhbm5lbC5uYW1lLCB0cnVlKSk7XG4gICAgICAgIHJldHVybiBheGlvcy5nZXQoJy9hcGkvdjEvbWVzc2FnZXMvJyArIGNoYW5uZWwubmFtZSArICcvJyArIGNoYW5uZWwucmV0cmlldmVNZXNzYWdlc09mZnNldCkudGhlbigocmVzOiBBeGlvc1Jlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLmRhdGEubWVzc2FnZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZGlzcGF0Y2goc2V0Q2hhbm5lbEhhc01vcmVNZXNzYWdlcyhjaGFubmVsLm5hbWUsIGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRpc3BhdGNoKGluY3JlbWVudENoYW5uZWxSZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0KGNoYW5uZWxOYW1lLCByZXMuZGF0YS5tZXNzYWdlcy5sZW5ndGgpKTtcbiAgICAgICAgICAgIGRpc3BhdGNoKGFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcyhjaGFubmVsLm5hbWUsIHJlcy5kYXRhLm1lc3NhZ2VzKSlcbiAgICAgICAgfSkuY2F0Y2goKGVycjogQXhpb3NFcnJvcikgPT4ge1xuICAgICAgICAgICAgZGlzcGF0Y2goYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBmZXRjaCBtZXNzYWdlcycpKTtcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2goc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMoY2hhbm5lbC5uYW1lLCBmYWxzZSkpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBkZWxldGVDaGFubmVsID0gKGNoYW5uZWxOYW1lOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gKGRpc3BhdGNoOiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIGF4aW9zLmdldCgnL2FwaS92MS9jaGFubmVsL2RlbGV0ZS8nICsgY2hhbm5lbE5hbWUpLlxuICAgICAgICAgICAgdGhlbigocmVzOiBBeGlvc1Jlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgZGlzcGF0Y2goYWRkSW5mbygnQ2hhbm5lbCBkZWxldGVkJykpO1xuICAgICAgICAgICAgICAgIHJldHVybiBkaXNwYXRjaChmZXRjaENoYW5uZWxzKCkpO1xuICAgICAgICAgICAgfSkuY2F0Y2goKGVycjogQXhpb3NFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkaXNwYXRjaChhZGRFcnJvcihlcnIucmVzcG9uc2UuZGF0YS5lcnJvcikpO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IGFkZENoYW5uZWwgPSAoY2hhbm5lbE5hbWU6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiAoZGlzcGF0Y2g6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gYXhpb3MucG9zdCgnL2FwaS92MS9jaGFubmVsL2NyZWF0ZScsIHtcbiAgICAgICAgICAgIGNoYW5uZWxOYW1lOiBjaGFubmVsTmFtZVxuICAgICAgICB9KS50aGVuKChyZXM6IEF4aW9zUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGRpc3BhdGNoKGFkZEluZm8oJ0NoYW5uZWwgY3JlYXRlZCcpKTtcbiAgICAgICAgICAgIHJldHVybiBkaXNwYXRjaChmZXRjaENoYW5uZWxzKCkpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyOiBBeGlvc0Vycm9yKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2goYWRkRXJyb3IoZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpKTtcbiAgICAgICAgfSlcbiAgICB9O1xufVxuIiwiaW1wb3J0IGF4aW9zLCB7IEF4aW9zRXJyb3IsIEF4aW9zUmVzcG9uc2UgfSBmcm9tICdheGlvcyc7XG5cbmltcG9ydCB7U3RhdGUsIENoYXRVc2VyfSBmcm9tICcuLi9yZWR1Y2Vycy9jaGF0VXNlcnMnO1xuaW1wb3J0IHsgRGlzcGF0Y2ggfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBhZGRFcnJvciB9IGZyb20gJy4vbm90aWZpY2F0aW9uc0FjdGlvbnMnO1xuXG5leHBvcnQgY29uc3QgVVBEQVRFX0NIQVRfVVNFUlMgPSAnVVBEQVRFX0NIQVRfVVNFUlMnO1xuZXhwb3J0IGNvbnN0IEFERF9DSEFUX1VTRVIgPSAnQUREX1VTRVInO1xuZXhwb3J0IGNvbnN0IFJFTU9WRV9DSEFUX1VTRVIgPSAnUkVNT1ZFX1VTRVInO1xuXG5leHBvcnQgY29uc3QgdXBkYXRlVXNlcnMgPSBmdW5jdGlvbih1c2VyczogU3RhdGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBVUERBVEVfQ0hBVF9VU0VSUyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgdXNlcnM6IHVzZXJzXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBhZGRVc2VyID0gZnVuY3Rpb24odXNlcjogQ2hhdFVzZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBBRERfQ0hBVF9VU0VSLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICB1c2VyOiB1c2VyXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCByZW1vdmVVc2VyID0gZnVuY3Rpb24oZW1haWw6IHN0cmluZykge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFJFTU9WRV9DSEFUX1VTRVIsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGVtYWlsOiBlbWFpbFxuICAgICAgICB9XG4gICAgfVxufVxuXG4vKiBBc3luYyBGdW5jdGlvbnMgKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFsbFVzZXJzID0gKCkgPT4ge1xuICAgIHJldHVybiAoZGlzcGF0Y2g6IERpc3BhdGNoKSA9PiB7XG4gICAgICAgIHJldHVybiBheGlvcy5nZXQoJy9hcGkvdjEvdXNlcnMnKS50aGVuKChyZXM6IEF4aW9zUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGxldCB1c2VyczogU3RhdGUgPSB7fTtcbiAgICAgICAgICAgIHJlcy5kYXRhLnVzZXJzLmZvckVhY2goKHU6IENoYXRVc2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgdXNlcnNbdS5lbWFpbF0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IHUucm9sZSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdS5uYW1lXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGlzcGF0Y2godXBkYXRlVXNlcnModXNlcnMpKTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0pLmNhdGNoKChlcnI6IEF4aW9zRXJyb3IpID0+IHtcbiAgICAgICAgICAgIGRpc3BhdGNoKGFkZEVycm9yKCdGZXRjaGluZyBhbGwgdXNlcnMgZmFpbGVkJykpO1xuICAgICAgICAgICAgcmV0dXJuIGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlTmV3VXNlciA9ICh1c2VyOiBDaGF0VXNlcikgPT4ge1xuICAgIHJldHVybiAoZGlzcGF0Y2g6IERpc3BhdGNoKSA9PiB7XG4gICAgICAgIHJldHVybiBheGlvcy5nZXQoJy9hcGkvdjEvJylcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBlZGl0VXNlciA9IChlbWFpbDogc3RyaW5nLCB1c2VyOiBDaGF0VXNlcikgPT4ge1xuXG59XG5cbmV4cG9ydCBjb25zdCBkZWxldGVVc2VyID0gKGVtYWlsOiBzdHJpbmcpID0+IHtcblxufSIsImV4cG9ydCBjb25zdCBBRERfRVJST1IgPSAnQUREX0VSUk9SJztcbmV4cG9ydCBjb25zdCBSRU1PVkVfRVJST1IgPSAnUkVNT1ZFX0VSUk9SJztcbmV4cG9ydCBjb25zdCBDTEVBUl9FUlJPUlMgPSAnQ0xFQVJfRVJST1JTJztcbmV4cG9ydCBjb25zdCBBRERfSU5GTyA9ICdBRERfSU5GTyc7XG5leHBvcnQgY29uc3QgUkVNT1ZFX0lORk8gPSAnUkVNT1ZFX0lORk8nO1xuZXhwb3J0IGNvbnN0IENMRUFSX0lORk9TID0gJ0NMRUFSX0lORk9TJztcblxuZXhwb3J0IGNvbnN0IGFkZEVycm9yID0gKGVycm9yOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBBRERfRVJST1IsXG4gICAgICAgIGRhdGE6IGVycm9yXG4gICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IHJlbW92ZUVycm9yID0gKGk6IG51bWJlcikgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFJFTU9WRV9FUlJPUixcbiAgICAgICAgZGF0YTogaVxuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCBjbGVhckVycm9ycyA9ICgpID0+IHtcbiAgICByZXR1cm4geyB0eXBlOiBDTEVBUl9FUlJPUlMgfTtcbn1cblxuZXhwb3J0IGNvbnN0IGFkZEluZm8gPSAoaW5mbzogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogQUREX0lORk8sXG4gICAgICAgIGRhdGE6IGluZm9cbiAgICB9O1xufVxuXG5leHBvcnQgY29uc3QgcmVtb3ZlSW5mbyA9IChpOiBudW1iZXIpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBSRU1PVkVfSU5GTyxcbiAgICAgICAgZGF0YTogaVxuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCBjbGVhckluZm9zID0gKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IENMRUFSX0lORk9TXG4gICAgfTtcbn1cbiIsImV4cG9ydCBjb25zdCBUT0dHTEVfU0lERUJBUl9PUEVOID0gJ1RPR0dMRV9TSURFQkFSX09QRU4nO1xuXG5leHBvcnQgY29uc3QgdG9nZ2xlU2lkZWJhck9wZW4gPSAoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogVE9HR0xFX1NJREVCQVJfT1BFTlxuICAgIH1cbn0iLCJpbXBvcnQgKiBhcyBpbyBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7IERpc3BhdGNoIH0gZnJvbSAncmVkdXgnO1xuXG5pbXBvcnQge1N0YXRlfSBmcm9tICcuLi9zdG9yZSc7XG5cbmV4cG9ydCBjb25zdCBJTklUX1dFQlNPQ0tFVCA9ICdJTklUX1dFQlNPQ0tFVCc7XG5leHBvcnQgY29uc3QgU0VUX1NPQ0tFVF9DT05ORUNURUQgPSAnU0VUX1NPQ0tFVF9DT05ORUNURUQnO1xuZXhwb3J0IGNvbnN0IFNFVF9TT0NLRVRfQ09OTkVDVEVEX1VTRVJTID0gJ1NFVF9TT0NLRVRfQ09OTkVDVEVEX1VTRVJTJztcblxuZXhwb3J0IGNvbnN0IGluaXRXZWJzb2NrZXQgPSAoaW86IFNvY2tldElPQ2xpZW50LlNvY2tldCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IElOSVRfV0VCU09DS0VULFxuICAgICAgICBkYXRhOiB7IGlvOiBpbyB9XG4gICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IHNldFNvY2tldENvbm5lY3RlZCA9IChjb25uZWN0ZWQ6IGJvb2xlYW4pID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBTRVRfU09DS0VUX0NPTk5FQ1RFRCxcbiAgICAgICAgZGF0YTogeyBjb25uZWN0ZWQ6IGNvbm5lY3RlZCB9XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3Qgc2V0U29ja2V0Q29ubmVjdGVkVXNlcnMgPSAodXNlckVtYWlsczogc3RyaW5nW10pID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBTRVRfU09DS0VUX0NPTk5FQ1RFRF9VU0VSUyxcbiAgICAgICAgZGF0YTogeyB1c2VyRW1haWxzOiB1c2VyRW1haWxzIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgIHJldHVybiAoZGlzcGF0Y2g6IERpc3BhdGNoLCBnZXRTdGF0ZTogRnVuY3Rpb24pID0+IHtcbiAgICAgICAgbGV0IHNvY2tldDogU29ja2V0SU9DbGllbnQuU29ja2V0ID0gaW8oKTtcbiAgICAgICAgc29ja2V0Lm9uKCdjb25uZWN0JywgKCkgPT4ge1xuICAgICAgICAgICAgc29ja2V0XG4gICAgICAgICAgICAgICAgLmVtaXQoJ2F1dGhlbnRpY2F0ZScsIHsgdG9rZW46IGdldFN0YXRlKCkudXNlci50b2tlbiB9KSAvL3NlbmQgdGhlIGp3dFxuICAgICAgICAgICAgICAgIC5vbignYXV0aGVudGljYXRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goc2V0U29ja2V0Q29ubmVjdGVkKHRydWUpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2F1dGhvcml6ZWQgWycgKyBzb2NrZXQuaWQgKyAnXScpO1xuICAgICAgICAgICAgICAgICAgICBzb2NrZXQub24oJ2Nvbm5lY3RlZCB1c2VycycsICh1c2VyRW1haWxzOiBzdHJpbmdbXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goc2V0U29ja2V0Q29ubmVjdGVkVXNlcnModXNlckVtYWlscykpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5vbigndW5hdXRob3JpemVkJywgZnVuY3Rpb24gKG1zZzogYW55KSB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKHNldFNvY2tldENvbm5lY3RlZChmYWxzZSkpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInVuYXV0aG9yaXplZDogXCIgKyBKU09OLnN0cmluZ2lmeShtc2cuZGF0YSkpO1xuICAgICAgICAgICAgICAgICAgICBzb2NrZXQub2ZmKCdjb25uZWN0ZWQgdXNlcycpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnLmRhdGEudHlwZSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIHNvY2tldC5vbignZGlzY29ubmVjdCcsICgpID0+IHtcbiAgICAgICAgICAgIGRpc3BhdGNoKHNldFNvY2tldENvbm5lY3RlZChmYWxzZSkpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0Rpc2Nvbm5lY3RlZCBmcm9tIHdlYnNvY2tldCBzZXJ2ZXIsIGF0dGVtcHRpbmcgcmVjb25uZWN0Jyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkaXNwYXRjaChpbml0V2Vic29ja2V0KHNvY2tldCkpO1xuICAgIH1cbn0iLCJpbXBvcnQgYXhpb3MsIHsgQXhpb3NSZXNwb25zZSwgQXhpb3NFcnJvciB9IGZyb20gJ2F4aW9zJztcbmltcG9ydCB7U3RhdGUgYXMgVXNlclN0YXRlfSBmcm9tICcuLi9yZWR1Y2Vycy91c2VyJztcbmltcG9ydCB7Y2xlYXJDaGFubmVsc0RhdGF9IGZyb20gJy4vY2hhbm5lbHNBY3Rpb25zJztcbmltcG9ydCB7YWRkRXJyb3IsIGFkZEluZm99IGZyb20gJy4vbm90aWZpY2F0aW9uc0FjdGlvbnMnO1xuXG5leHBvcnQgY29uc3QgU0VUX0FVVEhPUklaRUQgPSAnU0VUX0FVVEhPUklaRUQnO1xuZXhwb3J0IGNvbnN0IFNFVF9VU0VSID0gJ1NFVF9VU0VSJztcbmV4cG9ydCBjb25zdCBMT0dPVVRfVVNFUiA9ICdMT0dPVVRfVVNFUic7XG5leHBvcnQgY29uc3QgU0VUX0pXVCA9ICdTRVRfSldUJztcblxuZXhwb3J0IGNvbnN0IHNldEF1dGhvcml6ZWQgPSAoYXV0aG9yaXplZDogYm9vbGVhbikgPT4ge1xuICAgIHJldHVybiAge1xuICAgICAgICB0eXBlOiBTRVRfQVVUSE9SSVpFRCxcbiAgICAgICAgZGF0YTogYXV0aG9yaXplZFxuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCBzZXRVc2VyID0gKHVzZXI6IFVzZXJTdGF0ZSkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFNFVF9VU0VSLFxuICAgICAgICBkYXRhOiB1c2VyXG4gICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IGxvZ291dFVzZXIgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogTE9HT1VUX1VTRVJcbiAgICB9O1xufVxuXG5leHBvcnQgY29uc3Qgc2V0Snd0ID0gKHRva2VuOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBTRVRfSldULFxuICAgICAgICBkYXRhOiB0b2tlblxuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCBsb2dvdXQgPSAoKSA9PiB7XG4gICAgcmV0dXJuIChkaXNwYXRjaDogYW55KSA9PiB7XG4gICAgICAgIGRpc3BhdGNoKGxvZ291dFVzZXIoKSk7XG4gICAgICAgIHJldHVybiBkaXNwYXRjaChjbGVhckNoYW5uZWxzRGF0YSgpKTtcbiAgICB9XG4gICAgXG59XG5cbi8qIEFzeW5jIEFjdGlvbnMgKi9cbmV4cG9ydCBjb25zdCB1cGRhdGVOYW1lID0gKG5hbWU6IHN0cmluZywgb25TdWNjZXNzPzogRnVuY3Rpb24pID0+IHtcbiAgICByZXR1cm4gKGRpc3BhdGNoOiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIGF4aW9zLnBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvbmFtZScsIHtcbiAgICAgICAgICAgIG5hbWU6IG5hbWVcbiAgICAgICAgfSkudGhlbigocmVzOiBBeGlvc1Jlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBkaXNwYXRjaChhZGRJbmZvKCdOYW1lIHVwZGF0ZWQnKSk7XG4gICAgICAgICAgICBpZiAob25TdWNjZXNzKSBvblN1Y2Nlc3MoKTtcbiAgICAgICAgfSkuY2F0Y2goKGVycjogQXhpb3NFcnJvcikgPT4ge1xuICAgICAgICAgICAgaWYgKGVyci5yZXNwb25zZSAmJiBlcnIucmVzcG9uc2UuZGF0YS5lcnJvcilcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2goYWRkRXJyb3IoZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTb21ldGhpbmcgd2VudCB3cm9uZyB1cGRhdGluZyB1c2VyIG5hbWUnLCBlcnIpO1xuICAgICAgICAgICAgZGlzcGF0Y2goYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byB1cGRhdGUgeW91ciBuYW1lLicpKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUVtYWlsID0gKGVtYWlsOiBzdHJpbmcsIG9uU3VjY2Vzcz86IEZ1bmN0aW9uKSA9PiB7XG4gICAgcmV0dXJuIChkaXNwYXRjaDogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiBheGlvcy5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL2VtYWlsJywge1xuICAgICAgICAgICAgZW1haWw6IGVtYWlsXG4gICAgICAgIH0pLnRoZW4oKHJlczogQXhpb3NSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgZGlzcGF0Y2goYWRkSW5mbygnRW1haWwgdXBkYXRlZCcpKTtcbiAgICAgICAgICAgIGlmIChvblN1Y2Nlc3MpIG9uU3VjY2VzcygpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyOiBBeGlvc0Vycm9yKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyLnJlc3BvbnNlICYmIGVyci5yZXNwb25zZS5kYXRhLmVycm9yKVxuICAgICAgICAgICAgICAgIHJldHVybiBkaXNwYXRjaChhZGRFcnJvcihlcnIucmVzcG9uc2UuZGF0YS5lcnJvcikpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1NvbWV0aGluZyB3ZW50IHdyb25nIHVwZGF0aW5nIHVzZXIgZW1haWwnLCBlcnIpO1xuICAgICAgICAgICAgZGlzcGF0Y2goYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byB1cGRhdGUgeW91ciBlbWFpbC4nKSk7XG4gICAgICAgIH0pO1xuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVQYXNzd29yZCA9IChvbGRQYXNzOiBzdHJpbmcsIG5ld1Bhc3M6IHN0cmluZywgb25TdWNjZXNzPzogRnVuY3Rpb24pID0+IHtcbiAgICByZXR1cm4gKGRpc3BhdGNoOiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIGF4aW9zLnBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvcGFzc3dvcmQnLCB7XG4gICAgICAgICAgICBvbGRQYXNzOiBvbGRQYXNzLFxuICAgICAgICAgICAgbmV3UGFzczogbmV3UGFzc1xuICAgICAgICB9KS50aGVuKChyZXM6IEF4aW9zUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGRpc3BhdGNoKGFkZEluZm8oJ1Bhc3N3b3JkIHVwZGF0ZWQnKSk7XG4gICAgICAgICAgICBpZiAob25TdWNjZXNzKSBvblN1Y2Nlc3MoKTtcbiAgICAgICAgfSkuY2F0Y2goKGVycjogQXhpb3NFcnJvcikgPT4ge1xuICAgICAgICAgICAgaWYgKGVyci5yZXNwb25zZSAmJiBlcnIucmVzcG9uc2UuZGF0YS5lcnJvcilcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2goYWRkRXJyb3IoZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTb21ldGhpbmcgd2VudCB3cm9uZyB1cGRhdGluZyB1c2VyIHBhc3N3b3JkJywgZXJyKTtcbiAgICAgICAgICAgIGRpc3BhdGNoKGFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gdXBkYXRlIHlvdXIgcGFzc3dvcmQuJykpO1xuICAgICAgICB9KTtcbiAgICB9O1xufSIsImltcG9ydCB7QUREX0NIQU5ORUxTLFxuICAgICAgICBTRVRfQ0hBTk5FTF9GRVRDSElOR19ORVdfTUVTU0FHRVMsXG4gICAgICAgIFNFVF9DSEFOTkVMX0hBU19NT1JFX01FU1NBR0VTLFxuICAgICAgICBBRERfUkVDRUlWRURfQ0hBTk5FTF9NRVNTQUdFLFxuICAgICAgICBBRERfUkVUUklFVkVEX0NIQU5ORUxfTUVTU0FHRVMsXG4gICAgICAgIElOQ1JFTUVOVF9DSEFOTkVMX1JFVFJJRVZFX01FU1NBR0VTX09GRlNFVCxcbiAgICAgICAgQ0xFQVJfQ0hBTk5FTFNfREFUQX1cbiAgICBmcm9tICcuLi9hY3Rpb25zL2NoYW5uZWxzQWN0aW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVzc2FnZSB7XG4gICAgdXNlckVtYWlsOiBzdHJpbmcsXG4gICAgY3JlYXRlZDogc3RyaW5nLFxuICAgIF9pZDogc3RyaW5nLFxuICAgIHRleHQ6IHN0cmluZ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENoYW5uZWwge1xuICAgIG5hbWU6IHN0cmluZyxcbiAgICBtZXNzYWdlczogTWVzc2FnZVtdLFxuICAgIHJldHJpZXZlTWVzc2FnZXNPZmZzZXQ6IG51bWJlcixcbiAgICBoYXNNb3JlTWVzc2FnZXM6IGJvb2xlYW5cbiAgICBmZXRjaGluZ05ld01lc3NhZ2VzOiBib29sZWFuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGUgZXh0ZW5kcyBBcnJheTxDaGFubmVsPiB7XG5cbn1cblxuaW50ZXJmYWNlIEFjdGlvbiB7XG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGRhdGE6IGFueVxufVxuXG5sZXQgaW5pdGlhbFN0YXRlOiBTdGF0ZSA9IFtdO1xuXG5leHBvcnQgY29uc3QgY2hhbm5lbEV4aXN0cyA9IChjaGFubmVsczogQ2hhbm5lbFtdIHwgU3RhdGUsIGNoYW5uZWxOYW1lOiBzdHJpbmcpOiBhbnkgPT4gIHtcbiAgICBsZXQgY2hhbm5lbCA9IGNoYW5uZWxzLmZpbmQoIChjOiBDaGFubmVsKSA9PiB7XG4gICAgICAgIHJldHVybiBjLm5hbWUgPT09IGNoYW5uZWxOYW1lO1xuICAgIH0pO1xuICAgIGlmICghY2hhbm5lbCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBjaGFubmVsO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGU6IFN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb246IEFjdGlvbikge1xuICAgIHN3aXRjaChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIEFERF9DSEFOTkVMUzpcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb24uZGF0YS5jaGFubmVscztcbiAgICAgICAgY2FzZSBJTkNSRU1FTlRfQ0hBTk5FTF9SRVRSSUVWRV9NRVNTQUdFU19PRkZTRVQ6IHtcbiAgICAgICAgICAgIGxldCBjaGFubmVsOiBDaGFubmVsID0gY2hhbm5lbEV4aXN0cyhzdGF0ZSwgYWN0aW9uLmRhdGEuY2hhbm5lbCk7XG4gICAgICAgICAgICBsZXQgaW5jcmVtZW50OiBudW1iZXIgPSBhY3Rpb24uZGF0YS5pbmNyZW1lbnQ7XG4gICAgICAgICAgICBpZiAoIWNoYW5uZWwpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVW5rbm93biBjaGFubmVsIHdoaWxlIGluY3JlbWVudGluZyBtZXNzYWdlcyBvZmZzZXQnLCBhY3Rpb24pO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBuZXdDaGFubmVsczogQ2hhbm5lbFtdID0gc3RhdGUubWFwKCAoYzogQ2hhbm5lbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGMubmFtZSA9PT0gY2hhbm5lbC5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGMucmV0cmlldmVNZXNzYWdlc09mZnNldCArPSBpbmNyZW1lbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3Q2hhbm5lbHM7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBTRVRfQ0hBTk5FTF9GRVRDSElOR19ORVdfTUVTU0FHRVM6XG4gICAgICAgICAgICBsZXQgY2hhbm5lbDogQ2hhbm5lbCA9IGNoYW5uZWxFeGlzdHMoc3RhdGUsIGFjdGlvbi5kYXRhLmNoYW5uZWxOYW1lKTtcbiAgICAgICAgICAgIGlmICghY2hhbm5lbCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVbmtub3duIGNoYW5uZWwgd2hpbGUgZmV0Y2hpbmcgbmV3IG1lc3NhZ2VzJywgYWN0aW9uKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbmV3Q2hhbm5lbHM6IENoYW5uZWxbXSA9IHN0YXRlLm1hcCggKGM6IENoYW5uZWwpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYy5uYW1lID09PSBhY3Rpb24uZGF0YS5jaGFubmVsTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjLmZldGNoaW5nTmV3TWVzc2FnZXMgPSBhY3Rpb24uZGF0YS5pc0ZldGNoaW5nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG5ld0NoYW5uZWxzO1xuICAgICAgICBjYXNlIFNFVF9DSEFOTkVMX0hBU19NT1JFX01FU1NBR0VTOiB7XG4gICAgICAgICAgICBsZXQgY2hhbm5lbDogQ2hhbm5lbCA9IGNoYW5uZWxFeGlzdHMoc3RhdGUsIGFjdGlvbi5kYXRhLmNoYW5uZWxOYW1lKTtcbiAgICAgICAgICAgIGxldCBoYXNNb3JlOiBib29sZWFuID0gYWN0aW9uLmRhdGEuaGFzTW9yZTtcbiAgICAgICAgICAgIGlmICghY2hhbm5lbCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVbmtub3duIGNoYW5uZWwgd2hpbGUgc2V0dGluZyBoYXNNb3JlIG1lc3NhZ2VzJywgYWN0aW9uKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbmV3Q2hhbm5lbHM6IENoYW5uZWxbXSA9IHN0YXRlLm1hcCggKGM6IENoYW5uZWwpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYy5uYW1lID09PSBhY3Rpb24uZGF0YS5jaGFubmVsTmFtZSlcbiAgICAgICAgICAgICAgICAgICAgYy5oYXNNb3JlTWVzc2FnZXMgPSBoYXNNb3JlO1xuICAgICAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3Q2hhbm5lbHM7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBBRERfUkVUUklFVkVEX0NIQU5ORUxfTUVTU0FHRVM6IHtcbiAgICAgICAgICAgIGxldCByZXRyaWV2ZWRNZXNzYWdlczogTWVzc2FnZVtdID0gYWN0aW9uLmRhdGEubWVzc2FnZXM7XG4gICAgICAgICAgICBsZXQgY2hhbm5lbE5hbWU6IHN0cmluZyA9IGFjdGlvbi5kYXRhLmNoYW5uZWxOYW1lO1xuICAgICAgICAgICAgbGV0IGNoYW5uZWw6IENoYW5uZWwgPSBjaGFubmVsRXhpc3RzKHN0YXRlLCBjaGFubmVsTmFtZSk7XG4gICAgICAgICAgICBpZighY2hhbm5lbCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVbmtub3duIGNoYW5uZWwgd2hpbGUgYWRkaW5nIHJldHJpZXZlZCBjaGFubmVsIG1lc3NhZ2VzJywgYWN0aW9uKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbmV3Q2hhbm5lbHM6IENoYW5uZWxbXSA9IHN0YXRlLm1hcCggKGM6IENoYW5uZWwpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYy5uYW1lID09PSBjaGFubmVsTmFtZSlcbiAgICAgICAgICAgICAgICAgICAgYy5tZXNzYWdlcyA9IHJldHJpZXZlZE1lc3NhZ2VzLmNvbmNhdChjLm1lc3NhZ2VzKTsvL2MubWVzc2FnZXMuY29uY2F0KG1lc3NhZ2VzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG5ld0NoYW5uZWxzO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQUREX1JFQ0VJVkVEX0NIQU5ORUxfTUVTU0FHRToge1xuICAgICAgICAgICAgbGV0IHJlY2VpdmVkTWVzc2FnZSA9IGFjdGlvbi5kYXRhLm1lc3NhZ2U7XG4gICAgICAgICAgICBsZXQgY2hhbm5lbE5hbWUgPSBhY3Rpb24uZGF0YS5jaGFubmVsTmFtZTtcbiAgICAgICAgICAgIGxldCBjaGFubmVsOiBDaGFubmVsID0gY2hhbm5lbEV4aXN0cyhzdGF0ZSwgY2hhbm5lbE5hbWUpO1xuICAgICAgICAgICAgaWYgKCFjaGFubmVsKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Vua25vd24gY2hhbm5lbCB3aGlsZSBhZGRpbmcgcmVjZWl2ZWQgbWVzc2FnZScsIHN0YXRlLCBhY3Rpb24pO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBuZXdDaGFubmVsczogQ2hhbm5lbFtdID0gc3RhdGUubWFwKChjOiBDaGFubmVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoYy5uYW1lID09PSBjaGFubmVsTmFtZSkgXG4gICAgICAgICAgICAgICAgICAgIGMubWVzc2FnZXMgPSBjLm1lc3NhZ2VzLmNvbmNhdChbcmVjZWl2ZWRNZXNzYWdlXSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIG5ld0NoYW5uZWxzO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ0xFQVJfQ0hBTk5FTFNfREFUQTpcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59IiwiaW1wb3J0IHtBbnlBY3Rpb259IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7VVBEQVRFX0NIQVRfVVNFUlMsIEFERF9DSEFUX1VTRVIsIFJFTU9WRV9DSEFUX1VTRVJ9XG4gICAgZnJvbSAnLi4vYWN0aW9ucy9jaGF0VXNlcnNBY3Rpb25zJztcblxuZXhwb3J0IGludGVyZmFjZSBTdGF0ZSB7XG4gICAgW2VtYWlsOiBzdHJpbmddOiB7XG4gICAgICAgIHJvbGU6IHN0cmluZyxcbiAgICAgICAgbmFtZTogc3RyaW5nLFxuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBDaGF0VXNlciB7XG4gICAgZW1haWw6IHN0cmluZyxcbiAgICByb2xlOiBzdHJpbmcsXG4gICAgbmFtZTogc3RyaW5nLFxufVxuXG5sZXQgaW5pdGlhbFN0YXRlOiBTdGF0ZSA9IHtcbiAgICBcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc3RhdGU6IFN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb246IEFueUFjdGlvbikge1xuICAgIHN3aXRjaChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIFVQREFURV9DSEFUX1VTRVJTOlxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbi5kYXRhLnVzZXJzO1xuICAgICAgICBjYXNlIEFERF9DSEFUX1VTRVI6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBbYWN0aW9uLmRhdGEudXNlci5lbWFpbF06IHtcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogYWN0aW9uLmRhdGEudXNlci5yb2xlLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBhY3Rpb24uZGF0YS51c2VyLm5hbWUsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgUkVNT1ZFX0NIQVRfVVNFUjpcbiAgICAgICAgICAgIGxldCBjbG9uZTogU3RhdGUgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSk7XG4gICAgICAgICAgICBkZWxldGUgY2xvbmVbYWN0aW9uLmRhdGEuZW1haWxdXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufSIsImltcG9ydCB7QUREX0VSUk9SLCBSRU1PVkVfRVJST1IsIENMRUFSX0VSUk9SUywgQUREX0lORk8sIFJFTU9WRV9JTkZPLCBDTEVBUl9JTkZPU31cbiAgICBmcm9tICcuLi9hY3Rpb25zL25vdGlmaWNhdGlvbnNBY3Rpb25zJztcblxuZXhwb3J0IGludGVyZmFjZSBTdGF0ZSB7XG4gICAgZXJyb3JzOiBzdHJpbmdbXSxcbiAgICBpbmZvczogc3RyaW5nW10sXG59XG5pbnRlcmZhY2UgQWN0aW9uIHtcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgZGF0YTogYW55XG59XG5cbmxldCBpbml0aWFsU3RhdGU6IFN0YXRlID0ge1xuICAgIGVycm9yczogW10sXG4gICAgaW5mb3M6IFtdXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHN0YXRlOiBTdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uOiBBY3Rpb24pIHtcbiAgICBzd2l0Y2goYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBBRERfRVJST1I6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtlcnJvcnM6IHN0YXRlLmVycm9ycy5jb25jYXQoW2FjdGlvbi5kYXRhXSl9KTtcbiAgICAgICAgY2FzZSBSRU1PVkVfRVJST1I6XG4gICAgICAgICAgICBsZXQgbmV3RXJyb3JzQXJyYXkgPSBzdGF0ZS5lcnJvcnMuc2xpY2UoKTtcbiAgICAgICAgICAgIG5ld0Vycm9yc0FycmF5LnNwbGljZShhY3Rpb24uZGF0YSwgMSk7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtlcnJvcnM6IG5ld0Vycm9yc0FycmF5fSk7XG4gICAgICAgIGNhc2UgQ0xFQVJfRVJST1JTOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCAge2Vycm9yczogW119KTtcbiAgICAgICAgY2FzZSBBRERfSU5GTzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge2luZm9zOiBzdGF0ZS5pbmZvcy5jb25jYXQoW2FjdGlvbi5kYXRhXSl9KTtcbiAgICAgICAgY2FzZSBSRU1PVkVfSU5GTzpcbiAgICAgICAgICAgIGxldCBuZXdJbmZvc0FycmF5ID0gc3RhdGUuaW5mb3Muc2xpY2UoKTtcbiAgICAgICAgICAgIG5ld0luZm9zQXJyYXkuc3BsaWNlKGFjdGlvbi5kYXRhLCAxKTtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBpbmZvczogbmV3SW5mb3NBcnJheSB9KTtcbiAgICAgICAgY2FzZSBDTEVBUl9JTkZPUzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge2luZm9zOiBbXX0pO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBBY3Rpb24gfSBmcm9tIFwicmVkdXhcIjtcbmltcG9ydCB7IFRPR0dMRV9TSURFQkFSX09QRU4gfSBmcm9tICcuLi9hY3Rpb25zL3NpZGViYXJBY3Rpb25zJztcblxuZXhwb3J0IGludGVyZmFjZSBTdGF0ZSB7XG4gICAgb3BlbjogYm9vbGVhblxufVxuXG5sZXQgaW5pdGlhbFN0YXRlOiBTdGF0ZSA9IHtcbiAgICBvcGVuOiB0cnVlXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHN0YXRlOiBTdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uOiBBY3Rpb24pIHtcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgVE9HR0xFX1NJREVCQVJfT1BFTjpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge29wZW46ICFzdGF0ZS5vcGVufSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufSIsImltcG9ydCB7IEFueUFjdGlvbiB9IGZyb20gXCJyZWR1eFwiO1xuaW1wb3J0ICogYXMgaW8gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5cbmltcG9ydCB7IElOSVRfV0VCU09DS0VULFxuICAgICAgICAgU0VUX1NPQ0tFVF9DT05ORUNURUQsXG4gICAgICAgICBTRVRfU09DS0VUX0NPTk5FQ1RFRF9VU0VSUyB9XG4gICAgZnJvbSAnLi4vYWN0aW9ucy9zb2NrZXRBY3Rpb25zJztcblxuZXhwb3J0IGludGVyZmFjZSBTdGF0ZSB7XG4gICAgaW86IFNvY2tldElPQ2xpZW50LlNvY2tldCB8IG51bGwsXG4gICAgY29ubmVjdGVkOiBib29sZWFuLFxuICAgIGNvbm5lY3RlZFVzZXJFbWFpbHM6IHN0cmluZ1tdXG59XG5cbmxldCBpbml0aWFsU3RhdGU6IFN0YXRlID0ge1xuICAgIGlvOiBudWxsLFxuICAgIGNvbm5lY3RlZDogZmFsc2UsXG4gICAgY29ubmVjdGVkVXNlckVtYWlsczogW11cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc3RhdGU6IFN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb246IEFueUFjdGlvbikge1xuICAgIHN3aXRjaChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIElOSVRfV0VCU09DS0VUOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7aW86IGFjdGlvbi5kYXRhLmlvfSk7XG4gICAgICAgIGNhc2UgU0VUX1NPQ0tFVF9DT05ORUNURUQ6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtjb25uZWN0ZWQ6IGFjdGlvbi5kYXRhLmNvbm5lY3RlZH0pO1xuICAgICAgICBjYXNlIFNFVF9TT0NLRVRfQ09OTkVDVEVEX1VTRVJTOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7Y29ubmVjdGVkVXNlckVtYWlsczogYWN0aW9uLmRhdGEudXNlckVtYWlscyB9KVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn0iLCJpbXBvcnQge1NFVF9BVVRIT1JJWkVELCBTRVRfVVNFUiwgTE9HT1VUX1VTRVIsIFNFVF9KV1R9IGZyb20gJy4uL2FjdGlvbnMvdXNlckFjdGlvbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0YXRlIHtcbiAgICBhdXRob3JpemVkPzogYm9vbGVhbixcbiAgICBlbWFpbD86IHN0cmluZyB8IGJvb2xlYW4sXG4gICAgbmFtZT86IHN0cmluZyB8IGJvb2xlYW4sXG4gICAgcm9sZT86IHN0cmluZyB8IGJvb2xlYW4sXG4gICAgand0Pzogc3RyaW5nIHwgYm9vbGVhbixcbn1cblxuaW50ZXJmYWNlIEFjdGlvbiB7XG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGRhdGE6IGFueVxufVxuXG5sZXQgaW5pdGlhbFN0YXRlIDogU3RhdGUgPSB7XG4gICAgYXV0aG9yaXplZDogZmFsc2UsXG4gICAgZW1haWw6IGZhbHNlLFxuICAgIG5hbWU6IGZhbHNlLFxuICAgIHJvbGU6IGZhbHNlLFxuICAgIGp3dDogZmFsc2UsXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc3RhdGU6IFN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb246IEFjdGlvbikge1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBTRVRfQVVUSE9SSVpFRDpcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYWN0aW9uLmRhdGEgIT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGEgbXVzdCBiZSBib29sZWFuIGZvciBTRVRfQVVUSE9SSVpFRCBhY3Rpb24nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWN0aW9uLmRhdGEgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge2F1dGhvcml6ZWQ6IGZhbHNlLCBlbWFpbDogZmFsc2V9KTtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge2F1dGhvcml6ZWQ6IGFjdGlvbi5kYXRhfSk7XG4gICAgICAgIGNhc2UgU0VUX1VTRVI6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIGFjdGlvbi5kYXRhKTtcbiAgICAgICAgY2FzZSBMT0dPVVRfVVNFUjpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgYXV0aG9yaXplZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbmFtZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZW1haWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJvbGU6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIGNhc2UgU0VUX0pXVDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge3Rva2VuOiBhY3Rpb24uZGF0YX0pO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn0iLCJpbXBvcnQge2NyZWF0ZVN0b3JlLCBjb21iaW5lUmVkdWNlcnMsIGFwcGx5TWlkZGxld2FyZSwgUmVkdWNlciwgU3RvcmVFbmhhbmNlcn0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHJlZHV4VGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnO1xuaW1wb3J0IHtjcmVhdGVMb2dnZXJ9IGZyb20gJ3JlZHV4LWxvZ2dlcic7XG5cbmltcG9ydCB1c2VyUmVkdWNlciwge1N0YXRlIGFzIFVzZXJTdGF0ZX0gZnJvbSAnLi9yZWR1Y2Vycy91c2VyJztcbmltcG9ydCBjaGFubmVsc1JlZHVjZXIsIHtTdGF0ZSBhcyBDaGFubmVsc1N0YXRlfSBmcm9tICcuL3JlZHVjZXJzL2NoYW5uZWxzJztcbmltcG9ydCBub3RpZmljYXRpb25zUmVkdWNlciwge1N0YXRlIGFzIE5vdGlmaWNhdGlvbnNTdGF0ZX0gZnJvbSAnLi9yZWR1Y2Vycy9ub3RpZmljYXRpb25zJztcbmltcG9ydCBzaWRlYmFyUmVkdWNlciwge1N0YXRlIGFzIFNpZGViYXJTdGF0ZX0gZnJvbSAnLi9yZWR1Y2Vycy9zaWRlYmFyJztcbmltcG9ydCBzb2NrZXRSZWR1Y2VyLCB7U3RhdGUgYXMgU29ja2V0U3RhdGV9IGZyb20gJy4vcmVkdWNlcnMvc29ja2V0JztcbmltcG9ydCBjaGF0VXNlcnNSZWR1Y2VyLCB7U3RhdGUgYXMgQ2hhdFVzZXJzU3RhdGV9IGZyb20gJy4vcmVkdWNlcnMvY2hhdFVzZXJzJztcblxuY29uc3QgZW52ID0gcmVxdWlyZSgnLi4vLi4vZW52Jyk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGUge1xuICAgIHVzZXI6IFVzZXJTdGF0ZSxcbiAgICBjaGFubmVsczogQ2hhbm5lbHNTdGF0ZSxcbiAgICBub3RpZmljYXRpb25zOiBOb3RpZmljYXRpb25zU3RhdGUsXG4gICAgc2lkZWJhcjogU2lkZWJhclN0YXRlLFxuICAgIHNvY2tldDogU29ja2V0U3RhdGUsXG4gICAgY2hhdFVzZXJzOiBDaGF0VXNlcnNTdGF0ZSxcbn1cblxuZXhwb3J0IGNvbnN0IHJvb3RSZWR1Y2VyOiBSZWR1Y2VyID0gY29tYmluZVJlZHVjZXJzKHtcbiAgICB1c2VyOiB1c2VyUmVkdWNlcixcbiAgICBjaGFubmVsczogY2hhbm5lbHNSZWR1Y2VyLFxuICAgIG5vdGlmaWNhdGlvbnM6IG5vdGlmaWNhdGlvbnNSZWR1Y2VyLFxuICAgIHNpZGViYXI6IHNpZGViYXJSZWR1Y2VyLFxuICAgIHNvY2tldDogc29ja2V0UmVkdWNlcixcbiAgICBjaGF0VXNlcnM6IGNoYXRVc2Vyc1JlZHVjZXIsXG59KTtcblxuZXhwb3J0IGNvbnN0IG1pZGRsZXdhcmU6IFN0b3JlRW5oYW5jZXIgPVxuICAgIGVudi5wcm9kdWN0aW9uIHx8IGVudi5kaXNhYmxlUmVkdXhMb2dnaW5nID9cbiAgICBhcHBseU1pZGRsZXdhcmUocmVkdXhUaHVuaykgOiBhcHBseU1pZGRsZXdhcmUocmVkdXhUaHVuaywgY3JlYXRlTG9nZ2VyKCkpO1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTdG9yZShyb290UmVkdWNlciwgbWlkZGxld2FyZSk7IiwiaW1wb3J0IHsgY29ubiwgYXBwIH0gZnJvbSAnLi4vc3JjL3NlcnZlci9zZXJ2ZXInO1xuaW1wb3J0IFVzZXIgZnJvbSAnLi4vc3JjL3NlcnZlci9tb2RlbHMvVXNlcic7XG5cbmNvbnN0IGRyb3BBbGxDb2xsZWN0aW9ucyA9ICgpID0+IHtcbiAgICBsZXQgcCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgVXNlci5kZWxldGVNYW55KHt9LCAoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgIH0pXG4gICAgfSlcbiAgICByZXR1cm4gcC50aGVuKCkuY2F0Y2goKGVycjogYW55KSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICB9KTtcbn1cblxuY29uc3QgTm90SW1wbGVtZW50ZWRFcnJvciA9IG5ldyBFcnJvcignVGVzdCBub3QgaW1wbGVtZW50ZWQnKTtcblxuYmVmb3JlKCdhbGwgdGVzdHMnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgLy8gd2FpdCBmb3IgY29ubmVjdGlvbiB0byBiZWdpbiB0ZXN0c1xuICAgIGNvbnNvbGUubG9nKHByb2Nlc3MudmVyc2lvbik7XG4gICAgY29ubi5vbignY29ubmVjdGVkJywgKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnc2VydmVyIHN0YXJ0ZWQnKTtcbiAgICAgICAgZG9uZSgpO1xuICAgIH0pO1xufSk7XG5iZWZvcmVFYWNoKCdyZXNldCBEQicsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAvLyBzdGFydCB3aXRoIGEgZnJlc2ggZGF0YWJhc2VcbiAgICBkcm9wQWxsQ29sbGVjdGlvbnMoKS50aGVuKCgpID0+IGRvbmUoKSk7XG59KTtcbmFmdGVyKCdhbGwgdGVzdHMnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgLy8gdGVhcmRvd24gREJcbiAgICBkcm9wQWxsQ29sbGVjdGlvbnMoKS50aGVuKCgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ0Nsb3NpbmcgY29ubmVjdGlvbnMnKTtcbiAgICAgICAgY29ubi5jbG9zZSgpO1xuICAgICAgICBkb25lKCk7XG4gICAgfSk7XG59KVxuXG5cblxuLyogV2ViICovXG5yZXF1aXJlKCcuL3dlYi90ZXN0U3RvcmUnKTtcbnJlcXVpcmUoJy4vd2ViL3Rlc3RBc3luY0FjdGlvbnMnKTtcblxuLyogU2VydmVyICovXG5yZXF1aXJlKCcuL3NlcnZlci90ZXN0QXV0aENvbnRyb2xsZXInKTtcbnJlcXVpcmUoJy4vc2VydmVyL3Rlc3RVc2VyQ29udHJvbGxlcicpO1xucmVxdWlyZSgnLi9zZXJ2ZXIvdGVzdE1lc3NhZ2VDb250cm9sbGVyJyk7XG5yZXF1aXJlKCcuL3NlcnZlci90ZXN0Q2hhbm5lbENvbnRyb2xsZXInKTtcblxuZXhwb3J0IHsgYXBwLCBkcm9wQWxsQ29sbGVjdGlvbnMsIE5vdEltcGxlbWVudGVkRXJyb3IgfTtcbiIsImltcG9ydCAqIGFzIHJlcXVlc3QgZnJvbSAnc3VwZXJ0ZXN0JztcbmltcG9ydCB7IGhhc2hTeW5jIH0gZnJvbSAnYmNyeXB0anMnO1xuaW1wb3J0IHsgYXBwLCBkcm9wQWxsQ29sbGVjdGlvbnMgfSBmcm9tICcuLi8nO1xuaW1wb3J0IFVzZXIsIHsgSVVzZXIgfSBmcm9tICcuLi8uLi9zcmMvc2VydmVyL21vZGVscy9Vc2VyJztcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuXG5jb25zdCBzZXNzaW9uID0gcmVxdWlyZSgnc3VwZXJ0ZXN0LXNlc3Npb24nKTtcblxuZGVzY3JpYmUoJ0F1dGggQ29udHJvbGxlcicsIGZ1bmN0aW9uKCkge1xuICAgIGRlc2NyaWJlKCdQT1NUIC9hcGkvdjEvbG9naW4nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgZHJvcEFsbENvbGxlY3Rpb25zKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHVzZXI6IElVc2VyID0gbmV3IFVzZXIoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnQWRyaWFuJyxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IGhhc2hTeW5jKCd0ZXN0JyksXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6ICd1c2VyJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB1c2VyLnNhdmUoKS50aGVuKCh1c2VyOiBJVXNlcikgPT4gZG9uZSgpKS5jYXRjaCgoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGxvZ2luIHRoZSB1c2VyJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChhcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICd0ZXN0J1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgyMDApXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRoZSBsb2dnZWQtaW4gdXNlciBkZXRhaWxzJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChhcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICd0ZXN0J1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgyMDApXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyOiBhbnksIHJlczogcmVxdWVzdC5SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGpzb246IGFueSA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoanNvbi5lbWFpbCwgJ3Rlc3RAdGVzdC5jb20nKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGpzb24ucm9sZSwgJ3VzZXInKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGpzb24ubmFtZSwgJ0FkcmlhbicpO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBhbiBlcnJvciBpZiB0aGUgZW1haWwgZG9lcyBub3QgZXhpc3QnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS9sb2dpbicpXG4gICAgICAgICAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgICAgICAgICBlbWFpbDogJ3Rlc3QuZG9lcy5ub3QuZXhpdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAndGVzdCdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAxKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycjogYW55LCByZXM6IHJlcXVlc3QuUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBqc29uOiBhbnkgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGpzb24uZXJyb3IsICdJbnZhbGlkIGVtYWlsIG9yIHBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGFuIGVycm9yIGlmIHRoZSBwYXNzd29yZCBkb2VzIG5vdCBtYXRjaCB0aGUgaGFzaCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL2xvZ2luJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAndGVzdC1pbnZhbGlkLXBhc3N3b3JkJ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDEpXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyOiBhbnksIHJlczogcmVxdWVzdC5SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGpzb246IGFueSA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoanNvbi5lcnJvciwgJ0ludmFsaWQgZW1haWwgb3IgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYW4gZXJyb3IgaWYgdGhlIGVtYWlsIG9yIHBhc3N3b3JkIGlzIG1pc3NpbmcnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS9sb2dpbicpXG4gICAgICAgICAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogJ3Rlc3QnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMClcbiAgICAgICAgICAgICAgICAuZW5kKChlcnI6IGFueSwgcmVzOiByZXF1ZXN0LlJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICBsZXQganNvbjogYW55ID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChqc29uLmVycm9yLCAnUGxlYXNlIHN1cHBseSBhbiBlbWFpbCBhbmQgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdChhcHApXG4gICAgICAgICAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS9sb2dpbicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2VuZCh7ZW1haWw6ICd0ZXN0QHRlc3QuY29tJ30pXG4gICAgICAgICAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5lbmQoKGVycjogYW55LCByZXM6IHJlcXVlc3QuUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBqc29uOiBhbnkgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoanNvbi5lcnJvciwgJ1BsZWFzZSBzdXBwbHkgYW4gZW1haWwgYW5kIHBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGFuIGVycm9yIGlmIHRoZSBlbWFpbCBpcyBub3QgdmFsaWQnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcCkucG9zdCgnL2FwaS92MS9sb2dpbicpXG4gICAgICAgICAgICAgICAgLnNlbmQoe2VtYWlsOiAnbm90IGFuIGVtYWlsQGFzZGYnLCBwYXNzd29yZDogJzEyMzQnfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMClcbiAgICAgICAgICAgICAgICAuZW5kKChlcnI6IGFueSwgcmVzOiByZXF1ZXN0LlJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICBsZXQganNvbjogYW55ID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChqc29uLmVycm9yLCAnTm90IGEgdmFsaWQgZW1haWwgYWRkcmVzcycpO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ1BPU1QgL2FwaS92MS9yZWdpc3RlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICBkcm9wQWxsQ29sbGVjdGlvbnMoKS50aGVuKCgpID0+IGRvbmUoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJlZ2lzdGVyIGEgdXNlcicsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoYXBwKS5wb3N0KCcvYXBpL3YxL3JlZ2lzdGVyJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7ZW1haWw6ICd0ZXN0QHRlc3QuY29tJywgcGFzc3dvcmQ6ICd0ZXN0J30pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgyMDApXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyOiBhbnksIHJlczogcmVxdWVzdC5SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZihlcnIpIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIFVzZXIuZmluZEJ5RW1haWwoJ3Rlc3RAdGVzdC5jb20nKS5leGVjKCkudGhlbigodXNlcjogSVVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5mYWlsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBjcmVhdGUgYW4gYWRtaW4gdXNlciBpZiBubyB1c2VycyBleGlzdCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcCkucG9zdCgnL2FwaS92MS9yZWdpc3RlcicpXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nLCBwYXNzd29yZDogJ3Rlc3QnIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgyMDApXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyOiBhbnksIHJlczogcmVxdWVzdC5SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICBVc2VyLmZpbmRCeUVtYWlsKCd0ZXN0QHRlc3QuY29tJykuZXhlYygpLnRoZW4oKHVzZXI6IElVc2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZmFpbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHVzZXIucm9sZSwgJ2FkbWluJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnI6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgY3JlYXRlIGEgcmVndWxhciB1c2VyIGlmIHVzZXJzIGV4aXN0JywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgbGV0IHUgPSBuZXcgVXNlcih7XG4gICAgICAgICAgICAgICAgbmFtZTogJ3Rlc3QnLFxuICAgICAgICAgICAgICAgIGVtYWlsOiAnYWRtaW5AdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAncGFzc3dvcmQnLFxuICAgICAgICAgICAgICAgIHJvbGU6ICdhZG1pbidcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB1LnNhdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0KGFwcCkucG9zdCgnL2FwaS92MS9yZWdpc3RlcicpXG4gICAgICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICd0ZXN0QHRlc3QuY29tJywgcGFzc3dvcmQ6ICd0ZXN0JyB9KVxuICAgICAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMClcbiAgICAgICAgICAgICAgICAgICAgLmVuZCgoZXJyOiBhbnksIHJlczogcmVxdWVzdC5SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFVzZXIuZmluZEJ5RW1haWwoJ3Rlc3RAdGVzdC5jb20nKS5leGVjKCkudGhlbigodXNlcjogSVVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmZhaWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHVzZXIucm9sZSwgJ3VzZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYW4gZXJyb3IgaWYgZW1haWwgb3IgcGFzc3dvcmQgbm90IHByb3ZpZGVkJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChhcHApLnBvc3QoJy9hcGkvdjEvcmVnaXN0ZXInKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycjogYW55LCByZXM6IHJlcXVlc3QuUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGpzb246IGFueSA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoanNvbi5lcnJvciwgJ1BsZWFzZSBzdXBwbHkgYW4gZW1haWwgYW5kIHBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QoYXBwKS5wb3N0KCcvYXBpL3YxL3JlZ2lzdGVyJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZW5kKHtwYXNzd29yZDogJzEyMyd9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmV4cGVjdCg0MDApXG4gICAgICAgICAgICAgICAgICAgICAgICAuZW5kKChlcnI6IGFueSwgcmVzOiByZXF1ZXN0LlJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZXJyKSByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBqc29uOiBhbnkgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoanNvbi5lcnJvciwgJ1BsZWFzZSBzdXBwbHkgYW4gZW1haWwgYW5kIHBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBhbiBlcnJvciBpZiBub3QgYSB2YWxpZCBlbWFpbCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoYXBwKS5wb3N0KCcvYXBpL3YxL3JlZ2lzdGVyJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7ZW1haWw6ICdub3QgYW4gZW1haWwgQCBhc2RsZmtqO2wnLCBwYXNzd29yZDogJzEyMzQnfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMClcbiAgICAgICAgICAgICAgICAuZW5kKChlcnI6IGFueSwgcmVzOiByZXF1ZXN0LlJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBqc29uOiBhbnkgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGpzb24uZXJyb3IsICdOb3QgYSB2YWxpZCBlbWFpbCBhZGRyZXNzJyk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ1BPU1QgL2FwaS92MS9sb2dvdXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHRlc3RTZXNzaW9uOiBhbnk7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHRlc3RTZXNzaW9uID0gc2Vzc2lvbihhcHApO1xuICAgICAgICAgICAgZHJvcEFsbENvbGxlY3Rpb25zKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHVzZXI6IElVc2VyID0gbmV3IFVzZXIoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnQWRyaWFuJyxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IGhhc2hTeW5jKCd0ZXN0JyksXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6ICd1c2VyJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB1c2VyLnNhdmUoKS50aGVuKCh1c2VyOiBJVXNlcikgPT4gZG9uZSgpKS5jYXRjaCgoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGxvZyBvdXQgdGhlIHVzZXInLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICB0ZXN0U2Vzc2lvbi5wb3N0KCcvYXBpL3YxL2xvZ2luJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7ZW1haWw6ICd0ZXN0QHRlc3QuY29tJywgcGFzc3dvcmQ6ICd0ZXN0J30pLmVuZCgoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgdGVzdFNlc3Npb24uZ2V0KCcvYXBpL3YxL3VzZXInKS5zZW5kKCkuZXhwZWN0KDIwMCkuZW5kKChlcnI6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlc3RTZXNzaW9uLmdldCgnL2FwaS92MS9sb2dvdXQnKS5zZW5kKCkuZXhwZWN0KDIwMCkuZW5kKChlcnI6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVzdFNlc3Npb24uZ2V0KCcvYXBpL3YxL3VzZXInKS5zZW5kKCkuZXhwZWN0KDQwMSkuZW5kKGRvbmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ1BPU1QgL2FwaS92MS92ZXJpZnlFbWFpbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICBkcm9wQWxsQ29sbGVjdGlvbnMoKS50aGVuKCgpID0+IGRvbmUoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHZlcmlmeSBhbiBlbWFpbCBnaXZlbiB0aGUgY29ycmVjdCB2ZXJpZmljYXRpb24gbGluaycpO1xuICAgICAgICBpdCgnc2hvdWxkIG5vdCB2ZXJpZnkgYW4gZW1haWwgd2l0aCBhbiBpbmNvcnJlY3QgdmVyaWZpY2F0aW9uIGxpbmsnKTtcbiAgICB9KTtcbn0pOyIsImltcG9ydCAqIGFzIHJlcXVlc3QgZnJvbSAnc3VwZXJ0ZXN0JztcbmltcG9ydCB7IGhhc2hTeW5jIH0gZnJvbSAnYmNyeXB0anMnO1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCB7IGFwcCwgZHJvcEFsbENvbGxlY3Rpb25zIH0gZnJvbSAnLi4vJztcbmltcG9ydCBVc2VyLCB7IElVc2VyIH0gZnJvbSAnLi4vLi4vc3JjL3NlcnZlci9tb2RlbHMvVXNlcic7XG5cbmRlc2NyaWJlKCdVc2VyIENvbnRyb2xsZXInLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgdG9rZW46IHN0cmluZztcbiAgICBsZXQgdXNlckluZm8gPSB7XG4gICAgICAgIG5hbWU6ICdBZHJpYW4nLFxuICAgICAgICBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nLFxuICAgICAgICBwYXNzd29yZDogJ3Rlc3QnLFxuICAgICAgICByb2xlOiAnYWRtaW4nXG4gICAgfTtcblxuICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICBkcm9wQWxsQ29sbGVjdGlvbnMoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGxldCB1c2VyOiBJVXNlciA9IG5ldyBVc2VyKHtcbiAgICAgICAgICAgICAgICBuYW1lOiB1c2VySW5mby5uYW1lLFxuICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VySW5mby5lbWFpbCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogaGFzaFN5bmModXNlckluZm8ucGFzc3dvcmQpLFxuICAgICAgICAgICAgICAgIHJvbGU6IHVzZXJJbmZvLnJvbGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHVzZXIuc2F2ZSgpLnRoZW4oKHVzZXI6IElVc2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gb25jZSB1c2VyIGlzIGNyZWF0ZWQsIGxvZ2luIGFuZCBzdG9yZSBqd3RcbiAgICAgICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgICAgICAuc2VuZCh7ZW1haWw6IHVzZXJJbmZvLmVtYWlsLCBwYXNzd29yZDogdXNlckluZm8ucGFzc3dvcmR9KVxuICAgICAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMClcbiAgICAgICAgICAgICAgICAgICAgLmVuZCgoZXJyOiBhbnksIHJlczogcmVxdWVzdC5SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSByZXMuZ2V0KCd4LWFjY2Vzcy10b2tlbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmlzTm90TnVsbCh0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQuaXNTdHJpbmcodG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmlzTm90RW1wdHkodG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnI6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdHRVQgL2FwaS92MS91c2VyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgZmV0Y2ggdGhlIGxvZ2dlZCBpbiB1c2VyJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoYXBwKVxuICAgICAgICAgICAgICAgIC5nZXQoJy9hcGkvdjEvdXNlcicpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMCwgKGVycjogYW55LCByZXM6IHJlcXVlc3QuUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlcy5ib2R5Lm5hbWUsIHVzZXJJbmZvLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocmVzLmJvZHkuZW1haWwsIHVzZXJJbmZvLmVtYWlsKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlcy5ib2R5LnJvbGUsIHVzZXJJbmZvLnJvbGUpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQubm90UHJvcGVydHkocmVzLmJvZHksICdwYXNzd29yZCcpO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgbm90IGxvZ2dlZCBpbicsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAuZ2V0KCcvYXBpL3YxL3VzZXInKVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAxLCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ0dFVCAvYXBpL3YxL3VzZXJzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgcmVjZWl2ZSBhIGxpc3Qgb2YgdXNlcnMnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChhcHApXG4gICAgICAgICAgICAgICAgLmdldCgnL2FwaS92MS91c2VycycpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMCwgKGVycjogYW55LCByZXM6IHJlcXVlc3QuUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlcy5ib2R5LnVzZXJzLmxlbmd0aCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5pbmNsdWRlKHJlcy5ib2R5LnVzZXJzWzBdLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB1c2VySW5mby5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogdXNlckluZm8ucm9sZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VySW5mby5lbWFpbFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBhc3NlcnQubm90UHJvcGVydHkocmVzLmJvZHkudXNlcnNbMF0sICdwYXNzd29yZCcpO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgbm90IGxvZ2dlZCBpbicsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAuZ2V0KCcvYXBpL3YxL3VzZXJzJylcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMSwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdHRVQgL2FwaS92MS91c2VyLzplbWFpbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIHJldHJpZXZlIGEgdXNlciBieSBlbWFpbCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAuZ2V0KCcvYXBpL3YxL3VzZXIvJyArIHVzZXJJbmZvLmVtYWlsKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgyMDAsIChlcnI6IGFueSwgcmVzOiByZXF1ZXN0LlJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5oYXNBbGxLZXlzKHJlcy5ib2R5LnVzZXIsIFsnZW1haWwnLCAnbmFtZScsICdyb2xlJywgJ19pZCcsICdjcmVhdGVkJ10pO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuaW5jbHVkZShyZXMuYm9keS51c2VyLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogdXNlckluZm8uZW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB1c2VySW5mby5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogdXNlckluZm8ucm9sZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiBlbWFpbCBkb2VzIG5vdCBleGlzdCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAuZ2V0KCcvYXBpL3YxL3VzZXIvbm90LmluLnVzZUB0ZXN0LmNvbScpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMCwgKGVycjogYW55LCByZXM6IHJlcXVlc3QuUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmlzU3RyaW5nKHJlcy5ib2R5LmVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlcy5ib2R5LmVycm9yLCAnTm8gdXNlciBmb3VuZCB3aXRoIHRoYXQgZW1haWwnKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIG5vdCBhIHZhbGlkIGVtYWlsJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoYXBwKVxuICAgICAgICAgICAgICAgIC5nZXQoJy9hcGkvdjEvdXNlci9ub3QtYW4tZW1haWwnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDAsIChlcnI6IGFueSwgcmVzOiByZXF1ZXN0LlJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5pc1N0cmluZyhyZXMuYm9keS5lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXMuYm9keS5lcnJvciwgJ1BsZWFzZSBzdXBwbHkgYSB2YWxpZCBlbWFpbCcpO1xuICAgICAgICAgICAgICAgICAgICBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdQT1NUIC9hcGkvdjEvdXNlci91cGRhdGUvZW1haWwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoXCJzaG91bGQgdXBkYXRlIHRoZSBsb2dnZWQgaW4gdXNlcidzIGVtYWlsXCIsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICBsZXQgbmV3RW1haWwgPSAnbmV3LmVtYWlsQHRlc3QuY29tJztcbiAgICAgICAgICAgIHJlcXVlc3QoYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL2VtYWlsJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6IG5ld0VtYWlsIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgyMDAsIChlcnI6IGFueSwgcmVzOiByZXF1ZXN0LlJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QoYXBwKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgnL2FwaS92MS91c2VyJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5lZWQgdG8gdXNlIG5ldyBhY2Nlc3MgdG9rZW5cbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgcmVzLmdldCgneC1hY2Nlc3MtdG9rZW4nKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwLCAoZXJyOiBhbnksIHJlczogcmVxdWVzdC5SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXMuYm9keS5uYW1lLCB1c2VySW5mby5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocmVzLmJvZHkuZW1haWwsIG5ld0VtYWlsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocmVzLmJvZHkucm9sZSwgdXNlckluZm8ucm9sZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgbmV3IGVtYWlsIGlzIG5vdCB2YWxpZCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9lbWFpbCcpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAnbm90IGFuIGVtYWlsJyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwLCBkb25lKTtcbiAgICAgICAgfSlcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIGVtYWlsIGFscmVhZHkgaW4gdXNlJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL2VtYWlsJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwLCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiBub3QgYXV0aG9yaXplZCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9lbWFpbCcpXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDEsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnUE9TVCAvYXBpL3YxL3VzZXIvdXBkYXRlL25hbWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCB1cGRhdGUgbmFtZScsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICBsZXQgbmV3TmFtZSA9ICduZXcgbmFtZSc7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9uYW1lJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgbmFtZTogbmV3TmFtZSB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwLCAoZXJyOiBhbnksIHJlczogcmVxdWVzdC5SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoJy9hcGkvdjEvdXNlcicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHJlcy5nZXQoJ3gtYWNjZXNzLXRva2VuJykpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMCwgKGVycjogYW55LCByZXM6IHJlcXVlc3QuUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocmVzLmJvZHkubmFtZSwgbmV3TmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlcy5ib2R5LmVtYWlsLCB1c2VySW5mby5lbWFpbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlcy5ib2R5LnJvbGUsIHVzZXJJbmZvLnJvbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIG5vdCBhdXRob3JpemVkJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIGxldCBuZXdOYW1lID0gJ25ldyBuYW1lJztcbiAgICAgICAgICAgIHJlcXVlc3QoYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL25hbWUnKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgbmFtZTogbmV3TmFtZSB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAxLCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ1BPU1QgL2FwaS92MS91c2VyL3VwZGF0ZS9wYXNzd29yZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIHVwZGF0ZSBwYXNzd29yZCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICBsZXQgbmV3UGFzcyA9ICduZXdwYXNzJztcbiAgICAgICAgICAgIHJlcXVlc3QoYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL3Bhc3N3b3JkJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgb2xkUGFzczogdXNlckluZm8ucGFzc3dvcmQsIG5ld1Bhc3M6IG5ld1Bhc3MgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMCwgKGVycjogYW55LCByZXM6IHJlcXVlc3QuUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdChhcHApXG4gICAgICAgICAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS9sb2dpbicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiB1c2VySW5mby5lbWFpbCwgcGFzc3dvcmQ6IG5ld1Bhc3MgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwLCBkb25lKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCB1cGRhdGluZyBwYXNzd29yZCBpZiBjdXJyZW50IHBhc3N3b3JkIGludmFsaWQnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgICAgIHJlcXVlc3QoYXBwKVxuICAgICAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9wYXNzd29yZCcpXG4gICAgICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgICAgIC5zZW5kKHsgb2xkUGFzczogJ3dyb25nIHBhc3N3b3JkJywgbmV3UGFzczogJzEyMzQxMjM0JyB9KVxuICAgICAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMCwgZG9uZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIHVwZGF0aW5nIHBhc3N3b3JkIGlmIG5vdCBhdXRob3JpemVkJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL3Bhc3N3b3JkJylcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMSwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdQT1NUIC9hcGkvdjEvdXNlci9jcmVhdGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IG5ld1VzZXIgPSB7XG4gICAgICAgICAgICBlbWFpbDogJ3Rlc3QxMjNAdGVzdC5jb20nLFxuICAgICAgICAgICAgbmFtZTogJ05ldyBVc2VyJyxcbiAgICAgICAgICAgIHJvbGU6ICd1c2VyJyxcbiAgICAgICAgfVxuICAgICAgICBpdCgnc2hvdWxkIGNyZWF0ZSBhIG5ldyB1c2VyJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgLy8gYXNzZXJ0IHRoYXQgdXNlciBkb2Vzbid0IGFscmVhZHkgZXhpc3QsIGZvciBzYW5pdHlcbiAgICAgICAgICAgIFVzZXIuZmluZEJ5RW1haWwobmV3VXNlci5lbWFpbCkuY291bnREb2N1bWVudHMoKGVyciwgY291bnQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNvdW50LCAwLCAnVXNlciBzaG91bGQgbm90IGV4aXN0IHdpdGggZW1haWwgdGVzdDEyM1d0ZXN0LmNvbScpO1xuICAgICAgICAgICAgICAgIHJlcXVlc3QoYXBwKVxuICAgICAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL2NyZWF0ZScpXG4gICAgICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgICAgIC5zZW5kKG5ld1VzZXIpXG4gICAgICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwLCAoZXJyOiBhbnksIHJlczogcmVxdWVzdC5SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFVzZXIuZmluZEJ5RW1haWwobmV3VXNlci5lbWFpbCkuZXhlYygoZXJyLCB1c2VyOiBJVXNlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmRlZXBJbmNsdWRlKHVzZXIsIG5ld1VzZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIHVzZXIgbWFraW5nIHJlcXVlc3QgaXMgbm90IGFuIGFkbWluJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgbGV0IHVzZXI6IElVc2VyID0gbmV3IFVzZXIoe1xuICAgICAgICAgICAgICAgIG5hbWU6IG5ld1VzZXIubmFtZSxcbiAgICAgICAgICAgICAgICBlbWFpbDogbmV3VXNlci5lbWFpbCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogaGFzaFN5bmMoJ3Bhc3N3b3JkJyksXG4gICAgICAgICAgICAgICAgcm9sZTogbmV3VXNlci5yb2xlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB1c2VyLnNhdmUoKS50aGVuKCh1c2VyOiBJVXNlcikgPT4ge1xuICAgICAgICAgICAgICAgIC8vIG9uY2UgdXNlciBpcyBjcmVhdGVkLCBsb2dpbiBhbmQgc3RvcmUgand0XG4gICAgICAgICAgICAgICAgcmVxdWVzdChhcHApXG4gICAgICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL2xvZ2luJylcbiAgICAgICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogbmV3VXNlci5lbWFpbCwgcGFzc3dvcmQ6ICdwYXNzd29yZCcgfSlcbiAgICAgICAgICAgICAgICAgICAgLmV4cGVjdCgyMDApXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoKGVycjogYW55LCByZXM6IHJlcXVlc3QuUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuID0gcmVzLmdldCgneC1hY2Nlc3MtdG9rZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3QoYXBwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL3VzZXIvY3JlYXRlJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5leHBlY3QoNDAxLCBkb25lKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiB1c2VyIGlzIG5vdCBsb2dnZWQgaW4nLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL2NyZWF0ZScpXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDEsIGRvbmUpO1xuICAgICAgICB9KVxuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgZW1haWwgaXMgbm90IHZhbGlkJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChhcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvdXNlci9jcmVhdGUnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgICAgICAgICBlbWFpbDogJ25vdCB2YWxpZCcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5ld1VzZXIubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogbmV3VXNlci5yb2xlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMCwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgcm9sZSBub3QgdmFsaWQnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL2NyZWF0ZScpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiBuZXdVc2VyLmVtYWlsLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBuZXdVc2VyLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6ICdub3QgdmFsaWQnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMCwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgZW1haWwgYWRkcmVzcyBhbHJlYWR5IGluIHVzZScsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL3VzZXIvY3JlYXRlJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IHVzZXJJbmZvLmVtYWlsLCAvL2FscmVhZHkgaW4gdXNlXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5ld1VzZXIubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogbmV3VXNlci5yb2xlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMCwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdQVVQgL2FwaS92MS91c2VyL3VwZGF0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgbmV3VXNlckluZm8gPSB7XG4gICAgICAgICAgICBuYW1lOiAnTmV3IE5hbWUnLFxuICAgICAgICAgICAgZW1haWw6ICduZXdlbWFpbEB0ZXN0LmNvbScsXG4gICAgICAgICAgICByb2xlOiAndXNlcidcbiAgICAgICAgfTtcblxuICAgICAgICBpdCgnc2hvdWxkIHVwZGF0ZSB0aGUgdXNlcicsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoYXBwKVxuICAgICAgICAgICAgICAgIC5wdXQoJy9hcGkvdjEvdXNlci91cGRhdGUnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoe2VtYWlsOiB1c2VySW5mby5lbWFpbCwgdXNlcjogbmV3VXNlckluZm99KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwLCAoZXJyOiBhbnksIHJlczogcmVxdWVzdC5SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICBVc2VyLmZpbmRCeUVtYWlsKG5ld1VzZXJJbmZvLmVtYWlsKS5leGVjKChlcnI6IGFueSwgdXNlcjogSVVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQuaXNOb3ROdWxsKHVzZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmRlZXBJbmNsdWRlKHVzZXIsIG5ld1VzZXJJbmZvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgdXNlciB3aXRoIGVtYWlsIGRvZXMgbm90IGV4aXN0JywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChhcHApXG4gICAgICAgICAgICAgICAgLnB1dCgnL2FwaS92MS91c2VyL3VwZGF0ZScpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7ZW1haWw6ICdkb2Vzbm90ZXhpc3RAdGVzdC5jb20nLCB1c2VyOiBuZXdVc2VySW5mb30pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDQsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIG5ldyBlbWFpbCBub3QgdmFsaWQnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAucHV0KCcvYXBpL3YxL3VzZXIvdXBkYXRlJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IHVzZXJJbmZvLmVtYWlsLFxuICAgICAgICAgICAgICAgICAgICB1c2VyOiBPYmplY3QuYXNzaWduKHt9LCBuZXdVc2VySW5mbywge2VtYWlsOiAnbm90IHZhbGlkJ30pXG4gICAgICAgICAgICAgICAgfSkuZXhwZWN0KDQwMCwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgcm9sZSBub3QgdmFsaWQnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KGFwcClcbiAgICAgICAgICAgICAgICAucHV0KCcvYXBpL3YxL3VzZXIvdXBkYXRlJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IHVzZXJJbmZvLmVtYWlsLFxuICAgICAgICAgICAgICAgICAgICB1c2VyOiBPYmplY3QuYXNzaWduKHt9LCBuZXdVc2VySW5mbywgeyByb2xlOiAnbm90IHZhbGlkJyB9KVxuICAgICAgICAgICAgICAgIH0pLmV4cGVjdCg0MDAsIGRvbmUpO1xuICAgICAgICB9KVxuICAgIH0pO1xufSk7IiwiaW1wb3J0ICdtb2NoYSc7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgTW9ja0FkYXB0ZXIgZnJvbSAnYXhpb3MtbW9jay1hZGFwdGVyJztcbmltcG9ydCBjb25maWd1cmVTdG9yZSwgeyBNb2NrU3RvcmVDcmVhdG9yLCBNb2NrU3RvcmVFbmhhbmNlZCB9IGZyb20gJ3JlZHV4LW1vY2stc3RvcmUnXG5pbXBvcnQgdGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnXG5pbXBvcnQgeyB1cGRhdGVOYW1lLCB1cGRhdGVFbWFpbCwgdXBkYXRlUGFzc3dvcmQgfSBmcm9tICcuLi8uLi9zcmMvd2ViL2FjdGlvbnMvdXNlckFjdGlvbnMnO1xuaW1wb3J0IHsgQW55QWN0aW9uIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgQUREX0lORk8sIEFERF9FUlJPUiwgYWRkRXJyb3IsIGFkZEluZm8gfSBmcm9tICcuLi8uLi9zcmMvd2ViL2FjdGlvbnMvbm90aWZpY2F0aW9uc0FjdGlvbnMnO1xuaW1wb3J0IHsgQ2hhbm5lbCwgTWVzc2FnZSB9IGZyb20gJy4uLy4uL3NyYy93ZWIvcmVkdWNlcnMvY2hhbm5lbHMnO1xuaW1wb3J0IHsgaW5pdCBhcyBpbml0V2Vic29ja2V0Q29ubmVjdGlvbiwgSU5JVF9XRUJTT0NLRVQgfSBmcm9tICcuLi8uLi9zcmMvd2ViL2FjdGlvbnMvc29ja2V0QWN0aW9ucyc7XG5pbXBvcnQgeyBmZXRjaENoYW5uZWxzLCBBRERfQ0hBTk5FTFMsIGFkZENoYW5uZWxzLCByZXRyaWV2ZUNoYW5uZWxNZXNzYWdlcywgc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMsIHNldENoYW5uZWxIYXNNb3JlTWVzc2FnZXMsIGluY3JlbWVudENoYW5uZWxSZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0LCBhZGRSZXRyaWV2ZWRDaGFubmVsTWVzc2FnZXMsIGRlbGV0ZUNoYW5uZWwsIGFkZENoYW5uZWwgfSBmcm9tICcuLi8uLi9zcmMvd2ViL2FjdGlvbnMvY2hhbm5lbHNBY3Rpb25zJztcbmltcG9ydCB7IGZldGNoQWxsVXNlcnMsIHVwZGF0ZVVzZXJzIH0gZnJvbSAnLi4vLi4vc3JjL3dlYi9hY3Rpb25zL2NoYXRVc2Vyc0FjdGlvbnMnO1xuaW1wb3J0IHsgU3RhdGUgYXMgQ2hhdFVzZXJzU3RhdGUgfSBmcm9tICcuLi8uLi9zcmMvd2ViL3JlZHVjZXJzL2NoYXRVc2Vycyc7XG5pbXBvcnQgeyBTdGF0ZSB9IGZyb20gJy4uLy4uL3NyYy93ZWIvc3RvcmUnO1xuXG5jb25zdCBtb2NrU3RvcmVDcmVhdG9yOiBNb2NrU3RvcmVDcmVhdG9yID0gY29uZmlndXJlU3RvcmUoW3RodW5rXSk7XG5cbmZ1bmN0aW9uIGdldFN0b3JlKHN0b3JlID0ge30pOiBNb2NrU3RvcmVFbmhhbmNlZDx7fSB8IFN0YXRlPiB7XG4gICAgcmV0dXJuIG1vY2tTdG9yZUNyZWF0b3Ioc3RvcmUpO1xufVxuXG5kZXNjcmliZSgnQXN5bmMgQWN0aW9ucycsIGZ1bmN0aW9uKCkge1xuICAgIGxldCBtb2NrU3RvcmU6IE1vY2tTdG9yZUVuaGFuY2VkPHt9LCBhbnk+O1xuICAgIGxldCBtb2NrQXhpb3M6IE1vY2tBZGFwdGVyO1xuXG4gICAgYmVmb3JlKGZ1bmN0aW9uKCkge1xuICAgICAgICBtb2NrQXhpb3MgPSBuZXcgTW9ja0FkYXB0ZXIoYXhpb3MpO1xuICAgIH0pO1xuXG4gICAgYWZ0ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgIG1vY2tBeGlvcy5yZXN0b3JlKCk7XG4gICAgfSk7XG4gICAgXG4gICAgZGVzY3JpYmUoJ1VzZXIgYXN5bmMgYWN0aW9ucycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG1vY2tTdG9yZSA9IGdldFN0b3JlKCk7XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5vbkFueSgpLnJlcGx5KDIwMCwge30pXG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGhhbmRsZSBjYWxsYmFjayBhbmQgc2V0IGluZm8gJyArXG4gICAgICAgICAgICdvbiBzdWNjZXNzZnVsIHBvc3QgcmVxdWVzdCB0byAvYXBpL3YxL3VzZXIvdXBkYXRlL25hbWUnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWUgOiBmYWxzZSB8IHN0cmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgICAgICAuZGlzcGF0Y2godXBkYXRlTmFtZSgnQWRyaWFuJywgKCkgPT4gbmFtZSA9ICdBZHJpYW4nKSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG5hbWUsICdBZHJpYW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnM6IEFueUFjdGlvbltdID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBBRERfSU5GTyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAnTmFtZSB1cGRhdGVkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgc2V0IGFuIGVycm9yIG9uIGZhaWxlZCBwb3N0IHJlcXVlc3QgdG8gL2FwaS92MS91c2VyL3VwZGF0ZS9uYW1lJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgbGV0IG5hbWUgOiBmYWxzZSB8IHN0cmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3Mub25Qb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL25hbWUnKS5yZXBseSg1MDAsIHtlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nJ30pO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKHVwZGF0ZU5hbWUoJ0FkcmlhbicsICgpID0+IG5hbWUgPSAnQWRyaWFuJykpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwobmFtZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25zOiBBbnlBY3Rpb25bXSA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEFERF9FUlJPUixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICdTb21ldGhpbmcgd2VudCB3cm9uZydcbiAgICAgICAgICAgICAgICAgICAgfV0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGhhbmRsZSBjYWxsYmFjayBhbmQgc2V0IGluZm8gJyArXG4gICAgICAgICAgICdvbiBzdWNjZXNzZnVsIHBvc3QgcmVxdWVzdCB0byAvYXBpL3YxL3VzZXIvdXBkYXRlL2VtYWlsJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgbGV0IGVtYWlsOiBmYWxzZSB8IHN0cmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKHVwZGF0ZUVtYWlsKCd0ZXN0QHRlc3QuY29tJywgKCkgPT4gZW1haWwgPSAndGVzdEB0ZXN0LmNvbScpKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGVtYWlsLCAndGVzdEB0ZXN0LmNvbScpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25zOiBBbnlBY3Rpb25bXSA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEFERF9JTkZPLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJ0VtYWlsIHVwZGF0ZWQnXG4gICAgICAgICAgICAgICAgICAgIH1dKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBzZXQgYW4gZXJyb3Igb24gZmFpbGVkIHBvc3QgcmVxdWVzdCB0byAvYXBpL3YxL3VzZXIvdXBkYXRlL2VtYWlsJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgbGV0IGVtYWlsOiBmYWxzZSB8IHN0cmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3Mub25Qb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL2VtYWlsJykucmVwbHkoNTAwLCB7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnIH0pO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKHVwZGF0ZUVtYWlsKCd0ZXN0QHRlc3QuY29tJywgKCkgPT4gZW1haWwgPSAndGVzdEB0ZXN0LmNvbScpKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UoZW1haWwpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25zOiBBbnlBY3Rpb25bXSA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEFERF9FUlJPUixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICdTb21ldGhpbmcgd2VudCB3cm9uZydcbiAgICAgICAgICAgICAgICAgICAgfV0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZG9uZSk7XG4gICAgICAgIH0pXG4gICAgICAgIGl0KCdzaG91bGQgc2V0IGluZm8gb24gc3VjY2Vzc2Z1bCBwb3N0IHJlcXVlc3QgdG8gL2FwaS92MS91c2VyL3VwZGF0ZS9wYXNzd29yZCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIGxldCB1cGRhdGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgICAgICBtb2NrU3RvcmUuZGlzcGF0Y2godXBkYXRlUGFzc3dvcmQoJ2EnLCAnYicsICgpID0+IHVwZGF0ZWQgPSB0cnVlKSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5pc1RydWUodXBkYXRlZCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnM6IEFueUFjdGlvbltdID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogQUREX0lORk8sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAnUGFzc3dvcmQgdXBkYXRlZCdcbiAgICAgICAgICAgICAgICAgICAgfV0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHNldCBhbiBlcnJvciBvbiBmYWlsZWQgcG9zdCByZXF1ZXN0IHRvIC9hcGkvdjEvdXNlci91cGRhdGUvcGFzc3dvcmQnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICBsZXQgdXBkYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3Mub25Qb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL3Bhc3N3b3JkJykucmVwbHkoNTAwLCB7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnIH0pO1xuICAgICAgICAgICAgbW9ja1N0b3JlLmRpc3BhdGNoKHVwZGF0ZVBhc3N3b3JkKCdhJywgJ2InLCAoKSA9PiB1cGRhdGVkID0gdHJ1ZSkpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuaXNGYWxzZSh1cGRhdGVkKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uczogQW55QWN0aW9uW10gPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBBRERfRVJST1IsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnXG4gICAgICAgICAgICAgICAgICAgIH1dKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGRvbmUpO1xuICAgICAgICB9KVxuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdDaGFubmVscyBhc3luYyBhY3Rpb25zJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIFJldHJpZXZlIGNoYW5uZWwgbWVzc2FnZXMgYWN0aW9uIGNoZWNrcyBzdG9yZSB0byB2ZXJpZnkgdGhhdCBjaGFubmVsXG4gICAgICAgICAgICAvLyB3aXRoIGdpdmVuIG5hbWUgYWxyZWFkeSBleGlzdHNcbiAgICAgICAgICAgIG1vY2tTdG9yZSA9IG1vY2tTdG9yZUNyZWF0b3Ioe1xuICAgICAgICAgICAgICAgIGNoYW5uZWxzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbmFtZTogJ2dlbmVyYWwnLCBmZXRjaGluZ05ld01lc3NhZ2VzOiBmYWxzZSwgaGFzTW9yZU1lc3NhZ2VzOiB0cnVlLCByZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0OiAwIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbmFtZTogJ2ZldGNoaW5nIG5ldyBtZXNzYWdlcycsIGZldGNoaW5nTmV3TWVzc2FnZXM6IHRydWUsIGhhc01vcmVNZXNzYWdlczogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgICAgICB7IG5hbWU6ICdubyBtb3JlIG1lc3NhZ2VzJywgZmV0Y2hpbmdOZXdNZXNzYWdlczogZmFsc2UsIGhhc01vcmVNZXNzYWdlczogZmFsc2UgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3Mub25BbnkoKS5yZXBseSgyMDAsIHt9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmV0Y2ggY2hhbm5lbHMgYW5kIGRpc3BhdGNoIGFkZENoYW5uZWxzIHdpdGggYW4gYXJyYXkgb2YgY2hhbm5lbCBuYW1lcycsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIGxldCBjaGFubmVsczoge19pZDogc3RyaW5nLCBuYW1lOiBzdHJpbmd9W10gPSBbXG4gICAgICAgICAgICAgICAge19pZDogJzEnLCBuYW1lOiAnZ2VuZXJhbCd9LFxuICAgICAgICAgICAgICAgIHtfaWQ6ICcyJywgbmFtZTogJ3JhbmRvbSd9LFxuICAgICAgICAgICAgICAgIHtfaWQ6ICczJywgbmFtZTogJ3NvbWV0aGluZyBlbHNlJ31dO1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3NcbiAgICAgICAgICAgICAgICAub25HZXQoJy9hcGkvdjEvY2hhbm5lbHMnKVxuICAgICAgICAgICAgICAgIC5yZXBseSgyMDAsIHtjaGFubmVsczogY2hhbm5lbHN9KTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChmZXRjaENoYW5uZWxzKCkpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25zOiBBbnlBY3Rpb25bXSA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFkZENoYW5uZWxzQWN0aW9uID0gYWRkQ2hhbm5lbHMoWydnZW5lcmFsJywgJ3JhbmRvbScsICdzb21ldGhpbmcgZWxzZSddKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbYWRkQ2hhbm5lbHNBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGRvbmUpXG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGRpc3BhdGNoIGFkZEVycm9yIG9uIGZhaWxlZCByZXF1ZXN0IHRvIC9hcGkvdjEvY2hhbm5lbHMnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvc1xuICAgICAgICAgICAgICAgIC5vbkdldCgnL2FwaS92MS9jaGFubmVscycpXG4gICAgICAgICAgICAgICAgLnJlcGx5KDUwMCk7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2goZmV0Y2hDaGFubmVscygpKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uczogQW55QWN0aW9uW10gPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnJvckFjdGlvbiA9IGFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gZmV0Y2ggdGhlIGNoYW5uZWxzJyk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW2Vycm9yQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChkb25lKVxuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCBhbiBlcnJvciBpZiByZXRyaWV2aW5nIG1lc3NhZ2VzIHdpdGggaW52YWxpZCBjaGFubmVsIG5hbWUnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2gocmV0cmlldmVDaGFubmVsTWVzc2FnZXMoJ2ludmFsaWQgbmFtZScpKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigobXNnOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChtc2csICdSZXRyaWV2ZSBDaGFubmVsIE1lc3NhZ2VzIGRpc3BhdGNoZWQgd2l0aCBpbmNvcnJlY3QgY2hhbm5lbCBuYW1lIG9yIHdoaWxlIGFscmVhZHkgZmV0Y2hpbmcgbWVzc2FnZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnM6IEFueUFjdGlvbltdID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yQWN0aW9uID0gYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBmZXRjaCBtZXNzYWdlcycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbZXJyb3JBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGRpc3BhdGNoIGFuIGVycm9yIGlmIGFscmVhZHkgcmV0cmlldmluZyBjaGFubmVsIG1lc3NhZ2VzJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKHJldHJpZXZlQ2hhbm5lbE1lc3NhZ2VzKCdmZXRjaGluZyBuZXcgbWVzc2FnZXMnKSlcbiAgICAgICAgICAgICAgICAudGhlbigobXNnOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG1zZywgJ1JldHJpZXZlIENoYW5uZWwgTWVzc2FnZXMgZGlzcGF0Y2hlZCB3aXRoIGluY29ycmVjdCBjaGFubmVsIG5hbWUgb3Igd2hpbGUgYWxyZWFkeSBmZXRjaGluZyBtZXNzYWdlcycpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25zOiBBbnlBY3Rpb25bXSA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yQWN0aW9uID0gYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBmZXRjaCBtZXNzYWdlcycpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFtlcnJvckFjdGlvbl0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGRpc3BhdGNoIGFuIGVycm9yIGlmIGNoYW5uZWwgZG9lcyBub3QgaGF2ZSBvbGRlciBtZXNzYWdlcycsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChyZXRyaWV2ZUNoYW5uZWxNZXNzYWdlcygnbm8gbW9yZSBtZXNzYWdlcycpKVxuICAgICAgICAgICAgICAgIC50aGVuKChtc2c6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwobXNnLCAnUmV0cmlldmUgQ2hhbm5lbCBNZXNzYWdlcyBkaXNwYXRjaGVkIHdpdGggaW5jb3JyZWN0IGNoYW5uZWwgbmFtZSBvciB3aGlsZSBhbHJlYWR5IGZldGNoaW5nIG1lc3NhZ2VzJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnM6IEFueUFjdGlvbltdID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXJyb3JBY3Rpb24gPSBhZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIGZldGNoIG1lc3NhZ2VzJyk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW2Vycm9yQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZGlzcGF0Y2ggYW4gZXJyb3Igb24gZmFpbGVkIGdldCByZXF1ZXN0IHRvIC9hcGkvdjEvbWVzc2FnZXMvJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3NcbiAgICAgICAgICAgICAgICAub25HZXQoKVxuICAgICAgICAgICAgICAgIC5yZXBseSg1MDApO1xuICAgICAgICAgICAgbGV0IGNoYW5uZWw6IHN0cmluZyA9ICdnZW5lcmFsJztcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChyZXRyaWV2ZUNoYW5uZWxNZXNzYWdlcyhjaGFubmVsKSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnM6IEFueUFjdGlvbltdID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2V0RmV0Y2hpbmdUcnVlQWN0aW9uID0gc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMoY2hhbm5lbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yQWN0aW9uID0gYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBmZXRjaCBtZXNzYWdlcycpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZXRGZXRjaGluZ0ZhbHNlQWN0aW9uID0gc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMoY2hhbm5lbCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFtzZXRGZXRjaGluZ1RydWVBY3Rpb24sIGVycm9yQWN0aW9uLCBzZXRGZXRjaGluZ0ZhbHNlQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgc2V0IGNoYW5uZWxIYXNNb3JlTWVzc2FnZXMgb24gcmVzcG9uc2Ugd2l0aCBlbXB0eSBhcnJheScsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zXG4gICAgICAgICAgICAgICAgLm9uR2V0KClcbiAgICAgICAgICAgICAgICAucmVwbHkoMjAwLCB7IG1lc3NhZ2VzOiBbXX0pO1xuICAgICAgICAgICAgbGV0IGNoYW5uZWw6IHN0cmluZyA9ICdnZW5lcmFsJztcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChyZXRyaWV2ZUNoYW5uZWxNZXNzYWdlcyhjaGFubmVsKSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnM6IEFueUFjdGlvbltdID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2V0RmV0Y2hpbmdUcnVlQWN0aW9uID0gc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMoY2hhbm5lbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNldEhhc01vcmVBY3Rpb24gPSBzZXRDaGFubmVsSGFzTW9yZU1lc3NhZ2VzKGNoYW5uZWwsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2V0RmV0Y2hpbmdGYWxzZUFjdGlvbiA9IHNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzKGNoYW5uZWwsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbc2V0RmV0Y2hpbmdUcnVlQWN0aW9uLCBzZXRIYXNNb3JlQWN0aW9uLCBzZXRGZXRjaGluZ0ZhbHNlQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgaW5jcmVtZW50IG9mZnNldCAoYmFzZWQgb24gbnVtYmVyIG9mIHJlY2VpdmVkIG1lc3NhZ2VzKSBhbmQgYWRkIHJldHJpZXZlZCBjaGFubmVsIG1lc3NhZ2VzIG9uIHN1Y2Nlc3NmdWwgcmV0cmVpdmVDaGFubmVsTWVzc2FnZXMgYWN0aW9uJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgbGV0IGNoYW5uZWw6IHN0cmluZyA9ICdnZW5lcmFsJztcbiAgICAgICAgICAgIGxldCBtZXNzYWdlczogTWVzc2FnZVtdID0gW3tcbiAgICAgICAgICAgICAgICB0ZXh0OiAnMTIzJyxcbiAgICAgICAgICAgICAgICBjcmVhdGVkOiBEYXRlLm5vdygpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgdXNlckVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgX2lkOiAnMSdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnNDU2JyxcbiAgICAgICAgICAgICAgICBjcmVhdGVkOiBEYXRlLm5vdygpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgdXNlckVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgX2lkOiAnMidcbiAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3NcbiAgICAgICAgICAgICAgICAub25HZXQoKVxuICAgICAgICAgICAgICAgIC5yZXBseSgyMDAsIHsgbWVzc2FnZXM6IG1lc3NhZ2VzfSk7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2gocmV0cmlldmVDaGFubmVsTWVzc2FnZXMoY2hhbm5lbCkpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25zOiBBbnlBY3Rpb25bXSA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNldEZldGNoaW5nVHJ1ZUFjdGlvbiA9IHNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzKGNoYW5uZWwsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmNyZW1lbnRPZmZzZXRBY3Rpb24gPSBpbmNyZW1lbnRDaGFubmVsUmV0cmlldmVNZXNzYWdlc09mZnNldChjaGFubmVsLCBtZXNzYWdlcy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhZGRNZXNzYWdlc0FjdGlvbiA9IGFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcyhjaGFubmVsLCBtZXNzYWdlcyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNldEZldGNoaW5nRmFsc2VBY3Rpb24gPSBzZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcyhjaGFubmVsLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0RmV0Y2hpbmdUcnVlQWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5jcmVtZW50T2Zmc2V0QWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkTWVzc2FnZXNBY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRGZXRjaGluZ0ZhbHNlQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZGlzcGF0Y2ggaW5mbyBvbiBzdWNjZXNzZnVsbHkgZGVsZXRpbmcgY2hhbm5lbCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIGxldCBjaGFubmVsczogeyBfaWQ6IHN0cmluZywgbmFtZTogc3RyaW5nIH1bXSA9IFtcbiAgICAgICAgICAgICAgICB7IF9pZDogJzEnLCBuYW1lOiAnZ2VuZXJhbCcgfSxcbiAgICAgICAgICAgICAgICB7IF9pZDogJzInLCBuYW1lOiAncmFuZG9tJyB9LFxuICAgICAgICAgICAgICAgIHsgX2lkOiAnMycsIG5hbWU6ICdzb21ldGhpbmcgZWxzZScgfV07XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvc1xuICAgICAgICAgICAgICAgIC5vbkdldCgnL2FwaS92MS9jaGFubmVscycpXG4gICAgICAgICAgICAgICAgLnJlcGx5KDIwMCwgeyBjaGFubmVsczogY2hhbm5lbHMgfSk7XG4gICAgICAgICAgICBtb2NrQXhpb3NcbiAgICAgICAgICAgICAgICAub25HZXQoKVxuICAgICAgICAgICAgICAgIC5yZXBseSgyMDApO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKGRlbGV0ZUNoYW5uZWwoJ2dlbmVyYWwnKSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnM6IEFueUFjdGlvbltdID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWRkSW5mb0FjdGlvbiA9IGFkZEluZm8oJ0NoYW5uZWwgZGVsZXRlZCcpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhZGRDaGFubmVsc0FjdGlvbiA9IGFkZENoYW5uZWxzKFsnZ2VuZXJhbCcsICdyYW5kb20nLCAnc29tZXRoaW5nIGVsc2UnXSk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW2FkZEluZm9BY3Rpb24sIGFkZENoYW5uZWxzQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZGlzcGF0Y2ggYW4gZXJyb3Igb24gZmFpbGVkIGF0dGVtcHQgdG8gZGVsZXRlIGNoYW5uZWwnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvc1xuICAgICAgICAgICAgICAgIC5vbkdldCgpXG4gICAgICAgICAgICAgICAgLnJlcGx5KDUwMCwge2Vycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnfSk7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2goZGVsZXRlQ2hhbm5lbCgnZ2VuZXJhbCcpKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uczogQW55QWN0aW9uW10gPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhZGRFcnJvckFjdGlvbiA9IGFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZycpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFthZGRFcnJvckFjdGlvbl0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZG9uZSk7XG4gICAgICAgIH0pXG4gICAgICAgIGl0KCdzaG91bGQgZGlzcGF0Y2ggaW5mbyBvbiBjcmVhdGluZyBuZXcgY2hhbm5lbCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIGxldCBjaGFubmVsczogeyBfaWQ6IHN0cmluZywgbmFtZTogc3RyaW5nIH1bXSA9IFtcbiAgICAgICAgICAgICAgICB7IF9pZDogJzEnLCBuYW1lOiAnZ2VuZXJhbCcgfSxcbiAgICAgICAgICAgICAgICB7IF9pZDogJzInLCBuYW1lOiAncmFuZG9tJyB9LFxuICAgICAgICAgICAgICAgIHsgX2lkOiAnMycsIG5hbWU6ICdzb21ldGhpbmcgZWxzZScgfV07XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvc1xuICAgICAgICAgICAgICAgIC5vbkdldCgnL2FwaS92MS9jaGFubmVscycpXG4gICAgICAgICAgICAgICAgLnJlcGx5KDIwMCwgeyBjaGFubmVsczogY2hhbm5lbHMgfSk7XG4gICAgICAgICAgICBtb2NrQXhpb3NcbiAgICAgICAgICAgICAgICAub25Qb3N0KClcbiAgICAgICAgICAgICAgICAucmVwbHkoMjAwKTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChhZGRDaGFubmVsKCduZXcgY2hhbm5lbCcpKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uczogQW55QWN0aW9uW10gPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhZGRJbmZvQWN0aW9uID0gYWRkSW5mbygnQ2hhbm5lbCBjcmVhdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFkZENoYW5uZWxzQWN0aW9uID0gYWRkQ2hhbm5lbHMoWydnZW5lcmFsJywgJ3JhbmRvbScsICdzb21ldGhpbmcgZWxzZSddKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbYWRkSW5mb0FjdGlvbiwgYWRkQ2hhbm5lbHNBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCBhbiBlcnJvciBvbiBmYWlsZWQgYXR0ZW1wdCB0byBjcmVhdGUgYSBuZXcgY2hhbm5lbCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zXG4gICAgICAgICAgICAgICAgLm9uQW55KClcbiAgICAgICAgICAgICAgICAucmVwbHkoNTAwLCB7ZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZyd9KTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChhZGRDaGFubmVsKCduZXcgY2hhbm5lbCcpKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uczogQW55QWN0aW9uW10gPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhZGRFcnJvckFjdGlvbiA9IGFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZycpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFthZGRFcnJvckFjdGlvbl0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZG9uZSk7XG4gICAgICAgIH0pXG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ1NvY2tldCBhc3luYyBhY3Rpb25zJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG1vY2tTdG9yZSA9IGdldFN0b3JlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGluaXRpYWxpemUgd2Vic29ja2V0IGNvbm5lY3Rpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG1vY2tTdG9yZS5kaXNwYXRjaChpbml0V2Vic29ja2V0Q29ubmVjdGlvbigpKTtcbiAgICAgICAgICAgIGNvbnN0IGFjdGlvbnM6IEFueUFjdGlvbltdID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChhY3Rpb25zWzBdLnR5cGUsIElOSVRfV0VCU09DS0VUKTtcbiAgICAgICAgICAgIC8vIG5lZWQgdG8gY2xvc2UgY29ubmVjdGlvbiBzbyBwcm9ncmFtIHdpbGwgZXhpdCBhZnRlciB0ZXN0cyBydW5cbiAgICAgICAgICAgIGFjdGlvbnNbMF0uZGF0YS5pby5jbG9zZSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnQ2hhdCBVc2VycyBhc3luYyBhY3Rpb25zJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG1vY2tTdG9yZSA9IGdldFN0b3JlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGRpcGF0Y2ggdXBkYXRlVXNlcnMgb24gZmV0Y2ggYWxsIHVzZXJzJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgbGV0IHVzZXJzUmVzcG9uc2UgPSBbe1xuICAgICAgICAgICAgICAgIGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgcm9sZTogJ2FkbWluJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAndGVzdCdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBlbWFpbDogJ3Rlc3QyQHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICByb2xlOiAnZ2VuZXJhbCcsXG4gICAgICAgICAgICAgICAgbmFtZTogJ3Rlc3QnXG4gICAgICAgICAgICB9XTtcbiAgICAgICAgICAgIGxldCB1c2VyczogQ2hhdFVzZXJzU3RhdGUgPSB7fTtcbiAgICAgICAgICAgIHVzZXJzUmVzcG9uc2UuZm9yRWFjaCgodSkgPT4ge1xuICAgICAgICAgICAgICAgIHVzZXJzW3UuZW1haWxdID0ge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiB1Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IHUucm9sZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3Mub25BbnkoKS5yZXBseSgyMDAsIHsgdXNlcnM6IHVzZXJzUmVzcG9uc2V9KTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChmZXRjaEFsbFVzZXJzKCkpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25zOiBBbnlBY3Rpb25bXSA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZVVzZXJzQWN0aW9uID0gdXBkYXRlVXNlcnModXNlcnMpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFt1cGRhdGVVc2Vyc0FjdGlvbl0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGRpc3BhdGNoIGFkZEVycm9yIG9uIGZhaWxlZCBhdHRlbXB0IHRvIGZldGNoIHVzZXJzJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3Mub25BbnkoKS5yZXBseSg1MDApO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKGZldGNoQWxsVXNlcnMoKSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnM6IEFueUFjdGlvbltdID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWRkRXJyb3JBY3Rpb24gPSBhZGRFcnJvcignRmV0Y2hpbmcgYWxsIHVzZXJzIGZhaWxlZCcpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFthZGRFcnJvckFjdGlvbl0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZG9uZSk7XG4gICAgICAgIH0pXG4gICAgICAgIGl0KCdzaG91bGQgY3JlYXRlIGEgbmV3IHVzZXInKTtcbiAgICAgICAgaXQoJ3Nob3VsZCBlZGl0IHRoZSB1c2VyJyk7XG4gICAgICAgIGl0KCdzaG91bGQgZGVsZXRlIHRoZSB1c2VyJyk7XG4gICAgfSk7XG59KSIsImltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0ICdtb2NoYSc7XG5pbXBvcnQgKiBhcyBzb2NrZXRpb2NsaWVudCBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7IE5vdEltcGxlbWVudGVkRXJyb3IgfSBmcm9tICcuLi8nO1xuaW1wb3J0IHtTdGF0ZSwgcm9vdFJlZHVjZXIsIG1pZGRsZXdhcmV9IGZyb20gJy4uLy4uL3NyYy93ZWIvc3RvcmUnO1xuXG5pbXBvcnQgeyBTdG9yZSwgY3JlYXRlU3RvcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBzZXRBdXRob3JpemVkLCBzZXRVc2VyLCBsb2dvdXRVc2VyIH0gZnJvbSAnLi4vLi4vc3JjL3dlYi9hY3Rpb25zL3VzZXJBY3Rpb25zJztcbmltcG9ydCB7IGFkZENoYW5uZWxzLCBzZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcywgaW5jcmVtZW50Q2hhbm5lbFJldHJpZXZlTWVzc2FnZXNPZmZzZXQsIHNldENoYW5uZWxIYXNNb3JlTWVzc2FnZXMsIGFkZFJlY2VpdmVkQ2hhbm5lbE1lc3NhZ2UsIGFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcywgY2xlYXJDaGFubmVsc0RhdGEgfSBmcm9tICcuLi8uLi9zcmMvd2ViL2FjdGlvbnMvY2hhbm5lbHNBY3Rpb25zJztcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICcuLi8uLi9zcmMvd2ViL3JlZHVjZXJzL2NoYW5uZWxzJztcbmltcG9ydCB7IGFkZEVycm9yLCByZW1vdmVFcnJvciwgY2xlYXJFcnJvcnMsIGFkZEluZm8sIHJlbW92ZUluZm8sIGNsZWFySW5mb3MgfSBmcm9tICcuLi8uLi9zcmMvd2ViL2FjdGlvbnMvbm90aWZpY2F0aW9uc0FjdGlvbnMnO1xuaW1wb3J0IHsgdG9nZ2xlU2lkZWJhck9wZW4gfSBmcm9tICcuLi8uLi9zcmMvd2ViL2FjdGlvbnMvc2lkZWJhckFjdGlvbnMnO1xuaW1wb3J0IHsgaW5pdFdlYnNvY2tldCwgc2V0U29ja2V0Q29ubmVjdGVkLCBzZXRTb2NrZXRDb25uZWN0ZWRVc2VycyB9IGZyb20gJy4uLy4uL3NyYy93ZWIvYWN0aW9ucy9zb2NrZXRBY3Rpb25zJztcbmltcG9ydCB7IHVwZGF0ZVVzZXJzLCBhZGRVc2VyLCByZW1vdmVVc2VyIH0gZnJvbSAnLi4vLi4vc3JjL3dlYi9hY3Rpb25zL2NoYXRVc2Vyc0FjdGlvbnMnO1xuaW1wb3J0IHsgU3RhdGUgYXMgQ2hhdFVzZXJzU3RhdGUgfSBmcm9tICcuLi8uLi9zcmMvd2ViL3JlZHVjZXJzL2NoYXRVc2Vycyc7XG5cbmZ1bmN0aW9uIGdldFN0b3JlKCk6IFN0b3JlPFN0YXRlPiB7XG4gICAgcmV0dXJuIGNyZWF0ZVN0b3JlKHJvb3RSZWR1Y2VyLCBtaWRkbGV3YXJlKTtcbn1cblxuZGVzY3JpYmUoJ1N0b3JlIGFuZCBTeW5jaHJvbm91cyBBY3Rpb25zJywgZnVuY3Rpb24oKSB7XG4gICAgZGVzY3JpYmUoJ1VzZXIgU3RhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBzdG9yZTogU3RvcmU8U3RhdGU+O1xuICAgICAgICBsZXQgdXNlcjogKCgpID0+IFN0YXRlWyd1c2VyJ10pO1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlID0gZ2V0U3RvcmUoKTtcbiAgICAgICAgICAgIHVzZXIgPSAoKSA9PiBzdG9yZS5nZXRTdGF0ZSgpLnVzZXI7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIG5vdCBiZSBhdXRob3JpemVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UodXNlcigpLmF1dGhvcml6ZWQpO1xuICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UodXNlcigpLmVtYWlsKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKHVzZXIoKS5uYW1lKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKHVzZXIoKS5yb2xlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgYmUgYXV0aG9yaXplZCBhZnRlciBzZXRBdXRob3JpemVkIGFjdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UodXNlcigpLmF1dGhvcml6ZWQpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc2V0QXV0aG9yaXplZCh0cnVlKSk7XG4gICAgICAgICAgICBhc3NlcnQuaXNUcnVlKHVzZXIoKS5hdXRob3JpemVkKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldEF1dGhvcml6ZWQoZmFsc2UpKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKHVzZXIoKS5hdXRob3JpemVkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgaGF2ZSB1c2VyIGRhdGEgYWZ0ZXIgc2V0dGluZyB0aGUgdXNlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UodXNlcigpLmF1dGhvcml6ZWQpO1xuICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UodXNlcigpLmVtYWlsKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKHVzZXIoKS5uYW1lKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKHVzZXIoKS5yb2xlKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldFVzZXIoe1xuICAgICAgICAgICAgICAgIGF1dGhvcml6ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnSmFuZSBEb2UnLFxuICAgICAgICAgICAgICAgIHJvbGU6ICdhZG1pbidcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIGFzc2VydC5pc1RydWUodXNlcigpLmF1dGhvcml6ZWQpO1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHVzZXIoKS5lbWFpbCwgJ3Rlc3RAdGVzdC5jb20nKTtcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCh1c2VyKCkubmFtZSwgJ0phbmUgRG9lJyk7XG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwodXNlcigpLnJvbGUsICdhZG1pbicpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc2V0VXNlcih7XG4gICAgICAgICAgICAgICAgYXV0aG9yaXplZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgZW1haWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG5hbWU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJvbGU6IGZhbHNlXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICBhc3NlcnQuaXNGYWxzZSh1c2VyKCkuYXV0aG9yaXplZCk7XG4gICAgICAgICAgICBhc3NlcnQuaXNGYWxzZSh1c2VyKCkuZW1haWwpO1xuICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UodXNlcigpLm5hbWUpO1xuICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UodXNlcigpLnJvbGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgaGF2ZSB1c2VyIGRhdGEgYWZ0ZXIgbG9nZ2luZyBvdXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldFVzZXIoe1xuICAgICAgICAgICAgICAgIGF1dGhvcml6ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnSmFuZSBEb2UnLFxuICAgICAgICAgICAgICAgIHJvbGU6ICdhZG1pbidcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGxvZ291dFVzZXIoKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzZXRVc2VyKHtcbiAgICAgICAgICAgICAgICBhdXRob3JpemVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlbWFpbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbmFtZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgcm9sZTogZmFsc2VcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSlcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnQ2hhbm5lbHMgU3RhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBzdG9yZTogU3RvcmU8U3RhdGU+O1xuICAgICAgICBsZXQgY2hhbm5lbHM6ICgoKSA9PiBTdGF0ZVsnY2hhbm5lbHMnXSk7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUgPSBnZXRTdG9yZSgpO1xuICAgICAgICAgICAgY2hhbm5lbHMgPSAoKSA9PiBzdG9yZS5nZXRTdGF0ZSgpLmNoYW5uZWxzO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBhZGQgY2hhbm5lbHMgZnJvbSBhbiBhcnJheSBvZiBjaGFubmVsIG5hbWVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRDaGFubmVscyhbJ2dlbmVyYWwnLCAncmFuZG9tJywgJ3NvbWV0aGluZyBlbHNlJ10pKTtcbiAgICAgICAgICAgIGxldCBjMDogU3RhdGVbJ2NoYW5uZWxzJ11bMF0gPSBjaGFubmVscygpWzBdO1xuICAgICAgICAgICAgbGV0IGMxOiBTdGF0ZVsnY2hhbm5lbHMnXVswXSA9IGNoYW5uZWxzKClbMV07XG4gICAgICAgICAgICBsZXQgYzI6IFN0YXRlWydjaGFubmVscyddWzBdID0gY2hhbm5lbHMoKVsyXTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYzAsIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnZ2VuZXJhbCcsXG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6IFtdLFxuICAgICAgICAgICAgICAgIHJldHJpZXZlTWVzc2FnZXNPZmZzZXQ6IDAsXG4gICAgICAgICAgICAgICAgaGFzTW9yZU1lc3NhZ2VzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGZldGNoaW5nTmV3TWVzc2FnZXM6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGMxLCB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ3JhbmRvbScsXG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6IFtdLFxuICAgICAgICAgICAgICAgIHJldHJpZXZlTWVzc2FnZXNPZmZzZXQ6IDAsXG4gICAgICAgICAgICAgICAgaGFzTW9yZU1lc3NhZ2VzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGZldGNoaW5nTmV3TWVzc2FnZXM6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGMyLCB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ3NvbWV0aGluZyBlbHNlJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlczogW10sXG4gICAgICAgICAgICAgICAgcmV0cmlldmVNZXNzYWdlc09mZnNldDogMCxcbiAgICAgICAgICAgICAgICBoYXNNb3JlTWVzc2FnZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgZmV0Y2hpbmdOZXdNZXNzYWdlczogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgdXBkYXRlIGZldGNoaW5nTmV3TWVzc2FnZXMgYWZ0ZXIgY2FsbGluZyBzZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcyBhY3Rpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZENoYW5uZWxzKFsnZ2VuZXJhbCcsICdyYW5kb20nLCAnc29tZXRoaW5nIGVsc2UnXSkpO1xuICAgICAgICAgICAgY2hhbm5lbHMoKS5mb3JFYWNoKChjOiBTdGF0ZVsnY2hhbm5lbHMnXVswXSkgPT4ge1xuICAgICAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKGMuZmV0Y2hpbmdOZXdNZXNzYWdlcyk7XG4gICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMoYy5uYW1lLCB0cnVlKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNoYW5uZWxzKCkuZm9yRWFjaCgoYzogU3RhdGVbJ2NoYW5uZWxzJ11bMF0pID0+IHtcbiAgICAgICAgICAgICAgICBhc3NlcnQuaXNUcnVlKGMuZmV0Y2hpbmdOZXdNZXNzYWdlcyk7XG4gICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMoYy5uYW1lLCBmYWxzZSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjaGFubmVscygpLmZvckVhY2goKGM6IFN0YXRlWydjaGFubmVscyddWzBdKSA9PiB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UoYy5mZXRjaGluZ05ld01lc3NhZ2VzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBpbmNyZW1lbnQgdGhlIGNoYW5uZWwgb2Zmc2V0IGZvciByZXRyaWV2aW5nIG5ldyBtZXNzYWdlcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWRkQ2hhbm5lbHMoWydnZW5lcmFsJywgJ3JhbmRvbScsICdzb21ldGhpbmcgZWxzZSddKSk7XG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoY2hhbm5lbHMoKS5maW5kKGUgPT4gZS5uYW1lID09PSAnZ2VuZXJhbCcpLnJldHJpZXZlTWVzc2FnZXNPZmZzZXQsIDApO1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNoYW5uZWxzKCkuZmluZChlID0+IGUubmFtZSA9PT0gJ3JhbmRvbScpLnJldHJpZXZlTWVzc2FnZXNPZmZzZXQsIDApO1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNoYW5uZWxzKCkuZmluZChlID0+IGUubmFtZSA9PT0gJ3NvbWV0aGluZyBlbHNlJykucmV0cmlldmVNZXNzYWdlc09mZnNldCwgMCk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChpbmNyZW1lbnRDaGFubmVsUmV0cmlldmVNZXNzYWdlc09mZnNldCgnZ2VuZXJhbCcsIDIwKSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChjaGFubmVscygpLmZpbmQoZSA9PiBlLm5hbWUgPT09ICdnZW5lcmFsJykucmV0cmlldmVNZXNzYWdlc09mZnNldCwgMjApO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goaW5jcmVtZW50Q2hhbm5lbFJldHJpZXZlTWVzc2FnZXNPZmZzZXQoJ2dlbmVyYWwnLCAxKSlcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChjaGFubmVscygpLmZpbmQoZSA9PiBlLm5hbWUgPT09ICdnZW5lcmFsJykucmV0cmlldmVNZXNzYWdlc09mZnNldCwgMjEpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goaW5jcmVtZW50Q2hhbm5lbFJldHJpZXZlTWVzc2FnZXNPZmZzZXQoJ3JhbmRvbScsIDEpKVxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNoYW5uZWxzKCkuZmluZChlID0+IGUubmFtZSA9PT0gJ3JhbmRvbScpLnJldHJpZXZlTWVzc2FnZXNPZmZzZXQsIDEpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goaW5jcmVtZW50Q2hhbm5lbFJldHJpZXZlTWVzc2FnZXNPZmZzZXQoJ3NvbWV0aGluZyBlbHNlJywgMSkpXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoY2hhbm5lbHMoKS5maW5kKGUgPT4gZS5uYW1lID09PSAnc29tZXRoaW5nIGVsc2UnKS5yZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0LCAxKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgdXBkYXRlIHRoZSBoYXNNb3JlTWVzc2FnZXMgcHJvcGVydHkgb24gYSBjaGFubmVsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRDaGFubmVscyhbJ2dlbmVyYWwnLCAncmFuZG9tJywgJ3NvbWV0aGluZyBlbHNlJ10pKTtcbiAgICAgICAgICAgIGFzc2VydC5pc1RydWUoY2hhbm5lbHMoKS5maW5kKGUgPT4gZS5uYW1lID09PSAnZ2VuZXJhbCcpLmhhc01vcmVNZXNzYWdlcyk7XG4gICAgICAgICAgICBhc3NlcnQuaXNUcnVlKGNoYW5uZWxzKCkuZmluZChlID0+IGUubmFtZSA9PT0gJ3JhbmRvbScpLmhhc01vcmVNZXNzYWdlcyk7XG4gICAgICAgICAgICBhc3NlcnQuaXNUcnVlKGNoYW5uZWxzKCkuZmluZChlID0+IGUubmFtZSA9PT0gJ3NvbWV0aGluZyBlbHNlJykuaGFzTW9yZU1lc3NhZ2VzKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldENoYW5uZWxIYXNNb3JlTWVzc2FnZXMoJ2dlbmVyYWwnLCBmYWxzZSkpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc2V0Q2hhbm5lbEhhc01vcmVNZXNzYWdlcygncmFuZG9tJywgZmFsc2UpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldENoYW5uZWxIYXNNb3JlTWVzc2FnZXMoJ3NvbWV0aGluZyBlbHNlJywgZmFsc2UpKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKGNoYW5uZWxzKCkuZmluZChlID0+IGUubmFtZSA9PT0gJ2dlbmVyYWwnKS5oYXNNb3JlTWVzc2FnZXMpO1xuICAgICAgICAgICAgYXNzZXJ0LmlzRmFsc2UoY2hhbm5lbHMoKS5maW5kKGUgPT4gZS5uYW1lID09PSAncmFuZG9tJykuaGFzTW9yZU1lc3NhZ2VzKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKGNoYW5uZWxzKCkuZmluZChlID0+IGUubmFtZSA9PT0gJ3NvbWV0aGluZyBlbHNlJykuaGFzTW9yZU1lc3NhZ2VzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgYWRkIGEgcmVjZWl2ZWQgbWVzc2FnZSB0byB0aGUgYXBwcm9wcmlhdGUgY2hhbm5lbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWRkQ2hhbm5lbHMoWydnZW5lcmFsJywgJ3JhbmRvbScsICdzb21ldGhpbmcgZWxzZSddKSk7XG4gICAgICAgICAgICBsZXQgbWVzc2FnZTogTWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICB1c2VyRW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICBjcmVhdGVkOiBEYXRlLm5vdygpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgX2lkOiAnMScsXG4gICAgICAgICAgICAgICAgdGV4dDogJ3RoaXMgaXMgdGhlIG1lc3NhZ2UnLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWRkUmVjZWl2ZWRDaGFubmVsTWVzc2FnZSgnZ2VuZXJhbCcsIG1lc3NhZ2UpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZFJlY2VpdmVkQ2hhbm5lbE1lc3NhZ2UoJ3JhbmRvbScsIG1lc3NhZ2UpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZFJlY2VpdmVkQ2hhbm5lbE1lc3NhZ2UoJ3JhbmRvbScsIG1lc3NhZ2UpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZFJlY2VpdmVkQ2hhbm5lbE1lc3NhZ2UoJ3NvbWV0aGluZyBlbHNlJywgbWVzc2FnZSkpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWRkUmVjZWl2ZWRDaGFubmVsTWVzc2FnZSgnc29tZXRoaW5nIGVsc2UnLCBtZXNzYWdlKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRSZWNlaXZlZENoYW5uZWxNZXNzYWdlKCdzb21ldGhpbmcgZWxzZScsIG1lc3NhZ2UpKTtcblxuICAgICAgICAgICAgbGV0IGdlbmVyYWxNZXNzYWdlczogTWVzc2FnZVtdID0gY2hhbm5lbHMoKS5maW5kKGUgPT4gZS5uYW1lID09PSAnZ2VuZXJhbCcpLm1lc3NhZ2VzO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChnZW5lcmFsTWVzc2FnZXMubGVuZ3RoLCAxKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoZ2VuZXJhbE1lc3NhZ2VzLCBbbWVzc2FnZV0pO1xuICAgICAgICAgICAgbGV0IHJhbmRvbU1lc3NhZ2VzOiBNZXNzYWdlW10gPSBjaGFubmVscygpLmZpbmQoZSA9PiBlLm5hbWUgPT09ICdyYW5kb20nKS5tZXNzYWdlcztcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwocmFuZG9tTWVzc2FnZXMubGVuZ3RoLCAyKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwocmFuZG9tTWVzc2FnZXMsIFttZXNzYWdlLCBtZXNzYWdlXSk7XG4gICAgICAgICAgICBsZXQgb3RoZXJNZXNzYWdlczogTWVzc2FnZVtdID0gY2hhbm5lbHMoKS5maW5kKGUgPT4gZS5uYW1lID09PSAnc29tZXRoaW5nIGVsc2UnKS5tZXNzYWdlcztcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwob3RoZXJNZXNzYWdlcy5sZW5ndGgsIDMpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChvdGhlck1lc3NhZ2VzLCBbbWVzc2FnZSwgbWVzc2FnZSwgbWVzc2FnZV0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBhZGQgcmV0cmVpdmVkIG1lc3NhZ2VzIHRvIHRoZSBhcHByb3ByaWF0ZSBjaGFubmVsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRDaGFubmVscyhbJ2dlbmVyYWwnLCAncmFuZG9tJywgJ3NvbWV0aGluZyBlbHNlJ10pKTtcbiAgICAgICAgICAgIGxldCBtZXNzYWdlczogTWVzc2FnZVtdID0gW1xuICAgICAgICAgICAgICAgIHsgXCJ0ZXh0XCI6IFwiU29tZXRoaW5nIGhlcmVcIiwgXCJjcmVhdGVkXCI6IFwiMjAxOS0wNC0xM1QxNjo0NToyOC45NDZaXCIsIFwidXNlckVtYWlsXCI6IFwiYWJrb3RobWFuQGdtYWlsLmNvbVwiLCBcIl9pZFwiOiBcIjVjYjIxMjI4MWQ2NDVhMjJhYmVhOGRiZVwiIH0sXG4gICAgICAgICAgICAgICAgeyBcInRleHRcIjogXCIxMjM0MTIzNFwiLCBcImNyZWF0ZWRcIjogXCIyMDE5LTA0LTE0VDIyOjM0OjA2LjY4NlpcIiwgXCJ1c2VyRW1haWxcIjogXCJhYmtvdGhtYW5AZ21haWwuY29tXCIsICBcIl9pZFwiOiBcIjVjYjNiNTVlY2JmNjhjNmE5NTRlYWZiM1wiIH0sXG4gICAgICAgICAgICAgICAgeyBcInRleHRcIjogXCJ0ZXN0IG9uZSB0d28gdGhyZWVcIiwgXCJjcmVhdGVkXCI6IFwiMjAxOS0wNC0xNFQyMjozNDoxMC45MDNaXCIsIFwidXNlckVtYWlsXCI6IFwiYWJrb3RobWFuQGdtYWlsLmNvbVwiLCBcIl9pZFwiOiBcIjVjYjNiNTYyY2JmNjhjNmE5NTRlYWZiNFwiIH1dO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWRkUmV0cmlldmVkQ2hhbm5lbE1lc3NhZ2VzKCdnZW5lcmFsJywgbWVzc2FnZXMpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcygncmFuZG9tJywgbWVzc2FnZXMpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcygncmFuZG9tJywgbWVzc2FnZXMpKTtcbiAgICAgICAgICAgIGxldCBjaGFubmVsU3RhdGUgPSBjaGFubmVscygpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgICBjaGFubmVsU3RhdGVcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoKGMpID0+IGMubmFtZSA9PT0gJ2dlbmVyYWwnKVxuICAgICAgICAgICAgICAgICAgICAubWVzc2FnZXMsXG4gICAgICAgICAgICAgICAgbWVzc2FnZXMpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgICBjaGFubmVsU3RhdGVcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoKGMpID0+IGMubmFtZSA9PT0gJ3JhbmRvbScpXG4gICAgICAgICAgICAgICAgICAgIC5tZXNzYWdlcyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5jb25jYXQobWVzc2FnZXMpKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoXG4gICAgICAgICAgICAgICAgY2hhbm5lbFN0YXRlXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKChjKSA9PiBjLm5hbWUgPT09ICdzb21ldGhpbmcgZWxzZScpXG4gICAgICAgICAgICAgICAgICAgIC5tZXNzYWdlcyxcbiAgICAgICAgICAgICAgICBbXSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGNsZWFyIGFsbCBjaGFubmVsIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZENoYW5uZWxzKFsnZ2VuZXJhbCcsICdyYW5kb20nLCAnc29tZXRoaW5nIGVsc2UnXSkpO1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2VzOiBNZXNzYWdlW10gPSBbXG4gICAgICAgICAgICAgICAgeyBcInRleHRcIjogXCJTb21ldGhpbmcgaGVyZVwiLCBcImNyZWF0ZWRcIjogXCIyMDE5LTA0LTEzVDE2OjQ1OjI4Ljk0NlpcIiwgXCJ1c2VyRW1haWxcIjogXCJhYmtvdGhtYW5AZ21haWwuY29tXCIsIFwiX2lkXCI6IFwiNWNiMjEyMjgxZDY0NWEyMmFiZWE4ZGJlXCIgfSxcbiAgICAgICAgICAgICAgICB7IFwidGV4dFwiOiBcIjEyMzQxMjM0XCIsIFwiY3JlYXRlZFwiOiBcIjIwMTktMDQtMTRUMjI6MzQ6MDYuNjg2WlwiLCBcInVzZXJFbWFpbFwiOiBcImFia290aG1hbkBnbWFpbC5jb21cIiwgXCJfaWRcIjogXCI1Y2IzYjU1ZWNiZjY4YzZhOTU0ZWFmYjNcIiB9LFxuICAgICAgICAgICAgICAgIHsgXCJ0ZXh0XCI6IFwidGVzdCBvbmUgdHdvIHRocmVlXCIsIFwiY3JlYXRlZFwiOiBcIjIwMTktMDQtMTRUMjI6MzQ6MTAuOTAzWlwiLCBcInVzZXJFbWFpbFwiOiBcImFia290aG1hbkBnbWFpbC5jb21cIiwgXCJfaWRcIjogXCI1Y2IzYjU2MmNiZjY4YzZhOTU0ZWFmYjRcIiB9XTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcygnZ2VuZXJhbCcsIG1lc3NhZ2VzKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRSZXRyaWV2ZWRDaGFubmVsTWVzc2FnZXMoJ3JhbmRvbScsIG1lc3NhZ2VzKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRSZXRyaWV2ZWRDaGFubmVsTWVzc2FnZXMoJ3JhbmRvbScsIG1lc3NhZ2VzKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjbGVhckNoYW5uZWxzRGF0YSgpKTtcbiAgICAgICAgICAgIGxldCBjaGFubmVsU3RhdGUgPSBjaGFubmVscygpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChjaGFubmVsU3RhdGUsIFtdKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ05vdGlmaWNhdGlvbnMgU3RhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBzdG9yZTogU3RvcmU8U3RhdGU+O1xuICAgICAgICBsZXQgbm90aWZpY2F0aW9uczogKCgpID0+IFN0YXRlWydub3RpZmljYXRpb25zJ10pO1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3RvcmUgPSBnZXRTdG9yZSgpO1xuICAgICAgICAgICAgbm90aWZpY2F0aW9ucyA9ICgpID0+IHN0b3JlLmdldFN0YXRlKCkubm90aWZpY2F0aW9ucztcbiAgICAgICAgfSlcbiAgICAgICAgaXQoJ3Nob3VsZCBhZGQgZXJyb3JzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5vdGlmaWNhdGlvbnMoKS5lcnJvcnMsIFtdKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZEVycm9yKCdUZXN0IGVycm9yJykpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuZXJyb3JzLCBbJ1Rlc3QgZXJyb3InXSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRFcnJvcignQW5vdGhlciBlcnJvcicpKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmVycm9ycywgWydUZXN0IGVycm9yJywgJ0Fub3RoZXIgZXJyb3InXSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJlbW92ZSBlcnJvcnMgZ2l2ZW4gYW4gaW5kZXgnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZEVycm9yKCdUZXN0IGVycm9yJykpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWRkRXJyb3IoJ0Fub3RoZXIgZXJyb3InKSk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5vdGlmaWNhdGlvbnMoKS5lcnJvcnMsIFsnVGVzdCBlcnJvcicsICdBbm90aGVyIGVycm9yJ10pO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2gocmVtb3ZlRXJyb3IoMSkpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuZXJyb3JzLCBbJ1Rlc3QgZXJyb3InXSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChyZW1vdmVFcnJvcigwKSlcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmVycm9ycywgW10pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBjbGVhciBlcnJvcnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZEVycm9yKCdUZXN0IGVycm9yJykpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goYWRkRXJyb3IoJ0Fub3RoZXIgZXJyb3InKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjbGVhckVycm9ycygpKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmVycm9ycywgW10pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBhZGQgaW5mbycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuaW5mb3MsIFtdKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZEluZm8oJ1Rlc3QgaW5mbycpKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmluZm9zLCBbJ1Rlc3QgaW5mbyddKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZEluZm8oJ0Fub3RoZXIgaW5mbycpKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmluZm9zLCBbJ1Rlc3QgaW5mbycsICdBbm90aGVyIGluZm8nXSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJlbW92ZSBpbmZvIGdpdmVuIGFuIGluZGV4JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRJbmZvKCdUZXN0IGluZm8nKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChhZGRJbmZvKCdBbm90aGVyIGluZm8nKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChyZW1vdmVJbmZvKDEpKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmluZm9zLCBbJ1Rlc3QgaW5mbyddKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHJlbW92ZUluZm8oMCkpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuaW5mb3MsIFtdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgY2xlYXIgaW5mb3MnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZEluZm8oJ1Rlc3QgaW5mbycpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGFkZEluZm8oJ0Fub3RoZXIgaW5mbycpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNsZWFySW5mb3MoKSk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5vdGlmaWNhdGlvbnMoKS5pbmZvcywgW10pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnU2lkZWJhciBTdGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IHN0b3JlOiBTdG9yZTxTdGF0ZT47XG4gICAgICAgIGxldCBzaWRlYmFyOiAoKCkgPT4gU3RhdGVbJ3NpZGViYXInXSk7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUgPSBnZXRTdG9yZSgpO1xuICAgICAgICAgICAgc2lkZWJhciA9ICgpID0+IHN0b3JlLmdldFN0YXRlKCkuc2lkZWJhcjtcbiAgICAgICAgfSlcbiAgICAgICAgaXQoJ3Nob3VsZCB0b2dnbGUgb3BlbiBzdGF0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYXNzZXJ0LmlzVHJ1ZShzaWRlYmFyKCkub3Blbik7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh0b2dnbGVTaWRlYmFyT3BlbigpKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKHNpZGViYXIoKS5vcGVuKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHRvZ2dsZVNpZGViYXJPcGVuKCkpO1xuICAgICAgICAgICAgYXNzZXJ0LmlzVHJ1ZShzaWRlYmFyKCkub3Blbik7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh0b2dnbGVTaWRlYmFyT3BlbigpKTtcbiAgICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKHNpZGViYXIoKS5vcGVuKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ1NvY2tldCBTdGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IHN0b3JlOiBTdG9yZTxTdGF0ZT47XG4gICAgICAgIGxldCBzb2NrZXQ6ICgoKSA9PiBTdGF0ZVsnc29ja2V0J10pO1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlID0gZ2V0U3RvcmUoKTtcbiAgICAgICAgICAgIHNvY2tldCA9ICgpID0+IHN0b3JlLmdldFN0YXRlKCkuc29ja2V0O1xuICAgICAgICB9KVxuICAgICAgICBpdCgnc2hvdWxkIHNldCB0aGUgc29ja2V0IGdpdmVuIGEgU29ja2V0SU9DbGllbnQgU29ja2V0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKHNvY2tldCgpLCB7XG4gICAgICAgICAgICAgICAgaW86IG51bGwsXG4gICAgICAgICAgICAgICAgY29ubmVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb25uZWN0ZWRVc2VyRW1haWxzOiBbXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsZXQgc29ja2V0aW86IFNvY2tldElPQ2xpZW50LlNvY2tldCA9IHNvY2tldGlvY2xpZW50KCk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChpbml0V2Vic29ja2V0KHNvY2tldGlvKSk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKHNvY2tldCgpLCB7XG4gICAgICAgICAgICAgICAgaW86IHNvY2tldGlvLFxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29ubmVjdGVkVXNlckVtYWlsczogW11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc29ja2V0aW8uY2xvc2UoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgdXBkYXRlIHRoZSBjb25uZWN0ZWQgc3RhdGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldFNvY2tldENvbm5lY3RlZCh0cnVlKSk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKHNvY2tldCgpLCB7XG4gICAgICAgICAgICAgICAgaW86IG51bGwsXG4gICAgICAgICAgICAgICAgY29ubmVjdGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZFVzZXJFbWFpbHM6IFtdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldFNvY2tldENvbm5lY3RlZChmYWxzZSkpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChzb2NrZXQoKSwge1xuICAgICAgICAgICAgICAgIGlvOiBudWxsLFxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29ubmVjdGVkVXNlckVtYWlsczogW11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCB1cGRhdGUgdGhlIGNvbm5lY3RlZCB1c2VycycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGVtYWlsczogc3RyaW5nW10gPSBbJ3Rlc3RAdGVzdC5jb20nLCAndGVzdDJAdGVzdC5jb20nXTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNldFNvY2tldENvbm5lY3RlZFVzZXJzKGVtYWlscykpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChzb2NrZXQoKSwge1xuICAgICAgICAgICAgICAgIGlvOiBudWxsLFxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29ubmVjdGVkVXNlckVtYWlsczogZW1haWxzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ0NoYXQgVXNlcnMgU3RhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBzdG9yZTogU3RvcmU8U3RhdGU+O1xuICAgICAgICBsZXQgY2hhdFVzZXJzOiAoKCkgPT4gU3RhdGVbJ2NoYXRVc2VycyddKTtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdG9yZSA9IGdldFN0b3JlKCk7XG4gICAgICAgICAgICBjaGF0VXNlcnMgPSAoKSA9PiBzdG9yZS5nZXRTdGF0ZSgpLmNoYXRVc2VycztcbiAgICAgICAgfSlcbiAgICAgICAgaXQoJ3Nob3VsZCB1cGRhdGUgdXNlcnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCB1c2VyczogQ2hhdFVzZXJzU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgJ3Rlc3RAdGVzdC5jb20nOiB7XG4gICAgICAgICAgICAgICAgICAgIHJvbGU6ICd1c2VyJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ1Rlc3QgTmFtZSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICd0ZXN0MkB0ZXN0LmNvbSc6IHtcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogJ2FkbWluJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0Fub3RoZXIgdGVzdCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICd0ZXN0M0B0ZXN0LmNvbSc6IHtcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogJ2FkbWluJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0xhc3QgdGVzdCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh1cGRhdGVVc2Vycyh1c2VycykpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChjaGF0VXNlcnMoKSwgdXNlcnMpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3MtbW9jay1hZGFwdGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJjcnlwdGpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoYWlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29tcHJlc3Npb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29ubmVjdC1tb25nb1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb29raWUtcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNzdXJmXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzcy1zZXNzaW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhlbG1ldFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb2NoYVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtdXN0YWNoZS1leHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtbG9nZ2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LW1vY2stc3RvcmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtdGh1bmtcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic29ja2V0LmlvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNvY2tldC5pby1jbGllbnRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic29ja2V0aW8tand0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInN1cGVydGVzdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdXBlcnRlc3Qtc2Vzc2lvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ2YWxpZGF0b3JcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==