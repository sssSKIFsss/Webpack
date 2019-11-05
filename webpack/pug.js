const fs = require('fs');
const HtmlPlugin = require('html-webpack-plugin');
const PATHS = require('./paths')();

const PAGES_DIR = PATHS.project + PATHS.src.path + PATHS.src.pug;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

module.exports = function () {
	return {
		module: {
			rules: [{
				test: /\.pug$/,
				include: [ PATHS.project + PATHS.src.path + PATHS.src.pug ],
				exclude: [
					/node_modules/,
					/webpack/,
					/dist/,
					/images/,
					/fonts/,
				],
				use: [
					{
						loader: 'pug-loader',
						options: {
							pretty: true
						}
					},{
						loader: 'pug-lint-loader',
						options: require('../.pug-lintrc.js')
					}
				]
			}]
		},
		plugins: [
			...PAGES.map(page => new HtmlPlugin({
				template: `${PAGES_DIR}/${page}`, // pug
				filename: `./${page.replace(/\.pug/, '.html')}`
			}))
		]
	}
};
