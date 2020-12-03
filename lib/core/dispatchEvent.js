"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asyncDispatchEvent = asyncDispatchEvent;
exports.syncDispatchEvent = syncDispatchEvent;
exports.dispatchEvent = dispatchEvent;

function exec(stack, thisArg, args) {
  var ss = stack.shift();

  if (!ss) {
    return Promise.resolve(true);
  }

  var mode = ss.mode,
      listener = ss.listener;

  if (mode === 'async') {
    return Promise.resolve(Reflect.apply(listener, thisArg, args)).then(function (isBreak) {
      return isBreak === true ? Promise.resolve(false) : exec(stack, thisArg, args);
    })["catch"](function () {
      return Promise.resolve(false);
    });
  }

  if (Reflect.apply(listener, thisArg, args) === true) {
    return Promise.resolve(false);
  }

  return exec(stack, thisArg, args);
}

function asyncExec(stack, thisArg, args) {
  var ss = stack.shift();

  if (!ss) {
    return Promise.resolve(true);
  }

  var listener = ss.listener;
  return Promise.resolve(Reflect.apply(listener, thisArg, args)).then(function (isBreak) {
    return isBreak ? Promise.resolve(false) : exec(stack, thisArg, args);
  })["catch"](function () {
    return Promise.resolve(false);
  });
}

function asyncDispatchEvent(arg1) {
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
    return Promise.resolve(false);
  }

  if (!stack || !stack.length) {
    return Promise.resolve(true);
  } // Copy the listeners


  stack = stack.slice();
  return asyncExec(stack, this, args);
}

function syncDispatchEvent(arg1) {
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
    var listener = stack[i].listener;

    if (Reflect.apply(listener, this, args) === true) {
      return false;
    }
  }

  return true;
}

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
    return Promise.resolve(false);
  }

  if (!stack || !stack.length) {
    return Promise.resolve(true);
  } // Copy the listeners


  stack = stack.slice();
  return exec(stack, this, args);
}