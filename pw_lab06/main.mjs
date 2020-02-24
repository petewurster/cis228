'use strict';

import {calculate} from './functions.mjs';

function main() {
	document.addEventListener('DOMContentLoaded', () => {
		let form = document.getElementById('form').children;
		let result = document.getElementById('result');
		
		document.getElementById('calculate').addEventListener('click', calculate);
	});
}

main();