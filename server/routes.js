// @flow

import express from 'express';
import { createError } from './server-utils';
import handleRequest, { handler } from './handleRequest';
import callApi from './callApi';
import { loadContributors } from '../src/actions/contributors';
import { loadTicker } from '../src/actions/coinmarket';
import logger from './logger';

const router = express.Router();

router.get(
  '/contributors',
  handler((req, store, render) => {
    logger.info('request for /contributors received');
    store.dispatch(loadContributors('facebook', 'react', true, () => render(store)));
  }),
);

router.get(
  '/coinmarketcap',
  handler((req, store, render) => {
    logger.info('request for /coinmarketcap received');
    store.dispatch(loadTicker('ticker', true, () => render(store)));
  }),
);

router.get('/crash', (req: express$Request, res: express$Response, next: express$NextFunction) => {
  next(createError(500, 'Please login to view this page.'));
});

router.get(
  '/graphs/:currency',
  async (req: express$Request, res: express$Response, next: express$NextFunction) => {
    const { response, error } = await callApi(
      `https://graphs2.coinmarketcap.com/currencies/${req.params.currency}`,
    );

    if (response) {
      res.json(response);
    } else {
      next(createError(500, error));
    }
  },
);

router.get('*', /* cache.routeHtml, */ handleRequest);

export default router;
