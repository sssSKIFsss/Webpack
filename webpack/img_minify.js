module.exports = function () {
	return {
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
		}
	}
};
