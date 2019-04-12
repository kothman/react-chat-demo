import * as React from 'react';
import { connect } from 'react-redux';

import { updateName, updateEmail, updatePassword, setUser } from '../actions/userActions';
import { addError, addInfo, clearErrors } from '../actions/notificationsActions';
import { State as UserState } from '../reducers/user';

interface State {
    user: {
        email: string,
        name: string
    },

    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string,
    updatingPassword: boolean,
    updatingName: boolean,
    updatingEmail: boolean,
}

class AccountSettings extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            user: {
                email: props.user.email,
                name: props.user.name
            },
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            updatingPassword: false,
            updatingName: false,
            updatingEmail: false,
        }
    }
    handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ user: { email: e.target.value, name: this.state.user.name} });
    }
    handleUpdateEmail = (e: React.FormEvent) => {
        e.preventDefault();
        this.setState({ updatingEmail: true });

        // not sure if email verification should be sent before confirming email
        this.props.updateEmail(this.state.user.email, () => {
            this.props.setUser({email: this.state.user.email});
        }).then(() => {
            this.setState({updatingEmail: false});
        })

    }
    handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ user: { email: this.state.user.email, name: e.target.value } });
    }
    handleUpdateName = (e: React.FormEvent) => {
        e.preventDefault();
        this.setState({updatingName: true});
        this.props.updateName(this.state.user.name, () => {
            this.props.setUser({name: this.state.user.name});
        }).then(() => {
            this.setState({ updatingName: false });
        });
    }
    handleCurrentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({currentPassword: e.target.value});
    }
    handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ newPassword: e.target.value });
    }
    handleConfirmNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ confirmNewPassword: e.target.value });

    }
    handleUpdatePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (this.state.currentPassword === '')
            return this.props.addError('Current password can\'t be blank');
        if (this.state.newPassword === '' || this.state.confirmNewPassword === '')
            return this.props.addError('New password and confirm new password fields can\'t be blank');
        if (this.state.newPassword !== this.state.confirmNewPassword)
            return this.props.addError('New passwords do not match');
        this.setState({updatingPassword: true});
        this.props.updatePassword(this.state.currentPassword, this.state.newPassword, () => {
            this.setState({currentPassword: '', newPassword: '', confirmNewPassword: ''});
        }).then(() => {
            this.setState({updatingPassword: false});
        })

    }
    render() {
        return <div className="account-settings">
            <div className="settings-group">
                <p>Role: {this.props.user.role}</p>
                {this.props.user.role !== 'admin' ? 
                <p>An admin can update user roles under Settings -> Users</p> : <p></p> }
            </div>
            <div className="settings-group">
                <form onSubmit={this.handleUpdateName}>
                    <fieldset>
                        <label htmlFor="user-name">Display Name</label>
                        <input disabled={this.state.updatingName} type="text" id="user-name" value={this.state.user.name} placeholder="Jane Doe"
                            onChange={this.handleNameChange}/>
                    </fieldset>
                    <fieldset>
                        <button disabled={this.state.updatingName} type="submit">update name</button>
                    </fieldset>
                </form>
                <form onSubmit={this.handleUpdateEmail}>
                    <fieldset>
                        <label htmlFor="user-email">Email</label>
                        <input disabled={this.state.updatingEmail} type="email" id="user-email" value={this.state.user.email}
                            onChange={(e) => {
                                this.setState({ user: { email: e.target.value, name: this.state.user.name } });
                            }} />
                    </fieldset>
                    <fieldset>
                        <button disabled={this.state.updatingEmail} type="submit">update email</button>
                    </fieldset>
                </form>
            </div>
            <div className="settings-group">
                <div className="subtitle">Change Password</div>
                <form onSubmit={this.handleUpdatePassword}>
                    <fieldset>
                        <label>current password</label>
                        <input disabled={this.state.updatingPassword} type="password" value={this.state.currentPassword} onChange={this.handleCurrentPasswordChange}/>
                    </fieldset>
                    <fieldset>
                        <label>new password</label>
                        <input disabled={this.state.updatingPassword} type="password" value={this.state.newPassword} onChange={this.handleNewPasswordChange}/>
                    </fieldset>
                    <fieldset>
                        <label>confirm new password</label>
                        <input disabled={this.state.updatingPassword} type="password" value={this.state.confirmNewPassword} onChange={this.handleConfirmNewPasswordChange} />
                    </fieldset>
                    <fieldset>
                        <button type="submit" disabled={this.state.updatingPassword}>update password</button>
                    </fieldset>
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
        updateName: (name: string, onSuccess?: Function) => dispatch(updateName(name, onSuccess)),
        updateEmail: (email: string, onSuccess?: Function) => dispatch(updateEmail(email, onSuccess)),
        updatePassword: (oldPass: string, newPass: string, onSuccess?: Function) => dispatch(updatePassword(oldPass, newPass, onSuccess)),
        addError: (err: string) => dispatch(addError(err)),
        addInfo: (info: string) => dispatch(addInfo(info)),
        clearErrors: () => dispatch(clearErrors()),
        setUser: (user: UserState) => dispatch(setUser(user)),

    };
})(AccountSettings);