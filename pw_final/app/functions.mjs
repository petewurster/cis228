import {OPTS, GOOGLE_KEY, GOOGLE_API, SUBMIT, SURVEY_QUESTIONS} from './constants.mjs';
import DataObj from './DataObj.mjs';

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
		let len = (Array.from(document.querySelectorAll('input[type="radio"]')).length) / 5;
		if(!localStorage.getItem('answers')) localStorage.setItem('answers', JSON.stringify(new Array(len).fill(null)));
	})
}

const buildQuestionElement = (qstn, i) => {
	let main = document.querySelector('main');
	let answers = JSON.parse(localStorage.getItem('answers')) || false;
	let divStr = `<div class="question" id="qstn_${i}"><p><b>-${i + 1}- ${qstn}</b></p>`;

	//add options and apply saved selections
	OPTS.map((opt, j) => divStr +=
		`<input type="radio" ${answers[i] === j ? "checked" :""} name="ans_${i}" required="true" value="${OPTS[j]}"> ${opt}`);
	main.innerHTML += divStr + '</div>';
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

const verifiedComplete = () => {
	let zip = document.querySelector('#zip').value;

	localStorage.setItem('location', JSON.stringify(zip));
	return !JSON.parse(localStorage.getItem('answers')).includes(null) &&
		JSON.parse(localStorage.getItem('location')).match(/[0-9]{5}/);
}

const showResults = (data) => {
	if(data.rejected) return console.error(data);
	
	let len = (Array.from(document.querySelectorAll('input[type="radio"]')).length) / 5;
	let labels = Array.from(new Array(len).keys())
		.map((val, i) => 'Q ' + (i + 1));

	let client = new DataObj();
	let totalCount = Object.keys(data)
		.reduce((acc, key) => data[key].count + acc, 0);

	let all = Object.keys(data)
		//make multi-dim array & distributed proper count weights
		.map(key => data[key].answers.map(ans => ans * Number(data[key].count)))
		//sum up multi-dim array into single array by column
		.reduce((row, nextRow) => row.map((colValue, i) => colValue + (nextRow[i])))
		//re-calculate average
		.map(sum => sum / totalCount);

	//clean the DOM to negate interference from multiple instances of Chart
	//objects existing in the same space if the survey is repeated
	document.querySelector('#hook').innerHTML =	'<canvas id="radar"></canvas>';

	let ctx = document.querySelector('#radar').getContext('2d');

	let radar = new Chart(ctx, {
		type: 'radar',
		options: {
			responsive: false
		},
		data: {
		    labels: labels,
		    datasets: [
			    {
			    	label: 'Your Responses',
			    	backgroundColor: 'rgba(54, 162, 235, 0.2)',
			    	borderColor: 'rgba(54, 162, 235, 1)',
			        data: client.getAnswers()
			    },
			    {
			    	label: `Average for ${client.getId()} (${data[client.getId()].count})`,
			    	backgroundColor: 'rgba(255, 206, 86, 0.2)',
			    	borderColor: 'rgba(255, 206, 86, 1)',
			    	data: data[client.getId()].answers
			    },
			    {
			    	label: `Average for ${Object.keys(data).length} Zip Codes (${totalCount})`,
			    	backgroundColor: 'rgba(255, 99, 132, 0.2)',
			    	borderColor: 'rgba(255, 99, 132, 1)',
			    	data: all
			    }
		    ]
		}
	});
}

export {
	displayQuestions,
	getZip,
	submitAnswers
}
