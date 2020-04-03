import * as C from './constants.mjs';
import Beer from './Beer.mjs';

class Menu {
	#tags = new Set('');
	#beers = [];
	#types = new Set('');
	#brewers = new Set('');
	#filters = {};

	constructor() {
		this.#beers = fetch(`${C.URL_ROOT}/${C.J_SON}`)
		.then(resp => resp.json())
		.then(data => {
			data.map((obj) => {
				obj.tags.map(tag => this.#tags.add(tag));
				this.#types.add(obj.type);
				this.#brewers.add(obj.brewery)
			});
			this.#filters = {
				tags: [... this.listTags()].sort(),
				brewers: [... this.listBrewers()].sort(),
				types: [... this.listTypes()].sort()
			}
			return data.map(obj => new Beer(obj));
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

	get baseFilters() {
		return this.#filters;
	}
}

export default Menu;
