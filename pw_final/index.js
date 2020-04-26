const APP_ROOT = require('express').static('app');
const JSON_MODULE = require('express').json();

const SURVEY_RESULTS = '/surveyData.json';
const SURVEY_QUESTIONS = '/surveyQuestions.json';
const SUBMIT = '/submit';

const fs = require('fs').promises;
const DataSetObj = require('./DataSetObj.js');

const host = '127.0.0.1';
const port = '8000';
const server = require('express')();

server.use(JSON_MODULE);
server.use(APP_ROOT);
server.listen(port, host, () => console.log('server up'));

server.get(SURVEY_QUESTIONS, (req, resp) => {
	console.log(req.url)
	fs.readFile(`.${SURVEY_QUESTIONS}`, 'utf-8')
	.then(file => resp.json(file));
});

server.post(SUBMIT, (req, resp) => {
	let clientData = new DataSetObj(req.body);
	if(!valid(clientData)) return resp.json({"rejected" : "invalid data submission"});

	fs.readFile(`.${SURVEY_RESULTS}`, 'utf-8')
	.then(file => JSON.parse(file))
	.then(bigData => processData(bigData, clientData))
	.then(processedData => resp.json(processedData));
});

const valid = (data) => {
	return !data.getAnswers().includes(null) && data.getId().match(/[0-9]{5}/);
}

const isThisZipOnFile = (haystack, needle) => {
	return Object.keys(haystack).includes(needle.getId());
}

const save = (data) => {
	fs.writeFile(`.${SURVEY_RESULTS}`, JSON.stringify(data), 'utf-8');
}

const processData = (bigData, dataSetObj) => {
	let zipExists = isThisZipOnFile(bigData, dataSetObj);
	if(!zipExists) {
		//init new entry
		bigData[dataSetObj.getId()] = {};
		bigData[dataSetObj.getId()].answers = dataSetObj.getAnswers();
		bigData[dataSetObj.getId()].count = 1;
	}else{
		//calculate new average for entry
		bigData[dataSetObj.getId()].answers = bigData[dataSetObj.getId()].answers
			.map((ans, i) => (ans * bigData[dataSetObj.getId()].count + dataSetObj.getAnswers()[i]) / (bigData[dataSetObj.getId()].count + 1));
		bigData[dataSetObj.getId()].count ++;
	}
	save(bigData);
	return bigData;
}
