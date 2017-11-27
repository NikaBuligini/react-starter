import path from 'path';
import webpack from 'webpack';
import { argv } from 'yargs';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
// import CopyWebpackPlugin from 'copy-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import SitemapPlugin from 'sitemap-webpack-plugin';

import * as stats from './plugins/stats';
import progress from './plugins/progress';
import paths from './paths';
import getClientEnvironment from './env';
import sitemapPaths from './sitemap';

const optionalPlugins = [];

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = paths.servedPath;
// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = '';

// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

if (argv.analyzer) {
  optionalPlugins.push(new BundleAnalyzerPlugin());
}

export default {
  entry: {
    vendor: [
      'core-js',
      'history',
      'humps',
      'isomorphic-fetch',
      'lodash',
      'localforage',
      'moment',
      'normalizr',
      'react',
      'react-dom',
      'react-helmet',
      'react-intl',
      'react-redux',
      'react-router',
      'react-router-dom',
      'react-virtualized',
      'redux',
      'redux-persist',
      'styled-components',
    ],
    app: ['babel-polyfill', paths.appIndexJs],
  },
  output: {
    path: paths.appAssets,
    pathinfo: true,
    filename: '[name].[hash:8].js',
    chunkFilename: '[id].chunk.js',
    publicPath,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, '../src/components/'),
      actions: path.resolve(__dirname, '../src/actions/'),
      reducers: path.resolve(__dirname, '../src/reducers/'),
      utils: path.resolve(__dirname, '../src/utils/'),
    },
  },
  devtool: shouldUseSourceMap ? 'source-map' : false,
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
          compact: true,
        },
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin(env.stringified),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false,
        comparisons: false,
        drop_console: false,
      },
      output: {
        comments: false,
        ascii_only: true,
      },
      sourceMap: false,
    }),
    new ExtractTextPlugin({
      filename: '[name].[chunkhash:8].css',
      allChunks: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|html)$/,
      threshold: 0,
      minRatio: 0.8,
      // deleteOriginalAssets: true,
    }),
    new HtmlWebpackPlugin({
      title: 'Title',
      template: paths.appHtml,
      filename: path.resolve(__dirname, '../dist/main/template.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new SitemapPlugin('https://example.ge', sitemapPaths, {
      fileName: 'sitemap.xml',
      lastMod: true,
      changeFreq: 'monthly',
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProgressPlugin((percentage, message) => {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);

      if (percentage !== 1) {
        process.stdout.write(`${progress(percentage)} ${message}`);
      }
    }),
    ...optionalPlugins,
    function Stats() {
      this.plugin('done', statsData => {
        stats.save(statsData);
      });
    },
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};
