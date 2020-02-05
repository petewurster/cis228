'use strict';

document.addEventListener('DOMContentLoaded', main);

const API_ROOT_URL = 'https://messenger.ccp-lessons.com/message';

const displayPost = (data) => {
	document.getElementById('id').textContent = `post #${data.id}`;
	document.getElementById('message').textContent = `${data.message}`;
	document.getElementById('user').textContent = `--${data.jnum}`;
}

let xMit = {
	headers: {
		'Content-Type': 'application/json'
	}
};

function postMessage() {
	xMit.method = "POST";
	xMit.body = JSON.stringify(getState());
	document.getElementById('messageText').value = '';

	fetch(API_ROOT_URL, xMit)
		.then((reply) => reply.json())
		.then((json) => pullMessage(getState().jnum, json.id, displayPost));
}

function pullMessage(jnum, messageId, callbackJustBecause) {
	xMit.method = "GET";
	xMit.body = null;
	let address = API_ROOT_URL + `/${jnum}/${messageId}`;

	fetch(address, xMit)
		.then((reply) => reply.json())
		.then((json) => callbackJustBecause(json));
}

function getState() {
	return {
		jnum: `J${document.getElementById('jNumber').value}`,
		message: document.getElementById('messageText').value
	}
}

function main() {
	document.getElementById('post').addEventListener('click', postMessage);
}