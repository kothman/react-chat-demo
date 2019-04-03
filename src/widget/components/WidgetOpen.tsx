import * as React from 'react';
import {connect} from 'react-redux';

import {closeWidget} from '../actions/widgetActions';
declare global {
    interface Window { xprops: any }
}
interface Props {
    closeWidget: Function
}

class WidgetOpen extends React.Component<Props, any> {
    componentDidMount = () => {
        console.log(window.xprops);
        console.log(window);
        window.xprops.removeClass('#kothman-react-chat-widget-container', 'widget-closed');
    }
    render() {
        return <div id="widget-open">
            <div className="row header-row">
                <div className="title">Conversations</div>
                <i className="material-icons close-widget" onClick={() => this.props.closeWidget()}>close</i>
            </div>
        </div>
    }
}

export default connect(null, (dispatch: any) => {
    return {
        closeWidget: () => dispatch(closeWidget())
    };
})(WidgetOpen);