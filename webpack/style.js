const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const sets = require("../webpack.settings");
const PATHS = sets.paths;

module.exports = function (devMode) {
  return {
    module: {
      rules: [{
        test: /\.(sa|sc|c)ss$/,
        // include: sets.styleLoaderConfig,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              // postcss & resolve-url & sass loaders used
              importLoaders: 3,
              sourceMap: true
            }
          },
          "resolve-url-loader",
          {
            loader: "sass-loader",
            options: {sourceMap: true}
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: {
                //path: __dirname,
                //path: path.resolve(PATHS.config),
                // path: path.resolve(PATHS.dir),
                ctx: {
                  devMode: devMode,
                  browsers: sets.browsers,
                  ignoreCssFiles: sets.ignoreCssFiles
                }
              }
            }
          }
        ]
      }]
    },
    plugins: [
      new webpack.SourceMapDevToolPlugin({
        filename: "[file].map"
      }),
      // mini-css-extract-plugin ценен ещё и тем,что умеет делить(сплитить) основной код
      new MiniCssExtractPlugin({
        filename: path.join(
          PATHS.distCSS, devMode ? PATHS.distCssDevFile : PATHS.distCssProdFile
        ),
        chunkFilename: path.join(
          PATHS.distCSS, devMode ? PATHS.distCssDevChunk : PATHS.distCssProdChunk
        )
      })
    ]
  };
};


// const TerserJSPlugin = require('terser-webpack-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// optimization: {
// 	minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
// },
// вариант:
// new OptimizeCssAssetsPlugin({
// 	cssProcessor: postcss([CSSMQPlacker])
// })
