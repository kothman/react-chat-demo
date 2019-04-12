import * as React from 'react';
import {connect} from 'react-redux';
import { Router, Route, Switch, Link, RouteComponentProps, Redirect } from 'react-router-dom';

import {fetchChannels} from '../actions/channelsActions';
import {init as initWebsocket} from '../actions/socketActions';

import OnlineUsers from './OnlineUsers';
import Chat from './Chat';
import LoadingFadeIn from './LoadingFadeIn';
import PageLogout from './PageLogout';
import PageSettings from './PageSettings';
import Dropdown from './Dropdown';
import DropdownMenu from './DropdownMenu';
import DropdownMenuItem from './DropdownMenuItem';

import history from '../lib/history';

interface State {
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
            channel: '',
            channels: [],
            redirectToChannel: false
        };
        this.props.initWebsocket();
    }
    componentDidUpdate = (prevProps: any) => {
        if (this.props.location.pathname.indexOf('/dashboard') === 0 &&
            this.props.channelNames.length > 0 &&
            this.state.channel === '') {
            this.setState({ channel: this.props.channelNames[0] });
        }
    }
    componentDidMount = () => {
        this.props.fetchChannels().then(() => {

        });
    }
    render() {
        let channels: JSX.Element[] = [];
        let dashboardRoutes: JSX.Element[] = [];
        this.props.channelNames.forEach((c: string) => {
            let className: string = 'channel';
            this.state.channel === c ?
                className += ' active': '';
            channels.push(<Link to={"/dashboard/" + c}
                                className={className}
                                key={c}
                                onClick={() => this.setState({channel: c})}>
                            {c}</Link>);
            dashboardRoutes.push(
                <Route key={c} path={"/dashboard/" + c} render={ () =>
                    <Chat channel={c}/>
                }/>
            );
        });

        return (
            <Router history={history}>
                <div className="page-dashboard">
                    <div className={ this.props.open ? "sidebar open" : "sidebar"}>
                        <Dropdown className="sidebar-item account-dropdown">
                            {this.props.userEmail}
                            <i className="material-icons">keyboard_arrow_down</i>
                            <DropdownMenu>
                                <DropdownMenuItem>
                                     <Link to="/settings/account">
                                        <i className="material-icons">settings</i>
                                        settings
                                     </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link to="/logout">
                                        <i className="material-icons">exit_to_app</i>
                                        logout
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenu>
                        </Dropdown>
                        <div className="sidebar-item">Channels</div>
                        <div className="channels">
                            <LoadingFadeIn active={channels.length === 0} />
                            {channels}
                        </div>
                    </div>
                    <div className="content">
                        <Switch>
                            <Route exact path="/logout" key="page-logout" component={PageLogout} />
                            <Route exact path="/settings/:setting?" key="page-settings" component={PageSettings} />
                            {dashboardRoutes}
                            <Route render={(props: RouteComponentProps<any>): React.ReactNode => {
                                console.log('redirect dashboard');
                                if (this.props.channelNames.length === 0)
                                    return <div></div>
                                return <Redirect to={"/dashboard/" + this.props.channelNames[0] } />
                            }}/>
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
        }),
        userEmail: state.user.email,
        open: state.sidebar.open,

    };
}, (dispatch: any) =>  {
    return {
        fetchChannels: () => {
            return dispatch(fetchChannels())
        },
        initWebsocket: () => dispatch(initWebsocket())
    };
})(PageDashboard);