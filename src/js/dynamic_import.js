'use strict';

// подгружаем модуль динамически при нажатии кнопки
// через современный механизм await import

async function getTemplate(message) {
	try {
		let template = await import(/* webpackChunkName: "importButton" */ './modules/import_block');
		alert(template.default + message);
	} catch(err) {
		console.error("template error");
		return new Error(err);

	}
}

document.getElementById('importButton').onclick = function () {
	getTemplate(" из dynamic_import => dynamic_block");

};
