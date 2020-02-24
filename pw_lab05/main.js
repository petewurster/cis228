'use strict';
import {GameState, URL_ROOT} from './GameState.js';

document.addEventListener('DOMContentLoaded', main);

function buildList(location) {
	location.forEach((loc) => {
		let main = document.querySelector('main');
		let newDiv = document.createElement('div');
		let h2 = document.createElement('h2');
		let h2span = document.createElement('span');
		let text = document.createTextNode('Clue:');
		h2.appendChild(h2span);
		h2.appendChild(text);
		text = document.createTextNode(String.fromCodePoint(0x2753));
		h2span.appendChild(text);
		newDiv.appendChild(h2);
		let p = document.createElement('p');
		p.id = loc.id;
		h2.id = `h2_${loc.id}`;
		text = document.createTextNode('');
		p.textContent = loc.clue;
		newDiv.appendChild(p);

		if(loc.isFound) {
			h2span.textContent = String.fromCodePoint(0x2705);
			p = document.createElement('p');
			text = document.createTextNode(loc.name);
			p.appendChild(text);
			newDiv.appendChild(p);
			let innerDiv = document.createElement('div');
			let img = document.createElement('img');
			innerDiv.appendChild(img);
			newDiv.appendChild(innerDiv);
		}
		
		main.appendChild(newDiv);


	});

	const fetchImage = (ref) => {
		let loc = ref.firstChild.id.slice(3);
		console.log(`${ref.tagName} div img`);
		let img = document.querySelector(`${ref.tagName} div img`);
		img.src = fetch(`${URL_ROOT}/${loc}.jpg`)
				.then((response) => response.blob())
				.then((blob) => img.src = URL.createObjectURL(blob));

	}

	//this filter-map only applies event listener to "found" objects
	Array.from(document.querySelectorAll('h2'))
		.filter((elem) => location[elem.id.slice(4) - 1].isFound)
		.map((elem) => fetchImage(elem.parentNode));


}

function main() {
	let game = new GameState();	
	game.load()
	.then(() => {
		buildList(game.locations);



	});

	


}

