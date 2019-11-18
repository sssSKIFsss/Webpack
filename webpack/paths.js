// const paths = require('path');
// const dir = paths.resolve(__dirname);

module.exports = function() {
	return {
		entry1        : './index.js',
		entry2        : './adminka.js',
		entry_vendors : ['jquery', 'bootstrap'], // bootstrap описан на сайте bootstrap
		src           : 'src',
		src_pug       : 'pug/pages',
		src_js        : 'js',
		src_css       : 'styles/css',
		src_scss      : 'styles/scss',
		src_img       : 'images',
		src_fonts     : 'fonts',
		src_components: 'components',
		src_htaccess  : '.htaccess',
		dist          : 'dist',
		dist_js       : 'js',
		//js_file  : '[name].[chunkhash].js', // name берёт название ярлыка - т.е. "app"
		dist_js_file  : '[name].[hash].js', // name берёт название ярлыка - т.е. "app"
		dist_css      : 'css',
		dist_css_file : '[name].[hash].css', // возможно вместо [hash] - [contenthash]
		dist_img      : 'img',
		dist_fonts    : 'fonts',
		config        : 'webpack'
	}
};

