import axios, { AxiosError, AxiosResponse } from 'axios';

import {State, ChatUser} from '../reducers/chatUsers';
import { Dispatch } from 'redux';
import { addError } from './notificationsActions';

export const UPDATE_CHAT_USERS = 'UPDATE_CHAT_USERS';
export const ADD_CHAT_USER = 'ADD_USER';
export const REMOVE_CHAT_USER = 'REMOVE_USER';

export const updateUsers = function(users: State) {
    return {
        type: UPDATE_CHAT_USERS,
        data: {
            users: users
        }
    }
}

export const addUser = function(user: ChatUser) {
    return {
        type: ADD_CHAT_USER,
        data: {
            user: user
        }
    }
}

export const removeUser = function(email: string) {
    return {
        type: REMOVE_CHAT_USER,
        data: {
            email: email
        }
    }
}

/* Async Functions */
export const fetchAllUsers = () => {
    return (dispatch: Dispatch) => {
        axios.get('/api/v1/users').then((res: AxiosResponse) => {
            let users: State = {};
            res.data.users.forEach((u: ChatUser) => {
                users[u.email] = {
                    role: u.role,
                    name: u.name
                };
            });
            dispatch(updateUsers(users));
            return res;
        }).catch((err: AxiosError) => {
            dispatch(addError('Fetching all users failed'));
            console.log(err);
            return err;
        });
    }
}

export const createNewUser = (user: ChatUser) => {

}

export const editUser = (email: string, user: ChatUser) => {

}

export const deleteUser = (email: string) => {

}