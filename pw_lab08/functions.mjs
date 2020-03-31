import * as C from './constants.mjs';

const buildBeerElement = (beer, filters) => {
	let lines = beer.toString().split('\n');
	let main = document.querySelector('main');
	let displayIt = applyFilters(beer, filters);
	main.innerHTML += `<div class="${displayIt? '': 'hidden'}" id="${beer.getName().replace(' ', '-')}_${beer.getBrewery().replace(' ', '-')}">` +
		`<p><b>${lines[0]}</b> ${lines[1]}<br>${lines[2]}<br><br>${lines[3]}</p></div>`;
}

const modFilters = (filters, selected) => {
	console.log(filters, selected)
	return filters;
}

const applyFilters = (beer, filters) => {
	let arrayOfTests = [
		beer.hasTag(filters.tags),

		filters.brewers
		.reduce((acc, brewer) => acc || beer.isFromBrewery(brewer), false),

		filters.types
		.reduce((acc, type) => acc || beer.isType(type), false)
	];
	return arrayOfTests.reduce((acc, test) => acc || test);
}


export {
	buildBeerElement,
	modFilters

}
