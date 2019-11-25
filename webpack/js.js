'use strict';

const path = require('path');
const PATHS = require('./paths');

// eslint-loader TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

module.exports = function () {
	return {
		module: {
			rules: [{
				test: /\.js$/,
				include: [
					path.resolve(PATHS.src, PATHS.srcJS),
					path.resolve(PATHS.src, PATHS.srcComponents)
				],
				use: ['babel-loader', 'eslint-loader']
			}]
		}
	};
};
