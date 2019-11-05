const path = require('path');
const dir = path.resolve(__dirname);

module.exports = function() {
	return {
		project : dir.substr(0, (dir.length - '/webpack'.length)) + '/',
		src: {
			path    : 'src/',
			pug     : 'pug/pages',
			pug_file: 'index.pug',
			js      : 'js/',
			js_file1: 'index.js',
			js_file2: 'adminka.js', // вторая точка входа для личного кабинета
			css     : 'styles/css/',
			scss    : 'styles/scss/',
			img     : 'images/',
			fonts   : 'fonts/',
			htaccess: '.htaccess'
		},
		dist: {
			path    : 'dist/',
			js      : 'js/',
			js_file : '[name].[hash].js', // name берёт название ярлыка - т.е. "app"
			css     : 'css/',
			css_file: '[name].[hash].css',
			img     : 'images/',
			fonts   : 'fonts/'
		},
		config: {
			postcss: 'webpack/postcss.config.js'
		}
	}
};

