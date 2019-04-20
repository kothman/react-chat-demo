import * as React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import {addError, clearErrors} from '../actions/notificationsActions';
import {setUser, setJwt} from '../actions/userActions';
import {State as UserState} from '../reducers/user';

interface State {
    email: string,
    password: string,
}

class PageLogin extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }
    render() {
        return (
            <div className="page-login">
                <form onSubmit={this.handleSubmit.bind(this)} className="">
                    <h4>Login</h4>
                    <fieldset>
                        <label htmlFor="email">email</label>
                        <input type="email" id="email" value={this.state.email} onChange={(e) => { this.setState({email: e.currentTarget.value}); }} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="password">password</label>
                        <input type="password" id="password" value={this.state.password} onChange={(e) => { this.setState({password: e.currentTarget.value }); }} />
                    </fieldset>
                    <button type="submit" className="pure-button button-large">login</button>
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
            this.props.clearErrors();
            this.props.setJwt(res.headers['x-access-token']);
            this.props.setUser({
                authorized: true,
                email: res.data.email,
                name: res.data.name || '',
                role: res.data.role
            })
        }).catch((err) => {
            this.props.addError(err.response.data.error);
        });
    }
}

export default connect(null, (dispatch) => {
    return {
        clearErrors: () => dispatch(clearErrors()),
        addError: (err: string) => dispatch(addError(err)),
        setUser: (user: UserState) => dispatch(setUser(user)),
        setJwt: (token: string) => dispatch(setJwt(token)),
    };
})(PageLogin);