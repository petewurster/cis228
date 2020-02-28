import * as C from './constants.mjs';

const buildListElement = (loc) => {
	let main = document.querySelector('main');
	main.innerHTML +=
		`<div id="div_${loc.id}">` +
			`<h2 id="h2_${loc.id}"><span id="h2_span_${loc.id}">` +
				String.fromCodePoint(loc.isFound? 0x2705: 0x2753) +
			`</span>Clue: ${loc.clue}</h2>` + (loc.isFound?	C.DID +
			`<p>You have found ${loc.name}!</p>`: '') +
		`</div>`;
}

const updateElement = (ref, loc) => {
	ref.innerHTML += (!loc.isFound? C.DID +
		`<p>You have found ${loc.name}!</p>`: '');
	ref.firstChild.firstChild.textContent = String.fromCodePoint(0x2705);
	loc.isFound = true;
}

const fetchImage = (ref, loc) => {
	let img = document.querySelector(`#${ref.id} div img`);
	if (!img.src) {
		fetch(`${C.URL_ROOT}/${loc.id}.jpg`)
			.then((response) => response.blob())
			.then((blob) => {img.src = URL.createObjectURL(blob)});
	}
}

const showFoundLocations = (game) => {
	//filter-map fetches images of "found" locations
	Array.from(document.querySelectorAll(`[id^='div_p']`))
	.filter((elem) => {
		let i = elem.id.slice(5) - 1;
		return game.locations[i].isFound;
	})
	.map((elem) => {
		let i = elem.id.slice(5) - 1;
		fetchImage(elem, game.locations[i]);
	});
}

//Haversine implementation provided c/o L. Liss
const distance = (lat1, lon1, lat2, lon2) => {
	const r = 6378.137;
	lat1 *= Math.PI / 180;
	lat2 *= Math.PI / 180;
	lon1 *= Math.PI / 180;
	lon2 *= Math.PI / 180;
	let h = Math.pow(Math.sin((lat2 - lat1) / 2), 2) + (Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin((lon2 - lon1) / 2), 2));
	return 2 * r * Math.asin(Math.sqrt(h));
}

export {
	distance,
	buildListElement,
	fetchImage,
	updateElement,
	showFoundLocations
}