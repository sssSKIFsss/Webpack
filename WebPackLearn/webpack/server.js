const path = require('path');
const PATHS = require('./paths');

module.exports = function () {
	return {
		devServer: {
			contentBase: path.resolve(__dirname, PATHS.dist),
			port: 8081,
			overlay: {
				warning: true, // вывод ошибок в браузер
				error: true // вывод ошибок в браузер
			},
			// hot: true
		},
		// watchOptions: { aggregateTimeout: 100 }
	}
};