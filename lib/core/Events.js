var addEventListener = require('./addEventListener');
var removeEventListener = require('./removeEventListener');
var dispatchEvent = require('./dispatchEvent');
var removeAllEventListener = require('./removeAllEventListener');

function Events() {
    this._listeners = {};
}

Events.prototype.addEventListener = function(type, listener) {
    return addEventListener.call(this, type, listener);
}

Events.prototype.on = function(type, listener) {
    return addEventListener.call(this, type, listener);
}

Events.prototype.removeEventListener = function(type, listener) {
    return removeEventListener.call(this, type, listener);
}

Events.prototype.off = function(type, listener) {
    return removeEventListener.call(this, type, listener);
}

Events.prototype.dispatchEvent = function(type) {
    return dispatchEvent.apply(this, arguments);
}

Events.prototype.removeAllEventListener = function() {
    return removeAllEventListener.call(this);
}

module.exports = Events;