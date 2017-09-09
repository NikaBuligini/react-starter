/* eslint-disable no-console */

import path from 'path';
import http from 'http';
import express from 'express';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import ConnectRedis from 'connect-redis';
import favicon from 'serve-favicon';
import validateLocale from './middlewares/validateLocale';
import losesRedisConnection from './middlewares/losesRedisConnection';
import handleRequest from './handleRequest';

const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';
const app = express();
const server = http.createServer(app);

app.disable('x-powered-by');
app.use(compress()); // should be first middleware
app.use(cookieParser());

const RedisStore = ConnectRedis(session);

// secret for cookieParser and session shoud be same string
const sessionConfig = {
  store: new RedisStore(),
  resave: false,
  saveUninitialized: true,
  cookie: {},
  secret: 'super secret token',
};

if (IS_DEVELOPMENT) {
  app.use(favicon(path.resolve(__dirname, '../main/assets/favicon.ico')));

  const createDevelopmentProxy = require('./createDevelopmentProxy').default; // eslint-disable-line
  createDevelopmentProxy(app);
} else {
  app.set('trust proxy', 1); // trust first proxy
  sessionConfig.cookie.secure = true; // serve secure cookies

  app.use(favicon(path.resolve(__dirname, '../dist/main/assets/favicon.ico')));

  const blackListedWordsForGzip = [];

  app.get('/assets/*.js', (req, res, next) => {
    const isBlackListed = new RegExp(blackListedWordsForGzip.join('|')).test(
      req.url,
    );

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

// setup sessions
app.use(session(sessionConfig));

// checks if session is connected with redis
app.use(losesRedisConnection);

// validates locale value in cookies
app.use(validateLocale);

app.get('*', handleRequest);

const PORT = process.env.PORT || 8000;
server.listen(PORT, '0.0.0.0', err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Listening at http://localhost:${PORT}`);
  }
});
