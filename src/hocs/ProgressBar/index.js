// @flow

import React from 'react';
import ProgressBar from './ProgressBar';

type Props = {
  isActive: boolean,
};

type State = {
  progress: number,
};

function getDisplayName(WrappedComponent: React$ComponentType<*>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function withProgressBar(WrappedComponent: React$ComponentType<*>) {
  class ComponentWithProgressBar extends React.Component<Props, State> {
    state = {
      progress: -1,
    };

    componentWillUpdate(props: Props, state: State) {
      const { progress } = this.state;
      const { isActive: wasActive } = this.props;
      const { isActive } = props;

      // Start progress
      if (!wasActive && isActive) {
        this.updateProgress(0);
      }

      // Complete progress when status changes. But prevent state update while re-rendering.
      if (wasActive && !isActive && progress !== -1 && state.progress < 100) {
        this.updateProgress(100);
      }
    }

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
