class DataObj {

	constructor(zip) {
		this.answers = JSON.parse(localStorage.getItem('answers'));
		this.id = zip;		
	}

}

export default DataObj;
