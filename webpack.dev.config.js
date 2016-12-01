var path = require('path');
var webpack = require('webpack');

var DEVELOPMENT = process.env.NODE_ENV === 'development'; // injecting your Node.js environment

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: {
    vendor: ['jquery', 'tether'],
    theme:[
      './src/scripts/index.js',
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080'
    ]
  },
  output: {
    path: path.resolve(__dirname, "public/js/"), // the target directory for all output files
    publicPath: '/js/', // the url to the output directory resolved relative to the HTML page
    filename: '[name].js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      DEVELOPMENT: JSON.stringify(DEVELOPMENT)
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader'],
      exclude: /node_modules/
    }]
  }
}
