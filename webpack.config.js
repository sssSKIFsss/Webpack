"use strict";

const paths = require('path');
const webpack = require('webpack');
const ENV = require('yargs').argv.env;

module.exports = {
	entry: {
		app: paths.resolve(__dirname, "src/js/main.js")
	},
	output: {
		path: paths.resolve(__dirname, "dist"),
		filename: "./js/[name].js",
		library: "[name]"
	},
	devtool: ENV === 'development' ? 'eval' : false,
	mode : ENV === 'production' ? 'production' : 'development',

	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules|webpack|dist|images|fonts|pug|styles)/,
			use: {
				loader: 'babel-loader'
			}
		}]
	},

	plugins: [
		new webpack.DefinePlugin({
			ENV: JSON.stringify(ENV)
		})
	]
};