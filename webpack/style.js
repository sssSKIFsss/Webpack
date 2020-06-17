const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const sets = require("../webpack.settings");
const P = sets.paths;

// ВАЖНО!!!!!!
// const ENV = require('yargs').argv.env;

module.exports = function (isDev) {
  return {
    module: {
      rules: [{
        test: /\.(sa|sc|c)ss$/,
        include: sets.styleLoaderConfig,
        use: [
          isDev ?
            "style-loader" :
            MiniCssExtractPlugin.loader,
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
      // mini-css-extract-plugin ценен ещё и тем,что умеет делить(сплитить) основной код
      new MiniCssExtractPlugin({

        // Experimental version !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        path: path.resolve(P.dir, P.dist),
        filename: P.distStyle + "/[name].[hash].css",
        chunkFilename: P.distStyle + "/[id].[hash].css"

        // Old versionm !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // filename: path.join(
        //   P.distStyle,
        //   isDev ? P.distCssDevFile : P.distCssProdFile
        // ),
        // chunkFilename: path.join(
        //   P.distStyle,
        //   isDev ? P.distCssDevChunk : P.distCssProdChunk
        // )
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
