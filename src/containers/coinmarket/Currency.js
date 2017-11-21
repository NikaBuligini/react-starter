// @flow

import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import type { Match } from 'react-router-dom';

import Container from '../../components/Container';
import { loadCurrency, loadCurrencyGraph } from '../../actions';
import { getCurrency } from '../../selectors';
import type { Coin } from './CoinItem';
import CurrencyItem from './CurrencyItem';

type Props = {
  isFetching: boolean,
  currency: ?Coin,
  match: Match,
  loadCurrency: (currency: string) => void,
  loadCurrencyGraph: (currency: string) => void,
};

class Currency extends React.PureComponent<Props> {
  componentDidMount() {
    const { currency } = this.props.match.params;

    if (currency) {
      this.props.loadCurrency(currency);
      this.props.loadCurrencyGraph(currency);
    }
  }

  render() {
    const { isFetching, currency } = this.props;

    return (
      <div>
        <Helmet>
          <title>{this.props.match.params.currency} - Title</title>
        </Helmet>
        <Container>
          <CurrencyItem isFetching={isFetching} currency={currency} />
        </Container>
      </div>
    );
  }
}

export default connect((state, ownProps) => getCurrency(state, ownProps.match.params.currency), {
  loadCurrency,
  loadCurrencyGraph,
})(Currency);
