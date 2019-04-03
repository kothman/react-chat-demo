import * as React from 'react';
import {connect} from 'react-redux';

import WidgetOpen from './WidgetOpen';
import WidgetClosed from './WidgetClosed';

import {openWidget} from '../actions/widgetActions';

interface Props {
    openWidget: any,
    open: boolean
}


class App extends React.Component<Props, any> {
    render() {
        return (
            <div id="react-app">
            {this.props.open ?
                <WidgetOpen /> :
                <WidgetClosed onClick={() => this.props.openWidget()} />
            }
            </div>
        )
    }
}

export default connect((state: any) => ({open: state.widget.open}),
(dispatch: any) => {
    return {
        openWidget: () => dispatch(openWidget()),
    };
})(App);