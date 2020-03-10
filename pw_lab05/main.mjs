import {GameState} from './GameState.mjs';
import {enableResetButton, buildListElement, showFoundLocations, isQuestComplete, updateGameWithHaversineSieveResults} from './functions.mjs';

(() => {
	let game = new GameState();	
	game.load()
	.then(() => {
		console.log(isQuestComplete(game));
		if(isQuestComplete(game)) enableResetButton(game);
		
		game.locations.map((loc) => buildListElement(loc));
		showFoundLocations(game);
		navigator.geolocation.watchPosition((geo) => updateGameWithHaversineSieveResults(geo, game));
		navigator.geolocation.getCurrentPosition(console.log, console.error);
	});

})();
