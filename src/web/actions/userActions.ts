import axios, { AxiosResponse, AxiosError } from 'axios';
import {State as UserState} from '../reducers/user';
import {clearChannelsData} from './channelsActions';
import {addError, addInfo} from './notificationsActions';

export const SET_AUTHORIZED = 'SET_AUTHORIZED';
export const SET_USER = 'SET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_JWT = 'SET_JWT';

export const setAuthorized = (authorized: boolean) => {
    return  {
        type: SET_AUTHORIZED,
        data: authorized
    };
}

export const setUser = (user: UserState) => {
    return {
        type: SET_USER,
        data: user
    };
}

export const logoutUser = () => {
    return {
        type: LOGOUT_USER
    };
}

export const setJwt = (token: string) => {
    return {
        type: SET_JWT,
        data: token
    };
}

export const logout = () => {
    return (dispatch: any) => {
        dispatch(logoutUser());
        return dispatch(clearChannelsData());
    }
    
}

/* Async Actions */
export const updateName = (name: string, onSuccess?: Function) => {
    return (dispatch: any) => {
        return axios.post('/api/v1/user/update/name', {
            name: name
        }).then((res: AxiosResponse) => {
            dispatch(addInfo('Name updated'));
            if (onSuccess) onSuccess();
        }).catch((err: AxiosError) => {
            if (err.response && err.response.data.error)
                return dispatch(addError(err.response.data.error));
            console.log('Something went wrong updating user name', err);
            dispatch(addError('Something went wrong while trying to update your name.'));
        });
    };
}

export const updateEmail = (email: string, onSuccess?: Function) => {
    return (dispatch: any) => {
        return axios.post('/api/v1/user/update/email', {
            email: email
        }).then((res: AxiosResponse) => {
            dispatch(addInfo('Email updated'));
            if (onSuccess) onSuccess();
        }).catch((err: AxiosError) => {
            if (err.response && err.response.data.error)
                return dispatch(addError(err.response.data.error));
            console.log('Something went wrong updating user email', err);
            dispatch(addError('Something went wrong while trying to update your email.'));
        });
    };
}

export const updatePassword = (oldPass: string, newPass: string, onSuccess?: Function) => {
    return (dispatch: any) => {
        return axios.post('/api/v1/user/update/password', {
            oldPass: oldPass,
            newPass: newPass
        }).then((res: AxiosResponse) => {
            dispatch(addInfo('Password updated'));
            if (onSuccess) onSuccess();
        }).catch((err: AxiosError) => {
            if (err.response && err.response.data.error)
                return dispatch(addError(err.response.data.error));
            console.log('Something went wrong updating user password', err);
            dispatch(addError('Something went wrong while trying to update your password.'));
        });
    };
}