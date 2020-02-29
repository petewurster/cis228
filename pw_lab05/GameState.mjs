import * as C from './constants.mjs';
import {Location} from './Location.mjs';

export class GameState {

	constructor(locations) {
		this.locations = locations;
		this.winConditionMet = false;
	}

	pullLocations() {
		return fetch(`${C.URL_ROOT}/locations.JSON`)
		.then((resp) => resp.json())
		.then((data) => {
			return data.map((loc) => new Location (loc));
		});
	}

	save(data) {
		localStorage.setItem('game', JSON.stringify(data));
	}

	load() {
		return new Promise((resolve) => {
			this.locations = JSON.parse(localStorage.getItem('game'));
			resolve(this.locations);
		})
		.then((locations) => {
			return (locations === null)? this.pullLocations(): locations;
		})
		.then(locations => {
			this.save(locations);
			this.locations = locations;
			return;
		});
	}
}