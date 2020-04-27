import {OPTS, GOOGLE_KEY, GOOGLE_API, SUBMIT, SURVEY_QUESTIONS} from './constants.mjs';
import DataObj from './DataObj.mjs';

const saveAnswers = (ans) => {
	//answers are indexed by question
	let qstn = ans.name.slice(4);
	let answers = JSON.parse(localStorage.getItem('answers'));
	
	answers[qstn] = OPTS.indexOf(ans.value);
	localStorage.setItem('answers', JSON.stringify(answers));
}

const submitAnswers = () => {
	if(!verifiedComplete()) return;

	fetch(SUBMIT, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(new DataObj())
	})
	.then(resp => resp.json())
	.then(data => showResults(data));
};

const showResults = (data) => {
	if(data.rejected) return console.error(data);

	////////display the results
	// console.log(new DataObj())
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
	return !JSON.parse(localStorage.getItem('answers')).includes(null) &&
		JSON.parse(localStorage.getItem('location')).match(/[0-9]{5}/);
}

const displayQuestions = () => {
	fetch(SURVEY_QUESTIONS)
	.then(resp => resp.json())
	.then(data => data = JSON.parse(data))
	.then(questions => {
		questions.map((qstn, i) => buildQuestionElement(qstn, i));
		
		//enable answer tracking
		Array.from(document.querySelectorAll('input[type="radio"]'))
			.map(elem => elem.addEventListener('click', (e) => saveAnswers(e.target)));

		//build empty localStorage as needed
		let len = (Array.from(document.querySelectorAll('input[type="radio"]')).length / 5);
		if(!localStorage.getItem('answers')) localStorage.setItem('answers', JSON.stringify(new Array(len).fill(null)));
	})
}

const buildQuestionElement = (qstn, i) => {
	let main = document.querySelector('main');
	let answers = JSON.parse(localStorage.getItem('answers')) || false;
	let divStr = `<div class="question" id="qstn_${i}"><p><b>${qstn}</b></p>`;

	//add options and apply saved selections
	OPTS.map((opt, j) => divStr +=
		`<input type="radio" ${answers[i] === j ? "checked" :""} name="ans_${i}" required="true" value="${OPTS[j]}"> ${opt}`);
	main.innerHTML += divStr + '</div>';
}

export {
	displayQuestions,
	getZip,
	submitAnswers
}
