const APP_ROOT = require('express').static('app');
const JSON_MODULE = require('express').json();
const fs = require('fs').promises;


const server = require('express')();

const host = '127.0.0.1';
const port = '8000';

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

server.post('/update', (req, resp) => {
	console.log(req.body);



});

server.listen(port, host, () => console.log('server up'))