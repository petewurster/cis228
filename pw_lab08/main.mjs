import Menu from './Menu.mjs';
import {scanDOMFilters, rebuildDOM} from './functions.mjs';

(() => {
	let menu = new Menu();	
	menu.listBeers()
	.then(beers => {
		//filters initially set to include ALL possible items
		let selectedFilters = menu.baseFilters;
		rebuildDOM(menu, beers, selectedFilters);

		document.querySelector('#apply').addEventListener('click', () => {
			selectedFilters = scanDOMFilters();
			rebuildDOM(menu, beers, selectedFilters);		
		});

		Array.from(document.querySelectorAll('.toggle'))
			.map(elem => elem.addEventListener('click',	(e) => {
				if(e.target.innerHTML === 'None') {
					e.target.innerHTML = 'All';
					Array.from(document.querySelectorAll(`#${e.target.nextSibling.nextSibling.id} input[type="checkbox"]`))
						.map(box => box.checked = false);
				}else{
					e.target.innerHTML = 'None';
					Array.from(document.querySelectorAll(`#${e.target.nextSibling.nextSibling.id} input[type="checkbox"]`))
						.map(box => box.checked = true);	
				}
			}));

		return beers;
	});
})();
