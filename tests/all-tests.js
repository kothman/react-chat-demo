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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXplZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvbWlkZGxld2FyZS9hdXRob3JpemVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkNBQXNDO0FBR3RDLElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNwQyxtQkFBd0IsR0FBWSxFQUFFLEdBQW1CLEVBQUUsSUFBYztJQUNyRSxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDL0QsSUFBSSxDQUFDLEtBQUs7UUFDTixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQztJQUU3RCxxQkFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLFVBQUMsR0FBVSxFQUFFLE9BQWM7UUFDakQsSUFBSSxHQUFHO1lBQUUsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7UUFDbEUsR0FBRyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7UUFDbkIsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUNsQixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFWRCwrQkFVQyJ9

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmVyL3NvY2tldC5pby9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9DQUFzQztBQUd0Qyw2Q0FBc0Q7QUFFdEQsdURBQTREO0FBRTVELElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQU1wQyxJQUFNLElBQUksR0FBRyxVQUFDLE1BQWMsRUFBRSxFQUFjLEVBQUUsaUJBQXNCO0lBQ2hFLElBQU0sRUFBRSxHQUFvQixRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0MsSUFBSSxtQkFBbUIsR0FBYSxFQUFFLENBQUM7SUFFdkMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFDLE1BQU0sRUFBRSxJQUFJO1FBQ2hCLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFDLE1BQU0sRUFBRSxJQUFJO1FBRWhCLHVCQUFvQixDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25ELENBQUMsQ0FBQyxDQUFBO0lBR0YsRUFBRSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBQyxNQUFjO1FBQy9CLG1CQUFtQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLG1CQUFtQixDQUFDLENBQUM7UUFDcEQsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBRWhELE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFO1lBQ3BCLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEYsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3BELENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBQyxPQUEwQztZQUM1RCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxHQUFhLElBQUksb0JBQU8sQ0FBQztnQkFDMUIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO2dCQUN4QixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7Z0JBQ2xCLFNBQVMsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLO2FBQ3ZDLENBQUMsQ0FBQztZQUNILENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFXO2dCQUN0QixFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtvQkFDZixHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUc7b0JBQ1YsU0FBUyxFQUFFLENBQUMsQ0FBQyxTQUFTO29CQUN0QixJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7b0JBQ1osT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPO29CQUNsQixPQUFPLEVBQUUsQ0FBQyxDQUFDLFNBQVM7aUJBQ3ZCLENBQUMsQ0FBQztnQkFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLENBQUMsT0FBSyxDQUFBLENBQUMsVUFBQyxHQUFVO2dCQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzlDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sRUFBRSxDQUFDO0FBQ2QsQ0FBQyxDQUFBO0FBRUQscUJBQWUsSUFBSSxDQUFDIn0=

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdEFzeW5jQWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Rlc3RzL3dlYi90ZXN0QXN5bmNBY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUJBQWU7QUFDZiwrQkFBMEI7QUFDMUIsNkJBQThCO0FBQzlCLHlEQUE2QztBQUM3QyxxREFBc0Y7QUFDdEYsMkNBQStCO0FBQy9CLGlFQUEySTtBQUUzSSxtRkFBb0c7QUFFcEcscUVBQXNHO0FBQ3RHLHlFQUFvUjtBQUNwUiwyRUFBb0Y7QUFJcEYsSUFBTSxnQkFBZ0IsR0FBcUIsNkJBQWMsQ0FBQyxDQUFDLHdCQUFLLENBQUMsQ0FBQyxDQUFDO0FBRW5FLFNBQVMsUUFBUSxDQUFDLEtBQVU7SUFBVixzQkFBQSxFQUFBLFVBQVU7SUFDeEIsT0FBTyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBRUQsUUFBUSxDQUFDLGVBQWUsRUFBRTtJQUN0QixJQUFJLFNBQXFDLENBQUM7SUFDMUMsSUFBSSxTQUFzQixDQUFDO0lBRTNCLE1BQU0sQ0FBQztRQUNILFNBQVMsR0FBRyxJQUFJLCtCQUFXLENBQUMsa0JBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBRUgsS0FBSyxDQUFDO1FBQ0YsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLG9CQUFvQixFQUFFO1FBQzNCLFVBQVUsQ0FBQztZQUNQLFNBQVMsR0FBRyxRQUFRLEVBQUUsQ0FBQztZQUN2QixTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbEIsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDcEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxRQUFRLENBQUMsWUFBWSxFQUFFO1lBQ25CLEVBQUUsQ0FBQyxzQ0FBc0MsRUFBRSxVQUFVLElBQUk7Z0JBQ3JELElBQUksSUFBSSxHQUFtQixLQUFLLENBQUM7Z0JBQ2pDLFNBQVM7cUJBQ0osUUFBUSxDQUFDLHdCQUFVLENBQUMsUUFBUSxFQUFFLGNBQU0sT0FBQSxJQUFJLEdBQUcsUUFBUSxFQUFmLENBQWUsQ0FBQyxDQUFDO3FCQUNyRCxJQUFJLENBQUM7b0JBQ0YsYUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ25DLElBQU0sT0FBTyxHQUFnQixTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ3BELGFBQU0sQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUM7NEJBQzdCLElBQUksRUFBRSwrQkFBUTs0QkFDZCxJQUFJLEVBQUUsY0FBYzt5QkFDdkIsQ0FBQyxDQUFDLENBQUM7b0JBQ0osSUFBSSxFQUFFLENBQUM7Z0JBQ1gsQ0FBQyxDQUFDLENBQUMsT0FBSyxDQUFBLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUM7WUFDSCxFQUFFLENBQUMsdUNBQXVDLEVBQUUsVUFBVSxJQUFJO2dCQUN0RCxJQUFJLElBQUksR0FBbUIsS0FBSyxDQUFDO2dCQUNqQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2xCLFNBQVMsQ0FBQyxNQUFNLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLHNCQUFzQixFQUFFLENBQUMsQ0FBQztnQkFDM0YsU0FBUztxQkFDSixRQUFRLENBQUMsd0JBQVUsQ0FBQyxRQUFRLEVBQUUsY0FBTSxPQUFBLElBQUksR0FBRyxRQUFRLEVBQWYsQ0FBZSxDQUFDLENBQUM7cUJBQ3JELElBQUksQ0FBQztvQkFDRixhQUFNLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDaEMsSUFBTSxPQUFPLEdBQWdCLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDcEQsYUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0QkFDN0IsSUFBSSxFQUFFLGdDQUFTOzRCQUNmLElBQUksRUFBRSxzQkFBc0I7eUJBQy9CLENBQUMsQ0FBQyxDQUFDO29CQUNKLElBQUksRUFBRSxDQUFDO2dCQUNYLENBQUMsQ0FBQyxDQUFDLE9BQUssQ0FBQSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsYUFBYSxFQUFFO1lBQ3BCLEVBQUUsQ0FBQyx1Q0FBdUMsRUFBRSxVQUFVLElBQUk7Z0JBQ3RELElBQUksS0FBSyxHQUFtQixLQUFLLENBQUM7Z0JBQ2xDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDbEIsU0FBUyxDQUFDLE1BQU0sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO2dCQUM1RixTQUFTO3FCQUNKLFFBQVEsQ0FBQyx5QkFBVyxDQUFDLGVBQWUsRUFBRSxjQUFNLE9BQUEsS0FBSyxHQUFHLGVBQWUsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDO3FCQUNyRSxJQUFJLENBQUM7b0JBQ0YsYUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDdEIsSUFBTSxPQUFPLEdBQWdCLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDcEQsYUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0QkFDN0IsSUFBSSxFQUFFLGdDQUFTOzRCQUNmLElBQUksRUFBRSxzQkFBc0I7eUJBQy9CLENBQUMsQ0FBQyxDQUFDO29CQUNKLElBQUksRUFBRSxDQUFDO2dCQUNYLENBQUMsQ0FBQyxDQUNELE9BQUssQ0FBQSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsRUFBRSxDQUFDLHFDQUFxQyxFQUFFLFVBQVMsSUFBSTtnQkFDbkQsSUFBSSxLQUFLLEdBQW1CLEtBQUssQ0FBQztnQkFDbEMsU0FBUztxQkFDSixRQUFRLENBQUMseUJBQVcsQ0FBQyxlQUFlLEVBQUUsY0FBTSxPQUFBLEtBQUssR0FBRyxlQUFlLEVBQXZCLENBQXVCLENBQUMsQ0FBQztxQkFDckUsSUFBSSxDQUFDO29CQUNGLGFBQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDO29CQUMzQyxJQUFNLE9BQU8sR0FBZ0IsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUNwRCxhQUFNLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUM3QixJQUFJLEVBQUUsK0JBQVE7NEJBQ2QsSUFBSSxFQUFFLGVBQWU7eUJBQ3hCLENBQUMsQ0FBQyxDQUFDO29CQUNKLElBQUksRUFBRSxDQUFDO2dCQUNYLENBQUMsQ0FBQyxDQUNELE9BQUssQ0FBQSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxRQUFRLENBQUMsZ0JBQWdCLEVBQUU7WUFDdkIsRUFBRSxDQUFDLGlCQUFpQixFQUFFLFVBQVMsSUFBSTtnQkFDL0IsSUFBSSxPQUFPLEdBQVksS0FBSyxDQUFDO2dCQUM3QixTQUFTLENBQUMsUUFBUSxDQUFDLDRCQUFjLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxjQUFNLE9BQUEsT0FBTyxHQUFHLElBQUksRUFBZCxDQUFjLENBQUMsQ0FBQztxQkFDN0QsSUFBSSxDQUFDO29CQUNGLGFBQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3ZCLElBQU0sT0FBTyxHQUFnQixTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ3BELGFBQU0sQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUM7NEJBQzdCLElBQUksRUFBRSwrQkFBUTs0QkFDZCxJQUFJLEVBQUUsa0JBQWtCO3lCQUMzQixDQUFDLENBQUMsQ0FBQztvQkFDSixJQUFJLEVBQUUsQ0FBQztnQkFDWCxDQUFDLENBQUMsQ0FDRCxPQUFLLENBQUEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQztZQUNILEVBQUUsQ0FBQyx1Q0FBdUMsRUFBRSxVQUFTLElBQUk7Z0JBQ3JELElBQUksT0FBTyxHQUFZLEtBQUssQ0FBQztnQkFDN0IsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNsQixTQUFTLENBQUMsTUFBTSxDQUFDLDhCQUE4QixDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxzQkFBc0IsRUFBRSxDQUFDLENBQUM7Z0JBQy9GLFNBQVMsQ0FBQyxRQUFRLENBQUMsNEJBQWMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLGNBQU0sT0FBQSxPQUFPLEdBQUcsSUFBSSxFQUFkLENBQWMsQ0FBQyxDQUFDO3FCQUM3RCxJQUFJLENBQUM7b0JBQ0YsYUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDeEIsSUFBTSxPQUFPLEdBQWdCLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDcEQsYUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0QkFDN0IsSUFBSSxFQUFFLGdDQUFTOzRCQUNmLElBQUksRUFBRSxzQkFBc0I7eUJBQy9CLENBQUMsQ0FBQyxDQUFDO29CQUNKLElBQUksRUFBRSxDQUFDO2dCQUNYLENBQUMsQ0FBQyxDQUNELE9BQUssQ0FBQSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JCLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFDSCxRQUFRLENBQUMsWUFBWSxFQUFFO1lBQ25CLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxVQUFTLElBQUk7Z0JBQzFDLFNBQVM7cUJBQ0osUUFBUSxDQUFDLHdCQUFVLENBQUMsTUFBTSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDO3FCQUN0RCxJQUFJLENBQUM7b0JBQ0YsSUFBTSxPQUFPLEdBQWdCLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDcEQsYUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyw4QkFBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMvRCxJQUFJLEVBQUUsQ0FBQztnQkFDWCxDQUFDLENBQUMsQ0FBQyxPQUFLLENBQUEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztZQUNILEVBQUUsQ0FBQyw2QkFBNkIsRUFBRSxVQUFTLElBQUk7Z0JBQzNDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDbEIsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBQyxLQUFLLEVBQUUsc0JBQXNCLEVBQUMsQ0FBQyxDQUFDO2dCQUM5RCxTQUFTO3FCQUNKLFFBQVEsQ0FBQyx3QkFBVSxDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQztxQkFDdEQsSUFBSSxDQUFDO29CQUNGLElBQU0sT0FBTyxHQUFnQixTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ3BELGFBQU0sQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUMsK0JBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEUsSUFBSSxFQUFFLENBQUM7Z0JBQ1gsQ0FBQyxDQUFDLENBQUMsT0FBSyxDQUFBLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILFFBQVEsQ0FBQyxVQUFVLEVBQUU7WUFDakIsRUFBRSxDQUFDLDRCQUE0QixFQUFFLFVBQVMsSUFBSTtnQkFDMUMsU0FBUztxQkFDSixRQUFRLENBQUMsc0JBQVEsQ0FBQyxtQkFBbUIsRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQUM7cUJBQ3pFLElBQUksQ0FBQztvQkFDRixJQUFNLE9BQU8sR0FBZ0IsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUNwRCxhQUFNLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDLDhCQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1RCxJQUFJLEVBQUUsQ0FBQztnQkFDWCxDQUFDLENBQUMsQ0FBQyxPQUFLLENBQUEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztZQUNILEVBQUUsQ0FBQyw2QkFBNkIsRUFBRSxVQUFTLElBQUk7Z0JBQzNDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDbEIsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRSxTQUFTO3FCQUNKLFFBQVEsQ0FBQyxzQkFBUSxDQUFDLG1CQUFtQixFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQztxQkFDekUsSUFBSSxDQUFDO29CQUNGLElBQU0sT0FBTyxHQUFnQixTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ3BELGFBQU0sQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUMsK0JBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEUsSUFBSSxFQUFFLENBQUM7Z0JBQ1gsQ0FBQyxDQUFDLENBQUMsT0FBSyxDQUFBLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILFFBQVEsQ0FBQyxZQUFZLEVBQUU7WUFDbkIsRUFBRSxDQUFDLDRCQUE0QixFQUFFLFVBQVMsSUFBSTtnQkFDMUMsU0FBUztxQkFDSixRQUFRLENBQUMsd0JBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztxQkFDckMsSUFBSSxDQUFDO29CQUNGLElBQU0sT0FBTyxHQUFnQixTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ3BELGFBQU0sQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUMsOEJBQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzNELElBQUksRUFBRSxDQUFDO2dCQUNYLENBQUMsQ0FBQyxDQUFDLE9BQUssQ0FBQSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsRUFBRSxDQUFDLDZCQUE2QixFQUFFLFVBQVMsSUFBSTtnQkFDM0MsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNsQixTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxzQkFBc0IsRUFBRSxDQUFDLENBQUM7Z0JBQ2hFLFNBQVM7cUJBQ0osUUFBUSxDQUFDLHdCQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7cUJBQ3JDLElBQUksQ0FBQztvQkFDRixJQUFNLE9BQU8sR0FBZ0IsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUNwRCxhQUFNLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDLCtCQUFRLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BFLElBQUksRUFBRSxDQUFDO2dCQUNYLENBQUMsQ0FBQyxDQUFDLE9BQUssQ0FBQSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxRQUFRLENBQUMsYUFBYSxFQUFFO1lBQ3BCLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxVQUFTLElBQUk7Z0JBQzFDLFNBQVM7cUJBQ0osUUFBUSxDQUFDLHlCQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7cUJBQ3RDLElBQUksQ0FBQztvQkFDRixJQUFNLE9BQU8sR0FBZ0IsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUNwRCxhQUFNLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDLDhCQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1RCxJQUFJLEVBQUUsQ0FBQztnQkFDWCxDQUFDLENBQUMsQ0FBQyxPQUFLLENBQUEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztZQUNILEVBQUUsQ0FBQyw2QkFBNkIsRUFBRSxVQUFTLElBQUk7Z0JBQzNDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDbEIsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRSxTQUFTO3FCQUNKLFFBQVEsQ0FBQyx5QkFBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO3FCQUN0QyxJQUFJLENBQUM7b0JBQ0YsSUFBTSxPQUFPLEdBQWdCLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDcEQsYUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQywrQkFBUSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwRSxJQUFJLEVBQUUsQ0FBQztnQkFDWCxDQUFDLENBQUMsQ0FBQyxPQUFLLENBQUEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDSCxRQUFRLENBQUMsd0JBQXdCLEVBQUU7UUFDL0IsVUFBVSxDQUFDO1lBR1AsU0FBUyxHQUFHLGdCQUFnQixDQUFDO2dCQUN6QixRQUFRLEVBQUU7b0JBQ04sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLHNCQUFzQixFQUFFLENBQUMsRUFBRTtvQkFDakcsRUFBRSxJQUFJLEVBQUUsdUJBQXVCLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUU7b0JBQ25GLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLG1CQUFtQixFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFO2lCQUNuRjthQUNKLENBQUMsQ0FBQztZQUNILFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNsQixTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQywrRUFBK0UsRUFBRSxVQUFTLElBQUk7WUFDN0YsSUFBSSxRQUFRLEdBQWtDO2dCQUMxQyxFQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQztnQkFDM0IsRUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUM7Z0JBQzFCLEVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUM7YUFBQyxDQUFDO1lBQ3hDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNsQixTQUFTO2lCQUNKLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQztpQkFDekIsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDO1lBQ3RDLFNBQVM7aUJBQ0osUUFBUSxDQUFDLCtCQUFhLEVBQUUsQ0FBQztpQkFDekIsSUFBSSxDQUFDO2dCQUNGLElBQU0sT0FBTyxHQUFnQixTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3BELElBQU0saUJBQWlCLEdBQUcsNkJBQVcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO2dCQUMvRSxhQUFNLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztnQkFDckQsSUFBSSxFQUFFLENBQUM7WUFDWCxDQUFDLENBQUMsQ0FBQyxPQUFLLENBQUEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN0QixDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxnRUFBZ0UsRUFBRSxVQUFTLElBQUk7WUFDOUUsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2xCLFNBQVM7aUJBQ0osS0FBSyxDQUFDLGtCQUFrQixDQUFDO2lCQUN6QixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEIsU0FBUztpQkFDSixRQUFRLENBQUMsK0JBQWEsRUFBRSxDQUFDO2lCQUN6QixJQUFJLENBQUM7Z0JBQ0YsSUFBTSxPQUFPLEdBQWdCLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDcEQsSUFBTSxXQUFXLEdBQUcsK0JBQVEsQ0FBQyx5REFBeUQsQ0FBQyxDQUFDO2dCQUN4RixhQUFNLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLElBQUksRUFBRSxDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUMsT0FBSyxDQUFBLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsMkVBQTJFLEVBQUUsVUFBUyxJQUFJO1lBQ3pGLFNBQVM7aUJBQ0osUUFBUSxDQUFDLHlDQUF1QixDQUFDLGNBQWMsQ0FBQyxDQUFDO2lCQUM3QyxJQUFJLENBQUMsVUFBQyxHQUFXO2dCQUNkLGFBQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLHFHQUFxRyxDQUFDLENBQUM7Z0JBQy9ILElBQU0sT0FBTyxHQUFnQixTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3BELElBQU0sV0FBVyxHQUFHLCtCQUFRLENBQUMscURBQXFELENBQUMsQ0FBQztnQkFDcEYsYUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxJQUFJLEVBQUUsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFDLE9BQUssQ0FBQSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLGlFQUFpRSxFQUFFLFVBQVMsSUFBSTtZQUMvRSxTQUFTO2lCQUNKLFFBQVEsQ0FBQyx5Q0FBdUIsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2lCQUMxRCxJQUFJLENBQUMsVUFBQyxHQUFXO2dCQUNkLGFBQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLHFHQUFxRyxDQUFDLENBQUM7Z0JBQy9ILElBQU0sT0FBTyxHQUFnQixTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3BELElBQU0sV0FBVyxHQUFHLCtCQUFRLENBQUMscURBQXFELENBQUMsQ0FBQztnQkFDcEYsYUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxJQUFJLEVBQUUsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFDLE9BQUssQ0FBQSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLGtFQUFrRSxFQUFFLFVBQVMsSUFBSTtZQUNoRixTQUFTO2lCQUNKLFFBQVEsQ0FBQyx5Q0FBdUIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2lCQUNyRCxJQUFJLENBQUMsVUFBQyxHQUFXO2dCQUNkLGFBQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLHFHQUFxRyxDQUFDLENBQUM7Z0JBQy9ILElBQU0sT0FBTyxHQUFnQixTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3BELElBQU0sV0FBVyxHQUFHLCtCQUFRLENBQUMscURBQXFELENBQUMsQ0FBQztnQkFDcEYsYUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxJQUFJLEVBQUUsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFDLE9BQUssQ0FBQSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLHFFQUFxRSxFQUFFLFVBQVMsSUFBSTtZQUNuRixTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbEIsU0FBUztpQkFDSixLQUFLLEVBQUU7aUJBQ1AsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLElBQUksT0FBTyxHQUFXLFNBQVMsQ0FBQztZQUNoQyxTQUFTO2lCQUNKLFFBQVEsQ0FBQyx5Q0FBdUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDMUMsSUFBSSxDQUFDO2dCQUNGLElBQU0sT0FBTyxHQUFnQixTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3BELElBQU0scUJBQXFCLEdBQUcsK0NBQTZCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUMzRSxJQUFNLFdBQVcsR0FBRywrQkFBUSxDQUFDLHFEQUFxRCxDQUFDLENBQUM7Z0JBQ3BGLElBQU0sc0JBQXNCLEdBQUcsK0NBQTZCLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUM3RSxhQUFNLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDLHFCQUFxQixFQUFFLFdBQVcsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7Z0JBQzlGLElBQUksRUFBRSxDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUMsT0FBSyxDQUFBLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsZ0VBQWdFLEVBQUUsVUFBUyxJQUFJO1lBQzlFLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNsQixTQUFTO2lCQUNKLEtBQUssRUFBRTtpQkFDUCxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBQyxDQUFDLENBQUM7WUFDakMsSUFBSSxPQUFPLEdBQVcsU0FBUyxDQUFDO1lBQ2hDLFNBQVM7aUJBQ0osUUFBUSxDQUFDLHlDQUF1QixDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUMxQyxJQUFJLENBQUM7Z0JBQ0YsSUFBTSxPQUFPLEdBQWdCLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDcEQsSUFBTSxxQkFBcUIsR0FBRywrQ0FBNkIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzNFLElBQU0sZ0JBQWdCLEdBQUcsMkNBQXlCLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNuRSxJQUFNLHNCQUFzQixHQUFHLCtDQUE2QixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDN0UsYUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxnQkFBZ0IsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ25HLElBQUksRUFBRSxDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUMsT0FBSyxDQUFBLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsZ0pBQWdKLEVBQUUsVUFBUyxJQUFJO1lBQzlKLElBQUksT0FBTyxHQUFXLFNBQVMsQ0FBQztZQUNoQyxJQUFJLFFBQVEsR0FBYyxDQUFDO29CQUN2QixJQUFJLEVBQUUsS0FBSztvQkFDWCxPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRTtvQkFDOUIsU0FBUyxFQUFFLGVBQWU7b0JBQzFCLEdBQUcsRUFBRSxHQUFHO2lCQUNYLEVBQUU7b0JBQ0MsSUFBSSxFQUFFLEtBQUs7b0JBQ1gsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUU7b0JBQzlCLFNBQVMsRUFBRSxlQUFlO29CQUMxQixHQUFHLEVBQUUsR0FBRztpQkFDWCxDQUFDLENBQUM7WUFDSCxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbEIsU0FBUztpQkFDSixLQUFLLEVBQUU7aUJBQ1AsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDO1lBQ3ZDLFNBQVM7aUJBQ0osUUFBUSxDQUFDLHlDQUF1QixDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUMxQyxJQUFJLENBQUM7Z0JBQ0YsSUFBTSxPQUFPLEdBQWdCLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDcEQsSUFBTSxxQkFBcUIsR0FBRywrQ0FBNkIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzNFLElBQU0scUJBQXFCLEdBQUcsd0RBQXNDLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0YsSUFBTSxpQkFBaUIsR0FBRyw2Q0FBMkIsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ3pFLElBQU0sc0JBQXNCLEdBQUcsK0NBQTZCLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUM3RSxhQUFNLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRTtvQkFDNUIscUJBQXFCO29CQUNyQixxQkFBcUI7b0JBQ3JCLGlCQUFpQjtvQkFDakIsc0JBQXNCO2lCQUFDLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxFQUFFLENBQUM7WUFDWCxDQUFDLENBQUMsQ0FBQyxPQUFLLENBQUEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyx1REFBdUQsRUFBRSxVQUFTLElBQUk7WUFDckUsSUFBSSxRQUFRLEdBQW9DO2dCQUM1QyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtnQkFDN0IsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7Z0JBQzVCLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7YUFBQyxDQUFDO1lBQzFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNsQixTQUFTO2lCQUNKLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQztpQkFDekIsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ3hDLFNBQVM7aUJBQ0osS0FBSyxFQUFFO2lCQUNQLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixTQUFTO2lCQUNKLFFBQVEsQ0FBQywrQkFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUNsQyxJQUFJLENBQUM7Z0JBQ0YsSUFBTSxPQUFPLEdBQWdCLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDcEQsSUFBTSxhQUFhLEdBQUcsOEJBQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUNqRCxJQUFNLGlCQUFpQixHQUFHLDZCQUFXLENBQUMsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDL0UsYUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2dCQUNwRSxJQUFJLEVBQUUsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFDLE9BQUssQ0FBQSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDhEQUE4RCxFQUFFLFVBQVMsSUFBSTtZQUM1RSxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbEIsU0FBUztpQkFDSixLQUFLLEVBQUU7aUJBQ1AsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFDLEtBQUssRUFBRSxzQkFBc0IsRUFBQyxDQUFDLENBQUM7WUFDakQsU0FBUztpQkFDSixRQUFRLENBQUMsK0JBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDbEMsSUFBSSxDQUFDO2dCQUNGLElBQU0sT0FBTyxHQUFnQixTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3BELElBQU0sY0FBYyxHQUFHLCtCQUFRLENBQUMsc0JBQXNCLENBQUMsQ0FBQztnQkFDeEQsYUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLEVBQUUsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFDLE9BQUssQ0FBQSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsRUFBRSxDQUFDLDhDQUE4QyxFQUFFLFVBQVMsSUFBSTtZQUM1RCxJQUFJLFFBQVEsR0FBb0M7Z0JBQzVDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO2dCQUM3QixFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtnQkFDNUIsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRTthQUFDLENBQUM7WUFDMUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2xCLFNBQVM7aUJBQ0osS0FBSyxDQUFDLGtCQUFrQixDQUFDO2lCQUN6QixLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDeEMsU0FBUztpQkFDSixNQUFNLEVBQUU7aUJBQ1IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLFNBQVM7aUJBQ0osUUFBUSxDQUFDLDRCQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7aUJBQ25DLElBQUksQ0FBQztnQkFDRixJQUFNLE9BQU8sR0FBZ0IsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNwRCxJQUFNLGFBQWEsR0FBRyw4QkFBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQ2pELElBQU0saUJBQWlCLEdBQUcsNkJBQVcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO2dCQUMvRSxhQUFNLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BFLElBQUksRUFBRSxDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUMsT0FBSyxDQUFBLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsb0VBQW9FLEVBQUUsVUFBUyxJQUFJO1lBQ2xGLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNsQixTQUFTO2lCQUNKLEtBQUssRUFBRTtpQkFDUCxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUMsS0FBSyxFQUFFLHNCQUFzQixFQUFDLENBQUMsQ0FBQztZQUNqRCxTQUFTO2lCQUNKLFFBQVEsQ0FBQyw0QkFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2lCQUNuQyxJQUFJLENBQUM7Z0JBQ0YsSUFBTSxPQUFPLEdBQWdCLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDcEQsSUFBTSxjQUFjLEdBQUcsK0JBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2dCQUN4RCxhQUFNLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELElBQUksRUFBRSxDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUMsT0FBSyxDQUFBLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUMsQ0FBQztJQUNILFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtRQUM3QixVQUFVLENBQUM7WUFDUCxTQUFTLEdBQUcsUUFBUSxFQUFFLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsd0NBQXdDLEVBQUU7WUFDekMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxvQkFBdUIsRUFBRSxDQUFDLENBQUM7WUFDOUMsSUFBTSxPQUFPLEdBQWdCLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNwRCxhQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsOEJBQWMsQ0FBQyxDQUFDO1lBRXBELE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDSCxRQUFRLENBQUMsMEJBQTBCLEVBQUU7UUFDakMsVUFBVSxDQUFDO1lBQ1AsU0FBUyxHQUFHLFFBQVEsRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLCtDQUErQyxFQUFFLFVBQVMsSUFBSTtZQUM3RCxJQUFJLGFBQWEsR0FBRyxDQUFDO29CQUNqQixLQUFLLEVBQUUsZUFBZTtvQkFDdEIsSUFBSSxFQUFFLE9BQU87b0JBQ2IsSUFBSSxFQUFFLE1BQU07aUJBQ2YsRUFBRTtvQkFDQyxLQUFLLEVBQUUsZ0JBQWdCO29CQUN2QixJQUFJLEVBQUUsU0FBUztvQkFDZixJQUFJLEVBQUUsTUFBTTtpQkFDZixDQUFDLENBQUM7WUFDSCxJQUFJLEtBQUssR0FBbUIsRUFBRSxDQUFDO1lBQy9CLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDO2dCQUNwQixLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHO29CQUNiLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtvQkFDWixJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7aUJBQ2YsQ0FBQztZQUNOLENBQUMsQ0FBQyxDQUFBO1lBQ0YsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2xCLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBQyxDQUFDLENBQUM7WUFDdEQsU0FBUztpQkFDSixRQUFRLENBQUMsZ0NBQWEsRUFBRSxDQUFDO2lCQUN6QixJQUFJLENBQUM7Z0JBQ0YsSUFBTSxPQUFPLEdBQWdCLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDcEQsSUFBTSxpQkFBaUIsR0FBRyw4QkFBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM3QyxhQUFNLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztnQkFDckQsSUFBSSxFQUFFLENBQUM7WUFDWCxDQUFDLENBQUMsQ0FBQyxPQUFLLENBQUEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQywyREFBMkQsRUFBRSxVQUFTLElBQUk7WUFDekUsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2xCLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0IsU0FBUztpQkFDSixRQUFRLENBQUMsZ0NBQWEsRUFBRSxDQUFDO2lCQUN6QixJQUFJLENBQUM7Z0JBQ0YsSUFBTSxPQUFPLEdBQWdCLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDcEQsSUFBTSxjQUFjLEdBQUcsK0JBQVEsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO2dCQUM3RCxhQUFNLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELElBQUksRUFBRSxDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUMsT0FBSyxDQUFBLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFBIn0=

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZW52LmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvY29udHJvbGxlcnMvYXV0aENvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9jb250cm9sbGVycy9jaGFubmVsQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2NvbnRyb2xsZXJzL21lc3NhZ2VDb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvY29udHJvbGxlcnMvdXNlckNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9taWRkbGV3YXJlL2FkbWluLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbWlkZGxld2FyZS9hdXRob3JpemVkLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbW9kZWxzL0NoYW5uZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9tb2RlbHMvTWVzc2FnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21vZGVscy9Vc2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvcm91dGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvc2VydmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvc29ja2V0LmlvL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy93ZWIvYWN0aW9ucy9jaGFubmVsc0FjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9hY3Rpb25zL2NoYXRVc2Vyc0FjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9hY3Rpb25zL25vdGlmaWNhdGlvbnNBY3Rpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy93ZWIvYWN0aW9ucy9zaWRlYmFyQWN0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL2FjdGlvbnMvc29ja2V0QWN0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL2FjdGlvbnMvdXNlckFjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9yZWR1Y2Vycy9jaGFubmVscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL3JlZHVjZXJzL2NoYXRVc2Vycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL3JlZHVjZXJzL25vdGlmaWNhdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9yZWR1Y2Vycy9zaWRlYmFyLnRzIiwid2VicGFjazovLy8uL3NyYy93ZWIvcmVkdWNlcnMvc29ja2V0LnRzIiwid2VicGFjazovLy8uL3NyYy93ZWIvcmVkdWNlcnMvdXNlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL3N0b3JlLnRzIiwid2VicGFjazovLy8uL3Rlc3RzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3Rlc3RzL3NlcnZlci90ZXN0QXV0aENvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vdGVzdHMvc2VydmVyL3Rlc3RDaGFubmVsQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi90ZXN0cy9zZXJ2ZXIvdGVzdE1lc3NhZ2VDb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3Rlc3RzL3NlcnZlci90ZXN0VXNlckNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vdGVzdHMvd2ViL3Rlc3RBc3luY0FjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vdGVzdHMvd2ViL3Rlc3RTdG9yZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImF4aW9zLW1vY2stYWRhcHRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJjcnlwdGpzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjaGFpXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29tcHJlc3Npb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb25uZWN0LW1vbmdvXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29va2llLXBhcnNlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNzdXJmXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3Mtc2Vzc2lvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImhlbG1ldFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqc29ud2VidG9rZW5cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb2NoYVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbmdvb3NlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibXVzdGFjaGUtZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LWxvZ2dlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LW1vY2stc3RvcmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eC10aHVua1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvY2tldC5pb1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvY2tldC5pby1jbGllbnRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzdXBlcnRlc3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzdXBlcnRlc3Qtc2Vzc2lvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInZhbGlkYXRvclwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FB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UztBQUNULEtBQUs7QUFDTCxDQUFDO0FBQ0QsMkNBQTJDLCtpb0I7Ozs7Ozs7Ozs7O0FDbFczQyxrQzs7Ozs7Ozs7Ozs7QUNBQSwrQzs7Ozs7Ozs7Ozs7QUNBQSxxQzs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSwwQzs7Ozs7Ozs7Ozs7QUNBQSwwQzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSw0Qzs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSxxQzs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSxzQzs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSxzQzs7Ozs7Ozs7Ozs7QUNBQSw4Qzs7Ozs7Ozs7Ozs7QUNBQSxzQyIsImZpbGUiOiJhbGwtdGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3Rlc3RzL2luZGV4LnRzXCIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgLy8gaHR0cHM6Ly9kb2NzLm1vbmdvZGIuY29tL21hbnVhbC9yZWZlcmVuY2UvY29ubmVjdGlvbi1zdHJpbmcvXG4gICAgbW9uZ29kYkNvbm5lY3Rpb25Vcmk6IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJLFxuICAgIG1vbmdvZGJUZXN0Q29ubmVjdGlvblVyaTogcHJvY2Vzcy5lbnYuTU9OR09EQl9URVNUX1VSSSB8fFxuXHRcdFx0ICAgICAgJ21vbmdvZGI6Ly9sb2NhbGhvc3Q6MjcwMTcvb3BlbkNoYXRUZXN0JyxcbiAgICBwb3J0OiBwcm9jZXNzLmVudi5QT1JUIHx8IDUwMDAsXG4gICAgcHJvZHVjdGlvbjogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyB8fCBmYWxzZSxcbiAgICB1c2VUZXN0RGI6IHByb2Nlc3MuZW52LlVTRV9URVNUX0RCIHx8IGZhbHNlLFxuICAgIHNlY3JldDogcHJvY2Vzcy5lbnYuU0VDUkVUIHx8ICdzZWNyZXQnLFxuICAgIGRpc2FibGVDc3JmOiBwcm9jZXNzLmVudi5ESVNBQkxFX0NTUkYgfHwgZmFsc2UsXG4gICAgZGlzYWJsZVJlZHV4TG9nZ2luZzogcHJvY2Vzcy5lbnYuRElTQUJMRV9SRURVWF9MT0dHSU5HIHx8IGZhbHNlLFxuICAgIGRpc2FibGVBdXRvU3RhcnQ6IHByb2Nlc3MuZW52LkRJU0FCTEVfQVVUT19TVEFSVCB8fCBmYWxzZSxcbiAgICBtYWlsZ3VuQXBpS2V5OiBwcm9jZXNzLmVudi5NQUlMR1VOX0FQSV9LRVksXG4gICAgbWFpbGd1bkRvbWFpbjogcHJvY2Vzcy5lbnYuTUFJTEdVTl9ET01BSU4sXG4gICAgYmFzZVVybDogcHJvY2Vzcy5lbnYuQkFTRV9VUkwgPyBwcm9jZXNzLmVudi5CQVNFX1VSTCA6ICdodHRwOi8vbG9jYWxob3N0OjUwMDAnXG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgdmFsaWRhdG9yXzEgPSByZXF1aXJlKFwidmFsaWRhdG9yXCIpO1xudmFyIGJjcnlwdGpzXzEgPSByZXF1aXJlKFwiYmNyeXB0anNcIik7XG52YXIgVXNlcl8xID0gcmVxdWlyZShcIi4uL21vZGVscy9Vc2VyXCIpO1xudmFyIGVudiA9IHJlcXVpcmUoJy4uLy4uLy4uL2VudicpO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB7XG4gICAgbG9naW46IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICBpZiAodmFsaWRhdG9yXzEuaXNFbXB0eShyZXEuYm9keS5lbWFpbCB8fCAnJykgfHwgdmFsaWRhdG9yXzEuaXNFbXB0eShyZXEuYm9keS5wYXNzd29yZCB8fCAnJykpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnUGxlYXNlIHN1cHBseSBhbiBlbWFpbCBhbmQgcGFzc3dvcmQnIH0pLmVuZCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdmFsaWRhdG9yXzEuaXNFbWFpbChyZXEuYm9keS5lbWFpbCkpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnTm90IGEgdmFsaWQgZW1haWwgYWRkcmVzcycgfSkuZW5kKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVxLmF1dGhlbnRpY2F0ZShyZXEuYm9keS5lbWFpbCwgcmVxLmJvZHkucGFzc3dvcmQsIGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgICAgICBpZiAoIXVzZXIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5qc29uKHsgZXJyb3I6ICdJbnZhbGlkIGVtYWlsIG9yIHBhc3N3b3JkJyB9KS5lbmQoKTtcbiAgICAgICAgICAgIHJlcS5pc3N1ZU5ld1Rva2VuKHVzZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKVxuICAgICAgICAgICAgICAgIC5qc29uKHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAgICAgICAgIHJvbGU6IHVzZXIucm9sZSxcbiAgICAgICAgICAgICAgICBuYW1lOiB1c2VyLm5hbWVcbiAgICAgICAgICAgIH0pLmVuZCgpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHJlZ2lzdGVyOiBmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICAgICAgaWYgKHZhbGlkYXRvcl8xLmlzRW1wdHkocmVxLmJvZHkuZW1haWwgfHwgJycpIHx8IHZhbGlkYXRvcl8xLmlzRW1wdHkocmVxLmJvZHkucGFzc3dvcmQgfHwgJycpKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ1BsZWFzZSBzdXBwbHkgYW4gZW1haWwgYW5kIHBhc3N3b3JkJyB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXZhbGlkYXRvcl8xLmlzRW1haWwocmVxLmJvZHkuZW1haWwpKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ05vdCBhIHZhbGlkIGVtYWlsIGFkZHJlc3MnIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBVc2VyXzFbXCJkZWZhdWx0XCJdLmZpbmRCeUVtYWlsKHJlcS5ib2R5LmVtYWlsKS5jb3VudERvY3VtZW50cygpLmV4ZWMoKS50aGVuKGZ1bmN0aW9uIChjb3VudCkge1xuICAgICAgICAgICAgaWYgKGNvdW50ICE9PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnRW1haWwgYWRkcmVzcyBpbiB1c2UnIH0pO1xuICAgICAgICAgICAgdmFyIHBhc3N3b3JkSGFzaCA9IGJjcnlwdGpzXzEuaGFzaFN5bmMocmVxLmJvZHkucGFzc3dvcmQpO1xuICAgICAgICAgICAgVXNlcl8xW1wiZGVmYXVsdFwiXS5jb3VudERvY3VtZW50cygpLmV4ZWMoKS50aGVuKGZ1bmN0aW9uIChjb3VudCkge1xuICAgICAgICAgICAgICAgIHZhciByb2xlID0gJ3VzZXInO1xuICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgcm9sZSA9ICdhZG1pbic7XG4gICAgICAgICAgICAgICAgdmFyIHVzZXIgPSBuZXcgVXNlcl8xW1wiZGVmYXVsdFwiXSh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogcmVxLmJvZHkuZW1haWwsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZEhhc2gsXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IHJvbGUsXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsVmVyaWZpZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHVzZXIuc2F2ZSgpLnRoZW4oZnVuY3Rpb24gKHUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nIHRyeWluZyB0byBjcmVhdGUgYSBuZXcgdXNlcicgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBsb2dvdXQ6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICByZXEubG9nb3V0KCk7XG4gICAgICAgIHJldHVybiByZXMuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6ICdsb2dnZWQgb3V0JyB9KTtcbiAgICB9LFxuICAgIHZlcmlmeUVtYWlsOiBmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICB9XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWVhWMGFFTnZiblJ5YjJ4c1pYSXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOHVMaTh1TGk4dUxpOXpjbU12YzJWeWRtVnlMMk52Ym5SeWIyeHNaWEp6TDJGMWRHaERiMjUwY205c2JHVnlMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3TzBGQlFVRXNkVU5CUVRaRE8wRkJRemRETEhGRFFVRnZRenRCUVVWd1F5eDFRMEZCTmtNN1FVRkROME1zU1VGQlRTeEhRVUZITEVkQlFVY3NUMEZCVHl4RFFVRkRMR05CUVdNc1EwRkJReXhEUVVGRE8wRkJSWEJETEhGQ1FVRmxPMGxCUTFnc1MwRkJTeXhGUVVGRkxGVkJRVU1zUjBGQldTeEZRVUZGTEVkQlFXRTdVVUZETDBJc1NVRkJTU3h0UWtGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhKUVVGSkxFVkJRVVVzUTBGQlF5eEpRVUZKTEcxQ1FVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eFJRVUZSTEVsQlFVa3NSVUZCUlN4RFFVRkRMRVZCUVVVN1dVRkRia1VzVDBGQlR5eEhRVUZITEVOQlFVTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eEZRVUZGTEV0QlFVc3NSVUZCUlN4eFEwRkJjVU1zUlVGQlJTeERRVUZETEVOQlFVTXNSMEZCUnl4RlFVRkZMRU5CUVVNN1UwRkRka1k3VVVGRFJDeEpRVUZKTEVOQlFVTXNiVUpCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4RlFVRkZPMWxCUXpGQ0xFOUJRVThzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlJTeExRVUZMTEVWQlFVVXNNa0pCUVRKQ0xFVkJRVVVzUTBGQlF5eERRVUZETEVkQlFVY3NSVUZCUlN4RFFVRkRPMU5CUXpkRk8xRkJRMFFzUjBGQlJ5eERRVUZETEZsQlFWa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUlVGQlJTeEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRkZCUVZFc1JVRkJSU3hWUVVGRExFbEJRVzFDTzFsQlEzQkZMRWxCUVVrc1EwRkJReXhKUVVGSk8yZENRVU5NTEU5QlFVOHNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4TFFVRkxMRVZCUVVVc01rSkJRVEpDTEVWQlFVVXNRMEZCUXl4RFFVRkRMRWRCUVVjc1JVRkJSU3hEUVVGRE8xbEJRemxGTEVkQlFVY3NRMEZCUXl4aFFVRmhMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03V1VGRGVFSXNUMEZCVHl4SFFVRkhMRU5CUVVNc1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF6dHBRa0ZEYWtJc1NVRkJTU3hEUVVGRE8yZENRVU5HTEU5QlFVOHNSVUZCUlN4SlFVRkpPMmRDUVVOaUxFdEJRVXNzUlVGQlJTeEpRVUZKTEVOQlFVTXNTMEZCU3p0blFrRkRha0lzU1VGQlNTeEZRVUZGTEVsQlFVa3NRMEZCUXl4SlFVRkpPMmRDUVVObUxFbEJRVWtzUlVGQlJTeEpRVUZKTEVOQlFVTXNTVUZCU1R0aFFVRkRMRU5CUVVNc1EwRkJReXhIUVVGSExFVkJRVVVzUTBGQlF6dFJRVU53UXl4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOUUxFTkJRVU03U1VGRFJDeFJRVUZSTEVWQlFVVXNWVUZCUXl4SFFVRlpMRVZCUVVVc1IwRkJZVHRSUVVOc1F5eEpRVUZKTEcxQ1FVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVsQlFVa3NSVUZCUlN4RFFVRkRMRWxCUVVrc2JVSkJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRkZCUVZFc1NVRkJTU3hGUVVGRkxFTkJRVU1zUlVGQlJUdFpRVU51UlN4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVVc1MwRkJTeXhGUVVGRkxIRkRRVUZ4UXl4RlFVRkZMRU5CUVVNc1EwRkJRenRUUVVOcVJqdFJRVU5FTEVsQlFVa3NRMEZCUXl4dFFrRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRVZCUVVVN1dVRkRNVUlzVDBGQlR5eEhRVUZITEVOQlFVTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eEZRVUZGTEV0QlFVc3NSVUZCUlN3eVFrRkJNa0lzUlVGQlJTeERRVUZETEVOQlFVTTdVMEZEZGtVN1VVRkRSQ3hQUVVGUExHbENRVUZKTEVOQlFVTXNWMEZCVnl4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNZMEZCWXl4RlFVRkZMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFVTXNTMEZCWVR0WlFVTXZSU3hKUVVGSkxFdEJRVXNzUzBGQlN5eERRVUZETzJkQ1FVTllMRTlCUVU4c1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJReXhMUVVGTExFVkJRVVVzYzBKQlFYTkNMRVZCUVVNc1EwRkJReXhEUVVGRE8xbEJRMnBGTEVsQlFVa3NXVUZCV1N4SFFVRkhMRzFDUVVGUkxFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJRenRaUVVVdlF5eHBRa0ZCU1N4RFFVRkRMR05CUVdNc1JVRkJSU3hEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRkRMRXRCUVdFN1owSkJRelZETEVsQlFVa3NTVUZCU1N4SFFVRkhMRTFCUVUwc1EwRkJRenRuUWtGRGJFSXNTVUZCU1N4TFFVRkxMRXRCUVVzc1EwRkJRenR2UWtGRFdDeEpRVUZKTEVkQlFVY3NUMEZCVHl4RFFVRkRPMmRDUVVOdVFpeEpRVUZKTEVsQlFVa3NSMEZCUnl4SlFVRkpMR2xDUVVGSkxFTkJRVU03YjBKQlEyaENMRWxCUVVrc1JVRkJSU3hGUVVGRk8yOUNRVU5TTEV0QlFVc3NSVUZCUlN4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXM3YjBKQlEzSkNMRkZCUVZFc1JVRkJSU3haUVVGWk8yOUNRVU4wUWl4SlFVRkpMRVZCUVVVc1NVRkJTVHR2UWtGRFZpeGhRVUZoTEVWQlFVVXNTMEZCU3p0cFFrRkRka0lzUTBGQlF5eERRVUZETzJkQ1FVTklMRWxCUVVrc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUXl4RFFVRlJPMjlDUVVOMFFpeFBRVUZQTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVTXNUMEZCVHl4RlFVRkZMRWxCUVVrc1JVRkJReXhEUVVGRExFTkJRVU03WjBKQlEycEVMRU5CUVVNc1EwRkJReXhEUVVGRExFOUJRVXNzUTBGQlFTeERRVUZETEZWQlFVTXNSMEZCVlR0dlFrRkRhRUlzVDBGQlR5eERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenR2UWtGRGJrSXNUMEZCVHl4SFFVRkhMRU5CUVVNc1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkRMRXRCUVVzc1JVRkJSU3hyUkVGQmEwUXNSVUZCUXl4RFFVRkRMRU5CUVVNN1owSkJRemRHTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTFBc1EwRkJReXhEUVVGRExFTkJRVUU3VVVGRFRpeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVVlFMRU5CUVVNN1NVRkRSQ3hOUVVGTkxFVkJRVVVzVlVGQlF5eEhRVUZaTEVWQlFVVXNSMEZCWVR0UlFVTm9ReXhIUVVGSExFTkJRVU1zVFVGQlRTeEZRVUZGTEVOQlFVTTdVVUZEWWl4UFFVRlBMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlF5eFBRVUZQTEVWQlFVVXNTVUZCU1N4RlFVRkZMRTlCUVU4c1JVRkJSU3haUVVGWkxFVkJRVU1zUTBGQlF5eERRVUZETzBsQlF6VkVMRU5CUVVNN1NVRkRSQ3hYUVVGWExFVkJRVVVzVlVGQlF5eEhRVUZaTEVWQlFVVXNSMEZCWVR0SlFVTjZReXhEUVVGRE8wTkJRMG9zUTBGQlFTSjkiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgQ2hhbm5lbF8xID0gcmVxdWlyZShcIi4uL21vZGVscy9DaGFubmVsXCIpO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB7XG4gICAgY2hhbm5lbHM6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICByZXR1cm4gQ2hhbm5lbF8xW1wiZGVmYXVsdFwiXS5jb3VudERvY3VtZW50cygpLmV4ZWMoKS50aGVuKGZ1bmN0aW9uIChjb3VudCkge1xuICAgICAgICAgICAgdmFyIHAgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIENoYW5uZWxfMVtcImRlZmF1bHRcIl0uY3JlYXRlKFt7IG5hbWU6ICdnZW5lcmFsJyB9LCB7IG5hbWU6ICdyYW5kb20nIH1dKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBDaGFubmVsXzFbXCJkZWZhdWx0XCJdLmZpbmQoKS5leGVjKCkudGhlbihmdW5jdGlvbiAoY2hhbm5lbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgY2hhbm5lbHM6IGNoYW5uZWxzIH0pO1xuICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBmZXRjaCBjaGFubmVscycgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gY3JlYXRlIGRlZmF1bHQgY2hhbm5lbHMnIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSBjb3VudGluZyBjaGFubmVscycgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgXCJkZWxldGVcIjogZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgfSxcbiAgICBjcmVhdGU6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgIH1cbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lZMmhoYm01bGJFTnZiblJ5YjJ4c1pYSXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOHVMaTh1TGk4dUxpOXpjbU12YzJWeWRtVnlMMk52Ym5SeWIyeHNaWEp6TDJOb1lXNXVaV3hEYjI1MGNtOXNiR1Z5TG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN08wRkJRMEVzTmtOQlFXOUVPMEZCUlhCRUxIRkNRVUZsTzBsQlExZ3NVVUZCVVN4RlFVRkZMRlZCUVVNc1IwRkJXU3hGUVVGRkxFZEJRV0U3VVVGRmJFTXNUMEZCVHl4dlFrRkJUeXhEUVVGRExHTkJRV01zUlVGQlJTeERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGRExFdEJRV0U3V1VGRGRFUXNTVUZCU1N4RFFVRkRMRWRCUVVjc1NVRkJTU3hQUVVGUExFTkJRVU1zVlVGQlF5eFBRVUZQTEVWQlFVVXNUVUZCVFR0blFrRkRhRU1zU1VGQlNTeExRVUZMTEV0QlFVc3NRMEZCUXl4RlFVRkZPMjlDUVVOaUxFOUJRVThzVDBGQlR5eEZRVUZGTEVOQlFVTTdhVUpCUTNCQ08yZENRVU5FTEc5Q1FVRlBMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zUlVGQlF5eEpRVUZKTEVWQlFVVXNVMEZCVXl4RlFVRkRMRVZCUVVVc1JVRkJReXhKUVVGSkxFVkJRVVVzVVVGQlVTeEZRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJRenR2UWtGRGRrUXNUMEZCVHl4UFFVRlBMRVZCUVVVc1EwRkJRenRuUWtGRGNrSXNRMEZCUXl4RFFVRkRMRU5CUVVNc1QwRkJTeXhEUVVGQkxFTkJRVU1zVlVGQlF5eEhRVUZWTzI5Q1FVTm9RaXhQUVVGUExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0blFrRkRka0lzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOSUxFOUJRVThzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXp0blFrRkRWaXh2UWtGQlR5eERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZETEZGQlFXOUNPMjlDUVVNMVF5eFBRVUZQTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVTXNVVUZCVVN4RlFVRkZMRkZCUVZFc1JVRkJReXhEUVVGRExFTkJRVU03WjBKQlEzUkVMRU5CUVVNc1EwRkJReXhEUVVGRExFOUJRVXNzUTBGQlFTeERRVUZETEZWQlFVTXNSMEZCVlR0dlFrRkRhRUlzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenR2UWtGRGFrSXNUMEZCVHl4SFFVRkhMRU5CUVVNc1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkZMRXRCUVVzc1JVRkJSU3h4UkVGQmNVUXNSVUZCUlN4RFFVRkRMRU5CUVVNN1owSkJRMnhITEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTFBc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlN5eERRVUZCTEVOQlFVTXNWVUZCUXl4SFFVRlZPMmRDUVVOb1FpeFBRVUZQTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8yZENRVU51UWl4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVNc1MwRkJTeXhGUVVGRkxEaEVRVUU0UkN4RlFVRkRMRU5CUVVNc1EwRkJRenRaUVVONlJ5eERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTlFMRU5CUVVNc1EwRkJReXhEUVVGRExFOUJRVXNzUTBGQlFTeERRVUZETEZWQlFVTXNSMEZCVlR0WlFVTm9RaXhQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMWxCUTI1Q0xFOUJRVThzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlF5eExRVUZMTEVWQlFVVXNPRU5CUVRoRExFVkJRVU1zUTBGQlF5eERRVUZETzFGQlEzcEdMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMUFzUTBGQlF6dEpRVU5FTEZGQlFVMHNSVUZCUlN4VlFVRkRMRWRCUVZrc1JVRkJSU3hIUVVGaE8wbEJSWEJETEVOQlFVTTdTVUZEUkN4TlFVRk5MRVZCUVVVc1ZVRkJReXhIUVVGWkxFVkJRVVVzUjBGQllUdEpRVVZ3UXl4RFFVRkRPME5CUTBvc1EwRkJRU0o5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIE1lc3NhZ2VfMSA9IHJlcXVpcmUoXCIuLi9tb2RlbHMvTWVzc2FnZVwiKTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0ge1xuICAgIG1lc3NhZ2VzOiBmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICAgICAgcmV0dXJuIE1lc3NhZ2VfMVtcImRlZmF1bHRcIl0uZmluZCh7IGNoYW5uZWw6IHJlcS5wYXJhbXMuY2hhbm5lbCB9KVxuICAgICAgICAgICAgLnNraXAocGFyc2VJbnQocmVxLnBhcmFtcy5vZmZlc3QpKVxuICAgICAgICAgICAgLnNvcnQoeyBfaWQ6IC0xIH0pXG4gICAgICAgICAgICAubGltaXQoMjApXG4gICAgICAgICAgICAuZXhlYygpLnRoZW4oZnVuY3Rpb24gKG1lc3NhZ2VzKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBtZXNzYWdlcy5tYXAoZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IG0udGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWQ6IG0uY3JlYXRlZEF0LFxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlckVtYWlsOiBtLnVzZXJFbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWw6IG0uY2hhbm5lbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9pZDogbS5faWRcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KS5yZXZlcnNlKClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnc29tZXRoaW5nIHdlbnQgd3JvbmcgdHJ5aW5nIHRvIGZldGNoIG1lc3NhZ2VzJyB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWJXVnpjMkZuWlVOdmJuUnliMnhzWlhJdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOHVMaTh1TGk5emNtTXZjMlZ5ZG1WeUwyTnZiblJ5YjJ4c1pYSnpMMjFsYzNOaFoyVkRiMjUwY205c2JHVnlMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3TzBGQlEwRXNOa05CUVc5RU8wRkJRM0JFTEhGQ1FVRmxPMGxCUTFnc1VVRkJVU3hGUVVGRkxGVkJRVU1zUjBGQldTeEZRVUZGTEVkQlFXRTdVVUZEYkVNc1QwRkJUeXh2UWtGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkRMRTlCUVU4c1JVRkJSU3hIUVVGSExFTkJRVU1zVFVGQlRTeERRVUZETEU5QlFVOHNSVUZCUXl4RFFVRkRPMkZCUXpkRExFbEJRVWtzUTBGQlF5eFJRVUZSTEVOQlFVTXNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF6dGhRVU5xUXl4SlFVRkpMRU5CUVVNc1JVRkJReXhIUVVGSExFVkJRVVVzUTBGQlF5eERRVUZETEVWQlFVTXNRMEZCUXp0aFFVTm1MRXRCUVVzc1EwRkJReXhGUVVGRkxFTkJRVU03WVVGRFZDeEpRVUZKTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJReXhSUVVGdlFqdFpRVU01UWl4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRPMmRDUVVOMlFpeFJRVUZSTEVWQlFVVXNVVUZCVVN4RFFVRkRMRWRCUVVjc1EwRkJReXhWUVVGRExFTkJRVmM3YjBKQlEyaERMRTlCUVU4N2QwSkJRMGdzU1VGQlNTeEZRVUZGTEVOQlFVTXNRMEZCUXl4SlFVRkpPM2RDUVVOYUxFOUJRVThzUlVGQlJTeERRVUZETEVOQlFVTXNVMEZCVXp0M1FrRkRjRUlzVTBGQlV5eEZRVUZGTEVOQlFVTXNRMEZCUXl4VFFVRlRPM2RDUVVOMFFpeFBRVUZQTEVWQlFVVXNRMEZCUXl4RFFVRkRMRTlCUVU4N2QwSkJRMnhDTEVkQlFVY3NSVUZCUlN4RFFVRkRMRU5CUVVNc1IwRkJSenR4UWtGRFlpeERRVUZETzJkQ1FVTk1MRU5CUVVNc1EwRkJReXhEUVVGRExFOUJRVThzUlVGQlJUdGhRVU5tTEVOQlFVTXNRMEZCUVR0UlFVTllMRU5CUVVNc1EwRkJReXhEUVVGRExFOUJRVXNzUTBGQlFTeERRVUZETEZWQlFVTXNSMEZCVlR0WlFVTm9RaXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVVVzUzBGQlN5eEZRVUZGTEN0RFFVRXJReXhGUVVGRkxFTkJRVU1zUTBGQlF6dFJRVU0xUml4RFFVRkRMRU5CUVVNc1EwRkJRVHRKUVVOT0xFTkJRVU03UTBGRFNpeERRVUZCSW4wPSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciB2YWxpZGF0b3JfMSA9IHJlcXVpcmUoXCJ2YWxpZGF0b3JcIik7XG52YXIgVXNlcl8xID0gcmVxdWlyZShcIi4uL21vZGVscy9Vc2VyXCIpO1xudmFyIGJjcnlwdGpzXzEgPSByZXF1aXJlKFwiYmNyeXB0anNcIik7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHtcbiAgICB1c2VyOiBmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICAgICAgcmVzLnNlbmQocmVxLnVzZXIpO1xuICAgIH0sXG4gICAgdXNlcnM6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICByZXR1cm4gVXNlcl8xW1wiZGVmYXVsdFwiXS5maW5kKHt9KS5zZWxlY3QoJ25hbWUgZW1haWwgcm9sZSBkZWxldGVkJykudGhlbihmdW5jdGlvbiAodXNlcnMpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIHVzZXJzOiB1c2VycyB9KTtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHJldHJpZXZpbmcgdXNlcnMnIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHVzZXJCeUVtYWlsOiBmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICAgICAgaWYgKCF2YWxpZGF0b3JfMS5pc0VtYWlsKHJlcS5wYXJhbXMudXNlcikpXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ1BsZWFzZSBzdXBwbHkgYSB2YWxpZCBlbWFpbCcgfSk7XG4gICAgICAgIHJldHVybiBVc2VyXzFbXCJkZWZhdWx0XCJdLmZpbmRCeUVtYWlsKHJlcS5wYXJhbXMudXNlcikuZXhlYygpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgICAgIGlmICh1c2VyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBfaWQ6IHVzZXIuX2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdXNlci5uYW1lIHx8ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogdXNlci5yb2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZDogdXNlci5jcmVhdGVkQXRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdObyB1c2VyIGZvdW5kIHdpdGggdGhhdCBlbWFpbCcgfSk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZyB0cnlpbmcgdG8gZmluZCB0aGUgdXNlcicgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgdXBkYXRlRW1haWw6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICBpZiAoIXZhbGlkYXRvcl8xLmlzRW1haWwocmVxLmJvZHkuZW1haWwpKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdOb3QgYSB2YWxpZCBlbWFpbCcgfSk7XG4gICAgICAgIHJldHVybiBVc2VyXzFbXCJkZWZhdWx0XCJdLmNvdW50RG9jdW1lbnRzKHsgZW1haWw6IHJlcS5ib2R5LmVtYWlsIH0pLmV4ZWMoKS50aGVuKGZ1bmN0aW9uIChjb3VudCkge1xuICAgICAgICAgICAgaWYgKGNvdW50ICE9PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnRW1haWwgYWRkcmVzcyBhbHJlYWR5IGluIHVzZScgfSk7XG4gICAgICAgICAgICByZXR1cm4gVXNlcl8xW1wiZGVmYXVsdFwiXS5maW5kQnlFbWFpbChyZXEudXNlci5lbWFpbCkuZXhlYygpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgICAgICAgICB1c2VyLmVtYWlsID0gcmVxLmJvZHkuZW1haWw7XG4gICAgICAgICAgICAgICAgdXNlci5zYXZlKCk7XG4gICAgICAgICAgICAgICAgcmVxLmlzc3VlTmV3VG9rZW4oT2JqZWN0LmFzc2lnbih7fSwgcmVxLnVzZXIsIHsgZW1haWw6IHJlcS5ib2R5LmVtYWlsIH0pKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcgdHJ5aW5nIHRvIGZldGNoIHRoZSB1c2VyJyB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHVwZGF0ZU5hbWU6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICByZXR1cm4gVXNlcl8xW1wiZGVmYXVsdFwiXS5maW5kQnlFbWFpbChyZXEudXNlci5lbWFpbClcbiAgICAgICAgICAgIC5leGVjKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICAgICAgdXNlci5uYW1lID0gcmVxLmJvZHkubmFtZTtcbiAgICAgICAgICAgIHVzZXIuc2F2ZSgpO1xuICAgICAgICAgICAgcmVxLmlzc3VlTmV3VG9rZW4oT2JqZWN0LmFzc2lnbih7fSwgcmVxLnVzZXIsIHsgbmFtZTogcmVxLmJvZHkubmFtZSB9KSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcgdHJ5aW5nIHRvIHVwZGF0ZSB0aGUgdXNlcicgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgdXBkYXRlUGFzc3dvcmQ6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICBpZiAodmFsaWRhdG9yXzEuaXNFbXB0eShyZXEuYm9keS5uZXdQYXNzKSB8fCB2YWxpZGF0b3JfMS5pc0VtcHR5KHJlcS5ib2R5Lm9sZFBhc3MpKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdNdXN0IHN1cHBseSB0aGUgY3VycmVudCBhbmQgbmV3IHBhc3N3b3JkJyB9KTtcbiAgICAgICAgcmV0dXJuIFVzZXJfMVtcImRlZmF1bHRcIl0uZmluZEJ5RW1haWwocmVxLnVzZXIuZW1haWwpLmV4ZWMoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgICAgICBpZiAoIWJjcnlwdGpzXzEuY29tcGFyZVN5bmMocmVxLmJvZHkub2xkUGFzcywgdXNlci5wYXNzd29yZCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdDdXJyZW50IHBhc3N3b3JkIGlzIGluY29ycmVjdCcgfSk7XG4gICAgICAgICAgICB1c2VyLnBhc3N3b3JkID0gYmNyeXB0anNfMS5oYXNoU3luYyhyZXEuYm9keS5uZXdQYXNzKTtcbiAgICAgICAgICAgIHVzZXIuc2F2ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICByZXNldFBhc3N3b3JkOiBmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6ICdOb3QgaW1wbGVtZW50ZWQnIH0pO1xuICAgIH0sXG4gICAgY3JlYXRlVXNlcjogZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgICAgIGlmICh2YWxpZGF0b3JfMS5pc0VtcHR5KHJlcS5ib2R5LmVtYWlsKSB8fCAhdmFsaWRhdG9yXzEuaXNFbWFpbChyZXEuYm9keS5lbWFpbCkgfHxcbiAgICAgICAgICAgIHZhbGlkYXRvcl8xLmlzRW1wdHkocmVxLmJvZHkucm9sZSkgfHwgKHJlcS5ib2R5LnJvbGUgIT09ICd1c2VyJyAmJiByZXEuYm9keS5yb2xlICE9PSAnYWRtaW4nKSlcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnTXVzdCBzdXBwbHkgdmFsaWQgZW1haWwgYW5kIHJvbGUnIH0pO1xuICAgICAgICByZXR1cm4gVXNlcl8xW1wiZGVmYXVsdFwiXS5maW5kQnlFbWFpbChyZXEuYm9keS5lbWFpbCkuY291bnREb2N1bWVudHMoZnVuY3Rpb24gKGVyciwgYykge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHRyeWluZyB0byBjb3VudCB1c2VycyB3aXRoIGVtYWlsICcgKyByZXEuYm9keS5lbWFpbCwgZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjICE9PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnRW1haWwgYWRkcmVzcyBpbiB1c2UnIH0pO1xuICAgICAgICAgICAgdmFyIHUgPSBuZXcgVXNlcl8xW1wiZGVmYXVsdFwiXSh7XG4gICAgICAgICAgICAgICAgZW1haWw6IHJlcS5ib2R5LmVtYWlsLFxuICAgICAgICAgICAgICAgIG5hbWU6IHJlcS5ib2R5Lm5hbWUgfHwgJycsXG4gICAgICAgICAgICAgICAgcm9sZTogcmVxLmJvZHkucm9sZSxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJ3RlbXAnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdS5zYXZlKGZ1bmN0aW9uIChlcnIsIHUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHRyeWluZyB0byBzYXZlIHVzZXInLCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGVkaXRVc2VyOiBmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICAgICAgaWYgKCFyZXEuYm9keS5lbWFpbCB8fCAhdmFsaWRhdG9yXzEuaXNFbWFpbChyZXEuYm9keS5lbWFpbCkpXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ1BsZWFzZSBzdXBwbHkgYSB2YWxpZCBlbWFpbCcgfSk7XG4gICAgICAgIGlmIChyZXEuYm9keS51c2VyLmVtYWlsICYmICF2YWxpZGF0b3JfMS5pc0VtYWlsKHJlcS5ib2R5LnVzZXIuZW1haWwpKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdQbGVhc2Ugc3VwcGx5IGEgdmFsaWQgZW1haWwnIH0pO1xuICAgICAgICBpZiAocmVxLmJvZHkudXNlci5yb2xlICYmICF2YWxpZGF0b3JfMS5pc0VtcHR5KHJlcS5ib2R5LnVzZXIucm9sZSkgJiYgKHJlcS5ib2R5LnVzZXIucm9sZSAhPT0gJ3VzZXInICYmIHJlcS5ib2R5LnVzZXIucm9sZSAhPT0gJ2FkbWluJykpXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ0ludmFsaWQgcm9sZScgfSk7XG4gICAgICAgIHJldHVybiBVc2VyXzFbXCJkZWZhdWx0XCJdLmZpbmRCeUVtYWlsKHJlcS5ib2R5LmVtYWlsKS5leGVjKGZ1bmN0aW9uIChlcnIsIHVzZXIpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU29tZXRoaW5nIHdlbnQgd3JvbmcnLCBlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgZXJyb3I6ICdVc2VyIGRvZXMgbm90IGV4aXN0JyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXEuYm9keS51c2VyLmVtYWlsKVxuICAgICAgICAgICAgICAgIHVzZXIuZW1haWwgPSByZXEuYm9keS51c2VyLmVtYWlsO1xuICAgICAgICAgICAgaWYgKHJlcS5ib2R5LnVzZXIubmFtZSlcbiAgICAgICAgICAgICAgICB1c2VyLm5hbWUgPSByZXEuYm9keS51c2VyLm5hbWU7XG4gICAgICAgICAgICBpZiAocmVxLmJvZHkudXNlci5yb2xlKVxuICAgICAgICAgICAgICAgIHVzZXIucm9sZSA9IHJlcS5ib2R5LnVzZXIucm9sZTtcbiAgICAgICAgICAgIHJldHVybiB1c2VyLnNhdmUoZnVuY3Rpb24gKGVyciwgdXNlcikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZycgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBkZWxldGVVc2VyOiBmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICAgICAgaWYgKCFyZXEuYm9keS5lbWFpbCB8fCAhdmFsaWRhdG9yXzEuaXNFbWFpbChyZXEuYm9keS5lbWFpbCkpXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ0ludmFsaWQgZGF0YSBmb3IgcGFyYW1ldGVyIFwiZW1haWxcIicgfSk7XG4gICAgICAgIHJldHVybiBVc2VyXzFbXCJkZWZhdWx0XCJdLmZpbmRCeUVtYWlsKHJlcS5ib2R5LmVtYWlsKS5leGVjKGZ1bmN0aW9uIChlcnIsIHVzZXIpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU29tZXRoaW5nIHdlbnQgd3JvbmcnLCBlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF1c2VyKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IGVycm9yOiAnVXNlciBkb2VzIG5vdCBleGlzdCcgfSk7XG4gICAgICAgICAgICBpZiAodXNlci5kZWxldGVkKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnVXNlciBhbHJlYWR5IGRlbGV0ZWQnIH0pO1xuICAgICAgICAgICAgaWYgKHJlcS51c2VyLmVtYWlsID09PSByZXEuYm9keS5lbWFpbClcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ0Nhbm5vdCBkZWxldGUgY3VycmVudCB1c2VyJyB9KTtcbiAgICAgICAgICAgIHVzZXIuZGVsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdXNlci5zYXZlKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVzdG9yZVVzZXI6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICBpZiAoIXJlcS5ib2R5LmVtYWlsIHx8ICF2YWxpZGF0b3JfMS5pc0VtYWlsKHJlcS5ib2R5LmVtYWlsKSlcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnSW52YWxpZCBkYXRhIGZvciBwYXJhbWV0ZXIgXCJlbWFpbFwiJyB9KTtcbiAgICAgICAgcmV0dXJuIFVzZXJfMVtcImRlZmF1bHRcIl0uZmluZEJ5RW1haWwocmVxLmJvZHkuZW1haWwpLmV4ZWMoZnVuY3Rpb24gKGVyciwgdXNlcikge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTb21ldGhpbmcgd2VudCB3cm9uZycsIGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZycgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXVzZXIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgZXJyb3I6ICdVc2VyIGRvZXMgbm90IGV4aXN0JyB9KTtcbiAgICAgICAgICAgIGlmICghdXNlci5kZWxldGVkKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnVXNlciBhbHJlYWR5IGFjdGl2ZScgfSk7XG4gICAgICAgICAgICB1c2VyLmRlbGV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB1c2VyLnNhdmUoZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWRYTmxja052Ym5SeWIyeHNaWEl1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk4dUxpOHVMaTl6Y21NdmMyVnlkbVZ5TDJOdmJuUnliMnhzWlhKekwzVnpaWEpEYjI1MGNtOXNiR1Z5TG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN08wRkJRVUVzZFVOQlFUSkRPMEZCUlRORExIVkRRVUY1UkR0QlFVTjZSQ3h4UTBGQkswTTdRVUZGTDBNc2NVSkJRV1U3U1VGRFdDeEpRVUZKTEVWQlFVVXNWVUZCUXl4SFFVRlpMRVZCUVVVc1IwRkJZVHRSUVVNNVFpeEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dEpRVU4yUWl4RFFVRkRPMGxCUTBRc1MwRkJTeXhGUVVGRkxGVkJRVU1zUjBGQldTeEZRVUZGTEVkQlFXRTdVVUZETDBJc1QwRkJUeXhwUWtGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkZMRU5CUVVNc1EwRkJReXhOUVVGTkxFTkJRVU1zZVVKQlFYbENMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlF5eExRVUZqTzFsQlEzWkZMRTlCUVU4c1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJReXhQUVVGUExFVkJRVVVzU1VGQlNTeEZRVUZGTEV0QlFVc3NSVUZCUlN4TFFVRkxMRVZCUVVNc1EwRkJReXhEUVVGRE8xRkJReTlFTEVOQlFVTXNRMEZCUXl4RFFVRkRMRTlCUVVzc1EwRkJRU3hEUVVGRExGVkJRVU1zUjBGQlZUdFpRVU5vUWl4UFFVRlBMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzFsQlEyNUNMRTlCUVU4c1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJReXhMUVVGTExFVkJRVVVzTmtOQlFUWkRMRVZCUVVNc1EwRkJReXhEUVVGRE8xRkJRM2hHTEVOQlFVTXNRMEZCUXl4RFFVRkJPMGxCUTA0c1EwRkJRenRKUVVORUxGZEJRVmNzUlVGQlJTeFZRVUZETEVkQlFWa3NSVUZCUlN4SFFVRmhPMUZCUTNKRExFbEJRVWNzUTBGQlF5eHRRa0ZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETzFsQlEzaENMRTlCUVU4c1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJReXhMUVVGTExFVkJRVVVzTmtKQlFUWkNMRVZCUVVNc1EwRkJReXhEUVVGRE8xRkJSWGhGTEU5QlFVOHNhVUpCUVVrc1EwRkJReXhYUVVGWExFTkJRVU1zUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUXl4SlFVRlhPMWxCUXpkRUxFbEJRVWtzU1VGQlNTeExRVUZMTEVsQlFVa3NSVUZCUlR0blFrRkRaaXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRE8yOUNRVU40UWl4SlFVRkpMRVZCUVVVN2QwSkJRMFlzUzBGQlN5eEZRVUZGTEVsQlFVa3NRMEZCUXl4TFFVRkxPM2RDUVVOcVFpeEhRVUZITEVWQlFVVXNTVUZCU1N4RFFVRkRMRWRCUVVjN2QwSkJRMklzU1VGQlNTeEZRVUZGTEVsQlFVa3NRMEZCUXl4SlFVRkpMRWxCUVVrc1JVRkJSVHQzUWtGRGNrSXNTVUZCU1N4RlFVRkZMRWxCUVVrc1EwRkJReXhKUVVGSk8zZENRVU5tTEU5QlFVOHNSVUZCUlN4SlFVRkpMRU5CUVVNc1UwRkJVenR4UWtGRE1VSTdhVUpCUTBvc1EwRkJReXhEUVVGRE8yRkJRMDQ3V1VGRFJDeFBRVUZQTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVTXNTMEZCU3l4RlFVRkZMQ3RDUVVFclFpeEZRVUZETEVOQlFVTXNRMEZCUXp0UlFVVXhSU3hEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZMTEVOQlFVRXNRMEZCUXl4VlFVRkRMRWRCUVZVN1dVRkRhRUlzVDBGQlR5eERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRaUVVOdVFpeFBRVUZQTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVTXNTMEZCU3l4RlFVRkZMRGhEUVVFNFF5eEZRVUZETEVOQlFVTXNRMEZCUXp0UlFVTjZSaXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTTdTVUZEUkN4WFFVRlhMRVZCUVVVc1ZVRkJReXhIUVVGWkxFVkJRVVVzUjBGQllUdFJRVU55UXl4SlFVRkhMRU5CUVVNc2JVSkJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJRenRaUVVOMlFpeFBRVUZQTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVVXNTMEZCU3l4RlFVRkZMRzFDUVVGdFFpeEZRVUZGTEVOQlFVTXNRMEZCUXp0UlFVTm9SU3hQUVVGUExHbENRVUZKTEVOQlFVTXNZMEZCWXl4RFFVRkRMRVZCUVVNc1MwRkJTeXhGUVVGRkxFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RlFVRkRMRU5CUVVNc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUXl4TFFVRmhPMWxCUXpGRkxFbEJRVWtzUzBGQlN5eExRVUZMTEVOQlFVTTdaMEpCUTFnc1QwRkJUeXhIUVVGSExFTkJRVU1zVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRkxFdEJRVXNzUlVGQlJTdzRRa0ZCT0VJc1JVRkJSU3hEUVVGRExFTkJRVU03V1VGRE0wVXNUMEZCVHl4cFFrRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRkRMRWxCUVZjN1owSkJRelZFTEVsQlFVa3NRMEZCUXl4TFFVRkxMRWRCUVVjc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTTdaMEpCUXpWQ0xFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXp0blFrRkRXaXhIUVVGSExFTkJRVU1zWVVGQllTeERRVUZETEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc1JVRkJSU3hGUVVGRkxFZEJRVWNzUTBGQlF5eEpRVUZKTEVWQlFVVXNSVUZCUXl4TFFVRkxMRVZCUVVVc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVWQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1owSkJRM2hGTEU5QlFVOHNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4UFFVRlBMRVZCUVVVc1NVRkJTU3hGUVVGRkxFTkJRVU1zUTBGQlF6dFpRVU51UkN4RFFVRkRMRU5CUVVNc1EwRkJReXhQUVVGTExFTkJRVUVzUTBGQlF5eFZRVUZETEVkQlFWVTdaMEpCUTJoQ0xFOUJRVThzUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1owSkJRMjVDTEU5QlFVOHNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4TFFVRkxMRVZCUVVVc0swTkJRU3RETEVWQlFVVXNRMEZCUXl4RFFVRkRPMWxCUXpWR0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExQXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRVQ3hEUVVGRE8wbEJRMFFzVlVGQlZTeEZRVUZGTEZWQlFVTXNSMEZCV1N4RlFVRkZMRWRCUVdFN1VVRkRjRU1zVDBGQlR5eHBRa0ZCU1N4RFFVRkRMRmRCUVZjc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXp0aFFVTnNReXhKUVVGSkxFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUXl4SlFVRlhPMWxCUTNKQ0xFbEJRVWtzUTBGQlF5eEpRVUZKTEVkQlFVY3NSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU03V1VGRE1VSXNTVUZCU1N4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRE8xbEJRMW9zUjBGQlJ5eERRVUZETEdGQlFXRXNRMEZCUXl4TlFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExFVkJRVVVzUlVGQlJTeEhRVUZITEVOQlFVTXNTVUZCU1N4RlFVRkZMRVZCUVVVc1NVRkJTU3hGUVVGRkxFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRM2hGTEU5QlFVOHNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUXl4UFFVRlBMRVZCUVVVc1NVRkJTU3hGUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5xUkN4RFFVRkRMRU5CUVVNc1EwRkJReXhQUVVGTExFTkJRVUVzUTBGQlF5eFZRVUZETEVkQlFWVTdXVUZEYUVJc1QwRkJUeXhEUVVGRExFdEJRVXNzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0WlFVTnVRaXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVU1zUzBGQlN5eEZRVUZGTEdkRVFVRm5SQ3hGUVVGRExFTkJRVU1zUTBGQlF6dFJRVU12Uml4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOUUxFTkJRVU03U1VGRFJDeGpRVUZqTEVWQlFVVXNWVUZCUXl4SFFVRlpMRVZCUVVVc1IwRkJZVHRSUVVONFF5eEpRVUZKTEcxQ1FVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4dFFrRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRPMWxCUTNSRUxFOUJRVThzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlJTeExRVUZMTEVWQlFVVXNNRU5CUVRCRExFVkJRVVVzUTBGQlF5eERRVUZETzFGQlEzWkdMRTlCUVU4c2FVSkJRVWtzUTBGQlF5eFhRVUZYTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJReXhKUVVGWE8xbEJRelZFTEVsQlFVa3NRMEZCUXl4elFrRkJWeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RlFVRkZMRWxCUVVrc1EwRkJReXhSUVVGUkxFTkJRVU03WjBKQlF6ZERMRTlCUVU4c1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJReXhMUVVGTExFVkJRVVVzSzBKQlFTdENMRVZCUVVNc1EwRkJReXhEUVVGRE8xbEJRekZGTEVsQlFVa3NRMEZCUXl4UlFVRlJMRWRCUVVjc2JVSkJRVkVzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRE8xbEJRek5ETEVsQlFVa3NRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJRenRaUVVOYUxFOUJRVThzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlF5eFBRVUZQTEVWQlFVVXNTVUZCU1N4RlFVRkRMRU5CUVVNc1EwRkJRenRSUVVOcVJDeERRVUZETEVOQlFVTXNRMEZCUVR0SlFVTk9MRU5CUVVNN1NVRkRSQ3hoUVVGaExFVkJRVVVzVlVGQlF5eEhRVUZaTEVWQlFVVXNSMEZCWVR0UlFVTjJReXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVU1zUzBGQlN5eEZRVUZGTEdsQ1FVRnBRaXhGUVVGRExFTkJRVU1zUTBGQlF6dEpRVU0xUkN4RFFVRkRPMGxCVDBRc1ZVRkJWU3hGUVVGRkxGVkJRVU1zUjBGQldTeEZRVUZGTEVkQlFXRTdVVUZEY0VNc1NVRkJSeXh0UWtGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF5eHRRa0ZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETzFsQlEyNUVMRzFDUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4TFFVRkxMRTFCUVUwc1NVRkJTU3hIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NTMEZCU3l4UFFVRlBMRU5CUVVNN1dVRkRhRVlzVDBGQlR5eEhRVUZITEVOQlFVTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eEZRVUZGTEV0QlFVc3NSVUZCUlN4clEwRkJhME1zUlVGQlF5eERRVUZETEVOQlFVTTdVVUZET1VVc1QwRkJUeXhwUWtGQlNTeERRVUZETEZkQlFWY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEdOQlFXTXNRMEZCUXl4VlFVRkRMRWRCUVZFc1JVRkJSU3hEUVVGVE8xbEJRM1pGTEVsQlFVa3NSMEZCUnl4RlFVRkZPMmRDUVVOTUxFOUJRVThzUTBGQlF5eExRVUZMTEVOQlFVTXNkMFJCUVhkRUxFZEJRVWNzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRVZCUVVVc1IwRkJSeXhEUVVGRExFTkJRVU03WjBKQlF6bEdMRTlCUVU4c1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJReXhMUVVGTExFVkJRVVVzYzBKQlFYTkNMRVZCUVVNc1EwRkJReXhEUVVGRE8yRkJRMmhGTzFsQlEwUXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJRenRuUWtGRFVDeFBRVUZQTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVTXNTMEZCU3l4RlFVRkZMSE5DUVVGelFpeEZRVUZETEVOQlFVTXNRMEZCUXp0WlFVTnFSU3hKUVVGSkxFTkJRVU1zUjBGQlJ5eEpRVUZKTEdsQ1FVRkpMRU5CUVVNN1owSkJRMklzUzBGQlN5eEZRVUZGTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTenRuUWtGRGNrSXNTVUZCU1N4RlFVRkZMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEpRVUZKTEVWQlFVVTdaMEpCUTNwQ0xFbEJRVWtzUlVGQlJTeEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrN1owSkJSVzVDTEZGQlFWRXNSVUZCUlN4TlFVRk5PMkZCUTI1Q0xFTkJRVU1zUTBGQlFUdFpRVU5HTEU5QlFVOHNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGRExFZEJRVkVzUlVGQlJTeERRVUZSTzJkQ1FVTTNRaXhKUVVGSkxFZEJRVWNzUlVGQlJUdHZRa0ZEVEN4UFFVRlBMRU5CUVVNc1MwRkJTeXhEUVVGRExEQkRRVUV3UXl4RlFVRkZMRWRCUVVjc1EwRkJReXhEUVVGRE8yOUNRVU12UkN4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVVc1MwRkJTeXhGUVVGRkxITkNRVUZ6UWl4RlFVRkZMRU5CUVVNc1EwRkJRenRwUWtGRGJFVTdaMEpCUTBRc1QwRkJUeXhIUVVGSExFTkJRVU1zVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRExFOUJRVThzUlVGQlJTeEpRVUZKTEVWQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTJwRUxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlJWQXNRMEZCUXl4RFFVRkRMRU5CUVVFN1NVRkRUaXhEUVVGRE8wbEJWVVFzVVVGQlVTeEZRVUZGTEZWQlFVTXNSMEZCV1N4RlFVRkZMRWRCUVdFN1VVRkRiRU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhKUVVGSkxFTkJRVU1zYlVKQlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF6dFpRVU16UXl4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVNc1MwRkJTeXhGUVVGRkxEWkNRVUUyUWl4RlFVRkRMRU5CUVVNc1EwRkJRenRSUVVONFJTeEpRVUZKTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzU1VGQlNTeERRVUZETEcxQ1FVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRPMWxCUTNCRUxFOUJRVThzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlJTeExRVUZMTEVWQlFVVXNOa0pCUVRaQ0xFVkJRVVVzUTBGQlF5eERRVUZETzFGQlF6RkZMRWxCUVVrc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4SlFVRkpMRU5CUVVNc2JVSkJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUzBGQlN5eE5RVUZOTEVsQlFVa3NSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeExRVUZMTEU5QlFVOHNRMEZCUXp0WlFVTjJTQ3hQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVU1zUzBGQlN5eEZRVUZGTEdOQlFXTXNSVUZCUXl4RFFVRkRMRU5CUVVNN1VVRkRla1FzVDBGQlR5eHBRa0ZCU1N4RFFVRkRMRmRCUVZjc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGRExFZEJRVkVzUlVGQlJTeEpRVUZYTzFsQlF5OUVMRWxCUVVrc1IwRkJSeXhGUVVGRk8yZENRVU5NTEU5QlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc2MwSkJRWE5DTEVWQlFVVXNSMEZCUnl4RFFVRkRMRU5CUVVNN1owSkJRM3BETEU5QlFVOHNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUXl4TFFVRkxMRVZCUVVVc2MwSkJRWE5DTEVWQlFVTXNRMEZCUXl4RFFVRkRPMkZCUTJoRk8xbEJRMFFzU1VGQlNTeERRVUZETEVsQlFVa3NSVUZCUlR0blFrRkRVQ3hQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVU1zUzBGQlN5eEZRVUZGTEhGQ1FVRnhRaXhGUVVGRExFTkJRVU1zUTBGQlF6dGhRVU12UkR0WlFVTkVMRWxCUVVrc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3p0blFrRkRia0lzU1VGQlNTeERRVUZETEV0QlFVc3NSMEZCUnl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTTdXVUZEY2tNc1NVRkJTU3hIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpPMmRDUVVOc1FpeEpRVUZKTEVOQlFVTXNTVUZCU1N4SFFVRkhMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXp0WlFVTnVReXhKUVVGSkxFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrN1owSkJRMnhDTEVsQlFVa3NRMEZCUXl4SlFVRkpMRWRCUVVjc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRPMWxCUTI1RExFOUJRVThzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRkRMRWRCUVZFc1JVRkJSU3hKUVVGWE8yZENRVU51UXl4SlFVRkpMRWRCUVVjc1JVRkJSVHR2UWtGRFRDeFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8yOUNRVU5xUWl4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVNc1MwRkJTeXhGUVVGRkxITkNRVUZ6UWl4RlFVRkRMRU5CUVVNc1EwRkJRenRwUWtGRGFFVTdaMEpCUTBRc1QwRkJUeXhIUVVGSExFTkJRVU1zVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRExFOUJRVThzUlVGQlJTeEpRVUZKTEVWQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTJwRUxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExQXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRVQ3hEUVVGRE8wbEJRMFFzVlVGQlZTeEZRVUZGTEZWQlFVTXNSMEZCV1N4RlFVRkZMRWRCUVdFN1VVRkRjRU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhKUVVGSkxFTkJRVU1zYlVKQlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF6dFpRVU16UXl4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVNc1MwRkJTeXhGUVVGRkxHOURRVUZ2UXl4RlFVRkRMRU5CUVVNc1EwRkJRenRSUVVNdlJTeFBRVUZQTEdsQ1FVRkpMRU5CUVVNc1YwRkJWeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVU1zUjBGQlVTeEZRVUZGTEVsQlFWYzdXVUZETDBRc1NVRkJTU3hIUVVGSExFVkJRVVU3WjBKQlEwd3NUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXh6UWtGQmMwSXNSVUZCUlN4SFFVRkhMRU5CUVVNc1EwRkJRenRuUWtGRGVrTXNUMEZCVHl4SFFVRkhMRU5CUVVNc1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkRMRXRCUVVzc1JVRkJSU3h6UWtGQmMwSXNSVUZCUXl4RFFVRkRMRU5CUVVNN1lVRkRhRVU3V1VGRFJDeEpRVUZKTEVOQlFVTXNTVUZCU1R0blFrRkRUQ3hQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVU1zUzBGQlN5eEZRVUZGTEhGQ1FVRnhRaXhGUVVGRExFTkJRVU1zUTBGQlF6dFpRVU5vUlN4SlFVRkpMRWxCUVVrc1EwRkJReXhQUVVGUE8yZENRVU5hTEU5QlFVOHNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUXl4TFFVRkxMRVZCUVVVc2MwSkJRWE5DTEVWQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTJwRkxFbEJRVWtzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRXRCUVVzc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTzJkQ1FVTnFReXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVU1zUzBGQlN5eEZRVUZGTERSQ1FVRTBRaXhGUVVGRExFTkJRVU1zUTBGQlF6dFpRVU4yUlN4SlFVRkpMRU5CUVVNc1QwRkJUeXhIUVVGSExFbEJRVWtzUTBGQlF6dFpRVU53UWl4UFFVRlBMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlF5eEhRVUZSTzJkQ1FVTjBRaXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVU1zVDBGQlR5eEZRVUZGTEVsQlFVa3NSVUZCUXl4RFFVRkRMRU5CUVVNN1dVRkRha1FzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOUUxFTkJRVU03U1VGRFJDeFhRVUZYTEVWQlFVVXNWVUZCUXl4SFFVRlpMRVZCUVVVc1IwRkJZVHRSUVVOeVF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFbEJRVWtzUTBGQlF5eHRRa0ZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETzFsQlF6TkRMRTlCUVU4c1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSU3hMUVVGTExFVkJRVVVzYjBOQlFXOURMRVZCUVVVc1EwRkJReXhEUVVGRE8xRkJRMnBHTEU5QlFVOHNhVUpCUVVrc1EwRkJReXhYUVVGWExFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlF5eEhRVUZSTEVWQlFVVXNTVUZCVnp0WlFVTXZSQ3hKUVVGSkxFZEJRVWNzUlVGQlJUdG5Ra0ZEVEN4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExITkNRVUZ6UWl4RlFVRkZMRWRCUVVjc1EwRkJReXhEUVVGRE8yZENRVU42UXl4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVVc1MwRkJTeXhGUVVGRkxITkNRVUZ6UWl4RlFVRkZMRU5CUVVNc1EwRkJRenRoUVVOc1JUdFpRVU5FTEVsQlFVa3NRMEZCUXl4SlFVRkpPMmRDUVVOTUxFOUJRVThzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlJTeExRVUZMTEVWQlFVVXNjVUpCUVhGQ0xFVkJRVVVzUTBGQlF5eERRVUZETzFsQlEyeEZMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR6dG5Ra0ZEWWl4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVVc1MwRkJTeXhGUVVGRkxIRkNRVUZ4UWl4RlFVRkZMRU5CUVVNc1EwRkJRenRaUVVNNVJDeEpRVUZKTEVOQlFVTXNUMEZCVHl4SFFVRkhMRXRCUVVzc1EwRkJRenRaUVVONlFpeFBRVUZQTEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJReXhIUVVGUk8yZENRVU4wUWl4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVVc1QwRkJUeXhGUVVGRkxFbEJRVWtzUlVGQlJTeERRVUZETEVOQlFVTTdXVUZEYmtRc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFVDeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTlFMRU5CUVVNN1EwRkRTaXhEUVVGQkluMD0iLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5mdW5jdGlvbiBkZWZhdWx0XzEocmVxLCByZXMsIG5leHQpIHtcbiAgICBpZiAocmVxLnVzZXIgJiYgcmVxLnVzZXIucm9sZSA9PT0gJ2FkbWluJykge1xuICAgICAgICByZXR1cm4gbmV4dCgpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oeyBlcnJvcjogJ05vdCBhdXRob3JpemVkIGFzIGFkbWluJyB9KTtcbn1cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZGVmYXVsdF8xO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWVdSdGFXNHVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOHVMaTh1TGk4dUxpOXpjbU12YzJWeWRtVnlMMjFwWkdSc1pYZGhjbVV2WVdSdGFXNHVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanM3UVVGQlFTeHRRa0ZCZDBJc1IwRkJVU3hGUVVGRkxFZEJRVkVzUlVGQlJTeEpRVUZqTzBsQlEzUkVMRWxCUVVrc1IwRkJSeXhEUVVGRExFbEJRVWtzU1VGQlNTeEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1MwRkJTeXhQUVVGUExFVkJRVVU3VVVGRGRrTXNUMEZCVHl4SlFVRkpMRVZCUVVVc1EwRkJRenRMUVVOcVFqdEpRVU5FTEU5QlFVOHNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4TFFVRkxMRVZCUVVVc2VVSkJRWGxDTEVWQlFVVXNRMEZCUXl4RFFVRkRPMEZCUTNSRkxFTkJRVU03UVVGTVJDd3JRa0ZMUXlKOSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBqc29ud2VidG9rZW5fMSA9IHJlcXVpcmUoXCJqc29ud2VidG9rZW5cIik7XG52YXIgZW52ID0gcmVxdWlyZSgnLi4vLi4vLi4vZW52Jyk7XG5mdW5jdGlvbiBkZWZhdWx0XzEocmVxLCByZXMsIG5leHQpIHtcbiAgICB2YXIgdG9rZW4gPSByZXEuc2Vzc2lvbi50b2tlbiB8fCByZXEuaGVhZGVyc1sneC1hY2Nlc3MtdG9rZW4nXTtcbiAgICBpZiAoIXRva2VuKVxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oeyBlcnJvcjogJ05vdCBhdXRob3JpemVkJyB9KTtcbiAgICBqc29ud2VidG9rZW5fMS52ZXJpZnkodG9rZW4sIGVudi5zZWNyZXQsIGZ1bmN0aW9uIChlcnIsIGRlY29kZWQpIHtcbiAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuc2VuZCh7IGVycm9yOiAnTm90IGF1dGhvcml6ZWQnIH0pO1xuICAgICAgICByZXEudXNlciA9IGRlY29kZWQ7XG4gICAgICAgIHJldHVybiBuZXh0KCk7XG4gICAgfSk7XG59XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGRlZmF1bHRfMTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVlYVjBhRzl5YVhwbFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1THk0dUwzTnlZeTl6WlhKMlpYSXZiV2xrWkd4bGQyRnlaUzloZFhSb2IzSnBlbVZrTG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN08wRkJRVUVzTmtOQlFYTkRPMEZCUjNSRExFbEJRVTBzUjBGQlJ5eEhRVUZITEU5QlFVOHNRMEZCUXl4alFVRmpMRU5CUVVNc1EwRkJRenRCUVVOd1F5eHRRa0ZCZDBJc1IwRkJXU3hGUVVGRkxFZEJRVzFDTEVWQlFVVXNTVUZCWXp0SlFVTnlSU3hKUVVGSkxFdEJRVXNzUjBGQlJ5eEhRVUZITEVOQlFVTXNUMEZCVHl4RFFVRkRMRXRCUVVzc1NVRkJTU3hIUVVGSExFTkJRVU1zVDBGQlR5eERRVUZETEdkQ1FVRm5RaXhEUVVGRExFTkJRVU03U1VGREwwUXNTVUZCU1N4RFFVRkRMRXRCUVVzN1VVRkRUaXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVVVzUzBGQlN5eEZRVUZGTEdkQ1FVRm5RaXhGUVVGRkxFTkJRVU1zUTBGQlF6dEpRVVUzUkN4eFFrRkJUU3hEUVVGRExFdEJRVXNzUlVGQlJTeEhRVUZITEVOQlFVTXNUVUZCVFN4RlFVRkZMRlZCUVVNc1IwRkJWU3hGUVVGRkxFOUJRV003VVVGRGFrUXNTVUZCU1N4SFFVRkhPMWxCUVVVc1QwRkJUeXhIUVVGSExFTkJRVU1zVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRkxFdEJRVXNzUlVGQlJTeG5Ra0ZCWjBJc1JVRkJSU3hEUVVGRExFTkJRVU03VVVGRGJFVXNSMEZCUnl4RFFVRkRMRWxCUVVrc1IwRkJSeXhQUVVGUExFTkJRVU03VVVGRGJrSXNUMEZCVHl4SlFVRkpMRVZCUVVVc1EwRkJRenRKUVVOc1FpeERRVUZETEVOQlFVTXNRMEZCUXp0QlFVTlFMRU5CUVVNN1FVRldSQ3dyUWtGVlF5SjkiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgbW9uZ29vc2VfMSA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTtcbnZhciBjaGFubmVsU2NoZW1hID0gbmV3IG1vbmdvb3NlXzEuU2NoZW1hKHtcbiAgICBuYW1lOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIGxvd2VyY2FzZTogdHJ1ZSxcbiAgICB9LFxufSwge1xuICAgIHRpbWVzdGFtcHM6IHRydWVcbn0pO1xudmFyIENoYW5uZWwgPSBtb25nb29zZV8xLm1vZGVsKCdDaGFubmVsJywgY2hhbm5lbFNjaGVtYSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IENoYW5uZWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lRMmhoYm01bGJDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1THk0dUwzTnlZeTl6WlhKMlpYSXZiVzlrWld4ekwwTm9ZVzV1Wld3dWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZCUVN4eFEwRkJkMFE3UVVGUmVFUXNTVUZCVFN4aFFVRmhMRWRCUVZjc1NVRkJTU3hwUWtGQlRTeERRVUZETzBsQlEzSkRMRWxCUVVrc1JVRkJSVHRSUVVOR0xFbEJRVWtzUlVGQlJTeE5RVUZOTzFGQlExb3NVVUZCVVN4RlFVRkZMRWxCUVVrN1VVRkRaQ3hUUVVGVExFVkJRVVVzU1VGQlNUdExRVU5zUWp0RFFVTktMRVZCUVVVN1NVRkRReXhWUVVGVkxFVkJRVVVzU1VGQlNUdERRVU51UWl4RFFVRkRMRU5CUVVNN1FVRkZTQ3hKUVVGTkxFOUJRVThzUjBGQmIwSXNaMEpCUVVzc1EwRkJReXhUUVVGVExFVkJRVVVzWVVGQllTeERRVUZETEVOQlFVTTdRVUZEYWtVc2NVSkJRV1VzVDBGQlR5eERRVUZESW4wPSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBtb25nb29zZV8xID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpO1xudmFyIG1lc3NhZ2VTY2hlbWEgPSBuZXcgbW9uZ29vc2VfMS5TY2hlbWEoe1xuICAgIGNoYW5uZWw6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB9LFxuICAgIHRleHQ6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB9LFxuICAgIHVzZXJFbWFpbDoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBsb3dlcmNhc2U6IHRydWUsXG4gICAgfVxufSwge1xuICAgIHRpbWVzdGFtcHM6IHRydWVcbn0pO1xudmFyIE1lc3NhZ2UgPSBtb25nb29zZV8xLm1vZGVsKCdNZXNzYWdlJywgbWVzc2FnZVNjaGVtYSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IE1lc3NhZ2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lUV1Z6YzJGblpTNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1THk0dUwzTnlZeTl6WlhKMlpYSXZiVzlrWld4ekwwMWxjM05oWjJVdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZCUVN4eFEwRkJkMFE3UVVGVmVFUXNTVUZCVFN4aFFVRmhMRWRCUVZjc1NVRkJTU3hwUWtGQlRTeERRVUZETzBsQlEzSkRMRTlCUVU4c1JVRkJSVHRSUVVOTUxFbEJRVWtzUlVGQlJTeE5RVUZOTzFGQlExb3NVVUZCVVN4RlFVRkZMRWxCUVVrN1MwRkZha0k3U1VGRFJDeEpRVUZKTEVWQlFVVTdVVUZEUml4SlFVRkpMRVZCUVVVc1RVRkJUVHRSUVVOYUxGRkJRVkVzUlVGQlJTeEpRVUZKTzB0QlEycENPMGxCUTBRc1UwRkJVeXhGUVVGRk8xRkJRMUFzU1VGQlNTeEZRVUZGTEUxQlFVMDdVVUZEV2l4UlFVRlJMRVZCUVVVc1NVRkJTVHRSUVVOa0xGTkJRVk1zUlVGQlJTeEpRVUZKTzB0QlJXeENPME5CUTBvc1JVRkJSVHRKUVVORExGVkJRVlVzUlVGQlJTeEpRVUZKTzBOQlEyNUNMRU5CUVVNc1EwRkJRenRCUVVWSUxFbEJRVTBzVDBGQlR5eEhRVUZ2UWl4blFrRkJTeXhEUVVGRExGTkJRVk1zUlVGQlJTeGhRVUZoTEVOQlFVTXNRMEZCUXp0QlFVTnFSU3h4UWtGQlpTeFBRVUZQTEVOQlFVTWlmUT09IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIG1vbmdvb3NlXzEgPSByZXF1aXJlKFwibW9uZ29vc2VcIik7XG47XG52YXIgdXNlclNjaGVtYSA9IG5ldyBtb25nb29zZV8xLlNjaGVtYSh7XG4gICAgbmFtZTogU3RyaW5nLFxuICAgIGVtYWlsOiB7XG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIGxvd2VyY2FzZTogdHJ1ZVxuICAgIH0sXG4gICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgcm9sZToge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBsb3dlcmNhc2U6IHRydWUsXG4gICAgICAgIFwiZW51bVwiOiBbJ2FkbWluJywgJ3VzZXInXVxuICAgIH0sXG4gICAgZGVsZXRlZDoge1xuICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICBcImRlZmF1bHRcIjogZmFsc2VcbiAgICB9LFxuICAgIHZlcmlmaWVkOiB7XG4gICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgIFwiZGVmYXVsdFwiOiBmYWxzZSxcbiAgICB9LFxufSwge1xuICAgIHRpbWVzdGFtcHM6IHRydWVcbn0pO1xudXNlclNjaGVtYS5zdGF0aWNzLmZpbmRCeUVtYWlsID0gZnVuY3Rpb24gKGVtYWlsKSB7XG4gICAgcmV0dXJuIHRoaXMuZmluZE9uZSh7IGVtYWlsOiBlbWFpbCB9KTtcbn07XG52YXIgVXNlciA9IG1vbmdvb3NlXzEubW9kZWwoJ1VzZXInLCB1c2VyU2NoZW1hKTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gVXNlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVZYTmxjaTVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUx5NHVMM055WXk5elpYSjJaWEl2Ylc5a1pXeHpMMVZ6WlhJdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZCUVN4eFEwRkJPRVU3UVVGWk4wVXNRMEZCUXp0QlFVMUdMRWxCUVUwc1ZVRkJWU3hIUVVGWExFbEJRVWtzYVVKQlFVMHNRMEZCUXp0SlFVTnNReXhKUVVGSkxFVkJRVVVzVFVGQlRUdEpRVU5hTEV0QlFVc3NSVUZCUlR0UlFVTklMRkZCUVZFc1JVRkJSU3hKUVVGSk8xRkJRMlFzU1VGQlNTeEZRVUZGTEUxQlFVMDdVVUZEV2l4VFFVRlRMRVZCUVVVc1NVRkJTVHRMUVVOc1FqdEpRVU5FTEZGQlFWRXNSVUZCUlR0UlFVTk9MRWxCUVVrc1JVRkJSU3hOUVVGTk8xRkJRMW9zVVVGQlVTeEZRVUZGTEVsQlFVazdTMEZEYWtJN1NVRkRSQ3hKUVVGSkxFVkJRVVU3VVVGRFJpeEpRVUZKTEVWQlFVVXNUVUZCVFR0UlFVTmFMRkZCUVZFc1JVRkJSU3hKUVVGSk8xRkJRMlFzVTBGQlV5eEZRVUZGTEVsQlFVazdVVUZEWml4TlFVRkpMRVZCUVVVc1EwRkJReXhQUVVGUExFVkJRVVVzVFVGQlRTeERRVUZETzB0QlF6RkNPMGxCUTBRc1QwRkJUeXhGUVVGRk8xRkJRMHdzU1VGQlNTeEZRVUZGTEU5QlFVODdVVUZEWWl4VFFVRlBMRVZCUVVVc1MwRkJTenRMUVVOcVFqdEpRVU5FTEZGQlFWRXNSVUZCUlR0UlFVTk9MRWxCUVVrc1JVRkJSU3hQUVVGUE8xRkJRMklzVTBGQlR5eEZRVUZGTEV0QlFVczdTMEZEYWtJN1EwRkRTaXhGUVVGRk8wbEJRME1zVlVGQlZTeEZRVUZGTEVsQlFVazdRMEZEYmtJc1EwRkJReXhEUVVGRE8wRkJSVWdzVlVGQlZTeERRVUZETEU5QlFVOHNRMEZCUXl4WFFVRlhMRWRCUVVjc1ZVRkJWU3hMUVVGaE8wbEJRM0JFTEU5QlFVOHNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhGUVVGRExFdEJRVXNzUlVGQlJTeExRVUZMTEVWQlFVTXNRMEZCUXl4RFFVRkRPMEZCUTNoRExFTkJRVU1zUTBGQlFUdEJRVVZFTEVsQlFVMHNTVUZCU1N4SFFVRmxMR2RDUVVGTExFTkJRVzlDTEUxQlFVMHNSVUZCUlN4VlFVRlZMRU5CUVVNc1EwRkJRenRCUVVOMFJTeHhRa0ZCWlN4SlFVRkpMRU5CUVVNaWZRPT0iLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xudmFyIGF1dGhvcml6ZWRfMSA9IHJlcXVpcmUoXCIuL21pZGRsZXdhcmUvYXV0aG9yaXplZFwiKTtcbnZhciBhZG1pbl8xID0gcmVxdWlyZShcIi4vbWlkZGxld2FyZS9hZG1pblwiKTtcbnZhciBhdXRoQ29udHJvbGxlcl8xID0gcmVxdWlyZShcIi4vY29udHJvbGxlcnMvYXV0aENvbnRyb2xsZXJcIik7XG52YXIgdXNlckNvbnRyb2xsZXJfMSA9IHJlcXVpcmUoXCIuL2NvbnRyb2xsZXJzL3VzZXJDb250cm9sbGVyXCIpO1xudmFyIG1lc3NhZ2VDb250cm9sbGVyXzEgPSByZXF1aXJlKFwiLi9jb250cm9sbGVycy9tZXNzYWdlQ29udHJvbGxlclwiKTtcbnZhciBjaGFubmVsQ29udHJvbGxlcl8xID0gcmVxdWlyZShcIi4vY29udHJvbGxlcnMvY2hhbm5lbENvbnRyb2xsZXJcIik7XG5mdW5jdGlvbiBkZWZhdWx0XzEoYXBwKSB7XG4gICAgYXBwLmdldCgnLycsIGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICByZXR1cm4gcmVzLnJlbmRlcihwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vZGlzdC9wdWJsaWMvaW5kZXguaHRtbCcpLCB7IGNzcmZUb2tlbjogcmVxLmNzcmZUb2tlbigpIH0pO1xuICAgIH0pO1xuICAgIGFwcC5nZXQoJy93aWRnZXQnLCBmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5yZW5kZXIocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uLy4uL2Rpc3QvcHVibGljL3dpZGdldC9pbmRleC5odG1sJykpO1xuICAgIH0pO1xuICAgIGFwcC5nZXQoJy93aWRnZXQvZGVtbycsIGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICByZXR1cm4gcmVzLnJlbmRlcihwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vLi4vZGlzdC9wdWJsaWMvd2lkZ2V0L2RlbW8uaHRtbCcpKTtcbiAgICB9KTtcbiAgICBhcHAucG9zdCgnL2FwaS92MS9sb2dpbicsIGF1dGhDb250cm9sbGVyXzFbXCJkZWZhdWx0XCJdLmxvZ2luKTtcbiAgICBhcHAucG9zdCgnL2FwaS92MS9yZWdpc3RlcicsIGF1dGhDb250cm9sbGVyXzFbXCJkZWZhdWx0XCJdLnJlZ2lzdGVyKTtcbiAgICBhcHAuZ2V0KCcvYXBpL3YxL2xvZ291dCcsIGF1dGhDb250cm9sbGVyXzFbXCJkZWZhdWx0XCJdLmxvZ291dCk7XG4gICAgYXBwLmdldCgnL2FwaS92MS92ZXJpZnlFbWFpbC86aWQnLCBhdXRoQ29udHJvbGxlcl8xW1wiZGVmYXVsdFwiXS52ZXJpZnlFbWFpbCk7XG4gICAgYXBwLnVzZSgnL2FwaS92MS91c2VyKicsIGF1dGhvcml6ZWRfMVtcImRlZmF1bHRcIl0pO1xuICAgIGFwcC5nZXQoJy9hcGkvdjEvdXNlcicsIHVzZXJDb250cm9sbGVyXzFbXCJkZWZhdWx0XCJdLnVzZXIpO1xuICAgIGFwcC5nZXQoJy9hcGkvdjEvdXNlcnMnLCB1c2VyQ29udHJvbGxlcl8xW1wiZGVmYXVsdFwiXS51c2Vycyk7XG4gICAgYXBwLmdldCgnL2FwaS92MS91c2VyLzp1c2VyJywgdXNlckNvbnRyb2xsZXJfMVtcImRlZmF1bHRcIl0udXNlckJ5RW1haWwpO1xuICAgIGFwcC5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL2VtYWlsJywgdXNlckNvbnRyb2xsZXJfMVtcImRlZmF1bHRcIl0udXBkYXRlRW1haWwpO1xuICAgIGFwcC5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL25hbWUnLCB1c2VyQ29udHJvbGxlcl8xW1wiZGVmYXVsdFwiXS51cGRhdGVOYW1lKTtcbiAgICBhcHAucG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9wYXNzd29yZCcsIHVzZXJDb250cm9sbGVyXzFbXCJkZWZhdWx0XCJdLnVwZGF0ZVBhc3N3b3JkKTtcbiAgICBhcHAucG9zdCgnL2FwaS92MS91c2VyL3Jlc2V0X3Bhc3N3b3JkJywgdXNlckNvbnRyb2xsZXJfMVtcImRlZmF1bHRcIl0ucmVzZXRQYXNzd29yZCk7XG4gICAgYXBwLnBvc3QoJy9hcGkvdjEvdXNlci9jcmVhdGUnLCBhZG1pbl8xW1wiZGVmYXVsdFwiXSwgdXNlckNvbnRyb2xsZXJfMVtcImRlZmF1bHRcIl0uY3JlYXRlVXNlcik7XG4gICAgYXBwLnB1dCgnL2FwaS92MS91c2VyL3VwZGF0ZScsIGFkbWluXzFbXCJkZWZhdWx0XCJdLCB1c2VyQ29udHJvbGxlcl8xW1wiZGVmYXVsdFwiXS5lZGl0VXNlcik7XG4gICAgYXBwW1wiZGVsZXRlXCJdKCcvYXBpL3YxL3VzZXIvZGVsZXRlJywgYWRtaW5fMVtcImRlZmF1bHRcIl0sIHVzZXJDb250cm9sbGVyXzFbXCJkZWZhdWx0XCJdLmRlbGV0ZVVzZXIpO1xuICAgIGFwcC5wdXQoJy9hcGkvdjEvdXNlci9yZXN0b3JlJywgYWRtaW5fMVtcImRlZmF1bHRcIl0sIHVzZXJDb250cm9sbGVyXzFbXCJkZWZhdWx0XCJdLnJlc3RvcmVVc2VyKTtcbiAgICBhcHAudXNlKCcvYXBpL3YxL21lc3NhZ2UqJywgYXV0aG9yaXplZF8xW1wiZGVmYXVsdFwiXSk7XG4gICAgYXBwLmdldCgnL2FwaS92MS9tZXNzYWdlcy86Y2hhbm5lbC86b2Zmc2V0JywgbWVzc2FnZUNvbnRyb2xsZXJfMVtcImRlZmF1bHRcIl0ubWVzc2FnZXMpO1xuICAgIGFwcC51c2UoJy9hcGkvdjEvY2hhbm5lbCcsIGF1dGhvcml6ZWRfMVtcImRlZmF1bHRcIl0pO1xuICAgIGFwcC5nZXQoJy9hcGkvdjEvY2hhbm5lbHMnLCBjaGFubmVsQ29udHJvbGxlcl8xW1wiZGVmYXVsdFwiXS5jaGFubmVscyk7XG4gICAgYXBwLnBvc3QoJy9hcGkvdjEvY2hhbm5lbHMvZGVsZXRlJywgYWRtaW5fMVtcImRlZmF1bHRcIl0sIGNoYW5uZWxDb250cm9sbGVyXzFbXCJkZWZhdWx0XCJdW1wiZGVsZXRlXCJdKTtcbiAgICBhcHAucG9zdCgnL2FwaS92MS9jaGFubmVscy9jcmVhdGUnLCBhZG1pbl8xW1wiZGVmYXVsdFwiXSwgY2hhbm5lbENvbnRyb2xsZXJfMVtcImRlZmF1bHRcIl0uY3JlYXRlKTtcbiAgICBhcHAuZ2V0KCcqJywgZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgICAgIHJldHVybiByZXMucmVuZGVyKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi9kaXN0L3B1YmxpYy9pbmRleC5odG1sJyksIHsgY3NyZlRva2VuOiByZXEuY3NyZlRva2VuKCkgfSk7XG4gICAgfSk7XG59XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGRlZmF1bHRfMTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWNtOTFkR1Z6TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dkxpNHZjM0pqTDNObGNuWmxjaTl5YjNWMFpYTXVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanM3UVVGQlFTd3lRa0ZCTmtJN1FVRkZOMElzYzBSQlFXbEVPMEZCUTJwRUxEUkRRVUYxUXp0QlFVTjJReXdyUkVGQk1FUTdRVUZETVVRc0swUkJRVEJFTzBGQlF6RkVMSEZGUVVGblJUdEJRVU5vUlN4eFJVRkJaMFU3UVVGRmFFVXNiVUpCUVhkQ0xFZEJRVkU3U1VGSE5VSXNSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXhIUVVGSExFVkJRVVVzVlVGQlZTeEhRVUZaTEVWQlFVVXNSMEZCWVR0UlFVTTVReXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlEySXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhUUVVGVExFVkJRVVVzT0VKQlFUaENMRU5CUVVNc1JVRkRka1FzUlVGQlJTeFRRVUZUTEVWQlFVVXNSMEZCUnl4RFFVRkRMRk5CUVZNc1JVRkJSU3hGUVVGRkxFTkJRMnBETEVOQlFVTTdTVUZEVGl4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVWSUxFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNVMEZCVXl4RlFVRkZMRlZCUVZVc1IwRkJVU3hGUVVGRkxFZEJRVkU3VVVGRE0wTXNUMEZCVHl4SFFVRkhMRU5CUVVNc1RVRkJUU3hEUVVOaUxFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNVMEZCVXl4RlFVRkZMSGREUVVGM1F5eERRVUZETEVOQlEzQkZMRU5CUVVNN1NVRkRUaXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVVZJTEVkQlFVY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1kwRkJZeXhGUVVGRkxGVkJRVlVzUjBGQlVTeEZRVUZGTEVkQlFWRTdVVUZEYUVRc1QwRkJUeXhIUVVGSExFTkJRVU1zVFVGQlRTeERRVU5pTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1UwRkJVeXhGUVVGRkxIVkRRVUYxUXl4RFFVRkRMRU5CUTI1RkxFTkJRVU03U1VGRFRpeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVbElMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zWlVGQlpTeEZRVUZGTERKQ1FVRmpMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU03U1VGRGFFUXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhyUWtGQmEwSXNSVUZCUlN3eVFrRkJZeXhEUVVGRExGRkJRVkVzUTBGQlF5eERRVUZETzBsQlEzUkVMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zWjBKQlFXZENMRVZCUVVVc01rSkJRV01zUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXp0SlFVTnFSQ3hIUVVGSExFTkJRVU1zUjBGQlJ5eERRVUZETEhsQ1FVRjVRaXhGUVVGRkxESkNRVUZqTEVOQlFVTXNWMEZCVnl4RFFVRkRMRU5CUVVNN1NVRkZMMFFzUjBGQlJ5eERRVUZETEVkQlFVY3NRMEZCUXl4bFFVRmxMRVZCUVVVc2RVSkJRVlVzUTBGQlF5eERRVUZETzBsQlEzSkRMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zWTBGQll5eEZRVUZGTERKQ1FVRmpMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03U1VGRE4wTXNSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXhsUVVGbExFVkJRVVVzTWtKQlFXTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRVHRKUVVNNVF5eEhRVUZITEVOQlFVTXNSMEZCUnl4RFFVRkRMRzlDUVVGdlFpeEZRVUZGTERKQ1FVRmpMRU5CUVVNc1YwRkJWeXhEUVVGRExFTkJRVU03U1VGRE1VUXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXd5UWtGQk1rSXNSVUZCUlN3eVFrRkJZeXhEUVVGRExGZEJRVmNzUTBGQlF5eERRVUZETzBsQlEyeEZMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zTUVKQlFUQkNMRVZCUVVVc01rSkJRV01zUTBGQlF5eFZRVUZWTEVOQlFVTXNRMEZCUXp0SlFVTm9SU3hIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETERoQ1FVRTRRaXhGUVVGRkxESkNRVUZqTEVOQlFVTXNZMEZCWXl4RFFVRkRMRU5CUVVNN1NVRkRlRVVzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl3MlFrRkJOa0lzUlVGQlJTd3lRa0ZCWXl4RFFVRkRMR0ZCUVdFc1EwRkJReXhEUVVGRE8wbEJRM1JGTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc2NVSkJRWEZDTEVWQlFVVXNhMEpCUVVzc1JVRkJSU3d5UWtGQll5eERRVUZETEZWQlFWVXNRMEZCUXl4RFFVRkRPMGxCUTJ4RkxFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNjVUpCUVhGQ0xFVkJRVVVzYTBKQlFVc3NSVUZCUlN3eVFrRkJZeXhEUVVGRExGRkJRVkVzUTBGQlF5eERRVUZETzBsQlF5OUVMRWRCUVVjc1EwRkJReXhSUVVGTkxFTkJRVUVzUTBGQlF5eHhRa0ZCY1VJc1JVRkJSU3hyUWtGQlN5eEZRVUZGTERKQ1FVRmpMRU5CUVVNc1ZVRkJWU3hEUVVGRExFTkJRVU03U1VGRGNFVXNSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXh6UWtGQmMwSXNSVUZCUlN4clFrRkJTeXhGUVVGRkxESkNRVUZqTEVOQlFVTXNWMEZCVnl4RFFVRkRMRU5CUVVNN1NVRkZia1VzUjBGQlJ5eERRVUZETEVkQlFVY3NRMEZCUXl4clFrRkJhMElzUlVGQlJTeDFRa0ZCVlN4RFFVRkRMRU5CUVVNN1NVRkRlRU1zUjBGQlJ5eERRVUZETEVkQlFVY3NRMEZCUXl4dFEwRkJiVU1zUlVGQlJTdzRRa0ZCYVVJc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF6dEpRVVY2UlN4SFFVRkhMRU5CUVVNc1IwRkJSeXhEUVVGRExHbENRVUZwUWl4RlFVRkZMSFZDUVVGVkxFTkJRVU1zUTBGQlF6dEpRVU4yUXl4SFFVRkhMRU5CUVVNc1IwRkJSeXhEUVVGRExHdENRVUZyUWl4RlFVRkZMRGhDUVVGcFFpeERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRPMGxCUTNoRUxFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNlVUpCUVhsQ0xFVkJRVVVzYTBKQlFVc3NSVUZCUlN3NFFrRkJhVUlzUTBGQlF5eFJRVUZOTEVOQlFVRXNRMEZCUXl4RFFVRkRPMGxCUTNKRkxFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNlVUpCUVhsQ0xFVkJRVVVzYTBKQlFVc3NSVUZCUlN3NFFrRkJhVUlzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXp0SlFVZHlSU3hIUVVGSExFTkJRVU1zUjBGQlJ5eERRVUZETEVkQlFVY3NSVUZCUlN4VlFVRlZMRWRCUVZrc1JVRkJSU3hIUVVGaE8xRkJRemxETEU5QlFVOHNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkRZaXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEZOQlFWTXNSVUZCUlN3NFFrRkJPRUlzUTBGQlF5eEZRVU4yUkN4RlFVRkZMRk5CUVZNc1JVRkJSU3hIUVVGSExFTkJRVU1zVTBGQlV5eEZRVUZGTEVWQlFVVXNRMEZEYWtNc1EwRkJRenRKUVVOT0xFTkJRVU1zUTBGQlF5eERRVUZETzBGQlExQXNRMEZCUXp0QlFYcEVSQ3dyUWtGNVJFTWlmUT09IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcbnZhciBleHByZXNzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG52YXIgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xudmFyIG1vbmdvb3NlID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpO1xudmFyIGNzcmYgPSByZXF1aXJlKFwiY3N1cmZcIik7XG52YXIgY29va2llUGFyc2VyID0gcmVxdWlyZShcImNvb2tpZS1wYXJzZXJcIik7XG52YXIgc2Vzc2lvbiA9IHJlcXVpcmUoXCJleHByZXNzLXNlc3Npb25cIik7XG52YXIgYm9keVBhcnNlciA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTtcbnZhciBiY3J5cHQgPSByZXF1aXJlKFwiYmNyeXB0anNcIik7XG52YXIgaGVsbWV0ID0gcmVxdWlyZShcImhlbG1ldFwiKTtcbnZhciBjb21wcmVzc2lvbiA9IHJlcXVpcmUoXCJjb21wcmVzc2lvblwiKTtcbnZhciBqc29ud2VidG9rZW5fMSA9IHJlcXVpcmUoXCJqc29ud2VidG9rZW5cIik7XG52YXIgbXVzdGFjaGVFeHByZXNzID0gcmVxdWlyZSgnbXVzdGFjaGUtZXhwcmVzcycpO1xudmFyIE1vbmdvU3RvcmUgPSByZXF1aXJlKCdjb25uZWN0LW1vbmdvJykoc2Vzc2lvbik7XG52YXIgcm91dGVzXzEgPSByZXF1aXJlKFwiLi9yb3V0ZXNcIik7XG52YXIgaW5kZXhfMSA9IHJlcXVpcmUoXCIuL3NvY2tldC5pby9pbmRleFwiKTtcbnZhciBVc2VyXzEgPSByZXF1aXJlKFwiLi9tb2RlbHMvVXNlclwiKTtcbnZhciBlbnYgPSByZXF1aXJlKCcuLi8uLi9lbnYnKTtcbnZhciBhcHAgPSBleHByZXNzKCk7XG5leHBvcnRzLmFwcCA9IGFwcDtcbnZhciBwb3J0ID0gZW52LnBvcnQ7XG52YXIgc2VydmVyO1xudmFyIHNvY2tldFNlcnZlcjtcbmV4cG9ydHMuc29ja2V0U2VydmVyID0gc29ja2V0U2VydmVyO1xuYXBwLmVuZ2luZSgnaHRtbCcsIG11c3RhY2hlRXhwcmVzcygpKTtcbmFwcC5zZXQoJ3ZpZXcgZW5naW5lJywgJ2h0bWwnKTtcbmFwcC51c2UoY29tcHJlc3Npb24oKSk7XG52YXIgc2Vzc2lvbk1pZGRsZXdhcmUgPSBzZXNzaW9uKHtcbiAgICBzZWNyZXQ6IGVudi5zZWNyZXQsXG4gICAgY29va2llOiB7XG4gICAgICAgIG1heEFnZTogMjQgKiA2MCAqIDYwICogMTAwMCxcbiAgICAgICAgc2FtZVNpdGU6IHRydWUsXG4gICAgICAgIHNlY3VyZTogZW52LnByb2R1Y3Rpb24sXG4gICAgICAgIGh0dHBPbmx5OiB0cnVlXG4gICAgfSxcbiAgICBzYXZlVW5pbml0aWFsaXplZDogdHJ1ZSxcbiAgICByZXNhdmU6IGZhbHNlLFxuICAgIHN0b3JlOiBuZXcgTW9uZ29TdG9yZSh7XG4gICAgICAgIG1vbmdvb3NlQ29ubmVjdGlvbjogbW9uZ29vc2UuY29ubmVjdGlvblxuICAgIH0pXG59KTtcbnZhciBjc3JmTWlkZGxld2FyZSA9IGNzcmYoe1xuICAgIGNvb2tpZToge1xuICAgICAgICBtYXhBZ2U6IDI0ICogNjAgKiA2MCAqIDEwMDAsXG4gICAgICAgIHNhbWVTaXRlOiB0cnVlLFxuICAgICAgICBzZWN1cmU6IGVudi5wcm9kdWN0aW9uLFxuICAgICAgICBodHRwT25seTogdHJ1ZSxcbiAgICAgICAga2V5OiAnX2NzcmYnXG4gICAgfVxufSk7XG5tb25nb29zZS5jb25uZWN0KGVudi51c2VUZXN0RGIgPyBlbnYubW9uZ29kYlRlc3RDb25uZWN0aW9uVXJpIDogZW52Lm1vbmdvZGJDb25uZWN0aW9uVXJpLCB7IHVzZU5ld1VybFBhcnNlcjogdHJ1ZSB9KTtcbm1vbmdvb3NlLmNvbm5lY3Rpb24ub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ01vbmdvb3NlIGNvbm5lY3Rpb24gZXJyb3InLCBlcnIpO1xufSk7XG5wcm9jZXNzLm9uKCdTSUdJTlQnLCBmdW5jdGlvbiAoKSB7XG4gICAgbW9uZ29vc2UuY29ubmVjdGlvbi5jbG9zZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdNb25nb29zZSBkZWZhdWx0IGNvbm5lY3Rpb24gZGlzY29ubmVjdGVkIHRocm91Z2ggYXBwIHRlcm1pbmF0aW9uJyk7XG4gICAgICAgIHNlcnZlci5jbG9zZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBwcm9jZXNzLmV4aXQoMCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG5hcHAudXNlKHNlc3Npb25NaWRkbGV3YXJlKTtcbmFwcC51c2UoY29va2llUGFyc2VyKGVudi5zZWNyZXQpKTtcbmlmIChlbnYuZGlzYWJsZUNzcmYpIHtcbiAgICBjb25zb2xlLmxvZygnQ1NSRiBkaXNhYmxlZCcpO1xuICAgIGFwcC51c2UoZnVuY3Rpb24gKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHJlcS5jc3JmVG9rZW4gPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnJzsgfTtcbiAgICAgICAgcmV0dXJuIG5leHQoKTtcbiAgICB9KTtcbn1cbmVsc2Uge1xuICAgIGFwcC51c2UoY3NyZk1pZGRsZXdhcmUpO1xufVxudmFyIGRiID0gbW9uZ29vc2UuY29ubmVjdGlvbjtcbmFwcC51c2UoZnVuY3Rpb24gKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgcmVxLmRiID0gZGI7XG4gICAgcmV0dXJuIG5leHQoKTtcbn0pO1xuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiB0cnVlIH0pKTtcbmFwcC51c2UoaGVsbWV0KCkpO1xuYXBwLnVzZShleHByZXNzLnN0YXRpYyhwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vZGlzdC9wdWJsaWMvJykpKTtcbmFwcC51c2UoJy9hcGknLCBmdW5jdGlvbiAocmVxLCByZXMsIG5leHQpIHtcbiAgICByZXR1cm4gbmV4dCgpO1xufSk7XG5hcHAudXNlKGZ1bmN0aW9uIChyZXEsIHJlcywgbmV4dCkge1xuICAgIHJlcS5hdXRoZW50aWNhdGUgPSBmdW5jdGlvbiAoZW1haWwsIHBhc3N3b3JkLCBkb25lKSB7XG4gICAgICAgIFVzZXJfMVtcImRlZmF1bHRcIl0uZmluZEJ5RW1haWwoZW1haWwpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgICAgIGlmICh1c2VyID09PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGZhbHNlLCBudWxsKTtcbiAgICAgICAgICAgIGlmICghYmNyeXB0LmNvbXBhcmVTeW5jKHBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShmYWxzZSwgbmV3IEVycm9yKCdJbnZhbGlkIHBhc3N3b3JkJykpO1xuICAgICAgICAgICAgdmFyIHVzZXJEZXRhaWxzID0ge1xuICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICAgICAgICByb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIGRvbmUodXNlckRldGFpbHMsIG51bGwpO1xuICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGRvbmUoZmFsc2UsIGVycik7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmVxLmxvZ291dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVxLnNlc3Npb24udG9rZW4gPSBudWxsO1xuICAgIH07XG4gICAgcmVxLmlzc3VlTmV3VG9rZW4gPSBmdW5jdGlvbiAodXNlcikge1xuICAgICAgICB2YXIgdG9rZW4gPSBqc29ud2VidG9rZW5fMS5zaWduKHtcbiAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICAgIHJvbGU6IHVzZXIucm9sZSxcbiAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsXG4gICAgICAgIH0sIGVudi5zZWNyZXQsIHtcbiAgICAgICAgICAgIGV4cGlyZXNJbjogODY0MDBcbiAgICAgICAgfSk7XG4gICAgICAgIHJlcy5zZXRIZWFkZXIoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pO1xuICAgICAgICByZXEuc2Vzc2lvbi50b2tlbiA9IHRva2VuO1xuICAgIH07XG4gICAgbmV4dCgpO1xufSk7XG5yb3V0ZXNfMVtcImRlZmF1bHRcIl0oYXBwKTtcbnNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKGFwcCk7XG5zZXJ2ZXIub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICBzZXJ2ZXIuY2xvc2UoKTtcbn0pO1xuaWYgKCFlbnYuZGlzYWJsZUF1dG9TdGFydCkge1xuICAgIGV4cG9ydHMuc29ja2V0U2VydmVyID0gc29ja2V0U2VydmVyID0gaW5kZXhfMVtcImRlZmF1bHRcIl0oc2VydmVyLCBkYiwgc2Vzc2lvbk1pZGRsZXdhcmUpO1xuICAgIG1vbmdvb3NlLmNvbm5lY3Rpb24ub24oJ2Nvbm5lY3RlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0Nvbm5lY3RlZCB0byBNb25nb0RCIHZpYSBNb25nb29zZScpO1xuICAgICAgICBzZXJ2ZXIubGlzdGVuKHBvcnQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTGlzdGVuaW5nIG9uIHBvcnQgXCIgKyBwb3J0ICsgXCIhXCIpO1xuICAgICAgICAgICAgYXBwLmVtaXQoJ3NlcnZlciBzdGFydGVkJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBzZXJ2ZXI7XG5leHBvcnRzLmNvbm4gPSBtb25nb29zZS5jb25uZWN0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYzJWeWRtVnlMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dmMzSmpMM05sY25abGNpOXpaWEoyWlhJdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZGUVN3eVFrRkJOa0k3UVVGRE4wSXNhVU5CUVcxRE8wRkJRMjVETERKQ1FVRTJRanRCUVVVM1FpeHRRMEZCY1VNN1FVRkRja01zTkVKQlFUaENPMEZCUXpsQ0xEUkRRVUU0UXp0QlFVTTVReXg1UTBGQk1rTTdRVUZETTBNc2QwTkJRVEJETzBGQlF6RkRMR2xEUVVGdFF6dEJRVU51UXl3clFrRkJhVU03UVVGRmFrTXNlVU5CUVRKRE8wRkJRek5ETERaRFFVRnZRenRCUVVOd1F5eEpRVUZOTEdWQlFXVXNSMEZCUnl4UFFVRlBMRU5CUVVNc2EwSkJRV3RDTEVOQlFVTXNRMEZCUXp0QlFVTndSQ3hKUVVGTkxGVkJRVlVzUjBGQlJ5eFBRVUZQTEVOQlFVTXNaVUZCWlN4RFFVRkRMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU03UVVGRmNrUXNiVU5CUVRoQ08wRkJRemxDTERKRFFVRXdRenRCUVVVeFF5eHpRMEZCTkVNN1FVRkROVU1zU1VGQlRTeEhRVUZITEVkQlFVY3NUMEZCVHl4RFFVRkRMRmRCUVZjc1EwRkJReXhEUVVGRE8wRkJSV3BETEVsQlFVMHNSMEZCUnl4SFFVRlJMRTlCUVU4c1JVRkJSU3hEUVVGRE8wRkJjMGxzUWl4clFrRkJSenRCUVhKSldpeEpRVUZOTEVsQlFVa3NSMEZCYjBJc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF6dEJRVU4yUXl4SlFVRkpMRTFCUVcxQ0xFTkJRVU03UVVGRGVFSXNTVUZCU1N4WlFVRTJRaXhEUVVGRE8wRkJiVWx3UWl4dlEwRkJXVHRCUVdwSk1VSXNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhOUVVGTkxFVkJRVVVzWlVGQlpTeEZRVUZGTEVOQlFVTXNRMEZCUXp0QlFVTjBReXhIUVVGSExFTkJRVU1zUjBGQlJ5eERRVUZETEdGQlFXRXNSVUZCUlN4TlFVRk5MRU5CUVVNc1EwRkJRenRCUVVVdlFpeEhRVUZITEVOQlFVTXNSMEZCUnl4RFFVRkRMRmRCUVZjc1JVRkJSU3hEUVVGRExFTkJRVU03UVVGRmRrSXNTVUZCVFN4cFFrRkJhVUlzUjBGQlJ5eFBRVUZQTEVOQlFVTTdTVUZET1VJc1RVRkJUU3hGUVVGRkxFZEJRVWNzUTBGQlF5eE5RVUZOTzBsQlEyeENMRTFCUVUwc1JVRkJSVHRSUVVOS0xFMUJRVTBzUlVGQlJTeEZRVUZGTEVkQlFVY3NSVUZCUlN4SFFVRkhMRVZCUVVVc1IwRkJSeXhKUVVGSk8xRkJRek5DTEZGQlFWRXNSVUZCUlN4SlFVRkpPMUZCUTJRc1RVRkJUU3hGUVVGRkxFZEJRVWNzUTBGQlF5eFZRVUZWTzFGQlEzUkNMRkZCUVZFc1JVRkJSU3hKUVVGSk8wdEJRMnBDTzBsQlEwUXNhVUpCUVdsQ0xFVkJRVVVzU1VGQlNUdEpRVU4yUWl4TlFVRk5MRVZCUVVVc1MwRkJTenRKUVVOaUxFdEJRVXNzUlVGQlJTeEpRVUZKTEZWQlFWVXNRMEZCUXp0UlFVTnNRaXhyUWtGQmEwSXNSVUZCUlN4UlFVRlJMRU5CUVVNc1ZVRkJWVHRMUVVNeFF5eERRVUZETzBOQlEwd3NRMEZCUXl4RFFVRkRPMEZCUlVnc1NVRkJUU3hqUVVGakxFZEJRVWNzU1VGQlNTeERRVUZETzBsQlEzaENMRTFCUVUwc1JVRkJSVHRSUVVOS0xFMUJRVTBzUlVGQlJTeEZRVUZGTEVkQlFVY3NSVUZCUlN4SFFVRkhMRVZCUVVVc1IwRkJSeXhKUVVGSk8xRkJRek5DTEZGQlFWRXNSVUZCUlN4SlFVRkpPMUZCUTJRc1RVRkJUU3hGUVVGRkxFZEJRVWNzUTBGQlF5eFZRVUZWTzFGQlEzUkNMRkZCUVZFc1JVRkJSU3hKUVVGSk8xRkJRMlFzUjBGQlJ5eEZRVUZGTEU5QlFVODdTMEZEWmp0RFFVTktMRU5CUVVNc1EwRkJRVHRCUVVWR0xGRkJRVkVzUTBGQlF5eFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEhkQ1FVRjNRaXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNiMEpCUVc5Q0xFVkJRVVVzUlVGQlJTeGxRVUZsTEVWQlFVVXNTVUZCU1N4RlFVRkZMRU5CUVVNc1EwRkJRenRCUVVOeVNDeFJRVUZSTEVOQlFVTXNWVUZCVlN4RFFVRkRMRVZCUVVVc1EwRkJReXhQUVVGUExFVkJRVVVzVlVGQlV5eEhRVUZITzBsQlEzaERMRTlCUVU4c1EwRkJReXhMUVVGTExFTkJRVU1zTWtKQlFUSkNMRVZCUVVVc1IwRkJSeXhEUVVGRExFTkJRVU03UVVGRGNFUXNRMEZCUXl4RFFVRkRMRU5CUVVNN1FVRkZTQ3hQUVVGUExFTkJRVU1zUlVGQlJTeERRVUZETEZGQlFWRXNSVUZCUlR0SlFVTnFRaXhSUVVGUkxFTkJRVU1zVlVGQlZTeERRVUZETEV0QlFVc3NRMEZCUXp0UlFVTjBRaXhQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEd0RlFVRnJSU3hEUVVGRExFTkJRVU03VVVGRGFFWXNUVUZCVFN4RFFVRkRMRXRCUVVzc1EwRkJRenRaUVVOVUxFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRjRUlzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenRCUVVOUUxFTkJRVU1zUTBGQlF5eERRVUZETzBGQlJVZ3NSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXhwUWtGQmFVSXNRMEZCUXl4RFFVRkRPMEZCUXpOQ0xFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNXVUZCV1N4RFFVRkRMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF5eERRVUZETzBGQlJXeERMRWxCUVVjc1IwRkJSeXhEUVVGRExGZEJRVmNzUlVGQlJUdEpRVU5vUWl4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExHVkJRV1VzUTBGQlF5eERRVUZETzBsQlF6ZENMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zVlVGQlF5eEhRVUZITEVWQlFVVXNSMEZCUnl4RlFVRkZMRWxCUVVrN1VVRkRia0lzUjBGQlJ5eERRVUZETEZOQlFWTXNSMEZCUnl4alFVRmpMRTlCUVU4c1JVRkJSU3hEUVVGQkxFTkJRVU1zUTBGQlF5eERRVUZCTzFGQlEzcERMRTlCUVU4c1NVRkJTU3hGUVVGRkxFTkJRVU03U1VGRGJFSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1EwRkRUanRMUVVGTk8wbEJRMGdzUjBGQlJ5eERRVUZETEVkQlFVY3NRMEZCUXl4alFVRmpMRU5CUVVNc1EwRkJRenREUVVNelFqdEJRVVZFTEVsQlFVa3NSVUZCUlN4SFFVRjNRaXhSUVVGUkxFTkJRVU1zVlVGQlZTeERRVUZETzBGQlEyeEVMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zVlVGQlF5eEhRVUZaTEVWQlFVVXNSMEZCWVN4RlFVRkZMRWxCUVdNN1NVRkRhRVFzUjBGQlJ5eERRVUZETEVWQlFVVXNSMEZCUnl4RlFVRkZMRU5CUVVNN1NVRkRXaXhQUVVGUExFbEJRVWtzUlVGQlJTeERRVUZETzBGQlEyeENMRU5CUVVNc1EwRkJReXhEUVVGQk8wRkJRMFlzUjBGQlJ5eERRVUZETEVkQlFVY3NRMEZCUXl4VlFVRlZMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zUTBGQlF6dEJRVU16UWl4SFFVRkhMRU5CUVVNc1IwRkJSeXhEUVVGRExGVkJRVlVzUTBGQlF5eFZRVUZWTEVOQlFVTXNSVUZCUlN4UlFVRlJMRVZCUVVVc1NVRkJTU3hGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETzBGQlNXNUVMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zVFVGQlRTeEZRVUZGTEVOQlFVTXNRMEZCUXp0QlFVVnNRaXhIUVVGSExFTkJRVU1zUjBGQlJ5eERRVUZETEU5QlFVOHNRMEZCUXl4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eFRRVUZUTEVWQlFVVXNiMEpCUVc5Q0xFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdRVUZGZGtVc1IwRkJSeXhEUVVGRExFZEJRVWNzUTBGQlF5eE5RVUZOTEVWQlFVVXNWVUZCVlN4SFFVRlpMRVZCUVVVc1IwRkJZU3hGUVVGRkxFbEJRV003U1VGRmFrVXNUMEZCVHl4SlFVRkpMRVZCUVVVc1EwRkJRenRCUVVOc1FpeERRVUZETEVOQlFVTXNRMEZCUXp0QlFVTklMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zVlVGQlF5eEhRVUZaTEVWQlFVVXNSMEZCWVN4RlFVRkZMRWxCUVdNN1NVRkRhRVFzUjBGQlJ5eERRVUZETEZsQlFWa3NSMEZCUnl4VlFVRkRMRXRCUVdFc1JVRkRZaXhSUVVGblFpeEZRVU5vUWl4SlFVRXdSRHRSUVVNeFJTeHBRa0ZCU1N4RFFVRkRMRmRCUVZjc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUXl4SlFVRlhPMWxCUTNKRExFbEJRVWtzU1VGQlNTeExRVUZMTEVsQlFVazdaMEpCUVVVc1QwRkJUeXhKUVVGSkxFTkJRVU1zUzBGQlN5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMWxCUXpWRExFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNWMEZCVnl4RFFVRkRMRkZCUVZFc1JVRkJSU3hKUVVGSkxFTkJRVU1zVVVGQlVTeERRVUZETzJkQ1FVRkZMRTlCUVU4c1NVRkJTU3hEUVVGRExFdEJRVXNzUlVGQlJTeEpRVUZKTEV0QlFVc3NRMEZCUXl4clFrRkJhMElzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEY0Vjc1NVRkJTU3hYUVVGWExFZEJRVkU3WjBKQlEyNUNMRXRCUVVzc1JVRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN6dG5Ra0ZEYWtJc1NVRkJTU3hGUVVGRkxFbEJRVWtzUTBGQlF5eEpRVUZKTzJkQ1FVTm1MRWxCUVVrc1JVRkJSU3hKUVVGSkxFTkJRVU1zU1VGQlNUdGhRVU5zUWl4RFFVRkJPMWxCUTBRc1QwRkJUeXhKUVVGSkxFTkJRVU1zVjBGQlZ5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUTI1RExFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVc3NRMEZCUVN4RFFVRkRMRlZCUVVNc1IwRkJWVHRaUVVOb1FpeEpRVUZKTEVOQlFVTXNTMEZCU3l4RlFVRkZMRWRCUVVjc1EwRkJReXhEUVVGRE8xRkJRM0pDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTFBc1EwRkJReXhEUVVGQk8wbEJRMFFzUjBGQlJ5eERRVUZETEUxQlFVMHNSMEZCUnp0UlFVTlVMRWRCUVVjc1EwRkJReXhQUVVGUExFTkJRVU1zUzBGQlN5eEhRVUZITEVsQlFVa3NRMEZCUXp0SlFVTTNRaXhEUVVGRExFTkJRVUU3U1VGRFJDeEhRVUZITEVOQlFVTXNZVUZCWVN4SFFVRkhMRlZCUVVNc1NVRkJWenRSUVVNMVFpeEpRVUZKTEV0QlFVc3NSMEZCVnl4dFFrRkJTU3hEUVVGRE8xbEJRM0pDTEVsQlFVa3NSVUZCUlN4SlFVRkpMRU5CUVVNc1NVRkJTVHRaUVVObUxFbEJRVWtzUlVGQlJTeEpRVUZKTEVOQlFVTXNTVUZCU1R0WlFVTm1MRXRCUVVzc1JVRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN6dFRRVU53UWl4RlFVRkZMRWRCUVVjc1EwRkJReXhOUVVGTkxFVkJRVVU3V1VGRFdDeFRRVUZUTEVWQlFVVXNTMEZCU3p0VFFVTnVRaXhEUVVGRExFTkJRVU03VVVGRFNDeEhRVUZITEVOQlFVTXNVMEZCVXl4RFFVRkRMR2RDUVVGblFpeEZRVUZGTEV0QlFVc3NRMEZCUXl4RFFVRkRPMUZCUTNaRExFZEJRVWNzUTBGQlF5eFBRVUZQTEVOQlFVTXNTMEZCU3l4SFFVRkhMRXRCUVVzc1EwRkJRenRKUVVNNVFpeERRVUZETEVOQlFVRTdTVUZEUkN4SlFVRkpMRVZCUVVVc1EwRkJRenRCUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZETzBGQlJVZ3NiVUpCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dEJRVU5hTEUxQlFVMHNSMEZCUnl4SlFVRkpMRU5CUVVNc1dVRkJXU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzBGQlEyaERMRTFCUVUwc1EwRkJReXhGUVVGRkxFTkJRVU1zVDBGQlR5eEZRVUZGTEZWQlFVTXNSMEZCVlR0SlFVTXhRaXhQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMGxCUTI1Q0xFMUJRVTBzUTBGQlF5eExRVUZMTEVWQlFVVXNRMEZCUXp0QlFVTnVRaXhEUVVGRExFTkJRVU1zUTBGQlFUdEJRVVZHTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1owSkJRV2RDTEVWQlFVVTdTVUZEZGtJc2RVSkJRVUVzV1VGQldTeEhRVUZITEd0Q1FVRlRMRU5CUVVNc1RVRkJUU3hGUVVGRkxFVkJRVVVzUlVGQlJTeHBRa0ZCYVVJc1EwRkJReXhEUVVGRE8wbEJRM2hFTEZGQlFWRXNRMEZCUXl4VlFVRlZMRU5CUVVNc1JVRkJSU3hEUVVGRExGZEJRVmNzUlVGQlJUdFJRVU5vUXl4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExHMURRVUZ0UXl4RFFVRkRMRU5CUVVNN1VVRkRha1FzVFVGQlRTeERRVUZETEUxQlFVMHNRMEZCUXl4SlFVRkpMRVZCUVVVN1dVRkRhRUlzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4MVFrRkJjVUlzU1VGQlNTeE5RVUZITEVOQlFVTXNRMEZCUXp0WlFVTXhReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEdkQ1FVRm5RaXhEUVVGRExFTkJRVU03VVVGREwwSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dERRVU5PTzBGQlJVUXNjVUpCUVdVc1RVRkJUU3hEUVVGRE8wRkJRMVFzVVVGQlFTeEpRVUZKTEVkQlFVY3NVVUZCVVN4RFFVRkRMRlZCUVZVc1EwRkJReUo5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIHNvY2tldGlvID0gcmVxdWlyZShcInNvY2tldC5pb1wiKTtcbnZhciBNZXNzYWdlXzEgPSByZXF1aXJlKFwiLi4vbW9kZWxzL01lc3NhZ2VcIik7XG52YXIgYXV0aG9yaXplZF8xID0gcmVxdWlyZShcIi4uL21pZGRsZXdhcmUvYXV0aG9yaXplZFwiKTtcbnZhciBlbnYgPSByZXF1aXJlKCcuLi8uLi8uLi9lbnYnKTtcbnZhciBpbml0ID0gZnVuY3Rpb24gKHNlcnZlciwgZGIsIHNlc3Npb25NaWRkbGV3YXJlKSB7XG4gICAgdmFyIGlvID0gc29ja2V0aW8oc2VydmVyKTtcbiAgICB2YXIgY29ubmVjdGVkVXNlckVtYWlscyA9IFtdO1xuICAgIGlvLnVzZShmdW5jdGlvbiAoc29ja2V0LCBuZXh0KSB7XG4gICAgICAgIHNlc3Npb25NaWRkbGV3YXJlKHNvY2tldC5yZXF1ZXN0LCB7fSwgbmV4dCk7XG4gICAgfSk7XG4gICAgaW8udXNlKGZ1bmN0aW9uIChzb2NrZXQsIG5leHQpIHtcbiAgICAgICAgYXV0aG9yaXplZF8xW1wiZGVmYXVsdFwiXShzb2NrZXQucmVxdWVzdCwge30sIG5leHQpO1xuICAgIH0pO1xuICAgIGlvLm9uKCdjb25uZWN0aW9uJywgZnVuY3Rpb24gKHNvY2tldCkge1xuICAgICAgICBjb25uZWN0ZWRVc2VyRW1haWxzLnB1c2goc29ja2V0LnJlcXVlc3QudXNlci5lbWFpbCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDb25uZWN0ZWQgdXNlcnMnLCBjb25uZWN0ZWRVc2VyRW1haWxzKTtcbiAgICAgICAgaW8uZW1pdCgnY29ubmVjdGVkIHVzZXJzJywgY29ubmVjdGVkVXNlckVtYWlscyk7XG4gICAgICAgIHNvY2tldC5vbignZGlzY29ubmVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbm5lY3RlZFVzZXJFbWFpbHMuc3BsaWNlKGNvbm5lY3RlZFVzZXJFbWFpbHMuaW5kZXhPZihzb2NrZXQucmVxdWVzdC51c2VyLmVtYWlsKSwgMSk7XG4gICAgICAgICAgICBpby5lbWl0KCdjb25uZWN0ZWQgdXNlcnMnLCBjb25uZWN0ZWRVc2VyRW1haWxzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNvY2tldC5vbignbWVzc2FnZScsIGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgICAgIHZhciBtID0gbmV3IE1lc3NhZ2VfMVtcImRlZmF1bHRcIl0oe1xuICAgICAgICAgICAgICAgIGNoYW5uZWw6IG1lc3NhZ2UuY2hhbm5lbCxcbiAgICAgICAgICAgICAgICB0ZXh0OiBtZXNzYWdlLnRleHQsXG4gICAgICAgICAgICAgICAgdXNlckVtYWlsOiBzb2NrZXQucmVxdWVzdC51c2VyLmVtYWlsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG0uc2F2ZSgpLnRoZW4oZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgICAgICAgICBpby5lbWl0KCdtZXNzYWdlJywge1xuICAgICAgICAgICAgICAgICAgICBfaWQ6IG0uX2lkLFxuICAgICAgICAgICAgICAgICAgICB1c2VyRW1haWw6IG0udXNlckVtYWlsLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBtLnRleHQsXG4gICAgICAgICAgICAgICAgICAgIGNoYW5uZWw6IG0uY2hhbm5lbCxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZDogbS5jcmVhdGVkQXRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzb2NrZXQuZW1pdCgnbWVzc2FnZSByZWNlaXZlZCcpO1xuICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KCdtZXNzYWdlIHJlY2VpdmUgZXJyb3InLCBlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBpbztcbn07XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGluaXQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhVzVrWlhndWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOHVMaTh1TGk5emNtTXZjMlZ5ZG1WeUwzTnZZMnRsZEM1cGJ5OXBibVJsZUM1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96dEJRVUZCTEc5RFFVRnpRenRCUVVkMFF5dzJRMEZCYzBRN1FVRkZkRVFzZFVSQlFUUkVPMEZCUlRWRUxFbEJRVTBzUjBGQlJ5eEhRVUZITEU5QlFVOHNRMEZCUXl4alFVRmpMRU5CUVVNc1EwRkJRenRCUVUxd1F5eEpRVUZOTEVsQlFVa3NSMEZCUnl4VlFVRkRMRTFCUVdNc1JVRkJSU3hGUVVGakxFVkJRVVVzYVVKQlFYTkNPMGxCUTJoRkxFbEJRVTBzUlVGQlJTeEhRVUZ2UWl4UlFVRlJMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU03U1VGRE4wTXNTVUZCU1N4dFFrRkJiVUlzUjBGQllTeEZRVUZGTEVOQlFVTTdTVUZGZGtNc1JVRkJSU3hEUVVGRExFZEJRVWNzUTBGQlF5eFZRVUZETEUxQlFVMHNSVUZCUlN4SlFVRkpPMUZCUTJoQ0xHbENRVUZwUWl4RFFVRkRMRTFCUVUwc1EwRkJReXhQUVVGUExFVkJRVVVzUlVGQlJTeEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMGxCUTJoRUxFTkJRVU1zUTBGQlF5eERRVUZETzBsQlEwZ3NSVUZCUlN4RFFVRkRMRWRCUVVjc1EwRkJReXhWUVVGRExFMUJRVTBzUlVGQlJTeEpRVUZKTzFGQlJXaENMSFZDUVVGdlFpeERRVUZETEUxQlFVMHNRMEZCUXl4UFFVRlBMRVZCUVVVc1JVRkJSU3hGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzBsQlEyNUVMRU5CUVVNc1EwRkJReXhEUVVGQk8wbEJSMFlzUlVGQlJTeERRVUZETEVWQlFVVXNRMEZCUXl4WlFVRlpMRVZCUVVVc1ZVRkJReXhOUVVGak8xRkJReTlDTEcxQ1FVRnRRaXhEUVVGRExFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dFJRVU53UkN4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExHbENRVUZwUWl4RlFVRkZMRzFDUVVGdFFpeERRVUZETEVOQlFVTTdVVUZEY0VRc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eHBRa0ZCYVVJc1JVRkJSU3h0UWtGQmJVSXNRMEZCUXl4RFFVRkRPMUZCUldoRUxFMUJRVTBzUTBGQlF5eEZRVUZGTEVOQlFVTXNXVUZCV1N4RlFVRkZPMWxCUTNCQ0xHMUNRVUZ0UWl4RFFVRkRMRTFCUVUwc1EwRkJReXh0UWtGQmJVSXNRMEZCUXl4UFFVRlBMRU5CUVVNc1RVRkJUU3hEUVVGRExFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRGRFWXNSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhwUWtGQmFVSXNSVUZCUlN4dFFrRkJiVUlzUTBGQlF5eERRVUZETzFGQlEzQkVMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJSVWdzVFVGQlRTeERRVUZETEVWQlFVVXNRMEZCUXl4VFFVRlRMRVZCUVVVc1ZVRkJReXhQUVVFd1F6dFpRVU0xUkN4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzFsQlEzSkNMRWxCUVVrc1EwRkJReXhIUVVGaExFbEJRVWtzYjBKQlFVOHNRMEZCUXp0blFrRkRNVUlzVDBGQlR5eEZRVUZGTEU5QlFVOHNRMEZCUXl4UFFVRlBPMmRDUVVONFFpeEpRVUZKTEVWQlFVVXNUMEZCVHl4RFFVRkRMRWxCUVVrN1owSkJRMnhDTEZOQlFWTXNSVUZCUlN4TlFVRk5MRU5CUVVNc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTzJGQlEzWkRMRU5CUVVNc1EwRkJRenRaUVVOSUxFTkJRVU1zUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJReXhEUVVGWE8yZENRVU4wUWl4RlFVRkZMRU5CUVVNc1NVRkJTU3hEUVVGRExGTkJRVk1zUlVGQlJUdHZRa0ZEWml4SFFVRkhMRVZCUVVVc1EwRkJReXhEUVVGRExFZEJRVWM3YjBKQlExWXNVMEZCVXl4RlFVRkZMRU5CUVVNc1EwRkJReXhUUVVGVE8yOUNRVU4wUWl4SlFVRkpMRVZCUVVVc1EwRkJReXhEUVVGRExFbEJRVWs3YjBKQlExb3NUMEZCVHl4RlFVRkZMRU5CUVVNc1EwRkJReXhQUVVGUE8yOUNRVU5zUWl4UFFVRlBMRVZCUVVVc1EwRkJReXhEUVVGRExGTkJRVk03YVVKQlEzWkNMRU5CUVVNc1EwRkJRenRuUWtGRFNDeE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMR3RDUVVGclFpeERRVUZETEVOQlFVTTdXVUZEY0VNc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlN5eERRVUZCTEVOQlFVTXNWVUZCUXl4SFFVRlZPMmRDUVVOb1FpeFBRVUZQTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8yZENRVU51UWl4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExIVkNRVUYxUWl4RlFVRkZMRWRCUVVjc1EwRkJReXhEUVVGRE8xbEJRemxETEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTFBc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFVDeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTklMRTlCUVU4c1JVRkJSU3hEUVVGRE8wRkJRMlFzUTBGQlF5eERRVUZCTzBGQlJVUXNjVUpCUVdVc1NVRkJTU3hEUVVGREluMD0iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG52YXIgX3RoaXMgPSB0aGlzO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBheGlvc18xID0gcmVxdWlyZShcImF4aW9zXCIpO1xudmFyIG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEgPSByZXF1aXJlKFwiLi9ub3RpZmljYXRpb25zQWN0aW9uc1wiKTtcbmV4cG9ydHMuQUREX0NIQU5ORUxTID0gJ0FERF9DSEFOTkVMUyc7XG5leHBvcnRzLlNFVF9DSEFOTkVMX0ZFVENISU5HX05FV19NRVNTQUdFUyA9ICdTRVRfQ0hBTk5FTF9GRVRDSElOR19ORVdfTUVTU0FHRVMnO1xuZXhwb3J0cy5TRVRfQ0hBTk5FTF9IQVNfTU9SRV9NRVNTQUdFUyA9ICdTRVRfQ0hBTk5FTF9IQVNfTU9SRV9NRVNTQUdFJztcbmV4cG9ydHMuQUREX1JFQ0VJVkVEX0NIQU5ORUxfTUVTU0FHRSA9ICdBRERfUkVDRUlWRURfQ0hBTk5FTF9NRVNTQUdFJztcbmV4cG9ydHMuQUREX1JFVFJJRVZFRF9DSEFOTkVMX01FU1NBR0VTID0gJ0FERF9SRVRSSUVWRURfQ0hBTk5FTF9NRVNTQUdFUyc7XG5leHBvcnRzLklOQ1JFTUVOVF9DSEFOTkVMX1JFVFJJRVZFX01FU1NBR0VTX09GRlNFVCA9ICdJTkNSRU1FTlRfQ0hBTk5FTF9SRVRSSUVWRV9NRVNTQUdFU19PRkZTRVQnO1xuZXhwb3J0cy5SRVRSSUVWRV9DSEFOTkVMX01FU1NBR0VTID0gJ1JFVFJJRVZFX0NIQU5ORUxfTUVTU0FHRVMnO1xuZXhwb3J0cy5DTEVBUl9DSEFOTkVMU19EQVRBID0gJ0NMRUFSX0NIQU5ORUxTX0RBVEEnO1xuZXhwb3J0cy5hZGRDaGFubmVscyA9IGZ1bmN0aW9uIChjaGFubmVsTmFtZXMpIHtcbiAgICB2YXIgY2hhbm5lbHMgPSBbXTtcbiAgICBjaGFubmVsTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBjaGFubmVscy5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICBtZXNzYWdlczogW10sXG4gICAgICAgICAgICByZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0OiAwLFxuICAgICAgICAgICAgaGFzTW9yZU1lc3NhZ2VzOiB0cnVlLFxuICAgICAgICAgICAgZmV0Y2hpbmdOZXdNZXNzYWdlczogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXhwb3J0cy5BRERfQ0hBTk5FTFMsXG4gICAgICAgIGRhdGE6IHsgY2hhbm5lbHM6IGNoYW5uZWxzIH1cbiAgICB9O1xufTtcbmV4cG9ydHMuaW5jcmVtZW50Q2hhbm5lbFJldHJpZXZlTWVzc2FnZXNPZmZzZXQgPSBmdW5jdGlvbiAoY2hhbm5lbCwgbikge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV4cG9ydHMuSU5DUkVNRU5UX0NIQU5ORUxfUkVUUklFVkVfTUVTU0FHRVNfT0ZGU0VULFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBjaGFubmVsOiBjaGFubmVsLFxuICAgICAgICAgICAgaW5jcmVtZW50OiBuXG4gICAgICAgIH1cbiAgICB9O1xufTtcbmV4cG9ydHMuc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMgPSBmdW5jdGlvbiAoY2hhbm5lbCwgaXNGZXRjaGluZykge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV4cG9ydHMuU0VUX0NIQU5ORUxfRkVUQ0hJTkdfTkVXX01FU1NBR0VTLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBjaGFubmVsTmFtZTogY2hhbm5lbCxcbiAgICAgICAgICAgIGlzRmV0Y2hpbmc6IGlzRmV0Y2hpbmdcbiAgICAgICAgfVxuICAgIH07XG59O1xuZXhwb3J0cy5zZXRDaGFubmVsSGFzTW9yZU1lc3NhZ2VzID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lLCBoYXNNb3JlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXhwb3J0cy5TRVRfQ0hBTk5FTF9IQVNfTU9SRV9NRVNTQUdFUyxcbiAgICAgICAgZGF0YTogeyBjaGFubmVsTmFtZTogY2hhbm5lbE5hbWUsIGhhc01vcmU6IGhhc01vcmUgfVxuICAgIH07XG59O1xuZXhwb3J0cy5hZGRSZWNlaXZlZENoYW5uZWxNZXNzYWdlID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lLCBtZXNzYWdlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXhwb3J0cy5BRERfUkVDRUlWRURfQ0hBTk5FTF9NRVNTQUdFLFxuICAgICAgICBkYXRhOiB7IG1lc3NhZ2U6IG1lc3NhZ2UsIGNoYW5uZWxOYW1lOiBjaGFubmVsTmFtZSB9XG4gICAgfTtcbn07XG5leHBvcnRzLmFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcyA9IGZ1bmN0aW9uIChjaGFubmVsTmFtZSwgbWVzc2FnZXMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBleHBvcnRzLkFERF9SRVRSSUVWRURfQ0hBTk5FTF9NRVNTQUdFUyxcbiAgICAgICAgZGF0YTogeyBjaGFubmVsTmFtZTogY2hhbm5lbE5hbWUsIG1lc3NhZ2VzOiBtZXNzYWdlcyB9XG4gICAgfTtcbn07XG5leHBvcnRzLmNsZWFyQ2hhbm5lbHNEYXRhID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV4cG9ydHMuQ0xFQVJfQ0hBTk5FTFNfREFUQVxuICAgIH07XG59O1xuZXhwb3J0cy5mZXRjaENoYW5uZWxzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZGlzcGF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIGF4aW9zXzFbXCJkZWZhdWx0XCJdLmdldCgnL2FwaS92MS9jaGFubmVscycpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgdmFyIGNoYW5uZWxzID0gcmVzLmRhdGEuY2hhbm5lbHMubWFwKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGMubmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGRpc3BhdGNoKGV4cG9ydHMuYWRkQ2hhbm5lbHMoY2hhbm5lbHMpKTtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIGZldGNoIHRoZSBjaGFubmVscycpKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG5leHBvcnRzLnJldHJpZXZlQ2hhbm5lbE1lc3NhZ2VzID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkaXNwYXRjaCwgZ2V0U3RhdGUpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNoYW5uZWw7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIGNoYW5uZWwgPSBnZXRTdGF0ZSgpLmNoYW5uZWxzLmZpbmQoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYy5uYW1lID09PSBjaGFubmVsTmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFjaGFubmVsIHx8IGNoYW5uZWwuZmV0Y2hpbmdOZXdNZXNzYWdlcyB8fCAhY2hhbm5lbC5oYXNNb3JlTWVzc2FnZXMpIHtcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gZmV0Y2ggbWVzc2FnZXMnKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyLCBQcm9taXNlLnJlc29sdmUoJ1JldHJpZXZlIENoYW5uZWwgTWVzc2FnZXMgZGlzcGF0Y2hlZCB3aXRoIGluY29ycmVjdCBjaGFubmVsIG5hbWUgb3Igd2hpbGUgYWxyZWFkeSBmZXRjaGluZyBtZXNzYWdlcycpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRpc3BhdGNoKGV4cG9ydHMuc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMoY2hhbm5lbC5uYW1lLCB0cnVlKSk7XG4gICAgICAgICAgICByZXR1cm4gWzIsIGF4aW9zXzFbXCJkZWZhdWx0XCJdLmdldCgnL2FwaS92MS9tZXNzYWdlcy8nICsgY2hhbm5lbC5uYW1lICsgJy8nICsgY2hhbm5lbC5yZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0KS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLm1lc3NhZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goZXhwb3J0cy5zZXRDaGFubmVsSGFzTW9yZU1lc3NhZ2VzKGNoYW5uZWwubmFtZSwgZmFsc2UpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goZXhwb3J0cy5pbmNyZW1lbnRDaGFubmVsUmV0cmlldmVNZXNzYWdlc09mZnNldChjaGFubmVsTmFtZSwgcmVzLmRhdGEubWVzc2FnZXMubGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKGV4cG9ydHMuYWRkUmV0cmlldmVkQ2hhbm5lbE1lc3NhZ2VzKGNoYW5uZWwubmFtZSwgcmVzLmRhdGEubWVzc2FnZXMpKTtcbiAgICAgICAgICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIGZldGNoIG1lc3NhZ2VzJykpO1xuICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2goZXhwb3J0cy5zZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcyhjaGFubmVsLm5hbWUsIGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgfSldO1xuICAgICAgICB9KTtcbiAgICB9KTsgfTtcbn07XG5leHBvcnRzLmRlbGV0ZUNoYW5uZWwgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRpc3BhdGNoKSB7XG4gICAgICAgIHJldHVybiBheGlvc18xW1wiZGVmYXVsdFwiXS5nZXQoJy9hcGkvdjEvY2hhbm5lbC9kZWxldGUvJyArIGNoYW5uZWxOYW1lKS5cbiAgICAgICAgICAgIHRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRJbmZvKCdDaGFubmVsIGRlbGV0ZWQnKSk7XG4gICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2goZXhwb3J0cy5mZXRjaENoYW5uZWxzKCkpO1xuICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKGVyci5yZXNwb25zZS5kYXRhLmVycm9yKSk7XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuZXhwb3J0cy5hZGRDaGFubmVsID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkaXNwYXRjaCkge1xuICAgICAgICByZXR1cm4gYXhpb3NfMVtcImRlZmF1bHRcIl0ucG9zdCgnL2FwaS92MS9jaGFubmVsL2NyZWF0ZScsIHtcbiAgICAgICAgICAgIGNoYW5uZWxOYW1lOiBjaGFubmVsTmFtZVxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkSW5mbygnQ2hhbm5lbCBjcmVhdGVkJykpO1xuICAgICAgICAgICAgcmV0dXJuIGRpc3BhdGNoKGV4cG9ydHMuZmV0Y2hDaGFubmVscygpKTtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcihlcnIucmVzcG9uc2UuZGF0YS5lcnJvcikpO1xuICAgICAgICB9KTtcbiAgICB9O1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVkyaGhibTVsYkhOQlkzUnBiMjV6TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dkxpNHZMaTR2YzNKakwzZGxZaTloWTNScGIyNXpMMk5vWVc1dVpXeHpRV04wYVc5dWN5NTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdRVUZCUVN4cFFrRTRTVUU3TzBGQk4wbEJMQ3RDUVVGNVJEdEJRVVY2UkN3clJFRkJlVVE3UVVGRk5VTXNVVUZCUVN4WlFVRlpMRWRCUVVjc1kwRkJZeXhEUVVGRE8wRkJRemxDTEZGQlFVRXNhVU5CUVdsRExFZEJRVWNzYlVOQlFXMURMRU5CUVVNN1FVRkRlRVVzVVVGQlFTdzJRa0ZCTmtJc1IwRkJSeXc0UWtGQk9FSXNRMEZCUXp0QlFVTXZSQ3hSUVVGQkxEUkNRVUUwUWl4SFFVRkhMRGhDUVVFNFFpeERRVUZETzBGQlF6bEVMRkZCUVVFc09FSkJRVGhDTEVkQlFVY3NaME5CUVdkRExFTkJRVU03UVVGRGJFVXNVVUZCUVN3d1EwRkJNRU1zUjBGQlJ5dzBRMEZCTkVNc1EwRkJRenRCUVVNeFJpeFJRVUZCTEhsQ1FVRjVRaXhIUVVGSExESkNRVUV5UWl4RFFVRkRPMEZCUTNoRUxGRkJRVUVzYlVKQlFXMUNMRWRCUVVjc2NVSkJRWEZDTEVOQlFVTTdRVUZGTlVNc1VVRkJRU3hYUVVGWExFZEJRVWNzVlVGQlF5eFpRVUZ6UWp0SlFVTTVReXhKUVVGSkxGRkJRVkVzUjBGQlZTeEZRVUZGTEVOQlFVTTdTVUZEZWtJc1dVRkJXU3hEUVVGRExFOUJRVThzUTBGQlF5eFZRVUZETEVsQlFWazdVVUZET1VJc1VVRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF6dFpRVU5XTEVsQlFVa3NSVUZCUlN4SlFVRkpPMWxCUTFZc1VVRkJVU3hGUVVGRkxFVkJRVVU3V1VGRFdpeHpRa0ZCYzBJc1JVRkJSU3hEUVVGRE8xbEJRM3BDTEdWQlFXVXNSVUZCUlN4SlFVRkpPMWxCUTNKQ0xHMUNRVUZ0UWl4RlFVRkZMRXRCUVVzN1UwRkROMElzUTBGQlF5eERRVUZETzBsQlExQXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRTQ3hQUVVGUE8xRkJRMGdzU1VGQlNTeEZRVUZGTEc5Q1FVRlpPMUZCUTJ4Q0xFbEJRVWtzUlVGQlJTeEZRVUZGTEZGQlFWRXNSVUZCUlN4UlFVRlJMRVZCUVVVN1MwRkRMMElzUTBGQlF6dEJRVU5PTEVOQlFVTXNRMEZCUVR0QlFVVlpMRkZCUVVFc2MwTkJRWE5ETEVkQlFVY3NWVUZCUXl4UFFVRmxMRVZCUVVVc1EwRkJVenRKUVVNM1JTeFBRVUZQTzFGQlEwZ3NTVUZCU1N4RlFVRkZMR3RFUVVFd1F6dFJRVU5vUkN4SlFVRkpMRVZCUVVVN1dVRkRSaXhQUVVGUExFVkJRVVVzVDBGQlR6dFpRVU5vUWl4VFFVRlRMRVZCUVVVc1EwRkJRenRUUVVObU8wdEJRMG9zUTBGQlF6dEJRVU5PTEVOQlFVTXNRMEZCUVR0QlFVVlpMRkZCUVVFc05rSkJRVFpDTEVkQlFVY3NWVUZCUXl4UFFVRmxMRVZCUVVVc1ZVRkJiVUk3U1VGRE9VVXNUMEZCVHp0UlFVTklMRWxCUVVrc1JVRkJSU3g1UTBGQmFVTTdVVUZEZGtNc1NVRkJTU3hGUVVGRk8xbEJRMFlzVjBGQlZ5eEZRVUZGTEU5QlFVODdXVUZEY0VJc1ZVRkJWU3hGUVVGRkxGVkJRVlU3VTBGRGVrSTdTMEZEU2l4RFFVRkRPMEZCUTA0c1EwRkJReXhEUVVGQk8wRkJSVmtzVVVGQlFTeDVRa0ZCZVVJc1IwRkJSeXhWUVVGRExGZEJRVzFDTEVWQlFVVXNUMEZCWjBJN1NVRkRNMFVzVDBGQlR6dFJRVU5JTEVsQlFVa3NSVUZCUlN4eFEwRkJOa0k3VVVGRGJrTXNTVUZCU1N4RlFVRkZMRVZCUVVVc1YwRkJWeXhGUVVGRkxGZEJRVmNzUlVGQlJTeFBRVUZQTEVWQlFVVXNUMEZCVHl4RlFVRkZPMHRCUTNaRUxFTkJRVU03UVVGRFRpeERRVUZETEVOQlFVRTdRVUZGV1N4UlFVRkJMSGxDUVVGNVFpeEhRVUZITEZWQlFVTXNWMEZCYlVJc1JVRkJSU3hQUVVGblFqdEpRVU16UlN4UFFVRlBPMUZCUTBnc1NVRkJTU3hGUVVGRkxHOURRVUUwUWp0UlFVTnNReXhKUVVGSkxFVkJRVVVzUlVGQlJTeFBRVUZQTEVWQlFVVXNUMEZCVHl4RlFVRkZMRmRCUVZjc1JVRkJSU3hYUVVGWExFVkJRVVU3UzBGRGRrUXNRMEZCUXp0QlFVTk9MRU5CUVVNc1EwRkJRVHRCUVVWWkxGRkJRVUVzTWtKQlFUSkNMRWRCUVVjc1ZVRkJReXhYUVVGdFFpeEZRVUZGTEZGQlFXMUNPMGxCUTJoR0xFOUJRVTg3VVVGRFNDeEpRVUZKTEVWQlFVVXNjME5CUVRoQ08xRkJRM0JETEVsQlFVa3NSVUZCUlN4RlFVRkRMRmRCUVZjc1JVRkJSU3hYUVVGWExFVkJRVVVzVVVGQlVTeEZRVUZGTEZGQlFWRXNSVUZCUXp0TFFVTjJSQ3hEUVVGRE8wRkJRMDRzUTBGQlF5eERRVUZCTzBGQlJWa3NVVUZCUVN4cFFrRkJhVUlzUjBGQlJ6dEpRVU0zUWl4UFFVRlBPMUZCUTBnc1NVRkJTU3hGUVVGRkxESkNRVUZ0UWp0TFFVTTFRaXhEUVVGQk8wRkJRMHdzUTBGQlF5eERRVUZCTzBGQlNWa3NVVUZCUVN4aFFVRmhMRWRCUVVjN1NVRkRla0lzVDBGQlR5eFZRVUZETEZGQlFXRTdVVUZEYWtJc1QwRkJUeXhyUWtGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4clFrRkJhMElzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRkRMRWRCUVd0Q08xbEJRM3BFTEVsQlFVa3NVVUZCVVN4SFFVRkhMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zVVVGQlVTeERRVUZETEVkQlFVY3NRMEZCUlN4VlFVRkRMRU5CUVRoQ08yZENRVU5xUlN4UFFVRlBMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU03V1VGRGJFSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRTQ3hQUVVGUExGRkJRVkVzUTBGQlF5eHRRa0ZCVnl4RFFVRkRMRkZCUVZFc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRE0wTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1QwRkJTeXhEUVVGQkxFTkJRVU1zVlVGQlF5eEhRVUZsTzFsQlEzSkNMRTlCUVU4c1VVRkJVU3hEUVVGRExDdENRVUZSTEVOQlFVTXNlVVJCUVhsRUxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEzcEdMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMUFzUTBGQlF5eERRVUZCTzBGQlEwd3NRMEZCUXl4RFFVRkJPMEZCUlZrc1VVRkJRU3gxUWtGQmRVSXNSMEZCUnl4VlFVRkRMRmRCUVcxQ08wbEJRM1pFTEU5QlFVOHNWVUZCVHl4UlFVRmhMRVZCUVVVc1VVRkJZVHM3TzFsQlEyeERMRTlCUVU4c1IwRkJXU3hSUVVGUkxFVkJRVVVzUTBGQlF5eFJRVUZSTEVOQlFVTXNTVUZCU1N4RFFVRkZMRlZCUVVNc1EwRkJWVHRuUWtGRGVFUXNUMEZCVHl4RFFVRkRMRU5CUVVNc1NVRkJTU3hMUVVGTExGZEJRVmNzUTBGQlF6dFpRVU5zUXl4RFFVRkRMRU5CUVVNc1EwRkJRVHRaUVVOR0xFbEJRVWtzUTBGQlF5eFBRVUZQTEVsQlFVa3NUMEZCVHl4RFFVRkRMRzFDUVVGdFFpeEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMR1ZCUVdVc1JVRkJSVHRuUWtGRGNrVXNVVUZCVVN4RFFVRkRMQ3RDUVVGUkxFTkJRVU1zY1VSQlFYRkVMRU5CUVVNc1EwRkJReXhEUVVGRE8yZENRVU14UlN4WFFVRlBMRTlCUVU4c1EwRkJReXhQUVVGUExFTkJRVU1zY1VkQlFYRkhMRU5CUVVNc1JVRkJRenRoUVVOcVNUdFpRVU5FTEZGQlFWRXNRMEZCUXl4eFEwRkJOa0lzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRE5VUXNWMEZCVHl4clFrRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eHRRa0ZCYlVJc1IwRkJSeXhQUVVGUExFTkJRVU1zU1VGQlNTeEhRVUZITEVkQlFVY3NSMEZCUnl4UFFVRlBMRU5CUVVNc2MwSkJRWE5DTEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJReXhIUVVGclFqdHZRa0ZEYUVnc1NVRkJTU3hIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEZGQlFWRXNRMEZCUXl4TlFVRk5MRXRCUVVzc1EwRkJReXhGUVVGRk8zZENRVU5vUXl4UlFVRlJMRU5CUVVNc2FVTkJRWGxDTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWxCUVVrc1JVRkJSU3hMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETzNkQ1FVTjZSQ3hQUVVGUExFZEJRVWNzUTBGQlF6dHhRa0ZEWkR0dlFrRkRSQ3hSUVVGUkxFTkJRVU1zT0VOQlFYTkRMRU5CUVVNc1YwRkJWeXhGUVVGRkxFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRMRTFCUVUwc1EwRkJReXhEUVVGRExFTkJRVU03YjBKQlEzaEdMRkZCUVZFc1EwRkJReXh0UTBGQk1rSXNRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hGUVVGRkxFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNc1EwRkJRVHRuUWtGRE1VVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1QwRkJTeXhEUVVGQkxFTkJRVU1zVlVGQlF5eEhRVUZsTzI5Q1FVTnlRaXhSUVVGUkxFTkJRVU1zSzBKQlFWRXNRMEZCUXl4eFJFRkJjVVFzUTBGQlF5eERRVUZETEVOQlFVTTdaMEpCUXpsRkxFTkJRVU1zUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXp0dlFrRkRTaXhQUVVGUExGRkJRVkVzUTBGQlF5eHhRMEZCTmtJc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeEZRVUZGTEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNN1owSkJRM2hGTEVOQlFVTXNRMEZCUXl4RlFVRkRPenRUUVVOT0xFTkJRVUU3UVVGRFRDeERRVUZETEVOQlFVRTdRVUZGV1N4UlFVRkJMR0ZCUVdFc1IwRkJSeXhWUVVGRExGZEJRVzFDTzBsQlF6ZERMRTlCUVU4c1ZVRkJReXhSUVVGaE8xRkJRMnBDTEU5QlFVOHNhMEpCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zZVVKQlFYbENMRWRCUVVjc1YwRkJWeXhEUVVGRE8xbEJRM0pFTEVsQlFVa3NRMEZCUXl4VlFVRkRMRWRCUVd0Q08xbEJRM0JDTEZGQlFWRXNRMEZCUXl3NFFrRkJUeXhEUVVGRExHbENRVUZwUWl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOeVF5eFBRVUZQTEZGQlFWRXNRMEZCUXl4eFFrRkJZU3hGUVVGRkxFTkJRVU1zUTBGQlF6dFJRVU55UXl4RFFVRkRMRU5CUVVNc1EwRkJReXhQUVVGTExFTkJRVUVzUTBGQlF5eFZRVUZETEVkQlFXVTdXVUZEY2tJc1QwRkJUeXhSUVVGUkxFTkJRVU1zSzBKQlFWRXNRMEZCUXl4SFFVRkhMRU5CUVVNc1VVRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTNaRUxFTkJRVU1zUTBGQlF5eERRVUZETzBsQlExZ3NRMEZCUXl4RFFVRkRPMEZCUTA0c1EwRkJReXhEUVVGQk8wRkJSVmtzVVVGQlFTeFZRVUZWTEVkQlFVY3NWVUZCUXl4WFFVRnRRanRKUVVNeFF5eFBRVUZQTEZWQlFVTXNVVUZCWVR0UlFVTnFRaXhQUVVGUExHdENRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMSGRDUVVGM1FpeEZRVUZGTzFsQlEzaERMRmRCUVZjc1JVRkJSU3hYUVVGWE8xTkJRek5DTEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJReXhIUVVGclFqdFpRVU4yUWl4UlFVRlJMRU5CUVVNc09FSkJRVThzUTBGQlF5eHBRa0ZCYVVJc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRGNrTXNUMEZCVHl4UlFVRlJMRU5CUVVNc2NVSkJRV0VzUlVGQlJTeERRVUZETEVOQlFVTTdVVUZEY2tNc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlN5eERRVUZCTEVOQlFVTXNWVUZCUXl4SFFVRmxPMWxCUTNKQ0xFOUJRVThzVVVGQlVTeERRVUZETEN0Q1FVRlJMRU5CUVVNc1IwRkJSeXhEUVVGRExGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOMlJDeERRVUZETEVOQlFVTXNRMEZCUVR0SlFVTk9MRU5CUVVNc1EwRkJRenRCUVVOT0xFTkJRVU1zUTBGQlFTSjkiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgYXhpb3NfMSA9IHJlcXVpcmUoXCJheGlvc1wiKTtcbnZhciBub3RpZmljYXRpb25zQWN0aW9uc18xID0gcmVxdWlyZShcIi4vbm90aWZpY2F0aW9uc0FjdGlvbnNcIik7XG5leHBvcnRzLlVQREFURV9DSEFUX1VTRVJTID0gJ1VQREFURV9DSEFUX1VTRVJTJztcbmV4cG9ydHMuQUREX0NIQVRfVVNFUiA9ICdBRERfVVNFUic7XG5leHBvcnRzLlJFTU9WRV9DSEFUX1VTRVIgPSAnUkVNT1ZFX1VTRVInO1xuZXhwb3J0cy51cGRhdGVVc2VycyA9IGZ1bmN0aW9uICh1c2Vycykge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV4cG9ydHMuVVBEQVRFX0NIQVRfVVNFUlMsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHVzZXJzOiB1c2Vyc1xuICAgICAgICB9XG4gICAgfTtcbn07XG5leHBvcnRzLmFkZFVzZXIgPSBmdW5jdGlvbiAodXNlcikge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV4cG9ydHMuQUREX0NIQVRfVVNFUixcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgdXNlcjogdXNlclxuICAgICAgICB9XG4gICAgfTtcbn07XG5leHBvcnRzLnJlbW92ZVVzZXIgPSBmdW5jdGlvbiAoZW1haWwpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBleHBvcnRzLlJFTU9WRV9DSEFUX1VTRVIsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGVtYWlsOiBlbWFpbFxuICAgICAgICB9XG4gICAgfTtcbn07XG5leHBvcnRzLmZldGNoQWxsVXNlcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkaXNwYXRjaCkge1xuICAgICAgICByZXR1cm4gYXhpb3NfMVtcImRlZmF1bHRcIl0uZ2V0KCcvYXBpL3YxL3VzZXJzJykudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICB2YXIgdXNlcnMgPSB7fTtcbiAgICAgICAgICAgIHJlcy5kYXRhLnVzZXJzLmZvckVhY2goZnVuY3Rpb24gKHUpIHtcbiAgICAgICAgICAgICAgICB1c2Vyc1t1LmVtYWlsXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogdS5yb2xlLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB1Lm5hbWVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkaXNwYXRjaChleHBvcnRzLnVwZGF0ZVVzZXJzKHVzZXJzKSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ0ZldGNoaW5nIGFsbCB1c2VycyBmYWlsZWQnKSk7XG4gICAgICAgICAgICByZXR1cm4gZXJyO1xuICAgICAgICB9KTtcbiAgICB9O1xufTtcbmV4cG9ydHMuY3JlYXRlTmV3VXNlciA9IGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkaXNwYXRjaCkge1xuICAgICAgICByZXR1cm4gYXhpb3NfMVtcImRlZmF1bHRcIl0uZ2V0KCcvYXBpL3YxLycpO1xuICAgIH07XG59O1xuZXhwb3J0cy5lZGl0VXNlciA9IGZ1bmN0aW9uIChlbWFpbCwgdXNlcikge1xufTtcbmV4cG9ydHMuZGVsZXRlVXNlciA9IGZ1bmN0aW9uIChlbWFpbCkge1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVkyaGhkRlZ6WlhKelFXTjBhVzl1Y3k1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUx5NHVMeTR1TDNOeVl5OTNaV0l2WVdOMGFXOXVjeTlqYUdGMFZYTmxjbk5CWTNScGIyNXpMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3TzBGQlFVRXNLMEpCUVhsRU8wRkJTWHBFTEN0RVFVRnJSRHRCUVVWeVF5eFJRVUZCTEdsQ1FVRnBRaXhIUVVGSExHMUNRVUZ0UWl4RFFVRkRPMEZCUTNoRExGRkJRVUVzWVVGQllTeEhRVUZITEZWQlFWVXNRMEZCUXp0QlFVTXpRaXhSUVVGQkxHZENRVUZuUWl4SFFVRkhMR0ZCUVdFc1EwRkJRenRCUVVWcVF5eFJRVUZCTEZkQlFWY3NSMEZCUnl4VlFVRlRMRXRCUVZrN1NVRkROVU1zVDBGQlR6dFJRVU5JTEVsQlFVa3NSVUZCUlN4NVFrRkJhVUk3VVVGRGRrSXNTVUZCU1N4RlFVRkZPMWxCUTBZc1MwRkJTeXhGUVVGRkxFdEJRVXM3VTBGRFpqdExRVU5LTEVOQlFVRTdRVUZEVEN4RFFVRkRMRU5CUVVFN1FVRkZXU3hSUVVGQkxFOUJRVThzUjBGQlJ5eFZRVUZUTEVsQlFXTTdTVUZETVVNc1QwRkJUenRSUVVOSUxFbEJRVWtzUlVGQlJTeHhRa0ZCWVR0UlFVTnVRaXhKUVVGSkxFVkJRVVU3V1VGRFJpeEpRVUZKTEVWQlFVVXNTVUZCU1R0VFFVTmlPMHRCUTBvc1EwRkJRVHRCUVVOTUxFTkJRVU1zUTBGQlFUdEJRVVZaTEZGQlFVRXNWVUZCVlN4SFFVRkhMRlZCUVZNc1MwRkJZVHRKUVVNMVF5eFBRVUZQTzFGQlEwZ3NTVUZCU1N4RlFVRkZMSGRDUVVGblFqdFJRVU4wUWl4SlFVRkpMRVZCUVVVN1dVRkRSaXhMUVVGTExFVkJRVVVzUzBGQlN6dFRRVU5tTzB0QlEwb3NRMEZCUVR0QlFVTk1MRU5CUVVNc1EwRkJRVHRCUVVkWkxGRkJRVUVzWVVGQllTeEhRVUZITzBsQlEzcENMRTlCUVU4c1ZVRkJReXhSUVVGclFqdFJRVU4wUWl4UFFVRlBMR3RDUVVGTExFTkJRVU1zUjBGQlJ5eERRVUZETEdWQlFXVXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGRExFZEJRV3RDTzFsQlEzUkVMRWxCUVVrc1MwRkJTeXhIUVVGVkxFVkJRVVVzUTBGQlF6dFpRVU4wUWl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFBRVUZQTEVOQlFVTXNWVUZCUXl4RFFVRlhPMmRDUVVNdlFpeExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSE8yOUNRVU5pTEVsQlFVa3NSVUZCUlN4RFFVRkRMRU5CUVVNc1NVRkJTVHR2UWtGRFdpeEpRVUZKTEVWQlFVVXNRMEZCUXl4RFFVRkRMRWxCUVVrN2FVSkJRMllzUTBGQlF6dFpRVU5PTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTBnc1VVRkJVU3hEUVVGRExHMUNRVUZYTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVNM1FpeFBRVUZQTEVkQlFVY3NRMEZCUXp0UlFVTm1MRU5CUVVNc1EwRkJReXhEUVVGRExFOUJRVXNzUTBGQlFTeERRVUZETEZWQlFVTXNSMEZCWlR0WlFVTnlRaXhSUVVGUkxFTkJRVU1zSzBKQlFWRXNRMEZCUXl3eVFrRkJNa0lzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEYUVRc1QwRkJUeXhIUVVGSExFTkJRVU03VVVGRFppeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTlFMRU5CUVVNc1EwRkJRVHRCUVVOTUxFTkJRVU1zUTBGQlFUdEJRVVZaTEZGQlFVRXNZVUZCWVN4SFFVRkhMRlZCUVVNc1NVRkJZenRKUVVONFF5eFBRVUZQTEZWQlFVTXNVVUZCYTBJN1VVRkRkRUlzVDBGQlR5eHJRa0ZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhWUVVGVkxFTkJRVU1zUTBGQlFUdEpRVU5vUXl4RFFVRkRMRU5CUVVFN1FVRkRUQ3hEUVVGRExFTkJRVUU3UVVGRldTeFJRVUZCTEZGQlFWRXNSMEZCUnl4VlFVRkRMRXRCUVdFc1JVRkJSU3hKUVVGak8wRkJSWFJFTEVOQlFVTXNRMEZCUVR0QlFVVlpMRkZCUVVFc1ZVRkJWU3hIUVVGSExGVkJRVU1zUzBGQllUdEJRVVY0UXl4RFFVRkRMRU5CUVVFaWZRPT0iLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLkFERF9FUlJPUiA9ICdBRERfRVJST1InO1xuZXhwb3J0cy5SRU1PVkVfRVJST1IgPSAnUkVNT1ZFX0VSUk9SJztcbmV4cG9ydHMuQ0xFQVJfRVJST1JTID0gJ0NMRUFSX0VSUk9SUyc7XG5leHBvcnRzLkFERF9JTkZPID0gJ0FERF9JTkZPJztcbmV4cG9ydHMuUkVNT1ZFX0lORk8gPSAnUkVNT1ZFX0lORk8nO1xuZXhwb3J0cy5DTEVBUl9JTkZPUyA9ICdDTEVBUl9JTkZPUyc7XG5leHBvcnRzLmFkZEVycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXhwb3J0cy5BRERfRVJST1IsXG4gICAgICAgIGRhdGE6IGVycm9yXG4gICAgfTtcbn07XG5leHBvcnRzLnJlbW92ZUVycm9yID0gZnVuY3Rpb24gKGkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBleHBvcnRzLlJFTU9WRV9FUlJPUixcbiAgICAgICAgZGF0YTogaVxuICAgIH07XG59O1xuZXhwb3J0cy5jbGVhckVycm9ycyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4geyB0eXBlOiBleHBvcnRzLkNMRUFSX0VSUk9SUyB9O1xufTtcbmV4cG9ydHMuYWRkSW5mbyA9IGZ1bmN0aW9uIChpbmZvKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXhwb3J0cy5BRERfSU5GTyxcbiAgICAgICAgZGF0YTogaW5mb1xuICAgIH07XG59O1xuZXhwb3J0cy5yZW1vdmVJbmZvID0gZnVuY3Rpb24gKGkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBleHBvcnRzLlJFTU9WRV9JTkZPLFxuICAgICAgICBkYXRhOiBpXG4gICAgfTtcbn07XG5leHBvcnRzLmNsZWFySW5mb3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXhwb3J0cy5DTEVBUl9JTkZPU1xuICAgIH07XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYm05MGFXWnBZMkYwYVc5dWMwRmpkR2x2Ym5NdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOHVMaTh1TGk5emNtTXZkMlZpTDJGamRHbHZibk12Ym05MGFXWnBZMkYwYVc5dWMwRmpkR2x2Ym5NdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZCWVN4UlFVRkJMRk5CUVZNc1IwRkJSeXhYUVVGWExFTkJRVU03UVVGRGVFSXNVVUZCUVN4WlFVRlpMRWRCUVVjc1kwRkJZeXhEUVVGRE8wRkJRemxDTEZGQlFVRXNXVUZCV1N4SFFVRkhMR05CUVdNc1EwRkJRenRCUVVNNVFpeFJRVUZCTEZGQlFWRXNSMEZCUnl4VlFVRlZMRU5CUVVNN1FVRkRkRUlzVVVGQlFTeFhRVUZYTEVkQlFVY3NZVUZCWVN4RFFVRkRPMEZCUXpWQ0xGRkJRVUVzVjBGQlZ5eEhRVUZITEdGQlFXRXNRMEZCUXp0QlFVVTFRaXhSUVVGQkxGRkJRVkVzUjBGQlJ5eFZRVUZETEV0QlFXRTdTVUZEYkVNc1QwRkJUenRSUVVOSUxFbEJRVWtzUlVGQlJTeHBRa0ZCVXp0UlFVTm1MRWxCUVVrc1JVRkJSU3hMUVVGTE8wdEJRMlFzUTBGQlF6dEJRVU5PTEVOQlFVTXNRMEZCUVR0QlFVVlpMRkZCUVVFc1YwRkJWeXhIUVVGSExGVkJRVU1zUTBGQlV6dEpRVU5xUXl4UFFVRlBPMUZCUTBnc1NVRkJTU3hGUVVGRkxHOUNRVUZaTzFGQlEyeENMRWxCUVVrc1JVRkJSU3hEUVVGRE8wdEJRMVlzUTBGQlF6dEJRVU5PTEVOQlFVTXNRMEZCUVR0QlFVVlpMRkZCUVVFc1YwRkJWeXhIUVVGSE8wbEJRM1pDTEU5QlFVOHNSVUZCUlN4SlFVRkpMRVZCUVVVc2IwSkJRVmtzUlVGQlJTeERRVUZETzBGQlEyeERMRU5CUVVNc1EwRkJRVHRCUVVWWkxGRkJRVUVzVDBGQlR5eEhRVUZITEZWQlFVTXNTVUZCV1R0SlFVTm9ReXhQUVVGUE8xRkJRMGdzU1VGQlNTeEZRVUZGTEdkQ1FVRlJPMUZCUTJRc1NVRkJTU3hGUVVGRkxFbEJRVWs3UzBGRFlpeERRVUZETzBGQlEwNHNRMEZCUXl4RFFVRkJPMEZCUlZrc1VVRkJRU3hWUVVGVkxFZEJRVWNzVlVGQlF5eERRVUZUTzBsQlEyaERMRTlCUVU4N1VVRkRTQ3hKUVVGSkxFVkJRVVVzYlVKQlFWYzdVVUZEYWtJc1NVRkJTU3hGUVVGRkxFTkJRVU03UzBGRFZpeERRVUZETzBGQlEwNHNRMEZCUXl4RFFVRkJPMEZCUlZrc1VVRkJRU3hWUVVGVkxFZEJRVWM3U1VGRGRFSXNUMEZCVHp0UlFVTklMRWxCUVVrc1JVRkJSU3h0UWtGQlZ6dExRVU53UWl4RFFVRkRPMEZCUTA0c1EwRkJReXhEUVVGQkluMD0iLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLlRPR0dMRV9TSURFQkFSX09QRU4gPSAnVE9HR0xFX1NJREVCQVJfT1BFTic7XG5leHBvcnRzLnRvZ2dsZVNpZGViYXJPcGVuID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV4cG9ydHMuVE9HR0xFX1NJREVCQVJfT1BFTlxuICAgIH07XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYzJsa1pXSmhja0ZqZEdsdmJuTXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOHVMaTh1TGk4dUxpOXpjbU12ZDJWaUwyRmpkR2x2Ym5NdmMybGtaV0poY2tGamRHbHZibk11ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRkJZU3hSUVVGQkxHMUNRVUZ0UWl4SFFVRkhMSEZDUVVGeFFpeERRVUZETzBGQlJUVkRMRkZCUVVFc2FVSkJRV2xDTEVkQlFVYzdTVUZETjBJc1QwRkJUenRSUVVOSUxFbEJRVWtzUlVGQlJTd3lRa0ZCYlVJN1MwRkROVUlzUTBGQlFUdEJRVU5NTEVOQlFVTXNRMEZCUVNKOSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBpbyA9IHJlcXVpcmUoXCJzb2NrZXQuaW8tY2xpZW50XCIpO1xuZXhwb3J0cy5JTklUX1dFQlNPQ0tFVCA9ICdJTklUX1dFQlNPQ0tFVCc7XG5leHBvcnRzLlNFVF9TT0NLRVRfQ09OTkVDVEVEID0gJ1NFVF9TT0NLRVRfQ09OTkVDVEVEJztcbmV4cG9ydHMuU0VUX1NPQ0tFVF9DT05ORUNURURfVVNFUlMgPSAnU0VUX1NPQ0tFVF9DT05ORUNURURfVVNFUlMnO1xuZXhwb3J0cy5pbml0V2Vic29ja2V0ID0gZnVuY3Rpb24gKGlvKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXhwb3J0cy5JTklUX1dFQlNPQ0tFVCxcbiAgICAgICAgZGF0YTogeyBpbzogaW8gfVxuICAgIH07XG59O1xuZXhwb3J0cy5zZXRTb2NrZXRDb25uZWN0ZWQgPSBmdW5jdGlvbiAoY29ubmVjdGVkKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXhwb3J0cy5TRVRfU09DS0VUX0NPTk5FQ1RFRCxcbiAgICAgICAgZGF0YTogeyBjb25uZWN0ZWQ6IGNvbm5lY3RlZCB9XG4gICAgfTtcbn07XG5leHBvcnRzLnNldFNvY2tldENvbm5lY3RlZFVzZXJzID0gZnVuY3Rpb24gKHVzZXJFbWFpbHMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBleHBvcnRzLlNFVF9TT0NLRVRfQ09OTkVDVEVEX1VTRVJTLFxuICAgICAgICBkYXRhOiB7IHVzZXJFbWFpbHM6IHVzZXJFbWFpbHMgfVxuICAgIH07XG59O1xuZXhwb3J0cy5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZGlzcGF0Y2gsIGdldFN0YXRlKSB7XG4gICAgICAgIHZhciBzb2NrZXQgPSBpbygpO1xuICAgICAgICBzb2NrZXQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkaXNwYXRjaChleHBvcnRzLnNldFNvY2tldENvbm5lY3RlZCh0cnVlKSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYXV0aG9yaXplZCBbJyArIHNvY2tldC5pZCArICddJyk7XG4gICAgICAgICAgICBzb2NrZXQub24oJ2Nvbm5lY3RlZCB1c2VycycsIGZ1bmN0aW9uICh1c2VyRW1haWxzKSB7XG4gICAgICAgICAgICAgICAgZGlzcGF0Y2goZXhwb3J0cy5zZXRTb2NrZXRDb25uZWN0ZWRVc2Vycyh1c2VyRW1haWxzKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNvY2tldC5vbignZGlzY29ubmVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRpc3BhdGNoKGV4cG9ydHMuc2V0U29ja2V0Q29ubmVjdGVkKGZhbHNlKSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRGlzY29ubmVjdGVkIGZyb20gd2Vic29ja2V0IHNlcnZlciwgYXR0ZW1wdGluZyByZWNvbm5lY3QnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkaXNwYXRjaChleHBvcnRzLmluaXRXZWJzb2NrZXQoc29ja2V0KSk7XG4gICAgfTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2ljMjlqYTJWMFFXTjBhVzl1Y3k1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUx5NHVMeTR1TDNOeVl5OTNaV0l2WVdOMGFXOXVjeTl6YjJOclpYUkJZM1JwYjI1ekxuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCUVVFc2NVTkJRWFZETzBGQlN6RkNMRkZCUVVFc1kwRkJZeXhIUVVGSExHZENRVUZuUWl4RFFVRkRPMEZCUTJ4RExGRkJRVUVzYjBKQlFXOUNMRWRCUVVjc2MwSkJRWE5DTEVOQlFVTTdRVUZET1VNc1VVRkJRU3d3UWtGQk1FSXNSMEZCUnl3MFFrRkJORUlzUTBGQlF6dEJRVVV4UkN4UlFVRkJMR0ZCUVdFc1IwRkJSeXhWUVVGRExFVkJRWGxDTzBsQlEyNUVMRTlCUVU4N1VVRkRTQ3hKUVVGSkxFVkJRVVVzYzBKQlFXTTdVVUZEY0VJc1NVRkJTU3hGUVVGRkxFVkJRVVVzUlVGQlJTeEZRVUZGTEVWQlFVVXNSVUZCUlR0TFFVTnVRaXhEUVVGRE8wRkJRMDRzUTBGQlF5eERRVUZCTzBGQlJWa3NVVUZCUVN4clFrRkJhMElzUjBGQlJ5eFZRVUZETEZOQlFXdENPMGxCUTJwRUxFOUJRVTg3VVVGRFNDeEpRVUZKTEVWQlFVVXNORUpCUVc5Q08xRkJRekZDTEVsQlFVa3NSVUZCUlN4RlFVRkZMRk5CUVZNc1JVRkJSU3hUUVVGVExFVkJRVVU3UzBGRGFrTXNRMEZCUVR0QlFVTk1MRU5CUVVNc1EwRkJRVHRCUVVWWkxGRkJRVUVzZFVKQlFYVkNMRWRCUVVjc1ZVRkJReXhWUVVGdlFqdEpRVU40UkN4UFFVRlBPMUZCUTBnc1NVRkJTU3hGUVVGRkxHdERRVUV3UWp0UlFVTm9ReXhKUVVGSkxFVkJRVVVzUlVGQlJTeFZRVUZWTEVWQlFVVXNWVUZCVlN4RlFVRkZPMHRCUTI1RExFTkJRVUU3UVVGRFRDeERRVUZETEVOQlFVRTdRVUZGV1N4UlFVRkJMRWxCUVVrc1IwRkJSenRKUVVOb1FpeFBRVUZQTEZWQlFVTXNVVUZCYTBJc1JVRkJSU3hSUVVGclFqdFJRVU14UXl4SlFVRkpMRTFCUVUwc1IwRkJNRUlzUlVGQlJTeEZRVUZGTEVOQlFVTTdVVUZEZWtNc1RVRkJUU3hEUVVGRExFVkJRVVVzUTBGQlF5eFRRVUZUTEVWQlFVVTdXVUZEYWtJc1VVRkJVU3hEUVVGRExEQkNRVUZyUWl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRGJrTXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhqUVVGakxFZEJRVWNzVFVGQlRTeERRVUZETEVWQlFVVXNSMEZCUnl4SFFVRkhMRU5CUVVNc1EwRkJRenRaUVVNNVF5eE5RVUZOTEVOQlFVTXNSVUZCUlN4RFFVRkRMR2xDUVVGcFFpeEZRVUZGTEZWQlFVTXNWVUZCYjBJN1owSkJRemxETEZGQlFWRXNRMEZCUXl3clFrRkJkVUlzUTBGQlF5eFZRVUZWTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTJ4RUxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExQXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkZTQ3hOUVVGTkxFTkJRVU1zUlVGQlJTeERRVUZETEZsQlFWa3NSVUZCUlR0WlFVTndRaXhSUVVGUkxFTkJRVU1zTUVKQlFXdENMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU53UXl4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExEQkVRVUV3UkN4RFFVRkRMRU5CUVVNN1VVRkROVVVzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZGU0N4UFFVRlBMRkZCUVZFc1EwRkJReXh4UWtGQllTeERRVUZETEUxQlFVMHNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRNME1zUTBGQlF5eERRVUZCTzBGQlEwd3NRMEZCUXl4RFFVRkJJbjA9IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIGF4aW9zXzEgPSByZXF1aXJlKFwiYXhpb3NcIik7XG52YXIgY2hhbm5lbHNBY3Rpb25zXzEgPSByZXF1aXJlKFwiLi9jaGFubmVsc0FjdGlvbnNcIik7XG52YXIgbm90aWZpY2F0aW9uc0FjdGlvbnNfMSA9IHJlcXVpcmUoXCIuL25vdGlmaWNhdGlvbnNBY3Rpb25zXCIpO1xuZXhwb3J0cy5TRVRfQVVUSE9SSVpFRCA9ICdTRVRfQVVUSE9SSVpFRCc7XG5leHBvcnRzLlNFVF9VU0VSID0gJ1NFVF9VU0VSJztcbmV4cG9ydHMuTE9HT1VUX1VTRVIgPSAnTE9HT1VUX1VTRVInO1xuZXhwb3J0cy5TRVRfSldUID0gJ1NFVF9KV1QnO1xuZXhwb3J0cy5zZXRBdXRob3JpemVkID0gZnVuY3Rpb24gKGF1dGhvcml6ZWQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBleHBvcnRzLlNFVF9BVVRIT1JJWkVELFxuICAgICAgICBkYXRhOiBhdXRob3JpemVkXG4gICAgfTtcbn07XG5leHBvcnRzLnNldFVzZXIgPSBmdW5jdGlvbiAodXNlcikge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV4cG9ydHMuU0VUX1VTRVIsXG4gICAgICAgIGRhdGE6IHVzZXJcbiAgICB9O1xufTtcbmV4cG9ydHMubG9nb3V0VXNlciA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBleHBvcnRzLkxPR09VVF9VU0VSXG4gICAgfTtcbn07XG5leHBvcnRzLnNldEp3dCA9IGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV4cG9ydHMuU0VUX0pXVCxcbiAgICAgICAgZGF0YTogdG9rZW5cbiAgICB9O1xufTtcbmV4cG9ydHMubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZGlzcGF0Y2gpIHtcbiAgICAgICAgZGlzcGF0Y2goZXhwb3J0cy5sb2dvdXRVc2VyKCkpO1xuICAgICAgICByZXR1cm4gZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuY2xlYXJDaGFubmVsc0RhdGEoKSk7XG4gICAgfTtcbn07XG5leHBvcnRzLnVwZGF0ZU5hbWUgPSBmdW5jdGlvbiAobmFtZSwgb25TdWNjZXNzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkaXNwYXRjaCkge1xuICAgICAgICByZXR1cm4gYXhpb3NfMVtcImRlZmF1bHRcIl0ucG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9uYW1lJywge1xuICAgICAgICAgICAgbmFtZTogbmFtZVxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkSW5mbygnTmFtZSB1cGRhdGVkJykpO1xuICAgICAgICAgICAgaWYgKG9uU3VjY2VzcylcbiAgICAgICAgICAgICAgICBvblN1Y2Nlc3MoKTtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyLnJlc3BvbnNlICYmIGVyci5yZXNwb25zZS5kYXRhLmVycm9yKVxuICAgICAgICAgICAgICAgIHJldHVybiBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKGVyci5yZXNwb25zZS5kYXRhLmVycm9yKSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU29tZXRoaW5nIHdlbnQgd3JvbmcgdXBkYXRpbmcgdXNlciBuYW1lJywgZXJyKTtcbiAgICAgICAgICAgIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byB1cGRhdGUgeW91ciBuYW1lLicpKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG5leHBvcnRzLnVwZGF0ZUVtYWlsID0gZnVuY3Rpb24gKGVtYWlsLCBvblN1Y2Nlc3MpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRpc3BhdGNoKSB7XG4gICAgICAgIHJldHVybiBheGlvc18xW1wiZGVmYXVsdFwiXS5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL2VtYWlsJywge1xuICAgICAgICAgICAgZW1haWw6IGVtYWlsXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRJbmZvKCdFbWFpbCB1cGRhdGVkJykpO1xuICAgICAgICAgICAgaWYgKG9uU3VjY2VzcylcbiAgICAgICAgICAgICAgICBvblN1Y2Nlc3MoKTtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyLnJlc3BvbnNlICYmIGVyci5yZXNwb25zZS5kYXRhLmVycm9yKVxuICAgICAgICAgICAgICAgIHJldHVybiBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKGVyci5yZXNwb25zZS5kYXRhLmVycm9yKSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU29tZXRoaW5nIHdlbnQgd3JvbmcgdXBkYXRpbmcgdXNlciBlbWFpbCcsIGVycik7XG4gICAgICAgICAgICBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gdXBkYXRlIHlvdXIgZW1haWwuJykpO1xuICAgICAgICB9KTtcbiAgICB9O1xufTtcbmV4cG9ydHMudXBkYXRlUGFzc3dvcmQgPSBmdW5jdGlvbiAob2xkUGFzcywgbmV3UGFzcywgb25TdWNjZXNzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkaXNwYXRjaCkge1xuICAgICAgICByZXR1cm4gYXhpb3NfMVtcImRlZmF1bHRcIl0ucG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9wYXNzd29yZCcsIHtcbiAgICAgICAgICAgIG9sZFBhc3M6IG9sZFBhc3MsXG4gICAgICAgICAgICBuZXdQYXNzOiBuZXdQYXNzXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRJbmZvKCdQYXNzd29yZCB1cGRhdGVkJykpO1xuICAgICAgICAgICAgaWYgKG9uU3VjY2VzcylcbiAgICAgICAgICAgICAgICBvblN1Y2Nlc3MoKTtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyLnJlc3BvbnNlICYmIGVyci5yZXNwb25zZS5kYXRhLmVycm9yKVxuICAgICAgICAgICAgICAgIHJldHVybiBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKGVyci5yZXNwb25zZS5kYXRhLmVycm9yKSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU29tZXRoaW5nIHdlbnQgd3JvbmcgdXBkYXRpbmcgdXNlciBwYXNzd29yZCcsIGVycik7XG4gICAgICAgICAgICBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gdXBkYXRlIHlvdXIgcGFzc3dvcmQuJykpO1xuICAgICAgICB9KTtcbiAgICB9O1xufTtcbmV4cG9ydHMuY3JlYXRlVXNlciA9IGZ1bmN0aW9uIChuYW1lLCBlbWFpbCwgcm9sZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZGlzcGF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIGF4aW9zXzFbXCJkZWZhdWx0XCJdLnBvc3QoJy9hcGkvdjEvdXNlci9jcmVhdGUnLCB7XG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgICAgICAgcm9sZTogcm9sZSxcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEluZm8oJ05ldyB1c2VyIGNyZWF0ZWQnKSk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgaWYgKGVyci5yZXNwb25zZSAmJiBlcnIucmVzcG9uc2UuZGF0YS5lcnJvcilcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKGVyci5yZXNwb25zZS5kYXRhLmVycm9yKSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3JvbmcnKSk7XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuZXhwb3J0cy5lZGl0VXNlciA9IGZ1bmN0aW9uIChvcmlnaW5hbEVtYWlsLCBuZXdOYW1lLCBuZXdFbWFpbCwgbmV3Um9sZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZGlzcGF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIGF4aW9zXzFbXCJkZWZhdWx0XCJdLnB1dCgnL2FwaS92MS91c2VyL3VwZGF0ZScsIHtcbiAgICAgICAgICAgIGVtYWlsOiBvcmlnaW5hbEVtYWlsLFxuICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgIG5hbWU6IG5ld05hbWUsXG4gICAgICAgICAgICAgICAgZW1haWw6IG5ld0VtYWlsLFxuICAgICAgICAgICAgICAgIHJvbGU6IG5ld1JvbGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEluZm8oJ0NoYW5nZXMgc2F2ZWQnKSk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgaWYgKGVyci5yZXNwb25zZSAmJiBlcnIucmVzcG9uc2UuZGF0YS5lcnJvcilcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKGVyci5yZXNwb25zZS5kYXRhLmVycm9yKSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3JvbmcnKSk7XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuZXhwb3J0cy5kZWxldGVVc2VyID0gZnVuY3Rpb24gKGVtYWlsKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkaXNwYXRjaCkge1xuICAgICAgICByZXR1cm4gYXhpb3NfMVtcImRlZmF1bHRcIl0oe1xuICAgICAgICAgICAgbWV0aG9kOiAnZGVsZXRlJyxcbiAgICAgICAgICAgIHVybDogJy9hcGkvdjEvdXNlci9kZWxldGUnLFxuICAgICAgICAgICAgZGF0YTogeyBlbWFpbDogZW1haWwgfVxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkSW5mbygnVXNlciBkZWxldGVkJykpO1xuICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIucmVzcG9uc2UgJiYgZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICAgICAgZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcihlcnIucmVzcG9uc2UuZGF0YS5lcnJvcikpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nJykpO1xuICAgICAgICB9KTtcbiAgICB9O1xufTtcbmV4cG9ydHMucmVzdG9yZVVzZXIgPSBmdW5jdGlvbiAoZW1haWwpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRpc3BhdGNoKSB7XG4gICAgICAgIHJldHVybiBheGlvc18xW1wiZGVmYXVsdFwiXS5wdXQoJy9hcGkvdjEvdXNlci9yZXN0b3JlJywge1xuICAgICAgICAgICAgZW1haWw6IGVtYWlsXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRJbmZvKCdVc2VyIHJlc3RvcmVkJykpO1xuICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIucmVzcG9uc2UgJiYgZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICAgICAgZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcihlcnIucmVzcG9uc2UuZGF0YS5lcnJvcikpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nJykpO1xuICAgICAgICB9KTtcbiAgICB9O1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWRYTmxja0ZqZEdsdmJuTXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOHVMaTh1TGk4dUxpOXpjbU12ZDJWaUwyRmpkR2x2Ym5NdmRYTmxja0ZqZEdsdmJuTXVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanM3UVVGQlFTd3JRa0ZCZVVRN1FVRkZla1FzY1VSQlFXOUVPMEZCUTNCRUxDdEVRVUY1UkR0QlFVVTFReXhSUVVGQkxHTkJRV01zUjBGQlJ5eG5Ra0ZCWjBJc1EwRkJRenRCUVVOc1F5eFJRVUZCTEZGQlFWRXNSMEZCUnl4VlFVRlZMRU5CUVVNN1FVRkRkRUlzVVVGQlFTeFhRVUZYTEVkQlFVY3NZVUZCWVN4RFFVRkRPMEZCUXpWQ0xGRkJRVUVzVDBGQlR5eEhRVUZITEZOQlFWTXNRMEZCUXp0QlFVVndRaXhSUVVGQkxHRkJRV0VzUjBGQlJ5eFZRVUZETEZWQlFXMUNPMGxCUXpkRExFOUJRVkU3VVVGRFNpeEpRVUZKTEVWQlFVVXNjMEpCUVdNN1VVRkRjRUlzU1VGQlNTeEZRVUZGTEZWQlFWVTdTMEZEYmtJc1EwRkJRenRCUVVOT0xFTkJRVU1zUTBGQlFUdEJRVVZaTEZGQlFVRXNUMEZCVHl4SFFVRkhMRlZCUVVNc1NVRkJaVHRKUVVOdVF5eFBRVUZQTzFGQlEwZ3NTVUZCU1N4RlFVRkZMR2RDUVVGUk8xRkJRMlFzU1VGQlNTeEZRVUZGTEVsQlFVazdTMEZEWWl4RFFVRkRPMEZCUTA0c1EwRkJReXhEUVVGQk8wRkJSVmtzVVVGQlFTeFZRVUZWTEVkQlFVYzdTVUZEZEVJc1QwRkJUenRSUVVOSUxFbEJRVWtzUlVGQlJTeHRRa0ZCVnp0TFFVTndRaXhEUVVGRE8wRkJRMDRzUTBGQlF5eERRVUZCTzBGQlJWa3NVVUZCUVN4TlFVRk5MRWRCUVVjc1ZVRkJReXhMUVVGaE8wbEJRMmhETEU5QlFVODdVVUZEU0N4SlFVRkpMRVZCUVVVc1pVRkJUenRSUVVOaUxFbEJRVWtzUlVGQlJTeExRVUZMTzB0QlEyUXNRMEZCUXp0QlFVTk9MRU5CUVVNc1EwRkJRVHRCUVVWWkxGRkJRVUVzVFVGQlRTeEhRVUZITzBsQlEyeENMRTlCUVU4c1ZVRkJReXhSUVVGaE8xRkJRMnBDTEZGQlFWRXNRMEZCUXl4clFrRkJWU3hGUVVGRkxFTkJRVU1zUTBGQlF6dFJRVU4yUWl4UFFVRlBMRkZCUVZFc1EwRkJReXh0UTBGQmFVSXNSVUZCUlN4RFFVRkRMRU5CUVVNN1NVRkRla01zUTBGQlF5eERRVUZCTzBGQlJVd3NRMEZCUXl4RFFVRkJPMEZCUjFrc1VVRkJRU3hWUVVGVkxFZEJRVWNzVlVGQlF5eEpRVUZaTEVWQlFVVXNVMEZCYjBJN1NVRkRla1FzVDBGQlR5eFZRVUZETEZGQlFXRTdVVUZEYWtJc1QwRkJUeXhyUWtGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl3d1FrRkJNRUlzUlVGQlJUdFpRVU14UXl4SlFVRkpMRVZCUVVVc1NVRkJTVHRUUVVOaUxFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUXl4SFFVRnJRanRaUVVOMlFpeFJRVUZSTEVOQlFVTXNPRUpCUVU4c1EwRkJReXhqUVVGakxFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEyeERMRWxCUVVrc1UwRkJVenRuUWtGQlJTeFRRVUZUTEVWQlFVVXNRMEZCUXp0UlFVTXZRaXhEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZMTEVOQlFVRXNRMEZCUXl4VlFVRkRMRWRCUVdVN1dVRkRja0lzU1VGQlNTeEhRVUZITEVOQlFVTXNVVUZCVVN4SlFVRkpMRWRCUVVjc1EwRkJReXhSUVVGUkxFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVczdaMEpCUTNaRExFOUJRVThzVVVGQlVTeERRVUZETEN0Q1FVRlJMRU5CUVVNc1IwRkJSeXhEUVVGRExGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOMlJDeFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMSGxEUVVGNVF5eEZRVUZGTEVkQlFVY3NRMEZCUXl4RFFVRkRPMWxCUXpWRUxGRkJRVkVzUTBGQlF5d3JRa0ZCVVN4RFFVRkRMSGRFUVVGM1JDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTnFSaXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTXNRMEZCUXp0QlFVTk9MRU5CUVVNc1EwRkJRVHRCUVVWWkxGRkJRVUVzVjBGQlZ5eEhRVUZITEZWQlFVTXNTMEZCWVN4RlFVRkZMRk5CUVc5Q08wbEJRek5FTEU5QlFVOHNWVUZCUXl4UlFVRmhPMUZCUTJwQ0xFOUJRVThzYTBKQlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc01rSkJRVEpDTEVWQlFVVTdXVUZETTBNc1MwRkJTeXhGUVVGRkxFdEJRVXM3VTBGRFppeERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVVNc1IwRkJhMEk3V1VGRGRrSXNVVUZCVVN4RFFVRkRMRGhDUVVGUExFTkJRVU1zWlVGQlpTeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTnVReXhKUVVGSkxGTkJRVk03WjBKQlFVVXNVMEZCVXl4RlFVRkZMRU5CUVVNN1VVRkRMMElzUTBGQlF5eERRVUZETEVOQlFVTXNUMEZCU3l4RFFVRkJMRU5CUVVNc1ZVRkJReXhIUVVGbE8xbEJRM0pDTEVsQlFVa3NSMEZCUnl4RFFVRkRMRkZCUVZFc1NVRkJTU3hIUVVGSExFTkJRVU1zVVVGQlVTeERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxPMmRDUVVOMlF5eFBRVUZQTEZGQlFWRXNRMEZCUXl3clFrRkJVU3hEUVVGRExFZEJRVWNzUTBGQlF5eFJRVUZSTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRGRrUXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXd3UTBGQk1FTXNSVUZCUlN4SFFVRkhMRU5CUVVNc1EwRkJRenRaUVVNM1JDeFJRVUZSTEVOQlFVTXNLMEpCUVZFc1EwRkJReXg1UkVGQmVVUXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRiRVlzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEVUN4RFFVRkRMRU5CUVVNN1FVRkRUaXhEUVVGRExFTkJRVUU3UVVGRldTeFJRVUZCTEdOQlFXTXNSMEZCUnl4VlFVRkRMRTlCUVdVc1JVRkJSU3hQUVVGbExFVkJRVVVzVTBGQmIwSTdTVUZEYWtZc1QwRkJUeXhWUVVGRExGRkJRV0U3VVVGRGFrSXNUMEZCVHl4clFrRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF5dzRRa0ZCT0VJc1JVRkJSVHRaUVVNNVF5eFBRVUZQTEVWQlFVVXNUMEZCVHp0WlFVTm9RaXhQUVVGUExFVkJRVVVzVDBGQlR6dFRRVU51UWl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVU1zUjBGQmEwSTdXVUZEZGtJc1VVRkJVU3hEUVVGRExEaENRVUZQTEVOQlFVTXNhMEpCUVd0Q0xFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEzUkRMRWxCUVVrc1UwRkJVenRuUWtGQlJTeFRRVUZUTEVWQlFVVXNRMEZCUXp0UlFVTXZRaXhEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZMTEVOQlFVRXNRMEZCUXl4VlFVRkRMRWRCUVdVN1dVRkRja0lzU1VGQlNTeEhRVUZITEVOQlFVTXNVVUZCVVN4SlFVRkpMRWRCUVVjc1EwRkJReXhSUVVGUkxFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVczdaMEpCUTNaRExFOUJRVThzVVVGQlVTeERRVUZETEN0Q1FVRlJMRU5CUVVNc1IwRkJSeXhEUVVGRExGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOMlJDeFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMRFpEUVVFMlF5eEZRVUZGTEVkQlFVY3NRMEZCUXl4RFFVRkRPMWxCUTJoRkxGRkJRVkVzUTBGQlF5d3JRa0ZCVVN4RFFVRkRMRFJFUVVFMFJDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTnlSaXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTXNRMEZCUXp0QlFVTk9MRU5CUVVNc1EwRkJRVHRCUVVWWkxGRkJRVUVzVlVGQlZTeEhRVUZITEZWQlFVTXNTVUZCV1N4RlFVRkZMRXRCUVdFc1JVRkJSU3hKUVVGWk8wbEJRMmhGTEU5QlFVOHNWVUZCUXl4UlFVRmhPMUZCUTJwQ0xFOUJRVThzYTBKQlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc2NVSkJRWEZDTEVWQlFVVTdXVUZEY2tNc1NVRkJTU3hGUVVGRkxFbEJRVWs3V1VGRFZpeExRVUZMTEVWQlFVVXNTMEZCU3p0WlFVTmFMRWxCUVVrc1JVRkJSU3hKUVVGSk8xTkJRMklzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRkRMRWRCUVd0Q08xbEJRM1pDTEZGQlFWRXNRMEZCUXl3NFFrRkJUeXhEUVVGRExHdENRVUZyUWl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVNeFF5eERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRkxMRU5CUVVFc1EwRkJReXhWUVVGRExFZEJRVkU3V1VGRFpDeEpRVUZKTEVkQlFVY3NRMEZCUXl4UlFVRlJMRWxCUVVrc1IwRkJSeXhEUVVGRExGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3p0blFrRkRka01zVVVGQlVTeERRVUZETEN0Q1FVRlJMRU5CUVVNc1IwRkJSeXhEUVVGRExGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJRenM3WjBKQlJUVkRMRkZCUVZFc1EwRkJReXdyUWtGQlVTeERRVUZETEhOQ1FVRnpRaXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU51UkN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOUUxFTkJRVU1zUTBGQlF6dEJRVU5PTEVOQlFVTXNRMEZCUXp0QlFVVlhMRkZCUVVFc1VVRkJVU3hIUVVGSExGVkJRVU1zWVVGQmNVSXNSVUZCUlN4UFFVRm5RaXhGUVVGRkxGRkJRV2xDTEVWQlFVVXNUMEZCWjBJN1NVRkRha2NzVDBGQlR5eFZRVUZETEZGQlFXRTdVVUZEYWtJc1QwRkJUeXhyUWtGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4eFFrRkJjVUlzUlVGQlJUdFpRVU53UXl4TFFVRkxMRVZCUVVVc1lVRkJZVHRaUVVOd1FpeEpRVUZKTEVWQlFVVTdaMEpCUTBZc1NVRkJTU3hGUVVGRkxFOUJRVTg3WjBKQlEySXNTMEZCU3l4RlFVRkZMRkZCUVZFN1owSkJRMllzU1VGQlNTeEZRVUZGTEU5QlFVODdZVUZEYUVJN1UwRkRTaXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFVTXNSMEZCYTBJN1dVRkRka0lzVVVGQlVTeERRVUZETERoQ1FVRlBMRU5CUVVNc1pVRkJaU3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU4yUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhQUVVGTExFTkJRVUVzUTBGQlF5eFZRVUZETEVkQlFWRTdXVUZEWkN4SlFVRkpMRWRCUVVjc1EwRkJReXhSUVVGUkxFbEJRVWtzUjBGQlJ5eERRVUZETEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTenRuUWtGRGRrTXNVVUZCVVN4RFFVRkRMQ3RDUVVGUkxFTkJRVU1zUjBGQlJ5eERRVUZETEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF6czdaMEpCUlRWRExGRkJRVkVzUTBGQlF5d3JRa0ZCVVN4RFFVRkRMSE5DUVVGelFpeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTnVSQ3hEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTXNRMEZCUXp0QlFVTk9MRU5CUVVNc1EwRkJRenRCUVVWWExGRkJRVUVzVlVGQlZTeEhRVUZITEZWQlFVTXNTMEZCWVR0SlFVTndReXhQUVVGUExGVkJRVU1zVVVGQllUdFJRVWRxUWl4UFFVRlBMR3RDUVVGTExFTkJRVU03V1VGRFZDeE5RVUZOTEVWQlFVVXNVVUZCVVR0WlFVTm9RaXhIUVVGSExFVkJRVVVzY1VKQlFYRkNPMWxCUXpGQ0xFbEJRVWtzUlVGQlJTeEZRVUZGTEV0QlFVc3NSVUZCUlN4TFFVRkxMRVZCUVVVN1UwRkRla0lzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRkRMRWRCUVd0Q08xbEJRM1pDTEZGQlFWRXNRMEZCUXl3NFFrRkJUeXhEUVVGRExHTkJRV01zUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEZEVNc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlN5eERRVUZCTEVOQlFVTXNWVUZCUXl4SFFVRlJPMWxCUTJRc1NVRkJTU3hIUVVGSExFTkJRVU1zVVVGQlVTeEpRVUZKTEVkQlFVY3NRMEZCUXl4UlFVRlJMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXM3WjBKQlEzWkRMRkZCUVZFc1EwRkJReXdyUWtGQlVTeERRVUZETEVkQlFVY3NRMEZCUXl4UlFVRlJMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVOQlFVTTdPMmRDUVVVMVF5eFJRVUZSTEVOQlFVTXNLMEpCUVZFc1EwRkJReXh6UWtGQmMwSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRia1FzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEVUN4RFFVRkRMRU5CUVVNN1FVRkRUaXhEUVVGRExFTkJRVU03UVVGRlZ5eFJRVUZCTEZkQlFWY3NSMEZCUnl4VlFVRkRMRXRCUVdFN1NVRkRja01zVDBGQlR5eFZRVUZETEZGQlFXRTdVVUZEYWtJc1QwRkJUeXhyUWtGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4elFrRkJjMElzUlVGQlJUdFpRVU55UXl4TFFVRkxMRVZCUVVVc1MwRkJTenRUUVVObUxFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUXl4SFFVRnJRanRaUVVOMlFpeFJRVUZSTEVOQlFVTXNPRUpCUVU4c1EwRkJReXhsUVVGbExFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEzWkRMRU5CUVVNc1EwRkJReXhEUVVGRExFOUJRVXNzUTBGQlFTeERRVUZETEZWQlFVTXNSMEZCVVR0WlFVTmtMRWxCUVVrc1IwRkJSeXhEUVVGRExGRkJRVkVzU1VGQlNTeEhRVUZITEVOQlFVTXNVVUZCVVN4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTE8yZENRVU4yUXl4UlFVRlJMRU5CUVVNc0swSkJRVkVzUTBGQlF5eEhRVUZITEVOQlFVTXNVVUZCVVN4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZET3p0blFrRkZOVU1zVVVGQlVTeERRVUZETEN0Q1FVRlJMRU5CUVVNc2MwSkJRWE5DTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTI1RUxFTkJRVU1zUTBGQlF5eERRVUZETzBsQlExQXNRMEZCUXl4RFFVRkRPMEZCUTA0c1EwRkJReXhEUVVGREluMD0iLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgY2hhbm5lbHNBY3Rpb25zXzEgPSByZXF1aXJlKFwiLi4vYWN0aW9ucy9jaGFubmVsc0FjdGlvbnNcIik7XG52YXIgaW5pdGlhbFN0YXRlID0gW107XG5leHBvcnRzLmNoYW5uZWxFeGlzdHMgPSBmdW5jdGlvbiAoY2hhbm5lbHMsIGNoYW5uZWxOYW1lKSB7XG4gICAgdmFyIGNoYW5uZWwgPSBjaGFubmVscy5maW5kKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgIHJldHVybiBjLm5hbWUgPT09IGNoYW5uZWxOYW1lO1xuICAgIH0pO1xuICAgIGlmICghY2hhbm5lbClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBjaGFubmVsO1xufTtcbmZ1bmN0aW9uIGRlZmF1bHRfMShzdGF0ZSwgYWN0aW9uKSB7XG4gICAgaWYgKHN0YXRlID09PSB2b2lkIDApIHsgc3RhdGUgPSBpbml0aWFsU3RhdGU7IH1cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgY2hhbm5lbHNBY3Rpb25zXzEuQUREX0NIQU5ORUxTOlxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbi5kYXRhLmNoYW5uZWxzO1xuICAgICAgICBjYXNlIGNoYW5uZWxzQWN0aW9uc18xLklOQ1JFTUVOVF9DSEFOTkVMX1JFVFJJRVZFX01FU1NBR0VTX09GRlNFVDoge1xuICAgICAgICAgICAgdmFyIGNoYW5uZWxfMSA9IGV4cG9ydHMuY2hhbm5lbEV4aXN0cyhzdGF0ZSwgYWN0aW9uLmRhdGEuY2hhbm5lbCk7XG4gICAgICAgICAgICB2YXIgaW5jcmVtZW50XzEgPSBhY3Rpb24uZGF0YS5pbmNyZW1lbnQ7XG4gICAgICAgICAgICBpZiAoIWNoYW5uZWxfMSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVbmtub3duIGNoYW5uZWwgd2hpbGUgaW5jcmVtZW50aW5nIG1lc3NhZ2VzIG9mZnNldCcsIGFjdGlvbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG5ld0NoYW5uZWxzXzEgPSBzdGF0ZS5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICBpZiAoYy5uYW1lID09PSBjaGFubmVsXzEubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjLnJldHJpZXZlTWVzc2FnZXNPZmZzZXQgKz0gaW5jcmVtZW50XzE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3Q2hhbm5lbHNfMTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGNoYW5uZWxzQWN0aW9uc18xLlNFVF9DSEFOTkVMX0ZFVENISU5HX05FV19NRVNTQUdFUzpcbiAgICAgICAgICAgIHZhciBjaGFubmVsID0gZXhwb3J0cy5jaGFubmVsRXhpc3RzKHN0YXRlLCBhY3Rpb24uZGF0YS5jaGFubmVsTmFtZSk7XG4gICAgICAgICAgICBpZiAoIWNoYW5uZWwpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVW5rbm93biBjaGFubmVsIHdoaWxlIGZldGNoaW5nIG5ldyBtZXNzYWdlcycsIGFjdGlvbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG5ld0NoYW5uZWxzID0gc3RhdGUubWFwKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgaWYgKGMubmFtZSA9PT0gYWN0aW9uLmRhdGEuY2hhbm5lbE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgYy5mZXRjaGluZ05ld01lc3NhZ2VzID0gYWN0aW9uLmRhdGEuaXNGZXRjaGluZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBuZXdDaGFubmVscztcbiAgICAgICAgY2FzZSBjaGFubmVsc0FjdGlvbnNfMS5TRVRfQ0hBTk5FTF9IQVNfTU9SRV9NRVNTQUdFUzoge1xuICAgICAgICAgICAgdmFyIGNoYW5uZWxfMiA9IGV4cG9ydHMuY2hhbm5lbEV4aXN0cyhzdGF0ZSwgYWN0aW9uLmRhdGEuY2hhbm5lbE5hbWUpO1xuICAgICAgICAgICAgdmFyIGhhc01vcmVfMSA9IGFjdGlvbi5kYXRhLmhhc01vcmU7XG4gICAgICAgICAgICBpZiAoIWNoYW5uZWxfMikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVbmtub3duIGNoYW5uZWwgd2hpbGUgc2V0dGluZyBoYXNNb3JlIG1lc3NhZ2VzJywgYWN0aW9uKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbmV3Q2hhbm5lbHNfMiA9IHN0YXRlLm1hcChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIGlmIChjLm5hbWUgPT09IGFjdGlvbi5kYXRhLmNoYW5uZWxOYW1lKVxuICAgICAgICAgICAgICAgICAgICBjLmhhc01vcmVNZXNzYWdlcyA9IGhhc01vcmVfMTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG5ld0NoYW5uZWxzXzI7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBjaGFubmVsc0FjdGlvbnNfMS5BRERfUkVUUklFVkVEX0NIQU5ORUxfTUVTU0FHRVM6IHtcbiAgICAgICAgICAgIHZhciByZXRyaWV2ZWRNZXNzYWdlc18xID0gYWN0aW9uLmRhdGEubWVzc2FnZXM7XG4gICAgICAgICAgICB2YXIgY2hhbm5lbE5hbWVfMSA9IGFjdGlvbi5kYXRhLmNoYW5uZWxOYW1lO1xuICAgICAgICAgICAgdmFyIGNoYW5uZWxfMyA9IGV4cG9ydHMuY2hhbm5lbEV4aXN0cyhzdGF0ZSwgY2hhbm5lbE5hbWVfMSk7XG4gICAgICAgICAgICBpZiAoIWNoYW5uZWxfMykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVbmtub3duIGNoYW5uZWwgd2hpbGUgYWRkaW5nIHJldHJpZXZlZCBjaGFubmVsIG1lc3NhZ2VzJywgYWN0aW9uKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbmV3Q2hhbm5lbHNfMyA9IHN0YXRlLm1hcChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIGlmIChjLm5hbWUgPT09IGNoYW5uZWxOYW1lXzEpXG4gICAgICAgICAgICAgICAgICAgIGMubWVzc2FnZXMgPSByZXRyaWV2ZWRNZXNzYWdlc18xLmNvbmNhdChjLm1lc3NhZ2VzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG5ld0NoYW5uZWxzXzM7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBjaGFubmVsc0FjdGlvbnNfMS5BRERfUkVDRUlWRURfQ0hBTk5FTF9NRVNTQUdFOiB7XG4gICAgICAgICAgICB2YXIgcmVjZWl2ZWRNZXNzYWdlXzEgPSBhY3Rpb24uZGF0YS5tZXNzYWdlO1xuICAgICAgICAgICAgdmFyIGNoYW5uZWxOYW1lXzIgPSBhY3Rpb24uZGF0YS5jaGFubmVsTmFtZTtcbiAgICAgICAgICAgIHZhciBjaGFubmVsXzQgPSBleHBvcnRzLmNoYW5uZWxFeGlzdHMoc3RhdGUsIGNoYW5uZWxOYW1lXzIpO1xuICAgICAgICAgICAgaWYgKCFjaGFubmVsXzQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVW5rbm93biBjaGFubmVsIHdoaWxlIGFkZGluZyByZWNlaXZlZCBtZXNzYWdlJywgc3RhdGUsIGFjdGlvbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG5ld0NoYW5uZWxzXzQgPSBzdGF0ZS5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICBpZiAoYy5uYW1lID09PSBjaGFubmVsTmFtZV8yKVxuICAgICAgICAgICAgICAgICAgICBjLm1lc3NhZ2VzID0gYy5tZXNzYWdlcy5jb25jYXQoW3JlY2VpdmVkTWVzc2FnZV8xXSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBuZXdDaGFubmVsc180O1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgY2hhbm5lbHNBY3Rpb25zXzEuQ0xFQVJfQ0hBTk5FTFNfREFUQTpcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGRlZmF1bHRfMTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVkyaGhibTVsYkhNdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOHVMaTh1TGk5emNtTXZkMlZpTDNKbFpIVmpaWEp6TDJOb1lXNXVaV3h6TG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN08wRkJRVUVzT0VSQlQzTkRPMEZCTUVKMFF5eEpRVUZKTEZsQlFWa3NSMEZCVlN4RlFVRkZMRU5CUVVNN1FVRkZhRUlzVVVGQlFTeGhRVUZoTEVkQlFVY3NWVUZCUXl4UlFVRXlRaXhGUVVGRkxGZEJRVzFDTzBsQlF6RkZMRWxCUVVrc1QwRkJUeXhIUVVGSExGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVVXNWVUZCUXl4RFFVRlZPMUZCUTNCRExFOUJRVThzUTBGQlF5eERRVUZETEVsQlFVa3NTMEZCU3l4WFFVRlhMRU5CUVVNN1NVRkRiRU1zUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEU0N4SlFVRkpMRU5CUVVNc1QwRkJUenRSUVVGRkxFOUJRVThzUzBGQlN5eERRVUZETzBsQlF6TkNMRTlCUVU4c1QwRkJUeXhEUVVGRE8wRkJRMjVDTEVOQlFVTXNRMEZCUVR0QlFVVkVMRzFDUVVGNVFpeExRVUV5UWl4RlFVRkZMRTFCUVdNN1NVRkJNME1zYzBKQlFVRXNSVUZCUVN4dlFrRkJNa0k3U1VGRGFFUXNVVUZCVHl4TlFVRk5MRU5CUVVNc1NVRkJTU3hGUVVGRk8xRkJRMmhDTEV0QlFVc3NPRUpCUVZrN1dVRkRZaXhQUVVGUExFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRPMUZCUTJoRExFdEJRVXNzTkVSQlFUQkRMRU5CUVVNc1EwRkJRenRaUVVNM1F5eEpRVUZKTEZOQlFVOHNSMEZCV1N4eFFrRkJZU3hEUVVGRExFdEJRVXNzUlVGQlJTeE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRE8xbEJRMnBGTEVsQlFVa3NWMEZCVXl4SFFVRlhMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zVTBGQlV5eERRVUZETzFsQlF6bERMRWxCUVVrc1EwRkJReXhUUVVGUExFVkJRVVU3WjBKQlExWXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXh2UkVGQmIwUXNSVUZCUlN4TlFVRk5MRU5CUVVNc1EwRkJRenRuUWtGRE1VVXNUMEZCVHl4TFFVRkxMRU5CUVVNN1lVRkRhRUk3V1VGRFJDeEpRVUZKTEdGQlFWY3NSMEZCWXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRkxGVkJRVU1zUTBGQlZUdG5Ra0ZETDBNc1NVRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeExRVUZMTEZOQlFVOHNRMEZCUXl4SlFVRkpMRVZCUVVVN2IwSkJRM2hDTEVOQlFVTXNRMEZCUXl4elFrRkJjMElzU1VGQlNTeFhRVUZUTEVOQlFVTTdhVUpCUTNwRE8yZENRVU5FTEU5QlFVOHNRMEZCUXl4RFFVRkRPMWxCUTJJc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRFNDeFBRVUZQTEdGQlFWY3NRMEZCUXp0VFFVTjBRanRSUVVORUxFdEJRVXNzYlVSQlFXbERPMWxCUTJ4RExFbEJRVWtzVDBGQlR5eEhRVUZaTEhGQ1FVRmhMRU5CUVVNc1MwRkJTeXhGUVVGRkxFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNWMEZCVnl4RFFVRkRMRU5CUVVNN1dVRkRja1VzU1VGQlNTeERRVUZETEU5QlFVOHNSVUZCUlR0blFrRkRWaXhQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETERaRFFVRTJReXhGUVVGRkxFMUJRVTBzUTBGQlF5eERRVUZETzJkQ1FVTnVSU3hQUVVGUExFdEJRVXNzUTBGQlF6dGhRVU5vUWp0WlFVTkVMRWxCUVVrc1YwRkJWeXhIUVVGakxFdEJRVXNzUTBGQlF5eEhRVUZITEVOQlFVVXNWVUZCUXl4RFFVRlZPMmRDUVVNdlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4SlFVRkpMRXRCUVVzc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eFhRVUZYTEVWQlFVVTdiMEpCUTNCRExFTkJRVU1zUTBGQlF5eHRRa0ZCYlVJc1IwRkJSeXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFWVXNRMEZCUXp0cFFrRkRiRVE3WjBKQlEwUXNUMEZCVHl4RFFVRkRMRU5CUVVNN1dVRkRZaXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU5JTEU5QlFVOHNWMEZCVnl4RFFVRkRPMUZCUTNaQ0xFdEJRVXNzSzBOQlFUWkNMRU5CUVVNc1EwRkJRenRaUVVOb1F5eEpRVUZKTEZOQlFVOHNSMEZCV1N4eFFrRkJZU3hEUVVGRExFdEJRVXNzUlVGQlJTeE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRmRCUVZjc1EwRkJReXhEUVVGRE8xbEJRM0pGTEVsQlFVa3NVMEZCVHl4SFFVRlpMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETzFsQlF6TkRMRWxCUVVrc1EwRkJReXhUUVVGUExFVkJRVVU3WjBKQlExWXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhuUkVGQlowUXNSVUZCUlN4TlFVRk5MRU5CUVVNc1EwRkJRenRuUWtGRGRFVXNUMEZCVHl4TFFVRkxMRU5CUVVNN1lVRkRhRUk3V1VGRFJDeEpRVUZKTEdGQlFWY3NSMEZCWXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRkxGVkJRVU1zUTBGQlZUdG5Ra0ZETDBNc1NVRkJTU3hEUVVGRExFTkJRVU1zU1VGQlNTeExRVUZMTEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1YwRkJWenR2UWtGRGJFTXNRMEZCUXl4RFFVRkRMR1ZCUVdVc1IwRkJSeXhUUVVGUExFTkJRVU03WjBKQlEyaERMRTlCUVU4c1EwRkJReXhEUVVGRE8xbEJRMklzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEU0N4UFFVRlBMR0ZCUVZjc1EwRkJRenRUUVVOMFFqdFJRVU5FTEV0QlFVc3NaMFJCUVRoQ0xFTkJRVU1zUTBGQlF6dFpRVU5xUXl4SlFVRkpMRzFDUVVGcFFpeEhRVUZqTEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRE8xbEJRM2hFTEVsQlFVa3NZVUZCVnl4SFFVRlhMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zVjBGQlZ5eERRVUZETzFsQlEyeEVMRWxCUVVrc1UwRkJUeXhIUVVGWkxIRkNRVUZoTEVOQlFVTXNTMEZCU3l4RlFVRkZMR0ZCUVZjc1EwRkJReXhEUVVGRE8xbEJRM3BFTEVsQlFVY3NRMEZCUXl4VFFVRlBMRVZCUVVVN1owSkJRMVFzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4NVJFRkJlVVFzUlVGQlJTeE5RVUZOTEVOQlFVTXNRMEZCUXp0blFrRkRMMFVzVDBGQlR5eExRVUZMTEVOQlFVTTdZVUZEYUVJN1dVRkRSQ3hKUVVGSkxHRkJRVmNzUjBGQll5eExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkZMRlZCUVVNc1EwRkJWVHRuUWtGREwwTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1NVRkJTU3hMUVVGTExHRkJRVmM3YjBKQlEzUkNMRU5CUVVNc1EwRkJReXhSUVVGUkxFZEJRVWNzYlVKQlFXbENMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXp0blFrRkRkRVFzVDBGQlR5eERRVUZETEVOQlFVTTdXVUZEWWl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOSUxFOUJRVThzWVVGQlZ5eERRVUZETzFOQlEzUkNPMUZCUTBRc1MwRkJTeXc0UTBGQk5FSXNRMEZCUXl4RFFVRkRPMWxCUXk5Q0xFbEJRVWtzYVVKQlFXVXNSMEZCUnl4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF6dFpRVU14UXl4SlFVRkpMR0ZCUVZjc1IwRkJSeXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEZkQlFWY3NRMEZCUXp0WlFVTXhReXhKUVVGSkxGTkJRVThzUjBGQldTeHhRa0ZCWVN4RFFVRkRMRXRCUVVzc1JVRkJSU3hoUVVGWExFTkJRVU1zUTBGQlF6dFpRVU42UkN4SlFVRkpMRU5CUVVNc1UwRkJUeXhGUVVGRk8yZENRVU5XTEU5QlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc0swTkJRU3RETEVWQlFVVXNTMEZCU3l4RlFVRkZMRTFCUVUwc1EwRkJReXhEUVVGRE8yZENRVU0xUlN4UFFVRlBMRXRCUVVzc1EwRkJRenRoUVVOb1FqdFpRVU5FTEVsQlFVa3NZVUZCVnl4SFFVRmpMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zVlVGQlF5eERRVUZWTzJkQ1FVTTVReXhKUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEV0QlFVc3NZVUZCVnp0dlFrRkRja0lzUTBGQlF5eERRVUZETEZGQlFWRXNSMEZCUnl4RFFVRkRMRU5CUVVNc1VVRkJVU3hEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZETEdsQ1FVRmxMRU5CUVVNc1EwRkJReXhEUVVGRE8yZENRVU4wUkN4UFFVRlBMRU5CUVVNc1EwRkJRenRaUVVOaUxFTkJRVU1zUTBGQlF5eERRVUZCTzFsQlEwWXNUMEZCVHl4aFFVRlhMRU5CUVVNN1UwRkRkRUk3VVVGRFJDeExRVUZMTEhGRFFVRnRRanRaUVVOd1FpeFBRVUZQTEVWQlFVVXNRMEZCUXp0UlFVTmtPMWxCUTBrc1QwRkJUeXhMUVVGTExFTkJRVU03UzBGRGNFSTdRVUZEVEN4RFFVRkRPMEZCYWtaRUxDdENRV2xHUXlKOSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBjaGF0VXNlcnNBY3Rpb25zXzEgPSByZXF1aXJlKFwiLi4vYWN0aW9ucy9jaGF0VXNlcnNBY3Rpb25zXCIpO1xudmFyIGluaXRpYWxTdGF0ZSA9IHt9O1xuZnVuY3Rpb24gZGVmYXVsdF8xKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBpZiAoc3RhdGUgPT09IHZvaWQgMCkgeyBzdGF0ZSA9IGluaXRpYWxTdGF0ZTsgfVxuICAgIHZhciBfYTtcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgY2hhdFVzZXJzQWN0aW9uc18xLlVQREFURV9DSEFUX1VTRVJTOlxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbi5kYXRhLnVzZXJzO1xuICAgICAgICBjYXNlIGNoYXRVc2Vyc0FjdGlvbnNfMS5BRERfQ0hBVF9VU0VSOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCAoX2EgPSB7fSxcbiAgICAgICAgICAgICAgICBfYVthY3Rpb24uZGF0YS51c2VyLmVtYWlsXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogYWN0aW9uLmRhdGEudXNlci5yb2xlLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBhY3Rpb24uZGF0YS51c2VyLm5hbWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfYSkpO1xuICAgICAgICBjYXNlIGNoYXRVc2Vyc0FjdGlvbnNfMS5SRU1PVkVfQ0hBVF9VU0VSOlxuICAgICAgICAgICAgdmFyIGNsb25lID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpO1xuICAgICAgICAgICAgZGVsZXRlIGNsb25lW2FjdGlvbi5kYXRhLmVtYWlsXTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGRlZmF1bHRfMTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVkyaGhkRlZ6WlhKekxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZMaTR2TGk0dmMzSmpMM2RsWWk5eVpXUjFZMlZ5Y3k5amFHRjBWWE5sY25NdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZEUVN4blJVRkRkVU03UVVGbGRrTXNTVUZCU1N4WlFVRlpMRWRCUVZVc1JVRkZla0lzUTBGQlFUdEJRVVZFTEcxQ1FVRjNRaXhMUVVFeVFpeEZRVUZGTEUxQlFXbENPMGxCUVRsRExITkNRVUZCTEVWQlFVRXNiMEpCUVRKQ096dEpRVU12UXl4UlFVRlBMRTFCUVUwc1EwRkJReXhKUVVGSkxFVkJRVVU3VVVGRGFFSXNTMEZCU3l4dlEwRkJhVUk3V1VGRGJFSXNUMEZCVHl4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF6dFJRVU0zUWl4TFFVRkxMR2REUVVGaE8xbEJRMlFzVDBGQlR5eE5RVUZOTEVOQlFVTXNUVUZCVFN4RFFVRkRMRVZCUVVVc1JVRkJSU3hMUVVGTE8yZENRVU14UWl4SFFVRkRMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NTVUZCUnp0dlFrRkRkRUlzU1VGQlNTeEZRVUZGTEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWs3YjBKQlF6TkNMRWxCUVVrc1JVRkJSU3hOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpPMmxDUVVNNVFqdHZRa0ZEU0N4RFFVRkRPMUZCUTFBc1MwRkJTeXh0UTBGQlowSTdXVUZEYWtJc1NVRkJTU3hMUVVGTExFZEJRVlVzVFVGQlRTeERRVUZETEUxQlFVMHNRMEZCUXl4RlFVRkZMRVZCUVVVc1MwRkJTeXhEUVVGRExFTkJRVU03V1VGRE5VTXNUMEZCVHl4TFFVRkxMRU5CUVVNc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUVR0UlFVTnVRenRaUVVOSkxFOUJRVThzUzBGQlN5eERRVUZETzB0QlEzQkNPMEZCUTB3c1EwRkJRenRCUVdwQ1JDd3JRa0ZwUWtNaWZRPT0iLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgbm90aWZpY2F0aW9uc0FjdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi9hY3Rpb25zL25vdGlmaWNhdGlvbnNBY3Rpb25zXCIpO1xudmFyIGluaXRpYWxTdGF0ZSA9IHtcbiAgICBlcnJvcnM6IFtdLFxuICAgIGluZm9zOiBbXVxufTtcbmZ1bmN0aW9uIGRlZmF1bHRfMShzdGF0ZSwgYWN0aW9uKSB7XG4gICAgaWYgKHN0YXRlID09PSB2b2lkIDApIHsgc3RhdGUgPSBpbml0aWFsU3RhdGU7IH1cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2Ugbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5BRERfRVJST1I6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgZXJyb3JzOiBzdGF0ZS5lcnJvcnMuY29uY2F0KFthY3Rpb24uZGF0YV0pIH0pO1xuICAgICAgICBjYXNlIG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuUkVNT1ZFX0VSUk9SOlxuICAgICAgICAgICAgdmFyIG5ld0Vycm9yc0FycmF5ID0gc3RhdGUuZXJyb3JzLnNsaWNlKCk7XG4gICAgICAgICAgICBuZXdFcnJvcnNBcnJheS5zcGxpY2UoYWN0aW9uLmRhdGEsIDEpO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGVycm9yczogbmV3RXJyb3JzQXJyYXkgfSk7XG4gICAgICAgIGNhc2Ugbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5DTEVBUl9FUlJPUlM6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgZXJyb3JzOiBbXSB9KTtcbiAgICAgICAgY2FzZSBub3RpZmljYXRpb25zQWN0aW9uc18xLkFERF9JTkZPOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGluZm9zOiBzdGF0ZS5pbmZvcy5jb25jYXQoW2FjdGlvbi5kYXRhXSkgfSk7XG4gICAgICAgIGNhc2Ugbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5SRU1PVkVfSU5GTzpcbiAgICAgICAgICAgIHZhciBuZXdJbmZvc0FycmF5ID0gc3RhdGUuaW5mb3Muc2xpY2UoKTtcbiAgICAgICAgICAgIG5ld0luZm9zQXJyYXkuc3BsaWNlKGFjdGlvbi5kYXRhLCAxKTtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBpbmZvczogbmV3SW5mb3NBcnJheSB9KTtcbiAgICAgICAgY2FzZSBub3RpZmljYXRpb25zQWN0aW9uc18xLkNMRUFSX0lORk9TOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGluZm9zOiBbXSB9KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGRlZmF1bHRfMTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWJtOTBhV1pwWTJGMGFXOXVjeTVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUx5NHVMM055WXk5M1pXSXZjbVZrZFdObGNuTXZibTkwYVdacFkyRjBhVzl1Y3k1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96dEJRVUZCTEhkRlFVTXlRenRCUVZjelF5eEpRVUZKTEZsQlFWa3NSMEZCVlR0SlFVTjBRaXhOUVVGTkxFVkJRVVVzUlVGQlJUdEpRVU5XTEV0QlFVc3NSVUZCUlN4RlFVRkZPME5CUTFvc1EwRkJRVHRCUVVWRUxHMUNRVUYzUWl4TFFVRXlRaXhGUVVGRkxFMUJRV003U1VGQk0wTXNjMEpCUVVFc1JVRkJRU3h2UWtGQk1rSTdTVUZETDBNc1VVRkJUeXhOUVVGTkxFTkJRVU1zU1VGQlNTeEZRVUZGTzFGQlEyaENMRXRCUVVzc1owTkJRVk03V1VGRFZpeFBRVUZQTEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc1JVRkJSU3hGUVVGRkxFdEJRVXNzUlVGQlJTeEZRVUZETEUxQlFVMHNSVUZCUlN4TFFVRkxMRU5CUVVNc1RVRkJUU3hEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZETEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhGUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5zUml4TFFVRkxMRzFEUVVGWk8xbEJRMklzU1VGQlNTeGpRVUZqTEVkQlFVY3NTMEZCU3l4RFFVRkRMRTFCUVUwc1EwRkJReXhMUVVGTExFVkJRVVVzUTBGQlF6dFpRVU14UXl4alFVRmpMRU5CUVVNc1RVRkJUU3hEUVVGRExFMUJRVTBzUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRkRU1zVDBGQlR5eE5RVUZOTEVOQlFVTXNUVUZCVFN4RFFVRkRMRVZCUVVVc1JVRkJSU3hMUVVGTExFVkJRVVVzUlVGQlF5eE5RVUZOTEVWQlFVVXNZMEZCWXl4RlFVRkRMRU5CUVVNc1EwRkJRenRSUVVNNVJDeExRVUZMTEcxRFFVRlpPMWxCUTJJc1QwRkJUeXhOUVVGTkxFTkJRVU1zVFVGQlRTeERRVUZETEVWQlFVVXNSVUZCUlN4TFFVRkxMRVZCUVVjc1JVRkJReXhOUVVGTkxFVkJRVVVzUlVGQlJTeEZRVUZETEVOQlFVTXNRMEZCUXp0UlFVTnVSQ3hMUVVGTExDdENRVUZSTzFsQlExUXNUMEZCVHl4TlFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExFVkJRVVVzUlVGQlJTeExRVUZMTEVWQlFVVXNSVUZCUXl4TFFVRkxMRVZCUVVVc1MwRkJTeXhEUVVGRExFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUlVGQlF5eERRVUZETEVOQlFVTTdVVUZEYUVZc1MwRkJTeXhyUTBGQlZ6dFpRVU5hTEVsQlFVa3NZVUZCWVN4SFFVRkhMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eEZRVUZGTEVOQlFVTTdXVUZEZUVNc1lVRkJZU3hEUVVGRExFMUJRVTBzUTBGQlF5eE5RVUZOTEVOQlFVTXNTVUZCU1N4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRM0pETEU5QlFVOHNUVUZCVFN4RFFVRkRMRTFCUVUwc1EwRkJReXhGUVVGRkxFVkJRVVVzUzBGQlN5eEZRVUZGTEVWQlFVVXNTMEZCU3l4RlFVRkZMR0ZCUVdFc1JVRkJSU3hEUVVGRExFTkJRVU03VVVGRE9VUXNTMEZCU3l4clEwRkJWenRaUVVOYUxFOUJRVThzVFVGQlRTeERRVUZETEUxQlFVMHNRMEZCUXl4RlFVRkZMRVZCUVVVc1MwRkJTeXhGUVVGRkxFVkJRVU1zUzBGQlN5eEZRVUZGTEVWQlFVVXNSVUZCUXl4RFFVRkRMRU5CUVVNN1VVRkRha1E3V1VGRFNTeFBRVUZQTEV0QlFVc3NRMEZCUXp0TFFVTndRanRCUVVOTUxFTkJRVU03UVVGeVFrUXNLMEpCY1VKREluMD0iLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgc2lkZWJhckFjdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi9hY3Rpb25zL3NpZGViYXJBY3Rpb25zXCIpO1xudmFyIGluaXRpYWxTdGF0ZSA9IHtcbiAgICBvcGVuOiB0cnVlXG59O1xuZnVuY3Rpb24gZGVmYXVsdF8xKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBpZiAoc3RhdGUgPT09IHZvaWQgMCkgeyBzdGF0ZSA9IGluaXRpYWxTdGF0ZTsgfVxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBzaWRlYmFyQWN0aW9uc18xLlRPR0dMRV9TSURFQkFSX09QRU46XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgb3BlbjogIXN0YXRlLm9wZW4gfSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufVxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBkZWZhdWx0XzE7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2ljMmxrWldKaGNpNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1THk0dUwzTnlZeTkzWldJdmNtVmtkV05sY25NdmMybGtaV0poY2k1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96dEJRVU5CTERSRVFVRm5SVHRCUVUxb1JTeEpRVUZKTEZsQlFWa3NSMEZCVlR0SlFVTjBRaXhKUVVGSkxFVkJRVVVzU1VGQlNUdERRVU5pTEVOQlFVRTdRVUZGUkN4dFFrRkJkMElzUzBGQk1rSXNSVUZCUlN4TlFVRmpPMGxCUVRORExITkNRVUZCTEVWQlFVRXNiMEpCUVRKQ08wbEJReTlETEZGQlFWRXNUVUZCVFN4RFFVRkRMRWxCUVVrc1JVRkJSVHRSUVVOcVFpeExRVUZMTEc5RFFVRnRRanRaUVVOd1FpeFBRVUZQTEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc1JVRkJSU3hGUVVGRkxFdEJRVXNzUlVGQlJTeEZRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFVkJRVU1zUTBGQlF5eERRVUZETzFGQlEzcEVPMWxCUTBrc1QwRkJUeXhMUVVGTExFTkJRVU03UzBGRGNFSTdRVUZEVEN4RFFVRkRPMEZCVUVRc0swSkJUME1pZlE9PSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBzb2NrZXRBY3Rpb25zXzEgPSByZXF1aXJlKFwiLi4vYWN0aW9ucy9zb2NrZXRBY3Rpb25zXCIpO1xudmFyIGluaXRpYWxTdGF0ZSA9IHtcbiAgICBpbzogbnVsbCxcbiAgICBjb25uZWN0ZWQ6IGZhbHNlLFxuICAgIGNvbm5lY3RlZFVzZXJFbWFpbHM6IFtdXG59O1xuZnVuY3Rpb24gZGVmYXVsdF8xKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBpZiAoc3RhdGUgPT09IHZvaWQgMCkgeyBzdGF0ZSA9IGluaXRpYWxTdGF0ZTsgfVxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBzb2NrZXRBY3Rpb25zXzEuSU5JVF9XRUJTT0NLRVQ6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgaW86IGFjdGlvbi5kYXRhLmlvIH0pO1xuICAgICAgICBjYXNlIHNvY2tldEFjdGlvbnNfMS5TRVRfU09DS0VUX0NPTk5FQ1RFRDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBjb25uZWN0ZWQ6IGFjdGlvbi5kYXRhLmNvbm5lY3RlZCB9KTtcbiAgICAgICAgY2FzZSBzb2NrZXRBY3Rpb25zXzEuU0VUX1NPQ0tFVF9DT05ORUNURURfVVNFUlM6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgY29ubmVjdGVkVXNlckVtYWlsczogYWN0aW9uLmRhdGEudXNlckVtYWlscyB9KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGRlZmF1bHRfMTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWMyOWphMlYwTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dkxpNHZMaTR2YzNKakwzZGxZaTl5WldSMVkyVnljeTl6YjJOclpYUXVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanM3UVVGSFFTd3dSRUZIYjBNN1FVRlJjRU1zU1VGQlNTeFpRVUZaTEVkQlFWVTdTVUZEZEVJc1JVRkJSU3hGUVVGRkxFbEJRVWs3U1VGRFVpeFRRVUZUTEVWQlFVVXNTMEZCU3p0SlFVTm9RaXh0UWtGQmJVSXNSVUZCUlN4RlFVRkZPME5CUXpGQ0xFTkJRVUU3UVVGRlJDeHRRa0ZCZDBJc1MwRkJNa0lzUlVGQlJTeE5RVUZwUWp0SlFVRTVReXh6UWtGQlFTeEZRVUZCTEc5Q1FVRXlRanRKUVVNdlF5eFJRVUZQTEUxQlFVMHNRMEZCUXl4SlFVRkpMRVZCUVVVN1VVRkRhRUlzUzBGQlN5dzRRa0ZCWXp0WlFVTm1MRTlCUVU4c1RVRkJUU3hEUVVGRExFMUJRVTBzUTBGQlF5eEZRVUZGTEVWQlFVVXNTMEZCU3l4RlFVRkZMRVZCUVVNc1JVRkJSU3hGUVVGRkxFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4RlFVRkRMRU5CUVVNc1EwRkJRenRSUVVNeFJDeExRVUZMTEc5RFFVRnZRanRaUVVOeVFpeFBRVUZQTEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc1JVRkJSU3hGUVVGRkxFdEJRVXNzUlVGQlJTeEZRVUZETEZOQlFWTXNSVUZCUlN4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExGTkJRVk1zUlVGQlF5eERRVUZETEVOQlFVTTdVVUZEZUVVc1MwRkJTeXd3UTBGQk1FSTdXVUZETTBJc1QwRkJUeXhOUVVGTkxFTkJRVU1zVFVGQlRTeERRVUZETEVWQlFVVXNSVUZCUlN4TFFVRkxMRVZCUVVVc1JVRkJReXh0UWtGQmJVSXNSVUZCUlN4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVlVzUlVGQlJTeERRVUZETEVOQlFVRTdVVUZEYmtZN1dVRkRTU3hQUVVGUExFdEJRVXNzUTBGQlF6dExRVU53UWp0QlFVTk1MRU5CUVVNN1FVRllSQ3dyUWtGWFF5SjkiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgdXNlckFjdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi9hY3Rpb25zL3VzZXJBY3Rpb25zXCIpO1xudmFyIGluaXRpYWxTdGF0ZSA9IHtcbiAgICBhdXRob3JpemVkOiBmYWxzZSxcbiAgICBlbWFpbDogZmFsc2UsXG4gICAgbmFtZTogZmFsc2UsXG4gICAgcm9sZTogZmFsc2UsXG4gICAgand0OiBmYWxzZSxcbn07XG5mdW5jdGlvbiBkZWZhdWx0XzEoc3RhdGUsIGFjdGlvbikge1xuICAgIGlmIChzdGF0ZSA9PT0gdm9pZCAwKSB7IHN0YXRlID0gaW5pdGlhbFN0YXRlOyB9XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIHVzZXJBY3Rpb25zXzEuU0VUX0FVVEhPUklaRUQ6XG4gICAgICAgICAgICBpZiAodHlwZW9mIGFjdGlvbi5kYXRhICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhIG11c3QgYmUgYm9vbGVhbiBmb3IgU0VUX0FVVEhPUklaRUQgYWN0aW9uJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFjdGlvbi5kYXRhID09PSBmYWxzZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgYXV0aG9yaXplZDogZmFsc2UsIGVtYWlsOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBhdXRob3JpemVkOiBhY3Rpb24uZGF0YSB9KTtcbiAgICAgICAgY2FzZSB1c2VyQWN0aW9uc18xLlNFVF9VU0VSOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBhY3Rpb24uZGF0YSk7XG4gICAgICAgIGNhc2UgdXNlckFjdGlvbnNfMS5MT0dPVVRfVVNFUjpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgYXV0aG9yaXplZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbmFtZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZW1haWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJvbGU6IGZhbHNlXG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIHVzZXJBY3Rpb25zXzEuU0VUX0pXVDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyB0b2tlbjogYWN0aW9uLmRhdGEgfSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufVxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBkZWZhdWx0XzE7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lkWE5sY2k1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUx5NHVMeTR1TDNOeVl5OTNaV0l2Y21Wa2RXTmxjbk12ZFhObGNpNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenRCUVVGQkxITkVRVUZ6Ump0QlFXVjBSaXhKUVVGSkxGbEJRVmtzUjBGQlZ6dEpRVU4yUWl4VlFVRlZMRVZCUVVVc1MwRkJTenRKUVVOcVFpeExRVUZMTEVWQlFVVXNTMEZCU3p0SlFVTmFMRWxCUVVrc1JVRkJSU3hMUVVGTE8wbEJRMWdzU1VGQlNTeEZRVUZGTEV0QlFVczdTVUZEV0N4SFFVRkhMRVZCUVVVc1MwRkJTenREUVVOaUxFTkJRVUU3UVVGSFJDeHRRa0ZCZDBJc1MwRkJNa0lzUlVGQlJTeE5RVUZqTzBsQlFUTkRMSE5DUVVGQkxFVkJRVUVzYjBKQlFUSkNPMGxCUXk5RExGRkJRVkVzVFVGQlRTeERRVUZETEVsQlFVa3NSVUZCUlR0UlFVTnFRaXhMUVVGTExEUkNRVUZqTzFsQlEyWXNTVUZCU1N4UFFVRlBMRTFCUVUwc1EwRkJReXhKUVVGSkxFdEJRVXNzVTBGQlV5eEZRVUZGTzJkQ1FVTnNReXhQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETEdkRVFVRm5SQ3hEUVVGRExFTkJRVU03WjBKQlEyaEZMRTlCUVU4c1MwRkJTeXhEUVVGRE8yRkJRMmhDTzFsQlEwUXNTVUZCU1N4TlFVRk5MRU5CUVVNc1NVRkJTU3hMUVVGTExFdEJRVXM3WjBKQlEzSkNMRTlCUVU4c1RVRkJUU3hEUVVGRExFMUJRVTBzUTBGQlF5eEZRVUZGTEVWQlFVVXNTMEZCU3l4RlFVRkZMRVZCUVVNc1ZVRkJWU3hGUVVGRkxFdEJRVXNzUlVGQlJTeExRVUZMTEVWQlFVVXNTMEZCU3l4RlFVRkRMRU5CUVVNc1EwRkJRenRaUVVOMlJTeFBRVUZQTEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc1JVRkJSU3hGUVVGRkxFdEJRVXNzUlVGQlJTeEZRVUZETEZWQlFWVXNSVUZCUlN4TlFVRk5MRU5CUVVNc1NVRkJTU3hGUVVGRExFTkJRVU1zUTBGQlF6dFJRVU12UkN4TFFVRkxMSE5DUVVGUk8xbEJRMVFzVDBGQlR5eE5RVUZOTEVOQlFVTXNUVUZCVFN4RFFVRkRMRVZCUVVVc1JVRkJSU3hMUVVGTExFVkJRVVVzVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUTJwRUxFdEJRVXNzZVVKQlFWYzdXVUZEV2l4UFFVRlBPMmRDUVVOSUxGVkJRVlVzUlVGQlJTeExRVUZMTzJkQ1FVTnFRaXhKUVVGSkxFVkJRVVVzUzBGQlN6dG5Ra0ZEV0N4TFFVRkxMRVZCUVVVc1MwRkJTenRuUWtGRFdpeEpRVUZKTEVWQlFVVXNTMEZCU3p0aFFVTmtMRU5CUVVFN1VVRkRUQ3hMUVVGTExIRkNRVUZQTzFsQlExSXNUMEZCVHl4TlFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExFVkJRVVVzUlVGQlJTeExRVUZMTEVWQlFVVXNSVUZCUXl4TFFVRkxMRVZCUVVVc1RVRkJUU3hEUVVGRExFbEJRVWtzUlVGQlF5eERRVUZETEVOQlFVTTdVVUZETVVRN1dVRkRTU3hQUVVGUExFdEJRVXNzUTBGQlF6dExRVU53UWp0QlFVTk1MRU5CUVVNN1FVRjRRa1FzSzBKQmQwSkRJbjA9IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIHJlZHV4XzEgPSByZXF1aXJlKFwicmVkdXhcIik7XG52YXIgcmVkdXhfdGh1bmtfMSA9IHJlcXVpcmUoXCJyZWR1eC10aHVua1wiKTtcbnZhciByZWR1eF9sb2dnZXJfMSA9IHJlcXVpcmUoXCJyZWR1eC1sb2dnZXJcIik7XG52YXIgdXNlcl8xID0gcmVxdWlyZShcIi4vcmVkdWNlcnMvdXNlclwiKTtcbnZhciBjaGFubmVsc18xID0gcmVxdWlyZShcIi4vcmVkdWNlcnMvY2hhbm5lbHNcIik7XG52YXIgbm90aWZpY2F0aW9uc18xID0gcmVxdWlyZShcIi4vcmVkdWNlcnMvbm90aWZpY2F0aW9uc1wiKTtcbnZhciBzaWRlYmFyXzEgPSByZXF1aXJlKFwiLi9yZWR1Y2Vycy9zaWRlYmFyXCIpO1xudmFyIHNvY2tldF8xID0gcmVxdWlyZShcIi4vcmVkdWNlcnMvc29ja2V0XCIpO1xudmFyIGNoYXRVc2Vyc18xID0gcmVxdWlyZShcIi4vcmVkdWNlcnMvY2hhdFVzZXJzXCIpO1xudmFyIGVudiA9IHJlcXVpcmUoJy4uLy4uL2VudicpO1xuZXhwb3J0cy5yb290UmVkdWNlciA9IHJlZHV4XzEuY29tYmluZVJlZHVjZXJzKHtcbiAgICB1c2VyOiB1c2VyXzFbXCJkZWZhdWx0XCJdLFxuICAgIGNoYW5uZWxzOiBjaGFubmVsc18xW1wiZGVmYXVsdFwiXSxcbiAgICBub3RpZmljYXRpb25zOiBub3RpZmljYXRpb25zXzFbXCJkZWZhdWx0XCJdLFxuICAgIHNpZGViYXI6IHNpZGViYXJfMVtcImRlZmF1bHRcIl0sXG4gICAgc29ja2V0OiBzb2NrZXRfMVtcImRlZmF1bHRcIl0sXG4gICAgY2hhdFVzZXJzOiBjaGF0VXNlcnNfMVtcImRlZmF1bHRcIl0sXG59KTtcbmV4cG9ydHMubWlkZGxld2FyZSA9IGVudi5wcm9kdWN0aW9uIHx8IGVudi5kaXNhYmxlUmVkdXhMb2dnaW5nID9cbiAgICByZWR1eF8xLmFwcGx5TWlkZGxld2FyZShyZWR1eF90aHVua18xW1wiZGVmYXVsdFwiXSkgOiByZWR1eF8xLmFwcGx5TWlkZGxld2FyZShyZWR1eF90aHVua18xW1wiZGVmYXVsdFwiXSwgcmVkdXhfbG9nZ2VyXzEuY3JlYXRlTG9nZ2VyKCkpO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSByZWR1eF8xLmNyZWF0ZVN0b3JlKGV4cG9ydHMucm9vdFJlZHVjZXIsIGV4cG9ydHMubWlkZGxld2FyZSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2ljM1J2Y21VdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOHVMaTl6Y21NdmQyVmlMM04wYjNKbExuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCUVVFc0swSkJRVFJHTzBGQlF6VkdMREpEUVVGeFF6dEJRVU55UXl3MlEwRkJNRU03UVVGRk1VTXNkME5CUVdkRk8wRkJRMmhGTEdkRVFVRTBSVHRCUVVNMVJTd3dSRUZCTWtZN1FVRkRNMFlzT0VOQlFYbEZPMEZCUTNwRkxEUkRRVUZ6UlR0QlFVTjBSU3hyUkVGQkswVTdRVUZGTDBVc1NVRkJUU3hIUVVGSExFZEJRVWNzVDBGQlR5eERRVUZETEZkQlFWY3NRMEZCUXl4RFFVRkRPMEZCVjNCQ0xGRkJRVUVzVjBGQlZ5eEhRVUZaTEhWQ1FVRmxMRU5CUVVNN1NVRkRhRVFzU1VGQlNTeEZRVUZGTEdsQ1FVRlhPMGxCUTJwQ0xGRkJRVkVzUlVGQlJTeHhRa0ZCWlR0SlFVTjZRaXhoUVVGaExFVkJRVVVzTUVKQlFXOUNPMGxCUTI1RExFOUJRVThzUlVGQlJTeHZRa0ZCWXp0SlFVTjJRaXhOUVVGTkxFVkJRVVVzYlVKQlFXRTdTVUZEY2tJc1UwRkJVeXhGUVVGRkxITkNRVUZuUWp0RFFVTTVRaXhEUVVGRExFTkJRVU03UVVGRlZTeFJRVUZCTEZWQlFWVXNSMEZEYmtJc1IwRkJSeXhEUVVGRExGVkJRVlVzU1VGQlNTeEhRVUZITEVOQlFVTXNiVUpCUVcxQ0xFTkJRVU1zUTBGQlF6dEpRVU16UXl4MVFrRkJaU3hEUVVGRExIZENRVUZWTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc2RVSkJRV1VzUTBGQlF5eDNRa0ZCVlN4RlFVRkZMREpDUVVGWkxFVkJRVVVzUTBGQlF5eERRVUZETzBGQlJUbEZMSEZDUVVGbExHMUNRVUZYTEVOQlFVTXNiVUpCUVZjc1JVRkJSU3hyUWtGQlZTeERRVUZETEVOQlFVTWlmUT09IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIHNlcnZlcl8xID0gcmVxdWlyZShcIi4uL3NyYy9zZXJ2ZXIvc2VydmVyXCIpO1xuZXhwb3J0cy5hcHAgPSBzZXJ2ZXJfMS5hcHA7XG52YXIgVXNlcl8xID0gcmVxdWlyZShcIi4uL3NyYy9zZXJ2ZXIvbW9kZWxzL1VzZXJcIik7XG52YXIgZHJvcEFsbENvbGxlY3Rpb25zID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBVc2VyXzFbXCJkZWZhdWx0XCJdLmRlbGV0ZU1hbnkoe30sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHAudGhlbigpW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfSk7XG59O1xuZXhwb3J0cy5kcm9wQWxsQ29sbGVjdGlvbnMgPSBkcm9wQWxsQ29sbGVjdGlvbnM7XG52YXIgTm90SW1wbGVtZW50ZWRFcnJvciA9IG5ldyBFcnJvcignVGVzdCBub3QgaW1wbGVtZW50ZWQnKTtcbmV4cG9ydHMuTm90SW1wbGVtZW50ZWRFcnJvciA9IE5vdEltcGxlbWVudGVkRXJyb3I7XG5iZWZvcmUoJ2FsbCB0ZXN0cycsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgY29uc29sZS5sb2cocHJvY2Vzcy52ZXJzaW9uKTtcbiAgICBzZXJ2ZXJfMS5jb25uLm9uKCdjb25uZWN0ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzZXJ2ZXIgc3RhcnRlZCcpO1xuICAgICAgICBkb25lKCk7XG4gICAgfSk7XG59KTtcbmJlZm9yZUVhY2goJ3Jlc2V0IERCJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICBkcm9wQWxsQ29sbGVjdGlvbnMoKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRvbmUoKTsgfSk7XG59KTtcbmFmdGVyKCdhbGwgdGVzdHMnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgIGRyb3BBbGxDb2xsZWN0aW9ucygpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2xvc2luZyBjb25uZWN0aW9ucycpO1xuICAgICAgICBzZXJ2ZXJfMS5jb25uLmNsb3NlKCk7XG4gICAgICAgIGRvbmUoKTtcbiAgICB9KTtcbn0pO1xucmVxdWlyZSgnLi93ZWIvdGVzdFN0b3JlJyk7XG5yZXF1aXJlKCcuL3dlYi90ZXN0QXN5bmNBY3Rpb25zJyk7XG5yZXF1aXJlKCcuL3NlcnZlci90ZXN0QXV0aENvbnRyb2xsZXInKTtcbnJlcXVpcmUoJy4vc2VydmVyL3Rlc3RVc2VyQ29udHJvbGxlcicpO1xucmVxdWlyZSgnLi9zZXJ2ZXIvdGVzdE1lc3NhZ2VDb250cm9sbGVyJyk7XG5yZXF1aXJlKCcuL3NlcnZlci90ZXN0Q2hhbm5lbENvbnRyb2xsZXInKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFXNWtaWGd1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk5MFpYTjBjeTlwYm1SbGVDNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenRCUVVGQkxDdERRVUZwUkR0QlFXdEVlRU1zWTBGc1JFMHNXVUZCUnl4RFFXdEVUanRCUVdwRVdpeHJSRUZCTmtNN1FVRkZOME1zU1VGQlRTeHJRa0ZCYTBJc1IwRkJSenRKUVVOMlFpeEpRVUZKTEVOQlFVTXNSMEZCUnl4SlFVRkpMRTlCUVU4c1EwRkJReXhWUVVGRExFOUJRVThzUlVGQlJTeE5RVUZOTzFGQlEyaERMR2xDUVVGSkxFTkJRVU1zVlVGQlZTeERRVUZETEVWQlFVVXNSVUZCUlN4VlFVRkRMRWRCUVZFN1dVRkRla0lzU1VGQlNTeEhRVUZITzJkQ1FVRkZMRTlCUVU4c1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzFsQlF6VkNMRTlCUVU4c1QwRkJUeXhGUVVGRkxFTkJRVU03VVVGRGNrSXNRMEZCUXl4RFFVRkRMRU5CUVVFN1NVRkRUaXhEUVVGRExFTkJRVU1zUTBGQlFUdEpRVU5HTEU5QlFVOHNRMEZCUXl4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFOUJRVXNzUTBGQlFTeERRVUZETEZWQlFVTXNSMEZCVVR0UlFVTXpRaXhQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMGxCUTNaQ0xFTkJRVU1zUTBGQlF5eERRVUZETzBGQlExQXNRMEZCUXl4RFFVRkJPMEZCY1VOaExHZEVRVUZyUWp0QlFXNURhRU1zU1VGQlRTeHRRa0ZCYlVJc1IwRkJSeXhKUVVGSkxFdEJRVXNzUTBGQlF5eHpRa0ZCYzBJc1EwRkJReXhEUVVGRE8wRkJiVU0xUWl4clJFRkJiVUk3UVVGcVEzSkVMRTFCUVUwc1EwRkJReXhYUVVGWExFVkJRVVVzVlVGQlV5eEpRVUZKTzBsQlJUZENMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zVDBGQlR5eERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRPMGxCUXpkQ0xHRkJRVWtzUTBGQlF5eEZRVUZGTEVOQlFVTXNWMEZCVnl4RlFVRkZPMUZCUTJwQ0xFOUJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zUTBGQlF6dFJRVU01UWl4SlFVRkpMRVZCUVVVc1EwRkJRenRKUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZETzBGQlExQXNRMEZCUXl4RFFVRkRMRU5CUVVNN1FVRkRTQ3hWUVVGVkxFTkJRVU1zVlVGQlZTeEZRVUZGTEZWQlFWTXNTVUZCU1R0SlFVVm9ReXhyUWtGQmEwSXNSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhqUVVGTkxFOUJRVUVzU1VGQlNTeEZRVUZGTEVWQlFVNHNRMEZCVFN4RFFVRkRMRU5CUVVNN1FVRkROVU1zUTBGQlF5eERRVUZETEVOQlFVTTdRVUZEU0N4TFFVRkxMRU5CUVVNc1YwRkJWeXhGUVVGRkxGVkJRVk1zU1VGQlNUdEpRVVUxUWl4clFrRkJhMElzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXp0UlFVTjBRaXhQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEhGQ1FVRnhRaXhEUVVGRExFTkJRVU03VVVGRGJrTXNZVUZCU1N4RFFVRkRMRXRCUVVzc1JVRkJSU3hEUVVGRE8xRkJRMklzU1VGQlNTeEZRVUZGTEVOQlFVTTdTVUZEV0N4RFFVRkRMRU5CUVVNc1EwRkJRenRCUVVOUUxFTkJRVU1zUTBGQlF5eERRVUZCTzBGQlMwWXNUMEZCVHl4RFFVRkRMR2xDUVVGcFFpeERRVUZETEVOQlFVTTdRVUZETTBJc1QwRkJUeXhEUVVGRExIZENRVUYzUWl4RFFVRkRMRU5CUVVNN1FVRkhiRU1zVDBGQlR5eERRVUZETERaQ1FVRTJRaXhEUVVGRExFTkJRVU03UVVGRGRrTXNUMEZCVHl4RFFVRkRMRFpDUVVFMlFpeERRVUZETEVOQlFVTTdRVUZEZGtNc1QwRkJUeXhEUVVGRExHZERRVUZuUXl4RFFVRkRMRU5CUVVNN1FVRkRNVU1zVDBGQlR5eERRVUZETEdkRFFVRm5ReXhEUVVGRExFTkJRVU1pZlE9PSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciByZXF1ZXN0ID0gcmVxdWlyZShcInN1cGVydGVzdFwiKTtcbnZhciBiY3J5cHRqc18xID0gcmVxdWlyZShcImJjcnlwdGpzXCIpO1xudmFyIF9fMSA9IHJlcXVpcmUoXCIuLi9cIik7XG52YXIgVXNlcl8xID0gcmVxdWlyZShcIi4uLy4uL3NyYy9zZXJ2ZXIvbW9kZWxzL1VzZXJcIik7XG52YXIgY2hhaV8xID0gcmVxdWlyZShcImNoYWlcIik7XG52YXIgc2Vzc2lvbiA9IHJlcXVpcmUoJ3N1cGVydGVzdC1zZXNzaW9uJyk7XG5kZXNjcmliZSgnQXV0aCBDb250cm9sbGVyJywgZnVuY3Rpb24gKCkge1xuICAgIGRlc2NyaWJlKCdQT1NUIC9hcGkvdjEvbG9naW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIF9fMS5kcm9wQWxsQ29sbGVjdGlvbnMoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdXNlciA9IG5ldyBVc2VyXzFbXCJkZWZhdWx0XCJdKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0FkcmlhbicsXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBiY3J5cHRqc18xLmhhc2hTeW5jKCd0ZXN0JyksXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6ICd1c2VyJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB1c2VyLnNhdmUoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7IHJldHVybiBkb25lKCk7IH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgbG9naW4gdGhlIHVzZXInLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL2xvZ2luJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICAgICAgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJ3Rlc3QnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwKVxuICAgICAgICAgICAgICAgIC5lbmQoZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgbG9nZ2VkLWluIHVzZXIgZGV0YWlscycsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgICAgICBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAndGVzdCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgyMDApXG4gICAgICAgICAgICAgICAgLmVuZChmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIHZhciBqc29uID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChqc29uLmVtYWlsLCAndGVzdEB0ZXN0LmNvbScpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwoanNvbi5yb2xlLCAndXNlcicpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwoanNvbi5uYW1lLCAnQWRyaWFuJyk7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBhbiBlcnJvciBpZiB0aGUgZW1haWwgZG9lcyBub3QgZXhpc3QnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL2xvZ2luJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICAgICAgZW1haWw6ICd0ZXN0LmRvZXMubm90LmV4aXRAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAndGVzdCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDEpXG4gICAgICAgICAgICAgICAgLmVuZChmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIHZhciBqc29uID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChqc29uLmVycm9yLCAnSW52YWxpZCBlbWFpbCBvciBwYXNzd29yZCcpO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYW4gZXJyb3IgaWYgdGhlIHBhc3N3b3JkIGRvZXMgbm90IG1hdGNoIHRoZSBoYXNoJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS9sb2dpbicpXG4gICAgICAgICAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgICAgIGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICd0ZXN0LWludmFsaWQtcGFzc3dvcmQnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAxKVxuICAgICAgICAgICAgICAgIC5lbmQoZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICB2YXIganNvbiA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwoanNvbi5lcnJvciwgJ0ludmFsaWQgZW1haWwgb3IgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGFuIGVycm9yIGlmIHRoZSBlbWFpbCBvciBwYXNzd29yZCBpcyBtaXNzaW5nJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS9sb2dpbicpXG4gICAgICAgICAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAndGVzdCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDApXG4gICAgICAgICAgICAgICAgLmVuZChmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIHZhciBqc29uID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChqc29uLmVycm9yLCAnUGxlYXNlIHN1cHBseSBhbiBlbWFpbCBhbmQgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL2xvZ2luJylcbiAgICAgICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nIH0pXG4gICAgICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwKVxuICAgICAgICAgICAgICAgICAgICAuZW5kKGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGpzb24gPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChqc29uLmVycm9yLCAnUGxlYXNlIHN1cHBseSBhbiBlbWFpbCBhbmQgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBhbiBlcnJvciBpZiB0aGUgZW1haWwgaXMgbm90IHZhbGlkJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcCkucG9zdCgnL2FwaS92MS9sb2dpbicpXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ25vdCBhbiBlbWFpbEBhc2RmJywgcGFzc3dvcmQ6ICcxMjM0JyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwKVxuICAgICAgICAgICAgICAgIC5lbmQoZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICB2YXIganNvbiA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwoanNvbi5lcnJvciwgJ05vdCBhIHZhbGlkIGVtYWlsIGFkZHJlc3MnKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ1BPU1QgL2FwaS92MS9yZWdpc3RlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgX18xLmRyb3BBbGxDb2xsZWN0aW9ucygpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9uZSgpOyB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmVnaXN0ZXIgYSB1c2VyJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcCkucG9zdCgnL2FwaS92MS9yZWdpc3RlcicpXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nLCBwYXNzd29yZDogJ3Rlc3QnIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgyMDApXG4gICAgICAgICAgICAgICAgLmVuZChmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIFVzZXJfMVtcImRlZmF1bHRcIl0uZmluZEJ5RW1haWwoJ3Rlc3RAdGVzdC5jb20nKS5leGVjKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZmFpbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgY3JlYXRlIGFuIGFkbWluIHVzZXIgaWYgbm8gdXNlcnMgZXhpc3QnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKS5wb3N0KCcvYXBpL3YxL3JlZ2lzdGVyJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsIHBhc3N3b3JkOiAndGVzdCcgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMClcbiAgICAgICAgICAgICAgICAuZW5kKGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgVXNlcl8xW1wiZGVmYXVsdFwiXS5maW5kQnlFbWFpbCgndGVzdEB0ZXN0LmNvbScpLmV4ZWMoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5mYWlsKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbCh1c2VyLnJvbGUsICdhZG1pbicpO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgY3JlYXRlIGEgcmVndWxhciB1c2VyIGlmIHVzZXJzIGV4aXN0JywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHZhciB1ID0gbmV3IFVzZXJfMVtcImRlZmF1bHRcIl0oe1xuICAgICAgICAgICAgICAgIG5hbWU6ICd0ZXN0JyxcbiAgICAgICAgICAgICAgICBlbWFpbDogJ2FkbWluQHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJ3Bhc3N3b3JkJyxcbiAgICAgICAgICAgICAgICByb2xlOiAnYWRtaW4nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHUuc2F2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcCkucG9zdCgnL2FwaS92MS9yZWdpc3RlcicpXG4gICAgICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICd0ZXN0QHRlc3QuY29tJywgcGFzc3dvcmQ6ICd0ZXN0JyB9KVxuICAgICAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMClcbiAgICAgICAgICAgICAgICAgICAgLmVuZChmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIFVzZXJfMVtcImRlZmF1bHRcIl0uZmluZEJ5RW1haWwoJ3Rlc3RAdGVzdC5jb20nKS5leGVjKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5mYWlsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKHVzZXIucm9sZSwgJ3VzZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYW4gZXJyb3IgaWYgZW1haWwgb3IgcGFzc3dvcmQgbm90IHByb3ZpZGVkJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcCkucG9zdCgnL2FwaS92MS9yZWdpc3RlcicpXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDApXG4gICAgICAgICAgICAgICAgLmVuZChmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIHZhciBqc29uID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChqc29uLmVycm9yLCAnUGxlYXNlIHN1cHBseSBhbiBlbWFpbCBhbmQgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApLnBvc3QoJy9hcGkvdjEvcmVnaXN0ZXInKVxuICAgICAgICAgICAgICAgICAgICAuc2VuZCh7IHBhc3N3b3JkOiAnMTIzJyB9KVxuICAgICAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMClcbiAgICAgICAgICAgICAgICAgICAgLmVuZChmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBqc29uID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwoanNvbi5lcnJvciwgJ1BsZWFzZSBzdXBwbHkgYW4gZW1haWwgYW5kIHBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYW4gZXJyb3IgaWYgbm90IGEgdmFsaWQgZW1haWwnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKS5wb3N0KCcvYXBpL3YxL3JlZ2lzdGVyJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAnbm90IGFuIGVtYWlsIEAgYXNkbGZrajtsJywgcGFzc3dvcmQ6ICcxMjM0JyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwKVxuICAgICAgICAgICAgICAgIC5lbmQoZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICB2YXIganNvbiA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwoanNvbi5lcnJvciwgJ05vdCBhIHZhbGlkIGVtYWlsIGFkZHJlc3MnKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ1BPU1QgL2FwaS92MS9sb2dvdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0ZXN0U2Vzc2lvbjtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdGVzdFNlc3Npb24gPSBzZXNzaW9uKF9fMS5hcHApO1xuICAgICAgICAgICAgX18xLmRyb3BBbGxDb2xsZWN0aW9ucygpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciB1c2VyID0gbmV3IFVzZXJfMVtcImRlZmF1bHRcIl0oe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnQWRyaWFuJyxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IGJjcnlwdGpzXzEuaGFzaFN5bmMoJ3Rlc3QnKSxcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogJ3VzZXInLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHVzZXIuc2F2ZSgpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHsgcmV0dXJuIGRvbmUoKTsgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBsb2cgb3V0IHRoZSB1c2VyJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHRlc3RTZXNzaW9uLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICd0ZXN0QHRlc3QuY29tJywgcGFzc3dvcmQ6ICd0ZXN0JyB9KS5lbmQoZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgdGVzdFNlc3Npb24uZ2V0KCcvYXBpL3YxL3VzZXInKS5zZW5kKCkuZXhwZWN0KDIwMCkuZW5kKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHRlc3RTZXNzaW9uLmdldCgnL2FwaS92MS9sb2dvdXQnKS5zZW5kKCkuZXhwZWN0KDIwMCkuZW5kKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlc3RTZXNzaW9uLmdldCgnL2FwaS92MS91c2VyJykuc2VuZCgpLmV4cGVjdCg0MDEpLmVuZChkb25lKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWRHVnpkRUYxZEdoRGIyNTBjbTlzYkdWeUxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZMaTR2ZEdWemRITXZjMlZ5ZG1WeUwzUmxjM1JCZFhSb1EyOXVkSEp2Ykd4bGNpNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenRCUVVGQkxHMURRVUZ4UXp0QlFVTnlReXh4UTBGQmIwTTdRVUZEY0VNc2VVSkJRVGhETzBGQlF6bERMSEZFUVVFeVJEdEJRVU16UkN3MlFrRkJPRUk3UVVGRk9VSXNTVUZCVFN4UFFVRlBMRWRCUVVjc1QwRkJUeXhEUVVGRExHMUNRVUZ0UWl4RFFVRkRMRU5CUVVNN1FVRkZOME1zVVVGQlVTeERRVUZETEdsQ1FVRnBRaXhGUVVGRk8wbEJRM2hDTEZGQlFWRXNRMEZCUXl4dlFrRkJiMElzUlVGQlJUdFJRVU16UWl4VlFVRlZMRU5CUVVNc1ZVRkJWU3hKUVVGSk8xbEJRM0pDTEhOQ1FVRnJRaXhGUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETzJkQ1FVTjBRaXhKUVVGSkxFbEJRVWtzUjBGQlZTeEpRVUZKTEdsQ1FVRkpMRU5CUVVNN2IwSkJRM1pDTEVsQlFVa3NSVUZCUlN4UlFVRlJPMjlDUVVOa0xFdEJRVXNzUlVGQlJTeGxRVUZsTzI5Q1FVTjBRaXhSUVVGUkxFVkJRVVVzYlVKQlFWRXNRMEZCUXl4TlFVRk5MRU5CUVVNN2IwSkJRekZDTEVsQlFVa3NSVUZCUlN4TlFVRk5PMmxDUVVObUxFTkJRVU1zUTBGQlF6dG5Ra0ZEU0N4SlFVRkpMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFVTXNTVUZCVnl4SlFVRkxMRTlCUVVFc1NVRkJTU3hGUVVGRkxFVkJRVTRzUTBGQlRTeERRVUZETEVOQlFVTXNUMEZCU3l4RFFVRkJMRU5CUVVNc1ZVRkJReXhIUVVGUk8yOUNRVU55UkN4TlFVRk5MRWRCUVVjc1EwRkJRenRuUWtGRFpDeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTlFMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMUFzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4RlFVRkZMRU5CUVVNc2RVSkJRWFZDTEVWQlFVVXNWVUZCVXl4SlFVRkpPMWxCUTNKRExFOUJRVThzUTBGQlF5eFBRVUZITEVOQlFVTTdhVUpCUTFBc1NVRkJTU3hEUVVGRExHVkJRV1VzUTBGQlF6dHBRa0ZEY2tJc1NVRkJTU3hEUVVGRE8yZENRVU5HTEV0QlFVc3NSVUZCUlN4bFFVRmxPMmRDUVVOMFFpeFJRVUZSTEVWQlFVVXNUVUZCVFR0aFFVTnVRaXhEUVVGRE8ybENRVU5FTEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNN2FVSkJRMWdzUjBGQlJ5eERRVUZETEZWQlFVTXNSMEZCVVR0blFrRkRWaXhKUVVGSkxFZEJRVWM3YjBKQlEwZ3NUMEZCVHl4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU03WjBKQlEzSkNMRWxCUVVrc1JVRkJSU3hEUVVGRE8xbEJRMWdzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEV0N4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5d3dRMEZCTUVNc1JVRkJSU3hWUVVGVExFbEJRVWs3V1VGRGVFUXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJRenRwUWtGRFVDeEpRVUZKTEVOQlFVTXNaVUZCWlN4RFFVRkRPMmxDUVVOeVFpeEpRVUZKTEVOQlFVTTdaMEpCUTBZc1MwRkJTeXhGUVVGRkxHVkJRV1U3WjBKQlEzUkNMRkZCUVZFc1JVRkJSU3hOUVVGTk8yRkJRMjVDTEVOQlFVTTdhVUpCUTBRc1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF6dHBRa0ZEV0N4SFFVRkhMRU5CUVVNc1ZVRkJReXhIUVVGUkxFVkJRVVVzUjBGQmNVSTdaMEpCUTJwRExFbEJRVWtzUjBGQlJ6dHZRa0ZEU0N4UFFVRlBMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dG5Ra0ZEY2tJc1NVRkJTU3hKUVVGSkxFZEJRVkVzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03WjBKQlEzSkRMR0ZCUVUwc1EwRkJReXhYUVVGWExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NSVUZCUlN4bFFVRmxMRU5CUVVNc1EwRkJRenRuUWtGRGFFUXNZVUZCVFN4RFFVRkRMRmRCUVZjc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEZRVUZGTEUxQlFVMHNRMEZCUXl4RFFVRkRPMmRDUVVOMFF5eGhRVUZOTEVOQlFVTXNWMEZCVnl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFVkJRVVVzVVVGQlVTeERRVUZETEVOQlFVTTdaMEpCUTNoRExFbEJRVWtzUlVGQlJTeERRVUZETzFsQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRXQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl4dlJFRkJiMFFzUlVGQlJTeFZRVUZUTEVsQlFVazdXVUZEYkVVc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF6dHBRa0ZEVUN4SlFVRkpMRU5CUVVNc1pVRkJaU3hEUVVGRE8ybENRVU55UWl4SlFVRkpMRU5CUVVNN1owSkJRMFlzUzBGQlN5eEZRVUZGTERaQ1FVRTJRanRuUWtGRGNFTXNVVUZCVVN4RlFVRkZMRTFCUVUwN1lVRkRia0lzUTBGQlF6dHBRa0ZEUkN4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRE8ybENRVU5ZTEVkQlFVY3NRMEZCUXl4VlFVRkRMRWRCUVZFc1JVRkJSU3hIUVVGeFFqdG5Ra0ZEYWtNc1NVRkJTU3hIUVVGSE8yOUNRVU5JTEU5QlFVOHNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8yZENRVU55UWl4SlFVRkpMRWxCUVVrc1IwRkJVU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRuUWtGRGNrTXNZVUZCVFN4RFFVRkRMRmRCUVZjc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eEZRVUZGTERKQ1FVRXlRaXhEUVVGRExFTkJRVU03WjBKQlF6VkVMRWxCUVVrc1JVRkJSU3hEUVVGRE8xbEJRMWdzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEV0N4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5eG5SVUZCWjBVc1JVRkJSU3hWUVVGVExFbEJRVWs3V1VGRE9VVXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJRenRwUWtGRFVDeEpRVUZKTEVOQlFVTXNaVUZCWlN4RFFVRkRPMmxDUVVOeVFpeEpRVUZKTEVOQlFVTTdaMEpCUTBZc1MwRkJTeXhGUVVGRkxHVkJRV1U3WjBKQlEzUkNMRkZCUVZFc1JVRkJSU3gxUWtGQmRVSTdZVUZEY0VNc1EwRkJRenRwUWtGRFJDeE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRPMmxDUVVOWUxFZEJRVWNzUTBGQlF5eFZRVUZETEVkQlFWRXNSVUZCUlN4SFFVRnhRanRuUWtGRGFrTXNTVUZCU1N4SFFVRkhPMjlDUVVOSUxFOUJRVThzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMmRDUVVOeVFpeEpRVUZKTEVsQlFVa3NSMEZCVVN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0blFrRkRja01zWVVGQlRTeERRVUZETEZkQlFWY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhGUVVGRkxESkNRVUV5UWl4RFFVRkRMRU5CUVVNN1owSkJRelZFTEVsQlFVa3NSVUZCUlN4RFFVRkRPMWxCUTFnc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFdDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXcwUkVGQk5FUXNSVUZCUlN4VlFVRlRMRWxCUVVrN1dVRkRNVVVzVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXp0cFFrRkRVQ3hKUVVGSkxFTkJRVU1zWlVGQlpTeERRVUZETzJsQ1FVTnlRaXhKUVVGSkxFTkJRVU03WjBKQlEwWXNVVUZCVVN4RlFVRkZMRTFCUVUwN1lVRkRia0lzUTBGQlF6dHBRa0ZEUkN4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRE8ybENRVU5ZTEVkQlFVY3NRMEZCUXl4VlFVRkRMRWRCUVZFc1JVRkJSU3hIUVVGeFFqdG5Ra0ZEYWtNc1NVRkJTU3hIUVVGSE8yOUNRVU5JTEU5QlFVOHNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8yZENRVU55UWl4SlFVRkpMRWxCUVVrc1IwRkJVU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRuUWtGRGNrTXNZVUZCVFN4RFFVRkRMRmRCUVZjc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eEZRVUZGTEhGRFFVRnhReXhEUVVGRExFTkJRVU03WjBKQlEzUkZMRTlCUVU4c1EwRkJReXhQUVVGSExFTkJRVU03Y1VKQlExQXNTVUZCU1N4RFFVRkRMR1ZCUVdVc1EwRkJRenR4UWtGRGNrSXNTVUZCU1N4RFFVRkRMRVZCUVVNc1MwRkJTeXhGUVVGRkxHVkJRV1VzUlVGQlF5eERRVUZETzNGQ1FVTTVRaXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETzNGQ1FVTllMRWRCUVVjc1EwRkJReXhWUVVGRExFZEJRVkVzUlVGQlJTeEhRVUZ4UWp0dlFrRkRha01zU1VGQlNTeEhRVUZITzNkQ1FVTklMRTlCUVU4c1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzI5Q1FVTnlRaXhKUVVGSkxFbEJRVWtzUjBGQlVTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dHZRa0ZEY2tNc1lVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RlFVRkZMSEZEUVVGeFF5eERRVUZETEVOQlFVTTdiMEpCUTNSRkxFbEJRVWtzUlVGQlJTeERRVUZETzJkQ1FVTllMRU5CUVVNc1EwRkJReXhEUVVGQk8xbEJRMVlzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEV0N4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5eHJSRUZCYTBRc1JVRkJSU3hWUVVGVExFbEJRVWs3V1VGRGFFVXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eGxRVUZsTEVOQlFVTTdhVUpCUXpkQ0xFbEJRVWtzUTBGQlF5eEZRVUZETEV0QlFVc3NSVUZCUlN4dFFrRkJiVUlzUlVGQlJTeFJRVUZSTEVWQlFVVXNUVUZCVFN4RlFVRkRMRU5CUVVNN2FVSkJRM0JFTEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNN2FVSkJRMWdzUjBGQlJ5eERRVUZETEZWQlFVTXNSMEZCVVN4RlFVRkZMRWRCUVhGQ08yZENRVU5xUXl4SlFVRkpMRWRCUVVjN2IwSkJRMGdzVDBGQlR5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1owSkJRM0pDTEVsQlFVa3NTVUZCU1N4SFFVRlJMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMmRDUVVOeVF5eGhRVUZOTEVOQlFVTXNWMEZCVnl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFVkJRVVVzTWtKQlFUSkNMRU5CUVVNc1EwRkJRenRuUWtGRE5VUXNTVUZCU1N4RlFVRkZMRU5CUVVNN1dVRkRXQ3hEUVVGRExFTkJRVU1zUTBGQlFUdFJRVU5XTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTFBc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFNDeFJRVUZSTEVOQlFVTXNkVUpCUVhWQ0xFVkJRVVU3VVVGRE9VSXNWVUZCVlN4RFFVRkRMRlZCUVZVc1NVRkJTVHRaUVVOeVFpeHpRa0ZCYTBJc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eGpRVUZOTEU5QlFVRXNTVUZCU1N4RlFVRkZMRVZCUVU0c1EwRkJUU3hEUVVGRExFTkJRVU03VVVGRE5VTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hGUVVGRkxFTkJRVU1zZDBKQlFYZENMRVZCUVVVc1ZVRkJVeXhKUVVGSk8xbEJRM1JETEU5QlFVOHNRMEZCUXl4UFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zYTBKQlFXdENMRU5CUVVNN2FVSkJRMmhETEVsQlFVa3NRMEZCUXl4RlFVRkRMRXRCUVVzc1JVRkJSU3hsUVVGbExFVkJRVVVzVVVGQlVTeEZRVUZGTEUxQlFVMHNSVUZCUXl4RFFVRkRPMmxDUVVOb1JDeE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRPMmxDUVVOWUxFZEJRVWNzUTBGQlF5eFZRVUZETEVkQlFWRXNSVUZCUlN4SFFVRnhRanRuUWtGRGFrTXNTVUZCUnl4SFFVRkhPMjlDUVVGRkxFOUJRVThzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMmRDUVVONlFpeHBRa0ZCU1N4RFFVRkRMRmRCUVZjc1EwRkJReXhsUVVGbExFTkJRVU1zUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJReXhKUVVGWE8yOUNRVU4wUkN4SlFVRkpMRU5CUVVNc1NVRkJTU3hGUVVGRk8zZENRVU5RTEdGQlFVMHNRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJRenQzUWtGRFpDeFBRVUZQTEVsQlFVa3NSVUZCUlN4RFFVRkRPM0ZDUVVOcVFqdHZRa0ZEUkN4SlFVRkpMRVZCUVVVc1EwRkJRenRuUWtGRFdDeERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRkxMRU5CUVVFc1EwRkJReXhWUVVGRExFZEJRVkU3YjBKQlEyUXNUMEZCVHl4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU03WjBKQlEzSkNMRU5CUVVNc1EwRkJReXhEUVVGQk8xbEJRMDRzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEV0N4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5d3JRMEZCSzBNc1JVRkJSU3hWUVVGVkxFbEJRVWs3V1VGRE9VUXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eHJRa0ZCYTBJc1EwRkJRenRwUWtGRGFFTXNTVUZCU1N4RFFVRkRMRVZCUVVVc1MwRkJTeXhGUVVGRkxHVkJRV1VzUlVGQlJTeFJRVUZSTEVWQlFVVXNUVUZCVFN4RlFVRkZMRU5CUVVNN2FVSkJRMnhFTEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNN2FVSkJRMWdzUjBGQlJ5eERRVUZETEZWQlFVTXNSMEZCVVN4RlFVRkZMRWRCUVhGQ08yZENRVU5xUXl4SlFVRkpMRWRCUVVjN2IwSkJRVVVzVDBGQlR5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1owSkJRekZDTEdsQ1FVRkpMRU5CUVVNc1YwRkJWeXhEUVVGRExHVkJRV1VzUTBGQlF5eERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGRExFbEJRVmM3YjBKQlEzUkVMRWxCUVVrc1EwRkJReXhKUVVGSkxFVkJRVVU3ZDBKQlExQXNZVUZCVFN4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRE8zRkNRVU5xUWp0dlFrRkRSQ3hoUVVGTkxFTkJRVU1zVjBGQlZ5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRVZCUVVVc1QwRkJUeXhEUVVGRExFTkJRVU03YjBKQlEzWkRMRWxCUVVrc1JVRkJSU3hEUVVGRE8yZENRVU5ZTEVOQlFVTXNRMEZCUXl4RFFVRkRMRTlCUVVzc1EwRkJRU3hEUVVGRExGVkJRVU1zUjBGQlVUdHZRa0ZEWkN4UFFVRlBMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dG5Ra0ZEY2tJc1EwRkJReXhEUVVGRExFTkJRVUU3V1VGRFRpeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTllMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzUlVGQlJTeERRVUZETERaRFFVRTJReXhGUVVGRkxGVkJRVk1zU1VGQlNUdFpRVU16UkN4SlFVRkpMRU5CUVVNc1IwRkJSeXhKUVVGSkxHbENRVUZKTEVOQlFVTTdaMEpCUTJJc1NVRkJTU3hGUVVGRkxFMUJRVTA3WjBKQlExb3NTMEZCU3l4RlFVRkZMR2RDUVVGblFqdG5Ra0ZEZGtJc1VVRkJVU3hGUVVGRkxGVkJRVlU3WjBKQlEzQkNMRWxCUVVrc1JVRkJSU3hQUVVGUE8yRkJRMmhDTEVOQlFVTXNRMEZCUVR0WlFVTkdMRU5CUVVNc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTTdaMEpCUTFZc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4clFrRkJhMElzUTBGQlF6dHhRa0ZEYUVNc1NVRkJTU3hEUVVGRExFVkJRVVVzUzBGQlN5eEZRVUZGTEdWQlFXVXNSVUZCUlN4UlFVRlJMRVZCUVVVc1RVRkJUU3hGUVVGRkxFTkJRVU03Y1VKQlEyeEVMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU03Y1VKQlExZ3NSMEZCUnl4RFFVRkRMRlZCUVVNc1IwRkJVU3hGUVVGRkxFZEJRWEZDTzI5Q1FVTnFReXhKUVVGSkxFZEJRVWM3ZDBKQlFVVXNUMEZCVHl4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU03YjBKQlF6RkNMR2xDUVVGSkxFTkJRVU1zVjBGQlZ5eERRVUZETEdWQlFXVXNRMEZCUXl4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZETEVsQlFWYzdkMEpCUTNSRUxFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVTdORUpCUTFBc1lVRkJUU3hEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETzNsQ1FVTnFRanQzUWtGRFJDeGhRVUZOTEVOQlFVTXNWMEZCVnl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFVkJRVVVzVFVGQlRTeERRVUZETEVOQlFVTTdkMEpCUTNSRExFbEJRVWtzUlVGQlJTeERRVUZETzI5Q1FVTllMRU5CUVVNc1EwRkJReXhEUVVGRExFOUJRVXNzUTBGQlFTeERRVUZETEZWQlFVTXNSMEZCVVR0M1FrRkRaQ3hQUVVGUExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0dlFrRkRja0lzUTBGQlF5eERRVUZETEVOQlFVRTdaMEpCUTA0c1EwRkJReXhEUVVGRExFTkJRVU03V1VGRFdDeERRVUZETEVOQlFVTXNRMEZCUVR0UlFVTk9MRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzUlVGQlJTeERRVUZETERCRVFVRXdSQ3hGUVVGRkxGVkJRVk1zU1VGQlNUdFpRVU40UlN4UFFVRlBMRU5CUVVNc1QwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEd0Q1FVRnJRaXhEUVVGRE8ybENRVU5vUXl4SlFVRkpMRU5CUVVNc1JVRkJSU3hMUVVGTExFVkJRVVVzWlVGQlpTeEZRVUZGTEVOQlFVTTdhVUpCUTJoRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTTdhVUpCUTFnc1IwRkJSeXhEUVVGRExGVkJRVU1zUjBGQlVTeEZRVUZGTEVkQlFYRkNPMmRDUVVOcVF5eEpRVUZKTEVkQlFVYzdiMEpCUVVVc1QwRkJUeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTTdaMEpCUXpGQ0xFbEJRVWtzU1VGQlNTeEhRVUZSTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzJkQ1FVTnlReXhoUVVGTkxFTkJRVU1zVjBGQlZ5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRVZCUVVVc2NVTkJRWEZETEVOQlFVTXNRMEZCUXp0blFrRkRkRVVzVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhyUWtGQmEwSXNRMEZCUXp0eFFrRkRhRU1zU1VGQlNTeERRVUZETEVWQlFVTXNVVUZCVVN4RlFVRkZMRXRCUVVzc1JVRkJReXhEUVVGRE8zRkNRVU4yUWl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRE8zRkNRVU5ZTEVkQlFVY3NRMEZCUXl4VlFVRkRMRWRCUVZFc1JVRkJSU3hIUVVGeFFqdHZRa0ZEYWtNc1NVRkJSeXhIUVVGSE8zZENRVUZGTEU5QlFVOHNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8yOUNRVU42UWl4SlFVRkpMRWxCUVVrc1IwRkJVU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenR2UWtGRGNrTXNZVUZCVFN4RFFVRkRMRmRCUVZjc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eEZRVUZGTEhGRFFVRnhReXhEUVVGRExFTkJRVU03YjBKQlEzUkZMRWxCUVVrc1JVRkJSU3hEUVVGRE8yZENRVU5ZTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTFnc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFdDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXcyUTBGQk5rTXNSVUZCUlN4VlFVRlRMRWxCUVVrN1dVRkRNMFFzVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhyUWtGQmEwSXNRMEZCUXp0cFFrRkRhRU1zU1VGQlNTeERRVUZETEVWQlFVTXNTMEZCU3l4RlFVRkZMREJDUVVFd1FpeEZRVUZGTEZGQlFWRXNSVUZCUlN4TlFVRk5MRVZCUVVNc1EwRkJRenRwUWtGRE0wUXNUVUZCVFN4RFFVRkRMRWRCUVVjc1EwRkJRenRwUWtGRFdDeEhRVUZITEVOQlFVTXNWVUZCUXl4SFFVRlJMRVZCUVVVc1IwRkJjVUk3WjBKQlEycERMRWxCUVVrc1IwRkJSenR2UWtGQlJTeFBRVUZQTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRuUWtGRE1VSXNTVUZCU1N4SlFVRkpMRWRCUVZFc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1owSkJRM0pETEdGQlFVMHNRMEZCUXl4WFFVRlhMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUlVGQlJTd3lRa0ZCTWtJc1EwRkJReXhEUVVGRE8yZENRVU0xUkN4SlFVRkpMRVZCUVVVc1EwRkJRenRaUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5JTEZGQlFWRXNRMEZCUXl4eFFrRkJjVUlzUlVGQlJUdFJRVU0xUWl4SlFVRkpMRmRCUVdkQ0xFTkJRVU03VVVGRGNrSXNWVUZCVlN4RFFVRkRMRlZCUVZVc1NVRkJTVHRaUVVOeVFpeFhRVUZYTEVkQlFVY3NUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJReXhEUVVGRE8xbEJRek5DTEhOQ1FVRnJRaXhGUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETzJkQ1FVTjBRaXhKUVVGSkxFbEJRVWtzUjBGQlZTeEpRVUZKTEdsQ1FVRkpMRU5CUVVNN2IwSkJRM1pDTEVsQlFVa3NSVUZCUlN4UlFVRlJPMjlDUVVOa0xFdEJRVXNzUlVGQlJTeGxRVUZsTzI5Q1FVTjBRaXhSUVVGUkxFVkJRVVVzYlVKQlFWRXNRMEZCUXl4TlFVRk5MRU5CUVVNN2IwSkJRekZDTEVsQlFVa3NSVUZCUlN4TlFVRk5PMmxDUVVObUxFTkJRVU1zUTBGQlF6dG5Ra0ZEU0N4SlFVRkpMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFVTXNTVUZCVnl4SlFVRkxMRTlCUVVFc1NVRkJTU3hGUVVGRkxFVkJRVTRzUTBGQlRTeERRVUZETEVOQlFVTXNUMEZCU3l4RFFVRkJMRU5CUVVNc1ZVRkJReXhIUVVGUk8yOUNRVU55UkN4TlFVRk5MRWRCUVVjc1EwRkJRenRuUWtGRFpDeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTlFMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMUFzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4RlFVRkZMRU5CUVVNc2VVSkJRWGxDTEVWQlFVVXNWVUZCVXl4SlFVRkpPMWxCUTNaRExGZEJRVmNzUTBGQlF5eEpRVUZKTEVOQlFVTXNaVUZCWlN4RFFVRkRPMmxDUVVNMVFpeEpRVUZKTEVOQlFVTXNSVUZCUXl4TFFVRkxMRVZCUVVVc1pVRkJaU3hGUVVGRkxGRkJRVkVzUlVGQlJTeE5RVUZOTEVWQlFVTXNRMEZCUXl4RFFVRkRMRWRCUVVjc1EwRkJReXhWUVVGRExFZEJRVkU3WjBKQlF6TkVMRWxCUVVrc1IwRkJSenR2UWtGQlJTeFBRVUZQTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRuUWtGRE1VSXNWMEZCVnl4RFFVRkRMRWRCUVVjc1EwRkJReXhqUVVGakxFTkJRVU1zUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEZWQlFVTXNSMEZCVVR0dlFrRkROVVFzU1VGQlNTeEhRVUZITzNkQ1FVRkZMRTlCUVU4c1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzI5Q1FVTXhRaXhYUVVGWExFTkJRVU1zUjBGQlJ5eERRVUZETEdkQ1FVRm5RaXhEUVVGRExFTkJRVU1zU1VGQlNTeEZRVUZGTEVOQlFVTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFZEJRVWNzUTBGQlF5eFZRVUZETEVkQlFWRTdkMEpCUXpsRUxFbEJRVWtzUjBGQlJ6czBRa0ZCUlN4UFFVRlBMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dDNRa0ZETVVJc1YwRkJWeXhEUVVGRExFZEJRVWNzUTBGQlF5eGpRVUZqTEVOQlFVTXNRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8yOUNRVU5xUlN4RFFVRkRMRU5CUVVNc1EwRkJRVHRuUWtGRFRpeERRVUZETEVOQlFVTXNRMEZCUVR0WlFVTk9MRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMWdzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenRCUVZGUUxFTkJRVU1zUTBGQlF5eERRVUZESW4wPSIsIi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWRHVnpkRU5vWVc1dVpXeERiMjUwY205c2JHVnlMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dmRHVnpkSE12YzJWeWRtVnlMM1JsYzNSRGFHRnVibVZzUTI5dWRISnZiR3hsY2k1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaUluMD0iLCIvLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lkR1Z6ZEUxbGMzTmhaMlZEYjI1MGNtOXNiR1Z5TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dkxpNHZkR1Z6ZEhNdmMyVnlkbVZ5TDNSbGMzUk5aWE56WVdkbFEyOXVkSEp2Ykd4bGNpNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lJbjA9IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIHJlcXVlc3QgPSByZXF1aXJlKFwic3VwZXJ0ZXN0XCIpO1xudmFyIGJjcnlwdGpzXzEgPSByZXF1aXJlKFwiYmNyeXB0anNcIik7XG52YXIgY2hhaV8xID0gcmVxdWlyZShcImNoYWlcIik7XG52YXIgX18xID0gcmVxdWlyZShcIi4uL1wiKTtcbnZhciBVc2VyXzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL3NlcnZlci9tb2RlbHMvVXNlclwiKTtcbmRlc2NyaWJlKCdVc2VyIENvbnRyb2xsZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRva2VuO1xuICAgIHZhciB1c2VySW5mbyA9IHtcbiAgICAgICAgbmFtZTogJ0FkcmlhbicsXG4gICAgICAgIGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgIHBhc3N3b3JkOiAndGVzdCcsXG4gICAgICAgIHJvbGU6ICdhZG1pbidcbiAgICB9O1xuICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgX18xLmRyb3BBbGxDb2xsZWN0aW9ucygpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHVzZXIgPSBuZXcgVXNlcl8xW1wiZGVmYXVsdFwiXSh7XG4gICAgICAgICAgICAgICAgbmFtZTogdXNlckluZm8ubmFtZSxcbiAgICAgICAgICAgICAgICBlbWFpbDogdXNlckluZm8uZW1haWwsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IGJjcnlwdGpzXzEuaGFzaFN5bmModXNlckluZm8ucGFzc3dvcmQpLFxuICAgICAgICAgICAgICAgIHJvbGU6IHVzZXJJbmZvLnJvbGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHVzZXIuc2F2ZSgpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL2xvZ2luJylcbiAgICAgICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogdXNlckluZm8uZW1haWwsIHBhc3N3b3JkOiB1c2VySW5mby5wYXNzd29yZCB9KVxuICAgICAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMClcbiAgICAgICAgICAgICAgICAgICAgLmVuZChmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSByZXMuZ2V0KCd4LWFjY2Vzcy10b2tlbicpO1xuICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzTm90TnVsbCh0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNTdHJpbmcodG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzTm90RW1wdHkodG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ0dFVCAvYXBpL3YxL3VzZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGl0KCdzaG91bGQgZmV0Y2ggdGhlIGxvZ2dlZCBpbiB1c2VyJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAuZ2V0KCcvYXBpL3YxL3VzZXInKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgyMDAsIGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChyZXMuYm9keS5uYW1lLCB1c2VySW5mby5uYW1lKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKHJlcy5ib2R5LmVtYWlsLCB1c2VySW5mby5lbWFpbCk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChyZXMuYm9keS5yb2xlLCB1c2VySW5mby5yb2xlKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0Lm5vdFByb3BlcnR5KHJlcy5ib2R5LCAncGFzc3dvcmQnKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiBub3QgbG9nZ2VkIGluJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAuZ2V0KCcvYXBpL3YxL3VzZXInKVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAxLCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ0dFVCAvYXBpL3YxL3VzZXJzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpdCgnc2hvdWxkIHJlY2VpdmUgYSBsaXN0IG9mIHVzZXJzJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAuZ2V0KCcvYXBpL3YxL3VzZXJzJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwLCBmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKHJlcy5ib2R5LnVzZXJzLmxlbmd0aCwgMSk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pbmNsdWRlKHJlcy5ib2R5LnVzZXJzWzBdLCB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHVzZXJJbmZvLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IHVzZXJJbmZvLnJvbGUsXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VySW5mby5lbWFpbFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQubm90UHJvcGVydHkocmVzLmJvZHkudXNlcnNbMF0sICdwYXNzd29yZCcpO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIG5vdCBsb2dnZWQgaW4nLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5nZXQoJy9hcGkvdjEvdXNlcnMnKVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAxLCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ0dFVCAvYXBpL3YxL3VzZXIvOmVtYWlsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpdCgnc2hvdWxkIHJldHJpZXZlIGEgdXNlciBieSBlbWFpbCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLmdldCgnL2FwaS92MS91c2VyLycgKyB1c2VySW5mby5lbWFpbClcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwLCBmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0Lmhhc0FsbEtleXMocmVzLmJvZHkudXNlciwgWydlbWFpbCcsICduYW1lJywgJ3JvbGUnLCAnX2lkJywgJ2NyZWF0ZWQnXSk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pbmNsdWRlKHJlcy5ib2R5LnVzZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IHVzZXJJbmZvLmVtYWlsLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB1c2VySW5mby5uYW1lLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiB1c2VySW5mby5yb2xlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIGVtYWlsIGRvZXMgbm90IGV4aXN0JywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAuZ2V0KCcvYXBpL3YxL3VzZXIvbm90LmluLnVzZUB0ZXN0LmNvbScpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMCwgZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc1N0cmluZyhyZXMuYm9keS5lcnJvcik7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChyZXMuYm9keS5lcnJvciwgJ05vIHVzZXIgZm91bmQgd2l0aCB0aGF0IGVtYWlsJyk7XG4gICAgICAgICAgICAgICAgZG9uZShlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgbm90IGEgdmFsaWQgZW1haWwnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5nZXQoJy9hcGkvdjEvdXNlci9ub3QtYW4tZW1haWwnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDAsIGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNTdHJpbmcocmVzLmJvZHkuZXJyb3IpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwocmVzLmJvZHkuZXJyb3IsICdQbGVhc2Ugc3VwcGx5IGEgdmFsaWQgZW1haWwnKTtcbiAgICAgICAgICAgICAgICBkb25lKGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ1BPU1QgL2FwaS92MS91c2VyL3VwZGF0ZS9lbWFpbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaXQoXCJzaG91bGQgdXBkYXRlIHRoZSBsb2dnZWQgaW4gdXNlcidzIGVtYWlsXCIsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICB2YXIgbmV3RW1haWwgPSAnbmV3LmVtYWlsQHRlc3QuY29tJztcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9lbWFpbCcpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiBuZXdFbWFpbCB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwLCBmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAgICAgLmdldCgnL2FwaS92MS91c2VyJylcbiAgICAgICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCByZXMuZ2V0KCd4LWFjY2Vzcy10b2tlbicpKVxuICAgICAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMCwgZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwocmVzLmJvZHkubmFtZSwgdXNlckluZm8ubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwocmVzLmJvZHkuZW1haWwsIG5ld0VtYWlsKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChyZXMuYm9keS5yb2xlLCB1c2VySW5mby5yb2xlKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgbmV3IGVtYWlsIGlzIG5vdCB2YWxpZCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvZW1haWwnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ25vdCBhbiBlbWFpbCcgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMCwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgZW1haWwgYWxyZWFkeSBpbiB1c2UnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL2VtYWlsJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwLCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiBub3QgYXV0aG9yaXplZCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvZW1haWwnKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAxLCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ1BPU1QgL2FwaS92MS91c2VyL3VwZGF0ZS9uYW1lJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpdCgnc2hvdWxkIHVwZGF0ZSBuYW1lJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHZhciBuZXdOYW1lID0gJ25ldyBuYW1lJztcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9uYW1lJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgbmFtZTogbmV3TmFtZSB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwLCBmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoJy9hcGkvdjEvdXNlcicpXG4gICAgICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgcmVzLmdldCgneC1hY2Nlc3MtdG9rZW4nKSlcbiAgICAgICAgICAgICAgICAgICAgLmV4cGVjdCgyMDAsIGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKHJlcy5ib2R5Lm5hbWUsIG5ld05hbWUpO1xuICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKHJlcy5ib2R5LmVtYWlsLCB1c2VySW5mby5lbWFpbCk7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwocmVzLmJvZHkucm9sZSwgdXNlckluZm8ucm9sZSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIG5vdCBhdXRob3JpemVkJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHZhciBuZXdOYW1lID0gJ25ldyBuYW1lJztcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9uYW1lJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7IG5hbWU6IG5ld05hbWUgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMSwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdQT1NUIC9hcGkvdjEvdXNlci91cGRhdGUvcGFzc3dvcmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGl0KCdzaG91bGQgdXBkYXRlIHBhc3N3b3JkJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHZhciBuZXdQYXNzID0gJ25ld3Bhc3MnO1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL3Bhc3N3b3JkJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgb2xkUGFzczogdXNlckluZm8ucGFzc3dvcmQsIG5ld1Bhc3M6IG5ld1Bhc3MgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMCwgZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL2xvZ2luJylcbiAgICAgICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogdXNlckluZm8uZW1haWwsIHBhc3N3b3JkOiBuZXdQYXNzIH0pXG4gICAgICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwLCBkb25lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIHVwZGF0aW5nIHBhc3N3b3JkIGlmIGN1cnJlbnQgcGFzc3dvcmQgaW52YWxpZCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvcGFzc3dvcmQnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBvbGRQYXNzOiAnd3JvbmcgcGFzc3dvcmQnLCBuZXdQYXNzOiAnMTIzNDEyMzQnIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDAsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIHVwZGF0aW5nIHBhc3N3b3JkIGlmIG5vdCBhdXRob3JpemVkJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9wYXNzd29yZCcpXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDEsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnUE9TVCAvYXBpL3YxL3VzZXIvY3JlYXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbmV3VXNlciA9IHtcbiAgICAgICAgICAgIGVtYWlsOiAndGVzdDEyM0B0ZXN0LmNvbScsXG4gICAgICAgICAgICBuYW1lOiAnTmV3IFVzZXInLFxuICAgICAgICAgICAgcm9sZTogJ3VzZXInLFxuICAgICAgICB9O1xuICAgICAgICBpdCgnc2hvdWxkIGNyZWF0ZSBhIG5ldyB1c2VyJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIFVzZXJfMVtcImRlZmF1bHRcIl0uZmluZEJ5RW1haWwobmV3VXNlci5lbWFpbCkuY291bnREb2N1bWVudHMoZnVuY3Rpb24gKGVyciwgY291bnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwoY291bnQsIDAsICdVc2VyIHNob3VsZCBub3QgZXhpc3Qgd2l0aCBlbWFpbCB0ZXN0MTIzV3Rlc3QuY29tJyk7XG4gICAgICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL2NyZWF0ZScpXG4gICAgICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgICAgIC5zZW5kKG5ld1VzZXIpXG4gICAgICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwLCBmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIFVzZXJfMVtcImRlZmF1bHRcIl0uZmluZEJ5RW1haWwobmV3VXNlci5lbWFpbCkuZXhlYyhmdW5jdGlvbiAoZXJyLCB1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBJbmNsdWRlKHVzZXIsIG5ld1VzZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIHVzZXIgbWFraW5nIHJlcXVlc3QgaXMgbm90IGFuIGFkbWluJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHZhciB1c2VyID0gbmV3IFVzZXJfMVtcImRlZmF1bHRcIl0oe1xuICAgICAgICAgICAgICAgIG5hbWU6IG5ld1VzZXIubmFtZSxcbiAgICAgICAgICAgICAgICBlbWFpbDogbmV3VXNlci5lbWFpbCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogYmNyeXB0anNfMS5oYXNoU3luYygncGFzc3dvcmQnKSxcbiAgICAgICAgICAgICAgICByb2xlOiBuZXdVc2VyLnJvbGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHVzZXIuc2F2ZSgpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL2xvZ2luJylcbiAgICAgICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogbmV3VXNlci5lbWFpbCwgcGFzc3dvcmQ6ICdwYXNzd29yZCcgfSlcbiAgICAgICAgICAgICAgICAgICAgLmV4cGVjdCgyMDApXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gcmVzLmdldCgneC1hY2Nlc3MtdG9rZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvdXNlci9jcmVhdGUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5leHBlY3QoNDAxLCBkb25lKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIHVzZXIgaXMgbm90IGxvZ2dlZCBpbicsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvdXNlci9jcmVhdGUnKVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAxLCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiBlbWFpbCBpcyBub3QgdmFsaWQnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL3VzZXIvY3JlYXRlJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgICAgICBlbWFpbDogJ25vdCB2YWxpZCcsXG4gICAgICAgICAgICAgICAgbmFtZTogbmV3VXNlci5uYW1lLFxuICAgICAgICAgICAgICAgIHJvbGU6IG5ld1VzZXIucm9sZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMCwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgcm9sZSBub3QgdmFsaWQnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL3VzZXIvY3JlYXRlJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgICAgICBlbWFpbDogbmV3VXNlci5lbWFpbCxcbiAgICAgICAgICAgICAgICBuYW1lOiBuZXdVc2VyLm5hbWUsXG4gICAgICAgICAgICAgICAgcm9sZTogJ25vdCB2YWxpZCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDAsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIGVtYWlsIGFkZHJlc3MgYWxyZWFkeSBpbiB1c2UnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL3VzZXIvY3JlYXRlJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgICAgICBlbWFpbDogdXNlckluZm8uZW1haWwsXG4gICAgICAgICAgICAgICAgbmFtZTogbmV3VXNlci5uYW1lLFxuICAgICAgICAgICAgICAgIHJvbGU6IG5ld1VzZXIucm9sZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMCwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdQVVQgL2FwaS92MS91c2VyL3VwZGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5ld1VzZXJJbmZvID0ge1xuICAgICAgICAgICAgbmFtZTogJ05ldyBOYW1lJyxcbiAgICAgICAgICAgIGVtYWlsOiAnbmV3ZW1haWxAdGVzdC5jb20nLFxuICAgICAgICAgICAgcm9sZTogJ3VzZXInXG4gICAgICAgIH07XG4gICAgICAgIGl0KCdzaG91bGQgdXBkYXRlIHRoZSB1c2VyJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucHV0KCcvYXBpL3YxL3VzZXIvdXBkYXRlJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6IHVzZXJJbmZvLmVtYWlsLCB1c2VyOiBuZXdVc2VySW5mbyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwLCBmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIFVzZXJfMVtcImRlZmF1bHRcIl0uZmluZEJ5RW1haWwobmV3VXNlckluZm8uZW1haWwpLmV4ZWMoZnVuY3Rpb24gKGVyciwgdXNlcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc05vdE51bGwodXNlcik7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcEluY2x1ZGUodXNlciwgbmV3VXNlckluZm8pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiB1c2VyIHdpdGggZW1haWwgZG9lcyBub3QgZXhpc3QnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wdXQoJy9hcGkvdjEvdXNlci91cGRhdGUnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ2RvZXNub3RleGlzdEB0ZXN0LmNvbScsIHVzZXI6IG5ld1VzZXJJbmZvIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDQsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIG5ldyBlbWFpbCBub3QgdmFsaWQnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wdXQoJy9hcGkvdjEvdXNlci91cGRhdGUnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VySW5mby5lbWFpbCxcbiAgICAgICAgICAgICAgICB1c2VyOiBPYmplY3QuYXNzaWduKHt9LCBuZXdVc2VySW5mbywgeyBlbWFpbDogJ25vdCB2YWxpZCcgfSlcbiAgICAgICAgICAgIH0pLmV4cGVjdCg0MDAsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIHJvbGUgbm90IHZhbGlkJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucHV0KCcvYXBpL3YxL3VzZXIvdXBkYXRlJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgICAgICBlbWFpbDogdXNlckluZm8uZW1haWwsXG4gICAgICAgICAgICAgICAgdXNlcjogT2JqZWN0LmFzc2lnbih7fSwgbmV3VXNlckluZm8sIHsgcm9sZTogJ25vdCB2YWxpZCcgfSlcbiAgICAgICAgICAgIH0pLmV4cGVjdCg0MDAsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnREVMRVRFIC9hcGkvdjEvdXNlci9kZWxldGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHZhciB1c2VyID0gbmV3IFVzZXJfMVtcImRlZmF1bHRcIl0oe1xuICAgICAgICAgICAgICAgIG5hbWU6ICdOZXcgTmFtZScsXG4gICAgICAgICAgICAgICAgZW1haWw6ICduZXdlbWFpbEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgcm9sZTogJ3VzZXInLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAncGFzcydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIGluYWN0aXZlVXNlciA9IG5ldyBVc2VyXzFbXCJkZWZhdWx0XCJdKHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnTmFtZScsXG4gICAgICAgICAgICAgICAgZW1haWw6ICdkZWxldGVkQHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICByb2xlOiAndXNlcicsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICdwYXNzd29yZCcsXG4gICAgICAgICAgICAgICAgZGVsZXRlZDogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdXNlci5zYXZlKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIGluYWN0aXZlVXNlci5zYXZlKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGRlbGV0ZSB0aGUgdXNlcicsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApW1wiZGVsZXRlXCJdKCcvYXBpL3YxL3VzZXIvZGVsZXRlJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICduZXdlbWFpbEB0ZXN0LmNvbScgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMCwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgVXNlcl8xW1wiZGVmYXVsdFwiXS5maW5kQnlFbWFpbCgnbmV3ZW1haWxAdGVzdC5jb20nKS5leGVjKGZ1bmN0aW9uIChlcnIsIHVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNUcnVlKHVzZXIuZGVsZXRlZCk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIHRyeWluZyB0byBkZWxldGUgbG9nZ2VkIGluIHVzZXInLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVtcImRlbGV0ZVwiXSgnL2FwaS92MS91c2VyL2RlbGV0ZScpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiB1c2VySW5mby5lbWFpbCB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwLCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiBlbWFpbCBpbmFjdGl2ZScsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApW1wiZGVsZXRlXCJdKCcvYXBpL3YxL3VzZXIvZGVsZXRlJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICdkZWxldGVkQHRlc3QuY29tJyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwLCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiBlbWFpbCBkb2VzIG5vdCBleGlzdCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApW1wiZGVsZXRlXCJdKCcvYXBpL3YxL3VzZXIvZGVsZXRlJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICdub3RyZWFsQHRlc3QuY29tJyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDA0LCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiBlbWFpbCBub3QgcHJvdmlkZWQnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVtcImRlbGV0ZVwiXSgnL2FwaS92MS91c2VyL2RlbGV0ZScpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAnbm90IHZhbGlkJyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwLCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiB1c2VyIG1ha2luZyByZXF1ZXN0IGlzIG5vdCBhbiBhZG1pbicsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICB2YXIgdXNlciA9IG5ldyBVc2VyXzFbXCJkZWZhdWx0XCJdKHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnTmFtZScsXG4gICAgICAgICAgICAgICAgZW1haWw6ICdub3RhbmFkbWluQHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogYmNyeXB0anNfMS5oYXNoU3luYygncGFzc3dvcmQnKSxcbiAgICAgICAgICAgICAgICByb2xlOiAndXNlcicsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHVzZXIuc2F2ZShmdW5jdGlvbiAoZXJyLCB1c2VyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL2xvZ2luJylcbiAgICAgICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ25vdGFuYWRtaW5AdGVzdC5jb20nLCBwYXNzd29yZDogJ3Bhc3N3b3JkJyB9KVxuICAgICAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMClcbiAgICAgICAgICAgICAgICAgICAgLmVuZChmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSByZXMuZ2V0KCd4LWFjY2Vzcy10b2tlbicpO1xuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApW1wiZGVsZXRlXCJdKCcvYXBpL3YxL3VzZXIvZGVsZXRlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMSwgZG9uZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiB1c2VyIG5vdCBsb2dnZWQgaW4nLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVtcImRlbGV0ZVwiXSgnL2FwaS92MS91c2VyL2RlbGV0ZScpXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDEsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnUFVUIC9hcGkvdjEvdXNlci9yZXN0b3JlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICB2YXIgdXNlciA9IG5ldyBVc2VyXzFbXCJkZWZhdWx0XCJdKHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnTmV3IE5hbWUnLFxuICAgICAgICAgICAgICAgIGVtYWlsOiAnYWN0aXZlQHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICByb2xlOiAndXNlcicsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICdwYXNzJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgaW5hY3RpdmVVc2VyID0gbmV3IFVzZXJfMVtcImRlZmF1bHRcIl0oe1xuICAgICAgICAgICAgICAgIG5hbWU6ICdOYW1lJyxcbiAgICAgICAgICAgICAgICBlbWFpbDogJ2RlbGV0ZWRAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgIHJvbGU6ICd1c2VyJyxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJ3Bhc3N3b3JkJyxcbiAgICAgICAgICAgICAgICBkZWxldGVkOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB1c2VyLnNhdmUoZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgaW5hY3RpdmVVc2VyLnNhdmUoZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmVzdG9yZSB0aGUgdXNlcicsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnB1dCgnL2FwaS92MS91c2VyL3Jlc3RvcmUnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ2RlbGV0ZWRAdGVzdC5jb20nIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgyMDAsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIFVzZXJfMVtcImRlZmF1bHRcIl0uZmluZEJ5RW1haWwoJ2RlbGV0ZWRAdGVzdC5jb20nKS5leGVjKGZ1bmN0aW9uIChlcnIsIHVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNGYWxzZSh1c2VyLmRlbGV0ZWQpO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiBlbWFpbCBkb2VzIG5vdCBleGlzdCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnB1dCgnL2FwaS92MS91c2VyL3Jlc3RvcmUnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ2RvZXNub3RleGlzdEB0ZXN0LmNvbScgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwNCwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgdXNlciBpcyBhY3RpdmUnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wdXQoJy9hcGkvdjEvdXNlci9yZXN0b3JlJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICdhY3RpdmVAdGVzdC5jb20nIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDAsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIHVzZXIgbWFraW5nIHJlcXVlc3QgaXMgbm90IGFuIGFkbWluJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHZhciB1c2VyID0gbmV3IFVzZXJfMVtcImRlZmF1bHRcIl0oe1xuICAgICAgICAgICAgICAgIG5hbWU6ICdOYW1lJyxcbiAgICAgICAgICAgICAgICBlbWFpbDogJ25vdGFuYWRtaW5AdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBiY3J5cHRqc18xLmhhc2hTeW5jKCdwYXNzd29yZCcpLFxuICAgICAgICAgICAgICAgIHJvbGU6ICd1c2VyJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdXNlci5zYXZlKGZ1bmN0aW9uIChlcnIsIHVzZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAnbm90YW5hZG1pbkB0ZXN0LmNvbScsIHBhc3N3b3JkOiAncGFzc3dvcmQnIH0pXG4gICAgICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwKVxuICAgICAgICAgICAgICAgICAgICAuZW5kKGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IHJlcy5nZXQoJ3gtYWNjZXNzLXRva2VuJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wdXQoJy9hcGkvdjEvdXNlci9yZXN0b3JlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMSwgZG9uZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiB1c2VyIG5vdCBsb2dnZWQgaW4nLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wdXQoJy9hcGkvdjEvdXNlci9yZXN0b3JlJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAnYWN0aXZlQHRlc3QuY29tJyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAxLCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWRHVnpkRlZ6WlhKRGIyNTBjbTlzYkdWeUxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZMaTR2ZEdWemRITXZjMlZ5ZG1WeUwzUmxjM1JWYzJWeVEyOXVkSEp2Ykd4bGNpNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenRCUVVGQkxHMURRVUZ4UXp0QlFVTnlReXh4UTBGQmIwTTdRVUZEY0VNc05rSkJRVGhDTzBGQlJUbENMSGxDUVVFNFF6dEJRVU01UXl4eFJFRkJNa1E3UVVGRk0wUXNVVUZCVVN4RFFVRkRMR2xDUVVGcFFpeEZRVUZGTzBsQlEzaENMRWxCUVVrc1MwRkJZU3hEUVVGRE8wbEJRMnhDTEVsQlFVa3NVVUZCVVN4SFFVRkhPMUZCUTFnc1NVRkJTU3hGUVVGRkxGRkJRVkU3VVVGRFpDeExRVUZMTEVWQlFVVXNaVUZCWlR0UlFVTjBRaXhSUVVGUkxFVkJRVVVzVFVGQlRUdFJRVU5vUWl4SlFVRkpMRVZCUVVVc1QwRkJUenRMUVVOb1FpeERRVUZETzBsQlJVWXNWVUZCVlN4RFFVRkRMRlZCUVZNc1NVRkJTVHRSUVVOd1FpeHpRa0ZCYTBJc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF6dFpRVU4wUWl4SlFVRkpMRWxCUVVrc1IwRkJWU3hKUVVGSkxHbENRVUZKTEVOQlFVTTdaMEpCUTNaQ0xFbEJRVWtzUlVGQlJTeFJRVUZSTEVOQlFVTXNTVUZCU1R0blFrRkRia0lzUzBGQlN5eEZRVUZGTEZGQlFWRXNRMEZCUXl4TFFVRkxPMmRDUVVOeVFpeFJRVUZSTEVWQlFVVXNiVUpCUVZFc1EwRkJReXhSUVVGUkxFTkJRVU1zVVVGQlVTeERRVUZETzJkQ1FVTnlReXhKUVVGSkxFVkJRVVVzVVVGQlVTeERRVUZETEVsQlFVazdZVUZEZEVJc1EwRkJReXhEUVVGRE8xbEJRMGdzU1VGQlNTeERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGRExFbEJRVmM3WjBKQlJYcENMRTlCUVU4c1EwRkJReXhQUVVGSExFTkJRVU03Y1VKQlExQXNTVUZCU1N4RFFVRkRMR1ZCUVdVc1EwRkJRenR4UWtGRGNrSXNTVUZCU1N4RFFVRkRMRVZCUVVNc1MwRkJTeXhGUVVGRkxGRkJRVkVzUTBGQlF5eExRVUZMTEVWQlFVVXNVVUZCVVN4RlFVRkZMRkZCUVZFc1EwRkJReXhSUVVGUkxFVkJRVU1zUTBGQlF6dHhRa0ZETVVRc1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF6dHhRa0ZEV0N4SFFVRkhMRU5CUVVNc1ZVRkJReXhIUVVGUkxFVkJRVVVzUjBGQmNVSTdiMEpCUTJwRExFdEJRVXNzUjBGQlJ5eEhRVUZITEVOQlFVTXNSMEZCUnl4RFFVRkRMR2RDUVVGblFpeERRVUZETEVOQlFVTTdiMEpCUTJ4RExHRkJRVTBzUTBGQlF5eFRRVUZUTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN2IwSkJRM2hDTEdGQlFVMHNRMEZCUXl4UlFVRlJMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU03YjBKQlEzWkNMR0ZCUVUwc1EwRkJReXhWUVVGVkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTTdiMEpCUTNwQ0xFbEJRVWtzUlVGQlJTeERRVUZETzJkQ1FVTllMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMWdzUTBGQlF5eERRVUZETEVOQlFVTXNUMEZCU3l4RFFVRkJMRU5CUVVNc1ZVRkJReXhIUVVGUk8yZENRVU5rTEUxQlFVMHNSMEZCUnl4RFFVRkRPMWxCUTJRc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFVDeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTlFMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJSVWdzVVVGQlVTeERRVUZETEd0Q1FVRnJRaXhGUVVGRk8xRkJRM3BDTEVWQlFVVXNRMEZCUXl4cFEwRkJhVU1zUlVGQlJTeFZRVUZWTEVsQlFVazdXVUZEYUVRc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF6dHBRa0ZEVUN4SFFVRkhMRU5CUVVNc1kwRkJZeXhEUVVGRE8ybENRVU51UWl4SFFVRkhMRU5CUVVNc1owSkJRV2RDTEVWQlFVVXNTMEZCU3l4RFFVRkRPMmxDUVVNMVFpeE5RVUZOTEVOQlFVTXNSMEZCUnl4RlFVRkZMRlZCUVVNc1IwRkJVU3hGUVVGRkxFZEJRWEZDTzJkQ1FVTjZReXhKUVVGSkxFZEJRVWM3YjBKQlFVVXNUMEZCVHl4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU03WjBKQlF6RkNMR0ZCUVUwc1EwRkJReXhYUVVGWExFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRVZCUVVVc1VVRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzJkQ1FVTnFSQ3hoUVVGTkxFTkJRVU1zVjBGQlZ5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhGUVVGRkxGRkJRVkVzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0blFrRkRia1FzWVVGQlRTeERRVUZETEZkQlFWY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUlVGQlJTeFJRVUZSTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1owSkJRMnBFTEdGQlFVMHNRMEZCUXl4WFFVRlhMRU5CUVVNc1IwRkJSeXhEUVVGRExFbEJRVWtzUlVGQlJTeFZRVUZWTEVOQlFVTXNRMEZCUXp0blFrRkRla01zU1VGQlNTeEZRVUZGTEVOQlFVTTdXVUZEV0N4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NSVUZCUlN4RFFVRkRMRGhDUVVFNFFpeEZRVUZGTEZWQlFWVXNTVUZCU1R0WlFVTTNReXhQUVVGUExFTkJRVU1zVDBGQlJ5eERRVUZETzJsQ1FVTlFMRWRCUVVjc1EwRkJReXhqUVVGakxFTkJRVU03YVVKQlEyNUNMRTFCUVUwc1EwRkJReXhIUVVGSExFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTTdVVUZETTBJc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFVDeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTklMRkZCUVZFc1EwRkJReXh0UWtGQmJVSXNSVUZCUlR0UlFVTXhRaXhGUVVGRkxFTkJRVU1zWjBOQlFXZERMRVZCUVVVc1ZVRkJWU3hKUVVGSk8xbEJReTlETEU5QlFVOHNRMEZCUXl4UFFVRkhMRU5CUVVNN2FVSkJRMUFzUjBGQlJ5eERRVUZETEdWQlFXVXNRMEZCUXp0cFFrRkRjRUlzUjBGQlJ5eERRVUZETEdkQ1FVRm5RaXhGUVVGRkxFdEJRVXNzUTBGQlF6dHBRa0ZETlVJc1RVRkJUU3hEUVVGRExFZEJRVWNzUlVGQlJTeFZRVUZETEVkQlFWRXNSVUZCUlN4SFFVRnhRanRuUWtGRGVrTXNZVUZCVFN4RFFVRkRMRmRCUVZjc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TlFVRk5MRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU03WjBKQlF6ZERMR0ZCUVUwc1EwRkJReXhQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRExFVkJRVVU3YjBKQlF6bENMRWxCUVVrc1JVRkJSU3hSUVVGUkxFTkJRVU1zU1VGQlNUdHZRa0ZEYmtJc1NVRkJTU3hGUVVGRkxGRkJRVkVzUTBGQlF5eEpRVUZKTzI5Q1FVTnVRaXhMUVVGTExFVkJRVVVzVVVGQlVTeERRVUZETEV0QlFVczdhVUpCUTNoQ0xFTkJRVU1zUTBGQlFUdG5Ra0ZEUml4aFFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRkxGVkJRVlVzUTBGQlF5eERRVUZETzJkQ1FVTnNSQ3hKUVVGSkxFVkJRVVVzUTBGQlF6dFpRVU5ZTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTFnc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEZRVUZGTEVOQlFVTXNPRUpCUVRoQ0xFVkJRVVVzVlVGQlZTeEpRVUZKTzFsQlF6ZERMRTlCUVU4c1EwRkJReXhQUVVGSExFTkJRVU03YVVKQlExQXNSMEZCUnl4RFFVRkRMR1ZCUVdVc1EwRkJRenRwUWtGRGNFSXNUVUZCVFN4RFFVRkRMRWRCUVVjc1JVRkJSU3hKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU16UWl4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOUUxFTkJRVU1zUTBGQlF5eERRVUZETzBsQlEwZ3NVVUZCVVN4RFFVRkRMSGxDUVVGNVFpeEZRVUZGTzFGQlEyaERMRVZCUVVVc1EwRkJReXhwUTBGQmFVTXNSVUZCUlN4VlFVRlZMRWxCUVVrN1dVRkRhRVFzVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXp0cFFrRkRVQ3hIUVVGSExFTkJRVU1zWlVGQlpTeEhRVUZITEZGQlFWRXNRMEZCUXl4TFFVRkxMRU5CUVVNN2FVSkJRM0pETEVkQlFVY3NRMEZCUXl4blFrRkJaMElzUlVGQlJTeExRVUZMTEVOQlFVTTdhVUpCUXpWQ0xFMUJRVTBzUTBGQlF5eEhRVUZITEVWQlFVVXNWVUZCUXl4SFFVRlJMRVZCUVVVc1IwRkJjVUk3WjBKQlEzcERMR0ZCUVUwc1EwRkJReXhWUVVGVkxFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJReXhQUVVGUExFVkJRVVVzVFVGQlRTeEZRVUZGTEUxQlFVMHNSVUZCUlN4TFFVRkxMRVZCUVVVc1UwRkJVeXhEUVVGRExFTkJRVU1zUTBGQlF6dG5Ra0ZET1VVc1lVRkJUU3hEUVVGRExFOUJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1JVRkJSVHR2UWtGRE1VSXNTMEZCU3l4RlFVRkZMRkZCUVZFc1EwRkJReXhMUVVGTE8yOUNRVU55UWl4SlFVRkpMRVZCUVVVc1VVRkJVU3hEUVVGRExFbEJRVWs3YjBKQlEyNUNMRWxCUVVrc1JVRkJSU3hSUVVGUkxFTkJRVU1zU1VGQlNUdHBRa0ZEZEVJc1EwRkJReXhEUVVGRE8yZENRVU5JTEVsQlFVa3NSVUZCUlN4RFFVRkRPMWxCUTFnc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFdDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXh4UTBGQmNVTXNSVUZCUlN4VlFVRlZMRWxCUVVrN1dVRkRjRVFzVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXp0cFFrRkRVQ3hIUVVGSExFTkJRVU1zYTBOQlFXdERMRU5CUVVNN2FVSkJRM1pETEVkQlFVY3NRMEZCUXl4blFrRkJaMElzUlVGQlJTeExRVUZMTEVOQlFVTTdhVUpCUXpWQ0xFMUJRVTBzUTBGQlF5eEhRVUZITEVWQlFVVXNWVUZCUXl4SFFVRlJMRVZCUVVVc1IwRkJjVUk3WjBKQlEzcERMR0ZCUVUwc1EwRkJReXhSUVVGUkxFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRenRuUWtGRGFFTXNZVUZCVFN4RFFVRkRMRmRCUVZjc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NSVUZCUlN3clFrRkJLMElzUTBGQlF5eERRVUZETzJkQ1FVTndSU3hKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTTdXVUZEWkN4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NSVUZCUlN4RFFVRkRMR3REUVVGclF5eEZRVUZGTEZWQlFWVXNTVUZCU1R0WlFVTnFSQ3hQUVVGUExFTkJRVU1zVDBGQlJ5eERRVUZETzJsQ1FVTlFMRWRCUVVjc1EwRkJReXd5UWtGQk1rSXNRMEZCUXp0cFFrRkRhRU1zUjBGQlJ5eERRVUZETEdkQ1FVRm5RaXhGUVVGRkxFdEJRVXNzUTBGQlF6dHBRa0ZETlVJc1RVRkJUU3hEUVVGRExFZEJRVWNzUlVGQlJTeFZRVUZETEVkQlFWRXNSVUZCUlN4SFFVRnhRanRuUWtGRGVrTXNZVUZCVFN4RFFVRkRMRkZCUVZFc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRPMmRDUVVOb1F5eGhRVUZOTEVOQlFVTXNWMEZCVnl4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eEZRVUZGTERaQ1FVRTJRaXhEUVVGRExFTkJRVU03WjBKQlEyeEZMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dFpRVU5rTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTFnc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFVDeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTklMRkZCUVZFc1EwRkJReXhuUTBGQlowTXNSVUZCUlR0UlFVTjJReXhGUVVGRkxFTkJRVU1zTUVOQlFUQkRMRVZCUVVVc1ZVRkJWU3hKUVVGSk8xbEJRM3BFTEVsQlFVa3NVVUZCVVN4SFFVRkhMRzlDUVVGdlFpeERRVUZETzFsQlEzQkRMRTlCUVU4c1EwRkJReXhQUVVGSExFTkJRVU03YVVKQlExQXNTVUZCU1N4RFFVRkRMREpDUVVFeVFpeERRVUZETzJsQ1FVTnFReXhIUVVGSExFTkJRVU1zWjBKQlFXZENMRVZCUVVVc1MwRkJTeXhEUVVGRE8ybENRVU0xUWl4SlFVRkpMRU5CUVVNc1JVRkJSU3hMUVVGTExFVkJRVVVzVVVGQlVTeEZRVUZGTEVOQlFVTTdhVUpCUTNwQ0xFMUJRVTBzUTBGQlF5eEhRVUZITEVWQlFVVXNWVUZCUXl4SFFVRlJMRVZCUVVVc1IwRkJjVUk3WjBKQlEzcERMRWxCUVVrc1IwRkJSenR2UWtGQlJTeFBRVUZQTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRuUWtGRE1VSXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJRenR4UWtGRFVDeEhRVUZITEVOQlFVTXNZMEZCWXl4RFFVRkRPM0ZDUVVWdVFpeEhRVUZITEVOQlFVTXNaMEpCUVdkQ0xFVkJRVVVzUjBGQlJ5eERRVUZETEVkQlFVY3NRMEZCUXl4blFrRkJaMElzUTBGQlF5eERRVUZETzNGQ1FVTm9SQ3hOUVVGTkxFTkJRVU1zUjBGQlJ5eEZRVUZGTEZWQlFVTXNSMEZCVVN4RlFVRkZMRWRCUVhGQ08yOUNRVU42UXl4aFFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RlFVRkZMRkZCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dHZRa0ZEYWtRc1lVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1JVRkJSU3hSUVVGUkxFTkJRVU1zUTBGQlF6dHZRa0ZETjBNc1lVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1JVRkJSU3hSUVVGUkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdiMEpCUTJwRUxFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0blFrRkRaQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU5ZTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTFnc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEZRVUZGTEVOQlFVTXNkVU5CUVhWRExFVkJRVVVzVlVGQlZTeEpRVUZKTzFsQlEzUkVMRTlCUVU4c1EwRkJReXhQUVVGSExFTkJRVU03YVVKQlExQXNTVUZCU1N4RFFVRkRMREpDUVVFeVFpeERRVUZETzJsQ1FVTnFReXhIUVVGSExFTkJRVU1zWjBKQlFXZENMRVZCUVVVc1MwRkJTeXhEUVVGRE8ybENRVU0xUWl4SlFVRkpMRU5CUVVNc1JVRkJSU3hMUVVGTExFVkJRVVVzWTBGQll5eEZRVUZGTEVOQlFVTTdhVUpCUXk5Q0xFMUJRVTBzUTBGQlF5eEhRVUZITEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRNMElzUTBGQlF5eERRVUZETEVOQlFVRTdVVUZEUml4RlFVRkZMRU5CUVVNc2NVTkJRWEZETEVWQlFVVXNWVUZCVlN4SlFVRkpPMWxCUTNCRUxFOUJRVThzUTBGQlF5eFBRVUZITEVOQlFVTTdhVUpCUTFBc1NVRkJTU3hEUVVGRExESkNRVUV5UWl4RFFVRkRPMmxDUVVOcVF5eEhRVUZITEVOQlFVTXNaMEpCUVdkQ0xFVkJRVVVzUzBGQlN5eERRVUZETzJsQ1FVTTFRaXhKUVVGSkxFTkJRVU1zUlVGQlJTeExRVUZMTEVWQlFVVXNaVUZCWlN4RlFVRkZMRU5CUVVNN2FVSkJRMmhETEUxQlFVMHNRMEZCUXl4SFFVRkhMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRE0wSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hGUVVGRkxFTkJRVU1zSzBKQlFTdENMRVZCUVVVc1ZVRkJWU3hKUVVGSk8xbEJRemxETEU5QlFVOHNRMEZCUXl4UFFVRkhMRU5CUVVNN2FVSkJRMUFzU1VGQlNTeERRVUZETERKQ1FVRXlRaXhEUVVGRE8ybENRVU5xUXl4SlFVRkpMRU5CUVVNc1JVRkJSU3hMUVVGTExFVkJRVVVzWlVGQlpTeEZRVUZGTEVOQlFVTTdhVUpCUTJoRExFMUJRVTBzUTBGQlF5eEhRVUZITEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRNMElzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOSUxGRkJRVkVzUTBGQlF5d3JRa0ZCSzBJc1JVRkJSVHRSUVVOMFF5eEZRVUZGTEVOQlFVTXNiMEpCUVc5Q0xFVkJRVVVzVlVGQlZTeEpRVUZKTzFsQlEyNURMRWxCUVVrc1QwRkJUeXhIUVVGSExGVkJRVlVzUTBGQlF6dFpRVU42UWl4UFFVRlBMRU5CUVVNc1QwRkJSeXhEUVVGRE8ybENRVU5RTEVsQlFVa3NRMEZCUXl3d1FrRkJNRUlzUTBGQlF6dHBRa0ZEYUVNc1IwRkJSeXhEUVVGRExHZENRVUZuUWl4RlFVRkZMRXRCUVVzc1EwRkJRenRwUWtGRE5VSXNTVUZCU1N4RFFVRkRMRVZCUVVVc1NVRkJTU3hGUVVGRkxFOUJRVThzUlVGQlJTeERRVUZETzJsQ1FVTjJRaXhOUVVGTkxFTkJRVU1zUjBGQlJ5eEZRVUZGTEZWQlFVTXNSMEZCVVN4RlFVRkZMRWRCUVhGQ08yZENRVU42UXl4UFFVRlBMRU5CUVVNc1QwRkJSeXhEUVVGRE8zRkNRVU5RTEVkQlFVY3NRMEZCUXl4alFVRmpMRU5CUVVNN2NVSkJRMjVDTEVkQlFVY3NRMEZCUXl4blFrRkJaMElzUlVGQlJTeEhRVUZITEVOQlFVTXNSMEZCUnl4RFFVRkRMR2RDUVVGblFpeERRVUZETEVOQlFVTTdjVUpCUTJoRUxFMUJRVTBzUTBGQlF5eEhRVUZITEVWQlFVVXNWVUZCUXl4SFFVRlJMRVZCUVVVc1IwRkJjVUk3YjBKQlEzcERMR0ZCUVUwc1EwRkJReXhYUVVGWExFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRVZCUVVVc1QwRkJUeXhEUVVGRExFTkJRVU03YjBKQlF6TkRMR0ZCUVUwc1EwRkJReXhYUVVGWExFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRVZCUVVVc1VVRkJVU3hEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETzI5Q1FVTnVSQ3hoUVVGTkxFTkJRVU1zVjBGQlZ5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hGUVVGRkxGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0dlFrRkRha1FzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMmRDUVVOa0xFTkJRVU1zUTBGQlF5eERRVUZETzFsQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRXQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl3clFrRkJLMElzUlVGQlJTeFZRVUZWTEVsQlFVazdXVUZET1VNc1NVRkJTU3hQUVVGUExFZEJRVWNzVlVGQlZTeERRVUZETzFsQlEzcENMRTlCUVU4c1EwRkJReXhQUVVGSExFTkJRVU03YVVKQlExQXNTVUZCU1N4RFFVRkRMREJDUVVFd1FpeERRVUZETzJsQ1FVTm9ReXhKUVVGSkxFTkJRVU1zUlVGQlJTeEpRVUZKTEVWQlFVVXNUMEZCVHl4RlFVRkZMRU5CUVVNN2FVSkJRM1pDTEUxQlFVMHNRMEZCUXl4SFFVRkhMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRE0wSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5JTEZGQlFWRXNRMEZCUXl4dFEwRkJiVU1zUlVGQlJUdFJRVU14UXl4RlFVRkZMRU5CUVVNc2QwSkJRWGRDTEVWQlFVVXNWVUZCVlN4SlFVRkpPMWxCUTNaRExFbEJRVWtzVDBGQlR5eEhRVUZITEZOQlFWTXNRMEZCUXp0WlFVTjRRaXhQUVVGUExFTkJRVU1zVDBGQlJ5eERRVUZETzJsQ1FVTlFMRWxCUVVrc1EwRkJReXc0UWtGQk9FSXNRMEZCUXp0cFFrRkRjRU1zUjBGQlJ5eERRVUZETEdkQ1FVRm5RaXhGUVVGRkxFdEJRVXNzUTBGQlF6dHBRa0ZETlVJc1NVRkJTU3hEUVVGRExFVkJRVVVzVDBGQlR5eEZRVUZGTEZGQlFWRXNRMEZCUXl4UlFVRlJMRVZCUVVVc1QwRkJUeXhGUVVGRkxFOUJRVThzUlVGQlJTeERRVUZETzJsQ1FVTjBSQ3hOUVVGTkxFTkJRVU1zUjBGQlJ5eEZRVUZGTEZWQlFVTXNSMEZCVVN4RlFVRkZMRWRCUVhGQ08yZENRVU42UXl4SlFVRkpMRWRCUVVjN2IwSkJRVVVzVDBGQlR5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1owSkJRekZDTEU5QlFVOHNRMEZCUXl4UFFVRkhMRU5CUVVNN2NVSkJRMUFzU1VGQlNTeERRVUZETEdWQlFXVXNRMEZCUXp0eFFrRkRja0lzU1VGQlNTeERRVUZETEVWQlFVVXNTMEZCU3l4RlFVRkZMRkZCUVZFc1EwRkJReXhMUVVGTExFVkJRVVVzVVVGQlVTeEZRVUZGTEU5QlFVOHNSVUZCUlN4RFFVRkRPM0ZDUVVOc1JDeE5RVUZOTEVOQlFVTXNSMEZCUnl4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRE8xbEJRek5DTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTFnc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEZRVUZGTEVOQlFVTXNNa1JCUVRKRUxFVkJRVVVzVlVGQlZTeEpRVUZKTzFsQlEzUkZMRTlCUVU4c1EwRkJReXhQUVVGSExFTkJRVU03YVVKQlExQXNTVUZCU1N4RFFVRkRMRGhDUVVFNFFpeERRVUZETzJsQ1FVTndReXhIUVVGSExFTkJRVU1zWjBKQlFXZENMRVZCUVVVc1MwRkJTeXhEUVVGRE8ybENRVU0xUWl4SlFVRkpMRU5CUVVNc1JVRkJSU3hQUVVGUExFVkJRVVVzWjBKQlFXZENMRVZCUVVVc1QwRkJUeXhGUVVGRkxGVkJRVlVzUlVGQlJTeERRVUZETzJsQ1FVTjRSQ3hOUVVGTkxFTkJRVU1zUjBGQlJ5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUXpOQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExQXNSVUZCUlN4RFFVRkRMR2xFUVVGcFJDeEZRVUZGTEZWQlFWVXNTVUZCU1R0WlFVTm9SU3hQUVVGUExFTkJRVU1zVDBGQlJ5eERRVUZETzJsQ1FVTlFMRWxCUVVrc1EwRkJReXc0UWtGQk9FSXNRMEZCUXp0cFFrRkRjRU1zVFVGQlRTeERRVUZETEVkQlFVY3NSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVNelFpeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTlFMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMGdzVVVGQlVTeERRVUZETERCQ1FVRXdRaXhGUVVGRk8xRkJRMnBETEVsQlFVa3NUMEZCVHl4SFFVRkhPMWxCUTFZc1MwRkJTeXhGUVVGRkxHdENRVUZyUWp0WlFVTjZRaXhKUVVGSkxFVkJRVVVzVlVGQlZUdFpRVU5vUWl4SlFVRkpMRVZCUVVVc1RVRkJUVHRUUVVObUxFTkJRVUU3VVVGRFJDeEZRVUZGTEVOQlFVTXNNRUpCUVRCQ0xFVkJRVVVzVlVGQlV5eEpRVUZKTzFsQlJYaERMR2xDUVVGSkxFTkJRVU1zVjBGQlZ5eERRVUZETEU5QlFVOHNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhqUVVGakxFTkJRVU1zVlVGQlF5eEhRVUZITEVWQlFVVXNTMEZCWVR0blFrRkRPVVFzU1VGQlNTeEhRVUZITzI5Q1FVRkZMRTlCUVU4c1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzJkQ1FVTXhRaXhoUVVGTkxFTkJRVU1zVjBGQlZ5eERRVUZETEV0QlFVc3NSVUZCUlN4RFFVRkRMRVZCUVVVc2JVUkJRVzFFTEVOQlFVTXNRMEZCUXp0blFrRkRiRVlzVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXp0eFFrRkRVQ3hKUVVGSkxFTkJRVU1zY1VKQlFYRkNMRU5CUVVNN2NVSkJRek5DTEVkQlFVY3NRMEZCUXl4blFrRkJaMElzUlVGQlJTeExRVUZMTEVOQlFVTTdjVUpCUXpWQ0xFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTTdjVUpCUTJJc1RVRkJUU3hEUVVGRExFZEJRVWNzUlVGQlJTeFZRVUZETEVkQlFWRXNSVUZCUlN4SFFVRnhRanR2UWtGRGVrTXNTVUZCU1N4SFFVRkhPM2RDUVVGRkxFOUJRVThzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMjlDUVVNeFFpeHBRa0ZCU1N4RFFVRkRMRmRCUVZjc1EwRkJReXhQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVVNc1IwRkJSeXhGUVVGRkxFbEJRVmM3ZDBKQlEyeEVMRWxCUVVrc1IwRkJSenMwUWtGQlJTeFBRVUZQTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenQzUWtGRE1VSXNZVUZCVFN4RFFVRkRMRmRCUVZjc1EwRkJReXhKUVVGSkxFVkJRVVVzVDBGQlR5eERRVUZETEVOQlFVTTdkMEpCUTJ4RExFbEJRVWtzUlVGQlJTeERRVUZETzI5Q1FVTllMRU5CUVVNc1EwRkJReXhEUVVGRE8yZENRVU5RTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTFnc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFVDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXh2UkVGQmIwUXNSVUZCUlN4VlFVRlRMRWxCUVVrN1dVRkRiRVVzU1VGQlNTeEpRVUZKTEVkQlFWVXNTVUZCU1N4cFFrRkJTU3hEUVVGRE8yZENRVU4yUWl4SlFVRkpMRVZCUVVVc1QwRkJUeXhEUVVGRExFbEJRVWs3WjBKQlEyeENMRXRCUVVzc1JVRkJSU3hQUVVGUExFTkJRVU1zUzBGQlN6dG5Ra0ZEY0VJc1VVRkJVU3hGUVVGRkxHMUNRVUZSTEVOQlFVTXNWVUZCVlN4RFFVRkRPMmRDUVVNNVFpeEpRVUZKTEVWQlFVVXNUMEZCVHl4RFFVRkRMRWxCUVVrN1lVRkRja0lzUTBGQlF5eERRVUZETzFsQlEwZ3NTVUZCU1N4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZETEVsQlFWYzdaMEpCUlhwQ0xFOUJRVThzUTBGQlF5eFBRVUZITEVOQlFVTTdjVUpCUTFBc1NVRkJTU3hEUVVGRExHVkJRV1VzUTBGQlF6dHhRa0ZEY2tJc1NVRkJTU3hEUVVGRExFVkJRVVVzUzBGQlN5eEZRVUZGTEU5QlFVOHNRMEZCUXl4TFFVRkxMRVZCUVVVc1VVRkJVU3hGUVVGRkxGVkJRVlVzUlVGQlJTeERRVUZETzNGQ1FVTndSQ3hOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETzNGQ1FVTllMRWRCUVVjc1EwRkJReXhWUVVGRExFZEJRVkVzUlVGQlJTeEhRVUZ4UWp0dlFrRkRha01zUzBGQlN5eEhRVUZITEVkQlFVY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1owSkJRV2RDTEVOQlFVTXNRMEZCUXp0dlFrRkRiRU1zVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXp0NVFrRkRVQ3hKUVVGSkxFTkJRVU1zY1VKQlFYRkNMRU5CUVVNN2VVSkJRek5DTEVkQlFVY3NRMEZCUXl4blFrRkJaMElzUlVGQlJTeExRVUZMTEVOQlFVTTdlVUpCUXpWQ0xFMUJRVTBzUTBGQlF5eEhRVUZITEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1owSkJRek5DTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTFnc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlN5eERRVUZCTEVOQlFVTXNWVUZCUXl4SFFVRlJPMmRDUVVOa0xFMUJRVTBzUjBGQlJ5eERRVUZETzFsQlEyUXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl4elEwRkJjME1zUlVGQlJTeFZRVUZUTEVsQlFVazdXVUZEY0VRc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF6dHBRa0ZEVUN4SlFVRkpMRU5CUVVNc2NVSkJRWEZDTEVOQlFVTTdhVUpCUXpOQ0xFMUJRVTBzUTBGQlF5eEhRVUZITEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRNMElzUTBGQlF5eERRVUZETEVOQlFVRTdVVUZEUml4RlFVRkZMRU5CUVVNc2JVTkJRVzFETEVWQlFVVXNWVUZCVXl4SlFVRkpPMWxCUTJwRUxFOUJRVThzUTBGQlF5eFBRVUZITEVOQlFVTTdhVUpCUTFBc1NVRkJTU3hEUVVGRExIRkNRVUZ4UWl4RFFVRkRPMmxDUVVNelFpeEhRVUZITEVOQlFVTXNaMEpCUVdkQ0xFVkJRVVVzUzBGQlN5eERRVUZETzJsQ1FVTTFRaXhKUVVGSkxFTkJRVU03WjBKQlEwWXNTMEZCU3l4RlFVRkZMRmRCUVZjN1owSkJRMnhDTEVsQlFVa3NSVUZCUlN4UFFVRlBMRU5CUVVNc1NVRkJTVHRuUWtGRGJFSXNTVUZCU1N4RlFVRkZMRTlCUVU4c1EwRkJReXhKUVVGSk8yRkJRM0pDTEVOQlFVTTdhVUpCUTBRc1RVRkJUU3hEUVVGRExFZEJRVWNzUlVGQlJTeEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTXpRaXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl3clFrRkJLMElzUlVGQlJTeFZRVUZUTEVsQlFVazdXVUZETjBNc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF6dHBRa0ZEVUN4SlFVRkpMRU5CUVVNc2NVSkJRWEZDTEVOQlFVTTdhVUpCUXpOQ0xFZEJRVWNzUTBGQlF5eG5Ra0ZCWjBJc1JVRkJSU3hMUVVGTExFTkJRVU03YVVKQlF6VkNMRWxCUVVrc1EwRkJRenRuUWtGRFJpeExRVUZMTEVWQlFVVXNUMEZCVHl4RFFVRkRMRXRCUVVzN1owSkJRM0JDTEVsQlFVa3NSVUZCUlN4UFFVRlBMRU5CUVVNc1NVRkJTVHRuUWtGRGJFSXNTVUZCU1N4RlFVRkZMRmRCUVZjN1lVRkRjRUlzUTBGQlF6dHBRa0ZEUkN4TlFVRk5MRU5CUVVNc1IwRkJSeXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzFGQlF6TkNMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzUlVGQlJTeERRVUZETERaRFFVRTJReXhGUVVGRkxGVkJRVk1zU1VGQlNUdFpRVU16UkN4UFFVRlBMRU5CUVVNc1QwRkJSeXhEUVVGRE8ybENRVU5RTEVsQlFVa3NRMEZCUXl4eFFrRkJjVUlzUTBGQlF6dHBRa0ZETTBJc1IwRkJSeXhEUVVGRExHZENRVUZuUWl4RlFVRkZMRXRCUVVzc1EwRkJRenRwUWtGRE5VSXNTVUZCU1N4RFFVRkRPMmRDUVVOR0xFdEJRVXNzUlVGQlJTeFJRVUZSTEVOQlFVTXNTMEZCU3p0blFrRkRja0lzU1VGQlNTeEZRVUZGTEU5QlFVOHNRMEZCUXl4SlFVRkpPMmRDUVVOc1FpeEpRVUZKTEVWQlFVVXNUMEZCVHl4RFFVRkRMRWxCUVVrN1lVRkRja0lzUTBGQlF6dHBRa0ZEUkN4TlFVRk5MRU5CUVVNc1IwRkJSeXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzFGQlF6TkNMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMUFzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEU0N4UlFVRlJMRU5CUVVNc2VVSkJRWGxDTEVWQlFVVTdVVUZEYUVNc1NVRkJTU3hYUVVGWExFZEJRVWM3V1VGRFpDeEpRVUZKTEVWQlFVVXNWVUZCVlR0WlFVTm9RaXhMUVVGTExFVkJRVVVzYlVKQlFXMUNPMWxCUXpGQ0xFbEJRVWtzUlVGQlJTeE5RVUZOTzFOQlEyWXNRMEZCUXp0UlFVVkdMRVZCUVVVc1EwRkJReXgzUWtGQmQwSXNSVUZCUlN4VlFVRlRMRWxCUVVrN1dVRkRkRU1zVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXp0cFFrRkRVQ3hIUVVGSExFTkJRVU1zY1VKQlFYRkNMRU5CUVVNN2FVSkJRekZDTEVkQlFVY3NRMEZCUXl4blFrRkJaMElzUlVGQlJTeExRVUZMTEVOQlFVTTdhVUpCUXpWQ0xFbEJRVWtzUTBGQlF5eEZRVUZETEV0QlFVc3NSVUZCUlN4UlFVRlJMRU5CUVVNc1MwRkJTeXhGUVVGRkxFbEJRVWtzUlVGQlJTeFhRVUZYTEVWQlFVTXNRMEZCUXp0cFFrRkRhRVFzVFVGQlRTeERRVUZETEVkQlFVY3NSVUZCUlN4VlFVRkRMRWRCUVZFc1JVRkJSU3hIUVVGeFFqdG5Ra0ZEZWtNc1NVRkJTU3hIUVVGSE8yOUNRVUZGTEU5QlFVOHNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8yZENRVU14UWl4cFFrRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF5eFhRVUZYTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVU1zUjBGQlVTeEZRVUZGTEVsQlFWYzdiMEpCUXpORUxFbEJRVWtzUjBGQlJ6dDNRa0ZCUlN4UFFVRlBMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dHZRa0ZETVVJc1lVRkJUU3hEUVVGRExGTkJRVk1zUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0dlFrRkRka0lzWVVGQlRTeERRVUZETEZkQlFWY3NRMEZCUXl4SlFVRkpMRVZCUVVVc1YwRkJWeXhEUVVGRExFTkJRVU03YjBKQlEzUkRMRWxCUVVrc1JVRkJSU3hEUVVGRE8yZENRVU5ZTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTFBc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFdDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXdyUTBGQkswTXNSVUZCUlN4VlFVRlRMRWxCUVVrN1dVRkROMFFzVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXp0cFFrRkRVQ3hIUVVGSExFTkJRVU1zY1VKQlFYRkNMRU5CUVVNN2FVSkJRekZDTEVkQlFVY3NRMEZCUXl4blFrRkJaMElzUlVGQlJTeExRVUZMTEVOQlFVTTdhVUpCUXpWQ0xFbEJRVWtzUTBGQlF5eEZRVUZETEV0QlFVc3NSVUZCUlN4MVFrRkJkVUlzUlVGQlJTeEpRVUZKTEVWQlFVVXNWMEZCVnl4RlFVRkRMRU5CUVVNN2FVSkJRM3BFTEUxQlFVMHNRMEZCUXl4SFFVRkhMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRE0wSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hGUVVGRkxFTkJRVU1zYjBOQlFXOURMRVZCUVVVc1ZVRkJVeXhKUVVGSk8xbEJRMnhFTEU5QlFVOHNRMEZCUXl4UFFVRkhMRU5CUVVNN2FVSkJRMUFzUjBGQlJ5eERRVUZETEhGQ1FVRnhRaXhEUVVGRE8ybENRVU14UWl4SFFVRkhMRU5CUVVNc1owSkJRV2RDTEVWQlFVVXNTMEZCU3l4RFFVRkRPMmxDUVVNMVFpeEpRVUZKTEVOQlFVTTdaMEpCUTBZc1MwRkJTeXhGUVVGRkxGRkJRVkVzUTBGQlF5eExRVUZMTzJkQ1FVTnlRaXhKUVVGSkxFVkJRVVVzVFVGQlRTeERRVUZETEUxQlFVMHNRMEZCUXl4RlFVRkZMRVZCUVVVc1YwRkJWeXhGUVVGRkxFVkJRVU1zUzBGQlN5eEZRVUZGTEZkQlFWY3NSVUZCUXl4RFFVRkRPMkZCUXpkRUxFTkJRVU1zUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRemRDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1JVRkJSU3hEUVVGRExDdENRVUVyUWl4RlFVRkZMRlZCUVZNc1NVRkJTVHRaUVVNM1F5eFBRVUZQTEVOQlFVTXNUMEZCUnl4RFFVRkRPMmxDUVVOUUxFZEJRVWNzUTBGQlF5eHhRa0ZCY1VJc1EwRkJRenRwUWtGRE1VSXNSMEZCUnl4RFFVRkRMR2RDUVVGblFpeEZRVUZGTEV0QlFVc3NRMEZCUXp0cFFrRkROVUlzU1VGQlNTeERRVUZETzJkQ1FVTkdMRXRCUVVzc1JVRkJSU3hSUVVGUkxFTkJRVU1zUzBGQlN6dG5Ra0ZEY2tJc1NVRkJTU3hGUVVGRkxFMUJRVTBzUTBGQlF5eE5RVUZOTEVOQlFVTXNSVUZCUlN4RlFVRkZMRmRCUVZjc1JVRkJSU3hGUVVGRkxFbEJRVWtzUlVGQlJTeFhRVUZYTEVWQlFVVXNRMEZCUXp0aFFVTTVSQ3hEUVVGRExFTkJRVU1zVFVGQlRTeERRVUZETEVkQlFVY3NSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVNM1FpeERRVUZETEVOQlFVTXNRMEZCUVR0SlFVTk9MRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMGdzVVVGQlVTeERRVUZETERSQ1FVRTBRaXhGUVVGRk8xRkJRMjVETEZWQlFWVXNRMEZCUXl4VlFVRlRMRWxCUVVrN1dVRkRjRUlzU1VGQlNTeEpRVUZKTEVkQlFVY3NTVUZCU1N4cFFrRkJTU3hEUVVGRE8yZENRVU5vUWl4SlFVRkpMRVZCUVVVc1ZVRkJWVHRuUWtGRGFFSXNTMEZCU3l4RlFVRkZMRzFDUVVGdFFqdG5Ra0ZETVVJc1NVRkJTU3hGUVVGRkxFMUJRVTA3WjBKQlExb3NVVUZCVVN4RlFVRkZMRTFCUVUwN1lVRkRia0lzUTBGQlF5eERRVUZETzFsQlEwZ3NTVUZCU1N4WlFVRlpMRWRCUVVjc1NVRkJTU3hwUWtGQlNTeERRVUZETzJkQ1FVTjRRaXhKUVVGSkxFVkJRVVVzVFVGQlRUdG5Ra0ZEV2l4TFFVRkxMRVZCUVVVc2EwSkJRV3RDTzJkQ1FVTjZRaXhKUVVGSkxFVkJRVVVzVFVGQlRUdG5Ra0ZEV2l4UlFVRlJMRVZCUVVVc1ZVRkJWVHRuUWtGRGNFSXNUMEZCVHl4RlFVRkZMRWxCUVVrN1lVRkRhRUlzUTBGQlF5eERRVUZETzFsQlEwZ3NTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGRExFZEJRVkU3WjBKQlEyWXNTVUZCU1N4SFFVRkhPMjlDUVVGRkxFOUJRVThzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMmRDUVVNeFFpeFpRVUZaTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVVNc1IwRkJVVHR2UWtGRGRrSXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8yZENRVU5rTEVOQlFVTXNRMEZCUXl4RFFVRkJPMWxCUTA0c1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFVDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXgzUWtGQmQwSXNSVUZCUlN4VlFVRlRMRWxCUVVrN1dVRkRkRU1zVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXl4RFFVTlFMRkZCUVUwc1EwRkJRU3hEUVVGRExIRkNRVUZ4UWl4RFFVRkRPMmxDUVVNM1FpeEhRVUZITEVOQlFVTXNaMEpCUVdkQ0xFVkJRVVVzUzBGQlN5eERRVUZETzJsQ1FVTTFRaXhKUVVGSkxFTkJRVU1zUlVGQlF5eExRVUZMTEVWQlFVVXNiVUpCUVcxQ0xFVkJRVU1zUTBGQlF6dHBRa0ZEYkVNc1RVRkJUU3hEUVVGRExFZEJRVWNzUlVGQlJTeFZRVUZETEVkQlFWRTdaMEpCUTJ4Q0xFbEJRVWtzUjBGQlJ6dHZRa0ZCUlN4UFFVRlBMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dG5Ra0ZETVVJc2FVSkJRVWtzUTBGQlF5eFhRVUZYTEVOQlFVTXNiVUpCUVcxQ0xFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUXl4SFFVRlJMRVZCUVVVc1NVRkJWenR2UWtGRE4wUXNTVUZCU1N4SFFVRkhPM2RDUVVGRkxFOUJRVThzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMjlDUVVNeFFpeGhRVUZOTEVOQlFVTXNUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF6dHZRa0ZETlVJc1NVRkJTU3hGUVVGRkxFTkJRVU03WjBKQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5ZTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1JVRkJSU3hEUVVGRExHZEVRVUZuUkN4RlFVRkZMRlZCUVZNc1NVRkJTVHRaUVVNNVJDeFBRVUZQTEVOQlFVTXNUMEZCUnl4RFFVRkRMRU5CUTFBc1VVRkJUU3hEUVVGQkxFTkJRVU1zY1VKQlFYRkNMRU5CUVVNN2FVSkJRemRDTEVkQlFVY3NRMEZCUXl4blFrRkJaMElzUlVGQlJTeExRVUZMTEVOQlFVTTdhVUpCUXpWQ0xFbEJRVWtzUTBGQlF5eEZRVUZETEV0QlFVc3NSVUZCUlN4UlFVRlJMRU5CUVVNc1MwRkJTeXhGUVVGRExFTkJRVU03YVVKQlF6ZENMRTFCUVUwc1EwRkJReXhIUVVGSExFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTTdVVUZETTBJc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEZRVUZGTEVOQlFVTXNLMEpCUVN0Q0xFVkJRVVVzVlVGQlV5eEpRVUZKTzFsQlF6ZERMRTlCUVU4c1EwRkJReXhQUVVGSExFTkJRVU1zUTBGRFVDeFJRVUZOTEVOQlFVRXNRMEZCUXl4eFFrRkJjVUlzUTBGQlF6dHBRa0ZETjBJc1IwRkJSeXhEUVVGRExHZENRVUZuUWl4RlFVRkZMRXRCUVVzc1EwRkJRenRwUWtGRE5VSXNTVUZCU1N4RFFVRkRMRVZCUVVVc1MwRkJTeXhGUVVGRkxHdENRVUZyUWl4RlFVRkRMRU5CUVVNN2FVSkJRMnhETEUxQlFVMHNRMEZCUXl4SFFVRkhMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRE0wSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hGUVVGRkxFTkJRVU1zY1VOQlFYRkRMRVZCUVVVc1ZVRkJVeXhKUVVGSk8xbEJRMjVFTEU5QlFVOHNRMEZCUXl4UFFVRkhMRU5CUVVNc1EwRkRVQ3hSUVVGTkxFTkJRVUVzUTBGQlF5eHhRa0ZCY1VJc1EwRkJRenRwUWtGRE4wSXNSMEZCUnl4RFFVRkRMR2RDUVVGblFpeEZRVUZGTEV0QlFVc3NRMEZCUXp0cFFrRkROVUlzU1VGQlNTeERRVUZETEVWQlFVVXNTMEZCU3l4RlFVRkZMR3RDUVVGclFpeEZRVUZGTEVOQlFVTTdhVUpCUTI1RExFMUJRVTBzUTBGQlF5eEhRVUZITEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRNMElzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4RlFVRkZMRU5CUVVNc2JVTkJRVzFETEVWQlFVVXNWVUZCVXl4SlFVRkpPMWxCUTJwRUxFOUJRVThzUTBGQlF5eFBRVUZITEVOQlFVTXNRMEZEVUN4UlFVRk5MRU5CUVVFc1EwRkJReXh4UWtGQmNVSXNRMEZCUXp0cFFrRkROMElzUjBGQlJ5eERRVUZETEdkQ1FVRm5RaXhGUVVGRkxFdEJRVXNzUTBGQlF6dHBRa0ZETlVJc1NVRkJTU3hEUVVGRExFVkJRVVVzUzBGQlN5eEZRVUZGTEZkQlFWY3NSVUZCUlN4RFFVRkRPMmxDUVVNMVFpeE5RVUZOTEVOQlFVTXNSMEZCUnl4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRek5DTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1JVRkJSU3hEUVVGRExHOUVRVUZ2UkN4RlFVRkZMRlZCUVZNc1NVRkJTVHRaUVVOc1JTeEpRVUZKTEVsQlFVa3NSMEZCVlN4SlFVRkpMR2xDUVVGSkxFTkJRVU03WjBKQlEzWkNMRWxCUVVrc1JVRkJSU3hOUVVGTk8yZENRVU5hTEV0QlFVc3NSVUZCUlN4eFFrRkJjVUk3WjBKQlF6VkNMRkZCUVZFc1JVRkJSU3h0UWtGQlVTeERRVUZETEZWQlFWVXNRMEZCUXp0blFrRkRPVUlzU1VGQlNTeEZRVUZGTEUxQlFVMDdZVUZEWml4RFFVRkRMRU5CUVVNN1dVRkRTQ3hKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFVTXNSMEZCVVN4RlFVRkZMRWxCUVZjN1owSkJRelZDTEVsQlFVa3NSMEZCUnp0dlFrRkJSU3hQUVVGUExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0blFrRkZNVUlzVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXp0eFFrRkRVQ3hKUVVGSkxFTkJRVU1zWlVGQlpTeERRVUZETzNGQ1FVTnlRaXhKUVVGSkxFTkJRVU1zUlVGQlJTeExRVUZMTEVWQlFVVXNjVUpCUVhGQ0xFVkJRVVVzVVVGQlVTeEZRVUZGTEZWQlFWVXNSVUZCUlN4RFFVRkRPM0ZDUVVNMVJDeE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRPM0ZDUVVOWUxFZEJRVWNzUTBGQlF5eFZRVUZETEVkQlFWRXNSVUZCUlN4SFFVRnhRanR2UWtGRGFrTXNTMEZCU3l4SFFVRkhMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zWjBKQlFXZENMRU5CUVVNc1EwRkJRenR2UWtGRGJFTXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJReXhEUVVOUUxGRkJRVTBzUTBGQlFTeERRVUZETEhGQ1FVRnhRaXhEUVVGRE8zbENRVU0zUWl4SFFVRkhMRU5CUVVNc1owSkJRV2RDTEVWQlFVVXNTMEZCU3l4RFFVRkRPM2xDUVVNMVFpeE5RVUZOTEVOQlFVTXNSMEZCUnl4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRE8yZENRVU16UWl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOUUxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hGUVVGRkxFTkJRVU1zYlVOQlFXMURMRVZCUVVVc1ZVRkJVeXhKUVVGSk8xbEJRMnBFTEU5QlFVOHNRMEZCUXl4UFFVRkhMRU5CUVVNc1EwRkRVQ3hSUVVGTkxFTkJRVUVzUTBGQlF5eHhRa0ZCY1VJc1EwRkJRenRwUWtGRE4wSXNUVUZCVFN4RFFVRkRMRWRCUVVjc1JVRkJSU3hKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU16UWl4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOUUxFTkJRVU1zUTBGQlF5eERRVUZETzBsQlEwZ3NVVUZCVVN4RFFVRkRMREJDUVVFd1FpeEZRVUZGTzFGQlEycERMRlZCUVZVc1EwRkJReXhWUVVGVkxFbEJRVWs3V1VGRGNrSXNTVUZCU1N4SlFVRkpMRWRCUVVjc1NVRkJTU3hwUWtGQlNTeERRVUZETzJkQ1FVTm9RaXhKUVVGSkxFVkJRVVVzVlVGQlZUdG5Ra0ZEYUVJc1MwRkJTeXhGUVVGRkxHbENRVUZwUWp0blFrRkRlRUlzU1VGQlNTeEZRVUZGTEUxQlFVMDdaMEpCUTFvc1VVRkJVU3hGUVVGRkxFMUJRVTA3WVVGRGJrSXNRMEZCUXl4RFFVRkRPMWxCUTBnc1NVRkJTU3haUVVGWkxFZEJRVWNzU1VGQlNTeHBRa0ZCU1N4RFFVRkRPMmRDUVVONFFpeEpRVUZKTEVWQlFVVXNUVUZCVFR0blFrRkRXaXhMUVVGTExFVkJRVVVzYTBKQlFXdENPMmRDUVVONlFpeEpRVUZKTEVWQlFVVXNUVUZCVFR0blFrRkRXaXhSUVVGUkxFVkJRVVVzVlVGQlZUdG5Ra0ZEY0VJc1QwRkJUeXhGUVVGRkxFbEJRVWs3WVVGRGFFSXNRMEZCUXl4RFFVRkRPMWxCUTBnc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZETEVkQlFWRTdaMEpCUTJZc1NVRkJTU3hIUVVGSE8yOUNRVUZGTEU5QlFVOHNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8yZENRVU14UWl4WlFVRlpMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVU1zUjBGQlVUdHZRa0ZEZGtJc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzJkQ1FVTmtMRU5CUVVNc1EwRkJReXhEUVVGQk8xbEJRMDRzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5eDVRa0ZCZVVJc1JVRkJSU3hWUVVGVExFbEJRVWs3V1VGRGRrTXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJRenRwUWtGRFVDeEhRVUZITEVOQlFVTXNjMEpCUVhOQ0xFTkJRVU03YVVKQlF6TkNMRWRCUVVjc1EwRkJReXhuUWtGQlowSXNSVUZCUlN4TFFVRkxMRU5CUVVNN2FVSkJRelZDTEVsQlFVa3NRMEZCUXl4RlFVRkZMRXRCUVVzc1JVRkJSU3hyUWtGQmEwSXNSVUZCUlN4RFFVRkRPMmxDUVVOdVF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RlFVRkZMRlZCUVVNc1IwRkJVVHRuUWtGRGJFSXNTVUZCU1N4SFFVRkhPMjlDUVVGRkxFOUJRVThzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMmRDUVVNeFFpeHBRa0ZCU1N4RFFVRkRMRmRCUVZjc1EwRkJReXhyUWtGQmEwSXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGRExFZEJRVkVzUlVGQlJTeEpRVUZYTzI5Q1FVTTFSQ3hKUVVGSkxFZEJRVWM3ZDBKQlFVVXNUMEZCVHl4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU03YjBKQlF6RkNMR0ZCUVUwc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRPMjlDUVVNM1FpeEpRVUZKTEVWQlFVVXNRMEZCUXp0blFrRkRXQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU5RTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTFnc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEZRVUZGTEVOQlFVTXNjVU5CUVhGRExFVkJRVVVzVlVGQlV5eEpRVUZKTzFsQlEyNUVMRTlCUVU4c1EwRkJReXhQUVVGSExFTkJRVU03YVVKQlExQXNSMEZCUnl4RFFVRkRMSE5DUVVGelFpeERRVUZETzJsQ1FVTXpRaXhIUVVGSExFTkJRVU1zWjBKQlFXZENMRVZCUVVVc1MwRkJTeXhEUVVGRE8ybENRVU0xUWl4SlFVRkpMRU5CUVVNc1JVRkJSU3hMUVVGTExFVkJRVVVzZFVKQlFYVkNMRVZCUVVNc1EwRkJRenRwUWtGRGRrTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1JVRkJSU3hKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU16UWl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5d3JRa0ZCSzBJc1JVRkJSU3hWUVVGVExFbEJRVWs3V1VGRE4wTXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJRenRwUWtGRFVDeEhRVUZITEVOQlFVTXNjMEpCUVhOQ0xFTkJRVU03YVVKQlF6TkNMRWRCUVVjc1EwRkJReXhuUWtGQlowSXNSVUZCUlN4TFFVRkxMRU5CUVVNN2FVSkJRelZDTEVsQlFVa3NRMEZCUXl4RlFVRkZMRXRCUVVzc1JVRkJSU3hwUWtGQmFVSXNSVUZCUlN4RFFVRkRPMmxDUVVOc1F5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRek5DTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1JVRkJSU3hEUVVGRExHOUVRVUZ2UkN4RlFVRkZMRlZCUVZNc1NVRkJTVHRaUVVOc1JTeEpRVUZKTEVsQlFVa3NSMEZCVlN4SlFVRkpMR2xDUVVGSkxFTkJRVU03WjBKQlEzWkNMRWxCUVVrc1JVRkJSU3hOUVVGTk8yZENRVU5hTEV0QlFVc3NSVUZCUlN4eFFrRkJjVUk3WjBKQlF6VkNMRkZCUVZFc1JVRkJSU3h0UWtGQlVTeERRVUZETEZWQlFWVXNRMEZCUXp0blFrRkRPVUlzU1VGQlNTeEZRVUZGTEUxQlFVMDdZVUZEWml4RFFVRkRMRU5CUVVNN1dVRkRTQ3hKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFVTXNSMEZCVVN4RlFVRkZMRWxCUVZjN1owSkJRelZDTEVsQlFVa3NSMEZCUnp0dlFrRkJSU3hQUVVGUExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0blFrRkZNVUlzVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXp0eFFrRkRVQ3hKUVVGSkxFTkJRVU1zWlVGQlpTeERRVUZETzNGQ1FVTnlRaXhKUVVGSkxFTkJRVU1zUlVGQlJTeExRVUZMTEVWQlFVVXNjVUpCUVhGQ0xFVkJRVVVzVVVGQlVTeEZRVUZGTEZWQlFWVXNSVUZCUlN4RFFVRkRPM0ZDUVVNMVJDeE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRPM0ZDUVVOWUxFZEJRVWNzUTBGQlF5eFZRVUZETEVkQlFWRXNSVUZCUlN4SFFVRnhRanR2UWtGRGFrTXNTMEZCU3l4SFFVRkhMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zWjBKQlFXZENMRU5CUVVNc1EwRkJRenR2UWtGRGJFTXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJRenQ1UWtGRFVDeEhRVUZITEVOQlFVTXNjMEpCUVhOQ0xFTkJRVU03ZVVKQlF6TkNMRWRCUVVjc1EwRkJReXhuUWtGQlowSXNSVUZCUlN4TFFVRkxMRU5CUVVNN2VVSkJRelZDTEUxQlFVMHNRMEZCUXl4SFFVRkhMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU03WjBKQlF6TkNMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMWdzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5eHRRMEZCYlVNc1JVRkJSU3hWUVVGVExFbEJRVWs3V1VGRGFrUXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJRenRwUWtGRFVDeEhRVUZITEVOQlFVTXNjMEpCUVhOQ0xFTkJRVU03YVVKQlF6TkNMRWxCUVVrc1EwRkJReXhGUVVGRkxFdEJRVXNzUlVGQlJTeHBRa0ZCYVVJc1JVRkJSU3hEUVVGRE8ybENRVU5zUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzFGQlF6TkNMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMUFzUTBGQlF5eERRVUZETEVOQlFVTTdRVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJReUo5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xucmVxdWlyZShcIm1vY2hhXCIpO1xudmFyIGF4aW9zXzEgPSByZXF1aXJlKFwiYXhpb3NcIik7XG52YXIgY2hhaV8xID0gcmVxdWlyZShcImNoYWlcIik7XG52YXIgYXhpb3NfbW9ja19hZGFwdGVyXzEgPSByZXF1aXJlKFwiYXhpb3MtbW9jay1hZGFwdGVyXCIpO1xudmFyIHJlZHV4X21vY2tfc3RvcmVfMSA9IHJlcXVpcmUoXCJyZWR1eC1tb2NrLXN0b3JlXCIpO1xudmFyIHJlZHV4X3RodW5rXzEgPSByZXF1aXJlKFwicmVkdXgtdGh1bmtcIik7XG52YXIgdXNlckFjdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvd2ViL2FjdGlvbnMvdXNlckFjdGlvbnNcIik7XG52YXIgbm90aWZpY2F0aW9uc0FjdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvd2ViL2FjdGlvbnMvbm90aWZpY2F0aW9uc0FjdGlvbnNcIik7XG52YXIgc29ja2V0QWN0aW9uc18xID0gcmVxdWlyZShcIi4uLy4uL3NyYy93ZWIvYWN0aW9ucy9zb2NrZXRBY3Rpb25zXCIpO1xudmFyIGNoYW5uZWxzQWN0aW9uc18xID0gcmVxdWlyZShcIi4uLy4uL3NyYy93ZWIvYWN0aW9ucy9jaGFubmVsc0FjdGlvbnNcIik7XG52YXIgY2hhdFVzZXJzQWN0aW9uc18xID0gcmVxdWlyZShcIi4uLy4uL3NyYy93ZWIvYWN0aW9ucy9jaGF0VXNlcnNBY3Rpb25zXCIpO1xudmFyIG1vY2tTdG9yZUNyZWF0b3IgPSByZWR1eF9tb2NrX3N0b3JlXzFbXCJkZWZhdWx0XCJdKFtyZWR1eF90aHVua18xW1wiZGVmYXVsdFwiXV0pO1xuZnVuY3Rpb24gZ2V0U3RvcmUoc3RvcmUpIHtcbiAgICBpZiAoc3RvcmUgPT09IHZvaWQgMCkgeyBzdG9yZSA9IHt9OyB9XG4gICAgcmV0dXJuIG1vY2tTdG9yZUNyZWF0b3Ioc3RvcmUpO1xufVxuZGVzY3JpYmUoJ0FzeW5jIEFjdGlvbnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG1vY2tTdG9yZTtcbiAgICB2YXIgbW9ja0F4aW9zO1xuICAgIGJlZm9yZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIG1vY2tBeGlvcyA9IG5ldyBheGlvc19tb2NrX2FkYXB0ZXJfMVtcImRlZmF1bHRcIl0oYXhpb3NfMVtcImRlZmF1bHRcIl0pO1xuICAgIH0pO1xuICAgIGFmdGVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbW9ja0F4aW9zLnJlc3RvcmUoKTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnVXNlciBhc3luYyBhY3Rpb25zJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG1vY2tTdG9yZSA9IGdldFN0b3JlKCk7XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5vbkFueSgpLnJlcGx5KDIwMCwge30pO1xuICAgICAgICB9KTtcbiAgICAgICAgZGVzY3JpYmUoJ3VwZGF0ZU5hbWUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpdCgnc2hvdWxkIGhhbmRsZSBjYWxsYmFjayBhbmQgc2V0IGluZm8gJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgICAgICAuZGlzcGF0Y2godXNlckFjdGlvbnNfMS51cGRhdGVOYW1lKCdBZHJpYW4nLCBmdW5jdGlvbiAoKSB7IHJldHVybiBuYW1lID0gJ0Fkcmlhbic7IH0pKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwobmFtZSwgJ0FkcmlhbicpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5BRERfSU5GTyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAnTmFtZSB1cGRhdGVkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfV0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShkb25lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXQoJ3Nob3VsZCBzZXQgYW4gZXJyb3Igb24gZmFpbGVkIHJlcXVlc3QnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgbW9ja0F4aW9zLm9uUG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9uYW1lJykucmVwbHkoNTAwLCB7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnIH0pO1xuICAgICAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgICAgICAuZGlzcGF0Y2godXNlckFjdGlvbnNfMS51cGRhdGVOYW1lKCdBZHJpYW4nLCBmdW5jdGlvbiAoKSB7IHJldHVybiBuYW1lID0gJ0Fkcmlhbic7IH0pKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwobmFtZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5BRERfRVJST1IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJ1NvbWV0aGluZyB3ZW50IHdyb25nJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfV0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShkb25lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZGVzY3JpYmUoJ3VwZGF0ZUVtYWlsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaXQoJ3Nob3VsZCBzZXQgYW4gZXJyb3Igb24gZmFpbGVkIHJlcXVlc3QnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgICAgIHZhciBlbWFpbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgICAgIG1vY2tBeGlvcy5vblBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvZW1haWwnKS5yZXBseSg1MDAsIHsgZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZycgfSk7XG4gICAgICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgICAgIC5kaXNwYXRjaCh1c2VyQWN0aW9uc18xLnVwZGF0ZUVtYWlsKCd0ZXN0QHRlc3QuY29tJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gZW1haWwgPSAndGVzdEB0ZXN0LmNvbSc7IH0pKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNGYWxzZShlbWFpbCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBub3RpZmljYXRpb25zQWN0aW9uc18xLkFERF9FUlJPUixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpdCgnc2hvdWxkIGhhbmRsZSBjYWxsYmFjayBhbmQgc2V0IGluZm8nLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgICAgIHZhciBlbWFpbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgICAgICAuZGlzcGF0Y2godXNlckFjdGlvbnNfMS51cGRhdGVFbWFpbCgndGVzdEB0ZXN0LmNvbScsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVtYWlsID0gJ3Rlc3RAdGVzdC5jb20nOyB9KSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKGVtYWlsLCAndGVzdEB0ZXN0LmNvbScpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5BRERfSU5GTyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAnRW1haWwgdXBkYXRlZCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlc2NyaWJlKCd1cGRhdGVQYXNzd29yZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGl0KCdzaG91bGQgc2V0IGluZm8nLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgICAgIHZhciB1cGRhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgbW9ja1N0b3JlLmRpc3BhdGNoKHVzZXJBY3Rpb25zXzEudXBkYXRlUGFzc3dvcmQoJ2EnLCAnYicsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVwZGF0ZWQgPSB0cnVlOyB9KSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzVHJ1ZSh1cGRhdGVkKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuQUREX0lORk8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJ1Bhc3N3b3JkIHVwZGF0ZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpdCgnc2hvdWxkIHNldCBhbiBlcnJvciBvbiBmYWlsZWQgcmVxdWVzdCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICAgICAgdmFyIHVwZGF0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgICAgICBtb2NrQXhpb3Mub25Qb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL3Bhc3N3b3JkJykucmVwbHkoNTAwLCB7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnIH0pO1xuICAgICAgICAgICAgICAgIG1vY2tTdG9yZS5kaXNwYXRjaCh1c2VyQWN0aW9uc18xLnVwZGF0ZVBhc3N3b3JkKCdhJywgJ2InLCBmdW5jdGlvbiAoKSB7IHJldHVybiB1cGRhdGVkID0gdHJ1ZTsgfSkpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKHVwZGF0ZWQpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5BRERfRVJST1IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJ1NvbWV0aGluZyB3ZW50IHdyb25nJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfV0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShkb25lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZGVzY3JpYmUoJ2NyZWF0ZVVzZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpdCgnc2hvdWxkIHNldCBpbmZvIG9uIHN1Y2Nlc3MnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgICAgICAuZGlzcGF0Y2godXNlckFjdGlvbnNfMS5jcmVhdGVVc2VyKCdOYW1lJywgJ2VtYWlsQHRlc3QuY29tJywgJ3VzZXInKSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFtub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEluZm8oJ05ldyB1c2VyIGNyZWF0ZWQnKV0pO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShkb25lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXQoJ3Nob3VsZCBzZXQgZXJyb3Igb24gZmFpbHVyZScsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgbW9ja0F4aW9zLm9uQW55KCkucmVwbHkoNDAwLCB7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnIH0pO1xuICAgICAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgICAgICAuZGlzcGF0Y2godXNlckFjdGlvbnNfMS5jcmVhdGVVc2VyKCdOYW1lJywgJ2VtYWlsQHRlc3QuY29tJywgJ3VzZXInKSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFtub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZycpXSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBkZXNjcmliZSgnZWRpdFVzZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpdCgnc2hvdWxkIHNldCBpbmZvIG9uIHN1Y2Nlc3MnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgICAgICAuZGlzcGF0Y2godXNlckFjdGlvbnNfMS5lZGl0VXNlcignb3JpZ2luYWxAdGVzdC5jb20nLCAnTmFtZScsICdlbWFpbEB0ZXN0LmNvbScsICd1c2VyJykpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRJbmZvKCdDaGFuZ2VzIHNhdmVkJyldKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGl0KCdzaG91bGQgc2V0IGVycm9yIG9uIGZhaWx1cmUnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgICAgIG1vY2tBeGlvcy5vbkFueSgpLnJlcGx5KDQwMCwgeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyB9KTtcbiAgICAgICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAgICAgLmRpc3BhdGNoKHVzZXJBY3Rpb25zXzEuZWRpdFVzZXIoJ29yaWdpbmFsQHRlc3QuY29tJywgJ05hbWUnLCAnZW1haWxAdGVzdC5jb20nLCAndXNlcicpKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW25vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nJyldKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlc2NyaWJlKCdkZWxldGVVc2VyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaXQoJ3Nob3VsZCBzZXQgaW5mbyBvbiBzdWNjZXNzJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAgICAgLmRpc3BhdGNoKHVzZXJBY3Rpb25zXzEuZGVsZXRlVXNlcigndXNlckB0ZXN0LmNvbScpKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW25vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkSW5mbygnVXNlciBkZWxldGVkJyldKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGl0KCdzaG91bGQgc2V0IGVycm9yIG9uIGZhaWx1cmUnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgICAgIG1vY2tBeGlvcy5vbkFueSgpLnJlcGx5KDQwMCwgeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyB9KTtcbiAgICAgICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAgICAgLmRpc3BhdGNoKHVzZXJBY3Rpb25zXzEuZGVsZXRlVXNlcigndGVzdEB0ZXN0LmNvbScpKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW25vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nJyldKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlc2NyaWJlKCdyZXN0b3JlVXNlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGl0KCdzaG91bGQgc2V0IGluZm8gb24gc3VjY2VzcycsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgICAgIC5kaXNwYXRjaCh1c2VyQWN0aW9uc18xLnJlc3RvcmVVc2VyKCd1c2VyQHRlc3QuY29tJykpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRJbmZvKCdVc2VyIHJlc3RvcmVkJyldKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGl0KCdzaG91bGQgc2V0IGVycm9yIG9uIGZhaWx1cmUnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgICAgIG1vY2tBeGlvcy5vbkFueSgpLnJlcGx5KDQwMCwgeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyB9KTtcbiAgICAgICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAgICAgLmRpc3BhdGNoKHVzZXJBY3Rpb25zXzEucmVzdG9yZVVzZXIoJ3Rlc3RAdGVzdC5jb20nKSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFtub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZycpXSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdDaGFubmVscyBhc3luYyBhY3Rpb25zJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG1vY2tTdG9yZSA9IG1vY2tTdG9yZUNyZWF0b3Ioe1xuICAgICAgICAgICAgICAgIGNoYW5uZWxzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbmFtZTogJ2dlbmVyYWwnLCBmZXRjaGluZ05ld01lc3NhZ2VzOiBmYWxzZSwgaGFzTW9yZU1lc3NhZ2VzOiB0cnVlLCByZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0OiAwIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbmFtZTogJ2ZldGNoaW5nIG5ldyBtZXNzYWdlcycsIGZldGNoaW5nTmV3TWVzc2FnZXM6IHRydWUsIGhhc01vcmVNZXNzYWdlczogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgICAgICB7IG5hbWU6ICdubyBtb3JlIG1lc3NhZ2VzJywgZmV0Y2hpbmdOZXdNZXNzYWdlczogZmFsc2UsIGhhc01vcmVNZXNzYWdlczogZmFsc2UgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3Mub25BbnkoKS5yZXBseSgyMDAsIHt9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmV0Y2ggY2hhbm5lbHMgYW5kIGRpc3BhdGNoIGFkZENoYW5uZWxzIHdpdGggYW4gYXJyYXkgb2YgY2hhbm5lbCBuYW1lcycsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICB2YXIgY2hhbm5lbHMgPSBbXG4gICAgICAgICAgICAgICAgeyBfaWQ6ICcxJywgbmFtZTogJ2dlbmVyYWwnIH0sXG4gICAgICAgICAgICAgICAgeyBfaWQ6ICcyJywgbmFtZTogJ3JhbmRvbScgfSxcbiAgICAgICAgICAgICAgICB7IF9pZDogJzMnLCBuYW1lOiAnc29tZXRoaW5nIGVsc2UnIH1cbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvc1xuICAgICAgICAgICAgICAgIC5vbkdldCgnL2FwaS92MS9jaGFubmVscycpXG4gICAgICAgICAgICAgICAgLnJlcGx5KDIwMCwgeyBjaGFubmVsczogY2hhbm5lbHMgfSk7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuZmV0Y2hDaGFubmVscygpKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgdmFyIGFkZENoYW5uZWxzQWN0aW9uID0gY2hhbm5lbHNBY3Rpb25zXzEuYWRkQ2hhbm5lbHMoWydnZW5lcmFsJywgJ3JhbmRvbScsICdzb21ldGhpbmcgZWxzZSddKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbYWRkQ2hhbm5lbHNBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCBhZGRFcnJvciBvbiBmYWlsZWQgcmVxdWVzdCB0byAvYXBpL3YxL2NoYW5uZWxzJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zXG4gICAgICAgICAgICAgICAgLm9uR2V0KCcvYXBpL3YxL2NoYW5uZWxzJylcbiAgICAgICAgICAgICAgICAucmVwbHkoNTAwKTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5mZXRjaENoYW5uZWxzKCkpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JBY3Rpb24gPSBub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gZmV0Y2ggdGhlIGNoYW5uZWxzJyk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW2Vycm9yQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZGlzcGF0Y2ggYW4gZXJyb3IgaWYgcmV0cmlldmluZyBtZXNzYWdlcyB3aXRoIGludmFsaWQgY2hhbm5lbCBuYW1lJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5yZXRyaWV2ZUNoYW5uZWxNZXNzYWdlcygnaW52YWxpZCBuYW1lJykpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKG1zZykge1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwobXNnLCAnUmV0cmlldmUgQ2hhbm5lbCBNZXNzYWdlcyBkaXNwYXRjaGVkIHdpdGggaW5jb3JyZWN0IGNoYW5uZWwgbmFtZSBvciB3aGlsZSBhbHJlYWR5IGZldGNoaW5nIG1lc3NhZ2VzJyk7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgIHZhciBlcnJvckFjdGlvbiA9IG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBmZXRjaCBtZXNzYWdlcycpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFtlcnJvckFjdGlvbl0pO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGRpc3BhdGNoIGFuIGVycm9yIGlmIGFscmVhZHkgcmV0cmlldmluZyBjaGFubmVsIG1lc3NhZ2VzJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5yZXRyaWV2ZUNoYW5uZWxNZXNzYWdlcygnZmV0Y2hpbmcgbmV3IG1lc3NhZ2VzJykpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKG1zZykge1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwobXNnLCAnUmV0cmlldmUgQ2hhbm5lbCBNZXNzYWdlcyBkaXNwYXRjaGVkIHdpdGggaW5jb3JyZWN0IGNoYW5uZWwgbmFtZSBvciB3aGlsZSBhbHJlYWR5IGZldGNoaW5nIG1lc3NhZ2VzJyk7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgIHZhciBlcnJvckFjdGlvbiA9IG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBmZXRjaCBtZXNzYWdlcycpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFtlcnJvckFjdGlvbl0pO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGRpc3BhdGNoIGFuIGVycm9yIGlmIGNoYW5uZWwgZG9lcyBub3QgaGF2ZSBvbGRlciBtZXNzYWdlcycsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEucmV0cmlldmVDaGFubmVsTWVzc2FnZXMoJ25vIG1vcmUgbWVzc2FnZXMnKSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChtc2csICdSZXRyaWV2ZSBDaGFubmVsIE1lc3NhZ2VzIGRpc3BhdGNoZWQgd2l0aCBpbmNvcnJlY3QgY2hhbm5lbCBuYW1lIG9yIHdoaWxlIGFscmVhZHkgZmV0Y2hpbmcgbWVzc2FnZXMnKTtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgdmFyIGVycm9yQWN0aW9uID0gbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIGZldGNoIG1lc3NhZ2VzJyk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW2Vycm9yQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZGlzcGF0Y2ggYW4gZXJyb3Igb24gZmFpbGVkIGdldCByZXF1ZXN0IHRvIC9hcGkvdjEvbWVzc2FnZXMvJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zXG4gICAgICAgICAgICAgICAgLm9uR2V0KClcbiAgICAgICAgICAgICAgICAucmVwbHkoNTAwKTtcbiAgICAgICAgICAgIHZhciBjaGFubmVsID0gJ2dlbmVyYWwnO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLnJldHJpZXZlQ2hhbm5lbE1lc3NhZ2VzKGNoYW5uZWwpKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgdmFyIHNldEZldGNoaW5nVHJ1ZUFjdGlvbiA9IGNoYW5uZWxzQWN0aW9uc18xLnNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzKGNoYW5uZWwsIHRydWUpO1xuICAgICAgICAgICAgICAgIHZhciBlcnJvckFjdGlvbiA9IG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBmZXRjaCBtZXNzYWdlcycpO1xuICAgICAgICAgICAgICAgIHZhciBzZXRGZXRjaGluZ0ZhbHNlQWN0aW9uID0gY2hhbm5lbHNBY3Rpb25zXzEuc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMoY2hhbm5lbCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFtzZXRGZXRjaGluZ1RydWVBY3Rpb24sIGVycm9yQWN0aW9uLCBzZXRGZXRjaGluZ0ZhbHNlQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgc2V0IGNoYW5uZWxIYXNNb3JlTWVzc2FnZXMgb24gcmVzcG9uc2Ugd2l0aCBlbXB0eSBhcnJheScsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvc1xuICAgICAgICAgICAgICAgIC5vbkdldCgpXG4gICAgICAgICAgICAgICAgLnJlcGx5KDIwMCwgeyBtZXNzYWdlczogW10gfSk7XG4gICAgICAgICAgICB2YXIgY2hhbm5lbCA9ICdnZW5lcmFsJztcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5yZXRyaWV2ZUNoYW5uZWxNZXNzYWdlcyhjaGFubmVsKSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgIHZhciBzZXRGZXRjaGluZ1RydWVBY3Rpb24gPSBjaGFubmVsc0FjdGlvbnNfMS5zZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcyhjaGFubmVsLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB2YXIgc2V0SGFzTW9yZUFjdGlvbiA9IGNoYW5uZWxzQWN0aW9uc18xLnNldENoYW5uZWxIYXNNb3JlTWVzc2FnZXMoY2hhbm5lbCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHZhciBzZXRGZXRjaGluZ0ZhbHNlQWN0aW9uID0gY2hhbm5lbHNBY3Rpb25zXzEuc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMoY2hhbm5lbCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFtzZXRGZXRjaGluZ1RydWVBY3Rpb24sIHNldEhhc01vcmVBY3Rpb24sIHNldEZldGNoaW5nRmFsc2VBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBpbmNyZW1lbnQgb2Zmc2V0IChiYXNlZCBvbiBudW1iZXIgb2YgcmVjZWl2ZWQgbWVzc2FnZXMpIGFuZCBhZGQgcmV0cmlldmVkIGNoYW5uZWwgbWVzc2FnZXMgb24gc3VjY2Vzc2Z1bCByZXRyZWl2ZUNoYW5uZWxNZXNzYWdlcyBhY3Rpb24nLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdmFyIGNoYW5uZWwgPSAnZ2VuZXJhbCc7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZXMgPSBbe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnMTIzJyxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZDogRGF0ZS5ub3coKS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICB1c2VyRW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICAgICAgX2lkOiAnMSdcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICc0NTYnLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkOiBEYXRlLm5vdygpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHVzZXJFbWFpbDogJ3Rlc3RAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgICAgICBfaWQ6ICcyJ1xuICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3NcbiAgICAgICAgICAgICAgICAub25HZXQoKVxuICAgICAgICAgICAgICAgIC5yZXBseSgyMDAsIHsgbWVzc2FnZXM6IG1lc3NhZ2VzIH0pO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLnJldHJpZXZlQ2hhbm5lbE1lc3NhZ2VzKGNoYW5uZWwpKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgdmFyIHNldEZldGNoaW5nVHJ1ZUFjdGlvbiA9IGNoYW5uZWxzQWN0aW9uc18xLnNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzKGNoYW5uZWwsIHRydWUpO1xuICAgICAgICAgICAgICAgIHZhciBpbmNyZW1lbnRPZmZzZXRBY3Rpb24gPSBjaGFubmVsc0FjdGlvbnNfMS5pbmNyZW1lbnRDaGFubmVsUmV0cmlldmVNZXNzYWdlc09mZnNldChjaGFubmVsLCBtZXNzYWdlcy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIHZhciBhZGRNZXNzYWdlc0FjdGlvbiA9IGNoYW5uZWxzQWN0aW9uc18xLmFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcyhjaGFubmVsLCBtZXNzYWdlcyk7XG4gICAgICAgICAgICAgICAgdmFyIHNldEZldGNoaW5nRmFsc2VBY3Rpb24gPSBjaGFubmVsc0FjdGlvbnNfMS5zZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcyhjaGFubmVsLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW1xuICAgICAgICAgICAgICAgICAgICBzZXRGZXRjaGluZ1RydWVBY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgIGluY3JlbWVudE9mZnNldEFjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgYWRkTWVzc2FnZXNBY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgIHNldEZldGNoaW5nRmFsc2VBY3Rpb25cbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCBpbmZvIG9uIHN1Y2Nlc3NmdWxseSBkZWxldGluZyBjaGFubmVsJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHZhciBjaGFubmVscyA9IFtcbiAgICAgICAgICAgICAgICB7IF9pZDogJzEnLCBuYW1lOiAnZ2VuZXJhbCcgfSxcbiAgICAgICAgICAgICAgICB7IF9pZDogJzInLCBuYW1lOiAncmFuZG9tJyB9LFxuICAgICAgICAgICAgICAgIHsgX2lkOiAnMycsIG5hbWU6ICdzb21ldGhpbmcgZWxzZScgfVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zXG4gICAgICAgICAgICAgICAgLm9uR2V0KCcvYXBpL3YxL2NoYW5uZWxzJylcbiAgICAgICAgICAgICAgICAucmVwbHkoMjAwLCB7IGNoYW5uZWxzOiBjaGFubmVscyB9KTtcbiAgICAgICAgICAgIG1vY2tBeGlvc1xuICAgICAgICAgICAgICAgIC5vbkdldCgpXG4gICAgICAgICAgICAgICAgLnJlcGx5KDIwMCk7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuZGVsZXRlQ2hhbm5lbCgnZ2VuZXJhbCcpKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgdmFyIGFkZEluZm9BY3Rpb24gPSBub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEluZm8oJ0NoYW5uZWwgZGVsZXRlZCcpO1xuICAgICAgICAgICAgICAgIHZhciBhZGRDaGFubmVsc0FjdGlvbiA9IGNoYW5uZWxzQWN0aW9uc18xLmFkZENoYW5uZWxzKFsnZ2VuZXJhbCcsICdyYW5kb20nLCAnc29tZXRoaW5nIGVsc2UnXSk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW2FkZEluZm9BY3Rpb24sIGFkZENoYW5uZWxzQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZGlzcGF0Y2ggYW4gZXJyb3Igb24gZmFpbGVkIGF0dGVtcHQgdG8gZGVsZXRlIGNoYW5uZWwnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3NcbiAgICAgICAgICAgICAgICAub25HZXQoKVxuICAgICAgICAgICAgICAgIC5yZXBseSg1MDAsIHsgZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZycgfSk7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuZGVsZXRlQ2hhbm5lbCgnZ2VuZXJhbCcpKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgdmFyIGFkZEVycm9yQWN0aW9uID0gbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3JvbmcnKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbYWRkRXJyb3JBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCBpbmZvIG9uIGNyZWF0aW5nIG5ldyBjaGFubmVsJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHZhciBjaGFubmVscyA9IFtcbiAgICAgICAgICAgICAgICB7IF9pZDogJzEnLCBuYW1lOiAnZ2VuZXJhbCcgfSxcbiAgICAgICAgICAgICAgICB7IF9pZDogJzInLCBuYW1lOiAncmFuZG9tJyB9LFxuICAgICAgICAgICAgICAgIHsgX2lkOiAnMycsIG5hbWU6ICdzb21ldGhpbmcgZWxzZScgfVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zXG4gICAgICAgICAgICAgICAgLm9uR2V0KCcvYXBpL3YxL2NoYW5uZWxzJylcbiAgICAgICAgICAgICAgICAucmVwbHkoMjAwLCB7IGNoYW5uZWxzOiBjaGFubmVscyB9KTtcbiAgICAgICAgICAgIG1vY2tBeGlvc1xuICAgICAgICAgICAgICAgIC5vblBvc3QoKVxuICAgICAgICAgICAgICAgIC5yZXBseSgyMDApO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmFkZENoYW5uZWwoJ25ldyBjaGFubmVsJykpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB2YXIgYWRkSW5mb0FjdGlvbiA9IG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkSW5mbygnQ2hhbm5lbCBjcmVhdGVkJyk7XG4gICAgICAgICAgICAgICAgdmFyIGFkZENoYW5uZWxzQWN0aW9uID0gY2hhbm5lbHNBY3Rpb25zXzEuYWRkQ2hhbm5lbHMoWydnZW5lcmFsJywgJ3JhbmRvbScsICdzb21ldGhpbmcgZWxzZSddKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbYWRkSW5mb0FjdGlvbiwgYWRkQ2hhbm5lbHNBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCBhbiBlcnJvciBvbiBmYWlsZWQgYXR0ZW1wdCB0byBjcmVhdGUgYSBuZXcgY2hhbm5lbCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvc1xuICAgICAgICAgICAgICAgIC5vbkFueSgpXG4gICAgICAgICAgICAgICAgLnJlcGx5KDUwMCwgeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyB9KTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5hZGRDaGFubmVsKCduZXcgY2hhbm5lbCcpKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgdmFyIGFkZEVycm9yQWN0aW9uID0gbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3JvbmcnKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbYWRkRXJyb3JBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnU29ja2V0IGFzeW5jIGFjdGlvbnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbW9ja1N0b3JlID0gZ2V0U3RvcmUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgaW5pdGlhbGl6ZSB3ZWJzb2NrZXQgY29ubmVjdGlvbicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG1vY2tTdG9yZS5kaXNwYXRjaChzb2NrZXRBY3Rpb25zXzEuaW5pdCgpKTtcbiAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwoYWN0aW9uc1swXS50eXBlLCBzb2NrZXRBY3Rpb25zXzEuSU5JVF9XRUJTT0NLRVQpO1xuICAgICAgICAgICAgYWN0aW9uc1swXS5kYXRhLmlvLmNsb3NlKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdDaGF0IFVzZXJzIGFzeW5jIGFjdGlvbnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbW9ja1N0b3JlID0gZ2V0U3RvcmUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZGlwYXRjaCB1cGRhdGVVc2VycyBvbiBmZXRjaCBhbGwgdXNlcnMnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdmFyIHVzZXJzUmVzcG9uc2UgPSBbe1xuICAgICAgICAgICAgICAgICAgICBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiAnYWRtaW4nLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAndGVzdCdcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiAndGVzdDJAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiAnZ2VuZXJhbCcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICd0ZXN0J1xuICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgdmFyIHVzZXJzID0ge307XG4gICAgICAgICAgICB1c2Vyc1Jlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gKHUpIHtcbiAgICAgICAgICAgICAgICB1c2Vyc1t1LmVtYWlsXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiB1LnJvbGVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5vbkFueSgpLnJlcGx5KDIwMCwgeyB1c2VyczogdXNlcnNSZXNwb25zZSB9KTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChjaGF0VXNlcnNBY3Rpb25zXzEuZmV0Y2hBbGxVc2VycygpKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgdmFyIHVwZGF0ZVVzZXJzQWN0aW9uID0gY2hhdFVzZXJzQWN0aW9uc18xLnVwZGF0ZVVzZXJzKHVzZXJzKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbdXBkYXRlVXNlcnNBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCBhZGRFcnJvciBvbiBmYWlsZWQgYXR0ZW1wdCB0byBmZXRjaCB1c2VycycsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5vbkFueSgpLnJlcGx5KDUwMCk7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2goY2hhdFVzZXJzQWN0aW9uc18xLmZldGNoQWxsVXNlcnMoKSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgIHZhciBhZGRFcnJvckFjdGlvbiA9IG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ0ZldGNoaW5nIGFsbCB1c2VycyBmYWlsZWQnKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbYWRkRXJyb3JBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pZEdWemRFRnplVzVqUVdOMGFXOXVjeTVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUwzUmxjM1J6TDNkbFlpOTBaWE4wUVhONWJtTkJZM1JwYjI1ekxuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCUVVFc2FVSkJRV1U3UVVGRFppd3JRa0ZCTUVJN1FVRkRNVUlzTmtKQlFUaENPMEZCUXpsQ0xIbEVRVUUyUXp0QlFVTTNReXh4UkVGQmMwWTdRVUZEZEVZc01rTkJRU3RDTzBGQlF5OUNMR2xGUVVFeVNUdEJRVVV6U1N4dFJrRkJiMGM3UVVGRmNFY3NjVVZCUVhOSE8wRkJRM1JITEhsRlFVRnZVanRCUVVOd1Vpd3lSVUZCYjBZN1FVRkpjRVlzU1VGQlRTeG5Ra0ZCWjBJc1IwRkJjVUlzTmtKQlFXTXNRMEZCUXl4RFFVRkRMSGRDUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETzBGQlJXNUZMRk5CUVZNc1VVRkJVU3hEUVVGRExFdEJRVlU3U1VGQlZpeHpRa0ZCUVN4RlFVRkJMRlZCUVZVN1NVRkRlRUlzVDBGQlR5eG5Ra0ZCWjBJc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dEJRVU51UXl4RFFVRkRPMEZCUlVRc1VVRkJVU3hEUVVGRExHVkJRV1VzUlVGQlJUdEpRVU4wUWl4SlFVRkpMRk5CUVhGRExFTkJRVU03U1VGRE1VTXNTVUZCU1N4VFFVRnpRaXhEUVVGRE8wbEJSVE5DTEUxQlFVMHNRMEZCUXp0UlFVTklMRk5CUVZNc1IwRkJSeXhKUVVGSkxDdENRVUZYTEVOQlFVTXNhMEpCUVVzc1EwRkJReXhEUVVGRE8wbEJRM1pETEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUlVnc1MwRkJTeXhEUVVGRE8xRkJRMFlzVTBGQlV5eERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRPMGxCUTNoQ0xFTkJRVU1zUTBGQlF5eERRVUZETzBsQlJVZ3NVVUZCVVN4RFFVRkRMRzlDUVVGdlFpeEZRVUZGTzFGQlF6TkNMRlZCUVZVc1EwRkJRenRaUVVOUUxGTkJRVk1zUjBGQlJ5eFJRVUZSTEVWQlFVVXNRMEZCUXp0WlFVTjJRaXhUUVVGVExFTkJRVU1zUzBGQlN5eEZRVUZGTEVOQlFVTTdXVUZEYkVJc1UwRkJVeXhEUVVGRExFdEJRVXNzUlVGQlJTeERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRVZCUVVVc1JVRkJSU3hEUVVGRExFTkJRVUU3VVVGRGNFTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hSUVVGUkxFTkJRVU1zV1VGQldTeEZRVUZGTzFsQlEyNUNMRVZCUVVVc1EwRkJReXh6UTBGQmMwTXNSVUZCUlN4VlFVRlZMRWxCUVVrN1owSkJRM0pFTEVsQlFVa3NTVUZCU1N4SFFVRnRRaXhMUVVGTExFTkJRVU03WjBKQlEycERMRk5CUVZNN2NVSkJRMG9zVVVGQlVTeERRVUZETEhkQ1FVRlZMRU5CUVVNc1VVRkJVU3hGUVVGRkxHTkJRVTBzVDBGQlFTeEpRVUZKTEVkQlFVY3NVVUZCVVN4RlFVRm1MRU5CUVdVc1EwRkJReXhEUVVGRE8zRkNRVU55UkN4SlFVRkpMRU5CUVVNN2IwSkJRMFlzWVVGQlRTeERRVUZETEZkQlFWY3NRMEZCUXl4SlFVRkpMRVZCUVVVc1VVRkJVU3hEUVVGRExFTkJRVU03YjBKQlEyNURMRWxCUVUwc1QwRkJUeXhIUVVGblFpeFRRVUZUTEVOQlFVTXNWVUZCVlN4RlFVRkZMRU5CUVVNN2IwSkJRM0JFTEdGQlFVMHNRMEZCUXl4bFFVRmxMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU03TkVKQlF6ZENMRWxCUVVrc1JVRkJSU3dyUWtGQlVUczBRa0ZEWkN4SlFVRkpMRVZCUVVVc1kwRkJZenQ1UWtGRGRrSXNRMEZCUXl4RFFVRkRMRU5CUVVNN2IwSkJRMG9zU1VGQlNTeEZRVUZGTEVOQlFVTTdaMEpCUTFnc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlN5eERRVUZCTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1dVRkRka0lzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEU0N4RlFVRkZMRU5CUVVNc2RVTkJRWFZETEVWQlFVVXNWVUZCVlN4SlFVRkpPMmRDUVVOMFJDeEpRVUZKTEVsQlFVa3NSMEZCYlVJc1MwRkJTeXhEUVVGRE8yZENRVU5xUXl4VFFVRlRMRU5CUVVNc1MwRkJTeXhGUVVGRkxFTkJRVU03WjBKQlEyeENMRk5CUVZNc1EwRkJReXhOUVVGTkxFTkJRVU1zTUVKQlFUQkNMRU5CUVVNc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eEZRVUZGTEVWQlFVVXNTMEZCU3l4RlFVRkZMSE5DUVVGelFpeEZRVUZGTEVOQlFVTXNRMEZCUXp0blFrRkRNMFlzVTBGQlV6dHhRa0ZEU2l4UlFVRlJMRU5CUVVNc2QwSkJRVlVzUTBGQlF5eFJRVUZSTEVWQlFVVXNZMEZCVFN4UFFVRkJMRWxCUVVrc1IwRkJSeXhSUVVGUkxFVkJRV1lzUTBGQlpTeERRVUZETEVOQlFVTTdjVUpCUTNKRUxFbEJRVWtzUTBGQlF6dHZRa0ZEUml4aFFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExFbEJRVWtzUlVGQlJTeExRVUZMTEVOQlFVTXNRMEZCUXp0dlFrRkRhRU1zU1VGQlRTeFBRVUZQTEVkQlFXZENMRk5CUVZNc1EwRkJReXhWUVVGVkxFVkJRVVVzUTBGQlF6dHZRa0ZEY0VRc1lVRkJUU3hEUVVGRExHVkJRV1VzUTBGQlF5eFBRVUZQTEVWQlFVVXNRMEZCUXpzMFFrRkROMElzU1VGQlNTeEZRVUZGTEdkRFFVRlRPelJDUVVObUxFbEJRVWtzUlVGQlJTeHpRa0ZCYzBJN2VVSkJReTlDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMjlDUVVOS0xFbEJRVWtzUlVGQlJTeERRVUZETzJkQ1FVTllMRU5CUVVNc1EwRkJReXhEUVVGRExFOUJRVXNzUTBGQlFTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMWxCUTNaQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExQXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkZTQ3hSUVVGUkxFTkJRVU1zWVVGQllTeEZRVUZGTzFsQlEzQkNMRVZCUVVVc1EwRkJReXgxUTBGQmRVTXNSVUZCUlN4VlFVRlZMRWxCUVVrN1owSkJRM1JFTEVsQlFVa3NTMEZCU3l4SFFVRnRRaXhMUVVGTExFTkJRVU03WjBKQlEyeERMRk5CUVZNc1EwRkJReXhMUVVGTExFVkJRVVVzUTBGQlF6dG5Ra0ZEYkVJc1UwRkJVeXhEUVVGRExFMUJRVTBzUTBGQlF5d3lRa0ZCTWtJc1EwRkJReXhEUVVGRExFdEJRVXNzUTBGQlF5eEhRVUZITEVWQlFVVXNSVUZCUlN4TFFVRkxMRVZCUVVVc2MwSkJRWE5DTEVWQlFVVXNRMEZCUXl4RFFVRkRPMmRDUVVNMVJpeFRRVUZUTzNGQ1FVTktMRkZCUVZFc1EwRkJReXg1UWtGQlZ5eERRVUZETEdWQlFXVXNSVUZCUlN4alFVRk5MRTlCUVVFc1MwRkJTeXhIUVVGSExHVkJRV1VzUlVGQmRrSXNRMEZCZFVJc1EwRkJReXhEUVVGRE8zRkNRVU55UlN4SlFVRkpMRU5CUVVNN2IwSkJRMFlzWVVGQlRTeERRVUZETEU5QlFVOHNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRenR2UWtGRGRFSXNTVUZCVFN4UFFVRlBMRWRCUVdkQ0xGTkJRVk1zUTBGQlF5eFZRVUZWTEVWQlFVVXNRMEZCUXp0dlFrRkRjRVFzWVVGQlRTeERRVUZETEdWQlFXVXNRMEZCUXl4UFFVRlBMRVZCUVVVc1EwRkJRenMwUWtGRE4wSXNTVUZCU1N4RlFVRkZMR2REUVVGVE96UkNRVU5tTEVsQlFVa3NSVUZCUlN4elFrRkJjMEk3ZVVKQlF5OUNMRU5CUVVNc1EwRkJReXhEUVVGRE8yOUNRVU5LTEVsQlFVa3NSVUZCUlN4RFFVRkRPMmRDUVVOWUxFTkJRVU1zUTBGQlF5eERRVU5FTEU5QlFVc3NRMEZCUVN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xbEJRM0pDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTBnc1JVRkJSU3hEUVVGRExIRkRRVUZ4UXl4RlFVRkZMRlZCUVZNc1NVRkJTVHRuUWtGRGJrUXNTVUZCU1N4TFFVRkxMRWRCUVcxQ0xFdEJRVXNzUTBGQlF6dG5Ra0ZEYkVNc1UwRkJVenR4UWtGRFNpeFJRVUZSTEVOQlFVTXNlVUpCUVZjc1EwRkJReXhsUVVGbExFVkJRVVVzWTBGQlRTeFBRVUZCTEV0QlFVc3NSMEZCUnl4bFFVRmxMRVZCUVhaQ0xFTkJRWFZDTEVOQlFVTXNRMEZCUXp0eFFrRkRja1VzU1VGQlNTeERRVUZETzI5Q1FVTkdMR0ZCUVUwc1EwRkJReXhYUVVGWExFTkJRVU1zUzBGQlN5eEZRVUZGTEdWQlFXVXNRMEZCUXl4RFFVRkRPMjlDUVVNelF5eEpRVUZOTEU5QlFVOHNSMEZCWjBJc1UwRkJVeXhEUVVGRExGVkJRVlVzUlVGQlJTeERRVUZETzI5Q1FVTndSQ3hoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRPelJDUVVNM1FpeEpRVUZKTEVWQlFVVXNLMEpCUVZFN05FSkJRMlFzU1VGQlNTeEZRVUZGTEdWQlFXVTdlVUpCUTNoQ0xFTkJRVU1zUTBGQlF5eERRVUZETzI5Q1FVTktMRWxCUVVrc1JVRkJSU3hEUVVGRE8yZENRVU5ZTEVOQlFVTXNRMEZCUXl4RFFVTkVMRTlCUVVzc1EwRkJRU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFsQlEzSkNMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMUFzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4UlFVRlJMRU5CUVVNc1owSkJRV2RDTEVWQlFVVTdXVUZEZGtJc1JVRkJSU3hEUVVGRExHbENRVUZwUWl4RlFVRkZMRlZCUVZNc1NVRkJTVHRuUWtGREwwSXNTVUZCU1N4UFFVRlBMRWRCUVZrc1MwRkJTeXhEUVVGRE8yZENRVU0zUWl4VFFVRlRMRU5CUVVNc1VVRkJVU3hEUVVGRExEUkNRVUZqTEVOQlFVTXNSMEZCUnl4RlFVRkZMRWRCUVVjc1JVRkJSU3hqUVVGTkxFOUJRVUVzVDBGQlR5eEhRVUZITEVsQlFVa3NSVUZCWkN4RFFVRmpMRU5CUVVNc1EwRkJRenR4UWtGRE4wUXNTVUZCU1N4RFFVRkRPMjlDUVVOR0xHRkJRVTBzUTBGQlF5eE5RVUZOTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN2IwSkJRM1pDTEVsQlFVMHNUMEZCVHl4SFFVRm5RaXhUUVVGVExFTkJRVU1zVlVGQlZTeEZRVUZGTEVOQlFVTTdiMEpCUTNCRUxHRkJRVTBzUTBGQlF5eGxRVUZsTEVOQlFVTXNUMEZCVHl4RlFVRkZMRU5CUVVNN05FSkJRemRDTEVsQlFVa3NSVUZCUlN3clFrRkJVVHMwUWtGRFpDeEpRVUZKTEVWQlFVVXNhMEpCUVd0Q08zbENRVU16UWl4RFFVRkRMRU5CUVVNc1EwRkJRenR2UWtGRFNpeEpRVUZKTEVWQlFVVXNRMEZCUXp0blFrRkRXQ3hEUVVGRExFTkJRVU1zUTBGRFJDeFBRVUZMTEVOQlFVRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRaUVVOeVFpeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTklMRVZCUVVVc1EwRkJReXgxUTBGQmRVTXNSVUZCUlN4VlFVRlRMRWxCUVVrN1owSkJRM0pFTEVsQlFVa3NUMEZCVHl4SFFVRlpMRXRCUVVzc1EwRkJRenRuUWtGRE4wSXNVMEZCVXl4RFFVRkRMRXRCUVVzc1JVRkJSU3hEUVVGRE8yZENRVU5zUWl4VFFVRlRMRU5CUVVNc1RVRkJUU3hEUVVGRExEaENRVUU0UWl4RFFVRkRMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUlVGQlJTeEZRVUZGTEV0QlFVc3NSVUZCUlN4elFrRkJjMElzUlVGQlJTeERRVUZETEVOQlFVTTdaMEpCUXk5R0xGTkJRVk1zUTBGQlF5eFJRVUZSTEVOQlFVTXNORUpCUVdNc1EwRkJReXhIUVVGSExFVkJRVVVzUjBGQlJ5eEZRVUZGTEdOQlFVMHNUMEZCUVN4UFFVRlBMRWRCUVVjc1NVRkJTU3hGUVVGa0xFTkJRV01zUTBGQlF5eERRVUZETzNGQ1FVTTNSQ3hKUVVGSkxFTkJRVU03YjBKQlEwWXNZVUZCVFN4RFFVRkRMRTlCUVU4c1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF6dHZRa0ZEZUVJc1NVRkJUU3hQUVVGUExFZEJRV2RDTEZOQlFWTXNRMEZCUXl4VlFVRlZMRVZCUVVVc1EwRkJRenR2UWtGRGNFUXNZVUZCVFN4RFFVRkRMR1ZCUVdVc1EwRkJReXhQUVVGUExFVkJRVVVzUTBGQlF6czBRa0ZETjBJc1NVRkJTU3hGUVVGRkxHZERRVUZUT3pSQ1FVTm1MRWxCUVVrc1JVRkJSU3h6UWtGQmMwSTdlVUpCUXk5Q0xFTkJRVU1zUTBGQlF5eERRVUZETzI5Q1FVTktMRWxCUVVrc1JVRkJSU3hEUVVGRE8yZENRVU5ZTEVOQlFVTXNRMEZCUXl4RFFVTkVMRTlCUVVzc1EwRkJRU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFsQlEzSkNMRU5CUVVNc1EwRkJReXhEUVVGQk8xRkJRMDRzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4UlFVRlJMRU5CUVVNc1dVRkJXU3hGUVVGRk8xbEJRMjVDTEVWQlFVVXNRMEZCUXl3MFFrRkJORUlzUlVGQlJTeFZRVUZUTEVsQlFVazdaMEpCUXpGRExGTkJRVk03Y1VKQlEwb3NVVUZCVVN4RFFVRkRMSGRDUVVGVkxFTkJRVU1zVFVGQlRTeEZRVUZGTEdkQ1FVRm5RaXhGUVVGRkxFMUJRVTBzUTBGQlF5eERRVUZETzNGQ1FVTjBSQ3hKUVVGSkxFTkJRVU03YjBKQlEwWXNTVUZCVFN4UFFVRlBMRWRCUVdkQ0xGTkJRVk1zUTBGQlF5eFZRVUZWTEVWQlFVVXNRMEZCUXp0dlFrRkRjRVFzWVVGQlRTeERRVUZETEdWQlFXVXNRMEZCUXl4UFFVRlBMRVZCUVVVc1EwRkJReXc0UWtGQlR5eERRVUZETEd0Q1FVRnJRaXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzI5Q1FVTXZSQ3hKUVVGSkxFVkJRVVVzUTBGQlF6dG5Ra0ZEV0N4RFFVRkRMRU5CUVVNc1EwRkJReXhQUVVGTExFTkJRVUVzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0WlFVTjJRaXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU5JTEVWQlFVVXNRMEZCUXl3MlFrRkJOa0lzUlVGQlJTeFZRVUZUTEVsQlFVazdaMEpCUXpORExGTkJRVk1zUTBGQlF5eExRVUZMTEVWQlFVVXNRMEZCUXp0blFrRkRiRUlzVTBGQlV5eERRVUZETEV0QlFVc3NSVUZCUlN4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFVkJRVVVzUlVGQlF5eExRVUZMTEVWQlFVVXNjMEpCUVhOQ0xFVkJRVU1zUTBGQlF5eERRVUZETzJkQ1FVTTVSQ3hUUVVGVE8zRkNRVU5LTEZGQlFWRXNRMEZCUXl4M1FrRkJWU3hEUVVGRExFMUJRVTBzUlVGQlJTeG5Ra0ZCWjBJc1JVRkJSU3hOUVVGTkxFTkJRVU1zUTBGQlF6dHhRa0ZEZEVRc1NVRkJTU3hEUVVGRE8yOUNRVU5HTEVsQlFVMHNUMEZCVHl4SFFVRm5RaXhUUVVGVExFTkJRVU1zVlVGQlZTeEZRVUZGTEVOQlFVTTdiMEpCUTNCRUxHRkJRVTBzUTBGQlF5eGxRVUZsTEVOQlFVTXNUMEZCVHl4RlFVRkZMRU5CUVVNc0swSkJRVkVzUTBGQlF5eHpRa0ZCYzBJc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dHZRa0ZEY0VVc1NVRkJTU3hGUVVGRkxFTkJRVU03WjBKQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNc1QwRkJTeXhEUVVGQkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdXVUZEZGtJc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFVDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRkZCUVZFc1EwRkJReXhWUVVGVkxFVkJRVVU3V1VGRGFrSXNSVUZCUlN4RFFVRkRMRFJDUVVFMFFpeEZRVUZGTEZWQlFWTXNTVUZCU1R0blFrRkRNVU1zVTBGQlV6dHhRa0ZEU2l4UlFVRlJMRU5CUVVNc2MwSkJRVkVzUTBGQlF5eHRRa0ZCYlVJc1JVRkJSU3hOUVVGTkxFVkJRVVVzWjBKQlFXZENMRVZCUVVVc1RVRkJUU3hEUVVGRExFTkJRVU03Y1VKQlEzcEZMRWxCUVVrc1EwRkJRenR2UWtGRFJpeEpRVUZOTEU5QlFVOHNSMEZCWjBJc1UwRkJVeXhEUVVGRExGVkJRVlVzUlVGQlJTeERRVUZETzI5Q1FVTndSQ3hoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRMRGhDUVVGUExFTkJRVU1zWlVGQlpTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMjlDUVVNMVJDeEpRVUZKTEVWQlFVVXNRMEZCUXp0blFrRkRXQ3hEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZMTEVOQlFVRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRaUVVOMlFpeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTklMRVZCUVVVc1EwRkJReXcyUWtGQk5rSXNSVUZCUlN4VlFVRlRMRWxCUVVrN1owSkJRek5ETEZOQlFWTXNRMEZCUXl4TFFVRkxMRVZCUVVVc1EwRkJRenRuUWtGRGJFSXNVMEZCVXl4RFFVRkRMRXRCUVVzc1JVRkJSU3hEUVVGRExFdEJRVXNzUTBGQlF5eEhRVUZITEVWQlFVVXNSVUZCUlN4TFFVRkxMRVZCUVVVc2MwSkJRWE5DTEVWQlFVVXNRMEZCUXl4RFFVRkRPMmRDUVVOb1JTeFRRVUZUTzNGQ1FVTktMRkZCUVZFc1EwRkJReXh6UWtGQlVTeERRVUZETEcxQ1FVRnRRaXhGUVVGRkxFMUJRVTBzUlVGQlJTeG5Ra0ZCWjBJc1JVRkJSU3hOUVVGTkxFTkJRVU1zUTBGQlF6dHhRa0ZEZWtVc1NVRkJTU3hEUVVGRE8yOUNRVU5HTEVsQlFVMHNUMEZCVHl4SFFVRm5RaXhUUVVGVExFTkJRVU1zVlVGQlZTeEZRVUZGTEVOQlFVTTdiMEpCUTNCRUxHRkJRVTBzUTBGQlF5eGxRVUZsTEVOQlFVTXNUMEZCVHl4RlFVRkZMRU5CUVVNc0swSkJRVkVzUTBGQlF5eHpRa0ZCYzBJc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dHZRa0ZEY0VVc1NVRkJTU3hGUVVGRkxFTkJRVU03WjBKQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNc1QwRkJTeXhEUVVGQkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdXVUZEZGtJc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFVDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRkZCUVZFc1EwRkJReXhaUVVGWkxFVkJRVVU3V1VGRGJrSXNSVUZCUlN4RFFVRkRMRFJDUVVFMFFpeEZRVUZGTEZWQlFWTXNTVUZCU1R0blFrRkRNVU1zVTBGQlV6dHhRa0ZEU2l4UlFVRlJMRU5CUVVNc2QwSkJRVlVzUTBGQlF5eGxRVUZsTEVOQlFVTXNRMEZCUXp0eFFrRkRja01zU1VGQlNTeERRVUZETzI5Q1FVTkdMRWxCUVUwc1QwRkJUeXhIUVVGblFpeFRRVUZUTEVOQlFVTXNWVUZCVlN4RlFVRkZMRU5CUVVNN2IwSkJRM0JFTEdGQlFVMHNRMEZCUXl4bFFVRmxMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU1zT0VKQlFVOHNRMEZCUXl4alFVRmpMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03YjBKQlF6TkVMRWxCUVVrc1JVRkJSU3hEUVVGRE8yZENRVU5ZTEVOQlFVTXNRMEZCUXl4RFFVRkRMRTlCUVVzc1EwRkJRU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFsQlEzWkNMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMGdzUlVGQlJTeERRVUZETERaQ1FVRTJRaXhGUVVGRkxGVkJRVk1zU1VGQlNUdG5Ra0ZETTBNc1UwRkJVeXhEUVVGRExFdEJRVXNzUlVGQlJTeERRVUZETzJkQ1FVTnNRaXhUUVVGVExFTkJRVU1zUzBGQlN5eEZRVUZGTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1JVRkJSU3hGUVVGRkxFdEJRVXNzUlVGQlJTeHpRa0ZCYzBJc1JVRkJSU3hEUVVGRExFTkJRVU03WjBKQlEyaEZMRk5CUVZNN2NVSkJRMG9zVVVGQlVTeERRVUZETEhkQ1FVRlZMRU5CUVVNc1pVRkJaU3hEUVVGRExFTkJRVU03Y1VKQlEzSkRMRWxCUVVrc1EwRkJRenR2UWtGRFJpeEpRVUZOTEU5QlFVOHNSMEZCWjBJc1UwRkJVeXhEUVVGRExGVkJRVlVzUlVGQlJTeERRVUZETzI5Q1FVTndSQ3hoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRMQ3RDUVVGUkxFTkJRVU1zYzBKQlFYTkNMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03YjBKQlEzQkZMRWxCUVVrc1JVRkJSU3hEUVVGRE8yZENRVU5ZTEVOQlFVTXNRMEZCUXl4RFFVRkRMRTlCUVVzc1EwRkJRU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFsQlEzWkNMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMUFzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4UlFVRlJMRU5CUVVNc1lVRkJZU3hGUVVGRk8xbEJRM0JDTEVWQlFVVXNRMEZCUXl3MFFrRkJORUlzUlVGQlJTeFZRVUZUTEVsQlFVazdaMEpCUXpGRExGTkJRVk03Y1VKQlEwb3NVVUZCVVN4RFFVRkRMSGxDUVVGWExFTkJRVU1zWlVGQlpTeERRVUZETEVOQlFVTTdjVUpCUTNSRExFbEJRVWtzUTBGQlF6dHZRa0ZEUml4SlFVRk5MRTlCUVU4c1IwRkJaMElzVTBGQlV5eERRVUZETEZWQlFWVXNSVUZCUlN4RFFVRkRPMjlDUVVOd1JDeGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRExEaENRVUZQTEVOQlFVTXNaVUZCWlN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8yOUNRVU0xUkN4SlFVRkpMRVZCUVVVc1EwRkJRenRuUWtGRFdDeERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRkxMRU5CUVVFc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFpRVU4yUWl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOSUxFVkJRVVVzUTBGQlF5dzJRa0ZCTmtJc1JVRkJSU3hWUVVGVExFbEJRVWs3WjBKQlF6TkRMRk5CUVZNc1EwRkJReXhMUVVGTExFVkJRVVVzUTBGQlF6dG5Ra0ZEYkVJc1UwRkJVeXhEUVVGRExFdEJRVXNzUlVGQlJTeERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRVZCUVVVc1JVRkJSU3hMUVVGTExFVkJRVVVzYzBKQlFYTkNMRVZCUVVVc1EwRkJReXhEUVVGRE8yZENRVU5vUlN4VFFVRlRPM0ZDUVVOS0xGRkJRVkVzUTBGQlF5eDVRa0ZCVnl4RFFVRkRMR1ZCUVdVc1EwRkJReXhEUVVGRE8zRkNRVU4wUXl4SlFVRkpMRU5CUVVNN2IwSkJRMFlzU1VGQlRTeFBRVUZQTEVkQlFXZENMRk5CUVZNc1EwRkJReXhWUVVGVkxFVkJRVVVzUTBGQlF6dHZRa0ZEY0VRc1lVRkJUU3hEUVVGRExHVkJRV1VzUTBGQlF5eFBRVUZQTEVWQlFVVXNRMEZCUXl3clFrRkJVU3hEUVVGRExITkNRVUZ6UWl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8yOUNRVU53UlN4SlFVRkpMRVZCUVVVc1EwRkJRenRuUWtGRFdDeERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRkxMRU5CUVVFc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFpRVU4yUWl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOUUxFTkJRVU1zUTBGQlF5eERRVUZETzBsQlExQXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRTQ3hSUVVGUkxFTkJRVU1zZDBKQlFYZENMRVZCUVVVN1VVRkRMMElzVlVGQlZTeERRVUZETzFsQlIxQXNVMEZCVXl4SFFVRkhMR2RDUVVGblFpeERRVUZETzJkQ1FVTjZRaXhSUVVGUkxFVkJRVVU3YjBKQlEwNHNSVUZCUlN4SlFVRkpMRVZCUVVVc1UwRkJVeXhGUVVGRkxHMUNRVUZ0UWl4RlFVRkZMRXRCUVVzc1JVRkJSU3hsUVVGbExFVkJRVVVzU1VGQlNTeEZRVUZGTEhOQ1FVRnpRaXhGUVVGRkxFTkJRVU1zUlVGQlJUdHZRa0ZEYWtjc1JVRkJSU3hKUVVGSkxFVkJRVVVzZFVKQlFYVkNMRVZCUVVVc2JVSkJRVzFDTEVWQlFVVXNTVUZCU1N4RlFVRkZMR1ZCUVdVc1JVRkJSU3hKUVVGSkxFVkJRVVU3YjBKQlEyNUdMRVZCUVVVc1NVRkJTU3hGUVVGRkxHdENRVUZyUWl4RlFVRkZMRzFDUVVGdFFpeEZRVUZGTEV0QlFVc3NSVUZCUlN4bFFVRmxMRVZCUVVVc1MwRkJTeXhGUVVGRk8ybENRVU51Ump0aFFVTktMRU5CUVVNc1EwRkJRenRaUVVOSUxGTkJRVk1zUTBGQlF5eExRVUZMTEVWQlFVVXNRMEZCUXp0WlFVTnNRaXhUUVVGVExFTkJRVU1zUzBGQlN5eEZRVUZGTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1JVRkJSU3hGUVVGRkxFTkJRVU1zUTBGQlF6dFJRVU55UXl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5d3JSVUZCSzBVc1JVRkJSU3hWUVVGVExFbEJRVWs3V1VGRE4wWXNTVUZCU1N4UlFVRlJMRWRCUVd0RE8yZENRVU14UXl4RlFVRkRMRWRCUVVjc1JVRkJSU3hIUVVGSExFVkJRVVVzU1VGQlNTeEZRVUZGTEZOQlFWTXNSVUZCUXp0blFrRkRNMElzUlVGQlF5eEhRVUZITEVWQlFVVXNSMEZCUnl4RlFVRkZMRWxCUVVrc1JVRkJSU3hSUVVGUkxFVkJRVU03WjBKQlF6RkNMRVZCUVVNc1IwRkJSeXhGUVVGRkxFZEJRVWNzUlVGQlJTeEpRVUZKTEVWQlFVVXNaMEpCUVdkQ0xFVkJRVU03WVVGQlF5eERRVUZETzFsQlEzaERMRk5CUVZNc1EwRkJReXhMUVVGTExFVkJRVVVzUTBGQlF6dFpRVU5zUWl4VFFVRlRPMmxDUVVOS0xFdEJRVXNzUTBGQlF5eHJRa0ZCYTBJc1EwRkJRenRwUWtGRGVrSXNTMEZCU3l4RFFVRkRMRWRCUVVjc1JVRkJSU3hGUVVGRExGRkJRVkVzUlVGQlJTeFJRVUZSTEVWQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTNSRExGTkJRVk03YVVKQlEwb3NVVUZCVVN4RFFVRkRMQ3RDUVVGaExFVkJRVVVzUTBGQlF6dHBRa0ZEZWtJc1NVRkJTU3hEUVVGRE8yZENRVU5HTEVsQlFVMHNUMEZCVHl4SFFVRm5RaXhUUVVGVExFTkJRVU1zVlVGQlZTeEZRVUZGTEVOQlFVTTdaMEpCUTNCRUxFbEJRVTBzYVVKQlFXbENMRWRCUVVjc05rSkJRVmNzUTBGQlF5eERRVUZETEZOQlFWTXNSVUZCUlN4UlFVRlJMRVZCUVVVc1owSkJRV2RDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMmRDUVVNdlJTeGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRExHbENRVUZwUWl4RFFVRkRMRU5CUVVNc1EwRkJRenRuUWtGRGNrUXNTVUZCU1N4RlFVRkZMRU5CUVVNN1dVRkRXQ3hEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZMTEVOQlFVRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRVHRSUVVOMFFpeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXhuUlVGQlowVXNSVUZCUlN4VlFVRlRMRWxCUVVrN1dVRkRPVVVzVTBGQlV5eERRVUZETEV0QlFVc3NSVUZCUlN4RFFVRkRPMWxCUTJ4Q0xGTkJRVk03YVVKQlEwb3NTMEZCU3l4RFFVRkRMR3RDUVVGclFpeERRVUZETzJsQ1FVTjZRaXhMUVVGTExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTTdXVUZEYUVJc1UwRkJVenRwUWtGRFNpeFJRVUZSTEVOQlFVTXNLMEpCUVdFc1JVRkJSU3hEUVVGRE8ybENRVU42UWl4SlFVRkpMRU5CUVVNN1owSkJRMFlzU1VGQlRTeFBRVUZQTEVkQlFXZENMRk5CUVZNc1EwRkJReXhWUVVGVkxFVkJRVVVzUTBGQlF6dG5Ra0ZEY0VRc1NVRkJUU3hYUVVGWExFZEJRVWNzSzBKQlFWRXNRMEZCUXl4NVJFRkJlVVFzUTBGQlF5eERRVUZETzJkQ1FVTjRSaXhoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRMRmRCUVZjc1EwRkJReXhEUVVGRExFTkJRVU03WjBKQlF5OURMRWxCUVVrc1JVRkJSU3hEUVVGRE8xbEJRMWdzUTBGQlF5eERRVUZETEVOQlFVTXNUMEZCU3l4RFFVRkJMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVUU3VVVGRGRFSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hGUVVGRkxFTkJRVU1zTWtWQlFUSkZMRVZCUVVVc1ZVRkJVeXhKUVVGSk8xbEJRM3BHTEZOQlFWTTdhVUpCUTBvc1VVRkJVU3hEUVVGRExIbERRVUYxUWl4RFFVRkRMR05CUVdNc1EwRkJReXhEUVVGRE8ybENRVU0zUXl4SlFVRkpMRU5CUVVNc1ZVRkJReXhIUVVGWE8yZENRVU5rTEdGQlFVMHNRMEZCUXl4WFFVRlhMRU5CUVVNc1IwRkJSeXhGUVVGRkxIRkhRVUZ4Unl4RFFVRkRMRU5CUVVNN1owSkJReTlJTEVsQlFVMHNUMEZCVHl4SFFVRm5RaXhUUVVGVExFTkJRVU1zVlVGQlZTeEZRVUZGTEVOQlFVTTdaMEpCUTNCRUxFbEJRVTBzVjBGQlZ5eEhRVUZITEN0Q1FVRlJMRU5CUVVNc2NVUkJRWEZFTEVOQlFVTXNRMEZCUXp0blFrRkRjRVlzWVVGQlRTeERRVUZETEdWQlFXVXNRMEZCUXl4UFFVRlBMRVZCUVVVc1EwRkJReXhYUVVGWExFTkJRVU1zUTBGQlF5eERRVUZETzJkQ1FVTXZReXhKUVVGSkxFVkJRVVVzUTBGQlF6dFpRVU5ZTEVOQlFVTXNRMEZCUXl4RFFVRkRMRTlCUVVzc1EwRkJRU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFGQlF6TkNMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzUlVGQlJTeERRVUZETEdsRlFVRnBSU3hGUVVGRkxGVkJRVk1zU1VGQlNUdFpRVU12UlN4VFFVRlRPMmxDUVVOS0xGRkJRVkVzUTBGQlF5eDVRMEZCZFVJc1EwRkJReXgxUWtGQmRVSXNRMEZCUXl4RFFVRkRPMmxDUVVNeFJDeEpRVUZKTEVOQlFVTXNWVUZCUXl4SFFVRlhPMmRDUVVOa0xHRkJRVTBzUTBGQlF5eFhRVUZYTEVOQlFVTXNSMEZCUnl4RlFVRkZMSEZIUVVGeFJ5eERRVUZETEVOQlFVTTdaMEpCUXk5SUxFbEJRVTBzVDBGQlR5eEhRVUZuUWl4VFFVRlRMRU5CUVVNc1ZVRkJWU3hGUVVGRkxFTkJRVU03WjBKQlEzQkVMRWxCUVUwc1YwRkJWeXhIUVVGSExDdENRVUZSTEVOQlFVTXNjVVJCUVhGRUxFTkJRVU1zUTBGQlF6dG5Ra0ZEY0VZc1lVRkJUU3hEUVVGRExHVkJRV1VzUTBGQlF5eFBRVUZQTEVWQlFVVXNRMEZCUXl4WFFVRlhMRU5CUVVNc1EwRkJReXhEUVVGRE8yZENRVU12UXl4SlFVRkpMRVZCUVVVc1EwRkJRenRaUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVc3NRMEZCUVN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRM1pDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1JVRkJSU3hEUVVGRExHdEZRVUZyUlN4RlFVRkZMRlZCUVZNc1NVRkJTVHRaUVVOb1JpeFRRVUZUTzJsQ1FVTktMRkZCUVZFc1EwRkJReXg1UTBGQmRVSXNRMEZCUXl4clFrRkJhMElzUTBGQlF5eERRVUZETzJsQ1FVTnlSQ3hKUVVGSkxFTkJRVU1zVlVGQlF5eEhRVUZYTzJkQ1FVTmtMR0ZCUVUwc1EwRkJReXhYUVVGWExFTkJRVU1zUjBGQlJ5eEZRVUZGTEhGSFFVRnhSeXhEUVVGRExFTkJRVU03WjBKQlF5OUlMRWxCUVUwc1QwRkJUeXhIUVVGblFpeFRRVUZUTEVOQlFVTXNWVUZCVlN4RlFVRkZMRU5CUVVNN1owSkJRM0JFTEVsQlFVMHNWMEZCVnl4SFFVRkhMQ3RDUVVGUkxFTkJRVU1zY1VSQlFYRkVMRU5CUVVNc1EwRkJRenRuUWtGRGNFWXNZVUZCVFN4RFFVRkRMR1ZCUVdVc1EwRkJReXhQUVVGUExFVkJRVVVzUTBGQlF5eFhRVUZYTEVOQlFVTXNRMEZCUXl4RFFVRkRPMmRDUVVNdlF5eEpRVUZKTEVWQlFVVXNRMEZCUXp0WlFVTllMRU5CUVVNc1EwRkJReXhEUVVGRExFOUJRVXNzUTBGQlFTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUTNaQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NSVUZCUlN4RFFVRkRMSEZGUVVGeFJTeEZRVUZGTEZWQlFWTXNTVUZCU1R0WlFVTnVSaXhUUVVGVExFTkJRVU1zUzBGQlN5eEZRVUZGTEVOQlFVTTdXVUZEYkVJc1UwRkJVenRwUWtGRFNpeExRVUZMTEVWQlFVVTdhVUpCUTFBc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzFsQlEyaENMRWxCUVVrc1QwRkJUeXhIUVVGWExGTkJRVk1zUTBGQlF6dFpRVU5vUXl4VFFVRlRPMmxDUVVOS0xGRkJRVkVzUTBGQlF5eDVRMEZCZFVJc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF6dHBRa0ZETVVNc1NVRkJTU3hEUVVGRE8yZENRVU5HTEVsQlFVMHNUMEZCVHl4SFFVRm5RaXhUUVVGVExFTkJRVU1zVlVGQlZTeEZRVUZGTEVOQlFVTTdaMEpCUTNCRUxFbEJRVTBzY1VKQlFYRkNMRWRCUVVjc0swTkJRVFpDTEVOQlFVTXNUMEZCVHl4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRE8yZENRVU16UlN4SlFVRk5MRmRCUVZjc1IwRkJSeXdyUWtGQlVTeERRVUZETEhGRVFVRnhSQ3hEUVVGRExFTkJRVU03WjBKQlEzQkdMRWxCUVUwc2MwSkJRWE5DTEVkQlFVY3NLME5CUVRaQ0xFTkJRVU1zVDBGQlR5eEZRVUZGTEV0QlFVc3NRMEZCUXl4RFFVRkRPMmRDUVVNM1JTeGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRExIRkNRVUZ4UWl4RlFVRkZMRmRCUVZjc1JVRkJSU3h6UWtGQmMwSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1owSkJRemxHTEVsQlFVa3NSVUZCUlN4RFFVRkRPMWxCUTFnc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlN5eERRVUZCTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRka0lzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4RlFVRkZMRU5CUVVNc1owVkJRV2RGTEVWQlFVVXNWVUZCVXl4SlFVRkpPMWxCUXpsRkxGTkJRVk1zUTBGQlF5eExRVUZMTEVWQlFVVXNRMEZCUXp0WlFVTnNRaXhUUVVGVE8ybENRVU5LTEV0QlFVc3NSVUZCUlR0cFFrRkRVQ3hMUVVGTExFTkJRVU1zUjBGQlJ5eEZRVUZGTEVWQlFVVXNVVUZCVVN4RlFVRkZMRVZCUVVVc1JVRkJReXhEUVVGRExFTkJRVU03V1VGRGFrTXNTVUZCU1N4UFFVRlBMRWRCUVZjc1UwRkJVeXhEUVVGRE8xbEJRMmhETEZOQlFWTTdhVUpCUTBvc1VVRkJVU3hEUVVGRExIbERRVUYxUWl4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRE8ybENRVU14UXl4SlFVRkpMRU5CUVVNN1owSkJRMFlzU1VGQlRTeFBRVUZQTEVkQlFXZENMRk5CUVZNc1EwRkJReXhWUVVGVkxFVkJRVVVzUTBGQlF6dG5Ra0ZEY0VRc1NVRkJUU3h4UWtGQmNVSXNSMEZCUnl3clEwRkJOa0lzUTBGQlF5eFBRVUZQTEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1owSkJRek5GTEVsQlFVMHNaMEpCUVdkQ0xFZEJRVWNzTWtOQlFYbENMRU5CUVVNc1QwRkJUeXhGUVVGRkxFdEJRVXNzUTBGQlF5eERRVUZETzJkQ1FVTnVSU3hKUVVGTkxITkNRVUZ6UWl4SFFVRkhMQ3REUVVFMlFpeERRVUZETEU5QlFVOHNSVUZCUlN4TFFVRkxMRU5CUVVNc1EwRkJRenRuUWtGRE4wVXNZVUZCVFN4RFFVRkRMR1ZCUVdVc1EwRkJReXhQUVVGUExFVkJRVVVzUTBGQlF5eHhRa0ZCY1VJc1JVRkJSU3huUWtGQlowSXNSVUZCUlN4elFrRkJjMElzUTBGQlF5eERRVUZETEVOQlFVTTdaMEpCUTI1SExFbEJRVWtzUlVGQlJTeERRVUZETzFsQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNc1QwRkJTeXhEUVVGQkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdVVUZEZGtJc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEZRVUZGTEVOQlFVTXNaMHBCUVdkS0xFVkJRVVVzVlVGQlV5eEpRVUZKTzFsQlF6bEtMRWxCUVVrc1QwRkJUeXhIUVVGWExGTkJRVk1zUTBGQlF6dFpRVU5vUXl4SlFVRkpMRkZCUVZFc1IwRkJZeXhEUVVGRE8yOUNRVU4yUWl4SlFVRkpMRVZCUVVVc1MwRkJTenR2UWtGRFdDeFBRVUZQTEVWQlFVVXNTVUZCU1N4RFFVRkRMRWRCUVVjc1JVRkJSU3hEUVVGRExGRkJRVkVzUlVGQlJUdHZRa0ZET1VJc1UwRkJVeXhGUVVGRkxHVkJRV1U3YjBKQlF6RkNMRWRCUVVjc1JVRkJSU3hIUVVGSE8ybENRVU5ZTEVWQlFVVTdiMEpCUTBNc1NVRkJTU3hGUVVGRkxFdEJRVXM3YjBKQlExZ3NUMEZCVHl4RlFVRkZMRWxCUVVrc1EwRkJReXhIUVVGSExFVkJRVVVzUTBGQlF5eFJRVUZSTEVWQlFVVTdiMEpCUXpsQ0xGTkJRVk1zUlVGQlJTeGxRVUZsTzI5Q1FVTXhRaXhIUVVGSExFVkJRVVVzUjBGQlJ6dHBRa0ZEV0N4RFFVRkRMRU5CUVVNN1dVRkRTQ3hUUVVGVExFTkJRVU1zUzBGQlN5eEZRVUZGTEVOQlFVTTdXVUZEYkVJc1UwRkJVenRwUWtGRFNpeExRVUZMTEVWQlFVVTdhVUpCUTFBc1MwRkJTeXhEUVVGRExFZEJRVWNzUlVGQlJTeEZRVUZGTEZGQlFWRXNSVUZCUlN4UlFVRlJMRVZCUVVNc1EwRkJReXhEUVVGRE8xbEJRM1pETEZOQlFWTTdhVUpCUTBvc1VVRkJVU3hEUVVGRExIbERRVUYxUWl4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRE8ybENRVU14UXl4SlFVRkpMRU5CUVVNN1owSkJRMFlzU1VGQlRTeFBRVUZQTEVkQlFXZENMRk5CUVZNc1EwRkJReXhWUVVGVkxFVkJRVVVzUTBGQlF6dG5Ra0ZEY0VRc1NVRkJUU3h4UWtGQmNVSXNSMEZCUnl3clEwRkJOa0lzUTBGQlF5eFBRVUZQTEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1owSkJRek5GTEVsQlFVMHNjVUpCUVhGQ0xFZEJRVWNzZDBSQlFYTkRMRU5CUVVNc1QwRkJUeXhGUVVGRkxGRkJRVkVzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXp0blFrRkRMMFlzU1VGQlRTeHBRa0ZCYVVJc1IwRkJSeXcyUTBGQk1rSXNRMEZCUXl4UFFVRlBMRVZCUVVVc1VVRkJVU3hEUVVGRExFTkJRVU03WjBKQlEzcEZMRWxCUVUwc2MwSkJRWE5DTEVkQlFVY3NLME5CUVRaQ0xFTkJRVU1zVDBGQlR5eEZRVUZGTEV0QlFVc3NRMEZCUXl4RFFVRkRPMmRDUVVNM1JTeGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMRTlCUVU4c1JVRkJSVHR2UWtGRE5VSXNjVUpCUVhGQ08yOUNRVU55UWl4eFFrRkJjVUk3YjBKQlEzSkNMR2xDUVVGcFFqdHZRa0ZEYWtJc2MwSkJRWE5DTzJsQ1FVRkRMRU5CUVVNc1EwRkJRenRuUWtGRE4wSXNTVUZCU1N4RlFVRkZMRU5CUVVNN1dVRkRXQ3hEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZMTEVOQlFVRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVOMlFpeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXgxUkVGQmRVUXNSVUZCUlN4VlFVRlRMRWxCUVVrN1dVRkRja1VzU1VGQlNTeFJRVUZSTEVkQlFXOURPMmRDUVVNMVF5eEZRVUZGTEVkQlFVY3NSVUZCUlN4SFFVRkhMRVZCUVVVc1NVRkJTU3hGUVVGRkxGTkJRVk1zUlVGQlJUdG5Ra0ZETjBJc1JVRkJSU3hIUVVGSExFVkJRVVVzUjBGQlJ5eEZRVUZGTEVsQlFVa3NSVUZCUlN4UlFVRlJMRVZCUVVVN1owSkJRelZDTEVWQlFVVXNSMEZCUnl4RlFVRkZMRWRCUVVjc1JVRkJSU3hKUVVGSkxFVkJRVVVzWjBKQlFXZENMRVZCUVVVN1lVRkJReXhEUVVGRE8xbEJRekZETEZOQlFWTXNRMEZCUXl4TFFVRkxMRVZCUVVVc1EwRkJRenRaUVVOc1FpeFRRVUZUTzJsQ1FVTktMRXRCUVVzc1EwRkJReXhyUWtGQmEwSXNRMEZCUXp0cFFrRkRla0lzUzBGQlN5eERRVUZETEVkQlFVY3NSVUZCUlN4RlFVRkZMRkZCUVZFc1JVRkJSU3hSUVVGUkxFVkJRVVVzUTBGQlF5eERRVUZETzFsQlEzaERMRk5CUVZNN2FVSkJRMG9zUzBGQlN5eEZRVUZGTzJsQ1FVTlFMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dFpRVU5vUWl4VFFVRlRPMmxDUVVOS0xGRkJRVkVzUTBGQlF5d3JRa0ZCWVN4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRE8ybENRVU5zUXl4SlFVRkpMRU5CUVVNN1owSkJRMFlzU1VGQlRTeFBRVUZQTEVkQlFXZENMRk5CUVZNc1EwRkJReXhWUVVGVkxFVkJRVVVzUTBGQlF6dG5Ra0ZEY0VRc1NVRkJUU3hoUVVGaExFZEJRVWNzT0VKQlFVOHNRMEZCUXl4cFFrRkJhVUlzUTBGQlF5eERRVUZETzJkQ1FVTnFSQ3hKUVVGTkxHbENRVUZwUWl4SFFVRkhMRFpDUVVGWExFTkJRVU1zUTBGQlF5eFRRVUZUTEVWQlFVVXNVVUZCVVN4RlFVRkZMR2RDUVVGblFpeERRVUZETEVOQlFVTXNRMEZCUXp0blFrRkRMMFVzWVVGQlRTeERRVUZETEdWQlFXVXNRMEZCUXl4UFFVRlBMRVZCUVVVc1EwRkJReXhoUVVGaExFVkJRVVVzYVVKQlFXbENMRU5CUVVNc1EwRkJReXhEUVVGRE8yZENRVU53UlN4SlFVRkpMRVZCUVVVc1EwRkJRenRaUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVc3NRMEZCUVN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRM1pDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1JVRkJSU3hEUVVGRExEaEVRVUU0UkN4RlFVRkZMRlZCUVZNc1NVRkJTVHRaUVVNMVJTeFRRVUZUTEVOQlFVTXNTMEZCU3l4RlFVRkZMRU5CUVVNN1dVRkRiRUlzVTBGQlV6dHBRa0ZEU2l4TFFVRkxMRVZCUVVVN2FVSkJRMUFzUzBGQlN5eERRVUZETEVkQlFVY3NSVUZCUlN4RlFVRkRMRXRCUVVzc1JVRkJSU3h6UWtGQmMwSXNSVUZCUXl4RFFVRkRMRU5CUVVNN1dVRkRha1FzVTBGQlV6dHBRa0ZEU2l4UlFVRlJMRU5CUVVNc0swSkJRV0VzUTBGQlF5eFRRVUZUTEVOQlFVTXNRMEZCUXp0cFFrRkRiRU1zU1VGQlNTeERRVUZETzJkQ1FVTkdMRWxCUVUwc1QwRkJUeXhIUVVGblFpeFRRVUZUTEVOQlFVTXNWVUZCVlN4RlFVRkZMRU5CUVVNN1owSkJRM0JFTEVsQlFVMHNZMEZCWXl4SFFVRkhMQ3RDUVVGUkxFTkJRVU1zYzBKQlFYTkNMRU5CUVVNc1EwRkJRenRuUWtGRGVFUXNZVUZCVFN4RFFVRkRMR1ZCUVdVc1EwRkJReXhQUVVGUExFVkJRVVVzUTBGQlF5eGpRVUZqTEVOQlFVTXNRMEZCUXl4RFFVRkRPMmRDUVVOc1JDeEpRVUZKTEVWQlFVVXNRMEZCUXp0WlFVTllMRU5CUVVNc1EwRkJReXhEUVVGRExFOUJRVXNzUTBGQlFTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUTNaQ0xFTkJRVU1zUTBGQlF5eERRVUZCTzFGQlEwWXNSVUZCUlN4RFFVRkRMRGhEUVVFNFF5eEZRVUZGTEZWQlFWTXNTVUZCU1R0WlFVTTFSQ3hKUVVGSkxGRkJRVkVzUjBGQmIwTTdaMEpCUXpWRExFVkJRVVVzUjBGQlJ5eEZRVUZGTEVkQlFVY3NSVUZCUlN4SlFVRkpMRVZCUVVVc1UwRkJVeXhGUVVGRk8yZENRVU0zUWl4RlFVRkZMRWRCUVVjc1JVRkJSU3hIUVVGSExFVkJRVVVzU1VGQlNTeEZRVUZGTEZGQlFWRXNSVUZCUlR0blFrRkROVUlzUlVGQlJTeEhRVUZITEVWQlFVVXNSMEZCUnl4RlFVRkZMRWxCUVVrc1JVRkJSU3huUWtGQlowSXNSVUZCUlR0aFFVRkRMRU5CUVVNN1dVRkRNVU1zVTBGQlV5eERRVUZETEV0QlFVc3NSVUZCUlN4RFFVRkRPMWxCUTJ4Q0xGTkJRVk03YVVKQlEwb3NTMEZCU3l4RFFVRkRMR3RDUVVGclFpeERRVUZETzJsQ1FVTjZRaXhMUVVGTExFTkJRVU1zUjBGQlJ5eEZRVUZGTEVWQlFVVXNVVUZCVVN4RlFVRkZMRkZCUVZFc1JVRkJSU3hEUVVGRExFTkJRVU03V1VGRGVFTXNVMEZCVXp0cFFrRkRTaXhOUVVGTkxFVkJRVVU3YVVKQlExSXNTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8xbEJRMmhDTEZOQlFWTTdhVUpCUTBvc1VVRkJVU3hEUVVGRExEUkNRVUZWTEVOQlFVTXNZVUZCWVN4RFFVRkRMRU5CUVVNN2FVSkJRMjVETEVsQlFVa3NRMEZCUXp0blFrRkRSaXhKUVVGTkxFOUJRVThzUjBGQlowSXNVMEZCVXl4RFFVRkRMRlZCUVZVc1JVRkJSU3hEUVVGRE8yZENRVU53UkN4SlFVRk5MR0ZCUVdFc1IwRkJSeXc0UWtGQlR5eERRVUZETEdsQ1FVRnBRaXhEUVVGRExFTkJRVU03WjBKQlEycEVMRWxCUVUwc2FVSkJRV2xDTEVkQlFVY3NOa0pCUVZjc1EwRkJReXhEUVVGRExGTkJRVk1zUlVGQlJTeFJRVUZSTEVWQlFVVXNaMEpCUVdkQ0xFTkJRVU1zUTBGQlF5eERRVUZETzJkQ1FVTXZSU3hoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRMR0ZCUVdFc1JVRkJSU3hwUWtGQmFVSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1owSkJRM0JGTEVsQlFVa3NSVUZCUlN4RFFVRkRPMWxCUTFnc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlN5eERRVUZCTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRka0lzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4RlFVRkZMRU5CUVVNc2IwVkJRVzlGTEVWQlFVVXNWVUZCVXl4SlFVRkpPMWxCUTJ4R0xGTkJRVk1zUTBGQlF5eExRVUZMTEVWQlFVVXNRMEZCUXp0WlFVTnNRaXhUUVVGVE8ybENRVU5LTEV0QlFVc3NSVUZCUlR0cFFrRkRVQ3hMUVVGTExFTkJRVU1zUjBGQlJ5eEZRVUZGTEVWQlFVTXNTMEZCU3l4RlFVRkZMSE5DUVVGelFpeEZRVUZETEVOQlFVTXNRMEZCUXp0WlFVTnFSQ3hUUVVGVE8ybENRVU5LTEZGQlFWRXNRMEZCUXl3MFFrRkJWU3hEUVVGRExHRkJRV0VzUTBGQlF5eERRVUZETzJsQ1FVTnVReXhKUVVGSkxFTkJRVU03WjBKQlEwWXNTVUZCVFN4UFFVRlBMRWRCUVdkQ0xGTkJRVk1zUTBGQlF5eFZRVUZWTEVWQlFVVXNRMEZCUXp0blFrRkRjRVFzU1VGQlRTeGpRVUZqTEVkQlFVY3NLMEpCUVZFc1EwRkJReXh6UWtGQmMwSXNRMEZCUXl4RFFVRkRPMmRDUVVONFJDeGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRExHTkJRV01zUTBGQlF5eERRVUZETEVOQlFVTTdaMEpCUTJ4RUxFbEJRVWtzUlVGQlJTeERRVUZETzFsQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNc1QwRkJTeXhEUVVGQkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdVVUZEZGtJc1EwRkJReXhEUVVGRExFTkJRVUU3U1VGRFRpeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTklMRkZCUVZFc1EwRkJReXh6UWtGQmMwSXNSVUZCUlR0UlFVTTNRaXhWUVVGVkxFTkJRVU03V1VGRFVDeFRRVUZUTEVkQlFVY3NVVUZCVVN4RlFVRkZMRU5CUVVNN1VVRkRNMElzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4RlFVRkZMRU5CUVVNc2QwTkJRWGRETEVWQlFVVTdXVUZEZWtNc1UwRkJVeXhEUVVGRExGRkJRVkVzUTBGQlF5eHZRa0ZCZFVJc1JVRkJSU3hEUVVGRExFTkJRVU03V1VGRE9VTXNTVUZCVFN4UFFVRlBMRWRCUVdkQ0xGTkJRVk1zUTBGQlF5eFZRVUZWTEVWQlFVVXNRMEZCUXp0WlFVTndSQ3hoUVVGTkxFTkJRVU1zVjBGQlZ5eERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhKUVVGSkxFVkJRVVVzT0VKQlFXTXNRMEZCUXl4RFFVRkRPMWxCUlhCRUxFOUJRVThzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSU3hEUVVGRExFdEJRVXNzUlVGQlJTeERRVUZETzFGQlF5OUNMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMUFzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEU0N4UlFVRlJMRU5CUVVNc01FSkJRVEJDTEVWQlFVVTdVVUZEYWtNc1ZVRkJWU3hEUVVGRE8xbEJRMUFzVTBGQlV5eEhRVUZITEZGQlFWRXNSVUZCUlN4RFFVRkRPMUZCUXpOQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NSVUZCUlN4RFFVRkRMQ3REUVVFclF5eEZRVUZGTEZWQlFWTXNTVUZCU1R0WlFVTTNSQ3hKUVVGSkxHRkJRV0VzUjBGQlJ5eERRVUZETzI5Q1FVTnFRaXhMUVVGTExFVkJRVVVzWlVGQlpUdHZRa0ZEZEVJc1NVRkJTU3hGUVVGRkxFOUJRVTg3YjBKQlEySXNTVUZCU1N4RlFVRkZMRTFCUVUwN2FVSkJRMllzUlVGQlJUdHZRa0ZEUXl4TFFVRkxMRVZCUVVVc1owSkJRV2RDTzI5Q1FVTjJRaXhKUVVGSkxFVkJRVVVzVTBGQlV6dHZRa0ZEWml4SlFVRkpMRVZCUVVVc1RVRkJUVHRwUWtGRFppeERRVUZETEVOQlFVTTdXVUZEU0N4SlFVRkpMRXRCUVVzc1IwRkJiVUlzUlVGQlJTeERRVUZETzFsQlF5OUNMR0ZCUVdFc1EwRkJReXhQUVVGUExFTkJRVU1zVlVGQlF5eERRVUZETzJkQ1FVTndRaXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhPMjlDUVVOaUxFbEJRVWtzUlVGQlJTeERRVUZETEVOQlFVTXNTVUZCU1R0dlFrRkRXaXhKUVVGSkxFVkJRVVVzUTBGQlF5eERRVUZETEVsQlFVazdhVUpCUTJZc1EwRkJRenRaUVVOT0xFTkJRVU1zUTBGQlF5eERRVUZCTzFsQlEwWXNVMEZCVXl4RFFVRkRMRXRCUVVzc1JVRkJSU3hEUVVGRE8xbEJRMnhDTEZOQlFWTXNRMEZCUXl4TFFVRkxMRVZCUVVVc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eEZRVUZGTEVWQlFVVXNTMEZCU3l4RlFVRkZMR0ZCUVdFc1JVRkJReXhEUVVGRExFTkJRVU03V1VGRGRFUXNVMEZCVXp0cFFrRkRTaXhSUVVGUkxFTkJRVU1zWjBOQlFXRXNSVUZCUlN4RFFVRkRPMmxDUVVONlFpeEpRVUZKTEVOQlFVTTdaMEpCUTBZc1NVRkJUU3hQUVVGUExFZEJRV2RDTEZOQlFWTXNRMEZCUXl4VlFVRlZMRVZCUVVVc1EwRkJRenRuUWtGRGNFUXNTVUZCVFN4cFFrRkJhVUlzUjBGQlJ5dzRRa0ZCVnl4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRE8yZENRVU0zUXl4aFFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExFOUJRVThzUlVGQlJTeERRVUZETEdsQ1FVRnBRaXhEUVVGRExFTkJRVU1zUTBGQlF6dG5Ra0ZEY2tRc1NVRkJTU3hGUVVGRkxFTkJRVU03V1VGRFdDeERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRkxMRU5CUVVFc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU4yUWl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5d3lSRUZCTWtRc1JVRkJSU3hWUVVGVExFbEJRVWs3V1VGRGVrVXNVMEZCVXl4RFFVRkRMRXRCUVVzc1JVRkJSU3hEUVVGRE8xbEJRMnhDTEZOQlFWTXNRMEZCUXl4TFFVRkxMRVZCUVVVc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTTdXVUZETjBJc1UwRkJVenRwUWtGRFNpeFJRVUZSTEVOQlFVTXNaME5CUVdFc1JVRkJSU3hEUVVGRE8ybENRVU42UWl4SlFVRkpMRU5CUVVNN1owSkJRMFlzU1VGQlRTeFBRVUZQTEVkQlFXZENMRk5CUVZNc1EwRkJReXhWUVVGVkxFVkJRVVVzUTBGQlF6dG5Ra0ZEY0VRc1NVRkJUU3hqUVVGakxFZEJRVWNzSzBKQlFWRXNRMEZCUXl3eVFrRkJNa0lzUTBGQlF5eERRVUZETzJkQ1FVTTNSQ3hoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRMR05CUVdNc1EwRkJReXhEUVVGRExFTkJRVU03WjBKQlEyeEVMRWxCUVVrc1JVRkJSU3hEUVVGRE8xbEJRMWdzUTBGQlF5eERRVUZETEVOQlFVTXNUMEZCU3l4RFFVRkJMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRGRrSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dEJRVU5RTEVOQlFVTXNRMEZCUXl4RFFVRkJJbjA9IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIGNoYWlfMSA9IHJlcXVpcmUoXCJjaGFpXCIpO1xucmVxdWlyZShcIm1vY2hhXCIpO1xudmFyIHNvY2tldGlvY2xpZW50ID0gcmVxdWlyZShcInNvY2tldC5pby1jbGllbnRcIik7XG52YXIgc3RvcmVfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvd2ViL3N0b3JlXCIpO1xudmFyIHJlZHV4XzEgPSByZXF1aXJlKFwicmVkdXhcIik7XG52YXIgdXNlckFjdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvd2ViL2FjdGlvbnMvdXNlckFjdGlvbnNcIik7XG52YXIgY2hhbm5lbHNBY3Rpb25zXzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL3dlYi9hY3Rpb25zL2NoYW5uZWxzQWN0aW9uc1wiKTtcbnZhciBub3RpZmljYXRpb25zQWN0aW9uc18xID0gcmVxdWlyZShcIi4uLy4uL3NyYy93ZWIvYWN0aW9ucy9ub3RpZmljYXRpb25zQWN0aW9uc1wiKTtcbnZhciBzaWRlYmFyQWN0aW9uc18xID0gcmVxdWlyZShcIi4uLy4uL3NyYy93ZWIvYWN0aW9ucy9zaWRlYmFyQWN0aW9uc1wiKTtcbnZhciBzb2NrZXRBY3Rpb25zXzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL3dlYi9hY3Rpb25zL3NvY2tldEFjdGlvbnNcIik7XG52YXIgY2hhdFVzZXJzQWN0aW9uc18xID0gcmVxdWlyZShcIi4uLy4uL3NyYy93ZWIvYWN0aW9ucy9jaGF0VXNlcnNBY3Rpb25zXCIpO1xuZnVuY3Rpb24gZ2V0U3RvcmUoKSB7XG4gICAgcmV0dXJuIHJlZHV4XzEuY3JlYXRlU3RvcmUoc3RvcmVfMS5yb290UmVkdWNlciwgc3RvcmVfMS5taWRkbGV3YXJlKTtcbn1cbmRlc2NyaWJlKCdTdG9yZSBhbmQgU3luY2hyb25vdXMgQWN0aW9ucycsIGZ1bmN0aW9uICgpIHtcbiAgICBkZXNjcmliZSgnVXNlciBTdGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHN0b3JlO1xuICAgICAgICB2YXIgdXNlcjtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdG9yZSA9IGdldFN0b3JlKCk7XG4gICAgICAgICAgICB1c2VyID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gc3RvcmUuZ2V0U3RhdGUoKS51c2VyOyB9O1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgYmUgYXV0aG9yaXplZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNGYWxzZSh1c2VyKCkuYXV0aG9yaXplZCk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2UodXNlcigpLmVtYWlsKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNGYWxzZSh1c2VyKCkubmFtZSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2UodXNlcigpLnJvbGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBiZSBhdXRob3JpemVkIGFmdGVyIHNldEF1dGhvcml6ZWQgYWN0aW9uJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKHVzZXIoKS5hdXRob3JpemVkKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHVzZXJBY3Rpb25zXzEuc2V0QXV0aG9yaXplZCh0cnVlKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzVHJ1ZSh1c2VyKCkuYXV0aG9yaXplZCk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh1c2VyQWN0aW9uc18xLnNldEF1dGhvcml6ZWQoZmFsc2UpKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNGYWxzZSh1c2VyKCkuYXV0aG9yaXplZCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGhhdmUgdXNlciBkYXRhIGFmdGVyIHNldHRpbmcgdGhlIHVzZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2UodXNlcigpLmF1dGhvcml6ZWQpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKHVzZXIoKS5lbWFpbCk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2UodXNlcigpLm5hbWUpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKHVzZXIoKS5yb2xlKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHVzZXJBY3Rpb25zXzEuc2V0VXNlcih7XG4gICAgICAgICAgICAgICAgYXV0aG9yaXplZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdKYW5lIERvZScsXG4gICAgICAgICAgICAgICAgcm9sZTogJ2FkbWluJ1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc1RydWUodXNlcigpLmF1dGhvcml6ZWQpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbCh1c2VyKCkuZW1haWwsICd0ZXN0QHRlc3QuY29tJyk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKHVzZXIoKS5uYW1lLCAnSmFuZSBEb2UnKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwodXNlcigpLnJvbGUsICdhZG1pbicpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2godXNlckFjdGlvbnNfMS5zZXRVc2VyKHtcbiAgICAgICAgICAgICAgICBhdXRob3JpemVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlbWFpbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbmFtZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgcm9sZTogZmFsc2VcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNGYWxzZSh1c2VyKCkuYXV0aG9yaXplZCk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2UodXNlcigpLmVtYWlsKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNGYWxzZSh1c2VyKCkubmFtZSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2UodXNlcigpLnJvbGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgaGF2ZSB1c2VyIGRhdGEgYWZ0ZXIgbG9nZ2luZyBvdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh1c2VyQWN0aW9uc18xLnNldFVzZXIoe1xuICAgICAgICAgICAgICAgIGF1dGhvcml6ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnSmFuZSBEb2UnLFxuICAgICAgICAgICAgICAgIHJvbGU6ICdhZG1pbidcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHVzZXJBY3Rpb25zXzEubG9nb3V0VXNlcigpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHVzZXJBY3Rpb25zXzEuc2V0VXNlcih7XG4gICAgICAgICAgICAgICAgYXV0aG9yaXplZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgZW1haWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG5hbWU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJvbGU6IGZhbHNlXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdDaGFubmVscyBTdGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHN0b3JlO1xuICAgICAgICB2YXIgY2hhbm5lbHM7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUgPSBnZXRTdG9yZSgpO1xuICAgICAgICAgICAgY2hhbm5lbHMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBzdG9yZS5nZXRTdGF0ZSgpLmNoYW5uZWxzOyB9O1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBhZGQgY2hhbm5lbHMgZnJvbSBhbiBhcnJheSBvZiBjaGFubmVsIG5hbWVzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuYWRkQ2hhbm5lbHMoWydnZW5lcmFsJywgJ3JhbmRvbScsICdzb21ldGhpbmcgZWxzZSddKSk7XG4gICAgICAgICAgICB2YXIgYzAgPSBjaGFubmVscygpWzBdO1xuICAgICAgICAgICAgdmFyIGMxID0gY2hhbm5lbHMoKVsxXTtcbiAgICAgICAgICAgIHZhciBjMiA9IGNoYW5uZWxzKClbMl07XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChjMCwge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdnZW5lcmFsJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlczogW10sXG4gICAgICAgICAgICAgICAgcmV0cmlldmVNZXNzYWdlc09mZnNldDogMCxcbiAgICAgICAgICAgICAgICBoYXNNb3JlTWVzc2FnZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgZmV0Y2hpbmdOZXdNZXNzYWdlczogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGMxLCB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ3JhbmRvbScsXG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6IFtdLFxuICAgICAgICAgICAgICAgIHJldHJpZXZlTWVzc2FnZXNPZmZzZXQ6IDAsXG4gICAgICAgICAgICAgICAgaGFzTW9yZU1lc3NhZ2VzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGZldGNoaW5nTmV3TWVzc2FnZXM6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChjMiwge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdzb21ldGhpbmcgZWxzZScsXG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6IFtdLFxuICAgICAgICAgICAgICAgIHJldHJpZXZlTWVzc2FnZXNPZmZzZXQ6IDAsXG4gICAgICAgICAgICAgICAgaGFzTW9yZU1lc3NhZ2VzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGZldGNoaW5nTmV3TWVzc2FnZXM6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHVwZGF0ZSBmZXRjaGluZ05ld01lc3NhZ2VzIGFmdGVyIGNhbGxpbmcgc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMgYWN0aW9uJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuYWRkQ2hhbm5lbHMoWydnZW5lcmFsJywgJ3JhbmRvbScsICdzb21ldGhpbmcgZWxzZSddKSk7XG4gICAgICAgICAgICBjaGFubmVscygpLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2UoYy5mZXRjaGluZ05ld01lc3NhZ2VzKTtcbiAgICAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5zZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcyhjLm5hbWUsIHRydWUpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY2hhbm5lbHMoKS5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc1RydWUoYy5mZXRjaGluZ05ld01lc3NhZ2VzKTtcbiAgICAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5zZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcyhjLm5hbWUsIGZhbHNlKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNoYW5uZWxzKCkuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNGYWxzZShjLmZldGNoaW5nTmV3TWVzc2FnZXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGluY3JlbWVudCB0aGUgY2hhbm5lbCBvZmZzZXQgZm9yIHJldHJpZXZpbmcgbmV3IG1lc3NhZ2VzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuYWRkQ2hhbm5lbHMoWydnZW5lcmFsJywgJ3JhbmRvbScsICdzb21ldGhpbmcgZWxzZSddKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKGNoYW5uZWxzKCkuZmluZChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5uYW1lID09PSAnZ2VuZXJhbCc7IH0pLnJldHJpZXZlTWVzc2FnZXNPZmZzZXQsIDApO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChjaGFubmVscygpLmZpbmQoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUubmFtZSA9PT0gJ3JhbmRvbSc7IH0pLnJldHJpZXZlTWVzc2FnZXNPZmZzZXQsIDApO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChjaGFubmVscygpLmZpbmQoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUubmFtZSA9PT0gJ3NvbWV0aGluZyBlbHNlJzsgfSkucmV0cmlldmVNZXNzYWdlc09mZnNldCwgMCk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5pbmNyZW1lbnRDaGFubmVsUmV0cmlldmVNZXNzYWdlc09mZnNldCgnZ2VuZXJhbCcsIDIwKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKGNoYW5uZWxzKCkuZmluZChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5uYW1lID09PSAnZ2VuZXJhbCc7IH0pLnJldHJpZXZlTWVzc2FnZXNPZmZzZXQsIDIwKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmluY3JlbWVudENoYW5uZWxSZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0KCdnZW5lcmFsJywgMSkpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChjaGFubmVscygpLmZpbmQoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUubmFtZSA9PT0gJ2dlbmVyYWwnOyB9KS5yZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0LCAyMSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5pbmNyZW1lbnRDaGFubmVsUmV0cmlldmVNZXNzYWdlc09mZnNldCgncmFuZG9tJywgMSkpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChjaGFubmVscygpLmZpbmQoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUubmFtZSA9PT0gJ3JhbmRvbSc7IH0pLnJldHJpZXZlTWVzc2FnZXNPZmZzZXQsIDEpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuaW5jcmVtZW50Q2hhbm5lbFJldHJpZXZlTWVzc2FnZXNPZmZzZXQoJ3NvbWV0aGluZyBlbHNlJywgMSkpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChjaGFubmVscygpLmZpbmQoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUubmFtZSA9PT0gJ3NvbWV0aGluZyBlbHNlJzsgfSkucmV0cmlldmVNZXNzYWdlc09mZnNldCwgMSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHVwZGF0ZSB0aGUgaGFzTW9yZU1lc3NhZ2VzIHByb3BlcnR5IG9uIGEgY2hhbm5lbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmFkZENoYW5uZWxzKFsnZ2VuZXJhbCcsICdyYW5kb20nLCAnc29tZXRoaW5nIGVsc2UnXSkpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc1RydWUoY2hhbm5lbHMoKS5maW5kKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLm5hbWUgPT09ICdnZW5lcmFsJzsgfSkuaGFzTW9yZU1lc3NhZ2VzKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNUcnVlKGNoYW5uZWxzKCkuZmluZChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5uYW1lID09PSAncmFuZG9tJzsgfSkuaGFzTW9yZU1lc3NhZ2VzKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNUcnVlKGNoYW5uZWxzKCkuZmluZChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5uYW1lID09PSAnc29tZXRoaW5nIGVsc2UnOyB9KS5oYXNNb3JlTWVzc2FnZXMpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuc2V0Q2hhbm5lbEhhc01vcmVNZXNzYWdlcygnZ2VuZXJhbCcsIGZhbHNlKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5zZXRDaGFubmVsSGFzTW9yZU1lc3NhZ2VzKCdyYW5kb20nLCBmYWxzZSkpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuc2V0Q2hhbm5lbEhhc01vcmVNZXNzYWdlcygnc29tZXRoaW5nIGVsc2UnLCBmYWxzZSkpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKGNoYW5uZWxzKCkuZmluZChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5uYW1lID09PSAnZ2VuZXJhbCc7IH0pLmhhc01vcmVNZXNzYWdlcyk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2UoY2hhbm5lbHMoKS5maW5kKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLm5hbWUgPT09ICdyYW5kb20nOyB9KS5oYXNNb3JlTWVzc2FnZXMpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKGNoYW5uZWxzKCkuZmluZChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5uYW1lID09PSAnc29tZXRoaW5nIGVsc2UnOyB9KS5oYXNNb3JlTWVzc2FnZXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBhZGQgYSByZWNlaXZlZCBtZXNzYWdlIHRvIHRoZSBhcHByb3ByaWF0ZSBjaGFubmVsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuYWRkQ2hhbm5lbHMoWydnZW5lcmFsJywgJ3JhbmRvbScsICdzb21ldGhpbmcgZWxzZSddKSk7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICB1c2VyRW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICBjcmVhdGVkOiBEYXRlLm5vdygpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgX2lkOiAnMScsXG4gICAgICAgICAgICAgICAgdGV4dDogJ3RoaXMgaXMgdGhlIG1lc3NhZ2UnLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmFkZFJlY2VpdmVkQ2hhbm5lbE1lc3NhZ2UoJ2dlbmVyYWwnLCBtZXNzYWdlKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5hZGRSZWNlaXZlZENoYW5uZWxNZXNzYWdlKCdyYW5kb20nLCBtZXNzYWdlKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5hZGRSZWNlaXZlZENoYW5uZWxNZXNzYWdlKCdyYW5kb20nLCBtZXNzYWdlKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5hZGRSZWNlaXZlZENoYW5uZWxNZXNzYWdlKCdzb21ldGhpbmcgZWxzZScsIG1lc3NhZ2UpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmFkZFJlY2VpdmVkQ2hhbm5lbE1lc3NhZ2UoJ3NvbWV0aGluZyBlbHNlJywgbWVzc2FnZSkpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuYWRkUmVjZWl2ZWRDaGFubmVsTWVzc2FnZSgnc29tZXRoaW5nIGVsc2UnLCBtZXNzYWdlKSk7XG4gICAgICAgICAgICB2YXIgZ2VuZXJhbE1lc3NhZ2VzID0gY2hhbm5lbHMoKS5maW5kKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLm5hbWUgPT09ICdnZW5lcmFsJzsgfSkubWVzc2FnZXM7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChnZW5lcmFsTWVzc2FnZXMubGVuZ3RoLCAxKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGdlbmVyYWxNZXNzYWdlcywgW21lc3NhZ2VdKTtcbiAgICAgICAgICAgIHZhciByYW5kb21NZXNzYWdlcyA9IGNoYW5uZWxzKCkuZmluZChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5uYW1lID09PSAncmFuZG9tJzsgfSkubWVzc2FnZXM7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChyYW5kb21NZXNzYWdlcy5sZW5ndGgsIDIpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwocmFuZG9tTWVzc2FnZXMsIFttZXNzYWdlLCBtZXNzYWdlXSk7XG4gICAgICAgICAgICB2YXIgb3RoZXJNZXNzYWdlcyA9IGNoYW5uZWxzKCkuZmluZChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5uYW1lID09PSAnc29tZXRoaW5nIGVsc2UnOyB9KS5tZXNzYWdlcztcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKG90aGVyTWVzc2FnZXMubGVuZ3RoLCAzKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKG90aGVyTWVzc2FnZXMsIFttZXNzYWdlLCBtZXNzYWdlLCBtZXNzYWdlXSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGFkZCByZXRyZWl2ZWQgbWVzc2FnZXMgdG8gdGhlIGFwcHJvcHJpYXRlIGNoYW5uZWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5hZGRDaGFubmVscyhbJ2dlbmVyYWwnLCAncmFuZG9tJywgJ3NvbWV0aGluZyBlbHNlJ10pKTtcbiAgICAgICAgICAgIHZhciBtZXNzYWdlcyA9IFtcbiAgICAgICAgICAgICAgICB7IFwidGV4dFwiOiBcIlNvbWV0aGluZyBoZXJlXCIsIFwiY3JlYXRlZFwiOiBcIjIwMTktMDQtMTNUMTY6NDU6MjguOTQ2WlwiLCBcInVzZXJFbWFpbFwiOiBcImFia290aG1hbkBnbWFpbC5jb21cIiwgXCJfaWRcIjogXCI1Y2IyMTIyODFkNjQ1YTIyYWJlYThkYmVcIiB9LFxuICAgICAgICAgICAgICAgIHsgXCJ0ZXh0XCI6IFwiMTIzNDEyMzRcIiwgXCJjcmVhdGVkXCI6IFwiMjAxOS0wNC0xNFQyMjozNDowNi42ODZaXCIsIFwidXNlckVtYWlsXCI6IFwiYWJrb3RobWFuQGdtYWlsLmNvbVwiLCBcIl9pZFwiOiBcIjVjYjNiNTVlY2JmNjhjNmE5NTRlYWZiM1wiIH0sXG4gICAgICAgICAgICAgICAgeyBcInRleHRcIjogXCJ0ZXN0IG9uZSB0d28gdGhyZWVcIiwgXCJjcmVhdGVkXCI6IFwiMjAxOS0wNC0xNFQyMjozNDoxMC45MDNaXCIsIFwidXNlckVtYWlsXCI6IFwiYWJrb3RobWFuQGdtYWlsLmNvbVwiLCBcIl9pZFwiOiBcIjVjYjNiNTYyY2JmNjhjNmE5NTRlYWZiNFwiIH1cbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5hZGRSZXRyaWV2ZWRDaGFubmVsTWVzc2FnZXMoJ2dlbmVyYWwnLCBtZXNzYWdlcykpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuYWRkUmV0cmlldmVkQ2hhbm5lbE1lc3NhZ2VzKCdyYW5kb20nLCBtZXNzYWdlcykpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuYWRkUmV0cmlldmVkQ2hhbm5lbE1lc3NhZ2VzKCdyYW5kb20nLCBtZXNzYWdlcykpO1xuICAgICAgICAgICAgdmFyIGNoYW5uZWxTdGF0ZSA9IGNoYW5uZWxzKCk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChjaGFubmVsU3RhdGVcbiAgICAgICAgICAgICAgICAuZmluZChmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5uYW1lID09PSAnZ2VuZXJhbCc7IH0pXG4gICAgICAgICAgICAgICAgLm1lc3NhZ2VzLCBtZXNzYWdlcyk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChjaGFubmVsU3RhdGVcbiAgICAgICAgICAgICAgICAuZmluZChmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5uYW1lID09PSAncmFuZG9tJzsgfSlcbiAgICAgICAgICAgICAgICAubWVzc2FnZXMsIG1lc3NhZ2VzLmNvbmNhdChtZXNzYWdlcykpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoY2hhbm5lbFN0YXRlXG4gICAgICAgICAgICAgICAgLmZpbmQoZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGMubmFtZSA9PT0gJ3NvbWV0aGluZyBlbHNlJzsgfSlcbiAgICAgICAgICAgICAgICAubWVzc2FnZXMsIFtdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgY2xlYXIgYWxsIGNoYW5uZWwgZGF0YScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmFkZENoYW5uZWxzKFsnZ2VuZXJhbCcsICdyYW5kb20nLCAnc29tZXRoaW5nIGVsc2UnXSkpO1xuICAgICAgICAgICAgdmFyIG1lc3NhZ2VzID0gW1xuICAgICAgICAgICAgICAgIHsgXCJ0ZXh0XCI6IFwiU29tZXRoaW5nIGhlcmVcIiwgXCJjcmVhdGVkXCI6IFwiMjAxOS0wNC0xM1QxNjo0NToyOC45NDZaXCIsIFwidXNlckVtYWlsXCI6IFwiYWJrb3RobWFuQGdtYWlsLmNvbVwiLCBcIl9pZFwiOiBcIjVjYjIxMjI4MWQ2NDVhMjJhYmVhOGRiZVwiIH0sXG4gICAgICAgICAgICAgICAgeyBcInRleHRcIjogXCIxMjM0MTIzNFwiLCBcImNyZWF0ZWRcIjogXCIyMDE5LTA0LTE0VDIyOjM0OjA2LjY4NlpcIiwgXCJ1c2VyRW1haWxcIjogXCJhYmtvdGhtYW5AZ21haWwuY29tXCIsIFwiX2lkXCI6IFwiNWNiM2I1NWVjYmY2OGM2YTk1NGVhZmIzXCIgfSxcbiAgICAgICAgICAgICAgICB7IFwidGV4dFwiOiBcInRlc3Qgb25lIHR3byB0aHJlZVwiLCBcImNyZWF0ZWRcIjogXCIyMDE5LTA0LTE0VDIyOjM0OjEwLjkwM1pcIiwgXCJ1c2VyRW1haWxcIjogXCJhYmtvdGhtYW5AZ21haWwuY29tXCIsIFwiX2lkXCI6IFwiNWNiM2I1NjJjYmY2OGM2YTk1NGVhZmI0XCIgfVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcygnZ2VuZXJhbCcsIG1lc3NhZ2VzKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5hZGRSZXRyaWV2ZWRDaGFubmVsTWVzc2FnZXMoJ3JhbmRvbScsIG1lc3NhZ2VzKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5hZGRSZXRyaWV2ZWRDaGFubmVsTWVzc2FnZXMoJ3JhbmRvbScsIG1lc3NhZ2VzKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5jbGVhckNoYW5uZWxzRGF0YSgpKTtcbiAgICAgICAgICAgIHZhciBjaGFubmVsU3RhdGUgPSBjaGFubmVscygpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoY2hhbm5lbFN0YXRlLCBbXSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdOb3RpZmljYXRpb25zIFN0YXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc3RvcmU7XG4gICAgICAgIHZhciBub3RpZmljYXRpb25zO1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlID0gZ2V0U3RvcmUoKTtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvbnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBzdG9yZS5nZXRTdGF0ZSgpLm5vdGlmaWNhdGlvbnM7IH07XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGFkZCBlcnJvcnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuZXJyb3JzLCBbXSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKCdUZXN0IGVycm9yJykpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmVycm9ycywgWydUZXN0IGVycm9yJ10pO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignQW5vdGhlciBlcnJvcicpKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5vdGlmaWNhdGlvbnMoKS5lcnJvcnMsIFsnVGVzdCBlcnJvcicsICdBbm90aGVyIGVycm9yJ10pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZW1vdmUgZXJyb3JzIGdpdmVuIGFuIGluZGV4JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignVGVzdCBlcnJvcicpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ0Fub3RoZXIgZXJyb3InKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuZXJyb3JzLCBbJ1Rlc3QgZXJyb3InLCAnQW5vdGhlciBlcnJvciddKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEucmVtb3ZlRXJyb3IoMSkpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmVycm9ycywgWydUZXN0IGVycm9yJ10pO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5yZW1vdmVFcnJvcigwKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuZXJyb3JzLCBbXSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGNsZWFyIGVycm9ycycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ1Rlc3QgZXJyb3InKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKCdBbm90aGVyIGVycm9yJykpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5jbGVhckVycm9ycygpKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5vdGlmaWNhdGlvbnMoKS5lcnJvcnMsIFtdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgYWRkIGluZm8nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuaW5mb3MsIFtdKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkSW5mbygnVGVzdCBpbmZvJykpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmluZm9zLCBbJ1Rlc3QgaW5mbyddKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkSW5mbygnQW5vdGhlciBpbmZvJykpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmluZm9zLCBbJ1Rlc3QgaW5mbycsICdBbm90aGVyIGluZm8nXSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJlbW92ZSBpbmZvIGdpdmVuIGFuIGluZGV4JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRJbmZvKCdUZXN0IGluZm8nKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEluZm8oJ0Fub3RoZXIgaW5mbycpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEucmVtb3ZlSW5mbygxKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuaW5mb3MsIFsnVGVzdCBpbmZvJ10pO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5yZW1vdmVJbmZvKDApKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5vdGlmaWNhdGlvbnMoKS5pbmZvcywgW10pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBjbGVhciBpbmZvcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkSW5mbygnVGVzdCBpbmZvJykpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRJbmZvKCdBbm90aGVyIGluZm8nKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmNsZWFySW5mb3MoKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuaW5mb3MsIFtdKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ1NpZGViYXIgU3RhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdG9yZTtcbiAgICAgICAgdmFyIHNpZGViYXI7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUgPSBnZXRTdG9yZSgpO1xuICAgICAgICAgICAgc2lkZWJhciA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN0b3JlLmdldFN0YXRlKCkuc2lkZWJhcjsgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgdG9nZ2xlIG9wZW4gc3RhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzVHJ1ZShzaWRlYmFyKCkub3Blbik7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzaWRlYmFyQWN0aW9uc18xLnRvZ2dsZVNpZGViYXJPcGVuKCkpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKHNpZGViYXIoKS5vcGVuKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNpZGViYXJBY3Rpb25zXzEudG9nZ2xlU2lkZWJhck9wZW4oKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzVHJ1ZShzaWRlYmFyKCkub3Blbik7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzaWRlYmFyQWN0aW9uc18xLnRvZ2dsZVNpZGViYXJPcGVuKCkpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKHNpZGViYXIoKS5vcGVuKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ1NvY2tldCBTdGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHN0b3JlO1xuICAgICAgICB2YXIgc29ja2V0O1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlID0gZ2V0U3RvcmUoKTtcbiAgICAgICAgICAgIHNvY2tldCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN0b3JlLmdldFN0YXRlKCkuc29ja2V0OyB9O1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBzZXQgdGhlIHNvY2tldCBnaXZlbiBhIFNvY2tldElPQ2xpZW50IFNvY2tldCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKHNvY2tldCgpLCB7XG4gICAgICAgICAgICAgICAgaW86IG51bGwsXG4gICAgICAgICAgICAgICAgY29ubmVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb25uZWN0ZWRVc2VyRW1haWxzOiBbXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgc29ja2V0aW8gPSBzb2NrZXRpb2NsaWVudCgpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc29ja2V0QWN0aW9uc18xLmluaXRXZWJzb2NrZXQoc29ja2V0aW8pKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKHNvY2tldCgpLCB7XG4gICAgICAgICAgICAgICAgaW86IHNvY2tldGlvLFxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29ubmVjdGVkVXNlckVtYWlsczogW11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc29ja2V0aW8uY2xvc2UoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgdXBkYXRlIHRoZSBjb25uZWN0ZWQgc3RhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzb2NrZXRBY3Rpb25zXzEuc2V0U29ja2V0Q29ubmVjdGVkKHRydWUpKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKHNvY2tldCgpLCB7XG4gICAgICAgICAgICAgICAgaW86IG51bGwsXG4gICAgICAgICAgICAgICAgY29ubmVjdGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZFVzZXJFbWFpbHM6IFtdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNvY2tldEFjdGlvbnNfMS5zZXRTb2NrZXRDb25uZWN0ZWQoZmFsc2UpKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKHNvY2tldCgpLCB7XG4gICAgICAgICAgICAgICAgaW86IG51bGwsXG4gICAgICAgICAgICAgICAgY29ubmVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb25uZWN0ZWRVc2VyRW1haWxzOiBbXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHVwZGF0ZSB0aGUgY29ubmVjdGVkIHVzZXJzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGVtYWlscyA9IFsndGVzdEB0ZXN0LmNvbScsICd0ZXN0MkB0ZXN0LmNvbSddO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc29ja2V0QWN0aW9uc18xLnNldFNvY2tldENvbm5lY3RlZFVzZXJzKGVtYWlscykpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoc29ja2V0KCksIHtcbiAgICAgICAgICAgICAgICBpbzogbnVsbCxcbiAgICAgICAgICAgICAgICBjb25uZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZFVzZXJFbWFpbHM6IGVtYWlsc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdDaGF0IFVzZXJzIFN0YXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc3RvcmU7XG4gICAgICAgIHZhciBjaGF0VXNlcnM7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUgPSBnZXRTdG9yZSgpO1xuICAgICAgICAgICAgY2hhdFVzZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gc3RvcmUuZ2V0U3RhdGUoKS5jaGF0VXNlcnM7IH07XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHVwZGF0ZSB1c2VycycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB1c2VycyA9IHtcbiAgICAgICAgICAgICAgICAndGVzdEB0ZXN0LmNvbSc6IHtcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogJ3VzZXInLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnVGVzdCBOYW1lJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ3Rlc3QyQHRlc3QuY29tJzoge1xuICAgICAgICAgICAgICAgICAgICByb2xlOiAnYWRtaW4nLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnQW5vdGhlciB0ZXN0J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ3Rlc3QzQHRlc3QuY29tJzoge1xuICAgICAgICAgICAgICAgICAgICByb2xlOiAnYWRtaW4nLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnTGFzdCB0ZXN0J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGF0VXNlcnNBY3Rpb25zXzEudXBkYXRlVXNlcnModXNlcnMpKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGNoYXRVc2VycygpLCB1c2Vycyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lkR1Z6ZEZOMGIzSmxMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dmRHVnpkSE12ZDJWaUwzUmxjM1JUZEc5eVpTNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenRCUVVGQkxEWkNRVUU0UWp0QlFVTTVRaXhwUWtGQlpUdEJRVU5tTEdsRVFVRnRSRHRCUVVWdVJDdzJRMEZCYlVVN1FVRkZia1VzSzBKQlFUSkRPMEZCUXpORExHbEZRVUYxUmp0QlFVTjJSaXg1UlVGQmFWQTdRVUZGYWxBc2JVWkJRV2xKTzBGQlEycEpMSFZGUVVGNVJUdEJRVU42UlN4eFJVRkJhVWc3UVVGRGFrZ3NNa1ZCUVRCR08wRkJSekZHTEZOQlFWTXNVVUZCVVR0SlFVTmlMRTlCUVU4c2JVSkJRVmNzUTBGQlF5eHRRa0ZCVnl4RlFVRkZMR3RDUVVGVkxFTkJRVU1zUTBGQlF6dEJRVU5vUkN4RFFVRkRPMEZCUlVRc1VVRkJVU3hEUVVGRExDdENRVUVyUWl4RlFVRkZPMGxCUTNSRExGRkJRVkVzUTBGQlF5eFpRVUZaTEVWQlFVVTdVVUZEYmtJc1NVRkJTU3hMUVVGdFFpeERRVUZETzFGQlEzaENMRWxCUVVrc1NVRkJNa0lzUTBGQlF6dFJRVU5vUXl4VlFVRlZMRU5CUVVNN1dVRkRVQ3hMUVVGTExFZEJRVWNzVVVGQlVTeEZRVUZGTEVOQlFVTTdXVUZEYmtJc1NVRkJTU3hIUVVGSExHTkJRVTBzVDBGQlFTeExRVUZMTEVOQlFVTXNVVUZCVVN4RlFVRkZMRU5CUVVNc1NVRkJTU3hGUVVGeVFpeERRVUZ4UWl4RFFVRkRPMUZCUTNaRExFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NSVUZCUlN4RFFVRkRMREJDUVVFd1FpeEZRVUZGTzFsQlF6TkNMR0ZCUVUwc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeEZRVUZGTEVOQlFVTXNWVUZCVlN4RFFVRkRMRU5CUVVNN1dVRkRiRU1zWVVGQlRTeERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dFpRVU0zUWl4aFFVRk5MRU5CUVVNc1QwRkJUeXhEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMWxCUXpWQ0xHRkJRVTBzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RlFVRkZMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRGFFTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hGUVVGRkxFTkJRVU1zYVVSQlFXbEVMRVZCUVVVN1dVRkRiRVFzWVVGQlRTeERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJReXhWUVVGVkxFTkJRVU1zUTBGQlF6dFpRVU5zUXl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExESkNRVUZoTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOd1F5eGhRVUZOTEVOQlFVTXNUVUZCVFN4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExGVkJRVlVzUTBGQlF5eERRVUZETzFsQlEycERMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zTWtKQlFXRXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRM0pETEdGQlFVMHNRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zVlVGQlZTeERRVUZETEVOQlFVTTdVVUZEZEVNc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEZRVUZGTEVOQlFVTXNPRU5CUVRoRExFVkJRVVU3V1VGREwwTXNZVUZCVFN4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eFZRVUZWTEVOQlFVTXNRMEZCUXp0WlFVTnNReXhoUVVGTkxFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRE8xbEJRemRDTEdGQlFVMHNRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdXVUZETlVJc1lVRkJUU3hEUVVGRExFOUJRVThzUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRaUVVNMVFpeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMSEZDUVVGUExFTkJRVU03WjBKQlEyNUNMRlZCUVZVc1JVRkJSU3hKUVVGSk8yZENRVU5vUWl4TFFVRkxMRVZCUVVVc1pVRkJaVHRuUWtGRGRFSXNTVUZCU1N4RlFVRkZMRlZCUVZVN1owSkJRMmhDTEVsQlFVa3NSVUZCUlN4UFFVRlBPMkZCUTJoQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEwb3NZVUZCVFN4RFFVRkRMRTFCUVUwc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eFZRVUZWTEVOQlFVTXNRMEZCUXp0WlFVTnFReXhoUVVGTkxFTkJRVU1zVjBGQlZ5eERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRXRCUVVzc1JVRkJSU3hsUVVGbExFTkJRVU1zUTBGQlF6dFpRVU5zUkN4aFFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETEVsQlFVa3NSVUZCUlN4VlFVRlZMRU5CUVVNc1EwRkJRenRaUVVNMVF5eGhRVUZOTEVOQlFVTXNWMEZCVnl4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFbEJRVWtzUlVGQlJTeFBRVUZQTEVOQlFVTXNRMEZCUXp0WlFVTjZReXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEhGQ1FVRlBMRU5CUVVNN1owSkJRMjVDTEZWQlFWVXNSVUZCUlN4TFFVRkxPMmRDUVVOcVFpeExRVUZMTEVWQlFVVXNTMEZCU3p0blFrRkRXaXhKUVVGSkxFVkJRVVVzUzBGQlN6dG5Ra0ZEV0N4SlFVRkpMRVZCUVVVc1MwRkJTenRoUVVOa0xFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEwb3NZVUZCVFN4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eFZRVUZWTEVOQlFVTXNRMEZCUXp0WlFVTnNReXhoUVVGTkxFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRE8xbEJRemRDTEdGQlFVMHNRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdXVUZETlVJc1lVRkJUU3hEUVVGRExFOUJRVThzUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVOb1F5eERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXcyUTBGQk5rTXNSVUZCUlR0WlFVTTVReXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEhGQ1FVRlBMRU5CUVVNN1owSkJRMjVDTEZWQlFWVXNSVUZCUlN4SlFVRkpPMmRDUVVOb1FpeExRVUZMTEVWQlFVVXNaVUZCWlR0blFrRkRkRUlzU1VGQlNTeEZRVUZGTEZWQlFWVTdaMEpCUTJoQ0xFbEJRVWtzUlVGQlJTeFBRVUZQTzJGQlEyaENMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMG9zUzBGQlN5eERRVUZETEZGQlFWRXNRMEZCUXl4M1FrRkJWU3hGUVVGRkxFTkJRVU1zUTBGQlF6dFpRVU0zUWl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExIRkNRVUZQTEVOQlFVTTdaMEpCUTI1Q0xGVkJRVlVzUlVGQlJTeExRVUZMTzJkQ1FVTnFRaXhMUVVGTExFVkJRVVVzUzBGQlN6dG5Ra0ZEV2l4SlFVRkpMRVZCUVVVc1MwRkJTenRuUWtGRFdDeEpRVUZKTEVWQlFVVXNTMEZCU3p0aFFVTmtMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMUlzUTBGQlF5eERRVUZETEVOQlFVRTdTVUZEVGl4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOSUxGRkJRVkVzUTBGQlF5eG5Ra0ZCWjBJc1JVRkJSVHRSUVVOMlFpeEpRVUZKTEV0QlFXMUNMRU5CUVVNN1VVRkRlRUlzU1VGQlNTeFJRVUZ0UXl4RFFVRkRPMUZCUTNoRExGVkJRVlVzUTBGQlF6dFpRVU5RTEV0QlFVc3NSMEZCUnl4UlFVRlJMRVZCUVVVc1EwRkJRenRaUVVOdVFpeFJRVUZSTEVkQlFVY3NZMEZCVFN4UFFVRkJMRXRCUVVzc1EwRkJReXhSUVVGUkxFVkJRVVVzUTBGQlF5eFJRVUZSTEVWQlFYcENMRU5CUVhsQ0xFTkJRVU03VVVGREwwTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hGUVVGRkxFTkJRVU1zYjBSQlFXOUVMRVZCUVVVN1dVRkRja1FzUzBGQlN5eERRVUZETEZGQlFWRXNRMEZCUXl3MlFrRkJWeXhEUVVGRExFTkJRVU1zVTBGQlV5eEZRVUZGTEZGQlFWRXNSVUZCUlN4blFrRkJaMElzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTnlSU3hKUVVGSkxFVkJRVVVzUjBGQmVVSXNVVUZCVVN4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRE4wTXNTVUZCU1N4RlFVRkZMRWRCUVhsQ0xGRkJRVkVzUlVGQlJTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUXpkRExFbEJRVWtzUlVGQlJTeEhRVUY1UWl4UlFVRlJMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU0zUXl4aFFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExFVkJRVVVzUlVGQlJUdG5Ra0ZEZGtJc1NVRkJTU3hGUVVGRkxGTkJRVk03WjBKQlEyWXNVVUZCVVN4RlFVRkZMRVZCUVVVN1owSkJRMW9zYzBKQlFYTkNMRVZCUVVVc1EwRkJRenRuUWtGRGVrSXNaVUZCWlN4RlFVRkZMRWxCUVVrN1owSkJRM0pDTEcxQ1FVRnRRaXhGUVVGRkxFdEJRVXM3WVVGRE4wSXNRMEZCUXl4RFFVRkRPMWxCUTBnc1lVRkJUU3hEUVVGRExHVkJRV1VzUTBGQlF5eEZRVUZGTEVWQlFVVTdaMEpCUTNaQ0xFbEJRVWtzUlVGQlJTeFJRVUZSTzJkQ1FVTmtMRkZCUVZFc1JVRkJSU3hGUVVGRk8yZENRVU5hTEhOQ1FVRnpRaXhGUVVGRkxFTkJRVU03WjBKQlEzcENMR1ZCUVdVc1JVRkJSU3hKUVVGSk8yZENRVU55UWl4dFFrRkJiVUlzUlVGQlJTeExRVUZMTzJGQlF6ZENMRU5CUVVNc1EwRkJRenRaUVVOSUxHRkJRVTBzUTBGQlF5eGxRVUZsTEVOQlFVTXNSVUZCUlN4RlFVRkZPMmRDUVVOMlFpeEpRVUZKTEVWQlFVVXNaMEpCUVdkQ08yZENRVU4wUWl4UlFVRlJMRVZCUVVVc1JVRkJSVHRuUWtGRFdpeHpRa0ZCYzBJc1JVRkJSU3hEUVVGRE8yZENRVU42UWl4bFFVRmxMRVZCUVVVc1NVRkJTVHRuUWtGRGNrSXNiVUpCUVcxQ0xFVkJRVVVzUzBGQlN6dGhRVU0zUWl4RFFVRkRMRU5CUVVNN1VVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl4elJrRkJjMFlzUlVGQlJUdFpRVU4yUml4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExEWkNRVUZYTEVOQlFVTXNRMEZCUXl4VFFVRlRMRVZCUVVVc1VVRkJVU3hGUVVGRkxHZENRVUZuUWl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRM0pGTEZGQlFWRXNSVUZCUlN4RFFVRkRMRTlCUVU4c1EwRkJReXhWUVVGRExFTkJRWFZDTzJkQ1FVTjJReXhoUVVGTkxFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTXNRMEZCUXl4dFFrRkJiVUlzUTBGQlF5eERRVUZETzJkQ1FVTjBReXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEN0RFFVRTJRaXhEUVVGRExFTkJRVU1zUTBGQlF5eEpRVUZKTEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOb1JTeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTklMRkZCUVZFc1JVRkJSU3hEUVVGRExFOUJRVThzUTBGQlF5eFZRVUZETEVOQlFYVkNPMmRDUVVOMlF5eGhRVUZOTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNc1EwRkJReXh0UWtGQmJVSXNRMEZCUXl4RFFVRkRPMmRDUVVOeVF5eExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMQ3REUVVFMlFpeERRVUZETEVOQlFVTXNRMEZCUXl4SlFVRkpMRVZCUVVVc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU5xUlN4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOSUxGRkJRVkVzUlVGQlJTeERRVUZETEU5QlFVOHNRMEZCUXl4VlFVRkRMRU5CUVhWQ08yZENRVU4yUXl4aFFVRk5MRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU1zUTBGQlF5eHRRa0ZCYlVJc1EwRkJReXhEUVVGRE8xbEJRekZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTFBc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEZRVUZGTEVOQlFVTXNhVVZCUVdsRkxFVkJRVVU3V1VGRGJFVXNTMEZCU3l4RFFVRkRMRkZCUVZFc1EwRkJReXcyUWtGQlZ5eERRVUZETEVOQlFVTXNVMEZCVXl4RlFVRkZMRkZCUVZFc1JVRkJSU3huUWtGQlowSXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOeVJTeGhRVUZOTEVOQlFVTXNWMEZCVnl4RFFVRkRMRkZCUVZFc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZCTEVOQlFVTXNTVUZCU1N4UFFVRkJMRU5CUVVNc1EwRkJReXhKUVVGSkxFdEJRVXNzVTBGQlV5eEZRVUZ3UWl4RFFVRnZRaXhEUVVGRExFTkJRVU1zYzBKQlFYTkNMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRGVrWXNZVUZCVFN4RFFVRkRMRmRCUVZjc1EwRkJReXhSUVVGUkxFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUVN4RFFVRkRMRWxCUVVrc1QwRkJRU3hEUVVGRExFTkJRVU1zU1VGQlNTeExRVUZMTEZGQlFWRXNSVUZCYmtJc1EwRkJiVUlzUTBGQlF5eERRVUZETEhOQ1FVRnpRaXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEzaEdMR0ZCUVUwc1EwRkJReXhYUVVGWExFTkJRVU1zVVVGQlVTeEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVVFc1EwRkJReXhKUVVGSkxFOUJRVUVzUTBGQlF5eERRVUZETEVsQlFVa3NTMEZCU3l4blFrRkJaMElzUlVGQk0wSXNRMEZCTWtJc1EwRkJReXhEUVVGRExITkNRVUZ6UWl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMmhITEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc2QwUkJRWE5ETEVOQlFVTXNVMEZCVXl4RlFVRkZMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVUU3V1VGRGNrVXNZVUZCVFN4RFFVRkRMRmRCUVZjc1EwRkJReXhSUVVGUkxFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUVN4RFFVRkRMRWxCUVVrc1QwRkJRU3hEUVVGRExFTkJRVU1zU1VGQlNTeExRVUZMTEZOQlFWTXNSVUZCY0VJc1EwRkJiMElzUTBGQlF5eERRVUZETEhOQ1FVRnpRaXhGUVVGRkxFVkJRVVVzUTBGQlF5eERRVUZETzFsQlF6RkdMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zZDBSQlFYTkRMRU5CUVVNc1UwRkJVeXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVRTdXVUZEY0VVc1lVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eFJRVUZSTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJRU3hEUVVGRExFbEJRVWtzVDBGQlFTeERRVUZETEVOQlFVTXNTVUZCU1N4TFFVRkxMRk5CUVZNc1JVRkJjRUlzUTBGQmIwSXNRMEZCUXl4RFFVRkRMSE5DUVVGelFpeEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkRPMWxCUXpGR0xFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNkMFJCUVhORExFTkJRVU1zVVVGQlVTeEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVFN1dVRkRia1VzWVVGQlRTeERRVUZETEZkQlFWY3NRMEZCUXl4UlFVRlJMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlFTeERRVUZETEVsQlFVa3NUMEZCUVN4RFFVRkRMRU5CUVVNc1NVRkJTU3hMUVVGTExGRkJRVkVzUlVGQmJrSXNRMEZCYlVJc1EwRkJReXhEUVVGRExITkNRVUZ6UWl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRM2hHTEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc2QwUkJRWE5ETEVOQlFVTXNaMEpCUVdkQ0xFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUVR0WlFVTXpSU3hoUVVGTkxFTkJRVU1zVjBGQlZ5eERRVUZETEZGQlFWRXNSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGQkxFTkJRVU1zU1VGQlNTeFBRVUZCTEVOQlFVTXNRMEZCUXl4SlFVRkpMRXRCUVVzc1owSkJRV2RDTEVWQlFUTkNMRU5CUVRKQ0xFTkJRVU1zUTBGQlF5eHpRa0ZCYzBJc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU53Unl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5eDVSRUZCZVVRc1JVRkJSVHRaUVVNeFJDeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMRFpDUVVGWExFTkJRVU1zUTBGQlF5eFRRVUZUTEVWQlFVVXNVVUZCVVN4RlFVRkZMR2RDUVVGblFpeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTNKRkxHRkJRVTBzUTBGQlF5eE5RVUZOTEVOQlFVTXNVVUZCVVN4RlFVRkZMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVUVzUTBGQlF5eEpRVUZKTEU5QlFVRXNRMEZCUXl4RFFVRkRMRWxCUVVrc1MwRkJTeXhUUVVGVExFVkJRWEJDTEVOQlFXOUNMRU5CUVVNc1EwRkJReXhsUVVGbExFTkJRVU1zUTBGQlF6dFpRVU14UlN4aFFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExGRkJRVkVzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRkJMRU5CUVVNc1NVRkJTU3hQUVVGQkxFTkJRVU1zUTBGQlF5eEpRVUZKTEV0QlFVc3NVVUZCVVN4RlFVRnVRaXhEUVVGdFFpeERRVUZETEVOQlFVTXNaVUZCWlN4RFFVRkRMRU5CUVVNN1dVRkRla1VzWVVGQlRTeERRVUZETEUxQlFVMHNRMEZCUXl4UlFVRlJMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlFTeERRVUZETEVsQlFVa3NUMEZCUVN4RFFVRkRMRU5CUVVNc1NVRkJTU3hMUVVGTExHZENRVUZuUWl4RlFVRXpRaXhEUVVFeVFpeERRVUZETEVOQlFVTXNaVUZCWlN4RFFVRkRMRU5CUVVNN1dVRkRha1lzUzBGQlN5eERRVUZETEZGQlFWRXNRMEZCUXl3eVEwRkJlVUlzUTBGQlF5eFRRVUZUTEVWQlFVVXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVNMVJDeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMREpEUVVGNVFpeERRVUZETEZGQlFWRXNSVUZCUlN4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRek5FTEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc01rTkJRWGxDTEVOQlFVTXNaMEpCUVdkQ0xFVkJRVVVzUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTnVSU3hoUVVGTkxFTkJRVU1zVDBGQlR5eERRVUZETEZGQlFWRXNSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGQkxFTkJRVU1zU1VGQlNTeFBRVUZCTEVOQlFVTXNRMEZCUXl4SlFVRkpMRXRCUVVzc1UwRkJVeXhGUVVGd1FpeERRVUZ2UWl4RFFVRkRMRU5CUVVNc1pVRkJaU3hEUVVGRExFTkJRVU03V1VGRE0wVXNZVUZCVFN4RFFVRkRMRTlCUVU4c1EwRkJReXhSUVVGUkxFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUVN4RFFVRkRMRWxCUVVrc1QwRkJRU3hEUVVGRExFTkJRVU1zU1VGQlNTeExRVUZMTEZGQlFWRXNSVUZCYmtJc1EwRkJiVUlzUTBGQlF5eERRVUZETEdWQlFXVXNRMEZCUXl4RFFVRkRPMWxCUXpGRkxHRkJRVTBzUTBGQlF5eFBRVUZQTEVOQlFVTXNVVUZCVVN4RlFVRkZMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVUVzUTBGQlF5eEpRVUZKTEU5QlFVRXNRMEZCUXl4RFFVRkRMRWxCUVVrc1MwRkJTeXhuUWtGQlowSXNSVUZCTTBJc1EwRkJNa0lzUTBGQlF5eERRVUZETEdWQlFXVXNRMEZCUXl4RFFVRkRPMUZCUTNSR0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NSVUZCUlN4RFFVRkRMREJFUVVFd1JDeEZRVUZGTzFsQlF6TkVMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zTmtKQlFWY3NRMEZCUXl4RFFVRkRMRk5CUVZNc1JVRkJSU3hSUVVGUkxFVkJRVVVzWjBKQlFXZENMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRGNrVXNTVUZCU1N4UFFVRlBMRWRCUVZrN1owSkJRMjVDTEZOQlFWTXNSVUZCUlN4bFFVRmxPMmRDUVVNeFFpeFBRVUZQTEVWQlFVVXNTVUZCU1N4RFFVRkRMRWRCUVVjc1JVRkJSU3hEUVVGRExGRkJRVkVzUlVGQlJUdG5Ra0ZET1VJc1IwRkJSeXhGUVVGRkxFZEJRVWM3WjBKQlExSXNTVUZCU1N4RlFVRkZMSEZDUVVGeFFqdGhRVU01UWl4RFFVRkRPMWxCUlVZc1MwRkJTeXhEUVVGRExGRkJRVkVzUTBGQlF5d3lRMEZCZVVJc1EwRkJReXhUUVVGVExFVkJRVVVzVDBGQlR5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTTVSQ3hMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETERKRFFVRjVRaXhEUVVGRExGRkJRVkVzUlVGQlJTeFBRVUZQTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUXpkRUxFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNNa05CUVhsQ0xFTkJRVU1zVVVGQlVTeEZRVUZGTEU5QlFVOHNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkROMFFzUzBGQlN5eERRVUZETEZGQlFWRXNRMEZCUXl3eVEwRkJlVUlzUTBGQlF5eG5Ra0ZCWjBJc1JVRkJSU3hQUVVGUExFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEzSkZMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zTWtOQlFYbENMRU5CUVVNc1owSkJRV2RDTEVWQlFVVXNUMEZCVHl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOeVJTeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMREpEUVVGNVFpeERRVUZETEdkQ1FVRm5RaXhGUVVGRkxFOUJRVThzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZGY2tVc1NVRkJTU3hsUVVGbExFZEJRV01zVVVGQlVTeEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVVFc1EwRkJReXhKUVVGSkxFOUJRVUVzUTBGQlF5eERRVUZETEVsQlFVa3NTMEZCU3l4VFFVRlRMRVZCUVhCQ0xFTkJRVzlDTEVOQlFVTXNRMEZCUXl4UlFVRlJMRU5CUVVNN1dVRkRja1lzWVVGQlRTeERRVUZETEdWQlFXVXNRMEZCUXl4bFFVRmxMRU5CUVVNc1RVRkJUU3hGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEyeEVMR0ZCUVUwc1EwRkJReXhsUVVGbExFTkJRVU1zWlVGQlpTeEZRVUZGTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOdVJDeEpRVUZKTEdOQlFXTXNSMEZCWXl4UlFVRlJMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlFTeERRVUZETEVsQlFVa3NUMEZCUVN4RFFVRkRMRU5CUVVNc1NVRkJTU3hMUVVGTExGRkJRVkVzUlVGQmJrSXNRMEZCYlVJc1EwRkJReXhEUVVGRExGRkJRVkVzUTBGQlF6dFpRVU51Uml4aFFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExHTkJRV01zUTBGQlF5eE5RVUZOTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRha1FzWVVGQlRTeERRVUZETEdWQlFXVXNRMEZCUXl4alFVRmpMRVZCUVVVc1EwRkJReXhQUVVGUExFVkJRVVVzVDBGQlR5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTXpSQ3hKUVVGSkxHRkJRV0VzUjBGQll5eFJRVUZSTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJRU3hEUVVGRExFbEJRVWtzVDBGQlFTeERRVUZETEVOQlFVTXNTVUZCU1N4TFFVRkxMR2RDUVVGblFpeEZRVUV6UWl4RFFVRXlRaXhEUVVGRExFTkJRVU1zVVVGQlVTeERRVUZETzFsQlF6RkdMR0ZCUVUwc1EwRkJReXhsUVVGbExFTkJRVU1zWVVGQllTeERRVUZETEUxQlFVMHNSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOb1JDeGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMR0ZCUVdFc1JVRkJSU3hEUVVGRExFOUJRVThzUlVGQlJTeFBRVUZQTEVWQlFVVXNUMEZCVHl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOMlJTeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXd3UkVGQk1FUXNSVUZCUlR0WlFVTXpSQ3hMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETERaQ1FVRlhMRU5CUVVNc1EwRkJReXhUUVVGVExFVkJRVVVzVVVGQlVTeEZRVUZGTEdkQ1FVRm5RaXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEzSkZMRWxCUVVrc1VVRkJVU3hIUVVGak8yZENRVU4wUWl4RlFVRkZMRTFCUVUwc1JVRkJSU3huUWtGQlowSXNSVUZCUlN4VFFVRlRMRVZCUVVVc01FSkJRVEJDTEVWQlFVVXNWMEZCVnl4RlFVRkZMSEZDUVVGeFFpeEZRVUZGTEV0QlFVc3NSVUZCUlN3d1FrRkJNRUlzUlVGQlJUdG5Ra0ZETVVrc1JVRkJSU3hOUVVGTkxFVkJRVVVzVlVGQlZTeEZRVUZGTEZOQlFWTXNSVUZCUlN3d1FrRkJNRUlzUlVGQlJTeFhRVUZYTEVWQlFVVXNjVUpCUVhGQ0xFVkJRVWNzUzBGQlN5eEZRVUZGTERCQ1FVRXdRaXhGUVVGRk8yZENRVU55U1N4RlFVRkZMRTFCUVUwc1JVRkJSU3h2UWtGQmIwSXNSVUZCUlN4VFFVRlRMRVZCUVVVc01FSkJRVEJDTEVWQlFVVXNWMEZCVnl4RlFVRkZMSEZDUVVGeFFpeEZRVUZGTEV0QlFVc3NSVUZCUlN3d1FrRkJNRUlzUlVGQlJUdGhRVUZETEVOQlFVTTdXVUZEY0Vvc1MwRkJTeXhEUVVGRExGRkJRVkVzUTBGQlF5dzJRMEZCTWtJc1EwRkJReXhUUVVGVExFVkJRVVVzVVVGQlVTeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTnFSU3hMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETERaRFFVRXlRaXhEUVVGRExGRkJRVkVzUlVGQlJTeFJRVUZSTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTJoRkxFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNOa05CUVRKQ0xFTkJRVU1zVVVGQlVTeEZRVUZGTEZGQlFWRXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRhRVVzU1VGQlNTeFpRVUZaTEVkQlFVY3NVVUZCVVN4RlFVRkZMRU5CUVVNN1dVRkRPVUlzWVVGQlRTeERRVUZETEdWQlFXVXNRMEZEYkVJc1dVRkJXVHRwUWtGRFVDeEpRVUZKTEVOQlFVTXNWVUZCUXl4RFFVRkRMRWxCUVVzc1QwRkJRU3hEUVVGRExFTkJRVU1zU1VGQlNTeExRVUZMTEZOQlFWTXNSVUZCY0VJc1EwRkJiMElzUTBGQlF6dHBRa0ZEYWtNc1VVRkJVU3hGUVVOaUxGRkJRVkVzUTBGQlF5eERRVUZETzFsQlEyUXNZVUZCVFN4RFFVRkRMR1ZCUVdVc1EwRkRiRUlzV1VGQldUdHBRa0ZEVUN4SlFVRkpMRU5CUVVNc1ZVRkJReXhEUVVGRExFbEJRVXNzVDBGQlFTeERRVUZETEVOQlFVTXNTVUZCU1N4TFFVRkxMRkZCUVZFc1JVRkJia0lzUTBGQmJVSXNRMEZCUXp0cFFrRkRhRU1zVVVGQlVTeEZRVU5pTEZGQlFWRXNRMEZCUXl4TlFVRk5MRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU12UWl4aFFVRk5MRU5CUVVNc1pVRkJaU3hEUVVOc1FpeFpRVUZaTzJsQ1FVTlFMRWxCUVVrc1EwRkJReXhWUVVGRExFTkJRVU1zU1VGQlN5eFBRVUZCTEVOQlFVTXNRMEZCUXl4SlFVRkpMRXRCUVVzc1owSkJRV2RDTEVWQlFUTkNMRU5CUVRKQ0xFTkJRVU03YVVKQlEzaERMRkZCUVZFc1JVRkRZaXhGUVVGRkxFTkJRVU1zUTBGQlF6dFJRVU5hTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1JVRkJSU3hEUVVGRExDdENRVUVyUWl4RlFVRkZPMWxCUTJoRExFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNOa0pCUVZjc1EwRkJReXhEUVVGRExGTkJRVk1zUlVGQlJTeFJRVUZSTEVWQlFVVXNaMEpCUVdkQ0xFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEY2tVc1NVRkJTU3hSUVVGUkxFZEJRV003WjBKQlEzUkNMRVZCUVVVc1RVRkJUU3hGUVVGRkxHZENRVUZuUWl4RlFVRkZMRk5CUVZNc1JVRkJSU3d3UWtGQk1FSXNSVUZCUlN4WFFVRlhMRVZCUVVVc2NVSkJRWEZDTEVWQlFVVXNTMEZCU3l4RlFVRkZMREJDUVVFd1FpeEZRVUZGTzJkQ1FVTXhTU3hGUVVGRkxFMUJRVTBzUlVGQlJTeFZRVUZWTEVWQlFVVXNVMEZCVXl4RlFVRkZMREJDUVVFd1FpeEZRVUZGTEZkQlFWY3NSVUZCUlN4eFFrRkJjVUlzUlVGQlJTeExRVUZMTEVWQlFVVXNNRUpCUVRCQ0xFVkJRVVU3WjBKQlEzQkpMRVZCUVVVc1RVRkJUU3hGUVVGRkxHOUNRVUZ2UWl4RlFVRkZMRk5CUVZNc1JVRkJSU3d3UWtGQk1FSXNSVUZCUlN4WFFVRlhMRVZCUVVVc2NVSkJRWEZDTEVWQlFVVXNTMEZCU3l4RlFVRkZMREJDUVVFd1FpeEZRVUZGTzJGQlFVTXNRMEZCUXp0WlFVTndTaXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETERaRFFVRXlRaXhEUVVGRExGTkJRVk1zUlVGQlJTeFJRVUZSTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTJwRkxFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNOa05CUVRKQ0xFTkJRVU1zVVVGQlVTeEZRVUZGTEZGQlFWRXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRhRVVzUzBGQlN5eERRVUZETEZGQlFWRXNRMEZCUXl3MlEwRkJNa0lzUTBGQlF5eFJRVUZSTEVWQlFVVXNVVUZCVVN4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOb1JTeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMRzFEUVVGcFFpeEZRVUZGTEVOQlFVTXNRMEZCUXp0WlFVTndReXhKUVVGSkxGbEJRVmtzUjBGQlJ5eFJRVUZSTEVWQlFVVXNRMEZCUXp0WlFVTTVRaXhoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEZsQlFWa3NSVUZCUlN4RlFVRkZMRU5CUVVNc1EwRkJRenRSUVVNM1F5eERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTlFMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMGdzVVVGQlVTeERRVUZETEhGQ1FVRnhRaXhGUVVGRk8xRkJRelZDTEVsQlFVa3NTMEZCYlVJc1EwRkJRenRSUVVONFFpeEpRVUZKTEdGQlFUWkRMRU5CUVVNN1VVRkRiRVFzVlVGQlZTeERRVUZETzFsQlExQXNTMEZCU3l4SFFVRkhMRkZCUVZFc1JVRkJSU3hEUVVGRE8xbEJRMjVDTEdGQlFXRXNSMEZCUnl4alFVRk5MRTlCUVVFc1MwRkJTeXhEUVVGRExGRkJRVkVzUlVGQlJTeERRVUZETEdGQlFXRXNSVUZCT1VJc1EwRkJPRUlzUTBGQlF6dFJRVU42UkN4RFFVRkRMRU5CUVVNc1EwRkJRVHRSUVVOR0xFVkJRVVVzUTBGQlF5eHRRa0ZCYlVJc1JVRkJSVHRaUVVOd1FpeGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMR0ZCUVdFc1JVRkJSU3hEUVVGRExFMUJRVTBzUlVGQlJTeEZRVUZGTEVOQlFVTXNRMEZCUXp0WlFVTnVSQ3hMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEN0Q1FVRlJMRU5CUVVNc1dVRkJXU3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU4yUXl4aFFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExHRkJRV0VzUlVGQlJTeERRVUZETEUxQlFVMHNSVUZCUlN4RFFVRkRMRmxCUVZrc1EwRkJReXhEUVVGRExFTkJRVU03V1VGREwwUXNTMEZCU3l4RFFVRkRMRkZCUVZFc1EwRkJReXdyUWtGQlVTeERRVUZETEdWQlFXVXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRNVU1zWVVGQlRTeERRVUZETEdWQlFXVXNRMEZCUXl4aFFVRmhMRVZCUVVVc1EwRkJReXhOUVVGTkxFVkJRVVVzUTBGQlF5eFpRVUZaTEVWQlFVVXNaVUZCWlN4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOd1JpeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXh4UTBGQmNVTXNSVUZCUlR0WlFVTjBReXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEN0Q1FVRlJMRU5CUVVNc1dVRkJXU3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU4yUXl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExDdENRVUZSTEVOQlFVTXNaVUZCWlN4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVNeFF5eGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMR0ZCUVdFc1JVRkJSU3hEUVVGRExFMUJRVTBzUlVGQlJTeERRVUZETEZsQlFWa3NSVUZCUlN4bFFVRmxMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMmhHTEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc2EwTkJRVmNzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUXk5Q0xHRkJRVTBzUTBGQlF5eGxRVUZsTEVOQlFVTXNZVUZCWVN4RlFVRkZMRU5CUVVNc1RVRkJUU3hGUVVGRkxFTkJRVU1zV1VGQldTeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTXZSQ3hMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEd0RFFVRlhMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlFUdFpRVU01UWl4aFFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExHRkJRV0VzUlVGQlJTeERRVUZETEUxQlFVMHNSVUZCUlN4RlFVRkZMRU5CUVVNc1EwRkJRenRSUVVOMlJDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXh4UWtGQmNVSXNSVUZCUlR0WlFVTjBRaXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEN0Q1FVRlJMRU5CUVVNc1dVRkJXU3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU4yUXl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExDdENRVUZSTEVOQlFVTXNaVUZCWlN4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVNeFF5eExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMR3REUVVGWExFVkJRVVVzUTBGQlF5eERRVUZETzFsQlF6bENMR0ZCUVUwc1EwRkJReXhsUVVGbExFTkJRVU1zWVVGQllTeEZRVUZGTEVOQlFVTXNUVUZCVFN4RlFVRkZMRVZCUVVVc1EwRkJReXhEUVVGRE8xRkJRM1pFTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1JVRkJSU3hEUVVGRExHbENRVUZwUWl4RlFVRkZPMWxCUTJ4Q0xHRkJRVTBzUTBGQlF5eGxRVUZsTEVOQlFVTXNZVUZCWVN4RlFVRkZMRU5CUVVNc1MwRkJTeXhGUVVGRkxFVkJRVVVzUTBGQlF5eERRVUZETzFsQlEyeEVMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zT0VKQlFVOHNRMEZCUXl4WFFVRlhMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRM0pETEdGQlFVMHNRMEZCUXl4bFFVRmxMRU5CUVVNc1lVRkJZU3hGUVVGRkxFTkJRVU1zUzBGQlN5eEZRVUZGTEVOQlFVTXNWMEZCVnl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVNM1JDeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMRGhDUVVGUExFTkJRVU1zWTBGQll5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTjRReXhoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEdGQlFXRXNSVUZCUlN4RFFVRkRMRXRCUVVzc1JVRkJSU3hEUVVGRExGZEJRVmNzUlVGQlJTeGpRVUZqTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTJwR0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NSVUZCUlN4RFFVRkRMRzFEUVVGdFF5eEZRVUZGTzFsQlEzQkRMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zT0VKQlFVOHNRMEZCUXl4WFFVRlhMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRM0pETEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc09FSkJRVThzUTBGQlF5eGpRVUZqTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTNoRExFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNhVU5CUVZVc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzFsQlF6bENMR0ZCUVUwc1EwRkJReXhsUVVGbExFTkJRVU1zWVVGQllTeEZRVUZGTEVOQlFVTXNTMEZCU3l4RlFVRkZMRU5CUVVNc1YwRkJWeXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU0zUkN4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExHbERRVUZWTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVNNVFpeGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMR0ZCUVdFc1JVRkJSU3hEUVVGRExFdEJRVXNzUlVGQlJTeEZRVUZGTEVOQlFVTXNRMEZCUXp0UlFVTjBSQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl4dlFrRkJiMElzUlVGQlJUdFpRVU55UWl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExEaENRVUZQTEVOQlFVTXNWMEZCVnl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOeVF5eExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMRGhDUVVGUExFTkJRVU1zWTBGQll5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTjRReXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEdsRFFVRlZMRVZCUVVVc1EwRkJReXhEUVVGRE8xbEJRemRDTEdGQlFVMHNRMEZCUXl4bFFVRmxMRU5CUVVNc1lVRkJZU3hGUVVGRkxFTkJRVU1zUzBGQlN5eEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkRPMUZCUTNSRUxFTkJRVU1zUTBGQlF5eERRVUZETzBsQlExQXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRTQ3hSUVVGUkxFTkJRVU1zWlVGQlpTeEZRVUZGTzFGQlEzUkNMRWxCUVVrc1MwRkJiVUlzUTBGQlF6dFJRVU40UWl4SlFVRkpMRTlCUVdsRExFTkJRVU03VVVGRGRFTXNWVUZCVlN4RFFVRkRPMWxCUTFBc1MwRkJTeXhIUVVGSExGRkJRVkVzUlVGQlJTeERRVUZETzFsQlEyNUNMRTlCUVU4c1IwRkJSeXhqUVVGTkxFOUJRVUVzUzBGQlN5eERRVUZETEZGQlFWRXNSVUZCUlN4RFFVRkRMRTlCUVU4c1JVRkJlRUlzUTBGQmQwSXNRMEZCUXp0UlFVTTNReXhEUVVGRExFTkJRVU1zUTBGQlFUdFJRVU5HTEVWQlFVVXNRMEZCUXl3d1FrRkJNRUlzUlVGQlJUdFpRVU16UWl4aFFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExFOUJRVThzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMWxCUXpsQ0xFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNhME5CUVdsQ0xFVkJRVVVzUTBGQlF5eERRVUZETzFsQlEzQkRMR0ZCUVUwc1EwRkJReXhQUVVGUExFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1dVRkRMMElzUzBGQlN5eERRVUZETEZGQlFWRXNRMEZCUXl4clEwRkJhVUlzUlVGQlJTeERRVUZETEVOQlFVTTdXVUZEY0VNc1lVRkJUU3hEUVVGRExFMUJRVTBzUTBGQlF5eFBRVUZQTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRaUVVNNVFpeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMR3REUVVGcFFpeEZRVUZGTEVOQlFVTXNRMEZCUXp0WlFVTndReXhoUVVGTkxFTkJRVU1zVDBGQlR5eERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRMjVETEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTFBc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFNDeFJRVUZSTEVOQlFVTXNZMEZCWXl4RlFVRkZPMUZCUTNKQ0xFbEJRVWtzUzBGQmJVSXNRMEZCUXp0UlFVTjRRaXhKUVVGSkxFMUJRU3RDTEVOQlFVTTdVVUZEY0VNc1ZVRkJWU3hEUVVGRE8xbEJRMUFzUzBGQlN5eEhRVUZITEZGQlFWRXNSVUZCUlN4RFFVRkRPMWxCUTI1Q0xFMUJRVTBzUjBGQlJ5eGpRVUZOTEU5QlFVRXNTMEZCU3l4RFFVRkRMRkZCUVZFc1JVRkJSU3hEUVVGRExFMUJRVTBzUlVGQmRrSXNRMEZCZFVJc1EwRkJRenRSUVVNelF5eERRVUZETEVOQlFVTXNRMEZCUVR0UlFVTkdMRVZCUVVVc1EwRkJReXh4UkVGQmNVUXNSVUZCUlR0WlFVTjBSQ3hoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEUxQlFVMHNSVUZCUlN4RlFVRkZPMmRDUVVNM1FpeEZRVUZGTEVWQlFVVXNTVUZCU1R0blFrRkRVaXhUUVVGVExFVkJRVVVzUzBGQlN6dG5Ra0ZEYUVJc2JVSkJRVzFDTEVWQlFVVXNSVUZCUlR0aFFVTXhRaXhEUVVGRExFTkJRVU03V1VGRFNDeEpRVUZKTEZGQlFWRXNSMEZCTUVJc1kwRkJZeXhGUVVGRkxFTkJRVU03V1VGRGRrUXNTMEZCU3l4RFFVRkRMRkZCUVZFc1EwRkJReXcyUWtGQllTeERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRlRU1zWVVGQlRTeERRVUZETEdWQlFXVXNRMEZCUXl4TlFVRk5MRVZCUVVVc1JVRkJSVHRuUWtGRE4wSXNSVUZCUlN4RlFVRkZMRkZCUVZFN1owSkJRMW9zVTBGQlV5eEZRVUZGTEV0QlFVczdaMEpCUTJoQ0xHMUNRVUZ0UWl4RlFVRkZMRVZCUVVVN1lVRkRNVUlzUTBGQlF5eERRVUZETzFsQlEwZ3NVVUZCVVN4RFFVRkRMRXRCUVVzc1JVRkJSU3hEUVVGRE8xRkJRM0pDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1JVRkJSU3hEUVVGRExHMURRVUZ0UXl4RlFVRkZPMWxCUTNCRExFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNhME5CUVd0Q0xFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTjZReXhoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEUxQlFVMHNSVUZCUlN4RlFVRkZPMmRDUVVNM1FpeEZRVUZGTEVWQlFVVXNTVUZCU1R0blFrRkRVaXhUUVVGVExFVkJRVVVzU1VGQlNUdG5Ra0ZEWml4dFFrRkJiVUlzUlVGQlJTeEZRVUZGTzJGQlF6RkNMRU5CUVVNc1EwRkJRenRaUVVOSUxFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNhME5CUVd0Q0xFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTXhReXhoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEUxQlFVMHNSVUZCUlN4RlFVRkZPMmRDUVVNM1FpeEZRVUZGTEVWQlFVVXNTVUZCU1R0blFrRkRVaXhUUVVGVExFVkJRVVVzUzBGQlN6dG5Ra0ZEYUVJc2JVSkJRVzFDTEVWQlFVVXNSVUZCUlR0aFFVTXhRaXhEUVVGRExFTkJRVU03VVVGRFVDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXh0UTBGQmJVTXNSVUZCUlR0WlFVTndReXhKUVVGSkxFMUJRVTBzUjBGQllTeERRVUZETEdWQlFXVXNSVUZCUlN4blFrRkJaMElzUTBGQlF5eERRVUZETzFsQlF6TkVMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zZFVOQlFYVkNMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU5vUkN4aFFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExFMUJRVTBzUlVGQlJTeEZRVUZGTzJkQ1FVTTNRaXhGUVVGRkxFVkJRVVVzU1VGQlNUdG5Ra0ZEVWl4VFFVRlRMRVZCUVVVc1MwRkJTenRuUWtGRGFFSXNiVUpCUVcxQ0xFVkJRVVVzVFVGQlRUdGhRVU01UWl4RFFVRkRMRU5CUVVNN1VVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTBnc1VVRkJVU3hEUVVGRExHdENRVUZyUWl4RlFVRkZPMUZCUTNwQ0xFbEJRVWtzUzBGQmJVSXNRMEZCUXp0UlFVTjRRaXhKUVVGSkxGTkJRWEZETEVOQlFVTTdVVUZETVVNc1ZVRkJWU3hEUVVGRE8xbEJRMUFzUzBGQlN5eEhRVUZITEZGQlFWRXNSVUZCUlN4RFFVRkRPMWxCUTI1Q0xGTkJRVk1zUjBGQlJ5eGpRVUZOTEU5QlFVRXNTMEZCU3l4RFFVRkRMRkZCUVZFc1JVRkJSU3hEUVVGRExGTkJRVk1zUlVGQk1VSXNRMEZCTUVJc1EwRkJRenRSUVVOcVJDeERRVUZETEVOQlFVTXNRMEZCUVR0UlFVTkdMRVZCUVVVc1EwRkJReXh4UWtGQmNVSXNSVUZCUlR0WlFVTjBRaXhKUVVGSkxFdEJRVXNzUjBGQmJVSTdaMEpCUTNoQ0xHVkJRV1VzUlVGQlJUdHZRa0ZEWWl4SlFVRkpMRVZCUVVVc1RVRkJUVHR2UWtGRFdpeEpRVUZKTEVWQlFVVXNWMEZCVnp0cFFrRkRjRUk3WjBKQlEwUXNaMEpCUVdkQ0xFVkJRVVU3YjBKQlEyUXNTVUZCU1N4RlFVRkZMRTlCUVU4N2IwSkJRMklzU1VGQlNTeEZRVUZGTEdOQlFXTTdhVUpCUTNaQ08yZENRVU5FTEdkQ1FVRm5RaXhGUVVGRk8yOUNRVU5rTEVsQlFVa3NSVUZCUlN4UFFVRlBPMjlDUVVOaUxFbEJRVWtzUlVGQlJTeFhRVUZYTzJsQ1FVTndRanRoUVVOS0xFTkJRVUU3V1VGRFJDeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMRGhDUVVGWExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTnVReXhoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEZOQlFWTXNSVUZCUlN4RlFVRkZMRXRCUVVzc1EwRkJReXhEUVVGRE8xRkJReTlETEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTFBc1EwRkJReXhEUVVGRExFTkJRVU03UVVGRFVDeERRVUZETEVOQlFVTXNRMEZCUXlKOSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zLW1vY2stYWRhcHRlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiY3J5cHRqc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjaGFpXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvbXByZXNzaW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvbm5lY3QtbW9uZ29cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29va2llLXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjc3VyZlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3Mtc2Vzc2lvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJoZWxtZXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqc29ud2VidG9rZW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9jaGFcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9uZ29vc2VcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibXVzdGFjaGUtZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LWxvZ2dlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1tb2NrLXN0b3JlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LXRodW5rXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNvY2tldC5pb1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzb2NrZXQuaW8tY2xpZW50XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInN1cGVydGVzdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdXBlcnRlc3Qtc2Vzc2lvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ2YWxpZGF0b3JcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==