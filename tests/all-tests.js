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

/***/ "./src/actions/channelsActions.ts":
/*!****************************************!*\
  !*** ./src/actions/channelsActions.ts ***!
  \****************************************/
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
var notificationsActions_1 = __webpack_require__(/*! ../actions/notificationsActions */ "./src/actions/notificationsActions.ts");
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
            console.log(err);
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
                console.log('Retrieve Channel Messages dispatched with incorrect channel name or while already fetching messages', channelName, getState());
                return [2, Promise.resolve()];
            }
            dispatch(exports.setChannelFetchingNewMessages(channel.name, true));
            return [2, axios_1["default"].get('/api/v1/messages/' + channel.name + '/' + channel.retrieveMessagesOffset).then(function (res) {
                    if (res.data.messages.length === 0) {
                        dispatch(exports.setChannelHasMoreMessages(channel.name, false));
                        return res;
                    }
                    dispatch(exports.incrementChannelRetrieveMessagesOffset(channelName, 20));
                    dispatch(exports.addRetrievedChannelMessages(channel.name, res.data.messages));
                })["catch"](function (err) {
                    console.log('Error fetching messages', channel, err);
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
            console.log('Error deleting channel', err);
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
            console.log('Error creating chanel', err);
            return dispatch(notificationsActions_1.addError(err.response.data.error));
        });
    };
};


/***/ }),

/***/ "./src/actions/chatUsersActions.ts":
/*!*****************************************!*\
  !*** ./src/actions/chatUsersActions.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var axios_1 = __webpack_require__(/*! axios */ "axios");
var notificationsActions_1 = __webpack_require__(/*! ./notificationsActions */ "./src/actions/notificationsActions.ts");
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
        axios_1["default"].get('/api/v1/users').then(function (res) {
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
            console.log(err);
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

/***/ "./src/actions/notificationsActions.ts":
/*!*********************************************!*\
  !*** ./src/actions/notificationsActions.ts ***!
  \*********************************************/
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

/***/ "./src/actions/sidebarActions.ts":
/*!***************************************!*\
  !*** ./src/actions/sidebarActions.ts ***!
  \***************************************/
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

/***/ "./src/actions/socketActions.ts":
/*!**************************************!*\
  !*** ./src/actions/socketActions.ts ***!
  \**************************************/
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
    return function (dispatch) {
        var ioSocket = io();
        ioSocket.on('connect', function () {
            dispatch(exports.setSocketConnected(true));
            console.log('Connected to websocket server [' + ioSocket.id + ']');
        });
        ioSocket.on('disconnect', function () {
            dispatch(exports.setSocketConnected(false));
            console.log('Disconnected from websocket server, attempting reconnect');
        });
        ioSocket.on('connected users', function (userEmails) {
            dispatch(exports.setSocketConnectedUsers(userEmails));
        });
        return dispatch(exports.initWebsocket(ioSocket));
    };
};


/***/ }),

/***/ "./src/actions/userActions.ts":
/*!************************************!*\
  !*** ./src/actions/userActions.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var axios_1 = __webpack_require__(/*! axios */ "axios");
var channelsActions_1 = __webpack_require__(/*! ./channelsActions */ "./src/actions/channelsActions.ts");
var notificationsActions_1 = __webpack_require__(/*! ./notificationsActions */ "./src/actions/notificationsActions.ts");
exports.SET_AUTHORIZED = 'SET_AUTHORIZED';
exports.SET_USER = 'SET_USER';
exports.LOGOUT_USER = 'LOGOUT_USER';
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

/***/ "./src/reducers/channels.ts":
/*!**********************************!*\
  !*** ./src/reducers/channels.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var channelsActions_1 = __webpack_require__(/*! ../actions/channelsActions */ "./src/actions/channelsActions.ts");
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

/***/ "./src/reducers/chatUsers.ts":
/*!***********************************!*\
  !*** ./src/reducers/chatUsers.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var chatUsersActions_1 = __webpack_require__(/*! ../actions/chatUsersActions */ "./src/actions/chatUsersActions.ts");
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

/***/ "./src/reducers/notifications.ts":
/*!***************************************!*\
  !*** ./src/reducers/notifications.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var notificationsActions_1 = __webpack_require__(/*! ../actions/notificationsActions */ "./src/actions/notificationsActions.ts");
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

/***/ "./src/reducers/sidebar.ts":
/*!*********************************!*\
  !*** ./src/reducers/sidebar.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var sidebarActions_1 = __webpack_require__(/*! ../actions/sidebarActions */ "./src/actions/sidebarActions.ts");
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

/***/ "./src/reducers/socket.ts":
/*!********************************!*\
  !*** ./src/reducers/socket.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var socketActions_1 = __webpack_require__(/*! ../actions/socketActions */ "./src/actions/socketActions.ts");
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

/***/ "./src/reducers/user.ts":
/*!******************************!*\
  !*** ./src/reducers/user.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var userActions_1 = __webpack_require__(/*! ../actions/userActions */ "./src/actions/userActions.ts");
var initialState = {
    authorized: false,
    email: false,
    name: false,
    role: false,
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
        default:
            return state;
    }
}
exports["default"] = default_1;


/***/ }),

/***/ "./src/store.ts":
/*!**********************!*\
  !*** ./src/store.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var redux_1 = __webpack_require__(/*! redux */ "redux");
var redux_thunk_1 = __webpack_require__(/*! redux-thunk */ "redux-thunk");
var redux_logger_1 = __webpack_require__(/*! redux-logger */ "redux-logger");
var user_1 = __webpack_require__(/*! ./reducers/user */ "./src/reducers/user.ts");
var channels_1 = __webpack_require__(/*! ./reducers/channels */ "./src/reducers/channels.ts");
var notifications_1 = __webpack_require__(/*! ./reducers/notifications */ "./src/reducers/notifications.ts");
var sidebar_1 = __webpack_require__(/*! ./reducers/sidebar */ "./src/reducers/sidebar.ts");
var socket_1 = __webpack_require__(/*! ./reducers/socket */ "./src/reducers/socket.ts");
var chatUsers_1 = __webpack_require__(/*! ./reducers/chatUsers */ "./src/reducers/chatUsers.ts");
var rootReducer = redux_1.combineReducers({
    user: user_1["default"],
    channels: channels_1["default"],
    notifications: notifications_1["default"],
    sidebar: sidebar_1["default"],
    socket: socket_1["default"],
    chatUsers: chatUsers_1["default"],
});
var middleware = process.env.PRODUCTION || process.env.DISABLE_REDUX_LOGGING ?
    redux_1.applyMiddleware(redux_thunk_1["default"]) : redux_1.applyMiddleware(redux_thunk_1["default"], redux_logger_1.createLogger());
exports["default"] = redux_1.createStore(rootReducer, middleware);


/***/ }),

/***/ "./tests/index.ts":
/*!************************!*\
  !*** ./tests/index.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

before('all tests', function () {
});
beforeEach('reset DB', function () {
});
after('all tests', function () {
});
__webpack_require__(/*! ./testStore */ "./tests/testStore.ts");
__webpack_require__(/*! ./testAsyncActions */ "./tests/testAsyncActions.ts");


/***/ }),

/***/ "./tests/testAsyncActions.ts":
/*!***********************************!*\
  !*** ./tests/testAsyncActions.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(/*! mocha */ "mocha");
var _ = __webpack_require__(/*! lodash */ "lodash");
var store_1 = __webpack_require__(/*! ../src/store */ "./src/store.ts");
function getStoreCopy() {
    return _.cloneDeep(store_1["default"]);
}
describe('Async Actions', function () {
    var store;
    beforeEach(function () {
        store = getStoreCopy();
    });
    describe('User async actions', function () {
        it('should update name');
        it('should update email');
        it('should update password');
    });
    describe('Channels async actions', function () {
        it('should fetch channels');
        it('should retrieve channel messages');
        it('should delete channel');
        it('should create new channel');
    });
    describe('Socket async actions', function () {
        it('should initialize websocket connection');
    });
    describe('Chat Users async actions', function () {
        it('should fetch all users');
        it('should create a new user');
        it('should edit the user');
        it('should delete the user');
    });
});


/***/ }),

/***/ "./tests/testStore.ts":
/*!****************************!*\
  !*** ./tests/testStore.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var chai_1 = __webpack_require__(/*! chai */ "chai");
var _ = __webpack_require__(/*! lodash */ "lodash");
__webpack_require__(/*! mocha */ "mocha");
var store_1 = __webpack_require__(/*! ../src/store */ "./src/store.ts");
var userActions_1 = __webpack_require__(/*! ../src/actions/userActions */ "./src/actions/userActions.ts");
var channelsActions_1 = __webpack_require__(/*! ../src/actions/channelsActions */ "./src/actions/channelsActions.ts");
function getStoreCopy() {
    return _.cloneDeep(store_1["default"]);
}
describe('Store and Synchronous Actions', function () {
    describe('User State', function () {
        var store;
        var user;
        beforeEach(function () {
            store = getStoreCopy();
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
            store = getStoreCopy();
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
        });
        it('should update the hasMoreMessages property on a channel');
        it('should add a received message to the appropriate channel');
        it('should add retreived messages to the appropriate channel');
        it('should clear all channel data');
    });
    describe('Notifications State', function () {
        it('should add errors');
        it('should remove errors given an index');
        it('should clear errors');
        it('should add info');
        it('should remove info given an index');
        it('should clear infos');
    });
    describe('Sidebar State', function () {
        it('should toggle open state');
    });
    describe('Socket State', function () {
        it('should set the socket given an opened SocketIOClient Socket');
        it('should update the connected state');
        it('should update the connected users');
    });
    describe('Chat Users State', function () {
        it('should update users');
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

/***/ "chai":
/*!***********************!*\
  !*** external "chai" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("chai");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "mocha":
/*!************************!*\
  !*** external "mocha" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mocha");

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

/***/ "redux-thunk":
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),

/***/ "socket.io-client":
/*!***********************************!*\
  !*** external "socket.io-client" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socket.io-client");

/***/ })

/******/ });
//# sourceMappingURL=all-tests.js.map