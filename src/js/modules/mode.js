let add = (a, b) => a + b;
console.log( add(3, 5) );

if(NODE_ENV === 'development') {
	console.log('!!!!!!!!!!!!! РЕЖИМ РАЗАРБОТКИ !!!!!!!!!!!!!!');
} else {
	console.log('!!!!!!!!!!!!! РЕЖИМ ПРОДАКШЕНА !!!!!!!!!!!!!!');
}