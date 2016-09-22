import * as React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import {  IRedirectLocationState, IGlobalState } from './types';

import App from './components/App';
import WelcomePage from './components/WelcomePage';
import ErrorPage from './components/ErrorPage';
import NotFoundPage from './components/NotFoundPage';

export default () => (
  <Route component={App}>
    <Route path='/' component={WelcomePage} />
    <Route path='/error' component={ErrorPage} />
    <Route path='*' component={NotFoundPage} />
  </Route>
);

