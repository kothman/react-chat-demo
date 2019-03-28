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
axios.defaults.baseURL = 'http://localhost:3000';
window.axios = axios;