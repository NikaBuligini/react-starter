import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Routes } from './constants';
// import PrivateRoute from './PrivateRoute';

import { Home, SignIn } from './containers';
import NotFound from './containers/notFoundPage';

const RootRoutes = () => (
  <Switch>
    <Route exact path={Routes.home} component={Home} />
    <Route exact path={Routes.signIn} component={SignIn} />
    <Route component={NotFound} />
  </Switch>
);

export default RootRoutes;
