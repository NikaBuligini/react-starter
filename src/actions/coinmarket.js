// @flow

import { CALL_API, Schemas } from '../middlewares/api';
import { getTicker } from '../selectors';
import type { Dispatch, GetState, ApiCallback } from './types';

export const TICKER_REQUEST: string = 'TICKER_REQUEST';
export const TICKER_SUCCESS: string = 'TICKER_SUCCESS';
export const TICKER_FAILURE: string = 'TICKER_FAILURE';

function fetchTicker(fetchId: string, callback: ?ApiCallback) {
  return {
    key: fetchId,
    [CALL_API]: {
      types: [TICKER_REQUEST, TICKER_SUCCESS, TICKER_FAILURE],
      endpoint: 'https://api.coinmarketcap.com/v1/ticker/',
      schema: Schemas.COIN_ARRAY,
      showProgress: true,
      debounce: 2000,
      meta: {
        withoutContentType: true,
      },
      callback,
    },
  };
}

export function loadTicker(fetchId: string, callback?: ApiCallback) {
  return (dispatch: Dispatch, getState: GetState) => {
    const { coins: loadedCoins } = getTicker(getState(), 'ticker');

    if (loadedCoins.length === 0) {
      dispatch(fetchTicker(fetchId, callback));
    }
  };
}
