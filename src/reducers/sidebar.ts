import { Action } from "redux";
import { TOGGLE_SIDEBAR_OPEN } from '../actions/sidebarActions';

export interface State {
    open: boolean
}

let initialState: State = {
    open: true
}

export default function(state: State = initialState, action: Action) {
    switch (action.type) {
        case TOGGLE_SIDEBAR_OPEN:
            return Object.assign({}, state, {open: !state.open});
        default:
            return state;
    }
}