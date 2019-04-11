import {AnyAction} from 'redux';
import {UPDATE_CHAT_USERS, ADD_CHAT_USER, REMOVE_CHAT_USER}
    from '../actions/chatUsersActions';

export interface State {
    [email: string]: {
        role: string,
        name: string,
    }
}

export interface ChatUser {
    email: string,
    role: string,
    name: string,
}

let initialState: State = {
    
}

export default function(state: State = initialState, action: AnyAction) {
    switch(action.type) {
        case UPDATE_CHAT_USERS:
            return action.data.users;
        case ADD_CHAT_USER:
            return Object.assign({}, state, {
                [action.data.user.email]: {
                    role: action.data.user.role,
                    name: action.data.user.name,
                }
            });
        case REMOVE_CHAT_USER:
            let clone: State = Object.assign({}, state);
            delete clone[action.data.email]
        default:
            return state;
    }
}