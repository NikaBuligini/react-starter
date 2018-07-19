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
  mode: 'development',
  externals: nodeModules,
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg|txt|woff2)$/i,
        use: 'file-loader?emitFile=false',
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)(\?.*)?$/,
        use: 'file-loader?emitFile=false',
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.less$/,
        use: 'fake-style!css?modules&localIdentName=[name]__[local]!less',
      },
      {
        test: /\.css$/,
        use: 'fake-style!css?modules&localIdentName=[name]__[local]',
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
    }),
    new webpack.DefinePlugin({
      STATS: JSON.stringify(StatsPlugin.load(paths.statsJson, 'memoryOnly')),
    }),
  ],
};
