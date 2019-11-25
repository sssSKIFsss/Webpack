'use strict';
// import './menu.scss';
import template from './menu.pug';

export default  class Menu {
	constructor(options) {
		this.elem = document.createElement('dev');
		this.elem.className = 'menu';

		this.elem.innerHTML = template(options);
		this.titleElem = this.elem.querySelector('.title');
		this.titleElem.onclick = () => this.elem.classList.toggle('open');
		this.titleElem.onmousedown = () => false;
	}
}


