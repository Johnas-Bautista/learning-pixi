const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const __src = path.resolve(__dirname, 'src');

module.exports = {
  entry: path.resolve(__src, 'index.js'), 
  
  // ADD THIS SECTION BELOW
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__src, 'index.html'), 
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'base', to: 'assets', noErrorOnMissing: true },
        { from: path.resolve(__src, 'Assets'), to: 'Assets', noErrorOnMissing: true }
      ],
    }),
  ],
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};