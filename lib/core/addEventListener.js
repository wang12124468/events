var { ReflectHas } = require('../utils/utils');

function addEventListener(type, listener) {
    // Validate
    var listenerType = typeof listener;
    if(listenerType !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + listenerType);
    }

    var listeners = this._listeners;

    if(!ReflectHas(type, listeners)) {
        listeners[type] = [];
    }

    listeners[type].push(listener)
}

module.exports = addEventListener;