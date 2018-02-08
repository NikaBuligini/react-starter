import path from 'path';
import webpack from 'webpack';
import StatsPlugin from './plugins/StatsPlugin';
import getNodeModules from './utils/getNodeModules';
import paths from './paths';

const nodeModules = getNodeModules();

export default {
  devtool: 'source-map',
  context: paths.root,

  entry: ['webpack/hot/signal.js', 'babel-polyfill', paths.serverIndexJs],
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
      {
        test: /\.less$/,
        loader: 'fake-style!css?modules&localIdentName=[name]__[local]!less',
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
      },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    // new webpack.BannerPlugin('require("source-map-support").install();', { raw: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      // API_SECRET: JSON.stringify(process.env.API_SECRET || 'MY_SUPER_API_SECRET'),
      'process.env.RUNTIME_ENV': JSON.stringify('server'),
    }),
    new webpack.DefinePlugin({
      STATS: JSON.stringify(StatsPlugin.load()),
    }),
  ],
};
