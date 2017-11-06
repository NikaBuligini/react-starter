// @flow

import express from 'express';
import createError from 'http-errors';
import handleRequest, { handler } from './handleRequest';
import { loadContributors } from '../src/actions/contributors';

const router = express.Router();

router.get(
  '/contributors',
  handler((req, store, render) => {
    store.dispatch(loadContributors('facebook', 'react', true, () => render(store)));
  }),
);

router.get('/crash', (req: express$Request, res: express$Response, next: express$NextFunction) => {
  next(createError(500, 'Please login to view this page.'));
});

router.get('*', /* cache.routeHtml, */ handleRequest);

export default router;
