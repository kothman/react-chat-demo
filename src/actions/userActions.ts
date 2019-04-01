export const SET_AUTHORIZED = 'SET_AUTHORIZED';
export const SET_EMAIL = 'SET_EMAIL';
export const  SET_NAME = 'SET_NAME';

export const setAuthorized = (authorized: boolean) => {
    return  {
        type: SET_AUTHORIZED,
        data: authorized
    };
}

export const setEmail = (email: string) => {
    return {
        type: SET_EMAIL,
        data: email
    };
}

export const setName = (name: string) => {
    return {
        type: SET_NAME,
        data: name
    }
}