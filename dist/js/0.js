(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([[0],{

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// import welcome from './modules/welcome';
let welcome = __webpack_require__(/*! ./modules/welcome */ "./src/js/modules/welcome.js");

console.log("Hi from MAIN.JS");
welcome('MAIN_JS!');


// не получается сделать экспорт отсюда, если есть родительский файл, например, index.js
// приходится делать экспорт из родителя - index.jsm

// exports.welcome = welcome;






/***/ })

}]);