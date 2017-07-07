'use strict';

import React from 'react';
import {Route, IndexRedirect} from 'react-router';
import App from './components/App.jsx';
import City from './components/City.jsx';
import About from './components/About.jsx';
import NotFound from './components/NotFound.jsx';


export default (
    <Route path="/" component={App}>
        <Route path="city" component={City}/>
        <Route path="about" component={About}/>
        <IndexRedirect to="city"/>
        <Route path="*" component={NotFound}/>
    </Route>
);
