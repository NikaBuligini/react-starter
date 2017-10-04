/**
 * Components using the react-router module require access to the Router context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap with a valid MemoryRouter.
 */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';

/* eslint-disable import/prefer-default-export */

export function wrapWithRouter(component, routerProps = {}) {
  return <MemoryRouter {...routerProps}>{React.cloneElement(component)}</MemoryRouter>;
}
