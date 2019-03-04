const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const webpack = require('webpack')


 module.exports = merge(common, {
   devtool: 'inline-source-map',
         entry: [
          path.resolve('/usr/src/app/index.js')
      ],
      output: {
        path: path.resolve(__dirname, 'dist/js/'),
        filename: 'bundle.js'
      },
   devServer: {
    historyApiFallback: true,
    compress: false,
    port: 3000,
    proxy: {
      "/api": "http://localhost:4200"
      }
    },
  devtool: 'eval',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
 });
