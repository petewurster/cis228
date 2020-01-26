'use strict';


function main() {
	document.addEventListener('DOMContentLoaded', () => {
	    let timeOne = Math.floor(Math.random() * 1000);
	    let timeTwo = Math.floor(Math.random() * 1000);
	    let greeting;
	    let personName;

	    setTimeout(() => {
	        let greetings = ['Hello', 'Hola', 'Konnichiwa', 'Bonjour', 'Hallo'];
	        let randomIndex = Math.floor(Math.random() * greetings.length);
	        greeting = greetings[randomIndex];

		    setTimeout(() => {
		        let names = ['Alice', 'Bob', 'Carol', 'Devon'];
		        let randomIndex = Math.floor(Math.random() * names.length);
		        personName = names[randomIndex];
		    
		    	console.log(greeting + ', ' + personName + '!');
		    	document.getElementById('callback').textContent = greeting + ', ' + personName + '!';
		    }, timeTwo);

	    }, timeOne);

	});
}

main();