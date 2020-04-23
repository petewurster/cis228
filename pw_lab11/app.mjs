import Vue from './resources/vue.esm.browser.js';

let app = new Vue({
	el: '#app',
	template: '#plate',
	data: {
		index: 0,
		files: [
			'nh-1-pluto-haze.jpg',
			'nh-cratersandplains.jpg',
			'nh-psychedelic-pluto_pca.png',
			'nh-scatteringmapcontext_06_29_16-v3-small4review.jpg',
			'pluto_color_mapmosaic.jpg'
		].map(file => './images/' + file)
	},
	methods: {
		prev: function () {
			this.index = (this.index - 1 === -1)? this.files.length - 1 : this.index - 1;
		},
		next: function () {
			this.index = (this.index + 1 === this.files.length)? 0 : this.index + 1;
		}
	}
});
