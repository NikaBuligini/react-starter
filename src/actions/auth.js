// @flow

import { CALL_API, setAuthorizationToken } from '../middlewares/api';
import { getSession } from '../selectors';

/**
 * authorizes user using accessToken
 * @api public
 * @param jwt: string
 */
function authorizeUser(jwt: string) {
  setAuthorizationToken(jwt);
}

export const LOGOUT: string = 'LOGOUT';

/**
 * clears JWT token from store and dispatches logout action
 * @api public
 * @param callback: Function
 */
export function logout(callback: Function) {
  return (dispatch: Function) => {
    setAuthorizationToken(null);
    dispatch({ type: LOGOUT });
    callback();
  };
}

export const MARK_AS_UNAUTHORIZED: string = 'MARK_AS_UNAUTHORIZED';

/**
 * also logouts user
 */
export function markAsUnauthorized() {
  return { type: MARK_AS_UNAUTHORIZED };
}
