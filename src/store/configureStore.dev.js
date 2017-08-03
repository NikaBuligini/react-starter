import { createStore, compose } from 'redux';
import { autoRehydrate } from 'redux-persist';

/* eslint-disable no-underscore-dangle */
export default function configureStore(preloadedState, middlewares, rootReducer) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(middlewares, autoRehydrate()),
  );
  /* eslint-enable */

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept();
  }

  return store;
}
