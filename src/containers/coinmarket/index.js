// @flow

import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import styled from 'styled-components';
import 'react-virtualized/styles.css';

import Container from '../../components/Container';
import Countdown from '../../components/Countdown';
// import CoinItem from './CoinItem';
import CoinList from './CoinList';
import { loadTicker } from '../../actions';
import { getTicker } from '../../selectors';
import type { Coin } from './types';

const fetchId = 'ticker';
const DEFAULT_INTERVAL = 120; // seconds

const CountdownText = styled.div`
  margin-bottom: 12px;
  color: #aaafb8;
`;

type Props = {
  loadTicker: (fetchId: string, force?: boolean, callback?: Function) => void,
  isFetching: boolean,
  loadedAt: ?number,
  coins: Array<Coin>,
};

type State = {
  updateInterval: number,
};

class CoinMarket extends React.PureComponent<Props, State> {
  state = {
    updateInterval: DEFAULT_INTERVAL,
  };

  componentDidMount() {
    this.props.loadTicker(fetchId);
    this.calculateInterval();
  }

  loadTicker = () => {
    this.props.loadTicker(fetchId, true, this.resetInterval);
  };

  resetInterval = () => {
    if (this.state.updateInterval !== DEFAULT_INTERVAL) {
      this.setState({ updateInterval: DEFAULT_INTERVAL });
    }
  };

  calculateInterval = () => {
    const { loadedAt } = this.props;

    if (loadedAt) {
      const diff = (Date.now() - loadedAt) / 1000;

      if (diff < DEFAULT_INTERVAL) {
        this.setState({ updateInterval: Math.round(DEFAULT_INTERVAL - diff) });
      } else {
        this.loadTicker();
      }
    }
  };

  render() {
    const { isFetching, coins } = this.props;

    return (
      <div>
        <Helmet>
          <title>CoinMarketCap - Title</title>
        </Helmet>
        <Container>
          <h4>CoinMarketCap</h4>
          {this.state.updateInterval ? (
            <Countdown interval={this.state.updateInterval} onExpire={this.loadTicker}>
              {({ timeLeft }) => (
                <CountdownText>
                  {`The price will be recalculated in ${timeLeft} seconds`}
                </CountdownText>
              )}
            </Countdown>
          ) : null}
          <CoinList isFetching={isFetching} coins={coins} />
        </Container>
      </div>
    );
  }
}

export default connect(state => getTicker(state, fetchId), { loadTicker })(CoinMarket);
