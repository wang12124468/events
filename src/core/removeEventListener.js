export function removeEventListener(type, listener) {

    // Validate
    const listenerType = typeof listener;
    if (listenerType !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + listenerType);
    }

    const listeners = this._listeners;

    if (!Reflect.has(listeners, type)) {
        return;
    }

    listeners[type] = listeners[type].filter(ss => ss.listener !== listener);
}