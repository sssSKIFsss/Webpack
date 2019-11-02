'use strict';

const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

const PATHS = baseConfig.externals.paths;
const devConfig = merge(baseConfig, {
	mode: 'development',

	devServer: {
		contentBase: PATHS.project + PATHS.dist.path,
		port: 8081,
		overlay: {
			warning: true, // вывод ошибок в браузер
			error: true // вывод ошибок в браузер
		}
	}
});

module.exports = new Promise((resolve, reject) => {
	resolve(devConfig);
	reject('error');
});
