export const OPEN_WIDGET = 'OPEN_WIDGET';
export const CLOSE_WIDGET = 'CLOSE_WIDGET';

export const openWidget = () => {
    return {
        type: OPEN_WIDGET
    };
}

export const closeWidget = () => {
    return {
        type: CLOSE_WIDGET
    };
}