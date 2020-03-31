import Menu from './Menu.mjs';
import {buildBeerElement, modFilters} from './functions.mjs';

(() => {
	let menu = new Menu();	
	menu.listBeers()
	.then(beers => {
		//filters initially set to include ALL possible items

		// menu.filters.tags = [''];
		// menu.filters.types = [''];
		// menu.filters.brewers = ['Miller'];
		// console.log(menu.listBrewers())
		// console.log(menu.filters)
		let selections = 9889;

		let main = document.querySelector('main');
		main.innerHTML = '';
		beers.map(beer => buildBeerElement(beer, modFilters(menu.filters, selections)));
		return beers;
	})
	.then(beers => {


	}); 


	

})();
