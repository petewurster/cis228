import Menu from './Menu.mjs';
import {buildBeerElement} from './functions.mjs';

(() => {
	let menu = new Menu();	
	menu.listBeers()
	.then(beers => {
		//filters initially set to include ALL possible items

		// menu.filters.tags = [''];
		// menu.filters.types = [''];
		// menu.filters.brewers = ['Miller'];
		console.log(menu.listBrewers())
		console.log(menu.filters)


		let main = document.querySelector('main');
		main.innerHTML = '';
		beers.map(beer => buildBeerElement(beer, menu.filters));
		return beers;
	})
	.then(beers => {


	}); 


	

})();
