const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const PATHS = require('./paths');

module.exports = function () {
	return {
		plugins: [
			new CopyPlugin([{
				from: path.resolve(PATHS.src, PATHS.src_htaccess),
				to: ''
			}]),
		]
	}
};
