import * as React from 'react';
import {connect} from 'react-redux';
import * as io from 'socket.io-client';
import axios from 'axios';

import OnlineUsers from './OnlineUsers';
import Chat from './Chat';


interface State {
    socket: SocketIOClient.Socket,
    channel: string,
    channels: {
        _id: string,
        name: string
    }[]
}

 class PageDashboard extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            socket: io(),
            channel: 'general',
            channels: []
        };
        this.state.socket.on('connect', () => {
            console.log('Connected to websocket server [' + this.state.socket.id + ']');
        });
        this.state.socket.on('disconnect', () => {
            console.log('Disconnected from websocket server, attempting reconnect');
        });
        this.getChannels();
    }
    getChannels = () => {
        axios.get('/api/v1/channels').then((res) => {
            this.setState({channels: res.data.channels});
        })
    }
    updateActiveChannel = (channelName: string) => {
        this.setState({channel: channelName});
    }
    componentWillUnmount = () => {
        this.state.socket.close();
    }
    render() {
        console.log('Dashboard props', this.props);
        console.log('Dashboard state', this.state);
        let channels: JSX.Element[] = [];
        this.state.channels.forEach((c) => {
            let className: string = 'channel';
            this.state.channel === c.name ?
                className += ' active': '';
            channels.push(<div className={className} key={c['_id']} onClick={() => this.updateActiveChannel(c.name)}>{c.name}</div>);
        })
        return (
            <div className="page-dashboard">
                <div className="sidebar">
                    <div className="channels">
                        {channels}
                    </div>
                </div>
                <div className="content">
                    <OnlineUsers socket={this.state.socket} />
                    <Chat socket={this.state.socket} channel={this.state.channel}/>
                </div>
            </div>
        );
    }
}
export default connect(props => props)(PageDashboard);