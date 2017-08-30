// @flow

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Routes } from './constants';
import { getSession } from './selectors';

type Props = {
  isAuthenticated: boolean,
  location: any,
  component: Class<React$Component<*, *>>,
};

const PrivateRoute = ({ component: Component, isAuthenticated, location, ...rest }: Props) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} isAuthenticated={isAuthenticated} {...rest} />
      ) : (
        <Redirect to={{ pathname: Routes.signin, state: { from: location } }} />
      )}
  />
);

export default connect(getSession)(PrivateRoute);
