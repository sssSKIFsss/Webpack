'use strict';
module.exports = {
	entry1        : './index.js',
	entry2        : './adminka.js',
	// entry_vendors : ['jquery', 'bootstrap'], // bootstrap описан на сайте bootstrap
	 entry_vendors : ['jquery', 'bootstrap'], // bootstrap описан на сайте bootstrap
	src           : 'src',
	src_pug       : 'pug/pages',
	src_js        : 'js',
	src_css       : 'styles/css',
	src_scss      : 'styles/scss',
	src_img       : 'images',
	src_favicon   : 'favicon/favicon.png',
	src_fonts     : 'fonts',
	src_components: 'components',
	src_htaccess  : '.htaccess',
	dist          : 'dist',
	dist_js       : 'js',
	dist_js_file  : '[name].[hash].js',
	dist_js_chunk  : '[name].[hash].js', // [chunkhash]
	dist_css      : 'css',
	dist_css_file : '[name].[hash].css', // [contenthash]
	dist_img      : 'img',
	dist_favicon  : 'favicon',
	dist_fonts    : 'fonts',
	config        : 'webpack'
};

