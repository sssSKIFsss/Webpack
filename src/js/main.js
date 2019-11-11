'use strict';

import welcome from './modules/welcome';
// let welcome = require('./modules/welcome');

console.log("Hi from MAIN.JS");
welcome('MAIN_JS!');

// не получается сделать экспорт отсюда, если есть родительский файл, например, index.js
// приходится делать экспорт из родителя - index.jsm

exports.welcome = welcome;




