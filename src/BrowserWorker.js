import WebWorkerClass from './drivers/WebWorker'
import WebWorkerEmulatorClass from './drivers/WebWorkerEmulator'

/**
 * Class for work this browsers worker.
 * @class
 */
class BrowserWorkerClass {
	constructor() {
		var that = this;

		that._driver = null;
		that._handlers = {};

		that.URL = window.URL || window.webkitURL;
		that.Worker = Worker;
		that.Blob = window.Blob;

		if (!that.URL || !that.Worker || !that.Blob) {
			if (!that.URL) {
				console.warn('No window.Blob extension');
			}

			if (!that.URL) {
				console.warn('No window.URL extension');
			}

			if (!that.Worker) {
				console.warn('No window.Worker extension');
			}

			console.warn('BrowserWorkerClass work in emulation');
			that._driver = new WebWorkerEmulatorClass();
		} else {
			that._driver = new WebWorkerClass();
		}

	}

	/**
	 * Run worker
	 * @param {boolean} useEmulator
	 */
	run (useEmulator) {
		let that = this;

		if (useEmulator) {
			that._driver.terminate();
			that._driver = new WebWorkerEmulatorClass();
			console.warn('BrowserWorkerClass work in emulation');
		}

		that._driver.init(
			that.URL,
			that.Worker,
			that.Blob,
			that._handlers
		);

	}
	/**
	 * Adding event.
	 * @param {string} event
	 * @param {function} handel
	 * @returns {BrowserWorkerClass}
	 */
	eventAdd (event, handel) {
		let that = this;

		if (!event) {
			console.warn('No event', event, handel);
			return that;
		}

		if (typeof handel !== 'function') {
			console.warn(`For event(${event}) handel not function`);
			return that;
		}

		that._handlers[event] = handel;

		return that;
	}

	/**
	 * Remove event
	 * @param {string} event
	 */
	eventMove (event) {
		let that = this;

		that._handlers[event] = null;
	}

	/**
	 * Send to worker
	 * @param {string} event
	 * @param {*} data
	 * @param {Array} transfer
	 * @returns {*}
	 */
	eventSend (event, data, transfer = []) {

		if (!Array.isArray(transfer)) {
			throw new Error(`transfer is not array`);
		}

		return this._driver.send(event, data, transfer);
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


