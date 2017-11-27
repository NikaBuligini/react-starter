// @flow

import React from 'react';

type Props = {
  interval: number,
  onExpire: Function,
  children: Function,
};

type State = {
  timeLeft: number,
};

class Countdown extends React.PureComponent<Props, State> {
  state = {
    timeLeft: -1,
  };

  componentDidMount() {
    this.startCountdown(this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.interval !== nextProps.interval) {
      this.startCountdown(nextProps);
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  startCountdown = (props: Props) => {
    this.setState({ timeLeft: props.interval });

    if (this.interval) {
      this.interval = setInterval(this.decrement, 1000);
    }
  };

  interval: ?number;

  decrement = () => {
    const { timeLeft } = this.state;

    if (timeLeft > 0) {
      this.setState({ timeLeft: timeLeft - 1 });
    } else {
      this.props.onExpire();
      this.startCountdown(this.props);
    }
  };

  render() {
    const { timeLeft } = this.state;

    if (timeLeft < 0) {
      return null;
    }

    return this.props.children({ timeLeft });
  }
}

export default Countdown;
