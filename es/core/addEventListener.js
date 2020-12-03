"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addEventListener = addEventListener;

function addEventListener(type, listener, options) {
  // Validate
  var listenerType = typeof listener;

  if (listenerType !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + listenerType);
  }

  var listeners = this._listeners;

  if (!Reflect.has(listeners, type)) {
    listeners[type] = [];
  }

  var {
    mode = 'sync'
  } = options || {};
  var ss = {
    mode,
    listener
  };
  listeners[type].push(ss);
}