// @flow

import React from 'react';
import styled from 'styled-components';

import LoadingIndicator from '../../components/LoadingIndicator';
import type { Coin } from './CoinItem';

const Change = styled.span`
  color: ${p => p.color};
`;

const PercentageChange = ({ value }: { value: string }) => {
  const isPositive = Number(value) >= 0;

  return <Change color={isPositive ? 'green' : 'red'}>({value})</Change>;
};

type Props = {
  isFetching: boolean,
  currency: ?Coin,
};

const CurrencyItem = ({ isFetching, currency }: Props) => {
  if (isFetching || !currency) {
    return <LoadingIndicator />;
  }

  return (
    <div>
      <h4>{currency.name}</h4>
      <div>
        <b>${currency.priceUsd}</b>
        {` `}
        <PercentageChange value={currency.percentChange24h} />
      </div>
    </div>
  );
};

export default CurrencyItem;
