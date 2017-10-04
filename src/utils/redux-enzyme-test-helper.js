/**
 * Components using the react-redux module require access to the redux context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap with a valid store.
 */

import React from 'react';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import configureStore from '../store/configureStore';

import api from '../middlewares/api';
import array from '../middlewares/array';
import debounce from '../middlewares/debounce';
import analytics from '../middlewares/analytics';
import reducers from '../reducers';

const store = configureStore(
  undefined,
  applyMiddleware(thunk, array, api, debounce, analytics),
  reducers,
);

/* eslint-disable import/prefer-default-export */

export function wrapWithProvider(component) {
  return <Provider store={store}>{React.cloneElement(component)}</Provider>;
}
