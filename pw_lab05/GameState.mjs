import * as C from './constants.mjs';
import {Location} from './Location.mjs';

export class GameState {

	constructor(locations) {
		this.locations = locations;
	}

	pullLocations() {
		return fetch(`${C.URL_ROOT}/${C.J_SON}`)
		.then((resp) => resp.json())
		.then((data) => {
			return data.map((loc) => new Location (loc)).sort((a, b) => (a.id < b.id)? -1: 1);
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
