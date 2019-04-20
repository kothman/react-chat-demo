import { assert } from 'chai';
import * as _ from 'lodash';
import 'mocha';
import store, {State} from '../../src/web/store';
import { Store } from 'redux';
import { setAuthorized, setUser, logoutUser } from '../../src/web/actions/userActions';
import { addChannels, setChannelFetchingNewMessages } from '../../src/web/actions/channelsActions';

function getStoreCopy(): Store<State> {
    return _.cloneDeep(store);
}

describe('Store and Synchronous Actions', function() {
    describe('User State', function () {
        let store: Store<State>;
        let user: (() => State['user']);
        beforeEach(function () {
            store = getStoreCopy();
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
            store = getStoreCopy();
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
