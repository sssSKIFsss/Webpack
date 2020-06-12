// webpack.settings.js - webpack settings config
"use strict";

const path = require("path");
const projectPaths = {
  dir: __dirname,
  src: "src",
  srcPug: "src/pug/pages",
  srcJS: "src/js",
  srcStyles: "src/styles",
  srcImg: "src/images",
  srcFavicon: "src/images/favicon/favicon.png",
  srcFonts: "src/fonts",
  srcComponents: "src/components",
  srcHtaccess: "src/.htaccess",
  dist: "dist",
  distJS: "js",
  distJsFile: "[name].[hash].js",
  distJsChunk: "[name].[chunkhash].js",
  distCSS: "css",
  distCssDevFile: "[name].css",
  distCssProdFile: "[name].[hash].css",
  distCssDevChunk: "[id].css",
  distCssProdChunk: "[id].[hash].css",
  distImg: "img",
  // неполный путь для favicon
  distFavicon: "img/favicon",
  distFonts: "fonts",
  config: "webpack",
  templates: "templates"
};

// noinspection WebpackConfigHighlighting
module.exports = {
  paths: projectPaths,
  // "name" исправить в  "package.json"
  copyright: "Example Company, Inc.",
  entries: {
    app: "./index.js",
    adm: "./adminka.js",
    vndrs: "jquery"
    //
    // общий для входных файлов код "dynamic_import" можно
    // выделить в отдельный бандл вручную, не используя
    // секцию optimization/splitChunds так:
    // app: { import: "./index.js", dependOn: "shared" },
    // adm: { import: "./adminka.js", dependOn: "shared" },
    // vendors: "jquery",
    // shared: "./js/dynamic_import.js"
  },
  devServerConfig: {
    public: () => "http://localhost:8081",
    host: () => "localhost",
    poll: () => false,
    port: () => 8081,
    https: () => false
  },
  browsers: [
    "> 1%",
    "last 1 major version",
    "not dead",
    "Chrome >= 45",
    "Firefox >= 38",
    "Edge >= 12",
    "Explorer >= 10",
    "iOS >= 9",
    "Safari >= 9",
    "Android >= 4.4",
    "Opera >= 30"
  ],
  ignoreCssFiles: ["**/font/**/*.css", "**/tmp/**/*.css", "**/temp/**/*.css"],

  styleLoaderConfig: [
    path.resolve(projectPaths.srcStyles),
    path.resolve(projectPaths.srcComponents)
  ],

  // urls: {
  // 	live: "https://example.com/",
  // 	local: "http://example.test/",
  // 	critical: "http://example.test/",
  // 	publicPath: () => process.env.PUBLIC_PATH || "/dist/",
  // },
  // vars: {
  // 	cssName: "styles"
  // },
  babelLoaderConfig: {
    exclude: [
      /(node_modules|bower_components)/
    ]
  },
  copyWebpackConfig: [
    {
      from: "./src/js/workbox-catch-handler.js",
      to: "js/[name].[ext]"
    }
  ],
  criticalCssConfig: {
    base: "./web/dist/criticalcss/",
    suffix: "_critical.min.css",
    criticalHeight: 1200,
    criticalWidth: 1200,
    ampPrefix: "amp_",
    ampCriticalHeight: 19200,
    ampCriticalWidth: 600,
    pages: [
      {
        url: "",
        template: "index"
      }
    ]
  },
  manifestConfig: {
    basePath: ""
  },
  purgeCssConfig: {
    paths: [
      "./templates/**/*.{twig,html}",
      "./src/vue/**/*.{vue,html}"
    ],
    whitelist: [
      "./src/css/components/**/*.{css}"
    ],
    whitelistPatterns: [],
    extensions: [
      "html",
      "js",
      "twig",
      "vue"
    ]
  },
  saveRemoteFileConfig: [
    {
      url: "https://www.google-analytics.com/analytics.js",
      filepath: "js/analytics.js"
    }
  ],
  createSymlinkConfig: [
    {
      origin: "img/favicons/favicon.ico",
      symlink: "../favicon.ico"
    }
  ],
  webappConfig: {
    logo: "./src/img/favicon-src.png",
    prefix: "img/favicons/"
  },
  workboxConfig: {
    swDest: "../sw.js",
    precacheManifestFilename: "js/precache-manifest.[manifestHash].js",
    importScripts: [
      "/dist/workbox-catch-handler.js"
    ],
    exclude: [
      /\.(png|jpe?g|gif|svg|webp)$/i,
      /\.map$/,
      /^manifest.*\\.js(?:on)?$/
    ],
    globDirectory: "./web/",
    globPatterns: [
      "offline.html",
      "offline.svg"
    ],
    offlineGoogleAnalytics: true,
    runtimeCaching: [
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,
        handler: "cacheFirst",
        options: {
          cacheName: "images",
          expiration: {
            maxEntries: 20
          }
        }
      }
    ]
  }
};
