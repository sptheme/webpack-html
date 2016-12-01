var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: {
    vendor: ['jquery', 'tether'],
    theme: './src/scripts/index.js'
  },
  output: {
    path: path.resolve(__dirname, "public/js/"), // the target directory for all output files
    publicPath: '/js/', // the url to the output directory resolved relative to the HTML page
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin({ filename: '../css/style.min.css', allChunks: true }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(PRODUCTION)
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loaders: 'css-loader?minimize',
      exclude: /node_modules/
    }]
  }
}
