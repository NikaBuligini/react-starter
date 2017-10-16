import { createStore, compose } from 'redux';
import { autoRehydrate } from 'redux-persist';

export default function configureStore(preloadedState, middlewares, rootReducer) {
  return createStore(rootReducer, preloadedState, compose(middlewares, autoRehydrate()));
}
