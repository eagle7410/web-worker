<a name="BrowserWorkerClass"></a>

## BrowserWorkerClass
Class for work this browsers worker.

**Kind**: global class  

* [BrowserWorkerClass](#BrowserWorkerClass)
    * [.run(useEmulator)](#BrowserWorkerClass+run)
    * [.eventAdd(event, handel)](#BrowserWorkerClass+eventAdd) ⇒ <code>[BrowserWorkerClass](#BrowserWorkerClass)</code>
    * [.eventMove(event)](#BrowserWorkerClass+eventMove)
    * [.eventSend(event, data, transfer)](#BrowserWorkerClass+eventSend) ⇒ <code>\*</code>

<a name="BrowserWorkerClass+run"></a>

### browserWorkerClass.run(useEmulator)
Run worker

**Kind**: instance method of <code>[BrowserWorkerClass](#BrowserWorkerClass)</code>  

| Param | Type |
| --- | --- |
| useEmulator | <code>boolean</code> | 

<a name="BrowserWorkerClass+eventAdd"></a>

### browserWorkerClass.eventAdd(event, handel) ⇒ <code>[BrowserWorkerClass](#BrowserWorkerClass)</code>
Adding event.

**Kind**: instance method of <code>[BrowserWorkerClass](#BrowserWorkerClass)</code>  

| Param | Type |
| --- | --- |
| event | <code>string</code> | 
| handel | <code>function</code> | 

<a name="BrowserWorkerClass+eventMove"></a>

### browserWorkerClass.eventMove(event)
Remove event

**Kind**: instance method of <code>[BrowserWorkerClass](#BrowserWorkerClass)</code>  

| Param | Type |
| --- | --- |
| event | <code>string</code> | 

<a name="BrowserWorkerClass+eventSend"></a>

### browserWorkerClass.eventSend(event, data, transfer) ⇒ <code>\*</code>
Send to worker

**Kind**: instance method of <code>[BrowserWorkerClass](#BrowserWorkerClass)</code>  

| Param | Type |
| --- | --- |
| event | <code>string</code> | 
| data | <code>\*</code> | 
| transfer | <code>Array</code> | 

