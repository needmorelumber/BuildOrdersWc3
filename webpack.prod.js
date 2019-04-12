const merge = require('webpack-merge');
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
  mode: 'production',
});
