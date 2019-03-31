import {createStore, combineReducers, applyMiddleware, Reducer} from 'redux';
import reduxThunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

import userReducer from './reducers/user';
import channelsReducer from './reducers/channels';
import notificationsReducer from './reducers/notifications';

const rootReducer: Reducer = combineReducers({
    user: userReducer,
    channels: channelsReducer,
    notifications: notificationsReducer
});

export default createStore(
    rootReducer,
    applyMiddleware(reduxThunk, createLogger())
);