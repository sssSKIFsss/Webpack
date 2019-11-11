'use strict';

import welcome from './modules/welcome';

welcome('MAIN page');
//exports .weLcome = welcome;

// подгружаем модуль login динамически при нажатии кнопки
document.getElementById('login_button').onclick = function () {
	require.ensure([], function(require) {
		let login = require('./modules/login');
		login();
	})
};

// библиотека может подключаться благодаря вызову ёё символов в коде и
// объявлении в разделе plugins через webpack.ProvidePlugin
// console.log($);
// console.log(jQuery);
