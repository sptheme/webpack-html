var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var DEVELOPMENT = process.env.NODE_ENV === 'development';
var PRODUCTION = process.env.NODE_ENV === 'production';

var entry = PRODUCTION
	?	[
			'./src/scripts/index.js'
		]
	:	[
			'./src/scripts/index.js',
			'webpack/hot/dev-server',
			'webpack-dev-server/client?http://localhost:8080'
		];

var plugins = PRODUCTION
	? 	[
				new webpack.optimize.UglifyJsPlugin(),
				new ExtractTextPlugin({ filename: '../css/style.min.css', allChunks: true })
			]
	: 	[	new webpack.HotModuleReplacementPlugin() ];

plugins.push(
	new webpack.DefinePlugin({
		DEVELOPMENT: JSON.stringify(DEVELOPMENT),
		PRODUCTION: JSON.stringify(PRODUCTION)
	})
);	

var cssLoader = PRODUCTION
	?	ExtractTextPlugin.extract({
			loader: 'css-loader?minimize'
		})
	: 	['style-loader', 'css-loader'];

module.exports = {
	devtool: 'cheap-eval-source-map',
	entry: entry,
	output: {
		path: path.resolve(__dirname, "public/js/"), // the target directory for all output files
		publicPath: PRODUCTION ? '/' : '/js/', // the url to the output directory resolved relative to the HTML page
		filename: PRODUCTION ? 'theme.min.js' : 'theme.js'
	},
	plugins: plugins,
	externals: {
		jquery: 'jQuery' //jquery is external and available at the global variable jQuery
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['babel-loader'],
			exclude: /node_modules/
		}, {
			test: /\.(png|jpg|gif)$/,
			loaders: ['url-loader?limit=10000&name=images/[hash:12].[ext]'],
			exclude: /node_modules/
		},{
			test: /\.css$/,
			loaders: cssLoader,
			exclude: /node_modules/
		}]
	}	
}