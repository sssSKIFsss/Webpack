"use strict";

const merge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");

const configureCopy = require("./copy");
const configureFont = require("./font");
const configurePug = require("./pug");
const configureImg = require("./img");
const configureJS = require("./js");
const configureStyle = require("./style");
const sets = require("../webpack.settings");
const PATHS = sets.paths;

module.exports = (devMode) => {
  return merge(
    {
      context: path.resolve(PATHS.dir, PATHS.src),
      entry: sets.entries,
      output: {
        path: path.resolve(PATHS.dir, PATHS.dist),
        filename: path.join(PATHS.distJS, PATHS.distJsFile),
        chunkFilename: path.join(PATHS.distJS, PATHS.distJsChunk),
        publicPath: ""
        //library: "app" - работает, library: "[name]" - не всегда работает
      },
      resolve: {
        alias: {
          // "@": path.resolve(sets.src),
          "@pug": path.resolve(PATHS.srcPug),
          "@js": path.resolve(PATHS.srcJS),
          "@styles": path.resolve(PATHS.srcStyles),
          "@images": path.resolve(PATHS.srcImg),
          "@components": path.resolve(PATHS.srcComponents)
        }
      },

      optimization: {
        // деление файла js на app, vendors и common
        splitChunks: {

          chunks: "async",
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 6,
          maxInitialRequests: 4,
          automaticNameDelimiter: "~",

          // cacheGroups: {
          //   defaultVendors: {
          //     // name: "vend0rs",
          //     test: /[\\/]node_modules[\\/]/,
          //     priority: -10
          //   },
          //   default: {
          //     minChunks: 2,
          //     priority: -20,
          //     reuseExistingChunk: true
          //   }
          // }
          cacheGroups: {
            vendors: {
              name: "vendors",
              test: /node_modules/,
              chunks: "all",
              enforce: true
            },
            common: {
              name: "common",
              chunks: "initial",
              minChunks: 2,
              minSize: 0
            }
          }

        },
        // запрет компиляции бандла при ошибке
        noEmitOnErrors: true
      },

      // ускорение сборки отменой парсинга файлов больших библиотек,
      // которые в этом случае не должны содержать require, import, define
      // и др. механизмы импорта
      module: {
        noParse: /jquery|bootstrap|popper.js/
      },

      plugins: [
        // доступ к обозначенной переменной в коде проекта вне Webpack
        new webpack.DefinePlugin({
          ENV: JSON.stringify(devMode)
        })
      ]
    },
    configureCopy(),
    configureFont(),
    configurePug(),
    configureImg(devMode),
    configureJS(),
    configureStyle(devMode)
  );
};


// может понадобиться:
//--------------------

/*
const WebpackMd5Hash = require("webpack-md5-hash");
new WebpackMd5Hash() // <- в разделе plugins
*/

/*
  // автоматически подключает библиотеки, встечающиеся в коде
new webpack.ProvidePlugin({ // <- в раздел plugins
  $: "jquery",
  jQuery: "jquery"
  })
*/
