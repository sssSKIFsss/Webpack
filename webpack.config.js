"use strict";

const paths = require('path');
const webpack = require('webpack');
const ENV = require('yargs').argv.env;

module.exports = {
	entry: {
		app: paths.resolve(__dirname, "src/index.js")
	},
	output: {
		path: paths.resolve(__dirname, "dist"),
		filename: "./js/[name].js",
		library: "[name]"
	},
	devtool: ENV === 'development' ? 'eval' : false,
	mode : ENV === 'production' ? 'production' : 'development',

	plugins: [
		new webpack.DefinePlugin({
			ENV: JSON.stringify(ENV)
		})
	]
};