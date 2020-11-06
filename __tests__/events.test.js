var Events = require('../lib/events');

test('1. Events: it is a class', function() {
    expect(typeof Events === 'function').toBe(true);
    expect(typeof new Events() === 'object').toBe(true);
})


test('2. Events: Add event listeners with addEventListener', function() {
    var events = new Events();
    function test() { }
    events.addEventListener('test', test);
    expect(events._listeners.test).toContain(test);
})

test('3. Events: Add event listeners with on', function() {
    var events = new Events();
    function test() { }
    events.on('test', test);
    expect(events._listeners.test).toContain(test);
})


test('4. Events: Remove event listeners with removeEventListener', function() {
    var events = new Events();
    function test() { }
    events.addEventListener('test', test);
    events.removeEventListener('test', test);
    var _test = events._listeners.test;
    expect(!_test || _test.length === 0).toBe(true);
})

test('5. Events: Remove event listeners with off', function() {
    var events = new Events();
    function test() { }
    events.addEventListener('test', test);
    events.off('test', test);
    var _test = events._listeners.test;
    expect(!_test || _test.length === 0).toBe(true);
})

test('6. Events: Dispatch event with type which is a string', function() {
    var events = new Events();
    var mockCallback = jest.fn();
    events.addEventListener('test', mockCallback);
    events.dispatchEvent('test');
    expect(mockCallback.mock.calls.length).toBe(1);
})

test('7. Events: Dispatch event with object which has type', function() {
    var events = new Events();
    var mockCallback = jest.fn();
    events.addEventListener('test', mockCallback);
    events.dispatchEvent({ type: 'test' });
    expect(mockCallback.mock.calls.length).toBe(1);
});

test('8. Events: Dispatch event with type, which is a string, and other arguments', function() {
    var events = new Events();
    var mockCallback = jest.fn();
    events.addEventListener('test', mockCallback);
    events.dispatchEvent('test', 1, true);
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0]).toEqual([1, true]);
});

test('9. Events: Dispatch event with object, which has type, and other arguments', function() {
    var events = new Events();
    var mockCallback = jest.fn();
    events.addEventListener('test', mockCallback);
    events.dispatchEvent({ type: 'test', msg: 'msg' }, 1, true);
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0]).toEqual([{ type: 'test', msg: 'msg' }, 1, true]);
});

test('10. Events: Remove all event listener', function() {
    var events = new Events();
    var mockCallback = jest.fn();
    var mockCallback2 = jest.fn();
    events.addEventListener('test', mockCallback);
    events.addEventListener('test2', mockCallback);
    events.removeAllEventListener();
    events.dispatchEvent({ type: 'test', msg: 'msg' }, 1, true);
    events.dispatchEvent({ type: 'test2' });
    expect(mockCallback).toBeCalledTimes(0);
    expect(mockCallback2).toBeCalledTimes(0);
});