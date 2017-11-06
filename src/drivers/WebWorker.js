export default class WebWorkerClass {

	constructor () {
		let that = this;

		that.worker = null;
	}

	/**
	 *
	 * @param {object} URL
	 * @param {object} Worker
	 * @param {object} Blob
	 * @param {object} Handlers
	 */
	init (URL, Worker, Blob, Handlers) {
		let that = this;

		that._eventCallBacks = {};

		that.worker = new Worker(
			URL.createObjectURL(
				new Blob([that._workerFrame(Handlers)], {type: 'javascript/text'})
			)
		);

		that.worker.onmessage = function (oEvent) {

			var call = that._eventCallBacks[oEvent.data.event];

			if (call) {
				call(oEvent.data);
			}

		};

		that.worker.onerror = function (e) {
			console.error(e);
		};

	}

	/**
	 * Create java script code for worker.
	 *
	 * @param {object} Handlers
	 * @returns {string}
	 * @private
	 */
	_workerFrame (Handlers) {
		let that = this;

		let arHandlersString = [];
		for (let event in Handlers) {
			arHandlersString.push(`${event} : ${Handlers[event].toString()}`);
		}

		let handlersString = `{${arHandlersString.join(',')}}`;

		return `
		var handlers = ${handlersString};
		
		onmessage = function(e) { 
			
			if (e.data && e.data.event) {
				var event = e.data.event
				var data = e.data.data
				var handel = handlers[event]
				 
				if (typeof handel === 'function') {
					var res = handel(data);
					
					postMessage({
						event : event,
						isOk : true,
						result : res
					});
				} else {
					postMessage({
						event : event,
						isOk : false,
						mess : 'No found handel or handel is not function'
					});
				}
			} else {
				postMessage({
					event : event,
					isOk : false,
					mess : 'No found event'
				});
			}
		}`;
	}

	/**
	 *
	 * @param {string} event
	 * @param {*} data
	 * @param {array} transfer
	 * @returns {Promise}
	 */
	send(event, data, transfer) {
		let that = this;

		return new Promise((ok, bad) => {

			if (!that.worker) {
				return bad(new Error('Worker not init'));
			}

			that._eventCallBacks[event] = function (res) {
				if (res.isOk) {
					ok(res.result);
				} else {
					bad(new Error(res.mess));
				}
			};

			setTimeout(() => {
				that.worker.postMessage({
					event : event,
					data : data
				}, transfer);
			});

		})
	}

	/**
	 * Terminate worker
	 */
	terminate () {
		if (this.worker)
			this.worker.terminate();
	}
}
