// @flow

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Column, Table, WindowScroller } from 'react-virtualized';

import LoadingIndicator from '../../components/LoadingIndicator';
import type { Coin } from './types';

const CoinsWrapper = styled.div`
  margin-bottom: 12px;

  thead tr th {
    text-align: left;
  }

  .ReactVirtualized__Table__headerRow {
    text-transform: none;
  }
`;

const styles = {
  rightAlignedCell: {
    textAlign: 'right',
  },
};

function nameCellRenderer({ cellData, rowData }) {
  return <Link to={`/coinmarketcap/${rowData.id}`}>{cellData}</Link>;
}

function priceCellRenderer({ cellData }) {
  return `$${cellData}`;
}

const ColorfulCell = styled.div`
  color: ${p => p.color};
`;

function changeCellRenderer({ cellData }) {
  const isPositive = Number(cellData) >= 0;

  return (
    <ColorfulCell color={isPositive ? 'green' : 'red'}>
      {isPositive ? `+${cellData}` : cellData}%
    </ColorfulCell>
  );
}

const CoinList = ({ isFetching, coins }: { isFetching: boolean, coins: Array<Coin> }) => {
  if (isFetching && coins.length === 0) {
    return <LoadingIndicator />;
  }

  return (
    <CoinsWrapper>
      <WindowScroller>
        {({ height, isScrolling, onChildScroll, scrollTop }) => (
          <Table
            width={900}
            autoHeight
            height={height}
            isScrolling={isScrolling}
            onScroll={onChildScroll}
            headerHeight={20}
            rowHeight={30}
            rowCount={coins.length}
            rowGetter={({ index }) => coins[index]}
            scrollTop={scrollTop}
          >
            <Column label="#" dataKey="rank" width={35} />
            <Column label="Name" dataKey="name" width={150} cellRenderer={nameCellRenderer} />
            <Column
              label="Market Cap"
              dataKey="marketCapUsd"
              width={170}
              style={styles.rightAlignedCell}
            />
            <Column
              label="Price"
              dataKey="priceUsd"
              width={150}
              cellRenderer={priceCellRenderer}
              style={styles.rightAlignedCell}
            />
            <Column
              label="Volume (24h)"
              dataKey="24hVolumeUsd"
              width={170}
              style={styles.rightAlignedCell}
            />
            <Column
              label="Circulating Supply"
              dataKey="availableSupply"
              width={150}
              style={styles.rightAlignedCell}
            />
            <Column
              label="Change (24h)"
              dataKey="percentChange24h"
              width={150}
              cellRenderer={changeCellRenderer}
              style={styles.rightAlignedCell}
            />
            <Column
              label="Change (1h)"
              dataKey="percentChange1h"
              width={150}
              cellRenderer={changeCellRenderer}
              style={styles.rightAlignedCell}
            />
            <Column
              label="Change (7d)"
              dataKey="percentChange7d"
              width={150}
              cellRenderer={changeCellRenderer}
              style={styles.rightAlignedCell}
            />
          </Table>
        )}
      </WindowScroller>
    </CoinsWrapper>
  );
};

export default CoinList;
