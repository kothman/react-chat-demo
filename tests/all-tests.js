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
        return User_1["default"].find({}).select('name email role deleted').then(function (users) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlckNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmVyL2NvbnRyb2xsZXJzL3VzZXJDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQTJDO0FBRTNDLHVDQUF5RDtBQUN6RCxxQ0FBK0M7QUFFL0MscUJBQWU7SUFDWCxJQUFJLEVBQUUsVUFBQyxHQUFZLEVBQUUsR0FBYTtRQUM5QixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBQ0QsS0FBSyxFQUFFLFVBQUMsR0FBWSxFQUFFLEdBQWE7UUFDL0IsT0FBTyxpQkFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMseUJBQXlCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxLQUFjO1lBQ3ZFLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBQy9ELENBQUMsQ0FBQyxDQUFDLE9BQUssQ0FBQSxDQUFDLFVBQUMsR0FBVTtZQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsNkNBQTZDLEVBQUMsQ0FBQyxDQUFDO1FBQ3hGLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNELFdBQVcsRUFBRSxVQUFDLEdBQVksRUFBRSxHQUFhO1FBQ3JDLElBQUcsQ0FBQyxtQkFBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3hCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxL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

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
    if (!token) {
        if (!res.status)
            return next();
        return res.status(401).json({ error: 'Not authorized' });
    }
    jsonwebtoken_1.verify(token, env.secret, function (err, decoded) {
        if (err && res.status)
            return res.status(401).send({ error: 'Not authorized' });
        else
            req.user = decoded;
        return next();
    });
}
exports["default"] = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXplZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbWlkZGxld2FyZS9hdXRob3JpemVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkNBQXNDO0FBR3RDLElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNwQyxtQkFBd0IsR0FBWSxFQUFFLEdBQW1CLEVBQUUsSUFBYztJQUNyRSxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDL0QsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNSLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTTtZQUFFLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDL0IsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7S0FDNUQ7SUFFRCxxQkFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLFVBQUMsR0FBVSxFQUFFLE9BQWM7UUFDakQsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU07WUFBRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQzs7WUFDM0UsR0FBRyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7UUFDeEIsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUNsQixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFaRCwrQkFZQyJ9

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
    },
    verified: {
        type: Boolean,
        "default": false,
    },
}, {
    timestamps: true
});
userSchema.statics.findByEmail = function (email) {
    return this.findOne({ email: email });
};
var User = mongoose_1.model('User', userSchema);
exports["default"] = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbW9kZWxzL1VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBOEU7QUFZN0UsQ0FBQztBQU1GLElBQU0sVUFBVSxHQUFXLElBQUksaUJBQU0sQ0FBQztJQUNsQyxJQUFJLEVBQUUsTUFBTTtJQUNaLEtBQUssRUFBRTtRQUNILFFBQVEsRUFBRSxJQUFJO1FBQ2QsSUFBSSxFQUFFLE1BQU07UUFDWixTQUFTLEVBQUUsSUFBSTtLQUNsQjtJQUNELFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsU0FBUyxFQUFFLElBQUk7UUFDZixNQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO0tBQzFCO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLE9BQU87UUFDYixTQUFPLEVBQUUsS0FBSztLQUNqQjtJQUNELFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxPQUFPO1FBQ2IsU0FBTyxFQUFFLEtBQUs7S0FDakI7Q0FDSixFQUFFO0lBQ0MsVUFBVSxFQUFFLElBQUk7Q0FDbkIsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsVUFBVSxLQUFhO0lBQ3BELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0FBQ3hDLENBQUMsQ0FBQTtBQUVELElBQU0sSUFBSSxHQUFlLGdCQUFLLENBQW9CLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN0RSxxQkFBZSxJQUFJLENBQUMifQ==

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZlci9yb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQkFBNkI7QUFFN0Isc0RBQWlEO0FBQ2pELDRDQUF1QztBQUN2QywrREFBMEQ7QUFDMUQsK0RBQTBEO0FBQzFELHFFQUFnRTtBQUNoRSxxRUFBZ0U7QUFFaEUsbUJBQXdCLEdBQVE7SUFHNUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsVUFBVSxHQUFZLEVBQUUsR0FBYTtRQUM5QyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsOEJBQThCLENBQUMsRUFDdkQsRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQ2pDLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQVUsR0FBUSxFQUFFLEdBQVE7UUFDM0MsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLHdDQUF3QyxDQUFDLENBQ3BFLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFVBQVUsR0FBUSxFQUFFLEdBQVE7UUFDaEQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLHVDQUF1QyxDQUFDLENBQ25FLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUlILEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLDJCQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEQsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSwyQkFBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RELEdBQUcsQ0FBQyxHQUFHLENBQUMs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
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
        server.close(function () {
            process.exit(0);
        });
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
    exports.socketServer = socketServer = index_1["default"](server, db, sessionMiddleware);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZlci9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSwyQkFBNkI7QUFDN0IsaUNBQW1DO0FBQ25DLDJCQUE2QjtBQUU3QixtQ0FBcUM7QUFDckMsNEJBQThCO0FBQzlCLDRDQUE4QztBQUM5Qyx5Q0FBMkM7QUFDM0Msd0NBQTBDO0FBQzFDLGlDQUFtQztBQUNuQywrQkFBaUM7QUFFakMseUNBQTJDO0FBQzNDLDZDQUFvQztBQUNwQyxJQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUNwRCxJQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7QUFFckQsbUNBQThCO0FBQzlCLDJDQUEwQztBQUUxQyxzQ0FBNEM7QUFDNUMsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBRWpDLElBQU0sR0FBRyxHQUFRLE9BQU8sRUFBRSxDQUFDO0FBc0lsQixrQkFBRztBQXJJWixJQUFNLElBQUksR0FBb0IsR0FBRyxDQUFDLElBQUksQ0FBQztBQUN2QyxJQUFJLE1BQW1CLENBQUM7QUFDeEIsSUFBSSxZQUE2QixDQUFDO0FBbUlwQixvQ0FBWTtBQWpJMUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQztBQUN0QyxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUUvQixHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7QUFFdkIsSUFBTSxpQkFBaUIsR0FBRyxPQUFPLENBQUM7SUFDOUIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNO0lBQ2xCLE1BQU0sRUFBRTtRQUNKLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJO1FB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
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
var Message_1 = __webpack_require__(/*! ../models/Message */ "./src/server/models/Message.ts");
var authorized_1 = __webpack_require__(/*! ../middleware/authorized */ "./src/server/middleware/authorized.ts");
var env = __webpack_require__(/*! ../../../env */ "./env.js");
var init = function (server, db, sessionMiddleware) {
    var io = socketio(server);
    var connectedUserEmails = [];
    io.use(function (socket, next) {
        sessionMiddleware(socket.request, {}, next);
    });
    io.use(function (socket, next) {
        authorized_1["default"](socket.request, {}, next);
    });
    io.use(function (socket, next) {
        if (!socket.request.user)
            return socket.disconnect();
        next();
    });
    io.on('connection', function (socket) {
        connectedUserEmails.push(socket.request.user.email);
        console.log('Connected users', connectedUserEmails);
        io.emit('connected users', connectedUserEmails);
        socket.on('disconnect', function () {
            connectedUserEmails.splice(connectedUserEmails.indexOf(socket.request.user.email), 1);
            io.emit('connected users', connectedUserEmails);
        });
        socket.on('message', function (message) {
            console.log(message);
            var m = new Message_1["default"]({
                channel: message.channel,
                text: message.text,
                userEmail: socket.request.user.email
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmVyL3NvY2tldC5pby9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9DQUFzQztBQUd0Qyw2Q0FBc0Q7QUFFdEQsdURBQTREO0FBRTVELElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQU1wQyxJQUFNLElBQUksR0FBRyxVQUFDLE1BQWMsRUFBRSxFQUFjLEVBQUUsaUJBQXNCO0lBQ2hFLElBQU0sRUFBRSxHQUFvQixRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0MsSUFBSSxtQkFBbUIsR0FBYSxFQUFFLENBQUM7SUFFdkMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFDLE1BQU0sRUFBRSxJQUFJO1FBQ2hCLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFDLE1BQU0sRUFBRSxJQUFJO1FBRWhCLHVCQUFvQixDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25ELENBQUMsQ0FBQyxDQUFBO0lBQ0YsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFDLE1BQU0sRUFBRSxJQUFJO1FBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUk7WUFDcEIsT0FBTyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDL0IsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQTtJQUdGLEVBQUUsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQUMsTUFBYztRQUMvQixtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3BELEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUVoRCxNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRTtZQUNwQixtQkFBbUIsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RGLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUNwRCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQUMsT0FBMEM7WUFDNUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsR0FBYSxJQUFJLG9CQUFPLENBQUM7Z0JBQzFCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztnQkFDeEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO2dCQUNsQixTQUFTLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSzthQUN2QyxDQUFDLENBQUM7WUFDSCxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBVztnQkFDdEIsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7b0JBQ2YsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHO29CQUNWLFNBQVMsRUFBRSxDQUFDLENBQUMsU0FBUztvQkFDdEIsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJO29CQUNaLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTztvQkFDbEIsT0FBTyxFQUFFLENBQUMsQ0FBQyxTQUFTO2lCQUN2QixDQUFDLENBQUM7Z0JBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxDQUFDLE9BQUssQ0FBQSxDQUFDLFVBQUMsR0FBVTtnQkFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM5QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLEVBQUUsQ0FBQztBQUNkLENBQUMsQ0FBQTtBQUVELHFCQUFlLElBQUksQ0FBQyJ9

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
            dispatch(exports.setSocketConnected(true));
            console.log('authorized [' + socket.id + ']');
            socket.on('connected users', function (userEmails) {
                dispatch(exports.setSocketConnectedUsers(userEmails));
            });
        });
        socket.on('disconnect', function () {
            dispatch(exports.setSocketConnected(false));
            console.log('Disconnected from websocket server, attempting reconnect');
        });
        return dispatch(exports.initWebsocket(socket));
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0QWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy93ZWIvYWN0aW9ucy9zb2NrZXRBY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQXVDO0FBSzFCLFFBQUEsY0FBYyxHQUFHLGdCQUFnQixDQUFDO0FBQ2xDLFFBQUEsb0JBQW9CLEdBQUcsc0JBQXNCLENBQUM7QUFDOUMsUUFBQSwwQkFBMEIsR0FBRyw0QkFBNEIsQ0FBQztBQUUxRCxRQUFBLGFBQWEsR0FBRyxVQUFDLEVBQXlCO0lBQ25ELE9BQU87UUFDSCxJQUFJLEVBQUUsc0JBQWM7UUFDcEIsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtLQUNuQixDQUFDO0FBQ04sQ0FBQyxDQUFBO0FBRVksUUFBQSxrQkFBa0IsR0FBRyxVQUFDLFNBQWtCO0lBQ2pELE9BQU87UUFDSCxJQUFJLEVBQUUsNEJBQW9CO1FBQzFCLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUU7S0FDakMsQ0FBQTtBQUNMLENBQUMsQ0FBQTtBQUVZLFFBQUEsdUJBQXVCLEdBQUcsVUFBQyxVQUFvQjtJQUN4RCxPQUFPO1FBQ0gsSUFBSSxFQUFFLGtDQUEwQjtRQUNoQyxJQUFJLEVBQUUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFO0tBQ25DLENBQUE7QUFDTCxDQUFDLENBQUE7QUFFWSxRQUFBLElBQUksR0FBRztJQUNoQixPQUFPLFVBQUMsUUFBa0IsRUFBRSxRQUFrQjtRQUMxQyxJQUFJLE1BQU0sR0FBMEIsRUFBRSxFQUFFLENBQUM7UUFDekMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUU7WUFDakIsUUFBUSxDQUFDLDBCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUM5QyxNQUFNLENBQUMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLFVBQUMsVUFBb0I7Z0JBQzlDLFFBQVEsQ0FBQywrQkFBdUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2xELENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRTtZQUNwQixRQUFRLENBQUMsMEJBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLDBEQUEwRCxDQUFDLENBQUM7UUFDNUUsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLFFBQVEsQ0FBQyxxQkFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQyxDQUFBO0FBQ0wsQ0FBQyxDQUFBIn0=

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
exports.createUser = function (name, email, role) {
    return function (dispatch) {
        return axios_1["default"].post('/api/v1/user/create', {
            name: name,
            email: email,
            role: role,
        }).then(function (res) {
            dispatch(notificationsActions_1.addInfo('New user created'));
        })["catch"](function (err) {
            if (err.response && err.response.data.error)
                dispatch(notificationsActions_1.addError(err.response.data.error));
            else
                dispatch(notificationsActions_1.addError('Something went wrong'));
        });
    };
};
exports.editUser = function (originalEmail, newName, newEmail, newRole) {
    return function (dispatch) {
        return axios_1["default"].put('/api/v1/user/update', {
            email: originalEmail,
            user: {
                name: newName,
                email: newEmail,
                role: newRole
            }
        }).then(function (res) {
            dispatch(notificationsActions_1.addInfo('Changes saved'));
        })["catch"](function (err) {
            if (err.response && err.response.data.error)
                dispatch(notificationsActions_1.addError(err.response.data.error));
            else
                dispatch(notificationsActions_1.addError('Something went wrong'));
        });
    };
};
exports.deleteUser = function (email) {
    return function (dispatch) {
        return axios_1["default"]({
            method: 'delete',
            url: '/api/v1/user/delete',
            data: { email: email }
        }).then(function (res) {
            dispatch(notificationsActions_1.addInfo('User deleted'));
        })["catch"](function (err) {
            if (err.response && err.response.data.error)
                dispatch(notificationsActions_1.addError(err.response.data.error));
            else
                dispatch(notificationsActions_1.addError('Something went wrong'));
        });
    };
};
exports.restoreUser = function (email) {
    return function (dispatch) {
        return axios_1["default"].put('/api/v1/user/restore', {
            email: email
        }).then(function (res) {
            dispatch(notificationsActions_1.addInfo('User restored'));
        })["catch"](function (err) {
            if (err.response && err.response.data.error)
                dispatch(notificationsActions_1.addError(err.response.data.error));
            else
                dispatch(notificationsActions_1.addError('Something went wrong'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvd2ViL3JlZHVjZXJzL2NoYW5uZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOERBT3NDO0FBMEJ0QyxJQUFJLFlBQVksR0FBVSxFQUFFLENBQUM7QUFFaEIsUUFBQSxhQUFhLEdBQUcsVUFBQyxRQUEyQixFQUFFLFdBQW1CO0lBQzFFLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUUsVUFBQyxDQUFVO1FBQ3BDLE9BQU8sQ0FBQyxDQUFDLElBQUksS0FBSyxXQUFXLENBQUM7SUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDSCxJQUFJLENBQUMsT0FBTztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQzNCLE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUMsQ0FBQTtBQUVELG1CQUF5QixLQUEyQixFQUFFLE1BQWM7SUFBM0Msc0JBQUEsRUFBQSxvQkFBMkI7SUFDaEQsUUFBTyxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQ2hCLEtBQUssOEJBQVk7WUFDYixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ2hDLEtBQUssNERBQTBDLENBQUMsQ0FBQztZQUM3QyxJQUFJLFNBQU8sR0FBWSxxQkFBYSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pFLElBQUksV0FBUyxHQUFXLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzlDLElBQUksQ0FBQyxTQUFPLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvREFBb0QsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDMUUsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFDRCxJQUFJLGFBQVcsR0FBYyxLQUFLLENBQUMsR0FBRyxDQUFFLFVBQUMsQ0FBVTtnQkFDL0MsSUFBRyxDQUFDLENBQUMsSUFBSSxLQUFLLFNBQU8sQ0FB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

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdFVzZXJDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdGVzdHMvc2VydmVyL3Rlc3RVc2VyQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFxQztBQUNyQyxxQ0FBb0M7QUFDcEMsNkJBQThCO0FBRTlCLHlCQUE4QztBQUM5QyxxREFBMkQ7QUFFM0QsUUFBUSxDQUFDLGlCQUFpQixFQUFFO0lBQ3hCLElBQUksS0FBYSxDQUFDO0lBQ2xCLElBQUksUUFBUSxHQUFHO1FBQ1gsSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsZUFBZTtRQUN0QixRQUFRLEVBQUUsTUFBTTtRQUNoQixJQUFJLEVBQUUsT0FBTztLQUNoQixDQUFDO0lBRUYsVUFBVSxDQUFDLFVBQVMsSUFBSTtRQUNwQixzQkFBa0IsRUFBRSxDQUFDLElBQUksQ0FBQztZQUN0QixJQUFJLElBQUksR0FBVSxJQUFJLGlCQUFJLENBQUM7Z0JBQ3ZCLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtnQkFDbkIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLO2dCQUNyQixRQUFRLEVBQUUsbUJBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO2dCQUNyQyxJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7YUFDdEIsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLElBQVc7Z0JBRXpCLE9BQU8sQ0FBQyxPQUFHLENBQUM7cUJBQ1AsSUFBSSxDQUFDLGVBQWUsQ0FBQztxQkFDckIsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUMsQ0FBQztxQkFDMUQsTUFBTSxDQUFDLEdBQUcsQ0FBQztxQkFDWCxHQUFHLENBQUMsVUFBQyxHQUFRLEVBQUUsR0FBcUI7b0JBQ2pDLEtBQUssR0FBRyxHQUFH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

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
        describe('updateName', function () {
            it('should handle callback and set info ', function (done) {
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
            it('should set an error on failed request', function (done) {
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
        });
        describe('updateEmail', function () {
            it('should set an error on failed request', function (done) {
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
            it('should handle callback and set info', function (done) {
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
        });
        describe('updatePassword', function () {
            it('should set info', function (done) {
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
            it('should set an error on failed request', function (done) {
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
        describe('createUser', function () {
            it('should set info on success', function (done) {
                mockStore
                    .dispatch(userActions_1.createUser('Name', 'email@test.com', 'user'))
                    .then(function () {
                    var actions = mockStore.getActions();
                    chai_1.assert.deepStrictEqual(actions, [notificationsActions_1.addInfo('New user created')]);
                    done();
                })["catch"](done);
            });
            it('should set error on failure', function (done) {
                mockAxios.reset();
                mockAxios.onAny().reply(400, { error: 'Something went wrong' });
                mockStore
                    .dispatch(userActions_1.createUser('Name', 'email@test.com', 'user'))
                    .then(function () {
                    var actions = mockStore.getActions();
                    chai_1.assert.deepStrictEqual(actions, [notificationsActions_1.addError('Something went wrong')]);
                    done();
                })["catch"](done);
            });
        });
        describe('editUser', function () {
            it('should set info on success', function (done) {
                mockStore
                    .dispatch(userActions_1.editUser('original@test.com', 'Name', 'email@test.com', 'user'))
                    .then(function () {
                    var actions = mockStore.getActions();
                    chai_1.assert.deepStrictEqual(actions, [notificationsActions_1.addInfo('Changes saved')]);
                    done();
                })["catch"](done);
            });
            it('should set error on failure', function (done) {
                mockAxios.reset();
                mockAxios.onAny().reply(400, { error: 'Something went wrong' });
                mockStore
                    .dispatch(userActions_1.editUser('original@test.com', 'Name', 'email@test.com', 'user'))
                    .then(function () {
                    var actions = mockStore.getActions();
                    chai_1.assert.deepStrictEqual(actions, [notificationsActions_1.addError('Something went wrong')]);
                    done();
                })["catch"](done);
            });
        });
        describe('deleteUser', function () {
            it('should set info on success', function (done) {
                mockStore
                    .dispatch(userActions_1.deleteUser('user@test.com'))
                    .then(function () {
                    var actions = mockStore.getActions();
                    chai_1.assert.deepStrictEqual(actions, [notificationsActions_1.addInfo('User deleted')]);
                    done();
                })["catch"](done);
            });
            it('should set error on failure', function (done) {
                mockAxios.reset();
                mockAxios.onAny().reply(400, { error: 'Something went wrong' });
                mockStore
                    .dispatch(userActions_1.deleteUser('test@test.com'))
                    .then(function () {
                    var actions = mockStore.getActions();
                    chai_1.assert.deepStrictEqual(actions, [notificationsActions_1.addError('Something went wrong')]);
                    done();
                })["catch"](done);
            });
        });
        describe('restoreUser', function () {
            it('should set info on success', function (done) {
                mockStore
                    .dispatch(userActions_1.restoreUser('user@test.com'))
                    .then(function () {
                    var actions = mockStore.getActions();
                    chai_1.assert.deepStrictEqual(actions, [notificationsActions_1.addInfo('User restored')]);
                    done();
                })["catch"](done);
            });
            it('should set error on failure', function (done) {
                mockAxios.reset();
                mockAxios.onAny().reply(400, { error: 'Something went wrong' });
                mockStore
                    .dispatch(userActions_1.restoreUser('test@test.com'))
                    .then(function () {
                    var actions = mockStore.getActions();
                    chai_1.assert.deepStrictEqual(actions, [notificationsActions_1.addError('Something went wrong')]);
                    done();
                })["catch"](done);
            });
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
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdEFzeW5jQWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Rlc3RzL3dlYi90ZXN0QXN5bmNBY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUJBQWU7QUFDZiwrQkFBMEI7QUFDMUIsNkJBQThCO0FBQzlCLHlEQUE2QztBQUM3QyxxREFBc0Y7QUFDdEYsMkNBQStCO0FBQy9CLGlFQUEySTtBQUUzSSxtRkFBb0c7QUFFcEcscUVBQXNHO0FBQ3RHLHlFQUFvUjtBQUNwUiwyRUFBb0Y7QUFJcEYsSUFBTSxnQkFBZ0IsR0FBcUIsNkJBQWMsQ0FBQyxDQUFDLHdCQUFLLENBQUMsQ0FBQyxDQUFDO0FBRW5FLFNBQVMsUUFBUSxDQUFDLEtBQVU7SUFBVixzQkFBQSxFQUFBLFVBQVU7SUFDeEIsT0FBTyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBRUQsUUFBUSxDQUFDLGVBQWUsRUFBRTtJQUN0QixJQUFJLFNBQXFDLENBQUM7SUFDMUMsSUFBSSxTQUFzQixDQUFDO0lBRTNCLE1BQU0sQ0FBQztRQUNILFNBQVMsR0FBRyxJQUFJLCtCQUFXLENBQUMsa0JBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBRUgsS0FBSyxDQUFDO1FBQ0YsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLG9CQUFvQixFQUFFO1FBQzNCLFVBQVUsQ0FBQztZQUNQLFNBQVMsR0FBRyxRQUFRLEVBQUUsQ0FBQztZQUN2QixTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbEIsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDcEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxRQUFRLENBQUMsWUFBWSxFQUFFO1lBQ25CLEVBQUUsQ0FBQyxzQ0FBc0MsRUFBRSxVQUFV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

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdFN0b3JlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdGVzdHMvd2ViL3Rlc3RTdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE4QjtBQUM5QixpQkFBZTtBQUNmLGlEQUFtRDtBQUVuRCw2Q0FBbUU7QUFFbkUsK0JBQTJDO0FBQzNDLGlFQUF1RjtBQUN2Rix5RUFBaVA7QUFFalAsbUZBQWlJO0FBQ2pJLHVFQUF5RTtBQUN6RSxxRUFBaUg7QUFDakgsMkVBQTBGO0FBRzFGLFNBQVMsUUFBUTtJQUNiLE9BQU8sbUJBQVcsQ0FBQyxtQkFBVyxFQUFFLGtCQUFVLENBQUMsQ0FBQztBQUNoRCxDQUFDO0FBRUQsUUFBUSxDQUFDLCtCQUErQixFQUFFO0lBQ3RDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7UUFDbkIsSUFBSSxLQUFtQixDQUFDO1FBQ3hCLElBQUksSUFBMkIsQ0FBQztRQUNoQyxVQUFVLENBQUM7WUFDUCxLQUFLLEdBQUcsUUFBUSxFQUFFLENBQUM7WUFDbkIsSUFBSSxHQUFHLGNBQU0sT0FBQSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFyQixDQUFxQixDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDBCQUEwQixFQUFFO1lBQzNCLGFBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbEMsYUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QixhQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLGFBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsaURBQWlELEVBQUU7WUFDbEQsYUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNsQyxLQUFLLENBQUMsUUFBUSxDQUFDLDJCQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwQyxhQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2pDLEtBQUssQ0FBQyxRQUFRLENBQUMsMkJBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLGFBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsOENBQThDLEVBQUU7WUFDL0MsYUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNsQyxhQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdCLGFBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsYUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QixLQUFLLENBQUMsUUFBUSxDQUFDLHFCQUFPLENBQUM7Z0JBQ25CLFVBQVUsRUFBRSxJQUFJO2dCQUNoQixLQUFLLEVBQUUsZUFBZTtnQkFDdEIsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLElBQUksRUFBRSxPQUFPO2FBQ2hCLENBQUMsQ0FBQyxDQUFDO1lBQ0osYUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNqQyxhQUFNLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxlQUFlLENBQUMsQ0FBQztZQUNsRCxhQUFNLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztZQUM1QyxhQUFNLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztZQUN6QyxLQUFLLENBQUMsUUFBUSxDQUFDLHFCQUFPLENBQUM7Z0JBQ25CLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixLQUFLLEVBQUUsS0FBSztnQkFDWixJQUFJLEVBQUUsS0FBSztnQkFDWCxJQUFJLEVBQUUsS0FBSzthQUNkLENBQUMsQ0FBQyxDQUFDO1lBQ0osYUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNsQyxhQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdCLGFBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsYUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyw2Q0FBNkMsRUFBRTtZQUM5QyxLQUFLLENBQUMsUUFBUSxDQUFDLHFCQUFPLENBQUM7Z0JBQ25CLFVBQVUsRUFBRSxJQUFJO2dCQUNoQixLQUFLLEVBQUUsZUFBZTtnQkFDdEIsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLElBQUksRUFBRSxPQUFPO2FBQ2hCLENBQUMsQ0FBQyxDQUFDO1lBQ0osS0FBSyxDQUFDLFFBQVEsQ0FBQyx3QkFBVSxFQUFFLENBQUMsQ0FBQztZQUM3QixLQUFLLENBQUMsUUFBUSxDQUFDLHFCQUFPLENBQUM7Z0JBQ25CLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixLQUFLLEVBQUUsS0FBSztnQkFDWixJQUFJLEVBQUUsS0FBSztnQkFDWCxJQUFJLEVBQUUsS0FBSzthQUNkLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUMsQ0FBQztJQUNILFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtRQUN2QixJQUFJLEtBQW1CLENBQUM7UUFDeEIsSUFBSSxRQUFtQyxDQUFDO1FBQ3hDLFVBQVUsQ0FBQztZQUNQLEtBQUssR0FBRyxRQUFRLEVBQUUsQ0FBQztZQUNuQixRQUFRLEdBQUcsY0FBTSxPQUFBLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQXpCLENBQXlCLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsb0RBQW9ELEVBQUU7WUFDckQsS0FBSyxDQUFDLFFBQVEsQ0FBQyw2QkFBVyxDQUFDLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRSxJQUFJLEVBQUUsR0FBeUIsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsSUFBSSxFQUFFLEdBQXlCLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdDLElBQUksRUFBRSxHQUF5QixRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QyxhQUFNLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRTtnQkFDdkIsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osc0JBQXNCLEVBQUUsQ0FBQztnQkFDekIsZUFBZSxFQUFFLElBQUk7Z0JBQ3JCLG1CQUFtQixFQUFFLEtBQUs7YUFDN0IsQ0FBQyxDQUFDO1lBQ0gsYUFBTSxDQUFDLGVBQWUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3ZCLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxFQUFFO2dCQUNaLHNCQUFzQixFQUFFLENBQUM7Z0JBQ3pCLGVBQWUsRUFBRSxJQUFJO2dCQUNyQixtQkFBbUIsRUFBRSxLQUFLO2FBQzdCLENBQUMsQ0FBQztZQUNILGFBQU0sQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFO2dCQUN2QixJQUFJLEVBQUUsZ0JBQWdCO2dCQUN0QixRQUFRLEVBQUUsRUFBRTtnQkFDWixzQkFBc0IsRUFBRSxDQUFDO2dCQUN6QixlQUFlLEVBQUUsSUFBSTtnQkFDckIsbUJBQW1CLEVBQUUsS0FBSzthQUM3QixDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxzRkFBc0YsRUFBRTtZQUN2RixLQUFLLENBQUMsUUFBUSxDQUFDLDZCQUFXLENBQUMsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQXVCO2dCQUN2QyxhQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUN0QyxLQUFLLENBQUMsUUFBUSxDQUFDLCtDQUE2QixDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNoRSxDQUFDLENBQUMsQ0FBQztZQUNILFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQXVCO2dCQUN2QyxhQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUNyQyxLQUFLLENBQUMsUUFBUSxDQUFDLCtDQUE2QixDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNqRSxDQUFDLENBQUMsQ0FBQztZQUNILFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQXVCO2dCQUN2QyxhQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsaUVBQWlFLEVBQUU7WUFDbEUsS0FBSyxDQUFDLFFBQVEsQ0FBQyw2QkFBVyxDQUFDLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRSxhQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFwQixDQUFvQixDQUFDLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDekYsYUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hGLGFBQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksS0FBSyxnQkFBZ0IsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hHLEtBQUssQ0FBQyxRQUFRLENBQUMsd0RBQXNDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDckUsYUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDLHNCQUFzQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzFGLEtBQUssQ0FBQyxRQUFRLENBQUMsd0RBQXNDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDcEUsYUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDLHNCQUFzQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzFGLEtBQUssQ0FBQyxRQUFRLENBQUMsd0RBQXNDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDbkUsYUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hGLEtBQUssQ0FBQyxRQUFRLENBQUMsd0RBQXNDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUMzRSxhQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEtBQUssZ0JBQWdCLEVBQTNCLENBQTJCLENBQUMsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwRyxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyx5REFBeUQsRUFBRTtZQUMxRCxLQUFLLENBQUMsUUFBUSxDQUFDLDZCQUFXLENBQUMsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLGFBQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksS0FBSyxTQUFTLEVBQXBCLENBQW9CLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMxRSxhQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFuQixDQUFtQixDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDekUsYUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLGdCQUFnQixFQUEzQixDQUEyQixDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDakYsS0FBSyxDQUFDLFFBQVEsQ0FBQywyQ0FBeUIsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUM1RCxLQUFLLENBQUMsUUFBUSxDQUFDLDJDQUF5QixDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzNELEtBQUssQ0FBQyxRQUFRLENBQUMsMkNBQXlCLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNuRSxhQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFwQixDQUFvQixDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDM0UsYUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzFFLGFBQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksS0FBSyxnQkFBZ0IsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3RGLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDBEQUEwRCxFQUFFO1lBQzNELEtBQUssQ0FBQyxRQUFRLENBQUMsNkJBQVcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckUsSUFBSSxPQUFPLEdBQVk7Z0JBQ25CLFNBQVMsRUFBRSxlQUFlO2dCQUMxQixPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRTtnQkFDOUIsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsSUFBSSxFQUFFLHFCQUFxQjthQUM5QixDQUFDO1lBRUYsS0FBSyxDQUFDLFFBQVEsQ0FBQywyQ0FBeUIsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM5RCxLQUFLLENBQUMsUUFBUSxDQUFDLDJDQUF5QixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzdELEtBQUssQ0FBQyxRQUFRLENBQUMsMkNBQXlCLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDN0QsS0FBSyxDQUFDLFFBQVEsQ0FBQywyQ0FBeUIsQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLEtBQUssQ0FBQyxRQUFRLENBQUMsMkNBQXlCLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNyRSxLQUFLLENBQUMsUUFBUSxDQUFDLDJDQUF5QixDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFFckUsSUFBSSxlQUFlLEdBQWMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksS0FBSyxTQUFTLEVBQXBCLENBQW9CLENBQUMsQ0FBQyxRQUFRLENBQUM7WUFDckYsYUFBTSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2xELGFBQU0sQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNuRCxJQUFJLGNBQWMsR0FBYyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQztZQUNuRixhQUFNLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakQsYUFBTSxDQUFDLGVBQWUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMzRCxJQUFJLGFBQWEsR0FBYyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLGdCQUFnQixFQUEzQixDQUEyQixDQUFDLENBQUMsUUFBUSxDQUFDO1lBQzFGLGFBQU0sQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNoRCxhQUFNLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUN2RSxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQywwREFBMEQsRUFBRTtZQUMzRCxLQUFLLENBQUMsUUFBUSxDQUFDLDZCQUFXLENBQUMsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLElBQUksUUFBUSxHQUFjO2dCQUN0QixFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsMEJBQTBCLEVBQUUsV0FBVyxFQUFFLHFCQUFxQixFQUFFLEtBQUssRUFBRSwwQkFBMEIsRUFBRTtnQkFDMUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSwwQkFBMEIsRUFBRSxXQUFXLEVBQUUscUJBQXFCLEVBQUcsS0FBSyxFQUFFLDBCQUEwQixFQUFFO2dCQUNySSxFQUFFLE1BQU0sRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsMEJBQTBCLEVBQUUsV0FBVyxFQUFFLHFCQUFxQixFQUFFLEtBQUssRUFBRSwwQkFBMEIsRUFBRTthQUFDLENBQUM7WUFDcEosS0FBSyxDQUFDLFFBQVEsQ0FBQyw2Q0FBMkIsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNqRSxLQUFLLENBQUMsUUFBUSxDQUFDLDZDQUEyQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLEtBQUssQ0FBQyxRQUFRLENBQUMsNkNBQTJCLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDaEUsSUFBSSxZQUFZLEdBQUcsUUFBUSxFQUFFLENBQUM7WUFDOUIsYUFBTSxDQUFDLGVBQWUsQ0FDbEIsWUFBWTtpQkFDUCxJQUFJLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBcEIsQ0FBb0IsQ0FBQztpQkFDakMsUUFBUSxFQUNiLFFBQVEsQ0FBQyxDQUFDO1lBQ2QsYUFBTSxDQUFDLGVBQWUsQ0FDbEIsWUFBWTtpQkFDUCxJQUFJLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBbkIsQ0FBbUIsQ0FBQztpQkFDaEMsUUFBUSxFQUNiLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMvQixhQUFNLENBQUMsZUFBZSxDQUNsQixZQUFZO2lCQUNQLElBQUksQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxJQUFJLEtBQUssZ0JBQWdCLEVBQTNCLENBQTJCLENBQUM7aUJBQ3hDLFFBQVEsRUFDYixFQUFFLENBQUMsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLCtCQUErQixFQUFFO1lBQ2hDLEtBQUssQ0FBQyxRQUFRLENBQUMsNkJBQVcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckUsSUFBSSxRQUFRLEdBQWM7Z0JBQ3RCLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSwwQkFBMEIsRUFBRSxXQUFXLEVBQUUscUJBQXFCLEVBQUUsS0FBSyxFQUFFLDBCQUEwQixFQUFFO2dCQUMxSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLDBCQUEwQixFQUFFLFdBQVcsRUFBRSxxQkFBcUIsRUFBRSxLQUFLLEVBQUUsMEJBQTBCLEVBQUU7Z0JBQ3BJLEVBQUUsTUFBTSxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBRSwwQkFBMEIsRUFBRSxXQUFXLEVBQUUscUJBQXFCLEVBQUUsS0FBSyxFQUFFLDBCQUEwQixFQUFFO2FBQUMsQ0FBQztZQUNwSixLQUFLLENBQUMsUUFBUSxDQUFDLDZDQUEyQixDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLEtBQUssQ0FBQyxRQUFRLENBQUMsNkNBQTJCLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDaEUsS0FBSyxDQUFDLFFBQVEsQ0FBQyw2Q0FBMkIsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNoRSxLQUFLLENBQUMsUUFBUSxDQUFDLG1DQUFpQixFQUFFLENBQUMsQ0FBQztZQUNwQyxJQUFJLFlBQVksR0FBRyxRQUFRLEVBQUUsQ0FBQztZQUM5QixhQUFNLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0gsUUFBUSxDQUFDLHFCQUFxQixFQUFFO1FBQzVCLElBQUksS0FBbUIsQ0FBQztRQUN4QixJQUFJLGFBQTZDLENBQUM7UUFDbEQsVUFBVSxDQUFDO1lBQ1AsS0FBSyxHQUFHLFFBQVEsRUFBRSxDQUFDO1lBQ25CLGFBQWEsR0FBRyxjQUFNLE9BQUEsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLGFBQWEsRUFBOUIsQ0FBOEIsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQTtRQUNGLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRTtZQUNwQixhQUFNLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNuRCxLQUFLLENBQUMsUUFBUSxDQUFDLCtCQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUN2QyxhQUFNLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDL0QsS0FBSyxDQUFDLFFBQVEsQ0FBQywrQkFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDMUMsYUFBTSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUNwRixDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxxQ0FBcUMsRUFBRTtZQUN0QyxLQUFLLENBQUMsUUFBUSxDQUFDLCtCQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUN2QyxLQUFLLENBQUMsUUFBUSxDQUFDLCtCQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUMxQyxhQUFNLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ2hGLEtBQUssQ0FBQyxRQUFRLENBQUMsa0NBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLGFBQU0sQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUMvRCxLQUFLLENBQUMsUUFBUSxDQUFDLGtDQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUM5QixhQUFNLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxxQkFBcUIsRUFBRTtZQUN0QixLQUFLLENBQUMsUUFBUSxDQUFDLCtCQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUN2QyxLQUFLLENBQUMsUUFBUSxDQUFDLCtCQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUMxQyxLQUFLLENBQUMsUUFBUSxDQUFDLGtDQUFXLEVBQUUsQ0FBQyxDQUFDO1lBQzlCLGFBQU0sQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLGlCQUFpQixFQUFFO1lBQ2xCLGFBQU0sQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2xELEtBQUssQ0FBQyxRQUFRLENBQUMsOEJBQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLGFBQU0sQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUM3RCxLQUFLLENBQUMsUUFBUSxDQUFDLDhCQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUN4QyxhQUFNLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQ2pGLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLG1DQUFtQyxFQUFFO1lBQ3BDLEtBQUssQ0FBQyxRQUFRLENBQUMsOEJBQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLEtBQUssQ0FBQyxRQUFRLENBQUMsOEJBQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLEtBQUssQ0FBQyxRQUFRLENBQUMsaUNBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLGFBQU0sQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUM3RCxLQUFLLENBQUMsUUFBUSxDQUFDLGlDQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixhQUFNLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN0RCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxvQkFBb0IsRUFBRTtZQUNyQixLQUFLLENBQUMsUUFBUSxDQUFDLDhCQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNyQyxLQUFLLENBQUMsUUFBUSxDQUFDLDhCQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUN4QyxLQUFLLENBQUMsUUFBUSxDQUFDLGlDQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQzdCLGFBQU0sQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDSCxRQUFRLENBQUMsZUFBZSxFQUFFO1FBQ3RCLElBQUksS0FBbUIsQ0FBQztRQUN4QixJQUFJLE9BQWlDLENBQUM7UUFDdEMsVUFBVSxDQUFDO1lBQ1AsS0FBSyxHQUFHLFFBQVEsRUFBRSxDQUFDO1lBQ25CLE9BQU8sR0FBRyxjQUFNLE9BQUEsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sRUFBeEIsQ0FBd0IsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQTtRQUNGLEVBQUUsQ0FBQywwQkFBMEIsRUFBRTtZQUMzQixhQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLEtBQUssQ0FBQyxRQUFRLENBQUMsa0NBQWlCLEVBQUUsQ0FBQyxDQUFDO1lBQ3BDLGFBQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0IsS0FBSyxDQUFDLFFBQVEsQ0FBQyxrQ0FBaUIsRUFBRSxDQUFDLENBQUM7WUFDcEMsYUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixLQUFLLENBQUMsUUFBUSxDQUFDLGtDQUFpQixFQUFFLENBQUMsQ0FBQztZQUNwQyxhQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDSCxRQUFRLENBQUMsY0FBYyxFQUFFO1FBQ3JCLElBQUksS0FBbUIsQ0FBQztRQUN4QixJQUFJLE1BQStCLENBQUM7UUFDcEMsVUFBVSxDQUFDO1lBQ1AsS0FBSyxHQUFHLFFBQVEsRUFBRSxDQUFDO1lBQ25CLE1BQU0sR0FBRyxjQUFNLE9BQUEsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBdkIsQ0FBdUIsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQTtRQUNGLEVBQUUsQ0FBQyxxREFBcUQsRUFBRTtZQUN0RCxhQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUM3QixFQUFFLEVBQUUsSUFBSTtnQkFDUixTQUFTLEVBQUUsS0FBSztnQkFDaEIsbUJBQW1CLEVBQUUsRUFBRTthQUMxQixDQUFDLENBQUM7WUFDSCxJQUFJLFFBQVEsR0FBMEIsY0FBYyxFQUFFLENBQUM7WUFDdkQsS0FBSyxDQUFDLFFBQVEsQ0FBQyw2QkFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDeEMsYUFBTSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDN0IsRUFBRSxFQUFFLFFBQVE7Z0JBQ1osU0FBUyxFQUFFLEtBQUs7Z0JBQ2hCLG1CQUFtQixFQUFFLEVBQUU7YUFDMUIsQ0FBQyxDQUFDO1lBQ0gsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLG1DQUFtQyxFQUFFO1lBQ3BDLEtBQUssQ0FBQyxRQUFRLENBQUMsa0NBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN6QyxhQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUM3QixFQUFFLEVBQUUsSUFBSTtnQkFDUixTQUFTLEVBQUUsSUFBSTtnQkFDZixtQkFBbUIsRUFBRSxFQUFFO2FBQzFCLENBQUMsQ0FBQztZQUNILEtBQUssQ0FBQyxRQUFRLENBQUMsa0NBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMxQyxhQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUM3QixFQUFFLEVBQUUsSUFBSTtnQkFDUixTQUFTLEVBQUUsS0FBSztnQkFDaEIsbUJBQW1CLEVBQUUsRUFBRTthQUMxQixDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxtQ0FBbUMsRUFBRTtZQUNwQyxJQUFJLE1BQU0sR0FBYSxDQUFDLGVBQWUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzNELEtBQUssQ0FBQyxRQUFRLENBQUMsdUNBQXVCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNoRCxhQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUM3QixFQUFFLEVBQUUsSUFBSTtnQkFDUixTQUFTLEVBQUUsS0FBSztnQkFDaEIsbUJBQW1CLEVBQUUsTUFBTTthQUM5QixDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0gsUUFBUSxDQUFDLGtCQUFrQixFQUFFO1FBQ3pCLElBQUksS0FBbUIsQ0FBQztRQUN4QixJQUFJLFNBQXFDLENBQUM7UUFDMUMsVUFBVSxDQUFDO1lBQ1AsS0FBSyxHQUFHLFFBQVEsRUFBRSxDQUFDO1lBQ25CLFNBQVMsR0FBRyxjQUFNLE9BQUEsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLFNBQVMsRUFBMUIsQ0FBMEIsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FBQTtRQUNGLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRTtZQUN0QixJQUFJLEtBQUssR0FBbUI7Z0JBQ3hCLGVBQWUsRUFBRTtvQkFDYixJQUFJLEVBQUUsTUFBTTtvQkFDWixJQUFJLEVBQUUsV0FBVztpQkFDcEI7Z0JBQ0QsZ0JBQWdCLEVBQUU7b0JBQ2QsSUFBSSxFQUFFLE9BQU87b0JBQ2IsSUFBSSxFQUFFLGNBQWM7aUJBQ3ZCO2dCQUNELGdCQUFnQixFQUFFO29CQUNkLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUksRUFBRSxXQUFXO2lCQUNwQjthQUNKLENBQUE7WUFDRCxLQUFLLENBQUMsUUFBUSxDQUFDLDhCQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNuQyxhQUFNLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZW52LmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvY29udHJvbGxlcnMvYXV0aENvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9jb250cm9sbGVycy9jaGFubmVsQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2NvbnRyb2xsZXJzL21lc3NhZ2VDb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvY29udHJvbGxlcnMvdXNlckNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9taWRkbGV3YXJlL2FkbWluLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbWlkZGxld2FyZS9hdXRob3JpemVkLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbW9kZWxzL0NoYW5uZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9tb2RlbHMvTWVzc2FnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21vZGVscy9Vc2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvcm91dGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvc2VydmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvc29ja2V0LmlvL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy93ZWIvYWN0aW9ucy9jaGFubmVsc0FjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9hY3Rpb25zL2NoYXRVc2Vyc0FjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9hY3Rpb25zL25vdGlmaWNhdGlvbnNBY3Rpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy93ZWIvYWN0aW9ucy9zaWRlYmFyQWN0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL2FjdGlvbnMvc29ja2V0QWN0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL2FjdGlvbnMvdXNlckFjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9yZWR1Y2Vycy9jaGFubmVscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL3JlZHVjZXJzL2NoYXRVc2Vycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL3JlZHVjZXJzL25vdGlmaWNhdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9yZWR1Y2Vycy9zaWRlYmFyLnRzIiwid2VicGFjazovLy8uL3NyYy93ZWIvcmVkdWNlcnMvc29ja2V0LnRzIiwid2VicGFjazovLy8uL3NyYy93ZWIvcmVkdWNlcnMvdXNlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL3N0b3JlLnRzIiwid2VicGFjazovLy8uL3Rlc3RzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3Rlc3RzL3NlcnZlci90ZXN0QXV0aENvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vdGVzdHMvc2VydmVyL3Rlc3RDaGFubmVsQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi90ZXN0cy9zZXJ2ZXIvdGVzdE1lc3NhZ2VDb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3Rlc3RzL3NlcnZlci90ZXN0VXNlckNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vdGVzdHMvd2ViL3Rlc3RBc3luY0FjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vdGVzdHMvd2ViL3Rlc3RTdG9yZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImF4aW9zLW1vY2stYWRhcHRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJjcnlwdGpzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjaGFpXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29tcHJlc3Npb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb25uZWN0LW1vbmdvXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29va2llLXBhcnNlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNzdXJmXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3Mtc2Vzc2lvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImhlbG1ldFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqc29ud2VidG9rZW5cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb2NoYVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbmdvb3NlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibXVzdGFjaGUtZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LWxvZ2dlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LW1vY2stc3RvcmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eC10aHVua1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvY2tldC5pb1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvY2tldC5pby1jbGllbnRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzdXBlcnRlc3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzdXBlcnRlc3Qtc2Vzc2lvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInZhbGlkYXRvclwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FB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QkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMLENBQUM7QUFDRCwyQ0FBMkMsK2lvQjs7Ozs7Ozs7Ozs7QUNsVzNDLGtDOzs7Ozs7Ozs7OztBQ0FBLCtDOzs7Ozs7Ozs7OztBQ0FBLHFDOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLDBDOzs7Ozs7Ozs7OztBQ0FBLDBDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLDRDOzs7Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLHFDOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLHNDOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLHNDOzs7Ozs7Ozs7OztBQ0FBLDhDOzs7Ozs7Ozs7OztBQ0FBLHNDIiwiZmlsZSI6ImFsbC10ZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vdGVzdHMvaW5kZXgudHNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAvLyBodHRwczovL2RvY3MubW9uZ29kYi5jb20vbWFudWFsL3JlZmVyZW5jZS9jb25uZWN0aW9uLXN0cmluZy9cbiAgICBtb25nb2RiQ29ubmVjdGlvblVyaTogcHJvY2Vzcy5lbnYuTU9OR09EQl9VUkksXG4gICAgbW9uZ29kYlRlc3RDb25uZWN0aW9uVXJpOiBwcm9jZXNzLmVudi5NT05HT0RCX1RFU1RfVVJJIHx8XG5cdFx0XHQgICAgICAnbW9uZ29kYjovL2xvY2FsaG9zdDoyNzAxNy9vcGVuQ2hhdFRlc3QnLFxuICAgIHBvcnQ6IHByb2Nlc3MuZW52LlBPUlQgfHwgNTAwMCxcbiAgICBwcm9kdWN0aW9uOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nIHx8IGZhbHNlLFxuICAgIHVzZVRlc3REYjogcHJvY2Vzcy5lbnYuVVNFX1RFU1RfREIgfHwgZmFsc2UsXG4gICAgc2VjcmV0OiBwcm9jZXNzLmVudi5TRUNSRVQgfHwgJ3NlY3JldCcsXG4gICAgZGlzYWJsZUNzcmY6IHByb2Nlc3MuZW52LkRJU0FCTEVfQ1NSRiB8fCBmYWxzZSxcbiAgICBkaXNhYmxlUmVkdXhMb2dnaW5nOiBwcm9jZXNzLmVudi5ESVNBQkxFX1JFRFVYX0xPR0dJTkcgfHwgZmFsc2UsXG4gICAgZGlzYWJsZUF1dG9TdGFydDogcHJvY2Vzcy5lbnYuRElTQUJMRV9BVVRPX1NUQVJUIHx8IGZhbHNlLFxuICAgIG1haWxndW5BcGlLZXk6IHByb2Nlc3MuZW52Lk1BSUxHVU5fQVBJX0tFWSxcbiAgICBtYWlsZ3VuRG9tYWluOiBwcm9jZXNzLmVudi5NQUlMR1VOX0RPTUFJTixcbiAgICBiYXNlVXJsOiBwcm9jZXNzLmVudi5CQVNFX1VSTCA/IHByb2Nlc3MuZW52LkJBU0VfVVJMIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMCdcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciB2YWxpZGF0b3JfMSA9IHJlcXVpcmUoXCJ2YWxpZGF0b3JcIik7XG52YXIgYmNyeXB0anNfMSA9IHJlcXVpcmUoXCJiY3J5cHRqc1wiKTtcbnZhciBVc2VyXzEgPSByZXF1aXJlKFwiLi4vbW9kZWxzL1VzZXJcIik7XG52YXIgZW52ID0gcmVxdWlyZSgnLi4vLi4vLi4vZW52Jyk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHtcbiAgICBsb2dpbjogZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgICAgIGlmICh2YWxpZGF0b3JfMS5pc0VtcHR5KHJlcS5ib2R5LmVtYWlsIHx8ICcnKSB8fCB2YWxpZGF0b3JfMS5pc0VtcHR5KHJlcS5ib2R5LnBhc3N3b3JkIHx8ICcnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdQbGVhc2Ugc3VwcGx5IGFuIGVtYWlsIGFuZCBwYXNzd29yZCcgfSkuZW5kKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF2YWxpZGF0b3JfMS5pc0VtYWlsKHJlcS5ib2R5LmVtYWlsKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdOb3QgYSB2YWxpZCBlbWFpbCBhZGRyZXNzJyB9KS5lbmQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXEuYXV0aGVudGljYXRlKHJlcS5ib2R5LmVtYWlsLCByZXEuYm9keS5wYXNzd29yZCwgZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgICAgIGlmICghdXNlcilcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oeyBlcnJvcjogJ0ludmFsaWQgZW1haWwgb3IgcGFzc3dvcmQnIH0pLmVuZCgpO1xuICAgICAgICAgICAgcmVxLmlzc3VlTmV3VG9rZW4odXNlcik7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApXG4gICAgICAgICAgICAgICAgLmpzb24oe1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgICAgICAgcm9sZTogdXNlci5yb2xlLFxuICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZVxuICAgICAgICAgICAgfSkuZW5kKCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVnaXN0ZXI6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICBpZiAodmFsaWRhdG9yXzEuaXNFbXB0eShyZXEuYm9keS5lbWFpbCB8fCAnJykgfHwgdmFsaWRhdG9yXzEuaXNFbXB0eShyZXEuYm9keS5wYXNzd29yZCB8fCAnJykpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnUGxlYXNlIHN1cHBseSBhbiBlbWFpbCBhbmQgcGFzc3dvcmQnIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdmFsaWRhdG9yXzEuaXNFbWFpbChyZXEuYm9keS5lbWFpbCkpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnTm90IGEgdmFsaWQgZW1haWwgYWRkcmVzcycgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFVzZXJfMVtcImRlZmF1bHRcIl0uZmluZEJ5RW1haWwocmVxLmJvZHkuZW1haWwpLmNvdW50RG9jdW1lbnRzKCkuZXhlYygpLnRoZW4oZnVuY3Rpb24gKGNvdW50KSB7XG4gICAgICAgICAgICBpZiAoY291bnQgIT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdFbWFpbCBhZGRyZXNzIGluIHVzZScgfSk7XG4gICAgICAgICAgICB2YXIgcGFzc3dvcmRIYXNoID0gYmNyeXB0anNfMS5oYXNoU3luYyhyZXEuYm9keS5wYXNzd29yZCk7XG4gICAgICAgICAgICBVc2VyXzFbXCJkZWZhdWx0XCJdLmNvdW50RG9jdW1lbnRzKCkuZXhlYygpLnRoZW4oZnVuY3Rpb24gKGNvdW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIHJvbGUgPSAndXNlcic7XG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ID09PSAwKVxuICAgICAgICAgICAgICAgICAgICByb2xlID0gJ2FkbWluJztcbiAgICAgICAgICAgICAgICB2YXIgdXNlciA9IG5ldyBVc2VyXzFbXCJkZWZhdWx0XCJdKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiByZXEuYm9keS5lbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkSGFzaCxcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogcm9sZSxcbiAgICAgICAgICAgICAgICAgICAgZW1haWxWZXJpZmllZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdXNlci5zYXZlKCkudGhlbihmdW5jdGlvbiAodSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcgdHJ5aW5nIHRvIGNyZWF0ZSBhIG5ldyB1c2VyJyB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGxvZ291dDogZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgICAgIHJlcS5sb2dvdXQoKTtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbWVzc2FnZTogJ2xvZ2dlZCBvdXQnIH0pO1xuICAgIH0sXG4gICAgdmVyaWZ5RW1haWw6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgIH1cbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lZWFYwYUVOdmJuUnliMnhzWlhJdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOHVMaTh1TGk5emNtTXZjMlZ5ZG1WeUwyTnZiblJ5YjJ4c1pYSnpMMkYxZEdoRGIyNTBjbTlzYkdWeUxuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCUVVFc2RVTkJRVFpETzBGQlF6ZERMSEZEUVVGdlF6dEJRVVZ3UXl4MVEwRkJOa003UVVGRE4wTXNTVUZCVFN4SFFVRkhMRWRCUVVjc1QwRkJUeXhEUVVGRExHTkJRV01zUTBGQlF5eERRVUZETzBGQlJYQkRMSEZDUVVGbE8wbEJRMWdzUzBGQlN5eEZRVUZGTEZWQlFVTXNSMEZCV1N4RlFVRkZMRWRCUVdFN1VVRkRMMElzU1VGQlNTeHRRa0ZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eEpRVUZKTEVWQlFVVXNRMEZCUXl4SlFVRkpMRzFDUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4UlFVRlJMRWxCUVVrc1JVRkJSU3hEUVVGRExFVkJRVVU3V1VGRGJrVXNUMEZCVHl4SFFVRkhMRU5CUVVNc1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkZMRXRCUVVzc1JVRkJSU3h4UTBGQmNVTXNSVUZCUlN4RFFVRkRMRU5CUVVNc1IwRkJSeXhGUVVGRkxFTkJRVU03VTBGRGRrWTdVVUZEUkN4SlFVRkpMRU5CUVVNc2JVSkJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhGUVVGRk8xbEJRekZDTEU5QlFVOHNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4TFFVRkxMRVZCUVVVc01rSkJRVEpDTEVWQlFVVXNRMEZCUXl4RFFVRkRMRWRCUVVjc1JVRkJSU3hEUVVGRE8xTkJRemRGTzFGQlEwUXNSMEZCUnl4RFFVRkRMRmxCUVZrc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NSVUZCUlN4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExGRkJRVkVzUlVGQlJTeFZRVUZETEVsQlFXMUNPMWxCUTNCRkxFbEJRVWtzUTBGQlF5eEpRVUZKTzJkQ1FVTk1MRTlCUVU4c1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSU3hMUVVGTExFVkJRVVVzTWtKQlFUSkNMRVZCUVVVc1EwRkJReXhEUVVGRExFZEJRVWNzUlVGQlJTeERRVUZETzFsQlF6bEZMRWRCUVVjc1EwRkJReXhoUVVGaExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdXVUZEZUVJc1QwRkJUeXhIUVVGSExFTkJRVU1zVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXp0cFFrRkRha0lzU1VGQlNTeERRVUZETzJkQ1FVTkdMRTlCUVU4c1JVRkJSU3hKUVVGSk8yZENRVU5pTEV0QlFVc3NSVUZCUlN4SlFVRkpMRU5CUVVNc1MwRkJTenRuUWtGRGFrSXNTVUZCU1N4RlFVRkZMRWxCUVVrc1EwRkJReXhKUVVGSk8yZENRVU5tTEVsQlFVa3NSVUZCUlN4SlFVRkpMRU5CUVVNc1NVRkJTVHRoUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEVWQlFVVXNRMEZCUXp0UlFVTndReXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTTdTVUZEUkN4UlFVRlJMRVZCUVVVc1ZVRkJReXhIUVVGWkxFVkJRVVVzUjBGQllUdFJRVU5zUXl4SlFVRkpMRzFDUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRWxCUVVrc1JVRkJSU3hEUVVGRExFbEJRVWtzYlVKQlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExGRkJRVkVzU1VGQlNTeEZRVUZGTEVOQlFVTXNSVUZCUlR0WlFVTnVSU3hQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVVVzUzBGQlN5eEZRVUZGTEhGRFFVRnhReXhGUVVGRkxFTkJRVU1zUTBGQlF6dFRRVU5xUmp0UlFVTkVMRWxCUVVrc1EwRkJReXh0UWtGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFVkJRVVU3V1VGRE1VSXNUMEZCVHl4SFFVRkhMRU5CUVVNc1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkZMRXRCUVVzc1JVRkJSU3d5UWtGQk1rSXNSVUZCUlN4RFFVRkRMRU5CUVVNN1UwRkRka1U3VVVGRFJDeFBRVUZQTEdsQ1FVRkpMRU5CUVVNc1YwRkJWeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1kwRkJZeXhGUVVGRkxFTkJRVU1zU1VGQlNTeEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVVNc1MwRkJZVHRaUVVNdlJTeEpRVUZKTEV0QlFVc3NTMEZCU3l4RFFVRkRPMmRDUVVOWUxFOUJRVThzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlF5eExRVUZMTEVWQlFVVXNjMEpCUVhOQ0xFVkJRVU1zUTBGQlF5eERRVUZETzFsQlEycEZMRWxCUVVrc1dVRkJXU3hIUVVGSExHMUNRVUZSTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF6dFpRVVV2UXl4cFFrRkJTU3hEUVVGRExHTkJRV01zUlVGQlJTeERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGRExFdEJRV0U3WjBKQlF6VkRMRWxCUVVrc1NVRkJTU3hIUVVGSExFMUJRVTBzUTBGQlF6dG5Ra0ZEYkVJc1NVRkJTU3hMUVVGTExFdEJRVXNzUTBGQlF6dHZRa0ZEV0N4SlFVRkpMRWRCUVVjc1QwRkJUeXhEUVVGRE8yZENRVU51UWl4SlFVRkpMRWxCUVVrc1IwRkJSeXhKUVVGSkxHbENRVUZKTEVOQlFVTTdiMEpCUTJoQ0xFbEJRVWtzUlVGQlJTeEZRVUZGTzI5Q1FVTlNMRXRCUVVzc1JVRkJSU3hIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVczdiMEpCUTNKQ0xGRkJRVkVzUlVGQlJTeFpRVUZaTzI5Q1FVTjBRaXhKUVVGSkxFVkJRVVVzU1VGQlNUdHZRa0ZEVml4aFFVRmhMRVZCUVVVc1MwRkJTenRwUWtGRGRrSXNRMEZCUXl4RFFVRkRPMmRDUVVOSUxFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJReXhEUVVGUk8yOUNRVU4wUWl4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVNc1QwRkJUeXhGUVVGRkxFbEJRVWtzUlVGQlF5eERRVUZETEVOQlFVTTdaMEpCUTJwRUxFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVc3NRMEZCUVN4RFFVRkRMRlZCUVVNc1IwRkJWVHR2UWtGRGFFSXNUMEZCVHl4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dHZRa0ZEYmtJc1QwRkJUeXhIUVVGSExFTkJRVU1zVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRExFdEJRVXNzUlVGQlJTeHJSRUZCYTBRc1JVRkJReXhEUVVGRExFTkJRVU03WjBKQlF6ZEdMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMUFzUTBGQlF5eERRVUZETEVOQlFVRTdVVUZEVGl4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVWUUxFTkJRVU03U1VGRFJDeE5RVUZOTEVWQlFVVXNWVUZCUXl4SFFVRlpMRVZCUVVVc1IwRkJZVHRSUVVOb1F5eEhRVUZITEVOQlFVTXNUVUZCVFN4RlFVRkZMRU5CUVVNN1VVRkRZaXhQUVVGUExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUXl4UFFVRlBMRVZCUVVVc1NVRkJTU3hGUVVGRkxFOUJRVThzUlVGQlJTeFpRVUZaTEVWQlFVTXNRMEZCUXl4RFFVRkRPMGxCUXpWRUxFTkJRVU03U1VGRFJDeFhRVUZYTEVWQlFVVXNWVUZCUXl4SFFVRlpMRVZCUVVVc1IwRkJZVHRKUVVONlF5eERRVUZETzBOQlEwb3NRMEZCUVNKOSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBDaGFubmVsXzEgPSByZXF1aXJlKFwiLi4vbW9kZWxzL0NoYW5uZWxcIik7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHtcbiAgICBjaGFubmVsczogZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgICAgIHJldHVybiBDaGFubmVsXzFbXCJkZWZhdWx0XCJdLmNvdW50RG9jdW1lbnRzKCkuZXhlYygpLnRoZW4oZnVuY3Rpb24gKGNvdW50KSB7XG4gICAgICAgICAgICB2YXIgcCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgQ2hhbm5lbF8xW1wiZGVmYXVsdFwiXS5jcmVhdGUoW3sgbmFtZTogJ2dlbmVyYWwnIH0sIHsgbmFtZTogJ3JhbmRvbScgfV0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBwLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIENoYW5uZWxfMVtcImRlZmF1bHRcIl0uZmluZCgpLmV4ZWMoKS50aGVuKGZ1bmN0aW9uIChjaGFubmVscykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBjaGFubmVsczogY2hhbm5lbHMgfSk7XG4gICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIGZldGNoIGNoYW5uZWxzJyB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBjcmVhdGUgZGVmYXVsdCBjaGFubmVscycgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIGNvdW50aW5nIGNoYW5uZWxzJyB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBcImRlbGV0ZVwiOiBmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICB9LFxuICAgIGNyZWF0ZTogZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgfVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVkyaGhibTVsYkVOdmJuUnliMnhzWlhJdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOHVMaTh1TGk5emNtTXZjMlZ5ZG1WeUwyTnZiblJ5YjJ4c1pYSnpMMk5vWVc1dVpXeERiMjUwY205c2JHVnlMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3TzBGQlEwRXNOa05CUVc5RU8wRkJSWEJFTEhGQ1FVRmxPMGxCUTFnc1VVRkJVU3hGUVVGRkxGVkJRVU1zUjBGQldTeEZRVUZGTEVkQlFXRTdVVUZGYkVNc1QwRkJUeXh2UWtGQlR5eERRVUZETEdOQlFXTXNSVUZCUlN4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZETEV0QlFXRTdXVUZEZEVRc1NVRkJTU3hEUVVGRExFZEJRVWNzU1VGQlNTeFBRVUZQTEVOQlFVTXNWVUZCUXl4UFFVRlBMRVZCUVVVc1RVRkJUVHRuUWtGRGFFTXNTVUZCU1N4TFFVRkxMRXRCUVVzc1EwRkJReXhGUVVGRk8yOUNRVU5pTEU5QlFVOHNUMEZCVHl4RlFVRkZMRU5CUVVNN2FVSkJRM0JDTzJkQ1FVTkVMRzlDUVVGUExFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTXNSVUZCUXl4SlFVRkpMRVZCUVVVc1UwRkJVeXhGUVVGRExFVkJRVVVzUlVGQlF5eEpRVUZKTEVWQlFVVXNVVUZCVVN4RlFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF6dHZRa0ZEZGtRc1QwRkJUeXhQUVVGUExFVkJRVVVzUTBGQlF6dG5Ra0ZEY2tJc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlN5eERRVUZCTEVOQlFVTXNWVUZCUXl4SFFVRlZPMjlDUVVOb1FpeFBRVUZQTEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRuUWtGRGRrSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU5JTEU5QlFVOHNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJRenRuUWtGRFZpeHZRa0ZCVHl4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRkRMRkZCUVc5Q08yOUNRVU0xUXl4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVNc1VVRkJVU3hGUVVGRkxGRkJRVkVzUlVGQlF5eERRVUZETEVOQlFVTTdaMEpCUTNSRUxFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVc3NRMEZCUVN4RFFVRkRMRlZCUVVNc1IwRkJWVHR2UWtGRGFFSXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dHZRa0ZEYWtJc1QwRkJUeXhIUVVGSExFTkJRVU1zVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRkxFdEJRVXNzUlVGQlJTeHhSRUZCY1VRc1JVRkJSU3hEUVVGRExFTkJRVU03WjBKQlEyeEhMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMUFzUTBGQlF5eERRVUZETEVOQlFVTXNUMEZCU3l4RFFVRkJMRU5CUVVNc1ZVRkJReXhIUVVGVk8yZENRVU5vUWl4UFFVRlBMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzJkQ1FVTnVRaXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVU1zUzBGQlN5eEZRVUZGTERoRVFVRTRSQ3hGUVVGRExFTkJRVU1zUTBGQlF6dFpRVU42Unl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOUUxFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVc3NRMEZCUVN4RFFVRkRMRlZCUVVNc1IwRkJWVHRaUVVOb1FpeFBRVUZQTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8xbEJRMjVDTEU5QlFVOHNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUXl4TFFVRkxMRVZCUVVVc09FTkJRVGhETEVWQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTNwR0xFTkJRVU1zUTBGQlF5eERRVUZETzBsQlExQXNRMEZCUXp0SlFVTkVMRkZCUVUwc1JVRkJSU3hWUVVGRExFZEJRVmtzUlVGQlJTeEhRVUZoTzBsQlJYQkRMRU5CUVVNN1NVRkRSQ3hOUVVGTkxFVkJRVVVzVlVGQlF5eEhRVUZaTEVWQlFVVXNSMEZCWVR0SlFVVndReXhEUVVGRE8wTkJRMG9zUTBGQlFTSjkiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgTWVzc2FnZV8xID0gcmVxdWlyZShcIi4uL21vZGVscy9NZXNzYWdlXCIpO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB7XG4gICAgbWVzc2FnZXM6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICByZXR1cm4gTWVzc2FnZV8xW1wiZGVmYXVsdFwiXS5maW5kKHsgY2hhbm5lbDogcmVxLnBhcmFtcy5jaGFubmVsIH0pXG4gICAgICAgICAgICAuc2tpcChwYXJzZUludChyZXEucGFyYW1zLm9mZmVzdCkpXG4gICAgICAgICAgICAuc29ydCh7IF9pZDogLTEgfSlcbiAgICAgICAgICAgIC5saW1pdCgyMClcbiAgICAgICAgICAgIC5leGVjKCkudGhlbihmdW5jdGlvbiAobWVzc2FnZXMpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6IG1lc3NhZ2VzLm1hcChmdW5jdGlvbiAobSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogbS50ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZDogbS5jcmVhdGVkQXQsXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyRW1haWw6IG0udXNlckVtYWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbDogbS5jaGFubmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgX2lkOiBtLl9pZFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pLnJldmVyc2UoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdzb21ldGhpbmcgd2VudCB3cm9uZyB0cnlpbmcgdG8gZmV0Y2ggbWVzc2FnZXMnIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYldWemMyRm5aVU52Ym5SeWIyeHNaWEl1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk4dUxpOHVMaTl6Y21NdmMyVnlkbVZ5TDJOdmJuUnliMnhzWlhKekwyMWxjM05oWjJWRGIyNTBjbTlzYkdWeUxuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCUTBFc05rTkJRVzlFTzBGQlEzQkVMSEZDUVVGbE8wbEJRMWdzVVVGQlVTeEZRVUZGTEZWQlFVTXNSMEZCV1N4RlFVRkZMRWRCUVdFN1VVRkRiRU1zVDBGQlR5eHZRa0ZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRExFOUJRVThzUlVGQlJTeEhRVUZITEVOQlFVTXNUVUZCVFN4RFFVRkRMRTlCUVU4c1JVRkJReXhEUVVGRE8yRkJRemRETEVsQlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVNc1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXp0aFFVTnFReXhKUVVGSkxFTkJRVU1zUlVGQlF5eEhRVUZITEVWQlFVVXNRMEZCUXl4RFFVRkRMRVZCUVVNc1EwRkJRenRoUVVObUxFdEJRVXNzUTBGQlF5eEZRVUZGTEVOQlFVTTdZVUZEVkN4SlFVRkpMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlF5eFJRVUZ2UWp0WlFVTTVRaXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRE8yZENRVU4yUWl4UlFVRlJMRVZCUVVVc1VVRkJVU3hEUVVGRExFZEJRVWNzUTBGQlF5eFZRVUZETEVOQlFWYzdiMEpCUTJoRExFOUJRVTg3ZDBKQlEwZ3NTVUZCU1N4RlFVRkZMRU5CUVVNc1EwRkJReXhKUVVGSk8zZENRVU5hTEU5QlFVOHNSVUZCUlN4RFFVRkRMRU5CUVVNc1UwRkJVenQzUWtGRGNFSXNVMEZCVXl4RlFVRkZMRU5CUVVNc1EwRkJReXhUUVVGVE8zZENRVU4wUWl4UFFVRlBMRVZCUVVVc1EwRkJReXhEUVVGRExFOUJRVTg3ZDBKQlEyeENMRWRCUVVjc1JVRkJSU3hEUVVGRExFTkJRVU1zUjBGQlJ6dHhRa0ZEWWl4RFFVRkRPMmRDUVVOTUxFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVOHNSVUZCUlR0aFFVTm1MRU5CUVVNc1EwRkJRVHRSUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVc3NRMEZCUVN4RFFVRkRMRlZCUVVNc1IwRkJWVHRaUVVOb1FpeFBRVUZQTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVVXNTMEZCU3l4RlFVRkZMQ3REUVVFclF5eEZRVUZGTEVOQlFVTXNRMEZCUXp0UlFVTTFSaXhEUVVGRExFTkJRVU1zUTBGQlFUdEpRVU5PTEVOQlFVTTdRMEZEU2l4RFFVRkJJbjA9IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIHZhbGlkYXRvcl8xID0gcmVxdWlyZShcInZhbGlkYXRvclwiKTtcbnZhciBVc2VyXzEgPSByZXF1aXJlKFwiLi4vbW9kZWxzL1VzZXJcIik7XG52YXIgYmNyeXB0anNfMSA9IHJlcXVpcmUoXCJiY3J5cHRqc1wiKTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0ge1xuICAgIHVzZXI6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICByZXMuc2VuZChyZXEudXNlcik7XG4gICAgfSxcbiAgICB1c2VyczogZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgICAgIHJldHVybiBVc2VyXzFbXCJkZWZhdWx0XCJdLmZpbmQoe30pLnNlbGVjdCgnbmFtZSBlbWFpbCByb2xlIGRlbGV0ZWQnKS50aGVuKGZ1bmN0aW9uICh1c2Vycykge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgdXNlcnM6IHVzZXJzIH0pO1xuICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgcmV0cmlldmluZyB1c2VycycgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgdXNlckJ5RW1haWw6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICBpZiAoIXZhbGlkYXRvcl8xLmlzRW1haWwocmVxLnBhcmFtcy51c2VyKSlcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnUGxlYXNlIHN1cHBseSBhIHZhbGlkIGVtYWlsJyB9KTtcbiAgICAgICAgcmV0dXJuIFVzZXJfMVtcImRlZmF1bHRcIl0uZmluZEJ5RW1haWwocmVxLnBhcmFtcy51c2VyKS5leGVjKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICAgICAgaWYgKHVzZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9pZDogdXNlci5faWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUgfHwgJycsXG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkOiB1c2VyLmNyZWF0ZWRBdFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ05vIHVzZXIgZm91bmQgd2l0aCB0aGF0IGVtYWlsJyB9KTtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nIHRyeWluZyB0byBmaW5kIHRoZSB1c2VyJyB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICB1cGRhdGVFbWFpbDogZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgICAgIGlmICghdmFsaWRhdG9yXzEuaXNFbWFpbChyZXEuYm9keS5lbWFpbCkpXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ05vdCBhIHZhbGlkIGVtYWlsJyB9KTtcbiAgICAgICAgcmV0dXJuIFVzZXJfMVtcImRlZmF1bHRcIl0uY291bnREb2N1bWVudHMoeyBlbWFpbDogcmVxLmJvZHkuZW1haWwgfSkuZXhlYygpLnRoZW4oZnVuY3Rpb24gKGNvdW50KSB7XG4gICAgICAgICAgICBpZiAoY291bnQgIT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdFbWFpbCBhZGRyZXNzIGFscmVhZHkgaW4gdXNlJyB9KTtcbiAgICAgICAgICAgIHJldHVybiBVc2VyXzFbXCJkZWZhdWx0XCJdLmZpbmRCeUVtYWlsKHJlcS51c2VyLmVtYWlsKS5leGVjKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICAgICAgICAgIHVzZXIuZW1haWwgPSByZXEuYm9keS5lbWFpbDtcbiAgICAgICAgICAgICAgICB1c2VyLnNhdmUoKTtcbiAgICAgICAgICAgICAgICByZXEuaXNzdWVOZXdUb2tlbihPYmplY3QuYXNzaWduKHt9LCByZXEudXNlciwgeyBlbWFpbDogcmVxLmJvZHkuZW1haWwgfSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZyB0cnlpbmcgdG8gZmV0Y2ggdGhlIHVzZXInIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgdXBkYXRlTmFtZTogZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgICAgIHJldHVybiBVc2VyXzFbXCJkZWZhdWx0XCJdLmZpbmRCeUVtYWlsKHJlcS51c2VyLmVtYWlsKVxuICAgICAgICAgICAgLmV4ZWMoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgICAgICB1c2VyLm5hbWUgPSByZXEuYm9keS5uYW1lO1xuICAgICAgICAgICAgdXNlci5zYXZlKCk7XG4gICAgICAgICAgICByZXEuaXNzdWVOZXdUb2tlbihPYmplY3QuYXNzaWduKHt9LCByZXEudXNlciwgeyBuYW1lOiByZXEuYm9keS5uYW1lIH0pKTtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZyB0cnlpbmcgdG8gdXBkYXRlIHRoZSB1c2VyJyB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICB1cGRhdGVQYXNzd29yZDogZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgICAgIGlmICh2YWxpZGF0b3JfMS5pc0VtcHR5KHJlcS5ib2R5Lm5ld1Bhc3MpIHx8IHZhbGlkYXRvcl8xLmlzRW1wdHkocmVxLmJvZHkub2xkUGFzcykpXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ011c3Qgc3VwcGx5IHRoZSBjdXJyZW50IGFuZCBuZXcgcGFzc3dvcmQnIH0pO1xuICAgICAgICByZXR1cm4gVXNlcl8xW1wiZGVmYXVsdFwiXS5maW5kQnlFbWFpbChyZXEudXNlci5lbWFpbCkuZXhlYygpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgICAgIGlmICghYmNyeXB0anNfMS5jb21wYXJlU3luYyhyZXEuYm9keS5vbGRQYXNzLCB1c2VyLnBhc3N3b3JkKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ0N1cnJlbnQgcGFzc3dvcmQgaXMgaW5jb3JyZWN0JyB9KTtcbiAgICAgICAgICAgIHVzZXIucGFzc3dvcmQgPSBiY3J5cHRqc18xLmhhc2hTeW5jKHJlcS5ib2R5Lm5ld1Bhc3MpO1xuICAgICAgICAgICAgdXNlci5zYXZlKCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHJlc2V0UGFzc3dvcmQ6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ05vdCBpbXBsZW1lbnRlZCcgfSk7XG4gICAgfSxcbiAgICBjcmVhdGVVc2VyOiBmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICAgICAgaWYgKHZhbGlkYXRvcl8xLmlzRW1wdHkocmVxLmJvZHkuZW1haWwpIHx8ICF2YWxpZGF0b3JfMS5pc0VtYWlsKHJlcS5ib2R5LmVtYWlsKSB8fFxuICAgICAgICAgICAgdmFsaWRhdG9yXzEuaXNFbXB0eShyZXEuYm9keS5yb2xlKSB8fCAocmVxLmJvZHkucm9sZSAhPT0gJ3VzZXInICYmIHJlcS5ib2R5LnJvbGUgIT09ICdhZG1pbicpKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdNdXN0IHN1cHBseSB2YWxpZCBlbWFpbCBhbmQgcm9sZScgfSk7XG4gICAgICAgIHJldHVybiBVc2VyXzFbXCJkZWZhdWx0XCJdLmZpbmRCeUVtYWlsKHJlcS5ib2R5LmVtYWlsKS5jb3VudERvY3VtZW50cyhmdW5jdGlvbiAoZXJyLCBjKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignU29tZXRoaW5nIHdlbnQgd3JvbmcgdHJ5aW5nIHRvIGNvdW50IHVzZXJzIHdpdGggZW1haWwgJyArIHJlcS5ib2R5LmVtYWlsLCBlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGMgIT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdFbWFpbCBhZGRyZXNzIGluIHVzZScgfSk7XG4gICAgICAgICAgICB2YXIgdSA9IG5ldyBVc2VyXzFbXCJkZWZhdWx0XCJdKHtcbiAgICAgICAgICAgICAgICBlbWFpbDogcmVxLmJvZHkuZW1haWwsXG4gICAgICAgICAgICAgICAgbmFtZTogcmVxLmJvZHkubmFtZSB8fCAnJyxcbiAgICAgICAgICAgICAgICByb2xlOiByZXEuYm9keS5yb2xlLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAndGVtcCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB1LnNhdmUoZnVuY3Rpb24gKGVyciwgdSkge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignU29tZXRoaW5nIHdlbnQgd3JvbmcgdHJ5aW5nIHRvIHNhdmUgdXNlcicsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZWRpdFVzZXI6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICBpZiAoIXJlcS5ib2R5LmVtYWlsIHx8ICF2YWxpZGF0b3JfMS5pc0VtYWlsKHJlcS5ib2R5LmVtYWlsKSlcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnUGxlYXNlIHN1cHBseSBhIHZhbGlkIGVtYWlsJyB9KTtcbiAgICAgICAgaWYgKHJlcS5ib2R5LnVzZXIuZW1haWwgJiYgIXZhbGlkYXRvcl8xLmlzRW1haWwocmVxLmJvZHkudXNlci5lbWFpbCkpXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ1BsZWFzZSBzdXBwbHkgYSB2YWxpZCBlbWFpbCcgfSk7XG4gICAgICAgIGlmIChyZXEuYm9keS51c2VyLnJvbGUgJiYgIXZhbGlkYXRvcl8xLmlzRW1wdHkocmVxLmJvZHkudXNlci5yb2xlKSAmJiAocmVxLmJvZHkudXNlci5yb2xlICE9PSAndXNlcicgJiYgcmVxLmJvZHkudXNlci5yb2xlICE9PSAnYWRtaW4nKSlcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnSW52YWxpZCByb2xlJyB9KTtcbiAgICAgICAgcmV0dXJuIFVzZXJfMVtcImRlZmF1bHRcIl0uZmluZEJ5RW1haWwocmVxLmJvZHkuZW1haWwpLmV4ZWMoZnVuY3Rpb24gKGVyciwgdXNlcikge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTb21ldGhpbmcgd2VudCB3cm9uZycsIGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZycgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBlcnJvcjogJ1VzZXIgZG9lcyBub3QgZXhpc3QnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlcS5ib2R5LnVzZXIuZW1haWwpXG4gICAgICAgICAgICAgICAgdXNlci5lbWFpbCA9IHJlcS5ib2R5LnVzZXIuZW1haWw7XG4gICAgICAgICAgICBpZiAocmVxLmJvZHkudXNlci5uYW1lKVxuICAgICAgICAgICAgICAgIHVzZXIubmFtZSA9IHJlcS5ib2R5LnVzZXIubmFtZTtcbiAgICAgICAgICAgIGlmIChyZXEuYm9keS51c2VyLnJvbGUpXG4gICAgICAgICAgICAgICAgdXNlci5yb2xlID0gcmVxLmJvZHkudXNlci5yb2xlO1xuICAgICAgICAgICAgcmV0dXJuIHVzZXIuc2F2ZShmdW5jdGlvbiAoZXJyLCB1c2VyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGRlbGV0ZVVzZXI6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICBpZiAoIXJlcS5ib2R5LmVtYWlsIHx8ICF2YWxpZGF0b3JfMS5pc0VtYWlsKHJlcS5ib2R5LmVtYWlsKSlcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnSW52YWxpZCBkYXRhIGZvciBwYXJhbWV0ZXIgXCJlbWFpbFwiJyB9KTtcbiAgICAgICAgcmV0dXJuIFVzZXJfMVtcImRlZmF1bHRcIl0uZmluZEJ5RW1haWwocmVxLmJvZHkuZW1haWwpLmV4ZWMoZnVuY3Rpb24gKGVyciwgdXNlcikge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTb21ldGhpbmcgd2VudCB3cm9uZycsIGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZycgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXVzZXIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgZXJyb3I6ICdVc2VyIGRvZXMgbm90IGV4aXN0JyB9KTtcbiAgICAgICAgICAgIGlmICh1c2VyLmRlbGV0ZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdVc2VyIGFscmVhZHkgZGVsZXRlZCcgfSk7XG4gICAgICAgICAgICBpZiAocmVxLnVzZXIuZW1haWwgPT09IHJlcS5ib2R5LmVtYWlsKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnQ2Fubm90IGRlbGV0ZSBjdXJyZW50IHVzZXInIH0pO1xuICAgICAgICAgICAgdXNlci5kZWxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB1c2VyLnNhdmUoZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICByZXN0b3JlVXNlcjogZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgICAgIGlmICghcmVxLmJvZHkuZW1haWwgfHwgIXZhbGlkYXRvcl8xLmlzRW1haWwocmVxLmJvZHkuZW1haWwpKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdJbnZhbGlkIGRhdGEgZm9yIHBhcmFtZXRlciBcImVtYWlsXCInIH0pO1xuICAgICAgICByZXR1cm4gVXNlcl8xW1wiZGVmYXVsdFwiXS5maW5kQnlFbWFpbChyZXEuYm9keS5lbWFpbCkuZXhlYyhmdW5jdGlvbiAoZXJyLCB1c2VyKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1NvbWV0aGluZyB3ZW50IHdyb25nJywgZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdXNlcilcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBlcnJvcjogJ1VzZXIgZG9lcyBub3QgZXhpc3QnIH0pO1xuICAgICAgICAgICAgaWYgKCF1c2VyLmRlbGV0ZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdVc2VyIGFscmVhZHkgYWN0aXZlJyB9KTtcbiAgICAgICAgICAgIHVzZXIuZGVsZXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHVzZXIuc2F2ZShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pZFhObGNrTnZiblJ5YjJ4c1pYSXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOHVMaTh1TGk4dUxpOXpjbU12YzJWeWRtVnlMMk52Ym5SeWIyeHNaWEp6TDNWelpYSkRiMjUwY205c2JHVnlMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3TzBGQlFVRXNkVU5CUVRKRE8wRkJSVE5ETEhWRFFVRjVSRHRCUVVONlJDeHhRMEZCSzBNN1FVRkZMME1zY1VKQlFXVTdTVUZEV0N4SlFVRkpMRVZCUVVVc1ZVRkJReXhIUVVGWkxFVkJRVVVzUjBGQllUdFJRVU01UWl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0SlFVTjJRaXhEUVVGRE8wbEJRMFFzUzBGQlN5eEZRVUZGTEZWQlFVTXNSMEZCV1N4RlFVRkZMRWRCUVdFN1VVRkRMMElzVDBGQlR5eHBRa0ZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF5eE5RVUZOTEVOQlFVTXNlVUpCUVhsQ0xFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUXl4TFFVRmpPMWxCUTNaRkxFOUJRVThzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlF5eFBRVUZQTEVWQlFVVXNTVUZCU1N4RlFVRkZMRXRCUVVzc1JVRkJSU3hMUVVGTExFVkJRVU1zUTBGQlF5eERRVUZETzFGQlF5OUVMRU5CUVVNc1EwRkJReXhEUVVGRExFOUJRVXNzUTBGQlFTeERRVUZETEZWQlFVTXNSMEZCVlR0WlFVTm9RaXhQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMWxCUTI1Q0xFOUJRVThzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlF5eExRVUZMTEVWQlFVVXNOa05CUVRaRExFVkJRVU1zUTBGQlF5eERRVUZETzFGQlEzaEdMRU5CUVVNc1EwRkJReXhEUVVGQk8wbEJRMDRzUTBGQlF6dEpRVU5FTEZkQlFWY3NSVUZCUlN4VlFVRkRMRWRCUVZrc1JVRkJSU3hIUVVGaE8xRkJRM0pETEVsQlFVY3NRMEZCUXl4dFFrRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRPMWxCUTNoQ0xFOUJRVThzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlF5eExRVUZMTEVWQlFVVXNOa0pCUVRaQ0xFVkJRVU1zUTBGQlF5eERRVUZETzFGQlJYaEZMRTlCUVU4c2FVSkJRVWtzUTBGQlF5eFhRVUZYTEVOQlFVTXNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJReXhKUVVGWE8xbEJRemRFTEVsQlFVa3NTVUZCU1N4TFFVRkxMRWxCUVVrc1JVRkJSVHRuUWtGRFppeFBRVUZQTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETzI5Q1FVTjRRaXhKUVVGSkxFVkJRVVU3ZDBKQlEwWXNTMEZCU3l4RlFVRkZMRWxCUVVrc1EwRkJReXhMUVVGTE8zZENRVU5xUWl4SFFVRkhMRVZCUVVVc1NVRkJTU3hEUVVGRExFZEJRVWM3ZDBKQlEySXNTVUZCU1N4RlFVRkZMRWxCUVVrc1EwRkJReXhKUVVGSkxFbEJRVWtzUlVGQlJUdDNRa0ZEY2tJc1NVRkJTU3hGUVVGRkxFbEJRVWtzUTBGQlF5eEpRVUZKTzNkQ1FVTm1MRTlCUVU4c1JVRkJSU3hKUVVGSkxFTkJRVU1zVTBGQlV6dHhRa0ZETVVJN2FVSkJRMG9zUTBGQlF5eERRVUZETzJGQlEwNDdXVUZEUkN4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVNc1MwRkJTeXhGUVVGRkxDdENRVUVyUWl4RlFVRkRMRU5CUVVNc1EwRkJRenRSUVVVeFJTeERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRkxMRU5CUVVFc1EwRkJReXhWUVVGRExFZEJRVlU3V1VGRGFFSXNUMEZCVHl4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dFpRVU51UWl4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVNc1MwRkJTeXhGUVVGRkxEaERRVUU0UXl4RlFVRkRMRU5CUVVNc1EwRkJRenRSUVVONlJpeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTlFMRU5CUVVNN1NVRkRSQ3hYUVVGWExFVkJRVVVzVlVGQlF5eEhRVUZaTEVWQlFVVXNSMEZCWVR0UlFVTnlReXhKUVVGSExFTkJRVU1zYlVKQlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF6dFpRVU4yUWl4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVVc1MwRkJTeXhGUVVGRkxHMUNRVUZ0UWl4RlFVRkZMRU5CUVVNc1EwRkJRenRSUVVOb1JTeFBRVUZQTEdsQ1FVRkpMRU5CUVVNc1kwRkJZeXhEUVVGRExFVkJRVU1zUzBGQlN5eEZRVUZGTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhGUVVGRExFTkJRVU1zUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJReXhMUVVGaE8xbEJRekZGTEVsQlFVa3NTMEZCU3l4TFFVRkxMRU5CUVVNN1owSkJRMWdzVDBGQlR5eEhRVUZITEVOQlFVTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eEZRVUZGTEV0QlFVc3NSVUZCUlN3NFFrRkJPRUlzUlVGQlJTeERRVUZETEVOQlFVTTdXVUZETTBVc1QwRkJUeXhwUWtGQlNTeERRVUZETEZkQlFWY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGRExFbEJRVmM3WjBKQlF6VkVMRWxCUVVrc1EwRkJReXhMUVVGTExFZEJRVWNzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNN1owSkJRelZDTEVsQlFVa3NRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJRenRuUWtGRFdpeEhRVUZITEVOQlFVTXNZVUZCWVN4RFFVRkRMRTFCUVUwc1EwRkJReXhOUVVGTkxFTkJRVU1zUlVGQlJTeEZRVUZGTEVkQlFVY3NRMEZCUXl4SlFVRkpMRVZCUVVVc1JVRkJReXhMUVVGTExFVkJRVVVzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRVZCUVVNc1EwRkJReXhEUVVGRExFTkJRVU03WjBKQlEzaEZMRTlCUVU4c1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSU3hQUVVGUExFVkJRVVVzU1VGQlNTeEZRVUZGTEVOQlFVTXNRMEZCUXp0WlFVTnVSQ3hEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZMTEVOQlFVRXNRMEZCUXl4VlFVRkRMRWRCUVZVN1owSkJRMmhDTEU5QlFVOHNRMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU03WjBKQlEyNUNMRTlCUVU4c1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSU3hMUVVGTExFVkJRVVVzSzBOQlFTdERMRVZCUVVVc1EwRkJReXhEUVVGRE8xbEJRelZHTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTFBc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFVDeERRVUZETzBsQlEwUXNWVUZCVlN4RlFVRkZMRlZCUVVNc1IwRkJXU3hGUVVGRkxFZEJRV0U3VVVGRGNFTXNUMEZCVHl4cFFrRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJRenRoUVVOc1F5eEpRVUZKTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJReXhKUVVGWE8xbEJRM0pDTEVsQlFVa3NRMEZCUXl4SlFVRkpMRWRCUVVjc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTTdXVUZETVVJc1NVRkJTU3hEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETzFsQlExb3NSMEZCUnl4RFFVRkRMR0ZCUVdFc1EwRkJReXhOUVVGTkxFTkJRVU1zVFVGQlRTeERRVUZETEVWQlFVVXNSVUZCUlN4SFFVRkhMRU5CUVVNc1NVRkJTU3hGUVVGRkxFVkJRVVVzU1VGQlNTeEZRVUZGTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEzaEZMRTlCUVU4c1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJReXhQUVVGUExFVkJRVVVzU1VGQlNTeEZRVUZETEVOQlFVTXNRMEZCUXp0UlFVTnFSQ3hEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZMTEVOQlFVRXNRMEZCUXl4VlFVRkRMRWRCUVZVN1dVRkRhRUlzVDBGQlR5eERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRaUVVOdVFpeFBRVUZQTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVTXNTMEZCU3l4RlFVRkZMR2RFUVVGblJDeEZRVUZETEVOQlFVTXNRMEZCUXp0UlFVTXZSaXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTTdTVUZEUkN4alFVRmpMRVZCUVVVc1ZVRkJReXhIUVVGWkxFVkJRVVVzUjBGQllUdFJRVU40UXl4SlFVRkpMRzFDUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3h0UWtGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRE8xbEJRM1JFTEU5QlFVOHNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4TFFVRkxMRVZCUVVVc01FTkJRVEJETEVWQlFVVXNRMEZCUXl4RFFVRkRPMUZCUTNaR0xFOUJRVThzYVVKQlFVa3NRMEZCUXl4WFFVRlhMRU5CUVVNc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlF5eEpRVUZYTzFsQlF6VkVMRWxCUVVrc1EwRkJReXh6UWtGQlZ5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhGUVVGRkxFbEJRVWtzUTBGQlF5eFJRVUZSTEVOQlFVTTdaMEpCUXpkRExFOUJRVThzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlF5eExRVUZMTEVWQlFVVXNLMEpCUVN0Q0xFVkJRVU1zUTBGQlF5eERRVUZETzFsQlF6RkZMRWxCUVVrc1EwRkJReXhSUVVGUkxFZEJRVWNzYlVKQlFWRXNRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzFsQlF6TkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF6dFpRVU5hTEU5QlFVOHNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUXl4UFFVRlBMRVZCUVVVc1NVRkJTU3hGUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5xUkN4RFFVRkRMRU5CUVVNc1EwRkJRVHRKUVVOT0xFTkJRVU03U1VGRFJDeGhRVUZoTEVWQlFVVXNWVUZCUXl4SFFVRlpMRVZCUVVVc1IwRkJZVHRSUVVOMlF5eFBRVUZQTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVTXNTMEZCU3l4RlFVRkZMR2xDUVVGcFFpeEZRVUZETEVOQlFVTXNRMEZCUXp0SlFVTTFSQ3hEUVVGRE8wbEJUMFFzVlVGQlZTeEZRVUZGTEZWQlFVTXNSMEZCV1N4RlFVRkZMRWRCUVdFN1VVRkRjRU1zU1VGQlJ5eHRRa0ZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4dFFrRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRPMWxCUTI1RUxHMUNRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hMUVVGTExFMUJRVTBzU1VGQlNTeEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1MwRkJTeXhQUVVGUExFTkJRVU03V1VGRGFFWXNUMEZCVHl4SFFVRkhMRU5CUVVNc1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkZMRXRCUVVzc1JVRkJSU3hyUTBGQmEwTXNSVUZCUXl4RFFVRkRMRU5CUVVNN1VVRkRPVVVzVDBGQlR5eHBRa0ZCU1N4RFFVRkRMRmRCUVZjc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMR05CUVdNc1EwRkJReXhWUVVGRExFZEJRVkVzUlVGQlJTeERRVUZUTzFsQlEzWkZMRWxCUVVrc1IwRkJSeXhGUVVGRk8yZENRVU5NTEU5QlFVOHNRMEZCUXl4TFFVRkxMRU5CUVVNc2QwUkJRWGRFTEVkQlFVY3NSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFVkJRVVVzUjBGQlJ5eERRVUZETEVOQlFVTTdaMEpCUXpsR0xFOUJRVThzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlF5eExRVUZMTEVWQlFVVXNjMEpCUVhOQ0xFVkJRVU1zUTBGQlF5eERRVUZETzJGQlEyaEZPMWxCUTBRc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF6dG5Ra0ZEVUN4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVNc1MwRkJTeXhGUVVGRkxITkNRVUZ6UWl4RlFVRkRMRU5CUVVNc1EwRkJRenRaUVVOcVJTeEpRVUZKTEVOQlFVTXNSMEZCUnl4SlFVRkpMR2xDUVVGSkxFTkJRVU03WjBKQlEySXNTMEZCU3l4RlFVRkZMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN6dG5Ra0ZEY2tJc1NVRkJTU3hGUVVGRkxFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4SlFVRkpMRVZCUVVVN1owSkJRM3BDTEVsQlFVa3NSVUZCUlN4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWs3WjBKQlJXNUNMRkZCUVZFc1JVRkJSU3hOUVVGTk8yRkJRMjVDTEVOQlFVTXNRMEZCUVR0WlFVTkdMRTlCUVU4c1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZETEVkQlFWRXNSVUZCUlN4RFFVRlJPMmRDUVVNM1FpeEpRVUZKTEVkQlFVY3NSVUZCUlR0dlFrRkRUQ3hQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETERCRFFVRXdReXhGUVVGRkxFZEJRVWNzUTBGQlF5eERRVUZETzI5Q1FVTXZSQ3hQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVVVzUzBGQlN5eEZRVUZGTEhOQ1FVRnpRaXhGUVVGRkxFTkJRVU1zUTBGQlF6dHBRa0ZEYkVVN1owSkJRMFFzVDBGQlR5eEhRVUZITEVOQlFVTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eEZRVUZETEU5QlFVOHNSVUZCUlN4SlFVRkpMRVZCUVVNc1EwRkJReXhEUVVGRE8xbEJRMnBFTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUlZBc1EwRkJReXhEUVVGRExFTkJRVUU3U1VGRFRpeERRVUZETzBsQlZVUXNVVUZCVVN4RlFVRkZMRlZCUVVNc1IwRkJXU3hGUVVGRkxFZEJRV0U3VVVGRGJFTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eEpRVUZKTEVOQlFVTXNiVUpCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXp0WlFVTXpReXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVU1zUzBGQlN5eEZRVUZGTERaQ1FVRTJRaXhGUVVGRExFTkJRVU1zUTBGQlF6dFJRVU40UlN4SlFVRkpMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NTVUZCU1N4RFFVRkRMRzFDUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRE8xbEJRM0JFTEU5QlFVOHNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4TFFVRkxMRVZCUVVVc05rSkJRVFpDTEVWQlFVVXNRMEZCUXl4RFFVRkRPMUZCUXpGRkxFbEJRVWtzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hKUVVGSkxFTkJRVU1zYlVKQlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NTMEZCU3l4TlFVRk5MRWxCUVVrc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4TFFVRkxMRTlCUVU4c1EwRkJRenRaUVVOMlNDeFBRVUZQTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVTXNTMEZCU3l4RlFVRkZMR05CUVdNc1JVRkJReXhEUVVGRExFTkJRVU03VVVGRGVrUXNUMEZCVHl4cFFrRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZETEVkQlFWRXNSVUZCUlN4SlFVRlhPMWxCUXk5RUxFbEJRVWtzUjBGQlJ5eEZRVUZGTzJkQ1FVTk1MRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zYzBKQlFYTkNMRVZCUVVVc1IwRkJSeXhEUVVGRExFTkJRVU03WjBKQlEzcERMRTlCUVU4c1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJReXhMUVVGTExFVkJRVVVzYzBKQlFYTkNMRVZCUVVNc1EwRkJReXhEUVVGRE8yRkJRMmhGTzFsQlEwUXNTVUZCU1N4RFFVRkRMRWxCUVVrc1JVRkJSVHRuUWtGRFVDeFBRVUZQTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVTXNTMEZCU3l4RlFVRkZMSEZDUVVGeFFpeEZRVUZETEVOQlFVTXNRMEZCUXp0aFFVTXZSRHRaUVVORUxFbEJRVWtzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTenRuUWtGRGJrSXNTVUZCU1N4RFFVRkRMRXRCUVVzc1IwRkJSeXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNN1dVRkRja01zU1VGQlNTeEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSk8yZENRVU5zUWl4SlFVRkpMRU5CUVVNc1NVRkJTU3hIUVVGSExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJRenRaUVVOdVF5eEpRVUZKTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWs3WjBKQlEyeENMRWxCUVVrc1EwRkJReXhKUVVGSkxFZEJRVWNzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRE8xbEJRMjVETEU5QlFVOHNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGRExFZEJRVkVzUlVGQlJTeEpRVUZYTzJkQ1FVTnVReXhKUVVGSkxFZEJRVWNzUlVGQlJUdHZRa0ZEVEN4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzI5Q1FVTnFRaXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVU1zUzBGQlN5eEZRVUZGTEhOQ1FVRnpRaXhGUVVGRExFTkJRVU1zUTBGQlF6dHBRa0ZEYUVVN1owSkJRMFFzVDBGQlR5eEhRVUZITEVOQlFVTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eEZRVUZETEU5QlFVOHNSVUZCUlN4SlFVRkpMRVZCUVVNc1EwRkJReXhEUVVGRE8xbEJRMnBFTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTFBc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFVDeERRVUZETzBsQlEwUXNWVUZCVlN4RlFVRkZMRlZCUVVNc1IwRkJXU3hGUVVGRkxFZEJRV0U3VVVGRGNFTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eEpRVUZKTEVOQlFVTXNiVUpCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXp0WlFVTXpReXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVU1zUzBGQlN5eEZRVUZGTEc5RFFVRnZReXhGUVVGRExFTkJRVU1zUTBGQlF6dFJRVU12UlN4UFFVRlBMR2xDUVVGSkxFTkJRVU1zVjBGQlZ5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFVTXNSMEZCVVN4RlFVRkZMRWxCUVZjN1dVRkRMMFFzU1VGQlNTeEhRVUZITEVWQlFVVTdaMEpCUTB3c1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eHpRa0ZCYzBJc1JVRkJSU3hIUVVGSExFTkJRVU1zUTBGQlF6dG5Ra0ZEZWtNc1QwRkJUeXhIUVVGSExFTkJRVU1zVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRExFdEJRVXNzUlVGQlJTeHpRa0ZCYzBJc1JVRkJReXhEUVVGRExFTkJRVU03WVVGRGFFVTdXVUZEUkN4SlFVRkpMRU5CUVVNc1NVRkJTVHRuUWtGRFRDeFBRVUZQTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVTXNTMEZCU3l4RlFVRkZMSEZDUVVGeFFpeEZRVUZETEVOQlFVTXNRMEZCUXp0WlFVTm9SU3hKUVVGSkxFbEJRVWtzUTBGQlF5eFBRVUZQTzJkQ1FVTmFMRTlCUVU4c1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJReXhMUVVGTExFVkJRVVVzYzBKQlFYTkNMRVZCUVVNc1EwRkJReXhEUVVGRE8xbEJRMnBGTEVsQlFVa3NSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFdEJRVXNzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxPMmRDUVVOcVF5eFBRVUZQTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVTXNTMEZCU3l4RlFVRkZMRFJDUVVFMFFpeEZRVUZETEVOQlFVTXNRMEZCUXp0WlFVTjJSU3hKUVVGSkxFTkJRVU1zVDBGQlR5eEhRVUZITEVsQlFVa3NRMEZCUXp0WlFVTndRaXhQUVVGUExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUXl4SFFVRlJPMmRDUVVOMFFpeFBRVUZQTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVTXNUMEZCVHl4RlFVRkZMRWxCUVVrc1JVRkJReXhEUVVGRExFTkJRVU03V1VGRGFrUXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTTdTVUZEUkN4WFFVRlhMRVZCUVVVc1ZVRkJReXhIUVVGWkxFVkJRVVVzUjBGQllUdFJRVU55UXl4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVsQlFVa3NRMEZCUXl4dFFrRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRPMWxCUXpORExFOUJRVThzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlJTeExRVUZMTEVWQlFVVXNiME5CUVc5RExFVkJRVVVzUTBGQlF5eERRVUZETzFGQlEycEdMRTlCUVU4c2FVSkJRVWtzUTBGQlF5eFhRVUZYTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUXl4SFFVRlJMRVZCUVVVc1NVRkJWenRaUVVNdlJDeEpRVUZKTEVkQlFVY3NSVUZCUlR0blFrRkRUQ3hQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEhOQ1FVRnpRaXhGUVVGRkxFZEJRVWNzUTBGQlF5eERRVUZETzJkQ1FVTjZReXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVVVzUzBGQlN5eEZRVUZGTEhOQ1FVRnpRaXhGUVVGRkxFTkJRVU1zUTBGQlF6dGhRVU5zUlR0WlFVTkVMRWxCUVVrc1EwRkJReXhKUVVGSk8yZENRVU5NTEU5QlFVOHNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4TFFVRkxMRVZCUVVVc2NVSkJRWEZDTEVWQlFVVXNRMEZCUXl4RFFVRkRPMWxCUTJ4RkxFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHp0blFrRkRZaXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVVVzUzBGQlN5eEZRVUZGTEhGQ1FVRnhRaXhGUVVGRkxFTkJRVU1zUTBGQlF6dFpRVU01UkN4SlFVRkpMRU5CUVVNc1QwRkJUeXhIUVVGSExFdEJRVXNzUTBGQlF6dFpRVU42UWl4UFFVRlBMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlF5eEhRVUZSTzJkQ1FVTjBRaXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVVVzVDBGQlR5eEZRVUZGTEVsQlFVa3NSVUZCUlN4RFFVRkRMRU5CUVVNN1dVRkRia1FzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOUUxFTkJRVU03UTBGRFNpeERRVUZCSW4wPSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmZ1bmN0aW9uIGRlZmF1bHRfMShyZXEsIHJlcywgbmV4dCkge1xuICAgIGlmIChyZXEudXNlciAmJiByZXEudXNlci5yb2xlID09PSAnYWRtaW4nKSB7XG4gICAgICAgIHJldHVybiBuZXh0KCk7XG4gICAgfVxuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7IGVycm9yOiAnTm90IGF1dGhvcml6ZWQgYXMgYWRtaW4nIH0pO1xufVxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBkZWZhdWx0XzE7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lZV1J0YVc0dWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOHVMaTh1TGk5emNtTXZjMlZ5ZG1WeUwyMXBaR1JzWlhkaGNtVXZZV1J0YVc0dWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZCUVN4dFFrRkJkMElzUjBGQlVTeEZRVUZGTEVkQlFWRXNSVUZCUlN4SlFVRmpPMGxCUTNSRUxFbEJRVWtzUjBGQlJ5eERRVUZETEVsQlFVa3NTVUZCU1N4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUzBGQlN5eFBRVUZQTEVWQlFVVTdVVUZEZGtNc1QwRkJUeXhKUVVGSkxFVkJRVVVzUTBGQlF6dExRVU5xUWp0SlFVTkVMRTlCUVU4c1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSU3hMUVVGTExFVkJRVVVzZVVKQlFYbENMRVZCUVVVc1EwRkJReXhEUVVGRE8wRkJRM1JGTEVOQlFVTTdRVUZNUkN3clFrRkxReUo5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIGpzb253ZWJ0b2tlbl8xID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTtcbnZhciBlbnYgPSByZXF1aXJlKCcuLi8uLi8uLi9lbnYnKTtcbmZ1bmN0aW9uIGRlZmF1bHRfMShyZXEsIHJlcywgbmV4dCkge1xuICAgIHZhciB0b2tlbiA9IHJlcS5zZXNzaW9uLnRva2VuIHx8IHJlcS5oZWFkZXJzWyd4LWFjY2Vzcy10b2tlbiddO1xuICAgIGlmICghdG9rZW4pIHtcbiAgICAgICAgaWYgKCFyZXMuc3RhdHVzKVxuICAgICAgICAgICAgcmV0dXJuIG5leHQoKTtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5qc29uKHsgZXJyb3I6ICdOb3QgYXV0aG9yaXplZCcgfSk7XG4gICAgfVxuICAgIGpzb253ZWJ0b2tlbl8xLnZlcmlmeSh0b2tlbiwgZW52LnNlY3JldCwgZnVuY3Rpb24gKGVyciwgZGVjb2RlZCkge1xuICAgICAgICBpZiAoZXJyICYmIHJlcy5zdGF0dXMpXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLnNlbmQoeyBlcnJvcjogJ05vdCBhdXRob3JpemVkJyB9KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmVxLnVzZXIgPSBkZWNvZGVkO1xuICAgICAgICByZXR1cm4gbmV4dCgpO1xuICAgIH0pO1xufVxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBkZWZhdWx0XzE7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lZWFYwYUc5eWFYcGxaQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUx5NHVMM055WXk5elpYSjJaWEl2Yldsa1pHeGxkMkZ5WlM5aGRYUm9iM0pwZW1Wa0xuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCUVVFc05rTkJRWE5ETzBGQlIzUkRMRWxCUVUwc1IwRkJSeXhIUVVGSExFOUJRVThzUTBGQlF5eGpRVUZqTEVOQlFVTXNRMEZCUXp0QlFVTndReXh0UWtGQmQwSXNSMEZCV1N4RlFVRkZMRWRCUVcxQ0xFVkJRVVVzU1VGQll6dEpRVU55UlN4SlFVRkpMRXRCUVVzc1IwRkJSeXhIUVVGSExFTkJRVU1zVDBGQlR5eERRVUZETEV0QlFVc3NTVUZCU1N4SFFVRkhMRU5CUVVNc1QwRkJUeXhEUVVGRExHZENRVUZuUWl4RFFVRkRMRU5CUVVNN1NVRkRMMFFzU1VGQlNTeERRVUZETEV0QlFVc3NSVUZCUlR0UlFVTlNMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zVFVGQlRUdFpRVUZGTEU5QlFVOHNTVUZCU1N4RlFVRkZMRU5CUVVNN1VVRkRMMElzVDBGQlR5eEhRVUZITEVOQlFVTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eEZRVUZGTEV0QlFVc3NSVUZCUlN4blFrRkJaMElzUlVGQlJTeERRVUZETEVOQlFVTTdTMEZETlVRN1NVRkZSQ3h4UWtGQlRTeERRVUZETEV0QlFVc3NSVUZCUlN4SFFVRkhMRU5CUVVNc1RVRkJUU3hGUVVGRkxGVkJRVU1zUjBGQlZTeEZRVUZGTEU5QlFXTTdVVUZEYWtRc1NVRkJTU3hIUVVGSExFbEJRVWtzUjBGQlJ5eERRVUZETEUxQlFVMDdXVUZCUlN4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVVc1MwRkJTeXhGUVVGRkxHZENRVUZuUWl4RlFVRkZMRU5CUVVNc1EwRkJRenM3V1VGRE0wVXNSMEZCUnl4RFFVRkRMRWxCUVVrc1IwRkJSeXhQUVVGUExFTkJRVU03VVVGRGVFSXNUMEZCVHl4SlFVRkpMRVZCUVVVc1EwRkJRenRKUVVOc1FpeERRVUZETEVOQlFVTXNRMEZCUXp0QlFVTlFMRU5CUVVNN1FVRmFSQ3dyUWtGWlF5SjkiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgbW9uZ29vc2VfMSA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTtcbnZhciBjaGFubmVsU2NoZW1hID0gbmV3IG1vbmdvb3NlXzEuU2NoZW1hKHtcbiAgICBuYW1lOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIGxvd2VyY2FzZTogdHJ1ZSxcbiAgICB9LFxufSwge1xuICAgIHRpbWVzdGFtcHM6IHRydWVcbn0pO1xudmFyIENoYW5uZWwgPSBtb25nb29zZV8xLm1vZGVsKCdDaGFubmVsJywgY2hhbm5lbFNjaGVtYSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IENoYW5uZWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lRMmhoYm01bGJDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1THk0dUwzTnlZeTl6WlhKMlpYSXZiVzlrWld4ekwwTm9ZVzV1Wld3dWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZCUVN4eFEwRkJkMFE3UVVGUmVFUXNTVUZCVFN4aFFVRmhMRWRCUVZjc1NVRkJTU3hwUWtGQlRTeERRVUZETzBsQlEzSkRMRWxCUVVrc1JVRkJSVHRSUVVOR0xFbEJRVWtzUlVGQlJTeE5RVUZOTzFGQlExb3NVVUZCVVN4RlFVRkZMRWxCUVVrN1VVRkRaQ3hUUVVGVExFVkJRVVVzU1VGQlNUdExRVU5zUWp0RFFVTktMRVZCUVVVN1NVRkRReXhWUVVGVkxFVkJRVVVzU1VGQlNUdERRVU51UWl4RFFVRkRMRU5CUVVNN1FVRkZTQ3hKUVVGTkxFOUJRVThzUjBGQmIwSXNaMEpCUVVzc1EwRkJReXhUUVVGVExFVkJRVVVzWVVGQllTeERRVUZETEVOQlFVTTdRVUZEYWtVc2NVSkJRV1VzVDBGQlR5eERRVUZESW4wPSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBtb25nb29zZV8xID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpO1xudmFyIG1lc3NhZ2VTY2hlbWEgPSBuZXcgbW9uZ29vc2VfMS5TY2hlbWEoe1xuICAgIGNoYW5uZWw6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB9LFxuICAgIHRleHQ6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB9LFxuICAgIHVzZXJFbWFpbDoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBsb3dlcmNhc2U6IHRydWUsXG4gICAgfVxufSwge1xuICAgIHRpbWVzdGFtcHM6IHRydWVcbn0pO1xudmFyIE1lc3NhZ2UgPSBtb25nb29zZV8xLm1vZGVsKCdNZXNzYWdlJywgbWVzc2FnZVNjaGVtYSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IE1lc3NhZ2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lUV1Z6YzJGblpTNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1THk0dUwzTnlZeTl6WlhKMlpYSXZiVzlrWld4ekwwMWxjM05oWjJVdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZCUVN4eFEwRkJkMFE3UVVGVmVFUXNTVUZCVFN4aFFVRmhMRWRCUVZjc1NVRkJTU3hwUWtGQlRTeERRVUZETzBsQlEzSkRMRTlCUVU4c1JVRkJSVHRSUVVOTUxFbEJRVWtzUlVGQlJTeE5RVUZOTzFGQlExb3NVVUZCVVN4RlFVRkZMRWxCUVVrN1MwRkZha0k3U1VGRFJDeEpRVUZKTEVWQlFVVTdVVUZEUml4SlFVRkpMRVZCUVVVc1RVRkJUVHRSUVVOYUxGRkJRVkVzUlVGQlJTeEpRVUZKTzB0QlEycENPMGxCUTBRc1UwRkJVeXhGUVVGRk8xRkJRMUFzU1VGQlNTeEZRVUZGTEUxQlFVMDdVVUZEV2l4UlFVRlJMRVZCUVVVc1NVRkJTVHRSUVVOa0xGTkJRVk1zUlVGQlJTeEpRVUZKTzB0QlJXeENPME5CUTBvc1JVRkJSVHRKUVVORExGVkJRVlVzUlVGQlJTeEpRVUZKTzBOQlEyNUNMRU5CUVVNc1EwRkJRenRCUVVWSUxFbEJRVTBzVDBGQlR5eEhRVUZ2UWl4blFrRkJTeXhEUVVGRExGTkJRVk1zUlVGQlJTeGhRVUZoTEVOQlFVTXNRMEZCUXp0QlFVTnFSU3h4UWtGQlpTeFBRVUZQTEVOQlFVTWlmUT09IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIG1vbmdvb3NlXzEgPSByZXF1aXJlKFwibW9uZ29vc2VcIik7XG47XG52YXIgdXNlclNjaGVtYSA9IG5ldyBtb25nb29zZV8xLlNjaGVtYSh7XG4gICAgbmFtZTogU3RyaW5nLFxuICAgIGVtYWlsOiB7XG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIGxvd2VyY2FzZTogdHJ1ZVxuICAgIH0sXG4gICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgcm9sZToge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBsb3dlcmNhc2U6IHRydWUsXG4gICAgICAgIFwiZW51bVwiOiBbJ2FkbWluJywgJ3VzZXInXVxuICAgIH0sXG4gICAgZGVsZXRlZDoge1xuICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICBcImRlZmF1bHRcIjogZmFsc2VcbiAgICB9LFxuICAgIHZlcmlmaWVkOiB7XG4gICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgIFwiZGVmYXVsdFwiOiBmYWxzZSxcbiAgICB9LFxufSwge1xuICAgIHRpbWVzdGFtcHM6IHRydWVcbn0pO1xudXNlclNjaGVtYS5zdGF0aWNzLmZpbmRCeUVtYWlsID0gZnVuY3Rpb24gKGVtYWlsKSB7XG4gICAgcmV0dXJuIHRoaXMuZmluZE9uZSh7IGVtYWlsOiBlbWFpbCB9KTtcbn07XG52YXIgVXNlciA9IG1vbmdvb3NlXzEubW9kZWwoJ1VzZXInLCB1c2VyU2NoZW1hKTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gVXNlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVZYTmxjaTVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUx5NHVMM055WXk5elpYSjJaWEl2Ylc5a1pXeHpMMVZ6WlhJdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZCUVN4eFEwRkJPRVU3UVVGWk4wVXNRMEZCUXp0QlFVMUdMRWxCUVUwc1ZVRkJWU3hIUVVGWExFbEJRVWtzYVVKQlFVMHNRMEZCUXp0SlFVTnNReXhKUVVGSkxFVkJRVVVzVFVGQlRUdEpRVU5hTEV0QlFVc3NSVUZCUlR0UlFVTklMRkZCUVZFc1JVRkJSU3hKUVVGSk8xRkJRMlFzU1VGQlNTeEZRVUZGTEUxQlFVMDdVVUZEV2l4VFFVRlRMRVZCUVVVc1NVRkJTVHRMUVVOc1FqdEpRVU5FTEZGQlFWRXNSVUZCUlR0UlFVTk9MRWxCUVVrc1JVRkJSU3hOUVVGTk8xRkJRMW9zVVVGQlVTeEZRVUZGTEVsQlFVazdTMEZEYWtJN1NVRkRSQ3hKUVVGSkxFVkJRVVU3VVVGRFJpeEpRVUZKTEVWQlFVVXNUVUZCVFR0UlFVTmFMRkZCUVZFc1JVRkJSU3hKUVVGSk8xRkJRMlFzVTBGQlV5eEZRVUZGTEVsQlFVazdVVUZEWml4TlFVRkpMRVZCUVVVc1EwRkJReXhQUVVGUExFVkJRVVVzVFVGQlRTeERRVUZETzB0QlF6RkNPMGxCUTBRc1QwRkJUeXhGUVVGRk8xRkJRMHdzU1VGQlNTeEZRVUZGTEU5QlFVODdVVUZEWWl4VFFVRlBMRVZCUVVVc1MwRkJTenRMUVVOcVFqdEpRVU5FTEZGQlFWRXNSVUZCUlR0UlFVTk9MRWxCUVVrc1JVRkJSU3hQUVVGUE8xRkJRMklzVTBGQlR5eEZRVUZGTEV0QlFVczdTMEZEYWtJN1EwRkRTaXhGUVVGRk8wbEJRME1zVlVGQlZTeEZRVUZGTEVsQlFVazdRMEZEYmtJc1EwRkJReXhEUVVGRE8wRkJSVWdzVlVGQlZTeERRVUZETEU5QlFVOHNRMEZCUXl4WFFVRlhMRWRCUVVjc1ZVRkJWU3hMUVVGaE8wbEJRM0JFTEU5QlFVOHNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhGUVVGRExFdEJRVXNzUlVGQlJTeExRVUZMTEVWQlFVTXNRMEZCUXl4RFFVRkRPMEZCUTNoRExFTkJRVU1zUTBGQlFUdEJRVVZFTEVsQlFVMHNTVUZCU1N4SFFVRmxMR2RDUVVGTExFTkJRVzlDTEUxQlFVMHNSVUZCUlN4VlFVRlZMRU5CUVVNc1EwRkJRenRCUVVOMFJTeHhRa0ZCWlN4SlFVRkpMRU5CUVVNaWZRPT0iLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xudmFyIGF1dGhvcml6ZWRfMSA9IHJlcXVpcmUoXCIuL21pZGRsZXdhcmUvYXV0aG9yaXplZFwiKTtcbnZhciBhZG1pbl8xID0gcmVxdWlyZShcIi4vbWlkZGxld2FyZS9hZG1pblwiKTtcbnZhciBhdXRoQ29udHJvbGxlcl8xID0gcmVxdWlyZShcIi4vY29udHJvbGxlcnMvYXV0aENvbnRyb2xsZXJcIik7XG52YXIgdXNlckNvbnRyb2xsZXJfMSA9IHJlcXVpcmUoXCIuL2NvbnRyb2xsZXJzL3VzZXJDb250cm9sbGVyXCIpO1xudmFyIG1lc3NhZ2VDb250cm9sbGVyXzEgPSByZXF1aXJlKFwiLi9jb250cm9sbGVycy9tZXNzYWdlQ29udHJvbGxlclwiKTtcbnZhciBjaGFubmVsQ29udHJvbGxlcl8xID0gcmVxdWlyZShcIi4vY29udHJvbGxlcnMvY2hhbm5lbENvbnRyb2xsZXJcIik7XG5mdW5jdGlvbiBkZWZhdWx0XzEoYXBwKSB7XG4gICAgYXBwLmdldCgnLycsIGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICByZXR1cm4gcmVzLnJlbmRlcihwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vZGlzdC9wdWJsaWMvaW5kZXguaHRtbCcpLCB7IGNzcmZUb2tlbjogcmVxLmNzcmZUb2tlbigpIH0pO1xuICAgIH0pO1xuICAgIGFwcC5nZXQoJy93aWRnZXQnLCBmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5yZW5kZXIocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uLy4uL2Rpc3QvcHVibGljL3dpZGdldC9pbmRleC5odG1sJykpO1xuICAgIH0pO1xuICAgIGFwcC5nZXQoJy93aWRnZXQvZGVtbycsIGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICByZXR1cm4gcmVzLnJlbmRlcihwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vLi4vZGlzdC9wdWJsaWMvd2lkZ2V0L2RlbW8uaHRtbCcpKTtcbiAgICB9KTtcbiAgICBhcHAucG9zdCgnL2FwaS92MS9sb2dpbicsIGF1dGhDb250cm9sbGVyXzFbXCJkZWZhdWx0XCJdLmxvZ2luKTtcbiAgICBhcHAucG9zdCgnL2FwaS92MS9yZWdpc3RlcicsIGF1dGhDb250cm9sbGVyXzFbXCJkZWZhdWx0XCJdLnJlZ2lzdGVyKTtcbiAgICBhcHAuZ2V0KCcvYXBpL3YxL2xvZ291dCcsIGF1dGhDb250cm9sbGVyXzFbXCJkZWZhdWx0XCJdLmxvZ291dCk7XG4gICAgYXBwLmdldCgnL2FwaS92MS92ZXJpZnlFbWFpbC86aWQnLCBhdXRoQ29udHJvbGxlcl8xW1wiZGVmYXVsdFwiXS52ZXJpZnlFbWFpbCk7XG4gICAgYXBwLnVzZSgnL2FwaS92MS91c2VyKicsIGF1dGhvcml6ZWRfMVtcImRlZmF1bHRcIl0pO1xuICAgIGFwcC5nZXQoJy9hcGkvdjEvdXNlcicsIHVzZXJDb250cm9sbGVyXzFbXCJkZWZhdWx0XCJdLnVzZXIpO1xuICAgIGFwcC5nZXQoJy9hcGkvdjEvdXNlcnMnLCB1c2VyQ29udHJvbGxlcl8xW1wiZGVmYXVsdFwiXS51c2Vycyk7XG4gICAgYXBwLmdldCgnL2FwaS92MS91c2VyLzp1c2VyJywgdXNlckNvbnRyb2xsZXJfMVtcImRlZmF1bHRcIl0udXNlckJ5RW1haWwpO1xuICAgIGFwcC5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL2VtYWlsJywgdXNlckNvbnRyb2xsZXJfMVtcImRlZmF1bHRcIl0udXBkYXRlRW1haWwpO1xuICAgIGFwcC5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL25hbWUnLCB1c2VyQ29udHJvbGxlcl8xW1wiZGVmYXVsdFwiXS51cGRhdGVOYW1lKTtcbiAgICBhcHAucG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9wYXNzd29yZCcsIHVzZXJDb250cm9sbGVyXzFbXCJkZWZhdWx0XCJdLnVwZGF0ZVBhc3N3b3JkKTtcbiAgICBhcHAucG9zdCgnL2FwaS92MS91c2VyL3Jlc2V0X3Bhc3N3b3JkJywgdXNlckNvbnRyb2xsZXJfMVtcImRlZmF1bHRcIl0ucmVzZXRQYXNzd29yZCk7XG4gICAgYXBwLnBvc3QoJy9hcGkvdjEvdXNlci9jcmVhdGUnLCBhZG1pbl8xW1wiZGVmYXVsdFwiXSwgdXNlckNvbnRyb2xsZXJfMVtcImRlZmF1bHRcIl0uY3JlYXRlVXNlcik7XG4gICAgYXBwLnB1dCgnL2FwaS92MS91c2VyL3VwZGF0ZScsIGFkbWluXzFbXCJkZWZhdWx0XCJdLCB1c2VyQ29udHJvbGxlcl8xW1wiZGVmYXVsdFwiXS5lZGl0VXNlcik7XG4gICAgYXBwW1wiZGVsZXRlXCJdKCcvYXBpL3YxL3VzZXIvZGVsZXRlJywgYWRtaW5fMVtcImRlZmF1bHRcIl0sIHVzZXJDb250cm9sbGVyXzFbXCJkZWZhdWx0XCJdLmRlbGV0ZVVzZXIpO1xuICAgIGFwcC5wdXQoJy9hcGkvdjEvdXNlci9yZXN0b3JlJywgYWRtaW5fMVtcImRlZmF1bHRcIl0sIHVzZXJDb250cm9sbGVyXzFbXCJkZWZhdWx0XCJdLnJlc3RvcmVVc2VyKTtcbiAgICBhcHAudXNlKCcvYXBpL3YxL21lc3NhZ2UqJywgYXV0aG9yaXplZF8xW1wiZGVmYXVsdFwiXSk7XG4gICAgYXBwLmdldCgnL2FwaS92MS9tZXNzYWdlcy86Y2hhbm5lbC86b2Zmc2V0JywgbWVzc2FnZUNvbnRyb2xsZXJfMVtcImRlZmF1bHRcIl0ubWVzc2FnZXMpO1xuICAgIGFwcC51c2UoJy9hcGkvdjEvY2hhbm5lbCcsIGF1dGhvcml6ZWRfMVtcImRlZmF1bHRcIl0pO1xuICAgIGFwcC5nZXQoJy9hcGkvdjEvY2hhbm5lbHMnLCBjaGFubmVsQ29udHJvbGxlcl8xW1wiZGVmYXVsdFwiXS5jaGFubmVscyk7XG4gICAgYXBwLnBvc3QoJy9hcGkvdjEvY2hhbm5lbHMvZGVsZXRlJywgYWRtaW5fMVtcImRlZmF1bHRcIl0sIGNoYW5uZWxDb250cm9sbGVyXzFbXCJkZWZhdWx0XCJdW1wiZGVsZXRlXCJdKTtcbiAgICBhcHAucG9zdCgnL2FwaS92MS9jaGFubmVscy9jcmVhdGUnLCBhZG1pbl8xW1wiZGVmYXVsdFwiXSwgY2hhbm5lbENvbnRyb2xsZXJfMVtcImRlZmF1bHRcIl0uY3JlYXRlKTtcbiAgICBhcHAuZ2V0KCcqJywgZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgICAgIHJldHVybiByZXMucmVuZGVyKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi9kaXN0L3B1YmxpYy9pbmRleC5odG1sJyksIHsgY3NyZlRva2VuOiByZXEuY3NyZlRva2VuKCkgfSk7XG4gICAgfSk7XG59XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGRlZmF1bHRfMTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWNtOTFkR1Z6TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dkxpNHZjM0pqTDNObGNuWmxjaTl5YjNWMFpYTXVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanM3UVVGQlFTd3lRa0ZCTmtJN1FVRkZOMElzYzBSQlFXbEVPMEZCUTJwRUxEUkRRVUYxUXp0QlFVTjJReXdyUkVGQk1FUTdRVUZETVVRc0swUkJRVEJFTzBGQlF6RkVMSEZGUVVGblJUdEJRVU5vUlN4eFJVRkJaMFU3UVVGRmFFVXNiVUpCUVhkQ0xFZEJRVkU3U1VGSE5VSXNSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXhIUVVGSExFVkJRVVVzVlVGQlZTeEhRVUZaTEVWQlFVVXNSMEZCWVR0UlFVTTVReXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlEySXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhUUVVGVExFVkJRVVVzT0VKQlFUaENMRU5CUVVNc1JVRkRka1FzUlVGQlJTeFRRVUZUTEVWQlFVVXNSMEZCUnl4RFFVRkRMRk5CUVZNc1JVRkJSU3hGUVVGRkxFTkJRMnBETEVOQlFVTTdTVUZEVGl4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVWSUxFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNVMEZCVXl4RlFVRkZMRlZCUVZVc1IwRkJVU3hGUVVGRkxFZEJRVkU3VVVGRE0wTXNUMEZCVHl4SFFVRkhMRU5CUVVNc1RVRkJUU3hEUVVOaUxFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNVMEZCVXl4RlFVRkZMSGREUVVGM1F5eERRVUZETEVOQlEzQkZMRU5CUVVNN1NVRkRUaXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVVZJTEVkQlFVY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1kwRkJZeXhGUVVGRkxGVkJRVlVzUjBGQlVTeEZRVUZGTEVkQlFWRTdVVUZEYUVRc1QwRkJUeXhIUVVGSExFTkJRVU1zVFVGQlRTeERRVU5pTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1UwRkJVeXhGUVVGRkxIVkRRVUYxUXl4RFFVRkRMRU5CUTI1RkxFTkJRVU03U1VGRFRpeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVbElMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zWlVGQlpTeEZRVUZGTERKQ1FVRmpMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU03U1VGRGFFUXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhyUWtGQmEwSXNSVUZCUlN3eVFrRkJZeXhEUVVGRExGRkJRVkVzUTBGQlF5eERRVUZETzBsQlEzUkVMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zWjBKQlFXZENMRVZCUVVVc01rSkJRV01zUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXp0SlFVTnFSQ3hIUVVGSExFTkJRVU1zUjBGQlJ5eERRVUZETEhsQ1FVRjVRaXhGUVVGRkxESkNRVUZqTEVOQlFVTXNWMEZCVnl4RFFVRkRMRU5CUVVNN1NVRkZMMFFzUjBGQlJ5eERRVUZETEVkQlFVY3NRMEZCUXl4bFFVRmxMRVZCUVVVc2RVSkJRVlVzUTBGQlF5eERRVUZETzBsQlEzSkRMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zWTBGQll5eEZRVUZGTERKQ1FVRmpMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03U1VGRE4wTXNSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXhsUVVGbExFVkJRVVVzTWtKQlFXTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRVHRKUVVNNVF5eEhRVUZITEVOQlFVTXNSMEZCUnl4RFFVRkRMRzlDUVVGdlFpeEZRVUZGTERKQ1FVRmpMRU5CUVVNc1YwRkJWeXhEUVVGRExFTkJRVU03U1VGRE1VUXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXd5UWtGQk1rSXNSVUZCUlN3eVFrRkJZeXhEUVVGRExGZEJRVmNzUTBGQlF5eERRVUZETzBsQlEyeEZMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zTUVKQlFUQkNMRVZCUVVVc01rSkJRV01zUTBGQlF5eFZRVUZWTEVOQlFVTXNRMEZCUXp0SlFVTm9SU3hIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETERoQ1FVRTRRaXhGUVVGRkxESkNRVUZqTEVOQlFVTXNZMEZCWXl4RFFVRkRMRU5CUVVNN1NVRkRlRVVzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl3MlFrRkJOa0lzUlVGQlJTd3lRa0ZCWXl4RFFVRkRMR0ZCUVdFc1EwRkJReXhEUVVGRE8wbEJRM1JGTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc2NVSkJRWEZDTEVWQlFVVXNhMEpCUVVzc1JVRkJSU3d5UWtGQll5eERRVUZETEZWQlFWVXNRMEZCUXl4RFFVRkRPMGxCUTJ4RkxFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNjVUpCUVhGQ0xFVkJRVVVzYTBKQlFVc3NSVUZCUlN3eVFrRkJZeXhEUVVGRExGRkJRVkVzUTBGQlF5eERRVUZETzBsQlF5OUVMRWRCUVVjc1EwRkJReXhSUVVGTkxFTkJRVUVzUTBGQlF5eHhRa0ZCY1VJc1JVRkJSU3hyUWtGQlN5eEZRVUZGTERKQ1FVRmpMRU5CUVVNc1ZVRkJWU3hEUVVGRExFTkJRVU03U1VGRGNFVXNSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXh6UWtGQmMwSXNSVUZCUlN4clFrRkJTeXhGUVVGRkxESkNRVUZqTEVOQlFVTXNWMEZCVnl4RFFVRkRMRU5CUVVNN1NVRkZia1VzUjBGQlJ5eERRVUZETEVkQlFVY3NRMEZCUXl4clFrRkJhMElzUlVGQlJTeDFRa0ZCVlN4RFFVRkRMRU5CUVVNN1NVRkRlRU1zUjBGQlJ5eERRVUZETEVkQlFVY3NRMEZCUXl4dFEwRkJiVU1zUlVGQlJTdzRRa0ZCYVVJc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF6dEpRVVY2UlN4SFFVRkhMRU5CUVVNc1IwRkJSeXhEUVVGRExHbENRVUZwUWl4RlFVRkZMSFZDUVVGVkxFTkJRVU1zUTBGQlF6dEpRVU4yUXl4SFFVRkhMRU5CUVVNc1IwRkJSeXhEUVVGRExHdENRVUZyUWl4RlFVRkZMRGhDUVVGcFFpeERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRPMGxCUTNoRUxFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNlVUpCUVhsQ0xFVkJRVVVzYTBKQlFVc3NSVUZCUlN3NFFrRkJhVUlzUTBGQlF5eFJRVUZOTEVOQlFVRXNRMEZCUXl4RFFVRkRPMGxCUTNKRkxFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNlVUpCUVhsQ0xFVkJRVVVzYTBKQlFVc3NSVUZCUlN3NFFrRkJhVUlzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXp0SlFVZHlSU3hIUVVGSExFTkJRVU1zUjBGQlJ5eERRVUZETEVkQlFVY3NSVUZCUlN4VlFVRlZMRWRCUVZrc1JVRkJSU3hIUVVGaE8xRkJRemxETEU5QlFVOHNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkRZaXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEZOQlFWTXNSVUZCUlN3NFFrRkJPRUlzUTBGQlF5eEZRVU4yUkN4RlFVRkZMRk5CUVZNc1JVRkJSU3hIUVVGSExFTkJRVU1zVTBGQlV5eEZRVUZGTEVWQlFVVXNRMEZEYWtNc1EwRkJRenRKUVVOT0xFTkJRVU1zUTBGQlF5eERRVUZETzBGQlExQXNRMEZCUXp0QlFYcEVSQ3dyUWtGNVJFTWlmUT09IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcbnZhciBleHByZXNzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG52YXIgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xudmFyIG1vbmdvb3NlID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpO1xudmFyIGNzcmYgPSByZXF1aXJlKFwiY3N1cmZcIik7XG52YXIgY29va2llUGFyc2VyID0gcmVxdWlyZShcImNvb2tpZS1wYXJzZXJcIik7XG52YXIgc2Vzc2lvbiA9IHJlcXVpcmUoXCJleHByZXNzLXNlc3Npb25cIik7XG52YXIgYm9keVBhcnNlciA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTtcbnZhciBiY3J5cHQgPSByZXF1aXJlKFwiYmNyeXB0anNcIik7XG52YXIgaGVsbWV0ID0gcmVxdWlyZShcImhlbG1ldFwiKTtcbnZhciBjb21wcmVzc2lvbiA9IHJlcXVpcmUoXCJjb21wcmVzc2lvblwiKTtcbnZhciBqc29ud2VidG9rZW5fMSA9IHJlcXVpcmUoXCJqc29ud2VidG9rZW5cIik7XG52YXIgbXVzdGFjaGVFeHByZXNzID0gcmVxdWlyZSgnbXVzdGFjaGUtZXhwcmVzcycpO1xudmFyIE1vbmdvU3RvcmUgPSByZXF1aXJlKCdjb25uZWN0LW1vbmdvJykoc2Vzc2lvbik7XG52YXIgcm91dGVzXzEgPSByZXF1aXJlKFwiLi9yb3V0ZXNcIik7XG52YXIgaW5kZXhfMSA9IHJlcXVpcmUoXCIuL3NvY2tldC5pby9pbmRleFwiKTtcbnZhciBVc2VyXzEgPSByZXF1aXJlKFwiLi9tb2RlbHMvVXNlclwiKTtcbnZhciBlbnYgPSByZXF1aXJlKCcuLi8uLi9lbnYnKTtcbnZhciBhcHAgPSBleHByZXNzKCk7XG5leHBvcnRzLmFwcCA9IGFwcDtcbnZhciBwb3J0ID0gZW52LnBvcnQ7XG52YXIgc2VydmVyO1xudmFyIHNvY2tldFNlcnZlcjtcbmV4cG9ydHMuc29ja2V0U2VydmVyID0gc29ja2V0U2VydmVyO1xuYXBwLmVuZ2luZSgnaHRtbCcsIG11c3RhY2hlRXhwcmVzcygpKTtcbmFwcC5zZXQoJ3ZpZXcgZW5naW5lJywgJ2h0bWwnKTtcbmFwcC51c2UoY29tcHJlc3Npb24oKSk7XG52YXIgc2Vzc2lvbk1pZGRsZXdhcmUgPSBzZXNzaW9uKHtcbiAgICBzZWNyZXQ6IGVudi5zZWNyZXQsXG4gICAgY29va2llOiB7XG4gICAgICAgIG1heEFnZTogMjQgKiA2MCAqIDYwICogMTAwMCxcbiAgICAgICAgc2FtZVNpdGU6IHRydWUsXG4gICAgICAgIHNlY3VyZTogZW52LnByb2R1Y3Rpb24sXG4gICAgICAgIGh0dHBPbmx5OiB0cnVlXG4gICAgfSxcbiAgICBzYXZlVW5pbml0aWFsaXplZDogdHJ1ZSxcbiAgICByZXNhdmU6IGZhbHNlLFxuICAgIHN0b3JlOiBuZXcgTW9uZ29TdG9yZSh7XG4gICAgICAgIG1vbmdvb3NlQ29ubmVjdGlvbjogbW9uZ29vc2UuY29ubmVjdGlvblxuICAgIH0pXG59KTtcbnZhciBjc3JmTWlkZGxld2FyZSA9IGNzcmYoe1xuICAgIGNvb2tpZToge1xuICAgICAgICBtYXhBZ2U6IDI0ICogNjAgKiA2MCAqIDEwMDAsXG4gICAgICAgIHNhbWVTaXRlOiB0cnVlLFxuICAgICAgICBzZWN1cmU6IGVudi5wcm9kdWN0aW9uLFxuICAgICAgICBodHRwT25seTogdHJ1ZSxcbiAgICAgICAga2V5OiAnX2NzcmYnXG4gICAgfVxufSk7XG5tb25nb29zZS5jb25uZWN0KGVudi51c2VUZXN0RGIgPyBlbnYubW9uZ29kYlRlc3RDb25uZWN0aW9uVXJpIDogZW52Lm1vbmdvZGJDb25uZWN0aW9uVXJpLCB7IHVzZU5ld1VybFBhcnNlcjogdHJ1ZSB9KTtcbm1vbmdvb3NlLmNvbm5lY3Rpb24ub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ01vbmdvb3NlIGNvbm5lY3Rpb24gZXJyb3InLCBlcnIpO1xufSk7XG5wcm9jZXNzLm9uKCdTSUdJTlQnLCBmdW5jdGlvbiAoKSB7XG4gICAgbW9uZ29vc2UuY29ubmVjdGlvbi5jbG9zZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdNb25nb29zZSBkZWZhdWx0IGNvbm5lY3Rpb24gZGlzY29ubmVjdGVkIHRocm91Z2ggYXBwIHRlcm1pbmF0aW9uJyk7XG4gICAgICAgIHNlcnZlci5jbG9zZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBwcm9jZXNzLmV4aXQoMCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG5hcHAudXNlKHNlc3Npb25NaWRkbGV3YXJlKTtcbmFwcC51c2UoY29va2llUGFyc2VyKGVudi5zZWNyZXQpKTtcbmlmIChlbnYuZGlzYWJsZUNzcmYpIHtcbiAgICBjb25zb2xlLmxvZygnQ1NSRiBkaXNhYmxlZCcpO1xuICAgIGFwcC51c2UoZnVuY3Rpb24gKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHJlcS5jc3JmVG9rZW4gPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnJzsgfTtcbiAgICAgICAgcmV0dXJuIG5leHQoKTtcbiAgICB9KTtcbn1cbmVsc2Uge1xuICAgIGFwcC51c2UoY3NyZk1pZGRsZXdhcmUpO1xufVxudmFyIGRiID0gbW9uZ29vc2UuY29ubmVjdGlvbjtcbmFwcC51c2UoZnVuY3Rpb24gKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgcmVxLmRiID0gZGI7XG4gICAgcmV0dXJuIG5leHQoKTtcbn0pO1xuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiB0cnVlIH0pKTtcbmFwcC51c2UoaGVsbWV0KCkpO1xuYXBwLnVzZShleHByZXNzLnN0YXRpYyhwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vZGlzdC9wdWJsaWMvJykpKTtcbmFwcC51c2UoJy9hcGknLCBmdW5jdGlvbiAocmVxLCByZXMsIG5leHQpIHtcbiAgICByZXR1cm4gbmV4dCgpO1xufSk7XG5hcHAudXNlKGZ1bmN0aW9uIChyZXEsIHJlcywgbmV4dCkge1xuICAgIHJlcS5hdXRoZW50aWNhdGUgPSBmdW5jdGlvbiAoZW1haWwsIHBhc3N3b3JkLCBkb25lKSB7XG4gICAgICAgIFVzZXJfMVtcImRlZmF1bHRcIl0uZmluZEJ5RW1haWwoZW1haWwpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgICAgIGlmICh1c2VyID09PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGZhbHNlLCBudWxsKTtcbiAgICAgICAgICAgIGlmICghYmNyeXB0LmNvbXBhcmVTeW5jKHBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShmYWxzZSwgbmV3IEVycm9yKCdJbnZhbGlkIHBhc3N3b3JkJykpO1xuICAgICAgICAgICAgdmFyIHVzZXJEZXRhaWxzID0ge1xuICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICAgICAgICByb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIGRvbmUodXNlckRldGFpbHMsIG51bGwpO1xuICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGRvbmUoZmFsc2UsIGVycik7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmVxLmxvZ291dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVxLnNlc3Npb24udG9rZW4gPSBudWxsO1xuICAgIH07XG4gICAgcmVxLmlzc3VlTmV3VG9rZW4gPSBmdW5jdGlvbiAodXNlcikge1xuICAgICAgICB2YXIgdG9rZW4gPSBqc29ud2VidG9rZW5fMS5zaWduKHtcbiAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICAgIHJvbGU6IHVzZXIucm9sZSxcbiAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsXG4gICAgICAgIH0sIGVudi5zZWNyZXQsIHtcbiAgICAgICAgICAgIGV4cGlyZXNJbjogODY0MDBcbiAgICAgICAgfSk7XG4gICAgICAgIHJlcy5zZXRIZWFkZXIoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pO1xuICAgICAgICByZXEuc2Vzc2lvbi50b2tlbiA9IHRva2VuO1xuICAgIH07XG4gICAgbmV4dCgpO1xufSk7XG5yb3V0ZXNfMVtcImRlZmF1bHRcIl0oYXBwKTtcbnNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKGFwcCk7XG5zZXJ2ZXIub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICBzZXJ2ZXIuY2xvc2UoKTtcbn0pO1xuaWYgKCFlbnYuZGlzYWJsZUF1dG9TdGFydCkge1xuICAgIGV4cG9ydHMuc29ja2V0U2VydmVyID0gc29ja2V0U2VydmVyID0gaW5kZXhfMVtcImRlZmF1bHRcIl0oc2VydmVyLCBkYiwgc2Vzc2lvbk1pZGRsZXdhcmUpO1xuICAgIG1vbmdvb3NlLmNvbm5lY3Rpb24ub24oJ2Nvbm5lY3RlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0Nvbm5lY3RlZCB0byBNb25nb0RCIHZpYSBNb25nb29zZScpO1xuICAgICAgICBzZXJ2ZXIubGlzdGVuKHBvcnQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTGlzdGVuaW5nIG9uIHBvcnQgXCIgKyBwb3J0ICsgXCIhXCIpO1xuICAgICAgICAgICAgYXBwLmVtaXQoJ3NlcnZlciBzdGFydGVkJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBzZXJ2ZXI7XG5leHBvcnRzLmNvbm4gPSBtb25nb29zZS5jb25uZWN0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYzJWeWRtVnlMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dmMzSmpMM05sY25abGNpOXpaWEoyWlhJdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZGUVN3eVFrRkJOa0k3UVVGRE4wSXNhVU5CUVcxRE8wRkJRMjVETERKQ1FVRTJRanRCUVVVM1FpeHRRMEZCY1VNN1FVRkRja01zTkVKQlFUaENPMEZCUXpsQ0xEUkRRVUU0UXp0QlFVTTVReXg1UTBGQk1rTTdRVUZETTBNc2QwTkJRVEJETzBGQlF6RkRMR2xEUVVGdFF6dEJRVU51UXl3clFrRkJhVU03UVVGRmFrTXNlVU5CUVRKRE8wRkJRek5ETERaRFFVRnZRenRCUVVOd1F5eEpRVUZOTEdWQlFXVXNSMEZCUnl4UFFVRlBMRU5CUVVNc2EwSkJRV3RDTEVOQlFVTXNRMEZCUXp0QlFVTndSQ3hKUVVGTkxGVkJRVlVzUjBGQlJ5eFBRVUZQTEVOQlFVTXNaVUZCWlN4RFFVRkRMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU03UVVGRmNrUXNiVU5CUVRoQ08wRkJRemxDTERKRFFVRXdRenRCUVVVeFF5eHpRMEZCTkVNN1FVRkROVU1zU1VGQlRTeEhRVUZITEVkQlFVY3NUMEZCVHl4RFFVRkRMRmRCUVZjc1EwRkJReXhEUVVGRE8wRkJSV3BETEVsQlFVMHNSMEZCUnl4SFFVRlJMRTlCUVU4c1JVRkJSU3hEUVVGRE8wRkJjMGxzUWl4clFrRkJSenRCUVhKSldpeEpRVUZOTEVsQlFVa3NSMEZCYjBJc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF6dEJRVU4yUXl4SlFVRkpMRTFCUVcxQ0xFTkJRVU03UVVGRGVFSXNTVUZCU1N4WlFVRTJRaXhEUVVGRE8wRkJiVWx3UWl4dlEwRkJXVHRCUVdwSk1VSXNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhOUVVGTkxFVkJRVVVzWlVGQlpTeEZRVUZGTEVOQlFVTXNRMEZCUXp0QlFVTjBReXhIUVVGSExFTkJRVU1zUjBGQlJ5eERRVUZETEdGQlFXRXNSVUZCUlN4TlFVRk5MRU5CUVVNc1EwRkJRenRCUVVVdlFpeEhRVUZITEVOQlFVTXNSMEZCUnl4RFFVRkRMRmRCUVZjc1JVRkJSU3hEUVVGRExFTkJRVU03UVVGRmRrSXNTVUZCVFN4cFFrRkJhVUlzUjBGQlJ5eFBRVUZQTEVOQlFVTTdTVUZET1VJc1RVRkJUU3hGUVVGRkxFZEJRVWNzUTBGQlF5eE5RVUZOTzBsQlEyeENMRTFCUVUwc1JVRkJSVHRSUVVOS0xFMUJRVTBzUlVGQlJTeEZRVUZGTEVkQlFVY3NSVUZCUlN4SFFVRkhMRVZCUVVVc1IwRkJSeXhKUVVGSk8xRkJRek5DTEZGQlFWRXNSVUZCUlN4SlFVRkpPMUZCUTJRc1RVRkJUU3hGUVVGRkxFZEJRVWNzUTBGQlF5eFZRVUZWTzFGQlEzUkNMRkZCUVZFc1JVRkJSU3hKUVVGSk8wdEJRMnBDTzBsQlEwUXNhVUpCUVdsQ0xFVkJRVVVzU1VGQlNUdEpRVU4yUWl4TlFVRk5MRVZCUVVVc1MwRkJTenRKUVVOaUxFdEJRVXNzUlVGQlJTeEpRVUZKTEZWQlFWVXNRMEZCUXp0UlFVTnNRaXhyUWtGQmEwSXNSVUZCUlN4UlFVRlJMRU5CUVVNc1ZVRkJWVHRMUVVNeFF5eERRVUZETzBOQlEwd3NRMEZCUXl4RFFVRkRPMEZCUlVnc1NVRkJUU3hqUVVGakxFZEJRVWNzU1VGQlNTeERRVUZETzBsQlEzaENMRTFCUVUwc1JVRkJSVHRSUVVOS0xFMUJRVTBzUlVGQlJTeEZRVUZGTEVkQlFVY3NSVUZCUlN4SFFVRkhMRVZCUVVVc1IwRkJSeXhKUVVGSk8xRkJRek5DTEZGQlFWRXNSVUZCUlN4SlFVRkpPMUZCUTJRc1RVRkJUU3hGUVVGRkxFZEJRVWNzUTBGQlF5eFZRVUZWTzFGQlEzUkNMRkZCUVZFc1JVRkJSU3hKUVVGSk8xRkJRMlFzUjBGQlJ5eEZRVUZGTEU5QlFVODdTMEZEWmp0RFFVTktMRU5CUVVNc1EwRkJRVHRCUVVWR0xGRkJRVkVzUTBGQlF5eFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEhkQ1FVRjNRaXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNiMEpCUVc5Q0xFVkJRVVVzUlVGQlJTeGxRVUZsTEVWQlFVVXNTVUZCU1N4RlFVRkZMRU5CUVVNc1EwRkJRenRCUVVOeVNDeFJRVUZSTEVOQlFVTXNWVUZCVlN4RFFVRkRMRVZCUVVVc1EwRkJReXhQUVVGUExFVkJRVVVzVlVGQlV5eEhRVUZITzBsQlEzaERMRTlCUVU4c1EwRkJReXhMUVVGTExFTkJRVU1zTWtKQlFUSkNMRVZCUVVVc1IwRkJSeXhEUVVGRExFTkJRVU03UVVGRGNFUXNRMEZCUXl4RFFVRkRMRU5CUVVNN1FVRkZTQ3hQUVVGUExFTkJRVU1zUlVGQlJTeERRVUZETEZGQlFWRXNSVUZCUlR0SlFVTnFRaXhSUVVGUkxFTkJRVU1zVlVGQlZTeERRVUZETEV0QlFVc3NRMEZCUXp0UlFVTjBRaXhQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEd0RlFVRnJSU3hEUVVGRExFTkJRVU03VVVGRGFFWXNUVUZCVFN4RFFVRkRMRXRCUVVzc1EwRkJRenRaUVVOVUxFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRjRUlzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenRCUVVOUUxFTkJRVU1zUTBGQlF5eERRVUZETzBGQlJVZ3NSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXhwUWtGQmFVSXNRMEZCUXl4RFFVRkRPMEZCUXpOQ0xFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNXVUZCV1N4RFFVRkRMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF5eERRVUZETzBGQlJXeERMRWxCUVVjc1IwRkJSeXhEUVVGRExGZEJRVmNzUlVGQlJUdEpRVU5vUWl4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExHVkJRV1VzUTBGQlF5eERRVUZETzBsQlF6ZENMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zVlVGQlF5eEhRVUZITEVWQlFVVXNSMEZCUnl4RlFVRkZMRWxCUVVrN1VVRkRia0lzUjBGQlJ5eERRVUZETEZOQlFWTXNSMEZCUnl4alFVRmpMRTlCUVU4c1JVRkJSU3hEUVVGQkxFTkJRVU1zUTBGQlF5eERRVUZCTzFGQlEzcERMRTlCUVU4c1NVRkJTU3hGUVVGRkxFTkJRVU03U1VGRGJFSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1EwRkRUanRMUVVGTk8wbEJRMGdzUjBGQlJ5eERRVUZETEVkQlFVY3NRMEZCUXl4alFVRmpMRU5CUVVNc1EwRkJRenREUVVNelFqdEJRVVZFTEVsQlFVa3NSVUZCUlN4SFFVRjNRaXhSUVVGUkxFTkJRVU1zVlVGQlZTeERRVUZETzBGQlEyeEVMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zVlVGQlF5eEhRVUZaTEVWQlFVVXNSMEZCWVN4RlFVRkZMRWxCUVdNN1NVRkRhRVFzUjBGQlJ5eERRVUZETEVWQlFVVXNSMEZCUnl4RlFVRkZMRU5CUVVNN1NVRkRXaXhQUVVGUExFbEJRVWtzUlVGQlJTeERRVUZETzBGQlEyeENMRU5CUVVNc1EwRkJReXhEUVVGQk8wRkJRMFlzUjBGQlJ5eERRVUZETEVkQlFVY3NRMEZCUXl4VlFVRlZMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zUTBGQlF6dEJRVU16UWl4SFFVRkhMRU5CUVVNc1IwRkJSeXhEUVVGRExGVkJRVlVzUTBGQlF5eFZRVUZWTEVOQlFVTXNSVUZCUlN4UlFVRlJMRVZCUVVVc1NVRkJTU3hGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETzBGQlNXNUVMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zVFVGQlRTeEZRVUZGTEVOQlFVTXNRMEZCUXp0QlFVVnNRaXhIUVVGSExFTkJRVU1zUjBGQlJ5eERRVUZETEU5QlFVOHNRMEZCUXl4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eFRRVUZUTEVWQlFVVXNiMEpCUVc5Q0xFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdRVUZGZGtVc1IwRkJSeXhEUVVGRExFZEJRVWNzUTBGQlF5eE5RVUZOTEVWQlFVVXNWVUZCVlN4SFFVRlpMRVZCUVVVc1IwRkJZU3hGUVVGRkxFbEJRV003U1VGRmFrVXNUMEZCVHl4SlFVRkpMRVZCUVVVc1EwRkJRenRCUVVOc1FpeERRVUZETEVOQlFVTXNRMEZCUXp0QlFVTklMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zVlVGQlF5eEhRVUZaTEVWQlFVVXNSMEZCWVN4RlFVRkZMRWxCUVdNN1NVRkRhRVFzUjBGQlJ5eERRVUZETEZsQlFWa3NSMEZCUnl4VlFVRkRMRXRCUVdFc1JVRkRZaXhSUVVGblFpeEZRVU5vUWl4SlFVRXdSRHRSUVVNeFJTeHBRa0ZCU1N4RFFVRkRMRmRCUVZjc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUXl4SlFVRlhPMWxCUTNKRExFbEJRVWtzU1VGQlNTeExRVUZMTEVsQlFVazdaMEpCUVVVc1QwRkJUeXhKUVVGSkxFTkJRVU1zUzBGQlN5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMWxCUXpWRExFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNWMEZCVnl4RFFVRkRMRkZCUVZFc1JVRkJSU3hKUVVGSkxFTkJRVU1zVVVGQlVTeERRVUZETzJkQ1FVRkZMRTlCUVU4c1NVRkJTU3hEUVVGRExFdEJRVXNzUlVGQlJTeEpRVUZKTEV0QlFVc3NRMEZCUXl4clFrRkJhMElzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEY0Vjc1NVRkJTU3hYUVVGWExFZEJRVkU3WjBKQlEyNUNMRXRCUVVzc1JVRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN6dG5Ra0ZEYWtJc1NVRkJTU3hGUVVGRkxFbEJRVWtzUTBGQlF5eEpRVUZKTzJkQ1FVTm1MRWxCUVVrc1JVRkJSU3hKUVVGSkxFTkJRVU1zU1VGQlNUdGhRVU5zUWl4RFFVRkJPMWxCUTBRc1QwRkJUeXhKUVVGSkxFTkJRVU1zVjBGQlZ5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUTI1RExFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVc3NRMEZCUVN4RFFVRkRMRlZCUVVNc1IwRkJWVHRaUVVOb1FpeEpRVUZKTEVOQlFVTXNTMEZCU3l4RlFVRkZMRWRCUVVjc1EwRkJReXhEUVVGRE8xRkJRM0pDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTFBc1EwRkJReXhEUVVGQk8wbEJRMFFzUjBGQlJ5eERRVUZETEUxQlFVMHNSMEZCUnp0UlFVTlVMRWRCUVVjc1EwRkJReXhQUVVGUExFTkJRVU1zUzBGQlN5eEhRVUZITEVsQlFVa3NRMEZCUXp0SlFVTTNRaXhEUVVGRExFTkJRVUU3U1VGRFJDeEhRVUZITEVOQlFVTXNZVUZCWVN4SFFVRkhMRlZCUVVNc1NVRkJWenRSUVVNMVFpeEpRVUZKTEV0QlFVc3NSMEZCVnl4dFFrRkJTU3hEUVVGRE8xbEJRM0pDTEVsQlFVa3NSVUZCUlN4SlFVRkpMRU5CUVVNc1NVRkJTVHRaUVVObUxFbEJRVWtzUlVGQlJTeEpRVUZKTEVOQlFVTXNTVUZCU1R0WlFVTm1MRXRCUVVzc1JVRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN6dFRRVU53UWl4RlFVRkZMRWRCUVVjc1EwRkJReXhOUVVGTkxFVkJRVVU3V1VGRFdDeFRRVUZUTEVWQlFVVXNTMEZCU3p0VFFVTnVRaXhEUVVGRExFTkJRVU03VVVGRFNDeEhRVUZITEVOQlFVTXNVMEZCVXl4RFFVRkRMR2RDUVVGblFpeEZRVUZGTEV0QlFVc3NRMEZCUXl4RFFVRkRPMUZCUTNaRExFZEJRVWNzUTBGQlF5eFBRVUZQTEVOQlFVTXNTMEZCU3l4SFFVRkhMRXRCUVVzc1EwRkJRenRKUVVNNVFpeERRVUZETEVOQlFVRTdTVUZEUkN4SlFVRkpMRVZCUVVVc1EwRkJRenRCUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZETzBGQlJVZ3NiVUpCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dEJRVU5hTEUxQlFVMHNSMEZCUnl4SlFVRkpMRU5CUVVNc1dVRkJXU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzBGQlEyaERMRTFCUVUwc1EwRkJReXhGUVVGRkxFTkJRVU1zVDBGQlR5eEZRVUZGTEZWQlFVTXNSMEZCVlR0SlFVTXhRaXhQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMGxCUTI1Q0xFMUJRVTBzUTBGQlF5eExRVUZMTEVWQlFVVXNRMEZCUXp0QlFVTnVRaXhEUVVGRExFTkJRVU1zUTBGQlFUdEJRVVZHTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1owSkJRV2RDTEVWQlFVVTdTVUZEZGtJc2RVSkJRVUVzV1VGQldTeEhRVUZITEd0Q1FVRlRMRU5CUVVNc1RVRkJUU3hGUVVGRkxFVkJRVVVzUlVGQlJTeHBRa0ZCYVVJc1EwRkJReXhEUVVGRE8wbEJRM2hFTEZGQlFWRXNRMEZCUXl4VlFVRlZMRU5CUVVNc1JVRkJSU3hEUVVGRExGZEJRVmNzUlVGQlJUdFJRVU5vUXl4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExHMURRVUZ0UXl4RFFVRkRMRU5CUVVNN1VVRkRha1FzVFVGQlRTeERRVUZETEUxQlFVMHNRMEZCUXl4SlFVRkpMRVZCUVVVN1dVRkRhRUlzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4MVFrRkJjVUlzU1VGQlNTeE5RVUZITEVOQlFVTXNRMEZCUXp0WlFVTXhReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEdkQ1FVRm5RaXhEUVVGRExFTkJRVU03VVVGREwwSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dERRVU5PTzBGQlJVUXNjVUpCUVdVc1RVRkJUU3hEUVVGRE8wRkJRMVFzVVVGQlFTeEpRVUZKTEVkQlFVY3NVVUZCVVN4RFFVRkRMRlZCUVZVc1EwRkJReUo5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIHNvY2tldGlvID0gcmVxdWlyZShcInNvY2tldC5pb1wiKTtcbnZhciBNZXNzYWdlXzEgPSByZXF1aXJlKFwiLi4vbW9kZWxzL01lc3NhZ2VcIik7XG52YXIgYXV0aG9yaXplZF8xID0gcmVxdWlyZShcIi4uL21pZGRsZXdhcmUvYXV0aG9yaXplZFwiKTtcbnZhciBlbnYgPSByZXF1aXJlKCcuLi8uLi8uLi9lbnYnKTtcbnZhciBpbml0ID0gZnVuY3Rpb24gKHNlcnZlciwgZGIsIHNlc3Npb25NaWRkbGV3YXJlKSB7XG4gICAgdmFyIGlvID0gc29ja2V0aW8oc2VydmVyKTtcbiAgICB2YXIgY29ubmVjdGVkVXNlckVtYWlscyA9IFtdO1xuICAgIGlvLnVzZShmdW5jdGlvbiAoc29ja2V0LCBuZXh0KSB7XG4gICAgICAgIHNlc3Npb25NaWRkbGV3YXJlKHNvY2tldC5yZXF1ZXN0LCB7fSwgbmV4dCk7XG4gICAgfSk7XG4gICAgaW8udXNlKGZ1bmN0aW9uIChzb2NrZXQsIG5leHQpIHtcbiAgICAgICAgYXV0aG9yaXplZF8xW1wiZGVmYXVsdFwiXShzb2NrZXQucmVxdWVzdCwge30sIG5leHQpO1xuICAgIH0pO1xuICAgIGlvLnVzZShmdW5jdGlvbiAoc29ja2V0LCBuZXh0KSB7XG4gICAgICAgIGlmICghc29ja2V0LnJlcXVlc3QudXNlcilcbiAgICAgICAgICAgIHJldHVybiBzb2NrZXQuZGlzY29ubmVjdCgpO1xuICAgICAgICBuZXh0KCk7XG4gICAgfSk7XG4gICAgaW8ub24oJ2Nvbm5lY3Rpb24nLCBmdW5jdGlvbiAoc29ja2V0KSB7XG4gICAgICAgIGNvbm5lY3RlZFVzZXJFbWFpbHMucHVzaChzb2NrZXQucmVxdWVzdC51c2VyLmVtYWlsKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0Nvbm5lY3RlZCB1c2VycycsIGNvbm5lY3RlZFVzZXJFbWFpbHMpO1xuICAgICAgICBpby5lbWl0KCdjb25uZWN0ZWQgdXNlcnMnLCBjb25uZWN0ZWRVc2VyRW1haWxzKTtcbiAgICAgICAgc29ja2V0Lm9uKCdkaXNjb25uZWN0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29ubmVjdGVkVXNlckVtYWlscy5zcGxpY2UoY29ubmVjdGVkVXNlckVtYWlscy5pbmRleE9mKHNvY2tldC5yZXF1ZXN0LnVzZXIuZW1haWwpLCAxKTtcbiAgICAgICAgICAgIGlvLmVtaXQoJ2Nvbm5lY3RlZCB1c2VycycsIGNvbm5lY3RlZFVzZXJFbWFpbHMpO1xuICAgICAgICB9KTtcbiAgICAgICAgc29ja2V0Lm9uKCdtZXNzYWdlJywgZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICAgICAgdmFyIG0gPSBuZXcgTWVzc2FnZV8xW1wiZGVmYXVsdFwiXSh7XG4gICAgICAgICAgICAgICAgY2hhbm5lbDogbWVzc2FnZS5jaGFubmVsLFxuICAgICAgICAgICAgICAgIHRleHQ6IG1lc3NhZ2UudGV4dCxcbiAgICAgICAgICAgICAgICB1c2VyRW1haWw6IHNvY2tldC5yZXF1ZXN0LnVzZXIuZW1haWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbS5zYXZlKCkudGhlbihmdW5jdGlvbiAobSkge1xuICAgICAgICAgICAgICAgIGlvLmVtaXQoJ21lc3NhZ2UnLCB7XG4gICAgICAgICAgICAgICAgICAgIF9pZDogbS5faWQsXG4gICAgICAgICAgICAgICAgICAgIHVzZXJFbWFpbDogbS51c2VyRW1haWwsXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IG0udGV4dCxcbiAgICAgICAgICAgICAgICAgICAgY2hhbm5lbDogbS5jaGFubmVsLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkOiBtLmNyZWF0ZWRBdFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KCdtZXNzYWdlIHJlY2VpdmVkJyk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoJ21lc3NhZ2UgcmVjZWl2ZSBlcnJvcicsIGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGlvO1xufTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gaW5pdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFXNWtaWGd1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk4dUxpOHVMaTl6Y21NdmMyVnlkbVZ5TDNOdlkydGxkQzVwYnk5cGJtUmxlQzUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3p0QlFVRkJMRzlEUVVGelF6dEJRVWQwUXl3MlEwRkJjMFE3UVVGRmRFUXNkVVJCUVRSRU8wRkJSVFZFTEVsQlFVMHNSMEZCUnl4SFFVRkhMRTlCUVU4c1EwRkJReXhqUVVGakxFTkJRVU1zUTBGQlF6dEJRVTF3UXl4SlFVRk5MRWxCUVVrc1IwRkJSeXhWUVVGRExFMUJRV01zUlVGQlJTeEZRVUZqTEVWQlFVVXNhVUpCUVhOQ08wbEJRMmhGTEVsQlFVMHNSVUZCUlN4SFFVRnZRaXhSUVVGUkxFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTTdTVUZETjBNc1NVRkJTU3h0UWtGQmJVSXNSMEZCWVN4RlFVRkZMRU5CUVVNN1NVRkZka01zUlVGQlJTeERRVUZETEVkQlFVY3NRMEZCUXl4VlFVRkRMRTFCUVUwc1JVRkJSU3hKUVVGSk8xRkJRMmhDTEdsQ1FVRnBRaXhEUVVGRExFMUJRVTBzUTBGQlF5eFBRVUZQTEVWQlFVVXNSVUZCUlN4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRE8wbEJRMmhFTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTBnc1JVRkJSU3hEUVVGRExFZEJRVWNzUTBGQlF5eFZRVUZETEUxQlFVMHNSVUZCUlN4SlFVRkpPMUZCUldoQ0xIVkNRVUZ2UWl4RFFVRkRMRTFCUVUwc1EwRkJReXhQUVVGUExFVkJRVVVzUlVGQlJTeEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMGxCUTI1RUxFTkJRVU1zUTBGQlF5eERRVUZCTzBsQlEwWXNSVUZCUlN4RFFVRkRMRWRCUVVjc1EwRkJReXhWUVVGRExFMUJRVTBzUlVGQlJTeEpRVUZKTzFGQlEyaENMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVazdXVUZEY0VJc1QwRkJUeXhOUVVGTkxFTkJRVU1zVlVGQlZTeEZRVUZGTEVOQlFVTTdVVUZETDBJc1NVRkJTU3hGUVVGRkxFTkJRVU03U1VGRFdDeERRVUZETEVOQlFVTXNRMEZCUVR0SlFVZEdMRVZCUVVVc1EwRkJReXhGUVVGRkxFTkJRVU1zV1VGQldTeEZRVUZGTEZWQlFVTXNUVUZCWXp0UlFVTXZRaXh0UWtGQmJVSXNRMEZCUXl4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRExFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN1VVRkRjRVFzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4cFFrRkJhVUlzUlVGQlJTeHRRa0ZCYlVJc1EwRkJReXhEUVVGRE8xRkJRM0JFTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc2FVSkJRV2xDTEVWQlFVVXNiVUpCUVcxQ0xFTkJRVU1zUTBGQlF6dFJRVVZvUkN4TlFVRk5MRU5CUVVNc1JVRkJSU3hEUVVGRExGbEJRVmtzUlVGQlJUdFpRVU53UWl4dFFrRkJiVUlzUTBGQlF5eE5RVUZOTEVOQlFVTXNiVUpCUVcxQ0xFTkJRVU1zVDBGQlR5eERRVUZETEUxQlFVMHNRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTNSR0xFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNhVUpCUVdsQ0xFVkJRVVVzYlVKQlFXMUNMRU5CUVVNc1EwRkJRenRSUVVOd1JDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVVklMRTFCUVUwc1EwRkJReXhGUVVGRkxFTkJRVU1zVTBGQlV5eEZRVUZGTEZWQlFVTXNUMEZCTUVNN1dVRkROVVFzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4UFFVRlBMRU5CUVVNc1EwRkJRenRaUVVOeVFpeEpRVUZKTEVOQlFVTXNSMEZCWVN4SlFVRkpMRzlDUVVGUExFTkJRVU03WjBKQlF6RkNMRTlCUVU4c1JVRkJSU3hQUVVGUExFTkJRVU1zVDBGQlR6dG5Ra0ZEZUVJc1NVRkJTU3hGUVVGRkxFOUJRVThzUTBGQlF5eEpRVUZKTzJkQ1FVTnNRaXhUUVVGVExFVkJRVVVzVFVGQlRTeERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTenRoUVVOMlF5eERRVUZETEVOQlFVTTdXVUZEU0N4RFFVRkRMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFVTXNRMEZCVnp0blFrRkRkRUlzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4VFFVRlRMRVZCUVVVN2IwSkJRMllzUjBGQlJ5eEZRVUZGTEVOQlFVTXNRMEZCUXl4SFFVRkhPMjlDUVVOV0xGTkJRVk1zUlVGQlJTeERRVUZETEVOQlFVTXNVMEZCVXp0dlFrRkRkRUlzU1VGQlNTeEZRVUZGTEVOQlFVTXNRMEZCUXl4SlFVRkpPMjlDUVVOYUxFOUJRVThzUlVGQlJTeERRVUZETEVOQlFVTXNUMEZCVHp0dlFrRkRiRUlzVDBGQlR5eEZRVUZGTEVOQlFVTXNRMEZCUXl4VFFVRlRPMmxDUVVOMlFpeERRVUZETEVOQlFVTTdaMEpCUTBnc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eHJRa0ZCYTBJc1EwRkJReXhEUVVGRE8xbEJRM0JETEVOQlFVTXNRMEZCUXl4RFFVRkRMRTlCUVVzc1EwRkJRU3hEUVVGRExGVkJRVU1zUjBGQlZUdG5Ra0ZEYUVJc1QwRkJUeXhEUVVGRExFdEJRVXNzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0blFrRkRia0lzVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4MVFrRkJkVUlzUlVGQlJTeEhRVUZITEVOQlFVTXNRMEZCUXp0WlFVTTVReXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5RTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTFBc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFNDeFBRVUZQTEVWQlFVVXNRMEZCUXp0QlFVTmtMRU5CUVVNc1EwRkJRVHRCUVVWRUxIRkNRVUZsTEVsQlFVa3NRMEZCUXlKOSIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbnZhciBfdGhpcyA9IHRoaXM7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIGF4aW9zXzEgPSByZXF1aXJlKFwiYXhpb3NcIik7XG52YXIgbm90aWZpY2F0aW9uc0FjdGlvbnNfMSA9IHJlcXVpcmUoXCIuL25vdGlmaWNhdGlvbnNBY3Rpb25zXCIpO1xuZXhwb3J0cy5BRERfQ0hBTk5FTFMgPSAnQUREX0NIQU5ORUxTJztcbmV4cG9ydHMuU0VUX0NIQU5ORUxfRkVUQ0hJTkdfTkVXX01FU1NBR0VTID0gJ1NFVF9DSEFOTkVMX0ZFVENISU5HX05FV19NRVNTQUdFUyc7XG5leHBvcnRzLlNFVF9DSEFOTkVMX0hBU19NT1JFX01FU1NBR0VTID0gJ1NFVF9DSEFOTkVMX0hBU19NT1JFX01FU1NBR0UnO1xuZXhwb3J0cy5BRERfUkVDRUlWRURfQ0hBTk5FTF9NRVNTQUdFID0gJ0FERF9SRUNFSVZFRF9DSEFOTkVMX01FU1NBR0UnO1xuZXhwb3J0cy5BRERfUkVUUklFVkVEX0NIQU5ORUxfTUVTU0FHRVMgPSAnQUREX1JFVFJJRVZFRF9DSEFOTkVMX01FU1NBR0VTJztcbmV4cG9ydHMuSU5DUkVNRU5UX0NIQU5ORUxfUkVUUklFVkVfTUVTU0FHRVNfT0ZGU0VUID0gJ0lOQ1JFTUVOVF9DSEFOTkVMX1JFVFJJRVZFX01FU1NBR0VTX09GRlNFVCc7XG5leHBvcnRzLlJFVFJJRVZFX0NIQU5ORUxfTUVTU0FHRVMgPSAnUkVUUklFVkVfQ0hBTk5FTF9NRVNTQUdFUyc7XG5leHBvcnRzLkNMRUFSX0NIQU5ORUxTX0RBVEEgPSAnQ0xFQVJfQ0hBTk5FTFNfREFUQSc7XG5leHBvcnRzLmFkZENoYW5uZWxzID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lcykge1xuICAgIHZhciBjaGFubmVscyA9IFtdO1xuICAgIGNoYW5uZWxOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIGNoYW5uZWxzLnB1c2goe1xuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIG1lc3NhZ2VzOiBbXSxcbiAgICAgICAgICAgIHJldHJpZXZlTWVzc2FnZXNPZmZzZXQ6IDAsXG4gICAgICAgICAgICBoYXNNb3JlTWVzc2FnZXM6IHRydWUsXG4gICAgICAgICAgICBmZXRjaGluZ05ld01lc3NhZ2VzOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBleHBvcnRzLkFERF9DSEFOTkVMUyxcbiAgICAgICAgZGF0YTogeyBjaGFubmVsczogY2hhbm5lbHMgfVxuICAgIH07XG59O1xuZXhwb3J0cy5pbmNyZW1lbnRDaGFubmVsUmV0cmlldmVNZXNzYWdlc09mZnNldCA9IGZ1bmN0aW9uIChjaGFubmVsLCBuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXhwb3J0cy5JTkNSRU1FTlRfQ0hBTk5FTF9SRVRSSUVWRV9NRVNTQUdFU19PRkZTRVQsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGNoYW5uZWw6IGNoYW5uZWwsXG4gICAgICAgICAgICBpbmNyZW1lbnQ6IG5cbiAgICAgICAgfVxuICAgIH07XG59O1xuZXhwb3J0cy5zZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcyA9IGZ1bmN0aW9uIChjaGFubmVsLCBpc0ZldGNoaW5nKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXhwb3J0cy5TRVRfQ0hBTk5FTF9GRVRDSElOR19ORVdfTUVTU0FHRVMsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGNoYW5uZWxOYW1lOiBjaGFubmVsLFxuICAgICAgICAgICAgaXNGZXRjaGluZzogaXNGZXRjaGluZ1xuICAgICAgICB9XG4gICAgfTtcbn07XG5leHBvcnRzLnNldENoYW5uZWxIYXNNb3JlTWVzc2FnZXMgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWUsIGhhc01vcmUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBleHBvcnRzLlNFVF9DSEFOTkVMX0hBU19NT1JFX01FU1NBR0VTLFxuICAgICAgICBkYXRhOiB7IGNoYW5uZWxOYW1lOiBjaGFubmVsTmFtZSwgaGFzTW9yZTogaGFzTW9yZSB9XG4gICAgfTtcbn07XG5leHBvcnRzLmFkZFJlY2VpdmVkQ2hhbm5lbE1lc3NhZ2UgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWUsIG1lc3NhZ2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBleHBvcnRzLkFERF9SRUNFSVZFRF9DSEFOTkVMX01FU1NBR0UsXG4gICAgICAgIGRhdGE6IHsgbWVzc2FnZTogbWVzc2FnZSwgY2hhbm5lbE5hbWU6IGNoYW5uZWxOYW1lIH1cbiAgICB9O1xufTtcbmV4cG9ydHMuYWRkUmV0cmlldmVkQ2hhbm5lbE1lc3NhZ2VzID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lLCBtZXNzYWdlcykge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV4cG9ydHMuQUREX1JFVFJJRVZFRF9DSEFOTkVMX01FU1NBR0VTLFxuICAgICAgICBkYXRhOiB7IGNoYW5uZWxOYW1lOiBjaGFubmVsTmFtZSwgbWVzc2FnZXM6IG1lc3NhZ2VzIH1cbiAgICB9O1xufTtcbmV4cG9ydHMuY2xlYXJDaGFubmVsc0RhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXhwb3J0cy5DTEVBUl9DSEFOTkVMU19EQVRBXG4gICAgfTtcbn07XG5leHBvcnRzLmZldGNoQ2hhbm5lbHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkaXNwYXRjaCkge1xuICAgICAgICByZXR1cm4gYXhpb3NfMVtcImRlZmF1bHRcIl0uZ2V0KCcvYXBpL3YxL2NoYW5uZWxzJykudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICB2YXIgY2hhbm5lbHMgPSByZXMuZGF0YS5jaGFubmVscy5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYy5uYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2goZXhwb3J0cy5hZGRDaGFubmVscyhjaGFubmVscykpO1xuICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gZmV0Y2ggdGhlIGNoYW5uZWxzJykpO1xuICAgICAgICB9KTtcbiAgICB9O1xufTtcbmV4cG9ydHMucmV0cmlldmVDaGFubmVsTWVzc2FnZXMgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2hhbm5lbDtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgY2hhbm5lbCA9IGdldFN0YXRlKCkuY2hhbm5lbHMuZmluZChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIHJldHVybiBjLm5hbWUgPT09IGNoYW5uZWxOYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWNoYW5uZWwgfHwgY2hhbm5lbC5mZXRjaGluZ05ld01lc3NhZ2VzIHx8ICFjaGFubmVsLmhhc01vcmVNZXNzYWdlcykge1xuICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBmZXRjaCBtZXNzYWdlcycpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIsIFByb21pc2UucmVzb2x2ZSgnUmV0cmlldmUgQ2hhbm5lbCBNZXNzYWdlcyBkaXNwYXRjaGVkIHdpdGggaW5jb3JyZWN0IGNoYW5uZWwgbmFtZSBvciB3aGlsZSBhbHJlYWR5IGZldGNoaW5nIG1lc3NhZ2VzJyldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGlzcGF0Y2goZXhwb3J0cy5zZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcyhjaGFubmVsLm5hbWUsIHRydWUpKTtcbiAgICAgICAgICAgIHJldHVybiBbMiwgYXhpb3NfMVtcImRlZmF1bHRcIl0uZ2V0KCcvYXBpL3YxL21lc3NhZ2VzLycgKyBjaGFubmVsLm5hbWUgKyAnLycgKyBjaGFubmVsLnJldHJpZXZlTWVzc2FnZXNPZmZzZXQpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEubWVzc2FnZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChleHBvcnRzLnNldENoYW5uZWxIYXNNb3JlTWVzc2FnZXMoY2hhbm5lbC5uYW1lLCBmYWxzZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChleHBvcnRzLmluY3JlbWVudENoYW5uZWxSZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0KGNoYW5uZWxOYW1lLCByZXMuZGF0YS5tZXNzYWdlcy5sZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goZXhwb3J0cy5hZGRSZXRyaWV2ZWRDaGFubmVsTWVzc2FnZXMoY2hhbm5lbC5uYW1lLCByZXMuZGF0YS5tZXNzYWdlcykpO1xuICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gZmV0Y2ggbWVzc2FnZXMnKSk7XG4gICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkaXNwYXRjaChleHBvcnRzLnNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzKGNoYW5uZWwubmFtZSwgZmFsc2UpKTtcbiAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgIH0pO1xuICAgIH0pOyB9O1xufTtcbmV4cG9ydHMuZGVsZXRlQ2hhbm5lbCA9IGZ1bmN0aW9uIChjaGFubmVsTmFtZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZGlzcGF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIGF4aW9zXzFbXCJkZWZhdWx0XCJdLmdldCgnL2FwaS92MS9jaGFubmVsL2RlbGV0ZS8nICsgY2hhbm5lbE5hbWUpLlxuICAgICAgICAgICAgdGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEluZm8oJ0NoYW5uZWwgZGVsZXRlZCcpKTtcbiAgICAgICAgICAgIHJldHVybiBkaXNwYXRjaChleHBvcnRzLmZldGNoQ2hhbm5lbHMoKSk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG5leHBvcnRzLmFkZENoYW5uZWwgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRpc3BhdGNoKSB7XG4gICAgICAgIHJldHVybiBheGlvc18xW1wiZGVmYXVsdFwiXS5wb3N0KCcvYXBpL3YxL2NoYW5uZWwvY3JlYXRlJywge1xuICAgICAgICAgICAgY2hhbm5lbE5hbWU6IGNoYW5uZWxOYW1lXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRJbmZvKCdDaGFubmVsIGNyZWF0ZWQnKSk7XG4gICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2goZXhwb3J0cy5mZXRjaENoYW5uZWxzKCkpO1xuICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKGVyci5yZXNwb25zZS5kYXRhLmVycm9yKSk7XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWTJoaGJtNWxiSE5CWTNScGIyNXpMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dkxpNHZjM0pqTDNkbFlpOWhZM1JwYjI1ekwyTm9ZVzV1Wld4elFXTjBhVzl1Y3k1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN1FVRkJRU3hwUWtFNFNVRTdPMEZCTjBsQkxDdENRVUY1UkR0QlFVVjZSQ3dyUkVGQmVVUTdRVUZGTlVNc1VVRkJRU3haUVVGWkxFZEJRVWNzWTBGQll5eERRVUZETzBGQlF6bENMRkZCUVVFc2FVTkJRV2xETEVkQlFVY3NiVU5CUVcxRExFTkJRVU03UVVGRGVFVXNVVUZCUVN3MlFrRkJOa0lzUjBGQlJ5dzRRa0ZCT0VJc1EwRkJRenRCUVVNdlJDeFJRVUZCTERSQ1FVRTBRaXhIUVVGSExEaENRVUU0UWl4RFFVRkRPMEZCUXpsRUxGRkJRVUVzT0VKQlFUaENMRWRCUVVjc1owTkJRV2RETEVOQlFVTTdRVUZEYkVVc1VVRkJRU3d3UTBGQk1FTXNSMEZCUnl3MFEwRkJORU1zUTBGQlF6dEJRVU14Uml4UlFVRkJMSGxDUVVGNVFpeEhRVUZITERKQ1FVRXlRaXhEUVVGRE8wRkJRM2hFTEZGQlFVRXNiVUpCUVcxQ0xFZEJRVWNzY1VKQlFYRkNMRU5CUVVNN1FVRkZOVU1zVVVGQlFTeFhRVUZYTEVkQlFVY3NWVUZCUXl4WlFVRnpRanRKUVVNNVF5eEpRVUZKTEZGQlFWRXNSMEZCVlN4RlFVRkZMRU5CUVVNN1NVRkRla0lzV1VGQldTeERRVUZETEU5QlFVOHNRMEZCUXl4VlFVRkRMRWxCUVZrN1VVRkRPVUlzVVVGQlVTeERRVUZETEVsQlFVa3NRMEZCUXp0WlFVTldMRWxCUVVrc1JVRkJSU3hKUVVGSk8xbEJRMVlzVVVGQlVTeEZRVUZGTEVWQlFVVTdXVUZEV2l4elFrRkJjMElzUlVGQlJTeERRVUZETzFsQlEzcENMR1ZCUVdVc1JVRkJSU3hKUVVGSk8xbEJRM0pDTEcxQ1FVRnRRaXhGUVVGRkxFdEJRVXM3VTBGRE4wSXNRMEZCUXl4RFFVRkRPMGxCUTFBc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFNDeFBRVUZQTzFGQlEwZ3NTVUZCU1N4RlFVRkZMRzlDUVVGWk8xRkJRMnhDTEVsQlFVa3NSVUZCUlN4RlFVRkZMRkZCUVZFc1JVRkJSU3hSUVVGUkxFVkJRVVU3UzBGREwwSXNRMEZCUXp0QlFVTk9MRU5CUVVNc1EwRkJRVHRCUVVWWkxGRkJRVUVzYzBOQlFYTkRMRWRCUVVjc1ZVRkJReXhQUVVGbExFVkJRVVVzUTBGQlV6dEpRVU0zUlN4UFFVRlBPMUZCUTBnc1NVRkJTU3hGUVVGRkxHdEVRVUV3UXp0UlFVTm9SQ3hKUVVGSkxFVkJRVVU3V1VGRFJpeFBRVUZQTEVWQlFVVXNUMEZCVHp0WlFVTm9RaXhUUVVGVExFVkJRVVVzUTBGQlF6dFRRVU5tTzB0QlEwb3NRMEZCUXp0QlFVTk9MRU5CUVVNc1EwRkJRVHRCUVVWWkxGRkJRVUVzTmtKQlFUWkNMRWRCUVVjc1ZVRkJReXhQUVVGbExFVkJRVVVzVlVGQmJVSTdTVUZET1VVc1QwRkJUenRSUVVOSUxFbEJRVWtzUlVGQlJTeDVRMEZCYVVNN1VVRkRka01zU1VGQlNTeEZRVUZGTzFsQlEwWXNWMEZCVnl4RlFVRkZMRTlCUVU4N1dVRkRjRUlzVlVGQlZTeEZRVUZGTEZWQlFWVTdVMEZEZWtJN1MwRkRTaXhEUVVGRE8wRkJRMDRzUTBGQlF5eERRVUZCTzBGQlJWa3NVVUZCUVN4NVFrRkJlVUlzUjBGQlJ5eFZRVUZETEZkQlFXMUNMRVZCUVVVc1QwRkJaMEk3U1VGRE0wVXNUMEZCVHp0UlFVTklMRWxCUVVrc1JVRkJSU3h4UTBGQk5rSTdVVUZEYmtNc1NVRkJTU3hGUVVGRkxFVkJRVVVzVjBGQlZ5eEZRVUZGTEZkQlFWY3NSVUZCUlN4UFFVRlBMRVZCUVVVc1QwRkJUeXhGUVVGRk8wdEJRM1pFTEVOQlFVTTdRVUZEVGl4RFFVRkRMRU5CUVVFN1FVRkZXU3hSUVVGQkxIbENRVUY1UWl4SFFVRkhMRlZCUVVNc1YwRkJiVUlzUlVGQlJTeFBRVUZuUWp0SlFVTXpSU3hQUVVGUE8xRkJRMGdzU1VGQlNTeEZRVUZGTEc5RFFVRTBRanRSUVVOc1F5eEpRVUZKTEVWQlFVVXNSVUZCUlN4UFFVRlBMRVZCUVVVc1QwRkJUeXhGUVVGRkxGZEJRVmNzUlVGQlJTeFhRVUZYTEVWQlFVVTdTMEZEZGtRc1EwRkJRenRCUVVOT0xFTkJRVU1zUTBGQlFUdEJRVVZaTEZGQlFVRXNNa0pCUVRKQ0xFZEJRVWNzVlVGQlF5eFhRVUZ0UWl4RlFVRkZMRkZCUVcxQ08wbEJRMmhHTEU5QlFVODdVVUZEU0N4SlFVRkpMRVZCUVVVc2MwTkJRVGhDTzFGQlEzQkRMRWxCUVVrc1JVRkJSU3hGUVVGRExGZEJRVmNzUlVGQlJTeFhRVUZYTEVWQlFVVXNVVUZCVVN4RlFVRkZMRkZCUVZFc1JVRkJRenRMUVVOMlJDeERRVUZETzBGQlEwNHNRMEZCUXl4RFFVRkJPMEZCUlZrc1VVRkJRU3hwUWtGQmFVSXNSMEZCUnp0SlFVTTNRaXhQUVVGUE8xRkJRMGdzU1VGQlNTeEZRVUZGTERKQ1FVRnRRanRMUVVNMVFpeERRVUZCTzBGQlEwd3NRMEZCUXl4RFFVRkJPMEZCU1Zrc1VVRkJRU3hoUVVGaExFZEJRVWM3U1VGRGVrSXNUMEZCVHl4VlFVRkRMRkZCUVdFN1VVRkRha0lzVDBGQlR5eHJRa0ZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhyUWtGQmEwSXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGRExFZEJRV3RDTzFsQlEzcEVMRWxCUVVrc1VVRkJVU3hIUVVGSExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRMRWRCUVVjc1EwRkJSU3hWUVVGRExFTkJRVGhDTzJkQ1FVTnFSU3hQUVVGUExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTTdXVUZEYkVJc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRFNDeFBRVUZQTEZGQlFWRXNRMEZCUXl4dFFrRkJWeXhEUVVGRExGRkJRVkVzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZETTBNc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlN5eERRVUZCTEVOQlFVTXNWVUZCUXl4SFFVRmxPMWxCUTNKQ0xFOUJRVThzVVVGQlVTeERRVUZETEN0Q1FVRlJMRU5CUVVNc2VVUkJRWGxFTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTNwR0xFTkJRVU1zUTBGQlF5eERRVUZETzBsQlExQXNRMEZCUXl4RFFVRkJPMEZCUTB3c1EwRkJReXhEUVVGQk8wRkJSVmtzVVVGQlFTeDFRa0ZCZFVJc1IwRkJSeXhWUVVGRExGZEJRVzFDTzBsQlEzWkVMRTlCUVU4c1ZVRkJUeXhSUVVGaExFVkJRVVVzVVVGQllUczdPMWxCUTJ4RExFOUJRVThzUjBGQldTeFJRVUZSTEVWQlFVVXNRMEZCUXl4UlFVRlJMRU5CUVVNc1NVRkJTU3hEUVVGRkxGVkJRVU1zUTBGQlZUdG5Ra0ZEZUVRc1QwRkJUeXhEUVVGRExFTkJRVU1zU1VGQlNTeExRVUZMTEZkQlFWY3NRMEZCUXp0WlFVTnNReXhEUVVGRExFTkJRVU1zUTBGQlFUdFpRVU5HTEVsQlFVa3NRMEZCUXl4UFFVRlBMRWxCUVVrc1QwRkJUeXhEUVVGRExHMUNRVUZ0UWl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExHVkJRV1VzUlVGQlJUdG5Ra0ZEY2tVc1VVRkJVU3hEUVVGRExDdENRVUZSTEVOQlFVTXNjVVJCUVhGRUxFTkJRVU1zUTBGQlF5eERRVUZETzJkQ1FVTXhSU3hYUVVGUExFOUJRVThzUTBGQlF5eFBRVUZQTEVOQlFVTXNjVWRCUVhGSExFTkJRVU1zUlVGQlF6dGhRVU5xU1R0WlFVTkVMRkZCUVZFc1EwRkJReXh4UTBGQk5rSXNRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZETlVRc1YwRkJUeXhyUWtGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4dFFrRkJiVUlzUjBGQlJ5eFBRVUZQTEVOQlFVTXNTVUZCU1N4SFFVRkhMRWRCUVVjc1IwRkJSeXhQUVVGUExFTkJRVU1zYzBKQlFYTkNMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlF5eEhRVUZyUWp0dlFrRkRhRWdzU1VGQlNTeEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRkZCUVZFc1EwRkJReXhOUVVGTkxFdEJRVXNzUTBGQlF5eEZRVUZGTzNkQ1FVTm9ReXhSUVVGUkxFTkJRVU1zYVVOQlFYbENMRU5CUVVNc1QwRkJUeXhEUVVGRExFbEJRVWtzUlVGQlJTeExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRPM2RDUVVONlJDeFBRVUZQTEVkQlFVY3NRMEZCUXp0eFFrRkRaRHR2UWtGRFJDeFJRVUZSTEVOQlFVTXNPRU5CUVhORExFTkJRVU1zVjBGQlZ5eEZRVUZGTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZETEVOQlFVTTdiMEpCUTNoR0xGRkJRVkVzUTBGQlF5eHRRMEZCTWtJc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeEZRVUZGTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU1zUTBGQlFUdG5Ra0ZETVVVc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlN5eERRVUZCTEVOQlFVTXNWVUZCUXl4SFFVRmxPMjlDUVVOeVFpeFJRVUZSTEVOQlFVTXNLMEpCUVZFc1EwRkJReXh4UkVGQmNVUXNRMEZCUXl4RFFVRkRMRU5CUVVNN1owSkJRemxGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJRenR2UWtGRFNpeFBRVUZQTEZGQlFWRXNRMEZCUXl4eFEwRkJOa0lzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RlFVRkZMRXRCUVVzc1EwRkJReXhEUVVGRExFTkJRVU03WjBKQlEzaEZMRU5CUVVNc1EwRkJReXhGUVVGRE96dFRRVU5PTEVOQlFVRTdRVUZEVEN4RFFVRkRMRU5CUVVFN1FVRkZXU3hSUVVGQkxHRkJRV0VzUjBGQlJ5eFZRVUZETEZkQlFXMUNPMGxCUXpkRExFOUJRVThzVlVGQlF5eFJRVUZoTzFGQlEycENMRTlCUVU4c2EwSkJRVXNzUTBGQlF5eEhRVUZITEVOQlFVTXNlVUpCUVhsQ0xFZEJRVWNzVjBGQlZ5eERRVUZETzFsQlEzSkVMRWxCUVVrc1EwRkJReXhWUVVGRExFZEJRV3RDTzFsQlEzQkNMRkZCUVZFc1EwRkJReXc0UWtGQlR5eERRVUZETEdsQ1FVRnBRaXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU55UXl4UFFVRlBMRkZCUVZFc1EwRkJReXh4UWtGQllTeEZRVUZGTEVOQlFVTXNRMEZCUXp0UlFVTnlReXhEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZMTEVOQlFVRXNRMEZCUXl4VlFVRkRMRWRCUVdVN1dVRkRja0lzVDBGQlR5eFJRVUZSTEVOQlFVTXNLMEpCUVZFc1EwRkJReXhIUVVGSExFTkJRVU1zVVVGQlVTeERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRM1pFTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTFnc1EwRkJReXhEUVVGRE8wRkJRMDRzUTBGQlF5eERRVUZCTzBGQlJWa3NVVUZCUVN4VlFVRlZMRWRCUVVjc1ZVRkJReXhYUVVGdFFqdEpRVU14UXl4UFFVRlBMRlZCUVVNc1VVRkJZVHRSUVVOcVFpeFBRVUZQTEd0Q1FVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExIZENRVUYzUWl4RlFVRkZPMWxCUTNoRExGZEJRVmNzUlVGQlJTeFhRVUZYTzFOQlF6TkNMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlF5eEhRVUZyUWp0WlFVTjJRaXhSUVVGUkxFTkJRVU1zT0VKQlFVOHNRMEZCUXl4cFFrRkJhVUlzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEY2tNc1QwRkJUeXhSUVVGUkxFTkJRVU1zY1VKQlFXRXNSVUZCUlN4RFFVRkRMRU5CUVVNN1VVRkRja01zUTBGQlF5eERRVUZETEVOQlFVTXNUMEZCU3l4RFFVRkJMRU5CUVVNc1ZVRkJReXhIUVVGbE8xbEJRM0pDTEU5QlFVOHNVVUZCVVN4RFFVRkRMQ3RDUVVGUkxFTkJRVU1zUjBGQlJ5eERRVUZETEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU4yUkN4RFFVRkRMRU5CUVVNc1EwRkJRVHRKUVVOT0xFTkJRVU1zUTBGQlF6dEJRVU5PTEVOQlFVTXNRMEZCUVNKOSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBheGlvc18xID0gcmVxdWlyZShcImF4aW9zXCIpO1xudmFyIG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEgPSByZXF1aXJlKFwiLi9ub3RpZmljYXRpb25zQWN0aW9uc1wiKTtcbmV4cG9ydHMuVVBEQVRFX0NIQVRfVVNFUlMgPSAnVVBEQVRFX0NIQVRfVVNFUlMnO1xuZXhwb3J0cy5BRERfQ0hBVF9VU0VSID0gJ0FERF9VU0VSJztcbmV4cG9ydHMuUkVNT1ZFX0NIQVRfVVNFUiA9ICdSRU1PVkVfVVNFUic7XG5leHBvcnRzLnVwZGF0ZVVzZXJzID0gZnVuY3Rpb24gKHVzZXJzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXhwb3J0cy5VUERBVEVfQ0hBVF9VU0VSUyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgdXNlcnM6IHVzZXJzXG4gICAgICAgIH1cbiAgICB9O1xufTtcbmV4cG9ydHMuYWRkVXNlciA9IGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXhwb3J0cy5BRERfQ0hBVF9VU0VSLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICB1c2VyOiB1c2VyXG4gICAgICAgIH1cbiAgICB9O1xufTtcbmV4cG9ydHMucmVtb3ZlVXNlciA9IGZ1bmN0aW9uIChlbWFpbCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV4cG9ydHMuUkVNT1ZFX0NIQVRfVVNFUixcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgZW1haWw6IGVtYWlsXG4gICAgICAgIH1cbiAgICB9O1xufTtcbmV4cG9ydHMuZmV0Y2hBbGxVc2VycyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRpc3BhdGNoKSB7XG4gICAgICAgIHJldHVybiBheGlvc18xW1wiZGVmYXVsdFwiXS5nZXQoJy9hcGkvdjEvdXNlcnMnKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIHZhciB1c2VycyA9IHt9O1xuICAgICAgICAgICAgcmVzLmRhdGEudXNlcnMuZm9yRWFjaChmdW5jdGlvbiAodSkge1xuICAgICAgICAgICAgICAgIHVzZXJzW3UuZW1haWxdID0ge1xuICAgICAgICAgICAgICAgICAgICByb2xlOiB1LnJvbGUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHUubmFtZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRpc3BhdGNoKGV4cG9ydHMudXBkYXRlVXNlcnModXNlcnMpKTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignRmV0Y2hpbmcgYWxsIHVzZXJzIGZhaWxlZCcpKTtcbiAgICAgICAgICAgIHJldHVybiBlcnI7XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuZXhwb3J0cy5jcmVhdGVOZXdVc2VyID0gZnVuY3Rpb24gKHVzZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRpc3BhdGNoKSB7XG4gICAgICAgIHJldHVybiBheGlvc18xW1wiZGVmYXVsdFwiXS5nZXQoJy9hcGkvdjEvJyk7XG4gICAgfTtcbn07XG5leHBvcnRzLmVkaXRVc2VyID0gZnVuY3Rpb24gKGVtYWlsLCB1c2VyKSB7XG59O1xuZXhwb3J0cy5kZWxldGVVc2VyID0gZnVuY3Rpb24gKGVtYWlsKSB7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWTJoaGRGVnpaWEp6UVdOMGFXOXVjeTVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUx5NHVMM055WXk5M1pXSXZZV04wYVc5dWN5OWphR0YwVlhObGNuTkJZM1JwYjI1ekxuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCUVVFc0swSkJRWGxFTzBGQlNYcEVMQ3RFUVVGclJEdEJRVVZ5UXl4UlFVRkJMR2xDUVVGcFFpeEhRVUZITEcxQ1FVRnRRaXhEUVVGRE8wRkJRM2hETEZGQlFVRXNZVUZCWVN4SFFVRkhMRlZCUVZVc1EwRkJRenRCUVVNelFpeFJRVUZCTEdkQ1FVRm5RaXhIUVVGSExHRkJRV0VzUTBGQlF6dEJRVVZxUXl4UlFVRkJMRmRCUVZjc1IwRkJSeXhWUVVGVExFdEJRVms3U1VGRE5VTXNUMEZCVHp0UlFVTklMRWxCUVVrc1JVRkJSU3g1UWtGQmFVSTdVVUZEZGtJc1NVRkJTU3hGUVVGRk8xbEJRMFlzUzBGQlN5eEZRVUZGTEV0QlFVczdVMEZEWmp0TFFVTktMRU5CUVVFN1FVRkRUQ3hEUVVGRExFTkJRVUU3UVVGRldTeFJRVUZCTEU5QlFVOHNSMEZCUnl4VlFVRlRMRWxCUVdNN1NVRkRNVU1zVDBGQlR6dFJRVU5JTEVsQlFVa3NSVUZCUlN4eFFrRkJZVHRSUVVOdVFpeEpRVUZKTEVWQlFVVTdXVUZEUml4SlFVRkpMRVZCUVVVc1NVRkJTVHRUUVVOaU8wdEJRMG9zUTBGQlFUdEJRVU5NTEVOQlFVTXNRMEZCUVR0QlFVVlpMRkZCUVVFc1ZVRkJWU3hIUVVGSExGVkJRVk1zUzBGQllUdEpRVU0xUXl4UFFVRlBPMUZCUTBnc1NVRkJTU3hGUVVGRkxIZENRVUZuUWp0UlFVTjBRaXhKUVVGSkxFVkJRVVU3V1VGRFJpeExRVUZMTEVWQlFVVXNTMEZCU3p0VFFVTm1PMHRCUTBvc1EwRkJRVHRCUVVOTUxFTkJRVU1zUTBGQlFUdEJRVWRaTEZGQlFVRXNZVUZCWVN4SFFVRkhPMGxCUTNwQ0xFOUJRVThzVlVGQlF5eFJRVUZyUWp0UlFVTjBRaXhQUVVGUExHdENRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRMR1ZCUVdVc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZETEVkQlFXdENPMWxCUTNSRUxFbEJRVWtzUzBGQlN5eEhRVUZWTEVWQlFVVXNRMEZCUXp0WlFVTjBRaXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4UFFVRlBMRU5CUVVNc1ZVRkJReXhEUVVGWE8yZENRVU12UWl4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRExFdEJRVXNzUTBGQlF5eEhRVUZITzI5Q1FVTmlMRWxCUVVrc1JVRkJSU3hEUVVGRExFTkJRVU1zU1VGQlNUdHZRa0ZEV2l4SlFVRkpMRVZCUVVVc1EwRkJReXhEUVVGRExFbEJRVWs3YVVKQlEyWXNRMEZCUXp0WlFVTk9MRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMGdzVVVGQlVTeERRVUZETEcxQ1FVRlhMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU0zUWl4UFFVRlBMRWRCUVVjc1EwRkJRenRSUVVObUxFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVc3NRMEZCUVN4RFFVRkRMRlZCUVVNc1IwRkJaVHRaUVVOeVFpeFJRVUZSTEVOQlFVTXNLMEpCUVZFc1EwRkJReXd5UWtGQk1rSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRhRVFzVDBGQlR5eEhRVUZITEVOQlFVTTdVVUZEWml4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOUUxFTkJRVU1zUTBGQlFUdEJRVU5NTEVOQlFVTXNRMEZCUVR0QlFVVlpMRkZCUVVFc1lVRkJZU3hIUVVGSExGVkJRVU1zU1VGQll6dEpRVU40UXl4UFFVRlBMRlZCUVVNc1VVRkJhMEk3VVVGRGRFSXNUMEZCVHl4clFrRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eFZRVUZWTEVOQlFVTXNRMEZCUVR0SlFVTm9ReXhEUVVGRExFTkJRVUU3UVVGRFRDeERRVUZETEVOQlFVRTdRVUZGV1N4UlFVRkJMRkZCUVZFc1IwRkJSeXhWUVVGRExFdEJRV0VzUlVGQlJTeEpRVUZqTzBGQlJYUkVMRU5CUVVNc1EwRkJRVHRCUVVWWkxGRkJRVUVzVlVGQlZTeEhRVUZITEZWQlFVTXNTMEZCWVR0QlFVVjRReXhEUVVGRExFTkJRVUVpZlE9PSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuQUREX0VSUk9SID0gJ0FERF9FUlJPUic7XG5leHBvcnRzLlJFTU9WRV9FUlJPUiA9ICdSRU1PVkVfRVJST1InO1xuZXhwb3J0cy5DTEVBUl9FUlJPUlMgPSAnQ0xFQVJfRVJST1JTJztcbmV4cG9ydHMuQUREX0lORk8gPSAnQUREX0lORk8nO1xuZXhwb3J0cy5SRU1PVkVfSU5GTyA9ICdSRU1PVkVfSU5GTyc7XG5leHBvcnRzLkNMRUFSX0lORk9TID0gJ0NMRUFSX0lORk9TJztcbmV4cG9ydHMuYWRkRXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBleHBvcnRzLkFERF9FUlJPUixcbiAgICAgICAgZGF0YTogZXJyb3JcbiAgICB9O1xufTtcbmV4cG9ydHMucmVtb3ZlRXJyb3IgPSBmdW5jdGlvbiAoaSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV4cG9ydHMuUkVNT1ZFX0VSUk9SLFxuICAgICAgICBkYXRhOiBpXG4gICAgfTtcbn07XG5leHBvcnRzLmNsZWFyRXJyb3JzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7IHR5cGU6IGV4cG9ydHMuQ0xFQVJfRVJST1JTIH07XG59O1xuZXhwb3J0cy5hZGRJbmZvID0gZnVuY3Rpb24gKGluZm8pIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBleHBvcnRzLkFERF9JTkZPLFxuICAgICAgICBkYXRhOiBpbmZvXG4gICAgfTtcbn07XG5leHBvcnRzLnJlbW92ZUluZm8gPSBmdW5jdGlvbiAoaSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV4cG9ydHMuUkVNT1ZFX0lORk8sXG4gICAgICAgIGRhdGE6IGlcbiAgICB9O1xufTtcbmV4cG9ydHMuY2xlYXJJbmZvcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBleHBvcnRzLkNMRUFSX0lORk9TXG4gICAgfTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2libTkwYVdacFkyRjBhVzl1YzBGamRHbHZibk11YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk4dUxpOHVMaTl6Y21NdmQyVmlMMkZqZEdsdmJuTXZibTkwYVdacFkyRjBhVzl1YzBGamRHbHZibk11ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRkJZU3hSUVVGQkxGTkJRVk1zUjBGQlJ5eFhRVUZYTEVOQlFVTTdRVUZEZUVJc1VVRkJRU3haUVVGWkxFZEJRVWNzWTBGQll5eERRVUZETzBGQlF6bENMRkZCUVVFc1dVRkJXU3hIUVVGSExHTkJRV01zUTBGQlF6dEJRVU01UWl4UlFVRkJMRkZCUVZFc1IwRkJSeXhWUVVGVkxFTkJRVU03UVVGRGRFSXNVVUZCUVN4WFFVRlhMRWRCUVVjc1lVRkJZU3hEUVVGRE8wRkJRelZDTEZGQlFVRXNWMEZCVnl4SFFVRkhMR0ZCUVdFc1EwRkJRenRCUVVVMVFpeFJRVUZCTEZGQlFWRXNSMEZCUnl4VlFVRkRMRXRCUVdFN1NVRkRiRU1zVDBGQlR6dFJRVU5JTEVsQlFVa3NSVUZCUlN4cFFrRkJVenRSUVVObUxFbEJRVWtzUlVGQlJTeExRVUZMTzB0QlEyUXNRMEZCUXp0QlFVTk9MRU5CUVVNc1EwRkJRVHRCUVVWWkxGRkJRVUVzVjBGQlZ5eEhRVUZITEZWQlFVTXNRMEZCVXp0SlFVTnFReXhQUVVGUE8xRkJRMGdzU1VGQlNTeEZRVUZGTEc5Q1FVRlpPMUZCUTJ4Q0xFbEJRVWtzUlVGQlJTeERRVUZETzB0QlExWXNRMEZCUXp0QlFVTk9MRU5CUVVNc1EwRkJRVHRCUVVWWkxGRkJRVUVzVjBGQlZ5eEhRVUZITzBsQlEzWkNMRTlCUVU4c1JVRkJSU3hKUVVGSkxFVkJRVVVzYjBKQlFWa3NSVUZCUlN4RFFVRkRPMEZCUTJ4RExFTkJRVU1zUTBGQlFUdEJRVVZaTEZGQlFVRXNUMEZCVHl4SFFVRkhMRlZCUVVNc1NVRkJXVHRKUVVOb1F5eFBRVUZQTzFGQlEwZ3NTVUZCU1N4RlFVRkZMR2RDUVVGUk8xRkJRMlFzU1VGQlNTeEZRVUZGTEVsQlFVazdTMEZEWWl4RFFVRkRPMEZCUTA0c1EwRkJReXhEUVVGQk8wRkJSVmtzVVVGQlFTeFZRVUZWTEVkQlFVY3NWVUZCUXl4RFFVRlRPMGxCUTJoRExFOUJRVTg3VVVGRFNDeEpRVUZKTEVWQlFVVXNiVUpCUVZjN1VVRkRha0lzU1VGQlNTeEZRVUZGTEVOQlFVTTdTMEZEVml4RFFVRkRPMEZCUTA0c1EwRkJReXhEUVVGQk8wRkJSVmtzVVVGQlFTeFZRVUZWTEVkQlFVYzdTVUZEZEVJc1QwRkJUenRSUVVOSUxFbEJRVWtzUlVGQlJTeHRRa0ZCVnp0TFFVTndRaXhEUVVGRE8wRkJRMDRzUTBGQlF5eERRVUZCSW4wPSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuVE9HR0xFX1NJREVCQVJfT1BFTiA9ICdUT0dHTEVfU0lERUJBUl9PUEVOJztcbmV4cG9ydHMudG9nZ2xlU2lkZWJhck9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXhwb3J0cy5UT0dHTEVfU0lERUJBUl9PUEVOXG4gICAgfTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2ljMmxrWldKaGNrRmpkR2x2Ym5NdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOHVMaTh1TGk5emNtTXZkMlZpTDJGamRHbHZibk12YzJsa1pXSmhja0ZqZEdsdmJuTXVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanM3UVVGQllTeFJRVUZCTEcxQ1FVRnRRaXhIUVVGSExIRkNRVUZ4UWl4RFFVRkRPMEZCUlRWRExGRkJRVUVzYVVKQlFXbENMRWRCUVVjN1NVRkROMElzVDBGQlR6dFJRVU5JTEVsQlFVa3NSVUZCUlN3eVFrRkJiVUk3UzBGRE5VSXNRMEZCUVR0QlFVTk1MRU5CUVVNc1EwRkJRU0o5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIGlvID0gcmVxdWlyZShcInNvY2tldC5pby1jbGllbnRcIik7XG5leHBvcnRzLklOSVRfV0VCU09DS0VUID0gJ0lOSVRfV0VCU09DS0VUJztcbmV4cG9ydHMuU0VUX1NPQ0tFVF9DT05ORUNURUQgPSAnU0VUX1NPQ0tFVF9DT05ORUNURUQnO1xuZXhwb3J0cy5TRVRfU09DS0VUX0NPTk5FQ1RFRF9VU0VSUyA9ICdTRVRfU09DS0VUX0NPTk5FQ1RFRF9VU0VSUyc7XG5leHBvcnRzLmluaXRXZWJzb2NrZXQgPSBmdW5jdGlvbiAoaW8pIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBleHBvcnRzLklOSVRfV0VCU09DS0VULFxuICAgICAgICBkYXRhOiB7IGlvOiBpbyB9XG4gICAgfTtcbn07XG5leHBvcnRzLnNldFNvY2tldENvbm5lY3RlZCA9IGZ1bmN0aW9uIChjb25uZWN0ZWQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBleHBvcnRzLlNFVF9TT0NLRVRfQ09OTkVDVEVELFxuICAgICAgICBkYXRhOiB7IGNvbm5lY3RlZDogY29ubmVjdGVkIH1cbiAgICB9O1xufTtcbmV4cG9ydHMuc2V0U29ja2V0Q29ubmVjdGVkVXNlcnMgPSBmdW5jdGlvbiAodXNlckVtYWlscykge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV4cG9ydHMuU0VUX1NPQ0tFVF9DT05ORUNURURfVVNFUlMsXG4gICAgICAgIGRhdGE6IHsgdXNlckVtYWlsczogdXNlckVtYWlscyB9XG4gICAgfTtcbn07XG5leHBvcnRzLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkaXNwYXRjaCwgZ2V0U3RhdGUpIHtcbiAgICAgICAgdmFyIHNvY2tldCA9IGlvKCk7XG4gICAgICAgIHNvY2tldC5vbignY29ubmVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRpc3BhdGNoKGV4cG9ydHMuc2V0U29ja2V0Q29ubmVjdGVkKHRydWUpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhdXRob3JpemVkIFsnICsgc29ja2V0LmlkICsgJ10nKTtcbiAgICAgICAgICAgIHNvY2tldC5vbignY29ubmVjdGVkIHVzZXJzJywgZnVuY3Rpb24gKHVzZXJFbWFpbHMpIHtcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChleHBvcnRzLnNldFNvY2tldENvbm5lY3RlZFVzZXJzKHVzZXJFbWFpbHMpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgc29ja2V0Lm9uKCdkaXNjb25uZWN0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZGlzcGF0Y2goZXhwb3J0cy5zZXRTb2NrZXRDb25uZWN0ZWQoZmFsc2UpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEaXNjb25uZWN0ZWQgZnJvbSB3ZWJzb2NrZXQgc2VydmVyLCBhdHRlbXB0aW5nIHJlY29ubmVjdCcpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRpc3BhdGNoKGV4cG9ydHMuaW5pdFdlYnNvY2tldChzb2NrZXQpKTtcbiAgICB9O1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWMyOWphMlYwUVdOMGFXOXVjeTVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUx5NHVMM055WXk5M1pXSXZZV04wYVc5dWN5OXpiMk5yWlhSQlkzUnBiMjV6TG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN08wRkJRVUVzY1VOQlFYVkRPMEZCU3pGQ0xGRkJRVUVzWTBGQll5eEhRVUZITEdkQ1FVRm5RaXhEUVVGRE8wRkJRMnhETEZGQlFVRXNiMEpCUVc5Q0xFZEJRVWNzYzBKQlFYTkNMRU5CUVVNN1FVRkRPVU1zVVVGQlFTd3dRa0ZCTUVJc1IwRkJSeXcwUWtGQk5FSXNRMEZCUXp0QlFVVXhSQ3hSUVVGQkxHRkJRV0VzUjBGQlJ5eFZRVUZETEVWQlFYbENPMGxCUTI1RUxFOUJRVTg3VVVGRFNDeEpRVUZKTEVWQlFVVXNjMEpCUVdNN1VVRkRjRUlzU1VGQlNTeEZRVUZGTEVWQlFVVXNSVUZCUlN4RlFVRkZMRVZCUVVVc1JVRkJSVHRMUVVOdVFpeERRVUZETzBGQlEwNHNRMEZCUXl4RFFVRkJPMEZCUlZrc1VVRkJRU3hyUWtGQmEwSXNSMEZCUnl4VlFVRkRMRk5CUVd0Q08wbEJRMnBFTEU5QlFVODdVVUZEU0N4SlFVRkpMRVZCUVVVc05FSkJRVzlDTzFGQlF6RkNMRWxCUVVrc1JVRkJSU3hGUVVGRkxGTkJRVk1zUlVGQlJTeFRRVUZUTEVWQlFVVTdTMEZEYWtNc1EwRkJRVHRCUVVOTUxFTkJRVU1zUTBGQlFUdEJRVVZaTEZGQlFVRXNkVUpCUVhWQ0xFZEJRVWNzVlVGQlF5eFZRVUZ2UWp0SlFVTjRSQ3hQUVVGUE8xRkJRMGdzU1VGQlNTeEZRVUZGTEd0RFFVRXdRanRSUVVOb1F5eEpRVUZKTEVWQlFVVXNSVUZCUlN4VlFVRlZMRVZCUVVVc1ZVRkJWU3hGUVVGRk8wdEJRMjVETEVOQlFVRTdRVUZEVEN4RFFVRkRMRU5CUVVFN1FVRkZXU3hSUVVGQkxFbEJRVWtzUjBGQlJ6dEpRVU5vUWl4UFFVRlBMRlZCUVVNc1VVRkJhMElzUlVGQlJTeFJRVUZyUWp0UlFVTXhReXhKUVVGSkxFMUJRVTBzUjBGQk1FSXNSVUZCUlN4RlFVRkZMRU5CUVVNN1VVRkRla01zVFVGQlRTeERRVUZETEVWQlFVVXNRMEZCUXl4VFFVRlRMRVZCUVVVN1dVRkRha0lzVVVGQlVTeERRVUZETERCQ1FVRnJRaXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEYmtNc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eGpRVUZqTEVkQlFVY3NUVUZCVFN4RFFVRkRMRVZCUVVVc1IwRkJSeXhIUVVGSExFTkJRVU1zUTBGQlF6dFpRVU01UXl4TlFVRk5MRU5CUVVNc1JVRkJSU3hEUVVGRExHbENRVUZwUWl4RlFVRkZMRlZCUVVNc1ZVRkJiMEk3WjBKQlF6bERMRkZCUVZFc1EwRkJReXdyUWtGQmRVSXNRMEZCUXl4VlFVRlZMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMnhFTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTFBc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRlNDeE5RVUZOTEVOQlFVTXNSVUZCUlN4RFFVRkRMRmxCUVZrc1JVRkJSVHRaUVVOd1FpeFJRVUZSTEVOQlFVTXNNRUpCUVd0Q0xFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTndReXhQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETERCRVFVRXdSQ3hEUVVGRExFTkJRVU03VVVGRE5VVXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkZTQ3hQUVVGUExGRkJRVkVzUTBGQlF5eHhRa0ZCWVN4RFFVRkRMRTFCUVUwc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRE0wTXNRMEZCUXl4RFFVRkJPMEZCUTB3c1EwRkJReXhEUVVGQkluMD0iLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgYXhpb3NfMSA9IHJlcXVpcmUoXCJheGlvc1wiKTtcbnZhciBjaGFubmVsc0FjdGlvbnNfMSA9IHJlcXVpcmUoXCIuL2NoYW5uZWxzQWN0aW9uc1wiKTtcbnZhciBub3RpZmljYXRpb25zQWN0aW9uc18xID0gcmVxdWlyZShcIi4vbm90aWZpY2F0aW9uc0FjdGlvbnNcIik7XG5leHBvcnRzLlNFVF9BVVRIT1JJWkVEID0gJ1NFVF9BVVRIT1JJWkVEJztcbmV4cG9ydHMuU0VUX1VTRVIgPSAnU0VUX1VTRVInO1xuZXhwb3J0cy5MT0dPVVRfVVNFUiA9ICdMT0dPVVRfVVNFUic7XG5leHBvcnRzLlNFVF9KV1QgPSAnU0VUX0pXVCc7XG5leHBvcnRzLnNldEF1dGhvcml6ZWQgPSBmdW5jdGlvbiAoYXV0aG9yaXplZCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV4cG9ydHMuU0VUX0FVVEhPUklaRUQsXG4gICAgICAgIGRhdGE6IGF1dGhvcml6ZWRcbiAgICB9O1xufTtcbmV4cG9ydHMuc2V0VXNlciA9IGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXhwb3J0cy5TRVRfVVNFUixcbiAgICAgICAgZGF0YTogdXNlclxuICAgIH07XG59O1xuZXhwb3J0cy5sb2dvdXRVc2VyID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV4cG9ydHMuTE9HT1VUX1VTRVJcbiAgICB9O1xufTtcbmV4cG9ydHMuc2V0Snd0ID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXhwb3J0cy5TRVRfSldULFxuICAgICAgICBkYXRhOiB0b2tlblxuICAgIH07XG59O1xuZXhwb3J0cy5sb2dvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkaXNwYXRjaCkge1xuICAgICAgICBkaXNwYXRjaChleHBvcnRzLmxvZ291dFVzZXIoKSk7XG4gICAgICAgIHJldHVybiBkaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5jbGVhckNoYW5uZWxzRGF0YSgpKTtcbiAgICB9O1xufTtcbmV4cG9ydHMudXBkYXRlTmFtZSA9IGZ1bmN0aW9uIChuYW1lLCBvblN1Y2Nlc3MpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRpc3BhdGNoKSB7XG4gICAgICAgIHJldHVybiBheGlvc18xW1wiZGVmYXVsdFwiXS5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL25hbWUnLCB7XG4gICAgICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRJbmZvKCdOYW1lIHVwZGF0ZWQnKSk7XG4gICAgICAgICAgICBpZiAob25TdWNjZXNzKVxuICAgICAgICAgICAgICAgIG9uU3VjY2VzcygpO1xuICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIucmVzcG9uc2UgJiYgZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTb21ldGhpbmcgd2VudCB3cm9uZyB1cGRhdGluZyB1c2VyIG5hbWUnLCBlcnIpO1xuICAgICAgICAgICAgZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIHVwZGF0ZSB5b3VyIG5hbWUuJykpO1xuICAgICAgICB9KTtcbiAgICB9O1xufTtcbmV4cG9ydHMudXBkYXRlRW1haWwgPSBmdW5jdGlvbiAoZW1haWwsIG9uU3VjY2Vzcykge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZGlzcGF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIGF4aW9zXzFbXCJkZWZhdWx0XCJdLnBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvZW1haWwnLCB7XG4gICAgICAgICAgICBlbWFpbDogZW1haWxcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEluZm8oJ0VtYWlsIHVwZGF0ZWQnKSk7XG4gICAgICAgICAgICBpZiAob25TdWNjZXNzKVxuICAgICAgICAgICAgICAgIG9uU3VjY2VzcygpO1xuICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIucmVzcG9uc2UgJiYgZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTb21ldGhpbmcgd2VudCB3cm9uZyB1cGRhdGluZyB1c2VyIGVtYWlsJywgZXJyKTtcbiAgICAgICAgICAgIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byB1cGRhdGUgeW91ciBlbWFpbC4nKSk7XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuZXhwb3J0cy51cGRhdGVQYXNzd29yZCA9IGZ1bmN0aW9uIChvbGRQYXNzLCBuZXdQYXNzLCBvblN1Y2Nlc3MpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRpc3BhdGNoKSB7XG4gICAgICAgIHJldHVybiBheGlvc18xW1wiZGVmYXVsdFwiXS5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL3Bhc3N3b3JkJywge1xuICAgICAgICAgICAgb2xkUGFzczogb2xkUGFzcyxcbiAgICAgICAgICAgIG5ld1Bhc3M6IG5ld1Bhc3NcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEluZm8oJ1Bhc3N3b3JkIHVwZGF0ZWQnKSk7XG4gICAgICAgICAgICBpZiAob25TdWNjZXNzKVxuICAgICAgICAgICAgICAgIG9uU3VjY2VzcygpO1xuICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIucmVzcG9uc2UgJiYgZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTb21ldGhpbmcgd2VudCB3cm9uZyB1cGRhdGluZyB1c2VyIHBhc3N3b3JkJywgZXJyKTtcbiAgICAgICAgICAgIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byB1cGRhdGUgeW91ciBwYXNzd29yZC4nKSk7XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuZXhwb3J0cy5jcmVhdGVVc2VyID0gZnVuY3Rpb24gKG5hbWUsIGVtYWlsLCByb2xlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkaXNwYXRjaCkge1xuICAgICAgICByZXR1cm4gYXhpb3NfMVtcImRlZmF1bHRcIl0ucG9zdCgnL2FwaS92MS91c2VyL2NyZWF0ZScsIHtcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgICByb2xlOiByb2xlLFxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkSW5mbygnTmV3IHVzZXIgY3JlYXRlZCcpKTtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyLnJlc3BvbnNlICYmIGVyci5yZXNwb25zZS5kYXRhLmVycm9yKVxuICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZycpKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG5leHBvcnRzLmVkaXRVc2VyID0gZnVuY3Rpb24gKG9yaWdpbmFsRW1haWwsIG5ld05hbWUsIG5ld0VtYWlsLCBuZXdSb2xlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkaXNwYXRjaCkge1xuICAgICAgICByZXR1cm4gYXhpb3NfMVtcImRlZmF1bHRcIl0ucHV0KCcvYXBpL3YxL3VzZXIvdXBkYXRlJywge1xuICAgICAgICAgICAgZW1haWw6IG9yaWdpbmFsRW1haWwsXG4gICAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogbmV3TmFtZSxcbiAgICAgICAgICAgICAgICBlbWFpbDogbmV3RW1haWwsXG4gICAgICAgICAgICAgICAgcm9sZTogbmV3Um9sZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkSW5mbygnQ2hhbmdlcyBzYXZlZCcpKTtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyLnJlc3BvbnNlICYmIGVyci5yZXNwb25zZS5kYXRhLmVycm9yKVxuICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZycpKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG5leHBvcnRzLmRlbGV0ZVVzZXIgPSBmdW5jdGlvbiAoZW1haWwpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRpc3BhdGNoKSB7XG4gICAgICAgIHJldHVybiBheGlvc18xW1wiZGVmYXVsdFwiXSh7XG4gICAgICAgICAgICBtZXRob2Q6ICdkZWxldGUnLFxuICAgICAgICAgICAgdXJsOiAnL2FwaS92MS91c2VyL2RlbGV0ZScsXG4gICAgICAgICAgICBkYXRhOiB7IGVtYWlsOiBlbWFpbCB9XG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRJbmZvKCdVc2VyIGRlbGV0ZWQnKSk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgaWYgKGVyci5yZXNwb25zZSAmJiBlcnIucmVzcG9uc2UuZGF0YS5lcnJvcilcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKGVyci5yZXNwb25zZS5kYXRhLmVycm9yKSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3JvbmcnKSk7XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuZXhwb3J0cy5yZXN0b3JlVXNlciA9IGZ1bmN0aW9uIChlbWFpbCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZGlzcGF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIGF4aW9zXzFbXCJkZWZhdWx0XCJdLnB1dCgnL2FwaS92MS91c2VyL3Jlc3RvcmUnLCB7XG4gICAgICAgICAgICBlbWFpbDogZW1haWxcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEluZm8oJ1VzZXIgcmVzdG9yZWQnKSk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgaWYgKGVyci5yZXNwb25zZSAmJiBlcnIucmVzcG9uc2UuZGF0YS5lcnJvcilcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKGVyci5yZXNwb25zZS5kYXRhLmVycm9yKSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3JvbmcnKSk7XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pZFhObGNrRmpkR2x2Ym5NdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOHVMaTh1TGk5emNtTXZkMlZpTDJGamRHbHZibk12ZFhObGNrRmpkR2x2Ym5NdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZCUVN3clFrRkJlVVE3UVVGRmVrUXNjVVJCUVc5RU8wRkJRM0JFTEN0RVFVRjVSRHRCUVVVMVF5eFJRVUZCTEdOQlFXTXNSMEZCUnl4blFrRkJaMElzUTBGQlF6dEJRVU5zUXl4UlFVRkJMRkZCUVZFc1IwRkJSeXhWUVVGVkxFTkJRVU03UVVGRGRFSXNVVUZCUVN4WFFVRlhMRWRCUVVjc1lVRkJZU3hEUVVGRE8wRkJRelZDTEZGQlFVRXNUMEZCVHl4SFFVRkhMRk5CUVZNc1EwRkJRenRCUVVWd1FpeFJRVUZCTEdGQlFXRXNSMEZCUnl4VlFVRkRMRlZCUVcxQ08wbEJRemRETEU5QlFWRTdVVUZEU2l4SlFVRkpMRVZCUVVVc2MwSkJRV003VVVGRGNFSXNTVUZCU1N4RlFVRkZMRlZCUVZVN1MwRkRia0lzUTBGQlF6dEJRVU5PTEVOQlFVTXNRMEZCUVR0QlFVVlpMRkZCUVVFc1QwRkJUeXhIUVVGSExGVkJRVU1zU1VGQlpUdEpRVU51UXl4UFFVRlBPMUZCUTBnc1NVRkJTU3hGUVVGRkxHZENRVUZSTzFGQlEyUXNTVUZCU1N4RlFVRkZMRWxCUVVrN1MwRkRZaXhEUVVGRE8wRkJRMDRzUTBGQlF5eERRVUZCTzBGQlJWa3NVVUZCUVN4VlFVRlZMRWRCUVVjN1NVRkRkRUlzVDBGQlR6dFJRVU5JTEVsQlFVa3NSVUZCUlN4dFFrRkJWenRMUVVOd1FpeERRVUZETzBGQlEwNHNRMEZCUXl4RFFVRkJPMEZCUlZrc1VVRkJRU3hOUVVGTkxFZEJRVWNzVlVGQlF5eExRVUZoTzBsQlEyaERMRTlCUVU4N1VVRkRTQ3hKUVVGSkxFVkJRVVVzWlVGQlR6dFJRVU5pTEVsQlFVa3NSVUZCUlN4TFFVRkxPMHRCUTJRc1EwRkJRenRCUVVOT0xFTkJRVU1zUTBGQlFUdEJRVVZaTEZGQlFVRXNUVUZCVFN4SFFVRkhPMGxCUTJ4Q0xFOUJRVThzVlVGQlF5eFJRVUZoTzFGQlEycENMRkZCUVZFc1EwRkJReXhyUWtGQlZTeEZRVUZGTEVOQlFVTXNRMEZCUXp0UlFVTjJRaXhQUVVGUExGRkJRVkVzUTBGQlF5eHRRMEZCYVVJc1JVRkJSU3hEUVVGRExFTkJRVU03U1VGRGVrTXNRMEZCUXl4RFFVRkJPMEZCUlV3c1EwRkJReXhEUVVGQk8wRkJSMWtzVVVGQlFTeFZRVUZWTEVkQlFVY3NWVUZCUXl4SlFVRlpMRVZCUVVVc1UwRkJiMEk3U1VGRGVrUXNUMEZCVHl4VlFVRkRMRkZCUVdFN1VVRkRha0lzVDBGQlR5eHJRa0ZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXd3UWtGQk1FSXNSVUZCUlR0WlFVTXhReXhKUVVGSkxFVkJRVVVzU1VGQlNUdFRRVU5pTEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJReXhIUVVGclFqdFpRVU4yUWl4UlFVRlJMRU5CUVVNc09FSkJRVThzUTBGQlF5eGpRVUZqTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTJ4RExFbEJRVWtzVTBGQlV6dG5Ra0ZCUlN4VFFVRlRMRVZCUVVVc1EwRkJRenRSUVVNdlFpeERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRkxMRU5CUVVFc1EwRkJReXhWUVVGRExFZEJRV1U3V1VGRGNrSXNTVUZCU1N4SFFVRkhMRU5CUVVNc1VVRkJVU3hKUVVGSkxFZEJRVWNzUTBGQlF5eFJRVUZSTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzN1owSkJRM1pETEU5QlFVOHNVVUZCVVN4RFFVRkRMQ3RDUVVGUkxFTkJRVU1zUjBGQlJ5eERRVUZETEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU4yUkN4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExIbERRVUY1UXl4RlFVRkZMRWRCUVVjc1EwRkJReXhEUVVGRE8xbEJRelZFTEZGQlFWRXNRMEZCUXl3clFrRkJVU3hEUVVGRExIZEVRVUYzUkN4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOcVJpeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTlFMRU5CUVVNc1EwRkJRenRCUVVOT0xFTkJRVU1zUTBGQlFUdEJRVVZaTEZGQlFVRXNWMEZCVnl4SFFVRkhMRlZCUVVNc1MwRkJZU3hGUVVGRkxGTkJRVzlDTzBsQlF6TkVMRTlCUVU4c1ZVRkJReXhSUVVGaE8xRkJRMnBDTEU5QlFVOHNhMEpCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zTWtKQlFUSkNMRVZCUVVVN1dVRkRNME1zUzBGQlN5eEZRVUZGTEV0QlFVczdVMEZEWml4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVU1zUjBGQmEwSTdXVUZEZGtJc1VVRkJVU3hEUVVGRExEaENRVUZQTEVOQlFVTXNaVUZCWlN4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOdVF5eEpRVUZKTEZOQlFWTTdaMEpCUVVVc1UwRkJVeXhGUVVGRkxFTkJRVU03VVVGREwwSXNRMEZCUXl4RFFVRkRMRU5CUVVNc1QwRkJTeXhEUVVGQkxFTkJRVU1zVlVGQlF5eEhRVUZsTzFsQlEzSkNMRWxCUVVrc1IwRkJSeXhEUVVGRExGRkJRVkVzU1VGQlNTeEhRVUZITEVOQlFVTXNVVUZCVVN4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTE8yZENRVU4yUXl4UFFVRlBMRkZCUVZFc1EwRkJReXdyUWtGQlVTeERRVUZETEVkQlFVY3NRMEZCUXl4UlFVRlJMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEZGtRc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5d3dRMEZCTUVNc1JVRkJSU3hIUVVGSExFTkJRVU1zUTBGQlF6dFpRVU0zUkN4UlFVRlJMRU5CUVVNc0swSkJRVkVzUTBGQlF5eDVSRUZCZVVRc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRGJFWXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRVQ3hEUVVGRExFTkJRVU03UVVGRFRpeERRVUZETEVOQlFVRTdRVUZGV1N4UlFVRkJMR05CUVdNc1IwRkJSeXhWUVVGRExFOUJRV1VzUlVGQlJTeFBRVUZsTEVWQlFVVXNVMEZCYjBJN1NVRkRha1lzVDBGQlR5eFZRVUZETEZGQlFXRTdVVUZEYWtJc1QwRkJUeXhyUWtGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl3NFFrRkJPRUlzUlVGQlJUdFpRVU01UXl4UFFVRlBMRVZCUVVVc1QwRkJUenRaUVVOb1FpeFBRVUZQTEVWQlFVVXNUMEZCVHp0VFFVTnVRaXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFVTXNSMEZCYTBJN1dVRkRka0lzVVVGQlVTeERRVUZETERoQ1FVRlBMRU5CUVVNc2EwSkJRV3RDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTNSRExFbEJRVWtzVTBGQlV6dG5Ra0ZCUlN4VFFVRlRMRVZCUVVVc1EwRkJRenRSUVVNdlFpeERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRkxMRU5CUVVFc1EwRkJReXhWUVVGRExFZEJRV1U3V1VGRGNrSXNTVUZCU1N4SFFVRkhMRU5CUVVNc1VVRkJVU3hKUVVGSkxFZEJRVWNzUTBGQlF5eFJRVUZSTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzN1owSkJRM1pETEU5QlFVOHNVVUZCVVN4RFFVRkRMQ3RDUVVGUkxFTkJRVU1zUjBGQlJ5eERRVUZETEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU4yUkN4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExEWkRRVUUyUXl4RlFVRkZMRWRCUVVjc1EwRkJReXhEUVVGRE8xbEJRMmhGTEZGQlFWRXNRMEZCUXl3clFrRkJVU3hEUVVGRExEUkVRVUUwUkN4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOeVJpeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTlFMRU5CUVVNc1EwRkJRenRCUVVOT0xFTkJRVU1zUTBGQlFUdEJRVVZaTEZGQlFVRXNWVUZCVlN4SFFVRkhMRlZCUVVNc1NVRkJXU3hGUVVGRkxFdEJRV0VzUlVGQlJTeEpRVUZaTzBsQlEyaEZMRTlCUVU4c1ZVRkJReXhSUVVGaE8xRkJRMnBDTEU5QlFVOHNhMEpCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zY1VKQlFYRkNMRVZCUVVVN1dVRkRja01zU1VGQlNTeEZRVUZGTEVsQlFVazdXVUZEVml4TFFVRkxMRVZCUVVVc1MwRkJTenRaUVVOYUxFbEJRVWtzUlVGQlJTeEpRVUZKTzFOQlEySXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGRExFZEJRV3RDTzFsQlEzWkNMRkZCUVZFc1EwRkJReXc0UWtGQlR5eERRVUZETEd0Q1FVRnJRaXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU14UXl4RFFVRkRMRU5CUVVNc1EwRkJReXhQUVVGTExFTkJRVUVzUTBGQlF5eFZRVUZETEVkQlFWRTdXVUZEWkN4SlFVRkpMRWRCUVVjc1EwRkJReXhSUVVGUkxFbEJRVWtzUjBGQlJ5eERRVUZETEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTenRuUWtGRGRrTXNVVUZCVVN4RFFVRkRMQ3RDUVVGUkxFTkJRVU1zUjBGQlJ5eERRVUZETEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF6czdaMEpCUlRWRExGRkJRVkVzUTBGQlF5d3JRa0ZCVVN4RFFVRkRMSE5DUVVGelFpeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTnVSQ3hEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTXNRMEZCUXp0QlFVTk9MRU5CUVVNc1EwRkJRenRCUVVWWExGRkJRVUVzVVVGQlVTeEhRVUZITEZWQlFVTXNZVUZCY1VJc1JVRkJSU3hQUVVGblFpeEZRVUZGTEZGQlFXbENMRVZCUVVVc1QwRkJaMEk3U1VGRGFrY3NUMEZCVHl4VlFVRkRMRkZCUVdFN1VVRkRha0lzVDBGQlR5eHJRa0ZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXh4UWtGQmNVSXNSVUZCUlR0WlFVTndReXhMUVVGTExFVkJRVVVzWVVGQllUdFpRVU53UWl4SlFVRkpMRVZCUVVVN1owSkJRMFlzU1VGQlNTeEZRVUZGTEU5QlFVODdaMEpCUTJJc1MwRkJTeXhGUVVGRkxGRkJRVkU3WjBKQlEyWXNTVUZCU1N4RlFVRkZMRTlCUVU4N1lVRkRhRUk3VTBGRFNpeERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVVNc1IwRkJhMEk3V1VGRGRrSXNVVUZCVVN4RFFVRkRMRGhDUVVGUExFTkJRVU1zWlVGQlpTeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTjJReXhEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZMTEVOQlFVRXNRMEZCUXl4VlFVRkRMRWRCUVZFN1dVRkRaQ3hKUVVGSkxFZEJRVWNzUTBGQlF5eFJRVUZSTEVsQlFVa3NSMEZCUnl4RFFVRkRMRkZCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN6dG5Ra0ZEZGtNc1VVRkJVU3hEUVVGRExDdENRVUZSTEVOQlFVTXNSMEZCUnl4RFFVRkRMRkZCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXpzN1owSkJSVFZETEZGQlFWRXNRMEZCUXl3clFrRkJVU3hEUVVGRExITkNRVUZ6UWl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOdVJDeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTlFMRU5CUVVNc1EwRkJRenRCUVVOT0xFTkJRVU1zUTBGQlF6dEJRVVZYTEZGQlFVRXNWVUZCVlN4SFFVRkhMRlZCUVVNc1MwRkJZVHRKUVVOd1F5eFBRVUZQTEZWQlFVTXNVVUZCWVR0UlFVZHFRaXhQUVVGUExHdENRVUZMTEVOQlFVTTdXVUZEVkN4TlFVRk5MRVZCUVVVc1VVRkJVVHRaUVVOb1FpeEhRVUZITEVWQlFVVXNjVUpCUVhGQ08xbEJRekZDTEVsQlFVa3NSVUZCUlN4RlFVRkZMRXRCUVVzc1JVRkJSU3hMUVVGTExFVkJRVVU3VTBGRGVrSXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGRExFZEJRV3RDTzFsQlEzWkNMRkZCUVZFc1EwRkJReXc0UWtGQlR5eERRVUZETEdOQlFXTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRkRU1zUTBGQlF5eERRVUZETEVOQlFVTXNUMEZCU3l4RFFVRkJMRU5CUVVNc1ZVRkJReXhIUVVGUk8xbEJRMlFzU1VGQlNTeEhRVUZITEVOQlFVTXNVVUZCVVN4SlFVRkpMRWRCUVVjc1EwRkJReXhSUVVGUkxFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVczdaMEpCUTNaRExGRkJRVkVzUTBGQlF5d3JRa0ZCVVN4RFFVRkRMRWRCUVVjc1EwRkJReXhSUVVGUkxFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNN08yZENRVVUxUXl4UlFVRlJMRU5CUVVNc0swSkJRVkVzUTBGQlF5eHpRa0ZCYzBJc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRGJrUXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRVQ3hEUVVGRExFTkJRVU03UVVGRFRpeERRVUZETEVOQlFVTTdRVUZGVnl4UlFVRkJMRmRCUVZjc1IwRkJSeXhWUVVGRExFdEJRV0U3U1VGRGNrTXNUMEZCVHl4VlFVRkRMRkZCUVdFN1VVRkRha0lzVDBGQlR5eHJRa0ZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXh6UWtGQmMwSXNSVUZCUlR0WlFVTnlReXhMUVVGTExFVkJRVVVzUzBGQlN6dFRRVU5tTEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJReXhIUVVGclFqdFpRVU4yUWl4UlFVRlJMRU5CUVVNc09FSkJRVThzUTBGQlF5eGxRVUZsTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTNaRExFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVc3NRMEZCUVN4RFFVRkRMRlZCUVVNc1IwRkJVVHRaUVVOa0xFbEJRVWtzUjBGQlJ5eERRVUZETEZGQlFWRXNTVUZCU1N4SFFVRkhMRU5CUVVNc1VVRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTzJkQ1FVTjJReXhSUVVGUkxFTkJRVU1zSzBKQlFWRXNRMEZCUXl4SFFVRkhMRU5CUVVNc1VVRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRPenRuUWtGRk5VTXNVVUZCVVN4RFFVRkRMQ3RDUVVGUkxFTkJRVU1zYzBKQlFYTkNMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMjVFTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTFBc1EwRkJReXhEUVVGRE8wRkJRMDRzUTBGQlF5eERRVUZESW4wPSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBjaGFubmVsc0FjdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi9hY3Rpb25zL2NoYW5uZWxzQWN0aW9uc1wiKTtcbnZhciBpbml0aWFsU3RhdGUgPSBbXTtcbmV4cG9ydHMuY2hhbm5lbEV4aXN0cyA9IGZ1bmN0aW9uIChjaGFubmVscywgY2hhbm5lbE5hbWUpIHtcbiAgICB2YXIgY2hhbm5lbCA9IGNoYW5uZWxzLmZpbmQoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgcmV0dXJuIGMubmFtZSA9PT0gY2hhbm5lbE5hbWU7XG4gICAgfSk7XG4gICAgaWYgKCFjaGFubmVsKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIGNoYW5uZWw7XG59O1xuZnVuY3Rpb24gZGVmYXVsdF8xKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBpZiAoc3RhdGUgPT09IHZvaWQgMCkgeyBzdGF0ZSA9IGluaXRpYWxTdGF0ZTsgfVxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBjaGFubmVsc0FjdGlvbnNfMS5BRERfQ0hBTk5FTFM6XG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uLmRhdGEuY2hhbm5lbHM7XG4gICAgICAgIGNhc2UgY2hhbm5lbHNBY3Rpb25zXzEuSU5DUkVNRU5UX0NIQU5ORUxfUkVUUklFVkVfTUVTU0FHRVNfT0ZGU0VUOiB7XG4gICAgICAgICAgICB2YXIgY2hhbm5lbF8xID0gZXhwb3J0cy5jaGFubmVsRXhpc3RzKHN0YXRlLCBhY3Rpb24uZGF0YS5jaGFubmVsKTtcbiAgICAgICAgICAgIHZhciBpbmNyZW1lbnRfMSA9IGFjdGlvbi5kYXRhLmluY3JlbWVudDtcbiAgICAgICAgICAgIGlmICghY2hhbm5lbF8xKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Vua25vd24gY2hhbm5lbCB3aGlsZSBpbmNyZW1lbnRpbmcgbWVzc2FnZXMgb2Zmc2V0JywgYWN0aW9uKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbmV3Q2hhbm5lbHNfMSA9IHN0YXRlLm1hcChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIGlmIChjLm5hbWUgPT09IGNoYW5uZWxfMS5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGMucmV0cmlldmVNZXNzYWdlc09mZnNldCArPSBpbmNyZW1lbnRfMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBuZXdDaGFubmVsc18xO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgY2hhbm5lbHNBY3Rpb25zXzEuU0VUX0NIQU5ORUxfRkVUQ0hJTkdfTkVXX01FU1NBR0VTOlxuICAgICAgICAgICAgdmFyIGNoYW5uZWwgPSBleHBvcnRzLmNoYW5uZWxFeGlzdHMoc3RhdGUsIGFjdGlvbi5kYXRhLmNoYW5uZWxOYW1lKTtcbiAgICAgICAgICAgIGlmICghY2hhbm5lbCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVbmtub3duIGNoYW5uZWwgd2hpbGUgZmV0Y2hpbmcgbmV3IG1lc3NhZ2VzJywgYWN0aW9uKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbmV3Q2hhbm5lbHMgPSBzdGF0ZS5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICBpZiAoYy5uYW1lID09PSBhY3Rpb24uZGF0YS5jaGFubmVsTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjLmZldGNoaW5nTmV3TWVzc2FnZXMgPSBhY3Rpb24uZGF0YS5pc0ZldGNoaW5nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG5ld0NoYW5uZWxzO1xuICAgICAgICBjYXNlIGNoYW5uZWxzQWN0aW9uc18xLlNFVF9DSEFOTkVMX0hBU19NT1JFX01FU1NBR0VTOiB7XG4gICAgICAgICAgICB2YXIgY2hhbm5lbF8yID0gZXhwb3J0cy5jaGFubmVsRXhpc3RzKHN0YXRlLCBhY3Rpb24uZGF0YS5jaGFubmVsTmFtZSk7XG4gICAgICAgICAgICB2YXIgaGFzTW9yZV8xID0gYWN0aW9uLmRhdGEuaGFzTW9yZTtcbiAgICAgICAgICAgIGlmICghY2hhbm5lbF8yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Vua25vd24gY2hhbm5lbCB3aGlsZSBzZXR0aW5nIGhhc01vcmUgbWVzc2FnZXMnLCBhY3Rpb24pO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBuZXdDaGFubmVsc18yID0gc3RhdGUubWFwKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgaWYgKGMubmFtZSA9PT0gYWN0aW9uLmRhdGEuY2hhbm5lbE5hbWUpXG4gICAgICAgICAgICAgICAgICAgIGMuaGFzTW9yZU1lc3NhZ2VzID0gaGFzTW9yZV8xO1xuICAgICAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3Q2hhbm5lbHNfMjtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGNoYW5uZWxzQWN0aW9uc18xLkFERF9SRVRSSUVWRURfQ0hBTk5FTF9NRVNTQUdFUzoge1xuICAgICAgICAgICAgdmFyIHJldHJpZXZlZE1lc3NhZ2VzXzEgPSBhY3Rpb24uZGF0YS5tZXNzYWdlcztcbiAgICAgICAgICAgIHZhciBjaGFubmVsTmFtZV8xID0gYWN0aW9uLmRhdGEuY2hhbm5lbE5hbWU7XG4gICAgICAgICAgICB2YXIgY2hhbm5lbF8zID0gZXhwb3J0cy5jaGFubmVsRXhpc3RzKHN0YXRlLCBjaGFubmVsTmFtZV8xKTtcbiAgICAgICAgICAgIGlmICghY2hhbm5lbF8zKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Vua25vd24gY2hhbm5lbCB3aGlsZSBhZGRpbmcgcmV0cmlldmVkIGNoYW5uZWwgbWVzc2FnZXMnLCBhY3Rpb24pO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBuZXdDaGFubmVsc18zID0gc3RhdGUubWFwKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgaWYgKGMubmFtZSA9PT0gY2hhbm5lbE5hbWVfMSlcbiAgICAgICAgICAgICAgICAgICAgYy5tZXNzYWdlcyA9IHJldHJpZXZlZE1lc3NhZ2VzXzEuY29uY2F0KGMubWVzc2FnZXMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3Q2hhbm5lbHNfMztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGNoYW5uZWxzQWN0aW9uc18xLkFERF9SRUNFSVZFRF9DSEFOTkVMX01FU1NBR0U6IHtcbiAgICAgICAgICAgIHZhciByZWNlaXZlZE1lc3NhZ2VfMSA9IGFjdGlvbi5kYXRhLm1lc3NhZ2U7XG4gICAgICAgICAgICB2YXIgY2hhbm5lbE5hbWVfMiA9IGFjdGlvbi5kYXRhLmNoYW5uZWxOYW1lO1xuICAgICAgICAgICAgdmFyIGNoYW5uZWxfNCA9IGV4cG9ydHMuY2hhbm5lbEV4aXN0cyhzdGF0ZSwgY2hhbm5lbE5hbWVfMik7XG4gICAgICAgICAgICBpZiAoIWNoYW5uZWxfNCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVbmtub3duIGNoYW5uZWwgd2hpbGUgYWRkaW5nIHJlY2VpdmVkIG1lc3NhZ2UnLCBzdGF0ZSwgYWN0aW9uKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbmV3Q2hhbm5lbHNfNCA9IHN0YXRlLm1hcChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIGlmIChjLm5hbWUgPT09IGNoYW5uZWxOYW1lXzIpXG4gICAgICAgICAgICAgICAgICAgIGMubWVzc2FnZXMgPSBjLm1lc3NhZ2VzLmNvbmNhdChbcmVjZWl2ZWRNZXNzYWdlXzFdKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG5ld0NoYW5uZWxzXzQ7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBjaGFubmVsc0FjdGlvbnNfMS5DTEVBUl9DSEFOTkVMU19EQVRBOlxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn1cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZGVmYXVsdF8xO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWTJoaGJtNWxiSE11YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk4dUxpOHVMaTl6Y21NdmQyVmlMM0psWkhWalpYSnpMMk5vWVc1dVpXeHpMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3TzBGQlFVRXNPRVJCVDNORE8wRkJNRUowUXl4SlFVRkpMRmxCUVZrc1IwRkJWU3hGUVVGRkxFTkJRVU03UVVGRmFFSXNVVUZCUVN4aFFVRmhMRWRCUVVjc1ZVRkJReXhSUVVFeVFpeEZRVUZGTEZkQlFXMUNPMGxCUXpGRkxFbEJRVWtzVDBGQlR5eEhRVUZITEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVVc1ZVRkJReXhEUVVGVk8xRkJRM0JETEU5QlFVOHNRMEZCUXl4RFFVRkRMRWxCUVVrc1MwRkJTeXhYUVVGWExFTkJRVU03U1VGRGJFTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRTQ3hKUVVGSkxFTkJRVU1zVDBGQlR6dFJRVUZGTEU5QlFVOHNTMEZCU3l4RFFVRkRPMGxCUXpOQ0xFOUJRVThzVDBGQlR5eERRVUZETzBGQlEyNUNMRU5CUVVNc1EwRkJRVHRCUVVWRUxHMUNRVUY1UWl4TFFVRXlRaXhGUVVGRkxFMUJRV003U1VGQk0wTXNjMEpCUVVFc1JVRkJRU3h2UWtGQk1rSTdTVUZEYUVRc1VVRkJUeXhOUVVGTkxFTkJRVU1zU1VGQlNTeEZRVUZGTzFGQlEyaENMRXRCUVVzc09FSkJRVms3V1VGRFlpeFBRVUZQTEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRE8xRkJRMmhETEV0QlFVc3NORVJCUVRCRExFTkJRVU1zUTBGQlF6dFpRVU0zUXl4SlFVRkpMRk5CUVU4c1IwRkJXU3h4UWtGQllTeERRVUZETEV0QlFVc3NSVUZCUlN4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzFsQlEycEZMRWxCUVVrc1YwRkJVeXhIUVVGWExFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNVMEZCVXl4RFFVRkRPMWxCUXpsRExFbEJRVWtzUTBGQlF5eFRRVUZQTEVWQlFVVTdaMEpCUTFZc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eHZSRUZCYjBRc1JVRkJSU3hOUVVGTkxFTkJRVU1zUTBGQlF6dG5Ra0ZETVVVc1QwRkJUeXhMUVVGTExFTkJRVU03WVVGRGFFSTdXVUZEUkN4SlFVRkpMR0ZCUVZjc1IwRkJZeXhMUVVGTExFTkJRVU1zUjBGQlJ5eERRVUZGTEZWQlFVTXNRMEZCVlR0blFrRkRMME1zU1VGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4TFFVRkxMRk5CUVU4c1EwRkJReXhKUVVGSkxFVkJRVVU3YjBKQlEzaENMRU5CUVVNc1EwRkJReXh6UWtGQmMwSXNTVUZCU1N4WFFVRlRMRU5CUVVNN2FVSkJRM3BETzJkQ1FVTkVMRTlCUVU4c1EwRkJReXhEUVVGRE8xbEJRMklzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEU0N4UFFVRlBMR0ZCUVZjc1EwRkJRenRUUVVOMFFqdFJRVU5FTEV0QlFVc3NiVVJCUVdsRE8xbEJRMnhETEVsQlFVa3NUMEZCVHl4SFFVRlpMSEZDUVVGaExFTkJRVU1zUzBGQlN5eEZRVUZGTEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1YwRkJWeXhEUVVGRExFTkJRVU03V1VGRGNrVXNTVUZCU1N4RFFVRkRMRTlCUVU4c1JVRkJSVHRuUWtGRFZpeFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMRFpEUVVFMlF5eEZRVUZGTEUxQlFVMHNRMEZCUXl4RFFVRkRPMmRDUVVOdVJTeFBRVUZQTEV0QlFVc3NRMEZCUXp0aFFVTm9RanRaUVVORUxFbEJRVWtzVjBGQlZ5eEhRVUZqTEV0QlFVc3NRMEZCUXl4SFFVRkhMRU5CUVVVc1ZVRkJReXhEUVVGVk8yZENRVU12UXl4SlFVRkpMRU5CUVVNc1EwRkJReXhKUVVGSkxFdEJRVXNzVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4WFFVRlhMRVZCUVVVN2IwSkJRM0JETEVOQlFVTXNRMEZCUXl4dFFrRkJiVUlzUjBGQlJ5eE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVZVc1EwRkJRenRwUWtGRGJFUTdaMEpCUTBRc1QwRkJUeXhEUVVGRExFTkJRVU03V1VGRFlpeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTklMRTlCUVU4c1YwRkJWeXhEUVVGRE8xRkJRM1pDTEV0QlFVc3NLME5CUVRaQ0xFTkJRVU1zUTBGQlF6dFpRVU5vUXl4SlFVRkpMRk5CUVU4c1IwRkJXU3h4UWtGQllTeERRVUZETEV0QlFVc3NSVUZCUlN4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF5eERRVUZETzFsQlEzSkZMRWxCUVVrc1UwRkJUeXhIUVVGWkxFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRPMWxCUXpORExFbEJRVWtzUTBGQlF5eFRRVUZQTEVWQlFVVTdaMEpCUTFZc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eG5SRUZCWjBRc1JVRkJSU3hOUVVGTkxFTkJRVU1zUTBGQlF6dG5Ra0ZEZEVVc1QwRkJUeXhMUVVGTExFTkJRVU03WVVGRGFFSTdXVUZEUkN4SlFVRkpMR0ZCUVZjc1IwRkJZeXhMUVVGTExFTkJRVU1zUjBGQlJ5eERRVUZGTEZWQlFVTXNRMEZCVlR0blFrRkRMME1zU1VGQlNTeERRVUZETEVOQlFVTXNTVUZCU1N4TFFVRkxMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zVjBGQlZ6dHZRa0ZEYkVNc1EwRkJReXhEUVVGRExHVkJRV1VzUjBGQlJ5eFRRVUZQTEVOQlFVTTdaMEpCUTJoRExFOUJRVThzUTBGQlF5eERRVUZETzFsQlEySXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRTQ3hQUVVGUExHRkJRVmNzUTBGQlF6dFRRVU4wUWp0UlFVTkVMRXRCUVVzc1owUkJRVGhDTEVOQlFVTXNRMEZCUXp0WlFVTnFReXhKUVVGSkxHMUNRVUZwUWl4SFFVRmpMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zVVVGQlVTeERRVUZETzFsQlEzaEVMRWxCUVVrc1lVRkJWeXhIUVVGWExFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNWMEZCVnl4RFFVRkRPMWxCUTJ4RUxFbEJRVWtzVTBGQlR5eEhRVUZaTEhGQ1FVRmhMRU5CUVVNc1MwRkJTeXhGUVVGRkxHRkJRVmNzUTBGQlF5eERRVUZETzFsQlEzcEVMRWxCUVVjc1EwRkJReXhUUVVGUExFVkJRVVU3WjBKQlExUXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXg1UkVGQmVVUXNSVUZCUlN4TlFVRk5MRU5CUVVNc1EwRkJRenRuUWtGREwwVXNUMEZCVHl4TFFVRkxMRU5CUVVNN1lVRkRhRUk3V1VGRFJDeEpRVUZKTEdGQlFWY3NSMEZCWXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRkxGVkJRVU1zUTBGQlZUdG5Ra0ZETDBNc1NVRkJTU3hEUVVGRExFTkJRVU1zU1VGQlNTeExRVUZMTEdGQlFWYzdiMEpCUTNSQ0xFTkJRVU1zUTBGQlF5eFJRVUZSTEVkQlFVY3NiVUpCUVdsQ0xFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTXNRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJRenRuUWtGRGRFUXNUMEZCVHl4RFFVRkRMRU5CUVVNN1dVRkRZaXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU5JTEU5QlFVOHNZVUZCVnl4RFFVRkRPMU5CUTNSQ08xRkJRMFFzUzBGQlN5dzRRMEZCTkVJc1EwRkJReXhEUVVGRE8xbEJReTlDTEVsQlFVa3NhVUpCUVdVc1IwRkJSeXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXp0WlFVTXhReXhKUVVGSkxHRkJRVmNzUjBGQlJ5eE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRmRCUVZjc1EwRkJRenRaUVVNeFF5eEpRVUZKTEZOQlFVOHNSMEZCV1N4eFFrRkJZU3hEUVVGRExFdEJRVXNzUlVGQlJTeGhRVUZYTEVOQlFVTXNRMEZCUXp0WlFVTjZSQ3hKUVVGSkxFTkJRVU1zVTBGQlR5eEZRVUZGTzJkQ1FVTldMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zSzBOQlFTdERMRVZCUVVVc1MwRkJTeXhGUVVGRkxFMUJRVTBzUTBGQlF5eERRVUZETzJkQ1FVTTFSU3hQUVVGUExFdEJRVXNzUTBGQlF6dGhRVU5vUWp0WlFVTkVMRWxCUVVrc1lVRkJWeXhIUVVGakxFdEJRVXNzUTBGQlF5eEhRVUZITEVOQlFVTXNWVUZCUXl4RFFVRlZPMmRDUVVNNVF5eEpRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRXRCUVVzc1lVRkJWenR2UWtGRGNrSXNRMEZCUXl4RFFVRkRMRkZCUVZFc1IwRkJSeXhEUVVGRExFTkJRVU1zVVVGQlVTeERRVUZETEUxQlFVMHNRMEZCUXl4RFFVRkRMR2xDUVVGbExFTkJRVU1zUTBGQlF5eERRVUZETzJkQ1FVTjBSQ3hQUVVGUExFTkJRVU1zUTBGQlF6dFpRVU5pTEVOQlFVTXNRMEZCUXl4RFFVRkJPMWxCUTBZc1QwRkJUeXhoUVVGWExFTkJRVU03VTBGRGRFSTdVVUZEUkN4TFFVRkxMSEZEUVVGdFFqdFpRVU53UWl4UFFVRlBMRVZCUVVVc1EwRkJRenRSUVVOa08xbEJRMGtzVDBGQlR5eExRVUZMTEVOQlFVTTdTMEZEY0VJN1FVRkRUQ3hEUVVGRE8wRkJha1pFTEN0Q1FXbEdReUo5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIGNoYXRVc2Vyc0FjdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi9hY3Rpb25zL2NoYXRVc2Vyc0FjdGlvbnNcIik7XG52YXIgaW5pdGlhbFN0YXRlID0ge307XG5mdW5jdGlvbiBkZWZhdWx0XzEoc3RhdGUsIGFjdGlvbikge1xuICAgIGlmIChzdGF0ZSA9PT0gdm9pZCAwKSB7IHN0YXRlID0gaW5pdGlhbFN0YXRlOyB9XG4gICAgdmFyIF9hO1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBjaGF0VXNlcnNBY3Rpb25zXzEuVVBEQVRFX0NIQVRfVVNFUlM6XG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uLmRhdGEudXNlcnM7XG4gICAgICAgIGNhc2UgY2hhdFVzZXJzQWN0aW9uc18xLkFERF9DSEFUX1VTRVI6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIChfYSA9IHt9LFxuICAgICAgICAgICAgICAgIF9hW2FjdGlvbi5kYXRhLnVzZXIuZW1haWxdID0ge1xuICAgICAgICAgICAgICAgICAgICByb2xlOiBhY3Rpb24uZGF0YS51c2VyLnJvbGUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGFjdGlvbi5kYXRhLnVzZXIubmFtZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF9hKSk7XG4gICAgICAgIGNhc2UgY2hhdFVzZXJzQWN0aW9uc18xLlJFTU9WRV9DSEFUX1VTRVI6XG4gICAgICAgICAgICB2YXIgY2xvbmUgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSk7XG4gICAgICAgICAgICBkZWxldGUgY2xvbmVbYWN0aW9uLmRhdGEuZW1haWxdO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn1cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZGVmYXVsdF8xO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWTJoaGRGVnpaWEp6TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dkxpNHZMaTR2YzNKakwzZGxZaTl5WldSMVkyVnljeTlqYUdGMFZYTmxjbk11ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRkRRU3huUlVGRGRVTTdRVUZsZGtNc1NVRkJTU3haUVVGWkxFZEJRVlVzUlVGRmVrSXNRMEZCUVR0QlFVVkVMRzFDUVVGM1FpeExRVUV5UWl4RlFVRkZMRTFCUVdsQ08wbEJRVGxETEhOQ1FVRkJMRVZCUVVFc2IwSkJRVEpDT3p0SlFVTXZReXhSUVVGUExFMUJRVTBzUTBGQlF5eEpRVUZKTEVWQlFVVTdVVUZEYUVJc1MwRkJTeXh2UTBGQmFVSTdXVUZEYkVJc1QwRkJUeXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXp0UlFVTTNRaXhMUVVGTExHZERRVUZoTzFsQlEyUXNUMEZCVHl4TlFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExFVkJRVVVzUlVGQlJTeExRVUZMTzJkQ1FVTXhRaXhIUVVGRExFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1NVRkJSenR2UWtGRGRFSXNTVUZCU1N4RlFVRkZMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVazdiMEpCUXpOQ0xFbEJRVWtzUlVGQlJTeE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSk8ybENRVU01UWp0dlFrRkRTQ3hEUVVGRE8xRkJRMUFzUzBGQlN5eHRRMEZCWjBJN1dVRkRha0lzU1VGQlNTeExRVUZMTEVkQlFWVXNUVUZCVFN4RFFVRkRMRTFCUVUwc1EwRkJReXhGUVVGRkxFVkJRVVVzUzBGQlN5eERRVUZETEVOQlFVTTdXVUZETlVNc1QwRkJUeXhMUVVGTExFTkJRVU1zVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRVHRSUVVOdVF6dFpRVU5KTEU5QlFVOHNTMEZCU3l4RFFVRkRPMHRCUTNCQ08wRkJRMHdzUTBGQlF6dEJRV3BDUkN3clFrRnBRa01pZlE9PSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBub3RpZmljYXRpb25zQWN0aW9uc18xID0gcmVxdWlyZShcIi4uL2FjdGlvbnMvbm90aWZpY2F0aW9uc0FjdGlvbnNcIik7XG52YXIgaW5pdGlhbFN0YXRlID0ge1xuICAgIGVycm9yczogW10sXG4gICAgaW5mb3M6IFtdXG59O1xuZnVuY3Rpb24gZGVmYXVsdF8xKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBpZiAoc3RhdGUgPT09IHZvaWQgMCkgeyBzdGF0ZSA9IGluaXRpYWxTdGF0ZTsgfVxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBub3RpZmljYXRpb25zQWN0aW9uc18xLkFERF9FUlJPUjpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBlcnJvcnM6IHN0YXRlLmVycm9ycy5jb25jYXQoW2FjdGlvbi5kYXRhXSkgfSk7XG4gICAgICAgIGNhc2Ugbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5SRU1PVkVfRVJST1I6XG4gICAgICAgICAgICB2YXIgbmV3RXJyb3JzQXJyYXkgPSBzdGF0ZS5lcnJvcnMuc2xpY2UoKTtcbiAgICAgICAgICAgIG5ld0Vycm9yc0FycmF5LnNwbGljZShhY3Rpb24uZGF0YSwgMSk7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgZXJyb3JzOiBuZXdFcnJvcnNBcnJheSB9KTtcbiAgICAgICAgY2FzZSBub3RpZmljYXRpb25zQWN0aW9uc18xLkNMRUFSX0VSUk9SUzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBlcnJvcnM6IFtdIH0pO1xuICAgICAgICBjYXNlIG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuQUREX0lORk86XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgaW5mb3M6IHN0YXRlLmluZm9zLmNvbmNhdChbYWN0aW9uLmRhdGFdKSB9KTtcbiAgICAgICAgY2FzZSBub3RpZmljYXRpb25zQWN0aW9uc18xLlJFTU9WRV9JTkZPOlxuICAgICAgICAgICAgdmFyIG5ld0luZm9zQXJyYXkgPSBzdGF0ZS5pbmZvcy5zbGljZSgpO1xuICAgICAgICAgICAgbmV3SW5mb3NBcnJheS5zcGxpY2UoYWN0aW9uLmRhdGEsIDEpO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGluZm9zOiBuZXdJbmZvc0FycmF5IH0pO1xuICAgICAgICBjYXNlIG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuQ0xFQVJfSU5GT1M6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgaW5mb3M6IFtdIH0pO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn1cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZGVmYXVsdF8xO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYm05MGFXWnBZMkYwYVc5dWN5NXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1THk0dUwzTnlZeTkzWldJdmNtVmtkV05sY25NdmJtOTBhV1pwWTJGMGFXOXVjeTUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3p0QlFVRkJMSGRGUVVNeVF6dEJRVmN6UXl4SlFVRkpMRmxCUVZrc1IwRkJWVHRKUVVOMFFpeE5RVUZOTEVWQlFVVXNSVUZCUlR0SlFVTldMRXRCUVVzc1JVRkJSU3hGUVVGRk8wTkJRMW9zUTBGQlFUdEJRVVZFTEcxQ1FVRjNRaXhMUVVFeVFpeEZRVUZGTEUxQlFXTTdTVUZCTTBNc2MwSkJRVUVzUlVGQlFTeHZRa0ZCTWtJN1NVRkRMME1zVVVGQlR5eE5RVUZOTEVOQlFVTXNTVUZCU1N4RlFVRkZPMUZCUTJoQ0xFdEJRVXNzWjBOQlFWTTdXVUZEVml4UFFVRlBMRTFCUVUwc1EwRkJReXhOUVVGTkxFTkJRVU1zUlVGQlJTeEZRVUZGTEV0QlFVc3NSVUZCUlN4RlFVRkRMRTFCUVUwc1JVRkJSU3hMUVVGTExFTkJRVU1zVFVGQlRTeERRVUZETEUxQlFVMHNRMEZCUXl4RFFVRkRMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eEZRVUZETEVOQlFVTXNRMEZCUXp0UlFVTnNSaXhMUVVGTExHMURRVUZaTzFsQlEySXNTVUZCU1N4alFVRmpMRWRCUVVjc1MwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF5eExRVUZMTEVWQlFVVXNRMEZCUXp0WlFVTXhReXhqUVVGakxFTkJRVU1zVFVGQlRTeERRVUZETEUxQlFVMHNRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRGRFTXNUMEZCVHl4TlFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExFVkJRVVVzUlVGQlJTeExRVUZMTEVWQlFVVXNSVUZCUXl4TlFVRk5MRVZCUVVVc1kwRkJZeXhGUVVGRExFTkJRVU1zUTBGQlF6dFJRVU01UkN4TFFVRkxMRzFEUVVGWk8xbEJRMklzVDBGQlR5eE5RVUZOTEVOQlFVTXNUVUZCVFN4RFFVRkRMRVZCUVVVc1JVRkJSU3hMUVVGTExFVkJRVWNzUlVGQlF5eE5RVUZOTEVWQlFVVXNSVUZCUlN4RlFVRkRMRU5CUVVNc1EwRkJRenRSUVVOdVJDeExRVUZMTEN0Q1FVRlJPMWxCUTFRc1QwRkJUeXhOUVVGTkxFTkJRVU1zVFVGQlRTeERRVUZETEVWQlFVVXNSVUZCUlN4TFFVRkxMRVZCUVVVc1JVRkJReXhMUVVGTExFVkJRVVVzUzBGQlN5eERRVUZETEV0QlFVc3NRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJReXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNSVUZCUXl4RFFVRkRMRU5CUVVNN1VVRkRhRVlzUzBGQlN5eHJRMEZCVnp0WlFVTmFMRWxCUVVrc1lVRkJZU3hIUVVGSExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RlFVRkZMRU5CUVVNN1dVRkRlRU1zWVVGQllTeERRVUZETEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEzSkRMRTlCUVU4c1RVRkJUU3hEUVVGRExFMUJRVTBzUTBGQlF5eEZRVUZGTEVWQlFVVXNTMEZCU3l4RlFVRkZMRVZCUVVVc1MwRkJTeXhGUVVGRkxHRkJRV0VzUlVGQlJTeERRVUZETEVOQlFVTTdVVUZET1VRc1MwRkJTeXhyUTBGQlZ6dFpRVU5hTEU5QlFVOHNUVUZCVFN4RFFVRkRMRTFCUVUwc1EwRkJReXhGUVVGRkxFVkJRVVVzUzBGQlN5eEZRVUZGTEVWQlFVTXNTMEZCU3l4RlFVRkZMRVZCUVVVc1JVRkJReXhEUVVGRExFTkJRVU03VVVGRGFrUTdXVUZEU1N4UFFVRlBMRXRCUVVzc1EwRkJRenRMUVVOd1FqdEJRVU5NTEVOQlFVTTdRVUZ5UWtRc0swSkJjVUpESW4wPSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBzaWRlYmFyQWN0aW9uc18xID0gcmVxdWlyZShcIi4uL2FjdGlvbnMvc2lkZWJhckFjdGlvbnNcIik7XG52YXIgaW5pdGlhbFN0YXRlID0ge1xuICAgIG9wZW46IHRydWVcbn07XG5mdW5jdGlvbiBkZWZhdWx0XzEoc3RhdGUsIGFjdGlvbikge1xuICAgIGlmIChzdGF0ZSA9PT0gdm9pZCAwKSB7IHN0YXRlID0gaW5pdGlhbFN0YXRlOyB9XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIHNpZGViYXJBY3Rpb25zXzEuVE9HR0xFX1NJREVCQVJfT1BFTjpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBvcGVuOiAhc3RhdGUub3BlbiB9KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGRlZmF1bHRfMTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWMybGtaV0poY2k1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUx5NHVMeTR1TDNOeVl5OTNaV0l2Y21Wa2RXTmxjbk12YzJsa1pXSmhjaTUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3p0QlFVTkJMRFJFUVVGblJUdEJRVTFvUlN4SlFVRkpMRmxCUVZrc1IwRkJWVHRKUVVOMFFpeEpRVUZKTEVWQlFVVXNTVUZCU1R0RFFVTmlMRU5CUVVFN1FVRkZSQ3h0UWtGQmQwSXNTMEZCTWtJc1JVRkJSU3hOUVVGak8wbEJRVE5ETEhOQ1FVRkJMRVZCUVVFc2IwSkJRVEpDTzBsQlF5OURMRkZCUVZFc1RVRkJUU3hEUVVGRExFbEJRVWtzUlVGQlJUdFJRVU5xUWl4TFFVRkxMRzlEUVVGdFFqdFpRVU53UWl4UFFVRlBMRTFCUVUwc1EwRkJReXhOUVVGTkxFTkJRVU1zUlVGQlJTeEZRVUZGTEV0QlFVc3NSVUZCUlN4RlFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFdEJRVXNzUTBGQlF5eEpRVUZKTEVWQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTNwRU8xbEJRMGtzVDBGQlR5eExRVUZMTEVOQlFVTTdTMEZEY0VJN1FVRkRUQ3hEUVVGRE8wRkJVRVFzSzBKQlQwTWlmUT09IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIHNvY2tldEFjdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi9hY3Rpb25zL3NvY2tldEFjdGlvbnNcIik7XG52YXIgaW5pdGlhbFN0YXRlID0ge1xuICAgIGlvOiBudWxsLFxuICAgIGNvbm5lY3RlZDogZmFsc2UsXG4gICAgY29ubmVjdGVkVXNlckVtYWlsczogW11cbn07XG5mdW5jdGlvbiBkZWZhdWx0XzEoc3RhdGUsIGFjdGlvbikge1xuICAgIGlmIChzdGF0ZSA9PT0gdm9pZCAwKSB7IHN0YXRlID0gaW5pdGlhbFN0YXRlOyB9XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIHNvY2tldEFjdGlvbnNfMS5JTklUX1dFQlNPQ0tFVDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBpbzogYWN0aW9uLmRhdGEuaW8gfSk7XG4gICAgICAgIGNhc2Ugc29ja2V0QWN0aW9uc18xLlNFVF9TT0NLRVRfQ09OTkVDVEVEOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGNvbm5lY3RlZDogYWN0aW9uLmRhdGEuY29ubmVjdGVkIH0pO1xuICAgICAgICBjYXNlIHNvY2tldEFjdGlvbnNfMS5TRVRfU09DS0VUX0NPTk5FQ1RFRF9VU0VSUzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBjb25uZWN0ZWRVc2VyRW1haWxzOiBhY3Rpb24uZGF0YS51c2VyRW1haWxzIH0pO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn1cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZGVmYXVsdF8xO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYzI5amEyVjBMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dkxpNHZjM0pqTDNkbFlpOXlaV1IxWTJWeWN5OXpiMk5yWlhRdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZIUVN3d1JFRkhiME03UVVGUmNFTXNTVUZCU1N4WlFVRlpMRWRCUVZVN1NVRkRkRUlzUlVGQlJTeEZRVUZGTEVsQlFVazdTVUZEVWl4VFFVRlRMRVZCUVVVc1MwRkJTenRKUVVOb1FpeHRRa0ZCYlVJc1JVRkJSU3hGUVVGRk8wTkJRekZDTEVOQlFVRTdRVUZGUkN4dFFrRkJkMElzUzBGQk1rSXNSVUZCUlN4TlFVRnBRanRKUVVFNVF5eHpRa0ZCUVN4RlFVRkJMRzlDUVVFeVFqdEpRVU12UXl4UlFVRlBMRTFCUVUwc1EwRkJReXhKUVVGSkxFVkJRVVU3VVVGRGFFSXNTMEZCU3l3NFFrRkJZenRaUVVObUxFOUJRVThzVFVGQlRTeERRVUZETEUxQlFVMHNRMEZCUXl4RlFVRkZMRVZCUVVVc1MwRkJTeXhGUVVGRkxFVkJRVU1zUlVGQlJTeEZRVUZGTEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSU3hGUVVGRExFTkJRVU1zUTBGQlF6dFJRVU14UkN4TFFVRkxMRzlEUVVGdlFqdFpRVU55UWl4UFFVRlBMRTFCUVUwc1EwRkJReXhOUVVGTkxFTkJRVU1zUlVGQlJTeEZRVUZGTEV0QlFVc3NSVUZCUlN4RlFVRkRMRk5CUVZNc1JVRkJSU3hOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEZOQlFWTXNSVUZCUXl4RFFVRkRMRU5CUVVNN1VVRkRlRVVzUzBGQlN5d3dRMEZCTUVJN1dVRkRNMElzVDBGQlR5eE5RVUZOTEVOQlFVTXNUVUZCVFN4RFFVRkRMRVZCUVVVc1JVRkJSU3hMUVVGTExFVkJRVVVzUlVGQlF5eHRRa0ZCYlVJc1JVRkJSU3hOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFWVXNSVUZCUlN4RFFVRkRMRU5CUVVFN1VVRkRia1k3V1VGRFNTeFBRVUZQTEV0QlFVc3NRMEZCUXp0TFFVTndRanRCUVVOTUxFTkJRVU03UVVGWVJDd3JRa0ZYUXlKOSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciB1c2VyQWN0aW9uc18xID0gcmVxdWlyZShcIi4uL2FjdGlvbnMvdXNlckFjdGlvbnNcIik7XG52YXIgaW5pdGlhbFN0YXRlID0ge1xuICAgIGF1dGhvcml6ZWQ6IGZhbHNlLFxuICAgIGVtYWlsOiBmYWxzZSxcbiAgICBuYW1lOiBmYWxzZSxcbiAgICByb2xlOiBmYWxzZSxcbiAgICBqd3Q6IGZhbHNlLFxufTtcbmZ1bmN0aW9uIGRlZmF1bHRfMShzdGF0ZSwgYWN0aW9uKSB7XG4gICAgaWYgKHN0YXRlID09PSB2b2lkIDApIHsgc3RhdGUgPSBpbml0aWFsU3RhdGU7IH1cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgdXNlckFjdGlvbnNfMS5TRVRfQVVUSE9SSVpFRDpcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYWN0aW9uLmRhdGEgIT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGEgbXVzdCBiZSBib29sZWFuIGZvciBTRVRfQVVUSE9SSVpFRCBhY3Rpb24nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWN0aW9uLmRhdGEgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBhdXRob3JpemVkOiBmYWxzZSwgZW1haWw6IGZhbHNlIH0pO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGF1dGhvcml6ZWQ6IGFjdGlvbi5kYXRhIH0pO1xuICAgICAgICBjYXNlIHVzZXJBY3Rpb25zXzEuU0VUX1VTRVI6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIGFjdGlvbi5kYXRhKTtcbiAgICAgICAgY2FzZSB1c2VyQWN0aW9uc18xLkxPR09VVF9VU0VSOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBhdXRob3JpemVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBuYW1lOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlbWFpbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgcm9sZTogZmFsc2VcbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgdXNlckFjdGlvbnNfMS5TRVRfSldUOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHRva2VuOiBhY3Rpb24uZGF0YSB9KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGRlZmF1bHRfMTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWRYTmxjaTVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUx5NHVMM055WXk5M1pXSXZjbVZrZFdObGNuTXZkWE5sY2k1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96dEJRVUZCTEhORVFVRnpSanRCUVdWMFJpeEpRVUZKTEZsQlFWa3NSMEZCVnp0SlFVTjJRaXhWUVVGVkxFVkJRVVVzUzBGQlN6dEpRVU5xUWl4TFFVRkxMRVZCUVVVc1MwRkJTenRKUVVOYUxFbEJRVWtzUlVGQlJTeExRVUZMTzBsQlExZ3NTVUZCU1N4RlFVRkZMRXRCUVVzN1NVRkRXQ3hIUVVGSExFVkJRVVVzUzBGQlN6dERRVU5pTEVOQlFVRTdRVUZIUkN4dFFrRkJkMElzUzBGQk1rSXNSVUZCUlN4TlFVRmpPMGxCUVRORExITkNRVUZCTEVWQlFVRXNiMEpCUVRKQ08wbEJReTlETEZGQlFWRXNUVUZCVFN4RFFVRkRMRWxCUVVrc1JVRkJSVHRSUVVOcVFpeExRVUZMTERSQ1FVRmpPMWxCUTJZc1NVRkJTU3hQUVVGUExFMUJRVTBzUTBGQlF5eEpRVUZKTEV0QlFVc3NVMEZCVXl4RlFVRkZPMmRDUVVOc1F5eFBRVUZQTEVOQlFVTXNTMEZCU3l4RFFVRkRMR2RFUVVGblJDeERRVUZETEVOQlFVTTdaMEpCUTJoRkxFOUJRVThzUzBGQlN5eERRVUZETzJGQlEyaENPMWxCUTBRc1NVRkJTU3hOUVVGTkxFTkJRVU1zU1VGQlNTeExRVUZMTEV0QlFVczdaMEpCUTNKQ0xFOUJRVThzVFVGQlRTeERRVUZETEUxQlFVMHNRMEZCUXl4RlFVRkZMRVZCUVVVc1MwRkJTeXhGUVVGRkxFVkJRVU1zVlVGQlZTeEZRVUZGTEV0QlFVc3NSVUZCUlN4TFFVRkxMRVZCUVVVc1MwRkJTeXhGUVVGRExFTkJRVU1zUTBGQlF6dFpRVU4yUlN4UFFVRlBMRTFCUVUwc1EwRkJReXhOUVVGTkxFTkJRVU1zUlVGQlJTeEZRVUZGTEV0QlFVc3NSVUZCUlN4RlFVRkRMRlZCUVZVc1JVRkJSU3hOUVVGTkxFTkJRVU1zU1VGQlNTeEZRVUZETEVOQlFVTXNRMEZCUXp0UlFVTXZSQ3hMUVVGTExITkNRVUZSTzFsQlExUXNUMEZCVHl4TlFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExFVkJRVVVzUlVGQlJTeExRVUZMTEVWQlFVVXNUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRMnBFTEV0QlFVc3NlVUpCUVZjN1dVRkRXaXhQUVVGUE8yZENRVU5JTEZWQlFWVXNSVUZCUlN4TFFVRkxPMmRDUVVOcVFpeEpRVUZKTEVWQlFVVXNTMEZCU3p0blFrRkRXQ3hMUVVGTExFVkJRVVVzUzBGQlN6dG5Ra0ZEV2l4SlFVRkpMRVZCUVVVc1MwRkJTenRoUVVOa0xFTkJRVUU3VVVGRFRDeExRVUZMTEhGQ1FVRlBPMWxCUTFJc1QwRkJUeXhOUVVGTkxFTkJRVU1zVFVGQlRTeERRVUZETEVWQlFVVXNSVUZCUlN4TFFVRkxMRVZCUVVVc1JVRkJReXhMUVVGTExFVkJRVVVzVFVGQlRTeERRVUZETEVsQlFVa3NSVUZCUXl4RFFVRkRMRU5CUVVNN1VVRkRNVVE3V1VGRFNTeFBRVUZQTEV0QlFVc3NRMEZCUXp0TFFVTndRanRCUVVOTUxFTkJRVU03UVVGNFFrUXNLMEpCZDBKREluMD0iLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgcmVkdXhfMSA9IHJlcXVpcmUoXCJyZWR1eFwiKTtcbnZhciByZWR1eF90aHVua18xID0gcmVxdWlyZShcInJlZHV4LXRodW5rXCIpO1xudmFyIHJlZHV4X2xvZ2dlcl8xID0gcmVxdWlyZShcInJlZHV4LWxvZ2dlclwiKTtcbnZhciB1c2VyXzEgPSByZXF1aXJlKFwiLi9yZWR1Y2Vycy91c2VyXCIpO1xudmFyIGNoYW5uZWxzXzEgPSByZXF1aXJlKFwiLi9yZWR1Y2Vycy9jaGFubmVsc1wiKTtcbnZhciBub3RpZmljYXRpb25zXzEgPSByZXF1aXJlKFwiLi9yZWR1Y2Vycy9ub3RpZmljYXRpb25zXCIpO1xudmFyIHNpZGViYXJfMSA9IHJlcXVpcmUoXCIuL3JlZHVjZXJzL3NpZGViYXJcIik7XG52YXIgc29ja2V0XzEgPSByZXF1aXJlKFwiLi9yZWR1Y2Vycy9zb2NrZXRcIik7XG52YXIgY2hhdFVzZXJzXzEgPSByZXF1aXJlKFwiLi9yZWR1Y2Vycy9jaGF0VXNlcnNcIik7XG52YXIgZW52ID0gcmVxdWlyZSgnLi4vLi4vZW52Jyk7XG5leHBvcnRzLnJvb3RSZWR1Y2VyID0gcmVkdXhfMS5jb21iaW5lUmVkdWNlcnMoe1xuICAgIHVzZXI6IHVzZXJfMVtcImRlZmF1bHRcIl0sXG4gICAgY2hhbm5lbHM6IGNoYW5uZWxzXzFbXCJkZWZhdWx0XCJdLFxuICAgIG5vdGlmaWNhdGlvbnM6IG5vdGlmaWNhdGlvbnNfMVtcImRlZmF1bHRcIl0sXG4gICAgc2lkZWJhcjogc2lkZWJhcl8xW1wiZGVmYXVsdFwiXSxcbiAgICBzb2NrZXQ6IHNvY2tldF8xW1wiZGVmYXVsdFwiXSxcbiAgICBjaGF0VXNlcnM6IGNoYXRVc2Vyc18xW1wiZGVmYXVsdFwiXSxcbn0pO1xuZXhwb3J0cy5taWRkbGV3YXJlID0gZW52LnByb2R1Y3Rpb24gfHwgZW52LmRpc2FibGVSZWR1eExvZ2dpbmcgP1xuICAgIHJlZHV4XzEuYXBwbHlNaWRkbGV3YXJlKHJlZHV4X3RodW5rXzFbXCJkZWZhdWx0XCJdKSA6IHJlZHV4XzEuYXBwbHlNaWRkbGV3YXJlKHJlZHV4X3RodW5rXzFbXCJkZWZhdWx0XCJdLCByZWR1eF9sb2dnZXJfMS5jcmVhdGVMb2dnZXIoKSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHJlZHV4XzEuY3JlYXRlU3RvcmUoZXhwb3J0cy5yb290UmVkdWNlciwgZXhwb3J0cy5taWRkbGV3YXJlKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWMzUnZjbVV1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk4dUxpOXpjbU12ZDJWaUwzTjBiM0psTG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN08wRkJRVUVzSzBKQlFUUkdPMEZCUXpWR0xESkRRVUZ4UXp0QlFVTnlReXcyUTBGQk1FTTdRVUZGTVVNc2QwTkJRV2RGTzBGQlEyaEZMR2RFUVVFMFJUdEJRVU0xUlN3d1JFRkJNa1k3UVVGRE0wWXNPRU5CUVhsRk8wRkJRM3BGTERSRFFVRnpSVHRCUVVOMFJTeHJSRUZCSzBVN1FVRkZMMFVzU1VGQlRTeEhRVUZITEVkQlFVY3NUMEZCVHl4RFFVRkRMRmRCUVZjc1EwRkJReXhEUVVGRE8wRkJWM0JDTEZGQlFVRXNWMEZCVnl4SFFVRlpMSFZDUVVGbExFTkJRVU03U1VGRGFFUXNTVUZCU1N4RlFVRkZMR2xDUVVGWE8wbEJRMnBDTEZGQlFWRXNSVUZCUlN4eFFrRkJaVHRKUVVONlFpeGhRVUZoTEVWQlFVVXNNRUpCUVc5Q08wbEJRMjVETEU5QlFVOHNSVUZCUlN4dlFrRkJZenRKUVVOMlFpeE5RVUZOTEVWQlFVVXNiVUpCUVdFN1NVRkRja0lzVTBGQlV5eEZRVUZGTEhOQ1FVRm5RanREUVVNNVFpeERRVUZETEVOQlFVTTdRVUZGVlN4UlFVRkJMRlZCUVZVc1IwRkRia0lzUjBGQlJ5eERRVUZETEZWQlFWVXNTVUZCU1N4SFFVRkhMRU5CUVVNc2JVSkJRVzFDTEVOQlFVTXNRMEZCUXp0SlFVTXpReXgxUWtGQlpTeERRVUZETEhkQ1FVRlZMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zZFVKQlFXVXNRMEZCUXl4M1FrRkJWU3hGUVVGRkxESkNRVUZaTEVWQlFVVXNRMEZCUXl4RFFVRkRPMEZCUlRsRkxIRkNRVUZsTEcxQ1FVRlhMRU5CUVVNc2JVSkJRVmNzUlVGQlJTeHJRa0ZCVlN4RFFVRkRMRU5CUVVNaWZRPT0iLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgc2VydmVyXzEgPSByZXF1aXJlKFwiLi4vc3JjL3NlcnZlci9zZXJ2ZXJcIik7XG5leHBvcnRzLmFwcCA9IHNlcnZlcl8xLmFwcDtcbnZhciBVc2VyXzEgPSByZXF1aXJlKFwiLi4vc3JjL3NlcnZlci9tb2RlbHMvVXNlclwiKTtcbnZhciBkcm9wQWxsQ29sbGVjdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHAgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIFVzZXJfMVtcImRlZmF1bHRcIl0uZGVsZXRlTWFueSh7fSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gcC50aGVuKClbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICB9KTtcbn07XG5leHBvcnRzLmRyb3BBbGxDb2xsZWN0aW9ucyA9IGRyb3BBbGxDb2xsZWN0aW9ucztcbnZhciBOb3RJbXBsZW1lbnRlZEVycm9yID0gbmV3IEVycm9yKCdUZXN0IG5vdCBpbXBsZW1lbnRlZCcpO1xuZXhwb3J0cy5Ob3RJbXBsZW1lbnRlZEVycm9yID0gTm90SW1wbGVtZW50ZWRFcnJvcjtcbmJlZm9yZSgnYWxsIHRlc3RzJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICBjb25zb2xlLmxvZyhwcm9jZXNzLnZlcnNpb24pO1xuICAgIHNlcnZlcl8xLmNvbm4ub24oJ2Nvbm5lY3RlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NlcnZlciBzdGFydGVkJyk7XG4gICAgICAgIGRvbmUoKTtcbiAgICB9KTtcbn0pO1xuYmVmb3JlRWFjaCgncmVzZXQgREInLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgIGRyb3BBbGxDb2xsZWN0aW9ucygpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9uZSgpOyB9KTtcbn0pO1xuYWZ0ZXIoJ2FsbCB0ZXN0cycsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgZHJvcEFsbENvbGxlY3Rpb25zKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDbG9zaW5nIGNvbm5lY3Rpb25zJyk7XG4gICAgICAgIHNlcnZlcl8xLmNvbm4uY2xvc2UoKTtcbiAgICAgICAgZG9uZSgpO1xuICAgIH0pO1xufSk7XG5yZXF1aXJlKCcuL3dlYi90ZXN0U3RvcmUnKTtcbnJlcXVpcmUoJy4vd2ViL3Rlc3RBc3luY0FjdGlvbnMnKTtcbnJlcXVpcmUoJy4vc2VydmVyL3Rlc3RBdXRoQ29udHJvbGxlcicpO1xucmVxdWlyZSgnLi9zZXJ2ZXIvdGVzdFVzZXJDb250cm9sbGVyJyk7XG5yZXF1aXJlKCcuL3NlcnZlci90ZXN0TWVzc2FnZUNvbnRyb2xsZXInKTtcbnJlcXVpcmUoJy4vc2VydmVyL3Rlc3RDaGFubmVsQ29udHJvbGxlcicpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYVc1a1pYZ3Vhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOHVMaTkwWlhOMGN5OXBibVJsZUM1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96dEJRVUZCTEN0RFFVRnBSRHRCUVd0RWVFTXNZMEZzUkUwc1dVRkJSeXhEUVd0RVRqdEJRV3BFV2l4clJFRkJOa003UVVGRk4wTXNTVUZCVFN4clFrRkJhMElzUjBGQlJ6dEpRVU4yUWl4SlFVRkpMRU5CUVVNc1IwRkJSeXhKUVVGSkxFOUJRVThzUTBGQlF5eFZRVUZETEU5QlFVOHNSVUZCUlN4TlFVRk5PMUZCUTJoRExHbENRVUZKTEVOQlFVTXNWVUZCVlN4RFFVRkRMRVZCUVVVc1JVRkJSU3hWUVVGRExFZEJRVkU3V1VGRGVrSXNTVUZCU1N4SFFVRkhPMmRDUVVGRkxFOUJRVThzVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMWxCUXpWQ0xFOUJRVThzVDBGQlR5eEZRVUZGTEVOQlFVTTdVVUZEY2tJc1EwRkJReXhEUVVGRExFTkJRVUU3U1VGRFRpeERRVUZETEVOQlFVTXNRMEZCUVR0SlFVTkdMRTlCUVU4c1EwRkJReXhEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETEU5QlFVc3NRMEZCUVN4RFFVRkRMRlZCUVVNc1IwRkJVVHRSUVVNelFpeFBRVUZQTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8wbEJRM1pDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMEZCUTFBc1EwRkJReXhEUVVGQk8wRkJjVU5oTEdkRVFVRnJRanRCUVc1RGFFTXNTVUZCVFN4dFFrRkJiVUlzUjBGQlJ5eEpRVUZKTEV0QlFVc3NRMEZCUXl4elFrRkJjMElzUTBGQlF5eERRVUZETzBGQmJVTTFRaXhyUkVGQmJVSTdRVUZxUTNKRUxFMUJRVTBzUTBGQlF5eFhRVUZYTEVWQlFVVXNWVUZCVXl4SlFVRkpPMGxCUlRkQ0xFOUJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNUMEZCVHl4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRE8wbEJRemRDTEdGQlFVa3NRMEZCUXl4RlFVRkZMRU5CUVVNc1YwRkJWeXhGUVVGRk8xRkJRMnBDTEU5QlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc1owSkJRV2RDTEVOQlFVTXNRMEZCUXp0UlFVTTVRaXhKUVVGSkxFVkJRVVVzUTBGQlF6dEpRVU5ZTEVOQlFVTXNRMEZCUXl4RFFVRkRPMEZCUTFBc1EwRkJReXhEUVVGRExFTkJRVU03UVVGRFNDeFZRVUZWTEVOQlFVTXNWVUZCVlN4RlFVRkZMRlZCUVZNc1NVRkJTVHRKUVVWb1F5eHJRa0ZCYTBJc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eGpRVUZOTEU5QlFVRXNTVUZCU1N4RlFVRkZMRVZCUVU0c1EwRkJUU3hEUVVGRExFTkJRVU03UVVGRE5VTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1FVRkRTQ3hMUVVGTExFTkJRVU1zVjBGQlZ5eEZRVUZGTEZWQlFWTXNTVUZCU1R0SlFVVTFRaXhyUWtGQmEwSXNSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJRenRSUVVOMFFpeFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMSEZDUVVGeFFpeERRVUZETEVOQlFVTTdVVUZEYmtNc1lVRkJTU3hEUVVGRExFdEJRVXNzUlVGQlJTeERRVUZETzFGQlEySXNTVUZCU1N4RlFVRkZMRU5CUVVNN1NVRkRXQ3hEUVVGRExFTkJRVU1zUTBGQlF6dEJRVU5RTEVOQlFVTXNRMEZCUXl4RFFVRkJPMEZCUzBZc1QwRkJUeXhEUVVGRExHbENRVUZwUWl4RFFVRkRMRU5CUVVNN1FVRkRNMElzVDBGQlR5eERRVUZETEhkQ1FVRjNRaXhEUVVGRExFTkJRVU03UVVGSGJFTXNUMEZCVHl4RFFVRkRMRFpDUVVFMlFpeERRVUZETEVOQlFVTTdRVUZEZGtNc1QwRkJUeXhEUVVGRExEWkNRVUUyUWl4RFFVRkRMRU5CUVVNN1FVRkRka01zVDBGQlR5eERRVUZETEdkRFFVRm5ReXhEUVVGRExFTkJRVU03UVVGRE1VTXNUMEZCVHl4RFFVRkRMR2REUVVGblF5eERRVUZETEVOQlFVTWlmUT09IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIHJlcXVlc3QgPSByZXF1aXJlKFwic3VwZXJ0ZXN0XCIpO1xudmFyIGJjcnlwdGpzXzEgPSByZXF1aXJlKFwiYmNyeXB0anNcIik7XG52YXIgX18xID0gcmVxdWlyZShcIi4uL1wiKTtcbnZhciBVc2VyXzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL3NlcnZlci9tb2RlbHMvVXNlclwiKTtcbnZhciBjaGFpXzEgPSByZXF1aXJlKFwiY2hhaVwiKTtcbnZhciBzZXNzaW9uID0gcmVxdWlyZSgnc3VwZXJ0ZXN0LXNlc3Npb24nKTtcbmRlc2NyaWJlKCdBdXRoIENvbnRyb2xsZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgZGVzY3JpYmUoJ1BPU1QgL2FwaS92MS9sb2dpbicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgX18xLmRyb3BBbGxDb2xsZWN0aW9ucygpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciB1c2VyID0gbmV3IFVzZXJfMVtcImRlZmF1bHRcIl0oe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnQWRyaWFuJyxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IGJjcnlwdGpzXzEuaGFzaFN5bmMoJ3Rlc3QnKSxcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogJ3VzZXInLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHVzZXIuc2F2ZSgpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHsgcmV0dXJuIGRvbmUoKTsgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBsb2dpbiB0aGUgdXNlcicsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgICAgICBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAndGVzdCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgyMDApXG4gICAgICAgICAgICAgICAgLmVuZChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRoZSBsb2dnZWQtaW4gdXNlciBkZXRhaWxzJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS9sb2dpbicpXG4gICAgICAgICAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgICAgIGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICd0ZXN0J1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMClcbiAgICAgICAgICAgICAgICAuZW5kKGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgdmFyIGpzb24gPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKGpzb24uZW1haWwsICd0ZXN0QHRlc3QuY29tJyk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChqc29uLnJvbGUsICd1c2VyJyk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChqc29uLm5hbWUsICdBZHJpYW4nKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGFuIGVycm9yIGlmIHRoZSBlbWFpbCBkb2VzIG5vdCBleGlzdCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgICAgICBlbWFpbDogJ3Rlc3QuZG9lcy5ub3QuZXhpdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICd0ZXN0J1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMSlcbiAgICAgICAgICAgICAgICAuZW5kKGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgdmFyIGpzb24gPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKGpzb24uZXJyb3IsICdJbnZhbGlkIGVtYWlsIG9yIHBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBhbiBlcnJvciBpZiB0aGUgcGFzc3dvcmQgZG9lcyBub3QgbWF0Y2ggdGhlIGhhc2gnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL2xvZ2luJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICAgICAgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJ3Rlc3QtaW52YWxpZC1wYXNzd29yZCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDEpXG4gICAgICAgICAgICAgICAgLmVuZChmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIHZhciBqc29uID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChqc29uLmVycm9yLCAnSW52YWxpZCBlbWFpbCBvciBwYXNzd29yZCcpO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYW4gZXJyb3IgaWYgdGhlIGVtYWlsIG9yIHBhc3N3b3JkIGlzIG1pc3NpbmcnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL2xvZ2luJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICd0ZXN0J1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMClcbiAgICAgICAgICAgICAgICAuZW5kKGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgdmFyIGpzb24gPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKGpzb24uZXJyb3IsICdQbGVhc2Ugc3VwcGx5IGFuIGVtYWlsIGFuZCBwYXNzd29yZCcpO1xuICAgICAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAndGVzdEB0ZXN0LmNvbScgfSlcbiAgICAgICAgICAgICAgICAgICAgLmV4cGVjdCg0MDApXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICB2YXIganNvbiA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKGpzb24uZXJyb3IsICdQbGVhc2Ugc3VwcGx5IGFuIGVtYWlsIGFuZCBwYXNzd29yZCcpO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGFuIGVycm9yIGlmIHRoZSBlbWFpbCBpcyBub3QgdmFsaWQnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKS5wb3N0KCcvYXBpL3YxL2xvZ2luJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAnbm90IGFuIGVtYWlsQGFzZGYnLCBwYXNzd29yZDogJzEyMzQnIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDApXG4gICAgICAgICAgICAgICAgLmVuZChmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIHZhciBqc29uID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChqc29uLmVycm9yLCAnTm90IGEgdmFsaWQgZW1haWwgYWRkcmVzcycpO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnUE9TVCAvYXBpL3YxL3JlZ2lzdGVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICBfXzEuZHJvcEFsbENvbGxlY3Rpb25zKCkudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBkb25lKCk7IH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZWdpc3RlciBhIHVzZXInLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKS5wb3N0KCcvYXBpL3YxL3JlZ2lzdGVyJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsIHBhc3N3b3JkOiAndGVzdCcgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMClcbiAgICAgICAgICAgICAgICAuZW5kKGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgVXNlcl8xW1wiZGVmYXVsdFwiXS5maW5kQnlFbWFpbCgndGVzdEB0ZXN0LmNvbScpLmV4ZWMoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5mYWlsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBjcmVhdGUgYW4gYWRtaW4gdXNlciBpZiBubyB1c2VycyBleGlzdCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApLnBvc3QoJy9hcGkvdjEvcmVnaXN0ZXInKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICd0ZXN0QHRlc3QuY29tJywgcGFzc3dvcmQ6ICd0ZXN0JyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwKVxuICAgICAgICAgICAgICAgIC5lbmQoZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICBVc2VyXzFbXCJkZWZhdWx0XCJdLmZpbmRCeUVtYWlsKCd0ZXN0QHRlc3QuY29tJykuZXhlYygpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmZhaWwoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKHVzZXIucm9sZSwgJ2FkbWluJyk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBjcmVhdGUgYSByZWd1bGFyIHVzZXIgaWYgdXNlcnMgZXhpc3QnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdmFyIHUgPSBuZXcgVXNlcl8xW1wiZGVmYXVsdFwiXSh7XG4gICAgICAgICAgICAgICAgbmFtZTogJ3Rlc3QnLFxuICAgICAgICAgICAgICAgIGVtYWlsOiAnYWRtaW5AdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAncGFzc3dvcmQnLFxuICAgICAgICAgICAgICAgIHJvbGU6ICdhZG1pbidcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdS5zYXZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKS5wb3N0KCcvYXBpL3YxL3JlZ2lzdGVyJylcbiAgICAgICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nLCBwYXNzd29yZDogJ3Rlc3QnIH0pXG4gICAgICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwKVxuICAgICAgICAgICAgICAgICAgICAuZW5kKGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgVXNlcl8xW1wiZGVmYXVsdFwiXS5maW5kQnlFbWFpbCgndGVzdEB0ZXN0LmNvbScpLmV4ZWMoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmZhaWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwodXNlci5yb2xlLCAndXNlcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBhbiBlcnJvciBpZiBlbWFpbCBvciBwYXNzd29yZCBub3QgcHJvdmlkZWQnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKS5wb3N0KCcvYXBpL3YxL3JlZ2lzdGVyJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAndGVzdEB0ZXN0LmNvbScgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMClcbiAgICAgICAgICAgICAgICAuZW5kKGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgdmFyIGpzb24gPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKGpzb24uZXJyb3IsICdQbGVhc2Ugc3VwcGx5IGFuIGVtYWlsIGFuZCBwYXNzd29yZCcpO1xuICAgICAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcCkucG9zdCgnL2FwaS92MS9yZWdpc3RlcicpXG4gICAgICAgICAgICAgICAgICAgIC5zZW5kKHsgcGFzc3dvcmQ6ICcxMjMnIH0pXG4gICAgICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwKVxuICAgICAgICAgICAgICAgICAgICAuZW5kKGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGpzb24gPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChqc29uLmVycm9yLCAnUGxlYXNlIHN1cHBseSBhbiBlbWFpbCBhbmQgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBhbiBlcnJvciBpZiBub3QgYSB2YWxpZCBlbWFpbCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApLnBvc3QoJy9hcGkvdjEvcmVnaXN0ZXInKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICdub3QgYW4gZW1haWwgQCBhc2RsZmtqO2wnLCBwYXNzd29yZDogJzEyMzQnIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDApXG4gICAgICAgICAgICAgICAgLmVuZChmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIHZhciBqc29uID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChqc29uLmVycm9yLCAnTm90IGEgdmFsaWQgZW1haWwgYWRkcmVzcycpO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnUE9TVCAvYXBpL3YxL2xvZ291dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRlc3RTZXNzaW9uO1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICB0ZXN0U2Vzc2lvbiA9IHNlc3Npb24oX18xLmFwcCk7XG4gICAgICAgICAgICBfXzEuZHJvcEFsbENvbGxlY3Rpb25zKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHVzZXIgPSBuZXcgVXNlcl8xW1wiZGVmYXVsdFwiXSh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdBZHJpYW4nLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogYmNyeXB0anNfMS5oYXNoU3luYygndGVzdCcpLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiAndXNlcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdXNlci5zYXZlKCkudGhlbihmdW5jdGlvbiAodXNlcikgeyByZXR1cm4gZG9uZSgpOyB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGxvZyBvdXQgdGhlIHVzZXInLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdGVzdFNlc3Npb24ucG9zdCgnL2FwaS92MS9sb2dpbicpXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nLCBwYXNzd29yZDogJ3Rlc3QnIH0pLmVuZChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICB0ZXN0U2Vzc2lvbi5nZXQoJy9hcGkvdjEvdXNlcicpLnNlbmQoKS5leHBlY3QoMjAwKS5lbmQoZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgdGVzdFNlc3Npb24uZ2V0KCcvYXBpL3YxL2xvZ291dCcpLnNlbmQoKS5leHBlY3QoMjAwKS5lbmQoZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVzdFNlc3Npb24uZ2V0KCcvYXBpL3YxL3VzZXInKS5zZW5kKCkuZXhwZWN0KDQwMSkuZW5kKGRvbmUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pZEdWemRFRjFkR2hEYjI1MGNtOXNiR1Z5TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dkxpNHZkR1Z6ZEhNdmMyVnlkbVZ5TDNSbGMzUkJkWFJvUTI5dWRISnZiR3hsY2k1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96dEJRVUZCTEcxRFFVRnhRenRCUVVOeVF5eHhRMEZCYjBNN1FVRkRjRU1zZVVKQlFUaERPMEZCUXpsRExIRkVRVUV5UkR0QlFVTXpSQ3cyUWtGQk9FSTdRVUZGT1VJc1NVRkJUU3hQUVVGUExFZEJRVWNzVDBGQlR5eERRVUZETEcxQ1FVRnRRaXhEUVVGRExFTkJRVU03UVVGRk4wTXNVVUZCVVN4RFFVRkRMR2xDUVVGcFFpeEZRVUZGTzBsQlEzaENMRkZCUVZFc1EwRkJReXh2UWtGQmIwSXNSVUZCUlR0UlFVTXpRaXhWUVVGVkxFTkJRVU1zVlVGQlZTeEpRVUZKTzFsQlEzSkNMSE5DUVVGclFpeEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRPMmRDUVVOMFFpeEpRVUZKTEVsQlFVa3NSMEZCVlN4SlFVRkpMR2xDUVVGSkxFTkJRVU03YjBKQlEzWkNMRWxCUVVrc1JVRkJSU3hSUVVGUk8yOUNRVU5rTEV0QlFVc3NSVUZCUlN4bFFVRmxPMjlDUVVOMFFpeFJRVUZSTEVWQlFVVXNiVUpCUVZFc1EwRkJReXhOUVVGTkxFTkJRVU03YjBKQlF6RkNMRWxCUVVrc1JVRkJSU3hOUVVGTk8ybENRVU5tTEVOQlFVTXNRMEZCUXp0blFrRkRTQ3hKUVVGSkxFTkJRVU1zU1VGQlNTeEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVVNc1NVRkJWeXhKUVVGTExFOUJRVUVzU1VGQlNTeEZRVUZGTEVWQlFVNHNRMEZCVFN4RFFVRkRMRU5CUVVNc1QwRkJTeXhEUVVGQkxFTkJRVU1zVlVGQlF5eEhRVUZSTzI5Q1FVTnlSQ3hOUVVGTkxFZEJRVWNzUTBGQlF6dG5Ra0ZEWkN4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOUUxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExQXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hGUVVGRkxFTkJRVU1zZFVKQlFYVkNMRVZCUVVVc1ZVRkJVeXhKUVVGSk8xbEJRM0pETEU5QlFVOHNRMEZCUXl4UFFVRkhMRU5CUVVNN2FVSkJRMUFzU1VGQlNTeERRVUZETEdWQlFXVXNRMEZCUXp0cFFrRkRja0lzU1VGQlNTeERRVUZETzJkQ1FVTkdMRXRCUVVzc1JVRkJSU3hsUVVGbE8yZENRVU4wUWl4UlFVRlJMRVZCUVVVc1RVRkJUVHRoUVVOdVFpeERRVUZETzJsQ1FVTkVMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU03YVVKQlExZ3NSMEZCUnl4RFFVRkRMRlZCUVVNc1IwRkJVVHRuUWtGRFZpeEpRVUZKTEVkQlFVYzdiMEpCUTBnc1QwRkJUeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTTdaMEpCUTNKQ0xFbEJRVWtzUlVGQlJTeERRVUZETzFsQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRXQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl3d1EwRkJNRU1zUlVGQlJTeFZRVUZUTEVsQlFVazdXVUZEZUVRc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF6dHBRa0ZEVUN4SlFVRkpMRU5CUVVNc1pVRkJaU3hEUVVGRE8ybENRVU55UWl4SlFVRkpMRU5CUVVNN1owSkJRMFlzUzBGQlN5eEZRVUZGTEdWQlFXVTdaMEpCUTNSQ0xGRkJRVkVzUlVGQlJTeE5RVUZOTzJGQlEyNUNMRU5CUVVNN2FVSkJRMFFzVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXp0cFFrRkRXQ3hIUVVGSExFTkJRVU1zVlVGQlF5eEhRVUZSTEVWQlFVVXNSMEZCY1VJN1owSkJRMnBETEVsQlFVa3NSMEZCUnp0dlFrRkRTQ3hQUVVGUExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0blFrRkRja0lzU1VGQlNTeEpRVUZKTEVkQlFWRXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdaMEpCUTNKRExHRkJRVTBzUTBGQlF5eFhRVUZYTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1JVRkJSU3hsUVVGbExFTkJRVU1zUTBGQlF6dG5Ra0ZEYUVRc1lVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RlFVRkZMRTFCUVUwc1EwRkJReXhEUVVGRE8yZENRVU4wUXl4aFFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVXNVVUZCVVN4RFFVRkRMRU5CUVVNN1owSkJRM2hETEVsQlFVa3NSVUZCUlN4RFFVRkRPMWxCUTFnc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFdDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXh2UkVGQmIwUXNSVUZCUlN4VlFVRlRMRWxCUVVrN1dVRkRiRVVzVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXp0cFFrRkRVQ3hKUVVGSkxFTkJRVU1zWlVGQlpTeERRVUZETzJsQ1FVTnlRaXhKUVVGSkxFTkJRVU03WjBKQlEwWXNTMEZCU3l4RlFVRkZMRFpDUVVFMlFqdG5Ra0ZEY0VNc1VVRkJVU3hGUVVGRkxFMUJRVTA3WVVGRGJrSXNRMEZCUXp0cFFrRkRSQ3hOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETzJsQ1FVTllMRWRCUVVjc1EwRkJReXhWUVVGRExFZEJRVkVzUlVGQlJTeEhRVUZ4UWp0blFrRkRha01zU1VGQlNTeEhRVUZITzI5Q1FVTklMRTlCUVU4c1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzJkQ1FVTnlRaXhKUVVGSkxFbEJRVWtzUjBGQlVTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dG5Ra0ZEY2tNc1lVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RlFVRkZMREpDUVVFeVFpeERRVUZETEVOQlFVTTdaMEpCUXpWRUxFbEJRVWtzUlVGQlJTeERRVUZETzFsQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRXQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl4blJVRkJaMFVzUlVGQlJTeFZRVUZUTEVsQlFVazdXVUZET1VVc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF6dHBRa0ZEVUN4SlFVRkpMRU5CUVVNc1pVRkJaU3hEUVVGRE8ybENRVU55UWl4SlFVRkpMRU5CUVVNN1owSkJRMFlzUzBGQlN5eEZRVUZGTEdWQlFXVTdaMEpCUTNSQ0xGRkJRVkVzUlVGQlJTeDFRa0ZCZFVJN1lVRkRjRU1zUTBGQlF6dHBRa0ZEUkN4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRE8ybENRVU5ZTEVkQlFVY3NRMEZCUXl4VlFVRkRMRWRCUVZFc1JVRkJSU3hIUVVGeFFqdG5Ra0ZEYWtNc1NVRkJTU3hIUVVGSE8yOUNRVU5JTEU5QlFVOHNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8yZENRVU55UWl4SlFVRkpMRWxCUVVrc1IwRkJVU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRuUWtGRGNrTXNZVUZCVFN4RFFVRkRMRmRCUVZjc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eEZRVUZGTERKQ1FVRXlRaXhEUVVGRExFTkJRVU03WjBKQlF6VkVMRWxCUVVrc1JVRkJSU3hEUVVGRE8xbEJRMWdzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEV0N4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5dzBSRUZCTkVRc1JVRkJSU3hWUVVGVExFbEJRVWs3V1VGRE1VVXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJRenRwUWtGRFVDeEpRVUZKTEVOQlFVTXNaVUZCWlN4RFFVRkRPMmxDUVVOeVFpeEpRVUZKTEVOQlFVTTdaMEpCUTBZc1VVRkJVU3hGUVVGRkxFMUJRVTA3WVVGRGJrSXNRMEZCUXp0cFFrRkRSQ3hOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETzJsQ1FVTllMRWRCUVVjc1EwRkJReXhWUVVGRExFZEJRVkVzUlVGQlJTeEhRVUZ4UWp0blFrRkRha01zU1VGQlNTeEhRVUZITzI5Q1FVTklMRTlCUVU4c1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzJkQ1FVTnlRaXhKUVVGSkxFbEJRVWtzUjBGQlVTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dG5Ra0ZEY2tNc1lVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RlFVRkZMSEZEUVVGeFF5eERRVUZETEVOQlFVTTdaMEpCUTNSRkxFOUJRVThzUTBGQlF5eFBRVUZITEVOQlFVTTdjVUpCUTFBc1NVRkJTU3hEUVVGRExHVkJRV1VzUTBGQlF6dHhRa0ZEY2tJc1NVRkJTU3hEUVVGRExFVkJRVU1zUzBGQlN5eEZRVUZGTEdWQlFXVXNSVUZCUXl4RFFVRkRPM0ZDUVVNNVFpeE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRPM0ZDUVVOWUxFZEJRVWNzUTBGQlF5eFZRVUZETEVkQlFWRXNSVUZCUlN4SFFVRnhRanR2UWtGRGFrTXNTVUZCU1N4SFFVRkhPM2RDUVVOSUxFOUJRVThzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMjlDUVVOeVFpeEpRVUZKTEVsQlFVa3NSMEZCVVN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0dlFrRkRja01zWVVGQlRTeERRVUZETEZkQlFWY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhGUVVGRkxIRkRRVUZ4UXl4RFFVRkRMRU5CUVVNN2IwSkJRM1JGTEVsQlFVa3NSVUZCUlN4RFFVRkRPMmRDUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZCTzFsQlExWXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRXQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl4clJFRkJhMFFzUlVGQlJTeFZRVUZUTEVsQlFVazdXVUZEYUVVc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4bFFVRmxMRU5CUVVNN2FVSkJRemRDTEVsQlFVa3NRMEZCUXl4RlFVRkRMRXRCUVVzc1JVRkJSU3h0UWtGQmJVSXNSVUZCUlN4UlFVRlJMRVZCUVVVc1RVRkJUU3hGUVVGRExFTkJRVU03YVVKQlEzQkVMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU03YVVKQlExZ3NSMEZCUnl4RFFVRkRMRlZCUVVNc1IwRkJVU3hGUVVGRkxFZEJRWEZDTzJkQ1FVTnFReXhKUVVGSkxFZEJRVWM3YjBKQlEwZ3NUMEZCVHl4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU03WjBKQlEzSkNMRWxCUVVrc1NVRkJTU3hIUVVGUkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8yZENRVU55UXl4aFFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVWQlFVVXNNa0pCUVRKQ0xFTkJRVU1zUTBGQlF6dG5Ra0ZETlVRc1NVRkJTU3hGUVVGRkxFTkJRVU03V1VGRFdDeERRVUZETEVOQlFVTXNRMEZCUVR0UlFVTldMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMUFzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEU0N4UlFVRlJMRU5CUVVNc2RVSkJRWFZDTEVWQlFVVTdVVUZET1VJc1ZVRkJWU3hEUVVGRExGVkJRVlVzU1VGQlNUdFpRVU55UWl4elFrRkJhMElzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4alFVRk5MRTlCUVVFc1NVRkJTU3hGUVVGRkxFVkJRVTRzUTBGQlRTeERRVUZETEVOQlFVTTdVVUZETlVNc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEZRVUZGTEVOQlFVTXNkMEpCUVhkQ0xFVkJRVVVzVlVGQlV5eEpRVUZKTzFsQlEzUkRMRTlCUVU4c1EwRkJReXhQUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNhMEpCUVd0Q0xFTkJRVU03YVVKQlEyaERMRWxCUVVrc1EwRkJReXhGUVVGRExFdEJRVXNzUlVGQlJTeGxRVUZsTEVWQlFVVXNVVUZCVVN4RlFVRkZMRTFCUVUwc1JVRkJReXhEUVVGRE8ybENRVU5vUkN4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRE8ybENRVU5ZTEVkQlFVY3NRMEZCUXl4VlFVRkRMRWRCUVZFc1JVRkJSU3hIUVVGeFFqdG5Ra0ZEYWtNc1NVRkJSeXhIUVVGSE8yOUNRVUZGTEU5QlFVOHNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8yZENRVU42UWl4cFFrRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF5eGxRVUZsTEVOQlFVTXNRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlF5eEpRVUZYTzI5Q1FVTjBSQ3hKUVVGSkxFTkJRVU1zU1VGQlNTeEZRVUZGTzNkQ1FVTlFMR0ZCUVUwc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF6dDNRa0ZEWkN4UFFVRlBMRWxCUVVrc1JVRkJSU3hEUVVGRE8zRkNRVU5xUWp0dlFrRkRSQ3hKUVVGSkxFVkJRVVVzUTBGQlF6dG5Ra0ZEV0N4RFFVRkRMRU5CUVVNc1EwRkJReXhQUVVGTExFTkJRVUVzUTBGQlF5eFZRVUZETEVkQlFWRTdiMEpCUTJRc1QwRkJUeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTTdaMEpCUTNKQ0xFTkJRVU1zUTBGQlF5eERRVUZCTzFsQlEwNHNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRXQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl3clEwRkJLME1zUlVGQlJTeFZRVUZWTEVsQlFVazdXVUZET1VRc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4clFrRkJhMElzUTBGQlF6dHBRa0ZEYUVNc1NVRkJTU3hEUVVGRExFVkJRVVVzUzBGQlN5eEZRVUZGTEdWQlFXVXNSVUZCUlN4UlFVRlJMRVZCUVVVc1RVRkJUU3hGUVVGRkxFTkJRVU03YVVKQlEyeEVMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU03YVVKQlExZ3NSMEZCUnl4RFFVRkRMRlZCUVVNc1IwRkJVU3hGUVVGRkxFZEJRWEZDTzJkQ1FVTnFReXhKUVVGSkxFZEJRVWM3YjBKQlFVVXNUMEZCVHl4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU03WjBKQlF6RkNMR2xDUVVGSkxFTkJRVU1zVjBGQlZ5eERRVUZETEdWQlFXVXNRMEZCUXl4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZETEVsQlFWYzdiMEpCUTNSRUxFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVTdkMEpCUTFBc1lVRkJUU3hEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETzNGQ1FVTnFRanR2UWtGRFJDeGhRVUZOTEVOQlFVTXNWMEZCVnl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFVkJRVVVzVDBGQlR5eERRVUZETEVOQlFVTTdiMEpCUTNaRExFbEJRVWtzUlVGQlJTeERRVUZETzJkQ1FVTllMRU5CUVVNc1EwRkJReXhEUVVGRExFOUJRVXNzUTBGQlFTeERRVUZETEZWQlFVTXNSMEZCVVR0dlFrRkRaQ3hQUVVGUExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0blFrRkRja0lzUTBGQlF5eERRVUZETEVOQlFVRTdXVUZEVGl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NSVUZCUlN4RFFVRkRMRFpEUVVFMlF5eEZRVUZGTEZWQlFWTXNTVUZCU1R0WlFVTXpSQ3hKUVVGSkxFTkJRVU1zUjBGQlJ5eEpRVUZKTEdsQ1FVRkpMRU5CUVVNN1owSkJRMklzU1VGQlNTeEZRVUZGTEUxQlFVMDdaMEpCUTFvc1MwRkJTeXhGUVVGRkxHZENRVUZuUWp0blFrRkRka0lzVVVGQlVTeEZRVUZGTEZWQlFWVTdaMEpCUTNCQ0xFbEJRVWtzUlVGQlJTeFBRVUZQTzJGQlEyaENMRU5CUVVNc1EwRkJRVHRaUVVOR0xFTkJRVU1zUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNN1owSkJRMVlzVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhyUWtGQmEwSXNRMEZCUXp0eFFrRkRhRU1zU1VGQlNTeERRVUZETEVWQlFVVXNTMEZCU3l4RlFVRkZMR1ZCUVdVc1JVRkJSU3hSUVVGUkxFVkJRVVVzVFVGQlRTeEZRVUZGTEVOQlFVTTdjVUpCUTJ4RUxFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTTdjVUpCUTFnc1IwRkJSeXhEUVVGRExGVkJRVU1zUjBGQlVTeEZRVUZGTEVkQlFYRkNPMjlDUVVOcVF5eEpRVUZKTEVkQlFVYzdkMEpCUVVVc1QwRkJUeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTTdiMEpCUXpGQ0xHbENRVUZKTEVOQlFVTXNWMEZCVnl4RFFVRkRMR1ZCUVdVc1EwRkJReXhEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRkRMRWxCUVZjN2QwSkJRM1JFTEVsQlFVa3NRMEZCUXl4SlFVRkpMRVZCUVVVN05FSkJRMUFzWVVGQlRTeERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRPM2xDUVVOcVFqdDNRa0ZEUkN4aFFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVXNUVUZCVFN4RFFVRkRMRU5CUVVNN2QwSkJRM1JETEVsQlFVa3NSVUZCUlN4RFFVRkRPMjlDUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVc3NRMEZCUVN4RFFVRkRMRlZCUVVNc1IwRkJVVHQzUWtGRFpDeFBRVUZQTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenR2UWtGRGNrSXNRMEZCUXl4RFFVRkRMRU5CUVVFN1owSkJRMDRzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEV0N4RFFVRkRMRU5CUVVNc1EwRkJRVHRSUVVOT0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NSVUZCUlN4RFFVRkRMREJFUVVFd1JDeEZRVUZGTEZWQlFWTXNTVUZCU1R0WlFVTjRSU3hQUVVGUExFTkJRVU1zVDBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMR3RDUVVGclFpeERRVUZETzJsQ1FVTm9ReXhKUVVGSkxFTkJRVU1zUlVGQlJTeExRVUZMTEVWQlFVVXNaVUZCWlN4RlFVRkZMRU5CUVVNN2FVSkJRMmhETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNN2FVSkJRMWdzUjBGQlJ5eERRVUZETEZWQlFVTXNSMEZCVVN4RlFVRkZMRWRCUVhGQ08yZENRVU5xUXl4SlFVRkpMRWRCUVVjN2IwSkJRVVVzVDBGQlR5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1owSkJRekZDTEVsQlFVa3NTVUZCU1N4SFFVRlJMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMmRDUVVOeVF5eGhRVUZOTEVOQlFVTXNWMEZCVnl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFVkJRVVVzY1VOQlFYRkRMRU5CUVVNc1EwRkJRenRuUWtGRGRFVXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eHJRa0ZCYTBJc1EwRkJRenR4UWtGRGFFTXNTVUZCU1N4RFFVRkRMRVZCUVVNc1VVRkJVU3hGUVVGRkxFdEJRVXNzUlVGQlF5eERRVUZETzNGQ1FVTjJRaXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETzNGQ1FVTllMRWRCUVVjc1EwRkJReXhWUVVGRExFZEJRVkVzUlVGQlJTeEhRVUZ4UWp0dlFrRkRha01zU1VGQlJ5eEhRVUZITzNkQ1FVRkZMRTlCUVU4c1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzI5Q1FVTjZRaXhKUVVGSkxFbEJRVWtzUjBGQlVTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dHZRa0ZEY2tNc1lVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RlFVRkZMSEZEUVVGeFF5eERRVUZETEVOQlFVTTdiMEpCUTNSRkxFbEJRVWtzUlVGQlJTeERRVUZETzJkQ1FVTllMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMWdzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEV0N4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5dzJRMEZCTmtNc1JVRkJSU3hWUVVGVExFbEJRVWs3V1VGRE0wUXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eHJRa0ZCYTBJc1EwRkJRenRwUWtGRGFFTXNTVUZCU1N4RFFVRkRMRVZCUVVNc1MwRkJTeXhGUVVGRkxEQkNRVUV3UWl4RlFVRkZMRkZCUVZFc1JVRkJSU3hOUVVGTkxFVkJRVU1zUTBGQlF6dHBRa0ZETTBRc1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF6dHBRa0ZEV0N4SFFVRkhMRU5CUVVNc1ZVRkJReXhIUVVGUkxFVkJRVVVzUjBGQmNVSTdaMEpCUTJwRExFbEJRVWtzUjBGQlJ6dHZRa0ZCUlN4UFFVRlBMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dG5Ra0ZETVVJc1NVRkJTU3hKUVVGSkxFZEJRVkVzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03WjBKQlEzSkRMR0ZCUVUwc1EwRkJReXhYUVVGWExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NSVUZCUlN3eVFrRkJNa0lzUTBGQlF5eERRVUZETzJkQ1FVTTFSQ3hKUVVGSkxFVkJRVVVzUTBGQlF6dFpRVU5ZTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTFnc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFVDeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTklMRkZCUVZFc1EwRkJReXh4UWtGQmNVSXNSVUZCUlR0UlFVTTFRaXhKUVVGSkxGZEJRV2RDTEVOQlFVTTdVVUZEY2tJc1ZVRkJWU3hEUVVGRExGVkJRVlVzU1VGQlNUdFpRVU55UWl4WFFVRlhMRWRCUVVjc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF5eERRVUZETzFsQlF6TkNMSE5DUVVGclFpeEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRPMmRDUVVOMFFpeEpRVUZKTEVsQlFVa3NSMEZCVlN4SlFVRkpMR2xDUVVGSkxFTkJRVU03YjBKQlEzWkNMRWxCUVVrc1JVRkJSU3hSUVVGUk8yOUNRVU5rTEV0QlFVc3NSVUZCUlN4bFFVRmxPMjlDUVVOMFFpeFJRVUZSTEVWQlFVVXNiVUpCUVZFc1EwRkJReXhOUVVGTkxFTkJRVU03YjBKQlF6RkNMRWxCUVVrc1JVRkJSU3hOUVVGTk8ybENRVU5tTEVOQlFVTXNRMEZCUXp0blFrRkRTQ3hKUVVGSkxFTkJRVU1zU1VGQlNTeEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVVNc1NVRkJWeXhKUVVGTExFOUJRVUVzU1VGQlNTeEZRVUZGTEVWQlFVNHNRMEZCVFN4RFFVRkRMRU5CUVVNc1QwRkJTeXhEUVVGQkxFTkJRVU1zVlVGQlF5eEhRVUZSTzI5Q1FVTnlSQ3hOUVVGTkxFZEJRVWNzUTBGQlF6dG5Ra0ZEWkN4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOUUxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExQXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hGUVVGRkxFTkJRVU1zZVVKQlFYbENMRVZCUVVVc1ZVRkJVeXhKUVVGSk8xbEJRM1pETEZkQlFWY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1pVRkJaU3hEUVVGRE8ybENRVU0xUWl4SlFVRkpMRU5CUVVNc1JVRkJReXhMUVVGTExFVkJRVVVzWlVGQlpTeEZRVUZGTEZGQlFWRXNSVUZCUlN4TlFVRk5MRVZCUVVNc1EwRkJReXhEUVVGRExFZEJRVWNzUTBGQlF5eFZRVUZETEVkQlFWRTdaMEpCUXpORUxFbEJRVWtzUjBGQlJ6dHZRa0ZCUlN4UFFVRlBMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dG5Ra0ZETVVJc1YwRkJWeXhEUVVGRExFZEJRVWNzUTBGQlF5eGpRVUZqTEVOQlFVTXNRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNSMEZCUnl4RFFVRkRMRlZCUVVNc1IwRkJVVHR2UWtGRE5VUXNTVUZCU1N4SFFVRkhPM2RDUVVGRkxFOUJRVThzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMjlDUVVNeFFpeFhRVUZYTEVOQlFVTXNSMEZCUnl4RFFVRkRMR2RDUVVGblFpeERRVUZETEVOQlFVTXNTVUZCU1N4RlFVRkZMRU5CUVVNc1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVkQlFVY3NRMEZCUXl4VlFVRkRMRWRCUVZFN2QwSkJRemxFTEVsQlFVa3NSMEZCUnpzMFFrRkJSU3hQUVVGUExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0M1FrRkRNVUlzVjBGQlZ5eERRVUZETEVkQlFVY3NRMEZCUXl4alFVRmpMRU5CUVVNc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzI5Q1FVTnFSU3hEUVVGRExFTkJRVU1zUTBGQlFUdG5Ra0ZEVGl4RFFVRkRMRU5CUVVNc1EwRkJRVHRaUVVOT0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dEJRVkZRTEVOQlFVTXNRMEZCUXl4RFFVRkRJbjA9IiwiLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pZEdWemRFTm9ZVzV1Wld4RGIyNTBjbTlzYkdWeUxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZMaTR2ZEdWemRITXZjMlZ5ZG1WeUwzUmxjM1JEYUdGdWJtVnNRMjl1ZEhKdmJHeGxjaTUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pSW4wPSIsIi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWRHVnpkRTFsYzNOaFoyVkRiMjUwY205c2JHVnlMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dmRHVnpkSE12YzJWeWRtVnlMM1JsYzNSTlpYTnpZV2RsUTI5dWRISnZiR3hsY2k1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaUluMD0iLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgcmVxdWVzdCA9IHJlcXVpcmUoXCJzdXBlcnRlc3RcIik7XG52YXIgYmNyeXB0anNfMSA9IHJlcXVpcmUoXCJiY3J5cHRqc1wiKTtcbnZhciBjaGFpXzEgPSByZXF1aXJlKFwiY2hhaVwiKTtcbnZhciBfXzEgPSByZXF1aXJlKFwiLi4vXCIpO1xudmFyIFVzZXJfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvc2VydmVyL21vZGVscy9Vc2VyXCIpO1xuZGVzY3JpYmUoJ1VzZXIgQ29udHJvbGxlcicsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdG9rZW47XG4gICAgdmFyIHVzZXJJbmZvID0ge1xuICAgICAgICBuYW1lOiAnQWRyaWFuJyxcbiAgICAgICAgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgcGFzc3dvcmQ6ICd0ZXN0JyxcbiAgICAgICAgcm9sZTogJ2FkbWluJ1xuICAgIH07XG4gICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICBfXzEuZHJvcEFsbENvbGxlY3Rpb25zKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdXNlciA9IG5ldyBVc2VyXzFbXCJkZWZhdWx0XCJdKHtcbiAgICAgICAgICAgICAgICBuYW1lOiB1c2VySW5mby5uYW1lLFxuICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VySW5mby5lbWFpbCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogYmNyeXB0anNfMS5oYXNoU3luYyh1c2VySW5mby5wYXNzd29yZCksXG4gICAgICAgICAgICAgICAgcm9sZTogdXNlckluZm8ucm9sZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdXNlci5zYXZlKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiB1c2VySW5mby5lbWFpbCwgcGFzc3dvcmQ6IHVzZXJJbmZvLnBhc3N3b3JkIH0pXG4gICAgICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwKVxuICAgICAgICAgICAgICAgICAgICAuZW5kKGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IHJlcy5nZXQoJ3gtYWNjZXNzLXRva2VuJyk7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNOb3ROdWxsKHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc1N0cmluZyh0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNOb3RFbXB0eSh0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnR0VUIC9hcGkvdjEvdXNlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBmZXRjaCB0aGUgbG9nZ2VkIGluIHVzZXInLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5nZXQoJy9hcGkvdjEvdXNlcicpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMCwgZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKHJlcy5ib2R5Lm5hbWUsIHVzZXJJbmZvLm5hbWUpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwocmVzLmJvZHkuZW1haWwsIHVzZXJJbmZvLmVtYWlsKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKHJlcy5ib2R5LnJvbGUsIHVzZXJJbmZvLnJvbGUpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQubm90UHJvcGVydHkocmVzLmJvZHksICdwYXNzd29yZCcpO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIG5vdCBsb2dnZWQgaW4nLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5nZXQoJy9hcGkvdjEvdXNlcicpXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDEsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnR0VUIC9hcGkvdjEvdXNlcnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGl0KCdzaG91bGQgcmVjZWl2ZSBhIGxpc3Qgb2YgdXNlcnMnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5nZXQoJy9hcGkvdjEvdXNlcnMnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgyMDAsIGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwocmVzLmJvZHkudXNlcnMubGVuZ3RoLCAxKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmluY2x1ZGUocmVzLmJvZHkudXNlcnNbMF0sIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdXNlckluZm8ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogdXNlckluZm8ucm9sZSxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IHVzZXJJbmZvLmVtYWlsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5ub3RQcm9wZXJ0eShyZXMuYm9keS51c2Vyc1swXSwgJ3Bhc3N3b3JkJyk7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgbm90IGxvZ2dlZCBpbicsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLmdldCgnL2FwaS92MS91c2VycycpXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDEsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnR0VUIC9hcGkvdjEvdXNlci86ZW1haWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0cmlldmUgYSB1c2VyIGJ5IGVtYWlsJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAuZ2V0KCcvYXBpL3YxL3VzZXIvJyArIHVzZXJJbmZvLmVtYWlsKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgyMDAsIGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaGFzQWxsS2V5cyhyZXMuYm9keS51c2VyLCBbJ2VtYWlsJywgJ25hbWUnLCAncm9sZScsICdfaWQnLCAnY3JlYXRlZCddKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmluY2x1ZGUocmVzLmJvZHkudXNlciwge1xuICAgICAgICAgICAgICAgICAgICBlbWFpbDogdXNlckluZm8uZW1haWwsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHVzZXJJbmZvLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IHVzZXJJbmZvLnJvbGUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgZW1haWwgZG9lcyBub3QgZXhpc3QnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5nZXQoJy9hcGkvdjEvdXNlci9ub3QuaW4udXNlQHRlc3QuY29tJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwLCBmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzU3RyaW5nKHJlcy5ib2R5LmVycm9yKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKHJlcy5ib2R5LmVycm9yLCAnTm8gdXNlciBmb3VuZCB3aXRoIHRoYXQgZW1haWwnKTtcbiAgICAgICAgICAgICAgICBkb25lKGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiBub3QgYSB2YWxpZCBlbWFpbCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLmdldCgnL2FwaS92MS91c2VyL25vdC1hbi1lbWFpbCcpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMCwgZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc1N0cmluZyhyZXMuYm9keS5lcnJvcik7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChyZXMuYm9keS5lcnJvciwgJ1BsZWFzZSBzdXBwbHkgYSB2YWxpZCBlbWFpbCcpO1xuICAgICAgICAgICAgICAgIGRvbmUoZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnUE9TVCAvYXBpL3YxL3VzZXIvdXBkYXRlL2VtYWlsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpdChcInNob3VsZCB1cGRhdGUgdGhlIGxvZ2dlZCBpbiB1c2VyJ3MgZW1haWxcIiwgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHZhciBuZXdFbWFpbCA9ICduZXcuZW1haWxAdGVzdC5jb20nO1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL2VtYWlsJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6IG5ld0VtYWlsIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgyMDAsIGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgICAgICAuZ2V0KCcvYXBpL3YxL3VzZXInKVxuICAgICAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHJlcy5nZXQoJ3gtYWNjZXNzLXRva2VuJykpXG4gICAgICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwLCBmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChyZXMuYm9keS5uYW1lLCB1c2VySW5mby5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChyZXMuYm9keS5lbWFpbCwgbmV3RW1haWwpO1xuICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKHJlcy5ib2R5LnJvbGUsIHVzZXJJbmZvLnJvbGUpO1xuICAgICAgICAgICAgICAgICAgICBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiBuZXcgZW1haWwgaXMgbm90IHZhbGlkJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9lbWFpbCcpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAnbm90IGFuIGVtYWlsJyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwLCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiBlbWFpbCBhbHJlYWR5IGluIHVzZScsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvZW1haWwnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDAsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIG5vdCBhdXRob3JpemVkJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9lbWFpbCcpXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDEsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnUE9TVCAvYXBpL3YxL3VzZXIvdXBkYXRlL25hbWUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGl0KCdzaG91bGQgdXBkYXRlIG5hbWUnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdmFyIG5ld05hbWUgPSAnbmV3IG5hbWUnO1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL25hbWUnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBuYW1lOiBuZXdOYW1lIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgyMDAsIGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAgICAgLmdldCgnL2FwaS92MS91c2VyJylcbiAgICAgICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCByZXMuZ2V0KCd4LWFjY2Vzcy10b2tlbicpKVxuICAgICAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMCwgZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwocmVzLmJvZHkubmFtZSwgbmV3TmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwocmVzLmJvZHkuZW1haWwsIHVzZXJJbmZvLmVtYWlsKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChyZXMuYm9keS5yb2xlLCB1c2VySW5mby5yb2xlKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgbm90IGF1dGhvcml6ZWQnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdmFyIG5ld05hbWUgPSAnbmV3IG5hbWUnO1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL25hbWUnKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgbmFtZTogbmV3TmFtZSB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAxLCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ1BPU1QgL2FwaS92MS91c2VyL3VwZGF0ZS9wYXNzd29yZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCB1cGRhdGUgcGFzc3dvcmQnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdmFyIG5ld1Bhc3MgPSAnbmV3cGFzcyc7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvcGFzc3dvcmQnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBvbGRQYXNzOiB1c2VySW5mby5wYXNzd29yZCwgbmV3UGFzczogbmV3UGFzcyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwLCBmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiB1c2VySW5mby5lbWFpbCwgcGFzc3dvcmQ6IG5ld1Bhc3MgfSlcbiAgICAgICAgICAgICAgICAgICAgLmV4cGVjdCgyMDAsIGRvbmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgdXBkYXRpbmcgcGFzc3dvcmQgaWYgY3VycmVudCBwYXNzd29yZCBpbnZhbGlkJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9wYXNzd29yZCcpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IG9sZFBhc3M6ICd3cm9uZyBwYXNzd29yZCcsIG5ld1Bhc3M6ICcxMjM0MTIzNCcgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMCwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgdXBkYXRpbmcgcGFzc3dvcmQgaWYgbm90IGF1dGhvcml6ZWQnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL3Bhc3N3b3JkJylcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMSwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdQT1NUIC9hcGkvdjEvdXNlci9jcmVhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBuZXdVc2VyID0ge1xuICAgICAgICAgICAgZW1haWw6ICd0ZXN0MTIzQHRlc3QuY29tJyxcbiAgICAgICAgICAgIG5hbWU6ICdOZXcgVXNlcicsXG4gICAgICAgICAgICByb2xlOiAndXNlcicsXG4gICAgICAgIH07XG4gICAgICAgIGl0KCdzaG91bGQgY3JlYXRlIGEgbmV3IHVzZXInLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgVXNlcl8xW1wiZGVmYXVsdFwiXS5maW5kQnlFbWFpbChuZXdVc2VyLmVtYWlsKS5jb3VudERvY3VtZW50cyhmdW5jdGlvbiAoZXJyLCBjb3VudCkge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChjb3VudCwgMCwgJ1VzZXIgc2hvdWxkIG5vdCBleGlzdCB3aXRoIGVtYWlsIHRlc3QxMjNXdGVzdC5jb20nKTtcbiAgICAgICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL3VzZXIvY3JlYXRlJylcbiAgICAgICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAgICAgLnNlbmQobmV3VXNlcilcbiAgICAgICAgICAgICAgICAgICAgLmV4cGVjdCgyMDAsIGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgVXNlcl8xW1wiZGVmYXVsdFwiXS5maW5kQnlFbWFpbChuZXdVc2VyLmVtYWlsKS5leGVjKGZ1bmN0aW9uIChlcnIsIHVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcEluY2x1ZGUodXNlciwgbmV3VXNlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgdXNlciBtYWtpbmcgcmVxdWVzdCBpcyBub3QgYW4gYWRtaW4nLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdmFyIHVzZXIgPSBuZXcgVXNlcl8xW1wiZGVmYXVsdFwiXSh7XG4gICAgICAgICAgICAgICAgbmFtZTogbmV3VXNlci5uYW1lLFxuICAgICAgICAgICAgICAgIGVtYWlsOiBuZXdVc2VyLmVtYWlsLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBiY3J5cHRqc18xLmhhc2hTeW5jKCdwYXNzd29yZCcpLFxuICAgICAgICAgICAgICAgIHJvbGU6IG5ld1VzZXIucm9sZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdXNlci5zYXZlKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiBuZXdVc2VyLmVtYWlsLCBwYXNzd29yZDogJ3Bhc3N3b3JkJyB9KVxuICAgICAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMClcbiAgICAgICAgICAgICAgICAgICAgLmVuZChmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSByZXMuZ2V0KCd4LWFjY2Vzcy10b2tlbicpO1xuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL2NyZWF0ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmV4cGVjdCg0MDEsIGRvbmUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgdXNlciBpcyBub3QgbG9nZ2VkIGluJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL2NyZWF0ZScpXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDEsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIGVtYWlsIGlzIG5vdCB2YWxpZCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvdXNlci9jcmVhdGUnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgICAgIGVtYWlsOiAnbm90IHZhbGlkJyxcbiAgICAgICAgICAgICAgICBuYW1lOiBuZXdVc2VyLm5hbWUsXG4gICAgICAgICAgICAgICAgcm9sZTogbmV3VXNlci5yb2xlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwLCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiByb2xlIG5vdCB2YWxpZCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvdXNlci9jcmVhdGUnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgICAgIGVtYWlsOiBuZXdVc2VyLmVtYWlsLFxuICAgICAgICAgICAgICAgIG5hbWU6IG5ld1VzZXIubmFtZSxcbiAgICAgICAgICAgICAgICByb2xlOiAnbm90IHZhbGlkJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMCwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgZW1haWwgYWRkcmVzcyBhbHJlYWR5IGluIHVzZScsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvdXNlci9jcmVhdGUnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VySW5mby5lbWFpbCxcbiAgICAgICAgICAgICAgICBuYW1lOiBuZXdVc2VyLm5hbWUsXG4gICAgICAgICAgICAgICAgcm9sZTogbmV3VXNlci5yb2xlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwLCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ1BVVCAvYXBpL3YxL3VzZXIvdXBkYXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbmV3VXNlckluZm8gPSB7XG4gICAgICAgICAgICBuYW1lOiAnTmV3IE5hbWUnLFxuICAgICAgICAgICAgZW1haWw6ICduZXdlbWFpbEB0ZXN0LmNvbScsXG4gICAgICAgICAgICByb2xlOiAndXNlcidcbiAgICAgICAgfTtcbiAgICAgICAgaXQoJ3Nob3VsZCB1cGRhdGUgdGhlIHVzZXInLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wdXQoJy9hcGkvdjEvdXNlci91cGRhdGUnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogdXNlckluZm8uZW1haWwsIHVzZXI6IG5ld1VzZXJJbmZvIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgyMDAsIGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgVXNlcl8xW1wiZGVmYXVsdFwiXS5maW5kQnlFbWFpbChuZXdVc2VySW5mby5lbWFpbCkuZXhlYyhmdW5jdGlvbiAoZXJyLCB1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzTm90TnVsbCh1c2VyKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwSW5jbHVkZSh1c2VyLCBuZXdVc2VySW5mbyk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIHVzZXIgd2l0aCBlbWFpbCBkb2VzIG5vdCBleGlzdCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnB1dCgnL2FwaS92MS91c2VyL3VwZGF0ZScpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAnZG9lc25vdGV4aXN0QHRlc3QuY29tJywgdXNlcjogbmV3VXNlckluZm8gfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwNCwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgbmV3IGVtYWlsIG5vdCB2YWxpZCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnB1dCgnL2FwaS92MS91c2VyL3VwZGF0ZScpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICAgICAgZW1haWw6IHVzZXJJbmZvLmVtYWlsLFxuICAgICAgICAgICAgICAgIHVzZXI6IE9iamVjdC5hc3NpZ24oe30sIG5ld1VzZXJJbmZvLCB7IGVtYWlsOiAnbm90IHZhbGlkJyB9KVxuICAgICAgICAgICAgfSkuZXhwZWN0KDQwMCwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgcm9sZSBub3QgdmFsaWQnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wdXQoJy9hcGkvdjEvdXNlci91cGRhdGUnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VySW5mby5lbWFpbCxcbiAgICAgICAgICAgICAgICB1c2VyOiBPYmplY3QuYXNzaWduKHt9LCBuZXdVc2VySW5mbywgeyByb2xlOiAnbm90IHZhbGlkJyB9KVxuICAgICAgICAgICAgfSkuZXhwZWN0KDQwMCwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdERUxFVEUgL2FwaS92MS91c2VyL2RlbGV0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdmFyIHVzZXIgPSBuZXcgVXNlcl8xW1wiZGVmYXVsdFwiXSh7XG4gICAgICAgICAgICAgICAgbmFtZTogJ05ldyBOYW1lJyxcbiAgICAgICAgICAgICAgICBlbWFpbDogJ25ld2VtYWlsQHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICByb2xlOiAndXNlcicsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICdwYXNzJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgaW5hY3RpdmVVc2VyID0gbmV3IFVzZXJfMVtcImRlZmF1bHRcIl0oe1xuICAgICAgICAgICAgICAgIG5hbWU6ICdOYW1lJyxcbiAgICAgICAgICAgICAgICBlbWFpbDogJ2RlbGV0ZWRAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgIHJvbGU6ICd1c2VyJyxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJ3Bhc3N3b3JkJyxcbiAgICAgICAgICAgICAgICBkZWxldGVkOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB1c2VyLnNhdmUoZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgaW5hY3RpdmVVc2VyLnNhdmUoZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZGVsZXRlIHRoZSB1c2VyJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClbXCJkZWxldGVcIl0oJy9hcGkvdjEvdXNlci9kZWxldGUnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ25ld2VtYWlsQHRlc3QuY29tJyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICBVc2VyXzFbXCJkZWZhdWx0XCJdLmZpbmRCeUVtYWlsKCduZXdlbWFpbEB0ZXN0LmNvbScpLmV4ZWMoZnVuY3Rpb24gKGVyciwgdXNlcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc1RydWUodXNlci5kZWxldGVkKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgdHJ5aW5nIHRvIGRlbGV0ZSBsb2dnZWQgaW4gdXNlcicsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApW1wiZGVsZXRlXCJdKCcvYXBpL3YxL3VzZXIvZGVsZXRlJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6IHVzZXJJbmZvLmVtYWlsIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDAsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIGVtYWlsIGluYWN0aXZlJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClbXCJkZWxldGVcIl0oJy9hcGkvdjEvdXNlci9kZWxldGUnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ2RlbGV0ZWRAdGVzdC5jb20nIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDAsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIGVtYWlsIGRvZXMgbm90IGV4aXN0JywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClbXCJkZWxldGVcIl0oJy9hcGkvdjEvdXNlci9kZWxldGUnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ25vdHJlYWxAdGVzdC5jb20nIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDQsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIGVtYWlsIG5vdCBwcm92aWRlZCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApW1wiZGVsZXRlXCJdKCcvYXBpL3YxL3VzZXIvZGVsZXRlJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICdub3QgdmFsaWQnIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDAsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIHVzZXIgbWFraW5nIHJlcXVlc3QgaXMgbm90IGFuIGFkbWluJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHZhciB1c2VyID0gbmV3IFVzZXJfMVtcImRlZmF1bHRcIl0oe1xuICAgICAgICAgICAgICAgIG5hbWU6ICdOYW1lJyxcbiAgICAgICAgICAgICAgICBlbWFpbDogJ25vdGFuYWRtaW5AdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBiY3J5cHRqc18xLmhhc2hTeW5jKCdwYXNzd29yZCcpLFxuICAgICAgICAgICAgICAgIHJvbGU6ICd1c2VyJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdXNlci5zYXZlKGZ1bmN0aW9uIChlcnIsIHVzZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAnbm90YW5hZG1pbkB0ZXN0LmNvbScsIHBhc3N3b3JkOiAncGFzc3dvcmQnIH0pXG4gICAgICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwKVxuICAgICAgICAgICAgICAgICAgICAuZW5kKGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IHJlcy5nZXQoJ3gtYWNjZXNzLXRva2VuJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClbXCJkZWxldGVcIl0oJy9hcGkvdjEvdXNlci9kZWxldGUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5leHBlY3QoNDAxLCBkb25lKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIHVzZXIgbm90IGxvZ2dlZCBpbicsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApW1wiZGVsZXRlXCJdKCcvYXBpL3YxL3VzZXIvZGVsZXRlJylcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMSwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdQVVQgL2FwaS92MS91c2VyL3Jlc3RvcmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHZhciB1c2VyID0gbmV3IFVzZXJfMVtcImRlZmF1bHRcIl0oe1xuICAgICAgICAgICAgICAgIG5hbWU6ICdOZXcgTmFtZScsXG4gICAgICAgICAgICAgICAgZW1haWw6ICdhY3RpdmVAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgIHJvbGU6ICd1c2VyJyxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJ3Bhc3MnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBpbmFjdGl2ZVVzZXIgPSBuZXcgVXNlcl8xW1wiZGVmYXVsdFwiXSh7XG4gICAgICAgICAgICAgICAgbmFtZTogJ05hbWUnLFxuICAgICAgICAgICAgICAgIGVtYWlsOiAnZGVsZXRlZEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgcm9sZTogJ3VzZXInLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAncGFzc3dvcmQnLFxuICAgICAgICAgICAgICAgIGRlbGV0ZWQ6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHVzZXIuc2F2ZShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICBpbmFjdGl2ZVVzZXIuc2F2ZShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXN0b3JlIHRoZSB1c2VyJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucHV0KCcvYXBpL3YxL3VzZXIvcmVzdG9yZScpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAnZGVsZXRlZEB0ZXN0LmNvbScgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMCwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgVXNlcl8xW1wiZGVmYXVsdFwiXS5maW5kQnlFbWFpbCgnZGVsZXRlZEB0ZXN0LmNvbScpLmV4ZWMoZnVuY3Rpb24gKGVyciwgdXNlcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKHVzZXIuZGVsZXRlZCk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIGVtYWlsIGRvZXMgbm90IGV4aXN0JywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucHV0KCcvYXBpL3YxL3VzZXIvcmVzdG9yZScpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAnZG9lc25vdGV4aXN0QHRlc3QuY29tJyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDA0LCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiB1c2VyIGlzIGFjdGl2ZScsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnB1dCgnL2FwaS92MS91c2VyL3Jlc3RvcmUnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ2FjdGl2ZUB0ZXN0LmNvbScgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMCwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgdXNlciBtYWtpbmcgcmVxdWVzdCBpcyBub3QgYW4gYWRtaW4nLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdmFyIHVzZXIgPSBuZXcgVXNlcl8xW1wiZGVmYXVsdFwiXSh7XG4gICAgICAgICAgICAgICAgbmFtZTogJ05hbWUnLFxuICAgICAgICAgICAgICAgIGVtYWlsOiAnbm90YW5hZG1pbkB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IGJjcnlwdGpzXzEuaGFzaFN5bmMoJ3Bhc3N3b3JkJyksXG4gICAgICAgICAgICAgICAgcm9sZTogJ3VzZXInLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB1c2VyLnNhdmUoZnVuY3Rpb24gKGVyciwgdXNlcikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS9sb2dpbicpXG4gICAgICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICdub3RhbmFkbWluQHRlc3QuY29tJywgcGFzc3dvcmQ6ICdwYXNzd29yZCcgfSlcbiAgICAgICAgICAgICAgICAgICAgLmV4cGVjdCgyMDApXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gcmVzLmdldCgneC1hY2Nlc3MtdG9rZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnB1dCgnL2FwaS92MS91c2VyL3Jlc3RvcmUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5leHBlY3QoNDAxLCBkb25lKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIHVzZXIgbm90IGxvZ2dlZCBpbicsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnB1dCgnL2FwaS92MS91c2VyL3Jlc3RvcmUnKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICdhY3RpdmVAdGVzdC5jb20nIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDEsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pZEdWemRGVnpaWEpEYjI1MGNtOXNiR1Z5TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dkxpNHZkR1Z6ZEhNdmMyVnlkbVZ5TDNSbGMzUlZjMlZ5UTI5dWRISnZiR3hsY2k1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96dEJRVUZCTEcxRFFVRnhRenRCUVVOeVF5eHhRMEZCYjBNN1FVRkRjRU1zTmtKQlFUaENPMEZCUlRsQ0xIbENRVUU0UXp0QlFVTTVReXh4UkVGQk1rUTdRVUZGTTBRc1VVRkJVU3hEUVVGRExHbENRVUZwUWl4RlFVRkZPMGxCUTNoQ0xFbEJRVWtzUzBGQllTeERRVUZETzBsQlEyeENMRWxCUVVrc1VVRkJVU3hIUVVGSE8xRkJRMWdzU1VGQlNTeEZRVUZGTEZGQlFWRTdVVUZEWkN4TFFVRkxMRVZCUVVVc1pVRkJaVHRSUVVOMFFpeFJRVUZSTEVWQlFVVXNUVUZCVFR0UlFVTm9RaXhKUVVGSkxFVkJRVVVzVDBGQlR6dExRVU5vUWl4RFFVRkRPMGxCUlVZc1ZVRkJWU3hEUVVGRExGVkJRVk1zU1VGQlNUdFJRVU53UWl4elFrRkJhMElzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXp0WlFVTjBRaXhKUVVGSkxFbEJRVWtzUjBGQlZTeEpRVUZKTEdsQ1FVRkpMRU5CUVVNN1owSkJRM1pDTEVsQlFVa3NSVUZCUlN4UlFVRlJMRU5CUVVNc1NVRkJTVHRuUWtGRGJrSXNTMEZCU3l4RlFVRkZMRkZCUVZFc1EwRkJReXhMUVVGTE8yZENRVU55UWl4UlFVRlJMRVZCUVVVc2JVSkJRVkVzUTBGQlF5eFJRVUZSTEVOQlFVTXNVVUZCVVN4RFFVRkRPMmRDUVVOeVF5eEpRVUZKTEVWQlFVVXNVVUZCVVN4RFFVRkRMRWxCUVVrN1lVRkRkRUlzUTBGQlF5eERRVUZETzFsQlEwZ3NTVUZCU1N4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZETEVsQlFWYzdaMEpCUlhwQ0xFOUJRVThzUTBGQlF5eFBRVUZITEVOQlFVTTdjVUpCUTFBc1NVRkJTU3hEUVVGRExHVkJRV1VzUTBGQlF6dHhRa0ZEY2tJc1NVRkJTU3hEUVVGRExFVkJRVU1zUzBGQlN5eEZRVUZGTEZGQlFWRXNRMEZCUXl4TFFVRkxMRVZCUVVVc1VVRkJVU3hGUVVGRkxGRkJRVkVzUTBGQlF5eFJRVUZSTEVWQlFVTXNRMEZCUXp0eFFrRkRNVVFzVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXp0eFFrRkRXQ3hIUVVGSExFTkJRVU1zVlVGQlF5eEhRVUZSTEVWQlFVVXNSMEZCY1VJN2IwSkJRMnBETEV0QlFVc3NSMEZCUnl4SFFVRkhMRU5CUVVNc1IwRkJSeXhEUVVGRExHZENRVUZuUWl4RFFVRkRMRU5CUVVNN2IwSkJRMnhETEdGQlFVMHNRMEZCUXl4VFFVRlRMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU03YjBKQlEzaENMR0ZCUVUwc1EwRkJReXhSUVVGUkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTTdiMEpCUTNaQ0xHRkJRVTBzUTBGQlF5eFZRVUZWTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN2IwSkJRM3BDTEVsQlFVa3NSVUZCUlN4RFFVRkRPMmRDUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZETzFsQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNc1QwRkJTeXhEUVVGQkxFTkJRVU1zVlVGQlF5eEhRVUZSTzJkQ1FVTmtMRTFCUVUwc1IwRkJSeXhEUVVGRE8xbEJRMlFzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOUUxFTkJRVU1zUTBGQlF5eERRVUZETzBsQlJVZ3NVVUZCVVN4RFFVRkRMR3RDUVVGclFpeEZRVUZGTzFGQlEzcENMRVZCUVVVc1EwRkJReXhwUTBGQmFVTXNSVUZCUlN4VlFVRlZMRWxCUVVrN1dVRkRhRVFzVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXp0cFFrRkRVQ3hIUVVGSExFTkJRVU1zWTBGQll5eERRVUZETzJsQ1FVTnVRaXhIUVVGSExFTkJRVU1zWjBKQlFXZENMRVZCUVVVc1MwRkJTeXhEUVVGRE8ybENRVU0xUWl4TlFVRk5MRU5CUVVNc1IwRkJSeXhGUVVGRkxGVkJRVU1zUjBGQlVTeEZRVUZGTEVkQlFYRkNPMmRDUVVONlF5eEpRVUZKTEVkQlFVYzdiMEpCUVVVc1QwRkJUeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTTdaMEpCUXpGQ0xHRkJRVTBzUTBGQlF5eFhRVUZYTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFVkJRVVVzVVVGQlVTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMmRDUVVOcVJDeGhRVUZOTEVOQlFVTXNWMEZCVnl4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eEZRVUZGTEZGQlFWRXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRenRuUWtGRGJrUXNZVUZCVFN4RFFVRkRMRmRCUVZjc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NSVUZCUlN4UlFVRlJMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03WjBKQlEycEVMR0ZCUVUwc1EwRkJReXhYUVVGWExFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NSVUZCUlN4VlFVRlZMRU5CUVVNc1EwRkJRenRuUWtGRGVrTXNTVUZCU1N4RlFVRkZMRU5CUVVNN1dVRkRXQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5ZTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1JVRkJSU3hEUVVGRExEaENRVUU0UWl4RlFVRkZMRlZCUVZVc1NVRkJTVHRaUVVNM1F5eFBRVUZQTEVOQlFVTXNUMEZCUnl4RFFVRkRPMmxDUVVOUUxFZEJRVWNzUTBGQlF5eGpRVUZqTEVOQlFVTTdhVUpCUTI1Q0xFMUJRVTBzUTBGQlF5eEhRVUZITEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRNMElzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOSUxGRkJRVkVzUTBGQlF5eHRRa0ZCYlVJc1JVRkJSVHRSUVVNeFFpeEZRVUZGTEVOQlFVTXNaME5CUVdkRExFVkJRVVVzVlVGQlZTeEpRVUZKTzFsQlF5OURMRTlCUVU4c1EwRkJReXhQUVVGSExFTkJRVU03YVVKQlExQXNSMEZCUnl4RFFVRkRMR1ZCUVdVc1EwRkJRenRwUWtGRGNFSXNSMEZCUnl4RFFVRkRMR2RDUVVGblFpeEZRVUZGTEV0QlFVc3NRMEZCUXp0cFFrRkROVUlzVFVGQlRTeERRVUZETEVkQlFVY3NSVUZCUlN4VlFVRkRMRWRCUVZFc1JVRkJSU3hIUVVGeFFqdG5Ra0ZEZWtNc1lVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTTdaMEpCUXpkRExHRkJRVTBzUTBGQlF5eFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEVWQlFVVTdiMEpCUXpsQ0xFbEJRVWtzUlVGQlJTeFJRVUZSTEVOQlFVTXNTVUZCU1R0dlFrRkRia0lzU1VGQlNTeEZRVUZGTEZGQlFWRXNRMEZCUXl4SlFVRkpPMjlDUVVOdVFpeExRVUZMTEVWQlFVVXNVVUZCVVN4RFFVRkRMRXRCUVVzN2FVSkJRM2hDTEVOQlFVTXNRMEZCUVR0blFrRkRSaXhoUVVGTkxFTkJRVU1zVjBGQlZ5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZGTEZWQlFWVXNRMEZCUXl4RFFVRkRPMmRDUVVOc1JDeEpRVUZKTEVWQlFVVXNRMEZCUXp0WlFVTllMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMWdzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4RlFVRkZMRU5CUVVNc09FSkJRVGhDTEVWQlFVVXNWVUZCVlN4SlFVRkpPMWxCUXpkRExFOUJRVThzUTBGQlF5eFBRVUZITEVOQlFVTTdhVUpCUTFBc1IwRkJSeXhEUVVGRExHVkJRV1VzUTBGQlF6dHBRa0ZEY0VJc1RVRkJUU3hEUVVGRExFZEJRVWNzUlVGQlJTeEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTXpRaXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTBnc1VVRkJVU3hEUVVGRExIbENRVUY1UWl4RlFVRkZPMUZCUTJoRExFVkJRVVVzUTBGQlF5eHBRMEZCYVVNc1JVRkJSU3hWUVVGVkxFbEJRVWs3V1VGRGFFUXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJRenRwUWtGRFVDeEhRVUZITEVOQlFVTXNaVUZCWlN4SFFVRkhMRkZCUVZFc1EwRkJReXhMUVVGTExFTkJRVU03YVVKQlEzSkRMRWRCUVVjc1EwRkJReXhuUWtGQlowSXNSVUZCUlN4TFFVRkxMRU5CUVVNN2FVSkJRelZDTEUxQlFVMHNRMEZCUXl4SFFVRkhMRVZCUVVVc1ZVRkJReXhIUVVGUkxFVkJRVVVzUjBGQmNVSTdaMEpCUTNwRExHRkJRVTBzUTBGQlF5eFZRVUZWTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eFBRVUZQTEVWQlFVVXNUVUZCVFN4RlFVRkZMRTFCUVUwc1JVRkJSU3hMUVVGTExFVkJRVVVzVTBGQlV5eERRVUZETEVOQlFVTXNRMEZCUXp0blFrRkRPVVVzWVVGQlRTeERRVUZETEU5QlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUlVGQlJUdHZRa0ZETVVJc1MwRkJTeXhGUVVGRkxGRkJRVkVzUTBGQlF5eExRVUZMTzI5Q1FVTnlRaXhKUVVGSkxFVkJRVVVzVVVGQlVTeERRVUZETEVsQlFVazdiMEpCUTI1Q0xFbEJRVWtzUlVGQlJTeFJRVUZSTEVOQlFVTXNTVUZCU1R0cFFrRkRkRUlzUTBGQlF5eERRVUZETzJkQ1FVTklMRWxCUVVrc1JVRkJSU3hEUVVGRE8xbEJRMWdzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEV0N4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5eHhRMEZCY1VNc1JVRkJSU3hWUVVGVkxFbEJRVWs3V1VGRGNFUXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJRenRwUWtGRFVDeEhRVUZITEVOQlFVTXNhME5CUVd0RExFTkJRVU03YVVKQlEzWkRMRWRCUVVjc1EwRkJReXhuUWtGQlowSXNSVUZCUlN4TFFVRkxMRU5CUVVNN2FVSkJRelZDTEUxQlFVMHNRMEZCUXl4SFFVRkhMRVZCUVVVc1ZVRkJReXhIUVVGUkxFVkJRVVVzUjBGQmNVSTdaMEpCUTNwRExHRkJRVTBzUTBGQlF5eFJRVUZSTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dG5Ra0ZEYUVNc1lVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1JVRkJSU3dyUWtGQkswSXNRMEZCUXl4RFFVRkRPMmRDUVVOd1JTeEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1dVRkRaQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5ZTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1JVRkJSU3hEUVVGRExHdERRVUZyUXl4RlFVRkZMRlZCUVZVc1NVRkJTVHRaUVVOcVJDeFBRVUZQTEVOQlFVTXNUMEZCUnl4RFFVRkRPMmxDUVVOUUxFZEJRVWNzUTBGQlF5d3lRa0ZCTWtJc1EwRkJRenRwUWtGRGFFTXNSMEZCUnl4RFFVRkRMR2RDUVVGblFpeEZRVUZGTEV0QlFVc3NRMEZCUXp0cFFrRkROVUlzVFVGQlRTeERRVUZETEVkQlFVY3NSVUZCUlN4VlFVRkRMRWRCUVZFc1JVRkJSU3hIUVVGeFFqdG5Ra0ZEZWtNc1lVRkJUU3hEUVVGRExGRkJRVkVzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRE8yZENRVU5vUXl4aFFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RlFVRkZMRFpDUVVFMlFpeERRVUZETEVOQlFVTTdaMEpCUTJ4RkxFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0WlFVTmtMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMWdzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOSUxGRkJRVkVzUTBGQlF5eG5RMEZCWjBNc1JVRkJSVHRSUVVOMlF5eEZRVUZGTEVOQlFVTXNNRU5CUVRCRExFVkJRVVVzVlVGQlZTeEpRVUZKTzFsQlEzcEVMRWxCUVVrc1VVRkJVU3hIUVVGSExHOUNRVUZ2UWl4RFFVRkRPMWxCUTNCRExFOUJRVThzUTBGQlF5eFBRVUZITEVOQlFVTTdhVUpCUTFBc1NVRkJTU3hEUVVGRExESkNRVUV5UWl4RFFVRkRPMmxDUVVOcVF5eEhRVUZITEVOQlFVTXNaMEpCUVdkQ0xFVkJRVVVzUzBGQlN5eERRVUZETzJsQ1FVTTFRaXhKUVVGSkxFTkJRVU1zUlVGQlJTeExRVUZMTEVWQlFVVXNVVUZCVVN4RlFVRkZMRU5CUVVNN2FVSkJRM3BDTEUxQlFVMHNRMEZCUXl4SFFVRkhMRVZCUVVVc1ZVRkJReXhIUVVGUkxFVkJRVVVzUjBGQmNVSTdaMEpCUTNwRExFbEJRVWtzUjBGQlJ6dHZRa0ZCUlN4UFFVRlBMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dG5Ra0ZETVVJc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF6dHhRa0ZEVUN4SFFVRkhMRU5CUVVNc1kwRkJZeXhEUVVGRE8zRkNRVVZ1UWl4SFFVRkhMRU5CUVVNc1owSkJRV2RDTEVWQlFVVXNSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXhuUWtGQlowSXNRMEZCUXl4RFFVRkRPM0ZDUVVOb1JDeE5RVUZOTEVOQlFVTXNSMEZCUnl4RlFVRkZMRlZCUVVNc1IwRkJVU3hGUVVGRkxFZEJRWEZDTzI5Q1FVTjZReXhoUVVGTkxFTkJRVU1zVjBGQlZ5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hGUVVGRkxGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0dlFrRkRha1FzWVVGQlRTeERRVUZETEZkQlFWY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUlVGQlJTeFJRVUZSTEVOQlFVTXNRMEZCUXp0dlFrRkROME1zWVVGQlRTeERRVUZETEZkQlFWY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUlVGQlJTeFJRVUZSTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN2IwSkJRMnBFTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRuUWtGRFpDeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTllMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMWdzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4RlFVRkZMRU5CUVVNc2RVTkJRWFZETEVWQlFVVXNWVUZCVlN4SlFVRkpPMWxCUTNSRUxFOUJRVThzUTBGQlF5eFBRVUZITEVOQlFVTTdhVUpCUTFBc1NVRkJTU3hEUVVGRExESkNRVUV5UWl4RFFVRkRPMmxDUVVOcVF5eEhRVUZITEVOQlFVTXNaMEpCUVdkQ0xFVkJRVVVzUzBGQlN5eERRVUZETzJsQ1FVTTFRaXhKUVVGSkxFTkJRVU1zUlVGQlJTeExRVUZMTEVWQlFVVXNZMEZCWXl4RlFVRkZMRU5CUVVNN2FVSkJReTlDTEUxQlFVMHNRMEZCUXl4SFFVRkhMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRE0wSXNRMEZCUXl4RFFVRkRMRU5CUVVFN1VVRkRSaXhGUVVGRkxFTkJRVU1zY1VOQlFYRkRMRVZCUVVVc1ZVRkJWU3hKUVVGSk8xbEJRM0JFTEU5QlFVOHNRMEZCUXl4UFFVRkhMRU5CUVVNN2FVSkJRMUFzU1VGQlNTeERRVUZETERKQ1FVRXlRaXhEUVVGRE8ybENRVU5xUXl4SFFVRkhMRU5CUVVNc1owSkJRV2RDTEVWQlFVVXNTMEZCU3l4RFFVRkRPMmxDUVVNMVFpeEpRVUZKTEVOQlFVTXNSVUZCUlN4TFFVRkxMRVZCUVVVc1pVRkJaU3hGUVVGRkxFTkJRVU03YVVKQlEyaERMRTFCUVUwc1EwRkJReXhIUVVGSExFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTTdVVUZETTBJc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEZRVUZGTEVOQlFVTXNLMEpCUVN0Q0xFVkJRVVVzVlVGQlZTeEpRVUZKTzFsQlF6bERMRTlCUVU4c1EwRkJReXhQUVVGSExFTkJRVU03YVVKQlExQXNTVUZCU1N4RFFVRkRMREpDUVVFeVFpeERRVUZETzJsQ1FVTnFReXhKUVVGSkxFTkJRVU1zUlVGQlJTeExRVUZMTEVWQlFVVXNaVUZCWlN4RlFVRkZMRU5CUVVNN2FVSkJRMmhETEUxQlFVMHNRMEZCUXl4SFFVRkhMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRE0wSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5JTEZGQlFWRXNRMEZCUXl3clFrRkJLMElzUlVGQlJUdFJRVU4wUXl4RlFVRkZMRU5CUVVNc2IwSkJRVzlDTEVWQlFVVXNWVUZCVlN4SlFVRkpPMWxCUTI1RExFbEJRVWtzVDBGQlR5eEhRVUZITEZWQlFWVXNRMEZCUXp0WlFVTjZRaXhQUVVGUExFTkJRVU1zVDBGQlJ5eERRVUZETzJsQ1FVTlFMRWxCUVVrc1EwRkJReXd3UWtGQk1FSXNRMEZCUXp0cFFrRkRhRU1zUjBGQlJ5eERRVUZETEdkQ1FVRm5RaXhGUVVGRkxFdEJRVXNzUTBGQlF6dHBRa0ZETlVJc1NVRkJTU3hEUVVGRExFVkJRVVVzU1VGQlNTeEZRVUZGTEU5QlFVOHNSVUZCUlN4RFFVRkRPMmxDUVVOMlFpeE5RVUZOTEVOQlFVTXNSMEZCUnl4RlFVRkZMRlZCUVVNc1IwRkJVU3hGUVVGRkxFZEJRWEZDTzJkQ1FVTjZReXhQUVVGUExFTkJRVU1zVDBGQlJ5eERRVUZETzNGQ1FVTlFMRWRCUVVjc1EwRkJReXhqUVVGakxFTkJRVU03Y1VKQlEyNUNMRWRCUVVjc1EwRkJReXhuUWtGQlowSXNSVUZCUlN4SFFVRkhMRU5CUVVNc1IwRkJSeXhEUVVGRExHZENRVUZuUWl4RFFVRkRMRU5CUVVNN2NVSkJRMmhFTEUxQlFVMHNRMEZCUXl4SFFVRkhMRVZCUVVVc1ZVRkJReXhIUVVGUkxFVkJRVVVzUjBGQmNVSTdiMEpCUTNwRExHRkJRVTBzUTBGQlF5eFhRVUZYTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFVkJRVVVzVDBGQlR5eERRVUZETEVOQlFVTTdiMEpCUXpORExHRkJRVTBzUTBGQlF5eFhRVUZYTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFVkJRVVVzVVVGQlVTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRPMjlDUVVOdVJDeGhRVUZOTEVOQlFVTXNWMEZCVnl4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEZRVUZGTEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenR2UWtGRGFrUXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8yZENRVU5rTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTFnc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFdDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXdyUWtGQkswSXNSVUZCUlN4VlFVRlZMRWxCUVVrN1dVRkRPVU1zU1VGQlNTeFBRVUZQTEVkQlFVY3NWVUZCVlN4RFFVRkRPMWxCUTNwQ0xFOUJRVThzUTBGQlF5eFBRVUZITEVOQlFVTTdhVUpCUTFBc1NVRkJTU3hEUVVGRExEQkNRVUV3UWl4RFFVRkRPMmxDUVVOb1F5eEpRVUZKTEVOQlFVTXNSVUZCUlN4SlFVRkpMRVZCUVVVc1QwRkJUeXhGUVVGRkxFTkJRVU03YVVKQlEzWkNMRTFCUVUwc1EwRkJReXhIUVVGSExFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTTdVVUZETTBJc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFVDeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTklMRkZCUVZFc1EwRkJReXh0UTBGQmJVTXNSVUZCUlR0UlFVTXhReXhGUVVGRkxFTkJRVU1zZDBKQlFYZENMRVZCUVVVc1ZVRkJWU3hKUVVGSk8xbEJRM1pETEVsQlFVa3NUMEZCVHl4SFFVRkhMRk5CUVZNc1EwRkJRenRaUVVONFFpeFBRVUZQTEVOQlFVTXNUMEZCUnl4RFFVRkRPMmxDUVVOUUxFbEJRVWtzUTBGQlF5dzRRa0ZCT0VJc1EwRkJRenRwUWtGRGNFTXNSMEZCUnl4RFFVRkRMR2RDUVVGblFpeEZRVUZGTEV0QlFVc3NRMEZCUXp0cFFrRkROVUlzU1VGQlNTeERRVUZETEVWQlFVVXNUMEZCVHl4RlFVRkZMRkZCUVZFc1EwRkJReXhSUVVGUkxFVkJRVVVzVDBGQlR5eEZRVUZGTEU5QlFVOHNSVUZCUlN4RFFVRkRPMmxDUVVOMFJDeE5RVUZOTEVOQlFVTXNSMEZCUnl4RlFVRkZMRlZCUVVNc1IwRkJVU3hGUVVGRkxFZEJRWEZDTzJkQ1FVTjZReXhKUVVGSkxFZEJRVWM3YjBKQlFVVXNUMEZCVHl4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU03WjBKQlF6RkNMRTlCUVU4c1EwRkJReXhQUVVGSExFTkJRVU03Y1VKQlExQXNTVUZCU1N4RFFVRkRMR1ZCUVdVc1EwRkJRenR4UWtGRGNrSXNTVUZCU1N4RFFVRkRMRVZCUVVVc1MwRkJTeXhGUVVGRkxGRkJRVkVzUTBGQlF5eExRVUZMTEVWQlFVVXNVVUZCVVN4RlFVRkZMRTlCUVU4c1JVRkJSU3hEUVVGRE8zRkNRVU5zUkN4TlFVRk5MRU5CUVVNc1IwRkJSeXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzFsQlF6TkNMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMWdzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4RlFVRkZMRU5CUVVNc01rUkJRVEpFTEVWQlFVVXNWVUZCVlN4SlFVRkpPMWxCUTNSRkxFOUJRVThzUTBGQlF5eFBRVUZITEVOQlFVTTdhVUpCUTFBc1NVRkJTU3hEUVVGRExEaENRVUU0UWl4RFFVRkRPMmxDUVVOd1F5eEhRVUZITEVOQlFVTXNaMEpCUVdkQ0xFVkJRVVVzUzBGQlN5eERRVUZETzJsQ1FVTTFRaXhKUVVGSkxFTkJRVU1zUlVGQlJTeFBRVUZQTEVWQlFVVXNaMEpCUVdkQ0xFVkJRVVVzVDBGQlR5eEZRVUZGTEZWQlFWVXNSVUZCUlN4RFFVRkRPMmxDUVVONFJDeE5RVUZOTEVOQlFVTXNSMEZCUnl4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRek5DTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTFBc1JVRkJSU3hEUVVGRExHbEVRVUZwUkN4RlFVRkZMRlZCUVZVc1NVRkJTVHRaUVVOb1JTeFBRVUZQTEVOQlFVTXNUMEZCUnl4RFFVRkRPMmxDUVVOUUxFbEJRVWtzUTBGQlF5dzRRa0ZCT0VJc1EwRkJRenRwUWtGRGNFTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1JVRkJSU3hKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU16UWl4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOUUxFTkJRVU1zUTBGQlF5eERRVUZETzBsQlEwZ3NVVUZCVVN4RFFVRkRMREJDUVVFd1FpeEZRVUZGTzFGQlEycERMRWxCUVVrc1QwRkJUeXhIUVVGSE8xbEJRMVlzUzBGQlN5eEZRVUZGTEd0Q1FVRnJRanRaUVVONlFpeEpRVUZKTEVWQlFVVXNWVUZCVlR0WlFVTm9RaXhKUVVGSkxFVkJRVVVzVFVGQlRUdFRRVU5tTEVOQlFVRTdVVUZEUkN4RlFVRkZMRU5CUVVNc01FSkJRVEJDTEVWQlFVVXNWVUZCVXl4SlFVRkpPMWxCUlhoRExHbENRVUZKTEVOQlFVTXNWMEZCVnl4RFFVRkRMRTlCUVU4c1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eGpRVUZqTEVOQlFVTXNWVUZCUXl4SFFVRkhMRVZCUVVVc1MwRkJZVHRuUWtGRE9VUXNTVUZCU1N4SFFVRkhPMjlDUVVGRkxFOUJRVThzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMmRDUVVNeFFpeGhRVUZOTEVOQlFVTXNWMEZCVnl4RFFVRkRMRXRCUVVzc1JVRkJSU3hEUVVGRExFVkJRVVVzYlVSQlFXMUVMRU5CUVVNc1EwRkJRenRuUWtGRGJFWXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJRenR4UWtGRFVDeEpRVUZKTEVOQlFVTXNjVUpCUVhGQ0xFTkJRVU03Y1VKQlF6TkNMRWRCUVVjc1EwRkJReXhuUWtGQlowSXNSVUZCUlN4TFFVRkxMRU5CUVVNN2NVSkJRelZDTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNN2NVSkJRMklzVFVGQlRTeERRVUZETEVkQlFVY3NSVUZCUlN4VlFVRkRMRWRCUVZFc1JVRkJSU3hIUVVGeFFqdHZRa0ZEZWtNc1NVRkJTU3hIUVVGSE8zZENRVUZGTEU5QlFVOHNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8yOUNRVU14UWl4cFFrRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF5eFBRVUZQTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVU1zUjBGQlJ5eEZRVUZGTEVsQlFWYzdkMEpCUTJ4RUxFbEJRVWtzUjBGQlJ6czBRa0ZCUlN4UFFVRlBMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dDNRa0ZETVVJc1lVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eEpRVUZKTEVWQlFVVXNUMEZCVHl4RFFVRkRMRU5CUVVNN2QwSkJRMnhETEVsQlFVa3NSVUZCUlN4RFFVRkRPMjlDUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZETzJkQ1FVTlFMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMWdzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5eHZSRUZCYjBRc1JVRkJSU3hWUVVGVExFbEJRVWs3V1VGRGJFVXNTVUZCU1N4SlFVRkpMRWRCUVZVc1NVRkJTU3hwUWtGQlNTeERRVUZETzJkQ1FVTjJRaXhKUVVGSkxFVkJRVVVzVDBGQlR5eERRVUZETEVsQlFVazdaMEpCUTJ4Q0xFdEJRVXNzUlVGQlJTeFBRVUZQTEVOQlFVTXNTMEZCU3p0blFrRkRjRUlzVVVGQlVTeEZRVUZGTEcxQ1FVRlJMRU5CUVVNc1ZVRkJWU3hEUVVGRE8yZENRVU01UWl4SlFVRkpMRVZCUVVVc1QwRkJUeXhEUVVGRExFbEJRVWs3WVVGRGNrSXNRMEZCUXl4RFFVRkRPMWxCUTBnc1NVRkJTU3hEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRkRMRWxCUVZjN1owSkJSWHBDTEU5QlFVOHNRMEZCUXl4UFFVRkhMRU5CUVVNN2NVSkJRMUFzU1VGQlNTeERRVUZETEdWQlFXVXNRMEZCUXp0eFFrRkRja0lzU1VGQlNTeERRVUZETEVWQlFVVXNTMEZCU3l4RlFVRkZMRTlCUVU4c1EwRkJReXhMUVVGTExFVkJRVVVzVVVGQlVTeEZRVUZGTEZWQlFWVXNSVUZCUlN4RFFVRkRPM0ZDUVVOd1JDeE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRPM0ZDUVVOWUxFZEJRVWNzUTBGQlF5eFZRVUZETEVkQlFWRXNSVUZCUlN4SFFVRnhRanR2UWtGRGFrTXNTMEZCU3l4SFFVRkhMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zWjBKQlFXZENMRU5CUVVNc1EwRkJRenR2UWtGRGJFTXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJRenQ1UWtGRFVDeEpRVUZKTEVOQlFVTXNjVUpCUVhGQ0xFTkJRVU03ZVVKQlF6TkNMRWRCUVVjc1EwRkJReXhuUWtGQlowSXNSVUZCUlN4TFFVRkxMRU5CUVVNN2VVSkJRelZDTEUxQlFVMHNRMEZCUXl4SFFVRkhMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU03WjBKQlF6TkNMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMWdzUTBGQlF5eERRVUZETEVOQlFVTXNUMEZCU3l4RFFVRkJMRU5CUVVNc1ZVRkJReXhIUVVGUk8yZENRVU5rTEUxQlFVMHNSMEZCUnl4RFFVRkRPMWxCUTJRc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFVDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXh6UTBGQmMwTXNSVUZCUlN4VlFVRlRMRWxCUVVrN1dVRkRjRVFzVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXp0cFFrRkRVQ3hKUVVGSkxFTkJRVU1zY1VKQlFYRkNMRU5CUVVNN2FVSkJRek5DTEUxQlFVMHNRMEZCUXl4SFFVRkhMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRE0wSXNRMEZCUXl4RFFVRkRMRU5CUVVFN1VVRkRSaXhGUVVGRkxFTkJRVU1zYlVOQlFXMURMRVZCUVVVc1ZVRkJVeXhKUVVGSk8xbEJRMnBFTEU5QlFVOHNRMEZCUXl4UFFVRkhMRU5CUVVNN2FVSkJRMUFzU1VGQlNTeERRVUZETEhGQ1FVRnhRaXhEUVVGRE8ybENRVU16UWl4SFFVRkhMRU5CUVVNc1owSkJRV2RDTEVWQlFVVXNTMEZCU3l4RFFVRkRPMmxDUVVNMVFpeEpRVUZKTEVOQlFVTTdaMEpCUTBZc1MwRkJTeXhGUVVGRkxGZEJRVmM3WjBKQlEyeENMRWxCUVVrc1JVRkJSU3hQUVVGUExFTkJRVU1zU1VGQlNUdG5Ra0ZEYkVJc1NVRkJTU3hGUVVGRkxFOUJRVThzUTBGQlF5eEpRVUZKTzJGQlEzSkNMRU5CUVVNN2FVSkJRMFFzVFVGQlRTeERRVUZETEVkQlFVY3NSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVNelFpeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXdyUWtGQkswSXNSVUZCUlN4VlFVRlRMRWxCUVVrN1dVRkROME1zVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXp0cFFrRkRVQ3hKUVVGSkxFTkJRVU1zY1VKQlFYRkNMRU5CUVVNN2FVSkJRek5DTEVkQlFVY3NRMEZCUXl4blFrRkJaMElzUlVGQlJTeExRVUZMTEVOQlFVTTdhVUpCUXpWQ0xFbEJRVWtzUTBGQlF6dG5Ra0ZEUml4TFFVRkxMRVZCUVVVc1QwRkJUeXhEUVVGRExFdEJRVXM3WjBKQlEzQkNMRWxCUVVrc1JVRkJSU3hQUVVGUExFTkJRVU1zU1VGQlNUdG5Ra0ZEYkVJc1NVRkJTU3hGUVVGRkxGZEJRVmM3WVVGRGNFSXNRMEZCUXp0cFFrRkRSQ3hOUVVGTkxFTkJRVU1zUjBGQlJ5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUXpOQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NSVUZCUlN4RFFVRkRMRFpEUVVFMlF5eEZRVUZGTEZWQlFWTXNTVUZCU1R0WlFVTXpSQ3hQUVVGUExFTkJRVU1zVDBGQlJ5eERRVUZETzJsQ1FVTlFMRWxCUVVrc1EwRkJReXh4UWtGQmNVSXNRMEZCUXp0cFFrRkRNMElzUjBGQlJ5eERRVUZETEdkQ1FVRm5RaXhGUVVGRkxFdEJRVXNzUTBGQlF6dHBRa0ZETlVJc1NVRkJTU3hEUVVGRE8yZENRVU5HTEV0QlFVc3NSVUZCUlN4UlFVRlJMRU5CUVVNc1MwRkJTenRuUWtGRGNrSXNTVUZCU1N4RlFVRkZMRTlCUVU4c1EwRkJReXhKUVVGSk8yZENRVU5zUWl4SlFVRkpMRVZCUVVVc1QwRkJUeXhEUVVGRExFbEJRVWs3WVVGRGNrSXNRMEZCUXp0cFFrRkRSQ3hOUVVGTkxFTkJRVU1zUjBGQlJ5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUXpOQ0xFTkJRVU1zUTBGQlF5eERRVUZETzBsQlExQXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRTQ3hSUVVGUkxFTkJRVU1zZVVKQlFYbENMRVZCUVVVN1VVRkRhRU1zU1VGQlNTeFhRVUZYTEVkQlFVYzdXVUZEWkN4SlFVRkpMRVZCUVVVc1ZVRkJWVHRaUVVOb1FpeExRVUZMTEVWQlFVVXNiVUpCUVcxQ08xbEJRekZDTEVsQlFVa3NSVUZCUlN4TlFVRk5PMU5CUTJZc1EwRkJRenRSUVVWR0xFVkJRVVVzUTBGQlF5eDNRa0ZCZDBJc1JVRkJSU3hWUVVGVExFbEJRVWs3V1VGRGRFTXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJRenRwUWtGRFVDeEhRVUZITEVOQlFVTXNjVUpCUVhGQ0xFTkJRVU03YVVKQlF6RkNMRWRCUVVjc1EwRkJReXhuUWtGQlowSXNSVUZCUlN4TFFVRkxMRU5CUVVNN2FVSkJRelZDTEVsQlFVa3NRMEZCUXl4RlFVRkRMRXRCUVVzc1JVRkJSU3hSUVVGUkxFTkJRVU1zUzBGQlN5eEZRVUZGTEVsQlFVa3NSVUZCUlN4WFFVRlhMRVZCUVVNc1EwRkJRenRwUWtGRGFFUXNUVUZCVFN4RFFVRkRMRWRCUVVjc1JVRkJSU3hWUVVGRExFZEJRVkVzUlVGQlJTeEhRVUZ4UWp0blFrRkRla01zU1VGQlNTeEhRVUZITzI5Q1FVRkZMRTlCUVU4c1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzJkQ1FVTXhRaXhwUWtGQlNTeERRVUZETEZkQlFWY3NRMEZCUXl4WFFVRlhMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFVTXNSMEZCVVN4RlFVRkZMRWxCUVZjN2IwSkJRek5FTEVsQlFVa3NSMEZCUnp0M1FrRkJSU3hQUVVGUExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0dlFrRkRNVUlzWVVGQlRTeERRVUZETEZOQlFWTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenR2UWtGRGRrSXNZVUZCVFN4RFFVRkRMRmRCUVZjc1EwRkJReXhKUVVGSkxFVkJRVVVzVjBGQlZ5eERRVUZETEVOQlFVTTdiMEpCUTNSRExFbEJRVWtzUlVGQlJTeERRVUZETzJkQ1FVTllMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMUFzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEV0N4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5d3JRMEZCSzBNc1JVRkJSU3hWUVVGVExFbEJRVWs3V1VGRE4wUXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJRenRwUWtGRFVDeEhRVUZITEVOQlFVTXNjVUpCUVhGQ0xFTkJRVU03YVVKQlF6RkNMRWRCUVVjc1EwRkJReXhuUWtGQlowSXNSVUZCUlN4TFFVRkxMRU5CUVVNN2FVSkJRelZDTEVsQlFVa3NRMEZCUXl4RlFVRkRMRXRCUVVzc1JVRkJSU3gxUWtGQmRVSXNSVUZCUlN4SlFVRkpMRVZCUVVVc1YwRkJWeXhGUVVGRExFTkJRVU03YVVKQlEzcEVMRTFCUVUwc1EwRkJReXhIUVVGSExFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTTdVVUZETTBJc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEZRVUZGTEVOQlFVTXNiME5CUVc5RExFVkJRVVVzVlVGQlV5eEpRVUZKTzFsQlEyeEVMRTlCUVU4c1EwRkJReXhQUVVGSExFTkJRVU03YVVKQlExQXNSMEZCUnl4RFFVRkRMSEZDUVVGeFFpeERRVUZETzJsQ1FVTXhRaXhIUVVGSExFTkJRVU1zWjBKQlFXZENMRVZCUVVVc1MwRkJTeXhEUVVGRE8ybENRVU0xUWl4SlFVRkpMRU5CUVVNN1owSkJRMFlzUzBGQlN5eEZRVUZGTEZGQlFWRXNRMEZCUXl4TFFVRkxPMmRDUVVOeVFpeEpRVUZKTEVWQlFVVXNUVUZCVFN4RFFVRkRMRTFCUVUwc1EwRkJReXhGUVVGRkxFVkJRVVVzVjBGQlZ5eEZRVUZGTEVWQlFVTXNTMEZCU3l4RlFVRkZMRmRCUVZjc1JVRkJReXhEUVVGRE8yRkJRemRFTEVOQlFVTXNRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzFGQlF6ZENMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzUlVGQlJTeERRVUZETEN0Q1FVRXJRaXhGUVVGRkxGVkJRVk1zU1VGQlNUdFpRVU0zUXl4UFFVRlBMRU5CUVVNc1QwRkJSeXhEUVVGRE8ybENRVU5RTEVkQlFVY3NRMEZCUXl4eFFrRkJjVUlzUTBGQlF6dHBRa0ZETVVJc1IwRkJSeXhEUVVGRExHZENRVUZuUWl4RlFVRkZMRXRCUVVzc1EwRkJRenRwUWtGRE5VSXNTVUZCU1N4RFFVRkRPMmRDUVVOR0xFdEJRVXNzUlVGQlJTeFJRVUZSTEVOQlFVTXNTMEZCU3p0blFrRkRja0lzU1VGQlNTeEZRVUZGTEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc1JVRkJSU3hGUVVGRkxGZEJRVmNzUlVGQlJTeEZRVUZGTEVsQlFVa3NSVUZCUlN4WFFVRlhMRVZCUVVVc1EwRkJRenRoUVVNNVJDeERRVUZETEVOQlFVTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1JVRkJSU3hKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU0zUWl4RFFVRkRMRU5CUVVNc1EwRkJRVHRKUVVOT0xFTkJRVU1zUTBGQlF5eERRVUZETzBsQlEwZ3NVVUZCVVN4RFFVRkRMRFJDUVVFMFFpeEZRVUZGTzFGQlEyNURMRlZCUVZVc1EwRkJReXhWUVVGVExFbEJRVWs3V1VGRGNFSXNTVUZCU1N4SlFVRkpMRWRCUVVjc1NVRkJTU3hwUWtGQlNTeERRVUZETzJkQ1FVTm9RaXhKUVVGSkxFVkJRVVVzVlVGQlZUdG5Ra0ZEYUVJc1MwRkJTeXhGUVVGRkxHMUNRVUZ0UWp0blFrRkRNVUlzU1VGQlNTeEZRVUZGTEUxQlFVMDdaMEpCUTFvc1VVRkJVU3hGUVVGRkxFMUJRVTA3WVVGRGJrSXNRMEZCUXl4RFFVRkRPMWxCUTBnc1NVRkJTU3haUVVGWkxFZEJRVWNzU1VGQlNTeHBRa0ZCU1N4RFFVRkRPMmRDUVVONFFpeEpRVUZKTEVWQlFVVXNUVUZCVFR0blFrRkRXaXhMUVVGTExFVkJRVVVzYTBKQlFXdENPMmRDUVVONlFpeEpRVUZKTEVWQlFVVXNUVUZCVFR0blFrRkRXaXhSUVVGUkxFVkJRVVVzVlVGQlZUdG5Ra0ZEY0VJc1QwRkJUeXhGUVVGRkxFbEJRVWs3WVVGRGFFSXNRMEZCUXl4RFFVRkRPMWxCUTBnc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZETEVkQlFWRTdaMEpCUTJZc1NVRkJTU3hIUVVGSE8yOUNRVUZGTEU5QlFVOHNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8yZENRVU14UWl4WlFVRlpMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVU1zUjBGQlVUdHZRa0ZEZGtJc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzJkQ1FVTmtMRU5CUVVNc1EwRkJReXhEUVVGQk8xbEJRMDRzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5eDNRa0ZCZDBJc1JVRkJSU3hWUVVGVExFbEJRVWs3V1VGRGRFTXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJReXhEUVVOUUxGRkJRVTBzUTBGQlFTeERRVUZETEhGQ1FVRnhRaXhEUVVGRE8ybENRVU0zUWl4SFFVRkhMRU5CUVVNc1owSkJRV2RDTEVWQlFVVXNTMEZCU3l4RFFVRkRPMmxDUVVNMVFpeEpRVUZKTEVOQlFVTXNSVUZCUXl4TFFVRkxMRVZCUVVVc2JVSkJRVzFDTEVWQlFVTXNRMEZCUXp0cFFrRkRiRU1zVFVGQlRTeERRVUZETEVkQlFVY3NSVUZCUlN4VlFVRkRMRWRCUVZFN1owSkJRMnhDTEVsQlFVa3NSMEZCUnp0dlFrRkJSU3hQUVVGUExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0blFrRkRNVUlzYVVKQlFVa3NRMEZCUXl4WFFVRlhMRU5CUVVNc2JVSkJRVzFDTEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJReXhIUVVGUkxFVkJRVVVzU1VGQlZ6dHZRa0ZETjBRc1NVRkJTU3hIUVVGSE8zZENRVUZGTEU5QlFVOHNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8yOUNRVU14UWl4aFFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0dlFrRkROVUlzU1VGQlNTeEZRVUZGTEVOQlFVTTdaMEpCUTFnc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRFVDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTllMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzUlVGQlJTeERRVUZETEdkRVFVRm5SQ3hGUVVGRkxGVkJRVk1zU1VGQlNUdFpRVU01UkN4UFFVRlBMRU5CUVVNc1QwRkJSeXhEUVVGRExFTkJRMUFzVVVGQlRTeERRVUZCTEVOQlFVTXNjVUpCUVhGQ0xFTkJRVU03YVVKQlF6ZENMRWRCUVVjc1EwRkJReXhuUWtGQlowSXNSVUZCUlN4TFFVRkxMRU5CUVVNN2FVSkJRelZDTEVsQlFVa3NRMEZCUXl4RlFVRkRMRXRCUVVzc1JVRkJSU3hSUVVGUkxFTkJRVU1zUzBGQlN5eEZRVUZETEVOQlFVTTdhVUpCUXpkQ0xFMUJRVTBzUTBGQlF5eEhRVUZITEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRNMElzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4RlFVRkZMRU5CUVVNc0swSkJRU3RDTEVWQlFVVXNWVUZCVXl4SlFVRkpPMWxCUXpkRExFOUJRVThzUTBGQlF5eFBRVUZITEVOQlFVTXNRMEZEVUN4UlFVRk5MRU5CUVVFc1EwRkJReXh4UWtGQmNVSXNRMEZCUXp0cFFrRkROMElzUjBGQlJ5eERRVUZETEdkQ1FVRm5RaXhGUVVGRkxFdEJRVXNzUTBGQlF6dHBRa0ZETlVJc1NVRkJTU3hEUVVGRExFVkJRVVVzUzBGQlN5eEZRVUZGTEd0Q1FVRnJRaXhGUVVGRExFTkJRVU03YVVKQlEyeERMRTFCUVUwc1EwRkJReXhIUVVGSExFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTTdVVUZETTBJc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEZRVUZGTEVOQlFVTXNjVU5CUVhGRExFVkJRVVVzVlVGQlV5eEpRVUZKTzFsQlEyNUVMRTlCUVU4c1EwRkJReXhQUVVGSExFTkJRVU1zUTBGRFVDeFJRVUZOTEVOQlFVRXNRMEZCUXl4eFFrRkJjVUlzUTBGQlF6dHBRa0ZETjBJc1IwRkJSeXhEUVVGRExHZENRVUZuUWl4RlFVRkZMRXRCUVVzc1EwRkJRenRwUWtGRE5VSXNTVUZCU1N4RFFVRkRMRVZCUVVVc1MwRkJTeXhGUVVGRkxHdENRVUZyUWl4RlFVRkZMRU5CUVVNN2FVSkJRMjVETEUxQlFVMHNRMEZCUXl4SFFVRkhMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRE0wSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hGUVVGRkxFTkJRVU1zYlVOQlFXMURMRVZCUVVVc1ZVRkJVeXhKUVVGSk8xbEJRMnBFTEU5QlFVOHNRMEZCUXl4UFFVRkhMRU5CUVVNc1EwRkRVQ3hSUVVGTkxFTkJRVUVzUTBGQlF5eHhRa0ZCY1VJc1EwRkJRenRwUWtGRE4wSXNSMEZCUnl4RFFVRkRMR2RDUVVGblFpeEZRVUZGTEV0QlFVc3NRMEZCUXp0cFFrRkROVUlzU1VGQlNTeERRVUZETEVWQlFVVXNTMEZCU3l4RlFVRkZMRmRCUVZjc1JVRkJSU3hEUVVGRE8ybENRVU0xUWl4TlFVRk5MRU5CUVVNc1IwRkJSeXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzFGQlF6TkNMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzUlVGQlJTeERRVUZETEc5RVFVRnZSQ3hGUVVGRkxGVkJRVk1zU1VGQlNUdFpRVU5zUlN4SlFVRkpMRWxCUVVrc1IwRkJWU3hKUVVGSkxHbENRVUZKTEVOQlFVTTdaMEpCUTNaQ0xFbEJRVWtzUlVGQlJTeE5RVUZOTzJkQ1FVTmFMRXRCUVVzc1JVRkJSU3h4UWtGQmNVSTdaMEpCUXpWQ0xGRkJRVkVzUlVGQlJTeHRRa0ZCVVN4RFFVRkRMRlZCUVZVc1EwRkJRenRuUWtGRE9VSXNTVUZCU1N4RlFVRkZMRTFCUVUwN1lVRkRaaXhEUVVGRExFTkJRVU03V1VGRFNDeEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVVNc1IwRkJVU3hGUVVGRkxFbEJRVmM3WjBKQlF6VkNMRWxCUVVrc1IwRkJSenR2UWtGQlJTeFBRVUZQTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRuUWtGRk1VSXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJRenR4UWtGRFVDeEpRVUZKTEVOQlFVTXNaVUZCWlN4RFFVRkRPM0ZDUVVOeVFpeEpRVUZKTEVOQlFVTXNSVUZCUlN4TFFVRkxMRVZCUVVVc2NVSkJRWEZDTEVWQlFVVXNVVUZCVVN4RlFVRkZMRlZCUVZVc1JVRkJSU3hEUVVGRE8zRkNRVU0xUkN4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRE8zRkNRVU5ZTEVkQlFVY3NRMEZCUXl4VlFVRkRMRWRCUVZFc1JVRkJSU3hIUVVGeFFqdHZRa0ZEYWtNc1MwRkJTeXhIUVVGSExFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zUTBGQlF6dHZRa0ZEYkVNc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF5eERRVU5RTEZGQlFVMHNRMEZCUVN4RFFVRkRMSEZDUVVGeFFpeERRVUZETzNsQ1FVTTNRaXhIUVVGSExFTkJRVU1zWjBKQlFXZENMRVZCUVVVc1MwRkJTeXhEUVVGRE8zbENRVU0xUWl4TlFVRk5MRU5CUVVNc1IwRkJSeXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzJkQ1FVTXpRaXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU5RTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTFnc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEZRVUZGTEVOQlFVTXNiVU5CUVcxRExFVkJRVVVzVlVGQlV5eEpRVUZKTzFsQlEycEVMRTlCUVU4c1EwRkJReXhQUVVGSExFTkJRVU1zUTBGRFVDeFJRVUZOTEVOQlFVRXNRMEZCUXl4eFFrRkJjVUlzUTBGQlF6dHBRa0ZETjBJc1RVRkJUU3hEUVVGRExFZEJRVWNzUlVGQlJTeEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTXpRaXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTBnc1VVRkJVU3hEUVVGRExEQkNRVUV3UWl4RlFVRkZPMUZCUTJwRExGVkJRVlVzUTBGQlF5eFZRVUZWTEVsQlFVazdXVUZEY2tJc1NVRkJTU3hKUVVGSkxFZEJRVWNzU1VGQlNTeHBRa0ZCU1N4RFFVRkRPMmRDUVVOb1FpeEpRVUZKTEVWQlFVVXNWVUZCVlR0blFrRkRhRUlzUzBGQlN5eEZRVUZGTEdsQ1FVRnBRanRuUWtGRGVFSXNTVUZCU1N4RlFVRkZMRTFCUVUwN1owSkJRMW9zVVVGQlVTeEZRVUZGTEUxQlFVMDdZVUZEYmtJc1EwRkJReXhEUVVGRE8xbEJRMGdzU1VGQlNTeFpRVUZaTEVkQlFVY3NTVUZCU1N4cFFrRkJTU3hEUVVGRE8yZENRVU40UWl4SlFVRkpMRVZCUVVVc1RVRkJUVHRuUWtGRFdpeExRVUZMTEVWQlFVVXNhMEpCUVd0Q08yZENRVU42UWl4SlFVRkpMRVZCUVVVc1RVRkJUVHRuUWtGRFdpeFJRVUZSTEVWQlFVVXNWVUZCVlR0blFrRkRjRUlzVDBGQlR5eEZRVUZGTEVsQlFVazdZVUZEYUVJc1EwRkJReXhEUVVGRE8xbEJRMGdzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRkRMRWRCUVZFN1owSkJRMllzU1VGQlNTeEhRVUZITzI5Q1FVRkZMRTlCUVU4c1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzJkQ1FVTXhRaXhaUVVGWkxFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFVTXNSMEZCVVR0dlFrRkRka0lzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMmRDUVVOa0xFTkJRVU1zUTBGQlF5eERRVUZCTzFsQlEwNHNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl4NVFrRkJlVUlzUlVGQlJTeFZRVUZUTEVsQlFVazdXVUZEZGtNc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF6dHBRa0ZEVUN4SFFVRkhMRU5CUVVNc2MwSkJRWE5DTEVOQlFVTTdhVUpCUXpOQ0xFZEJRVWNzUTBGQlF5eG5Ra0ZCWjBJc1JVRkJSU3hMUVVGTExFTkJRVU03YVVKQlF6VkNMRWxCUVVrc1EwRkJReXhGUVVGRkxFdEJRVXNzUlVGQlJTeHJRa0ZCYTBJc1JVRkJSU3hEUVVGRE8ybENRVU51UXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhGUVVGRkxGVkJRVU1zUjBGQlVUdG5Ra0ZEYkVJc1NVRkJTU3hIUVVGSE8yOUNRVUZGTEU5QlFVOHNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8yZENRVU14UWl4cFFrRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF5eHJRa0ZCYTBJc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZETEVkQlFWRXNSVUZCUlN4SlFVRlhPMjlDUVVNMVJDeEpRVUZKTEVkQlFVYzdkMEpCUVVVc1QwRkJUeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTTdiMEpCUXpGQ0xHRkJRVTBzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRE8yOUNRVU0zUWl4SlFVRkpMRVZCUVVVc1EwRkJRenRuUWtGRFdDeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTlFMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMWdzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4RlFVRkZMRU5CUVVNc2NVTkJRWEZETEVWQlFVVXNWVUZCVXl4SlFVRkpPMWxCUTI1RUxFOUJRVThzUTBGQlF5eFBRVUZITEVOQlFVTTdhVUpCUTFBc1IwRkJSeXhEUVVGRExITkNRVUZ6UWl4RFFVRkRPMmxDUVVNelFpeEhRVUZITEVOQlFVTXNaMEpCUVdkQ0xFVkJRVVVzUzBGQlN5eERRVUZETzJsQ1FVTTFRaXhKUVVGSkxFTkJRVU1zUlVGQlJTeExRVUZMTEVWQlFVVXNkVUpCUVhWQ0xFVkJRVU1zUTBGQlF6dHBRa0ZEZGtNc1RVRkJUU3hEUVVGRExFZEJRVWNzUlVGQlJTeEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTXpRaXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl3clFrRkJLMElzUlVGQlJTeFZRVUZUTEVsQlFVazdXVUZETjBNc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF6dHBRa0ZEVUN4SFFVRkhMRU5CUVVNc2MwSkJRWE5DTEVOQlFVTTdhVUpCUXpOQ0xFZEJRVWNzUTBGQlF5eG5Ra0ZCWjBJc1JVRkJSU3hMUVVGTExFTkJRVU03YVVKQlF6VkNMRWxCUVVrc1EwRkJReXhGUVVGRkxFdEJRVXNzUlVGQlJTeHBRa0ZCYVVJc1JVRkJSU3hEUVVGRE8ybENRVU5zUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzFGQlF6TkNMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzUlVGQlJTeERRVUZETEc5RVFVRnZSQ3hGUVVGRkxGVkJRVk1zU1VGQlNUdFpRVU5zUlN4SlFVRkpMRWxCUVVrc1IwRkJWU3hKUVVGSkxHbENRVUZKTEVOQlFVTTdaMEpCUTNaQ0xFbEJRVWtzUlVGQlJTeE5RVUZOTzJkQ1FVTmFMRXRCUVVzc1JVRkJSU3h4UWtGQmNVSTdaMEpCUXpWQ0xGRkJRVkVzUlVGQlJTeHRRa0ZCVVN4RFFVRkRMRlZCUVZVc1EwRkJRenRuUWtGRE9VSXNTVUZCU1N4RlFVRkZMRTFCUVUwN1lVRkRaaXhEUVVGRExFTkJRVU03V1VGRFNDeEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVVNc1IwRkJVU3hGUVVGRkxFbEJRVmM3WjBKQlF6VkNMRWxCUVVrc1IwRkJSenR2UWtGQlJTeFBRVUZQTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRuUWtGRk1VSXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJRenR4UWtGRFVDeEpRVUZKTEVOQlFVTXNaVUZCWlN4RFFVRkRPM0ZDUVVOeVFpeEpRVUZKTEVOQlFVTXNSVUZCUlN4TFFVRkxMRVZCUVVVc2NVSkJRWEZDTEVWQlFVVXNVVUZCVVN4RlFVRkZMRlZCUVZVc1JVRkJSU3hEUVVGRE8zRkNRVU0xUkN4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRE8zRkNRVU5ZTEVkQlFVY3NRMEZCUXl4VlFVRkRMRWRCUVZFc1JVRkJSU3hIUVVGeFFqdHZRa0ZEYWtNc1MwRkJTeXhIUVVGSExFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zUTBGQlF6dHZRa0ZEYkVNc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF6dDVRa0ZEVUN4SFFVRkhMRU5CUVVNc2MwSkJRWE5DTEVOQlFVTTdlVUpCUXpOQ0xFZEJRVWNzUTBGQlF5eG5Ra0ZCWjBJc1JVRkJSU3hMUVVGTExFTkJRVU03ZVVKQlF6VkNMRTFCUVUwc1EwRkJReXhIUVVGSExFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTTdaMEpCUXpOQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFsQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl4dFEwRkJiVU1zUlVGQlJTeFZRVUZUTEVsQlFVazdXVUZEYWtRc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF6dHBRa0ZEVUN4SFFVRkhMRU5CUVVNc2MwSkJRWE5DTEVOQlFVTTdhVUpCUXpOQ0xFbEJRVWtzUTBGQlF5eEZRVUZGTEV0QlFVc3NSVUZCUlN4cFFrRkJhVUlzUlVGQlJTeERRVUZETzJsQ1FVTnNReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUXpOQ0xFTkJRVU1zUTBGQlF5eERRVUZETzBsQlExQXNRMEZCUXl4RFFVRkRMRU5CUVVNN1FVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF5SjkiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5yZXF1aXJlKFwibW9jaGFcIik7XG52YXIgYXhpb3NfMSA9IHJlcXVpcmUoXCJheGlvc1wiKTtcbnZhciBjaGFpXzEgPSByZXF1aXJlKFwiY2hhaVwiKTtcbnZhciBheGlvc19tb2NrX2FkYXB0ZXJfMSA9IHJlcXVpcmUoXCJheGlvcy1tb2NrLWFkYXB0ZXJcIik7XG52YXIgcmVkdXhfbW9ja19zdG9yZV8xID0gcmVxdWlyZShcInJlZHV4LW1vY2stc3RvcmVcIik7XG52YXIgcmVkdXhfdGh1bmtfMSA9IHJlcXVpcmUoXCJyZWR1eC10aHVua1wiKTtcbnZhciB1c2VyQWN0aW9uc18xID0gcmVxdWlyZShcIi4uLy4uL3NyYy93ZWIvYWN0aW9ucy91c2VyQWN0aW9uc1wiKTtcbnZhciBub3RpZmljYXRpb25zQWN0aW9uc18xID0gcmVxdWlyZShcIi4uLy4uL3NyYy93ZWIvYWN0aW9ucy9ub3RpZmljYXRpb25zQWN0aW9uc1wiKTtcbnZhciBzb2NrZXRBY3Rpb25zXzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL3dlYi9hY3Rpb25zL3NvY2tldEFjdGlvbnNcIik7XG52YXIgY2hhbm5lbHNBY3Rpb25zXzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL3dlYi9hY3Rpb25zL2NoYW5uZWxzQWN0aW9uc1wiKTtcbnZhciBjaGF0VXNlcnNBY3Rpb25zXzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL3dlYi9hY3Rpb25zL2NoYXRVc2Vyc0FjdGlvbnNcIik7XG52YXIgbW9ja1N0b3JlQ3JlYXRvciA9IHJlZHV4X21vY2tfc3RvcmVfMVtcImRlZmF1bHRcIl0oW3JlZHV4X3RodW5rXzFbXCJkZWZhdWx0XCJdXSk7XG5mdW5jdGlvbiBnZXRTdG9yZShzdG9yZSkge1xuICAgIGlmIChzdG9yZSA9PT0gdm9pZCAwKSB7IHN0b3JlID0ge307IH1cbiAgICByZXR1cm4gbW9ja1N0b3JlQ3JlYXRvcihzdG9yZSk7XG59XG5kZXNjcmliZSgnQXN5bmMgQWN0aW9ucycsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbW9ja1N0b3JlO1xuICAgIHZhciBtb2NrQXhpb3M7XG4gICAgYmVmb3JlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbW9ja0F4aW9zID0gbmV3IGF4aW9zX21vY2tfYWRhcHRlcl8xW1wiZGVmYXVsdFwiXShheGlvc18xW1wiZGVmYXVsdFwiXSk7XG4gICAgfSk7XG4gICAgYWZ0ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICBtb2NrQXhpb3MucmVzdG9yZSgpO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdVc2VyIGFzeW5jIGFjdGlvbnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbW9ja1N0b3JlID0gZ2V0U3RvcmUoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zLm9uQW55KCkucmVwbHkoMjAwLCB7fSk7XG4gICAgICAgIH0pO1xuICAgICAgICBkZXNjcmliZSgndXBkYXRlTmFtZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGl0KCdzaG91bGQgaGFuZGxlIGNhbGxiYWNrIGFuZCBzZXQgaW5mbyAnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgICAgIC5kaXNwYXRjaCh1c2VyQWN0aW9uc18xLnVwZGF0ZU5hbWUoJ0FkcmlhbicsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5hbWUgPSAnQWRyaWFuJzsgfSkpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChuYW1lLCAnQWRyaWFuJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBub3RpZmljYXRpb25zQWN0aW9uc18xLkFERF9JTkZPLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICdOYW1lIHVwZGF0ZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpdCgnc2hvdWxkIHNldCBhbiBlcnJvciBvbiBmYWlsZWQgcmVxdWVzdCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgICAgICBtb2NrQXhpb3Mub25Qb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL25hbWUnKS5yZXBseSg1MDAsIHsgZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZycgfSk7XG4gICAgICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgICAgIC5kaXNwYXRjaCh1c2VyQWN0aW9uc18xLnVwZGF0ZU5hbWUoJ0FkcmlhbicsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5hbWUgPSAnQWRyaWFuJzsgfSkpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChuYW1lLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBub3RpZmljYXRpb25zQWN0aW9uc18xLkFERF9FUlJPUixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBkZXNjcmliZSgndXBkYXRlRW1haWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpdCgnc2hvdWxkIHNldCBhbiBlcnJvciBvbiBmYWlsZWQgcmVxdWVzdCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVtYWlsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgbW9ja0F4aW9zLm9uUG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9lbWFpbCcpLnJlcGx5KDUwMCwgeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyB9KTtcbiAgICAgICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAgICAgLmRpc3BhdGNoKHVzZXJBY3Rpb25zXzEudXBkYXRlRW1haWwoJ3Rlc3RAdGVzdC5jb20nLCBmdW5jdGlvbiAoKSB7IHJldHVybiBlbWFpbCA9ICd0ZXN0QHRlc3QuY29tJzsgfSkpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKGVtYWlsKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuQUREX0VSUk9SLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICdTb21ldGhpbmcgd2VudCB3cm9uZydcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGl0KCdzaG91bGQgaGFuZGxlIGNhbGxiYWNrIGFuZCBzZXQgaW5mbycsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVtYWlsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgICAgIC5kaXNwYXRjaCh1c2VyQWN0aW9uc18xLnVwZGF0ZUVtYWlsKCd0ZXN0QHRlc3QuY29tJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gZW1haWwgPSAndGVzdEB0ZXN0LmNvbSc7IH0pKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwoZW1haWwsICd0ZXN0QHRlc3QuY29tJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBub3RpZmljYXRpb25zQWN0aW9uc18xLkFERF9JTkZPLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICdFbWFpbCB1cGRhdGVkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfV0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShkb25lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZGVzY3JpYmUoJ3VwZGF0ZVBhc3N3b3JkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaXQoJ3Nob3VsZCBzZXQgaW5mbycsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICAgICAgdmFyIHVwZGF0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBtb2NrU3RvcmUuZGlzcGF0Y2godXNlckFjdGlvbnNfMS51cGRhdGVQYXNzd29yZCgnYScsICdiJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gdXBkYXRlZCA9IHRydWU7IH0pKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNUcnVlKHVwZGF0ZWQpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5BRERfSU5GTyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAnUGFzc3dvcmQgdXBkYXRlZCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGl0KCdzaG91bGQgc2V0IGFuIGVycm9yIG9uIGZhaWxlZCByZXF1ZXN0JywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdXBkYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgICAgIG1vY2tBeGlvcy5vblBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvcGFzc3dvcmQnKS5yZXBseSg1MDAsIHsgZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZycgfSk7XG4gICAgICAgICAgICAgICAgbW9ja1N0b3JlLmRpc3BhdGNoKHVzZXJBY3Rpb25zXzEudXBkYXRlUGFzc3dvcmQoJ2EnLCAnYicsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVwZGF0ZWQgPSB0cnVlOyB9KSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2UodXBkYXRlZCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBub3RpZmljYXRpb25zQWN0aW9uc18xLkFERF9FUlJPUixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBkZXNjcmliZSgnY3JlYXRlVXNlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGl0KCdzaG91bGQgc2V0IGluZm8gb24gc3VjY2VzcycsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgICAgIC5kaXNwYXRjaCh1c2VyQWN0aW9uc18xLmNyZWF0ZVVzZXIoJ05hbWUnLCAnZW1haWxAdGVzdC5jb20nLCAndXNlcicpKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW25vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkSW5mbygnTmV3IHVzZXIgY3JlYXRlZCcpXSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpdCgnc2hvdWxkIHNldCBlcnJvciBvbiBmYWlsdXJlJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgICAgICBtb2NrQXhpb3Mub25BbnkoKS5yZXBseSg0MDAsIHsgZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZycgfSk7XG4gICAgICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgICAgIC5kaXNwYXRjaCh1c2VyQWN0aW9uc18xLmNyZWF0ZVVzZXIoJ05hbWUnLCAnZW1haWxAdGVzdC5jb20nLCAndXNlcicpKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW25vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nJyldKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlc2NyaWJlKCdlZGl0VXNlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGl0KCdzaG91bGQgc2V0IGluZm8gb24gc3VjY2VzcycsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgICAgIC5kaXNwYXRjaCh1c2VyQWN0aW9uc18xLmVkaXRVc2VyKCdvcmlnaW5hbEB0ZXN0LmNvbScsICdOYW1lJywgJ2VtYWlsQHRlc3QuY29tJywgJ3VzZXInKSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFtub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEluZm8oJ0NoYW5nZXMgc2F2ZWQnKV0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShkb25lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXQoJ3Nob3VsZCBzZXQgZXJyb3Igb24gZmFpbHVyZScsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgbW9ja0F4aW9zLm9uQW55KCkucmVwbHkoNDAwLCB7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnIH0pO1xuICAgICAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgICAgICAuZGlzcGF0Y2godXNlckFjdGlvbnNfMS5lZGl0VXNlcignb3JpZ2luYWxAdGVzdC5jb20nLCAnTmFtZScsICdlbWFpbEB0ZXN0LmNvbScsICd1c2VyJykpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3JvbmcnKV0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShkb25lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZGVzY3JpYmUoJ2RlbGV0ZVVzZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpdCgnc2hvdWxkIHNldCBpbmZvIG9uIHN1Y2Nlc3MnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgICAgICAuZGlzcGF0Y2godXNlckFjdGlvbnNfMS5kZWxldGVVc2VyKCd1c2VyQHRlc3QuY29tJykpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRJbmZvKCdVc2VyIGRlbGV0ZWQnKV0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShkb25lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXQoJ3Nob3VsZCBzZXQgZXJyb3Igb24gZmFpbHVyZScsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgbW9ja0F4aW9zLm9uQW55KCkucmVwbHkoNDAwLCB7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnIH0pO1xuICAgICAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgICAgICAuZGlzcGF0Y2godXNlckFjdGlvbnNfMS5kZWxldGVVc2VyKCd0ZXN0QHRlc3QuY29tJykpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3JvbmcnKV0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShkb25lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZGVzY3JpYmUoJ3Jlc3RvcmVVc2VyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaXQoJ3Nob3VsZCBzZXQgaW5mbyBvbiBzdWNjZXNzJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAgICAgLmRpc3BhdGNoKHVzZXJBY3Rpb25zXzEucmVzdG9yZVVzZXIoJ3VzZXJAdGVzdC5jb20nKSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFtub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEluZm8oJ1VzZXIgcmVzdG9yZWQnKV0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShkb25lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXQoJ3Nob3VsZCBzZXQgZXJyb3Igb24gZmFpbHVyZScsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgbW9ja0F4aW9zLm9uQW55KCkucmVwbHkoNDAwLCB7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnIH0pO1xuICAgICAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgICAgICAuZGlzcGF0Y2godXNlckFjdGlvbnNfMS5yZXN0b3JlVXNlcigndGVzdEB0ZXN0LmNvbScpKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW25vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nJyldKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ0NoYW5uZWxzIGFzeW5jIGFjdGlvbnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbW9ja1N0b3JlID0gbW9ja1N0b3JlQ3JlYXRvcih7XG4gICAgICAgICAgICAgICAgY2hhbm5lbHM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBuYW1lOiAnZ2VuZXJhbCcsIGZldGNoaW5nTmV3TWVzc2FnZXM6IGZhbHNlLCBoYXNNb3JlTWVzc2FnZXM6IHRydWUsIHJldHJpZXZlTWVzc2FnZXNPZmZzZXQ6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBuYW1lOiAnZmV0Y2hpbmcgbmV3IG1lc3NhZ2VzJywgZmV0Y2hpbmdOZXdNZXNzYWdlczogdHJ1ZSwgaGFzTW9yZU1lc3NhZ2VzOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbmFtZTogJ25vIG1vcmUgbWVzc2FnZXMnLCBmZXRjaGluZ05ld01lc3NhZ2VzOiBmYWxzZSwgaGFzTW9yZU1lc3NhZ2VzOiBmYWxzZSB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5vbkFueSgpLnJlcGx5KDIwMCwge30pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmZXRjaCBjaGFubmVscyBhbmQgZGlzcGF0Y2ggYWRkQ2hhbm5lbHMgd2l0aCBhbiBhcnJheSBvZiBjaGFubmVsIG5hbWVzJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHZhciBjaGFubmVscyA9IFtcbiAgICAgICAgICAgICAgICB7IF9pZDogJzEnLCBuYW1lOiAnZ2VuZXJhbCcgfSxcbiAgICAgICAgICAgICAgICB7IF9pZDogJzInLCBuYW1lOiAncmFuZG9tJyB9LFxuICAgICAgICAgICAgICAgIHsgX2lkOiAnMycsIG5hbWU6ICdzb21ldGhpbmcgZWxzZScgfVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zXG4gICAgICAgICAgICAgICAgLm9uR2V0KCcvYXBpL3YxL2NoYW5uZWxzJylcbiAgICAgICAgICAgICAgICAucmVwbHkoMjAwLCB7IGNoYW5uZWxzOiBjaGFubmVscyB9KTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5mZXRjaENoYW5uZWxzKCkpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB2YXIgYWRkQ2hhbm5lbHNBY3Rpb24gPSBjaGFubmVsc0FjdGlvbnNfMS5hZGRDaGFubmVscyhbJ2dlbmVyYWwnLCAncmFuZG9tJywgJ3NvbWV0aGluZyBlbHNlJ10pO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFthZGRDaGFubmVsc0FjdGlvbl0pO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGRpc3BhdGNoIGFkZEVycm9yIG9uIGZhaWxlZCByZXF1ZXN0IHRvIC9hcGkvdjEvY2hhbm5lbHMnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3NcbiAgICAgICAgICAgICAgICAub25HZXQoJy9hcGkvdjEvY2hhbm5lbHMnKVxuICAgICAgICAgICAgICAgIC5yZXBseSg1MDApO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmZldGNoQ2hhbm5lbHMoKSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgIHZhciBlcnJvckFjdGlvbiA9IG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBmZXRjaCB0aGUgY2hhbm5lbHMnKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbZXJyb3JBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCBhbiBlcnJvciBpZiByZXRyaWV2aW5nIG1lc3NhZ2VzIHdpdGggaW52YWxpZCBjaGFubmVsIG5hbWUnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLnJldHJpZXZlQ2hhbm5lbE1lc3NhZ2VzKCdpbnZhbGlkIG5hbWUnKSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChtc2csICdSZXRyaWV2ZSBDaGFubmVsIE1lc3NhZ2VzIGRpc3BhdGNoZWQgd2l0aCBpbmNvcnJlY3QgY2hhbm5lbCBuYW1lIG9yIHdoaWxlIGFscmVhZHkgZmV0Y2hpbmcgbWVzc2FnZXMnKTtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgdmFyIGVycm9yQWN0aW9uID0gbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIGZldGNoIG1lc3NhZ2VzJyk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW2Vycm9yQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZGlzcGF0Y2ggYW4gZXJyb3IgaWYgYWxyZWFkeSByZXRyaWV2aW5nIGNoYW5uZWwgbWVzc2FnZXMnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLnJldHJpZXZlQ2hhbm5lbE1lc3NhZ2VzKCdmZXRjaGluZyBuZXcgbWVzc2FnZXMnKSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChtc2csICdSZXRyaWV2ZSBDaGFubmVsIE1lc3NhZ2VzIGRpc3BhdGNoZWQgd2l0aCBpbmNvcnJlY3QgY2hhbm5lbCBuYW1lIG9yIHdoaWxlIGFscmVhZHkgZmV0Y2hpbmcgbWVzc2FnZXMnKTtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgdmFyIGVycm9yQWN0aW9uID0gbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIGZldGNoIG1lc3NhZ2VzJyk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW2Vycm9yQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZGlzcGF0Y2ggYW4gZXJyb3IgaWYgY2hhbm5lbCBkb2VzIG5vdCBoYXZlIG9sZGVyIG1lc3NhZ2VzJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5yZXRyaWV2ZUNoYW5uZWxNZXNzYWdlcygnbm8gbW9yZSBtZXNzYWdlcycpKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKG1zZywgJ1JldHJpZXZlIENoYW5uZWwgTWVzc2FnZXMgZGlzcGF0Y2hlZCB3aXRoIGluY29ycmVjdCBjaGFubmVsIG5hbWUgb3Igd2hpbGUgYWxyZWFkeSBmZXRjaGluZyBtZXNzYWdlcycpO1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JBY3Rpb24gPSBub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gZmV0Y2ggbWVzc2FnZXMnKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbZXJyb3JBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCBhbiBlcnJvciBvbiBmYWlsZWQgZ2V0IHJlcXVlc3QgdG8gL2FwaS92MS9tZXNzYWdlcy8nLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3NcbiAgICAgICAgICAgICAgICAub25HZXQoKVxuICAgICAgICAgICAgICAgIC5yZXBseSg1MDApO1xuICAgICAgICAgICAgdmFyIGNoYW5uZWwgPSAnZ2VuZXJhbCc7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEucmV0cmlldmVDaGFubmVsTWVzc2FnZXMoY2hhbm5lbCkpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB2YXIgc2V0RmV0Y2hpbmdUcnVlQWN0aW9uID0gY2hhbm5lbHNBY3Rpb25zXzEuc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMoY2hhbm5lbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdmFyIGVycm9yQWN0aW9uID0gbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIGZldGNoIG1lc3NhZ2VzJyk7XG4gICAgICAgICAgICAgICAgdmFyIHNldEZldGNoaW5nRmFsc2VBY3Rpb24gPSBjaGFubmVsc0FjdGlvbnNfMS5zZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcyhjaGFubmVsLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW3NldEZldGNoaW5nVHJ1ZUFjdGlvbiwgZXJyb3JBY3Rpb24sIHNldEZldGNoaW5nRmFsc2VBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBzZXQgY2hhbm5lbEhhc01vcmVNZXNzYWdlcyBvbiByZXNwb25zZSB3aXRoIGVtcHR5IGFycmF5JywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zXG4gICAgICAgICAgICAgICAgLm9uR2V0KClcbiAgICAgICAgICAgICAgICAucmVwbHkoMjAwLCB7IG1lc3NhZ2VzOiBbXSB9KTtcbiAgICAgICAgICAgIHZhciBjaGFubmVsID0gJ2dlbmVyYWwnO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLnJldHJpZXZlQ2hhbm5lbE1lc3NhZ2VzKGNoYW5uZWwpKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgdmFyIHNldEZldGNoaW5nVHJ1ZUFjdGlvbiA9IGNoYW5uZWxzQWN0aW9uc18xLnNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzKGNoYW5uZWwsIHRydWUpO1xuICAgICAgICAgICAgICAgIHZhciBzZXRIYXNNb3JlQWN0aW9uID0gY2hhbm5lbHNBY3Rpb25zXzEuc2V0Q2hhbm5lbEhhc01vcmVNZXNzYWdlcyhjaGFubmVsLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdmFyIHNldEZldGNoaW5nRmFsc2VBY3Rpb24gPSBjaGFubmVsc0FjdGlvbnNfMS5zZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcyhjaGFubmVsLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW3NldEZldGNoaW5nVHJ1ZUFjdGlvbiwgc2V0SGFzTW9yZUFjdGlvbiwgc2V0RmV0Y2hpbmdGYWxzZUFjdGlvbl0pO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGluY3JlbWVudCBvZmZzZXQgKGJhc2VkIG9uIG51bWJlciBvZiByZWNlaXZlZCBtZXNzYWdlcykgYW5kIGFkZCByZXRyaWV2ZWQgY2hhbm5lbCBtZXNzYWdlcyBvbiBzdWNjZXNzZnVsIHJldHJlaXZlQ2hhbm5lbE1lc3NhZ2VzIGFjdGlvbicsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICB2YXIgY2hhbm5lbCA9ICdnZW5lcmFsJztcbiAgICAgICAgICAgIHZhciBtZXNzYWdlcyA9IFt7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICcxMjMnLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkOiBEYXRlLm5vdygpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHVzZXJFbWFpbDogJ3Rlc3RAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgICAgICBfaWQ6ICcxJ1xuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJzQ1NicsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZWQ6IERhdGUubm93KCkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgdXNlckVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgICAgIF9pZDogJzInXG4gICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvc1xuICAgICAgICAgICAgICAgIC5vbkdldCgpXG4gICAgICAgICAgICAgICAgLnJlcGx5KDIwMCwgeyBtZXNzYWdlczogbWVzc2FnZXMgfSk7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEucmV0cmlldmVDaGFubmVsTWVzc2FnZXMoY2hhbm5lbCkpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB2YXIgc2V0RmV0Y2hpbmdUcnVlQWN0aW9uID0gY2hhbm5lbHNBY3Rpb25zXzEuc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMoY2hhbm5lbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdmFyIGluY3JlbWVudE9mZnNldEFjdGlvbiA9IGNoYW5uZWxzQWN0aW9uc18xLmluY3JlbWVudENoYW5uZWxSZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0KGNoYW5uZWwsIG1lc3NhZ2VzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgdmFyIGFkZE1lc3NhZ2VzQWN0aW9uID0gY2hhbm5lbHNBY3Rpb25zXzEuYWRkUmV0cmlldmVkQ2hhbm5lbE1lc3NhZ2VzKGNoYW5uZWwsIG1lc3NhZ2VzKTtcbiAgICAgICAgICAgICAgICB2YXIgc2V0RmV0Y2hpbmdGYWxzZUFjdGlvbiA9IGNoYW5uZWxzQWN0aW9uc18xLnNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzKGNoYW5uZWwsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbXG4gICAgICAgICAgICAgICAgICAgIHNldEZldGNoaW5nVHJ1ZUFjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgaW5jcmVtZW50T2Zmc2V0QWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICBhZGRNZXNzYWdlc0FjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgc2V0RmV0Y2hpbmdGYWxzZUFjdGlvblxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGRpc3BhdGNoIGluZm8gb24gc3VjY2Vzc2Z1bGx5IGRlbGV0aW5nIGNoYW5uZWwnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdmFyIGNoYW5uZWxzID0gW1xuICAgICAgICAgICAgICAgIHsgX2lkOiAnMScsIG5hbWU6ICdnZW5lcmFsJyB9LFxuICAgICAgICAgICAgICAgIHsgX2lkOiAnMicsIG5hbWU6ICdyYW5kb20nIH0sXG4gICAgICAgICAgICAgICAgeyBfaWQ6ICczJywgbmFtZTogJ3NvbWV0aGluZyBlbHNlJyB9XG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3NcbiAgICAgICAgICAgICAgICAub25HZXQoJy9hcGkvdjEvY2hhbm5lbHMnKVxuICAgICAgICAgICAgICAgIC5yZXBseSgyMDAsIHsgY2hhbm5lbHM6IGNoYW5uZWxzIH0pO1xuICAgICAgICAgICAgbW9ja0F4aW9zXG4gICAgICAgICAgICAgICAgLm9uR2V0KClcbiAgICAgICAgICAgICAgICAucmVwbHkoMjAwKTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5kZWxldGVDaGFubmVsKCdnZW5lcmFsJykpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB2YXIgYWRkSW5mb0FjdGlvbiA9IG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkSW5mbygnQ2hhbm5lbCBkZWxldGVkJyk7XG4gICAgICAgICAgICAgICAgdmFyIGFkZENoYW5uZWxzQWN0aW9uID0gY2hhbm5lbHNBY3Rpb25zXzEuYWRkQ2hhbm5lbHMoWydnZW5lcmFsJywgJ3JhbmRvbScsICdzb21ldGhpbmcgZWxzZSddKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbYWRkSW5mb0FjdGlvbiwgYWRkQ2hhbm5lbHNBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCBhbiBlcnJvciBvbiBmYWlsZWQgYXR0ZW1wdCB0byBkZWxldGUgY2hhbm5lbCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvc1xuICAgICAgICAgICAgICAgIC5vbkdldCgpXG4gICAgICAgICAgICAgICAgLnJlcGx5KDUwMCwgeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyB9KTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5kZWxldGVDaGFubmVsKCdnZW5lcmFsJykpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB2YXIgYWRkRXJyb3JBY3Rpb24gPSBub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZycpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFthZGRFcnJvckFjdGlvbl0pO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGRpc3BhdGNoIGluZm8gb24gY3JlYXRpbmcgbmV3IGNoYW5uZWwnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdmFyIGNoYW5uZWxzID0gW1xuICAgICAgICAgICAgICAgIHsgX2lkOiAnMScsIG5hbWU6ICdnZW5lcmFsJyB9LFxuICAgICAgICAgICAgICAgIHsgX2lkOiAnMicsIG5hbWU6ICdyYW5kb20nIH0sXG4gICAgICAgICAgICAgICAgeyBfaWQ6ICczJywgbmFtZTogJ3NvbWV0aGluZyBlbHNlJyB9XG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3NcbiAgICAgICAgICAgICAgICAub25HZXQoJy9hcGkvdjEvY2hhbm5lbHMnKVxuICAgICAgICAgICAgICAgIC5yZXBseSgyMDAsIHsgY2hhbm5lbHM6IGNoYW5uZWxzIH0pO1xuICAgICAgICAgICAgbW9ja0F4aW9zXG4gICAgICAgICAgICAgICAgLm9uUG9zdCgpXG4gICAgICAgICAgICAgICAgLnJlcGx5KDIwMCk7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuYWRkQ2hhbm5lbCgnbmV3IGNoYW5uZWwnKSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgIHZhciBhZGRJbmZvQWN0aW9uID0gbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRJbmZvKCdDaGFubmVsIGNyZWF0ZWQnKTtcbiAgICAgICAgICAgICAgICB2YXIgYWRkQ2hhbm5lbHNBY3Rpb24gPSBjaGFubmVsc0FjdGlvbnNfMS5hZGRDaGFubmVscyhbJ2dlbmVyYWwnLCAncmFuZG9tJywgJ3NvbWV0aGluZyBlbHNlJ10pO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFthZGRJbmZvQWN0aW9uLCBhZGRDaGFubmVsc0FjdGlvbl0pO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGRpc3BhdGNoIGFuIGVycm9yIG9uIGZhaWxlZCBhdHRlbXB0IHRvIGNyZWF0ZSBhIG5ldyBjaGFubmVsJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zXG4gICAgICAgICAgICAgICAgLm9uQW55KClcbiAgICAgICAgICAgICAgICAucmVwbHkoNTAwLCB7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnIH0pO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmFkZENoYW5uZWwoJ25ldyBjaGFubmVsJykpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB2YXIgYWRkRXJyb3JBY3Rpb24gPSBub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZycpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFthZGRFcnJvckFjdGlvbl0pO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdTb2NrZXQgYXN5bmMgYWN0aW9ucycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBtb2NrU3RvcmUgPSBnZXRTdG9yZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBpbml0aWFsaXplIHdlYnNvY2tldCBjb25uZWN0aW9uJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbW9ja1N0b3JlLmRpc3BhdGNoKHNvY2tldEFjdGlvbnNfMS5pbml0KCkpO1xuICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChhY3Rpb25zWzBdLnR5cGUsIHNvY2tldEFjdGlvbnNfMS5JTklUX1dFQlNPQ0tFVCk7XG4gICAgICAgICAgICBhY3Rpb25zWzBdLmRhdGEuaW8uY2xvc2UoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ0NoYXQgVXNlcnMgYXN5bmMgYWN0aW9ucycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBtb2NrU3RvcmUgPSBnZXRTdG9yZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXBhdGNoIHVwZGF0ZVVzZXJzIG9uIGZldGNoIGFsbCB1c2VycycsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICB2YXIgdXNlcnNSZXNwb25zZSA9IFt7XG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6ICdhZG1pbicsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICd0ZXN0J1xuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6ICd0ZXN0MkB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6ICdnZW5lcmFsJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3Rlc3QnXG4gICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICB2YXIgdXNlcnMgPSB7fTtcbiAgICAgICAgICAgIHVzZXJzUmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiAodSkge1xuICAgICAgICAgICAgICAgIHVzZXJzW3UuZW1haWxdID0ge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiB1Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IHUucm9sZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zLm9uQW55KCkucmVwbHkoMjAwLCB7IHVzZXJzOiB1c2Vyc1Jlc3BvbnNlIH0pO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKGNoYXRVc2Vyc0FjdGlvbnNfMS5mZXRjaEFsbFVzZXJzKCkpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB2YXIgdXBkYXRlVXNlcnNBY3Rpb24gPSBjaGF0VXNlcnNBY3Rpb25zXzEudXBkYXRlVXNlcnModXNlcnMpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFt1cGRhdGVVc2Vyc0FjdGlvbl0pO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGRpc3BhdGNoIGFkZEVycm9yIG9uIGZhaWxlZCBhdHRlbXB0IHRvIGZldGNoIHVzZXJzJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zLm9uQW55KCkucmVwbHkoNTAwKTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChjaGF0VXNlcnNBY3Rpb25zXzEuZmV0Y2hBbGxVc2VycygpKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgdmFyIGFkZEVycm9yQWN0aW9uID0gbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignRmV0Y2hpbmcgYWxsIHVzZXJzIGZhaWxlZCcpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFthZGRFcnJvckFjdGlvbl0pO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lkR1Z6ZEVGemVXNWpRV04wYVc5dWN5NXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1TDNSbGMzUnpMM2RsWWk5MFpYTjBRWE41Ym1OQlkzUnBiMjV6TG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN08wRkJRVUVzYVVKQlFXVTdRVUZEWml3clFrRkJNRUk3UVVGRE1VSXNOa0pCUVRoQ08wRkJRemxDTEhsRVFVRTJRenRCUVVNM1F5eHhSRUZCYzBZN1FVRkRkRVlzTWtOQlFTdENPMEZCUXk5Q0xHbEZRVUV5U1R0QlFVVXpTU3h0UmtGQmIwYzdRVUZGY0Vjc2NVVkJRWE5ITzBGQlEzUkhMSGxGUVVGdlVqdEJRVU53VWl3eVJVRkJiMFk3UVVGSmNFWXNTVUZCVFN4blFrRkJaMElzUjBGQmNVSXNOa0pCUVdNc1EwRkJReXhEUVVGRExIZENRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRPMEZCUlc1RkxGTkJRVk1zVVVGQlVTeERRVUZETEV0QlFWVTdTVUZCVml4elFrRkJRU3hGUVVGQkxGVkJRVlU3U1VGRGVFSXNUMEZCVHl4blFrRkJaMElzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0QlFVTnVReXhEUVVGRE8wRkJSVVFzVVVGQlVTeERRVUZETEdWQlFXVXNSVUZCUlR0SlFVTjBRaXhKUVVGSkxGTkJRWEZETEVOQlFVTTdTVUZETVVNc1NVRkJTU3hUUVVGelFpeERRVUZETzBsQlJUTkNMRTFCUVUwc1EwRkJRenRSUVVOSUxGTkJRVk1zUjBGQlJ5eEpRVUZKTEN0Q1FVRlhMRU5CUVVNc2EwSkJRVXNzUTBGQlF5eERRVUZETzBsQlEzWkRMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJSVWdzUzBGQlN5eERRVUZETzFGQlEwWXNVMEZCVXl4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRE8wbEJRM2hDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUlVnc1VVRkJVU3hEUVVGRExHOUNRVUZ2UWl4RlFVRkZPMUZCUXpOQ0xGVkJRVlVzUTBGQlF6dFpRVU5RTEZOQlFWTXNSMEZCUnl4UlFVRlJMRVZCUVVVc1EwRkJRenRaUVVOMlFpeFRRVUZUTEVOQlFVTXNTMEZCU3l4RlFVRkZMRU5CUVVNN1dVRkRiRUlzVTBGQlV5eERRVUZETEV0QlFVc3NSVUZCUlN4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFVkJRVVVzUlVGQlJTeERRVUZETEVOQlFVRTdVVUZEY0VNc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeFJRVUZSTEVOQlFVTXNXVUZCV1N4RlFVRkZPMWxCUTI1Q0xFVkJRVVVzUTBGQlF5eHpRMEZCYzBNc1JVRkJSU3hWUVVGVkxFbEJRVWs3WjBKQlEzSkVMRWxCUVVrc1NVRkJTU3hIUVVGdFFpeExRVUZMTEVOQlFVTTdaMEpCUTJwRExGTkJRVk03Y1VKQlEwb3NVVUZCVVN4RFFVRkRMSGRDUVVGVkxFTkJRVU1zVVVGQlVTeEZRVUZGTEdOQlFVMHNUMEZCUVN4SlFVRkpMRWRCUVVjc1VVRkJVU3hGUVVGbUxFTkJRV1VzUTBGQlF5eERRVUZETzNGQ1FVTnlSQ3hKUVVGSkxFTkJRVU03YjBKQlEwWXNZVUZCVFN4RFFVRkRMRmRCUVZjc1EwRkJReXhKUVVGSkxFVkJRVVVzVVVGQlVTeERRVUZETEVOQlFVTTdiMEpCUTI1RExFbEJRVTBzVDBGQlR5eEhRVUZuUWl4VFFVRlRMRU5CUVVNc1ZVRkJWU3hGUVVGRkxFTkJRVU03YjBKQlEzQkVMR0ZCUVUwc1EwRkJReXhsUVVGbExFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTTdORUpCUXpkQ0xFbEJRVWtzUlVGQlJTd3JRa0ZCVVRzMFFrRkRaQ3hKUVVGSkxFVkJRVVVzWTBGQll6dDVRa0ZEZGtJc1EwRkJReXhEUVVGRExFTkJRVU03YjBKQlEwb3NTVUZCU1N4RlFVRkZMRU5CUVVNN1owSkJRMWdzUTBGQlF5eERRVUZETEVOQlFVTXNUMEZCU3l4RFFVRkJMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03V1VGRGRrSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRTQ3hGUVVGRkxFTkJRVU1zZFVOQlFYVkRMRVZCUVVVc1ZVRkJWU3hKUVVGSk8yZENRVU4wUkN4SlFVRkpMRWxCUVVrc1IwRkJiVUlzUzBGQlN5eERRVUZETzJkQ1FVTnFReXhUUVVGVExFTkJRVU1zUzBGQlN5eEZRVUZGTEVOQlFVTTdaMEpCUTJ4Q0xGTkJRVk1zUTBGQlF5eE5RVUZOTEVOQlFVTXNNRUpCUVRCQ0xFTkJRVU1zUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4RlFVRkZMRVZCUVVVc1MwRkJTeXhGUVVGRkxITkNRVUZ6UWl4RlFVRkZMRU5CUVVNc1EwRkJRenRuUWtGRE0wWXNVMEZCVXp0eFFrRkRTaXhSUVVGUkxFTkJRVU1zZDBKQlFWVXNRMEZCUXl4UlFVRlJMRVZCUVVVc1kwRkJUU3hQUVVGQkxFbEJRVWtzUjBGQlJ5eFJRVUZSTEVWQlFXWXNRMEZCWlN4RFFVRkRMRU5CUVVNN2NVSkJRM0pFTEVsQlFVa3NRMEZCUXp0dlFrRkRSaXhoUVVGTkxFTkJRVU1zVjBGQlZ5eERRVUZETEVsQlFVa3NSVUZCUlN4TFFVRkxMRU5CUVVNc1EwRkJRenR2UWtGRGFFTXNTVUZCVFN4UFFVRlBMRWRCUVdkQ0xGTkJRVk1zUTBGQlF5eFZRVUZWTEVWQlFVVXNRMEZCUXp0dlFrRkRjRVFzWVVGQlRTeERRVUZETEdWQlFXVXNRMEZCUXl4UFFVRlBMRVZCUVVVc1EwRkJRenMwUWtGRE4wSXNTVUZCU1N4RlFVRkZMR2REUVVGVE96UkNRVU5tTEVsQlFVa3NSVUZCUlN4elFrRkJjMEk3ZVVKQlF5OUNMRU5CUVVNc1EwRkJReXhEUVVGRE8yOUNRVU5LTEVsQlFVa3NSVUZCUlN4RFFVRkRPMmRDUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVc3NRMEZCUVN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xbEJRM1pDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTFBc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRlNDeFJRVUZSTEVOQlFVTXNZVUZCWVN4RlFVRkZPMWxCUTNCQ0xFVkJRVVVzUTBGQlF5eDFRMEZCZFVNc1JVRkJSU3hWUVVGVkxFbEJRVWs3WjBKQlEzUkVMRWxCUVVrc1MwRkJTeXhIUVVGdFFpeExRVUZMTEVOQlFVTTdaMEpCUTJ4RExGTkJRVk1zUTBGQlF5eExRVUZMTEVWQlFVVXNRMEZCUXp0blFrRkRiRUlzVTBGQlV5eERRVUZETEUxQlFVMHNRMEZCUXl3eVFrRkJNa0lzUTBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRVZCUVVVc1JVRkJSU3hMUVVGTExFVkJRVVVzYzBKQlFYTkNMRVZCUVVVc1EwRkJReXhEUVVGRE8yZENRVU0xUml4VFFVRlRPM0ZDUVVOS0xGRkJRVkVzUTBGQlF5eDVRa0ZCVnl4RFFVRkRMR1ZCUVdVc1JVRkJSU3hqUVVGTkxFOUJRVUVzUzBGQlN5eEhRVUZITEdWQlFXVXNSVUZCZGtJc1EwRkJkVUlzUTBGQlF5eERRVUZETzNGQ1FVTnlSU3hKUVVGSkxFTkJRVU03YjBKQlEwWXNZVUZCVFN4RFFVRkRMRTlCUVU4c1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dHZRa0ZEZEVJc1NVRkJUU3hQUVVGUExFZEJRV2RDTEZOQlFWTXNRMEZCUXl4VlFVRlZMRVZCUVVVc1EwRkJRenR2UWtGRGNFUXNZVUZCVFN4RFFVRkRMR1ZCUVdVc1EwRkJReXhQUVVGUExFVkJRVVVzUTBGQlF6czBRa0ZETjBJc1NVRkJTU3hGUVVGRkxHZERRVUZUT3pSQ1FVTm1MRWxCUVVrc1JVRkJSU3h6UWtGQmMwSTdlVUpCUXk5Q0xFTkJRVU1zUTBGQlF5eERRVUZETzI5Q1FVTktMRWxCUVVrc1JVRkJSU3hEUVVGRE8yZENRVU5ZTEVOQlFVTXNRMEZCUXl4RFFVTkVMRTlCUVVzc1EwRkJRU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFsQlEzSkNMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMGdzUlVGQlJTeERRVUZETEhGRFFVRnhReXhGUVVGRkxGVkJRVk1zU1VGQlNUdG5Ra0ZEYmtRc1NVRkJTU3hMUVVGTExFZEJRVzFDTEV0QlFVc3NRMEZCUXp0blFrRkRiRU1zVTBGQlV6dHhRa0ZEU2l4UlFVRlJMRU5CUVVNc2VVSkJRVmNzUTBGQlF5eGxRVUZsTEVWQlFVVXNZMEZCVFN4UFFVRkJMRXRCUVVzc1IwRkJSeXhsUVVGbExFVkJRWFpDTEVOQlFYVkNMRU5CUVVNc1EwRkJRenR4UWtGRGNrVXNTVUZCU1N4RFFVRkRPMjlDUVVOR0xHRkJRVTBzUTBGQlF5eFhRVUZYTEVOQlFVTXNTMEZCU3l4RlFVRkZMR1ZCUVdVc1EwRkJReXhEUVVGRE8yOUNRVU16UXl4SlFVRk5MRTlCUVU4c1IwRkJaMElzVTBGQlV5eERRVUZETEZWQlFWVXNSVUZCUlN4RFFVRkRPMjlDUVVOd1JDeGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRE96UkNRVU0zUWl4SlFVRkpMRVZCUVVVc0swSkJRVkU3TkVKQlEyUXNTVUZCU1N4RlFVRkZMR1ZCUVdVN2VVSkJRM2hDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMjlDUVVOS0xFbEJRVWtzUlVGQlJTeERRVUZETzJkQ1FVTllMRU5CUVVNc1EwRkJReXhEUVVORUxFOUJRVXNzUTBGQlFTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMWxCUTNKQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExQXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hSUVVGUkxFTkJRVU1zWjBKQlFXZENMRVZCUVVVN1dVRkRka0lzUlVGQlJTeERRVUZETEdsQ1FVRnBRaXhGUVVGRkxGVkJRVk1zU1VGQlNUdG5Ra0ZETDBJc1NVRkJTU3hQUVVGUExFZEJRVmtzUzBGQlN5eERRVUZETzJkQ1FVTTNRaXhUUVVGVExFTkJRVU1zVVVGQlVTeERRVUZETERSQ1FVRmpMRU5CUVVNc1IwRkJSeXhGUVVGRkxFZEJRVWNzUlVGQlJTeGpRVUZOTEU5QlFVRXNUMEZCVHl4SFFVRkhMRWxCUVVrc1JVRkJaQ3hEUVVGakxFTkJRVU1zUTBGQlF6dHhRa0ZETjBRc1NVRkJTU3hEUVVGRE8yOUNRVU5HTEdGQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU03YjBKQlEzWkNMRWxCUVUwc1QwRkJUeXhIUVVGblFpeFRRVUZUTEVOQlFVTXNWVUZCVlN4RlFVRkZMRU5CUVVNN2IwSkJRM0JFTEdGQlFVMHNRMEZCUXl4bFFVRmxMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU03TkVKQlF6ZENMRWxCUVVrc1JVRkJSU3dyUWtGQlVUczBRa0ZEWkN4SlFVRkpMRVZCUVVVc2EwSkJRV3RDTzNsQ1FVTXpRaXhEUVVGRExFTkJRVU1zUTBGQlF6dHZRa0ZEU2l4SlFVRkpMRVZCUVVVc1EwRkJRenRuUWtGRFdDeERRVUZETEVOQlFVTXNRMEZEUkN4UFFVRkxMRU5CUVVFc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFpRVU55UWl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOSUxFVkJRVVVzUTBGQlF5eDFRMEZCZFVNc1JVRkJSU3hWUVVGVExFbEJRVWs3WjBKQlEzSkVMRWxCUVVrc1QwRkJUeXhIUVVGWkxFdEJRVXNzUTBGQlF6dG5Ra0ZETjBJc1UwRkJVeXhEUVVGRExFdEJRVXNzUlVGQlJTeERRVUZETzJkQ1FVTnNRaXhUUVVGVExFTkJRVU1zVFVGQlRTeERRVUZETERoQ1FVRTRRaXhEUVVGRExFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVY3NSVUZCUlN4RlFVRkZMRXRCUVVzc1JVRkJSU3h6UWtGQmMwSXNSVUZCUlN4RFFVRkRMRU5CUVVNN1owSkJReTlHTEZOQlFWTXNRMEZCUXl4UlFVRlJMRU5CUVVNc05FSkJRV01zUTBGQlF5eEhRVUZITEVWQlFVVXNSMEZCUnl4RlFVRkZMR05CUVUwc1QwRkJRU3hQUVVGUExFZEJRVWNzU1VGQlNTeEZRVUZrTEVOQlFXTXNRMEZCUXl4RFFVRkRPM0ZDUVVNM1JDeEpRVUZKTEVOQlFVTTdiMEpCUTBZc1lVRkJUU3hEUVVGRExFOUJRVThzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0dlFrRkRlRUlzU1VGQlRTeFBRVUZQTEVkQlFXZENMRk5CUVZNc1EwRkJReXhWUVVGVkxFVkJRVVVzUTBGQlF6dHZRa0ZEY0VRc1lVRkJUU3hEUVVGRExHVkJRV1VzUTBGQlF5eFBRVUZQTEVWQlFVVXNRMEZCUXpzMFFrRkROMElzU1VGQlNTeEZRVUZGTEdkRFFVRlRPelJDUVVObUxFbEJRVWtzUlVGQlJTeHpRa0ZCYzBJN2VVSkJReTlDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMjlDUVVOS0xFbEJRVWtzUlVGQlJTeERRVUZETzJkQ1FVTllMRU5CUVVNc1EwRkJReXhEUVVORUxFOUJRVXNzUTBGQlFTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMWxCUTNKQ0xFTkJRVU1zUTBGQlF5eERRVUZCTzFGQlEwNHNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hSUVVGUkxFTkJRVU1zV1VGQldTeEZRVUZGTzFsQlEyNUNMRVZCUVVVc1EwRkJReXcwUWtGQk5FSXNSVUZCUlN4VlFVRlRMRWxCUVVrN1owSkJRekZETEZOQlFWTTdjVUpCUTBvc1VVRkJVU3hEUVVGRExIZENRVUZWTEVOQlFVTXNUVUZCVFN4RlFVRkZMR2RDUVVGblFpeEZRVUZGTEUxQlFVMHNRMEZCUXl4RFFVRkRPM0ZDUVVOMFJDeEpRVUZKTEVOQlFVTTdiMEpCUTBZc1NVRkJUU3hQUVVGUExFZEJRV2RDTEZOQlFWTXNRMEZCUXl4VlFVRlZMRVZCUVVVc1EwRkJRenR2UWtGRGNFUXNZVUZCVFN4RFFVRkRMR1ZCUVdVc1EwRkJReXhQUVVGUExFVkJRVVVzUTBGQlF5dzRRa0ZCVHl4RFFVRkRMR3RDUVVGclFpeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMjlDUVVNdlJDeEpRVUZKTEVWQlFVVXNRMEZCUXp0blFrRkRXQ3hEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZMTEVOQlFVRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRaUVVOMlFpeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTklMRVZCUVVVc1EwRkJReXcyUWtGQk5rSXNSVUZCUlN4VlFVRlRMRWxCUVVrN1owSkJRek5ETEZOQlFWTXNRMEZCUXl4TFFVRkxMRVZCUVVVc1EwRkJRenRuUWtGRGJFSXNVMEZCVXl4RFFVRkRMRXRCUVVzc1JVRkJSU3hEUVVGRExFdEJRVXNzUTBGQlF5eEhRVUZITEVWQlFVVXNSVUZCUXl4TFFVRkxMRVZCUVVVc2MwSkJRWE5DTEVWQlFVTXNRMEZCUXl4RFFVRkRPMmRDUVVNNVJDeFRRVUZUTzNGQ1FVTktMRkZCUVZFc1EwRkJReXgzUWtGQlZTeERRVUZETEUxQlFVMHNSVUZCUlN4blFrRkJaMElzUlVGQlJTeE5RVUZOTEVOQlFVTXNRMEZCUXp0eFFrRkRkRVFzU1VGQlNTeERRVUZETzI5Q1FVTkdMRWxCUVUwc1QwRkJUeXhIUVVGblFpeFRRVUZUTEVOQlFVTXNWVUZCVlN4RlFVRkZMRU5CUVVNN2IwSkJRM0JFTEdGQlFVMHNRMEZCUXl4bFFVRmxMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU1zSzBKQlFWRXNRMEZCUXl4elFrRkJjMElzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0dlFrRkRjRVVzU1VGQlNTeEZRVUZGTEVOQlFVTTdaMEpCUTFnc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlN5eERRVUZCTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1dVRkRka0lzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxGRkJRVkVzUTBGQlF5eFZRVUZWTEVWQlFVVTdXVUZEYWtJc1JVRkJSU3hEUVVGRExEUkNRVUUwUWl4RlFVRkZMRlZCUVZNc1NVRkJTVHRuUWtGRE1VTXNVMEZCVXp0eFFrRkRTaXhSUVVGUkxFTkJRVU1zYzBKQlFWRXNRMEZCUXl4dFFrRkJiVUlzUlVGQlJTeE5RVUZOTEVWQlFVVXNaMEpCUVdkQ0xFVkJRVVVzVFVGQlRTeERRVUZETEVOQlFVTTdjVUpCUTNwRkxFbEJRVWtzUTBGQlF6dHZRa0ZEUml4SlFVRk5MRTlCUVU4c1IwRkJaMElzVTBGQlV5eERRVUZETEZWQlFWVXNSVUZCUlN4RFFVRkRPMjlDUVVOd1JDeGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRExEaENRVUZQTEVOQlFVTXNaVUZCWlN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8yOUNRVU0xUkN4SlFVRkpMRVZCUVVVc1EwRkJRenRuUWtGRFdDeERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRkxMRU5CUVVFc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFpRVU4yUWl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOSUxFVkJRVVVzUTBGQlF5dzJRa0ZCTmtJc1JVRkJSU3hWUVVGVExFbEJRVWs3WjBKQlF6TkRMRk5CUVZNc1EwRkJReXhMUVVGTExFVkJRVVVzUTBGQlF6dG5Ra0ZEYkVJc1UwRkJVeXhEUVVGRExFdEJRVXNzUlVGQlJTeERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRVZCUVVVc1JVRkJSU3hMUVVGTExFVkJRVVVzYzBKQlFYTkNMRVZCUVVVc1EwRkJReXhEUVVGRE8yZENRVU5vUlN4VFFVRlRPM0ZDUVVOS0xGRkJRVkVzUTBGQlF5eHpRa0ZCVVN4RFFVRkRMRzFDUVVGdFFpeEZRVUZGTEUxQlFVMHNSVUZCUlN4blFrRkJaMElzUlVGQlJTeE5RVUZOTEVOQlFVTXNRMEZCUXp0eFFrRkRla1VzU1VGQlNTeERRVUZETzI5Q1FVTkdMRWxCUVUwc1QwRkJUeXhIUVVGblFpeFRRVUZUTEVOQlFVTXNWVUZCVlN4RlFVRkZMRU5CUVVNN2IwSkJRM0JFTEdGQlFVMHNRMEZCUXl4bFFVRmxMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU1zSzBKQlFWRXNRMEZCUXl4elFrRkJjMElzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0dlFrRkRjRVVzU1VGQlNTeEZRVUZGTEVOQlFVTTdaMEpCUTFnc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlN5eERRVUZCTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1dVRkRka0lzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxGRkJRVkVzUTBGQlF5eFpRVUZaTEVWQlFVVTdXVUZEYmtJc1JVRkJSU3hEUVVGRExEUkNRVUUwUWl4RlFVRkZMRlZCUVZNc1NVRkJTVHRuUWtGRE1VTXNVMEZCVXp0eFFrRkRTaXhSUVVGUkxFTkJRVU1zZDBKQlFWVXNRMEZCUXl4bFFVRmxMRU5CUVVNc1EwRkJRenR4UWtGRGNrTXNTVUZCU1N4RFFVRkRPMjlDUVVOR0xFbEJRVTBzVDBGQlR5eEhRVUZuUWl4VFFVRlRMRU5CUVVNc1ZVRkJWU3hGUVVGRkxFTkJRVU03YjBKQlEzQkVMR0ZCUVUwc1EwRkJReXhsUVVGbExFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTXNPRUpCUVU4c1EwRkJReXhqUVVGakxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdiMEpCUXpORUxFbEJRVWtzUlVGQlJTeERRVUZETzJkQ1FVTllMRU5CUVVNc1EwRkJReXhEUVVGRExFOUJRVXNzUTBGQlFTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMWxCUTNaQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEwZ3NSVUZCUlN4RFFVRkRMRFpDUVVFMlFpeEZRVUZGTEZWQlFWTXNTVUZCU1R0blFrRkRNME1zVTBGQlV5eERRVUZETEV0QlFVc3NSVUZCUlN4RFFVRkRPMmRDUVVOc1FpeFRRVUZUTEVOQlFVTXNTMEZCU3l4RlFVRkZMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUlVGQlJTeEZRVUZGTEV0QlFVc3NSVUZCUlN4elFrRkJjMElzUlVGQlJTeERRVUZETEVOQlFVTTdaMEpCUTJoRkxGTkJRVk03Y1VKQlEwb3NVVUZCVVN4RFFVRkRMSGRDUVVGVkxFTkJRVU1zWlVGQlpTeERRVUZETEVOQlFVTTdjVUpCUTNKRExFbEJRVWtzUTBGQlF6dHZRa0ZEUml4SlFVRk5MRTlCUVU4c1IwRkJaMElzVTBGQlV5eERRVUZETEZWQlFWVXNSVUZCUlN4RFFVRkRPMjlDUVVOd1JDeGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRExDdENRVUZSTEVOQlFVTXNjMEpCUVhOQ0xFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdiMEpCUTNCRkxFbEJRVWtzUlVGQlJTeERRVUZETzJkQ1FVTllMRU5CUVVNc1EwRkJReXhEUVVGRExFOUJRVXNzUTBGQlFTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMWxCUTNaQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExQXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hSUVVGUkxFTkJRVU1zWVVGQllTeEZRVUZGTzFsQlEzQkNMRVZCUVVVc1EwRkJReXcwUWtGQk5FSXNSVUZCUlN4VlFVRlRMRWxCUVVrN1owSkJRekZETEZOQlFWTTdjVUpCUTBvc1VVRkJVU3hEUVVGRExIbENRVUZYTEVOQlFVTXNaVUZCWlN4RFFVRkRMRU5CUVVNN2NVSkJRM1JETEVsQlFVa3NRMEZCUXp0dlFrRkRSaXhKUVVGTkxFOUJRVThzUjBGQlowSXNVMEZCVXl4RFFVRkRMRlZCUVZVc1JVRkJSU3hEUVVGRE8yOUNRVU53UkN4aFFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExFOUJRVThzUlVGQlJTeERRVUZETERoQ1FVRlBMRU5CUVVNc1pVRkJaU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzI5Q1FVTTFSQ3hKUVVGSkxFVkJRVVVzUTBGQlF6dG5Ra0ZEV0N4RFFVRkRMRU5CUVVNc1EwRkJReXhQUVVGTExFTkJRVUVzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0WlFVTjJRaXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU5JTEVWQlFVVXNRMEZCUXl3MlFrRkJOa0lzUlVGQlJTeFZRVUZUTEVsQlFVazdaMEpCUXpORExGTkJRVk1zUTBGQlF5eExRVUZMTEVWQlFVVXNRMEZCUXp0blFrRkRiRUlzVTBGQlV5eERRVUZETEV0QlFVc3NSVUZCUlN4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFVkJRVVVzUlVGQlJTeExRVUZMTEVWQlFVVXNjMEpCUVhOQ0xFVkJRVVVzUTBGQlF5eERRVUZETzJkQ1FVTm9SU3hUUVVGVE8zRkNRVU5LTEZGQlFWRXNRMEZCUXl4NVFrRkJWeXhEUVVGRExHVkJRV1VzUTBGQlF5eERRVUZETzNGQ1FVTjBReXhKUVVGSkxFTkJRVU03YjBKQlEwWXNTVUZCVFN4UFFVRlBMRWRCUVdkQ0xGTkJRVk1zUTBGQlF5eFZRVUZWTEVWQlFVVXNRMEZCUXp0dlFrRkRjRVFzWVVGQlRTeERRVUZETEdWQlFXVXNRMEZCUXl4UFFVRlBMRVZCUVVVc1EwRkJReXdyUWtGQlVTeERRVUZETEhOQ1FVRnpRaXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzI5Q1FVTndSU3hKUVVGSkxFVkJRVVVzUTBGQlF6dG5Ra0ZEV0N4RFFVRkRMRU5CUVVNc1EwRkJReXhQUVVGTExFTkJRVUVzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0WlFVTjJRaXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5RTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTFBc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFNDeFJRVUZSTEVOQlFVTXNkMEpCUVhkQ0xFVkJRVVU3VVVGREwwSXNWVUZCVlN4RFFVRkRPMWxCUjFBc1UwRkJVeXhIUVVGSExHZENRVUZuUWl4RFFVRkRPMmRDUVVONlFpeFJRVUZSTEVWQlFVVTdiMEpCUTA0c1JVRkJSU3hKUVVGSkxFVkJRVVVzVTBGQlV5eEZRVUZGTEcxQ1FVRnRRaXhGUVVGRkxFdEJRVXNzUlVGQlJTeGxRVUZsTEVWQlFVVXNTVUZCU1N4RlFVRkZMSE5DUVVGelFpeEZRVUZGTEVOQlFVTXNSVUZCUlR0dlFrRkRha2NzUlVGQlJTeEpRVUZKTEVWQlFVVXNkVUpCUVhWQ0xFVkJRVVVzYlVKQlFXMUNMRVZCUVVVc1NVRkJTU3hGUVVGRkxHVkJRV1VzUlVGQlJTeEpRVUZKTEVWQlFVVTdiMEpCUTI1R0xFVkJRVVVzU1VGQlNTeEZRVUZGTEd0Q1FVRnJRaXhGUVVGRkxHMUNRVUZ0UWl4RlFVRkZMRXRCUVVzc1JVRkJSU3hsUVVGbExFVkJRVVVzUzBGQlN5eEZRVUZGTzJsQ1FVTnVSanRoUVVOS0xFTkJRVU1zUTBGQlF6dFpRVU5JTEZOQlFWTXNRMEZCUXl4TFFVRkxMRVZCUVVVc1EwRkJRenRaUVVOc1FpeFRRVUZUTEVOQlFVTXNTMEZCU3l4RlFVRkZMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUlVGQlJTeEZRVUZGTEVOQlFVTXNRMEZCUXp0UlFVTnlReXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl3clJVRkJLMFVzUlVGQlJTeFZRVUZUTEVsQlFVazdXVUZETjBZc1NVRkJTU3hSUVVGUkxFZEJRV3RETzJkQ1FVTXhReXhGUVVGRExFZEJRVWNzUlVGQlJTeEhRVUZITEVWQlFVVXNTVUZCU1N4RlFVRkZMRk5CUVZNc1JVRkJRenRuUWtGRE0wSXNSVUZCUXl4SFFVRkhMRVZCUVVVc1IwRkJSeXhGUVVGRkxFbEJRVWtzUlVGQlJTeFJRVUZSTEVWQlFVTTdaMEpCUXpGQ0xFVkJRVU1zUjBGQlJ5eEZRVUZGTEVkQlFVY3NSVUZCUlN4SlFVRkpMRVZCUVVVc1owSkJRV2RDTEVWQlFVTTdZVUZCUXl4RFFVRkRPMWxCUTNoRExGTkJRVk1zUTBGQlF5eExRVUZMTEVWQlFVVXNRMEZCUXp0WlFVTnNRaXhUUVVGVE8ybENRVU5LTEV0QlFVc3NRMEZCUXl4clFrRkJhMElzUTBGQlF6dHBRa0ZEZWtJc1MwRkJTeXhEUVVGRExFZEJRVWNzUlVGQlJTeEZRVUZETEZGQlFWRXNSVUZCUlN4UlFVRlJMRVZCUVVNc1EwRkJReXhEUVVGRE8xbEJRM1JETEZOQlFWTTdhVUpCUTBvc1VVRkJVU3hEUVVGRExDdENRVUZoTEVWQlFVVXNRMEZCUXp0cFFrRkRla0lzU1VGQlNTeERRVUZETzJkQ1FVTkdMRWxCUVUwc1QwRkJUeXhIUVVGblFpeFRRVUZUTEVOQlFVTXNWVUZCVlN4RlFVRkZMRU5CUVVNN1owSkJRM0JFTEVsQlFVMHNhVUpCUVdsQ0xFZEJRVWNzTmtKQlFWY3NRMEZCUXl4RFFVRkRMRk5CUVZNc1JVRkJSU3hSUVVGUkxFVkJRVVVzWjBKQlFXZENMRU5CUVVNc1EwRkJReXhEUVVGRE8yZENRVU12UlN4aFFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExFOUJRVThzUlVGQlJTeERRVUZETEdsQ1FVRnBRaXhEUVVGRExFTkJRVU1zUTBGQlF6dG5Ra0ZEY2tRc1NVRkJTU3hGUVVGRkxFTkJRVU03V1VGRFdDeERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRkxMRU5CUVVFc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlFUdFJRVU4wUWl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5eG5SVUZCWjBVc1JVRkJSU3hWUVVGVExFbEJRVWs3V1VGRE9VVXNVMEZCVXl4RFFVRkRMRXRCUVVzc1JVRkJSU3hEUVVGRE8xbEJRMnhDTEZOQlFWTTdhVUpCUTBvc1MwRkJTeXhEUVVGRExHdENRVUZyUWl4RFFVRkRPMmxDUVVONlFpeExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1dVRkRhRUlzVTBGQlV6dHBRa0ZEU2l4UlFVRlJMRU5CUVVNc0swSkJRV0VzUlVGQlJTeERRVUZETzJsQ1FVTjZRaXhKUVVGSkxFTkJRVU03WjBKQlEwWXNTVUZCVFN4UFFVRlBMRWRCUVdkQ0xGTkJRVk1zUTBGQlF5eFZRVUZWTEVWQlFVVXNRMEZCUXp0blFrRkRjRVFzU1VGQlRTeFhRVUZYTEVkQlFVY3NLMEpCUVZFc1EwRkJReXg1UkVGQmVVUXNRMEZCUXl4RFFVRkRPMmRDUVVONFJpeGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRExGZEJRVmNzUTBGQlF5eERRVUZETEVOQlFVTTdaMEpCUXk5RExFbEJRVWtzUlVGQlJTeERRVUZETzFsQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNc1QwRkJTeXhEUVVGQkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVRTdVVUZEZEVJc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEZRVUZGTEVOQlFVTXNNa1ZCUVRKRkxFVkJRVVVzVlVGQlV5eEpRVUZKTzFsQlEzcEdMRk5CUVZNN2FVSkJRMG9zVVVGQlVTeERRVUZETEhsRFFVRjFRaXhEUVVGRExHTkJRV01zUTBGQlF5eERRVUZETzJsQ1FVTTNReXhKUVVGSkxFTkJRVU1zVlVGQlF5eEhRVUZYTzJkQ1FVTmtMR0ZCUVUwc1EwRkJReXhYUVVGWExFTkJRVU1zUjBGQlJ5eEZRVUZGTEhGSFFVRnhSeXhEUVVGRExFTkJRVU03WjBKQlF5OUlMRWxCUVUwc1QwRkJUeXhIUVVGblFpeFRRVUZUTEVOQlFVTXNWVUZCVlN4RlFVRkZMRU5CUVVNN1owSkJRM0JFTEVsQlFVMHNWMEZCVnl4SFFVRkhMQ3RDUVVGUkxFTkJRVU1zY1VSQlFYRkVMRU5CUVVNc1EwRkJRenRuUWtGRGNFWXNZVUZCVFN4RFFVRkRMR1ZCUVdVc1EwRkJReXhQUVVGUExFVkJRVVVzUTBGQlF5eFhRVUZYTEVOQlFVTXNRMEZCUXl4RFFVRkRPMmRDUVVNdlF5eEpRVUZKTEVWQlFVVXNRMEZCUXp0WlFVTllMRU5CUVVNc1EwRkJReXhEUVVGRExFOUJRVXNzUTBGQlFTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUXpOQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NSVUZCUlN4RFFVRkRMR2xGUVVGcFJTeEZRVUZGTEZWQlFWTXNTVUZCU1R0WlFVTXZSU3hUUVVGVE8ybENRVU5LTEZGQlFWRXNRMEZCUXl4NVEwRkJkVUlzUTBGQlF5eDFRa0ZCZFVJc1EwRkJReXhEUVVGRE8ybENRVU14UkN4SlFVRkpMRU5CUVVNc1ZVRkJReXhIUVVGWE8yZENRVU5rTEdGQlFVMHNRMEZCUXl4WFFVRlhMRU5CUVVNc1IwRkJSeXhGUVVGRkxIRkhRVUZ4Unl4RFFVRkRMRU5CUVVNN1owSkJReTlJTEVsQlFVMHNUMEZCVHl4SFFVRm5RaXhUUVVGVExFTkJRVU1zVlVGQlZTeEZRVUZGTEVOQlFVTTdaMEpCUTNCRUxFbEJRVTBzVjBGQlZ5eEhRVUZITEN0Q1FVRlJMRU5CUVVNc2NVUkJRWEZFTEVOQlFVTXNRMEZCUXp0blFrRkRjRVlzWVVGQlRTeERRVUZETEdWQlFXVXNRMEZCUXl4UFFVRlBMRVZCUVVVc1EwRkJReXhYUVVGWExFTkJRVU1zUTBGQlF5eERRVUZETzJkQ1FVTXZReXhKUVVGSkxFVkJRVVVzUTBGQlF6dFpRVU5ZTEVOQlFVTXNRMEZCUXl4RFFVRkRMRTlCUVVzc1EwRkJRU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFGQlEzWkNMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzUlVGQlJTeERRVUZETEd0RlFVRnJSU3hGUVVGRkxGVkJRVk1zU1VGQlNUdFpRVU5vUml4VFFVRlRPMmxDUVVOS0xGRkJRVkVzUTBGQlF5eDVRMEZCZFVJc1EwRkJReXhyUWtGQmEwSXNRMEZCUXl4RFFVRkRPMmxDUVVOeVJDeEpRVUZKTEVOQlFVTXNWVUZCUXl4SFFVRlhPMmRDUVVOa0xHRkJRVTBzUTBGQlF5eFhRVUZYTEVOQlFVTXNSMEZCUnl4RlFVRkZMSEZIUVVGeFJ5eERRVUZETEVOQlFVTTdaMEpCUXk5SUxFbEJRVTBzVDBGQlR5eEhRVUZuUWl4VFFVRlRMRU5CUVVNc1ZVRkJWU3hGUVVGRkxFTkJRVU03WjBKQlEzQkVMRWxCUVUwc1YwRkJWeXhIUVVGSExDdENRVUZSTEVOQlFVTXNjVVJCUVhGRUxFTkJRVU1zUTBGQlF6dG5Ra0ZEY0VZc1lVRkJUU3hEUVVGRExHVkJRV1VzUTBGQlF5eFBRVUZQTEVWQlFVVXNRMEZCUXl4WFFVRlhMRU5CUVVNc1EwRkJReXhEUVVGRE8yZENRVU12UXl4SlFVRkpMRVZCUVVVc1EwRkJRenRaUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVc3NRMEZCUVN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRM1pDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1JVRkJSU3hEUVVGRExIRkZRVUZ4UlN4RlFVRkZMRlZCUVZNc1NVRkJTVHRaUVVOdVJpeFRRVUZUTEVOQlFVTXNTMEZCU3l4RlFVRkZMRU5CUVVNN1dVRkRiRUlzVTBGQlV6dHBRa0ZEU2l4TFFVRkxMRVZCUVVVN2FVSkJRMUFzUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMWxCUTJoQ0xFbEJRVWtzVDBGQlR5eEhRVUZYTEZOQlFWTXNRMEZCUXp0WlFVTm9ReXhUUVVGVE8ybENRVU5LTEZGQlFWRXNRMEZCUXl4NVEwRkJkVUlzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0cFFrRkRNVU1zU1VGQlNTeERRVUZETzJkQ1FVTkdMRWxCUVUwc1QwRkJUeXhIUVVGblFpeFRRVUZUTEVOQlFVTXNWVUZCVlN4RlFVRkZMRU5CUVVNN1owSkJRM0JFTEVsQlFVMHNjVUpCUVhGQ0xFZEJRVWNzSzBOQlFUWkNMRU5CUVVNc1QwRkJUeXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzJkQ1FVTXpSU3hKUVVGTkxGZEJRVmNzUjBGQlJ5d3JRa0ZCVVN4RFFVRkRMSEZFUVVGeFJDeERRVUZETEVOQlFVTTdaMEpCUTNCR0xFbEJRVTBzYzBKQlFYTkNMRWRCUVVjc0swTkJRVFpDTEVOQlFVTXNUMEZCVHl4RlFVRkZMRXRCUVVzc1EwRkJReXhEUVVGRE8yZENRVU0zUlN4aFFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExFOUJRVThzUlVGQlJTeERRVUZETEhGQ1FVRnhRaXhGUVVGRkxGZEJRVmNzUlVGQlJTeHpRa0ZCYzBJc1EwRkJReXhEUVVGRExFTkJRVU03WjBKQlF6bEdMRWxCUVVrc1JVRkJSU3hEUVVGRE8xbEJRMWdzUTBGQlF5eERRVUZETEVOQlFVTXNUMEZCU3l4RFFVRkJMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRGRrSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hGUVVGRkxFTkJRVU1zWjBWQlFXZEZMRVZCUVVVc1ZVRkJVeXhKUVVGSk8xbEJRemxGTEZOQlFWTXNRMEZCUXl4TFFVRkxMRVZCUVVVc1EwRkJRenRaUVVOc1FpeFRRVUZUTzJsQ1FVTktMRXRCUVVzc1JVRkJSVHRwUWtGRFVDeExRVUZMTEVOQlFVTXNSMEZCUnl4RlFVRkZMRVZCUVVVc1VVRkJVU3hGUVVGRkxFVkJRVVVzUlVGQlF5eERRVUZETEVOQlFVTTdXVUZEYWtNc1NVRkJTU3hQUVVGUExFZEJRVmNzVTBGQlV5eERRVUZETzFsQlEyaERMRk5CUVZNN2FVSkJRMG9zVVVGQlVTeERRVUZETEhsRFFVRjFRaXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzJsQ1FVTXhReXhKUVVGSkxFTkJRVU03WjBKQlEwWXNTVUZCVFN4UFFVRlBMRWRCUVdkQ0xGTkJRVk1zUTBGQlF5eFZRVUZWTEVWQlFVVXNRMEZCUXp0blFrRkRjRVFzU1VGQlRTeHhRa0ZCY1VJc1IwRkJSeXdyUTBGQk5rSXNRMEZCUXl4UFFVRlBMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU03WjBKQlF6TkZMRWxCUVUwc1owSkJRV2RDTEVkQlFVY3NNa05CUVhsQ0xFTkJRVU1zVDBGQlR5eEZRVUZGTEV0QlFVc3NRMEZCUXl4RFFVRkRPMmRDUVVOdVJTeEpRVUZOTEhOQ1FVRnpRaXhIUVVGSExDdERRVUUyUWl4RFFVRkRMRTlCUVU4c1JVRkJSU3hMUVVGTExFTkJRVU1zUTBGQlF6dG5Ra0ZETjBVc1lVRkJUU3hEUVVGRExHVkJRV1VzUTBGQlF5eFBRVUZQTEVWQlFVVXNRMEZCUXl4eFFrRkJjVUlzUlVGQlJTeG5Ra0ZCWjBJc1JVRkJSU3h6UWtGQmMwSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1owSkJRMjVITEVsQlFVa3NSVUZCUlN4RFFVRkRPMWxCUTFnc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlN5eERRVUZCTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRka0lzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4RlFVRkZMRU5CUVVNc1owcEJRV2RLTEVWQlFVVXNWVUZCVXl4SlFVRkpPMWxCUXpsS0xFbEJRVWtzVDBGQlR5eEhRVUZYTEZOQlFWTXNRMEZCUXp0WlFVTm9ReXhKUVVGSkxGRkJRVkVzUjBGQll5eERRVUZETzI5Q1FVTjJRaXhKUVVGSkxFVkJRVVVzUzBGQlN6dHZRa0ZEV0N4UFFVRlBMRVZCUVVVc1NVRkJTU3hEUVVGRExFZEJRVWNzUlVGQlJTeERRVUZETEZGQlFWRXNSVUZCUlR0dlFrRkRPVUlzVTBGQlV5eEZRVUZGTEdWQlFXVTdiMEpCUXpGQ0xFZEJRVWNzUlVGQlJTeEhRVUZITzJsQ1FVTllMRVZCUVVVN2IwSkJRME1zU1VGQlNTeEZRVUZGTEV0QlFVczdiMEpCUTFnc1QwRkJUeXhGUVVGRkxFbEJRVWtzUTBGQlF5eEhRVUZITEVWQlFVVXNRMEZCUXl4UlFVRlJMRVZCUVVVN2IwSkJRemxDTEZOQlFWTXNSVUZCUlN4bFFVRmxPMjlDUVVNeFFpeEhRVUZITEVWQlFVVXNSMEZCUnp0cFFrRkRXQ3hEUVVGRExFTkJRVU03V1VGRFNDeFRRVUZUTEVOQlFVTXNTMEZCU3l4RlFVRkZMRU5CUVVNN1dVRkRiRUlzVTBGQlV6dHBRa0ZEU2l4TFFVRkxMRVZCUVVVN2FVSkJRMUFzUzBGQlN5eERRVUZETEVkQlFVY3NSVUZCUlN4RlFVRkZMRkZCUVZFc1JVRkJSU3hSUVVGUkxFVkJRVU1zUTBGQlF5eERRVUZETzFsQlEzWkRMRk5CUVZNN2FVSkJRMG9zVVVGQlVTeERRVUZETEhsRFFVRjFRaXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzJsQ1FVTXhReXhKUVVGSkxFTkJRVU03WjBKQlEwWXNTVUZCVFN4UFFVRlBMRWRCUVdkQ0xGTkJRVk1zUTBGQlF5eFZRVUZWTEVWQlFVVXNRMEZCUXp0blFrRkRjRVFzU1VGQlRTeHhRa0ZCY1VJc1IwRkJSeXdyUTBGQk5rSXNRMEZCUXl4UFFVRlBMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU03WjBKQlF6TkZMRWxCUVUwc2NVSkJRWEZDTEVkQlFVY3NkMFJCUVhORExFTkJRVU1zVDBGQlR5eEZRVUZGTEZGQlFWRXNRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJRenRuUWtGREwwWXNTVUZCVFN4cFFrRkJhVUlzUjBGQlJ5dzJRMEZCTWtJc1EwRkJReXhQUVVGUExFVkJRVVVzVVVGQlVTeERRVUZETEVOQlFVTTdaMEpCUTNwRkxFbEJRVTBzYzBKQlFYTkNMRWRCUVVjc0swTkJRVFpDTEVOQlFVTXNUMEZCVHl4RlFVRkZMRXRCUVVzc1EwRkJReXhEUVVGRE8yZENRVU0zUlN4aFFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExFOUJRVThzUlVGQlJUdHZRa0ZETlVJc2NVSkJRWEZDTzI5Q1FVTnlRaXh4UWtGQmNVSTdiMEpCUTNKQ0xHbENRVUZwUWp0dlFrRkRha0lzYzBKQlFYTkNPMmxDUVVGRExFTkJRVU1zUTBGQlF6dG5Ra0ZETjBJc1NVRkJTU3hGUVVGRkxFTkJRVU03V1VGRFdDeERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRkxMRU5CUVVFc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU4yUWl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5eDFSRUZCZFVRc1JVRkJSU3hWUVVGVExFbEJRVWs3V1VGRGNrVXNTVUZCU1N4UlFVRlJMRWRCUVc5RE8yZENRVU0xUXl4RlFVRkZMRWRCUVVjc1JVRkJSU3hIUVVGSExFVkJRVVVzU1VGQlNTeEZRVUZGTEZOQlFWTXNSVUZCUlR0blFrRkROMElzUlVGQlJTeEhRVUZITEVWQlFVVXNSMEZCUnl4RlFVRkZMRWxCUVVrc1JVRkJSU3hSUVVGUkxFVkJRVVU3WjBKQlF6VkNMRVZCUVVVc1IwRkJSeXhGUVVGRkxFZEJRVWNzUlVGQlJTeEpRVUZKTEVWQlFVVXNaMEpCUVdkQ0xFVkJRVVU3WVVGQlF5eERRVUZETzFsQlF6RkRMRk5CUVZNc1EwRkJReXhMUVVGTExFVkJRVVVzUTBGQlF6dFpRVU5zUWl4VFFVRlRPMmxDUVVOS0xFdEJRVXNzUTBGQlF5eHJRa0ZCYTBJc1EwRkJRenRwUWtGRGVrSXNTMEZCU3l4RFFVRkRMRWRCUVVjc1JVRkJSU3hGUVVGRkxGRkJRVkVzUlVGQlJTeFJRVUZSTEVWQlFVVXNRMEZCUXl4RFFVRkRPMWxCUTNoRExGTkJRVk03YVVKQlEwb3NTMEZCU3l4RlFVRkZPMmxDUVVOUUxFdEJRVXNzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0WlFVTm9RaXhUUVVGVE8ybENRVU5LTEZGQlFWRXNRMEZCUXl3clFrRkJZU3hEUVVGRExGTkJRVk1zUTBGQlF5eERRVUZETzJsQ1FVTnNReXhKUVVGSkxFTkJRVU03WjBKQlEwWXNTVUZCVFN4UFFVRlBMRWRCUVdkQ0xGTkJRVk1zUTBGQlF5eFZRVUZWTEVWQlFVVXNRMEZCUXp0blFrRkRjRVFzU1VGQlRTeGhRVUZoTEVkQlFVY3NPRUpCUVU4c1EwRkJReXhwUWtGQmFVSXNRMEZCUXl4RFFVRkRPMmRDUVVOcVJDeEpRVUZOTEdsQ1FVRnBRaXhIUVVGSExEWkNRVUZYTEVOQlFVTXNRMEZCUXl4VFFVRlRMRVZCUVVVc1VVRkJVU3hGUVVGRkxHZENRVUZuUWl4RFFVRkRMRU5CUVVNc1EwRkJRenRuUWtGREwwVXNZVUZCVFN4RFFVRkRMR1ZCUVdVc1EwRkJReXhQUVVGUExFVkJRVVVzUTBGQlF5eGhRVUZoTEVWQlFVVXNhVUpCUVdsQ0xFTkJRVU1zUTBGQlF5eERRVUZETzJkQ1FVTndSU3hKUVVGSkxFVkJRVVVzUTBGQlF6dFpRVU5ZTEVOQlFVTXNRMEZCUXl4RFFVRkRMRTlCUVVzc1EwRkJRU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFGQlEzWkNMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzUlVGQlJTeERRVUZETERoRVFVRTRSQ3hGUVVGRkxGVkJRVk1zU1VGQlNUdFpRVU0xUlN4VFFVRlRMRU5CUVVNc1MwRkJTeXhGUVVGRkxFTkJRVU03V1VGRGJFSXNVMEZCVXp0cFFrRkRTaXhMUVVGTExFVkJRVVU3YVVKQlExQXNTMEZCU3l4RFFVRkRMRWRCUVVjc1JVRkJSU3hGUVVGRExFdEJRVXNzUlVGQlJTeHpRa0ZCYzBJc1JVRkJReXhEUVVGRExFTkJRVU03V1VGRGFrUXNVMEZCVXp0cFFrRkRTaXhSUVVGUkxFTkJRVU1zSzBKQlFXRXNRMEZCUXl4VFFVRlRMRU5CUVVNc1EwRkJRenRwUWtGRGJFTXNTVUZCU1N4RFFVRkRPMmRDUVVOR0xFbEJRVTBzVDBGQlR5eEhRVUZuUWl4VFFVRlRMRU5CUVVNc1ZVRkJWU3hGUVVGRkxFTkJRVU03WjBKQlEzQkVMRWxCUVUwc1kwRkJZeXhIUVVGSExDdENRVUZSTEVOQlFVTXNjMEpCUVhOQ0xFTkJRVU1zUTBGQlF6dG5Ra0ZEZUVRc1lVRkJUU3hEUVVGRExHVkJRV1VzUTBGQlF5eFBRVUZQTEVWQlFVVXNRMEZCUXl4alFVRmpMRU5CUVVNc1EwRkJReXhEUVVGRE8yZENRVU5zUkN4SlFVRkpMRVZCUVVVc1EwRkJRenRaUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVc3NRMEZCUVN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRM1pDTEVOQlFVTXNRMEZCUXl4RFFVRkJPMUZCUTBZc1JVRkJSU3hEUVVGRExEaERRVUU0UXl4RlFVRkZMRlZCUVZNc1NVRkJTVHRaUVVNMVJDeEpRVUZKTEZGQlFWRXNSMEZCYjBNN1owSkJRelZETEVWQlFVVXNSMEZCUnl4RlFVRkZMRWRCUVVjc1JVRkJSU3hKUVVGSkxFVkJRVVVzVTBGQlV5eEZRVUZGTzJkQ1FVTTNRaXhGUVVGRkxFZEJRVWNzUlVGQlJTeEhRVUZITEVWQlFVVXNTVUZCU1N4RlFVRkZMRkZCUVZFc1JVRkJSVHRuUWtGRE5VSXNSVUZCUlN4SFFVRkhMRVZCUVVVc1IwRkJSeXhGUVVGRkxFbEJRVWtzUlVGQlJTeG5Ra0ZCWjBJc1JVRkJSVHRoUVVGRExFTkJRVU03V1VGRE1VTXNVMEZCVXl4RFFVRkRMRXRCUVVzc1JVRkJSU3hEUVVGRE8xbEJRMnhDTEZOQlFWTTdhVUpCUTBvc1MwRkJTeXhEUVVGRExHdENRVUZyUWl4RFFVRkRPMmxDUVVONlFpeExRVUZMTEVOQlFVTXNSMEZCUnl4RlFVRkZMRVZCUVVVc1VVRkJVU3hGUVVGRkxGRkJRVkVzUlVGQlJTeERRVUZETEVOQlFVTTdXVUZEZUVNc1UwRkJVenRwUWtGRFNpeE5RVUZOTEVWQlFVVTdhVUpCUTFJc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzFsQlEyaENMRk5CUVZNN2FVSkJRMG9zVVVGQlVTeERRVUZETERSQ1FVRlZMRU5CUVVNc1lVRkJZU3hEUVVGRExFTkJRVU03YVVKQlEyNURMRWxCUVVrc1EwRkJRenRuUWtGRFJpeEpRVUZOTEU5QlFVOHNSMEZCWjBJc1UwRkJVeXhEUVVGRExGVkJRVlVzUlVGQlJTeERRVUZETzJkQ1FVTndSQ3hKUVVGTkxHRkJRV0VzUjBGQlJ5dzRRa0ZCVHl4RFFVRkRMR2xDUVVGcFFpeERRVUZETEVOQlFVTTdaMEpCUTJwRUxFbEJRVTBzYVVKQlFXbENMRWRCUVVjc05rSkJRVmNzUTBGQlF5eERRVUZETEZOQlFWTXNSVUZCUlN4UlFVRlJMRVZCUVVVc1owSkJRV2RDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMmRDUVVNdlJTeGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRExHRkJRV0VzUlVGQlJTeHBRa0ZCYVVJc1EwRkJReXhEUVVGRExFTkJRVU03WjBKQlEzQkZMRWxCUVVrc1JVRkJSU3hEUVVGRE8xbEJRMWdzUTBGQlF5eERRVUZETEVOQlFVTXNUMEZCU3l4RFFVRkJMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRGRrSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hGUVVGRkxFTkJRVU1zYjBWQlFXOUZMRVZCUVVVc1ZVRkJVeXhKUVVGSk8xbEJRMnhHTEZOQlFWTXNRMEZCUXl4TFFVRkxMRVZCUVVVc1EwRkJRenRaUVVOc1FpeFRRVUZUTzJsQ1FVTktMRXRCUVVzc1JVRkJSVHRwUWtGRFVDeExRVUZMTEVOQlFVTXNSMEZCUnl4RlFVRkZMRVZCUVVNc1MwRkJTeXhGUVVGRkxITkNRVUZ6UWl4RlFVRkRMRU5CUVVNc1EwRkJRenRaUVVOcVJDeFRRVUZUTzJsQ1FVTktMRkZCUVZFc1EwRkJReXcwUWtGQlZTeERRVUZETEdGQlFXRXNRMEZCUXl4RFFVRkRPMmxDUVVOdVF5eEpRVUZKTEVOQlFVTTdaMEpCUTBZc1NVRkJUU3hQUVVGUExFZEJRV2RDTEZOQlFWTXNRMEZCUXl4VlFVRlZMRVZCUVVVc1EwRkJRenRuUWtGRGNFUXNTVUZCVFN4alFVRmpMRWRCUVVjc0swSkJRVkVzUTBGQlF5eHpRa0ZCYzBJc1EwRkJReXhEUVVGRE8yZENRVU40UkN4aFFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExFOUJRVThzUlVGQlJTeERRVUZETEdOQlFXTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1owSkJRMnhFTEVsQlFVa3NSVUZCUlN4RFFVRkRPMWxCUTFnc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlN5eERRVUZCTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRka0lzUTBGQlF5eERRVUZETEVOQlFVRTdTVUZEVGl4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOSUxGRkJRVkVzUTBGQlF5eHpRa0ZCYzBJc1JVRkJSVHRSUVVNM1FpeFZRVUZWTEVOQlFVTTdXVUZEVUN4VFFVRlRMRWRCUVVjc1VVRkJVU3hGUVVGRkxFTkJRVU03VVVGRE0wSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hGUVVGRkxFTkJRVU1zZDBOQlFYZERMRVZCUVVVN1dVRkRla01zVTBGQlV5eERRVUZETEZGQlFWRXNRMEZCUXl4dlFrRkJkVUlzUlVGQlJTeERRVUZETEVOQlFVTTdXVUZET1VNc1NVRkJUU3hQUVVGUExFZEJRV2RDTEZOQlFWTXNRMEZCUXl4VlFVRlZMRVZCUVVVc1EwRkJRenRaUVVOd1JDeGhRVUZOTEVOQlFVTXNWMEZCVnl4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEpRVUZKTEVWQlFVVXNPRUpCUVdNc1EwRkJReXhEUVVGRE8xbEJSWEJFTEU5QlFVOHNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlJTeERRVUZETEV0QlFVc3NSVUZCUlN4RFFVRkRPMUZCUXk5Q0xFTkJRVU1zUTBGQlF5eERRVUZETzBsQlExQXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRTQ3hSUVVGUkxFTkJRVU1zTUVKQlFUQkNMRVZCUVVVN1VVRkRha01zVlVGQlZTeERRVUZETzFsQlExQXNVMEZCVXl4SFFVRkhMRkZCUVZFc1JVRkJSU3hEUVVGRE8xRkJRek5DTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1JVRkJSU3hEUVVGRExDdERRVUVyUXl4RlFVRkZMRlZCUVZNc1NVRkJTVHRaUVVNM1JDeEpRVUZKTEdGQlFXRXNSMEZCUnl4RFFVRkRPMjlDUVVOcVFpeExRVUZMTEVWQlFVVXNaVUZCWlR0dlFrRkRkRUlzU1VGQlNTeEZRVUZGTEU5QlFVODdiMEpCUTJJc1NVRkJTU3hGUVVGRkxFMUJRVTA3YVVKQlEyWXNSVUZCUlR0dlFrRkRReXhMUVVGTExFVkJRVVVzWjBKQlFXZENPMjlDUVVOMlFpeEpRVUZKTEVWQlFVVXNVMEZCVXp0dlFrRkRaaXhKUVVGSkxFVkJRVVVzVFVGQlRUdHBRa0ZEWml4RFFVRkRMRU5CUVVNN1dVRkRTQ3hKUVVGSkxFdEJRVXNzUjBGQmJVSXNSVUZCUlN4RFFVRkRPMWxCUXk5Q0xHRkJRV0VzUTBGQlF5eFBRVUZQTEVOQlFVTXNWVUZCUXl4RFFVRkRPMmRDUVVOd1FpeExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSE8yOUNRVU5pTEVsQlFVa3NSVUZCUlN4RFFVRkRMRU5CUVVNc1NVRkJTVHR2UWtGRFdpeEpRVUZKTEVWQlFVVXNRMEZCUXl4RFFVRkRMRWxCUVVrN2FVSkJRMllzUTBGQlF6dFpRVU5PTEVOQlFVTXNRMEZCUXl4RFFVRkJPMWxCUTBZc1UwRkJVeXhEUVVGRExFdEJRVXNzUlVGQlJTeERRVUZETzFsQlEyeENMRk5CUVZNc1EwRkJReXhMUVVGTExFVkJRVVVzUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4RlFVRkZMRVZCUVVVc1MwRkJTeXhGUVVGRkxHRkJRV0VzUlVGQlF5eERRVUZETEVOQlFVTTdXVUZEZEVRc1UwRkJVenRwUWtGRFNpeFJRVUZSTEVOQlFVTXNaME5CUVdFc1JVRkJSU3hEUVVGRE8ybENRVU42UWl4SlFVRkpMRU5CUVVNN1owSkJRMFlzU1VGQlRTeFBRVUZQTEVkQlFXZENMRk5CUVZNc1EwRkJReXhWUVVGVkxFVkJRVVVzUTBGQlF6dG5Ra0ZEY0VRc1NVRkJUU3hwUWtGQmFVSXNSMEZCUnl3NFFrRkJWeXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETzJkQ1FVTTNReXhoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRMR2xDUVVGcFFpeERRVUZETEVOQlFVTXNRMEZCUXp0blFrRkRja1FzU1VGQlNTeEZRVUZGTEVOQlFVTTdXVUZEV0N4RFFVRkRMRU5CUVVNc1EwRkJReXhQUVVGTExFTkJRVUVzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTjJRaXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl3eVJFRkJNa1FzUlVGQlJTeFZRVUZUTEVsQlFVazdXVUZEZWtVc1UwRkJVeXhEUVVGRExFdEJRVXNzUlVGQlJTeERRVUZETzFsQlEyeENMRk5CUVZNc1EwRkJReXhMUVVGTExFVkJRVVVzUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1dVRkROMElzVTBGQlV6dHBRa0ZEU2l4UlFVRlJMRU5CUVVNc1owTkJRV0VzUlVGQlJTeERRVUZETzJsQ1FVTjZRaXhKUVVGSkxFTkJRVU03WjBKQlEwWXNTVUZCVFN4UFFVRlBMRWRCUVdkQ0xGTkJRVk1zUTBGQlF5eFZRVUZWTEVWQlFVVXNRMEZCUXp0blFrRkRjRVFzU1VGQlRTeGpRVUZqTEVkQlFVY3NLMEpCUVZFc1EwRkJReXd5UWtGQk1rSXNRMEZCUXl4RFFVRkRPMmRDUVVNM1JDeGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRExHTkJRV01zUTBGQlF5eERRVUZETEVOQlFVTTdaMEpCUTJ4RUxFbEJRVWtzUlVGQlJTeERRVUZETzFsQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNc1QwRkJTeXhEUVVGQkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdVVUZEZGtJc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFVDeERRVUZETEVOQlFVTXNRMEZCUXp0QlFVTlFMRU5CUVVNc1EwRkJReXhEUVVGQkluMD0iLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgY2hhaV8xID0gcmVxdWlyZShcImNoYWlcIik7XG5yZXF1aXJlKFwibW9jaGFcIik7XG52YXIgc29ja2V0aW9jbGllbnQgPSByZXF1aXJlKFwic29ja2V0LmlvLWNsaWVudFwiKTtcbnZhciBzdG9yZV8xID0gcmVxdWlyZShcIi4uLy4uL3NyYy93ZWIvc3RvcmVcIik7XG52YXIgcmVkdXhfMSA9IHJlcXVpcmUoXCJyZWR1eFwiKTtcbnZhciB1c2VyQWN0aW9uc18xID0gcmVxdWlyZShcIi4uLy4uL3NyYy93ZWIvYWN0aW9ucy91c2VyQWN0aW9uc1wiKTtcbnZhciBjaGFubmVsc0FjdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvd2ViL2FjdGlvbnMvY2hhbm5lbHNBY3Rpb25zXCIpO1xudmFyIG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL3dlYi9hY3Rpb25zL25vdGlmaWNhdGlvbnNBY3Rpb25zXCIpO1xudmFyIHNpZGViYXJBY3Rpb25zXzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL3dlYi9hY3Rpb25zL3NpZGViYXJBY3Rpb25zXCIpO1xudmFyIHNvY2tldEFjdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvd2ViL2FjdGlvbnMvc29ja2V0QWN0aW9uc1wiKTtcbnZhciBjaGF0VXNlcnNBY3Rpb25zXzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL3dlYi9hY3Rpb25zL2NoYXRVc2Vyc0FjdGlvbnNcIik7XG5mdW5jdGlvbiBnZXRTdG9yZSgpIHtcbiAgICByZXR1cm4gcmVkdXhfMS5jcmVhdGVTdG9yZShzdG9yZV8xLnJvb3RSZWR1Y2VyLCBzdG9yZV8xLm1pZGRsZXdhcmUpO1xufVxuZGVzY3JpYmUoJ1N0b3JlIGFuZCBTeW5jaHJvbm91cyBBY3Rpb25zJywgZnVuY3Rpb24gKCkge1xuICAgIGRlc2NyaWJlKCdVc2VyIFN0YXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc3RvcmU7XG4gICAgICAgIHZhciB1c2VyO1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlID0gZ2V0U3RvcmUoKTtcbiAgICAgICAgICAgIHVzZXIgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBzdG9yZS5nZXRTdGF0ZSgpLnVzZXI7IH07XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIG5vdCBiZSBhdXRob3JpemVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKHVzZXIoKS5hdXRob3JpemVkKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNGYWxzZSh1c2VyKCkuZW1haWwpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKHVzZXIoKS5uYW1lKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNGYWxzZSh1c2VyKCkucm9sZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGJlIGF1dGhvcml6ZWQgYWZ0ZXIgc2V0QXV0aG9yaXplZCBhY3Rpb24nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2UodXNlcigpLmF1dGhvcml6ZWQpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2godXNlckFjdGlvbnNfMS5zZXRBdXRob3JpemVkKHRydWUpKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNUcnVlKHVzZXIoKS5hdXRob3JpemVkKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHVzZXJBY3Rpb25zXzEuc2V0QXV0aG9yaXplZChmYWxzZSkpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKHVzZXIoKS5hdXRob3JpemVkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgaGF2ZSB1c2VyIGRhdGEgYWZ0ZXIgc2V0dGluZyB0aGUgdXNlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNGYWxzZSh1c2VyKCkuYXV0aG9yaXplZCk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2UodXNlcigpLmVtYWlsKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNGYWxzZSh1c2VyKCkubmFtZSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2UodXNlcigpLnJvbGUpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2godXNlckFjdGlvbnNfMS5zZXRVc2VyKHtcbiAgICAgICAgICAgICAgICBhdXRob3JpemVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgbmFtZTogJ0phbmUgRG9lJyxcbiAgICAgICAgICAgICAgICByb2xlOiAnYWRtaW4nXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzVHJ1ZSh1c2VyKCkuYXV0aG9yaXplZCk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKHVzZXIoKS5lbWFpbCwgJ3Rlc3RAdGVzdC5jb20nKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwodXNlcigpLm5hbWUsICdKYW5lIERvZScpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbCh1c2VyKCkucm9sZSwgJ2FkbWluJyk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh1c2VyQWN0aW9uc18xLnNldFVzZXIoe1xuICAgICAgICAgICAgICAgIGF1dGhvcml6ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVtYWlsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBuYW1lOiBmYWxzZSxcbiAgICAgICAgICAgICAgICByb2xlOiBmYWxzZVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKHVzZXIoKS5hdXRob3JpemVkKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNGYWxzZSh1c2VyKCkuZW1haWwpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKHVzZXIoKS5uYW1lKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNGYWxzZSh1c2VyKCkucm9sZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIG5vdCBoYXZlIHVzZXIgZGF0YSBhZnRlciBsb2dnaW5nIG91dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHVzZXJBY3Rpb25zXzEuc2V0VXNlcih7XG4gICAgICAgICAgICAgICAgYXV0aG9yaXplZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdKYW5lIERvZScsXG4gICAgICAgICAgICAgICAgcm9sZTogJ2FkbWluJ1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2godXNlckFjdGlvbnNfMS5sb2dvdXRVc2VyKCkpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2godXNlckFjdGlvbnNfMS5zZXRVc2VyKHtcbiAgICAgICAgICAgICAgICBhdXRob3JpemVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlbWFpbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbmFtZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgcm9sZTogZmFsc2VcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ0NoYW5uZWxzIFN0YXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc3RvcmU7XG4gICAgICAgIHZhciBjaGFubmVscztcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdG9yZSA9IGdldFN0b3JlKCk7XG4gICAgICAgICAgICBjaGFubmVscyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN0b3JlLmdldFN0YXRlKCkuY2hhbm5lbHM7IH07XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGFkZCBjaGFubmVscyBmcm9tIGFuIGFycmF5IG9mIGNoYW5uZWwgbmFtZXMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5hZGRDaGFubmVscyhbJ2dlbmVyYWwnLCAncmFuZG9tJywgJ3NvbWV0aGluZyBlbHNlJ10pKTtcbiAgICAgICAgICAgIHZhciBjMCA9IGNoYW5uZWxzKClbMF07XG4gICAgICAgICAgICB2YXIgYzEgPSBjaGFubmVscygpWzFdO1xuICAgICAgICAgICAgdmFyIGMyID0gY2hhbm5lbHMoKVsyXTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGMwLCB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2dlbmVyYWwnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBbXSxcbiAgICAgICAgICAgICAgICByZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0OiAwLFxuICAgICAgICAgICAgICAgIGhhc01vcmVNZXNzYWdlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBmZXRjaGluZ05ld01lc3NhZ2VzOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYzEsIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAncmFuZG9tJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlczogW10sXG4gICAgICAgICAgICAgICAgcmV0cmlldmVNZXNzYWdlc09mZnNldDogMCxcbiAgICAgICAgICAgICAgICBoYXNNb3JlTWVzc2FnZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgZmV0Y2hpbmdOZXdNZXNzYWdlczogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGMyLCB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ3NvbWV0aGluZyBlbHNlJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlczogW10sXG4gICAgICAgICAgICAgICAgcmV0cmlldmVNZXNzYWdlc09mZnNldDogMCxcbiAgICAgICAgICAgICAgICBoYXNNb3JlTWVzc2FnZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgZmV0Y2hpbmdOZXdNZXNzYWdlczogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgdXBkYXRlIGZldGNoaW5nTmV3TWVzc2FnZXMgYWZ0ZXIgY2FsbGluZyBzZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcyBhY3Rpb24nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5hZGRDaGFubmVscyhbJ2dlbmVyYWwnLCAncmFuZG9tJywgJ3NvbWV0aGluZyBlbHNlJ10pKTtcbiAgICAgICAgICAgIGNoYW5uZWxzKCkuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNGYWxzZShjLmZldGNoaW5nTmV3TWVzc2FnZXMpO1xuICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLnNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzKGMubmFtZSwgdHJ1ZSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjaGFubmVscygpLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzVHJ1ZShjLmZldGNoaW5nTmV3TWVzc2FnZXMpO1xuICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLnNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzKGMubmFtZSwgZmFsc2UpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY2hhbm5lbHMoKS5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKGMuZmV0Y2hpbmdOZXdNZXNzYWdlcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgaW5jcmVtZW50IHRoZSBjaGFubmVsIG9mZnNldCBmb3IgcmV0cmlldmluZyBuZXcgbWVzc2FnZXMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5hZGRDaGFubmVscyhbJ2dlbmVyYWwnLCAncmFuZG9tJywgJ3NvbWV0aGluZyBlbHNlJ10pKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwoY2hhbm5lbHMoKS5maW5kKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLm5hbWUgPT09ICdnZW5lcmFsJzsgfSkucmV0cmlldmVNZXNzYWdlc09mZnNldCwgMCk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKGNoYW5uZWxzKCkuZmluZChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5uYW1lID09PSAncmFuZG9tJzsgfSkucmV0cmlldmVNZXNzYWdlc09mZnNldCwgMCk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKGNoYW5uZWxzKCkuZmluZChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5uYW1lID09PSAnc29tZXRoaW5nIGVsc2UnOyB9KS5yZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0LCAwKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmluY3JlbWVudENoYW5uZWxSZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0KCdnZW5lcmFsJywgMjApKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwoY2hhbm5lbHMoKS5maW5kKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLm5hbWUgPT09ICdnZW5lcmFsJzsgfSkucmV0cmlldmVNZXNzYWdlc09mZnNldCwgMjApO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuaW5jcmVtZW50Q2hhbm5lbFJldHJpZXZlTWVzc2FnZXNPZmZzZXQoJ2dlbmVyYWwnLCAxKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKGNoYW5uZWxzKCkuZmluZChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5uYW1lID09PSAnZ2VuZXJhbCc7IH0pLnJldHJpZXZlTWVzc2FnZXNPZmZzZXQsIDIxKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmluY3JlbWVudENoYW5uZWxSZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0KCdyYW5kb20nLCAxKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKGNoYW5uZWxzKCkuZmluZChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5uYW1lID09PSAncmFuZG9tJzsgfSkucmV0cmlldmVNZXNzYWdlc09mZnNldCwgMSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5pbmNyZW1lbnRDaGFubmVsUmV0cmlldmVNZXNzYWdlc09mZnNldCgnc29tZXRoaW5nIGVsc2UnLCAxKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKGNoYW5uZWxzKCkuZmluZChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5uYW1lID09PSAnc29tZXRoaW5nIGVsc2UnOyB9KS5yZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0LCAxKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgdXBkYXRlIHRoZSBoYXNNb3JlTWVzc2FnZXMgcHJvcGVydHkgb24gYSBjaGFubmVsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuYWRkQ2hhbm5lbHMoWydnZW5lcmFsJywgJ3JhbmRvbScsICdzb21ldGhpbmcgZWxzZSddKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzVHJ1ZShjaGFubmVscygpLmZpbmQoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUubmFtZSA9PT0gJ2dlbmVyYWwnOyB9KS5oYXNNb3JlTWVzc2FnZXMpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc1RydWUoY2hhbm5lbHMoKS5maW5kKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLm5hbWUgPT09ICdyYW5kb20nOyB9KS5oYXNNb3JlTWVzc2FnZXMpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc1RydWUoY2hhbm5lbHMoKS5maW5kKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLm5hbWUgPT09ICdzb21ldGhpbmcgZWxzZSc7IH0pLmhhc01vcmVNZXNzYWdlcyk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5zZXRDaGFubmVsSGFzTW9yZU1lc3NhZ2VzKCdnZW5lcmFsJywgZmFsc2UpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLnNldENoYW5uZWxIYXNNb3JlTWVzc2FnZXMoJ3JhbmRvbScsIGZhbHNlKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5zZXRDaGFubmVsSGFzTW9yZU1lc3NhZ2VzKCdzb21ldGhpbmcgZWxzZScsIGZhbHNlKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2UoY2hhbm5lbHMoKS5maW5kKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLm5hbWUgPT09ICdnZW5lcmFsJzsgfSkuaGFzTW9yZU1lc3NhZ2VzKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNGYWxzZShjaGFubmVscygpLmZpbmQoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUubmFtZSA9PT0gJ3JhbmRvbSc7IH0pLmhhc01vcmVNZXNzYWdlcyk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2UoY2hhbm5lbHMoKS5maW5kKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLm5hbWUgPT09ICdzb21ldGhpbmcgZWxzZSc7IH0pLmhhc01vcmVNZXNzYWdlcyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGFkZCBhIHJlY2VpdmVkIG1lc3NhZ2UgdG8gdGhlIGFwcHJvcHJpYXRlIGNoYW5uZWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5hZGRDaGFubmVscyhbJ2dlbmVyYWwnLCAncmFuZG9tJywgJ3NvbWV0aGluZyBlbHNlJ10pKTtcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0ge1xuICAgICAgICAgICAgICAgIHVzZXJFbWFpbDogJ3Rlc3RAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgIGNyZWF0ZWQ6IERhdGUubm93KCkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICBfaWQ6ICcxJyxcbiAgICAgICAgICAgICAgICB0ZXh0OiAndGhpcyBpcyB0aGUgbWVzc2FnZScsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuYWRkUmVjZWl2ZWRDaGFubmVsTWVzc2FnZSgnZ2VuZXJhbCcsIG1lc3NhZ2UpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmFkZFJlY2VpdmVkQ2hhbm5lbE1lc3NhZ2UoJ3JhbmRvbScsIG1lc3NhZ2UpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmFkZFJlY2VpdmVkQ2hhbm5lbE1lc3NhZ2UoJ3JhbmRvbScsIG1lc3NhZ2UpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmFkZFJlY2VpdmVkQ2hhbm5lbE1lc3NhZ2UoJ3NvbWV0aGluZyBlbHNlJywgbWVzc2FnZSkpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuYWRkUmVjZWl2ZWRDaGFubmVsTWVzc2FnZSgnc29tZXRoaW5nIGVsc2UnLCBtZXNzYWdlKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5hZGRSZWNlaXZlZENoYW5uZWxNZXNzYWdlKCdzb21ldGhpbmcgZWxzZScsIG1lc3NhZ2UpKTtcbiAgICAgICAgICAgIHZhciBnZW5lcmFsTWVzc2FnZXMgPSBjaGFubmVscygpLmZpbmQoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUubmFtZSA9PT0gJ2dlbmVyYWwnOyB9KS5tZXNzYWdlcztcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGdlbmVyYWxNZXNzYWdlcy5sZW5ndGgsIDEpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoZ2VuZXJhbE1lc3NhZ2VzLCBbbWVzc2FnZV0pO1xuICAgICAgICAgICAgdmFyIHJhbmRvbU1lc3NhZ2VzID0gY2hhbm5lbHMoKS5maW5kKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLm5hbWUgPT09ICdyYW5kb20nOyB9KS5tZXNzYWdlcztcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKHJhbmRvbU1lc3NhZ2VzLmxlbmd0aCwgMik7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChyYW5kb21NZXNzYWdlcywgW21lc3NhZ2UsIG1lc3NhZ2VdKTtcbiAgICAgICAgICAgIHZhciBvdGhlck1lc3NhZ2VzID0gY2hhbm5lbHMoKS5maW5kKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLm5hbWUgPT09ICdzb21ldGhpbmcgZWxzZSc7IH0pLm1lc3NhZ2VzO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwob3RoZXJNZXNzYWdlcy5sZW5ndGgsIDMpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwob3RoZXJNZXNzYWdlcywgW21lc3NhZ2UsIG1lc3NhZ2UsIG1lc3NhZ2VdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgYWRkIHJldHJlaXZlZCBtZXNzYWdlcyB0byB0aGUgYXBwcm9wcmlhdGUgY2hhbm5lbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmFkZENoYW5uZWxzKFsnZ2VuZXJhbCcsICdyYW5kb20nLCAnc29tZXRoaW5nIGVsc2UnXSkpO1xuICAgICAgICAgICAgdmFyIG1lc3NhZ2VzID0gW1xuICAgICAgICAgICAgICAgIHsgXCJ0ZXh0XCI6IFwiU29tZXRoaW5nIGhlcmVcIiwgXCJjcmVhdGVkXCI6IFwiMjAxOS0wNC0xM1QxNjo0NToyOC45NDZaXCIsIFwidXNlckVtYWlsXCI6IFwiYWJrb3RobWFuQGdtYWlsLmNvbVwiLCBcIl9pZFwiOiBcIjVjYjIxMjI4MWQ2NDVhMjJhYmVhOGRiZVwiIH0sXG4gICAgICAgICAgICAgICAgeyBcInRleHRcIjogXCIxMjM0MTIzNFwiLCBcImNyZWF0ZWRcIjogXCIyMDE5LTA0LTE0VDIyOjM0OjA2LjY4NlpcIiwgXCJ1c2VyRW1haWxcIjogXCJhYmtvdGhtYW5AZ21haWwuY29tXCIsIFwiX2lkXCI6IFwiNWNiM2I1NWVjYmY2OGM2YTk1NGVhZmIzXCIgfSxcbiAgICAgICAgICAgICAgICB7IFwidGV4dFwiOiBcInRlc3Qgb25lIHR3byB0aHJlZVwiLCBcImNyZWF0ZWRcIjogXCIyMDE5LTA0LTE0VDIyOjM0OjEwLjkwM1pcIiwgXCJ1c2VyRW1haWxcIjogXCJhYmtvdGhtYW5AZ21haWwuY29tXCIsIFwiX2lkXCI6IFwiNWNiM2I1NjJjYmY2OGM2YTk1NGVhZmI0XCIgfVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcygnZ2VuZXJhbCcsIG1lc3NhZ2VzKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5hZGRSZXRyaWV2ZWRDaGFubmVsTWVzc2FnZXMoJ3JhbmRvbScsIG1lc3NhZ2VzKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5hZGRSZXRyaWV2ZWRDaGFubmVsTWVzc2FnZXMoJ3JhbmRvbScsIG1lc3NhZ2VzKSk7XG4gICAgICAgICAgICB2YXIgY2hhbm5lbFN0YXRlID0gY2hhbm5lbHMoKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGNoYW5uZWxTdGF0ZVxuICAgICAgICAgICAgICAgIC5maW5kKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLm5hbWUgPT09ICdnZW5lcmFsJzsgfSlcbiAgICAgICAgICAgICAgICAubWVzc2FnZXMsIG1lc3NhZ2VzKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGNoYW5uZWxTdGF0ZVxuICAgICAgICAgICAgICAgIC5maW5kKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLm5hbWUgPT09ICdyYW5kb20nOyB9KVxuICAgICAgICAgICAgICAgIC5tZXNzYWdlcywgbWVzc2FnZXMuY29uY2F0KG1lc3NhZ2VzKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChjaGFubmVsU3RhdGVcbiAgICAgICAgICAgICAgICAuZmluZChmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5uYW1lID09PSAnc29tZXRoaW5nIGVsc2UnOyB9KVxuICAgICAgICAgICAgICAgIC5tZXNzYWdlcywgW10pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBjbGVhciBhbGwgY2hhbm5lbCBkYXRhJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuYWRkQ2hhbm5lbHMoWydnZW5lcmFsJywgJ3JhbmRvbScsICdzb21ldGhpbmcgZWxzZSddKSk7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZXMgPSBbXG4gICAgICAgICAgICAgICAgeyBcInRleHRcIjogXCJTb21ldGhpbmcgaGVyZVwiLCBcImNyZWF0ZWRcIjogXCIyMDE5LTA0LTEzVDE2OjQ1OjI4Ljk0NlpcIiwgXCJ1c2VyRW1haWxcIjogXCJhYmtvdGhtYW5AZ21haWwuY29tXCIsIFwiX2lkXCI6IFwiNWNiMjEyMjgxZDY0NWEyMmFiZWE4ZGJlXCIgfSxcbiAgICAgICAgICAgICAgICB7IFwidGV4dFwiOiBcIjEyMzQxMjM0XCIsIFwiY3JlYXRlZFwiOiBcIjIwMTktMDQtMTRUMjI6MzQ6MDYuNjg2WlwiLCBcInVzZXJFbWFpbFwiOiBcImFia290aG1hbkBnbWFpbC5jb21cIiwgXCJfaWRcIjogXCI1Y2IzYjU1ZWNiZjY4YzZhOTU0ZWFmYjNcIiB9LFxuICAgICAgICAgICAgICAgIHsgXCJ0ZXh0XCI6IFwidGVzdCBvbmUgdHdvIHRocmVlXCIsIFwiY3JlYXRlZFwiOiBcIjIwMTktMDQtMTRUMjI6MzQ6MTAuOTAzWlwiLCBcInVzZXJFbWFpbFwiOiBcImFia290aG1hbkBnbWFpbC5jb21cIiwgXCJfaWRcIjogXCI1Y2IzYjU2MmNiZjY4YzZhOTU0ZWFmYjRcIiB9XG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuYWRkUmV0cmlldmVkQ2hhbm5lbE1lc3NhZ2VzKCdnZW5lcmFsJywgbWVzc2FnZXMpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcygncmFuZG9tJywgbWVzc2FnZXMpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcygncmFuZG9tJywgbWVzc2FnZXMpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmNsZWFyQ2hhbm5lbHNEYXRhKCkpO1xuICAgICAgICAgICAgdmFyIGNoYW5uZWxTdGF0ZSA9IGNoYW5uZWxzKCk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChjaGFubmVsU3RhdGUsIFtdKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ05vdGlmaWNhdGlvbnMgU3RhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdG9yZTtcbiAgICAgICAgdmFyIG5vdGlmaWNhdGlvbnM7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUgPSBnZXRTdG9yZSgpO1xuICAgICAgICAgICAgbm90aWZpY2F0aW9ucyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN0b3JlLmdldFN0YXRlKCkubm90aWZpY2F0aW9uczsgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgYWRkIGVycm9ycycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5vdGlmaWNhdGlvbnMoKS5lcnJvcnMsIFtdKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ1Rlc3QgZXJyb3InKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuZXJyb3JzLCBbJ1Rlc3QgZXJyb3InXSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKCdBbm90aGVyIGVycm9yJykpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmVycm9ycywgWydUZXN0IGVycm9yJywgJ0Fub3RoZXIgZXJyb3InXSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJlbW92ZSBlcnJvcnMgZ2l2ZW4gYW4gaW5kZXgnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKCdUZXN0IGVycm9yJykpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignQW5vdGhlciBlcnJvcicpKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5vdGlmaWNhdGlvbnMoKS5lcnJvcnMsIFsnVGVzdCBlcnJvcicsICdBbm90aGVyIGVycm9yJ10pO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5yZW1vdmVFcnJvcigxKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuZXJyb3JzLCBbJ1Rlc3QgZXJyb3InXSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLnJlbW92ZUVycm9yKDApKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5vdGlmaWNhdGlvbnMoKS5lcnJvcnMsIFtdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgY2xlYXIgZXJyb3JzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignVGVzdCBlcnJvcicpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ0Fub3RoZXIgZXJyb3InKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmNsZWFyRXJyb3JzKCkpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmVycm9ycywgW10pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBhZGQgaW5mbycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5vdGlmaWNhdGlvbnMoKS5pbmZvcywgW10pO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRJbmZvKCdUZXN0IGluZm8nKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuaW5mb3MsIFsnVGVzdCBpbmZvJ10pO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRJbmZvKCdBbm90aGVyIGluZm8nKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuaW5mb3MsIFsnVGVzdCBpbmZvJywgJ0Fub3RoZXIgaW5mbyddKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmVtb3ZlIGluZm8gZ2l2ZW4gYW4gaW5kZXgnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEluZm8oJ1Rlc3QgaW5mbycpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkSW5mbygnQW5vdGhlciBpbmZvJykpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5yZW1vdmVJbmZvKDEpKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5vdGlmaWNhdGlvbnMoKS5pbmZvcywgWydUZXN0IGluZm8nXSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLnJlbW92ZUluZm8oMCkpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmluZm9zLCBbXSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGNsZWFyIGluZm9zJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRJbmZvKCdUZXN0IGluZm8nKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEluZm8oJ0Fub3RoZXIgaW5mbycpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuY2xlYXJJbmZvcygpKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5vdGlmaWNhdGlvbnMoKS5pbmZvcywgW10pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnU2lkZWJhciBTdGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHN0b3JlO1xuICAgICAgICB2YXIgc2lkZWJhcjtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdG9yZSA9IGdldFN0b3JlKCk7XG4gICAgICAgICAgICBzaWRlYmFyID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gc3RvcmUuZ2V0U3RhdGUoKS5zaWRlYmFyOyB9O1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCB0b2dnbGUgb3BlbiBzdGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNUcnVlKHNpZGViYXIoKS5vcGVuKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNpZGViYXJBY3Rpb25zXzEudG9nZ2xlU2lkZWJhck9wZW4oKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2Uoc2lkZWJhcigpLm9wZW4pO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc2lkZWJhckFjdGlvbnNfMS50b2dnbGVTaWRlYmFyT3BlbigpKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNUcnVlKHNpZGViYXIoKS5vcGVuKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNpZGViYXJBY3Rpb25zXzEudG9nZ2xlU2lkZWJhck9wZW4oKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2Uoc2lkZWJhcigpLm9wZW4pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnU29ja2V0IFN0YXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc3RvcmU7XG4gICAgICAgIHZhciBzb2NrZXQ7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUgPSBnZXRTdG9yZSgpO1xuICAgICAgICAgICAgc29ja2V0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gc3RvcmUuZ2V0U3RhdGUoKS5zb2NrZXQ7IH07XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHNldCB0aGUgc29ja2V0IGdpdmVuIGEgU29ja2V0SU9DbGllbnQgU29ja2V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoc29ja2V0KCksIHtcbiAgICAgICAgICAgICAgICBpbzogbnVsbCxcbiAgICAgICAgICAgICAgICBjb25uZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZFVzZXJFbWFpbHM6IFtdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBzb2NrZXRpbyA9IHNvY2tldGlvY2xpZW50KCk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzb2NrZXRBY3Rpb25zXzEuaW5pdFdlYnNvY2tldChzb2NrZXRpbykpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoc29ja2V0KCksIHtcbiAgICAgICAgICAgICAgICBpbzogc29ja2V0aW8sXG4gICAgICAgICAgICAgICAgY29ubmVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb25uZWN0ZWRVc2VyRW1haWxzOiBbXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzb2NrZXRpby5jbG9zZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCB1cGRhdGUgdGhlIGNvbm5lY3RlZCBzdGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNvY2tldEFjdGlvbnNfMS5zZXRTb2NrZXRDb25uZWN0ZWQodHJ1ZSkpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoc29ja2V0KCksIHtcbiAgICAgICAgICAgICAgICBpbzogbnVsbCxcbiAgICAgICAgICAgICAgICBjb25uZWN0ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgY29ubmVjdGVkVXNlckVtYWlsczogW11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc29ja2V0QWN0aW9uc18xLnNldFNvY2tldENvbm5lY3RlZChmYWxzZSkpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoc29ja2V0KCksIHtcbiAgICAgICAgICAgICAgICBpbzogbnVsbCxcbiAgICAgICAgICAgICAgICBjb25uZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZFVzZXJFbWFpbHM6IFtdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgdXBkYXRlIHRoZSBjb25uZWN0ZWQgdXNlcnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZW1haWxzID0gWyd0ZXN0QHRlc3QuY29tJywgJ3Rlc3QyQHRlc3QuY29tJ107XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzb2NrZXRBY3Rpb25zXzEuc2V0U29ja2V0Q29ubmVjdGVkVXNlcnMoZW1haWxzKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChzb2NrZXQoKSwge1xuICAgICAgICAgICAgICAgIGlvOiBudWxsLFxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29ubmVjdGVkVXNlckVtYWlsczogZW1haWxzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ0NoYXQgVXNlcnMgU3RhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdG9yZTtcbiAgICAgICAgdmFyIGNoYXRVc2VycztcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdG9yZSA9IGdldFN0b3JlKCk7XG4gICAgICAgICAgICBjaGF0VXNlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBzdG9yZS5nZXRTdGF0ZSgpLmNoYXRVc2VyczsgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgdXBkYXRlIHVzZXJzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHVzZXJzID0ge1xuICAgICAgICAgICAgICAgICd0ZXN0QHRlc3QuY29tJzoge1xuICAgICAgICAgICAgICAgICAgICByb2xlOiAndXNlcicsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdUZXN0IE5hbWUnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAndGVzdDJAdGVzdC5jb20nOiB7XG4gICAgICAgICAgICAgICAgICAgIHJvbGU6ICdhZG1pbicsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdBbm90aGVyIHRlc3QnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAndGVzdDNAdGVzdC5jb20nOiB7XG4gICAgICAgICAgICAgICAgICAgIHJvbGU6ICdhZG1pbicsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdMYXN0IHRlc3QnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYXRVc2Vyc0FjdGlvbnNfMS51cGRhdGVVc2Vycyh1c2VycykpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoY2hhdFVzZXJzKCksIHVzZXJzKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWRHVnpkRk4wYjNKbExtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZMaTR2ZEdWemRITXZkMlZpTDNSbGMzUlRkRzl5WlM1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96dEJRVUZCTERaQ1FVRTRRanRCUVVNNVFpeHBRa0ZCWlR0QlFVTm1MR2xFUVVGdFJEdEJRVVZ1UkN3MlEwRkJiVVU3UVVGRmJrVXNLMEpCUVRKRE8wRkJRek5ETEdsRlFVRjFSanRCUVVOMlJpeDVSVUZCYVZBN1FVRkZhbEFzYlVaQlFXbEpPMEZCUTJwSkxIVkZRVUY1UlR0QlFVTjZSU3h4UlVGQmFVZzdRVUZEYWtnc01rVkJRVEJHTzBGQlJ6RkdMRk5CUVZNc1VVRkJVVHRKUVVOaUxFOUJRVThzYlVKQlFWY3NRMEZCUXl4dFFrRkJWeXhGUVVGRkxHdENRVUZWTEVOQlFVTXNRMEZCUXp0QlFVTm9SQ3hEUVVGRE8wRkJSVVFzVVVGQlVTeERRVUZETEN0Q1FVRXJRaXhGUVVGRk8wbEJRM1JETEZGQlFWRXNRMEZCUXl4WlFVRlpMRVZCUVVVN1VVRkRia0lzU1VGQlNTeExRVUZ0UWl4RFFVRkRPMUZCUTNoQ0xFbEJRVWtzU1VGQk1rSXNRMEZCUXp0UlFVTm9ReXhWUVVGVkxFTkJRVU03V1VGRFVDeExRVUZMTEVkQlFVY3NVVUZCVVN4RlFVRkZMRU5CUVVNN1dVRkRia0lzU1VGQlNTeEhRVUZITEdOQlFVMHNUMEZCUVN4TFFVRkxMRU5CUVVNc1VVRkJVU3hGUVVGRkxFTkJRVU1zU1VGQlNTeEZRVUZ5UWl4RFFVRnhRaXhEUVVGRE8xRkJRM1pETEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1JVRkJSU3hEUVVGRExEQkNRVUV3UWl4RlFVRkZPMWxCUXpOQ0xHRkJRVTBzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RlFVRkZMRU5CUVVNc1ZVRkJWU3hEUVVGRExFTkJRVU03V1VGRGJFTXNZVUZCVFN4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0WlFVTTNRaXhoUVVGTkxFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xbEJRelZDTEdGQlFVMHNRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdVVUZEYUVNc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEZRVUZGTEVOQlFVTXNhVVJCUVdsRUxFVkJRVVU3V1VGRGJFUXNZVUZCVFN4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eFZRVUZWTEVOQlFVTXNRMEZCUXp0WlFVTnNReXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETERKQ1FVRmhMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU53UXl4aFFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETEZWQlFWVXNRMEZCUXl4RFFVRkRPMWxCUTJwRExFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNNa0pCUVdFc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEzSkRMR0ZCUVUwc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeEZRVUZGTEVOQlFVTXNWVUZCVlN4RFFVRkRMRU5CUVVNN1VVRkRkRU1zUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4RlFVRkZMRU5CUVVNc09FTkJRVGhETEVWQlFVVTdXVUZETDBNc1lVRkJUU3hEUVVGRExFOUJRVThzUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4VlFVRlZMRU5CUVVNc1EwRkJRenRaUVVOc1F5eGhRVUZOTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETzFsQlF6ZENMR0ZCUVUwc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1dVRkROVUlzWVVGQlRTeERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFpRVU0xUWl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExIRkNRVUZQTEVOQlFVTTdaMEpCUTI1Q0xGVkJRVlVzUlVGQlJTeEpRVUZKTzJkQ1FVTm9RaXhMUVVGTExFVkJRVVVzWlVGQlpUdG5Ra0ZEZEVJc1NVRkJTU3hGUVVGRkxGVkJRVlU3WjBKQlEyaENMRWxCUVVrc1JVRkJSU3hQUVVGUE8yRkJRMmhDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTBvc1lVRkJUU3hEUVVGRExFMUJRVTBzUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4VlFVRlZMRU5CUVVNc1EwRkJRenRaUVVOcVF5eGhRVUZOTEVOQlFVTXNWMEZCVnl4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFdEJRVXNzUlVGQlJTeGxRVUZsTEVOQlFVTXNRMEZCUXp0WlFVTnNSQ3hoUVVGTkxFTkJRVU1zVjBGQlZ5eERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRWxCUVVrc1JVRkJSU3hWUVVGVkxFTkJRVU1zUTBGQlF6dFpRVU0xUXl4aFFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETEVsQlFVa3NSVUZCUlN4UFFVRlBMRU5CUVVNc1EwRkJRenRaUVVONlF5eExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMSEZDUVVGUExFTkJRVU03WjBKQlEyNUNMRlZCUVZVc1JVRkJSU3hMUVVGTE8yZENRVU5xUWl4TFFVRkxMRVZCUVVVc1MwRkJTenRuUWtGRFdpeEpRVUZKTEVWQlFVVXNTMEZCU3p0blFrRkRXQ3hKUVVGSkxFVkJRVVVzUzBGQlN6dGhRVU5rTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTBvc1lVRkJUU3hEUVVGRExFOUJRVThzUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4VlFVRlZMRU5CUVVNc1EwRkJRenRaUVVOc1F5eGhRVUZOTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETzFsQlF6ZENMR0ZCUVUwc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1dVRkROVUlzWVVGQlRTeERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU5vUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5dzJRMEZCTmtNc1JVRkJSVHRaUVVNNVF5eExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMSEZDUVVGUExFTkJRVU03WjBKQlEyNUNMRlZCUVZVc1JVRkJSU3hKUVVGSk8yZENRVU5vUWl4TFFVRkxMRVZCUVVVc1pVRkJaVHRuUWtGRGRFSXNTVUZCU1N4RlFVRkZMRlZCUVZVN1owSkJRMmhDTEVsQlFVa3NSVUZCUlN4UFFVRlBPMkZCUTJoQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEwb3NTMEZCU3l4RFFVRkRMRkZCUVZFc1EwRkJReXgzUWtGQlZTeEZRVUZGTEVOQlFVTXNRMEZCUXp0WlFVTTNRaXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEhGQ1FVRlBMRU5CUVVNN1owSkJRMjVDTEZWQlFWVXNSVUZCUlN4TFFVRkxPMmRDUVVOcVFpeExRVUZMTEVWQlFVVXNTMEZCU3p0blFrRkRXaXhKUVVGSkxFVkJRVVVzUzBGQlN6dG5Ra0ZEV0N4SlFVRkpMRVZCUVVVc1MwRkJTenRoUVVOa0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExSXNRMEZCUXl4RFFVRkRMRU5CUVVFN1NVRkRUaXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5JTEZGQlFWRXNRMEZCUXl4blFrRkJaMElzUlVGQlJUdFJRVU4yUWl4SlFVRkpMRXRCUVcxQ0xFTkJRVU03VVVGRGVFSXNTVUZCU1N4UlFVRnRReXhEUVVGRE8xRkJRM2hETEZWQlFWVXNRMEZCUXp0WlFVTlFMRXRCUVVzc1IwRkJSeXhSUVVGUkxFVkJRVVVzUTBGQlF6dFpRVU51UWl4UlFVRlJMRWRCUVVjc1kwRkJUU3hQUVVGQkxFdEJRVXNzUTBGQlF5eFJRVUZSTEVWQlFVVXNRMEZCUXl4UlFVRlJMRVZCUVhwQ0xFTkJRWGxDTEVOQlFVTTdVVUZETDBNc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEZRVUZGTEVOQlFVTXNiMFJCUVc5RUxFVkJRVVU3V1VGRGNrUXNTMEZCU3l4RFFVRkRMRkZCUVZFc1EwRkJReXcyUWtGQlZ5eERRVUZETEVOQlFVTXNVMEZCVXl4RlFVRkZMRkZCUVZFc1JVRkJSU3huUWtGQlowSXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOeVJTeEpRVUZKTEVWQlFVVXNSMEZCZVVJc1VVRkJVU3hGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdXVUZETjBNc1NVRkJTU3hGUVVGRkxFZEJRWGxDTEZGQlFWRXNSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRemRETEVsQlFVa3NSVUZCUlN4SFFVRjVRaXhSUVVGUkxFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTTNReXhoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEVWQlFVVXNSVUZCUlR0blFrRkRka0lzU1VGQlNTeEZRVUZGTEZOQlFWTTdaMEpCUTJZc1VVRkJVU3hGUVVGRkxFVkJRVVU3WjBKQlExb3NjMEpCUVhOQ0xFVkJRVVVzUTBGQlF6dG5Ra0ZEZWtJc1pVRkJaU3hGUVVGRkxFbEJRVWs3WjBKQlEzSkNMRzFDUVVGdFFpeEZRVUZGTEV0QlFVczdZVUZETjBJc1EwRkJReXhEUVVGRE8xbEJRMGdzWVVGQlRTeERRVUZETEdWQlFXVXNRMEZCUXl4RlFVRkZMRVZCUVVVN1owSkJRM1pDTEVsQlFVa3NSVUZCUlN4UlFVRlJPMmRDUVVOa0xGRkJRVkVzUlVGQlJTeEZRVUZGTzJkQ1FVTmFMSE5DUVVGelFpeEZRVUZGTEVOQlFVTTdaMEpCUTNwQ0xHVkJRV1VzUlVGQlJTeEpRVUZKTzJkQ1FVTnlRaXh0UWtGQmJVSXNSVUZCUlN4TFFVRkxPMkZCUXpkQ0xFTkJRVU1zUTBGQlF6dFpRVU5JTEdGQlFVMHNRMEZCUXl4bFFVRmxMRU5CUVVNc1JVRkJSU3hGUVVGRk8yZENRVU4yUWl4SlFVRkpMRVZCUVVVc1owSkJRV2RDTzJkQ1FVTjBRaXhSUVVGUkxFVkJRVVVzUlVGQlJUdG5Ra0ZEV2l4elFrRkJjMElzUlVGQlJTeERRVUZETzJkQ1FVTjZRaXhsUVVGbExFVkJRVVVzU1VGQlNUdG5Ra0ZEY2tJc2JVSkJRVzFDTEVWQlFVVXNTMEZCU3p0aFFVTTNRaXhEUVVGRExFTkJRVU03VVVGRFVDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXh6UmtGQmMwWXNSVUZCUlR0WlFVTjJSaXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETERaQ1FVRlhMRU5CUVVNc1EwRkJReXhUUVVGVExFVkJRVVVzVVVGQlVTeEZRVUZGTEdkQ1FVRm5RaXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEzSkZMRkZCUVZFc1JVRkJSU3hEUVVGRExFOUJRVThzUTBGQlF5eFZRVUZETEVOQlFYVkNPMmRDUVVOMlF5eGhRVUZOTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNc1EwRkJReXh0UWtGQmJVSXNRMEZCUXl4RFFVRkRPMmRDUVVOMFF5eExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMQ3REUVVFMlFpeERRVUZETEVOQlFVTXNRMEZCUXl4SlFVRkpMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU5vUlN4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOSUxGRkJRVkVzUlVGQlJTeERRVUZETEU5QlFVOHNRMEZCUXl4VlFVRkRMRU5CUVhWQ08yZENRVU4yUXl4aFFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zUTBGQlF5eHRRa0ZCYlVJc1EwRkJReXhEUVVGRE8yZENRVU55UXl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExDdERRVUUyUWl4RFFVRkRMRU5CUVVNc1EwRkJReXhKUVVGSkxFVkJRVVVzUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTnFSU3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU5JTEZGQlFWRXNSVUZCUlN4RFFVRkRMRTlCUVU4c1EwRkJReXhWUVVGRExFTkJRWFZDTzJkQ1FVTjJReXhoUVVGTkxFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTXNRMEZCUXl4dFFrRkJiVUlzUTBGQlF5eERRVUZETzFsQlF6RkRMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMUFzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4RlFVRkZMRU5CUVVNc2FVVkJRV2xGTEVWQlFVVTdXVUZEYkVVc1MwRkJTeXhEUVVGRExGRkJRVkVzUTBGQlF5dzJRa0ZCVnl4RFFVRkRMRU5CUVVNc1UwRkJVeXhGUVVGRkxGRkJRVkVzUlVGQlJTeG5Ra0ZCWjBJc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU55UlN4aFFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExGRkJRVkVzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRkJMRU5CUVVNc1NVRkJTU3hQUVVGQkxFTkJRVU1zUTBGQlF5eEpRVUZKTEV0QlFVc3NVMEZCVXl4RlFVRndRaXhEUVVGdlFpeERRVUZETEVOQlFVTXNjMEpCUVhOQ0xFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEZWtZc1lVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eFJRVUZSTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJRU3hEUVVGRExFbEJRVWtzVDBGQlFTeERRVUZETEVOQlFVTXNTVUZCU1N4TFFVRkxMRkZCUVZFc1JVRkJia0lzUTBGQmJVSXNRMEZCUXl4RFFVRkRMSE5DUVVGelFpeEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTNoR0xHRkJRVTBzUTBGQlF5eFhRVUZYTEVOQlFVTXNVVUZCVVN4RlFVRkZMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVUVzUTBGQlF5eEpRVUZKTEU5QlFVRXNRMEZCUXl4RFFVRkRMRWxCUVVrc1MwRkJTeXhuUWtGQlowSXNSVUZCTTBJc1EwRkJNa0lzUTBGQlF5eERRVUZETEhOQ1FVRnpRaXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEyaEhMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zZDBSQlFYTkRMRU5CUVVNc1UwRkJVeXhGUVVGRkxFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVRTdXVUZEY2tVc1lVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eFJRVUZSTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJRU3hEUVVGRExFbEJRVWtzVDBGQlFTeERRVUZETEVOQlFVTXNTVUZCU1N4TFFVRkxMRk5CUVZNc1JVRkJjRUlzUTBGQmIwSXNRMEZCUXl4RFFVRkRMSE5DUVVGelFpeEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkRPMWxCUXpGR0xFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNkMFJCUVhORExFTkJRVU1zVTBGQlV5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVFN1dVRkRjRVVzWVVGQlRTeERRVUZETEZkQlFWY3NRMEZCUXl4UlFVRlJMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlFTeERRVUZETEVsQlFVa3NUMEZCUVN4RFFVRkRMRU5CUVVNc1NVRkJTU3hMUVVGTExGTkJRVk1zUlVGQmNFSXNRMEZCYjBJc1EwRkJReXhEUVVGRExITkNRVUZ6UWl4RlFVRkZMRVZCUVVVc1EwRkJReXhEUVVGRE8xbEJRekZHTEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc2QwUkJRWE5ETEVOQlFVTXNVVUZCVVN4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVUU3V1VGRGJrVXNZVUZCVFN4RFFVRkRMRmRCUVZjc1EwRkJReXhSUVVGUkxFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUVN4RFFVRkRMRWxCUVVrc1QwRkJRU3hEUVVGRExFTkJRVU1zU1VGQlNTeExRVUZMTEZGQlFWRXNSVUZCYmtJc1EwRkJiVUlzUTBGQlF5eERRVUZETEhOQ1FVRnpRaXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEzaEdMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zZDBSQlFYTkRMRU5CUVVNc1owSkJRV2RDTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRVHRaUVVNelJTeGhRVUZOTEVOQlFVTXNWMEZCVnl4RFFVRkRMRkZCUVZFc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZCTEVOQlFVTXNTVUZCU1N4UFFVRkJMRU5CUVVNc1EwRkJReXhKUVVGSkxFdEJRVXNzWjBKQlFXZENMRVZCUVROQ0xFTkJRVEpDTEVOQlFVTXNRMEZCUXl4elFrRkJjMElzUlVGQlJTeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTndSeXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl4NVJFRkJlVVFzUlVGQlJUdFpRVU14UkN4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExEWkNRVUZYTEVOQlFVTXNRMEZCUXl4VFFVRlRMRVZCUVVVc1VVRkJVU3hGUVVGRkxHZENRVUZuUWl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRM0pGTEdGQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc1VVRkJVU3hGUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFVRXNRMEZCUXl4SlFVRkpMRTlCUVVFc1EwRkJReXhEUVVGRExFbEJRVWtzUzBGQlN5eFRRVUZUTEVWQlFYQkNMRU5CUVc5Q0xFTkJRVU1zUTBGQlF5eGxRVUZsTEVOQlFVTXNRMEZCUXp0WlFVTXhSU3hoUVVGTkxFTkJRVU1zVFVGQlRTeERRVUZETEZGQlFWRXNSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGQkxFTkJRVU1zU1VGQlNTeFBRVUZCTEVOQlFVTXNRMEZCUXl4SlFVRkpMRXRCUVVzc1VVRkJVU3hGUVVGdVFpeERRVUZ0UWl4RFFVRkRMRU5CUVVNc1pVRkJaU3hEUVVGRExFTkJRVU03V1VGRGVrVXNZVUZCVFN4RFFVRkRMRTFCUVUwc1EwRkJReXhSUVVGUkxFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUVN4RFFVRkRMRWxCUVVrc1QwRkJRU3hEUVVGRExFTkJRVU1zU1VGQlNTeExRVUZMTEdkQ1FVRm5RaXhGUVVFelFpeERRVUV5UWl4RFFVRkRMRU5CUVVNc1pVRkJaU3hEUVVGRExFTkJRVU03V1VGRGFrWXNTMEZCU3l4RFFVRkRMRkZCUVZFc1EwRkJReXd5UTBGQmVVSXNRMEZCUXl4VFFVRlRMRVZCUVVVc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU0xUkN4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExESkRRVUY1UWl4RFFVRkRMRkZCUVZFc1JVRkJSU3hMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETzFsQlF6TkVMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zTWtOQlFYbENMRU5CUVVNc1owSkJRV2RDTEVWQlFVVXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOdVJTeGhRVUZOTEVOQlFVTXNUMEZCVHl4RFFVRkRMRkZCUVZFc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZCTEVOQlFVTXNTVUZCU1N4UFFVRkJMRU5CUVVNc1EwRkJReXhKUVVGSkxFdEJRVXNzVTBGQlV5eEZRVUZ3UWl4RFFVRnZRaXhEUVVGRExFTkJRVU1zWlVGQlpTeERRVUZETEVOQlFVTTdXVUZETTBVc1lVRkJUU3hEUVVGRExFOUJRVThzUTBGQlF5eFJRVUZSTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJRU3hEUVVGRExFbEJRVWtzVDBGQlFTeERRVUZETEVOQlFVTXNTVUZCU1N4TFFVRkxMRkZCUVZFc1JVRkJia0lzUTBGQmJVSXNRMEZCUXl4RFFVRkRMR1ZCUVdVc1EwRkJReXhEUVVGRE8xbEJRekZGTEdGQlFVMHNRMEZCUXl4UFFVRlBMRU5CUVVNc1VVRkJVU3hGUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFVRXNRMEZCUXl4SlFVRkpMRTlCUVVFc1EwRkJReXhEUVVGRExFbEJRVWtzUzBGQlN5eG5Ra0ZCWjBJc1JVRkJNMElzUTBGQk1rSXNRMEZCUXl4RFFVRkRMR1ZCUVdVc1EwRkJReXhEUVVGRE8xRkJRM1JHTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1JVRkJSU3hEUVVGRExEQkVRVUV3UkN4RlFVRkZPMWxCUXpORUxFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNOa0pCUVZjc1EwRkJReXhEUVVGRExGTkJRVk1zUlVGQlJTeFJRVUZSTEVWQlFVVXNaMEpCUVdkQ0xFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEY2tVc1NVRkJTU3hQUVVGUExFZEJRVms3WjBKQlEyNUNMRk5CUVZNc1JVRkJSU3hsUVVGbE8yZENRVU14UWl4UFFVRlBMRVZCUVVVc1NVRkJTU3hEUVVGRExFZEJRVWNzUlVGQlJTeERRVUZETEZGQlFWRXNSVUZCUlR0blFrRkRPVUlzUjBGQlJ5eEZRVUZGTEVkQlFVYzdaMEpCUTFJc1NVRkJTU3hGUVVGRkxIRkNRVUZ4UWp0aFFVTTVRaXhEUVVGRE8xbEJSVVlzUzBGQlN5eERRVUZETEZGQlFWRXNRMEZCUXl3eVEwRkJlVUlzUTBGQlF5eFRRVUZUTEVWQlFVVXNUMEZCVHl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVNNVJDeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMREpEUVVGNVFpeERRVUZETEZGQlFWRXNSVUZCUlN4UFFVRlBMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRemRFTEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc01rTkJRWGxDTEVOQlFVTXNVVUZCVVN4RlFVRkZMRTlCUVU4c1EwRkJReXhEUVVGRExFTkJRVU03V1VGRE4wUXNTMEZCU3l4RFFVRkRMRkZCUVZFc1EwRkJReXd5UTBGQmVVSXNRMEZCUXl4blFrRkJaMElzUlVGQlJTeFBRVUZQTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTNKRkxFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNNa05CUVhsQ0xFTkJRVU1zWjBKQlFXZENMRVZCUVVVc1QwRkJUeXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU55UlN4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExESkRRVUY1UWl4RFFVRkRMR2RDUVVGblFpeEZRVUZGTEU5QlFVOHNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkZja1VzU1VGQlNTeGxRVUZsTEVkQlFXTXNVVUZCVVN4RlFVRkZMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVUVzUTBGQlF5eEpRVUZKTEU5QlFVRXNRMEZCUXl4RFFVRkRMRWxCUVVrc1MwRkJTeXhUUVVGVExFVkJRWEJDTEVOQlFXOUNMRU5CUVVNc1EwRkJReXhSUVVGUkxFTkJRVU03V1VGRGNrWXNZVUZCVFN4RFFVRkRMR1ZCUVdVc1EwRkJReXhsUVVGbExFTkJRVU1zVFVGQlRTeEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTJ4RUxHRkJRVTBzUTBGQlF5eGxRVUZsTEVOQlFVTXNaVUZCWlN4RlFVRkZMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU51UkN4SlFVRkpMR05CUVdNc1IwRkJZeXhSUVVGUkxFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUVN4RFFVRkRMRWxCUVVrc1QwRkJRU3hEUVVGRExFTkJRVU1zU1VGQlNTeExRVUZMTEZGQlFWRXNSVUZCYmtJc1EwRkJiVUlzUTBGQlF5eERRVUZETEZGQlFWRXNRMEZCUXp0WlFVTnVSaXhoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEdOQlFXTXNRMEZCUXl4TlFVRk5MRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRGFrUXNZVUZCVFN4RFFVRkRMR1ZCUVdVc1EwRkJReXhqUVVGakxFVkJRVVVzUTBGQlF5eFBRVUZQTEVWQlFVVXNUMEZCVHl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVNelJDeEpRVUZKTEdGQlFXRXNSMEZCWXl4UlFVRlJMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlFTeERRVUZETEVsQlFVa3NUMEZCUVN4RFFVRkRMRU5CUVVNc1NVRkJTU3hMUVVGTExHZENRVUZuUWl4RlFVRXpRaXhEUVVFeVFpeERRVUZETEVOQlFVTXNVVUZCVVN4RFFVRkRPMWxCUXpGR0xHRkJRVTBzUTBGQlF5eGxRVUZsTEVOQlFVTXNZVUZCWVN4RFFVRkRMRTFCUVUwc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU5vUkN4aFFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExHRkJRV0VzUlVGQlJTeERRVUZETEU5QlFVOHNSVUZCUlN4UFFVRlBMRVZCUVVVc1QwRkJUeXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU4yUlN4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5d3dSRUZCTUVRc1JVRkJSVHRaUVVNelJDeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMRFpDUVVGWExFTkJRVU1zUTBGQlF5eFRRVUZUTEVWQlFVVXNVVUZCVVN4RlFVRkZMR2RDUVVGblFpeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTNKRkxFbEJRVWtzVVVGQlVTeEhRVUZqTzJkQ1FVTjBRaXhGUVVGRkxFMUJRVTBzUlVGQlJTeG5Ra0ZCWjBJc1JVRkJSU3hUUVVGVExFVkJRVVVzTUVKQlFUQkNMRVZCUVVVc1YwRkJWeXhGUVVGRkxIRkNRVUZ4UWl4RlFVRkZMRXRCUVVzc1JVRkJSU3d3UWtGQk1FSXNSVUZCUlR0blFrRkRNVWtzUlVGQlJTeE5RVUZOTEVWQlFVVXNWVUZCVlN4RlFVRkZMRk5CUVZNc1JVRkJSU3d3UWtGQk1FSXNSVUZCUlN4WFFVRlhMRVZCUVVVc2NVSkJRWEZDTEVWQlFVY3NTMEZCU3l4RlFVRkZMREJDUVVFd1FpeEZRVUZGTzJkQ1FVTnlTU3hGUVVGRkxFMUJRVTBzUlVGQlJTeHZRa0ZCYjBJc1JVRkJSU3hUUVVGVExFVkJRVVVzTUVKQlFUQkNMRVZCUVVVc1YwRkJWeXhGUVVGRkxIRkNRVUZ4UWl4RlFVRkZMRXRCUVVzc1JVRkJSU3d3UWtGQk1FSXNSVUZCUlR0aFFVRkRMRU5CUVVNN1dVRkRjRW9zUzBGQlN5eERRVUZETEZGQlFWRXNRMEZCUXl3MlEwRkJNa0lzUTBGQlF5eFRRVUZUTEVWQlFVVXNVVUZCVVN4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOcVJTeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMRFpEUVVFeVFpeERRVUZETEZGQlFWRXNSVUZCUlN4UlFVRlJMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMmhGTEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc05rTkJRVEpDTEVOQlFVTXNVVUZCVVN4RlFVRkZMRkZCUVZFc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRGFFVXNTVUZCU1N4WlFVRlpMRWRCUVVjc1VVRkJVU3hGUVVGRkxFTkJRVU03V1VGRE9VSXNZVUZCVFN4RFFVRkRMR1ZCUVdVc1EwRkRiRUlzV1VGQldUdHBRa0ZEVUN4SlFVRkpMRU5CUVVNc1ZVRkJReXhEUVVGRExFbEJRVXNzVDBGQlFTeERRVUZETEVOQlFVTXNTVUZCU1N4TFFVRkxMRk5CUVZNc1JVRkJjRUlzUTBGQmIwSXNRMEZCUXp0cFFrRkRha01zVVVGQlVTeEZRVU5pTEZGQlFWRXNRMEZCUXl4RFFVRkRPMWxCUTJRc1lVRkJUU3hEUVVGRExHVkJRV1VzUTBGRGJFSXNXVUZCV1R0cFFrRkRVQ3hKUVVGSkxFTkJRVU1zVlVGQlF5eERRVUZETEVsQlFVc3NUMEZCUVN4RFFVRkRMRU5CUVVNc1NVRkJTU3hMUVVGTExGRkJRVkVzUlVGQmJrSXNRMEZCYlVJc1EwRkJRenRwUWtGRGFFTXNVVUZCVVN4RlFVTmlMRkZCUVZFc1EwRkJReXhOUVVGTkxFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTXZRaXhoUVVGTkxFTkJRVU1zWlVGQlpTeERRVU5zUWl4WlFVRlpPMmxDUVVOUUxFbEJRVWtzUTBGQlF5eFZRVUZETEVOQlFVTXNTVUZCU3l4UFFVRkJMRU5CUVVNc1EwRkJReXhKUVVGSkxFdEJRVXNzWjBKQlFXZENMRVZCUVROQ0xFTkJRVEpDTEVOQlFVTTdhVUpCUTNoRExGRkJRVkVzUlVGRFlpeEZRVUZGTEVOQlFVTXNRMEZCUXp0UlFVTmFMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzUlVGQlJTeERRVUZETEN0Q1FVRXJRaXhGUVVGRk8xbEJRMmhETEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc05rSkJRVmNzUTBGQlF5eERRVUZETEZOQlFWTXNSVUZCUlN4UlFVRlJMRVZCUVVVc1owSkJRV2RDTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRja1VzU1VGQlNTeFJRVUZSTEVkQlFXTTdaMEpCUTNSQ0xFVkJRVVVzVFVGQlRTeEZRVUZGTEdkQ1FVRm5RaXhGUVVGRkxGTkJRVk1zUlVGQlJTd3dRa0ZCTUVJc1JVRkJSU3hYUVVGWExFVkJRVVVzY1VKQlFYRkNMRVZCUVVVc1MwRkJTeXhGUVVGRkxEQkNRVUV3UWl4RlFVRkZPMmRDUVVNeFNTeEZRVUZGTEUxQlFVMHNSVUZCUlN4VlFVRlZMRVZCUVVVc1UwRkJVeXhGUVVGRkxEQkNRVUV3UWl4RlFVRkZMRmRCUVZjc1JVRkJSU3h4UWtGQmNVSXNSVUZCUlN4TFFVRkxMRVZCUVVVc01FSkJRVEJDTEVWQlFVVTdaMEpCUTNCSkxFVkJRVVVzVFVGQlRTeEZRVUZGTEc5Q1FVRnZRaXhGUVVGRkxGTkJRVk1zUlVGQlJTd3dRa0ZCTUVJc1JVRkJSU3hYUVVGWExFVkJRVVVzY1VKQlFYRkNMRVZCUVVVc1MwRkJTeXhGUVVGRkxEQkNRVUV3UWl4RlFVRkZPMkZCUVVNc1EwRkJRenRaUVVOd1NpeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMRFpEUVVFeVFpeERRVUZETEZOQlFWTXNSVUZCUlN4UlFVRlJMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMnBGTEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc05rTkJRVEpDTEVOQlFVTXNVVUZCVVN4RlFVRkZMRkZCUVZFc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRGFFVXNTMEZCU3l4RFFVRkRMRkZCUVZFc1EwRkJReXcyUTBGQk1rSXNRMEZCUXl4UlFVRlJMRVZCUVVVc1VVRkJVU3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU5vUlN4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExHMURRVUZwUWl4RlFVRkZMRU5CUVVNc1EwRkJRenRaUVVOd1F5eEpRVUZKTEZsQlFWa3NSMEZCUnl4UlFVRlJMRVZCUVVVc1EwRkJRenRaUVVNNVFpeGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMRmxCUVZrc1JVRkJSU3hGUVVGRkxFTkJRVU1zUTBGQlF6dFJRVU0zUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOUUxFTkJRVU1zUTBGQlF5eERRVUZETzBsQlEwZ3NVVUZCVVN4RFFVRkRMSEZDUVVGeFFpeEZRVUZGTzFGQlF6VkNMRWxCUVVrc1MwRkJiVUlzUTBGQlF6dFJRVU40UWl4SlFVRkpMR0ZCUVRaRExFTkJRVU03VVVGRGJFUXNWVUZCVlN4RFFVRkRPMWxCUTFBc1MwRkJTeXhIUVVGSExGRkJRVkVzUlVGQlJTeERRVUZETzFsQlEyNUNMR0ZCUVdFc1IwRkJSeXhqUVVGTkxFOUJRVUVzUzBGQlN5eERRVUZETEZGQlFWRXNSVUZCUlN4RFFVRkRMR0ZCUVdFc1JVRkJPVUlzUTBGQk9FSXNRMEZCUXp0UlFVTjZSQ3hEUVVGRExFTkJRVU1zUTBGQlFUdFJRVU5HTEVWQlFVVXNRMEZCUXl4dFFrRkJiVUlzUlVGQlJUdFpRVU53UWl4aFFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExHRkJRV0VzUlVGQlJTeERRVUZETEUxQlFVMHNSVUZCUlN4RlFVRkZMRU5CUVVNc1EwRkJRenRaUVVOdVJDeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMQ3RDUVVGUkxFTkJRVU1zV1VGQldTeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTjJReXhoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEdGQlFXRXNSVUZCUlN4RFFVRkRMRTFCUVUwc1JVRkJSU3hEUVVGRExGbEJRVmtzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZETDBRc1MwRkJTeXhEUVVGRExGRkJRVkVzUTBGQlF5d3JRa0ZCVVN4RFFVRkRMR1ZCUVdVc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRE1VTXNZVUZCVFN4RFFVRkRMR1ZCUVdVc1EwRkJReXhoUVVGaExFVkJRVVVzUTBGQlF5eE5RVUZOTEVWQlFVVXNRMEZCUXl4WlFVRlpMRVZCUVVVc1pVRkJaU3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU53Uml4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5eHhRMEZCY1VNc1JVRkJSVHRaUVVOMFF5eExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMQ3RDUVVGUkxFTkJRVU1zV1VGQldTeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTjJReXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEN0Q1FVRlJMRU5CUVVNc1pVRkJaU3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU14UXl4aFFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExHRkJRV0VzUlVGQlJTeERRVUZETEUxQlFVMHNSVUZCUlN4RFFVRkRMRmxCUVZrc1JVRkJSU3hsUVVGbExFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEyaEdMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zYTBOQlFWY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJReTlDTEdGQlFVMHNRMEZCUXl4bFFVRmxMRU5CUVVNc1lVRkJZU3hGUVVGRkxFTkJRVU1zVFVGQlRTeEZRVUZGTEVOQlFVTXNXVUZCV1N4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVNdlJDeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMR3REUVVGWExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUVR0WlFVTTVRaXhoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEdGQlFXRXNSVUZCUlN4RFFVRkRMRTFCUVUwc1JVRkJSU3hGUVVGRkxFTkJRVU1zUTBGQlF6dFJRVU4yUkN4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5eHhRa0ZCY1VJc1JVRkJSVHRaUVVOMFFpeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMQ3RDUVVGUkxFTkJRVU1zV1VGQldTeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTjJReXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEN0Q1FVRlJMRU5CUVVNc1pVRkJaU3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU14UXl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExHdERRVUZYTEVWQlFVVXNRMEZCUXl4RFFVRkRPMWxCUXpsQ0xHRkJRVTBzUTBGQlF5eGxRVUZsTEVOQlFVTXNZVUZCWVN4RlFVRkZMRU5CUVVNc1RVRkJUU3hGUVVGRkxFVkJRVVVzUTBGQlF5eERRVUZETzFGQlEzWkVMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzUlVGQlJTeERRVUZETEdsQ1FVRnBRaXhGUVVGRk8xbEJRMnhDTEdGQlFVMHNRMEZCUXl4bFFVRmxMRU5CUVVNc1lVRkJZU3hGUVVGRkxFTkJRVU1zUzBGQlN5eEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkRPMWxCUTJ4RUxFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNPRUpCUVU4c1EwRkJReXhYUVVGWExFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEzSkRMR0ZCUVUwc1EwRkJReXhsUVVGbExFTkJRVU1zWVVGQllTeEZRVUZGTEVOQlFVTXNTMEZCU3l4RlFVRkZMRU5CUVVNc1YwRkJWeXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU0zUkN4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExEaENRVUZQTEVOQlFVTXNZMEZCWXl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVONFF5eGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMR0ZCUVdFc1JVRkJSU3hEUVVGRExFdEJRVXNzUlVGQlJTeERRVUZETEZkQlFWY3NSVUZCUlN4alFVRmpMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMnBHTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1JVRkJSU3hEUVVGRExHMURRVUZ0UXl4RlFVRkZPMWxCUTNCRExFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNPRUpCUVU4c1EwRkJReXhYUVVGWExFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEzSkRMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zT0VKQlFVOHNRMEZCUXl4alFVRmpMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRM2hETEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc2FVTkJRVlVzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUXpsQ0xHRkJRVTBzUTBGQlF5eGxRVUZsTEVOQlFVTXNZVUZCWVN4RlFVRkZMRU5CUVVNc1MwRkJTeXhGUVVGRkxFTkJRVU1zVjBGQlZ5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTTNSQ3hMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEdsRFFVRlZMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU01UWl4aFFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExHRkJRV0VzUlVGQlJTeERRVUZETEV0QlFVc3NSVUZCUlN4RlFVRkZMRU5CUVVNc1EwRkJRenRSUVVOMFJDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXh2UWtGQmIwSXNSVUZCUlR0WlFVTnlRaXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETERoQ1FVRlBMRU5CUVVNc1YwRkJWeXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU55UXl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExEaENRVUZQTEVOQlFVTXNZMEZCWXl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVONFF5eExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMR2xEUVVGVkxFVkJRVVVzUTBGQlF5eERRVUZETzFsQlF6ZENMR0ZCUVUwc1EwRkJReXhsUVVGbExFTkJRVU1zWVVGQllTeEZRVUZGTEVOQlFVTXNTMEZCU3l4RlFVRkZMRVZCUVVVc1EwRkJReXhEUVVGRE8xRkJRM1JFTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTFBc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFNDeFJRVUZSTEVOQlFVTXNaVUZCWlN4RlFVRkZPMUZCUTNSQ0xFbEJRVWtzUzBGQmJVSXNRMEZCUXp0UlFVTjRRaXhKUVVGSkxFOUJRV2xETEVOQlFVTTdVVUZEZEVNc1ZVRkJWU3hEUVVGRE8xbEJRMUFzUzBGQlN5eEhRVUZITEZGQlFWRXNSVUZCUlN4RFFVRkRPMWxCUTI1Q0xFOUJRVThzUjBGQlJ5eGpRVUZOTEU5QlFVRXNTMEZCU3l4RFFVRkRMRkZCUVZFc1JVRkJSU3hEUVVGRExFOUJRVThzUlVGQmVFSXNRMEZCZDBJc1EwRkJRenRSUVVNM1F5eERRVUZETEVOQlFVTXNRMEZCUVR0UlFVTkdMRVZCUVVVc1EwRkJReXd3UWtGQk1FSXNSVUZCUlR0WlFVTXpRaXhoUVVGTkxFTkJRVU1zVFVGQlRTeERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xbEJRemxDTEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc2EwTkJRV2xDTEVWQlFVVXNRMEZCUXl4RFFVRkRPMWxCUTNCRExHRkJRVTBzUTBGQlF5eFBRVUZQTEVOQlFVTXNUMEZCVHl4RlFVRkZMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03V1VGREwwSXNTMEZCU3l4RFFVRkRMRkZCUVZFc1EwRkJReXhyUTBGQmFVSXNSVUZCUlN4RFFVRkRMRU5CUVVNN1dVRkRjRU1zWVVGQlRTeERRVUZETEUxQlFVMHNRMEZCUXl4UFFVRlBMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFpRVU01UWl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExHdERRVUZwUWl4RlFVRkZMRU5CUVVNc1EwRkJRenRaUVVOd1F5eGhRVUZOTEVOQlFVTXNUMEZCVHl4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFGQlEyNURMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMUFzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEU0N4UlFVRlJMRU5CUVVNc1kwRkJZeXhGUVVGRk8xRkJRM0pDTEVsQlFVa3NTMEZCYlVJc1EwRkJRenRSUVVONFFpeEpRVUZKTEUxQlFTdENMRU5CUVVNN1VVRkRjRU1zVlVGQlZTeERRVUZETzFsQlExQXNTMEZCU3l4SFFVRkhMRkZCUVZFc1JVRkJSU3hEUVVGRE8xbEJRMjVDTEUxQlFVMHNSMEZCUnl4alFVRk5MRTlCUVVFc1MwRkJTeXhEUVVGRExGRkJRVkVzUlVGQlJTeERRVUZETEUxQlFVMHNSVUZCZGtJc1EwRkJkVUlzUTBGQlF6dFJRVU16UXl4RFFVRkRMRU5CUVVNc1EwRkJRVHRSUVVOR0xFVkJRVVVzUTBGQlF5eHhSRUZCY1VRc1JVRkJSVHRaUVVOMFJDeGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMRTFCUVUwc1JVRkJSU3hGUVVGRk8yZENRVU0zUWl4RlFVRkZMRVZCUVVVc1NVRkJTVHRuUWtGRFVpeFRRVUZUTEVWQlFVVXNTMEZCU3p0blFrRkRhRUlzYlVKQlFXMUNMRVZCUVVVc1JVRkJSVHRoUVVNeFFpeERRVUZETEVOQlFVTTdXVUZEU0N4SlFVRkpMRkZCUVZFc1IwRkJNRUlzWTBGQll5eEZRVUZGTEVOQlFVTTdXVUZEZGtRc1MwRkJTeXhEUVVGRExGRkJRVkVzUTBGQlF5dzJRa0ZCWVN4RFFVRkRMRkZCUVZFc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRGVFTXNZVUZCVFN4RFFVRkRMR1ZCUVdVc1EwRkJReXhOUVVGTkxFVkJRVVVzUlVGQlJUdG5Ra0ZETjBJc1JVRkJSU3hGUVVGRkxGRkJRVkU3WjBKQlExb3NVMEZCVXl4RlFVRkZMRXRCUVVzN1owSkJRMmhDTEcxQ1FVRnRRaXhGUVVGRkxFVkJRVVU3WVVGRE1VSXNRMEZCUXl4RFFVRkRPMWxCUTBnc1VVRkJVU3hEUVVGRExFdEJRVXNzUlVGQlJTeERRVUZETzFGQlEzSkNMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzUlVGQlJTeERRVUZETEcxRFFVRnRReXhGUVVGRk8xbEJRM0JETEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc2EwTkJRV3RDTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVONlF5eGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMRTFCUVUwc1JVRkJSU3hGUVVGRk8yZENRVU0zUWl4RlFVRkZMRVZCUVVVc1NVRkJTVHRuUWtGRFVpeFRRVUZUTEVWQlFVVXNTVUZCU1R0blFrRkRaaXh0UWtGQmJVSXNSVUZCUlN4RlFVRkZPMkZCUXpGQ0xFTkJRVU1zUTBGQlF6dFpRVU5JTEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc2EwTkJRV3RDTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVNeFF5eGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMRTFCUVUwc1JVRkJSU3hGUVVGRk8yZENRVU0zUWl4RlFVRkZMRVZCUVVVc1NVRkJTVHRuUWtGRFVpeFRRVUZUTEVWQlFVVXNTMEZCU3p0blFrRkRhRUlzYlVKQlFXMUNMRVZCUVVVc1JVRkJSVHRoUVVNeFFpeERRVUZETEVOQlFVTTdVVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5eHRRMEZCYlVNc1JVRkJSVHRaUVVOd1F5eEpRVUZKTEUxQlFVMHNSMEZCWVN4RFFVRkRMR1ZCUVdVc1JVRkJSU3huUWtGQlowSXNRMEZCUXl4RFFVRkRPMWxCUXpORUxFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNkVU5CUVhWQ0xFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTm9SQ3hoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEUxQlFVMHNSVUZCUlN4RlFVRkZPMmRDUVVNM1FpeEZRVUZGTEVWQlFVVXNTVUZCU1R0blFrRkRVaXhUUVVGVExFVkJRVVVzUzBGQlN6dG5Ra0ZEYUVJc2JVSkJRVzFDTEVWQlFVVXNUVUZCVFR0aFFVTTVRaXhEUVVGRExFTkJRVU03VVVGRFVDeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTlFMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMGdzVVVGQlVTeERRVUZETEd0Q1FVRnJRaXhGUVVGRk8xRkJRM3BDTEVsQlFVa3NTMEZCYlVJc1EwRkJRenRSUVVONFFpeEpRVUZKTEZOQlFYRkRMRU5CUVVNN1VVRkRNVU1zVlVGQlZTeERRVUZETzFsQlExQXNTMEZCU3l4SFFVRkhMRkZCUVZFc1JVRkJSU3hEUVVGRE8xbEJRMjVDTEZOQlFWTXNSMEZCUnl4alFVRk5MRTlCUVVFc1MwRkJTeXhEUVVGRExGRkJRVkVzUlVGQlJTeERRVUZETEZOQlFWTXNSVUZCTVVJc1EwRkJNRUlzUTBGQlF6dFJRVU5xUkN4RFFVRkRMRU5CUVVNc1EwRkJRVHRSUVVOR0xFVkJRVVVzUTBGQlF5eHhRa0ZCY1VJc1JVRkJSVHRaUVVOMFFpeEpRVUZKTEV0QlFVc3NSMEZCYlVJN1owSkJRM2hDTEdWQlFXVXNSVUZCUlR0dlFrRkRZaXhKUVVGSkxFVkJRVVVzVFVGQlRUdHZRa0ZEV2l4SlFVRkpMRVZCUVVVc1YwRkJWenRwUWtGRGNFSTdaMEpCUTBRc1owSkJRV2RDTEVWQlFVVTdiMEpCUTJRc1NVRkJTU3hGUVVGRkxFOUJRVTg3YjBKQlEySXNTVUZCU1N4RlFVRkZMR05CUVdNN2FVSkJRM1pDTzJkQ1FVTkVMR2RDUVVGblFpeEZRVUZGTzI5Q1FVTmtMRWxCUVVrc1JVRkJSU3hQUVVGUE8yOUNRVU5pTEVsQlFVa3NSVUZCUlN4WFFVRlhPMmxDUVVOd1FqdGhRVU5LTEVOQlFVRTdXVUZEUkN4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExEaENRVUZYTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOdVF5eGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMRk5CUVZNc1JVRkJSU3hGUVVGRkxFdEJRVXNzUTBGQlF5eERRVUZETzFGQlF5OURMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMUFzUTBGQlF5eERRVUZETEVOQlFVTTdRVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJReUo5IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3MtbW9jay1hZGFwdGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJjcnlwdGpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoYWlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29tcHJlc3Npb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29ubmVjdC1tb25nb1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb29raWUtcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNzdXJmXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzcy1zZXNzaW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhlbG1ldFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb2NoYVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtdXN0YWNoZS1leHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtbG9nZ2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LW1vY2stc3RvcmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtdGh1bmtcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic29ja2V0LmlvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNvY2tldC5pby1jbGllbnRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3VwZXJ0ZXN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInN1cGVydGVzdC1zZXNzaW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInZhbGlkYXRvclwiKTsiXSwic291cmNlUm9vdCI6IiJ9