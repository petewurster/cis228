const APP_ROOT = require('express').static('app');
const JSON_MODULE = require('express').json();
const SURVEY_RESULTS = 'surveyData.json';

const server = require('express')();
const host = '127.0.0.1';
const port = '8000';

const fs = require('fs').promises;
const DataSetObj = require('./DataSetObj.js');

server.use(JSON_MODULE);
server.use(APP_ROOT);

server.get('/surveyData.json', (req, resp) => {
	console.log(req.url);
	fs.readFile(`.${req.url}`, 'utf-8')
	.then(file => resp.json(file));
});

server.get('/surveyQuestions.json', (req, resp) => {
	console.log(req.url);
	fs.readFile(`.${req.url}`, 'utf-8')
	.then(file => resp.json(file));
});

server.post('/submit', (req, resp) => {
	fs.readFile(SURVEY_RESULTS, 'utf-8')
	.then(file => JSON.parse(file))
	.then(bigData => processData(bigData, new DataSetObj(req.body)))
	.then(processedData => resp.json(processedData));
});

const processData = (bigData, dataSetObj) => {
	let zipExists = isThisZipOnFile(bigData, dataSetObj);
	if(!zipExists) {
		bigData[dataSetObj.getId()] = {};
		bigData[dataSetObj.getId()].answers = dataSetObj.getAnswers();
		bigData[dataSetObj.getId()].count = 1;
	}else{
		bigData[dataSetObj.id].answers = bigData[dataSetObj.getId()].answers
		.map((ans, i) => (ans * bigData[dataSetObj.getId()].count + dataSetObj.getAnswers()[i]) / (bigData[dataSetObj.getId()].count + 1));
		bigData[dataSetObj.getId()].count ++;
	}
	save(bigData);
	return bigData;
}

const isThisZipOnFile = (haystack, needle) => {
	return Object.keys(haystack).includes(needle.id);
}

const save = (data) => {
	fs.writeFile(SURVEY_RESULTS, JSON.stringify(data), 'utf-8');
}

server.listen(port, host, () => console.log('server up'));
