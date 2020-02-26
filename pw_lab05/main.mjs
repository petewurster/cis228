'use strict';
import {GameState} from './GameState.mjs';
import * as C from './constants.mjs';

document.addEventListener('DOMContentLoaded', main);

function buildList(location) {
	location.forEach((loc) => {
		let main = document.querySelector('main');
		let newDiv = document.createElement('div');
		newDiv.id = `div_${loc.id}`;
		let h2 = document.createElement('h2');
		let h2span = document.createElement('span');
		let text = document.createTextNode(`Clue: ${loc.clue}`);
		h2.appendChild(h2span);
		h2.appendChild(text);
		text = document.createTextNode(String.fromCodePoint(0x2753));
		h2span.appendChild(text);
		h2span.id = `h2_span_${loc.id}`;
		newDiv.appendChild(h2);
		h2.id = `h2_${loc.id}`;

		if(loc.isFound) {
			h2span.textContent = String.fromCodePoint(0x2705);
			let p = document.createElement('p');
			let text = document.createTextNode(loc.name);
			p.appendChild(text);
			newDiv.appendChild(p);
			let innerDiv = document.createElement('div');
			let img = document.createElement('img');
			innerDiv.appendChild(img);
			newDiv.appendChild(innerDiv);
		}
		main.appendChild(newDiv);

	});

	
	//this filter-map only applies event listener to "found" objects
	Array.from(document.querySelectorAll(`[id^='div_p']`))
		.filter((elem) => location[elem.id.slice(5) - 1].isFound)
		.map((elem) => fetchImage(elem));


}

const fetchImage = (ref) => {
	let loc = ref.firstChild.id.slice(3);
	let img = document.querySelector(`#${ref.id} div img`);
	img.src = fetch(`${C.URL_ROOT}/${loc}.jpg`)
			.then((response) => response.blob())
			.then((blob) => img.src = URL.createObjectURL(blob));

}

function main() {
	let game = new GameState();	
	game.load()
	.then(() => {
		buildList(game.locations);



	});

	


}

