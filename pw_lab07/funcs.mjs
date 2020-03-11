const createDateObjs = (dateString) => {
	//data in dates.json don't fit 0-11 expected by Date() constructor
	let mm = Number(dateString.slice(0, 2)) - 1;
	let dd = Number(dateString.slice(2, 4));
	let yyyy = Number(dateString.slice(4));
	return new Date(yyyy, mm, dd);
}

const filterByYear = (dateObj) => {
	return dateObj.getFullYear() === Number(document.querySelector('#userInput').value);
}

const findEarliest = (acc, val) => {
	return (acc < val)? acc: val;
}

const showResults = (date) => {
	document.querySelector('p').innerHTML =
		`The earliest date in our files for the year ${date.getFullYear()} is: <br><br> ${date.toString()}`;
}

const process = (dateList) => {
	let date = dateList
				.map(createDateObjs)
				.filter(filterByYear)
				.reduce(findEarliest);

	showResults(date);
}

export {
	process
}
