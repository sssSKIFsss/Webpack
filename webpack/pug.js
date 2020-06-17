const fs = require("fs");
const path = require("path");
const FaviconWebpackPlugin = require("favicons-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const sets = require("../webpack.settings");

const P = sets.paths;
const PAGES_DIR = path.resolve(P.src, P.srcPug);
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith(".pug"));

module.exports = function () {
  return {
    module: {
      rules: [{
        test: /\.pug$/,
        include: [
          path.resolve(P.dir, P.src, P.srcPug),
          path.resolve(P.dir, P.src, P.srcComponents)
        ],
        use: [
          {
            loader: "pug-loader",
            options: {
              pretty: true
            }
          }, {
            loader: "pug-lint-loader",
            options: require("../.pug-lintrc")
          }
        ]
      }]
    },
    plugins: [
      ...PAGES.map(page => new HtmlWebpackPlugin({
        inject: true,
        template: `${PAGES_DIR}/${page}`,
        filename: `./${page.replace(/\.pug/, ".html")}`
      })),
      /*
      // ЛИБО ТАК
        new htmlWebpackPlugin({
          filename: "index.html",
          title: "Main Page",
          //favicon: "favicon.ico",
          template: `${PAGES_DIR}/index.pug`,
          chunksSortMode: "manual",
          chunks: ["app", "common", "vendors"],
        }),
        new htmlWebpackPlugin({
          filename: "adm.html",
          title: "Adm Page",
          //favicon: "favicon.ico",
          template: `${PAGES_DIR}/admin.pug`,
          chunksSortMode: "manual",
          chunks: ["adm", "common", "vendors"],
        }),
        */
      new FaviconWebpackPlugin({
        logo: path.resolve(P.dir, P.src, P.srcFavicon),
        outputPath: path.join(P.distFavicon),
        prefix: path.join(P.distFavicon),
        inject: "force"
      })
    ]
  };
};

// Возможно понадобятся следующие плагины
// html-webpack-injector
// html-webpack-template-pug
