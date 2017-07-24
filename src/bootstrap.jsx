import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import routes from './routes.jsx';

//init httpService config
import httpServiceConfiguration from 'httpServiceConfiguration';
import httpService from './services/httpService.js';

httpService.getInstance(httpServiceConfiguration);//will keep config in singleton
//this way, instead of using resolve.alias of webpack (and having the require of module messed up by webpack when they'll be executed server-side)
//I use dependency injection, in the one place that won't be executed in node : the client side bootstrap

let ReactGA = require('react-ga');
ReactGA.initialize('UA-102573486-1');

function logPageView() {
    ReactGA.set({ page: window.location.pathname + window.location.search });
    ReactGA.pageview(window.location.pathname + window.location.search);
}

const history = createBrowserHistory();
ReactDOM.render(<Router history={history} onUpdate={logPageView}>{routes}</Router>, document.getElementById('app-container'));
