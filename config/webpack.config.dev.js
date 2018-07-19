import path from 'path';
import webpack from 'webpack';
// template file is in server directory
// import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
// import CopyWebpackPlugin from 'copy-webpack-plugin'; // for copying files
import SitemapPlugin from 'sitemap-webpack-plugin';

import StatsPlugin from './plugins/StatsPlugin';
import getClientEnvironment from './env';
import paths from './paths';
import sitemapPaths from './sitemap';

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = '/assets/';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = '';
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

export default {
  entry: {
    vendor: ['moment', 'isomorphic-fetch'],
    app: [
      'webpack-dev-server/client?http://0.0.0.0:8080',
      'webpack/hot/only-dev-server', // reload page on HRM fail on your own
      'babel-polyfill',
      paths.appIndexJs,
    ],
  },
  output: {
    path: paths.appAssets,
    pathinfo: true,
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath,
  },
  mode: 'development',
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, '../src/components/'),
      actions: path.resolve(__dirname, '../src/actions/'),
      reducers: path.resolve(__dirname, '../src/reducers/'),
      utils: path.resolve(__dirname, '../src/utils/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: 'file-loader?name=images/[name].[ext]',
      },
      { test: /\.woff2$/, use: 'url-loader?limit=10000' },
      {
        test: /\.(ttf|woff|woff2|eot|otf)(\?.*)?$/,
        use: 'file-loader?name=fonts/[name].[ext]',
      },
      {
        test: /\.(manifest|txt)$/i,
        use: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(env.stringified),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ExtractTextPlugin({
      filename: '[name].min.css',
      allChunks: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new SitemapPlugin('https://example.com', sitemapPaths, {
      fileName: 'sitemap.xml',
    }),
    new StatsPlugin({
      path: paths.statsJson,
      memoryOnly: true,
    }),
  ],
  devServer: {
    contentBase: paths.appDist,
    compress: true,
    publicPath: 'http://127.0.0.1:8080/',
  },
};
