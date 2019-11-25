'use strict';

const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const PATHS = require('./webpack/paths');
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
				vendors: PATHS.entryVendors
			},
			output: {
				path: path.resolve(__dirname, PATHS.dist),
				filename: path.join(PATHS.distJS, PATHS.distJsFile),
				chunkFilename: path.join(PATHS.distJS, PATHS.distJsChunk),
				publicPath: ''
				//library: 'app' - работает, library: '[name]' - не всегда работает
			},

			devtool: env === 'development' ? 'cheap-module-eval-source-map' : false,
			mode: env === 'production' ? 'production' : 'development',
			// externals: { isDevelopment: env === 'development' },
			resolve: {
				alias: {
					// '~': path.resolve(__dirname, PATHS.src),
					'~pug': path.resolve(__dirname, PATHS.src, PATHS.srcPug),
					'~js': path.resolve(__dirname, PATHS.src, PATHS.srcJS),
					'~css': path.resolve(__dirname, PATHS.src, PATHS.srcCSS),
					'~scss': path.resolve(__dirname, PATHS.src, PATHS.srcSCSS),
					'~img': path.resolve(__dirname, PATHS.src, PATHS.srcImg),
					'~components': path.resolve(__dirname, PATHS.src, PATHS.srcComponents)
				}
			},

			optimization: {
				// деление файла js на app, vendors и common
				splitChunks: {
					cacheGroups: {
						vendors: {
							name: 'vendors',
							test: /node_modules/,
							chunks: 'all',
							enforce: true
						},
						common: {
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

			// ускорение сборки отменой парсинга файлов больших библиотек,
			// которые в этом случае не должны содержать require, import, define
			// и др. механизмы импорта
			module: {
				noParse: /jquery|bootstrap|popper.js/
			},

			plugins: [
				// доступ к обозначенной переменной в коде проекта вне Webpack
				new webpack.DefinePlugin({
					ENV: JSON.stringify(env)
				})
			]
		},
		env === 'development' ? server() : clear(),
		copy(),
		font(),
		img(env),
		pug(),
		js(),
		style(env)
	]);
};

// может понадобиться:
//--------------------

/*
const WebpackMd5Hash = require('webpack-md5-hash');
new WebpackMd5Hash() // <- в разделе plugins
*/

/*
// автоматически подключает библиотеки, встечающиеся в коде
new webpack.ProvidePlugin({ // <- в раздел plugins
	$: 'jquery',
	jQuery: 'jquery'
	})
*/
