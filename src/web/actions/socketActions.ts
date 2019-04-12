import * as io from 'socket.io-client';
import { Dispatch } from 'redux';

export const INIT_WEBSOCKET = 'INIT_WEBSOCKET';
export const SET_SOCKET_CONNECTED = 'SET_SOCKET_CONNECTED';
export const SET_SOCKET_CONNECTED_USERS = 'SET_SOCKET_CONNECTED_USERS';

export const initWebsocket = (io: SocketIOClient.Socket) => {
    return {
        type: INIT_WEBSOCKET,
        data: { io: io }
    };
}

export const setSocketConnected = (connected: boolean) => {
    return {
        type: SET_SOCKET_CONNECTED,
        data: { connected: connected }
    }
}

export const setSocketConnectedUsers = (userEmails: string[]) => {
    return {
        type: SET_SOCKET_CONNECTED_USERS,
        data: { userEmails: userEmails }
    }
}

export const init = () => {
    return (dispatch: Dispatch) => {
        let ioSocket: SocketIOClient.Socket = io();
        ioSocket.on('connect', () => {
            dispatch(setSocketConnected(true));
            console.log('Connected to websocket server [' + ioSocket.id + ']');
        });
        ioSocket.on('disconnect', () => {
            dispatch(setSocketConnected(false));
            console.log('Disconnected from websocket server, attempting reconnect');
        });
        ioSocket.on('connected users', (userEmails: string[]) => {
            dispatch(setSocketConnectedUsers(userEmails));
        })
        return dispatch(initWebsocket(ioSocket));
    }
}