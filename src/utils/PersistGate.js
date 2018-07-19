/* eslint-disable no-underscore-dangle */
// @flow

import React from 'react';
import type { Node } from 'react';

type Props = {
  onBeforeLift?: Function,
  children: Node,
  loading?: Node,
  persistor: Object,
  ignoreBootstrap?: boolean,
};

type State = {
  bootstrapped: boolean,
};

class PersistGate extends React.PureComponent<Props, State> {
  static defaultProps = {
    loading: null,
    ignoreBootstrap: false,
    onBeforeLift: undefined,
  };

  state = {
    bootstrapped: false,
  };

  componentDidMount() {
    this._unsubscribe = this.props.persistor.subscribe(this.handlePersistorState);
    this.handlePersistorState();
  }

  componentWillUnmount() {
    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }

  handlePersistorState = () => {
    const { persistor, onBeforeLift } = this.props;
    const { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (onBeforeLift) {
        Promise.resolve(onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }

      if (this._unsubscribe) {
        this._unsubscribe();
      }
    }
  };

  _unsubscribe: ?Function;

  render() {
    const { bootstrapped } = this.state;
    const { ignoreBootstrap, loading, children } = this.props;

    if (ignoreBootstrap) {
      return children;
    }

    return bootstrapped ? children : loading;
  }
}

export default PersistGate;
