 const merge = require('webpack-merge');
 const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
 const common = require('./webpack.common.js');
 const webpack = require('webpack')
 const path = require('path')


 module.exports = merge(common, {
  devtool: 'source-map',
      entry: [
        './index'
      ],

      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
      },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': JSON.stringify('production')
    //   }
    // })
  ],
 });