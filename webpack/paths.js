'use strict';
//
module.exports = {
	entry1: './index.js',
	entry2: './adminka.js',
	// entry_vendors : ['jquery', 'bootstrap'],
	// bootstrap описан на сайте bootstrap
	entryVendors: 'jquery',
	src: 'src',
	srcPug: 'pug/pages',
	srcJS: 'js',
	srcCSS: 'styles/css',
	srcSCSS: 'styles/scss',
	srcImg: 'images',
	srcFavicon: 'favicon/favicon.png',
	srcFonts: 'fonts',
	srcComponents: 'components',
	srcHtaccess: '.htaccess',
	dist: 'dist',
	distJS: 'js',
	// строка снизу distJsFile: '[name].[chunkhash].js',
	distJsFile: '[name].[hash].js',
	// строка снизу distJsChunk: '[name].[chunkhash].js',
	distJsChunk: '[name].[hash].js',
	distCSS: 'css',
	// строка снизу distJsChunk: '[name].[contenthash].js',
	distCssFile: '[name].[hash].css',
	distImg: 'img',
	distFavicon: 'favicon',
	distFonts: 'fonts',
	config: 'webpack'
};

