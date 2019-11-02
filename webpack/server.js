const pathPaths = require('./path');
const PATHS = pathPaths();

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