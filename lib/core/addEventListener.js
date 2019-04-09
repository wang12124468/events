var { isKeyInObject, isFunction } = require('../utils/utils');

function addEventListener(type, callback) {
    // Validate
    if(!type || !isFunction(callback)) {
        return;
    }

    var listeners = this.listeners;

    if(!isKeyInObject(type, listeners)) {
        listeners[type] = [];
    }

    listeners[type].push(callback)
}

module.exports = addEventListener;