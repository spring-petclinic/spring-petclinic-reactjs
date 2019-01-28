import * as React from 'react';
const { Router } = require('react-router');

// Routes
import configureRoutes from './configureRoutes';

// https://github.com/gaearon/react-hot-boilerplate/pull/61#issuecomment-218333616
// https://github.com/rybon/counter-hmr/blob/e651ce25b3a307f13ca53c977f9e8709ba873407/src/components/Root.jsx
const Root = () => (
    <Router>
      {configureRoutes()}
  </Router>
);

export default Root;
