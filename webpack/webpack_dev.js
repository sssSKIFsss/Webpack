"use strict";

const webpack = require("webpack");
const merge = require("webpack-merge");
const DashboardPlugin = require("webpack-dashboard/plugin");

const devServer = require("./server");


module.exports = merge(
	{
		devtool: "cheap-module-eval-source-map",
		mode: "development",

		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new DashboardPlugin()
		]
	},
	devServer
);

