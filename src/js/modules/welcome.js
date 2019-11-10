'use strict';

// export default function (message) {
// 	console.log("Hi from WELCOME.JS");
// 	alert(`Welcome ${message}`);
// };

module.exports = function (message) {
	if(ENV !== 'production') {
		console.log("Hi from WELCOME.JS with DEVELOPMENT or BUILD mode");
	} else {
		console.log("Hi from WELCOME.JS with PRODUCTION mode");
	}
	alert(`Welcome ${message}`);
};
