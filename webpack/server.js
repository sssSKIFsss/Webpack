const baseConfig = require('../webpack.base.config');
const PATHS = baseConfig.externals.paths;

module.exports = function () {
	return {
		devServer: {
			contentBase: PATHS.project + PATHS.dist.path,
			port: 8081,
			overlay: {
				warning: true, // вывод ошибок в браузер
				error: true // вывод ошибок в браузер
			}
		}
	}
};