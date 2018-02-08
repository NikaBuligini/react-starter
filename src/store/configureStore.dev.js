import { createStore } from 'redux';
import { persistReducer } from 'redux-persist';
import transform from '../utils/redux-persist-transform';
import localforage from '../utils/localforage';
import compose from '../utils/compose';

const config = {
  version: 1,
  key: 'root',
  storage: localforage,
  transforms: [transform],
  stateReconciler: false,
  debug: true,
};

export default function configureStore(preloadedState, middlewares, rootReducer) {
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    persistReducer(config, rootReducer),
    preloadedState,
    composeEnhancers(middlewares),
  );
}
