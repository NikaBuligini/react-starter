// @flow
/* eslint-disable no-underscore-dangle */

import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';

// Load the favicon, the manifest.json file and the robots.txt file
/* eslint-disable import/no-webpack-loader-syntax, import/no-unresolved */
import '!file-loader?name=[name].[ext]!../public/manifest.json';
import '!file-loader?name=[name].[ext]!../public/robots.txt';
/* eslint-enable import/no-webpack-loader-syntax, import/no-unresolved */

import './vendor';

import api from './middlewares/api';
import array from './middlewares/array';
import debounce from './middlewares/debounce';
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
const preloadedState: ?Object = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

const store = configureStore(
  preloadedState,
  applyMiddleware(thunk, array, api, debounce, analytics),
  reducers,
);

global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};

render(<App store={store} />, document.getElementById('mount'));

if (module.hot) {
  module.hot.accept();
}
