import * as React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { addError, addInfo, clearErrors } from '../actions/notificationsActions';

interface State {
    email: string,
    password: string,
    confirmPassword: string,
    redirectToLogin: boolean,
}

class PageRegister extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            redirectToLogin: false,
        };
    }
    render() {
        return (
            <div className="page-login">
                { this.state.redirectToLogin ? <Redirect to="/login" /> : <div></div> }
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <h3 className="title">Register</h3>
                    <fieldset>
                        <label htmlFor="email">email</label>
                        <input type="email" id="email" value={this.state.email} onChange={(e) => { this.setState({ email: e.currentTarget.value }); }} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="password">password</label>
                        <input type="password" id="password" value={this.state.password} onChange={(e) => { this.setState({ password: e.currentTarget.value }); }} />

                    </fieldset>
                    <fieldset>
                        <label htmlFor="confirm-password">confirm password</label>
                        <input type="password" id="confirm-password" value={this.state.confirmPassword} onChange={(e) => { this.setState({ confirmPassword: e.currentTarget.value }); }} />
                    </fieldset>
                    <button type="submit">register</button>
                </form>
            </div>
        );
    }

    handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (this.state.password !== this.state.confirmPassword)
            return this.props.addError('Passwords do not match');
        axios.post('/api/v1/register', {
            email: this.state.email,
            password: this.state.password
        }).then((res) => {
            this.props.clearErrors();
            this.props.addInfo('Account created, please login.');
            this.setState({redirectToLogin: true});
            return res;
        }).catch((err) => {
            this.props.addError(err.response.data.error);
        });
    }
}

export default connect(null, (dispatch) => {
    return {
        addError: (err: string) => dispatch(addError(err)),
        addInfo: (info: string) => dispatch(addInfo(info)),
        clearErrors: () => dispatch(clearErrors()),

    };
})(PageRegister);