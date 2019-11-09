"use strict";

const paths = require('path');

module.exports = {
	entry: "./home",
	output: {
		path: paths.resolve(__dirname),
		filename: "build.js",
		library: "home"
	}
};