/* eslint-disable import/first */

import './support-debug';

import path from 'path';
import http from 'http';
import express from 'express';
import compress from 'compression';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
// import ConnectRedis from 'connect-redis';
import responseTime from 'response-time';
import favicon from 'serve-favicon';
import validateLocale from './middlewares/validateLocale';
import losesRedisConnection from './middlewares/losesRedisConnection';
import errorHandler from './middlewares/errorHandler';
// import cache from './middlewares/cache';
import routes from './routes';
import logger from './logger';

const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';
const app = express();
const server = http.createServer(app);

app.disable('x-powered-by');
app.use(compress()); // should be first middleware
app.use(favicon(path.resolve(__dirname, '../../public/favicon.ico')));

// const RedisStore = ConnectRedis(session);

// secret for cookieParser and session shoud be same string
const sessionConfig = {
  // store: new RedisStore(),
  resave: false,
  saveUninitialized: true,
  cookie: {},
  secret: 'super secret token',
};

if (IS_DEVELOPMENT) {
  const createDevelopmentProxy = require('./createDevelopmentProxy').default; // eslint-disable-line
  createDevelopmentProxy(app);
} else {
  // express security
  app.use(helmet());

  app.set('trust proxy', 1); // trust first proxy
  sessionConfig.cookie.secure = true; // serve secure cookies

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
    express.static(path.resolve(__dirname, '../main/assets'), {
      maxage: '2h', // two hour
    }),
  );
}

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(responseTime());

// setup sessions
app.use(session(sessionConfig));

// checks if session is connected with redis
app.use(losesRedisConnection);
app.use(validateLocale);

app.use('/', routes);

app.use(errorHandler);

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

const port = process.env.PORT || 8000;
server.listen(port, host, err => {
  if (err) {
    logger.error(err.message);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
