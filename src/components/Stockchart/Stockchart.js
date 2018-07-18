// @flow

import React from 'react';
import {
  withHighcharts,
  HighchartsStockChart,
  Chart,
  Title,
  Subtitle,
  Legend,
  XAxis,
  YAxis,
  LineSeries,
  // RangeSelector,
  Tooltip,
  Navigator,
} from 'react-jsx-highstock';
import Highcharts from 'highcharts/highstock';

type NumberPair = Array<number>;

type Props = {
  title: string,
  subtitle: string,
  yAxisTitle: string,
  marketCapByAvailableSupply: Array<NumberPair>,
  priceBtc: Array<NumberPair>,
  priceUsd: Array<NumberPair>,
  volumeUsd: Array<NumberPair>,
};

class Stockchart extends React.PureComponent<Props> {
  render() {
    const {
      title,
      subtitle,
      yAxisTitle,
      priceUsd,
      priceBtc,
      volumeUsd,
      marketCapByAvailableSupply,
    } = this.props;

    return (
      <HighchartsStockChart>
        <Chart zoomType="x" />

        {title && <Title>{title}</Title>}
        {subtitle && <Subtitle>{subtitle}</Subtitle>}

        <Legend layout="vertical" align="right" verticalAlign="middle" />

        {/* <RangeSelector>
          <RangeSelector.Button count={1} type="day">1d</RangeSelector.Button>
          <RangeSelector.Button count={7} type="day">7d</RangeSelector.Button>
          <RangeSelector.Button count={1} type="month">1m</RangeSelector.Button>
          <RangeSelector.Button type="all">All</RangeSelector.Button>
          <RangeSelector.Input boxBorderColor="#7cb5ec" />
        </RangeSelector> */}

        <Tooltip />

        <XAxis />

        <YAxis id="marketCapByAvailableSupply">
          {yAxisTitle && <YAxis.Title>{yAxisTitle}</YAxis.Title>}
          <LineSeries
            id="marketCapByAvailableSupply"
            name="Market Cap"
            data={marketCapByAvailableSupply}
          />
        </YAxis>

        <YAxis id="priceUsd" opposite>
          <LineSeries id="priceBtc" name="Price (BTC)" data={priceBtc} visible={false} />
          <LineSeries id="priceUsd" name="Price (USD)" data={priceUsd} />
          <LineSeries id="volumeUsd" name="24h Vol" data={volumeUsd} visible={false} />
        </YAxis>

        <Navigator>
          <Navigator.Series seriesId="priceUsd" />
        </Navigator>
      </HighchartsStockChart>
    );
  }
}

export default withHighcharts(Stockchart, Highcharts);
