function dispatchEvent(arg1) {
    var IS_APPLY = false;
    var type = '';
    if(typeof arg1 === 'string') {
        IS_APPLY = true;
        type = arg1;
    } else if(arg1 && (arg1.type in this.listeners)) {
        IS_APPLY = false;
        type = arg1.type;
    } else {
        return;
    }

    var stack = listeners[type];
    var args = Array.prototype.slice.call(arguments, 1);

    for(var i = 0, l = stack.length; i < l; i++) {
        var listener = stack[i];
        IS_APPLY ? listener.apply(this, args) : listener.call(this, arg1);
    }
}

module.exports = dispatchEvent;