'use strict';

const argv = require('yards').argv;
const webpack = require('webpack');
const merge = require('webpack-merge');
const PATHS = require('./webpack/paths')();
const server = require('./webpack/server');
const pug = require('./webpack/pug');
const style = require('./webpack/style');
const js = require('./webpack/js');
const img = require('./webpack/img');
const font = require('./webpack/font');
const clear = require('./webpack/clear');
const img_minify = require('./webpack/img_minify');
const copy = require('./webpack/copy');

// console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! = ' + argv.mode);
// const devTool = argv.mode === 'production' ?
// 	false : 'cheap-module-eval-source-map';

// const NODE_ENV = process.env.NODE_ENV || 'production';
// const DEV_MODE = process.env.development || false;
//
// if (process.env.production) {
// 	console.log('!!!!!!!!! WELCOME TO PRODUCTION MODE !!!!!!!!!!!!!!!!');
// }
// if (process.env.development) {
// 	console.log('!!!!!!!!! WELCOME TO DEVELOPMENT MODE !!!!!!!!!!!!!!!!');
// }
//
// process.argv.forEach((val, index)=>{
// 	console.log(`${index}: ${val}`);
// });
//
// console.log('!!!!!!!!! argv.mode = ' + process.argv.mode + ' !!!!!!!!!!!!!!!!');
// console.log('!!!!!!!!! NODE_ENV = ' + process.env.NODE_ENV + ' !!!!!!!!!!!!!!!!');
// console.log('!!!!!!!!! NODE_DEV = ' + process.env.development + ' !!!!!!!!!!!!!!!!');

const commonConfig = merge([
	{
		devtool: 'production',
		//devtool: devTool,

		entry: {
			// основная точка входа
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
			///////////////////////////////////////////////////////////////////
			// сюда взять инфу с iPad
			///////////////////////////////////////////////////////////////////
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
			// new webpack.DefinePlugin({
			// 	NODE_ENV: JSON.stringify('development'),
			// 	DEV_MODE: JSON.stringify('true'),
			//
			// }),
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
	clear(),
	img_minify()
]);

module.exports = env => {
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
