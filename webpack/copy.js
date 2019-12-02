const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const sets = require("../webpack.settings");
const PATHS = sets.paths;
module.exports = function () {
	return {
		plugins: [
			new CopyPlugin([{
				from: path.resolve(PATHS.srcHtaccess),
				to: ""
			}])
		]
	};
};
