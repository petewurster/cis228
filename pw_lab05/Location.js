'use strict';

class Location {

	constructor({lat, lon, id, name, clue}) {
		this.name = name;
		this.lat = lat;
		this.lon = lon;
		this.isFound = (Math.random() < .5)? false: true; 
		this.clue = clue;
		this.id = id;
	}
}

export {Location};