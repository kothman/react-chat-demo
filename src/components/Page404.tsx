import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as React from 'react';

class Page404 extends React.Component<any, any> {
    render() {
        return (
            this.props.user.authorized ?
                <Redirect to="/dashboard" /> :
                <Redirect to="/login" />
        );
    }
}

export default connect(state => state)(Page404);