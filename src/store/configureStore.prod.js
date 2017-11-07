import { createStore } from 'redux';
import { persistReducer } from 'redux-persist';
import transform from '../utils/redux-persist-transform';
import localforage from '../utils/localforage';

const config = {
  version: 1,
  key: 'root',
  storage: localforage,
  transforms: [transform],
  stateReconciler: false,
};

export default function configureStore(preloadedState, middlewares, rootReducer) {
  return createStore(persistReducer(config, rootReducer), preloadedState, middlewares);
}
