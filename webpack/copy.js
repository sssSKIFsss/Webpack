const CopyPlugin = require('copy-webpack-plugin');
const PATHS = require('./paths')();

module.exports = function () {
	return {
		module: {
			rules: [
				{
					test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
					use: [{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: PATHS.dist.fonts,
							useRelativePath: true
						}
					}]
				}
			]
		},

		// а можно так
		plugins: [
			new CopyPlugin([
				{from: PATHS.project + PATHS.src.path + PATHS.src.htaccess, to: ''}
			]),
		]
	}
};
