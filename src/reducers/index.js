// @flow

import { combineReducers } from 'redux';
import merge from 'lodash/merge';
import { SET_LOCALE } from '../actions';
import session from './session';
import fetch from './fetch';

const defaultEntities = {
  // services: {},
};

function entities(state = defaultEntities, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }
  return state;
}

function locale(state: string = 'en', action) {
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
});

export default rootReducer;
