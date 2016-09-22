// webpack configuration that only builds the petclinic.css file
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const entries = [
  './src/styles/less/petclinic.less'
];


module.exports = {
  devtool: 'sourcemap',
  entry: entries,
  output: {
    path: path.join(__dirname, 'public/dist/'),
    publicPath: '/dist',
    filename: 'petclinic.css',
  },
  plugins: [
    new ExtractTextPlugin('petclinic.css')
  ],
  resolveLoader: {
    'fallback': path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: 'style!css!less',
        loader: ExtractTextPlugin.extract('style', 'css!less'),
        include: path.join(__dirname, 'src/styles')
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=25000'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=/fonts/[name].[ext]'
      }
    ]
  },
  tslint: {
    emitErrors: true,
    failOnHint: true
  }
};
