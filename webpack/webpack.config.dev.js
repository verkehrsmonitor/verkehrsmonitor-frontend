const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const Path = require('path');

const Config = require('../config.json');
const common = require('./webpack.common.js');
const publicPath = process.env.BASENAME || '/';

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  output: {
    chunkFilename: 'js/[name].chunk.js'
  },
  devServer: {
    contentBase: Path.resolve(__dirname, 'build'),
    compress: true,
    publicPath,
    historyApiFallback: true
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'BASENAME': JSON.stringify(publicPath)
    }),
    new HtmlWebpackPlugin({
      inject: true,
      siteUrl: Config.devUrl,
      template: Path.resolve(__dirname, '../src/index.html')
    }),
    new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: Path.resolve(__dirname, '../src'),
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        }
      },
      {
        test: /\.(js)$/,
        include: Path.resolve(__dirname, '../src'),
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
});