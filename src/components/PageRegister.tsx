import * as React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

interface State {
    email: string,
    password: string,
    confirmPassword: string,
    error: string | boolean
}
class PageRegister extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            error: false
        };
    }
    render() {
        return (
            <div className="page-login">
                {this.state.error ? <div className="notification">{this.state.error}</div> : ''}
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <h3 className="title">Register</h3>
                    <div className="input-group">
                        <label htmlFor="email">email</label>
                        <input type="email" id="email" value={this.state.email} onChange={(e) => { this.setState({ email: e.currentTarget.value }); }} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">password</label>
                        <input type="password" id="password" value={this.state.password} onChange={(e) => { this.setState({ password: e.currentTarget.value }); }} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirm-password">confirm password</label>
                        <input type="password" id="confirm-password" value={this.state.confirmPassword} onChange={(e) => { this.setState({ confirmPassword: e.currentTarget.value }); }} />
                    </div>
                    <button type="submit">register</button>
                </form>
            </div>
        );
    }

    handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (this.state.password !== this.state.confirmPassword)
            return this.setState({error: 'Passwords do not match'});
        axios.post('/api/v1/register', {
            email: this.state.email,
            password: this.state.password
        }).then((res) => {
            this.setState({ error: null });
            this.props.dispatch({ type: 'SET_EMAIL', data: res.data.email });
            this.props.dispatch({ type: 'SET_AUTHORIZED', data: true });
            return res;
        }).catch((err) => {
            this.setState({ error: err.response.data.error });
        });
    }
}

export default connect()(PageRegister);