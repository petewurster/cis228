import * as C from './constants.mjs';

const buildBeerElement = (beer, filters) => {
	let lines = beer.toString().split('\n');
	let main = document.querySelector('main');
	let display = applyFilters(beer, filters);
	main.innerHTML += `<div class="${display? '': 'hidden'}" id="${beer.getName().replace(' ', '-')}_${beer.getBrewery().replace(' ', '-')}">` +
		`<p><b>${lines[0]}</b> ${lines[1]}<br>${lines[2]}<br><br>${lines[3]}</p></div>`

}

//lets try a crazy, functional approach to all of my logic
const applyFilters = (beer, filters) => {
	let arrayOfTests = [
		//test for matching tags
		beer.hasTag(filters.tags),
		//test for matching breweries
		filters.brewers
		.map((brewer) => beer.isFromBrewery(brewer))
		.reduce((acc, match) => acc || match),
		//test for types
		filters.types
		.map((type) => beer.isType(type))
		.reduce((acc, match) => acc || match)
	];

	return arrayOfTests.reduce((acc, test) => acc || test);
}


export {
	buildBeerElement,

}
