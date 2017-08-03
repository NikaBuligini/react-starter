// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { setAuthorizationToken } from './middlewares/api';
import { getSession } from './selectors';
import App from './App';

class AppWrapper extends React.Component {
  state = {
    rehydrated: false,
  };

  componentDidMount() {
    persistStore(this.props.store, { whitelist: ['session'] }, () => {
      const { isAuthenticated, user } = getSession(this.props.store.getState());
      if (isAuthenticated) {
        setAuthorizationToken(user.accessToken);
      }

      this.setState({ rehydrated: true });
    });
  }

  props: {
    store: Object,
  };

  render() {
    if (!this.state.rehydrated) {
      return null;
    }

    return (
      <Provider store={this.props.store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default AppWrapper;
