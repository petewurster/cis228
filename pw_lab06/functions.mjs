'use strict';

function plus(x, y) {
	return x + y;
}

function minus(x, y) {
	return x - y;
}

function mult(x, y) {
	return x * y;
}

function div(x, y) {
	return x / y;
}

function calculate() {
	let x = Number(form[0].value);
	let y = Number(form[2].value);
	let operation = form[1].value;

	if(operation === '+') {
		return plus(x, y);
	}
	if(operation === '-') {
		return minus(x, y);
	}
	if(operation === '*') {
		return mult(x, y);
	}
	if(operation === '/') {
		return div(x, y);
	}
}

export {calculate};