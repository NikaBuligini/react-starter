/* eslint-disable no-console */

import http from 'http';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevConfig from '../config/webpack.config.dev';
import webpackProdConfig from '../config/webpack.config.prod';
import handleRender from './handleRender';

const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';
const app = express();
const server = http.createServer(app);

if (IS_DEVELOPMENT) {
  const compiler = webpack(webpackDevConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackDevConfig.output.publicPath,
      contentBase: 'src',
      hot: true,
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false,
      },
    }),
  );

  app.use(
    webpackHotMiddleware(compiler, {
      log: console.log,
      noInfo: true,
      publicPath: webpackDevConfig.output.publicPath,
    }),
  );

  app.get('*', handleRender);
} else {
  const blackListedWordsForGzip = ['vendor'];

  app.get('*.js', (req, res, next) => {
    const isBlackListed = new RegExp(blackListedWordsForGzip.join('|')).test(req.url);
    if (!isBlackListed) {
      req.url += '.gz';
      res.set('Content-Encoding', 'gzip');
    }
    next();
  });

  app.use(express.static(webpackProdConfig.output.path));

  app.get('*', handleRender);
}

const PORT = process.env.PORT || 8000;
server.listen(PORT, '0.0.0.0', err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Listening at http://localhost:${PORT}`);
  }
});
