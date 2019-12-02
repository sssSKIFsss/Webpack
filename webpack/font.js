const path = require("path");
const sets = require("../webpack.settings");
const PATHS = sets.paths;

module.exports = function () {
	return {
		module: {
			rules: [{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				include: path.resolve(PATHS.srcFonts),
				use: [{
					loader: "file-loader",
					options: {
						name: "[name].[ext]",
						outputPath: PATHS.distFonts,
						useRelativePath: true
					}
				}]
			}]
		}
	};
};
