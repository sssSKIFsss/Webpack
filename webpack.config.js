"use strict";
// merge - обеспечивает слияние ф-ций
const merge = require("webpack-merge");

const commonConfig = require("./webpack/webpack_common");
const devConfig = require("./webpack/webpack_dev");
const prodConfig = require("./webpack/webpack_prod");

module.exports = env => {
  const devMode = env === "development";
  return merge([
    commonConfig(devMode),
    devMode ? devConfig : prodConfig
  ]);
};
