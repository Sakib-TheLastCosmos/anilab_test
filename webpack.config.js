const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },


  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },

  module: {
   rules: [
      { 
        test: /\.txt$/, 
        use: 'raw-loader' 
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ filename: 'index.html', template: './src/index.html' })],

};

