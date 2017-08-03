// @flow

import isEmpty from 'lodash/isEmpty';

export function getSession(state: Object) {
  const { user, userId } = state.session;
  const isAuthenticated = !isEmpty(user);

  return {
    isAuthenticated,
    user,
    userId,
  };
}
