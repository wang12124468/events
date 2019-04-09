function isFunction(fn) {
    return typeof fn === 'function';
}

function isKeyInObject(key, obj) {
    return key in obj;
}

module.exports = { isFunction, isKeyInObject };
// module.exports = isKeyInObject;