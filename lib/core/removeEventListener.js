var { isKeyInObject, isFunction } = require('../utils/utils');

function removeEventListener(type, callback) {
    // Validate
    if (!type || !isFunction(callback)) {
        return;
    }

    var listeners = this.listeners;

    if (!isKeyInObject(type, listeners)) {
        return;
    }

    var stack = listeners[type];

    for (var i = 0, l = stack.length; i < l; i++) {
        if (stack[i] === callback) {
            stack.splice(i, 1);
            return;
        }
    }
}


module.exports = removeEventListener;