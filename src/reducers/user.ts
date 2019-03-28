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

let Actions = {
    SET_AUTHORIZED: 'SET_AUTHORIZED',
    SET_EMAIL: 'SET_EMAIL'
}

export default function(state: State = initialState, action: Action) {
    switch (action.type) {
        case Actions.SET_AUTHORIZED:
            if (typeof action.data !== 'boolean') {
                console.error('Data must be boolean for SET_AUTHORIZED action');
                return state;
            }
            if (action.data === false)
                return Object.assign({}, state, {authorized: false, email: false});
            return Object.assign({}, state, {authorized: action.data});
        case Actions.SET_EMAIL:
            return Object.assign({}, state, {email: action.data});
        default:
            return state;
    }
}