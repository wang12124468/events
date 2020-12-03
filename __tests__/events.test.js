var Events = require('../lib/events').Events;

test('1. Events: it is a class', function() {
    expect(typeof Events === 'function').toBe(true);
    expect(typeof new Events() === 'object').toBe(true);
})


test('2. Events: Add event listeners with addEventListener', function() {
    var events = new Events();
    function test() { }
    function test1() { }
    function test2() { }
    events.addEventListener('test', test);
    events.addEventListener('test', test1, { mode: 'sync' });
    events.addEventListener('test', test2, { mode: 'async' });
    expect(events._listeners.test).toContainEqual({ mode: 'sync', listener: test });
    expect(events._listeners.test).toContainEqual({ mode: 'sync', listener: test1 });
    expect(events._listeners.test).toContainEqual({ mode: 'async', listener: test2 });
})

test('3. Events: Add event listeners with on', function() {
    var events = new Events();
    function test() { }
    function test1() { }
    function test2() { }
    events.on('test', test);
    events.on('test', test1, { mode: 'sync' });
    events.on('test', test2, { mode: 'async' });
    expect(events._listeners.test).toContainEqual({ mode: 'sync', listener: test });
    expect(events._listeners.test).toContainEqual({ mode: 'sync', listener: test1 });
    expect(events._listeners.test).toContainEqual({ mode: 'async', listener: test2 });
})


test('4. Events: Remove event listeners with removeEventListener', function() {
    var events = new Events();
    function test() { }
    function test1() { }
    function test2() { }
    events.addEventListener('test', test);
    events.addEventListener('test', test1, { mode: 'sync' });
    events.addEventListener('test', test2, { mode: 'async' });
    events.removeEventListener('test', test);
    events.removeEventListener('test', test1);
    events.removeEventListener('test', test2);
    var _test = events._listeners.test;
    expect(!_test || _test.length === 0).toBe(true);
})

test('5. Events: Remove event listeners with off', function() {
    var events = new Events();
    function test() { }
    function test1() { }
    function test2() { }
    events.on('test', test);
    events.on('test', test1, { mode: 'sync' });
    events.on('test', test2, { mode: 'async' });
    events.off('test', test);
    events.off('test', test1);
    events.off('test', test2);
    var _test = events._listeners.test;
    expect(!_test || _test.length === 0).toBe(true);
})

test('6. Events: Remove all event listener', function() {
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

test('7. Events: (Auto)Dispatch event with type which is a string', function(done) {
    var events = new Events();
    var mockCallback = jest.fn();
    events.addEventListener('test', mockCallback);
    events.dispatchEvent('test').then(() => {
        expect(mockCallback.mock.calls.length).toBe(1);
        done();
    });
})

test('8. Events: (Auto)Dispatch event with object which has type', function(done) {
    var events = new Events();
    var mockCallback = jest.fn();
    events.addEventListener('test', mockCallback);
    events.dispatchEvent({ type: 'test' }).then(() => {
        expect(mockCallback.mock.calls.length).toBe(1);
        done();
    });
});

test('9. Events: (Auto)Dispatch event with type, which is a string, and other arguments', function(done) {
    var events = new Events();
    var mockCallback = jest.fn();
    events.addEventListener('test', mockCallback);
    events.dispatchEvent('test', 1, true).then(() => {
        expect(mockCallback.mock.calls.length).toBe(1);
        expect(mockCallback.mock.calls[0]).toEqual([1, true]);
        done();
    });
});

test('10. Events: (Auto)Dispatch event with object, which has type, and other arguments', function(done) {
    var events = new Events();
    var mockCallback = jest.fn();
    events.addEventListener('test', mockCallback);
    events.dispatchEvent({ type: 'test', msg: 'msg' }, 1, true).then(() => {
        expect(mockCallback.mock.calls.length).toBe(1);
        expect(mockCallback.mock.calls[0]).toEqual([{ type: 'test', msg: 'msg' }, 1, true]);
        done();
    });
});

test('11. Events: (Auto)Dispatch event, which more listeners', function(done) {
    var events = new Events();
    var t1, t2, t3, t4;
    var i = 0;
    function test1() {
        t1 = ++i;
    }
    function test2() {
        t2 = ++i;
    }

    function test3() {
        t3 = ++i;
    }

    function test4() {
        t4 = ++i;
    }

    events.addEventListener('test', test1);
    events.addEventListener('test', test2);
    events.addEventListener('test', test3);
    events.addEventListener('test', test4);
    events.dispatchEvent('test').then(() => {
        expect(t1).toBe(1);
        expect(t2).toBe(2);
        expect(t3).toBe(3);
        expect(t4).toBe(4);
        done();
    });
});

test('12. Events: (Auto)Dispatch event, which has async and sync listeners', function(done) {
    var events = new Events();
    var t1, t2, t3, t4;
    var i = 0;
    function test1() {
        return new Promise((resolve) => {
            setTimeout(() => {
                t1 = ++i;
                resolve()
            }, 200);
        })
    }
    function test2() {
        return new Promise((resolve) => {
            setTimeout(() => {
                t2 = ++i;
                resolve()
            }, 100);
        })
    }

    function test3() {
        return new Promise((resolve) => {
            setTimeout(() => {
                t3 = ++i;
                resolve()
            }, 10);
        })
    }

    function test4() {
        t4 = ++i;
    }

    events.addEventListener('test', test1);
    events.addEventListener('test', test2, { mode: 'async' });
    events.addEventListener('test', test3, { mode: 'async' });
    events.addEventListener('test', test4);
    events.dispatchEvent('test').then(() => {
        expect(t1).toBe(undefined); // It will do after 200ms, but the dispatch done.
        expect(t2).toBe(1);
        expect(t3).toBe(2);
        expect(t4).toBe(3);
        done();
    });
});

test('13. Events: (Sync)Dispatch event with type which is a string', function() {
    var events = new Events();
    var mockCallback = jest.fn();
    events.addEventListener('test', mockCallback);
    events.syncDispatchEvent('test');
    expect(mockCallback.mock.calls.length).toBe(1);
})

test('14. Events: (Sync)Dispatch event with object which has type', function() {
    var events = new Events();
    var mockCallback = jest.fn();
    events.addEventListener('test', mockCallback);
    events.syncDispatchEvent({ type: 'test' });
    expect(mockCallback.mock.calls.length).toBe(1);
});

test('15. Events: (Sync)Dispatch event with type, which is a string, and other arguments', function() {
    var events = new Events();
    var mockCallback = jest.fn();
    events.addEventListener('test', mockCallback);
    events.syncDispatchEvent('test', 1, true);
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0]).toEqual([1, true]);
});

test('16. Events: (Sync)Dispatch event with object, which has type, and other arguments', function() {
    var events = new Events();
    var mockCallback = jest.fn();
    events.addEventListener('test', mockCallback);
    events.syncDispatchEvent({ type: 'test', msg: 'msg' }, 1, true);
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0]).toEqual([{ type: 'test', msg: 'msg' }, 1, true]);
});

test('17. Events: (Sync)Dispatch event, which more listeners', function() {
    var events = new Events();
    var t1, t2, t3, t4;
    var i = 0;
    function test1() {
        t1 = ++i;
    }
    function test2() {
        t2 = ++i;
    }

    function test3() {
        t3 = ++i;
    }

    function test4() {
        t4 = ++i;
    }

    events.addEventListener('test', test1);
    events.addEventListener('test', test2);
    events.addEventListener('test', test3);
    events.addEventListener('test', test4);
    events.syncDispatchEvent('test');

    expect(t1).toBe(1);
    expect(t2).toBe(2);
    expect(t3).toBe(3);
    expect(t4).toBe(4);
});


test('18. Events: (Sync)Dispatch event, which has async and sync listeners', function() {
    var events = new Events();
    var t1, t2, t3, t4;
    var i = 0;
    function test1() {
        return new Promise((resolve) => {
            setTimeout(() => {
                t1 = ++i;
                resolve()
            }, 200);
        })
    }
    function test2() {
        return new Promise((resolve) => {
            setTimeout(() => {
                t2 = ++i;
                resolve()
            }, 100);
        })
    }

    function test3() {
        return new Promise((resolve) => {
            setTimeout(() => {
                t3 = ++i;
                resolve()
            }, 10);
        })
    }

    function test4() {
        t4 = ++i;
    }

    events.addEventListener('test', test1);
    events.addEventListener('test', test2, { mode: 'async' });
    events.addEventListener('test', test3, { mode: 'async' });
    events.addEventListener('test', test4);
    events.syncDispatchEvent('test');
    expect(t1).toBe(undefined);
    expect(t2).toBe(undefined);
    expect(t3).toBe(undefined);
    expect(t4).toBe(1);
});

test('19. Events: (Async)Dispatch event with type which is a string', function() {
    var events = new Events();
    var mockCallback = jest.fn();
    events.addEventListener('test', mockCallback);
    events.asyncDispatchEvent('test');
    expect(mockCallback.mock.calls.length).toBe(1);
})

test('20. Events: (Async)Dispatch event with object which has type', function() {
    var events = new Events();
    var mockCallback = jest.fn();
    events.addEventListener('test', mockCallback);
    events.asyncDispatchEvent({ type: 'test' });
    expect(mockCallback.mock.calls.length).toBe(1);
});

test('15. Events: (Sync)Dispatch event with type, which is a string, and other arguments', function() {
    var events = new Events();
    var mockCallback = jest.fn();
    events.addEventListener('test', mockCallback);
    events.asyncDispatchEvent('test', 1, true);
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0]).toEqual([1, true]);
});

test('21. Events: (Async)Dispatch event with object, which has type, and other arguments', function() {
    var events = new Events();
    var mockCallback = jest.fn();
    events.addEventListener('test', mockCallback);
    events.asyncDispatchEvent({ type: 'test', msg: 'msg' }, 1, true);
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0]).toEqual([{ type: 'test', msg: 'msg' }, 1, true]);
});

test('22. Events: (Async)Dispatch event, which more listeners', function(done) {
    var events = new Events();
    var t1, t2, t3, t4;
    var i = 0;
    function test1() {
        t1 = ++i;
    }
    function test2() {
        t2 = ++i;
    }

    function test3() {
        t3 = ++i;
    }

    function test4() {
        t4 = ++i;
    }

    events.addEventListener('test', test1);
    events.addEventListener('test', test2);
    events.addEventListener('test', test3);
    events.addEventListener('test', test4);
    events.asyncDispatchEvent('test').then(() => {
        expect(t1).toBe(1);
        expect(t2).toBe(2);
        expect(t3).toBe(3);
        expect(t4).toBe(4);
        done();
    });
});


test('23. Events: (Async)Dispatch event, which has async and sync listeners', function(done) {
    var events = new Events();
    var t1, t2, t3, t4;
    var i = 0;
    function test1() {
        return new Promise((resolve) => {
            setTimeout(() => {
                t1 = ++i;
                resolve()
            }, 200);
        })
    }
    function test2() {
        return new Promise((resolve) => {
            setTimeout(() => {
                t2 = ++i;
                resolve()
            }, 100);
        })
    }

    function test3() {
        return new Promise((resolve) => {
            setTimeout(() => {
                t3 = ++i;
                resolve()
            }, 10);
        })
    }

    function test4() {
        t4 = ++i;
    }

    events.addEventListener('test', test1);
    events.addEventListener('test', test2, { mode: 'async' });
    events.addEventListener('test', test3, { mode: 'async' });
    events.addEventListener('test', test4);
    // async all listeners
    events.asyncDispatchEvent('test').then(() => {
        expect(t1).toBe(1);
        expect(t2).toBe(2);
        expect(t3).toBe(3);
        expect(t4).toBe(4);
        done();
    })
});

