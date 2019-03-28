import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as React from 'react';
import {connect} from 'react-redux';

import Navbar from './Navbar';
import PageLogin from './PageLogin';
import PageLogout from './PageLogout';
import PageRegister from './PageRegister';
import PageDashboard from './PageDashboard';
import Page404 from './Page404';

interface State {
    finishedLoading: boolean
}

class App extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            finishedLoading: false
        }
        this.checkIfLoggedIn().then(() => {
            this.setState(Object.assign({}, this.state, { finishedLoading: true }));
            console.log(this.state);
        });
    }
    checkIfLoggedIn() {
        return axios.get('/api/v1/user').then((response) => {
            console.log(response.data);
            this.props.dispatch({ type: 'SET_EMAIL', data: response.data.email });
            this.props.dispatch({ type: 'SET_AUTHORIZED', data: true });
        }).catch(() => {});
    }
    render() {
        let availableViews: any[] = [];
        if (this.props.user.authorized) {
            availableViews.push(<Route exact path="/dashboard" key="page-dashboard" component={PageDashboard} />);
            availableViews.push(<Route exact path="/logout" key="page-logout" component={PageLogout} />);
        } else {
            availableViews.push(<Route exact path="/login" key="page-login" component={PageLogin} />);
            availableViews.push(<Route exact path="/register" key="page-register" component={PageRegister} />);
        }
        availableViews.push(availableViews.push(<Route key="catch-all" component={Page404} />));

        return (
        <Router>
            {this.state.finishedLoading ? 
                <div id="react-app">
                    <Navbar />
                    <Switch>
                        {availableViews}
                    </Switch>
                </div> :
                <div className="loading loading-fullscreen"></div>
            }
            
        </Router>
        );
    }
}

export default connect(state => state)(App);