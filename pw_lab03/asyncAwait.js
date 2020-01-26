'use strict';


function main() {
	document.addEventListener('DOMContentLoaded', () => {
		let timeOne = Math.floor(Math.random() * 1000);
	    let timeTwo = Math.floor(Math.random() * 1000);
	    let greeting;
	    let personName;

	    let first = new Promise((go) => {
	    	setTimeout(() => {
		        let greetings = ['Hello', 'Hola', 'Konnichiwa', 'Bonjour', 'Hallo'];
		        let randomIndex = Math.floor(Math.random() * greetings.length);
		        greeting = greetings[randomIndex];
		        go();
		    }, timeOne);
		});

	    let second = new Promise((go) => {
	    	setTimeout(() => {
		        let names = ['Alice', 'Bob', 'Carol', 'Devon'];
		        let randomIndex = Math.floor(Math.random() * names.length);
		        personName = names[randomIndex];
		        go();
		    }, timeTwo);
		});

	    (async () => {
	    	await first;
	    	await second;
		    console.log(greeting + ', ' + personName + '!');
		    document.getElementById('asyncAwait').textContent = greeting + ', ' + personName + '!';
	    })();

	});
}

main();