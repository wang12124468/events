# Events

An events system for JavaScript.

## Installing

Using npm: 

`npm install xy-events`


## Example

Use the instance of Events.

        const Events = require('xy-events');

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

Or you can extends Events.

        const Events = require('xy-events');

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