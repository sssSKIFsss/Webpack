'use strict';

const NODE_ENV = require('yargs').argv.env;
const webpack = require('webpack');
const merge = require('webpack-merge');

const PATHS = require('./webpack/paths')();
const server = require('./webpack/server');
const pug = require('./webpack/pug');
const style = require('./webpack/style');
const clear = require('./webpack/clear');
const copy = require('./webpack/copy');
const img = require('./webpack/img');
const js = require('./webpack/js');
const font = require('./webpack/font');

const commonConfig = merge([
	{
		// externals: { paths: PATHS },

		devtool: NODE_ENV === 'production' ? false : 'cheap-eval-source-map',
		mode : NODE_ENV === 'production' ? 'production' : 'development',

		entry: {
			app: PATHS.project + PATHS.src.path + PATHS.src.js_file1,
				// 1.entry-массив - несколько точек входа
				//   entry: ['./public/src/index.js', './public/src/googleAnalytics.js']
				// 2.entru-объект - например для многостраничного приложения
				//   entry: {
				//     "indexEntry": './public/src/index.js',
				//     "profileEntry": './public/src/profile.js'
				//   }
				// 3. комбинация
				//  entry {
				//  	"vendor": ['jquery', 'analytics.js', 'optimizely.js'],
				//  	"index": './publick/src/index.js',
				//  	"profile": './public/src/profile.js'
				//  }
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
			// доступ к обозначенной переменной в коде проекта вне Webpack
			new webpack.DefinePlugin({
				NODE_ENV: JSON.stringify(NODE_ENV)
			}),
			// автоматически подключает библиотеки, встечающиеся в коде
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery'
			})
		],
	},
	pug(),
	style(),
	js(),
	font(),
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

module.exports = env => {
	return env === 'production' ? productionConfig : developmentConfig;
};
