/* eslint-disable no-console */

import path from 'path';
import http from 'http';
import express from 'express';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import favicon from 'serve-favicon';
import handleRequest from './handleRequest';

const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';
const app = express();
const server = http.createServer(app);

app.disable('x-powered-by');
app.use(compress()); // should be first middleware
app.use(cookieParser());

if (IS_DEVELOPMENT) {
  app.use(favicon(path.resolve(__dirname, '../main/assets/favicon.ico')));

  const createDevelopmentProxy = require('./createDevelopmentProxy').default; // eslint-disable-line
  createDevelopmentProxy(app);
} else {
  app.use(favicon(path.resolve(__dirname, '../dist/main/assets/favicon.ico')));

  const blackListedWordsForGzip = [];

  app.get('/assets/*.js', (req, res, next) => {
    const isBlackListed = new RegExp(blackListedWordsForGzip.join('|')).test(req.url);
    if (!isBlackListed) {
      req.url += '.gz';
      res.set('Content-Encoding', 'gzip');
    }
    next();
  });

  app.use(
    '/assets',
    express.static(path.resolve(__dirname, '../dist/main/assets'), {
      maxage: '2h', // two hour
    }),
  );
}

app.get('*', handleRequest);

const PORT = process.env.PORT || 8000;
server.listen(PORT, '0.0.0.0', err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Listening at http://localhost:${PORT}`);
  }
});
