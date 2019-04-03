import * as React from 'react';

interface Props {
    onClick: any
}

class WidgetClosed extends React.Component<Props, any> {
    componentDidMount = () => {
        console.log(window.xprops);
        console.log(window);
        window.xprops.addClass('#kothman-react-chat-widget-container','widget-closed');
    }
    render() {
        return <div id="widget-closed" onClick={this.props.onClick}>
            <i className="material-icons">chat_bubble_outline</i>
        </div>
    }
}

export default WidgetClosed;