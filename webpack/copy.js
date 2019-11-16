const CopyPlugin = require('copy-webpack-plugin');
const PATHS = require('./paths')();

module.exports = function () {
	return {
		plugins: [
			new CopyPlugin([
				{from: PATHS.project + PATHS.src.path + PATHS.src.htaccess, to: ''}
			]),
		]
	}
};
