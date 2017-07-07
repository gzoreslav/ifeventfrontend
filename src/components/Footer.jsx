'use strict';

import React from 'react';

const Footer = () => (
    <footer>
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <span className="copyright">Copyright &copy; IF City Event 2017</span>
                </div>
                <div className="col-md-4">
                    <ul className="list-inline social-buttons">
                        <li>
                            <a target="_blank" href="https://www.facebook.com/myifevent">
                                <i className="fa fa-facebook"/>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="col-md-4">
                    <ul className="list-inline quicklinks">
                        <li><a href="#">Умови використання</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
