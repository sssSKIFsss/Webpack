"use strict";

const path = require("path");
const sets = require("../webpack.settings");
const PATHS = sets.paths;
// eslint-loader TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

module.exports = function () {
	return {
		module: {
			rules: [{
				test: /\.js$/,
				include: [
					path.resolve(PATHS.srcJS),
					path.resolve(PATHS.srcComponents)
				],
				use: ["babel-loader", "eslint-loader"]
			}]
		}
	};
};
