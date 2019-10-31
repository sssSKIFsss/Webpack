'use strict';

const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const baseConfig = require('./webpack.base.config');

const productionConfig = merge(baseConfig, {
	mode: 'production',
	module: {
		rules: [{
			test: /\.(png|jpe?g|gif|svg)$/,
			use: [{
				// Minify PNG, JPEG, GIF, SVG and WEBP images with imagemin
				loader: 'image-webpack-loader',
				options: {
					mozjpeg: {
						progressive: true,
						quality: 70
					},
					// optipng.enabled: false will disable optipng
					optipng: {
						enabled: false,
					},
					pngquant: {
						quality: [0.65, 0.90],
						speed: 4
					},
					gifsicle: {
						interlaced: false,
					},
					// the webp option will enable WEBP
					webp: {
						quality: 75
					}
				}
			}]
		}]
	},
	plugins: [
		new CleanWebpackPlugin()
	]
});

module.exports = new Promise((resolve, reject) => {
	resolve(productionConfig);
	reject("error");
});
