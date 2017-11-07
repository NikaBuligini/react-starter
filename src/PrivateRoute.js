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

const PrivateRoute = ({ component: Component, isAuthenticated, location, ...rest }: Props) => {
  function render(props) {
    if (isAuthenticated) {
      return <Component {...props} isAuthenticated={isAuthenticated} {...rest} />;
    }

    return <Redirect to={{ pathname: Routes.signin, state: { from: location } }} />;
  }

  return <Route {...rest} render={render} />;
};

export default connect(getSession)(PrivateRoute);
