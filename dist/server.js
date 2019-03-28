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
    mongodbConnectionUri: 'mongodb://localhost:27017/reactChatDB'
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
function default_1(app) {
    app.get('/api/v1/channels?', authorized_1["default"]);
    app.get('/api/v1/channels', function (req, res) {
        req.db.collection('channels').find({}, function (err, channels) {
            if (!channels)
                return res.state(400).json({ json: err });
            channels.toArray(function (err, channelArr) {
                return res.json({ channels: channelArr });
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
var users_1 = __webpack_require__(/*! ./users */ "./src/server/routes/api/users.ts");
var messages_1 = __webpack_require__(/*! ./messages */ "./src/server/routes/api/messages.ts");
var channels_1 = __webpack_require__(/*! ./channels */ "./src/server/routes/api/channels.ts");
function default_1(app) {
    users_1["default"](app);
    messages_1["default"](app);
    channels_1["default"](app);
    app.post('/api/v1/login', function (req, res) {
        return req.authenticate(req.body.email, req.body.password, function (user) {
            console.log(user);
            if (!user)
                return res.status(401).json({ error: 'Invalid email or password' });
            return res.json({ success: true, email: req.session.user.email });
        });
    });
    app.post('/api/v1/register', function (req, res) {
        var passwordHash = bcrypt.hashSync(req.body.password);
        var users = req.db.collection('users');
        users.findOne({ email: req.body.email }).then(function (user) {
            if (user !== null) {
                return res.status(401).json({ error: 'Email address already in use' });
            }
            users.insertOne({ email: req.body.email, password: passwordHash }, function (err) {
                if (err)
                    return res.status(500).json({ error: 'Something went wrong trying to log in after creating a user' });
                return req.authenticate(req.body.email, req.body.password, function (user) {
                    console.log(user);
                    if (!user)
                        return res.status(401).json({ error: 'Invalid email or password' });
                    return res.json({ success: true, email: req.session.user.email });
                });
            });
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
    app.get('/api/v1/messages/:channel', function (req, res) {
        req.db.collection('messages').find({ channel: req.params.channel }, { limit: 20 }, function (err, messages) {
            if (!messages)
                return res.state(400).json({ json: err });
            messages.toArray(function (err, msgArray) {
                return res.json({ messages: msgArray.map(function (m) {
                        var objID = new mongodb_1.ObjectID(m['_id']);
                        m.created = objID.getTimestamp();
                        return m;
                    })
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
    app.get('/api/v1/users?', authorized_1["default"]);
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
function default_1(app) {
    index_1["default"](app);
}
exports["default"] = default_1;


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
var MongoStore = __webpack_require__(/*! connect-mongo */ "connect-mongo")(session);
var index_1 = __webpack_require__(/*! ./routes/index */ "./src/server/routes/index.ts");
var index_2 = __webpack_require__(/*! ./socket.io/index */ "./src/server/socket.io/index.ts");
var env = __webpack_require__(/*! ../../env */ "./env.js");
var app = express();
var port = 3000;
mongodb_1.MongoClient.connect(env.mongodbConnectionUri, { useNewUrlParser: true }, function (err, client) {
    if (err)
        return console.error(err);
    var db = client.db();
    app.use(function (req, res, next) {
        req.db = db;
        return next();
    });
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    var sessionMiddleware = session({
        secret: 'some secret',
        saveUninitialized: true,
        resave: false,
        cookie: {
            secure: false
        },
        store: new MongoStore({ db: db, collection: 'session' })
    });
    app.use(sessionMiddleware);
    app.use(function (req, res, next) {
        req.authenticate = function (username, password, done) {
            var users = db.collection('users');
            users.findOne({ email: username }).then(function (user) {
                if (user === null || !bcrypt.compareSync(password, user.password)) {
                    return done(false);
                }
                var sessionUser = { email: user.email };
                req.session.user = sessionUser;
                return done(sessionUser);
            });
        };
        req.logout = function () {
            req.session.user = null;
            req.session.destroy();
        };
        next();
    });
    index_1["default"](app);
    app.use(express.static(path.resolve(__dirname, '../../dist/public/')));
    app.get('*', function (req, res) {
        res.sendFile(path.resolve(__dirname, '../../dist/public/index.html'));
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

/***/ })

/******/ });
//# sourceMappingURL=server.js.map