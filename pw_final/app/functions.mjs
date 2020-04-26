import {OPTS, GOOGLE_KEY, GOOGLE_API, SUBMIT, SURVEY_QUESTIONS} from './constants.mjs';
import DataObj from './DataObj.mjs';

const saveAns = (ans) => {
	//answers are indexed by question
	let qn = ans.name.slice(4);
	let answers = JSON.parse(localStorage.getItem('answers'));
	
	answers[qn] = OPTS.indexOf(ans.value);
	localStorage.setItem('answers', JSON.stringify(answers));
}

const submitAns = () => {
	if(!verifiedComplete()) return;

	fetch(SUBMIT, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(new DataObj(zip.value))	
	})
	.then(resp => resp.json())
	.then(data => showResults(data));
};

const showResults = (data) => {
	if(data.rejected) return console.error(data);

	////////display the results
	// console.log(new DataObj(zip.value))
	// console.log(data)
}

const getZip = (geo) => {
	let loc = `${GOOGLE_API}latlng=${geo.coords.latitude},${geo.coords.longitude}&key=${GOOGLE_KEY}`;

	fetch(loc)
	.then(data => data.json())
	.then(data => {
		let zip = data.results[0].address_components[7].short_name;

		document.querySelector('#zipNote').textContent = '* auto-detected';
		document.querySelector('#zip').value = zip;
		localStorage.setItem('location', JSON.stringify(zip));
	});
}

const verifiedComplete = () => {
	let zip = document.querySelector('#zip').value;

	localStorage.setItem('location', JSON.stringify(zip));
	return JSON.parse(localStorage.getItem('location')).match(/[0-9]{5}/) &&
		!JSON.parse(localStorage.getItem('answers')).includes(null);
}

const displayQuestions = () => {
	fetch(SURVEY_QUESTIONS)
	.then(resp => resp.json())
	.then(data => data = JSON.parse(data))
	.then(questions => {
		questions.map((qn, i) => buildQuestionElement(qn, i));
		
		//enable answer tracking
		Array.from(document.querySelectorAll('input[type="radio"]'))
			.map(elem => elem.addEventListener('click', (e) => saveAns(e.target)));

		//build empty localStorage as needed
		let len = (Array.from(document.querySelectorAll('input[type="radio"]')).length / 5);
		if(!localStorage.getItem('answers')) localStorage.setItem('answers', JSON.stringify(new Array(len).fill(null)));
	})
}

const buildQuestionElement = (qn, i) => {
	let main = document.querySelector('main');
	let answers = JSON.parse(localStorage.getItem('answers')) || false;
	let divStr = `<div class="question" id="qn_${i}"><p><b>${qn}</b></p>`;

	//add options and apply saved selections
	OPTS.map((opt, j) => divStr +=
		`<input type="radio" ${answers[i] === j ? "checked" :""} name="ans_${i}" required="true" value="${OPTS[j]}"> ${opt}`);
	main.innerHTML += divStr + '</div>';
}

export {
	displayQuestions,
	getZip,
	submitAns
}
