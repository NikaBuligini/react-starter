import path from 'path';
import webpack from 'webpack';
import { argv } from 'yargs';

import * as stats from './plugins/stats';
import progress from './plugins/progress';
import getNodeModules from './utils/getNodeModules';
import paths from './paths';

let serverEntryJs = paths.serverIndexJs;

if (argv.clusters) {
  serverEntryJs = paths.serverClusterJs;
}

const nodeModules = getNodeModules();

export default {
  devtool: 'source-map',
  context: paths.root,

  entry: ['babel-polyfill', serverEntryJs],
  target: 'node',
  node: {
    console: true,
    global: false,
    __dirname: false,
    __filename: false,
  },
  recordsPath: paths.serverRecords,
  output: {
    path: paths.appAssets,
    pathinfo: true,
    filename: path.join('..', 'server.js'),
    publicPath: '/assets/',
    libraryTarget: 'commonjs2',
  },
  externals: nodeModules,
  module: {
    loaders: [
      {
        test: /\.(jpe?g|png|gif|svg|txt|woff2)$/i,
        loader: 'file-loader?emitFile=false',
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)(\?.*)?$/,
        loader: 'file-loader?emitFile=false',
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      { test: /\.less$/, loader: 'fake-style!css?modules&localIdentName=[hash:base64]!less' },
      { test: /\.css$/, loader: 'css-loader' },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    // new webpack.BannerPlugin('require("source-map-support").install();', { raw: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      // API_SECRET: JSON.stringify(process.env.API_SECRET || 'MY_SUPER_API_SECRET'),
      // STATS: JSON.stringify(stats.load('memoryOnly')),
      STATS: JSON.stringify(stats.load()),
    }),
    new webpack.ProgressPlugin((percentage, message) => {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);

      if (percentage !== 1) {
        process.stdout.write(`${progress(percentage)} ${message}`);
      }
    }),
  ],
};
