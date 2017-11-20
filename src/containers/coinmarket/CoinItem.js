// @flow

import React from 'react';
import styled from 'styled-components';

function numberWithCommas(number: string) {
  return Math.round(Number(number))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

type Coin = {
  id: string,
  name: string,
  '24hVolumeUsd': string,
  lastUpdated: string,
  marketCapUsd: string,
  percentChange1h: string,
  percentChange7d: string,
  percentChange24h: string,
  priceBtc: string,
  priceUsd: string,
  rank: string,
  symbol: string,
  maxSupply: string,
  availableSupply: string,
  totalSupply: string,
};

type Props = {
  coin: Coin,
};

const Wrapper = styled.tr``;

const InfoCell = styled.td`
  text-align: right;
  padding: 0 10px;
`;

const ColorfulInfoCell = styled(InfoCell)`
  color: ${p => p.color};
`;

const PriceCell = ({ value }) => <InfoCell>{`$${numberWithCommas(value)}`}</InfoCell>;

const CirculatingSupply = ({ coin }: { coin: Coin }) => (
  <InfoCell>{`${numberWithCommas(coin.availableSupply)} ${coin.symbol}`}</InfoCell>
);

const PercentageChange = ({ value }: { value: string }) => {
  const isPositive = Number(value) >= 0;

  return (
    <ColorfulInfoCell color={isPositive ? 'green' : 'red'}>
      {isPositive ? `+${value}` : value}
    </ColorfulInfoCell>
  );
};

const CoinItem = ({ coin }: Props) => (
  <Wrapper>
    <td>{coin.rank}</td>
    <td>{coin.name}</td>
    <PriceCell value={coin.marketCapUsd} />
    <PriceCell value={coin.priceUsd} />
    <PriceCell value={coin['24hVolumeUsd']} />
    <CirculatingSupply coin={coin} />
    <PercentageChange value={coin.percentChange24h} />
  </Wrapper>
);

export default CoinItem;
