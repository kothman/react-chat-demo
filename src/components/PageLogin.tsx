import * as React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

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
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <h3 className="title">Login</h3>

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
            this.props.dispatch({type: 'CLEAR_ERRORS'});
            this.props.dispatch({ type: 'SET_EMAIL', data: res.data.email });
            // do this last since it will redirect page
            this.props.dispatch({ type: 'SET_AUTHORIZED', data: true });
        }).catch((err) => {
            this.props.dispatch({type: 'ADD_ERROR', data: err.response.data.error});
        });
    }
}

export default connect()(PageLogin);