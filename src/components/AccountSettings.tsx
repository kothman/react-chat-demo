import * as React from 'react';
import { connect } from 'react-redux';

import { updateName } from '../actions/userActions';

interface State {
    user: {
        email: string,
        name: string
    }
}

class AccountSettings extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            user: {
                email: props.user.email,
                name: props.user.name
            }
        }
    }
    handleUpdateEmail = (e: React.FormEvent) => {
        e.preventDefault();
    }
    handleUpdateName = (e: React.FormEvent) => {
        e.preventDefault();
    }
    render() {
        return <div className="account-settings">
            <div className="settings-group">
                <div className="subtitle">Name</div>
                <form onSubmit={this.handleUpdateName}>
                    <div className="input-group">
                        <input type="user-name" value={this.state.user.name} placeholder="Jane Doe"
                            onChange={(e) => {
                                this.setState({ user: {email: this.state.user.email, name: e.target.value }});
                            }}/>
                        <button type="submit">update name</button>
                    </div>
                </form>
            </div>
            <div className="settings-group">
                <div className="subtitle">Email</div>
                <form onSubmit={this.handleUpdateEmail}>
                    <div className="input-group">
                        <input type="email" value={this.state.user.email}
                            onChange={(e) => {
                                this.setState({ user: { email: e.target.value, name: this.state.user.name } });
                            }} />
                        <button type="submit">update email</button>
                    </div>
                </form>
            </div>
            <div className="settings-group">
                <div className="subtitle">Change Password</div>
                <form>
                    <div className="input-group">
                        <label>current password</label>
                        <input type="password"/>
                    </div>
                    <div className="input-group">
                        <label>new password</label>
                        <input type="password" />
                    </div>
                    <div className="input-group">
                        <label>confirm new password</label>
                        <input type="password" />
                    </div>
                    <div className="input-group">
                        <span></span>
                        <button type="submit">update password</button>
                    </div>
                </form>
            </div>
        </div>;
    }
}

export default connect((props: any) => {
    return {
        user: props.user,
    };
}, (dispatch: any) => {
    return {
        updateName: (name: string) => {
            return dispatch(updateName(name));
        }
    };
})(AccountSettings);