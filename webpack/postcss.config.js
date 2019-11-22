'use strict';

module.exports = (ctx) => {
	return {
		ident: 'postcss',
		plugins: {
			'postcss-import': {},
			...ctx.options.mode === 'production' ? {
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

// 'stylelint': {},
// 'UnCSS' : {}, разобраться как работает с pug
