import * as React from 'react';
import {Redirect} from 'react-router-dom';

interface Props {
    onComponentDidMount?: Function
}

class Settings404 extends React.Component<Props, any> {
    componentDidMount = () => {
        if(this.props.onComponentDidMount)
            this.props.onComponentDidMount();
    }
    render() {
        return <Redirect to="/settings/account" />;
    }
} 

export default Settings404;