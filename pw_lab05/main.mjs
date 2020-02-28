import * as C from './constants.mjs';
import {GameState} from './GameState.mjs';
import {buildListElement, fetchImage, showFoundLocations, distance, updateElement} from './functions.mjs';

(() => {
	let game = new GameState();	
	game.load()
	.then(() => {
		game.locations.map((loc) => buildListElement(loc));
		showFoundLocations(game);
		

	});


	navigator.geolocation.watchPosition((g) => {
		console.log(game.locations[0].lat, game.locations[0].lon);
		console.log(g.coords.latitude, g.coords.longitude);
		let km = distance(g.coords.latitude, g.coords.longitude, game.locations[0].lat, game.locations[0].lon);
		console.log(km);
		if (km <= .003) {


	// });

//39.960689
//-75.168

///add logic to determine DOM position based on which location matches up

	//simulates finding the object
	// document.addEventListener('click', (e) => {
		let elem = e.target.parentNode;
		let i = e.target.parentNode.id.slice(5) - 1;
		updateElement(elem, game.locations[i]);
		fetchImage(elem, game.locations[i]);
		game.save(game.locations);
		}
	});





})();

