import path from 'path';
import webpack from 'webpack';
import * as stats from './plugins/stats';
import progress from './plugins/progress';
import getNodeModules from './utils/getNodeModules';

const nodeModules = getNodeModules();

export default {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),

  entry: ['babel-polyfill', path.resolve(__dirname, '../server/index.js')],
  target: 'node',
  node: {
    console: true,
    global: false,
    __dirname: false,
    __filename: false,
  },
  recordsPath: path.join(__dirname, '../dist/main/records.json'),
  output: {
    path: path.resolve(__dirname, '../dist/main/assets'),
    pathinfo: true,
    filename: path.join('..', 'server.js'),
    publicPath: '/assets/',
    libraryTarget: 'commonjs2',
  },
  externals: nodeModules,
  module: {
    loaders: [
      {
        test: /\.(jpe?g|png|gif|svg|json|txt|woff2?|svg)$/i,
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
      { test: /\.css$/, loader: 'fake-style!css?modules&localIdentName=[hash:base64]' },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    // new webpack.BannerPlugin('require("source-map-support").install();', { raw: true }),
    new webpack.DefinePlugin({
      CLIENT: false,
      SERVER: true,
      SERVER_API: false,
      DEVELOPMENT: false,
      PRODUCTION: true,
      'process.env.NODE_ENV': JSON.stringify('production'),
      API_SECRET: JSON.stringify(process.env.API_SECRET || 'MY_SUPER_API_SECRET'),
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
