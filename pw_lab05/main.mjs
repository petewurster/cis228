import {GameState} from './GameState.mjs';
import {enableResetButton, buildListElement, showFoundLocations, isQuestComplete, updateGameWithHaversineSieveResults} from './functions.mjs';

(() => {
	let game = new GameState();	
	game.load()
	.then(() => {
		if(isQuestComplete(game)) { enableResetButton(game) }
		
		game.locations.map((loc) => buildListElement(loc));
		showFoundLocations(game);
		let p = document.querySelector('#banner');
		navigator.geolocation.watchPosition((geo) => {console.log(99);p.textContent = `${geo.coords.latitude}, ${geo.coords.longitude}`}, () => {}, {enableHighAccuracy: true});
		navigator.geolocation.watchPosition((geo) => updateGameWithHaversineSieveResults(geo, game), () => {}, {enableHighAccuracy: true});
	});

})();

