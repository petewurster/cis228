import Vue from './resources/vue.esm.browser.js';

let data = {
	index: 0,
	files: [
		'nh-1-pluto-haze.jpg',
		'nh-cratersandplains.jpg',
		'nh-psychedelic-pluto_pca.png',
		'nh-scatteringmapcontext_06_29_16-v3-small4review.jpg',
		'pluto_color_mapmosaic.jpg'
	].map(file => './images/' + file)
};

let app = new Vue({
	el: '#app',
	data: data,
	template: '#plate',
	methods: {
		prev: () => {
			data.index = (data.index - 1 === -1)? data.files.length - 1 : data.index - 1;
		},
		next: () => {
			data.index = (data.index + 1 === data.files.length)? 0 : data.index + 1;
		}
	}
});
