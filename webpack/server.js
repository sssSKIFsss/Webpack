const path = require("path");
const sets = require("../webpack.settings");
const PATHS = sets.paths;
const SERV = sets.devServerConfig;

module.exports = {
	devServer: {
		public: SERV.public(),
		// contentBase: path.resolve(PATHS.dir, PATHS.templates),
		contentBase: path.resolve(PATHS.dir, PATHS.dist),
		host: SERV.host(),
		port: SERV.port(),
		https: !!parseInt(SERV.https(), 10),
		watchOptions: {
			poll: !!parseInt(SERV.poll(), 10),
			ignored: /node_modules/
		},
		overlay: {
			// вывод ошибок и предуперждений в браузер
			warning: true,
			error: true
		},
		headers: {
			"Access-Control-Allow-Origin": "*"
		},
		disableHostCheck: true,
		watchContentBase: true,
		writeToDisk: false,
		inline: true,
		hot: true,
		open: true
	},
	watchOptions: { aggregateTimeout: 150 }
};

/*
module.exports = {
	devServer: {
		// contentBase: path.resolve(PATHS.dist),
		contentBase: path.resolve(PATHS.dir, PATHS.dist),
		port: 8081,
		overlay: {
			// вывод ошибок и предуперждений в браузер
			warning: true,
			error: true
		},
		open: true
		// hot: true
	}
	// watchOptions: { aggregateTimeout: 100 }
};
*/
