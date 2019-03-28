import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Navbar extends React.Component<any, any> {
    navLinks = {
        authorized: [
            {text: 'Dashboard', to: '/'},
            {text: 'Logout', to: '/logout'}
        ],
        unauthorized: [
            {text: 'Login', to: '/login'},
            {text: 'Register', to: '/register'}
        ]
    }
    constructor(props: any) {
        super(props);
    }
    render() {
        let nav: any[] = [];
        if (this.props.user.authorized) {
            this.navLinks.authorized.forEach((e) => {
                nav.push(<Link to={e.to} className="navbar-item" key={e.text}>{e.text}</Link>)
            });
        } else {
            this.navLinks.unauthorized.forEach((e) => {
                nav.push(<Link to={e.to} className="navbar-item" key={e.text}>{e.text}</Link>)
            });
        }
        return (
        <nav className="navbar">
                <Link to="/" className="navbar-brand">React Chat</Link>
            <div className="navbar-nav">
                {nav}
            </div>
        </nav>
        );
    }
}

export default connect(state => state)(Navbar);