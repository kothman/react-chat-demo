import * as React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

interface State {
    email: string,
    password: string,
    error: string | boolean
}

class PageLogin extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: false
        };
    }
    render() {
        return (
            <div className="page-login">
                { this.state.error ? <div className="notification">{this.state.error}</div> : '' }
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="input-group">
                        <label htmlFor="email">email</label>
                        <input type="email" id="email" value={this.state.email} onChange={(e) => { this.setState({email: e.currentTarget.value}); }} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">password</label>
                        <input type="password" id="password" value={this.state.password} onChange={(e) => { this.setState({password: e.currentTarget.value }); }} />
                    </div>
                    <button type="submit">login</button>
                </form>
            </div>
        );
    }

    handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        axios.post('/api/v1/login', {
            email: this.state.email,
            password: this.state.password
        }).then((res) => {
            console.log(res);
            this.props.dispatch({ type: 'SET_EMAIL', data: res.data.email });
            this.props.dispatch({ type: 'SET_AUTHORIZED', data: true });
        }).catch((res) => {
            console.log(res);
            // @todo set error
        });
    }
}

export default connect()(PageLogin);