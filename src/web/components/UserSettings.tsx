import * as React from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import {connect} from 'react-redux';

import UserSettingsSearch from './UserSettingsSearch';
import { addError } from '../actions/notificationsActions';
import Modal from './Modal';
import { createUser, editUser, deleteUser, restoreUser } from '../actions/userActions';

interface State {
    loading: boolean,
    users: {
        name: string,
        role: string,
        email: string,
        deleted: boolean,
    }[],

    displayNewUserModal: boolean,
    isCreatingNewUser: boolean,
    newUserName: string,
    newUserEmail: string,
    newUserRole: ('user' | 'admin') | string

    displayEditUserModal: boolean,
    isEditingUser: boolean,
    editUserOriginalEmail: string,
    editUserName: string,
    editUserEmail: string,
    editUserRole: string,

    displayDeleteUserModal: boolean,
    deleteUserEmail: string,
    isDeletingUser: boolean,

    displayRestoreUserModal: boolean,
    restoreUserEmail: string,
    isRestoringUser: boolean,
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
            editUserOriginalEmail: '',
            editUserName: '',
            editUserEmail: '',
            editUserRole: '',

            displayDeleteUserModal: false,
            deleteUserEmail: '',
            isDeletingUser: false,

            displayRestoreUserModal: false,
            restoreUserEmail: '',
            isRestoringUser: false,
        };
    }
    componentDidMount = () => {
        this.getUsers().then(() => {
            this.setState({ loading: false });
        });
    }
    render() {
        let users: JSX.Element[] = [];
        this.state.users.forEach((user) => {
            users.push(<div key={user.email} className={user.deleted ? 'user deleted' : 'user'}>
                <div className="edit-user" onClick={() => this.showEditUserModal(user.email)}><i className="material-icons">edit</i></div>
                <div className="user-name">{user.name}</div>
                <div className="user-email">{user.email}</div>
                <div className="user-role">{user.role}</div>
                {
                    user.deleted ?
                        <div className="restore-user" onClick={() => this.showRestoreUserModal(user.email)}><i className="material-icons">restore</i></div> :
                        <div className="delete-user" onClick={() => this.showDeleteUserModal(user.email)}><i className="material-icons">delete</i></div>
                }
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
                        <input type="email" id="new-user-email"
                            value={this.state.newUserEmail}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ newUserEmail: e.target.value })} />
                    </fieldset>
                    <fieldset className="required">
                        <label htmlFor="new-user-role">Role</label>
                        <select id="new-user-role"
                            value={this.state.newUserRole}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.setState({ newUserRole: e.target.value })}>
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
                    <fieldset>
                        <label>Editing {this.state.editUserOriginalEmail}</label>
                    </fieldset>
                </form>
            </Modal>
            <Modal title={"Delete " + this.state.deleteUserEmail}
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
            <Modal title={"Restore " + this.state.restoreUserEmail}
                active={this.state.displayRestoreUserModal}
                onDismiss={() => this.setState({ displayRestoreUserModal: false })}
                canConfirm={true}
                confirmText={'restore user'}
                onConfirm={this.handleRestoreUser}
                confirming={this.state.isRestoringUser}>
                <React.Fragment>
                    Are you sure you want to restore this user?
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
    getUsers = () => {
        return axios.get('/api/v1/users').then((res: AxiosResponse) => {
            this.setState({ users: res.data.users });
        }).catch((err: AxiosError) => {
            this.props.addError('Something went wrong trying to fetch the list of users');
            console.log(err);
        });
    }
    handleCreateNewUser = () => {
        this.setState({ isCreatingNewUser: true });
        this.props.createUser(this.state.newUserName, this.state.newUserEmail, this.state.newUserRole)
            .then(() => {
                // reset the newUser state
                this.setState({
                    newUserName: '',
                    newUserEmail: '',
                    newUserRole: 'user',
                    displayNewUserModal: false,
                    isCreatingNewUser: false,
                    loading: true
                });
                this.getUsers().then(() => this.setState({ loading: false }));
            });
    }
    showEditUserModal = (email: string) => {
        this.setState({
            editUserOriginalEmail: email,
            displayEditUserModal: true,
        });
    }
    handleEditUser = () => {
        this.setState({ isEditingUser: true });
        this.props.editUser(
            this.state.editUserName,
            this.state.editUserEmail,
            this.state.editUserRole
        ).then(() => {
            this.setState({
                editUserName: '',
                editUserEmail: '',
                editUserRole: 'user',
                displayEditUserModal: false,
                isEditingUser: false,
                loading: true,
            });
            this.getUsers().then(() => this.setState({ loading: false }));
        });
    }
    showDeleteUserModal = (email: string) => {
        this.setState({
            deleteUserEmail: email,
            displayDeleteUserModal: true
        });
    }
    handleDeleteUser = () => {
        this.setState({ isDeletingUser: true });
        this.props.deleteUser( this.state.deleteUserEmail
            ).then(() => {
                this.setState({
                    isDeletingUser: false,
                    displayDeleteUserModal: false,
                    deleteUserEmail: '',
                    loading: true,
                });
                this.getUsers().then(() => this.setState({ loading: false }));
            });
    }
    showRestoreUserModal = (email: string) => {
        this.setState({
            restoreUserEmail: email,
            displayRestoreUserModal: true
        });
    }
    handleRestoreUser = () => {
        this.setState({ isRestoringUser: true });
        this.props.restoreUser(this.state.restoreUserEmail).then(() => {
            this.setState({
                isRestoringUser: false,
                displayRestoreUserModal: false,
                restoreUserEmail: '',
                loading: true,
            });
            this.getUsers().then(() => this.setState({ loading: false }));
        });
    }
}

export default connect(null, (dispatch) => ({
    addError: (err: string) => dispatch(addError(err)),
    createUser: (name: string, email: string, role: string) => dispatch<any>(createUser(name, email, role)),
    editUser: (originalEmail: string, newName?: string, newEmail?: string, newRole?: string) =>
        dispatch<any>(editUser(originalEmail, newName, newEmail, newRole)),
    deleteUser: (email: string) => dispatch<any>(deleteUser(email)),
    restoreUser: (email: string) => dispatch<any>(restoreUser(email)),
}))(UserSettings);