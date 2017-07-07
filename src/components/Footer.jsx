'use strict';

import React from 'react';

import TwitterButton from './common/TwitterButton.jsx';

const Footer = () => (
  <footer className="footer container">
    <p>
      ©2015 <a href="http://labs.topheman.com/">labs.topheman.com</a> - Christophe Rosset<br/>
      <TwitterButton/>
    </p>
  </footer>
);

export default Footer;