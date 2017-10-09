import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Routes } from './constants';
// import PrivateRoute from './PrivateRoute';

import { Home, Contributors } from './containers';
import NotFound from './containers/NotFoundPage';

const RootRoutes = () => (
  <Switch>
    <Route exact path={Routes.home} component={Home} />
    <Route exact path={Routes.contributors} component={Contributors} />
    <Route component={NotFound} />
  </Switch>
);

export default RootRoutes;
