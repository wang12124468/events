"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeAllEventListener = removeAllEventListener;

function removeAllEventListener() {
  this._listeners = {};
}