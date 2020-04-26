class DataSetObj {

	constructor({id, answers}) {
		this.id = id;
		this.answers = answers;
	}

	getAnswers() {
		return this.answers;
	}

	getId() {
		return this.id;
	}

}

module.exports = DataSetObj;
