import path from 'path';
import webpack from 'webpack';
import stats from './plugins/stats';
import getNodeModules from './utils/getNodeModules';

const nodeModules = getNodeModules();

export default {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),

  entry: [
    'webpack/hot/signal.js',
    'babel-polyfill',
    path.resolve(__dirname, '../server/index.js'),
  ],
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
    // noParse: ['react', 'react-dom', 'moment'],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      { test: /\.less$/, loader: 'fake-style!css?modules&localIdentName=[name]__[local]!less' },
      { test: /\.css$/, loader: 'fake-style!css?modules&localIdentName=[name]__[local]' },
      { test: /\.(woff)$/, loader: 'fake-url?limit=100000' },
      { test: /\.(png|jpg|jpeg|svg)$/, loader: 'fake-url?limit=25000' },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    // new webpack.BannerPlugin('require("source-map-support").install();', { raw: true }),
    new webpack.DefinePlugin({
      CLIENT: false,
      SERVER: true,
      SERVER_API: false,
      DEVELOPMENT: true,
      PRODUCTION: false,
      'process.env.NODE_ENV': JSON.stringify('development'),
      API_SECRET: JSON.stringify(process.env.API_SECRET || 'MY_SUPER_API_SECRET'),
    }),
    new webpack.DefinePlugin({
      STATS: JSON.stringify(stats.load('memoryOnly')),
    }),
  ],
};
