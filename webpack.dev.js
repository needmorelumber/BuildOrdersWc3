 const merge = require('webpack-merge');
 const path = require('path');
 const common = require('./webpack.common.js');

 module.exports = merge(common, {
   devtool: 'inline-source-map',
   devServer: {
    historyApiFallback: true,
    compress: false,
    port: 3000,
    proxy: {
      "/api": "http://localhost:4200"
      }
    }
 });