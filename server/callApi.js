// @flow

import fetch from 'isomorphic-fetch';
import { camelizeKeys } from 'humps';

type FetchResponse = {
  response?: any,
  error?: any,
};

export default async function callApi(
  endpoint: string,
  method: string = 'GET',
  body: Object = {},
): FetchResponse {
  let init = {
    method,
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body && init.headers['Content-Type'] === 'application/json') {
    init = { ...init, body: JSON.stringify(body) };
  } else if (body) {
    init = { ...init, body };
  }

  console.log(endpoint);

  const response = await fetch(endpoint, init);

  const json = await response.json();

  const camelizedJson = camelizeKeys(json);

  if (!response.ok) {
    return {
      error: Object.assign(camelizedJson, { status: response.status }),
    };
  }

  return {
    response: camelizedJson,
  };
}
