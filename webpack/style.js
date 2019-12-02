const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const sets = require("../webpack.settings");
const PATHS = sets.paths;
module.exports = function (mode) {
	return {
		module: {
			rules: [{
				test: /\.css$/,
				include: [
					path.resolve(PATHS.srcStyles),
					path.resolve(PATHS.srcComponents)
				],
				use: [
					"style-loader",
					{
						loader: MiniCssExtractPlugin.loader
						// options: {
						// 	// hmr: ENV ==="development"
						// }
					}, {
						loader: "css-loader",
						options: {
							sourceMap: true,
							// postcss & resolve-url loaders used
							importLoaders: 2
						}
					}, {
						loader: "postcss-loader",
						options: {
							sourceMap: true,
							config: {
								path: path.resolve(PATHS.config),
								ctx: {mode: mode}
							}
						}
					}, {
						// для перезаписи путей используется resolve-url-loader
						loader: "resolve-url-loader",
						options: { sourceMap: true }
					}
				]
			}, {
				test: /\.scss$/,
				include: [
					path.resolve(PATHS.srcStyles),
					path.resolve(PATHS.srcComponents)
				],
				use: [
					"style-loader",
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							// postcss & resolve-url & sass loaders used
							importLoaders: 3,
							sourceMap: true
						}
					}, {
						loader: "postcss-loader",
						options: {
							sourceMap: true,
							config: {
								path: path.resolve(PATHS.config),
								ctx: {mode: mode}
							}
						}
					}, {
						// для перезаписи путей используется resolve-url-loader
						loader: "resolve-url-loader",
						options: {
							sourceMap: true
						}
					}, {
						loader: "sass-loader",
						options: { sourceMap: true}
					}
				]
			}]
		},
		plugins: [
			new webpack.SourceMapDevToolPlugin({
				filename: "[file].map"
			}),
			new MiniCssExtractPlugin({
				filename: path.join(PATHS.distCSS, PATHS.distCssFile)
			})
		]
	};
};

// вариант:
// new OptimizeCssAssetsPlugin({
// 	cssProcessor: postcss([CSSMQPlacker])
// })
