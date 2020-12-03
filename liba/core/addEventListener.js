"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var ReflectHas = require('../utils/utils').ReflectHas;

function addEventListener(type, listener) {
  // Validate
  var listenerType = _typeof(listener);

  if (listenerType !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + listenerType);
  }

  var listeners = this._listeners;

  if (!ReflectHas(listeners, type)) {
    listeners[type] = [];
  }

  listeners[type].push(listener);
}

module.exports = addEventListener;