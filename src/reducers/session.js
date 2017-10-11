// @flow

import * as ActionTypes from '../actions';
import type { Action } from '../actions/types';

const initialSession = {
  user: {},
  userId: null,
  redirectUrl: null,
};

export default (state: typeof initialSession = initialSession, action: Action) => {
  switch (action.type) {
    // case ActionTypes.LOGIN_SUCCESS: {
    //   const user = action.user || action.response.data;
    //   return { ...state, user, userId: user.userId };
    // }
    case ActionTypes.LOGOUT: {
      return { ...initialSession };
    }
    // case ActionTypes.SET_REDIRECT_PATH: {
    //   return { ...state, redirectUrl: action.url };
    // }
    default: {
      return state;
    }
  }
};
