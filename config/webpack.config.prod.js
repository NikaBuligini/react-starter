import path from 'path';
import webpack from 'webpack';
import { argv } from 'yargs';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
// import CopyWebpackPlugin from 'copy-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import SitemapPlugin from 'sitemap-webpack-plugin';

import stats from './plugins/stats';
import paths from './paths';

const optionalPlugins = [];

if (argv.analyzer === 'true') {
  optionalPlugins.push(new BundleAnalyzerPlugin());
}

export default {
  entry: {
    vendor: [
      'moment',
      'isomorphic-fetch',
    ],
    react: [
      'react',
      'react-dom',
      'redux',
      'react-router-dom',
      'history',
    ],
    app: [
      'babel-polyfill',
      path.resolve(__dirname, '../src/index.js'),
    ],
  },
  output: {
    path: path.resolve(__dirname, '../dist/main/assets'),
    pathinfo: true,
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/assets/',
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
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader?name=images/[name].[ext]',
      },
      { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000' },
      {
        test: /\.(ttf|woff|woff2|eot|otf)(\?.*)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
      { test: /\.(json|txt)$/, loader: 'file-loader?name=[name].[ext]' },
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new HtmlWebpackPlugin({
      title: 'Title',
      template: path.resolve(__dirname, '../src/index.html'),
      filename: path.resolve(__dirname, '../dist//main/template.html'),
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
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[hash:8].js',
    }),
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
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|html)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ExtractTextPlugin({
      filename: '[name].[chunkhash:8].css',
      allChunks: true,
    }),
    new SitemapPlugin('https://example.ge', paths, {
      fileName: 'sitemap.xml',
      lastMod: true,
      changeFreq: 'monthly',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProgressPlugin((percentage, message) => {
      // console.log(process.stdout.clearLine);
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(`${Math.floor(percentage * 100)}% ${message}`);
    }),
    ...optionalPlugins,
    function Stats() {
      this.plugin('done', (statsData) => {
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
