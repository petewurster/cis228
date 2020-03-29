import * as C from './constants.mjs';
import Beer from './Beer.mjs';

class Menu {
	#tags = new Set();
	#beers = [];
	#types = C.TYPES;
	#brewers = C.BREWERS;

	constructor() {
		this.#beers = fetch(`${C.URL_ROOT}/${C.J_SON}`)
		.then((resp) => resp.json())
		.then((data) => {
			data.map((obj) => {
				obj.tags.map((tag) => this.#tags.add(tag));
			});
			return data.map((obj) => new Beer(obj));
		});
	}

	listBeers() {
		return this.#beers;
	}

	listTypes() {
		return this.#types;
	}

	listTags() {
		return this.#tags;
	}

	listBrewers() {
		return this.#brewers;
	}


	
}

export default Menu;
