import axios, { AxiosResponse } from 'axios';
import { Router, Route, Switch } from 'react-router-dom';
import * as React from 'react';
import {connect} from 'react-redux';

import Navbar from './Navbar';
import Notifications from './Notifications';
import PageLogin from './PageLogin';
import PageRegister from './PageRegister';
import PageDashboard from './PageDashboard';
import VerifyEmail from './VerifyEmail';
import LoadingFadeIn from './LoadingFadeIn';
import Page404 from './Page404';

import {State as UserState} from '../reducers/user';
import {setUser} from '../actions/userActions';
import history from '../lib/history';

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
        return axios.get('/api/v1/user').then((res: AxiosResponse) => {
            this.props.setUser({
                authorized: true,
                email: res.data.email,
                name: res.data.name || '',
                role: res.data.role
            });
        }).catch(() => {});
    }
    render() {
        let availableViews: any[] = [];
        if (this.props.authorized) {
            availableViews.push(<Route key="page-dashboard" component={PageDashboard} />);
        } else {
            availableViews.push(<Route exact path="/login" key="page-login" component={PageLogin} />);
            availableViews.push(<Route exact path="/register" key="page-register" component={PageRegister} />);
        }
        availableViews.push(<Route exact path="/verifyEmail/:key" key="page-verify-email" component={VerifyEmail} />);
        availableViews.push(<Route key="catch-all" component={Page404} />);

        return (
        <Router history={history}>
            <LoadingFadeIn active={!this.state.finishedLoading} />
            {this.state.finishedLoading ? 
                <div id="react-app">
                    <Navbar />
                    <Notifications />
                    <Switch>
                        {availableViews}
                    </Switch>
                </div> : <div></div>
            } 
        </Router>
        );
    }
}

export default connect((state: any) => {
    return {
        authorized: state.user.authorized
    };
}, dispatch => {
    return {
        setUser: (user: UserState) => dispatch(setUser(user))
    }
})(App);