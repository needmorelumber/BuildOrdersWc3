 const merge = require('webpack-merge');
 const path = require('path');
 const common = require('./webpack.common.js');
const webpack = require('webpack')
 

 module.exports = merge(common, {
   devtool: 'inline-source-map',
   devServer: {
    historyApiFallback: true,
    compress: false,
    port: 3000,
    proxy: {
      "/api": "http://localhost:4200"
      }
    },
  devtool: 'eval',

  entry: [
    './index'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
 });