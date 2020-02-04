'use strict';

document.addEventListener('DOMContentLoaded', main);

const API_ROOT_URL = 'https://messenger.ccp-lessons.com/message';

const displayPost = (data) => {
	document.getElementById('messageText').value = '';
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

	fetch(API_ROOT_URL, xMit)
		.then((reply) => {
			return reply.json();
		})
		.then((json) => {
			pullMessage(json.id, displayPost);
		});
}

function pullMessage(messageId, callbackJustBecause) {
	xMit.method = "GET";
	xMit.body = null;
	let address = API_ROOT_URL + `/${getState().jnum}/${messageId}`;

	fetch(address, xMit)
		.then((reply) => {
			return reply.json();
		})
		.then((json) => {
			callbackJustBecause(json);
		});
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