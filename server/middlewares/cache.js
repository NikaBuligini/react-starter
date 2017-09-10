/* eslint-disable no-console */
// @flow

import * as client from '../redisClient';
import { write } from '../server-utils';

function serveWithCache(key: string, res: express$Response, next: Function) {
  client.get(key, (err, html) => {
    if (err) {
      next(err);
    } else {
      write(html, 'text/html', res);
    }
  });
}

function cache(key: string, value: any, expires: number) {
  const data = typeof value === 'string'
    ? value : JSON.parse(value);

  client.set(key, data, expires);
}

export default {
  routeHtml(req: express$Request, res: express$Response, next: Function) {
    const key = (req.method + req.url)
      .toLowerCase()
      .replace(/[:.]/g, '')
      .replace(/\//g, '_');

    req.cache = (html, expires) => {
      cache(key, html, expires);
    };

    client.exists(key, (err, reply) => {
      if (err) {
        next(err);
      } else if (reply === 1) {
        // serve with cached data if key is stored
        serveWithCache(key, res, next);
      } else {
        next();
      }
    });
  },
};
