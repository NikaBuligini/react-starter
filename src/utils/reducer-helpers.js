// @flow
/* eslint-disable import/prefer-default-export */

export function isFullyLoaded(action: Object, ids?: Array<number>) {
  const data = ids || action.response.result.data;

  return typeof action.limit === 'number' ? data.length < action.limit : false;
}
