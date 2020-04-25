import {displayQuestions, getZip} from './functions.mjs';


(() => {
	let zip = document.querySelector('#zip');
	zip.value = JSON.parse(localStorage.getItem('location')) || navigator.geolocation.getCurrentPosition(getZip, () => {zip.value = null}, {enableHighAccuracy: true});





	displayQuestions()



})();

