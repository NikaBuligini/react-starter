// @flow

import { CALL_API, setAuthorizationToken } from '../middlewares/api';
import { getSession } from '../selectors';
import type { Dispatch } from './types';

/**
 * authorizes user using accessToken
 * @api public
 * @param jwt: string
 */
function authorizeUser(jwt: string) {
  setAuthorizationToken(jwt);
}

export const LOGOUT = 'LOGOUT';

/**
 * clears JWT token from store and dispatches logout action
 * @api public
 * @param callback: Function
 */
export function logout(callback: Function) {
  return (dispatch: Dispatch) => {
    setAuthorizationToken(null);
    dispatch({ type: LOGOUT });
    callback();
  };
}

export const MARK_AS_UNAUTHORIZED = 'MARK_AS_UNAUTHORIZED';

/**
 * also logouts user
 */
export function markAsUnauthorized() {
  return { type: MARK_AS_UNAUTHORIZED };
}
