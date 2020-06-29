// webpack.settings.js - webpack settings config
"use strict";

module.exports = {
  dir: __dirname,
  src: "src",
  srcPug: "pug",
  srcJS: "js",
  srcStyles: "styles",
  srcImg: "images",
  srcFavicon: "favicon",
  srcFonts: "fonts",
  srcComponents: "components",
  srcHtaccess: ".htaccess",
  dist: "dist",
  distJS: "js",
  distStyle: "css",
  distImg: "img",
  distFavicon: "favicon",
  distFonts: "fonts",
  config: "webpack",
  templates: "templates",

  fileName: (isDev) => isDev ? "[name]." : "[name].[hash].",

  entries: {
    app: "./js/main.js",
    adm: "./js/adminka.js",
    jquery: "jquery"
    // общий для входных файлов код "dynamic_import" можно
    // выделить в отдельный бандл вручную, не используя
    // секцию optimization/splitChunds так:
    // app: { import: "./index.js", dependOn: "shared" },
    // adm: { import: "./adminka.js", dependOn: "shared" },
    // vendors: "jquery",
    // shared: "./js/dynamic_import.js"
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
  ]
};
