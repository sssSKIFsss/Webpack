const path = require("path");
const sets = require("../webpack.settings");
const P = sets.paths;

module.exports = function () {
  return {
    module: {
      rules: [{
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        include: path.resolve(P.dir, P.src, P.srcFonts),
        use: [{
          loader: "file-loader",
          options: {
            name: "[name].[ext]?[hash]",
            outputPath: P.distFonts,
            useRelativePath: true
          }
        }]
      }]
    }
  };
};
