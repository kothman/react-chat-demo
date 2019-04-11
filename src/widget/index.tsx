
import './index.html';
import './demo.html';
import './scss/app.scss';

import {render} from 'react-dom';
import {Provider} from 'react-redux';
import * as React from 'react';
import './widget';

import App from './components/App';
import store from './store';
const app = document.getElementById('app');

render(<Provider store={store}>
    <App/>
</Provider>, app);

window.xprops.finishedLoading();