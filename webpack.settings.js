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

  fileName:
    (isDev) => isDev ? "[name]." : "[name].[hash].",
  chunkFileName:
    (isDev) => isDev ? "[id]." : "[id].[hash].",

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
  }
};
