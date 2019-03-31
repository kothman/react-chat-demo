import {ADD_ERROR, REMOVE_ERROR, CLEAR_ERRORS, ADD_INFO, REMOVE_INFO, CLEAR_INFOS}
    from '../actions/notificationsActions';

export interface State {
    errors: string[],
    infos: string[],
}
interface Action {
    type: string,
    data: any
}

let initialState: State = {
    errors: [],
    infos: []
}

export default function(state: State = initialState, action: Action) {
    switch(action.type) {
        case ADD_ERROR:
            return Object.assign({}, state, {errors: state.errors.concat([action.data])});
        case REMOVE_ERROR:
            let newErrorsArray = state.errors.slice();
            newErrorsArray.splice(action.data, 1);
            return Object.assign({}, state, {errors: newErrorsArray});
        case CLEAR_ERRORS:
            return Object.assign({}, state,  {errors: []});
        case ADD_INFO:
            return Object.assign({}, state, {infos: state.infos.concat([action.data])});
        case REMOVE_INFO:
            let newInfosArray = state.infos.slice();
            newInfosArray.splice(action.data, 1);
            return Object.assign({}, state, { infos: newInfosArray });
        case CLEAR_INFOS:
            return Object.assign({}, state, {infos: []});
        default:
            return state;
    }
}