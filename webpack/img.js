'use strict';
//
const path = require('path');
const PATHS = require('./paths');

module.exports = (mode) => {
	return {
		module: {
			rules: [{
				test: /\.(png|jpe?g|gif|svg)$/,
				include: [
					path.resolve(PATHS.src, PATHS.srcImg),
					path.resolve(PATHS.src, PATHS.srcComponents)
				],
				exclude: [
					path.resolve(PATHS.src, PATHS.srcImg, PATHS.srcFavicon)
				],
				use: [{
					loader: 'url-loader',
					options: {
						name: '[name].[ext]',
						// outputPath: PATHS.dist_img,
						outputPath: path.join(PATHS.distImg),
						useRelativePath: true,
						limit: 1024
					}
				}].concat(mode === 'development' ? [] : [{
					loader: 'image-webpack-loader',
					options: {
						mozjpeg: {
							progressive: true,
							quality: 70
						},
						optipng: {
							enabled: false
						},
						pngquant: {
							quality: [0.65, 0.90],
							speed: 4
						},
						gifsicle: {
							interlaced: false
						},
						webp: {
							quality: 75
						}
					}
				}])
			}]
		}
	};
};
