import path from 'path';
import webpack from 'webpack';
// template file is in server directory
// import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
// import CopyWebpackPlugin from 'copy-webpack-plugin'; // for copying files
import SitemapPlugin from 'sitemap-webpack-plugin';

import * as stats from './plugins/stats';
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
    loaders: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader?name=images/[name].[ext]',
      },
      { test: /\.woff2$/, loader: 'url-loader?limit=10000' },
      {
        test: /\.(ttf|woff|woff2|eot|otf)(\?.*)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
      {
        test: /\.scss$/,
        loaders: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader',
        }),
      },
      {
        test: /\.css/,
        loaders: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(env.stringified),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['react', 'vendor'],
      minChunks: Infinity,
      // name: 'vendor',
      // filename: 'vendor.min.js',
    }),
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
    function Stats() {
      this.plugin('done', statsData => {
        stats.save(statsData, 'memoryOnly');
      });
    },
  ],
  devServer: {
    contentBase: paths.appDist,
    compress: true,
    publicPath: 'http://127.0.0.1:8080/',
  },
};
