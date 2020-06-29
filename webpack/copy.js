const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const s = require("../webpack.settings");

module.exports = function () {
  return {
    plugins: [
      new CopyPlugin([{
        from: path.resolve(s.dir, s.src, s.srcHtaccess),
        to: ""
      }])
    ]
  };
};
