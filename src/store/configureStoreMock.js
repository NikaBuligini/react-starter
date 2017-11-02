import { createStore } from 'redux';

export default function configureStore(preloadedState, middlewares, rootReducer) {
  return createStore(rootReducer, preloadedState, middlewares);
}
