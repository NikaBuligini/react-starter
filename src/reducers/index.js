// @flow

import { combineReducers } from 'redux';
import merge from 'lodash/merge';
import { reducer as progress } from 'react-redux-progress';
import { SET_LOCALE } from '../actions';
import session from './session';
import fetch from './fetch';
import type { Action } from '../actions/types';

type ActionWithApiResponse = {
  response?: {
    entities?: Object,
  },
};

type Entities = {
  [key: string]: Object,
};

const defaultEntities = {
  // services: {},
};

export function entities(state: Entities = defaultEntities, action: ActionWithApiResponse) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }
  return state;
}

export function locale(state: string = 'en', action: Action) {
  if (action.type === SET_LOCALE) {
    return action.locale;
  }

  return state;
}

const rootReducer = combineReducers({
  session,
  entities,
  fetch,
  locale,
  progress,
});

export default rootReducer;
