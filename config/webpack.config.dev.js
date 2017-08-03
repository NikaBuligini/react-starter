import path from 'path';
import webpack from 'webpack';
// template file is in server directory
// import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
// import CopyWebpackPlugin from 'copy-webpack-plugin'; // for copying files
import SitemapPlugin from 'sitemap-webpack-plugin';

import paths from './paths';

export default {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
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
          cacheDirectory: true,
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    // new HtmlWebpackPlugin({
    //   title: 'Title',
    //   template: path.resolve(__dirname, '../src/index.html'),
    //   filename: path.resolve(__dirname, './dist/template.html'),
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.min.js',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ExtractTextPlugin({
      filename: '[name].min.css',
      allChunks: true,
    }),
    new SitemapPlugin('https://tpcpay.ge', paths, {
      fileName: 'sitemap.xml',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
  },
};
