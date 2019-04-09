var addEventListener = require('./addEventListener');
var removeEventListener = require('./removeEventListener');
var dispatchEvent = require('./dispatchEvent');

function Events() {
    this.listeners = {};
}

Events.prototype.addEventListener = function(type, callback) {
    addEventListener.call(this, type, callback);
}

Events.prototype.on = function(type, callback) {
    addEventListener.call(this, type, callback);
}

Events.prototype.removeEventListener = function(type, callback) {
    removeEventListener.call(this, type, callback);
}

Events.prototype.off = function(type, callback) {
    removeEventListener.call(this, type, callback);
}

Events.prototype.dispatchEvent = function() {
    dispatchEvent.apply(this, arguments);
}

module.exports = Events;