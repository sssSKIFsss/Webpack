const fs = require('fs');
const path = require('path');
const FaviconWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PATHS = require('./paths');

const PAGES_DIR = path.resolve(PATHS.src, PATHS.src_pug);
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

module.exports = function () {
	return {
		module: {
			rules: [{
				test: /\.pug$/,
				include: [
					path.resolve(PATHS.src, PATHS.src_pug),
					path.resolve(PATHS.src, PATHS.src_components)
				],
				use: [
					{
						loader: 'pug-loader',
						options: {
							pretty: true
						}
					}, {
						loader: 'pug-lint-loader',
						options: require('../.pug-lintrc')
					}
				]
			}]
		},
		plugins: [
			...PAGES.map(page => new HtmlWebpackPlugin({
				inject: true,
				template: `${PAGES_DIR}/${page}`, // pug
				filename: `./${page.replace(/\.pug/, '.html')}`
			})),
			// ЛИБО ТАК
				// new htmlWebpackPlugin({
				// 	filename: 'index.html',
				// 	title: "Main Page",
				// 	//favicon: 'favicon.ico',
				// 	template: `${PAGES_DIR}/index.pug`,
				// 	chunksSortMode: 'manual',
				// 	chunks: ['app', 'common', 'vendors'],
				// }),
				// new htmlWebpackPlugin({
				// 	filename: 'adm.html',
				// 	title: "Adm Page",
				// 	//favicon: 'favicon.ico',
				// 	template: `${PAGES_DIR}/admin.pug`,
				// 	chunksSortMode: 'manual',
				// 	chunks: ['adm', 'common', 'vendors'],
				// }),
			new FaviconWebpackPlugin({
				logo: path.resolve(PATHS.src, PATHS.src_img, PATHS.src_favicon),
				outputPath: path.join(PATHS.dist_img, PATHS.dist_favicon),
				prefix: path.join(PATHS.dist_img, PATHS.dist_favicon),
				inject: 'force'
			})
		]
	}
};

// Возможно понадобятся следующие плагины
// html-webpack-injector
// html-webpack-template-pug
