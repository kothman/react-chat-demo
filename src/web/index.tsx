import './html/index.html';
import './scss/app.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';

import App from './components/App';

import store from './store';

const root = document.getElementById('app');
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    root
);

declare global {
    interface Window { axios: any; }
}
axios.defaults.withCredentials = true;
axios.interceptors.response.use(function (res) {
    // should get a new csrfToken for each request, update headers
    let newCsrfToken: string = res.headers['new-csrf-token'];
    if (newCsrfToken) {
        axios.defaults.headers['csrf-token'] = newCsrfToken;
    }
    let newAccessToken: string = res.headers['x-access-token'];
    if (newAccessToken)
        axios.defaults.headers['x-access-token'] = newAccessToken;
    return res;
});
window.axios = axios;