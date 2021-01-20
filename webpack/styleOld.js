const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const s = require("../webpack.settings");

const cssLoaders = (isDev, isSCSS) => {
  return [
    {
      // isDev ?
      //   "style-loader" :
      //   MiniCssExtractPlugin.loader,
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true,
        sourceMap: true
      }
    }, {
      loader: "css-loader",
      options: {
        sourceMap: true,
        modules: true,
        importLoaders: isSCSS ? 2 : 1
      }
    }, {
      loader: "resolve-url-loader",
      options: {
        sourceMap: true
      }
    }, {
      loader: "sass-loader",
      options: { sourceMap: true }
    }

    // пробный вариант
    // isSCSS ? {
    //   loader: "sass-loader",
    //   options: { sourceMap: true }
    // } : { }
    // , {
    //   loader: "postcss-loader",
    //   options: {
    //     ident: "postcss",
    //     parser: "postcss-scss",
    //     syntax: "postcss-scss",
    //     sourceMap: true,
    //     plugins: () => [
    //       // require("postcss-import")(),
    //       // require("postcss-nested")(),
    //       // require("stylelint")(),
    //       require("doiuse")({
    //         sourceMap: true,
    //         // browsers: "../.browserslistrc" по-умолчанию,
    //         ignore: "rem",
    //         ignoreFiles: ["**/font/**/*.css", "**/tmp/**/*.css", "**/temp/**/*.css"]
    //       }),
    //       require("autoprefixer")({
    //         sourceMap: true,
    //         grid: true
    //       })
    //     ].concat(
    //       isDev ? [] : [
    //         require("css-mqpacker")({
    //           sourceMap: true
    //         }),
    //         require("cssnano")({
    //           preset: [
    //             "default",
    //             {
    //               sourceMap: true,
    //               discardComments: {removeAll: true}
    //             }
    //           ]
    //         })
    //       ]
    //     )
    //   }
    // }

    // почти рабочий вариант 1
    // {
    // loader: "postcss-loader",
    // options: {
    //   ident: "postcss",
    //   //exec: true,
    //   sourceMap: true,
    //   plugins: () => [
    //     // require("postcss-import")(),
    //     // require("postcss-nested")(),
    //     require("doiuse")({
    //       sourceMap: true,
    //       // browsers: "../.browserslistrc" по-умолчанию,
    //       ignore: "rem",
    //       ignoreFiles: ["**/font/**/*.css", "**/tmp/**/*.css", "**/temp/**/*.css"]
    //     }),
    //     require("autoprefixer")({
    //       sourceMap: true,
    //       grid: true
    //     })
    //   ].concat(
    //     isDev ? [] : [
    //       require("css-mqpacker")({
    //         sourceMap: true
    //       }),
    //       require("cssnano")({
    //         preset: [
    //           "default",
    //           {
    //             sourceMap: true,
    //             discardComments: {removeAll: true}
    //           }
    //         ]
    //       })
    //     ]
    //   )
    // }
    //}

  ];
};

module.exports = isDev => {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include: [
            path.resolve(s.dir, s.src, s.srcStyles),
            path.resolve(s.dir, s.src, s.srcComponents)
          ],
          use: cssLoaders(isDev, false)
        }, {
          test: /\.s[ac]ss$/,
          include: [
            path.resolve(s.dir, s.src, s.srcStyles),
            path.resolve(s.dir, s.src, s.srcComponents)
          ],
          use:

            cssLoaders(isDev, true)

          // почти рабочий вариант 1
          // cssLoaders(isDev, true).concat([{
          //   loader: "sass-loader",
          //   options: {sourceMap: true}
          // }])


        }
      ]
    },

    plugins: [
      new MiniCssExtractPlugin(
        {
          path: path.resolve(s.dir, s.dist),
          filename: s.distStyle + "/" + s.fileName(isDev) + "css",
          chunkFilename: s.distStyle + "/" + s.chunkFileName(isDev) + "css"
        }
      ),
      new StylelintPlugin({
        context: "../",
        configFile: ".stylelintrc.js"
      })
    ]
  };
};
