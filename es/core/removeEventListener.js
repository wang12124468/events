"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeEventListener = removeEventListener;

function removeEventListener(type, listener) {
  // Validate
  var listenerType = typeof listener;

  if (listenerType !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + listenerType);
  }

  var listeners = this._listeners;

  if (!Reflect.has(listeners, type)) {
    return;
  }

  listeners[type] = listeners[type].filter(ss => ss.listener !== listener);
}