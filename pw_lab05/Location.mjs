export class Location {

	constructor({lat, lon, id, name, clue}) {
		this.name = name;
		this.lat = lat;
		this.lon = lon;
		this.clue = clue;
		this.id = id;
		this.isFound = false; 
	}
}
