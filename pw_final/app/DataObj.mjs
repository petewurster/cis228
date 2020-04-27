class DataObj {

	constructor() {
		this.answers = JSON.parse(localStorage.getItem('answers'));
		this.id = document.querySelector('#zip').value;		
	}

	getId() {
		return this.id;
	}

	getAnswers() {
		return this.answers;
	}

}

export default DataObj;
