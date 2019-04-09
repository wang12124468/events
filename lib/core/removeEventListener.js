var { ReflectHas, isFunction } = require('../utils/utils');

function removeEventListener(type, listener) {
    
    // Validate
    var listenerType = typeof listener;
    if (listenerType !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + listenerType);
    }

    var listeners = this._listeners;

    if (!ReflectHas(type, listeners)) {
        return;
    }

    var stack = listeners[type];

    for (var i = 0, l = stack.length; i < l; i++) {
        if (stack[i] === listener) {
            stack.splice(i, 1);
            return;
        }
    }
}


module.exports = removeEventListener;