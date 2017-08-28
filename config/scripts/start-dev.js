//  webpack-dev-server --config bundling/webpack.config.dev.js --progress --colors --hot

import webpack from 'webpack';
import path from 'path';
import nodemon from 'nodemon';
import log from 'npmlog';
import keypress from 'keypress';
import WebpackDevServer from 'webpack-dev-server';
import clientConfig from '../webpack.config.dev';
import canContinue from '../utils/canContinue';

log.level = 'warn';

function registerRefreshListener() {
  keypress(process.stdin);
  process.stdin.on('keypress', (ch, key) => {
    if (key && key.name === 'p') {
      process.stdout.write('\n');
      bundleServer(); // eslint-disable-line
    }
  });
  process.stdin.resume();
  log.info('webpack', 'Press "p" to hot-patch the server');
}

// -----------------------------------------------------------------------------
// Server
// -----------------------------------------------------------------------------
let startedServer = false;
function startServer() {
  nodemon({
    execMap: {
      js: 'node',
    },
    script: path.join(__dirname, '../../dist/main/server.js'),
    ignore: ['*'],
    watch: ['nothing/'],
    ext: 'noop',
  });

  nodemon
    .on('quit', () => log.info('nodemon', 'stopped server. bye'))
    .on('exit', () => log.info('nodemon', 'nodemon exited'))
    .on('crash', () => log.info('nodemon', 'nodemon crashed'))
    .on('stderr', () => log.info('nodemon', 'nodemon stderr'))
    .on('restart', () => log.info('nodemon', 'patched server'));
}

function bundleServer() {
  const serverConfig = require('../webpack.config.dev.server').default; // eslint-disable-line
  const serverCompiler = webpack(serverConfig);
  let bundleStart;

  serverCompiler.plugin('compile', () => {
    log.info('webpack', 'Bundling server...');
    bundleStart = Date.now();
  });

  serverCompiler.plugin('done', () => {
    log.info('webpack', `Bundled server in ${Date.now() - bundleStart}ms!`);
    if (startedServer) {
      nodemon.restart();
    } else {
      startedServer = true;
      startServer();

      registerRefreshListener();
    }
  });

  serverCompiler.run((err, stats) => {
    canContinue('server', err, stats);
  });
}

// ----------------------------------------------------------------------------
// Client
// ----------------------------------------------------------------------------
const clientCompiler = webpack(clientConfig);
let bundleClientStart;
clientCompiler.plugin('compile', () => {
  log.info('webpack', 'Bundling client...');
  bundleClientStart = Date.now();
});

clientCompiler.plugin('done', (stats) => {
  if (!canContinue('server', false, stats)) return;
  log.info('webpack', `Bundled client in ${Date.now() - bundleClientStart}ms!`);
  bundleServer();
});

const devServer = new WebpackDevServer(clientCompiler, {
  hot: true,
  historyApiFallback: false,
  contentBase: path.join('dist', 'main'),
  publicPath: clientConfig.output.publicPath,
  stats: { colors: true },
  quiet: false,
  noInfo: true,
  proxy: {
    '*': 'http://localhost:3000',
  },
});
devServer.listen(8080);

// work around a weird nodemon bug where something was logged to the console
// even after the process exited
process.on('SIGINT', (err) => {
  if (err) console.log(err.stack);
  process.exit();
});
