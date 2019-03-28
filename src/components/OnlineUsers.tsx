import * as React from 'react';

interface Props {
    socket: SocketIOClient.Socket
}

interface State {
    connectedUserEmails: string[]
}

class OnlineUsers extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            connectedUserEmails: []
        };
        this.props.socket.on('connected users', this.updateConnectedUsers);
    }
    updateConnectedUsers = (userEmails: string[]) => {
        console.log('connected user emails', userEmails);
        this.setState(Object.assign({}, this.state, {connectedUserEmails: userEmails}));
    }
    render() {
        return (
            <div className="online-users">
                <a className="online-users-count" href="#" onClick={ () => {}}>{
                    this.state.connectedUserEmails.length } user{ this.state.connectedUserEmails.length !== 1 ? 's' : '' } online
                </a>
            </div>
        );
    }
}

export default OnlineUsers;