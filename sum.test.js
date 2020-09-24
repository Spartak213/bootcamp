const { TestScheduler } = require("jest");

function sum(a, b) {
   return a + b;
}

describe('sum func test suite', () => {
    test('2+3', () => {
        expect(sum(2,3)).toEqual(5);
  });
});