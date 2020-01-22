'use strict';

document.addEventListener('DOMContentLoaded',() => {
	document.getElementById('replaceButton').addEventListener('click', replaceText)
});

function replaceText() {
	let env = grabState();
	let regex = new RegExp(`${env.find}`, `${env.ignoreCase? 'i': ''}${env.replaceAll? 'g': ''}`);

	document.getElementById('textArea').value = env.textArea.replace(regex, env.replace);
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