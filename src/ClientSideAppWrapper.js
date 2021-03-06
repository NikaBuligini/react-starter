// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import PersistGate from './utils/PersistGate';
import { setAuthorizationToken } from './middlewares/api';
import { getSession } from './selectors';
import App from './App';

function createPersistor({ store }) {
  return persistStore(store, () => {
    const { isAuthenticated, user } = getSession(store.getState());
    if (isAuthenticated) {
      setAuthorizationToken(user.accessToken);
    }
  });
}

type State = {
  persistor: any,
};

type Props = {
  store: Object,
};

class AppWrapper extends React.Component<Props, State> {
  state = {
    persistor: createPersistor(this.props),
  };

  render() {
    const { persistor } = this.state;
    const { store } = this.props;

    return (
      <PersistGate persistor={persistor} ignoreBootstrap>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </PersistGate>
    );
  }
}

export default AppWrapper;
