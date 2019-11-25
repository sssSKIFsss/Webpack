const path = require('path');
const PATHS = require('./paths');

module.exports = function () {
	return {
		devServer: {
			contentBase: path.resolve(__dirname, PATHS.dist),
			port: 8081,
			overlay: {
				// вывод ошибок и предуперждений в браузер
				warning: true,
				error: true
			},
			open: true

			// hot: true
		}
		// watchOptions: { aggregateTimeout: 100 }
	};
};
