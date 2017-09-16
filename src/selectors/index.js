// @flow

import isEmpty from 'lodash/isEmpty';

export * from './contributors';

export function getSession(state: Object) {
  const { user, userId } = state.session;
  const isAuthenticated = !isEmpty(user);

  return {
    isAuthenticated,
    user,
    userId,
  };
}
