# web-worker
Simple class for use web worker


### Api 
[Api description](https://github.com/eagle7410/web-worker/blob/master/Api.md)

### Install by bower
```
bower install browser-worker
```
### Install by npm 
```
npm install browser-worker--save

### Example:
```js
let count = 0;

let doit = async ($setTo, worker, workerEmulate) => {

	let setResult = (selector, mess, isOk, noCount) => {

		let $block = $setTo.find(selector);

		$block
			.text(mess)
			.addClass(isOk ? 'success' : 'error');

		if (!noCount)
			$block.before($('<b/>', {
				text: `TEST #${++count}`,
				class: 'test_number'
			}));
	};


	try {

		let correctSum = 500000500000 ;

		let ts = Date.now();
		let isOK;
		let res;

		ts = Date.now();
		res = await workerEmulate.eventSend('sum', 0);
		ts = Date.now() - ts;
		isOK = res === correctSum;

		setResult('.sum-emulator', `SUM-em 1+2+...+1000 is ${isOK ? 'Ok' : res}`, isOK);
		console.info('Emulator sum time', ts);

		ts = Date.now();
		res = await worker.eventSend('sum', 0);
		ts = Date.now() - ts;
		isOK = res === correctSum;

		setResult('.sum', `SUM first query 1+2+...+1000 is ${isOK ? 'Ok' : res}`, isOK);
		console.info('First sum time', ts);

		ts = Date.now();
		res = await worker.eventSend('sum', 0);
		ts = Date.now() - ts;
		isOK = res === correctSum;

		setResult('.sum-sec', `SUM second query 1+2+...+1000 is ${isOK ? 'Ok' : res}`, isOK);
		console.info('Second sum time', ts);

	} catch (e) {

		if (e) {
			setResult('.error', e.message || 'NULL MESSAGE');
		}

		console.log('error ', e);
		throw new Error(e);
	}
};

const forTest = () => {
	let $frame = $('#frame');
	let $setAuto = $('#auto');

	let worker = new window.BrowserWorkerClass();
	let workerEmulate = new window.BrowserWorkerClass();

	worker.eventAdd('sum', function(start) {

		for (let i = 0; i < 1000001; i++) {
			start += i;
		}

		return start;
	});

	workerEmulate.eventAdd('sum', function(start) {

		for (let i = 0; i < 1000001; i++) {
			start += i;
		}

		return start;
	});

	worker.run();
	workerEmulate.run(true);

	$setAuto.html($frame.html());

	// init worker ~150
	setTimeout(() => {
		doit($setAuto, worker, workerEmulate);
	}, 150);
};

$(function () {forTest(); });
```  
### Version
1.0.0   
   
---
### People

Author and developer is [Igor Stcherbina](https://github.com/eagle7410)
---
### License  
MIT

**Free Software**
