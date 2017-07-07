'use strict';

import React from 'react';
//import Router from 'react-router';
//var RouteHandler = Router.RouteHandler;

import Header from './Header.jsx';
import Footer from './Footer.jsx';

const App = React.createClass({
    render() {
        return (
            <div>
                <Header route={this.props.routes[1].path}/>
                <div className="container main-container">
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        );
    }
});

export default App;
