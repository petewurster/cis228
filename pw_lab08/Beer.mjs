class Beer {
	#name;
	#brewery;
	#abv;
	#ibu;
	#price;
	#type;
	#tags = [];

	constructor({name, brewery, abv, ibu, price, type, tags}) {
		this.#name = name;
		this.#brewery = brewery;
		this.#abv = abv;
		this.#ibu = ibu;
		this.#price = price;
		this.#type = type;
		this.#tags = tags; 
	}

	getName() {
		return this.#name;
	}

	getBrewery() {
		return this.#brewery;
	}

	getAbv() {
		return this.#abv;
	}

	getIbu() {
		return this.#ibu;
	}

	getPrice() {
		return this.#price;
	}

	getType() {
		return this.#type;
	}

	getTags() {
		return this.#tags;
	}

	toString() {
		return `${this.getBrewery()}: ${this.getName()}\n` + `is a ${this.getType()} described as` +
			`${this.getTags().map(elem => ' ' + elem)}.\n` + 
			` ${this.getName()} measures ${this.getAbv()}% ABV and ${this.getIbu()} IBUs.\n` +
			` $${this.getPrice()}`;
	}

	hasTag(tags) {
		return tags.reduce((acc, tag) => acc || this.getTags().includes(tag), false);
	}

	isType(type) {
		return this.getType() === type;
	}

	isFromBrewery(brewery) {
		return this.getBrewery() === brewery;
	}

}

export default Beer;
