'use strict';

const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const CssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const pug = require('./webpack/pug');
const server = require('./webpack/server');

const PATHS = {
	project : path.resolve(__dirname) + '/',
	src: {
		path    : 'src/',
		pug     : 'pug/pages',
		pug_file: 'index.pug',
		js      : 'js/',
		js_file1: 'index.js',
		js_file2: 'adminka.js', // вторая точка входа для личного кабинета
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

const commonConfig = merge([
	{
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

		externals: {
			paths: PATHS
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
					test: /\.css$/,
					use: [
						"style-loader",
						CssExtractPlugin.loader,
						//  exclude: '/node_modules/', // нужно ли ?
						{
							loader: "css-loader",
							options: {sourceMap: true}
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
				}, {
					test: /\.scss$/,
					use: [
						"style-loader",
						CssExtractPlugin.loader,
						//  exclude: '/node_modules/', // нужно ли ?
						{
							loader: 'css-loader',
							options: {sourceMap: true}
						}, {
							loader: 'postcss-loader',
							options: {
								sourceMap: true,
								config: {
									path: PATHS.project + PATHS.config.postcss
								}
							}
						}, {
							loader: 'sass-loader',
							options: {sourceMap: true}
						}
					]
				}, {
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
					test: /\.(png|jpe?g|gif|svg)$/,
					use: [{
						// Minify PNG, JPEG, GIF, SVG and WEBP images with imagemin
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
								quality: 70
							},
							// optipng.enabled: false will disable optipng
							optipng: {
								enabled: false,
							},
							pngquant: {
								quality: [0.65, 0.90],
								speed: 4
							},
							gifsicle: {
								interlaced: false,
							},
							// the webp option will enable WEBP
							webp: {
								quality: 75
							}
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
			new CleanWebpackPlugin(),
			new webpack.SourceMapDevToolPlugin({
				filename: '[file].map'
			}),
			new CssExtractPlugin({
				filename: PATHS.dist.css + PATHS.dist.css_file
			}),
			new CopyPlugin([
				{from: PATHS.project + PATHS.src.path + PATHS.src.htaccess, to: ''}
			]),
			...PAGES.map(page => new HtmlPlugin({
				template: `${PAGES_DIR}/${page}`, // pug
				filename: `./${page.replace(/\.pug/, '.html')}`
			}))
		],
	},
	pug()
]);

const developmentConfig = merge([
	server()
]);

const productionConfig = {

};

module.exports = function(env) {
	if(env === 'production') {
		return commonConfig;
	}
	else if (env === 'development') {
		return merge(
			commonConfig,
			developmentConfig
		);
	} else {
		console.log('Error');
		return NaN;
	}
};