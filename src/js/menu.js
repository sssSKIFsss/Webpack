'use strict';

async function showMenu() {
	try {
		let menu = await import(/* webpackChunkName: "menuButton" */ '~components/menu');
		let homeMenu = new menu.default({
			title: 'Комнаты дома',
			items: [{
				text: 'Детская',
				href: '#childroom'
			},{
				text: 'Кухня',
				href: '#kitchen'
			},{
				text: 'Гостиная',
				href: '#guestroom'
			}]
		});
		document.body.appendChild(homeMenu.elem);
	} catch(err) {
		console.error("menu error");
		return new Error(err);
	}
}

document.getElementById('menuButton').onclick = function () {
	showMenu();
};
