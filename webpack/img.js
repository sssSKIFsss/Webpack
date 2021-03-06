'use strict';

const path = require('path');
const PATHS = require('./paths');

module.exports = (mode) => {
	return {
		module: {
			rules: [{
				test: /\.(png|jpe?g|gif|svg)$/,
				include: [
					path.resolve(PATHS.src, PATHS.src_img),
					path.resolve(PATHS.src, PATHS.src_components)
				],
				use: [{
					loader: 'url-loader',
					options: {
						name: '[name].[ext]',
						// outputPath: PATHS.dist_img,
						outputPath: path.join(PATHS.dist_img),
						useRelativePath: true,
						limit: 1024
					}
				}].concat(mode === 'development' ? [] : [{
					// minify png, jpeg, gif, svg and webp images with imagemin
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
						// the webp option will enable webp
						webp: {
							quality: 75
						}
					}
				}])
			}]
		}
	};
};
