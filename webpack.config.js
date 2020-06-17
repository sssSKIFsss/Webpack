"use strict";

const merge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");
const DashboardPlugin = require("webpack-dashboard/plugin");

const configureCopy = require("./webpack/copy");
const configureFont = require("./webpack/font");
const configurePug = require("./webpack/pug");
const configureImg = require("./webpack/img");
const configureJS = require("./webpack/js");
const configureStyle = require("./webpack/style");
const configureClear = require("./webpack/clear");
const devServer = require("./webpack/server");
const sets = require("./webpack.settings");
const P = sets.paths;

module.exports = env => {
  const isDev = env === "development";

  return merge(
    {
      // The base directory, an absolute path, for resolving
      // ENTRY POINTS and LOADERS from configuration.
      context: path.resolve(__dirname, P.src),

      entry: sets.entries,

      output: {
        path: path.resolve(__dirname, P.dist),
        filename: P.distJS + "/[name].[hash].js",
        chunkFilename: P.distJS + "/[name].[chunkhash].js"
      }
    },

    isDev ? {
      devtool: "cheap-module-eval-source-map",
      mode: "development"
    } : {
      devtool: "source-map",
      mode: "production"
    }, {

      resolve: {
        alias: {
          "~": path.resolve(__dirname, "src/node_modules/"),
          "~pug": path.resolve(__dirname, "src/pug/"),
          "~js": path.resolve(__dirname, "src/js/"),
          "~styles": path.resolve(__dirname, "src/styles/"),
          "~images": path.resolve(__dirname, "src/images/"),
          "~components": path.resolve(__dirname,
            "src/components/")
        }
      },

      optimization: {
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
              // или можно более конкретно
              // test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
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
        // для доступа к обозначенной переменной
        // в коде проекта вне Webpack
        new webpack.DefinePlugin({
          ENV: JSON.stringify(isDev ?
            "development" : "production")
        })
      ].concat(isDev ? [
        // для использования HotReload подключаем плагин здесь,
        // опцию hot = true в настройках сервера и соответсвующий
        // код в исходниках
        new webpack.HotModuleReplacementPlugin(),
        new DashboardPlugin()
      ] : [



        // new webpack.SourceMapDevToolPlugin({
        //   filename: "[file].map",
        //   append: "\n//# sourceMappingURL = " +
        //     path.resolve(P.dir, P.dist, P.distJS, "[url]")
        // })




      ])
    },
    configureCopy(),
    configureFont(),
    configurePug(),
    configureImg(isDev),
    configureJS(),
    configureStyle(isDev),
    isDev ? devServer() : configureClear()
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
