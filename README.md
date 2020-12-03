# Events

> NOTE: The version >= 1.0.0 had remove the file, `dist`.

An events system for JavaScript. It can do with async or sync event dispatching.

## Installing

Using npm: 

`npm install xy-events`


## Example

### Use the instance of Events.

```js
const { Events } = require('xy-events');

const instance = new Events();

function logger(event) {
    consol.log(event.message)
}

instance.addEventListener('message', logger);

instance.dispatchEvent({ type: 'message', message: 'This is an example' });

instance.removeEventListener('message', logger);

// Or you can use like this

function logger2(message, message2) {
    console.log(message + message2);
}

instance.addEventListener('message', logger2);

instance.dispatchEvent('message', 'Hello!', 'This is an other example!');

instance.removeEventListener('message', logger2);
```

### Or you can extends Events.

```js
const { Events } = require('xy-events');

function Cat() {
    Events.call(this);
}

const prototype = Object.create(Events.prototype);
Cat.prototype = prototype;
Cat.prototype.constructor = Cat;

Cat.prototype.hunger = function() {
    console.log('I am hunger！');
    this.dispatchEvent({ type: 'hunger' });
}

function feed() {
    console.log('Give the cat a fish');
}

const cat = new Cat();
cat.addEventListener('hunger', feed);
cat.hunger();
```

### Or you can dispatch async or sync event

```js

const { Events } = require('xy-events');

const events = new Events();

function test1() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('test1');
            resolve()
        }, 200);
    })
}
function test2() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('test2');
            resolve()
        }, 100);
    })
}

function test3() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('test3');
            resolve()
        }, 10);
    })
}

function test4() {
    console.log('test4');
}

events.addEventListener('test', test1);
events.addEventListener('test', test2, { mode: 'async' });
events.addEventListener('test', test3, { mode: 'async' });
events.addEventListener('test', test4);
events.dispatchEvent('test');

// -> test2, test3, test4, test1

```

### Or you can dispatch sync event

```js

const { Events } = require('xy-events');

const events = new Events();

function test1() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('test1');
            resolve()
        }, 200);
    })
}
function test2() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('test2');
            resolve()
        }, 100);
    })
}

function test3() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('test3');
            resolve()
        }, 10);
    })
}

function test4() {
    console.log('test4');
}

events.addEventListener('test', test1);
events.addEventListener('test', test2);
events.addEventListener('test', test3);
events.addEventListener('test', test4);
events.syncDispatchEvent('test');

// -> test4, test3, test2, test1

```

### Or you can dispatch async event

```js

const { Events } = require('xy-events');

const events = new Events();

function test1() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('test1');
            resolve()
        }, 200);
    })
}
function test2() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('test2');
            resolve()
        }, 100);
    })
}

function test3() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('test3');
            resolve()
        }, 10);
    })
}

function test4() {
    console.log('test4');
}

events.addEventListener('test', test1);
events.addEventListener('test', test2);
events.addEventListener('test', test3);
events.addEventListener('test', test4);
events.asyncDispatchEvent('test');

// -> test1, test2, test3, test4

```