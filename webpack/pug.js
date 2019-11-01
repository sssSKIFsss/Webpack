// const baseConfig = require('../webpack.base.config');
// const PATHS = baseConfig.externals.paths;

module.exports = function () {
	return {
		module: {
			rules: [{
				test: /\.pug$/,
				loader: 'pug-loader',
				options: {
					pretty: true
				}
			}]
		}
	}
};
