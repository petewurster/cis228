'use strict';

function main() {
	document.addEventListener('DOMContentLoaded', () => {
		let result = document.getElementById('result');
		
		document.getElementById('calculate').addEventListener('click', (e) => {
			let form = e.target.parentNode.children;
			result.textContent = Function(`return Number(form[0].value) ${form[1].value} Number(form[2].value)`)();
		});
	});
}

main();