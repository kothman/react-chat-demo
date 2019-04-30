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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aENvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmVyL2NvbnRyb2xsZXJzL2F1dGhDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQTZDO0FBQzdDLHFDQUFvQztBQUVwQyx1Q0FBNkM7QUFDN0MsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRXBDLHFCQUFlO0lBQ1gsS0FBSyxFQUFFLFVBQUMsR0FBWSxFQUFFLEdBQWE7UUFDL0IsSUFBSSxtQkFBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxJQUFJLG1CQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLEVBQUU7WUFDbkUsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxxQ0FBcUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDdkY7UUFDRCxJQUFJLENBQUMsbUJBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzFCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsMkJBQTJCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQzdFO1FBQ0QsR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFDLElBQW1CO1lBQ3BFLElBQUksQ0FBQyxJQUFJO2dCQUNMLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsMkJBQTJCLEVBQUUsQ0FBQyxDQUFD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

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbENvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmVyL2NvbnRyb2xsZXJzL2NoYW5uZWxDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNkNBQW9EO0FBRXBELHFCQUFlO0lBQ1gsUUFBUSxFQUFFLFVBQUMsR0FBWSxFQUFFLEdBQWE7UUFFbEMsT0FBTyxvQkFBTyxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLEtBQWE7WUFDdEQsSUFBSSxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtnQkFDaEMsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO29CQUNiLE9BQU8sT0FBTyxFQUFFLENBQUM7aUJBQ3BCO2dCQUNELG9CQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDdkQsT0FBTyxPQUFPLEVBQUUsQ0FBQztnQkFDckIsQ0FBQyxDQUFDLENBQUMsT0FBSyxDQUFBLENBQUMsVUFBQyxHQUFVO29CQUNoQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdkIsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDVixvQkFBTyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQW9CO29CQUM1QyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUM7Z0JBQ3RELENBQUMsQ0FBQyxDQUFDLE9BQUssQ0FBQSxDQUFDLFVBQUMsR0FBVTtvQkFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDakIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxxREFBcUQsRUFBRSxDQUFDLENBQUM7Z0JBQ2xHLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUMsT0FBSyxDQUFBLENBQUMsVUFBQyxHQUFVO2dCQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLDhEQUE4RCxFQUFDLENBQUMsQ0FBQztZQUN6RyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDLE9BQUssQ0FBQSxDQUFDLFVBQUMsR0FBVTtZQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsOENBQThDLEVBQUMsQ0FBQyxDQUFDO1FBQ3pGLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELFFBQU0sRUFBRSxVQUFDLEdBQVksRUFBRSxHQUFhO0lBRXBDLENBQUM7SUFDRCxNQUFNLEVBQUUsVUFBQyxHQUFZLEVBQUUsR0FBYTtJQUVwQyxDQUFDO0NBQ0osQ0FBQSJ9

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZUNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmVyL2NvbnRyb2xsZXJzL21lc3NhZ2VDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNkNBQW9EO0FBQ3BELHFCQUFlO0lBQ1gsUUFBUSxFQUFFLFVBQUMsR0FBWSxFQUFFLEdBQWE7UUFDbEMsT0FBTyxvQkFBTyxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBQyxDQUFDO2FBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNqQyxJQUFJLENBQUMsRUFBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQzthQUNmLEtBQUssQ0FBQyxFQUFFLENBQUM7YUFDVCxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxRQUFvQjtZQUM5QixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUN2QixRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQVc7b0JBQ2hDLE9BQU87d0JBQ0gsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJO3dCQUNaLE9BQU8sRUFBRSxDQUFDLENBQUMsU0FBUzt3QkFDcEIsU0FBUyxFQUFFLENBQUMsQ0FBQyxTQUFTO3dCQUN0QixPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU87d0JBQ2xCLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRztxQkFDYixDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRTthQUNmLENBQUMsQ0FBQTtRQUNYLENBQUMsQ0FBQyxDQUFDLE9BQUssQ0FBQSxDQUFDLFVBQUMsR0FBVTtZQUNoQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLCtDQUErQyxFQUFFLENBQUMsQ0FBQztRQUM1RixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FDSixDQUFBIn0=

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
        if (!req.body.email || !validator_1.isEmail(req.body.email))
            return res.status(400).json({ error: 'Invalid data for parameter "email"' });
        return User_1["default"].findByEmail(req.body.email).exec(function (err, user) {
            if (err) {
                console.log('Something went wrong', err);
                return res.status(500).json({ error: 'Something went wrong' });
            }
            if (!user)
                return res.status(404).json({ error: 'User does not exist' });
            if (user.deleted)
                return res.status(400).json({ error: 'User already deleted' });
            if (req.user.email === req.body.email)
                return res.status(400).json({ error: 'Cannot delete current user' });
            user.deleted = true;
            return user.save(function (err) {
                return res.status(200).json({ success: true });
            });
        });
    },
    restoreUser: function (req, res) {
        if (!req.body.email || !validator_1.isEmail(req.body.email))
            return res.status(400).json({ error: 'Invalid data for parameter "email"' });
        return User_1["default"].findByEmail(req.body.email).exec(function (err, user) {
            if (err) {
                console.log('Something went wrong', err);
                return res.status(500).json({ error: 'Something went wrong' });
            }
            if (!user)
                return res.status(404).json({ error: 'User does not exist' });
            if (!user.deleted)
                return res.status(400).json({ error: 'User already active' });
            user.deleted = false;
            return user.save(function (err) {
                return res.status(200).json({ success: true });
            });
        });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlckNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmVyL2NvbnRyb2xsZXJzL3VzZXJDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQTJDO0FBRTNDLHVDQUF5RDtBQUN6RCxxQ0FBK0M7QUFFL0MscUJBQWU7SUFDWCxJQUFJLEVBQUUsVUFBQyxHQUFZLEVBQUUsR0FBYTtRQUM5QixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBQ0QsS0FBSyxFQUFFLFVBQUMsR0FBWSxFQUFFLEdBQWE7UUFDL0IsT0FBTyxpQkFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxLQUFjO1lBQy9ELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBQy9ELENBQUMsQ0FBQyxDQUFDLE9BQUssQ0FBQSxDQUFDLFVBQUMsR0FBVTtZQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsNkNBQTZDLEVBQUMsQ0FBQyxDQUFDO1FBQ3hGLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNELFdBQVcsRUFBRSxVQUFDLEdBQVksRUFBRSxHQUFhO1FBQ3JDLElBQUcsQ0FBQyxtQkFBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3hCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxL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

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmVyL21pZGRsZXdhcmUvYWRtaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQkFBd0IsR0FBUSxFQUFFLEdBQVEsRUFBRSxJQUFjO0lBQ3RELElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7UUFDdkMsT0FBTyxJQUFJLEVBQUUsQ0FBQztLQUNqQjtJQUNELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUseUJBQXlCLEVBQUUsQ0FBQyxDQUFDO0FBQ3RFLENBQUM7QUFMRCwrQkFLQyJ9

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXplZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbWlkZGxld2FyZS9hdXRob3JpemVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkNBQXNDO0FBR3RDLElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNwQyxtQkFBd0IsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFjO0lBQy9ELElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMvRCxJQUFJLENBQUMsS0FBSztRQUNOLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO0lBRTdELHFCQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsVUFBQyxHQUFVLEVBQUUsT0FBYztRQUNqRCxJQUFJLEdBQUc7WUFBRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQztRQUNsRSxHQUFHLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztRQUNuQixPQUFPLElBQUksRUFBRSxDQUFDO0lBQ2xCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVZELCtCQVVDIn0=

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbW9kZWxzL0NoYW5uZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBd0Q7QUFReEQsSUFBTSxhQUFhLEdBQVcsSUFBSSxpQkFBTSxDQUFDO0lBQ3JDLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7UUFDZCxTQUFTLEVBQUUsSUFBSTtLQUNsQjtDQUNKLEVBQUU7SUFDQyxVQUFVLEVBQUUsSUFBSTtDQUNuQixDQUFDLENBQUM7QUFFSCxJQUFNLE9BQU8sR0FBb0IsZ0JBQUssQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDakUscUJBQWUsT0FBTyxDQUFDIn0=

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbW9kZWxzL01lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBd0Q7QUFVeEQsSUFBTSxhQUFhLEdBQVcsSUFBSSxpQkFBTSxDQUFDO0lBQ3JDLE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7S0FFakI7SUFDRCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtRQUNkLFNBQVMsRUFBRSxJQUFJO0tBRWxCO0NBQ0osRUFBRTtJQUNDLFVBQVUsRUFBRSxJQUFJO0NBQ25CLENBQUMsQ0FBQztBQUVILElBQU0sT0FBTyxHQUFvQixnQkFBSyxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUNqRSxxQkFBZSxPQUFPLENBQUMifQ==

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
    deleted: {
        type: Boolean,
        "default": false
    }
}, {
    timestamps: true
});
userSchema.statics.findByEmail = function (email) {
    return this.findOne({ email: email });
};
var User = mongoose_1.model('User', userSchema);
exports["default"] = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbW9kZWxzL1VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBOEU7QUFXN0UsQ0FBQztBQU1GLElBQU0sVUFBVSxHQUFXLElBQUksaUJBQU0sQ0FBQztJQUNsQyxJQUFJLEVBQUUsTUFBTTtJQUNaLEtBQUssRUFBRTtRQUNILFFBQVEsRUFBRSxJQUFJO1FBQ2QsSUFBSSxFQUFFLE1BQU07UUFDWixTQUFTLEVBQUUsSUFBSTtLQUNsQjtJQUNELFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsU0FBUyxFQUFFLElBQUk7UUFDZixNQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO0tBQzFCO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLE9BQU87UUFDYixTQUFPLEVBQUUsS0FBSztLQUNqQjtDQUNKLEVBQUU7SUFDQyxVQUFVLEVBQUUsSUFBSTtDQUNuQixDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxVQUFVLEtBQWE7SUFDcEQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7QUFDeEMsQ0FBQyxDQUFBO0FBRUQsSUFBTSxJQUFJLEdBQWUsZ0JBQUssQ0FBb0IsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3RFLHFCQUFlLElBQUksQ0FBQyJ9

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
    app["delete"]('/api/v1/user/delete', admin_1["default"], userController_1["default"].deleteUser);
    app.put('/api/v1/user/restore', admin_1["default"], userController_1["default"].restoreUser);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZlci9yb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQkFBNkI7QUFFN0Isc0RBQWlEO0FBQ2pELDRDQUF1QztBQUN2QywrREFBMEQ7QUFDMUQsK0RBQTBEO0FBQzFELHFFQUFnRTtBQUNoRSxxRUFBZ0U7QUFFaEUsbUJBQXdCLEdBQVE7SUFHNUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsVUFBVSxHQUFZLEVBQUUsR0FBYTtRQUM5QyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsOEJBQThCLENBQUMsRUFDdkQsRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQ2pDLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQVUsR0FBUSxFQUFFLEdBQVE7UUFDM0MsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLHdDQUF3QyxDQUFDLENBQ3BFLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFVBQVUsR0FBUSxFQUFFLEdBQVE7UUFDaEQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLHVDQUF1QyxDQUFDLENBQ25FLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUlILEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLDJCQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEQsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSwyQkFBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RELEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsMkJBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqRCxHQUFHLENBQUMsR0FBRyxDQUFDLHlCQUF5QixFQUFFLDJCQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFL0QsR0FBRyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsdUJBQVUsQ0FBQyxDQUFDO0lBQ3JDLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLDJCQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsR0FBRyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsMkJBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUM5QyxHQUFHLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLDJCQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDMUQsR0FBRyxDQUFDLElBQUksQ0FBQywyQkFBMkIsRUFBRSwyQkFBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xFLEdBQUcsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsMkJBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNoRSxHQUFHLENBQUMsSUFBSSxDQUFDLDhCQUE4QixFQUFFLDJCQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDeEUsR0FBRyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsRUFBRSwyQkFBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3RFLEdBQUcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsa0JBQUssRUFBRSwyQkFBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xFLEdBQUcsQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsa0JBQUssRUFBRSwyQkFBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9ELEdBQUcsQ0FBQyxRQUFNLENBQUEsQ0FBQyxxQkFBcUIsRUFBRSxrQkFBSyxFQUFFLDJCQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDcEUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxrQkFBSyxFQUFFLDJCQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFbkUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSx1QkFBVSxDQUFDLENBQUM7SUFDeEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsRUFBRSw4QkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUV6RSxHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLHVCQUFVLENBQUMsQ0FBQztJQUN2QyxHQUFHLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLDhCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hELEdBQUcsQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUUsa0JBQUssRUFBRSw4QkFBaUIsQ0FBQyxRQUFNLENBQUEsQ0FBQyxDQUFDO0lBQ3JFLEdBQUcsQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUUsa0JBQUssRUFBRSw4QkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUdyRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxVQUFVLEdBQVksRUFBRSxHQUFhO1FBQzlDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FDYixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSw4QkFBOEIsQ0FBQyxFQUN2RCxFQUFFLFNBQVMsRUFBRSxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FDakMsQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQXpERCwrQkF5REMifQ==
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZlci9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSwyQkFBNkI7QUFDN0IsaUNBQW1DO0FBQ25DLDJCQUE2QjtBQUU3QixtQ0FBcUM7QUFDckMsNEJBQThCO0FBQzlCLDRDQUE4QztBQUM5Qyx5Q0FBMkM7QUFDM0Msd0NBQTBDO0FBQzFDLGlDQUFtQztBQUNuQywrQkFBaUM7QUFFakMseUNBQTJDO0FBQzNDLDZDQUFvQztBQUNwQyxJQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUNwRCxJQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7QUFFckQsbUNBQThCO0FBQzlCLDJDQUEwQztBQUUxQyxzQ0FBNEM7QUFDNUMsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBRWpDLElBQU0sR0FBRyxHQUFRLE9BQU8sRUFBRSxDQUFDO0FBbUlsQixrQkFBRztBQWxJWixJQUFNLElBQUksR0FBb0IsR0FBRyxDQUFDLElBQUksQ0FBQztBQUN2QyxJQUFJLE1BQW1CLENBQUM7QUFDeEIsSUFBSSxZQUE2QixDQUFDO0FBZ0lwQixvQ0FBWTtBQTlIMUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQztBQUN0QyxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUUvQixHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7QUFFdkIsSUFBTSxpQkFBaUIsR0FBRyxPQUFPLENBQUM7SUFDOUIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNO0lBQ2xCLE1BQU0sRUFBRTtRQUNKLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJO1FB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
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmVyL3NvY2tldC5pby9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9DQUFzQztBQUd0Qyw2Q0FBdUQ7QUFDdkQsNkNBQXNEO0FBRXRELElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQU1wQyxJQUFNLElBQUksR0FBRyxVQUFDLE1BQWMsRUFBRSxFQUFjO0lBQ3hDLElBQU0sRUFBRSxHQUFvQixRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0MsSUFBSSxtQkFBbUIsR0FBYSxFQUFFLENBQUM7SUFHdkMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsd0JBQVksQ0FBQztRQUN6QixNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07UUFDbEIsT0FBTyxFQUFFLEtBQUs7UUFDZCxtQkFBbUIsRUFBRSxLQUFLO0tBQzdCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsVUFBQyxNQUFjO1FBRW5DLG1CQUFtQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUNwRCxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxVQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSTtZQUNyRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFSixNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRTtZQUNwQixtQkFBbUIsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDN0UsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsVUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUk7Z0JBQ3JFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBQyxPQUEwQztZQUM1RCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxHQUFhLElBQUksb0JBQU8sQ0FBQztnQkFDMUIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO2dCQUN4QixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7Z0JBQ2xCLFNBQVMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUs7YUFDOUIsQ0FBQyxDQUFDO1lBQ0gsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLENBQVc7Z0JBQ3RCLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO29CQUNmLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRztvQkFDVixTQUFTLEVBQUUsQ0FBQyxDQUFDLFNBQVM7b0JBQ3RCLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtvQkFDWixPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU87b0JBQ2xCLE9BQU8sRUFBRSxDQUFDLENBQUMsU0FBUztpQkFDdkIsQ0FBQyxDQUFDO2dCQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsQ0FBQyxPQUFLLENBQUEsQ0FBQyxVQUFDLEdBQVU7Z0JBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDOUMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsT0FBTyxFQUFFLENBQUM7QUFDZCxDQUFDLENBQUE7QUFFRCxxQkFBZSxJQUFJLENBQUMifQ==

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbHNBY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3dlYi9hY3Rpb25zL2NoYW5uZWxzQWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQkE4SUE7O0FBN0lBLCtCQUF5RDtBQUV6RCwrREFBeUQ7QUFFNUMsUUFBQSxZQUFZLEdBQUcsY0FBYyxDQUFDO0FBQzlCLFFBQUEsaUNBQWlDLEdBQUcsbUNBQW1DLENBQUM7QUFDeEUsUUFBQSw2QkFBNkIsR0FBRyw4QkFBOEIsQ0FBQztBQUMvRCxRQUFBLDRCQUE0QixHQUFHLDhCQUE4QixDQUFDO0FBQzlELFFBQUEsOEJBQThCLEdBQUcsZ0NBQWdDLENBQUM7QUFDbEUsUUFBQSwwQ0FBMEMsR0FBRyw0Q0FBNEMsQ0FBQztBQUMxRixRQUFBLHlCQUF5QixHQUFHLDJCQUEyQixDQUFDO0FBQ3hELFFBQUEsbUJBQW1CLEdBQUcscUJBQXFCLENBQUM7QUFFNUMsUUFBQSxXQUFXLEdBQUcsVUFBQyxZQUFzQjtJQUM5QyxJQUFJLFFBQVEsR0FBVSxFQUFFLENBQUM7SUFDekIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQVk7UUFDOUIsUUFBUSxDQUFDLElBQUksQ0FBQztZQUNWLElBQUksRUFBRSxJQUFJO1lBQ1YsUUFBUSxFQUFFLEVBQUU7WUFDWixzQkFBc0IsRUFBRSxDQUFDO1lBQ3pCLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLG1CQUFtQixFQUFFLEtBQUs7U0FDN0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPO1FBQ0gsSUFBSSxFQUFFLG9CQUFZO1FBQ2xCLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7S0FDL0IsQ0FBQztBQUNOLENBQUMsQ0FBQTtBQUVZLFFBQUEsc0NBQXNDLEdBQUcsVUFBQyxPQUFlLEVBQUUsQ0FBUztJ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

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdFVzZXJzQWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy93ZWIvYWN0aW9ucy9jaGF0VXNlcnNBY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQXlEO0FBSXpELCtEQUFrRDtBQUVyQyxRQUFBLGlCQUFpQixHQUFHLG1CQUFtQixDQUFDO0FBQ3hDLFFBQUEsYUFBYSxHQUFHLFVBQVUsQ0FBQztBQUMzQixRQUFBLGdCQUFnQixHQUFHLGFBQWEsQ0FBQztBQUVqQyxRQUFBLFdBQVcsR0FBRyxVQUFTLEtBQVk7SUFDNUMsT0FBTztRQUNILElBQUksRUFBRSx5QkFBaUI7UUFDdkIsSUFBSSxFQUFFO1lBQ0YsS0FBSyxFQUFFLEtBQUs7U0FDZjtLQUNKLENBQUE7QUFDTCxDQUFDLENBQUE7QUFFWSxRQUFBLE9BQU8sR0FBRyxVQUFTLElBQWM7SUFDMUMsT0FBTztRQUNILElBQUksRUFBRSxxQkFBYTtRQUNuQixJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsSUFBSTtTQUNiO0tBQ0osQ0FBQTtBQUNMLENBQUMsQ0FBQTtBQUVZLFFBQUEsVUFBVSxHQUFHLFVBQVMsS0FBYTtJQUM1QyxPQUFPO1FBQ0gsSUFBSSxFQUFFLHdCQUFnQjtRQUN0QixJQUFJLEVBQUU7WUFDRixLQUFLLEVBQUUsS0FBSztTQUNmO0tBQ0osQ0FBQTtBQUNMLENBQUMsQ0FBQTtBQUdZLFFBQUEsYUFBYSxHQUFHO0lBQ3pCLE9BQU8sVUFBQyxRQUFrQjtRQUN0QixPQUFPLGtCQUFLLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQWtCO1lBQ3RELElBQUksS0FBSyxHQUFVLEVBQUUsQ0FBQztZQUN0QixHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFXO2dCQUMvQixLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHO29CQUNiLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtvQkFDWixJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7aUJBQ2YsQ0FBQztZQUNOLENBQUMsQ0FBQyxDQUFDO1lBQ0gsUUFBUSxDQUFDLG1CQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUM3QixPQUFPLEdBQUcsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDLE9BQUssQ0FBQSxDQUFDLFVBQUMsR0FBZTtZQUNyQixRQUFRLENBQUMsK0JBQVEsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLENBQUM7WUFDaEQsT0FBTyxHQUFHLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQTtBQUNMLENBQUMsQ0FBQTtBQUVZLFFBQUEsYUFBYSxHQUFHLFVBQUMsSUFBYztJQUN4QyxPQUFPLFVBQUMsUUFBa0I7UUFDdEIsT0FBTyxrQkFBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUNoQyxDQUFDLENBQUE7QUFDTCxDQUFDLENBQUE7QUFFWSxRQUFBLFFBQVEsR0FBRyxVQUFDLEtBQWEsRUFBRSxJQUFjO0FBRXRELENBQUMsQ0FBQTtBQUVZLFFBQUEsVUFBVSxHQUFHLFVBQUMsS0FBYTtBQUV4QyxDQUFDLENBQUEifQ==

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uc0FjdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvd2ViL2FjdGlvbnMvbm90aWZpY2F0aW9uc0FjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBYSxRQUFBLFNBQVMsR0FBRyxXQUFXLENBQUM7QUFDeEIsUUFBQSxZQUFZLEdBQUcsY0FBYyxDQUFDO0FBQzlCLFFBQUEsWUFBWSxHQUFHLGNBQWMsQ0FBQztBQUM5QixRQUFBLFFBQVEsR0FBRyxVQUFVLENBQUM7QUFDdEIsUUFBQSxXQUFXLEdBQUcsYUFBYSxDQUFDO0FBQzVCLFFBQUEsV0FBVyxHQUFHLGFBQWEsQ0FBQztBQUU1QixRQUFBLFFBQVEsR0FBRyxVQUFDLEtBQWE7SUFDbEMsT0FBTztRQUNILElBQUksRUFBRSxpQkFBUztRQUNmLElBQUksRUFBRSxLQUFLO0tBQ2QsQ0FBQztBQUNOLENBQUMsQ0FBQTtBQUVZLFFBQUEsV0FBVyxHQUFHLFVBQUMsQ0FBUztJQUNqQyxPQUFPO1FBQ0gsSUFBSSxFQUFFLG9CQUFZO1FBQ2xCLElBQUksRUFBRSxDQUFDO0tBQ1YsQ0FBQztBQUNOLENBQUMsQ0FBQTtBQUVZLFFBQUEsV0FBVyxHQUFHO0lBQ3ZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsb0JBQVksRUFBRSxDQUFDO0FBQ2xDLENBQUMsQ0FBQTtBQUVZLFFBQUEsT0FBTyxHQUFHLFVBQUMsSUFBWTtJQUNoQyxPQUFPO1FBQ0gsSUFBSSxFQUFFLGdCQUFRO1FBQ2QsSUFBSSxFQUFFLElBQUk7S0FDYixDQUFDO0FBQ04sQ0FBQyxDQUFBO0FBRVksUUFBQSxVQUFVLEdBQUcsVUFBQyxDQUFTO0lBQ2hDLE9BQU87UUFDSCxJQUFJLEVBQUUsbUJBQVc7UUFDakIsSUFBSSxFQUFFLENBQUM7S0FDVixDQUFDO0FBQ04sQ0FBQyxDQUFBO0FBRVksUUFBQSxVQUFVLEdBQUc7SUFDdEIsT0FBTztRQUNILElBQUksRUFBRSxtQkFBVztLQUNwQixDQUFDO0FBQ04sQ0FBQyxDQUFBIn0=

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhckFjdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvd2ViL2FjdGlvbnMvc2lkZWJhckFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBYSxRQUFBLG1CQUFtQixHQUFHLHFCQUFxQixDQUFDO0FBRTVDLFFBQUEsaUJBQWlCLEdBQUc7SUFDN0IsT0FBTztRQUNILElBQUksRUFBRSwyQkFBbUI7S0FDNUIsQ0FBQTtBQUNMLENBQUMsQ0FBQSJ9

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0QWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy93ZWIvYWN0aW9ucy9zb2NrZXRBY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQXVDO0FBSzFCLFFBQUEsY0FBYyxHQUFHLGdCQUFnQixDQUFDO0FBQ2xDLFFBQUEsb0JBQW9CLEdBQUcsc0JBQXNCLENBQUM7QUFDOUMsUUFBQSwwQkFBMEIsR0FBRyw0QkFBNEIsQ0FBQztBQUUxRCxRQUFBLGFBQWEsR0FBRyxVQUFDLEVBQXlCO0lBQ25ELE9BQU87UUFDSCxJQUFJLEVBQUUsc0JBQWM7UUFDcEIsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtLQUNuQixDQUFDO0FBQ04sQ0FBQyxDQUFBO0FBRVksUUFBQSxrQkFBa0IsR0FBRyxVQUFDLFNBQWtCO0lBQ2pELE9BQU87UUFDSCxJQUFJLEVBQUUsNEJBQW9CO1FBQzFCLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUU7S0FDakMsQ0FBQTtBQUNMLENBQUMsQ0FBQTtBQUVZLFFBQUEsdUJBQXVCLEdBQUcsVUFBQyxVQUFvQjtJQUN4RCxPQUFPO1FBQ0gsSUFBSSxFQUFFLGtDQUEwQjtRQUNoQyxJQUFJLEVBQUUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFO0tBQ25DLENBQUE7QUFDTCxDQUFDLENBQUE7QUFFWSxRQUFBLElBQUksR0FBRztJQUNoQixPQUFPLFVBQUMsUUFBa0IsRUFBRSxRQUFrQjtRQUMxQyxJQUFJLE1BQU0sR0FBMEIsRUFBRSxFQUFFLENBQUM7UUFDekMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUU7WUFDakIsTUFBTTtpQkFDRCxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDdEQsRUFBRSxDQUFDLGVBQWUsRUFBRTtnQkFDakIsUUFBUSxDQUFDLDBCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQzlDLE1BQU0sQ0FBQyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsVUFBQyxVQUFvQjtvQkFDOUMsUUFBUSxDQUFDLCtCQUF1QixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDO2lCQUNELEVBQUUsQ0FBQyxjQUFjLEVBQUUsVUFBVSxHQUFRO2dCQUNsQyxRQUFRLENBQUMsMEJBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN6RCxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQyxDQUFDLENBQUMsQ0FBQTtRQUNWLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUU7WUFDcEIsUUFBUSxDQUFDLDBCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQywwREFBMEQsQ0FBQyxDQUFDO1FBQzVFLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxRQUFRLENBQUMscUJBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FBQTtBQUNMLENBQUMsQ0FBQSJ9

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlckFjdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvd2ViL2FjdGlvbnMvdXNlckFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBeUQ7QUFFekQscURBQW9EO0FBQ3BELCtEQUF5RDtBQUU1QyxRQUFBLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQztBQUNsQyxRQUFBLFFBQVEsR0FBRyxVQUFVLENBQUM7QUFDdEIsUUFBQSxXQUFXLEdBQUcsYUFBYSxDQUFDO0FBQzVCLFFBQUEsT0FBTyxHQUFHLFNBQVMsQ0FBQztBQUVwQixRQUFBLGFBQWEsR0FBRyxVQUFDLFVBQW1CO0lBQzdDLE9BQVE7UUFDSixJQUFJLEVBQUUsc0JBQWM7UUFDcEIsSUFBSSxFQUFFLFVBQVU7S0FDbkIsQ0FBQztBQUNOLENBQUMsQ0FBQTtBQUVZLFFBQUEsT0FBTyxHQUFHLFVBQUMsSUFBZTtJQUNuQyxPQUFPO1FBQ0gsSUFBSSxFQUFFLGdCQUFRO1FBQ2QsSUFBSSxFQUFFLElBQUk7S0FDYixDQUFDO0FBQ04sQ0FBQyxDQUFBO0FBRVksUUFBQSxVQUFVLEdBQUc7SUFDdEIsT0FBTztRQUNILElBQUksRUFBRSxtQkFBVztLQUNwQixDQUFDO0FBQ04sQ0FBQyxDQUFBO0FBRVksUUFBQSxNQUFNLEdBQUcsVUFBQyxLQUFhO0lBQ2hDLE9BQU87UUFDSCxJQUFJLEVBQUUsZUFBTztRQUNiLElBQUksRUFBRSxLQUFLO0tBQ2QsQ0FBQztBQUNOLENBQUMsQ0FBQTtBQUVZLFFBQUEsTUFBTSxHQUFHO0lBQ2xCLE9BQU8sVUFBQyxRQUFhO1FBQ2pCLFFBQVEsQ0FBQyxrQkFBVSxFQUFFLENBQUMsQ0FBQztRQUN2QixPQUFPLFFBQVEsQ0FBQyxtQ0FBaUIsRUFBRSxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFBO0FBRUwsQ0FBQyxDQUFBO0FBR1ksUUFBQSxVQUFVLEdBQUcsVUFBQyxJQUFZLEVBQUUsU0FBb0I7SUFDekQs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

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvd2ViL3JlZHVjZXJzL2NoYW5uZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOERBT3NDO0FBMEJ0QyxJQUFJLFlBQVksR0FBVSxFQUFFLENBQUM7QUFFaEIsUUFBQSxhQUFhLEdBQUcsVUFBQyxRQUEyQixFQUFFLFdBQW1CO0lBQzFFLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUUsVUFBQyxDQUFVO1FBQ3BDLE9BQU8sQ0FBQyxDQUFDLElBQUksS0FBSyxXQUFXLENBQUM7SUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDSCxJQUFJLENBQUMsT0FBTztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQzNCLE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUMsQ0FBQTtBQUVELG1CQUF5QixLQUEyQixFQUFFLE1BQWM7SUFBM0Msc0JBQUEsRUFBQSxvQkFBMkI7SUFDaEQsUUFBTyxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQ2hCLEtBQUssOEJBQVk7WUFDYixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ2hDLEtBQUssNERBQTBDLENBQUMsQ0FBQztZQUM3QyxJQUFJLFNBQU8sR0FBWSxxQkFBYSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pFLElBQUksV0FBUyxHQUFXLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzlDLElBQUksQ0FBQyxTQUFPLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvREFBb0QsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDMUUsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFDRCxJQUFJLGFBQVcsR0FBYyxLQUFLLENBQUMsR0FBRyxDQUFFLFVBQUMsQ0FBVTtnQkFDL0MsSUFBRyxDQUFDLENBQUMsSUFBSSxLQUFLLFNBQU8sQ0FBQyxJQUFJLEVBQUU7b0JBQ3hCLENBQUMsQ0FBQyxzQkFBc0IsSUFBSSxXQUFTLENBQUM7aUJBQ3pDO2dCQUNELE9BQU8sQ0FBQyxDQUFDO1lBQ2IsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLGFBQVcsQ0FBQztTQUN0QjtRQUNELEtBQUssbURBQWlDO1lBQ2xDLElBQUksT0FBTyxHQUFZLHFCQUFhLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDckUsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNuRSxPQUFPLEtBQUssQ0FBQzthQUNoQjtZQUNELElBQUksV0FBVyxHQUFjLEtBQUssQ0FBQyxHQUFHLENBQUUsVUFBQyxDQUFVO2dCQUMvQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7b0JBQ3BDLENBQUMsQ0FBQyxtQkFBbUIsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztpQkFDbEQ7Z0JBQ0QsT0FBTyxDQUFDLENBQUM7WUFDYixDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sV0FBVyxDQUFDO1FBQ3ZCLEtBQUssK0NBQTZCLENBQUMsQ0FBQztZQUNoQyxJQUFJLFNBQU8sR0FBWSxxQkFBYSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3JFLElBQUksU0FBTyxHQUFZLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQzNDLElBQUksQ0FBQyxTQUFPLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnREFBZ0QsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDdEUsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFDRCxJQUFJLGFBQVcsR0FBYyxLQUFLLENBQUMsR0FBRyxDQUFFLFVBQUMsQ0FBVTtnQkFDL0MsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVztvQkFDbEMsQ0FBQyxDQUFDLGVBQWUsR0FBRyxTQUFPLENBQUM7Z0JBQ2hDLE9BQU8sQ0FBQyxDQUFDO1lBQ2IsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLGFBQVcsQ0FBQztTQUN0QjtRQUNELEtBQUssZ0RBQThCLENBQUMsQ0FBQztZQUNqQyxJQUFJLG1CQUFpQixHQUFjLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3hELElBQUksYUFBVyxHQUFXLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ2xELElBQUksU0FBTyxHQUFZLHFCQUFhLENBQUMsS0FBSyxFQUFFLGFBQVcsQ0FBQyxDQUFDO1lBQ3pELElBQUcsQ0FBQyxTQUFPLEVBQUU7Z0JBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5REFBeUQsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDL0UsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFDRCxJQUFJLGFBQVcsR0FBYyxLQUFLLENBQUMsR0FBRyxDQUFFLFVBQUMsQ0FBVTtnQkFDL0MsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLGFBQVc7b0JBQ3RCLENBQUMsQ0FBQyxRQUFRLEdBQUcsbUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEQsT0FBTyxDQUFDLENBQUM7WUFDYixDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sYUFBVyxDQUFDO1NBQ3RCO1FBQ0QsS0FBSyw4Q0FBNEIsQ0FBQyxDQUFDO1lBQy9CLElBQUksaUJBQWUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUMxQyxJQUFJLGFBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUMxQyxJQUFJLFNBQU8sR0FBWSxxQkFBYSxDQUFDLEtBQUssRUFBRSxhQUFXLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsU0FBTyxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0NBQStDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUM1RSxPQUFPLEtBQUssQ0FBQzthQUNoQjtZQUNELElBQUksYUFBVyxHQUFjLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFVO2dCQUM5QyxJQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssYUFBVztvQkFDckIsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGlCQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUN0RCxPQUFPLENBQUMsQ0FBQztZQUNiLENBQUMsQ0FBQyxDQUFBO1lBQ0YsT0FBTyxhQUFXLENBQUM7U0FDdEI7UUFDRCxLQUFLLHFDQUFtQjtZQUNwQixPQUFPLEVBQUUsQ0FBQztRQUNkO1lBQ0ksT0FBTyxLQUFLLENBQUM7S0FDcEI7QUFDTCxDQUFDO0FBakZELCtCQWlGQyJ9

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdFVzZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3dlYi9yZWR1Y2Vycy9jaGF0VXNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxnRUFDdUM7QUFldkMsSUFBSSxZQUFZLEdBQVUsRUFFekIsQ0FBQTtBQUVELG1CQUF3QixLQUEyQixFQUFFLE1BQWlCO0lBQTlDLHNCQUFBLEVBQUEsb0JBQTJCOztJQUMvQyxRQUFPLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFDaEIsS0FBSyxvQ0FBaUI7WUFDbEIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUM3QixLQUFLLGdDQUFhO1lBQ2QsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLO2dCQUMxQixHQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBRztvQkFDdEIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUk7b0JBQzNCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJO2lCQUM5QjtvQkFDSCxDQUFDO1FBQ1AsS0FBSyxtQ0FBZ0I7WUFDakIsSUFBSSxLQUFLLEdBQVUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDNUMsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNuQztZQUNJLE9BQU8sS0FBSyxDQUFDO0tBQ3BCO0FBQ0wsQ0FBQztBQWpCRCwrQkFpQkMifQ==

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy93ZWIvcmVkdWNlcnMvbm90aWZpY2F0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdFQUMyQztBQVczQyxJQUFJLFlBQVksR0FBVTtJQUN0QixNQUFNLEVBQUUsRUFBRTtJQUNWLEtBQUssRUFBRSxFQUFFO0NBQ1osQ0FBQTtBQUVELG1CQUF3QixLQUEyQixFQUFFLE1BQWM7SUFBM0Msc0JBQUEsRUFBQSxvQkFBMkI7SUFDL0MsUUFBTyxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQ2hCLEtBQUssZ0NBQVM7WUFDVixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUNsRixLQUFLLG1DQUFZO1lBQ2IsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUMxQyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEMsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBQyxNQUFNLEVBQUUsY0FBYyxFQUFDLENBQUMsQ0FBQztRQUM5RCxLQUFLLG1DQUFZO1lBQ2IsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUcsRUFBQyxNQUFNLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQztRQUNuRCxLQUFLLCtCQUFRO1lBQ1QsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7UUFDaEYsS0FBSyxrQ0FBVztZQUNaLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDeEMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFDOUQsS0FBSyxrQ0FBVztZQUNaLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQyxDQUFDLENBQUM7UUFDakQ7WUFDSSxPQUFPLEtBQUssQ0FBQztLQUNwQjtBQUNMLENBQUM7QUFyQkQsK0JBcUJDIn0=

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy93ZWIvcmVkdWNlcnMvc2lkZWJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDREQUFnRTtBQU1oRSxJQUFJLFlBQVksR0FBVTtJQUN0QixJQUFJLEVBQUUsSUFBSTtDQUNiLENBQUE7QUFFRCxtQkFBd0IsS0FBMkIsRUFBRSxNQUFjO0lBQTNDLHNCQUFBLEVBQUEsb0JBQTJCO0lBQy9DLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtRQUNqQixLQUFLLG9DQUFtQjtZQUNwQixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQ3pEO1lBQ0ksT0FBTyxLQUFLLENBQUM7S0FDcEI7QUFDTCxDQUFDO0FBUEQsK0JBT0MifQ==

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3dlYi9yZWR1Y2Vycy9zb2NrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSwwREFHb0M7QUFRcEMsSUFBSSxZQUFZLEdBQVU7SUFDdEIsRUFBRSxFQUFFLElBQUk7SUFDUixTQUFTLEVBQUUsS0FBSztJQUNoQixtQkFBbUIsRUFBRSxFQUFFO0NBQzFCLENBQUE7QUFFRCxtQkFBd0IsS0FBMkIsRUFBRSxNQUFpQjtJQUE5QyxzQkFBQSxFQUFBLG9CQUEyQjtJQUMvQyxRQUFPLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFDaEIsS0FBSyw4QkFBYztZQUNmLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQztRQUMxRCxLQUFLLG9DQUFvQjtZQUNyQixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUM7UUFDeEUsS0FBSywwQ0FBMEI7WUFDM0IsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBQyxtQkFBbUIsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUE7UUFDbkY7WUFDSSxPQUFPLEtBQUssQ0FBQztLQUNwQjtBQUNMLENBQUM7QUFYRCwrQkFXQyJ9

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy93ZWIvcmVkdWNlcnMvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNEQUFzRjtBQWV0RixJQUFJLFlBQVksR0FBVztJQUN2QixVQUFVLEVBQUUsS0FBSztJQUNqQixLQUFLLEVBQUUsS0FBSztJQUNaLElBQUksRUFBRSxLQUFLO0lBQ1gsSUFBSSxFQUFFLEtBQUs7SUFDWCxHQUFHLEVBQUUsS0FBSztDQUNiLENBQUE7QUFHRCxtQkFBd0IsS0FBMkIsRUFBRSxNQUFjO0lBQTNDLHNCQUFBLEVBQUEsb0JBQTJCO0lBQy9DLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtRQUNqQixLQUFLLDRCQUFjO1lBQ2YsSUFBSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO2dCQUNsQyxPQUFPLENBQUMsS0FBSyxDQUFDLGdEQUFnRCxDQUFDLENBQUM7Z0JBQ2hFLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1lBQ0QsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLEtBQUs7Z0JBQ3JCLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztZQUN2RSxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUMvRCxLQUFLLHNCQUFRO1lBQ1QsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pELEtBQUsseUJBQVc7WUFDWixPQUFPO2dCQUNILFVBQVUsRUFBRSxLQUFLO2dCQUNqQixJQUFJLEVBQUUsS0FBSztnQkFDWCxLQUFLLEVBQUUsS0FBSztnQkFDWixJQUFJLEVBQUUsS0FBSzthQUNkLENBQUE7UUFDTCxLQUFLLHFCQUFPO1lBQ1IsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBQyxDQUFDLENBQUM7UUFDMUQ7WUFDSSxPQUFPLEtBQUssQ0FBQztLQUNwQjtBQUNMLENBQUM7QUF4QkQsK0JBd0JDIn0=

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvd2ViL3N0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQTRGO0FBQzVGLDJDQUFxQztBQUNyQyw2Q0FBMEM7QUFFMUMsd0NBQWdFO0FBQ2hFLGdEQUE0RTtBQUM1RSwwREFBMkY7QUFDM0YsOENBQXlFO0FBQ3pFLDRDQUFzRTtBQUN0RSxrREFBK0U7QUFFL0UsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBV3BCLFFBQUEsV0FBVyxHQUFZLHVCQUFlLENBQUM7SUFDaEQsSUFBSSxFQUFFLGlCQUFXO0lBQ2pCLFFBQVEsRUFBRSxxQkFBZTtJQUN6QixhQUFhLEVBQUUsMEJBQW9CO0lBQ25DLE9BQU8sRUFBRSxvQkFBYztJQUN2QixNQUFNLEVBQUUsbUJBQWE7SUFDckIsU0FBUyxFQUFFLHNCQUFnQjtDQUM5QixDQUFDLENBQUM7QUFFVSxRQUFBLFVBQVUsR0FDbkIsR0FBRyxDQUFDLFVBQVUsSUFBSSxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUMzQyx1QkFBZSxDQUFDLHdCQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsdUJBQWUsQ0FBQyx3QkFBVSxFQUFFLDJCQUFZLEVBQUUsQ0FBQyxDQUFDO0FBRTlFLHFCQUFlLG1CQUFXLENBQUMsbUJBQVcsRUFBRSxrQkFBVSxDQUFDLENBQUMifQ==

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90ZXN0cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtDQUFpRDtBQWtEeEMsY0FsRE0sWUFBRyxDQWtETjtBQWpEWixrREFBNkM7QUFFN0MsSUFBTSxrQkFBa0IsR0FBRztJQUN2QixJQUFJLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1FBQ2hDLGlCQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxVQUFDLEdBQVE7WUFDekIsSUFBSSxHQUFHO2dCQUFFLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLE9BQU8sT0FBTyxFQUFFLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUMsQ0FBQTtJQUNGLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQUssQ0FBQSxDQUFDLFVBQUMsR0FBUTtRQUMzQixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFBO0FBcUNhLGdEQUFrQjtBQW5DaEMsSUFBTSxtQkFBbUIsR0FBRyxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBbUM1QixrREFBbUI7QUFqQ3JELE1BQU0sQ0FBQyxXQUFXLEVBQUUsVUFBUyxJQUFJO0lBRTdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdCLGFBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFO1FBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM5QixJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDSCxVQUFVLENBQUMsVUFBVSxFQUFFLFVBQVMsSUFBSTtJQUVoQyxrQkFBa0IsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFNLE9BQUEsSUFBSSxFQUFFLEVBQU4sQ0FBTSxDQUFDLENBQUM7QUFDNUMsQ0FBQyxDQUFDLENBQUM7QUFDSCxLQUFLLENBQUMsV0FBVyxFQUFFLFVBQVMsSUFBSTtJQUU1QixrQkFBa0IsRUFBRSxDQUFDLElBQUksQ0FBQztRQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDbkMsYUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFBO0FBS0YsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDM0IsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFHbEMsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDdkMsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDdkMsT0FBTyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7QUFDMUMsT0FBTyxDQUFDLGdDQUFnQyxDQUFDLENBQUMifQ==

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdEF1dGhDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdGVzdHMvc2VydmVyL3Rlc3RBdXRoQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFxQztBQUNyQyxxQ0FBb0M7QUFDcEMseUJBQThDO0FBQzlDLHFEQUEyRDtBQUMzRCw2QkFBOEI7QUFFOUIsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFFN0MsUUFBUSxDQUFDLGlCQUFpQixFQUFFO0lBQ3hCLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRTtRQUMzQixVQUFVLENBQUMsVUFBVSxJQUFJO1lBQ3JCLHNCQUFrQixFQUFFLENBQUMsSUFBSSxDQUFDO2dCQUN0QixJQUFJLElBQUksR0FBVSxJQUFJLGlCQUFJLENBQUM7b0JBQ3ZCLElBQUksRUFBRSxRQUFRO29CQUNkLEtBQUssRUFBRSxlQUFlO29CQUN0QixRQUFRLEVBQUUsbUJBQVEsQ0FBQyxNQUFNLENBQUM7b0JBQzFCLElBQUksRUFBRSxNQUFNO2lCQUNmLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBVyxJQUFLLE9BQUEsSUFBSSxFQUFFLEVBQU4sQ0FBTSxDQUFDLENBQUMsT0FBSyxDQUFBLENBQUMsVUFBQyxHQUFRO29CQUNyRCxNQUFNLEdBQUcsQ0FBQztnQkFDZCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsdUJBQXVCLEVBQUUsVUFBUyxJQUFJO1lBQ3JDLE9BQU8sQ0FBQyxPQUFHLENBQUM7aUJBQ1AsSUFBSSxDQUFDLGVBQWUsQ0FBQztpQkFDckIsSUFBSSxDQUFDO2dCQUNGLEtBQUssRUFBRSxlQUFlO2dCQUN0QixRQUFRLEVBQUUsTUFBTTthQUNuQixDQUFDO2lCQUNELE1BQU0sQ0FB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

/***/ }),

/***/ "./tests/server/testChannelController.ts":
/*!***********************************************!*\
  !*** ./tests/server/testChannelController.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdENoYW5uZWxDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdGVzdHMvc2VydmVyL3Rlc3RDaGFubmVsQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIn0=

/***/ }),

/***/ "./tests/server/testMessageController.ts":
/*!***********************************************!*\
  !*** ./tests/server/testMessageController.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdE1lc3NhZ2VDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdGVzdHMvc2VydmVyL3Rlc3RNZXNzYWdlQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIn0=

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
    describe('DELETE /api/v1/user/delete', function () {
        beforeEach(function (done) {
            var user = new User_1["default"]({
                name: 'New Name',
                email: 'newemail@test.com',
                role: 'user',
                password: 'pass'
            });
            var inactiveUser = new User_1["default"]({
                name: 'Name',
                email: 'deleted@test.com',
                role: 'user',
                password: 'password',
                deleted: true,
            });
            user.save(function (err) {
                if (err)
                    return done(err);
                inactiveUser.save(function (err) {
                    done(err);
                });
            });
        });
        it('should delete the user', function (done) {
            request(__1.app)["delete"]('/api/v1/user/delete')
                .set('x-access-token', token)
                .send({ email: 'newemail@test.com' })
                .expect(200, function (err) {
                if (err)
                    return done(err);
                User_1["default"].findByEmail('newemail@test.com').exec(function (err, user) {
                    if (err)
                        return done(err);
                    chai_1.assert.isTrue(user.deleted);
                    done();
                });
            });
        });
        it('should fail if trying to delete logged in user', function (done) {
            request(__1.app)["delete"]('/api/v1/user/delete')
                .set('x-access-token', token)
                .send({ email: userInfo.email })
                .expect(400, done);
        });
        it('should fail if email inactive', function (done) {
            request(__1.app)["delete"]('/api/v1/user/delete')
                .set('x-access-token', token)
                .send({ email: 'deleted@test.com' })
                .expect(400, done);
        });
        it('should fail if email does not exist', function (done) {
            request(__1.app)["delete"]('/api/v1/user/delete')
                .set('x-access-token', token)
                .send({ email: 'notreal@test.com' })
                .expect(404, done);
        });
        it('should fail if email not provided', function (done) {
            request(__1.app)["delete"]('/api/v1/user/delete')
                .set('x-access-token', token)
                .send({ email: 'not valid' })
                .expect(400, done);
        });
        it('should fail if user making request is not an admin', function (done) {
            var user = new User_1["default"]({
                name: 'Name',
                email: 'notanadmin@test.com',
                password: bcryptjs_1.hashSync('password'),
                role: 'user',
            });
            user.save(function (err, user) {
                if (err)
                    return done(err);
                request(__1.app)
                    .post('/api/v1/login')
                    .send({ email: 'notanadmin@test.com', password: 'password' })
                    .expect(200)
                    .end(function (err, res) {
                    token = res.get('x-access-token');
                    request(__1.app)["delete"]('/api/v1/user/delete')
                        .set('x-access-token', token)
                        .expect(401, done);
                });
            });
        });
        it('should fail if user not logged in', function (done) {
            request(__1.app)["delete"]('/api/v1/user/delete')
                .expect(401, done);
        });
    });
    describe('PUT /api/v1/user/restore', function () {
        beforeEach(function (done) {
            var user = new User_1["default"]({
                name: 'New Name',
                email: 'active@test.com',
                role: 'user',
                password: 'pass'
            });
            var inactiveUser = new User_1["default"]({
                name: 'Name',
                email: 'deleted@test.com',
                role: 'user',
                password: 'password',
                deleted: true,
            });
            user.save(function (err) {
                if (err)
                    return done(err);
                inactiveUser.save(function (err) {
                    done(err);
                });
            });
        });
        it('should restore the user', function (done) {
            request(__1.app)
                .put('/api/v1/user/restore')
                .set('x-access-token', token)
                .send({ email: 'deleted@test.com' })
                .expect(200, function (err) {
                if (err)
                    return done(err);
                User_1["default"].findByEmail('deleted@test.com').exec(function (err, user) {
                    if (err)
                        return done(err);
                    chai_1.assert.isFalse(user.deleted);
                    done();
                });
            });
        });
        it('should fail if email does not exist', function (done) {
            request(__1.app)
                .put('/api/v1/user/restore')
                .set('x-access-token', token)
                .send({ email: 'doesnotexist@test.com' })
                .expect(404, done);
        });
        it('should fail if user is active', function (done) {
            request(__1.app)
                .put('/api/v1/user/restore')
                .set('x-access-token', token)
                .send({ email: 'active@test.com' })
                .expect(400, done);
        });
        it('should fail if user making request is not an admin', function (done) {
            var user = new User_1["default"]({
                name: 'Name',
                email: 'notanadmin@test.com',
                password: bcryptjs_1.hashSync('password'),
                role: 'user',
            });
            user.save(function (err, user) {
                if (err)
                    return done(err);
                request(__1.app)
                    .post('/api/v1/login')
                    .send({ email: 'notanadmin@test.com', password: 'password' })
                    .expect(200)
                    .end(function (err, res) {
                    token = res.get('x-access-token');
                    request(__1.app)
                        .put('/api/v1/user/restore')
                        .set('x-access-token', token)
                        .expect(401, done);
                });
            });
        });
        it('should fail if user not logged in', function (done) {
            request(__1.app)
                .put('/api/v1/user/restore')
                .send({ email: 'active@test.com' })
                .expect(401, done);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdFVzZXJDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdGVzdHMvc2VydmVyL3Rlc3RVc2VyQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFxQztBQUNyQyxxQ0FBb0M7QUFDcEMsNkJBQThCO0FBRTlCLHlCQUE4QztBQUM5QyxxREFBMkQ7QUFHM0QsUUFBUSxDQUFDLGlCQUFpQixFQUFFO0lBQ3hCLElBQUksS0FBYSxDQUFDO0lBQ2xCLElBQUksUUFBUSxHQUFHO1FBQ1gsSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsZUFBZTtRQUN0QixRQUFRLEVBQUUsTUFBTTtRQUNoQixJQUFJLEVBQUUsT0FBTztLQUNoQixDQUFDO0lBRUYsVUFBVSxDQUFDLFVBQVMsSUFBSTtRQUNwQixzQkFBa0IsRUFBRSxDQUFDLElBQUksQ0FBQztZQUN0QixJQUFJLElBQUksR0FBVSxJQUFJLGlCQUFJLENBQUM7Z0JBQ3ZCLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtnQkFDbkIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLO2dCQUNyQixRQUFRLEVBQUUsbUJBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO2dCQUNyQyxJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7YUFDdEIsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLElBQVc7Z0JBRXpCLE9BQU8sQ0FBQyxPQUFHLENBQUM7cUJBQ1AsSUFBSSxDQUFDLGVBQWUsQ0FBQztxQkFDckIsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUMsQ0FBQztxQkFDMUQsTUFBTSxDQUFDLEdBQUcsQ0FBQztxQkFDWCxHQUFHLENBQUMsVUFBQyxHQUFRLEVBQUUsR0FBcUI7b0JBQ2pDLEtBQUssR0FBRyxHQUFH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

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdEFzeW5jQWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Rlc3RzL3dlYi90ZXN0QXN5bmNBY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUJBQWU7QUFDZiwrQkFBMEI7QUFDMUIsNkJBQThCO0FBQzlCLHlEQUE2QztBQUM3QyxxREFBc0Y7QUFDdEYsMkNBQStCO0FBQy9CLGlFQUE0RjtBQUU1RixtRkFBb0c7QUFFcEcscUVBQXNHO0FBQ3RHLHlFQUFvUjtBQUNwUiwyRUFBb0Y7QUFJcEYsSUFBTSxnQkFBZ0IsR0FBcUIsNkJBQWMsQ0FBQyxDQUFDLHdCQUFLLENBQUMsQ0FBQyxDQUFDO0FBRW5FLFNBQVMsUUFBUSxDQUFDLEtBQVU7SUFBVixzQkFBQSxFQUFBLFVBQVU7SUFDeEIsT0FBTyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBRUQsUUFBUSxDQUFDLGVBQWUsRUFBRTtJQUN0QixJQUFJLFNBQXFDLENBQUM7SUFDMUMsSUFBSSxTQUFzQixDQUFDO0lBRTNCLE1BQU0sQ0FBQztRQUNILFNBQVMsR0FBRyxJQUFJLCtCQUFXLENBQUMsa0JBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBRUgsS0FBSyxDQUFDO1FBQ0YsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLG9CQUFvQixFQUFFO1FBQzNCLFVBQVUsQ0FBQztZQUNQLFNBQVMsR0FBRyxRQUFRLEVBQUUsQ0FBQztZQUN2QixTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbEIsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDcEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsc0NBQXNDO1lBQ3RDLHdEQUF3RCxFQUFFLFVBQVMsSUFBSTtZQUNsRSxJ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

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdFN0b3JlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdGVzdHMvd2ViL3Rlc3RTdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE4QjtBQUM5QixpQkFBZTtBQUNmLGlEQUFtRDtBQUVuRCw2Q0FBbUU7QUFFbkUsK0JBQTJDO0FBQzNDLGlFQUF1RjtBQUN2Rix5RUFBaVA7QUFFalAsbUZBQWlJO0FBQ2pJLHVFQUF5RTtBQUN6RSxxRUFBaUg7QUFDakgsMkVBQTBGO0FBRzFGLFNBQVMsUUFBUTtJQUNiLE9BQU8sbUJBQVcsQ0FBQyxtQkFBVyxFQUFFLGtCQUFVLENBQUMsQ0FBQztBQUNoRCxDQUFDO0FBRUQsUUFBUSxDQUFDLCtCQUErQixFQUFFO0lBQ3RDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7UUFDbkIsSUFBSSxLQUFtQixDQUFDO1FBQ3hCLElBQUksSUFBMkIsQ0FBQztRQUNoQyxVQUFVLENBQUM7WUFDUCxLQUFLLEdBQUcsUUFBUSxFQUFFLENBQUM7WUFDbkIsSUFBSSxHQUFHLGNBQU0sT0FBQSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFyQixDQUFxQixDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDBCQUEwQixFQUFFO1lBQzNCLGFBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbEMsYUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QixhQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLGFBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsaURBQWlELEVBQUU7WUFDbEQsYUFBTSxDQUFDLE9BQU8sQ0FBQyxJ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

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZW52LmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvY29udHJvbGxlcnMvYXV0aENvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9jb250cm9sbGVycy9jaGFubmVsQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2NvbnRyb2xsZXJzL21lc3NhZ2VDb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvY29udHJvbGxlcnMvdXNlckNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9taWRkbGV3YXJlL2FkbWluLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbWlkZGxld2FyZS9hdXRob3JpemVkLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbW9kZWxzL0NoYW5uZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9tb2RlbHMvTWVzc2FnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21vZGVscy9Vc2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvcm91dGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvc2VydmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvc29ja2V0LmlvL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy93ZWIvYWN0aW9ucy9jaGFubmVsc0FjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9hY3Rpb25zL2NoYXRVc2Vyc0FjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9hY3Rpb25zL25vdGlmaWNhdGlvbnNBY3Rpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy93ZWIvYWN0aW9ucy9zaWRlYmFyQWN0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL2FjdGlvbnMvc29ja2V0QWN0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL2FjdGlvbnMvdXNlckFjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9yZWR1Y2Vycy9jaGFubmVscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL3JlZHVjZXJzL2NoYXRVc2Vycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL3JlZHVjZXJzL25vdGlmaWNhdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9yZWR1Y2Vycy9zaWRlYmFyLnRzIiwid2VicGFjazovLy8uL3NyYy93ZWIvcmVkdWNlcnMvc29ja2V0LnRzIiwid2VicGFjazovLy8uL3NyYy93ZWIvcmVkdWNlcnMvdXNlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL3N0b3JlLnRzIiwid2VicGFjazovLy8uL3Rlc3RzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3Rlc3RzL3NlcnZlci90ZXN0QXV0aENvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vdGVzdHMvc2VydmVyL3Rlc3RDaGFubmVsQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi90ZXN0cy9zZXJ2ZXIvdGVzdE1lc3NhZ2VDb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3Rlc3RzL3NlcnZlci90ZXN0VXNlckNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vdGVzdHMvd2ViL3Rlc3RBc3luY0FjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vdGVzdHMvd2ViL3Rlc3RTdG9yZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImF4aW9zLW1vY2stYWRhcHRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJjcnlwdGpzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjaGFpXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29tcHJlc3Npb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb25uZWN0LW1vbmdvXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29va2llLXBhcnNlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNzdXJmXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3Mtc2Vzc2lvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImhlbG1ldFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqc29ud2VidG9rZW5cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb2NoYVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbmdvb3NlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibXVzdGFjaGUtZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LWxvZ2dlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LW1vY2stc3RvcmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eC10aHVua1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvY2tldC5pb1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvY2tldC5pby1jbGllbnRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzb2NrZXRpby1qd3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzdXBlcnRlc3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzdXBlcnRlc3Qtc2Vzc2lvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInZhbGlkYXRvclwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FB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QUFDRCwyQ0FBMkMsK2lvQjs7Ozs7Ozs7Ozs7QUNsVzNDLGtDOzs7Ozs7Ozs7OztBQ0FBLCtDOzs7Ozs7Ozs7OztBQ0FBLHFDOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLDBDOzs7Ozs7Ozs7OztBQ0FBLDBDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLDRDOzs7Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLHFDOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLHNDOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLHNDOzs7Ozs7Ozs7OztBQ0FBLDhDOzs7Ozs7Ozs7OztBQ0FBLHNDIiwiZmlsZSI6ImFsbC10ZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vdGVzdHMvaW5kZXgudHNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAvLyBodHRwczovL2RvY3MubW9uZ29kYi5jb20vbWFudWFsL3JlZmVyZW5jZS9jb25uZWN0aW9uLXN0cmluZy9cbiAgICBtb25nb2RiQ29ubmVjdGlvblVyaTogcHJvY2Vzcy5lbnYuTU9OR09EQl9VUkksXG4gICAgbW9uZ29kYlRlc3RDb25uZWN0aW9uVXJpOiBwcm9jZXNzLmVudi5NT05HT0RCX1RFU1RfVVJJIHx8XG5cdFx0XHQgICAgICAnbW9uZ29kYjovL2xvY2FsaG9zdDoyNzAxNy9vcGVuQ2hhdFRlc3QnLFxuICAgIHBvcnQ6IHByb2Nlc3MuZW52LlBPUlQgfHwgNTAwMCxcbiAgICBwcm9kdWN0aW9uOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nIHx8IGZhbHNlLFxuICAgIHVzZVRlc3REYjogcHJvY2Vzcy5lbnYuVVNFX1RFU1RfREIgfHwgZmFsc2UsXG4gICAgc2VjcmV0OiBwcm9jZXNzLmVudi5TRUNSRVQgfHwgJ3NlY3JldCcsXG4gICAgZGlzYWJsZUNzcmY6IHByb2Nlc3MuZW52LkRJU0FCTEVfQ1NSRiB8fCBmYWxzZSxcbiAgICBkaXNhYmxlUmVkdXhMb2dnaW5nOiBwcm9jZXNzLmVudi5ESVNBQkxFX1JFRFVYX0xPR0dJTkcgfHwgZmFsc2UsXG4gICAgZGlzYWJsZUF1dG9TdGFydDogcHJvY2Vzcy5lbnYuRElTQUJMRV9BVVRPX1NUQVJUIHx8IGZhbHNlLFxuICAgIG1haWxndW5BcGlLZXk6IHByb2Nlc3MuZW52Lk1BSUxHVU5fQVBJX0tFWSxcbiAgICBtYWlsZ3VuRG9tYWluOiBwcm9jZXNzLmVudi5NQUlMR1VOX0RPTUFJTixcbiAgICBiYXNlVXJsOiBwcm9jZXNzLmVudi5CQVNFX1VSTCA/IHByb2Nlc3MuZW52LkJBU0VfVVJMIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMCdcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciB2YWxpZGF0b3JfMSA9IHJlcXVpcmUoXCJ2YWxpZGF0b3JcIik7XG52YXIgYmNyeXB0anNfMSA9IHJlcXVpcmUoXCJiY3J5cHRqc1wiKTtcbnZhciBVc2VyXzEgPSByZXF1aXJlKFwiLi4vbW9kZWxzL1VzZXJcIik7XG52YXIgZW52ID0gcmVxdWlyZSgnLi4vLi4vLi4vZW52Jyk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHtcbiAgICBsb2dpbjogZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgICAgIGlmICh2YWxpZGF0b3JfMS5pc0VtcHR5KHJlcS5ib2R5LmVtYWlsIHx8ICcnKSB8fCB2YWxpZGF0b3JfMS5pc0VtcHR5KHJlcS5ib2R5LnBhc3N3b3JkIHx8ICcnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdQbGVhc2Ugc3VwcGx5IGFuIGVtYWlsIGFuZCBwYXNzd29yZCcgfSkuZW5kKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF2YWxpZGF0b3JfMS5pc0VtYWlsKHJlcS5ib2R5LmVtYWlsKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdOb3QgYSB2YWxpZCBlbWFpbCBhZGRyZXNzJyB9KS5lbmQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXEuYXV0aGVudGljYXRlKHJlcS5ib2R5LmVtYWlsLCByZXEuYm9keS5wYXNzd29yZCwgZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgICAgIGlmICghdXNlcilcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oeyBlcnJvcjogJ0ludmFsaWQgZW1haWwgb3IgcGFzc3dvcmQnIH0pLmVuZCgpO1xuICAgICAgICAgICAgcmVxLmlzc3VlTmV3VG9rZW4odXNlcik7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApXG4gICAgICAgICAgICAgICAgLmpzb24oe1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgICAgICAgcm9sZTogdXNlci5yb2xlLFxuICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZVxuICAgICAgICAgICAgfSkuZW5kKCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVnaXN0ZXI6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICBpZiAodmFsaWRhdG9yXzEuaXNFbXB0eShyZXEuYm9keS5lbWFpbCB8fCAnJykgfHwgdmFsaWRhdG9yXzEuaXNFbXB0eShyZXEuYm9keS5wYXNzd29yZCB8fCAnJykpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnUGxlYXNlIHN1cHBseSBhbiBlbWFpbCBhbmQgcGFzc3dvcmQnIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdmFsaWRhdG9yXzEuaXNFbWFpbChyZXEuYm9keS5lbWFpbCkpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnTm90IGEgdmFsaWQgZW1haWwgYWRkcmVzcycgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFVzZXJfMVtcImRlZmF1bHRcIl0uZmluZEJ5RW1haWwocmVxLmJvZHkuZW1haWwpLmNvdW50RG9jdW1lbnRzKCkuZXhlYygpLnRoZW4oZnVuY3Rpb24gKGNvdW50KSB7XG4gICAgICAgICAgICBpZiAoY291bnQgIT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdFbWFpbCBhZGRyZXNzIGluIHVzZScgfSk7XG4gICAgICAgICAgICB2YXIgcGFzc3dvcmRIYXNoID0gYmNyeXB0anNfMS5oYXNoU3luYyhyZXEuYm9keS5wYXNzd29yZCk7XG4gICAgICAgICAgICBVc2VyXzFbXCJkZWZhdWx0XCJdLmNvdW50RG9jdW1lbnRzKCkuZXhlYygpLnRoZW4oZnVuY3Rpb24gKGNvdW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIHJvbGUgPSAndXNlcic7XG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ID09PSAwKVxuICAgICAgICAgICAgICAgICAgICByb2xlID0gJ2FkbWluJztcbiAgICAgICAgICAgICAgICB2YXIgdXNlciA9IG5ldyBVc2VyXzFbXCJkZWZhdWx0XCJdKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiByZXEuYm9keS5lbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkSGFzaCxcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogcm9sZSxcbiAgICAgICAgICAgICAgICAgICAgZW1haWxWZXJpZmllZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdXNlci5zYXZlKCkudGhlbihmdW5jdGlvbiAodSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcgdHJ5aW5nIHRvIGNyZWF0ZSBhIG5ldyB1c2VyJyB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGxvZ291dDogZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgICAgIHJlcS5sb2dvdXQoKTtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbWVzc2FnZTogJ2xvZ2dlZCBvdXQnIH0pO1xuICAgIH0sXG4gICAgdmVyaWZ5RW1haWw6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgIH1cbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lZWFYwYUVOdmJuUnliMnhzWlhJdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOHVMaTh1TGk5emNtTXZjMlZ5ZG1WeUwyTnZiblJ5YjJ4c1pYSnpMMkYxZEdoRGIyNTBjbTlzYkdWeUxuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCUVVFc2RVTkJRVFpETzBGQlF6ZERMSEZEUVVGdlF6dEJRVVZ3UXl4MVEwRkJOa003UVVGRE4wTXNTVUZCVFN4SFFVRkhMRWRCUVVjc1QwRkJUeXhEUVVGRExHTkJRV01zUTBGQlF5eERRVUZETzBGQlJYQkRMSEZDUVVGbE8wbEJRMWdzUzBGQlN5eEZRVUZGTEZWQlFVTXNSMEZCV1N4RlFVRkZMRWRCUVdFN1VVRkRMMElzU1VGQlNTeHRRa0ZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eEpRVUZKTEVWQlFVVXNRMEZCUXl4SlFVRkpMRzFDUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4UlFVRlJMRWxCUVVrc1JVRkJSU3hEUVVGRExFVkJRVVU3V1VGRGJrVXNUMEZCVHl4SFFVRkhMRU5CUVVNc1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkZMRXRCUVVzc1JVRkJSU3h4UTBGQmNVTXNSVUZCUlN4RFFVRkRMRU5CUVVNc1IwRkJSeXhGUVVGRkxFTkJRVU03VTBGRGRrWTdVVUZEUkN4SlFVRkpMRU5CUVVNc2JVSkJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhGUVVGRk8xbEJRekZDTEU5QlFVOHNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4TFFVRkxMRVZCUVVVc01rSkJRVEpDTEVWQlFVVXNRMEZCUXl4RFFVRkRMRWRCUVVjc1JVRkJSU3hEUVVGRE8xTkJRemRGTzFGQlEwUXNSMEZCUnl4RFFVRkRMRmxCUVZrc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NSVUZCUlN4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExGRkJRVkVzUlVGQlJTeFZRVUZETEVsQlFXMUNPMWxCUTNCRkxFbEJRVWtzUTBGQlF5eEpRVUZKTzJkQ1FVTk1MRTlCUVU4c1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSU3hMUVVGTExFVkJRVVVzTWtKQlFUSkNMRVZCUVVVc1EwRkJReXhEUVVGRExFZEJRVWNzUlVGQlJTeERRVUZETzFsQlF6bEZMRWRCUVVjc1EwRkJReXhoUVVGaExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdXVUZEZUVJc1QwRkJUeXhIUVVGSExFTkJRVU1zVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXp0cFFrRkRha0lzU1VGQlNTeERRVUZETzJkQ1FVTkdMRTlCUVU4c1JVRkJSU3hKUVVGSk8yZENRVU5pTEV0QlFVc3NSVUZCUlN4SlFVRkpMRU5CUVVNc1MwRkJTenRuUWtGRGFrSXNTVUZCU1N4RlFVRkZMRWxCUVVrc1EwRkJReXhKUVVGSk8yZENRVU5tTEVsQlFVa3NSVUZCUlN4SlFVRkpMRU5CUVVNc1NVRkJTVHRoUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEVWQlFVVXNRMEZCUXp0UlFVTndReXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTTdTVUZEUkN4UlFVRlJMRVZCUVVVc1ZVRkJReXhIUVVGWkxFVkJRVVVzUjBGQllUdFJRVU5zUXl4SlFVRkpMRzFDUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRWxCUVVrc1JVRkJSU3hEUVVGRExFbEJRVWtzYlVKQlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExGRkJRVkVzU1VGQlNTeEZRVUZGTEVOQlFVTXNSVUZCUlR0WlFVTnVSU3hQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVVVzUzBGQlN5eEZRVUZGTEhGRFFVRnhReXhGUVVGRkxFTkJRVU1zUTBGQlF6dFRRVU5xUmp0UlFVTkVMRWxCUVVrc1EwRkJReXh0UWtGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFVkJRVVU3V1VGRE1VSXNUMEZCVHl4SFFVRkhMRU5CUVVNc1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkZMRXRCUVVzc1JVRkJSU3d5UWtGQk1rSXNSVUZCUlN4RFFVRkRMRU5CUVVNN1UwRkRka1U3VVVGRFJDeFBRVUZQTEdsQ1FVRkpMRU5CUVVNc1YwRkJWeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1kwRkJZeXhGUVVGRkxFTkJRVU1zU1VGQlNTeEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVVNc1MwRkJZVHRaUVVNdlJTeEpRVUZKTEV0QlFVc3NTMEZCU3l4RFFVRkRPMmRDUVVOWUxFOUJRVThzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlF5eExRVUZMTEVWQlFVVXNjMEpCUVhOQ0xFVkJRVU1zUTBGQlF5eERRVUZETzFsQlEycEZMRWxCUVVrc1dVRkJXU3hIUVVGSExHMUNRVUZSTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF6dFpRVVV2UXl4cFFrRkJTU3hEUVVGRExHTkJRV01zUlVGQlJTeERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGRExFdEJRV0U3WjBKQlF6VkRMRWxCUVVrc1NVRkJTU3hIUVVGSExFMUJRVTBzUTBGQlF6dG5Ra0ZEYkVJc1NVRkJTU3hMUVVGTExFdEJRVXNzUTBGQlF6dHZRa0ZEV0N4SlFVRkpMRWRCUVVjc1QwRkJUeXhEUVVGRE8yZENRVU51UWl4SlFVRkpMRWxCUVVrc1IwRkJSeXhKUVVGSkxHbENRVUZKTEVOQlFVTTdiMEpCUTJoQ0xFbEJRVWtzUlVGQlJTeEZRVUZGTzI5Q1FVTlNMRXRCUVVzc1JVRkJSU3hIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVczdiMEpCUTNKQ0xGRkJRVkVzUlVGQlJTeFpRVUZaTzI5Q1FVTjBRaXhKUVVGSkxFVkJRVVVzU1VGQlNUdHZRa0ZEVml4aFFVRmhMRVZCUVVVc1MwRkJTenRwUWtGRGRrSXNRMEZCUXl4RFFVRkRPMmRDUVVOSUxFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJReXhEUVVGUk8yOUNRVU4wUWl4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVNc1QwRkJUeXhGUVVGRkxFbEJRVWtzUlVGQlF5eERRVUZETEVOQlFVTTdaMEpCUTJwRUxFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVc3NRMEZCUVN4RFFVRkRMRlZCUVVNc1IwRkJWVHR2UWtGRGFFSXNUMEZCVHl4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dHZRa0ZEYmtJc1QwRkJUeXhIUVVGSExFTkJRVU1zVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRExFdEJRVXNzUlVGQlJTeHJSRUZCYTBRc1JVRkJReXhEUVVGRExFTkJRVU03WjBKQlF6ZEdMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMUFzUTBGQlF5eERRVUZETEVOQlFVRTdVVUZEVGl4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVWUUxFTkJRVU03U1VGRFJDeE5RVUZOTEVWQlFVVXNWVUZCUXl4SFFVRlpMRVZCUVVVc1IwRkJZVHRSUVVOb1F5eEhRVUZITEVOQlFVTXNUVUZCVFN4RlFVRkZMRU5CUVVNN1VVRkRZaXhQUVVGUExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUXl4UFFVRlBMRVZCUVVVc1NVRkJTU3hGUVVGRkxFOUJRVThzUlVGQlJTeFpRVUZaTEVWQlFVTXNRMEZCUXl4RFFVRkRPMGxCUXpWRUxFTkJRVU03U1VGRFJDeFhRVUZYTEVWQlFVVXNWVUZCUXl4SFFVRlpMRVZCUVVVc1IwRkJZVHRKUVVONlF5eERRVUZETzBOQlEwb3NRMEZCUVNKOSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBDaGFubmVsXzEgPSByZXF1aXJlKFwiLi4vbW9kZWxzL0NoYW5uZWxcIik7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHtcbiAgICBjaGFubmVsczogZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgICAgIHJldHVybiBDaGFubmVsXzFbXCJkZWZhdWx0XCJdLmNvdW50RG9jdW1lbnRzKCkuZXhlYygpLnRoZW4oZnVuY3Rpb24gKGNvdW50KSB7XG4gICAgICAgICAgICB2YXIgcCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgQ2hhbm5lbF8xW1wiZGVmYXVsdFwiXS5jcmVhdGUoW3sgbmFtZTogJ2dlbmVyYWwnIH0sIHsgbmFtZTogJ3JhbmRvbScgfV0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBwLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIENoYW5uZWxfMVtcImRlZmF1bHRcIl0uZmluZCgpLmV4ZWMoKS50aGVuKGZ1bmN0aW9uIChjaGFubmVscykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBjaGFubmVsczogY2hhbm5lbHMgfSk7XG4gICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIGZldGNoIGNoYW5uZWxzJyB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBjcmVhdGUgZGVmYXVsdCBjaGFubmVscycgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIGNvdW50aW5nIGNoYW5uZWxzJyB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBcImRlbGV0ZVwiOiBmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICB9LFxuICAgIGNyZWF0ZTogZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgfVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVkyaGhibTVsYkVOdmJuUnliMnhzWlhJdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOHVMaTh1TGk5emNtTXZjMlZ5ZG1WeUwyTnZiblJ5YjJ4c1pYSnpMMk5vWVc1dVpXeERiMjUwY205c2JHVnlMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3TzBGQlEwRXNOa05CUVc5RU8wRkJSWEJFTEhGQ1FVRmxPMGxCUTFnc1VVRkJVU3hGUVVGRkxGVkJRVU1zUjBGQldTeEZRVUZGTEVkQlFXRTdVVUZGYkVNc1QwRkJUeXh2UWtGQlR5eERRVUZETEdOQlFXTXNSVUZCUlN4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZETEV0QlFXRTdXVUZEZEVRc1NVRkJTU3hEUVVGRExFZEJRVWNzU1VGQlNTeFBRVUZQTEVOQlFVTXNWVUZCUXl4UFFVRlBMRVZCUVVVc1RVRkJUVHRuUWtGRGFFTXNTVUZCU1N4TFFVRkxMRXRCUVVzc1EwRkJReXhGUVVGRk8yOUNRVU5pTEU5QlFVOHNUMEZCVHl4RlFVRkZMRU5CUVVNN2FVSkJRM0JDTzJkQ1FVTkVMRzlDUVVGUExFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTXNSVUZCUXl4SlFVRkpMRVZCUVVVc1UwRkJVeXhGUVVGRExFVkJRVVVzUlVGQlF5eEpRVUZKTEVWQlFVVXNVVUZCVVN4RlFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF6dHZRa0ZEZGtRc1QwRkJUeXhQUVVGUExFVkJRVVVzUTBGQlF6dG5Ra0ZEY2tJc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlN5eERRVUZCTEVOQlFVTXNWVUZCUXl4SFFVRlZPMjlDUVVOb1FpeFBRVUZQTEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRuUWtGRGRrSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU5JTEU5QlFVOHNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJRenRuUWtGRFZpeHZRa0ZCVHl4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRkRMRkZCUVc5Q08yOUNRVU0xUXl4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVNc1VVRkJVU3hGUVVGRkxGRkJRVkVzUlVGQlF5eERRVUZETEVOQlFVTTdaMEpCUTNSRUxFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVc3NRMEZCUVN4RFFVRkRMRlZCUVVNc1IwRkJWVHR2UWtGRGFFSXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dHZRa0ZEYWtJc1QwRkJUeXhIUVVGSExFTkJRVU1zVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRkxFdEJRVXNzUlVGQlJTeHhSRUZCY1VRc1JVRkJSU3hEUVVGRExFTkJRVU03WjBKQlEyeEhMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMUFzUTBGQlF5eERRVUZETEVOQlFVTXNUMEZCU3l4RFFVRkJMRU5CUVVNc1ZVRkJReXhIUVVGVk8yZENRVU5vUWl4UFFVRlBMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzJkQ1FVTnVRaXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVU1zUzBGQlN5eEZRVUZGTERoRVFVRTRSQ3hGUVVGRExFTkJRVU1zUTBGQlF6dFpRVU42Unl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOUUxFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVc3NRMEZCUVN4RFFVRkRMRlZCUVVNc1IwRkJWVHRaUVVOb1FpeFBRVUZQTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8xbEJRMjVDTEU5QlFVOHNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUXl4TFFVRkxMRVZCUVVVc09FTkJRVGhETEVWQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTNwR0xFTkJRVU1zUTBGQlF5eERRVUZETzBsQlExQXNRMEZCUXp0SlFVTkVMRkZCUVUwc1JVRkJSU3hWUVVGRExFZEJRVmtzUlVGQlJTeEhRVUZoTzBsQlJYQkRMRU5CUVVNN1NVRkRSQ3hOUVVGTkxFVkJRVVVzVlVGQlF5eEhRVUZaTEVWQlFVVXNSMEZCWVR0SlFVVndReXhEUVVGRE8wTkJRMG9zUTBGQlFTSjkiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgTWVzc2FnZV8xID0gcmVxdWlyZShcIi4uL21vZGVscy9NZXNzYWdlXCIpO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB7XG4gICAgbWVzc2FnZXM6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICByZXR1cm4gTWVzc2FnZV8xW1wiZGVmYXVsdFwiXS5maW5kKHsgY2hhbm5lbDogcmVxLnBhcmFtcy5jaGFubmVsIH0pXG4gICAgICAgICAgICAuc2tpcChwYXJzZUludChyZXEucGFyYW1zLm9mZmVzdCkpXG4gICAgICAgICAgICAuc29ydCh7IF9pZDogLTEgfSlcbiAgICAgICAgICAgIC5saW1pdCgyMClcbiAgICAgICAgICAgIC5leGVjKCkudGhlbihmdW5jdGlvbiAobWVzc2FnZXMpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6IG1lc3NhZ2VzLm1hcChmdW5jdGlvbiAobSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogbS50ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZDogbS5jcmVhdGVkQXQsXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyRW1haWw6IG0udXNlckVtYWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbDogbS5jaGFubmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgX2lkOiBtLl9pZFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pLnJldmVyc2UoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdzb21ldGhpbmcgd2VudCB3cm9uZyB0cnlpbmcgdG8gZmV0Y2ggbWVzc2FnZXMnIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYldWemMyRm5aVU52Ym5SeWIyeHNaWEl1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk4dUxpOHVMaTl6Y21NdmMyVnlkbVZ5TDJOdmJuUnliMnhzWlhKekwyMWxjM05oWjJWRGIyNTBjbTlzYkdWeUxuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCUTBFc05rTkJRVzlFTzBGQlEzQkVMSEZDUVVGbE8wbEJRMWdzVVVGQlVTeEZRVUZGTEZWQlFVTXNSMEZCV1N4RlFVRkZMRWRCUVdFN1VVRkRiRU1zVDBGQlR5eHZRa0ZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRExFOUJRVThzUlVGQlJTeEhRVUZITEVOQlFVTXNUVUZCVFN4RFFVRkRMRTlCUVU4c1JVRkJReXhEUVVGRE8yRkJRemRETEVsQlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVNc1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXp0aFFVTnFReXhKUVVGSkxFTkJRVU1zUlVGQlF5eEhRVUZITEVWQlFVVXNRMEZCUXl4RFFVRkRMRVZCUVVNc1EwRkJRenRoUVVObUxFdEJRVXNzUTBGQlF5eEZRVUZGTEVOQlFVTTdZVUZEVkN4SlFVRkpMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlF5eFJRVUZ2UWp0WlFVTTVRaXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRE8yZENRVU4yUWl4UlFVRlJMRVZCUVVVc1VVRkJVU3hEUVVGRExFZEJRVWNzUTBGQlF5eFZRVUZETEVOQlFWYzdiMEpCUTJoRExFOUJRVTg3ZDBKQlEwZ3NTVUZCU1N4RlFVRkZMRU5CUVVNc1EwRkJReXhKUVVGSk8zZENRVU5hTEU5QlFVOHNSVUZCUlN4RFFVRkRMRU5CUVVNc1UwRkJVenQzUWtGRGNFSXNVMEZCVXl4RlFVRkZMRU5CUVVNc1EwRkJReXhUUVVGVE8zZENRVU4wUWl4UFFVRlBMRVZCUVVVc1EwRkJReXhEUVVGRExFOUJRVTg3ZDBKQlEyeENMRWRCUVVjc1JVRkJSU3hEUVVGRExFTkJRVU1zUjBGQlJ6dHhRa0ZEWWl4RFFVRkRPMmRDUVVOTUxFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVOHNSVUZCUlR0aFFVTm1MRU5CUVVNc1EwRkJRVHRSUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVc3NRMEZCUVN4RFFVRkRMRlZCUVVNc1IwRkJWVHRaUVVOb1FpeFBRVUZQTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVVXNTMEZCU3l4RlFVRkZMQ3REUVVFclF5eEZRVUZGTEVOQlFVTXNRMEZCUXp0UlFVTTFSaXhEUVVGRExFTkJRVU1zUTBGQlFUdEpRVU5PTEVOQlFVTTdRMEZEU2l4RFFVRkJJbjA9IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIHZhbGlkYXRvcl8xID0gcmVxdWlyZShcInZhbGlkYXRvclwiKTtcbnZhciBVc2VyXzEgPSByZXF1aXJlKFwiLi4vbW9kZWxzL1VzZXJcIik7XG52YXIgYmNyeXB0anNfMSA9IHJlcXVpcmUoXCJiY3J5cHRqc1wiKTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0ge1xuICAgIHVzZXI6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICByZXMuc2VuZChyZXEudXNlcik7XG4gICAgfSxcbiAgICB1c2VyczogZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgICAgIHJldHVybiBVc2VyXzFbXCJkZWZhdWx0XCJdLmZpbmQoe30pLnNlbGVjdCgnbmFtZSBlbWFpbCByb2xlJykudGhlbihmdW5jdGlvbiAodXNlcnMpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIHVzZXJzOiB1c2VycyB9KTtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHJldHJpZXZpbmcgdXNlcnMnIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHVzZXJCeUVtYWlsOiBmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICAgICAgaWYgKCF2YWxpZGF0b3JfMS5pc0VtYWlsKHJlcS5wYXJhbXMudXNlcikpXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ1BsZWFzZSBzdXBwbHkgYSB2YWxpZCBlbWFpbCcgfSk7XG4gICAgICAgIHJldHVybiBVc2VyXzFbXCJkZWZhdWx0XCJdLmZpbmRCeUVtYWlsKHJlcS5wYXJhbXMudXNlcikuZXhlYygpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgICAgIGlmICh1c2VyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBfaWQ6IHVzZXIuX2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdXNlci5uYW1lIHx8ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogdXNlci5yb2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZDogdXNlci5jcmVhdGVkQXRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdObyB1c2VyIGZvdW5kIHdpdGggdGhhdCBlbWFpbCcgfSk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZyB0cnlpbmcgdG8gZmluZCB0aGUgdXNlcicgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgdXBkYXRlRW1haWw6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICBpZiAoIXZhbGlkYXRvcl8xLmlzRW1haWwocmVxLmJvZHkuZW1haWwpKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdOb3QgYSB2YWxpZCBlbWFpbCcgfSk7XG4gICAgICAgIHJldHVybiBVc2VyXzFbXCJkZWZhdWx0XCJdLmNvdW50RG9jdW1lbnRzKHsgZW1haWw6IHJlcS5ib2R5LmVtYWlsIH0pLmV4ZWMoKS50aGVuKGZ1bmN0aW9uIChjb3VudCkge1xuICAgICAgICAgICAgaWYgKGNvdW50ICE9PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnRW1haWwgYWRkcmVzcyBhbHJlYWR5IGluIHVzZScgfSk7XG4gICAgICAgICAgICByZXR1cm4gVXNlcl8xW1wiZGVmYXVsdFwiXS5maW5kQnlFbWFpbChyZXEudXNlci5lbWFpbCkuZXhlYygpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgICAgICAgICB1c2VyLmVtYWlsID0gcmVxLmJvZHkuZW1haWw7XG4gICAgICAgICAgICAgICAgdXNlci5zYXZlKCk7XG4gICAgICAgICAgICAgICAgcmVxLmlzc3VlTmV3VG9rZW4oT2JqZWN0LmFzc2lnbih7fSwgcmVxLnVzZXIsIHsgZW1haWw6IHJlcS5ib2R5LmVtYWlsIH0pKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcgdHJ5aW5nIHRvIGZldGNoIHRoZSB1c2VyJyB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHVwZGF0ZU5hbWU6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICByZXR1cm4gVXNlcl8xW1wiZGVmYXVsdFwiXS5maW5kQnlFbWFpbChyZXEudXNlci5lbWFpbClcbiAgICAgICAgICAgIC5leGVjKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICAgICAgdXNlci5uYW1lID0gcmVxLmJvZHkubmFtZTtcbiAgICAgICAgICAgIHVzZXIuc2F2ZSgpO1xuICAgICAgICAgICAgcmVxLmlzc3VlTmV3VG9rZW4oT2JqZWN0LmFzc2lnbih7fSwgcmVxLnVzZXIsIHsgbmFtZTogcmVxLmJvZHkubmFtZSB9KSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcgdHJ5aW5nIHRvIHVwZGF0ZSB0aGUgdXNlcicgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgdXBkYXRlUGFzc3dvcmQ6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICBpZiAodmFsaWRhdG9yXzEuaXNFbXB0eShyZXEuYm9keS5uZXdQYXNzKSB8fCB2YWxpZGF0b3JfMS5pc0VtcHR5KHJlcS5ib2R5Lm9sZFBhc3MpKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdNdXN0IHN1cHBseSB0aGUgY3VycmVudCBhbmQgbmV3IHBhc3N3b3JkJyB9KTtcbiAgICAgICAgcmV0dXJuIFVzZXJfMVtcImRlZmF1bHRcIl0uZmluZEJ5RW1haWwocmVxLnVzZXIuZW1haWwpLmV4ZWMoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgICAgICBpZiAoIWJjcnlwdGpzXzEuY29tcGFyZVN5bmMocmVxLmJvZHkub2xkUGFzcywgdXNlci5wYXNzd29yZCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdDdXJyZW50IHBhc3N3b3JkIGlzIGluY29ycmVjdCcgfSk7XG4gICAgICAgICAgICB1c2VyLnBhc3N3b3JkID0gYmNyeXB0anNfMS5oYXNoU3luYyhyZXEuYm9keS5uZXdQYXNzKTtcbiAgICAgICAgICAgIHVzZXIuc2F2ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICByZXNldFBhc3N3b3JkOiBmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6ICdOb3QgaW1wbGVtZW50ZWQnIH0pO1xuICAgIH0sXG4gICAgY3JlYXRlVXNlcjogZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgICAgIGlmICh2YWxpZGF0b3JfMS5pc0VtcHR5KHJlcS5ib2R5LmVtYWlsKSB8fCAhdmFsaWRhdG9yXzEuaXNFbWFpbChyZXEuYm9keS5lbWFpbCkgfHxcbiAgICAgICAgICAgIHZhbGlkYXRvcl8xLmlzRW1wdHkocmVxLmJvZHkucm9sZSkgfHwgKHJlcS5ib2R5LnJvbGUgIT09ICd1c2VyJyAmJiByZXEuYm9keS5yb2xlICE9PSAnYWRtaW4nKSlcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnTXVzdCBzdXBwbHkgdmFsaWQgZW1haWwgYW5kIHJvbGUnIH0pO1xuICAgICAgICByZXR1cm4gVXNlcl8xW1wiZGVmYXVsdFwiXS5maW5kQnlFbWFpbChyZXEuYm9keS5lbWFpbCkuY291bnREb2N1bWVudHMoZnVuY3Rpb24gKGVyciwgYykge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHRyeWluZyB0byBjb3VudCB1c2VycyB3aXRoIGVtYWlsICcgKyByZXEuYm9keS5lbWFpbCwgZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjICE9PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnRW1haWwgYWRkcmVzcyBpbiB1c2UnIH0pO1xuICAgICAgICAgICAgdmFyIHUgPSBuZXcgVXNlcl8xW1wiZGVmYXVsdFwiXSh7XG4gICAgICAgICAgICAgICAgZW1haWw6IHJlcS5ib2R5LmVtYWlsLFxuICAgICAgICAgICAgICAgIG5hbWU6IHJlcS5ib2R5Lm5hbWUgfHwgJycsXG4gICAgICAgICAgICAgICAgcm9sZTogcmVxLmJvZHkucm9sZSxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJ3RlbXAnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdS5zYXZlKGZ1bmN0aW9uIChlcnIsIHUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHRyeWluZyB0byBzYXZlIHVzZXInLCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGVkaXRVc2VyOiBmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICAgICAgaWYgKCFyZXEuYm9keS5lbWFpbCB8fCAhdmFsaWRhdG9yXzEuaXNFbWFpbChyZXEuYm9keS5lbWFpbCkpXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ1BsZWFzZSBzdXBwbHkgYSB2YWxpZCBlbWFpbCcgfSk7XG4gICAgICAgIGlmIChyZXEuYm9keS51c2VyLmVtYWlsICYmICF2YWxpZGF0b3JfMS5pc0VtYWlsKHJlcS5ib2R5LnVzZXIuZW1haWwpKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdQbGVhc2Ugc3VwcGx5IGEgdmFsaWQgZW1haWwnIH0pO1xuICAgICAgICBpZiAocmVxLmJvZHkudXNlci5yb2xlICYmICF2YWxpZGF0b3JfMS5pc0VtcHR5KHJlcS5ib2R5LnVzZXIucm9sZSkgJiYgKHJlcS5ib2R5LnVzZXIucm9sZSAhPT0gJ3VzZXInICYmIHJlcS5ib2R5LnVzZXIucm9sZSAhPT0gJ2FkbWluJykpXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ0ludmFsaWQgcm9sZScgfSk7XG4gICAgICAgIHJldHVybiBVc2VyXzFbXCJkZWZhdWx0XCJdLmZpbmRCeUVtYWlsKHJlcS5ib2R5LmVtYWlsKS5leGVjKGZ1bmN0aW9uIChlcnIsIHVzZXIpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU29tZXRoaW5nIHdlbnQgd3JvbmcnLCBlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgZXJyb3I6ICdVc2VyIGRvZXMgbm90IGV4aXN0JyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXEuYm9keS51c2VyLmVtYWlsKVxuICAgICAgICAgICAgICAgIHVzZXIuZW1haWwgPSByZXEuYm9keS51c2VyLmVtYWlsO1xuICAgICAgICAgICAgaWYgKHJlcS5ib2R5LnVzZXIubmFtZSlcbiAgICAgICAgICAgICAgICB1c2VyLm5hbWUgPSByZXEuYm9keS51c2VyLm5hbWU7XG4gICAgICAgICAgICBpZiAocmVxLmJvZHkudXNlci5yb2xlKVxuICAgICAgICAgICAgICAgIHVzZXIucm9sZSA9IHJlcS5ib2R5LnVzZXIucm9sZTtcbiAgICAgICAgICAgIHJldHVybiB1c2VyLnNhdmUoZnVuY3Rpb24gKGVyciwgdXNlcikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZycgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBkZWxldGVVc2VyOiBmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICAgICAgaWYgKCFyZXEuYm9keS5lbWFpbCB8fCAhdmFsaWRhdG9yXzEuaXNFbWFpbChyZXEuYm9keS5lbWFpbCkpXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ0ludmFsaWQgZGF0YSBmb3IgcGFyYW1ldGVyIFwiZW1haWxcIicgfSk7XG4gICAgICAgIHJldHVybiBVc2VyXzFbXCJkZWZhdWx0XCJdLmZpbmRCeUVtYWlsKHJlcS5ib2R5LmVtYWlsKS5leGVjKGZ1bmN0aW9uIChlcnIsIHVzZXIpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU29tZXRoaW5nIHdlbnQgd3JvbmcnLCBlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF1c2VyKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IGVycm9yOiAnVXNlciBkb2VzIG5vdCBleGlzdCcgfSk7XG4gICAgICAgICAgICBpZiAodXNlci5kZWxldGVkKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnVXNlciBhbHJlYWR5IGRlbGV0ZWQnIH0pO1xuICAgICAgICAgICAgaWYgKHJlcS51c2VyLmVtYWlsID09PSByZXEuYm9keS5lbWFpbClcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ0Nhbm5vdCBkZWxldGUgY3VycmVudCB1c2VyJyB9KTtcbiAgICAgICAgICAgIHVzZXIuZGVsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdXNlci5zYXZlKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVzdG9yZVVzZXI6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICBpZiAoIXJlcS5ib2R5LmVtYWlsIHx8ICF2YWxpZGF0b3JfMS5pc0VtYWlsKHJlcS5ib2R5LmVtYWlsKSlcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnSW52YWxpZCBkYXRhIGZvciBwYXJhbWV0ZXIgXCJlbWFpbFwiJyB9KTtcbiAgICAgICAgcmV0dXJuIFVzZXJfMVtcImRlZmF1bHRcIl0uZmluZEJ5RW1haWwocmVxLmJvZHkuZW1haWwpLmV4ZWMoZnVuY3Rpb24gKGVyciwgdXNlcikge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTb21ldGhpbmcgd2VudCB3cm9uZycsIGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZycgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXVzZXIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgZXJyb3I6ICdVc2VyIGRvZXMgbm90IGV4aXN0JyB9KTtcbiAgICAgICAgICAgIGlmICghdXNlci5kZWxldGVkKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnVXNlciBhbHJlYWR5IGFjdGl2ZScgfSk7XG4gICAgICAgICAgICB1c2VyLmRlbGV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB1c2VyLnNhdmUoZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWRYTmxja052Ym5SeWIyeHNaWEl1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk4dUxpOHVMaTl6Y21NdmMyVnlkbVZ5TDJOdmJuUnliMnhzWlhKekwzVnpaWEpEYjI1MGNtOXNiR1Z5TG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN08wRkJRVUVzZFVOQlFUSkRPMEZCUlRORExIVkRRVUY1UkR0QlFVTjZSQ3h4UTBGQkswTTdRVUZGTDBNc2NVSkJRV1U3U1VGRFdDeEpRVUZKTEVWQlFVVXNWVUZCUXl4SFFVRlpMRVZCUVVVc1IwRkJZVHRSUVVNNVFpeEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dEpRVU4yUWl4RFFVRkRPMGxCUTBRc1MwRkJTeXhGUVVGRkxGVkJRVU1zUjBGQldTeEZRVUZGTEVkQlFXRTdVVUZETDBJc1QwRkJUeXhwUWtGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkZMRU5CUVVNc1EwRkJReXhOUVVGTkxFTkJRVU1zYVVKQlFXbENMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlF5eExRVUZqTzFsQlF5OUVMRTlCUVU4c1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJReXhQUVVGUExFVkJRVVVzU1VGQlNTeEZRVUZGTEV0QlFVc3NSVUZCUlN4TFFVRkxMRVZCUVVNc1EwRkJReXhEUVVGRE8xRkJReTlFTEVOQlFVTXNRMEZCUXl4RFFVRkRMRTlCUVVzc1EwRkJRU3hEUVVGRExGVkJRVU1zUjBGQlZUdFpRVU5vUWl4UFFVRlBMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzFsQlEyNUNMRTlCUVU4c1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJReXhMUVVGTExFVkJRVVVzTmtOQlFUWkRMRVZCUVVNc1EwRkJReXhEUVVGRE8xRkJRM2hHTEVOQlFVTXNRMEZCUXl4RFFVRkJPMGxCUTA0c1EwRkJRenRKUVVORUxGZEJRVmNzUlVGQlJTeFZRVUZETEVkQlFWa3NSVUZCUlN4SFFVRmhPMUZCUTNKRExFbEJRVWNzUTBGQlF5eHRRa0ZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETzFsQlEzaENMRTlCUVU4c1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJReXhMUVVGTExFVkJRVVVzTmtKQlFUWkNMRVZCUVVNc1EwRkJReXhEUVVGRE8xRkJSWGhGTEU5QlFVOHNhVUpCUVVrc1EwRkJReXhYUVVGWExFTkJRVU1zUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUXl4SlFVRlhPMWxCUXpkRUxFbEJRVWtzU1VGQlNTeExRVUZMTEVsQlFVa3NSVUZCUlR0blFrRkRaaXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRE8yOUNRVU40UWl4SlFVRkpMRVZCUVVVN2QwSkJRMFlzUzBGQlN5eEZRVUZGTEVsQlFVa3NRMEZCUXl4TFFVRkxPM2RDUVVOcVFpeEhRVUZITEVWQlFVVXNTVUZCU1N4RFFVRkRMRWRCUVVjN2QwSkJRMklzU1VGQlNTeEZRVUZGTEVsQlFVa3NRMEZCUXl4SlFVRkpMRWxCUVVrc1JVRkJSVHQzUWtGRGNrSXNTVUZCU1N4RlFVRkZMRWxCUVVrc1EwRkJReXhKUVVGSk8zZENRVU5tTEU5QlFVOHNSVUZCUlN4SlFVRkpMRU5CUVVNc1UwRkJVenR4UWtGRE1VSTdhVUpCUTBvc1EwRkJReXhEUVVGRE8yRkJRMDQ3V1VGRFJDeFBRVUZQTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVTXNTMEZCU3l4RlFVRkZMQ3RDUVVFclFpeEZRVUZETEVOQlFVTXNRMEZCUXp0UlFVVXhSU3hEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZMTEVOQlFVRXNRMEZCUXl4VlFVRkRMRWRCUVZVN1dVRkRhRUlzVDBGQlR5eERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRaUVVOdVFpeFBRVUZQTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVTXNTMEZCU3l4RlFVRkZMRGhEUVVFNFF5eEZRVUZETEVOQlFVTXNRMEZCUXp0UlFVTjZSaXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTTdTVUZEUkN4WFFVRlhMRVZCUVVVc1ZVRkJReXhIUVVGWkxFVkJRVVVzUjBGQllUdFJRVU55UXl4SlFVRkhMRU5CUVVNc2JVSkJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJRenRaUVVOMlFpeFBRVUZQTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVVXNTMEZCU3l4RlFVRkZMRzFDUVVGdFFpeEZRVUZGTEVOQlFVTXNRMEZCUXp0UlFVTm9SU3hQUVVGUExHbENRVUZKTEVOQlFVTXNZMEZCWXl4RFFVRkRMRVZCUVVNc1MwRkJTeXhGUVVGRkxFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RlFVRkRMRU5CUVVNc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUXl4TFFVRmhPMWxCUXpGRkxFbEJRVWtzUzBGQlN5eExRVUZMTEVOQlFVTTdaMEpCUTFnc1QwRkJUeXhIUVVGSExFTkJRVU1zVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRkxFdEJRVXNzUlVGQlJTdzRRa0ZCT0VJc1JVRkJSU3hEUVVGRExFTkJRVU03V1VGRE0wVXNUMEZCVHl4cFFrRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRkRMRWxCUVZjN1owSkJRelZFTEVsQlFVa3NRMEZCUXl4TFFVRkxMRWRCUVVjc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTTdaMEpCUXpWQ0xFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXp0blFrRkRXaXhIUVVGSExFTkJRVU1zWVVGQllTeERRVUZETEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc1JVRkJSU3hGUVVGRkxFZEJRVWNzUTBGQlF5eEpRVUZKTEVWQlFVVXNSVUZCUXl4TFFVRkxMRVZCUVVVc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVWQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1owSkJRM2hGTEU5QlFVOHNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4UFFVRlBMRVZCUVVVc1NVRkJTU3hGUVVGRkxFTkJRVU1zUTBGQlF6dFpRVU51UkN4RFFVRkRMRU5CUVVNc1EwRkJReXhQUVVGTExFTkJRVUVzUTBGQlF5eFZRVUZETEVkQlFWVTdaMEpCUTJoQ0xFOUJRVThzUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1owSkJRMjVDTEU5QlFVOHNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4TFFVRkxMRVZCUVVVc0swTkJRU3RETEVWQlFVVXNRMEZCUXl4RFFVRkRPMWxCUXpWR0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExQXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRVQ3hEUVVGRE8wbEJRMFFzVlVGQlZTeEZRVUZGTEZWQlFVTXNSMEZCV1N4RlFVRkZMRWRCUVdFN1VVRkRjRU1zVDBGQlR5eHBRa0ZCU1N4RFFVRkRMRmRCUVZjc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXp0aFFVTnNReXhKUVVGSkxFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUXl4SlFVRlhPMWxCUTNKQ0xFbEJRVWtzUTBGQlF5eEpRVUZKTEVkQlFVY3NSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU03V1VGRE1VSXNTVUZCU1N4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRE8xbEJRMW9zUjBGQlJ5eERRVUZETEdGQlFXRXNRMEZCUXl4TlFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExFVkJRVVVzUlVGQlJTeEhRVUZITEVOQlFVTXNTVUZCU1N4RlFVRkZMRVZCUVVVc1NVRkJTU3hGUVVGRkxFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRM2hGTEU5QlFVOHNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUXl4UFFVRlBMRVZCUVVVc1NVRkJTU3hGUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5xUkN4RFFVRkRMRU5CUVVNc1EwRkJReXhQUVVGTExFTkJRVUVzUTBGQlF5eFZRVUZETEVkQlFWVTdXVUZEYUVJc1QwRkJUeXhEUVVGRExFdEJRVXNzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0WlFVTnVRaXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVU1zUzBGQlN5eEZRVUZGTEdkRVFVRm5SQ3hGUVVGRExFTkJRVU1zUTBGQlF6dFJRVU12Uml4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOUUxFTkJRVU03U1VGRFJDeGpRVUZqTEVWQlFVVXNWVUZCUXl4SFFVRlpMRVZCUVVVc1IwRkJZVHRSUVVONFF5eEpRVUZKTEcxQ1FVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4dFFrRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRPMWxCUTNSRUxFOUJRVThzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlJTeExRVUZMTEVWQlFVVXNNRU5CUVRCRExFVkJRVVVzUTBGQlF5eERRVUZETzFGQlEzWkdMRTlCUVU4c2FVSkJRVWtzUTBGQlF5eFhRVUZYTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJReXhKUVVGWE8xbEJRelZFTEVsQlFVa3NRMEZCUXl4elFrRkJWeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RlFVRkZMRWxCUVVrc1EwRkJReXhSUVVGUkxFTkJRVU03WjBKQlF6ZERMRTlCUVU4c1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJReXhMUVVGTExFVkJRVVVzSzBKQlFTdENMRVZCUVVNc1EwRkJReXhEUVVGRE8xbEJRekZGTEVsQlFVa3NRMEZCUXl4UlFVRlJMRWRCUVVjc2JVSkJRVkVzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRE8xbEJRek5ETEVsQlFVa3NRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJRenRaUVVOYUxFOUJRVThzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlF5eFBRVUZQTEVWQlFVVXNTVUZCU1N4RlFVRkRMRU5CUVVNc1EwRkJRenRSUVVOcVJDeERRVUZETEVOQlFVTXNRMEZCUVR0SlFVTk9MRU5CUVVNN1NVRkRSQ3hoUVVGaExFVkJRVVVzVlVGQlF5eEhRVUZaTEVWQlFVVXNSMEZCWVR0UlFVTjJReXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVU1zUzBGQlN5eEZRVUZGTEdsQ1FVRnBRaXhGUVVGRExFTkJRVU1zUTBGQlF6dEpRVU0xUkN4RFFVRkRPMGxCVDBRc1ZVRkJWU3hGUVVGRkxGVkJRVU1zUjBGQldTeEZRVUZGTEVkQlFXRTdVVUZEY0VNc1NVRkJSeXh0UWtGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF5eHRRa0ZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETzFsQlEyNUVMRzFDUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4TFFVRkxMRTFCUVUwc1NVRkJTU3hIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NTMEZCU3l4UFFVRlBMRU5CUVVNN1dVRkRhRVlzVDBGQlR5eEhRVUZITEVOQlFVTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eEZRVUZGTEV0QlFVc3NSVUZCUlN4clEwRkJhME1zUlVGQlF5eERRVUZETEVOQlFVTTdVVUZET1VVc1QwRkJUeXhwUWtGQlNTeERRVUZETEZkQlFWY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEdOQlFXTXNRMEZCUXl4VlFVRkRMRWRCUVZFc1JVRkJSU3hEUVVGVE8xbEJRM1pGTEVsQlFVa3NSMEZCUnl4RlFVRkZPMmRDUVVOTUxFOUJRVThzUTBGQlF5eExRVUZMTEVOQlFVTXNkMFJCUVhkRUxFZEJRVWNzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRVZCUVVVc1IwRkJSeXhEUVVGRExFTkJRVU03WjBKQlF6bEdMRTlCUVU4c1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJReXhMUVVGTExFVkJRVVVzYzBKQlFYTkNMRVZCUVVNc1EwRkJReXhEUVVGRE8yRkJRMmhGTzFsQlEwUXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJRenRuUWtGRFVDeFBRVUZQTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVTXNTMEZCU3l4RlFVRkZMSE5DUVVGelFpeEZRVUZETEVOQlFVTXNRMEZCUXp0WlFVTnFSU3hKUVVGSkxFTkJRVU1zUjBGQlJ5eEpRVUZKTEdsQ1FVRkpMRU5CUVVNN1owSkJRMklzUzBGQlN5eEZRVUZGTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTenRuUWtGRGNrSXNTVUZCU1N4RlFVRkZMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEpRVUZKTEVWQlFVVTdaMEpCUTNwQ0xFbEJRVWtzUlVGQlJTeEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrN1owSkJSVzVDTEZGQlFWRXNSVUZCUlN4TlFVRk5PMkZCUTI1Q0xFTkJRVU1zUTBGQlFUdFpRVU5HTEU5QlFVOHNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGRExFZEJRVkVzUlVGQlJTeERRVUZSTzJkQ1FVTTNRaXhKUVVGSkxFZEJRVWNzUlVGQlJUdHZRa0ZEVEN4UFFVRlBMRU5CUVVNc1MwRkJTeXhEUVVGRExEQkRRVUV3UXl4RlFVRkZMRWRCUVVjc1EwRkJReXhEUVVGRE8yOUNRVU12UkN4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVVc1MwRkJTeXhGUVVGRkxITkNRVUZ6UWl4RlFVRkZMRU5CUVVNc1EwRkJRenRwUWtGRGJFVTdaMEpCUTBRc1QwRkJUeXhIUVVGSExFTkJRVU1zVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRExFOUJRVThzUlVGQlJTeEpRVUZKTEVWQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTJwRUxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlJWQXNRMEZCUXl4RFFVRkRMRU5CUVVFN1NVRkRUaXhEUVVGRE8wbEJWVVFzVVVGQlVTeEZRVUZGTEZWQlFVTXNSMEZCV1N4RlFVRkZMRWRCUVdFN1VVRkRiRU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhKUVVGSkxFTkJRVU1zYlVKQlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF6dFpRVU16UXl4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVNc1MwRkJTeXhGUVVGRkxEWkNRVUUyUWl4RlFVRkRMRU5CUVVNc1EwRkJRenRSUVVONFJTeEpRVUZKTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzU1VGQlNTeERRVUZETEcxQ1FVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRPMWxCUTNCRUxFOUJRVThzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlJTeExRVUZMTEVWQlFVVXNOa0pCUVRaQ0xFVkJRVVVzUTBGQlF5eERRVUZETzFGQlF6RkZMRWxCUVVrc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4SlFVRkpMRU5CUVVNc2JVSkJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUzBGQlN5eE5RVUZOTEVsQlFVa3NSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeExRVUZMTEU5QlFVOHNRMEZCUXp0WlFVTjJTQ3hQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVU1zUzBGQlN5eEZRVUZGTEdOQlFXTXNSVUZCUXl4RFFVRkRMRU5CUVVNN1VVRkRla1FzVDBGQlR5eHBRa0ZCU1N4RFFVRkRMRmRCUVZjc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGRExFZEJRVkVzUlVGQlJTeEpRVUZYTzFsQlF5OUVMRWxCUVVrc1IwRkJSeXhGUVVGRk8yZENRVU5NTEU5QlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc2MwSkJRWE5DTEVWQlFVVXNSMEZCUnl4RFFVRkRMRU5CUVVNN1owSkJRM3BETEU5QlFVOHNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUXl4TFFVRkxMRVZCUVVVc2MwSkJRWE5DTEVWQlFVTXNRMEZCUXl4RFFVRkRPMkZCUTJoRk8xbEJRMFFzU1VGQlNTeERRVUZETEVsQlFVa3NSVUZCUlR0blFrRkRVQ3hQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVU1zUzBGQlN5eEZRVUZGTEhGQ1FVRnhRaXhGUVVGRExFTkJRVU1zUTBGQlF6dGhRVU12UkR0WlFVTkVMRWxCUVVrc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3p0blFrRkRia0lzU1VGQlNTeERRVUZETEV0QlFVc3NSMEZCUnl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTTdXVUZEY2tNc1NVRkJTU3hIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpPMmRDUVVOc1FpeEpRVUZKTEVOQlFVTXNTVUZCU1N4SFFVRkhMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXp0WlFVTnVReXhKUVVGSkxFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrN1owSkJRMnhDTEVsQlFVa3NRMEZCUXl4SlFVRkpMRWRCUVVjc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRPMWxCUTI1RExFOUJRVThzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRkRMRWRCUVZFc1JVRkJSU3hKUVVGWE8yZENRVU51UXl4SlFVRkpMRWRCUVVjc1JVRkJSVHR2UWtGRFRDeFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8yOUNRVU5xUWl4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVNc1MwRkJTeXhGUVVGRkxITkNRVUZ6UWl4RlFVRkRMRU5CUVVNc1EwRkJRenRwUWtGRGFFVTdaMEpCUTBRc1QwRkJUeXhIUVVGSExFTkJRVU1zVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRExFOUJRVThzUlVGQlJTeEpRVUZKTEVWQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTJwRUxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExQXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRVQ3hEUVVGRE8wbEJRMFFzVlVGQlZTeEZRVUZGTEZWQlFVTXNSMEZCV1N4RlFVRkZMRWRCUVdFN1VVRkRjRU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhKUVVGSkxFTkJRVU1zYlVKQlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF6dFpRVU16UXl4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVNc1MwRkJTeXhGUVVGRkxHOURRVUZ2UXl4RlFVRkRMRU5CUVVNc1EwRkJRenRSUVVNdlJTeFBRVUZQTEdsQ1FVRkpMRU5CUVVNc1YwRkJWeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVU1zUjBGQlVTeEZRVUZGTEVsQlFWYzdXVUZETDBRc1NVRkJTU3hIUVVGSExFVkJRVVU3WjBKQlEwd3NUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXh6UWtGQmMwSXNSVUZCUlN4SFFVRkhMRU5CUVVNc1EwRkJRenRuUWtGRGVrTXNUMEZCVHl4SFFVRkhMRU5CUVVNc1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkRMRXRCUVVzc1JVRkJSU3h6UWtGQmMwSXNSVUZCUXl4RFFVRkRMRU5CUVVNN1lVRkRhRVU3V1VGRFJDeEpRVUZKTEVOQlFVTXNTVUZCU1R0blFrRkRUQ3hQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVU1zUzBGQlN5eEZRVUZGTEhGQ1FVRnhRaXhGUVVGRExFTkJRVU1zUTBGQlF6dFpRVU5vUlN4SlFVRkpMRWxCUVVrc1EwRkJReXhQUVVGUE8yZENRVU5hTEU5QlFVOHNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUXl4TFFVRkxMRVZCUVVVc2MwSkJRWE5DTEVWQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTJwRkxFbEJRVWtzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRXRCUVVzc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTzJkQ1FVTnFReXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVU1zUzBGQlN5eEZRVUZGTERSQ1FVRTBRaXhGUVVGRExFTkJRVU1zUTBGQlF6dFpRVU4yUlN4SlFVRkpMRU5CUVVNc1QwRkJUeXhIUVVGSExFbEJRVWtzUTBGQlF6dFpRVU53UWl4UFFVRlBMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlF5eEhRVUZSTzJkQ1FVTjBRaXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVU1zVDBGQlR5eEZRVUZGTEVsQlFVa3NSVUZCUXl4RFFVRkRMRU5CUVVNN1dVRkRha1FzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOUUxFTkJRVU03U1VGRFJDeFhRVUZYTEVWQlFVVXNWVUZCUXl4SFFVRlpMRVZCUVVVc1IwRkJZVHRSUVVOeVF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFbEJRVWtzUTBGQlF5eHRRa0ZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETzFsQlF6TkRMRTlCUVU4c1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSU3hMUVVGTExFVkJRVVVzYjBOQlFXOURMRVZCUVVVc1EwRkJReXhEUVVGRE8xRkJRMnBHTEU5QlFVOHNhVUpCUVVrc1EwRkJReXhYUVVGWExFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlF5eEhRVUZSTEVWQlFVVXNTVUZCVnp0WlFVTXZSQ3hKUVVGSkxFZEJRVWNzUlVGQlJUdG5Ra0ZEVEN4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExITkNRVUZ6UWl4RlFVRkZMRWRCUVVjc1EwRkJReXhEUVVGRE8yZENRVU42UXl4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVVc1MwRkJTeXhGUVVGRkxITkNRVUZ6UWl4RlFVRkZMRU5CUVVNc1EwRkJRenRoUVVOc1JUdFpRVU5FTEVsQlFVa3NRMEZCUXl4SlFVRkpPMmRDUVVOTUxFOUJRVThzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlJTeExRVUZMTEVWQlFVVXNjVUpCUVhGQ0xFVkJRVVVzUTBGQlF5eERRVUZETzFsQlEyeEZMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR6dG5Ra0ZEWWl4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVVc1MwRkJTeXhGUVVGRkxIRkNRVUZ4UWl4RlFVRkZMRU5CUVVNc1EwRkJRenRaUVVNNVJDeEpRVUZKTEVOQlFVTXNUMEZCVHl4SFFVRkhMRXRCUVVzc1EwRkJRenRaUVVONlFpeFBRVUZQTEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJReXhIUVVGUk8yZENRVU4wUWl4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVVc1QwRkJUeXhGUVVGRkxFbEJRVWtzUlVGQlJTeERRVUZETEVOQlFVTTdXVUZEYmtRc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFVDeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTlFMRU5CUVVNN1EwRkRTaXhEUVVGQkluMD0iLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5mdW5jdGlvbiBkZWZhdWx0XzEocmVxLCByZXMsIG5leHQpIHtcbiAgICBpZiAocmVxLnVzZXIgJiYgcmVxLnVzZXIucm9sZSA9PT0gJ2FkbWluJykge1xuICAgICAgICByZXR1cm4gbmV4dCgpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oeyBlcnJvcjogJ05vdCBhdXRob3JpemVkIGFzIGFkbWluJyB9KTtcbn1cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZGVmYXVsdF8xO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWVdSdGFXNHVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOHVMaTh1TGk4dUxpOXpjbU12YzJWeWRtVnlMMjFwWkdSc1pYZGhjbVV2WVdSdGFXNHVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanM3UVVGQlFTeHRRa0ZCZDBJc1IwRkJVU3hGUVVGRkxFZEJRVkVzUlVGQlJTeEpRVUZqTzBsQlEzUkVMRWxCUVVrc1IwRkJSeXhEUVVGRExFbEJRVWtzU1VGQlNTeEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1MwRkJTeXhQUVVGUExFVkJRVVU3VVVGRGRrTXNUMEZCVHl4SlFVRkpMRVZCUVVVc1EwRkJRenRMUVVOcVFqdEpRVU5FTEU5QlFVOHNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4TFFVRkxMRVZCUVVVc2VVSkJRWGxDTEVWQlFVVXNRMEZCUXl4RFFVRkRPMEZCUTNSRkxFTkJRVU03UVVGTVJDd3JRa0ZMUXlKOSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBqc29ud2VidG9rZW5fMSA9IHJlcXVpcmUoXCJqc29ud2VidG9rZW5cIik7XG52YXIgZW52ID0gcmVxdWlyZSgnLi4vLi4vLi4vZW52Jyk7XG5mdW5jdGlvbiBkZWZhdWx0XzEocmVxLCByZXMsIG5leHQpIHtcbiAgICB2YXIgdG9rZW4gPSByZXEuc2Vzc2lvbi50b2tlbiB8fCByZXEuaGVhZGVyc1sneC1hY2Nlc3MtdG9rZW4nXTtcbiAgICBpZiAoIXRva2VuKVxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oeyBlcnJvcjogJ05vdCBhdXRob3JpemVkJyB9KTtcbiAgICBqc29ud2VidG9rZW5fMS52ZXJpZnkodG9rZW4sIGVudi5zZWNyZXQsIGZ1bmN0aW9uIChlcnIsIGRlY29kZWQpIHtcbiAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuc2VuZCh7IGVycm9yOiAnTm90IGF1dGhvcml6ZWQnIH0pO1xuICAgICAgICByZXEudXNlciA9IGRlY29kZWQ7XG4gICAgICAgIHJldHVybiBuZXh0KCk7XG4gICAgfSk7XG59XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGRlZmF1bHRfMTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVlYVjBhRzl5YVhwbFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1THk0dUwzTnlZeTl6WlhKMlpYSXZiV2xrWkd4bGQyRnlaUzloZFhSb2IzSnBlbVZrTG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN08wRkJRVUVzTmtOQlFYTkRPMEZCUjNSRExFbEJRVTBzUjBGQlJ5eEhRVUZITEU5QlFVOHNRMEZCUXl4alFVRmpMRU5CUVVNc1EwRkJRenRCUVVOd1F5eHRRa0ZCZDBJc1IwRkJXU3hGUVVGRkxFZEJRV0VzUlVGQlJTeEpRVUZqTzBsQlF5OUVMRWxCUVVrc1MwRkJTeXhIUVVGSExFZEJRVWNzUTBGQlF5eFBRVUZQTEVOQlFVTXNTMEZCU3l4SlFVRkpMRWRCUVVjc1EwRkJReXhQUVVGUExFTkJRVU1zWjBKQlFXZENMRU5CUVVNc1EwRkJRenRKUVVNdlJDeEpRVUZKTEVOQlFVTXNTMEZCU3p0UlFVTk9MRTlCUVU4c1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSU3hMUVVGTExFVkJRVVVzWjBKQlFXZENMRVZCUVVVc1EwRkJReXhEUVVGRE8wbEJSVGRFTEhGQ1FVRk5MRU5CUVVNc1MwRkJTeXhGUVVGRkxFZEJRVWNzUTBGQlF5eE5RVUZOTEVWQlFVVXNWVUZCUXl4SFFVRlZMRVZCUVVVc1QwRkJZenRSUVVOcVJDeEpRVUZKTEVkQlFVYzdXVUZCUlN4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVVc1MwRkJTeXhGUVVGRkxHZENRVUZuUWl4RlFVRkZMRU5CUVVNc1EwRkJRenRSUVVOc1JTeEhRVUZITEVOQlFVTXNTVUZCU1N4SFFVRkhMRTlCUVU4c1EwRkJRenRSUVVOdVFpeFBRVUZQTEVsQlFVa3NSVUZCUlN4RFFVRkRPMGxCUTJ4Q0xFTkJRVU1zUTBGQlF5eERRVUZETzBGQlExQXNRMEZCUXp0QlFWWkVMQ3RDUVZWREluMD0iLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgbW9uZ29vc2VfMSA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTtcbnZhciBjaGFubmVsU2NoZW1hID0gbmV3IG1vbmdvb3NlXzEuU2NoZW1hKHtcbiAgICBuYW1lOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIGxvd2VyY2FzZTogdHJ1ZSxcbiAgICB9LFxufSwge1xuICAgIHRpbWVzdGFtcHM6IHRydWVcbn0pO1xudmFyIENoYW5uZWwgPSBtb25nb29zZV8xLm1vZGVsKCdDaGFubmVsJywgY2hhbm5lbFNjaGVtYSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IENoYW5uZWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lRMmhoYm01bGJDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1THk0dUwzTnlZeTl6WlhKMlpYSXZiVzlrWld4ekwwTm9ZVzV1Wld3dWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZCUVN4eFEwRkJkMFE3UVVGUmVFUXNTVUZCVFN4aFFVRmhMRWRCUVZjc1NVRkJTU3hwUWtGQlRTeERRVUZETzBsQlEzSkRMRWxCUVVrc1JVRkJSVHRSUVVOR0xFbEJRVWtzUlVGQlJTeE5RVUZOTzFGQlExb3NVVUZCVVN4RlFVRkZMRWxCUVVrN1VVRkRaQ3hUUVVGVExFVkJRVVVzU1VGQlNUdExRVU5zUWp0RFFVTktMRVZCUVVVN1NVRkRReXhWUVVGVkxFVkJRVVVzU1VGQlNUdERRVU51UWl4RFFVRkRMRU5CUVVNN1FVRkZTQ3hKUVVGTkxFOUJRVThzUjBGQmIwSXNaMEpCUVVzc1EwRkJReXhUUVVGVExFVkJRVVVzWVVGQllTeERRVUZETEVOQlFVTTdRVUZEYWtVc2NVSkJRV1VzVDBGQlR5eERRVUZESW4wPSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBtb25nb29zZV8xID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpO1xudmFyIG1lc3NhZ2VTY2hlbWEgPSBuZXcgbW9uZ29vc2VfMS5TY2hlbWEoe1xuICAgIGNoYW5uZWw6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB9LFxuICAgIHRleHQ6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB9LFxuICAgIHVzZXJFbWFpbDoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBsb3dlcmNhc2U6IHRydWUsXG4gICAgfVxufSwge1xuICAgIHRpbWVzdGFtcHM6IHRydWVcbn0pO1xudmFyIE1lc3NhZ2UgPSBtb25nb29zZV8xLm1vZGVsKCdNZXNzYWdlJywgbWVzc2FnZVNjaGVtYSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IE1lc3NhZ2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lUV1Z6YzJGblpTNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1THk0dUwzTnlZeTl6WlhKMlpYSXZiVzlrWld4ekwwMWxjM05oWjJVdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZCUVN4eFEwRkJkMFE3UVVGVmVFUXNTVUZCVFN4aFFVRmhMRWRCUVZjc1NVRkJTU3hwUWtGQlRTeERRVUZETzBsQlEzSkRMRTlCUVU4c1JVRkJSVHRSUVVOTUxFbEJRVWtzUlVGQlJTeE5RVUZOTzFGQlExb3NVVUZCVVN4RlFVRkZMRWxCUVVrN1MwRkZha0k3U1VGRFJDeEpRVUZKTEVWQlFVVTdVVUZEUml4SlFVRkpMRVZCUVVVc1RVRkJUVHRSUVVOYUxGRkJRVkVzUlVGQlJTeEpRVUZKTzB0QlEycENPMGxCUTBRc1UwRkJVeXhGUVVGRk8xRkJRMUFzU1VGQlNTeEZRVUZGTEUxQlFVMDdVVUZEV2l4UlFVRlJMRVZCUVVVc1NVRkJTVHRSUVVOa0xGTkJRVk1zUlVGQlJTeEpRVUZKTzB0QlJXeENPME5CUTBvc1JVRkJSVHRKUVVORExGVkJRVlVzUlVGQlJTeEpRVUZKTzBOQlEyNUNMRU5CUVVNc1EwRkJRenRCUVVWSUxFbEJRVTBzVDBGQlR5eEhRVUZ2UWl4blFrRkJTeXhEUVVGRExGTkJRVk1zUlVGQlJTeGhRVUZoTEVOQlFVTXNRMEZCUXp0QlFVTnFSU3h4UWtGQlpTeFBRVUZQTEVOQlFVTWlmUT09IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIG1vbmdvb3NlXzEgPSByZXF1aXJlKFwibW9uZ29vc2VcIik7XG47XG52YXIgdXNlclNjaGVtYSA9IG5ldyBtb25nb29zZV8xLlNjaGVtYSh7XG4gICAgbmFtZTogU3RyaW5nLFxuICAgIGVtYWlsOiB7XG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIGxvd2VyY2FzZTogdHJ1ZVxuICAgIH0sXG4gICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgcm9sZToge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBsb3dlcmNhc2U6IHRydWUsXG4gICAgICAgIFwiZW51bVwiOiBbJ2FkbWluJywgJ3VzZXInXVxuICAgIH0sXG4gICAgZGVsZXRlZDoge1xuICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICBcImRlZmF1bHRcIjogZmFsc2VcbiAgICB9XG59LCB7XG4gICAgdGltZXN0YW1wczogdHJ1ZVxufSk7XG51c2VyU2NoZW1hLnN0YXRpY3MuZmluZEJ5RW1haWwgPSBmdW5jdGlvbiAoZW1haWwpIHtcbiAgICByZXR1cm4gdGhpcy5maW5kT25lKHsgZW1haWw6IGVtYWlsIH0pO1xufTtcbnZhciBVc2VyID0gbW9uZ29vc2VfMS5tb2RlbCgnVXNlcicsIHVzZXJTY2hlbWEpO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBVc2VyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pVlhObGNpNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1THk0dUwzTnlZeTl6WlhKMlpYSXZiVzlrWld4ekwxVnpaWEl1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRkJRU3h4UTBGQk9FVTdRVUZYTjBVc1EwRkJRenRCUVUxR0xFbEJRVTBzVlVGQlZTeEhRVUZYTEVsQlFVa3NhVUpCUVUwc1EwRkJRenRKUVVOc1F5eEpRVUZKTEVWQlFVVXNUVUZCVFR0SlFVTmFMRXRCUVVzc1JVRkJSVHRSUVVOSUxGRkJRVkVzUlVGQlJTeEpRVUZKTzFGQlEyUXNTVUZCU1N4RlFVRkZMRTFCUVUwN1VVRkRXaXhUUVVGVExFVkJRVVVzU1VGQlNUdExRVU5zUWp0SlFVTkVMRkZCUVZFc1JVRkJSVHRSUVVOT0xFbEJRVWtzUlVGQlJTeE5RVUZOTzFGQlExb3NVVUZCVVN4RlFVRkZMRWxCUVVrN1MwRkRha0k3U1VGRFJDeEpRVUZKTEVWQlFVVTdVVUZEUml4SlFVRkpMRVZCUVVVc1RVRkJUVHRSUVVOYUxGRkJRVkVzUlVGQlJTeEpRVUZKTzFGQlEyUXNVMEZCVXl4RlFVRkZMRWxCUVVrN1VVRkRaaXhOUVVGSkxFVkJRVVVzUTBGQlF5eFBRVUZQTEVWQlFVVXNUVUZCVFN4RFFVRkRPMHRCUXpGQ08wbEJRMFFzVDBGQlR5eEZRVUZGTzFGQlEwd3NTVUZCU1N4RlFVRkZMRTlCUVU4N1VVRkRZaXhUUVVGUExFVkJRVVVzUzBGQlN6dExRVU5xUWp0RFFVTktMRVZCUVVVN1NVRkRReXhWUVVGVkxFVkJRVVVzU1VGQlNUdERRVU51UWl4RFFVRkRMRU5CUVVNN1FVRkZTQ3hWUVVGVkxFTkJRVU1zVDBGQlR5eERRVUZETEZkQlFWY3NSMEZCUnl4VlFVRlZMRXRCUVdFN1NVRkRjRVFzVDBGQlR5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRVZCUVVNc1MwRkJTeXhGUVVGRkxFdEJRVXNzUlVGQlF5eERRVUZETEVOQlFVTTdRVUZEZUVNc1EwRkJReXhEUVVGQk8wRkJSVVFzU1VGQlRTeEpRVUZKTEVkQlFXVXNaMEpCUVVzc1EwRkJiMElzVFVGQlRTeEZRVUZGTEZWQlFWVXNRMEZCUXl4RFFVRkRPMEZCUTNSRkxIRkNRVUZsTEVsQlFVa3NRMEZCUXlKOSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBwYXRoID0gcmVxdWlyZShcInBhdGhcIik7XG52YXIgYXV0aG9yaXplZF8xID0gcmVxdWlyZShcIi4vbWlkZGxld2FyZS9hdXRob3JpemVkXCIpO1xudmFyIGFkbWluXzEgPSByZXF1aXJlKFwiLi9taWRkbGV3YXJlL2FkbWluXCIpO1xudmFyIGF1dGhDb250cm9sbGVyXzEgPSByZXF1aXJlKFwiLi9jb250cm9sbGVycy9hdXRoQ29udHJvbGxlclwiKTtcbnZhciB1c2VyQ29udHJvbGxlcl8xID0gcmVxdWlyZShcIi4vY29udHJvbGxlcnMvdXNlckNvbnRyb2xsZXJcIik7XG52YXIgbWVzc2FnZUNvbnRyb2xsZXJfMSA9IHJlcXVpcmUoXCIuL2NvbnRyb2xsZXJzL21lc3NhZ2VDb250cm9sbGVyXCIpO1xudmFyIGNoYW5uZWxDb250cm9sbGVyXzEgPSByZXF1aXJlKFwiLi9jb250cm9sbGVycy9jaGFubmVsQ29udHJvbGxlclwiKTtcbmZ1bmN0aW9uIGRlZmF1bHRfMShhcHApIHtcbiAgICBhcHAuZ2V0KCcvJywgZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgICAgIHJldHVybiByZXMucmVuZGVyKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi9kaXN0L3B1YmxpYy9pbmRleC5odG1sJyksIHsgY3NyZlRva2VuOiByZXEuY3NyZlRva2VuKCkgfSk7XG4gICAgfSk7XG4gICAgYXBwLmdldCgnL3dpZGdldCcsIGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICByZXR1cm4gcmVzLnJlbmRlcihwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vLi4vZGlzdC9wdWJsaWMvd2lkZ2V0L2luZGV4Lmh0bWwnKSk7XG4gICAgfSk7XG4gICAgYXBwLmdldCgnL3dpZGdldC9kZW1vJywgZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgICAgIHJldHVybiByZXMucmVuZGVyKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi8uLi9kaXN0L3B1YmxpYy93aWRnZXQvZGVtby5odG1sJykpO1xuICAgIH0pO1xuICAgIGFwcC5wb3N0KCcvYXBpL3YxL2xvZ2luJywgYXV0aENvbnRyb2xsZXJfMVtcImRlZmF1bHRcIl0ubG9naW4pO1xuICAgIGFwcC5wb3N0KCcvYXBpL3YxL3JlZ2lzdGVyJywgYXV0aENvbnRyb2xsZXJfMVtcImRlZmF1bHRcIl0ucmVnaXN0ZXIpO1xuICAgIGFwcC5nZXQoJy9hcGkvdjEvbG9nb3V0JywgYXV0aENvbnRyb2xsZXJfMVtcImRlZmF1bHRcIl0ubG9nb3V0KTtcbiAgICBhcHAuZ2V0KCcvYXBpL3YxL3ZlcmlmeUVtYWlsLzppZCcsIGF1dGhDb250cm9sbGVyXzFbXCJkZWZhdWx0XCJdLnZlcmlmeUVtYWlsKTtcbiAgICBhcHAudXNlKCcvYXBpL3YxL3VzZXIqJywgYXV0aG9yaXplZF8xW1wiZGVmYXVsdFwiXSk7XG4gICAgYXBwLmdldCgnL2FwaS92MS91c2VyJywgdXNlckNvbnRyb2xsZXJfMVtcImRlZmF1bHRcIl0udXNlcik7XG4gICAgYXBwLmdldCgnL2FwaS92MS91c2VycycsIHVzZXJDb250cm9sbGVyXzFbXCJkZWZhdWx0XCJdLnVzZXJzKTtcbiAgICBhcHAuZ2V0KCcvYXBpL3YxL3VzZXIvOnVzZXInLCB1c2VyQ29udHJvbGxlcl8xW1wiZGVmYXVsdFwiXS51c2VyQnlFbWFpbCk7XG4gICAgYXBwLnBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvZW1haWwnLCB1c2VyQ29udHJvbGxlcl8xW1wiZGVmYXVsdFwiXS51cGRhdGVFbWFpbCk7XG4gICAgYXBwLnBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvbmFtZScsIHVzZXJDb250cm9sbGVyXzFbXCJkZWZhdWx0XCJdLnVwZGF0ZU5hbWUpO1xuICAgIGFwcC5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL3Bhc3N3b3JkJywgdXNlckNvbnRyb2xsZXJfMVtcImRlZmF1bHRcIl0udXBkYXRlUGFzc3dvcmQpO1xuICAgIGFwcC5wb3N0KCcvYXBpL3YxL3VzZXIvcmVzZXRfcGFzc3dvcmQnLCB1c2VyQ29udHJvbGxlcl8xW1wiZGVmYXVsdFwiXS5yZXNldFBhc3N3b3JkKTtcbiAgICBhcHAucG9zdCgnL2FwaS92MS91c2VyL2NyZWF0ZScsIGFkbWluXzFbXCJkZWZhdWx0XCJdLCB1c2VyQ29udHJvbGxlcl8xW1wiZGVmYXVsdFwiXS5jcmVhdGVVc2VyKTtcbiAgICBhcHAucHV0KCcvYXBpL3YxL3VzZXIvdXBkYXRlJywgYWRtaW5fMVtcImRlZmF1bHRcIl0sIHVzZXJDb250cm9sbGVyXzFbXCJkZWZhdWx0XCJdLmVkaXRVc2VyKTtcbiAgICBhcHBbXCJkZWxldGVcIl0oJy9hcGkvdjEvdXNlci9kZWxldGUnLCBhZG1pbl8xW1wiZGVmYXVsdFwiXSwgdXNlckNvbnRyb2xsZXJfMVtcImRlZmF1bHRcIl0uZGVsZXRlVXNlcik7XG4gICAgYXBwLnB1dCgnL2FwaS92MS91c2VyL3Jlc3RvcmUnLCBhZG1pbl8xW1wiZGVmYXVsdFwiXSwgdXNlckNvbnRyb2xsZXJfMVtcImRlZmF1bHRcIl0ucmVzdG9yZVVzZXIpO1xuICAgIGFwcC51c2UoJy9hcGkvdjEvbWVzc2FnZSonLCBhdXRob3JpemVkXzFbXCJkZWZhdWx0XCJdKTtcbiAgICBhcHAuZ2V0KCcvYXBpL3YxL21lc3NhZ2VzLzpjaGFubmVsLzpvZmZzZXQnLCBtZXNzYWdlQ29udHJvbGxlcl8xW1wiZGVmYXVsdFwiXS5tZXNzYWdlcyk7XG4gICAgYXBwLnVzZSgnL2FwaS92MS9jaGFubmVsJywgYXV0aG9yaXplZF8xW1wiZGVmYXVsdFwiXSk7XG4gICAgYXBwLmdldCgnL2FwaS92MS9jaGFubmVscycsIGNoYW5uZWxDb250cm9sbGVyXzFbXCJkZWZhdWx0XCJdLmNoYW5uZWxzKTtcbiAgICBhcHAucG9zdCgnL2FwaS92MS9jaGFubmVscy9kZWxldGUnLCBhZG1pbl8xW1wiZGVmYXVsdFwiXSwgY2hhbm5lbENvbnRyb2xsZXJfMVtcImRlZmF1bHRcIl1bXCJkZWxldGVcIl0pO1xuICAgIGFwcC5wb3N0KCcvYXBpL3YxL2NoYW5uZWxzL2NyZWF0ZScsIGFkbWluXzFbXCJkZWZhdWx0XCJdLCBjaGFubmVsQ29udHJvbGxlcl8xW1wiZGVmYXVsdFwiXS5jcmVhdGUpO1xuICAgIGFwcC5nZXQoJyonLCBmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5yZW5kZXIocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL2Rpc3QvcHVibGljL2luZGV4Lmh0bWwnKSwgeyBjc3JmVG9rZW46IHJlcS5jc3JmVG9rZW4oKSB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZGVmYXVsdF8xO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pY205MWRHVnpMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dmMzSmpMM05sY25abGNpOXliM1YwWlhNdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZCUVN3eVFrRkJOa0k3UVVGRk4wSXNjMFJCUVdsRU8wRkJRMnBFTERSRFFVRjFRenRCUVVOMlF5d3JSRUZCTUVRN1FVRkRNVVFzSzBSQlFUQkVPMEZCUXpGRUxIRkZRVUZuUlR0QlFVTm9SU3h4UlVGQlowVTdRVUZGYUVVc2JVSkJRWGRDTEVkQlFWRTdTVUZITlVJc1IwRkJSeXhEUVVGRExFZEJRVWNzUTBGQlF5eEhRVUZITEVWQlFVVXNWVUZCVlN4SFFVRlpMRVZCUVVVc1IwRkJZVHRSUVVNNVF5eFBRVUZQTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUTJJc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eFRRVUZUTEVWQlFVVXNPRUpCUVRoQ0xFTkJRVU1zUlVGRGRrUXNSVUZCUlN4VFFVRlRMRVZCUVVVc1IwRkJSeXhEUVVGRExGTkJRVk1zUlVGQlJTeEZRVUZGTEVOQlEycERMRU5CUVVNN1NVRkRUaXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVVZJTEVkQlFVY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1UwRkJVeXhGUVVGRkxGVkJRVlVzUjBGQlVTeEZRVUZGTEVkQlFWRTdVVUZETTBNc1QwRkJUeXhIUVVGSExFTkJRVU1zVFVGQlRTeERRVU5pTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1UwRkJVeXhGUVVGRkxIZERRVUYzUXl4RFFVRkRMRU5CUTNCRkxFTkJRVU03U1VGRFRpeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVVklMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zWTBGQll5eEZRVUZGTEZWQlFWVXNSMEZCVVN4RlFVRkZMRWRCUVZFN1VVRkRhRVFzVDBGQlR5eEhRVUZITEVOQlFVTXNUVUZCVFN4RFFVTmlMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zVTBGQlV5eEZRVUZGTEhWRFFVRjFReXhEUVVGRExFTkJRMjVGTEVOQlFVTTdTVUZEVGl4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVsSUxFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNaVUZCWlN4RlFVRkZMREpDUVVGakxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTTdTVUZEYUVRc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eHJRa0ZCYTBJc1JVRkJSU3d5UWtGQll5eERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRPMGxCUTNSRUxFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNaMEpCUVdkQ0xFVkJRVVVzTWtKQlFXTXNRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJRenRKUVVOcVJDeEhRVUZITEVOQlFVTXNSMEZCUnl4RFFVRkRMSGxDUVVGNVFpeEZRVUZGTERKQ1FVRmpMRU5CUVVNc1YwRkJWeXhEUVVGRExFTkJRVU03U1VGRkwwUXNSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXhsUVVGbExFVkJRVVVzZFVKQlFWVXNRMEZCUXl4RFFVRkRPMGxCUTNKRExFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNZMEZCWXl4RlFVRkZMREpDUVVGakxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdTVUZETjBNc1IwRkJSeXhEUVVGRExFZEJRVWNzUTBGQlF5eGxRVUZsTEVWQlFVVXNNa0pCUVdNc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlFUdEpRVU01UXl4SFFVRkhMRU5CUVVNc1IwRkJSeXhEUVVGRExHOUNRVUZ2UWl4RlFVRkZMREpDUVVGakxFTkJRVU1zVjBGQlZ5eERRVUZETEVOQlFVTTdTVUZETVVRc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5d3lRa0ZCTWtJc1JVRkJSU3d5UWtGQll5eERRVUZETEZkQlFWY3NRMEZCUXl4RFFVRkRPMGxCUTJ4RkxFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNNRUpCUVRCQ0xFVkJRVVVzTWtKQlFXTXNRMEZCUXl4VlFVRlZMRU5CUVVNc1EwRkJRenRKUVVOb1JTeEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRGhDUVVFNFFpeEZRVUZGTERKQ1FVRmpMRU5CUVVNc1kwRkJZeXhEUVVGRExFTkJRVU03U1VGRGVFVXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXcyUWtGQk5rSXNSVUZCUlN3eVFrRkJZeXhEUVVGRExHRkJRV0VzUTBGQlF5eERRVUZETzBsQlEzUkZMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zY1VKQlFYRkNMRVZCUVVVc2EwSkJRVXNzUlVGQlJTd3lRa0ZCWXl4RFFVRkRMRlZCUVZVc1EwRkJReXhEUVVGRE8wbEJRMnhGTEVkQlFVY3NRMEZCUXl4SFFVRkhMRU5CUVVNc2NVSkJRWEZDTEVWQlFVVXNhMEpCUVVzc1JVRkJSU3d5UWtGQll5eERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRPMGxCUXk5RUxFZEJRVWNzUTBGQlF5eFJRVUZOTEVOQlFVRXNRMEZCUXl4eFFrRkJjVUlzUlVGQlJTeHJRa0ZCU3l4RlFVRkZMREpDUVVGakxFTkJRVU1zVlVGQlZTeERRVUZETEVOQlFVTTdTVUZEY0VVc1IwRkJSeXhEUVVGRExFZEJRVWNzUTBGQlF5eHpRa0ZCYzBJc1JVRkJSU3hyUWtGQlN5eEZRVUZGTERKQ1FVRmpMRU5CUVVNc1YwRkJWeXhEUVVGRExFTkJRVU03U1VGRmJrVXNSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXhyUWtGQmEwSXNSVUZCUlN4MVFrRkJWU3hEUVVGRExFTkJRVU03U1VGRGVFTXNSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXh0UTBGQmJVTXNSVUZCUlN3NFFrRkJhVUlzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXp0SlFVVjZSU3hIUVVGSExFTkJRVU1zUjBGQlJ5eERRVUZETEdsQ1FVRnBRaXhGUVVGRkxIVkNRVUZWTEVOQlFVTXNRMEZCUXp0SlFVTjJReXhIUVVGSExFTkJRVU1zUjBGQlJ5eERRVUZETEd0Q1FVRnJRaXhGUVVGRkxEaENRVUZwUWl4RFFVRkRMRkZCUVZFc1EwRkJReXhEUVVGRE8wbEJRM2hFTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc2VVSkJRWGxDTEVWQlFVVXNhMEpCUVVzc1JVRkJSU3c0UWtGQmFVSXNRMEZCUXl4UlFVRk5MRU5CUVVFc1EwRkJReXhEUVVGRE8wbEJRM0pGTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc2VVSkJRWGxDTEVWQlFVVXNhMEpCUVVzc1JVRkJSU3c0UWtGQmFVSXNRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJRenRKUVVkeVJTeEhRVUZITEVOQlFVTXNSMEZCUnl4RFFVRkRMRWRCUVVjc1JVRkJSU3hWUVVGVkxFZEJRVmtzUlVGQlJTeEhRVUZoTzFGQlF6bERMRTlCUVU4c1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGRFlpeEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRk5CUVZNc1JVRkJSU3c0UWtGQk9FSXNRMEZCUXl4RlFVTjJSQ3hGUVVGRkxGTkJRVk1zUlVGQlJTeEhRVUZITEVOQlFVTXNVMEZCVXl4RlFVRkZMRVZCUVVVc1EwRkRha01zUTBGQlF6dEpRVU5PTEVOQlFVTXNRMEZCUXl4RFFVRkRPMEZCUTFBc1EwRkJRenRCUVhwRVJDd3JRa0Y1UkVNaWZRPT0iLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xudmFyIGV4cHJlc3MgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcbnZhciBwYXRoID0gcmVxdWlyZShcInBhdGhcIik7XG52YXIgbW9uZ29vc2UgPSByZXF1aXJlKFwibW9uZ29vc2VcIik7XG52YXIgY3NyZiA9IHJlcXVpcmUoXCJjc3VyZlwiKTtcbnZhciBjb29raWVQYXJzZXIgPSByZXF1aXJlKFwiY29va2llLXBhcnNlclwiKTtcbnZhciBzZXNzaW9uID0gcmVxdWlyZShcImV4cHJlc3Mtc2Vzc2lvblwiKTtcbnZhciBib2R5UGFyc2VyID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpO1xudmFyIGJjcnlwdCA9IHJlcXVpcmUoXCJiY3J5cHRqc1wiKTtcbnZhciBoZWxtZXQgPSByZXF1aXJlKFwiaGVsbWV0XCIpO1xudmFyIGNvbXByZXNzaW9uID0gcmVxdWlyZShcImNvbXByZXNzaW9uXCIpO1xudmFyIGpzb253ZWJ0b2tlbl8xID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTtcbnZhciBtdXN0YWNoZUV4cHJlc3MgPSByZXF1aXJlKCdtdXN0YWNoZS1leHByZXNzJyk7XG52YXIgTW9uZ29TdG9yZSA9IHJlcXVpcmUoJ2Nvbm5lY3QtbW9uZ28nKShzZXNzaW9uKTtcbnZhciByb3V0ZXNfMSA9IHJlcXVpcmUoXCIuL3JvdXRlc1wiKTtcbnZhciBpbmRleF8xID0gcmVxdWlyZShcIi4vc29ja2V0LmlvL2luZGV4XCIpO1xudmFyIFVzZXJfMSA9IHJlcXVpcmUoXCIuL21vZGVscy9Vc2VyXCIpO1xudmFyIGVudiA9IHJlcXVpcmUoJy4uLy4uL2VudicpO1xudmFyIGFwcCA9IGV4cHJlc3MoKTtcbmV4cG9ydHMuYXBwID0gYXBwO1xudmFyIHBvcnQgPSBlbnYucG9ydDtcbnZhciBzZXJ2ZXI7XG52YXIgc29ja2V0U2VydmVyO1xuZXhwb3J0cy5zb2NrZXRTZXJ2ZXIgPSBzb2NrZXRTZXJ2ZXI7XG5hcHAuZW5naW5lKCdodG1sJywgbXVzdGFjaGVFeHByZXNzKCkpO1xuYXBwLnNldCgndmlldyBlbmdpbmUnLCAnaHRtbCcpO1xuYXBwLnVzZShjb21wcmVzc2lvbigpKTtcbnZhciBzZXNzaW9uTWlkZGxld2FyZSA9IHNlc3Npb24oe1xuICAgIHNlY3JldDogZW52LnNlY3JldCxcbiAgICBjb29raWU6IHtcbiAgICAgICAgbWF4QWdlOiAyNCAqIDYwICogNjAgKiAxMDAwLFxuICAgICAgICBzYW1lU2l0ZTogdHJ1ZSxcbiAgICAgICAgc2VjdXJlOiBlbnYucHJvZHVjdGlvbixcbiAgICAgICAgaHR0cE9ubHk6IHRydWVcbiAgICB9LFxuICAgIHNhdmVVbmluaXRpYWxpemVkOiB0cnVlLFxuICAgIHJlc2F2ZTogZmFsc2UsXG4gICAgc3RvcmU6IG5ldyBNb25nb1N0b3JlKHtcbiAgICAgICAgbW9uZ29vc2VDb25uZWN0aW9uOiBtb25nb29zZS5jb25uZWN0aW9uXG4gICAgfSlcbn0pO1xudmFyIGNzcmZNaWRkbGV3YXJlID0gY3NyZih7XG4gICAgY29va2llOiB7XG4gICAgICAgIG1heEFnZTogMjQgKiA2MCAqIDYwICogMTAwMCxcbiAgICAgICAgc2FtZVNpdGU6IHRydWUsXG4gICAgICAgIHNlY3VyZTogZW52LnByb2R1Y3Rpb24sXG4gICAgICAgIGh0dHBPbmx5OiB0cnVlLFxuICAgICAgICBrZXk6ICdfY3NyZidcbiAgICB9XG59KTtcbm1vbmdvb3NlLmNvbm5lY3QoZW52LnVzZVRlc3REYiA/IGVudi5tb25nb2RiVGVzdENvbm5lY3Rpb25VcmkgOiBlbnYubW9uZ29kYkNvbm5lY3Rpb25VcmksIHsgdXNlTmV3VXJsUGFyc2VyOiB0cnVlIH0pO1xubW9uZ29vc2UuY29ubmVjdGlvbi5vbignZXJyb3InLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcignTW9uZ29vc2UgY29ubmVjdGlvbiBlcnJvcicsIGVycik7XG59KTtcbnByb2Nlc3Mub24oJ1NJR0lOVCcsIGZ1bmN0aW9uICgpIHtcbiAgICBtb25nb29zZS5jb25uZWN0aW9uLmNsb3NlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ01vbmdvb3NlIGRlZmF1bHQgY29ubmVjdGlvbiBkaXNjb25uZWN0ZWQgdGhyb3VnaCBhcHAgdGVybWluYXRpb24nKTtcbiAgICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgIH0pO1xufSk7XG5hcHAudXNlKHNlc3Npb25NaWRkbGV3YXJlKTtcbmFwcC51c2UoY29va2llUGFyc2VyKGVudi5zZWNyZXQpKTtcbmlmIChlbnYuZGlzYWJsZUNzcmYpIHtcbiAgICBjb25zb2xlLmxvZygnQ1NSRiBkaXNhYmxlZCcpO1xuICAgIGFwcC51c2UoZnVuY3Rpb24gKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHJlcS5jc3JmVG9rZW4gPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnJzsgfTtcbiAgICAgICAgcmV0dXJuIG5leHQoKTtcbiAgICB9KTtcbn1cbmVsc2Uge1xuICAgIGFwcC51c2UoY3NyZk1pZGRsZXdhcmUpO1xufVxudmFyIGRiID0gbW9uZ29vc2UuY29ubmVjdGlvbjtcbmFwcC51c2UoZnVuY3Rpb24gKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgcmVxLmRiID0gZGI7XG4gICAgcmV0dXJuIG5leHQoKTtcbn0pO1xuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiB0cnVlIH0pKTtcbmFwcC51c2UoaGVsbWV0KCkpO1xuYXBwLnVzZShleHByZXNzLnN0YXRpYyhwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vZGlzdC9wdWJsaWMvJykpKTtcbmFwcC51c2UoJy9hcGknLCBmdW5jdGlvbiAocmVxLCByZXMsIG5leHQpIHtcbiAgICByZXR1cm4gbmV4dCgpO1xufSk7XG5hcHAudXNlKGZ1bmN0aW9uIChyZXEsIHJlcywgbmV4dCkge1xuICAgIHJlcS5hdXRoZW50aWNhdGUgPSBmdW5jdGlvbiAoZW1haWwsIHBhc3N3b3JkLCBkb25lKSB7XG4gICAgICAgIFVzZXJfMVtcImRlZmF1bHRcIl0uZmluZEJ5RW1haWwoZW1haWwpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgICAgIGlmICh1c2VyID09PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGZhbHNlLCBudWxsKTtcbiAgICAgICAgICAgIGlmICghYmNyeXB0LmNvbXBhcmVTeW5jKHBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShmYWxzZSwgbmV3IEVycm9yKCdJbnZhbGlkIHBhc3N3b3JkJykpO1xuICAgICAgICAgICAgdmFyIHVzZXJEZXRhaWxzID0ge1xuICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICAgICAgICByb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIGRvbmUodXNlckRldGFpbHMsIG51bGwpO1xuICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGRvbmUoZmFsc2UsIGVycik7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmVxLmxvZ291dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVxLnNlc3Npb24udG9rZW4gPSBudWxsO1xuICAgIH07XG4gICAgcmVxLmlzc3VlTmV3VG9rZW4gPSBmdW5jdGlvbiAodXNlcikge1xuICAgICAgICB2YXIgdG9rZW4gPSBqc29ud2VidG9rZW5fMS5zaWduKHtcbiAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICAgIHJvbGU6IHVzZXIucm9sZSxcbiAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsXG4gICAgICAgIH0sIGVudi5zZWNyZXQsIHtcbiAgICAgICAgICAgIGV4cGlyZXNJbjogODY0MDBcbiAgICAgICAgfSk7XG4gICAgICAgIHJlcy5zZXRIZWFkZXIoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pO1xuICAgICAgICByZXEuc2Vzc2lvbi50b2tlbiA9IHRva2VuO1xuICAgIH07XG4gICAgbmV4dCgpO1xufSk7XG5yb3V0ZXNfMVtcImRlZmF1bHRcIl0oYXBwKTtcbnNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKGFwcCk7XG5zZXJ2ZXIub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICBzZXJ2ZXIuY2xvc2UoKTtcbn0pO1xuaWYgKCFlbnYuZGlzYWJsZUF1dG9TdGFydCkge1xuICAgIGV4cG9ydHMuc29ja2V0U2VydmVyID0gc29ja2V0U2VydmVyID0gaW5kZXhfMVtcImRlZmF1bHRcIl0oc2VydmVyLCBkYik7XG4gICAgbW9uZ29vc2UuY29ubmVjdGlvbi5vbignY29ubmVjdGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ29ubmVjdGVkIHRvIE1vbmdvREIgdmlhIE1vbmdvb3NlJyk7XG4gICAgICAgIHNlcnZlci5saXN0ZW4ocG9ydCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJMaXN0ZW5pbmcgb24gcG9ydCBcIiArIHBvcnQgKyBcIiFcIik7XG4gICAgICAgICAgICBhcHAuZW1pdCgnc2VydmVyIHN0YXJ0ZWQnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHNlcnZlcjtcbmV4cG9ydHMuY29ubiA9IG1vbmdvb3NlLmNvbm5lY3Rpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2ljMlZ5ZG1WeUxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZMaTR2YzNKakwzTmxjblpsY2k5elpYSjJaWEl1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRkZRU3d5UWtGQk5rSTdRVUZETjBJc2FVTkJRVzFETzBGQlEyNURMREpDUVVFMlFqdEJRVVUzUWl4dFEwRkJjVU03UVVGRGNrTXNORUpCUVRoQ08wRkJRemxDTERSRFFVRTRRenRCUVVNNVF5eDVRMEZCTWtNN1FVRkRNME1zZDBOQlFUQkRPMEZCUXpGRExHbERRVUZ0UXp0QlFVTnVReXdyUWtGQmFVTTdRVUZGYWtNc2VVTkJRVEpETzBGQlF6TkRMRFpEUVVGdlF6dEJRVU53UXl4SlFVRk5MR1ZCUVdVc1IwRkJSeXhQUVVGUExFTkJRVU1zYTBKQlFXdENMRU5CUVVNc1EwRkJRenRCUVVOd1JDeEpRVUZOTEZWQlFWVXNSMEZCUnl4UFFVRlBMRU5CUVVNc1pVRkJaU3hEUVVGRExFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTTdRVUZGY2tRc2JVTkJRVGhDTzBGQlF6bENMREpEUVVFd1F6dEJRVVV4UXl4elEwRkJORU03UVVGRE5VTXNTVUZCVFN4SFFVRkhMRWRCUVVjc1QwRkJUeXhEUVVGRExGZEJRVmNzUTBGQlF5eERRVUZETzBGQlJXcERMRWxCUVUwc1IwRkJSeXhIUVVGUkxFOUJRVThzUlVGQlJTeERRVUZETzBGQmJVbHNRaXhyUWtGQlJ6dEJRV3hKV2l4SlFVRk5MRWxCUVVrc1IwRkJiMElzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXp0QlFVTjJReXhKUVVGSkxFMUJRVzFDTEVOQlFVTTdRVUZEZUVJc1NVRkJTU3haUVVFMlFpeERRVUZETzBGQlowbHdRaXh2UTBGQldUdEJRVGxJTVVJc1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eE5RVUZOTEVWQlFVVXNaVUZCWlN4RlFVRkZMRU5CUVVNc1EwRkJRenRCUVVOMFF5eEhRVUZITEVOQlFVTXNSMEZCUnl4RFFVRkRMR0ZCUVdFc1JVRkJSU3hOUVVGTkxFTkJRVU1zUTBGQlF6dEJRVVV2UWl4SFFVRkhMRU5CUVVNc1IwRkJSeXhEUVVGRExGZEJRVmNzUlVGQlJTeERRVUZETEVOQlFVTTdRVUZGZGtJc1NVRkJUU3hwUWtGQmFVSXNSMEZCUnl4UFFVRlBMRU5CUVVNN1NVRkRPVUlzVFVGQlRTeEZRVUZGTEVkQlFVY3NRMEZCUXl4TlFVRk5PMGxCUTJ4Q0xFMUJRVTBzUlVGQlJUdFJRVU5LTEUxQlFVMHNSVUZCUlN4RlFVRkZMRWRCUVVjc1JVRkJSU3hIUVVGSExFVkJRVVVzUjBGQlJ5eEpRVUZKTzFGQlF6TkNMRkZCUVZFc1JVRkJSU3hKUVVGSk8xRkJRMlFzVFVGQlRTeEZRVUZGTEVkQlFVY3NRMEZCUXl4VlFVRlZPMUZCUTNSQ0xGRkJRVkVzUlVGQlJTeEpRVUZKTzB0QlEycENPMGxCUTBRc2FVSkJRV2xDTEVWQlFVVXNTVUZCU1R0SlFVTjJRaXhOUVVGTkxFVkJRVVVzUzBGQlN6dEpRVU5pTEV0QlFVc3NSVUZCUlN4SlFVRkpMRlZCUVZVc1EwRkJRenRSUVVOc1FpeHJRa0ZCYTBJc1JVRkJSU3hSUVVGUkxFTkJRVU1zVlVGQlZUdExRVU14UXl4RFFVRkRPME5CUTB3c1EwRkJReXhEUVVGRE8wRkJSVWdzU1VGQlRTeGpRVUZqTEVkQlFVY3NTVUZCU1N4RFFVRkRPMGxCUTNoQ0xFMUJRVTBzUlVGQlJUdFJRVU5LTEUxQlFVMHNSVUZCUlN4RlFVRkZMRWRCUVVjc1JVRkJSU3hIUVVGSExFVkJRVVVzUjBGQlJ5eEpRVUZKTzFGQlF6TkNMRkZCUVZFc1JVRkJSU3hKUVVGSk8xRkJRMlFzVFVGQlRTeEZRVUZGTEVkQlFVY3NRMEZCUXl4VlFVRlZPMUZCUTNSQ0xGRkJRVkVzUlVGQlJTeEpRVUZKTzFGQlEyUXNSMEZCUnl4RlFVRkZMRTlCUVU4N1MwRkRaanREUVVOS0xFTkJRVU1zUTBGQlFUdEJRVVZHTEZGQlFWRXNRMEZCUXl4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExGTkJRVk1zUTBGQlF5eERRVUZETEVOQlFVTXNSMEZCUnl4RFFVRkRMSGRDUVVGM1FpeERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc2IwSkJRVzlDTEVWQlFVVXNSVUZCUlN4bFFVRmxMRVZCUVVVc1NVRkJTU3hGUVVGRkxFTkJRVU1zUTBGQlF6dEJRVU55U0N4UlFVRlJMRU5CUVVNc1ZVRkJWU3hEUVVGRExFVkJRVVVzUTBGQlF5eFBRVUZQTEVWQlFVVXNWVUZCVXl4SFFVRkhPMGxCUTNoRExFOUJRVThzUTBGQlF5eExRVUZMTEVOQlFVTXNNa0pCUVRKQ0xFVkJRVVVzUjBGQlJ5eERRVUZETEVOQlFVTTdRVUZEY0VRc1EwRkJReXhEUVVGRExFTkJRVU03UVVGRFNDeFBRVUZQTEVOQlFVTXNSVUZCUlN4RFFVRkRMRkZCUVZFc1JVRkJSVHRKUVVOcVFpeFJRVUZSTEVOQlFVTXNWVUZCVlN4RFFVRkRMRXRCUVVzc1EwRkJRenRSUVVOMFFpeFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMR3RGUVVGclJTeERRVUZETEVOQlFVTTdVVUZEYUVZc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTndRaXhEUVVGRExFTkJRVU1zUTBGQlF6dEJRVU5RTEVOQlFVTXNRMEZCUXl4RFFVRkRPMEZCUlVnc1IwRkJSeXhEUVVGRExFZEJRVWNzUTBGQlF5eHBRa0ZCYVVJc1EwRkJReXhEUVVGRE8wRkJRek5DTEVkQlFVY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1dVRkJXU3hEUVVGRExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRPMEZCUld4RExFbEJRVWNzUjBGQlJ5eERRVUZETEZkQlFWY3NSVUZCUlR0SlFVTm9RaXhQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEdWQlFXVXNRMEZCUXl4RFFVRkRPMGxCUXpkQ0xFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNWVUZCUXl4SFFVRkhMRVZCUVVVc1IwRkJSeXhGUVVGRkxFbEJRVWs3VVVGRGJrSXNSMEZCUnl4RFFVRkRMRk5CUVZNc1IwRkJSeXhqUVVGakxFOUJRVThzUlVGQlJTeERRVUZCTEVOQlFVTXNRMEZCUXl4RFFVRkJPMUZCUTNwRExFOUJRVThzU1VGQlNTeEZRVUZGTEVOQlFVTTdTVUZEYkVJc1EwRkJReXhEUVVGRExFTkJRVU03UTBGRFRqdExRVUZOTzBsQlEwZ3NSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXhqUVVGakxFTkJRVU1zUTBGQlF6dERRVU16UWp0QlFVVkVMRWxCUVVrc1JVRkJSU3hIUVVGM1FpeFJRVUZSTEVOQlFVTXNWVUZCVlN4RFFVRkRPMEZCUTJ4RUxFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNWVUZCUXl4SFFVRlpMRVZCUVVVc1IwRkJZU3hGUVVGRkxFbEJRV003U1VGRGFFUXNSMEZCUnl4RFFVRkRMRVZCUVVVc1IwRkJSeXhGUVVGRkxFTkJRVU03U1VGRFdpeFBRVUZQTEVsQlFVa3NSVUZCUlN4RFFVRkRPMEZCUTJ4Q0xFTkJRVU1zUTBGQlF5eERRVUZCTzBGQlEwWXNSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXhWUVVGVkxFTkJRVU1zU1VGQlNTeEZRVUZGTEVOQlFVTXNRMEZCUXp0QlFVTXpRaXhIUVVGSExFTkJRVU1zUjBGQlJ5eERRVUZETEZWQlFWVXNRMEZCUXl4VlFVRlZMRU5CUVVNc1JVRkJSU3hSUVVGUkxFVkJRVVVzU1VGQlNTeEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRPMEZCU1c1RUxFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNUVUZCVFN4RlFVRkZMRU5CUVVNc1EwRkJRenRCUVVWc1FpeEhRVUZITEVOQlFVTXNSMEZCUnl4RFFVRkRMRTlCUVU4c1EwRkJReXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4VFFVRlRMRVZCUVVVc2IwSkJRVzlDTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1FVRkZka1VzUjBGQlJ5eERRVUZETEVkQlFVY3NRMEZCUXl4TlFVRk5MRVZCUVVVc1ZVRkJWU3hIUVVGWkxFVkJRVVVzUjBGQllTeEZRVUZGTEVsQlFXTTdTVUZGYWtVc1QwRkJUeXhKUVVGSkxFVkJRVVVzUTBGQlF6dEJRVU5zUWl4RFFVRkRMRU5CUVVNc1EwRkJRenRCUVVOSUxFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNWVUZCUXl4SFFVRlpMRVZCUVVVc1IwRkJZU3hGUVVGRkxFbEJRV003U1VGRGFFUXNSMEZCUnl4RFFVRkRMRmxCUVZrc1IwRkJSeXhWUVVGRExFdEJRV0VzUlVGRFlpeFJRVUZuUWl4RlFVTm9RaXhKUVVFd1JEdFJRVU14UlN4cFFrRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJReXhKUVVGWE8xbEJRM0pETEVsQlFVa3NTVUZCU1N4TFFVRkxMRWxCUVVrN1owSkJRVVVzVDBGQlR5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRE8xbEJRelZETEVsQlFVa3NRMEZCUXl4TlFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExGRkJRVkVzUlVGQlJTeEpRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRPMmRDUVVGRkxFOUJRVThzU1VGQlNTeERRVUZETEV0QlFVc3NSVUZCUlN4SlFVRkpMRXRCUVVzc1EwRkJReXhyUWtGQmEwSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRjRWNzU1VGQlNTeFhRVUZYTEVkQlFWRTdaMEpCUTI1Q0xFdEJRVXNzUlVGQlJTeEpRVUZKTEVOQlFVTXNTMEZCU3p0blFrRkRha0lzU1VGQlNTeEZRVUZGTEVsQlFVa3NRMEZCUXl4SlFVRkpPMmRDUVVObUxFbEJRVWtzUlVGQlJTeEpRVUZKTEVOQlFVTXNTVUZCU1R0aFFVTnNRaXhEUVVGQk8xbEJRMFFzVDBGQlR5eEpRVUZKTEVOQlFVTXNWMEZCVnl4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRMjVETEVOQlFVTXNRMEZCUXl4RFFVRkRMRTlCUVVzc1EwRkJRU3hEUVVGRExGVkJRVU1zUjBGQlZUdFpRVU5vUWl4SlFVRkpMRU5CUVVNc1MwRkJTeXhGUVVGRkxFZEJRVWNzUTBGQlF5eERRVUZETzFGQlEzSkNMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMUFzUTBGQlF5eERRVUZCTzBsQlEwUXNSMEZCUnl4RFFVRkRMRTFCUVUwc1IwRkJSenRSUVVOVUxFZEJRVWNzUTBGQlF5eFBRVUZQTEVOQlFVTXNTMEZCU3l4SFFVRkhMRWxCUVVrc1EwRkJRenRKUVVNM1FpeERRVUZETEVOQlFVRTdTVUZEUkN4SFFVRkhMRU5CUVVNc1lVRkJZU3hIUVVGSExGVkJRVU1zU1VGQlZ6dFJRVU0xUWl4SlFVRkpMRXRCUVVzc1IwRkJWeXh0UWtGQlNTeERRVUZETzFsQlEzSkNMRWxCUVVrc1JVRkJSU3hKUVVGSkxFTkJRVU1zU1VGQlNUdFpRVU5tTEVsQlFVa3NSVUZCUlN4SlFVRkpMRU5CUVVNc1NVRkJTVHRaUVVObUxFdEJRVXNzUlVGQlJTeEpRVUZKTEVOQlFVTXNTMEZCU3p0VFFVTndRaXhGUVVGRkxFZEJRVWNzUTBGQlF5eE5RVUZOTEVWQlFVVTdXVUZEV0N4VFFVRlRMRVZCUVVVc1MwRkJTenRUUVVOdVFpeERRVUZETEVOQlFVTTdVVUZEU0N4SFFVRkhMRU5CUVVNc1UwRkJVeXhEUVVGRExHZENRVUZuUWl4RlFVRkZMRXRCUVVzc1EwRkJReXhEUVVGRE8xRkJRM1pETEVkQlFVY3NRMEZCUXl4UFFVRlBMRU5CUVVNc1MwRkJTeXhIUVVGSExFdEJRVXNzUTBGQlF6dEpRVU01UWl4RFFVRkRMRU5CUVVFN1NVRkRSQ3hKUVVGSkxFVkJRVVVzUTBGQlF6dEJRVU5ZTEVOQlFVTXNRMEZCUXl4RFFVRkRPMEZCUlVnc2JVSkJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0QlFVTmFMRTFCUVUwc1IwRkJSeXhKUVVGSkxFTkJRVU1zV1VGQldTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMEZCUTJoRExFMUJRVTBzUTBGQlF5eEZRVUZGTEVOQlFVTXNUMEZCVHl4RlFVRkZMRlZCUVVNc1IwRkJWVHRKUVVNeFFpeFBRVUZQTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8wbEJRMjVDTEUxQlFVMHNRMEZCUXl4TFFVRkxMRVZCUVVVc1EwRkJRenRCUVVOdVFpeERRVUZETEVOQlFVTXNRMEZCUVR0QlFVVkdMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zWjBKQlFXZENMRVZCUVVVN1NVRkRka0lzZFVKQlFVRXNXVUZCV1N4SFFVRkhMR3RDUVVGVExFTkJRVU1zVFVGQlRTeEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkRPMGxCUTNKRExGRkJRVkVzUTBGQlF5eFZRVUZWTEVOQlFVTXNSVUZCUlN4RFFVRkRMRmRCUVZjc1JVRkJSVHRSUVVOb1F5eFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMRzFEUVVGdFF5eERRVUZETEVOQlFVTTdVVUZEYWtRc1RVRkJUU3hEUVVGRExFMUJRVTBzUTBGQlF5eEpRVUZKTEVWQlFVVTdXVUZEYUVJc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eDFRa0ZCY1VJc1NVRkJTU3hOUVVGSExFTkJRVU1zUTBGQlF6dFpRVU14UXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExHZENRVUZuUWl4RFFVRkRMRU5CUVVNN1VVRkRMMElzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenREUVVOT08wRkJSVVFzY1VKQlFXVXNUVUZCVFN4RFFVRkRPMEZCUTFRc1VVRkJRU3hKUVVGSkxFZEJRVWNzVVVGQlVTeERRVUZETEZWQlFWVXNRMEZCUXlKOSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBzb2NrZXRpbyA9IHJlcXVpcmUoXCJzb2NrZXQuaW9cIik7XG52YXIgc29ja2V0aW9fand0XzEgPSByZXF1aXJlKFwic29ja2V0aW8tand0XCIpO1xudmFyIE1lc3NhZ2VfMSA9IHJlcXVpcmUoXCIuLi9tb2RlbHMvTWVzc2FnZVwiKTtcbnZhciBlbnYgPSByZXF1aXJlKCcuLi8uLi8uLi9lbnYnKTtcbnZhciBpbml0ID0gZnVuY3Rpb24gKHNlcnZlciwgZGIpIHtcbiAgICB2YXIgaW8gPSBzb2NrZXRpbyhzZXJ2ZXIpO1xuICAgIHZhciBjb25uZWN0ZWRVc2VyRW1haWxzID0gW107XG4gICAgaW8ub24oJ2Nvbm5lY3Rpb24nLCBzb2NrZXRpb19qd3RfMS5hdXRob3JpemUoe1xuICAgICAgICBzZWNyZXQ6IGVudi5zZWNyZXQsXG4gICAgICAgIHRpbWVvdXQ6IDE1MDAwLFxuICAgICAgICBkZWNvZGVkUHJvcGVydHlOYW1lOiAnand0J1xuICAgIH0pKS5vbignYXV0aGVudGljYXRlZCcsIGZ1bmN0aW9uIChzb2NrZXQpIHtcbiAgICAgICAgY29ubmVjdGVkVXNlckVtYWlscy5wdXNoKHNvY2tldC5qd3QuZW1haWwpO1xuICAgICAgICBjb25zb2xlLmxvZygnQ29ubmVjdGVkIHVzZXJzJywgY29ubmVjdGVkVXNlckVtYWlscyk7XG4gICAgICAgIGlvLmVtaXQoJ2Nvbm5lY3RlZCB1c2VycycsIGNvbm5lY3RlZFVzZXJFbWFpbHMuZmlsdGVyKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIHNlbGYpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmluZGV4T2YodmFsdWUpID09PSBpbmRleDtcbiAgICAgICAgfSkpO1xuICAgICAgICBzb2NrZXQub24oJ2Rpc2Nvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25uZWN0ZWRVc2VyRW1haWxzLnNwbGljZShjb25uZWN0ZWRVc2VyRW1haWxzLmluZGV4T2Yoc29ja2V0Lmp3dC5lbWFpbCksIDEpO1xuICAgICAgICAgICAgaW8uZW1pdCgnY29ubmVjdGVkIHVzZXJzJywgY29ubmVjdGVkVXNlckVtYWlscy5maWx0ZXIoZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgc2VsZikge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmluZGV4T2YodmFsdWUpID09PSBpbmRleDtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNvY2tldC5vbignbWVzc2FnZScsIGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgICAgIHZhciBtID0gbmV3IE1lc3NhZ2VfMVtcImRlZmF1bHRcIl0oe1xuICAgICAgICAgICAgICAgIGNoYW5uZWw6IG1lc3NhZ2UuY2hhbm5lbCxcbiAgICAgICAgICAgICAgICB0ZXh0OiBtZXNzYWdlLnRleHQsXG4gICAgICAgICAgICAgICAgdXNlckVtYWlsOiBzb2NrZXQuand0LmVtYWlsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG0uc2F2ZSgpLnRoZW4oZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgICAgICAgICBpby5lbWl0KCdtZXNzYWdlJywge1xuICAgICAgICAgICAgICAgICAgICBfaWQ6IG0uX2lkLFxuICAgICAgICAgICAgICAgICAgICB1c2VyRW1haWw6IG0udXNlckVtYWlsLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBtLnRleHQsXG4gICAgICAgICAgICAgICAgICAgIGNoYW5uZWw6IG0uY2hhbm5lbCxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZDogbS5jcmVhdGVkQXRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzb2NrZXQuZW1pdCgnbWVzc2FnZSByZWNlaXZlZCcpO1xuICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KCdtZXNzYWdlIHJlY2VpdmUgZXJyb3InLCBlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBpbztcbn07XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGluaXQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhVzVrWlhndWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOHVMaTh1TGk5emNtTXZjMlZ5ZG1WeUwzTnZZMnRsZEM1cGJ5OXBibVJsZUM1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96dEJRVUZCTEc5RFFVRnpRenRCUVVkMFF5dzJRMEZCZFVRN1FVRkRka1FzTmtOQlFYTkVPMEZCUlhSRUxFbEJRVTBzUjBGQlJ5eEhRVUZITEU5QlFVOHNRMEZCUXl4alFVRmpMRU5CUVVNc1EwRkJRenRCUVUxd1F5eEpRVUZOTEVsQlFVa3NSMEZCUnl4VlFVRkRMRTFCUVdNc1JVRkJSU3hGUVVGak8wbEJRM2hETEVsQlFVMHNSVUZCUlN4SFFVRnZRaXhSUVVGUkxFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTTdTVUZETjBNc1NVRkJTU3h0UWtGQmJVSXNSMEZCWVN4RlFVRkZMRU5CUVVNN1NVRkhka01zUlVGQlJTeERRVUZETEVWQlFVVXNRMEZCUXl4WlFVRlpMRVZCUVVVc2QwSkJRVmtzUTBGQlF6dFJRVU42UWl4TlFVRk5MRVZCUVVVc1IwRkJSeXhEUVVGRExFMUJRVTA3VVVGRGJFSXNUMEZCVHl4RlFVRkZMRXRCUVVzN1VVRkRaQ3h0UWtGQmJVSXNSVUZCUlN4TFFVRkxPMHRCUXpkQ0xFTkJRVU1zUTBGQlF5eERRVUZETEVWQlFVVXNRMEZCUXl4bFFVRmxMRVZCUVVVc1ZVRkJReXhOUVVGak8xRkJSVzVETEcxQ1FVRnRRaXhEUVVGRExFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRE8xRkJRek5ETEU5QlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc2FVSkJRV2xDTEVWQlFVVXNiVUpCUVcxQ0xFTkJRVU1zUTBGQlF6dFJRVU53UkN4RlFVRkZMRU5CUVVNc1NVRkJTU3hEUVVGRExHbENRVUZwUWl4RlFVRkZMRzFDUVVGdFFpeERRVUZETEUxQlFVMHNRMEZCUXl4VlFVRkRMRXRCUVVzc1JVRkJSU3hMUVVGTExFVkJRVVVzU1VGQlNUdFpRVU55UlN4UFFVRlBMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NTMEZCU3l4RFFVRkRPMUZCUTNwRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdVVUZGU2l4TlFVRk5MRU5CUVVNc1JVRkJSU3hEUVVGRExGbEJRVmtzUlVGQlJUdFpRVU53UWl4dFFrRkJiVUlzUTBGQlF5eE5RVUZOTEVOQlFVTXNiVUpCUVcxQ0xFTkJRVU1zVDBGQlR5eERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1MwRkJTeXhEUVVGRExFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZETjBVc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eHBRa0ZCYVVJc1JVRkJSU3h0UWtGQmJVSXNRMEZCUXl4TlFVRk5MRU5CUVVNc1ZVRkJReXhMUVVGTExFVkJRVVVzUzBGQlN5eEZRVUZGTEVsQlFVazdaMEpCUTNKRkxFOUJRVThzU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhMUVVGTExFTkJRVU03V1VGRGVrTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOU0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlJVZ3NUVUZCVFN4RFFVRkRMRVZCUVVVc1EwRkJReXhUUVVGVExFVkJRVVVzVlVGQlF5eFBRVUV3UXp0WlFVTTFSQ3hQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRPMWxCUTNKQ0xFbEJRVWtzUTBGQlF5eEhRVUZoTEVsQlFVa3NiMEpCUVU4c1EwRkJRenRuUWtGRE1VSXNUMEZCVHl4RlFVRkZMRTlCUVU4c1EwRkJReXhQUVVGUE8yZENRVU40UWl4SlFVRkpMRVZCUVVVc1QwRkJUeXhEUVVGRExFbEJRVWs3WjBKQlEyeENMRk5CUVZNc1JVRkJSU3hOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEV0QlFVczdZVUZET1VJc1EwRkJReXhEUVVGRE8xbEJRMGdzUTBGQlF5eERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGRExFTkJRVmM3WjBKQlEzUkNMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zVTBGQlV5eEZRVUZGTzI5Q1FVTm1MRWRCUVVjc1JVRkJSU3hEUVVGRExFTkJRVU1zUjBGQlJ6dHZRa0ZEVml4VFFVRlRMRVZCUVVVc1EwRkJReXhEUVVGRExGTkJRVk03YjBKQlEzUkNMRWxCUVVrc1JVRkJSU3hEUVVGRExFTkJRVU1zU1VGQlNUdHZRa0ZEV2l4UFFVRlBMRVZCUVVVc1EwRkJReXhEUVVGRExFOUJRVTg3YjBKQlEyeENMRTlCUVU4c1JVRkJSU3hEUVVGRExFTkJRVU1zVTBGQlV6dHBRa0ZEZGtJc1EwRkJReXhEUVVGRE8yZENRVU5JTEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc2EwSkJRV3RDTEVOQlFVTXNRMEZCUXp0WlFVTndReXhEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZMTEVOQlFVRXNRMEZCUXl4VlFVRkRMRWRCUVZVN1owSkJRMmhDTEU5QlFVOHNRMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU03WjBKQlEyNUNMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zZFVKQlFYVkNMRVZCUVVVc1IwRkJSeXhEUVVGRExFTkJRVU03V1VGRE9VTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTFBc1QwRkJUeXhGUVVGRkxFTkJRVU03UVVGRFpDeERRVUZETEVOQlFVRTdRVUZGUkN4eFFrRkJaU3hKUVVGSkxFTkJRVU1pZlE9PSIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbnZhciBfdGhpcyA9IHRoaXM7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIGF4aW9zXzEgPSByZXF1aXJlKFwiYXhpb3NcIik7XG52YXIgbm90aWZpY2F0aW9uc0FjdGlvbnNfMSA9IHJlcXVpcmUoXCIuL25vdGlmaWNhdGlvbnNBY3Rpb25zXCIpO1xuZXhwb3J0cy5BRERfQ0hBTk5FTFMgPSAnQUREX0NIQU5ORUxTJztcbmV4cG9ydHMuU0VUX0NIQU5ORUxfRkVUQ0hJTkdfTkVXX01FU1NBR0VTID0gJ1NFVF9DSEFOTkVMX0ZFVENISU5HX05FV19NRVNTQUdFUyc7XG5leHBvcnRzLlNFVF9DSEFOTkVMX0hBU19NT1JFX01FU1NBR0VTID0gJ1NFVF9DSEFOTkVMX0hBU19NT1JFX01FU1NBR0UnO1xuZXhwb3J0cy5BRERfUkVDRUlWRURfQ0hBTk5FTF9NRVNTQUdFID0gJ0FERF9SRUNFSVZFRF9DSEFOTkVMX01FU1NBR0UnO1xuZXhwb3J0cy5BRERfUkVUUklFVkVEX0NIQU5ORUxfTUVTU0FHRVMgPSAnQUREX1JFVFJJRVZFRF9DSEFOTkVMX01FU1NBR0VTJztcbmV4cG9ydHMuSU5DUkVNRU5UX0NIQU5ORUxfUkVUUklFVkVfTUVTU0FHRVNfT0ZGU0VUID0gJ0lOQ1JFTUVOVF9DSEFOTkVMX1JFVFJJRVZFX01FU1NBR0VTX09GRlNFVCc7XG5leHBvcnRzLlJFVFJJRVZFX0NIQU5ORUxfTUVTU0FHRVMgPSAnUkVUUklFVkVfQ0hBTk5FTF9NRVNTQUdFUyc7XG5leHBvcnRzLkNMRUFSX0NIQU5ORUxTX0RBVEEgPSAnQ0xFQVJfQ0hBTk5FTFNfREFUQSc7XG5leHBvcnRzLmFkZENoYW5uZWxzID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lcykge1xuICAgIHZhciBjaGFubmVscyA9IFtdO1xuICAgIGNoYW5uZWxOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIGNoYW5uZWxzLnB1c2goe1xuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIG1lc3NhZ2VzOiBbXSxcbiAgICAgICAgICAgIHJldHJpZXZlTWVzc2FnZXNPZmZzZXQ6IDAsXG4gICAgICAgICAgICBoYXNNb3JlTWVzc2FnZXM6IHRydWUsXG4gICAgICAgICAgICBmZXRjaGluZ05ld01lc3NhZ2VzOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBleHBvcnRzLkFERF9DSEFOTkVMUyxcbiAgICAgICAgZGF0YTogeyBjaGFubmVsczogY2hhbm5lbHMgfVxuICAgIH07XG59O1xuZXhwb3J0cy5pbmNyZW1lbnRDaGFubmVsUmV0cmlldmVNZXNzYWdlc09mZnNldCA9IGZ1bmN0aW9uIChjaGFubmVsLCBuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXhwb3J0cy5JTkNSRU1FTlRfQ0hBTk5FTF9SRVRSSUVWRV9NRVNTQUdFU19PRkZTRVQsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGNoYW5uZWw6IGNoYW5uZWwsXG4gICAgICAgICAgICBpbmNyZW1lbnQ6IG5cbiAgICAgICAgfVxuICAgIH07XG59O1xuZXhwb3J0cy5zZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcyA9IGZ1bmN0aW9uIChjaGFubmVsLCBpc0ZldGNoaW5nKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXhwb3J0cy5TRVRfQ0hBTk5FTF9GRVRDSElOR19ORVdfTUVTU0FHRVMsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGNoYW5uZWxOYW1lOiBjaGFubmVsLFxuICAgICAgICAgICAgaXNGZXRjaGluZzogaXNGZXRjaGluZ1xuICAgICAgICB9XG4gICAgfTtcbn07XG5leHBvcnRzLnNldENoYW5uZWxIYXNNb3JlTWVzc2FnZXMgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWUsIGhhc01vcmUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBleHBvcnRzLlNFVF9DSEFOTkVMX0hBU19NT1JFX01FU1NBR0VTLFxuICAgICAgICBkYXRhOiB7IGNoYW5uZWxOYW1lOiBjaGFubmVsTmFtZSwgaGFzTW9yZTogaGFzTW9yZSB9XG4gICAgfTtcbn07XG5leHBvcnRzLmFkZFJlY2VpdmVkQ2hhbm5lbE1lc3NhZ2UgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWUsIG1lc3NhZ2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBleHBvcnRzLkFERF9SRUNFSVZFRF9DSEFOTkVMX01FU1NBR0UsXG4gICAgICAgIGRhdGE6IHsgbWVzc2FnZTogbWVzc2FnZSwgY2hhbm5lbE5hbWU6IGNoYW5uZWxOYW1lIH1cbiAgICB9O1xufTtcbmV4cG9ydHMuYWRkUmV0cmlldmVkQ2hhbm5lbE1lc3NhZ2VzID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lLCBtZXNzYWdlcykge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV4cG9ydHMuQUREX1JFVFJJRVZFRF9DSEFOTkVMX01FU1NBR0VTLFxuICAgICAgICBkYXRhOiB7IGNoYW5uZWxOYW1lOiBjaGFubmVsTmFtZSwgbWVzc2FnZXM6IG1lc3NhZ2VzIH1cbiAgICB9O1xufTtcbmV4cG9ydHMuY2xlYXJDaGFubmVsc0RhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXhwb3J0cy5DTEVBUl9DSEFOTkVMU19EQVRBXG4gICAgfTtcbn07XG5leHBvcnRzLmZldGNoQ2hhbm5lbHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkaXNwYXRjaCkge1xuICAgICAgICByZXR1cm4gYXhpb3NfMVtcImRlZmF1bHRcIl0uZ2V0KCcvYXBpL3YxL2NoYW5uZWxzJykudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICB2YXIgY2hhbm5lbHMgPSByZXMuZGF0YS5jaGFubmVscy5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYy5uYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2goZXhwb3J0cy5hZGRDaGFubmVscyhjaGFubmVscykpO1xuICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gZmV0Y2ggdGhlIGNoYW5uZWxzJykpO1xuICAgICAgICB9KTtcbiAgICB9O1xufTtcbmV4cG9ydHMucmV0cmlldmVDaGFubmVsTWVzc2FnZXMgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2hhbm5lbDtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgY2hhbm5lbCA9IGdldFN0YXRlKCkuY2hhbm5lbHMuZmluZChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIHJldHVybiBjLm5hbWUgPT09IGNoYW5uZWxOYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWNoYW5uZWwgfHwgY2hhbm5lbC5mZXRjaGluZ05ld01lc3NhZ2VzIHx8ICFjaGFubmVsLmhhc01vcmVNZXNzYWdlcykge1xuICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBmZXRjaCBtZXNzYWdlcycpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIsIFByb21pc2UucmVzb2x2ZSgnUmV0cmlldmUgQ2hhbm5lbCBNZXNzYWdlcyBkaXNwYXRjaGVkIHdpdGggaW5jb3JyZWN0IGNoYW5uZWwgbmFtZSBvciB3aGlsZSBhbHJlYWR5IGZldGNoaW5nIG1lc3NhZ2VzJyldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGlzcGF0Y2goZXhwb3J0cy5zZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcyhjaGFubmVsLm5hbWUsIHRydWUpKTtcbiAgICAgICAgICAgIHJldHVybiBbMiwgYXhpb3NfMVtcImRlZmF1bHRcIl0uZ2V0KCcvYXBpL3YxL21lc3NhZ2VzLycgKyBjaGFubmVsLm5hbWUgKyAnLycgKyBjaGFubmVsLnJldHJpZXZlTWVzc2FnZXNPZmZzZXQpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEubWVzc2FnZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChleHBvcnRzLnNldENoYW5uZWxIYXNNb3JlTWVzc2FnZXMoY2hhbm5lbC5uYW1lLCBmYWxzZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChleHBvcnRzLmluY3JlbWVudENoYW5uZWxSZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0KGNoYW5uZWxOYW1lLCByZXMuZGF0YS5tZXNzYWdlcy5sZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goZXhwb3J0cy5hZGRSZXRyaWV2ZWRDaGFubmVsTWVzc2FnZXMoY2hhbm5lbC5uYW1lLCByZXMuZGF0YS5tZXNzYWdlcykpO1xuICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gZmV0Y2ggbWVzc2FnZXMnKSk7XG4gICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkaXNwYXRjaChleHBvcnRzLnNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzKGNoYW5uZWwubmFtZSwgZmFsc2UpKTtcbiAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgIH0pO1xuICAgIH0pOyB9O1xufTtcbmV4cG9ydHMuZGVsZXRlQ2hhbm5lbCA9IGZ1bmN0aW9uIChjaGFubmVsTmFtZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZGlzcGF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIGF4aW9zXzFbXCJkZWZhdWx0XCJdLmdldCgnL2FwaS92MS9jaGFubmVsL2RlbGV0ZS8nICsgY2hhbm5lbE5hbWUpLlxuICAgICAgICAgICAgdGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEluZm8oJ0NoYW5uZWwgZGVsZXRlZCcpKTtcbiAgICAgICAgICAgIHJldHVybiBkaXNwYXRjaChleHBvcnRzLmZldGNoQ2hhbm5lbHMoKSk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG5leHBvcnRzLmFkZENoYW5uZWwgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRpc3BhdGNoKSB7XG4gICAgICAgIHJldHVybiBheGlvc18xW1wiZGVmYXVsdFwiXS5wb3N0KCcvYXBpL3YxL2NoYW5uZWwvY3JlYXRlJywge1xuICAgICAgICAgICAgY2hhbm5lbE5hbWU6IGNoYW5uZWxOYW1lXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRJbmZvKCdDaGFubmVsIGNyZWF0ZWQnKSk7XG4gICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2goZXhwb3J0cy5mZXRjaENoYW5uZWxzKCkpO1xuICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKGVyci5yZXNwb25zZS5kYXRhLmVycm9yKSk7XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWTJoaGJtNWxiSE5CWTNScGIyNXpMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dkxpNHZjM0pqTDNkbFlpOWhZM1JwYjI1ekwyTm9ZVzV1Wld4elFXTjBhVzl1Y3k1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN1FVRkJRU3hwUWtFNFNVRTdPMEZCTjBsQkxDdENRVUY1UkR0QlFVVjZSQ3dyUkVGQmVVUTdRVUZGTlVNc1VVRkJRU3haUVVGWkxFZEJRVWNzWTBGQll5eERRVUZETzBGQlF6bENMRkZCUVVFc2FVTkJRV2xETEVkQlFVY3NiVU5CUVcxRExFTkJRVU03UVVGRGVFVXNVVUZCUVN3MlFrRkJOa0lzUjBGQlJ5dzRRa0ZCT0VJc1EwRkJRenRCUVVNdlJDeFJRVUZCTERSQ1FVRTBRaXhIUVVGSExEaENRVUU0UWl4RFFVRkRPMEZCUXpsRUxGRkJRVUVzT0VKQlFUaENMRWRCUVVjc1owTkJRV2RETEVOQlFVTTdRVUZEYkVVc1VVRkJRU3d3UTBGQk1FTXNSMEZCUnl3MFEwRkJORU1zUTBGQlF6dEJRVU14Uml4UlFVRkJMSGxDUVVGNVFpeEhRVUZITERKQ1FVRXlRaXhEUVVGRE8wRkJRM2hFTEZGQlFVRXNiVUpCUVcxQ0xFZEJRVWNzY1VKQlFYRkNMRU5CUVVNN1FVRkZOVU1zVVVGQlFTeFhRVUZYTEVkQlFVY3NWVUZCUXl4WlFVRnpRanRKUVVNNVF5eEpRVUZKTEZGQlFWRXNSMEZCVlN4RlFVRkZMRU5CUVVNN1NVRkRla0lzV1VGQldTeERRVUZETEU5QlFVOHNRMEZCUXl4VlFVRkRMRWxCUVZrN1VVRkRPVUlzVVVGQlVTeERRVUZETEVsQlFVa3NRMEZCUXp0WlFVTldMRWxCUVVrc1JVRkJSU3hKUVVGSk8xbEJRMVlzVVVGQlVTeEZRVUZGTEVWQlFVVTdXVUZEV2l4elFrRkJjMElzUlVGQlJTeERRVUZETzFsQlEzcENMR1ZCUVdVc1JVRkJSU3hKUVVGSk8xbEJRM0pDTEcxQ1FVRnRRaXhGUVVGRkxFdEJRVXM3VTBGRE4wSXNRMEZCUXl4RFFVRkRPMGxCUTFBc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFNDeFBRVUZQTzFGQlEwZ3NTVUZCU1N4RlFVRkZMRzlDUVVGWk8xRkJRMnhDTEVsQlFVa3NSVUZCUlN4RlFVRkZMRkZCUVZFc1JVRkJSU3hSUVVGUkxFVkJRVVU3UzBGREwwSXNRMEZCUXp0QlFVTk9MRU5CUVVNc1EwRkJRVHRCUVVWWkxGRkJRVUVzYzBOQlFYTkRMRWRCUVVjc1ZVRkJReXhQUVVGbExFVkJRVVVzUTBGQlV6dEpRVU0zUlN4UFFVRlBPMUZCUTBnc1NVRkJTU3hGUVVGRkxHdEVRVUV3UXp0UlFVTm9SQ3hKUVVGSkxFVkJRVVU3V1VGRFJpeFBRVUZQTEVWQlFVVXNUMEZCVHp0WlFVTm9RaXhUUVVGVExFVkJRVVVzUTBGQlF6dFRRVU5tTzB0QlEwb3NRMEZCUXp0QlFVTk9MRU5CUVVNc1EwRkJRVHRCUVVWWkxGRkJRVUVzTmtKQlFUWkNMRWRCUVVjc1ZVRkJReXhQUVVGbExFVkJRVVVzVlVGQmJVSTdTVUZET1VVc1QwRkJUenRSUVVOSUxFbEJRVWtzUlVGQlJTeDVRMEZCYVVNN1VVRkRka01zU1VGQlNTeEZRVUZGTzFsQlEwWXNWMEZCVnl4RlFVRkZMRTlCUVU4N1dVRkRjRUlzVlVGQlZTeEZRVUZGTEZWQlFWVTdVMEZEZWtJN1MwRkRTaXhEUVVGRE8wRkJRMDRzUTBGQlF5eERRVUZCTzBGQlJWa3NVVUZCUVN4NVFrRkJlVUlzUjBGQlJ5eFZRVUZETEZkQlFXMUNMRVZCUVVVc1QwRkJaMEk3U1VGRE0wVXNUMEZCVHp0UlFVTklMRWxCUVVrc1JVRkJSU3h4UTBGQk5rSTdVVUZEYmtNc1NVRkJTU3hGUVVGRkxFVkJRVVVzVjBGQlZ5eEZRVUZGTEZkQlFWY3NSVUZCUlN4UFFVRlBMRVZCUVVVc1QwRkJUeXhGUVVGRk8wdEJRM1pFTEVOQlFVTTdRVUZEVGl4RFFVRkRMRU5CUVVFN1FVRkZXU3hSUVVGQkxIbENRVUY1UWl4SFFVRkhMRlZCUVVNc1YwRkJiVUlzUlVGQlJTeFBRVUZuUWp0SlFVTXpSU3hQUVVGUE8xRkJRMGdzU1VGQlNTeEZRVUZGTEc5RFFVRTBRanRSUVVOc1F5eEpRVUZKTEVWQlFVVXNSVUZCUlN4UFFVRlBMRVZCUVVVc1QwRkJUeXhGUVVGRkxGZEJRVmNzUlVGQlJTeFhRVUZYTEVWQlFVVTdTMEZEZGtRc1EwRkJRenRCUVVOT0xFTkJRVU1zUTBGQlFUdEJRVVZaTEZGQlFVRXNNa0pCUVRKQ0xFZEJRVWNzVlVGQlF5eFhRVUZ0UWl4RlFVRkZMRkZCUVcxQ08wbEJRMmhHTEU5QlFVODdVVUZEU0N4SlFVRkpMRVZCUVVVc2MwTkJRVGhDTzFGQlEzQkRMRWxCUVVrc1JVRkJSU3hGUVVGRExGZEJRVmNzUlVGQlJTeFhRVUZYTEVWQlFVVXNVVUZCVVN4RlFVRkZMRkZCUVZFc1JVRkJRenRMUVVOMlJDeERRVUZETzBGQlEwNHNRMEZCUXl4RFFVRkJPMEZCUlZrc1VVRkJRU3hwUWtGQmFVSXNSMEZCUnp0SlFVTTNRaXhQUVVGUE8xRkJRMGdzU1VGQlNTeEZRVUZGTERKQ1FVRnRRanRMUVVNMVFpeERRVUZCTzBGQlEwd3NRMEZCUXl4RFFVRkJPMEZCU1Zrc1VVRkJRU3hoUVVGaExFZEJRVWM3U1VGRGVrSXNUMEZCVHl4VlFVRkRMRkZCUVdFN1VVRkRha0lzVDBGQlR5eHJRa0ZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhyUWtGQmEwSXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGRExFZEJRV3RDTzFsQlEzcEVMRWxCUVVrc1VVRkJVU3hIUVVGSExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRMRWRCUVVjc1EwRkJSU3hWUVVGRExFTkJRVGhDTzJkQ1FVTnFSU3hQUVVGUExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTTdXVUZEYkVJc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRFNDeFBRVUZQTEZGQlFWRXNRMEZCUXl4dFFrRkJWeXhEUVVGRExGRkJRVkVzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZETTBNc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlN5eERRVUZCTEVOQlFVTXNWVUZCUXl4SFFVRmxPMWxCUTNKQ0xFOUJRVThzVVVGQlVTeERRVUZETEN0Q1FVRlJMRU5CUVVNc2VVUkJRWGxFTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTNwR0xFTkJRVU1zUTBGQlF5eERRVUZETzBsQlExQXNRMEZCUXl4RFFVRkJPMEZCUTB3c1EwRkJReXhEUVVGQk8wRkJSVmtzVVVGQlFTeDFRa0ZCZFVJc1IwRkJSeXhWUVVGRExGZEJRVzFDTzBsQlEzWkVMRTlCUVU4c1ZVRkJUeXhSUVVGaExFVkJRVVVzVVVGQllUczdPMWxCUTJ4RExFOUJRVThzUjBGQldTeFJRVUZSTEVWQlFVVXNRMEZCUXl4UlFVRlJMRU5CUVVNc1NVRkJTU3hEUVVGRkxGVkJRVU1zUTBGQlZUdG5Ra0ZEZUVRc1QwRkJUeXhEUVVGRExFTkJRVU1zU1VGQlNTeExRVUZMTEZkQlFWY3NRMEZCUXp0WlFVTnNReXhEUVVGRExFTkJRVU1zUTBGQlFUdFpRVU5HTEVsQlFVa3NRMEZCUXl4UFFVRlBMRWxCUVVrc1QwRkJUeXhEUVVGRExHMUNRVUZ0UWl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExHVkJRV1VzUlVGQlJUdG5Ra0ZEY2tVc1VVRkJVU3hEUVVGRExDdENRVUZSTEVOQlFVTXNjVVJCUVhGRUxFTkJRVU1zUTBGQlF5eERRVUZETzJkQ1FVTXhSU3hYUVVGUExFOUJRVThzUTBGQlF5eFBRVUZQTEVOQlFVTXNjVWRCUVhGSExFTkJRVU1zUlVGQlF6dGhRVU5xU1R0WlFVTkVMRkZCUVZFc1EwRkJReXh4UTBGQk5rSXNRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZETlVRc1YwRkJUeXhyUWtGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4dFFrRkJiVUlzUjBGQlJ5eFBRVUZQTEVOQlFVTXNTVUZCU1N4SFFVRkhMRWRCUVVjc1IwRkJSeXhQUVVGUExFTkJRVU1zYzBKQlFYTkNMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlF5eEhRVUZyUWp0dlFrRkRhRWdzU1VGQlNTeEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRkZCUVZFc1EwRkJReXhOUVVGTkxFdEJRVXNzUTBGQlF5eEZRVUZGTzNkQ1FVTm9ReXhSUVVGUkxFTkJRVU1zYVVOQlFYbENMRU5CUVVNc1QwRkJUeXhEUVVGRExFbEJRVWtzUlVGQlJTeExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRPM2RDUVVONlJDeFBRVUZQTEVkQlFVY3NRMEZCUXp0eFFrRkRaRHR2UWtGRFJDeFJRVUZSTEVOQlFVTXNPRU5CUVhORExFTkJRVU1zVjBGQlZ5eEZRVUZGTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZETEVOQlFVTTdiMEpCUTNoR0xGRkJRVkVzUTBGQlF5eHRRMEZCTWtJc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeEZRVUZGTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU1zUTBGQlFUdG5Ra0ZETVVVc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlN5eERRVUZCTEVOQlFVTXNWVUZCUXl4SFFVRmxPMjlDUVVOeVFpeFJRVUZSTEVOQlFVTXNLMEpCUVZFc1EwRkJReXh4UkVGQmNVUXNRMEZCUXl4RFFVRkRMRU5CUVVNN1owSkJRemxGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJRenR2UWtGRFNpeFBRVUZQTEZGQlFWRXNRMEZCUXl4eFEwRkJOa0lzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RlFVRkZMRXRCUVVzc1EwRkJReXhEUVVGRExFTkJRVU03WjBKQlEzaEZMRU5CUVVNc1EwRkJReXhGUVVGRE96dFRRVU5PTEVOQlFVRTdRVUZEVEN4RFFVRkRMRU5CUVVFN1FVRkZXU3hSUVVGQkxHRkJRV0VzUjBGQlJ5eFZRVUZETEZkQlFXMUNPMGxCUXpkRExFOUJRVThzVlVGQlF5eFJRVUZoTzFGQlEycENMRTlCUVU4c2EwSkJRVXNzUTBGQlF5eEhRVUZITEVOQlFVTXNlVUpCUVhsQ0xFZEJRVWNzVjBGQlZ5eERRVUZETzFsQlEzSkVMRWxCUVVrc1EwRkJReXhWUVVGRExFZEJRV3RDTzFsQlEzQkNMRkZCUVZFc1EwRkJReXc0UWtGQlR5eERRVUZETEdsQ1FVRnBRaXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU55UXl4UFFVRlBMRkZCUVZFc1EwRkJReXh4UWtGQllTeEZRVUZGTEVOQlFVTXNRMEZCUXp0UlFVTnlReXhEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZMTEVOQlFVRXNRMEZCUXl4VlFVRkRMRWRCUVdVN1dVRkRja0lzVDBGQlR5eFJRVUZSTEVOQlFVTXNLMEpCUVZFc1EwRkJReXhIUVVGSExFTkJRVU1zVVVGQlVTeERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRM1pFTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTFnc1EwRkJReXhEUVVGRE8wRkJRMDRzUTBGQlF5eERRVUZCTzBGQlJWa3NVVUZCUVN4VlFVRlZMRWRCUVVjc1ZVRkJReXhYUVVGdFFqdEpRVU14UXl4UFFVRlBMRlZCUVVNc1VVRkJZVHRSUVVOcVFpeFBRVUZQTEd0Q1FVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExIZENRVUYzUWl4RlFVRkZPMWxCUTNoRExGZEJRVmNzUlVGQlJTeFhRVUZYTzFOQlF6TkNMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlF5eEhRVUZyUWp0WlFVTjJRaXhSUVVGUkxFTkJRVU1zT0VKQlFVOHNRMEZCUXl4cFFrRkJhVUlzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEY2tNc1QwRkJUeXhSUVVGUkxFTkJRVU1zY1VKQlFXRXNSVUZCUlN4RFFVRkRMRU5CUVVNN1VVRkRja01zUTBGQlF5eERRVUZETEVOQlFVTXNUMEZCU3l4RFFVRkJMRU5CUVVNc1ZVRkJReXhIUVVGbE8xbEJRM0pDTEU5QlFVOHNVVUZCVVN4RFFVRkRMQ3RDUVVGUkxFTkJRVU1zUjBGQlJ5eERRVUZETEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU4yUkN4RFFVRkRMRU5CUVVNc1EwRkJRVHRKUVVOT0xFTkJRVU1zUTBGQlF6dEJRVU5PTEVOQlFVTXNRMEZCUVNKOSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBheGlvc18xID0gcmVxdWlyZShcImF4aW9zXCIpO1xudmFyIG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEgPSByZXF1aXJlKFwiLi9ub3RpZmljYXRpb25zQWN0aW9uc1wiKTtcbmV4cG9ydHMuVVBEQVRFX0NIQVRfVVNFUlMgPSAnVVBEQVRFX0NIQVRfVVNFUlMnO1xuZXhwb3J0cy5BRERfQ0hBVF9VU0VSID0gJ0FERF9VU0VSJztcbmV4cG9ydHMuUkVNT1ZFX0NIQVRfVVNFUiA9ICdSRU1PVkVfVVNFUic7XG5leHBvcnRzLnVwZGF0ZVVzZXJzID0gZnVuY3Rpb24gKHVzZXJzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXhwb3J0cy5VUERBVEVfQ0hBVF9VU0VSUyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgdXNlcnM6IHVzZXJzXG4gICAgICAgIH1cbiAgICB9O1xufTtcbmV4cG9ydHMuYWRkVXNlciA9IGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXhwb3J0cy5BRERfQ0hBVF9VU0VSLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICB1c2VyOiB1c2VyXG4gICAgICAgIH1cbiAgICB9O1xufTtcbmV4cG9ydHMucmVtb3ZlVXNlciA9IGZ1bmN0aW9uIChlbWFpbCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV4cG9ydHMuUkVNT1ZFX0NIQVRfVVNFUixcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgZW1haWw6IGVtYWlsXG4gICAgICAgIH1cbiAgICB9O1xufTtcbmV4cG9ydHMuZmV0Y2hBbGxVc2VycyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRpc3BhdGNoKSB7XG4gICAgICAgIHJldHVybiBheGlvc18xW1wiZGVmYXVsdFwiXS5nZXQoJy9hcGkvdjEvdXNlcnMnKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIHZhciB1c2VycyA9IHt9O1xuICAgICAgICAgICAgcmVzLmRhdGEudXNlcnMuZm9yRWFjaChmdW5jdGlvbiAodSkge1xuICAgICAgICAgICAgICAgIHVzZXJzW3UuZW1haWxdID0ge1xuICAgICAgICAgICAgICAgICAgICByb2xlOiB1LnJvbGUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHUubmFtZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRpc3BhdGNoKGV4cG9ydHMudXBkYXRlVXNlcnModXNlcnMpKTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignRmV0Y2hpbmcgYWxsIHVzZXJzIGZhaWxlZCcpKTtcbiAgICAgICAgICAgIHJldHVybiBlcnI7XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuZXhwb3J0cy5jcmVhdGVOZXdVc2VyID0gZnVuY3Rpb24gKHVzZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRpc3BhdGNoKSB7XG4gICAgICAgIHJldHVybiBheGlvc18xW1wiZGVmYXVsdFwiXS5nZXQoJy9hcGkvdjEvJyk7XG4gICAgfTtcbn07XG5leHBvcnRzLmVkaXRVc2VyID0gZnVuY3Rpb24gKGVtYWlsLCB1c2VyKSB7XG59O1xuZXhwb3J0cy5kZWxldGVVc2VyID0gZnVuY3Rpb24gKGVtYWlsKSB7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWTJoaGRGVnpaWEp6UVdOMGFXOXVjeTVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUx5NHVMM055WXk5M1pXSXZZV04wYVc5dWN5OWphR0YwVlhObGNuTkJZM1JwYjI1ekxuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCUVVFc0swSkJRWGxFTzBGQlNYcEVMQ3RFUVVGclJEdEJRVVZ5UXl4UlFVRkJMR2xDUVVGcFFpeEhRVUZITEcxQ1FVRnRRaXhEUVVGRE8wRkJRM2hETEZGQlFVRXNZVUZCWVN4SFFVRkhMRlZCUVZVc1EwRkJRenRCUVVNelFpeFJRVUZCTEdkQ1FVRm5RaXhIUVVGSExHRkJRV0VzUTBGQlF6dEJRVVZxUXl4UlFVRkJMRmRCUVZjc1IwRkJSeXhWUVVGVExFdEJRVms3U1VGRE5VTXNUMEZCVHp0UlFVTklMRWxCUVVrc1JVRkJSU3g1UWtGQmFVSTdVVUZEZGtJc1NVRkJTU3hGUVVGRk8xbEJRMFlzUzBGQlN5eEZRVUZGTEV0QlFVczdVMEZEWmp0TFFVTktMRU5CUVVFN1FVRkRUQ3hEUVVGRExFTkJRVUU3UVVGRldTeFJRVUZCTEU5QlFVOHNSMEZCUnl4VlFVRlRMRWxCUVdNN1NVRkRNVU1zVDBGQlR6dFJRVU5JTEVsQlFVa3NSVUZCUlN4eFFrRkJZVHRSUVVOdVFpeEpRVUZKTEVWQlFVVTdXVUZEUml4SlFVRkpMRVZCUVVVc1NVRkJTVHRUUVVOaU8wdEJRMG9zUTBGQlFUdEJRVU5NTEVOQlFVTXNRMEZCUVR0QlFVVlpMRkZCUVVFc1ZVRkJWU3hIUVVGSExGVkJRVk1zUzBGQllUdEpRVU0xUXl4UFFVRlBPMUZCUTBnc1NVRkJTU3hGUVVGRkxIZENRVUZuUWp0UlFVTjBRaXhKUVVGSkxFVkJRVVU3V1VGRFJpeExRVUZMTEVWQlFVVXNTMEZCU3p0VFFVTm1PMHRCUTBvc1EwRkJRVHRCUVVOTUxFTkJRVU1zUTBGQlFUdEJRVWRaTEZGQlFVRXNZVUZCWVN4SFFVRkhPMGxCUTNwQ0xFOUJRVThzVlVGQlF5eFJRVUZyUWp0UlFVTjBRaXhQUVVGUExHdENRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRMR1ZCUVdVc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZETEVkQlFXdENPMWxCUTNSRUxFbEJRVWtzUzBGQlN5eEhRVUZWTEVWQlFVVXNRMEZCUXp0WlFVTjBRaXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4UFFVRlBMRU5CUVVNc1ZVRkJReXhEUVVGWE8yZENRVU12UWl4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRExFdEJRVXNzUTBGQlF5eEhRVUZITzI5Q1FVTmlMRWxCUVVrc1JVRkJSU3hEUVVGRExFTkJRVU1zU1VGQlNUdHZRa0ZEV2l4SlFVRkpMRVZCUVVVc1EwRkJReXhEUVVGRExFbEJRVWs3YVVKQlEyWXNRMEZCUXp0WlFVTk9MRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMGdzVVVGQlVTeERRVUZETEcxQ1FVRlhMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU0zUWl4UFFVRlBMRWRCUVVjc1EwRkJRenRSUVVObUxFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVc3NRMEZCUVN4RFFVRkRMRlZCUVVNc1IwRkJaVHRaUVVOeVFpeFJRVUZSTEVOQlFVTXNLMEpCUVZFc1EwRkJReXd5UWtGQk1rSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRhRVFzVDBGQlR5eEhRVUZITEVOQlFVTTdVVUZEWml4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOUUxFTkJRVU1zUTBGQlFUdEJRVU5NTEVOQlFVTXNRMEZCUVR0QlFVVlpMRkZCUVVFc1lVRkJZU3hIUVVGSExGVkJRVU1zU1VGQll6dEpRVU40UXl4UFFVRlBMRlZCUVVNc1VVRkJhMEk3VVVGRGRFSXNUMEZCVHl4clFrRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eFZRVUZWTEVOQlFVTXNRMEZCUVR0SlFVTm9ReXhEUVVGRExFTkJRVUU3UVVGRFRDeERRVUZETEVOQlFVRTdRVUZGV1N4UlFVRkJMRkZCUVZFc1IwRkJSeXhWUVVGRExFdEJRV0VzUlVGQlJTeEpRVUZqTzBGQlJYUkVMRU5CUVVNc1EwRkJRVHRCUVVWWkxGRkJRVUVzVlVGQlZTeEhRVUZITEZWQlFVTXNTMEZCWVR0QlFVVjRReXhEUVVGRExFTkJRVUVpZlE9PSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuQUREX0VSUk9SID0gJ0FERF9FUlJPUic7XG5leHBvcnRzLlJFTU9WRV9FUlJPUiA9ICdSRU1PVkVfRVJST1InO1xuZXhwb3J0cy5DTEVBUl9FUlJPUlMgPSAnQ0xFQVJfRVJST1JTJztcbmV4cG9ydHMuQUREX0lORk8gPSAnQUREX0lORk8nO1xuZXhwb3J0cy5SRU1PVkVfSU5GTyA9ICdSRU1PVkVfSU5GTyc7XG5leHBvcnRzLkNMRUFSX0lORk9TID0gJ0NMRUFSX0lORk9TJztcbmV4cG9ydHMuYWRkRXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBleHBvcnRzLkFERF9FUlJPUixcbiAgICAgICAgZGF0YTogZXJyb3JcbiAgICB9O1xufTtcbmV4cG9ydHMucmVtb3ZlRXJyb3IgPSBmdW5jdGlvbiAoaSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV4cG9ydHMuUkVNT1ZFX0VSUk9SLFxuICAgICAgICBkYXRhOiBpXG4gICAgfTtcbn07XG5leHBvcnRzLmNsZWFyRXJyb3JzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7IHR5cGU6IGV4cG9ydHMuQ0xFQVJfRVJST1JTIH07XG59O1xuZXhwb3J0cy5hZGRJbmZvID0gZnVuY3Rpb24gKGluZm8pIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBleHBvcnRzLkFERF9JTkZPLFxuICAgICAgICBkYXRhOiBpbmZvXG4gICAgfTtcbn07XG5leHBvcnRzLnJlbW92ZUluZm8gPSBmdW5jdGlvbiAoaSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV4cG9ydHMuUkVNT1ZFX0lORk8sXG4gICAgICAgIGRhdGE6IGlcbiAgICB9O1xufTtcbmV4cG9ydHMuY2xlYXJJbmZvcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBleHBvcnRzLkNMRUFSX0lORk9TXG4gICAgfTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2libTkwYVdacFkyRjBhVzl1YzBGamRHbHZibk11YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk4dUxpOHVMaTl6Y21NdmQyVmlMMkZqZEdsdmJuTXZibTkwYVdacFkyRjBhVzl1YzBGamRHbHZibk11ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRkJZU3hSUVVGQkxGTkJRVk1zUjBGQlJ5eFhRVUZYTEVOQlFVTTdRVUZEZUVJc1VVRkJRU3haUVVGWkxFZEJRVWNzWTBGQll5eERRVUZETzBGQlF6bENMRkZCUVVFc1dVRkJXU3hIUVVGSExHTkJRV01zUTBGQlF6dEJRVU01UWl4UlFVRkJMRkZCUVZFc1IwRkJSeXhWUVVGVkxFTkJRVU03UVVGRGRFSXNVVUZCUVN4WFFVRlhMRWRCUVVjc1lVRkJZU3hEUVVGRE8wRkJRelZDTEZGQlFVRXNWMEZCVnl4SFFVRkhMR0ZCUVdFc1EwRkJRenRCUVVVMVFpeFJRVUZCTEZGQlFWRXNSMEZCUnl4VlFVRkRMRXRCUVdFN1NVRkRiRU1zVDBGQlR6dFJRVU5JTEVsQlFVa3NSVUZCUlN4cFFrRkJVenRSUVVObUxFbEJRVWtzUlVGQlJTeExRVUZMTzB0QlEyUXNRMEZCUXp0QlFVTk9MRU5CUVVNc1EwRkJRVHRCUVVWWkxGRkJRVUVzVjBGQlZ5eEhRVUZITEZWQlFVTXNRMEZCVXp0SlFVTnFReXhQUVVGUE8xRkJRMGdzU1VGQlNTeEZRVUZGTEc5Q1FVRlpPMUZCUTJ4Q0xFbEJRVWtzUlVGQlJTeERRVUZETzB0QlExWXNRMEZCUXp0QlFVTk9MRU5CUVVNc1EwRkJRVHRCUVVWWkxGRkJRVUVzVjBGQlZ5eEhRVUZITzBsQlEzWkNMRTlCUVU4c1JVRkJSU3hKUVVGSkxFVkJRVVVzYjBKQlFWa3NSVUZCUlN4RFFVRkRPMEZCUTJ4RExFTkJRVU1zUTBGQlFUdEJRVVZaTEZGQlFVRXNUMEZCVHl4SFFVRkhMRlZCUVVNc1NVRkJXVHRKUVVOb1F5eFBRVUZQTzFGQlEwZ3NTVUZCU1N4RlFVRkZMR2RDUVVGUk8xRkJRMlFzU1VGQlNTeEZRVUZGTEVsQlFVazdTMEZEWWl4RFFVRkRPMEZCUTA0c1EwRkJReXhEUVVGQk8wRkJSVmtzVVVGQlFTeFZRVUZWTEVkQlFVY3NWVUZCUXl4RFFVRlRPMGxCUTJoRExFOUJRVTg3VVVGRFNDeEpRVUZKTEVWQlFVVXNiVUpCUVZjN1VVRkRha0lzU1VGQlNTeEZRVUZGTEVOQlFVTTdTMEZEVml4RFFVRkRPMEZCUTA0c1EwRkJReXhEUVVGQk8wRkJSVmtzVVVGQlFTeFZRVUZWTEVkQlFVYzdTVUZEZEVJc1QwRkJUenRSUVVOSUxFbEJRVWtzUlVGQlJTeHRRa0ZCVnp0TFFVTndRaXhEUVVGRE8wRkJRMDRzUTBGQlF5eERRVUZCSW4wPSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuVE9HR0xFX1NJREVCQVJfT1BFTiA9ICdUT0dHTEVfU0lERUJBUl9PUEVOJztcbmV4cG9ydHMudG9nZ2xlU2lkZWJhck9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXhwb3J0cy5UT0dHTEVfU0lERUJBUl9PUEVOXG4gICAgfTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2ljMmxrWldKaGNrRmpkR2x2Ym5NdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOHVMaTh1TGk5emNtTXZkMlZpTDJGamRHbHZibk12YzJsa1pXSmhja0ZqZEdsdmJuTXVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanM3UVVGQllTeFJRVUZCTEcxQ1FVRnRRaXhIUVVGSExIRkNRVUZ4UWl4RFFVRkRPMEZCUlRWRExGRkJRVUVzYVVKQlFXbENMRWRCUVVjN1NVRkROMElzVDBGQlR6dFJRVU5JTEVsQlFVa3NSVUZCUlN3eVFrRkJiVUk3UzBGRE5VSXNRMEZCUVR0QlFVTk1MRU5CUVVNc1EwRkJRU0o5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIGlvID0gcmVxdWlyZShcInNvY2tldC5pby1jbGllbnRcIik7XG5leHBvcnRzLklOSVRfV0VCU09DS0VUID0gJ0lOSVRfV0VCU09DS0VUJztcbmV4cG9ydHMuU0VUX1NPQ0tFVF9DT05ORUNURUQgPSAnU0VUX1NPQ0tFVF9DT05ORUNURUQnO1xuZXhwb3J0cy5TRVRfU09DS0VUX0NPTk5FQ1RFRF9VU0VSUyA9ICdTRVRfU09DS0VUX0NPTk5FQ1RFRF9VU0VSUyc7XG5leHBvcnRzLmluaXRXZWJzb2NrZXQgPSBmdW5jdGlvbiAoaW8pIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBleHBvcnRzLklOSVRfV0VCU09DS0VULFxuICAgICAgICBkYXRhOiB7IGlvOiBpbyB9XG4gICAgfTtcbn07XG5leHBvcnRzLnNldFNvY2tldENvbm5lY3RlZCA9IGZ1bmN0aW9uIChjb25uZWN0ZWQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBleHBvcnRzLlNFVF9TT0NLRVRfQ09OTkVDVEVELFxuICAgICAgICBkYXRhOiB7IGNvbm5lY3RlZDogY29ubmVjdGVkIH1cbiAgICB9O1xufTtcbmV4cG9ydHMuc2V0U29ja2V0Q29ubmVjdGVkVXNlcnMgPSBmdW5jdGlvbiAodXNlckVtYWlscykge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV4cG9ydHMuU0VUX1NPQ0tFVF9DT05ORUNURURfVVNFUlMsXG4gICAgICAgIGRhdGE6IHsgdXNlckVtYWlsczogdXNlckVtYWlscyB9XG4gICAgfTtcbn07XG5leHBvcnRzLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkaXNwYXRjaCwgZ2V0U3RhdGUpIHtcbiAgICAgICAgdmFyIHNvY2tldCA9IGlvKCk7XG4gICAgICAgIHNvY2tldC5vbignY29ubmVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNvY2tldFxuICAgICAgICAgICAgICAgIC5lbWl0KCdhdXRoZW50aWNhdGUnLCB7IHRva2VuOiBnZXRTdGF0ZSgpLnVzZXIudG9rZW4gfSlcbiAgICAgICAgICAgICAgICAub24oJ2F1dGhlbnRpY2F0ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZGlzcGF0Y2goZXhwb3J0cy5zZXRTb2NrZXRDb25uZWN0ZWQodHJ1ZSkpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhdXRob3JpemVkIFsnICsgc29ja2V0LmlkICsgJ10nKTtcbiAgICAgICAgICAgICAgICBzb2NrZXQub24oJ2Nvbm5lY3RlZCB1c2VycycsIGZ1bmN0aW9uICh1c2VyRW1haWxzKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKGV4cG9ydHMuc2V0U29ja2V0Q29ubmVjdGVkVXNlcnModXNlckVtYWlscykpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oJ3VuYXV0aG9yaXplZCcsIGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChleHBvcnRzLnNldFNvY2tldENvbm5lY3RlZChmYWxzZSkpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidW5hdXRob3JpemVkOiBcIiArIEpTT04uc3RyaW5naWZ5KG1zZy5kYXRhKSk7XG4gICAgICAgICAgICAgICAgc29ja2V0Lm9mZignY29ubmVjdGVkIHVzZXMnKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnLmRhdGEudHlwZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNvY2tldC5vbignZGlzY29ubmVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRpc3BhdGNoKGV4cG9ydHMuc2V0U29ja2V0Q29ubmVjdGVkKGZhbHNlKSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRGlzY29ubmVjdGVkIGZyb20gd2Vic29ja2V0IHNlcnZlciwgYXR0ZW1wdGluZyByZWNvbm5lY3QnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkaXNwYXRjaChleHBvcnRzLmluaXRXZWJzb2NrZXQoc29ja2V0KSk7XG4gICAgfTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2ljMjlqYTJWMFFXTjBhVzl1Y3k1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUx5NHVMeTR1TDNOeVl5OTNaV0l2WVdOMGFXOXVjeTl6YjJOclpYUkJZM1JwYjI1ekxuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCUVVFc2NVTkJRWFZETzBGQlN6RkNMRkZCUVVFc1kwRkJZeXhIUVVGSExHZENRVUZuUWl4RFFVRkRPMEZCUTJ4RExGRkJRVUVzYjBKQlFXOUNMRWRCUVVjc2MwSkJRWE5DTEVOQlFVTTdRVUZET1VNc1VVRkJRU3d3UWtGQk1FSXNSMEZCUnl3MFFrRkJORUlzUTBGQlF6dEJRVVV4UkN4UlFVRkJMR0ZCUVdFc1IwRkJSeXhWUVVGRExFVkJRWGxDTzBsQlEyNUVMRTlCUVU4N1VVRkRTQ3hKUVVGSkxFVkJRVVVzYzBKQlFXTTdVVUZEY0VJc1NVRkJTU3hGUVVGRkxFVkJRVVVzUlVGQlJTeEZRVUZGTEVWQlFVVXNSVUZCUlR0TFFVTnVRaXhEUVVGRE8wRkJRMDRzUTBGQlF5eERRVUZCTzBGQlJWa3NVVUZCUVN4clFrRkJhMElzUjBGQlJ5eFZRVUZETEZOQlFXdENPMGxCUTJwRUxFOUJRVTg3VVVGRFNDeEpRVUZKTEVWQlFVVXNORUpCUVc5Q08xRkJRekZDTEVsQlFVa3NSVUZCUlN4RlFVRkZMRk5CUVZNc1JVRkJSU3hUUVVGVExFVkJRVVU3UzBGRGFrTXNRMEZCUVR0QlFVTk1MRU5CUVVNc1EwRkJRVHRCUVVWWkxGRkJRVUVzZFVKQlFYVkNMRWRCUVVjc1ZVRkJReXhWUVVGdlFqdEpRVU40UkN4UFFVRlBPMUZCUTBnc1NVRkJTU3hGUVVGRkxHdERRVUV3UWp0UlFVTm9ReXhKUVVGSkxFVkJRVVVzUlVGQlJTeFZRVUZWTEVWQlFVVXNWVUZCVlN4RlFVRkZPMHRCUTI1RExFTkJRVUU3UVVGRFRDeERRVUZETEVOQlFVRTdRVUZGV1N4UlFVRkJMRWxCUVVrc1IwRkJSenRKUVVOb1FpeFBRVUZQTEZWQlFVTXNVVUZCYTBJc1JVRkJSU3hSUVVGclFqdFJRVU14UXl4SlFVRkpMRTFCUVUwc1IwRkJNRUlzUlVGQlJTeEZRVUZGTEVOQlFVTTdVVUZEZWtNc1RVRkJUU3hEUVVGRExFVkJRVVVzUTBGQlF5eFRRVUZUTEVWQlFVVTdXVUZEYWtJc1RVRkJUVHRwUWtGRFJDeEpRVUZKTEVOQlFVTXNZMEZCWXl4RlFVRkZMRVZCUVVVc1MwRkJTeXhGUVVGRkxGRkJRVkVzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRVZCUVVVc1EwRkJRenRwUWtGRGRFUXNSVUZCUlN4RFFVRkRMR1ZCUVdVc1JVRkJSVHRuUWtGRGFrSXNVVUZCVVN4RFFVRkRMREJDUVVGclFpeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNN1owSkJRMjVETEU5QlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc1kwRkJZeXhIUVVGSExFMUJRVTBzUTBGQlF5eEZRVUZGTEVkQlFVY3NSMEZCUnl4RFFVRkRMRU5CUVVNN1owSkJRemxETEUxQlFVMHNRMEZCUXl4RlFVRkZMRU5CUVVNc2FVSkJRV2xDTEVWQlFVVXNWVUZCUXl4VlFVRnZRanR2UWtGRE9VTXNVVUZCVVN4RFFVRkRMQ3RDUVVGMVFpeERRVUZETEZWQlFWVXNRMEZCUXl4RFFVRkRMRU5CUVVNN1owSkJRMnhFTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTFBc1EwRkJReXhEUVVGRE8ybENRVU5FTEVWQlFVVXNRMEZCUXl4alFVRmpMRVZCUVVVc1ZVRkJWU3hIUVVGUk8yZENRVU5zUXl4UlFVRlJMRU5CUVVNc01FSkJRV3RDTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJRenRuUWtGRGNFTXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhuUWtGQlowSXNSMEZCUnl4SlFVRkpMRU5CUVVNc1UwRkJVeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRPMmRDUVVONlJDeE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMR2RDUVVGblFpeERRVUZETEVOQlFVTTdaMEpCUXpkQ0xFMUJRVTBzU1VGQlNTeExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFpRVU51UXl4RFFVRkRMRU5CUVVNc1EwRkJRVHRSUVVOV0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NUVUZCVFN4RFFVRkRMRVZCUVVVc1EwRkJReXhaUVVGWkxFVkJRVVU3V1VGRGNFSXNVVUZCVVN4RFFVRkRMREJDUVVGclFpeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRjRU1zVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl3d1JFRkJNRVFzUTBGQlF5eERRVUZETzFGQlF6VkZMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJSVWdzVDBGQlR5eFJRVUZSTEVOQlFVTXNjVUpCUVdFc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF5eERRVUZETzBsQlF6TkRMRU5CUVVNc1EwRkJRVHRCUVVOTUxFTkJRVU1zUTBGQlFTSjkiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgYXhpb3NfMSA9IHJlcXVpcmUoXCJheGlvc1wiKTtcbnZhciBjaGFubmVsc0FjdGlvbnNfMSA9IHJlcXVpcmUoXCIuL2NoYW5uZWxzQWN0aW9uc1wiKTtcbnZhciBub3RpZmljYXRpb25zQWN0aW9uc18xID0gcmVxdWlyZShcIi4vbm90aWZpY2F0aW9uc0FjdGlvbnNcIik7XG5leHBvcnRzLlNFVF9BVVRIT1JJWkVEID0gJ1NFVF9BVVRIT1JJWkVEJztcbmV4cG9ydHMuU0VUX1VTRVIgPSAnU0VUX1VTRVInO1xuZXhwb3J0cy5MT0dPVVRfVVNFUiA9ICdMT0dPVVRfVVNFUic7XG5leHBvcnRzLlNFVF9KV1QgPSAnU0VUX0pXVCc7XG5leHBvcnRzLnNldEF1dGhvcml6ZWQgPSBmdW5jdGlvbiAoYXV0aG9yaXplZCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV4cG9ydHMuU0VUX0FVVEhPUklaRUQsXG4gICAgICAgIGRhdGE6IGF1dGhvcml6ZWRcbiAgICB9O1xufTtcbmV4cG9ydHMuc2V0VXNlciA9IGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXhwb3J0cy5TRVRfVVNFUixcbiAgICAgICAgZGF0YTogdXNlclxuICAgIH07XG59O1xuZXhwb3J0cy5sb2dvdXRVc2VyID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV4cG9ydHMuTE9HT1VUX1VTRVJcbiAgICB9O1xufTtcbmV4cG9ydHMuc2V0Snd0ID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXhwb3J0cy5TRVRfSldULFxuICAgICAgICBkYXRhOiB0b2tlblxuICAgIH07XG59O1xuZXhwb3J0cy5sb2dvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkaXNwYXRjaCkge1xuICAgICAgICBkaXNwYXRjaChleHBvcnRzLmxvZ291dFVzZXIoKSk7XG4gICAgICAgIHJldHVybiBkaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5jbGVhckNoYW5uZWxzRGF0YSgpKTtcbiAgICB9O1xufTtcbmV4cG9ydHMudXBkYXRlTmFtZSA9IGZ1bmN0aW9uIChuYW1lLCBvblN1Y2Nlc3MpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRpc3BhdGNoKSB7XG4gICAgICAgIHJldHVybiBheGlvc18xW1wiZGVmYXVsdFwiXS5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL25hbWUnLCB7XG4gICAgICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRJbmZvKCdOYW1lIHVwZGF0ZWQnKSk7XG4gICAgICAgICAgICBpZiAob25TdWNjZXNzKVxuICAgICAgICAgICAgICAgIG9uU3VjY2VzcygpO1xuICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIucmVzcG9uc2UgJiYgZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTb21ldGhpbmcgd2VudCB3cm9uZyB1cGRhdGluZyB1c2VyIG5hbWUnLCBlcnIpO1xuICAgICAgICAgICAgZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIHVwZGF0ZSB5b3VyIG5hbWUuJykpO1xuICAgICAgICB9KTtcbiAgICB9O1xufTtcbmV4cG9ydHMudXBkYXRlRW1haWwgPSBmdW5jdGlvbiAoZW1haWwsIG9uU3VjY2Vzcykge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZGlzcGF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIGF4aW9zXzFbXCJkZWZhdWx0XCJdLnBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvZW1haWwnLCB7XG4gICAgICAgICAgICBlbWFpbDogZW1haWxcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEluZm8oJ0VtYWlsIHVwZGF0ZWQnKSk7XG4gICAgICAgICAgICBpZiAob25TdWNjZXNzKVxuICAgICAgICAgICAgICAgIG9uU3VjY2VzcygpO1xuICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIucmVzcG9uc2UgJiYgZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTb21ldGhpbmcgd2VudCB3cm9uZyB1cGRhdGluZyB1c2VyIGVtYWlsJywgZXJyKTtcbiAgICAgICAgICAgIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byB1cGRhdGUgeW91ciBlbWFpbC4nKSk7XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuZXhwb3J0cy51cGRhdGVQYXNzd29yZCA9IGZ1bmN0aW9uIChvbGRQYXNzLCBuZXdQYXNzLCBvblN1Y2Nlc3MpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRpc3BhdGNoKSB7XG4gICAgICAgIHJldHVybiBheGlvc18xW1wiZGVmYXVsdFwiXS5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL3Bhc3N3b3JkJywge1xuICAgICAgICAgICAgb2xkUGFzczogb2xkUGFzcyxcbiAgICAgICAgICAgIG5ld1Bhc3M6IG5ld1Bhc3NcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEluZm8oJ1Bhc3N3b3JkIHVwZGF0ZWQnKSk7XG4gICAgICAgICAgICBpZiAob25TdWNjZXNzKVxuICAgICAgICAgICAgICAgIG9uU3VjY2VzcygpO1xuICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIucmVzcG9uc2UgJiYgZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTb21ldGhpbmcgd2VudCB3cm9uZyB1cGRhdGluZyB1c2VyIHBhc3N3b3JkJywgZXJyKTtcbiAgICAgICAgICAgIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byB1cGRhdGUgeW91ciBwYXNzd29yZC4nKSk7XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pZFhObGNrRmpkR2x2Ym5NdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOHVMaTh1TGk5emNtTXZkMlZpTDJGamRHbHZibk12ZFhObGNrRmpkR2x2Ym5NdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZCUVN3clFrRkJlVVE3UVVGRmVrUXNjVVJCUVc5RU8wRkJRM0JFTEN0RVFVRjVSRHRCUVVVMVF5eFJRVUZCTEdOQlFXTXNSMEZCUnl4blFrRkJaMElzUTBGQlF6dEJRVU5zUXl4UlFVRkJMRkZCUVZFc1IwRkJSeXhWUVVGVkxFTkJRVU03UVVGRGRFSXNVVUZCUVN4WFFVRlhMRWRCUVVjc1lVRkJZU3hEUVVGRE8wRkJRelZDTEZGQlFVRXNUMEZCVHl4SFFVRkhMRk5CUVZNc1EwRkJRenRCUVVWd1FpeFJRVUZCTEdGQlFXRXNSMEZCUnl4VlFVRkRMRlZCUVcxQ08wbEJRemRETEU5QlFWRTdVVUZEU2l4SlFVRkpMRVZCUVVVc2MwSkJRV003VVVGRGNFSXNTVUZCU1N4RlFVRkZMRlZCUVZVN1MwRkRia0lzUTBGQlF6dEJRVU5PTEVOQlFVTXNRMEZCUVR0QlFVVlpMRkZCUVVFc1QwRkJUeXhIUVVGSExGVkJRVU1zU1VGQlpUdEpRVU51UXl4UFFVRlBPMUZCUTBnc1NVRkJTU3hGUVVGRkxHZENRVUZSTzFGQlEyUXNTVUZCU1N4RlFVRkZMRWxCUVVrN1MwRkRZaXhEUVVGRE8wRkJRMDRzUTBGQlF5eERRVUZCTzBGQlJWa3NVVUZCUVN4VlFVRlZMRWRCUVVjN1NVRkRkRUlzVDBGQlR6dFJRVU5JTEVsQlFVa3NSVUZCUlN4dFFrRkJWenRMUVVOd1FpeERRVUZETzBGQlEwNHNRMEZCUXl4RFFVRkJPMEZCUlZrc1VVRkJRU3hOUVVGTkxFZEJRVWNzVlVGQlF5eExRVUZoTzBsQlEyaERMRTlCUVU4N1VVRkRTQ3hKUVVGSkxFVkJRVVVzWlVGQlR6dFJRVU5pTEVsQlFVa3NSVUZCUlN4TFFVRkxPMHRCUTJRc1EwRkJRenRCUVVOT0xFTkJRVU1zUTBGQlFUdEJRVVZaTEZGQlFVRXNUVUZCVFN4SFFVRkhPMGxCUTJ4Q0xFOUJRVThzVlVGQlF5eFJRVUZoTzFGQlEycENMRkZCUVZFc1EwRkJReXhyUWtGQlZTeEZRVUZGTEVOQlFVTXNRMEZCUXp0UlFVTjJRaXhQUVVGUExGRkJRVkVzUTBGQlF5eHRRMEZCYVVJc1JVRkJSU3hEUVVGRExFTkJRVU03U1VGRGVrTXNRMEZCUXl4RFFVRkJPMEZCUlV3c1EwRkJReXhEUVVGQk8wRkJSMWtzVVVGQlFTeFZRVUZWTEVkQlFVY3NWVUZCUXl4SlFVRlpMRVZCUVVVc1UwRkJiMEk3U1VGRGVrUXNUMEZCVHl4VlFVRkRMRkZCUVdFN1VVRkRha0lzVDBGQlR5eHJRa0ZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXd3UWtGQk1FSXNSVUZCUlR0WlFVTXhReXhKUVVGSkxFVkJRVVVzU1VGQlNUdFRRVU5pTEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJReXhIUVVGclFqdFpRVU4yUWl4UlFVRlJMRU5CUVVNc09FSkJRVThzUTBGQlF5eGpRVUZqTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTJ4RExFbEJRVWtzVTBGQlV6dG5Ra0ZCUlN4VFFVRlRMRVZCUVVVc1EwRkJRenRSUVVNdlFpeERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRkxMRU5CUVVFc1EwRkJReXhWUVVGRExFZEJRV1U3V1VGRGNrSXNTVUZCU1N4SFFVRkhMRU5CUVVNc1VVRkJVU3hKUVVGSkxFZEJRVWNzUTBGQlF5eFJRVUZSTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzN1owSkJRM1pETEU5QlFVOHNVVUZCVVN4RFFVRkRMQ3RDUVVGUkxFTkJRVU1zUjBGQlJ5eERRVUZETEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU4yUkN4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExIbERRVUY1UXl4RlFVRkZMRWRCUVVjc1EwRkJReXhEUVVGRE8xbEJRelZFTEZGQlFWRXNRMEZCUXl3clFrRkJVU3hEUVVGRExIZEVRVUYzUkN4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOcVJpeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTlFMRU5CUVVNc1EwRkJRenRCUVVOT0xFTkJRVU1zUTBGQlFUdEJRVVZaTEZGQlFVRXNWMEZCVnl4SFFVRkhMRlZCUVVNc1MwRkJZU3hGUVVGRkxGTkJRVzlDTzBsQlF6TkVMRTlCUVU4c1ZVRkJReXhSUVVGaE8xRkJRMnBDTEU5QlFVOHNhMEpCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zTWtKQlFUSkNMRVZCUVVVN1dVRkRNME1zUzBGQlN5eEZRVUZGTEV0QlFVczdVMEZEWml4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVU1zUjBGQmEwSTdXVUZEZGtJc1VVRkJVU3hEUVVGRExEaENRVUZQTEVOQlFVTXNaVUZCWlN4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOdVF5eEpRVUZKTEZOQlFWTTdaMEpCUVVVc1UwRkJVeXhGUVVGRkxFTkJRVU03VVVGREwwSXNRMEZCUXl4RFFVRkRMRU5CUVVNc1QwRkJTeXhEUVVGQkxFTkJRVU1zVlVGQlF5eEhRVUZsTzFsQlEzSkNMRWxCUVVrc1IwRkJSeXhEUVVGRExGRkJRVkVzU1VGQlNTeEhRVUZITEVOQlFVTXNVVUZCVVN4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTE8yZENRVU4yUXl4UFFVRlBMRkZCUVZFc1EwRkJReXdyUWtGQlVTeERRVUZETEVkQlFVY3NRMEZCUXl4UlFVRlJMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEZGtRc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5d3dRMEZCTUVNc1JVRkJSU3hIUVVGSExFTkJRVU1zUTBGQlF6dFpRVU0zUkN4UlFVRlJMRU5CUVVNc0swSkJRVkVzUTBGQlF5eDVSRUZCZVVRc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRGJFWXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRVQ3hEUVVGRExFTkJRVU03UVVGRFRpeERRVUZETEVOQlFVRTdRVUZGV1N4UlFVRkJMR05CUVdNc1IwRkJSeXhWUVVGRExFOUJRV1VzUlVGQlJTeFBRVUZsTEVWQlFVVXNVMEZCYjBJN1NVRkRha1lzVDBGQlR5eFZRVUZETEZGQlFXRTdVVUZEYWtJc1QwRkJUeXhyUWtGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl3NFFrRkJPRUlzUlVGQlJUdFpRVU01UXl4UFFVRlBMRVZCUVVVc1QwRkJUenRaUVVOb1FpeFBRVUZQTEVWQlFVVXNUMEZCVHp0VFFVTnVRaXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFVTXNSMEZCYTBJN1dVRkRka0lzVVVGQlVTeERRVUZETERoQ1FVRlBMRU5CUVVNc2EwSkJRV3RDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTNSRExFbEJRVWtzVTBGQlV6dG5Ra0ZCUlN4VFFVRlRMRVZCUVVVc1EwRkJRenRSUVVNdlFpeERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRkxMRU5CUVVFc1EwRkJReXhWUVVGRExFZEJRV1U3V1VGRGNrSXNTVUZCU1N4SFFVRkhMRU5CUVVNc1VVRkJVU3hKUVVGSkxFZEJRVWNzUTBGQlF5eFJRVUZSTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzN1owSkJRM1pETEU5QlFVOHNVVUZCVVN4RFFVRkRMQ3RDUVVGUkxFTkJRVU1zUjBGQlJ5eERRVUZETEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU4yUkN4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExEWkRRVUUyUXl4RlFVRkZMRWRCUVVjc1EwRkJReXhEUVVGRE8xbEJRMmhGTEZGQlFWRXNRMEZCUXl3clFrRkJVU3hEUVVGRExEUkVRVUUwUkN4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOeVJpeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTlFMRU5CUVVNc1EwRkJRenRCUVVOT0xFTkJRVU1zUTBGQlFTSjkiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgY2hhbm5lbHNBY3Rpb25zXzEgPSByZXF1aXJlKFwiLi4vYWN0aW9ucy9jaGFubmVsc0FjdGlvbnNcIik7XG52YXIgaW5pdGlhbFN0YXRlID0gW107XG5leHBvcnRzLmNoYW5uZWxFeGlzdHMgPSBmdW5jdGlvbiAoY2hhbm5lbHMsIGNoYW5uZWxOYW1lKSB7XG4gICAgdmFyIGNoYW5uZWwgPSBjaGFubmVscy5maW5kKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgIHJldHVybiBjLm5hbWUgPT09IGNoYW5uZWxOYW1lO1xuICAgIH0pO1xuICAgIGlmICghY2hhbm5lbClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBjaGFubmVsO1xufTtcbmZ1bmN0aW9uIGRlZmF1bHRfMShzdGF0ZSwgYWN0aW9uKSB7XG4gICAgaWYgKHN0YXRlID09PSB2b2lkIDApIHsgc3RhdGUgPSBpbml0aWFsU3RhdGU7IH1cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgY2hhbm5lbHNBY3Rpb25zXzEuQUREX0NIQU5ORUxTOlxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbi5kYXRhLmNoYW5uZWxzO1xuICAgICAgICBjYXNlIGNoYW5uZWxzQWN0aW9uc18xLklOQ1JFTUVOVF9DSEFOTkVMX1JFVFJJRVZFX01FU1NBR0VTX09GRlNFVDoge1xuICAgICAgICAgICAgdmFyIGNoYW5uZWxfMSA9IGV4cG9ydHMuY2hhbm5lbEV4aXN0cyhzdGF0ZSwgYWN0aW9uLmRhdGEuY2hhbm5lbCk7XG4gICAgICAgICAgICB2YXIgaW5jcmVtZW50XzEgPSBhY3Rpb24uZGF0YS5pbmNyZW1lbnQ7XG4gICAgICAgICAgICBpZiAoIWNoYW5uZWxfMSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVbmtub3duIGNoYW5uZWwgd2hpbGUgaW5jcmVtZW50aW5nIG1lc3NhZ2VzIG9mZnNldCcsIGFjdGlvbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG5ld0NoYW5uZWxzXzEgPSBzdGF0ZS5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICBpZiAoYy5uYW1lID09PSBjaGFubmVsXzEubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjLnJldHJpZXZlTWVzc2FnZXNPZmZzZXQgKz0gaW5jcmVtZW50XzE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3Q2hhbm5lbHNfMTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGNoYW5uZWxzQWN0aW9uc18xLlNFVF9DSEFOTkVMX0ZFVENISU5HX05FV19NRVNTQUdFUzpcbiAgICAgICAgICAgIHZhciBjaGFubmVsID0gZXhwb3J0cy5jaGFubmVsRXhpc3RzKHN0YXRlLCBhY3Rpb24uZGF0YS5jaGFubmVsTmFtZSk7XG4gICAgICAgICAgICBpZiAoIWNoYW5uZWwpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVW5rbm93biBjaGFubmVsIHdoaWxlIGZldGNoaW5nIG5ldyBtZXNzYWdlcycsIGFjdGlvbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG5ld0NoYW5uZWxzID0gc3RhdGUubWFwKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgaWYgKGMubmFtZSA9PT0gYWN0aW9uLmRhdGEuY2hhbm5lbE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgYy5mZXRjaGluZ05ld01lc3NhZ2VzID0gYWN0aW9uLmRhdGEuaXNGZXRjaGluZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBuZXdDaGFubmVscztcbiAgICAgICAgY2FzZSBjaGFubmVsc0FjdGlvbnNfMS5TRVRfQ0hBTk5FTF9IQVNfTU9SRV9NRVNTQUdFUzoge1xuICAgICAgICAgICAgdmFyIGNoYW5uZWxfMiA9IGV4cG9ydHMuY2hhbm5lbEV4aXN0cyhzdGF0ZSwgYWN0aW9uLmRhdGEuY2hhbm5lbE5hbWUpO1xuICAgICAgICAgICAgdmFyIGhhc01vcmVfMSA9IGFjdGlvbi5kYXRhLmhhc01vcmU7XG4gICAgICAgICAgICBpZiAoIWNoYW5uZWxfMikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVbmtub3duIGNoYW5uZWwgd2hpbGUgc2V0dGluZyBoYXNNb3JlIG1lc3NhZ2VzJywgYWN0aW9uKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbmV3Q2hhbm5lbHNfMiA9IHN0YXRlLm1hcChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIGlmIChjLm5hbWUgPT09IGFjdGlvbi5kYXRhLmNoYW5uZWxOYW1lKVxuICAgICAgICAgICAgICAgICAgICBjLmhhc01vcmVNZXNzYWdlcyA9IGhhc01vcmVfMTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG5ld0NoYW5uZWxzXzI7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBjaGFubmVsc0FjdGlvbnNfMS5BRERfUkVUUklFVkVEX0NIQU5ORUxfTUVTU0FHRVM6IHtcbiAgICAgICAgICAgIHZhciByZXRyaWV2ZWRNZXNzYWdlc18xID0gYWN0aW9uLmRhdGEubWVzc2FnZXM7XG4gICAgICAgICAgICB2YXIgY2hhbm5lbE5hbWVfMSA9IGFjdGlvbi5kYXRhLmNoYW5uZWxOYW1lO1xuICAgICAgICAgICAgdmFyIGNoYW5uZWxfMyA9IGV4cG9ydHMuY2hhbm5lbEV4aXN0cyhzdGF0ZSwgY2hhbm5lbE5hbWVfMSk7XG4gICAgICAgICAgICBpZiAoIWNoYW5uZWxfMykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVbmtub3duIGNoYW5uZWwgd2hpbGUgYWRkaW5nIHJldHJpZXZlZCBjaGFubmVsIG1lc3NhZ2VzJywgYWN0aW9uKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbmV3Q2hhbm5lbHNfMyA9IHN0YXRlLm1hcChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIGlmIChjLm5hbWUgPT09IGNoYW5uZWxOYW1lXzEpXG4gICAgICAgICAgICAgICAgICAgIGMubWVzc2FnZXMgPSByZXRyaWV2ZWRNZXNzYWdlc18xLmNvbmNhdChjLm1lc3NhZ2VzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG5ld0NoYW5uZWxzXzM7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBjaGFubmVsc0FjdGlvbnNfMS5BRERfUkVDRUlWRURfQ0hBTk5FTF9NRVNTQUdFOiB7XG4gICAgICAgICAgICB2YXIgcmVjZWl2ZWRNZXNzYWdlXzEgPSBhY3Rpb24uZGF0YS5tZXNzYWdlO1xuICAgICAgICAgICAgdmFyIGNoYW5uZWxOYW1lXzIgPSBhY3Rpb24uZGF0YS5jaGFubmVsTmFtZTtcbiAgICAgICAgICAgIHZhciBjaGFubmVsXzQgPSBleHBvcnRzLmNoYW5uZWxFeGlzdHMoc3RhdGUsIGNoYW5uZWxOYW1lXzIpO1xuICAgICAgICAgICAgaWYgKCFjaGFubmVsXzQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVW5rbm93biBjaGFubmVsIHdoaWxlIGFkZGluZyByZWNlaXZlZCBtZXNzYWdlJywgc3RhdGUsIGFjdGlvbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG5ld0NoYW5uZWxzXzQgPSBzdGF0ZS5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICBpZiAoYy5uYW1lID09PSBjaGFubmVsTmFtZV8yKVxuICAgICAgICAgICAgICAgICAgICBjLm1lc3NhZ2VzID0gYy5tZXNzYWdlcy5jb25jYXQoW3JlY2VpdmVkTWVzc2FnZV8xXSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBuZXdDaGFubmVsc180O1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgY2hhbm5lbHNBY3Rpb25zXzEuQ0xFQVJfQ0hBTk5FTFNfREFUQTpcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGRlZmF1bHRfMTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVkyaGhibTVsYkhNdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOHVMaTh1TGk5emNtTXZkMlZpTDNKbFpIVmpaWEp6TDJOb1lXNXVaV3h6TG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN08wRkJRVUVzT0VSQlQzTkRPMEZCTUVKMFF5eEpRVUZKTEZsQlFWa3NSMEZCVlN4RlFVRkZMRU5CUVVNN1FVRkZhRUlzVVVGQlFTeGhRVUZoTEVkQlFVY3NWVUZCUXl4UlFVRXlRaXhGUVVGRkxGZEJRVzFDTzBsQlF6RkZMRWxCUVVrc1QwRkJUeXhIUVVGSExGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVVXNWVUZCUXl4RFFVRlZPMUZCUTNCRExFOUJRVThzUTBGQlF5eERRVUZETEVsQlFVa3NTMEZCU3l4WFFVRlhMRU5CUVVNN1NVRkRiRU1zUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEU0N4SlFVRkpMRU5CUVVNc1QwRkJUenRSUVVGRkxFOUJRVThzUzBGQlN5eERRVUZETzBsQlF6TkNMRTlCUVU4c1QwRkJUeXhEUVVGRE8wRkJRMjVDTEVOQlFVTXNRMEZCUVR0QlFVVkVMRzFDUVVGNVFpeExRVUV5UWl4RlFVRkZMRTFCUVdNN1NVRkJNME1zYzBKQlFVRXNSVUZCUVN4dlFrRkJNa0k3U1VGRGFFUXNVVUZCVHl4TlFVRk5MRU5CUVVNc1NVRkJTU3hGUVVGRk8xRkJRMmhDTEV0QlFVc3NPRUpCUVZrN1dVRkRZaXhQUVVGUExFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRPMUZCUTJoRExFdEJRVXNzTkVSQlFUQkRMRU5CUVVNc1EwRkJRenRaUVVNM1F5eEpRVUZKTEZOQlFVOHNSMEZCV1N4eFFrRkJZU3hEUVVGRExFdEJRVXNzUlVGQlJTeE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRE8xbEJRMnBGTEVsQlFVa3NWMEZCVXl4SFFVRlhMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zVTBGQlV5eERRVUZETzFsQlF6bERMRWxCUVVrc1EwRkJReXhUUVVGUExFVkJRVVU3WjBKQlExWXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXh2UkVGQmIwUXNSVUZCUlN4TlFVRk5MRU5CUVVNc1EwRkJRenRuUWtGRE1VVXNUMEZCVHl4TFFVRkxMRU5CUVVNN1lVRkRhRUk3V1VGRFJDeEpRVUZKTEdGQlFWY3NSMEZCWXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRkxGVkJRVU1zUTBGQlZUdG5Ra0ZETDBNc1NVRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeExRVUZMTEZOQlFVOHNRMEZCUXl4SlFVRkpMRVZCUVVVN2IwSkJRM2hDTEVOQlFVTXNRMEZCUXl4elFrRkJjMElzU1VGQlNTeFhRVUZUTEVOQlFVTTdhVUpCUTNwRE8yZENRVU5FTEU5QlFVOHNRMEZCUXl4RFFVRkRPMWxCUTJJc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRFNDeFBRVUZQTEdGQlFWY3NRMEZCUXp0VFFVTjBRanRSUVVORUxFdEJRVXNzYlVSQlFXbERPMWxCUTJ4RExFbEJRVWtzVDBGQlR5eEhRVUZaTEhGQ1FVRmhMRU5CUVVNc1MwRkJTeXhGUVVGRkxFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNWMEZCVnl4RFFVRkRMRU5CUVVNN1dVRkRja1VzU1VGQlNTeERRVUZETEU5QlFVOHNSVUZCUlR0blFrRkRWaXhQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETERaRFFVRTJReXhGUVVGRkxFMUJRVTBzUTBGQlF5eERRVUZETzJkQ1FVTnVSU3hQUVVGUExFdEJRVXNzUTBGQlF6dGhRVU5vUWp0WlFVTkVMRWxCUVVrc1YwRkJWeXhIUVVGakxFdEJRVXNzUTBGQlF5eEhRVUZITEVOQlFVVXNWVUZCUXl4RFFVRlZPMmRDUVVNdlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4SlFVRkpMRXRCUVVzc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eFhRVUZYTEVWQlFVVTdiMEpCUTNCRExFTkJRVU1zUTBGQlF5eHRRa0ZCYlVJc1IwRkJSeXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFWVXNRMEZCUXp0cFFrRkRiRVE3WjBKQlEwUXNUMEZCVHl4RFFVRkRMRU5CUVVNN1dVRkRZaXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU5JTEU5QlFVOHNWMEZCVnl4RFFVRkRPMUZCUTNaQ0xFdEJRVXNzSzBOQlFUWkNMRU5CUVVNc1EwRkJRenRaUVVOb1F5eEpRVUZKTEZOQlFVOHNSMEZCV1N4eFFrRkJZU3hEUVVGRExFdEJRVXNzUlVGQlJTeE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRmRCUVZjc1EwRkJReXhEUVVGRE8xbEJRM0pGTEVsQlFVa3NVMEZCVHl4SFFVRlpMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETzFsQlF6TkRMRWxCUVVrc1EwRkJReXhUUVVGUExFVkJRVVU3WjBKQlExWXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhuUkVGQlowUXNSVUZCUlN4TlFVRk5MRU5CUVVNc1EwRkJRenRuUWtGRGRFVXNUMEZCVHl4TFFVRkxMRU5CUVVNN1lVRkRhRUk3V1VGRFJDeEpRVUZKTEdGQlFWY3NSMEZCWXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRkxGVkJRVU1zUTBGQlZUdG5Ra0ZETDBNc1NVRkJTU3hEUVVGRExFTkJRVU1zU1VGQlNTeExRVUZMTEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1YwRkJWenR2UWtGRGJFTXNRMEZCUXl4RFFVRkRMR1ZCUVdVc1IwRkJSeXhUUVVGUExFTkJRVU03WjBKQlEyaERMRTlCUVU4c1EwRkJReXhEUVVGRE8xbEJRMklzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEU0N4UFFVRlBMR0ZCUVZjc1EwRkJRenRUUVVOMFFqdFJRVU5FTEV0QlFVc3NaMFJCUVRoQ0xFTkJRVU1zUTBGQlF6dFpRVU5xUXl4SlFVRkpMRzFDUVVGcFFpeEhRVUZqTEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRE8xbEJRM2hFTEVsQlFVa3NZVUZCVnl4SFFVRlhMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zVjBGQlZ5eERRVUZETzFsQlEyeEVMRWxCUVVrc1UwRkJUeXhIUVVGWkxIRkNRVUZoTEVOQlFVTXNTMEZCU3l4RlFVRkZMR0ZCUVZjc1EwRkJReXhEUVVGRE8xbEJRM3BFTEVsQlFVY3NRMEZCUXl4VFFVRlBMRVZCUVVVN1owSkJRMVFzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4NVJFRkJlVVFzUlVGQlJTeE5RVUZOTEVOQlFVTXNRMEZCUXp0blFrRkRMMFVzVDBGQlR5eExRVUZMTEVOQlFVTTdZVUZEYUVJN1dVRkRSQ3hKUVVGSkxHRkJRVmNzUjBGQll5eExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkZMRlZCUVVNc1EwRkJWVHRuUWtGREwwTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1NVRkJTU3hMUVVGTExHRkJRVmM3YjBKQlEzUkNMRU5CUVVNc1EwRkJReXhSUVVGUkxFZEJRVWNzYlVKQlFXbENMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXp0blFrRkRkRVFzVDBGQlR5eERRVUZETEVOQlFVTTdXVUZEWWl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOSUxFOUJRVThzWVVGQlZ5eERRVUZETzFOQlEzUkNPMUZCUTBRc1MwRkJTeXc0UTBGQk5FSXNRMEZCUXl4RFFVRkRPMWxCUXk5Q0xFbEJRVWtzYVVKQlFXVXNSMEZCUnl4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF6dFpRVU14UXl4SlFVRkpMR0ZCUVZjc1IwRkJSeXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEZkQlFWY3NRMEZCUXp0WlFVTXhReXhKUVVGSkxGTkJRVThzUjBGQldTeHhRa0ZCWVN4RFFVRkRMRXRCUVVzc1JVRkJSU3hoUVVGWExFTkJRVU1zUTBGQlF6dFpRVU42UkN4SlFVRkpMRU5CUVVNc1UwRkJUeXhGUVVGRk8yZENRVU5XTEU5QlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc0swTkJRU3RETEVWQlFVVXNTMEZCU3l4RlFVRkZMRTFCUVUwc1EwRkJReXhEUVVGRE8yZENRVU0xUlN4UFFVRlBMRXRCUVVzc1EwRkJRenRoUVVOb1FqdFpRVU5FTEVsQlFVa3NZVUZCVnl4SFFVRmpMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zVlVGQlF5eERRVUZWTzJkQ1FVTTVReXhKUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEV0QlFVc3NZVUZCVnp0dlFrRkRja0lzUTBGQlF5eERRVUZETEZGQlFWRXNSMEZCUnl4RFFVRkRMRU5CUVVNc1VVRkJVU3hEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZETEdsQ1FVRmxMRU5CUVVNc1EwRkJReXhEUVVGRE8yZENRVU4wUkN4UFFVRlBMRU5CUVVNc1EwRkJRenRaUVVOaUxFTkJRVU1zUTBGQlF5eERRVUZCTzFsQlEwWXNUMEZCVHl4aFFVRlhMRU5CUVVNN1UwRkRkRUk3VVVGRFJDeExRVUZMTEhGRFFVRnRRanRaUVVOd1FpeFBRVUZQTEVWQlFVVXNRMEZCUXp0UlFVTmtPMWxCUTBrc1QwRkJUeXhMUVVGTExFTkJRVU03UzBGRGNFSTdRVUZEVEN4RFFVRkRPMEZCYWtaRUxDdENRV2xHUXlKOSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBjaGF0VXNlcnNBY3Rpb25zXzEgPSByZXF1aXJlKFwiLi4vYWN0aW9ucy9jaGF0VXNlcnNBY3Rpb25zXCIpO1xudmFyIGluaXRpYWxTdGF0ZSA9IHt9O1xuZnVuY3Rpb24gZGVmYXVsdF8xKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBpZiAoc3RhdGUgPT09IHZvaWQgMCkgeyBzdGF0ZSA9IGluaXRpYWxTdGF0ZTsgfVxuICAgIHZhciBfYTtcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgY2hhdFVzZXJzQWN0aW9uc18xLlVQREFURV9DSEFUX1VTRVJTOlxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbi5kYXRhLnVzZXJzO1xuICAgICAgICBjYXNlIGNoYXRVc2Vyc0FjdGlvbnNfMS5BRERfQ0hBVF9VU0VSOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCAoX2EgPSB7fSxcbiAgICAgICAgICAgICAgICBfYVthY3Rpb24uZGF0YS51c2VyLmVtYWlsXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogYWN0aW9uLmRhdGEudXNlci5yb2xlLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBhY3Rpb24uZGF0YS51c2VyLm5hbWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfYSkpO1xuICAgICAgICBjYXNlIGNoYXRVc2Vyc0FjdGlvbnNfMS5SRU1PVkVfQ0hBVF9VU0VSOlxuICAgICAgICAgICAgdmFyIGNsb25lID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpO1xuICAgICAgICAgICAgZGVsZXRlIGNsb25lW2FjdGlvbi5kYXRhLmVtYWlsXTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGRlZmF1bHRfMTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVkyaGhkRlZ6WlhKekxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZMaTR2TGk0dmMzSmpMM2RsWWk5eVpXUjFZMlZ5Y3k5amFHRjBWWE5sY25NdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZEUVN4blJVRkRkVU03UVVGbGRrTXNTVUZCU1N4WlFVRlpMRWRCUVZVc1JVRkZla0lzUTBGQlFUdEJRVVZFTEcxQ1FVRjNRaXhMUVVFeVFpeEZRVUZGTEUxQlFXbENPMGxCUVRsRExITkNRVUZCTEVWQlFVRXNiMEpCUVRKQ096dEpRVU12UXl4UlFVRlBMRTFCUVUwc1EwRkJReXhKUVVGSkxFVkJRVVU3VVVGRGFFSXNTMEZCU3l4dlEwRkJhVUk3V1VGRGJFSXNUMEZCVHl4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF6dFJRVU0zUWl4TFFVRkxMR2REUVVGaE8xbEJRMlFzVDBGQlR5eE5RVUZOTEVOQlFVTXNUVUZCVFN4RFFVRkRMRVZCUVVVc1JVRkJSU3hMUVVGTE8yZENRVU14UWl4SFFVRkRMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NTVUZCUnp0dlFrRkRkRUlzU1VGQlNTeEZRVUZGTEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWs3YjBKQlF6TkNMRWxCUVVrc1JVRkJSU3hOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpPMmxDUVVNNVFqdHZRa0ZEU0N4RFFVRkRPMUZCUTFBc1MwRkJTeXh0UTBGQlowSTdXVUZEYWtJc1NVRkJTU3hMUVVGTExFZEJRVlVzVFVGQlRTeERRVUZETEUxQlFVMHNRMEZCUXl4RlFVRkZMRVZCUVVVc1MwRkJTeXhEUVVGRExFTkJRVU03V1VGRE5VTXNUMEZCVHl4TFFVRkxMRU5CUVVNc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUVR0UlFVTnVRenRaUVVOSkxFOUJRVThzUzBGQlN5eERRVUZETzB0QlEzQkNPMEZCUTB3c1EwRkJRenRCUVdwQ1JDd3JRa0ZwUWtNaWZRPT0iLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgbm90aWZpY2F0aW9uc0FjdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi9hY3Rpb25zL25vdGlmaWNhdGlvbnNBY3Rpb25zXCIpO1xudmFyIGluaXRpYWxTdGF0ZSA9IHtcbiAgICBlcnJvcnM6IFtdLFxuICAgIGluZm9zOiBbXVxufTtcbmZ1bmN0aW9uIGRlZmF1bHRfMShzdGF0ZSwgYWN0aW9uKSB7XG4gICAgaWYgKHN0YXRlID09PSB2b2lkIDApIHsgc3RhdGUgPSBpbml0aWFsU3RhdGU7IH1cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2Ugbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5BRERfRVJST1I6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgZXJyb3JzOiBzdGF0ZS5lcnJvcnMuY29uY2F0KFthY3Rpb24uZGF0YV0pIH0pO1xuICAgICAgICBjYXNlIG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuUkVNT1ZFX0VSUk9SOlxuICAgICAgICAgICAgdmFyIG5ld0Vycm9yc0FycmF5ID0gc3RhdGUuZXJyb3JzLnNsaWNlKCk7XG4gICAgICAgICAgICBuZXdFcnJvcnNBcnJheS5zcGxpY2UoYWN0aW9uLmRhdGEsIDEpO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGVycm9yczogbmV3RXJyb3JzQXJyYXkgfSk7XG4gICAgICAgIGNhc2Ugbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5DTEVBUl9FUlJPUlM6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgZXJyb3JzOiBbXSB9KTtcbiAgICAgICAgY2FzZSBub3RpZmljYXRpb25zQWN0aW9uc18xLkFERF9JTkZPOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGluZm9zOiBzdGF0ZS5pbmZvcy5jb25jYXQoW2FjdGlvbi5kYXRhXSkgfSk7XG4gICAgICAgIGNhc2Ugbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5SRU1PVkVfSU5GTzpcbiAgICAgICAgICAgIHZhciBuZXdJbmZvc0FycmF5ID0gc3RhdGUuaW5mb3Muc2xpY2UoKTtcbiAgICAgICAgICAgIG5ld0luZm9zQXJyYXkuc3BsaWNlKGFjdGlvbi5kYXRhLCAxKTtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBpbmZvczogbmV3SW5mb3NBcnJheSB9KTtcbiAgICAgICAgY2FzZSBub3RpZmljYXRpb25zQWN0aW9uc18xLkNMRUFSX0lORk9TOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGluZm9zOiBbXSB9KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGRlZmF1bHRfMTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWJtOTBhV1pwWTJGMGFXOXVjeTVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUx5NHVMM055WXk5M1pXSXZjbVZrZFdObGNuTXZibTkwYVdacFkyRjBhVzl1Y3k1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96dEJRVUZCTEhkRlFVTXlRenRCUVZjelF5eEpRVUZKTEZsQlFWa3NSMEZCVlR0SlFVTjBRaXhOUVVGTkxFVkJRVVVzUlVGQlJUdEpRVU5XTEV0QlFVc3NSVUZCUlN4RlFVRkZPME5CUTFvc1EwRkJRVHRCUVVWRUxHMUNRVUYzUWl4TFFVRXlRaXhGUVVGRkxFMUJRV003U1VGQk0wTXNjMEpCUVVFc1JVRkJRU3h2UWtGQk1rSTdTVUZETDBNc1VVRkJUeXhOUVVGTkxFTkJRVU1zU1VGQlNTeEZRVUZGTzFGQlEyaENMRXRCUVVzc1owTkJRVk03V1VGRFZpeFBRVUZQTEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc1JVRkJSU3hGUVVGRkxFdEJRVXNzUlVGQlJTeEZRVUZETEUxQlFVMHNSVUZCUlN4TFFVRkxMRU5CUVVNc1RVRkJUU3hEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZETEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhGUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5zUml4TFFVRkxMRzFEUVVGWk8xbEJRMklzU1VGQlNTeGpRVUZqTEVkQlFVY3NTMEZCU3l4RFFVRkRMRTFCUVUwc1EwRkJReXhMUVVGTExFVkJRVVVzUTBGQlF6dFpRVU14UXl4alFVRmpMRU5CUVVNc1RVRkJUU3hEUVVGRExFMUJRVTBzUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRkRU1zVDBGQlR5eE5RVUZOTEVOQlFVTXNUVUZCVFN4RFFVRkRMRVZCUVVVc1JVRkJSU3hMUVVGTExFVkJRVVVzUlVGQlF5eE5RVUZOTEVWQlFVVXNZMEZCWXl4RlFVRkRMRU5CUVVNc1EwRkJRenRSUVVNNVJDeExRVUZMTEcxRFFVRlpPMWxCUTJJc1QwRkJUeXhOUVVGTkxFTkJRVU1zVFVGQlRTeERRVUZETEVWQlFVVXNSVUZCUlN4TFFVRkxMRVZCUVVjc1JVRkJReXhOUVVGTkxFVkJRVVVzUlVGQlJTeEZRVUZETEVOQlFVTXNRMEZCUXp0UlFVTnVSQ3hMUVVGTExDdENRVUZSTzFsQlExUXNUMEZCVHl4TlFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExFVkJRVVVzUlVGQlJTeExRVUZMTEVWQlFVVXNSVUZCUXl4TFFVRkxMRVZCUVVVc1MwRkJTeXhEUVVGRExFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUlVGQlF5eERRVUZETEVOQlFVTTdVVUZEYUVZc1MwRkJTeXhyUTBGQlZ6dFpRVU5hTEVsQlFVa3NZVUZCWVN4SFFVRkhMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eEZRVUZGTEVOQlFVTTdXVUZEZUVNc1lVRkJZU3hEUVVGRExFMUJRVTBzUTBGQlF5eE5RVUZOTEVOQlFVTXNTVUZCU1N4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRM0pETEU5QlFVOHNUVUZCVFN4RFFVRkRMRTFCUVUwc1EwRkJReXhGUVVGRkxFVkJRVVVzUzBGQlN5eEZRVUZGTEVWQlFVVXNTMEZCU3l4RlFVRkZMR0ZCUVdFc1JVRkJSU3hEUVVGRExFTkJRVU03VVVGRE9VUXNTMEZCU3l4clEwRkJWenRaUVVOYUxFOUJRVThzVFVGQlRTeERRVUZETEUxQlFVMHNRMEZCUXl4RlFVRkZMRVZCUVVVc1MwRkJTeXhGUVVGRkxFVkJRVU1zUzBGQlN5eEZRVUZGTEVWQlFVVXNSVUZCUXl4RFFVRkRMRU5CUVVNN1VVRkRha1E3V1VGRFNTeFBRVUZQTEV0QlFVc3NRMEZCUXp0TFFVTndRanRCUVVOTUxFTkJRVU03UVVGeVFrUXNLMEpCY1VKREluMD0iLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgc2lkZWJhckFjdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi9hY3Rpb25zL3NpZGViYXJBY3Rpb25zXCIpO1xudmFyIGluaXRpYWxTdGF0ZSA9IHtcbiAgICBvcGVuOiB0cnVlXG59O1xuZnVuY3Rpb24gZGVmYXVsdF8xKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBpZiAoc3RhdGUgPT09IHZvaWQgMCkgeyBzdGF0ZSA9IGluaXRpYWxTdGF0ZTsgfVxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBzaWRlYmFyQWN0aW9uc18xLlRPR0dMRV9TSURFQkFSX09QRU46XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgb3BlbjogIXN0YXRlLm9wZW4gfSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufVxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBkZWZhdWx0XzE7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2ljMmxrWldKaGNpNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1THk0dUwzTnlZeTkzWldJdmNtVmtkV05sY25NdmMybGtaV0poY2k1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96dEJRVU5CTERSRVFVRm5SVHRCUVUxb1JTeEpRVUZKTEZsQlFWa3NSMEZCVlR0SlFVTjBRaXhKUVVGSkxFVkJRVVVzU1VGQlNUdERRVU5pTEVOQlFVRTdRVUZGUkN4dFFrRkJkMElzUzBGQk1rSXNSVUZCUlN4TlFVRmpPMGxCUVRORExITkNRVUZCTEVWQlFVRXNiMEpCUVRKQ08wbEJReTlETEZGQlFWRXNUVUZCVFN4RFFVRkRMRWxCUVVrc1JVRkJSVHRSUVVOcVFpeExRVUZMTEc5RFFVRnRRanRaUVVOd1FpeFBRVUZQTEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc1JVRkJSU3hGUVVGRkxFdEJRVXNzUlVGQlJTeEZRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFVkJRVU1zUTBGQlF5eERRVUZETzFGQlEzcEVPMWxCUTBrc1QwRkJUeXhMUVVGTExFTkJRVU03UzBGRGNFSTdRVUZEVEN4RFFVRkRPMEZCVUVRc0swSkJUME1pZlE9PSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBzb2NrZXRBY3Rpb25zXzEgPSByZXF1aXJlKFwiLi4vYWN0aW9ucy9zb2NrZXRBY3Rpb25zXCIpO1xudmFyIGluaXRpYWxTdGF0ZSA9IHtcbiAgICBpbzogbnVsbCxcbiAgICBjb25uZWN0ZWQ6IGZhbHNlLFxuICAgIGNvbm5lY3RlZFVzZXJFbWFpbHM6IFtdXG59O1xuZnVuY3Rpb24gZGVmYXVsdF8xKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBpZiAoc3RhdGUgPT09IHZvaWQgMCkgeyBzdGF0ZSA9IGluaXRpYWxTdGF0ZTsgfVxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBzb2NrZXRBY3Rpb25zXzEuSU5JVF9XRUJTT0NLRVQ6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgaW86IGFjdGlvbi5kYXRhLmlvIH0pO1xuICAgICAgICBjYXNlIHNvY2tldEFjdGlvbnNfMS5TRVRfU09DS0VUX0NPTk5FQ1RFRDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBjb25uZWN0ZWQ6IGFjdGlvbi5kYXRhLmNvbm5lY3RlZCB9KTtcbiAgICAgICAgY2FzZSBzb2NrZXRBY3Rpb25zXzEuU0VUX1NPQ0tFVF9DT05ORUNURURfVVNFUlM6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgY29ubmVjdGVkVXNlckVtYWlsczogYWN0aW9uLmRhdGEudXNlckVtYWlscyB9KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGRlZmF1bHRfMTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWMyOWphMlYwTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dkxpNHZMaTR2YzNKakwzZGxZaTl5WldSMVkyVnljeTl6YjJOclpYUXVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanM3UVVGSFFTd3dSRUZIYjBNN1FVRlJjRU1zU1VGQlNTeFpRVUZaTEVkQlFWVTdTVUZEZEVJc1JVRkJSU3hGUVVGRkxFbEJRVWs3U1VGRFVpeFRRVUZUTEVWQlFVVXNTMEZCU3p0SlFVTm9RaXh0UWtGQmJVSXNSVUZCUlN4RlFVRkZPME5CUXpGQ0xFTkJRVUU3UVVGRlJDeHRRa0ZCZDBJc1MwRkJNa0lzUlVGQlJTeE5RVUZwUWp0SlFVRTVReXh6UWtGQlFTeEZRVUZCTEc5Q1FVRXlRanRKUVVNdlF5eFJRVUZQTEUxQlFVMHNRMEZCUXl4SlFVRkpMRVZCUVVVN1VVRkRhRUlzUzBGQlN5dzRRa0ZCWXp0WlFVTm1MRTlCUVU4c1RVRkJUU3hEUVVGRExFMUJRVTBzUTBGQlF5eEZRVUZGTEVWQlFVVXNTMEZCU3l4RlFVRkZMRVZCUVVNc1JVRkJSU3hGUVVGRkxFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4RlFVRkRMRU5CUVVNc1EwRkJRenRSUVVNeFJDeExRVUZMTEc5RFFVRnZRanRaUVVOeVFpeFBRVUZQTEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc1JVRkJSU3hGUVVGRkxFdEJRVXNzUlVGQlJTeEZRVUZETEZOQlFWTXNSVUZCUlN4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExGTkJRVk1zUlVGQlF5eERRVUZETEVOQlFVTTdVVUZEZUVVc1MwRkJTeXd3UTBGQk1FSTdXVUZETTBJc1QwRkJUeXhOUVVGTkxFTkJRVU1zVFVGQlRTeERRVUZETEVWQlFVVXNSVUZCUlN4TFFVRkxMRVZCUVVVc1JVRkJReXh0UWtGQmJVSXNSVUZCUlN4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVlVzUlVGQlJTeERRVUZETEVOQlFVRTdVVUZEYmtZN1dVRkRTU3hQUVVGUExFdEJRVXNzUTBGQlF6dExRVU53UWp0QlFVTk1MRU5CUVVNN1FVRllSQ3dyUWtGWFF5SjkiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgdXNlckFjdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi9hY3Rpb25zL3VzZXJBY3Rpb25zXCIpO1xudmFyIGluaXRpYWxTdGF0ZSA9IHtcbiAgICBhdXRob3JpemVkOiBmYWxzZSxcbiAgICBlbWFpbDogZmFsc2UsXG4gICAgbmFtZTogZmFsc2UsXG4gICAgcm9sZTogZmFsc2UsXG4gICAgand0OiBmYWxzZSxcbn07XG5mdW5jdGlvbiBkZWZhdWx0XzEoc3RhdGUsIGFjdGlvbikge1xuICAgIGlmIChzdGF0ZSA9PT0gdm9pZCAwKSB7IHN0YXRlID0gaW5pdGlhbFN0YXRlOyB9XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIHVzZXJBY3Rpb25zXzEuU0VUX0FVVEhPUklaRUQ6XG4gICAgICAgICAgICBpZiAodHlwZW9mIGFjdGlvbi5kYXRhICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhIG11c3QgYmUgYm9vbGVhbiBmb3IgU0VUX0FVVEhPUklaRUQgYWN0aW9uJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFjdGlvbi5kYXRhID09PSBmYWxzZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgYXV0aG9yaXplZDogZmFsc2UsIGVtYWlsOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBhdXRob3JpemVkOiBhY3Rpb24uZGF0YSB9KTtcbiAgICAgICAgY2FzZSB1c2VyQWN0aW9uc18xLlNFVF9VU0VSOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBhY3Rpb24uZGF0YSk7XG4gICAgICAgIGNhc2UgdXNlckFjdGlvbnNfMS5MT0dPVVRfVVNFUjpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgYXV0aG9yaXplZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbmFtZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZW1haWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJvbGU6IGZhbHNlXG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIHVzZXJBY3Rpb25zXzEuU0VUX0pXVDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyB0b2tlbjogYWN0aW9uLmRhdGEgfSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufVxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBkZWZhdWx0XzE7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lkWE5sY2k1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUx5NHVMeTR1TDNOeVl5OTNaV0l2Y21Wa2RXTmxjbk12ZFhObGNpNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenRCUVVGQkxITkVRVUZ6Ump0QlFXVjBSaXhKUVVGSkxGbEJRVmtzUjBGQlZ6dEpRVU4yUWl4VlFVRlZMRVZCUVVVc1MwRkJTenRKUVVOcVFpeExRVUZMTEVWQlFVVXNTMEZCU3p0SlFVTmFMRWxCUVVrc1JVRkJSU3hMUVVGTE8wbEJRMWdzU1VGQlNTeEZRVUZGTEV0QlFVczdTVUZEV0N4SFFVRkhMRVZCUVVVc1MwRkJTenREUVVOaUxFTkJRVUU3UVVGSFJDeHRRa0ZCZDBJc1MwRkJNa0lzUlVGQlJTeE5RVUZqTzBsQlFUTkRMSE5DUVVGQkxFVkJRVUVzYjBKQlFUSkNPMGxCUXk5RExGRkJRVkVzVFVGQlRTeERRVUZETEVsQlFVa3NSVUZCUlR0UlFVTnFRaXhMUVVGTExEUkNRVUZqTzFsQlEyWXNTVUZCU1N4UFFVRlBMRTFCUVUwc1EwRkJReXhKUVVGSkxFdEJRVXNzVTBGQlV5eEZRVUZGTzJkQ1FVTnNReXhQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETEdkRVFVRm5SQ3hEUVVGRExFTkJRVU03WjBKQlEyaEZMRTlCUVU4c1MwRkJTeXhEUVVGRE8yRkJRMmhDTzFsQlEwUXNTVUZCU1N4TlFVRk5MRU5CUVVNc1NVRkJTU3hMUVVGTExFdEJRVXM3WjBKQlEzSkNMRTlCUVU4c1RVRkJUU3hEUVVGRExFMUJRVTBzUTBGQlF5eEZRVUZGTEVWQlFVVXNTMEZCU3l4RlFVRkZMRVZCUVVNc1ZVRkJWU3hGUVVGRkxFdEJRVXNzUlVGQlJTeExRVUZMTEVWQlFVVXNTMEZCU3l4RlFVRkRMRU5CUVVNc1EwRkJRenRaUVVOMlJTeFBRVUZQTEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc1JVRkJSU3hGUVVGRkxFdEJRVXNzUlVGQlJTeEZRVUZETEZWQlFWVXNSVUZCUlN4TlFVRk5MRU5CUVVNc1NVRkJTU3hGUVVGRExFTkJRVU1zUTBGQlF6dFJRVU12UkN4TFFVRkxMSE5DUVVGUk8xbEJRMVFzVDBGQlR5eE5RVUZOTEVOQlFVTXNUVUZCVFN4RFFVRkRMRVZCUVVVc1JVRkJSU3hMUVVGTExFVkJRVVVzVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUTJwRUxFdEJRVXNzZVVKQlFWYzdXVUZEV2l4UFFVRlBPMmRDUVVOSUxGVkJRVlVzUlVGQlJTeExRVUZMTzJkQ1FVTnFRaXhKUVVGSkxFVkJRVVVzUzBGQlN6dG5Ra0ZEV0N4TFFVRkxMRVZCUVVVc1MwRkJTenRuUWtGRFdpeEpRVUZKTEVWQlFVVXNTMEZCU3p0aFFVTmtMRU5CUVVFN1VVRkRUQ3hMUVVGTExIRkNRVUZQTzFsQlExSXNUMEZCVHl4TlFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExFVkJRVVVzUlVGQlJTeExRVUZMTEVWQlFVVXNSVUZCUXl4TFFVRkxMRVZCUVVVc1RVRkJUU3hEUVVGRExFbEJRVWtzUlVGQlF5eERRVUZETEVOQlFVTTdVVUZETVVRN1dVRkRTU3hQUVVGUExFdEJRVXNzUTBGQlF6dExRVU53UWp0QlFVTk1MRU5CUVVNN1FVRjRRa1FzSzBKQmQwSkRJbjA9IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIHJlZHV4XzEgPSByZXF1aXJlKFwicmVkdXhcIik7XG52YXIgcmVkdXhfdGh1bmtfMSA9IHJlcXVpcmUoXCJyZWR1eC10aHVua1wiKTtcbnZhciByZWR1eF9sb2dnZXJfMSA9IHJlcXVpcmUoXCJyZWR1eC1sb2dnZXJcIik7XG52YXIgdXNlcl8xID0gcmVxdWlyZShcIi4vcmVkdWNlcnMvdXNlclwiKTtcbnZhciBjaGFubmVsc18xID0gcmVxdWlyZShcIi4vcmVkdWNlcnMvY2hhbm5lbHNcIik7XG52YXIgbm90aWZpY2F0aW9uc18xID0gcmVxdWlyZShcIi4vcmVkdWNlcnMvbm90aWZpY2F0aW9uc1wiKTtcbnZhciBzaWRlYmFyXzEgPSByZXF1aXJlKFwiLi9yZWR1Y2Vycy9zaWRlYmFyXCIpO1xudmFyIHNvY2tldF8xID0gcmVxdWlyZShcIi4vcmVkdWNlcnMvc29ja2V0XCIpO1xudmFyIGNoYXRVc2Vyc18xID0gcmVxdWlyZShcIi4vcmVkdWNlcnMvY2hhdFVzZXJzXCIpO1xudmFyIGVudiA9IHJlcXVpcmUoJy4uLy4uL2VudicpO1xuZXhwb3J0cy5yb290UmVkdWNlciA9IHJlZHV4XzEuY29tYmluZVJlZHVjZXJzKHtcbiAgICB1c2VyOiB1c2VyXzFbXCJkZWZhdWx0XCJdLFxuICAgIGNoYW5uZWxzOiBjaGFubmVsc18xW1wiZGVmYXVsdFwiXSxcbiAgICBub3RpZmljYXRpb25zOiBub3RpZmljYXRpb25zXzFbXCJkZWZhdWx0XCJdLFxuICAgIHNpZGViYXI6IHNpZGViYXJfMVtcImRlZmF1bHRcIl0sXG4gICAgc29ja2V0OiBzb2NrZXRfMVtcImRlZmF1bHRcIl0sXG4gICAgY2hhdFVzZXJzOiBjaGF0VXNlcnNfMVtcImRlZmF1bHRcIl0sXG59KTtcbmV4cG9ydHMubWlkZGxld2FyZSA9IGVudi5wcm9kdWN0aW9uIHx8IGVudi5kaXNhYmxlUmVkdXhMb2dnaW5nID9cbiAgICByZWR1eF8xLmFwcGx5TWlkZGxld2FyZShyZWR1eF90aHVua18xW1wiZGVmYXVsdFwiXSkgOiByZWR1eF8xLmFwcGx5TWlkZGxld2FyZShyZWR1eF90aHVua18xW1wiZGVmYXVsdFwiXSwgcmVkdXhfbG9nZ2VyXzEuY3JlYXRlTG9nZ2VyKCkpO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSByZWR1eF8xLmNyZWF0ZVN0b3JlKGV4cG9ydHMucm9vdFJlZHVjZXIsIGV4cG9ydHMubWlkZGxld2FyZSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2ljM1J2Y21VdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOHVMaTl6Y21NdmQyVmlMM04wYjNKbExuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCUVVFc0swSkJRVFJHTzBGQlF6VkdMREpEUVVGeFF6dEJRVU55UXl3MlEwRkJNRU03UVVGRk1VTXNkME5CUVdkRk8wRkJRMmhGTEdkRVFVRTBSVHRCUVVNMVJTd3dSRUZCTWtZN1FVRkRNMFlzT0VOQlFYbEZPMEZCUTNwRkxEUkRRVUZ6UlR0QlFVTjBSU3hyUkVGQkswVTdRVUZGTDBVc1NVRkJUU3hIUVVGSExFZEJRVWNzVDBGQlR5eERRVUZETEZkQlFWY3NRMEZCUXl4RFFVRkRPMEZCVjNCQ0xGRkJRVUVzVjBGQlZ5eEhRVUZaTEhWQ1FVRmxMRU5CUVVNN1NVRkRhRVFzU1VGQlNTeEZRVUZGTEdsQ1FVRlhPMGxCUTJwQ0xGRkJRVkVzUlVGQlJTeHhRa0ZCWlR0SlFVTjZRaXhoUVVGaExFVkJRVVVzTUVKQlFXOUNPMGxCUTI1RExFOUJRVThzUlVGQlJTeHZRa0ZCWXp0SlFVTjJRaXhOUVVGTkxFVkJRVVVzYlVKQlFXRTdTVUZEY2tJc1UwRkJVeXhGUVVGRkxITkNRVUZuUWp0RFFVTTVRaXhEUVVGRExFTkJRVU03UVVGRlZTeFJRVUZCTEZWQlFWVXNSMEZEYmtJc1IwRkJSeXhEUVVGRExGVkJRVlVzU1VGQlNTeEhRVUZITEVOQlFVTXNiVUpCUVcxQ0xFTkJRVU1zUTBGQlF6dEpRVU16UXl4MVFrRkJaU3hEUVVGRExIZENRVUZWTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc2RVSkJRV1VzUTBGQlF5eDNRa0ZCVlN4RlFVRkZMREpDUVVGWkxFVkJRVVVzUTBGQlF5eERRVUZETzBGQlJUbEZMSEZDUVVGbExHMUNRVUZYTEVOQlFVTXNiVUpCUVZjc1JVRkJSU3hyUWtGQlZTeERRVUZETEVOQlFVTWlmUT09IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIHNlcnZlcl8xID0gcmVxdWlyZShcIi4uL3NyYy9zZXJ2ZXIvc2VydmVyXCIpO1xuZXhwb3J0cy5hcHAgPSBzZXJ2ZXJfMS5hcHA7XG52YXIgVXNlcl8xID0gcmVxdWlyZShcIi4uL3NyYy9zZXJ2ZXIvbW9kZWxzL1VzZXJcIik7XG52YXIgZHJvcEFsbENvbGxlY3Rpb25zID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBVc2VyXzFbXCJkZWZhdWx0XCJdLmRlbGV0ZU1hbnkoe30sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHAudGhlbigpW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfSk7XG59O1xuZXhwb3J0cy5kcm9wQWxsQ29sbGVjdGlvbnMgPSBkcm9wQWxsQ29sbGVjdGlvbnM7XG52YXIgTm90SW1wbGVtZW50ZWRFcnJvciA9IG5ldyBFcnJvcignVGVzdCBub3QgaW1wbGVtZW50ZWQnKTtcbmV4cG9ydHMuTm90SW1wbGVtZW50ZWRFcnJvciA9IE5vdEltcGxlbWVudGVkRXJyb3I7XG5iZWZvcmUoJ2FsbCB0ZXN0cycsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgY29uc29sZS5sb2cocHJvY2Vzcy52ZXJzaW9uKTtcbiAgICBzZXJ2ZXJfMS5jb25uLm9uKCdjb25uZWN0ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzZXJ2ZXIgc3RhcnRlZCcpO1xuICAgICAgICBkb25lKCk7XG4gICAgfSk7XG59KTtcbmJlZm9yZUVhY2goJ3Jlc2V0IERCJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICBkcm9wQWxsQ29sbGVjdGlvbnMoKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRvbmUoKTsgfSk7XG59KTtcbmFmdGVyKCdhbGwgdGVzdHMnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgIGRyb3BBbGxDb2xsZWN0aW9ucygpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2xvc2luZyBjb25uZWN0aW9ucycpO1xuICAgICAgICBzZXJ2ZXJfMS5jb25uLmNsb3NlKCk7XG4gICAgICAgIGRvbmUoKTtcbiAgICB9KTtcbn0pO1xucmVxdWlyZSgnLi93ZWIvdGVzdFN0b3JlJyk7XG5yZXF1aXJlKCcuL3dlYi90ZXN0QXN5bmNBY3Rpb25zJyk7XG5yZXF1aXJlKCcuL3NlcnZlci90ZXN0QXV0aENvbnRyb2xsZXInKTtcbnJlcXVpcmUoJy4vc2VydmVyL3Rlc3RVc2VyQ29udHJvbGxlcicpO1xucmVxdWlyZSgnLi9zZXJ2ZXIvdGVzdE1lc3NhZ2VDb250cm9sbGVyJyk7XG5yZXF1aXJlKCcuL3NlcnZlci90ZXN0Q2hhbm5lbENvbnRyb2xsZXInKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFXNWtaWGd1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk5MFpYTjBjeTlwYm1SbGVDNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenRCUVVGQkxDdERRVUZwUkR0QlFXdEVlRU1zWTBGc1JFMHNXVUZCUnl4RFFXdEVUanRCUVdwRVdpeHJSRUZCTmtNN1FVRkZOME1zU1VGQlRTeHJRa0ZCYTBJc1IwRkJSenRKUVVOMlFpeEpRVUZKTEVOQlFVTXNSMEZCUnl4SlFVRkpMRTlCUVU4c1EwRkJReXhWUVVGRExFOUJRVThzUlVGQlJTeE5RVUZOTzFGQlEyaERMR2xDUVVGSkxFTkJRVU1zVlVGQlZTeERRVUZETEVWQlFVVXNSVUZCUlN4VlFVRkRMRWRCUVZFN1dVRkRla0lzU1VGQlNTeEhRVUZITzJkQ1FVRkZMRTlCUVU4c1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzFsQlF6VkNMRTlCUVU4c1QwRkJUeXhGUVVGRkxFTkJRVU03VVVGRGNrSXNRMEZCUXl4RFFVRkRMRU5CUVVFN1NVRkRUaXhEUVVGRExFTkJRVU1zUTBGQlFUdEpRVU5HTEU5QlFVOHNRMEZCUXl4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFOUJRVXNzUTBGQlFTeERRVUZETEZWQlFVTXNSMEZCVVR0UlFVTXpRaXhQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMGxCUTNaQ0xFTkJRVU1zUTBGQlF5eERRVUZETzBGQlExQXNRMEZCUXl4RFFVRkJPMEZCY1VOaExHZEVRVUZyUWp0QlFXNURhRU1zU1VGQlRTeHRRa0ZCYlVJc1IwRkJSeXhKUVVGSkxFdEJRVXNzUTBGQlF5eHpRa0ZCYzBJc1EwRkJReXhEUVVGRE8wRkJiVU0xUWl4clJFRkJiVUk3UVVGcVEzSkVMRTFCUVUwc1EwRkJReXhYUVVGWExFVkJRVVVzVlVGQlV5eEpRVUZKTzBsQlJUZENMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zVDBGQlR5eERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRPMGxCUXpkQ0xHRkJRVWtzUTBGQlF5eEZRVUZGTEVOQlFVTXNWMEZCVnl4RlFVRkZPMUZCUTJwQ0xFOUJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zUTBGQlF6dFJRVU01UWl4SlFVRkpMRVZCUVVVc1EwRkJRenRKUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZETzBGQlExQXNRMEZCUXl4RFFVRkRMRU5CUVVNN1FVRkRTQ3hWUVVGVkxFTkJRVU1zVlVGQlZTeEZRVUZGTEZWQlFWTXNTVUZCU1R0SlFVVm9ReXhyUWtGQmEwSXNSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhqUVVGTkxFOUJRVUVzU1VGQlNTeEZRVUZGTEVWQlFVNHNRMEZCVFN4RFFVRkRMRU5CUVVNN1FVRkROVU1zUTBGQlF5eERRVUZETEVOQlFVTTdRVUZEU0N4TFFVRkxMRU5CUVVNc1YwRkJWeXhGUVVGRkxGVkJRVk1zU1VGQlNUdEpRVVUxUWl4clFrRkJhMElzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXp0UlFVTjBRaXhQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEhGQ1FVRnhRaXhEUVVGRExFTkJRVU03VVVGRGJrTXNZVUZCU1N4RFFVRkRMRXRCUVVzc1JVRkJSU3hEUVVGRE8xRkJRMklzU1VGQlNTeEZRVUZGTEVOQlFVTTdTVUZEV0N4RFFVRkRMRU5CUVVNc1EwRkJRenRCUVVOUUxFTkJRVU1zUTBGQlF5eERRVUZCTzBGQlMwWXNUMEZCVHl4RFFVRkRMR2xDUVVGcFFpeERRVUZETEVOQlFVTTdRVUZETTBJc1QwRkJUeXhEUVVGRExIZENRVUYzUWl4RFFVRkRMRU5CUVVNN1FVRkhiRU1zVDBGQlR5eERRVUZETERaQ1FVRTJRaXhEUVVGRExFTkJRVU03UVVGRGRrTXNUMEZCVHl4RFFVRkRMRFpDUVVFMlFpeERRVUZETEVOQlFVTTdRVUZEZGtNc1QwRkJUeXhEUVVGRExHZERRVUZuUXl4RFFVRkRMRU5CUVVNN1FVRkRNVU1zVDBGQlR5eERRVUZETEdkRFFVRm5ReXhEUVVGRExFTkJRVU1pZlE9PSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciByZXF1ZXN0ID0gcmVxdWlyZShcInN1cGVydGVzdFwiKTtcbnZhciBiY3J5cHRqc18xID0gcmVxdWlyZShcImJjcnlwdGpzXCIpO1xudmFyIF9fMSA9IHJlcXVpcmUoXCIuLi9cIik7XG52YXIgVXNlcl8xID0gcmVxdWlyZShcIi4uLy4uL3NyYy9zZXJ2ZXIvbW9kZWxzL1VzZXJcIik7XG52YXIgY2hhaV8xID0gcmVxdWlyZShcImNoYWlcIik7XG52YXIgc2Vzc2lvbiA9IHJlcXVpcmUoJ3N1cGVydGVzdC1zZXNzaW9uJyk7XG5kZXNjcmliZSgnQXV0aCBDb250cm9sbGVyJywgZnVuY3Rpb24gKCkge1xuICAgIGRlc2NyaWJlKCdQT1NUIC9hcGkvdjEvbG9naW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIF9fMS5kcm9wQWxsQ29sbGVjdGlvbnMoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdXNlciA9IG5ldyBVc2VyXzFbXCJkZWZhdWx0XCJdKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0FkcmlhbicsXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBiY3J5cHRqc18xLmhhc2hTeW5jKCd0ZXN0JyksXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6ICd1c2VyJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB1c2VyLnNhdmUoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7IHJldHVybiBkb25lKCk7IH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgbG9naW4gdGhlIHVzZXInLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL2xvZ2luJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICAgICAgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJ3Rlc3QnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwKVxuICAgICAgICAgICAgICAgIC5lbmQoZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgbG9nZ2VkLWluIHVzZXIgZGV0YWlscycsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgICAgICBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAndGVzdCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgyMDApXG4gICAgICAgICAgICAgICAgLmVuZChmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIHZhciBqc29uID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChqc29uLmVtYWlsLCAndGVzdEB0ZXN0LmNvbScpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwoanNvbi5yb2xlLCAndXNlcicpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwoanNvbi5uYW1lLCAnQWRyaWFuJyk7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBhbiBlcnJvciBpZiB0aGUgZW1haWwgZG9lcyBub3QgZXhpc3QnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL2xvZ2luJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICAgICAgZW1haWw6ICd0ZXN0LmRvZXMubm90LmV4aXRAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAndGVzdCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDEpXG4gICAgICAgICAgICAgICAgLmVuZChmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIHZhciBqc29uID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChqc29uLmVycm9yLCAnSW52YWxpZCBlbWFpbCBvciBwYXNzd29yZCcpO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYW4gZXJyb3IgaWYgdGhlIHBhc3N3b3JkIGRvZXMgbm90IG1hdGNoIHRoZSBoYXNoJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS9sb2dpbicpXG4gICAgICAgICAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgICAgIGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICd0ZXN0LWludmFsaWQtcGFzc3dvcmQnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAxKVxuICAgICAgICAgICAgICAgIC5lbmQoZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICB2YXIganNvbiA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwoanNvbi5lcnJvciwgJ0ludmFsaWQgZW1haWwgb3IgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGFuIGVycm9yIGlmIHRoZSBlbWFpbCBvciBwYXNzd29yZCBpcyBtaXNzaW5nJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS9sb2dpbicpXG4gICAgICAgICAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAndGVzdCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDApXG4gICAgICAgICAgICAgICAgLmVuZChmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIHZhciBqc29uID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChqc29uLmVycm9yLCAnUGxlYXNlIHN1cHBseSBhbiBlbWFpbCBhbmQgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL2xvZ2luJylcbiAgICAgICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nIH0pXG4gICAgICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwKVxuICAgICAgICAgICAgICAgICAgICAuZW5kKGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGpzb24gPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChqc29uLmVycm9yLCAnUGxlYXNlIHN1cHBseSBhbiBlbWFpbCBhbmQgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBhbiBlcnJvciBpZiB0aGUgZW1haWwgaXMgbm90IHZhbGlkJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcCkucG9zdCgnL2FwaS92MS9sb2dpbicpXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ25vdCBhbiBlbWFpbEBhc2RmJywgcGFzc3dvcmQ6ICcxMjM0JyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwKVxuICAgICAgICAgICAgICAgIC5lbmQoZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICB2YXIganNvbiA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwoanNvbi5lcnJvciwgJ05vdCBhIHZhbGlkIGVtYWlsIGFkZHJlc3MnKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ1BPU1QgL2FwaS92MS9yZWdpc3RlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgX18xLmRyb3BBbGxDb2xsZWN0aW9ucygpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9uZSgpOyB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmVnaXN0ZXIgYSB1c2VyJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcCkucG9zdCgnL2FwaS92MS9yZWdpc3RlcicpXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nLCBwYXNzd29yZDogJ3Rlc3QnIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgyMDApXG4gICAgICAgICAgICAgICAgLmVuZChmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIFVzZXJfMVtcImRlZmF1bHRcIl0uZmluZEJ5RW1haWwoJ3Rlc3RAdGVzdC5jb20nKS5leGVjKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZmFpbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgY3JlYXRlIGFuIGFkbWluIHVzZXIgaWYgbm8gdXNlcnMgZXhpc3QnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKS5wb3N0KCcvYXBpL3YxL3JlZ2lzdGVyJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsIHBhc3N3b3JkOiAndGVzdCcgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMClcbiAgICAgICAgICAgICAgICAuZW5kKGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgVXNlcl8xW1wiZGVmYXVsdFwiXS5maW5kQnlFbWFpbCgndGVzdEB0ZXN0LmNvbScpLmV4ZWMoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5mYWlsKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbCh1c2VyLnJvbGUsICdhZG1pbicpO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgY3JlYXRlIGEgcmVndWxhciB1c2VyIGlmIHVzZXJzIGV4aXN0JywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHZhciB1ID0gbmV3IFVzZXJfMVtcImRlZmF1bHRcIl0oe1xuICAgICAgICAgICAgICAgIG5hbWU6ICd0ZXN0JyxcbiAgICAgICAgICAgICAgICBlbWFpbDogJ2FkbWluQHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJ3Bhc3N3b3JkJyxcbiAgICAgICAgICAgICAgICByb2xlOiAnYWRtaW4nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHUuc2F2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcCkucG9zdCgnL2FwaS92MS9yZWdpc3RlcicpXG4gICAgICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICd0ZXN0QHRlc3QuY29tJywgcGFzc3dvcmQ6ICd0ZXN0JyB9KVxuICAgICAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMClcbiAgICAgICAgICAgICAgICAgICAgLmVuZChmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIFVzZXJfMVtcImRlZmF1bHRcIl0uZmluZEJ5RW1haWwoJ3Rlc3RAdGVzdC5jb20nKS5leGVjKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5mYWlsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKHVzZXIucm9sZSwgJ3VzZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYW4gZXJyb3IgaWYgZW1haWwgb3IgcGFzc3dvcmQgbm90IHByb3ZpZGVkJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcCkucG9zdCgnL2FwaS92MS9yZWdpc3RlcicpXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDApXG4gICAgICAgICAgICAgICAgLmVuZChmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIHZhciBqc29uID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChqc29uLmVycm9yLCAnUGxlYXNlIHN1cHBseSBhbiBlbWFpbCBhbmQgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApLnBvc3QoJy9hcGkvdjEvcmVnaXN0ZXInKVxuICAgICAgICAgICAgICAgICAgICAuc2VuZCh7IHBhc3N3b3JkOiAnMTIzJyB9KVxuICAgICAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMClcbiAgICAgICAgICAgICAgICAgICAgLmVuZChmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBqc29uID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwoanNvbi5lcnJvciwgJ1BsZWFzZSBzdXBwbHkgYW4gZW1haWwgYW5kIHBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYW4gZXJyb3IgaWYgbm90IGEgdmFsaWQgZW1haWwnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKS5wb3N0KCcvYXBpL3YxL3JlZ2lzdGVyJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAnbm90IGFuIGVtYWlsIEAgYXNkbGZrajtsJywgcGFzc3dvcmQ6ICcxMjM0JyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwKVxuICAgICAgICAgICAgICAgIC5lbmQoZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICB2YXIganNvbiA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwoanNvbi5lcnJvciwgJ05vdCBhIHZhbGlkIGVtYWlsIGFkZHJlc3MnKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ1BPU1QgL2FwaS92MS9sb2dvdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0ZXN0U2Vzc2lvbjtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdGVzdFNlc3Npb24gPSBzZXNzaW9uKF9fMS5hcHApO1xuICAgICAgICAgICAgX18xLmRyb3BBbGxDb2xsZWN0aW9ucygpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciB1c2VyID0gbmV3IFVzZXJfMVtcImRlZmF1bHRcIl0oe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnQWRyaWFuJyxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IGJjcnlwdGpzXzEuaGFzaFN5bmMoJ3Rlc3QnKSxcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogJ3VzZXInLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHVzZXIuc2F2ZSgpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHsgcmV0dXJuIGRvbmUoKTsgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBsb2cgb3V0IHRoZSB1c2VyJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHRlc3RTZXNzaW9uLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICd0ZXN0QHRlc3QuY29tJywgcGFzc3dvcmQ6ICd0ZXN0JyB9KS5lbmQoZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgdGVzdFNlc3Npb24uZ2V0KCcvYXBpL3YxL3VzZXInKS5zZW5kKCkuZXhwZWN0KDIwMCkuZW5kKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHRlc3RTZXNzaW9uLmdldCgnL2FwaS92MS9sb2dvdXQnKS5zZW5kKCkuZXhwZWN0KDIwMCkuZW5kKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlc3RTZXNzaW9uLmdldCgnL2FwaS92MS91c2VyJykuc2VuZCgpLmV4cGVjdCg0MDEpLmVuZChkb25lKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ1BPU1QgL2FwaS92MS92ZXJpZnlFbWFpbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgX18xLmRyb3BBbGxDb2xsZWN0aW9ucygpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9uZSgpOyB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgdmVyaWZ5IGFuIGVtYWlsIGdpdmVuIHRoZSBjb3JyZWN0IHZlcmlmaWNhdGlvbiBsaW5rJyk7XG4gICAgICAgIGl0KCdzaG91bGQgbm90IHZlcmlmeSBhbiBlbWFpbCB3aXRoIGFuIGluY29ycmVjdCB2ZXJpZmljYXRpb24gbGluaycpO1xuICAgIH0pO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lkR1Z6ZEVGMWRHaERiMjUwY205c2JHVnlMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dmRHVnpkSE12YzJWeWRtVnlMM1JsYzNSQmRYUm9RMjl1ZEhKdmJHeGxjaTUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3p0QlFVRkJMRzFEUVVGeFF6dEJRVU55UXl4eFEwRkJiME03UVVGRGNFTXNlVUpCUVRoRE8wRkJRemxETEhGRVFVRXlSRHRCUVVNelJDdzJRa0ZCT0VJN1FVRkZPVUlzU1VGQlRTeFBRVUZQTEVkQlFVY3NUMEZCVHl4RFFVRkRMRzFDUVVGdFFpeERRVUZETEVOQlFVTTdRVUZGTjBNc1VVRkJVU3hEUVVGRExHbENRVUZwUWl4RlFVRkZPMGxCUTNoQ0xGRkJRVkVzUTBGQlF5eHZRa0ZCYjBJc1JVRkJSVHRSUVVNelFpeFZRVUZWTEVOQlFVTXNWVUZCVlN4SlFVRkpPMWxCUTNKQ0xITkNRVUZyUWl4RlFVRkZMRU5CUVVNc1NVRkJTU3hEUVVGRE8yZENRVU4wUWl4SlFVRkpMRWxCUVVrc1IwRkJWU3hKUVVGSkxHbENRVUZKTEVOQlFVTTdiMEpCUTNaQ0xFbEJRVWtzUlVGQlJTeFJRVUZSTzI5Q1FVTmtMRXRCUVVzc1JVRkJSU3hsUVVGbE8yOUNRVU4wUWl4UlFVRlJMRVZCUVVVc2JVSkJRVkVzUTBGQlF5eE5RVUZOTEVOQlFVTTdiMEpCUXpGQ0xFbEJRVWtzUlVGQlJTeE5RVUZOTzJsQ1FVTm1MRU5CUVVNc1EwRkJRenRuUWtGRFNDeEpRVUZKTEVOQlFVTXNTVUZCU1N4RlFVRkZMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVU1zU1VGQlZ5eEpRVUZMTEU5QlFVRXNTVUZCU1N4RlFVRkZMRVZCUVU0c1EwRkJUU3hEUVVGRExFTkJRVU1zVDBGQlN5eERRVUZCTEVOQlFVTXNWVUZCUXl4SFFVRlJPMjlDUVVOeVJDeE5RVUZOTEVkQlFVY3NRMEZCUXp0blFrRkRaQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU5RTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTFBc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEZRVUZGTEVOQlFVTXNkVUpCUVhWQ0xFVkJRVVVzVlVGQlV5eEpRVUZKTzFsQlEzSkRMRTlCUVU4c1EwRkJReXhQUVVGSExFTkJRVU03YVVKQlExQXNTVUZCU1N4RFFVRkRMR1ZCUVdVc1EwRkJRenRwUWtGRGNrSXNTVUZCU1N4RFFVRkRPMmRDUVVOR0xFdEJRVXNzUlVGQlJTeGxRVUZsTzJkQ1FVTjBRaXhSUVVGUkxFVkJRVVVzVFVGQlRUdGhRVU51UWl4RFFVRkRPMmxDUVVORUxFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTTdhVUpCUTFnc1IwRkJSeXhEUVVGRExGVkJRVU1zUjBGQlVUdG5Ra0ZEVml4SlFVRkpMRWRCUVVjN2IwSkJRMGdzVDBGQlR5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1owSkJRM0pDTEVsQlFVa3NSVUZCUlN4RFFVRkRPMWxCUTFnc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFdDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXd3UTBGQk1FTXNSVUZCUlN4VlFVRlRMRWxCUVVrN1dVRkRlRVFzVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXp0cFFrRkRVQ3hKUVVGSkxFTkJRVU1zWlVGQlpTeERRVUZETzJsQ1FVTnlRaXhKUVVGSkxFTkJRVU03WjBKQlEwWXNTMEZCU3l4RlFVRkZMR1ZCUVdVN1owSkJRM1JDTEZGQlFWRXNSVUZCUlN4TlFVRk5PMkZCUTI1Q0xFTkJRVU03YVVKQlEwUXNUVUZCVFN4RFFVRkRMRWRCUVVjc1EwRkJRenRwUWtGRFdDeEhRVUZITEVOQlFVTXNWVUZCUXl4SFFVRlJMRVZCUVVVc1IwRkJjVUk3WjBKQlEycERMRWxCUVVrc1IwRkJSenR2UWtGRFNDeFBRVUZQTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRuUWtGRGNrSXNTVUZCU1N4SlFVRkpMRWRCUVZFc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1owSkJRM0pETEdGQlFVMHNRMEZCUXl4WFFVRlhMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUlVGQlJTeGxRVUZsTEVOQlFVTXNRMEZCUXp0blFrRkRhRVFzWVVGQlRTeERRVUZETEZkQlFWY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hGUVVGRkxFMUJRVTBzUTBGQlF5eERRVUZETzJkQ1FVTjBReXhoUVVGTkxFTkJRVU1zVjBGQlZ5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRVZCUVVVc1VVRkJVU3hEUVVGRExFTkJRVU03WjBKQlEzaERMRWxCUVVrc1JVRkJSU3hEUVVGRE8xbEJRMWdzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEV0N4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5eHZSRUZCYjBRc1JVRkJSU3hWUVVGVExFbEJRVWs3V1VGRGJFVXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJRenRwUWtGRFVDeEpRVUZKTEVOQlFVTXNaVUZCWlN4RFFVRkRPMmxDUVVOeVFpeEpRVUZKTEVOQlFVTTdaMEpCUTBZc1MwRkJTeXhGUVVGRkxEWkNRVUUyUWp0blFrRkRjRU1zVVVGQlVTeEZRVUZGTEUxQlFVMDdZVUZEYmtJc1EwRkJRenRwUWtGRFJDeE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRPMmxDUVVOWUxFZEJRVWNzUTBGQlF5eFZRVUZETEVkQlFWRXNSVUZCUlN4SFFVRnhRanRuUWtGRGFrTXNTVUZCU1N4SFFVRkhPMjlDUVVOSUxFOUJRVThzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMmRDUVVOeVFpeEpRVUZKTEVsQlFVa3NSMEZCVVN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0blFrRkRja01zWVVGQlRTeERRVUZETEZkQlFWY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhGUVVGRkxESkNRVUV5UWl4RFFVRkRMRU5CUVVNN1owSkJRelZFTEVsQlFVa3NSVUZCUlN4RFFVRkRPMWxCUTFnc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFdDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXhuUlVGQlowVXNSVUZCUlN4VlFVRlRMRWxCUVVrN1dVRkRPVVVzVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXp0cFFrRkRVQ3hKUVVGSkxFTkJRVU1zWlVGQlpTeERRVUZETzJsQ1FVTnlRaXhKUVVGSkxFTkJRVU03WjBKQlEwWXNTMEZCU3l4RlFVRkZMR1ZCUVdVN1owSkJRM1JDTEZGQlFWRXNSVUZCUlN4MVFrRkJkVUk3WVVGRGNFTXNRMEZCUXp0cFFrRkRSQ3hOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETzJsQ1FVTllMRWRCUVVjc1EwRkJReXhWUVVGRExFZEJRVkVzUlVGQlJTeEhRVUZ4UWp0blFrRkRha01zU1VGQlNTeEhRVUZITzI5Q1FVTklMRTlCUVU4c1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzJkQ1FVTnlRaXhKUVVGSkxFbEJRVWtzUjBGQlVTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dG5Ra0ZEY2tNc1lVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RlFVRkZMREpDUVVFeVFpeERRVUZETEVOQlFVTTdaMEpCUXpWRUxFbEJRVWtzUlVGQlJTeERRVUZETzFsQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRXQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl3MFJFRkJORVFzUlVGQlJTeFZRVUZUTEVsQlFVazdXVUZETVVVc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF6dHBRa0ZEVUN4SlFVRkpMRU5CUVVNc1pVRkJaU3hEUVVGRE8ybENRVU55UWl4SlFVRkpMRU5CUVVNN1owSkJRMFlzVVVGQlVTeEZRVUZGTEUxQlFVMDdZVUZEYmtJc1EwRkJRenRwUWtGRFJDeE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRPMmxDUVVOWUxFZEJRVWNzUTBGQlF5eFZRVUZETEVkQlFWRXNSVUZCUlN4SFFVRnhRanRuUWtGRGFrTXNTVUZCU1N4SFFVRkhPMjlDUVVOSUxFOUJRVThzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMmRDUVVOeVFpeEpRVUZKTEVsQlFVa3NSMEZCVVN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0blFrRkRja01zWVVGQlRTeERRVUZETEZkQlFWY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhGUVVGRkxIRkRRVUZ4UXl4RFFVRkRMRU5CUVVNN1owSkJRM1JGTEU5QlFVOHNRMEZCUXl4UFFVRkhMRU5CUVVNN2NVSkJRMUFzU1VGQlNTeERRVUZETEdWQlFXVXNRMEZCUXp0eFFrRkRja0lzU1VGQlNTeERRVUZETEVWQlFVTXNTMEZCU3l4RlFVRkZMR1ZCUVdVc1JVRkJReXhEUVVGRE8zRkNRVU01UWl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRE8zRkNRVU5ZTEVkQlFVY3NRMEZCUXl4VlFVRkRMRWRCUVZFc1JVRkJSU3hIUVVGeFFqdHZRa0ZEYWtNc1NVRkJTU3hIUVVGSE8zZENRVU5JTEU5QlFVOHNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8yOUNRVU55UWl4SlFVRkpMRWxCUVVrc1IwRkJVU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenR2UWtGRGNrTXNZVUZCVFN4RFFVRkRMRmRCUVZjc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eEZRVUZGTEhGRFFVRnhReXhEUVVGRExFTkJRVU03YjBKQlEzUkZMRWxCUVVrc1JVRkJSU3hEUVVGRE8yZENRVU5ZTEVOQlFVTXNRMEZCUXl4RFFVRkJPMWxCUTFZc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFdDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXhyUkVGQmEwUXNSVUZCUlN4VlFVRlRMRWxCUVVrN1dVRkRhRVVzVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhsUVVGbExFTkJRVU03YVVKQlF6ZENMRWxCUVVrc1EwRkJReXhGUVVGRExFdEJRVXNzUlVGQlJTeHRRa0ZCYlVJc1JVRkJSU3hSUVVGUkxFVkJRVVVzVFVGQlRTeEZRVUZETEVOQlFVTTdhVUpCUTNCRUxFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTTdhVUpCUTFnc1IwRkJSeXhEUVVGRExGVkJRVU1zUjBGQlVTeEZRVUZGTEVkQlFYRkNPMmRDUVVOcVF5eEpRVUZKTEVkQlFVYzdiMEpCUTBnc1QwRkJUeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTTdaMEpCUTNKQ0xFbEJRVWtzU1VGQlNTeEhRVUZSTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzJkQ1FVTnlReXhoUVVGTkxFTkJRVU1zVjBGQlZ5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRVZCUVVVc01rSkJRVEpDTEVOQlFVTXNRMEZCUXp0blFrRkROVVFzU1VGQlNTeEZRVUZGTEVOQlFVTTdXVUZEV0N4RFFVRkRMRU5CUVVNc1EwRkJRVHRSUVVOV0xFTkJRVU1zUTBGQlF5eERRVUZETzBsQlExQXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRTQ3hSUVVGUkxFTkJRVU1zZFVKQlFYVkNMRVZCUVVVN1VVRkRPVUlzVlVGQlZTeERRVUZETEZWQlFWVXNTVUZCU1R0WlFVTnlRaXh6UWtGQmEwSXNSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhqUVVGTkxFOUJRVUVzU1VGQlNTeEZRVUZGTEVWQlFVNHNRMEZCVFN4RFFVRkRMRU5CUVVNN1VVRkROVU1zUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4RlFVRkZMRU5CUVVNc2QwSkJRWGRDTEVWQlFVVXNWVUZCVXl4SlFVRkpPMWxCUTNSRExFOUJRVThzUTBGQlF5eFBRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc2EwSkJRV3RDTEVOQlFVTTdhVUpCUTJoRExFbEJRVWtzUTBGQlF5eEZRVUZETEV0QlFVc3NSVUZCUlN4bFFVRmxMRVZCUVVVc1VVRkJVU3hGUVVGRkxFMUJRVTBzUlVGQlF5eERRVUZETzJsQ1FVTm9SQ3hOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETzJsQ1FVTllMRWRCUVVjc1EwRkJReXhWUVVGRExFZEJRVkVzUlVGQlJTeEhRVUZ4UWp0blFrRkRha01zU1VGQlJ5eEhRVUZITzI5Q1FVRkZMRTlCUVU4c1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzJkQ1FVTjZRaXhwUWtGQlNTeERRVUZETEZkQlFWY3NRMEZCUXl4bFFVRmxMRU5CUVVNc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUXl4SlFVRlhPMjlDUVVOMFJDeEpRVUZKTEVOQlFVTXNTVUZCU1N4RlFVRkZPM2RDUVVOUUxHRkJRVTBzUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXp0M1FrRkRaQ3hQUVVGUExFbEJRVWtzUlVGQlJTeERRVUZETzNGQ1FVTnFRanR2UWtGRFJDeEpRVUZKTEVWQlFVVXNRMEZCUXp0blFrRkRXQ3hEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZMTEVOQlFVRXNRMEZCUXl4VlFVRkRMRWRCUVZFN2IwSkJRMlFzVDBGQlR5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1owSkJRM0pDTEVOQlFVTXNRMEZCUXl4RFFVRkJPMWxCUTA0c1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFdDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXdyUTBGQkswTXNSVUZCUlN4VlFVRlZMRWxCUVVrN1dVRkRPVVFzVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhyUWtGQmEwSXNRMEZCUXp0cFFrRkRhRU1zU1VGQlNTeERRVUZETEVWQlFVVXNTMEZCU3l4RlFVRkZMR1ZCUVdVc1JVRkJSU3hSUVVGUkxFVkJRVVVzVFVGQlRTeEZRVUZGTEVOQlFVTTdhVUpCUTJ4RUxFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTTdhVUpCUTFnc1IwRkJSeXhEUVVGRExGVkJRVU1zUjBGQlVTeEZRVUZGTEVkQlFYRkNPMmRDUVVOcVF5eEpRVUZKTEVkQlFVYzdiMEpCUVVVc1QwRkJUeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTTdaMEpCUXpGQ0xHbENRVUZKTEVOQlFVTXNWMEZCVnl4RFFVRkRMR1ZCUVdVc1EwRkJReXhEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRkRMRWxCUVZjN2IwSkJRM1JFTEVsQlFVa3NRMEZCUXl4SlFVRkpMRVZCUVVVN2QwSkJRMUFzWVVGQlRTeERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRPM0ZDUVVOcVFqdHZRa0ZEUkN4aFFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVXNUMEZCVHl4RFFVRkRMRU5CUVVNN2IwSkJRM1pETEVsQlFVa3NSVUZCUlN4RFFVRkRPMmRDUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVc3NRMEZCUVN4RFFVRkRMRlZCUVVNc1IwRkJVVHR2UWtGRFpDeFBRVUZQTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRuUWtGRGNrSXNRMEZCUXl4RFFVRkRMRU5CUVVFN1dVRkRUaXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5ZTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1JVRkJSU3hEUVVGRExEWkRRVUUyUXl4RlFVRkZMRlZCUVZNc1NVRkJTVHRaUVVNelJDeEpRVUZKTEVOQlFVTXNSMEZCUnl4SlFVRkpMR2xDUVVGSkxFTkJRVU03WjBKQlEySXNTVUZCU1N4RlFVRkZMRTFCUVUwN1owSkJRMW9zUzBGQlN5eEZRVUZGTEdkQ1FVRm5RanRuUWtGRGRrSXNVVUZCVVN4RlFVRkZMRlZCUVZVN1owSkJRM0JDTEVsQlFVa3NSVUZCUlN4UFFVRlBPMkZCUTJoQ0xFTkJRVU1zUTBGQlFUdFpRVU5HTEVOQlFVTXNRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU03WjBKQlExWXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eHJRa0ZCYTBJc1EwRkJRenR4UWtGRGFFTXNTVUZCU1N4RFFVRkRMRVZCUVVVc1MwRkJTeXhGUVVGRkxHVkJRV1VzUlVGQlJTeFJRVUZSTEVWQlFVVXNUVUZCVFN4RlFVRkZMRU5CUVVNN2NVSkJRMnhFTEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNN2NVSkJRMWdzUjBGQlJ5eERRVUZETEZWQlFVTXNSMEZCVVN4RlFVRkZMRWRCUVhGQ08yOUNRVU5xUXl4SlFVRkpMRWRCUVVjN2QwSkJRVVVzVDBGQlR5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN2IwSkJRekZDTEdsQ1FVRkpMRU5CUVVNc1YwRkJWeXhEUVVGRExHVkJRV1VzUTBGQlF5eERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGRExFbEJRVmM3ZDBKQlEzUkVMRWxCUVVrc1EwRkJReXhKUVVGSkxFVkJRVVU3TkVKQlExQXNZVUZCVFN4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRE8zbENRVU5xUWp0M1FrRkRSQ3hoUVVGTkxFTkJRVU1zVjBGQlZ5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRVZCUVVVc1RVRkJUU3hEUVVGRExFTkJRVU03ZDBKQlEzUkRMRWxCUVVrc1JVRkJSU3hEUVVGRE8yOUNRVU5ZTEVOQlFVTXNRMEZCUXl4RFFVRkRMRTlCUVVzc1EwRkJRU3hEUVVGRExGVkJRVU1zUjBGQlVUdDNRa0ZEWkN4UFFVRlBMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dHZRa0ZEY2tJc1EwRkJReXhEUVVGRExFTkJRVUU3WjBKQlEwNHNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRXQ3hEUVVGRExFTkJRVU1zUTBGQlFUdFJRVU5PTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1JVRkJSU3hEUVVGRExEQkVRVUV3UkN4RlFVRkZMRlZCUVZNc1NVRkJTVHRaUVVONFJTeFBRVUZQTEVOQlFVTXNUMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExHdENRVUZyUWl4RFFVRkRPMmxDUVVOb1F5eEpRVUZKTEVOQlFVTXNSVUZCUlN4TFFVRkxMRVZCUVVVc1pVRkJaU3hGUVVGRkxFTkJRVU03YVVKQlEyaERMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU03YVVKQlExZ3NSMEZCUnl4RFFVRkRMRlZCUVVNc1IwRkJVU3hGUVVGRkxFZEJRWEZDTzJkQ1FVTnFReXhKUVVGSkxFZEJRVWM3YjBKQlFVVXNUMEZCVHl4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU03WjBKQlF6RkNMRWxCUVVrc1NVRkJTU3hIUVVGUkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8yZENRVU55UXl4aFFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVWQlFVVXNjVU5CUVhGRExFTkJRVU1zUTBGQlF6dG5Ra0ZEZEVVc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4clFrRkJhMElzUTBGQlF6dHhRa0ZEYUVNc1NVRkJTU3hEUVVGRExFVkJRVU1zVVVGQlVTeEZRVUZGTEV0QlFVc3NSVUZCUXl4RFFVRkRPM0ZDUVVOMlFpeE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRPM0ZDUVVOWUxFZEJRVWNzUTBGQlF5eFZRVUZETEVkQlFWRXNSVUZCUlN4SFFVRnhRanR2UWtGRGFrTXNTVUZCUnl4SFFVRkhPM2RDUVVGRkxFOUJRVThzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMjlDUVVONlFpeEpRVUZKTEVsQlFVa3NSMEZCVVN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0dlFrRkRja01zWVVGQlRTeERRVUZETEZkQlFWY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhGUVVGRkxIRkRRVUZ4UXl4RFFVRkRMRU5CUVVNN2IwSkJRM1JGTEVsQlFVa3NSVUZCUlN4RFFVRkRPMmRDUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZETzFsQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRXQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl3MlEwRkJOa01zUlVGQlJTeFZRVUZUTEVsQlFVazdXVUZETTBRc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4clFrRkJhMElzUTBGQlF6dHBRa0ZEYUVNc1NVRkJTU3hEUVVGRExFVkJRVU1zUzBGQlN5eEZRVUZGTERCQ1FVRXdRaXhGUVVGRkxGRkJRVkVzUlVGQlJTeE5RVUZOTEVWQlFVTXNRMEZCUXp0cFFrRkRNMFFzVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXp0cFFrRkRXQ3hIUVVGSExFTkJRVU1zVlVGQlF5eEhRVUZSTEVWQlFVVXNSMEZCY1VJN1owSkJRMnBETEVsQlFVa3NSMEZCUnp0dlFrRkJSU3hQUVVGUExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0blFrRkRNVUlzU1VGQlNTeEpRVUZKTEVkQlFWRXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdaMEpCUTNKRExHRkJRVTBzUTBGQlF5eFhRVUZYTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1JVRkJSU3d5UWtGQk1rSXNRMEZCUXl4RFFVRkRPMmRDUVVNMVJDeEpRVUZKTEVWQlFVVXNRMEZCUXp0WlFVTllMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMWdzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOSUxGRkJRVkVzUTBGQlF5eHhRa0ZCY1VJc1JVRkJSVHRSUVVNMVFpeEpRVUZKTEZkQlFXZENMRU5CUVVNN1VVRkRja0lzVlVGQlZTeERRVUZETEZWQlFWVXNTVUZCU1R0WlFVTnlRaXhYUVVGWExFZEJRVWNzVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXl4RFFVRkRPMWxCUXpOQ0xITkNRVUZyUWl4RlFVRkZMRU5CUVVNc1NVRkJTU3hEUVVGRE8yZENRVU4wUWl4SlFVRkpMRWxCUVVrc1IwRkJWU3hKUVVGSkxHbENRVUZKTEVOQlFVTTdiMEpCUTNaQ0xFbEJRVWtzUlVGQlJTeFJRVUZSTzI5Q1FVTmtMRXRCUVVzc1JVRkJSU3hsUVVGbE8yOUNRVU4wUWl4UlFVRlJMRVZCUVVVc2JVSkJRVkVzUTBGQlF5eE5RVUZOTEVOQlFVTTdiMEpCUXpGQ0xFbEJRVWtzUlVGQlJTeE5RVUZOTzJsQ1FVTm1MRU5CUVVNc1EwRkJRenRuUWtGRFNDeEpRVUZKTEVOQlFVTXNTVUZCU1N4RlFVRkZMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVU1zU1VGQlZ5eEpRVUZMTEU5QlFVRXNTVUZCU1N4RlFVRkZMRVZCUVU0c1EwRkJUU3hEUVVGRExFTkJRVU1zVDBGQlN5eERRVUZCTEVOQlFVTXNWVUZCUXl4SFFVRlJPMjlDUVVOeVJDeE5RVUZOTEVkQlFVY3NRMEZCUXp0blFrRkRaQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU5RTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTFBc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEZRVUZGTEVOQlFVTXNlVUpCUVhsQ0xFVkJRVVVzVlVGQlV5eEpRVUZKTzFsQlEzWkRMRmRCUVZjc1EwRkJReXhKUVVGSkxFTkJRVU1zWlVGQlpTeERRVUZETzJsQ1FVTTFRaXhKUVVGSkxFTkJRVU1zUlVGQlF5eExRVUZMTEVWQlFVVXNaVUZCWlN4RlFVRkZMRkZCUVZFc1JVRkJSU3hOUVVGTkxFVkJRVU1zUTBGQlF5eERRVUZETEVkQlFVY3NRMEZCUXl4VlFVRkRMRWRCUVZFN1owSkJRek5FTEVsQlFVa3NSMEZCUnp0dlFrRkJSU3hQUVVGUExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0blFrRkRNVUlzVjBGQlZ5eERRVUZETEVkQlFVY3NRMEZCUXl4alFVRmpMRU5CUVVNc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1IwRkJSeXhEUVVGRExGVkJRVU1zUjBGQlVUdHZRa0ZETlVRc1NVRkJTU3hIUVVGSE8zZENRVUZGTEU5QlFVOHNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8yOUNRVU14UWl4WFFVRlhMRU5CUVVNc1IwRkJSeXhEUVVGRExHZENRVUZuUWl4RFFVRkRMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRWRCUVVjc1EwRkJReXhWUVVGRExFZEJRVkU3ZDBKQlF6bEVMRWxCUVVrc1IwRkJSenMwUWtGQlJTeFBRVUZQTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenQzUWtGRE1VSXNWMEZCVnl4RFFVRkRMRWRCUVVjc1EwRkJReXhqUVVGakxFTkJRVU1zUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMjlDUVVOcVJTeERRVUZETEVOQlFVTXNRMEZCUVR0blFrRkRUaXhEUVVGRExFTkJRVU1zUTBGQlFUdFpRVU5PTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTFnc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFVDeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTklMRkZCUVZFc1EwRkJReXd3UWtGQk1FSXNSVUZCUlR0UlFVTnFReXhWUVVGVkxFTkJRVU1zVlVGQlZTeEpRVUZKTzFsQlEzSkNMSE5DUVVGclFpeEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMR05CUVUwc1QwRkJRU3hKUVVGSkxFVkJRVVVzUlVGQlRpeERRVUZOTEVOQlFVTXNRMEZCUXp0UlFVTTFReXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl3MFJFRkJORVFzUTBGQlF5eERRVUZETzFGQlEycEZMRVZCUVVVc1EwRkJReXhuUlVGQlowVXNRMEZCUXl4RFFVRkRPMGxCUTNwRkxFTkJRVU1zUTBGQlF5eERRVUZETzBGQlExQXNRMEZCUXl4RFFVRkRMRU5CUVVNaWZRPT0iLCIvLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lkR1Z6ZEVOb1lXNXVaV3hEYjI1MGNtOXNiR1Z5TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dkxpNHZkR1Z6ZEhNdmMyVnlkbVZ5TDNSbGMzUkRhR0Z1Ym1Wc1EyOXVkSEp2Ykd4bGNpNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lJbjA9IiwiLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pZEdWemRFMWxjM05oWjJWRGIyNTBjbTlzYkdWeUxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZMaTR2ZEdWemRITXZjMlZ5ZG1WeUwzUmxjM1JOWlhOellXZGxRMjl1ZEhKdmJHeGxjaTUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pSW4wPSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciByZXF1ZXN0ID0gcmVxdWlyZShcInN1cGVydGVzdFwiKTtcbnZhciBiY3J5cHRqc18xID0gcmVxdWlyZShcImJjcnlwdGpzXCIpO1xudmFyIGNoYWlfMSA9IHJlcXVpcmUoXCJjaGFpXCIpO1xudmFyIF9fMSA9IHJlcXVpcmUoXCIuLi9cIik7XG52YXIgVXNlcl8xID0gcmVxdWlyZShcIi4uLy4uL3NyYy9zZXJ2ZXIvbW9kZWxzL1VzZXJcIik7XG5kZXNjcmliZSgnVXNlciBDb250cm9sbGVyJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciB0b2tlbjtcbiAgICB2YXIgdXNlckluZm8gPSB7XG4gICAgICAgIG5hbWU6ICdBZHJpYW4nLFxuICAgICAgICBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nLFxuICAgICAgICBwYXNzd29yZDogJ3Rlc3QnLFxuICAgICAgICByb2xlOiAnYWRtaW4nXG4gICAgfTtcbiAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgIF9fMS5kcm9wQWxsQ29sbGVjdGlvbnMoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB1c2VyID0gbmV3IFVzZXJfMVtcImRlZmF1bHRcIl0oe1xuICAgICAgICAgICAgICAgIG5hbWU6IHVzZXJJbmZvLm5hbWUsXG4gICAgICAgICAgICAgICAgZW1haWw6IHVzZXJJbmZvLmVtYWlsLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBiY3J5cHRqc18xLmhhc2hTeW5jKHVzZXJJbmZvLnBhc3N3b3JkKSxcbiAgICAgICAgICAgICAgICByb2xlOiB1c2VySW5mby5yb2xlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB1c2VyLnNhdmUoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS9sb2dpbicpXG4gICAgICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6IHVzZXJJbmZvLmVtYWlsLCBwYXNzd29yZDogdXNlckluZm8ucGFzc3dvcmQgfSlcbiAgICAgICAgICAgICAgICAgICAgLmV4cGVjdCgyMDApXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gcmVzLmdldCgneC1hY2Nlc3MtdG9rZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc05vdE51bGwodG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzU3RyaW5nKHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc05vdEVtcHR5KHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdHRVQgL2FwaS92MS91c2VyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpdCgnc2hvdWxkIGZldGNoIHRoZSBsb2dnZWQgaW4gdXNlcicsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLmdldCgnL2FwaS92MS91c2VyJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwLCBmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwocmVzLmJvZHkubmFtZSwgdXNlckluZm8ubmFtZSk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChyZXMuYm9keS5lbWFpbCwgdXNlckluZm8uZW1haWwpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwocmVzLmJvZHkucm9sZSwgdXNlckluZm8ucm9sZSk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5ub3RQcm9wZXJ0eShyZXMuYm9keSwgJ3Bhc3N3b3JkJyk7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgbm90IGxvZ2dlZCBpbicsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLmdldCgnL2FwaS92MS91c2VyJylcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMSwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdHRVQgL2FwaS92MS91c2VycycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZWNlaXZlIGEgbGlzdCBvZiB1c2VycycsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLmdldCgnL2FwaS92MS91c2VycycpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMCwgZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChyZXMuYm9keS51c2Vycy5sZW5ndGgsIDEpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaW5jbHVkZShyZXMuYm9keS51c2Vyc1swXSwge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiB1c2VySW5mby5uYW1lLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiB1c2VySW5mby5yb2xlLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogdXNlckluZm8uZW1haWxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0Lm5vdFByb3BlcnR5KHJlcy5ib2R5LnVzZXJzWzBdLCAncGFzc3dvcmQnKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiBub3QgbG9nZ2VkIGluJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAuZ2V0KCcvYXBpL3YxL3VzZXJzJylcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMSwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdHRVQgL2FwaS92MS91c2VyLzplbWFpbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXRyaWV2ZSBhIHVzZXIgYnkgZW1haWwnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5nZXQoJy9hcGkvdjEvdXNlci8nICsgdXNlckluZm8uZW1haWwpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMCwgZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5oYXNBbGxLZXlzKHJlcy5ib2R5LnVzZXIsIFsnZW1haWwnLCAnbmFtZScsICdyb2xlJywgJ19pZCcsICdjcmVhdGVkJ10pO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaW5jbHVkZShyZXMuYm9keS51c2VyLCB7XG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VySW5mby5lbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdXNlckluZm8ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogdXNlckluZm8ucm9sZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiBlbWFpbCBkb2VzIG5vdCBleGlzdCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLmdldCgnL2FwaS92MS91c2VyL25vdC5pbi51c2VAdGVzdC5jb20nKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDAsIGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNTdHJpbmcocmVzLmJvZHkuZXJyb3IpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwocmVzLmJvZHkuZXJyb3IsICdObyB1c2VyIGZvdW5kIHdpdGggdGhhdCBlbWFpbCcpO1xuICAgICAgICAgICAgICAgIGRvbmUoZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIG5vdCBhIHZhbGlkIGVtYWlsJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAuZ2V0KCcvYXBpL3YxL3VzZXIvbm90LWFuLWVtYWlsJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwLCBmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzU3RyaW5nKHJlcy5ib2R5LmVycm9yKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKHJlcy5ib2R5LmVycm9yLCAnUGxlYXNlIHN1cHBseSBhIHZhbGlkIGVtYWlsJyk7XG4gICAgICAgICAgICAgICAgZG9uZShlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdQT1NUIC9hcGkvdjEvdXNlci91cGRhdGUvZW1haWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGl0KFwic2hvdWxkIHVwZGF0ZSB0aGUgbG9nZ2VkIGluIHVzZXIncyBlbWFpbFwiLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdmFyIG5ld0VtYWlsID0gJ25ldy5lbWFpbEB0ZXN0LmNvbSc7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvZW1haWwnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogbmV3RW1haWwgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMCwgZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoJy9hcGkvdjEvdXNlcicpXG4gICAgICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgcmVzLmdldCgneC1hY2Nlc3MtdG9rZW4nKSlcbiAgICAgICAgICAgICAgICAgICAgLmV4cGVjdCgyMDAsIGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKHJlcy5ib2R5Lm5hbWUsIHVzZXJJbmZvLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKHJlcy5ib2R5LmVtYWlsLCBuZXdFbWFpbCk7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwocmVzLmJvZHkucm9sZSwgdXNlckluZm8ucm9sZSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIG5ldyBlbWFpbCBpcyBub3QgdmFsaWQnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL2VtYWlsJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICdub3QgYW4gZW1haWwnIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDAsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIGVtYWlsIGFscmVhZHkgaW4gdXNlJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9lbWFpbCcpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAndGVzdEB0ZXN0LmNvbScgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMCwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgbm90IGF1dGhvcml6ZWQnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL2VtYWlsJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAndGVzdEB0ZXN0LmNvbScgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMSwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdQT1NUIC9hcGkvdjEvdXNlci91cGRhdGUvbmFtZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCB1cGRhdGUgbmFtZScsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICB2YXIgbmV3TmFtZSA9ICduZXcgbmFtZSc7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvbmFtZScpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IG5hbWU6IG5ld05hbWUgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMCwgZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgICAgICAuZ2V0KCcvYXBpL3YxL3VzZXInKVxuICAgICAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHJlcy5nZXQoJ3gtYWNjZXNzLXRva2VuJykpXG4gICAgICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwLCBmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChyZXMuYm9keS5uYW1lLCBuZXdOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChyZXMuYm9keS5lbWFpbCwgdXNlckluZm8uZW1haWwpO1xuICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKHJlcy5ib2R5LnJvbGUsIHVzZXJJbmZvLnJvbGUpO1xuICAgICAgICAgICAgICAgICAgICBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiBub3QgYXV0aG9yaXplZCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICB2YXIgbmV3TmFtZSA9ICduZXcgbmFtZSc7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvbmFtZScpXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBuYW1lOiBuZXdOYW1lIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDEsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnUE9TVCAvYXBpL3YxL3VzZXIvdXBkYXRlL3Bhc3N3b3JkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpdCgnc2hvdWxkIHVwZGF0ZSBwYXNzd29yZCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICB2YXIgbmV3UGFzcyA9ICduZXdwYXNzJztcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9wYXNzd29yZCcpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IG9sZFBhc3M6IHVzZXJJbmZvLnBhc3N3b3JkLCBuZXdQYXNzOiBuZXdQYXNzIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgyMDAsIGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS9sb2dpbicpXG4gICAgICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6IHVzZXJJbmZvLmVtYWlsLCBwYXNzd29yZDogbmV3UGFzcyB9KVxuICAgICAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMCwgZG9uZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCB1cGRhdGluZyBwYXNzd29yZCBpZiBjdXJyZW50IHBhc3N3b3JkIGludmFsaWQnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL3Bhc3N3b3JkJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgb2xkUGFzczogJ3dyb25nIHBhc3N3b3JkJywgbmV3UGFzczogJzEyMzQxMjM0JyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwLCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCB1cGRhdGluZyBwYXNzd29yZCBpZiBub3QgYXV0aG9yaXplZCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvcGFzc3dvcmQnKVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAxLCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ1BPU1QgL2FwaS92MS91c2VyL2NyZWF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5ld1VzZXIgPSB7XG4gICAgICAgICAgICBlbWFpbDogJ3Rlc3QxMjNAdGVzdC5jb20nLFxuICAgICAgICAgICAgbmFtZTogJ05ldyBVc2VyJyxcbiAgICAgICAgICAgIHJvbGU6ICd1c2VyJyxcbiAgICAgICAgfTtcbiAgICAgICAgaXQoJ3Nob3VsZCBjcmVhdGUgYSBuZXcgdXNlcicsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICBVc2VyXzFbXCJkZWZhdWx0XCJdLmZpbmRCeUVtYWlsKG5ld1VzZXIuZW1haWwpLmNvdW50RG9jdW1lbnRzKGZ1bmN0aW9uIChlcnIsIGNvdW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKGNvdW50LCAwLCAnVXNlciBzaG91bGQgbm90IGV4aXN0IHdpdGggZW1haWwgdGVzdDEyM1d0ZXN0LmNvbScpO1xuICAgICAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvdXNlci9jcmVhdGUnKVxuICAgICAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgICAgICAuc2VuZChuZXdVc2VyKVxuICAgICAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMCwgZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICBVc2VyXzFbXCJkZWZhdWx0XCJdLmZpbmRCeUVtYWlsKG5ld1VzZXIuZW1haWwpLmV4ZWMoZnVuY3Rpb24gKGVyciwgdXNlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwSW5jbHVkZSh1c2VyLCBuZXdVc2VyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiB1c2VyIG1ha2luZyByZXF1ZXN0IGlzIG5vdCBhbiBhZG1pbicsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICB2YXIgdXNlciA9IG5ldyBVc2VyXzFbXCJkZWZhdWx0XCJdKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBuZXdVc2VyLm5hbWUsXG4gICAgICAgICAgICAgICAgZW1haWw6IG5ld1VzZXIuZW1haWwsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IGJjcnlwdGpzXzEuaGFzaFN5bmMoJ3Bhc3N3b3JkJyksXG4gICAgICAgICAgICAgICAgcm9sZTogbmV3VXNlci5yb2xlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB1c2VyLnNhdmUoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS9sb2dpbicpXG4gICAgICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6IG5ld1VzZXIuZW1haWwsIHBhc3N3b3JkOiAncGFzc3dvcmQnIH0pXG4gICAgICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwKVxuICAgICAgICAgICAgICAgICAgICAuZW5kKGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IHJlcy5nZXQoJ3gtYWNjZXNzLXRva2VuJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL3VzZXIvY3JlYXRlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMSwgZG9uZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiB1c2VyIGlzIG5vdCBsb2dnZWQgaW4nLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL3VzZXIvY3JlYXRlJylcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMSwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgZW1haWwgaXMgbm90IHZhbGlkJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL2NyZWF0ZScpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICAgICAgZW1haWw6ICdub3QgdmFsaWQnLFxuICAgICAgICAgICAgICAgIG5hbWU6IG5ld1VzZXIubmFtZSxcbiAgICAgICAgICAgICAgICByb2xlOiBuZXdVc2VyLnJvbGVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDAsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIHJvbGUgbm90IHZhbGlkJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL2NyZWF0ZScpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICAgICAgZW1haWw6IG5ld1VzZXIuZW1haWwsXG4gICAgICAgICAgICAgICAgbmFtZTogbmV3VXNlci5uYW1lLFxuICAgICAgICAgICAgICAgIHJvbGU6ICdub3QgdmFsaWQnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwLCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiBlbWFpbCBhZGRyZXNzIGFscmVhZHkgaW4gdXNlJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL2NyZWF0ZScpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICAgICAgZW1haWw6IHVzZXJJbmZvLmVtYWlsLFxuICAgICAgICAgICAgICAgIG5hbWU6IG5ld1VzZXIubmFtZSxcbiAgICAgICAgICAgICAgICByb2xlOiBuZXdVc2VyLnJvbGVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDAsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnUFVUIC9hcGkvdjEvdXNlci91cGRhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBuZXdVc2VySW5mbyA9IHtcbiAgICAgICAgICAgIG5hbWU6ICdOZXcgTmFtZScsXG4gICAgICAgICAgICBlbWFpbDogJ25ld2VtYWlsQHRlc3QuY29tJyxcbiAgICAgICAgICAgIHJvbGU6ICd1c2VyJ1xuICAgICAgICB9O1xuICAgICAgICBpdCgnc2hvdWxkIHVwZGF0ZSB0aGUgdXNlcicsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnB1dCgnL2FwaS92MS91c2VyL3VwZGF0ZScpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiB1c2VySW5mby5lbWFpbCwgdXNlcjogbmV3VXNlckluZm8gfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMCwgZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICBVc2VyXzFbXCJkZWZhdWx0XCJdLmZpbmRCeUVtYWlsKG5ld1VzZXJJbmZvLmVtYWlsKS5leGVjKGZ1bmN0aW9uIChlcnIsIHVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNOb3ROdWxsKHVzZXIpO1xuICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBJbmNsdWRlKHVzZXIsIG5ld1VzZXJJbmZvKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgdXNlciB3aXRoIGVtYWlsIGRvZXMgbm90IGV4aXN0JywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucHV0KCcvYXBpL3YxL3VzZXIvdXBkYXRlJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICdkb2Vzbm90ZXhpc3RAdGVzdC5jb20nLCB1c2VyOiBuZXdVc2VySW5mbyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDA0LCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiBuZXcgZW1haWwgbm90IHZhbGlkJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucHV0KCcvYXBpL3YxL3VzZXIvdXBkYXRlJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgICAgICBlbWFpbDogdXNlckluZm8uZW1haWwsXG4gICAgICAgICAgICAgICAgdXNlcjogT2JqZWN0LmFzc2lnbih7fSwgbmV3VXNlckluZm8sIHsgZW1haWw6ICdub3QgdmFsaWQnIH0pXG4gICAgICAgICAgICB9KS5leHBlY3QoNDAwLCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiByb2xlIG5vdCB2YWxpZCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnB1dCgnL2FwaS92MS91c2VyL3VwZGF0ZScpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICAgICAgZW1haWw6IHVzZXJJbmZvLmVtYWlsLFxuICAgICAgICAgICAgICAgIHVzZXI6IE9iamVjdC5hc3NpZ24oe30sIG5ld1VzZXJJbmZvLCB7IHJvbGU6ICdub3QgdmFsaWQnIH0pXG4gICAgICAgICAgICB9KS5leHBlY3QoNDAwLCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ0RFTEVURSAvYXBpL3YxL3VzZXIvZGVsZXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICB2YXIgdXNlciA9IG5ldyBVc2VyXzFbXCJkZWZhdWx0XCJdKHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnTmV3IE5hbWUnLFxuICAgICAgICAgICAgICAgIGVtYWlsOiAnbmV3ZW1haWxAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgIHJvbGU6ICd1c2VyJyxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJ3Bhc3MnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBpbmFjdGl2ZVVzZXIgPSBuZXcgVXNlcl8xW1wiZGVmYXVsdFwiXSh7XG4gICAgICAgICAgICAgICAgbmFtZTogJ05hbWUnLFxuICAgICAgICAgICAgICAgIGVtYWlsOiAnZGVsZXRlZEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgcm9sZTogJ3VzZXInLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAncGFzc3dvcmQnLFxuICAgICAgICAgICAgICAgIGRlbGV0ZWQ6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHVzZXIuc2F2ZShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICBpbmFjdGl2ZVVzZXIuc2F2ZShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkZWxldGUgdGhlIHVzZXInLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVtcImRlbGV0ZVwiXSgnL2FwaS92MS91c2VyL2RlbGV0ZScpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAnbmV3ZW1haWxAdGVzdC5jb20nIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgyMDAsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIFVzZXJfMVtcImRlZmF1bHRcIl0uZmluZEJ5RW1haWwoJ25ld2VtYWlsQHRlc3QuY29tJykuZXhlYyhmdW5jdGlvbiAoZXJyLCB1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzVHJ1ZSh1c2VyLmRlbGV0ZWQpO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiB0cnlpbmcgdG8gZGVsZXRlIGxvZ2dlZCBpbiB1c2VyJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClbXCJkZWxldGVcIl0oJy9hcGkvdjEvdXNlci9kZWxldGUnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogdXNlckluZm8uZW1haWwgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMCwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgZW1haWwgaW5hY3RpdmUnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVtcImRlbGV0ZVwiXSgnL2FwaS92MS91c2VyL2RlbGV0ZScpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAnZGVsZXRlZEB0ZXN0LmNvbScgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMCwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgZW1haWwgZG9lcyBub3QgZXhpc3QnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVtcImRlbGV0ZVwiXSgnL2FwaS92MS91c2VyL2RlbGV0ZScpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAnbm90cmVhbEB0ZXN0LmNvbScgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwNCwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgZW1haWwgbm90IHByb3ZpZGVkJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClbXCJkZWxldGVcIl0oJy9hcGkvdjEvdXNlci9kZWxldGUnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ25vdCB2YWxpZCcgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMCwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgdXNlciBtYWtpbmcgcmVxdWVzdCBpcyBub3QgYW4gYWRtaW4nLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdmFyIHVzZXIgPSBuZXcgVXNlcl8xW1wiZGVmYXVsdFwiXSh7XG4gICAgICAgICAgICAgICAgbmFtZTogJ05hbWUnLFxuICAgICAgICAgICAgICAgIGVtYWlsOiAnbm90YW5hZG1pbkB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IGJjcnlwdGpzXzEuaGFzaFN5bmMoJ3Bhc3N3b3JkJyksXG4gICAgICAgICAgICAgICAgcm9sZTogJ3VzZXInLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB1c2VyLnNhdmUoZnVuY3Rpb24gKGVyciwgdXNlcikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS9sb2dpbicpXG4gICAgICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICdub3RhbmFkbWluQHRlc3QuY29tJywgcGFzc3dvcmQ6ICdwYXNzd29yZCcgfSlcbiAgICAgICAgICAgICAgICAgICAgLmV4cGVjdCgyMDApXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gcmVzLmdldCgneC1hY2Nlc3MtdG9rZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVtcImRlbGV0ZVwiXSgnL2FwaS92MS91c2VyL2RlbGV0ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmV4cGVjdCg0MDEsIGRvbmUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgdXNlciBub3QgbG9nZ2VkIGluJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClbXCJkZWxldGVcIl0oJy9hcGkvdjEvdXNlci9kZWxldGUnKVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAxLCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ1BVVCAvYXBpL3YxL3VzZXIvcmVzdG9yZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdmFyIHVzZXIgPSBuZXcgVXNlcl8xW1wiZGVmYXVsdFwiXSh7XG4gICAgICAgICAgICAgICAgbmFtZTogJ05ldyBOYW1lJyxcbiAgICAgICAgICAgICAgICBlbWFpbDogJ2FjdGl2ZUB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgcm9sZTogJ3VzZXInLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAncGFzcydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIGluYWN0aXZlVXNlciA9IG5ldyBVc2VyXzFbXCJkZWZhdWx0XCJdKHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnTmFtZScsXG4gICAgICAgICAgICAgICAgZW1haWw6ICdkZWxldGVkQHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICByb2xlOiAndXNlcicsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICdwYXNzd29yZCcsXG4gICAgICAgICAgICAgICAgZGVsZXRlZDogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdXNlci5zYXZlKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIGluYWN0aXZlVXNlci5zYXZlKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJlc3RvcmUgdGhlIHVzZXInLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wdXQoJy9hcGkvdjEvdXNlci9yZXN0b3JlJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICdkZWxldGVkQHRlc3QuY29tJyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICBVc2VyXzFbXCJkZWZhdWx0XCJdLmZpbmRCeUVtYWlsKCdkZWxldGVkQHRlc3QuY29tJykuZXhlYyhmdW5jdGlvbiAoZXJyLCB1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2UodXNlci5kZWxldGVkKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgZW1haWwgZG9lcyBub3QgZXhpc3QnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wdXQoJy9hcGkvdjEvdXNlci9yZXN0b3JlJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICdkb2Vzbm90ZXhpc3RAdGVzdC5jb20nIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDQsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIHVzZXIgaXMgYWN0aXZlJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucHV0KCcvYXBpL3YxL3VzZXIvcmVzdG9yZScpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAnYWN0aXZlQHRlc3QuY29tJyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwLCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiB1c2VyIG1ha2luZyByZXF1ZXN0IGlzIG5vdCBhbiBhZG1pbicsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICB2YXIgdXNlciA9IG5ldyBVc2VyXzFbXCJkZWZhdWx0XCJdKHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnTmFtZScsXG4gICAgICAgICAgICAgICAgZW1haWw6ICdub3RhbmFkbWluQHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogYmNyeXB0anNfMS5oYXNoU3luYygncGFzc3dvcmQnKSxcbiAgICAgICAgICAgICAgICByb2xlOiAndXNlcicsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHVzZXIuc2F2ZShmdW5jdGlvbiAoZXJyLCB1c2VyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL2xvZ2luJylcbiAgICAgICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ25vdGFuYWRtaW5AdGVzdC5jb20nLCBwYXNzd29yZDogJ3Bhc3N3b3JkJyB9KVxuICAgICAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMClcbiAgICAgICAgICAgICAgICAgICAgLmVuZChmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSByZXMuZ2V0KCd4LWFjY2Vzcy10b2tlbicpO1xuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgICAgICAgICAucHV0KCcvYXBpL3YxL3VzZXIvcmVzdG9yZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmV4cGVjdCg0MDEsIGRvbmUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgdXNlciBub3QgbG9nZ2VkIGluJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucHV0KCcvYXBpL3YxL3VzZXIvcmVzdG9yZScpXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ2FjdGl2ZUB0ZXN0LmNvbScgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMSwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lkR1Z6ZEZWelpYSkRiMjUwY205c2JHVnlMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dmRHVnpkSE12YzJWeWRtVnlMM1JsYzNSVmMyVnlRMjl1ZEhKdmJHeGxjaTUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3p0QlFVRkJMRzFEUVVGeFF6dEJRVU55UXl4eFEwRkJiME03UVVGRGNFTXNOa0pCUVRoQ08wRkJSVGxDTEhsQ1FVRTRRenRCUVVNNVF5eHhSRUZCTWtRN1FVRkhNMFFzVVVGQlVTeERRVUZETEdsQ1FVRnBRaXhGUVVGRk8wbEJRM2hDTEVsQlFVa3NTMEZCWVN4RFFVRkRPMGxCUTJ4Q0xFbEJRVWtzVVVGQlVTeEhRVUZITzFGQlExZ3NTVUZCU1N4RlFVRkZMRkZCUVZFN1VVRkRaQ3hMUVVGTExFVkJRVVVzWlVGQlpUdFJRVU4wUWl4UlFVRlJMRVZCUVVVc1RVRkJUVHRSUVVOb1FpeEpRVUZKTEVWQlFVVXNUMEZCVHp0TFFVTm9RaXhEUVVGRE8wbEJSVVlzVlVGQlZTeERRVUZETEZWQlFWTXNTVUZCU1R0UlFVTndRaXh6UWtGQmEwSXNSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJRenRaUVVOMFFpeEpRVUZKTEVsQlFVa3NSMEZCVlN4SlFVRkpMR2xDUVVGSkxFTkJRVU03WjBKQlEzWkNMRWxCUVVrc1JVRkJSU3hSUVVGUkxFTkJRVU1zU1VGQlNUdG5Ra0ZEYmtJc1MwRkJTeXhGUVVGRkxGRkJRVkVzUTBGQlF5eExRVUZMTzJkQ1FVTnlRaXhSUVVGUkxFVkJRVVVzYlVKQlFWRXNRMEZCUXl4UlFVRlJMRU5CUVVNc1VVRkJVU3hEUVVGRE8yZENRVU55UXl4SlFVRkpMRVZCUVVVc1VVRkJVU3hEUVVGRExFbEJRVWs3WVVGRGRFSXNRMEZCUXl4RFFVRkRPMWxCUTBnc1NVRkJTU3hEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRkRMRWxCUVZjN1owSkJSWHBDTEU5QlFVOHNRMEZCUXl4UFFVRkhMRU5CUVVNN2NVSkJRMUFzU1VGQlNTeERRVUZETEdWQlFXVXNRMEZCUXp0eFFrRkRja0lzU1VGQlNTeERRVUZETEVWQlFVTXNTMEZCU3l4RlFVRkZMRkZCUVZFc1EwRkJReXhMUVVGTExFVkJRVVVzVVVGQlVTeEZRVUZGTEZGQlFWRXNRMEZCUXl4UlFVRlJMRVZCUVVNc1EwRkJRenR4UWtGRE1VUXNUVUZCVFN4RFFVRkRMRWRCUVVjc1EwRkJRenR4UWtGRFdDeEhRVUZITEVOQlFVTXNWVUZCUXl4SFFVRlJMRVZCUVVVc1IwRkJjVUk3YjBKQlEycERMRXRCUVVzc1IwRkJSeXhIUVVGSExFTkJRVU1zUjBGQlJ5eERRVUZETEdkQ1FVRm5RaXhEUVVGRExFTkJRVU03YjBKQlEyeERMR0ZCUVUwc1EwRkJReXhUUVVGVExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTTdiMEpCUTNoQ0xHRkJRVTBzUTBGQlF5eFJRVUZSTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN2IwSkJRM1pDTEdGQlFVMHNRMEZCUXl4VlFVRlZMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU03YjBKQlEzcENMRWxCUVVrc1JVRkJSU3hEUVVGRE8yZENRVU5ZTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTFnc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlN5eERRVUZCTEVOQlFVTXNWVUZCUXl4SFFVRlJPMmRDUVVOa0xFMUJRVTBzUjBGQlJ5eERRVUZETzFsQlEyUXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUlVnc1VVRkJVU3hEUVVGRExHdENRVUZyUWl4RlFVRkZPMUZCUTNwQ0xFVkJRVVVzUTBGQlF5eHBRMEZCYVVNc1JVRkJSU3hWUVVGVkxFbEJRVWs3V1VGRGFFUXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJRenRwUWtGRFVDeEhRVUZITEVOQlFVTXNZMEZCWXl4RFFVRkRPMmxDUVVOdVFpeEhRVUZITEVOQlFVTXNaMEpCUVdkQ0xFVkJRVVVzUzBGQlN5eERRVUZETzJsQ1FVTTFRaXhOUVVGTkxFTkJRVU1zUjBGQlJ5eEZRVUZGTEZWQlFVTXNSMEZCVVN4RlFVRkZMRWRCUVhGQ08yZENRVU42UXl4SlFVRkpMRWRCUVVjN2IwSkJRVVVzVDBGQlR5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1owSkJRekZDTEdGQlFVMHNRMEZCUXl4WFFVRlhMRU5CUVVNc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVXNVVUZCVVN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8yZENRVU5xUkN4aFFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RlFVRkZMRkZCUVZFc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dG5Ra0ZEYmtRc1lVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1JVRkJSU3hSUVVGUkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdaMEpCUTJwRUxHRkJRVTBzUTBGQlF5eFhRVUZYTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1JVRkJSU3hWUVVGVkxFTkJRVU1zUTBGQlF6dG5Ra0ZEZWtNc1NVRkJTU3hGUVVGRkxFTkJRVU03V1VGRFdDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTllMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzUlVGQlJTeERRVUZETERoQ1FVRTRRaXhGUVVGRkxGVkJRVlVzU1VGQlNUdFpRVU0zUXl4UFFVRlBMRU5CUVVNc1QwRkJSeXhEUVVGRE8ybENRVU5RTEVkQlFVY3NRMEZCUXl4alFVRmpMRU5CUVVNN2FVSkJRMjVDTEUxQlFVMHNRMEZCUXl4SFFVRkhMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRE0wSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5JTEZGQlFWRXNRMEZCUXl4dFFrRkJiVUlzUlVGQlJUdFJRVU14UWl4RlFVRkZMRU5CUVVNc1owTkJRV2RETEVWQlFVVXNWVUZCVlN4SlFVRkpPMWxCUXk5RExFOUJRVThzUTBGQlF5eFBRVUZITEVOQlFVTTdhVUpCUTFBc1IwRkJSeXhEUVVGRExHVkJRV1VzUTBGQlF6dHBRa0ZEY0VJc1IwRkJSeXhEUVVGRExHZENRVUZuUWl4RlFVRkZMRXRCUVVzc1EwRkJRenRwUWtGRE5VSXNUVUZCVFN4RFFVRkRMRWRCUVVjc1JVRkJSU3hWUVVGRExFZEJRVkVzUlVGQlJTeEhRVUZ4UWp0blFrRkRla01zWVVGQlRTeERRVUZETEZkQlFWY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eE5RVUZOTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNN1owSkJRemRETEdGQlFVMHNRMEZCUXl4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRMRVZCUVVVN2IwSkJRemxDTEVsQlFVa3NSVUZCUlN4UlFVRlJMRU5CUVVNc1NVRkJTVHR2UWtGRGJrSXNTVUZCU1N4RlFVRkZMRkZCUVZFc1EwRkJReXhKUVVGSk8yOUNRVU51UWl4TFFVRkxMRVZCUVVVc1VVRkJVU3hEUVVGRExFdEJRVXM3YVVKQlEzaENMRU5CUVVNc1EwRkJRVHRuUWtGRFJpeGhRVUZOTEVOQlFVTXNWMEZCVnl4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXl4RlFVRkZMRlZCUVZVc1EwRkJReXhEUVVGRE8yZENRVU5zUkN4SlFVRkpMRVZCUVVVc1EwRkJRenRaUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hGUVVGRkxFTkJRVU1zT0VKQlFUaENMRVZCUVVVc1ZVRkJWU3hKUVVGSk8xbEJRemRETEU5QlFVOHNRMEZCUXl4UFFVRkhMRU5CUVVNN2FVSkJRMUFzUjBGQlJ5eERRVUZETEdWQlFXVXNRMEZCUXp0cFFrRkRjRUlzVFVGQlRTeERRVUZETEVkQlFVY3NSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVNelFpeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTlFMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMGdzVVVGQlVTeERRVUZETEhsQ1FVRjVRaXhGUVVGRk8xRkJRMmhETEVWQlFVVXNRMEZCUXl4cFEwRkJhVU1zUlVGQlJTeFZRVUZWTEVsQlFVazdXVUZEYUVRc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF6dHBRa0ZEVUN4SFFVRkhMRU5CUVVNc1pVRkJaU3hIUVVGSExGRkJRVkVzUTBGQlF5eExRVUZMTEVOQlFVTTdhVUpCUTNKRExFZEJRVWNzUTBGQlF5eG5Ra0ZCWjBJc1JVRkJSU3hMUVVGTExFTkJRVU03YVVKQlF6VkNMRTFCUVUwc1EwRkJReXhIUVVGSExFVkJRVVVzVlVGQlF5eEhRVUZSTEVWQlFVVXNSMEZCY1VJN1owSkJRM3BETEdGQlFVMHNRMEZCUXl4VlFVRlZMRU5CUVVNc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4UFFVRlBMRVZCUVVVc1RVRkJUU3hGUVVGRkxFMUJRVTBzUlVGQlJTeExRVUZMTEVWQlFVVXNVMEZCVXl4RFFVRkRMRU5CUVVNc1EwRkJRenRuUWtGRE9VVXNZVUZCVFN4RFFVRkRMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NSVUZCUlR0dlFrRkRNVUlzUzBGQlN5eEZRVUZGTEZGQlFWRXNRMEZCUXl4TFFVRkxPMjlDUVVOeVFpeEpRVUZKTEVWQlFVVXNVVUZCVVN4RFFVRkRMRWxCUVVrN2IwSkJRMjVDTEVsQlFVa3NSVUZCUlN4UlFVRlJMRU5CUVVNc1NVRkJTVHRwUWtGRGRFSXNRMEZCUXl4RFFVRkRPMmRDUVVOSUxFbEJRVWtzUlVGQlJTeERRVUZETzFsQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRXQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl4eFEwRkJjVU1zUlVGQlJTeFZRVUZWTEVsQlFVazdXVUZEY0VRc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF6dHBRa0ZEVUN4SFFVRkhMRU5CUVVNc2EwTkJRV3RETEVOQlFVTTdhVUpCUTNaRExFZEJRVWNzUTBGQlF5eG5Ra0ZCWjBJc1JVRkJSU3hMUVVGTExFTkJRVU03YVVKQlF6VkNMRTFCUVUwc1EwRkJReXhIUVVGSExFVkJRVVVzVlVGQlF5eEhRVUZSTEVWQlFVVXNSMEZCY1VJN1owSkJRM3BETEdGQlFVMHNRMEZCUXl4UlFVRlJMRU5CUVVNc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0blFrRkRhRU1zWVVGQlRTeERRVUZETEZkQlFWY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUlVGQlJTd3JRa0ZCSzBJc1EwRkJReXhEUVVGRE8yZENRVU53UlN4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU03V1VGRFpDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTllMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzUlVGQlJTeERRVUZETEd0RFFVRnJReXhGUVVGRkxGVkJRVlVzU1VGQlNUdFpRVU5xUkN4UFFVRlBMRU5CUVVNc1QwRkJSeXhEUVVGRE8ybENRVU5RTEVkQlFVY3NRMEZCUXl3eVFrRkJNa0lzUTBGQlF6dHBRa0ZEYUVNc1IwRkJSeXhEUVVGRExHZENRVUZuUWl4RlFVRkZMRXRCUVVzc1EwRkJRenRwUWtGRE5VSXNUVUZCVFN4RFFVRkRMRWRCUVVjc1JVRkJSU3hWUVVGRExFZEJRVkVzUlVGQlJTeEhRVUZ4UWp0blFrRkRla01zWVVGQlRTeERRVUZETEZGQlFWRXNRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETzJkQ1FVTm9ReXhoUVVGTkxFTkJRVU1zVjBGQlZ5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhGUVVGRkxEWkNRVUUyUWl4RFFVRkRMRU5CUVVNN1owSkJRMnhGTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRaUVVOa0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5JTEZGQlFWRXNRMEZCUXl4blEwRkJaME1zUlVGQlJUdFJRVU4yUXl4RlFVRkZMRU5CUVVNc01FTkJRVEJETEVWQlFVVXNWVUZCVlN4SlFVRkpPMWxCUTNwRUxFbEJRVWtzVVVGQlVTeEhRVUZITEc5Q1FVRnZRaXhEUVVGRE8xbEJRM0JETEU5QlFVOHNRMEZCUXl4UFFVRkhMRU5CUVVNN2FVSkJRMUFzU1VGQlNTeERRVUZETERKQ1FVRXlRaXhEUVVGRE8ybENRVU5xUXl4SFFVRkhMRU5CUVVNc1owSkJRV2RDTEVWQlFVVXNTMEZCU3l4RFFVRkRPMmxDUVVNMVFpeEpRVUZKTEVOQlFVTXNSVUZCUlN4TFFVRkxMRVZCUVVVc1VVRkJVU3hGUVVGRkxFTkJRVU03YVVKQlEzcENMRTFCUVUwc1EwRkJReXhIUVVGSExFVkJRVVVzVlVGQlF5eEhRVUZSTEVWQlFVVXNSMEZCY1VJN1owSkJRM3BETEVsQlFVa3NSMEZCUnp0dlFrRkJSU3hQUVVGUExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0blFrRkRNVUlzVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXp0eFFrRkRVQ3hIUVVGSExFTkJRVU1zWTBGQll5eERRVUZETzNGQ1FVVnVRaXhIUVVGSExFTkJRVU1zWjBKQlFXZENMRVZCUVVVc1IwRkJSeXhEUVVGRExFZEJRVWNzUTBGQlF5eG5Ra0ZCWjBJc1EwRkJReXhEUVVGRE8zRkNRVU5vUkN4TlFVRk5MRU5CUVVNc1IwRkJSeXhGUVVGRkxGVkJRVU1zUjBGQlVTeEZRVUZGTEVkQlFYRkNPMjlDUVVONlF5eGhRVUZOTEVOQlFVTXNWMEZCVnl4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEZRVUZGTEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenR2UWtGRGFrUXNZVUZCVFN4RFFVRkRMRmRCUVZjc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NSVUZCUlN4UlFVRlJMRU5CUVVNc1EwRkJRenR2UWtGRE4wTXNZVUZCVFN4RFFVRkRMRmRCUVZjc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NSVUZCUlN4UlFVRlJMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03YjBKQlEycEVMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dG5Ra0ZEWkN4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hGUVVGRkxFTkJRVU1zZFVOQlFYVkRMRVZCUVVVc1ZVRkJWU3hKUVVGSk8xbEJRM1JFTEU5QlFVOHNRMEZCUXl4UFFVRkhMRU5CUVVNN2FVSkJRMUFzU1VGQlNTeERRVUZETERKQ1FVRXlRaXhEUVVGRE8ybENRVU5xUXl4SFFVRkhMRU5CUVVNc1owSkJRV2RDTEVWQlFVVXNTMEZCU3l4RFFVRkRPMmxDUVVNMVFpeEpRVUZKTEVOQlFVTXNSVUZCUlN4TFFVRkxMRVZCUVVVc1kwRkJZeXhGUVVGRkxFTkJRVU03YVVKQlF5OUNMRTFCUVUwc1EwRkJReXhIUVVGSExFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTTdVVUZETTBJc1EwRkJReXhEUVVGRExFTkJRVUU3VVVGRFJpeEZRVUZGTEVOQlFVTXNjVU5CUVhGRExFVkJRVVVzVlVGQlZTeEpRVUZKTzFsQlEzQkVMRTlCUVU4c1EwRkJReXhQUVVGSExFTkJRVU03YVVKQlExQXNTVUZCU1N4RFFVRkRMREpDUVVFeVFpeERRVUZETzJsQ1FVTnFReXhIUVVGSExFTkJRVU1zWjBKQlFXZENMRVZCUVVVc1MwRkJTeXhEUVVGRE8ybENRVU0xUWl4SlFVRkpMRU5CUVVNc1JVRkJSU3hMUVVGTExFVkJRVVVzWlVGQlpTeEZRVUZGTEVOQlFVTTdhVUpCUTJoRExFMUJRVTBzUTBGQlF5eEhRVUZITEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRNMElzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4RlFVRkZMRU5CUVVNc0swSkJRU3RDTEVWQlFVVXNWVUZCVlN4SlFVRkpPMWxCUXpsRExFOUJRVThzUTBGQlF5eFBRVUZITEVOQlFVTTdhVUpCUTFBc1NVRkJTU3hEUVVGRExESkNRVUV5UWl4RFFVRkRPMmxDUVVOcVF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4TFFVRkxMRVZCUVVVc1pVRkJaU3hGUVVGRkxFTkJRVU03YVVKQlEyaERMRTFCUVUwc1EwRkJReXhIUVVGSExFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTTdVVUZETTBJc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFVDeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTklMRkZCUVZFc1EwRkJReXdyUWtGQkswSXNSVUZCUlR0UlFVTjBReXhGUVVGRkxFTkJRVU1zYjBKQlFXOUNMRVZCUVVVc1ZVRkJWU3hKUVVGSk8xbEJRMjVETEVsQlFVa3NUMEZCVHl4SFFVRkhMRlZCUVZVc1EwRkJRenRaUVVONlFpeFBRVUZQTEVOQlFVTXNUMEZCUnl4RFFVRkRPMmxDUVVOUUxFbEJRVWtzUTBGQlF5d3dRa0ZCTUVJc1EwRkJRenRwUWtGRGFFTXNSMEZCUnl4RFFVRkRMR2RDUVVGblFpeEZRVUZGTEV0QlFVc3NRMEZCUXp0cFFrRkROVUlzU1VGQlNTeERRVUZETEVWQlFVVXNTVUZCU1N4RlFVRkZMRTlCUVU4c1JVRkJSU3hEUVVGRE8ybENRVU4yUWl4TlFVRk5MRU5CUVVNc1IwRkJSeXhGUVVGRkxGVkJRVU1zUjBGQlVTeEZRVUZGTEVkQlFYRkNPMmRDUVVONlF5eFBRVUZQTEVOQlFVTXNUMEZCUnl4RFFVRkRPM0ZDUVVOUUxFZEJRVWNzUTBGQlF5eGpRVUZqTEVOQlFVTTdjVUpCUTI1Q0xFZEJRVWNzUTBGQlF5eG5Ra0ZCWjBJc1JVRkJSU3hIUVVGSExFTkJRVU1zUjBGQlJ5eERRVUZETEdkQ1FVRm5RaXhEUVVGRExFTkJRVU03Y1VKQlEyaEVMRTFCUVUwc1EwRkJReXhIUVVGSExFVkJRVVVzVlVGQlF5eEhRVUZSTEVWQlFVVXNSMEZCY1VJN2IwSkJRM3BETEdGQlFVMHNRMEZCUXl4WFFVRlhMRU5CUVVNc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVXNUMEZCVHl4RFFVRkRMRU5CUVVNN2IwSkJRek5ETEdGQlFVMHNRMEZCUXl4WFFVRlhMRU5CUVVNc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVWQlFVVXNVVUZCVVN4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRE8yOUNRVU51UkN4aFFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RlFVRkZMRkZCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dHZRa0ZEYWtRc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzJkQ1FVTmtMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMWdzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEV0N4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5d3JRa0ZCSzBJc1JVRkJSU3hWUVVGVkxFbEJRVWs3V1VGRE9VTXNTVUZCU1N4UFFVRlBMRWRCUVVjc1ZVRkJWU3hEUVVGRE8xbEJRM3BDTEU5QlFVOHNRMEZCUXl4UFFVRkhMRU5CUVVNN2FVSkJRMUFzU1VGQlNTeERRVUZETERCQ1FVRXdRaXhEUVVGRE8ybENRVU5vUXl4SlFVRkpMRU5CUVVNc1JVRkJSU3hKUVVGSkxFVkJRVVVzVDBGQlR5eEZRVUZGTEVOQlFVTTdhVUpCUTNaQ0xFMUJRVTBzUTBGQlF5eEhRVUZITEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRNMElzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOSUxGRkJRVkVzUTBGQlF5eHRRMEZCYlVNc1JVRkJSVHRSUVVNeFF5eEZRVUZGTEVOQlFVTXNkMEpCUVhkQ0xFVkJRVVVzVlVGQlZTeEpRVUZKTzFsQlEzWkRMRWxCUVVrc1QwRkJUeXhIUVVGSExGTkJRVk1zUTBGQlF6dFpRVU40UWl4UFFVRlBMRU5CUVVNc1QwRkJSeXhEUVVGRE8ybENRVU5RTEVsQlFVa3NRMEZCUXl3NFFrRkJPRUlzUTBGQlF6dHBRa0ZEY0VNc1IwRkJSeXhEUVVGRExHZENRVUZuUWl4RlFVRkZMRXRCUVVzc1EwRkJRenRwUWtGRE5VSXNTVUZCU1N4RFFVRkRMRVZCUVVVc1QwRkJUeXhGUVVGRkxGRkJRVkVzUTBGQlF5eFJRVUZSTEVWQlFVVXNUMEZCVHl4RlFVRkZMRTlCUVU4c1JVRkJSU3hEUVVGRE8ybENRVU4wUkN4TlFVRk5MRU5CUVVNc1IwRkJSeXhGUVVGRkxGVkJRVU1zUjBGQlVTeEZRVUZGTEVkQlFYRkNPMmRDUVVONlF5eEpRVUZKTEVkQlFVYzdiMEpCUVVVc1QwRkJUeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTTdaMEpCUXpGQ0xFOUJRVThzUTBGQlF5eFBRVUZITEVOQlFVTTdjVUpCUTFBc1NVRkJTU3hEUVVGRExHVkJRV1VzUTBGQlF6dHhRa0ZEY2tJc1NVRkJTU3hEUVVGRExFVkJRVVVzUzBGQlN5eEZRVUZGTEZGQlFWRXNRMEZCUXl4TFFVRkxMRVZCUVVVc1VVRkJVU3hGUVVGRkxFOUJRVThzUlVGQlJTeERRVUZETzNGQ1FVTnNSQ3hOUVVGTkxFTkJRVU1zUjBGQlJ5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMWxCUXpOQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hGUVVGRkxFTkJRVU1zTWtSQlFUSkVMRVZCUVVVc1ZVRkJWU3hKUVVGSk8xbEJRM1JGTEU5QlFVOHNRMEZCUXl4UFFVRkhMRU5CUVVNN2FVSkJRMUFzU1VGQlNTeERRVUZETERoQ1FVRTRRaXhEUVVGRE8ybENRVU53UXl4SFFVRkhMRU5CUVVNc1owSkJRV2RDTEVWQlFVVXNTMEZCU3l4RFFVRkRPMmxDUVVNMVFpeEpRVUZKTEVOQlFVTXNSVUZCUlN4UFFVRlBMRVZCUVVVc1owSkJRV2RDTEVWQlFVVXNUMEZCVHl4RlFVRkZMRlZCUVZVc1JVRkJSU3hEUVVGRE8ybENRVU40UkN4TlFVRk5MRU5CUVVNc1IwRkJSeXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzFGQlF6TkNMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMUFzUlVGQlJTeERRVUZETEdsRVFVRnBSQ3hGUVVGRkxGVkJRVlVzU1VGQlNUdFpRVU5vUlN4UFFVRlBMRU5CUVVNc1QwRkJSeXhEUVVGRE8ybENRVU5RTEVsQlFVa3NRMEZCUXl3NFFrRkJPRUlzUTBGQlF6dHBRa0ZEY0VNc1RVRkJUU3hEUVVGRExFZEJRVWNzUlVGQlJTeEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTXpRaXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTBnc1VVRkJVU3hEUVVGRExEQkNRVUV3UWl4RlFVRkZPMUZCUTJwRExFbEJRVWtzVDBGQlR5eEhRVUZITzFsQlExWXNTMEZCU3l4RlFVRkZMR3RDUVVGclFqdFpRVU42UWl4SlFVRkpMRVZCUVVVc1ZVRkJWVHRaUVVOb1FpeEpRVUZKTEVWQlFVVXNUVUZCVFR0VFFVTm1MRU5CUVVFN1VVRkRSQ3hGUVVGRkxFTkJRVU1zTUVKQlFUQkNMRVZCUVVVc1ZVRkJVeXhKUVVGSk8xbEJSWGhETEdsQ1FVRkpMRU5CUVVNc1YwRkJWeXhEUVVGRExFOUJRVThzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4alFVRmpMRU5CUVVNc1ZVRkJReXhIUVVGSExFVkJRVVVzUzBGQllUdG5Ra0ZET1VRc1NVRkJTU3hIUVVGSE8yOUNRVUZGTEU5QlFVOHNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8yZENRVU14UWl4aFFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExFdEJRVXNzUlVGQlJTeERRVUZETEVWQlFVVXNiVVJCUVcxRUxFTkJRVU1zUTBGQlF6dG5Ra0ZEYkVZc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF6dHhRa0ZEVUN4SlFVRkpMRU5CUVVNc2NVSkJRWEZDTEVOQlFVTTdjVUpCUXpOQ0xFZEJRVWNzUTBGQlF5eG5Ra0ZCWjBJc1JVRkJSU3hMUVVGTExFTkJRVU03Y1VKQlF6VkNMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU03Y1VKQlEySXNUVUZCVFN4RFFVRkRMRWRCUVVjc1JVRkJSU3hWUVVGRExFZEJRVkVzUlVGQlJTeEhRVUZ4UWp0dlFrRkRla01zU1VGQlNTeEhRVUZITzNkQ1FVRkZMRTlCUVU4c1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzI5Q1FVTXhRaXhwUWtGQlNTeERRVUZETEZkQlFWY3NRMEZCUXl4UFFVRlBMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFVTXNSMEZCUnl4RlFVRkZMRWxCUVZjN2QwSkJRMnhFTEVsQlFVa3NSMEZCUnpzMFFrRkJSU3hQUVVGUExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0M1FrRkRNVUlzWVVGQlRTeERRVUZETEZkQlFWY3NRMEZCUXl4SlFVRkpMRVZCUVVVc1QwRkJUeXhEUVVGRExFTkJRVU03ZDBKQlEyeERMRWxCUVVrc1JVRkJSU3hEUVVGRE8yOUNRVU5ZTEVOQlFVTXNRMEZCUXl4RFFVRkRPMmRDUVVOUUxFTkJRVU1zUTBGQlF5eERRVUZETzFsQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl4dlJFRkJiMFFzUlVGQlJTeFZRVUZUTEVsQlFVazdXVUZEYkVVc1NVRkJTU3hKUVVGSkxFZEJRVlVzU1VGQlNTeHBRa0ZCU1N4RFFVRkRPMmRDUVVOMlFpeEpRVUZKTEVWQlFVVXNUMEZCVHl4RFFVRkRMRWxCUVVrN1owSkJRMnhDTEV0QlFVc3NSVUZCUlN4UFFVRlBMRU5CUVVNc1MwRkJTenRuUWtGRGNFSXNVVUZCVVN4RlFVRkZMRzFDUVVGUkxFTkJRVU1zVlVGQlZTeERRVUZETzJkQ1FVTTVRaXhKUVVGSkxFVkJRVVVzVDBGQlR5eERRVUZETEVsQlFVazdZVUZEY2tJc1EwRkJReXhEUVVGRE8xbEJRMGdzU1VGQlNTeERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGRExFbEJRVmM3WjBKQlJYcENMRTlCUVU4c1EwRkJReXhQUVVGSExFTkJRVU03Y1VKQlExQXNTVUZCU1N4RFFVRkRMR1ZCUVdVc1EwRkJRenR4UWtGRGNrSXNTVUZCU1N4RFFVRkRMRVZCUVVVc1MwRkJTeXhGUVVGRkxFOUJRVThzUTBGQlF5eExRVUZMTEVWQlFVVXNVVUZCVVN4RlFVRkZMRlZCUVZVc1JVRkJSU3hEUVVGRE8zRkNRVU53UkN4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRE8zRkNRVU5ZTEVkQlFVY3NRMEZCUXl4VlFVRkRMRWRCUVZFc1JVRkJSU3hIUVVGeFFqdHZRa0ZEYWtNc1MwRkJTeXhIUVVGSExFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zUTBGQlF6dHZRa0ZEYkVNc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF6dDVRa0ZEVUN4SlFVRkpMRU5CUVVNc2NVSkJRWEZDTEVOQlFVTTdlVUpCUXpOQ0xFZEJRVWNzUTBGQlF5eG5Ra0ZCWjBJc1JVRkJSU3hMUVVGTExFTkJRVU03ZVVKQlF6VkNMRTFCUVUwc1EwRkJReXhIUVVGSExFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTTdaMEpCUXpOQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFsQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNc1QwRkJTeXhEUVVGQkxFTkJRVU1zVlVGQlF5eEhRVUZSTzJkQ1FVTmtMRTFCUVUwc1IwRkJSeXhEUVVGRE8xbEJRMlFzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5eHpRMEZCYzBNc1JVRkJSU3hWUVVGVExFbEJRVWs3V1VGRGNFUXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJRenRwUWtGRFVDeEpRVUZKTEVOQlFVTXNjVUpCUVhGQ0xFTkJRVU03YVVKQlF6TkNMRTFCUVUwc1EwRkJReXhIUVVGSExFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTTdVVUZETTBJc1EwRkJReXhEUVVGRExFTkJRVUU3VVVGRFJpeEZRVUZGTEVOQlFVTXNiVU5CUVcxRExFVkJRVVVzVlVGQlV5eEpRVUZKTzFsQlEycEVMRTlCUVU4c1EwRkJReXhQUVVGSExFTkJRVU03YVVKQlExQXNTVUZCU1N4RFFVRkRMSEZDUVVGeFFpeERRVUZETzJsQ1FVTXpRaXhIUVVGSExFTkJRVU1zWjBKQlFXZENMRVZCUVVVc1MwRkJTeXhEUVVGRE8ybENRVU0xUWl4SlFVRkpMRU5CUVVNN1owSkJRMFlzUzBGQlN5eEZRVUZGTEZkQlFWYzdaMEpCUTJ4Q0xFbEJRVWtzUlVGQlJTeFBRVUZQTEVOQlFVTXNTVUZCU1R0blFrRkRiRUlzU1VGQlNTeEZRVUZGTEU5QlFVOHNRMEZCUXl4SlFVRkpPMkZCUTNKQ0xFTkJRVU03YVVKQlEwUXNUVUZCVFN4RFFVRkRMRWRCUVVjc1JVRkJSU3hKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU16UWl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5d3JRa0ZCSzBJc1JVRkJSU3hWUVVGVExFbEJRVWs3V1VGRE4wTXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJRenRwUWtGRFVDeEpRVUZKTEVOQlFVTXNjVUpCUVhGQ0xFTkJRVU03YVVKQlF6TkNMRWRCUVVjc1EwRkJReXhuUWtGQlowSXNSVUZCUlN4TFFVRkxMRU5CUVVNN2FVSkJRelZDTEVsQlFVa3NRMEZCUXp0blFrRkRSaXhMUVVGTExFVkJRVVVzVDBGQlR5eERRVUZETEV0QlFVczdaMEpCUTNCQ0xFbEJRVWtzUlVGQlJTeFBRVUZQTEVOQlFVTXNTVUZCU1R0blFrRkRiRUlzU1VGQlNTeEZRVUZGTEZkQlFWYzdZVUZEY0VJc1EwRkJRenRwUWtGRFJDeE5RVUZOTEVOQlFVTXNSMEZCUnl4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRek5DTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1JVRkJSU3hEUVVGRExEWkRRVUUyUXl4RlFVRkZMRlZCUVZNc1NVRkJTVHRaUVVNelJDeFBRVUZQTEVOQlFVTXNUMEZCUnl4RFFVRkRPMmxDUVVOUUxFbEJRVWtzUTBGQlF5eHhRa0ZCY1VJc1EwRkJRenRwUWtGRE0wSXNSMEZCUnl4RFFVRkRMR2RDUVVGblFpeEZRVUZGTEV0QlFVc3NRMEZCUXp0cFFrRkROVUlzU1VGQlNTeERRVUZETzJkQ1FVTkdMRXRCUVVzc1JVRkJSU3hSUVVGUkxFTkJRVU1zUzBGQlN6dG5Ra0ZEY2tJc1NVRkJTU3hGUVVGRkxFOUJRVThzUTBGQlF5eEpRVUZKTzJkQ1FVTnNRaXhKUVVGSkxFVkJRVVVzVDBGQlR5eERRVUZETEVsQlFVazdZVUZEY2tJc1EwRkJRenRwUWtGRFJDeE5RVUZOTEVOQlFVTXNSMEZCUnl4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRek5DTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTFBc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFNDeFJRVUZSTEVOQlFVTXNlVUpCUVhsQ0xFVkJRVVU3VVVGRGFFTXNTVUZCU1N4WFFVRlhMRWRCUVVjN1dVRkRaQ3hKUVVGSkxFVkJRVVVzVlVGQlZUdFpRVU5vUWl4TFFVRkxMRVZCUVVVc2JVSkJRVzFDTzFsQlF6RkNMRWxCUVVrc1JVRkJSU3hOUVVGTk8xTkJRMllzUTBGQlF6dFJRVVZHTEVWQlFVVXNRMEZCUXl4M1FrRkJkMElzUlVGQlJTeFZRVUZUTEVsQlFVazdXVUZEZEVNc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF6dHBRa0ZEVUN4SFFVRkhMRU5CUVVNc2NVSkJRWEZDTEVOQlFVTTdhVUpCUXpGQ0xFZEJRVWNzUTBGQlF5eG5Ra0ZCWjBJc1JVRkJSU3hMUVVGTExFTkJRVU03YVVKQlF6VkNMRWxCUVVrc1EwRkJReXhGUVVGRExFdEJRVXNzUlVGQlJTeFJRVUZSTEVOQlFVTXNTMEZCU3l4RlFVRkZMRWxCUVVrc1JVRkJSU3hYUVVGWExFVkJRVU1zUTBGQlF6dHBRa0ZEYUVRc1RVRkJUU3hEUVVGRExFZEJRVWNzUlVGQlJTeFZRVUZETEVkQlFWRXNSVUZCUlN4SFFVRnhRanRuUWtGRGVrTXNTVUZCU1N4SFFVRkhPMjlDUVVGRkxFOUJRVThzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMmRDUVVNeFFpeHBRa0ZCU1N4RFFVRkRMRmRCUVZjc1EwRkJReXhYUVVGWExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVVNc1IwRkJVU3hGUVVGRkxFbEJRVmM3YjBKQlF6TkVMRWxCUVVrc1IwRkJSenQzUWtGQlJTeFBRVUZQTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenR2UWtGRE1VSXNZVUZCVFN4RFFVRkRMRk5CUVZNc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dHZRa0ZEZGtJc1lVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eEpRVUZKTEVWQlFVVXNWMEZCVnl4RFFVRkRMRU5CUVVNN2IwSkJRM1JETEVsQlFVa3NSVUZCUlN4RFFVRkRPMmRDUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZETzFsQlExQXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRXQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl3clEwRkJLME1zUlVGQlJTeFZRVUZUTEVsQlFVazdXVUZETjBRc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF6dHBRa0ZEVUN4SFFVRkhMRU5CUVVNc2NVSkJRWEZDTEVOQlFVTTdhVUpCUXpGQ0xFZEJRVWNzUTBGQlF5eG5Ra0ZCWjBJc1JVRkJSU3hMUVVGTExFTkJRVU03YVVKQlF6VkNMRWxCUVVrc1EwRkJReXhGUVVGRExFdEJRVXNzUlVGQlJTeDFRa0ZCZFVJc1JVRkJSU3hKUVVGSkxFVkJRVVVzVjBGQlZ5eEZRVUZETEVOQlFVTTdhVUpCUTNwRUxFMUJRVTBzUTBGQlF5eEhRVUZITEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRNMElzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4RlFVRkZMRU5CUVVNc2IwTkJRVzlETEVWQlFVVXNWVUZCVXl4SlFVRkpPMWxCUTJ4RUxFOUJRVThzUTBGQlF5eFBRVUZITEVOQlFVTTdhVUpCUTFBc1IwRkJSeXhEUVVGRExIRkNRVUZ4UWl4RFFVRkRPMmxDUVVNeFFpeEhRVUZITEVOQlFVTXNaMEpCUVdkQ0xFVkJRVVVzUzBGQlN5eERRVUZETzJsQ1FVTTFRaXhKUVVGSkxFTkJRVU03WjBKQlEwWXNTMEZCU3l4RlFVRkZMRkZCUVZFc1EwRkJReXhMUVVGTE8yZENRVU55UWl4SlFVRkpMRVZCUVVVc1RVRkJUU3hEUVVGRExFMUJRVTBzUTBGQlF5eEZRVUZGTEVWQlFVVXNWMEZCVnl4RlFVRkZMRVZCUVVNc1MwRkJTeXhGUVVGRkxGZEJRVmNzUlVGQlF5eERRVUZETzJGQlF6ZEVMRU5CUVVNc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUXpkQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NSVUZCUlN4RFFVRkRMQ3RDUVVFclFpeEZRVUZGTEZWQlFWTXNTVUZCU1R0WlFVTTNReXhQUVVGUExFTkJRVU1zVDBGQlJ5eERRVUZETzJsQ1FVTlFMRWRCUVVjc1EwRkJReXh4UWtGQmNVSXNRMEZCUXp0cFFrRkRNVUlzUjBGQlJ5eERRVUZETEdkQ1FVRm5RaXhGUVVGRkxFdEJRVXNzUTBGQlF6dHBRa0ZETlVJc1NVRkJTU3hEUVVGRE8yZENRVU5HTEV0QlFVc3NSVUZCUlN4UlFVRlJMRU5CUVVNc1MwRkJTenRuUWtGRGNrSXNTVUZCU1N4RlFVRkZMRTFCUVUwc1EwRkJReXhOUVVGTkxFTkJRVU1zUlVGQlJTeEZRVUZGTEZkQlFWY3NSVUZCUlN4RlFVRkZMRWxCUVVrc1JVRkJSU3hYUVVGWExFVkJRVVVzUTBGQlF6dGhRVU01UkN4RFFVRkRMRU5CUVVNc1RVRkJUU3hEUVVGRExFZEJRVWNzUlVGQlJTeEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTTNRaXhEUVVGRExFTkJRVU1zUTBGQlFUdEpRVU5PTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTBnc1VVRkJVU3hEUVVGRExEUkNRVUUwUWl4RlFVRkZPMUZCUTI1RExGVkJRVlVzUTBGQlF5eFZRVUZUTEVsQlFVazdXVUZEY0VJc1NVRkJTU3hKUVVGSkxFZEJRVWNzU1VGQlNTeHBRa0ZCU1N4RFFVRkRPMmRDUVVOb1FpeEpRVUZKTEVWQlFVVXNWVUZCVlR0blFrRkRhRUlzUzBGQlN5eEZRVUZGTEcxQ1FVRnRRanRuUWtGRE1VSXNTVUZCU1N4RlFVRkZMRTFCUVUwN1owSkJRMW9zVVVGQlVTeEZRVUZGTEUxQlFVMDdZVUZEYmtJc1EwRkJReXhEUVVGRE8xbEJRMGdzU1VGQlNTeFpRVUZaTEVkQlFVY3NTVUZCU1N4cFFrRkJTU3hEUVVGRE8yZENRVU40UWl4SlFVRkpMRVZCUVVVc1RVRkJUVHRuUWtGRFdpeExRVUZMTEVWQlFVVXNhMEpCUVd0Q08yZENRVU42UWl4SlFVRkpMRVZCUVVVc1RVRkJUVHRuUWtGRFdpeFJRVUZSTEVWQlFVVXNWVUZCVlR0blFrRkRjRUlzVDBGQlR5eEZRVUZGTEVsQlFVazdZVUZEYUVJc1EwRkJReXhEUVVGRE8xbEJRMGdzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRkRMRWRCUVZFN1owSkJRMllzU1VGQlNTeEhRVUZITzI5Q1FVRkZMRTlCUVU4c1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzJkQ1FVTXhRaXhaUVVGWkxFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFVTXNSMEZCVVR0dlFrRkRka0lzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMmRDUVVOa0xFTkJRVU1zUTBGQlF5eERRVUZCTzFsQlEwNHNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl4M1FrRkJkMElzUlVGQlJTeFZRVUZUTEVsQlFVazdXVUZEZEVNc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF5eERRVU5RTEZGQlFVMHNRMEZCUVN4RFFVRkRMSEZDUVVGeFFpeERRVUZETzJsQ1FVTTNRaXhIUVVGSExFTkJRVU1zWjBKQlFXZENMRVZCUVVVc1MwRkJTeXhEUVVGRE8ybENRVU0xUWl4SlFVRkpMRU5CUVVNc1JVRkJReXhMUVVGTExFVkJRVVVzYlVKQlFXMUNMRVZCUVVNc1EwRkJRenRwUWtGRGJFTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1JVRkJSU3hWUVVGRExFZEJRVkU3WjBKQlEyeENMRWxCUVVrc1IwRkJSenR2UWtGQlJTeFBRVUZQTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRuUWtGRE1VSXNhVUpCUVVrc1EwRkJReXhYUVVGWExFTkJRVU1zYlVKQlFXMUNMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlF5eEhRVUZSTEVWQlFVVXNTVUZCVnp0dlFrRkROMFFzU1VGQlNTeEhRVUZITzNkQ1FVRkZMRTlCUVU4c1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzI5Q1FVTXhRaXhoUVVGTkxFTkJRVU1zVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1EwRkJRenR2UWtGRE5VSXNTVUZCU1N4RlFVRkZMRU5CUVVNN1owSkJRMWdzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NSVUZCUlN4RFFVRkRMR2RFUVVGblJDeEZRVUZGTEZWQlFWTXNTVUZCU1R0WlFVTTVSQ3hQUVVGUExFTkJRVU1zVDBGQlJ5eERRVUZETEVOQlExQXNVVUZCVFN4RFFVRkJMRU5CUVVNc2NVSkJRWEZDTEVOQlFVTTdhVUpCUXpkQ0xFZEJRVWNzUTBGQlF5eG5Ra0ZCWjBJc1JVRkJSU3hMUVVGTExFTkJRVU03YVVKQlF6VkNMRWxCUVVrc1EwRkJReXhGUVVGRExFdEJRVXNzUlVGQlJTeFJRVUZSTEVOQlFVTXNTMEZCU3l4RlFVRkRMRU5CUVVNN2FVSkJRemRDTEUxQlFVMHNRMEZCUXl4SFFVRkhMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRE0wSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hGUVVGRkxFTkJRVU1zSzBKQlFTdENMRVZCUVVVc1ZVRkJVeXhKUVVGSk8xbEJRemRETEU5QlFVOHNRMEZCUXl4UFFVRkhMRU5CUVVNc1EwRkRVQ3hSUVVGTkxFTkJRVUVzUTBGQlF5eHhRa0ZCY1VJc1EwRkJRenRwUWtGRE4wSXNSMEZCUnl4RFFVRkRMR2RDUVVGblFpeEZRVUZGTEV0QlFVc3NRMEZCUXp0cFFrRkROVUlzU1VGQlNTeERRVUZETEVWQlFVVXNTMEZCU3l4RlFVRkZMR3RDUVVGclFpeEZRVUZETEVOQlFVTTdhVUpCUTJ4RExFMUJRVTBzUTBGQlF5eEhRVUZITEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRNMElzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4RlFVRkZMRU5CUVVNc2NVTkJRWEZETEVWQlFVVXNWVUZCVXl4SlFVRkpPMWxCUTI1RUxFOUJRVThzUTBGQlF5eFBRVUZITEVOQlFVTXNRMEZEVUN4UlFVRk5MRU5CUVVFc1EwRkJReXh4UWtGQmNVSXNRMEZCUXp0cFFrRkROMElzUjBGQlJ5eERRVUZETEdkQ1FVRm5RaXhGUVVGRkxFdEJRVXNzUTBGQlF6dHBRa0ZETlVJc1NVRkJTU3hEUVVGRExFVkJRVVVzUzBGQlN5eEZRVUZGTEd0Q1FVRnJRaXhGUVVGRkxFTkJRVU03YVVKQlEyNURMRTFCUVUwc1EwRkJReXhIUVVGSExFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTTdVVUZETTBJc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEZRVUZGTEVOQlFVTXNiVU5CUVcxRExFVkJRVVVzVlVGQlV5eEpRVUZKTzFsQlEycEVMRTlCUVU4c1EwRkJReXhQUVVGSExFTkJRVU1zUTBGRFVDeFJRVUZOTEVOQlFVRXNRMEZCUXl4eFFrRkJjVUlzUTBGQlF6dHBRa0ZETjBJc1IwRkJSeXhEUVVGRExHZENRVUZuUWl4RlFVRkZMRXRCUVVzc1EwRkJRenRwUWtGRE5VSXNTVUZCU1N4RFFVRkRMRVZCUVVVc1MwRkJTeXhGUVVGRkxGZEJRVmNzUlVGQlJTeERRVUZETzJsQ1FVTTFRaXhOUVVGTkxFTkJRVU1zUjBGQlJ5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUXpOQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NSVUZCUlN4RFFVRkRMRzlFUVVGdlJDeEZRVUZGTEZWQlFWTXNTVUZCU1R0WlFVTnNSU3hKUVVGSkxFbEJRVWtzUjBGQlZTeEpRVUZKTEdsQ1FVRkpMRU5CUVVNN1owSkJRM1pDTEVsQlFVa3NSVUZCUlN4TlFVRk5PMmRDUVVOYUxFdEJRVXNzUlVGQlJTeHhRa0ZCY1VJN1owSkJRelZDTEZGQlFWRXNSVUZCUlN4dFFrRkJVU3hEUVVGRExGVkJRVlVzUTBGQlF6dG5Ra0ZET1VJc1NVRkJTU3hGUVVGRkxFMUJRVTA3WVVGRFppeERRVUZETEVOQlFVTTdXVUZEU0N4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVU1zUjBGQlVTeEZRVUZGTEVsQlFWYzdaMEpCUXpWQ0xFbEJRVWtzUjBGQlJ6dHZRa0ZCUlN4UFFVRlBMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dG5Ra0ZGTVVJc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF6dHhRa0ZEVUN4SlFVRkpMRU5CUVVNc1pVRkJaU3hEUVVGRE8zRkNRVU55UWl4SlFVRkpMRU5CUVVNc1JVRkJSU3hMUVVGTExFVkJRVVVzY1VKQlFYRkNMRVZCUVVVc1VVRkJVU3hGUVVGRkxGVkJRVlVzUlVGQlJTeERRVUZETzNGQ1FVTTFSQ3hOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETzNGQ1FVTllMRWRCUVVjc1EwRkJReXhWUVVGRExFZEJRVkVzUlVGQlJTeEhRVUZ4UWp0dlFrRkRha01zUzBGQlN5eEhRVUZITEVkQlFVY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1owSkJRV2RDTEVOQlFVTXNRMEZCUXp0dlFrRkRiRU1zVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXl4RFFVTlFMRkZCUVUwc1EwRkJRU3hEUVVGRExIRkNRVUZ4UWl4RFFVRkRPM2xDUVVNM1FpeEhRVUZITEVOQlFVTXNaMEpCUVdkQ0xFVkJRVVVzUzBGQlN5eERRVUZETzNsQ1FVTTFRaXhOUVVGTkxFTkJRVU1zUjBGQlJ5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMmRDUVVNelFpeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTlFMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMWdzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4RlFVRkZMRU5CUVVNc2JVTkJRVzFETEVWQlFVVXNWVUZCVXl4SlFVRkpPMWxCUTJwRUxFOUJRVThzUTBGQlF5eFBRVUZITEVOQlFVTXNRMEZEVUN4UlFVRk5MRU5CUVVFc1EwRkJReXh4UWtGQmNVSXNRMEZCUXp0cFFrRkROMElzVFVGQlRTeERRVUZETEVkQlFVY3NSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVNelFpeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTlFMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMGdzVVVGQlVTeERRVUZETERCQ1FVRXdRaXhGUVVGRk8xRkJRMnBETEZWQlFWVXNRMEZCUXl4VlFVRlZMRWxCUVVrN1dVRkRja0lzU1VGQlNTeEpRVUZKTEVkQlFVY3NTVUZCU1N4cFFrRkJTU3hEUVVGRE8yZENRVU5vUWl4SlFVRkpMRVZCUVVVc1ZVRkJWVHRuUWtGRGFFSXNTMEZCU3l4RlFVRkZMR2xDUVVGcFFqdG5Ra0ZEZUVJc1NVRkJTU3hGUVVGRkxFMUJRVTA3WjBKQlExb3NVVUZCVVN4RlFVRkZMRTFCUVUwN1lVRkRia0lzUTBGQlF5eERRVUZETzFsQlEwZ3NTVUZCU1N4WlFVRlpMRWRCUVVjc1NVRkJTU3hwUWtGQlNTeERRVUZETzJkQ1FVTjRRaXhKUVVGSkxFVkJRVVVzVFVGQlRUdG5Ra0ZEV2l4TFFVRkxMRVZCUVVVc2EwSkJRV3RDTzJkQ1FVTjZRaXhKUVVGSkxFVkJRVVVzVFVGQlRUdG5Ra0ZEV2l4UlFVRlJMRVZCUVVVc1ZVRkJWVHRuUWtGRGNFSXNUMEZCVHl4RlFVRkZMRWxCUVVrN1lVRkRhRUlzUTBGQlF5eERRVUZETzFsQlEwZ3NTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGRExFZEJRVkU3WjBKQlEyWXNTVUZCU1N4SFFVRkhPMjlDUVVGRkxFOUJRVThzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMmRDUVVNeFFpeFpRVUZaTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVVNc1IwRkJVVHR2UWtGRGRrSXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8yZENRVU5rTEVOQlFVTXNRMEZCUXl4RFFVRkJPMWxCUTA0c1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFVDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXg1UWtGQmVVSXNSVUZCUlN4VlFVRlRMRWxCUVVrN1dVRkRka01zVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXp0cFFrRkRVQ3hIUVVGSExFTkJRVU1zYzBKQlFYTkNMRU5CUVVNN2FVSkJRek5DTEVkQlFVY3NRMEZCUXl4blFrRkJaMElzUlVGQlJTeExRVUZMTEVOQlFVTTdhVUpCUXpWQ0xFbEJRVWtzUTBGQlF5eEZRVUZGTEV0QlFVc3NSVUZCUlN4clFrRkJhMElzUlVGQlJTeERRVUZETzJsQ1FVTnVReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eEZRVUZGTEZWQlFVTXNSMEZCVVR0blFrRkRiRUlzU1VGQlNTeEhRVUZITzI5Q1FVRkZMRTlCUVU4c1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzJkQ1FVTXhRaXhwUWtGQlNTeERRVUZETEZkQlFWY3NRMEZCUXl4clFrRkJhMElzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRkRMRWRCUVZFc1JVRkJSU3hKUVVGWE8yOUNRVU0xUkN4SlFVRkpMRWRCUVVjN2QwSkJRVVVzVDBGQlR5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN2IwSkJRekZDTEdGQlFVMHNRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzI5Q1FVTTNRaXhKUVVGSkxFVkJRVVVzUTBGQlF6dG5Ra0ZEV0N4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOUUxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hGUVVGRkxFTkJRVU1zY1VOQlFYRkRMRVZCUVVVc1ZVRkJVeXhKUVVGSk8xbEJRMjVFTEU5QlFVOHNRMEZCUXl4UFFVRkhMRU5CUVVNN2FVSkJRMUFzUjBGQlJ5eERRVUZETEhOQ1FVRnpRaXhEUVVGRE8ybENRVU16UWl4SFFVRkhMRU5CUVVNc1owSkJRV2RDTEVWQlFVVXNTMEZCU3l4RFFVRkRPMmxDUVVNMVFpeEpRVUZKTEVOQlFVTXNSVUZCUlN4TFFVRkxMRVZCUVVVc2RVSkJRWFZDTEVWQlFVTXNRMEZCUXp0cFFrRkRka01zVFVGQlRTeERRVUZETEVkQlFVY3NSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVNelFpeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXdyUWtGQkswSXNSVUZCUlN4VlFVRlRMRWxCUVVrN1dVRkROME1zVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXp0cFFrRkRVQ3hIUVVGSExFTkJRVU1zYzBKQlFYTkNMRU5CUVVNN2FVSkJRek5DTEVkQlFVY3NRMEZCUXl4blFrRkJaMElzUlVGQlJTeExRVUZMTEVOQlFVTTdhVUpCUXpWQ0xFbEJRVWtzUTBGQlF5eEZRVUZGTEV0QlFVc3NSVUZCUlN4cFFrRkJhVUlzUlVGQlJTeERRVUZETzJsQ1FVTnNReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUXpOQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NSVUZCUlN4RFFVRkRMRzlFUVVGdlJDeEZRVUZGTEZWQlFWTXNTVUZCU1R0WlFVTnNSU3hKUVVGSkxFbEJRVWtzUjBGQlZTeEpRVUZKTEdsQ1FVRkpMRU5CUVVNN1owSkJRM1pDTEVsQlFVa3NSVUZCUlN4TlFVRk5PMmRDUVVOYUxFdEJRVXNzUlVGQlJTeHhRa0ZCY1VJN1owSkJRelZDTEZGQlFWRXNSVUZCUlN4dFFrRkJVU3hEUVVGRExGVkJRVlVzUTBGQlF6dG5Ra0ZET1VJc1NVRkJTU3hGUVVGRkxFMUJRVTA3WVVGRFppeERRVUZETEVOQlFVTTdXVUZEU0N4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVU1zUjBGQlVTeEZRVUZGTEVsQlFWYzdaMEpCUXpWQ0xFbEJRVWtzUjBGQlJ6dHZRa0ZCUlN4UFFVRlBMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dG5Ra0ZGTVVJc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF6dHhRa0ZEVUN4SlFVRkpMRU5CUVVNc1pVRkJaU3hEUVVGRE8zRkNRVU55UWl4SlFVRkpMRU5CUVVNc1JVRkJSU3hMUVVGTExFVkJRVVVzY1VKQlFYRkNMRVZCUVVVc1VVRkJVU3hGUVVGRkxGVkJRVlVzUlVGQlJTeERRVUZETzNGQ1FVTTFSQ3hOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETzNGQ1FVTllMRWRCUVVjc1EwRkJReXhWUVVGRExFZEJRVkVzUlVGQlJTeEhRVUZ4UWp0dlFrRkRha01zUzBGQlN5eEhRVUZITEVkQlFVY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1owSkJRV2RDTEVOQlFVTXNRMEZCUXp0dlFrRkRiRU1zVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXp0NVFrRkRVQ3hIUVVGSExFTkJRVU1zYzBKQlFYTkNMRU5CUVVNN2VVSkJRek5DTEVkQlFVY3NRMEZCUXl4blFrRkJaMElzUlVGQlJTeExRVUZMTEVOQlFVTTdlVUpCUXpWQ0xFMUJRVTBzUTBGQlF5eEhRVUZITEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1owSkJRek5DTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTFnc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFVDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXh0UTBGQmJVTXNSVUZCUlN4VlFVRlRMRWxCUVVrN1dVRkRha1FzVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXp0cFFrRkRVQ3hIUVVGSExFTkJRVU1zYzBKQlFYTkNMRU5CUVVNN2FVSkJRek5DTEVsQlFVa3NRMEZCUXl4RlFVRkZMRXRCUVVzc1JVRkJSU3hwUWtGQmFVSXNSVUZCUlN4RFFVRkRPMmxDUVVOc1F5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRek5DTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTFBc1EwRkJReXhEUVVGRExFTkJRVU03UVVGRFVDeERRVUZETEVOQlFVTXNRMEZCUXlKOSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnJlcXVpcmUoXCJtb2NoYVwiKTtcbnZhciBheGlvc18xID0gcmVxdWlyZShcImF4aW9zXCIpO1xudmFyIGNoYWlfMSA9IHJlcXVpcmUoXCJjaGFpXCIpO1xudmFyIGF4aW9zX21vY2tfYWRhcHRlcl8xID0gcmVxdWlyZShcImF4aW9zLW1vY2stYWRhcHRlclwiKTtcbnZhciByZWR1eF9tb2NrX3N0b3JlXzEgPSByZXF1aXJlKFwicmVkdXgtbW9jay1zdG9yZVwiKTtcbnZhciByZWR1eF90aHVua18xID0gcmVxdWlyZShcInJlZHV4LXRodW5rXCIpO1xudmFyIHVzZXJBY3Rpb25zXzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL3dlYi9hY3Rpb25zL3VzZXJBY3Rpb25zXCIpO1xudmFyIG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL3dlYi9hY3Rpb25zL25vdGlmaWNhdGlvbnNBY3Rpb25zXCIpO1xudmFyIHNvY2tldEFjdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvd2ViL2FjdGlvbnMvc29ja2V0QWN0aW9uc1wiKTtcbnZhciBjaGFubmVsc0FjdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvd2ViL2FjdGlvbnMvY2hhbm5lbHNBY3Rpb25zXCIpO1xudmFyIGNoYXRVc2Vyc0FjdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvd2ViL2FjdGlvbnMvY2hhdFVzZXJzQWN0aW9uc1wiKTtcbnZhciBtb2NrU3RvcmVDcmVhdG9yID0gcmVkdXhfbW9ja19zdG9yZV8xW1wiZGVmYXVsdFwiXShbcmVkdXhfdGh1bmtfMVtcImRlZmF1bHRcIl1dKTtcbmZ1bmN0aW9uIGdldFN0b3JlKHN0b3JlKSB7XG4gICAgaWYgKHN0b3JlID09PSB2b2lkIDApIHsgc3RvcmUgPSB7fTsgfVxuICAgIHJldHVybiBtb2NrU3RvcmVDcmVhdG9yKHN0b3JlKTtcbn1cbmRlc2NyaWJlKCdBc3luYyBBY3Rpb25zJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBtb2NrU3RvcmU7XG4gICAgdmFyIG1vY2tBeGlvcztcbiAgICBiZWZvcmUoZnVuY3Rpb24gKCkge1xuICAgICAgICBtb2NrQXhpb3MgPSBuZXcgYXhpb3NfbW9ja19hZGFwdGVyXzFbXCJkZWZhdWx0XCJdKGF4aW9zXzFbXCJkZWZhdWx0XCJdKTtcbiAgICB9KTtcbiAgICBhZnRlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgIG1vY2tBeGlvcy5yZXN0b3JlKCk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ1VzZXIgYXN5bmMgYWN0aW9ucycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBtb2NrU3RvcmUgPSBnZXRTdG9yZSgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3Mub25BbnkoKS5yZXBseSgyMDAsIHt9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgaGFuZGxlIGNhbGxiYWNrIGFuZCBzZXQgaW5mbyAnICtcbiAgICAgICAgICAgICdvbiBzdWNjZXNzZnVsIHBvc3QgcmVxdWVzdCB0byAvYXBpL3YxL3VzZXIvdXBkYXRlL25hbWUnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdmFyIG5hbWUgPSBmYWxzZTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaCh1c2VyQWN0aW9uc18xLnVwZGF0ZU5hbWUoJ0FkcmlhbicsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5hbWUgPSAnQWRyaWFuJzsgfSkpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwobmFtZSwgJ0FkcmlhbicpO1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5BRERfSU5GTyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICdOYW1lIHVwZGF0ZWQnXG4gICAgICAgICAgICAgICAgICAgIH1dKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBzZXQgYW4gZXJyb3Igb24gZmFpbGVkIHBvc3QgcmVxdWVzdCB0byAvYXBpL3YxL3VzZXIvdXBkYXRlL25hbWUnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdmFyIG5hbWUgPSBmYWxzZTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zLm9uUG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9uYW1lJykucmVwbHkoNTAwLCB7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnIH0pO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKHVzZXJBY3Rpb25zXzEudXBkYXRlTmFtZSgnQWRyaWFuJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmFtZSA9ICdBZHJpYW4nOyB9KSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChuYW1lLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBub3RpZmljYXRpb25zQWN0aW9uc18xLkFERF9FUlJPUixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICdTb21ldGhpbmcgd2VudCB3cm9uZydcbiAgICAgICAgICAgICAgICAgICAgfV0pO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGhhbmRsZSBjYWxsYmFjayBhbmQgc2V0IGluZm8gJyArXG4gICAgICAgICAgICAnb24gc3VjY2Vzc2Z1bCBwb3N0IHJlcXVlc3QgdG8gL2FwaS92MS91c2VyL3VwZGF0ZS9lbWFpbCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICB2YXIgZW1haWwgPSBmYWxzZTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaCh1c2VyQWN0aW9uc18xLnVwZGF0ZUVtYWlsKCd0ZXN0QHRlc3QuY29tJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gZW1haWwgPSAndGVzdEB0ZXN0LmNvbSc7IH0pKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKGVtYWlsLCAndGVzdEB0ZXN0LmNvbScpO1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5BRERfSU5GTyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICdFbWFpbCB1cGRhdGVkJ1xuICAgICAgICAgICAgICAgICAgICB9XSk7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgc2V0IGFuIGVycm9yIG9uIGZhaWxlZCBwb3N0IHJlcXVlc3QgdG8gL2FwaS92MS91c2VyL3VwZGF0ZS9lbWFpbCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICB2YXIgZW1haWwgPSBmYWxzZTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zLm9uUG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9lbWFpbCcpLnJlcGx5KDUwMCwgeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyB9KTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaCh1c2VyQWN0aW9uc18xLnVwZGF0ZUVtYWlsKCd0ZXN0QHRlc3QuY29tJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gZW1haWwgPSAndGVzdEB0ZXN0LmNvbSc7IH0pKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2UoZW1haWwpO1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5BRERfRVJST1IsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnXG4gICAgICAgICAgICAgICAgICAgIH1dKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBzZXQgaW5mbyBvbiBzdWNjZXNzZnVsIHBvc3QgcmVxdWVzdCB0byAvYXBpL3YxL3VzZXIvdXBkYXRlL3Bhc3N3b3JkJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHZhciB1cGRhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICBtb2NrU3RvcmUuZGlzcGF0Y2godXNlckFjdGlvbnNfMS51cGRhdGVQYXNzd29yZCgnYScsICdiJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gdXBkYXRlZCA9IHRydWU7IH0pKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzVHJ1ZSh1cGRhdGVkKTtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuQUREX0lORk8sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAnUGFzc3dvcmQgdXBkYXRlZCdcbiAgICAgICAgICAgICAgICAgICAgfV0pO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHNldCBhbiBlcnJvciBvbiBmYWlsZWQgcG9zdCByZXF1ZXN0IHRvIC9hcGkvdjEvdXNlci91cGRhdGUvcGFzc3dvcmQnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdmFyIHVwZGF0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zLm9uUG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9wYXNzd29yZCcpLnJlcGx5KDUwMCwgeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyB9KTtcbiAgICAgICAgICAgIG1vY2tTdG9yZS5kaXNwYXRjaCh1c2VyQWN0aW9uc18xLnVwZGF0ZVBhc3N3b3JkKCdhJywgJ2InLCBmdW5jdGlvbiAoKSB7IHJldHVybiB1cGRhdGVkID0gdHJ1ZTsgfSkpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNGYWxzZSh1cGRhdGVkKTtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuQUREX0VSUk9SLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJ1NvbWV0aGluZyB3ZW50IHdyb25nJ1xuICAgICAgICAgICAgICAgICAgICB9XSk7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShkb25lKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ0NoYW5uZWxzIGFzeW5jIGFjdGlvbnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbW9ja1N0b3JlID0gbW9ja1N0b3JlQ3JlYXRvcih7XG4gICAgICAgICAgICAgICAgY2hhbm5lbHM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBuYW1lOiAnZ2VuZXJhbCcsIGZldGNoaW5nTmV3TWVzc2FnZXM6IGZhbHNlLCBoYXNNb3JlTWVzc2FnZXM6IHRydWUsIHJldHJpZXZlTWVzc2FnZXNPZmZzZXQ6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBuYW1lOiAnZmV0Y2hpbmcgbmV3IG1lc3NhZ2VzJywgZmV0Y2hpbmdOZXdNZXNzYWdlczogdHJ1ZSwgaGFzTW9yZU1lc3NhZ2VzOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbmFtZTogJ25vIG1vcmUgbWVzc2FnZXMnLCBmZXRjaGluZ05ld01lc3NhZ2VzOiBmYWxzZSwgaGFzTW9yZU1lc3NhZ2VzOiBmYWxzZSB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5vbkFueSgpLnJlcGx5KDIwMCwge30pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmZXRjaCBjaGFubmVscyBhbmQgZGlzcGF0Y2ggYWRkQ2hhbm5lbHMgd2l0aCBhbiBhcnJheSBvZiBjaGFubmVsIG5hbWVzJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHZhciBjaGFubmVscyA9IFtcbiAgICAgICAgICAgICAgICB7IF9pZDogJzEnLCBuYW1lOiAnZ2VuZXJhbCcgfSxcbiAgICAgICAgICAgICAgICB7IF9pZDogJzInLCBuYW1lOiAncmFuZG9tJyB9LFxuICAgICAgICAgICAgICAgIHsgX2lkOiAnMycsIG5hbWU6ICdzb21ldGhpbmcgZWxzZScgfVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zXG4gICAgICAgICAgICAgICAgLm9uR2V0KCcvYXBpL3YxL2NoYW5uZWxzJylcbiAgICAgICAgICAgICAgICAucmVwbHkoMjAwLCB7IGNoYW5uZWxzOiBjaGFubmVscyB9KTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5mZXRjaENoYW5uZWxzKCkpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB2YXIgYWRkQ2hhbm5lbHNBY3Rpb24gPSBjaGFubmVsc0FjdGlvbnNfMS5hZGRDaGFubmVscyhbJ2dlbmVyYWwnLCAncmFuZG9tJywgJ3NvbWV0aGluZyBlbHNlJ10pO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFthZGRDaGFubmVsc0FjdGlvbl0pO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGRpc3BhdGNoIGFkZEVycm9yIG9uIGZhaWxlZCByZXF1ZXN0IHRvIC9hcGkvdjEvY2hhbm5lbHMnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3NcbiAgICAgICAgICAgICAgICAub25HZXQoJy9hcGkvdjEvY2hhbm5lbHMnKVxuICAgICAgICAgICAgICAgIC5yZXBseSg1MDApO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmZldGNoQ2hhbm5lbHMoKSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgIHZhciBlcnJvckFjdGlvbiA9IG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBmZXRjaCB0aGUgY2hhbm5lbHMnKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbZXJyb3JBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCBhbiBlcnJvciBpZiByZXRyaWV2aW5nIG1lc3NhZ2VzIHdpdGggaW52YWxpZCBjaGFubmVsIG5hbWUnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLnJldHJpZXZlQ2hhbm5lbE1lc3NhZ2VzKCdpbnZhbGlkIG5hbWUnKSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChtc2csICdSZXRyaWV2ZSBDaGFubmVsIE1lc3NhZ2VzIGRpc3BhdGNoZWQgd2l0aCBpbmNvcnJlY3QgY2hhbm5lbCBuYW1lIG9yIHdoaWxlIGFscmVhZHkgZmV0Y2hpbmcgbWVzc2FnZXMnKTtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgdmFyIGVycm9yQWN0aW9uID0gbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIGZldGNoIG1lc3NhZ2VzJyk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW2Vycm9yQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZGlzcGF0Y2ggYW4gZXJyb3IgaWYgYWxyZWFkeSByZXRyaWV2aW5nIGNoYW5uZWwgbWVzc2FnZXMnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLnJldHJpZXZlQ2hhbm5lbE1lc3NhZ2VzKCdmZXRjaGluZyBuZXcgbWVzc2FnZXMnKSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChtc2csICdSZXRyaWV2ZSBDaGFubmVsIE1lc3NhZ2VzIGRpc3BhdGNoZWQgd2l0aCBpbmNvcnJlY3QgY2hhbm5lbCBuYW1lIG9yIHdoaWxlIGFscmVhZHkgZmV0Y2hpbmcgbWVzc2FnZXMnKTtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgdmFyIGVycm9yQWN0aW9uID0gbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIGZldGNoIG1lc3NhZ2VzJyk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW2Vycm9yQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZGlzcGF0Y2ggYW4gZXJyb3IgaWYgY2hhbm5lbCBkb2VzIG5vdCBoYXZlIG9sZGVyIG1lc3NhZ2VzJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5yZXRyaWV2ZUNoYW5uZWxNZXNzYWdlcygnbm8gbW9yZSBtZXNzYWdlcycpKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKG1zZywgJ1JldHJpZXZlIENoYW5uZWwgTWVzc2FnZXMgZGlzcGF0Y2hlZCB3aXRoIGluY29ycmVjdCBjaGFubmVsIG5hbWUgb3Igd2hpbGUgYWxyZWFkeSBmZXRjaGluZyBtZXNzYWdlcycpO1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JBY3Rpb24gPSBub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gZmV0Y2ggbWVzc2FnZXMnKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbZXJyb3JBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCBhbiBlcnJvciBvbiBmYWlsZWQgZ2V0IHJlcXVlc3QgdG8gL2FwaS92MS9tZXNzYWdlcy8nLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3NcbiAgICAgICAgICAgICAgICAub25HZXQoKVxuICAgICAgICAgICAgICAgIC5yZXBseSg1MDApO1xuICAgICAgICAgICAgdmFyIGNoYW5uZWwgPSAnZ2VuZXJhbCc7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEucmV0cmlldmVDaGFubmVsTWVzc2FnZXMoY2hhbm5lbCkpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB2YXIgc2V0RmV0Y2hpbmdUcnVlQWN0aW9uID0gY2hhbm5lbHNBY3Rpb25zXzEuc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMoY2hhbm5lbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdmFyIGVycm9yQWN0aW9uID0gbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIGZldGNoIG1lc3NhZ2VzJyk7XG4gICAgICAgICAgICAgICAgdmFyIHNldEZldGNoaW5nRmFsc2VBY3Rpb24gPSBjaGFubmVsc0FjdGlvbnNfMS5zZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcyhjaGFubmVsLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW3NldEZldGNoaW5nVHJ1ZUFjdGlvbiwgZXJyb3JBY3Rpb24sIHNldEZldGNoaW5nRmFsc2VBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBzZXQgY2hhbm5lbEhhc01vcmVNZXNzYWdlcyBvbiByZXNwb25zZSB3aXRoIGVtcHR5IGFycmF5JywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zXG4gICAgICAgICAgICAgICAgLm9uR2V0KClcbiAgICAgICAgICAgICAgICAucmVwbHkoMjAwLCB7IG1lc3NhZ2VzOiBbXSB9KTtcbiAgICAgICAgICAgIHZhciBjaGFubmVsID0gJ2dlbmVyYWwnO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLnJldHJpZXZlQ2hhbm5lbE1lc3NhZ2VzKGNoYW5uZWwpKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgdmFyIHNldEZldGNoaW5nVHJ1ZUFjdGlvbiA9IGNoYW5uZWxzQWN0aW9uc18xLnNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzKGNoYW5uZWwsIHRydWUpO1xuICAgICAgICAgICAgICAgIHZhciBzZXRIYXNNb3JlQWN0aW9uID0gY2hhbm5lbHNBY3Rpb25zXzEuc2V0Q2hhbm5lbEhhc01vcmVNZXNzYWdlcyhjaGFubmVsLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdmFyIHNldEZldGNoaW5nRmFsc2VBY3Rpb24gPSBjaGFubmVsc0FjdGlvbnNfMS5zZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcyhjaGFubmVsLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW3NldEZldGNoaW5nVHJ1ZUFjdGlvbiwgc2V0SGFzTW9yZUFjdGlvbiwgc2V0RmV0Y2hpbmdGYWxzZUFjdGlvbl0pO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGluY3JlbWVudCBvZmZzZXQgKGJhc2VkIG9uIG51bWJlciBvZiByZWNlaXZlZCBtZXNzYWdlcykgYW5kIGFkZCByZXRyaWV2ZWQgY2hhbm5lbCBtZXNzYWdlcyBvbiBzdWNjZXNzZnVsIHJldHJlaXZlQ2hhbm5lbE1lc3NhZ2VzIGFjdGlvbicsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICB2YXIgY2hhbm5lbCA9ICdnZW5lcmFsJztcbiAgICAgICAgICAgIHZhciBtZXNzYWdlcyA9IFt7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICcxMjMnLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkOiBEYXRlLm5vdygpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHVzZXJFbWFpbDogJ3Rlc3RAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgICAgICBfaWQ6ICcxJ1xuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJzQ1NicsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZWQ6IERhdGUubm93KCkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgdXNlckVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgICAgIF9pZDogJzInXG4gICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvc1xuICAgICAgICAgICAgICAgIC5vbkdldCgpXG4gICAgICAgICAgICAgICAgLnJlcGx5KDIwMCwgeyBtZXNzYWdlczogbWVzc2FnZXMgfSk7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEucmV0cmlldmVDaGFubmVsTWVzc2FnZXMoY2hhbm5lbCkpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB2YXIgc2V0RmV0Y2hpbmdUcnVlQWN0aW9uID0gY2hhbm5lbHNBY3Rpb25zXzEuc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMoY2hhbm5lbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdmFyIGluY3JlbWVudE9mZnNldEFjdGlvbiA9IGNoYW5uZWxzQWN0aW9uc18xLmluY3JlbWVudENoYW5uZWxSZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0KGNoYW5uZWwsIG1lc3NhZ2VzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgdmFyIGFkZE1lc3NhZ2VzQWN0aW9uID0gY2hhbm5lbHNBY3Rpb25zXzEuYWRkUmV0cmlldmVkQ2hhbm5lbE1lc3NhZ2VzKGNoYW5uZWwsIG1lc3NhZ2VzKTtcbiAgICAgICAgICAgICAgICB2YXIgc2V0RmV0Y2hpbmdGYWxzZUFjdGlvbiA9IGNoYW5uZWxzQWN0aW9uc18xLnNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzKGNoYW5uZWwsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbXG4gICAgICAgICAgICAgICAgICAgIHNldEZldGNoaW5nVHJ1ZUFjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgaW5jcmVtZW50T2Zmc2V0QWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICBhZGRNZXNzYWdlc0FjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgc2V0RmV0Y2hpbmdGYWxzZUFjdGlvblxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGRpc3BhdGNoIGluZm8gb24gc3VjY2Vzc2Z1bGx5IGRlbGV0aW5nIGNoYW5uZWwnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdmFyIGNoYW5uZWxzID0gW1xuICAgICAgICAgICAgICAgIHsgX2lkOiAnMScsIG5hbWU6ICdnZW5lcmFsJyB9LFxuICAgICAgICAgICAgICAgIHsgX2lkOiAnMicsIG5hbWU6ICdyYW5kb20nIH0sXG4gICAgICAgICAgICAgICAgeyBfaWQ6ICczJywgbmFtZTogJ3NvbWV0aGluZyBlbHNlJyB9XG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3NcbiAgICAgICAgICAgICAgICAub25HZXQoJy9hcGkvdjEvY2hhbm5lbHMnKVxuICAgICAgICAgICAgICAgIC5yZXBseSgyMDAsIHsgY2hhbm5lbHM6IGNoYW5uZWxzIH0pO1xuICAgICAgICAgICAgbW9ja0F4aW9zXG4gICAgICAgICAgICAgICAgLm9uR2V0KClcbiAgICAgICAgICAgICAgICAucmVwbHkoMjAwKTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5kZWxldGVDaGFubmVsKCdnZW5lcmFsJykpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB2YXIgYWRkSW5mb0FjdGlvbiA9IG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkSW5mbygnQ2hhbm5lbCBkZWxldGVkJyk7XG4gICAgICAgICAgICAgICAgdmFyIGFkZENoYW5uZWxzQWN0aW9uID0gY2hhbm5lbHNBY3Rpb25zXzEuYWRkQ2hhbm5lbHMoWydnZW5lcmFsJywgJ3JhbmRvbScsICdzb21ldGhpbmcgZWxzZSddKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbYWRkSW5mb0FjdGlvbiwgYWRkQ2hhbm5lbHNBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCBhbiBlcnJvciBvbiBmYWlsZWQgYXR0ZW1wdCB0byBkZWxldGUgY2hhbm5lbCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvc1xuICAgICAgICAgICAgICAgIC5vbkdldCgpXG4gICAgICAgICAgICAgICAgLnJlcGx5KDUwMCwgeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyB9KTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5kZWxldGVDaGFubmVsKCdnZW5lcmFsJykpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB2YXIgYWRkRXJyb3JBY3Rpb24gPSBub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZycpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFthZGRFcnJvckFjdGlvbl0pO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGRpc3BhdGNoIGluZm8gb24gY3JlYXRpbmcgbmV3IGNoYW5uZWwnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdmFyIGNoYW5uZWxzID0gW1xuICAgICAgICAgICAgICAgIHsgX2lkOiAnMScsIG5hbWU6ICdnZW5lcmFsJyB9LFxuICAgICAgICAgICAgICAgIHsgX2lkOiAnMicsIG5hbWU6ICdyYW5kb20nIH0sXG4gICAgICAgICAgICAgICAgeyBfaWQ6ICczJywgbmFtZTogJ3NvbWV0aGluZyBlbHNlJyB9XG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3NcbiAgICAgICAgICAgICAgICAub25HZXQoJy9hcGkvdjEvY2hhbm5lbHMnKVxuICAgICAgICAgICAgICAgIC5yZXBseSgyMDAsIHsgY2hhbm5lbHM6IGNoYW5uZWxzIH0pO1xuICAgICAgICAgICAgbW9ja0F4aW9zXG4gICAgICAgICAgICAgICAgLm9uUG9zdCgpXG4gICAgICAgICAgICAgICAgLnJlcGx5KDIwMCk7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuYWRkQ2hhbm5lbCgnbmV3IGNoYW5uZWwnKSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgIHZhciBhZGRJbmZvQWN0aW9uID0gbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRJbmZvKCdDaGFubmVsIGNyZWF0ZWQnKTtcbiAgICAgICAgICAgICAgICB2YXIgYWRkQ2hhbm5lbHNBY3Rpb24gPSBjaGFubmVsc0FjdGlvbnNfMS5hZGRDaGFubmVscyhbJ2dlbmVyYWwnLCAncmFuZG9tJywgJ3NvbWV0aGluZyBlbHNlJ10pO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFthZGRJbmZvQWN0aW9uLCBhZGRDaGFubmVsc0FjdGlvbl0pO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGRpc3BhdGNoIGFuIGVycm9yIG9uIGZhaWxlZCBhdHRlbXB0IHRvIGNyZWF0ZSBhIG5ldyBjaGFubmVsJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zXG4gICAgICAgICAgICAgICAgLm9uQW55KClcbiAgICAgICAgICAgICAgICAucmVwbHkoNTAwLCB7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnIH0pO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmFkZENoYW5uZWwoJ25ldyBjaGFubmVsJykpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB2YXIgYWRkRXJyb3JBY3Rpb24gPSBub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZycpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFthZGRFcnJvckFjdGlvbl0pO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdTb2NrZXQgYXN5bmMgYWN0aW9ucycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBtb2NrU3RvcmUgPSBnZXRTdG9yZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBpbml0aWFsaXplIHdlYnNvY2tldCBjb25uZWN0aW9uJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbW9ja1N0b3JlLmRpc3BhdGNoKHNvY2tldEFjdGlvbnNfMS5pbml0KCkpO1xuICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChhY3Rpb25zWzBdLnR5cGUsIHNvY2tldEFjdGlvbnNfMS5JTklUX1dFQlNPQ0tFVCk7XG4gICAgICAgICAgICBhY3Rpb25zWzBdLmRhdGEuaW8uY2xvc2UoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ0NoYXQgVXNlcnMgYXN5bmMgYWN0aW9ucycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBtb2NrU3RvcmUgPSBnZXRTdG9yZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXBhdGNoIHVwZGF0ZVVzZXJzIG9uIGZldGNoIGFsbCB1c2VycycsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICB2YXIgdXNlcnNSZXNwb25zZSA9IFt7XG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6ICdhZG1pbicsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICd0ZXN0J1xuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6ICd0ZXN0MkB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6ICdnZW5lcmFsJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3Rlc3QnXG4gICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICB2YXIgdXNlcnMgPSB7fTtcbiAgICAgICAgICAgIHVzZXJzUmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiAodSkge1xuICAgICAgICAgICAgICAgIHVzZXJzW3UuZW1haWxdID0ge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiB1Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IHUucm9sZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zLm9uQW55KCkucmVwbHkoMjAwLCB7IHVzZXJzOiB1c2Vyc1Jlc3BvbnNlIH0pO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKGNoYXRVc2Vyc0FjdGlvbnNfMS5mZXRjaEFsbFVzZXJzKCkpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB2YXIgdXBkYXRlVXNlcnNBY3Rpb24gPSBjaGF0VXNlcnNBY3Rpb25zXzEudXBkYXRlVXNlcnModXNlcnMpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFt1cGRhdGVVc2Vyc0FjdGlvbl0pO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGRpc3BhdGNoIGFkZEVycm9yIG9uIGZhaWxlZCBhdHRlbXB0IHRvIGZldGNoIHVzZXJzJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zLm9uQW55KCkucmVwbHkoNTAwKTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChjaGF0VXNlcnNBY3Rpb25zXzEuZmV0Y2hBbGxVc2VycygpKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgdmFyIGFkZEVycm9yQWN0aW9uID0gbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignRmV0Y2hpbmcgYWxsIHVzZXJzIGZhaWxlZCcpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFthZGRFcnJvckFjdGlvbl0pO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGNyZWF0ZSBhIG5ldyB1c2VyJyk7XG4gICAgICAgIGl0KCdzaG91bGQgZWRpdCB0aGUgdXNlcicpO1xuICAgICAgICBpdCgnc2hvdWxkIGRlbGV0ZSB0aGUgdXNlcicpO1xuICAgIH0pO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lkR1Z6ZEVGemVXNWpRV04wYVc5dWN5NXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1TDNSbGMzUnpMM2RsWWk5MFpYTjBRWE41Ym1OQlkzUnBiMjV6TG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN08wRkJRVUVzYVVKQlFXVTdRVUZEWml3clFrRkJNRUk3UVVGRE1VSXNOa0pCUVRoQ08wRkJRemxDTEhsRVFVRTJRenRCUVVNM1F5eHhSRUZCYzBZN1FVRkRkRVlzTWtOQlFTdENPMEZCUXk5Q0xHbEZRVUUwUmp0QlFVVTFSaXh0UmtGQmIwYzdRVUZGY0Vjc2NVVkJRWE5ITzBGQlEzUkhMSGxGUVVGdlVqdEJRVU53VWl3eVJVRkJiMFk3UVVGSmNFWXNTVUZCVFN4blFrRkJaMElzUjBGQmNVSXNOa0pCUVdNc1EwRkJReXhEUVVGRExIZENRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRPMEZCUlc1RkxGTkJRVk1zVVVGQlVTeERRVUZETEV0QlFWVTdTVUZCVml4elFrRkJRU3hGUVVGQkxGVkJRVlU3U1VGRGVFSXNUMEZCVHl4blFrRkJaMElzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0QlFVTnVReXhEUVVGRE8wRkJSVVFzVVVGQlVTeERRVUZETEdWQlFXVXNSVUZCUlR0SlFVTjBRaXhKUVVGSkxGTkJRWEZETEVOQlFVTTdTVUZETVVNc1NVRkJTU3hUUVVGelFpeERRVUZETzBsQlJUTkNMRTFCUVUwc1EwRkJRenRSUVVOSUxGTkJRVk1zUjBGQlJ5eEpRVUZKTEN0Q1FVRlhMRU5CUVVNc2EwSkJRVXNzUTBGQlF5eERRVUZETzBsQlEzWkRMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJSVWdzUzBGQlN5eERRVUZETzFGQlEwWXNVMEZCVXl4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRE8wbEJRM2hDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUlVnc1VVRkJVU3hEUVVGRExHOUNRVUZ2UWl4RlFVRkZPMUZCUXpOQ0xGVkJRVlVzUTBGQlF6dFpRVU5RTEZOQlFWTXNSMEZCUnl4UlFVRlJMRVZCUVVVc1EwRkJRenRaUVVOMlFpeFRRVUZUTEVOQlFVTXNTMEZCU3l4RlFVRkZMRU5CUVVNN1dVRkRiRUlzVTBGQlV5eERRVUZETEV0QlFVc3NSVUZCUlN4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFVkJRVVVzUlVGQlJTeERRVUZETEVOQlFVRTdVVUZEY0VNc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEZRVUZGTEVOQlFVTXNjME5CUVhORE8xbEJRM1JETEhkRVFVRjNSQ3hGUVVGRkxGVkJRVk1zU1VGQlNUdFpRVU5zUlN4SlFVRkpMRWxCUVVrc1IwRkJiMElzUzBGQlN5eERRVUZETzFsQlEyeERMRk5CUVZNN2FVSkJRMG9zVVVGQlVTeERRVUZETEhkQ1FVRlZMRU5CUVVNc1VVRkJVU3hGUVVGRkxHTkJRVTBzVDBGQlFTeEpRVUZKTEVkQlFVY3NVVUZCVVN4RlFVRm1MRU5CUVdVc1EwRkJReXhEUVVGRE8ybENRVU55UkN4SlFVRkpMRU5CUVVNN1owSkJRMFlzWVVGQlRTeERRVUZETEZkQlFWY3NRMEZCUXl4SlFVRkpMRVZCUVVVc1VVRkJVU3hEUVVGRExFTkJRVU03WjBKQlEyNURMRWxCUVUwc1QwRkJUeXhIUVVGblFpeFRRVUZUTEVOQlFVTXNWVUZCVlN4RlFVRkZMRU5CUVVNN1owSkJRM0JFTEdGQlFVMHNRMEZCUXl4bFFVRmxMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU03ZDBKQlF6ZENMRWxCUVVrc1JVRkJSU3dyUWtGQlVUdDNRa0ZEWkN4SlFVRkpMRVZCUVVVc1kwRkJZenR4UWtGRGRrSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1owSkJRMG9zU1VGQlNTeEZRVUZGTEVOQlFVTTdXVUZEV0N4RFFVRkRMRU5CUVVNc1EwRkJReXhQUVVGTExFTkJRVUVzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTXpRaXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl4M1JVRkJkMFVzUlVGQlJTeFZRVUZUTEVsQlFVazdXVUZEZEVZc1NVRkJTU3hKUVVGSkxFZEJRVzlDTEV0QlFVc3NRMEZCUXp0WlFVTnNReXhUUVVGVExFTkJRVU1zUzBGQlN5eEZRVUZGTEVOQlFVTTdXVUZEYkVJc1UwRkJVeXhEUVVGRExFMUJRVTBzUTBGQlF5d3dRa0ZCTUVJc1EwRkJReXhEUVVGRExFdEJRVXNzUTBGQlF5eEhRVUZITEVWQlFVVXNSVUZCUXl4TFFVRkxMRVZCUVVVc2MwSkJRWE5DTEVWQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTNwR0xGTkJRVk03YVVKQlEwb3NVVUZCVVN4RFFVRkRMSGRDUVVGVkxFTkJRVU1zVVVGQlVTeEZRVUZGTEdOQlFVMHNUMEZCUVN4SlFVRkpMRWRCUVVjc1VVRkJVU3hGUVVGbUxFTkJRV1VzUTBGQlF5eERRVUZETzJsQ1FVTnlSQ3hKUVVGSkxFTkJRVU03WjBKQlEwWXNZVUZCVFN4RFFVRkRMRmRCUVZjc1EwRkJReXhKUVVGSkxFVkJRVVVzUzBGQlN5eERRVUZETEVOQlFVTTdaMEpCUTJoRExFbEJRVTBzVDBGQlR5eEhRVUZuUWl4VFFVRlRMRU5CUVVNc1ZVRkJWU3hGUVVGRkxFTkJRVU03WjBKQlEzQkVMR0ZCUVUwc1EwRkJReXhsUVVGbExFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTTdkMEpCUXpkQ0xFbEJRVWtzUlVGQlJTeG5RMEZCVXp0M1FrRkRaaXhKUVVGSkxFVkJRVVVzYzBKQlFYTkNPM0ZDUVVNdlFpeERRVUZETEVOQlFVTXNRMEZCUXp0blFrRkRTaXhKUVVGSkxFVkJRVVVzUTBGQlF6dFpRVU5ZTEVOQlFVTXNRMEZCUXl4RFFVRkRMRTlCUVVzc1EwRkJRU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFGQlEzWkNMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzUlVGQlJTeERRVUZETEhORFFVRnpRenRaUVVOMFF5eDVSRUZCZVVRc1JVRkJSU3hWUVVGVExFbEJRVWs3V1VGRGRrVXNTVUZCU1N4TFFVRkxMRWRCUVcxQ0xFdEJRVXNzUTBGQlF6dFpRVU5zUXl4VFFVRlRPMmxDUVVOS0xGRkJRVkVzUTBGQlF5eDVRa0ZCVnl4RFFVRkRMR1ZCUVdVc1JVRkJSU3hqUVVGTkxFOUJRVUVzUzBGQlN5eEhRVUZITEdWQlFXVXNSVUZCZGtJc1EwRkJkVUlzUTBGQlF5eERRVUZETzJsQ1FVTnlSU3hKUVVGSkxFTkJRVU03WjBKQlEwWXNZVUZCVFN4RFFVRkRMRmRCUVZjc1EwRkJReXhMUVVGTExFVkJRVVVzWlVGQlpTeERRVUZETEVOQlFVTTdaMEpCUXpORExFbEJRVTBzVDBGQlR5eEhRVUZuUWl4VFFVRlRMRU5CUVVNc1ZVRkJWU3hGUVVGRkxFTkJRVU03WjBKQlEzQkVMR0ZCUVUwc1EwRkJReXhsUVVGbExFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTTdkMEpCUXpkQ0xFbEJRVWtzUlVGQlJTd3JRa0ZCVVR0M1FrRkRaQ3hKUVVGSkxFVkJRVVVzWlVGQlpUdHhRa0ZEZUVJc1EwRkJReXhEUVVGRExFTkJRVU03WjBKQlEwb3NTVUZCU1N4RlFVRkZMRU5CUVVNN1dVRkRXQ3hEUVVGRExFTkJRVU1zUTBGRFJDeFBRVUZMTEVOQlFVRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVOeVFpeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXg1UlVGQmVVVXNSVUZCUlN4VlFVRlRMRWxCUVVrN1dVRkRka1lzU1VGQlNTeExRVUZMTEVkQlFXMUNMRXRCUVVzc1EwRkJRenRaUVVOc1F5eFRRVUZUTEVOQlFVTXNTMEZCU3l4RlFVRkZMRU5CUVVNN1dVRkRiRUlzVTBGQlV5eERRVUZETEUxQlFVMHNRMEZCUXl3eVFrRkJNa0lzUTBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRVZCUVVVc1JVRkJSU3hMUVVGTExFVkJRVVVzYzBKQlFYTkNMRVZCUVVVc1EwRkJReXhEUVVGRE8xbEJRelZHTEZOQlFWTTdhVUpCUTBvc1VVRkJVU3hEUVVGRExIbENRVUZYTEVOQlFVTXNaVUZCWlN4RlFVRkZMR05CUVUwc1QwRkJRU3hMUVVGTExFZEJRVWNzWlVGQlpTeEZRVUYyUWl4RFFVRjFRaXhEUVVGRExFTkJRVU03YVVKQlEzSkZMRWxCUVVrc1EwRkJRenRuUWtGRFJpeGhRVUZOTEVOQlFVTXNUMEZCVHl4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRE8yZENRVU4wUWl4SlFVRk5MRTlCUVU4c1IwRkJaMElzVTBGQlV5eERRVUZETEZWQlFWVXNSVUZCUlN4RFFVRkRPMmRDUVVOd1JDeGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRE8zZENRVU0zUWl4SlFVRkpMRVZCUVVVc1owTkJRVk03ZDBKQlEyWXNTVUZCU1N4RlFVRkZMSE5DUVVGelFqdHhRa0ZETDBJc1EwRkJReXhEUVVGRExFTkJRVU03WjBKQlEwb3NTVUZCU1N4RlFVRkZMRU5CUVVNN1dVRkRXQ3hEUVVGRExFTkJRVU1zUTBGRFJDeFBRVUZMTEVOQlFVRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVOeVFpeERRVUZETEVOQlFVTXNRMEZCUVR0UlFVTkdMRVZCUVVVc1EwRkJReXcwUlVGQk5FVXNSVUZCUlN4VlFVRlRMRWxCUVVrN1dVRkRNVVlzU1VGQlNTeFBRVUZQTEVkQlFWa3NTMEZCU3l4RFFVRkRPMWxCUXpkQ0xGTkJRVk1zUTBGQlF5eFJRVUZSTEVOQlFVTXNORUpCUVdNc1EwRkJReXhIUVVGSExFVkJRVVVzUjBGQlJ5eEZRVUZGTEdOQlFVMHNUMEZCUVN4UFFVRlBMRWRCUVVjc1NVRkJTU3hGUVVGa0xFTkJRV01zUTBGQlF5eERRVUZETzJsQ1FVTTNSQ3hKUVVGSkxFTkJRVU03WjBKQlEwWXNZVUZCVFN4RFFVRkRMRTFCUVUwc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF6dG5Ra0ZEZGtJc1NVRkJUU3hQUVVGUExFZEJRV2RDTEZOQlFWTXNRMEZCUXl4VlFVRlZMRVZCUVVVc1EwRkJRenRuUWtGRGNFUXNZVUZCVFN4RFFVRkRMR1ZCUVdVc1EwRkJReXhQUVVGUExFVkJRVVVzUTBGQlF6dDNRa0ZETjBJc1NVRkJTU3hGUVVGRkxDdENRVUZSTzNkQ1FVTmtMRWxCUVVrc1JVRkJSU3hyUWtGQmEwSTdjVUpCUXpOQ0xFTkJRVU1zUTBGQlF5eERRVUZETzJkQ1FVTktMRWxCUVVrc1JVRkJSU3hEUVVGRE8xbEJRMWdzUTBGQlF5eERRVUZETEVOQlEwUXNUMEZCU3l4RFFVRkJMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRGNrSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hGUVVGRkxFTkJRVU1zTkVWQlFUUkZMRVZCUVVVc1ZVRkJVeXhKUVVGSk8xbEJRekZHTEVsQlFVa3NUMEZCVHl4SFFVRlpMRXRCUVVzc1EwRkJRenRaUVVNM1FpeFRRVUZUTEVOQlFVTXNTMEZCU3l4RlFVRkZMRU5CUVVNN1dVRkRiRUlzVTBGQlV5eERRVUZETEUxQlFVMHNRMEZCUXl3NFFrRkJPRUlzUTBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRVZCUVVVc1JVRkJSU3hMUVVGTExFVkJRVVVzYzBKQlFYTkNMRVZCUVVVc1EwRkJReXhEUVVGRE8xbEJReTlHTEZOQlFWTXNRMEZCUXl4UlFVRlJMRU5CUVVNc05FSkJRV01zUTBGQlF5eEhRVUZITEVWQlFVVXNSMEZCUnl4RlFVRkZMR05CUVUwc1QwRkJRU3hQUVVGUExFZEJRVWNzU1VGQlNTeEZRVUZrTEVOQlFXTXNRMEZCUXl4RFFVRkRPMmxDUVVNM1JDeEpRVUZKTEVOQlFVTTdaMEpCUTBZc1lVRkJUU3hEUVVGRExFOUJRVThzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0blFrRkRlRUlzU1VGQlRTeFBRVUZQTEVkQlFXZENMRk5CUVZNc1EwRkJReXhWUVVGVkxFVkJRVVVzUTBGQlF6dG5Ra0ZEY0VRc1lVRkJUU3hEUVVGRExHVkJRV1VzUTBGQlF5eFBRVUZQTEVWQlFVVXNRMEZCUXp0M1FrRkROMElzU1VGQlNTeEZRVUZGTEdkRFFVRlRPM2RDUVVObUxFbEJRVWtzUlVGQlJTeHpRa0ZCYzBJN2NVSkJReTlDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMmRDUVVOS0xFbEJRVWtzUlVGQlJTeERRVUZETzFsQlExZ3NRMEZCUXl4RFFVRkRMRU5CUTBRc1QwRkJTeXhEUVVGQkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdVVUZEY2tJc1EwRkJReXhEUVVGRExFTkJRVUU3U1VGRFRpeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTklMRkZCUVZFc1EwRkJReXgzUWtGQmQwSXNSVUZCUlR0UlFVTXZRaXhWUVVGVkxFTkJRVU03V1VGSFVDeFRRVUZUTEVkQlFVY3NaMEpCUVdkQ0xFTkJRVU03WjBKQlEzcENMRkZCUVZFc1JVRkJSVHR2UWtGRFRpeEZRVUZGTEVsQlFVa3NSVUZCUlN4VFFVRlRMRVZCUVVVc2JVSkJRVzFDTEVWQlFVVXNTMEZCU3l4RlFVRkZMR1ZCUVdVc1JVRkJSU3hKUVVGSkxFVkJRVVVzYzBKQlFYTkNMRVZCUVVVc1EwRkJReXhGUVVGRk8yOUNRVU5xUnl4RlFVRkZMRWxCUVVrc1JVRkJSU3gxUWtGQmRVSXNSVUZCUlN4dFFrRkJiVUlzUlVGQlJTeEpRVUZKTEVWQlFVVXNaVUZCWlN4RlFVRkZMRWxCUVVrc1JVRkJSVHR2UWtGRGJrWXNSVUZCUlN4SlFVRkpMRVZCUVVVc2EwSkJRV3RDTEVWQlFVVXNiVUpCUVcxQ0xFVkJRVVVzUzBGQlN5eEZRVUZGTEdWQlFXVXNSVUZCUlN4TFFVRkxMRVZCUVVVN2FVSkJRMjVHTzJGQlEwb3NRMEZCUXl4RFFVRkRPMWxCUTBnc1UwRkJVeXhEUVVGRExFdEJRVXNzUlVGQlJTeERRVUZETzFsQlEyeENMRk5CUVZNc1EwRkJReXhMUVVGTExFVkJRVVVzUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4RlFVRkZMRVZCUVVVc1EwRkJReXhEUVVGRE8xRkJRM0pETEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1JVRkJSU3hEUVVGRExDdEZRVUVyUlN4RlFVRkZMRlZCUVZNc1NVRkJTVHRaUVVNM1JpeEpRVUZKTEZGQlFWRXNSMEZCYTBNN1owSkJRekZETEVWQlFVTXNSMEZCUnl4RlFVRkZMRWRCUVVjc1JVRkJSU3hKUVVGSkxFVkJRVVVzVTBGQlV5eEZRVUZETzJkQ1FVTXpRaXhGUVVGRExFZEJRVWNzUlVGQlJTeEhRVUZITEVWQlFVVXNTVUZCU1N4RlFVRkZMRkZCUVZFc1JVRkJRenRuUWtGRE1VSXNSVUZCUXl4SFFVRkhMRVZCUVVVc1IwRkJSeXhGUVVGRkxFbEJRVWtzUlVGQlJTeG5Ra0ZCWjBJc1JVRkJRenRoUVVGRExFTkJRVU03V1VGRGVFTXNVMEZCVXl4RFFVRkRMRXRCUVVzc1JVRkJSU3hEUVVGRE8xbEJRMnhDTEZOQlFWTTdhVUpCUTBvc1MwRkJTeXhEUVVGRExHdENRVUZyUWl4RFFVRkRPMmxDUVVONlFpeExRVUZMTEVOQlFVTXNSMEZCUnl4RlFVRkZMRVZCUVVNc1VVRkJVU3hGUVVGRkxGRkJRVkVzUlVGQlF5eERRVUZETEVOQlFVTTdXVUZEZEVNc1UwRkJVenRwUWtGRFNpeFJRVUZSTEVOQlFVTXNLMEpCUVdFc1JVRkJSU3hEUVVGRE8ybENRVU42UWl4SlFVRkpMRU5CUVVNN1owSkJRMFlzU1VGQlRTeFBRVUZQTEVkQlFXZENMRk5CUVZNc1EwRkJReXhWUVVGVkxFVkJRVVVzUTBGQlF6dG5Ra0ZEY0VRc1NVRkJUU3hwUWtGQmFVSXNSMEZCUnl3MlFrRkJWeXhEUVVGRExFTkJRVU1zVTBGQlV5eEZRVUZGTEZGQlFWRXNSVUZCUlN4blFrRkJaMElzUTBGQlF5eERRVUZETEVOQlFVTTdaMEpCUXk5RkxHRkJRVTBzUTBGQlF5eGxRVUZsTEVOQlFVTXNUMEZCVHl4RlFVRkZMRU5CUVVNc2FVSkJRV2xDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMmRDUVVOeVJDeEpRVUZKTEVWQlFVVXNRMEZCUXp0WlFVTllMRU5CUVVNc1EwRkJReXhEUVVGRExFOUJRVXNzUTBGQlFTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkJPMUZCUTNSQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NSVUZCUlN4RFFVRkRMR2RGUVVGblJTeEZRVUZGTEZWQlFWTXNTVUZCU1R0WlFVTTVSU3hUUVVGVExFTkJRVU1zUzBGQlN5eEZRVUZGTEVOQlFVTTdXVUZEYkVJc1UwRkJVenRwUWtGRFNpeExRVUZMTEVOQlFVTXNhMEpCUVd0Q0xFTkJRVU03YVVKQlEzcENMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dFpRVU5vUWl4VFFVRlRPMmxDUVVOS0xGRkJRVkVzUTBGQlF5d3JRa0ZCWVN4RlFVRkZMRU5CUVVNN2FVSkJRM3BDTEVsQlFVa3NRMEZCUXp0blFrRkRSaXhKUVVGTkxFOUJRVThzUjBGQlowSXNVMEZCVXl4RFFVRkRMRlZCUVZVc1JVRkJSU3hEUVVGRE8yZENRVU53UkN4SlFVRk5MRmRCUVZjc1IwRkJSeXdyUWtGQlVTeERRVUZETEhsRVFVRjVSQ3hEUVVGRExFTkJRVU03WjBKQlEzaEdMR0ZCUVUwc1EwRkJReXhsUVVGbExFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTXNWMEZCVnl4RFFVRkRMRU5CUVVNc1EwRkJRenRuUWtGREwwTXNTVUZCU1N4RlFVRkZMRU5CUVVNN1dVRkRXQ3hEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZMTEVOQlFVRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRVHRSUVVOMFFpeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXd5UlVGQk1rVXNSVUZCUlN4VlFVRlRMRWxCUVVrN1dVRkRla1lzVTBGQlV6dHBRa0ZEU2l4UlFVRlJMRU5CUVVNc2VVTkJRWFZDTEVOQlFVTXNZMEZCWXl4RFFVRkRMRU5CUVVNN2FVSkJRemRETEVsQlFVa3NRMEZCUXl4VlFVRkRMRWRCUVZjN1owSkJRMlFzWVVGQlRTeERRVUZETEZkQlFWY3NRMEZCUXl4SFFVRkhMRVZCUVVVc2NVZEJRWEZITEVOQlFVTXNRMEZCUXp0blFrRkRMMGdzU1VGQlRTeFBRVUZQTEVkQlFXZENMRk5CUVZNc1EwRkJReXhWUVVGVkxFVkJRVVVzUTBGQlF6dG5Ra0ZEY0VRc1NVRkJUU3hYUVVGWExFZEJRVWNzSzBKQlFWRXNRMEZCUXl4eFJFRkJjVVFzUTBGQlF5eERRVUZETzJkQ1FVTndSaXhoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRMRmRCUVZjc1EwRkJReXhEUVVGRExFTkJRVU03WjBKQlF5OURMRWxCUVVrc1JVRkJSU3hEUVVGRE8xbEJRMWdzUTBGQlF5eERRVUZETEVOQlFVTXNUMEZCU3l4RFFVRkJMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRE0wSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hGUVVGRkxFTkJRVU1zYVVWQlFXbEZMRVZCUVVVc1ZVRkJVeXhKUVVGSk8xbEJReTlGTEZOQlFWTTdhVUpCUTBvc1VVRkJVU3hEUVVGRExIbERRVUYxUWl4RFFVRkRMSFZDUVVGMVFpeERRVUZETEVOQlFVTTdhVUpCUXpGRUxFbEJRVWtzUTBGQlF5eFZRVUZETEVkQlFWYzdaMEpCUTJRc1lVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eEhRVUZITEVWQlFVVXNjVWRCUVhGSExFTkJRVU1zUTBGQlF6dG5Ra0ZETDBnc1NVRkJUU3hQUVVGUExFZEJRV2RDTEZOQlFWTXNRMEZCUXl4VlFVRlZMRVZCUVVVc1EwRkJRenRuUWtGRGNFUXNTVUZCVFN4WFFVRlhMRWRCUVVjc0swSkJRVkVzUTBGQlF5eHhSRUZCY1VRc1EwRkJReXhEUVVGRE8yZENRVU53Uml4aFFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExFOUJRVThzUlVGQlJTeERRVUZETEZkQlFWY3NRMEZCUXl4RFFVRkRMRU5CUVVNN1owSkJReTlETEVsQlFVa3NSVUZCUlN4RFFVRkRPMWxCUTFnc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlN5eERRVUZCTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRka0lzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4RlFVRkZMRU5CUVVNc2EwVkJRV3RGTEVWQlFVVXNWVUZCVXl4SlFVRkpPMWxCUTJoR0xGTkJRVk03YVVKQlEwb3NVVUZCVVN4RFFVRkRMSGxEUVVGMVFpeERRVUZETEd0Q1FVRnJRaXhEUVVGRExFTkJRVU03YVVKQlEzSkVMRWxCUVVrc1EwRkJReXhWUVVGRExFZEJRVmM3WjBKQlEyUXNZVUZCVFN4RFFVRkRMRmRCUVZjc1EwRkJReXhIUVVGSExFVkJRVVVzY1VkQlFYRkhMRU5CUVVNc1EwRkJRenRuUWtGREwwZ3NTVUZCVFN4UFFVRlBMRWRCUVdkQ0xGTkJRVk1zUTBGQlF5eFZRVUZWTEVWQlFVVXNRMEZCUXp0blFrRkRjRVFzU1VGQlRTeFhRVUZYTEVkQlFVY3NLMEpCUVZFc1EwRkJReXh4UkVGQmNVUXNRMEZCUXl4RFFVRkRPMmRDUVVOd1JpeGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRExGZEJRVmNzUTBGQlF5eERRVUZETEVOQlFVTTdaMEpCUXk5RExFbEJRVWtzUlVGQlJTeERRVUZETzFsQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNc1QwRkJTeXhEUVVGQkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdVVUZEZGtJc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEZRVUZGTEVOQlFVTXNjVVZCUVhGRkxFVkJRVVVzVlVGQlV5eEpRVUZKTzFsQlEyNUdMRk5CUVZNc1EwRkJReXhMUVVGTExFVkJRVVVzUTBGQlF6dFpRVU5zUWl4VFFVRlRPMmxDUVVOS0xFdEJRVXNzUlVGQlJUdHBRa0ZEVUN4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU03V1VGRGFFSXNTVUZCU1N4UFFVRlBMRWRCUVZjc1UwRkJVeXhEUVVGRE8xbEJRMmhETEZOQlFWTTdhVUpCUTBvc1VVRkJVU3hEUVVGRExIbERRVUYxUWl4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRE8ybENRVU14UXl4SlFVRkpMRU5CUVVNN1owSkJRMFlzU1VGQlRTeFBRVUZQTEVkQlFXZENMRk5CUVZNc1EwRkJReXhWUVVGVkxFVkJRVVVzUTBGQlF6dG5Ra0ZEY0VRc1NVRkJUU3h4UWtGQmNVSXNSMEZCUnl3clEwRkJOa0lzUTBGQlF5eFBRVUZQTEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1owSkJRek5GTEVsQlFVMHNWMEZCVnl4SFFVRkhMQ3RDUVVGUkxFTkJRVU1zY1VSQlFYRkVMRU5CUVVNc1EwRkJRenRuUWtGRGNFWXNTVUZCVFN4elFrRkJjMElzUjBGQlJ5d3JRMEZCTmtJc1EwRkJReXhQUVVGUExFVkJRVVVzUzBGQlN5eERRVUZETEVOQlFVTTdaMEpCUXpkRkxHRkJRVTBzUTBGQlF5eGxRVUZsTEVOQlFVTXNUMEZCVHl4RlFVRkZMRU5CUVVNc2NVSkJRWEZDTEVWQlFVVXNWMEZCVnl4RlFVRkZMSE5DUVVGelFpeERRVUZETEVOQlFVTXNRMEZCUXp0blFrRkRPVVlzU1VGQlNTeEZRVUZGTEVOQlFVTTdXVUZEV0N4RFFVRkRMRU5CUVVNc1EwRkJReXhQUVVGTExFTkJRVUVzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTjJRaXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl4blJVRkJaMFVzUlVGQlJTeFZRVUZUTEVsQlFVazdXVUZET1VVc1UwRkJVeXhEUVVGRExFdEJRVXNzUlVGQlJTeERRVUZETzFsQlEyeENMRk5CUVZNN2FVSkJRMG9zUzBGQlN5eEZRVUZGTzJsQ1FVTlFMRXRCUVVzc1EwRkJReXhIUVVGSExFVkJRVVVzUlVGQlJTeFJRVUZSTEVWQlFVVXNSVUZCUlN4RlFVRkRMRU5CUVVNc1EwRkJRenRaUVVOcVF5eEpRVUZKTEU5QlFVOHNSMEZCVnl4VFFVRlRMRU5CUVVNN1dVRkRhRU1zVTBGQlV6dHBRa0ZEU2l4UlFVRlJMRU5CUVVNc2VVTkJRWFZDTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN2FVSkJRekZETEVsQlFVa3NRMEZCUXp0blFrRkRSaXhKUVVGTkxFOUJRVThzUjBGQlowSXNVMEZCVXl4RFFVRkRMRlZCUVZVc1JVRkJSU3hEUVVGRE8yZENRVU53UkN4SlFVRk5MSEZDUVVGeFFpeEhRVUZITEN0RFFVRTJRaXhEUVVGRExFOUJRVThzUlVGQlJTeEpRVUZKTEVOQlFVTXNRMEZCUXp0blFrRkRNMFVzU1VGQlRTeG5Ra0ZCWjBJc1IwRkJSeXd5UTBGQmVVSXNRMEZCUXl4UFFVRlBMRVZCUVVVc1MwRkJTeXhEUVVGRExFTkJRVU03WjBKQlEyNUZMRWxCUVUwc2MwSkJRWE5DTEVkQlFVY3NLME5CUVRaQ0xFTkJRVU1zVDBGQlR5eEZRVUZGTEV0QlFVc3NRMEZCUXl4RFFVRkRPMmRDUVVNM1JTeGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRExIRkNRVUZ4UWl4RlFVRkZMR2RDUVVGblFpeEZRVUZGTEhOQ1FVRnpRaXhEUVVGRExFTkJRVU1zUTBGQlF6dG5Ra0ZEYmtjc1NVRkJTU3hGUVVGRkxFTkJRVU03V1VGRFdDeERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRkxMRU5CUVVFc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU4yUWl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5eG5Ta0ZCWjBvc1JVRkJSU3hWUVVGVExFbEJRVWs3V1VGRE9Vb3NTVUZCU1N4UFFVRlBMRWRCUVZjc1UwRkJVeXhEUVVGRE8xbEJRMmhETEVsQlFVa3NVVUZCVVN4SFFVRmpMRU5CUVVNN2IwSkJRM1pDTEVsQlFVa3NSVUZCUlN4TFFVRkxPMjlDUVVOWUxFOUJRVThzUlVGQlJTeEpRVUZKTEVOQlFVTXNSMEZCUnl4RlFVRkZMRU5CUVVNc1VVRkJVU3hGUVVGRk8yOUNRVU01UWl4VFFVRlRMRVZCUVVVc1pVRkJaVHR2UWtGRE1VSXNSMEZCUnl4RlFVRkZMRWRCUVVjN2FVSkJRMWdzUlVGQlJUdHZRa0ZEUXl4SlFVRkpMRVZCUVVVc1MwRkJTenR2UWtGRFdDeFBRVUZQTEVWQlFVVXNTVUZCU1N4RFFVRkRMRWRCUVVjc1JVRkJSU3hEUVVGRExGRkJRVkVzUlVGQlJUdHZRa0ZET1VJc1UwRkJVeXhGUVVGRkxHVkJRV1U3YjBKQlF6RkNMRWRCUVVjc1JVRkJSU3hIUVVGSE8ybENRVU5ZTEVOQlFVTXNRMEZCUXp0WlFVTklMRk5CUVZNc1EwRkJReXhMUVVGTExFVkJRVVVzUTBGQlF6dFpRVU5zUWl4VFFVRlRPMmxDUVVOS0xFdEJRVXNzUlVGQlJUdHBRa0ZEVUN4TFFVRkxMRU5CUVVNc1IwRkJSeXhGUVVGRkxFVkJRVVVzVVVGQlVTeEZRVUZGTEZGQlFWRXNSVUZCUXl4RFFVRkRMRU5CUVVNN1dVRkRka01zVTBGQlV6dHBRa0ZEU2l4UlFVRlJMRU5CUVVNc2VVTkJRWFZDTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN2FVSkJRekZETEVsQlFVa3NRMEZCUXp0blFrRkRSaXhKUVVGTkxFOUJRVThzUjBGQlowSXNVMEZCVXl4RFFVRkRMRlZCUVZVc1JVRkJSU3hEUVVGRE8yZENRVU53UkN4SlFVRk5MSEZDUVVGeFFpeEhRVUZITEN0RFFVRTJRaXhEUVVGRExFOUJRVThzUlVGQlJTeEpRVUZKTEVOQlFVTXNRMEZCUXp0blFrRkRNMFVzU1VGQlRTeHhRa0ZCY1VJc1IwRkJSeXgzUkVGQmMwTXNRMEZCUXl4UFFVRlBMRVZCUVVVc1VVRkJVU3hEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZETzJkQ1FVTXZSaXhKUVVGTkxHbENRVUZwUWl4SFFVRkhMRFpEUVVFeVFpeERRVUZETEU5QlFVOHNSVUZCUlN4UlFVRlJMRU5CUVVNc1EwRkJRenRuUWtGRGVrVXNTVUZCVFN4elFrRkJjMElzUjBGQlJ5d3JRMEZCTmtJc1EwRkJReXhQUVVGUExFVkJRVVVzUzBGQlN5eERRVUZETEVOQlFVTTdaMEpCUXpkRkxHRkJRVTBzUTBGQlF5eGxRVUZsTEVOQlFVTXNUMEZCVHl4RlFVRkZPMjlDUVVNMVFpeHhRa0ZCY1VJN2IwSkJRM0pDTEhGQ1FVRnhRanR2UWtGRGNrSXNhVUpCUVdsQ08yOUNRVU5xUWl4elFrRkJjMEk3YVVKQlFVTXNRMEZCUXl4RFFVRkRPMmRDUVVNM1FpeEpRVUZKTEVWQlFVVXNRMEZCUXp0WlFVTllMRU5CUVVNc1EwRkJReXhEUVVGRExFOUJRVXNzUTBGQlFTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUTNaQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NSVUZCUlN4RFFVRkRMSFZFUVVGMVJDeEZRVUZGTEZWQlFWTXNTVUZCU1R0WlFVTnlSU3hKUVVGSkxGRkJRVkVzUjBGQmIwTTdaMEpCUXpWRExFVkJRVVVzUjBGQlJ5eEZRVUZGTEVkQlFVY3NSVUZCUlN4SlFVRkpMRVZCUVVVc1UwRkJVeXhGUVVGRk8yZENRVU0zUWl4RlFVRkZMRWRCUVVjc1JVRkJSU3hIUVVGSExFVkJRVVVzU1VGQlNTeEZRVUZGTEZGQlFWRXNSVUZCUlR0blFrRkROVUlzUlVGQlJTeEhRVUZITEVWQlFVVXNSMEZCUnl4RlFVRkZMRWxCUVVrc1JVRkJSU3huUWtGQlowSXNSVUZCUlR0aFFVRkRMRU5CUVVNN1dVRkRNVU1zVTBGQlV5eERRVUZETEV0QlFVc3NSVUZCUlN4RFFVRkRPMWxCUTJ4Q0xGTkJRVk03YVVKQlEwb3NTMEZCU3l4RFFVRkRMR3RDUVVGclFpeERRVUZETzJsQ1FVTjZRaXhMUVVGTExFTkJRVU1zUjBGQlJ5eEZRVUZGTEVWQlFVVXNVVUZCVVN4RlFVRkZMRkZCUVZFc1JVRkJSU3hEUVVGRExFTkJRVU03V1VGRGVFTXNVMEZCVXp0cFFrRkRTaXhMUVVGTExFVkJRVVU3YVVKQlExQXNTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8xbEJRMmhDTEZOQlFWTTdhVUpCUTBvc1VVRkJVU3hEUVVGRExDdENRVUZoTEVOQlFVTXNVMEZCVXl4RFFVRkRMRU5CUVVNN2FVSkJRMnhETEVsQlFVa3NRMEZCUXp0blFrRkRSaXhKUVVGTkxFOUJRVThzUjBGQlowSXNVMEZCVXl4RFFVRkRMRlZCUVZVc1JVRkJSU3hEUVVGRE8yZENRVU53UkN4SlFVRk5MR0ZCUVdFc1IwRkJSeXc0UWtGQlR5eERRVUZETEdsQ1FVRnBRaXhEUVVGRExFTkJRVU03WjBKQlEycEVMRWxCUVUwc2FVSkJRV2xDTEVkQlFVY3NOa0pCUVZjc1EwRkJReXhEUVVGRExGTkJRVk1zUlVGQlJTeFJRVUZSTEVWQlFVVXNaMEpCUVdkQ0xFTkJRVU1zUTBGQlF5eERRVUZETzJkQ1FVTXZSU3hoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRMR0ZCUVdFc1JVRkJSU3hwUWtGQmFVSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1owSkJRM0JGTEVsQlFVa3NSVUZCUlN4RFFVRkRPMWxCUTFnc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlN5eERRVUZCTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRka0lzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4RlFVRkZMRU5CUVVNc09FUkJRVGhFTEVWQlFVVXNWVUZCVXl4SlFVRkpPMWxCUXpWRkxGTkJRVk1zUTBGQlF5eExRVUZMTEVWQlFVVXNRMEZCUXp0WlFVTnNRaXhUUVVGVE8ybENRVU5LTEV0QlFVc3NSVUZCUlR0cFFrRkRVQ3hMUVVGTExFTkJRVU1zUjBGQlJ5eEZRVUZGTEVWQlFVTXNTMEZCU3l4RlFVRkZMSE5DUVVGelFpeEZRVUZETEVOQlFVTXNRMEZCUXp0WlFVTnFSQ3hUUVVGVE8ybENRVU5LTEZGQlFWRXNRMEZCUXl3clFrRkJZU3hEUVVGRExGTkJRVk1zUTBGQlF5eERRVUZETzJsQ1FVTnNReXhKUVVGSkxFTkJRVU03WjBKQlEwWXNTVUZCVFN4UFFVRlBMRWRCUVdkQ0xGTkJRVk1zUTBGQlF5eFZRVUZWTEVWQlFVVXNRMEZCUXp0blFrRkRjRVFzU1VGQlRTeGpRVUZqTEVkQlFVY3NLMEpCUVZFc1EwRkJReXh6UWtGQmMwSXNRMEZCUXl4RFFVRkRPMmRDUVVONFJDeGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRExHTkJRV01zUTBGQlF5eERRVUZETEVOQlFVTTdaMEpCUTJ4RUxFbEJRVWtzUlVGQlJTeERRVUZETzFsQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNc1QwRkJTeXhEUVVGQkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdVVUZEZGtJc1EwRkJReXhEUVVGRExFTkJRVUU3VVVGRFJpeEZRVUZGTEVOQlFVTXNPRU5CUVRoRExFVkJRVVVzVlVGQlV5eEpRVUZKTzFsQlF6VkVMRWxCUVVrc1VVRkJVU3hIUVVGdlF6dG5Ra0ZETlVNc1JVRkJSU3hIUVVGSExFVkJRVVVzUjBGQlJ5eEZRVUZGTEVsQlFVa3NSVUZCUlN4VFFVRlRMRVZCUVVVN1owSkJRemRDTEVWQlFVVXNSMEZCUnl4RlFVRkZMRWRCUVVjc1JVRkJSU3hKUVVGSkxFVkJRVVVzVVVGQlVTeEZRVUZGTzJkQ1FVTTFRaXhGUVVGRkxFZEJRVWNzUlVGQlJTeEhRVUZITEVWQlFVVXNTVUZCU1N4RlFVRkZMR2RDUVVGblFpeEZRVUZGTzJGQlFVTXNRMEZCUXp0WlFVTXhReXhUUVVGVExFTkJRVU1zUzBGQlN5eEZRVUZGTEVOQlFVTTdXVUZEYkVJc1UwRkJVenRwUWtGRFNpeExRVUZMTEVOQlFVTXNhMEpCUVd0Q0xFTkJRVU03YVVKQlEzcENMRXRCUVVzc1EwRkJReXhIUVVGSExFVkJRVVVzUlVGQlJTeFJRVUZSTEVWQlFVVXNVVUZCVVN4RlFVRkZMRU5CUVVNc1EwRkJRenRaUVVONFF5eFRRVUZUTzJsQ1FVTktMRTFCUVUwc1JVRkJSVHRwUWtGRFVpeExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1dVRkRhRUlzVTBGQlV6dHBRa0ZEU2l4UlFVRlJMRU5CUVVNc05FSkJRVlVzUTBGQlF5eGhRVUZoTEVOQlFVTXNRMEZCUXp0cFFrRkRia01zU1VGQlNTeERRVUZETzJkQ1FVTkdMRWxCUVUwc1QwRkJUeXhIUVVGblFpeFRRVUZUTEVOQlFVTXNWVUZCVlN4RlFVRkZMRU5CUVVNN1owSkJRM0JFTEVsQlFVMHNZVUZCWVN4SFFVRkhMRGhDUVVGUExFTkJRVU1zYVVKQlFXbENMRU5CUVVNc1EwRkJRenRuUWtGRGFrUXNTVUZCVFN4cFFrRkJhVUlzUjBGQlJ5dzJRa0ZCVnl4RFFVRkRMRU5CUVVNc1UwRkJVeXhGUVVGRkxGRkJRVkVzUlVGQlJTeG5Ra0ZCWjBJc1EwRkJReXhEUVVGRExFTkJRVU03WjBKQlF5OUZMR0ZCUVUwc1EwRkJReXhsUVVGbExFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTXNZVUZCWVN4RlFVRkZMR2xDUVVGcFFpeERRVUZETEVOQlFVTXNRMEZCUXp0blFrRkRjRVVzU1VGQlNTeEZRVUZGTEVOQlFVTTdXVUZEV0N4RFFVRkRMRU5CUVVNc1EwRkJReXhQUVVGTExFTkJRVUVzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTjJRaXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl4dlJVRkJiMFVzUlVGQlJTeFZRVUZUTEVsQlFVazdXVUZEYkVZc1UwRkJVeXhEUVVGRExFdEJRVXNzUlVGQlJTeERRVUZETzFsQlEyeENMRk5CUVZNN2FVSkJRMG9zUzBGQlN5eEZRVUZGTzJsQ1FVTlFMRXRCUVVzc1EwRkJReXhIUVVGSExFVkJRVVVzUlVGQlF5eExRVUZMTEVWQlFVVXNjMEpCUVhOQ0xFVkJRVU1zUTBGQlF5eERRVUZETzFsQlEycEVMRk5CUVZNN2FVSkJRMG9zVVVGQlVTeERRVUZETERSQ1FVRlZMRU5CUVVNc1lVRkJZU3hEUVVGRExFTkJRVU03YVVKQlEyNURMRWxCUVVrc1EwRkJRenRuUWtGRFJpeEpRVUZOTEU5QlFVOHNSMEZCWjBJc1UwRkJVeXhEUVVGRExGVkJRVlVzUlVGQlJTeERRVUZETzJkQ1FVTndSQ3hKUVVGTkxHTkJRV01zUjBGQlJ5d3JRa0ZCVVN4RFFVRkRMSE5DUVVGelFpeERRVUZETEVOQlFVTTdaMEpCUTNoRUxHRkJRVTBzUTBGQlF5eGxRVUZsTEVOQlFVTXNUMEZCVHl4RlFVRkZMRU5CUVVNc1kwRkJZeXhEUVVGRExFTkJRVU1zUTBGQlF6dG5Ra0ZEYkVRc1NVRkJTU3hGUVVGRkxFTkJRVU03V1VGRFdDeERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRkxMRU5CUVVFc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU4yUWl4RFFVRkRMRU5CUVVNc1EwRkJRVHRKUVVOT0xFTkJRVU1zUTBGQlF5eERRVUZETzBsQlEwZ3NVVUZCVVN4RFFVRkRMSE5DUVVGelFpeEZRVUZGTzFGQlF6ZENMRlZCUVZVc1EwRkJRenRaUVVOUUxGTkJRVk1zUjBGQlJ5eFJRVUZSTEVWQlFVVXNRMEZCUXp0UlFVTXpRaXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl4M1EwRkJkME1zUlVGQlJUdFpRVU42UXl4VFFVRlRMRU5CUVVNc1VVRkJVU3hEUVVGRExHOUNRVUYxUWl4RlFVRkZMRU5CUVVNc1EwRkJRenRaUVVNNVF5eEpRVUZOTEU5QlFVOHNSMEZCWjBJc1UwRkJVeXhEUVVGRExGVkJRVlVzUlVGQlJTeERRVUZETzFsQlEzQkVMR0ZCUVUwc1EwRkJReXhYUVVGWExFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1JVRkJSU3c0UWtGQll5eERRVUZETEVOQlFVTTdXVUZGY0VRc1QwRkJUeXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkZMRU5CUVVNc1MwRkJTeXhGUVVGRkxFTkJRVU03VVVGREwwSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5JTEZGQlFWRXNRMEZCUXl3d1FrRkJNRUlzUlVGQlJUdFJRVU5xUXl4VlFVRlZMRU5CUVVNN1dVRkRVQ3hUUVVGVExFZEJRVWNzVVVGQlVTeEZRVUZGTEVOQlFVTTdVVUZETTBJc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEZRVUZGTEVOQlFVTXNLME5CUVN0RExFVkJRVVVzVlVGQlV5eEpRVUZKTzFsQlF6ZEVMRWxCUVVrc1lVRkJZU3hIUVVGSExFTkJRVU03YjBKQlEycENMRXRCUVVzc1JVRkJSU3hsUVVGbE8yOUNRVU4wUWl4SlFVRkpMRVZCUVVVc1QwRkJUenR2UWtGRFlpeEpRVUZKTEVWQlFVVXNUVUZCVFR0cFFrRkRaaXhGUVVGRk8yOUNRVU5ETEV0QlFVc3NSVUZCUlN4blFrRkJaMEk3YjBKQlEzWkNMRWxCUVVrc1JVRkJSU3hUUVVGVE8yOUNRVU5tTEVsQlFVa3NSVUZCUlN4TlFVRk5PMmxDUVVObUxFTkJRVU1zUTBGQlF6dFpRVU5JTEVsQlFVa3NTMEZCU3l4SFFVRnRRaXhGUVVGRkxFTkJRVU03V1VGREwwSXNZVUZCWVN4RFFVRkRMRTlCUVU4c1EwRkJReXhWUVVGRExFTkJRVU03WjBKQlEzQkNMRXRCUVVzc1EwRkJReXhEUVVGRExFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVYzdiMEpCUTJJc1NVRkJTU3hGUVVGRkxFTkJRVU1zUTBGQlF5eEpRVUZKTzI5Q1FVTmFMRWxCUVVrc1JVRkJSU3hEUVVGRExFTkJRVU1zU1VGQlNUdHBRa0ZEWml4RFFVRkRPMWxCUTA0c1EwRkJReXhEUVVGRExFTkJRVUU3V1VGRFJpeFRRVUZUTEVOQlFVTXNTMEZCU3l4RlFVRkZMRU5CUVVNN1dVRkRiRUlzVTBGQlV5eERRVUZETEV0QlFVc3NSVUZCUlN4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFVkJRVVVzUlVGQlJTeExRVUZMTEVWQlFVVXNZVUZCWVN4RlFVRkRMRU5CUVVNc1EwRkJRenRaUVVOMFJDeFRRVUZUTzJsQ1FVTktMRkZCUVZFc1EwRkJReXhuUTBGQllTeEZRVUZGTEVOQlFVTTdhVUpCUTNwQ0xFbEJRVWtzUTBGQlF6dG5Ra0ZEUml4SlFVRk5MRTlCUVU4c1IwRkJaMElzVTBGQlV5eERRVUZETEZWQlFWVXNSVUZCUlN4RFFVRkRPMmRDUVVOd1JDeEpRVUZOTEdsQ1FVRnBRaXhIUVVGSExEaENRVUZYTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN1owSkJRemRETEdGQlFVMHNRMEZCUXl4bFFVRmxMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU1zYVVKQlFXbENMRU5CUVVNc1EwRkJReXhEUVVGRE8yZENRVU55UkN4SlFVRkpMRVZCUVVVc1EwRkJRenRaUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVc3NRMEZCUVN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRM1pDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1JVRkJSU3hEUVVGRExESkVRVUV5UkN4RlFVRkZMRlZCUVZNc1NVRkJTVHRaUVVONlJTeFRRVUZUTEVOQlFVTXNTMEZCU3l4RlFVRkZMRU5CUVVNN1dVRkRiRUlzVTBGQlV5eERRVUZETEV0QlFVc3NSVUZCUlN4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dFpRVU0zUWl4VFFVRlRPMmxDUVVOS0xGRkJRVkVzUTBGQlF5eG5RMEZCWVN4RlFVRkZMRU5CUVVNN2FVSkJRM3BDTEVsQlFVa3NRMEZCUXp0blFrRkRSaXhKUVVGTkxFOUJRVThzUjBGQlowSXNVMEZCVXl4RFFVRkRMRlZCUVZVc1JVRkJSU3hEUVVGRE8yZENRVU53UkN4SlFVRk5MR05CUVdNc1IwRkJSeXdyUWtGQlVTeERRVUZETERKQ1FVRXlRaXhEUVVGRExFTkJRVU03WjBKQlF6ZEVMR0ZCUVUwc1EwRkJReXhsUVVGbExFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTXNZMEZCWXl4RFFVRkRMRU5CUVVNc1EwRkJRenRuUWtGRGJFUXNTVUZCU1N4RlFVRkZMRU5CUVVNN1dVRkRXQ3hEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZMTEVOQlFVRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVOMlFpeERRVUZETEVOQlFVTXNRMEZCUVR0UlFVTkdMRVZCUVVVc1EwRkJReXd3UWtGQk1FSXNRMEZCUXl4RFFVRkRPMUZCUXk5Q0xFVkJRVVVzUTBGQlF5eHpRa0ZCYzBJc1EwRkJReXhEUVVGRE8xRkJRek5DTEVWQlFVVXNRMEZCUXl4M1FrRkJkMElzUTBGQlF5eERRVUZETzBsQlEycERMRU5CUVVNc1EwRkJReXhEUVVGRE8wRkJRMUFzUTBGQlF5eERRVUZETEVOQlFVRWlmUT09IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIGNoYWlfMSA9IHJlcXVpcmUoXCJjaGFpXCIpO1xucmVxdWlyZShcIm1vY2hhXCIpO1xudmFyIHNvY2tldGlvY2xpZW50ID0gcmVxdWlyZShcInNvY2tldC5pby1jbGllbnRcIik7XG52YXIgc3RvcmVfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvd2ViL3N0b3JlXCIpO1xudmFyIHJlZHV4XzEgPSByZXF1aXJlKFwicmVkdXhcIik7XG52YXIgdXNlckFjdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvd2ViL2FjdGlvbnMvdXNlckFjdGlvbnNcIik7XG52YXIgY2hhbm5lbHNBY3Rpb25zXzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL3dlYi9hY3Rpb25zL2NoYW5uZWxzQWN0aW9uc1wiKTtcbnZhciBub3RpZmljYXRpb25zQWN0aW9uc18xID0gcmVxdWlyZShcIi4uLy4uL3NyYy93ZWIvYWN0aW9ucy9ub3RpZmljYXRpb25zQWN0aW9uc1wiKTtcbnZhciBzaWRlYmFyQWN0aW9uc18xID0gcmVxdWlyZShcIi4uLy4uL3NyYy93ZWIvYWN0aW9ucy9zaWRlYmFyQWN0aW9uc1wiKTtcbnZhciBzb2NrZXRBY3Rpb25zXzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL3dlYi9hY3Rpb25zL3NvY2tldEFjdGlvbnNcIik7XG52YXIgY2hhdFVzZXJzQWN0aW9uc18xID0gcmVxdWlyZShcIi4uLy4uL3NyYy93ZWIvYWN0aW9ucy9jaGF0VXNlcnNBY3Rpb25zXCIpO1xuZnVuY3Rpb24gZ2V0U3RvcmUoKSB7XG4gICAgcmV0dXJuIHJlZHV4XzEuY3JlYXRlU3RvcmUoc3RvcmVfMS5yb290UmVkdWNlciwgc3RvcmVfMS5taWRkbGV3YXJlKTtcbn1cbmRlc2NyaWJlKCdTdG9yZSBhbmQgU3luY2hyb25vdXMgQWN0aW9ucycsIGZ1bmN0aW9uICgpIHtcbiAgICBkZXNjcmliZSgnVXNlciBTdGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHN0b3JlO1xuICAgICAgICB2YXIgdXNlcjtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdG9yZSA9IGdldFN0b3JlKCk7XG4gICAgICAgICAgICB1c2VyID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gc3RvcmUuZ2V0U3RhdGUoKS51c2VyOyB9O1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgYmUgYXV0aG9yaXplZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNGYWxzZSh1c2VyKCkuYXV0aG9yaXplZCk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2UodXNlcigpLmVtYWlsKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNGYWxzZSh1c2VyKCkubmFtZSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2UodXNlcigpLnJvbGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBiZSBhdXRob3JpemVkIGFmdGVyIHNldEF1dGhvcml6ZWQgYWN0aW9uJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKHVzZXIoKS5hdXRob3JpemVkKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHVzZXJBY3Rpb25zXzEuc2V0QXV0aG9yaXplZCh0cnVlKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzVHJ1ZSh1c2VyKCkuYXV0aG9yaXplZCk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh1c2VyQWN0aW9uc18xLnNldEF1dGhvcml6ZWQoZmFsc2UpKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNGYWxzZSh1c2VyKCkuYXV0aG9yaXplZCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGhhdmUgdXNlciBkYXRhIGFmdGVyIHNldHRpbmcgdGhlIHVzZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2UodXNlcigpLmF1dGhvcml6ZWQpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKHVzZXIoKS5lbWFpbCk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2UodXNlcigpLm5hbWUpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKHVzZXIoKS5yb2xlKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHVzZXJBY3Rpb25zXzEuc2V0VXNlcih7XG4gICAgICAgICAgICAgICAgYXV0aG9yaXplZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdKYW5lIERvZScsXG4gICAgICAgICAgICAgICAgcm9sZTogJ2FkbWluJ1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc1RydWUodXNlcigpLmF1dGhvcml6ZWQpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbCh1c2VyKCkuZW1haWwsICd0ZXN0QHRlc3QuY29tJyk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKHVzZXIoKS5uYW1lLCAnSmFuZSBEb2UnKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwodXNlcigpLnJvbGUsICdhZG1pbicpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2godXNlckFjdGlvbnNfMS5zZXRVc2VyKHtcbiAgICAgICAgICAgICAgICBhdXRob3JpemVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlbWFpbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbmFtZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgcm9sZTogZmFsc2VcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNGYWxzZSh1c2VyKCkuYXV0aG9yaXplZCk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2UodXNlcigpLmVtYWlsKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNGYWxzZSh1c2VyKCkubmFtZSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2UodXNlcigpLnJvbGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgaGF2ZSB1c2VyIGRhdGEgYWZ0ZXIgbG9nZ2luZyBvdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh1c2VyQWN0aW9uc18xLnNldFVzZXIoe1xuICAgICAgICAgICAgICAgIGF1dGhvcml6ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnSmFuZSBEb2UnLFxuICAgICAgICAgICAgICAgIHJvbGU6ICdhZG1pbidcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHVzZXJBY3Rpb25zXzEubG9nb3V0VXNlcigpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHVzZXJBY3Rpb25zXzEuc2V0VXNlcih7XG4gICAgICAgICAgICAgICAgYXV0aG9yaXplZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgZW1haWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG5hbWU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJvbGU6IGZhbHNlXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdDaGFubmVscyBTdGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHN0b3JlO1xuICAgICAgICB2YXIgY2hhbm5lbHM7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUgPSBnZXRTdG9yZSgpO1xuICAgICAgICAgICAgY2hhbm5lbHMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBzdG9yZS5nZXRTdGF0ZSgpLmNoYW5uZWxzOyB9O1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBhZGQgY2hhbm5lbHMgZnJvbSBhbiBhcnJheSBvZiBjaGFubmVsIG5hbWVzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuYWRkQ2hhbm5lbHMoWydnZW5lcmFsJywgJ3JhbmRvbScsICdzb21ldGhpbmcgZWxzZSddKSk7XG4gICAgICAgICAgICB2YXIgYzAgPSBjaGFubmVscygpWzBdO1xuICAgICAgICAgICAgdmFyIGMxID0gY2hhbm5lbHMoKVsxXTtcbiAgICAgICAgICAgIHZhciBjMiA9IGNoYW5uZWxzKClbMl07XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChjMCwge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdnZW5lcmFsJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlczogW10sXG4gICAgICAgICAgICAgICAgcmV0cmlldmVNZXNzYWdlc09mZnNldDogMCxcbiAgICAgICAgICAgICAgICBoYXNNb3JlTWVzc2FnZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgZmV0Y2hpbmdOZXdNZXNzYWdlczogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGMxLCB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ3JhbmRvbScsXG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6IFtdLFxuICAgICAgICAgICAgICAgIHJldHJpZXZlTWVzc2FnZXNPZmZzZXQ6IDAsXG4gICAgICAgICAgICAgICAgaGFzTW9yZU1lc3NhZ2VzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGZldGNoaW5nTmV3TWVzc2FnZXM6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChjMiwge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdzb21ldGhpbmcgZWxzZScsXG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6IFtdLFxuICAgICAgICAgICAgICAgIHJldHJpZXZlTWVzc2FnZXNPZmZzZXQ6IDAsXG4gICAgICAgICAgICAgICAgaGFzTW9yZU1lc3NhZ2VzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGZldGNoaW5nTmV3TWVzc2FnZXM6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHVwZGF0ZSBmZXRjaGluZ05ld01lc3NhZ2VzIGFmdGVyIGNhbGxpbmcgc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMgYWN0aW9uJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuYWRkQ2hhbm5lbHMoWydnZW5lcmFsJywgJ3JhbmRvbScsICdzb21ldGhpbmcgZWxzZSddKSk7XG4gICAgICAgICAgICBjaGFubmVscygpLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2UoYy5mZXRjaGluZ05ld01lc3NhZ2VzKTtcbiAgICAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5zZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcyhjLm5hbWUsIHRydWUpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY2hhbm5lbHMoKS5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc1RydWUoYy5mZXRjaGluZ05ld01lc3NhZ2VzKTtcbiAgICAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5zZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcyhjLm5hbWUsIGZhbHNlKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNoYW5uZWxzKCkuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNGYWxzZShjLmZldGNoaW5nTmV3TWVzc2FnZXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGluY3JlbWVudCB0aGUgY2hhbm5lbCBvZmZzZXQgZm9yIHJldHJpZXZpbmcgbmV3IG1lc3NhZ2VzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuYWRkQ2hhbm5lbHMoWydnZW5lcmFsJywgJ3JhbmRvbScsICdzb21ldGhpbmcgZWxzZSddKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKGNoYW5uZWxzKCkuZmluZChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5uYW1lID09PSAnZ2VuZXJhbCc7IH0pLnJldHJpZXZlTWVzc2FnZXNPZmZzZXQsIDApO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChjaGFubmVscygpLmZpbmQoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUubmFtZSA9PT0gJ3JhbmRvbSc7IH0pLnJldHJpZXZlTWVzc2FnZXNPZmZzZXQsIDApO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChjaGFubmVscygpLmZpbmQoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUubmFtZSA9PT0gJ3NvbWV0aGluZyBlbHNlJzsgfSkucmV0cmlldmVNZXNzYWdlc09mZnNldCwgMCk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5pbmNyZW1lbnRDaGFubmVsUmV0cmlldmVNZXNzYWdlc09mZnNldCgnZ2VuZXJhbCcsIDIwKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKGNoYW5uZWxzKCkuZmluZChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5uYW1lID09PSAnZ2VuZXJhbCc7IH0pLnJldHJpZXZlTWVzc2FnZXNPZmZzZXQsIDIwKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmluY3JlbWVudENoYW5uZWxSZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0KCdnZW5lcmFsJywgMSkpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChjaGFubmVscygpLmZpbmQoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUubmFtZSA9PT0gJ2dlbmVyYWwnOyB9KS5yZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0LCAyMSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5pbmNyZW1lbnRDaGFubmVsUmV0cmlldmVNZXNzYWdlc09mZnNldCgncmFuZG9tJywgMSkpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChjaGFubmVscygpLmZpbmQoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUubmFtZSA9PT0gJ3JhbmRvbSc7IH0pLnJldHJpZXZlTWVzc2FnZXNPZmZzZXQsIDEpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuaW5jcmVtZW50Q2hhbm5lbFJldHJpZXZlTWVzc2FnZXNPZmZzZXQoJ3NvbWV0aGluZyBlbHNlJywgMSkpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChjaGFubmVscygpLmZpbmQoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUubmFtZSA9PT0gJ3NvbWV0aGluZyBlbHNlJzsgfSkucmV0cmlldmVNZXNzYWdlc09mZnNldCwgMSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHVwZGF0ZSB0aGUgaGFzTW9yZU1lc3NhZ2VzIHByb3BlcnR5IG9uIGEgY2hhbm5lbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmFkZENoYW5uZWxzKFsnZ2VuZXJhbCcsICdyYW5kb20nLCAnc29tZXRoaW5nIGVsc2UnXSkpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc1RydWUoY2hhbm5lbHMoKS5maW5kKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLm5hbWUgPT09ICdnZW5lcmFsJzsgfSkuaGFzTW9yZU1lc3NhZ2VzKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNUcnVlKGNoYW5uZWxzKCkuZmluZChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5uYW1lID09PSAncmFuZG9tJzsgfSkuaGFzTW9yZU1lc3NhZ2VzKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNUcnVlKGNoYW5uZWxzKCkuZmluZChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5uYW1lID09PSAnc29tZXRoaW5nIGVsc2UnOyB9KS5oYXNNb3JlTWVzc2FnZXMpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuc2V0Q2hhbm5lbEhhc01vcmVNZXNzYWdlcygnZ2VuZXJhbCcsIGZhbHNlKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5zZXRDaGFubmVsSGFzTW9yZU1lc3NhZ2VzKCdyYW5kb20nLCBmYWxzZSkpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuc2V0Q2hhbm5lbEhhc01vcmVNZXNzYWdlcygnc29tZXRoaW5nIGVsc2UnLCBmYWxzZSkpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKGNoYW5uZWxzKCkuZmluZChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5uYW1lID09PSAnZ2VuZXJhbCc7IH0pLmhhc01vcmVNZXNzYWdlcyk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2UoY2hhbm5lbHMoKS5maW5kKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLm5hbWUgPT09ICdyYW5kb20nOyB9KS5oYXNNb3JlTWVzc2FnZXMpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKGNoYW5uZWxzKCkuZmluZChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5uYW1lID09PSAnc29tZXRoaW5nIGVsc2UnOyB9KS5oYXNNb3JlTWVzc2FnZXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBhZGQgYSByZWNlaXZlZCBtZXNzYWdlIHRvIHRoZSBhcHByb3ByaWF0ZSBjaGFubmVsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuYWRkQ2hhbm5lbHMoWydnZW5lcmFsJywgJ3JhbmRvbScsICdzb21ldGhpbmcgZWxzZSddKSk7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICB1c2VyRW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICBjcmVhdGVkOiBEYXRlLm5vdygpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgX2lkOiAnMScsXG4gICAgICAgICAgICAgICAgdGV4dDogJ3RoaXMgaXMgdGhlIG1lc3NhZ2UnLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmFkZFJlY2VpdmVkQ2hhbm5lbE1lc3NhZ2UoJ2dlbmVyYWwnLCBtZXNzYWdlKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5hZGRSZWNlaXZlZENoYW5uZWxNZXNzYWdlKCdyYW5kb20nLCBtZXNzYWdlKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5hZGRSZWNlaXZlZENoYW5uZWxNZXNzYWdlKCdyYW5kb20nLCBtZXNzYWdlKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5hZGRSZWNlaXZlZENoYW5uZWxNZXNzYWdlKCdzb21ldGhpbmcgZWxzZScsIG1lc3NhZ2UpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmFkZFJlY2VpdmVkQ2hhbm5lbE1lc3NhZ2UoJ3NvbWV0aGluZyBlbHNlJywgbWVzc2FnZSkpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuYWRkUmVjZWl2ZWRDaGFubmVsTWVzc2FnZSgnc29tZXRoaW5nIGVsc2UnLCBtZXNzYWdlKSk7XG4gICAgICAgICAgICB2YXIgZ2VuZXJhbE1lc3NhZ2VzID0gY2hhbm5lbHMoKS5maW5kKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLm5hbWUgPT09ICdnZW5lcmFsJzsgfSkubWVzc2FnZXM7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChnZW5lcmFsTWVzc2FnZXMubGVuZ3RoLCAxKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGdlbmVyYWxNZXNzYWdlcywgW21lc3NhZ2VdKTtcbiAgICAgICAgICAgIHZhciByYW5kb21NZXNzYWdlcyA9IGNoYW5uZWxzKCkuZmluZChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5uYW1lID09PSAncmFuZG9tJzsgfSkubWVzc2FnZXM7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChyYW5kb21NZXNzYWdlcy5sZW5ndGgsIDIpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwocmFuZG9tTWVzc2FnZXMsIFttZXNzYWdlLCBtZXNzYWdlXSk7XG4gICAgICAgICAgICB2YXIgb3RoZXJNZXNzYWdlcyA9IGNoYW5uZWxzKCkuZmluZChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5uYW1lID09PSAnc29tZXRoaW5nIGVsc2UnOyB9KS5tZXNzYWdlcztcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKG90aGVyTWVzc2FnZXMubGVuZ3RoLCAzKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKG90aGVyTWVzc2FnZXMsIFttZXNzYWdlLCBtZXNzYWdlLCBtZXNzYWdlXSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGFkZCByZXRyZWl2ZWQgbWVzc2FnZXMgdG8gdGhlIGFwcHJvcHJpYXRlIGNoYW5uZWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5hZGRDaGFubmVscyhbJ2dlbmVyYWwnLCAncmFuZG9tJywgJ3NvbWV0aGluZyBlbHNlJ10pKTtcbiAgICAgICAgICAgIHZhciBtZXNzYWdlcyA9IFtcbiAgICAgICAgICAgICAgICB7IFwidGV4dFwiOiBcIlNvbWV0aGluZyBoZXJlXCIsIFwiY3JlYXRlZFwiOiBcIjIwMTktMDQtMTNUMTY6NDU6MjguOTQ2WlwiLCBcInVzZXJFbWFpbFwiOiBcImFia290aG1hbkBnbWFpbC5jb21cIiwgXCJfaWRcIjogXCI1Y2IyMTIyODFkNjQ1YTIyYWJlYThkYmVcIiB9LFxuICAgICAgICAgICAgICAgIHsgXCJ0ZXh0XCI6IFwiMTIzNDEyMzRcIiwgXCJjcmVhdGVkXCI6IFwiMjAxOS0wNC0xNFQyMjozNDowNi42ODZaXCIsIFwidXNlckVtYWlsXCI6IFwiYWJrb3RobWFuQGdtYWlsLmNvbVwiLCBcIl9pZFwiOiBcIjVjYjNiNTVlY2JmNjhjNmE5NTRlYWZiM1wiIH0sXG4gICAgICAgICAgICAgICAgeyBcInRleHRcIjogXCJ0ZXN0IG9uZSB0d28gdGhyZWVcIiwgXCJjcmVhdGVkXCI6IFwiMjAxOS0wNC0xNFQyMjozNDoxMC45MDNaXCIsIFwidXNlckVtYWlsXCI6IFwiYWJrb3RobWFuQGdtYWlsLmNvbVwiLCBcIl9pZFwiOiBcIjVjYjNiNTYyY2JmNjhjNmE5NTRlYWZiNFwiIH1cbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5hZGRSZXRyaWV2ZWRDaGFubmVsTWVzc2FnZXMoJ2dlbmVyYWwnLCBtZXNzYWdlcykpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuYWRkUmV0cmlldmVkQ2hhbm5lbE1lc3NhZ2VzKCdyYW5kb20nLCBtZXNzYWdlcykpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuYWRkUmV0cmlldmVkQ2hhbm5lbE1lc3NhZ2VzKCdyYW5kb20nLCBtZXNzYWdlcykpO1xuICAgICAgICAgICAgdmFyIGNoYW5uZWxTdGF0ZSA9IGNoYW5uZWxzKCk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChjaGFubmVsU3RhdGVcbiAgICAgICAgICAgICAgICAuZmluZChmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5uYW1lID09PSAnZ2VuZXJhbCc7IH0pXG4gICAgICAgICAgICAgICAgLm1lc3NhZ2VzLCBtZXNzYWdlcyk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChjaGFubmVsU3RhdGVcbiAgICAgICAgICAgICAgICAuZmluZChmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5uYW1lID09PSAncmFuZG9tJzsgfSlcbiAgICAgICAgICAgICAgICAubWVzc2FnZXMsIG1lc3NhZ2VzLmNvbmNhdChtZXNzYWdlcykpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoY2hhbm5lbFN0YXRlXG4gICAgICAgICAgICAgICAgLmZpbmQoZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGMubmFtZSA9PT0gJ3NvbWV0aGluZyBlbHNlJzsgfSlcbiAgICAgICAgICAgICAgICAubWVzc2FnZXMsIFtdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgY2xlYXIgYWxsIGNoYW5uZWwgZGF0YScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmFkZENoYW5uZWxzKFsnZ2VuZXJhbCcsICdyYW5kb20nLCAnc29tZXRoaW5nIGVsc2UnXSkpO1xuICAgICAgICAgICAgdmFyIG1lc3NhZ2VzID0gW1xuICAgICAgICAgICAgICAgIHsgXCJ0ZXh0XCI6IFwiU29tZXRoaW5nIGhlcmVcIiwgXCJjcmVhdGVkXCI6IFwiMjAxOS0wNC0xM1QxNjo0NToyOC45NDZaXCIsIFwidXNlckVtYWlsXCI6IFwiYWJrb3RobWFuQGdtYWlsLmNvbVwiLCBcIl9pZFwiOiBcIjVjYjIxMjI4MWQ2NDVhMjJhYmVhOGRiZVwiIH0sXG4gICAgICAgICAgICAgICAgeyBcInRleHRcIjogXCIxMjM0MTIzNFwiLCBcImNyZWF0ZWRcIjogXCIyMDE5LTA0LTE0VDIyOjM0OjA2LjY4NlpcIiwgXCJ1c2VyRW1haWxcIjogXCJhYmtvdGhtYW5AZ21haWwuY29tXCIsIFwiX2lkXCI6IFwiNWNiM2I1NWVjYmY2OGM2YTk1NGVhZmIzXCIgfSxcbiAgICAgICAgICAgICAgICB7IFwidGV4dFwiOiBcInRlc3Qgb25lIHR3byB0aHJlZVwiLCBcImNyZWF0ZWRcIjogXCIyMDE5LTA0LTE0VDIyOjM0OjEwLjkwM1pcIiwgXCJ1c2VyRW1haWxcIjogXCJhYmtvdGhtYW5AZ21haWwuY29tXCIsIFwiX2lkXCI6IFwiNWNiM2I1NjJjYmY2OGM2YTk1NGVhZmI0XCIgfVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcygnZ2VuZXJhbCcsIG1lc3NhZ2VzKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5hZGRSZXRyaWV2ZWRDaGFubmVsTWVzc2FnZXMoJ3JhbmRvbScsIG1lc3NhZ2VzKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5hZGRSZXRyaWV2ZWRDaGFubmVsTWVzc2FnZXMoJ3JhbmRvbScsIG1lc3NhZ2VzKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5jbGVhckNoYW5uZWxzRGF0YSgpKTtcbiAgICAgICAgICAgIHZhciBjaGFubmVsU3RhdGUgPSBjaGFubmVscygpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoY2hhbm5lbFN0YXRlLCBbXSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdOb3RpZmljYXRpb25zIFN0YXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc3RvcmU7XG4gICAgICAgIHZhciBub3RpZmljYXRpb25zO1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlID0gZ2V0U3RvcmUoKTtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvbnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBzdG9yZS5nZXRTdGF0ZSgpLm5vdGlmaWNhdGlvbnM7IH07XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGFkZCBlcnJvcnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuZXJyb3JzLCBbXSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKCdUZXN0IGVycm9yJykpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmVycm9ycywgWydUZXN0IGVycm9yJ10pO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignQW5vdGhlciBlcnJvcicpKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5vdGlmaWNhdGlvbnMoKS5lcnJvcnMsIFsnVGVzdCBlcnJvcicsICdBbm90aGVyIGVycm9yJ10pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZW1vdmUgZXJyb3JzIGdpdmVuIGFuIGluZGV4JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignVGVzdCBlcnJvcicpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ0Fub3RoZXIgZXJyb3InKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuZXJyb3JzLCBbJ1Rlc3QgZXJyb3InLCAnQW5vdGhlciBlcnJvciddKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEucmVtb3ZlRXJyb3IoMSkpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmVycm9ycywgWydUZXN0IGVycm9yJ10pO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5yZW1vdmVFcnJvcigwKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuZXJyb3JzLCBbXSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGNsZWFyIGVycm9ycycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ1Rlc3QgZXJyb3InKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKCdBbm90aGVyIGVycm9yJykpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5jbGVhckVycm9ycygpKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5vdGlmaWNhdGlvbnMoKS5lcnJvcnMsIFtdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgYWRkIGluZm8nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuaW5mb3MsIFtdKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkSW5mbygnVGVzdCBpbmZvJykpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmluZm9zLCBbJ1Rlc3QgaW5mbyddKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkSW5mbygnQW5vdGhlciBpbmZvJykpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmluZm9zLCBbJ1Rlc3QgaW5mbycsICdBbm90aGVyIGluZm8nXSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJlbW92ZSBpbmZvIGdpdmVuIGFuIGluZGV4JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRJbmZvKCdUZXN0IGluZm8nKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEluZm8oJ0Fub3RoZXIgaW5mbycpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEucmVtb3ZlSW5mbygxKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuaW5mb3MsIFsnVGVzdCBpbmZvJ10pO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5yZW1vdmVJbmZvKDApKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5vdGlmaWNhdGlvbnMoKS5pbmZvcywgW10pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBjbGVhciBpbmZvcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkSW5mbygnVGVzdCBpbmZvJykpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRJbmZvKCdBbm90aGVyIGluZm8nKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmNsZWFySW5mb3MoKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuaW5mb3MsIFtdKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ1NpZGViYXIgU3RhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdG9yZTtcbiAgICAgICAgdmFyIHNpZGViYXI7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUgPSBnZXRTdG9yZSgpO1xuICAgICAgICAgICAgc2lkZWJhciA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN0b3JlLmdldFN0YXRlKCkuc2lkZWJhcjsgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgdG9nZ2xlIG9wZW4gc3RhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzVHJ1ZShzaWRlYmFyKCkub3Blbik7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzaWRlYmFyQWN0aW9uc18xLnRvZ2dsZVNpZGViYXJPcGVuKCkpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKHNpZGViYXIoKS5vcGVuKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNpZGViYXJBY3Rpb25zXzEudG9nZ2xlU2lkZWJhck9wZW4oKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzVHJ1ZShzaWRlYmFyKCkub3Blbik7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzaWRlYmFyQWN0aW9uc18xLnRvZ2dsZVNpZGViYXJPcGVuKCkpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKHNpZGViYXIoKS5vcGVuKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ1NvY2tldCBTdGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHN0b3JlO1xuICAgICAgICB2YXIgc29ja2V0O1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlID0gZ2V0U3RvcmUoKTtcbiAgICAgICAgICAgIHNvY2tldCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN0b3JlLmdldFN0YXRlKCkuc29ja2V0OyB9O1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBzZXQgdGhlIHNvY2tldCBnaXZlbiBhIFNvY2tldElPQ2xpZW50IFNvY2tldCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKHNvY2tldCgpLCB7XG4gICAgICAgICAgICAgICAgaW86IG51bGwsXG4gICAgICAgICAgICAgICAgY29ubmVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb25uZWN0ZWRVc2VyRW1haWxzOiBbXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgc29ja2V0aW8gPSBzb2NrZXRpb2NsaWVudCgpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc29ja2V0QWN0aW9uc18xLmluaXRXZWJzb2NrZXQoc29ja2V0aW8pKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKHNvY2tldCgpLCB7XG4gICAgICAgICAgICAgICAgaW86IHNvY2tldGlvLFxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29ubmVjdGVkVXNlckVtYWlsczogW11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc29ja2V0aW8uY2xvc2UoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgdXBkYXRlIHRoZSBjb25uZWN0ZWQgc3RhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzb2NrZXRBY3Rpb25zXzEuc2V0U29ja2V0Q29ubmVjdGVkKHRydWUpKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKHNvY2tldCgpLCB7XG4gICAgICAgICAgICAgICAgaW86IG51bGwsXG4gICAgICAgICAgICAgICAgY29ubmVjdGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZFVzZXJFbWFpbHM6IFtdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNvY2tldEFjdGlvbnNfMS5zZXRTb2NrZXRDb25uZWN0ZWQoZmFsc2UpKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKHNvY2tldCgpLCB7XG4gICAgICAgICAgICAgICAgaW86IG51bGwsXG4gICAgICAgICAgICAgICAgY29ubmVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb25uZWN0ZWRVc2VyRW1haWxzOiBbXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHVwZGF0ZSB0aGUgY29ubmVjdGVkIHVzZXJzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGVtYWlscyA9IFsndGVzdEB0ZXN0LmNvbScsICd0ZXN0MkB0ZXN0LmNvbSddO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc29ja2V0QWN0aW9uc18xLnNldFNvY2tldENvbm5lY3RlZFVzZXJzKGVtYWlscykpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoc29ja2V0KCksIHtcbiAgICAgICAgICAgICAgICBpbzogbnVsbCxcbiAgICAgICAgICAgICAgICBjb25uZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZFVzZXJFbWFpbHM6IGVtYWlsc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdDaGF0IFVzZXJzIFN0YXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc3RvcmU7XG4gICAgICAgIHZhciBjaGF0VXNlcnM7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUgPSBnZXRTdG9yZSgpO1xuICAgICAgICAgICAgY2hhdFVzZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gc3RvcmUuZ2V0U3RhdGUoKS5jaGF0VXNlcnM7IH07XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHVwZGF0ZSB1c2VycycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB1c2VycyA9IHtcbiAgICAgICAgICAgICAgICAndGVzdEB0ZXN0LmNvbSc6IHtcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogJ3VzZXInLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnVGVzdCBOYW1lJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ3Rlc3QyQHRlc3QuY29tJzoge1xuICAgICAgICAgICAgICAgICAgICByb2xlOiAnYWRtaW4nLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnQW5vdGhlciB0ZXN0J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ3Rlc3QzQHRlc3QuY29tJzoge1xuICAgICAgICAgICAgICAgICAgICByb2xlOiAnYWRtaW4nLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnTGFzdCB0ZXN0J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGF0VXNlcnNBY3Rpb25zXzEudXBkYXRlVXNlcnModXNlcnMpKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGNoYXRVc2VycygpLCB1c2Vycyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lkR1Z6ZEZOMGIzSmxMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dmRHVnpkSE12ZDJWaUwzUmxjM1JUZEc5eVpTNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenRCUVVGQkxEWkNRVUU0UWp0QlFVTTVRaXhwUWtGQlpUdEJRVU5tTEdsRVFVRnRSRHRCUVVWdVJDdzJRMEZCYlVVN1FVRkZia1VzSzBKQlFUSkRPMEZCUXpORExHbEZRVUYxUmp0QlFVTjJSaXg1UlVGQmFWQTdRVUZGYWxBc2JVWkJRV2xKTzBGQlEycEpMSFZGUVVGNVJUdEJRVU42UlN4eFJVRkJhVWc3UVVGRGFrZ3NNa1ZCUVRCR08wRkJSekZHTEZOQlFWTXNVVUZCVVR0SlFVTmlMRTlCUVU4c2JVSkJRVmNzUTBGQlF5eHRRa0ZCVnl4RlFVRkZMR3RDUVVGVkxFTkJRVU1zUTBGQlF6dEJRVU5vUkN4RFFVRkRPMEZCUlVRc1VVRkJVU3hEUVVGRExDdENRVUVyUWl4RlFVRkZPMGxCUTNSRExGRkJRVkVzUTBGQlF5eFpRVUZaTEVWQlFVVTdVVUZEYmtJc1NVRkJTU3hMUVVGdFFpeERRVUZETzFGQlEzaENMRWxCUVVrc1NVRkJNa0lzUTBGQlF6dFJRVU5vUXl4VlFVRlZMRU5CUVVNN1dVRkRVQ3hMUVVGTExFZEJRVWNzVVVGQlVTeEZRVUZGTEVOQlFVTTdXVUZEYmtJc1NVRkJTU3hIUVVGSExHTkJRVTBzVDBGQlFTeExRVUZMTEVOQlFVTXNVVUZCVVN4RlFVRkZMRU5CUVVNc1NVRkJTU3hGUVVGeVFpeERRVUZ4UWl4RFFVRkRPMUZCUTNaRExFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NSVUZCUlN4RFFVRkRMREJDUVVFd1FpeEZRVUZGTzFsQlF6TkNMR0ZCUVUwc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeEZRVUZGTEVOQlFVTXNWVUZCVlN4RFFVRkRMRU5CUVVNN1dVRkRiRU1zWVVGQlRTeERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dFpRVU0zUWl4aFFVRk5MRU5CUVVNc1QwRkJUeXhEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMWxCUXpWQ0xHRkJRVTBzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RlFVRkZMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRGFFTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hGUVVGRkxFTkJRVU1zYVVSQlFXbEVMRVZCUVVVN1dVRkRiRVFzWVVGQlRTeERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJReXhWUVVGVkxFTkJRVU1zUTBGQlF6dFpRVU5zUXl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExESkNRVUZoTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOd1F5eGhRVUZOTEVOQlFVTXNUVUZCVFN4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExGVkJRVlVzUTBGQlF5eERRVUZETzFsQlEycERMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zTWtKQlFXRXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRM0pETEdGQlFVMHNRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zVlVGQlZTeERRVUZETEVOQlFVTTdVVUZEZEVNc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEZRVUZGTEVOQlFVTXNPRU5CUVRoRExFVkJRVVU3V1VGREwwTXNZVUZCVFN4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eFZRVUZWTEVOQlFVTXNRMEZCUXp0WlFVTnNReXhoUVVGTkxFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRE8xbEJRemRDTEdGQlFVMHNRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdXVUZETlVJc1lVRkJUU3hEUVVGRExFOUJRVThzUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRaUVVNMVFpeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMSEZDUVVGUExFTkJRVU03WjBKQlEyNUNMRlZCUVZVc1JVRkJSU3hKUVVGSk8yZENRVU5vUWl4TFFVRkxMRVZCUVVVc1pVRkJaVHRuUWtGRGRFSXNTVUZCU1N4RlFVRkZMRlZCUVZVN1owSkJRMmhDTEVsQlFVa3NSVUZCUlN4UFFVRlBPMkZCUTJoQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEwb3NZVUZCVFN4RFFVRkRMRTFCUVUwc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eFZRVUZWTEVOQlFVTXNRMEZCUXp0WlFVTnFReXhoUVVGTkxFTkJRVU1zVjBGQlZ5eERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRXRCUVVzc1JVRkJSU3hsUVVGbExFTkJRVU1zUTBGQlF6dFpRVU5zUkN4aFFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETEVsQlFVa3NSVUZCUlN4VlFVRlZMRU5CUVVNc1EwRkJRenRaUVVNMVF5eGhRVUZOTEVOQlFVTXNWMEZCVnl4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFbEJRVWtzUlVGQlJTeFBRVUZQTEVOQlFVTXNRMEZCUXp0WlFVTjZReXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEhGQ1FVRlBMRU5CUVVNN1owSkJRMjVDTEZWQlFWVXNSVUZCUlN4TFFVRkxPMmRDUVVOcVFpeExRVUZMTEVWQlFVVXNTMEZCU3p0blFrRkRXaXhKUVVGSkxFVkJRVVVzUzBGQlN6dG5Ra0ZEV0N4SlFVRkpMRVZCUVVVc1MwRkJTenRoUVVOa0xFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEwb3NZVUZCVFN4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eFZRVUZWTEVOQlFVTXNRMEZCUXp0WlFVTnNReXhoUVVGTkxFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRE8xbEJRemRDTEdGQlFVMHNRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdXVUZETlVJc1lVRkJUU3hEUVVGRExFOUJRVThzUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVOb1F5eERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXcyUTBGQk5rTXNSVUZCUlR0WlFVTTVReXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEhGQ1FVRlBMRU5CUVVNN1owSkJRMjVDTEZWQlFWVXNSVUZCUlN4SlFVRkpPMmRDUVVOb1FpeExRVUZMTEVWQlFVVXNaVUZCWlR0blFrRkRkRUlzU1VGQlNTeEZRVUZGTEZWQlFWVTdaMEpCUTJoQ0xFbEJRVWtzUlVGQlJTeFBRVUZQTzJGQlEyaENMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMG9zUzBGQlN5eERRVUZETEZGQlFWRXNRMEZCUXl4M1FrRkJWU3hGUVVGRkxFTkJRVU1zUTBGQlF6dFpRVU0zUWl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExIRkNRVUZQTEVOQlFVTTdaMEpCUTI1Q0xGVkJRVlVzUlVGQlJTeExRVUZMTzJkQ1FVTnFRaXhMUVVGTExFVkJRVVVzUzBGQlN6dG5Ra0ZEV2l4SlFVRkpMRVZCUVVVc1MwRkJTenRuUWtGRFdDeEpRVUZKTEVWQlFVVXNTMEZCU3p0aFFVTmtMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMUlzUTBGQlF5eERRVUZETEVOQlFVRTdTVUZEVGl4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOSUxGRkJRVkVzUTBGQlF5eG5Ra0ZCWjBJc1JVRkJSVHRSUVVOMlFpeEpRVUZKTEV0QlFXMUNMRU5CUVVNN1VVRkRlRUlzU1VGQlNTeFJRVUZ0UXl4RFFVRkRPMUZCUTNoRExGVkJRVlVzUTBGQlF6dFpRVU5RTEV0QlFVc3NSMEZCUnl4UlFVRlJMRVZCUVVVc1EwRkJRenRaUVVOdVFpeFJRVUZSTEVkQlFVY3NZMEZCVFN4UFFVRkJMRXRCUVVzc1EwRkJReXhSUVVGUkxFVkJRVVVzUTBGQlF5eFJRVUZSTEVWQlFYcENMRU5CUVhsQ0xFTkJRVU03VVVGREwwTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hGUVVGRkxFTkJRVU1zYjBSQlFXOUVMRVZCUVVVN1dVRkRja1FzUzBGQlN5eERRVUZETEZGQlFWRXNRMEZCUXl3MlFrRkJWeXhEUVVGRExFTkJRVU1zVTBGQlV5eEZRVUZGTEZGQlFWRXNSVUZCUlN4blFrRkJaMElzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTnlSU3hKUVVGSkxFVkJRVVVzUjBGQmVVSXNVVUZCVVN4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRE4wTXNTVUZCU1N4RlFVRkZMRWRCUVhsQ0xGRkJRVkVzUlVGQlJTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUXpkRExFbEJRVWtzUlVGQlJTeEhRVUY1UWl4UlFVRlJMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU0zUXl4aFFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExFVkJRVVVzUlVGQlJUdG5Ra0ZEZGtJc1NVRkJTU3hGUVVGRkxGTkJRVk03WjBKQlEyWXNVVUZCVVN4RlFVRkZMRVZCUVVVN1owSkJRMW9zYzBKQlFYTkNMRVZCUVVVc1EwRkJRenRuUWtGRGVrSXNaVUZCWlN4RlFVRkZMRWxCUVVrN1owSkJRM0pDTEcxQ1FVRnRRaXhGUVVGRkxFdEJRVXM3WVVGRE4wSXNRMEZCUXl4RFFVRkRPMWxCUTBnc1lVRkJUU3hEUVVGRExHVkJRV1VzUTBGQlF5eEZRVUZGTEVWQlFVVTdaMEpCUTNaQ0xFbEJRVWtzUlVGQlJTeFJRVUZSTzJkQ1FVTmtMRkZCUVZFc1JVRkJSU3hGUVVGRk8yZENRVU5hTEhOQ1FVRnpRaXhGUVVGRkxFTkJRVU03WjBKQlEzcENMR1ZCUVdVc1JVRkJSU3hKUVVGSk8yZENRVU55UWl4dFFrRkJiVUlzUlVGQlJTeExRVUZMTzJGQlF6ZENMRU5CUVVNc1EwRkJRenRaUVVOSUxHRkJRVTBzUTBGQlF5eGxRVUZsTEVOQlFVTXNSVUZCUlN4RlFVRkZPMmRDUVVOMlFpeEpRVUZKTEVWQlFVVXNaMEpCUVdkQ08yZENRVU4wUWl4UlFVRlJMRVZCUVVVc1JVRkJSVHRuUWtGRFdpeHpRa0ZCYzBJc1JVRkJSU3hEUVVGRE8yZENRVU42UWl4bFFVRmxMRVZCUVVVc1NVRkJTVHRuUWtGRGNrSXNiVUpCUVcxQ0xFVkJRVVVzUzBGQlN6dGhRVU0zUWl4RFFVRkRMRU5CUVVNN1VVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl4elJrRkJjMFlzUlVGQlJUdFpRVU4yUml4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExEWkNRVUZYTEVOQlFVTXNRMEZCUXl4VFFVRlRMRVZCUVVVc1VVRkJVU3hGUVVGRkxHZENRVUZuUWl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRM0pGTEZGQlFWRXNSVUZCUlN4RFFVRkRMRTlCUVU4c1EwRkJReXhWUVVGRExFTkJRWFZDTzJkQ1FVTjJReXhoUVVGTkxFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTXNRMEZCUXl4dFFrRkJiVUlzUTBGQlF5eERRVUZETzJkQ1FVTjBReXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEN0RFFVRTJRaXhEUVVGRExFTkJRVU1zUTBGQlF5eEpRVUZKTEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOb1JTeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTklMRkZCUVZFc1JVRkJSU3hEUVVGRExFOUJRVThzUTBGQlF5eFZRVUZETEVOQlFYVkNPMmRDUVVOMlF5eGhRVUZOTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNc1EwRkJReXh0UWtGQmJVSXNRMEZCUXl4RFFVRkRPMmRDUVVOeVF5eExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMQ3REUVVFMlFpeERRVUZETEVOQlFVTXNRMEZCUXl4SlFVRkpMRVZCUVVVc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU5xUlN4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOSUxGRkJRVkVzUlVGQlJTeERRVUZETEU5QlFVOHNRMEZCUXl4VlFVRkRMRU5CUVhWQ08yZENRVU4yUXl4aFFVRk5MRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU1zUTBGQlF5eHRRa0ZCYlVJc1EwRkJReXhEUVVGRE8xbEJRekZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTFBc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEZRVUZGTEVOQlFVTXNhVVZCUVdsRkxFVkJRVVU3V1VGRGJFVXNTMEZCU3l4RFFVRkRMRkZCUVZFc1EwRkJReXcyUWtGQlZ5eERRVUZETEVOQlFVTXNVMEZCVXl4RlFVRkZMRkZCUVZFc1JVRkJSU3huUWtGQlowSXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOeVJTeGhRVUZOTEVOQlFVTXNWMEZCVnl4RFFVRkRMRkZCUVZFc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZCTEVOQlFVTXNTVUZCU1N4UFFVRkJMRU5CUVVNc1EwRkJReXhKUVVGSkxFdEJRVXNzVTBGQlV5eEZRVUZ3UWl4RFFVRnZRaXhEUVVGRExFTkJRVU1zYzBKQlFYTkNMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRGVrWXNZVUZCVFN4RFFVRkRMRmRCUVZjc1EwRkJReXhSUVVGUkxFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUVN4RFFVRkRMRWxCUVVrc1QwRkJRU3hEUVVGRExFTkJRVU1zU1VGQlNTeExRVUZMTEZGQlFWRXNSVUZCYmtJc1EwRkJiVUlzUTBGQlF5eERRVUZETEhOQ1FVRnpRaXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEzaEdMR0ZCUVUwc1EwRkJReXhYUVVGWExFTkJRVU1zVVVGQlVTeEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVVFc1EwRkJReXhKUVVGSkxFOUJRVUVzUTBGQlF5eERRVUZETEVsQlFVa3NTMEZCU3l4blFrRkJaMElzUlVGQk0wSXNRMEZCTWtJc1EwRkJReXhEUVVGRExITkNRVUZ6UWl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMmhITEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc2QwUkJRWE5ETEVOQlFVTXNVMEZCVXl4RlFVRkZMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVUU3V1VGRGNrVXNZVUZCVFN4RFFVRkRMRmRCUVZjc1EwRkJReXhSUVVGUkxFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUVN4RFFVRkRMRWxCUVVrc1QwRkJRU3hEUVVGRExFTkJRVU1zU1VGQlNTeExRVUZMTEZOQlFWTXNSVUZCY0VJc1EwRkJiMElzUTBGQlF5eERRVUZETEhOQ1FVRnpRaXhGUVVGRkxFVkJRVVVzUTBGQlF5eERRVUZETzFsQlF6RkdMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zZDBSQlFYTkRMRU5CUVVNc1UwRkJVeXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVRTdXVUZEY0VVc1lVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eFJRVUZSTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJRU3hEUVVGRExFbEJRVWtzVDBGQlFTeERRVUZETEVOQlFVTXNTVUZCU1N4TFFVRkxMRk5CUVZNc1JVRkJjRUlzUTBGQmIwSXNRMEZCUXl4RFFVRkRMSE5DUVVGelFpeEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkRPMWxCUXpGR0xFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNkMFJCUVhORExFTkJRVU1zVVVGQlVTeEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVFN1dVRkRia1VzWVVGQlRTeERRVUZETEZkQlFWY3NRMEZCUXl4UlFVRlJMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlFTeERRVUZETEVsQlFVa3NUMEZCUVN4RFFVRkRMRU5CUVVNc1NVRkJTU3hMUVVGTExGRkJRVkVzUlVGQmJrSXNRMEZCYlVJc1EwRkJReXhEUVVGRExITkNRVUZ6UWl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRM2hHTEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc2QwUkJRWE5ETEVOQlFVTXNaMEpCUVdkQ0xFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUVR0WlFVTXpSU3hoUVVGTkxFTkJRVU1zVjBGQlZ5eERRVUZETEZGQlFWRXNSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGQkxFTkJRVU1zU1VGQlNTeFBRVUZCTEVOQlFVTXNRMEZCUXl4SlFVRkpMRXRCUVVzc1owSkJRV2RDTEVWQlFUTkNMRU5CUVRKQ0xFTkJRVU1zUTBGQlF5eHpRa0ZCYzBJc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU53Unl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5eDVSRUZCZVVRc1JVRkJSVHRaUVVNeFJDeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMRFpDUVVGWExFTkJRVU1zUTBGQlF5eFRRVUZUTEVWQlFVVXNVVUZCVVN4RlFVRkZMR2RDUVVGblFpeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTNKRkxHRkJRVTBzUTBGQlF5eE5RVUZOTEVOQlFVTXNVVUZCVVN4RlFVRkZMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVUVzUTBGQlF5eEpRVUZKTEU5QlFVRXNRMEZCUXl4RFFVRkRMRWxCUVVrc1MwRkJTeXhUUVVGVExFVkJRWEJDTEVOQlFXOUNMRU5CUVVNc1EwRkJReXhsUVVGbExFTkJRVU1zUTBGQlF6dFpRVU14UlN4aFFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExGRkJRVkVzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRkJMRU5CUVVNc1NVRkJTU3hQUVVGQkxFTkJRVU1zUTBGQlF5eEpRVUZKTEV0QlFVc3NVVUZCVVN4RlFVRnVRaXhEUVVGdFFpeERRVUZETEVOQlFVTXNaVUZCWlN4RFFVRkRMRU5CUVVNN1dVRkRla1VzWVVGQlRTeERRVUZETEUxQlFVMHNRMEZCUXl4UlFVRlJMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlFTeERRVUZETEVsQlFVa3NUMEZCUVN4RFFVRkRMRU5CUVVNc1NVRkJTU3hMUVVGTExHZENRVUZuUWl4RlFVRXpRaXhEUVVFeVFpeERRVUZETEVOQlFVTXNaVUZCWlN4RFFVRkRMRU5CUVVNN1dVRkRha1lzUzBGQlN5eERRVUZETEZGQlFWRXNRMEZCUXl3eVEwRkJlVUlzUTBGQlF5eFRRVUZUTEVWQlFVVXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVNMVJDeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMREpEUVVGNVFpeERRVUZETEZGQlFWRXNSVUZCUlN4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRek5FTEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc01rTkJRWGxDTEVOQlFVTXNaMEpCUVdkQ0xFVkJRVVVzUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTnVSU3hoUVVGTkxFTkJRVU1zVDBGQlR5eERRVUZETEZGQlFWRXNSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGQkxFTkJRVU1zU1VGQlNTeFBRVUZCTEVOQlFVTXNRMEZCUXl4SlFVRkpMRXRCUVVzc1UwRkJVeXhGUVVGd1FpeERRVUZ2UWl4RFFVRkRMRU5CUVVNc1pVRkJaU3hEUVVGRExFTkJRVU03V1VGRE0wVXNZVUZCVFN4RFFVRkRMRTlCUVU4c1EwRkJReXhSUVVGUkxFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUVN4RFFVRkRMRWxCUVVrc1QwRkJRU3hEUVVGRExFTkJRVU1zU1VGQlNTeExRVUZMTEZGQlFWRXNSVUZCYmtJc1EwRkJiVUlzUTBGQlF5eERRVUZETEdWQlFXVXNRMEZCUXl4RFFVRkRPMWxCUXpGRkxHRkJRVTBzUTBGQlF5eFBRVUZQTEVOQlFVTXNVVUZCVVN4RlFVRkZMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVUVzUTBGQlF5eEpRVUZKTEU5QlFVRXNRMEZCUXl4RFFVRkRMRWxCUVVrc1MwRkJTeXhuUWtGQlowSXNSVUZCTTBJc1EwRkJNa0lzUTBGQlF5eERRVUZETEdWQlFXVXNRMEZCUXl4RFFVRkRPMUZCUTNSR0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NSVUZCUlN4RFFVRkRMREJFUVVFd1JDeEZRVUZGTzFsQlF6TkVMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zTmtKQlFWY3NRMEZCUXl4RFFVRkRMRk5CUVZNc1JVRkJSU3hSUVVGUkxFVkJRVVVzWjBKQlFXZENMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRGNrVXNTVUZCU1N4UFFVRlBMRWRCUVZrN1owSkJRMjVDTEZOQlFWTXNSVUZCUlN4bFFVRmxPMmRDUVVNeFFpeFBRVUZQTEVWQlFVVXNTVUZCU1N4RFFVRkRMRWRCUVVjc1JVRkJSU3hEUVVGRExGRkJRVkVzUlVGQlJUdG5Ra0ZET1VJc1IwRkJSeXhGUVVGRkxFZEJRVWM3WjBKQlExSXNTVUZCU1N4RlFVRkZMSEZDUVVGeFFqdGhRVU01UWl4RFFVRkRPMWxCUlVZc1MwRkJTeXhEUVVGRExGRkJRVkVzUTBGQlF5d3lRMEZCZVVJc1EwRkJReXhUUVVGVExFVkJRVVVzVDBGQlR5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTTVSQ3hMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETERKRFFVRjVRaXhEUVVGRExGRkJRVkVzUlVGQlJTeFBRVUZQTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUXpkRUxFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNNa05CUVhsQ0xFTkJRVU1zVVVGQlVTeEZRVUZGTEU5QlFVOHNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkROMFFzUzBGQlN5eERRVUZETEZGQlFWRXNRMEZCUXl3eVEwRkJlVUlzUTBGQlF5eG5Ra0ZCWjBJc1JVRkJSU3hQUVVGUExFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEzSkZMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zTWtOQlFYbENMRU5CUVVNc1owSkJRV2RDTEVWQlFVVXNUMEZCVHl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOeVJTeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMREpEUVVGNVFpeERRVUZETEdkQ1FVRm5RaXhGUVVGRkxFOUJRVThzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZGY2tVc1NVRkJTU3hsUVVGbExFZEJRV01zVVVGQlVTeEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVVFc1EwRkJReXhKUVVGSkxFOUJRVUVzUTBGQlF5eERRVUZETEVsQlFVa3NTMEZCU3l4VFFVRlRMRVZCUVhCQ0xFTkJRVzlDTEVOQlFVTXNRMEZCUXl4UlFVRlJMRU5CUVVNN1dVRkRja1lzWVVGQlRTeERRVUZETEdWQlFXVXNRMEZCUXl4bFFVRmxMRU5CUVVNc1RVRkJUU3hGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEyeEVMR0ZCUVUwc1EwRkJReXhsUVVGbExFTkJRVU1zWlVGQlpTeEZRVUZGTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOdVJDeEpRVUZKTEdOQlFXTXNSMEZCWXl4UlFVRlJMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlFTeERRVUZETEVsQlFVa3NUMEZCUVN4RFFVRkRMRU5CUVVNc1NVRkJTU3hMUVVGTExGRkJRVkVzUlVGQmJrSXNRMEZCYlVJc1EwRkJReXhEUVVGRExGRkJRVkVzUTBGQlF6dFpRVU51Uml4aFFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExHTkJRV01zUTBGQlF5eE5RVUZOTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRha1FzWVVGQlRTeERRVUZETEdWQlFXVXNRMEZCUXl4alFVRmpMRVZCUVVVc1EwRkJReXhQUVVGUExFVkJRVVVzVDBGQlR5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTXpSQ3hKUVVGSkxHRkJRV0VzUjBGQll5eFJRVUZSTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJRU3hEUVVGRExFbEJRVWtzVDBGQlFTeERRVUZETEVOQlFVTXNTVUZCU1N4TFFVRkxMR2RDUVVGblFpeEZRVUV6UWl4RFFVRXlRaXhEUVVGRExFTkJRVU1zVVVGQlVTeERRVUZETzFsQlF6RkdMR0ZCUVUwc1EwRkJReXhsUVVGbExFTkJRVU1zWVVGQllTeERRVUZETEUxQlFVMHNSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOb1JDeGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMR0ZCUVdFc1JVRkJSU3hEUVVGRExFOUJRVThzUlVGQlJTeFBRVUZQTEVWQlFVVXNUMEZCVHl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOMlJTeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXd3UkVGQk1FUXNSVUZCUlR0WlFVTXpSQ3hMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETERaQ1FVRlhMRU5CUVVNc1EwRkJReXhUUVVGVExFVkJRVVVzVVVGQlVTeEZRVUZGTEdkQ1FVRm5RaXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEzSkZMRWxCUVVrc1VVRkJVU3hIUVVGak8yZENRVU4wUWl4RlFVRkZMRTFCUVUwc1JVRkJSU3huUWtGQlowSXNSVUZCUlN4VFFVRlRMRVZCUVVVc01FSkJRVEJDTEVWQlFVVXNWMEZCVnl4RlFVRkZMSEZDUVVGeFFpeEZRVUZGTEV0QlFVc3NSVUZCUlN3d1FrRkJNRUlzUlVGQlJUdG5Ra0ZETVVrc1JVRkJSU3hOUVVGTkxFVkJRVVVzVlVGQlZTeEZRVUZGTEZOQlFWTXNSVUZCUlN3d1FrRkJNRUlzUlVGQlJTeFhRVUZYTEVWQlFVVXNjVUpCUVhGQ0xFVkJRVWNzUzBGQlN5eEZRVUZGTERCQ1FVRXdRaXhGUVVGRk8yZENRVU55U1N4RlFVRkZMRTFCUVUwc1JVRkJSU3h2UWtGQmIwSXNSVUZCUlN4VFFVRlRMRVZCUVVVc01FSkJRVEJDTEVWQlFVVXNWMEZCVnl4RlFVRkZMSEZDUVVGeFFpeEZRVUZGTEV0QlFVc3NSVUZCUlN3d1FrRkJNRUlzUlVGQlJUdGhRVUZETEVOQlFVTTdXVUZEY0Vvc1MwRkJTeXhEUVVGRExGRkJRVkVzUTBGQlF5dzJRMEZCTWtJc1EwRkJReXhUUVVGVExFVkJRVVVzVVVGQlVTeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTnFSU3hMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETERaRFFVRXlRaXhEUVVGRExGRkJRVkVzUlVGQlJTeFJRVUZSTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTJoRkxFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNOa05CUVRKQ0xFTkJRVU1zVVVGQlVTeEZRVUZGTEZGQlFWRXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRhRVVzU1VGQlNTeFpRVUZaTEVkQlFVY3NVVUZCVVN4RlFVRkZMRU5CUVVNN1dVRkRPVUlzWVVGQlRTeERRVUZETEdWQlFXVXNRMEZEYkVJc1dVRkJXVHRwUWtGRFVDeEpRVUZKTEVOQlFVTXNWVUZCUXl4RFFVRkRMRWxCUVVzc1QwRkJRU3hEUVVGRExFTkJRVU1zU1VGQlNTeExRVUZMTEZOQlFWTXNSVUZCY0VJc1EwRkJiMElzUTBGQlF6dHBRa0ZEYWtNc1VVRkJVU3hGUVVOaUxGRkJRVkVzUTBGQlF5eERRVUZETzFsQlEyUXNZVUZCVFN4RFFVRkRMR1ZCUVdVc1EwRkRiRUlzV1VGQldUdHBRa0ZEVUN4SlFVRkpMRU5CUVVNc1ZVRkJReXhEUVVGRExFbEJRVXNzVDBGQlFTeERRVUZETEVOQlFVTXNTVUZCU1N4TFFVRkxMRkZCUVZFc1JVRkJia0lzUTBGQmJVSXNRMEZCUXp0cFFrRkRhRU1zVVVGQlVTeEZRVU5pTEZGQlFWRXNRMEZCUXl4TlFVRk5MRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU12UWl4aFFVRk5MRU5CUVVNc1pVRkJaU3hEUVVOc1FpeFpRVUZaTzJsQ1FVTlFMRWxCUVVrc1EwRkJReXhWUVVGRExFTkJRVU1zU1VGQlN5eFBRVUZCTEVOQlFVTXNRMEZCUXl4SlFVRkpMRXRCUVVzc1owSkJRV2RDTEVWQlFUTkNMRU5CUVRKQ0xFTkJRVU03YVVKQlEzaERMRkZCUVZFc1JVRkRZaXhGUVVGRkxFTkJRVU1zUTBGQlF6dFJRVU5hTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1JVRkJSU3hEUVVGRExDdENRVUVyUWl4RlFVRkZPMWxCUTJoRExFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNOa0pCUVZjc1EwRkJReXhEUVVGRExGTkJRVk1zUlVGQlJTeFJRVUZSTEVWQlFVVXNaMEpCUVdkQ0xFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEY2tVc1NVRkJTU3hSUVVGUkxFZEJRV003WjBKQlEzUkNMRVZCUVVVc1RVRkJUU3hGUVVGRkxHZENRVUZuUWl4RlFVRkZMRk5CUVZNc1JVRkJSU3d3UWtGQk1FSXNSVUZCUlN4WFFVRlhMRVZCUVVVc2NVSkJRWEZDTEVWQlFVVXNTMEZCU3l4RlFVRkZMREJDUVVFd1FpeEZRVUZGTzJkQ1FVTXhTU3hGUVVGRkxFMUJRVTBzUlVGQlJTeFZRVUZWTEVWQlFVVXNVMEZCVXl4RlFVRkZMREJDUVVFd1FpeEZRVUZGTEZkQlFWY3NSVUZCUlN4eFFrRkJjVUlzUlVGQlJTeExRVUZMTEVWQlFVVXNNRUpCUVRCQ0xFVkJRVVU3WjBKQlEzQkpMRVZCUVVVc1RVRkJUU3hGUVVGRkxHOUNRVUZ2UWl4RlFVRkZMRk5CUVZNc1JVRkJSU3d3UWtGQk1FSXNSVUZCUlN4WFFVRlhMRVZCUVVVc2NVSkJRWEZDTEVWQlFVVXNTMEZCU3l4RlFVRkZMREJDUVVFd1FpeEZRVUZGTzJGQlFVTXNRMEZCUXp0WlFVTndTaXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETERaRFFVRXlRaXhEUVVGRExGTkJRVk1zUlVGQlJTeFJRVUZSTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTJwRkxFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNOa05CUVRKQ0xFTkJRVU1zVVVGQlVTeEZRVUZGTEZGQlFWRXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRhRVVzUzBGQlN5eERRVUZETEZGQlFWRXNRMEZCUXl3MlEwRkJNa0lzUTBGQlF5eFJRVUZSTEVWQlFVVXNVVUZCVVN4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOb1JTeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMRzFEUVVGcFFpeEZRVUZGTEVOQlFVTXNRMEZCUXp0WlFVTndReXhKUVVGSkxGbEJRVmtzUjBGQlJ5eFJRVUZSTEVWQlFVVXNRMEZCUXp0WlFVTTVRaXhoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEZsQlFWa3NSVUZCUlN4RlFVRkZMRU5CUVVNc1EwRkJRenRSUVVNM1F5eERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTlFMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMGdzVVVGQlVTeERRVUZETEhGQ1FVRnhRaXhGUVVGRk8xRkJRelZDTEVsQlFVa3NTMEZCYlVJc1EwRkJRenRSUVVONFFpeEpRVUZKTEdGQlFUWkRMRU5CUVVNN1VVRkRiRVFzVlVGQlZTeERRVUZETzFsQlExQXNTMEZCU3l4SFFVRkhMRkZCUVZFc1JVRkJSU3hEUVVGRE8xbEJRMjVDTEdGQlFXRXNSMEZCUnl4alFVRk5MRTlCUVVFc1MwRkJTeXhEUVVGRExGRkJRVkVzUlVGQlJTeERRVUZETEdGQlFXRXNSVUZCT1VJc1EwRkJPRUlzUTBGQlF6dFJRVU42UkN4RFFVRkRMRU5CUVVNc1EwRkJRVHRSUVVOR0xFVkJRVVVzUTBGQlF5eHRRa0ZCYlVJc1JVRkJSVHRaUVVOd1FpeGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMR0ZCUVdFc1JVRkJSU3hEUVVGRExFMUJRVTBzUlVGQlJTeEZRVUZGTEVOQlFVTXNRMEZCUXp0WlFVTnVSQ3hMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEN0Q1FVRlJMRU5CUVVNc1dVRkJXU3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU4yUXl4aFFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExHRkJRV0VzUlVGQlJTeERRVUZETEUxQlFVMHNSVUZCUlN4RFFVRkRMRmxCUVZrc1EwRkJReXhEUVVGRExFTkJRVU03V1VGREwwUXNTMEZCU3l4RFFVRkRMRkZCUVZFc1EwRkJReXdyUWtGQlVTeERRVUZETEdWQlFXVXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRNVU1zWVVGQlRTeERRVUZETEdWQlFXVXNRMEZCUXl4aFFVRmhMRVZCUVVVc1EwRkJReXhOUVVGTkxFVkJRVVVzUTBGQlF5eFpRVUZaTEVWQlFVVXNaVUZCWlN4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOd1JpeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXh4UTBGQmNVTXNSVUZCUlR0WlFVTjBReXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEN0Q1FVRlJMRU5CUVVNc1dVRkJXU3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU4yUXl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExDdENRVUZSTEVOQlFVTXNaVUZCWlN4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVNeFF5eGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMR0ZCUVdFc1JVRkJSU3hEUVVGRExFMUJRVTBzUlVGQlJTeERRVUZETEZsQlFWa3NSVUZCUlN4bFFVRmxMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMmhHTEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc2EwTkJRVmNzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUXk5Q0xHRkJRVTBzUTBGQlF5eGxRVUZsTEVOQlFVTXNZVUZCWVN4RlFVRkZMRU5CUVVNc1RVRkJUU3hGUVVGRkxFTkJRVU1zV1VGQldTeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTXZSQ3hMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEd0RFFVRlhMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlFUdFpRVU01UWl4aFFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExHRkJRV0VzUlVGQlJTeERRVUZETEUxQlFVMHNSVUZCUlN4RlFVRkZMRU5CUVVNc1EwRkJRenRSUVVOMlJDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXh4UWtGQmNVSXNSVUZCUlR0WlFVTjBRaXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEN0Q1FVRlJMRU5CUVVNc1dVRkJXU3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU4yUXl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExDdENRVUZSTEVOQlFVTXNaVUZCWlN4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVNeFF5eExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMR3REUVVGWExFVkJRVVVzUTBGQlF5eERRVUZETzFsQlF6bENMR0ZCUVUwc1EwRkJReXhsUVVGbExFTkJRVU1zWVVGQllTeEZRVUZGTEVOQlFVTXNUVUZCVFN4RlFVRkZMRVZCUVVVc1EwRkJReXhEUVVGRE8xRkJRM1pFTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1JVRkJSU3hEUVVGRExHbENRVUZwUWl4RlFVRkZPMWxCUTJ4Q0xHRkJRVTBzUTBGQlF5eGxRVUZsTEVOQlFVTXNZVUZCWVN4RlFVRkZMRU5CUVVNc1MwRkJTeXhGUVVGRkxFVkJRVVVzUTBGQlF5eERRVUZETzFsQlEyeEVMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zT0VKQlFVOHNRMEZCUXl4WFFVRlhMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRM0pETEdGQlFVMHNRMEZCUXl4bFFVRmxMRU5CUVVNc1lVRkJZU3hGUVVGRkxFTkJRVU1zUzBGQlN5eEZRVUZGTEVOQlFVTXNWMEZCVnl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVNM1JDeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMRGhDUVVGUExFTkJRVU1zWTBGQll5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTjRReXhoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEdGQlFXRXNSVUZCUlN4RFFVRkRMRXRCUVVzc1JVRkJSU3hEUVVGRExGZEJRVmNzUlVGQlJTeGpRVUZqTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTJwR0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NSVUZCUlN4RFFVRkRMRzFEUVVGdFF5eEZRVUZGTzFsQlEzQkRMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zT0VKQlFVOHNRMEZCUXl4WFFVRlhMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRM0pETEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc09FSkJRVThzUTBGQlF5eGpRVUZqTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTNoRExFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNhVU5CUVZVc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzFsQlF6bENMR0ZCUVUwc1EwRkJReXhsUVVGbExFTkJRVU1zWVVGQllTeEZRVUZGTEVOQlFVTXNTMEZCU3l4RlFVRkZMRU5CUVVNc1YwRkJWeXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU0zUkN4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExHbERRVUZWTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVNNVFpeGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMR0ZCUVdFc1JVRkJSU3hEUVVGRExFdEJRVXNzUlVGQlJTeEZRVUZGTEVOQlFVTXNRMEZCUXp0UlFVTjBSQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl4dlFrRkJiMElzUlVGQlJUdFpRVU55UWl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExEaENRVUZQTEVOQlFVTXNWMEZCVnl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOeVF5eExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMRGhDUVVGUExFTkJRVU1zWTBGQll5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTjRReXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEdsRFFVRlZMRVZCUVVVc1EwRkJReXhEUVVGRE8xbEJRemRDTEdGQlFVMHNRMEZCUXl4bFFVRmxMRU5CUVVNc1lVRkJZU3hGUVVGRkxFTkJRVU1zUzBGQlN5eEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkRPMUZCUTNSRUxFTkJRVU1zUTBGQlF5eERRVUZETzBsQlExQXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRTQ3hSUVVGUkxFTkJRVU1zWlVGQlpTeEZRVUZGTzFGQlEzUkNMRWxCUVVrc1MwRkJiVUlzUTBGQlF6dFJRVU40UWl4SlFVRkpMRTlCUVdsRExFTkJRVU03VVVGRGRFTXNWVUZCVlN4RFFVRkRPMWxCUTFBc1MwRkJTeXhIUVVGSExGRkJRVkVzUlVGQlJTeERRVUZETzFsQlEyNUNMRTlCUVU4c1IwRkJSeXhqUVVGTkxFOUJRVUVzUzBGQlN5eERRVUZETEZGQlFWRXNSVUZCUlN4RFFVRkRMRTlCUVU4c1JVRkJlRUlzUTBGQmQwSXNRMEZCUXp0UlFVTTNReXhEUVVGRExFTkJRVU1zUTBGQlFUdFJRVU5HTEVWQlFVVXNRMEZCUXl3d1FrRkJNRUlzUlVGQlJUdFpRVU16UWl4aFFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExFOUJRVThzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMWxCUXpsQ0xFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNhME5CUVdsQ0xFVkJRVVVzUTBGQlF5eERRVUZETzFsQlEzQkRMR0ZCUVUwc1EwRkJReXhQUVVGUExFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1dVRkRMMElzUzBGQlN5eERRVUZETEZGQlFWRXNRMEZCUXl4clEwRkJhVUlzUlVGQlJTeERRVUZETEVOQlFVTTdXVUZEY0VNc1lVRkJUU3hEUVVGRExFMUJRVTBzUTBGQlF5eFBRVUZQTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRaUVVNNVFpeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMR3REUVVGcFFpeEZRVUZGTEVOQlFVTXNRMEZCUXp0WlFVTndReXhoUVVGTkxFTkJRVU1zVDBGQlR5eERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRMjVETEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTFBc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFNDeFJRVUZSTEVOQlFVTXNZMEZCWXl4RlFVRkZPMUZCUTNKQ0xFbEJRVWtzUzBGQmJVSXNRMEZCUXp0UlFVTjRRaXhKUVVGSkxFMUJRU3RDTEVOQlFVTTdVVUZEY0VNc1ZVRkJWU3hEUVVGRE8xbEJRMUFzUzBGQlN5eEhRVUZITEZGQlFWRXNSVUZCUlN4RFFVRkRPMWxCUTI1Q0xFMUJRVTBzUjBGQlJ5eGpRVUZOTEU5QlFVRXNTMEZCU3l4RFFVRkRMRkZCUVZFc1JVRkJSU3hEUVVGRExFMUJRVTBzUlVGQmRrSXNRMEZCZFVJc1EwRkJRenRSUVVNelF5eERRVUZETEVOQlFVTXNRMEZCUVR0UlFVTkdMRVZCUVVVc1EwRkJReXh4UkVGQmNVUXNSVUZCUlR0WlFVTjBSQ3hoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEUxQlFVMHNSVUZCUlN4RlFVRkZPMmRDUVVNM1FpeEZRVUZGTEVWQlFVVXNTVUZCU1R0blFrRkRVaXhUUVVGVExFVkJRVVVzUzBGQlN6dG5Ra0ZEYUVJc2JVSkJRVzFDTEVWQlFVVXNSVUZCUlR0aFFVTXhRaXhEUVVGRExFTkJRVU03V1VGRFNDeEpRVUZKTEZGQlFWRXNSMEZCTUVJc1kwRkJZeXhGUVVGRkxFTkJRVU03V1VGRGRrUXNTMEZCU3l4RFFVRkRMRkZCUVZFc1EwRkJReXcyUWtGQllTeERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRlRU1zWVVGQlRTeERRVUZETEdWQlFXVXNRMEZCUXl4TlFVRk5MRVZCUVVVc1JVRkJSVHRuUWtGRE4wSXNSVUZCUlN4RlFVRkZMRkZCUVZFN1owSkJRMW9zVTBGQlV5eEZRVUZGTEV0QlFVczdaMEpCUTJoQ0xHMUNRVUZ0UWl4RlFVRkZMRVZCUVVVN1lVRkRNVUlzUTBGQlF5eERRVUZETzFsQlEwZ3NVVUZCVVN4RFFVRkRMRXRCUVVzc1JVRkJSU3hEUVVGRE8xRkJRM0pDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1JVRkJSU3hEUVVGRExHMURRVUZ0UXl4RlFVRkZPMWxCUTNCRExFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNhME5CUVd0Q0xFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTjZReXhoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEUxQlFVMHNSVUZCUlN4RlFVRkZPMmRDUVVNM1FpeEZRVUZGTEVWQlFVVXNTVUZCU1R0blFrRkRVaXhUUVVGVExFVkJRVVVzU1VGQlNUdG5Ra0ZEWml4dFFrRkJiVUlzUlVGQlJTeEZRVUZGTzJGQlF6RkNMRU5CUVVNc1EwRkJRenRaUVVOSUxFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNhME5CUVd0Q0xFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTXhReXhoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEUxQlFVMHNSVUZCUlN4RlFVRkZPMmRDUVVNM1FpeEZRVUZGTEVWQlFVVXNTVUZCU1R0blFrRkRVaXhUUVVGVExFVkJRVVVzUzBGQlN6dG5Ra0ZEYUVJc2JVSkJRVzFDTEVWQlFVVXNSVUZCUlR0aFFVTXhRaXhEUVVGRExFTkJRVU03VVVGRFVDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXh0UTBGQmJVTXNSVUZCUlR0WlFVTndReXhKUVVGSkxFMUJRVTBzUjBGQllTeERRVUZETEdWQlFXVXNSVUZCUlN4blFrRkJaMElzUTBGQlF5eERRVUZETzFsQlF6TkVMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zZFVOQlFYVkNMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU5vUkN4aFFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExFMUJRVTBzUlVGQlJTeEZRVUZGTzJkQ1FVTTNRaXhGUVVGRkxFVkJRVVVzU1VGQlNUdG5Ra0ZEVWl4VFFVRlRMRVZCUVVVc1MwRkJTenRuUWtGRGFFSXNiVUpCUVcxQ0xFVkJRVVVzVFVGQlRUdGhRVU01UWl4RFFVRkRMRU5CUVVNN1VVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTBnc1VVRkJVU3hEUVVGRExHdENRVUZyUWl4RlFVRkZPMUZCUTNwQ0xFbEJRVWtzUzBGQmJVSXNRMEZCUXp0UlFVTjRRaXhKUVVGSkxGTkJRWEZETEVOQlFVTTdVVUZETVVNc1ZVRkJWU3hEUVVGRE8xbEJRMUFzUzBGQlN5eEhRVUZITEZGQlFWRXNSVUZCUlN4RFFVRkRPMWxCUTI1Q0xGTkJRVk1zUjBGQlJ5eGpRVUZOTEU5QlFVRXNTMEZCU3l4RFFVRkRMRkZCUVZFc1JVRkJSU3hEUVVGRExGTkJRVk1zUlVGQk1VSXNRMEZCTUVJc1EwRkJRenRSUVVOcVJDeERRVUZETEVOQlFVTXNRMEZCUVR0UlFVTkdMRVZCUVVVc1EwRkJReXh4UWtGQmNVSXNSVUZCUlR0WlFVTjBRaXhKUVVGSkxFdEJRVXNzUjBGQmJVSTdaMEpCUTNoQ0xHVkJRV1VzUlVGQlJUdHZRa0ZEWWl4SlFVRkpMRVZCUVVVc1RVRkJUVHR2UWtGRFdpeEpRVUZKTEVWQlFVVXNWMEZCVnp0cFFrRkRjRUk3WjBKQlEwUXNaMEpCUVdkQ0xFVkJRVVU3YjBKQlEyUXNTVUZCU1N4RlFVRkZMRTlCUVU4N2IwSkJRMklzU1VGQlNTeEZRVUZGTEdOQlFXTTdhVUpCUTNaQ08yZENRVU5FTEdkQ1FVRm5RaXhGUVVGRk8yOUNRVU5rTEVsQlFVa3NSVUZCUlN4UFFVRlBPMjlDUVVOaUxFbEJRVWtzUlVGQlJTeFhRVUZYTzJsQ1FVTndRanRoUVVOS0xFTkJRVUU3V1VGRFJDeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMRGhDUVVGWExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTnVReXhoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEZOQlFWTXNSVUZCUlN4RlFVRkZMRXRCUVVzc1EwRkJReXhEUVVGRE8xRkJReTlETEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTFBc1EwRkJReXhEUVVGRExFTkJRVU03UVVGRFVDeERRVUZETEVOQlFVTXNRMEZCUXlKOSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zLW1vY2stYWRhcHRlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiY3J5cHRqc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjaGFpXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvbXByZXNzaW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvbm5lY3QtbW9uZ29cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29va2llLXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjc3VyZlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3Mtc2Vzc2lvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJoZWxtZXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqc29ud2VidG9rZW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9jaGFcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9uZ29vc2VcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibXVzdGFjaGUtZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LWxvZ2dlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1tb2NrLXN0b3JlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LXRodW5rXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNvY2tldC5pb1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzb2NrZXQuaW8tY2xpZW50XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNvY2tldGlvLWp3dFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdXBlcnRlc3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3VwZXJ0ZXN0LXNlc3Npb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidmFsaWRhdG9yXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=