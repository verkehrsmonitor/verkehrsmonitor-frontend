const Webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common.js');
const publicPath = process.env.BASENAME || '/';

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  stats: 'errors-only',
  bail: true,
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].chunk.js'
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'BASENAME': JSON.stringify(publicPath)
    }),
    new Webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    }),
    new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css/i,
        use : [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  }
});