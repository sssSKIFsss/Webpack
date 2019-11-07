const webpack = require('webpack');
const CssExtractPlugin = require('mini-css-extract-plugin');
const PATHS = require('./paths')();

module.exports = function () {
	return {
		module: {
			rules: [{
				test: /\.css$/,
				exclude: /(node_modules|webpack|dist|images|fonts|pug|js)/,
				use: [
					"style-loader",
					CssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {sourceMap: true}
					}, {
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							config: {
								path: PATHS.project + PATHS.config.postcss
							}
						}
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
						options: {sourceMap: true}
					},{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							config: {
								path: PATHS.project + PATHS.config.postcss
							}
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
