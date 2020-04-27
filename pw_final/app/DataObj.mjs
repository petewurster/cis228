class DataObj {

	constructor() {
		this.answers = JSON.parse(localStorage.getItem('answers'));
		this.id = document.querySelector('#zip').value;		
	}

}

export default DataObj;
