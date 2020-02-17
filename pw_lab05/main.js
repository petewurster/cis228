'use strict';

document.addEventListener('DOMContentLoaded', main);

function buildList(location) {
	location.forEach((place) => {
		let main = document.querySelector('main');
		let newDiv = document.createElement('div');
		let h2 = document.createElement('h2');
		let h2span = document.createElement('span');
		let text = document.createTextNode('Clue:');
		h2.appendChild(h2span);
		h2.appendChild(text);
		text = document.createTextNode('!');
		h2span.appendChild(text);
		newDiv.appendChild(h2);
		let p = document.createElement('p');
		p.id = place.id;
		text = document.createTextNode('');
		p.textContent = place.clue;
		newDiv.appendChild(p);

		if(!place.isFound) {
			p = document.createElement('p');
			text = document.createTextNode(place.name);
			p.appendChild(text);
			newDiv.appendChild(p);
			let innerDiv = document.createElement('div');
			let img = document.createElement('img');
			innerDiv.appendChild(img);
			newDiv.appendChild(innerDiv);
			img.src = fetch(`${URL_ROOT}/${place.id}.jpg`)
				.then((response) => response.blob())
				.then((blob) => img.src = URL.createObjectURL(blob));
		}
		
		main.appendChild(newDiv);
		// document.querySelector('h2').addEventListener('click', (e) => {
		// 	console.log(e.target);
		// });


	});

}

function main() {
	let game = new GameState();	
	game.load()
	.then(() => {
		buildList(game.locations);



	});

	

// ${place.found? "&#9989;": "&#10067;"}
	// <h2><span id="" class="notFound">&#10067;&#9989;</span>Clue:</h2>
	// <p id=clue></p>

	// <div>
	// 	<img src="">
	// </div>








	// });
}

