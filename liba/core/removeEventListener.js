"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var ReflectHas = require('../utils/utils').ReflectHas;

function removeEventListener(type, listener) {
  // Validate
  var listenerType = _typeof(listener);

  if (listenerType !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + listenerType);
  }

  var listeners = this._listeners;

  if (!ReflectHas(listeners, type)) {
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