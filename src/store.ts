import {createStore, combineReducers, applyMiddleware, Reducer} from 'redux';
import reduxThunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

import userReducer, {State as UserState} from './reducers/user';
import channelsReducer, {State as ChannelsState} from './reducers/channels';
import notificationsReducer, {State as NotificationsState} from './reducers/notifications';
import sidebarReducer, {State as SidebarState} from './reducers/sidebar';
import socketReducer, {State as SocketState} from './reducers/socket';
import chatUsersReducer, {State as ChatUsersState} from './reducers/chatUsers';

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

export default createStore(
    rootReducer,
    applyMiddleware(reduxThunk, createLogger())
);