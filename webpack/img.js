"use strict";

const path = require("path");
const s = require("../webpack.settings");

module.exports = (devMode) => {
  return {
    module: {
      rules: [{
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        include: [
          path.resolve(s.dir, s.src, s.srcImg),
          path.resolve(s.dir, s.src, s.srcComponents)
        ],
        exclude: [
          path.resolve(s.dir, s.src, s.srcImg, s.srcFavicon)
        ],
        use: [{
          loader: "url-loader",
          options: {
            name: "[name].[ext]?[hash]",
            // outputPath: PATHS.dist_img,
            outputPath: path.join(s.distImg),
            useRelativePath: true,
            limit: 1024
          }
        }].concat(devMode ? [] : [{
          loader: "image-webpack-loader",
          options: {
            mozjpeg: {
              progressive: true,
              quality: 70
            },
            optipng: {
              enabled: false
            },
            pngquant: {
              quality: [0.65, 0.90],
              speed: 4
            },
            gifsicle: {
              interlaced: false
            },
            webp: {
              quality: 75
            }
          }
        }])
      }]
    }
  };
};
