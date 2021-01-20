const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const s = require("../webpack.settings");

const cssLoaders = (isDev, isSCSS = false) => {
  return [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true,
        sourceMap: true
      }
    }, {
      loader: "css-loader",
      options: {
        modules: true,
        importLoaders: isSCSS ? 3 : 2,
        sourceMap: true
      }
    }, {
      loader: "resolve-url-loader",
      options: {
        sourceMap: true
      }
    }
  ];
};

const scssLoader = () => {
  return [{
    loader: "sass-loader",
    options: { sourceMap: true }
  }];
};

const postcssLoader = (isDev) => {
  return [{
    loader: "postcss-loader",
    options: {
      ident: "postcss",
      sourceMap: true,
      plugins: () => [
        // require("postcss-import")(),
        // require("postcss-nested")(),
        // require("stylelint")(),
        require("doiuse")({
          sourceMap: true,
          // browsers: "../.browserslistrc" по-умолчанию,
          ignore: "rem",
          ignoreFiles: ["**/font/**/*.css", "**/tmp/**/*.css", "**/temp/**/*.css"]
        }),
        require("autoprefixer")({
          sourceMap: true,
          grid: true
        })
      ].concat(
        isDev ? [] : [
          require("css-mqpacker")({
            sourceMap: true
          }),
          require("cssnano")({
            preset: [
              "default",
              {
                sourceMap: true,
                discardComments: {removeAll: true}
              }
            ]
          })
        ]
      )
    }
  }];
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
          use:
            cssLoaders(isDev, false).concat(
              postcssLoader(isDev))
        }, {
          test: /\.s[ac]ss$/,
          include: [
            path.resolve(s.dir, s.src, s.srcStyles),
            path.resolve(s.dir, s.src, s.srcComponents)
          ],
          use:
            cssLoaders(isDev, true).concat(
              postcssLoader(isDev)).concat(
              scssLoader())
        }
      ]
    },

    plugins: [
      new MiniCssExtractPlugin(
        {
          path: path.resolve(s.dir, s.dist),
          filename: s.distStyle + "/" + s.fileName(isDev) +
            "css",
          chunkFilename: s.distStyle + "/" +
            s.chunkFileName(isDev) + "css"
        }
      ),
      new StylelintPlugin({
        context: "../",
        configFile: ".stylelintrc.js"
      })
    ]
  };
};
