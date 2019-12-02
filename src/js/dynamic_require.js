import "./modules/common";
import welcome from "./modules/welcome";

welcome("MAIN page");

// подгружаемый динамический модуль будем компоновать в файл "button"
// подгружаем модуль при нажатии кнопки ID="login_button"
document.getElementById("requireButton").onclick = function () {
	// noinspection JSUnresolvedFunction
	require.ensure([], function(require) {
		let login = require("./modules/ensure_block");
		login();
	}, "requireButton");
};
