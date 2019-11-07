const PATHS = require('./paths')();



// eslint-loader TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


module.exports = function () {
	return {
		module: {
			rules: [{
				test: /\.js$/,
				exclude: /(node_modules|webpack|dist|images|fonts|pug|styles)/,
				use: {
					loader: 'babel-loader'
					// loader: 'babel-loader?optional[]=runtime',
					// options: {
					// 	// presets: ['@babel/preset-env']
					// 	// targets: "> 1%, not dead"
					//
					// 	// или массис строк
					// 	// [
					// 	// "> 1%",
					// 	// "last 2 version",
					// 	// "chrome >= 45",
					// 	// "opera >= 30",
					// 	// "edge >= 12",
					// 	// "firefox >= 38",
					// 	// "safari >= 9",
					// 	// "ie >= 10",
					// 	// "ios >= 9",
					// 	// "android >= 4.4",
					// 	// "node >= 1",
					// 	// "electron >=1"
					// 	// ]
					// }
				}
			}]
		}
	}
};
