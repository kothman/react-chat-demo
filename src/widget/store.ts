import { createStore, combineReducers, applyMiddleware, Reducer } from 'redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import userReducer from './reducers/userReducer';
import widgetReducer from './reducers/widgetReducer';

const rootReducer: Reducer = combineReducers({
    user: userReducer,
    widget: widgetReducer
});

export default createStore(
    rootReducer,
    applyMiddleware(reduxThunk, createLogger())
);