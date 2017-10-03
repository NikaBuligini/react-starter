// @flow

import React from 'react';
import { connect } from 'react-redux';
import { sendToErrorReporting } from '../../actions';

type Props = {
  sendToErrorReporting: (error: any, info: any) => void,
  children: React$Node,
};

type State = {
  hasError: boolean,
};

function getDisplayName(WrappedComponent: React$ComponentType<*>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function withErrorBoundary(WrappedComponent: React$ComponentType<*>) {
  class ComponentErrorBoundary extends React.Component<Props, State> {
    state = {
      hasError: false,
    };

    componentDidCatch(error: any, info: any) {
      // display fallback UI
      this.setState({ hasError: true });

      // log the error to an error reporting service
      this.props.sendToErrorReporting(error, info);
    }

    render() {
      if (this.state.hasError) {
        return <div>Sorry, something went wrong.</div>;
      }

      return <WrappedComponent {...this.props} />;
    }
  }

  ComponentErrorBoundary.displayName = `withErrorBoundary(${getDisplayName(WrappedComponent)})`;

  // return connect(null, {
  //   sendToErrorReporting,
  // })(ComponentErrorBoundary);
  return ComponentErrorBoundary;
}

export { withErrorBoundary };

export default (...args: Array<*>) => {
  const WrappedComponent = withErrorBoundary(...args);

  return connect(null, {
    sendToErrorReporting,
  })(WrappedComponent);
};
