// @flow
/* eslint-disable import/prefer-default-export */

import { CALL_API } from '../middlewares/api';
import type { Dispatch } from './types';

export function sendToErrorReporting(error: any, info: any) {
  return (dispatch: Dispatch) => {
    // report to server
  };
}
