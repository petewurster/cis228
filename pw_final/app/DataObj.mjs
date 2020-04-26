class DataObj {

	constructor(zip) {
		let len = (Array.from(document.querySelectorAll('input[type="radio"]')).length / 5);
		this.answers = JSON.parse(localStorage.getItem('answers')) || new Array(len).fill(null);
		this.id = zip;		
	}

}

export default DataObj;
