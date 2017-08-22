const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageJson = require('./package');

module.exports = function(env) {
	return {
		entry: './src/index.js',
		output: {
			filename: packageJson.name + '.js',
			path: path.resolve(__dirname, 'dist'),
		},
		module: {
			rules: [{
				// See more here https://github.com/postcss/postcss-loader
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: [{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						},
					},
					'postcss-loader',
					],
				}),
			}],
		},
		devServer: {
			contentBase: path.join(__dirname, 'dist'),
			compress: true,
			port: 9000,
		},
		plugins: [
			new ExtractTextPlugin(packageJson.name + '.css'),
			new HtmlWebpackPlugin({
				env: env,
				author: packageJson.author,
				description: packageJson.description,
				title: 'Beyond prototype',
				template: 'src/index.ejs',
			}),
		],
	};
};
