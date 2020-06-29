const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
//const CssNanoPlugin = require("cssnano-webpack-plugin");
const s = require("../webpack.settings");

const cssLoaders = (isDev, isSCSS = false) => {
  console.log("isSCSS = ", isSCSS);
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
        // требуется для правильной обработки импорта из postcss
        // 3 = postcss & resolve-url & sass loaders
        modules: true,
        importLoaders: isSCSS ? 3 : 2,

        sourceMap: true
      }
    }, {
      loader: "resolve-url-loader",
      options: {
        sourceMap: true
      }
    }, {
      loader: "postcss-loader",
      options: {
        sourceMap: true,
        config: {
          //path: __dirname,
          //path: path.resolve(PATHS.config),
          // path: path.resolve(PATHS.dir),
          ctx: {
            isDev: isDev,
            browsers: s.browsers
            // ignoreCssFiles: s.ignoreCssFiles
          }
        }
      }
    }
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
          use: cssLoaders(isDev)
        }, {
          test: /\.s[ac]ss$/,
          include: [
            path.resolve(s.dir, s.src, s.srcStyles),
            path.resolve(s.dir, s.src, s.srcComponents)
          ],
          use:
            cssLoaders(isDev, true).concat([{
              loader: "sass-loader",
              options: {sourceMap: true}
            }])
        }
      ]
    },

    // optimization: {
    //   minimizer: [
    //     new CssNanoPlugin({
    //       sourceMap: true,
    //       cssnanoOptions: {
    //         preset: ["default", {
    //           discardComments: { removeAll: true }
    //         }]
    //       }
    //     })
    //   ]
    // },

    plugins: [
      new MiniCssExtractPlugin(
        {
          path: path.resolve(s.dir, s.dist),
          filename: s.distStyle + "/" + s.fileName(isDev) + "css"
        }
      ),
      new StylelintPlugin({
        configFile: "../.stylelintrc.js",
        context: "../"
      })
    ]
  };
};
