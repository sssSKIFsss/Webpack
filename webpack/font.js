const PATHS = require('./paths')();

module.exports = function () {
	return {
		module: {
			rules: [{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				exclude: /(node_modules|webpack|dist|images|pug|js|styles)/,
				// include: PATHS.project + PATHS.src.paths + PATHS.src.fonts,
				 //include: PATHS.project + PATHS.src.path + PATHS.src.fonts,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: PATHS.dist.fonts,
						useRelativePath: true
					}
				}]
			}]
		}
	}
};
