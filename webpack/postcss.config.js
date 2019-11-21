'use strict';

// уже включены в webpack - cssnano

// const ARGV = require('yards').argv;
// const PATHS = require('./paths');
//
// if(ARGV.mode === PATHS.mode.prod) {
// }
module.exports = (ctx) => {
	return {
		ident: 'postcss',
		plugins: {
			'postcss-import': {},
			// 'postcss-resolve-url': {},
			// 'postcss-next': {
			// 	browsers: ['last 2 version', '>5%']
			// },
			// 'stylelint': {},
			// 'UnCSS' : {}, разобраться как работает с pug


			...ctx.options.env === 'production' ? {
				autoprefixer: {},
				'css-mqpacker': {},
				cssnano: {
					preset: [
						'default',
						{
							discardComments: {
								removeAll: true
							}
						}
					]
				},
			}:{}


		}
	}
};
