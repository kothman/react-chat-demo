import {createStore, combineReducers, applyMiddleware, Reducer, StoreEnhancer} from 'redux';
import reduxThunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

import userReducer, {State as UserState} from './reducers/user';
import channelsReducer, {State as ChannelsState} from './reducers/channels';
import notificationsReducer, {State as NotificationsState} from './reducers/notifications';
import sidebarReducer, {State as SidebarState} from './reducers/sidebar';
import socketReducer, {State as SocketState} from './reducers/socket';
import chatUsersReducer, {State as ChatUsersState} from './reducers/chatUsers';

const env = require('../../env');

export interface State {
    user: UserState,
    channels: ChannelsState,
    notifications: NotificationsState,
    sidebar: SidebarState,
    socket: SocketState,
    chatUsers: ChatUsersState,
}

const rootReducer: Reducer = combineReducers({
    user: userReducer,
    channels: channelsReducer,
    notifications: notificationsReducer,
    sidebar: sidebarReducer,
    socket: socketReducer,
    chatUsers: chatUsersReducer,
});

const middleware: StoreEnhancer =
    env.production || env.disableReduxLogging ?
    applyMiddleware(reduxThunk) : applyMiddleware(reduxThunk, createLogger());

export default createStore(rootReducer, middleware);