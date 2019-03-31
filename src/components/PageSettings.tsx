import * as React from 'react';
import {connect} from 'react-redux';
import { Link, Router, Route, Switch } from 'react-router-dom';

import history from '../lib/history';

import AccountSettings from './AccountSettings';
import ChannelsSettings from './ChannelsSettings';

interface Props {
    user: any,
    match: any
}

interface State {
    user: {
        email: string
    },
    currentSettingsPage: string | boolean
}

class PageSettings extends React.Component<Props, State> {
    private settings: string[] = ['account', 'channels', 'users', 'widget'];
    constructor(props: Props) {
        super(props);
        let settingsPage = this.settings.indexOf(props.match.params.setting) > -1 ?
            props.match.params.setting : false;
        this.state = {
            user: {
                email: this.props.user.email
            },
            currentSettingsPage: settingsPage
        };
        console.log('Page settings state', this.state);
    }

    componentDidMount = () => {
        if (!this.state.currentSettingsPage) {
            this.setState({currentSettingsPage: this.settings[0]})
            return history.push('/settings/' + this.settings[0]);
        }
    }
    render() {
        let settings: JSX.Element[] = [];
        this.settings.forEach((s: string) => {
            settings.push(<Link key={s}
                                onClick={ () => this.setState({currentSettingsPage: s})}
                                className={s===this.state.currentSettingsPage ? 'tab active' : 'tab'}
                                to={'/settings/' + s}>{s}</Link>);
        });

        return <Router history={history}>
            <div className="page-settings">
                <div className="container">
                    <h3 className="title">Settings</h3>
                    <div className="tabs">{settings}</div>
                    { this.state.currentSettingsPage ?
                        <div className="">
                            <Switch>
                                <Route path="/settings/account" component={AccountSettings} />
                                <Route path="/settings/channels" component={ChannelsSettings} />
                            </Switch>
                        </div> : <div></div>
                    }
                </div>
            </div>
        </Router>;
    }
}

export default connect(props => props)(PageSettings);