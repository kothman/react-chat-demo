import 'mocha';
import axios from 'axios';
import { assert } from 'chai';
import MockAdapter from 'axios-mock-adapter';
import configureStore, { MockStoreCreator, MockStoreEnhanced } from 'redux-mock-store'
import thunk from 'redux-thunk'
import { updateName, updateEmail, updatePassword } from '../../src/web/actions/userActions';
import { AnyAction } from 'redux';
import { ADD_INFO, ADD_ERROR, addError, addInfo } from '../../src/web/actions/notificationsActions';
import { Channel, Message } from '../../src/web/reducers/channels';
import { init as initWebsocketConnection, INIT_WEBSOCKET } from '../../src/web/actions/socketActions';
import { fetchChannels, ADD_CHANNELS, addChannels, retrieveChannelMessages, setChannelFetchingNewMessages, setChannelHasMoreMessages, incrementChannelRetrieveMessagesOffset, addRetrievedChannelMessages, deleteChannel, addChannel } from '../../src/web/actions/channelsActions';
import { fetchAllUsers, updateUsers } from '../../src/web/actions/chatUsersActions';
import { State as ChatUsersState } from '../../src/web/reducers/chatUsers';
import { State } from '../../src/web/store';

const mockStoreCreator: MockStoreCreator = configureStore([thunk]);

function getStore(store = {}): MockStoreEnhanced<{} | State> {
    return mockStoreCreator(store);
}

describe('Async Actions', function() {
    let mockStore: MockStoreEnhanced<{}, any>;
    let mockAxios: MockAdapter;

    before(function() {
        mockAxios = new MockAdapter(axios);
    });

    after(function() {
        mockAxios.restore();
    });
    
    describe('User async actions', function() {
        beforeEach(function () {
            mockStore = getStore();
            mockAxios.reset();
            mockAxios.onAny().reply(200, {})
        });
        it('should handle callback and set info ' +
           'on successful post request to /api/v1/user/update/name', function(done) {
                let name : false | string = false;
                mockStore
                    .dispatch(updateName('Adrian', () => name = 'Adrian'))
                    .then(() => {
                        assert.strictEqual(name, 'Adrian');
                        const actions: AnyAction[] = mockStore.getActions();
                        assert.deepStrictEqual(actions, [{
                            type: ADD_INFO,
                            data: 'Name updated'
                        }]);
                        done();
                    }).catch(done);
        });
        it('should set an error on failed post request to /api/v1/user/update/name', function(done) {
            let name : false | string = false;
            mockAxios.reset();
            mockAxios.onPost('/api/v1/user/update/name').reply(500, {error: 'Something went wrong'});
            mockStore
                .dispatch(updateName('Adrian', () => name = 'Adrian'))
                .then(() => {
                    assert.strictEqual(name, false);
                    const actions: AnyAction[] = mockStore.getActions();
                    assert.deepStrictEqual(actions, [{
                        type: ADD_ERROR,
                        data: 'Something went wrong'
                    }]);
                    done();
                }).catch(done);
        });
        it('should handle callback and set info ' +
           'on successful post request to /api/v1/user/update/email', function(done) {
            let email: false | string = false;
            mockStore
                .dispatch(updateEmail('test@test.com', () => email = 'test@test.com'))
                .then(() => {
                    assert.strictEqual(email, 'test@test.com');
                    const actions: AnyAction[] = mockStore.getActions();
                    assert.deepStrictEqual(actions, [{
                        type: ADD_INFO,
                        data: 'Email updated'
                    }]);
                    done();
                })
                .catch(done);
        });
        it('should set an error on failed post request to /api/v1/user/update/email', function(done) {
            let email: false | string = false;
            mockAxios.reset();
            mockAxios.onPost('/api/v1/user/update/email').reply(500, { error: 'Something went wrong' });
            mockStore
                .dispatch(updateEmail('test@test.com', () => email = 'test@test.com'))
                .then(() => {
                    assert.isFalse(email);
                    const actions: AnyAction[] = mockStore.getActions();
                    assert.deepStrictEqual(actions, [{
                        type: ADD_ERROR,
                        data: 'Something went wrong'
                    }]);
                    done();
                })
                .catch(done);
        })
        it('should set info on successful post request to /api/v1/user/update/password', function(done) {
            let updated: boolean = false;
            mockStore.dispatch(updatePassword('a', 'b', () => updated = true))
                .then(() => {
                    assert.isTrue(updated);
                    const actions: AnyAction[] = mockStore.getActions();
                    assert.deepStrictEqual(actions, [{
                        type: ADD_INFO,
                        data: 'Password updated'
                    }]);
                    done();
                })
                .catch(done);
        });
        it('should set an error on failed post request to /api/v1/user/update/password', function(done) {
            let updated: boolean = false;
            mockAxios.reset();
            mockAxios.onPost('/api/v1/user/update/password').reply(500, { error: 'Something went wrong' });
            mockStore.dispatch(updatePassword('a', 'b', () => updated = true))
                .then(() => {
                    assert.isFalse(updated);
                    const actions: AnyAction[] = mockStore.getActions();
                    assert.deepStrictEqual(actions, [{
                        type: ADD_ERROR,
                        data: 'Something went wrong'
                    }]);
                    done();
                })
                .catch(done);
        })
    });
    describe('Channels async actions', function () {
        beforeEach(function () {
            // Retrieve channel messages action checks store to verify that channel
            // with given name already exists
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
        it('should fetch channels and dispatch addChannels with an array of channel names', function(done) {
            let channels: {_id: string, name: string}[] = [
                {_id: '1', name: 'general'},
                {_id: '2', name: 'random'},
                {_id: '3', name: 'something else'}];
            mockAxios.reset();
            mockAxios
                .onGet('/api/v1/channels')
                .reply(200, {channels: channels});
            mockStore
                .dispatch(fetchChannels())
                .then(() => {
                    const actions: AnyAction[] = mockStore.getActions();
                    const addChannelsAction = addChannels(['general', 'random', 'something else']);
                    assert.deepStrictEqual(actions, [addChannelsAction]);
                    done();
                }).catch(done)
        });
        it('should dispatch addError on failed request to /api/v1/channels', function(done) {
            mockAxios.reset();
            mockAxios
                .onGet('/api/v1/channels')
                .reply(500);
            mockStore
                .dispatch(fetchChannels())
                .then(() => {
                    const actions: AnyAction[] = mockStore.getActions();
                    const errorAction = addError('Something went wrong while trying to fetch the channels');
                    assert.deepStrictEqual(actions, [errorAction]);
                    done();
                }).catch(done)
        });
        it('should dispatch an error if retrieving messages with invalid channel name', function(done) {
            mockStore
                .dispatch(retrieveChannelMessages('invalid name'))
                    .then((msg: string) => {
                        assert.strictEqual(msg, 'Retrieve Channel Messages dispatched with incorrect channel name or while already fetching messages');
                        const actions: AnyAction[] = mockStore.getActions();
                        const errorAction = addError('Something went wrong while trying to fetch messages');
                        assert.deepStrictEqual(actions, [errorAction]);
                        done();
                    }).catch(done);
        });
        it('should dispatch an error if already retrieving channel messages', function(done) {
            mockStore
                .dispatch(retrieveChannelMessages('fetching new messages'))
                .then((msg: string) => {
                    assert.strictEqual(msg, 'Retrieve Channel Messages dispatched with incorrect channel name or while already fetching messages');
                    const actions: AnyAction[] = mockStore.getActions();
                    const errorAction = addError('Something went wrong while trying to fetch messages');
                    assert.deepStrictEqual(actions, [errorAction]);
                    done();
                }).catch(done);
        });
        it('should dispatch an error if channel does not have older messages', function(done) {
            mockStore
                .dispatch(retrieveChannelMessages('no more messages'))
                .then((msg: string) => {
                    assert.strictEqual(msg, 'Retrieve Channel Messages dispatched with incorrect channel name or while already fetching messages');
                    const actions: AnyAction[] = mockStore.getActions();
                    const errorAction = addError('Something went wrong while trying to fetch messages');
                    assert.deepStrictEqual(actions, [errorAction]);
                    done();
                }).catch(done);
        });
        it('should dispatch an error on failed get request to /api/v1/messages/', function(done) {
            mockAxios.reset();
            mockAxios
                .onGet()
                .reply(500);
            let channel: string = 'general';
            mockStore
                .dispatch(retrieveChannelMessages(channel))
                .then(() => {
                    const actions: AnyAction[] = mockStore.getActions();
                    const setFetchingTrueAction = setChannelFetchingNewMessages(channel, true);
                    const errorAction = addError('Something went wrong while trying to fetch messages');
                    const setFetchingFalseAction = setChannelFetchingNewMessages(channel, false);
                    assert.deepStrictEqual(actions, [setFetchingTrueAction, errorAction, setFetchingFalseAction]);
                    done();
                }).catch(done);
        });
        it('should set channelHasMoreMessages on response with empty array', function(done) {
            mockAxios.reset();
            mockAxios
                .onGet()
                .reply(200, { messages: []});
            let channel: string = 'general';
            mockStore
                .dispatch(retrieveChannelMessages(channel))
                .then(() => {
                    const actions: AnyAction[] = mockStore.getActions();
                    const setFetchingTrueAction = setChannelFetchingNewMessages(channel, true);
                    const setHasMoreAction = setChannelHasMoreMessages(channel, false);
                    const setFetchingFalseAction = setChannelFetchingNewMessages(channel, false);
                    assert.deepStrictEqual(actions, [setFetchingTrueAction, setHasMoreAction, setFetchingFalseAction]);
                    done();
                }).catch(done);
        });
        it('should increment offset (based on number of received messages) and add retrieved channel messages on successful retreiveChannelMessages action', function(done) {
            let channel: string = 'general';
            let messages: Message[] = [{
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
                .reply(200, { messages: messages});
            mockStore
                .dispatch(retrieveChannelMessages(channel))
                .then(() => {
                    const actions: AnyAction[] = mockStore.getActions();
                    const setFetchingTrueAction = setChannelFetchingNewMessages(channel, true);
                    const incrementOffsetAction = incrementChannelRetrieveMessagesOffset(channel, messages.length);
                    const addMessagesAction = addRetrievedChannelMessages(channel, messages);
                    const setFetchingFalseAction = setChannelFetchingNewMessages(channel, false);
                    assert.deepStrictEqual(actions, [
                        setFetchingTrueAction,
                        incrementOffsetAction,
                        addMessagesAction,
                        setFetchingFalseAction]);
                    done();
                }).catch(done);
        });
        it('should dispatch info on successfully deleting channel', function(done) {
            let channels: { _id: string, name: string }[] = [
                { _id: '1', name: 'general' },
                { _id: '2', name: 'random' },
                { _id: '3', name: 'something else' }];
            mockAxios.reset();
            mockAxios
                .onGet('/api/v1/channels')
                .reply(200, { channels: channels });
            mockAxios
                .onGet()
                .reply(200);
            mockStore
                .dispatch(deleteChannel('general'))
                .then(() => {
                    const actions: AnyAction[] = mockStore.getActions();
                    const addInfoAction = addInfo('Channel deleted');
                    const addChannelsAction = addChannels(['general', 'random', 'something else']);
                    assert.deepStrictEqual(actions, [addInfoAction, addChannelsAction]);
                    done();
                }).catch(done);
        });
        it('should dispatch an error on failed attempt to delete channel', function(done) {
            mockAxios.reset();
            mockAxios
                .onGet()
                .reply(500, {error: 'Something went wrong'});
            mockStore
                .dispatch(deleteChannel('general'))
                .then(() => {
                    const actions: AnyAction[] = mockStore.getActions();
                    const addErrorAction = addError('Something went wrong');
                    assert.deepStrictEqual(actions, [addErrorAction]);
                    done();
                }).catch(done);
        })
        it('should dispatch info on creating new channel', function(done) {
            let channels: { _id: string, name: string }[] = [
                { _id: '1', name: 'general' },
                { _id: '2', name: 'random' },
                { _id: '3', name: 'something else' }];
            mockAxios.reset();
            mockAxios
                .onGet('/api/v1/channels')
                .reply(200, { channels: channels });
            mockAxios
                .onPost()
                .reply(200);
            mockStore
                .dispatch(addChannel('new channel'))
                .then(() => {
                    const actions: AnyAction[] = mockStore.getActions();
                    const addInfoAction = addInfo('Channel created');
                    const addChannelsAction = addChannels(['general', 'random', 'something else']);
                    assert.deepStrictEqual(actions, [addInfoAction, addChannelsAction]);
                    done();
                }).catch(done);
        });
        it('should dispatch an error on failed attempt to create a new channel', function(done) {
            mockAxios.reset();
            mockAxios
                .onAny()
                .reply(500, {error: 'Something went wrong'});
            mockStore
                .dispatch(addChannel('new channel'))
                .then(() => {
                    const actions: AnyAction[] = mockStore.getActions();
                    const addErrorAction = addError('Something went wrong');
                    assert.deepStrictEqual(actions, [addErrorAction]);
                    done();
                }).catch(done);
        })
    });
    describe('Socket async actions', function () {
        beforeEach(function () {
            mockStore = getStore();
        });
        it('should initialize websocket connection', function() {
            mockStore.dispatch(initWebsocketConnection());
            const actions: AnyAction[] = mockStore.getActions();
            assert.strictEqual(actions[0].type, INIT_WEBSOCKET);
            // need to close connection so program will exit after tests run
            actions[0].data.io.close();
        });
    });
    describe('Chat Users async actions', function () {
        beforeEach(function () {
            mockStore = getStore();
        });
        it('should dipatch updateUsers on fetch all users', function(done) {
            let usersResponse = [{
                email: 'test@test.com',
                role: 'admin',
                name: 'test'
            }, {
                email: 'test2@test.com',
                role: 'general',
                name: 'test'
            }];
            let users: ChatUsersState = {};
            usersResponse.forEach((u) => {
                users[u.email] = {
                    name: u.name,
                    role: u.role
                };
            })
            mockAxios.reset();
            mockAxios.onAny().reply(200, { users: usersResponse});
            mockStore
                .dispatch(fetchAllUsers())
                .then(() => {
                    const actions: AnyAction[] = mockStore.getActions();
                    const updateUsersAction = updateUsers(users);
                    assert.deepStrictEqual(actions, [updateUsersAction]);
                    done();
                }).catch(done);
        });
        it('should dispatch addError on failed attempt to fetch users', function(done) {
            mockAxios.reset();
            mockAxios.onAny().reply(500);
            mockStore
                .dispatch(fetchAllUsers())
                .then(() => {
                    const actions: AnyAction[] = mockStore.getActions();
                    const addErrorAction = addError('Fetching all users failed');
                    assert.deepStrictEqual(actions, [addErrorAction]);
                    done();
                }).catch(done);
        })
        it('should create a new user');
        it('should edit the user');
        it('should delete the user');
    });
})