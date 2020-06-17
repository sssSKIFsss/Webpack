"use strict";

const path = require("path");
const sets = require("../webpack.settings");
const P = sets.paths;
// eslint-loader TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

module.exports = function () {
  return {
    module: {
      rules: [{
        test: /\.js$/,
        include: [
          path.resolve(P.dir, P.src, P.srcJS),
          path.resolve(P.dir, P.src, P.srcComponents)
        ],
        use: [
          {
            loader: "babel-loader"
            // ,
            // options: { sourceMap: true }
          }, {
            loader: "eslint-loader"
            // ,
            // options: { sourceMap: true }
          }
        ]
      }]
    }
  };
};
