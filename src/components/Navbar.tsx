import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { toggleSidebarOpen } from '../actions/sidebarActions';
import { State as StoreState } from '../store';

class Navbar extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }
    render() {
        let nav: any[] = [];
        return (
        <nav className="navbar">
            <div className="navbar-container">
                {this.props.loggedIn ?
                    <div className="hamburger" onClick={() => this.props.toggle()}><i className="material-icons">dehaze</i></div> :
                    <div></div>
                }
                <Link to="/" className="navbar-brand">OpenChat</Link>
                <div></div>
            </div>
        </nav>
        );
    }
}

export default connect((state: StoreState) => {
    return {
        loggedIn: state.user.authorized
    }
}, (dispatch: Dispatch) => {
    return {
        toggle: () => dispatch(toggleSidebarOpen())
    }
})(Navbar);