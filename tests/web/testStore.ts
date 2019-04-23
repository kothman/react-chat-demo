import { assert } from 'chai';
import 'mocha';
import * as socketioclient from 'socket.io-client';
import { NotImplementedError } from '../';
import {State, rootReducer, middleware} from '../../src/web/store';

import { Store, createStore } from 'redux';
import { setAuthorized, setUser, logoutUser } from '../../src/web/actions/userActions';
import { addChannels, setChannelFetchingNewMessages, incrementChannelRetrieveMessagesOffset, setChannelHasMoreMessages, addReceivedChannelMessage, addRetrievedChannelMessages, clearChannelsData } from '../../src/web/actions/channelsActions';
import { Message } from '../../src/web/reducers/channels';
import { addError, removeError, clearErrors, addInfo, removeInfo, clearInfos } from '../../src/web/actions/notificationsActions';
import { toggleSidebarOpen } from '../../src/web/actions/sidebarActions';
import { initWebsocket, setSocketConnected, setSocketConnectedUsers } from '../../src/web/actions/socketActions';
import { updateUsers, addUser, removeUser } from '../../src/web/actions/chatUsersActions';
import { State as ChatUsersState } from '../../src/web/reducers/chatUsers';

function getStore(): Store<State> {
    return createStore(rootReducer, middleware);
}

describe('Store and Synchronous Actions', function() {
    describe('User State', function () {
        let store: Store<State>;
        let user: (() => State['user']);
        beforeEach(function () {
            store = getStore();
            user = () => store.getState().user;
        });
        it('should not be authorized', function () {
            assert.isFalse(user().authorized);
            assert.isFalse(user().email);
            assert.isFalse(user().name);
            assert.isFalse(user().role);
        });
        it('should be authorized after setAuthorized action', function() {
            assert.isFalse(user().authorized);
            store.dispatch(setAuthorized(true));
            assert.isTrue(user().authorized);
            store.dispatch(setAuthorized(false));
            assert.isFalse(user().authorized);
        });
        it('should have user data after setting the user', function() {
            assert.isFalse(user().authorized);
            assert.isFalse(user().email);
            assert.isFalse(user().name);
            assert.isFalse(user().role);
            store.dispatch(setUser({
                authorized: true,
                email: 'test@test.com',
                name: 'Jane Doe',
                role: 'admin'
            }));
            assert.isTrue(user().authorized);
            assert.strictEqual(user().email, 'test@test.com');
            assert.strictEqual(user().name, 'Jane Doe');
            assert.strictEqual(user().role, 'admin');
            store.dispatch(setUser({
                authorized: false,
                email: false,
                name: false,
                role: false
            }));
            assert.isFalse(user().authorized);
            assert.isFalse(user().email);
            assert.isFalse(user().name);
            assert.isFalse(user().role);
        });
        it('should not have user data after logging out', function() {
            store.dispatch(setUser({
                authorized: true,
                email: 'test@test.com',
                name: 'Jane Doe',
                role: 'admin'
            }));
            store.dispatch(logoutUser());
            store.dispatch(setUser({
                authorized: false,
                email: false,
                name: false,
                role: false
            }));
        })
    });
    describe('Channels State', function () {
        let store: Store<State>;
        let channels: (() => State['channels']);
        beforeEach(function () {
            store = getStore();
            channels = () => store.getState().channels;
        });
        it('should add channels from an array of channel names', function() {
            store.dispatch(addChannels(['general', 'random', 'something else']));
            let c0: State['channels'][0] = channels()[0];
            let c1: State['channels'][0] = channels()[1];
            let c2: State['channels'][0] = channels()[2];
            assert.deepStrictEqual(c0, {
                name: 'general',
                messages: [],
                retrieveMessagesOffset: 0,
                hasMoreMessages: true,
                fetchingNewMessages: false,
            });
            assert.deepStrictEqual(c1, {
                name: 'random',
                messages: [],
                retrieveMessagesOffset: 0,
                hasMoreMessages: true,
                fetchingNewMessages: false,
            });
            assert.deepStrictEqual(c2, {
                name: 'something else',
                messages: [],
                retrieveMessagesOffset: 0,
                hasMoreMessages: true,
                fetchingNewMessages: false,
            });
        });
        it('should update fetchingNewMessages after calling setChannelFetchingNewMessages action', function() {
            store.dispatch(addChannels(['general', 'random', 'something else']));
            channels().forEach((c: State['channels'][0]) => {
                assert.isFalse(c.fetchingNewMessages);
                store.dispatch(setChannelFetchingNewMessages(c.name, true));
            });
            channels().forEach((c: State['channels'][0]) => {
                assert.isTrue(c.fetchingNewMessages);
                store.dispatch(setChannelFetchingNewMessages(c.name, false));
            });
            channels().forEach((c: State['channels'][0]) => {
                assert.isFalse(c.fetchingNewMessages);
            });
        });
        it('should increment the channel offset for retrieving new messages', function() {
            store.dispatch(addChannels(['general', 'random', 'something else']));
            assert.strictEqual(channels().find(e => e.name === 'general').retrieveMessagesOffset, 0);
            assert.strictEqual(channels().find(e => e.name === 'random').retrieveMessagesOffset, 0);
            assert.strictEqual(channels().find(e => e.name === 'something else').retrieveMessagesOffset, 0);
            store.dispatch(incrementChannelRetrieveMessagesOffset('general', 20))
            assert.strictEqual(channels().find(e => e.name === 'general').retrieveMessagesOffset, 20);
            store.dispatch(incrementChannelRetrieveMessagesOffset('general', 1))
            assert.strictEqual(channels().find(e => e.name === 'general').retrieveMessagesOffset, 21);
            store.dispatch(incrementChannelRetrieveMessagesOffset('random', 1))
            assert.strictEqual(channels().find(e => e.name === 'random').retrieveMessagesOffset, 1);
            store.dispatch(incrementChannelRetrieveMessagesOffset('something else', 1))
            assert.strictEqual(channels().find(e => e.name === 'something else').retrieveMessagesOffset, 1);
        });
        it('should update the hasMoreMessages property on a channel', function() {
            store.dispatch(addChannels(['general', 'random', 'something else']));
            assert.isTrue(channels().find(e => e.name === 'general').hasMoreMessages);
            assert.isTrue(channels().find(e => e.name === 'random').hasMoreMessages);
            assert.isTrue(channels().find(e => e.name === 'something else').hasMoreMessages);
            store.dispatch(setChannelHasMoreMessages('general', false));
            store.dispatch(setChannelHasMoreMessages('random', false));
            store.dispatch(setChannelHasMoreMessages('something else', false));
            assert.isFalse(channels().find(e => e.name === 'general').hasMoreMessages);
            assert.isFalse(channels().find(e => e.name === 'random').hasMoreMessages);
            assert.isFalse(channels().find(e => e.name === 'something else').hasMoreMessages);
        });
        it('should add a received message to the appropriate channel', function() {
            store.dispatch(addChannels(['general', 'random', 'something else']));
            let message: Message = {
                userEmail: 'test@test.com',
                created: Date.now().toString(),
                _id: '1',
                text: 'this is the message',
            };

            store.dispatch(addReceivedChannelMessage('general', message));
            store.dispatch(addReceivedChannelMessage('random', message));
            store.dispatch(addReceivedChannelMessage('random', message));
            store.dispatch(addReceivedChannelMessage('something else', message));
            store.dispatch(addReceivedChannelMessage('something else', message));
            store.dispatch(addReceivedChannelMessage('something else', message));

            let generalMessages: Message[] = channels().find(e => e.name === 'general').messages;
            assert.deepStrictEqual(generalMessages.length, 1);
            assert.deepStrictEqual(generalMessages, [message]);
            let randomMessages: Message[] = channels().find(e => e.name === 'random').messages;
            assert.deepStrictEqual(randomMessages.length, 2);
            assert.deepStrictEqual(randomMessages, [message, message]);
            let otherMessages: Message[] = channels().find(e => e.name === 'something else').messages;
            assert.deepStrictEqual(otherMessages.length, 3);
            assert.deepStrictEqual(otherMessages, [message, message, message]);
        });
        it('should add retreived messages to the appropriate channel', function() {
            store.dispatch(addChannels(['general', 'random', 'something else']));
            let messages: Message[] = [
                { "text": "Something here", "created": "2019-04-13T16:45:28.946Z", "userEmail": "abkothman@gmail.com", "_id": "5cb212281d645a22abea8dbe" },
                { "text": "12341234", "created": "2019-04-14T22:34:06.686Z", "userEmail": "abkothman@gmail.com",  "_id": "5cb3b55ecbf68c6a954eafb3" },
                { "text": "test one two three", "created": "2019-04-14T22:34:10.903Z", "userEmail": "abkothman@gmail.com", "_id": "5cb3b562cbf68c6a954eafb4" }];
            store.dispatch(addRetrievedChannelMessages('general', messages));
            store.dispatch(addRetrievedChannelMessages('random', messages));
            store.dispatch(addRetrievedChannelMessages('random', messages));
            let channelState = channels();
            assert.deepStrictEqual(
                channelState
                    .find((c) => c.name === 'general')
                    .messages,
                messages);
            assert.deepStrictEqual(
                channelState
                    .find((c) => c.name === 'random')
                    .messages,
                messages.concat(messages));
            assert.deepStrictEqual(
                channelState
                    .find((c) => c.name === 'something else')
                    .messages,
                []);
        });
        it('should clear all channel data', function() {
            store.dispatch(addChannels(['general', 'random', 'something else']));
            let messages: Message[] = [
                { "text": "Something here", "created": "2019-04-13T16:45:28.946Z", "userEmail": "abkothman@gmail.com", "_id": "5cb212281d645a22abea8dbe" },
                { "text": "12341234", "created": "2019-04-14T22:34:06.686Z", "userEmail": "abkothman@gmail.com", "_id": "5cb3b55ecbf68c6a954eafb3" },
                { "text": "test one two three", "created": "2019-04-14T22:34:10.903Z", "userEmail": "abkothman@gmail.com", "_id": "5cb3b562cbf68c6a954eafb4" }];
            store.dispatch(addRetrievedChannelMessages('general', messages));
            store.dispatch(addRetrievedChannelMessages('random', messages));
            store.dispatch(addRetrievedChannelMessages('random', messages));
            store.dispatch(clearChannelsData());
            let channelState = channels();
            assert.deepStrictEqual(channelState, []);
        });
    });
    describe('Notifications State', function () {
        let store: Store<State>;
        let notifications: (() => State['notifications']);
        beforeEach(function() {
            store = getStore();
            notifications = () => store.getState().notifications;
        })
        it('should add errors', function() {
            assert.deepStrictEqual(notifications().errors, []);
            store.dispatch(addError('Test error'));
            assert.deepStrictEqual(notifications().errors, ['Test error']);
            store.dispatch(addError('Another error'));
            assert.deepStrictEqual(notifications().errors, ['Test error', 'Another error']);
        });
        it('should remove errors given an index', function() {
            store.dispatch(addError('Test error'));
            store.dispatch(addError('Another error'));
            assert.deepStrictEqual(notifications().errors, ['Test error', 'Another error']);
            store.dispatch(removeError(1));
            assert.deepStrictEqual(notifications().errors, ['Test error']);
            store.dispatch(removeError(0))
            assert.deepStrictEqual(notifications().errors, []);
        });
        it('should clear errors', function() {
            store.dispatch(addError('Test error'));
            store.dispatch(addError('Another error'));
            store.dispatch(clearErrors());
            assert.deepStrictEqual(notifications().errors, []);
        });
        it('should add info', function() {
            assert.deepStrictEqual(notifications().infos, []);
            store.dispatch(addInfo('Test info'));
            assert.deepStrictEqual(notifications().infos, ['Test info']);
            store.dispatch(addInfo('Another info'));
            assert.deepStrictEqual(notifications().infos, ['Test info', 'Another info']);
        });
        it('should remove info given an index', function() {
            store.dispatch(addInfo('Test info'));
            store.dispatch(addInfo('Another info'));
            store.dispatch(removeInfo(1));
            assert.deepStrictEqual(notifications().infos, ['Test info']);
            store.dispatch(removeInfo(0));
            assert.deepStrictEqual(notifications().infos, []);
        });
        it('should clear infos', function() {
            store.dispatch(addInfo('Test info'));
            store.dispatch(addInfo('Another info'));
            store.dispatch(clearInfos());
            assert.deepStrictEqual(notifications().infos, []);
        });
    });
    describe('Sidebar State', function () {
        let store: Store<State>;
        let sidebar: (() => State['sidebar']);
        beforeEach(function () {
            store = getStore();
            sidebar = () => store.getState().sidebar;
        })
        it('should toggle open state', function() {
            assert.isTrue(sidebar().open);
            store.dispatch(toggleSidebarOpen());
            assert.isFalse(sidebar().open);
            store.dispatch(toggleSidebarOpen());
            assert.isTrue(sidebar().open);
            store.dispatch(toggleSidebarOpen());
            assert.isFalse(sidebar().open);
        });
    });
    describe('Socket State', function () {
        let store: Store<State>;
        let socket: (() => State['socket']);
        beforeEach(function () {
            store = getStore();
            socket = () => store.getState().socket;
        })
        it('should set the socket given a SocketIOClient Socket', function() {
            assert.deepStrictEqual(socket(), {
                io: null,
                connected: false,
                connectedUserEmails: []
            });
            let socketio: SocketIOClient.Socket = socketioclient();
            store.dispatch(initWebsocket(socketio));
            assert.deepStrictEqual(socket(), {
                io: socketio,
                connected: false,
                connectedUserEmails: []
            });
            socketio.close();
        });
        it('should update the connected state', function() {
            store.dispatch(setSocketConnected(true));
            assert.deepStrictEqual(socket(), {
                io: null,
                connected: true,
                connectedUserEmails: []
            });
            store.dispatch(setSocketConnected(false));
            assert.deepStrictEqual(socket(), {
                io: null,
                connected: false,
                connectedUserEmails: []
            });
        });
        it('should update the connected users', function() {
            let emails: string[] = ['test@test.com', 'test2@test.com'];
            store.dispatch(setSocketConnectedUsers(emails));
            assert.deepStrictEqual(socket(), {
                io: null,
                connected: false,
                connectedUserEmails: emails
            });
        });
    });
    describe('Chat Users State', function () {
        let store: Store<State>;
        let chatUsers: (() => State['chatUsers']);
        beforeEach(function () {
            store = getStore();
            chatUsers = () => store.getState().chatUsers;
        })
        it('should update users', function() {
            let users: ChatUsersState = {
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
            }
            store.dispatch(updateUsers(users));
            assert.deepStrictEqual(chatUsers(), users);
        });
        it('should add a user');
        it('should remove a user');
    });
});
