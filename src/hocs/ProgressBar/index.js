// @flow

import React from 'react';
import type { RouterHistory, Location } from 'react-router-dom';
import ProgressBar from './ProgressBar';

type Props = {
  location: Location,
  history: RouterHistory,
};

type State = {
  progress: number,
  loadedRoutes: Array<string>,
};

function getDisplayName(WrappedComponent: React$ComponentType<*>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function withProgressBar(WrappedComponent: React$ComponentType<*>) {
  class ComponentWithProgressBar extends React.Component<Props, State> {
    state = {
      progress: -1,
      loadedRoutes: this.props.location && [this.props.location.pathname],
    };

    componentWillMount() {
      this.unsubscribeHistory =
        this.props.history &&
        this.props.history.listen((location: Location) => {
          if (this.state.loadedRoutes.indexOf(location.pathname) === -1) {
            this.updateProgress(0);
          }
        });
    }

    componentWillUpdate(props: Props, state: State) {
      const { loadedRoutes, progress } = this.state;
      const { pathname } = props.location;

      // Complete progress when route changes. But prevent state update while re-rendering.
      if (loadedRoutes.indexOf(pathname) === -1 && progress !== -1 && state.progress < 100) {
        this.updateProgress(100);
        this.addVisitedRoute(pathname);
      }
    }

    componentWillUnmount() {
      // Unset unsubscribeHistory since it won't be garbage-collected.
      this.unsubscribeHistory = undefined;
    }

    unsubscribeHistory: ?() => void;

    addVisitedRoute = (pathname: string) => {
      this.setState({ loadedRoutes: [...this.state.loadedRoutes, pathname] });
    };

    updateProgress = (progress: number) => {
      this.setState({ progress });
    };

    render() {
      return (
        <div>
          <ProgressBar percent={this.state.progress} updateProgress={this.updateProgress} />
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  }

  ComponentWithProgressBar.displayName = `withProgressBar(${getDisplayName(WrappedComponent)})`;

  return ComponentWithProgressBar;
}

export default withProgressBar;
