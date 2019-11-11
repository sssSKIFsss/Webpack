'use strict';

import welcome from './modules/welcome';

welcome('MAIN page');
//exports .weLcome = welcome;

// подгружаемые динамически модули будем компоновать в файл 'button'

// подгружаем модуль massage динамически при нажатии кнопки
document.getElementById('login_button').onclick = function () {
	require.ensure([], function(require) {
		let login = require('./modules/login');
		login();
	}, 'button')
};

// подгружаем модуль login динамически при нажатии кнопки

document.getElementById('login_button').addEventListener('mouseover',  () => {
	require.ensure([], function(require) {
		console.log('The button was presser');
	}, 'button')
});








// document.getElementById('login_button').onclick = function () {
// 	require.ensure([], function(require) {
// 		let login = require('./modules/login');
// 		login();
// 	}, 'button')
// };

// библиотека может подключаться благодаря вызову ёё символов в коде и
// объявлении в разделе plugins через webpack.ProvidePlugin
// console.log($);
// console.log(jQuery);
