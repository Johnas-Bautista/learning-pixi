const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map', // Helps you find errors in your original code
  devServer: {
    static: './dist',
    hot: true,
    port: 8080,
  },
});