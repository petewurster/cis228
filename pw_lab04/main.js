'use strict';

document.addEventListener('DOMContentLoaded', main);

const API_ROOT_URL = 'https://messenger.ccp-lessons.com/message';

const updatePage = (json) => {
	document.getElementById('id').textContent = `post #${json.id}`;
	document.getElementById('message').textContent = `${json.message}`;
	document.getElementById('user').textContent = `--${json.jnum}`;
}

function bounceMessage() {
	//prepare xMit for POST
	let xMit = {
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json, text/html, text/plain'
		},
		method:  "POST",
		body: JSON.stringify(getState())
	};
	
	//clear textArea
	document.getElementById('messageText').value = '';

	//send POST
	fetch(API_ROOT_URL, xMit)
		.then((reply) => reply.json())
		.then((json) => {
			//alter xMit for GET
			xMit.method = "GET";
			xMit.body = null;
			let address = API_ROOT_URL + `/${getState().jnum}/${json.id}`;
			//send GET
			return fetch(address, xMit);
		})
		.then((reply) => reply.json())
		.then(updatePage);
}

function getState() {
	return {
		jnum: `J${document.getElementById('jNumber').value}`,
		message: document.getElementById('messageText').value
	}
}

function main() {
	document.getElementById('post').addEventListener('click', bounceMessage);
}