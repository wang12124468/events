var { isKeyInObject, isFunction } = require('../utils/utils');

function Events() {
    this.listeners = {};
}

Events.prototype.addEventListener = function(type, callback) {

    // Validate
    if(!type || !isFunction(callback)) {
        return;
    }

    if(!isKeyInObject(type, this.listeners)) {
        this.listeners[type] = [];
    }

    this.listeners[type].push(callback);
}

Events.prototype.removeEventListener = function(type, callback) {

    // Validate
    if(!type || !isFunction(callback)) {
        return;
    }

    if(!isKeyInObject(type, this.listeners)) {
        return;
    }

    var stack = this.listeners[type];

    for(var i = 0, l = stack.length; i < l; i++) {
        if(stack[i] === callback) {
            stack.splice(i, 1);
            return;
        }
    }
}

Events.prototype.dispatchEvent = function(event) {
    if(!event || (event.type in this.listeners)) {
        return;
    }

    var stack = this.listeners[event.type];

    for(var i = 0, l = stack.length; i < l; i++) {
        stack[i].call(this, event);
    }
}

module.exports = Events;