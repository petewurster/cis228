import {displayQuestions, getZip, submitAnswers} from './functions.mjs';

(() => {
	displayQuestions()

	let zip = document.querySelector('#zip');
	zip.value = JSON.parse(localStorage.getItem('location')) || navigator.geolocation.getCurrentPosition(getZip, () => {zip.value = null}, {enableHighAccuracy: true});

	document.querySelector('button').addEventListener('click', submitAnswers);

})();
