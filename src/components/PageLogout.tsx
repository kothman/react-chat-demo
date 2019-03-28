import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import {connect} from 'react-redux';
import Axios from 'axios';

class PageLogout extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        Axios.get('/api/v1/logout').then((response) => {
            this.props.dispatch({ type: 'SET_EMAIL', data: false });
            this.props.dispatch({ type: 'SET_AUTHORIZED', data: false });
        });
    }
    render() {
        return (
            <div></div>
        );
    }
}

export default connect()(PageLogout);