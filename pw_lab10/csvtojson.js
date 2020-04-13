const fs = require('fs').promises;
const csv = process.argv[2];

(() => {
	fs.readFile(csv, 'utf-8')
	//split data into multilevel array
	.then(rows => rows.split('\n').map(cols => cols.split(/, ?/)))
	.then(rows => {
		let headers = rows[0];
		let data = [];

		//convert each row to a generic object...
		rows.map((row) => {
			let obj = {};
			//with headers mapped to object properties
			headers.map((header, i) => obj[header] = row[i]);
			data.push(obj);
		});

		//strip out bad rows created from quick & dirty mapping
		return data.filter(obj => Object.keys(obj)[0] !== Object.values(obj)[0] && Object.values(obj)[0] !== '');
	})
	.then(data => console.log(JSON.stringify(data)))
	.catch(err => console.error(`\nError: ${err.path} could not be read\n`));

})();
