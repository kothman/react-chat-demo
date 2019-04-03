import * as zoid from 'zoid';
import * as React from 'react';
import './scss/widget.scss';
const baseUrl = require('../../env').baseUrl;

let app = zoid.create({
    tag: 'react-chat-zoid-component',
    url: baseUrl + '/widget',
    context: 'iframe',
    dimensions: {
        width: '1px',
        height: '1px'
    },
    autoResize: {
        width: true,
        height: true
    }
})({
    addClass: (selector: string, className: string) => {
        document.querySelector(selector).classList.add(className);
    },
    removeClass:  (selector: string, className: string) => {
        document.querySelector(selector).classList.remove(className);
    },
    finishedLoading: () => {
        document.querySelector('#kothman-react-chat-widget-container')
            .classList.add('done-loading');
    }
});
declare global {
    interface Window {
        ReactChatWidget: any
    }
}

window.ReactChatWidget = app;