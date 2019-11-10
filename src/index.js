import('./js/main');

console.log("Hi from INDEX.JS");

let welcome = require('./js/modules/welcome');
// import weLcome from './js/modules/welcome';
welcome('INDEX.JS!');
exports.welcome = welcome;
