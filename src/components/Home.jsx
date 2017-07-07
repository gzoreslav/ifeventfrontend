'use strict';

import React from 'react';
import { Link } from 'react-router';

const Home = () => (
  <div>
    <p>This project is the <strong>isomorphic</strong> version of <a href="https://github.com/topheman/react-es6" title="react-es6 on github">topheman/react-es6</a>. It's based on <strong>React</strong> and <strong>Express</strong> and relies on <a href="https://github.com/topheman/topheman-apis-proxy" title="topheman-apis-proxy on Github">topheman-apis-proxy</a> for the backend (providing the github API).</p>
    <p>It's running on <strong>react v0.14.0</strong> - read the <a href="http://dev.topheman.com/upgraded-to-react-v0-14/" title="Upgraded to react v0.14">blog post about the upgrade</a>.</p>
    <p>Please check out the <a href="https://github.com/topheman/react-es6-isomorphic" title="topheman/react-es6-isomorphic on Github">github repo</a> or read <a href="http://dev.topheman.com/react-es6-isomorphic/" title="Isomorphic app using React and ES6">original blog post</a> for further informations.</p>
    <p><strong>TL;DR</strong> : click on the button to try it !</p>
    <p className="text-center"><Link className="btn btn-default btn-primary btn-lg" to="/github">TRY the DAMN thing !</Link></p>
    <p><strong>Isomorphic</strong>, you say ? You may now use the term <i>"universal"</i> ... Take a quick look at the <strong><Link to="/about">about page</Link></strong> if you don't see the difference with the front-only version.</p>
  </div>
);

export default Home;
