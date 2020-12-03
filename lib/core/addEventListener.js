"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addEventListener = addEventListener;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function addEventListener(type, listener, options) {
  // Validate
  var listenerType = _typeof(listener);

  if (listenerType !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + listenerType);
  }

  var listeners = this._listeners;

  if (!Reflect.has(listeners, type)) {
    listeners[type] = [];
  }

  var _ref = options || {},
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? 'sync' : _ref$mode;

  var ss = {
    mode: mode,
    listener: listener
  };
  listeners[type].push(ss);
}