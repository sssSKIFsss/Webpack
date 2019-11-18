const webpack = require('webpack');
const CssExtractPlugin = require('mini-css-extract-plugin');
// noinspection JSUnresolvedVariable
const ENV = require('yargs').argv.env;

const PATHS = require('./paths')();

module.exports = function () {
	return {
		module: {
			rules: [{
				test: /\.css$/,
				exclude: /(node_modules|webpack|dist|images|fonts|pug|js)/,
				use: [
					"style-loader",
					{
						loader: CssExtractPlugin.loader,
						// options: {
						// 	// hmr: ENV ==='development'
						// }
					},{
						loader: "css-loader",
						options: {
							sourceMap: true,
							importLoaders: 2 // postcss & resolve-url loaders used
						}
					},{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							config: {
								path: PATHS.project + PATHS.config.postcss
							}
						}
					},{
						// для перезаписи путей используется resolve-url-loader
						loader: 'resolve-url-loader',
						options: { sourceMap: true }
					}
				]
			},{
				test: /\.scss$/,
				exclude: /(node_modules|webpack|dist|images|fonts|pug|js)/,
				use: [
					"style-loader",
					CssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 3, // postcss & resolve-url & sass loaders used
							sourceMap: true
						}
					},{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							config: {
								path: PATHS.project + PATHS.config.postcss
							}
						}
					},{
						// для перезаписи путей используется resolve-url-loader
						loader: 'resolve-url-loader',
						options: {
							sourceMap: true
						}
					},{
						loader: 'sass-loader',
						options: { sourceMap: true}
					}
				]
			}]
		},
		plugins: [
			new webpack.SourceMapDevToolPlugin({
				filename: '[file].map'
			}),
			new CssExtractPlugin({
				filename: PATHS.dist.css + PATHS.dist.css_file
			})
		]
	}
};
