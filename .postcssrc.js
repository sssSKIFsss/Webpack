"use strict";

const postcssScss = require("postcss-scss");

module.exports = (ctx) => ({
	ident: "postcss",
	parser: "postcss-scss",
	syntax: "postcss-scss",
	plugins: {
		// если postcss-loader стоит раньше, чем scss-loader, то не включаем
		// "postcss-import": {},

		// "postcss-nested": {},
	 	stylelint: {},

		// doiuse: {
		// 	browsers: ctx.options.browsers,
		// 	ignore: "rem",
		// 	ignoreFiles: ctx.options.ignoreCssFiles
		// }
		// ...ctx.options.devMode === false ? {
		// 	autoprefixer: { grid: true },
		// 	"css-mqpacker": {},
		// 	cssnano: {
		// 		preset: [
		// 			"default",
		// 			{
		// 				discardComments: {
		// 					removeAll: true
		// 				}
		// 			}
		// 		]
		// 	}
		// } : {}
	}
});

// module.exports = ({ctx}) => ({
// 	ident: "postcss",
// 	plugin: [
// 		require("stylelint")(),
// 		require("postcss-import")(),
// 		require("postcss-url")(),
// 		require("autoprefixer")(),
// 		...ctx.options.devMode !== true ?
// 			require("cssnano")({ preset: "default"})() : false
//
// 	]
// });
// "postcss-import": {
// 	plugins: {
// 		stylelint: {}
// 	}
// },
// 		...ctx.options.devMode !== true ? {
// 			autoprefixer: { grid: true },
// 			"css-mqpacker": {},
// 			cssnano: {
// 				preset: [
// 					"default",
// 					{
// 						discardComments: {
// 							removeAll: true
// 						}
// 					}
// 				]
// 			}
// 		} : {}

// module.exports = (ctx) => {
// 	return {
// ident: "postcss",
// "postcss-import": {
// 	plugins: {
// 		stylelint: {}
// 	}
// },
// 		...ctx.options.devMode !== true ? {
// 			autoprefixer: { grid: true },
// 			"css-mqpacker": {},
// 			cssnano: {
// 				preset: [
// 					"default",
// 					{
// 						discardComments: {
// 							removeAll: true
// 						}
// 					}
// 				]
// 			}
// 		} : {}
// 	};
// };

// module.exports = (ctx) => {
// 	return {
// 		ident: "postcss",
// 		plugins: {
// 			"postcss-import": {},
// 			...ctx.options.devMode === false ? {
// 				autoprefixer: { grid: true },
// 				"css-mqpacker": {},
// 				cssnano: {
// 					preset: [
// 						"default",
// 						{
// 							discardComments: {
// 								removeAll: true
// 							}
// 						}
// 					]
// 				}
// 			} : {}
// 		}
// 	};
// };


// "stylelint": {},
// "UnCSS" : {}, разобраться как работает с pug
