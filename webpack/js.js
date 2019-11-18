'use strict';

const path = require('path');
const PATHS = require('./paths')();


// eslint-loader TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


module.exports = function () {
	return {
		module: {
			rules: [{
				test: /\.js$/,
				include: [
					path.resolve(PATHS.src, PATHS.src_js),
					path.resolve(PATHS.src, PATHS.src_components)
				],
				use: {
					loader: 'babel-loader'
				}
			}]
		}
	}
};
