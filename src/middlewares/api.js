// @flow

import { schema as Schema, normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import uuid from 'uuid/v4';
import { markAsUnauthorized } from '../actions';
import config from '../config';

const defaultHeaders: Object = {
  'Content-Type': 'application/json',
  // lang: 'en-US',
};

export function setAuthorizationToken(token: ?string) {
  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  } else {
    delete defaultHeaders.Authorization;
  }
}

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
async function callApi(
  endpoint,
  schema,
  method,
  customHeaders = {},
  body,
  meta,
): {
  response?: Object,
  error?: Object,
} {
  let init = {
    method,
    credentials: 'same-origin',
    headers: {
      ...defaultHeaders,
      ...customHeaders,
    },
  };

  if (meta && meta.withoutContentType) {
    delete init.headers['Content-Type'];
  }

  if (body && init.headers['Content-Type'] === 'application/json') {
    init = { ...init, body: JSON.stringify(body) };
  } else if (body) {
    init = { ...init, body };
  }

  const response = await fetch(`${config.BASE_URL}/${endpoint}`, init);

  if (response.status === 401) {
    return {
      error: { status: response.status },
    };
  }

  const json = await response.json();

  const camelizedJson = camelizeKeys(json);

  if (!response.ok) {
    return {
      error: Object.assign(camelizedJson, { status: response.status }),
    };
  }

  return {
    response: schema ? Object.assign({}, normalize(camelizedJson, schema)) : camelizedJson,
  };
}

/**
 * normalizr api example
 * ---------
 * const schema = new Schema.Entity(
 *   'entityName',
 *   { propertyName: schemaEntity },
 *   { idAttribute: 'propertyName' },
 * );
 */

const userSchema = new Schema.Entity('users');

// Schemas for Github API responses.
export const Schemas = {
  USER: userSchema,
  USER_ARRAY: [userSchema],
};

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API: any = Symbol('Call API');

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default (store: Object) => (next: Function) => async (action: Object) => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { schema, types, headers, body, meta, ...restOptions } = callAPI;
  const method = callAPI.method || 'GET';

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const additionalProps = {};

  if (restOptions.showProgress) {
    additionalProps.progressId = uuid();
  }

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType, ...additionalProps }));

  try {
    const { response, error } = await callApi(endpoint, schema, method, headers, body, meta);

    if (restOptions.debounce) {
      additionalProps.debounce = restOptions.debounce;
    }

    if (response) {
      next(actionWith({ type: successType, response, ...additionalProps }));

      if (meta && meta.onSuccess) {
        meta.onSuccess(response);
      }
    } else if (error) {
      next(
        actionWith({
          type: failureType,
          error: error.messages || ['Something bad happened'],
          errorCode: error.errorCode,
          ...additionalProps,
        }),
      );

      if (meta && meta.onFailure) {
        meta.onFailure(error);
      }

      if (error.status === 401) {
        next(markAsUnauthorized());
      }
    }
  } catch (error) {
    console.error(error); // eslint-disable-line
  }

  return true;
};
