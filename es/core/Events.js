"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Events = Events;

var _addEventListener = require("./addEventListener");

var _dispatchEvent = require("./dispatchEvent");

var _removeAllEventListener = require("./removeAllEventListener");

var _removeEventListener = require("./removeEventListener");

function Events() {
  this._listeners = {};
}

Events.prototype.addEventListener = function (type, listener, options) {
  return _addEventListener.addEventListener.call(this, type, listener, options);
};

Events.prototype.on = function (type, listener, options) {
  return _addEventListener.addEventListener.call(this, type, listener, options);
};

Events.prototype.removeEventListener = function (type, listener, options) {
  return _removeEventListener.removeEventListener.call(this, type, listener, options);
};

Events.prototype.off = function (type, listener, options) {
  return _removeEventListener.removeEventListener.call(this, type, listener, options);
};

Events.prototype.dispatchEvent = function (type) {
  return _dispatchEvent.dispatchEvent.apply(this, arguments);
};

Events.prototype.asyncDispatchEvent = function (type) {
  return _dispatchEvent.asyncDispatchEvent.apply(this, arguments);
};

Events.prototype.syncDispatchEvent = function (type) {
  return _dispatchEvent.syncDispatchEvent.apply(this, arguments);
};

Events.prototype.removeAllEventListener = function () {
  return _removeAllEventListener.removeAllEventListener.call(this);
};