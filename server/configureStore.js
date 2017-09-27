// @flow

import { createStore, applyMiddleware } from 'redux';
import type { Store } from 'redux';
import thunk from 'redux-thunk';
import api from '../src/middlewares/api';
import reducers from '../src/reducers';

export default function configureStore(preloadedState?: Object): Store<*, *, *> {
  return createStore(reducers, preloadedState, applyMiddleware(thunk, api));
}
