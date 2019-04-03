import { Action } from "redux";

import {OPEN_WIDGET, CLOSE_WIDGET} from '../actions/widgetActions';

export interface State {
    open: boolean
}
let initialState: State = {
    open: false
}

export default function (state: State = initialState, action: Action) {
    switch(action.type) {
        case OPEN_WIDGET:
            return Object.assign({}, state, {open: true});
        case CLOSE_WIDGET:
            return Object.assign({}, state, {open: false});
        default:
            return state;
    }
}