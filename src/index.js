/* eslint-disable no-underscore-dangle */

import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import './vendor';
import './manifest.json';
import './robots.txt';

import api from './middlewares/api';
import array from './middlewares/array';
import analytics from './middlewares/analytics';
import reducers from './reducers';
import configureStore from './store/configureStore';
import App from './ClientSideAppWrapper';

const history = createHistory();

const path = (/#!(\/.*)$/.exec(location.hash) || [])[1];
if (path) {
  history.replace(path);
}

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

const store = configureStore(
  preloadedState,
  applyMiddleware(thunk, array, analytics, api),
  reducers,
);

render(
  <App store={store} />,
  document.getElementById('mount'),
);
