import * as C from './constants.mjs';

const buildBeerElement = (beer, filters) => {
	let lines = beer.toString().split('\n');
	let main = document.querySelector('main');
	let displayIt = applyFilters(beer, filters);
	main.innerHTML += `<div class="${displayIt? '': 'hidden'}" id="${beer.getName().replace(' ', '-')}_${beer.getBrewery().replace(' ', '-')}">` +
		`<p><b>${lines[0]}</b> ${lines[1]}<br>${lines[2]}<br><br>${lines[3]}</p></div>`;
}

const buildSelectorElements = (filters, baseFilters) => {
	let type = document.querySelector('#type');
	let brewery = document.querySelector('#brewery');
	let tags = document.querySelector('#tags');
	type.innerHTML = '';
	brewery.innerHTML = '';
	tags.innerHTML = '';

	baseFilters.types
		.map(filter => type.innerHTML += `<span><input type="checkbox"` +
			`${filters.types.includes(filter)? 'checked': ''} value="${filter}">${filter}</span>`);
	baseFilters.brewers
		.map(filter => brewery.innerHTML += `<span><input type="checkbox"` +
			`${filters.brewers.includes(filter)? 'checked': ''} value="${filter}">${filter}</span>`);
	baseFilters.tags
		.map(filter => tags.innerHTML += `<span><input type="checkbox"` +
			`${filters.tags.includes(filter)? 'checked': ''} value="${filter}">${filter}</span>`);
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

const scanDOMFilters = () => {
	let types = Array.from(document.querySelectorAll('#type input[type="checkbox"]'))
		.filter(box => box.checked)
		.map(box => box.value);

	let brewers = Array.from(document.querySelectorAll('#brewery input[type="checkbox"]'))
		.filter(box => box.checked)
		.map(box => box.value);

	let tags = Array.from(document.querySelectorAll('#tags input[type="checkbox"]'))
		.filter(box => box.checked)
		.map(box => box.value);

	return {types, tags, brewers};
}

const rebuildDOM = (menu, beers, selectedFilters) => {
	let main = document.querySelector('main');
	main.innerHTML = '';
	beers.map(beer => buildBeerElement(beer, selectedFilters));
	buildSelectorElements(selectedFilters, menu.baseFilters);
};


export {
	scanDOMFilters,
	rebuildDOM
}
