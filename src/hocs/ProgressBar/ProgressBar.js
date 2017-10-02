// @flow

import React from 'react';
import Wrapper from './Wrapper';
import Percent from './Percent';

const MAX_PERCENT = 85;

type Props = {
  percent: number,
  updateProgress: (progress: number) => void,
  autoIncrement: boolean,
  intervalTime: number,
};

type State = {
  percent: number,
};

class ProgressBar extends React.Component<Props, State> {
  static defaultProps = {
    percent: -1,
    autoIncrement: true,
    intervalTime: 450,
  };

  state = {
    percent: this.props.percent,
  };

  componentDidMount() {
    this.handleProps(this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.interval) {
      // stop progress when new props come in.
      clearInterval(this.interval);
      this.interval = undefined;
    }

    if (this.timeout) {
      // clear timeout when new props come in.
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }

    // start progress with updated props.
    this.handleProps(nextProps);
  }

  componentWillUnmount() {
    // cleaning up interval and timeout.
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }

    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
  }

  increment = () => {
    let { percent } = this.state;

    percent += (Math.random() + 1 - Math.random()) * 3; // eslint-disable-line
    percent = percent < MAX_PERCENT ? percent : MAX_PERCENT;

    this.setState({ percent });
  };

  interval: ?number;

  handleProps = (props: Props) => {
    const { autoIncrement, percent, intervalTime } = props;

    if (autoIncrement && percent >= 0 && percent < 99) {
      this.interval = setInterval(this.increment, intervalTime);
    }

    if (percent >= 100) {
      this.setState({ percent: 99.9 }, () => {
        this.timeout = setTimeout(() => {
          this.setState({ percent: -1 }, () => this.props.updateProgress(-1));
        }, 400);
      });
    } else {
      this.setState({ percent });
    }
  };

  timeout: ?number;

  render() {
    const { percent } = this.state;

    // Hide progress bar if percent is less than 0.
    const isHidden = percent < 0 || percent >= 100;

    // Set `state.percent` as width.
    return (
      <Wrapper hidden={isHidden}>
        <Percent percent={percent} />
      </Wrapper>
    );
  }
}

export default ProgressBar;
