module.exports = function () {
	return {
		plugins: [
			new webpack.DefinePlugin({
				NODE_ENV: env
			})
		],
	}
};
