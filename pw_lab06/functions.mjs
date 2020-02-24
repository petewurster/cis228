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
		result.textContent = plus(x, y);
	}
	if(operation === '-') {
		result.textContent = minus(x, y);
	}
	if(operation === '*') {
		result.textContent = mult(x, y);
	}
	if(operation === '/') {
		result.textContent = div(x, y);
	}
}

export {calculate};