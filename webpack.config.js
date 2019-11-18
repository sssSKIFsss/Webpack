'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackMd5Hash = require('webpack-md5-hash');
// noinspection JSUnresolvedVariable
const ENV = require('yargs').argv.env;

const PATHS = require('./webpack/paths')();
const pug = require('./webpack/pug');
const style = require('./webpack/style');
const js = require('./webpack/js');
const clear = require('./webpack/clear');
const copy = require('./webpack/copy');
const img = require('./webpack/img');
const font = require('./webpack/font');
const server = require('./webpack/server');

const commonConfig = merge([
	{
		context: path.resolve(__dirname, PATHS.src),
		entry: {
			app: PATHS.entry1,
			adm: PATHS.entry2,
			vendors: PATHS.entry_vendors

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
			path: path.resolve(__dirname, PATHS.dist),
			filename: path.join(PATHS.dist_js, PATHS.dist_js_file),
			publicPath: '',
			library: "[name]"
		},

		externals: { isDevelopment: ENV === 'development' },

		devtool: ENV === 'development' ? 'eval' : false,
		mode : ENV === 'production' ? 'production' : 'development',

		resolve: {
			alias: {
				'~': path.resolve(__dirname, PATHS.src),
				'~pug': path.resolve(__dirname, PATHS.src, PATHS.src_pug),
				'~js': path.resolve(__dirname, PATHS.src, PATHS.src_js),
				'~css': path.resolve(__dirname, PATHS.src, PATHS.src_css),
				'~scss': path.resolve(__dirname, PATHS.src, PATHS.src_scss),
				'~img': path.resolve(__dirname, PATHS.src, PATHS.src_img)
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
			// исправление механизма хеширования в именах файлов
			new WebpackMd5Hash(),
			// доступ к обозначенной переменной в коде проекта вне Webpack
			new webpack.DefinePlugin({
				ENV: JSON.stringify(ENV)
			})
			//
			// // автоматически подключает библиотеки, встечающиеся в коде
			// new webpack.ProvidePlugin({
			// 	$: 'jquery',
			// 	jQuery: 'jquery'
			// 	})
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
