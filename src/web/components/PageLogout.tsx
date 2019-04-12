import * as React from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';

import {logout} from '../actions/userActions';

class PageLogout extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        Axios.get('/api/v1/logout').then((response) => {
            this.props.logout();
        });
    }
    render() {
        return (
            <div></div>
        );
    }
}

export default connect(null, (dispatch: any) => {
    return {
        logout: () => dispatch(logout())
    };
})(PageLogout);