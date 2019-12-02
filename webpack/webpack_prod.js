"use strict";

const merge = require("webpack-merge");
const configureClear = require("./clear");

module.exports = merge([
	{
		devtool: false,
		mode: "production"
	},
	configureClear()
]);
