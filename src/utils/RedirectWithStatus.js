// @flow

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import type { ContextRouter } from 'react-router-dom';

const RedirectWithStatus = ({ from, to, status }: { from: string, to: string, status: number }) => (
  <Route
    render={(router: Object) => {
      // router actually is type of ContextRouter
      const { staticContext } = router;

      // there is no `staticContext` on the client, so
      // we need to guard against that here
      if (staticContext) {
        staticContext.status = status;
      }

      return <Redirect from={from} to={to} />;
    }}
  />
);

/**
 * Example:
 * -------------------
 * <RedirectWithStatus
 *   status={301}
 *   from="/"
 *   to="/auth/signIn"
 * />
 */

export default RedirectWithStatus;
