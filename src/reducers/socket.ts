import { AnyAction } from "redux";
import * as io from 'socket.io-client';

import { INIT_WEBSOCKET,
         SET_SOCKET_CONNECTED,
         SET_SOCKET_CONNECTED_USERS }
    from '../actions/socketActions';

export interface State {
    io: SocketIOClient.Socket | null,
    connected: boolean,
    connectedUserEmails: string[]
}

let initialState: State = {
    io: null,
    connected: false,
    connectedUserEmails: []
}

export default function(state: State = initialState, action: AnyAction) {
    switch(action.type) {
        case INIT_WEBSOCKET:
            return Object.assign({}, state, {io: action.data.io});
        case SET_SOCKET_CONNECTED:
            return Object.assign({}, state, {connected: action.data.connected});
        case SET_SOCKET_CONNECTED_USERS:
            return Object.assign({}, state, {connectedUserEmails: action.data.userEmails })
        default:
            return state;
    }
}