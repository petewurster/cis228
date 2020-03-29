import Menu from './Menu.mjs';
import {buildBeerElement} from './functions.mjs';

(() => {
	let menu = new Menu();	
	menu.listBeers()
	.then(beers => {
		//filters initially set to include ALL possible items
		let filters = {
			tags: [... menu.listTags()].sort(),
			brewers: menu.listBrewers(),
			types: menu.listTypes()
		}

		beers.map(beer => {
			buildBeerElement(beer, filters)
		})
		return beers;
	})
	.then(beers => {


	}); 


	

})();
