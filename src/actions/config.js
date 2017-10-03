// @flow
/* eslint-disable import/prefer-default-export */

import type { Dispatch } from 'redux';

import { CALL_API } from '../middlewares/api';

export function sendToErrorReporting(error: any, info: any) {
  return (dispatch: Dispatch<*>) => {
    // report to server
  };
}
