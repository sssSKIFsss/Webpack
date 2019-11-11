'use strict';

const ENV = require('yargs').argv.env;
const PATHS = require('./paths')();

module.exports = () => {
	return {
		module: {
			rules: [{
				test: /\.(png|jpe?g|gif|svg)$/,
				exclude: /(node_modules|webpack|dist|fonts|pug|js|styles)/,
				use: [{
					// url-loader с опцией limit позволяет настроить загрузку как
					// DataURL, если изображение меньше лимита, и как URL, если больше
					loader: 'url-loader',
					options: {
						name: '[name].[ext]',
						outputPath: PATHS.dist.img,
						useRelativePath: true,
						limit: 1024
					}
				}].concat(ENV === 'development' ? [] : [{
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
