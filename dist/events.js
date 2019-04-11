(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Events"] = factory();
	else
		root["Events"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/events */ "./lib/events.js");

/***/ }),

/***/ "./lib/core/Events.js":
/*!****************************!*\
  !*** ./lib/core/Events.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var addEventListener = __webpack_require__(/*! ./addEventListener */ "./lib/core/addEventListener.js");
var removeEventListener = __webpack_require__(/*! ./removeEventListener */ "./lib/core/removeEventListener.js");
var dispatchEvent = __webpack_require__(/*! ./dispatchEvent */ "./lib/core/dispatchEvent.js");

function Events() {
    this._listeners = {};
}

Events.prototype.addEventListener = function(type, listener) {
    return addEventListener.call(this, type, listener);
}

Events.prototype.on = function(type, listener) {
    return addEventListener.call(this, type, listener);
}

Events.prototype.removeEventListener = function(type, listener) {
    return removeEventListener.call(this, type, listener);
}

Events.prototype.off = function(type, listener) {
    return removeEventListener.call(this, type, listener);
}

Events.prototype.dispatchEvent = function() {
    return dispatchEvent.apply(this, arguments);
}

module.exports = Events;

/***/ }),

/***/ "./lib/core/addEventListener.js":
/*!**************************************!*\
  !*** ./lib/core/addEventListener.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ReflectHas = __webpack_require__(/*! ../utils/utils */ "./lib/utils/utils.js").ReflectHas;

function addEventListener(type, listener) {
    // Validate
    var listenerType = typeof listener;
    if(listenerType !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + listenerType);
    }

    var listeners = this._listeners;

    if(!ReflectHas(listeners, type)) {
        listeners[type] = [];
    }

    listeners[type].push(listener)
}

module.exports = addEventListener;

/***/ }),

/***/ "./lib/core/dispatchEvent.js":
/*!***********************************!*\
  !*** ./lib/core/dispatchEvent.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ReflectApply = __webpack_require__(/*! ../utils/utils */ "./lib/utils/utils.js").ReflectApply;

function dispatchEvent(arg1) {
    var stack = [];
    var args = [];
    var listeners = this._listeners;

    if(typeof arg1 === 'string') {
        stack = listeners[arg1];
        args = Array.prototype.slice.call(arguments, 1);
    } else if(arg1 && (arg1.type in listeners)) {
        stack = listeners[arg1.type];
        args = arguments;
    } else {
        return false;
    }

    if(!stack || !stack.length) {
        return true;
    }

    for(var i = 0, l = stack.length; i < l; i++) {
        ReflectApply(stack[i], this, args);
    }
    return true
}

module.exports = dispatchEvent;

/***/ }),

/***/ "./lib/core/removeEventListener.js":
/*!*****************************************!*\
  !*** ./lib/core/removeEventListener.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ReflectHas = __webpack_require__(/*! ../utils/utils */ "./lib/utils/utils.js").ReflectHas;

function removeEventListener(type, listener) {

    // Validate
    var listenerType = typeof listener;
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

/***/ }),

/***/ "./lib/events.js":
/*!***********************!*\
  !*** ./lib/events.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Events = __webpack_require__(/*! ./core/Events */ "./lib/core/Events.js");

module.exports = Events;
module.exports.default = Events;



/***/ }),

/***/ "./lib/utils/utils.js":
/*!****************************!*\
  !*** ./lib/utils/utils.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasReflect = typeof Reflect === 'object';

var ReflectHas = hasReflect && typeof Reflect.has === 'function' ? Reflect.has : function (target, name) {
    return name in target;
}

var ReflectApply = hasReflect && typeof Reflect.apply === 'function' ? Reflect.apply : function (target, thisArg, args) {
    return Function.prototype.apply.call(target, thisArg, args);
}

module.exports = {
    ReflectHas: ReflectHas,
    ReflectApply: ReflectApply
};

/***/ })

/******/ });
});
//# sourceMappingURL=events.js.map