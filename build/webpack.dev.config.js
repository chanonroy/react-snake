var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var BASE_DIR = path.resolve(__dirname, '../');
var SRC_DIR = path.join(BASE_DIR, './src');
var DIST_DIR = path.join(BASE_DIR, './dist');

module.exports = {
    entry: {
      main: path.join(SRC_DIR, './index.js'),
    },

    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
      publicPath: '/'
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.scss$/,
            use: [
              {
                loader: 'style-loader'
              },
              {
                loader: "css-loader?minimize"
              },
              {
                loader: "postcss-loader",
                options: { plugins() { return [require('autoprefixer')({ browsers: ['last 3 versions'] })]; } }
              },
              {
                loader: "sass-loader"
              }
            ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|ico)$/,
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[ext]'
          },
        }
      ]
    },

    plugins: [
        new HtmlWebpackPlugin({
          template: 'index.html'
        }),
    ],

    devServer: {
      historyApiFallback: true,
      stats: 'errors-only',
    },

};
