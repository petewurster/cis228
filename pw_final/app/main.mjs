import {displayQuestions, getZip, submitAnswers, resetSurvey} from './functions.mjs';

(() => {
	displayQuestions()

	let zip = document.querySelector('#zip');
	zip.value = JSON.parse(localStorage.getItem('location')) || navigator.geolocation.getCurrentPosition(getZip, () => {zip.value = null}, {enableHighAccuracy: true});

	document.querySelector('button').addEventListener('click', () => {
		let action = document.querySelector('button').textContent === 'Submit'? submitAnswers: resetSurvey;
		action()
	});

})();
