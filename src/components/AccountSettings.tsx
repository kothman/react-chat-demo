import * as React from 'react';
import { connect } from 'react-redux';

interface State {
    user: {
        email: string
    }
}

class AccountSettings extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            user: {email: props.user.email}
        }
    }
    handleUpdateEmail = (e: React.FormEvent) => {
        e.preventDefault();
    }
    render() {
        return <div className="account-settings">
            <div className="settings-group">
                <div className="subtitle">Change Email</div>
                <div>
                    <form onSubmit={this.handleUpdateEmail}>
                        <div className="input-group">
                            <label htmlFor="email">email</label>
                            <input type="email" id="emal" value={this.state.user.email}
                                onChange={(e) => { this.setState({ user: { email: e.currentTarget.value } }) }} />
                            <button type="submit">update email</button>
                        </div>
                    </form>
                    <form>
                        <div>password</div>
                    </form>
                </div>
            </div>
        </div>;
    }
}

export default connect(props => props)(AccountSettings);