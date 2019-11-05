const PATHS = require('./paths')();

module.exports = function () {
	return {
		module: {
			rules: [{
				test: /\.(png|jpe?g|gif|svg)$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: PATHS.dist.img,
						useRelativePath: true
					}
				}]
			}]
		}
	}
};
