import {SET_AUTHORIZED, SET_USER, LOGOUT_USER, SET_JWT} from '../actions/userActions';

export interface State {
    authorized?: boolean,
    email?: string | boolean,
    name?: string | boolean,
    role?: string | boolean,
    jwt?: string | boolean,
}

interface Action {
    type: string,
    data: any
}

let initialState : State = {
    authorized: false,
    email: false,
    name: false,
    role: false,
    jwt: false,
}


export default function(state: State = initialState, action: Action) {
    switch (action.type) {
        case SET_AUTHORIZED:
            if (typeof action.data !== 'boolean') {
                console.error('Data must be boolean for SET_AUTHORIZED action');
                return state;
            }
            if (action.data === false)
                return Object.assign({}, state, {authorized: false, email: false});
            return Object.assign({}, state, {authorized: action.data});
        case SET_USER:
            return Object.assign({}, state, action.data);
        case LOGOUT_USER:
            return {
                authorized: false,
                name: false,
                email: false,
                role: false
            }
        case SET_JWT:
            return Object.assign({}, state, {token: action.data});
        default:
            return state;
    }
}