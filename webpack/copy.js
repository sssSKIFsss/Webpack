const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const sets = require("../webpack.settings");
const P = sets.paths;
module.exports = function () {
  return {
    plugins: [
      new CopyPlugin([{
        from: path.resolve(P.dir, P.src, P.srcHtaccess),
        to: ""
      }])
    ]
  };
};
