// @flow

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { connect } from 'react-redux';

import LoadingIndicator from '../../components/LoadingIndicator';
import CoinItem from './CoinItem';
import { loadTicker } from '../../actions';
import { getTicker } from '../../selectors';

const fetchId = 'ticker';

const CoinsWrapper = styled.div`
  margin-bottom: 12px;

  thead tr th {
    text-align: left;
  }
`;

const CoinList = ({ isFetching, coins }: { isFetching: boolean, coins: Array<Object> }) => {
  if (isFetching) {
    return <LoadingIndicator />;
  }

  return (
    <CoinsWrapper>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Market Cap</th>
            <th>Price</th>
            <th>Volume (24h)</th>
            <th>Circulating Supply</th>
            <th>Change (24h)</th>
          </tr>
        </thead>
        <tbody>{coins.map(coin => <CoinItem key={coin.id} coin={coin} />)}</tbody>
      </table>
    </CoinsWrapper>
  );
};

type Props = {
  loadTicker: (fetchId: string, callback?: Function) => void,
  isFetching: boolean,
  coins: Array<Object>,
};

class CoinMarket extends React.PureComponent<Props> {
  componentDidMount() {
    this.loadTicker();
  }

  loadTicker = () => {
    this.props.loadTicker(fetchId);
  };

  render() {
    const { isFetching, coins } = this.props;

    return (
      <div>
        <Helmet>
          <title>CoinMarketCap - Title</title>
        </Helmet>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h4>CoinMarketCap</h4>
              <CoinList isFetching={isFetching} coins={coins} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => getTicker(state, fetchId), { loadTicker })(CoinMarket);
