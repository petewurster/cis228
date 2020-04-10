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

		//strip out the row created with headers AS values from quick & dirty mapping
		data = data.filter(obj => Object.keys(obj)[0] !== Object.values(obj)[0]);

		console.log(`\nyour csv file has been converted to json format:`
			+ `\n\t${JSON.stringify(data)}\n\n`);
	})
	.catch(err => console.log(`\nError: ${err.path} could not be read\n\n`))

})();
