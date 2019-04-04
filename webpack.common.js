require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpeg|gif)(\?\S*)?$/,
        use: [
        // 'url-loader',
          'img-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS
          'resolve-url-loader', // translates CSS into CommonJS
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'resolve-url-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS
        ],
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Need More Lumber',
      template: 'index.html',
    }),
    new CleanWebpackPlugin(),
  ],
};
