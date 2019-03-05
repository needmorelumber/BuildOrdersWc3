const merge = require('webpack-merge');
require('uglifyjs-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const path = require('path');
const common = require('./webpack.common.js');


module.exports = merge(common, {
  devtool: 'source-map',
  entry: [
    './index',
  ],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
      },
    }),
  ],
});
