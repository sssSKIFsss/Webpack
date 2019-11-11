'use strict';

// export default function (message) {
// 	console.log("Hi from WELCOME.JS");
// 	alert(`Welcome ${message}`);
// };

export default function(message) {
	// noinspection JSUnresolvedVariable
	if(ENV === 'development') {
		console.log("Hi from WELCOME.JS with DEVELOPMENT mode");
	} else {
		console.log("Hi from WELCOME.JS with PRODUCTION or BUILD mode");
	}
	alert(`Welcome ${message}`);
};
