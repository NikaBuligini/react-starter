// @flow

import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import type { Match } from 'react-router-dom';

import Container from '../../components/Container';
import { loadCurrency, loadCurrencyGraph } from '../../actions';
import { getCurrency, getGraph } from '../../selectors';
import type { Coin } from './CoinItem';
import CurrencyItem from './CurrencyItem';
import CurrencyStockchart from './CurrencyStockchart';
import type { GraphFetch } from './CurrencyStockchart';

type Props = {
  currencyFetch: {
    isFetching: boolean,
    currency: ?Coin,
  },
  graphFetch: GraphFetch,
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

  handleStockchartSelection = (event: any) => {
    console.log(event.xAxis[0].axis.dataMin);
    console.log(event.xAxis[0].axis.dataMax);
  };

  render() {
    const { currencyFetch, graphFetch } = this.props;

    return (
      <div>
        <Helmet>
          <title>{this.props.match.params.currency} - Title</title>
        </Helmet>
        <Container>
          <CurrencyItem {...currencyFetch} />
          <CurrencyStockchart
            fetchStatus={graphFetch}
            onSelection={this.handleStockchartSelection}
          />
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state: Object, ownProps: Props) {
  const { currency: currencyName } = ownProps.match.params;

  if (!currencyName) {
    return {
      currencyFetch: { isFetching: false },
      graphFetch: { isFetching: false },
    };
  }

  const currencyFetch = getCurrency(state, currencyName);
  const graphFetch = getGraph(state, currencyName);

  return { currencyFetch, graphFetch };
}

export default connect(mapStateToProps, {
  loadCurrency,
  loadCurrencyGraph,
})(Currency);
