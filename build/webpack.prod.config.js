var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var path = require('path');

var BASE_DIR = path.resolve(__dirname, '../');
var SRC_DIR = path.join(BASE_DIR, './src');
var DIST_DIR = path.join(BASE_DIR, './dist');

module.exports = {
    entry: {
      main: path.join(SRC_DIR, './index.js'),
    },

    output: {
      path: path.join(BASE_DIR, 'dist'),
      filename: '[name].[hash].js',
      publicPath: '/'
    },

    module: {
      loaders: [
        {
          // JavaScript Loaders
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          // Style Loaders (Sass, PostCSS)
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
              use: [
                { loader: "css-loader?minimize" }, // css-loader?minimize
                { loader: "postcss-loader",
                  options: { plugins() { return [require('autoprefixer')({
                      browsers: ['last 3 versions']
                    })]; }
                  }
                },
                { loader: "sass-loader" }
              ],
              fallback: "style-loader"
          }),
        },
        {
          // Image Assets
          test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[ext]'
          },
        }
      ]
    },

    plugins: [
      new CleanWebpackPlugin(['./dist'], {
        root: BASE_DIR,
        verbose: true,
        dry: false,
      }),
      new HtmlWebpackPlugin({
        template: 'index.html'
      }),
      new ExtractTextPlugin({
        filename: "css/[name].[contenthash].css",
      }),
      new UglifyJSPlugin()
    ],

};
