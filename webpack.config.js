'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
// noinspection JSUnresolvedVariable
const ENV = require('yargs').argv.env;

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
		//The base directory, an absolute path, for resolving entry points
		// and loaders from configuration
		context: PATHS.project + PATHS.src.path,
		entry: {
			app:    "./" + PATHS.src.js_entry1,
			adm:    "./" + PATHS.src.js_entry2,
			vendors: PATHS.src.js_entry_vendors
			// 1.entry-строка - одна точка входа
			//   entry: './index.js'
			// 2.entry-массив - несколько точек входа
			//   entry: ['./public/src/index.js', './public/src/googleAnalytics.js']
			// 3.entry-объект - например для многостраничного приложения
			//   entry: {
			//     "indexEntry": './public/src/index.js',
			//     "profileEntry": './public/src/profile.js'
			//   }
			// 4. комбинация
			//  entry {
			//  	"vendor": ['jquery', 'analytics.js', 'optimizely.js'],
			//  	"index": './public/src/index.js',
			//  	"profile": './public/src/profile.js'
			//  }
		},

		output: {
			path: PATHS.project + PATHS.dist.path,
			filename: PATHS.dist.js + PATHS.dist.js_file,
			publicPath: '/',
			library: "[name]"
		},

		// externals: { paths: PATHS },

		devtool: ENV === 'development' ? 'eval' : false,
		mode : ENV === 'production' ? 'production' : 'development',

		resolve: {
			alias: {
				'~': PATHS.project + PATHS.src.path
			}
		},

		optimization: {
			splitChunks: { // деление файла js на app и vendors
				cacheGroups: {
					vendors: { // например, для подключения jquery, bootstrap
						name: 'vendors',
						test: /node_modules/,
						chunks: 'all',
						enforce: true
					},
					commons: { // создание общих для разных файлов модулей
						name: 'common',
						chunks: 'initial',
						minChunks: 2,
						maxInitialRequests: 5,
						minSize: 0
					}
				}
			},

			// запрет компиляции бандла при ошибке
			noEmitOnErrors: true
		},

		// ускорение сборки отменой парсинга файлов больших библиотек, которые в этом случае
		// не должны содержать require, import, define и др. механизмы импорта
		module: {
			noParse: /jquery|bootstrap|popper.js/
		},

		plugins: [
			// // автоматически подключает библиотеки, встечающиеся в коде
			// new webpack.ProvidePlugin({
			// 	$: 'jquery',
			// 	jQuery: 'jquery'
			// 	})
			//
			// доступ к обозначенной переменной в коде проекта вне Webpack
			new webpack.DefinePlugin({
				ENV: JSON.stringify(ENV)
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
	return env === 'development' ? developmentConfig : productionConfig;
};
