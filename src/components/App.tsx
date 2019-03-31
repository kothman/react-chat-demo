import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as React from 'react';
import {connect} from 'react-redux';

import Navbar from './Navbar';
import Notifications from './Notifications';
import PageLogin from './PageLogin';
import PageLogout from './PageLogout';
import PageRegister from './PageRegister';
import PageDashboard from './PageDashboard';
import PageSettings from './PageSettings';
import VerifyEmail from './VerifyEmail';
import Page404 from './Page404';

interface State {
    finishedLoading: boolean
}

class App extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        console.log('Mounting app');
        this.state = {
            finishedLoading: false
        }
        this.checkIfLoggedIn().then(() => {
            this.setState(Object.assign({}, this.state, { finishedLoading: true }));
        });
    }
    checkIfLoggedIn() {
        return axios.get('/api/v1/user').then((response) => {
            this.props.dispatch({ type: 'SET_EMAIL', data: response.data.email });
            this.props.dispatch({ type: 'SET_AUTHORIZED', data: true });
        }).catch(() => {});
    }
    render() {
        let availableViews: any[] = [];
        if (this.props.user.authorized) {
            availableViews.push(<Route exact path="/dashboard/:channel?" key="page-dashboard" component={PageDashboard} />);
            availableViews.push(<Route exact path="/logout" key="page-logout" component={PageLogout} />);
            availableViews.push(<Route exact path="/settings/:setting?" key="page-settings" component={PageSettings} />)
        } else {
            availableViews.push(<Route exact path="/login" key="page-login" component={PageLogin} />);
            availableViews.push(<Route exact path="/register" key="page-register" component={PageRegister} />);
        }
        availableViews.push(<Route exact path="/verifyEmail/:key" key="page-verify-email" component={VerifyEmail} />);
        availableViews.push(<Route key="catch-all" component={Page404} />);

        return (
        <Router>
            {this.state.finishedLoading ? 
                <div id="react-app">
                    <Navbar />
                    <Notifications />
                    <Switch>
                        {availableViews}
                    </Switch>
                </div> :
                <div className="loading loading-fullscreen">
                    <div className="sk-fading-circle">
                        <div className="sk-circle1 sk-circle"></div>
                        <div className="sk-circle2 sk-circle"></div>
                        <div className="sk-circle3 sk-circle"></div>
                        <div className="sk-circle4 sk-circle"></div>
                        <div className="sk-circle5 sk-circle"></div>
                        <div className="sk-circle6 sk-circle"></div>
                        <div className="sk-circle7 sk-circle"></div>
                        <div className="sk-circle8 sk-circle"></div>
                        <div className="sk-circle9 sk-circle"></div>
                        <div className="sk-circle10 sk-circle"></div>
                        <div className="sk-circle11 sk-circle"></div>
                        <div className="sk-circle12 sk-circle"></div>
                    </div>
                </div>
            }
            
        </Router>
        );
    }
}

export default connect(state => state)(App);