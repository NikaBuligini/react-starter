// @flow

import { CALL_API, Schemas } from '../middlewares/api';

export const CONTRIBUTORS_REQUEST: string = 'CONTRIBUTORS_REQUEST';
export const CONTRIBUTORS_SUCCESS: string = 'CONTRIBUTORS_SUCCESS';
export const CONTRIBUTORS_FAILURE: string = 'CONTRIBUTORS_FAILURE';

function fetchContributors(owner: string, repo: string) {
  return {
    key: `${owner}/${repo}`,
    [CALL_API]: {
      types: [CONTRIBUTORS_REQUEST, CONTRIBUTORS_SUCCESS, CONTRIBUTORS_FAILURE],
      endpoint: `repos/${owner}/${repo}/contributors`,
      schema: Schemas.USER_ARRAY,
      showProgress: true,
      debounce: 3000,
    },
  };
}

export function loadContributors(owner: string, repo: string) {
  return (dispatch: Function) => dispatch(fetchContributors(owner, repo));
}
