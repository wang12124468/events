var ReflectApply = require('../utils/utils').ReflectApply;

function dispatchEvent(arg1) {
    var stack = [];
    var args = [];
    var listeners = this._listeners;

    if(typeof arg1 === 'string') {
        stack = listeners[arg1];
        args = Array.prototype.slice.call(arguments, 1);
    } else if(arg1 && (arg1.type in listeners)) {
        stack = listeners[arg1.type];
        args = arguments;
    } else {
        return false;
    }

    if(!stack || !stack.length) {
        return true;
    }

    for(var i = 0, l = stack.length; i < l; i++) {
        ReflectApply(stack[i], this, args);
    }
    return true
}

module.exports = dispatchEvent;