export const ADD_ERROR = 'ADD_ERROR';
export const REMOVE_ERROR = 'REMOVE_ERROR';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const ADD_INFO = 'ADD_INFO';
export const REMOVE_INFO = 'REMOVE_INFO';
export const CLEAR_INFOS = 'CLEAR_INFOS';

export const addError = (error: string) => {
    return {
        type: ADD_ERROR,
        data: error
    };
}

export const removeError = (i: number) => {
    return {
        type: REMOVE_ERROR,
        data: i
    };
}

export const clearErrors = () => {
    return { type: CLEAR_ERRORS };
}

export const addInfo = (info: string) => {
    return {
        type: ADD_INFO,
        data: info
    };
}

export const removeInfo = (i: number) => {
    return {
        type: REMOVE_INFO,
        data: i
    };
}

export const clearInfos = () => {
    return {
        type: CLEAR_INFOS
    };
}
