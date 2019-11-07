'use strict';

export default function(message) {
	if(NODE_ENV === 'production') {
		console.log(message);
	}
	alert(`Welcome ${message}`);
};