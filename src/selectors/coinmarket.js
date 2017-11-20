/* eslint-disable import/prefer-default-export */
// @flow

function mapIdsToCoins(state: Object, ids: Array<number>) {
  return ids.map(id => state.entities.coins[id]);
}

export function getTicker(state: Object, uuid: string) {
  const fetchStatus = state.fetch.tickersByUuid[uuid];

  if (fetchStatus) {
    const { isFetching, ids } = fetchStatus;
    return {
      isFetching,
      coins: mapIdsToCoins(state, ids),
    };
  }

  return { isFetching: false, coins: [] };
}
