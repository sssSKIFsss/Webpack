'use strict';
// const ARGV = require('yards').argv;
// const PATHS = require('./paths');
//
// if(ARGV.mode === PATHS.mode.prod) {
// }
module.exports = {
	plugins: [
		require('autoprefixer'),
		require('css-mqpacker'),
		require('cssnano') ({
			preset: [
				'default',
				{
					discardComments: {
						removeAll: true
					}
				}
			]
		})
	]
};