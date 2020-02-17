'use strict';

const URL_ROOT = 'https://petewurster.com/lab05';

class GameState {
	constructor(locations) {
		this.locations = locations;
		this.winConditionMet = false;
	}

	pullLocations() {
		return fetch(`${URL_ROOT}/locations.JSON`)
		.then((resp) => resp.json())
		.then((data) => {
			let locations = [];	
			for(let loc of data) {
				locations.push(new Location(loc.lat, loc.lon, loc.id, loc.name, loc.clue));
			}
			return locations;
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
				return locations === null ? this.pullLocations() : locations;
			})
			.then(locations => {
				this.save(locations);
				this.locations = locations;
				return locations;
			});




		
	}



}