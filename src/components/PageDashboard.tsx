import * as React from 'react';
import {connect} from 'react-redux';
import * as io from 'socket.io-client';
import axios from 'axios';
import { withRouter, Router, Route, Switch, Link } from 'react-router-dom';

import OnlineUsers from './OnlineUsers';
import Chat from './Chat';

import history from '../lib/history';

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
    }
    getChannels = () => {
        axios.get('/api/v1/channels').then((res) => {
            this.setState({channels: res.data.channels});
            // Once we retrieve channels, check if current url matches a channel
            if (!this.state.channels.find((c: any) => {
                return c.name === this.props.match.params.channel;
            })) {
                let channelName: string = this.state.channels[0].name;
                history.push('/dashboard/' + channelName);
                this.setState({channel: channelName});
            }
        })
    }
    updateActiveChannel = (channelName: string) => {
        this.setState({channel: channelName});
    }
    componentWillUnmount = () => {
        this.state.socket.close();
    }
    componentDidMount = () => {
        this.getChannels();
    }
    render() {
        console.log('Dashboard props', this.props);
        console.log('Dashboard state', this.state);
        let channels: JSX.Element[] = [];
        let chats: JSX.Element[] = [];
        this.state.channels.forEach((c) => {
            let className: string = 'channel';
            this.state.channel === c.name ?
                className += ' active': '';
            channels.push(<Link to={"/dashboard/" + c.name} className={className} key={c['_id']} onClick={() => this.updateActiveChannel(c.name)}>{c.name}</Link>);
            chats.push(
                <Route key={c.name} path={"/dashboard/" + c.name} render={ () =>
                    <Chat socket={this.state.socket} channel={c.name}/>
                }/>
            );
        });
        
        return (
            <Router history={history}>
                <div className="page-dashboard">
                    <div className="sidebar">
                        <div className="channels">
                            {channels}
                        </div>
                    </div>
                    <div className="content">
                        <OnlineUsers socket={this.state.socket} />
                        <Switch>
                            {chats}
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}
export default connect(props => props)(PageDashboard);