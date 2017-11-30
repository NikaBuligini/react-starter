// @flow

import React from 'react';
import LoadingIndicator from '../../components/LoadingIndicator';
import Stockchart from '../../components/Stockchart';

export type GraphFetch = {
  isFetching: boolean,
  marketCapByAvailableSupply: any,
  priceBtc: any,
  priceUsd: any,
  volumeUsd: any,
};

type Props = {
  fetchStatus: GraphFetch,
  onSelection: Function,
};

const IS_SERVER = process.env.RUNTIME_ENV === 'server';

const CurrencyStockchart = ({ fetchStatus, onSelection }: Props) => {
  if (IS_SERVER) {
    return null;
  }

  const { isFetching, ...rest } = fetchStatus;

  if (isFetching) {
    return <LoadingIndicator />;
  }

  return (
    <Stockchart
      title="Solar Employment Growth by Sector, 2010-2016"
      subtitle="Source: thesolarfoundation.com"
      yAxisTitle="24h Vol"
      {...rest}
      onSelection={onSelection}
    />
  );
};

export default CurrencyStockchart;
