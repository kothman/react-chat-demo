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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZW52LmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvY29udHJvbGxlcnMvYXV0aENvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9jb250cm9sbGVycy9jaGFubmVsQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2NvbnRyb2xsZXJzL21lc3NhZ2VDb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvY29udHJvbGxlcnMvdXNlckNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9taWRkbGV3YXJlL2FkbWluLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbWlkZGxld2FyZS9hdXRob3JpemVkLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbW9kZWxzL0NoYW5uZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9tb2RlbHMvTWVzc2FnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21vZGVscy9Vc2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvcm91dGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvc2VydmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvc29ja2V0LmlvL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy93ZWIvYWN0aW9ucy9jaGFubmVsc0FjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9hY3Rpb25zL2NoYXRVc2Vyc0FjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9hY3Rpb25zL25vdGlmaWNhdGlvbnNBY3Rpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy93ZWIvYWN0aW9ucy9zaWRlYmFyQWN0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL2FjdGlvbnMvc29ja2V0QWN0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL2FjdGlvbnMvdXNlckFjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9yZWR1Y2Vycy9jaGFubmVscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL3JlZHVjZXJzL2NoYXRVc2Vycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL3JlZHVjZXJzL25vdGlmaWNhdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9yZWR1Y2Vycy9zaWRlYmFyLnRzIiwid2VicGFjazovLy8uL3NyYy93ZWIvcmVkdWNlcnMvc29ja2V0LnRzIiwid2VicGFjazovLy8uL3NyYy93ZWIvcmVkdWNlcnMvdXNlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL3N0b3JlLnRzIiwid2VicGFjazovLy8uL3Rlc3RzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3Rlc3RzL3NlcnZlci90ZXN0QXV0aENvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vdGVzdHMvc2VydmVyL3Rlc3RDaGFubmVsQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi90ZXN0cy9zZXJ2ZXIvdGVzdE1lc3NhZ2VDb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3Rlc3RzL3NlcnZlci90ZXN0VXNlckNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vdGVzdHMvd2ViL3Rlc3RBc3luY0FjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vdGVzdHMvd2ViL3Rlc3RTdG9yZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImF4aW9zLW1vY2stYWRhcHRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJjcnlwdGpzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjaGFpXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29tcHJlc3Npb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb25uZWN0LW1vbmdvXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29va2llLXBhcnNlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNzdXJmXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3Mtc2Vzc2lvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImhlbG1ldFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqc29ud2VidG9rZW5cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb2NoYVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbmdvb3NlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibXVzdGFjaGUtZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LWxvZ2dlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LW1vY2stc3RvcmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eC10aHVua1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvY2tldC5pb1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvY2tldC5pby1jbGllbnRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzb2NrZXRpby1qd3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzdXBlcnRlc3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzdXBlcnRlc3Qtc2Vzc2lvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInZhbGlkYXRvclwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FB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Q0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLHNDOzs7Ozs7Ozs7OztBQ0FBLDhDOzs7Ozs7Ozs7OztBQ0FBLHNDIiwiZmlsZSI6ImFsbC10ZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vdGVzdHMvaW5kZXgudHNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAvLyBodHRwczovL2RvY3MubW9uZ29kYi5jb20vbWFudWFsL3JlZmVyZW5jZS9jb25uZWN0aW9uLXN0cmluZy9cbiAgICBtb25nb2RiQ29ubmVjdGlvblVyaTogcHJvY2Vzcy5lbnYuTU9OR09EQl9VUkksXG4gICAgbW9uZ29kYlRlc3RDb25uZWN0aW9uVXJpOiBwcm9jZXNzLmVudi5NT05HT0RCX1RFU1RfVVJJIHx8XG5cdFx0XHQgICAgICAnbW9uZ29kYjovL2xvY2FsaG9zdDoyNzAxNy9vcGVuQ2hhdFRlc3QnLFxuICAgIHBvcnQ6IHByb2Nlc3MuZW52LlBPUlQgfHwgNTAwMCxcbiAgICBwcm9kdWN0aW9uOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nIHx8IGZhbHNlLFxuICAgIHVzZVRlc3REYjogcHJvY2Vzcy5lbnYuVVNFX1RFU1RfREIgfHwgZmFsc2UsXG4gICAgc2VjcmV0OiBwcm9jZXNzLmVudi5TRUNSRVQgfHwgJ3NlY3JldCcsXG4gICAgZGlzYWJsZUNzcmY6IHByb2Nlc3MuZW52LkRJU0FCTEVfQ1NSRiB8fCBmYWxzZSxcbiAgICBkaXNhYmxlUmVkdXhMb2dnaW5nOiBwcm9jZXNzLmVudi5ESVNBQkxFX1JFRFVYX0xPR0dJTkcgfHwgZmFsc2UsXG4gICAgZGlzYWJsZUF1dG9TdGFydDogcHJvY2Vzcy5lbnYuRElTQUJMRV9BVVRPX1NUQVJUIHx8IGZhbHNlLFxuICAgIG1haWxndW5BcGlLZXk6IHByb2Nlc3MuZW52Lk1BSUxHVU5fQVBJX0tFWSxcbiAgICBtYWlsZ3VuRG9tYWluOiBwcm9jZXNzLmVudi5NQUlMR1VOX0RPTUFJTixcbiAgICBiYXNlVXJsOiBwcm9jZXNzLmVudi5CQVNFX1VSTCA/IHByb2Nlc3MuZW52LkJBU0VfVVJMIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMCdcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciB2YWxpZGF0b3JfMSA9IHJlcXVpcmUoXCJ2YWxpZGF0b3JcIik7XG52YXIgYmNyeXB0anNfMSA9IHJlcXVpcmUoXCJiY3J5cHRqc1wiKTtcbnZhciBVc2VyXzEgPSByZXF1aXJlKFwiLi4vbW9kZWxzL1VzZXJcIik7XG52YXIgZW52ID0gcmVxdWlyZSgnLi4vLi4vLi4vZW52Jyk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHtcbiAgICBsb2dpbjogZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgICAgIGlmICh2YWxpZGF0b3JfMS5pc0VtcHR5KHJlcS5ib2R5LmVtYWlsIHx8ICcnKSB8fCB2YWxpZGF0b3JfMS5pc0VtcHR5KHJlcS5ib2R5LnBhc3N3b3JkIHx8ICcnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdQbGVhc2Ugc3VwcGx5IGFuIGVtYWlsIGFuZCBwYXNzd29yZCcgfSkuZW5kKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF2YWxpZGF0b3JfMS5pc0VtYWlsKHJlcS5ib2R5LmVtYWlsKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdOb3QgYSB2YWxpZCBlbWFpbCBhZGRyZXNzJyB9KS5lbmQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXEuYXV0aGVudGljYXRlKHJlcS5ib2R5LmVtYWlsLCByZXEuYm9keS5wYXNzd29yZCwgZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgICAgIGlmICghdXNlcilcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oeyBlcnJvcjogJ0ludmFsaWQgZW1haWwgb3IgcGFzc3dvcmQnIH0pLmVuZCgpO1xuICAgICAgICAgICAgcmVxLmlzc3VlTmV3VG9rZW4odXNlcik7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApXG4gICAgICAgICAgICAgICAgLmpzb24oe1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgICAgICAgcm9sZTogdXNlci5yb2xlLFxuICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZVxuICAgICAgICAgICAgfSkuZW5kKCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVnaXN0ZXI6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICBpZiAodmFsaWRhdG9yXzEuaXNFbXB0eShyZXEuYm9keS5lbWFpbCB8fCAnJykgfHwgdmFsaWRhdG9yXzEuaXNFbXB0eShyZXEuYm9keS5wYXNzd29yZCB8fCAnJykpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnUGxlYXNlIHN1cHBseSBhbiBlbWFpbCBhbmQgcGFzc3dvcmQnIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdmFsaWRhdG9yXzEuaXNFbWFpbChyZXEuYm9keS5lbWFpbCkpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnTm90IGEgdmFsaWQgZW1haWwgYWRkcmVzcycgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFVzZXJfMVtcImRlZmF1bHRcIl0uZmluZEJ5RW1haWwocmVxLmJvZHkuZW1haWwpLmNvdW50RG9jdW1lbnRzKCkuZXhlYygpLnRoZW4oZnVuY3Rpb24gKGNvdW50KSB7XG4gICAgICAgICAgICBpZiAoY291bnQgIT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdFbWFpbCBhZGRyZXNzIGluIHVzZScgfSk7XG4gICAgICAgICAgICB2YXIgcGFzc3dvcmRIYXNoID0gYmNyeXB0anNfMS5oYXNoU3luYyhyZXEuYm9keS5wYXNzd29yZCk7XG4gICAgICAgICAgICBVc2VyXzFbXCJkZWZhdWx0XCJdLmNvdW50RG9jdW1lbnRzKCkuZXhlYygpLnRoZW4oZnVuY3Rpb24gKGNvdW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIHJvbGUgPSAndXNlcic7XG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ID09PSAwKVxuICAgICAgICAgICAgICAgICAgICByb2xlID0gJ2FkbWluJztcbiAgICAgICAgICAgICAgICB2YXIgdXNlciA9IG5ldyBVc2VyXzFbXCJkZWZhdWx0XCJdKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiByZXEuYm9keS5lbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkSGFzaCxcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogcm9sZSxcbiAgICAgICAgICAgICAgICAgICAgZW1haWxWZXJpZmllZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdXNlci5zYXZlKCkudGhlbihmdW5jdGlvbiAodSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcgdHJ5aW5nIHRvIGNyZWF0ZSBhIG5ldyB1c2VyJyB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGxvZ291dDogZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgICAgIHJlcS5sb2dvdXQoKTtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbWVzc2FnZTogJ2xvZ2dlZCBvdXQnIH0pO1xuICAgIH0sXG4gICAgdmVyaWZ5RW1haWw6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgIH1cbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lZWFYwYUVOdmJuUnliMnhzWlhJdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOHVMaTh1TGk5emNtTXZjMlZ5ZG1WeUwyTnZiblJ5YjJ4c1pYSnpMMkYxZEdoRGIyNTBjbTlzYkdWeUxuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCUVVFc2RVTkJRVFpETzBGQlF6ZERMSEZEUVVGdlF6dEJRVVZ3UXl4MVEwRkJOa003UVVGRE4wTXNTVUZCVFN4SFFVRkhMRWRCUVVjc1QwRkJUeXhEUVVGRExHTkJRV01zUTBGQlF5eERRVUZETzBGQlJYQkRMSEZDUVVGbE8wbEJRMWdzUzBGQlN5eEZRVUZGTEZWQlFVTXNSMEZCV1N4RlFVRkZMRWRCUVdFN1VVRkRMMElzU1VGQlNTeHRRa0ZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eEpRVUZKTEVWQlFVVXNRMEZCUXl4SlFVRkpMRzFDUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4UlFVRlJMRWxCUVVrc1JVRkJSU3hEUVVGRExFVkJRVVU3V1VGRGJrVXNUMEZCVHl4SFFVRkhMRU5CUVVNc1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkZMRXRCUVVzc1JVRkJSU3h4UTBGQmNVTXNSVUZCUlN4RFFVRkRMRU5CUVVNc1IwRkJSeXhGUVVGRkxFTkJRVU03VTBGRGRrWTdVVUZEUkN4SlFVRkpMRU5CUVVNc2JVSkJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhGUVVGRk8xbEJRekZDTEU5QlFVOHNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4TFFVRkxMRVZCUVVVc01rSkJRVEpDTEVWQlFVVXNRMEZCUXl4RFFVRkRMRWRCUVVjc1JVRkJSU3hEUVVGRE8xTkJRemRGTzFGQlEwUXNSMEZCUnl4RFFVRkRMRmxCUVZrc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NSVUZCUlN4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExGRkJRVkVzUlVGQlJTeFZRVUZETEVsQlFXMUNPMWxCUTNCRkxFbEJRVWtzUTBGQlF5eEpRVUZKTzJkQ1FVTk1MRTlCUVU4c1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSU3hMUVVGTExFVkJRVVVzTWtKQlFUSkNMRVZCUVVVc1EwRkJReXhEUVVGRExFZEJRVWNzUlVGQlJTeERRVUZETzFsQlF6bEZMRWRCUVVjc1EwRkJReXhoUVVGaExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdXVUZEZUVJc1QwRkJUeXhIUVVGSExFTkJRVU1zVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXp0cFFrRkRha0lzU1VGQlNTeERRVUZETzJkQ1FVTkdMRTlCUVU4c1JVRkJSU3hKUVVGSk8yZENRVU5pTEV0QlFVc3NSVUZCUlN4SlFVRkpMRU5CUVVNc1MwRkJTenRuUWtGRGFrSXNTVUZCU1N4RlFVRkZMRWxCUVVrc1EwRkJReXhKUVVGSk8yZENRVU5tTEVsQlFVa3NSVUZCUlN4SlFVRkpMRU5CUVVNc1NVRkJTVHRoUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEVWQlFVVXNRMEZCUXp0UlFVTndReXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTTdTVUZEUkN4UlFVRlJMRVZCUVVVc1ZVRkJReXhIUVVGWkxFVkJRVVVzUjBGQllUdFJRVU5zUXl4SlFVRkpMRzFDUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRWxCUVVrc1JVRkJSU3hEUVVGRExFbEJRVWtzYlVKQlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExGRkJRVkVzU1VGQlNTeEZRVUZGTEVOQlFVTXNSVUZCUlR0WlFVTnVSU3hQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVVVzUzBGQlN5eEZRVUZGTEhGRFFVRnhReXhGUVVGRkxFTkJRVU1zUTBGQlF6dFRRVU5xUmp0UlFVTkVMRWxCUVVrc1EwRkJReXh0UWtGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFVkJRVVU3V1VGRE1VSXNUMEZCVHl4SFFVRkhMRU5CUVVNc1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkZMRXRCUVVzc1JVRkJSU3d5UWtGQk1rSXNSVUZCUlN4RFFVRkRMRU5CUVVNN1UwRkRka1U3VVVGRFJDeFBRVUZQTEdsQ1FVRkpMRU5CUVVNc1YwRkJWeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1kwRkJZeXhGUVVGRkxFTkJRVU1zU1VGQlNTeEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVVNc1MwRkJZVHRaUVVNdlJTeEpRVUZKTEV0QlFVc3NTMEZCU3l4RFFVRkRPMmRDUVVOWUxFOUJRVThzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlF5eExRVUZMTEVWQlFVVXNjMEpCUVhOQ0xFVkJRVU1zUTBGQlF5eERRVUZETzFsQlEycEZMRWxCUVVrc1dVRkJXU3hIUVVGSExHMUNRVUZSTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF6dFpRVVV2UXl4cFFrRkJTU3hEUVVGRExHTkJRV01zUlVGQlJTeERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGRExFdEJRV0U3WjBKQlF6VkRMRWxCUVVrc1NVRkJTU3hIUVVGSExFMUJRVTBzUTBGQlF6dG5Ra0ZEYkVJc1NVRkJTU3hMUVVGTExFdEJRVXNzUTBGQlF6dHZRa0ZEV0N4SlFVRkpMRWRCUVVjc1QwRkJUeXhEUVVGRE8yZENRVU51UWl4SlFVRkpMRWxCUVVrc1IwRkJSeXhKUVVGSkxHbENRVUZKTEVOQlFVTTdiMEpCUTJoQ0xFbEJRVWtzUlVGQlJTeEZRVUZGTzI5Q1FVTlNMRXRCUVVzc1JVRkJSU3hIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVczdiMEpCUTNKQ0xGRkJRVkVzUlVGQlJTeFpRVUZaTzI5Q1FVTjBRaXhKUVVGSkxFVkJRVVVzU1VGQlNUdHZRa0ZEVml4aFFVRmhMRVZCUVVVc1MwRkJTenRwUWtGRGRrSXNRMEZCUXl4RFFVRkRPMmRDUVVOSUxFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJReXhEUVVGUk8yOUNRVU4wUWl4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVNc1QwRkJUeXhGUVVGRkxFbEJRVWtzUlVGQlF5eERRVUZETEVOQlFVTTdaMEpCUTJwRUxFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVc3NRMEZCUVN4RFFVRkRMRlZCUVVNc1IwRkJWVHR2UWtGRGFFSXNUMEZCVHl4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dHZRa0ZEYmtJc1QwRkJUeXhIUVVGSExFTkJRVU1zVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRExFdEJRVXNzUlVGQlJTeHJSRUZCYTBRc1JVRkJReXhEUVVGRExFTkJRVU03WjBKQlF6ZEdMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMUFzUTBGQlF5eERRVUZETEVOQlFVRTdVVUZEVGl4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVWUUxFTkJRVU03U1VGRFJDeE5RVUZOTEVWQlFVVXNWVUZCUXl4SFFVRlpMRVZCUVVVc1IwRkJZVHRSUVVOb1F5eEhRVUZITEVOQlFVTXNUVUZCVFN4RlFVRkZMRU5CUVVNN1VVRkRZaXhQUVVGUExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUXl4UFFVRlBMRVZCUVVVc1NVRkJTU3hGUVVGRkxFOUJRVThzUlVGQlJTeFpRVUZaTEVWQlFVTXNRMEZCUXl4RFFVRkRPMGxCUXpWRUxFTkJRVU03U1VGRFJDeFhRVUZYTEVWQlFVVXNWVUZCUXl4SFFVRlpMRVZCUVVVc1IwRkJZVHRKUVVONlF5eERRVUZETzBOQlEwb3NRMEZCUVNKOSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBDaGFubmVsXzEgPSByZXF1aXJlKFwiLi4vbW9kZWxzL0NoYW5uZWxcIik7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHtcbiAgICBjaGFubmVsczogZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgICAgIHJldHVybiBDaGFubmVsXzFbXCJkZWZhdWx0XCJdLmNvdW50RG9jdW1lbnRzKCkuZXhlYygpLnRoZW4oZnVuY3Rpb24gKGNvdW50KSB7XG4gICAgICAgICAgICB2YXIgcCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgQ2hhbm5lbF8xW1wiZGVmYXVsdFwiXS5jcmVhdGUoW3sgbmFtZTogJ2dlbmVyYWwnIH0sIHsgbmFtZTogJ3JhbmRvbScgfV0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBwLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIENoYW5uZWxfMVtcImRlZmF1bHRcIl0uZmluZCgpLmV4ZWMoKS50aGVuKGZ1bmN0aW9uIChjaGFubmVscykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBjaGFubmVsczogY2hhbm5lbHMgfSk7XG4gICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIGZldGNoIGNoYW5uZWxzJyB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBjcmVhdGUgZGVmYXVsdCBjaGFubmVscycgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIGNvdW50aW5nIGNoYW5uZWxzJyB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBcImRlbGV0ZVwiOiBmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICB9LFxuICAgIGNyZWF0ZTogZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgfVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVkyaGhibTVsYkVOdmJuUnliMnhzWlhJdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOHVMaTh1TGk5emNtTXZjMlZ5ZG1WeUwyTnZiblJ5YjJ4c1pYSnpMMk5vWVc1dVpXeERiMjUwY205c2JHVnlMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3TzBGQlEwRXNOa05CUVc5RU8wRkJSWEJFTEhGQ1FVRmxPMGxCUTFnc1VVRkJVU3hGUVVGRkxGVkJRVU1zUjBGQldTeEZRVUZGTEVkQlFXRTdVVUZGYkVNc1QwRkJUeXh2UWtGQlR5eERRVUZETEdOQlFXTXNSVUZCUlN4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZETEV0QlFXRTdXVUZEZEVRc1NVRkJTU3hEUVVGRExFZEJRVWNzU1VGQlNTeFBRVUZQTEVOQlFVTXNWVUZCUXl4UFFVRlBMRVZCUVVVc1RVRkJUVHRuUWtGRGFFTXNTVUZCU1N4TFFVRkxMRXRCUVVzc1EwRkJReXhGUVVGRk8yOUNRVU5pTEU5QlFVOHNUMEZCVHl4RlFVRkZMRU5CUVVNN2FVSkJRM0JDTzJkQ1FVTkVMRzlDUVVGUExFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTXNSVUZCUXl4SlFVRkpMRVZCUVVVc1UwRkJVeXhGUVVGRExFVkJRVVVzUlVGQlF5eEpRVUZKTEVWQlFVVXNVVUZCVVN4RlFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF6dHZRa0ZEZGtRc1QwRkJUeXhQUVVGUExFVkJRVVVzUTBGQlF6dG5Ra0ZEY2tJc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlN5eERRVUZCTEVOQlFVTXNWVUZCUXl4SFFVRlZPMjlDUVVOb1FpeFBRVUZQTEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRuUWtGRGRrSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU5JTEU5QlFVOHNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJRenRuUWtGRFZpeHZRa0ZCVHl4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRkRMRkZCUVc5Q08yOUNRVU0xUXl4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVNc1VVRkJVU3hGUVVGRkxGRkJRVkVzUlVGQlF5eERRVUZETEVOQlFVTTdaMEpCUTNSRUxFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVc3NRMEZCUVN4RFFVRkRMRlZCUVVNc1IwRkJWVHR2UWtGRGFFSXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dHZRa0ZEYWtJc1QwRkJUeXhIUVVGSExFTkJRVU1zVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRkxFdEJRVXNzUlVGQlJTeHhSRUZCY1VRc1JVRkJSU3hEUVVGRExFTkJRVU03WjBKQlEyeEhMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMUFzUTBGQlF5eERRVUZETEVOQlFVTXNUMEZCU3l4RFFVRkJMRU5CUVVNc1ZVRkJReXhIUVVGVk8yZENRVU5vUWl4UFFVRlBMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzJkQ1FVTnVRaXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVU1zUzBGQlN5eEZRVUZGTERoRVFVRTRSQ3hGUVVGRExFTkJRVU1zUTBGQlF6dFpRVU42Unl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOUUxFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVc3NRMEZCUVN4RFFVRkRMRlZCUVVNc1IwRkJWVHRaUVVOb1FpeFBRVUZQTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8xbEJRMjVDTEU5QlFVOHNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUXl4TFFVRkxMRVZCUVVVc09FTkJRVGhETEVWQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTNwR0xFTkJRVU1zUTBGQlF5eERRVUZETzBsQlExQXNRMEZCUXp0SlFVTkVMRkZCUVUwc1JVRkJSU3hWUVVGRExFZEJRVmtzUlVGQlJTeEhRVUZoTzBsQlJYQkRMRU5CUVVNN1NVRkRSQ3hOUVVGTkxFVkJRVVVzVlVGQlF5eEhRVUZaTEVWQlFVVXNSMEZCWVR0SlFVVndReXhEUVVGRE8wTkJRMG9zUTBGQlFTSjkiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgTWVzc2FnZV8xID0gcmVxdWlyZShcIi4uL21vZGVscy9NZXNzYWdlXCIpO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB7XG4gICAgbWVzc2FnZXM6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICByZXR1cm4gTWVzc2FnZV8xW1wiZGVmYXVsdFwiXS5maW5kKHsgY2hhbm5lbDogcmVxLnBhcmFtcy5jaGFubmVsIH0pXG4gICAgICAgICAgICAuc2tpcChwYXJzZUludChyZXEucGFyYW1zLm9mZmVzdCkpXG4gICAgICAgICAgICAuc29ydCh7IF9pZDogLTEgfSlcbiAgICAgICAgICAgIC5saW1pdCgyMClcbiAgICAgICAgICAgIC5leGVjKCkudGhlbihmdW5jdGlvbiAobWVzc2FnZXMpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6IG1lc3NhZ2VzLm1hcChmdW5jdGlvbiAobSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogbS50ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZDogbS5jcmVhdGVkQXQsXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyRW1haWw6IG0udXNlckVtYWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbDogbS5jaGFubmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgX2lkOiBtLl9pZFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pLnJldmVyc2UoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdzb21ldGhpbmcgd2VudCB3cm9uZyB0cnlpbmcgdG8gZmV0Y2ggbWVzc2FnZXMnIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYldWemMyRm5aVU52Ym5SeWIyeHNaWEl1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk4dUxpOHVMaTl6Y21NdmMyVnlkbVZ5TDJOdmJuUnliMnhzWlhKekwyMWxjM05oWjJWRGIyNTBjbTlzYkdWeUxuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCUTBFc05rTkJRVzlFTzBGQlEzQkVMSEZDUVVGbE8wbEJRMWdzVVVGQlVTeEZRVUZGTEZWQlFVTXNSMEZCV1N4RlFVRkZMRWRCUVdFN1VVRkRiRU1zVDBGQlR5eHZRa0ZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRExFOUJRVThzUlVGQlJTeEhRVUZITEVOQlFVTXNUVUZCVFN4RFFVRkRMRTlCUVU4c1JVRkJReXhEUVVGRE8yRkJRemRETEVsQlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVNc1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXp0aFFVTnFReXhKUVVGSkxFTkJRVU1zUlVGQlF5eEhRVUZITEVWQlFVVXNRMEZCUXl4RFFVRkRMRVZCUVVNc1EwRkJRenRoUVVObUxFdEJRVXNzUTBGQlF5eEZRVUZGTEVOQlFVTTdZVUZEVkN4SlFVRkpMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlF5eFJRVUZ2UWp0WlFVTTVRaXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRE8yZENRVU4yUWl4UlFVRlJMRVZCUVVVc1VVRkJVU3hEUVVGRExFZEJRVWNzUTBGQlF5eFZRVUZETEVOQlFWYzdiMEpCUTJoRExFOUJRVTg3ZDBKQlEwZ3NTVUZCU1N4RlFVRkZMRU5CUVVNc1EwRkJReXhKUVVGSk8zZENRVU5hTEU5QlFVOHNSVUZCUlN4RFFVRkRMRU5CUVVNc1UwRkJVenQzUWtGRGNFSXNVMEZCVXl4RlFVRkZMRU5CUVVNc1EwRkJReXhUUVVGVE8zZENRVU4wUWl4UFFVRlBMRVZCUVVVc1EwRkJReXhEUVVGRExFOUJRVTg3ZDBKQlEyeENMRWRCUVVjc1JVRkJSU3hEUVVGRExFTkJRVU1zUjBGQlJ6dHhRa0ZEWWl4RFFVRkRPMmRDUVVOTUxFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVOHNSVUZCUlR0aFFVTm1MRU5CUVVNc1EwRkJRVHRSUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVc3NRMEZCUVN4RFFVRkRMRlZCUVVNc1IwRkJWVHRaUVVOb1FpeFBRVUZQTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVVXNTMEZCU3l4RlFVRkZMQ3REUVVFclF5eEZRVUZGTEVOQlFVTXNRMEZCUXp0UlFVTTFSaXhEUVVGRExFTkJRVU1zUTBGQlFUdEpRVU5PTEVOQlFVTTdRMEZEU2l4RFFVRkJJbjA9IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIHZhbGlkYXRvcl8xID0gcmVxdWlyZShcInZhbGlkYXRvclwiKTtcbnZhciBVc2VyXzEgPSByZXF1aXJlKFwiLi4vbW9kZWxzL1VzZXJcIik7XG52YXIgYmNyeXB0anNfMSA9IHJlcXVpcmUoXCJiY3J5cHRqc1wiKTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0ge1xuICAgIHVzZXI6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICByZXMuc2VuZChyZXEudXNlcik7XG4gICAgfSxcbiAgICB1c2VyczogZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgICAgIHJldHVybiBVc2VyXzFbXCJkZWZhdWx0XCJdLmZpbmQoe30pLnNlbGVjdCgnbmFtZSBlbWFpbCByb2xlIGRlbGV0ZWQnKS50aGVuKGZ1bmN0aW9uICh1c2Vycykge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgdXNlcnM6IHVzZXJzIH0pO1xuICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgcmV0cmlldmluZyB1c2VycycgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgdXNlckJ5RW1haWw6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICBpZiAoIXZhbGlkYXRvcl8xLmlzRW1haWwocmVxLnBhcmFtcy51c2VyKSlcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnUGxlYXNlIHN1cHBseSBhIHZhbGlkIGVtYWlsJyB9KTtcbiAgICAgICAgcmV0dXJuIFVzZXJfMVtcImRlZmF1bHRcIl0uZmluZEJ5RW1haWwocmVxLnBhcmFtcy51c2VyKS5leGVjKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICAgICAgaWYgKHVzZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9pZDogdXNlci5faWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUgfHwgJycsXG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkOiB1c2VyLmNyZWF0ZWRBdFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ05vIHVzZXIgZm91bmQgd2l0aCB0aGF0IGVtYWlsJyB9KTtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nIHRyeWluZyB0byBmaW5kIHRoZSB1c2VyJyB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICB1cGRhdGVFbWFpbDogZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgICAgIGlmICghdmFsaWRhdG9yXzEuaXNFbWFpbChyZXEuYm9keS5lbWFpbCkpXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ05vdCBhIHZhbGlkIGVtYWlsJyB9KTtcbiAgICAgICAgcmV0dXJuIFVzZXJfMVtcImRlZmF1bHRcIl0uY291bnREb2N1bWVudHMoeyBlbWFpbDogcmVxLmJvZHkuZW1haWwgfSkuZXhlYygpLnRoZW4oZnVuY3Rpb24gKGNvdW50KSB7XG4gICAgICAgICAgICBpZiAoY291bnQgIT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdFbWFpbCBhZGRyZXNzIGFscmVhZHkgaW4gdXNlJyB9KTtcbiAgICAgICAgICAgIHJldHVybiBVc2VyXzFbXCJkZWZhdWx0XCJdLmZpbmRCeUVtYWlsKHJlcS51c2VyLmVtYWlsKS5leGVjKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICAgICAgICAgIHVzZXIuZW1haWwgPSByZXEuYm9keS5lbWFpbDtcbiAgICAgICAgICAgICAgICB1c2VyLnNhdmUoKTtcbiAgICAgICAgICAgICAgICByZXEuaXNzdWVOZXdUb2tlbihPYmplY3QuYXNzaWduKHt9LCByZXEudXNlciwgeyBlbWFpbDogcmVxLmJvZHkuZW1haWwgfSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZyB0cnlpbmcgdG8gZmV0Y2ggdGhlIHVzZXInIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgdXBkYXRlTmFtZTogZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgICAgIHJldHVybiBVc2VyXzFbXCJkZWZhdWx0XCJdLmZpbmRCeUVtYWlsKHJlcS51c2VyLmVtYWlsKVxuICAgICAgICAgICAgLmV4ZWMoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgICAgICB1c2VyLm5hbWUgPSByZXEuYm9keS5uYW1lO1xuICAgICAgICAgICAgdXNlci5zYXZlKCk7XG4gICAgICAgICAgICByZXEuaXNzdWVOZXdUb2tlbihPYmplY3QuYXNzaWduKHt9LCByZXEudXNlciwgeyBuYW1lOiByZXEuYm9keS5uYW1lIH0pKTtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZyB0cnlpbmcgdG8gdXBkYXRlIHRoZSB1c2VyJyB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICB1cGRhdGVQYXNzd29yZDogZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgICAgIGlmICh2YWxpZGF0b3JfMS5pc0VtcHR5KHJlcS5ib2R5Lm5ld1Bhc3MpIHx8IHZhbGlkYXRvcl8xLmlzRW1wdHkocmVxLmJvZHkub2xkUGFzcykpXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ011c3Qgc3VwcGx5IHRoZSBjdXJyZW50IGFuZCBuZXcgcGFzc3dvcmQnIH0pO1xuICAgICAgICByZXR1cm4gVXNlcl8xW1wiZGVmYXVsdFwiXS5maW5kQnlFbWFpbChyZXEudXNlci5lbWFpbCkuZXhlYygpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgICAgIGlmICghYmNyeXB0anNfMS5jb21wYXJlU3luYyhyZXEuYm9keS5vbGRQYXNzLCB1c2VyLnBhc3N3b3JkKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ0N1cnJlbnQgcGFzc3dvcmQgaXMgaW5jb3JyZWN0JyB9KTtcbiAgICAgICAgICAgIHVzZXIucGFzc3dvcmQgPSBiY3J5cHRqc18xLmhhc2hTeW5jKHJlcS5ib2R5Lm5ld1Bhc3MpO1xuICAgICAgICAgICAgdXNlci5zYXZlKCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHJlc2V0UGFzc3dvcmQ6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ05vdCBpbXBsZW1lbnRlZCcgfSk7XG4gICAgfSxcbiAgICBjcmVhdGVVc2VyOiBmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICAgICAgaWYgKHZhbGlkYXRvcl8xLmlzRW1wdHkocmVxLmJvZHkuZW1haWwpIHx8ICF2YWxpZGF0b3JfMS5pc0VtYWlsKHJlcS5ib2R5LmVtYWlsKSB8fFxuICAgICAgICAgICAgdmFsaWRhdG9yXzEuaXNFbXB0eShyZXEuYm9keS5yb2xlKSB8fCAocmVxLmJvZHkucm9sZSAhPT0gJ3VzZXInICYmIHJlcS5ib2R5LnJvbGUgIT09ICdhZG1pbicpKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdNdXN0IHN1cHBseSB2YWxpZCBlbWFpbCBhbmQgcm9sZScgfSk7XG4gICAgICAgIHJldHVybiBVc2VyXzFbXCJkZWZhdWx0XCJdLmZpbmRCeUVtYWlsKHJlcS5ib2R5LmVtYWlsKS5jb3VudERvY3VtZW50cyhmdW5jdGlvbiAoZXJyLCBjKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignU29tZXRoaW5nIHdlbnQgd3JvbmcgdHJ5aW5nIHRvIGNvdW50IHVzZXJzIHdpdGggZW1haWwgJyArIHJlcS5ib2R5LmVtYWlsLCBlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGMgIT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdFbWFpbCBhZGRyZXNzIGluIHVzZScgfSk7XG4gICAgICAgICAgICB2YXIgdSA9IG5ldyBVc2VyXzFbXCJkZWZhdWx0XCJdKHtcbiAgICAgICAgICAgICAgICBlbWFpbDogcmVxLmJvZHkuZW1haWwsXG4gICAgICAgICAgICAgICAgbmFtZTogcmVxLmJvZHkubmFtZSB8fCAnJyxcbiAgICAgICAgICAgICAgICByb2xlOiByZXEuYm9keS5yb2xlLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAndGVtcCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB1LnNhdmUoZnVuY3Rpb24gKGVyciwgdSkge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignU29tZXRoaW5nIHdlbnQgd3JvbmcgdHJ5aW5nIHRvIHNhdmUgdXNlcicsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZWRpdFVzZXI6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICBpZiAoIXJlcS5ib2R5LmVtYWlsIHx8ICF2YWxpZGF0b3JfMS5pc0VtYWlsKHJlcS5ib2R5LmVtYWlsKSlcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnUGxlYXNlIHN1cHBseSBhIHZhbGlkIGVtYWlsJyB9KTtcbiAgICAgICAgaWYgKHJlcS5ib2R5LnVzZXIuZW1haWwgJiYgIXZhbGlkYXRvcl8xLmlzRW1haWwocmVxLmJvZHkudXNlci5lbWFpbCkpXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ1BsZWFzZSBzdXBwbHkgYSB2YWxpZCBlbWFpbCcgfSk7XG4gICAgICAgIGlmIChyZXEuYm9keS51c2VyLnJvbGUgJiYgIXZhbGlkYXRvcl8xLmlzRW1wdHkocmVxLmJvZHkudXNlci5yb2xlKSAmJiAocmVxLmJvZHkudXNlci5yb2xlICE9PSAndXNlcicgJiYgcmVxLmJvZHkudXNlci5yb2xlICE9PSAnYWRtaW4nKSlcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnSW52YWxpZCByb2xlJyB9KTtcbiAgICAgICAgcmV0dXJuIFVzZXJfMVtcImRlZmF1bHRcIl0uZmluZEJ5RW1haWwocmVxLmJvZHkuZW1haWwpLmV4ZWMoZnVuY3Rpb24gKGVyciwgdXNlcikge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTb21ldGhpbmcgd2VudCB3cm9uZycsIGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZycgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBlcnJvcjogJ1VzZXIgZG9lcyBub3QgZXhpc3QnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlcS5ib2R5LnVzZXIuZW1haWwpXG4gICAgICAgICAgICAgICAgdXNlci5lbWFpbCA9IHJlcS5ib2R5LnVzZXIuZW1haWw7XG4gICAgICAgICAgICBpZiAocmVxLmJvZHkudXNlci5uYW1lKVxuICAgICAgICAgICAgICAgIHVzZXIubmFtZSA9IHJlcS5ib2R5LnVzZXIubmFtZTtcbiAgICAgICAgICAgIGlmIChyZXEuYm9keS51c2VyLnJvbGUpXG4gICAgICAgICAgICAgICAgdXNlci5yb2xlID0gcmVxLmJvZHkudXNlci5yb2xlO1xuICAgICAgICAgICAgcmV0dXJuIHVzZXIuc2F2ZShmdW5jdGlvbiAoZXJyLCB1c2VyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGRlbGV0ZVVzZXI6IGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICBpZiAoIXJlcS5ib2R5LmVtYWlsIHx8ICF2YWxpZGF0b3JfMS5pc0VtYWlsKHJlcS5ib2R5LmVtYWlsKSlcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnSW52YWxpZCBkYXRhIGZvciBwYXJhbWV0ZXIgXCJlbWFpbFwiJyB9KTtcbiAgICAgICAgcmV0dXJuIFVzZXJfMVtcImRlZmF1bHRcIl0uZmluZEJ5RW1haWwocmVxLmJvZHkuZW1haWwpLmV4ZWMoZnVuY3Rpb24gKGVyciwgdXNlcikge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTb21ldGhpbmcgd2VudCB3cm9uZycsIGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZycgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXVzZXIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgZXJyb3I6ICdVc2VyIGRvZXMgbm90IGV4aXN0JyB9KTtcbiAgICAgICAgICAgIGlmICh1c2VyLmRlbGV0ZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdVc2VyIGFscmVhZHkgZGVsZXRlZCcgfSk7XG4gICAgICAgICAgICBpZiAocmVxLnVzZXIuZW1haWwgPT09IHJlcS5ib2R5LmVtYWlsKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnQ2Fubm90IGRlbGV0ZSBjdXJyZW50IHVzZXInIH0pO1xuICAgICAgICAgICAgdXNlci5kZWxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB1c2VyLnNhdmUoZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICByZXN0b3JlVXNlcjogZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgICAgIGlmICghcmVxLmJvZHkuZW1haWwgfHwgIXZhbGlkYXRvcl8xLmlzRW1haWwocmVxLmJvZHkuZW1haWwpKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdJbnZhbGlkIGRhdGEgZm9yIHBhcmFtZXRlciBcImVtYWlsXCInIH0pO1xuICAgICAgICByZXR1cm4gVXNlcl8xW1wiZGVmYXVsdFwiXS5maW5kQnlFbWFpbChyZXEuYm9keS5lbWFpbCkuZXhlYyhmdW5jdGlvbiAoZXJyLCB1c2VyKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1NvbWV0aGluZyB3ZW50IHdyb25nJywgZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdXNlcilcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBlcnJvcjogJ1VzZXIgZG9lcyBub3QgZXhpc3QnIH0pO1xuICAgICAgICAgICAgaWYgKCF1c2VyLmRlbGV0ZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdVc2VyIGFscmVhZHkgYWN0aXZlJyB9KTtcbiAgICAgICAgICAgIHVzZXIuZGVsZXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHVzZXIuc2F2ZShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pZFhObGNrTnZiblJ5YjJ4c1pYSXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOHVMaTh1TGk4dUxpOXpjbU12YzJWeWRtVnlMMk52Ym5SeWIyeHNaWEp6TDNWelpYSkRiMjUwY205c2JHVnlMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3TzBGQlFVRXNkVU5CUVRKRE8wRkJSVE5ETEhWRFFVRjVSRHRCUVVONlJDeHhRMEZCSzBNN1FVRkZMME1zY1VKQlFXVTdTVUZEV0N4SlFVRkpMRVZCUVVVc1ZVRkJReXhIUVVGWkxFVkJRVVVzUjBGQllUdFJRVU01UWl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0SlFVTjJRaXhEUVVGRE8wbEJRMFFzUzBGQlN5eEZRVUZGTEZWQlFVTXNSMEZCV1N4RlFVRkZMRWRCUVdFN1VVRkRMMElzVDBGQlR5eHBRa0ZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF5eE5RVUZOTEVOQlFVTXNlVUpCUVhsQ0xFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUXl4TFFVRmpPMWxCUTNaRkxFOUJRVThzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlF5eFBRVUZQTEVWQlFVVXNTVUZCU1N4RlFVRkZMRXRCUVVzc1JVRkJSU3hMUVVGTExFVkJRVU1zUTBGQlF5eERRVUZETzFGQlF5OUVMRU5CUVVNc1EwRkJReXhEUVVGRExFOUJRVXNzUTBGQlFTeERRVUZETEZWQlFVTXNSMEZCVlR0WlFVTm9RaXhQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMWxCUTI1Q0xFOUJRVThzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlF5eExRVUZMTEVWQlFVVXNOa05CUVRaRExFVkJRVU1zUTBGQlF5eERRVUZETzFGQlEzaEdMRU5CUVVNc1EwRkJReXhEUVVGQk8wbEJRMDRzUTBGQlF6dEpRVU5FTEZkQlFWY3NSVUZCUlN4VlFVRkRMRWRCUVZrc1JVRkJSU3hIUVVGaE8xRkJRM0pETEVsQlFVY3NRMEZCUXl4dFFrRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRPMWxCUTNoQ0xFOUJRVThzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlF5eExRVUZMTEVWQlFVVXNOa0pCUVRaQ0xFVkJRVU1zUTBGQlF5eERRVUZETzFGQlJYaEZMRTlCUVU4c2FVSkJRVWtzUTBGQlF5eFhRVUZYTEVOQlFVTXNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJReXhKUVVGWE8xbEJRemRFTEVsQlFVa3NTVUZCU1N4TFFVRkxMRWxCUVVrc1JVRkJSVHRuUWtGRFppeFBRVUZQTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETzI5Q1FVTjRRaXhKUVVGSkxFVkJRVVU3ZDBKQlEwWXNTMEZCU3l4RlFVRkZMRWxCUVVrc1EwRkJReXhMUVVGTE8zZENRVU5xUWl4SFFVRkhMRVZCUVVVc1NVRkJTU3hEUVVGRExFZEJRVWM3ZDBKQlEySXNTVUZCU1N4RlFVRkZMRWxCUVVrc1EwRkJReXhKUVVGSkxFbEJRVWtzUlVGQlJUdDNRa0ZEY2tJc1NVRkJTU3hGUVVGRkxFbEJRVWtzUTBGQlF5eEpRVUZKTzNkQ1FVTm1MRTlCUVU4c1JVRkJSU3hKUVVGSkxFTkJRVU1zVTBGQlV6dHhRa0ZETVVJN2FVSkJRMG9zUTBGQlF5eERRVUZETzJGQlEwNDdXVUZEUkN4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVNc1MwRkJTeXhGUVVGRkxDdENRVUVyUWl4RlFVRkRMRU5CUVVNc1EwRkJRenRSUVVVeFJTeERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRkxMRU5CUVVFc1EwRkJReXhWUVVGRExFZEJRVlU3V1VGRGFFSXNUMEZCVHl4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dFpRVU51UWl4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVNc1MwRkJTeXhGUVVGRkxEaERRVUU0UXl4RlFVRkRMRU5CUVVNc1EwRkJRenRSUVVONlJpeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTlFMRU5CUVVNN1NVRkRSQ3hYUVVGWExFVkJRVVVzVlVGQlF5eEhRVUZaTEVWQlFVVXNSMEZCWVR0UlFVTnlReXhKUVVGSExFTkJRVU1zYlVKQlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF6dFpRVU4yUWl4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVVc1MwRkJTeXhGUVVGRkxHMUNRVUZ0UWl4RlFVRkZMRU5CUVVNc1EwRkJRenRSUVVOb1JTeFBRVUZQTEdsQ1FVRkpMRU5CUVVNc1kwRkJZeXhEUVVGRExFVkJRVU1zUzBGQlN5eEZRVUZGTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhGUVVGRExFTkJRVU1zUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJReXhMUVVGaE8xbEJRekZGTEVsQlFVa3NTMEZCU3l4TFFVRkxMRU5CUVVNN1owSkJRMWdzVDBGQlR5eEhRVUZITEVOQlFVTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eEZRVUZGTEV0QlFVc3NSVUZCUlN3NFFrRkJPRUlzUlVGQlJTeERRVUZETEVOQlFVTTdXVUZETTBVc1QwRkJUeXhwUWtGQlNTeERRVUZETEZkQlFWY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGRExFbEJRVmM3WjBKQlF6VkVMRWxCUVVrc1EwRkJReXhMUVVGTExFZEJRVWNzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNN1owSkJRelZDTEVsQlFVa3NRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJRenRuUWtGRFdpeEhRVUZITEVOQlFVTXNZVUZCWVN4RFFVRkRMRTFCUVUwc1EwRkJReXhOUVVGTkxFTkJRVU1zUlVGQlJTeEZRVUZGTEVkQlFVY3NRMEZCUXl4SlFVRkpMRVZCUVVVc1JVRkJReXhMUVVGTExFVkJRVVVzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRVZCUVVNc1EwRkJReXhEUVVGRExFTkJRVU03WjBKQlEzaEZMRTlCUVU4c1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSU3hQUVVGUExFVkJRVVVzU1VGQlNTeEZRVUZGTEVOQlFVTXNRMEZCUXp0WlFVTnVSQ3hEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZMTEVOQlFVRXNRMEZCUXl4VlFVRkRMRWRCUVZVN1owSkJRMmhDTEU5QlFVOHNRMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU03WjBKQlEyNUNMRTlCUVU4c1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSU3hMUVVGTExFVkJRVVVzSzBOQlFTdERMRVZCUVVVc1EwRkJReXhEUVVGRE8xbEJRelZHTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTFBc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFVDeERRVUZETzBsQlEwUXNWVUZCVlN4RlFVRkZMRlZCUVVNc1IwRkJXU3hGUVVGRkxFZEJRV0U3VVVGRGNFTXNUMEZCVHl4cFFrRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJRenRoUVVOc1F5eEpRVUZKTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJReXhKUVVGWE8xbEJRM0pDTEVsQlFVa3NRMEZCUXl4SlFVRkpMRWRCUVVjc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTTdXVUZETVVJc1NVRkJTU3hEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETzFsQlExb3NSMEZCUnl4RFFVRkRMR0ZCUVdFc1EwRkJReXhOUVVGTkxFTkJRVU1zVFVGQlRTeERRVUZETEVWQlFVVXNSVUZCUlN4SFFVRkhMRU5CUVVNc1NVRkJTU3hGUVVGRkxFVkJRVVVzU1VGQlNTeEZRVUZGTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEzaEZMRTlCUVU4c1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJReXhQUVVGUExFVkJRVVVzU1VGQlNTeEZRVUZETEVOQlFVTXNRMEZCUXp0UlFVTnFSQ3hEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZMTEVOQlFVRXNRMEZCUXl4VlFVRkRMRWRCUVZVN1dVRkRhRUlzVDBGQlR5eERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRaUVVOdVFpeFBRVUZQTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVTXNTMEZCU3l4RlFVRkZMR2RFUVVGblJDeEZRVUZETEVOQlFVTXNRMEZCUXp0UlFVTXZSaXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTTdTVUZEUkN4alFVRmpMRVZCUVVVc1ZVRkJReXhIUVVGWkxFVkJRVVVzUjBGQllUdFJRVU40UXl4SlFVRkpMRzFDUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3h0UWtGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRE8xbEJRM1JFTEU5QlFVOHNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4TFFVRkxMRVZCUVVVc01FTkJRVEJETEVWQlFVVXNRMEZCUXl4RFFVRkRPMUZCUTNaR0xFOUJRVThzYVVKQlFVa3NRMEZCUXl4WFFVRlhMRU5CUVVNc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlF5eEpRVUZYTzFsQlF6VkVMRWxCUVVrc1EwRkJReXh6UWtGQlZ5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhGUVVGRkxFbEJRVWtzUTBGQlF5eFJRVUZSTEVOQlFVTTdaMEpCUXpkRExFOUJRVThzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlF5eExRVUZMTEVWQlFVVXNLMEpCUVN0Q0xFVkJRVU1zUTBGQlF5eERRVUZETzFsQlF6RkZMRWxCUVVrc1EwRkJReXhSUVVGUkxFZEJRVWNzYlVKQlFWRXNRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzFsQlF6TkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF6dFpRVU5hTEU5QlFVOHNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUXl4UFFVRlBMRVZCUVVVc1NVRkJTU3hGUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5xUkN4RFFVRkRMRU5CUVVNc1EwRkJRVHRKUVVOT0xFTkJRVU03U1VGRFJDeGhRVUZoTEVWQlFVVXNWVUZCUXl4SFFVRlpMRVZCUVVVc1IwRkJZVHRSUVVOMlF5eFBRVUZQTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVTXNTMEZCU3l4RlFVRkZMR2xDUVVGcFFpeEZRVUZETEVOQlFVTXNRMEZCUXp0SlFVTTFSQ3hEUVVGRE8wbEJUMFFzVlVGQlZTeEZRVUZGTEZWQlFVTXNSMEZCV1N4RlFVRkZMRWRCUVdFN1VVRkRjRU1zU1VGQlJ5eHRRa0ZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4dFFrRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRPMWxCUTI1RUxHMUNRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hMUVVGTExFMUJRVTBzU1VGQlNTeEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1MwRkJTeXhQUVVGUExFTkJRVU03V1VGRGFFWXNUMEZCVHl4SFFVRkhMRU5CUVVNc1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkZMRXRCUVVzc1JVRkJSU3hyUTBGQmEwTXNSVUZCUXl4RFFVRkRMRU5CUVVNN1VVRkRPVVVzVDBGQlR5eHBRa0ZCU1N4RFFVRkRMRmRCUVZjc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMR05CUVdNc1EwRkJReXhWUVVGRExFZEJRVkVzUlVGQlJTeERRVUZUTzFsQlEzWkZMRWxCUVVrc1IwRkJSeXhGUVVGRk8yZENRVU5NTEU5QlFVOHNRMEZCUXl4TFFVRkxMRU5CUVVNc2QwUkJRWGRFTEVkQlFVY3NSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFVkJRVVVzUjBGQlJ5eERRVUZETEVOQlFVTTdaMEpCUXpsR0xFOUJRVThzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlF5eExRVUZMTEVWQlFVVXNjMEpCUVhOQ0xFVkJRVU1zUTBGQlF5eERRVUZETzJGQlEyaEZPMWxCUTBRc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF6dG5Ra0ZEVUN4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVNc1MwRkJTeXhGUVVGRkxITkNRVUZ6UWl4RlFVRkRMRU5CUVVNc1EwRkJRenRaUVVOcVJTeEpRVUZKTEVOQlFVTXNSMEZCUnl4SlFVRkpMR2xDUVVGSkxFTkJRVU03WjBKQlEySXNTMEZCU3l4RlFVRkZMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN6dG5Ra0ZEY2tJc1NVRkJTU3hGUVVGRkxFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4SlFVRkpMRVZCUVVVN1owSkJRM3BDTEVsQlFVa3NSVUZCUlN4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWs3WjBKQlJXNUNMRkZCUVZFc1JVRkJSU3hOUVVGTk8yRkJRMjVDTEVOQlFVTXNRMEZCUVR0WlFVTkdMRTlCUVU4c1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZETEVkQlFWRXNSVUZCUlN4RFFVRlJPMmRDUVVNM1FpeEpRVUZKTEVkQlFVY3NSVUZCUlR0dlFrRkRUQ3hQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETERCRFFVRXdReXhGUVVGRkxFZEJRVWNzUTBGQlF5eERRVUZETzI5Q1FVTXZSQ3hQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVVVzUzBGQlN5eEZRVUZGTEhOQ1FVRnpRaXhGUVVGRkxFTkJRVU1zUTBGQlF6dHBRa0ZEYkVVN1owSkJRMFFzVDBGQlR5eEhRVUZITEVOQlFVTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eEZRVUZETEU5QlFVOHNSVUZCUlN4SlFVRkpMRVZCUVVNc1EwRkJReXhEUVVGRE8xbEJRMnBFTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUlZBc1EwRkJReXhEUVVGRExFTkJRVUU3U1VGRFRpeERRVUZETzBsQlZVUXNVVUZCVVN4RlFVRkZMRlZCUVVNc1IwRkJXU3hGUVVGRkxFZEJRV0U3VVVGRGJFTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eEpRVUZKTEVOQlFVTXNiVUpCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXp0WlFVTXpReXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVU1zUzBGQlN5eEZRVUZGTERaQ1FVRTJRaXhGUVVGRExFTkJRVU1zUTBGQlF6dFJRVU40UlN4SlFVRkpMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NTVUZCU1N4RFFVRkRMRzFDUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRE8xbEJRM0JFTEU5QlFVOHNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4TFFVRkxMRVZCUVVVc05rSkJRVFpDTEVWQlFVVXNRMEZCUXl4RFFVRkRPMUZCUXpGRkxFbEJRVWtzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hKUVVGSkxFTkJRVU1zYlVKQlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NTMEZCU3l4TlFVRk5MRWxCUVVrc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4TFFVRkxMRTlCUVU4c1EwRkJRenRaUVVOMlNDeFBRVUZQTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVTXNTMEZCU3l4RlFVRkZMR05CUVdNc1JVRkJReXhEUVVGRExFTkJRVU03VVVGRGVrUXNUMEZCVHl4cFFrRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZETEVkQlFWRXNSVUZCUlN4SlFVRlhPMWxCUXk5RUxFbEJRVWtzUjBGQlJ5eEZRVUZGTzJkQ1FVTk1MRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zYzBKQlFYTkNMRVZCUVVVc1IwRkJSeXhEUVVGRExFTkJRVU03WjBKQlEzcERMRTlCUVU4c1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJReXhMUVVGTExFVkJRVVVzYzBKQlFYTkNMRVZCUVVNc1EwRkJReXhEUVVGRE8yRkJRMmhGTzFsQlEwUXNTVUZCU1N4RFFVRkRMRWxCUVVrc1JVRkJSVHRuUWtGRFVDeFBRVUZQTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVTXNTMEZCU3l4RlFVRkZMSEZDUVVGeFFpeEZRVUZETEVOQlFVTXNRMEZCUXp0aFFVTXZSRHRaUVVORUxFbEJRVWtzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTenRuUWtGRGJrSXNTVUZCU1N4RFFVRkRMRXRCUVVzc1IwRkJSeXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNN1dVRkRja01zU1VGQlNTeEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSk8yZENRVU5zUWl4SlFVRkpMRU5CUVVNc1NVRkJTU3hIUVVGSExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJRenRaUVVOdVF5eEpRVUZKTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWs3WjBKQlEyeENMRWxCUVVrc1EwRkJReXhKUVVGSkxFZEJRVWNzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRE8xbEJRMjVETEU5QlFVOHNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGRExFZEJRVkVzUlVGQlJTeEpRVUZYTzJkQ1FVTnVReXhKUVVGSkxFZEJRVWNzUlVGQlJUdHZRa0ZEVEN4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzI5Q1FVTnFRaXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVU1zUzBGQlN5eEZRVUZGTEhOQ1FVRnpRaXhGUVVGRExFTkJRVU1zUTBGQlF6dHBRa0ZEYUVVN1owSkJRMFFzVDBGQlR5eEhRVUZITEVOQlFVTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eEZRVUZETEU5QlFVOHNSVUZCUlN4SlFVRkpMRVZCUVVNc1EwRkJReXhEUVVGRE8xbEJRMnBFTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTFBc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFVDeERRVUZETzBsQlEwUXNWVUZCVlN4RlFVRkZMRlZCUVVNc1IwRkJXU3hGUVVGRkxFZEJRV0U3VVVGRGNFTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eEpRVUZKTEVOQlFVTXNiVUpCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXp0WlFVTXpReXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVU1zUzBGQlN5eEZRVUZGTEc5RFFVRnZReXhGUVVGRExFTkJRVU1zUTBGQlF6dFJRVU12UlN4UFFVRlBMR2xDUVVGSkxFTkJRVU1zVjBGQlZ5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFVTXNSMEZCVVN4RlFVRkZMRWxCUVZjN1dVRkRMMFFzU1VGQlNTeEhRVUZITEVWQlFVVTdaMEpCUTB3c1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eHpRa0ZCYzBJc1JVRkJSU3hIUVVGSExFTkJRVU1zUTBGQlF6dG5Ra0ZEZWtNc1QwRkJUeXhIUVVGSExFTkJRVU1zVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRExFdEJRVXNzUlVGQlJTeHpRa0ZCYzBJc1JVRkJReXhEUVVGRExFTkJRVU03WVVGRGFFVTdXVUZEUkN4SlFVRkpMRU5CUVVNc1NVRkJTVHRuUWtGRFRDeFBRVUZQTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVTXNTMEZCU3l4RlFVRkZMSEZDUVVGeFFpeEZRVUZETEVOQlFVTXNRMEZCUXp0WlFVTm9SU3hKUVVGSkxFbEJRVWtzUTBGQlF5eFBRVUZQTzJkQ1FVTmFMRTlCUVU4c1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJReXhMUVVGTExFVkJRVVVzYzBKQlFYTkNMRVZCUVVNc1EwRkJReXhEUVVGRE8xbEJRMnBGTEVsQlFVa3NSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFdEJRVXNzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxPMmRDUVVOcVF5eFBRVUZQTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVTXNTMEZCU3l4RlFVRkZMRFJDUVVFMFFpeEZRVUZETEVOQlFVTXNRMEZCUXp0WlFVTjJSU3hKUVVGSkxFTkJRVU1zVDBGQlR5eEhRVUZITEVsQlFVa3NRMEZCUXp0WlFVTndRaXhQUVVGUExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUXl4SFFVRlJPMmRDUVVOMFFpeFBRVUZQTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVTXNUMEZCVHl4RlFVRkZMRWxCUVVrc1JVRkJReXhEUVVGRExFTkJRVU03V1VGRGFrUXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTTdTVUZEUkN4WFFVRlhMRVZCUVVVc1ZVRkJReXhIUVVGWkxFVkJRVVVzUjBGQllUdFJRVU55UXl4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVsQlFVa3NRMEZCUXl4dFFrRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRPMWxCUXpORExFOUJRVThzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlJTeExRVUZMTEVWQlFVVXNiME5CUVc5RExFVkJRVVVzUTBGQlF5eERRVUZETzFGQlEycEdMRTlCUVU4c2FVSkJRVWtzUTBGQlF5eFhRVUZYTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUXl4SFFVRlJMRVZCUVVVc1NVRkJWenRaUVVNdlJDeEpRVUZKTEVkQlFVY3NSVUZCUlR0blFrRkRUQ3hQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEhOQ1FVRnpRaXhGUVVGRkxFZEJRVWNzUTBGQlF5eERRVUZETzJkQ1FVTjZReXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVVVzUzBGQlN5eEZRVUZGTEhOQ1FVRnpRaXhGUVVGRkxFTkJRVU1zUTBGQlF6dGhRVU5zUlR0WlFVTkVMRWxCUVVrc1EwRkJReXhKUVVGSk8yZENRVU5NTEU5QlFVOHNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4TFFVRkxMRVZCUVVVc2NVSkJRWEZDTEVWQlFVVXNRMEZCUXl4RFFVRkRPMWxCUTJ4RkxFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHp0blFrRkRZaXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVVVzUzBGQlN5eEZRVUZGTEhGQ1FVRnhRaXhGUVVGRkxFTkJRVU1zUTBGQlF6dFpRVU01UkN4SlFVRkpMRU5CUVVNc1QwRkJUeXhIUVVGSExFdEJRVXNzUTBGQlF6dFpRVU42UWl4UFFVRlBMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlF5eEhRVUZSTzJkQ1FVTjBRaXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVVVzVDBGQlR5eEZRVUZGTEVsQlFVa3NSVUZCUlN4RFFVRkRMRU5CUVVNN1dVRkRia1FzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOUUxFTkJRVU03UTBGRFNpeERRVUZCSW4wPSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmZ1bmN0aW9uIGRlZmF1bHRfMShyZXEsIHJlcywgbmV4dCkge1xuICAgIGlmIChyZXEudXNlciAmJiByZXEudXNlci5yb2xlID09PSAnYWRtaW4nKSB7XG4gICAgICAgIHJldHVybiBuZXh0KCk7XG4gICAgfVxuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7IGVycm9yOiAnTm90IGF1dGhvcml6ZWQgYXMgYWRtaW4nIH0pO1xufVxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBkZWZhdWx0XzE7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lZV1J0YVc0dWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOHVMaTh1TGk5emNtTXZjMlZ5ZG1WeUwyMXBaR1JzWlhkaGNtVXZZV1J0YVc0dWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZCUVN4dFFrRkJkMElzUjBGQlVTeEZRVUZGTEVkQlFWRXNSVUZCUlN4SlFVRmpPMGxCUTNSRUxFbEJRVWtzUjBGQlJ5eERRVUZETEVsQlFVa3NTVUZCU1N4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUzBGQlN5eFBRVUZQTEVWQlFVVTdVVUZEZGtNc1QwRkJUeXhKUVVGSkxFVkJRVVVzUTBGQlF6dExRVU5xUWp0SlFVTkVMRTlCUVU4c1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSU3hMUVVGTExFVkJRVVVzZVVKQlFYbENMRVZCUVVVc1EwRkJReXhEUVVGRE8wRkJRM1JGTEVOQlFVTTdRVUZNUkN3clFrRkxReUo5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIGpzb253ZWJ0b2tlbl8xID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTtcbnZhciBlbnYgPSByZXF1aXJlKCcuLi8uLi8uLi9lbnYnKTtcbmZ1bmN0aW9uIGRlZmF1bHRfMShyZXEsIHJlcywgbmV4dCkge1xuICAgIHZhciB0b2tlbiA9IHJlcS5zZXNzaW9uLnRva2VuIHx8IHJlcS5oZWFkZXJzWyd4LWFjY2Vzcy10b2tlbiddO1xuICAgIGlmICghdG9rZW4pXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7IGVycm9yOiAnTm90IGF1dGhvcml6ZWQnIH0pO1xuICAgIGpzb253ZWJ0b2tlbl8xLnZlcmlmeSh0b2tlbiwgZW52LnNlY3JldCwgZnVuY3Rpb24gKGVyciwgZGVjb2RlZCkge1xuICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5zZW5kKHsgZXJyb3I6ICdOb3QgYXV0aG9yaXplZCcgfSk7XG4gICAgICAgIHJlcS51c2VyID0gZGVjb2RlZDtcbiAgICAgICAgcmV0dXJuIG5leHQoKTtcbiAgICB9KTtcbn1cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZGVmYXVsdF8xO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWVhWMGFHOXlhWHBsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUx5NHVMeTR1TDNOeVl5OXpaWEoyWlhJdmJXbGtaR3hsZDJGeVpTOWhkWFJvYjNKcGVtVmtMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3TzBGQlFVRXNOa05CUVhORE8wRkJSM1JETEVsQlFVMHNSMEZCUnl4SFFVRkhMRTlCUVU4c1EwRkJReXhqUVVGakxFTkJRVU1zUTBGQlF6dEJRVU53UXl4dFFrRkJkMElzUjBGQldTeEZRVUZGTEVkQlFXRXNSVUZCUlN4SlFVRmpPMGxCUXk5RUxFbEJRVWtzUzBGQlN5eEhRVUZITEVkQlFVY3NRMEZCUXl4UFFVRlBMRU5CUVVNc1MwRkJTeXhKUVVGSkxFZEJRVWNzUTBGQlF5eFBRVUZQTEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zUTBGQlF6dEpRVU12UkN4SlFVRkpMRU5CUVVNc1MwRkJTenRSUVVOT0xFOUJRVThzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlJTeExRVUZMTEVWQlFVVXNaMEpCUVdkQ0xFVkJRVVVzUTBGQlF5eERRVUZETzBsQlJUZEVMSEZDUVVGTkxFTkJRVU1zUzBGQlN5eEZRVUZGTEVkQlFVY3NRMEZCUXl4TlFVRk5MRVZCUVVVc1ZVRkJReXhIUVVGVkxFVkJRVVVzVDBGQll6dFJRVU5xUkN4SlFVRkpMRWRCUVVjN1dVRkJSU3hQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVVVzUzBGQlN5eEZRVUZGTEdkQ1FVRm5RaXhGUVVGRkxFTkJRVU1zUTBGQlF6dFJRVU5zUlN4SFFVRkhMRU5CUVVNc1NVRkJTU3hIUVVGSExFOUJRVThzUTBGQlF6dFJRVU51UWl4UFFVRlBMRWxCUVVrc1JVRkJSU3hEUVVGRE8wbEJRMnhDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMEZCUTFBc1EwRkJRenRCUVZaRUxDdENRVlZESW4wPSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBtb25nb29zZV8xID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpO1xudmFyIGNoYW5uZWxTY2hlbWEgPSBuZXcgbW9uZ29vc2VfMS5TY2hlbWEoe1xuICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgbG93ZXJjYXNlOiB0cnVlLFxuICAgIH0sXG59LCB7XG4gICAgdGltZXN0YW1wczogdHJ1ZVxufSk7XG52YXIgQ2hhbm5lbCA9IG1vbmdvb3NlXzEubW9kZWwoJ0NoYW5uZWwnLCBjaGFubmVsU2NoZW1hKTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gQ2hhbm5lbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVEyaGhibTVsYkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUx5NHVMeTR1TDNOeVl5OXpaWEoyWlhJdmJXOWtaV3h6TDBOb1lXNXVaV3d1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRkJRU3h4UTBGQmQwUTdRVUZSZUVRc1NVRkJUU3hoUVVGaExFZEJRVmNzU1VGQlNTeHBRa0ZCVFN4RFFVRkRPMGxCUTNKRExFbEJRVWtzUlVGQlJUdFJRVU5HTEVsQlFVa3NSVUZCUlN4TlFVRk5PMUZCUTFvc1VVRkJVU3hGUVVGRkxFbEJRVWs3VVVGRFpDeFRRVUZUTEVWQlFVVXNTVUZCU1R0TFFVTnNRanREUVVOS0xFVkJRVVU3U1VGRFF5eFZRVUZWTEVWQlFVVXNTVUZCU1R0RFFVTnVRaXhEUVVGRExFTkJRVU03UVVGRlNDeEpRVUZOTEU5QlFVOHNSMEZCYjBJc1owSkJRVXNzUTBGQlF5eFRRVUZUTEVWQlFVVXNZVUZCWVN4RFFVRkRMRU5CUVVNN1FVRkRha1VzY1VKQlFXVXNUMEZCVHl4RFFVRkRJbjA9IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIG1vbmdvb3NlXzEgPSByZXF1aXJlKFwibW9uZ29vc2VcIik7XG52YXIgbWVzc2FnZVNjaGVtYSA9IG5ldyBtb25nb29zZV8xLlNjaGVtYSh7XG4gICAgY2hhbm5lbDoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIH0sXG4gICAgdGV4dDoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIH0sXG4gICAgdXNlckVtYWlsOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIGxvd2VyY2FzZTogdHJ1ZSxcbiAgICB9XG59LCB7XG4gICAgdGltZXN0YW1wczogdHJ1ZVxufSk7XG52YXIgTWVzc2FnZSA9IG1vbmdvb3NlXzEubW9kZWwoJ01lc3NhZ2UnLCBtZXNzYWdlU2NoZW1hKTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gTWVzc2FnZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVRXVnpjMkZuWlM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUx5NHVMeTR1TDNOeVl5OXpaWEoyWlhJdmJXOWtaV3h6TDAxbGMzTmhaMlV1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRkJRU3h4UTBGQmQwUTdRVUZWZUVRc1NVRkJUU3hoUVVGaExFZEJRVmNzU1VGQlNTeHBRa0ZCVFN4RFFVRkRPMGxCUTNKRExFOUJRVThzUlVGQlJUdFJRVU5NTEVsQlFVa3NSVUZCUlN4TlFVRk5PMUZCUTFvc1VVRkJVU3hGUVVGRkxFbEJRVWs3UzBGRmFrSTdTVUZEUkN4SlFVRkpMRVZCUVVVN1VVRkRSaXhKUVVGSkxFVkJRVVVzVFVGQlRUdFJRVU5hTEZGQlFWRXNSVUZCUlN4SlFVRkpPMHRCUTJwQ08wbEJRMFFzVTBGQlV5eEZRVUZGTzFGQlExQXNTVUZCU1N4RlFVRkZMRTFCUVUwN1VVRkRXaXhSUVVGUkxFVkJRVVVzU1VGQlNUdFJRVU5rTEZOQlFWTXNSVUZCUlN4SlFVRkpPMHRCUld4Q08wTkJRMG9zUlVGQlJUdEpRVU5ETEZWQlFWVXNSVUZCUlN4SlFVRkpPME5CUTI1Q0xFTkJRVU1zUTBGQlF6dEJRVVZJTEVsQlFVMHNUMEZCVHl4SFFVRnZRaXhuUWtGQlN5eERRVUZETEZOQlFWTXNSVUZCUlN4aFFVRmhMRU5CUVVNc1EwRkJRenRCUVVOcVJTeHhRa0ZCWlN4UFFVRlBMRU5CUVVNaWZRPT0iLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgbW9uZ29vc2VfMSA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTtcbjtcbnZhciB1c2VyU2NoZW1hID0gbmV3IG1vbmdvb3NlXzEuU2NoZW1hKHtcbiAgICBuYW1lOiBTdHJpbmcsXG4gICAgZW1haWw6IHtcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgbG93ZXJjYXNlOiB0cnVlXG4gICAgfSxcbiAgICBwYXNzd29yZDoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICByb2xlOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIGxvd2VyY2FzZTogdHJ1ZSxcbiAgICAgICAgXCJlbnVtXCI6IFsnYWRtaW4nLCAndXNlciddXG4gICAgfSxcbiAgICBkZWxldGVkOiB7XG4gICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgIFwiZGVmYXVsdFwiOiBmYWxzZVxuICAgIH0sXG4gICAgdmVyaWZpZWQ6IHtcbiAgICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgICAgXCJkZWZhdWx0XCI6IGZhbHNlLFxuICAgIH0sXG59LCB7XG4gICAgdGltZXN0YW1wczogdHJ1ZVxufSk7XG51c2VyU2NoZW1hLnN0YXRpY3MuZmluZEJ5RW1haWwgPSBmdW5jdGlvbiAoZW1haWwpIHtcbiAgICByZXR1cm4gdGhpcy5maW5kT25lKHsgZW1haWw6IGVtYWlsIH0pO1xufTtcbnZhciBVc2VyID0gbW9uZ29vc2VfMS5tb2RlbCgnVXNlcicsIHVzZXJTY2hlbWEpO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBVc2VyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pVlhObGNpNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1THk0dUwzTnlZeTl6WlhKMlpYSXZiVzlrWld4ekwxVnpaWEl1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRkJRU3h4UTBGQk9FVTdRVUZaTjBVc1EwRkJRenRCUVUxR0xFbEJRVTBzVlVGQlZTeEhRVUZYTEVsQlFVa3NhVUpCUVUwc1EwRkJRenRKUVVOc1F5eEpRVUZKTEVWQlFVVXNUVUZCVFR0SlFVTmFMRXRCUVVzc1JVRkJSVHRSUVVOSUxGRkJRVkVzUlVGQlJTeEpRVUZKTzFGQlEyUXNTVUZCU1N4RlFVRkZMRTFCUVUwN1VVRkRXaXhUUVVGVExFVkJRVVVzU1VGQlNUdExRVU5zUWp0SlFVTkVMRkZCUVZFc1JVRkJSVHRSUVVOT0xFbEJRVWtzUlVGQlJTeE5RVUZOTzFGQlExb3NVVUZCVVN4RlFVRkZMRWxCUVVrN1MwRkRha0k3U1VGRFJDeEpRVUZKTEVWQlFVVTdVVUZEUml4SlFVRkpMRVZCUVVVc1RVRkJUVHRSUVVOYUxGRkJRVkVzUlVGQlJTeEpRVUZKTzFGQlEyUXNVMEZCVXl4RlFVRkZMRWxCUVVrN1VVRkRaaXhOUVVGSkxFVkJRVVVzUTBGQlF5eFBRVUZQTEVWQlFVVXNUVUZCVFN4RFFVRkRPMHRCUXpGQ08wbEJRMFFzVDBGQlR5eEZRVUZGTzFGQlEwd3NTVUZCU1N4RlFVRkZMRTlCUVU4N1VVRkRZaXhUUVVGUExFVkJRVVVzUzBGQlN6dExRVU5xUWp0SlFVTkVMRkZCUVZFc1JVRkJSVHRSUVVOT0xFbEJRVWtzUlVGQlJTeFBRVUZQTzFGQlEySXNVMEZCVHl4RlFVRkZMRXRCUVVzN1MwRkRha0k3UTBGRFNpeEZRVUZGTzBsQlEwTXNWVUZCVlN4RlFVRkZMRWxCUVVrN1EwRkRia0lzUTBGQlF5eERRVUZETzBGQlJVZ3NWVUZCVlN4RFFVRkRMRTlCUVU4c1EwRkJReXhYUVVGWExFZEJRVWNzVlVGQlZTeExRVUZoTzBsQlEzQkVMRTlCUVU4c1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eEZRVUZETEV0QlFVc3NSVUZCUlN4TFFVRkxMRVZCUVVNc1EwRkJReXhEUVVGRE8wRkJRM2hETEVOQlFVTXNRMEZCUVR0QlFVVkVMRWxCUVUwc1NVRkJTU3hIUVVGbExHZENRVUZMTEVOQlFXOUNMRTFCUVUwc1JVRkJSU3hWUVVGVkxFTkJRVU1zUTBGQlF6dEJRVU4wUlN4eFFrRkJaU3hKUVVGSkxFTkJRVU1pZlE9PSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBwYXRoID0gcmVxdWlyZShcInBhdGhcIik7XG52YXIgYXV0aG9yaXplZF8xID0gcmVxdWlyZShcIi4vbWlkZGxld2FyZS9hdXRob3JpemVkXCIpO1xudmFyIGFkbWluXzEgPSByZXF1aXJlKFwiLi9taWRkbGV3YXJlL2FkbWluXCIpO1xudmFyIGF1dGhDb250cm9sbGVyXzEgPSByZXF1aXJlKFwiLi9jb250cm9sbGVycy9hdXRoQ29udHJvbGxlclwiKTtcbnZhciB1c2VyQ29udHJvbGxlcl8xID0gcmVxdWlyZShcIi4vY29udHJvbGxlcnMvdXNlckNvbnRyb2xsZXJcIik7XG52YXIgbWVzc2FnZUNvbnRyb2xsZXJfMSA9IHJlcXVpcmUoXCIuL2NvbnRyb2xsZXJzL21lc3NhZ2VDb250cm9sbGVyXCIpO1xudmFyIGNoYW5uZWxDb250cm9sbGVyXzEgPSByZXF1aXJlKFwiLi9jb250cm9sbGVycy9jaGFubmVsQ29udHJvbGxlclwiKTtcbmZ1bmN0aW9uIGRlZmF1bHRfMShhcHApIHtcbiAgICBhcHAuZ2V0KCcvJywgZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgICAgIHJldHVybiByZXMucmVuZGVyKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi9kaXN0L3B1YmxpYy9pbmRleC5odG1sJyksIHsgY3NyZlRva2VuOiByZXEuY3NyZlRva2VuKCkgfSk7XG4gICAgfSk7XG4gICAgYXBwLmdldCgnL3dpZGdldCcsIGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICByZXR1cm4gcmVzLnJlbmRlcihwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vLi4vZGlzdC9wdWJsaWMvd2lkZ2V0L2luZGV4Lmh0bWwnKSk7XG4gICAgfSk7XG4gICAgYXBwLmdldCgnL3dpZGdldC9kZW1vJywgZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgICAgIHJldHVybiByZXMucmVuZGVyKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi8uLi9kaXN0L3B1YmxpYy93aWRnZXQvZGVtby5odG1sJykpO1xuICAgIH0pO1xuICAgIGFwcC5wb3N0KCcvYXBpL3YxL2xvZ2luJywgYXV0aENvbnRyb2xsZXJfMVtcImRlZmF1bHRcIl0ubG9naW4pO1xuICAgIGFwcC5wb3N0KCcvYXBpL3YxL3JlZ2lzdGVyJywgYXV0aENvbnRyb2xsZXJfMVtcImRlZmF1bHRcIl0ucmVnaXN0ZXIpO1xuICAgIGFwcC5nZXQoJy9hcGkvdjEvbG9nb3V0JywgYXV0aENvbnRyb2xsZXJfMVtcImRlZmF1bHRcIl0ubG9nb3V0KTtcbiAgICBhcHAuZ2V0KCcvYXBpL3YxL3ZlcmlmeUVtYWlsLzppZCcsIGF1dGhDb250cm9sbGVyXzFbXCJkZWZhdWx0XCJdLnZlcmlmeUVtYWlsKTtcbiAgICBhcHAudXNlKCcvYXBpL3YxL3VzZXIqJywgYXV0aG9yaXplZF8xW1wiZGVmYXVsdFwiXSk7XG4gICAgYXBwLmdldCgnL2FwaS92MS91c2VyJywgdXNlckNvbnRyb2xsZXJfMVtcImRlZmF1bHRcIl0udXNlcik7XG4gICAgYXBwLmdldCgnL2FwaS92MS91c2VycycsIHVzZXJDb250cm9sbGVyXzFbXCJkZWZhdWx0XCJdLnVzZXJzKTtcbiAgICBhcHAuZ2V0KCcvYXBpL3YxL3VzZXIvOnVzZXInLCB1c2VyQ29udHJvbGxlcl8xW1wiZGVmYXVsdFwiXS51c2VyQnlFbWFpbCk7XG4gICAgYXBwLnBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvZW1haWwnLCB1c2VyQ29udHJvbGxlcl8xW1wiZGVmYXVsdFwiXS51cGRhdGVFbWFpbCk7XG4gICAgYXBwLnBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvbmFtZScsIHVzZXJDb250cm9sbGVyXzFbXCJkZWZhdWx0XCJdLnVwZGF0ZU5hbWUpO1xuICAgIGFwcC5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL3Bhc3N3b3JkJywgdXNlckNvbnRyb2xsZXJfMVtcImRlZmF1bHRcIl0udXBkYXRlUGFzc3dvcmQpO1xuICAgIGFwcC5wb3N0KCcvYXBpL3YxL3VzZXIvcmVzZXRfcGFzc3dvcmQnLCB1c2VyQ29udHJvbGxlcl8xW1wiZGVmYXVsdFwiXS5yZXNldFBhc3N3b3JkKTtcbiAgICBhcHAucG9zdCgnL2FwaS92MS91c2VyL2NyZWF0ZScsIGFkbWluXzFbXCJkZWZhdWx0XCJdLCB1c2VyQ29udHJvbGxlcl8xW1wiZGVmYXVsdFwiXS5jcmVhdGVVc2VyKTtcbiAgICBhcHAucHV0KCcvYXBpL3YxL3VzZXIvdXBkYXRlJywgYWRtaW5fMVtcImRlZmF1bHRcIl0sIHVzZXJDb250cm9sbGVyXzFbXCJkZWZhdWx0XCJdLmVkaXRVc2VyKTtcbiAgICBhcHBbXCJkZWxldGVcIl0oJy9hcGkvdjEvdXNlci9kZWxldGUnLCBhZG1pbl8xW1wiZGVmYXVsdFwiXSwgdXNlckNvbnRyb2xsZXJfMVtcImRlZmF1bHRcIl0uZGVsZXRlVXNlcik7XG4gICAgYXBwLnB1dCgnL2FwaS92MS91c2VyL3Jlc3RvcmUnLCBhZG1pbl8xW1wiZGVmYXVsdFwiXSwgdXNlckNvbnRyb2xsZXJfMVtcImRlZmF1bHRcIl0ucmVzdG9yZVVzZXIpO1xuICAgIGFwcC51c2UoJy9hcGkvdjEvbWVzc2FnZSonLCBhdXRob3JpemVkXzFbXCJkZWZhdWx0XCJdKTtcbiAgICBhcHAuZ2V0KCcvYXBpL3YxL21lc3NhZ2VzLzpjaGFubmVsLzpvZmZzZXQnLCBtZXNzYWdlQ29udHJvbGxlcl8xW1wiZGVmYXVsdFwiXS5tZXNzYWdlcyk7XG4gICAgYXBwLnVzZSgnL2FwaS92MS9jaGFubmVsJywgYXV0aG9yaXplZF8xW1wiZGVmYXVsdFwiXSk7XG4gICAgYXBwLmdldCgnL2FwaS92MS9jaGFubmVscycsIGNoYW5uZWxDb250cm9sbGVyXzFbXCJkZWZhdWx0XCJdLmNoYW5uZWxzKTtcbiAgICBhcHAucG9zdCgnL2FwaS92MS9jaGFubmVscy9kZWxldGUnLCBhZG1pbl8xW1wiZGVmYXVsdFwiXSwgY2hhbm5lbENvbnRyb2xsZXJfMVtcImRlZmF1bHRcIl1bXCJkZWxldGVcIl0pO1xuICAgIGFwcC5wb3N0KCcvYXBpL3YxL2NoYW5uZWxzL2NyZWF0ZScsIGFkbWluXzFbXCJkZWZhdWx0XCJdLCBjaGFubmVsQ29udHJvbGxlcl8xW1wiZGVmYXVsdFwiXS5jcmVhdGUpO1xuICAgIGFwcC5nZXQoJyonLCBmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5yZW5kZXIocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL2Rpc3QvcHVibGljL2luZGV4Lmh0bWwnKSwgeyBjc3JmVG9rZW46IHJlcS5jc3JmVG9rZW4oKSB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZGVmYXVsdF8xO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pY205MWRHVnpMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dmMzSmpMM05sY25abGNpOXliM1YwWlhNdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZCUVN3eVFrRkJOa0k3UVVGRk4wSXNjMFJCUVdsRU8wRkJRMnBFTERSRFFVRjFRenRCUVVOMlF5d3JSRUZCTUVRN1FVRkRNVVFzSzBSQlFUQkVPMEZCUXpGRUxIRkZRVUZuUlR0QlFVTm9SU3h4UlVGQlowVTdRVUZGYUVVc2JVSkJRWGRDTEVkQlFWRTdTVUZITlVJc1IwRkJSeXhEUVVGRExFZEJRVWNzUTBGQlF5eEhRVUZITEVWQlFVVXNWVUZCVlN4SFFVRlpMRVZCUVVVc1IwRkJZVHRSUVVNNVF5eFBRVUZQTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUTJJc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eFRRVUZUTEVWQlFVVXNPRUpCUVRoQ0xFTkJRVU1zUlVGRGRrUXNSVUZCUlN4VFFVRlRMRVZCUVVVc1IwRkJSeXhEUVVGRExGTkJRVk1zUlVGQlJTeEZRVUZGTEVOQlEycERMRU5CUVVNN1NVRkRUaXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVVZJTEVkQlFVY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1UwRkJVeXhGUVVGRkxGVkJRVlVzUjBGQlVTeEZRVUZGTEVkQlFWRTdVVUZETTBNc1QwRkJUeXhIUVVGSExFTkJRVU1zVFVGQlRTeERRVU5pTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1UwRkJVeXhGUVVGRkxIZERRVUYzUXl4RFFVRkRMRU5CUTNCRkxFTkJRVU03U1VGRFRpeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVVklMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zWTBGQll5eEZRVUZGTEZWQlFWVXNSMEZCVVN4RlFVRkZMRWRCUVZFN1VVRkRhRVFzVDBGQlR5eEhRVUZITEVOQlFVTXNUVUZCVFN4RFFVTmlMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zVTBGQlV5eEZRVUZGTEhWRFFVRjFReXhEUVVGRExFTkJRMjVGTEVOQlFVTTdTVUZEVGl4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVsSUxFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNaVUZCWlN4RlFVRkZMREpDUVVGakxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTTdTVUZEYUVRc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eHJRa0ZCYTBJc1JVRkJSU3d5UWtGQll5eERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRPMGxCUTNSRUxFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNaMEpCUVdkQ0xFVkJRVVVzTWtKQlFXTXNRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJRenRKUVVOcVJDeEhRVUZITEVOQlFVTXNSMEZCUnl4RFFVRkRMSGxDUVVGNVFpeEZRVUZGTERKQ1FVRmpMRU5CUVVNc1YwRkJWeXhEUVVGRExFTkJRVU03U1VGRkwwUXNSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXhsUVVGbExFVkJRVVVzZFVKQlFWVXNRMEZCUXl4RFFVRkRPMGxCUTNKRExFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNZMEZCWXl4RlFVRkZMREpDUVVGakxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdTVUZETjBNc1IwRkJSeXhEUVVGRExFZEJRVWNzUTBGQlF5eGxRVUZsTEVWQlFVVXNNa0pCUVdNc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlFUdEpRVU01UXl4SFFVRkhMRU5CUVVNc1IwRkJSeXhEUVVGRExHOUNRVUZ2UWl4RlFVRkZMREpDUVVGakxFTkJRVU1zVjBGQlZ5eERRVUZETEVOQlFVTTdTVUZETVVRc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5d3lRa0ZCTWtJc1JVRkJSU3d5UWtGQll5eERRVUZETEZkQlFWY3NRMEZCUXl4RFFVRkRPMGxCUTJ4RkxFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNNRUpCUVRCQ0xFVkJRVVVzTWtKQlFXTXNRMEZCUXl4VlFVRlZMRU5CUVVNc1EwRkJRenRKUVVOb1JTeEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRGhDUVVFNFFpeEZRVUZGTERKQ1FVRmpMRU5CUVVNc1kwRkJZeXhEUVVGRExFTkJRVU03U1VGRGVFVXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXcyUWtGQk5rSXNSVUZCUlN3eVFrRkJZeXhEUVVGRExHRkJRV0VzUTBGQlF5eERRVUZETzBsQlEzUkZMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zY1VKQlFYRkNMRVZCUVVVc2EwSkJRVXNzUlVGQlJTd3lRa0ZCWXl4RFFVRkRMRlZCUVZVc1EwRkJReXhEUVVGRE8wbEJRMnhGTEVkQlFVY3NRMEZCUXl4SFFVRkhMRU5CUVVNc2NVSkJRWEZDTEVWQlFVVXNhMEpCUVVzc1JVRkJSU3d5UWtGQll5eERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRPMGxCUXk5RUxFZEJRVWNzUTBGQlF5eFJRVUZOTEVOQlFVRXNRMEZCUXl4eFFrRkJjVUlzUlVGQlJTeHJRa0ZCU3l4RlFVRkZMREpDUVVGakxFTkJRVU1zVlVGQlZTeERRVUZETEVOQlFVTTdTVUZEY0VVc1IwRkJSeXhEUVVGRExFZEJRVWNzUTBGQlF5eHpRa0ZCYzBJc1JVRkJSU3hyUWtGQlN5eEZRVUZGTERKQ1FVRmpMRU5CUVVNc1YwRkJWeXhEUVVGRExFTkJRVU03U1VGRmJrVXNSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXhyUWtGQmEwSXNSVUZCUlN4MVFrRkJWU3hEUVVGRExFTkJRVU03U1VGRGVFTXNSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXh0UTBGQmJVTXNSVUZCUlN3NFFrRkJhVUlzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXp0SlFVVjZSU3hIUVVGSExFTkJRVU1zUjBGQlJ5eERRVUZETEdsQ1FVRnBRaXhGUVVGRkxIVkNRVUZWTEVOQlFVTXNRMEZCUXp0SlFVTjJReXhIUVVGSExFTkJRVU1zUjBGQlJ5eERRVUZETEd0Q1FVRnJRaXhGUVVGRkxEaENRVUZwUWl4RFFVRkRMRkZCUVZFc1EwRkJReXhEUVVGRE8wbEJRM2hFTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc2VVSkJRWGxDTEVWQlFVVXNhMEpCUVVzc1JVRkJSU3c0UWtGQmFVSXNRMEZCUXl4UlFVRk5MRU5CUVVFc1EwRkJReXhEUVVGRE8wbEJRM0pGTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc2VVSkJRWGxDTEVWQlFVVXNhMEpCUVVzc1JVRkJSU3c0UWtGQmFVSXNRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJRenRKUVVkeVJTeEhRVUZITEVOQlFVTXNSMEZCUnl4RFFVRkRMRWRCUVVjc1JVRkJSU3hWUVVGVkxFZEJRVmtzUlVGQlJTeEhRVUZoTzFGQlF6bERMRTlCUVU4c1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGRFlpeEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRk5CUVZNc1JVRkJSU3c0UWtGQk9FSXNRMEZCUXl4RlFVTjJSQ3hGUVVGRkxGTkJRVk1zUlVGQlJTeEhRVUZITEVOQlFVTXNVMEZCVXl4RlFVRkZMRVZCUVVVc1EwRkRha01zUTBGQlF6dEpRVU5PTEVOQlFVTXNRMEZCUXl4RFFVRkRPMEZCUTFBc1EwRkJRenRCUVhwRVJDd3JRa0Y1UkVNaWZRPT0iLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xudmFyIGV4cHJlc3MgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcbnZhciBwYXRoID0gcmVxdWlyZShcInBhdGhcIik7XG52YXIgbW9uZ29vc2UgPSByZXF1aXJlKFwibW9uZ29vc2VcIik7XG52YXIgY3NyZiA9IHJlcXVpcmUoXCJjc3VyZlwiKTtcbnZhciBjb29raWVQYXJzZXIgPSByZXF1aXJlKFwiY29va2llLXBhcnNlclwiKTtcbnZhciBzZXNzaW9uID0gcmVxdWlyZShcImV4cHJlc3Mtc2Vzc2lvblwiKTtcbnZhciBib2R5UGFyc2VyID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpO1xudmFyIGJjcnlwdCA9IHJlcXVpcmUoXCJiY3J5cHRqc1wiKTtcbnZhciBoZWxtZXQgPSByZXF1aXJlKFwiaGVsbWV0XCIpO1xudmFyIGNvbXByZXNzaW9uID0gcmVxdWlyZShcImNvbXByZXNzaW9uXCIpO1xudmFyIGpzb253ZWJ0b2tlbl8xID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTtcbnZhciBtdXN0YWNoZUV4cHJlc3MgPSByZXF1aXJlKCdtdXN0YWNoZS1leHByZXNzJyk7XG52YXIgTW9uZ29TdG9yZSA9IHJlcXVpcmUoJ2Nvbm5lY3QtbW9uZ28nKShzZXNzaW9uKTtcbnZhciByb3V0ZXNfMSA9IHJlcXVpcmUoXCIuL3JvdXRlc1wiKTtcbnZhciBpbmRleF8xID0gcmVxdWlyZShcIi4vc29ja2V0LmlvL2luZGV4XCIpO1xudmFyIFVzZXJfMSA9IHJlcXVpcmUoXCIuL21vZGVscy9Vc2VyXCIpO1xudmFyIGVudiA9IHJlcXVpcmUoJy4uLy4uL2VudicpO1xudmFyIGFwcCA9IGV4cHJlc3MoKTtcbmV4cG9ydHMuYXBwID0gYXBwO1xudmFyIHBvcnQgPSBlbnYucG9ydDtcbnZhciBzZXJ2ZXI7XG52YXIgc29ja2V0U2VydmVyO1xuZXhwb3J0cy5zb2NrZXRTZXJ2ZXIgPSBzb2NrZXRTZXJ2ZXI7XG5hcHAuZW5naW5lKCdodG1sJywgbXVzdGFjaGVFeHByZXNzKCkpO1xuYXBwLnNldCgndmlldyBlbmdpbmUnLCAnaHRtbCcpO1xuYXBwLnVzZShjb21wcmVzc2lvbigpKTtcbnZhciBzZXNzaW9uTWlkZGxld2FyZSA9IHNlc3Npb24oe1xuICAgIHNlY3JldDogZW52LnNlY3JldCxcbiAgICBjb29raWU6IHtcbiAgICAgICAgbWF4QWdlOiAyNCAqIDYwICogNjAgKiAxMDAwLFxuICAgICAgICBzYW1lU2l0ZTogdHJ1ZSxcbiAgICAgICAgc2VjdXJlOiBlbnYucHJvZHVjdGlvbixcbiAgICAgICAgaHR0cE9ubHk6IHRydWVcbiAgICB9LFxuICAgIHNhdmVVbmluaXRpYWxpemVkOiB0cnVlLFxuICAgIHJlc2F2ZTogZmFsc2UsXG4gICAgc3RvcmU6IG5ldyBNb25nb1N0b3JlKHtcbiAgICAgICAgbW9uZ29vc2VDb25uZWN0aW9uOiBtb25nb29zZS5jb25uZWN0aW9uXG4gICAgfSlcbn0pO1xudmFyIGNzcmZNaWRkbGV3YXJlID0gY3NyZih7XG4gICAgY29va2llOiB7XG4gICAgICAgIG1heEFnZTogMjQgKiA2MCAqIDYwICogMTAwMCxcbiAgICAgICAgc2FtZVNpdGU6IHRydWUsXG4gICAgICAgIHNlY3VyZTogZW52LnByb2R1Y3Rpb24sXG4gICAgICAgIGh0dHBPbmx5OiB0cnVlLFxuICAgICAgICBrZXk6ICdfY3NyZidcbiAgICB9XG59KTtcbm1vbmdvb3NlLmNvbm5lY3QoZW52LnVzZVRlc3REYiA/IGVudi5tb25nb2RiVGVzdENvbm5lY3Rpb25VcmkgOiBlbnYubW9uZ29kYkNvbm5lY3Rpb25VcmksIHsgdXNlTmV3VXJsUGFyc2VyOiB0cnVlIH0pO1xubW9uZ29vc2UuY29ubmVjdGlvbi5vbignZXJyb3InLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcignTW9uZ29vc2UgY29ubmVjdGlvbiBlcnJvcicsIGVycik7XG59KTtcbnByb2Nlc3Mub24oJ1NJR0lOVCcsIGZ1bmN0aW9uICgpIHtcbiAgICBtb25nb29zZS5jb25uZWN0aW9uLmNsb3NlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ01vbmdvb3NlIGRlZmF1bHQgY29ubmVjdGlvbiBkaXNjb25uZWN0ZWQgdGhyb3VnaCBhcHAgdGVybWluYXRpb24nKTtcbiAgICAgICAgc2VydmVyLmNsb3NlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbmFwcC51c2Uoc2Vzc2lvbk1pZGRsZXdhcmUpO1xuYXBwLnVzZShjb29raWVQYXJzZXIoZW52LnNlY3JldCkpO1xuaWYgKGVudi5kaXNhYmxlQ3NyZikge1xuICAgIGNvbnNvbGUubG9nKCdDU1JGIGRpc2FibGVkJyk7XG4gICAgYXBwLnVzZShmdW5jdGlvbiAocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgcmVxLmNzcmZUb2tlbiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcnOyB9O1xuICAgICAgICByZXR1cm4gbmV4dCgpO1xuICAgIH0pO1xufVxuZWxzZSB7XG4gICAgYXBwLnVzZShjc3JmTWlkZGxld2FyZSk7XG59XG52YXIgZGIgPSBtb25nb29zZS5jb25uZWN0aW9uO1xuYXBwLnVzZShmdW5jdGlvbiAocmVxLCByZXMsIG5leHQpIHtcbiAgICByZXEuZGIgPSBkYjtcbiAgICByZXR1cm4gbmV4dCgpO1xufSk7XG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IHRydWUgfSkpO1xuYXBwLnVzZShoZWxtZXQoKSk7XG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi9kaXN0L3B1YmxpYy8nKSkpO1xuYXBwLnVzZSgnL2FwaScsIGZ1bmN0aW9uIChyZXEsIHJlcywgbmV4dCkge1xuICAgIHJldHVybiBuZXh0KCk7XG59KTtcbmFwcC51c2UoZnVuY3Rpb24gKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgcmVxLmF1dGhlbnRpY2F0ZSA9IGZ1bmN0aW9uIChlbWFpbCwgcGFzc3dvcmQsIGRvbmUpIHtcbiAgICAgICAgVXNlcl8xW1wiZGVmYXVsdFwiXS5maW5kQnlFbWFpbChlbWFpbCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICAgICAgaWYgKHVzZXIgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZmFsc2UsIG51bGwpO1xuICAgICAgICAgICAgaWYgKCFiY3J5cHQuY29tcGFyZVN5bmMocGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpKVxuICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGZhbHNlLCBuZXcgRXJyb3IoJ0ludmFsaWQgcGFzc3dvcmQnKSk7XG4gICAgICAgICAgICB2YXIgdXNlckRldGFpbHMgPSB7XG4gICAgICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICAgICAgICAgIHJvbGU6IHVzZXIucm9sZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gZG9uZSh1c2VyRGV0YWlscywgbnVsbCk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgZG9uZShmYWxzZSwgZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXEubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXEuc2Vzc2lvbi50b2tlbiA9IG51bGw7XG4gICAgfTtcbiAgICByZXEuaXNzdWVOZXdUb2tlbiA9IGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgIHZhciB0b2tlbiA9IGpzb253ZWJ0b2tlbl8xLnNpZ24oe1xuICAgICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICAgICAgcm9sZTogdXNlci5yb2xlLFxuICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWxcbiAgICAgICAgfSwgZW52LnNlY3JldCwge1xuICAgICAgICAgICAgZXhwaXJlc0luOiA4NjQwMFxuICAgICAgICB9KTtcbiAgICAgICAgcmVzLnNldEhlYWRlcigneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbik7XG4gICAgICAgIHJlcS5zZXNzaW9uLnRva2VuID0gdG9rZW47XG4gICAgfTtcbiAgICBuZXh0KCk7XG59KTtcbnJvdXRlc18xW1wiZGVmYXVsdFwiXShhcHApO1xuc2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIoYXBwKTtcbnNlcnZlci5vbignZXJyb3InLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIHNlcnZlci5jbG9zZSgpO1xufSk7XG5pZiAoIWVudi5kaXNhYmxlQXV0b1N0YXJ0KSB7XG4gICAgZXhwb3J0cy5zb2NrZXRTZXJ2ZXIgPSBzb2NrZXRTZXJ2ZXIgPSBpbmRleF8xW1wiZGVmYXVsdFwiXShzZXJ2ZXIsIGRiKTtcbiAgICBtb25nb29zZS5jb25uZWN0aW9uLm9uKCdjb25uZWN0ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDb25uZWN0ZWQgdG8gTW9uZ29EQiB2aWEgTW9uZ29vc2UnKTtcbiAgICAgICAgc2VydmVyLmxpc3Rlbihwb3J0LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxpc3RlbmluZyBvbiBwb3J0IFwiICsgcG9ydCArIFwiIVwiKTtcbiAgICAgICAgICAgIGFwcC5lbWl0KCdzZXJ2ZXIgc3RhcnRlZCcpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gc2VydmVyO1xuZXhwb3J0cy5jb25uID0gbW9uZ29vc2UuY29ubmVjdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWMyVnlkbVZ5TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dkxpNHZjM0pqTDNObGNuWmxjaTl6WlhKMlpYSXVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanM3UVVGRlFTd3lRa0ZCTmtJN1FVRkROMElzYVVOQlFXMURPMEZCUTI1RExESkNRVUUyUWp0QlFVVTNRaXh0UTBGQmNVTTdRVUZEY2tNc05FSkJRVGhDTzBGQlF6bENMRFJEUVVFNFF6dEJRVU01UXl4NVEwRkJNa003UVVGRE0wTXNkME5CUVRCRE8wRkJRekZETEdsRFFVRnRRenRCUVVOdVF5d3JRa0ZCYVVNN1FVRkZha01zZVVOQlFUSkRPMEZCUXpORExEWkRRVUZ2UXp0QlFVTndReXhKUVVGTkxHVkJRV1VzUjBGQlJ5eFBRVUZQTEVOQlFVTXNhMEpCUVd0Q0xFTkJRVU1zUTBGQlF6dEJRVU53UkN4SlFVRk5MRlZCUVZVc1IwRkJSeXhQUVVGUExFTkJRVU1zWlVGQlpTeERRVUZETEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1FVRkZja1FzYlVOQlFUaENPMEZCUXpsQ0xESkRRVUV3UXp0QlFVVXhReXh6UTBGQk5FTTdRVUZETlVNc1NVRkJUU3hIUVVGSExFZEJRVWNzVDBGQlR5eERRVUZETEZkQlFWY3NRMEZCUXl4RFFVRkRPMEZCUldwRExFbEJRVTBzUjBGQlJ5eEhRVUZSTEU5QlFVOHNSVUZCUlN4RFFVRkRPMEZCYzBsc1FpeHJRa0ZCUnp0QlFYSkpXaXhKUVVGTkxFbEJRVWtzUjBGQmIwSXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJRenRCUVVOMlF5eEpRVUZKTEUxQlFXMUNMRU5CUVVNN1FVRkRlRUlzU1VGQlNTeFpRVUUyUWl4RFFVRkRPMEZCYlVsd1FpeHZRMEZCV1R0QlFXcEpNVUlzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4TlFVRk5MRVZCUVVVc1pVRkJaU3hGUVVGRkxFTkJRVU1zUTBGQlF6dEJRVU4wUXl4SFFVRkhMRU5CUVVNc1IwRkJSeXhEUVVGRExHRkJRV0VzUlVGQlJTeE5RVUZOTEVOQlFVTXNRMEZCUXp0QlFVVXZRaXhIUVVGSExFTkJRVU1zUjBGQlJ5eERRVUZETEZkQlFWY3NSVUZCUlN4RFFVRkRMRU5CUVVNN1FVRkZka0lzU1VGQlRTeHBRa0ZCYVVJc1IwRkJSeXhQUVVGUExFTkJRVU03U1VGRE9VSXNUVUZCVFN4RlFVRkZMRWRCUVVjc1EwRkJReXhOUVVGTk8wbEJRMnhDTEUxQlFVMHNSVUZCUlR0UlFVTktMRTFCUVUwc1JVRkJSU3hGUVVGRkxFZEJRVWNzUlVGQlJTeEhRVUZITEVWQlFVVXNSMEZCUnl4SlFVRkpPMUZCUXpOQ0xGRkJRVkVzUlVGQlJTeEpRVUZKTzFGQlEyUXNUVUZCVFN4RlFVRkZMRWRCUVVjc1EwRkJReXhWUVVGVk8xRkJRM1JDTEZGQlFWRXNSVUZCUlN4SlFVRkpPMHRCUTJwQ08wbEJRMFFzYVVKQlFXbENMRVZCUVVVc1NVRkJTVHRKUVVOMlFpeE5RVUZOTEVWQlFVVXNTMEZCU3p0SlFVTmlMRXRCUVVzc1JVRkJSU3hKUVVGSkxGVkJRVlVzUTBGQlF6dFJRVU5zUWl4clFrRkJhMElzUlVGQlJTeFJRVUZSTEVOQlFVTXNWVUZCVlR0TFFVTXhReXhEUVVGRE8wTkJRMHdzUTBGQlF5eERRVUZETzBGQlJVZ3NTVUZCVFN4alFVRmpMRWRCUVVjc1NVRkJTU3hEUVVGRE8wbEJRM2hDTEUxQlFVMHNSVUZCUlR0UlFVTktMRTFCUVUwc1JVRkJSU3hGUVVGRkxFZEJRVWNzUlVGQlJTeEhRVUZITEVWQlFVVXNSMEZCUnl4SlFVRkpPMUZCUXpOQ0xGRkJRVkVzUlVGQlJTeEpRVUZKTzFGQlEyUXNUVUZCVFN4RlFVRkZMRWRCUVVjc1EwRkJReXhWUVVGVk8xRkJRM1JDTEZGQlFWRXNSVUZCUlN4SlFVRkpPMUZCUTJRc1IwRkJSeXhGUVVGRkxFOUJRVTg3UzBGRFpqdERRVU5LTEVOQlFVTXNRMEZCUVR0QlFVVkdMRkZCUVZFc1EwRkJReXhQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1IwRkJSeXhEUVVGRExIZENRVUYzUWl4RFFVRkRMRU5CUVVNc1EwRkJReXhIUVVGSExFTkJRVU1zYjBKQlFXOUNMRVZCUVVVc1JVRkJSU3hsUVVGbExFVkJRVVVzU1VGQlNTeEZRVUZGTEVOQlFVTXNRMEZCUXp0QlFVTnlTQ3hSUVVGUkxFTkJRVU1zVlVGQlZTeERRVUZETEVWQlFVVXNRMEZCUXl4UFFVRlBMRVZCUVVVc1ZVRkJVeXhIUVVGSE8wbEJRM2hETEU5QlFVOHNRMEZCUXl4TFFVRkxMRU5CUVVNc01rSkJRVEpDTEVWQlFVVXNSMEZCUnl4RFFVRkRMRU5CUVVNN1FVRkRjRVFzUTBGQlF5eERRVUZETEVOQlFVTTdRVUZGU0N4UFFVRlBMRU5CUVVNc1JVRkJSU3hEUVVGRExGRkJRVkVzUlVGQlJUdEpRVU5xUWl4UlFVRlJMRU5CUVVNc1ZVRkJWU3hEUVVGRExFdEJRVXNzUTBGQlF6dFJRVU4wUWl4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExHdEZRVUZyUlN4RFFVRkRMRU5CUVVNN1VVRkRhRVlzVFVGQlRTeERRVUZETEV0QlFVc3NRMEZCUXp0WlFVTlVMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEY0VJc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFVDeERRVUZETEVOQlFVTXNRMEZCUXp0QlFVTlFMRU5CUVVNc1EwRkJReXhEUVVGRE8wRkJSVWdzUjBGQlJ5eERRVUZETEVkQlFVY3NRMEZCUXl4cFFrRkJhVUlzUTBGQlF5eERRVUZETzBGQlF6TkNMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zV1VGQldTeERRVUZETEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJReXhEUVVGRE8wRkJSV3hETEVsQlFVY3NSMEZCUnl4RFFVRkRMRmRCUVZjc1JVRkJSVHRKUVVOb1FpeFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMR1ZCUVdVc1EwRkJReXhEUVVGRE8wbEJRemRDTEVkQlFVY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1ZVRkJReXhIUVVGSExFVkJRVVVzUjBGQlJ5eEZRVUZGTEVsQlFVazdVVUZEYmtJc1IwRkJSeXhEUVVGRExGTkJRVk1zUjBGQlJ5eGpRVUZqTEU5QlFVOHNSVUZCUlN4RFFVRkJMRU5CUVVNc1EwRkJReXhEUVVGQk8xRkJRM3BETEU5QlFVOHNTVUZCU1N4RlFVRkZMRU5CUVVNN1NVRkRiRUlzUTBGQlF5eERRVUZETEVOQlFVTTdRMEZEVGp0TFFVRk5PMGxCUTBnc1IwRkJSeXhEUVVGRExFZEJRVWNzUTBGQlF5eGpRVUZqTEVOQlFVTXNRMEZCUXp0RFFVTXpRanRCUVVWRUxFbEJRVWtzUlVGQlJTeEhRVUYzUWl4UlFVRlJMRU5CUVVNc1ZVRkJWU3hEUVVGRE8wRkJRMnhFTEVkQlFVY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1ZVRkJReXhIUVVGWkxFVkJRVVVzUjBGQllTeEZRVUZGTEVsQlFXTTdTVUZEYUVRc1IwRkJSeXhEUVVGRExFVkJRVVVzUjBGQlJ5eEZRVUZGTEVOQlFVTTdTVUZEV2l4UFFVRlBMRWxCUVVrc1JVRkJSU3hEUVVGRE8wRkJRMnhDTEVOQlFVTXNRMEZCUXl4RFFVRkJPMEZCUTBZc1IwRkJSeXhEUVVGRExFZEJRVWNzUTBGQlF5eFZRVUZWTEVOQlFVTXNTVUZCU1N4RlFVRkZMRU5CUVVNc1EwRkJRenRCUVVNelFpeEhRVUZITEVOQlFVTXNSMEZCUnl4RFFVRkRMRlZCUVZVc1EwRkJReXhWUVVGVkxFTkJRVU1zUlVGQlJTeFJRVUZSTEVWQlFVVXNTVUZCU1N4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRE8wRkJTVzVFTEVkQlFVY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1RVRkJUU3hGUVVGRkxFTkJRVU1zUTBGQlF6dEJRVVZzUWl4SFFVRkhMRU5CUVVNc1IwRkJSeXhEUVVGRExFOUJRVThzUTBGQlF5eE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhUUVVGVExFVkJRVVVzYjBKQlFXOUNMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03UVVGRmRrVXNSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXhOUVVGTkxFVkJRVVVzVlVGQlZTeEhRVUZaTEVWQlFVVXNSMEZCWVN4RlFVRkZMRWxCUVdNN1NVRkZha1VzVDBGQlR5eEpRVUZKTEVWQlFVVXNRMEZCUXp0QlFVTnNRaXhEUVVGRExFTkJRVU1zUTBGQlF6dEJRVU5JTEVkQlFVY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1ZVRkJReXhIUVVGWkxFVkJRVVVzUjBGQllTeEZRVUZGTEVsQlFXTTdTVUZEYUVRc1IwRkJSeXhEUVVGRExGbEJRVmtzUjBGQlJ5eFZRVUZETEV0QlFXRXNSVUZEWWl4UlFVRm5RaXhGUVVOb1FpeEpRVUV3UkR0UlFVTXhSU3hwUWtGQlNTeERRVUZETEZkQlFWY3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlF5eEpRVUZYTzFsQlEzSkRMRWxCUVVrc1NVRkJTU3hMUVVGTExFbEJRVWs3WjBKQlFVVXNUMEZCVHl4SlFVRkpMRU5CUVVNc1MwRkJTeXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzFsQlF6VkRMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU1zVjBGQlZ5eERRVUZETEZGQlFWRXNSVUZCUlN4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRE8yZENRVUZGTEU5QlFVOHNTVUZCU1N4RFFVRkRMRXRCUVVzc1JVRkJSU3hKUVVGSkxFdEJRVXNzUTBGQlF5eHJRa0ZCYTBJc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRGNFY3NTVUZCU1N4WFFVRlhMRWRCUVZFN1owSkJRMjVDTEV0QlFVc3NSVUZCUlN4SlFVRkpMRU5CUVVNc1MwRkJTenRuUWtGRGFrSXNTVUZCU1N4RlFVRkZMRWxCUVVrc1EwRkJReXhKUVVGSk8yZENRVU5tTEVsQlFVa3NSVUZCUlN4SlFVRkpMRU5CUVVNc1NVRkJTVHRoUVVOc1FpeERRVUZCTzFsQlEwUXNUMEZCVHl4SlFVRkpMRU5CUVVNc1YwRkJWeXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzFGQlEyNURMRU5CUVVNc1EwRkJReXhEUVVGRExFOUJRVXNzUTBGQlFTeERRVUZETEZWQlFVTXNSMEZCVlR0WlFVTm9RaXhKUVVGSkxFTkJRVU1zUzBGQlN5eEZRVUZGTEVkQlFVY3NRMEZCUXl4RFFVRkRPMUZCUTNKQ0xFTkJRVU1zUTBGQlF5eERRVUZETzBsQlExQXNRMEZCUXl4RFFVRkJPMGxCUTBRc1IwRkJSeXhEUVVGRExFMUJRVTBzUjBGQlJ6dFJRVU5VTEVkQlFVY3NRMEZCUXl4UFFVRlBMRU5CUVVNc1MwRkJTeXhIUVVGSExFbEJRVWtzUTBGQlF6dEpRVU0zUWl4RFFVRkRMRU5CUVVFN1NVRkRSQ3hIUVVGSExFTkJRVU1zWVVGQllTeEhRVUZITEZWQlFVTXNTVUZCVnp0UlFVTTFRaXhKUVVGSkxFdEJRVXNzUjBGQlZ5eHRRa0ZCU1N4RFFVRkRPMWxCUTNKQ0xFbEJRVWtzUlVGQlJTeEpRVUZKTEVOQlFVTXNTVUZCU1R0WlFVTm1MRWxCUVVrc1JVRkJSU3hKUVVGSkxFTkJRVU1zU1VGQlNUdFpRVU5tTEV0QlFVc3NSVUZCUlN4SlFVRkpMRU5CUVVNc1MwRkJTenRUUVVOd1FpeEZRVUZGTEVkQlFVY3NRMEZCUXl4TlFVRk5MRVZCUVVVN1dVRkRXQ3hUUVVGVExFVkJRVVVzUzBGQlN6dFRRVU51UWl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hIUVVGSExFTkJRVU1zVTBGQlV5eERRVUZETEdkQ1FVRm5RaXhGUVVGRkxFdEJRVXNzUTBGQlF5eERRVUZETzFGQlEzWkRMRWRCUVVjc1EwRkJReXhQUVVGUExFTkJRVU1zUzBGQlN5eEhRVUZITEV0QlFVc3NRMEZCUXp0SlFVTTVRaXhEUVVGRExFTkJRVUU3U1VGRFJDeEpRVUZKTEVWQlFVVXNRMEZCUXp0QlFVTllMRU5CUVVNc1EwRkJReXhEUVVGRE8wRkJSVWdzYlVKQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRCUVVOYUxFMUJRVTBzUjBGQlJ5eEpRVUZKTEVOQlFVTXNXVUZCV1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8wRkJRMmhETEUxQlFVMHNRMEZCUXl4RlFVRkZMRU5CUVVNc1QwRkJUeXhGUVVGRkxGVkJRVU1zUjBGQlZUdEpRVU14UWl4UFFVRlBMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzBsQlEyNUNMRTFCUVUwc1EwRkJReXhMUVVGTExFVkJRVVVzUTBGQlF6dEJRVU51UWl4RFFVRkRMRU5CUVVNc1EwRkJRVHRCUVVWR0xFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNaMEpCUVdkQ0xFVkJRVVU3U1VGRGRrSXNkVUpCUVVFc1dVRkJXU3hIUVVGSExHdENRVUZUTEVOQlFVTXNUVUZCVFN4RlFVRkZMRVZCUVVVc1EwRkJReXhEUVVGRE8wbEJRM0pETEZGQlFWRXNRMEZCUXl4VlFVRlZMRU5CUVVNc1JVRkJSU3hEUVVGRExGZEJRVmNzUlVGQlJUdFJRVU5vUXl4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExHMURRVUZ0UXl4RFFVRkRMRU5CUVVNN1VVRkRha1FzVFVGQlRTeERRVUZETEUxQlFVMHNRMEZCUXl4SlFVRkpMRVZCUVVVN1dVRkRhRUlzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4MVFrRkJjVUlzU1VGQlNTeE5RVUZITEVOQlFVTXNRMEZCUXp0WlFVTXhReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEdkQ1FVRm5RaXhEUVVGRExFTkJRVU03VVVGREwwSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dERRVU5PTzBGQlJVUXNjVUpCUVdVc1RVRkJUU3hEUVVGRE8wRkJRMVFzVVVGQlFTeEpRVUZKTEVkQlFVY3NVVUZCVVN4RFFVRkRMRlZCUVZVc1EwRkJReUo5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIHNvY2tldGlvID0gcmVxdWlyZShcInNvY2tldC5pb1wiKTtcbnZhciBzb2NrZXRpb19qd3RfMSA9IHJlcXVpcmUoXCJzb2NrZXRpby1qd3RcIik7XG52YXIgTWVzc2FnZV8xID0gcmVxdWlyZShcIi4uL21vZGVscy9NZXNzYWdlXCIpO1xudmFyIGVudiA9IHJlcXVpcmUoJy4uLy4uLy4uL2VudicpO1xudmFyIGluaXQgPSBmdW5jdGlvbiAoc2VydmVyLCBkYikge1xuICAgIHZhciBpbyA9IHNvY2tldGlvKHNlcnZlcik7XG4gICAgdmFyIGNvbm5lY3RlZFVzZXJFbWFpbHMgPSBbXTtcbiAgICBpby5vbignY29ubmVjdGlvbicsIHNvY2tldGlvX2p3dF8xLmF1dGhvcml6ZSh7XG4gICAgICAgIHNlY3JldDogZW52LnNlY3JldCxcbiAgICAgICAgdGltZW91dDogMTUwMDAsXG4gICAgICAgIGRlY29kZWRQcm9wZXJ0eU5hbWU6ICdqd3QnXG4gICAgfSkpLm9uKCdhdXRoZW50aWNhdGVkJywgZnVuY3Rpb24gKHNvY2tldCkge1xuICAgICAgICBjb25uZWN0ZWRVc2VyRW1haWxzLnB1c2goc29ja2V0Lmp3dC5lbWFpbCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDb25uZWN0ZWQgdXNlcnMnLCBjb25uZWN0ZWRVc2VyRW1haWxzKTtcbiAgICAgICAgaW8uZW1pdCgnY29ubmVjdGVkIHVzZXJzJywgY29ubmVjdGVkVXNlckVtYWlscy5maWx0ZXIoZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgc2VsZikge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGYuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4O1xuICAgICAgICB9KSk7XG4gICAgICAgIHNvY2tldC5vbignZGlzY29ubmVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbm5lY3RlZFVzZXJFbWFpbHMuc3BsaWNlKGNvbm5lY3RlZFVzZXJFbWFpbHMuaW5kZXhPZihzb2NrZXQuand0LmVtYWlsKSwgMSk7XG4gICAgICAgICAgICBpby5lbWl0KCdjb25uZWN0ZWQgdXNlcnMnLCBjb25uZWN0ZWRVc2VyRW1haWxzLmZpbHRlcihmdW5jdGlvbiAodmFsdWUsIGluZGV4LCBzZWxmKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4O1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgc29ja2V0Lm9uKCdtZXNzYWdlJywgZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICAgICAgdmFyIG0gPSBuZXcgTWVzc2FnZV8xW1wiZGVmYXVsdFwiXSh7XG4gICAgICAgICAgICAgICAgY2hhbm5lbDogbWVzc2FnZS5jaGFubmVsLFxuICAgICAgICAgICAgICAgIHRleHQ6IG1lc3NhZ2UudGV4dCxcbiAgICAgICAgICAgICAgICB1c2VyRW1haWw6IHNvY2tldC5qd3QuZW1haWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbS5zYXZlKCkudGhlbihmdW5jdGlvbiAobSkge1xuICAgICAgICAgICAgICAgIGlvLmVtaXQoJ21lc3NhZ2UnLCB7XG4gICAgICAgICAgICAgICAgICAgIF9pZDogbS5faWQsXG4gICAgICAgICAgICAgICAgICAgIHVzZXJFbWFpbDogbS51c2VyRW1haWwsXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IG0udGV4dCxcbiAgICAgICAgICAgICAgICAgICAgY2hhbm5lbDogbS5jaGFubmVsLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkOiBtLmNyZWF0ZWRBdFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KCdtZXNzYWdlIHJlY2VpdmVkJyk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoJ21lc3NhZ2UgcmVjZWl2ZSBlcnJvcicsIGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGlvO1xufTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gaW5pdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFXNWtaWGd1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk4dUxpOHVMaTl6Y21NdmMyVnlkbVZ5TDNOdlkydGxkQzVwYnk5cGJtUmxlQzUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3p0QlFVRkJMRzlEUVVGelF6dEJRVWQwUXl3MlEwRkJkVVE3UVVGRGRrUXNOa05CUVhORU8wRkJSWFJFTEVsQlFVMHNSMEZCUnl4SFFVRkhMRTlCUVU4c1EwRkJReXhqUVVGakxFTkJRVU1zUTBGQlF6dEJRVTF3UXl4SlFVRk5MRWxCUVVrc1IwRkJSeXhWUVVGRExFMUJRV01zUlVGQlJTeEZRVUZqTzBsQlEzaERMRWxCUVUwc1JVRkJSU3hIUVVGdlFpeFJRVUZSTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNN1NVRkROME1zU1VGQlNTeHRRa0ZCYlVJc1IwRkJZU3hGUVVGRkxFTkJRVU03U1VGSGRrTXNSVUZCUlN4RFFVRkRMRVZCUVVVc1EwRkJReXhaUVVGWkxFVkJRVVVzZDBKQlFWa3NRMEZCUXp0UlFVTjZRaXhOUVVGTkxFVkJRVVVzUjBGQlJ5eERRVUZETEUxQlFVMDdVVUZEYkVJc1QwRkJUeXhGUVVGRkxFdEJRVXM3VVVGRFpDeHRRa0ZCYlVJc1JVRkJSU3hMUVVGTE8wdEJRemRDTEVOQlFVTXNRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhsUVVGbExFVkJRVVVzVlVGQlF5eE5RVUZqTzFGQlJXNURMRzFDUVVGdFFpeERRVUZETEVsQlFVa3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETzFGQlF6TkRMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zYVVKQlFXbENMRVZCUVVVc2JVSkJRVzFDTEVOQlFVTXNRMEZCUXp0UlFVTndSQ3hGUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETEdsQ1FVRnBRaXhGUVVGRkxHMUNRVUZ0UWl4RFFVRkRMRTFCUVUwc1EwRkJReXhWUVVGRExFdEJRVXNzUlVGQlJTeExRVUZMTEVWQlFVVXNTVUZCU1R0WlFVTnlSU3hQUVVGUExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1MwRkJTeXhEUVVGRE8xRkJRM3BETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkZTaXhOUVVGTkxFTkJRVU1zUlVGQlJTeERRVUZETEZsQlFWa3NSVUZCUlR0WlFVTndRaXh0UWtGQmJVSXNRMEZCUXl4TlFVRk5MRU5CUVVNc2JVSkJRVzFDTEVOQlFVTXNUMEZCVHl4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUzBGQlN5eERRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkROMFVzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4cFFrRkJhVUlzUlVGQlJTeHRRa0ZCYlVJc1EwRkJReXhOUVVGTkxFTkJRVU1zVlVGQlF5eExRVUZMTEVWQlFVVXNTMEZCU3l4RlFVRkZMRWxCUVVrN1owSkJRM0pGTEU5QlFVOHNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eExRVUZMTEVOQlFVTTdXVUZEZWtNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5TTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUlVnc1RVRkJUU3hEUVVGRExFVkJRVVVzUTBGQlF5eFRRVUZUTEVWQlFVVXNWVUZCUXl4UFFVRXdRenRaUVVNMVJDeFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRE8xbEJRM0pDTEVsQlFVa3NRMEZCUXl4SFFVRmhMRWxCUVVrc2IwSkJRVThzUTBGQlF6dG5Ra0ZETVVJc1QwRkJUeXhGUVVGRkxFOUJRVThzUTBGQlF5eFBRVUZQTzJkQ1FVTjRRaXhKUVVGSkxFVkJRVVVzVDBGQlR5eERRVUZETEVsQlFVazdaMEpCUTJ4Q0xGTkJRVk1zUlVGQlJTeE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRXRCUVVzN1lVRkRPVUlzUTBGQlF5eERRVUZETzFsQlEwZ3NRMEZCUXl4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZETEVOQlFWYzdaMEpCUTNSQ0xFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNVMEZCVXl4RlFVRkZPMjlDUVVObUxFZEJRVWNzUlVGQlJTeERRVUZETEVOQlFVTXNSMEZCUnp0dlFrRkRWaXhUUVVGVExFVkJRVVVzUTBGQlF5eERRVUZETEZOQlFWTTdiMEpCUTNSQ0xFbEJRVWtzUlVGQlJTeERRVUZETEVOQlFVTXNTVUZCU1R0dlFrRkRXaXhQUVVGUExFVkJRVVVzUTBGQlF5eERRVUZETEU5QlFVODdiMEpCUTJ4Q0xFOUJRVThzUlVGQlJTeERRVUZETEVOQlFVTXNVMEZCVXp0cFFrRkRka0lzUTBGQlF5eERRVUZETzJkQ1FVTklMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zYTBKQlFXdENMRU5CUVVNc1EwRkJRenRaUVVOd1F5eERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRkxMRU5CUVVFc1EwRkJReXhWUVVGRExFZEJRVlU3WjBKQlEyaENMRTlCUVU4c1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTTdaMEpCUTI1Q0xFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNkVUpCUVhWQ0xFVkJRVVVzUjBGQlJ5eERRVUZETEVOQlFVTTdXVUZET1VNc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFVDeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTlFMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMUFzVDBGQlR5eEZRVUZGTEVOQlFVTTdRVUZEWkN4RFFVRkRMRU5CUVVFN1FVRkZSQ3h4UWtGQlpTeEpRVUZKTEVOQlFVTWlmUT09IiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xudmFyIF90aGlzID0gdGhpcztcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgYXhpb3NfMSA9IHJlcXVpcmUoXCJheGlvc1wiKTtcbnZhciBub3RpZmljYXRpb25zQWN0aW9uc18xID0gcmVxdWlyZShcIi4vbm90aWZpY2F0aW9uc0FjdGlvbnNcIik7XG5leHBvcnRzLkFERF9DSEFOTkVMUyA9ICdBRERfQ0hBTk5FTFMnO1xuZXhwb3J0cy5TRVRfQ0hBTk5FTF9GRVRDSElOR19ORVdfTUVTU0FHRVMgPSAnU0VUX0NIQU5ORUxfRkVUQ0hJTkdfTkVXX01FU1NBR0VTJztcbmV4cG9ydHMuU0VUX0NIQU5ORUxfSEFTX01PUkVfTUVTU0FHRVMgPSAnU0VUX0NIQU5ORUxfSEFTX01PUkVfTUVTU0FHRSc7XG5leHBvcnRzLkFERF9SRUNFSVZFRF9DSEFOTkVMX01FU1NBR0UgPSAnQUREX1JFQ0VJVkVEX0NIQU5ORUxfTUVTU0FHRSc7XG5leHBvcnRzLkFERF9SRVRSSUVWRURfQ0hBTk5FTF9NRVNTQUdFUyA9ICdBRERfUkVUUklFVkVEX0NIQU5ORUxfTUVTU0FHRVMnO1xuZXhwb3J0cy5JTkNSRU1FTlRfQ0hBTk5FTF9SRVRSSUVWRV9NRVNTQUdFU19PRkZTRVQgPSAnSU5DUkVNRU5UX0NIQU5ORUxfUkVUUklFVkVfTUVTU0FHRVNfT0ZGU0VUJztcbmV4cG9ydHMuUkVUUklFVkVfQ0hBTk5FTF9NRVNTQUdFUyA9ICdSRVRSSUVWRV9DSEFOTkVMX01FU1NBR0VTJztcbmV4cG9ydHMuQ0xFQVJfQ0hBTk5FTFNfREFUQSA9ICdDTEVBUl9DSEFOTkVMU19EQVRBJztcbmV4cG9ydHMuYWRkQ2hhbm5lbHMgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWVzKSB7XG4gICAgdmFyIGNoYW5uZWxzID0gW107XG4gICAgY2hhbm5lbE5hbWVzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgY2hhbm5lbHMucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgbWVzc2FnZXM6IFtdLFxuICAgICAgICAgICAgcmV0cmlldmVNZXNzYWdlc09mZnNldDogMCxcbiAgICAgICAgICAgIGhhc01vcmVNZXNzYWdlczogdHJ1ZSxcbiAgICAgICAgICAgIGZldGNoaW5nTmV3TWVzc2FnZXM6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV4cG9ydHMuQUREX0NIQU5ORUxTLFxuICAgICAgICBkYXRhOiB7IGNoYW5uZWxzOiBjaGFubmVscyB9XG4gICAgfTtcbn07XG5leHBvcnRzLmluY3JlbWVudENoYW5uZWxSZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0ID0gZnVuY3Rpb24gKGNoYW5uZWwsIG4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBleHBvcnRzLklOQ1JFTUVOVF9DSEFOTkVMX1JFVFJJRVZFX01FU1NBR0VTX09GRlNFVCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgY2hhbm5lbDogY2hhbm5lbCxcbiAgICAgICAgICAgIGluY3JlbWVudDogblxuICAgICAgICB9XG4gICAgfTtcbn07XG5leHBvcnRzLnNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzID0gZnVuY3Rpb24gKGNoYW5uZWwsIGlzRmV0Y2hpbmcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBleHBvcnRzLlNFVF9DSEFOTkVMX0ZFVENISU5HX05FV19NRVNTQUdFUyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgY2hhbm5lbE5hbWU6IGNoYW5uZWwsXG4gICAgICAgICAgICBpc0ZldGNoaW5nOiBpc0ZldGNoaW5nXG4gICAgICAgIH1cbiAgICB9O1xufTtcbmV4cG9ydHMuc2V0Q2hhbm5lbEhhc01vcmVNZXNzYWdlcyA9IGZ1bmN0aW9uIChjaGFubmVsTmFtZSwgaGFzTW9yZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV4cG9ydHMuU0VUX0NIQU5ORUxfSEFTX01PUkVfTUVTU0FHRVMsXG4gICAgICAgIGRhdGE6IHsgY2hhbm5lbE5hbWU6IGNoYW5uZWxOYW1lLCBoYXNNb3JlOiBoYXNNb3JlIH1cbiAgICB9O1xufTtcbmV4cG9ydHMuYWRkUmVjZWl2ZWRDaGFubmVsTWVzc2FnZSA9IGZ1bmN0aW9uIChjaGFubmVsTmFtZSwgbWVzc2FnZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV4cG9ydHMuQUREX1JFQ0VJVkVEX0NIQU5ORUxfTUVTU0FHRSxcbiAgICAgICAgZGF0YTogeyBtZXNzYWdlOiBtZXNzYWdlLCBjaGFubmVsTmFtZTogY2hhbm5lbE5hbWUgfVxuICAgIH07XG59O1xuZXhwb3J0cy5hZGRSZXRyaWV2ZWRDaGFubmVsTWVzc2FnZXMgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWUsIG1lc3NhZ2VzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXhwb3J0cy5BRERfUkVUUklFVkVEX0NIQU5ORUxfTUVTU0FHRVMsXG4gICAgICAgIGRhdGE6IHsgY2hhbm5lbE5hbWU6IGNoYW5uZWxOYW1lLCBtZXNzYWdlczogbWVzc2FnZXMgfVxuICAgIH07XG59O1xuZXhwb3J0cy5jbGVhckNoYW5uZWxzRGF0YSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBleHBvcnRzLkNMRUFSX0NIQU5ORUxTX0RBVEFcbiAgICB9O1xufTtcbmV4cG9ydHMuZmV0Y2hDaGFubmVscyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRpc3BhdGNoKSB7XG4gICAgICAgIHJldHVybiBheGlvc18xW1wiZGVmYXVsdFwiXS5nZXQoJy9hcGkvdjEvY2hhbm5lbHMnKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIHZhciBjaGFubmVscyA9IHJlcy5kYXRhLmNoYW5uZWxzLm1hcChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIHJldHVybiBjLm5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBkaXNwYXRjaChleHBvcnRzLmFkZENoYW5uZWxzKGNoYW5uZWxzKSk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBmZXRjaCB0aGUgY2hhbm5lbHMnKSk7XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuZXhwb3J0cy5yZXRyaWV2ZUNoYW5uZWxNZXNzYWdlcyA9IGZ1bmN0aW9uIChjaGFubmVsTmFtZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZGlzcGF0Y2gsIGdldFN0YXRlKSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjaGFubmVsO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICBjaGFubmVsID0gZ2V0U3RhdGUoKS5jaGFubmVscy5maW5kKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGMubmFtZSA9PT0gY2hhbm5lbE5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghY2hhbm5lbCB8fCBjaGFubmVsLmZldGNoaW5nTmV3TWVzc2FnZXMgfHwgIWNoYW5uZWwuaGFzTW9yZU1lc3NhZ2VzKSB7XG4gICAgICAgICAgICAgICAgZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIGZldGNoIG1lc3NhZ2VzJykpO1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiwgUHJvbWlzZS5yZXNvbHZlKCdSZXRyaWV2ZSBDaGFubmVsIE1lc3NhZ2VzIGRpc3BhdGNoZWQgd2l0aCBpbmNvcnJlY3QgY2hhbm5lbCBuYW1lIG9yIHdoaWxlIGFscmVhZHkgZmV0Y2hpbmcgbWVzc2FnZXMnKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkaXNwYXRjaChleHBvcnRzLnNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzKGNoYW5uZWwubmFtZSwgdHJ1ZSkpO1xuICAgICAgICAgICAgcmV0dXJuIFsyLCBheGlvc18xW1wiZGVmYXVsdFwiXS5nZXQoJy9hcGkvdjEvbWVzc2FnZXMvJyArIGNoYW5uZWwubmFtZSArICcvJyArIGNoYW5uZWwucmV0cmlldmVNZXNzYWdlc09mZnNldCkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5tZXNzYWdlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKGV4cG9ydHMuc2V0Q2hhbm5lbEhhc01vcmVNZXNzYWdlcyhjaGFubmVsLm5hbWUsIGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKGV4cG9ydHMuaW5jcmVtZW50Q2hhbm5lbFJldHJpZXZlTWVzc2FnZXNPZmZzZXQoY2hhbm5lbE5hbWUsIHJlcy5kYXRhLm1lc3NhZ2VzLmxlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChleHBvcnRzLmFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcyhjaGFubmVsLm5hbWUsIHJlcy5kYXRhLm1lc3NhZ2VzKSk7XG4gICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBmZXRjaCBtZXNzYWdlcycpKTtcbiAgICAgICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRpc3BhdGNoKGV4cG9ydHMuc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMoY2hhbm5lbC5uYW1lLCBmYWxzZSkpO1xuICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgfSk7XG4gICAgfSk7IH07XG59O1xuZXhwb3J0cy5kZWxldGVDaGFubmVsID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkaXNwYXRjaCkge1xuICAgICAgICByZXR1cm4gYXhpb3NfMVtcImRlZmF1bHRcIl0uZ2V0KCcvYXBpL3YxL2NoYW5uZWwvZGVsZXRlLycgKyBjaGFubmVsTmFtZSkuXG4gICAgICAgICAgICB0aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkSW5mbygnQ2hhbm5lbCBkZWxldGVkJykpO1xuICAgICAgICAgICAgcmV0dXJuIGRpc3BhdGNoKGV4cG9ydHMuZmV0Y2hDaGFubmVscygpKTtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcihlcnIucmVzcG9uc2UuZGF0YS5lcnJvcikpO1xuICAgICAgICB9KTtcbiAgICB9O1xufTtcbmV4cG9ydHMuYWRkQ2hhbm5lbCA9IGZ1bmN0aW9uIChjaGFubmVsTmFtZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZGlzcGF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIGF4aW9zXzFbXCJkZWZhdWx0XCJdLnBvc3QoJy9hcGkvdjEvY2hhbm5lbC9jcmVhdGUnLCB7XG4gICAgICAgICAgICBjaGFubmVsTmFtZTogY2hhbm5lbE5hbWVcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEluZm8oJ0NoYW5uZWwgY3JlYXRlZCcpKTtcbiAgICAgICAgICAgIHJldHVybiBkaXNwYXRjaChleHBvcnRzLmZldGNoQ2hhbm5lbHMoKSk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lZMmhoYm01bGJITkJZM1JwYjI1ekxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZMaTR2TGk0dmMzSmpMM2RsWWk5aFkzUnBiMjV6TDJOb1lXNXVaV3h6UVdOMGFXOXVjeTUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3UVVGQlFTeHBRa0U0U1VFN08wRkJOMGxCTEN0Q1FVRjVSRHRCUVVWNlJDd3JSRUZCZVVRN1FVRkZOVU1zVVVGQlFTeFpRVUZaTEVkQlFVY3NZMEZCWXl4RFFVRkRPMEZCUXpsQ0xGRkJRVUVzYVVOQlFXbERMRWRCUVVjc2JVTkJRVzFETEVOQlFVTTdRVUZEZUVVc1VVRkJRU3cyUWtGQk5rSXNSMEZCUnl3NFFrRkJPRUlzUTBGQlF6dEJRVU12UkN4UlFVRkJMRFJDUVVFMFFpeEhRVUZITERoQ1FVRTRRaXhEUVVGRE8wRkJRemxFTEZGQlFVRXNPRUpCUVRoQ0xFZEJRVWNzWjBOQlFXZERMRU5CUVVNN1FVRkRiRVVzVVVGQlFTd3dRMEZCTUVNc1IwRkJSeXcwUTBGQk5FTXNRMEZCUXp0QlFVTXhSaXhSUVVGQkxIbENRVUY1UWl4SFFVRkhMREpDUVVFeVFpeERRVUZETzBGQlEzaEVMRkZCUVVFc2JVSkJRVzFDTEVkQlFVY3NjVUpCUVhGQ0xFTkJRVU03UVVGRk5VTXNVVUZCUVN4WFFVRlhMRWRCUVVjc1ZVRkJReXhaUVVGelFqdEpRVU01UXl4SlFVRkpMRkZCUVZFc1IwRkJWU3hGUVVGRkxFTkJRVU03U1VGRGVrSXNXVUZCV1N4RFFVRkRMRTlCUVU4c1EwRkJReXhWUVVGRExFbEJRVms3VVVGRE9VSXNVVUZCVVN4RFFVRkRMRWxCUVVrc1EwRkJRenRaUVVOV0xFbEJRVWtzUlVGQlJTeEpRVUZKTzFsQlExWXNVVUZCVVN4RlFVRkZMRVZCUVVVN1dVRkRXaXh6UWtGQmMwSXNSVUZCUlN4RFFVRkRPMWxCUTNwQ0xHVkJRV1VzUlVGQlJTeEpRVUZKTzFsQlEzSkNMRzFDUVVGdFFpeEZRVUZGTEV0QlFVczdVMEZETjBJc1EwRkJReXhEUVVGRE8wbEJRMUFzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEU0N4UFFVRlBPMUZCUTBnc1NVRkJTU3hGUVVGRkxHOUNRVUZaTzFGQlEyeENMRWxCUVVrc1JVRkJSU3hGUVVGRkxGRkJRVkVzUlVGQlJTeFJRVUZSTEVWQlFVVTdTMEZETDBJc1EwRkJRenRCUVVOT0xFTkJRVU1zUTBGQlFUdEJRVVZaTEZGQlFVRXNjME5CUVhORExFZEJRVWNzVlVGQlF5eFBRVUZsTEVWQlFVVXNRMEZCVXp0SlFVTTNSU3hQUVVGUE8xRkJRMGdzU1VGQlNTeEZRVUZGTEd0RVFVRXdRenRSUVVOb1JDeEpRVUZKTEVWQlFVVTdXVUZEUml4UFFVRlBMRVZCUVVVc1QwRkJUenRaUVVOb1FpeFRRVUZUTEVWQlFVVXNRMEZCUXp0VFFVTm1PMHRCUTBvc1EwRkJRenRCUVVOT0xFTkJRVU1zUTBGQlFUdEJRVVZaTEZGQlFVRXNOa0pCUVRaQ0xFZEJRVWNzVlVGQlF5eFBRVUZsTEVWQlFVVXNWVUZCYlVJN1NVRkRPVVVzVDBGQlR6dFJRVU5JTEVsQlFVa3NSVUZCUlN4NVEwRkJhVU03VVVGRGRrTXNTVUZCU1N4RlFVRkZPMWxCUTBZc1YwRkJWeXhGUVVGRkxFOUJRVTg3V1VGRGNFSXNWVUZCVlN4RlFVRkZMRlZCUVZVN1UwRkRla0k3UzBGRFNpeERRVUZETzBGQlEwNHNRMEZCUXl4RFFVRkJPMEZCUlZrc1VVRkJRU3g1UWtGQmVVSXNSMEZCUnl4VlFVRkRMRmRCUVcxQ0xFVkJRVVVzVDBGQlowSTdTVUZETTBVc1QwRkJUenRSUVVOSUxFbEJRVWtzUlVGQlJTeHhRMEZCTmtJN1VVRkRia01zU1VGQlNTeEZRVUZGTEVWQlFVVXNWMEZCVnl4RlFVRkZMRmRCUVZjc1JVRkJSU3hQUVVGUExFVkJRVVVzVDBGQlR5eEZRVUZGTzB0QlEzWkVMRU5CUVVNN1FVRkRUaXhEUVVGRExFTkJRVUU3UVVGRldTeFJRVUZCTEhsQ1FVRjVRaXhIUVVGSExGVkJRVU1zVjBGQmJVSXNSVUZCUlN4UFFVRm5RanRKUVVNelJTeFBRVUZQTzFGQlEwZ3NTVUZCU1N4RlFVRkZMRzlEUVVFMFFqdFJRVU5zUXl4SlFVRkpMRVZCUVVVc1JVRkJSU3hQUVVGUExFVkJRVVVzVDBGQlR5eEZRVUZGTEZkQlFWY3NSVUZCUlN4WFFVRlhMRVZCUVVVN1MwRkRka1FzUTBGQlF6dEJRVU5PTEVOQlFVTXNRMEZCUVR0QlFVVlpMRkZCUVVFc01rSkJRVEpDTEVkQlFVY3NWVUZCUXl4WFFVRnRRaXhGUVVGRkxGRkJRVzFDTzBsQlEyaEdMRTlCUVU4N1VVRkRTQ3hKUVVGSkxFVkJRVVVzYzBOQlFUaENPMUZCUTNCRExFbEJRVWtzUlVGQlJTeEZRVUZETEZkQlFWY3NSVUZCUlN4WFFVRlhMRVZCUVVVc1VVRkJVU3hGUVVGRkxGRkJRVkVzUlVGQlF6dExRVU4yUkN4RFFVRkRPMEZCUTA0c1EwRkJReXhEUVVGQk8wRkJSVmtzVVVGQlFTeHBRa0ZCYVVJc1IwRkJSenRKUVVNM1FpeFBRVUZQTzFGQlEwZ3NTVUZCU1N4RlFVRkZMREpDUVVGdFFqdExRVU0xUWl4RFFVRkJPMEZCUTB3c1EwRkJReXhEUVVGQk8wRkJTVmtzVVVGQlFTeGhRVUZoTEVkQlFVYzdTVUZEZWtJc1QwRkJUeXhWUVVGRExGRkJRV0U3VVVGRGFrSXNUMEZCVHl4clFrRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eHJRa0ZCYTBJc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZETEVkQlFXdENPMWxCUTNwRUxFbEJRVWtzVVVGQlVTeEhRVUZITEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRExFZEJRVWNzUTBGQlJTeFZRVUZETEVOQlFUaENPMmRDUVVOcVJTeFBRVUZQTEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNN1dVRkRiRUlzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEU0N4UFFVRlBMRkZCUVZFc1EwRkJReXh0UWtGQlZ5eERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRNME1zUTBGQlF5eERRVUZETEVOQlFVTXNUMEZCU3l4RFFVRkJMRU5CUVVNc1ZVRkJReXhIUVVGbE8xbEJRM0pDTEU5QlFVOHNVVUZCVVN4RFFVRkRMQ3RDUVVGUkxFTkJRVU1zZVVSQlFYbEVMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRM3BHTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTFBc1EwRkJReXhEUVVGQk8wRkJRMHdzUTBGQlF5eERRVUZCTzBGQlJWa3NVVUZCUVN4MVFrRkJkVUlzUjBGQlJ5eFZRVUZETEZkQlFXMUNPMGxCUTNaRUxFOUJRVThzVlVGQlR5eFJRVUZoTEVWQlFVVXNVVUZCWVRzN08xbEJRMnhETEU5QlFVOHNSMEZCV1N4UlFVRlJMRVZCUVVVc1EwRkJReXhSUVVGUkxFTkJRVU1zU1VGQlNTeERRVUZGTEZWQlFVTXNRMEZCVlR0blFrRkRlRVFzVDBGQlR5eERRVUZETEVOQlFVTXNTVUZCU1N4TFFVRkxMRmRCUVZjc1EwRkJRenRaUVVOc1F5eERRVUZETEVOQlFVTXNRMEZCUVR0WlFVTkdMRWxCUVVrc1EwRkJReXhQUVVGUExFbEJRVWtzVDBGQlR5eERRVUZETEcxQ1FVRnRRaXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEdWQlFXVXNSVUZCUlR0blFrRkRja1VzVVVGQlVTeERRVUZETEN0Q1FVRlJMRU5CUVVNc2NVUkJRWEZFTEVOQlFVTXNRMEZCUXl4RFFVRkRPMmRDUVVNeFJTeFhRVUZQTEU5QlFVOHNRMEZCUXl4UFFVRlBMRU5CUVVNc2NVZEJRWEZITEVOQlFVTXNSVUZCUXp0aFFVTnFTVHRaUVVORUxGRkJRVkVzUTBGQlF5eHhRMEZCTmtJc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkROVVFzVjBGQlR5eHJRa0ZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXh0UWtGQmJVSXNSMEZCUnl4UFFVRlBMRU5CUVVNc1NVRkJTU3hIUVVGSExFZEJRVWNzUjBGQlJ5eFBRVUZQTEVOQlFVTXNjMEpCUVhOQ0xFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUXl4SFFVRnJRanR2UWtGRGFFZ3NTVUZCU1N4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExGRkJRVkVzUTBGQlF5eE5RVUZOTEV0QlFVc3NRMEZCUXl4RlFVRkZPM2RDUVVOb1F5eFJRVUZSTEVOQlFVTXNhVU5CUVhsQ0xFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NSVUZCUlN4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRE8zZENRVU42UkN4UFFVRlBMRWRCUVVjc1EwRkJRenR4UWtGRFpEdHZRa0ZEUkN4UlFVRlJMRU5CUVVNc09FTkJRWE5ETEVOQlFVTXNWMEZCVnl4RlFVRkZMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zVVVGQlVTeERRVUZETEUxQlFVMHNRMEZCUXl4RFFVRkRMRU5CUVVNN2IwSkJRM2hHTEZGQlFWRXNRMEZCUXl4dFEwRkJNa0lzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RlFVRkZMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTXNRMEZCUVR0blFrRkRNVVVzUTBGQlF5eERRVUZETEVOQlFVTXNUMEZCU3l4RFFVRkJMRU5CUVVNc1ZVRkJReXhIUVVGbE8yOUNRVU55UWl4UlFVRlJMRU5CUVVNc0swSkJRVkVzUTBGQlF5eHhSRUZCY1VRc1EwRkJReXhEUVVGRExFTkJRVU03WjBKQlF6bEZMRU5CUVVNc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF6dHZRa0ZEU2l4UFFVRlBMRkZCUVZFc1EwRkJReXh4UTBGQk5rSXNRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hGUVVGRkxFdEJRVXNzUTBGQlF5eERRVUZETEVOQlFVTTdaMEpCUTNoRkxFTkJRVU1zUTBGQlF5eEZRVUZET3p0VFFVTk9MRU5CUVVFN1FVRkRUQ3hEUVVGRExFTkJRVUU3UVVGRldTeFJRVUZCTEdGQlFXRXNSMEZCUnl4VlFVRkRMRmRCUVcxQ08wbEJRemRETEU5QlFVOHNWVUZCUXl4UlFVRmhPMUZCUTJwQ0xFOUJRVThzYTBKQlFVc3NRMEZCUXl4SFFVRkhMRU5CUVVNc2VVSkJRWGxDTEVkQlFVY3NWMEZCVnl4RFFVRkRPMWxCUTNKRUxFbEJRVWtzUTBGQlF5eFZRVUZETEVkQlFXdENPMWxCUTNCQ0xGRkJRVkVzUTBGQlF5dzRRa0ZCVHl4RFFVRkRMR2xDUVVGcFFpeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTnlReXhQUVVGUExGRkJRVkVzUTBGQlF5eHhRa0ZCWVN4RlFVRkZMRU5CUVVNc1EwRkJRenRSUVVOeVF5eERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRkxMRU5CUVVFc1EwRkJReXhWUVVGRExFZEJRV1U3V1VGRGNrSXNUMEZCVHl4UlFVRlJMRU5CUVVNc0swSkJRVkVzUTBGQlF5eEhRVUZITEVOQlFVTXNVVUZCVVN4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEzWkVMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMWdzUTBGQlF5eERRVUZETzBGQlEwNHNRMEZCUXl4RFFVRkJPMEZCUlZrc1VVRkJRU3hWUVVGVkxFZEJRVWNzVlVGQlF5eFhRVUZ0UWp0SlFVTXhReXhQUVVGUExGVkJRVU1zVVVGQllUdFJRVU5xUWl4UFFVRlBMR3RDUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEhkQ1FVRjNRaXhGUVVGRk8xbEJRM2hETEZkQlFWY3NSVUZCUlN4WFFVRlhPMU5CUXpOQ0xFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUXl4SFFVRnJRanRaUVVOMlFpeFJRVUZSTEVOQlFVTXNPRUpCUVU4c1EwRkJReXhwUWtGQmFVSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRja01zVDBGQlR5eFJRVUZSTEVOQlFVTXNjVUpCUVdFc1JVRkJSU3hEUVVGRExFTkJRVU03VVVGRGNrTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1QwRkJTeXhEUVVGQkxFTkJRVU1zVlVGQlF5eEhRVUZsTzFsQlEzSkNMRTlCUVU4c1VVRkJVU3hEUVVGRExDdENRVUZSTEVOQlFVTXNSMEZCUnl4RFFVRkRMRkZCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTjJSQ3hEUVVGRExFTkJRVU1zUTBGQlFUdEpRVU5PTEVOQlFVTXNRMEZCUXp0QlFVTk9MRU5CUVVNc1EwRkJRU0o5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIGF4aW9zXzEgPSByZXF1aXJlKFwiYXhpb3NcIik7XG52YXIgbm90aWZpY2F0aW9uc0FjdGlvbnNfMSA9IHJlcXVpcmUoXCIuL25vdGlmaWNhdGlvbnNBY3Rpb25zXCIpO1xuZXhwb3J0cy5VUERBVEVfQ0hBVF9VU0VSUyA9ICdVUERBVEVfQ0hBVF9VU0VSUyc7XG5leHBvcnRzLkFERF9DSEFUX1VTRVIgPSAnQUREX1VTRVInO1xuZXhwb3J0cy5SRU1PVkVfQ0hBVF9VU0VSID0gJ1JFTU9WRV9VU0VSJztcbmV4cG9ydHMudXBkYXRlVXNlcnMgPSBmdW5jdGlvbiAodXNlcnMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBleHBvcnRzLlVQREFURV9DSEFUX1VTRVJTLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICB1c2VyczogdXNlcnNcbiAgICAgICAgfVxuICAgIH07XG59O1xuZXhwb3J0cy5hZGRVc2VyID0gZnVuY3Rpb24gKHVzZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBleHBvcnRzLkFERF9DSEFUX1VTRVIsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHVzZXI6IHVzZXJcbiAgICAgICAgfVxuICAgIH07XG59O1xuZXhwb3J0cy5yZW1vdmVVc2VyID0gZnVuY3Rpb24gKGVtYWlsKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXhwb3J0cy5SRU1PVkVfQ0hBVF9VU0VSLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBlbWFpbDogZW1haWxcbiAgICAgICAgfVxuICAgIH07XG59O1xuZXhwb3J0cy5mZXRjaEFsbFVzZXJzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZGlzcGF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIGF4aW9zXzFbXCJkZWZhdWx0XCJdLmdldCgnL2FwaS92MS91c2VycycpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgdmFyIHVzZXJzID0ge307XG4gICAgICAgICAgICByZXMuZGF0YS51c2Vycy5mb3JFYWNoKGZ1bmN0aW9uICh1KSB7XG4gICAgICAgICAgICAgICAgdXNlcnNbdS5lbWFpbF0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IHUucm9sZSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdS5uYW1lXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGlzcGF0Y2goZXhwb3J0cy51cGRhdGVVc2Vycyh1c2VycykpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKCdGZXRjaGluZyBhbGwgdXNlcnMgZmFpbGVkJykpO1xuICAgICAgICAgICAgcmV0dXJuIGVycjtcbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG5leHBvcnRzLmNyZWF0ZU5ld1VzZXIgPSBmdW5jdGlvbiAodXNlcikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZGlzcGF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIGF4aW9zXzFbXCJkZWZhdWx0XCJdLmdldCgnL2FwaS92MS8nKTtcbiAgICB9O1xufTtcbmV4cG9ydHMuZWRpdFVzZXIgPSBmdW5jdGlvbiAoZW1haWwsIHVzZXIpIHtcbn07XG5leHBvcnRzLmRlbGV0ZVVzZXIgPSBmdW5jdGlvbiAoZW1haWwpIHtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lZMmhoZEZWelpYSnpRV04wYVc5dWN5NXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1THk0dUwzTnlZeTkzWldJdllXTjBhVzl1Y3k5amFHRjBWWE5sY25OQlkzUnBiMjV6TG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN08wRkJRVUVzSzBKQlFYbEVPMEZCU1hwRUxDdEVRVUZyUkR0QlFVVnlReXhSUVVGQkxHbENRVUZwUWl4SFFVRkhMRzFDUVVGdFFpeERRVUZETzBGQlEzaERMRkZCUVVFc1lVRkJZU3hIUVVGSExGVkJRVlVzUTBGQlF6dEJRVU16UWl4UlFVRkJMR2RDUVVGblFpeEhRVUZITEdGQlFXRXNRMEZCUXp0QlFVVnFReXhSUVVGQkxGZEJRVmNzUjBGQlJ5eFZRVUZUTEV0QlFWazdTVUZETlVNc1QwRkJUenRSUVVOSUxFbEJRVWtzUlVGQlJTeDVRa0ZCYVVJN1VVRkRka0lzU1VGQlNTeEZRVUZGTzFsQlEwWXNTMEZCU3l4RlFVRkZMRXRCUVVzN1UwRkRaanRMUVVOS0xFTkJRVUU3UVVGRFRDeERRVUZETEVOQlFVRTdRVUZGV1N4UlFVRkJMRTlCUVU4c1IwRkJSeXhWUVVGVExFbEJRV003U1VGRE1VTXNUMEZCVHp0UlFVTklMRWxCUVVrc1JVRkJSU3h4UWtGQllUdFJRVU51UWl4SlFVRkpMRVZCUVVVN1dVRkRSaXhKUVVGSkxFVkJRVVVzU1VGQlNUdFRRVU5pTzB0QlEwb3NRMEZCUVR0QlFVTk1MRU5CUVVNc1EwRkJRVHRCUVVWWkxGRkJRVUVzVlVGQlZTeEhRVUZITEZWQlFWTXNTMEZCWVR0SlFVTTFReXhQUVVGUE8xRkJRMGdzU1VGQlNTeEZRVUZGTEhkQ1FVRm5RanRSUVVOMFFpeEpRVUZKTEVWQlFVVTdXVUZEUml4TFFVRkxMRVZCUVVVc1MwRkJTenRUUVVObU8wdEJRMG9zUTBGQlFUdEJRVU5NTEVOQlFVTXNRMEZCUVR0QlFVZFpMRkZCUVVFc1lVRkJZU3hIUVVGSE8wbEJRM3BDTEU5QlFVOHNWVUZCUXl4UlFVRnJRanRSUVVOMFFpeFBRVUZQTEd0Q1FVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRExHVkJRV1VzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRkRMRWRCUVd0Q08xbEJRM1JFTEVsQlFVa3NTMEZCU3l4SFFVRlZMRVZCUVVVc1EwRkJRenRaUVVOMFFpeEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhQUVVGUExFTkJRVU1zVlVGQlF5eERRVUZYTzJkQ1FVTXZRaXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhPMjlDUVVOaUxFbEJRVWtzUlVGQlJTeERRVUZETEVOQlFVTXNTVUZCU1R0dlFrRkRXaXhKUVVGSkxFVkJRVVVzUTBGQlF5eERRVUZETEVsQlFVazdhVUpCUTJZc1EwRkJRenRaUVVOT0xFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEwZ3NVVUZCVVN4RFFVRkRMRzFDUVVGWExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTTNRaXhQUVVGUExFZEJRVWNzUTBGQlF6dFJRVU5tTEVOQlFVTXNRMEZCUXl4RFFVRkRMRTlCUVVzc1EwRkJRU3hEUVVGRExGVkJRVU1zUjBGQlpUdFpRVU55UWl4UlFVRlJMRU5CUVVNc0swSkJRVkVzUTBGQlF5d3lRa0ZCTWtJc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRGFFUXNUMEZCVHl4SFFVRkhMRU5CUVVNN1VVRkRaaXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTXNRMEZCUVR0QlFVTk1MRU5CUVVNc1EwRkJRVHRCUVVWWkxGRkJRVUVzWVVGQllTeEhRVUZITEZWQlFVTXNTVUZCWXp0SlFVTjRReXhQUVVGUExGVkJRVU1zVVVGQmEwSTdVVUZEZEVJc1QwRkJUeXhyUWtGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4VlFVRlZMRU5CUVVNc1EwRkJRVHRKUVVOb1F5eERRVUZETEVOQlFVRTdRVUZEVEN4RFFVRkRMRU5CUVVFN1FVRkZXU3hSUVVGQkxGRkJRVkVzUjBGQlJ5eFZRVUZETEV0QlFXRXNSVUZCUlN4SlFVRmpPMEZCUlhSRUxFTkJRVU1zUTBGQlFUdEJRVVZaTEZGQlFVRXNWVUZCVlN4SFFVRkhMRlZCUVVNc1MwRkJZVHRCUVVWNFF5eERRVUZETEVOQlFVRWlmUT09IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5BRERfRVJST1IgPSAnQUREX0VSUk9SJztcbmV4cG9ydHMuUkVNT1ZFX0VSUk9SID0gJ1JFTU9WRV9FUlJPUic7XG5leHBvcnRzLkNMRUFSX0VSUk9SUyA9ICdDTEVBUl9FUlJPUlMnO1xuZXhwb3J0cy5BRERfSU5GTyA9ICdBRERfSU5GTyc7XG5leHBvcnRzLlJFTU9WRV9JTkZPID0gJ1JFTU9WRV9JTkZPJztcbmV4cG9ydHMuQ0xFQVJfSU5GT1MgPSAnQ0xFQVJfSU5GT1MnO1xuZXhwb3J0cy5hZGRFcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV4cG9ydHMuQUREX0VSUk9SLFxuICAgICAgICBkYXRhOiBlcnJvclxuICAgIH07XG59O1xuZXhwb3J0cy5yZW1vdmVFcnJvciA9IGZ1bmN0aW9uIChpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXhwb3J0cy5SRU1PVkVfRVJST1IsXG4gICAgICAgIGRhdGE6IGlcbiAgICB9O1xufTtcbmV4cG9ydHMuY2xlYXJFcnJvcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHsgdHlwZTogZXhwb3J0cy5DTEVBUl9FUlJPUlMgfTtcbn07XG5leHBvcnRzLmFkZEluZm8gPSBmdW5jdGlvbiAoaW5mbykge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV4cG9ydHMuQUREX0lORk8sXG4gICAgICAgIGRhdGE6IGluZm9cbiAgICB9O1xufTtcbmV4cG9ydHMucmVtb3ZlSW5mbyA9IGZ1bmN0aW9uIChpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXhwb3J0cy5SRU1PVkVfSU5GTyxcbiAgICAgICAgZGF0YTogaVxuICAgIH07XG59O1xuZXhwb3J0cy5jbGVhckluZm9zID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV4cG9ydHMuQ0xFQVJfSU5GT1NcbiAgICB9O1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWJtOTBhV1pwWTJGMGFXOXVjMEZqZEdsdmJuTXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOHVMaTh1TGk4dUxpOXpjbU12ZDJWaUwyRmpkR2x2Ym5NdmJtOTBhV1pwWTJGMGFXOXVjMEZqZEdsdmJuTXVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanM3UVVGQllTeFJRVUZCTEZOQlFWTXNSMEZCUnl4WFFVRlhMRU5CUVVNN1FVRkRlRUlzVVVGQlFTeFpRVUZaTEVkQlFVY3NZMEZCWXl4RFFVRkRPMEZCUXpsQ0xGRkJRVUVzV1VGQldTeEhRVUZITEdOQlFXTXNRMEZCUXp0QlFVTTVRaXhSUVVGQkxGRkJRVkVzUjBGQlJ5eFZRVUZWTEVOQlFVTTdRVUZEZEVJc1VVRkJRU3hYUVVGWExFZEJRVWNzWVVGQllTeERRVUZETzBGQlF6VkNMRkZCUVVFc1YwRkJWeXhIUVVGSExHRkJRV0VzUTBGQlF6dEJRVVUxUWl4UlFVRkJMRkZCUVZFc1IwRkJSeXhWUVVGRExFdEJRV0U3U1VGRGJFTXNUMEZCVHp0UlFVTklMRWxCUVVrc1JVRkJSU3hwUWtGQlV6dFJRVU5tTEVsQlFVa3NSVUZCUlN4TFFVRkxPMHRCUTJRc1EwRkJRenRCUVVOT0xFTkJRVU1zUTBGQlFUdEJRVVZaTEZGQlFVRXNWMEZCVnl4SFFVRkhMRlZCUVVNc1EwRkJVenRKUVVOcVF5eFBRVUZQTzFGQlEwZ3NTVUZCU1N4RlFVRkZMRzlDUVVGWk8xRkJRMnhDTEVsQlFVa3NSVUZCUlN4RFFVRkRPMHRCUTFZc1EwRkJRenRCUVVOT0xFTkJRVU1zUTBGQlFUdEJRVVZaTEZGQlFVRXNWMEZCVnl4SFFVRkhPMGxCUTNaQ0xFOUJRVThzUlVGQlJTeEpRVUZKTEVWQlFVVXNiMEpCUVZrc1JVRkJSU3hEUVVGRE8wRkJRMnhETEVOQlFVTXNRMEZCUVR0QlFVVlpMRkZCUVVFc1QwRkJUeXhIUVVGSExGVkJRVU1zU1VGQldUdEpRVU5vUXl4UFFVRlBPMUZCUTBnc1NVRkJTU3hGUVVGRkxHZENRVUZSTzFGQlEyUXNTVUZCU1N4RlFVRkZMRWxCUVVrN1MwRkRZaXhEUVVGRE8wRkJRMDRzUTBGQlF5eERRVUZCTzBGQlJWa3NVVUZCUVN4VlFVRlZMRWRCUVVjc1ZVRkJReXhEUVVGVE8wbEJRMmhETEU5QlFVODdVVUZEU0N4SlFVRkpMRVZCUVVVc2JVSkJRVmM3VVVGRGFrSXNTVUZCU1N4RlFVRkZMRU5CUVVNN1MwRkRWaXhEUVVGRE8wRkJRMDRzUTBGQlF5eERRVUZCTzBGQlJWa3NVVUZCUVN4VlFVRlZMRWRCUVVjN1NVRkRkRUlzVDBGQlR6dFJRVU5JTEVsQlFVa3NSVUZCUlN4dFFrRkJWenRMUVVOd1FpeERRVUZETzBGQlEwNHNRMEZCUXl4RFFVRkJJbjA9IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5UT0dHTEVfU0lERUJBUl9PUEVOID0gJ1RPR0dMRV9TSURFQkFSX09QRU4nO1xuZXhwb3J0cy50b2dnbGVTaWRlYmFyT3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBleHBvcnRzLlRPR0dMRV9TSURFQkFSX09QRU5cbiAgICB9O1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWMybGtaV0poY2tGamRHbHZibk11YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk4dUxpOHVMaTl6Y21NdmQyVmlMMkZqZEdsdmJuTXZjMmxrWldKaGNrRmpkR2x2Ym5NdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZCWVN4UlFVRkJMRzFDUVVGdFFpeEhRVUZITEhGQ1FVRnhRaXhEUVVGRE8wRkJSVFZETEZGQlFVRXNhVUpCUVdsQ0xFZEJRVWM3U1VGRE4wSXNUMEZCVHp0UlFVTklMRWxCUVVrc1JVRkJSU3d5UWtGQmJVSTdTMEZETlVJc1EwRkJRVHRCUVVOTUxFTkJRVU1zUTBGQlFTSjkiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgaW8gPSByZXF1aXJlKFwic29ja2V0LmlvLWNsaWVudFwiKTtcbmV4cG9ydHMuSU5JVF9XRUJTT0NLRVQgPSAnSU5JVF9XRUJTT0NLRVQnO1xuZXhwb3J0cy5TRVRfU09DS0VUX0NPTk5FQ1RFRCA9ICdTRVRfU09DS0VUX0NPTk5FQ1RFRCc7XG5leHBvcnRzLlNFVF9TT0NLRVRfQ09OTkVDVEVEX1VTRVJTID0gJ1NFVF9TT0NLRVRfQ09OTkVDVEVEX1VTRVJTJztcbmV4cG9ydHMuaW5pdFdlYnNvY2tldCA9IGZ1bmN0aW9uIChpbykge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV4cG9ydHMuSU5JVF9XRUJTT0NLRVQsXG4gICAgICAgIGRhdGE6IHsgaW86IGlvIH1cbiAgICB9O1xufTtcbmV4cG9ydHMuc2V0U29ja2V0Q29ubmVjdGVkID0gZnVuY3Rpb24gKGNvbm5lY3RlZCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGV4cG9ydHMuU0VUX1NPQ0tFVF9DT05ORUNURUQsXG4gICAgICAgIGRhdGE6IHsgY29ubmVjdGVkOiBjb25uZWN0ZWQgfVxuICAgIH07XG59O1xuZXhwb3J0cy5zZXRTb2NrZXRDb25uZWN0ZWRVc2VycyA9IGZ1bmN0aW9uICh1c2VyRW1haWxzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXhwb3J0cy5TRVRfU09DS0VUX0NPTk5FQ1RFRF9VU0VSUyxcbiAgICAgICAgZGF0YTogeyB1c2VyRW1haWxzOiB1c2VyRW1haWxzIH1cbiAgICB9O1xufTtcbmV4cG9ydHMuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRpc3BhdGNoLCBnZXRTdGF0ZSkge1xuICAgICAgICB2YXIgc29ja2V0ID0gaW8oKTtcbiAgICAgICAgc29ja2V0Lm9uKCdjb25uZWN0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc29ja2V0XG4gICAgICAgICAgICAgICAgLmVtaXQoJ2F1dGhlbnRpY2F0ZScsIHsgdG9rZW46IGdldFN0YXRlKCkudXNlci50b2tlbiB9KVxuICAgICAgICAgICAgICAgIC5vbignYXV0aGVudGljYXRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChleHBvcnRzLnNldFNvY2tldENvbm5lY3RlZCh0cnVlKSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2F1dGhvcml6ZWQgWycgKyBzb2NrZXQuaWQgKyAnXScpO1xuICAgICAgICAgICAgICAgIHNvY2tldC5vbignY29ubmVjdGVkIHVzZXJzJywgZnVuY3Rpb24gKHVzZXJFbWFpbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goZXhwb3J0cy5zZXRTb2NrZXRDb25uZWN0ZWRVc2Vycyh1c2VyRW1haWxzKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5vbigndW5hdXRob3JpemVkJywgZnVuY3Rpb24gKG1zZykge1xuICAgICAgICAgICAgICAgIGRpc3BhdGNoKGV4cG9ydHMuc2V0U29ja2V0Q29ubmVjdGVkKGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1bmF1dGhvcml6ZWQ6IFwiICsgSlNPTi5zdHJpbmdpZnkobXNnLmRhdGEpKTtcbiAgICAgICAgICAgICAgICBzb2NrZXQub2ZmKCdjb25uZWN0ZWQgdXNlcycpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cuZGF0YS50eXBlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgc29ja2V0Lm9uKCdkaXNjb25uZWN0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZGlzcGF0Y2goZXhwb3J0cy5zZXRTb2NrZXRDb25uZWN0ZWQoZmFsc2UpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEaXNjb25uZWN0ZWQgZnJvbSB3ZWJzb2NrZXQgc2VydmVyLCBhdHRlbXB0aW5nIHJlY29ubmVjdCcpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRpc3BhdGNoKGV4cG9ydHMuaW5pdFdlYnNvY2tldChzb2NrZXQpKTtcbiAgICB9O1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWMyOWphMlYwUVdOMGFXOXVjeTVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUx5NHVMM055WXk5M1pXSXZZV04wYVc5dWN5OXpiMk5yWlhSQlkzUnBiMjV6TG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN08wRkJRVUVzY1VOQlFYVkRPMEZCU3pGQ0xGRkJRVUVzWTBGQll5eEhRVUZITEdkQ1FVRm5RaXhEUVVGRE8wRkJRMnhETEZGQlFVRXNiMEpCUVc5Q0xFZEJRVWNzYzBKQlFYTkNMRU5CUVVNN1FVRkRPVU1zVVVGQlFTd3dRa0ZCTUVJc1IwRkJSeXcwUWtGQk5FSXNRMEZCUXp0QlFVVXhSQ3hSUVVGQkxHRkJRV0VzUjBGQlJ5eFZRVUZETEVWQlFYbENPMGxCUTI1RUxFOUJRVTg3VVVGRFNDeEpRVUZKTEVWQlFVVXNjMEpCUVdNN1VVRkRjRUlzU1VGQlNTeEZRVUZGTEVWQlFVVXNSVUZCUlN4RlFVRkZMRVZCUVVVc1JVRkJSVHRMUVVOdVFpeERRVUZETzBGQlEwNHNRMEZCUXl4RFFVRkJPMEZCUlZrc1VVRkJRU3hyUWtGQmEwSXNSMEZCUnl4VlFVRkRMRk5CUVd0Q08wbEJRMnBFTEU5QlFVODdVVUZEU0N4SlFVRkpMRVZCUVVVc05FSkJRVzlDTzFGQlF6RkNMRWxCUVVrc1JVRkJSU3hGUVVGRkxGTkJRVk1zUlVGQlJTeFRRVUZUTEVWQlFVVTdTMEZEYWtNc1EwRkJRVHRCUVVOTUxFTkJRVU1zUTBGQlFUdEJRVVZaTEZGQlFVRXNkVUpCUVhWQ0xFZEJRVWNzVlVGQlF5eFZRVUZ2UWp0SlFVTjRSQ3hQUVVGUE8xRkJRMGdzU1VGQlNTeEZRVUZGTEd0RFFVRXdRanRSUVVOb1F5eEpRVUZKTEVWQlFVVXNSVUZCUlN4VlFVRlZMRVZCUVVVc1ZVRkJWU3hGUVVGRk8wdEJRMjVETEVOQlFVRTdRVUZEVEN4RFFVRkRMRU5CUVVFN1FVRkZXU3hSUVVGQkxFbEJRVWtzUjBGQlJ6dEpRVU5vUWl4UFFVRlBMRlZCUVVNc1VVRkJhMElzUlVGQlJTeFJRVUZyUWp0UlFVTXhReXhKUVVGSkxFMUJRVTBzUjBGQk1FSXNSVUZCUlN4RlFVRkZMRU5CUVVNN1VVRkRla01zVFVGQlRTeERRVUZETEVWQlFVVXNRMEZCUXl4VFFVRlRMRVZCUVVVN1dVRkRha0lzVFVGQlRUdHBRa0ZEUkN4SlFVRkpMRU5CUVVNc1kwRkJZeXhGUVVGRkxFVkJRVVVzUzBGQlN5eEZRVUZGTEZGQlFWRXNSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFVkJRVVVzUTBGQlF6dHBRa0ZEZEVRc1JVRkJSU3hEUVVGRExHVkJRV1VzUlVGQlJUdG5Ra0ZEYWtJc1VVRkJVU3hEUVVGRExEQkNRVUZyUWl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU03WjBKQlEyNURMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zWTBGQll5eEhRVUZITEUxQlFVMHNRMEZCUXl4RlFVRkZMRWRCUVVjc1IwRkJSeXhEUVVGRExFTkJRVU03WjBKQlF6bERMRTFCUVUwc1EwRkJReXhGUVVGRkxFTkJRVU1zYVVKQlFXbENMRVZCUVVVc1ZVRkJReXhWUVVGdlFqdHZRa0ZET1VNc1VVRkJVU3hEUVVGRExDdENRVUYxUWl4RFFVRkRMRlZCUVZVc1EwRkJReXhEUVVGRExFTkJRVU03WjBKQlEyeEVMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMUFzUTBGQlF5eERRVUZETzJsQ1FVTkVMRVZCUVVVc1EwRkJReXhqUVVGakxFVkJRVVVzVlVGQlZTeEhRVUZSTzJkQ1FVTnNReXhSUVVGUkxFTkJRVU1zTUVKQlFXdENMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF6dG5Ra0ZEY0VNc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eG5Ra0ZCWjBJc1IwRkJSeXhKUVVGSkxFTkJRVU1zVTBGQlV5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRE8yZENRVU42UkN4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExHZENRVUZuUWl4RFFVRkRMRU5CUVVNN1owSkJRemRDTEUxQlFVMHNTVUZCU1N4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0WlFVTnVReXhEUVVGRExFTkJRVU1zUTBGQlFUdFJRVU5XTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1RVRkJUU3hEUVVGRExFVkJRVVVzUTBGQlF5eFpRVUZaTEVWQlFVVTdXVUZEY0VJc1VVRkJVU3hEUVVGRExEQkNRVUZyUWl4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRGNFTXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXd3UkVGQk1FUXNRMEZCUXl4RFFVRkRPMUZCUXpWRkxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlJVZ3NUMEZCVHl4UlFVRlJMRU5CUVVNc2NVSkJRV0VzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUXpORExFTkJRVU1zUTBGQlFUdEJRVU5NTEVOQlFVTXNRMEZCUVNKOSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBheGlvc18xID0gcmVxdWlyZShcImF4aW9zXCIpO1xudmFyIGNoYW5uZWxzQWN0aW9uc18xID0gcmVxdWlyZShcIi4vY2hhbm5lbHNBY3Rpb25zXCIpO1xudmFyIG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEgPSByZXF1aXJlKFwiLi9ub3RpZmljYXRpb25zQWN0aW9uc1wiKTtcbmV4cG9ydHMuU0VUX0FVVEhPUklaRUQgPSAnU0VUX0FVVEhPUklaRUQnO1xuZXhwb3J0cy5TRVRfVVNFUiA9ICdTRVRfVVNFUic7XG5leHBvcnRzLkxPR09VVF9VU0VSID0gJ0xPR09VVF9VU0VSJztcbmV4cG9ydHMuU0VUX0pXVCA9ICdTRVRfSldUJztcbmV4cG9ydHMuc2V0QXV0aG9yaXplZCA9IGZ1bmN0aW9uIChhdXRob3JpemVkKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXhwb3J0cy5TRVRfQVVUSE9SSVpFRCxcbiAgICAgICAgZGF0YTogYXV0aG9yaXplZFxuICAgIH07XG59O1xuZXhwb3J0cy5zZXRVc2VyID0gZnVuY3Rpb24gKHVzZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBleHBvcnRzLlNFVF9VU0VSLFxuICAgICAgICBkYXRhOiB1c2VyXG4gICAgfTtcbn07XG5leHBvcnRzLmxvZ291dFVzZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZXhwb3J0cy5MT0dPVVRfVVNFUlxuICAgIH07XG59O1xuZXhwb3J0cy5zZXRKd3QgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBleHBvcnRzLlNFVF9KV1QsXG4gICAgICAgIGRhdGE6IHRva2VuXG4gICAgfTtcbn07XG5leHBvcnRzLmxvZ291dCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRpc3BhdGNoKSB7XG4gICAgICAgIGRpc3BhdGNoKGV4cG9ydHMubG9nb3V0VXNlcigpKTtcbiAgICAgICAgcmV0dXJuIGRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmNsZWFyQ2hhbm5lbHNEYXRhKCkpO1xuICAgIH07XG59O1xuZXhwb3J0cy51cGRhdGVOYW1lID0gZnVuY3Rpb24gKG5hbWUsIG9uU3VjY2Vzcykge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZGlzcGF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIGF4aW9zXzFbXCJkZWZhdWx0XCJdLnBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvbmFtZScsIHtcbiAgICAgICAgICAgIG5hbWU6IG5hbWVcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEluZm8oJ05hbWUgdXBkYXRlZCcpKTtcbiAgICAgICAgICAgIGlmIChvblN1Y2Nlc3MpXG4gICAgICAgICAgICAgICAgb25TdWNjZXNzKCk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgaWYgKGVyci5yZXNwb25zZSAmJiBlcnIucmVzcG9uc2UuZGF0YS5lcnJvcilcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcihlcnIucmVzcG9uc2UuZGF0YS5lcnJvcikpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1NvbWV0aGluZyB3ZW50IHdyb25nIHVwZGF0aW5nIHVzZXIgbmFtZScsIGVycik7XG4gICAgICAgICAgICBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gdXBkYXRlIHlvdXIgbmFtZS4nKSk7XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuZXhwb3J0cy51cGRhdGVFbWFpbCA9IGZ1bmN0aW9uIChlbWFpbCwgb25TdWNjZXNzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkaXNwYXRjaCkge1xuICAgICAgICByZXR1cm4gYXhpb3NfMVtcImRlZmF1bHRcIl0ucG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9lbWFpbCcsIHtcbiAgICAgICAgICAgIGVtYWlsOiBlbWFpbFxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkSW5mbygnRW1haWwgdXBkYXRlZCcpKTtcbiAgICAgICAgICAgIGlmIChvblN1Y2Nlc3MpXG4gICAgICAgICAgICAgICAgb25TdWNjZXNzKCk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgaWYgKGVyci5yZXNwb25zZSAmJiBlcnIucmVzcG9uc2UuZGF0YS5lcnJvcilcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcihlcnIucmVzcG9uc2UuZGF0YS5lcnJvcikpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1NvbWV0aGluZyB3ZW50IHdyb25nIHVwZGF0aW5nIHVzZXIgZW1haWwnLCBlcnIpO1xuICAgICAgICAgICAgZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIHVwZGF0ZSB5b3VyIGVtYWlsLicpKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG5leHBvcnRzLnVwZGF0ZVBhc3N3b3JkID0gZnVuY3Rpb24gKG9sZFBhc3MsIG5ld1Bhc3MsIG9uU3VjY2Vzcykge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZGlzcGF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIGF4aW9zXzFbXCJkZWZhdWx0XCJdLnBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvcGFzc3dvcmQnLCB7XG4gICAgICAgICAgICBvbGRQYXNzOiBvbGRQYXNzLFxuICAgICAgICAgICAgbmV3UGFzczogbmV3UGFzc1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkSW5mbygnUGFzc3dvcmQgdXBkYXRlZCcpKTtcbiAgICAgICAgICAgIGlmIChvblN1Y2Nlc3MpXG4gICAgICAgICAgICAgICAgb25TdWNjZXNzKCk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgaWYgKGVyci5yZXNwb25zZSAmJiBlcnIucmVzcG9uc2UuZGF0YS5lcnJvcilcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcihlcnIucmVzcG9uc2UuZGF0YS5lcnJvcikpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1NvbWV0aGluZyB3ZW50IHdyb25nIHVwZGF0aW5nIHVzZXIgcGFzc3dvcmQnLCBlcnIpO1xuICAgICAgICAgICAgZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIHVwZGF0ZSB5b3VyIHBhc3N3b3JkLicpKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG5leHBvcnRzLmNyZWF0ZVVzZXIgPSBmdW5jdGlvbiAobmFtZSwgZW1haWwsIHJvbGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRpc3BhdGNoKSB7XG4gICAgICAgIHJldHVybiBheGlvc18xW1wiZGVmYXVsdFwiXS5wb3N0KCcvYXBpL3YxL3VzZXIvY3JlYXRlJywge1xuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcbiAgICAgICAgICAgIHJvbGU6IHJvbGUsXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRJbmZvKCdOZXcgdXNlciBjcmVhdGVkJykpO1xuICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIucmVzcG9uc2UgJiYgZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICAgICAgZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcihlcnIucmVzcG9uc2UuZGF0YS5lcnJvcikpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nJykpO1xuICAgICAgICB9KTtcbiAgICB9O1xufTtcbmV4cG9ydHMuZWRpdFVzZXIgPSBmdW5jdGlvbiAob3JpZ2luYWxFbWFpbCwgbmV3TmFtZSwgbmV3RW1haWwsIG5ld1JvbGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRpc3BhdGNoKSB7XG4gICAgICAgIHJldHVybiBheGlvc18xW1wiZGVmYXVsdFwiXS5wdXQoJy9hcGkvdjEvdXNlci91cGRhdGUnLCB7XG4gICAgICAgICAgICBlbWFpbDogb3JpZ2luYWxFbWFpbCxcbiAgICAgICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBuZXdOYW1lLFxuICAgICAgICAgICAgICAgIGVtYWlsOiBuZXdFbWFpbCxcbiAgICAgICAgICAgICAgICByb2xlOiBuZXdSb2xlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRJbmZvKCdDaGFuZ2VzIHNhdmVkJykpO1xuICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIucmVzcG9uc2UgJiYgZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICAgICAgZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcihlcnIucmVzcG9uc2UuZGF0YS5lcnJvcikpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nJykpO1xuICAgICAgICB9KTtcbiAgICB9O1xufTtcbmV4cG9ydHMuZGVsZXRlVXNlciA9IGZ1bmN0aW9uIChlbWFpbCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZGlzcGF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIGF4aW9zXzFbXCJkZWZhdWx0XCJdKHtcbiAgICAgICAgICAgIG1ldGhvZDogJ2RlbGV0ZScsXG4gICAgICAgICAgICB1cmw6ICcvYXBpL3YxL3VzZXIvZGVsZXRlJyxcbiAgICAgICAgICAgIGRhdGE6IHsgZW1haWw6IGVtYWlsIH1cbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEluZm8oJ1VzZXIgZGVsZXRlZCcpKTtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyLnJlc3BvbnNlICYmIGVyci5yZXNwb25zZS5kYXRhLmVycm9yKVxuICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZycpKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG5leHBvcnRzLnJlc3RvcmVVc2VyID0gZnVuY3Rpb24gKGVtYWlsKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkaXNwYXRjaCkge1xuICAgICAgICByZXR1cm4gYXhpb3NfMVtcImRlZmF1bHRcIl0ucHV0KCcvYXBpL3YxL3VzZXIvcmVzdG9yZScsIHtcbiAgICAgICAgICAgIGVtYWlsOiBlbWFpbFxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkSW5mbygnVXNlciByZXN0b3JlZCcpKTtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyLnJlc3BvbnNlICYmIGVyci5yZXNwb25zZS5kYXRhLmVycm9yKVxuICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3IpKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZycpKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lkWE5sY2tGamRHbHZibk11YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk4dUxpOHVMaTl6Y21NdmQyVmlMMkZqZEdsdmJuTXZkWE5sY2tGamRHbHZibk11ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRkJRU3dyUWtGQmVVUTdRVUZGZWtRc2NVUkJRVzlFTzBGQlEzQkVMQ3RFUVVGNVJEdEJRVVUxUXl4UlFVRkJMR05CUVdNc1IwRkJSeXhuUWtGQlowSXNRMEZCUXp0QlFVTnNReXhSUVVGQkxGRkJRVkVzUjBGQlJ5eFZRVUZWTEVOQlFVTTdRVUZEZEVJc1VVRkJRU3hYUVVGWExFZEJRVWNzWVVGQllTeERRVUZETzBGQlF6VkNMRkZCUVVFc1QwRkJUeXhIUVVGSExGTkJRVk1zUTBGQlF6dEJRVVZ3UWl4UlFVRkJMR0ZCUVdFc1IwRkJSeXhWUVVGRExGVkJRVzFDTzBsQlF6ZERMRTlCUVZFN1VVRkRTaXhKUVVGSkxFVkJRVVVzYzBKQlFXTTdVVUZEY0VJc1NVRkJTU3hGUVVGRkxGVkJRVlU3UzBGRGJrSXNRMEZCUXp0QlFVTk9MRU5CUVVNc1EwRkJRVHRCUVVWWkxGRkJRVUVzVDBGQlR5eEhRVUZITEZWQlFVTXNTVUZCWlR0SlFVTnVReXhQUVVGUE8xRkJRMGdzU1VGQlNTeEZRVUZGTEdkQ1FVRlJPMUZCUTJRc1NVRkJTU3hGUVVGRkxFbEJRVWs3UzBGRFlpeERRVUZETzBGQlEwNHNRMEZCUXl4RFFVRkJPMEZCUlZrc1VVRkJRU3hWUVVGVkxFZEJRVWM3U1VGRGRFSXNUMEZCVHp0UlFVTklMRWxCUVVrc1JVRkJSU3h0UWtGQlZ6dExRVU53UWl4RFFVRkRPMEZCUTA0c1EwRkJReXhEUVVGQk8wRkJSVmtzVVVGQlFTeE5RVUZOTEVkQlFVY3NWVUZCUXl4TFFVRmhPMGxCUTJoRExFOUJRVTg3VVVGRFNDeEpRVUZKTEVWQlFVVXNaVUZCVHp0UlFVTmlMRWxCUVVrc1JVRkJSU3hMUVVGTE8wdEJRMlFzUTBGQlF6dEJRVU5PTEVOQlFVTXNRMEZCUVR0QlFVVlpMRkZCUVVFc1RVRkJUU3hIUVVGSE8wbEJRMnhDTEU5QlFVOHNWVUZCUXl4UlFVRmhPMUZCUTJwQ0xGRkJRVkVzUTBGQlF5eHJRa0ZCVlN4RlFVRkZMRU5CUVVNc1EwRkJRenRSUVVOMlFpeFBRVUZQTEZGQlFWRXNRMEZCUXl4dFEwRkJhVUlzUlVGQlJTeERRVUZETEVOQlFVTTdTVUZEZWtNc1EwRkJReXhEUVVGQk8wRkJSVXdzUTBGQlF5eERRVUZCTzBGQlIxa3NVVUZCUVN4VlFVRlZMRWRCUVVjc1ZVRkJReXhKUVVGWkxFVkJRVVVzVTBGQmIwSTdTVUZEZWtRc1QwRkJUeXhWUVVGRExGRkJRV0U3VVVGRGFrSXNUMEZCVHl4clFrRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF5d3dRa0ZCTUVJc1JVRkJSVHRaUVVNeFF5eEpRVUZKTEVWQlFVVXNTVUZCU1R0VFFVTmlMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlF5eEhRVUZyUWp0WlFVTjJRaXhSUVVGUkxFTkJRVU1zT0VKQlFVOHNRMEZCUXl4alFVRmpMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMnhETEVsQlFVa3NVMEZCVXp0blFrRkJSU3hUUVVGVExFVkJRVVVzUTBGQlF6dFJRVU12UWl4RFFVRkRMRU5CUVVNc1EwRkJReXhQUVVGTExFTkJRVUVzUTBGQlF5eFZRVUZETEVkQlFXVTdXVUZEY2tJc1NVRkJTU3hIUVVGSExFTkJRVU1zVVVGQlVTeEpRVUZKTEVkQlFVY3NRMEZCUXl4UlFVRlJMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXM3WjBKQlEzWkRMRTlCUVU4c1VVRkJVU3hEUVVGRExDdENRVUZSTEVOQlFVTXNSMEZCUnl4RFFVRkRMRkZCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTjJSQ3hQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEhsRFFVRjVReXhGUVVGRkxFZEJRVWNzUTBGQlF5eERRVUZETzFsQlF6VkVMRkZCUVZFc1EwRkJReXdyUWtGQlVTeERRVUZETEhkRVFVRjNSQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5xUml4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOUUxFTkJRVU1zUTBGQlF6dEJRVU5PTEVOQlFVTXNRMEZCUVR0QlFVVlpMRkZCUVVFc1YwRkJWeXhIUVVGSExGVkJRVU1zUzBGQllTeEZRVUZGTEZOQlFXOUNPMGxCUXpORUxFOUJRVThzVlVGQlF5eFJRVUZoTzFGQlEycENMRTlCUVU4c2EwSkJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNNa0pCUVRKQ0xFVkJRVVU3V1VGRE0wTXNTMEZCU3l4RlFVRkZMRXRCUVVzN1UwRkRaaXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFVTXNSMEZCYTBJN1dVRkRka0lzVVVGQlVTeERRVUZETERoQ1FVRlBMRU5CUVVNc1pVRkJaU3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU51UXl4SlFVRkpMRk5CUVZNN1owSkJRVVVzVTBGQlV5eEZRVUZGTEVOQlFVTTdVVUZETDBJc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlN5eERRVUZCTEVOQlFVTXNWVUZCUXl4SFFVRmxPMWxCUTNKQ0xFbEJRVWtzUjBGQlJ5eERRVUZETEZGQlFWRXNTVUZCU1N4SFFVRkhMRU5CUVVNc1VVRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTzJkQ1FVTjJReXhQUVVGUExGRkJRVkVzUTBGQlF5d3JRa0ZCVVN4RFFVRkRMRWRCUVVjc1EwRkJReXhSUVVGUkxFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRka1FzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl3d1EwRkJNRU1zUlVGQlJTeEhRVUZITEVOQlFVTXNRMEZCUXp0WlFVTTNSQ3hSUVVGUkxFTkJRVU1zSzBKQlFWRXNRMEZCUXl4NVJFRkJlVVFzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEYkVZc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFVDeERRVUZETEVOQlFVTTdRVUZEVGl4RFFVRkRMRU5CUVVFN1FVRkZXU3hSUVVGQkxHTkJRV01zUjBGQlJ5eFZRVUZETEU5QlFXVXNSVUZCUlN4UFFVRmxMRVZCUVVVc1UwRkJiMEk3U1VGRGFrWXNUMEZCVHl4VlFVRkRMRkZCUVdFN1VVRkRha0lzVDBGQlR5eHJRa0ZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXc0UWtGQk9FSXNSVUZCUlR0WlFVTTVReXhQUVVGUExFVkJRVVVzVDBGQlR6dFpRVU5vUWl4UFFVRlBMRVZCUVVVc1QwRkJUenRUUVVOdVFpeERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVVNc1IwRkJhMEk3V1VGRGRrSXNVVUZCVVN4RFFVRkRMRGhDUVVGUExFTkJRVU1zYTBKQlFXdENMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRM1JETEVsQlFVa3NVMEZCVXp0blFrRkJSU3hUUVVGVExFVkJRVVVzUTBGQlF6dFJRVU12UWl4RFFVRkRMRU5CUVVNc1EwRkJReXhQUVVGTExFTkJRVUVzUTBGQlF5eFZRVUZETEVkQlFXVTdXVUZEY2tJc1NVRkJTU3hIUVVGSExFTkJRVU1zVVVGQlVTeEpRVUZKTEVkQlFVY3NRMEZCUXl4UlFVRlJMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXM3WjBKQlEzWkRMRTlCUVU4c1VVRkJVU3hEUVVGRExDdENRVUZSTEVOQlFVTXNSMEZCUnl4RFFVRkRMRkZCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTjJSQ3hQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETERaRFFVRTJReXhGUVVGRkxFZEJRVWNzUTBGQlF5eERRVUZETzFsQlEyaEZMRkZCUVZFc1EwRkJReXdyUWtGQlVTeERRVUZETERSRVFVRTBSQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU55Uml4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOUUxFTkJRVU1zUTBGQlF6dEJRVU5PTEVOQlFVTXNRMEZCUVR0QlFVVlpMRkZCUVVFc1ZVRkJWU3hIUVVGSExGVkJRVU1zU1VGQldTeEZRVUZGTEV0QlFXRXNSVUZCUlN4SlFVRlpPMGxCUTJoRkxFOUJRVThzVlVGQlF5eFJRVUZoTzFGQlEycENMRTlCUVU4c2EwSkJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNjVUpCUVhGQ0xFVkJRVVU3V1VGRGNrTXNTVUZCU1N4RlFVRkZMRWxCUVVrN1dVRkRWaXhMUVVGTExFVkJRVVVzUzBGQlN6dFpRVU5hTEVsQlFVa3NSVUZCUlN4SlFVRkpPMU5CUTJJc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZETEVkQlFXdENPMWxCUTNaQ0xGRkJRVkVzUTBGQlF5dzRRa0ZCVHl4RFFVRkRMR3RDUVVGclFpeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTXhReXhEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZMTEVOQlFVRXNRMEZCUXl4VlFVRkRMRWRCUVZFN1dVRkRaQ3hKUVVGSkxFZEJRVWNzUTBGQlF5eFJRVUZSTEVsQlFVa3NSMEZCUnl4RFFVRkRMRkZCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN6dG5Ra0ZEZGtNc1VVRkJVU3hEUVVGRExDdENRVUZSTEVOQlFVTXNSMEZCUnl4RFFVRkRMRkZCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXpzN1owSkJSVFZETEZGQlFWRXNRMEZCUXl3clFrRkJVU3hEUVVGRExITkNRVUZ6UWl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOdVJDeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTlFMRU5CUVVNc1EwRkJRenRCUVVOT0xFTkJRVU1zUTBGQlF6dEJRVVZYTEZGQlFVRXNVVUZCVVN4SFFVRkhMRlZCUVVNc1lVRkJjVUlzUlVGQlJTeFBRVUZuUWl4RlFVRkZMRkZCUVdsQ0xFVkJRVVVzVDBGQlowSTdTVUZEYWtjc1QwRkJUeXhWUVVGRExGRkJRV0U3VVVGRGFrSXNUMEZCVHl4clFrRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eHhRa0ZCY1VJc1JVRkJSVHRaUVVOd1F5eExRVUZMTEVWQlFVVXNZVUZCWVR0WlFVTndRaXhKUVVGSkxFVkJRVVU3WjBKQlEwWXNTVUZCU1N4RlFVRkZMRTlCUVU4N1owSkJRMklzUzBGQlN5eEZRVUZGTEZGQlFWRTdaMEpCUTJZc1NVRkJTU3hGUVVGRkxFOUJRVTg3WVVGRGFFSTdVMEZEU2l4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVU1zUjBGQmEwSTdXVUZEZGtJc1VVRkJVU3hEUVVGRExEaENRVUZQTEVOQlFVTXNaVUZCWlN4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOMlF5eERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRkxMRU5CUVVFc1EwRkJReXhWUVVGRExFZEJRVkU3V1VGRFpDeEpRVUZKTEVkQlFVY3NRMEZCUXl4UlFVRlJMRWxCUVVrc1IwRkJSeXhEUVVGRExGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3p0blFrRkRka01zVVVGQlVTeERRVUZETEN0Q1FVRlJMRU5CUVVNc1IwRkJSeXhEUVVGRExGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJRenM3WjBKQlJUVkRMRkZCUVZFc1EwRkJReXdyUWtGQlVTeERRVUZETEhOQ1FVRnpRaXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU51UkN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOUUxFTkJRVU1zUTBGQlF6dEJRVU5PTEVOQlFVTXNRMEZCUXp0QlFVVlhMRkZCUVVFc1ZVRkJWU3hIUVVGSExGVkJRVU1zUzBGQllUdEpRVU53UXl4UFFVRlBMRlZCUVVNc1VVRkJZVHRSUVVkcVFpeFBRVUZQTEd0Q1FVRkxMRU5CUVVNN1dVRkRWQ3hOUVVGTkxFVkJRVVVzVVVGQlVUdFpRVU5vUWl4SFFVRkhMRVZCUVVVc2NVSkJRWEZDTzFsQlF6RkNMRWxCUVVrc1JVRkJSU3hGUVVGRkxFdEJRVXNzUlVGQlJTeExRVUZMTEVWQlFVVTdVMEZEZWtJc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZETEVkQlFXdENPMWxCUTNaQ0xGRkJRVkVzUTBGQlF5dzRRa0ZCVHl4RFFVRkRMR05CUVdNc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRGRFTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1QwRkJTeXhEUVVGQkxFTkJRVU1zVlVGQlF5eEhRVUZSTzFsQlEyUXNTVUZCU1N4SFFVRkhMRU5CUVVNc1VVRkJVU3hKUVVGSkxFZEJRVWNzUTBGQlF5eFJRVUZSTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzN1owSkJRM1pETEZGQlFWRXNRMEZCUXl3clFrRkJVU3hEUVVGRExFZEJRVWNzUTBGQlF5eFJRVUZSTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFTkJRVU03TzJkQ1FVVTFReXhSUVVGUkxFTkJRVU1zSzBKQlFWRXNRMEZCUXl4elFrRkJjMElzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEYmtRc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFVDeERRVUZETEVOQlFVTTdRVUZEVGl4RFFVRkRMRU5CUVVNN1FVRkZWeXhSUVVGQkxGZEJRVmNzUjBGQlJ5eFZRVUZETEV0QlFXRTdTVUZEY2tNc1QwRkJUeXhWUVVGRExGRkJRV0U3VVVGRGFrSXNUMEZCVHl4clFrRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eHpRa0ZCYzBJc1JVRkJSVHRaUVVOeVF5eExRVUZMTEVWQlFVVXNTMEZCU3p0VFFVTm1MRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlF5eEhRVUZyUWp0WlFVTjJRaXhSUVVGUkxFTkJRVU1zT0VKQlFVOHNRMEZCUXl4bFFVRmxMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRM1pETEVOQlFVTXNRMEZCUXl4RFFVRkRMRTlCUVVzc1EwRkJRU3hEUVVGRExGVkJRVU1zUjBGQlVUdFpRVU5rTEVsQlFVa3NSMEZCUnl4RFFVRkRMRkZCUVZFc1NVRkJTU3hIUVVGSExFTkJRVU1zVVVGQlVTeERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxPMmRDUVVOMlF5eFJRVUZSTEVOQlFVTXNLMEpCUVZFc1EwRkJReXhIUVVGSExFTkJRVU1zVVVGQlVTeERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRE96dG5Ra0ZGTlVNc1VVRkJVU3hEUVVGRExDdENRVUZSTEVOQlFVTXNjMEpCUVhOQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEyNUVMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMUFzUTBGQlF5eERRVUZETzBGQlEwNHNRMEZCUXl4RFFVRkRJbjA9IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIGNoYW5uZWxzQWN0aW9uc18xID0gcmVxdWlyZShcIi4uL2FjdGlvbnMvY2hhbm5lbHNBY3Rpb25zXCIpO1xudmFyIGluaXRpYWxTdGF0ZSA9IFtdO1xuZXhwb3J0cy5jaGFubmVsRXhpc3RzID0gZnVuY3Rpb24gKGNoYW5uZWxzLCBjaGFubmVsTmFtZSkge1xuICAgIHZhciBjaGFubmVsID0gY2hhbm5lbHMuZmluZChmdW5jdGlvbiAoYykge1xuICAgICAgICByZXR1cm4gYy5uYW1lID09PSBjaGFubmVsTmFtZTtcbiAgICB9KTtcbiAgICBpZiAoIWNoYW5uZWwpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gY2hhbm5lbDtcbn07XG5mdW5jdGlvbiBkZWZhdWx0XzEoc3RhdGUsIGFjdGlvbikge1xuICAgIGlmIChzdGF0ZSA9PT0gdm9pZCAwKSB7IHN0YXRlID0gaW5pdGlhbFN0YXRlOyB9XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIGNoYW5uZWxzQWN0aW9uc18xLkFERF9DSEFOTkVMUzpcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb24uZGF0YS5jaGFubmVscztcbiAgICAgICAgY2FzZSBjaGFubmVsc0FjdGlvbnNfMS5JTkNSRU1FTlRfQ0hBTk5FTF9SRVRSSUVWRV9NRVNTQUdFU19PRkZTRVQ6IHtcbiAgICAgICAgICAgIHZhciBjaGFubmVsXzEgPSBleHBvcnRzLmNoYW5uZWxFeGlzdHMoc3RhdGUsIGFjdGlvbi5kYXRhLmNoYW5uZWwpO1xuICAgICAgICAgICAgdmFyIGluY3JlbWVudF8xID0gYWN0aW9uLmRhdGEuaW5jcmVtZW50O1xuICAgICAgICAgICAgaWYgKCFjaGFubmVsXzEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVW5rbm93biBjaGFubmVsIHdoaWxlIGluY3JlbWVudGluZyBtZXNzYWdlcyBvZmZzZXQnLCBhY3Rpb24pO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBuZXdDaGFubmVsc18xID0gc3RhdGUubWFwKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgaWYgKGMubmFtZSA9PT0gY2hhbm5lbF8xLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgYy5yZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0ICs9IGluY3JlbWVudF8xO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG5ld0NoYW5uZWxzXzE7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBjaGFubmVsc0FjdGlvbnNfMS5TRVRfQ0hBTk5FTF9GRVRDSElOR19ORVdfTUVTU0FHRVM6XG4gICAgICAgICAgICB2YXIgY2hhbm5lbCA9IGV4cG9ydHMuY2hhbm5lbEV4aXN0cyhzdGF0ZSwgYWN0aW9uLmRhdGEuY2hhbm5lbE5hbWUpO1xuICAgICAgICAgICAgaWYgKCFjaGFubmVsKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Vua25vd24gY2hhbm5lbCB3aGlsZSBmZXRjaGluZyBuZXcgbWVzc2FnZXMnLCBhY3Rpb24pO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBuZXdDaGFubmVscyA9IHN0YXRlLm1hcChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIGlmIChjLm5hbWUgPT09IGFjdGlvbi5kYXRhLmNoYW5uZWxOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGMuZmV0Y2hpbmdOZXdNZXNzYWdlcyA9IGFjdGlvbi5kYXRhLmlzRmV0Y2hpbmc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3Q2hhbm5lbHM7XG4gICAgICAgIGNhc2UgY2hhbm5lbHNBY3Rpb25zXzEuU0VUX0NIQU5ORUxfSEFTX01PUkVfTUVTU0FHRVM6IHtcbiAgICAgICAgICAgIHZhciBjaGFubmVsXzIgPSBleHBvcnRzLmNoYW5uZWxFeGlzdHMoc3RhdGUsIGFjdGlvbi5kYXRhLmNoYW5uZWxOYW1lKTtcbiAgICAgICAgICAgIHZhciBoYXNNb3JlXzEgPSBhY3Rpb24uZGF0YS5oYXNNb3JlO1xuICAgICAgICAgICAgaWYgKCFjaGFubmVsXzIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVW5rbm93biBjaGFubmVsIHdoaWxlIHNldHRpbmcgaGFzTW9yZSBtZXNzYWdlcycsIGFjdGlvbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG5ld0NoYW5uZWxzXzIgPSBzdGF0ZS5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICBpZiAoYy5uYW1lID09PSBhY3Rpb24uZGF0YS5jaGFubmVsTmFtZSlcbiAgICAgICAgICAgICAgICAgICAgYy5oYXNNb3JlTWVzc2FnZXMgPSBoYXNNb3JlXzE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBuZXdDaGFubmVsc18yO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgY2hhbm5lbHNBY3Rpb25zXzEuQUREX1JFVFJJRVZFRF9DSEFOTkVMX01FU1NBR0VTOiB7XG4gICAgICAgICAgICB2YXIgcmV0cmlldmVkTWVzc2FnZXNfMSA9IGFjdGlvbi5kYXRhLm1lc3NhZ2VzO1xuICAgICAgICAgICAgdmFyIGNoYW5uZWxOYW1lXzEgPSBhY3Rpb24uZGF0YS5jaGFubmVsTmFtZTtcbiAgICAgICAgICAgIHZhciBjaGFubmVsXzMgPSBleHBvcnRzLmNoYW5uZWxFeGlzdHMoc3RhdGUsIGNoYW5uZWxOYW1lXzEpO1xuICAgICAgICAgICAgaWYgKCFjaGFubmVsXzMpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVW5rbm93biBjaGFubmVsIHdoaWxlIGFkZGluZyByZXRyaWV2ZWQgY2hhbm5lbCBtZXNzYWdlcycsIGFjdGlvbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG5ld0NoYW5uZWxzXzMgPSBzdGF0ZS5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICBpZiAoYy5uYW1lID09PSBjaGFubmVsTmFtZV8xKVxuICAgICAgICAgICAgICAgICAgICBjLm1lc3NhZ2VzID0gcmV0cmlldmVkTWVzc2FnZXNfMS5jb25jYXQoYy5tZXNzYWdlcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBuZXdDaGFubmVsc18zO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgY2hhbm5lbHNBY3Rpb25zXzEuQUREX1JFQ0VJVkVEX0NIQU5ORUxfTUVTU0FHRToge1xuICAgICAgICAgICAgdmFyIHJlY2VpdmVkTWVzc2FnZV8xID0gYWN0aW9uLmRhdGEubWVzc2FnZTtcbiAgICAgICAgICAgIHZhciBjaGFubmVsTmFtZV8yID0gYWN0aW9uLmRhdGEuY2hhbm5lbE5hbWU7XG4gICAgICAgICAgICB2YXIgY2hhbm5lbF80ID0gZXhwb3J0cy5jaGFubmVsRXhpc3RzKHN0YXRlLCBjaGFubmVsTmFtZV8yKTtcbiAgICAgICAgICAgIGlmICghY2hhbm5lbF80KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Vua25vd24gY2hhbm5lbCB3aGlsZSBhZGRpbmcgcmVjZWl2ZWQgbWVzc2FnZScsIHN0YXRlLCBhY3Rpb24pO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBuZXdDaGFubmVsc180ID0gc3RhdGUubWFwKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgaWYgKGMubmFtZSA9PT0gY2hhbm5lbE5hbWVfMilcbiAgICAgICAgICAgICAgICAgICAgYy5tZXNzYWdlcyA9IGMubWVzc2FnZXMuY29uY2F0KFtyZWNlaXZlZE1lc3NhZ2VfMV0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3Q2hhbm5lbHNfNDtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGNoYW5uZWxzQWN0aW9uc18xLkNMRUFSX0NIQU5ORUxTX0RBVEE6XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufVxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBkZWZhdWx0XzE7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lZMmhoYm01bGJITXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOHVMaTh1TGk4dUxpOXpjbU12ZDJWaUwzSmxaSFZqWlhKekwyTm9ZVzV1Wld4ekxuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCUVVFc09FUkJUM05ETzBGQk1FSjBReXhKUVVGSkxGbEJRVmtzUjBGQlZTeEZRVUZGTEVOQlFVTTdRVUZGYUVJc1VVRkJRU3hoUVVGaExFZEJRVWNzVlVGQlF5eFJRVUV5UWl4RlFVRkZMRmRCUVcxQ08wbEJRekZGTEVsQlFVa3NUMEZCVHl4SFFVRkhMRkZCUVZFc1EwRkJReXhKUVVGSkxFTkJRVVVzVlVGQlF5eERRVUZWTzFGQlEzQkRMRTlCUVU4c1EwRkJReXhEUVVGRExFbEJRVWtzUzBGQlN5eFhRVUZYTEVOQlFVTTdTVUZEYkVNc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFNDeEpRVUZKTEVOQlFVTXNUMEZCVHp0UlFVRkZMRTlCUVU4c1MwRkJTeXhEUVVGRE8wbEJRek5DTEU5QlFVOHNUMEZCVHl4RFFVRkRPMEZCUTI1Q0xFTkJRVU1zUTBGQlFUdEJRVVZFTEcxQ1FVRjVRaXhMUVVFeVFpeEZRVUZGTEUxQlFXTTdTVUZCTTBNc2MwSkJRVUVzUlVGQlFTeHZRa0ZCTWtJN1NVRkRhRVFzVVVGQlR5eE5RVUZOTEVOQlFVTXNTVUZCU1N4RlFVRkZPMUZCUTJoQ0xFdEJRVXNzT0VKQlFWazdXVUZEWWl4UFFVRlBMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zVVVGQlVTeERRVUZETzFGQlEyaERMRXRCUVVzc05FUkJRVEJETEVOQlFVTXNRMEZCUXp0WlFVTTNReXhKUVVGSkxGTkJRVThzUjBGQldTeHhRa0ZCWVN4RFFVRkRMRXRCUVVzc1JVRkJSU3hOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRPMWxCUTJwRkxFbEJRVWtzVjBGQlV5eEhRVUZYTEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1UwRkJVeXhEUVVGRE8xbEJRemxETEVsQlFVa3NRMEZCUXl4VFFVRlBMRVZCUVVVN1owSkJRMVlzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4dlJFRkJiMFFzUlVGQlJTeE5RVUZOTEVOQlFVTXNRMEZCUXp0blFrRkRNVVVzVDBGQlR5eExRVUZMTEVOQlFVTTdZVUZEYUVJN1dVRkRSQ3hKUVVGSkxHRkJRVmNzUjBGQll5eExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkZMRlZCUVVNc1EwRkJWVHRuUWtGREwwTXNTVUZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hMUVVGTExGTkJRVThzUTBGQlF5eEpRVUZKTEVWQlFVVTdiMEpCUTNoQ0xFTkJRVU1zUTBGQlF5eHpRa0ZCYzBJc1NVRkJTU3hYUVVGVExFTkJRVU03YVVKQlEzcERPMmRDUVVORUxFOUJRVThzUTBGQlF5eERRVUZETzFsQlEySXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRTQ3hQUVVGUExHRkJRVmNzUTBGQlF6dFRRVU4wUWp0UlFVTkVMRXRCUVVzc2JVUkJRV2xETzFsQlEyeERMRWxCUVVrc1QwRkJUeXhIUVVGWkxIRkNRVUZoTEVOQlFVTXNTMEZCU3l4RlFVRkZMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zVjBGQlZ5eERRVUZETEVOQlFVTTdXVUZEY2tVc1NVRkJTU3hEUVVGRExFOUJRVThzUlVGQlJUdG5Ra0ZEVml4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExEWkRRVUUyUXl4RlFVRkZMRTFCUVUwc1EwRkJReXhEUVVGRE8yZENRVU51UlN4UFFVRlBMRXRCUVVzc1EwRkJRenRoUVVOb1FqdFpRVU5FTEVsQlFVa3NWMEZCVnl4SFFVRmpMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVVVzVlVGQlF5eERRVUZWTzJkQ1FVTXZReXhKUVVGSkxFTkJRVU1zUTBGQlF5eEpRVUZKTEV0QlFVc3NUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhYUVVGWExFVkJRVVU3YjBKQlEzQkRMRU5CUVVNc1EwRkJReXh0UWtGQmJVSXNSMEZCUnl4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVlVzUTBGQlF6dHBRa0ZEYkVRN1owSkJRMFFzVDBGQlR5eERRVUZETEVOQlFVTTdXVUZEWWl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOSUxFOUJRVThzVjBGQlZ5eERRVUZETzFGQlEzWkNMRXRCUVVzc0swTkJRVFpDTEVOQlFVTXNRMEZCUXp0WlFVTm9ReXhKUVVGSkxGTkJRVThzUjBGQldTeHhRa0ZCWVN4RFFVRkRMRXRCUVVzc1JVRkJSU3hOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEZkQlFWY3NRMEZCUXl4RFFVRkRPMWxCUTNKRkxFbEJRVWtzVTBGQlR5eEhRVUZaTEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRE8xbEJRek5ETEVsQlFVa3NRMEZCUXl4VFFVRlBMRVZCUVVVN1owSkJRMVlzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4blJFRkJaMFFzUlVGQlJTeE5RVUZOTEVOQlFVTXNRMEZCUXp0blFrRkRkRVVzVDBGQlR5eExRVUZMTEVOQlFVTTdZVUZEYUVJN1dVRkRSQ3hKUVVGSkxHRkJRVmNzUjBGQll5eExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkZMRlZCUVVNc1EwRkJWVHRuUWtGREwwTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1NVRkJTU3hMUVVGTExFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNWMEZCVnp0dlFrRkRiRU1zUTBGQlF5eERRVUZETEdWQlFXVXNSMEZCUnl4VFFVRlBMRU5CUVVNN1owSkJRMmhETEU5QlFVOHNRMEZCUXl4RFFVRkRPMWxCUTJJc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRFNDeFBRVUZQTEdGQlFWY3NRMEZCUXp0VFFVTjBRanRSUVVORUxFdEJRVXNzWjBSQlFUaENMRU5CUVVNc1EwRkJRenRaUVVOcVF5eEpRVUZKTEcxQ1FVRnBRaXhIUVVGakxFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRPMWxCUTNoRUxFbEJRVWtzWVVGQlZ5eEhRVUZYTEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1YwRkJWeXhEUVVGRE8xbEJRMnhFTEVsQlFVa3NVMEZCVHl4SFFVRlpMSEZDUVVGaExFTkJRVU1zUzBGQlN5eEZRVUZGTEdGQlFWY3NRMEZCUXl4RFFVRkRPMWxCUTNwRUxFbEJRVWNzUTBGQlF5eFRRVUZQTEVWQlFVVTdaMEpCUTFRc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eDVSRUZCZVVRc1JVRkJSU3hOUVVGTkxFTkJRVU1zUTBGQlF6dG5Ra0ZETDBVc1QwRkJUeXhMUVVGTExFTkJRVU03WVVGRGFFSTdXVUZEUkN4SlFVRkpMR0ZCUVZjc1IwRkJZeXhMUVVGTExFTkJRVU1zUjBGQlJ5eERRVUZGTEZWQlFVTXNRMEZCVlR0blFrRkRMME1zU1VGQlNTeERRVUZETEVOQlFVTXNTVUZCU1N4TFFVRkxMR0ZCUVZjN2IwSkJRM1JDTEVOQlFVTXNRMEZCUXl4UlFVRlJMRWRCUVVjc2JVSkJRV2xDTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF6dG5Ra0ZEZEVRc1QwRkJUeXhEUVVGRExFTkJRVU03V1VGRFlpeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTklMRTlCUVU4c1lVRkJWeXhEUVVGRE8xTkJRM1JDTzFGQlEwUXNTMEZCU3l3NFEwRkJORUlzUTBGQlF5eERRVUZETzFsQlF5OUNMRWxCUVVrc2FVSkJRV1VzUjBGQlJ5eE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJRenRaUVVNeFF5eEpRVUZKTEdGQlFWY3NSMEZCUnl4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF6dFpRVU14UXl4SlFVRkpMRk5CUVU4c1IwRkJXU3h4UWtGQllTeERRVUZETEV0QlFVc3NSVUZCUlN4aFFVRlhMRU5CUVVNc1EwRkJRenRaUVVONlJDeEpRVUZKTEVOQlFVTXNVMEZCVHl4RlFVRkZPMmRDUVVOV0xFOUJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNLME5CUVN0RExFVkJRVVVzUzBGQlN5eEZRVUZGTEUxQlFVMHNRMEZCUXl4RFFVRkRPMmRDUVVNMVJTeFBRVUZQTEV0QlFVc3NRMEZCUXp0aFFVTm9RanRaUVVORUxFbEJRVWtzWVVGQlZ5eEhRVUZqTEV0QlFVc3NRMEZCUXl4SFFVRkhMRU5CUVVNc1ZVRkJReXhEUVVGVk8yZENRVU01UXl4SlFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFdEJRVXNzWVVGQlZ6dHZRa0ZEY2tJc1EwRkJReXhEUVVGRExGRkJRVkVzUjBGQlJ5eERRVUZETEVOQlFVTXNVVUZCVVN4RFFVRkRMRTFCUVUwc1EwRkJReXhEUVVGRExHbENRVUZsTEVOQlFVTXNRMEZCUXl4RFFVRkRPMmRDUVVOMFJDeFBRVUZQTEVOQlFVTXNRMEZCUXp0WlFVTmlMRU5CUVVNc1EwRkJReXhEUVVGQk8xbEJRMFlzVDBGQlR5eGhRVUZYTEVOQlFVTTdVMEZEZEVJN1VVRkRSQ3hMUVVGTExIRkRRVUZ0UWp0WlFVTndRaXhQUVVGUExFVkJRVVVzUTBGQlF6dFJRVU5rTzFsQlEwa3NUMEZCVHl4TFFVRkxMRU5CUVVNN1MwRkRjRUk3UVVGRFRDeERRVUZETzBGQmFrWkVMQ3RDUVdsR1F5SjkiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgY2hhdFVzZXJzQWN0aW9uc18xID0gcmVxdWlyZShcIi4uL2FjdGlvbnMvY2hhdFVzZXJzQWN0aW9uc1wiKTtcbnZhciBpbml0aWFsU3RhdGUgPSB7fTtcbmZ1bmN0aW9uIGRlZmF1bHRfMShzdGF0ZSwgYWN0aW9uKSB7XG4gICAgaWYgKHN0YXRlID09PSB2b2lkIDApIHsgc3RhdGUgPSBpbml0aWFsU3RhdGU7IH1cbiAgICB2YXIgX2E7XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIGNoYXRVc2Vyc0FjdGlvbnNfMS5VUERBVEVfQ0hBVF9VU0VSUzpcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb24uZGF0YS51c2VycztcbiAgICAgICAgY2FzZSBjaGF0VXNlcnNBY3Rpb25zXzEuQUREX0NIQVRfVVNFUjpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgKF9hID0ge30sXG4gICAgICAgICAgICAgICAgX2FbYWN0aW9uLmRhdGEudXNlci5lbWFpbF0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IGFjdGlvbi5kYXRhLnVzZXIucm9sZSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogYWN0aW9uLmRhdGEudXNlci5uYW1lLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgX2EpKTtcbiAgICAgICAgY2FzZSBjaGF0VXNlcnNBY3Rpb25zXzEuUkVNT1ZFX0NIQVRfVVNFUjpcbiAgICAgICAgICAgIHZhciBjbG9uZSA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKTtcbiAgICAgICAgICAgIGRlbGV0ZSBjbG9uZVthY3Rpb24uZGF0YS5lbWFpbF07XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufVxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBkZWZhdWx0XzE7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lZMmhoZEZWelpYSnpMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dkxpNHZjM0pqTDNkbFlpOXlaV1IxWTJWeWN5OWphR0YwVlhObGNuTXVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanM3UVVGRFFTeG5SVUZEZFVNN1FVRmxka01zU1VGQlNTeFpRVUZaTEVkQlFWVXNSVUZGZWtJc1EwRkJRVHRCUVVWRUxHMUNRVUYzUWl4TFFVRXlRaXhGUVVGRkxFMUJRV2xDTzBsQlFUbERMSE5DUVVGQkxFVkJRVUVzYjBKQlFUSkNPenRKUVVNdlF5eFJRVUZQTEUxQlFVMHNRMEZCUXl4SlFVRkpMRVZCUVVVN1VVRkRhRUlzUzBGQlN5eHZRMEZCYVVJN1dVRkRiRUlzVDBGQlR5eE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJRenRSUVVNM1FpeExRVUZMTEdkRFFVRmhPMWxCUTJRc1QwRkJUeXhOUVVGTkxFTkJRVU1zVFVGQlRTeERRVUZETEVWQlFVVXNSVUZCUlN4TFFVRkxPMmRDUVVNeFFpeEhRVUZETEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzU1VGQlJ6dHZRa0ZEZEVJc1NVRkJTU3hGUVVGRkxFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrN2IwSkJRek5DTEVsQlFVa3NSVUZCUlN4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTzJsQ1FVTTVRanR2UWtGRFNDeERRVUZETzFGQlExQXNTMEZCU3l4dFEwRkJaMEk3V1VGRGFrSXNTVUZCU1N4TFFVRkxMRWRCUVZVc1RVRkJUU3hEUVVGRExFMUJRVTBzUTBGQlF5eEZRVUZGTEVWQlFVVXNTMEZCU3l4RFFVRkRMRU5CUVVNN1dVRkROVU1zVDBGQlR5eExRVUZMTEVOQlFVTXNUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlFUdFJRVU51UXp0WlFVTkpMRTlCUVU4c1MwRkJTeXhEUVVGRE8wdEJRM0JDTzBGQlEwd3NRMEZCUXp0QlFXcENSQ3dyUWtGcFFrTWlmUT09IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEgPSByZXF1aXJlKFwiLi4vYWN0aW9ucy9ub3RpZmljYXRpb25zQWN0aW9uc1wiKTtcbnZhciBpbml0aWFsU3RhdGUgPSB7XG4gICAgZXJyb3JzOiBbXSxcbiAgICBpbmZvczogW11cbn07XG5mdW5jdGlvbiBkZWZhdWx0XzEoc3RhdGUsIGFjdGlvbikge1xuICAgIGlmIChzdGF0ZSA9PT0gdm9pZCAwKSB7IHN0YXRlID0gaW5pdGlhbFN0YXRlOyB9XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuQUREX0VSUk9SOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGVycm9yczogc3RhdGUuZXJyb3JzLmNvbmNhdChbYWN0aW9uLmRhdGFdKSB9KTtcbiAgICAgICAgY2FzZSBub3RpZmljYXRpb25zQWN0aW9uc18xLlJFTU9WRV9FUlJPUjpcbiAgICAgICAgICAgIHZhciBuZXdFcnJvcnNBcnJheSA9IHN0YXRlLmVycm9ycy5zbGljZSgpO1xuICAgICAgICAgICAgbmV3RXJyb3JzQXJyYXkuc3BsaWNlKGFjdGlvbi5kYXRhLCAxKTtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBlcnJvcnM6IG5ld0Vycm9yc0FycmF5IH0pO1xuICAgICAgICBjYXNlIG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuQ0xFQVJfRVJST1JTOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGVycm9yczogW10gfSk7XG4gICAgICAgIGNhc2Ugbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5BRERfSU5GTzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBpbmZvczogc3RhdGUuaW5mb3MuY29uY2F0KFthY3Rpb24uZGF0YV0pIH0pO1xuICAgICAgICBjYXNlIG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuUkVNT1ZFX0lORk86XG4gICAgICAgICAgICB2YXIgbmV3SW5mb3NBcnJheSA9IHN0YXRlLmluZm9zLnNsaWNlKCk7XG4gICAgICAgICAgICBuZXdJbmZvc0FycmF5LnNwbGljZShhY3Rpb24uZGF0YSwgMSk7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgaW5mb3M6IG5ld0luZm9zQXJyYXkgfSk7XG4gICAgICAgIGNhc2Ugbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5DTEVBUl9JTkZPUzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBpbmZvczogW10gfSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufVxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBkZWZhdWx0XzE7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2libTkwYVdacFkyRjBhVzl1Y3k1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUx5NHVMeTR1TDNOeVl5OTNaV0l2Y21Wa2RXTmxjbk12Ym05MGFXWnBZMkYwYVc5dWN5NTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenRCUVVGQkxIZEZRVU15UXp0QlFWY3pReXhKUVVGSkxGbEJRVmtzUjBGQlZUdEpRVU4wUWl4TlFVRk5MRVZCUVVVc1JVRkJSVHRKUVVOV0xFdEJRVXNzUlVGQlJTeEZRVUZGTzBOQlExb3NRMEZCUVR0QlFVVkVMRzFDUVVGM1FpeExRVUV5UWl4RlFVRkZMRTFCUVdNN1NVRkJNME1zYzBKQlFVRXNSVUZCUVN4dlFrRkJNa0k3U1VGREwwTXNVVUZCVHl4TlFVRk5MRU5CUVVNc1NVRkJTU3hGUVVGRk8xRkJRMmhDTEV0QlFVc3NaME5CUVZNN1dVRkRWaXhQUVVGUExFMUJRVTBzUTBGQlF5eE5RVUZOTEVOQlFVTXNSVUZCUlN4RlFVRkZMRXRCUVVzc1JVRkJSU3hGUVVGRExFMUJRVTBzUlVGQlJTeExRVUZMTEVOQlFVTXNUVUZCVFN4RFFVRkRMRTFCUVUwc1EwRkJReXhEUVVGRExFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RlFVRkRMRU5CUVVNc1EwRkJRenRSUVVOc1JpeExRVUZMTEcxRFFVRlpPMWxCUTJJc1NVRkJTU3hqUVVGakxFZEJRVWNzUzBGQlN5eERRVUZETEUxQlFVMHNRMEZCUXl4TFFVRkxMRVZCUVVVc1EwRkJRenRaUVVNeFF5eGpRVUZqTEVOQlFVTXNUVUZCVFN4RFFVRkRMRTFCUVUwc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEZEVNc1QwRkJUeXhOUVVGTkxFTkJRVU1zVFVGQlRTeERRVUZETEVWQlFVVXNSVUZCUlN4TFFVRkxMRVZCUVVVc1JVRkJReXhOUVVGTkxFVkJRVVVzWTBGQll5eEZRVUZETEVOQlFVTXNRMEZCUXp0UlFVTTVSQ3hMUVVGTExHMURRVUZaTzFsQlEySXNUMEZCVHl4TlFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExFVkJRVVVzUlVGQlJTeExRVUZMTEVWQlFVY3NSVUZCUXl4TlFVRk5MRVZCUVVVc1JVRkJSU3hGUVVGRExFTkJRVU1zUTBGQlF6dFJRVU51UkN4TFFVRkxMQ3RDUVVGUk8xbEJRMVFzVDBGQlR5eE5RVUZOTEVOQlFVTXNUVUZCVFN4RFFVRkRMRVZCUVVVc1JVRkJSU3hMUVVGTExFVkJRVVVzUlVGQlF5eExRVUZMTEVWQlFVVXNTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF5eE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1JVRkJReXhEUVVGRExFTkJRVU03VVVGRGFFWXNTMEZCU3l4clEwRkJWenRaUVVOYUxFbEJRVWtzWVVGQllTeEhRVUZITEV0QlFVc3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhGUVVGRkxFTkJRVU03V1VGRGVFTXNZVUZCWVN4RFFVRkRMRTFCUVUwc1EwRkJReXhOUVVGTkxFTkJRVU1zU1VGQlNTeEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTNKRExFOUJRVThzVFVGQlRTeERRVUZETEUxQlFVMHNRMEZCUXl4RlFVRkZMRVZCUVVVc1MwRkJTeXhGUVVGRkxFVkJRVVVzUzBGQlN5eEZRVUZGTEdGQlFXRXNSVUZCUlN4RFFVRkRMRU5CUVVNN1VVRkRPVVFzUzBGQlN5eHJRMEZCVnp0WlFVTmFMRTlCUVU4c1RVRkJUU3hEUVVGRExFMUJRVTBzUTBGQlF5eEZRVUZGTEVWQlFVVXNTMEZCU3l4RlFVRkZMRVZCUVVNc1MwRkJTeXhGUVVGRkxFVkJRVVVzUlVGQlF5eERRVUZETEVOQlFVTTdVVUZEYWtRN1dVRkRTU3hQUVVGUExFdEJRVXNzUTBGQlF6dExRVU53UWp0QlFVTk1MRU5CUVVNN1FVRnlRa1FzSzBKQmNVSkRJbjA9IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIHNpZGViYXJBY3Rpb25zXzEgPSByZXF1aXJlKFwiLi4vYWN0aW9ucy9zaWRlYmFyQWN0aW9uc1wiKTtcbnZhciBpbml0aWFsU3RhdGUgPSB7XG4gICAgb3BlbjogdHJ1ZVxufTtcbmZ1bmN0aW9uIGRlZmF1bHRfMShzdGF0ZSwgYWN0aW9uKSB7XG4gICAgaWYgKHN0YXRlID09PSB2b2lkIDApIHsgc3RhdGUgPSBpbml0aWFsU3RhdGU7IH1cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2Ugc2lkZWJhckFjdGlvbnNfMS5UT0dHTEVfU0lERUJBUl9PUEVOOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IG9wZW46ICFzdGF0ZS5vcGVuIH0pO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn1cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZGVmYXVsdF8xO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYzJsa1pXSmhjaTVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUx5NHVMM055WXk5M1pXSXZjbVZrZFdObGNuTXZjMmxrWldKaGNpNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenRCUVVOQkxEUkVRVUZuUlR0QlFVMW9SU3hKUVVGSkxGbEJRVmtzUjBGQlZUdEpRVU4wUWl4SlFVRkpMRVZCUVVVc1NVRkJTVHREUVVOaUxFTkJRVUU3UVVGRlJDeHRRa0ZCZDBJc1MwRkJNa0lzUlVGQlJTeE5RVUZqTzBsQlFUTkRMSE5DUVVGQkxFVkJRVUVzYjBKQlFUSkNPMGxCUXk5RExGRkJRVkVzVFVGQlRTeERRVUZETEVsQlFVa3NSVUZCUlR0UlFVTnFRaXhMUVVGTExHOURRVUZ0UWp0WlFVTndRaXhQUVVGUExFMUJRVTBzUTBGQlF5eE5RVUZOTEVOQlFVTXNSVUZCUlN4RlFVRkZMRXRCUVVzc1JVRkJSU3hGUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETEV0QlFVc3NRMEZCUXl4SlFVRkpMRVZCUVVNc1EwRkJReXhEUVVGRE8xRkJRM3BFTzFsQlEwa3NUMEZCVHl4TFFVRkxMRU5CUVVNN1MwRkRjRUk3UVVGRFRDeERRVUZETzBGQlVFUXNLMEpCVDBNaWZRPT0iLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgc29ja2V0QWN0aW9uc18xID0gcmVxdWlyZShcIi4uL2FjdGlvbnMvc29ja2V0QWN0aW9uc1wiKTtcbnZhciBpbml0aWFsU3RhdGUgPSB7XG4gICAgaW86IG51bGwsXG4gICAgY29ubmVjdGVkOiBmYWxzZSxcbiAgICBjb25uZWN0ZWRVc2VyRW1haWxzOiBbXVxufTtcbmZ1bmN0aW9uIGRlZmF1bHRfMShzdGF0ZSwgYWN0aW9uKSB7XG4gICAgaWYgKHN0YXRlID09PSB2b2lkIDApIHsgc3RhdGUgPSBpbml0aWFsU3RhdGU7IH1cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2Ugc29ja2V0QWN0aW9uc18xLklOSVRfV0VCU09DS0VUOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGlvOiBhY3Rpb24uZGF0YS5pbyB9KTtcbiAgICAgICAgY2FzZSBzb2NrZXRBY3Rpb25zXzEuU0VUX1NPQ0tFVF9DT05ORUNURUQ6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgY29ubmVjdGVkOiBhY3Rpb24uZGF0YS5jb25uZWN0ZWQgfSk7XG4gICAgICAgIGNhc2Ugc29ja2V0QWN0aW9uc18xLlNFVF9TT0NLRVRfQ09OTkVDVEVEX1VTRVJTOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGNvbm5lY3RlZFVzZXJFbWFpbHM6IGFjdGlvbi5kYXRhLnVzZXJFbWFpbHMgfSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufVxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBkZWZhdWx0XzE7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2ljMjlqYTJWMExtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZMaTR2TGk0dmMzSmpMM2RsWWk5eVpXUjFZMlZ5Y3k5emIyTnJaWFF1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRkhRU3d3UkVGSGIwTTdRVUZSY0VNc1NVRkJTU3haUVVGWkxFZEJRVlU3U1VGRGRFSXNSVUZCUlN4RlFVRkZMRWxCUVVrN1NVRkRVaXhUUVVGVExFVkJRVVVzUzBGQlN6dEpRVU5vUWl4dFFrRkJiVUlzUlVGQlJTeEZRVUZGTzBOQlF6RkNMRU5CUVVFN1FVRkZSQ3h0UWtGQmQwSXNTMEZCTWtJc1JVRkJSU3hOUVVGcFFqdEpRVUU1UXl4elFrRkJRU3hGUVVGQkxHOUNRVUV5UWp0SlFVTXZReXhSUVVGUExFMUJRVTBzUTBGQlF5eEpRVUZKTEVWQlFVVTdVVUZEYUVJc1MwRkJTeXc0UWtGQll6dFpRVU5tTEU5QlFVOHNUVUZCVFN4RFFVRkRMRTFCUVUwc1EwRkJReXhGUVVGRkxFVkJRVVVzUzBGQlN5eEZRVUZGTEVWQlFVTXNSVUZCUlN4RlFVRkZMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlJTeEZRVUZETEVOQlFVTXNRMEZCUXp0UlFVTXhSQ3hMUVVGTExHOURRVUZ2UWp0WlFVTnlRaXhQUVVGUExFMUJRVTBzUTBGQlF5eE5RVUZOTEVOQlFVTXNSVUZCUlN4RlFVRkZMRXRCUVVzc1JVRkJSU3hGUVVGRExGTkJRVk1zUlVGQlJTeE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRk5CUVZNc1JVRkJReXhEUVVGRExFTkJRVU03VVVGRGVFVXNTMEZCU3l3d1EwRkJNRUk3V1VGRE0wSXNUMEZCVHl4TlFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExFVkJRVVVzUlVGQlJTeExRVUZMTEVWQlFVVXNSVUZCUXl4dFFrRkJiVUlzUlVGQlJTeE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVZVc1JVRkJSU3hEUVVGRExFTkJRVUU3VVVGRGJrWTdXVUZEU1N4UFFVRlBMRXRCUVVzc1EwRkJRenRMUVVOd1FqdEJRVU5NTEVOQlFVTTdRVUZZUkN3clFrRlhReUo5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIHVzZXJBY3Rpb25zXzEgPSByZXF1aXJlKFwiLi4vYWN0aW9ucy91c2VyQWN0aW9uc1wiKTtcbnZhciBpbml0aWFsU3RhdGUgPSB7XG4gICAgYXV0aG9yaXplZDogZmFsc2UsXG4gICAgZW1haWw6IGZhbHNlLFxuICAgIG5hbWU6IGZhbHNlLFxuICAgIHJvbGU6IGZhbHNlLFxuICAgIGp3dDogZmFsc2UsXG59O1xuZnVuY3Rpb24gZGVmYXVsdF8xKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBpZiAoc3RhdGUgPT09IHZvaWQgMCkgeyBzdGF0ZSA9IGluaXRpYWxTdGF0ZTsgfVxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSB1c2VyQWN0aW9uc18xLlNFVF9BVVRIT1JJWkVEOlxuICAgICAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb24uZGF0YSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YSBtdXN0IGJlIGJvb2xlYW4gZm9yIFNFVF9BVVRIT1JJWkVEIGFjdGlvbicpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhY3Rpb24uZGF0YSA9PT0gZmFsc2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGF1dGhvcml6ZWQ6IGZhbHNlLCBlbWFpbDogZmFsc2UgfSk7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgYXV0aG9yaXplZDogYWN0aW9uLmRhdGEgfSk7XG4gICAgICAgIGNhc2UgdXNlckFjdGlvbnNfMS5TRVRfVVNFUjpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgYWN0aW9uLmRhdGEpO1xuICAgICAgICBjYXNlIHVzZXJBY3Rpb25zXzEuTE9HT1VUX1VTRVI6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGF1dGhvcml6ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG5hbWU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVtYWlsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICByb2xlOiBmYWxzZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSB1c2VyQWN0aW9uc18xLlNFVF9KV1Q6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgdG9rZW46IGFjdGlvbi5kYXRhIH0pO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn1cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZGVmYXVsdF8xO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pZFhObGNpNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1THk0dUwzTnlZeTkzWldJdmNtVmtkV05sY25NdmRYTmxjaTUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3p0QlFVRkJMSE5FUVVGelJqdEJRV1YwUml4SlFVRkpMRmxCUVZrc1IwRkJWenRKUVVOMlFpeFZRVUZWTEVWQlFVVXNTMEZCU3p0SlFVTnFRaXhMUVVGTExFVkJRVVVzUzBGQlN6dEpRVU5hTEVsQlFVa3NSVUZCUlN4TFFVRkxPMGxCUTFnc1NVRkJTU3hGUVVGRkxFdEJRVXM3U1VGRFdDeEhRVUZITEVWQlFVVXNTMEZCU3p0RFFVTmlMRU5CUVVFN1FVRkhSQ3h0UWtGQmQwSXNTMEZCTWtJc1JVRkJSU3hOUVVGak8wbEJRVE5ETEhOQ1FVRkJMRVZCUVVFc2IwSkJRVEpDTzBsQlF5OURMRkZCUVZFc1RVRkJUU3hEUVVGRExFbEJRVWtzUlVGQlJUdFJRVU5xUWl4TFFVRkxMRFJDUVVGak8xbEJRMllzU1VGQlNTeFBRVUZQTEUxQlFVMHNRMEZCUXl4SlFVRkpMRXRCUVVzc1UwRkJVeXhGUVVGRk8yZENRVU5zUXl4UFFVRlBMRU5CUVVNc1MwRkJTeXhEUVVGRExHZEVRVUZuUkN4RFFVRkRMRU5CUVVNN1owSkJRMmhGTEU5QlFVOHNTMEZCU3l4RFFVRkRPMkZCUTJoQ08xbEJRMFFzU1VGQlNTeE5RVUZOTEVOQlFVTXNTVUZCU1N4TFFVRkxMRXRCUVVzN1owSkJRM0pDTEU5QlFVOHNUVUZCVFN4RFFVRkRMRTFCUVUwc1EwRkJReXhGUVVGRkxFVkJRVVVzUzBGQlN5eEZRVUZGTEVWQlFVTXNWVUZCVlN4RlFVRkZMRXRCUVVzc1JVRkJSU3hMUVVGTExFVkJRVVVzUzBGQlN5eEZRVUZETEVOQlFVTXNRMEZCUXp0WlFVTjJSU3hQUVVGUExFMUJRVTBzUTBGQlF5eE5RVUZOTEVOQlFVTXNSVUZCUlN4RlFVRkZMRXRCUVVzc1JVRkJSU3hGUVVGRExGVkJRVlVzUlVGQlJTeE5RVUZOTEVOQlFVTXNTVUZCU1N4RlFVRkRMRU5CUVVNc1EwRkJRenRSUVVNdlJDeExRVUZMTEhOQ1FVRlJPMWxCUTFRc1QwRkJUeXhOUVVGTkxFTkJRVU1zVFVGQlRTeERRVUZETEVWQlFVVXNSVUZCUlN4TFFVRkxMRVZCUVVVc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFGQlEycEVMRXRCUVVzc2VVSkJRVmM3V1VGRFdpeFBRVUZQTzJkQ1FVTklMRlZCUVZVc1JVRkJSU3hMUVVGTE8yZENRVU5xUWl4SlFVRkpMRVZCUVVVc1MwRkJTenRuUWtGRFdDeExRVUZMTEVWQlFVVXNTMEZCU3p0blFrRkRXaXhKUVVGSkxFVkJRVVVzUzBGQlN6dGhRVU5rTEVOQlFVRTdVVUZEVEN4TFFVRkxMSEZDUVVGUE8xbEJRMUlzVDBGQlR5eE5RVUZOTEVOQlFVTXNUVUZCVFN4RFFVRkRMRVZCUVVVc1JVRkJSU3hMUVVGTExFVkJRVVVzUlVGQlF5eExRVUZMTEVWQlFVVXNUVUZCVFN4RFFVRkRMRWxCUVVrc1JVRkJReXhEUVVGRExFTkJRVU03VVVGRE1VUTdXVUZEU1N4UFFVRlBMRXRCUVVzc1EwRkJRenRMUVVOd1FqdEJRVU5NTEVOQlFVTTdRVUY0UWtRc0swSkJkMEpESW4wPSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciByZWR1eF8xID0gcmVxdWlyZShcInJlZHV4XCIpO1xudmFyIHJlZHV4X3RodW5rXzEgPSByZXF1aXJlKFwicmVkdXgtdGh1bmtcIik7XG52YXIgcmVkdXhfbG9nZ2VyXzEgPSByZXF1aXJlKFwicmVkdXgtbG9nZ2VyXCIpO1xudmFyIHVzZXJfMSA9IHJlcXVpcmUoXCIuL3JlZHVjZXJzL3VzZXJcIik7XG52YXIgY2hhbm5lbHNfMSA9IHJlcXVpcmUoXCIuL3JlZHVjZXJzL2NoYW5uZWxzXCIpO1xudmFyIG5vdGlmaWNhdGlvbnNfMSA9IHJlcXVpcmUoXCIuL3JlZHVjZXJzL25vdGlmaWNhdGlvbnNcIik7XG52YXIgc2lkZWJhcl8xID0gcmVxdWlyZShcIi4vcmVkdWNlcnMvc2lkZWJhclwiKTtcbnZhciBzb2NrZXRfMSA9IHJlcXVpcmUoXCIuL3JlZHVjZXJzL3NvY2tldFwiKTtcbnZhciBjaGF0VXNlcnNfMSA9IHJlcXVpcmUoXCIuL3JlZHVjZXJzL2NoYXRVc2Vyc1wiKTtcbnZhciBlbnYgPSByZXF1aXJlKCcuLi8uLi9lbnYnKTtcbmV4cG9ydHMucm9vdFJlZHVjZXIgPSByZWR1eF8xLmNvbWJpbmVSZWR1Y2Vycyh7XG4gICAgdXNlcjogdXNlcl8xW1wiZGVmYXVsdFwiXSxcbiAgICBjaGFubmVsczogY2hhbm5lbHNfMVtcImRlZmF1bHRcIl0sXG4gICAgbm90aWZpY2F0aW9uczogbm90aWZpY2F0aW9uc18xW1wiZGVmYXVsdFwiXSxcbiAgICBzaWRlYmFyOiBzaWRlYmFyXzFbXCJkZWZhdWx0XCJdLFxuICAgIHNvY2tldDogc29ja2V0XzFbXCJkZWZhdWx0XCJdLFxuICAgIGNoYXRVc2VyczogY2hhdFVzZXJzXzFbXCJkZWZhdWx0XCJdLFxufSk7XG5leHBvcnRzLm1pZGRsZXdhcmUgPSBlbnYucHJvZHVjdGlvbiB8fCBlbnYuZGlzYWJsZVJlZHV4TG9nZ2luZyA/XG4gICAgcmVkdXhfMS5hcHBseU1pZGRsZXdhcmUocmVkdXhfdGh1bmtfMVtcImRlZmF1bHRcIl0pIDogcmVkdXhfMS5hcHBseU1pZGRsZXdhcmUocmVkdXhfdGh1bmtfMVtcImRlZmF1bHRcIl0sIHJlZHV4X2xvZ2dlcl8xLmNyZWF0ZUxvZ2dlcigpKTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gcmVkdXhfMS5jcmVhdGVTdG9yZShleHBvcnRzLnJvb3RSZWR1Y2VyLCBleHBvcnRzLm1pZGRsZXdhcmUpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYzNSdmNtVXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOHVMaTh1TGk5emNtTXZkMlZpTDNOMGIzSmxMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3TzBGQlFVRXNLMEpCUVRSR08wRkJRelZHTERKRFFVRnhRenRCUVVOeVF5dzJRMEZCTUVNN1FVRkZNVU1zZDBOQlFXZEZPMEZCUTJoRkxHZEVRVUUwUlR0QlFVTTFSU3d3UkVGQk1rWTdRVUZETTBZc09FTkJRWGxGTzBGQlEzcEZMRFJEUVVGelJUdEJRVU4wUlN4clJFRkJLMFU3UVVGRkwwVXNTVUZCVFN4SFFVRkhMRWRCUVVjc1QwRkJUeXhEUVVGRExGZEJRVmNzUTBGQlF5eERRVUZETzBGQlYzQkNMRkZCUVVFc1YwRkJWeXhIUVVGWkxIVkNRVUZsTEVOQlFVTTdTVUZEYUVRc1NVRkJTU3hGUVVGRkxHbENRVUZYTzBsQlEycENMRkZCUVZFc1JVRkJSU3h4UWtGQlpUdEpRVU42UWl4aFFVRmhMRVZCUVVVc01FSkJRVzlDTzBsQlEyNURMRTlCUVU4c1JVRkJSU3h2UWtGQll6dEpRVU4yUWl4TlFVRk5MRVZCUVVVc2JVSkJRV0U3U1VGRGNrSXNVMEZCVXl4RlFVRkZMSE5DUVVGblFqdERRVU01UWl4RFFVRkRMRU5CUVVNN1FVRkZWU3hSUVVGQkxGVkJRVlVzUjBGRGJrSXNSMEZCUnl4RFFVRkRMRlZCUVZVc1NVRkJTU3hIUVVGSExFTkJRVU1zYlVKQlFXMUNMRU5CUVVNc1EwRkJRenRKUVVNelF5eDFRa0ZCWlN4RFFVRkRMSGRDUVVGVkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNkVUpCUVdVc1EwRkJReXgzUWtGQlZTeEZRVUZGTERKQ1FVRlpMRVZCUVVVc1EwRkJReXhEUVVGRE8wRkJSVGxGTEhGQ1FVRmxMRzFDUVVGWExFTkJRVU1zYlVKQlFWY3NSVUZCUlN4clFrRkJWU3hEUVVGRExFTkJRVU1pZlE9PSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBzZXJ2ZXJfMSA9IHJlcXVpcmUoXCIuLi9zcmMvc2VydmVyL3NlcnZlclwiKTtcbmV4cG9ydHMuYXBwID0gc2VydmVyXzEuYXBwO1xudmFyIFVzZXJfMSA9IHJlcXVpcmUoXCIuLi9zcmMvc2VydmVyL21vZGVscy9Vc2VyXCIpO1xudmFyIGRyb3BBbGxDb2xsZWN0aW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgVXNlcl8xW1wiZGVmYXVsdFwiXS5kZWxldGVNYW55KHt9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBwLnRoZW4oKVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH0pO1xufTtcbmV4cG9ydHMuZHJvcEFsbENvbGxlY3Rpb25zID0gZHJvcEFsbENvbGxlY3Rpb25zO1xudmFyIE5vdEltcGxlbWVudGVkRXJyb3IgPSBuZXcgRXJyb3IoJ1Rlc3Qgbm90IGltcGxlbWVudGVkJyk7XG5leHBvcnRzLk5vdEltcGxlbWVudGVkRXJyb3IgPSBOb3RJbXBsZW1lbnRlZEVycm9yO1xuYmVmb3JlKCdhbGwgdGVzdHMnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgIGNvbnNvbGUubG9nKHByb2Nlc3MudmVyc2lvbik7XG4gICAgc2VydmVyXzEuY29ubi5vbignY29ubmVjdGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnc2VydmVyIHN0YXJ0ZWQnKTtcbiAgICAgICAgZG9uZSgpO1xuICAgIH0pO1xufSk7XG5iZWZvcmVFYWNoKCdyZXNldCBEQicsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgZHJvcEFsbENvbGxlY3Rpb25zKCkudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBkb25lKCk7IH0pO1xufSk7XG5hZnRlcignYWxsIHRlc3RzJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICBkcm9wQWxsQ29sbGVjdGlvbnMoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0Nsb3NpbmcgY29ubmVjdGlvbnMnKTtcbiAgICAgICAgc2VydmVyXzEuY29ubi5jbG9zZSgpO1xuICAgICAgICBkb25lKCk7XG4gICAgfSk7XG59KTtcbnJlcXVpcmUoJy4vd2ViL3Rlc3RTdG9yZScpO1xucmVxdWlyZSgnLi93ZWIvdGVzdEFzeW5jQWN0aW9ucycpO1xucmVxdWlyZSgnLi9zZXJ2ZXIvdGVzdEF1dGhDb250cm9sbGVyJyk7XG5yZXF1aXJlKCcuL3NlcnZlci90ZXN0VXNlckNvbnRyb2xsZXInKTtcbnJlcXVpcmUoJy4vc2VydmVyL3Rlc3RNZXNzYWdlQ29udHJvbGxlcicpO1xucmVxdWlyZSgnLi9zZXJ2ZXIvdGVzdENoYW5uZWxDb250cm9sbGVyJyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhVzVrWlhndWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOTBaWE4wY3k5cGJtUmxlQzUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3p0QlFVRkJMQ3REUVVGcFJEdEJRV3RFZUVNc1kwRnNSRTBzV1VGQlJ5eERRV3RFVGp0QlFXcEVXaXhyUkVGQk5rTTdRVUZGTjBNc1NVRkJUU3hyUWtGQmEwSXNSMEZCUnp0SlFVTjJRaXhKUVVGSkxFTkJRVU1zUjBGQlJ5eEpRVUZKTEU5QlFVOHNRMEZCUXl4VlFVRkRMRTlCUVU4c1JVRkJSU3hOUVVGTk8xRkJRMmhETEdsQ1FVRkpMRU5CUVVNc1ZVRkJWU3hEUVVGRExFVkJRVVVzUlVGQlJTeFZRVUZETEVkQlFWRTdXVUZEZWtJc1NVRkJTU3hIUVVGSE8yZENRVUZGTEU5QlFVOHNUVUZCVFN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8xbEJRelZDTEU5QlFVOHNUMEZCVHl4RlFVRkZMRU5CUVVNN1VVRkRja0lzUTBGQlF5eERRVUZETEVOQlFVRTdTVUZEVGl4RFFVRkRMRU5CUVVNc1EwRkJRVHRKUVVOR0xFOUJRVThzUTBGQlF5eERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRTlCUVVzc1EwRkJRU3hEUVVGRExGVkJRVU1zUjBGQlVUdFJRVU16UWl4UFFVRlBMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzBsQlEzWkNMRU5CUVVNc1EwRkJReXhEUVVGRE8wRkJRMUFzUTBGQlF5eERRVUZCTzBGQmNVTmhMR2RFUVVGclFqdEJRVzVEYUVNc1NVRkJUU3h0UWtGQmJVSXNSMEZCUnl4SlFVRkpMRXRCUVVzc1EwRkJReXh6UWtGQmMwSXNRMEZCUXl4RFFVRkRPMEZCYlVNMVFpeHJSRUZCYlVJN1FVRnFRM0pFTEUxQlFVMHNRMEZCUXl4WFFVRlhMRVZCUVVVc1ZVRkJVeXhKUVVGSk8wbEJSVGRDTEU5QlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc1QwRkJUeXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzBsQlF6ZENMR0ZCUVVrc1EwRkJReXhGUVVGRkxFTkJRVU1zVjBGQlZ5eEZRVUZGTzFGQlEycENMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zWjBKQlFXZENMRU5CUVVNc1EwRkJRenRSUVVNNVFpeEpRVUZKTEVWQlFVVXNRMEZCUXp0SlFVTllMRU5CUVVNc1EwRkJReXhEUVVGRE8wRkJRMUFzUTBGQlF5eERRVUZETEVOQlFVTTdRVUZEU0N4VlFVRlZMRU5CUVVNc1ZVRkJWU3hGUVVGRkxGVkJRVk1zU1VGQlNUdEpRVVZvUXl4clFrRkJhMElzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4alFVRk5MRTlCUVVFc1NVRkJTU3hGUVVGRkxFVkJRVTRzUTBGQlRTeERRVUZETEVOQlFVTTdRVUZETlVNc1EwRkJReXhEUVVGRExFTkJRVU03UVVGRFNDeExRVUZMTEVOQlFVTXNWMEZCVnl4RlFVRkZMRlZCUVZNc1NVRkJTVHRKUVVVMVFpeHJRa0ZCYTBJc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF6dFJRVU4wUWl4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExIRkNRVUZ4UWl4RFFVRkRMRU5CUVVNN1VVRkRia01zWVVGQlNTeERRVUZETEV0QlFVc3NSVUZCUlN4RFFVRkRPMUZCUTJJc1NVRkJTU3hGUVVGRkxFTkJRVU03U1VGRFdDeERRVUZETEVOQlFVTXNRMEZCUXp0QlFVTlFMRU5CUVVNc1EwRkJReXhEUVVGQk8wRkJTMFlzVDBGQlR5eERRVUZETEdsQ1FVRnBRaXhEUVVGRExFTkJRVU03UVVGRE0wSXNUMEZCVHl4RFFVRkRMSGRDUVVGM1FpeERRVUZETEVOQlFVTTdRVUZIYkVNc1QwRkJUeXhEUVVGRExEWkNRVUUyUWl4RFFVRkRMRU5CUVVNN1FVRkRka01zVDBGQlR5eERRVUZETERaQ1FVRTJRaXhEUVVGRExFTkJRVU03UVVGRGRrTXNUMEZCVHl4RFFVRkRMR2REUVVGblF5eERRVUZETEVOQlFVTTdRVUZETVVNc1QwRkJUeXhEUVVGRExHZERRVUZuUXl4RFFVRkRMRU5CUVVNaWZRPT0iLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgcmVxdWVzdCA9IHJlcXVpcmUoXCJzdXBlcnRlc3RcIik7XG52YXIgYmNyeXB0anNfMSA9IHJlcXVpcmUoXCJiY3J5cHRqc1wiKTtcbnZhciBfXzEgPSByZXF1aXJlKFwiLi4vXCIpO1xudmFyIFVzZXJfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvc2VydmVyL21vZGVscy9Vc2VyXCIpO1xudmFyIGNoYWlfMSA9IHJlcXVpcmUoXCJjaGFpXCIpO1xudmFyIHNlc3Npb24gPSByZXF1aXJlKCdzdXBlcnRlc3Qtc2Vzc2lvbicpO1xuZGVzY3JpYmUoJ0F1dGggQ29udHJvbGxlcicsIGZ1bmN0aW9uICgpIHtcbiAgICBkZXNjcmliZSgnUE9TVCAvYXBpL3YxL2xvZ2luJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICBfXzEuZHJvcEFsbENvbGxlY3Rpb25zKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHVzZXIgPSBuZXcgVXNlcl8xW1wiZGVmYXVsdFwiXSh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdBZHJpYW4nLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogYmNyeXB0anNfMS5oYXNoU3luYygndGVzdCcpLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiAndXNlcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdXNlci5zYXZlKCkudGhlbihmdW5jdGlvbiAodXNlcikgeyByZXR1cm4gZG9uZSgpOyB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGxvZ2luIHRoZSB1c2VyJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS9sb2dpbicpXG4gICAgICAgICAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgICAgIGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICd0ZXN0J1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMClcbiAgICAgICAgICAgICAgICAuZW5kKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdGhlIGxvZ2dlZC1pbiB1c2VyIGRldGFpbHMnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL2xvZ2luJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICAgICAgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJ3Rlc3QnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwKVxuICAgICAgICAgICAgICAgIC5lbmQoZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICB2YXIganNvbiA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwoanNvbi5lbWFpbCwgJ3Rlc3RAdGVzdC5jb20nKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKGpzb24ucm9sZSwgJ3VzZXInKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKGpzb24ubmFtZSwgJ0FkcmlhbicpO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYW4gZXJyb3IgaWYgdGhlIGVtYWlsIGRvZXMgbm90IGV4aXN0JywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS9sb2dpbicpXG4gICAgICAgICAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgICAgIGVtYWlsOiAndGVzdC5kb2VzLm5vdC5leGl0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJ3Rlc3QnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAxKVxuICAgICAgICAgICAgICAgIC5lbmQoZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICB2YXIganNvbiA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwoanNvbi5lcnJvciwgJ0ludmFsaWQgZW1haWwgb3IgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGFuIGVycm9yIGlmIHRoZSBwYXNzd29yZCBkb2VzIG5vdCBtYXRjaCB0aGUgaGFzaCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgICAgICBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAndGVzdC1pbnZhbGlkLXBhc3N3b3JkJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMSlcbiAgICAgICAgICAgICAgICAuZW5kKGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgdmFyIGpzb24gPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKGpzb24uZXJyb3IsICdJbnZhbGlkIGVtYWlsIG9yIHBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBhbiBlcnJvciBpZiB0aGUgZW1haWwgb3IgcGFzc3dvcmQgaXMgbWlzc2luZycsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJ3Rlc3QnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwKVxuICAgICAgICAgICAgICAgIC5lbmQoZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICB2YXIganNvbiA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwoanNvbi5lcnJvciwgJ1BsZWFzZSBzdXBwbHkgYW4gZW1haWwgYW5kIHBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS9sb2dpbicpXG4gICAgICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyB9KVxuICAgICAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMClcbiAgICAgICAgICAgICAgICAgICAgLmVuZChmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBqc29uID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwoanNvbi5lcnJvciwgJ1BsZWFzZSBzdXBwbHkgYW4gZW1haWwgYW5kIHBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYW4gZXJyb3IgaWYgdGhlIGVtYWlsIGlzIG5vdCB2YWxpZCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICdub3QgYW4gZW1haWxAYXNkZicsIHBhc3N3b3JkOiAnMTIzNCcgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMClcbiAgICAgICAgICAgICAgICAuZW5kKGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgdmFyIGpzb24gPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKGpzb24uZXJyb3IsICdOb3QgYSB2YWxpZCBlbWFpbCBhZGRyZXNzJyk7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdQT1NUIC9hcGkvdjEvcmVnaXN0ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIF9fMS5kcm9wQWxsQ29sbGVjdGlvbnMoKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRvbmUoKTsgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJlZ2lzdGVyIGEgdXNlcicsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApLnBvc3QoJy9hcGkvdjEvcmVnaXN0ZXInKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICd0ZXN0QHRlc3QuY29tJywgcGFzc3dvcmQ6ICd0ZXN0JyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwKVxuICAgICAgICAgICAgICAgIC5lbmQoZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICBVc2VyXzFbXCJkZWZhdWx0XCJdLmZpbmRCeUVtYWlsKCd0ZXN0QHRlc3QuY29tJykuZXhlYygpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmZhaWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGNyZWF0ZSBhbiBhZG1pbiB1c2VyIGlmIG5vIHVzZXJzIGV4aXN0JywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcCkucG9zdCgnL2FwaS92MS9yZWdpc3RlcicpXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nLCBwYXNzd29yZDogJ3Rlc3QnIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgyMDApXG4gICAgICAgICAgICAgICAgLmVuZChmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIFVzZXJfMVtcImRlZmF1bHRcIl0uZmluZEJ5RW1haWwoJ3Rlc3RAdGVzdC5jb20nKS5leGVjKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZmFpbCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwodXNlci5yb2xlLCAnYWRtaW4nKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGNyZWF0ZSBhIHJlZ3VsYXIgdXNlciBpZiB1c2VycyBleGlzdCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICB2YXIgdSA9IG5ldyBVc2VyXzFbXCJkZWZhdWx0XCJdKHtcbiAgICAgICAgICAgICAgICBuYW1lOiAndGVzdCcsXG4gICAgICAgICAgICAgICAgZW1haWw6ICdhZG1pbkB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICdwYXNzd29yZCcsXG4gICAgICAgICAgICAgICAgcm9sZTogJ2FkbWluJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB1LnNhdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApLnBvc3QoJy9hcGkvdjEvcmVnaXN0ZXInKVxuICAgICAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsIHBhc3N3b3JkOiAndGVzdCcgfSlcbiAgICAgICAgICAgICAgICAgICAgLmV4cGVjdCgyMDApXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICBVc2VyXzFbXCJkZWZhdWx0XCJdLmZpbmRCeUVtYWlsKCd0ZXN0QHRlc3QuY29tJykuZXhlYygpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZmFpbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbCh1c2VyLnJvbGUsICd1c2VyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGFuIGVycm9yIGlmIGVtYWlsIG9yIHBhc3N3b3JkIG5vdCBwcm92aWRlZCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApLnBvc3QoJy9hcGkvdjEvcmVnaXN0ZXInKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwKVxuICAgICAgICAgICAgICAgIC5lbmQoZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICB2YXIganNvbiA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwoanNvbi5lcnJvciwgJ1BsZWFzZSBzdXBwbHkgYW4gZW1haWwgYW5kIHBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKS5wb3N0KCcvYXBpL3YxL3JlZ2lzdGVyJylcbiAgICAgICAgICAgICAgICAgICAgLnNlbmQoeyBwYXNzd29yZDogJzEyMycgfSlcbiAgICAgICAgICAgICAgICAgICAgLmV4cGVjdCg0MDApXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICB2YXIganNvbiA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKGpzb24uZXJyb3IsICdQbGVhc2Ugc3VwcGx5IGFuIGVtYWlsIGFuZCBwYXNzd29yZCcpO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGFuIGVycm9yIGlmIG5vdCBhIHZhbGlkIGVtYWlsJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcCkucG9zdCgnL2FwaS92MS9yZWdpc3RlcicpXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ25vdCBhbiBlbWFpbCBAIGFzZGxma2o7bCcsIHBhc3N3b3JkOiAnMTIzNCcgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMClcbiAgICAgICAgICAgICAgICAuZW5kKGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgdmFyIGpzb24gPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKGpzb24uZXJyb3IsICdOb3QgYSB2YWxpZCBlbWFpbCBhZGRyZXNzJyk7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdQT1NUIC9hcGkvdjEvbG9nb3V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdGVzdFNlc3Npb247XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHRlc3RTZXNzaW9uID0gc2Vzc2lvbihfXzEuYXBwKTtcbiAgICAgICAgICAgIF9fMS5kcm9wQWxsQ29sbGVjdGlvbnMoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdXNlciA9IG5ldyBVc2VyXzFbXCJkZWZhdWx0XCJdKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0FkcmlhbicsXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBiY3J5cHRqc18xLmhhc2hTeW5jKCd0ZXN0JyksXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6ICd1c2VyJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB1c2VyLnNhdmUoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7IHJldHVybiBkb25lKCk7IH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgbG9nIG91dCB0aGUgdXNlcicsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICB0ZXN0U2Vzc2lvbi5wb3N0KCcvYXBpL3YxL2xvZ2luJylcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsIHBhc3N3b3JkOiAndGVzdCcgfSkuZW5kKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIHRlc3RTZXNzaW9uLmdldCgnL2FwaS92MS91c2VyJykuc2VuZCgpLmV4cGVjdCgyMDApLmVuZChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICB0ZXN0U2Vzc2lvbi5nZXQoJy9hcGkvdjEvbG9nb3V0Jykuc2VuZCgpLmV4cGVjdCgyMDApLmVuZChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXN0U2Vzc2lvbi5nZXQoJy9hcGkvdjEvdXNlcicpLnNlbmQoKS5leHBlY3QoNDAxKS5lbmQoZG9uZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdQT1NUIC9hcGkvdjEvdmVyaWZ5RW1haWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIF9fMS5kcm9wQWxsQ29sbGVjdGlvbnMoKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRvbmUoKTsgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHZlcmlmeSBhbiBlbWFpbCBnaXZlbiB0aGUgY29ycmVjdCB2ZXJpZmljYXRpb24gbGluaycpO1xuICAgICAgICBpdCgnc2hvdWxkIG5vdCB2ZXJpZnkgYW4gZW1haWwgd2l0aCBhbiBpbmNvcnJlY3QgdmVyaWZpY2F0aW9uIGxpbmsnKTtcbiAgICB9KTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pZEdWemRFRjFkR2hEYjI1MGNtOXNiR1Z5TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dkxpNHZkR1Z6ZEhNdmMyVnlkbVZ5TDNSbGMzUkJkWFJvUTI5dWRISnZiR3hsY2k1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96dEJRVUZCTEcxRFFVRnhRenRCUVVOeVF5eHhRMEZCYjBNN1FVRkRjRU1zZVVKQlFUaERPMEZCUXpsRExIRkVRVUV5UkR0QlFVTXpSQ3cyUWtGQk9FSTdRVUZGT1VJc1NVRkJUU3hQUVVGUExFZEJRVWNzVDBGQlR5eERRVUZETEcxQ1FVRnRRaXhEUVVGRExFTkJRVU03UVVGRk4wTXNVVUZCVVN4RFFVRkRMR2xDUVVGcFFpeEZRVUZGTzBsQlEzaENMRkZCUVZFc1EwRkJReXh2UWtGQmIwSXNSVUZCUlR0UlFVTXpRaXhWUVVGVkxFTkJRVU1zVlVGQlZTeEpRVUZKTzFsQlEzSkNMSE5DUVVGclFpeEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRPMmRDUVVOMFFpeEpRVUZKTEVsQlFVa3NSMEZCVlN4SlFVRkpMR2xDUVVGSkxFTkJRVU03YjBKQlEzWkNMRWxCUVVrc1JVRkJSU3hSUVVGUk8yOUNRVU5rTEV0QlFVc3NSVUZCUlN4bFFVRmxPMjlDUVVOMFFpeFJRVUZSTEVWQlFVVXNiVUpCUVZFc1EwRkJReXhOUVVGTkxFTkJRVU03YjBKQlF6RkNMRWxCUVVrc1JVRkJSU3hOUVVGTk8ybENRVU5tTEVOQlFVTXNRMEZCUXp0blFrRkRTQ3hKUVVGSkxFTkJRVU1zU1VGQlNTeEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVVNc1NVRkJWeXhKUVVGTExFOUJRVUVzU1VGQlNTeEZRVUZGTEVWQlFVNHNRMEZCVFN4RFFVRkRMRU5CUVVNc1QwRkJTeXhEUVVGQkxFTkJRVU1zVlVGQlF5eEhRVUZSTzI5Q1FVTnlSQ3hOUVVGTkxFZEJRVWNzUTBGQlF6dG5Ra0ZEWkN4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOUUxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExQXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hGUVVGRkxFTkJRVU1zZFVKQlFYVkNMRVZCUVVVc1ZVRkJVeXhKUVVGSk8xbEJRM0pETEU5QlFVOHNRMEZCUXl4UFFVRkhMRU5CUVVNN2FVSkJRMUFzU1VGQlNTeERRVUZETEdWQlFXVXNRMEZCUXp0cFFrRkRja0lzU1VGQlNTeERRVUZETzJkQ1FVTkdMRXRCUVVzc1JVRkJSU3hsUVVGbE8yZENRVU4wUWl4UlFVRlJMRVZCUVVVc1RVRkJUVHRoUVVOdVFpeERRVUZETzJsQ1FVTkVMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU03YVVKQlExZ3NSMEZCUnl4RFFVRkRMRlZCUVVNc1IwRkJVVHRuUWtGRFZpeEpRVUZKTEVkQlFVYzdiMEpCUTBnc1QwRkJUeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTTdaMEpCUTNKQ0xFbEJRVWtzUlVGQlJTeERRVUZETzFsQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRXQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl3d1EwRkJNRU1zUlVGQlJTeFZRVUZUTEVsQlFVazdXVUZEZUVRc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF6dHBRa0ZEVUN4SlFVRkpMRU5CUVVNc1pVRkJaU3hEUVVGRE8ybENRVU55UWl4SlFVRkpMRU5CUVVNN1owSkJRMFlzUzBGQlN5eEZRVUZGTEdWQlFXVTdaMEpCUTNSQ0xGRkJRVkVzUlVGQlJTeE5RVUZOTzJGQlEyNUNMRU5CUVVNN2FVSkJRMFFzVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXp0cFFrRkRXQ3hIUVVGSExFTkJRVU1zVlVGQlF5eEhRVUZSTEVWQlFVVXNSMEZCY1VJN1owSkJRMnBETEVsQlFVa3NSMEZCUnp0dlFrRkRTQ3hQUVVGUExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0blFrRkRja0lzU1VGQlNTeEpRVUZKTEVkQlFWRXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdaMEpCUTNKRExHRkJRVTBzUTBGQlF5eFhRVUZYTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1JVRkJSU3hsUVVGbExFTkJRVU1zUTBGQlF6dG5Ra0ZEYUVRc1lVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RlFVRkZMRTFCUVUwc1EwRkJReXhEUVVGRE8yZENRVU4wUXl4aFFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVXNVVUZCVVN4RFFVRkRMRU5CUVVNN1owSkJRM2hETEVsQlFVa3NSVUZCUlN4RFFVRkRPMWxCUTFnc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFdDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXh2UkVGQmIwUXNSVUZCUlN4VlFVRlRMRWxCUVVrN1dVRkRiRVVzVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXp0cFFrRkRVQ3hKUVVGSkxFTkJRVU1zWlVGQlpTeERRVUZETzJsQ1FVTnlRaXhKUVVGSkxFTkJRVU03WjBKQlEwWXNTMEZCU3l4RlFVRkZMRFpDUVVFMlFqdG5Ra0ZEY0VNc1VVRkJVU3hGUVVGRkxFMUJRVTA3WVVGRGJrSXNRMEZCUXp0cFFrRkRSQ3hOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETzJsQ1FVTllMRWRCUVVjc1EwRkJReXhWUVVGRExFZEJRVkVzUlVGQlJTeEhRVUZ4UWp0blFrRkRha01zU1VGQlNTeEhRVUZITzI5Q1FVTklMRTlCUVU4c1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzJkQ1FVTnlRaXhKUVVGSkxFbEJRVWtzUjBGQlVTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dG5Ra0ZEY2tNc1lVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RlFVRkZMREpDUVVFeVFpeERRVUZETEVOQlFVTTdaMEpCUXpWRUxFbEJRVWtzUlVGQlJTeERRVUZETzFsQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRXQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl4blJVRkJaMFVzUlVGQlJTeFZRVUZUTEVsQlFVazdXVUZET1VVc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF6dHBRa0ZEVUN4SlFVRkpMRU5CUVVNc1pVRkJaU3hEUVVGRE8ybENRVU55UWl4SlFVRkpMRU5CUVVNN1owSkJRMFlzUzBGQlN5eEZRVUZGTEdWQlFXVTdaMEpCUTNSQ0xGRkJRVkVzUlVGQlJTeDFRa0ZCZFVJN1lVRkRjRU1zUTBGQlF6dHBRa0ZEUkN4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRE8ybENRVU5ZTEVkQlFVY3NRMEZCUXl4VlFVRkRMRWRCUVZFc1JVRkJSU3hIUVVGeFFqdG5Ra0ZEYWtNc1NVRkJTU3hIUVVGSE8yOUNRVU5JTEU5QlFVOHNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8yZENRVU55UWl4SlFVRkpMRWxCUVVrc1IwRkJVU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRuUWtGRGNrTXNZVUZCVFN4RFFVRkRMRmRCUVZjc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eEZRVUZGTERKQ1FVRXlRaXhEUVVGRExFTkJRVU03WjBKQlF6VkVMRWxCUVVrc1JVRkJSU3hEUVVGRE8xbEJRMWdzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEV0N4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5dzBSRUZCTkVRc1JVRkJSU3hWUVVGVExFbEJRVWs3V1VGRE1VVXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJRenRwUWtGRFVDeEpRVUZKTEVOQlFVTXNaVUZCWlN4RFFVRkRPMmxDUVVOeVFpeEpRVUZKTEVOQlFVTTdaMEpCUTBZc1VVRkJVU3hGUVVGRkxFMUJRVTA3WVVGRGJrSXNRMEZCUXp0cFFrRkRSQ3hOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETzJsQ1FVTllMRWRCUVVjc1EwRkJReXhWUVVGRExFZEJRVkVzUlVGQlJTeEhRVUZ4UWp0blFrRkRha01zU1VGQlNTeEhRVUZITzI5Q1FVTklMRTlCUVU4c1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzJkQ1FVTnlRaXhKUVVGSkxFbEJRVWtzUjBGQlVTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dG5Ra0ZEY2tNc1lVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RlFVRkZMSEZEUVVGeFF5eERRVUZETEVOQlFVTTdaMEpCUTNSRkxFOUJRVThzUTBGQlF5eFBRVUZITEVOQlFVTTdjVUpCUTFBc1NVRkJTU3hEUVVGRExHVkJRV1VzUTBGQlF6dHhRa0ZEY2tJc1NVRkJTU3hEUVVGRExFVkJRVU1zUzBGQlN5eEZRVUZGTEdWQlFXVXNSVUZCUXl4RFFVRkRPM0ZDUVVNNVFpeE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRPM0ZDUVVOWUxFZEJRVWNzUTBGQlF5eFZRVUZETEVkQlFWRXNSVUZCUlN4SFFVRnhRanR2UWtGRGFrTXNTVUZCU1N4SFFVRkhPM2RDUVVOSUxFOUJRVThzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMjlDUVVOeVFpeEpRVUZKTEVsQlFVa3NSMEZCVVN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0dlFrRkRja01zWVVGQlRTeERRVUZETEZkQlFWY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhGUVVGRkxIRkRRVUZ4UXl4RFFVRkRMRU5CUVVNN2IwSkJRM1JGTEVsQlFVa3NSVUZCUlN4RFFVRkRPMmRDUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZCTzFsQlExWXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRXQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl4clJFRkJhMFFzUlVGQlJTeFZRVUZUTEVsQlFVazdXVUZEYUVVc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4bFFVRmxMRU5CUVVNN2FVSkJRemRDTEVsQlFVa3NRMEZCUXl4RlFVRkRMRXRCUVVzc1JVRkJSU3h0UWtGQmJVSXNSVUZCUlN4UlFVRlJMRVZCUVVVc1RVRkJUU3hGUVVGRExFTkJRVU03YVVKQlEzQkVMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU03YVVKQlExZ3NSMEZCUnl4RFFVRkRMRlZCUVVNc1IwRkJVU3hGUVVGRkxFZEJRWEZDTzJkQ1FVTnFReXhKUVVGSkxFZEJRVWM3YjBKQlEwZ3NUMEZCVHl4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU03WjBKQlEzSkNMRWxCUVVrc1NVRkJTU3hIUVVGUkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8yZENRVU55UXl4aFFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVWQlFVVXNNa0pCUVRKQ0xFTkJRVU1zUTBGQlF6dG5Ra0ZETlVRc1NVRkJTU3hGUVVGRkxFTkJRVU03V1VGRFdDeERRVUZETEVOQlFVTXNRMEZCUVR0UlFVTldMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMUFzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEU0N4UlFVRlJMRU5CUVVNc2RVSkJRWFZDTEVWQlFVVTdVVUZET1VJc1ZVRkJWU3hEUVVGRExGVkJRVlVzU1VGQlNUdFpRVU55UWl4elFrRkJhMElzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4alFVRk5MRTlCUVVFc1NVRkJTU3hGUVVGRkxFVkJRVTRzUTBGQlRTeERRVUZETEVOQlFVTTdVVUZETlVNc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEZRVUZGTEVOQlFVTXNkMEpCUVhkQ0xFVkJRVVVzVlVGQlV5eEpRVUZKTzFsQlEzUkRMRTlCUVU4c1EwRkJReXhQUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNhMEpCUVd0Q0xFTkJRVU03YVVKQlEyaERMRWxCUVVrc1EwRkJReXhGUVVGRExFdEJRVXNzUlVGQlJTeGxRVUZsTEVWQlFVVXNVVUZCVVN4RlFVRkZMRTFCUVUwc1JVRkJReXhEUVVGRE8ybENRVU5vUkN4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRE8ybENRVU5ZTEVkQlFVY3NRMEZCUXl4VlFVRkRMRWRCUVZFc1JVRkJSU3hIUVVGeFFqdG5Ra0ZEYWtNc1NVRkJSeXhIUVVGSE8yOUNRVUZGTEU5QlFVOHNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8yZENRVU42UWl4cFFrRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF5eGxRVUZsTEVOQlFVTXNRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlF5eEpRVUZYTzI5Q1FVTjBSQ3hKUVVGSkxFTkJRVU1zU1VGQlNTeEZRVUZGTzNkQ1FVTlFMR0ZCUVUwc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF6dDNRa0ZEWkN4UFFVRlBMRWxCUVVrc1JVRkJSU3hEUVVGRE8zRkNRVU5xUWp0dlFrRkRSQ3hKUVVGSkxFVkJRVVVzUTBGQlF6dG5Ra0ZEV0N4RFFVRkRMRU5CUVVNc1EwRkJReXhQUVVGTExFTkJRVUVzUTBGQlF5eFZRVUZETEVkQlFWRTdiMEpCUTJRc1QwRkJUeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTTdaMEpCUTNKQ0xFTkJRVU1zUTBGQlF5eERRVUZCTzFsQlEwNHNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRXQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl3clEwRkJLME1zUlVGQlJTeFZRVUZWTEVsQlFVazdXVUZET1VRc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4clFrRkJhMElzUTBGQlF6dHBRa0ZEYUVNc1NVRkJTU3hEUVVGRExFVkJRVVVzUzBGQlN5eEZRVUZGTEdWQlFXVXNSVUZCUlN4UlFVRlJMRVZCUVVVc1RVRkJUU3hGUVVGRkxFTkJRVU03YVVKQlEyeEVMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU03YVVKQlExZ3NSMEZCUnl4RFFVRkRMRlZCUVVNc1IwRkJVU3hGUVVGRkxFZEJRWEZDTzJkQ1FVTnFReXhKUVVGSkxFZEJRVWM3YjBKQlFVVXNUMEZCVHl4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU03WjBKQlF6RkNMR2xDUVVGSkxFTkJRVU1zVjBGQlZ5eERRVUZETEdWQlFXVXNRMEZCUXl4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZETEVsQlFWYzdiMEpCUTNSRUxFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVTdkMEpCUTFBc1lVRkJUU3hEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETzNGQ1FVTnFRanR2UWtGRFJDeGhRVUZOTEVOQlFVTXNWMEZCVnl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFVkJRVVVzVDBGQlR5eERRVUZETEVOQlFVTTdiMEpCUTNaRExFbEJRVWtzUlVGQlJTeERRVUZETzJkQ1FVTllMRU5CUVVNc1EwRkJReXhEUVVGRExFOUJRVXNzUTBGQlFTeERRVUZETEZWQlFVTXNSMEZCVVR0dlFrRkRaQ3hQUVVGUExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0blFrRkRja0lzUTBGQlF5eERRVUZETEVOQlFVRTdXVUZEVGl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NSVUZCUlN4RFFVRkRMRFpEUVVFMlF5eEZRVUZGTEZWQlFWTXNTVUZCU1R0WlFVTXpSQ3hKUVVGSkxFTkJRVU1zUjBGQlJ5eEpRVUZKTEdsQ1FVRkpMRU5CUVVNN1owSkJRMklzU1VGQlNTeEZRVUZGTEUxQlFVMDdaMEpCUTFvc1MwRkJTeXhGUVVGRkxHZENRVUZuUWp0blFrRkRka0lzVVVGQlVTeEZRVUZGTEZWQlFWVTdaMEpCUTNCQ0xFbEJRVWtzUlVGQlJTeFBRVUZQTzJGQlEyaENMRU5CUVVNc1EwRkJRVHRaUVVOR0xFTkJRVU1zUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNN1owSkJRMVlzVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhyUWtGQmEwSXNRMEZCUXp0eFFrRkRhRU1zU1VGQlNTeERRVUZETEVWQlFVVXNTMEZCU3l4RlFVRkZMR1ZCUVdVc1JVRkJSU3hSUVVGUkxFVkJRVVVzVFVGQlRTeEZRVUZGTEVOQlFVTTdjVUpCUTJ4RUxFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTTdjVUpCUTFnc1IwRkJSeXhEUVVGRExGVkJRVU1zUjBGQlVTeEZRVUZGTEVkQlFYRkNPMjlDUVVOcVF5eEpRVUZKTEVkQlFVYzdkMEpCUVVVc1QwRkJUeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTTdiMEpCUXpGQ0xHbENRVUZKTEVOQlFVTXNWMEZCVnl4RFFVRkRMR1ZCUVdVc1EwRkJReXhEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRkRMRWxCUVZjN2QwSkJRM1JFTEVsQlFVa3NRMEZCUXl4SlFVRkpMRVZCUVVVN05FSkJRMUFzWVVGQlRTeERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRPM2xDUVVOcVFqdDNRa0ZEUkN4aFFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVXNUVUZCVFN4RFFVRkRMRU5CUVVNN2QwSkJRM1JETEVsQlFVa3NSVUZCUlN4RFFVRkRPMjlDUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVc3NRMEZCUVN4RFFVRkRMRlZCUVVNc1IwRkJVVHQzUWtGRFpDeFBRVUZQTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenR2UWtGRGNrSXNRMEZCUXl4RFFVRkRMRU5CUVVFN1owSkJRMDRzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEV0N4RFFVRkRMRU5CUVVNc1EwRkJRVHRSUVVOT0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NSVUZCUlN4RFFVRkRMREJFUVVFd1JDeEZRVUZGTEZWQlFWTXNTVUZCU1R0WlFVTjRSU3hQUVVGUExFTkJRVU1zVDBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMR3RDUVVGclFpeERRVUZETzJsQ1FVTm9ReXhKUVVGSkxFTkJRVU1zUlVGQlJTeExRVUZMTEVWQlFVVXNaVUZCWlN4RlFVRkZMRU5CUVVNN2FVSkJRMmhETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNN2FVSkJRMWdzUjBGQlJ5eERRVUZETEZWQlFVTXNSMEZCVVN4RlFVRkZMRWRCUVhGQ08yZENRVU5xUXl4SlFVRkpMRWRCUVVjN2IwSkJRVVVzVDBGQlR5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1owSkJRekZDTEVsQlFVa3NTVUZCU1N4SFFVRlJMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMmRDUVVOeVF5eGhRVUZOTEVOQlFVTXNWMEZCVnl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFVkJRVVVzY1VOQlFYRkRMRU5CUVVNc1EwRkJRenRuUWtGRGRFVXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eHJRa0ZCYTBJc1EwRkJRenR4UWtGRGFFTXNTVUZCU1N4RFFVRkRMRVZCUVVNc1VVRkJVU3hGUVVGRkxFdEJRVXNzUlVGQlF5eERRVUZETzNGQ1FVTjJRaXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETzNGQ1FVTllMRWRCUVVjc1EwRkJReXhWUVVGRExFZEJRVkVzUlVGQlJTeEhRVUZ4UWp0dlFrRkRha01zU1VGQlJ5eEhRVUZITzNkQ1FVRkZMRTlCUVU4c1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzI5Q1FVTjZRaXhKUVVGSkxFbEJRVWtzUjBGQlVTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dHZRa0ZEY2tNc1lVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RlFVRkZMSEZEUVVGeFF5eERRVUZETEVOQlFVTTdiMEpCUTNSRkxFbEJRVWtzUlVGQlJTeERRVUZETzJkQ1FVTllMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMWdzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEV0N4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5dzJRMEZCTmtNc1JVRkJSU3hWUVVGVExFbEJRVWs3V1VGRE0wUXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eHJRa0ZCYTBJc1EwRkJRenRwUWtGRGFFTXNTVUZCU1N4RFFVRkRMRVZCUVVNc1MwRkJTeXhGUVVGRkxEQkNRVUV3UWl4RlFVRkZMRkZCUVZFc1JVRkJSU3hOUVVGTkxFVkJRVU1zUTBGQlF6dHBRa0ZETTBRc1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF6dHBRa0ZEV0N4SFFVRkhMRU5CUVVNc1ZVRkJReXhIUVVGUkxFVkJRVVVzUjBGQmNVSTdaMEpCUTJwRExFbEJRVWtzUjBGQlJ6dHZRa0ZCUlN4UFFVRlBMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dG5Ra0ZETVVJc1NVRkJTU3hKUVVGSkxFZEJRVkVzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03WjBKQlEzSkRMR0ZCUVUwc1EwRkJReXhYUVVGWExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NSVUZCUlN3eVFrRkJNa0lzUTBGQlF5eERRVUZETzJkQ1FVTTFSQ3hKUVVGSkxFVkJRVVVzUTBGQlF6dFpRVU5ZTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTFnc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFVDeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTklMRkZCUVZFc1EwRkJReXh4UWtGQmNVSXNSVUZCUlR0UlFVTTFRaXhKUVVGSkxGZEJRV2RDTEVOQlFVTTdVVUZEY2tJc1ZVRkJWU3hEUVVGRExGVkJRVlVzU1VGQlNUdFpRVU55UWl4WFFVRlhMRWRCUVVjc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF5eERRVUZETzFsQlF6TkNMSE5DUVVGclFpeEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRPMmRDUVVOMFFpeEpRVUZKTEVsQlFVa3NSMEZCVlN4SlFVRkpMR2xDUVVGSkxFTkJRVU03YjBKQlEzWkNMRWxCUVVrc1JVRkJSU3hSUVVGUk8yOUNRVU5rTEV0QlFVc3NSVUZCUlN4bFFVRmxPMjlDUVVOMFFpeFJRVUZSTEVWQlFVVXNiVUpCUVZFc1EwRkJReXhOUVVGTkxFTkJRVU03YjBKQlF6RkNMRWxCUVVrc1JVRkJSU3hOUVVGTk8ybENRVU5tTEVOQlFVTXNRMEZCUXp0blFrRkRTQ3hKUVVGSkxFTkJRVU1zU1VGQlNTeEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVVNc1NVRkJWeXhKUVVGTExFOUJRVUVzU1VGQlNTeEZRVUZGTEVWQlFVNHNRMEZCVFN4RFFVRkRMRU5CUVVNc1QwRkJTeXhEUVVGQkxFTkJRVU1zVlVGQlF5eEhRVUZSTzI5Q1FVTnlSQ3hOUVVGTkxFZEJRVWNzUTBGQlF6dG5Ra0ZEWkN4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOUUxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExQXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hGUVVGRkxFTkJRVU1zZVVKQlFYbENMRVZCUVVVc1ZVRkJVeXhKUVVGSk8xbEJRM1pETEZkQlFWY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1pVRkJaU3hEUVVGRE8ybENRVU0xUWl4SlFVRkpMRU5CUVVNc1JVRkJReXhMUVVGTExFVkJRVVVzWlVGQlpTeEZRVUZGTEZGQlFWRXNSVUZCUlN4TlFVRk5MRVZCUVVNc1EwRkJReXhEUVVGRExFZEJRVWNzUTBGQlF5eFZRVUZETEVkQlFWRTdaMEpCUXpORUxFbEJRVWtzUjBGQlJ6dHZRa0ZCUlN4UFFVRlBMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dG5Ra0ZETVVJc1YwRkJWeXhEUVVGRExFZEJRVWNzUTBGQlF5eGpRVUZqTEVOQlFVTXNRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNSMEZCUnl4RFFVRkRMRlZCUVVNc1IwRkJVVHR2UWtGRE5VUXNTVUZCU1N4SFFVRkhPM2RDUVVGRkxFOUJRVThzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMjlDUVVNeFFpeFhRVUZYTEVOQlFVTXNSMEZCUnl4RFFVRkRMR2RDUVVGblFpeERRVUZETEVOQlFVTXNTVUZCU1N4RlFVRkZMRU5CUVVNc1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVkQlFVY3NRMEZCUXl4VlFVRkRMRWRCUVZFN2QwSkJRemxFTEVsQlFVa3NSMEZCUnpzMFFrRkJSU3hQUVVGUExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0M1FrRkRNVUlzVjBGQlZ5eERRVUZETEVkQlFVY3NRMEZCUXl4alFVRmpMRU5CUVVNc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzI5Q1FVTnFSU3hEUVVGRExFTkJRVU1zUTBGQlFUdG5Ra0ZEVGl4RFFVRkRMRU5CUVVNc1EwRkJRVHRaUVVOT0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5JTEZGQlFWRXNRMEZCUXl3d1FrRkJNRUlzUlVGQlJUdFJRVU5xUXl4VlFVRlZMRU5CUVVNc1ZVRkJWU3hKUVVGSk8xbEJRM0pDTEhOQ1FVRnJRaXhGUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETEdOQlFVMHNUMEZCUVN4SlFVRkpMRVZCUVVVc1JVRkJUaXhEUVVGTkxFTkJRVU1zUTBGQlF6dFJRVU0xUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5dzBSRUZCTkVRc1EwRkJReXhEUVVGRE8xRkJRMnBGTEVWQlFVVXNRMEZCUXl4blJVRkJaMFVzUTBGQlF5eERRVUZETzBsQlEzcEZMRU5CUVVNc1EwRkJReXhEUVVGRE8wRkJRMUFzUTBGQlF5eERRVUZETEVOQlFVTWlmUT09IiwiLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pZEdWemRFTm9ZVzV1Wld4RGIyNTBjbTlzYkdWeUxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZMaTR2ZEdWemRITXZjMlZ5ZG1WeUwzUmxjM1JEYUdGdWJtVnNRMjl1ZEhKdmJHeGxjaTUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pSW4wPSIsIi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWRHVnpkRTFsYzNOaFoyVkRiMjUwY205c2JHVnlMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dmRHVnpkSE12YzJWeWRtVnlMM1JsYzNSTlpYTnpZV2RsUTI5dWRISnZiR3hsY2k1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaUluMD0iLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgcmVxdWVzdCA9IHJlcXVpcmUoXCJzdXBlcnRlc3RcIik7XG52YXIgYmNyeXB0anNfMSA9IHJlcXVpcmUoXCJiY3J5cHRqc1wiKTtcbnZhciBjaGFpXzEgPSByZXF1aXJlKFwiY2hhaVwiKTtcbnZhciBfXzEgPSByZXF1aXJlKFwiLi4vXCIpO1xudmFyIFVzZXJfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvc2VydmVyL21vZGVscy9Vc2VyXCIpO1xuZGVzY3JpYmUoJ1VzZXIgQ29udHJvbGxlcicsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdG9rZW47XG4gICAgdmFyIHVzZXJJbmZvID0ge1xuICAgICAgICBuYW1lOiAnQWRyaWFuJyxcbiAgICAgICAgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgcGFzc3dvcmQ6ICd0ZXN0JyxcbiAgICAgICAgcm9sZTogJ2FkbWluJ1xuICAgIH07XG4gICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICBfXzEuZHJvcEFsbENvbGxlY3Rpb25zKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdXNlciA9IG5ldyBVc2VyXzFbXCJkZWZhdWx0XCJdKHtcbiAgICAgICAgICAgICAgICBuYW1lOiB1c2VySW5mby5uYW1lLFxuICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VySW5mby5lbWFpbCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogYmNyeXB0anNfMS5oYXNoU3luYyh1c2VySW5mby5wYXNzd29yZCksXG4gICAgICAgICAgICAgICAgcm9sZTogdXNlckluZm8ucm9sZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdXNlci5zYXZlKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiB1c2VySW5mby5lbWFpbCwgcGFzc3dvcmQ6IHVzZXJJbmZvLnBhc3N3b3JkIH0pXG4gICAgICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwKVxuICAgICAgICAgICAgICAgICAgICAuZW5kKGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IHJlcy5nZXQoJ3gtYWNjZXNzLXRva2VuJyk7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNOb3ROdWxsKHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc1N0cmluZyh0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNOb3RFbXB0eSh0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnR0VUIC9hcGkvdjEvdXNlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBmZXRjaCB0aGUgbG9nZ2VkIGluIHVzZXInLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5nZXQoJy9hcGkvdjEvdXNlcicpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMCwgZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKHJlcy5ib2R5Lm5hbWUsIHVzZXJJbmZvLm5hbWUpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwocmVzLmJvZHkuZW1haWwsIHVzZXJJbmZvLmVtYWlsKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKHJlcy5ib2R5LnJvbGUsIHVzZXJJbmZvLnJvbGUpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQubm90UHJvcGVydHkocmVzLmJvZHksICdwYXNzd29yZCcpO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIG5vdCBsb2dnZWQgaW4nLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5nZXQoJy9hcGkvdjEvdXNlcicpXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDEsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnR0VUIC9hcGkvdjEvdXNlcnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGl0KCdzaG91bGQgcmVjZWl2ZSBhIGxpc3Qgb2YgdXNlcnMnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5nZXQoJy9hcGkvdjEvdXNlcnMnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgyMDAsIGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwocmVzLmJvZHkudXNlcnMubGVuZ3RoLCAxKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmluY2x1ZGUocmVzLmJvZHkudXNlcnNbMF0sIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdXNlckluZm8ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogdXNlckluZm8ucm9sZSxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IHVzZXJJbmZvLmVtYWlsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5ub3RQcm9wZXJ0eShyZXMuYm9keS51c2Vyc1swXSwgJ3Bhc3N3b3JkJyk7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgbm90IGxvZ2dlZCBpbicsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLmdldCgnL2FwaS92MS91c2VycycpXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDEsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnR0VUIC9hcGkvdjEvdXNlci86ZW1haWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0cmlldmUgYSB1c2VyIGJ5IGVtYWlsJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAuZ2V0KCcvYXBpL3YxL3VzZXIvJyArIHVzZXJJbmZvLmVtYWlsKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgyMDAsIGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaGFzQWxsS2V5cyhyZXMuYm9keS51c2VyLCBbJ2VtYWlsJywgJ25hbWUnLCAncm9sZScsICdfaWQnLCAnY3JlYXRlZCddKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmluY2x1ZGUocmVzLmJvZHkudXNlciwge1xuICAgICAgICAgICAgICAgICAgICBlbWFpbDogdXNlckluZm8uZW1haWwsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHVzZXJJbmZvLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IHVzZXJJbmZvLnJvbGUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgZW1haWwgZG9lcyBub3QgZXhpc3QnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5nZXQoJy9hcGkvdjEvdXNlci9ub3QuaW4udXNlQHRlc3QuY29tJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwLCBmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzU3RyaW5nKHJlcy5ib2R5LmVycm9yKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKHJlcy5ib2R5LmVycm9yLCAnTm8gdXNlciBmb3VuZCB3aXRoIHRoYXQgZW1haWwnKTtcbiAgICAgICAgICAgICAgICBkb25lKGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiBub3QgYSB2YWxpZCBlbWFpbCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLmdldCgnL2FwaS92MS91c2VyL25vdC1hbi1lbWFpbCcpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMCwgZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc1N0cmluZyhyZXMuYm9keS5lcnJvcik7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChyZXMuYm9keS5lcnJvciwgJ1BsZWFzZSBzdXBwbHkgYSB2YWxpZCBlbWFpbCcpO1xuICAgICAgICAgICAgICAgIGRvbmUoZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnUE9TVCAvYXBpL3YxL3VzZXIvdXBkYXRlL2VtYWlsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpdChcInNob3VsZCB1cGRhdGUgdGhlIGxvZ2dlZCBpbiB1c2VyJ3MgZW1haWxcIiwgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHZhciBuZXdFbWFpbCA9ICduZXcuZW1haWxAdGVzdC5jb20nO1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL2VtYWlsJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6IG5ld0VtYWlsIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgyMDAsIGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgICAgICAuZ2V0KCcvYXBpL3YxL3VzZXInKVxuICAgICAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHJlcy5nZXQoJ3gtYWNjZXNzLXRva2VuJykpXG4gICAgICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwLCBmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChyZXMuYm9keS5uYW1lLCB1c2VySW5mby5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChyZXMuYm9keS5lbWFpbCwgbmV3RW1haWwpO1xuICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKHJlcy5ib2R5LnJvbGUsIHVzZXJJbmZvLnJvbGUpO1xuICAgICAgICAgICAgICAgICAgICBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiBuZXcgZW1haWwgaXMgbm90IHZhbGlkJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9lbWFpbCcpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAnbm90IGFuIGVtYWlsJyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwLCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiBlbWFpbCBhbHJlYWR5IGluIHVzZScsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvZW1haWwnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDAsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIG5vdCBhdXRob3JpemVkJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9lbWFpbCcpXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDEsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnUE9TVCAvYXBpL3YxL3VzZXIvdXBkYXRlL25hbWUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGl0KCdzaG91bGQgdXBkYXRlIG5hbWUnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdmFyIG5ld05hbWUgPSAnbmV3IG5hbWUnO1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL25hbWUnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBuYW1lOiBuZXdOYW1lIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgyMDAsIGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAgICAgLmdldCgnL2FwaS92MS91c2VyJylcbiAgICAgICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCByZXMuZ2V0KCd4LWFjY2Vzcy10b2tlbicpKVxuICAgICAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMCwgZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwocmVzLmJvZHkubmFtZSwgbmV3TmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwocmVzLmJvZHkuZW1haWwsIHVzZXJJbmZvLmVtYWlsKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChyZXMuYm9keS5yb2xlLCB1c2VySW5mby5yb2xlKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgbm90IGF1dGhvcml6ZWQnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdmFyIG5ld05hbWUgPSAnbmV3IG5hbWUnO1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL25hbWUnKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgbmFtZTogbmV3TmFtZSB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAxLCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ1BPU1QgL2FwaS92MS91c2VyL3VwZGF0ZS9wYXNzd29yZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCB1cGRhdGUgcGFzc3dvcmQnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdmFyIG5ld1Bhc3MgPSAnbmV3cGFzcyc7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvcGFzc3dvcmQnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBvbGRQYXNzOiB1c2VySW5mby5wYXNzd29yZCwgbmV3UGFzczogbmV3UGFzcyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwLCBmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiB1c2VySW5mby5lbWFpbCwgcGFzc3dvcmQ6IG5ld1Bhc3MgfSlcbiAgICAgICAgICAgICAgICAgICAgLmV4cGVjdCgyMDAsIGRvbmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgdXBkYXRpbmcgcGFzc3dvcmQgaWYgY3VycmVudCBwYXNzd29yZCBpbnZhbGlkJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL3VwZGF0ZS9wYXNzd29yZCcpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IG9sZFBhc3M6ICd3cm9uZyBwYXNzd29yZCcsIG5ld1Bhc3M6ICcxMjM0MTIzNCcgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMCwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgdXBkYXRpbmcgcGFzc3dvcmQgaWYgbm90IGF1dGhvcml6ZWQnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL3VzZXIvdXBkYXRlL3Bhc3N3b3JkJylcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMSwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdQT1NUIC9hcGkvdjEvdXNlci9jcmVhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBuZXdVc2VyID0ge1xuICAgICAgICAgICAgZW1haWw6ICd0ZXN0MTIzQHRlc3QuY29tJyxcbiAgICAgICAgICAgIG5hbWU6ICdOZXcgVXNlcicsXG4gICAgICAgICAgICByb2xlOiAndXNlcicsXG4gICAgICAgIH07XG4gICAgICAgIGl0KCdzaG91bGQgY3JlYXRlIGEgbmV3IHVzZXInLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgVXNlcl8xW1wiZGVmYXVsdFwiXS5maW5kQnlFbWFpbChuZXdVc2VyLmVtYWlsKS5jb3VudERvY3VtZW50cyhmdW5jdGlvbiAoZXJyLCBjb3VudCkge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChjb3VudCwgMCwgJ1VzZXIgc2hvdWxkIG5vdCBleGlzdCB3aXRoIGVtYWlsIHRlc3QxMjNXdGVzdC5jb20nKTtcbiAgICAgICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgICAgIC5wb3N0KCcvYXBpL3YxL3VzZXIvY3JlYXRlJylcbiAgICAgICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAgICAgLnNlbmQobmV3VXNlcilcbiAgICAgICAgICAgICAgICAgICAgLmV4cGVjdCgyMDAsIGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgVXNlcl8xW1wiZGVmYXVsdFwiXS5maW5kQnlFbWFpbChuZXdVc2VyLmVtYWlsKS5leGVjKGZ1bmN0aW9uIChlcnIsIHVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcEluY2x1ZGUodXNlciwgbmV3VXNlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgdXNlciBtYWtpbmcgcmVxdWVzdCBpcyBub3QgYW4gYWRtaW4nLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdmFyIHVzZXIgPSBuZXcgVXNlcl8xW1wiZGVmYXVsdFwiXSh7XG4gICAgICAgICAgICAgICAgbmFtZTogbmV3VXNlci5uYW1lLFxuICAgICAgICAgICAgICAgIGVtYWlsOiBuZXdVc2VyLmVtYWlsLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBiY3J5cHRqc18xLmhhc2hTeW5jKCdwYXNzd29yZCcpLFxuICAgICAgICAgICAgICAgIHJvbGU6IG5ld1VzZXIucm9sZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdXNlci5zYXZlKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiBuZXdVc2VyLmVtYWlsLCBwYXNzd29yZDogJ3Bhc3N3b3JkJyB9KVxuICAgICAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMClcbiAgICAgICAgICAgICAgICAgICAgLmVuZChmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSByZXMuZ2V0KCd4LWFjY2Vzcy10b2tlbicpO1xuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL2NyZWF0ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmV4cGVjdCg0MDEsIGRvbmUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgdXNlciBpcyBub3QgbG9nZ2VkIGluJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS91c2VyL2NyZWF0ZScpXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDEsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIGVtYWlsIGlzIG5vdCB2YWxpZCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvdXNlci9jcmVhdGUnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgICAgIGVtYWlsOiAnbm90IHZhbGlkJyxcbiAgICAgICAgICAgICAgICBuYW1lOiBuZXdVc2VyLm5hbWUsXG4gICAgICAgICAgICAgICAgcm9sZTogbmV3VXNlci5yb2xlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwLCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiByb2xlIG5vdCB2YWxpZCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvdXNlci9jcmVhdGUnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgICAgIGVtYWlsOiBuZXdVc2VyLmVtYWlsLFxuICAgICAgICAgICAgICAgIG5hbWU6IG5ld1VzZXIubmFtZSxcbiAgICAgICAgICAgICAgICByb2xlOiAnbm90IHZhbGlkJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMCwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgZW1haWwgYWRkcmVzcyBhbHJlYWR5IGluIHVzZScsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvdXNlci9jcmVhdGUnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VySW5mby5lbWFpbCxcbiAgICAgICAgICAgICAgICBuYW1lOiBuZXdVc2VyLm5hbWUsXG4gICAgICAgICAgICAgICAgcm9sZTogbmV3VXNlci5yb2xlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDAwLCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ1BVVCAvYXBpL3YxL3VzZXIvdXBkYXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbmV3VXNlckluZm8gPSB7XG4gICAgICAgICAgICBuYW1lOiAnTmV3IE5hbWUnLFxuICAgICAgICAgICAgZW1haWw6ICduZXdlbWFpbEB0ZXN0LmNvbScsXG4gICAgICAgICAgICByb2xlOiAndXNlcidcbiAgICAgICAgfTtcbiAgICAgICAgaXQoJ3Nob3VsZCB1cGRhdGUgdGhlIHVzZXInLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wdXQoJy9hcGkvdjEvdXNlci91cGRhdGUnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogdXNlckluZm8uZW1haWwsIHVzZXI6IG5ld1VzZXJJbmZvIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCgyMDAsIGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgVXNlcl8xW1wiZGVmYXVsdFwiXS5maW5kQnlFbWFpbChuZXdVc2VySW5mby5lbWFpbCkuZXhlYyhmdW5jdGlvbiAoZXJyLCB1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzTm90TnVsbCh1c2VyKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwSW5jbHVkZSh1c2VyLCBuZXdVc2VySW5mbyk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIHVzZXIgd2l0aCBlbWFpbCBkb2VzIG5vdCBleGlzdCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnB1dCgnL2FwaS92MS91c2VyL3VwZGF0ZScpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAnZG9lc25vdGV4aXN0QHRlc3QuY29tJywgdXNlcjogbmV3VXNlckluZm8gfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwNCwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgbmV3IGVtYWlsIG5vdCB2YWxpZCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnB1dCgnL2FwaS92MS91c2VyL3VwZGF0ZScpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICAgICAgZW1haWw6IHVzZXJJbmZvLmVtYWlsLFxuICAgICAgICAgICAgICAgIHVzZXI6IE9iamVjdC5hc3NpZ24oe30sIG5ld1VzZXJJbmZvLCB7IGVtYWlsOiAnbm90IHZhbGlkJyB9KVxuICAgICAgICAgICAgfSkuZXhwZWN0KDQwMCwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgcm9sZSBub3QgdmFsaWQnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgIC5wdXQoJy9hcGkvdjEvdXNlci91cGRhdGUnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VySW5mby5lbWFpbCxcbiAgICAgICAgICAgICAgICB1c2VyOiBPYmplY3QuYXNzaWduKHt9LCBuZXdVc2VySW5mbywgeyByb2xlOiAnbm90IHZhbGlkJyB9KVxuICAgICAgICAgICAgfSkuZXhwZWN0KDQwMCwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdERUxFVEUgL2FwaS92MS91c2VyL2RlbGV0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdmFyIHVzZXIgPSBuZXcgVXNlcl8xW1wiZGVmYXVsdFwiXSh7XG4gICAgICAgICAgICAgICAgbmFtZTogJ05ldyBOYW1lJyxcbiAgICAgICAgICAgICAgICBlbWFpbDogJ25ld2VtYWlsQHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICByb2xlOiAndXNlcicsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICdwYXNzJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgaW5hY3RpdmVVc2VyID0gbmV3IFVzZXJfMVtcImRlZmF1bHRcIl0oe1xuICAgICAgICAgICAgICAgIG5hbWU6ICdOYW1lJyxcbiAgICAgICAgICAgICAgICBlbWFpbDogJ2RlbGV0ZWRAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgIHJvbGU6ICd1c2VyJyxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJ3Bhc3N3b3JkJyxcbiAgICAgICAgICAgICAgICBkZWxldGVkOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB1c2VyLnNhdmUoZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgaW5hY3RpdmVVc2VyLnNhdmUoZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZGVsZXRlIHRoZSB1c2VyJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClbXCJkZWxldGVcIl0oJy9hcGkvdjEvdXNlci9kZWxldGUnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ25ld2VtYWlsQHRlc3QuY29tJyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICBVc2VyXzFbXCJkZWZhdWx0XCJdLmZpbmRCeUVtYWlsKCduZXdlbWFpbEB0ZXN0LmNvbScpLmV4ZWMoZnVuY3Rpb24gKGVyciwgdXNlcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc1RydWUodXNlci5kZWxldGVkKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgdHJ5aW5nIHRvIGRlbGV0ZSBsb2dnZWQgaW4gdXNlcicsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApW1wiZGVsZXRlXCJdKCcvYXBpL3YxL3VzZXIvZGVsZXRlJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6IHVzZXJJbmZvLmVtYWlsIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDAsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIGVtYWlsIGluYWN0aXZlJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClbXCJkZWxldGVcIl0oJy9hcGkvdjEvdXNlci9kZWxldGUnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ2RlbGV0ZWRAdGVzdC5jb20nIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDAsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIGVtYWlsIGRvZXMgbm90IGV4aXN0JywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClbXCJkZWxldGVcIl0oJy9hcGkvdjEvdXNlci9kZWxldGUnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ25vdHJlYWxAdGVzdC5jb20nIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDQsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIGVtYWlsIG5vdCBwcm92aWRlZCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApW1wiZGVsZXRlXCJdKCcvYXBpL3YxL3VzZXIvZGVsZXRlJylcbiAgICAgICAgICAgICAgICAuc2V0KCd4LWFjY2Vzcy10b2tlbicsIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICdub3QgdmFsaWQnIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDAsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIHVzZXIgbWFraW5nIHJlcXVlc3QgaXMgbm90IGFuIGFkbWluJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHZhciB1c2VyID0gbmV3IFVzZXJfMVtcImRlZmF1bHRcIl0oe1xuICAgICAgICAgICAgICAgIG5hbWU6ICdOYW1lJyxcbiAgICAgICAgICAgICAgICBlbWFpbDogJ25vdGFuYWRtaW5AdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBiY3J5cHRqc18xLmhhc2hTeW5jKCdwYXNzd29yZCcpLFxuICAgICAgICAgICAgICAgIHJvbGU6ICd1c2VyJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdXNlci5zYXZlKGZ1bmN0aW9uIChlcnIsIHVzZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAgICAgLnBvc3QoJy9hcGkvdjEvbG9naW4nKVxuICAgICAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAnbm90YW5hZG1pbkB0ZXN0LmNvbScsIHBhc3N3b3JkOiAncGFzc3dvcmQnIH0pXG4gICAgICAgICAgICAgICAgICAgIC5leHBlY3QoMjAwKVxuICAgICAgICAgICAgICAgICAgICAuZW5kKGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IHJlcy5nZXQoJ3gtYWNjZXNzLXRva2VuJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClbXCJkZWxldGVcIl0oJy9hcGkvdjEvdXNlci9kZWxldGUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5leHBlY3QoNDAxLCBkb25lKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIHVzZXIgbm90IGxvZ2dlZCBpbicsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApW1wiZGVsZXRlXCJdKCcvYXBpL3YxL3VzZXIvZGVsZXRlJylcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMSwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdQVVQgL2FwaS92MS91c2VyL3Jlc3RvcmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHZhciB1c2VyID0gbmV3IFVzZXJfMVtcImRlZmF1bHRcIl0oe1xuICAgICAgICAgICAgICAgIG5hbWU6ICdOZXcgTmFtZScsXG4gICAgICAgICAgICAgICAgZW1haWw6ICdhY3RpdmVAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgIHJvbGU6ICd1c2VyJyxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJ3Bhc3MnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBpbmFjdGl2ZVVzZXIgPSBuZXcgVXNlcl8xW1wiZGVmYXVsdFwiXSh7XG4gICAgICAgICAgICAgICAgbmFtZTogJ05hbWUnLFxuICAgICAgICAgICAgICAgIGVtYWlsOiAnZGVsZXRlZEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgcm9sZTogJ3VzZXInLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAncGFzc3dvcmQnLFxuICAgICAgICAgICAgICAgIGRlbGV0ZWQ6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHVzZXIuc2F2ZShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICBpbmFjdGl2ZVVzZXIuc2F2ZShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXN0b3JlIHRoZSB1c2VyJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucHV0KCcvYXBpL3YxL3VzZXIvcmVzdG9yZScpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAnZGVsZXRlZEB0ZXN0LmNvbScgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDIwMCwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgVXNlcl8xW1wiZGVmYXVsdFwiXS5maW5kQnlFbWFpbCgnZGVsZXRlZEB0ZXN0LmNvbScpLmV4ZWMoZnVuY3Rpb24gKGVyciwgdXNlcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKHVzZXIuZGVsZXRlZCk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIGVtYWlsIGRvZXMgbm90IGV4aXN0JywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QoX18xLmFwcClcbiAgICAgICAgICAgICAgICAucHV0KCcvYXBpL3YxL3VzZXIvcmVzdG9yZScpXG4gICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGVtYWlsOiAnZG9lc25vdGV4aXN0QHRlc3QuY29tJyB9KVxuICAgICAgICAgICAgICAgIC5leHBlY3QoNDA0LCBkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiB1c2VyIGlzIGFjdGl2ZScsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnB1dCgnL2FwaS92MS91c2VyL3Jlc3RvcmUnKVxuICAgICAgICAgICAgICAgIC5zZXQoJ3gtYWNjZXNzLXRva2VuJywgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBlbWFpbDogJ2FjdGl2ZUB0ZXN0LmNvbScgfSlcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwMCwgZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgaWYgdXNlciBtYWtpbmcgcmVxdWVzdCBpcyBub3QgYW4gYWRtaW4nLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdmFyIHVzZXIgPSBuZXcgVXNlcl8xW1wiZGVmYXVsdFwiXSh7XG4gICAgICAgICAgICAgICAgbmFtZTogJ05hbWUnLFxuICAgICAgICAgICAgICAgIGVtYWlsOiAnbm90YW5hZG1pbkB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IGJjcnlwdGpzXzEuaGFzaFN5bmMoJ3Bhc3N3b3JkJyksXG4gICAgICAgICAgICAgICAgcm9sZTogJ3VzZXInLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB1c2VyLnNhdmUoZnVuY3Rpb24gKGVyciwgdXNlcikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS92MS9sb2dpbicpXG4gICAgICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICdub3RhbmFkbWluQHRlc3QuY29tJywgcGFzc3dvcmQ6ICdwYXNzd29yZCcgfSlcbiAgICAgICAgICAgICAgICAgICAgLmV4cGVjdCgyMDApXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gcmVzLmdldCgneC1hY2Nlc3MtdG9rZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdChfXzEuYXBwKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnB1dCgnL2FwaS92MS91c2VyL3Jlc3RvcmUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNldCgneC1hY2Nlc3MtdG9rZW4nLCB0b2tlbilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5leHBlY3QoNDAxLCBkb25lKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIHVzZXIgbm90IGxvZ2dlZCBpbicsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICByZXF1ZXN0KF9fMS5hcHApXG4gICAgICAgICAgICAgICAgLnB1dCgnL2FwaS92MS91c2VyL3Jlc3RvcmUnKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZW1haWw6ICdhY3RpdmVAdGVzdC5jb20nIH0pXG4gICAgICAgICAgICAgICAgLmV4cGVjdCg0MDEsIGRvbmUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pZEdWemRGVnpaWEpEYjI1MGNtOXNiR1Z5TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dkxpNHZkR1Z6ZEhNdmMyVnlkbVZ5TDNSbGMzUlZjMlZ5UTI5dWRISnZiR3hsY2k1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96dEJRVUZCTEcxRFFVRnhRenRCUVVOeVF5eHhRMEZCYjBNN1FVRkRjRU1zTmtKQlFUaENPMEZCUlRsQ0xIbENRVUU0UXp0QlFVTTVReXh4UkVGQk1rUTdRVUZGTTBRc1VVRkJVU3hEUVVGRExHbENRVUZwUWl4RlFVRkZPMGxCUTNoQ0xFbEJRVWtzUzBGQllTeERRVUZETzBsQlEyeENMRWxCUVVrc1VVRkJVU3hIUVVGSE8xRkJRMWdzU1VGQlNTeEZRVUZGTEZGQlFWRTdVVUZEWkN4TFFVRkxMRVZCUVVVc1pVRkJaVHRSUVVOMFFpeFJRVUZSTEVWQlFVVXNUVUZCVFR0UlFVTm9RaXhKUVVGSkxFVkJRVVVzVDBGQlR6dExRVU5vUWl4RFFVRkRPMGxCUlVZc1ZVRkJWU3hEUVVGRExGVkJRVk1zU1VGQlNUdFJRVU53UWl4elFrRkJhMElzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXp0WlFVTjBRaXhKUVVGSkxFbEJRVWtzUjBGQlZTeEpRVUZKTEdsQ1FVRkpMRU5CUVVNN1owSkJRM1pDTEVsQlFVa3NSVUZCUlN4UlFVRlJMRU5CUVVNc1NVRkJTVHRuUWtGRGJrSXNTMEZCU3l4RlFVRkZMRkZCUVZFc1EwRkJReXhMUVVGTE8yZENRVU55UWl4UlFVRlJMRVZCUVVVc2JVSkJRVkVzUTBGQlF5eFJRVUZSTEVOQlFVTXNVVUZCVVN4RFFVRkRPMmRDUVVOeVF5eEpRVUZKTEVWQlFVVXNVVUZCVVN4RFFVRkRMRWxCUVVrN1lVRkRkRUlzUTBGQlF5eERRVUZETzFsQlEwZ3NTVUZCU1N4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZETEVsQlFWYzdaMEpCUlhwQ0xFOUJRVThzUTBGQlF5eFBRVUZITEVOQlFVTTdjVUpCUTFBc1NVRkJTU3hEUVVGRExHVkJRV1VzUTBGQlF6dHhRa0ZEY2tJc1NVRkJTU3hEUVVGRExFVkJRVU1zUzBGQlN5eEZRVUZGTEZGQlFWRXNRMEZCUXl4TFFVRkxMRVZCUVVVc1VVRkJVU3hGUVVGRkxGRkJRVkVzUTBGQlF5eFJRVUZSTEVWQlFVTXNRMEZCUXp0eFFrRkRNVVFzVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXp0eFFrRkRXQ3hIUVVGSExFTkJRVU1zVlVGQlF5eEhRVUZSTEVWQlFVVXNSMEZCY1VJN2IwSkJRMnBETEV0QlFVc3NSMEZCUnl4SFFVRkhMRU5CUVVNc1IwRkJSeXhEUVVGRExHZENRVUZuUWl4RFFVRkRMRU5CUVVNN2IwSkJRMnhETEdGQlFVMHNRMEZCUXl4VFFVRlRMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU03YjBKQlEzaENMR0ZCUVUwc1EwRkJReXhSUVVGUkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTTdiMEpCUTNaQ0xHRkJRVTBzUTBGQlF5eFZRVUZWTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN2IwSkJRM3BDTEVsQlFVa3NSVUZCUlN4RFFVRkRPMmRDUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZETzFsQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNc1QwRkJTeXhEUVVGQkxFTkJRVU1zVlVGQlF5eEhRVUZSTzJkQ1FVTmtMRTFCUVUwc1IwRkJSeXhEUVVGRE8xbEJRMlFzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOUUxFTkJRVU1zUTBGQlF5eERRVUZETzBsQlJVZ3NVVUZCVVN4RFFVRkRMR3RDUVVGclFpeEZRVUZGTzFGQlEzcENMRVZCUVVVc1EwRkJReXhwUTBGQmFVTXNSVUZCUlN4VlFVRlZMRWxCUVVrN1dVRkRhRVFzVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXp0cFFrRkRVQ3hIUVVGSExFTkJRVU1zWTBGQll5eERRVUZETzJsQ1FVTnVRaXhIUVVGSExFTkJRVU1zWjBKQlFXZENMRVZCUVVVc1MwRkJTeXhEUVVGRE8ybENRVU0xUWl4TlFVRk5MRU5CUVVNc1IwRkJSeXhGUVVGRkxGVkJRVU1zUjBGQlVTeEZRVUZGTEVkQlFYRkNPMmRDUVVONlF5eEpRVUZKTEVkQlFVYzdiMEpCUVVVc1QwRkJUeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTTdaMEpCUXpGQ0xHRkJRVTBzUTBGQlF5eFhRVUZYTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFVkJRVVVzVVVGQlVTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMmRDUVVOcVJDeGhRVUZOTEVOQlFVTXNWMEZCVnl4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eEZRVUZGTEZGQlFWRXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRenRuUWtGRGJrUXNZVUZCVFN4RFFVRkRMRmRCUVZjc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NSVUZCUlN4UlFVRlJMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03WjBKQlEycEVMR0ZCUVUwc1EwRkJReXhYUVVGWExFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NSVUZCUlN4VlFVRlZMRU5CUVVNc1EwRkJRenRuUWtGRGVrTXNTVUZCU1N4RlFVRkZMRU5CUVVNN1dVRkRXQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5ZTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1JVRkJSU3hEUVVGRExEaENRVUU0UWl4RlFVRkZMRlZCUVZVc1NVRkJTVHRaUVVNM1F5eFBRVUZQTEVOQlFVTXNUMEZCUnl4RFFVRkRPMmxDUVVOUUxFZEJRVWNzUTBGQlF5eGpRVUZqTEVOQlFVTTdhVUpCUTI1Q0xFMUJRVTBzUTBGQlF5eEhRVUZITEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRNMElzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOSUxGRkJRVkVzUTBGQlF5eHRRa0ZCYlVJc1JVRkJSVHRSUVVNeFFpeEZRVUZGTEVOQlFVTXNaME5CUVdkRExFVkJRVVVzVlVGQlZTeEpRVUZKTzFsQlF5OURMRTlCUVU4c1EwRkJReXhQUVVGSExFTkJRVU03YVVKQlExQXNSMEZCUnl4RFFVRkRMR1ZCUVdVc1EwRkJRenRwUWtGRGNFSXNSMEZCUnl4RFFVRkRMR2RDUVVGblFpeEZRVUZGTEV0QlFVc3NRMEZCUXp0cFFrRkROVUlzVFVGQlRTeERRVUZETEVkQlFVY3NSVUZCUlN4VlFVRkRMRWRCUVZFc1JVRkJSU3hIUVVGeFFqdG5Ra0ZEZWtNc1lVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTTdaMEpCUXpkRExHRkJRVTBzUTBGQlF5eFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEVWQlFVVTdiMEpCUXpsQ0xFbEJRVWtzUlVGQlJTeFJRVUZSTEVOQlFVTXNTVUZCU1R0dlFrRkRia0lzU1VGQlNTeEZRVUZGTEZGQlFWRXNRMEZCUXl4SlFVRkpPMjlDUVVOdVFpeExRVUZMTEVWQlFVVXNVVUZCVVN4RFFVRkRMRXRCUVVzN2FVSkJRM2hDTEVOQlFVTXNRMEZCUVR0blFrRkRSaXhoUVVGTkxFTkJRVU1zVjBGQlZ5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZGTEZWQlFWVXNRMEZCUXl4RFFVRkRPMmRDUVVOc1JDeEpRVUZKTEVWQlFVVXNRMEZCUXp0WlFVTllMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMWdzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4RlFVRkZMRU5CUVVNc09FSkJRVGhDTEVWQlFVVXNWVUZCVlN4SlFVRkpPMWxCUXpkRExFOUJRVThzUTBGQlF5eFBRVUZITEVOQlFVTTdhVUpCUTFBc1IwRkJSeXhEUVVGRExHVkJRV1VzUTBGQlF6dHBRa0ZEY0VJc1RVRkJUU3hEUVVGRExFZEJRVWNzUlVGQlJTeEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTXpRaXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTBnc1VVRkJVU3hEUVVGRExIbENRVUY1UWl4RlFVRkZPMUZCUTJoRExFVkJRVVVzUTBGQlF5eHBRMEZCYVVNc1JVRkJSU3hWUVVGVkxFbEJRVWs3V1VGRGFFUXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJRenRwUWtGRFVDeEhRVUZITEVOQlFVTXNaVUZCWlN4SFFVRkhMRkZCUVZFc1EwRkJReXhMUVVGTExFTkJRVU03YVVKQlEzSkRMRWRCUVVjc1EwRkJReXhuUWtGQlowSXNSVUZCUlN4TFFVRkxMRU5CUVVNN2FVSkJRelZDTEUxQlFVMHNRMEZCUXl4SFFVRkhMRVZCUVVVc1ZVRkJReXhIUVVGUkxFVkJRVVVzUjBGQmNVSTdaMEpCUTNwRExHRkJRVTBzUTBGQlF5eFZRVUZWTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eFBRVUZQTEVWQlFVVXNUVUZCVFN4RlFVRkZMRTFCUVUwc1JVRkJSU3hMUVVGTExFVkJRVVVzVTBGQlV5eERRVUZETEVOQlFVTXNRMEZCUXp0blFrRkRPVVVzWVVGQlRTeERRVUZETEU5QlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUlVGQlJUdHZRa0ZETVVJc1MwRkJTeXhGUVVGRkxGRkJRVkVzUTBGQlF5eExRVUZMTzI5Q1FVTnlRaXhKUVVGSkxFVkJRVVVzVVVGQlVTeERRVUZETEVsQlFVazdiMEpCUTI1Q0xFbEJRVWtzUlVGQlJTeFJRVUZSTEVOQlFVTXNTVUZCU1R0cFFrRkRkRUlzUTBGQlF5eERRVUZETzJkQ1FVTklMRWxCUVVrc1JVRkJSU3hEUVVGRE8xbEJRMWdzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEV0N4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5eHhRMEZCY1VNc1JVRkJSU3hWUVVGVkxFbEJRVWs3V1VGRGNFUXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJRenRwUWtGRFVDeEhRVUZITEVOQlFVTXNhME5CUVd0RExFTkJRVU03YVVKQlEzWkRMRWRCUVVjc1EwRkJReXhuUWtGQlowSXNSVUZCUlN4TFFVRkxMRU5CUVVNN2FVSkJRelZDTEUxQlFVMHNRMEZCUXl4SFFVRkhMRVZCUVVVc1ZVRkJReXhIUVVGUkxFVkJRVVVzUjBGQmNVSTdaMEpCUTNwRExHRkJRVTBzUTBGQlF5eFJRVUZSTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dG5Ra0ZEYUVNc1lVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1JVRkJSU3dyUWtGQkswSXNRMEZCUXl4RFFVRkRPMmRDUVVOd1JTeEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1dVRkRaQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5ZTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1JVRkJSU3hEUVVGRExHdERRVUZyUXl4RlFVRkZMRlZCUVZVc1NVRkJTVHRaUVVOcVJDeFBRVUZQTEVOQlFVTXNUMEZCUnl4RFFVRkRPMmxDUVVOUUxFZEJRVWNzUTBGQlF5d3lRa0ZCTWtJc1EwRkJRenRwUWtGRGFFTXNSMEZCUnl4RFFVRkRMR2RDUVVGblFpeEZRVUZGTEV0QlFVc3NRMEZCUXp0cFFrRkROVUlzVFVGQlRTeERRVUZETEVkQlFVY3NSVUZCUlN4VlFVRkRMRWRCUVZFc1JVRkJSU3hIUVVGeFFqdG5Ra0ZEZWtNc1lVRkJUU3hEUVVGRExGRkJRVkVzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRE8yZENRVU5vUXl4aFFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RlFVRkZMRFpDUVVFMlFpeERRVUZETEVOQlFVTTdaMEpCUTJ4RkxFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0WlFVTmtMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMWdzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOSUxGRkJRVkVzUTBGQlF5eG5RMEZCWjBNc1JVRkJSVHRSUVVOMlF5eEZRVUZGTEVOQlFVTXNNRU5CUVRCRExFVkJRVVVzVlVGQlZTeEpRVUZKTzFsQlEzcEVMRWxCUVVrc1VVRkJVU3hIUVVGSExHOUNRVUZ2UWl4RFFVRkRPMWxCUTNCRExFOUJRVThzUTBGQlF5eFBRVUZITEVOQlFVTTdhVUpCUTFBc1NVRkJTU3hEUVVGRExESkNRVUV5UWl4RFFVRkRPMmxDUVVOcVF5eEhRVUZITEVOQlFVTXNaMEpCUVdkQ0xFVkJRVVVzUzBGQlN5eERRVUZETzJsQ1FVTTFRaXhKUVVGSkxFTkJRVU1zUlVGQlJTeExRVUZMTEVWQlFVVXNVVUZCVVN4RlFVRkZMRU5CUVVNN2FVSkJRM3BDTEUxQlFVMHNRMEZCUXl4SFFVRkhMRVZCUVVVc1ZVRkJReXhIUVVGUkxFVkJRVVVzUjBGQmNVSTdaMEpCUTNwRExFbEJRVWtzUjBGQlJ6dHZRa0ZCUlN4UFFVRlBMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dG5Ra0ZETVVJc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF6dHhRa0ZEVUN4SFFVRkhMRU5CUVVNc1kwRkJZeXhEUVVGRE8zRkNRVVZ1UWl4SFFVRkhMRU5CUVVNc1owSkJRV2RDTEVWQlFVVXNSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXhuUWtGQlowSXNRMEZCUXl4RFFVRkRPM0ZDUVVOb1JDeE5RVUZOTEVOQlFVTXNSMEZCUnl4RlFVRkZMRlZCUVVNc1IwRkJVU3hGUVVGRkxFZEJRWEZDTzI5Q1FVTjZReXhoUVVGTkxFTkJRVU1zVjBGQlZ5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hGUVVGRkxGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0dlFrRkRha1FzWVVGQlRTeERRVUZETEZkQlFWY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUlVGQlJTeFJRVUZSTEVOQlFVTXNRMEZCUXp0dlFrRkROME1zWVVGQlRTeERRVUZETEZkQlFWY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUlVGQlJTeFJRVUZSTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN2IwSkJRMnBFTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRuUWtGRFpDeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTllMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMWdzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4RlFVRkZMRU5CUVVNc2RVTkJRWFZETEVWQlFVVXNWVUZCVlN4SlFVRkpPMWxCUTNSRUxFOUJRVThzUTBGQlF5eFBRVUZITEVOQlFVTTdhVUpCUTFBc1NVRkJTU3hEUVVGRExESkNRVUV5UWl4RFFVRkRPMmxDUVVOcVF5eEhRVUZITEVOQlFVTXNaMEpCUVdkQ0xFVkJRVVVzUzBGQlN5eERRVUZETzJsQ1FVTTFRaXhKUVVGSkxFTkJRVU1zUlVGQlJTeExRVUZMTEVWQlFVVXNZMEZCWXl4RlFVRkZMRU5CUVVNN2FVSkJReTlDTEUxQlFVMHNRMEZCUXl4SFFVRkhMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRE0wSXNRMEZCUXl4RFFVRkRMRU5CUVVFN1VVRkRSaXhGUVVGRkxFTkJRVU1zY1VOQlFYRkRMRVZCUVVVc1ZVRkJWU3hKUVVGSk8xbEJRM0JFTEU5QlFVOHNRMEZCUXl4UFFVRkhMRU5CUVVNN2FVSkJRMUFzU1VGQlNTeERRVUZETERKQ1FVRXlRaXhEUVVGRE8ybENRVU5xUXl4SFFVRkhMRU5CUVVNc1owSkJRV2RDTEVWQlFVVXNTMEZCU3l4RFFVRkRPMmxDUVVNMVFpeEpRVUZKTEVOQlFVTXNSVUZCUlN4TFFVRkxMRVZCUVVVc1pVRkJaU3hGUVVGRkxFTkJRVU03YVVKQlEyaERMRTFCUVUwc1EwRkJReXhIUVVGSExFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTTdVVUZETTBJc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEZRVUZGTEVOQlFVTXNLMEpCUVN0Q0xFVkJRVVVzVlVGQlZTeEpRVUZKTzFsQlF6bERMRTlCUVU4c1EwRkJReXhQUVVGSExFTkJRVU03YVVKQlExQXNTVUZCU1N4RFFVRkRMREpDUVVFeVFpeERRVUZETzJsQ1FVTnFReXhKUVVGSkxFTkJRVU1zUlVGQlJTeExRVUZMTEVWQlFVVXNaVUZCWlN4RlFVRkZMRU5CUVVNN2FVSkJRMmhETEUxQlFVMHNRMEZCUXl4SFFVRkhMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRE0wSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5JTEZGQlFWRXNRMEZCUXl3clFrRkJLMElzUlVGQlJUdFJRVU4wUXl4RlFVRkZMRU5CUVVNc2IwSkJRVzlDTEVWQlFVVXNWVUZCVlN4SlFVRkpPMWxCUTI1RExFbEJRVWtzVDBGQlR5eEhRVUZITEZWQlFWVXNRMEZCUXp0WlFVTjZRaXhQUVVGUExFTkJRVU1zVDBGQlJ5eERRVUZETzJsQ1FVTlFMRWxCUVVrc1EwRkJReXd3UWtGQk1FSXNRMEZCUXp0cFFrRkRhRU1zUjBGQlJ5eERRVUZETEdkQ1FVRm5RaXhGUVVGRkxFdEJRVXNzUTBGQlF6dHBRa0ZETlVJc1NVRkJTU3hEUVVGRExFVkJRVVVzU1VGQlNTeEZRVUZGTEU5QlFVOHNSVUZCUlN4RFFVRkRPMmxDUVVOMlFpeE5RVUZOTEVOQlFVTXNSMEZCUnl4RlFVRkZMRlZCUVVNc1IwRkJVU3hGUVVGRkxFZEJRWEZDTzJkQ1FVTjZReXhQUVVGUExFTkJRVU1zVDBGQlJ5eERRVUZETzNGQ1FVTlFMRWRCUVVjc1EwRkJReXhqUVVGakxFTkJRVU03Y1VKQlEyNUNMRWRCUVVjc1EwRkJReXhuUWtGQlowSXNSVUZCUlN4SFFVRkhMRU5CUVVNc1IwRkJSeXhEUVVGRExHZENRVUZuUWl4RFFVRkRMRU5CUVVNN2NVSkJRMmhFTEUxQlFVMHNRMEZCUXl4SFFVRkhMRVZCUVVVc1ZVRkJReXhIUVVGUkxFVkJRVVVzUjBGQmNVSTdiMEpCUTNwRExHRkJRVTBzUTBGQlF5eFhRVUZYTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFVkJRVVVzVDBGQlR5eERRVUZETEVOQlFVTTdiMEpCUXpORExHRkJRVTBzUTBGQlF5eFhRVUZYTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFVkJRVVVzVVVGQlVTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRPMjlDUVVOdVJDeGhRVUZOTEVOQlFVTXNWMEZCVnl4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEZRVUZGTEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenR2UWtGRGFrUXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8yZENRVU5rTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTFnc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFdDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXdyUWtGQkswSXNSVUZCUlN4VlFVRlZMRWxCUVVrN1dVRkRPVU1zU1VGQlNTeFBRVUZQTEVkQlFVY3NWVUZCVlN4RFFVRkRPMWxCUTNwQ0xFOUJRVThzUTBGQlF5eFBRVUZITEVOQlFVTTdhVUpCUTFBc1NVRkJTU3hEUVVGRExEQkNRVUV3UWl4RFFVRkRPMmxDUVVOb1F5eEpRVUZKTEVOQlFVTXNSVUZCUlN4SlFVRkpMRVZCUVVVc1QwRkJUeXhGUVVGRkxFTkJRVU03YVVKQlEzWkNMRTFCUVUwc1EwRkJReXhIUVVGSExFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTTdVVUZETTBJc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFVDeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTklMRkZCUVZFc1EwRkJReXh0UTBGQmJVTXNSVUZCUlR0UlFVTXhReXhGUVVGRkxFTkJRVU1zZDBKQlFYZENMRVZCUVVVc1ZVRkJWU3hKUVVGSk8xbEJRM1pETEVsQlFVa3NUMEZCVHl4SFFVRkhMRk5CUVZNc1EwRkJRenRaUVVONFFpeFBRVUZQTEVOQlFVTXNUMEZCUnl4RFFVRkRPMmxDUVVOUUxFbEJRVWtzUTBGQlF5dzRRa0ZCT0VJc1EwRkJRenRwUWtGRGNFTXNSMEZCUnl4RFFVRkRMR2RDUVVGblFpeEZRVUZGTEV0QlFVc3NRMEZCUXp0cFFrRkROVUlzU1VGQlNTeERRVUZETEVWQlFVVXNUMEZCVHl4RlFVRkZMRkZCUVZFc1EwRkJReXhSUVVGUkxFVkJRVVVzVDBGQlR5eEZRVUZGTEU5QlFVOHNSVUZCUlN4RFFVRkRPMmxDUVVOMFJDeE5RVUZOTEVOQlFVTXNSMEZCUnl4RlFVRkZMRlZCUVVNc1IwRkJVU3hGUVVGRkxFZEJRWEZDTzJkQ1FVTjZReXhKUVVGSkxFZEJRVWM3YjBKQlFVVXNUMEZCVHl4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU03WjBKQlF6RkNMRTlCUVU4c1EwRkJReXhQUVVGSExFTkJRVU03Y1VKQlExQXNTVUZCU1N4RFFVRkRMR1ZCUVdVc1EwRkJRenR4UWtGRGNrSXNTVUZCU1N4RFFVRkRMRVZCUVVVc1MwRkJTeXhGUVVGRkxGRkJRVkVzUTBGQlF5eExRVUZMTEVWQlFVVXNVVUZCVVN4RlFVRkZMRTlCUVU4c1JVRkJSU3hEUVVGRE8zRkNRVU5zUkN4TlFVRk5MRU5CUVVNc1IwRkJSeXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzFsQlF6TkNMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMWdzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4RlFVRkZMRU5CUVVNc01rUkJRVEpFTEVWQlFVVXNWVUZCVlN4SlFVRkpPMWxCUTNSRkxFOUJRVThzUTBGQlF5eFBRVUZITEVOQlFVTTdhVUpCUTFBc1NVRkJTU3hEUVVGRExEaENRVUU0UWl4RFFVRkRPMmxDUVVOd1F5eEhRVUZITEVOQlFVTXNaMEpCUVdkQ0xFVkJRVVVzUzBGQlN5eERRVUZETzJsQ1FVTTFRaXhKUVVGSkxFTkJRVU1zUlVGQlJTeFBRVUZQTEVWQlFVVXNaMEpCUVdkQ0xFVkJRVVVzVDBGQlR5eEZRVUZGTEZWQlFWVXNSVUZCUlN4RFFVRkRPMmxDUVVONFJDeE5RVUZOTEVOQlFVTXNSMEZCUnl4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRek5DTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTFBc1JVRkJSU3hEUVVGRExHbEVRVUZwUkN4RlFVRkZMRlZCUVZVc1NVRkJTVHRaUVVOb1JTeFBRVUZQTEVOQlFVTXNUMEZCUnl4RFFVRkRPMmxDUVVOUUxFbEJRVWtzUTBGQlF5dzRRa0ZCT0VJc1EwRkJRenRwUWtGRGNFTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1JVRkJSU3hKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU16UWl4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOUUxFTkJRVU1zUTBGQlF5eERRVUZETzBsQlEwZ3NVVUZCVVN4RFFVRkRMREJDUVVFd1FpeEZRVUZGTzFGQlEycERMRWxCUVVrc1QwRkJUeXhIUVVGSE8xbEJRMVlzUzBGQlN5eEZRVUZGTEd0Q1FVRnJRanRaUVVONlFpeEpRVUZKTEVWQlFVVXNWVUZCVlR0WlFVTm9RaXhKUVVGSkxFVkJRVVVzVFVGQlRUdFRRVU5tTEVOQlFVRTdVVUZEUkN4RlFVRkZMRU5CUVVNc01FSkJRVEJDTEVWQlFVVXNWVUZCVXl4SlFVRkpPMWxCUlhoRExHbENRVUZKTEVOQlFVTXNWMEZCVnl4RFFVRkRMRTlCUVU4c1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eGpRVUZqTEVOQlFVTXNWVUZCUXl4SFFVRkhMRVZCUVVVc1MwRkJZVHRuUWtGRE9VUXNTVUZCU1N4SFFVRkhPMjlDUVVGRkxFOUJRVThzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMmRDUVVNeFFpeGhRVUZOTEVOQlFVTXNWMEZCVnl4RFFVRkRMRXRCUVVzc1JVRkJSU3hEUVVGRExFVkJRVVVzYlVSQlFXMUVMRU5CUVVNc1EwRkJRenRuUWtGRGJFWXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJRenR4UWtGRFVDeEpRVUZKTEVOQlFVTXNjVUpCUVhGQ0xFTkJRVU03Y1VKQlF6TkNMRWRCUVVjc1EwRkJReXhuUWtGQlowSXNSVUZCUlN4TFFVRkxMRU5CUVVNN2NVSkJRelZDTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNN2NVSkJRMklzVFVGQlRTeERRVUZETEVkQlFVY3NSVUZCUlN4VlFVRkRMRWRCUVZFc1JVRkJSU3hIUVVGeFFqdHZRa0ZEZWtNc1NVRkJTU3hIUVVGSE8zZENRVUZGTEU5QlFVOHNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8yOUNRVU14UWl4cFFrRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF5eFBRVUZQTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVU1zUjBGQlJ5eEZRVUZGTEVsQlFWYzdkMEpCUTJ4RUxFbEJRVWtzUjBGQlJ6czBRa0ZCUlN4UFFVRlBMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dDNRa0ZETVVJc1lVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eEpRVUZKTEVWQlFVVXNUMEZCVHl4RFFVRkRMRU5CUVVNN2QwSkJRMnhETEVsQlFVa3NSVUZCUlN4RFFVRkRPMjlDUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZETzJkQ1FVTlFMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMWdzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5eHZSRUZCYjBRc1JVRkJSU3hWUVVGVExFbEJRVWs3V1VGRGJFVXNTVUZCU1N4SlFVRkpMRWRCUVZVc1NVRkJTU3hwUWtGQlNTeERRVUZETzJkQ1FVTjJRaXhKUVVGSkxFVkJRVVVzVDBGQlR5eERRVUZETEVsQlFVazdaMEpCUTJ4Q0xFdEJRVXNzUlVGQlJTeFBRVUZQTEVOQlFVTXNTMEZCU3p0blFrRkRjRUlzVVVGQlVTeEZRVUZGTEcxQ1FVRlJMRU5CUVVNc1ZVRkJWU3hEUVVGRE8yZENRVU01UWl4SlFVRkpMRVZCUVVVc1QwRkJUeXhEUVVGRExFbEJRVWs3WVVGRGNrSXNRMEZCUXl4RFFVRkRPMWxCUTBnc1NVRkJTU3hEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRkRMRWxCUVZjN1owSkJSWHBDTEU5QlFVOHNRMEZCUXl4UFFVRkhMRU5CUVVNN2NVSkJRMUFzU1VGQlNTeERRVUZETEdWQlFXVXNRMEZCUXp0eFFrRkRja0lzU1VGQlNTeERRVUZETEVWQlFVVXNTMEZCU3l4RlFVRkZMRTlCUVU4c1EwRkJReXhMUVVGTExFVkJRVVVzVVVGQlVTeEZRVUZGTEZWQlFWVXNSVUZCUlN4RFFVRkRPM0ZDUVVOd1JDeE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRPM0ZDUVVOWUxFZEJRVWNzUTBGQlF5eFZRVUZETEVkQlFWRXNSVUZCUlN4SFFVRnhRanR2UWtGRGFrTXNTMEZCU3l4SFFVRkhMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zWjBKQlFXZENMRU5CUVVNc1EwRkJRenR2UWtGRGJFTXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJRenQ1UWtGRFVDeEpRVUZKTEVOQlFVTXNjVUpCUVhGQ0xFTkJRVU03ZVVKQlF6TkNMRWRCUVVjc1EwRkJReXhuUWtGQlowSXNSVUZCUlN4TFFVRkxMRU5CUVVNN2VVSkJRelZDTEUxQlFVMHNRMEZCUXl4SFFVRkhMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU03WjBKQlF6TkNMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMWdzUTBGQlF5eERRVUZETEVOQlFVTXNUMEZCU3l4RFFVRkJMRU5CUVVNc1ZVRkJReXhIUVVGUk8yZENRVU5rTEUxQlFVMHNSMEZCUnl4RFFVRkRPMWxCUTJRc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFVDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXh6UTBGQmMwTXNSVUZCUlN4VlFVRlRMRWxCUVVrN1dVRkRjRVFzVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXp0cFFrRkRVQ3hKUVVGSkxFTkJRVU1zY1VKQlFYRkNMRU5CUVVNN2FVSkJRek5DTEUxQlFVMHNRMEZCUXl4SFFVRkhMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRE0wSXNRMEZCUXl4RFFVRkRMRU5CUVVFN1VVRkRSaXhGUVVGRkxFTkJRVU1zYlVOQlFXMURMRVZCUVVVc1ZVRkJVeXhKUVVGSk8xbEJRMnBFTEU5QlFVOHNRMEZCUXl4UFFVRkhMRU5CUVVNN2FVSkJRMUFzU1VGQlNTeERRVUZETEhGQ1FVRnhRaXhEUVVGRE8ybENRVU16UWl4SFFVRkhMRU5CUVVNc1owSkJRV2RDTEVWQlFVVXNTMEZCU3l4RFFVRkRPMmxDUVVNMVFpeEpRVUZKTEVOQlFVTTdaMEpCUTBZc1MwRkJTeXhGUVVGRkxGZEJRVmM3WjBKQlEyeENMRWxCUVVrc1JVRkJSU3hQUVVGUExFTkJRVU1zU1VGQlNUdG5Ra0ZEYkVJc1NVRkJTU3hGUVVGRkxFOUJRVThzUTBGQlF5eEpRVUZKTzJGQlEzSkNMRU5CUVVNN2FVSkJRMFFzVFVGQlRTeERRVUZETEVkQlFVY3NSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVNelFpeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXdyUWtGQkswSXNSVUZCUlN4VlFVRlRMRWxCUVVrN1dVRkROME1zVDBGQlR5eERRVUZETEU5QlFVY3NRMEZCUXp0cFFrRkRVQ3hKUVVGSkxFTkJRVU1zY1VKQlFYRkNMRU5CUVVNN2FVSkJRek5DTEVkQlFVY3NRMEZCUXl4blFrRkJaMElzUlVGQlJTeExRVUZMTEVOQlFVTTdhVUpCUXpWQ0xFbEJRVWtzUTBGQlF6dG5Ra0ZEUml4TFFVRkxMRVZCUVVVc1QwRkJUeXhEUVVGRExFdEJRVXM3WjBKQlEzQkNMRWxCUVVrc1JVRkJSU3hQUVVGUExFTkJRVU1zU1VGQlNUdG5Ra0ZEYkVJc1NVRkJTU3hGUVVGRkxGZEJRVmM3WVVGRGNFSXNRMEZCUXp0cFFrRkRSQ3hOUVVGTkxFTkJRVU1zUjBGQlJ5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUXpOQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NSVUZCUlN4RFFVRkRMRFpEUVVFMlF5eEZRVUZGTEZWQlFWTXNTVUZCU1R0WlFVTXpSQ3hQUVVGUExFTkJRVU1zVDBGQlJ5eERRVUZETzJsQ1FVTlFMRWxCUVVrc1EwRkJReXh4UWtGQmNVSXNRMEZCUXp0cFFrRkRNMElzUjBGQlJ5eERRVUZETEdkQ1FVRm5RaXhGUVVGRkxFdEJRVXNzUTBGQlF6dHBRa0ZETlVJc1NVRkJTU3hEUVVGRE8yZENRVU5HTEV0QlFVc3NSVUZCUlN4UlFVRlJMRU5CUVVNc1MwRkJTenRuUWtGRGNrSXNTVUZCU1N4RlFVRkZMRTlCUVU4c1EwRkJReXhKUVVGSk8yZENRVU5zUWl4SlFVRkpMRVZCUVVVc1QwRkJUeXhEUVVGRExFbEJRVWs3WVVGRGNrSXNRMEZCUXp0cFFrRkRSQ3hOUVVGTkxFTkJRVU1zUjBGQlJ5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUXpOQ0xFTkJRVU1zUTBGQlF5eERRVUZETzBsQlExQXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRTQ3hSUVVGUkxFTkJRVU1zZVVKQlFYbENMRVZCUVVVN1VVRkRhRU1zU1VGQlNTeFhRVUZYTEVkQlFVYzdXVUZEWkN4SlFVRkpMRVZCUVVVc1ZVRkJWVHRaUVVOb1FpeExRVUZMTEVWQlFVVXNiVUpCUVcxQ08xbEJRekZDTEVsQlFVa3NSVUZCUlN4TlFVRk5PMU5CUTJZc1EwRkJRenRSUVVWR0xFVkJRVVVzUTBGQlF5eDNRa0ZCZDBJc1JVRkJSU3hWUVVGVExFbEJRVWs3V1VGRGRFTXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJRenRwUWtGRFVDeEhRVUZITEVOQlFVTXNjVUpCUVhGQ0xFTkJRVU03YVVKQlF6RkNMRWRCUVVjc1EwRkJReXhuUWtGQlowSXNSVUZCUlN4TFFVRkxMRU5CUVVNN2FVSkJRelZDTEVsQlFVa3NRMEZCUXl4RlFVRkRMRXRCUVVzc1JVRkJSU3hSUVVGUkxFTkJRVU1zUzBGQlN5eEZRVUZGTEVsQlFVa3NSVUZCUlN4WFFVRlhMRVZCUVVNc1EwRkJRenRwUWtGRGFFUXNUVUZCVFN4RFFVRkRMRWRCUVVjc1JVRkJSU3hWUVVGRExFZEJRVkVzUlVGQlJTeEhRVUZ4UWp0blFrRkRla01zU1VGQlNTeEhRVUZITzI5Q1FVRkZMRTlCUVU4c1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzJkQ1FVTXhRaXhwUWtGQlNTeERRVUZETEZkQlFWY3NRMEZCUXl4WFFVRlhMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFVTXNSMEZCVVN4RlFVRkZMRWxCUVZjN2IwSkJRek5FTEVsQlFVa3NSMEZCUnp0M1FrRkJSU3hQUVVGUExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0dlFrRkRNVUlzWVVGQlRTeERRVUZETEZOQlFWTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenR2UWtGRGRrSXNZVUZCVFN4RFFVRkRMRmRCUVZjc1EwRkJReXhKUVVGSkxFVkJRVVVzVjBGQlZ5eERRVUZETEVOQlFVTTdiMEpCUTNSRExFbEJRVWtzUlVGQlJTeERRVUZETzJkQ1FVTllMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMUFzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEV0N4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5d3JRMEZCSzBNc1JVRkJSU3hWUVVGVExFbEJRVWs3V1VGRE4wUXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJRenRwUWtGRFVDeEhRVUZITEVOQlFVTXNjVUpCUVhGQ0xFTkJRVU03YVVKQlF6RkNMRWRCUVVjc1EwRkJReXhuUWtGQlowSXNSVUZCUlN4TFFVRkxMRU5CUVVNN2FVSkJRelZDTEVsQlFVa3NRMEZCUXl4RlFVRkRMRXRCUVVzc1JVRkJSU3gxUWtGQmRVSXNSVUZCUlN4SlFVRkpMRVZCUVVVc1YwRkJWeXhGUVVGRExFTkJRVU03YVVKQlEzcEVMRTFCUVUwc1EwRkJReXhIUVVGSExFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTTdVVUZETTBJc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEZRVUZGTEVOQlFVTXNiME5CUVc5RExFVkJRVVVzVlVGQlV5eEpRVUZKTzFsQlEyeEVMRTlCUVU4c1EwRkJReXhQUVVGSExFTkJRVU03YVVKQlExQXNSMEZCUnl4RFFVRkRMSEZDUVVGeFFpeERRVUZETzJsQ1FVTXhRaXhIUVVGSExFTkJRVU1zWjBKQlFXZENMRVZCUVVVc1MwRkJTeXhEUVVGRE8ybENRVU0xUWl4SlFVRkpMRU5CUVVNN1owSkJRMFlzUzBGQlN5eEZRVUZGTEZGQlFWRXNRMEZCUXl4TFFVRkxPMmRDUVVOeVFpeEpRVUZKTEVWQlFVVXNUVUZCVFN4RFFVRkRMRTFCUVUwc1EwRkJReXhGUVVGRkxFVkJRVVVzVjBGQlZ5eEZRVUZGTEVWQlFVTXNTMEZCU3l4RlFVRkZMRmRCUVZjc1JVRkJReXhEUVVGRE8yRkJRemRFTEVOQlFVTXNRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzFGQlF6ZENMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzUlVGQlJTeERRVUZETEN0Q1FVRXJRaXhGUVVGRkxGVkJRVk1zU1VGQlNUdFpRVU0zUXl4UFFVRlBMRU5CUVVNc1QwRkJSeXhEUVVGRE8ybENRVU5RTEVkQlFVY3NRMEZCUXl4eFFrRkJjVUlzUTBGQlF6dHBRa0ZETVVJc1IwRkJSeXhEUVVGRExHZENRVUZuUWl4RlFVRkZMRXRCUVVzc1EwRkJRenRwUWtGRE5VSXNTVUZCU1N4RFFVRkRPMmRDUVVOR0xFdEJRVXNzUlVGQlJTeFJRVUZSTEVOQlFVTXNTMEZCU3p0blFrRkRja0lzU1VGQlNTeEZRVUZGTEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc1JVRkJSU3hGUVVGRkxGZEJRVmNzUlVGQlJTeEZRVUZGTEVsQlFVa3NSVUZCUlN4WFFVRlhMRVZCUVVVc1EwRkJRenRoUVVNNVJDeERRVUZETEVOQlFVTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1JVRkJSU3hKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU0zUWl4RFFVRkRMRU5CUVVNc1EwRkJRVHRKUVVOT0xFTkJRVU1zUTBGQlF5eERRVUZETzBsQlEwZ3NVVUZCVVN4RFFVRkRMRFJDUVVFMFFpeEZRVUZGTzFGQlEyNURMRlZCUVZVc1EwRkJReXhWUVVGVExFbEJRVWs3V1VGRGNFSXNTVUZCU1N4SlFVRkpMRWRCUVVjc1NVRkJTU3hwUWtGQlNTeERRVUZETzJkQ1FVTm9RaXhKUVVGSkxFVkJRVVVzVlVGQlZUdG5Ra0ZEYUVJc1MwRkJTeXhGUVVGRkxHMUNRVUZ0UWp0blFrRkRNVUlzU1VGQlNTeEZRVUZGTEUxQlFVMDdaMEpCUTFvc1VVRkJVU3hGUVVGRkxFMUJRVTA3WVVGRGJrSXNRMEZCUXl4RFFVRkRPMWxCUTBnc1NVRkJTU3haUVVGWkxFZEJRVWNzU1VGQlNTeHBRa0ZCU1N4RFFVRkRPMmRDUVVONFFpeEpRVUZKTEVWQlFVVXNUVUZCVFR0blFrRkRXaXhMUVVGTExFVkJRVVVzYTBKQlFXdENPMmRDUVVONlFpeEpRVUZKTEVWQlFVVXNUVUZCVFR0blFrRkRXaXhSUVVGUkxFVkJRVVVzVlVGQlZUdG5Ra0ZEY0VJc1QwRkJUeXhGUVVGRkxFbEJRVWs3WVVGRGFFSXNRMEZCUXl4RFFVRkRPMWxCUTBnc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZETEVkQlFWRTdaMEpCUTJZc1NVRkJTU3hIUVVGSE8yOUNRVUZGTEU5QlFVOHNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8yZENRVU14UWl4WlFVRlpMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVU1zUjBGQlVUdHZRa0ZEZGtJc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzJkQ1FVTmtMRU5CUVVNc1EwRkJReXhEUVVGQk8xbEJRMDRzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5eDNRa0ZCZDBJc1JVRkJSU3hWUVVGVExFbEJRVWs3V1VGRGRFTXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJReXhEUVVOUUxGRkJRVTBzUTBGQlFTeERRVUZETEhGQ1FVRnhRaXhEUVVGRE8ybENRVU0zUWl4SFFVRkhMRU5CUVVNc1owSkJRV2RDTEVWQlFVVXNTMEZCU3l4RFFVRkRPMmxDUVVNMVFpeEpRVUZKTEVOQlFVTXNSVUZCUXl4TFFVRkxMRVZCUVVVc2JVSkJRVzFDTEVWQlFVTXNRMEZCUXp0cFFrRkRiRU1zVFVGQlRTeERRVUZETEVkQlFVY3NSVUZCUlN4VlFVRkRMRWRCUVZFN1owSkJRMnhDTEVsQlFVa3NSMEZCUnp0dlFrRkJSU3hQUVVGUExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0blFrRkRNVUlzYVVKQlFVa3NRMEZCUXl4WFFVRlhMRU5CUVVNc2JVSkJRVzFDTEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJReXhIUVVGUkxFVkJRVVVzU1VGQlZ6dHZRa0ZETjBRc1NVRkJTU3hIUVVGSE8zZENRVUZGTEU5QlFVOHNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8yOUNRVU14UWl4aFFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0dlFrRkROVUlzU1VGQlNTeEZRVUZGTEVOQlFVTTdaMEpCUTFnc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRFVDeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTllMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzUlVGQlJTeERRVUZETEdkRVFVRm5SQ3hGUVVGRkxGVkJRVk1zU1VGQlNUdFpRVU01UkN4UFFVRlBMRU5CUVVNc1QwRkJSeXhEUVVGRExFTkJRMUFzVVVGQlRTeERRVUZCTEVOQlFVTXNjVUpCUVhGQ0xFTkJRVU03YVVKQlF6ZENMRWRCUVVjc1EwRkJReXhuUWtGQlowSXNSVUZCUlN4TFFVRkxMRU5CUVVNN2FVSkJRelZDTEVsQlFVa3NRMEZCUXl4RlFVRkRMRXRCUVVzc1JVRkJSU3hSUVVGUkxFTkJRVU1zUzBGQlN5eEZRVUZETEVOQlFVTTdhVUpCUXpkQ0xFMUJRVTBzUTBGQlF5eEhRVUZITEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRNMElzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4RlFVRkZMRU5CUVVNc0swSkJRU3RDTEVWQlFVVXNWVUZCVXl4SlFVRkpPMWxCUXpkRExFOUJRVThzUTBGQlF5eFBRVUZITEVOQlFVTXNRMEZEVUN4UlFVRk5MRU5CUVVFc1EwRkJReXh4UWtGQmNVSXNRMEZCUXp0cFFrRkROMElzUjBGQlJ5eERRVUZETEdkQ1FVRm5RaXhGUVVGRkxFdEJRVXNzUTBGQlF6dHBRa0ZETlVJc1NVRkJTU3hEUVVGRExFVkJRVVVzUzBGQlN5eEZRVUZGTEd0Q1FVRnJRaXhGUVVGRExFTkJRVU03YVVKQlEyeERMRTFCUVUwc1EwRkJReXhIUVVGSExFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTTdVVUZETTBJc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEZRVUZGTEVOQlFVTXNjVU5CUVhGRExFVkJRVVVzVlVGQlV5eEpRVUZKTzFsQlEyNUVMRTlCUVU4c1EwRkJReXhQUVVGSExFTkJRVU1zUTBGRFVDeFJRVUZOTEVOQlFVRXNRMEZCUXl4eFFrRkJjVUlzUTBGQlF6dHBRa0ZETjBJc1IwRkJSeXhEUVVGRExHZENRVUZuUWl4RlFVRkZMRXRCUVVzc1EwRkJRenRwUWtGRE5VSXNTVUZCU1N4RFFVRkRMRVZCUVVVc1MwRkJTeXhGUVVGRkxHdENRVUZyUWl4RlFVRkZMRU5CUVVNN2FVSkJRMjVETEUxQlFVMHNRMEZCUXl4SFFVRkhMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRE0wSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hGUVVGRkxFTkJRVU1zYlVOQlFXMURMRVZCUVVVc1ZVRkJVeXhKUVVGSk8xbEJRMnBFTEU5QlFVOHNRMEZCUXl4UFFVRkhMRU5CUVVNc1EwRkRVQ3hSUVVGTkxFTkJRVUVzUTBGQlF5eHhRa0ZCY1VJc1EwRkJRenRwUWtGRE4wSXNSMEZCUnl4RFFVRkRMR2RDUVVGblFpeEZRVUZGTEV0QlFVc3NRMEZCUXp0cFFrRkROVUlzU1VGQlNTeERRVUZETEVWQlFVVXNTMEZCU3l4RlFVRkZMRmRCUVZjc1JVRkJSU3hEUVVGRE8ybENRVU0xUWl4TlFVRk5MRU5CUVVNc1IwRkJSeXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzFGQlF6TkNMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzUlVGQlJTeERRVUZETEc5RVFVRnZSQ3hGUVVGRkxGVkJRVk1zU1VGQlNUdFpRVU5zUlN4SlFVRkpMRWxCUVVrc1IwRkJWU3hKUVVGSkxHbENRVUZKTEVOQlFVTTdaMEpCUTNaQ0xFbEJRVWtzUlVGQlJTeE5RVUZOTzJkQ1FVTmFMRXRCUVVzc1JVRkJSU3h4UWtGQmNVSTdaMEpCUXpWQ0xGRkJRVkVzUlVGQlJTeHRRa0ZCVVN4RFFVRkRMRlZCUVZVc1EwRkJRenRuUWtGRE9VSXNTVUZCU1N4RlFVRkZMRTFCUVUwN1lVRkRaaXhEUVVGRExFTkJRVU03V1VGRFNDeEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVVNc1IwRkJVU3hGUVVGRkxFbEJRVmM3WjBKQlF6VkNMRWxCUVVrc1IwRkJSenR2UWtGQlJTeFBRVUZQTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRuUWtGRk1VSXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJRenR4UWtGRFVDeEpRVUZKTEVOQlFVTXNaVUZCWlN4RFFVRkRPM0ZDUVVOeVFpeEpRVUZKTEVOQlFVTXNSVUZCUlN4TFFVRkxMRVZCUVVVc2NVSkJRWEZDTEVWQlFVVXNVVUZCVVN4RlFVRkZMRlZCUVZVc1JVRkJSU3hEUVVGRE8zRkNRVU0xUkN4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRE8zRkNRVU5ZTEVkQlFVY3NRMEZCUXl4VlFVRkRMRWRCUVZFc1JVRkJSU3hIUVVGeFFqdHZRa0ZEYWtNc1MwRkJTeXhIUVVGSExFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zUTBGQlF6dHZRa0ZEYkVNc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF5eERRVU5RTEZGQlFVMHNRMEZCUVN4RFFVRkRMSEZDUVVGeFFpeERRVUZETzNsQ1FVTTNRaXhIUVVGSExFTkJRVU1zWjBKQlFXZENMRVZCUVVVc1MwRkJTeXhEUVVGRE8zbENRVU0xUWl4TlFVRk5MRU5CUVVNc1IwRkJSeXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzJkQ1FVTXpRaXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU5RTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTFnc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEZRVUZGTEVOQlFVTXNiVU5CUVcxRExFVkJRVVVzVlVGQlV5eEpRVUZKTzFsQlEycEVMRTlCUVU4c1EwRkJReXhQUVVGSExFTkJRVU1zUTBGRFVDeFJRVUZOTEVOQlFVRXNRMEZCUXl4eFFrRkJjVUlzUTBGQlF6dHBRa0ZETjBJc1RVRkJUU3hEUVVGRExFZEJRVWNzUlVGQlJTeEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTXpRaXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTBnc1VVRkJVU3hEUVVGRExEQkNRVUV3UWl4RlFVRkZPMUZCUTJwRExGVkJRVlVzUTBGQlF5eFZRVUZWTEVsQlFVazdXVUZEY2tJc1NVRkJTU3hKUVVGSkxFZEJRVWNzU1VGQlNTeHBRa0ZCU1N4RFFVRkRPMmRDUVVOb1FpeEpRVUZKTEVWQlFVVXNWVUZCVlR0blFrRkRhRUlzUzBGQlN5eEZRVUZGTEdsQ1FVRnBRanRuUWtGRGVFSXNTVUZCU1N4RlFVRkZMRTFCUVUwN1owSkJRMW9zVVVGQlVTeEZRVUZGTEUxQlFVMDdZVUZEYmtJc1EwRkJReXhEUVVGRE8xbEJRMGdzU1VGQlNTeFpRVUZaTEVkQlFVY3NTVUZCU1N4cFFrRkJTU3hEUVVGRE8yZENRVU40UWl4SlFVRkpMRVZCUVVVc1RVRkJUVHRuUWtGRFdpeExRVUZMTEVWQlFVVXNhMEpCUVd0Q08yZENRVU42UWl4SlFVRkpMRVZCUVVVc1RVRkJUVHRuUWtGRFdpeFJRVUZSTEVWQlFVVXNWVUZCVlR0blFrRkRjRUlzVDBGQlR5eEZRVUZGTEVsQlFVazdZVUZEYUVJc1EwRkJReXhEUVVGRE8xbEJRMGdzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRkRMRWRCUVZFN1owSkJRMllzU1VGQlNTeEhRVUZITzI5Q1FVRkZMRTlCUVU4c1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzJkQ1FVTXhRaXhaUVVGWkxFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFVTXNSMEZCVVR0dlFrRkRka0lzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMmRDUVVOa0xFTkJRVU1zUTBGQlF5eERRVUZCTzFsQlEwNHNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl4NVFrRkJlVUlzUlVGQlJTeFZRVUZUTEVsQlFVazdXVUZEZGtNc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF6dHBRa0ZEVUN4SFFVRkhMRU5CUVVNc2MwSkJRWE5DTEVOQlFVTTdhVUpCUXpOQ0xFZEJRVWNzUTBGQlF5eG5Ra0ZCWjBJc1JVRkJSU3hMUVVGTExFTkJRVU03YVVKQlF6VkNMRWxCUVVrc1EwRkJReXhGUVVGRkxFdEJRVXNzUlVGQlJTeHJRa0ZCYTBJc1JVRkJSU3hEUVVGRE8ybENRVU51UXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhGUVVGRkxGVkJRVU1zUjBGQlVUdG5Ra0ZEYkVJc1NVRkJTU3hIUVVGSE8yOUNRVUZGTEU5QlFVOHNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8yZENRVU14UWl4cFFrRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF5eHJRa0ZCYTBJc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZETEVkQlFWRXNSVUZCUlN4SlFVRlhPMjlDUVVNMVJDeEpRVUZKTEVkQlFVYzdkMEpCUVVVc1QwRkJUeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTTdiMEpCUXpGQ0xHRkJRVTBzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRE8yOUNRVU0zUWl4SlFVRkpMRVZCUVVVc1EwRkJRenRuUWtGRFdDeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTlFMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMWdzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4RlFVRkZMRU5CUVVNc2NVTkJRWEZETEVWQlFVVXNWVUZCVXl4SlFVRkpPMWxCUTI1RUxFOUJRVThzUTBGQlF5eFBRVUZITEVOQlFVTTdhVUpCUTFBc1IwRkJSeXhEUVVGRExITkNRVUZ6UWl4RFFVRkRPMmxDUVVNelFpeEhRVUZITEVOQlFVTXNaMEpCUVdkQ0xFVkJRVVVzUzBGQlN5eERRVUZETzJsQ1FVTTFRaXhKUVVGSkxFTkJRVU1zUlVGQlJTeExRVUZMTEVWQlFVVXNkVUpCUVhWQ0xFVkJRVU1zUTBGQlF6dHBRa0ZEZGtNc1RVRkJUU3hEUVVGRExFZEJRVWNzUlVGQlJTeEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTXpRaXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl3clFrRkJLMElzUlVGQlJTeFZRVUZUTEVsQlFVazdXVUZETjBNc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF6dHBRa0ZEVUN4SFFVRkhMRU5CUVVNc2MwSkJRWE5DTEVOQlFVTTdhVUpCUXpOQ0xFZEJRVWNzUTBGQlF5eG5Ra0ZCWjBJc1JVRkJSU3hMUVVGTExFTkJRVU03YVVKQlF6VkNMRWxCUVVrc1EwRkJReXhGUVVGRkxFdEJRVXNzUlVGQlJTeHBRa0ZCYVVJc1JVRkJSU3hEUVVGRE8ybENRVU5zUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzFGQlF6TkNMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzUlVGQlJTeERRVUZETEc5RVFVRnZSQ3hGUVVGRkxGVkJRVk1zU1VGQlNUdFpRVU5zUlN4SlFVRkpMRWxCUVVrc1IwRkJWU3hKUVVGSkxHbENRVUZKTEVOQlFVTTdaMEpCUTNaQ0xFbEJRVWtzUlVGQlJTeE5RVUZOTzJkQ1FVTmFMRXRCUVVzc1JVRkJSU3h4UWtGQmNVSTdaMEpCUXpWQ0xGRkJRVkVzUlVGQlJTeHRRa0ZCVVN4RFFVRkRMRlZCUVZVc1EwRkJRenRuUWtGRE9VSXNTVUZCU1N4RlFVRkZMRTFCUVUwN1lVRkRaaXhEUVVGRExFTkJRVU03V1VGRFNDeEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVVNc1IwRkJVU3hGUVVGRkxFbEJRVmM3WjBKQlF6VkNMRWxCUVVrc1IwRkJSenR2UWtGQlJTeFBRVUZQTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRuUWtGRk1VSXNUMEZCVHl4RFFVRkRMRTlCUVVjc1EwRkJRenR4UWtGRFVDeEpRVUZKTEVOQlFVTXNaVUZCWlN4RFFVRkRPM0ZDUVVOeVFpeEpRVUZKTEVOQlFVTXNSVUZCUlN4TFFVRkxMRVZCUVVVc2NVSkJRWEZDTEVWQlFVVXNVVUZCVVN4RlFVRkZMRlZCUVZVc1JVRkJSU3hEUVVGRE8zRkNRVU0xUkN4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRE8zRkNRVU5ZTEVkQlFVY3NRMEZCUXl4VlFVRkRMRWRCUVZFc1JVRkJSU3hIUVVGeFFqdHZRa0ZEYWtNc1MwRkJTeXhIUVVGSExFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zUTBGQlF6dHZRa0ZEYkVNc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF6dDVRa0ZEVUN4SFFVRkhMRU5CUVVNc2MwSkJRWE5DTEVOQlFVTTdlVUpCUXpOQ0xFZEJRVWNzUTBGQlF5eG5Ra0ZCWjBJc1JVRkJSU3hMUVVGTExFTkJRVU03ZVVKQlF6VkNMRTFCUVUwc1EwRkJReXhIUVVGSExFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTTdaMEpCUXpOQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFsQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl4dFEwRkJiVU1zUlVGQlJTeFZRVUZUTEVsQlFVazdXVUZEYWtRc1QwRkJUeXhEUVVGRExFOUJRVWNzUTBGQlF6dHBRa0ZEVUN4SFFVRkhMRU5CUVVNc2MwSkJRWE5DTEVOQlFVTTdhVUpCUXpOQ0xFbEJRVWtzUTBGQlF5eEZRVUZGTEV0QlFVc3NSVUZCUlN4cFFrRkJhVUlzUlVGQlJTeERRVUZETzJsQ1FVTnNReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUXpOQ0xFTkJRVU1zUTBGQlF5eERRVUZETzBsQlExQXNRMEZCUXl4RFFVRkRMRU5CUVVNN1FVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF5SjkiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5yZXF1aXJlKFwibW9jaGFcIik7XG52YXIgYXhpb3NfMSA9IHJlcXVpcmUoXCJheGlvc1wiKTtcbnZhciBjaGFpXzEgPSByZXF1aXJlKFwiY2hhaVwiKTtcbnZhciBheGlvc19tb2NrX2FkYXB0ZXJfMSA9IHJlcXVpcmUoXCJheGlvcy1tb2NrLWFkYXB0ZXJcIik7XG52YXIgcmVkdXhfbW9ja19zdG9yZV8xID0gcmVxdWlyZShcInJlZHV4LW1vY2stc3RvcmVcIik7XG52YXIgcmVkdXhfdGh1bmtfMSA9IHJlcXVpcmUoXCJyZWR1eC10aHVua1wiKTtcbnZhciB1c2VyQWN0aW9uc18xID0gcmVxdWlyZShcIi4uLy4uL3NyYy93ZWIvYWN0aW9ucy91c2VyQWN0aW9uc1wiKTtcbnZhciBub3RpZmljYXRpb25zQWN0aW9uc18xID0gcmVxdWlyZShcIi4uLy4uL3NyYy93ZWIvYWN0aW9ucy9ub3RpZmljYXRpb25zQWN0aW9uc1wiKTtcbnZhciBzb2NrZXRBY3Rpb25zXzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL3dlYi9hY3Rpb25zL3NvY2tldEFjdGlvbnNcIik7XG52YXIgY2hhbm5lbHNBY3Rpb25zXzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL3dlYi9hY3Rpb25zL2NoYW5uZWxzQWN0aW9uc1wiKTtcbnZhciBjaGF0VXNlcnNBY3Rpb25zXzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL3dlYi9hY3Rpb25zL2NoYXRVc2Vyc0FjdGlvbnNcIik7XG52YXIgbW9ja1N0b3JlQ3JlYXRvciA9IHJlZHV4X21vY2tfc3RvcmVfMVtcImRlZmF1bHRcIl0oW3JlZHV4X3RodW5rXzFbXCJkZWZhdWx0XCJdXSk7XG5mdW5jdGlvbiBnZXRTdG9yZShzdG9yZSkge1xuICAgIGlmIChzdG9yZSA9PT0gdm9pZCAwKSB7IHN0b3JlID0ge307IH1cbiAgICByZXR1cm4gbW9ja1N0b3JlQ3JlYXRvcihzdG9yZSk7XG59XG5kZXNjcmliZSgnQXN5bmMgQWN0aW9ucycsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbW9ja1N0b3JlO1xuICAgIHZhciBtb2NrQXhpb3M7XG4gICAgYmVmb3JlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbW9ja0F4aW9zID0gbmV3IGF4aW9zX21vY2tfYWRhcHRlcl8xW1wiZGVmYXVsdFwiXShheGlvc18xW1wiZGVmYXVsdFwiXSk7XG4gICAgfSk7XG4gICAgYWZ0ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICBtb2NrQXhpb3MucmVzdG9yZSgpO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdVc2VyIGFzeW5jIGFjdGlvbnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbW9ja1N0b3JlID0gZ2V0U3RvcmUoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zLm9uQW55KCkucmVwbHkoMjAwLCB7fSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGhhbmRsZSBjYWxsYmFjayBhbmQgc2V0IGluZm8gJyArXG4gICAgICAgICAgICAnb24gc3VjY2Vzc2Z1bCBwb3N0IHJlcXVlc3QgdG8gL2FwaS92MS91c2VyL3VwZGF0ZS9uYW1lJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHZhciBuYW1lID0gZmFsc2U7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2godXNlckFjdGlvbnNfMS51cGRhdGVOYW1lKCdBZHJpYW4nLCBmdW5jdGlvbiAoKSB7IHJldHVybiBuYW1lID0gJ0Fkcmlhbic7IH0pKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKG5hbWUsICdBZHJpYW4nKTtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuQUREX0lORk8sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAnTmFtZSB1cGRhdGVkJ1xuICAgICAgICAgICAgICAgICAgICB9XSk7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgc2V0IGFuIGVycm9yIG9uIGZhaWxlZCBwb3N0IHJlcXVlc3QgdG8gL2FwaS92MS91c2VyL3VwZGF0ZS9uYW1lJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHZhciBuYW1lID0gZmFsc2U7XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5vblBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvbmFtZScpLnJlcGx5KDUwMCwgeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyB9KTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaCh1c2VyQWN0aW9uc18xLnVwZGF0ZU5hbWUoJ0FkcmlhbicsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5hbWUgPSAnQWRyaWFuJzsgfSkpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwobmFtZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5BRERfRVJST1IsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcnXG4gICAgICAgICAgICAgICAgICAgIH1dKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBoYW5kbGUgY2FsbGJhY2sgYW5kIHNldCBpbmZvICcgK1xuICAgICAgICAgICAgJ29uIHN1Y2Nlc3NmdWwgcG9zdCByZXF1ZXN0IHRvIC9hcGkvdjEvdXNlci91cGRhdGUvZW1haWwnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdmFyIGVtYWlsID0gZmFsc2U7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2godXNlckFjdGlvbnNfMS51cGRhdGVFbWFpbCgndGVzdEB0ZXN0LmNvbScsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVtYWlsID0gJ3Rlc3RAdGVzdC5jb20nOyB9KSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChlbWFpbCwgJ3Rlc3RAdGVzdC5jb20nKTtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuQUREX0lORk8sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAnRW1haWwgdXBkYXRlZCdcbiAgICAgICAgICAgICAgICAgICAgfV0pO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHNldCBhbiBlcnJvciBvbiBmYWlsZWQgcG9zdCByZXF1ZXN0IHRvIC9hcGkvdjEvdXNlci91cGRhdGUvZW1haWwnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdmFyIGVtYWlsID0gZmFsc2U7XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5vblBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvZW1haWwnKS5yZXBseSg1MDAsIHsgZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZycgfSk7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2godXNlckFjdGlvbnNfMS51cGRhdGVFbWFpbCgndGVzdEB0ZXN0LmNvbScsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVtYWlsID0gJ3Rlc3RAdGVzdC5jb20nOyB9KSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKGVtYWlsKTtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuQUREX0VSUk9SLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJ1NvbWV0aGluZyB3ZW50IHdyb25nJ1xuICAgICAgICAgICAgICAgICAgICB9XSk7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgc2V0IGluZm8gb24gc3VjY2Vzc2Z1bCBwb3N0IHJlcXVlc3QgdG8gL2FwaS92MS91c2VyL3VwZGF0ZS9wYXNzd29yZCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICB2YXIgdXBkYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgbW9ja1N0b3JlLmRpc3BhdGNoKHVzZXJBY3Rpb25zXzEudXBkYXRlUGFzc3dvcmQoJ2EnLCAnYicsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVwZGF0ZWQgPSB0cnVlOyB9KSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc1RydWUodXBkYXRlZCk7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBub3RpZmljYXRpb25zQWN0aW9uc18xLkFERF9JTkZPLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJ1Bhc3N3b3JkIHVwZGF0ZWQnXG4gICAgICAgICAgICAgICAgICAgIH1dKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBzZXQgYW4gZXJyb3Igb24gZmFpbGVkIHBvc3QgcmVxdWVzdCB0byAvYXBpL3YxL3VzZXIvdXBkYXRlL3Bhc3N3b3JkJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHZhciB1cGRhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5vblBvc3QoJy9hcGkvdjEvdXNlci91cGRhdGUvcGFzc3dvcmQnKS5yZXBseSg1MDAsIHsgZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZycgfSk7XG4gICAgICAgICAgICBtb2NrU3RvcmUuZGlzcGF0Y2godXNlckFjdGlvbnNfMS51cGRhdGVQYXNzd29yZCgnYScsICdiJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gdXBkYXRlZCA9IHRydWU7IH0pKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2UodXBkYXRlZCk7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBub3RpZmljYXRpb25zQWN0aW9uc18xLkFERF9FUlJPUixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICdTb21ldGhpbmcgd2VudCB3cm9uZydcbiAgICAgICAgICAgICAgICAgICAgfV0pO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdDaGFubmVscyBhc3luYyBhY3Rpb25zJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG1vY2tTdG9yZSA9IG1vY2tTdG9yZUNyZWF0b3Ioe1xuICAgICAgICAgICAgICAgIGNoYW5uZWxzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbmFtZTogJ2dlbmVyYWwnLCBmZXRjaGluZ05ld01lc3NhZ2VzOiBmYWxzZSwgaGFzTW9yZU1lc3NhZ2VzOiB0cnVlLCByZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0OiAwIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbmFtZTogJ2ZldGNoaW5nIG5ldyBtZXNzYWdlcycsIGZldGNoaW5nTmV3TWVzc2FnZXM6IHRydWUsIGhhc01vcmVNZXNzYWdlczogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgICAgICB7IG5hbWU6ICdubyBtb3JlIG1lc3NhZ2VzJywgZmV0Y2hpbmdOZXdNZXNzYWdlczogZmFsc2UsIGhhc01vcmVNZXNzYWdlczogZmFsc2UgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3Mub25BbnkoKS5yZXBseSgyMDAsIHt9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZmV0Y2ggY2hhbm5lbHMgYW5kIGRpc3BhdGNoIGFkZENoYW5uZWxzIHdpdGggYW4gYXJyYXkgb2YgY2hhbm5lbCBuYW1lcycsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICB2YXIgY2hhbm5lbHMgPSBbXG4gICAgICAgICAgICAgICAgeyBfaWQ6ICcxJywgbmFtZTogJ2dlbmVyYWwnIH0sXG4gICAgICAgICAgICAgICAgeyBfaWQ6ICcyJywgbmFtZTogJ3JhbmRvbScgfSxcbiAgICAgICAgICAgICAgICB7IF9pZDogJzMnLCBuYW1lOiAnc29tZXRoaW5nIGVsc2UnIH1cbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvc1xuICAgICAgICAgICAgICAgIC5vbkdldCgnL2FwaS92MS9jaGFubmVscycpXG4gICAgICAgICAgICAgICAgLnJlcGx5KDIwMCwgeyBjaGFubmVsczogY2hhbm5lbHMgfSk7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuZmV0Y2hDaGFubmVscygpKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgdmFyIGFkZENoYW5uZWxzQWN0aW9uID0gY2hhbm5lbHNBY3Rpb25zXzEuYWRkQ2hhbm5lbHMoWydnZW5lcmFsJywgJ3JhbmRvbScsICdzb21ldGhpbmcgZWxzZSddKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbYWRkQ2hhbm5lbHNBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCBhZGRFcnJvciBvbiBmYWlsZWQgcmVxdWVzdCB0byAvYXBpL3YxL2NoYW5uZWxzJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zXG4gICAgICAgICAgICAgICAgLm9uR2V0KCcvYXBpL3YxL2NoYW5uZWxzJylcbiAgICAgICAgICAgICAgICAucmVwbHkoNTAwKTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5mZXRjaENoYW5uZWxzKCkpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JBY3Rpb24gPSBub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gZmV0Y2ggdGhlIGNoYW5uZWxzJyk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW2Vycm9yQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZGlzcGF0Y2ggYW4gZXJyb3IgaWYgcmV0cmlldmluZyBtZXNzYWdlcyB3aXRoIGludmFsaWQgY2hhbm5lbCBuYW1lJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5yZXRyaWV2ZUNoYW5uZWxNZXNzYWdlcygnaW52YWxpZCBuYW1lJykpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKG1zZykge1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwobXNnLCAnUmV0cmlldmUgQ2hhbm5lbCBNZXNzYWdlcyBkaXNwYXRjaGVkIHdpdGggaW5jb3JyZWN0IGNoYW5uZWwgbmFtZSBvciB3aGlsZSBhbHJlYWR5IGZldGNoaW5nIG1lc3NhZ2VzJyk7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgIHZhciBlcnJvckFjdGlvbiA9IG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBmZXRjaCBtZXNzYWdlcycpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFtlcnJvckFjdGlvbl0pO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGRpc3BhdGNoIGFuIGVycm9yIGlmIGFscmVhZHkgcmV0cmlldmluZyBjaGFubmVsIG1lc3NhZ2VzJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5yZXRyaWV2ZUNoYW5uZWxNZXNzYWdlcygnZmV0Y2hpbmcgbmV3IG1lc3NhZ2VzJykpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKG1zZykge1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwobXNnLCAnUmV0cmlldmUgQ2hhbm5lbCBNZXNzYWdlcyBkaXNwYXRjaGVkIHdpdGggaW5jb3JyZWN0IGNoYW5uZWwgbmFtZSBvciB3aGlsZSBhbHJlYWR5IGZldGNoaW5nIG1lc3NhZ2VzJyk7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgIHZhciBlcnJvckFjdGlvbiA9IG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBmZXRjaCBtZXNzYWdlcycpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFtlcnJvckFjdGlvbl0pO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZG9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGRpc3BhdGNoIGFuIGVycm9yIGlmIGNoYW5uZWwgZG9lcyBub3QgaGF2ZSBvbGRlciBtZXNzYWdlcycsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEucmV0cmlldmVDaGFubmVsTWVzc2FnZXMoJ25vIG1vcmUgbWVzc2FnZXMnKSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChtc2csICdSZXRyaWV2ZSBDaGFubmVsIE1lc3NhZ2VzIGRpc3BhdGNoZWQgd2l0aCBpbmNvcnJlY3QgY2hhbm5lbCBuYW1lIG9yIHdoaWxlIGFscmVhZHkgZmV0Y2hpbmcgbWVzc2FnZXMnKTtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgdmFyIGVycm9yQWN0aW9uID0gbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIGZldGNoIG1lc3NhZ2VzJyk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW2Vycm9yQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZGlzcGF0Y2ggYW4gZXJyb3Igb24gZmFpbGVkIGdldCByZXF1ZXN0IHRvIC9hcGkvdjEvbWVzc2FnZXMvJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zXG4gICAgICAgICAgICAgICAgLm9uR2V0KClcbiAgICAgICAgICAgICAgICAucmVwbHkoNTAwKTtcbiAgICAgICAgICAgIHZhciBjaGFubmVsID0gJ2dlbmVyYWwnO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLnJldHJpZXZlQ2hhbm5lbE1lc3NhZ2VzKGNoYW5uZWwpKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgdmFyIHNldEZldGNoaW5nVHJ1ZUFjdGlvbiA9IGNoYW5uZWxzQWN0aW9uc18xLnNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzKGNoYW5uZWwsIHRydWUpO1xuICAgICAgICAgICAgICAgIHZhciBlcnJvckFjdGlvbiA9IG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBmZXRjaCBtZXNzYWdlcycpO1xuICAgICAgICAgICAgICAgIHZhciBzZXRGZXRjaGluZ0ZhbHNlQWN0aW9uID0gY2hhbm5lbHNBY3Rpb25zXzEuc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMoY2hhbm5lbCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFtzZXRGZXRjaGluZ1RydWVBY3Rpb24sIGVycm9yQWN0aW9uLCBzZXRGZXRjaGluZ0ZhbHNlQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgc2V0IGNoYW5uZWxIYXNNb3JlTWVzc2FnZXMgb24gcmVzcG9uc2Ugd2l0aCBlbXB0eSBhcnJheScsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvc1xuICAgICAgICAgICAgICAgIC5vbkdldCgpXG4gICAgICAgICAgICAgICAgLnJlcGx5KDIwMCwgeyBtZXNzYWdlczogW10gfSk7XG4gICAgICAgICAgICB2YXIgY2hhbm5lbCA9ICdnZW5lcmFsJztcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5yZXRyaWV2ZUNoYW5uZWxNZXNzYWdlcyhjaGFubmVsKSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgIHZhciBzZXRGZXRjaGluZ1RydWVBY3Rpb24gPSBjaGFubmVsc0FjdGlvbnNfMS5zZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcyhjaGFubmVsLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB2YXIgc2V0SGFzTW9yZUFjdGlvbiA9IGNoYW5uZWxzQWN0aW9uc18xLnNldENoYW5uZWxIYXNNb3JlTWVzc2FnZXMoY2hhbm5lbCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHZhciBzZXRGZXRjaGluZ0ZhbHNlQWN0aW9uID0gY2hhbm5lbHNBY3Rpb25zXzEuc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMoY2hhbm5lbCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdGlvbnMsIFtzZXRGZXRjaGluZ1RydWVBY3Rpb24sIHNldEhhc01vcmVBY3Rpb24sIHNldEZldGNoaW5nRmFsc2VBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBpbmNyZW1lbnQgb2Zmc2V0IChiYXNlZCBvbiBudW1iZXIgb2YgcmVjZWl2ZWQgbWVzc2FnZXMpIGFuZCBhZGQgcmV0cmlldmVkIGNoYW5uZWwgbWVzc2FnZXMgb24gc3VjY2Vzc2Z1bCByZXRyZWl2ZUNoYW5uZWxNZXNzYWdlcyBhY3Rpb24nLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdmFyIGNoYW5uZWwgPSAnZ2VuZXJhbCc7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZXMgPSBbe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnMTIzJyxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZDogRGF0ZS5ub3coKS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICB1c2VyRW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICAgICAgX2lkOiAnMSdcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICc0NTYnLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkOiBEYXRlLm5vdygpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHVzZXJFbWFpbDogJ3Rlc3RAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgICAgICBfaWQ6ICcyJ1xuICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3NcbiAgICAgICAgICAgICAgICAub25HZXQoKVxuICAgICAgICAgICAgICAgIC5yZXBseSgyMDAsIHsgbWVzc2FnZXM6IG1lc3NhZ2VzIH0pO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLnJldHJpZXZlQ2hhbm5lbE1lc3NhZ2VzKGNoYW5uZWwpKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgdmFyIHNldEZldGNoaW5nVHJ1ZUFjdGlvbiA9IGNoYW5uZWxzQWN0aW9uc18xLnNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzKGNoYW5uZWwsIHRydWUpO1xuICAgICAgICAgICAgICAgIHZhciBpbmNyZW1lbnRPZmZzZXRBY3Rpb24gPSBjaGFubmVsc0FjdGlvbnNfMS5pbmNyZW1lbnRDaGFubmVsUmV0cmlldmVNZXNzYWdlc09mZnNldChjaGFubmVsLCBtZXNzYWdlcy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIHZhciBhZGRNZXNzYWdlc0FjdGlvbiA9IGNoYW5uZWxzQWN0aW9uc18xLmFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcyhjaGFubmVsLCBtZXNzYWdlcyk7XG4gICAgICAgICAgICAgICAgdmFyIHNldEZldGNoaW5nRmFsc2VBY3Rpb24gPSBjaGFubmVsc0FjdGlvbnNfMS5zZXRDaGFubmVsRmV0Y2hpbmdOZXdNZXNzYWdlcyhjaGFubmVsLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW1xuICAgICAgICAgICAgICAgICAgICBzZXRGZXRjaGluZ1RydWVBY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgIGluY3JlbWVudE9mZnNldEFjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgYWRkTWVzc2FnZXNBY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgIHNldEZldGNoaW5nRmFsc2VBY3Rpb25cbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCBpbmZvIG9uIHN1Y2Nlc3NmdWxseSBkZWxldGluZyBjaGFubmVsJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHZhciBjaGFubmVscyA9IFtcbiAgICAgICAgICAgICAgICB7IF9pZDogJzEnLCBuYW1lOiAnZ2VuZXJhbCcgfSxcbiAgICAgICAgICAgICAgICB7IF9pZDogJzInLCBuYW1lOiAncmFuZG9tJyB9LFxuICAgICAgICAgICAgICAgIHsgX2lkOiAnMycsIG5hbWU6ICdzb21ldGhpbmcgZWxzZScgfVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zXG4gICAgICAgICAgICAgICAgLm9uR2V0KCcvYXBpL3YxL2NoYW5uZWxzJylcbiAgICAgICAgICAgICAgICAucmVwbHkoMjAwLCB7IGNoYW5uZWxzOiBjaGFubmVscyB9KTtcbiAgICAgICAgICAgIG1vY2tBeGlvc1xuICAgICAgICAgICAgICAgIC5vbkdldCgpXG4gICAgICAgICAgICAgICAgLnJlcGx5KDIwMCk7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuZGVsZXRlQ2hhbm5lbCgnZ2VuZXJhbCcpKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgdmFyIGFkZEluZm9BY3Rpb24gPSBub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEluZm8oJ0NoYW5uZWwgZGVsZXRlZCcpO1xuICAgICAgICAgICAgICAgIHZhciBhZGRDaGFubmVsc0FjdGlvbiA9IGNoYW5uZWxzQWN0aW9uc18xLmFkZENoYW5uZWxzKFsnZ2VuZXJhbCcsICdyYW5kb20nLCAnc29tZXRoaW5nIGVsc2UnXSk7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0aW9ucywgW2FkZEluZm9BY3Rpb24sIGFkZENoYW5uZWxzQWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShkb25lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZGlzcGF0Y2ggYW4gZXJyb3Igb24gZmFpbGVkIGF0dGVtcHQgdG8gZGVsZXRlIGNoYW5uZWwnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgbW9ja0F4aW9zLnJlc2V0KCk7XG4gICAgICAgICAgICBtb2NrQXhpb3NcbiAgICAgICAgICAgICAgICAub25HZXQoKVxuICAgICAgICAgICAgICAgIC5yZXBseSg1MDAsIHsgZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZycgfSk7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuZGVsZXRlQ2hhbm5lbCgnZ2VuZXJhbCcpKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgdmFyIGFkZEVycm9yQWN0aW9uID0gbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3JvbmcnKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbYWRkRXJyb3JBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCBpbmZvIG9uIGNyZWF0aW5nIG5ldyBjaGFubmVsJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIHZhciBjaGFubmVscyA9IFtcbiAgICAgICAgICAgICAgICB7IF9pZDogJzEnLCBuYW1lOiAnZ2VuZXJhbCcgfSxcbiAgICAgICAgICAgICAgICB7IF9pZDogJzInLCBuYW1lOiAncmFuZG9tJyB9LFxuICAgICAgICAgICAgICAgIHsgX2lkOiAnMycsIG5hbWU6ICdzb21ldGhpbmcgZWxzZScgfVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5yZXNldCgpO1xuICAgICAgICAgICAgbW9ja0F4aW9zXG4gICAgICAgICAgICAgICAgLm9uR2V0KCcvYXBpL3YxL2NoYW5uZWxzJylcbiAgICAgICAgICAgICAgICAucmVwbHkoMjAwLCB7IGNoYW5uZWxzOiBjaGFubmVscyB9KTtcbiAgICAgICAgICAgIG1vY2tBeGlvc1xuICAgICAgICAgICAgICAgIC5vblBvc3QoKVxuICAgICAgICAgICAgICAgIC5yZXBseSgyMDApO1xuICAgICAgICAgICAgbW9ja1N0b3JlXG4gICAgICAgICAgICAgICAgLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmFkZENoYW5uZWwoJ25ldyBjaGFubmVsJykpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB2YXIgYWRkSW5mb0FjdGlvbiA9IG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkSW5mbygnQ2hhbm5lbCBjcmVhdGVkJyk7XG4gICAgICAgICAgICAgICAgdmFyIGFkZENoYW5uZWxzQWN0aW9uID0gY2hhbm5lbHNBY3Rpb25zXzEuYWRkQ2hhbm5lbHMoWydnZW5lcmFsJywgJ3JhbmRvbScsICdzb21ldGhpbmcgZWxzZSddKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbYWRkSW5mb0FjdGlvbiwgYWRkQ2hhbm5lbHNBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCBhbiBlcnJvciBvbiBmYWlsZWQgYXR0ZW1wdCB0byBjcmVhdGUgYSBuZXcgY2hhbm5lbCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvc1xuICAgICAgICAgICAgICAgIC5vbkFueSgpXG4gICAgICAgICAgICAgICAgLnJlcGx5KDUwMCwgeyBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nJyB9KTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5hZGRDaGFubmVsKCduZXcgY2hhbm5lbCcpKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgdmFyIGFkZEVycm9yQWN0aW9uID0gbm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignU29tZXRoaW5nIHdlbnQgd3JvbmcnKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbYWRkRXJyb3JBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnU29ja2V0IGFzeW5jIGFjdGlvbnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbW9ja1N0b3JlID0gZ2V0U3RvcmUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgaW5pdGlhbGl6ZSB3ZWJzb2NrZXQgY29ubmVjdGlvbicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG1vY2tTdG9yZS5kaXNwYXRjaChzb2NrZXRBY3Rpb25zXzEuaW5pdCgpKTtcbiAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbW9ja1N0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwoYWN0aW9uc1swXS50eXBlLCBzb2NrZXRBY3Rpb25zXzEuSU5JVF9XRUJTT0NLRVQpO1xuICAgICAgICAgICAgYWN0aW9uc1swXS5kYXRhLmlvLmNsb3NlKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdDaGF0IFVzZXJzIGFzeW5jIGFjdGlvbnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbW9ja1N0b3JlID0gZ2V0U3RvcmUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZGlwYXRjaCB1cGRhdGVVc2VycyBvbiBmZXRjaCBhbGwgdXNlcnMnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgdmFyIHVzZXJzUmVzcG9uc2UgPSBbe1xuICAgICAgICAgICAgICAgICAgICBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiAnYWRtaW4nLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAndGVzdCdcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiAndGVzdDJAdGVzdC5jb20nLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiAnZ2VuZXJhbCcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICd0ZXN0J1xuICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgdmFyIHVzZXJzID0ge307XG4gICAgICAgICAgICB1c2Vyc1Jlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gKHUpIHtcbiAgICAgICAgICAgICAgICB1c2Vyc1t1LmVtYWlsXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiB1LnJvbGVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5vbkFueSgpLnJlcGx5KDIwMCwgeyB1c2VyczogdXNlcnNSZXNwb25zZSB9KTtcbiAgICAgICAgICAgIG1vY2tTdG9yZVxuICAgICAgICAgICAgICAgIC5kaXNwYXRjaChjaGF0VXNlcnNBY3Rpb25zXzEuZmV0Y2hBbGxVc2VycygpKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IG1vY2tTdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgdmFyIHVwZGF0ZVVzZXJzQWN0aW9uID0gY2hhdFVzZXJzQWN0aW9uc18xLnVwZGF0ZVVzZXJzKHVzZXJzKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbdXBkYXRlVXNlcnNBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCBhZGRFcnJvciBvbiBmYWlsZWQgYXR0ZW1wdCB0byBmZXRjaCB1c2VycycsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICBtb2NrQXhpb3MucmVzZXQoKTtcbiAgICAgICAgICAgIG1vY2tBeGlvcy5vbkFueSgpLnJlcGx5KDUwMCk7XG4gICAgICAgICAgICBtb2NrU3RvcmVcbiAgICAgICAgICAgICAgICAuZGlzcGF0Y2goY2hhdFVzZXJzQWN0aW9uc18xLmZldGNoQWxsVXNlcnMoKSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBtb2NrU3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgICAgICAgICAgIHZhciBhZGRFcnJvckFjdGlvbiA9IG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ0ZldGNoaW5nIGFsbCB1c2VycyBmYWlsZWQnKTtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3Rpb25zLCBbYWRkRXJyb3JBY3Rpb25dKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVtcImNhdGNoXCJdKGRvbmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBjcmVhdGUgYSBuZXcgdXNlcicpO1xuICAgICAgICBpdCgnc2hvdWxkIGVkaXQgdGhlIHVzZXInKTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkZWxldGUgdGhlIHVzZXInKTtcbiAgICB9KTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pZEdWemRFRnplVzVqUVdOMGFXOXVjeTVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUwzUmxjM1J6TDNkbFlpOTBaWE4wUVhONWJtTkJZM1JwYjI1ekxuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCUVVFc2FVSkJRV1U3UVVGRFppd3JRa0ZCTUVJN1FVRkRNVUlzTmtKQlFUaENPMEZCUXpsQ0xIbEVRVUUyUXp0QlFVTTNReXh4UkVGQmMwWTdRVUZEZEVZc01rTkJRU3RDTzBGQlF5OUNMR2xGUVVFMFJqdEJRVVUxUml4dFJrRkJiMGM3UVVGRmNFY3NjVVZCUVhOSE8wRkJRM1JITEhsRlFVRnZVanRCUVVOd1Vpd3lSVUZCYjBZN1FVRkpjRVlzU1VGQlRTeG5Ra0ZCWjBJc1IwRkJjVUlzTmtKQlFXTXNRMEZCUXl4RFFVRkRMSGRDUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETzBGQlJXNUZMRk5CUVZNc1VVRkJVU3hEUVVGRExFdEJRVlU3U1VGQlZpeHpRa0ZCUVN4RlFVRkJMRlZCUVZVN1NVRkRlRUlzVDBGQlR5eG5Ra0ZCWjBJc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dEJRVU51UXl4RFFVRkRPMEZCUlVRc1VVRkJVU3hEUVVGRExHVkJRV1VzUlVGQlJUdEpRVU4wUWl4SlFVRkpMRk5CUVhGRExFTkJRVU03U1VGRE1VTXNTVUZCU1N4VFFVRnpRaXhEUVVGRE8wbEJSVE5DTEUxQlFVMHNRMEZCUXp0UlFVTklMRk5CUVZNc1IwRkJSeXhKUVVGSkxDdENRVUZYTEVOQlFVTXNhMEpCUVVzc1EwRkJReXhEUVVGRE8wbEJRM1pETEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUlVnc1MwRkJTeXhEUVVGRE8xRkJRMFlzVTBGQlV5eERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRPMGxCUTNoQ0xFTkJRVU1zUTBGQlF5eERRVUZETzBsQlJVZ3NVVUZCVVN4RFFVRkRMRzlDUVVGdlFpeEZRVUZGTzFGQlF6TkNMRlZCUVZVc1EwRkJRenRaUVVOUUxGTkJRVk1zUjBGQlJ5eFJRVUZSTEVWQlFVVXNRMEZCUXp0WlFVTjJRaXhUUVVGVExFTkJRVU1zUzBGQlN5eEZRVUZGTEVOQlFVTTdXVUZEYkVJc1UwRkJVeXhEUVVGRExFdEJRVXNzUlVGQlJTeERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRVZCUVVVc1JVRkJSU3hEUVVGRExFTkJRVUU3VVVGRGNFTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hGUVVGRkxFTkJRVU1zYzBOQlFYTkRPMWxCUTNSRExIZEVRVUYzUkN4RlFVRkZMRlZCUVZNc1NVRkJTVHRaUVVOc1JTeEpRVUZKTEVsQlFVa3NSMEZCYjBJc1MwRkJTeXhEUVVGRE8xbEJRMnhETEZOQlFWTTdhVUpCUTBvc1VVRkJVU3hEUVVGRExIZENRVUZWTEVOQlFVTXNVVUZCVVN4RlFVRkZMR05CUVUwc1QwRkJRU3hKUVVGSkxFZEJRVWNzVVVGQlVTeEZRVUZtTEVOQlFXVXNRMEZCUXl4RFFVRkRPMmxDUVVOeVJDeEpRVUZKTEVOQlFVTTdaMEpCUTBZc1lVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eEpRVUZKTEVWQlFVVXNVVUZCVVN4RFFVRkRMRU5CUVVNN1owSkJRMjVETEVsQlFVMHNUMEZCVHl4SFFVRm5RaXhUUVVGVExFTkJRVU1zVlVGQlZTeEZRVUZGTEVOQlFVTTdaMEpCUTNCRUxHRkJRVTBzUTBGQlF5eGxRVUZsTEVOQlFVTXNUMEZCVHl4RlFVRkZMRU5CUVVNN2QwSkJRemRDTEVsQlFVa3NSVUZCUlN3clFrRkJVVHQzUWtGRFpDeEpRVUZKTEVWQlFVVXNZMEZCWXp0eFFrRkRka0lzUTBGQlF5eERRVUZETEVOQlFVTTdaMEpCUTBvc1NVRkJTU3hGUVVGRkxFTkJRVU03V1VGRFdDeERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRkxMRU5CUVVFc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU16UWl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5eDNSVUZCZDBVc1JVRkJSU3hWUVVGVExFbEJRVWs3V1VGRGRFWXNTVUZCU1N4SlFVRkpMRWRCUVc5Q0xFdEJRVXNzUTBGQlF6dFpRVU5zUXl4VFFVRlRMRU5CUVVNc1MwRkJTeXhGUVVGRkxFTkJRVU03V1VGRGJFSXNVMEZCVXl4RFFVRkRMRTFCUVUwc1EwRkJReXd3UWtGQk1FSXNRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFVkJRVVVzUlVGQlF5eExRVUZMTEVWQlFVVXNjMEpCUVhOQ0xFVkJRVU1zUTBGQlF5eERRVUZETzFsQlEzcEdMRk5CUVZNN2FVSkJRMG9zVVVGQlVTeERRVUZETEhkQ1FVRlZMRU5CUVVNc1VVRkJVU3hGUVVGRkxHTkJRVTBzVDBGQlFTeEpRVUZKTEVkQlFVY3NVVUZCVVN4RlFVRm1MRU5CUVdVc1EwRkJReXhEUVVGRE8ybENRVU55UkN4SlFVRkpMRU5CUVVNN1owSkJRMFlzWVVGQlRTeERRVUZETEZkQlFWY3NRMEZCUXl4SlFVRkpMRVZCUVVVc1MwRkJTeXhEUVVGRExFTkJRVU03WjBKQlEyaERMRWxCUVUwc1QwRkJUeXhIUVVGblFpeFRRVUZUTEVOQlFVTXNWVUZCVlN4RlFVRkZMRU5CUVVNN1owSkJRM0JFTEdGQlFVMHNRMEZCUXl4bFFVRmxMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU03ZDBKQlF6ZENMRWxCUVVrc1JVRkJSU3huUTBGQlV6dDNRa0ZEWml4SlFVRkpMRVZCUVVVc2MwSkJRWE5DTzNGQ1FVTXZRaXhEUVVGRExFTkJRVU1zUTBGQlF6dG5Ra0ZEU2l4SlFVRkpMRVZCUVVVc1EwRkJRenRaUVVOWUxFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVc3NRMEZCUVN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRM1pDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1JVRkJSU3hEUVVGRExITkRRVUZ6UXp0WlFVTjBReXg1UkVGQmVVUXNSVUZCUlN4VlFVRlRMRWxCUVVrN1dVRkRka1VzU1VGQlNTeExRVUZMTEVkQlFXMUNMRXRCUVVzc1EwRkJRenRaUVVOc1F5eFRRVUZUTzJsQ1FVTktMRkZCUVZFc1EwRkJReXg1UWtGQlZ5eERRVUZETEdWQlFXVXNSVUZCUlN4alFVRk5MRTlCUVVFc1MwRkJTeXhIUVVGSExHVkJRV1VzUlVGQmRrSXNRMEZCZFVJc1EwRkJReXhEUVVGRE8ybENRVU55UlN4SlFVRkpMRU5CUVVNN1owSkJRMFlzWVVGQlRTeERRVUZETEZkQlFWY3NRMEZCUXl4TFFVRkxMRVZCUVVVc1pVRkJaU3hEUVVGRExFTkJRVU03WjBKQlF6TkRMRWxCUVUwc1QwRkJUeXhIUVVGblFpeFRRVUZUTEVOQlFVTXNWVUZCVlN4RlFVRkZMRU5CUVVNN1owSkJRM0JFTEdGQlFVMHNRMEZCUXl4bFFVRmxMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU03ZDBKQlF6ZENMRWxCUVVrc1JVRkJSU3dyUWtGQlVUdDNRa0ZEWkN4SlFVRkpMRVZCUVVVc1pVRkJaVHR4UWtGRGVFSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1owSkJRMG9zU1VGQlNTeEZRVUZGTEVOQlFVTTdXVUZEV0N4RFFVRkRMRU5CUVVNc1EwRkRSQ3hQUVVGTExFTkJRVUVzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTnlRaXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl4NVJVRkJlVVVzUlVGQlJTeFZRVUZUTEVsQlFVazdXVUZEZGtZc1NVRkJTU3hMUVVGTExFZEJRVzFDTEV0QlFVc3NRMEZCUXp0WlFVTnNReXhUUVVGVExFTkJRVU1zUzBGQlN5eEZRVUZGTEVOQlFVTTdXVUZEYkVJc1UwRkJVeXhEUVVGRExFMUJRVTBzUTBGQlF5d3lRa0ZCTWtJc1EwRkJReXhEUVVGRExFdEJRVXNzUTBGQlF5eEhRVUZITEVWQlFVVXNSVUZCUlN4TFFVRkxMRVZCUVVVc2MwSkJRWE5DTEVWQlFVVXNRMEZCUXl4RFFVRkRPMWxCUXpWR0xGTkJRVk03YVVKQlEwb3NVVUZCVVN4RFFVRkRMSGxDUVVGWExFTkJRVU1zWlVGQlpTeEZRVUZGTEdOQlFVMHNUMEZCUVN4TFFVRkxMRWRCUVVjc1pVRkJaU3hGUVVGMlFpeERRVUYxUWl4RFFVRkRMRU5CUVVNN2FVSkJRM0pGTEVsQlFVa3NRMEZCUXp0blFrRkRSaXhoUVVGTkxFTkJRVU1zVDBGQlR5eERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRPMmRDUVVOMFFpeEpRVUZOTEU5QlFVOHNSMEZCWjBJc1UwRkJVeXhEUVVGRExGVkJRVlVzUlVGQlJTeERRVUZETzJkQ1FVTndSQ3hoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRPM2RDUVVNM1FpeEpRVUZKTEVWQlFVVXNaME5CUVZNN2QwSkJRMllzU1VGQlNTeEZRVUZGTEhOQ1FVRnpRanR4UWtGREwwSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1owSkJRMG9zU1VGQlNTeEZRVUZGTEVOQlFVTTdXVUZEV0N4RFFVRkRMRU5CUVVNc1EwRkRSQ3hQUVVGTExFTkJRVUVzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTnlRaXhEUVVGRExFTkJRVU1zUTBGQlFUdFJRVU5HTEVWQlFVVXNRMEZCUXl3MFJVRkJORVVzUlVGQlJTeFZRVUZUTEVsQlFVazdXVUZETVVZc1NVRkJTU3hQUVVGUExFZEJRVmtzUzBGQlN5eERRVUZETzFsQlF6ZENMRk5CUVZNc1EwRkJReXhSUVVGUkxFTkJRVU1zTkVKQlFXTXNRMEZCUXl4SFFVRkhMRVZCUVVVc1IwRkJSeXhGUVVGRkxHTkJRVTBzVDBGQlFTeFBRVUZQTEVkQlFVY3NTVUZCU1N4RlFVRmtMRU5CUVdNc1EwRkJReXhEUVVGRE8ybENRVU0zUkN4SlFVRkpMRU5CUVVNN1owSkJRMFlzWVVGQlRTeERRVUZETEUxQlFVMHNRMEZCUXl4UFFVRlBMRU5CUVVNc1EwRkJRenRuUWtGRGRrSXNTVUZCVFN4UFFVRlBMRWRCUVdkQ0xGTkJRVk1zUTBGQlF5eFZRVUZWTEVWQlFVVXNRMEZCUXp0blFrRkRjRVFzWVVGQlRTeERRVUZETEdWQlFXVXNRMEZCUXl4UFFVRlBMRVZCUVVVc1EwRkJRenQzUWtGRE4wSXNTVUZCU1N4RlFVRkZMQ3RDUVVGUk8zZENRVU5rTEVsQlFVa3NSVUZCUlN4clFrRkJhMEk3Y1VKQlF6TkNMRU5CUVVNc1EwRkJReXhEUVVGRE8yZENRVU5LTEVsQlFVa3NSVUZCUlN4RFFVRkRPMWxCUTFnc1EwRkJReXhEUVVGRExFTkJRMFFzVDBGQlN5eERRVUZCTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRja0lzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4RlFVRkZMRU5CUVVNc05FVkJRVFJGTEVWQlFVVXNWVUZCVXl4SlFVRkpPMWxCUXpGR0xFbEJRVWtzVDBGQlR5eEhRVUZaTEV0QlFVc3NRMEZCUXp0WlFVTTNRaXhUUVVGVExFTkJRVU1zUzBGQlN5eEZRVUZGTEVOQlFVTTdXVUZEYkVJc1UwRkJVeXhEUVVGRExFMUJRVTBzUTBGQlF5dzRRa0ZCT0VJc1EwRkJReXhEUVVGRExFdEJRVXNzUTBGQlF5eEhRVUZITEVWQlFVVXNSVUZCUlN4TFFVRkxMRVZCUVVVc2MwSkJRWE5DTEVWQlFVVXNRMEZCUXl4RFFVRkRPMWxCUXk5R0xGTkJRVk1zUTBGQlF5eFJRVUZSTEVOQlFVTXNORUpCUVdNc1EwRkJReXhIUVVGSExFVkJRVVVzUjBGQlJ5eEZRVUZGTEdOQlFVMHNUMEZCUVN4UFFVRlBMRWRCUVVjc1NVRkJTU3hGUVVGa0xFTkJRV01zUTBGQlF5eERRVUZETzJsQ1FVTTNSQ3hKUVVGSkxFTkJRVU03WjBKQlEwWXNZVUZCVFN4RFFVRkRMRTlCUVU4c1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF6dG5Ra0ZEZUVJc1NVRkJUU3hQUVVGUExFZEJRV2RDTEZOQlFWTXNRMEZCUXl4VlFVRlZMRVZCUVVVc1EwRkJRenRuUWtGRGNFUXNZVUZCVFN4RFFVRkRMR1ZCUVdVc1EwRkJReXhQUVVGUExFVkJRVVVzUTBGQlF6dDNRa0ZETjBJc1NVRkJTU3hGUVVGRkxHZERRVUZUTzNkQ1FVTm1MRWxCUVVrc1JVRkJSU3h6UWtGQmMwSTdjVUpCUXk5Q0xFTkJRVU1zUTBGQlF5eERRVUZETzJkQ1FVTktMRWxCUVVrc1JVRkJSU3hEUVVGRE8xbEJRMWdzUTBGQlF5eERRVUZETEVOQlEwUXNUMEZCU3l4RFFVRkJMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRGNrSXNRMEZCUXl4RFFVRkRMRU5CUVVFN1NVRkRUaXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5JTEZGQlFWRXNRMEZCUXl4M1FrRkJkMElzUlVGQlJUdFJRVU12UWl4VlFVRlZMRU5CUVVNN1dVRkhVQ3hUUVVGVExFZEJRVWNzWjBKQlFXZENMRU5CUVVNN1owSkJRM3BDTEZGQlFWRXNSVUZCUlR0dlFrRkRUaXhGUVVGRkxFbEJRVWtzUlVGQlJTeFRRVUZUTEVWQlFVVXNiVUpCUVcxQ0xFVkJRVVVzUzBGQlN5eEZRVUZGTEdWQlFXVXNSVUZCUlN4SlFVRkpMRVZCUVVVc2MwSkJRWE5DTEVWQlFVVXNRMEZCUXl4RlFVRkZPMjlDUVVOcVJ5eEZRVUZGTEVsQlFVa3NSVUZCUlN4MVFrRkJkVUlzUlVGQlJTeHRRa0ZCYlVJc1JVRkJSU3hKUVVGSkxFVkJRVVVzWlVGQlpTeEZRVUZGTEVsQlFVa3NSVUZCUlR0dlFrRkRia1lzUlVGQlJTeEpRVUZKTEVWQlFVVXNhMEpCUVd0Q0xFVkJRVVVzYlVKQlFXMUNMRVZCUVVVc1MwRkJTeXhGUVVGRkxHVkJRV1VzUlVGQlJTeExRVUZMTEVWQlFVVTdhVUpCUTI1R08yRkJRMG9zUTBGQlF5eERRVUZETzFsQlEwZ3NVMEZCVXl4RFFVRkRMRXRCUVVzc1JVRkJSU3hEUVVGRE8xbEJRMnhDTEZOQlFWTXNRMEZCUXl4TFFVRkxMRVZCUVVVc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkRPMUZCUTNKRExFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NSVUZCUlN4RFFVRkRMQ3RGUVVFclJTeEZRVUZGTEZWQlFWTXNTVUZCU1R0WlFVTTNSaXhKUVVGSkxGRkJRVkVzUjBGQmEwTTdaMEpCUXpGRExFVkJRVU1zUjBGQlJ5eEZRVUZGTEVkQlFVY3NSVUZCUlN4SlFVRkpMRVZCUVVVc1UwRkJVeXhGUVVGRE8yZENRVU16UWl4RlFVRkRMRWRCUVVjc1JVRkJSU3hIUVVGSExFVkJRVVVzU1VGQlNTeEZRVUZGTEZGQlFWRXNSVUZCUXp0blFrRkRNVUlzUlVGQlF5eEhRVUZITEVWQlFVVXNSMEZCUnl4RlFVRkZMRWxCUVVrc1JVRkJSU3huUWtGQlowSXNSVUZCUXp0aFFVRkRMRU5CUVVNN1dVRkRlRU1zVTBGQlV5eERRVUZETEV0QlFVc3NSVUZCUlN4RFFVRkRPMWxCUTJ4Q0xGTkJRVk03YVVKQlEwb3NTMEZCU3l4RFFVRkRMR3RDUVVGclFpeERRVUZETzJsQ1FVTjZRaXhMUVVGTExFTkJRVU1zUjBGQlJ5eEZRVUZGTEVWQlFVTXNVVUZCVVN4RlFVRkZMRkZCUVZFc1JVRkJReXhEUVVGRExFTkJRVU03V1VGRGRFTXNVMEZCVXp0cFFrRkRTaXhSUVVGUkxFTkJRVU1zSzBKQlFXRXNSVUZCUlN4RFFVRkRPMmxDUVVONlFpeEpRVUZKTEVOQlFVTTdaMEpCUTBZc1NVRkJUU3hQUVVGUExFZEJRV2RDTEZOQlFWTXNRMEZCUXl4VlFVRlZMRVZCUVVVc1EwRkJRenRuUWtGRGNFUXNTVUZCVFN4cFFrRkJhVUlzUjBGQlJ5dzJRa0ZCVnl4RFFVRkRMRU5CUVVNc1UwRkJVeXhGUVVGRkxGRkJRVkVzUlVGQlJTeG5Ra0ZCWjBJc1EwRkJReXhEUVVGRExFTkJRVU03WjBKQlF5OUZMR0ZCUVUwc1EwRkJReXhsUVVGbExFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTXNhVUpCUVdsQ0xFTkJRVU1zUTBGQlF5eERRVUZETzJkQ1FVTnlSQ3hKUVVGSkxFVkJRVVVzUTBGQlF6dFpRVU5ZTEVOQlFVTXNRMEZCUXl4RFFVRkRMRTlCUVVzc1EwRkJRU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZCTzFGQlEzUkNMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzUlVGQlJTeERRVUZETEdkRlFVRm5SU3hGUVVGRkxGVkJRVk1zU1VGQlNUdFpRVU01UlN4VFFVRlRMRU5CUVVNc1MwRkJTeXhGUVVGRkxFTkJRVU03V1VGRGJFSXNVMEZCVXp0cFFrRkRTaXhMUVVGTExFTkJRVU1zYTBKQlFXdENMRU5CUVVNN2FVSkJRM3BDTEV0QlFVc3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRaUVVOb1FpeFRRVUZUTzJsQ1FVTktMRkZCUVZFc1EwRkJReXdyUWtGQllTeEZRVUZGTEVOQlFVTTdhVUpCUTNwQ0xFbEJRVWtzUTBGQlF6dG5Ra0ZEUml4SlFVRk5MRTlCUVU4c1IwRkJaMElzVTBGQlV5eERRVUZETEZWQlFWVXNSVUZCUlN4RFFVRkRPMmRDUVVOd1JDeEpRVUZOTEZkQlFWY3NSMEZCUnl3clFrRkJVU3hEUVVGRExIbEVRVUY1UkN4RFFVRkRMRU5CUVVNN1owSkJRM2hHTEdGQlFVMHNRMEZCUXl4bFFVRmxMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU1zVjBGQlZ5eERRVUZETEVOQlFVTXNRMEZCUXp0blFrRkRMME1zU1VGQlNTeEZRVUZGTEVOQlFVTTdXVUZEV0N4RFFVRkRMRU5CUVVNc1EwRkJReXhQUVVGTExFTkJRVUVzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUVR0UlFVTjBRaXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl3eVJVRkJNa1VzUlVGQlJTeFZRVUZUTEVsQlFVazdXVUZEZWtZc1UwRkJVenRwUWtGRFNpeFJRVUZSTEVOQlFVTXNlVU5CUVhWQ0xFTkJRVU1zWTBGQll5eERRVUZETEVOQlFVTTdhVUpCUXpkRExFbEJRVWtzUTBGQlF5eFZRVUZETEVkQlFWYzdaMEpCUTJRc1lVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eEhRVUZITEVWQlFVVXNjVWRCUVhGSExFTkJRVU1zUTBGQlF6dG5Ra0ZETDBnc1NVRkJUU3hQUVVGUExFZEJRV2RDTEZOQlFWTXNRMEZCUXl4VlFVRlZMRVZCUVVVc1EwRkJRenRuUWtGRGNFUXNTVUZCVFN4WFFVRlhMRWRCUVVjc0swSkJRVkVzUTBGQlF5eHhSRUZCY1VRc1EwRkJReXhEUVVGRE8yZENRVU53Uml4aFFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExFOUJRVThzUlVGQlJTeERRVUZETEZkQlFWY3NRMEZCUXl4RFFVRkRMRU5CUVVNN1owSkJReTlETEVsQlFVa3NSVUZCUlN4RFFVRkRPMWxCUTFnc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlN5eERRVUZCTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRNMElzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4RlFVRkZMRU5CUVVNc2FVVkJRV2xGTEVWQlFVVXNWVUZCVXl4SlFVRkpPMWxCUXk5RkxGTkJRVk03YVVKQlEwb3NVVUZCVVN4RFFVRkRMSGxEUVVGMVFpeERRVUZETEhWQ1FVRjFRaXhEUVVGRExFTkJRVU03YVVKQlF6RkVMRWxCUVVrc1EwRkJReXhWUVVGRExFZEJRVmM3WjBKQlEyUXNZVUZCVFN4RFFVRkRMRmRCUVZjc1EwRkJReXhIUVVGSExFVkJRVVVzY1VkQlFYRkhMRU5CUVVNc1EwRkJRenRuUWtGREwwZ3NTVUZCVFN4UFFVRlBMRWRCUVdkQ0xGTkJRVk1zUTBGQlF5eFZRVUZWTEVWQlFVVXNRMEZCUXp0blFrRkRjRVFzU1VGQlRTeFhRVUZYTEVkQlFVY3NLMEpCUVZFc1EwRkJReXh4UkVGQmNVUXNRMEZCUXl4RFFVRkRPMmRDUVVOd1JpeGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRExGZEJRVmNzUTBGQlF5eERRVUZETEVOQlFVTTdaMEpCUXk5RExFbEJRVWtzUlVGQlJTeERRVUZETzFsQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNc1QwRkJTeXhEUVVGQkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdVVUZEZGtJc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEZRVUZGTEVOQlFVTXNhMFZCUVd0RkxFVkJRVVVzVlVGQlV5eEpRVUZKTzFsQlEyaEdMRk5CUVZNN2FVSkJRMG9zVVVGQlVTeERRVUZETEhsRFFVRjFRaXhEUVVGRExHdENRVUZyUWl4RFFVRkRMRU5CUVVNN2FVSkJRM0pFTEVsQlFVa3NRMEZCUXl4VlFVRkRMRWRCUVZjN1owSkJRMlFzWVVGQlRTeERRVUZETEZkQlFWY3NRMEZCUXl4SFFVRkhMRVZCUVVVc2NVZEJRWEZITEVOQlFVTXNRMEZCUXp0blFrRkRMMGdzU1VGQlRTeFBRVUZQTEVkQlFXZENMRk5CUVZNc1EwRkJReXhWUVVGVkxFVkJRVVVzUTBGQlF6dG5Ra0ZEY0VRc1NVRkJUU3hYUVVGWExFZEJRVWNzSzBKQlFWRXNRMEZCUXl4eFJFRkJjVVFzUTBGQlF5eERRVUZETzJkQ1FVTndSaXhoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRMRmRCUVZjc1EwRkJReXhEUVVGRExFTkJRVU03WjBKQlF5OURMRWxCUVVrc1JVRkJSU3hEUVVGRE8xbEJRMWdzUTBGQlF5eERRVUZETEVOQlFVTXNUMEZCU3l4RFFVRkJMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRGRrSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hGUVVGRkxFTkJRVU1zY1VWQlFYRkZMRVZCUVVVc1ZVRkJVeXhKUVVGSk8xbEJRMjVHTEZOQlFWTXNRMEZCUXl4TFFVRkxMRVZCUVVVc1EwRkJRenRaUVVOc1FpeFRRVUZUTzJsQ1FVTktMRXRCUVVzc1JVRkJSVHRwUWtGRFVDeExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1dVRkRhRUlzU1VGQlNTeFBRVUZQTEVkQlFWY3NVMEZCVXl4RFFVRkRPMWxCUTJoRExGTkJRVk03YVVKQlEwb3NVVUZCVVN4RFFVRkRMSGxEUVVGMVFpeERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRPMmxDUVVNeFF5eEpRVUZKTEVOQlFVTTdaMEpCUTBZc1NVRkJUU3hQUVVGUExFZEJRV2RDTEZOQlFWTXNRMEZCUXl4VlFVRlZMRVZCUVVVc1EwRkJRenRuUWtGRGNFUXNTVUZCVFN4eFFrRkJjVUlzUjBGQlJ5d3JRMEZCTmtJc1EwRkJReXhQUVVGUExFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTTdaMEpCUXpORkxFbEJRVTBzVjBGQlZ5eEhRVUZITEN0Q1FVRlJMRU5CUVVNc2NVUkJRWEZFTEVOQlFVTXNRMEZCUXp0blFrRkRjRVlzU1VGQlRTeHpRa0ZCYzBJc1IwRkJSeXdyUTBGQk5rSXNRMEZCUXl4UFFVRlBMRVZCUVVVc1MwRkJTeXhEUVVGRExFTkJRVU03WjBKQlF6ZEZMR0ZCUVUwc1EwRkJReXhsUVVGbExFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTXNjVUpCUVhGQ0xFVkJRVVVzVjBGQlZ5eEZRVUZGTEhOQ1FVRnpRaXhEUVVGRExFTkJRVU1zUTBGQlF6dG5Ra0ZET1VZc1NVRkJTU3hGUVVGRkxFTkJRVU03V1VGRFdDeERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRkxMRU5CUVVFc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU4yUWl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5eG5SVUZCWjBVc1JVRkJSU3hWUVVGVExFbEJRVWs3V1VGRE9VVXNVMEZCVXl4RFFVRkRMRXRCUVVzc1JVRkJSU3hEUVVGRE8xbEJRMnhDTEZOQlFWTTdhVUpCUTBvc1MwRkJTeXhGUVVGRk8ybENRVU5RTEV0QlFVc3NRMEZCUXl4SFFVRkhMRVZCUVVVc1JVRkJSU3hSUVVGUkxFVkJRVVVzUlVGQlJTeEZRVUZETEVOQlFVTXNRMEZCUXp0WlFVTnFReXhKUVVGSkxFOUJRVThzUjBGQlZ5eFRRVUZUTEVOQlFVTTdXVUZEYUVNc1UwRkJVenRwUWtGRFNpeFJRVUZSTEVOQlFVTXNlVU5CUVhWQ0xFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTTdhVUpCUXpGRExFbEJRVWtzUTBGQlF6dG5Ra0ZEUml4SlFVRk5MRTlCUVU4c1IwRkJaMElzVTBGQlV5eERRVUZETEZWQlFWVXNSVUZCUlN4RFFVRkRPMmRDUVVOd1JDeEpRVUZOTEhGQ1FVRnhRaXhIUVVGSExDdERRVUUyUWl4RFFVRkRMRTlCUVU4c1JVRkJSU3hKUVVGSkxFTkJRVU1zUTBGQlF6dG5Ra0ZETTBVc1NVRkJUU3huUWtGQlowSXNSMEZCUnl3eVEwRkJlVUlzUTBGQlF5eFBRVUZQTEVWQlFVVXNTMEZCU3l4RFFVRkRMRU5CUVVNN1owSkJRMjVGTEVsQlFVMHNjMEpCUVhOQ0xFZEJRVWNzSzBOQlFUWkNMRU5CUVVNc1QwRkJUeXhGUVVGRkxFdEJRVXNzUTBGQlF5eERRVUZETzJkQ1FVTTNSU3hoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRMSEZDUVVGeFFpeEZRVUZGTEdkQ1FVRm5RaXhGUVVGRkxITkNRVUZ6UWl4RFFVRkRMRU5CUVVNc1EwRkJRenRuUWtGRGJrY3NTVUZCU1N4RlFVRkZMRU5CUVVNN1dVRkRXQ3hEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZMTEVOQlFVRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVOMlFpeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXhuU2tGQlowb3NSVUZCUlN4VlFVRlRMRWxCUVVrN1dVRkRPVW9zU1VGQlNTeFBRVUZQTEVkQlFWY3NVMEZCVXl4RFFVRkRPMWxCUTJoRExFbEJRVWtzVVVGQlVTeEhRVUZqTEVOQlFVTTdiMEpCUTNaQ0xFbEJRVWtzUlVGQlJTeExRVUZMTzI5Q1FVTllMRTlCUVU4c1JVRkJSU3hKUVVGSkxFTkJRVU1zUjBGQlJ5eEZRVUZGTEVOQlFVTXNVVUZCVVN4RlFVRkZPMjlDUVVNNVFpeFRRVUZUTEVWQlFVVXNaVUZCWlR0dlFrRkRNVUlzUjBGQlJ5eEZRVUZGTEVkQlFVYzdhVUpCUTFnc1JVRkJSVHR2UWtGRFF5eEpRVUZKTEVWQlFVVXNTMEZCU3p0dlFrRkRXQ3hQUVVGUExFVkJRVVVzU1VGQlNTeERRVUZETEVkQlFVY3NSVUZCUlN4RFFVRkRMRkZCUVZFc1JVRkJSVHR2UWtGRE9VSXNVMEZCVXl4RlFVRkZMR1ZCUVdVN2IwSkJRekZDTEVkQlFVY3NSVUZCUlN4SFFVRkhPMmxDUVVOWUxFTkJRVU1zUTBGQlF6dFpRVU5JTEZOQlFWTXNRMEZCUXl4TFFVRkxMRVZCUVVVc1EwRkJRenRaUVVOc1FpeFRRVUZUTzJsQ1FVTktMRXRCUVVzc1JVRkJSVHRwUWtGRFVDeExRVUZMTEVOQlFVTXNSMEZCUnl4RlFVRkZMRVZCUVVVc1VVRkJVU3hGUVVGRkxGRkJRVkVzUlVGQlF5eERRVUZETEVOQlFVTTdXVUZEZGtNc1UwRkJVenRwUWtGRFNpeFJRVUZSTEVOQlFVTXNlVU5CUVhWQ0xFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTTdhVUpCUXpGRExFbEJRVWtzUTBGQlF6dG5Ra0ZEUml4SlFVRk5MRTlCUVU4c1IwRkJaMElzVTBGQlV5eERRVUZETEZWQlFWVXNSVUZCUlN4RFFVRkRPMmRDUVVOd1JDeEpRVUZOTEhGQ1FVRnhRaXhIUVVGSExDdERRVUUyUWl4RFFVRkRMRTlCUVU4c1JVRkJSU3hKUVVGSkxFTkJRVU1zUTBGQlF6dG5Ra0ZETTBVc1NVRkJUU3h4UWtGQmNVSXNSMEZCUnl4M1JFRkJjME1zUTBGQlF5eFBRVUZQTEVWQlFVVXNVVUZCVVN4RFFVRkRMRTFCUVUwc1EwRkJReXhEUVVGRE8yZENRVU12Uml4SlFVRk5MR2xDUVVGcFFpeEhRVUZITERaRFFVRXlRaXhEUVVGRExFOUJRVThzUlVGQlJTeFJRVUZSTEVOQlFVTXNRMEZCUXp0blFrRkRla1VzU1VGQlRTeHpRa0ZCYzBJc1IwRkJSeXdyUTBGQk5rSXNRMEZCUXl4UFFVRlBMRVZCUVVVc1MwRkJTeXhEUVVGRExFTkJRVU03WjBKQlF6ZEZMR0ZCUVUwc1EwRkJReXhsUVVGbExFTkJRVU1zVDBGQlR5eEZRVUZGTzI5Q1FVTTFRaXh4UWtGQmNVSTdiMEpCUTNKQ0xIRkNRVUZ4UWp0dlFrRkRja0lzYVVKQlFXbENPMjlDUVVOcVFpeHpRa0ZCYzBJN2FVSkJRVU1zUTBGQlF5eERRVUZETzJkQ1FVTTNRaXhKUVVGSkxFVkJRVVVzUTBGQlF6dFpRVU5ZTEVOQlFVTXNRMEZCUXl4RFFVRkRMRTlCUVVzc1EwRkJRU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFGQlEzWkNMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzUlVGQlJTeERRVUZETEhWRVFVRjFSQ3hGUVVGRkxGVkJRVk1zU1VGQlNUdFpRVU55UlN4SlFVRkpMRkZCUVZFc1IwRkJiME03WjBKQlF6VkRMRVZCUVVVc1IwRkJSeXhGUVVGRkxFZEJRVWNzUlVGQlJTeEpRVUZKTEVWQlFVVXNVMEZCVXl4RlFVRkZPMmRDUVVNM1FpeEZRVUZGTEVkQlFVY3NSVUZCUlN4SFFVRkhMRVZCUVVVc1NVRkJTU3hGUVVGRkxGRkJRVkVzUlVGQlJUdG5Ra0ZETlVJc1JVRkJSU3hIUVVGSExFVkJRVVVzUjBGQlJ5eEZRVUZGTEVsQlFVa3NSVUZCUlN4blFrRkJaMElzUlVGQlJUdGhRVUZETEVOQlFVTTdXVUZETVVNc1UwRkJVeXhEUVVGRExFdEJRVXNzUlVGQlJTeERRVUZETzFsQlEyeENMRk5CUVZNN2FVSkJRMG9zUzBGQlN5eERRVUZETEd0Q1FVRnJRaXhEUVVGRE8ybENRVU42UWl4TFFVRkxMRU5CUVVNc1IwRkJSeXhGUVVGRkxFVkJRVVVzVVVGQlVTeEZRVUZGTEZGQlFWRXNSVUZCUlN4RFFVRkRMRU5CUVVNN1dVRkRlRU1zVTBGQlV6dHBRa0ZEU2l4TFFVRkxMRVZCUVVVN2FVSkJRMUFzUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMWxCUTJoQ0xGTkJRVk03YVVKQlEwb3NVVUZCVVN4RFFVRkRMQ3RDUVVGaExFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTTdhVUpCUTJ4RExFbEJRVWtzUTBGQlF6dG5Ra0ZEUml4SlFVRk5MRTlCUVU4c1IwRkJaMElzVTBGQlV5eERRVUZETEZWQlFWVXNSVUZCUlN4RFFVRkRPMmRDUVVOd1JDeEpRVUZOTEdGQlFXRXNSMEZCUnl3NFFrRkJUeXhEUVVGRExHbENRVUZwUWl4RFFVRkRMRU5CUVVNN1owSkJRMnBFTEVsQlFVMHNhVUpCUVdsQ0xFZEJRVWNzTmtKQlFWY3NRMEZCUXl4RFFVRkRMRk5CUVZNc1JVRkJSU3hSUVVGUkxFVkJRVVVzWjBKQlFXZENMRU5CUVVNc1EwRkJReXhEUVVGRE8yZENRVU12UlN4aFFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExFOUJRVThzUlVGQlJTeERRVUZETEdGQlFXRXNSVUZCUlN4cFFrRkJhVUlzUTBGQlF5eERRVUZETEVOQlFVTTdaMEpCUTNCRkxFbEJRVWtzUlVGQlJTeERRVUZETzFsQlExZ3NRMEZCUXl4RFFVRkRMRU5CUVVNc1QwRkJTeXhEUVVGQkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdVVUZEZGtJc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEZRVUZGTEVOQlFVTXNPRVJCUVRoRUxFVkJRVVVzVlVGQlV5eEpRVUZKTzFsQlF6VkZMRk5CUVZNc1EwRkJReXhMUVVGTExFVkJRVVVzUTBGQlF6dFpRVU5zUWl4VFFVRlRPMmxDUVVOS0xFdEJRVXNzUlVGQlJUdHBRa0ZEVUN4TFFVRkxMRU5CUVVNc1IwRkJSeXhGUVVGRkxFVkJRVU1zUzBGQlN5eEZRVUZGTEhOQ1FVRnpRaXhGUVVGRExFTkJRVU1zUTBGQlF6dFpRVU5xUkN4VFFVRlRPMmxDUVVOS0xGRkJRVkVzUTBGQlF5d3JRa0ZCWVN4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRE8ybENRVU5zUXl4SlFVRkpMRU5CUVVNN1owSkJRMFlzU1VGQlRTeFBRVUZQTEVkQlFXZENMRk5CUVZNc1EwRkJReXhWUVVGVkxFVkJRVVVzUTBGQlF6dG5Ra0ZEY0VRc1NVRkJUU3hqUVVGakxFZEJRVWNzSzBKQlFWRXNRMEZCUXl4elFrRkJjMElzUTBGQlF5eERRVUZETzJkQ1FVTjRSQ3hoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRMR05CUVdNc1EwRkJReXhEUVVGRExFTkJRVU03WjBKQlEyeEVMRWxCUVVrc1JVRkJSU3hEUVVGRE8xbEJRMWdzUTBGQlF5eERRVUZETEVOQlFVTXNUMEZCU3l4RFFVRkJMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRGRrSXNRMEZCUXl4RFFVRkRMRU5CUVVFN1VVRkRSaXhGUVVGRkxFTkJRVU1zT0VOQlFUaERMRVZCUVVVc1ZVRkJVeXhKUVVGSk8xbEJRelZFTEVsQlFVa3NVVUZCVVN4SFFVRnZRenRuUWtGRE5VTXNSVUZCUlN4SFFVRkhMRVZCUVVVc1IwRkJSeXhGUVVGRkxFbEJRVWtzUlVGQlJTeFRRVUZUTEVWQlFVVTdaMEpCUXpkQ0xFVkJRVVVzUjBGQlJ5eEZRVUZGTEVkQlFVY3NSVUZCUlN4SlFVRkpMRVZCUVVVc1VVRkJVU3hGUVVGRk8yZENRVU0xUWl4RlFVRkZMRWRCUVVjc1JVRkJSU3hIUVVGSExFVkJRVVVzU1VGQlNTeEZRVUZGTEdkQ1FVRm5RaXhGUVVGRk8yRkJRVU1zUTBGQlF6dFpRVU14UXl4VFFVRlRMRU5CUVVNc1MwRkJTeXhGUVVGRkxFTkJRVU03V1VGRGJFSXNVMEZCVXp0cFFrRkRTaXhMUVVGTExFTkJRVU1zYTBKQlFXdENMRU5CUVVNN2FVSkJRM3BDTEV0QlFVc3NRMEZCUXl4SFFVRkhMRVZCUVVVc1JVRkJSU3hSUVVGUkxFVkJRVVVzVVVGQlVTeEZRVUZGTEVOQlFVTXNRMEZCUXp0WlFVTjRReXhUUVVGVE8ybENRVU5LTEUxQlFVMHNSVUZCUlR0cFFrRkRVaXhMUVVGTExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTTdXVUZEYUVJc1UwRkJVenRwUWtGRFNpeFJRVUZSTEVOQlFVTXNORUpCUVZVc1EwRkJReXhoUVVGaExFTkJRVU1zUTBGQlF6dHBRa0ZEYmtNc1NVRkJTU3hEUVVGRE8yZENRVU5HTEVsQlFVMHNUMEZCVHl4SFFVRm5RaXhUUVVGVExFTkJRVU1zVlVGQlZTeEZRVUZGTEVOQlFVTTdaMEpCUTNCRUxFbEJRVTBzWVVGQllTeEhRVUZITERoQ1FVRlBMRU5CUVVNc2FVSkJRV2xDTEVOQlFVTXNRMEZCUXp0blFrRkRha1FzU1VGQlRTeHBRa0ZCYVVJc1IwRkJSeXcyUWtGQlZ5eERRVUZETEVOQlFVTXNVMEZCVXl4RlFVRkZMRkZCUVZFc1JVRkJSU3huUWtGQlowSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1owSkJReTlGTEdGQlFVMHNRMEZCUXl4bFFVRmxMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU1zWVVGQllTeEZRVUZGTEdsQ1FVRnBRaXhEUVVGRExFTkJRVU1zUTBGQlF6dG5Ra0ZEY0VVc1NVRkJTU3hGUVVGRkxFTkJRVU03V1VGRFdDeERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRkxMRU5CUVVFc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU4yUWl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5eHZSVUZCYjBVc1JVRkJSU3hWUVVGVExFbEJRVWs3V1VGRGJFWXNVMEZCVXl4RFFVRkRMRXRCUVVzc1JVRkJSU3hEUVVGRE8xbEJRMnhDTEZOQlFWTTdhVUpCUTBvc1MwRkJTeXhGUVVGRk8ybENRVU5RTEV0QlFVc3NRMEZCUXl4SFFVRkhMRVZCUVVVc1JVRkJReXhMUVVGTExFVkJRVVVzYzBKQlFYTkNMRVZCUVVNc1EwRkJReXhEUVVGRE8xbEJRMnBFTEZOQlFWTTdhVUpCUTBvc1VVRkJVU3hEUVVGRExEUkNRVUZWTEVOQlFVTXNZVUZCWVN4RFFVRkRMRU5CUVVNN2FVSkJRMjVETEVsQlFVa3NRMEZCUXp0blFrRkRSaXhKUVVGTkxFOUJRVThzUjBGQlowSXNVMEZCVXl4RFFVRkRMRlZCUVZVc1JVRkJSU3hEUVVGRE8yZENRVU53UkN4SlFVRk5MR05CUVdNc1IwRkJSeXdyUWtGQlVTeERRVUZETEhOQ1FVRnpRaXhEUVVGRExFTkJRVU03WjBKQlEzaEVMR0ZCUVUwc1EwRkJReXhsUVVGbExFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTXNZMEZCWXl4RFFVRkRMRU5CUVVNc1EwRkJRenRuUWtGRGJFUXNTVUZCU1N4RlFVRkZMRU5CUVVNN1dVRkRXQ3hEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZMTEVOQlFVRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVOMlFpeERRVUZETEVOQlFVTXNRMEZCUVR0SlFVTk9MRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMGdzVVVGQlVTeERRVUZETEhOQ1FVRnpRaXhGUVVGRk8xRkJRemRDTEZWQlFWVXNRMEZCUXp0WlFVTlFMRk5CUVZNc1IwRkJSeXhSUVVGUkxFVkJRVVVzUTBGQlF6dFJRVU16UWl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5eDNRMEZCZDBNc1JVRkJSVHRaUVVONlF5eFRRVUZUTEVOQlFVTXNVVUZCVVN4RFFVRkRMRzlDUVVGMVFpeEZRVUZGTEVOQlFVTXNRMEZCUXp0WlFVTTVReXhKUVVGTkxFOUJRVThzUjBGQlowSXNVMEZCVXl4RFFVRkRMRlZCUVZVc1JVRkJSU3hEUVVGRE8xbEJRM0JFTEdGQlFVMHNRMEZCUXl4WFFVRlhMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVsQlFVa3NSVUZCUlN3NFFrRkJZeXhEUVVGRExFTkJRVU03V1VGRmNFUXNUMEZCVHl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eEZRVUZGTEVOQlFVTXNTMEZCU3l4RlFVRkZMRU5CUVVNN1VVRkRMMElzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOSUxGRkJRVkVzUTBGQlF5d3dRa0ZCTUVJc1JVRkJSVHRSUVVOcVF5eFZRVUZWTEVOQlFVTTdXVUZEVUN4VFFVRlRMRWRCUVVjc1VVRkJVU3hGUVVGRkxFTkJRVU03VVVGRE0wSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hGUVVGRkxFTkJRVU1zSzBOQlFTdERMRVZCUVVVc1ZVRkJVeXhKUVVGSk8xbEJRemRFTEVsQlFVa3NZVUZCWVN4SFFVRkhMRU5CUVVNN2IwSkJRMnBDTEV0QlFVc3NSVUZCUlN4bFFVRmxPMjlDUVVOMFFpeEpRVUZKTEVWQlFVVXNUMEZCVHp0dlFrRkRZaXhKUVVGSkxFVkJRVVVzVFVGQlRUdHBRa0ZEWml4RlFVRkZPMjlDUVVORExFdEJRVXNzUlVGQlJTeG5Ra0ZCWjBJN2IwSkJRM1pDTEVsQlFVa3NSVUZCUlN4VFFVRlRPMjlDUVVObUxFbEJRVWtzUlVGQlJTeE5RVUZOTzJsQ1FVTm1MRU5CUVVNc1EwRkJRenRaUVVOSUxFbEJRVWtzUzBGQlN5eEhRVUZ0UWl4RlFVRkZMRU5CUVVNN1dVRkRMMElzWVVGQllTeERRVUZETEU5QlFVOHNRMEZCUXl4VlFVRkRMRU5CUVVNN1owSkJRM0JDTEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWM3YjBKQlEySXNTVUZCU1N4RlFVRkZMRU5CUVVNc1EwRkJReXhKUVVGSk8yOUNRVU5hTEVsQlFVa3NSVUZCUlN4RFFVRkRMRU5CUVVNc1NVRkJTVHRwUWtGRFppeERRVUZETzFsQlEwNHNRMEZCUXl4RFFVRkRMRU5CUVVFN1dVRkRSaXhUUVVGVExFTkJRVU1zUzBGQlN5eEZRVUZGTEVOQlFVTTdXVUZEYkVJc1UwRkJVeXhEUVVGRExFdEJRVXNzUlVGQlJTeERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRVZCUVVVc1JVRkJSU3hMUVVGTExFVkJRVVVzWVVGQllTeEZRVUZETEVOQlFVTXNRMEZCUXp0WlFVTjBSQ3hUUVVGVE8ybENRVU5LTEZGQlFWRXNRMEZCUXl4blEwRkJZU3hGUVVGRkxFTkJRVU03YVVKQlEzcENMRWxCUVVrc1EwRkJRenRuUWtGRFJpeEpRVUZOTEU5QlFVOHNSMEZCWjBJc1UwRkJVeXhEUVVGRExGVkJRVlVzUlVGQlJTeERRVUZETzJkQ1FVTndSQ3hKUVVGTkxHbENRVUZwUWl4SFFVRkhMRGhDUVVGWExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTTdaMEpCUXpkRExHRkJRVTBzUTBGQlF5eGxRVUZsTEVOQlFVTXNUMEZCVHl4RlFVRkZMRU5CUVVNc2FVSkJRV2xDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMmRDUVVOeVJDeEpRVUZKTEVWQlFVVXNRMEZCUXp0WlFVTllMRU5CUVVNc1EwRkJReXhEUVVGRExFOUJRVXNzUTBGQlFTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUTNaQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NSVUZCUlN4RFFVRkRMREpFUVVFeVJDeEZRVUZGTEZWQlFWTXNTVUZCU1R0WlFVTjZSU3hUUVVGVExFTkJRVU1zUzBGQlN5eEZRVUZGTEVOQlFVTTdXVUZEYkVJc1UwRkJVeXhEUVVGRExFdEJRVXNzUlVGQlJTeERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRaUVVNM1FpeFRRVUZUTzJsQ1FVTktMRkZCUVZFc1EwRkJReXhuUTBGQllTeEZRVUZGTEVOQlFVTTdhVUpCUTNwQ0xFbEJRVWtzUTBGQlF6dG5Ra0ZEUml4SlFVRk5MRTlCUVU4c1IwRkJaMElzVTBGQlV5eERRVUZETEZWQlFWVXNSVUZCUlN4RFFVRkRPMmRDUVVOd1JDeEpRVUZOTEdOQlFXTXNSMEZCUnl3clFrRkJVU3hEUVVGRExESkNRVUV5UWl4RFFVRkRMRU5CUVVNN1owSkJRemRFTEdGQlFVMHNRMEZCUXl4bFFVRmxMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU1zWTBGQll5eERRVUZETEVOQlFVTXNRMEZCUXp0blFrRkRiRVFzU1VGQlNTeEZRVUZGTEVOQlFVTTdXVUZEV0N4RFFVRkRMRU5CUVVNc1EwRkJReXhQUVVGTExFTkJRVUVzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTjJRaXhEUVVGRExFTkJRVU1zUTBGQlFUdFJRVU5HTEVWQlFVVXNRMEZCUXl3d1FrRkJNRUlzUTBGQlF5eERRVUZETzFGQlF5OUNMRVZCUVVVc1EwRkJReXh6UWtGQmMwSXNRMEZCUXl4RFFVRkRPMUZCUXpOQ0xFVkJRVVVzUTBGQlF5eDNRa0ZCZDBJc1EwRkJReXhEUVVGRE8wbEJRMnBETEVOQlFVTXNRMEZCUXl4RFFVRkRPMEZCUTFBc1EwRkJReXhEUVVGRExFTkJRVUVpZlE9PSIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBjaGFpXzEgPSByZXF1aXJlKFwiY2hhaVwiKTtcbnJlcXVpcmUoXCJtb2NoYVwiKTtcbnZhciBzb2NrZXRpb2NsaWVudCA9IHJlcXVpcmUoXCJzb2NrZXQuaW8tY2xpZW50XCIpO1xudmFyIHN0b3JlXzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL3dlYi9zdG9yZVwiKTtcbnZhciByZWR1eF8xID0gcmVxdWlyZShcInJlZHV4XCIpO1xudmFyIHVzZXJBY3Rpb25zXzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL3dlYi9hY3Rpb25zL3VzZXJBY3Rpb25zXCIpO1xudmFyIGNoYW5uZWxzQWN0aW9uc18xID0gcmVxdWlyZShcIi4uLy4uL3NyYy93ZWIvYWN0aW9ucy9jaGFubmVsc0FjdGlvbnNcIik7XG52YXIgbm90aWZpY2F0aW9uc0FjdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvd2ViL2FjdGlvbnMvbm90aWZpY2F0aW9uc0FjdGlvbnNcIik7XG52YXIgc2lkZWJhckFjdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvd2ViL2FjdGlvbnMvc2lkZWJhckFjdGlvbnNcIik7XG52YXIgc29ja2V0QWN0aW9uc18xID0gcmVxdWlyZShcIi4uLy4uL3NyYy93ZWIvYWN0aW9ucy9zb2NrZXRBY3Rpb25zXCIpO1xudmFyIGNoYXRVc2Vyc0FjdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvd2ViL2FjdGlvbnMvY2hhdFVzZXJzQWN0aW9uc1wiKTtcbmZ1bmN0aW9uIGdldFN0b3JlKCkge1xuICAgIHJldHVybiByZWR1eF8xLmNyZWF0ZVN0b3JlKHN0b3JlXzEucm9vdFJlZHVjZXIsIHN0b3JlXzEubWlkZGxld2FyZSk7XG59XG5kZXNjcmliZSgnU3RvcmUgYW5kIFN5bmNocm9ub3VzIEFjdGlvbnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgZGVzY3JpYmUoJ1VzZXIgU3RhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdG9yZTtcbiAgICAgICAgdmFyIHVzZXI7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUgPSBnZXRTdG9yZSgpO1xuICAgICAgICAgICAgdXNlciA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN0b3JlLmdldFN0YXRlKCkudXNlcjsgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgbm90IGJlIGF1dGhvcml6ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2UodXNlcigpLmF1dGhvcml6ZWQpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKHVzZXIoKS5lbWFpbCk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2UodXNlcigpLm5hbWUpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKHVzZXIoKS5yb2xlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgYmUgYXV0aG9yaXplZCBhZnRlciBzZXRBdXRob3JpemVkIGFjdGlvbicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNGYWxzZSh1c2VyKCkuYXV0aG9yaXplZCk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh1c2VyQWN0aW9uc18xLnNldEF1dGhvcml6ZWQodHJ1ZSkpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc1RydWUodXNlcigpLmF1dGhvcml6ZWQpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2godXNlckFjdGlvbnNfMS5zZXRBdXRob3JpemVkKGZhbHNlKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2UodXNlcigpLmF1dGhvcml6ZWQpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBoYXZlIHVzZXIgZGF0YSBhZnRlciBzZXR0aW5nIHRoZSB1c2VyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKHVzZXIoKS5hdXRob3JpemVkKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNGYWxzZSh1c2VyKCkuZW1haWwpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKHVzZXIoKS5uYW1lKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNGYWxzZSh1c2VyKCkucm9sZSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh1c2VyQWN0aW9uc18xLnNldFVzZXIoe1xuICAgICAgICAgICAgICAgIGF1dGhvcml6ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnSmFuZSBEb2UnLFxuICAgICAgICAgICAgICAgIHJvbGU6ICdhZG1pbidcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNUcnVlKHVzZXIoKS5hdXRob3JpemVkKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwodXNlcigpLmVtYWlsLCAndGVzdEB0ZXN0LmNvbScpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbCh1c2VyKCkubmFtZSwgJ0phbmUgRG9lJyk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LnN0cmljdEVxdWFsKHVzZXIoKS5yb2xlLCAnYWRtaW4nKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHVzZXJBY3Rpb25zXzEuc2V0VXNlcih7XG4gICAgICAgICAgICAgICAgYXV0aG9yaXplZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgZW1haWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG5hbWU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJvbGU6IGZhbHNlXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2UodXNlcigpLmF1dGhvcml6ZWQpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKHVzZXIoKS5lbWFpbCk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2UodXNlcigpLm5hbWUpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKHVzZXIoKS5yb2xlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgbm90IGhhdmUgdXNlciBkYXRhIGFmdGVyIGxvZ2dpbmcgb3V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2godXNlckFjdGlvbnNfMS5zZXRVc2VyKHtcbiAgICAgICAgICAgICAgICBhdXRob3JpemVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgbmFtZTogJ0phbmUgRG9lJyxcbiAgICAgICAgICAgICAgICByb2xlOiAnYWRtaW4nXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh1c2VyQWN0aW9uc18xLmxvZ291dFVzZXIoKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh1c2VyQWN0aW9uc18xLnNldFVzZXIoe1xuICAgICAgICAgICAgICAgIGF1dGhvcml6ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVtYWlsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBuYW1lOiBmYWxzZSxcbiAgICAgICAgICAgICAgICByb2xlOiBmYWxzZVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnQ2hhbm5lbHMgU3RhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdG9yZTtcbiAgICAgICAgdmFyIGNoYW5uZWxzO1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlID0gZ2V0U3RvcmUoKTtcbiAgICAgICAgICAgIGNoYW5uZWxzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gc3RvcmUuZ2V0U3RhdGUoKS5jaGFubmVsczsgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgYWRkIGNoYW5uZWxzIGZyb20gYW4gYXJyYXkgb2YgY2hhbm5lbCBuYW1lcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmFkZENoYW5uZWxzKFsnZ2VuZXJhbCcsICdyYW5kb20nLCAnc29tZXRoaW5nIGVsc2UnXSkpO1xuICAgICAgICAgICAgdmFyIGMwID0gY2hhbm5lbHMoKVswXTtcbiAgICAgICAgICAgIHZhciBjMSA9IGNoYW5uZWxzKClbMV07XG4gICAgICAgICAgICB2YXIgYzIgPSBjaGFubmVscygpWzJdO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYzAsIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnZ2VuZXJhbCcsXG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6IFtdLFxuICAgICAgICAgICAgICAgIHJldHJpZXZlTWVzc2FnZXNPZmZzZXQ6IDAsXG4gICAgICAgICAgICAgICAgaGFzTW9yZU1lc3NhZ2VzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGZldGNoaW5nTmV3TWVzc2FnZXM6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChjMSwge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdyYW5kb20nLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBbXSxcbiAgICAgICAgICAgICAgICByZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0OiAwLFxuICAgICAgICAgICAgICAgIGhhc01vcmVNZXNzYWdlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBmZXRjaGluZ05ld01lc3NhZ2VzOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYzIsIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnc29tZXRoaW5nIGVsc2UnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBbXSxcbiAgICAgICAgICAgICAgICByZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0OiAwLFxuICAgICAgICAgICAgICAgIGhhc01vcmVNZXNzYWdlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBmZXRjaGluZ05ld01lc3NhZ2VzOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCB1cGRhdGUgZmV0Y2hpbmdOZXdNZXNzYWdlcyBhZnRlciBjYWxsaW5nIHNldENoYW5uZWxGZXRjaGluZ05ld01lc3NhZ2VzIGFjdGlvbicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmFkZENoYW5uZWxzKFsnZ2VuZXJhbCcsICdyYW5kb20nLCAnc29tZXRoaW5nIGVsc2UnXSkpO1xuICAgICAgICAgICAgY2hhbm5lbHMoKS5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKGMuZmV0Y2hpbmdOZXdNZXNzYWdlcyk7XG4gICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMoYy5uYW1lLCB0cnVlKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNoYW5uZWxzKCkuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNUcnVlKGMuZmV0Y2hpbmdOZXdNZXNzYWdlcyk7XG4gICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuc2V0Q2hhbm5lbEZldGNoaW5nTmV3TWVzc2FnZXMoYy5uYW1lLCBmYWxzZSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjaGFubmVscygpLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzRmFsc2UoYy5mZXRjaGluZ05ld01lc3NhZ2VzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBpbmNyZW1lbnQgdGhlIGNoYW5uZWwgb2Zmc2V0IGZvciByZXRyaWV2aW5nIG5ldyBtZXNzYWdlcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmFkZENoYW5uZWxzKFsnZ2VuZXJhbCcsICdyYW5kb20nLCAnc29tZXRoaW5nIGVsc2UnXSkpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChjaGFubmVscygpLmZpbmQoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUubmFtZSA9PT0gJ2dlbmVyYWwnOyB9KS5yZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0LCAwKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwoY2hhbm5lbHMoKS5maW5kKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLm5hbWUgPT09ICdyYW5kb20nOyB9KS5yZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0LCAwKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwoY2hhbm5lbHMoKS5maW5kKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLm5hbWUgPT09ICdzb21ldGhpbmcgZWxzZSc7IH0pLnJldHJpZXZlTWVzc2FnZXNPZmZzZXQsIDApO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuaW5jcmVtZW50Q2hhbm5lbFJldHJpZXZlTWVzc2FnZXNPZmZzZXQoJ2dlbmVyYWwnLCAyMCkpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5zdHJpY3RFcXVhbChjaGFubmVscygpLmZpbmQoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUubmFtZSA9PT0gJ2dlbmVyYWwnOyB9KS5yZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0LCAyMCk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5pbmNyZW1lbnRDaGFubmVsUmV0cmlldmVNZXNzYWdlc09mZnNldCgnZ2VuZXJhbCcsIDEpKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwoY2hhbm5lbHMoKS5maW5kKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLm5hbWUgPT09ICdnZW5lcmFsJzsgfSkucmV0cmlldmVNZXNzYWdlc09mZnNldCwgMjEpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuaW5jcmVtZW50Q2hhbm5lbFJldHJpZXZlTWVzc2FnZXNPZmZzZXQoJ3JhbmRvbScsIDEpKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwoY2hhbm5lbHMoKS5maW5kKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLm5hbWUgPT09ICdyYW5kb20nOyB9KS5yZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0LCAxKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmluY3JlbWVudENoYW5uZWxSZXRyaWV2ZU1lc3NhZ2VzT2Zmc2V0KCdzb21ldGhpbmcgZWxzZScsIDEpKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuc3RyaWN0RXF1YWwoY2hhbm5lbHMoKS5maW5kKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLm5hbWUgPT09ICdzb21ldGhpbmcgZWxzZSc7IH0pLnJldHJpZXZlTWVzc2FnZXNPZmZzZXQsIDEpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCB1cGRhdGUgdGhlIGhhc01vcmVNZXNzYWdlcyBwcm9wZXJ0eSBvbiBhIGNoYW5uZWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5hZGRDaGFubmVscyhbJ2dlbmVyYWwnLCAncmFuZG9tJywgJ3NvbWV0aGluZyBlbHNlJ10pKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNUcnVlKGNoYW5uZWxzKCkuZmluZChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5uYW1lID09PSAnZ2VuZXJhbCc7IH0pLmhhc01vcmVNZXNzYWdlcyk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzVHJ1ZShjaGFubmVscygpLmZpbmQoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUubmFtZSA9PT0gJ3JhbmRvbSc7IH0pLmhhc01vcmVNZXNzYWdlcyk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmlzVHJ1ZShjaGFubmVscygpLmZpbmQoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUubmFtZSA9PT0gJ3NvbWV0aGluZyBlbHNlJzsgfSkuaGFzTW9yZU1lc3NhZ2VzKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLnNldENoYW5uZWxIYXNNb3JlTWVzc2FnZXMoJ2dlbmVyYWwnLCBmYWxzZSkpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuc2V0Q2hhbm5lbEhhc01vcmVNZXNzYWdlcygncmFuZG9tJywgZmFsc2UpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLnNldENoYW5uZWxIYXNNb3JlTWVzc2FnZXMoJ3NvbWV0aGluZyBlbHNlJywgZmFsc2UpKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNGYWxzZShjaGFubmVscygpLmZpbmQoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUubmFtZSA9PT0gJ2dlbmVyYWwnOyB9KS5oYXNNb3JlTWVzc2FnZXMpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc0ZhbHNlKGNoYW5uZWxzKCkuZmluZChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5uYW1lID09PSAncmFuZG9tJzsgfSkuaGFzTW9yZU1lc3NhZ2VzKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNGYWxzZShjaGFubmVscygpLmZpbmQoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUubmFtZSA9PT0gJ3NvbWV0aGluZyBlbHNlJzsgfSkuaGFzTW9yZU1lc3NhZ2VzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgYWRkIGEgcmVjZWl2ZWQgbWVzc2FnZSB0byB0aGUgYXBwcm9wcmlhdGUgY2hhbm5lbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmFkZENoYW5uZWxzKFsnZ2VuZXJhbCcsICdyYW5kb20nLCAnc29tZXRoaW5nIGVsc2UnXSkpO1xuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAgdXNlckVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXG4gICAgICAgICAgICAgICAgY3JlYXRlZDogRGF0ZS5ub3coKS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgIF9pZDogJzEnLFxuICAgICAgICAgICAgICAgIHRleHQ6ICd0aGlzIGlzIHRoZSBtZXNzYWdlJyxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5hZGRSZWNlaXZlZENoYW5uZWxNZXNzYWdlKCdnZW5lcmFsJywgbWVzc2FnZSkpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuYWRkUmVjZWl2ZWRDaGFubmVsTWVzc2FnZSgncmFuZG9tJywgbWVzc2FnZSkpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuYWRkUmVjZWl2ZWRDaGFubmVsTWVzc2FnZSgncmFuZG9tJywgbWVzc2FnZSkpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuYWRkUmVjZWl2ZWRDaGFubmVsTWVzc2FnZSgnc29tZXRoaW5nIGVsc2UnLCBtZXNzYWdlKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5hZGRSZWNlaXZlZENoYW5uZWxNZXNzYWdlKCdzb21ldGhpbmcgZWxzZScsIG1lc3NhZ2UpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmFkZFJlY2VpdmVkQ2hhbm5lbE1lc3NhZ2UoJ3NvbWV0aGluZyBlbHNlJywgbWVzc2FnZSkpO1xuICAgICAgICAgICAgdmFyIGdlbmVyYWxNZXNzYWdlcyA9IGNoYW5uZWxzKCkuZmluZChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5uYW1lID09PSAnZ2VuZXJhbCc7IH0pLm1lc3NhZ2VzO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoZ2VuZXJhbE1lc3NhZ2VzLmxlbmd0aCwgMSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChnZW5lcmFsTWVzc2FnZXMsIFttZXNzYWdlXSk7XG4gICAgICAgICAgICB2YXIgcmFuZG9tTWVzc2FnZXMgPSBjaGFubmVscygpLmZpbmQoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUubmFtZSA9PT0gJ3JhbmRvbSc7IH0pLm1lc3NhZ2VzO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwocmFuZG9tTWVzc2FnZXMubGVuZ3RoLCAyKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKHJhbmRvbU1lc3NhZ2VzLCBbbWVzc2FnZSwgbWVzc2FnZV0pO1xuICAgICAgICAgICAgdmFyIG90aGVyTWVzc2FnZXMgPSBjaGFubmVscygpLmZpbmQoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUubmFtZSA9PT0gJ3NvbWV0aGluZyBlbHNlJzsgfSkubWVzc2FnZXM7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChvdGhlck1lc3NhZ2VzLmxlbmd0aCwgMyk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChvdGhlck1lc3NhZ2VzLCBbbWVzc2FnZSwgbWVzc2FnZSwgbWVzc2FnZV0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBhZGQgcmV0cmVpdmVkIG1lc3NhZ2VzIHRvIHRoZSBhcHByb3ByaWF0ZSBjaGFubmVsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuYWRkQ2hhbm5lbHMoWydnZW5lcmFsJywgJ3JhbmRvbScsICdzb21ldGhpbmcgZWxzZSddKSk7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZXMgPSBbXG4gICAgICAgICAgICAgICAgeyBcInRleHRcIjogXCJTb21ldGhpbmcgaGVyZVwiLCBcImNyZWF0ZWRcIjogXCIyMDE5LTA0LTEzVDE2OjQ1OjI4Ljk0NlpcIiwgXCJ1c2VyRW1haWxcIjogXCJhYmtvdGhtYW5AZ21haWwuY29tXCIsIFwiX2lkXCI6IFwiNWNiMjEyMjgxZDY0NWEyMmFiZWE4ZGJlXCIgfSxcbiAgICAgICAgICAgICAgICB7IFwidGV4dFwiOiBcIjEyMzQxMjM0XCIsIFwiY3JlYXRlZFwiOiBcIjIwMTktMDQtMTRUMjI6MzQ6MDYuNjg2WlwiLCBcInVzZXJFbWFpbFwiOiBcImFia290aG1hbkBnbWFpbC5jb21cIiwgXCJfaWRcIjogXCI1Y2IzYjU1ZWNiZjY4YzZhOTU0ZWFmYjNcIiB9LFxuICAgICAgICAgICAgICAgIHsgXCJ0ZXh0XCI6IFwidGVzdCBvbmUgdHdvIHRocmVlXCIsIFwiY3JlYXRlZFwiOiBcIjIwMTktMDQtMTRUMjI6MzQ6MTAuOTAzWlwiLCBcInVzZXJFbWFpbFwiOiBcImFia290aG1hbkBnbWFpbC5jb21cIiwgXCJfaWRcIjogXCI1Y2IzYjU2MmNiZjY4YzZhOTU0ZWFmYjRcIiB9XG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuYWRkUmV0cmlldmVkQ2hhbm5lbE1lc3NhZ2VzKCdnZW5lcmFsJywgbWVzc2FnZXMpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcygncmFuZG9tJywgbWVzc2FnZXMpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKGNoYW5uZWxzQWN0aW9uc18xLmFkZFJldHJpZXZlZENoYW5uZWxNZXNzYWdlcygncmFuZG9tJywgbWVzc2FnZXMpKTtcbiAgICAgICAgICAgIHZhciBjaGFubmVsU3RhdGUgPSBjaGFubmVscygpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoY2hhbm5lbFN0YXRlXG4gICAgICAgICAgICAgICAgLmZpbmQoZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGMubmFtZSA9PT0gJ2dlbmVyYWwnOyB9KVxuICAgICAgICAgICAgICAgIC5tZXNzYWdlcywgbWVzc2FnZXMpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoY2hhbm5lbFN0YXRlXG4gICAgICAgICAgICAgICAgLmZpbmQoZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGMubmFtZSA9PT0gJ3JhbmRvbSc7IH0pXG4gICAgICAgICAgICAgICAgLm1lc3NhZ2VzLCBtZXNzYWdlcy5jb25jYXQobWVzc2FnZXMpKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGNoYW5uZWxTdGF0ZVxuICAgICAgICAgICAgICAgIC5maW5kKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLm5hbWUgPT09ICdzb21ldGhpbmcgZWxzZSc7IH0pXG4gICAgICAgICAgICAgICAgLm1lc3NhZ2VzLCBbXSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGNsZWFyIGFsbCBjaGFubmVsIGRhdGEnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5hZGRDaGFubmVscyhbJ2dlbmVyYWwnLCAncmFuZG9tJywgJ3NvbWV0aGluZyBlbHNlJ10pKTtcbiAgICAgICAgICAgIHZhciBtZXNzYWdlcyA9IFtcbiAgICAgICAgICAgICAgICB7IFwidGV4dFwiOiBcIlNvbWV0aGluZyBoZXJlXCIsIFwiY3JlYXRlZFwiOiBcIjIwMTktMDQtMTNUMTY6NDU6MjguOTQ2WlwiLCBcInVzZXJFbWFpbFwiOiBcImFia290aG1hbkBnbWFpbC5jb21cIiwgXCJfaWRcIjogXCI1Y2IyMTIyODFkNjQ1YTIyYWJlYThkYmVcIiB9LFxuICAgICAgICAgICAgICAgIHsgXCJ0ZXh0XCI6IFwiMTIzNDEyMzRcIiwgXCJjcmVhdGVkXCI6IFwiMjAxOS0wNC0xNFQyMjozNDowNi42ODZaXCIsIFwidXNlckVtYWlsXCI6IFwiYWJrb3RobWFuQGdtYWlsLmNvbVwiLCBcIl9pZFwiOiBcIjVjYjNiNTVlY2JmNjhjNmE5NTRlYWZiM1wiIH0sXG4gICAgICAgICAgICAgICAgeyBcInRleHRcIjogXCJ0ZXN0IG9uZSB0d28gdGhyZWVcIiwgXCJjcmVhdGVkXCI6IFwiMjAxOS0wNC0xNFQyMjozNDoxMC45MDNaXCIsIFwidXNlckVtYWlsXCI6IFwiYWJrb3RobWFuQGdtYWlsLmNvbVwiLCBcIl9pZFwiOiBcIjVjYjNiNTYyY2JmNjhjNmE5NTRlYWZiNFwiIH1cbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChjaGFubmVsc0FjdGlvbnNfMS5hZGRSZXRyaWV2ZWRDaGFubmVsTWVzc2FnZXMoJ2dlbmVyYWwnLCBtZXNzYWdlcykpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuYWRkUmV0cmlldmVkQ2hhbm5lbE1lc3NhZ2VzKCdyYW5kb20nLCBtZXNzYWdlcykpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuYWRkUmV0cmlldmVkQ2hhbm5lbE1lc3NhZ2VzKCdyYW5kb20nLCBtZXNzYWdlcykpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhbm5lbHNBY3Rpb25zXzEuY2xlYXJDaGFubmVsc0RhdGEoKSk7XG4gICAgICAgICAgICB2YXIgY2hhbm5lbFN0YXRlID0gY2hhbm5lbHMoKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKGNoYW5uZWxTdGF0ZSwgW10pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnTm90aWZpY2F0aW9ucyBTdGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHN0b3JlO1xuICAgICAgICB2YXIgbm90aWZpY2F0aW9ucztcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdG9yZSA9IGdldFN0b3JlKCk7XG4gICAgICAgICAgICBub3RpZmljYXRpb25zID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gc3RvcmUuZ2V0U3RhdGUoKS5ub3RpZmljYXRpb25zOyB9O1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBhZGQgZXJyb3JzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmVycm9ycywgW10pO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignVGVzdCBlcnJvcicpKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5vdGlmaWNhdGlvbnMoKS5lcnJvcnMsIFsnVGVzdCBlcnJvciddKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ0Fub3RoZXIgZXJyb3InKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuZXJyb3JzLCBbJ1Rlc3QgZXJyb3InLCAnQW5vdGhlciBlcnJvciddKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmVtb3ZlIGVycm9ycyBnaXZlbiBhbiBpbmRleCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkRXJyb3IoJ1Rlc3QgZXJyb3InKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKCdBbm90aGVyIGVycm9yJykpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmVycm9ycywgWydUZXN0IGVycm9yJywgJ0Fub3RoZXIgZXJyb3InXSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLnJlbW92ZUVycm9yKDEpKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5vdGlmaWNhdGlvbnMoKS5lcnJvcnMsIFsnVGVzdCBlcnJvciddKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEucmVtb3ZlRXJyb3IoMCkpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmVycm9ycywgW10pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBjbGVhciBlcnJvcnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEVycm9yKCdUZXN0IGVycm9yJykpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRFcnJvcignQW5vdGhlciBlcnJvcicpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuY2xlYXJFcnJvcnMoKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuZXJyb3JzLCBbXSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGFkZCBpbmZvJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmluZm9zLCBbXSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEluZm8oJ1Rlc3QgaW5mbycpKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5vdGlmaWNhdGlvbnMoKS5pbmZvcywgWydUZXN0IGluZm8nXSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEluZm8oJ0Fub3RoZXIgaW5mbycpKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5vdGlmaWNhdGlvbnMoKS5pbmZvcywgWydUZXN0IGluZm8nLCAnQW5vdGhlciBpbmZvJ10pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZW1vdmUgaW5mbyBnaXZlbiBhbiBpbmRleCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkSW5mbygnVGVzdCBpbmZvJykpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5hZGRJbmZvKCdBbm90aGVyIGluZm8nKSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLnJlbW92ZUluZm8oMSkpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmluZm9zLCBbJ1Rlc3QgaW5mbyddKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEucmVtb3ZlSW5mbygwKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChub3RpZmljYXRpb25zKCkuaW5mb3MsIFtdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgY2xlYXIgaW5mb3MnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChub3RpZmljYXRpb25zQWN0aW9uc18xLmFkZEluZm8oJ1Rlc3QgaW5mbycpKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKG5vdGlmaWNhdGlvbnNBY3Rpb25zXzEuYWRkSW5mbygnQW5vdGhlciBpbmZvJykpO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2gobm90aWZpY2F0aW9uc0FjdGlvbnNfMS5jbGVhckluZm9zKCkpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5kZWVwU3RyaWN0RXF1YWwobm90aWZpY2F0aW9ucygpLmluZm9zLCBbXSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdTaWRlYmFyIFN0YXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc3RvcmU7XG4gICAgICAgIHZhciBzaWRlYmFyO1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlID0gZ2V0U3RvcmUoKTtcbiAgICAgICAgICAgIHNpZGViYXIgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBzdG9yZS5nZXRTdGF0ZSgpLnNpZGViYXI7IH07XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHRvZ2dsZSBvcGVuIHN0YXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc1RydWUoc2lkZWJhcigpLm9wZW4pO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc2lkZWJhckFjdGlvbnNfMS50b2dnbGVTaWRlYmFyT3BlbigpKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNGYWxzZShzaWRlYmFyKCkub3Blbik7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzaWRlYmFyQWN0aW9uc18xLnRvZ2dsZVNpZGViYXJPcGVuKCkpO1xuICAgICAgICAgICAgY2hhaV8xLmFzc2VydC5pc1RydWUoc2lkZWJhcigpLm9wZW4pO1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc2lkZWJhckFjdGlvbnNfMS50b2dnbGVTaWRlYmFyT3BlbigpKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuaXNGYWxzZShzaWRlYmFyKCkub3Blbik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdTb2NrZXQgU3RhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdG9yZTtcbiAgICAgICAgdmFyIHNvY2tldDtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdG9yZSA9IGdldFN0b3JlKCk7XG4gICAgICAgICAgICBzb2NrZXQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBzdG9yZS5nZXRTdGF0ZSgpLnNvY2tldDsgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgc2V0IHRoZSBzb2NrZXQgZ2l2ZW4gYSBTb2NrZXRJT0NsaWVudCBTb2NrZXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChzb2NrZXQoKSwge1xuICAgICAgICAgICAgICAgIGlvOiBudWxsLFxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29ubmVjdGVkVXNlckVtYWlsczogW11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIHNvY2tldGlvID0gc29ja2V0aW9jbGllbnQoKTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNvY2tldEFjdGlvbnNfMS5pbml0V2Vic29ja2V0KHNvY2tldGlvKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChzb2NrZXQoKSwge1xuICAgICAgICAgICAgICAgIGlvOiBzb2NrZXRpbyxcbiAgICAgICAgICAgICAgICBjb25uZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZFVzZXJFbWFpbHM6IFtdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNvY2tldGlvLmNsb3NlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHVwZGF0ZSB0aGUgY29ubmVjdGVkIHN0YXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goc29ja2V0QWN0aW9uc18xLnNldFNvY2tldENvbm5lY3RlZCh0cnVlKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChzb2NrZXQoKSwge1xuICAgICAgICAgICAgICAgIGlvOiBudWxsLFxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjb25uZWN0ZWRVc2VyRW1haWxzOiBbXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChzb2NrZXRBY3Rpb25zXzEuc2V0U29ja2V0Q29ubmVjdGVkKGZhbHNlKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChzb2NrZXQoKSwge1xuICAgICAgICAgICAgICAgIGlvOiBudWxsLFxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29ubmVjdGVkVXNlckVtYWlsczogW11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCB1cGRhdGUgdGhlIGNvbm5lY3RlZCB1c2VycycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBlbWFpbHMgPSBbJ3Rlc3RAdGVzdC5jb20nLCAndGVzdDJAdGVzdC5jb20nXTtcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHNvY2tldEFjdGlvbnNfMS5zZXRTb2NrZXRDb25uZWN0ZWRVc2VycyhlbWFpbHMpKTtcbiAgICAgICAgICAgIGNoYWlfMS5hc3NlcnQuZGVlcFN0cmljdEVxdWFsKHNvY2tldCgpLCB7XG4gICAgICAgICAgICAgICAgaW86IG51bGwsXG4gICAgICAgICAgICAgICAgY29ubmVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb25uZWN0ZWRVc2VyRW1haWxzOiBlbWFpbHNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnQ2hhdCBVc2VycyBTdGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHN0b3JlO1xuICAgICAgICB2YXIgY2hhdFVzZXJzO1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3JlID0gZ2V0U3RvcmUoKTtcbiAgICAgICAgICAgIGNoYXRVc2VycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN0b3JlLmdldFN0YXRlKCkuY2hhdFVzZXJzOyB9O1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCB1cGRhdGUgdXNlcnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdXNlcnMgPSB7XG4gICAgICAgICAgICAgICAgJ3Rlc3RAdGVzdC5jb20nOiB7XG4gICAgICAgICAgICAgICAgICAgIHJvbGU6ICd1c2VyJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ1Rlc3QgTmFtZSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICd0ZXN0MkB0ZXN0LmNvbSc6IHtcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogJ2FkbWluJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0Fub3RoZXIgdGVzdCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICd0ZXN0M0B0ZXN0LmNvbSc6IHtcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogJ2FkbWluJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0xhc3QgdGVzdCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goY2hhdFVzZXJzQWN0aW9uc18xLnVwZGF0ZVVzZXJzKHVzZXJzKSk7XG4gICAgICAgICAgICBjaGFpXzEuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChjaGF0VXNlcnMoKSwgdXNlcnMpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pZEdWemRGTjBiM0psTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dkxpNHZkR1Z6ZEhNdmQyVmlMM1JsYzNSVGRHOXlaUzUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3p0QlFVRkJMRFpDUVVFNFFqdEJRVU01UWl4cFFrRkJaVHRCUVVObUxHbEVRVUZ0UkR0QlFVVnVSQ3cyUTBGQmJVVTdRVUZGYmtVc0swSkJRVEpETzBGQlF6TkRMR2xGUVVGMVJqdEJRVU4yUml4NVJVRkJhVkE3UVVGRmFsQXNiVVpCUVdsSk8wRkJRMnBKTEhWRlFVRjVSVHRCUVVONlJTeHhSVUZCYVVnN1FVRkRha2dzTWtWQlFUQkdPMEZCUnpGR0xGTkJRVk1zVVVGQlVUdEpRVU5pTEU5QlFVOHNiVUpCUVZjc1EwRkJReXh0UWtGQlZ5eEZRVUZGTEd0Q1FVRlZMRU5CUVVNc1EwRkJRenRCUVVOb1JDeERRVUZETzBGQlJVUXNVVUZCVVN4RFFVRkRMQ3RDUVVFclFpeEZRVUZGTzBsQlEzUkRMRkZCUVZFc1EwRkJReXhaUVVGWkxFVkJRVVU3VVVGRGJrSXNTVUZCU1N4TFFVRnRRaXhEUVVGRE8xRkJRM2hDTEVsQlFVa3NTVUZCTWtJc1EwRkJRenRSUVVOb1F5eFZRVUZWTEVOQlFVTTdXVUZEVUN4TFFVRkxMRWRCUVVjc1VVRkJVU3hGUVVGRkxFTkJRVU03V1VGRGJrSXNTVUZCU1N4SFFVRkhMR05CUVUwc1QwRkJRU3hMUVVGTExFTkJRVU1zVVVGQlVTeEZRVUZGTEVOQlFVTXNTVUZCU1N4RlFVRnlRaXhEUVVGeFFpeERRVUZETzFGQlEzWkRMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzUlVGQlJTeERRVUZETERCQ1FVRXdRaXhGUVVGRk8xbEJRek5DTEdGQlFVMHNRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zVlVGQlZTeERRVUZETEVOQlFVTTdXVUZEYkVNc1lVRkJUU3hEUVVGRExFOUJRVThzUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRenRaUVVNM1FpeGhRVUZOTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFsQlF6VkNMR0ZCUVUwc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRhRU1zUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4RlFVRkZMRU5CUVVNc2FVUkJRV2xFTEVWQlFVVTdXVUZEYkVRc1lVRkJUU3hEUVVGRExFOUJRVThzUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4VlFVRlZMRU5CUVVNc1EwRkJRenRaUVVOc1F5eExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMREpDUVVGaExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTndReXhoUVVGTkxFTkJRVU1zVFVGQlRTeERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRlZCUVZVc1EwRkJReXhEUVVGRE8xbEJRMnBETEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc01rSkJRV0VzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTNKRExHRkJRVTBzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RlFVRkZMRU5CUVVNc1ZVRkJWU3hEUVVGRExFTkJRVU03VVVGRGRFTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hGUVVGRkxFTkJRVU1zT0VOQlFUaERMRVZCUVVVN1dVRkRMME1zWVVGQlRTeERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJReXhWUVVGVkxFTkJRVU1zUTBGQlF6dFpRVU5zUXl4aFFVRk5MRU5CUVVNc1QwRkJUeXhEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRPMWxCUXpkQ0xHRkJRVTBzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RlFVRkZMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03V1VGRE5VSXNZVUZCVFN4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0WlFVTTFRaXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEhGQ1FVRlBMRU5CUVVNN1owSkJRMjVDTEZWQlFWVXNSVUZCUlN4SlFVRkpPMmRDUVVOb1FpeExRVUZMTEVWQlFVVXNaVUZCWlR0blFrRkRkRUlzU1VGQlNTeEZRVUZGTEZWQlFWVTdaMEpCUTJoQ0xFbEJRVWtzUlVGQlJTeFBRVUZQTzJGQlEyaENMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMG9zWVVGQlRTeERRVUZETEUxQlFVMHNRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJReXhWUVVGVkxFTkJRVU1zUTBGQlF6dFpRVU5xUXl4aFFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETEV0QlFVc3NSVUZCUlN4bFFVRmxMRU5CUVVNc1EwRkJRenRaUVVOc1JDeGhRVUZOTEVOQlFVTXNWMEZCVnl4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFbEJRVWtzUlVGQlJTeFZRVUZWTEVOQlFVTXNRMEZCUXp0WlFVTTFReXhoUVVGTkxFTkJRVU1zVjBGQlZ5eERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRWxCUVVrc1JVRkJSU3hQUVVGUExFTkJRVU1zUTBGQlF6dFpRVU42UXl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExIRkNRVUZQTEVOQlFVTTdaMEpCUTI1Q0xGVkJRVlVzUlVGQlJTeExRVUZMTzJkQ1FVTnFRaXhMUVVGTExFVkJRVVVzUzBGQlN6dG5Ra0ZEV2l4SlFVRkpMRVZCUVVVc1MwRkJTenRuUWtGRFdDeEpRVUZKTEVWQlFVVXNTMEZCU3p0aFFVTmtMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMG9zWVVGQlRTeERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJReXhWUVVGVkxFTkJRVU1zUTBGQlF6dFpRVU5zUXl4aFFVRk5MRU5CUVVNc1QwRkJUeXhEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRPMWxCUXpkQ0xHRkJRVTBzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RlFVRkZMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03V1VGRE5VSXNZVUZCVFN4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTm9ReXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl3MlEwRkJOa01zUlVGQlJUdFpRVU01UXl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExIRkNRVUZQTEVOQlFVTTdaMEpCUTI1Q0xGVkJRVlVzUlVGQlJTeEpRVUZKTzJkQ1FVTm9RaXhMUVVGTExFVkJRVVVzWlVGQlpUdG5Ra0ZEZEVJc1NVRkJTU3hGUVVGRkxGVkJRVlU3WjBKQlEyaENMRWxCUVVrc1JVRkJSU3hQUVVGUE8yRkJRMmhDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTBvc1MwRkJTeXhEUVVGRExGRkJRVkVzUTBGQlF5eDNRa0ZCVlN4RlFVRkZMRU5CUVVNc1EwRkJRenRaUVVNM1FpeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMSEZDUVVGUExFTkJRVU03WjBKQlEyNUNMRlZCUVZVc1JVRkJSU3hMUVVGTE8yZENRVU5xUWl4TFFVRkxMRVZCUVVVc1MwRkJTenRuUWtGRFdpeEpRVUZKTEVWQlFVVXNTMEZCU3p0blFrRkRXQ3hKUVVGSkxFVkJRVVVzUzBGQlN6dGhRVU5rTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTFJc1EwRkJReXhEUVVGRExFTkJRVUU3U1VGRFRpeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTklMRkZCUVZFc1EwRkJReXhuUWtGQlowSXNSVUZCUlR0UlFVTjJRaXhKUVVGSkxFdEJRVzFDTEVOQlFVTTdVVUZEZUVJc1NVRkJTU3hSUVVGdFF5eERRVUZETzFGQlEzaERMRlZCUVZVc1EwRkJRenRaUVVOUUxFdEJRVXNzUjBGQlJ5eFJRVUZSTEVWQlFVVXNRMEZCUXp0WlFVTnVRaXhSUVVGUkxFZEJRVWNzWTBGQlRTeFBRVUZCTEV0QlFVc3NRMEZCUXl4UlFVRlJMRVZCUVVVc1EwRkJReXhSUVVGUkxFVkJRWHBDTEVOQlFYbENMRU5CUVVNN1VVRkRMME1zUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4RlFVRkZMRU5CUVVNc2IwUkJRVzlFTEVWQlFVVTdXVUZEY2tRc1MwRkJTeXhEUVVGRExGRkJRVkVzUTBGQlF5dzJRa0ZCVnl4RFFVRkRMRU5CUVVNc1UwRkJVeXhGUVVGRkxGRkJRVkVzUlVGQlJTeG5Ra0ZCWjBJc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU55UlN4SlFVRkpMRVZCUVVVc1IwRkJlVUlzVVVGQlVTeEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkROME1zU1VGQlNTeEZRVUZGTEVkQlFYbENMRkZCUVZFc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzFsQlF6ZERMRWxCUVVrc1JVRkJSU3hIUVVGNVFpeFJRVUZSTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVNM1F5eGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMRVZCUVVVc1JVRkJSVHRuUWtGRGRrSXNTVUZCU1N4RlFVRkZMRk5CUVZNN1owSkJRMllzVVVGQlVTeEZRVUZGTEVWQlFVVTdaMEpCUTFvc2MwSkJRWE5DTEVWQlFVVXNRMEZCUXp0blFrRkRla0lzWlVGQlpTeEZRVUZGTEVsQlFVazdaMEpCUTNKQ0xHMUNRVUZ0UWl4RlFVRkZMRXRCUVVzN1lVRkROMElzUTBGQlF5eERRVUZETzFsQlEwZ3NZVUZCVFN4RFFVRkRMR1ZCUVdVc1EwRkJReXhGUVVGRkxFVkJRVVU3WjBKQlEzWkNMRWxCUVVrc1JVRkJSU3hSUVVGUk8yZENRVU5rTEZGQlFWRXNSVUZCUlN4RlFVRkZPMmRDUVVOYUxITkNRVUZ6UWl4RlFVRkZMRU5CUVVNN1owSkJRM3BDTEdWQlFXVXNSVUZCUlN4SlFVRkpPMmRDUVVOeVFpeHRRa0ZCYlVJc1JVRkJSU3hMUVVGTE8yRkJRemRDTEVOQlFVTXNRMEZCUXp0WlFVTklMR0ZCUVUwc1EwRkJReXhsUVVGbExFTkJRVU1zUlVGQlJTeEZRVUZGTzJkQ1FVTjJRaXhKUVVGSkxFVkJRVVVzWjBKQlFXZENPMmRDUVVOMFFpeFJRVUZSTEVWQlFVVXNSVUZCUlR0blFrRkRXaXh6UWtGQmMwSXNSVUZCUlN4RFFVRkRPMmRDUVVONlFpeGxRVUZsTEVWQlFVVXNTVUZCU1R0blFrRkRja0lzYlVKQlFXMUNMRVZCUVVVc1MwRkJTenRoUVVNM1FpeERRVUZETEVOQlFVTTdVVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5eHpSa0ZCYzBZc1JVRkJSVHRaUVVOMlJpeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMRFpDUVVGWExFTkJRVU1zUTBGQlF5eFRRVUZUTEVWQlFVVXNVVUZCVVN4RlFVRkZMR2RDUVVGblFpeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTNKRkxGRkJRVkVzUlVGQlJTeERRVUZETEU5QlFVOHNRMEZCUXl4VlFVRkRMRU5CUVhWQ08yZENRVU4yUXl4aFFVRk5MRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU1zUTBGQlF5eHRRa0ZCYlVJc1EwRkJReXhEUVVGRE8yZENRVU4wUXl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExDdERRVUUyUWl4RFFVRkRMRU5CUVVNc1EwRkJReXhKUVVGSkxFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTm9SU3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU5JTEZGQlFWRXNSVUZCUlN4RFFVRkRMRTlCUVU4c1EwRkJReXhWUVVGRExFTkJRWFZDTzJkQ1FVTjJReXhoUVVGTkxFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTXNRMEZCUXl4dFFrRkJiVUlzUTBGQlF5eERRVUZETzJkQ1FVTnlReXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEN0RFFVRTJRaXhEUVVGRExFTkJRVU1zUTBGQlF5eEpRVUZKTEVWQlFVVXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOcVJTeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTklMRkZCUVZFc1JVRkJSU3hEUVVGRExFOUJRVThzUTBGQlF5eFZRVUZETEVOQlFYVkNPMmRDUVVOMlF5eGhRVUZOTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNc1EwRkJReXh0UWtGQmJVSXNRMEZCUXl4RFFVRkRPMWxCUXpGRExFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExQXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hGUVVGRkxFTkJRVU1zYVVWQlFXbEZMRVZCUVVVN1dVRkRiRVVzUzBGQlN5eERRVUZETEZGQlFWRXNRMEZCUXl3MlFrRkJWeXhEUVVGRExFTkJRVU1zVTBGQlV5eEZRVUZGTEZGQlFWRXNSVUZCUlN4blFrRkJaMElzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTnlSU3hoUVVGTkxFTkJRVU1zVjBGQlZ5eERRVUZETEZGQlFWRXNSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGQkxFTkJRVU1zU1VGQlNTeFBRVUZCTEVOQlFVTXNRMEZCUXl4SlFVRkpMRXRCUVVzc1UwRkJVeXhGUVVGd1FpeERRVUZ2UWl4RFFVRkRMRU5CUVVNc2MwSkJRWE5DTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRla1lzWVVGQlRTeERRVUZETEZkQlFWY3NRMEZCUXl4UlFVRlJMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlFTeERRVUZETEVsQlFVa3NUMEZCUVN4RFFVRkRMRU5CUVVNc1NVRkJTU3hMUVVGTExGRkJRVkVzUlVGQmJrSXNRMEZCYlVJc1EwRkJReXhEUVVGRExITkNRVUZ6UWl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRM2hHTEdGQlFVMHNRMEZCUXl4WFFVRlhMRU5CUVVNc1VVRkJVU3hGUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFVRXNRMEZCUXl4SlFVRkpMRTlCUVVFc1EwRkJReXhEUVVGRExFbEJRVWtzUzBGQlN5eG5Ra0ZCWjBJc1JVRkJNMElzUTBGQk1rSXNRMEZCUXl4RFFVRkRMSE5DUVVGelFpeEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTJoSExFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNkMFJCUVhORExFTkJRVU1zVTBGQlV5eEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVFN1dVRkRja1VzWVVGQlRTeERRVUZETEZkQlFWY3NRMEZCUXl4UlFVRlJMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlFTeERRVUZETEVsQlFVa3NUMEZCUVN4RFFVRkRMRU5CUVVNc1NVRkJTU3hMUVVGTExGTkJRVk1zUlVGQmNFSXNRMEZCYjBJc1EwRkJReXhEUVVGRExITkNRVUZ6UWl4RlFVRkZMRVZCUVVVc1EwRkJReXhEUVVGRE8xbEJRekZHTEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc2QwUkJRWE5ETEVOQlFVTXNVMEZCVXl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVUU3V1VGRGNFVXNZVUZCVFN4RFFVRkRMRmRCUVZjc1EwRkJReXhSUVVGUkxFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUVN4RFFVRkRMRWxCUVVrc1QwRkJRU3hEUVVGRExFTkJRVU1zU1VGQlNTeExRVUZMTEZOQlFWTXNSVUZCY0VJc1EwRkJiMElzUTBGQlF5eERRVUZETEhOQ1FVRnpRaXhGUVVGRkxFVkJRVVVzUTBGQlF5eERRVUZETzFsQlF6RkdMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zZDBSQlFYTkRMRU5CUVVNc1VVRkJVU3hGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVRTdXVUZEYmtVc1lVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eFJRVUZSTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJRU3hEUVVGRExFbEJRVWtzVDBGQlFTeERRVUZETEVOQlFVTXNTVUZCU1N4TFFVRkxMRkZCUVZFc1JVRkJia0lzUTBGQmJVSXNRMEZCUXl4RFFVRkRMSE5DUVVGelFpeEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTNoR0xFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNkMFJCUVhORExFTkJRVU1zWjBKQlFXZENMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlFUdFpRVU16UlN4aFFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExGRkJRVkVzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRkJMRU5CUVVNc1NVRkJTU3hQUVVGQkxFTkJRVU1zUTBGQlF5eEpRVUZKTEV0QlFVc3NaMEpCUVdkQ0xFVkJRVE5DTEVOQlFUSkNMRU5CUVVNc1EwRkJReXh6UWtGQmMwSXNSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOd1J5eERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRVZCUVVVc1EwRkJReXg1UkVGQmVVUXNSVUZCUlR0WlFVTXhSQ3hMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETERaQ1FVRlhMRU5CUVVNc1EwRkJReXhUUVVGVExFVkJRVVVzVVVGQlVTeEZRVUZGTEdkQ1FVRm5RaXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEzSkZMR0ZCUVUwc1EwRkJReXhOUVVGTkxFTkJRVU1zVVVGQlVTeEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVVFc1EwRkJReXhKUVVGSkxFOUJRVUVzUTBGQlF5eERRVUZETEVsQlFVa3NTMEZCU3l4VFFVRlRMRVZCUVhCQ0xFTkJRVzlDTEVOQlFVTXNRMEZCUXl4bFFVRmxMRU5CUVVNc1EwRkJRenRaUVVNeFJTeGhRVUZOTEVOQlFVTXNUVUZCVFN4RFFVRkRMRkZCUVZFc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZCTEVOQlFVTXNTVUZCU1N4UFFVRkJMRU5CUVVNc1EwRkJReXhKUVVGSkxFdEJRVXNzVVVGQlVTeEZRVUZ1UWl4RFFVRnRRaXhEUVVGRExFTkJRVU1zWlVGQlpTeERRVUZETEVOQlFVTTdXVUZEZWtVc1lVRkJUU3hEUVVGRExFMUJRVTBzUTBGQlF5eFJRVUZSTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJRU3hEUVVGRExFbEJRVWtzVDBGQlFTeERRVUZETEVOQlFVTXNTVUZCU1N4TFFVRkxMR2RDUVVGblFpeEZRVUV6UWl4RFFVRXlRaXhEUVVGRExFTkJRVU1zWlVGQlpTeERRVUZETEVOQlFVTTdXVUZEYWtZc1MwRkJTeXhEUVVGRExGRkJRVkVzUTBGQlF5d3lRMEZCZVVJc1EwRkJReXhUUVVGVExFVkJRVVVzUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTTFSQ3hMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETERKRFFVRjVRaXhEUVVGRExGRkJRVkVzUlVGQlJTeExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUXpORUxFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNNa05CUVhsQ0xFTkJRVU1zWjBKQlFXZENMRVZCUVVVc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU51UlN4aFFVRk5MRU5CUVVNc1QwRkJUeXhEUVVGRExGRkJRVkVzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRkJMRU5CUVVNc1NVRkJTU3hQUVVGQkxFTkJRVU1zUTBGQlF5eEpRVUZKTEV0QlFVc3NVMEZCVXl4RlFVRndRaXhEUVVGdlFpeERRVUZETEVOQlFVTXNaVUZCWlN4RFFVRkRMRU5CUVVNN1dVRkRNMFVzWVVGQlRTeERRVUZETEU5QlFVOHNRMEZCUXl4UlFVRlJMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlFTeERRVUZETEVsQlFVa3NUMEZCUVN4RFFVRkRMRU5CUVVNc1NVRkJTU3hMUVVGTExGRkJRVkVzUlVGQmJrSXNRMEZCYlVJc1EwRkJReXhEUVVGRExHVkJRV1VzUTBGQlF5eERRVUZETzFsQlF6RkZMR0ZCUVUwc1EwRkJReXhQUVVGUExFTkJRVU1zVVVGQlVTeEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVVFc1EwRkJReXhKUVVGSkxFOUJRVUVzUTBGQlF5eERRVUZETEVsQlFVa3NTMEZCU3l4blFrRkJaMElzUlVGQk0wSXNRMEZCTWtJc1EwRkJReXhEUVVGRExHVkJRV1VzUTBGQlF5eERRVUZETzFGQlEzUkdMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzUlVGQlJTeERRVUZETERCRVFVRXdSQ3hGUVVGRk8xbEJRek5FTEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc05rSkJRVmNzUTBGQlF5eERRVUZETEZOQlFWTXNSVUZCUlN4UlFVRlJMRVZCUVVVc1owSkJRV2RDTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRja1VzU1VGQlNTeFBRVUZQTEVkQlFWazdaMEpCUTI1Q0xGTkJRVk1zUlVGQlJTeGxRVUZsTzJkQ1FVTXhRaXhQUVVGUExFVkJRVVVzU1VGQlNTeERRVUZETEVkQlFVY3NSVUZCUlN4RFFVRkRMRkZCUVZFc1JVRkJSVHRuUWtGRE9VSXNSMEZCUnl4RlFVRkZMRWRCUVVjN1owSkJRMUlzU1VGQlNTeEZRVUZGTEhGQ1FVRnhRanRoUVVNNVFpeERRVUZETzFsQlJVWXNTMEZCU3l4RFFVRkRMRkZCUVZFc1EwRkJReXd5UTBGQmVVSXNRMEZCUXl4VFFVRlRMRVZCUVVVc1QwRkJUeXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU01UkN4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExESkRRVUY1UWl4RFFVRkRMRkZCUVZFc1JVRkJSU3hQUVVGUExFTkJRVU1zUTBGQlF5eERRVUZETzFsQlF6ZEVMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zTWtOQlFYbENMRU5CUVVNc1VVRkJVU3hGUVVGRkxFOUJRVThzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZETjBRc1MwRkJTeXhEUVVGRExGRkJRVkVzUTBGQlF5d3lRMEZCZVVJc1EwRkJReXhuUWtGQlowSXNSVUZCUlN4UFFVRlBMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRM0pGTEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc01rTkJRWGxDTEVOQlFVTXNaMEpCUVdkQ0xFVkJRVVVzVDBGQlR5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTnlSU3hMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETERKRFFVRjVRaXhEUVVGRExHZENRVUZuUWl4RlFVRkZMRTlCUVU4c1EwRkJReXhEUVVGRExFTkJRVU03V1VGRmNrVXNTVUZCU1N4bFFVRmxMRWRCUVdNc1VVRkJVU3hGUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFVRXNRMEZCUXl4SlFVRkpMRTlCUVVFc1EwRkJReXhEUVVGRExFbEJRVWtzUzBGQlN5eFRRVUZUTEVWQlFYQkNMRU5CUVc5Q0xFTkJRVU1zUTBGQlF5eFJRVUZSTEVOQlFVTTdXVUZEY2tZc1lVRkJUU3hEUVVGRExHVkJRV1VzUTBGQlF5eGxRVUZsTEVOQlFVTXNUVUZCVFN4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMnhFTEdGQlFVMHNRMEZCUXl4bFFVRmxMRU5CUVVNc1pVRkJaU3hGUVVGRkxFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTnVSQ3hKUVVGSkxHTkJRV01zUjBGQll5eFJRVUZSTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJRU3hEUVVGRExFbEJRVWtzVDBGQlFTeERRVUZETEVOQlFVTXNTVUZCU1N4TFFVRkxMRkZCUVZFc1JVRkJia0lzUTBGQmJVSXNRMEZCUXl4RFFVRkRMRkZCUVZFc1EwRkJRenRaUVVOdVJpeGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMR05CUVdNc1EwRkJReXhOUVVGTkxFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEYWtRc1lVRkJUU3hEUVVGRExHVkJRV1VzUTBGQlF5eGpRVUZqTEVWQlFVVXNRMEZCUXl4UFFVRlBMRVZCUVVVc1QwRkJUeXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU16UkN4SlFVRkpMR0ZCUVdFc1IwRkJZeXhSUVVGUkxFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCUVN4RFFVRkRMRWxCUVVrc1QwRkJRU3hEUVVGRExFTkJRVU1zU1VGQlNTeExRVUZMTEdkQ1FVRm5RaXhGUVVFelFpeERRVUV5UWl4RFFVRkRMRU5CUVVNc1VVRkJVU3hEUVVGRE8xbEJRekZHTEdGQlFVMHNRMEZCUXl4bFFVRmxMRU5CUVVNc1lVRkJZU3hEUVVGRExFMUJRVTBzUlVGQlJTeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTm9SQ3hoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEdGQlFXRXNSVUZCUlN4RFFVRkRMRTlCUVU4c1JVRkJSU3hQUVVGUExFVkJRVVVzVDBGQlR5eERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTjJSU3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl3d1JFRkJNRVFzUlVGQlJUdFpRVU16UkN4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExEWkNRVUZYTEVOQlFVTXNRMEZCUXl4VFFVRlRMRVZCUVVVc1VVRkJVU3hGUVVGRkxHZENRVUZuUWl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRM0pGTEVsQlFVa3NVVUZCVVN4SFFVRmpPMmRDUVVOMFFpeEZRVUZGTEUxQlFVMHNSVUZCUlN4blFrRkJaMElzUlVGQlJTeFRRVUZUTEVWQlFVVXNNRUpCUVRCQ0xFVkJRVVVzVjBGQlZ5eEZRVUZGTEhGQ1FVRnhRaXhGUVVGRkxFdEJRVXNzUlVGQlJTd3dRa0ZCTUVJc1JVRkJSVHRuUWtGRE1Va3NSVUZCUlN4TlFVRk5MRVZCUVVVc1ZVRkJWU3hGUVVGRkxGTkJRVk1zUlVGQlJTd3dRa0ZCTUVJc1JVRkJSU3hYUVVGWExFVkJRVVVzY1VKQlFYRkNMRVZCUVVjc1MwRkJTeXhGUVVGRkxEQkNRVUV3UWl4RlFVRkZPMmRDUVVOeVNTeEZRVUZGTEUxQlFVMHNSVUZCUlN4dlFrRkJiMElzUlVGQlJTeFRRVUZUTEVWQlFVVXNNRUpCUVRCQ0xFVkJRVVVzVjBGQlZ5eEZRVUZGTEhGQ1FVRnhRaXhGUVVGRkxFdEJRVXNzUlVGQlJTd3dRa0ZCTUVJc1JVRkJSVHRoUVVGRExFTkJRVU03V1VGRGNFb3NTMEZCU3l4RFFVRkRMRkZCUVZFc1EwRkJReXcyUTBGQk1rSXNRMEZCUXl4VFFVRlRMRVZCUVVVc1VVRkJVU3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU5xUlN4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExEWkRRVUV5UWl4RFFVRkRMRkZCUVZFc1JVRkJSU3hSUVVGUkxFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEyaEZMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zTmtOQlFUSkNMRU5CUVVNc1VVRkJVU3hGUVVGRkxGRkJRVkVzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEYUVVc1NVRkJTU3haUVVGWkxFZEJRVWNzVVVGQlVTeEZRVUZGTEVOQlFVTTdXVUZET1VJc1lVRkJUU3hEUVVGRExHVkJRV1VzUTBGRGJFSXNXVUZCV1R0cFFrRkRVQ3hKUVVGSkxFTkJRVU1zVlVGQlF5eERRVUZETEVsQlFVc3NUMEZCUVN4RFFVRkRMRU5CUVVNc1NVRkJTU3hMUVVGTExGTkJRVk1zUlVGQmNFSXNRMEZCYjBJc1EwRkJRenRwUWtGRGFrTXNVVUZCVVN4RlFVTmlMRkZCUVZFc1EwRkJReXhEUVVGRE8xbEJRMlFzWVVGQlRTeERRVUZETEdWQlFXVXNRMEZEYkVJc1dVRkJXVHRwUWtGRFVDeEpRVUZKTEVOQlFVTXNWVUZCUXl4RFFVRkRMRWxCUVVzc1QwRkJRU3hEUVVGRExFTkJRVU1zU1VGQlNTeExRVUZMTEZGQlFWRXNSVUZCYmtJc1EwRkJiVUlzUTBGQlF6dHBRa0ZEYUVNc1VVRkJVU3hGUVVOaUxGRkJRVkVzUTBGQlF5eE5RVUZOTEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVNdlFpeGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVTnNRaXhaUVVGWk8ybENRVU5RTEVsQlFVa3NRMEZCUXl4VlFVRkRMRU5CUVVNc1NVRkJTeXhQUVVGQkxFTkJRVU1zUTBGQlF5eEpRVUZKTEV0QlFVc3NaMEpCUVdkQ0xFVkJRVE5DTEVOQlFUSkNMRU5CUVVNN2FVSkJRM2hETEZGQlFWRXNSVUZEWWl4RlFVRkZMRU5CUVVNc1EwRkJRenRSUVVOYUxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NSVUZCUlN4RFFVRkRMQ3RDUVVFclFpeEZRVUZGTzFsQlEyaERMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zTmtKQlFWY3NRMEZCUXl4RFFVRkRMRk5CUVZNc1JVRkJSU3hSUVVGUkxFVkJRVVVzWjBKQlFXZENMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRGNrVXNTVUZCU1N4UlFVRlJMRWRCUVdNN1owSkJRM1JDTEVWQlFVVXNUVUZCVFN4RlFVRkZMR2RDUVVGblFpeEZRVUZGTEZOQlFWTXNSVUZCUlN3d1FrRkJNRUlzUlVGQlJTeFhRVUZYTEVWQlFVVXNjVUpCUVhGQ0xFVkJRVVVzUzBGQlN5eEZRVUZGTERCQ1FVRXdRaXhGUVVGRk8yZENRVU14U1N4RlFVRkZMRTFCUVUwc1JVRkJSU3hWUVVGVkxFVkJRVVVzVTBGQlV5eEZRVUZGTERCQ1FVRXdRaXhGUVVGRkxGZEJRVmNzUlVGQlJTeHhRa0ZCY1VJc1JVRkJSU3hMUVVGTExFVkJRVVVzTUVKQlFUQkNMRVZCUVVVN1owSkJRM0JKTEVWQlFVVXNUVUZCVFN4RlFVRkZMRzlDUVVGdlFpeEZRVUZGTEZOQlFWTXNSVUZCUlN3d1FrRkJNRUlzUlVGQlJTeFhRVUZYTEVWQlFVVXNjVUpCUVhGQ0xFVkJRVVVzUzBGQlN5eEZRVUZGTERCQ1FVRXdRaXhGUVVGRk8yRkJRVU1zUTBGQlF6dFpRVU53U2l4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExEWkRRVUV5UWl4RFFVRkRMRk5CUVZNc1JVRkJSU3hSUVVGUkxFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEycEZMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zTmtOQlFUSkNMRU5CUVVNc1VVRkJVU3hGUVVGRkxGRkJRVkVzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEYUVVc1MwRkJTeXhEUVVGRExGRkJRVkVzUTBGQlF5dzJRMEZCTWtJc1EwRkJReXhSUVVGUkxFVkJRVVVzVVVGQlVTeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTm9SU3hMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEcxRFFVRnBRaXhGUVVGRkxFTkJRVU1zUTBGQlF6dFpRVU53UXl4SlFVRkpMRmxCUVZrc1IwRkJSeXhSUVVGUkxFVkJRVVVzUTBGQlF6dFpRVU01UWl4aFFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExGbEJRVmtzUlVGQlJTeEZRVUZGTEVOQlFVTXNRMEZCUXp0UlFVTTNReXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTBnc1VVRkJVU3hEUVVGRExIRkNRVUZ4UWl4RlFVRkZPMUZCUXpWQ0xFbEJRVWtzUzBGQmJVSXNRMEZCUXp0UlFVTjRRaXhKUVVGSkxHRkJRVFpETEVOQlFVTTdVVUZEYkVRc1ZVRkJWU3hEUVVGRE8xbEJRMUFzUzBGQlN5eEhRVUZITEZGQlFWRXNSVUZCUlN4RFFVRkRPMWxCUTI1Q0xHRkJRV0VzUjBGQlJ5eGpRVUZOTEU5QlFVRXNTMEZCU3l4RFFVRkRMRkZCUVZFc1JVRkJSU3hEUVVGRExHRkJRV0VzUlVGQk9VSXNRMEZCT0VJc1EwRkJRenRSUVVONlJDeERRVUZETEVOQlFVTXNRMEZCUVR0UlFVTkdMRVZCUVVVc1EwRkJReXh0UWtGQmJVSXNSVUZCUlR0WlFVTndRaXhoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEdGQlFXRXNSVUZCUlN4RFFVRkRMRTFCUVUwc1JVRkJSU3hGUVVGRkxFTkJRVU1zUTBGQlF6dFpRVU51UkN4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExDdENRVUZSTEVOQlFVTXNXVUZCV1N4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOMlF5eGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMR0ZCUVdFc1JVRkJSU3hEUVVGRExFMUJRVTBzUlVGQlJTeERRVUZETEZsQlFWa3NRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRMMFFzUzBGQlN5eERRVUZETEZGQlFWRXNRMEZCUXl3clFrRkJVU3hEUVVGRExHVkJRV1VzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZETVVNc1lVRkJUU3hEUVVGRExHVkJRV1VzUTBGQlF5eGhRVUZoTEVWQlFVVXNRMEZCUXl4TlFVRk5MRVZCUVVVc1EwRkJReXhaUVVGWkxFVkJRVVVzWlVGQlpTeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTndSaXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl4eFEwRkJjVU1zUlVGQlJUdFpRVU4wUXl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExDdENRVUZSTEVOQlFVTXNXVUZCV1N4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOMlF5eExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMQ3RDUVVGUkxFTkJRVU1zWlVGQlpTeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTXhReXhoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEdGQlFXRXNSVUZCUlN4RFFVRkRMRTFCUVUwc1JVRkJSU3hEUVVGRExGbEJRVmtzUlVGQlJTeGxRVUZsTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTJoR0xFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNhME5CUVZjc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzFsQlF5OUNMR0ZCUVUwc1EwRkJReXhsUVVGbExFTkJRVU1zWVVGQllTeEZRVUZGTEVOQlFVTXNUVUZCVFN4RlFVRkZMRU5CUVVNc1dVRkJXU3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU12UkN4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExHdERRVUZYTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRVHRaUVVNNVFpeGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMR0ZCUVdFc1JVRkJSU3hEUVVGRExFMUJRVTBzUlVGQlJTeEZRVUZGTEVOQlFVTXNRMEZCUXp0UlFVTjJSQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl4eFFrRkJjVUlzUlVGQlJUdFpRVU4wUWl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExDdENRVUZSTEVOQlFVTXNXVUZCV1N4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOMlF5eExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMQ3RDUVVGUkxFTkJRVU1zWlVGQlpTeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTXhReXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEd0RFFVRlhMRVZCUVVVc1EwRkJReXhEUVVGRE8xbEJRemxDTEdGQlFVMHNRMEZCUXl4bFFVRmxMRU5CUVVNc1lVRkJZU3hGUVVGRkxFTkJRVU1zVFVGQlRTeEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkRPMUZCUTNaRUxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NSVUZCUlN4RFFVRkRMR2xDUVVGcFFpeEZRVUZGTzFsQlEyeENMR0ZCUVUwc1EwRkJReXhsUVVGbExFTkJRVU1zWVVGQllTeEZRVUZGTEVOQlFVTXNTMEZCU3l4RlFVRkZMRVZCUVVVc1EwRkJReXhEUVVGRE8xbEJRMnhFTEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc09FSkJRVThzUTBGQlF5eFhRVUZYTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTNKRExHRkJRVTBzUTBGQlF5eGxRVUZsTEVOQlFVTXNZVUZCWVN4RlFVRkZMRU5CUVVNc1MwRkJTeXhGUVVGRkxFTkJRVU1zVjBGQlZ5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTTNSQ3hMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETERoQ1FVRlBMRU5CUVVNc1kwRkJZeXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU40UXl4aFFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExHRkJRV0VzUlVGQlJTeERRVUZETEV0QlFVc3NSVUZCUlN4RFFVRkRMRmRCUVZjc1JVRkJSU3hqUVVGakxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEycEdMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzUlVGQlJTeERRVUZETEcxRFFVRnRReXhGUVVGRk8xbEJRM0JETEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc09FSkJRVThzUTBGQlF5eFhRVUZYTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTNKRExFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNPRUpCUVU4c1EwRkJReXhqUVVGakxFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEzaERMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zYVVOQlFWVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRemxDTEdGQlFVMHNRMEZCUXl4bFFVRmxMRU5CUVVNc1lVRkJZU3hGUVVGRkxFTkJRVU1zUzBGQlN5eEZRVUZGTEVOQlFVTXNWMEZCVnl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVNM1JDeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMR2xEUVVGVkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTTVRaXhoUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEdGQlFXRXNSVUZCUlN4RFFVRkRMRXRCUVVzc1JVRkJSU3hGUVVGRkxFTkJRVU1zUTBGQlF6dFJRVU4wUkN4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFVkJRVVVzUTBGQlF5eHZRa0ZCYjBJc1JVRkJSVHRaUVVOeVFpeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMRGhDUVVGUExFTkJRVU1zVjBGQlZ5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTnlReXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETERoQ1FVRlBMRU5CUVVNc1kwRkJZeXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU40UXl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExHbERRVUZWTEVWQlFVVXNRMEZCUXl4RFFVRkRPMWxCUXpkQ0xHRkJRVTBzUTBGQlF5eGxRVUZsTEVOQlFVTXNZVUZCWVN4RlFVRkZMRU5CUVVNc1MwRkJTeXhGUVVGRkxFVkJRVVVzUTBGQlF5eERRVUZETzFGQlEzUkVMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMUFzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEU0N4UlFVRlJMRU5CUVVNc1pVRkJaU3hGUVVGRk8xRkJRM1JDTEVsQlFVa3NTMEZCYlVJc1EwRkJRenRSUVVONFFpeEpRVUZKTEU5QlFXbERMRU5CUVVNN1VVRkRkRU1zVlVGQlZTeERRVUZETzFsQlExQXNTMEZCU3l4SFFVRkhMRkZCUVZFc1JVRkJSU3hEUVVGRE8xbEJRMjVDTEU5QlFVOHNSMEZCUnl4alFVRk5MRTlCUVVFc1MwRkJTeXhEUVVGRExGRkJRVkVzUlVGQlJTeERRVUZETEU5QlFVOHNSVUZCZUVJc1EwRkJkMElzUTBGQlF6dFJRVU0zUXl4RFFVRkRMRU5CUVVNc1EwRkJRVHRSUVVOR0xFVkJRVVVzUTBGQlF5d3dRa0ZCTUVJc1JVRkJSVHRaUVVNelFpeGhRVUZOTEVOQlFVTXNUVUZCVFN4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFsQlF6bENMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zYTBOQlFXbENMRVZCUVVVc1EwRkJReXhEUVVGRE8xbEJRM0JETEdGQlFVMHNRMEZCUXl4UFFVRlBMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdXVUZETDBJc1MwRkJTeXhEUVVGRExGRkJRVkVzUTBGQlF5eHJRMEZCYVVJc1JVRkJSU3hEUVVGRExFTkJRVU03V1VGRGNFTXNZVUZCVFN4RFFVRkRMRTFCUVUwc1EwRkJReXhQUVVGUExFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0WlFVTTVRaXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEd0RFFVRnBRaXhGUVVGRkxFTkJRVU1zUTBGQlF6dFpRVU53UXl4aFFVRk5MRU5CUVVNc1QwRkJUeXhEUVVGRExFOUJRVThzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUTI1RExFTkJRVU1zUTBGQlF5eERRVUZETzBsQlExQXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRTQ3hSUVVGUkxFTkJRVU1zWTBGQll5eEZRVUZGTzFGQlEzSkNMRWxCUVVrc1MwRkJiVUlzUTBGQlF6dFJRVU40UWl4SlFVRkpMRTFCUVN0Q0xFTkJRVU03VVVGRGNFTXNWVUZCVlN4RFFVRkRPMWxCUTFBc1MwRkJTeXhIUVVGSExGRkJRVkVzUlVGQlJTeERRVUZETzFsQlEyNUNMRTFCUVUwc1IwRkJSeXhqUVVGTkxFOUJRVUVzUzBGQlN5eERRVUZETEZGQlFWRXNSVUZCUlN4RFFVRkRMRTFCUVUwc1JVRkJka0lzUTBGQmRVSXNRMEZCUXp0UlFVTXpReXhEUVVGRExFTkJRVU1zUTBGQlFUdFJRVU5HTEVWQlFVVXNRMEZCUXl4eFJFRkJjVVFzUlVGQlJUdFpRVU4wUkN4aFFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExFMUJRVTBzUlVGQlJTeEZRVUZGTzJkQ1FVTTNRaXhGUVVGRkxFVkJRVVVzU1VGQlNUdG5Ra0ZEVWl4VFFVRlRMRVZCUVVVc1MwRkJTenRuUWtGRGFFSXNiVUpCUVcxQ0xFVkJRVVVzUlVGQlJUdGhRVU14UWl4RFFVRkRMRU5CUVVNN1dVRkRTQ3hKUVVGSkxGRkJRVkVzUjBGQk1FSXNZMEZCWXl4RlFVRkZMRU5CUVVNN1dVRkRka1FzUzBGQlN5eERRVUZETEZGQlFWRXNRMEZCUXl3MlFrRkJZU3hEUVVGRExGRkJRVkVzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEZUVNc1lVRkJUU3hEUVVGRExHVkJRV1VzUTBGQlF5eE5RVUZOTEVWQlFVVXNSVUZCUlR0blFrRkROMElzUlVGQlJTeEZRVUZGTEZGQlFWRTdaMEpCUTFvc1UwRkJVeXhGUVVGRkxFdEJRVXM3WjBKQlEyaENMRzFDUVVGdFFpeEZRVUZGTEVWQlFVVTdZVUZETVVJc1EwRkJReXhEUVVGRE8xbEJRMGdzVVVGQlVTeERRVUZETEV0QlFVc3NSVUZCUlN4RFFVRkRPMUZCUTNKQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NSVUZCUlN4RFFVRkRMRzFEUVVGdFF5eEZRVUZGTzFsQlEzQkRMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zYTBOQlFXdENMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU42UXl4aFFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExFMUJRVTBzUlVGQlJTeEZRVUZGTzJkQ1FVTTNRaXhGUVVGRkxFVkJRVVVzU1VGQlNUdG5Ra0ZEVWl4VFFVRlRMRVZCUVVVc1NVRkJTVHRuUWtGRFppeHRRa0ZCYlVJc1JVRkJSU3hGUVVGRk8yRkJRekZDTEVOQlFVTXNRMEZCUXp0WlFVTklMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zYTBOQlFXdENMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU14UXl4aFFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExFMUJRVTBzUlVGQlJTeEZRVUZGTzJkQ1FVTTNRaXhGUVVGRkxFVkJRVVVzU1VGQlNUdG5Ra0ZEVWl4VFFVRlRMRVZCUVVVc1MwRkJTenRuUWtGRGFFSXNiVUpCUVcxQ0xFVkJRVVVzUlVGQlJUdGhRVU14UWl4RFFVRkRMRU5CUVVNN1VVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEVWQlFVVXNRMEZCUXl4dFEwRkJiVU1zUlVGQlJUdFpRVU53UXl4SlFVRkpMRTFCUVUwc1IwRkJZU3hEUVVGRExHVkJRV1VzUlVGQlJTeG5Ra0ZCWjBJc1EwRkJReXhEUVVGRE8xbEJRek5FTEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc2RVTkJRWFZDTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOb1JDeGhRVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMRTFCUVUwc1JVRkJSU3hGUVVGRk8yZENRVU0zUWl4RlFVRkZMRVZCUVVVc1NVRkJTVHRuUWtGRFVpeFRRVUZUTEVWQlFVVXNTMEZCU3p0blFrRkRhRUlzYlVKQlFXMUNMRVZCUVVVc1RVRkJUVHRoUVVNNVFpeERRVUZETEVOQlFVTTdVVUZEVUN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOUUxFTkJRVU1zUTBGQlF5eERRVUZETzBsQlEwZ3NVVUZCVVN4RFFVRkRMR3RDUVVGclFpeEZRVUZGTzFGQlEzcENMRWxCUVVrc1MwRkJiVUlzUTBGQlF6dFJRVU40UWl4SlFVRkpMRk5CUVhGRExFTkJRVU03VVVGRE1VTXNWVUZCVlN4RFFVRkRPMWxCUTFBc1MwRkJTeXhIUVVGSExGRkJRVkVzUlVGQlJTeERRVUZETzFsQlEyNUNMRk5CUVZNc1IwRkJSeXhqUVVGTkxFOUJRVUVzUzBGQlN5eERRVUZETEZGQlFWRXNSVUZCUlN4RFFVRkRMRk5CUVZNc1JVRkJNVUlzUTBGQk1FSXNRMEZCUXp0UlFVTnFSQ3hEUVVGRExFTkJRVU1zUTBGQlFUdFJRVU5HTEVWQlFVVXNRMEZCUXl4eFFrRkJjVUlzUlVGQlJUdFpRVU4wUWl4SlFVRkpMRXRCUVVzc1IwRkJiVUk3WjBKQlEzaENMR1ZCUVdVc1JVRkJSVHR2UWtGRFlpeEpRVUZKTEVWQlFVVXNUVUZCVFR0dlFrRkRXaXhKUVVGSkxFVkJRVVVzVjBGQlZ6dHBRa0ZEY0VJN1owSkJRMFFzWjBKQlFXZENMRVZCUVVVN2IwSkJRMlFzU1VGQlNTeEZRVUZGTEU5QlFVODdiMEpCUTJJc1NVRkJTU3hGUVVGRkxHTkJRV003YVVKQlEzWkNPMmRDUVVORUxHZENRVUZuUWl4RlFVRkZPMjlDUVVOa0xFbEJRVWtzUlVGQlJTeFBRVUZQTzI5Q1FVTmlMRWxCUVVrc1JVRkJSU3hYUVVGWE8ybENRVU53UWp0aFFVTktMRU5CUVVFN1dVRkRSQ3hMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETERoQ1FVRlhMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU51UXl4aFFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExGTkJRVk1zUlVGQlJTeEZRVUZGTEV0QlFVc3NRMEZCUXl4RFFVRkRPMUZCUXk5RExFTkJRVU1zUTBGQlF5eERRVUZETzBsQlExQXNRMEZCUXl4RFFVRkRMRU5CUVVNN1FVRkRVQ3hEUVVGRExFTkJRVU1zUTBGQlF5SjkiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvcy1tb2NrLWFkYXB0ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmNyeXB0anNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hhaVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb21wcmVzc2lvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb25uZWN0LW1vbmdvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvb2tpZS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3N1cmZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzLXNlc3Npb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaGVsbWV0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwianNvbndlYnRva2VuXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vY2hhXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm11c3RhY2hlLWV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1sb2dnZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtbW9jay1zdG9yZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC10aHVua1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzb2NrZXQuaW9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic29ja2V0LmlvLWNsaWVudFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzb2NrZXRpby1qd3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3VwZXJ0ZXN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInN1cGVydGVzdC1zZXNzaW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInZhbGlkYXRvclwiKTsiXSwic291cmNlUm9vdCI6IiJ9