import * as React from 'react';
import {connect} from 'react-redux';
import { Link, BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


import AccountSettings from './AccountSettings';
import ChannelSettings from './ChannelSettings';
import UserSettings from './UserSettings';
import WidgetSettings from './WidgetSettings';

interface Props {
    user: any,
    match: any
}

interface State {
    user: {
        role: string
    },
    currentSettingsPage: string 
}

interface Setting {
    name: string,
    restrictToAdmin: boolean,
    component?: React.ComponentClass
}

class PageSettings extends React.Component<Props, State> {
    private settings: Setting[] = [
        { name: 'account', restrictToAdmin: false, component: AccountSettings },
        { name: 'channels', restrictToAdmin: true, component: ChannelSettings },
        { name: 'users', restrictToAdmin: true, component: UserSettings },
        /*{ name: 'widgets', restrictToAdmin: true, component: WidgetSettings }*/];

    constructor(props: Props) {
        super(props);
        this.state = {
            user: {
                role: this.props.user.role
            },
            currentSettingsPage: '',
        };
    }

    componentDidMount = () => {
        let settingsPage = this.settings.find((s: Setting) => this.props.match.params.setting === s.name);
        if (settingsPage)
            this.setState({currentSettingsPage: settingsPage.name})
    }

    render() {
        let settings: JSX.Element[] = [];
        let settingsRoutes: JSX.Element[] = [];

        this.settings.forEach((s: Setting) => {
            if (s.restrictToAdmin && this.props.user.role !== 'admin')
                return;
            settings.push(<Link key={s.name}
                                onClick={() => this.setState({currentSettingsPage: s.name})}
                                className={s.name===this.state.currentSettingsPage ? 'tab active' : 'tab'}
                                to={'/settings/' + s.name}>{s.name}</Link>);
            if (s.component)
                settingsRoutes.push(<Route path={'/settings/' + s.name} key={s.name} component={s.component} />);
        });

        return (
            <Router>
                <div className="page-settings">
                    <div className="container">
                        <h3 className="title">Settings</h3>
                        <div className="tabs">{settings}</div>
                            <Switch>
                                {settingsRoutes}
                            </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default connect((props: any) => {
    return {
        user: { role: props.user.role }
    }
})(PageSettings);