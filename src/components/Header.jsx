'use strict';

import React from 'react';
import _ from 'lodash';
import {Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';


const menuItems = [
    {
        title: 'Місто',
        route: 'city'
    }, {
        title: 'RUN',
        route: 'run'
    }, {
        title: 'Мої події',
        route: 'my'
    }, {
        title: 'Проект',
        route: 'about'
    }
];

export const RenderedNavItem = item => {
    return (
        <NavItem
            key={`la-${item.id}`}
            eventKey={item.id}
        >
            {item.title}
        </NavItem>
    );
};

export const RenderedNavLink = item => {
    return (
        <div
            key={`lc-${item.id}`}
            to={item.route}
        >
            {RenderedNavItem(item)}
        </div>
    );
};

export const Menu = React.createClass({
    render() {
        let items = _(menuItems)
            .map(item => <RenderedNavLink item={item}/>)
            .value();
        return (
            <Nav>
                {items}
            </Nav>
        );
    }
});

export default class Header extends React.Component {
    render() {
        return (
            <nav id="mainNav" className="navbar navbar-default navbar-custom navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header page-scroll">
                        <button type="button" className="navbar-toggle" data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span> Меню <i className="fa fa-bars"/>
                        </button>
                        <a className="navbar-brand page-scroll" href="city" style={{padding: '0 0 0 15px'}}>
                            <img style={{height: '100%'}}
                                 src="http://localhost:8080/assets/images/logo-square-01.png"/>
                        </a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <Menu/>
                    </div>
                </div>
            </nav>
        );
    }
}