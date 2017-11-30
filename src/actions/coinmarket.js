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
      meta: {
        withoutContentType: true,
      },
      callback,
    },
  };
}

export function loadTicker(fetchId: string, force?: boolean = false, callback?: ApiCallback) {
  return (dispatch: Dispatch, getState: GetState) => {
    const fetchStatus = getTicker(getState(), 'ticker');

    if (force || fetchStatus.coins.length === 0) {
      dispatch(fetchTicker(fetchId, callback));
    }
  };
}

export const CURRENCY_REQUEST: string = 'CURRENCY_REQUEST';
export const CURRENCY_SUCCESS: string = 'CURRENCY_SUCCESS';
export const CURRENCY_FAILURE: string = 'CURRENCY_FAILURE';

function fetchCurrency(currency: string, callback: ?ApiCallback) {
  return {
    key: currency,
    [CALL_API]: {
      types: [CURRENCY_REQUEST, CURRENCY_SUCCESS, CURRENCY_FAILURE],
      endpoint: `https://api.coinmarketcap.com/v1/ticker/${currency}/`,
      schema: Schemas.COIN_ARRAY,
      showProgress: true,
      meta: {
        withoutContentType: true,
      },
      callback,
    },
  };
}

export function loadCurrency(currency: string, callback?: ApiCallback) {
  return (dispatch: Dispatch) => {
    dispatch(fetchCurrency(currency, callback));
  };
}

export const CURRENCY_GRAPH_REQUEST: string = 'CURRENCY_GRAPH_REQUEST';
export const CURRENCY_GRAPH_SUCCESS: string = 'CURRENCY_GRAPH_SUCCESS';
export const CURRENCY_GRAPH_FAILURE: string = 'CURRENCY_GRAPH_FAILURE';

function fetchCurrencyGraph(currency: string, callback: ?ApiCallback) {
  return {
    key: currency,
    [CALL_API]: {
      types: [CURRENCY_GRAPH_REQUEST, CURRENCY_GRAPH_SUCCESS, CURRENCY_GRAPH_FAILURE],
      endpoint: `/graphs/${currency}/`,
      showProgress: true,
      meta: {
        withoutContentType: true,
      },
      callback,
    },
  };
}

export function loadCurrencyGraph(currency: string, callback?: ApiCallback) {
  return (dispatch: Dispatch) => {
    dispatch(fetchCurrencyGraph(currency, callback));
  };
}
