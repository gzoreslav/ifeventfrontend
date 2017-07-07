'use strict';

import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App.jsx';
import City from './components/City.jsx';
import About from './components/About.jsx';


export default (
    <Route path="/" component={App}>
        <IndexRoute component={City}/>
        <Route path="city" component={City}/>
        <Route path="about" component={About}/>
   </Route>
);
