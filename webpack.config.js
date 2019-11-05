// const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const clear = require('./webpack/clear');
const copy = require('./webpack/copy');
const img = require('./webpack/img');
const js = require('./webpack/js');
const PATHS = require('./webpack/paths')();
const pug = require('./webpack/pug');
const server = require('./webpack/server');
const style = require('./webpack/style');


const commonConfig = merge([
	{
		externals: { paths: PATHS },

		devtool: 'cheap-module-eval-source-map', // один из вариантов карты отладки

		entry: {
			// основная точка входа
			app: PATHS.project + PATHS.src.path + PATHS.src.js_file1,
			// если нужно - вторая точка входа для личного кабинета, например
			adminka: PATHS.project + PATHS.src.path + PATHS.src.js_file2
		},

		output: {
			path: PATHS.project + PATHS.dist.path,
			filename: PATHS.dist.js + PATHS.dist.js_file,
			publicPath: '/'
			// library: "home"
		},

		resolve: {
			alias: {
				'~': PATHS.project + PATHS.src.path
			}
		},

		optimization: {
			splitChunks: { // деление файла js на app и vendors
				cacheGroups: {
					vendor: { // например, для подключения jquery, bootstrap
						name: 'vendors',
						test: /node_modules/,
						chunks: 'all',
						enforce: true
					}
				}
			}
		},

		plugins: [
			// new CopyPlugin([
			// 	{from: PATHS.project + PATHS.src.path + PATHS.src.htaccess, to: ''}
			// ]),
			// автоматически подключает библиотеки, встечающиеся в коде
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery'
			}),
		]
	},
	pug(),
	style(),
	js(),
	img(),
	copy()
]);

const developmentConfig = merge([
	commonConfig,
	server()
]);

const productionConfig = merge([
	commonConfig,
	clear()
]);

module.exports = function(env) {
	if(env === 'production') {
		return productionConfig;
	}
	else if (env === 'development') {
		return developmentConfig
	} else {
		console.log('Error');
		return NaN;
	}
};