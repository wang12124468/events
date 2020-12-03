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