import {GameState} from './GameState.mjs';
import {buildListElement, showFoundLocations, updateGameWithHaversineSieveResults} from './functions.mjs';

(() => {
	let game = new GameState();	
	game.load()
	.then(() => {
		game.locations.map((loc) => buildListElement(loc));
		showFoundLocations(game);
		navigator.geolocation.watchPosition((geo) => updateGameWithHaversineSieveResults(geo, game));
	});

})();
