import { addEventListener } from './addEventListener';
import { asyncDispatchEvent, dispatchEvent, syncDispatchEvent } from './dispatchEvent';
import { removeAllEventListener } from './removeAllEventListener';
import { removeEventListener } from './removeEventListener';

export function Events() {
    this._listeners = {};
}

Events.prototype.addEventListener = function(type, listener, options) {
    return addEventListener.call(this, type, listener, options);
}

Events.prototype.on = function(type, listener, options) {
    return addEventListener.call(this, type, listener, options);
}

Events.prototype.removeEventListener = function(type, listener, options) {
    return removeEventListener.call(this, type, listener, options);
}

Events.prototype.off = function(type, listener, options) {
    return removeEventListener.call(this, type, listener, options);
}

Events.prototype.dispatchEvent = function(type) {
    return dispatchEvent.apply(this, arguments);
}

Events.prototype.asyncDispatchEvent = function(type) {
    return asyncDispatchEvent.apply(this, arguments);
}

Events.prototype.syncDispatchEvent = function(type) {
    return syncDispatchEvent.apply(this, arguments);
}

Events.prototype.removeAllEventListener = function() {
    return removeAllEventListener.call(this);
}