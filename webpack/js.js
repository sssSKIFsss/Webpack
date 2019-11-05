const PATHS = require('./paths')();

module.exports = function () {
	return {
		module: {
			rules: [{
				test: /\.js$/,
				include: [ PATHS.project + PATHS.src.path ],
				exclude: [
					/node_modules/,
					/webpack/,
					/dist/,
					/images/,
					/fonts/
				],
				use: {
					loader: 'babel-loader?optional[]=runtime',
					options: {
						presets: ['@babel/preset-env'],
						targets: ">3%, not dead"
						// или массис строк
						// [
						// "> 1%",
						// "last 2 version",
						// "chrome >= 45",
						// "opera >= 30",
						// "edge >= 12",
						// "firefox >= 38",
						// "safari >= 9",
						// "ie >= 10",
						// "ios >= 9",
						// "android >= 4.4",
						// "node >= 1",
						// "electron >=1"
						// ]
					}
				}
			}]
		}
	}
};
