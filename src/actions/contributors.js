// @flow

import { CALL_API, Schemas } from '../middlewares/api';
import { getContributors } from '../selectors';

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

export function loadContributors(owner: string, repo: string, force: boolean) {
  return (dispatch: Function, getState: Function) => {
    const { contributors: loadedContributors } = getContributors(getState(), owner, repo);

    if (force || loadedContributors.length === 0) {
      dispatch(fetchContributors(owner, repo));
    }
  };
}
