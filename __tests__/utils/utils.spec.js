var utils = require('../../lib/utils/utils');

describe('utils test', () => {
    test('1. utils: ReflectHas is correct', function() {
        const obj = { name: 'Tom', type: 'Cat' };
        expect(utils.ReflectHas(obj, 'name')).toBe(true);
        expect(utils.ReflectHas(obj, 'age')).toBe(false);
     })
     
     test('2. utils: ReflectApply is correct', function() {
         var obj = { name: 'Tom' };
         var mockCallback = jest.fn(function(name) { this.name = name; });
         utils.ReflectApply(mockCallback, obj, ['Jerry'])
         expect(obj).toEqual({ name: 'Jerry' });
     })
})