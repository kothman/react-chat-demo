import * as React from 'react';
import {connect} from 'react-redux';
import { string } from 'prop-types';

interface State {
    user: {
        email: string
    }
}

class PageSettings extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            user: {
                email: this.props.user.email
            }
        };
    }
    handleUpdateEmail = (e: React.FormEvent) => {
        e.preventDefault();
    }
    render() {
        return <div className="page-settings">
            <div className="container">
                <h3 className="title">Settings</h3>
                <div className="settings-group">
                    <div className="subtitle">Account</div>
                    <div>
                        <form onSubmit={this.handleUpdateEmail}>
                            <div className="input-group">
                                <label htmlFor="email">email</label>
                                <input type="email" id="emal" value={this.state.user.email}
                                       onChange={(e) => {this.setState({user: {email: e.currentTarget.value }})}} />
                                <button type="submit">update email</button>
                            </div>
                        </form>
                        <form>
                            <div>password</div>
                        </form>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default connect(props => props)(PageSettings);