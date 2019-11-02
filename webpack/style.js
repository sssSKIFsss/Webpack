const webpack = require('webpack');
const CssExtractPlugin = require('mini-css-extract-plugin');
const pathPaths = require('./path');
const PATHS = pathPaths();

module.exports = function () {
	return {
		module: {
			rules: [{
				test: /\.css$/,
				use: [
					"style-loader",
					CssExtractPlugin.loader,
					//  exclude: '/node_modules/', // нужно ли ?
					{
						loader: "css-loader",
						options: {sourceMap: true}
					}
					, {
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							config: {
								path: PATHS.project + PATHS.config.postcss
							}
						}
					}
				]
			}, {
				test: /\.scss$/,
				use: [
					"style-loader",
					CssExtractPlugin.loader,
					//  exclude: '/node_modules/', // нужно ли ?
					{
						loader: 'css-loader',
						options: {sourceMap: true}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							config: {
								path: PATHS.project + PATHS.config.postcss
							}
						}
					},
				{
						loader: 'sass-loader',
						options: {sourceMap: true}
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
