const URL_ROOT = 'https://petewurster.com/lab05';
const J_SON = 'locations.JSON';
const DID = '<div><img></div>';
const DIVSELECTOR = `[id^='div_p']`;
const MESSAGE = `<div class="complete">` +
					`<p>You have found everything for this hunt!</p>` +
					`<button type="button">Reset</button>` +
				`</div>`
const PRECISION = .004;

export {
	URL_ROOT,
	DID,
	J_SON,
	PRECISION, 
	DIVSELECTOR,
	MESSAGE
}
