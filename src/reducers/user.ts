import {SET_AUTHORIZED, SET_EMAIL, SET_NAME} from '../actions/userActions';

interface State {
    authorized: boolean,
    email: string | boolean
}
interface Action {
    type: string,
    data: any
}

let initialState : State = {
    authorized: false,
    email: false
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
        case SET_EMAIL:
            return Object.assign({}, state, {email: action.data});
        case SET_NAME:
            return Object.assign({}, state, {name: action.data});
        default:
            return state;
    }
}