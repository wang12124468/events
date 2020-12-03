"use strict";

function removeAllEventListener() {
  this._listeners = {};
}

module.exports = removeAllEventListener;