import {process} from './funcs.mjs';
const URL_DATES = 'https://petewurster.com/lab05/dates.json';

(() => {
	let getDateList = fetch(URL_DATES);

	getDateList
	.then((resp) => resp.json())
	.then((dateList) => {
		document.querySelector('#submit').addEventListener('click', () => {
			document.querySelector('p').innerHTML =
				`We have no records for the year ${document.querySelector('#userInput').value}`;
			process(dateList);
		});
		document.querySelector('#userInput').addEventListener('keyup', (e) => {
			document.querySelector('#submit').click();
		});
	});

})()
