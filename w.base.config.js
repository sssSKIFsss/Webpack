'use strict';

const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const cssExtract = require('mini-css-extract-plugin');
const copy = require('copy-webpack-plugin');
const html = require('html-webpack-plugin');

const PATHS = {
	project : path.resolve(__dirname) + '/',
	src: {
		path    : 'src/',
		pug     : 'pug/pages',
		pug_file: 'index.pug',
		js      : 'js/',
		js_file1: 'index.js',
		js_file2: 'lk.js', // вторая точка входа для личного кабинета
		css     : 'styles/css/',
		scss    : 'styles/scss/',
		img     : 'images/',
		fonts   : 'fonts/',
		htaccess: '.htaccess'
	},
	dist: {
		path    : 'dist/',
		js      : 'js/',
		js_file : '[name].[hash].js', // name берёт название ярлыка - т.е. "app"
		css     : 'css/',
		css_file: '[name].[hash].css',
		img     : 'images/',
		fonts   : 'fonts/'
	},
	config: {
		postcss: 'postcss.config.js'
	}
};

const PAGES_DIR = PATHS.project + PATHS.src.path + PATHS.src.pug;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

module.exports = {

	devtool: 'cheap-module-eval-source-map', // один из вариантов карты отладки

	externals: {
		paths: PATHS
	},

	resolve: {
		alias: {
			'~': PATHS.project + PATHS.src.path
		}
	},

	entry: {
		// основная точка входа
		app: PATHS.project + PATHS.src.path + PATHS.src.js_file1,
		// если нужно - вторая точка входа для личного кабинета, например
		lk: PATHS.project + PATHS.src.path + PATHS.src.js_file2
	},

	output: {
		path: PATHS.project + PATHS.dist.path,
		filename: PATHS.dist.js + PATHS.dist.js_file,
		publicPath: '/'
		// library: "home"
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
				test: /\.pug$/,
				loader: 'pug-loader'
			},{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: '/node_modules/'
			},{
				test: /\.css$/,
				use: [
					"style-loader",
					cssExtract.loader,
					//  exclude: '/node_modules/', // нужно ли ?
					{
						loader: "css-loader",
						options: { sourceMap: true }
					}, {
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							config: {
								path: PATHS.project + PATHS.config.postcss
							}
						}
					}
				]
			},{
				test: /\.scss$/,
				use: [
					"style-loader",
					cssExtract.loader,
					//  exclude: '/node_modules/', // нужно ли ?
					{
						loader: 'css-loader',
						options: { sourceMap: true }
					},{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							config: {
								path: PATHS.project + PATHS.config.postcss
							}
						}
					},{
						loader: 'sass-loader',
						options: { sourceMap: true }
					}
				]
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
			}, {
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
		new webpack.SourceMapDevToolPlugin({
			filename: '[file].map'
		}),
		new cssExtract({
			filename: PATHS.dist.css + PATHS.dist.css_file
		}),
		new copy([
			{ from: PATHS.project + PATHS.src.path + PATHS.src.htaccess, to: '' }
		]),
		...PAGES.map(page => new html({
			template: `${PAGES_DIR}/${page}`, // pug
			filename: `./${page.replace(/\.pug/,'.html')}`
		}))
	]
};