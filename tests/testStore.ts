import { assert } from 'chai';
import * as _ from 'lodash';
import 'mocha';
import store, {State} from '../src/store';
import { Store } from 'redux';

function getStoreCopy(): Store<State> {
    return _.cloneDeep(store);
}

describe('Store and Synchronous Actions', function() {
    describe('User State', function () {
        let store: Store<State>;
        let user: State['user'];
        beforeEach(function () {
            store = getStoreCopy();
            user = store.getState().user;
        });
        it('should not be authorized', function () {
            assert.isFalse(user.authorized);
            assert.isFalse(user.email);
            assert.isFalse(user.name);
            assert.isFalse(user.role);
        });
        it('should be authorized after setAuthorized action');
        it('should have user data after setting the user');
        it('should not have user data after logging out')
    });
    describe('Channels State', function () {
        it('should add channels from an array of channel names');
        it('should update fetchingNewMessages after calling setChannelFetchingNewMessages action');
        it('should increment the channel offset for retrieving new messages');
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
