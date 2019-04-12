const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.common.js');


module.exports = merge(common, {
  devtool: 'inline-source-map',
  entry: ['./index.js'],
  output: {
    path: path.resolve(__dirname, 'dist/js/'),
    filename: 'bundle.js',
  },
  devServer: {
    historyApiFallback: true,
    compress: false,
    port: 3000,
    proxy: {
      '/api': 'http://localhost:4200',
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  mode: 'development',
});
