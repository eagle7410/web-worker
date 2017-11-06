export default class WebWorkerEmulatorClass {
	/**
	 *Init worker.
	 * @param URL
	 * @param Worker
	 * @param Blob
	 * @param Handlers
	 */
	init (URL, Worker, Blob, Handlers) {
		let that = this;

		that._handlers = Handlers;
	}

	/**
	 * Send to worker
	 * @param {string} event
	 * @param {object} data
	 * @param {array} transfer
	 * @returns {Promise}
	 */
	send(event, data, transfer) {
		var that = this;

		return new Promise((ok, bad) => {

			var handel = that._handlers[event];

			if (typeof handel === 'function') {
				ok(handel(data));
			} else {
				bad('No found event');
			}
		})
	}

	/**
	 * Terminate worker
	 */
	terminate () {}
}
