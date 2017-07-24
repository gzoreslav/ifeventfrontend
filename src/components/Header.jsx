'use strict';

import React from 'react';
import {Link} from 'react-router';
import _ from 'lodash';
import {Nav, Navbar} from 'react-bootstrap';
import classNames from 'classnames';


const menuItems = [
    {
        title: 'Місто',
        route: 'city'
    }, {
        title: 'Мої події',
        route: 'my',
        disabled: true
    }, {
        title: 'Проект',
        route: 'about'
    }
];

export const RenderedNavItem = ({item, route}) => {
    return (
        <li className={classNames({active: route === item.route, disabled: item.disabled})}>
            <Link to={`/${item.route}`}>
                {item.title}
            </Link>
        </li>
    );
};

export const Menu = React.createClass({
    render() {
        let items = _(menuItems)
            .map(item => <RenderedNavItem item={item} route={this.props.route}/>)
            .value();
        return (
            <Nav bsStyle="pills" pullRight>
                {items}
            </Nav>
        );
    }
});

export default React.createClass({
    render() {
        return (
            <Navbar fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">
                            <img src="/assets/img/logo-square-01.png" alt="logo"/>
                        </a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Menu route={this.props.route}/>
                </Navbar.Collapse>
            </Navbar>
        );
    }
});
