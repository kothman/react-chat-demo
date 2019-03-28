import {createStore, combineReducers} from 'redux';

import userReducer from './reducers/user';

export default createStore(combineReducers({user: userReducer}));