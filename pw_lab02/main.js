'use strict';

document.addEventListener('DOMContentLoaded',() =>
	document.getElementById('replaceButton').addEventListener('click', replaceText));

function replaceText() {
	let env = grabState();
	//fail-fast
	if(env.find === '' || env.find === null) { return }

	let regex = new RegExp(`${env.find}`, `${env.ignoreCase? 'i': ''}`);

	document.getElementById('textArea').value = env.textArea.replace(regex, env.replace);
	//recursive as needed
	if(env.textArea.match(regex) !== null && env.replaceAll === true) { replaceText() }
}

function grabState() {
	return {
		textArea: document.getElementById('textArea').value,
		ignoreCase: document.getElementById('ignoreCase').checked,
		replaceAll: document.getElementById('replaceAll').checked,
		find: document.getElementById('find').value,
		replace: document.getElementById('replace').value
	}
}