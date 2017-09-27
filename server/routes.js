// @flow

import express from 'express';
import handleRequest, { handler } from './handleRequest';
import { loadContributors } from '../src/actions/contributors';

const router = express.Router();

router.get(
  '/contributors',
  handler((req, store, render) => {
    store.dispatch(loadContributors('facebook', 'react', true, () => render(store)));
  }),
);

router.get('*', /* cache.routeHtml, */ handleRequest);

export default router;
