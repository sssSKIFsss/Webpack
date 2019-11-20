'use strict';

// подгружаем модуль massage динамически при нажатии кнопки
// через современный механизм await import

async function getTemplate(message) {
	try {
		let template = await import('./modules/dynamic_block');
		alert(JSON.stringify(template)+" "+message);
	} catch(err) {
		console.error("template error");
		return new Error(err);
	}
}

document.getElementById('dynamic_import').onclick = function () {
	getTemplate(" из dynamic_import => dynamic_block");

};
