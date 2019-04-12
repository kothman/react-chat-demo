import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as React from 'react';

import { State as StoreState } from '../store';

class Page404 extends React.Component<any, any> {
    render() {
        return (
            this.props.authorized ?
                <Redirect push to="/dashboard" /> :
                <Redirect push to="/login" />
        );
    }
}

export default connect((state: StoreState ) => ({
    authorized: state.user.authorized
}))(Page404);