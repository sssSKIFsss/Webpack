const PATHS = require('./paths')();

module.exports = function () {
	return {
		module: {
			rules: [{
				test: /\.(png|jpe?g|gif|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: PATHS.dist.img,
							useRelativePath: true
						}
					}
					// ,{
					// 	// Minify PNG, JPEG, GIF, SVG and WEBP images with imagemin
					// 	loader: 'image-webpack-loader',
					// 	exclude: [
					// 		/dist/,
					// 		/node_modules/,
					// 		/webpack/
					// 	],
					// 	options: {
					// 		mozjpeg: {
					// 			progressive: true,
					// 			quality: 70
					// 		},
					// 		// optipng.enabled: false will disable optipng
					// 		optipng: {
					// 			enabled: false,
					// 		},
					// 		pngquant: {
					// 			quality: [0.65, 0.90],
					// 			speed: 4
					// 		},
					// 		gifsicle: {
					// 			interlaced: false,
					// 		},
					// 		// the webp option will enable WEBP
					// 		webp: {
					// 			quality: 75
					// 		}
					// 	}
					// }
				]
			}]
		}
	}
};
