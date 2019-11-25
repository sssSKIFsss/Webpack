'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackmd5hash = require('webpack-md5-hash');
const paths = require('./webpack/paths');
const server = require('./webpack/server');
const clear = require('./webpack/clear');
const copy = require('./webpack/copy');
const font = require('./webpack/font');
const img = require('./webpack/img');
const js = require('./webpack/js');
const pug = require('./webpack/pug');
const style = require('./webpack/style');

module.exports = env => {
	return merge([
		{
			context: path.resolve(__dirname, PATHS.src),
			entry: {
				app: PATHS.entry1,
				adm: PATHS.entry2,
				vendors: PATHS.entry_vendors
			},
			output: {
				path: path.resolve(__dirname, PATHS.dist),
				filename: path.join(PATHS.dist_js, PATHS.dist_js_file),
				chunkFilename: path.join(PATHS.dist_js, PATHS.dist_js_chunk),
				publicPath: '',
				library: "[name]"
			},

			devtool: env === 'development' ? 'eval' : 'hidden-source-map',
			mode : env === 'production' ? 'production' : 'development',
			externals: { isDevelopment: env === 'development' },
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

			// optimization: {
			// 	// chunkIds: 'natural',
			// 	splitChunks: { // деление файла js на app и vendors
			// 		cacheGroups: {
			// 			vendors: { // например, для подключения jquery, bootstrap
			// 				name: 'vendors',
			// 				test: /node_modules/,
			// 				chunks: 'all',
			// 				enforce: true
			// 			},
			// 			commons: { // создание общих для разных файлов модулей
			// 				name: 'common',
			// 				chunks: 'initial',
			// 				minChunks: 2,
			// 				maxInitialRequests: 5,
			// 				minSize: 0
			// 			}
			// 		}
			// 	},
			//
			// 	// запрет компиляции бандла при ошибке
			// 	noEmitOnErrors: true
			// },

			// // ускорение сборки отменой парсинга файлов больших библиотек, которые в этом случае
			// // не должны содержать require, import, define и др. механизмы импорта
			// module: {
			// 	noParse: /jquery|bootstrap|popper.js/
			// },

			plugins: [
				// // исправление механизма хеширования в именах файлов
				// new WebpackMd5Hash(),

				// доступ к обозначенной переменной в коде проекта вне Webpack
				new webpack.DefinePlugin({
					ENV: JSON.stringify(env)
				})

				// // автоматически подключает библиотеки, встечающиеся в коде
				// new webpack.ProvidePlugin({
				// 	$: 'jquery',
				// 	jQuery: 'jquery'
				// 	})
			],
		},
		env === 'development' ? server() : clear(),
		copy(),
		font(),
		img(env),
		pug(),
		js(),
		style(env)
	])
};
