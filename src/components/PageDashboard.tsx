import * as React from 'react';
import {connect} from 'react-redux';
import * as io from 'socket.io-client';
import axios from 'axios';
import { withRouter, Router, Route, Switch, Link } from 'react-router-dom';

import {fetchChannels} from '../actions/channelsActions';

import OnlineUsers from './OnlineUsers';
import Chat from './Chat';
import LoadingFadeIn from './LoadingFadeIn';

import history from '../lib/history';
import channels from '../server/routes/api/channels';

interface State {
    socket: SocketIOClient.Socket,
    channel: string,
    channels: {
        _id: string,
        name: string
    }[],
    redirectToChannel: string | boolean
}

 class PageDashboard extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            socket: io(),
            channel: '',
            channels: [],
            redirectToChannel: false
        };
        this.state.socket.on('connect', () => {
            console.log('Connected to websocket server [' + this.state.socket.id + ']');
        });
        this.state.socket.on('disconnect', () => {
            console.log('Disconnected from websocket server, attempting reconnect');
        });
    }
    componentWillUnmount = () => {
        this.state.socket.close();
    }
    componentDidMount = () => {
        this.props.fetchChannels().then(() => {
            // set current channel to url param channel if exists, otherwise redirect
            if(this.props.channelNames.indexOf(this.props.match.params.channel) > -1 ) {
                this.setState({channel: this.props.match.params.channel});
            } else {
                this.setState({channel: this.props.channelNames[0]});
                history.push('/dashboard/' + this.props.channelNames[0]);
            }
        });
    }
    render() {
        let channels: JSX.Element[] = [];
        let chats: JSX.Element[] = [];
        this.props.channelNames.forEach((c: string) => {
            let className: string = 'channel';
            this.state.channel === c ?
                className += ' active': '';
            channels.push(<Link to={"/dashboard/" + c}
                                className={className}
                                key={c}
                                onClick={() => this.setState({channel: c})}>
                            {c}</Link>);
            chats.push(
                <Route key={c} path={"/dashboard/" + c} render={ () =>
                    <Chat socket={this.state.socket} channel={c}/>
                }/>
            );
        });
        
        return (
            <Router history={history}>
                <div className="page-dashboard">
                    <div className="sidebar">
                        <div className="channels">
                            <LoadingFadeIn active={channels.length === 0} />
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
export default connect((state: any) => {
    return {
        channelNames: state.channels.map( (c: any) => {
            return c.name;
        }).sort((a: string, b: string) => {
            let nameA: string = a.toUpperCase();
            let nameB: string = b.toUpperCase();
            return (nameA < nameB) ? -1 : (nameB < nameA) ? 1 : 0;
        })
    };
}, (dispatch: any) =>  {
    return {
        fetchChannels: () => {
            return dispatch(fetchChannels())
        }
    };
})(PageDashboard);