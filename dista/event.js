"use strict";

var Events = require('./core/Events');

module.exports = Events;
module.exports.Events = Events;
"use strict";

var addEventListener = require('./addEventListener');

var removeEventListener = require('./removeEventListener');

var dispatchEvent = require('./dispatchEvent');

var removeAllEventListener = require('./removeAllEventListener');

function Events() {
  this._listeners = {};
}

Events.prototype.addEventListener = function (type, listener) {
  return addEventListener.call(this, type, listener);
};

Events.prototype.on = function (type, listener) {
  return addEventListener.call(this, type, listener);
};

Events.prototype.removeEventListener = function (type, listener) {
  return removeEventListener.call(this, type, listener);
};

Events.prototype.off = function (type, listener) {
  return removeEventListener.call(this, type, listener);
};

Events.prototype.dispatchEvent = function (type) {
  return dispatchEvent.apply(this, arguments);
};

Events.prototype.removeAllEventListener = function () {
  return removeAllEventListener.call(this);
};

module.exports = Events;
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
"use strict";

var ReflectApply = require('../utils/utils').ReflectApply;

function dispatchEvent(arg1) {
  var stack = [];
  var args = [];
  var listeners = this._listeners;

  if (typeof arg1 === 'string') {
    stack = listeners[arg1];
    args = Array.prototype.slice.call(arguments, 1);
  } else if (arg1 && arg1.type in listeners) {
    stack = listeners[arg1.type];
    args = arguments;
  } else {
    return false;
  }

  if (!stack || !stack.length) {
    return true;
  } // Copy the listeners


  stack = stack.slice();

  for (var i = 0, l = stack.length; i < l; i++) {
    ReflectApply(stack[i], this, args);
  }

  return true;
}

module.exports = dispatchEvent;
"use strict";

function removeAllEventListener() {
  this._listeners = {};
}

module.exports = removeAllEventListener;
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
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var hasReflect = (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === 'object';
var ReflectHas = hasReflect && typeof Reflect.has === 'function' ? Reflect.has : function (target, name) {
  return name in target;
};
var ReflectApply = hasReflect && typeof Reflect.apply === 'function' ? Reflect.apply : function (target, thisArg, args) {
  return Function.prototype.apply.call(target, thisArg, args);
};
module.exports = {
  ReflectHas: ReflectHas,
  ReflectApply: ReflectApply
};
//# sourceMappingURL=event.js.map
