import {OPTS, GOOGLE_KEY, GOOGLE_API, SURVEY_QUESTIONS, SURVEY_RESULTS} from './constants.mjs';

const saveAns = (ans) => {
	let len = (Array.from(document.querySelectorAll('input[type="radio"]')).length / 5);
	let qn = ans.name.slice(4);
	let answers = JSON.parse(localStorage.getItem('answers')) || new Array(len).fill(null);
	
	answers[qn] = OPTS.indexOf(ans.value);
	localStorage.setItem('answers', JSON.stringify(answers));
}

const getZip = (geo) => {
	let loc = `${GOOGLE_API}latlng=${geo.coords.latitude},${geo.coords.longitude}&key=${GOOGLE_KEY}`;

	fetch(loc)
	.then(data => data.json())
	.then(data => {
		let zip = data.results[0].address_components[7].short_name;
		let zipInput = document.querySelector('#zip');
		let zipNote = document.querySelector('#zipNote');

		localStorage.setItem('location', JSON.stringify(zip));
		zipInput.value = zip;
		zipNote.textContent = '* auto-detected';
	});
};


const displayQuestions = () => {
	fetch(SURVEY_QUESTIONS)
	.then(resp => resp.json())
	.then(data => data = JSON.parse(data))
	.then(questions => {
		questions.map((qn, i) => buildQuestionElement(qn, i));
		
		//enable answer tracking
		Array.from(document.querySelectorAll('input[type="radio"]'))
		.map(elem => elem.addEventListener('click', (e) => saveAns(e.target)));
	})
}

const buildQuestionElement = (qn, i) => {
	let main = document.querySelector('main');
	let answers = JSON.parse(localStorage.getItem('answers')) || false;
	let elemString = `<div class="question" id="qn_${i}"><p><b>${qn}</b></p>`;
	
	OPTS.map((opt, j) => elemString +=
		`<input type="radio" ${answers[i] === j ? "checked" :""} name="ans_${i}" value="${OPTS[j]}"> ${opt}`);
	
	main.innerHTML += elemString + '</div>'



}



export {
	displayQuestions,
	getZip,
}
