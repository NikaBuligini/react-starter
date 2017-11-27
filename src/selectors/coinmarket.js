/* eslint-disable import/prefer-default-export */
// @flow

function mapIdsToCoins(state: Object, ids: Array<number>) {
  return ids.map(id => state.entities.coins[id]);
}

export function getTicker(state: Object, uuid: string) {
  const fetchStatus = state.fetch.tickersByUuid[uuid];

  if (fetchStatus) {
    const { isFetching, ids, loadedAt } = fetchStatus;

    return {
      isFetching,
      coins: mapIdsToCoins(state, ids),
      loadedAt,
    };
  }

  return { isFetching: false, coins: [] };
}

export function getCurrency(state: Object, name: string) {
  const fetchStatus = state.fetch.currenciesByName[name];

  if (fetchStatus) {
    const { isFetching } = fetchStatus;
    return {
      isFetching,
      currency: state.entities.coins[name],
    };
  }

  return { isFetching: false, currency: undefined };
}
