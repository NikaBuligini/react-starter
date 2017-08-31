// @flow

import { combineReducers } from 'redux';
import union from 'lodash/union';
import * as ActionTypes from '../actions';

function isFullyLoaded(action: Object, ids?: Array<number>) {
  const data = ids || action.response.result.data;

  return typeof action.limit === 'number' ? data.length < action.limit : false;
}

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
const fetchStatus = ({ types, mapActionToKey, initialState, retrieveData }) => {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.');
  }

  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.');
  }

  if (typeof mapActionToKey !== 'function') {
    throw new Error('Expected mapActionToKey to be a function.');
  }

  const [requestType, successType, failureType] = types;

  let initialStatusState = {
    isFetching: false,
    loaded: false,
    loadedAt: null,
    errors: [],
  };

  if (typeof initialState === 'object') {
    initialStatusState = { ...initialStatusState, ...initialState };
  }

  const updateFetchStatus = (state = initialStatusState, action) => {
    switch (action.type) {
      case requestType: {
        return {
          ...state,
          isFetching: true,
          errors: [],
        };
      }
      case successType: {
        const data = retrieveData ? retrieveData(state, action) : {};
        return {
          ...state,
          isFetching: false,
          loaded: true,
          loadedAt: new Date(),
          ...data,
        };
      }
      case failureType: {
        return {
          ...state,
          isFetching: false,
          loaded: true,
          loadedAt: new Date(),
          errors: action.error || ['Something bad happened'],
        };
      }
      default: {
        return state;
      }
    }
  };

  return (state = {}, action) => {
    // Update pagination by key
    switch (action.type) {
      case requestType:
      case successType:
      case failureType: {
        const key = mapActionToKey(action);
        if (typeof key !== 'string' && typeof key !== 'number') {
          throw new Error('Expected key to be a string or number.');
        }
        return {
          ...state,
          [key]: updateFetchStatus(state[key], action),
        };
      }
      default: {
        return state;
      }
    }
  };
};

const fetch = combineReducers({
  articlesByUserId: fetchStatus({
    mapActionToKey: action => action.key,
    types: [
      'ActionTypes.ARTICLES_REQUEST',
      'ActionTypes.ARTICLES_SUCCESS',
      'ActionTypes.ARTICLES_FAILURE',
    ],
    initialState: { ids: [], isFullyLoaded: false },
    retrieveData: (state, action) => ({
      ids: union(state.ids, action.response.result),
      isFullyLoaded: isFullyLoaded(action),
    }),
  }),
});

export default fetch;
