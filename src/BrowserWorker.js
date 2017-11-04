
/**
 * Class for work this browsers worker.
 * @class
 */
class BrowserWorkerClass {
	constructor() {
		// TODO: clear
		console.log('Helloy');
	}

}

//Include as js
if (window) {
	window.BrowserWorkerClass = BrowserWorkerClass;
//Include from npm
} else if (typeof module !== 'undefined' && module.exports) {
	exports = module.exports = BrowserWorkerClass;
// AMD support
} else if (typeof define === 'function' && define.amd) {
	define(function () { return BrowserWorkerClass; });
}


