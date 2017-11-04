let count = 0;

let doit = async (db, $setTo) => {

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
		setResult('.up_insert_update', `UPDATE OR INSERT (update) ${isOK ? 'OK' : 'NO' }`, isOK);
	} catch (e) {
		if (e) {
			setResult('.error', e.message || 'NULL MESSAGE');
		}
		console.log('error ', e);
		throw new Error(e);
	}
};

const differentDrive = async () => {
	let db = new BrowserDataBaseClass();
	let driveConst = BrowserDataBaseClass.driverConst();
	let $frame = $('#frame');
	let $setAuto = $('#auto');
	let $setWebsql = $('#web_sql');
	let $setInndexedDb = $('#index_db');

	$setAuto.html($frame.html());
	$setWebsql.html($frame.html());
	$setInndexedDb.html($frame.html());

	await doit(db, $setAuto);

	db = new BrowserDataBaseClass({}, driveConst.IndexedDb);
	await doit(db, $setInndexedDb);

	db = new BrowserDataBaseClass({}, driveConst.WebSQL);
	await doit(db, $setWebsql);


};

;
window.URL = window.URL || window.webkitURL;

//define a worker
var worker = new Worker(
	window.URL.createObjectURL(
		new window.Blob([
		"onmessage = function(e) { \
			var sum = 1;\
			\
			for (var i = 1; i<1000000000; ++i) \
				sum += i;\
			console.log('sum is', sum);\
			postMessage(sum)\
		}"
		], {type: 'javascript/text'})
	)
);
// var sum = 1;
//
// for (var i = 1; i<100000000; ++i)
// 	sum += i;
console.log('sum is', sum);
worker.onmessage = function (oEvent) {
	console.log("Worker said : " + oEvent.data);
};
worker.postMessage('dd');


// TODO: clear
console.log('SEND');
$(function () {
	"use strict";
	differentDrive();
});

