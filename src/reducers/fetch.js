// @flow

import { combineReducers } from 'redux';
import union from 'lodash/union';
import * as ActionTypes from '../actions';
// import { isFullyLoaded } from '../utils/reducer-helpers';

type FetchStatusConfig = {
  types: Array<string>,
  mapActionToKey: Object => string,
  initialState: mixed | Object,
  retrieveData: (state: any, action: any) => Object,
};

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
export const fetchStatus = ({
  types,
  mapActionToKey,
  initialState,
  retrieveData,
}: FetchStatusConfig) => {
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

  /* eslint-disable default-case, consistent-return */
  const updateFetchStatus = (state = initialStatusState, action: Object) => {
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
          loadedAt: Date.now(),
          ...data,
        };
      }
      case failureType: {
        return {
          ...state,
          isFetching: false,
          loaded: true,
          loadedAt: Date.now(),
          errors: action.error || ['Something bad happened'],
        };
      }
    }
  };
  /* eslint-enable default-case, consistent-return */

  return (state: Object = {}, action: Object) => {
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
  // EXAMPLE
  // articlesByUserId: fetchStatus({
  //   mapActionToKey: action => action.key,
  //   types: [
  //     'ActionTypes.ARTICLES_REQUEST',
  //     'ActionTypes.ARTICLES_SUCCESS',
  //     'ActionTypes.ARTICLES_FAILURE',
  //   ],
  //   initialState: { ids: [], isFullyLoaded: false },
  //   retrieveData: (state, action) => ({
  //     ids: union(state.ids, action.response.result),
  //     isFullyLoaded: isFullyLoaded(action),
  //   }),
  // }),
  contributorsByRepo: fetchStatus({
    mapActionToKey: action => action.key,
    types: [
      ActionTypes.CONTRIBUTORS_REQUEST,
      ActionTypes.CONTRIBUTORS_SUCCESS,
      ActionTypes.CONTRIBUTORS_FAILURE,
    ],
    initialState: { ids: [] },
    retrieveData: (state, action) => ({
      ids: union(state.ids, action.response.result),
    }),
  }),
});

export default fetch;
