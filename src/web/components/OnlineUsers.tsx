import * as React from 'react';
import { connect } from 'react-redux'

import { State as StoreState } from '../store';
import Modal from './Modal';

interface Props {
    socket?: SocketIOClient.Socket,
    connectedUserEmails?: string[]
}

interface State {
    displayConnectedUsers: boolean
}

class OnlineUsers extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            displayConnectedUsers: false
        }
    }
    handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        this.setState({displayConnectedUsers: true});
    }
    render() {
        return (
            <div className="online-users">
                <a className="online-users-count" onClick={this.handleClick}>
                    { this.props.connectedUserEmails.length } user{ this.props.connectedUserEmails.length !== 1 ? 's' : '' } online
                </a>
                <Modal
                    title="Online Users"
                    active={this.state.displayConnectedUsers}
                    onDismiss={() => {
                        this.setState({displayConnectedUsers: false});
                    }}>
                    { this.props.connectedUserEmails.map((email: string): (JSX.Element) => {
                            return <div className="row">{email}</div>
                        }) }
                </Modal>
            </div>
        );
    }
}

export default connect((state: StoreState) => {
    return {
        connectedUserEmails: state.socket.connectedUserEmails
    }
})(OnlineUsers);