import 'mocha';
import * as _ from 'lodash';
import { Store } from 'redux';
import store, { State } from '../../src/web/store';

function getStoreCopy(): Store<State> {
    return _.cloneDeep(store);
}

describe('Async Actions', function() {
    let store: Store<State>;
    beforeEach(function() {
        store = getStoreCopy();
    });
    describe('User async actions', function() {
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
})