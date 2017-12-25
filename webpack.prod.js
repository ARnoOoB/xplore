const path = require('path');
const webpack = require('webpack');
const getCommon = require('./webpack.common.js');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = 'production';

module.exports = merge(getCommon(process.env.NODE_ENV), {
  devtool: 'eval',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      favicon: path.resolve(__dirname, 'src/favicon.png'),
    }),
    new CopyWebpackPlugin([{ from: 'src/images', to: 'images' }]),
    new ExtractTextPlugin('styles.css'),
    new UglifyJSPlugin({
      sourceMap: true,
    }),
  ],
});
