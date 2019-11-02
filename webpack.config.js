const fs = require('fs');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const pathPaths = require('./webpack/path');
const PATHS = pathPaths();
const server = require('./webpack/server');
const pug = require('./webpack/pug');
const style = require('./webpack/style');
const clear = require('./webpack/clear');

const PAGES_DIR = PATHS.project + PATHS.src.path + PATHS.src.pug;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

const commonConfig = merge([
	{
		externals: {
			paths: PATHS
		},

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

		module: {
			rules: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: '/node_modules/'
				}, {
				},{
					test: /\.(png|jpe?g|gif|svg)$/,
					use: [{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: PATHS.dist.img,
							useRelativePath: true
						}
					}]
				},{
					test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
					use: [{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: PATHS.dist.fonts,
							useRelativePath: true
						}
					}]
				}
			]
		},

		plugins: [
			new CopyPlugin([
				{from: PATHS.project + PATHS.src.path + PATHS.src.htaccess, to: ''}
			]),
			// автоматически подключает библиотеки, встечающиеся в коде
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery'
			}),
			...PAGES.map(page => new HtmlPlugin({
				template: `${PAGES_DIR}/${page}`, // pug
				filename: `./${page.replace(/\.pug/, '.html')}`
			}))
		],
	},
	pug(),
	style()
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