import('./js/main');

console.log("Hi from INDEX.JS");

import welcome from './js/modules/welcome';
welcome('INDEX.JS!');
exports.welcome = welcome;
