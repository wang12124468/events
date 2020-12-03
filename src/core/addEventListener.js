export function addEventListener(type, listener, options) {
    // Validate
    const listenerType = typeof listener;
    if(listenerType !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + listenerType);
    }

    const listeners = this._listeners;

    if(!Reflect.has(listeners, type)) {
        listeners[type] = [];
    }

    const { mode = 'sync' } = options || {};

    const ss = { mode, listener };

    listeners[type].push(ss)
}