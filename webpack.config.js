"use strict";

const merge = require("webpack-merge");

const commonConfig = require("./webpack/webpack_common");
const devConfig = require("./webpack/webpack_dev");
const prodConfig = require("./webpack/webpack_prod");

module.exports = env => {
	return merge([
		commonConfig(env),
		env === "development" ? devConfig : prodConfig
	]);
};
