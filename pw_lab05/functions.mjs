import * as C from './constants.mjs';

const enableResetButton = (game) => {
	let main = document.querySelector('main');
	main.innerHTML += C.ENDING;
	document.querySelectorAll('.complete button')
	.forEach((elem) => {
		console.log(elem);
		console.log(game);
		elem.addEventListener('click', () => reset(game));
});
}

const buildListElement = (loc) => {
	let main = document.querySelector('main');
	main.innerHTML +=
		`<div id="div_${loc.id}">` +
			`<h2 id="h2_${loc.id}"><span id="h2_span_${loc.id}">` +
				String.fromCodePoint(loc.isFound? 0x2705: 0x2753) +
			`</span>Clue: ${loc.clue}</h2>` + (loc.isFound? C.DID +
			`<p>You have found the ${loc.name}!</p>`: '') +
		`</div>`;
}

const updateElement = (ref, loc) => {
	ref.innerHTML += (!loc.isFound? C.DID +
		`<p>You have found ${loc.name}!</p>`: '');
	ref.firstChild.firstChild.textContent = String.fromCodePoint(0x2705);
}

const fetchImage = (ref, loc) => {
	let img = document.querySelector(`#${ref.id} div img`);
	if (img.src) return;

	fetch(`${C.URL_ROOT}/${loc.id}.jpg`)
	.then((response) => response.blob())
	.then((blob) => {img.src = URL.createObjectURL(blob)});
}

const showFoundLocations = (game) => {
	Array.from(document.querySelectorAll(C.DIVSELECTOR))
	.filter((elem) => {
		let i = elem.id.slice(5) - 1;
		return game.locations[i].isFound;
	})
	.map((elem) => {
		let i = elem.id.slice(5) - 1;
		fetchImage(elem, game.locations[i]);
	});
}

const isQuestComplete = (game) => {
	let count = game.locations.filter((loc) => loc.isFound);
	return count.length === game.locations.length;
}

//Haversine implementation provided c/o L. Liss
const distance = (lat1, lon1, lat2, lon2) => {
	const r = 6378.137;
	lat1 *= Math.PI / 180;
	lat2 *= Math.PI / 180;
	lon1 *= Math.PI / 180;
	lon2 *= Math.PI / 180;
	let h = (Math.sin((lat2 - lat1) / 2) ** 2) + (Math.cos(lat1) * Math.cos(lat2) * (Math.sin((lon2 - lon1) / 2) ** 2));
	return 2 * r * Math.asin(Math.sqrt(h));
}

const updateGameWithHaversineSieveResults = (geo, game) => {
	//Haversine sieve via filter()
	let foundLocations = game.locations.filter((loc) => distance(geo.coords.latitude, geo.coords.longitude, loc.lat, loc.lon) < C.PRECISION) || null;
	if(!foundLocations) return;

	foundLocations.map((loc) => {
		let elem = document.querySelector(`#div_${loc.id}`);
		updateElement(elem, loc);
		fetchImage(elem, loc);
		loc.isFound = true;
		game.save(game.locations);
	});

	if(isQuestComplete(game)) enableResetButton(game);
}

const reset = (game) => {
	alert('ressetting');
	localStorage.setItem('game', null);
	game.load();
	location.reload();
}

export {
	buildListElement,
	showFoundLocations,
	updateGameWithHaversineSieveResults,
	enableResetButton,
	isQuestComplete
}
