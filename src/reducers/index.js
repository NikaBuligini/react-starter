// @flow

import { combineReducers } from 'redux';
import merge from 'lodash/merge';
import session from './session';

const defaultEntities = {
  // services: {},
};

function entities(state = defaultEntities, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }
  return state;
}

const rootReducer = combineReducers({
  session,
  entities,
});

export default rootReducer;
