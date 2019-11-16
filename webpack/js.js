'use strict';

// eslint-loader TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


module.exports = function () {
	return {
		module: {
			rules: [{
				test: /\.js$/,
				exclude: /(node_modules|webpack|images|fonts|pug|styles)/,
				use: {
					loader: 'babel-loader'
				}
			}]
		}
	}
};
