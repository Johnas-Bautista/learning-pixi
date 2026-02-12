const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Create the shortcut
const __src = path.resolve(__dirname, 'src');

module.exports = {
  // Use the shortcut for the entry point
  entry: path.resolve(__src, 'index.js'), 
  
  plugins: [
    new HtmlWebpackPlugin({
      // Use the shortcut for the HTML template
      template: path.resolve(__src, 'index.html'), 
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'base', to: 'assets', noErrorOnMissing: true }
      ],
    }),
  ],
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};