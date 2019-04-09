var hasReflect = typeof Reflect === 'object';

var ReflectHas = hasReflect && typeof Reflect.has === 'function' ? Reflect.has : function (target, name) {
    return name in target;
}

var ReflectApply = hasReflect && typeof Reflect.apply === 'function' ? Reflect.apply : function (target, thisArg, args) {
    return Function.prototype.apply.call(target, thisArg, args);
}

module.exports = { ReflectHas, ReflectApply };