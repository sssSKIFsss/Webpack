'use strict';


let modeMessage = '!! ОПРЕДЕЛЯЕМ РЕЖИМ КОМПИЛЯЦИИ !!/n';

export function getMode(isDev) {
	if(isDev) {
		modeMessage += '!! ОБНАРУЖЕН РЕЖИМ РАЗАРБОТКИ !!';
	} else {
		modeMessage += '!!! ОБНАРУЖЕН РЕЖИМ ПРОДАКШЕНА !!!';
	}
	alert(modeMessage);
}
