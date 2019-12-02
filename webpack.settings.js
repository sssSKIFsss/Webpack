/* eslint-disable */
// webpack.settings.js - webpack settings config
"use strict";

require("dotenv").config;

// noinspection WebpackConfigHighlighting
module.exports = {
	paths: {
		entry1: "./index.js",
		entry2: "./adminka.js",
		entryVendors: "jquery",
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
		distJS: "dist/js",
		distJsFile: "[name].[hash].js",
		distJsChunk: "[name].[chunkhash].js",
		distCSS: "dist/css",
		distCssFile: "[name].[hash].css",
		distImg: "dist/img",
		// неполный путь для favicon
		distFavicon: "img/favicon",
		distFonts: "dist/fonts",
		config: "webpack",
		templates: "templates"
	},
	// "name" исправить в  "package.json"
	copyright: "Example Company, Inc.",

	// настройка сервера
	urls: {
		live: "https://example.com/",
		local: "http://example.test/",
		critical: "http://example.test/",
		publicPath: () => process.env.PUBLIC_PATH || "/dist/",
	},
	devServerConfig: {
		public: () => process.env.DEVSERVER_PUBLIC || "http://localhost:8081",
		host: () => process.env.DEVSERVER_HOST || "localhost",
		poll: () => process.env.DEVSERVER_POLL || false,
		port: () => process.env.DEVSERVER_PORT || 8081,
		https: () => process.env.DEVSERVER_HTTPS || false,
	},
	vars: {
		cssName: "styles"
	},
	entries: {
		"app": "app.js"
	},
	babelLoaderConfig: {
		exclude: [
			/(node_modules|bower_components)/
		],
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
			/^manifest.*\\.js(?:on)?$/,
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
