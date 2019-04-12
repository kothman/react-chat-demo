import * as React from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import {connect} from 'react-redux';

import LoadingFadeIn from './LoadingFadeIn';
import UserSettingsSearch from './UserSettingsSearch';
import { addError } from '../actions/notificationsActions';
import Modal from './Modal';

interface State {
    loading: boolean,
    users: {
        name: string,
        role: string,
        email: string,
    }[],

    displayNewUserModal: boolean,
    isCreatingNewUser: boolean,
    newUserName: string,
    newUserEmail: string,
    newUserRole: ('user' | 'admin')

    displayEditUserModal: boolean,
    isEditingUser: boolean,


    displayDeleteUserModal: boolean,
    isDeletingUser: boolean,
}

class UserSettings extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading: true,
            users: [],

            displayNewUserModal: false,
            isCreatingNewUser: false,
            newUserName: '',
            newUserEmail: '',
            newUserRole: 'user',

            displayEditUserModal: false,
            isEditingUser: false,

            displayDeleteUserModal: false,
            isDeletingUser: false,
        };
    }
    componentDidMount = () => {
        axios.get('/api/v1/users').then((res: AxiosResponse) => {
            this.setState({users: res.data.users});
        }).catch((err: AxiosError) => {
            this.props.addError('Something went wrong trying to fetch the list of users');
            console.log(err);
        }).then(() => {
            this.setState({loading: false});
        })
    }
    render() {
        let users: JSX.Element[] = [];
        this.state.users.forEach((user) => {
            users.push(<div key={user.email} className="user">
                <div className="edit-user"><i className="material-icons">edit</i></div>
                <div className="user-name">{user.name}</div>
                <div className="user-email">{user.email}</div>
                <div className="user-role">{user.role}</div>
                <div className="delete-user"><i className="material-icons">delete</i></div>
            </div>);
        });
        return <div className="user-settings">
            <Modal title="New User"
                   active={this.state.displayNewUserModal}
                   onDismiss={() => this.setState({displayNewUserModal: false})}
                   canConfirm={true}
                   confirmText={'send invitation'}
                   onConfirm={this.handleCreateNewUser}
                   confirming={this.state.isCreatingNewUser}>
                <form className="new-user">
                    <fieldset>
                        <label htmlFor="new-user-name">Name</label>
                        <input type="text" id="new-user-name"
                               value={this.state.newUserName}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({newUserName: e.target.value})} />
                    </fieldset>
                    <fieldset className="required">
                        <label htmlFor="new-user-email">Email</label>
                        <input type="email" id="new-user-email" />
                    </fieldset>
                    <fieldset className="required">
                        <label htmlFor="new-user-role">Role</label>
                        <select id="new-user-role">
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                        </select>
                    </fieldset>
                </form>
            </Modal>
            <Modal title="Edit User"
                   active={this.state.displayEditUserModal}
                   onDismiss={() => this.setState({ displayEditUserModal: false })}
                   canConfirm={true}
                   confirmText={'submit changes'}
                   onConfirm={this.handleEditUser}
                   confirming={this.state.isEditingUser}>
                <form className="edit-user">
                
                </form>
            </Modal>
            <Modal title="Delete User"
                active={this.state.displayDeleteUserModal}
                onDismiss={() => this.setState({ displayDeleteUserModal: false })}
                canConfirm={true}
                confirmText={'delete user'}
                onConfirm={this.handleDeleteUser}
                confirming={this.state.isDeletingUser}>
                <React.Fragment>
                    Are you sure you want to delete this user?
                </React.Fragment>
            </Modal>
            <div className="add-user btn" onClick={() => this.setState({displayNewUserModal: true})}>
                <i className="material-icons">add_box</i>
                <span className="add-user-text">New User</span>
            </div>
            <UserSettingsSearch />
            <div className="user-details">
                {users}
            </div>
        </div>
    }
    handleCreateNewUser = () => {

    }
    handleEditUser = () => {

    }
    handleDeleteUser = () => {

    }
}

export default connect(null, (dispatch) => ({
    addError: (err: string) => dispatch(addError(err)),
}))(UserSettings);