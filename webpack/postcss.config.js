'use strict';
// const ARGV = require('yards').argv;
// const PATHS = require('./paths');
//
// if(ARGV.mode === PATHS.mode.prod) {
// }
module.exports = {
	ident: 'postcss',
	plugins: {
		'postcss-import': {},
		// 'postcss-resolve-url': {},
		// 'postcss-next': {
		// 	browsers: ['last 2 version', '>5%']
		// },
		'autoprefixer': {},
		'css-mqpacker': {},
		// 'stylelint': {},
		'cssnano': {
			preset: [
				'default',
				{
					discardComments: {
						removeAll: true
					}
				}
			]
		}
	}
};