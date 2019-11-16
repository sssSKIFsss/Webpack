'use strict';

let modeMessage = '!! ОПРЕДЕЛЯЕМ РЕЖИМ КОМПИЛЯЦИИ !!/n';

export function getMode(devFlag) {
	if(devFlag) {
		modeMessage += '!! ОБНАРУЖЕН РЕЖИМ РАЗАРБОТКИ !!';
	} else {
		modeMessage += '!!! ОБНАРУЖЕН РЕЖИМ ПРОДАКШЕНА !!!';
	}
	alert(modeMessage);
}
